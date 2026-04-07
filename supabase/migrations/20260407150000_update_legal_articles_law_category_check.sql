ALTER TABLE legal_articles 
DROP CONSTRAINT IF EXISTS legal_articles_law_category_check;

ALTER TABLE legal_articles 
ADD CONSTRAINT legal_articles_law_category_check 
CHECK (law_category IN (
  'civil', 'commercial', 'labor', 'family', 
  'criminal', 'administrative', 'procedural', 
  'constitutional', 'inheritance', 'property',
  'confidentiality'
));

