-- Run in Supabase Dashboard → SQL Editor (statement_timeout disabled by default there).
-- Builds per-jurisdiction IVFFlat indexes for ~218k legal_articles rows.
-- Run as ONE script; Serbia may take 15–45 min on Micro compute.

SET statement_timeout = '0';
SET maintenance_work_mem = '256MB';

-- Serbia (largest corpus)
CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_serbia_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 32)
  WHERE jurisdiction = 'serbia' AND embedding IS NOT NULL;

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_croatia_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100)
  WHERE jurisdiction = 'croatia' AND embedding IS NOT NULL;

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_bih_fbih_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100)
  WHERE jurisdiction = 'bih_fbih' AND embedding IS NOT NULL;

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_bih_rs_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100)
  WHERE jurisdiction = 'bih_rs' AND embedding IS NOT NULL;

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_bih_brcko_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50)
  WHERE jurisdiction = 'bih_brcko' AND embedding IS NOT NULL;

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_montenegro_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50)
  WHERE jurisdiction = 'montenegro' AND embedding IS NOT NULL;

CREATE INDEX IF NOT EXISTS legal_articles_ivfflat_slovenia_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50)
  WHERE jurisdiction = 'slovenia' AND embedding IS NOT NULL;

DROP INDEX IF EXISTS legal_articles_embedding_hnsw_idx;
DROP INDEX IF EXISTS legal_articles_embedding_idx;

ANALYZE legal_articles;
