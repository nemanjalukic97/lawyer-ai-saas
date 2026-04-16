-- Fix matter number generation (duplicate MAT-YYYY-001)
-- Replaces the previous trigger-based generator with a user-scoped, year-scoped sequence.

CREATE OR REPLACE FUNCTION public.generate_matter_number()
RETURNS TRIGGER AS $$
DECLARE
  year_str TEXT;
  last_number INT;
  new_number TEXT;
  last_matter TEXT;
BEGIN
  IF NEW.matter_number IS NOT NULL AND NEW.matter_number != '' THEN
    RETURN NEW;
  END IF;
  
  year_str := EXTRACT(YEAR FROM COALESCE(NEW.opened_at, CURRENT_DATE))::TEXT;
  
  -- Find highest existing number for this user+year
  SELECT matter_number INTO last_matter
  FROM public.matters
  WHERE user_id = NEW.user_id
    AND matter_number LIKE 'MAT-' || year_str || '-%'
  ORDER BY matter_number DESC
  LIMIT 1;
  
  IF last_matter IS NULL THEN
    last_number := 0;
  ELSE
    last_number := CAST(SPLIT_PART(last_matter, '-', 3) AS INT);
  END IF;
  
  new_number := 'MAT-' || year_str || '-' || LPAD((last_number + 1)::TEXT, 3, '0');
  NEW.matter_number := new_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS trg_matters_set_matter_number ON public.matters;
DROP TRIGGER IF EXISTS set_matter_number ON public.matters;
CREATE TRIGGER set_matter_number
  BEFORE INSERT ON public.matters
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_matter_number();

