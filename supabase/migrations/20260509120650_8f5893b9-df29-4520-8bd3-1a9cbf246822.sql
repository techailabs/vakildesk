
-- 1. Move internal_notes off cases (RLS can't restrict columns; clients had row access)
CREATE TABLE IF NOT EXISTS public.case_internal_notes (
  case_id uuid PRIMARY KEY,
  notes text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

INSERT INTO public.case_internal_notes (case_id, notes, updated_at)
SELECT id, internal_notes, updated_at
FROM public.cases
WHERE internal_notes IS NOT NULL
ON CONFLICT (case_id) DO NOTHING;

ALTER TABLE public.cases DROP COLUMN IF EXISTS internal_notes;

ALTER TABLE public.case_internal_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Firm members view internal notes"
ON public.case_internal_notes FOR SELECT
USING (EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id)));

CREATE POLICY "Firm members insert internal notes"
ON public.case_internal_notes FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id)));

CREATE POLICY "Firm members update internal notes"
ON public.case_internal_notes FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id)))
WITH CHECK (EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id)));

-- 2. Notifications: only allow inserting notifications for self (or via service role which bypasses RLS)
DROP POLICY IF EXISTS "System inserts notifications" ON public.notifications;
CREATE POLICY "Users insert own notifications"
ON public.notifications FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 3. firm_members UPDATE: restrict to firm owner only
DROP POLICY IF EXISTS "Owners can update members" ON public.firm_members;
CREATE POLICY "Owners can update members"
ON public.firm_members FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid()));

-- 4. client_invitations: restrict full-row reads (incl. token) to owner / inviter / admin.
--    Keep firm-member write capability so any team member can still issue invites.
DROP POLICY IF EXISTS "Firm members manage own invites" ON public.client_invitations;

CREATE POLICY "Owners and inviter view invites"
ON public.client_invitations FOR SELECT
USING (
  invited_by = auth.uid()
  OR EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Firm members create invites"
ON public.client_invitations FOR INSERT
WITH CHECK (public.is_firm_member(auth.uid(), firm_id) AND invited_by = auth.uid());

CREATE POLICY "Owners and inviter update invites"
ON public.client_invitations FOR UPDATE
USING (
  invited_by = auth.uid()
  OR EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid())
)
WITH CHECK (
  invited_by = auth.uid()
  OR EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid())
);

CREATE POLICY "Owners delete invites"
ON public.client_invitations FOR DELETE
USING (EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid()));
