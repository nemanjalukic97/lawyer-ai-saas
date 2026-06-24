-- Allow contract updates (e.g. signature_status) for owners and firm members.
-- Soft-delete policies only permit setting deleted_at; this policy covers normal edits.

DROP POLICY IF EXISTS "contracts_update_scope" ON public.contracts;
CREATE POLICY "contracts_update_scope"
  ON public.contracts
  FOR UPDATE
  TO authenticated
  USING (
    deleted_at IS NULL
    AND (
      user_id = auth.uid()
      OR (
        law_firm_id IS NOT NULL
        AND law_firm_id = public.user_law_firm_id()
      )
    )
  )
  WITH CHECK (
    deleted_at IS NULL
    AND (
      user_id = auth.uid()
      OR (
        law_firm_id IS NOT NULL
        AND law_firm_id = public.user_law_firm_id()
      )
    )
  );
