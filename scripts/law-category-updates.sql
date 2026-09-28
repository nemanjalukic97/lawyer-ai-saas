-- Owner-run corrections for the approved law_category list.
-- 87 laws, 6,321 rows. The 39-row FBiH prečišćeni text of Zakon o vanparničnom postupku stays inheritance.
-- Each statement matches jurisdiction, law_name_local, and the current category.
-- A second run affects 0 rows.

-- slovenia | labor -> commercial | expect 398
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (uradno prečiščeno besedilo) (ZFPPIPP-UPB17)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 386
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (uradno prečiščeno besedilo) (ZFPPIPP-UPB8)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 339
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o gospodarskih družbah (uradno prečiščeno besedilo) (ZGD-1-UPB3)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 324
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (uradno prečiščeno besedilo) (ZFPPIPP-UPB7)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 252
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP)$law$
  AND law_category = 'labor';

-- bih_rs | general -> commercial | expect 216
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'bih_rs'
  AND law_name_local = $law$ZAKONO PRIVREDNIM DRUŠTVIMA$law$
  AND law_category = 'general';

-- montenegro | general -> commercial | expect 143
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'montenegro'
  AND law_name_local = $law$ZAKONO PRIVREDNIM DRUŠTVIMA$law$
  AND law_category = 'general';

-- bih_fbih | general -> commercial | expect 96
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'bih_fbih'
  AND law_name_local = $law$Zakon o privrednim društvima FBiH - neslužbeni prečišćeni tekst („Službene novine Federacije BiH“, broj: 81/15 i 75/21)$law$
  AND law_category = 'general';

-- bih_fbih | general -> commercial | expect 95
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'bih_fbih'
  AND law_name_local = $law$ZAKONO PRIVREDNIM DRUŠTVIMA("Sl. novine FBiH", br. 81/2015 i 75/2021)$law$
  AND law_category = 'general';

-- slovenia | labor -> commercial | expect 73
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-F)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 49
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-C)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 45
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-H)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 37
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-E)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 15
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-G)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 14
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-A)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 5
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-B)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 3
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-D)$law$
  AND law_category = 'labor';

-- slovenia | labor -> commercial | expect 3
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o finančnem poslovanju, postopkih zaradi insolventnosti in prisilnem prenehanju (ZFPPIPP-I)$law$
  AND law_category = 'labor';

-- serbia | general -> commercial | expect 2
UPDATE legal_articles
SET law_category = 'commercial'
WHERE jurisdiction = 'serbia'
  AND law_name_local = $law$ЗАКОН о стечају$law$
  AND law_category = 'general';

-- slovenia | labor -> criminal | expect 374
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o kazenskem postopku (uradno prečiščeno besedilo) (ZKP-UPB16)$law$
  AND law_category = 'labor';

-- slovenia | labor -> criminal | expect 304
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o kazenskem postopku (uradno prečiščeno besedilo) (ZKP-UPB8)$law$
  AND law_category = 'labor';

-- slovenia | labor -> criminal | expect 255
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o kazenskem postopku (uradno prečiščeno besedilo) (ZKP-UPB4)$law$
  AND law_category = 'labor';

-- slovenia | labor -> criminal | expect 253
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o kazenskem postopku (uradno prečiščeno besedilo) (ZKP-UPB3)$law$
  AND law_category = 'labor';

-- slovenia | labor -> criminal | expect 244
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o kazenskem postopku (uradno prečiščeno besedilo) (ZKP-UPB2)$law$
  AND law_category = 'labor';

-- slovenia | labor -> criminal | expect 229
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o kazenskem postopku (uradno prečiščeno besedilo) (ZKP-UPB1)$law$
  AND law_category = 'labor';

-- slovenia | labor -> criminal | expect 166
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Kazenski zakonik (uradno prečiščeno besedilo) (KZ-1-UPB2)$law$
  AND law_category = 'labor';

-- slovenia | general -> criminal | expect 147
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Kazenski zakonik (KZ-1)$law$
  AND law_category = 'general';

-- slovenia | labor -> criminal | expect 141
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Kazenski zakonik (uradno prečiščeno besedilo) (KZ-UPB1)$law$
  AND law_category = 'labor';

