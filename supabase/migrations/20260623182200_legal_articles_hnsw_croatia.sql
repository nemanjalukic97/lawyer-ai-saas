-- Croatia partial IVFFlat.

SET statement_timeout = '0';
SET maintenance_work_mem = '256MB';

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_croatia_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50)
  WHERE jurisdiction = 'croatia' AND embedding IS NOT NULL;
