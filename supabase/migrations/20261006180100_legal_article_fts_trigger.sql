-- Keep legal_article_fts in step with legal_articles.text_local.
-- Do not apply from this chat. Apply after 20261006180000 and before the
-- backfill, so rows inserted while the backfill runs are not missed.

CREATE OR REPLACE FUNCTION public.legal_article_fts_sync()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.text_local IS NULL THEN
      RETURN NEW;
    END IF;
    INSERT INTO public.legal_article_fts (article_id, tsv)
    VALUES (NEW.id, to_tsvector('simple', NEW.text_local));
    RETURN NEW;
  END IF;

  IF NEW.text_local IS NOT DISTINCT FROM OLD.text_local THEN
    RETURN NEW;
  END IF;

  IF NEW.text_local IS NULL THEN
    DELETE FROM public.legal_article_fts WHERE article_id = NEW.id;
    RETURN NEW;
  END IF;

  INSERT INTO public.legal_article_fts (article_id, tsv)
  VALUES (NEW.id, to_tsvector('simple', NEW.text_local))
  ON CONFLICT (article_id) DO UPDATE SET tsv = EXCLUDED.tsv;
  RETURN NEW;
END;
$$;

CREATE TRIGGER legal_article_fts_sync
AFTER INSERT OR UPDATE OF text_local
ON public.legal_articles
FOR EACH ROW
EXECUTE FUNCTION public.legal_article_fts_sync();
