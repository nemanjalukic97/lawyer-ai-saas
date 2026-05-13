// scripts/case-law-civil-serbia-4.ts
// Serbian case law: zakup stana, iseljenje, stanarsko pravo, naknade — all 3 batches.

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CIVIL_SERBIA_4: CaseLawInput[] = [
  // ── BATCH 1 (1/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1047/2023",
    legal_area: "civil",
    legal_question:
      "Da li zakupac duguje zakupninu i komunalne troškove sve dok ne isprazni stan i preda ga zakupodavcu, uprkos otkazu i upozorenjima?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tuženi obavezan na isplatu duga za zakupninu i komunalije; obaveza plaćanja zakupnine traje dok zakupac ne isprazni stan od lica i stvari i ne preda ga zakupodavcu.",
    reasoning:
      "Posle otkaza i opomena tuženi je ostao u stanu; SMS i opomene pred utuženje utvrđuju dug. Zakupni odnos i obaveza plaćanja traju do fizičke predaje stana.",
    keywords: ["zakup stana", "zakupnina", "komunalije", "iseljenje", "otkaz"],
    related_articles: ["čl. 262 ZOO", "čl. 567 ZOO", "Zakon o stanovanju"],
    headnote: "Potvrđen dug za zakupninu i komunalije do predaje praznog stana.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1065/2023",
    legal_area: "civil",
    legal_question:
      "Da li zakupac koji posle raskida ugovora ostaje u stanu duguje zakupninu i troškove tekućeg održavanja kao držalac bez osnova?",
    court_position:
      "Apelacioni sud je potvrdio obavezu plaćanja zakupnine i komunalnih troškova za period korišćenja do prinudnog ispražnjenja stana.",
    reasoning:
      "Posle raskida tuženi nije plaćao zakupninu od avgusta do decembra 2019. ni troškove održavanja; ostajanje u stanu bez novog pravnog osnova stvara obavezu naknade po pravilima zakupa i čl. 262 ZOO.",
    keywords: ["raskid zakupa", "državina bez osnova", "zakupnina"],
    related_articles: ["čl. 262 ZOO", "čl. 567 ZOO", "čl. 583 ZOO"],
    headnote: "Korišćenje stana posle raskida: dug za zakupninu i tekuće troškove.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6261/2023",
    legal_area: "civil",
    legal_question:
      "Da li zakupac službenog vojnog stana može steći svojinu održajem i da li je osnovan zahtev za zakupninu ako je iseljenje odbijeno zbog prava na dom?",
    court_position:
      "Apelacioni sud je potvrdio naplatu zakupnine i odbijanje protivtužbe za svojinu održajem; ugovor o zakupu ne daje zakonit osnov državine za održaj.",
    reasoning:
      "Prvostepeni sud je odbio iseljenje uz poziv na čl. 8 EKLjP jer tuženi nema rešeno stambeno pitanje; za dospelu zakupninu za period do 2017. dosuđena je kamata od dana nalaza veštaka (čl. 277, 324, 214 ZOO).",
    keywords: ["službeni stan", "čl. 8 EKLjP", "održaj", "zakupnina"],
    related_articles: ["čl. 277 ZOO", "čl. 324 ZOO", "Zakon o stanovanju"],
    headnote: "Vojni zakup: dug po ugovoru; protivtužba za održaj neosnovana.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2204/2017",
    legal_area: "civil",
    legal_question:
      "Da li zakupac posle isteka ugovora o zakupu na određeno vreme gubi pravni osnov za stan i može se iseliti?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužene i potvrdio nalog za iseljenje jer je ugovor prestao istekom roka i obnova nije usledela.",
    reasoning:
      "Primena Zakona o sredstvima u državini RS, Uredbe o stambenim potrebama i čl. 375 ZOO; tužena nije plaćala zakupninu i obaveštena je da ugovor neće biti obnovljen.",
    keywords: ["iseljenje", "zakup na određeno vreme", "državina"],
    related_articles: ["čl. 375 ZOO", "Zakon o stanovanju"],
    headnote: "VKS: istek ugovora o zakupu na određeno vreme — osnov za iseljenje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 475/2017",
    legal_area: "civil",
    legal_question:
      "Da li dugotrajno neispunjenje obaveze investitora da izgradi objekat po ugovoru o zameni stanova opravdava raskid i restituciju sa naknadom štete?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio raskid ugovora o zameni i obavezu na restituciju i naknadu štete.",
    reasoning:
      "Tužilja se iselila po dogovoru; tuženi nije izvršio zamenu objekta; aneksi i neplaćanje zakupnine od oktobra 2010. do maja 2015. podržavaju raskid i naknadu.",
    keywords: ["zamena nepokretnosti", "raskid", "naknada štete", "zakupnina"],
    related_articles: ["čl. 132 ZOO", "čl. 262 ZOO", "čl. 567 ZOO"],
    headnote: "Zamena stanova: raskid zbog neizgradnje i obaveza naknade.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1944/2021",
    legal_area: "civil",
    legal_question:
      "Da li se može naložiti iseljenje vojnog penzionera iz službenog stana zbog neplaćanja zakupnine ako je stan centar života porodice po čl. 8 EKLjP?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje iseljenja zbog prava na dom, delimično usvojio naplatu zakupnine i ukinuo deo presude radi ponovnog suđenja.",
    reasoning:
      "Prvostepeni sud primenio čl. 8 EKLjP i Zakon o stanovanju; za iseljenje nije nadležan sud po čl. 16 ZPP u delu raskida; zakupnina za deo perioda dosuđena, prigovor zastarelosti odbijen za taj deo.",
    keywords: ["službeni stan", "čl. 8 EKLjP", "iseljenje", "zakupnina"],
    related_articles: ["čl. 39 Zakon o stanovanju", "čl. 375 ZOO", "čl. 16 ZPP"],
    headnote: "Vojni penzioner: iseljenje odbijeno (dom); delimično dosuđena zakupnina.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2161/2018",
    legal_area: "civil",
    legal_question:
      "Da li nastojnički stan posle decenija korišćenja gubi status službenog stana i da li se iseljenje može tražiti samo po Zakonu o stanovanju?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presudu Apelacionog suda i vratio predmet na ponovno suđenje zbog bitne povrede postupka i nepotpunog utvrđivanja statusa stana.",
    reasoning:
      "Drugostepeni sud je smatrao da je stan faktično izgubio status službenog pa da važe uslovi Zakona o stanovanju; potrebno je pravilno utvrditi da li je stečeno stanarsko pravo i odnos prema naknadi i tužbi za zakupninu.",
    keywords: ["nastojnički stan", "službeni stan", "stanarsko pravo", "iseljenje"],
    related_articles: ["Zakon o stanovanju", "čl. 408 ZPP"],
    headnote: "VKS ukida PAS: status nastojničkog stana i stanarsko pravo zahtevaju potpuno utvrđivanje.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1519/2023",
    legal_area: "civil",
    legal_question:
      "Da li zakupac dokazuje plaćanje zakupnine i infostana teretom na sebi u sporu za dug?",
    court_position:
      "Apelacioni sud je odbio žalbu tuženog i potvrdio presudu o dugu za zakupninu i troškove stanovanja uz kamatu od dana tužbe.",
    reasoning:
      "Teret na zakupcu da dokaže plaćanje po čl. 231 ZOO; nalaz veštaka prihvaćen; primena čl. 17, 262, 324, 567, 596 ZOO.",
    keywords: ["zakup stana", "teret dokazivanja", "infostan", "kamata"],
    related_articles: ["čl. 231 ZPP", "čl. 262 ZOO", "čl. 277 ZOO", "čl. 324 ZOO"],
    headnote: "Dug zakupnine: tuženi nije dokazao plaćanje; kamata od podnošenja tužbe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1122/2025",
    legal_area: "civil",
    legal_question:
      "Da li posle isteka ugovora o zakupu na određeno vreme zakupac ostaje u državini bez osnova ako zakupodavac ne zaključi novi ugovor uprkos zahtevima zakupca?",
    court_position:
      "Vrhovni sud je odbio reviziju u delu iseljenja jer ugovor prestaje istekom roka bez obaveze obnove; u delu novčanog potraživanja usvojio je reviziju i vratio predmet.",
    reasoning:
      "Čl. 585 st. 1 ZOO u vezi čl. 70 st. 3 Zakona o stanovanju i održavanju zgrada; zahtevi za obnovu ne stvaraju novi ugovor bez saglasnosti; od 19.05.2016. nema saglasnosti volja po čl. 26–28 ZOO.",
    keywords: ["zakup na određeno vreme", "iseljenje", "čl. 585 ZOO", "obnova ugovora"],
    related_articles: ["čl. 585 st. 1 ZOO", "Zakon o stanovanju i održavanju zgrada"],
    headnote: "Istek zakupa: iseljenje potvrđeno; novčani deo vraćen na ponovno suđenje.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 15064/2022",
    legal_area: "civil",
    legal_question:
      "Da li je za otkaz ugovora o zakupu stana po čl. 35 Zakona o stanovanju potrebna prethodna opomena zakupodavca?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilaca za iseljenje i ukinuo deo o novčanom potraživanju, vraćajući ga na ponovno suđenje; za otkaz zbog zloupotrebe stana opomena je obavezan uslov.",
    reasoning:
      "Čl. 35 st. 1 tač. 1–3 i 6 Zakona o stanovanju: opomena je neophodna pre otkaza zbog nedozvoljene upotrebe ili štete; za neplaćanje posle opomene važe posebni uslovi.",
    keywords: ["otkaz zakupa", "opomena", "čl. 35 Zakon o stanovanju", "iseljenje"],
    related_articles: ["čl. 35 st. 1 Zakon o stanovanju"],
    headnote: "Vrhovni sud: opomena kao uslov za otkaz zakupa zbog zloupotrebe stana.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1284/2020",
    legal_area: "civil",
    legal_question:
      "Da li član porodičnog domaćinstva posle smrti zakupca može nastaviti korišćenje stana i da li otkaz zbog neplaćanja važi ako zakupodavac odbija zaključiti novi ugovor?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio pravo tuženog na nastavak korišćenja uz obavezu postupka po čl. 34 st. 4–5 Zakona o stanovanju.",
    reasoning:
      "Tuženi je obavestio zakupodavca o smrti zakupca; bez ugovora u roku od 30 dana sledi predlog za rešenje koje zamenjuje ugovor; odbijanje zaključivanja ugovora i obračuna zakupnine ograničava otkaz zbog neplaćanja.",
    keywords: ["stanarsko pravo", "čl. 34 Zakon o stanovanju", "porodično domaćinstvo"],
    related_articles: ["čl. 34–35 Zakon o stanovanju", "čl. 201 ZOO"],
    headnote: "Nastavak korišćenja stana članom domaćinstva posle smrti zakupca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2421/2024",
    legal_area: "civil",
    legal_question:
      "Da li je osnovana delimična presuda za iseljenje zakupca zbog neplaćanja zakupnine i komunalija posle otkaza?",
    court_position:
      "Apelacioni sud je potvrdio delimičnu presudu o iseljenju jer je ugovor prestao otkazom, a tužena je ostala u državini bez osnova uz čl. 3 i 37 Zakona o osnovama svojinskopravnih odnosa.",
    reasoning:
      "Pravni osnov za iseljenje posle otkaza zakupa od septembra 2020; delimična presuda po čl. 346 ZPP opravdana zbog starosti tužilje i prinudne naplate komunalija.",
    keywords: ["delimična presuda", "iseljenje", "otkaz zakupa", "čl. 346 ZPP"],
    related_articles: ["čl. 346 ZPP", "čl. 37 Zakona o osnovama svojinskopravnih odnosa"],
    headnote: "Potvrđeno iseljenje posle otkaza zakupa i neplaćanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 19564/2023",
    legal_area: "civil",
    legal_question:
      "Da li je otkaz zakupa i iseljenje osnovani kada zakupac ima zdravstvene razloge odsustva i kada zakupodavac odbija prijem zakupnine pa je uplaćuje u depozit?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilje i potvrdio da uslovi čl. 35 st. 1 tač. 2 i 6 Zakona o stanovanju nisu ispunjeni; centar života ostaje u stanu.",
    reasoning:
      "Opomena je obavezan uslov za otkaz zbog neplaćanja dve uzastopne rate; tužena je tražila mesto prijema i uplatila u depozit; tačka 6 o nekorišćenju stana nije ispunjena zbog opravdanih razloga.",
    keywords: ["otkaz zakupa", "depozit suda", "čl. 35 Zakon o stanovanju", "čl. 8 EKLjP"],
    related_articles: ["čl. 35 st. 1 Zakon o stanovanju"],
    headnote: "Odbijen zahtev za iseljenje: depozit zakupnine i zdravstveni razlozi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 496/2018",
    legal_area: "civil",
    legal_question:
      "Da li je moguće iseljenje zakupca stana na neodređeno vreme bez prethodne opomene za neplaćanje zakupnine?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presude o iseljenju jer nije utvrđeno da je zakupodavac uputio opomenu niti da su dve uzastopne rate ostale neplaćene posle opomene.",
    reasoning:
      "Čl. 35 st. 1 tač. 2 i čl. 40 Zakona o stanovanju (50/92–26/01): opomena je obavezan uslov; uplate u depozit od 2014. ne zadovoljavaju kumulativne uslove za otkaz.",
    keywords: ["opomena", "zakup na neodređeno vreme", "iseljenje", "čl. 35"],
    related_articles: ["čl. 35 st. 1 Zakon o stanovanju", "čl. 40 Zakon o stanovanju"],
    headnote: "VKS: bez opomene nema otkaza ni iseljenja zbog zakupnine.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6047/2022",
    legal_area: "civil",
    legal_question:
      "Da li na komunalne troškove nastale upotrebom predmeta zakupa važi desetogodišnji rok zastarelosti umesto roka iz čl. 378 ZOO?",
    court_position:
      "Apelacioni sud je odbio žalbu tuženog i potvrdio dug za zakupninu i komunalije primenom čl. 371 ZOO, ne čl. 378 ZOO.",
    reasoning:
      "Komunalije su troškovi redovne upotrebe predmeta zakupa u zakupodavnom odnosu, ne povremena davanja u smislu čl. 378 ZOO; prigovor zastarelosti odbijen.",
    keywords: ["komunalije", "zastarelost", "čl. 371 ZOO", "čl. 378 ZOO"],
    related_articles: ["čl. 371 ZOO", "čl. 378 ZOO", "čl. 262 ZOO"],
    headnote: "Komunalije uz zakup: opšti rok deset godina, ne rok iz čl. 378 ZOO.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "R4g 29/2016",
    legal_area: "procedural",
    legal_question:
      "Da li zahtev za naknadu štete zbog dužine parničnog postupka može biti zasnovan na nezadovoljstvu meritornom ishodom?",
    court_position:
      "Apelacioni sud je odbio zahtev jer se navodi odnose na suštinu spora i vođenje postupka, a ne na razuman rok suđenja.",
    reasoning:
      "Institut naknade zbog prekoračenja roka za suđenje zahteva povezanost sa trajanjem postupka, ne sa osporavanjem odluke o zakupu i iseljenju.",
    keywords: ["razuman rok", "naknada štete", "parnični postupak"],
    related_articles: ["čl. 32 Ustava RS", "ZPP"],
    headnote: "Odbijen zahtev za štetu zbog trajanja postupka — navodi se odnose na merito.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1909/2022",
    legal_area: "civil",
    legal_question:
      "Da li su ispunjeni uslovi iz čl. 35 st. 1 tač. 2 i 4 Zakona o stanovanju za iseljenje nosioca stanarskog prava zbog neplaćanja i sticanja drugog stana?",
    court_position:
      "Apelacioni sud je potvrdio iseljenje posle opomene i neplaćanja zakupnine kao i sticanja odgovarajućeg stana u svojinu.",
    reasoning:
      "Primena čl. 30 st. 2 i čl. 35 st. 1 tač. 2 i 4 Zakona o stanovanju za nosioce stanarskog prava; uplate u depozit ne menjaju osnov otkaza ako su ispunjeni zakonski uslovi.",
    keywords: ["stanarsko pravo", "iseljenje", "čl. 35 Zakon o stanovanju"],
    related_articles: ["čl. 30–35 Zakon o stanovanju"],
    headnote: "Iseljenje nosioca stanarskog prava: neplaćanje posle opomene i drugi stan.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5176/2022",
    legal_area: "civil",
    legal_question:
      "Da li je vojna opomena nadležnog organa za raskid ugovora o zakupu službenog stana zamenjiva opomenom civilnog sektora?",
    court_position:
      "Apelacioni sud je ukinuo raskid, iseljenje i naplatu zbog nepotpunog utvrđivanja i pogrešnog postupka po Pravilniku o stanovima JNA, a potvrdio odbijanje protivtužbe za svojinu održajem.",
    reasoning:
      "Za raskid po Pravilniku o stanovima JNA opomena mora biti od vojne ustanove nadležne za stambeni fond, ne od civilnog sektora; zakupac nije savestan držalac za održaj.",
    keywords: ["službeni stan JNA", "raskid zakupa", "održaj", "opomena"],
    related_articles: ["Pravilnik o stanovima u JNA", "Zakon o stanovanju"],
    headnote: "Službeni stan JNA: opomena mora biti od vojnog stambenog organa.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3644/2023",
    legal_area: "civil",
    legal_question:
      "Da li se naknada za korišćenje stana posle odbijanja zahteva za zakup obračunava po tržišnoj zakupnini ili po zakupnini po Zakonu o stanovanju?",
    court_position:
      "Apelacioni sud je preinačio presudu: merodavna je zakupnina po Zakonu o stanovanju, zastarelost tri godine; odbijena zatezna kamata zbog poverilačke docnje.",
    reasoning:
      "Posle pravnosnažnog odbijanja zahteva za zakup tuženi su koristili stan bez osnova; trogodišnji rok za naknadu; kamata ne ide protiv tužilje zbog docnje.",
    keywords: ["naknada korišćenja", "zakupnina", "zastarelost", "čl. 376 ZOO"],
    related_articles: ["čl. 376 ZOO", "Zakon o stanovanju"],
    headnote: "Naknada posle odbijanja zakupa: cena po Zakonu o stanovanju, rok tri godine.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 17024/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito iseljenje zakupaca na određeno vreme iz stanova vraćenih bivšim vlasnicima po Zakonu o vraćanju oduzete imovine?",
    court_position:
      "Upravni sud je odbio tužbu zakupaca i potvrdio rešenje o iseljenju jer nisu plaćale zakupninu niti zaključile ugovor pod tržišnim uslovima.",
    reasoning:
      "Primena čl. 8 i 27 st. 3 Zakona o vraćanju oduzete imovine i obeštećenju i postupka raskida po čl. 7 st. 7–9 istog zakona; prestao pravni osnov za korišćenje.",
    keywords: ["restitucija", "zakup na određeno vreme", "iseljenje", "ZVOOI"],
    related_articles: ["Zakon o vraćanju oduzete imovine i obeštećenju"],
    headnote: "Upravni Sud: iseljenje zakupaca posle vraćanja stanova vlasnicima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1394/2019",
    legal_area: "commercial",
    legal_question:
      "Da li je za zakup zemljišta u javnoj svojini potrebna saglasnost Direkcije radi punovažnosti ugovora o zakupu?",
    court_position:
      "Privredni apelacioni sud je ukinuo presudu jer prvostepeni sud nije utvrdio da li je pribavljena saglasnost Direkcije, što može uticati na ništavost ugovora.",
    reasoning:
      "Bez utvrđivanja formalnih uslova za zakup javne površine nije moguće doneti meritornu odluku o iseljenju i zakupnini.",
    keywords: ["javna svojina", "zakup zemljišta", "saglasnost", "ništavost"],
    related_articles: ["Zakon o javnoj svojini", "ZOO"],
    headnote: "PAS ukida presudu: nedostatak utvrđivanja saglasnosti za zakup javne parcele.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 865/2006",
    legal_area: "civil",
    legal_question:
      "Da li član porodičnog domaćinstva koji nastavi plaćanje zakupnine posle smrti zakupaca stiče status zakupca bez novog pisanog ugovora?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca za iseljenje i potvrdio da tuženi ima položaj zakupca po čl. 34 Zakon o stanovanju.",
    reasoning:
      "Majka pa sin nastavili plaćanje i korišćenje; čl. 34 st. 4–5 uređuju obavezu zaključivanja ili postupka koji zamenjuje ugovor; revizija ne može osporavati činjenice po čl. 385 st. 3 ZPP (stari ZPP).",
    keywords: ["čl. 34 Zakon o stanovanju", "zakupac", "porodično domaćinstvo"],
    related_articles: ["čl. 34–35 Zakon o stanovanju"],
    headnote: "Nastavak zakupa članom domaćinstva posle smrti nosioca — odbijeno iseljenje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2565/2023",
    legal_area: "civil",
    legal_question:
      "Da li se na potraživanje zakupnine primenjuje trogodišnji rok iz čl. 375 ZOO ili deset godina iz čl. 371 ZOO kada je odnos zakup a ne sticanje bez osnova?",
    court_position:
      "Apelacioni sud je preinačio presudu: odnos je zakup sa prećutnom saglasnošću; zakupnina zastareva za tri godine po čl. 375 ZOO; zahtev delimično zastareo.",
    reasoning:
      "Dugoročno korišćenje i ponašanje stranaka pokazuju zakup na neodređeno vreme po čl. 30–39 Zakona o stanovanju; rešenje o dodeli ne prekida zakupni karakter odnosa.",
    keywords: ["zakupnina", "čl. 375 ZOO", "prećutna saglasnost", "zastarelost"],
    related_articles: ["čl. 375 ZOO", "čl. 371 ZOO", "Zakon o stanovanju"],
    headnote: "Faktički zakup: trogodišnja zastarelost zakupnine, ne sticanje bez osnova.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3968/2022",
    legal_area: "civil",
    legal_question:
      "Da li su osnovani zahtevi za naknadu štete zbog adaptacije stana bez saglasnosti zakupodavca posle raskida zakupa?",
    court_position:
      "Apelacioni sud je delimično potvrdio presudu za komunalije, a ukinuo deo o zakupnini i šteti od adaptacije i vratio predmet na ponovno suđenje.",
    reasoning:
      "Potrebno dodatno utvrditi ključne činjenice o radovima bez saglasnosti i obimu obaveza posle pravnosnažnog iseljenja iz prve parnice.",
    keywords: ["adaptacija", "raskid zakupa", "naknada štete", "komunalije"],
    related_articles: ["čl. 262 ZOO", "čl. 596 ZOO"],
    headnote: "Adaptacija bez saglasnosti: deo presude ukinut radi potpunijeg utvrđivanja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4811/2023",
    legal_area: "civil",
    legal_question:
      "Da li zakupac službenog vojnog stana može steći svojinu održajem na tom stanu?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje protivtužbe za svojinu održajem jer državina iz zakupa nije ni savesna ni zakonita za održaj.",
    reasoning:
      "Obaveza predaje stana po isteku zakupa; dokazani dugovi za zakupninu i komunalije; održaj zahteva savesnu državinu.",
    keywords: ["održaj", "službeni stan", "zakup", "čl. 186 ZOO"],
    related_articles: ["Zakon o stanovanju", "Zakon o osnovama svojinskopravnih odnosa"],
    headnote: "Protivtužba za svojinu na službenom stanu odbijena — državina iz zakupa.",
    outcome: "defendant_won",
  },

  // ── BATCH 2 (2/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 5643/2011",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o iseljenju zakupaca na određeno vreme iz stanova vraćenih bivšim vlasnicima po Zakonu o vraćanju oduzete imovine?",
    court_position:
      "Upravni sud je odbio tužbu zakupaca i potvrdio rešenje o iseljenju jer nisu plaćale zakupninu niti zaključile ugovor pod tržišnim uslovima.",
    reasoning:
      "Primena čl. 8 i 27 st. 3 Zakona o vraćanju oduzete imovine i obeštećenju i postupka raskida po čl. 7 st. 4–9; prestao je pravni osnov za korišćenje stana.",
    keywords: ["restitucija", "zakup na određeno vreme", "iseljenje", "ZVOOI"],
    related_articles: ["Zakon o vraćanju oduzete imovine i obeštećenju"],
    headnote: "Upravni spor: iseljenje zakupaca posle vraćanja stanova vlasnicima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1061/2021",
    legal_area: "civil",
    legal_question:
      "Da li lice koje stan dodeli trećem licu na korišćenje može biti pasivno legitimisano za naknadu izmakle dobiti zbog razlike zakupnine?",
    court_position:
      "Apelacioni sud je odbio tužbu za naknadu materijalne štete jer tuženi nije bio vlasnik, zakupodavac ni zakupac predmetnog stana.",
    reasoning:
      "Pasivna legitimacija zahteva da tuženi bude nosilac obaveze; dodela stana trećem licu i pravni odnos sa stvarnim zakupodavcem isključuju odgovornost tuženog.",
    keywords: ["pasivna legitimacija", "naknada štete", "izmakla dobit", "zakup"],
    related_articles: ["čl. 50 ZPP", "čl. 154 ZOO"],
    headnote: "Naknada štete: nedostatak pasivne legitimacije davaoca stana trećem licu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 624/2021",
    legal_area: "civil",
    legal_question:
      "Da li zakupodavci mogu dokazati štetu na stanu od zakupca bez zapisnika o stanju pri useljenju i iseljenju?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva za naknadu štete na stanu zbog nedostatka dokaza da je šteta prouzrokovana krivicom zakupca.",
    reasoning:
      "Za odgovornost zakupca potrebno utvrditi stanje stana na početku i kraju zakupa; za delimično usvojen zahtev za zakupninu i režiju primenjeni čl. 262, 567, 583 ZOO.",
    keywords: ["naknada štete", "zakup stana", "teret dokazivanja", "zapisnik"],
    related_articles: ["čl. 262 ZOO", "čl. 567 ZOO", "čl. 583 ZOO"],
    headnote: "Šteta na iznajmljenom stanu: bez zapisnika o stanju odbijena odgovornost za štetu.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6155/2022",
    legal_area: "civil",
    legal_question:
      "Da li je žalba tužioca dopuštena u delu u kome je prvostepeni sud usvojio njegov zahtev za raskid zakupa, iseljenje i troškove struje, vode i grejanja?",
    court_position:
      "Apelacioni sud je odbacio žalbu kao nedozvoljenu u delu uspeha tužioca, potvrdio odbijanje za električnu energiju i ukinuo presudu u delu raskida, iseljenja i troškova vode i grejanja.",
    reasoning:
      "Nije dozvoljeno žaliti usvojeni deo tužbenog zahteva; za ostatak potrebno dodatno utvrditi obaveze po ugovoru o zakupu i dospelost troškova.",
    keywords: ["žalba", "nedozvoljena žalba", "raskid zakupa", "troškovi korišćenja"],
    related_articles: ["čl. 401 ZPP", "čl. 262 ZOO"],
    headnote: "Delimična žalba: odbacivanje u delu uspeha tužioca; ukinut deo o raskidu i režiji.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1530/2023",
    legal_area: "civil",
    legal_question:
      "Od kog trenutka se obračunava naknada za korišćenje stana bespravnog držaoca i da li je merodavna tržišna zakupnina?",
    court_position:
      "Apelacioni sud je potvrdio obavezu nesaveznog držaoca da plati naknadu od dana pokretanja upravnog iseljenja do predaje stana, u visini tržišne zakupnine.",
    reasoning:
      "Nesavesnost nastaje od 31.05.2017. kada je tužilja pokrenula postupak iseljenja pred organom; prigovor zastarelosti odbijen za desetogodišnji rok po čl. 371 ZOO u odnosu na prvo dospelo potraživanje.",
    keywords: ["bespravni držalac", "naknada korišćenja", "tržišna zakupnina", "čl. 371 ZOO"],
    related_articles: ["čl. 371 ZOO", "Zakon o osnovama svojinskopravnih odnosa"],
    headnote: "Naknada koristi od dana nesavesnosti (postupak iseljenja pred organom).",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2279/2024",
    legal_area: "civil",
    legal_question:
      "Da li se može iseliti zakupac na neodređeno vreme bez dokaza o opomeni i neplaćanju dve uzastopne rate posle opomene?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje iseljenja jer tužilja nije dokazala opomenu niti neplaćanje dve rate uzastopno, a tužena je redovno uplatila zakupninu u depozit suda.",
    reasoning:
      "Tužena se poziva na pravnosnažno rešenje o pravu zakupa na neodređeno vreme; osporavanje osnova tog prava nije predmet ove parnice; čl. 35 st. 1 Zakon o stanovanju.",
    keywords: ["zakup na neodređeno vreme", "opomena", "depozit suda", "čl. 35"],
    related_articles: ["čl. 35 st. 1 Zakon o stanovanju"],
    headnote: "Iseljenje odbijeno: uplata zakupnine u depozit i nedokazana opomena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4551/2024",
    legal_area: "civil",
    legal_question:
      "Da li podnošenje tužbe za iseljenje može predstavljati otkaz ugovora o zakupu stana na neodređeno vreme?",
    court_position:
      "Apelacioni sud je odbio žalbe obe strane i potvrdio da su radnje tužilje (raskid, zahtevi, isključenje struje, promena računa) tokom oko godinu dana predstavljale jasan otkaz, pa je tužba za iseljenje osnovana.",
    reasoning:
      "Nastavak zakupa sa pravnim sledbenikom po čl. 596–599 ZOO; otkazni rok od 30 dana iz ugovora; izražena volja za raskid ispunjava uslove za prestanak zakupa.",
    keywords: ["otkaz zakupa", "tužba za iseljenje", "čl. 597 ZOO", "raskid"],
    related_articles: ["čl. 596 ZOO", "čl. 597 ZOO", "čl. 599 ZOO"],
    headnote: "Tužba za iseljenje kao nedvosmislen otkaz zakupa na neodređeno vreme.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3884/2023",
    legal_area: "civil",
    legal_question:
      "Da li se na naknadu štete u vidu izmakle koristi za korišćenje poslovnog prostora posle otkaza zakupa primenjuje trogodišnji rok zastarelosti?",
    court_position:
      "Apelacioni sud je potvrdio obavezu Ministarstva odbrane na naknadu izmakle koristi za period posle otkaza do prinudnog iseljenja, uz primenu trogodišnjeg roka zastarelosti i kamatu od dana presuđenja.",
    reasoning:
      "Pravnosnažna presuda o iseljenju i dugu; tužena nije napustila lokal; obračun po nalazu veštaka; kamata od presuđenja u skladu sa preinačenjem drugostepenog suda.",
    keywords: ["poslovni prostor", "izmakla korist", "čl. 376 ZOO", "zastarelost"],
    related_articles: ["čl. 376 ZOO", "čl. 154 ZOO", "čl. 262 ZOO"],
    headnote: "Naknada za korišćenje lokala posle otkaza: trogodišnja zastarelost i kamata.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3129/2018",
    legal_area: "civil",
    legal_question:
      "Da li je za nalog iseljenja iz poslovnog prostora neophodno utvrditi da li je dug prethodnika zakupodavca mogao biti otplaćen kroz višegodišnje korišćenje bez zakupnine po dogovoru stranaka?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presudu Apelacionog suda o iseljenju jer nije utvrđeno da li je dug otplaćen kroz sporazum o otplati neplaćanjem zakupnine.",
    reasoning:
      "Smisao ugovora o zakupu bio je vraćanje pozajmljenog novca; ako je dug otplaćen korišćenjem lokala, osnov za iseljenje i dalju zakupninu zahteva posebno utvrđivanje.",
    keywords: ["iseljenje", "lokal", "dug", "zakupnina", "dogovor stranaka"],
    related_articles: ["čl. 262 ZOO", "čl. 567 ZOO"],
    headnote: "VKS ukida iseljenje: potrebno utvrditi otplatu duga kroz korišćenje lokala.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 210/2024",
    legal_area: "civil",
    legal_question:
      "Da li je valjana ugovorna odredba o dvostrukoj zakupnini kao kazni za docnju sa iseljenjem posle raskida zakupa?",
    court_position:
      "Apelacioni sud je potvrdio dug za zakupninu, a preinačio deo o ugovornoj kazni smatrajući je ništavom jer se ugovorna kazna ne može ugovarati za novčane obaveze.",
    reasoning:
      "Primena čl. 270 st. 3 ZOO; ugovorna kazna za novčane obaveze nije dopuštena; obaveza plaćanja redovne zakupnine ostaje.",
    keywords: ["ugovorna kazna", "čl. 270 ZOO", "zakupnina", "iseljenje"],
    related_articles: ["čl. 270 st. 3 ZOO", "čl. 262 ZOO"],
    headnote: "Dvostruka zakupnina kao kazna za kašnjenje iseljenja — ništava odredba.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IU 114/2006",
    legal_area: "constitutional",
    legal_question:
      "Da li su odredbe Zakona o stanovanju o otkupu stanova, visini zakupnine i pravima zakupaca na određeno vreme u suprotnosti sa Ustavom?",
    court_position:
      "Ustavni sud je odbacio inicijative za ocenu ustavnosti dela odredaba Zakona o stanovanju ili ih ocenio neosnovanim u delu koji se tiče otkupa, zakupnine i prava zakupaca.",
    reasoning:
      "Razlikovanje režima zakupnine za stanove u privatnoj svojini i za nosioce stanarskog prava; odredba čl. 32 o zakupnini po aktu ministra predmet inicijativa koje nisu usvojene u traženom obimu.",
    keywords: ["Ustavni sud", "Zakon o stanovanju", "zakupnina", "otkup stanova"],
    related_articles: ["čl. 32 Zakon o stanovanju", "čl. 7–11 Zakon o stanovanju", "Ustav RS"],
    headnote: "Ustavna ocena: delovi Zakona o stanovanju nisu proglašeni neustavnim u ovom predmetu.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6235/2022",
    legal_area: "civil",
    legal_question:
      "Da li potraživanje zakupnine i infostana posle izlaska zakupca iz stana podleže trogodišnjoj zastarelosti po čl. 375 ZOO?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i odbio tužbeni zahtev u celini jer je potraživanje zakupnine i struje zastarelo, a za infostan nije dokazan obim štete.",
    reasoning:
      "Posle aprila 2009. tuženi nije bio u stanu; isplate zakupnine trećem licu; za zakupninu važi čl. 375 ZOO (tri godine); pasivna legitimacija tuženog bi nestala da je ugovor prestao.",
    keywords: ["zastarelost", "čl. 375 ZOO", "infostan", "zakup stana"],
    related_articles: ["čl. 375 ZOO", "čl. 12 ugovora o zakupu"],
    headnote: "Ukida se presuda: zastarela zakupnina; infostan nedokazan.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5026/2023",
    legal_area: "civil",
    legal_question:
      "Da li overena izjava o priznanju duga dokazuje postojanje i visinu potraživanja zakupodavca prema zakupcu?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tuženi obavezan na isplatu duga priznatog javnobeležničkom izjavom, uz ispravku kamate.",
    reasoning:
      "Teret dokazivanja isplate na tuženom po čl. 583 i 597 ZOO; priznanje duga stvara domnezu ispunjenosti; kamata po čl. 277 ZOO od dana docnje iz izjave.",
    keywords: ["priznanje duga", "javni beležnik", "čl. 583 ZOO", "teret dokazivanja"],
    related_articles: ["čl. 277 ZOO", "čl. 583 ZOO", "čl. 597 ZOO"],
    headnote: "Overena izjava o dugu: tuženi nije dokazao plaćanje; kamata preinačena.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2600/2021",
    legal_area: "civil",
    legal_question:
      "Da li prestaje pravni osnov za korišćenje stana zaključenog na određeno vreme istekom roka i vraćanjem stanarskog prava na drugom stanu?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i naložio iseljenje tužene jer je ugovor o zakupu na određeno vreme prestao i tuženoj je vraćeno stanarsko pravo na drugom stanu.",
    reasoning:
      "Čl. 9 st. 1 tač. 1 Zakon o stanovanju — prestanak po isteku vremena; zaključak o ispražnjenju prvog stana; obaveza plaćanja troškova do iseljenja ostaje sporedno pitanje.",
    keywords: ["zakup na određeno vreme", "iseljenje", "stanarsko pravo", "čl. 9 Zakon o stanovanju"],
    related_articles: ["čl. 9 st. 1 Zakon o stanovanju"],
    headnote: "Preinačeno u korist iseljenja: istek zakupa i drugo rešeno stanarsko pravo.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2288/2023",
    legal_area: "civil",
    legal_question:
      "Da li nosilac stanarskog prava useljen odlukom opštine duguje tržišnu zakupninu kao naknadu štete vlasniku stana?",
    court_position:
      "Apelacioni sud je preinačio presudu i odbio zahtev za naknadu u visini tržišne zakupnine jer je tuženi bio savestan držalac po zakonitom osnovu iz odluke opštine.",
    reasoning:
      "Čl. 40 Zakon o stanovanju i čl. 41 o tužbi vlasnika; izmakla korist po čl. 189 ZOO zahteva dokaz da bi vlasnik stvarno izdavao stan u zakup; za naknadu štete potrebna protivpravnost i uzrokovanje.",
    keywords: ["savestan držalac", "stanarsko pravo", "tržišna zakupnina", "čl. 40 Zakon o stanovanju"],
    related_articles: ["čl. 40–41 Zakon o stanovanju", "čl. 189 ZOO"],
    headnote: "Savestan držalac po odluci opštine ne duguje tržišnu zakupninu kao štetu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2756/2023",
    legal_area: "civil",
    legal_question:
      "Da li država odgovara za troškove struje i priključenja kada vojnom penzioneru dodeli neuseljiv stan i zahteva plaćanje duga prethodnog korisnika?",
    court_position:
      "Apelacioni sud je potvrdio naknadu za plaćeni dug za struju i takse priključenja zbog neuseljivog stana, a ukinuo deo o naknadi zakupnine i komunalija za drugi stan i vratio predmet.",
    reasoning:
      "Odgovornost zbog nepravilnog rada organa koji su stavili neuseljiv stan u promet; prestatak prava na naknadu dela troškova rešenjem od 2019; tužilac je prihvatio neuslovni stan.",
    keywords: ["neuseljiv stan", "naknada štete", "vojska", "Elektroprivreda"],
    related_articles: ["čl. 154 ZOO", "čl. 172 ZOO"],
    headnote: "Neuseljiv stan: naknada za struju potvrđena; deo o drugom stanu ukinut.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3020/2023",
    legal_area: "civil",
    legal_question:
      "Da li pravo na dom po čl. 8 EKLjP sprečava iseljenje zakupca kada je zakupnina pretplaćena po nalazu veštaka?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje iseljenja, ali iz drugih razloga: primena načela pravedne ravnoteže i prava na dom zbog dugogodišnjeg stanovanja člana porodičnog domaćinstva.",
    reasoning:
      "Tužena koristi stan od 1986; pravni prethodnik nije pokrenuo postupak po čl. 34 st. 3 Zakon o stanovanju; pretplata zakupnine po veštaku; otkaz zbog neplaćanja nije osnovan.",
    keywords: ["čl. 8 EKLjP", "pravo na dom", "zakupnina", "pretplata"],
    related_articles: ["čl. 8 EKLjP", "čl. 34–35 Zakon o stanovanju"],
    headnote: "Odbijeno iseljenje: čl. 8 EKLjP i pretplaćena zakupnina po veštaku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 11975/2013",
    legal_area: "administrative",
    legal_question:
      "Da li je valjano rešenje o iseljenju ako u spisu nema originalnog rešenja sa potpisom donosioca već samo overu otpravka?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje Zamenika gradonačelnika jer je utvrđena bitna povreda pravila postupka zbog nedostatka originalnog potpisanog rešenja.",
    reasoning:
      "Overa tačnosti otpravka ne zamenjuje original sa potpisom donosioca; tužilja je osporavala i rok iseljenja i zakonitost otkaza socijalnog zakupa.",
    keywords: ["bitna povreda postupka", "potpis", "rešenje", "iseljenje"],
    related_articles: ["Zakon o opštem upravnom postupku", "Zakon o upravnim sporovima"],
    headnote: "Upravni spor: poništaj rešenja zbog nedostatka originalnog potpisanog akta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5852/2023",
    legal_area: "civil",
    legal_question:
      "Da li Ministarstvo odbrane može iseliti vojnog penzionera iz službenog stana ako mu nije rešeno stambeno pitanje i stan je centar života porodice?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje iseljenja iz službenog stana radi zaštite prava na dom po čl. 8 EKLjP, uz delimično dosuđenu zakupninu za traženi period.",
    reasoning:
      "Životne okolnosti tuženog i propust tužioca da reši stambeno pitanje; delimično usvojen zahtev za dug zakupnine; odbijen raskid ugovora i iseljenje.",
    keywords: ["službeni stan", "čl. 8 EKLjP", "Ministarstvo odbrane", "zakupnina"],
    related_articles: ["čl. 8 EKLjP", "Zakon o stanovanju"],
    headnote: "Vojni penzioner: iseljenje odbijeno (dom); dosuđen deo duga za zakupninu.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4946/2024",
    legal_area: "civil",
    legal_question:
      "Da li kupac stana može tražiti naknadu za zakup drugog stana tokom nemogućnosti korišćenja zbog skrivenih nedostataka i nematerijalnu štetu zbog egzistencijalne ugroženosti?",
    court_position:
      "Apelacioni sud je dosudio naknadu za zakupninu za ceo period nemogućnosti korišćenja zbog toksičnih isparenja, a odbio zahtev za nematerijalnu štetu jer duševni bol nije priznat kao šteta u tom obliku.",
    reasoning:
      "Dokazano iznajmljivanje stana po 200 evra; kupac je trpeo trošak zbog skrivenog nedostatka; nematerijalna šteta nije pravno priznata u traženom obimu.",
    keywords: ["skriveni nedostaci", "naknada štete", "zakupnina", "nematerijalna šteta"],
    related_articles: ["čl. 474 ZOO", "čl. 192 ZOO"],
    headnote: "Toksičan stan: naknada zakupnine potvrđena; nematerijalna šteta odbijena.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 91/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje kada drugostepeni sud odbije naknadu štete zbog korišćenja stana u sporu sa preduzećem?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu jer je drugostepeni sud dao ustavnopravno prihvatljive razloge za odbijanje tužbe za naknadu štete.",
    reasoning:
      "Utvrđeno je korišćenje stana po rešenjima vlasnika, iseljenje tuženog 2002, period podstanarstva i obračun razlike zakupnine; ocena merita spada u slobodu ocene redovnih sudova.",
    keywords: ["ustavna žalba", "pravično suđenje", "naknada štete", "zakup"],
    related_articles: ["čl. 32 Ustava RS", "čl. 6 EKLjP"],
    headnote: "Ustavni sud: odbijena žalba — razlozi drugostepenog suda prihvatljivi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 12509/2022",
    legal_area: "civil",
    legal_question:
      "Da li je za utvrđenje prava zakupa na vojnom stanu na neodređeno vreme potpuno utvrditi stvarnu namenu i status stana kao službenog?",
    court_position:
      "Vrhovni sud je ukinuo nižestepene presude i vratio predmet na ponovno suđenje zbog pogrešne primene materijalnog prava i nepotpunog utvrđenja činjenica o statusu stana.",
    reasoning:
      "Ugovor o zakupu službenog stana na određeno vreme iz 1996; potrebno ispitati da li je stan u stvari nastojnički i da li je moguće steći stanarsko pravo u tom statusu.",
    keywords: ["vojni stan", "pravo zakupa", "službeni stan", "Vrhovni sud"],
    related_articles: ["Zakon o stanovanju", "ZPP"],
    headnote: "Vrhovni sud ukida presude: status vojnog stana i namena nisu potpuno utvrđeni.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1906/2024",
    legal_area: "civil",
    legal_question:
      "Da li pravno lice ovlašćeno od države da izdaje stanove u zakup može biti aktivno legitimisano za naknadu posle raskida ugovora o zakupu?",
    court_position:
      "Apelacioni sud je potvrdio presudu o naknadi za korišćenje stana posle raskida i odbio prigovor nedostatka aktivne legitimacije jer je tužilac ovlašćen ugovorom države.",
    reasoning:
      "Čl. 186 ZOO — dospelost štete; prestanak plaćanja zakupnine od decembra 2019. do iseljenja 2021; pravo države preneto na tužioca kao zakupodavca po obligacionom ugovoru o zakupu.",
    keywords: ["Dipos", "aktivna legitimacija", "naknada korišćenja", "državina"],
    related_articles: ["čl. 186 ZOO", "Zakon o stanovanju"],
    headnote: "Ovlašćenje države za zakup: aktivna legitimacija tužioca potvrđena.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 4951/2013",
    legal_area: "administrative",
    legal_question:
      "Da li istek ugovora o zakupu na određeno vreme automatski znači da zakupac koristi stan bez pravnog osnova za upravno iseljenje?",
    court_position:
      "Upravni Sud je poništio rešenje o iseljenju jer postoji sporan pravni osnov za korišćenje (prećutno produženje po čl. 596 ZOO i postupak otkupa), pa nije ispunjena nadležnost upravnog organa.",
    reasoning:
      "Tužilja plaća zakupninu i traži otkup; čl. 16 Zakon o stanovanju — obaveza omogućavanja otkupa; istek roka ne uklanja sve eventualne osnove korišćenja bez prethodnog parničnog utvrđivanja.",
    keywords: ["upravno iseljenje", "čl. 596 ZOO", "otkup stana", "Zakon o stanovanju"],
    related_articles: ["čl. 596 ZOO", "čl. 16 Zakon o stanovanju"],
    headnote: "Upravni Sud: sporan osnov zakupa isključuje prinudno iseljenje u upravnom putu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5043/2010",
    legal_area: "commercial",
    legal_question:
      "Da li pravni prethodnik koji je adaptirao poslovni prostor može tražiti priznanje svojine i naknadu ulaganja ako je zaključio novi ugovor o zakupu koji potvrđuje status zakupca?",
    court_position:
      "Apelacioni sud je odbio žalbu tužioca i usvojio žalbe tuženih te odbio obligacioni i svojinski zahtev, smatrajući da je novim ugovorom o zakupu potvrđen status zakupca.",
    reasoning:
      "Veštačenje ulaganja i površina; nakon novog zakupa na neodređeno vreme i ponašanja stranaka nema osnova za svojinu po ulaganju u državnu imovinu u ovom sporu.",
    keywords: ["ulaganje", "poslovni prostor", "zakup", "svojina", "pravni prethodnik"],
    related_articles: ["čl. 132 ZOO", "Zakon o osnovama svojinskopravnih odnosa"],
    headnote: "Adaptacija i novi zakup: odbijen zahtev za svojinu i naknadu ulaganja.",
    outcome: "defendant_won",
  },

  // ── BATCH 3 (3/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3197/2022",
    legal_area: "civil",
    legal_question:
      "Do kada pripada zakupodavcu naknada za korišćenje stana kada je treće lice upisano za vlasnika pre okončanja spora?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje predaje nepokretnosti jer je treće lice postalo vlasnik, a preinačio merito o naknadi tako da zakupnina i naknada idu do dana upisa prava novog vlasnika u javne knjige.",
    reasoning:
      "Punovažan ugovor o zakupu; tuženi je nastavio korišćenje posle isteka; naknada se vezuje za period državine do promene vlasništva u korist trećeg.",
    keywords: ["naknada korišćenja", "vlasnik treće lice", "zakup stana", "javne knjige"],
    related_articles: ["čl. 262 ZOO", "čl. 596 ZOO"],
    headnote: "Naknada zakupodavcu do upisa novog vlasnika; predaja tuženom odbijena.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4498/2022",
    legal_area: "civil",
    legal_question:
      "Da li ostaje obaveza plaćanja ugovorne kazne za nevraćanje stana na dan isteka zakupa ako je zakupodavac pre toga raskinuo ugovor zbog neplaćanja?",
    court_position:
      "Apelacioni sud je preinačio presudu i odbio zahtev za ugovornu kaznu jer je raskidom pre isteka ugovora prestala i obaveza iz člana ugovora vezanog za taj datum isteka.",
    reasoning:
      "Neplaćanje zakupnine kao raskidni uslov omogućava jednostrani raskid po čl. 584 ZOO; za novčane obaveze ugovorna kazna nije dopuštena po čl. 270 st. 3 ZOO; obaveza vraćanja stana ostaje po drugom postupku.",
    keywords: ["ugovorna kazna", "raskid zakupa", "čl. 584 ZOO", "čl. 270 ZOO"],
    related_articles: ["čl. 270 st. 3 ZOO", "čl. 584 ZOO"],
    headnote: "Ugovorna kazna za predaju stana pada sa ranijim raskidom ugovora.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 23593/2023",
    legal_area: "civil",
    legal_question:
      "Da li je za ocenu ništavosti aneksa ugovora o zakupu građevinskog zemljišta potrebno utvrditi koja su prava tužilac stekao kupovinom objekta na parceli?",
    court_position:
      "Vrhovni Sud je usvojio reviziju, ukinuo nižestepene presude i vratio predmet na ponovno suđenje zbog pogrešne primene materijalnog prava.",
    reasoning:
      "Stečaj i isplata revalorizovanog duga zakupca; pravnosnažna presuda o svojini na objektu naspram prava na zemljištu; aneks nije ništav bez pravilnog pravnog ocenjivanja stečenih prava.",
    keywords: ["aneks ugovora", "stečaj", "zemljište", "objekat", "svojina"],
    related_articles: ["ZOO", "ZPP"],
    headnote: "Vrhovni sud ukida: aneks zakupa i prava iz kupovine objekta zahtevaju potpunu primenu prava.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1517/2025",
    legal_area: "commercial",
    legal_question:
      "Da li je tužena dužna da plati preostale rate zakupnine za građevinsko zemljište u javnoj svojini radi legalizacije objekta?",
    court_position:
      "Sud je obavezao tuženu na isplatu duga po ugovoru o zakupu zemljišta; odbijen je protivtužbeni zahtev za ništavost jer je o tome već pravnosnažno odlučeno; deo o kamati delimično preinačen.",
    reasoning:
      "Ugovorene rate i valorizacija; instrumenti obezbeđenja menicama; primena čl. 262, 567 i srodnih odredaba ZOO na obligacioni odnos sa Direkcijom.",
    keywords: ["zakup građevinskog zemljišta", "Direkcija", "rate", "legalizacija"],
    related_articles: ["čl. 262 ZOO", "čl. 567 ZOO"],
    headnote: "Dug zakupnine za parcelu u javnoj svojini: protivtužba o ništavosti odbijena.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 11963/2014",
    legal_area: "administrative",
    legal_question:
      "Da li vojni penzioner koji je sopstvenom voljom povukao zahtev za povrat stana u inostranstvu zadržava pravo na dodelu stana u zakup po Pravilniku?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio odbijanje zahteva za dodelu stana jer je tužilac izgubio mogućnost korišćenja prethodnog stana sopstvenom voljom.",
    reasoning:
      "Čl. 7–9 Pravilnika o rešavanju stambenih potreba korisnika vojnih penzija: uslov da nije dobrovoljno izgubio mogućnost korišćenja stana na teritoriji bivših republika.",
    keywords: ["vojni penzioner", "dodela stana", "Pravilnik", "voljno odricanje"],
    related_articles: ["Pravilnik o rešavanju stambenih potreba korisnika vojnih penzija"],
    headnote: "Odbijena dodela stana: povlačenje zahteva za povrat stana u inostranstvu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1950/2024",
    legal_area: "civil",
    legal_question:
      "Da li član porodičnog domaćinstva nosioca stanarskog prava ima samostalno pravo na dodelu zamenskog stana u postupku raseljavanja zbog eksproprijacije?",
    court_position:
      "Vrhovni Sud je odbio reviziju tužioca i potvrdio da pravo na dodelu stana iscrpljuje dodela bratu koji je bio nosilac stanarskog prava u vreme eksproprijacije.",
    reasoning:
      "Čl. 16 Zakona o eksproprijaciji vezuje obavezu dodele za nosioca prava korišćenja; tužilac je bio član domaćinstva, ne nosilac; odvojeno pitanje prava na dom u postupku iseljenja.",
    keywords: ["eksproprijacija", "raseljavanje", "stanarsko pravo", "porodično domaćinstvo"],
    related_articles: ["čl. 16 Zakon o eksproprijaciji", "čl. 8 EKLjP"],
    headnote: "Pravo na zamenski stan samo za nosioca stanarskog prava, ne i za člana domaćinstva.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2895/2018",
    legal_area: "civil",
    legal_question:
      "Da li nastavak korišćenja vile posle isteka ugovora o zakupu na godinu dana uz miran pristanak zakupodavca stvara prećutno obnavljanje zakupa na neodređeno vreme?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju, ukinuo nižestepene presude i vratio predmet na ponovno suđenje zbog pogrešne primene prava na prećutno obnavljanje zakupa.",
    reasoning:
      "Kada zakupac ostane u uživanju a zakupodavac se ne protivi, može se raditi o prećutnom obnavljanju na neodređeno vreme po čl. 596 ZOO; ugovorna kazna dvostruke zakupnine posle isteka zahteva posebnu ocenu u tom kontekstu.",
    keywords: ["prećutno obnavljanje", "čl. 596 ZOO", "zakup vile", "ugovorna kazna"],
    related_articles: ["čl. 596 ZOO", "čl. 597 ZOO", "čl. 408 ZPP"],
    headnote: "VKS: moguće prećutno produženje zakupa; presude ukinute radi ponovnog suđenja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3201/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li presude bez dovoljnih razloga o naknadi koristi zbog korišćenja stana povređuju pravo na pravično suđenje?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje jer pobijane presude nisu bile dovoljno obrazložene u odnosu na sticanje bez osnova i naknadu.",
    reasoning:
      "Potrebno jasno odrediti osnov, visinu naknade i primenu čl. 104 i drugih odredaba u vezi sa vraćanjem kupoprodajne cene i korišćenjem stana.",
    keywords: ["ustavna žalba", "pravično suđenje", "naknada koristi", "sticanje bez osnova"],
    related_articles: ["čl. 32 Ustava RS", "čl. 6 EKLjP"],
    headnote: "Ustavni Sud: neobrazložena presuda o naknadi koristi — povreda prava.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2980/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li višedecenijsko vođenje upravnog postupka za iseljenje zakupca povređuje pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, utvrdio povredu prava na suđenje u razumnom roku, dosudio nematerijalnu štetu i naložio hitno okončanje postupka pred organom.",
    reasoning:
      "Podnositeljka se pozivala na imovinska prava i diskriminaciju; organ nije okončao postupak iseljenja/preseljenja u razumnom roku; veza sa izmenama propisa o stanovanju i planiranju.",
    keywords: ["razuman rok", "upravni postupak", "iseljenje", "nematerijalna šteta"],
    related_articles: ["čl. 32 Ustava RS", "čl. 6 EKLjP"],
    headnote: "Ustavni Sud: neprihvatljivo trajanje upravnog iseljenja; naknada i nalog organu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 19674/2022",
    legal_area: "civil",
    legal_question:
      "Da li sticanje drugog useljivog stana u svojinu člana domaćinstva zakupca opravdava otkaz zakupa i iseljenje po čl. 35 st. 1 tač. 4 Zakona o stanovanju?",
    court_position:
      "Vrhovni Sud je odbio revizije obe strane i potvrdio iseljenje tužene koja je nasledila odgovarajući stan, uz odbijanje zahteva za naknadu štete jer je korišćenje bilo zakonito do presude.",
    reasoning:
      "Kriterijumi adekvatnosti i kvaliteta života; tužena nije trpela razliku tržišne i plaćene zakupnine jer tužioci nisu tražili novi ugovor o povećanju.",
    keywords: ["čl. 35 tač. 4 Zakon o stanovanju", "iseljenje", "drugi stan", "nasledstvo"],
    related_articles: ["čl. 35 st. 1 tač. 4 Zakon o stanovanju"],
    headnote: "Iseljenje potvrđeno: sticanje odgovarajućeg stana u svojinu; naknada odbijena.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 20883/2023",
    legal_area: "civil",
    legal_question:
      "Da li zakupac koji posle otkaza koristi lokal bez osnova i izdaje ga u podzakup duguje naknadu u visini tržišne zakupnine ograničenu tužbenim zahtevom?",
    court_position:
      "Vrhovni Sud je odbio reviziju tuženog i potvrdio iseljenje i naknadu za korišćenje posle otkaza, u granicama opredeljenog tužbenog zahteva.",
    reasoning:
      "Čl. 37 Zakona o osnovama svojinskopravnih odnosa i čl. 219 ZOO; sud ne utvrđuje kompenzaciju van tužbenog zahteva i bez protivtužbe; dogovor o otplati duga kroz zakupninu nije istaknut.",
    keywords: ["lokal", "podzakup", "čl. 219 ZOO", "naknada koristi"],
    related_articles: ["čl. 37 Zakona o osnovama svojinskopravnih odnosa", "čl. 219 ZOO"],
    headnote: "Korišćenje lokala posle otkaza i podzakup: iseljenje i naknada potvrđeni.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 138/2021",
    legal_area: "civil",
    legal_question:
      "Da li se može iseliti zakupac čiji zakupodavac nije utvrdio zakupninu po čl. 32 Zakona o stanovanju ako je stan dom tužene po čl. 8 EKLjP?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje iseljenja radi zaštite prava na dom i preinačio odbijanje protivtužbe za svojinu održajem jer zakupac nije savestan držalac.",
    reasoning:
      "Dugotrajno korišćenje od 1993, socijalna ugroženost, poslodavac i stečaj; održaj zahteva savesnu državinu; nejasna zakupnina po zakonu ne oslabada zaštitu doma.",
    keywords: ["čl. 8 EKLjP", "čl. 32 Zakon o stanovanju", "održaj", "iseljenje"],
    related_articles: ["čl. 8 EKLjP", "čl. 32 Zakon o stanovanju", "čl. 16 Ustava RS"],
    headnote: "Iseljenje odbijeno (dom); protivtužba za održaj odbijena.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 940/2023",
    legal_area: "civil",
    legal_question:
      "Da li zakupodavac može tražiti naknadu komunalnih troškova ako nije dokazao da je platio račune komunalnim preduzećima?",
    court_position:
      "Apelacioni sud je potvrdio dug za zakupninu poslovnog prostora, a preinačio deo o komunalijama jer tužilac nije dokazao da je pretrpeo štetu plaćanjem računa.",
    reasoning:
      "Teret dokazivanja štete na tužiocu po čl. 231 ZPP; za zakupninu spor o ostalom delu do traženog iznosa odbijen kao neosnovan.",
    keywords: ["komunalije", "teret dokazivanja", "zakup poslovnog prostora", "šteta"],
    related_articles: ["čl. 231 ZPP", "čl. 262 ZOO"],
    headnote: "Dug zakupnine potvrđen; komunalije smanjene jer nema dokaza o plaćanju od strane tužioca.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 926/2020",
    legal_area: "civil",
    legal_question:
      "Da li duže neizvršavanje ugovora o zakupu poslovnog prostora od strane obeju strana dovodi do prestanka ugovora i obaveze predaje prostora?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju zakupaca i potvrdio iseljenje iz poslovnog prostora jer je ugovor faktički prestao, a raskid je uručen sa rokom za predaju.",
    reasoning:
      "Dug za zakupninu i aneksi; rekonstrukcija objekta; raskid od 08.05.2017. sa pozivom na plaćanje po presudi i iseljenjem posle 30 dana.",
    keywords: ["raskid zakupa", "poslovni prostor", "iseljenje", "neizvršavanje"],
    related_articles: ["čl. 262 ZOO", "ZOO"],
    headnote: "VKS: faktički prestanak zakupa i obaveza predaje poslovnog prostora.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1637/2017",
    legal_area: "civil",
    legal_question:
      "Od kog trenutka zakupodavac može tražiti naknadu za korišćenje poslovnog prostora ako je kupoprodajni ugovor zakupca pravnosnažno proglašen ništavim?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio da naknada po sticanju bez osnova pripada tek od pravnosnažnosti presude o ništavosti, jer do tada zakupac nije bio nesavestan držalac.",
    reasoning:
      "Čl. 219 ZOO; period korišćenja po valjanom ugovoru o zakupu do poništanja kupoprodaje ne daje istu osnovu kao posle iseljenja po ništavosti.",
    keywords: ["ništavost kupoprodaje", "naknada koristi", "savestan držalac", "čl. 219 ZOO"],
    related_articles: ["čl. 219 ZOO"],
    headnote: "Naknada za lokal tek posle pravnosnažnog utvrđenja ništavosti kupoprodaje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5206/2022",
    legal_area: "civil",
    legal_question:
      "Da li se kamata na izmaklu dobit po zakupu vozila obračunava od ranijeg datuma ili od dana veštačenja?",
    court_position:
      "Apelacioni sud je potvrdio dug po ugovoru o zakupu vozila i izmaklu dobit, a preinačio deo o kamati tako da teče od dana veštačenja, ne od ranijeg datuma.",
    reasoning:
      "Nalaz veštaka sa varijantama obračuna; primena pravilnika struke za zateznu kamatu na izmaklu korist.",
    keywords: ["zakup vozila", "izmakla dobit", "kamata", "veštačenje"],
    related_articles: ["čl. 277 ZOO", "čl. 262 ZOO"],
    headnote: "Dug i izmakla dobit potvrđeni; kamata od datuma nalaza veštaka.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 1932/2016",
    legal_area: "administrative",
    legal_question:
      "Da li grubo zanemarivanje dužnosti staratelja, uključujući neplaćanje duga za smeštaj i postupanje oko zakupa stana štićenika, opravdava razrešenje staratelja?",
    court_position:
      "Upravni Sud je odbio tužbu protiv rešenja o razrešenju staratelja i potvrdio zakonitost razrešenja zbog ugrožavanja interesa štićenika.",
    reasoning:
      "Izjava staratelja o dugu za smeštaj, izdavanju stana u podzakup i osporavanju obima duga; organ je pravilno ocenio savesnost vršenja starateljske dužnosti.",
    keywords: ["starateljstvo", "razrešenje", "smeštaj", "zakup stana"],
    related_articles: ["Porodični zakon", "Zakon o opštem upravnom postupku"],
    headnote: "Upravni Sud: potvrđeno razrešenje staratelja zbog grubog zanemarivanja dužnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5039/2024",
    legal_area: "commercial",
    legal_question:
      "Da li je potraživanje zakupnine za poslovni prostor obuhvaćeno pravnosnažnim Unapred pripremljenim planom reorganizacije stečajnog dužnika?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe Grada za naplatu zakupnine jer je potraživanje svrstano u klasu poverilaca i obuhvaćeno UPPR kao izvršnom ispravom.",
    reasoning:
      "Dan početka primene plana i konačni presek potraživanja klase D; obračun veštaka poklapa se sa periodom pre obuhvatanja planom.",
    keywords: ["UPPR", "reorganizacija", "stečaj", "zakupnina"],
    related_articles: ["Zakon o stečaju"],
    headnote: "Naplata zakupnine odbijena: potraživanje obuhvaćeno planom reorganizacije.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7968/2022",
    legal_area: "civil",
    legal_question:
      "Da li gradska opština ima aktivnu legitimaciju da naplati zakupninu za poslovni prostor nastalu pre brisanja javnog preduzeća i prenosa poslova na Grad?",
    court_position:
      "Vrhovni kasacioni sud je dozvolio posebnu reviziju, preinačio presude i usvojio tužbeni zahtev utvrđujući aktivnu legitimaciju gradske opštine.",
    reasoning:
      "Prestanak JP i preuzimanje prava i obaveza od strane osnivača; dug zakupnine do iseljenja; veštačenje iznosa.",
    keywords: ["aktivna legitimacija", "gradska opština", "JP", "zakupnina"],
    related_articles: ["čl. 50 ZPP", "ZOO"],
    headnote: "VKS: opština može da naplati zakupninu nastalu pre brisanja javnog preduzeća.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4470/2022",
    legal_area: "civil",
    legal_question:
      "Da li je Republika Srbija pasivno legitimisana u tužbi za naknadu štete zbog upravljanja stanom preko Direkcije za oduzetu imovinu?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe protiv Republike jer je pasivno legitimisana Direkcija kao samostalno pravno lice, a organi RS nisu nezakonito postupali.",
    reasoning:
      "Predmet oduzimanja, zakup preko Direkcije, isplate naknade od zakupa; tužba usmerena na pogrešnog tuženog.",
    keywords: ["pasivna legitimacija", "Direkcija za oduzetu imovinu", "naknada štete"],
    related_articles: ["Zakon o upravljanju oduzetom imovinom"],
    headnote: "Protiv RS odbijena tužba: pasivna legitimacija Direkcije za oduzetu imovinu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 838/2022",
    legal_area: "commercial",
    legal_question:
      "Da li fizičko lice ostaje odgovorno za dug po ugovoru o zakupu poslovnog prostora korišćenog za preduzetničku delatnost posle brisanja preduzetnika iz registra?",
    court_position:
      "Apelacioni sud je potvrdio solidarnu odgovornost tuženog za zakupninu i režijske troškove; brisanje preduzetnika ne gasi obavezu fizičkog lica koje je ugovorno obavezano.",
    reasoning:
      "Sporazum o priznanju duga i primopredaja; EURIBOR valorizacija; čl. 262 ZOO i obligaciona solidarnost prema ugovoru.",
    keywords: ["preduzetnik", "solidarna odgovornost", "zakup poslovnog prostora", "brisanje iz registra"],
    related_articles: ["čl. 262 ZOO", "Zakon o privrednim društvima"],
    headnote: "Dug zakupnine: fizičko lice odgovara uprkos brisanju preduzetnika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1822/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li je osnovan zahtev za povraćaj plaćene zakupnine za period u kome je istovremeno tekao otkup stana po pravnosnažnom rešenju?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu protiv presude koja je odbila zahtev za sticanje bez osnova jer je postojao valjan osnov za plaćanje zakupnine do pravnosnažnosti rešenja o otkupu.",
    reasoning:
      "Paralelno plaćanje otkupne cene i zakupnine do dana izvršnosti rešenja; otpadanje osnova za zakupninu od momenta utvrđenja prava na otkup u iznosu koji obuhvata period.",
    keywords: ["otkup stana", "zakupnina", "sticanje bez osnova", "ustavna žalba"],
    related_articles: ["čl. 201 ZOO", "Zakon o stanovanju"],
    headnote: "Ustavni Sud: nema povrede prava — zakupnina i otkup u istom periodu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1022/2013",
    legal_area: "civil",
    legal_question:
      "Od kog trenutka teče zatezna kamata na dospelu neplaćenu zakupninu kada je zakupnina ugovorena kao povremeno novčano davanje?",
    court_position:
      "Apelacioni sud je potvrdio da po čl. 279 st. 3 ZOO kamata na mesečne zakupnine teče od dana podnošenja sudu zahteva za isplatu, a ne od dospelosti svake rate.",
    reasoning:
      "Ugovorena mesečna zakupnina sa datumom dospelosti; kasnije proširenje tužbenog zahteva posle veštačenja ne može proširiti kamatu suprotno čl. 279 st. 3 ZOO.",
    keywords: ["zatezna kamata", "čl. 279 st. 3 ZOO", "zakupnina", "povremena davanja"],
    related_articles: ["čl. 279 st. 3 ZOO"],
    headnote: "Kamata na zakupninu: od podnošenja zahteva sudu, ne od dospelosti svake rate.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1645/2019",
    legal_area: "civil",
    legal_question:
      "Da li je osnovana tužba za iseljenje ako je tuženi ostvario pravo na stan po pravnosnažnoj odluci Komisije potvrđenoj u parnici o poništaju?",
    court_position:
      "Vrhovni kasacioni sud je preinačio drugostepenu presudu i potvrdio prvostepenu kojom je odbijen zahtev za iseljenje jer tuženi ima valjan osnov za korišćenje stana.",
    reasoning:
      "Pravnosnažna odluka Apelacionog suda u Kragujevcu o poništaju ranije odluke i potvrdi dodele stana tuženom; ugovor na privremeno korišćenje i pravo zakupa na neodređeno vreme.",
    keywords: ["iseljenje", "pravnosnažnost", "dodela stana", "Komisija"],
    related_articles: ["Zakon o stanovanju", "ZPP"],
    headnote: "VKS: potvrđeno odbijanje iseljenja — pravno osnovano pravo korišćenja stana.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2123/2024",
    legal_area: "civil",
    legal_question:
      "Da li je Direkcija za građevinsko zemljište pasivno legitimisana u tužbi za utvrđenje prava zakupa na stan u vlasništvu Grada Beograda?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom je odbijen zahtev za utvrđenje prava zakupa protiv Direkcije jer vlasnik stana nije Direkcija već Grad Beograd.",
    reasoning:
      "Ugovor o zakupu na pet godina sa uslovima iz Zakona o eksproprijaciji; pasivna legitimacija mora odgovarati nosiocu prava raspolaganja.",
    keywords: ["pasivna legitimacija", "Direkcija", "Grad Beograd", "pravo zakupa"],
    related_articles: ["čl. 50 ZPP", "Zakon o eksproprijaciji"],
    headnote: "Odbijena tužba protiv Direkcije: vlasnik stana je Grad, ne Direkcija.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2533/2017",
    legal_area: "civil",
    legal_question:
      "Da li tužilja može tražiti naknadu štete u vidu plaćene zakupnine za podstanarstvo zbog nezakonite dodele stana drugom licu?",
    court_position:
      "Vrhovni kasacioni sud je delimično usvojio reviziju tužilje i ukinuo drugostepenu presudu u delu odbijanja naknade stvarne štete, utvrđujući da šteta u plaćenim zakupninama teče od pravnosnažnosti poništaja nezakonitih akata.",
    reasoning:
      "Period podstanarstva majke sa decom; nezakonita dodela stana trećem licu; veza uzrokovanja i obima naknade posle poništaja presudama Osnovnog suda u Novom Sadu.",
    keywords: ["naknada štete", "podstanarstvo", "nezakonita dodela", "stambena solidarnost"],
    related_articles: ["čl. 154 st. 1 ZOO", "čl. 155 ZOO"],
    headnote: "VKS: naknada zakupnine podstanara od pravnosnažnosti poništaja dodele stana.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 4109/2023",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni angažovan kao lokalno osoblje u inostranstvu može tražiti naknadu troškova zakupa stana kao upućeni radnik?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio da nema pravo na refundaciju zakupa jer nije bio upućeni radnik iz zemlje i nije ispunio formalne uslove za naknadu.",
    reasoning:
      "Ugovor o radu na određeno vreme u predstavništvu; poseban ugovor o zakupu u inostranstvu bez zahteva Komori za naknadu; samostalno plaćanje zakupnine.",
    keywords: ["lokalno osoblje", "naknada troškova", "zakup stana", "upućivanje"],
    related_articles: ["Zakon o radu"],
    headnote: "Odbijena naknada zakupa u inostranstvu za lokalno zaposleno osoblje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8011/2022",
    legal_area: "civil",
    legal_question:
      "Da li je sud dužan da utvrdi da li je zakupodavac zaista platio režijske troškove pre dosuđivanja zakupcu naknade za struju, smeće i telefon?",
    court_position:
      "Vrhovni Sud je usvojio reviziju tužioca, ukinuo presudu Apelacionog suda i vratio predmet na ponovno suđenje zbog pogrešne primene materijalnog prava.",
    reasoning:
      "Posle iseljenja zakupca ostali dugovi na ime komunalija; potrebno utvrditi da li je zakupodavac platio troškove i pretrpeo štetu pre obaveze zakupca na naknadu.",
    keywords: ["režijski troškovi", "teret dokazivanja", "naknada", "lokal"],
    related_articles: ["čl. 403 st. 2 ZPP", "čl. 408 ZPP", "čl. 262 ZOO"],
    headnote: "Vrhovni Sud ukida PAS: nedostaje utvrđivanje da li je zakupodavac platio račune.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1284/2021",
    legal_area: "civil",
    legal_question:
      "Da li vlasnik stana može tražiti naknadu izmakle koristi protiv lica koje protivpravno koristi stan posle krivičnog osude?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tuženi obavezan na naknadu štete u vidu izmakle koristi po nalazu veštaka za period protivpravnog korišćenja.",
    reasoning:
      "Krivična presuda za protivpravno useljenje; prinudno iseljenje 2015; primena čl. 154–155 ZOO na štetu zbog lišenja mogućnosti izdavanja stana u zakup.",
    keywords: ["izmakla korist", "protivpravno useljenje", "krivična presuda", "veštačenje"],
    related_articles: ["čl. 154 ZOO", "čl. 155 ZOO"],
    headnote: "Potvrđena naknada izmakle koristi za duže protivpravno držanje stana.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 873/2024",
    legal_area: "civil",
    legal_question:
      "Da li hipoteka i založna izjava vlasnika stana sprečavaju tužbu za iseljenje osoba koje stan koriste bez pravnog osnova?",
    court_position:
      "Apelacioni sud je odbio žalbu tuženih i potvrdio iseljenje jer upisani vlasnik ima pravo zahtevati predaju stana, a navodi o hipoteci i katastru nisu odlučujući.",
    reasoning:
      "Tužba za iseljenje 2021 posle zahteva 2018; čl. 597 ZOO o otkaznom roku; vlasništvo tužioca kao osnov zahteva.",
    keywords: ["iseljenje", "hipoteka", "vlasnik", "čl. 597 ZOO"],
    related_articles: ["čl. 597 ZOO", "Zakon o osnovama svojinskopravnih odnosa"],
    headnote: "Potvrđeno iseljenje: hipoteka ne sprečava zaštitu svojine vlasnika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1114/2024",
    legal_area: "civil",
    legal_question:
      "Da li tužilac može od Direkcije, Grada i Zavoda za izgradnju tražiti dodelu zamenskog stana posle eksproprijacije ako je ugovor o kupoprodaji raskinut?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva prema Direkciji, ali je ukinuo presudu u odnosu na Grad Beograd i Zavod za izgradnju i vratio predmet radi utvrđivanja obaveze dodele zamenskog stana.",
    reasoning:
      "Pitanje pasivne legitimacije Grada naspram samostalnih pravnih lica; raskid ugovora i posledice po čl. 132 ZOO; obaveza eventualno kao naknada štete.",
    keywords: ["eksproprijacija", "zamenski stan", "pasivna legitimacija", "Zavod za izgradnju"],
    related_articles: ["čl. 132 ZOO", "Zakon o eksproprijaciji"],
    headnote: "Delimično ukinuta presuda: obaveza prema Gradu i Zavodu za zamenski stan za ponovno suđenje.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2647/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li je odluka Apelacionog suda kojom je tužiocu priznato pravo zakupca stana na neodređeno vreme proizvoljna i suprotna pravu vlasnika na imovinu i pravičnom suđenju?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu vlasnika stana jer odluka redovnog suda nije proizvoljna i nije utvrđena povreda prava na pravično suđenje niti prava na imovinu.",
    reasoning:
      "Složena veza nasledstva, sporova o doživotnom izdržavanju, upravnog postupka za iseljenje i istorije upisa; ocena merita u granicama slobodne ocene sudova.",
    keywords: ["ustavna žalba", "zakup na neodređeno vreme", "vlasnik", "pravično suđenje"],
    related_articles: ["čl. 29 Ustava RS", "čl. 58 Ustava RS", "čl. 6 EKLjP"],
    headnote: "Ustavni Sud: odbijena žalba vlasnika protiv priznanja prava zakupca.",
    outcome: "defendant_won",
  },
]