-- slovenia | general -> criminal | expect 128
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Kazenski zakonik (KZ)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 80
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-N)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 50
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-K)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 43
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Kazenskega zakonika (KZ-1B)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 26
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-I)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 26
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-O)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 24
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-P)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 22
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah zakona o kazenskem postopku (ZKP-F)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 21
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah zakona o kazenskem postopku (ZKP-E)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 20
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah kazenskega zakonika (KZ-B)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 20
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o zaščiti otrok v kazenskem postopku in njihovi celostni obravnavi v hiši za otroke (ZZOKPOHO)$law$
  AND law_category = 'general';

-- croatia | general -> criminal | expect 18
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'croatia'
  AND law_name_local = $law$Zakon o izmjenama i dopunama Zakona o kaznenom postupku$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 18
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Kazenskega zakonika (KZ-1I)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 13
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-G)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 12
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah kazenskega zakonika Republike Slovenije (KZ-A)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 11
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-J)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 9
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Kazenskega zakonika (KZ-1C)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 9
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-L)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 8
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Kazenskega zakonika (KZ-1E)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 7
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah zakona o kazenskem postopku (ZKP-D)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 5
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o kazenskem postopku (ZKP-M)$law$
  AND law_category = 'general';

-- serbia | general -> criminal | expect 5
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'serbia'
  AND law_name_local = $law$КРИВИЧНИ ЗАКОНИК$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 2
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Kazenskega zakonika (KZ-1H)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 2
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Kazenskega zakonika (KZ-1J)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 2
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembi in dopolnitvi Zakona o kazenskem postopku (ZKP-H)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 1
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o dopolnitvi Kazenskega zakonika (KZ-1F)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 1
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembi Kazenskega zakonika (KZ-1A)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 1
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembi Kazenskega zakonika (KZ-1D)$law$
  AND law_category = 'general';

-- slovenia | general -> criminal | expect 1
UPDATE legal_articles
SET law_category = 'criminal'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembi Kazenskega zakonika (KZ-1G)$law$
  AND law_category = 'general';

-- slovenia | labor -> administrative | expect 116
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o splošnem upravnem postopku (uradno prečiščeno besedilo) (ZUP-UPB2)$law$
  AND law_category = 'labor';

-- slovenia | labor -> administrative | expect 115
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o splošnem upravnem postopku (uradno prečiščeno besedilo) (ZUP-UPB1)$law$
  AND law_category = 'labor';

-- slovenia | general -> administrative | expect 108
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o splošnem upravnem postopku (ZUP)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 36
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah zakona o splošnem upravnem postopku (ZUP-C)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 35
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o splošnem upravnem postopku (ZUP-I)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 33
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o upravnem sporu (ZUS-1)$law$
  AND law_category = 'general';

-- bih_fbih | general -> administrative | expect 23
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'bih_fbih'
  AND law_name_local = $law$Zakon o upravnim sporovima BiH – neslužbeni prečišćeni tekst (“Službeni glasnik Bosne i Hercegovine”, br. 19/02, 88/07, 83/08 i 74/10)$law$
  AND law_category = 'general';

-- bih_fbih | general -> administrative | expect 22
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'bih_fbih'
  AND law_name_local = $law$ZAKONO UPRAVNIM SPOROVIMA BOSNE I HERCEGOVINE$law$
  AND law_category = 'general';

-- bih_fbih | general -> administrative | expect 20
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'bih_fbih'
  AND law_name_local = $law$Zakon o upravnim sporovima Federacije Bosne i Hercegovine („Službene novine Federacije BiH“, broj 9/05)$law$
  AND law_category = 'general';

-- bih_fbih | general -> administrative | expect 20
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'bih_fbih'
  AND law_name_local = $law$ZAKONO UPRAVNIM SPOROVIMA("Sl. novine FBiH", br. 9/2005)$law$
  AND law_category = 'general';

-- bih_rs | general -> administrative | expect 17
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'bih_rs'
  AND law_name_local = $law$ZAKONO UPRAVNIM SPOROVIMA$law$
  AND law_category = 'general';

