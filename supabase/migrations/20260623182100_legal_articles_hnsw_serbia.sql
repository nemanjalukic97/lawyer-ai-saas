-- Serbia partial IVFFlat (faster build than HNSW on large bulk-ingest corpus).

SET statement_timeout = '0';
SET maintenance_work_mem = '256MB';

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_serbia_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 32)
  WHERE jurisdiction = 'serbia' AND embedding IS NOT NULL;

ANALYZE legal_articles;
