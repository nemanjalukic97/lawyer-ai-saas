-- Statute keyword ILIKE: GIN pg_trgm on legal_articles.text_local.
-- Follows 20260710160000_case_law_keyword_partial_trgm.sql: RPC lives in
-- 20260919220000; this file documents the CONCURRENTLY index DDL.
--
-- Production already has legal_articles_text_local_trgm_idx (~300 MB,
-- ~230k rows with text_local). Do NOT apply this CREATE from the dashboard
-- or MCP on a live writer — GIN builds take minutes and a non-CONCURRENTLY
-- create takes a SHARE lock that blocks writes.
--
-- Apply via:
--
--   node --env-file=.env.local scripts/apply-hybrid-indexes.mjs
--
-- CONCURRENTLY variants (outside a transaction; also in apply-hybrid-indexes.mjs):
--
--   CREATE INDEX CONCURRENTLY IF NOT EXISTS legal_articles_text_local_trgm_idx
--     ON public.legal_articles USING gin (text_local gin_trgm_ops)
--     WHERE text_local IS NOT NULL;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Non-concurrent fallback for local/small DBs. Production: prefer CONCURRENTLY
-- via scripts/apply-hybrid-indexes.mjs (see header). IF NOT EXISTS is idempotent
-- with the concurrent script.
CREATE INDEX IF NOT EXISTS legal_articles_text_local_trgm_idx
  ON public.legal_articles USING gin (text_local gin_trgm_ops)
  WHERE text_local IS NOT NULL;