-- bih_brcko | general -> administrative | expect 13
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'bih_brcko'
  AND law_name_local = $law$ZAKONO UPRAVNIM SPOROVIMA$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 12
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o splošnem upravnem postopku (ZUP-E)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 7
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o upravnem sporu (ZUS-1C)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 4
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o splošnem upravnem postopku (ZUP-G)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 2
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o dopolnitvah zakona o splošnem upravnem postopku (ZUP-B)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 2
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o splošnem upravnem postopku (ZUP-D)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 2
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvah Zakona o upravnem sporu (ZUS-1A)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 2
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembah in dopolnitvi Zakona o splošnem upravnem postopku (ZUP-H)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 1
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o dopolnitvah Zakona o upravnem sporu (ZUS-1B)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 1
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembi in dopolnitvah Zakona o splošnem upravnem postopku (ZUP-F)$law$
  AND law_category = 'general';

-- slovenia | general -> administrative | expect 1
UPDATE legal_articles
SET law_category = 'administrative'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Zakon o spremembi zakona o splošnem upravnem postopku (ZUP-A)$law$
  AND law_category = 'general';

-- bih_rs | general -> procedural | expect 60
UPDATE legal_articles
SET law_category = 'procedural'
WHERE jurisdiction = 'bih_rs'
  AND law_name_local = $law$ZAKONO VANPARNIČNOM POSTUPKU("Sl. glasnik RS", br. 36/2009, 91/2016, 16/2023 i 27/2024)$law$
  AND law_category = 'general';

-- montenegro | general -> procedural | expect 59
UPDATE legal_articles
SET law_category = 'procedural'
WHERE jurisdiction = 'montenegro'
  AND law_name_local = $law$ZAKONO VANPARNIČNOM POSTUPKU$law$
  AND law_category = 'general';

-- croatia | general -> procedural | expect 52
UPDATE legal_articles
SET law_category = 'procedural'
WHERE jurisdiction = 'croatia'
  AND law_name_local = $law$Zakon o izvanparničnom postupku$law$
  AND law_category = 'general';

-- bih_fbih | general -> procedural | expect 35
UPDATE legal_articles
SET law_category = 'procedural'
WHERE jurisdiction = 'bih_fbih'
  AND law_name_local = $law$ZAKONO VANPARNIČNOM POSTUPKU("Sl. novine FBiH", br. 2/1998, 39/2004, 73/2005, 80/2014 - dr. zakon i 11/2021)$law$
  AND law_category = 'general';

-- bih_brcko | general -> procedural | expect 34
UPDATE legal_articles
SET law_category = 'procedural'
WHERE jurisdiction = 'bih_brcko'
  AND law_name_local = $law$ZAKONO VANPARNIČNOM POSTUPKU$law$
  AND law_category = 'general';

-- slovenia | labor -> civil | expect 236
UPDATE legal_articles
SET law_category = 'civil'
WHERE jurisdiction = 'slovenia'
  AND law_name_local = $law$Obligacijski zakonik (uradno prečiščeno besedilo) (OZ-UPB1)$law$
  AND law_category = 'labor';

-- bih_brcko | general -> property | expect 59
UPDATE legal_articles
SET law_category = 'property'
WHERE jurisdiction = 'bih_brcko'
  AND law_name_local = $law$ZAKONO VLASNIŠTVU I DRUGIM STVARNIM PRAVIMA BRČKO DISTRIKTA BOSNE I HERCEGOVINE$law$
  AND law_category = 'general';

-- croatia | general -> property | expect 1
UPDATE legal_articles
SET law_category = 'property'
WHERE jurisdiction = 'croatia'
  AND law_name_local = $law$Zakon o izmjeni i dopuni Zakona o vlasništvu i drugim stvarnim pravima$law$
  AND law_category = 'general';

-- After every statement above. Expected rows:
-- commercial 6661, criminal 7051, administrative 1902,
-- procedural 2186, civil 5785, property 2454.
SELECT law_category, count(*) AS rows
FROM legal_articles
WHERE law_category IN (
  'commercial',
  'criminal',
  'administrative',
  'procedural',
  'civil',
  'property'
)
GROUP BY law_category
ORDER BY CASE law_category
  WHEN 'commercial' THEN 1
  WHEN 'criminal' THEN 2
  WHEN 'administrative' THEN 3
  WHEN 'procedural' THEN 4
  WHEN 'civil' THEN 5
  WHEN 'property' THEN 6
END;
