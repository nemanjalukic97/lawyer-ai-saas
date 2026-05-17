// scripts/case-law-civil-serbia-5.ts
// Serbian case law: susedsko pravo, održaj, svojina, imovina — all 3 batches.

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CIVIL_SERBIA_5: CaseLawInput[] = [
  // ── BATCH 1 (1/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 7131/2020",
    decision_date: "2020-01-01",
    legal_area: "civil",
    legal_question:
      "Da li vlasnik susednog objekta može tražiti da mu sused omogući privremeni pristup parceli radi izvođenja radova na fasadi, u skladu sa susedskim pravom?",
    court_position:
      "Apelacioni sud u Beogradu potvrdio je prvostepenu presudu kojom su tuženi obavezani da tužiocu omoguće privremeni pristup parceli radi radova na fasadi susednog objekta, uz vraćanje u prvobitno stanje.",
    reasoning:
      "Susedsko pravo je ovlašćenje vlasnika jedne nepokretnosti da koristi susednu ili zahteva od njenog vlasnika činjenje ili uzdržavanje, uz duh dobrosusedstva i uzajamnu obzirnost; kada fasada ne može biti završena bez korišćenja susednog zemljišta, vlasnici tog zemljišta dužni su da omoguće potrebno korišćenje.",
    keywords: ["susedsko pravo", "fasada", "privremeni pristup", "dobrosusedstvo"],
    related_articles: ["Zakon o osnovama svojinskopravnih odnosa", "paragraf 282. SGZ"],
    headnote: "Obaveza suseda da omogući privremeni pristup parceli radi radova na fasadi.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5104/2020",
    decision_date: "2020-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine na realnom delu susedne parcele može steći vanrednim održajem ako je tokom roka za održaj bio spor koji je okončan odbijanjem zahteva dotadašnjih vlasnika?",
    court_position:
      "Vrhovni kasacioni sud odbio je reviziju tuženih i potvrdio da su tužioci stekli svojinu na delu parcele vanrednim održajem posle preko 20 godina savesne državine.",
    reasoning:
      "Čl. 28 st. 4 ZOSPO: savesnost i nesmetani posed preko 20 godina od stupanja na snagu izmene 03.08.1996; ranji spor u kojem su tužioci osporavali posed tuženih potvrđuje uverenje da je parcela njihova, a ne prekida savesnost za održaj.",
    keywords: ["vanredni održaj", "čl. 28 ZOSPO", "savesnost", "preko 20 godina"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "VKS: održaj na delu susedne parcele uprkos ranijem sporu o predaji.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4339/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se može utvrditi susvojina na spojenom stanu ako je ugovor o kupoprodaji glasio na stan koji nikada nije izgrađen?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje zahteva za utvrđenje susvojine na polovini stana jer nije postojalo prethodno pravo svojine na stvari od koje je nastao novi stan i jer tužba nije obuhvatila sve nužne suparnike.",
    reasoning:
      "Čl. 23 ZOSPO zahteva pravo vlasništva na prethodnoj stvari; stan iz ugovora nije izgrađen; nedostatak procesne zajednice po čl. 211 ZPP ako je trebalo uključiti dodatnog kupca istog lanca spajanja.",
    keywords: ["susvojina", "spajanje stanova", "čl. 23 ZOSPO", "procesna zajednica"],
    related_articles: ["čl. 23 ZOSPO", "čl. 211 ZPP"],
    headnote: "Odbijena susvojina na spojenom stanu bez prethodnog prava na projektovani stan.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1419/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se na dograđenom delu kuće koji sa starim delom čini jednu funkcionalnu celinu može steći vanknjižno vlasništvo savesnom gradnjom?",
    court_position:
      "Apelacioni sud preinačio je presudu i odbio zahtev za utvrđenje svojine na dograđenom delu jer objekat nije zasebna građevinska celina i gradnja je bila bez građevinske dozvole.",
    reasoning:
      "Čl. 19–24 ZOSPO: sticanje svojine građenjem podrazumeva zasebnu građevinsku celinu; dogradnja u funkcionalnoj celini sa starim delom ne daje osnov za posebno vlasništvo, već eventualno obligacioni zahtev.",
    keywords: ["dogradnja", "savesna gradnja", "funkcionalna celina", "čl. 21 ZOSPO"],
    related_articles: ["čl. 19–24 ZOSPO"],
    headnote: "Nema posebnog vlasništva na dogradnji koja nije zasebna građevinska celina.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Gž 25359/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li savesni graditelj koji je deo objekta sagradio na susednoj parceli može steći svojinu na tom delu održajem ili savesnom gradnjom?",
    court_position:
      "Vrhovni sud odbio je reviziju tužilje i potvrdio da je tuženi stekao svojinu na delu parcele savesnom gradnjom i vanrednim održajem posle savesnog posedovanja dužeg od 20 godina.",
    reasoning:
      "Čl. 28 st. 4 ZOSPO; Zakon o ozakonjenju objekata čl. 10 st. 1 i 3 tačka 1; saznanje o preklapanju od oko 5 m2 tek 2016. ne ukida raniju savesnost državine.",
    keywords: ["savesna gradnja", "vanredni održaj", "ozakonjenje", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "Zakon o ozakonjenju objekata čl. 10"],
    headnote: "Vrhovni sud: svojina na delu parcele ispod građevine — održaj i ozakonjenje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 16393/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li zemljoradnička zadruga može steći svojinu održajem na parceli u državnoj svojini ako se oslanja na poravnanje i zakonitu državinu dužu od deset godina?",
    court_position:
      "Vrhovni Sud usvojio je reviziju tužene države, preinačio drugostepenu presudu i odbio tužbeni zahtev za utvrđenje svojine održajem jer tužilac nije imao savesnu državinu u potrebnom roku.",
    reasoning:
      "Nižestepeni sud greškom prihvatio poravnanje kao valjan osnov i redovni održaj; za vanredni održaj potrebna je savesnost kroz ceo period; država kao tužena uspešno osporila ispunjenje uslova.",
    keywords: ["održaj", "savesnost", "državno zemljište", "poravnanje"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Vrhovni sud: odbijen održaj zbog nedostatka savesne državine u propisanom roku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 415/2010",
    decision_date: "2010-01-01",
    legal_area: "civil",
    legal_question:
      "Da li vlasnik susedne nepokretnosti ima pravo na naknadu štete kada izgradnja objekta uz dozvolu ipak nanosi znatniju štetu (npr. smanjenje osunčanosti)?",
    court_position:
      "Vrhovni kasacioni sud ukinuo je nižestepene presude koje su odbile naknadu i naložio ponovno odlučivanje uz obavezno utvrđivanje uzročne veze između izgradnje i štete.",
    reasoning:
      "Čl. 6 st. 2 ZOSPO: vršenje susedskog prava koje prouzrokuje znatniju štetu suprotno je cilju instituta; u gradskoj sredini uobičajena ograničenja se trpe, ali znatnija šteta povlači naknadu čak i pri zakonitoj gradnji; čl. 185 ZOO o naknadi i ranijem stanju.",
    keywords: ["naknada štete", "susedsko pravo", "čl. 6 ZOSPO", "investitor"],
    related_articles: ["čl. 6 st. 2 ZOSPO", "čl. 185 ZOO"],
    headnote: "VKS ukida: potrebna uzročna veza između gradnje i štete na susednom objektu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1198/2019",
    decision_date: "2019-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se udeo u suvlasništvu na kući stečenoj u porodičnoj zajednici utvrđuje srazmerno doprinosu članova domaćinstva?",
    court_position:
      "Vrhovni kasacioni sud odbio je reviziju tužilje i potvrdio utvrđivanje njenog suvlasničkog udela na 20%, uz odbijanje zahteva za veći udeo i za deo katastarske parcele bez odgovarajućeg knjižnog stanja.",
    reasoning:
      "Doprinos supružnika, vraćanje pozajmice i fizički angažman trećih lica utiču na procenu; nema prava na deo parcele po konverziji iz Zakona o planiranju i izgradnji čl. 102 bez ispunjenih uslova; vanknjižno suvlasništvo na parceli na kojoj su druga lica kao korisnici.",
    keywords: ["suvlasništvo", "doprinos", "bračna zajednica", "nova kuća"],
    related_articles: ["čl. 102 Zakona o planiranju i izgradnji", "čl. 24–26 ZOSPO"],
    headnote: "VKS: udeo u suvlasništvu na kući prema doprinosu porodice.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7813/2020",
    decision_date: "2020-01-01",
    legal_area: "constitutional",
    legal_question:
      "Da li je pravilno pravno shvatanje da se susvojina održajem može steći samo na realnom, a ne i na idealnom delu nepokretnosti?",
    court_position:
      "Ustavni sud usvojio je ustavnu žalbu, utvrdio povredu prava na pravično suđenje i poništio presudu Apelacionog suda u Kragujevcu zbog proizvoljne primene materijalnog prava.",
    reasoning:
      "Praksa Vrhovnog kasacionog suda (Rev. 5977/18, Rev. 2143/19, Rev. 2789/19) priznaje sticanje susvojine održajem i na idealnom delu na osnovu čl. 28 ZOSPO; odbacivanje tog stava bilo proizvoljno.",
    keywords: ["ustavna žalba", "održaj", "idealni deo", "susvojina", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 ZOSPO", "čl. 32 Ustava"],
    headnote: "US: susvojina održajem može i na idealnom delu — poništaj zbog proizvoljnosti.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1019/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine na stanu u državnoj svojini može steći vanrednim održajem posle 20 godina savesne državine od stupanja na snagu izmene ZOSPO 1996?",
    court_position:
      "Apelacioni sud potvrdio je presudu kojom je utvrđeno da je tužilac stekao svojinu na stanu održajem, jer je imao savesnu i mirnu državinu dužu od 20 godina od 03.08.1996.",
    reasoning:
      "Pravo svojine održajem ne zasniva se na pravu prethodnika već na činjenici savesnog držanja tokom propisanog roka; čl. 28 st. 4 i čl. 72 st. 2–3 ZOSPO; neuknjižavanje ne dokazuje nesavesnost same od sebe.",
    keywords: ["održaj", "stan", "državna imovina", "čl. 28 st. 4 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Potvrđeno sticanje svojine na stanu vanrednim održajem posle 20 godina.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4337/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li zakupci koji su adaptirali poslovne prostore u državnoj svojini mogu steći isključivo vlasništvo na celoj površini, uključujući izvornu državnu površinu?",
    court_position:
      "Apelacioni sud potvrdio je utvrđivanje suvlasništva Republike Srbije na prostorima koje su tužene adaptirale; na izvornoj državnoj površini bez posebnog ugovora o sticanju svojine nisu stečena prava vlasništva zakupaca.",
    reasoning:
      "Adaptacija i rekonstrukcija bez sporazuma o imovinskim odnosima ne prenosi svojinu na prvobitnoj državnoj površini; obaveštenja o nemogućnosti otkupa ukazuju na nesavesnost za održaj na tom delu; upis kod RGZ ne menja interes države za utvrđivanje suvlasništva.",
    keywords: ["suvlasništvo države", "zakup", "adaptacija", "poslovni prostor"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Država kao suvlasnik na adaptiranim poslovnim prostorima u svojoj svojini.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4804/2021",
    decision_date: "2021-01-01",
    legal_area: "civil",
    legal_question:
      "Ko odgovara za štetu vlasnicima susednih stanova zbog smanjene osunčanosti kada je objekat izgrađen uz dozvolu, ali suprotno urbanističkim pravilima o udaljenosti?",
    court_position:
      "Vrhovni kasacioni sud preinačio je drugostepenu presudu i utvrdio solidarnu odgovornost investitora i Grada Vranja za umanjenje tržišne vrednosti stanova tužilaca.",
    reasoning:
      "Pravilnik o parcelaciji i izgradnji čl. 18: minimalna udaljenost i ograničenje zaklanjanja osunčavanja; čl. 6 st. 2 ZOSPO: znatnija šteta povlači naknadu čak i pri dozvoli; investitor i organ koji je izdao dozvolu solidarno odgovaraju.",
    keywords: ["solidarna odgovornost", "šteta", "osunčanost", "urbanizam"],
    related_articles: ["čl. 6 st. 2 ZOSPO", "Pravilnik o parcelaciji i izgradnji čl. 18"],
    headnote: "Solidarna odgovornost investitora i grada za štetu zbog nedovoljne udaljenosti objekta.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2228/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo korišćenja na parceli u državnoj svojini može steći vanrednim održajem posle savesne državine duže od 20 godina od ukidanja zabrane održaja?",
    court_position:
      "Apelacioni sud potvrdio je prvostepenu presudu kojom je utvrđeno pravo korišćenja tužilje na katastarskoj parceli u državnoj svojini na osnovu održaja.",
    reasoning:
      "Čl. 28 st. 2 i 4 ZOSPO; održaj zahteva savesnu državinu za vanredni održaj; savesnost se pretpostavlja, a osporavač dokazuje suprotno po čl. 72 st. 2–3 ZOSPO.",
    keywords: ["pravo korišćenja", "održaj", "državna svojina", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Utvrđeno pravo korišćenja na državnom zemljištu vanrednim održajem.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1976/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se susvojina na prizemnom delu stambene zgrade može steći vanrednim održajem posle 20 godina savesne i neprekidne državine?",
    court_position:
      "Apelacioni sud potvrdio je presudu kojom je utvrđena susvojina tužioca na prizemlju stečena vanrednim održajem.",
    reasoning:
      "Čl. 28 st. 2 i 4 ZOSPO; održaj je originarno sticanje na osnovu kvaliteta državine i vremena; savesnost se pretpostavlja; osporavač dokazuje nesavesnost.",
    keywords: ["susvojina", "vanredni održaj", "stambena zgrada", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Potvrđena susvojina na delu zgrade stečena vanrednim održajem.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž2 Po1 213/2011",
    decision_date: "2011-01-01",
    legal_area: "criminal",
    legal_question:
      "Da li je pravilno rešenje o privremenom oduzimanju stana i vozila okrivljenom ako prvostepeni sud nije potpuno utvrdio poreklo imovine i prihode okrivljenog?",
    court_position:
      "Apelacioni sud uvažio je žalbu branioca, ukinuo rešenje o privremenom oduzimanju stana i vozila i naložio ponovno ispitivanje porekla sredstava, uključujući poklone od porodice i realne prihode okrivljenog.",
    reasoning:
      "Sticanje svojine može biti i na osnovu neimenovanog obligacionog posla, ne samo kupoprodajnog ugovora; za vozilo treba utvrditi period sticanja i ceniti okolnosti zanimanja okrivljenog i prijava prihoda.",
    keywords: ["privremeno oduzimanje", "imovina", "poreklo sredstava", "žalba"],
    related_articles: ["Zakon o krivičnom postupku", "čl. 20 ZOSPO"],
    headnote: "Ukinuto privremeno oduzimanje zbog nepotpunog utvrđivanja porekla imovine.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4198/2013",
    decision_date: "2013-01-01",
    legal_area: "civil",
    legal_question:
      "Da li postoji obaveza suseda da podigne ogradu između parcela na zahtev drugog vlasnika?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje zahteva da tuženi postave ogradu jer nema zakonske ni običajne obaveze ograđivanja niti dokazanih štetnih imisija.",
    reasoning:
      "Susedski odnosi uređeni su delom propisima, delom običajnim pravom; tuženi 1. reda nisu suvlasnici sporne parcele niti u posedu iste, pa nisu odgovarajući nosioci eventualne obaveze.",
    keywords: ["ograda", "susedsko pravo", "običajno pravo", "imisije"],
    related_articles: ["Zakon o osnovama svojinskopravnih odnosa"],
    headnote: "Nema obaveze postavljanja ograde bez posebnog osnova ili štetnih imisija.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4664/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine na parceli upisanoj kao svojina Republike Srbije može steći vanrednim održajem?",
    court_position:
      "Apelacioni sud potvrdio je presudu kojom je utvrđeno da je tužilac stekao svojinu vanrednim održajem posle savesne državine duže od 20 godina.",
    reasoning:
      "Čl. 28 st. 2 i 4 ZOSPO; održaj kao originarno sticanje na osnovu državine i vremena; savesna državina u smislu čl. 72 ZOSPO.",
    keywords: ["održaj", "državna svojina", "čl. 28 ZOSPO", "savesnost"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Potvrđeno sticanje svojine na parceli RS vanrednim održajem.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2844/2019",
    decision_date: "2019-01-01",
    legal_area: "procedural",
    legal_question:
      "Da li drugostepeni sud može utvrditi drugačije činjenično stanje od prvostepenog bez održavanja rasprave?",
    court_position:
      "Vrhovni kasacioni sud ukinuo je presudu Apelacionog suda i vratio predmet na ponovno odlučivanje jer je drugostepeni sud bitno povredio parnični postupak.",
    reasoning:
      "Održaj se vezuje za čl. 28–30 ZOSPO i protek vremena uz savesnost i zakonitost; postupovna greška: utvrđivanje drugačijeg činjeničnog stanja bez rasprave.",
    keywords: ["bitna povreda postupka", "rasprava", "drugostepeni sud", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28–30 ZOSPO", "Zakon o parničnom postupku"],
    headnote: "VKS ukida drugostepenu presudu zbog odlučivanja bez rasprave o činjenicama.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7259/2022",
    decision_date: "2022-01-01",
    legal_area: "procedural",
    legal_question:
      "Da li privredno društvo ima neposredni pravni interes za pokretanje postupka proglašenja nestalog lica za umrlo radi rešavanja imovinskih odnosa na susednoj parceli?",
    court_position:
      "Vrhovni kasacioni sud odbio je reviziju i potvrdio da ekonomski interes PD za proširenje proizvodnje nije neposredni pravni interes po Zakonu o vanparničnom postupku.",
    reasoning:
      "Čl. 58 ZVP: interes mora biti neposredno vezan za prenos prava i obaveza proglašenjem; zaštita susedskih prava ostvaruje se parnicom po čl. 1 ZPP, ne vanparničnim proglašenjem.",
    keywords: ["pravni interes", "vanparnični postupak", "nestalo lice", "proglašenje za umrlo"],
    related_articles: ["čl. 58 ZVP", "čl. 60 ZVP", "čl. 1 ZPP"],
    headnote: "Nema neposrednog pravnog interesa PD za proglašenje nestalog za umrlo radi parcele.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3193/2018",
    decision_date: "2018-01-01",
    legal_area: "civil",
    legal_question:
      "Da li lice koje nije vlasnik ni suvlasnik susedne nepokretnosti može biti pasivno legitimisano u sporu iz susedskog prava?",
    court_position:
      "Vrhovni kasacioni sud odbio je reviziju tužioca i potvrdio da tužena koja nije vlasnik susedne nepokretnosti nije pasivno legitimisana.",
    reasoning:
      "Obaveze iz susedskih odnosa terete vlasnika nepokretnosti; paragraf 282. SGZ primenjiv po Zakonu o nevažnosti propisa; pasivna legitimacija mora odgovarati nosiocu prava i obaveza.",
    keywords: ["pasivna legitimacija", "susedsko pravo", "vlasnik", "SGZ"],
    related_articles: ["paragraf 282. SGZ", "Zakon o osnovama svojinskopravnih odnosa"],
    headnote: "Nevlasnik susedne parcele nije pasivno legitimisan u susedskom sporu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4802/2019",
    decision_date: "2019-01-01",
    legal_area: "civil",
    legal_question:
      "Da li je pravilno primenjeno pravo o početku roka za održaj i savesnosti držaoca kada se tužilac poziva na održaj na parcelama koje drži od 1956?",
    court_position:
      "Vrhovni kasacioni sud dozvolio je posebnu reviziju, ukinuo nižestepene presude i vratio predmet na ponovno suđenje zbog pogrešne primene materijalnog prava o održaju.",
    reasoning:
      "Sporna ocena početka roka, kvaliteta državine i prekida savesnosti; održaj uređen čl. 28–30 ZOSPO i čl. 20 st. 1 ZOSPO; potrebno ponovno vrednovanje činjenica.",
    keywords: ["održaj", "posebna revizija", "savesnost", "rok"],
    related_articles: ["čl. 28–30 ZOSPO", "čl. 20 ZOSPO"],
    headnote: "VKS ukida zbog pogrešne primene prava o održaju i savesnosti držaoca.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9024/2021",
    decision_date: "2021-01-01",
    legal_area: "civil",
    legal_question:
      "Da li kupci mogu steći svojinu održajem na idealnom delu nepokretnosti ako prodavci nisu bili vlasnici celog udela koji su prodali?",
    court_position:
      "Vrhovni kasacioni sud preinačio je drugostepenu presudu i utvrdio da su tužioci stekli svojinu vanrednim održajem na idealnom delu, jer pravo svojine održajem ne zavisi od prava prethodnika već od savesnog držanja tokom roka.",
    reasoning:
      "Čl. 28 st. 2 i 4 i čl. 72 ZOSPO; održaj kao trijumf fakta nad pravom; tužioci od 1997. kao upisani vlasnici u mirnoj državini tokom potrebnog roka.",
    keywords: ["održaj", "idealni deo", "savesnost", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "VKS: održaj na idealnom delu moguć uprkos manjkavosti prava prodavaca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1062/2012",
    decision_date: "2012-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine na nepokretnosti u društvenoj/državnoj svojini moglo steći održajem pre stupanja na snagu izmene ZOSPO 1996?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje zahteva za utvrđenje svojine jer pravni prethodnici nisu dokazali valjan osnov ni upis do 1945, a održaj na društvenoj svojini nije bio moguć do donošenja izmene 1996.",
    reasoning:
      "Održaj na društvenoj svojini nije mogao steći pravno dejstvo pre Zakona iz „Sl. glasnika RS“ 29/96; usmeni ugovor iz 1938. i pisanja prodavca nisu dokazali sticanje bez knjižnog upisa.",
    keywords: ["održaj", "društvena svojina", "ZOSPO 1996", "ograničenje održaja"],
    related_articles: ["čl. 28 ZOSPO", "Zakon o agrarnoj reformi čl. 27"],
    headnote: "Nema svojine održajem na društvenoj imovini pre zakonskog omogućenja 1996.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6642/2018",
    decision_date: "2018-01-01",
    legal_area: "commercial",
    legal_question:
      "Da li stečajni upravnik mora izdati clausula intabulandi ako tužilac tvrdi sticanje svojine po stranom zakonu i bez upisa u javne knjige?",
    court_position:
      "Privredni apelacioni sud potvrdio je odbijanje zahteva za saglasnost za upis jer tužilac nije dokazao da je tuženi nosilac svojine na spornoj nepokretnosti niti da je ugovor iz 1997. bio prenos svojine.",
    reasoning:
      "Čl. 33 ZOSPO: sticanje po pravnom poslu zahteva upis; sporna nepokretnost u stečajnoj masi kao svojina trećeg lica; strani propisi (Slovenija) nisu merodavni za sticanje na nepokretnostima u RS.",
    keywords: ["clausula intabulandi", "stečaj", "upis", "kupoprodaja"],
    related_articles: ["čl. 33 ZOSPO", "čl. 87 Zakona o državnom premeru i katastru"],
    headnote: "Odbijena clausula intabulandi zbog nedostatka dokaza o nosiocu svojine i prenosu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5311/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li je za vanredni održaj na društvenoj/državnoj imovini potrebna i zakonitost državine ili samo savesnost?",
    court_position:
      "Apelacioni sud potvrdio je utvrđivanje svojine tužilje vanrednim održajem, naglašavajući da je za vanredni održaj nužna savesnost, a zakonitost državine uslov samo za redovni održaj iz čl. 28 st. 2 ZOSPO.",
    reasoning:
      "Ako bi zakonitost bila uslov i za vanredni održaj, institut ne bi imao smisao; nesavesna državina ne može steći svojinu ni protekom vremena.",
    keywords: ["vanredni održaj", "savesnost", "zakonitost državine", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 st. 2 i 4 ZOSPO"],
    headnote: "Za vanredni održaj ključna je savesnost; zakonitost je uslov za redovni održaj.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4920/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li proširenje stana na zajedničke prostorije bez dokumentacije automatski daje savesnu državinu za sticanje svojine održajem?",
    court_position:
      "Vrhovni sud ukinuo je presude kojima je priznata svojina na dograđenim delovima stana i vratio predmet radi razjašnjenja savesnosti državine.",
    reasoning:
      "Prvostepeni sud je prihvatio zakonitost iz otkupa i savesnost, ali je u obzir uzeo i fiktivni darovni ugovor; proširenje na zajedničke delove bez dokumentacije ne sme voditi automatski do zaključka o savesnosti za održaj.",
    keywords: ["održaj", "savesnost", "dogradnja stana", "zajednički delovi"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Vrhovni sud: ukidanje zbog nerazjašnjene savesnosti pri održaju na dograđenom stanu.",
    outcome: "remanded",
  },

  // ── BATCH 2 (2/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 747/2021",
    decision_date: "2021-01-01",
    legal_area: "civil",
    legal_question:
      "Da li advokat može ostvariti ugovorenu nagradu u procentu, pravo zadržavanja i plodouživanja na stanu klijenta koji je suvlasnik nepokretnosti?",
    court_position:
      "Apelacioni sud odbio je žalbe advokata i klijenta i potvrdio prvostepenu presudu: dosuđena je naknada po tarifi za preduzete radnje, dok su zahtevi za procenat nagrade, zadržavanje i plodouživanje odbijeni kao neosnovani.",
    reasoning:
      "Kod susvojine na stanu i uskraćene saglasnosti drugog suvlasnika nisu ispunjeni uslovi za priznanje prava zadržavanja i plodouživanja; citirane odredbe ZOSPO o stvarnim pravima i svojini.",
    keywords: ["advokatska nagrada", "zadržavanje", "plodouživanje", "susvojina stana"],
    related_articles: ["čl. 52–60 ZOSPO", "Zakon o obligacionim odnosima"],
    headnote: "Odbijeno zadržavanje i plodouživanje na stanu u režimu susvojine; tarifna naknada advokatu.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4812/2014",
    decision_date: "2014-01-01",
    legal_area: "constitutional",
    legal_question:
      "Da li je pravilan stav da se susvojina održajem može steći samo na realnom delu nepokretnosti, a ne na idealnom udelu?",
    court_position:
      "Ustavni sud usvojio je ustavnu žalbu, utvrdio povredu prava na pravično suđenje i poništio presudu Apelacionog suda jer je proizvoljno primenjeno materijalno pravo.",
    reasoning:
      "Čl. 20–21 i 28 st. 2 i 4 i 72 ZOSPO; praksa Vrhovnog kasacionog suda dopušta sticanje susvojine održajem i na idealnom delu; isključivanje idealnog dela bilo proizvoljno.",
    keywords: ["ustavna žalba", "održaj", "idealni deo", "susvojina"],
    related_articles: ["čl. 28 ZOSPO", "čl. 32 Ustava"],
    headnote: "US: poništaj zbog pogrešnog stava da održajem nema susvojine na idealnom delu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 14084/2010",
    decision_date: "2010-01-01",
    legal_area: "civil",
    legal_question:
      "Da li je za vanredni održaj potrebna zakonitost državine ili samo savesnost posle 20 godina?",
    court_position:
      "Apelacioni sud potvrdio je presudu kojom je utvrđeno sticanje svojine vanrednim održajem, ističući da je nužna savesnost, a ne zakonitost, dok je zakonitost uslov samo za redovni održaj.",
    reasoning:
      "Čl. 28 st. 4 ZOSPO; nesavesna državina ne može steći svojinu ni vremenom; savesnost se pretpostavlja; nesmetani posed preko 20 godina dokazuje uverenje vlasnika.",
    keywords: ["vanredni održaj", "savesnost", "zakonitost državine", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Za vanredni održaj ključna savesnost; zakonitost samo za redovni održaj.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 847/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo susvojine na idealnoj polovini katastarske parcele može utvrditi vanrednim održajem posle dugog posedovanja?",
    court_position:
      "Apelacioni sud potvrdio je presudu kojom je utvrđena susvojina tužioca na polovini idealnog dela parcele stečena vanrednim održajem.",
    reasoning:
      "Čl. 28 st. 4 ZOSPO; održaj izjednačava pravno i faktično stanje; utvrđivanje na alikvotnom udelu dopušteno aktuelnom praksom; savesnost se pretpostavlja ako druga strana ne dokazuje suprotno.",
    keywords: ["susvojina", "idealni deo", "vanredni održaj", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Potvrđena susvojina na idealnoj polovini parcele stečena vanrednim održajem.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8376/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li Republika Srbija odgovara za štetu zbog neupisa prava svojine posle poklona ako je neupis posledica propusta stranaka?",
    court_position:
      "Vrhovni kasacioni sud odbio je reviziju tužioca i potvrdio da tužena država nije odgovorna za štetu; neupis je posledica ponašanja pravnih prethodnika, ne nezakonitog rada organa.",
    reasoning:
      "Presuda o vanknjižnom vlasništvu na pomoćnim prostorijama ne zamena upis u zemljišne knjige u smislu čl. 33 ZOSPO; prodaja savesnom kupcu dodatno isključuje osnov za naknadu.",
    keywords: ["odgovornost države", "upis", "poklon", "čl. 33 ZOSPO"],
    related_articles: ["čl. 33 ZOSPO"],
    headnote: "Nema odgovornosti države za štetu od neupisa ako su stranke propustile upis.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5605/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine na građevinskom zemljištu u javnoj svojini RS može steći vanrednim održajem posle 1996?",
    court_position:
      "Apelacioni sud potvrdio je utvrđenje prava svojine tužioca na parceli u javnoj svojini stečeno vanrednim održajem, s neprekidnom savesnom državinom od 1946. i ispunjenim rokom od 20 godina posle izmene zakona.",
    reasoning:
      "Održaj zahteva posed savesnog držaoca u uverenju da je vlasnik tokom zakonskog roka; nužna je savesnost državine.",
    keywords: ["održaj", "javna svojina", "građevinsko zemljište", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Svojina na gradskom građevinskom zemljištu u javnoj svojini vanrednim održajem.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2139/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se u rok za održaj uračunava državina pravnih prethodnika koji su stvar držali savesno i zakonito?",
    court_position:
      "Apelacioni sud potvrdio je utvrđivanje svojine vanrednim održajem posle kupovine na javnom nadmetanju i savesnog posedovanja dužeg od 20 godina.",
    reasoning:
      "Čl. 30 ZOSPO: rok počinje danom ulaska u državinu i završava poslednjim danom roka; u rok se uračunava vreme pravnih prethodnika kao savesnih ili zakonitih i savesnih držalaca.",
    keywords: ["održaj", "čl. 30 ZOSPO", "pravni prethodnik", "javno nadmetanje"],
    related_articles: ["čl. 28 ZOSPO", "čl. 30 ZOSPO"],
    headnote: "Rok održaja uračunava i posed prethodnika od kupovine na licitaciji.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9083/2014",
    decision_date: "2014-01-01",
    legal_area: "constitutional",
    legal_question:
      "Da li je proizvoljeno odbijanje zahteva za svojinu održajem ako podnosioci nisu bili savesni jer su znali za pomeranje međe?",
    court_position:
      "Ustavni sud odbio je ustavnu žalbu kao neosnovanu i prihvatio ocenu redovnih sudova da podnosioci nisu bili savesni držaoci.",
    reasoning:
      "Savesnost se procenjuje i prema vanprocesnom ponašanju; upozorenje sina tužene o pomeranju međe; održaj zahteva savesnost u smislu čl. 28 ZOSPO.",
    keywords: ["ustavna žalba", "savesnost", "održaj", "međa"],
    related_articles: ["čl. 28 ZOSPO", "čl. 58 Ustava"],
    headnote: "Odbijena ustavna žalba: nisu ispunjeni uslovi održaja zbog nesavesnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4191/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine na parceli i starijem objektu u državnoj svojini može steći održajem, a na novijem nelegalno izgrađenom objektu?",
    court_position:
      "Apelacioni sud potvrdio je deo presude o održaju na parceli i starijem objektu, a ukinuo deo koji se odnosi na noviji nelegalno izgrađeni objekat jer se svojina ne može steći bespravnom gradnjom.",
    reasoning:
      "Čl. 28 st. 4 ZOSPO za parcelu i stari objekat; održaj ne legalizuje novu bespravnu gradnju kao poseban predmet svojine.",
    keywords: ["održaj", "bespravna gradnja", "državna imovina"],
    related_articles: ["čl. 28 st. 4 ZOSPO"],
    headnote: "Održaj na parceli potvrđen; ukidanje dela presude za nelegalno izgrađeni objekat.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14517/2020",
    decision_date: "2020-01-01",
    legal_area: "administrative",
    legal_question:
      "Da li je prodaja imovine stečene restitucijom oslobođena poreza na kapitalni dobitak kao nasleđe ili posle deset godina vlasništva?",
    court_position:
      "Upravni sud odbio je tužbu protiv rešenja o porezu na kapitalni dobitak; restitucija nije sticanje po čl. 20 st. 1 ZOSPO i ne ulazi u poresko oslobođenje po čl. 72a Zakona o porezu na dohodak građana.",
    reasoning:
      "Vraćanje imovine po restituciji predstavlja rehabilitaciju ranijeg prava, ne novo sticanje; primena tačke 5 umesto tačke 1 čl. 72a.",
    keywords: ["porez na kapitalni dobitak", "restitucija", "nasleđe"],
    related_articles: ["čl. 72a Zakona o porezu na dohodak građana", "čl. 20 ZOSPO"],
    headnote: "Porez na kapitalni dobitak posle prodaje imovine vraćene restitucijom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 15065/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine može steći vanrednim održajem i bez pisanog ugovora o poklonu ako je posed savesan duže od 20 godina?",
    court_position:
      "Vrhovni sud odbio je reviziju tuženog i potvrdio da je tužilac stekao svojinu vanrednim održajem posle savesnog posedovanja dužeg od 20 godina.",
    reasoning:
      "Održaj je originarno sticanje na osnovu kvaliteta državine i roka; čl. 72 ZOSPO o zakonitoj i savesnoj državini; održaj ne zavisi od postojanja pisanog poklona.",
    keywords: ["održaj", "savesnost", "čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Potvrđen vanredni održaj i bez pisanog poklona ako su ispunjeni uslovi.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 616/2008",
    decision_date: "2008-01-01",
    legal_area: "constitutional",
    legal_question:
      "Da li je pravilno priznanje stanarskog prava tuženima na stanu u privatnoj svojini primenom domaćeg prava?",
    court_position:
      "Ustavni Sud usvojio je ustavnu žalbu, poništio presudu Vrhovnog suda i vratio predmet na ponovno odlučivanje zbog proizvoljne primene materijalnog prava.",
    reasoning:
      "Čl. 3, 8, 20 i 33 ZOSPO: svojina i sticanje upisom; primena prava mora biti dosledna vlasničkom režimu stana.",
    keywords: ["ustavna žalba", "stanarsko pravo", "privatna svojina", "upis"],
    related_articles: ["čl. 33 ZOSPO", "čl. 32 Ustava"],
    headnote: "US: poništaj VS zbog pogrešnog priznanja stanarskog prava na privatnom stanu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 6778/2025",
    decision_date: "2025-01-01",
    legal_area: "civil",
    legal_question:
      "Da li kupac stana koji nije upisan u zemljišnoj knjizi može steći svojinu vanrednim održajem?",
    court_position:
      "Vrhovni sud odbio je reviziju tužioca i potvrdio odbijanje zahteva jer državina nije bila savesna; kupac morao sa povećanom pažnjom proveriti knjižno stanje.",
    reasoning:
      "Čl. 33 ZOSPO: sticanje po pravnom poslu na nepokretnost upisom; neupis ukazuje na potrebu veće pažnje pri oceni savesnosti za održaj.",
    keywords: ["održaj", "savesnost", "neupis", "čl. 33 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 33 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Odbijen održaj na stanu zbog nesavesnosti kupca s obzirom na neupis u knjizi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2967/2014",
    decision_date: "2014-01-01",
    legal_area: "constitutional",
    legal_question:
      "Da li postavljanje strehe i oluka preko dela parcele koje koriste podnosioci pada u režim susedskih prava po čl. 5 ZOSPO i SGZ?",
    court_position:
      "Ustavni Sud usvojio je ustavnu žalbu zbog prekoračenja razumnog roka postupka i povrede pravičnog suđenja zbog pogrešne primene materijalnog prava od strane Apelacionog suda.",
    reasoning:
      "Pitanje ovlašćenja tužene moralo se posmatrati kroz susedska prava; čl. 5 ZOSPO i paragraf 336 SGZ o nadvišenju preko susednog zemljišta.",
    keywords: ["ustavna žalba", "susedsko pravo", "streha", "razuman rok"],
    related_articles: ["čl. 5 ZOSPO", "paragraf 336 SGZ", "čl. 32 Ustava"],
    headnote: "US: susedska prava i postupovna povreda u sporu o strehi i oluku.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5674/2023",
    decision_date: "2023-01-01",
    legal_area: "inheritance",
    legal_question:
      "Da li vanbračnoj ćerki pripada nasledni udeo posle izdvajanja bračne tekovine i pravnosnažnog ostavinskog rešenja?",
    court_position:
      "Apelacioni sud preinačio je presudu i utvrdio da tužilji kao vanbračnoj ćerki pripada udeo od 1/8, posle izdvajanja polovine bračnoj drugoj i podeljene druge polovine na četiri zakonska naslednika.",
    reasoning:
      "Jednom data naslednička izjava je neopoziva; pravo na izdvajanje bračne tekovine u ostavi trebalo ostvariti u ostavinskom postupku; ne može se istovremeno biti isključivi vlasnik i suvlasnik iste stvari u istom smislu.",
    keywords: ["nasleđivanje", "vanbračno dete", "bračna tekovina", "ostavinsko rešenje"],
    related_articles: ["čl. 220 Zakona o nasleđivanju"],
    headnote: "Utvrđen nasledni udeo 1/8 vanbračnoj ćerki posle izdvajanja bračne tekovine.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1112/2025",
    decision_date: "2025-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine održajem može steći na poljoprivrednom zemljištu koje ima status zaštićenog prirodnog dobra u javnoj svojini?",
    court_position:
      "Sud je odbio zahtev za utvrđenje svojine održajem jer je državina nesavesna u odnosu na zabranu i jer čl. 16–17 Zakona o javnoj svojini isključuju održaj na tim dobrima.",
    reasoning:
      "Čl. 28 ZOSPO zahteva savesnost; čl. 17 Zakona o javnoj svojini: na zaštićenim prirodnim dobrom u javnoj svojini ne može se steći svojina održajem.",
    keywords: ["održaj", "zaštićeno prirodno dobro", "javna svojina", "Zakon o javnoj svojini"],
    related_articles: ["čl. 16–17 Zakona o javnoj svojini", "čl. 28 ZOSPO"],
    headnote: "Nema održaja na zaštićenom prirodnom dobru u javnoj svojini.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1344/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li parnični sud u presudi o održaju može naložiti raspravljanje zaostavštine i upis kao isprava za katastar?",
    court_position:
      "Apelacioni sud potvrdio je utvrđenje svojine vanrednim održajem, ali ukinuo deo presude koji je služio kao isprava za upis i nalagao raspravljanje zaostavštine jer to nije nadležnost parničnog suda.",
    reasoning:
      "Čl. 28 i 72 ZOSPO za održaj; vođenje ostavinskog postupka i upis prava u katastar padaju u drugu nadležnost.",
    keywords: ["održaj", "nadležnost suda", "ostavina", "katastar"],
    related_articles: ["čl. 28 ZOSPO"],
    headnote: "Potvrđen održaj; ukinut deo izreke koji prelazi granice parničnog postupka.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 682/2008",
    decision_date: "2008-01-01",
    legal_area: "constitutional",
    legal_question:
      "Da li isplatom štete iz kasko osiguranja u Hrvatskoj osiguravač stiče pravo svojine na ukradenom vozilu po merodavnom hrvatskom pravu?",
    court_position:
      "Ustavni Sud usvojio je žalbu hrvatskog osiguravača, poništio presudu Vrhovnog suda i vratio predmet jer je pogrešno primenjeno domaće umesto merodavnog stranog prava.",
    reasoning:
      "Vozilo se predaje vlasniku; isplata osiguranja po ZOO čl. 939 st. 1 ne prenosi svojinu na osiguravača već obligaciona prava prema dužniku za štetu.",
    keywords: ["ustavna žalba", "kasko", "merodavno pravo", "svojina vozila"],
    related_articles: ["čl. 939 st. 1 ZOO"],
    headnote: "US: merodavno hrvatsko pravo za sticanje svojine posle isplate kasko štete.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4858/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li tužioci mogu steći pravo korišćenja na parceli održajem sa kontinuitetom državine od kupoprodaje 1961. godine?",
    court_position:
      "Apelacioni sud potvrdio je utvrđenje prava korišćenja održajem, uz pravni kontinuitet savesne i zakonite državine pravnih prethodnika od 1961.",
    reasoning:
      "Čl. 28 st. 2 i čl. 72 ZOSPO; poklon majke ne prekida kontinuitet posedovanja cele parcele u odnosu na ostale dokaze.",
    keywords: ["pravo korišćenja", "održaj", "kontinuitet", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Potvrđeno pravo korišćenja održajem sa kontinuitetom od kupoprodaje 1961.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2361/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li dugoročni zakup diplomatske nekretnine iz 1979. sa obećanjem prenosa svojine može biti osnov utvrđenja svojine strane države bez saglasnosti za promet strancima?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje zahteva SAD za utvrđenje svojine jer ugovor nije mogao steći dejstvo bez saglasnosti nadležnog organa za promet strancima.",
    reasoning:
      "Sticanje svojine na osnovu takvog ugovora bilo je uslovljeno dozvolom jugoslovenskog prava; bez saglasnosti nema valjanog osnova za prenos svojine.",
    keywords: ["strano lice", "zakup", "diplomatska imovina", "saglasnost organa"],
    related_articles: ["ZOSPO", "Zakon o prometu nepokretnosti"],
    headnote: "Odbijena svojina SAD na osnovu zakupa bez saglasnosti za promet strancima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3660/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine na vojnom stanu može utvrditi bez zaključenog pisanog ugovora o otkupu u propisanoj formi?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje tužbe jer nije postojao valjan pravni osnov za otkup — ugovor o otkupu nije zaključen u pisanoj formi i priznanica ne zamena ugovor.",
    reasoning:
      "Čl. 72 ZOO o pisanoj formi; slobodna volja ne može biti konkludentna kada zakon zahteva pisanu formu za otkup stana.",
    keywords: ["otkup stana", "pisana forma", "JNA", "vojni stan"],
    related_articles: ["čl. 72 ZOO", "Zakon o stanovanju"],
    headnote: "Nema svojine na vojnom stanu bez valjanog pisanog ugovora o otkupu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13027/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li je presuda o utvrđenju svojine održajem bez dejstva za stečajnog dužnika prepreka izlučnom poveriocu da tužbom traži svojinu?",
    court_position:
      "Vrhovni kasacioni sud ukinuo je presudu Apelacionog suda i vratio predmet zbog pogrešne primene materijalnog prava i nepotpunog utvrđivanja činjenica o osnovu sticanja.",
    reasoning:
      "Izlučni poverilac može ostvariti prava u posebnom postupku po čl. 112 st. 6 Zakona o stečaju; deklarativna presuda o održaju ne gubi značaj zbog stečaja ako je pravo nastalo pre stečaja.",
    keywords: ["stečaj", "izlučni poverilac", "održaj", "čl. 112 Zakona o stečaju"],
    related_articles: ["čl. 112 st. 6 Zakona o stečaju", "čl. 28 ZOSPO"],
    headnote: "VKS ukida: stečaj i prethodna presuda o održaju moraju se pravilno oceniti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3306/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li sam čin da je u katastru kao vlasnik upisano drugo lice dokazuje nesavesnost držaoca koji traži održaj?",
    court_position:
      "Apelacioni sud potvrdio je utvrđenje svojine vanrednim održajem, naglašavajući da nesavesnost ne proizlazi automatski iz upisa trećeg lica — upisani vlasnik mora dokazati nesavesnost.",
    reasoning:
      "Za redovni održaj potrebni savesnost i zakonitost; za vanredni savesnost 20 godina; smisao održaja kao originarnog sticanja na tuđoj stvari nezavisnog od volje ranijeg vlasnika.",
    keywords: ["održaj", "pretpostavka savesnosti", "katastar", "čl. 28 ZOSPO"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Upis drugog vlasnika u katastru sam po sebi ne dokazuje nesavesnost za održaj.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3855/2010",
    decision_date: "2010-01-01",
    legal_area: "constitutional",
    legal_question:
      "Da li je trajanje parničnog postupka preko deset godina povreda prava na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud usvojio je ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku u sporu o poslovnom prostoru koji je trajao više od deset godina.",
    reasoning:
      "Čl. 32 st. 1 Ustava; sud je dužan oceniti valjan pravni osnov sticanja na celoj zgradi uključujući sporni prostor.",
    keywords: ["ustavna žalba", "razuman rok", "čl. 32 Ustava", "parnica"],
    related_articles: ["čl. 32 st. 1 Ustava"],
    headnote: "US: povreda razumnog roka u parnici dužoj od deset godina.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4888/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se susvojina na delu katastarske parcele može steći vanrednim održajem posle preko 20 godina savesnog posedovanja?",
    court_position:
      "Apelacioni sud odbio je žalbu Grada Beograda i potvrdio prvostepenu presudu kojom je utvrđena susvojina tužioca održajem na delu parcele.",
    reasoning:
      "Čl. 30 st. 2 ZOSPO o uračunavanju prethodnika; čl. 72 ZOSPO o zakonitoj i savesnoj državini i pretpostavci savesnosti; kumulativni uslovi za redovni odnosno savesnost za vanredni održaj.",
    keywords: ["susvojina", "održaj", "čl. 30 ZOSPO", "čl. 72 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 30 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Potvrđena susvojina na delu parcele stečena vanrednim održajem.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4945/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li tužilac može tražiti utvrđenje svojine na delu parcele koji je već upisan kao njegov?",
    court_position:
      "Apelacioni sud delimično potvrdio je presudu: utvrđena je svojina održajem na polovini parcele kao celina, a odbijen je zahtev za već upisani deo zbog nedostatka pravnog interesa.",
    reasoning:
      "Savesnost kao lični odnos i uverenje; kontradiktornost ranjeg postupanja tužioca u drugom sporu ne menja osnovanost održaja na polovini; pravni interes ne postoji za ponovno utvrđivanje već upisanog prava.",
    keywords: ["održaj", "pravni interes", "idealna polovina", "čl. 390 ZPP"],
    related_articles: ["čl. 28 ZOSPO", "čl. 390 ZPP"],
    headnote: "Delimično: održaj na 1/2 parcele potvrđen; odbijeno utvrđenje već upisanog dela.",
    outcome: "partially",
  },

  // ── BATCH 3 (3/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7818/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li pripada naknada za faktičku eksproprijaciju i za deo parcele koji je samo planski predviđen za ulicu, a nije stvarno priveden toj nameni?",
    court_position:
      "Vrhovni Sud delimično je usvojio reviziju i smanjio naknadu: dosuđuje se naknada samo za deo koji je stvarno priveden javnoj nameni (ulica), a ne i za deo koji se i dalje koristi kao dvorište i nije priveden planskoj nameni.",
    reasoning:
      "Čl. 58 Ustava i čl. 1 Protokola 1 uz EKČ; ograničenje mirnog uživanja svojine mora pratiti stvarno oduzimanje ili onemogućavanje korišćenja, ne hipotetički plan za celu parcelu.",
    keywords: ["faktička eksproprijacija", "naknada", "planska namena", "javna svojina"],
    related_articles: ["čl. 58 Ustava", "Protokol 1 uz EKČ"],
    headnote: "Naknada za faktičku eksproprijaciju samo za deo stvarno priveden javnoj nameni.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2879/2021",
    decision_date: "2021-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo svojine na gradskom građevinskom zemljištu u javnoj svojini može steći održajem ako je predmet kupoprodaje bio samo objekat, a ne i zemljište ispod njega?",
    court_position:
      "Vrhovni kasacioni sud odbio je reviziju tužioca i potvrdio da tužbeni zahtev za svojinu na zemljištu pod zgradom nije osnovan jer zemljište nije moglo biti predmet kupoprodaje iz društvene svojine, niti je rok za održaj ispunjen.",
    reasoning:
      "Predmet ugovora bio je objekat, ne građevinsko zemljište; održaj na tom zemljištu u javnoj svojini nije mogao steći dejstvo u konkretnim okolnostima.",
    keywords: ["održaj", "građevinsko zemljište", "javna svojina", "društvena svojina"],
    related_articles: ["čl. 28 ZOSPO", "čl. 414 ZPP"],
    headnote: "Nema svojine održajem na gradskom zemljištu u javnoj svojini ispod kupljenog objekta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1304/2025",
    decision_date: "2025-01-01",
    legal_area: "civil",
    legal_question:
      "Da li je kupac savesan za održaj ako je u ugovoru bilo navedeno da se nepokretnosti vode na treća lica?",
    court_position:
      "Vrhovni Sud odbio je reviziju tužilaca jer državina nije savesna: pravni prethodnik je znao da prodavac nije upisan kao vlasnik, što isključuje sticanje svojine održajem.",
    reasoning:
      "Čl. 28 i 72 ZOSPO; za vanredni održaj potrebna savesnost tokom celog roka; poziv na treća lica u ugovoru o kupoprodaji ukazuje na nedostatak punovažnog osnova i savesnosti.",
    keywords: ["održaj", "savesnost", "kupoprodaja", "čl. 72 ZOSPO"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Nesavesnost ako je kupac znao da prodavac nije knjižni vlasnik.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2277/2025",
    decision_date: "2025-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se pravo korišćenja na poljoprivrednom zemljištu u državnoj svojini može utvrditi održajem ako osnovni zahtev za svojinu nije osporen žalom?",
    court_position:
      "Apelacioni sud potvrdio je utvrđenje prava korišćenja u korist tužioca na osnovu održaja posle preko 20 godina savesne državine, u okviru žalbe koja se odnosi samo na drugostepenu odluku o korišćenju.",
    reasoning:
      "Čl. 28 i 72 ZOSPO; arondacija i zamena sa poljoprivrednim preduzećem; pravo korišćenja je svojinsko ovlašćenje koje prati ispunjenje uslova za održaj.",
    keywords: ["pravo korišćenja", "održaj", "poljoprivredno zemljište", "dispozitiv žalbe"],
    related_articles: ["čl. 28 ZOSPO", "čl. 390 ZPP"],
    headnote: "Potvrđeno pravo korišćenja održajem kada je žalba ograničena na taj stav izreke.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 911/2021",
    decision_date: "2021-01-01",
    legal_area: "family",
    legal_question:
      "Da li propust izdvajanja bračne imovine u ostavinskom postupku sprečava tužbu za utvrđivanje susvojine na imovini stečenoj u braku?",
    court_position:
      "Apelacioni sud potvrdio je presudu kojom je utvrđena susvojina tužilje na polovini idealnog dela nepokretnosti stečenih u braku.",
    reasoning:
      "Imovina stečena tokom braka; ostavinski postupak i naknadni nasledni odnosi ne isključuju parnično utvrđivanje bračne tekovine kada to nije konačno izdvojeno u ostavi.",
    keywords: ["bračna tekovina", "susvojina", "ostavina", "nasleđivanje"],
    related_articles: ["Porodični zakon", "Zakon o nasleđivanju"],
    headnote: "Susvojina na bračnoj tekovini može se tražiti u parnici uprkos propustima u ostavi.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5293/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li izgradnja susednog objekta sa građevinskom dozvolom isključuje naknadu zbog umanjenja vrednosti stanova zbog smanjenja osvetljenja?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje prema jednom tuženom, a ukinuo presudu prema drugom i vratio predmet radi utvrđivanja umanjenja tržišne vrednosti stanova i visine naknade, uz mogućnost stručnog merenja dotoka svetlosti.",
    reasoning:
      "Prekoračenje uobičajene mere susedskog prava i znatnija šteta povlače naknadu čak i pri dozvoli; veštak nije mogao završiti zadatak bez dodatnih merenja Instituta.",
    keywords: ["naknada štete", "susedsko pravo", "osvetljenje", "indeks zauzetosti"],
    related_articles: ["čl. 6 ZOSPO"],
    headnote: "Delimično: umanjenje vrednosti stanova zahteva dodatno dokazivanje merenjima.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 414/2021",
    decision_date: "2021-01-01",
    legal_area: "civil",
    legal_question:
      "Da li nosilac stanarskog prava može steći svojinu održajem ili ulaganjem u adaptaciju na istoj nepokretnosti?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje tužbe za utvrđenje svojine jer tužilja nije bila savesna držalac za održaj i nije dokazala osnov kupoprodaje za eventualni zahtev.",
    reasoning:
      "Čl. 8 ZPP i pravilna ocena dokaza; održaj i stvaranje nove stvari/spajanje nisu dokazani u korist tužilje.",
    keywords: ["stanarsko pravo", "održaj", "savesnost", "suvlasništvo"],
    related_articles: ["čl. 28 ZOSPO", "čl. 8 ZPP"],
    headnote: "Odbijena svojina nosiocu stanarskog prava — nema savesnog održaja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 6100/2020",
    decision_date: "2020-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se posle sporazumne deobe bračne imovine overene pred sudom može tražiti dodatna podela istih stvari ako nisu bile navedene u ugovoru?",
    court_position:
      "Vrhovni kasacioni sud odbio je reviziju tužilje jer je sveobuhvatnim ugovorom o sporazumnoj deobi stranke već raspodelile nepokretnosti i pokretnine, a tužilja nije dokazala da prihod od useva nije obuhvaćen tim ugovorom.",
    reasoning:
      "Ugovor o sporazumnoj deobi iz 2011. pokriva navedene stvari; preostale pokretnine podelejene klauzulom o zadržavanju onoga što poseduju na dodeljenim nekretninama.",
    keywords: ["sporazumna deoba", "bračna imovina", "ugovor stranaka"],
    related_articles: ["Porodični zakon", "ZOO"],
    headnote: "Odbijena revizija u sporu o deobi posle valjanog sporazuma stranaka.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9575/2014",
    decision_date: "2014-01-01",
    legal_area: "administrative",
    legal_question:
      "Da li je pravilno dozvoljeno ponavljanje postupka legalizacije bez ispitivanja formalnih uslova iz Zakona o opštem upravnom postupku?",
    court_position:
      "Upravni Sud uvažio je tužbu i poništio rešenje kojim je dozvoljeno ponavljanje postupka legalizacije jer prvostepeni organ nije ispitao propisane formalne uslove.",
    reasoning:
      "Ponavljanje postupka mora biti zakonito po Zakonu o opštem upravnom postupku; razlozi ponavljanja u konkretnom slučaju nisu bili ispravno pravno kvalifikovani.",
    keywords: ["legalizacija", "ponavljanje postupka", "OUP", "upravni postupak"],
    related_articles: ["Zakon o opštem upravnom postupku"],
    headnote: "Poništaj rešenja o ponavljanju legalizacije zbog propusta u postupku.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3560/2024",
    decision_date: "2024-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se nesavesnost za održaj može izvesti samo iz toga što je u javnim knjigama upisano drugo lice kao vlasnik?",
    court_position:
      "Apelacioni sud potvrdio je utvrđenje svojine na delu susedne parcele vanrednim održajem posle savesnog posedovanja dužeg od 20 godina.",
    reasoning:
      "Isti stav kao u srodnim predmetima: pretpostavka savesnosti; teret dokaza o nesavesnosti na upisanom vlasniku; čl. 28 st. 4 i čl. 72 ZOSPO.",
    keywords: ["održaj", "susedna parcela", "pretpostavka savesnosti"],
    related_articles: ["čl. 28 st. 4 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Potvrđen održaj na delu parcele — upis drugog vlasnika ne dokazuje nesavesnost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 311/2014",
    decision_date: "2014-01-01",
    legal_area: "criminal",
    legal_question:
      "Da li je pokušaj zloupotrebe položaja odgovornog lica nepodoban ako branilac tvrdi da je ugovor o stanu ništav?",
    court_position:
      "Vrhovni kasacioni sud odbio je zahtev za zaštitu zakonitosti jer iz pravnosnažne presude proizilazi da su radnje bile podobne za ostvarenje posledice krivičnog dela, a odbrambene tvrdnje o ništavosti ugovora nisu deo utvrđenog činjeničnog stanja u izreci.",
    reasoning:
      "Zaštita zakonitosti ocenjuje primenu zakona na utvrđeno stanje iz izreke, ne na odvojene odbrambene hipoteze koje nisu prihvaćene presudom.",
    keywords: ["zaštita zakonitosti", "zloupotreba položaja", "pokušaj", "krivično pravo"],
    related_articles: ["Zakon o krivičnom postupku"],
    headnote: "Odbijen zahtev za zaštitu zakonitosti — odbrambene tvrdnje van okvira izreke.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 3522/2019",
    decision_date: "2019-01-01",
    legal_area: "commercial",
    legal_question:
      "Da li se pravo svojine na parceli može utvrditi kombinacijom sporazuma o vraćanju zemljišta iz 1991. i redovnim održajem, i da li su ništave hipoteke upisane posle sticanja?",
    court_position:
      "Privredni apelacioni sud potvrdio je sticanje svojine sporazumom o vraćanju i održajem uz preko 20 godina zakonite i savesne državine, kao i ništavost hipoteka zasnovanih kada davalač založne izjave više nije bio vlasnik.",
    reasoning:
      "Čl. 14 starog Zakona o hipoteci; vlasništvo tužilaca originarno pre upisa hipoteka; raspolaganje suprotno prinudnim propisima ništavo.",
    keywords: ["restitucija zemljišta", "održaj", "hipoteka", "ništavost"],
    related_articles: ["čl. 28 st. 2 ZOSPO", "Zakon o hipoteci"],
    headnote: "Svojina na parceli — sporazum o vraćanju plus održaj; brisanje ništavih hipoteka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2482/2019",
    decision_date: "2019-01-01",
    legal_area: "administrative",
    legal_question:
      "Da li je pouzdano dokazano da bivši vlasnik nije bio vlasnik u trenutku oduzimanja imovine radi odbijanja zahteva za restituciju?",
    court_position:
      "Upravni Sud usvojio je tužbu naslednika i poništio rešenje Ministarstva finansija kojim je odbijen zahtev za vraćanje konfiskovane zgrade jer nije pouzdano utvrđeno vlasništvo u momentu oduzimanja.",
    reasoning:
      "Kompleksan lanac upisa u zemljišnim knjigama i presuda iz 1940-ih zahtevaju pažljivo utvrđivanje; organ ne može odbiti zahtev na nedovoljno utvrđenim činjenicama.",
    keywords: ["restitucija", "konfiskacija", "vlasništvo", "dokazivanje"],
    related_articles: ["Zakon o vraćanju oduzete imovine i obeštećenju"],
    headnote: "Poništaj odbijanja restitucije zbog nedovoljnog utvrđivanja vlasništva u momentu oduzimanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2717/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se može utvrditi susvojina održajem ako je ugovor o poklonu valjan i nema simulacije razmene stanova?",
    court_position:
      "Apelacioni sud preinačio je presudu, odbio zahtev za susvojinu i usvojio protivtužbu za iseljenje jer nisu ispunjeni uslovi za održaj zbog nedostatka savesnosti.",
    reasoning:
      "Sud nije prihvatio tezu o simuliranoj razmeni; složeni lanac raspolaganja stanovima i novčani tokovi ukazuju na to da tužioci nisu bili savesni držaoci.",
    keywords: ["simulacija", "poklon", "održaj", "iseljenje"],
    related_articles: ["čl. 28 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Odbijena susvojina održajem; usvojena protivtužba za iseljenje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5077/2019",
    decision_date: "2019-01-01",
    legal_area: "civil",
    legal_question:
      "Da li mirisi sa farme brojlera predstavljaju zloupotrebu prava svojine i štetu susedima ako su ispunjeni veterinarsko-sanitarni uslovi?",
    court_position:
      "Vrhovni kasacioni sud odbio je reviziju tužilaca i potvrdio da nisu dokazali prekoračenje uobičajene mere ili štetu koja bi opravdala tužbu, uz pozitivne rezultate merenja kvaliteta vazduha.",
    reasoning:
      "Teret dokaza na tužiocima; uobičajena imisija u granicama dozvoljenog korišćenja ekonomskog objekta; lokalni propisi i rešenja opštinskih organa relevantna pored ministarskog mišljenja.",
    keywords: ["imisije", "farma", "susedstvo", "dokazivanje"],
    related_articles: ["čl. 5–6 ZOSPO"],
    headnote: "Odbijena tužba za imisije sa farme pileća — nema dokaza o prekoračenju mere.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1870/2025",
    decision_date: "2025-01-01",
    legal_area: "inheritance",
    legal_question:
      "Da li je testamentom ostavljeno pravo plodouživanja na kući u suprotstavu sa nužnim delom supruge ostavioca?",
    court_position:
      "Sud je odbio zahtev za utvrđenje povrede nužnog dela jer je novčana vrednost ostavljenog prava plodouživanja veća od vrednosti zakonskog nužnog dela od jedne četvrtine zaostavštine.",
    reasoning:
      "Poređenje vrednosti prava iz testamenta sa zakonskim nužnim delom; nema povrede ako je testamentom ostvareno više od nužnog dela u novčanom izrazu.",
    keywords: ["nužni deo", "plodouživanje", "testament", "zaostavština"],
    related_articles: ["Zakon o nasleđivanju"],
    headnote: "Nema povrede nužnog dela ako plodouživanje po vrednosti premašuje nužni deo.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 283/2013",
    decision_date: "2013-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se može tražiti predaja u posed tavanskog prostora koji je pretvoren u stan u vanknjižnom vlasništvu drugog vlasnika?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje zahteva jer tavanski prostor kao takav više ne postoji, a tužena je stekla svojinu na stanu originarnim putem uz saglasnosti vlasnika delova zgrade i legalizaciju.",
    reasoning:
      "Saglasnost za promenu namene tavanskog prostora može biti i naknadna; kupovina jednog stana ne daje pravo na posed drugog stana u istoj zgradi nastalog rekonstrukcijom.",
    keywords: ["tavan", "predaja u posed", "legalizacija", "saglasnost suvlasnika"],
    related_articles: ["ZOSPO", "Zakon o planiranju i izgradnji"],
    headnote: "Odbijena predaja u posed — tavan pretvoren u tuđi stan sa valjanom osnovom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4628/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li je za redovni održaj bitan uvid tužioca u katastar ako tužena nije dokazala nesavesnost?",
    court_position:
      "Apelacioni sud potvrdio je utvrđenje svojine redovnim održajem posle preko 10 godina zakonite i savesne državine, i to uprkos upisu države kao vlasnika.",
    reasoning:
      "Javnost katastra je objektivna okolnost; savesnost je lični odnos prema stvari; mogućnost saznanja vezuje se za ponašanje tužene i njeno vršenje vlasti u periodu održaja.",
    keywords: ["redovni održaj", "savesnost", "zakonitost", "čl. 28 st. 2 ZOSPO"],
    related_articles: ["čl. 28 st. 2 ZOSPO", "čl. 72 ZOSPO"],
    headnote: "Redovni održaj na poljoprivrednoj parceli — nesavesnost se ne izvodi samo iz katastarskog upisa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 1667/2010",
    decision_date: "2010-01-01",
    legal_area: "administrative",
    legal_question:
      "Da li je pravilno poništeno rešenje o deeksproprijaciji ako organ nije izveo predložene dokaze o privođenju zemljišta nameni?",
    court_position:
      "Upravni Sud uvažio je tužbu Javnog preduzeća i poništio rešenje o deeksproprijaciji zbog povrede pravila postupka i nepotpunog utvrđivanja činjenica.",
    reasoning:
      "Tužilac je predložio dokaze o tome da li je zemljište privedeno nameni; organ dužan da ih ispita pre odluke koja značajno dira u imovinska prava.",
    keywords: ["deeksproprijacija", "eksproprijacija", "dokazi", "postupak"],
    related_articles: ["Zakon o eksproprijaciji", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj rešenja o deeksproprijaciji zbog propusta u utvrđivanju činjenica.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2725/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se bračnoj drugoj može dosuditi naknada za ulaganje u posebnu imovinu supružnika i susvojina na pokretninama stečenim u braku?",
    court_position:
      "Apelacioni sud odbio je žalbu tuženog i potvrdio presudu kojom su delimično usvojeni zahtevi za podelu bračne tekovine, naknadu za ulaganje u kuću i susvojinu na određenim pokretnostima.",
    reasoning:
      "Delimično odbijanje za veće udele i isključivo vlasništvo gde nisu ispunjeni uslovi; posebna imovina po poklonu i udeli na pokretnostima prema doprinosu.",
    keywords: ["bračna tekovina", "naknada za ulaganje", "susvojina", "podela"],
    related_articles: ["Porodični zakon"],
    headnote: "Potvrđena podela bračne tekovine sa naknadom za ulaganje u posebnu imovinu.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1196/2022",
    decision_date: "2022-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se prvenstvo prava preče kupovine poljoprivrednog zemljišta određuje prema faktičkom posedu ili prema vlasništvu u katastru?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje tužbe jer je prodavac pravilno prodao susedu čije se zemljište pretežnim delom graniči sa parcelom, u smislu čl. 6 Zakona o prometu nepokretnosti, bez obzira na posed državnog susednog zemljišta od strane tužioca.",
    reasoning:
      "Čl. 62–63 Zakona o državnom premeru i katastru: podaci katastra javni i pouzdani; relevantno je vlasništvo, ne sam faktički posed.",
    keywords: ["pravo preče kupovine", "Zakon o prometu nepokretnosti", "katastar"],
    related_articles: ["čl. 6 Zakona o prometu nepokretnosti", "čl. 62–63 Zakona o državnom premeru i katastru"],
    headnote: "Prvenstvo preče kupovine prema knjižnom vlasništvu suseda, ne prema posedu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1551/2025",
    decision_date: "2025-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se može tražiti brisanje upisa prava svojine kupaca stana ako je kupovina iz 1983. valjana i je li zahtev zastareo?",
    court_position:
      "Apelacioni sud potvrdio je odbijanje tužbe za brisanje upisa jer su tuženi savesno stekli svojinu valjanim ugovorom i jer je zahtev zastareo.",
    reasoning:
      "Lanac raspolaganja i prekid ranijeg spora o pravu preče; zastara prigovora protiv upisa dugoročno konzistentnog sa posedovanjem.",
    keywords: ["brisanje upisa", "zastara", "kupoprodaja stana", "pravo preče"],
    related_articles: ["Zakon o obligacionim odnosima", "ZOSPO"],
    headnote: "Odbijen zahtev za brisanje upisa svojine — valjan ugovor i zastara.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5516/2023",
    decision_date: "2023-01-01",
    legal_area: "civil",
    legal_question:
      "Da li se obim prava korišćenja na parceli može utvrditi odvojeno od prava svojine na dograđenom delu zgrade bez poštovanja jedinstva nepokretnosti?",
    court_position:
      "Apelacioni sud ukinuo je deo presude o suvlasničkim udelima na zemljištu i naložio ponovno utvrđivanje obima prava korišćenja koje prati svojinu na dograđenim delovima, u skladu sa načelom jedinstva nepokretnosti.",
    reasoning:
      "Zaveštaj i upotrebna dozvola vezuju prava na stan i dogradnju; parcela i objekat moraju se pravno sagledati kao celina.",
    keywords: ["pravo korišćenja", "dogradnja", "jedinstvo nepokretnosti", "zaveštaj"],
    related_articles: ["ZOSPO", "Zakon o planiranju i izgradnji"],
    headnote: "Ukidanje dela presude — ponovo utvrditi korišćenje uz svojinu na dogradnji.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 17972/2022",
    decision_date: "2022-01-01",
    legal_area: "administrative",
    legal_question:
      "Da li je dispozitiv rešenja o eksproprijaciji zakonit ako se „ekspropriše“ parcela koja je već u državnoj svojini?",
    court_position:
      "Upravni Sud usvojio je tužbu i poništio rešenje o eksproprijaciji jer je dispozitiv kontradiktoran — za već državnu parcelu trebalo je postupiti po pravilima administrativnog prenosa prava korišćenja, a ne eksproprijacije.",
    reasoning:
      "Eksproprijacija pretpostavlja oduzimanje od privatnog vlasnika uz naknadu; mešanje sa već utvrđenim javnim statusom čini akt nezakonitim.",
    keywords: ["eksproprijacija", "državna svojina", "dispozitiv", "kontradiktornost"],
    related_articles: ["Zakon o eksproprijaciji"],
    headnote: "Poništaj rešenja o eksproprijaciji zbog kontradiktornosti u odnosu na državnu parcelu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9033/2015",
    decision_date: "2015-01-01",
    legal_area: "administrative",
    legal_question:
      "Da li udruženje bez statusa zadužbine može tražiti restituciju i da li je JKP ovlasćeno da ospori vraćanje imovine naslednicima bivšeg vlasnika?",
    court_position:
      "Upravni Sud odbio je tužbu udruženja jer samo zadužbine i njihovi pravni sledbenici imaju legitimaciju za restituciju po Zakonu o vraćanju oduzete imovine; u istom predmetnom kontekstu potvrđeno je rešenje o vraćanju naslednicima jer su ispunjeni uslovi za naturalnu restituciju.",
    reasoning:
      "Čl. 2 i krug nosilaca prava iz Zakona o vraćanju oduzete imovine i obeštećenju; za JKP tužba neosnovana jer organ ispravno primenio materijalno pravo o vraćanju u susvojinu.",
    keywords: ["restitucija", "zadužbina", "JKP", "naslednici"],
    related_articles: ["Zakon o vraćanju oduzete imovine i obeštećenju"],
    headnote: "Restitucija: status zadužbine za pravna lica; potvrda vraćanja naslednicima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 869/2020",
    decision_date: "2020-01-01",
    legal_area: "civil",
    legal_question:
      "Da li je ugovor o prenosu prava korišćenja na gradskom građevinskom zemljištu punovažan ako je prenos odobren rešenjem opštine po tada važećem zakonu?",
    court_position:
      "Vrhovni kasacioni sud preinačio je presudu i utvrdio punovažnost ugovora o prenosu prava korišćenja na gradskom građevinskom zemljištu, jer je pravo korišćenja bilo u prometu na osnovu opštinskog rešenja.",
    reasoning:
      "I pored sporednog stava o nedopuštenosti revizije po vrednosti spora, meritorno je utvrđeno da je prenos imao zakonit administrativni osnov u istorijskom kontekstu upisa od 1946. do državne svojine RS.",
    keywords: ["pravo korišćenja", "gradsko zemljište", "punovažnost ugovora", "opštinsko rešenje"],
    related_articles: ["ZOSPO", "ZPP čl. 403 st. 3"],
    headnote: "Punovažan ugovor o prenosu prava korišćenja na gradskom građevinskom zemljištu.",
    outcome: "plaintiff_won",
  },
]
