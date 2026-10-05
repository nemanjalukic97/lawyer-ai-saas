-- Keyword RPC: one SET LOCAL statement_timeout, taken from the live function.
-- Source: pg_get_functiondef of public.search_legal_articles_keyword.
-- Not based on 20260921190000. Does not set work_mem. Does not change the query.
-- No GRANT. CREATE OR REPLACE keeps the existing privileges.
-- Do not apply until the diff against the live definition is accepted.
CREATE OR REPLACE FUNCTION public.search_legal_articles_keyword(p_jurisdiction text, p_patterns text[], p_token_groups jsonb DEFAULT '[]'::jsonb, p_limit integer DEFAULT 30, p_categories text[] DEFAULT NULL::text[], p_include_state_court boolean DEFAULT false)
 RETURNS TABLE(id uuid, jurisdiction text, law_name text, law_name_local text, law_category text, article_num text, paragraph_num text, text text, text_local text, source_url text, matched_count integer, token_count integer, contiguous boolean)
 LANGUAGE plpgsql
AS $function$
BEGIN
  SET LOCAL statement_timeout = '30000ms';
  SET LOCAL plan_cache_mode = 'force_custom_plan';

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
$function$
