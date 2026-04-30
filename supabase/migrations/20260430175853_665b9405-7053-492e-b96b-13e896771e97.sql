-- =========================================================
-- 1. Profiles: add email + is_active
-- =========================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- Backfill emails from auth.users (admin context: SECURITY DEFINER block)
DO $$
BEGIN
  UPDATE public.profiles p
  SET email = u.email
  FROM auth.users u
  WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');
END $$;

-- Update handle_new_user to also store email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, name, phone, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'phone',
    NEW.email
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email;

  -- Default role only if no role yet (invite flow may pre-assign)
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = NEW.id) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'lawyer_owner');
  END IF;

  RETURN NEW;
END;
$function$;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================
-- 2. Cases: internal_notes
-- =========================================================
ALTER TABLE public.cases
  ADD COLUMN IF NOT EXISTS internal_notes text;

-- =========================================================
-- 3. Documents: shared_with_client
-- =========================================================
ALTER TABLE public.documents
  ADD COLUMN IF NOT EXISTS shared_with_client boolean NOT NULL DEFAULT false;

-- =========================================================
-- 4. Case parties (petitioner / respondent / other)
-- =========================================================
DO $$ BEGIN
  CREATE TYPE public.party_role AS ENUM ('petitioner', 'respondent', 'other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.case_parties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  party_role public.party_role NOT NULL,
  party_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_case_parties_case ON public.case_parties(case_id);
CREATE INDEX IF NOT EXISTS idx_case_parties_client ON public.case_parties(client_id);

ALTER TABLE public.case_parties ENABLE ROW LEVEL SECURITY;

-- Helper: is the current user a client party on this case?
CREATE OR REPLACE FUNCTION public.is_case_client(_user_id uuid, _case_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.cases c
    LEFT JOIN public.clients cl ON cl.id = c.client_id
    WHERE c.id = _case_id
      AND cl.user_id = _user_id
  ) OR EXISTS (
    SELECT 1
    FROM public.case_parties cp
    JOIN public.clients cl2 ON cl2.id = cp.client_id
    WHERE cp.case_id = _case_id
      AND cl2.user_id = _user_id
  );
$$;

DROP POLICY IF EXISTS "Firm members can manage parties" ON public.case_parties;
CREATE POLICY "Firm members can manage parties"
  ON public.case_parties FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.cases c
    WHERE c.id = case_parties.case_id
      AND public.is_firm_member(auth.uid(), c.firm_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.cases c
    WHERE c.id = case_parties.case_id
      AND public.is_firm_member(auth.uid(), c.firm_id)
  ));

DROP POLICY IF EXISTS "Clients can view own party rows" ON public.case_parties;
CREATE POLICY "Clients can view own party rows"
  ON public.case_parties FOR SELECT
  USING (public.is_case_client(auth.uid(), case_id));

-- =========================================================
-- 5. Update cases RLS: clients can view their cases
-- =========================================================
DROP POLICY IF EXISTS "Firm members can view cases" ON public.cases;
CREATE POLICY "Firm members can view cases"
  ON public.cases FOR SELECT
  USING (
    public.is_firm_member(auth.uid(), firm_id)
    OR public.has_role(auth.uid(), 'admin')
    OR public.is_case_client(auth.uid(), id)
  );

-- =========================================================
-- 6. Update documents RLS: clients can only view shared docs
-- =========================================================
DROP POLICY IF EXISTS "Firm members can view documents" ON public.documents;
CREATE POLICY "Firm members can view documents"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cases c
      WHERE c.id = documents.case_id
        AND public.is_firm_member(auth.uid(), c.firm_id)
    )
    OR public.has_role(auth.uid(), 'admin')
    OR (shared_with_client = true AND public.is_case_client(auth.uid(), case_id))
  );

-- =========================================================
-- 7. Client invitations
-- =========================================================
CREATE TABLE IF NOT EXISTS public.client_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_id uuid NOT NULL REFERENCES public.firms(id) ON DELETE CASCADE,
  invited_by uuid NOT NULL,
  client_name text NOT NULL,
  client_email text,
  client_phone text,
  case_id uuid REFERENCES public.cases(id) ON DELETE SET NULL,
  token text NOT NULL UNIQUE DEFAULT replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''),
  status text NOT NULL DEFAULT 'pending', -- pending | accepted | revoked | expired
  accepted_by uuid,
  accepted_at timestamptz,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '14 days'),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_client_invitations_firm ON public.client_invitations(firm_id);
