-- Legal RAG: pgvector-backed legal articles + match RPC

-- Extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table
CREATE TABLE legal_articles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  jurisdiction    TEXT NOT NULL CHECK (jurisdiction IN (
                    'serbia', 'croatia', 'bih_fbih', 'bih_rs',
                    'bih_brcko', 'bih_state', 'montenegro', 'slovenia'
                  )),
  law_name        TEXT NOT NULL,
  law_name_local  TEXT NOT NULL,
  law_category    TEXT NOT NULL CHECK (law_category IN (
                    'civil', 'commercial', 'labor', 'family',
                    'criminal', 'administrative', 'procedural', 'constitutional'
                  )),
  article_num     TEXT NOT NULL,
  paragraph_num   TEXT,
  text            TEXT NOT NULL,
  text_local      TEXT,
  embedding       vector(1536),
  source_url      TEXT,
  effective_date  DATE,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX legal_articles_embedding_idx
  ON legal_articles USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE INDEX legal_articles_jurisdiction_idx ON legal_articles (jurisdiction);
CREATE INDEX legal_articles_category_idx ON legal_articles (jurisdiction, law_category);

-- RPC
CREATE OR REPLACE FUNCTION match_legal_articles(
  query_embedding   vector(1536),
  filter_jurisdiction TEXT,
  filter_category   TEXT DEFAULT NULL,
  match_count       INT DEFAULT 6,
  similarity_threshold FLOAT DEFAULT 0.50
)
RETURNS TABLE (
  id              UUID,
  jurisdiction    TEXT,
  law_name        TEXT,
  law_name_local  TEXT,
  law_category    TEXT,
  article_num     TEXT,
  paragraph_num   TEXT,
  text            TEXT,
  text_local      TEXT,
  source_url      TEXT,
  similarity      FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    la.id,
    la.jurisdiction,
    la.law_name,
    la.law_name_local,
    la.law_category,
    la.article_num,
    la.paragraph_num,
    la.text,
    la.text_local,
    la.source_url,
    1 - (la.embedding <=> query_embedding) AS similarity
  FROM legal_articles la
  WHERE
    la.jurisdiction = filter_jurisdiction
    AND (filter_category IS NULL OR la.law_category = filter_category)
    AND 1 - (la.embedding <=> query_embedding) >= similarity_threshold
  ORDER BY la.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- RLS
ALTER TABLE legal_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to legal articles"
  ON legal_articles FOR SELECT
  USING (true);

