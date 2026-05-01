-- Allow firm members to update documents (e.g., toggle shared_with_client)
CREATE POLICY "Firm members can update documents"
ON public.documents
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.cases c
    WHERE c.id = documents.case_id AND public.is_firm_member(auth.uid(), c.firm_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.cases c
    WHERE c.id = documents.case_id AND public.is_firm_member(auth.uid(), c.firm_id)
  )
);