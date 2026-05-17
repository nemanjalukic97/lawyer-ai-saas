// scripts/case-law-family-serbia-3.ts
// Serbian family case law — custody, parental responsibility, CSR, administrative and constitutional decisions (batch 1 of 3).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_FAMILY_SERBIA_3: CaseLawInput[] = [
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number:
      "Predmet (broj nije naveden u izvoru) – razvod, poveravanje deteta i potpuno lišenje roditeljskog prava",
    legal_area: "family",
    legal_question:
      "Da li je osnovano potpuno lišenje oca roditeljskog prava i poveravanje deteta majci na samostalno vršenje roditeljskog prava zbog zlostavljanja i zanemarivanja?",
    court_position:
      "Apelacioni sud je potvrdio odluku kojom je majci povereno samostalno vršenje roditeljskog prava, a otac potpuno lišen istog zbog ugrožavanja fizičke bezbednosti i psihičkog zdravlja deteta.",
    reasoning:
      "Sadržina roditeljskog prava obuhvata staranje, čuvanje, podizanje, vaspitanje, obrazovanje, zastupanje i izdržavanje deteta (čl. 68–74. PZ), a sve se meri najboljim interesom deteta (čl. 6. i 266. PZ). Po čl. 76–77. PZ zajedničko vršenje zahteva sporazum u interesu deteta; bez sporazuma ili kada sporazum nije u interesu deteta, sud odlučuje o poveravanju jednom roditelju (čl. 77. st. 3). U konkretnom slučaju utvrđene su zlostavljanje i zanemarivanje sa strane oca; majčine roditeljske kompetencije ocenjene su kao adekvatne.",
    keywords: ["potpuno lišenje roditeljskog prava", "poveravanje deteta", "najbolji interes deteta", "zlostavljanje"],
    related_articles: ["član 6. PZ", "član 68–74. PZ", "član 76–77. PZ", "član 266. PZ"],
    headnote: "Potvrđeno poveravanje majci i potpuno lišenje oca zbog zlostavljanja i zanemarivanja deteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9727/2022",
    legal_area: "family",
    legal_question:
      "Da li je u najboljem interesu deteta da se maloletna ćerka poveri ocu na samostalno vršenje roditeljskog prava uprkos žalbi majke?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju majke i potvrdio poveravanje deteta ocu, polazeći od nalaza organa starateljstva i autentične želje deteta.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1, 270. i 272. st. 2. PZ. Sud mora pre odluke pribaviti nalaz i mišljenje CSR ili druge specijalizovane ustanove. Kriterijumi uključuju uzrast, pol, želje deteta kad je sposobno da ih izrazi, potrebe i roditeljsku sposobnost. Kontinuitet boravka kod oca, sigurnost deteta i procena struke podržavaju odluku nižih sudova.",
    keywords: ["samostalno roditeljsko pravo", "mišljenje deteta", "član 270. PZ", "član 266. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 272. st. 2. PZ"],
    headnote: "Potvrđeno poveravanje ocu uz uvažavanje želje deteta i mišljenja starateljskog organa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 10786/2023",
    legal_area: "family",
    legal_question:
      "Da li je pravilno poveravanje dece majci na samostalno vršenje roditeljskog prava kada dete želi da živi sa majkom i CSR to podržava?",
    court_position:
      "Odbačena je revizija oca; potvrđena je odluka o poveravanju maloletne dece majci uz redovne kontakte sa ocem prema modelu iz stručnog mišljenja i veštaka.",
    reasoning:
      "Primenjeni su čl. 76, 77, 266, 270. i 272. PZ. Zajedničko vršenje zahteva sporazum u interesu deteta; bez sporazuma sud donosi odluku. Obavezno je mišljenje organa starateljstva pre odluke. Nižestepeni sudovi su pravilno primenili materijalno pravo i najbolji interes deteta.",
    keywords: ["poveravanje deteta", "sporazum o roditeljskom pravu", "član 270. PZ"],
    related_articles: ["član 76. PZ", "član 77. PZ", "član 266. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje majci uz model viđanja iz CSR i veštaka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7410/2021",
    legal_area: "family",
    legal_question:
      "Da li nalaz veštaka psihologije i psihijatrije i organ starateljstva mogu opravdati poveravanje deteta ocu na samostalno vršenje roditeljskog prava?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je poveravanje deteta ocu na osnovu čl. 77. st. 3. PZ i procene najboljeg interesa deteta.",
    reasoning:
      "Roditeljsko pravo proističe iz dužnosti prema detetu (čl. 67. PZ); sadržina je u čl. 68–74. PZ. Najbolji interes se ceni prema uzrastu, željama, potrebama i roditeljskoj sposobnosti. Nižestepeni sudovi su pravilno primenili čl. 270. PZ i pribavili veštačenje; veštaci su ocenili da otac pokazuje veću zrelost i zainteresovanost za dobrobit deteta i kontinuitet u njegovom domaćinstvu.",
    keywords: ["veštačenje", "roditeljska sposobnost", "član 77. st. 3. PZ", "član 270. PZ"],
    related_articles: ["član 67. PZ", "član 68–74. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje ocu uz psihološko-psihijatrijsko veštačenje i CSR.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 12770/2022",
    legal_area: "family",
    legal_question:
      "Da li je centar za socijalni rad povredio pravo deteta na porodični život ako dete nije dovoljno brzo vraćeno u porodicu nakon izmeštanja?",
    court_position:
      "Odbačena je revizija CSR; potvrđeno je da je centar povredio pravo deteta na porodični život jer nije preduzeo dovoljno mera za olakšavanje povratka.",
    reasoning:
      "Preventivni nadzor (čl. 79. PZ) i korektivni nadzor (čl. 80. PZ) obavezuju organ starateljstva da donosi odluke kojima se štiti dete i, po potrebi, pokreću sudski postupci. U konkretnom slučaju izmeštanje je bilo opravdano, ali centar nije dovoljno aktivno radio na uslovima za povratak u porodičnu sredinu, što šteti pravu deteta na porodični život.",
    keywords: ["centar za socijalni rad", "porodični život deteta", "korektivni nadzor", "član 80. PZ"],
    related_articles: ["član 79. PZ", "član 80. PZ"],
    headnote: "CSR odgovoran za nedovoljne mere radi povratka deteta u porodicu posle izmeštanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1391/2021",
    legal_area: "family",
    legal_question:
      "Da li očevo prethodno ograničavanje kontakta majke sa detetem utiče na poveravanje majci na samostalno roditeljsko pravo?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci kao u najboljem interesu deteta, uz strah deteta od očeve dominacije i podršku CSR.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1. i 270. PZ i Konvencija o pravima deteta. Elementi najboljeg interesa uključuju zrelost, potrebe i roditeljsku sposobnost. Utvrđeno je da majka pokazuje pozitivne kapacitete, a da dete u datom uzrastu i psihičkom stanju ne bi bilo dobro da otac samostalno vrši roditeljsko pravo zbog straha od gubitka kontakta sa majkom i obrazovanja.",
    keywords: ["kontakt sa detetom", "najbolji interes deteta", "član 270. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "KPD član 3."],
    headnote: "Poveravanje majci potvrđeno uz očevo ranije otežavanje majčinog kontakta i strah deteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4523/2024",
    legal_area: "family",
    legal_question:
      "Da li je dovoljan nalaz organa starateljstva za poveravanje majci ako nedostaju predlog o poveravanju i opservacija odnosa deteta sa roditeljima?",
    court_position:
      "Vrhovni sud je ukinuo nižestepene presude o poveravanju majci i vratio predmet na ponovno suđenje zbog nepotpunog nalaza CSR.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1. i 270. PZ. Najbolji interes deteta je primaran; CSR treba da pruži procenu porodičnih prilika i predlog o načinu vršenja roditeljskog prava. Bez predloga i opservacije odnosa deteta sa roditeljima nalaz je nepotpun za zakonitu odluku.",
    keywords: ["ukidanje", "član 270. PZ", "organ starateljstva", "ponovno suđenje"],
    related_articles: ["član 266. st. 1. PZ", "član 270. PZ", "član 77. st. 3. PZ"],
    headnote: "Vraćanje predmeta jer nalaz CSR nije sadržao predlog poveravanja ni opservaciju odnosa.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 29286/2023",
    legal_area: "family",
    legal_question:
      "Da li promenjene okolnosti, želja deteta i mišljenje CSR opravdavaju izmenu ranje odluke u korist očevog samostalnog roditeljskog prava?",
    court_position:
      "Odbačena je revizija tužene majke; potvrđeno je poveravanje deteta ocu na samostalno vršenje roditeljskog prava.",
    reasoning:
      "Primenjeni su čl. 6, 77. st. 3, 266. st. 1, 270. i 272. PZ. Izmena vršenja roditeljskog prava mora biti u najboljem interesu deteta uz obavezno stručno mišljenje. Nižestepeni sudovi su pravilno ocenili promenu okolnosti, želju deteta i nalaz CSR.",
    keywords: ["izmena roditeljskog prava", "želja deteta", "član 266. PZ", "CSR"],
    related_articles: ["član 6. st. 1. PZ", "član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđena izmena u korist oca uz promenu okolnosti i želju deteta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3128/2024",
    legal_area: "family",
    legal_question:
      "Kako sud ocenjuje suprotstavljena mišljenja CSR i komisije sudskih veštaka kada oba roditelja deluju podobno?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je poveravanje deteta ocu, uz ocenu da je otac podobniji za samostalno staranje prema zrelijem ponašanju i interesu deteta.",
    reasoning:
      "CSR je smatrao majku podobnijom; veštaci su preporučili oca za samostalno vršenje uz kontakte majke. Sud je ocenio da se otac u razdvajanju ponašao u interesu deteta, da je zreliji i da majka minimizuje ulogu oca. Primenjeni su čl. 6, 77. st. 3, 266. i 270. PZ.",
    keywords: ["sudski veštaci", "CSR", "konflikt mišljenja", "najbolji interes deteta"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje ocu uprkos delimično suprotnom mišljenju CSR.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2249/2017",
    legal_area: "family",
    legal_question:
      "Da li poboljšanje stanja deteta kod oca, želja deteta i CSR opravdavaju izmenu ranje odluke u korist očevog samostalnog roditeljskog prava?",
    court_position:
      "Potvrđena je odluka o izmeni u korist oca; majka nije lišena prava na kontakte uz pravilnu primenu čl. 61. st. 1. i 78. st. 3. PZ.",
    reasoning:
      "Odluka o samostalnom vršenju podložna je promeni po promeni okolnosti (čl. 77. i 272. u vezi sa 270. PZ). Roditeljsko pravo proističe iz čl. 67. PZ. Nadzor CSR (čl. 79–80. PZ) podržava procenu. Majka zadržava pravo na lične odnose i savesno vršenje dužnosti prema detetu bez uznemiravanja.",
    keywords: ["izmena roditeljskog prava", "nadzor starateljstva", "član 78. st. 3. PZ"],
    related_articles: ["član 67. PZ", "član 77. st. 3. PZ", "član 270. PZ", "član 61. st. 1. PZ"],
    headnote: "Izmena u korist oca potvrđena zbog poboljšanja stanja deteta i želje deteta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7289/2022",
    legal_area: "family",
    legal_question:
      "Da li istorija nasilja u porodici i alkoholizam oca mogu opravdati ograničen i kontrolisan model viđanja sa decom?",
    court_position:
      "Odbačena je revizija oca; potvrđen je ograničen i kontrolisan model viđanja u najboljem interesu dece.",
    reasoning:
      "Roditeljsko pravo postoji radi zaštite deteta (čl. 67. PZ). Roditelj koji ne vrši pravo ima pravo i dužnost na kontakte (čl. 78. st. 3. PZ). U sporovima o roditeljskom pravu važi čl. 266. st. 1. PZ i obaveza čl. 270. PZ. Ograničenje kontakta mora biti razumno i zasnovano na strahu i riziku za dete.",
    keywords: ["ograničeno viđanje", "nasilje u porodici", "alkoholizam", "član 266. PZ"],
    related_articles: ["član 67. PZ", "član 78. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđen kontrolisan model viđanja zbog nasilja i alkohola.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 7475/2014",
    legal_area: "family",
    legal_question:
      "Da li je organ starateljstva nadležan za donošenje rešenja o korektivnom nadzoru nad vršenjem roditeljskog prava?",
    court_position:
      "Upravni sud je odbio tužbu protiv rešenja o korektivnom nadzoru; organ starateljstva je isključivo nadležan po čl. 80. i 341. PZ.",
    reasoning:
      "Korektivni nadzor je mera porodično-pravne zaštite kojom se ispravljaju roditelji (čl. 80. PZ: upozorenje, upućivanje u savetovalište, račun o imovini, pokretanje sudskih postupaka). Rešenjem po čl. 341. PZ organ odlučuje o preventivnom ili korektivnom nadzoru. Tužbeni navodi nisu uticali na zakonitost osporenog rešenja.",
    keywords: ["korektivni nadzor", "organ starateljstva", "član 80. PZ", "Upravni sud"],
    related_articles: ["član 80. PZ", "član 341. PZ"],
    headnote: "Odbijena tužba protiv rešenja o korektivnom nadzoru; nadležnost CSR potvrđena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 12222/2025",
    legal_area: "family",
    legal_question:
      "Da li terenska kontrola, CSR i vezanost deteta za oca podržavaju poveravanje ocu na samostalno roditeljsko pravo?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je poveravanje ocu uz obavezu majke na izdržavanje i model kontakata.",
    reasoning:
      "CSR i veštaci su utvrdili da su oba roditelja motivisana, ali da otac bolje prepoznaje potrebe deteta i saradjuje sa majkom. Primenjeni su čl. 77. st. 3, 266. i 270. PZ. Drugostepena odluka je na pravilnoj primeni materijalnog prava.",
    keywords: ["poveravanje ocu", "CSR", "najbolji interes deteta"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje ocu uz stručnu procenu veze deteta sa ocem.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3187/2022",
    legal_area: "family",
    legal_question:
      "Da li ponovljeni postupak CSR i usaglašeni nalaz podržavaju poveravanje ocu uprkos ranijem mišljenju u korist majke?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je poveravanje ocu prema novom izveštaju CSR u Prokuplju i konačnom mišljenju u skladu sa ranijim predlogom.",
    reasoning:
      "Primenjeni su čl. 270, 272. st. 2–3. i 266. PZ. Ako dete nije kod roditelja kome treba poveriti pravo, sud može narediti predaju (čl. 272. st. 3). Ponovna procena potreba deteta dala je osnov za odluku u korist oca uz stabilniju sredinu za dete.",
    keywords: ["ponovni izveštaj CSR", "član 270. PZ", "poveravanje ocu"],
    related_articles: ["član 270. PZ", "član 272. st. 2. PZ", "član 266. st. 1. PZ"],
    headnote: "Potvrđeno poveravanje ocu posle ponovljenog stručnog postupka u CSR.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 348/2021",
    legal_area: "family",
    legal_question:
      "Da li je pravilno poveravanje deteta majci i odbijanje očevog zahteva za starateljstvo i delimično lišenje majke?",
    court_position:
      "Apelacioni sud je odbio žalbu oca i potvrdio razvod, poveravanje majci, model viđanja i odbijanje protivtužbi oca.",
    reasoning:
      "Bez sporazuma o zajedničkom vršenju sud primenjuje čl. 270. PZ i mišljenje CSR Novi Beograd/Zemun/Zvezdara. CSR je predložio majku za samostalno vršenje; otac ostaje podoban za kontakte. Žalba da je trebalo poveriti ocu ocenjena je kao neosnovana.",
    keywords: ["razvod", "poveravanje majci", "član 270. PZ", "CSR Beograd"],
    related_articles: ["član 75. st. 2. PZ", "član 270. PZ", "član 77. st. 3. PZ"],
    headnote: "Potvrđeno poveravanje majci i odbijeni očevi protivtužbeni zahtevi.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2557/2020",
    legal_area: "family",
    legal_question:
      "Da li sud može poveriti dete majci uprkos izričitoj želji deteta da živi sa ocem kada oba roditelja ostaju podobna?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđeno je poveravanje majci kao u najboljem interesu deteta.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1–3. i 270. PZ. Sud mora saslušati mišljenje sposobnog deteta, ali najbolji interes nije samo želja deteta; ocenjuju se i potrebe i roditeljska sposobnost. Tužilja (majka) je ocenjena kao roditelj koji će samostalno vršiti pravo uprkos želji deteta za ocem.",
    keywords: ["mišljenje deteta", "najbolji interes", "član 266. st. 3. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1–3. PZ", "član 270. PZ"],
    headnote: "Poveravanje majci potvrđeno i kada dete želi oca; šira procena interesa deteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 308/2023",
    legal_area: "family",
    legal_question:
      "Da li stabilnost života deteta sa ocem može opravdati poveravanje ocu kada su oba roditelja podobna?",
    court_position:
      "Apelacioni sud je odbio žalbu majke i potvrdio poveravanje ocu na samostalno vršenje roditeljskog prava.",
    reasoning:
      "Primenjeni su čl. 6. i 77. st. 3. PZ. Dete živi u stabilnoj zajednici sa ocem i sestrom, razvija se u skladu sa uzrastom; otac je organizovao život u korist deteta uz saradnju sa majkom. CSR i veštaci podržavaju očuvanje postojećeg modela kao optimalnog za najbolji interes deteta.",
    keywords: ["kontinuitet boravka", "stabilnost", "najbolji interes deteta"],
    related_articles: ["član 6. st. 1. PZ", "član 77. st. 3. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje ocu zbog stabilnosti i razvoja deteta u njegovom domaćinstvu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 28186/2023",
    legal_area: "family",
    legal_question:
      "Da li je poveravanje majci u skladu sa KPD i PZ kada veštaci ukazuju na veću emotivnu povezanost deteta sa majkom?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđeno je poveravanje majci na samostalno vršenje roditeljskog prava.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1. i 270. PZ i čl. 3. KPD o primatu interesa deteta. Nižestepeni sudovi su pravilno primenili materijalno pravo i stručna mišljenja.",
    keywords: ["Konvencija o pravima deteta", "član 3. KPD", "član 266. PZ"],
    related_articles: ["član 3. KPD", "član 6. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje majci uz KPD i pravilnu primenu PZ.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 441/2018",
    legal_area: "family",
    legal_question:
      "Da li sud može odlučiti o poveravanju i alimentaciji bez nalaza i mišljenja organa starateljstva kada roditelji nisu postigli sporazum?",
    court_position:
      "Potvrđen je razvod, ali su ukinute odluke o poveravanju, izdržavanju i viđanju zbog propusta da se pribavi nalaz i mišljenje CSR u smislu čl. 270. PZ.",
    reasoning:
      "Primenjeni su čl. 6, 76, 78, 225. i 270. PZ. Sud mora utvrditi da li je sporazum o vršenju roditeljskog prava u interesu deteta i pribaviti stručno mišljenje o roditeljskim sposobnostima i okolnostima. Bez toga činjenično stanje nije potpuno utvrđeno.",
    keywords: ["član 270. PZ", "ukidanje", "sporazum roditelja", "istražno načelo"],
    related_articles: ["član 6. st. 1. PZ", "član 76. st. 1. PZ", "član 270. PZ", "član 205. ZPP"],
    headnote: "Ukidanje delova presude o deci zbog izostanka nalaza CSR.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 103/2017",
    legal_area: "family",
    legal_question:
      "Da li se može povećati doprinos majke za izdržavanje sa 5.000 na 10.000 dinara kada je dete povereno ocu?",
    court_position:
      "Potvrđeno je poveravanje ocu; preinačena je visina majčinog doprinosa na 10.000 dinara mesečno.",
    reasoning:
      "Po čl. 272. st. 3. PZ sud može narediti predaju deteta roditelju kome je povereno pravo. Primenjeni su čl. 67, 77. i 266. PZ. Majčin doprinos preračunat je u skladu sa mogućnostima i potrebama deteta; očevo ometanje kontakata majke ne utiče na ocenu da je otac kompetentniji za staranje.",
    keywords: ["poveravanje ocu", "izdržavanje", "član 272. st. 3. PZ"],
    related_articles: ["član 67. PZ", "član 77. PZ", "član 266. PZ", "član 272. st. 3. PZ"],
    headnote: "Potvrđeno poveravanje ocu; povećan majčin doprinos na 10.000 RSD.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 912/2021",
    legal_area: "family",
    legal_question:
      "Da li je drugostepeni sud pravilno cenio najbolji interes deteta i mišljenje deteta u sporu o delimičnom lišenju roditeljskog prava oca?",
    court_position:
      "VKS je ukinuo presudu Apelacionog suda koja je odbila delimično lišenje; drugostepeni sud je previše dao prednost interesu oca u odnosu na dete i CSR.",
    reasoning:
      "Dete ima pravo na razvoj, obrazovanje i slobodno mišljenje (čl. 62–65. PZ). Roditelj koji ne vrši pravo zadržava određena prava zajedničkog odlučivanja (čl. 78. st. 3). Delimično lišenje je moguće po čl. 82. PZ kada je nesavesno vršenje utvrđeno. Drugostepeni sud nije adekvatno procenio mišljenje deteta i CSR.",
    keywords: ["delimično lišenje", "najbolji interes deteta", "član 82. PZ", "ukidanje"],
    related_articles: ["član 62–65. PZ", "član 78. st. 3. PZ", "član 82. PZ", "član 266. PZ"],
    headnote: "Ukidanje odbijanja delimičnog lišenja zbog nedovoljnog poštovanja interesa deteta.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2571/2020",
    legal_area: "family",
    legal_question:
      "Da li disfunkcionalni odnosi roditelja isključuju zajedničko vršenje roditeljskog prava i opravdavaju poveravanje majci?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđeno je poveravanje majci na samostalno vršenje jer sporazum o zajedničkom vršenju nije u interesu deteta.",
    reasoning:
      "Primenjeni su čl. 61, 68, 77. st. 3, 270. i 272. PZ. Bez funkcionalnog sporazuma sud odlučuje o poveravanju jednom roditelju. Nesklad između roditelja onemogućava zajedničko vršenje koje bi bilo u interesu deteta.",
    keywords: ["zajedničko roditeljsko pravo", "sporazum", "član 77. st. 3. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 270. PZ", "član 272. st. 2. PZ"],
    headnote: "Poveravanje majci zbog nemogućnosti funkcionalnog zajedničkog vršenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 402/2018",
    legal_area: "family",
    legal_question:
      "Da li je sud nadležan da izmeni model viđanja sa punoletnim sinom lišenim poslovne sposobnosti posle neposrednog starateljstva CSR?",
    court_position:
      "Potvrđeno je da sud nije nadležan da uređuje lične odnose nakon što je lice pod neposrednim starateljstvom organa starateljstva.",
    reasoning:
      "Prava deteta na lične odnose uređena su čl. 61. PZ. U sporovima o roditeljskom pravu važi čl. 266. PZ. Kada dete nije pod roditeljskim staranjem u smislu sporova između roditelja, drugi režim nadležnosti može isključiti parnično uređivanje viđanja na isti način.",
    keywords: ["punoletnik", "poslovna nesposobnost", "starateljstvo", "nadležnost"],
    related_articles: ["član 61. PZ", "član 266. PZ"],
    headnote: "Nadležnost suda za viđanje sa punoletnikom pod starateljstvom CSR ograničena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2354/2015",
    legal_area: "family",
    legal_question:
      "Da li sud može odbiti sporazumni razvod ako sporazum o roditeljskom pravu nije u najboljem interesu dece?",
    court_position:
      "Odbačena je revizija; potvrđeno je odbijanje predloga za sporazumni razvod jer sporazum o vršenju roditeljskog prava nije u interesu maloletne dece.",
    reasoning:
      "Primenjeni su čl. 6. st. 1. i 266. st. 1. PZ. CSR je utvrdio da sporazum nije u interesu dece i da roditelji nisu podobni bez delimičnog lišenja i uređenja kontakata. Sud ne mora prihvatiti sporazumni razvod ako deo o deci ne zadovoljava zaštitu deteta.",
    keywords: ["sporazumni razvod", "najbolji interes deteta", "odbijanje predloga"],
    related_articles: ["član 6. st. 1. PZ", "član 266. st. 1. PZ"],
    headnote: "Odbijen sporazumni razvod zbog neadekvatnog sporazuma o roditeljskom pravu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 483/2023",
    legal_area: "family",
    legal_question:
      "Da li CSR i mišljenje dece podržavaju poveravanje majci kada majka pokazuje veće roditeljske kompetencije?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci uz pravilnu primenu čl. 6, 65, 266. i 270. PZ i KPD.",
    reasoning:
      "Majka adekvatno prepoznaje emocionalne i razvojne potrebe dece, autoritet je poštovan, očeva uloga je priznata u kontaktima. Stručno mišljenje CSR pribavljeno po čl. 270. PZ pravilno je ocenjeno zajedno sa mišljenjem dece.",
    keywords: ["poveravanje majci", "mišljenje deteta", "član 65. PZ"],
    related_articles: ["član 65. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje majci uz CSR i uvažavanje mišljenja dece.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5390/2025",
    legal_area: "family",
    legal_question:
      "Da li emotivna prilagođenost deteta majci može opravdati poveravanje majci kada oba roditelja imaju roditeljske kapacitete?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci u skladu sa čl. 3. KPD i čl. 6, 77. i 266. PZ.",
    reasoning:
      "Država mora obezbediti zaštitu deteta uz poštovanje prava roditelja (čl. 3. st. 2. KPD). Oba roditelja imaju kapacitete i uslove, ali je prilagođenost deteta majci odlučujući faktor u konkretnom slučaju.",
    keywords: ["prilagođenost deteta", "KPD član 3", "član 6. PZ"],
    related_articles: ["član 3. KPD", "član 6. st. 1. PZ", "član 77. st. 3. PZ", "član 266. st. 1. PZ"],
    headnote: "Potvrđeno poveravanje majci zbog emotivne povezanosti deteta sa majkom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 14714/2024",
    legal_area: "family",
    legal_question:
      "Da li punoletni roditelj koji samostalno vrši roditeljsko pravo može izdati putnu ispravu detetu bez saglasnosti drugog roditelja?",
    court_position:
      "Delimično usvojena revizija oca: preinačen model viđanja za Uskrs; ukinuta odluka o alimentaciji zbog nepotpunog činjeničnog stanja; potvrđena pravila o putnoj ispravi i inostranstvu.",
    reasoning:
      "Pitanja bitna za život deteta uključuju obrazovanje, zdravlje, prebivalište i imovinu (čl. 78. st. 4. PZ). Zakon o putnim ispravama i praksa: kada jedan roditelj samostalno vrši pravo, nije uvek potrebna saglasnost oba roditelja za prelazak granice u skladu sa sudskom odlukom. Za alimentaciju potrebno je potpunije utvrđivanje.",
    keywords: ["putna isprava", "samostalno roditeljsko pravo", "delimično usvajanje", "član 78. PZ"],
    related_articles: ["član 78. st. 3–4. PZ", "Zakon o putnim ispravama"],
    headnote: "Delimično usvojena revizija: Uskrs naizmenično; alimentacija vraćena na ponovno suđenje.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 288/2021",
    legal_area: "family",
    legal_question:
      "Da li bitna povreda iz čl. 374. st. 2. tačka 12. ZPP može dovesti do ukidanja odluke o izdržavanju iako su razvod i poveravanje potvrđeni?",
    court_position:
      "Potvrđene su odluke o razvodu, poveravanju majci i viđanju; ukinuta je odluka o izdržavanju zbog bitne povrede postupka i vraćen predmet na ponovno suđenje.",
    reasoning:
      "Bez sporazuma o zajedničkom vršenju primenjen je čl. 270. PZ. Žalba da treba zajedničko vršenje je neosnovana jer zakonski preduslov ne postoji. Za izdržavanje apelacioni sud nalazi bitnu povredu postupka po čl. 374. st. 2. tačka 12. ZPP.",
    keywords: ["bitna povreda postupka", "izdržavanje", "član 374. ZPP", "ukidanje"],
    related_articles: ["član 270. PZ", "član 390. ZPP", "član 374. st. 2. ZPP"],
    headnote: "Potvrđeno poveravanje majci; ukinuto izdržavanje zbog bitne povrede postupka.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 145/2022",
    legal_area: "family",
    legal_question:
      "Da li je nepotpun nalaz CSR osnov za ukidanje presude o delimičnom lišenju roditeljskog prava oca na izdržavanju kazne?",
    court_position:
      "Apelacioni sud je ukinuo presudu o delimičnom lišenju jer CSR nije procenio roditeljske kapacitete oca u zatvoru, što predstavlja bitnu povredu postupka.",
    reasoning:
      "Primenjeni su čl. 6, 61, 66–68, 270. i 266. PZ. Lišenje mora biti zasnovano na potpunom stručnom uvidu. Delimično lišenje (čl. 82. PZ) zahteva procenu da li otac može ostvarivati kontakte i brigu u okviru kaznenog izdržavanja.",
    keywords: ["delimično lišenje", "član 270. PZ", "kazna zatvora", "ukidanje"],
    related_articles: ["član 270. PZ", "član 82. PZ", "član 266. st. 1. PZ"],
    headnote: "Ukidanje delimičnog lišenja zbog nepotpunog nalaza CSR o ocu u zatvoru.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 17579/2022",
    legal_area: "family",
    legal_question:
      "Da li model ravnopravnog boravka deteta kod oba roditelja bez sporazuma o zajedničkom vršenju može biti u najboljem interesu deteta?",
    court_position:
      "VKS je ukinuo nižestepene presude koje menjaju model viđanja na ravnopravni boravak kod oba roditelja i naložio ponovno suđenje.",
    reasoning:
      "Bez sporazuma o zajedničkom vršenju (čl. 76. PZ) sud ne može uvesti režim koji funkcionalno liči na zajedničko vršenje ako to nije u skladu sa čl. 8. EKLP i razvojnim potrebama deteta. Potrebno je dopuniti nalaz CSR o uticaju na konflikt lojalnosti i realne potrebe deteta uzrasta.",
    keywords: ["ukidanje", "viđanje", "zajedničko roditeljsko pravo", "čl. 8. EKLP"],
    related_articles: ["član 76. PZ", "član 266. PZ", "član 270. PZ"],
    headnote: "Vraćanje predmeta radi procene modela viđanja bez sporazuma o zajedničkom vršenju.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 270/2016",
    legal_area: "family",
    legal_question:
      "Da li objektivna sprečenost oca da vrši roditeljsko pravo zbog izdržavanja kazne zatvora opravdava izmenu sa zajedničkog na samostalno vršenje roditeljskog prava majci?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom se menja ranija odluka i dete poverava majci na samostalno vršenje roditeljskog prava.",
    reasoning:
      "Primenjeni su čl. 77. st. 4. i 270. PZ. Kada roditelji nisu u zajedničkom životu, a sporazum o zajedničkom ili samostalnom vršenju nije u interesu deteta, sud donosi odluku o samostalnom vršenju. Očevo izdržavanje kazne onemogućava funkcionalno zajedničko vršenje; CSR i želja deteta podržavaju majku kao roditelja koji samostalno vrši pravo u najboljem interesu deteta.",
    keywords: ["izmena roditeljskog prava", "kazna zatvora", "član 77. st. 4. PZ", "CSR"],
    related_articles: ["član 77. st. 4. PZ", "član 270. PZ", "član 266. st. 1. PZ"],
    headnote: "Potvrđena izmena na samostalno vršenje majci zbog očevog izdržavanja kazne zatvora.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 23888/2024",
    legal_area: "family",
    legal_question:
      "Da li rizici vezani za očev alkohol i pasivnu roditeljsku ulogu mogu opravdati poveravanje deteta majci na samostalno vršenje roditeljskog prava?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci uz pravilnu primenu čl. 6, 77. st. 3, 266. i 270. PZ i KPD.",
    reasoning:
      "Majka poseduje roditeljski kapacitet i zadovoljava razvojne potrebe deteta; podržava redovno viđanje sa ocem. Kod oca postoji rizik smanjenih sposobnosti zbog alkohola i pasivnije uloge. CSR i stručna mišljenja pribavljena po čl. 270. PZ pravilno su ocenjena.",
    keywords: ["alkohol", "poveravanje majci", "član 270. PZ", "najbolji interes deteta"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje majci uz procenu rizika od očevog alkohola i pasivnosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Nišu",
    court_level: "appellate",
    case_number: "Gž2 380/2024",
    legal_area: "family",
    legal_question:
      "Da li prvostepeni sud može odbiti zahtev za izmenu sa zajedničkog na samostalno vršenje roditeljskog prava kada CSR smatra da roditelji i dalje mogu zajednički da vrše pravo?",
    court_position:
      "Apelacioni sud u Nišu ukinuo je prvostepenu presudu koja je odbila izmenu; naloženo je ponovno odlučivanje zbog nedostatka adekvatne roditeljske komunikacije i saradnje.",
    reasoning:
      "Primenjeni su čl. 6, 67, 266. i 270. PZ. Iako CSR navodi da su uslovi za zajedničko vršenje formalno ispunjeni, treba proceniti da li je u interesu deteta da se održi zajedničko vršenje kada roditelji ne ostvaruju saradnju i komunikaciju potrebnu za funkcionalno zajedničko staranje.",
    keywords: ["izmena roditeljskog prava", "zajedničko vršenje", "CSR", "ukidanje"],
    related_articles: ["član 6. st. 1. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 67. PZ"],
    headnote: "Ukidanje odbijanja izmene radi ponovne procene saradnje roditelja i interesa deteta.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9080/2023",
    legal_area: "family",
    legal_question:
      "Da li dugogodišnja briga majke o detetu sa posebnim potrebama i mišljenje CSR opravdavaju poveravanje majci na samostalno vršenje roditeljskog prava?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci u najboljem interesu deteta sa posebnim potrebama.",
    reasoning:
      "Primenjen je čl. 77. PZ i nalaz CSR. Majka godinama neprekidno zadovoljava potrebe deteta, obezbeđuje školovanje u specijalnom odeljenju i socijalnu podršku; izmeštanje bi narušilo razvoj. Očevo mišljenje da želi samostalno ili podeljeno staranje nije dovelo do drugačije procene najboljeg interesa deteta.",
    keywords: ["posebne potrebe", "poveravanje majci", "CSR", "kontinuitet brige"],
    related_articles: ["član 77. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje majci detetu sa posebnim potrebama uz dugogodišnju brigu majke.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5230/2021",
    legal_area: "family",
    legal_question:
      "Da li je potrebno postaviti kolizijskog staratelja kada postoji krivična prijava deteta protiv oca a majka samostalno vrši roditeljsko pravo i zastupa dete?",
    court_position:
      "VKS je ukinuo nižestepene presude o izmeni vršenja roditeljskog prava jer sudovi nisu procenili da li je dete pravilno zastupljeno u suprotstavljenim ulogama roditelja.",
    reasoning:
      "Kada jedan roditelj samostalno vrši roditeljsko pravo, on zastupa dete (čl. 77. u vezi sa zastupanjem). U situaciji sukoba interesa i krivične prijave deteta protiv oca potrebno je posebno razmotriti kolizijsko starateljstvo radi zaštite prava deteta u postupku.",
    keywords: ["kolizijsko starateljstvo", "zastupanje deteta", "ukidanje", "sukob interesa"],
    related_articles: ["član 77. PZ", "član 266. st. 1. PZ"],
    headnote: "Vraćanje predmeta radi procene potrebe za kolizijskim starateljem u odnosu dete–otac.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 381/2015",
    legal_area: "family",
    legal_question:
      "Da li preseljenje majke u inostranstvo radi posla i želja deteta da ostane sa ocem opravdavaju izmenu ranje odluke u korist očevog samostalnog roditeljskog prava?",
    court_position:
      "Apelacioni sud je potvrdio izmenu: dete se poverava ocu na samostalno vršenje roditeljskog prava jer majka više ne može kvalitetno ispunjavati dužnosti iz inostranstva.",
    reasoning:
      "Primenjeni su čl. 6. PZ i čl. 27. KPD o životnom standardu. Roditeljska odgovornost mora biti vođena interesom deteta. Majka na radu u inostranstvu nije u stanju da ostvari sadržinu roditeljskog prava na odgovarajući način; dete želi da ostane sa ocem, što je u skladu sa najboljim interesom.",
    keywords: ["inostranstvo", "izmena roditeljskog prava", "želja deteta", "član 6. PZ"],
    related_articles: ["član 6. st. 1. PZ", "član 77. PZ", "član 27. KPD"],
    headnote: "Potvrđena izmena u korist oca zbog majčinog odlaska na rad u inostranstvo i želje deteta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 451/2023",
    legal_area: "family",
    legal_question:
      "Kako sud odlučuje kada dva CSR daju različita mišljenja a veštaci smatraju oba roditelja podobnim, ali preporučuju oca za samostalno staranje?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom su deca poverena ocu na samostalno vršenje roditeljskog prava.",
    reasoning:
      "Otac je u apstinenciji od alkohola od 2019. i stabilan je za brigu o deci. Nakon sintetizovanog pristupa i veštačenja, struka je zaključila da nema uslova za zajedničko staranje zbog partnerskih nesuglasica, a da su deca emocionalno povezana sa ocem i adaptirana na njegovu sredinu; primenjeni su čl. 6, 77. i 266. PZ.",
    keywords: ["suprotna mišljenja CSR", "veštačenje", "poveravanje ocu", "alkoholizam lečenje"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje ocu posle veštačenja i različitih mišljenja CSR.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 10504/2022",
    legal_area: "family",
    legal_question:
      "Da li je poveravanje deteta majci na samostalno vršenje roditeljskog prava u skladu sa čl. 77, 266, 270. i 272. PZ kada CSR podržava majku?",
    court_position:
      "Odbačena je revizija oca; potvrđena je odluka o poveravanju majci.",
    reasoning:
      "Bez sporazuma o vršenju roditeljskog prava sud donosi odluku o poveravanju, izdržavanju i kontaktima (čl. 272. PZ). Pre toga obavezno mišljenje organa starateljstva (čl. 270. PZ). Najbolji interes deteta je imperativ (čl. 266. PZ).",
    keywords: ["član 270. PZ", "član 272. PZ", "poveravanje majci"],
    related_articles: ["član 77. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 272. PZ"],
    headnote: "Potvrđeno poveravanje majci uz primenu čl. 270. i 272. PZ.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 20214/2022",
    legal_area: "family",
    legal_question:
      "Da li izražena želja dece da žive sa ocem i mišljenje CSR mogu opravdati poveravanje troje dece ocu na samostalno vršenje roditeljskog prava?",
    court_position:
      "Odbačena je revizija tužilje-majke; potvrđeno je poveravanje dece ocu.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1, 270. i 272. PZ i čl. 61. PZ o ličnim odnosima. VKS je ocenio da su nižestepeni sudovi pravilno utvrdili najbolji interes dece uz želju dece i nalaz CSR.",
    keywords: ["želja deteta", "poveravanje ocu", "troje dece", "član 61. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 61. PZ"],
    headnote: "Potvrđeno poveravanje ocu uz želju dece i mišljenje CSR.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2593/2014",
    legal_area: "family",
    legal_question:
      "Da li propust prvostepenog suda da odluči o zahtevu za izuzeće veštaka povređuje pravičnost postupka u sporu o poveravanju deteta majci?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu oca kao neosnovanu; ocenjeno je da navedena povreda, uz odbijanje saradnje podnosioca sa CSR, nije uticala na pravičnost postupka.",
    reasoning:
      "Ustavni sud razlikuje odluke o zajedničkom i samostalnom vršenju roditeljskog prava u zavisnosti od sporazuma i procene suda. Roditelj koji samostalno vrši pravo ima širi krug ovlašćenja; roditelj koji ne vrši nema ovlašćenje da sam pokreće postupke zastupanja deteta u suprotnosti sa zakonom.",
    keywords: ["ustavna žalba", "izuzeće veštaka", "poveravanje deteta", "pravičnost postupka"],
    related_articles: ["član 76–78. PZ", "član 77. st. 3. PZ", "član 266. PZ"],
    headnote: "Odbijena ustavna žalba oca; propust oko veštaka nije presudio pravičnosti uz ponašanje podnosioca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2413/2017",
    legal_area: "family",
    legal_question:
      "Da li je Institut za mentalno zdravlje dužan da se izjasni o značaju dugogodišnjeg boravka deteta kod oca kada CSR daju različita mišljenja?",
    court_position:
      "VKS je usvojio reviziju tužioca, ukinuo presude i vratio predmet radi dopune stručnog mišljenja o uticaju promene okruženja na dete.",
    reasoning:
      "Kada CSR nisu usaglašeni, sud može pribaviti mišljenje IMH (čl. 270. PZ). Stručni tim se mora izjasniti o značaju činjenice da dete od ranog uzrasta živi u domaćinstvu oca i kako bi promena uticala na psihofizički razvoj; bez toga primena čl. 270. PZ nije potpuna.",
    keywords: ["član 270. PZ", "Institut za mentalno zdravlje", "ukidanje", "promena okruženja"],
    related_articles: ["član 270. PZ", "član 266. st. 1. PZ"],
    headnote: "Vraćanje predmeta jer IMH nije odgovorio na ključno pitanje o boravku deteta kod oca.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 20063/2022",
    legal_area: "family",
    legal_question:
      "Da li širok model viđanja sa ocem ostaje u skladu sa najboljim interesom deteta kada CSR ne preporučuje nadzirano viđanje?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je poveravanje majci sa širokim modelom kontakata sa ocem i obavezom izdržavanja.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1, 270. i 272. PZ i čl. 61. st. 1. PZ. Nalaz CSR o adekvatnim očevim kapacitetima podržava širi model viđanja bez potrebe za nadzorom ako nema rizika za dete.",
    keywords: ["viđanje", "CSR", "član 61. PZ", "najbolji interes deteta"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 61. st. 1. PZ"],
    headnote: "Potvrđeno poveravanje majci i široko viđanje sa ocem u skladu sa CSR.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8928/2021",
    legal_area: "family",
    legal_question:
      "Da li odbijanje saglasnosti za prebivalište i putne isprave predstavlja nesavesno vršenje roditeljskog prava koje opravdava delimično lišenje?",
    court_position:
      "Odbačena je revizija tužilaca; odbijen je zahtev za delimično lišenje oca jer nije dokazano nesavesno vršenje.",
    reasoning:
      "Majka koja samostalno vrši roditeljsko pravo može u okviru zakona prijaviti prebivalište i putne isprave bez saglasnosti oca kada je to u skladu sa presudom. Odbijanje saglasnosti u tom kontekstu ne predstavlja grubo zanemarivanje ili zloupotrebu u smislu čl. 82. PZ. Uvek se ceni najbolji interes deteta (čl. 266. PZ).",
    keywords: ["delimično lišenje", "saglasnost", "putna isprava", "prebivalište"],
    related_articles: ["član 82. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Odbijeno delimično lišenje oca zbog odbijanja saglasnosti gde majka samostalno vrši pravo.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3920/2021",
    legal_area: "family",
    legal_question:
      "Da li je poveravanje deteta majci na samostalno vršenje roditeljskog prava u skladu sa čl. 3. KPD i PZ?",
    court_position:
      "Odbačena je revizija tuženog-protivtužioca; potvrđena je presuda u korist majke.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1, 270. i 272. PZ. Najbolji interes deteta zahteva procenu potreba i roditeljskih kapaciteta. Majka adekvatno prepoznaje potrebe dece i uvažava ulogu oca u kontaktima; CSR je pravilno ocenjen.",
    keywords: ["KPD član 3", "poveravanje majci", "član 270. PZ"],
    related_articles: ["član 3. st. 1. KPD", "član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje majci uz KPD i pravilnu primenu PZ.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3454/2024",
    legal_area: "family",
    legal_question:
      "Da li nižestepeni sudovi mogu potvrditi poveravanje majci i visinu doprinosa oca za izdržavanje kada oba roditelja imaju roditeljske kapacitete?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci i doprinos za izdržavanje u najboljem interesu deteta.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1. i 270. PZ i KPD. Oba roditelja imaju kapacitete, ali procena najboljeg interesa obuhvata uzrast, zrelost, potrebe i stručne nalaze koje su sudovi pravilno ocenili zajedno sa veštacima i CSR.",
    keywords: ["poveravanje majci", "izdržavanje", "veštačenje", "član 266. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje majci i alimentacija uz stručne nalaze.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1006/2022",
    legal_area: "family",
    legal_question:
      "Da li izražena želja troje dece da žive sa ocem i nalaz CSR mogu opravdati poveravanje ocu na samostalno vršenje roditeljskog prava?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je poveravanje troje maloletne dece ocu uz kontakte sa majkom.",
    reasoning:
      "Primenjeni su čl. 3. st. 2. KPD, čl. 6. i 266. st. 1–3. PZ i čl. 270. PZ. Dete koje može da formira mišljenje mora ga izraziti uz pažnju suda prema godinama i zrelosti. Nižestepeni sudovi su pravilno utvrdili najbolji interes dece uz želje dece i predlog CSR za kontakte.",
    keywords: ["želja deteta", "troje dece", "član 266. st. 3. PZ", "KPD"],
    related_articles: ["član 6. st. 1. PZ", "član 266. st. 1–3. PZ", "član 270. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje ocu troje dece uz uvažavanje mišljenja dece.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2809/2025",
    legal_area: "family",
    legal_question:
      "Da li vaspitni stil majke prilagođen uzrastu deteta može biti odlučujući uz CSR kada se dete poverava majci?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci na samostalno vršenje roditeljskog prava.",
    reasoning:
      "Primenjeni su čl. 3. KPD i čl. 6, 77. st. 3, 266. st. 1. i 270. PZ. Država i svi učesnici dužni su da vode računa o najboljem interesu deteta. CSR i procena vaspitnog stila podržavaju odluku nižih sudova.",
    keywords: ["vaspitni stil", "CSR", "najbolji interes deteta", "član 3. KPD"],
    related_articles: ["član 3. KPD", "član 6. st. 1. PZ", "član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje majci uz KPD i procenu vaspitnog stila.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 4/2024",
    legal_area: "family",
    legal_question:
      "Da li lošiji materijalni položaj majke može biti jedini razlog da se dete poveri ocu na samostalno vršenje roditeljskog prava?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje očevog zahteva za izmenu odluke o vršenju roditeljskog prava; majka i dalje adekvatno vrši pravo.",
    reasoning:
      "Imovinsko-ekonomski položaj nije presudan za izbor roditelja (čl. 77. st. 3, 61. st. 1, 266. i 270. PZ). Prvostepeni sud je pravilno prihvatio jasna mišljenja dva CSR o tome da nema osnova za izmenu i da je u interesu deteta da majka nastavi samostalno vršenje.",
    keywords: ["izmena roditeljskog prava", "materijalni položaj", "CSR", "najbolji interes"],
    related_articles: ["član 77. st. 3. PZ", "član 61. st. 1. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno odbijanje izmene; imovina sama po sebi ne određuje staratelja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 4202/2014",
    legal_area: "family",
    legal_question:
      "Da li je zakonit hitan smeštaj deteta u hraniteljsku porodicu zbog zanemarivanja i povreda u porodici?",
    court_position:
      "Upravni sud je odbio tužbu oca protiv zaključka o hitnom smeštaju; mera je u najboljem interesu deteta.",
    reasoning:
      "Korektivni nadzor i ovlašćenja organa starateljstva (čl. 80. i 341. PZ) omogućavaju mere zaštite. Hraniteljstvo se može zasnovati kada je u interesu deteta bez roditeljskog staranja u smislu čl. 111–114. PZ; saglasnost roditelja nije potrebna kada su ispunjeni uslovi za dete zanemareno od roditelja.",
    keywords: ["hraniteljska porodica", "hitna mera", "član 111. PZ", "organ starateljstva"],
    related_articles: ["član 80. PZ", "član 111. PZ", "član 113. PZ", "član 114. PZ", "član 341. PZ"],
    headnote: "Odbijena tužba protiv hitnog smeštaja deteta u hraniteljsku porodicu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 14926/2023",
    legal_area: "family",
    legal_question:
      "Da li grubo zanemarivanje dužnosti i nasilje oca mogu opravdati potpuno lišenje roditeljskog prava oba roditelja?",
    court_position:
      "Odbačena je revizija roditelja; potvrđeno je potpuno lišenje roditeljskog prava u najboljem interesu deteta.",
    reasoning:
      "Primenjeni su čl. 264. st. 2, 266. st. 1–3. i 270. PZ. O lišenju mogu odlučivati ovlašćeni podnosioci; sud mora saslušati dete kad je to moguće. Najbolji interes obuhvata sigurnost, zdravlje i mišljenje deteta uz stručne nalaze.",
    keywords: ["potpuno lišenje", "zlostavljanje", "zanemarivanje", "član 266. PZ"],
    related_articles: ["član 264. st. 2. PZ", "član 266. st. 1–3. PZ", "član 270. PZ"],
    headnote: "Potvrđeno potpuno lišenje oba roditelja zbog zanemarivanja i nasilja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 14063/2025",
    legal_area: "family",
    legal_question:
      "Da li želja četrnaestogodišnjeg deteta da živi sa ocem i promenjene okolnosti mogu opravdati izmenu poveravanja u korist oca?",
    court_position:
      "Odbačene su revizije obe strane; potvrđeno je poveravanje ocu, izmena doprinosa majke za izdržavanje i odbijen protivtužbeni zahtev majke za delimično lišenje oca.",
    reasoning:
      "Stručna lica su ocenila autentičnost želje deteta kao u njegovom najboljem interesu. Otac poseduje roditeljske kapacitete bez indicija koji bi ga diskvalifikovali. Odluka je podložna izmeni ako se okolnosti promene (čl. 266. PZ i stručna mišljenja po čl. 270. PZ).",
    keywords: ["želja deteta", "izmena poveravanja", "član 266. PZ", "izdržavanje"],
    related_articles: ["član 266. st. 1. PZ", "član 270. PZ", "član 77. st. 3. PZ"],
    headnote: "Potvrđeno poveravanje ocu nakon promene okolnosti i želje četrnaestogodišnjeg deteta.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2846/2020",
    legal_area: "family",
    legal_question:
      "Da li je poveravanje deteta majci na samostalno vršenje roditeljskog prava u skladu sa čl. 3. KPD i PZ?",
    court_position:
      "Odbačena je revizija oca; potvrđena je odluka o poveravanju majci, viđanju i izdržavanju.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1, 270. i 272. PZ. Najbolji interes deteta zahteva procenu uz CSR; u konkretnom slučaju majka je pravilno određena za samostalno vršenje u skladu sa čl. 3. KPD.",
    keywords: ["poveravanje majci", "KPD", "član 270. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje majci uz KPD i CSR.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3659/2020",
    legal_area: "family",
    legal_question:
      "Da li CSR i čl. 77, 266, 270. i 272. PZ podržavaju poveravanje deteta majci sa uređenim kontaktima i izdržavanjem?",
    court_position:
      "Odbačena je revizija oca; potvrđene su nižestepene presude u korist majke.",
    reasoning:
      "Isti pravni standard kao u srodnim predmetima: bez sporazuma sud odlučuje o poveravanju, izdržavanju i kontaktima uz obavezno mišljenje starateljskog organa. Pobijana presuda je u skladu sa čl. 3. KPD i čl. 266. st. 1. PZ.",
    keywords: ["poveravanje majci", "izdržavanje", "član 272. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 272. st. 2. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje majci i režim kontakata i alimentacije.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 432/2016",
    legal_area: "family",
    legal_question:
      "Da li jasno izražena želja maloletnice starije od 15 godina da živi sa ocem mora biti uvažena pri poveravanju?",
    court_position:
      "Apelacioni sud je odbio žalbe obe strane i potvrdio poveravanje ocu, smatrajući želju deteta ključnim faktorom u skladu sa njenim najboljim interesom.",
    reasoning:
      "Primenjeni su čl. 67, 68. i 77. st. 3. PZ. Prvostepeni sud je imao dovoljno dokaza i dao valjane razloge prihvaćene u drugom stepenu. Starija maloletnica sposobna za mišljenje ima poseban značaj u proceni.",
    keywords: ["želja deteta", "preko 15 godina", "poveravanje ocu", "član 77. PZ"],
    related_articles: ["član 67. PZ", "član 68. PZ", "član 77. st. 3. PZ", "član 65. PZ"],
    headnote: "Potvrđeno poveravanje ocu uz jasnu želju maloletnice starije od 15 godina.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1608/2010",
    legal_area: "family",
    legal_question:
      "Da li odluka da se dete poveri ocu krši ustavno pravo majke na staranje o detetu kada postoji stručna podrška za oca?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu majke protiv odluke Vrhovnog suda kojom je dete povereno ocu.",
    reasoning:
      "Pobijane su odredbe PZ o mišljenju deteta (čl. 65), roditeljskom pravu (čl. 67), samostalnom vršenju (čl. 77. st. 3), obavezi suda u bračnom sporu (čl. 226) i najboljem interesu (čl. 266), kao i rok za ustavnu žalbu (Zakon o US). Ustavni sud je zaključio da su redovni sudovi postupili u okviru zaštite najboljeg interesa deteta i stručnih nalaga.",
    keywords: ["ustavna žalba", "poveravanje ocu", "najbolji interes deteta"],
    related_articles: ["član 65. PZ", "član 67. PZ", "član 77. st. 3. PZ", "član 226. PZ", "član 266. st. 1. PZ"],
    headnote: "Odbijena ustavna žalba majke na poveravanje deteta ocu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8200/2022",
    legal_area: "family",
    legal_question:
      "Da li promena prebivališta deteta u inostranstvo sa majkom može biti u najboljem interesu i da li to može opravdati delimično lišenje oca u delu odlučivanja o prebivalištu?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je delimično lišenje u pogledu odlučivanja o prebivalištu deteta u inostranstvu.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. i 270. PZ. Uz želju deteta, CSR i procenu roditeljskih sposobnosti, preseljenje sa majkom kao zakonskim zastupnikom ne narušava najbolji interes deteta; protivljenje oca bez opravdanog razloga u odnosu na dobrobit deteta može biti osnov za delimično lišenje u smislu čl. 82. PZ.",
    keywords: ["prebivalište u inostranstvu", "delimično lišenje", "član 82. PZ", "član 270. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 82. PZ", "član 3. KPD"],
    headnote: "Potvrđeno delimično lišenje oca u delu prebivališta radi preseljenja sa majkom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 37/2021",
    legal_area: "family",
    legal_question:
      "Da li je formulacija da majka vrši roditeljsko pravo „isključivo samostalno“ zakonita i da li prvostepeni sud može ograničiti kontakte deteta sa ocem vođen interesom majke?",
    court_position:
      "Apelacioni sud je ukinuo presudu o vršenju roditeljskog prava i viđanju zbog pogrešne primene prava.",
    reasoning:
      "Samostalno vršenje po čl. 77. st. 3. PZ ne isključuje prava i dužnosti drugog roditelja iz čl. 78. st. 3. PZ (izdržavanje, kontakti, zajedničko odlučivanje o bitnim pitanjima), osim kod potpunog ili delimičnog lišenja po čl. 81–82. PZ. Izraz „isključivo samostalno“ je protivuran sebi i isključuje oca suprotno smislu zakona. Viđanje ne sme biti zasnovano na interesu majke umesto deteta.",
    keywords: ["samostalno vršenje", "član 78. st. 3. PZ", "ukidanje", "viđanje"],
    related_articles: ["član 77. st. 3. PZ", "član 78. st. 3. PZ", "član 81. PZ", "član 82. PZ"],
    headnote: "Ukidanje zbog pogrešne formulacije „isključivo samostalno“ i pogrešnog usmerenja na interes majke.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13190/2023",
    legal_area: "family",
    legal_question:
      "Da li presuda može istovremeno da se zasniva na sporazumu o zajedničkom vršenju roditeljskog prava i da dete poveri jednom roditelju na samostalno vršenje?",
    court_position:
      "Vrhovni sud je ukinuo nižestepene presude zbog kontradiktornosti u odnosu na to da li postoji sporazum i na kojoj osnovi je doneta odluka o samostalnom vršenju.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 74. st. 4, 266. st. 1, 270. i 272. PZ. Prvostepeni sud je naveo da su stranke postigle sporazum o zajedničkom vršenju, a zatim poverio dete majci na samostalno vršenje, što ostavlja nerazjašnjeno pravno osnovanje odluke i krši dužnost jasnog obrazloženja.",
    keywords: ["sporazum roditelja", "kontradiktornost", "ukidanje", "član 270. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 74. st. 4. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 272. st. 2. PZ"],
    headnote: "Vraćanje predmeta zbog kontradikcije između sporazuma o zajedničkom i odluke o samostalnom vršenju.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4276/2020",
    legal_area: "family",
    legal_question:
      "Da li kasnija predaja deteta majci i želja deteta da ostane kod majke isključuju izmenu ranje odluke u korist oca?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je da nema promenjenih okolnosti koje bi zahtevale izmenu odluke o poveravanju majci.",
    reasoning:
      "Najbolji interes deteta se ceni prema celokupnim okolnostima. Dete je želelo da ostane kod majke; uzrast deteta i potreba za ljubavlju i staranjem majke podržavaju kontinuitet kod majke. Očevo kasnije predanje deteta i jednaki kapaciteti roditelja ne menjaju zaključak da nema osnova za izmenu (čl. 266. i 270. PZ).",
    keywords: ["izmena roditeljskog prava", "želja deteta", "promenjene okolnosti"],
    related_articles: ["član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Odbijena izmena u korist oca; dete ostaje kod majke uz autentičnu želju deteta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 23739/2024",
    legal_area: "family",
    legal_question:
      "Da li dugogodišnje zanemarivanje majke, neadekvatni uslovi i želja deteta da živi sa tetkom mogu opravdati delimično lišenje majke roditeljskog prava?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je delimično lišenje roditeljskog prava u najboljem interesu deteta.",
    reasoning:
      "Primenjeni su čl. 81–82, 266. i 270. PZ. Delimično lišenje je moguće kada roditelj nesavesno vrši prava i dužnosti. Elementi najboljeg interesa uključuju mišljenje deteta, sigurnost i zdravlje deteta; utvrđeno je zanemarivanje i neadekvatni uslovi majke.",
    keywords: ["delimično lišenje", "zanemarivanje", "član 82. PZ", "mišljenje deteta"],
    related_articles: ["član 82. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno delimično lišenje majke zbog zanemarivanja i želje deteta da živi sa tetkom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 179/2024",
    legal_area: "family",
    legal_question:
      "Da li je moguće ponovo suditi o viđanju deteta sa ocem ako već postoji pravnosnažno sudsko poravnanje o tom pitanju?",
    court_position:
      "Potvrđeno je samostalno vršenje roditeljskog prava majke i izdržavanje; preinačena je odluka o delimičnom lišenju oca kao nepotrebna; ukinuta je odluka o viđanju i taj deo tužbe odbačen zbog presuđene stvari.",
    reasoning:
      "Putne isprave i prebivalište maloletnika uređeni su Zakonom o prebivalištu i PZ. Roditelj koji samostalno vrši pravo može podnositi prijave prebivališta (čl. 77. PZ u vezi sa ZPB). Za viđanje važi presuđena stvar ako postoji pravnosnažno poravnanje; sud ne sme ponovo odlučivati o istom predmetu.",
    keywords: ["presuđena stvar", "viđanje", "poravnanje", "prebivalište"],
    related_articles: ["član 77. PZ", "član 6. PZ", "Zakon o prebivalištu i boravištu građana"],
    headnote: "Odbačen deo tužbe o viđanju zbog presuđene stvari; preinačeno delimično lišenje oca.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4345/2017",
    legal_area: "family",
    legal_question:
      "Da li neizvršavanje presude o predaji deteta majci u izvršnom postupku povređuje pravo na poštovanje porodičnog života?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na poštovanje porodičnog života zbog nedelotvornog postupanja izvršnog suda; dosuđena je naknada nematerijalne štete od 1.000 EUR.",
    reasoning:
      "Roditeljsko pravo proističe iz dužnosti prema detetu i ograničeno je najboljim interesom deteta (čl. 67. PZ). Pravo majke na staranje koje proističe iz izvršne presude mora imati delotvoran pravni lek; dugotrajno neizvršavanje predaje uskraćuje kontakt sa detetom i povređuje porodični život.",
    keywords: ["izvršenje", "predaja deteta", "porodični život", "naknada štete"],
    related_articles: ["član 7. PZ", "član 67. PZ", "član 68. PZ", "član 75. PZ", "član 77. st. 3. PZ"],
    headnote: "Usvojena ustavna žalba zbog neizvršene predaje deteta; dosuđena nematerijalna šteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 234/2021",
    legal_area: "family",
    legal_question:
      "Da li se posle utvrđivanja očinstva DNK analizom može bez pribavljanja nalaza CSR doneti odluka o zajedničkom vršenju roditeljskog prava i predaji deteta?",
    court_position:
      "Potvrđena je odluka o utvrđivanju očinstva; ukinut je deo presude o zajedničkom vršenju roditeljskog prava, predaji deteta i readaptaciji uz vraćanje na ponovno suđenje.",
    reasoning:
      "Primenjeni su čl. 266, 270, 272. i 77. st. 3. PZ. U sporovima o roditeljskom pravu sud mora pribaviti nalaz CSR ili druge specijalizovane ustanove pre odluke. Prvostepeni sud je obavio veštačenje IMH u vezi sa poveravanjem, ali ukidanje dela presude sledi zbog bitnih povreda postupka i primene materijalnog prava u tom segmentu.",
    keywords: ["utvrđivanje očinstva", "član 270. PZ", "ukidanje", "zajedničko roditeljsko pravo"],
    related_articles: ["član 266. PZ", "član 270. PZ", "član 272. st. 2. PZ", "član 77. st. 3. PZ"],
    headnote: "Potvrđeno očinstvo; ukidanje dela o roditeljskom pravu i predaji radi ponovnog postupka.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3569/2021",
    legal_area: "family",
    legal_question:
      "Da li je poveravanje dece majci na samostalno vršenje roditeljskog prava, model viđanja i izdržavanje u skladu sa CSR i KPD kada su presude donete posle višegodišnjeg postupka sa promenom mišljenja CSR?",
    court_position:
      "Odbačena je revizija tužene-protivtužilje; potvrđene su nižestepene presude u korist majke.",
    reasoning:
      "Primenjeni su čl. 77. st. 3, 266. st. 1, 270. i 272. PZ i čl. 3. KPD. Tokom postupka CSR je menjao mišljenje uz veštačenje; konačno mišljenje podržava majku za staranje, uz model kontakata sa ocem. Sud je pravilno procenio najbolji interes dece.",
    keywords: ["CSR", "veštačenje", "poveravanje majci", "član 270. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje majci uprkos promenama mišljenja CSR u toku postupka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9805/2025",
    legal_area: "family",
    legal_question:
      "Da li majka koja po presudi samostalno vrši roditeljsko pravo može dobiti pravo stanovanja (habitatio) na stanu u suvlasništvu sa ocem deteta ako on sprečava predaju dece i faktično onemogućava staranje?",
    court_position:
      "Vrhovni sud je preinačio presude i usvojio tužbeni zahtev: utvrđeno je pravo stanovanja za majku i maloletnu decu do punoletstva najmlađeg deteta.",
    reasoning:
      "Po čl. 194. st. 1–2. PZ dete i roditelj koji vrši roditeljsko pravo imaju pravo stanovanja kod drugog roditelja-vlasnika ako nemaju useljiv stan, osim očigledne nepravde (st. 3). Činjenica da majka faktično ne vrši staranje nastala je protivpravnim odbijanjem predaje od strane oca i instrumentalizacijom dece; to ne sme biti razlog za odbijanje habitacionis. Suvlasništvo ne isključuje habitatio u korist dece i staratelja.",
    keywords: ["habitatio", "pravo stanovanja", "član 194. PZ", "suvlasništvo"],
    related_articles: ["član 194. PZ", "član 77. st. 3. PZ"],
    headnote: "Usvojeno pravo stanovanja majke i dece uprkos očevom ometanju predaje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4342/2025",
    legal_area: "family",
    legal_question:
      "Da li neslaganje oko prebivališta deteta i putovanja može opravdati delimično lišenje oca roditeljskog prava u delu odlučivanja o prebivalištu kada otac savesno vrši dužnosti?",
    court_position:
      "Odbačena je revizija majke; odbijen je zahtev za delimično lišenje oca u pogledu prebivališta jer nisu ispunjeni uslovi iz čl. 82. PZ.",
    reasoning:
      "I kada jedan roditelj samostalno vrši pravo (čl. 77. st. 3. PZ), drugi zadržava pravo na zajedničko odlučivanje o pitanjima bitnim za život deteta (čl. 78. st. 3–4. PZ), uključujući prebivalište. Delimično lišenje zahteva nesavesno vršenje; u konkretnom slučaju nije utvrđeno da otac grubo zanemaruje ili zloupotrebljava prava.",
    keywords: ["delimično lišenje", "prebivalište", "član 78. st. 3. PZ", "član 82. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 78. st. 3–4. PZ", "član 82. PZ"],
    headnote: "Odbijeno delimično lišenje oca u delu prebivališta; otac savesno vrši roditeljsko pravo.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5780/2021",
    legal_area: "family",
    legal_question:
      "Da li je pravo na poštovanje doma povređeno kada apelacioni sud smatra da član 8. EKLP nije primenljiv jer stan nije u svojini podnosioca?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na poštovanje doma jer drugostepeni sud nije ispitao srazmernost iseljenja.",
    reasoning:
      "Porodični zakon uređuje prava deteta, izdržavanje i pravo stanovanja (čl. 154–155, 194. PZ). Dužnost izdržavanja traje i kada postoji rizik lišenja roditeljskog prava (čl. 81–82. PZ). Isključivanje primene čl. 8. EKLP bez analize srazmernosti mere iseljenja predstavlja povredu prava na dom.",
    keywords: ["član 8. EKLP", "poštovanje doma", "iseljenje", "srazmernost"],
    related_articles: ["član 8. EKLP", "član 194. PZ", "član 67. PZ"],
    headnote: "Usvojena žalba zbog propusta da se ispitaju EKLP i srazmernost iseljenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1201/2023",
    legal_area: "family",
    legal_question:
      "Da li prijave oca o nasilju mogu biti ocenjene kao zlonamerne i da li to podržava poveravanje dece majci?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci uz procenu da su očeve prijave bile zlonamerne prema nalazu CSR.",
    reasoning:
      "Primenjeni su čl. 9. st. 3. KPD, čl. 6, 61, 65, 78. st. 3, 266. st. 1. i 270. PZ. Dete ima pravo na kontakte sa oba roditelja osim kada to nije u njegovom interesu. Sud mora uvažiti mišljenje deteta i CSR pre odluke o vršenju roditeljskog prava.",
    keywords: ["nasilje u porodici", "CSR", "mišljenje deteta", "KPD član 9"],
    related_articles: ["član 9. st. 3. KPD", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje majci; očeve prijave ocenjene kao zlonamerne u odnosu na CSR.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1190/2019",
    legal_area: "family",
    legal_question:
      "Da li putovanje deteta u inostranstvo može biti pitanje koje bitno utiče na život deteta i da li odbijanje saglasnosti za putnu ispravu može predstavljati nesavesno vršenje roditeljskog prava?",
    court_position:
      "Delimično usvojena revizija oca: preinačena je odluka o delimičnom lišenju u delu saglasnosti za putnu ispravu; potvrđeno je poveravanje majci, izdržavanje, viđanje i putovanje.",
    reasoning:
      "Lista pitanja iz čl. 78. st. 4. PZ nije zatvorena; putovanje u inostranstvo može bitno uticati na život deteta. Odbijanje saglasnosti oca bez opravdanih razloga može biti nesavesno vršenje i osnova za delimično lišenje u tom segmentu. U ostalom delu revizija nije osnovana; majka ostaje roditelj koji samostalno vrši pravo uz razuman model kontakata.",
    keywords: ["putna isprava", "delimično lišenje", "član 78. st. 4. PZ", "inostranstvo"],
    related_articles: ["član 78. st. 3–4. PZ", "član 82. PZ", "član 266. PZ"],
    headnote: "Delimično lišenje u delu putne isprave; ostalo potvrđeno u korist majke.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4824/2020",
    legal_area: "family",
    legal_question:
      "Da li različita prebivališta roditelja i poveravanje ocu nakon prekida vanbračne zajednice odgovaraju čl. 3. KPD i čl. 270. PZ?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je poveravanje ocu na samostalno vršenje roditeljskog prava i uređenje kontakata sa majkom.",
    reasoning:
      "U sporu o roditeljskom pravu sud se uvek rukovodi najboljim interesom deteta (čl. 3. KPD, čl. 6. i 266. PZ). Obavezno je mišljenje dva CSR kada roditelji žive na različitim mestima (čl. 270. PZ). Iz nalaza proizilazi da je dete trebalo poveriti ocu koji će samostalno vršiti pravo.",
    keywords: ["vanbračna zajednica", "dva CSR", "član 270. PZ", "poveravanje ocu"],
    related_articles: ["član 270. PZ", "član 266. st. 1. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje ocu uz mišljenja oba centra za socijalni rad.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3642/2020",
    legal_area: "family",
    legal_question:
      "Da li je tumačenje čl. 75. PZ ispravno kada se zajedničko vršenje roditeljskog prava uslovljava sporazumom roditelja?",
    court_position:
      "Odbačena je revizija tuženog; potvrđeno je poveravanje majci jer sporazum o zajedničkom vršenju ne postoji.",
    reasoning:
      "Primenjeni su čl. 270. i 272. PZ i čl. 266. st. 1. PZ. Zajedničko vršenje van zajedničkog života zahteva sporazum koji sud oceni kao u interesu deteta (čl. 75–76. PZ). Bez sporazuma sud donosi odluku o samostalnom vršenju. Tumačenje da je sporazum neophodan ne vodi do nemogućnosti zajedničkog vršenja kada bi to bilo u interesu deteta — pitanje je konkretne procene u slučaju bez sporazuma.",
    keywords: ["član 75. PZ", "sporazum", "zajedničko roditeljsko pravo", "član 76. PZ"],
    related_articles: ["član 75–76. PZ", "član 270. PZ", "član 272. st. 2. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje majci; zajedničko vršenje nije moguće bez sporazuma u interesu deteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1616/2025",
    legal_area: "family",
    legal_question:
      "Da li izričito odbijanje dece da viđaju oca i strah zbog ranijeg nasilja mogu opravdati delimično lišenje oca u delu ličnih odnosa?",
    court_position:
      "Odbačena je revizija oca; potvrđene su obaveza izdržavanja i delimično lišenje u delu kontakata zbog autentičnog odbijanja i straha kod dece.",
    reasoning:
      "Pitanja bitna za život deteta uključuju obrazovanje, zdravlje, prebivalište i imovinu (čl. 78. st. 4. PZ). Tužbu za lišenje mogu podneti ovlašćeni podnosioci (čl. 264. st. 2. PZ). Sud može u istom sporu odlučiti o merama zaštite od nasilja (čl. 273. st. 3. PZ). Četvorogodišnja adaptacija na život sa majkom i autentičan odnos dece prema ocu podržavaju ograničenje kontakata.",
    keywords: ["delimično lišenje", "nasilje u porodici", "mišljenje deteta", "član 273. PZ"],
    related_articles: ["član 78. st. 4. PZ", "član 264. st. 2. PZ", "član 273. st. 2–3. PZ", "član 6. PZ"],
    headnote: "Potvrđeno delimično lišenje kontakata oca zbog straha i odbijanja od strane dece.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 28055/2023",
    legal_area: "family",
    legal_question:
      "Da li odbijanje saglasnosti za školovanje, državljanstvo i slična pitanja može predstavljati nesavesno vršenje roditeljskog prava koje opravdava delimično lišenje?",
    court_position:
      "Odbačena je revizija tuženog; potvrđeno je delimično lišenje roditeljskog prava zbog nesavesnog vršenja dužnosti u bitnim pitanjima za život deteta.",
    reasoning:
      "Primenjeni su čl. 59–65, 78. i 82. PZ i čl. 266. st. 1. i 270. PZ. Roditelj koji ne vrši pravo zadržava određena prava zajedničkog odlučivanja, ali nesavesno vršenje u oblasti obrazovanja i državljanstva može opravdati delimično lišenje po čl. 82. st. 1. PZ.",
    keywords: ["delimično lišenje", "obrazovanje", "državljanstvo", "član 82. PZ"],
    related_articles: ["član 82. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 78. PZ"],
    headnote: "Potvrđeno delimično lišenje zbog ometanja obrazovanja i državljanstva deteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5125/2020",
    legal_area: "family",
    legal_question:
      "Da li je poveravanje deteta majci u skladu sa KPD i obavezom pribavljanja mišljenja CSR kada je dete u mlađem školskom uzrastu?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje majci na samostalno vršenje roditeljskog prava uz model kontakata.",
    reasoning:
      "Primenjeni su čl. 3. KPD, čl. 6. i 266. PZ i čl. 270. PZ. Sud nema stručno znanje za sve činjenice o poveravanju; zato je ispravno zatraženo mišljenje CSR na oba mesta prebivališta. Najbolji interes deteta zahteva emocionalnu stabilnost i bliskost sa roditeljem koji ne vrši pravo u okviru određenog modela.",
    keywords: ["član 270. PZ", "KPD", "poveravanje majci", "mlađi uzrast"],
    related_articles: ["član 3. KPD", "član 266. PZ", "član 270. PZ"],
    headnote: "Potvrđeno poveravanje majci uz obavezno mišljenje CSR.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3495/2020",
    legal_area: "family",
    legal_question:
      "Da li kontinuitet boravka deteta kod oca i prilagođenost sredini mogu imati prednost pred majčinim ranijim pokušajima da ostvari staranje kada je dete kod oca od rođenja?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je poveravanje ocu na samostalno vršenje roditeljskog prava.",
    reasoning:
      "Oba roditelja su motivisana i sposobna, ali dete živi u domaćinstvu oca od rođenja, pohađa vrtić u toj sredini i prilagođeno je. Partnerski odnosi i nasilje prema majci ne mogu imati prednost pred najboljim interesom deteta koji podržava kontinuitet kod oca (čl. 266. PZ).",
    keywords: ["kontinuitet", "stabilnost", "poveravanje ocu", "najbolji interes deteta"],
    related_articles: ["član 266. st. 1. PZ", "član 77. st. 3. PZ"],
    headnote: "Potvrđeno poveravanje ocu zbog životnog kontinuiteta deteta u njegovom domaćinstvu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 708/2021",
    legal_area: "family",
    legal_question:
      "Da li propust suda i organa starateljstva da blagovremeno odluče o privremenoj zabrani iznošenja deteta u inostranstvo može povrediti prava roditelja i deteta?",
    court_position:
      "Ustavni sud je usvojio žalbu i utvrdio povredu prava roditelja i deteta jer nije delovalo na predlog privremene mere radi sprečavanja otmice dece u inostranstvo.",
    reasoning:
      "Dete ima pravo na lične odnose i zaštitu od proizvoljnog odvajanja (čl. 61, 67, 68, 75, 77. PZ). Državni organi dužni su da deluju u najboljem interesu deteta i spreče nezakonito premeštanje deteta preko granice.",
    keywords: ["otmica deteta", "privremena mera", "inostranstvo", "Ustavni sud"],
    related_articles: ["član 61. PZ", "član 67. PZ", "član 77. st. 3. PZ"],
    headnote: "Usvojena žalba zbog propusta po hitnoj meri protiv iznošenja dece u inostranstvo.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 21768/2022",
    legal_area: "family",
    legal_question:
      "Da li je delimično lišenje oca prava na saglasnost za putne isprave neosnovano kada majka samostalno vrši roditeljsko pravo?",
    court_position:
      "Vrhovni sud je preinačio presude i ukinuo delimično lišenje u delu saglasnosti za putne isprave jer saglasnost oca po zakonu nije potrebna.",
    reasoning:
      "Roditelj koji ne vrši pravo može biti lišen prava na lične odnose i na odlučivanje o bitnim pitanjima (čl. 82. st. 4. PZ). Zakon o putnim ispravama dopušta izdavanje bez saglasnosti drugog roditelja kada je jednom dodeljeno starateljstvo odnosno samostalno vršenje (čl. 29. st. 2). Lista bitnih pitanja iz čl. 78. st. 3. PZ nije iscrpljena; ipak, kada majka sama vrši pravo, posebno lišenje saglasnosti za putnu ispravu je suvišno i neosnovano.",
    keywords: ["putna isprava", "saglasnost", "preinačenje", "član 82. PZ"],
    related_articles: ["član 82. st. 4. PZ", "član 78. st. 3. PZ", "Zakon o putnim ispravama član 29"],
    headnote: "Ukinuto delimično lišenje u delu putnih isprava jer majka samostalno vrši roditeljsko pravo.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 6177/2020",
    legal_area: "family",
    legal_question:
      "Da li nalaz psihologa i CSR da ne treba menjati staratelja majci isključuju izmenu odluke o vršenju roditeljskog prava u korist oca?",
    court_position:
      "Odbačena je revizija tužioca; potvrđeno je da nema promenjenih okolnosti za izmenu ranje odluke kojom su deca poverena majci.",
    reasoning:
      "Najbolji interes deteta se ceni prema celokupnim okolnostima (čl. 266. PZ). Veštak i CSR su predložili da se starateljstvo ne menja; deca ostaju kod majke uz kontakte sa ocem po ranijem modelu. Postupak je bio u skladu sa čl. 270. PZ.",
    keywords: ["izmena roditeljskog prava", "promenjene okolnosti", "veštak", "CSR"],
    related_articles: ["član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Odbijena izmena starateljstva; nema promenjenih okolnosti u korist oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 285/2020",
    legal_area: "family",
    legal_question:
      "Da li je moguće potvrditi poveravanje deteta majci a ukinuti potpuno lišenje oca roditeljskog prava radi potpunijeg utvrđivanja činjenica?",
    court_position:
      "Delimično usvojena revizija tuženog oca: potvrđeno je poveravanje majci; ukinuta je odluka o potpunom lišenju oca i predmet vraćen na ponovno suđenje u tom delu.",
    reasoning:
      "Majka ima kapacitete i dete je kod nje adaptirano; utvrđeno je teško ponašanje oca prema detetu i mere zaštite od nasilja. Potpuno lišenje zahteva posebno utvrđivanje činjenica i razmeru; VKS nalazi da je u tom delu potrebno ponovno odlučivanje uz dopunu dokaza.",
    keywords: ["potpuno lišenje", "poveravanje majci", "ukidanje", "nasilje u porodici"],
    related_articles: ["član 81. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Potvrđeno staranje majci; vraćanje na ponovno suđenje o potpunom lišenju oca.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7856/2025",
    legal_area: "family",
    legal_question:
      "Da li je postojeći model viđanja deteta sa ocem u najboljem interesu deteta i da li isključuje izmenu na zahtev majke?",
    court_position:
      "Odbačena je revizija tužilje-majke; potvrđeno je odbijanje zahteva za izmenu načina održavanja ličnih odnosa deteta i oca.",
    reasoning:
      "Primenjeni su čl. 9. st. 3. KPD i čl. 6, 61, 65, 78. st. 3, 266. st. 1. i 270. PZ. Dete ima pravo na redovne kontakte sa roditeljem koji ne živi sa njim osim ako to nije suprotno interesu deteta. Nisu ispunjeni uslovi za izmenu jer postojeći model ostaje u interesu deteta.",
    keywords: ["izmena viđanja", "najbolji interes deteta", "član 61. PZ"],
    related_articles: ["član 61. st. 1. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 9. st. 3. KPD"],
    headnote: "Odbijena izmena modela viđanja; postojeći režim ostaje u interesu deteta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 585/2023",
    legal_area: "family",
    legal_question:
      "Da li baba mora predati maloletnog unuka ocu jedinom živom roditelju posle smrti majke uprkos dugogodišnjoj opstrukciji?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom se nalaže babi da preda dete ocu; to je u najboljem interesu deteta.",
    reasoning:
      "Po čl. 77. st. 1. PZ, ako jedan roditelj premine, drugi roditelj po zakonu sam vrši roditeljsko pravo. Roditeljsko pravo je lično; otac ima pravo na preuzimanje deteta. Odbijanje korišćenja veštačkog nalaza neuropsihijatra zbog nedostatka saglasnosti privremenog staratelja (CSR) i učešća oca bilo je pravilno postupanje prvostepenog suda u skladu sa propisima o medicinskim merama i pristanku zakonskog zastupnika maloletnika.",
    keywords: ["smrt roditelja", "predaja deteta", "član 77. st. 1. PZ", "privremeni staratelj"],
    related_articles: ["član 77. st. 1. PZ"],
    headnote: "Potvrđena obaveza babe da preda dete ocu posle smrti majke.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9782/2012",
    legal_area: "family",
    legal_question:
      "Da li dugotrajni porodični spor opravdava ustavnu žalbu zbog prekoračenja razumnog roka suđenja?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu u delu koji se odnosi na dužinu postupka i pravo stanovanja kao neosnovanu; složenost predmeta i odluke u interesu deteta opravdavaju trajanje.",
    reasoning:
      "Kriterijumi za izdržavanje (čl. 160. PZ) i pravo stanovanja (čl. 194. PZ) moraju biti u skladu sa najboljim interesom deteta (čl. 266. PZ). Obaveza pribavljanja nalaza CSR pre odluke (čl. 270. PZ) doprinosi dužini ali i kvalitetu postupka.",
    keywords: ["razuman rok", "Ustavni sud", "pravo stanovanja", "član 194. PZ"],
    related_articles: ["član 160. PZ", "član 194. PZ", "član 266. st. 1. PZ", "član 270. PZ"],
    headnote: "Odbijena žalba na dužinu postupka u složenom porodičnom sporu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8846/2024",
    legal_area: "family",
    legal_question:
      "Da li je drugostepeni sud pogrešno ukinuo prvostepenu odluku o delimičnom lišenju oca u delu odlučivanja o prebivalištu deteta u Nemačkoj sa majkom?",
    court_position:
      "Vrhovni sud je usvojio reviziju tužilje-majke, preinačio presudu Apelacionog suda i potvrdio prvostepenu odluku o delimičnom lišenju oca u delu prebivališta jer je preseljenje u najboljem interesu deteta.",
    reasoning:
      "Kada promena prebivališta ne šteti detetu i ne onemogućava kontakte, a otac se protivi iz čl. 78. st. 3. u vezi sa čl. 82. PZ može doći do delimičnog lišenja prava odlučivanja o prebivalištu. Primenjeni su čl. 3. KPD, čl. 6. i 266. PZ i mišljenje deteta uz CSR (čl. 270. PZ).",
    keywords: ["prebivalište u inostranstvu", "delimično lišenje", "član 82. PZ", "preinačenje"],
    related_articles: ["član 78. st. 3. PZ", "član 82. st. 1. i 4. PZ", "član 266. st. 1. PZ", "član 3. KPD"],
    headnote: "Preinačena drugostepena odluka; potvrđeno delimično lišenje oca u delu prebivališta radi preseljenja sa majkom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3285/2020",
    legal_area: "family",
    legal_question:
      "Da li u tužbi oca za izmenu modela viđanja moraju kao tužene biti obuhvaćena i maloletna deca i majka koja samostalno vrši roditeljsko pravo?",
    court_position:
      "VKS je usvojio reviziju i ukinuo presude jer majka kao roditelj koji samostalno vrši roditeljsko pravo nije bila tužena, a na nju se odnosi pravno dejstvo o izmeni kontakata.",
    reasoning:
      "U sporu o izmeni odluke o vršenju roditeljskog prava strvarna legitimacija pripada roditeljima (čl. 67. PZ). Preobražajna presuda menja prava oba roditelja; majka mora biti tužena, a ne samo deca kao zastupana stranka, radi potpunosti procesne zajednice.",
    keywords: ["legitimacija", "tužena strana", "ukidanje", "viđanje"],
    related_articles: ["član 67. PZ", "član 266. PZ"],
    headnote: "Vraćanje predmeta zbog propusta da majka bude tužena u sporu o izmeni viđanja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 191/2019",
    legal_area: "family",
    legal_question:
      "Da li je dovoljno samo mišljenje deteta za izmenu poveranja u korist oca bez posebnog saslušanja pred sudom?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je da nema osnova za izmenu odluke o poveravanju majci.",
    reasoning:
      "Najbolji interes se ne svodi samo na mišljenje deteta; važni su uzrast, potrebe i roditeljska sposobnost (čl. 266. PZ). IMH je obavio intervju sa detetom; u datom uzrastu nije povređen čl. 65. PZ. Bez sporazuma o zajedničkom vršenju (čl. 76. PZ) nema osnova za prelazak na zajedničko vršenje.",
    keywords: ["mišljenje deteta", "član 65. PZ", "izmena poveranja", "IMH"],
    related_articles: ["član 65. PZ", "član 266. st. 1. PZ", "član 76. PZ", "član 270. PZ"],
    headnote: "Odbijena izmena u korist oca; šira procena interesa deteta i sporazum o zajedničkom vršenju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2103/2020",
    legal_area: "family",
    legal_question:
      "Da li model po kome dete provodi ceo letnji i zimski raspust samo sa ocem može biti u najboljem interesu kada dete živi u inostranstvu sa majkom?",
    court_position:
      "VKS je ukinuo nižestepene presude u delu o načinu održavanja ličnih odnosa sa ocem i vratio predmet radi ponovnog utvrđivanja činjenica.",
    reasoning:
      "Sud mora sam proceniti najbolji interes deteta u odnosu na kontakte (čl. 266. i 205. PZ), uz CSR/IMH, ali ne i mehanički usvojiti nedostajući predlog. Model koji detetu ne ostavlja deo raspusta sa majkom nije u interesu deteta; potrebno je potpuno činjenično stanje.",
    keywords: ["viđanje", "raspust", "inostranstvo", "ukidanje"],
    related_articles: ["član 266. st. 1. PZ", "član 270. PZ", "član 205. PZ"],
    headnote: "Vraćanje predmeta radi balansiranog rasporeda raspusta između roditelja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4154/2013",
    legal_area: "family",
    legal_question:
      "Da li dugotrajno držanje deteta u privremenom starateljstvu bez mera za ponovno spajanje sa majkom povređuje ustavna prava?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava roditelja zbog dugotrajnog odvajanja deteta od majke; dosuđena je naknada nematerijalne štete.",
    reasoning:
      "Država treba da obezbedi zaštitu deteta u porodici kad god je to moguće (čl. 6. st. 6. PZ). Zabrana zloupotrebe roditeljskog prava (čl. 7. PZ). Dete ima pravo na život sa roditeljima uz ograničenje samo sudskom odlukom u interesu deteta (čl. 60. PZ). Korektivni nadzor i mere CSR moraju voditi ka spajanju porodice, a ne perpetuirati odvajanje.",
    keywords: ["privremeno starateljstvo", "Ustavni sud", "član 65. Ustava", "naknada štete"],
    related_articles: ["član 6. st. 6. PZ", "član 60. PZ", "član 80. PZ"],
    headnote: "Usvojena žalba zbog dugog održavanja deteta van majke bez adekvatnih mera spajanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 430/2021",
    legal_area: "family",
    legal_question:
      "Da li je osnovan zahtev majke za delimično lišenje oca u delu saglasnosti za prebivalište, put i inostranstvo kada nije dokazano nesavesno vršenje?",
    court_position:
      "Apelacioni sud je odbio žalbe obe strane i potvrdio prvostepenu presudu: dete majci, viđanje i izdržavanje; odbijeni zahtevi za delimično lišenje oca i protivtužba oca.",
    reasoning:
      "Majka nije dokazala nesavesno vršenje očevog roditeljskog prava (čl. 82. PZ). CSR i KPD podržavaju odluku da dete ostane sa majkom uz model kontakata i alimentacije od 17.000 RSD mesečno.",
    keywords: ["delimično lišenje", "protivtužba", "CSR", "izdržavanje"],
    related_articles: ["član 82. PZ", "član 266. st. 1. PZ", "član 270. PZ", "član 3. KPD"],
    headnote: "Potvrđeno poveravanje majci; odbijeno delimično lišenje oca i očeva protivtužba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 473/2021",
    legal_area: "family",
    legal_question:
      "Da li roditeljima može biti vraćeno roditeljsko pravo nad punoletnom ćerkom sa smetnjama u razvoju kada uspostave emotivnu vezu i motivaciju?",
    court_position:
      "Apelacioni sud je odbio žalbu CSR i potvrdio prvostepenu presudu kojom roditeljima vraća roditeljsko pravo uz plan prilagođen adaptacionom periodu.",
    reasoning:
      "Primenjen je čl. 266. st. 1. PZ. CSR nema ovlašćenja da mimo sudske odluke pravi plan vraćanja deteta u porodicu. Adaptacioni period do šest meseci je prihvatljiv; prilikom vraćanja roditeljskog prava neophodno je da roditelji nisu lišeni prava kako bi se izbegla suprotna odluka o starateljstvu i vraćanju u ustanovu.",
    keywords: ["vraćanje roditeljskog prava", "punoletnik", "smetnje u razvoju", "CSR"],
    related_articles: ["član 266. st. 1. PZ"],
    headnote: "Potvrđeno vraćanje roditeljskog prava roditeljima uz najbolji interes punoletne ćerke.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4758/2020",
    legal_area: "family",
    legal_question:
      "Da li je moguće delimično lišiti roditelja koji ne vrši roditeljsko pravo merama koja prelaze okvir čl. 82. PZ?",
    court_position:
      "VKS je ukinuo presudu Apelacionog suda o delimičnom lišenju oca jer je pogrešno primenjeno materijalno pravo o obimu lišenja.",
    reasoning:
      "Potpuno lišenje (čl. 81. PZ) liši sva prava osim izdržavanja. Delimično lišenje (čl. 82. PZ) može lišiti samo određena prava: za roditelja koji vrši pravo – čuvanje, vaspitanje, zastupanje, imovina (st. 3); za roditelja koji ne vrši – kontakte i odlučivanje o bitnim pitanjima (st. 4). Sud ne može izreći širi oblik lišenja od zakonom dopuštenog.",
    keywords: ["delimično lišenje", "član 81. PZ", "član 82. PZ", "ukidanje"],
    related_articles: ["član 81. PZ", "član 82. PZ"],
    headnote: "Ukidanje delimičnog lišenja zbog prekoračenja zakonom predviđenog obima.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 795/2008",
    legal_area: "family",
    legal_question:
      "Da li je pravo na suđenje u razumnom roku povređeno zbog višegodišnjeg trajanja postupka za poveravanje deteta?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu Danice Dačić i utvrdio povredu prava na suđenje u razumnom roku zbog nedelotvornog postupanja prvostepenog suda; deo žalbe koji se odnosi na izvršni postupak odbijen.",
    reasoning:
      "Dete ima pravo na lične odnose i zaštitu (čl. 61. PZ), na razvoj (čl. 62. PZ), a roditeljsko pravo je ograničeno interesom deteta (čl. 67. PZ). Postupci u porodičnim stvarima zahtevaju posebnu brzinu; neopravdano odlaganje prvostepenog suda krši razuman rok.",
    keywords: ["razuman rok", "poveravanje deteta", "Ustavni sud", "član 32. Ustava"],
    related_articles: ["član 61. PZ", "član 67. PZ", "član 202. PZ"],
    headnote: "Usvojena žalba zbog prekoračenja roka u postupku za poveravanje deteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3200/2017",
    legal_area: "family",
    legal_question:
      "Da li očevo protivljenje preseljenju deteta u inostranstvo sa majkom može predstavljati nesavesno vršenje i osnov za delimično lišenje u delu prebivališta?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je delimično lišenje u pogledu odlučivanja o prebivalištu deteta jer je život sa majkom u inostranstvu u interesu deteta.",
    reasoning:
      "Oba roditelja su podobna za samostalno vršenje, ali dete je usmereno na majku od rođenja; preseljenje ne narušava najbolji interes (čl. 3. KPD, čl. 67–78. PZ). Protivljenje oca bez opravdanja u odnosu na dobrobit deteta predstavlja osnov za delimično lišenje po čl. 82. PZ.",
    keywords: ["prebivalište", "inostranstvo", "delimično lišenje", "član 82. PZ"],
    related_articles: ["član 82. PZ", "član 78. st. 3. PZ", "član 67. PZ", "član 3. KPD"],
    headnote: "Potvrđeno delimično lišenje oca u delu prebivališta radi odlaska deteta sa majkom u inostranstvo.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2500/2020",
    legal_area: "family",
    legal_question:
      "Da li je poveravanje deteta ocu na samostalno vršenje roditeljskog prava uz alimentaciju i kontakte u skladu sa najboljim interesom deteta?",
    court_position:
      "Odbačena je revizija tužilje-majke; potvrđena je odluka Apelacionog suda o poveravanju ocu.",
    reasoning:
      "Primenjeni su čl. 77. st. 3. i 266. st. 1. PZ. U sporu o roditeljskom pravu sud uvek ceni najbolji interes deteta kao imperativ.",
    keywords: ["poveravanje ocu", "izdržavanje", "član 77. PZ"],
    related_articles: ["član 77. st. 3. PZ", "član 266. st. 1. PZ"],
    headnote: "Potvrđeno poveravanje ocu i režim izdržavanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2057/2009",
    legal_area: "family",
    legal_question:
      "Da li je trajanje postupka za izmenu poveravanja deteta povreda prava na pravično suđenje i razuman rok?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu u delu pravičnog suđenja i razumnog roka kao neosnovanu; preostali deo odbačen.",
    reasoning:
      "Najbolji interes deteta, ravnopravnost roditelja i zabrana zloupotrebe (čl. 6–7. PZ) okvir su odlučivanja. Hitnost porodičnih sporova (čl. 202. PZ) ne znači automatsku povredu roka u svakom složenom predmetu ako sud postupa u okviru zakona.",
    keywords: ["razuman rok", "ustavna žalba", "izmena poveravanja"],
    related_articles: ["član 6. PZ", "član 202. PZ", "član 266. PZ"],
    headnote: "Odbijena žalba na dužinu postupka o izmeni poveravanja deteta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6485/2025",
    legal_area: "family",
    legal_question:
      "Da li je prerana i proizvoljna obustava izvršenja predaje deteta majci u postupku pred Višim sudom u Kragujevcu povreda prava roditelja?",
    court_position:
      "Ustavni sud je poništio rešenje Višeg suda u Kragujevcu kojim je obustavljeno izvršenje predaje deteta majci, ocenjujući obustavu preuranjenom i zanemarujući mišljenje CSR o manipulaciji stavova deteta od strane oca.",
    reasoning:
      "Ustav i PZ štite najbolji interes deteta, ravnopravnost roditelja i pravo deteta na mišljenje (čl. 6–7, 65, 67–68. PZ). Dete starije od 10 godina može izraziti mišljenje u postupku (čl. 65. st. 3–4. PZ). Izvršni sud mora srazmerno i delotvorno postupati u prinudnoj predaji deteta, bez proizvoljne obustave koja ignoriše stručne nalaze starateljskog organa.",
    keywords: ["izvršenje", "predaja deteta", "obustava", "Ustavni sud"],
    related_articles: ["član 6. PZ", "član 7. PZ", "član 65. PZ", "član 67. PZ"],
    headnote: "Poništena obustava izvršenja predaje deteta majci kao preuranjena i neadekvatna.",
    outcome: "plaintiff_won",
  },
]