CREATE INDEX IF NOT EXISTS idx_client_invitations_token ON public.client_invitations(token);

ALTER TABLE public.client_invitations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Firm members manage own invites" ON public.client_invitations;
CREATE POLICY "Firm members manage own invites"
  ON public.client_invitations FOR ALL
  USING (public.is_firm_member(auth.uid(), firm_id) OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.is_firm_member(auth.uid(), firm_id));

-- Public lookup by token: needed so accept-invite page works pre-login.
-- We expose only via a SECURITY DEFINER function, not a SELECT policy.
CREATE OR REPLACE FUNCTION public.get_invitation_by_token(_token text)
RETURNS TABLE (
  id uuid,
  firm_id uuid,
  firm_name text,
  client_name text,
  client_email text,
  status text,
  expires_at timestamptz
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT i.id, i.firm_id, f.name AS firm_name,
         i.client_name, i.client_email, i.status, i.expires_at
  FROM public.client_invitations i
  JOIN public.firms f ON f.id = i.firm_id
  WHERE i.token = _token
  LIMIT 1;
$$;

-- Accept invitation: links logged-in user to firm as a client.
CREATE OR REPLACE FUNCTION public.accept_client_invitation(_token text)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_invite public.client_invitations%ROWTYPE;
  v_user uuid := auth.uid();
  v_client_id uuid;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT * INTO v_invite FROM public.client_invitations WHERE token = _token;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid invitation';
  END IF;
  IF v_invite.status <> 'pending' THEN
    RAISE EXCEPTION 'Invitation already %', v_invite.status;
  END IF;
  IF v_invite.expires_at < now() THEN
    UPDATE public.client_invitations SET status = 'expired' WHERE id = v_invite.id;
    RAISE EXCEPTION 'Invitation expired';
  END IF;

  -- Ensure client role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_user, 'client')
  ON CONFLICT DO NOTHING;

  -- Create or reuse client row in firm
  SELECT id INTO v_client_id
  FROM public.clients
  WHERE firm_id = v_invite.firm_id
    AND (user_id = v_user OR (client_email IS NOT NULL AND email = v_invite.client_email))
  LIMIT 1;

  IF v_client_id IS NULL THEN
    INSERT INTO public.clients (firm_id, name, email, phone, user_id)
    VALUES (v_invite.firm_id, v_invite.client_name, v_invite.client_email, v_invite.client_phone, v_user)
    RETURNING id INTO v_client_id;
  ELSE
    UPDATE public.clients SET user_id = v_user WHERE id = v_client_id AND user_id IS NULL;
  END IF;

  -- Link to specific case as petitioner if invite scoped to a case
  IF v_invite.case_id IS NOT NULL THEN
    INSERT INTO public.case_parties (case_id, client_id, party_role, party_name)
    VALUES (v_invite.case_id, v_client_id, 'petitioner', v_invite.client_name)
    ON CONFLICT DO NOTHING;
  END IF;

  UPDATE public.client_invitations
  SET status = 'accepted', accepted_by = v_user, accepted_at = now()
  WHERE id = v_invite.id;

  RETURN jsonb_build_object('firm_id', v_invite.firm_id, 'client_id', v_client_id);
END;
$$;

-- =========================================================
-- 8. Admin user management helpers
-- =========================================================
CREATE OR REPLACE FUNCTION public.admin_set_user_role(_target_user uuid, _role app_role)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  DELETE FROM public.user_roles WHERE user_id = _target_user;
  INSERT INTO public.user_roles (user_id, role) VALUES (_target_user, _role);
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_set_user_active(_target_user uuid, _active boolean)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  UPDATE public.profiles SET is_active = _active WHERE id = _target_user;
END;
$$;

-- Allow admins to view all profiles and roles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));

-- Restrict admin role escalation: only admins can insert into user_roles
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));