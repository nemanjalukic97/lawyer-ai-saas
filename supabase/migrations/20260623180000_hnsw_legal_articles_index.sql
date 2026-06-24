-- HNSW index for legal_articles vector search (post bulk ingest).
-- Replaces stale IVFFlat (lists=100) which degrades on large corpora.

SET statement_timeout = '0';

CREATE INDEX IF NOT EXISTS legal_articles_embedding_hnsw_idx
  ON legal_articles USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

DROP INDEX IF EXISTS legal_articles_embedding_idx;

ANALYZE legal_articles;
