-- Case-law keyword search: add bounded reasoning prefix to the indexed expression.
--
-- Sampling (croatia Revr with reasoning ILIKE '%otkazni rok%', n=315 labor):
--   within 2000:  14 (4.4%)   — too little; phrase is rarely in the opening
--   within 3000:  30 (9.5%)
--   within 6000: 156 (49.5%)  — ≈ median (p50 position ≈ 6024)
--   within 8000: 234 (74.3%)  — ≈ p75; restores flagship Revr-813 (pos 5632),
--                                Revr-602 (pos 6709)
--   within 10000: 280 (88.9%)
-- Chosen prefix: left(reasoning, 8000). Captures ~3/4 of phrase occurrences and
-- the validated labor Revr set without indexing full reasoning (avg ~10.8k,
-- p95 much larger). Heap cost stays on gin candidates, not a full-jurisdiction
-- seq scan.
--
-- NOTE: Index rebuilds exceed dashboard/MCP timeouts. Apply RPC via this
-- migration; rebuild indexes with:
--
--   node --env-file=.env.local scripts/apply-hybrid-indexes.mjs
--
-- CONCURRENTLY variants (outside a transaction):
--
--   DROP INDEX CONCURRENTLY IF EXISTS case_law_keyword_trgm_croatia_idx;
--   CREATE INDEX CONCURRENTLY IF NOT EXISTS case_law_keyword_trgm_croatia_idx
--     ON public.case_law USING gin (
--       (coalesce(legal_question, '') || ' ' ||
--        coalesce(court_position, '') || ' ' ||
--        coalesce(headnote, '') || ' ' ||
--        left(coalesce(reasoning, ''), 8000)) gin_trgm_ops
--     ) WHERE jurisdiction = 'croatia';
--   -- …same for serbia, slovenia, montenegro, bih_rs, bih_fbih, bih_brcko

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Expression MUST match the partial GIN definition exactly (planner requirement).
CREATE OR REPLACE FUNCTION public.search_case_law_keyword(
  p_jurisdiction TEXT,
  p_patterns     TEXT[],
  p_limit        INT  DEFAULT 30,
  p_legal_area   TEXT DEFAULT NULL
)
RETURNS TABLE (
  id                UUID,
  jurisdiction      TEXT,
  court             TEXT,
  court_level       TEXT,
  case_number       TEXT,
  decision_date     DATE,
  legal_area        TEXT,
  legal_question    TEXT,
  court_position    TEXT,
  reasoning         TEXT,
  keywords          TEXT[],
  related_articles  TEXT[],
  headnote          TEXT,
  outcome           TEXT,
  source_url        TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF p_patterns IS NULL OR cardinality(p_patterns) = 0 THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    cl.id,
    cl.jurisdiction,
    cl.court,
    cl.court_level,
    cl.case_number,
    cl.decision_date,
    cl.legal_area,
    cl.legal_question,
    cl.court_position,
    cl.reasoning,
    cl.keywords,
    cl.related_articles,
    cl.headnote,
    cl.outcome,
    cl.source_url
  FROM public.case_law cl
  WHERE
    cl.jurisdiction = p_jurisdiction
    AND (p_legal_area IS NULL OR cl.legal_area = p_legal_area)
    AND (
      coalesce(cl.legal_question, '') || ' ' ||
      coalesce(cl.court_position, '') || ' ' ||
      coalesce(cl.headnote, '') || ' ' ||
      left(coalesce(cl.reasoning, ''), 8000)
    ) ILIKE ANY (p_patterns)
  LIMIT GREATEST(1, LEAST(COALESCE(p_limit, 30), 100));
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_case_law_keyword(TEXT, TEXT[], INT, TEXT)
  TO anon, authenticated, service_role;

-- Non-concurrent fallbacks for local/small DBs. Production: DROP+CREATE via
-- scripts/apply-hybrid-indexes.mjs (CONCURRENTLY). Expression change requires
-- drop-then-create; IF NOT EXISTS alone will not rebuild.
DROP INDEX IF EXISTS case_law_keyword_trgm_serbia_idx;
DROP INDEX IF EXISTS case_law_keyword_trgm_croatia_idx;
DROP INDEX IF EXISTS case_law_keyword_trgm_slovenia_idx;
DROP INDEX IF EXISTS case_law_keyword_trgm_montenegro_idx;
DROP INDEX IF EXISTS case_law_keyword_trgm_bih_rs_idx;
DROP INDEX IF EXISTS case_law_keyword_trgm_bih_fbih_idx;
DROP INDEX IF EXISTS case_law_keyword_trgm_bih_brcko_idx;

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_serbia_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '') || ' ' ||
      left(coalesce(reasoning, ''), 8000)
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'serbia';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_croatia_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '') || ' ' ||
      left(coalesce(reasoning, ''), 8000)
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'croatia';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_slovenia_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '') || ' ' ||
      left(coalesce(reasoning, ''), 8000)
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'slovenia';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_montenegro_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '') || ' ' ||
      left(coalesce(reasoning, ''), 8000)
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'montenegro';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_bih_rs_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '') || ' ' ||
      left(coalesce(reasoning, ''), 8000)
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'bih_rs';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_bih_fbih_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '') || ' ' ||
      left(coalesce(reasoning, ''), 8000)
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'bih_fbih';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_bih_brcko_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '') || ' ' ||
      left(coalesce(reasoning, ''), 8000)
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'bih_brcko';
