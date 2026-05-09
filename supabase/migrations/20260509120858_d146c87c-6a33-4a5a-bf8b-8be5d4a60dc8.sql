
-- 1. firm_members INSERT: must be firm owner
DROP POLICY IF EXISTS "Owners can manage members" ON public.firm_members;
CREATE POLICY "Owners can add members"
ON public.firm_members FOR INSERT
WITH CHECK (
  invited_by = auth.uid()
  AND EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid())
);

-- 2. client_invitations SELECT: also require active firm membership
DROP POLICY IF EXISTS "Owners and inviter view invites" ON public.client_invitations;
CREATE POLICY "Active firm members view own invites"
ON public.client_invitations FOR SELECT
USING (
  (
    invited_by = auth.uid()
    AND public.is_firm_member(auth.uid(), firm_id)
  )
  OR EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

-- 3. case_comments INSERT: stamp author = auth.uid()
DROP POLICY IF EXISTS "Firm members can add comments" ON public.case_comments;
CREATE POLICY "Firm members can add comments"
ON public.case_comments FOR INSERT
WITH CHECK (
  user_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.cases c
    WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id)
  )
);

-- 4. notifications INSERT: validate firm_id/case_id belong to user's firm
DROP POLICY IF EXISTS "Users insert own notifications" ON public.notifications;
CREATE POLICY "Users insert own scoped notifications"
ON public.notifications FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND (firm_id IS NULL OR public.is_firm_member(auth.uid(), firm_id))
  AND (
    case_id IS NULL
    OR EXISTS (
      SELECT 1 FROM public.cases c
      WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id)
    )
  )
);
