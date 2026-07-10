-- Case-law keyword search: expression GIN without reasoning + per-jurisdiction
-- partial indexes + RPC (PostgREST cannot target expression indexes via .or(ilike)).
--
-- Recall tradeoff: searchable expression excludes `reasoning` (bulk of heap I/O).
-- Matches use legal_question + court_position + headnote only. Cases whose only
-- keyword hit lived in reasoning will no longer surface via the keyword channel
-- (vector channel still can).
--
-- NOTE: Partial GIN builds on croatia (~30k) / slovenia (~21k) exceed dashboard
-- and MCP statement timeouts. This migration creates the RPC and documents the
-- CONCURRENTLY index DDL. Apply indexes via:
--
--   node --env-file=.env.local scripts/apply-hybrid-indexes.mjs
--
-- CONCURRENTLY variants (outside a transaction; also in apply-hybrid-indexes.mjs):
--
--   CREATE INDEX CONCURRENTLY IF NOT EXISTS case_law_keyword_trgm_croatia_idx
--     ON public.case_law USING gin (
--       (coalesce(legal_question, '') || ' ' ||
--        coalesce(court_position, '') || ' ' ||
--        coalesce(headnote, '')) gin_trgm_ops
--     ) WHERE jurisdiction = 'croatia';
--   -- …same for serbia, slovenia, montenegro, bih_rs, bih_fbih, bih_brcko
--
--   DROP INDEX CONCURRENTLY IF EXISTS case_law_keyword_trgm_idx;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ---------------------------------------------------------------------------
-- RPC: expression ILIKE ANY(patterns) so the planner can use the partial GINs.
-- Conventions match match_case_law: LANGUAGE plpgsql, NOT SECURITY DEFINER,
-- EXECUTE granted to anon / authenticated / service_role (case_law is public-read).
-- ---------------------------------------------------------------------------
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
      coalesce(cl.headnote, '')
    ) ILIKE ANY (p_patterns)
  LIMIT GREATEST(1, LEAST(COALESCE(p_limit, 30), 100));
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_case_law_keyword(TEXT, TEXT[], INT, TEXT)
  TO anon, authenticated, service_role;

-- Non-concurrent fallbacks for local/small DBs. Production: prefer CONCURRENTLY
-- via scripts/apply-hybrid-indexes.mjs (see header). IF NOT EXISTS is idempotent
-- with the concurrent script.
CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_serbia_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '')
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'serbia';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_croatia_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '')
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'croatia';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_slovenia_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '')
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'slovenia';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_montenegro_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '')
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'montenegro';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_bih_rs_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '')
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'bih_rs';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_bih_fbih_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '')
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'bih_fbih';

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_bih_brcko_idx
  ON public.case_law USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(headnote, '')
    ) gin_trgm_ops
  )
  WHERE jurisdiction = 'bih_brcko';

-- Superseded by per-jurisdiction partial indexes (expression without reasoning).
DROP INDEX IF EXISTS case_law_keyword_trgm_idx;
