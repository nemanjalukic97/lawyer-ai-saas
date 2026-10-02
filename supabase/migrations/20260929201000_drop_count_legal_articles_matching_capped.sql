-- Optional cleanup: the capped IDF COUNT RPC is unused once exact df is
-- persisted. Do not apply with the token_df migration unless you want it
-- removed; leaving it is harmless.

DROP FUNCTION IF EXISTS public.count_legal_articles_matching_capped(text, text[], integer);
