-- Keyword RPC: raise work_mem for the duration of this function only.
-- Measured 2026-09-21: default 3500 kB spills (labor ~29 MB, ostavinski ~47 MB
-- temp). SET LOCAL 32 MB keeps those two in memory (hash_mem_multiplier = 2).
-- Session work_mem is unchanged. Do not apply from this chat — user applies.

CREATE OR REPLACE FUNCTION public.search_legal_articles_keyword(
  p_jurisdiction TEXT,
  p_patterns TEXT[],
  p_token_groups JSONB DEFAULT '[]'::jsonb,
  p_limit INT DEFAULT 30,
  p_categories TEXT[] DEFAULT NULL,
  p_include_state_court BOOLEAN DEFAULT false
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
  matched_count   INT,
  token_count     INT,
  contiguous      BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
  SET LOCAL plan_cache_mode = 'force_custom_plan';
  SET LOCAL work_mem = '32MB';

  IF p_patterns IS NULL OR cardinality(p_patterns) = 0 THEN
    RETURN;
  END IF;

  RETURN QUERY
  WITH groups AS MATERIALIZED (
    SELECT ordinality::int AS grp,
           ARRAY(
             SELECT lower(jsonb_array_elements_text(elem))
           ) AS lits
    FROM jsonb_array_elements(COALESCE(p_token_groups, '[]'::jsonb))
         WITH ORDINALITY AS t(elem, ordinality)
  ),
  base AS MATERIALIZED (
    SELECT DISTINCT ON (la.id)
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
      lower(la.text_local) AS hay
    FROM unnest(p_patterns) AS pat
    JOIN public.legal_articles la ON la.text_local ILIKE pat
    WHERE
      la.jurisdiction = p_jurisdiction
      AND la.text_local IS NOT NULL
      AND (p_include_state_court OR la.applies_before IS NULL)
      AND (
        p_categories IS NULL
        OR cardinality(p_categories) = 0
        OR la.law_category = ANY (p_categories)
      )
    ORDER BY la.id
  ),
  token_hits AS MATERIALIZED (
    SELECT
      b.id,
      g.grp,
      MIN(STRPOS(b.hay, lit)) FILTER (
        WHERE lit <> '' AND STRPOS(b.hay, lit) > 0
      ) AS pos
    FROM base b
    CROSS JOIN groups g
    LEFT JOIN LATERAL unnest(g.lits) AS lit ON true
    GROUP BY b.id, g.grp
  ),
  ranked AS MATERIALIZED (
    SELECT
      h.id,
      h.grp,
      h.pos,
      h.pos > COALESCE(LAG(h.pos) OVER (PARTITION BY h.id ORDER BY h.grp), 0) AS pos_ok
    FROM token_hits h
    WHERE h.pos IS NOT NULL
  ),
  agg AS MATERIALIZED (
    SELECT
      r.id,
      COUNT(*)::int AS matched_count,
      BOOL_AND(r.pos_ok) AS contiguous
    FROM ranked r
    GROUP BY r.id
  )
  SELECT
    b.id,
    b.jurisdiction,
    b.law_name,
    b.law_name_local,
    b.law_category,
    b.article_num,
    b.paragraph_num,
    b.text,
    b.text_local,
    b.source_url,
    COALESCE(a.matched_count, 0),
    COALESCE((SELECT COUNT(*)::int FROM groups), 0),
    COALESCE(a.contiguous, true)
  FROM base b
  LEFT JOIN agg a ON a.id = b.id
  ORDER BY COALESCE(a.matched_count, 0) DESC, COALESCE(a.contiguous, true) DESC, b.id
  LIMIT GREATEST(1, LEAST(COALESCE(p_limit, 30), 100));
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_legal_articles_keyword(
  TEXT, TEXT[], JSONB, INT, TEXT[], BOOLEAN
) TO anon, authenticated, service_role;
