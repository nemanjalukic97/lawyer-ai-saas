-- Owner-run. Do not apply from the agent.
-- A17. One column for a standalone article of an amending act,
-- Montenegro and Serbia. article_num stays the printed number.
--
-- NULLS NOT DISTINCT on the current four columns is not possible yet.
-- Measured 2026-10-12 against legal_articles, empty paragraph = null:
--   montenegro  160 groups, 342 rows, all paragraph_num NULL
--   serbia        2 groups,   4 rows, law_name_local = 'ОДЛУКА', articles 1 and 2
--   bih_brcko, bih_fbih, bih_rs, croatia, slovenia: 0
-- Those five zeros are the chunk ordinal still stored in article_num.
--
-- Run the ALTER, then the Montenegro UPDATE.
-- Do not create the new unique index until the 66 Montenegro groups
-- listed in the phase report, and the four ОДЛУКА rows, no longer collide.
-- The CREATE below is the gate. It fails while they do.

ALTER TABLE public.legal_articles
  ADD COLUMN amending_act text;

COMMENT ON COLUMN public.legal_articles.amending_act IS
  'Amending act whose standalone article this row is. Null on the consolidated row. Genitive act name, then the gazette as printed.';

-- Montenegro backfill. A row that opens with "Samostalni član" or
-- "Samostalni članovi" takes that act's name and, when the row has one,
-- its Službeni list phrase. Consolidated rows stay null.
-- Checked 2026-10-12: 117 rows have a name, 98 of them also have a gazette.
UPDATE public.legal_articles AS a
SET amending_act = btrim(v.name) || COALESCE(', ' || btrim(v.gazette), '')
FROM (
  SELECT id,
         (regexp_match(flat, '^Samostalni član(?:ovi)? (.+?) Član [0-9]'))[1] AS name,
         (regexp_match(flat, 'Služben[[:alpha:]]*[[:space:]]+list[[:alpha:]]*(?:[[:space:]]+[[:alpha:]]+){0,6}'))[1] AS gazette
    FROM (
      SELECT id,
             regexp_replace(text_local, '[[:space:]]+', ' ', 'g') AS flat
        FROM public.legal_articles
       WHERE jurisdiction = 'montenegro'
    ) src
) v
WHERE a.id = v.id
  AND v.name IS NOT NULL;
-- expected: UPDATE 117

-- After the remainder in the phase report is resolved, replace the key.
-- Postgres 17. NULLS NOT DISTINCT makes a second consolidated row,
-- both amending_act NULL, collide.
CREATE UNIQUE INDEX unique_article_amending
  ON public.legal_articles (jurisdiction, law_name_local, article_num, paragraph_num, amending_act)
  NULLS NOT DISTINCT;

DROP INDEX public.unique_article;

ALTER INDEX public.unique_article_amending RENAME TO unique_article;

-- Verification, read-only. Montenegro must come back with zero groups.
-- SELECT jurisdiction, COUNT(*) AS groups, SUM(rows) AS rows
--   FROM (
--     SELECT jurisdiction, law_name_local, article_num, paragraph_num, amending_act, COUNT(*) AS rows
--       FROM public.legal_articles
--      WHERE jurisdiction = 'montenegro'
--      GROUP BY 1, 2, 3, 4, 5
--     HAVING COUNT(*) > 1
--   ) g
--  GROUP BY jurisdiction;
