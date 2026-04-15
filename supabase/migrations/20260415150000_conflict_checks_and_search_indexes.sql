-- Conflict of Interest checks + search performance indexes
-- Adds conflict check audit log + trigram indexes for partial, case-insensitive search.

-- 1) Enable trigram extension (used for ILIKE %term% indexes)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2) Contracts: generated text column for party name searching (no triggers)
ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS party_names_text TEXT
  GENERATED ALWAYS AS (COALESCE(party_names::text, '')) STORED;

-- 3) Search indexes (partial, case-insensitive)
-- Note: gin_trgm_ops accelerates ILIKE '%...%' queries.
CREATE INDEX IF NOT EXISTS idx_clients_name_trgm
  ON public.clients USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_clients_company_name_trgm
  ON public.clients USING GIN (company_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_clients_email_trgm
  ON public.clients USING GIN (email gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_contracts_title_trgm
  ON public.contracts USING GIN (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_contracts_party_names_text_trgm
  ON public.contracts USING GIN (party_names_text gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_case_predictions_case_name_trgm
  ON public.case_predictions USING GIN (case_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_case_predictions_case_facts_trgm
  ON public.case_predictions USING GIN (case_facts gin_trgm_ops);

-- 4) Conflict check log table
CREATE TABLE IF NOT EXISTS public.conflict_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Who ran it + tenant scope (firm-wide history when in a firm)
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,

  -- Query data
  search_query TEXT NOT NULL,
  normalized_query TEXT NOT NULL,
  search_details JSONB,

  -- Results
  results JSONB NOT NULL,
  results_summary TEXT NOT NULL,
  has_conflict BOOLEAN NOT NULL,

  -- Override (for client creation / proceeding anyway)
  override BOOLEAN NOT NULL DEFAULT FALSE,
  override_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  override_reason TEXT
);

CREATE INDEX IF NOT EXISTS idx_conflict_checks_firm_created_at
  ON public.conflict_checks(law_firm_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conflict_checks_user_created_at
  ON public.conflict_checks(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conflict_checks_normalized_query
  ON public.conflict_checks(normalized_query);

COMMENT ON TABLE public.conflict_checks IS 'Audit log of conflict-of-interest checks (user + optional firm scope).';

-- 5) RLS
ALTER TABLE public.conflict_checks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "conflict_checks_select_scope" ON public.conflict_checks;
CREATE POLICY "conflict_checks_select_scope"
  ON public.conflict_checks
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "conflict_checks_insert_scope" ON public.conflict_checks;
CREATE POLICY "conflict_checks_insert_scope"
  ON public.conflict_checks
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

-- Updates are not required for the intended flow (override is logged at insert time).
DROP POLICY IF EXISTS "conflict_checks_update_scope" ON public.conflict_checks;
CREATE POLICY "conflict_checks_update_scope"
  ON public.conflict_checks
  FOR UPDATE TO authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "conflict_checks_delete_scope" ON public.conflict_checks;
CREATE POLICY "conflict_checks_delete_scope"
  ON public.conflict_checks
  FOR DELETE TO authenticated
  USING (false);

