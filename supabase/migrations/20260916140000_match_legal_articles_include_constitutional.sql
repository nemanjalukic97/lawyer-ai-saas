-- Category filters keep constitutional rows: the constitution applies across
-- every legal area. Distilled-channel inferred-area filters used this RPC
-- and otherwise could never retrieve Ustav / equivalent texts.

CREATE OR REPLACE FUNCTION public.match_legal_articles(
  query_embedding   vector(1536),
  filter_jurisdiction TEXT,
  filter_category   TEXT DEFAULT NULL,
  match_count       INT DEFAULT 6,
  similarity_threshold FLOAT DEFAULT 0.50,
  include_state_court BOOLEAN DEFAULT false
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
  SET LOCAL statement_timeout = '120s';
  SET LOCAL hnsw.ef_search = 100;
  SET LOCAL ivfflat.probes = 8;

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
    AND (
      filter_category IS NULL
      OR la.law_category = filter_category
      OR la.law_category = 'constitutional'
    )
    AND la.embedding IS NOT NULL
    AND 1 - (la.embedding <=> query_embedding) >= similarity_threshold
    AND (include_state_court OR la.applies_before IS NULL)
  ORDER BY la.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
