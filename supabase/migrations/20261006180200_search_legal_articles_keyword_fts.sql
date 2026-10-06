-- Partial-stage candidate lookup uses the expression GIN index on
-- legal_articles. Source: pg_get_functiondef of the live
-- search_legal_articles_keyword on 2026-10-06. Not taken from
-- 20260921190000 (that file sets work_mem and must not be applied).
--
-- Apply last, by hand, only after legal_articles_text_local_fts_idx
-- exists. This file's name sorts before the drop and the index.
-- Applying it without the index makes the partial stage compute
-- to_tsvector on the heap.
--
-- Token groups present (the partial call): each group's needles are OR-ed
-- as prefix lexemes (stem:*). Six groups or fewer: the tsquery is the OR
-- of every 2-subset of those groups, and each subset is the AND of its two
-- groups. Two groups are one AND. One group is that group alone. At most
-- 15 terms. More than six groups: the tsquery is the OR of every group,
-- one term per group, with no AND. Scoring still sees every group.
-- Token groups empty (the phrase call): the live ILIKE against p_patterns
-- is unchanged, so phrase rows stay on the trigram index.
-- matched_count, token_count, contiguous, ORDER BY and the LIMIT clamp are
-- the live expressions. No work_mem.

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
  group_expr AS MATERIALIZED (
    SELECT
      g.grp AS ord,
      '(' || string_agg(u.cleaned || ':*', ' | ' ORDER BY u.cleaned) || ')' AS expr
    FROM groups g
    CROSS JOIN LATERAL (
      SELECT DISTINCT regexp_replace(lit, '[''&|!():*\\]+', '', 'g') AS cleaned
      FROM unnest(g.lits) AS lit
    ) u
    WHERE u.cleaned <> ''
    GROUP BY g.grp
  ),
  fts_query AS MATERIALIZED (
    SELECT to_tsquery('simple', built.q) AS tsq
    FROM (
      SELECT CASE
        WHEN (SELECT count(*) FROM group_expr) < 2 THEN
          (SELECT string_agg(expr, '' ORDER BY ord) FROM group_expr)
        WHEN (SELECT count(*) FROM group_expr) <= 6 THEN (
          SELECT string_agg(
            '(' || g1.expr || ' & ' || g2.expr || ')',
            ' | ' ORDER BY g1.ord, g2.ord
          )
          FROM group_expr g1
          JOIN group_expr g2 ON g1.ord < g2.ord
        )
        ELSE (
          SELECT string_agg(expr, ' | ' ORDER BY ord) FROM group_expr
        )
      END AS q
    ) built
    WHERE built.q IS NOT NULL AND built.q <> ''
  ),
  base AS MATERIALIZED (
    SELECT DISTINCT ON (src.id)
      src.id,
      src.jurisdiction,
      src.law_name,
      src.law_name_local,
      src.law_category,
      src.article_num,
      src.paragraph_num,
      src.text,
      src.text_local,
      src.source_url,
      lower(src.text_local) AS hay
    FROM (
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
        la.source_url
      FROM public.legal_articles la
      JOIN fts_query fq
        ON to_tsvector('simple'::regconfig, la.text_local) @@ fq.tsq
      WHERE
        la.jurisdiction = p_jurisdiction
        AND la.text_local IS NOT NULL
        AND (p_include_state_court OR la.applies_before IS NULL)
        AND (
          p_categories IS NULL
          OR cardinality(p_categories) = 0
          OR la.law_category = ANY (p_categories)
        )
        AND EXISTS (SELECT 1 FROM groups)

      UNION ALL

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
        la.source_url
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
        AND NOT EXISTS (SELECT 1 FROM groups)
    ) src
    ORDER BY src.id
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
;
