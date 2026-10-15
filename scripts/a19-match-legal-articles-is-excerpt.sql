-- A19. Not applied.
-- Deploy order: replace this function before serving the code that reads
-- is_excerpt. If the code goes first, every vector-only row arrives without
-- the flag and showsExcerptCard paints it as an excerpt, which is the
-- defect being removed.
--
-- Built from pg_get_functiondef of
-- match_legal_articles(vector, text, text, integer, double precision, boolean).
-- One transaction: other sessions wait on the lock and then call the new
-- function. They do not observe a gap in which the function is missing.

BEGIN;

DROP FUNCTION public.match_legal_articles(vector, text, text, integer, double precision, boolean);

CREATE FUNCTION public.match_legal_articles(query_embedding vector, filter_jurisdiction text, filter_category text DEFAULT NULL::text, match_count integer DEFAULT 6, similarity_threshold double precision DEFAULT 0.50, include_state_court boolean DEFAULT false)
 RETURNS TABLE(id uuid, jurisdiction text, law_name text, law_name_local text, law_category text, article_num text, paragraph_num text, text text, text_local text, source_url text, similarity double precision, is_excerpt boolean)
 LANGUAGE plpgsql
AS $function$
BEGIN
  SET LOCAL statement_timeout = '120s';
  -- HNSW was tried and dropped 2026-06-24 (62e8753): faster IVFFlat build on the bulk-ingest corpus. Do not re-add hnsw.ef_search.
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
    1 - (la.embedding <=> query_embedding) AS similarity,
    la.is_excerpt
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
$function$;

GRANT EXECUTE ON FUNCTION public.match_legal_articles(vector, text, text, integer, double precision, boolean) TO anon, authenticated, service_role;

COMMIT;
