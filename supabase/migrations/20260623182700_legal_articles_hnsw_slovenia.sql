-- Slovenia partial IVFFlat + drop obsolete global vector indexes.

SET statement_timeout = '0';
SET maintenance_work_mem = '256MB';

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_slovenia_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 32)
  WHERE jurisdiction = 'slovenia' AND embedding IS NOT NULL;

DROP INDEX IF EXISTS legal_articles_embedding_hnsw_idx;
DROP INDEX IF EXISTS legal_articles_embedding_idx;

ANALYZE legal_articles;
