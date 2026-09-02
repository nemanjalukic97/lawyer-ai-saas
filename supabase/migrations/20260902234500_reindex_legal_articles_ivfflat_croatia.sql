-- Rebuild Croatia IVFFlat so centroids are trained on the current ~19.8k
-- embeddings (bulk + curated), with lists = 20 (pgvector rows/1000).
--
-- APPLY IN THE SUPABASE SQL EDITOR, NOT via a transactional migration runner.
-- DROP/CREATE INDEX CONCURRENTLY cannot run inside BEGIN/COMMIT. The Dashboard
-- SQL editor auto-commits each statement if you do not wrap the script.
--
-- SET statement_timeout = 0;  -- required; default 8s will kill the build
-- SET maintenance_work_mem = '256MB';  -- same as the original Croatia build
--
-- Coverage gap: after DROP and until CREATE finishes there is no Croatia
-- IVFFlat. match_legal_articles will seq-scan ~20k rows (not blocked, but
-- slower). Window should be a few minutes.

SET statement_timeout = '0';
SET maintenance_work_mem = '256MB';

DROP INDEX CONCURRENTLY IF EXISTS legal_articles_ivfflat_croatia_idx;

CREATE INDEX CONCURRENTLY legal_articles_ivfflat_croatia_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 20)
  WHERE jurisdiction = 'croatia' AND embedding IS NOT NULL;

ANALYZE legal_articles;
