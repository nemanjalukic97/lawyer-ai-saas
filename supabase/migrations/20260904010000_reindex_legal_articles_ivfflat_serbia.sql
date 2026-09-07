-- Rebuild Serbia IVFFlat so centroids include the curated core statutes
-- (~82.6k embeddings now, ~83–85k after labor + companies ingest).
-- lists = 80 (pgvector rows/1000). Current live index is lists = 32,
-- trained before the 3,872 curated articles.
--
-- DO NOT run this file as one script. The Supabase SQL editor wraps
-- multi-statement pastes in a transaction, and CREATE/DROP INDEX
-- CONCURRENTLY cannot run inside BEGIN/COMMIT (Croatia already hit this).
--
-- Paste ONE statement at a time. Before statement 2, set the SQL editor
-- timeout to 0 / none (default 8s will kill the build). If the editor
-- keeps the session across pastes, also run these as their own
-- single-statement pastes immediately before CREATE:
--   SET statement_timeout = '0';
--   SET maintenance_work_mem = '256MB';
--
-- Coverage gap: after DROP and until CREATE finishes there is no Serbia
-- IVFFlat. match_legal_articles will seq-scan ~85k rows (not blocked,
-- but slower). Window is likely 45–90 minutes on Micro.

-- 1)
DROP INDEX CONCURRENTLY IF EXISTS legal_articles_ivfflat_serbia_idx;

-- 2)
CREATE INDEX CONCURRENTLY legal_articles_ivfflat_serbia_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 80)
  WHERE jurisdiction = 'serbia' AND embedding IS NOT NULL;

-- 3)
ANALYZE legal_articles;
