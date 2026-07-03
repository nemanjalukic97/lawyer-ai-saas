-- Hybrid legal search: trigram index on text_local + rag_query_logs metadata for tuning.
--
-- NOTE: On large corpora (70k+ rows), index creation may exceed the default
-- statement timeout when applied via Supabase dashboard/MCP. If apply_migration
-- times out, run the CONCURRENTLY variant below manually (outside a transaction):
--
--   CREATE INDEX CONCURRENTLY IF NOT EXISTS legal_articles_text_local_trgm_idx
--     ON public.legal_articles USING gin (text_local gin_trgm_ops)
--     WHERE text_local IS NOT NULL;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS legal_articles_text_local_trgm_idx
  ON public.legal_articles
  USING gin (text_local gin_trgm_ops)
  WHERE text_local IS NOT NULL;

CREATE INDEX IF NOT EXISTS case_law_keyword_trgm_idx
  ON public.case_law
  USING gin (
    (
      coalesce(legal_question, '') || ' ' ||
      coalesce(court_position, '') || ' ' ||
      coalesce(reasoning, '') || ' ' ||
      coalesce(headnote, '')
    ) gin_trgm_ops
  );

ALTER TABLE public.rag_query_logs
  ADD COLUMN IF NOT EXISTS metadata JSONB;

CREATE INDEX IF NOT EXISTS rag_logs_metadata_idx
  ON public.rag_query_logs
  USING gin (metadata)
  WHERE metadata IS NOT NULL;
