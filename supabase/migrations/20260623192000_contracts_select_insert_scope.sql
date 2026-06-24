-- Ensure owners and firm members can list and create contracts (not only update/delete).

DROP POLICY IF EXISTS "contracts_select_scope" ON public.contracts;
CREATE POLICY "contracts_select_scope"
  ON public.contracts
  FOR SELECT
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
  );

DROP POLICY IF EXISTS "contracts_insert_scope" ON public.contracts;
CREATE POLICY "contracts_insert_scope"
  ON public.contracts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );
