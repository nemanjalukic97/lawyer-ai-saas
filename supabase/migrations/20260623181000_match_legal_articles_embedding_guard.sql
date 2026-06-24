-- Harden match_legal_articles: skip rows without embeddings (parity with match_case_law).
-- Raise statement_timeout for large-corpus vector search post bulk ingest.

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
  PERFORM set_config('statement_timeout', '120000', true);
  PERFORM set_config('hnsw.ef_search', '100', true);

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
    AND la.embedding IS NOT NULL
    AND 1 - (la.embedding <=> query_embedding) >= similarity_threshold
  ORDER BY la.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
