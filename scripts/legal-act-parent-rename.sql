-- Owner-run. Do not apply from the agent.
-- Run after supabase/migrations/20261002200000_legal_act_parent.sql
-- and before scripts/legal-act-parent-insert.sql.
-- The insert stores these titles as child_law_name_local.
--
-- Checked 2026-10-02: no serbia row already uses either target name,
-- so unique_article (jurisdiction, law_name_local, article_num, paragraph_num)
-- is not in the way. Both law_name and law_name_local hold the bad string.
-- Untitled 1 is three documents and is not in this file.

UPDATE public.legal_articles
SET
  law_name_local = 'Уредба о Класификацији делатности',
  law_name = 'Уредба о Класификацији делатности'
WHERE jurisdiction = 'serbia'
  AND law_name_local = 'На основу члана 3';
-- expected: UPDATE 234

UPDATE public.legal_articles
SET
  law_name_local = 'Уредба о Каталогу радних места у јавним службама и другим организацијама у јавном сектору',
  law_name = 'Уредба о Каталогу радних места у јавним службама и другим организацијама у јавном сектору'
WHERE jurisdiction = 'serbia'
  AND law_name_local = 'katalog';
-- expected: UPDATE 751
