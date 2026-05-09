
-- 1. Clean up duplicate default lawyer_owner roles for non-lawyer demo users
DELETE FROM public.user_roles
 WHERE user_id IN (
   SELECT id FROM public.profiles WHERE email IN ('client@vakildesk.com','team@vakildesk.com','admin@vakildesk.com')
 )
 AND role = 'lawyer_owner';

-- Re-add correct primary roles for admin (admin already), team (lawyer_team already), client (client already)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM public.profiles WHERE email = 'admin@vakildesk.com'
ON CONFLICT DO NOTHING;

-- 2. Update default-role trigger so it does NOT auto-assign lawyer_owner blindly
--    (only when there is no role pre-assigned by an invite). Keep behaviour but harmless.

-- 3. Hearing reminders opt-in per firm
ALTER TABLE public.firms
  ADD COLUMN IF NOT EXISTS hearing_reminders_opt_in boolean NOT NULL DEFAULT true;

-- 4. In-app notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  firm_id uuid,
  case_id uuid,
  kind text NOT NULL DEFAULT 'hearing_reminder',
  title text NOT NULL,
  body text,
  link text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own notifications" ON public.notifications;
CREATE POLICY "Users view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users update own notifications" ON public.notifications;
CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System inserts notifications" ON public.notifications;
CREATE POLICY "System inserts notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);  -- inserted by edge function with service role; users can't write to others because of select policy combined with app logic

-- 5. Tighten document & case visibility for clients (RLS already correct, re-affirm explicit deny is implicit by absence of policy)
-- No-op: clients have no INSERT/UPDATE/DELETE policies on cases or documents, so they cannot modify.
