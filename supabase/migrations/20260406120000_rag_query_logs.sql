-- RAG query analytics: table + indexes + RLS + analytics view
-- Apply to project LawModel (or run in Supabase SQL editor).

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS rag_query_logs (
  id              UUID PRIMARY KEY
                  DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMP DEFAULT NOW(),
  user_id         UUID REFERENCES auth.users(id)
                  ON DELETE SET NULL,
  jurisdiction    TEXT,
  feature_type    TEXT,
  query_preview   TEXT,
  top_similarity  FLOAT,
  confidence      TEXT,
  answer_mode     TEXT,
  chunks_retrieved INT,
  valid_citations BOOLEAN,
  invalid_citations TEXT[],
  response_time_ms INT
);

CREATE INDEX IF NOT EXISTS rag_logs_user_idx
  ON rag_query_logs (user_id);
CREATE INDEX IF NOT EXISTS rag_logs_jurisdiction_idx
  ON rag_query_logs (jurisdiction);
CREATE INDEX IF NOT EXISTS rag_logs_created_idx
  ON rag_query_logs (created_at DESC);

ALTER TABLE rag_query_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only" ON rag_query_logs;
CREATE POLICY "Service role only"
  ON rag_query_logs
  FOR ALL
  USING (false);

CREATE OR REPLACE VIEW rag_analytics AS
SELECT
  DATE_TRUNC('day', created_at) AS date,
  jurisdiction,
  feature_type,
  confidence,
  COUNT(*) AS total_queries,
  AVG(top_similarity) AS avg_similarity,
  AVG(chunks_retrieved) AS avg_chunks,
  SUM(CASE WHEN valid_citations = true
    THEN 1 ELSE 0 END) AS valid_citation_count,
  SUM(CASE WHEN valid_citations = false
    THEN 1 ELSE 0 END) AS invalid_citation_count
FROM rag_query_logs
GROUP BY 1, 2, 3, 4
ORDER BY 1 DESC, 3 DESC;
