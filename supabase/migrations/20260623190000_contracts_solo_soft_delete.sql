-- Solo users could not soft-delete when a FOR ALL policy requires deleted_at IS NULL
-- on the updated row. Firm members get an explicit soft-delete policy as well.

DROP POLICY IF EXISTS "Solo users can soft delete own contracts" ON public.contracts;
CREATE POLICY "Solo users can soft delete own contracts"
  ON public.contracts
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id
    AND law_firm_id IS NULL
    AND deleted_at IS NULL
  )
  WITH CHECK (
    auth.uid() = user_id
    AND law_firm_id IS NULL
    AND deleted_at IS NOT NULL
  );

DROP POLICY IF EXISTS "Firm members can soft delete firm contracts" ON public.contracts;
CREATE POLICY "Firm members can soft delete firm contracts"
  ON public.contracts
  FOR UPDATE
  TO authenticated
  USING (
    law_firm_id IS NOT NULL
    AND law_firm_id = public.user_law_firm_id()
    AND deleted_at IS NULL
  )
  WITH CHECK (
    law_firm_id IS NOT NULL
    AND law_firm_id = public.user_law_firm_id()
    AND deleted_at IS NOT NULL
  );
