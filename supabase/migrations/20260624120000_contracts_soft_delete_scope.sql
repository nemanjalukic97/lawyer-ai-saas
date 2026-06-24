-- Soft-delete must mirror select/update scope: contract owners can delete even when
-- law_firm_id is set, and firm members can delete shared firm contracts.

DROP POLICY IF EXISTS "Solo users can soft delete own contracts" ON public.contracts;
DROP POLICY IF EXISTS "Firm members can soft delete firm contracts" ON public.contracts;
DROP POLICY IF EXISTS "Firm members can soft delete contracts" ON public.contracts;

DROP POLICY IF EXISTS "contracts_soft_delete_scope" ON public.contracts;
CREATE POLICY "contracts_soft_delete_scope"
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
    deleted_at IS NOT NULL
    AND (
      user_id = auth.uid()
      OR (
        law_firm_id IS NOT NULL
        AND law_firm_id = public.user_law_firm_id()
      )
    )
  );
