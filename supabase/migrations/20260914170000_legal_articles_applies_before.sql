-- Tag parallel state-BiH statutes so entity retrieval (bih_fbih / bih_rs /
-- bih_brcko) can hide them unless the query is a Court of BiH matter.
--
-- LawModel: already applied. Do not paste again on this project (statement 1
-- will fail: column exists). Keep this file as the statement-by-statement
-- record / for another environment.
--
-- DO NOT run this file as one script if you are pasting into the Supabase
-- SQL editor. Paste ONE statement at a time (numbered below).
--
-- Expected after statement 2: 1,321 rows with applies_before = 'state_court',
-- all jurisdiction = bih_fbih. RS / Brčko stay NULL.

-- 1) Column + CHECK
ALTER TABLE legal_articles
  ADD COLUMN applies_before TEXT NULL
  CHECK (applies_before IS NULL OR applies_before = 'state_court');

-- 2) Backfill FBiH parallel state statutes only. Keyed on source_url stems,
--    not mashed titles (ZAKONO UPRAVNOM POSTUPKU / ZAKONO PREKRŠAJIMA collide).
UPDATE legal_articles
SET applies_before = 'state_court'
WHERE jurisdiction = 'bih_fbih'
  AND applies_before IS NULL
  AND (
    source_url ~* 'paragraf\\.ba/propisi/bih/krivicni-zakon-bosne'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-krivicnom-postupku-bosne'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-upravnom-postupku\\.html'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-parnicnom-postupku-pred-sudom'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-izvrsnom-postupku-pred-sudom'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-radu-u-institucijama'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-drzavnoj-sluzbi-u-institucijama'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-prekrsajima\\.html'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-upravnim-sporovima-bosne'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/ustav-bosne-i-hercegovine'
    OR source_url ~* 'paragraf\\.ba/propisi/bih/zakon-o-drzavljanstvu-bosne'
    OR source_url ~* 'legalist\\.ba/download/krivicni-zakon-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/zakon-o-krivicnom-postupku-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/zakon-o-upravnom-postupku-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/zakon-o-radu-u-institucijama-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/zakon-o-drzavnoj-sluzbi-u-institucijama-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/zakon-o-prekrsajima-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/zakon-o-upravnim-sporovima-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/ustav-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/zakon-o-drzavljanstvu-bih([/?]|$)'
    OR source_url ~* 'legalist\\.ba/download/zakon-o-slobodi-pristupa-informacijama-u-bosni-hercegovini([/?]|$)'
  );

-- 3) Verify (expect 1321 / 0)
SELECT
  jurisdiction,
  applies_before,
  COUNT(*) AS n
FROM legal_articles
WHERE jurisdiction IN ('bih_fbih', 'bih_rs', 'bih_brcko')
GROUP BY 1, 2
ORDER BY 1, 2 NULLS FIRST;

-- 4) Drop the old 5-arg overload so PostgREST does not see two candidates.
DROP FUNCTION IF EXISTS public.match_legal_articles(vector, text, text, integer, double precision);

-- 5) Recreate with include_state_court (default false).
CREATE FUNCTION public.match_legal_articles(
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
    AND (filter_category IS NULL OR la.law_category = filter_category)
    AND la.embedding IS NOT NULL
    AND 1 - (la.embedding <=> query_embedding) >= similarity_threshold
    AND (include_state_court OR la.applies_before IS NULL)
  ORDER BY la.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 6) Restore execute grants that DROP FUNCTION removed.
GRANT EXECUTE ON FUNCTION public.match_legal_articles(vector, text, text, integer, double precision, boolean)
  TO anon, authenticated, service_role;

-- 7) Reload PostgREST schema cache so the new argument is visible.
NOTIFY pgrst, 'reload schema';
