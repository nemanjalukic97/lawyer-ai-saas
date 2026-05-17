// scripts/case-law-civil-serbia-3.ts
// Serbian case law: zastarelost (civil, krivično, poresko, upravno, ustavno) — batch 1 of 3.

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CIVIL_SERBIA_3: CaseLawInput[] = [
  // ── BATCH 1 (1/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 5143/2019",
    legal_area: "commercial",
    legal_question:
      "Da li je potraživanje javnih prihoda u stečaju zastarelo kada postoji zastoj zastarelosti tokom mirovanja poreskog duga po gradskoj odluci?",
    court_position:
      "Privredni apelacioni sud je preinačio prvostepenu presudu i utvrdio osnovanost potraživanja, produživši apsolutnu zastarelost za period zastoja i prihvativši prekid zastarelosti opomenom.",
    reasoning:
      "Za period zastoja od 01.11.2012. do 31.12.2014. produžava se rok apsolutne zastarelosti. Prijava u stečaj 15.04.2016. je blagovremena jer u posmatranom intervalu nije protekao apsolutni rok uz produženje od dve godine i dva meseca. Za poreski postupak važe i čl. 114 ZPPPA o početku tečenja i čl. 114d o prekidu opomenom 26.10.2009.",
    keywords: ["zastarelost", "stečaj", "javni prihodi", "zastoj", "Pž"],
    related_articles: ["Zakon o poreskom postupku i poreskoj administraciji", "Zakon o stečaju"],
    headnote: "PAS: zastoj zastarelosti poreza produžava apsolutni rok; potraživanje u stečaju osnovano.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 909/2022",
    legal_area: "civil",
    legal_question:
      "Da li se na zastarelost naknade štete iz krivičnog dela primenjuje apsolutni rok iz čl. 104 st. 6 KZ ili relativni rok vezan za krivično gonjenje po čl. 377 ZOO?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu koja je tužbu odbila kao zastarelu primenom apsolutnog roka KZ, jer je čl. 377 st. 1 ZOO vezao rok za štetu na rok zastarelosti krivičnog gonjenja kada je predviđen duži rok, a st. 2–3 prekid i zastoj krivičnog gonjenja povlače isto za civilni zahtev.",
    reasoning:
      "Rok iz čl. 377 st. 1 ZOO nije identičan apsolutnom roku iz čl. 104 st. 6 KZ koji ne podleže prekidu; ZOO ne upućuje na taj apsolutni režim za naknadu štete. Pravilno je primeniti relativni rok krivičnog gonjenja sa mogućnošću prekida imovinsko-pravnim zahtevom u krivičnom postupku.",
    keywords: ["zastarelost", "čl. 377 ZOO", "krivično gonjenje", "naknada štete"],
    related_articles: ["čl. 377 ZOO", "čl. 103–104 KZ"],
    headnote: "Šteta iz krivičnog dela: primena čl. 377 ZOO, ne apsolutnog roka čl. 104 st. 6 KZ kao jedini limit.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 987/2022",
    legal_area: "commercial",
    legal_question:
      "Da li jedini član brisanog d.o.o. odgovara za dug po kreditu društva i da li rate kredita predstavljaju povremena potraživanja sa trogodišnjim rokom?",
    court_position:
      "Apelacioni sud je potvrdio obavezu jedinog članа na dug po kreditu brisanog d.o.o. uz neograničenu solidarnu odgovornost kontrolnog člana i odbio prigovore o zastarelosti i kamati.",
    reasoning:
      "Brisanje iz registra 28.08.2019; rok od tri godine od brisanja za potraživanja poverilaca prema članu po ZPD nije istekao. Kredit-anuiteti nisu povremena davanja u smislu čl. 372 ZOO već jedinstveno potraživanje sa desetogodišnjim rokom po čl. 371 ZOO. Instrumenti obezbeđenja i raskid u ugovoru predviđeni su kao pravo, ne obaveza kreditora.",
    keywords: ["d.o.o.", "likvidacija", "kredit", "kontrolni član", "zastarelost"],
    related_articles: ["čl. 371 ZOO", "čl. 548 Zakon o privrednim društvima"],
    headnote: "Član brisanog d.o.o. i kontrolni član: dug po kreditu; anuiteti nisu povremena potraživanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2747/2019",
    legal_area: "civil",
    legal_question:
      "Da li je potraživanje naknade štete od klizišta zastarelo po trogodišnjem roku od saznanja ili po objektivnom roku iz čl. 376 st. 2 ZOO?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilaca i potvrdio zastarelost, jer je objektivni rok od pet godina od nastanka štete istekao pre tužbe.",
    reasoning:
      "Čl. 376 st. 2 ZOO predviđa objektivni rok koji teče od momenta prouzrokovane štete bez obzira na saznanje oštećenog za štetu i štetnika. Tužba podneta nakon pet godina od štetnog događaja je zastarela.",
    keywords: ["zastarelost", "klizište", "čl. 376 ZOO", "objektivni rok"],
    related_articles: ["čl. 376 st. 1–2 ZOO"],
    headnote: "Potvrđena zastarelost naknade štete po petogodišnjem objektivnom roku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5117/2023",
    legal_area: "civil",
    legal_question:
      "Da li je prigovor zastarelosti osnovan za naknadu nematerijalne štete posle fizičkog napada kada je imovinski zahtev istaknut u krivičnom postupku?",
    court_position:
      "Apelacioni sud je preinačio oslobađajuću presudu i dosudio naknadu za bol i strah, smatrajući da prekid zastarelosti krivičnog gonjenja prekida i rok za štetu po čl. 377 st. 2 ZOO.",
    reasoning:
      "Za krivično delo sa zaprećenom kaznom do pet godina važe odredbe čl. 377 ZOO u vezi sa KZ; apsolutna zastarelost krivičnog gonjenja nije istekla u trenutku tužbe. Imovinski zahtev u krivičnom postupku prekida zastarelost civilnog potraživanja.",
    keywords: ["čl. 377 ZOO", "nematerijalna šteta", "prekid", "krivični postupak"],
    related_articles: ["čl. 377 ZOO", "čl. 200 ZOO"],
    headnote: "Naknada za bol i strah posle napada: prekid zastarelosti kroz krivični postupak.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3234/2021",
    legal_area: "civil",
    legal_question:
      "Da li je potraživanje ratnog veterana za PTSP zastarelo primenom apsolutnog roka za krivično delo oružane pobune?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i utvrdio da potraživanje nije zastarelo jer je tok zastarelosti bio u zastoju tokom ratnog stanja u BiH.",
    reasoning:
      "Prvostepeni sud je pogrešno primenio čl. 377 ZOO i rok za oružanu pobunu bez zastoja ratnog stanja. Žalba tužioca ukazuje na pogrešan zaključak o zastarelosti za umanjenje životne aktivnosti.",
    keywords: ["PTSP", "ratni veteran", "zastoj zastarelosti", "čl. 377 ZOO"],
    related_articles: ["čl. 377 ZOO", "čl. 383 ZOO"],
    headnote: "PTSP veterana: zastoj zastarelosti u ratu; preinačenje u korist tužioca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2338/2024",
    legal_area: "civil",
    legal_question:
      "Da li je prigovor zastarelosti osnovan za naknadu posle razbojništva kada je krivična presuda pravnosnažna 24.04.2017. a tužba 28.05.2014.?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom su i tužilac i tuženi delimično nagrađeni nematerijalnom štetom uz doprinos 50% i odbio zastarelost po čl. 377 ZOO i KZ.",
    reasoning:
      "Za razbojništvo sa kaznom do 15 godina zastarelost krivičnog gonjenja i civilnog zahteva prati prekide procesnih radnji; apsolutni rok 30 godina od dela nije protekao. Kamata od presuđenja po čl. 277 st. 1 ZOO pravilna je za nematerijalnu štetu.",
    keywords: ["razbojništvo", "čl. 377 ZOO", "prekid zastarelosti", "doprinos"],
    related_articles: ["čl. 377 ZOO", "čl. 277 st. 1 ZOO", "čl. 103–104 KZ"],
    headnote: "Razbojništvo: zastarelost odbijena; prekid tokom krivičnog postupka; kamata od presuđenja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 816/2016",
    legal_area: "civil",
    legal_question:
      "Da li se na štetu iz čl. 297 st. 3 KZ primenjuje trogodišnji rok iz čl. 376 ZOO ili duži rok vezan za krivično gonjenje?",
    court_position:
      "Apelacioni sud je preinačio presudu i usvojio naknadu materijalne štete, jer za štetu iz krivičnog dela sa kaznom preko tri godine važi čl. 377 ZOO, pa tužba 17.07.2012. nije zastarela u odnosu na događaj i apsolutni rok od 10 godina.",
    reasoning:
      "Opšti rok čl. 376 ZOO ne isključuje čl. 377 kada postoji pravnosnažna osuda za krivično delo sa dužim gonjenjem. Oštećeni ima pravo prema osiguravaču do limita po čl. 941 ZOO nezavisno od promena u odnosu osiguranika prema osiguravaču.",
    keywords: ["saobraćaj", "čl. 377 ZOO", "osiguranje", "čl. 941 ZOO"],
    related_articles: ["čl. 376 ZOO", "čl. 377 ZOO", "čl. 941 ZOO"],
    headnote: "Šteta iz krivičnog dela sa kaznom preko 3 godine: čl. 377 ZOO, ne samo čl. 376.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3933/2015",
    legal_area: "constitutional",
    legal_question:
      "Da li je pravo na pravično suđenje povređeno kada sudovi primene desetogodišnji opšti rok zastarelosti umesto roka vezanog za krivično gonjenje za štetu iz saobraćaja?",
    court_position:
      "Ustavni Sud je usvojio žalbu, poništio presudu Višeg suda i utvrdio povredu prava na pravično suđenje zbog pogrešne primene rokova zastarelosti.",
    reasoning:
      "Zastarelost civilnog zahteva vezuje se za zastarelost krivičnog gonjenja kada postoji pravnosnažna presuda za delo kojim je nastala šteta; apsolutni rok KZ može biti duži od opšteg čl. 376 ZOO i tada je merodavan. Tužba 29.12.2011. nije zastarela u odnosu na događaj 31.05.2008. i krivični postupak.",
    keywords: ["Ustavni sud", "zastarelost", "čl. 377 ZOO", "pravično suđenje"],
    related_articles: ["čl. 32 Ustava RS", "čl. 377 ZOO", "čl. 104 KZ"],
    headnote: "Ustavni Sud: pogrešan opšti rok umesto roka vezanog za krivično gonjenje — povreda čl. 32.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 107/2022",
    legal_area: "civil",
    legal_question:
      "Da li se na naknadu štete od oružane pobune primenjuje tridesetogodišnji rok iz čl. 99 st. 5 starog KZJ ili petnaestogodišnji rok po čl. 377 st. 1 ZOO?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio zastarelost potraživanja u roku od 15 godina od izvršenja dela oružane pobune.",
    reasoning:
      "Čl. 99 st. 5 KZJ odnosi se na zastarelost izvršenja krivične sankcije, ne na civilnu naknadu po čl. 377 ZOO. Za oružanu pobunu primenjuje se petnaestogodišnji krivični rok kao osnova za civilnu zastarelost; tužba 10.06.2018. kasni.",
    keywords: ["oružana pobuna", "čl. 377 ZOO", "zastarelost", "Rev2"],
    related_articles: ["čl. 377 st. 1 ZOO", "čl. 376 ZOO"],
    headnote: "Šteta od oružane pobune: 15 godina od dela; čl. 99 st. 5 KZJ ne primenljiv na civilnu štetu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 243/2021",
    legal_area: "commercial",
    legal_question:
      "Da li apsolutna zastarelost poreskog potraživanja u stečaju nastupa bez uračunavanja zastoja tokom postupka privatizacije?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presudu PAS i vratio predmet na ponovno odlučivanje jer drugostepeni sud nije utvrdio zastoj po čl. 114z Poreskog zakona tokom privatizacije.",
    reasoning:
      "Za vreme privatizacije poverilac nije mogao preduzimati prinudnu naplatu prema dužniku za potraživanja do 31.12.2007, što predstavlja zastoj zastarelosti. Bez utvrđivanja trajanja privatizacije i prestanka zastoja nije moguće zaključiti apsolutnu zastarelost.",
    keywords: ["porez", "stečaj", "privatizacija", "zastoj", "čl. 114z"],
    related_articles: ["Zakon o poreskom postupku i poreskoj administraciji", "Zakon o privatizaciji"],
    headnote: "VKS ukida PAS: zastoj zastarelosti tokom privatizacije mora se utvrditi pre apsolutne zastarelosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1007/2022",
    legal_area: "civil",
    legal_question:
      "Da li je tužba za naknadu nematerijalne štete zbog smrti sina zastarela po apsolutnom roku od deset godina od krivičnog dela?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilje i potvrdio zastarelost pre isteka subjektivnog roka, jer čl. 377 st. 2 ZOO ne isključuje limit apsolutnim rokom iz čl. 104 st. 6 KZ.",
    reasoning:
      "Prekid zastarelosti krivičnog gonjenja prekida i civilni zahtev, ali apsolutni rok teče od izvršenja dela nezavisno od prekida. Tužba podneta posle isteka deset godina nije osnovana.",
    keywords: ["apsolutna zastarelost", "čl. 377 ZOO", "čl. 104 st. 6 KZ", "smrt"],
    related_articles: ["čl. 377 ZOO", "čl. 104 st. 6 KZ", "čl. 414 ZPP"],
    headnote: "Vrhovni sud: apsolutni rok krivičnog gonjenja limitira i civilnu naknadu po čl. 377 ZOO.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2357/2020",
    legal_area: "civil",
    legal_question:
      "Da li je naknada nematerijalne štete pripadniku JNA u ratu zastarela za petnaest godina od učešća u sukobu?",
    court_position:
      "Vrhovni kasacioni sud je preinačio nižestepene presude i odbio tužbeni zahtev jer je tužba podneta posle petnaest godina od ratnih dejstava.",
    reasoning:
      "Za oružanu pobunu važi petnaestogodišnji rok krivičnog gonjenja koji se primenjuje i na civilnu naknadu po čl. 377 st. 1 ZOO. Čl. 96 st. 6 KZ o izvršiocima i prekidima ne menja ishod za ovu civilnu tužbu. Primena čl. 416 st. 1 ZPP.",
    keywords: ["rat", "oružana pobuna", "zastarelost", "čl. 377 ZOO"],
    related_articles: ["čl. 377 st. 1 ZOO", "čl. 103 KZ", "čl. 416 st. 1 ZPP"],
    headnote: "Naknada za ratno učešće: zastarelost 15 godina; preinačenje u odbijanje tužbe.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 890/2014",
    legal_area: "criminal",
    legal_question:
      "Da li je zahtev za zaštitu zakonitosti osnovan zbog navodne apsolutne zastarelosti za oštećenje poverioca?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev branioca kao neosnovan, utvrdivši da apsolutna zastarelost krivičnog gonjenja nastupa tek 2018. jer je delo izvršeno 2008.",
    reasoning:
      "Za delo čl. 237 st. 2 KZ sa kaznom do pet godina apsolutna zastarelost nastaje dvostruko u odnosu na relativni rok od pet godina od izvršenja. Navodi o bitnoj povredi i zastarelosti su neosnovani.",
    keywords: ["zaštita zakonitosti", "oštećenje poverioca", "zastarelost", "Kzz"],
    related_articles: ["čl. 438 st. 1 tačka 1 ZKP", "čl. 103–104 KZ"],
    headnote: "Kzz: zaštita zakonitosti odbijena; apsolutna zastarelost još nije nastupila.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1151/2020",
    legal_area: "civil",
    legal_question:
      "Da li se privilegovani rok iz čl. 377 ZOO za naknadu štete iz krivičnog dela primenjuje i kada nije doneta pravnosnažna krivična presuda o postojanju dela?",
    court_position:
      "Vrhovni kasacioni sud je prihvatio reviziju, ukinuo presude i vratio predmet jer se čl. 377 ZOO primenjuje samo ako je pravnosnažnom presudom utvrđeno krivično delo i krivica; u suprotnom važi opšti rok čl. 376 ZOO.",
    reasoning:
      "Prekid i zastoj krivičnog gonjenja povlače isto za civilni zahtev samo u režimu čl. 377. Ako krivični postupak nije okončan osudom u vreme prvostepenog presuđivanja, privilegovani rok nije merodavan; treba ispitati čl. 371 i sticanje bez osnova čl. 210 ZOO.",
    keywords: ["čl. 377 ZOO", "pravnosnažna presuda", "opšti rok", "revizija"],
    related_articles: ["čl. 376 ZOO", "čl. 377 ZOO", "čl. 371 ZOO"],
    headnote: "VKS: čl. 377 ZOO samo uz pravnosnažnu krivičnu presudu; u suprotnom čl. 376 ZOO.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5660/2023",
    legal_area: "civil",
    legal_question:
      "Od kada teče rok zastarelosti za PTSP posle učešća u ratu 1991–1992 i da li momenat saznanja za obim štete produžuje rok?",
    court_position:
      "Vrhovni sud je preinačio presude i odbio tužbu jer je potraživanje zastarelo u petnaestogodišnjem roku vezanom za oružanu pobunu, nezavisno od hronifikacije PTSP.",
    reasoning:
      "Za pripadnike JNA u sukobu do 22.05.1992. šteta se smatra posledicom oružane pobune; rok teče od izvršenja dela, ne od duševnih bolova kasnije. Tužba posle 15 godina je zastarela.",
    keywords: ["PTSP", "oružana pobuna", "čl. 377 ZOO", "apsolutni rok"],
    related_articles: ["čl. 377 ZOO", "čl. 124 KZ Jugoslavije"],
    headnote: "PTSP ratnog učesnika: 15 godina od dela; saznanje za posledice ne menja rok.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1119/2017",
    legal_area: "constitutional",
    legal_question:
      "Da li je pravo na pravično suđenje povređeno kada je drugostepeni sud pogrešno računao apsolutnu zastarelost krivičnog gonjenja umesto efekta imovinskog zahteva u krivičnom postupku?",
    court_position:
      "Ustavni Sud je usvojio žalbu, poništio presudu Višeg suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Isticanje imovinskopravnog zahteva u krivičnom postupku prekida zastarelost civilnog potraživanja po čl. 377 st. 2 ZOO. Greška u računanju apsolutnog roka od 11.06.2011. bez tog prekida je ustavnopravno neprihvatljiva.",
    keywords: ["Ustavni sud", "prekid zastarelosti", "imovinski zahtev", "čl. 377 ZOO"],
    related_articles: ["čl. 32 Ustava RS", "čl. 377 st. 2 ZOO", "čl. 104 KZ"],
    headnote: "Ustavni Sud: imovinski zahtev u krivičnom postupku prekida zastarelost naknade štete.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 524/2024",
    legal_area: "civil",
    legal_question:
      "Da li predlog vansudske hipotekarne prodaje prekida desetogodišnji rok zastarelosti iz čl. 371 ZOO?",
    court_position:
      "Vrhovni sud je odbio reviziju dužnika i potvrdio da potraživanje nije zastarelo jer je predlog od 05.10.2011. prekinuo rok i pokrenuo novi desetogodišnji period.",
    reasoning:
      "Rok ne počinje isključivo od proglašenja dospeća 2009. jer je tužilac preduzeo radnju naplate po Zakonu o hipoteci. Ponavljanje istih navoda u reviziji ne menja pravilnu ocenu nižestepenih sudova.",
    keywords: ["hipoteka", "prekid zastarelosti", "čl. 371 ZOO", "kredit"],
    related_articles: ["čl. 371 ZOO", "čl. 388 ZOO", "Zakon o hipoteci"],
    headnote: "Predlog prodaje založne nepokretnosti prekida desetogodišnji rok zastarelosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž4 24/2023",
    legal_area: "civil",
    legal_question:
      "Da li naknada za neovlašćeno korišćenje fonograma zastareva po kraćem roku povremenih potraživanja ili po opštem roku od deset godina?",
    court_position:
      "Apelacioni sud je potvrdio presudu o obavezi plaćanja po čl. 127 Zakona o autorskim pravima sa desetogodišnjim rokom po čl. 371 ZOO, ne čl. 372 ZOO.",
    reasoning:
      "Potraživanje nije povremeno davanje godišnjih intervala već jedinstveno potraživanje pravnog lica; rok teče do predloga za izvršenje. Žalba o vrsti muzike i kvadraturi je neosnovana uz zapisnik o kontroli.",
    keywords: ["fonogram", "srodna prava", "čl. 371 ZOO", "čl. 127 ZASP"],
    related_articles: ["čl. 371 ZOO", "čl. 372 ZOO", "čl. 127 ZASP"],
    headnote: "Naknada za fonogram: opšti rok 10 godina, ne rok povremenih potraživanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13248/2023",
    legal_area: "civil",
    legal_question:
      "Da li su nižestepeni sudovi pravilno primenili apsolutni rok od deset godina od štetnog događaja za naknadu štete iz krivičnog dela posle pravnosnažne osude?",
    court_position:
      "Vrhovni sud je prihvatio reviziju tuženog, ukinuo presude i vratio predmet jer nisu ocenili da li je tužba podneta pre ili posle isteka apsolutnog roka od deset godina od štete.",
    reasoning:
      "Kod čl. 377 ZOO važi veza sa krivičnim gonjenjem i prekidima, ali apsolutni rok čl. 104 st. 6 KZ (dvostruko vreme relativnog) od dana štete mora se eksplicitno oceniti u odnosu na datum tužbe posle pravnosnažnosti krivične presude.",
    keywords: ["izuzetna revizija", "apsolutna zastarelost", "čl. 377 ZOO", "čl. 104 st. 6 KZ"],
    related_articles: ["čl. 377 ZOO", "čl. 103–104 KZ", "čl. 361 ZPP"],
    headnote: "Vrhovni sud: obavezna ocena apsolutnog desetogodišnjeg limita od štetnog događaja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 607/2014",
    legal_area: "civil",
    legal_question:
      "Da li imovinski zahtev u krivičnom postupku prekida zastarelost za naknadu štete iz krivičnog dela sa desetogodišnjim apsolutnim rokom gonjenja?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu koja je odbila prigovor zastarelosti jer je tužba 05.10.2011. podneta pre isteka apsolutnog roka i jer je imovinski zahtev prekinuo zastarelost.",
    reasoning:
      "Za delo čl. 53 st. 1 KZRS apsolutna zastarelost krivičnog gonjenja je 10 godina od dela; rok za tužbu ističe do tog datuma. Čl. 388 ZOO obuhvata i imovinski zahtev u krivičnom postupku kao prekid.",
    keywords: ["imovinski zahtev", "čl. 388 ZOO", "čl. 377 ZOO", "prekid"],
    related_articles: ["čl. 377 ZOO", "čl. 388 ZOO", "čl. 396 st. 2 ZPP"],
    headnote: "Potvrđena naknada štete: imovinski zahtev u krivičnom postupku prekida zastarelost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2799/2019",
    legal_area: "civil",
    legal_question:
      "Da li je tužba za naknadu nematerijalne štete zastarela posle imovinskog zahteva u krivičnom postupku kada je apsolutni rok šest godina od dela?",
    court_position:
      "Vrhovni kasacioni sud je dozvolio izuzetnu reviziju, preinačio presude i odbio tužbu jer je tužba podneta nakon 11.05.2015. (šest godina od dela).",
    reasoning:
      "Za dela sa kaznom do tri godine relativna zastarelost je tri godine, apsolutna šest godina po čl. 103 tačka 5 i čl. 104 st. 6 KZ. Iako je imovinski zahtev prekinuo rok, apsolutni limit i dalje važi i tužba kasni.",
    keywords: ["apsolutna zastarelost", "čl. 377 ZOO", "nedozvoljene polne radnje", "šest godina"],
    related_articles: ["čl. 377 ZOO", "čl. 103–104 KZ"],
    headnote: "VKS: imovinski zahtev prekida relativni rok, ali ne produžava posle apsolutnog limita.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 13238/2010",
    legal_area: "administrative",
    legal_question:
      "Da li je poništaj rešenja o porezu na nasleđe osnovan zbog apsolutne zastarelosti prava na utvrđivanje poreske obaveze?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje jer je organ pogrešno računao zastarelost po novom ZPPPA umesto po Zakonu o porezu na dohodak koji je važio do 2003.",
    reasoning:
      "Za nastalu obavezu merodavan je desetogodišnji apsolutni rok od godine u kojoj je porez trebalo utvrditi po starom zakonu; rok je istekao pre stupanja na snagu ZPPPA. Organ je greškom polazio od saznanja i čl. 114 ZPPPA.",
    keywords: ["porez na nasleđe", "apsolutna zastarelost", "retroaktivnost"],
    related_articles: ["čl. 161 Zakona o porezu na dohodak (1994)", "čl. 199 st. 2 ZUP"],
    headnote: "Upravni sud: porez na nasleđe — merodavan stariji desetogodišnji apsolutni rok.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2140/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li je Upravni sud povredio pravo na pravično suđenje ako nije odlučio o navodima o apsolutnoj zastarelosti vođenja disciplinskog postupka pred komorom?",
    court_position:
      "Ustavni Sud je usvojio žalbu, poništio presudu Upravnog suda i vratio predmet jer je propustio obrazloženu ocenu ključnih navoda.",
    reasoning:
      "Pravilnik predviđa apsolutnu zastarelost vođenja postupka koja obuhvata i fazu nakon pokretanja; Upravni sud mora odgovoriti na argument da je postupak morao prestati po dvostrukom roku od roka za pokretanje.",
    keywords: ["disciplinski postupak", "komora", "apsolutna zastarelost", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "Pravilnik o disciplinskoj odgovornosti"],
    headnote: "Ustavni Sud: ćutanje o apsolutnoj zastarelosti disciplinskog postupka — povreda čl. 32.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2019/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li se na novčanu rentu kao naknadu štete primenjuje opšti rok čl. 376 ZOO ili režim povremenih potraživanja čl. 372–373 ZOO?",
    court_position:
      "Ustavni Sud je usvojio žalbu zbog povrede prava na pravično suđenje i naložio Apelacionom sudu ponavljanje postupka po žalbi.",
    reasoning:
      "Rentu treba tretirati kao povremeno potraživanje po čl. 372 ZOO sa trogodišnjim rokom od dospelosti svakog davanja; čl. 373 reguliše zastarelost osnovnog prava drugačije od stava sudova da sve rente zastareju jednim rokom čl. 376.",
    keywords: ["renta", "povremena potraživanja", "čl. 372 ZOO", "Ustavni Sud"],
    related_articles: ["čl. 372–373 ZOO", "čl. 376 ZOO", "čl. 32 Ustava RS"],
    headnote: "Rentna naknada: merodavni čl. 372–373 ZOO, ne jedinstveni rok čl. 376 za sve tražbine.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1881/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li država odgovara za štetu od terorizma po istom privilegovanom roku kao direktni učinilac krivičnog dela?",
    court_position:
      "Ustavni Sud je usvojio žalbu i utvrdio povredu prava na jednaku zaštitu prava zbog neujednačene prakse; prema državi važe rokovi čl. 376 ZOO, a ne čl. 377 ZOO vezan za krivično gonjenje učinioca.",
    reasoning:
      "Čl. 377 st. 1 ZOO se vezuje za odgovorno lice koje je učinilac krivičnog dela; odgovornost države po čl. 180 ZOO za nasilje i teror nije ista kvalifikacija subjekta za produženi rok.",
    keywords: ["terorizam", "državna odgovornost", "čl. 376 ZOO", "čl. 377 ZOO"],
    related_articles: ["čl. 180 ZOO", "čl. 376 ZOO", "čl. 377 ZOO"],
    headnote: "Šteta od terorizma prema državi: opšti rok čl. 376 ZOO, ne čl. 377 ZOO.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 698/2018",
    legal_area: "criminal",
    legal_question:
      "Od kada teče zastarelost za trajno krivično delo nedavanja izdržavanja koje traje više godina?",
    court_position:
      "Vrhovni kasacioni sud je odbacio zahtev branioca jer kod trajnog dela rok teče od prestanka protivpravnog stanja, pa apsolutna zastarelost nije nastupila do 31.05.2023.",
    reasoning:
      "Radnja izvršenja obuhvata ceo period dok traje propuštanje dužnosti; primena čl. 103 st. 1 tačka 6 i čl. 104 st. 6 KZ od datuma prestanka 31.05.2017.",
    keywords: ["nedavanje izdržavanja", "trajno delo", "zastarelost", "Kzz"],
    related_articles: ["čl. 195 KZ", "čl. 103–104 KZ"],
    headnote: "Nedavanje izdržavanja: početak roka od prestanka protivpravnog stanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 11808/2023",
    legal_area: "civil",
    legal_question:
      "Da li se privilegovani rok čl. 377 ZOO primenjuje kada je krivični postupak obustavljen zbog zastarelosti krivičnog gonjenja?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio zastarelost civilnog potraživanja po opštem roku čl. 376 st. 1 ZOO jer nema pravnosnažne osude o delu.",
    reasoning:
      "Kada je krivični postupak obustavljen zbog zastarelosti gonjenja, nije ispunjen uslov za čl. 377 ZOO; tužba 29.02.2016. kasni u odnosu na saznanje i prestanak bolova 2007.",
    keywords: ["obustava", "zastarelost krivičnog gonjenja", "čl. 376 ZOO", "čl. 377 ZOO"],
    related_articles: ["čl. 376 st. 1 ZOO", "čl. 377 ZOO"],
    headnote: "Obustava krivičnog postupka zbog zastarelosti: primena čl. 376 ZOO, ne čl. 377 ZOO.",
    outcome: "defendant_won",
  },
  // ── BATCH 2 (2/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5126/2020",
    legal_area: "civil",
    legal_question:
      "Od kada teče desetogodišnji rok zastarelosti za potraživanje povraćaja neosnovano isplaćene porodične invalidnine (sticanje bez osnova)?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju Republike Srbije i potvrdio da je potraživanje zastarelo, jer rok teče od dana neosnovanog prelaza imovine, a ne od saznanja poverioca.",
    reasoning:
      "Kod sticanja bez osnova saznanje ne pomera početak roka; rok počinje prvog dana posle dana kada je poverilac mogao tražiti ispunjenje (čl. 360–362, 371 ZOO). Dan smrti korisnika invalidnine kada je otpao osnov isplate merodavan je za početak toka.",
    keywords: ["sticanje bez osnova", "invalidnina", "čl. 371 ZOO", "zastarelost"],
    related_articles: ["čl. 360–362 ZOO", "čl. 371 ZOO"],
    headnote: "Povraćaj neosnovane invalidnine: deset godina od dana neosnovanog obogaćenja, ne od saznanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1552/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li je u krivičnom postupku za nasilje u porodici (delo 9.12.2007) nastupila apsolutna zastarelost krivičnog gonjenja pre pravnosnažnosti presude?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu osuđenog jer apsolutna zastarelost nije nastupila do donošenja presude: relativna bi bila 9.12.2009, apsolutna 9.12.2011.",
    reasoning:
      "Relativna zastarelost se prekida procesnim radnjama; apsolutna teče od izvršenja dela i ne prekida se. Krivično delo čl. 194 st. 5 KZ izvršeno 9.12.2007.",
    keywords: ["nasilje u porodici", "apsolutna zastarelost", "čl. 103–104 KZ", "Ustavni sud"],
    related_articles: ["čl. 103–104 KZ", "čl. 194 KZ"],
    headnote: "Ustavni Sud: nasilje u porodici 2007 — apsolutna zastarelost nije nastupila pre okončanja postupka.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1139/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li se na državu kao tuženu u sporu za izgubljeno izdržavanje primenjuje duži rok iz čl. 377 ZOO vezan za krivično gonjenje učinioca?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu i potvrdio stav redovnih sudova da čl. 377 ZOO važi prema učiniocu krivičnog dela, a prema državi po čl. 180 ZOO rokovi iz čl. 376 ZOO.",
    reasoning:
      "Odgovorno lice po čl. 377 st. 1 ZOO jeste učinilac; državna odgovornost za posledice krivičnog dela nije isti subjekat za privilegovani rok. Potraživanje prema državi zastareva po opštim rokovima čl. 376 st. 1–2 ZOO.",
    keywords: ["izgubljeno izdržavanje", "država", "čl. 376 ZOO", "čl. 377 ZOO"],
    related_articles: ["čl. 376 st. 1–2 ZOO", "čl. 377 st. 1 ZOO", "čl. 180 ZOO"],
    headnote: "Naknada od države za štetu od krivičnog dela: čl. 376 ZOO, ne čl. 377 ZOO prema državi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 8275/2015",
    legal_area: "administrative",
    legal_question:
      "Od kada teče desetogodišnji apsolutni rok zastarelosti utvrđivanja poreza na prenos apsolutnih prava ako je ugovor zaključen 2003. a rešenje doneto kasnije?",
    court_position:
      "Upravni Sud je odbio tužbu jer poreska obaveza nastaje danom saznanja poreskog organa za prenos (4.3.2014), pa rok iz čl. 114ž ZPPPA nije istekao u odnosu na osporeno rešenje.",
    reasoning:
      "Prigovor da je rok tekao od zaključenja ugovora 2003. je neosnovan jer početak zastarelosti prati moment nastanka obaveze po čl. 29 st. 7 Zakona o porezima na imovinu u vezi sa saznanjem organa.",
    keywords: ["porez na prenos", "apsolutna zastarelost", "saznanje organa", "čl. 114ž"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 29 st. 7 Zakona o porezima na imovinu"],
    headnote: "Porez na prenos: rok zastarelosti od saznanja organa za promet, ne od starog ugovora.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 7371/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je pravo na utvrđivanje poreza na kapitalni dobitak zastarelo kada poreski obveznik kasno podnese prijavu?",
    court_position:
      "Upravni Sud je odbio tužbu: obaveza nastaje danom saznanja organa (dan podnošenja prijave 30.06.2014), pa apsolutna zastarelost po čl. 114ž ne bi nastupila pre 31.12.2016.",
    reasoning:
      "Kad prijava nije blagovremena, ne teče rok od zaključenja ugovora 2006. već od prijave; primena čl. 95 Zakona o porezu na dohodak građana i čl. 72 st. 1 tačka 1 istog zakona.",
    keywords: ["kapitalni dobitak", "kasna prijava", "čl. 114ž ZPPPA", "saznanje"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 29 st. 7 Zakona o porezima na imovinu", "Zakon o PDG"],
    headnote: "Kapitalni dobitak bez blagovremene prijave: početak zastarelosti od dana prijave.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 14528/2015",
    legal_area: "administrative",
    legal_question:
      "Da li prekid zastarelosti izmenama ZPPPA 2007. sprečava zastarelost poreza na kapitalni dobitak od prodaje nepokretnosti?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio da nije nastupila ni relativna ni apsolutna zastarelost jer su radnje organa prekidale rok, uz desetogodišnji apsolutni rok od čl. 114ž.",
    reasoning:
      "Amandmani 61/07 uveli prekid i apsolutni rok od deset godina koji se pravilno primenjuje na predmetni promet; žalbene tvrdnje o zastarelosti su neosnovane.",
    keywords: ["prekid zastarelosti", "čl. 114ž", "kapitalni dobitak", "izmene 2007"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 114 st. 2 ZPPPA"],
    headnote: "Kapitalni dobitak: prekid roka radnjama organa i desetogodišnji apsolutni limit.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 11474/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je porez na nasleđe apsolutno zastareo kada je prijava podneta 2015. a obaveza nastala 2003.?",
    court_position:
      "Upravni Sud je odbio tužbu jer poreska obaveza pri kasnoj prijavi nastaje danom saznanja organa, pa rok iz čl. 114ž teče od tog momenta, a ne od pravnosnažnosti rešenja o nasleđu 2003.",
    reasoning:
      "Tužiteljka greškom vezuje apsolutni rok od 2003; merodavan je datum saznanja organa za obavezu nakon neblagovremene prijave.",
    keywords: ["porez na nasleđe", "kasna prijava", "čl. 114ž", "saznanje"],
    related_articles: ["čl. 114ž ZPPPA", "Zakon o porezu na imovinu"],
    headnote: "Porez na nasleđe sa kasnom prijavom: zastarelost od saznanja organa, ne od 2003.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 9012/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je utvrđivanje poreza na kapitalni dobitak zastarelo kada je ugovor iz 2007. a prijava 2014.?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje: obaveza nastaje danom prijave 30.06.2014, apsolutna zastarelost tek 31.12.2017.",
    reasoning:
      "Ista logika kao kod srodnih predmeta o neblagovremenoj prijavi i čl. 29 st. 7 Zakona o porezima na imovinu; čl. 114 st. 1 ZPPPA pogrešno pozivan kao da je obaveza nastala danom ugovora.",
    keywords: ["kapitalni dobitak", "neblagovremena prijava", "čl. 114ž"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 72 Zakona o PDG"],
    headnote: "Ponovljena praksa: kapitalni dobitak — obaveza i rok od dana kasne prijave.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 11966/2016",
    legal_area: "administrative",
    legal_question:
      "Da li su radnje poreskog organa pre isteka roka prekinule zastarelost utvrđivanja poreza na kapitalni dobitak?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio da nije nastupila zastarelost jer je institut prekida po izmenama 2007. pravilno primenjen.",
    reasoning:
      "Kod neblagovremene prijave važi utvrđivanje po podacima organa čl. 114 st. 2–3 ZPPPA u trenutku nastanka obaveze; prekid roka i desetogodišnji apsolutni limit čine prigovor neosnovanim.",
    keywords: ["prekid", "čl. 114ž", "kapitalni dobitak", "Poreska uprava"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 114 st. 2–3 ZPPPA"],
    headnote: "Kapitalni dobitak: prekid zastarelosti radnjama organa pre isteka roka.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5637/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li je pogrešno primenjen desetogodišnji ugovorni rok umesto rokova čl. 376 ZOO za naknadu štete iz zakonske obaveze?",
    court_position:
      "Ustavni Sud je usvojio žalbu i utvrdio povredu prava na pravično suđenje jer je Apelacioni sud pogrešno primenio rok zastarelosti na zahtev zasnovan na zakonskoj obavezi.",
    reasoning:
      "Sudovi su greškom tretirali spor kao dugu umesto naknade štete po posebnom osnovu; merodavni su rokovi čl. 376 ZOO (tri godine od saznanja, pet od nastanka štete), ne opšti rok od deset godina.",
    keywords: ["naknada štete", "čl. 376 ZOO", "zakonska obaveza", "Ustavni sud"],
    related_articles: ["čl. 376 ZOO", "čl. 371 ZOO", "čl. 32 Ustava RS"],
    headnote: "Ustavni Sud: naknada po zakonskom osnovu — čl. 376 ZOO, ne deset godina po čl. 371 ZOO.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 7072/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je porez na kapitalni dobitak zastareo kada je ugovor iz jula 2007. a prijava juna 2014.?",
    court_position:
      "Upravni Sud je odbio tužbu tužilje i potvrdio pravilnu primenu čl. 114ž u vezi sa neblagovremenom prijavom.",
    reasoning:
      "Poreska obaveza nastaje danom prijave 30.06.2014; apsolutna zastarelost bi nastupila 31.12.2017. Žalba na čl. 114 st. 1 kao da je obaveza nastala danom ugovora je neosnovana.",
    keywords: ["kapitalni dobitak", "čl. 114ž", "neblagovremena prijava"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 29 st. 7 Zakona o porezima na imovinu"],
    headnote: "Još jedna potvrda: kasna prijava pomera početak zastarelosti poreza na dobitak.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1815/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li je Vojkanu Damnjanoviću povređeno načelo zakonitosti zbog navodne apsolutne zastarelosti za nasilje u porodici 3.2.2006?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu jer primenom blažeg KZ važeći do 11.9.2009. relativni rok iznosi dve godine, apsolutni četiri godine od izvršenja dela, pa apsolutna zastarelost nije nastupila pre okončanja postupka.",
    reasoning:
      "Za kaznu novčana ili zatvor do jedne godine merodavan je čl. 103 st. 1 tačka 7 KZ (dve godine relativno) i čl. 104 st. 6 (četiri godine apsolutno) u odnosu na delo 3.2.2006.",
    keywords: ["Damnjanović", "nasilje u porodici", "blaži zakon", "apsolutna zastarelost"],
    related_articles: ["čl. 3–5 KZ", "čl. 103 st. 1 tačka 7 KZ", "čl. 104 st. 6 KZ", "čl. 194 KZ"],
    headnote: "Ustavni Sud: Damnjanović — četiri godine apsolutne zastarelosti nisu istekle pre presude.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 22289/2024",
    legal_area: "civil",
    legal_question:
      "Da li Uredba o rokovima tokom vanrednog stanja produžuje materijalni rok zastarelosti za tužbu o naknadi štete?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilje i potvrdio zastarelost jer su rokovi iz ZOO materijalnopravni i ne podležu uredbi o procesnim rokovima u vanrednom stanju.",
    reasoning:
      "Rok zastarelosti se uređuje čl. 360 st. 1 i 384 st. 1 ZOO; sporazum o šteti nije zaključen pa je rok nastavio 24.05.2021; tužba 09.07.2021. kasni.",
    keywords: ["vanredno stanje", "zastarelost", "ZOO", "materijalno pravo"],
    related_articles: ["čl. 360 st. 1 ZOO", "čl. 384 st. 1 ZOO", "čl. 591 ZKP"],
    headnote: "Uredba o rokovima u vanrednom stanju ne primenjuje se na zastarelost po ZOO.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3534/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li je drugostepeni sud dužan po službenoj dužnosti primeniti apsolutnu zastarelost krivičnog gonjenja kada je datum dela nejasan?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu prava na pravično suđenje i poništio presudu jer sud nije primenio apsolutnu zastarelost po čl. 104 st. 6 KZ.",
    reasoning:
      "Za delo prikrivanje sa kaznom do tri godine relativni rok je tri godine, apsolutni šest godina od izvršenja; kada je period dela mart–jun 2005, sud mora oceniti zastarelost sua sponte.",
    keywords: ["apsolutna zastarelost", "prikrivanje", "službena dužnost", "Ustavni sud"],
    related_articles: ["čl. 104 st. 6 KZ", "čl. 103 st. 1 tačka 6 KZ", "čl. 32 Ustava RS"],
    headnote: "Ustavni Sud: propust primene apsolutne zastarelosti krivičnog gonjenja — povreda suđenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 7813/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je porez na kapitalni dobitak od zajedničkog finansiranja 2004. zastareo kada je prijava 2014.?",
    court_position:
      "Upravni Sud je odbio tužbu: obaveza 30.06.2014, apsolutna zastarelost 31.12.2015. po čl. 114ž.",
    reasoning:
      "Neblagovremena prijava povlači čl. 29 st. 7 Zakona o porezima na imovinu; tužilja greškom računa od 17.12.2004.",
    keywords: ["kapitalni dobitak", "čl. 114ž", "zajedničko finansiranje"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 72 Zakona o PDG"],
    headnote: "Kapitalni dobitak: isti režim saznanja organa pri kasnoj prijavi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 2725/2011",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila zastarelost krivičnog gonjenja ili izvršenja kazne pre priznanja strane presude za šumsku krađu?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je prihvata zamolnica Crne Gore: apsolutna zastarelost gonjenja nije nastupila pre pravnosnažnosti 02.09.2008, niti zastarelost izvršenja kratke kazne do 02.09.2012.",
    reasoning:
      "Delo 22.09.2002; šest godina apsolutnog gonjenja ističe 22.09.2008; presuda Bijelo Polje postala pravnosnažna 02.09.2008. Kazna 30 dana: relativna zastarelost izvršenja dve godine, apsolutna četiri od pravnosnažnosti.",
    keywords: ["strana presuda", "šumska krađa", "zastarelost izvršenja", "Kž1"],
    related_articles: ["čl. 103–105 KZ", "čl. 107 KZ"],
    headnote: "Priznanje strane osude: nema zastarelosti gonjenja ni izvršenja kratke kazne.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 7810/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je porez na kapitalni dobitak zastareo u odnosu na ugovor iz februara 2007.?",
    court_position:
      "Upravni Sud je odbio tužbu jer je obaveza nastala danom prijave 30.06.2014, pa rokovi iz čl. 114ž nisu istekli.",
    reasoning:
      "Identična pravna osnova kao u srodnim predmetima o neblagovremenoj prijavi i saznanju organa.",
    keywords: ["kapitalni dobitak", "čl. 114ž", "Upravni sud"],
    related_articles: ["čl. 114ž ZPPPA"],
    headnote: "Kapitalni dobitak — potvrđena praksa o početku zastarelosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 9001/2015",
    legal_area: "administrative",
    legal_question:
      "Da li tužilja može uspešno osporiti utvrđivanje poreza na kapitalni dobitak pozivom na zastarelost od dana ugovora 2007.?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio da je porez pravilno utvrđen, a prigovor zastarelosti neosnovan.",
    reasoning:
      "Obaveza nastaje danom prijave 30.06.2014; apsolutna zastarelost bi nastupila 31.12.2017.",
    keywords: ["kapitalni dobitak", "zastarelost", "Poreska uprava"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 72 Zakona o PDG"],
    headnote: "Odbijena tužba: zastarelost poreza na kapitalni dobitak od dana prijave.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 145/2019",
    legal_area: "criminal",
    legal_question:
      "Da li je za nedozvoljeno držanje municije nastupila apsolutna zastarelost krivičnog gonjenja kada branilac kvalifikuje delo drugačije?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti jer je okrivljeni osuđen za čl. 348 KZ sa rokom koji nije istekao u odnosu na trajanje držanja do 2015.",
    reasoning:
      "Pravna kvalifikacija branioca (čl. 222 OKZ) ne menja merodavnu osudu za čl. 348 KZ; apsolutni rok od 20 godina od izvršenja nije protekao u vreme presuđivanja.",
    keywords: ["zaštita zakonitosti", "municija", "apsolutna zastarelost", "Kzz"],
    related_articles: ["čl. 348 KZ", "čl. 103–104 KZ", "čl. 438 st. 1 ZKP"],
    headnote: "Kzz: odbijen zaštita zakonitosti — zastarelost krivičnog gonjenja nije nastupila.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 8070/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je pravo na prinudnu naplatu poreza na prenos apsolutnih prava apsolutno zastarelo 2016. bez obzira na opomenu 2008.?",
    court_position:
      "Upravni Sud je odbio tužbu jer je uručenje opomene 24.10.2008. prekinulo zastarelost po čl. 114d ZPPPA i pokrenulo novi petogodišnji tok.",
    reasoning:
      "Svaka radnja Poreske uprave radi naplate prekida rok; vreme pre prekida se ne uračunava; navodi o apsolutnoj zastarelosti 01.01.2016. su neosnovani.",
    keywords: ["prinudna naplata", "opomena", "prekid zastarelosti", "čl. 114d"],
    related_articles: ["čl. 114d ZPPPA", "čl. 77 ZPPPA"],
    headnote: "Opomena pre naplate prekida zastarelost poreskog potraživanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 376/2023",
    legal_area: "criminal",
    legal_question:
      "Da li se apsolutna zastarelost za nedavanje izdržavanja računa od prvih radnji u 2014. ili od prestanka protivpravnog stanja 2019.?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev branioca jer za deo radnji do 16.11.2016. apsolutna zastarelost nije nastupila u vreme prvostepene presude 16.11.2022.",
    reasoning:
      "Kod trajnog dela vreme izvršenja je poslednji dan protivpravnog stanja 30.01.2019; rokovi se računaju od tog datuma, ne od ranijih epizoda.",
    keywords: ["nedavanje izdržavanja", "trajno delo", "Kzz"],
    related_articles: ["čl. 195 KZ", "čl. 103 tačka 5 KZ", "čl. 104 st. 6 KZ"],
    headnote: "Kzz: zastarelost za trajno nedavanje izdržavanja od prestanka stanja 2019.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 132/2018",
    legal_area: "commercial",
    legal_question:
      "Da li je nastupila zastarelost gonjenja za privredne prestupe banke u vezi sa pranjem novca i propustima KYC?",
    court_position:
      "Privredni apelacioni sud je odbio žalbe i potvrdio osuđujuću presudu, ocenivši da za trajna dela zastara teče od poslednje radnje i da apsolutna zastarelost nije nastupila u 2018.",
    reasoning:
      "Za pravno lice rok počinje od 04.09.2012, 10.09.2012. ili 30.08.2012. po delima; šest godina apsolutnog roka ističe tek 2018. Visina kazni srazmerna je okolnostima po Zakonu o privrednim prestupima.",
    keywords: ["privredni prestup", "banka", "pranje novca", "zastarelost"],
    related_articles: ["Zakon o privrednim prestupima", "čl. 20–23 Zakona o privrednim prestupima"],
    headnote: "Privredni prestupi banke: zastara od poslednje radnje trajnog dela.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 6446/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je pravo na povraćaj preplaćenog poreza zastarelo kada je zahtev podnet posle deset godina od nastanka prava?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio da je pravo na povraćaj zastarelo po relativnom i apsolutnom roku čl. 114 i 114ž ZPPPA.",
    reasoning:
      "Rokovi teku od relevantnih rešenja 2002–2004; apsolutni rok deset godina istekao pre zahteva; navodi o neukosti i ćutanju administracije ne prihvataju se jer je tužilja mogla podneti žalbu zbog nečinjenja.",
    keywords: ["povraćaj poreza", "apsolutna zastarelost", "čl. 114ž"],
    related_articles: ["čl. 114 st. 7 ZPPPA", "čl. 114ž ZPPPA", "ZUP"],
    headnote: "Povraćaj poreza: zastarelost po čl. 114 i 114ž; nečinjenje organa ne opravdava kasni zahtev.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 19182/2013",
    legal_area: "administrative",
    legal_question:
      "Da li je odbacivanje disciplinskog postupka pred sudom časti komore zakonito ako nije uzet u obzir paralelni krivični postupak koji prekida zastarelost?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio odluku Veća Vrhovnog suda časti jer je pogrešno primenjena apsolutna zastarelost vođenja postupka bez ocene efekta krivičnog postupka.",
    reasoning:
      "Paralelni krivični postupak može prekidati ili uticati na tečenje rokova discipline; odbacivanje zbog apsolutne zastarelosti bez toga je nezakonito.",
    keywords: ["lekarska komora", "disciplina", "zastarelost", "krivični postupak"],
    related_articles: ["Zakon o opštem upravnom postupku"],
    headnote: "Sud časti: paralelni krivični postupak relevantan za zastarelost disciplinskog postupka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9933/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li je prekršajni sud povredio pravo na pravično suđenje donošenjem presude u danu apsolutne zastarelosti prekršajnog gonjenja?",
    court_position:
      "Ustavni Sud je usvojio žalbu i poništio presudu jer je umesto osude trebalo obustaviti postupak kada je istog dana nastupila apsolutna zastarelost.",
    reasoning:
      "Praksa PAPS o istom datumu apsolutne zastarelosti i prekršaja dovodi do obaveze obustave po službenoj dužnosti; osuđujuća presuda u tom momentu je povreda čl. 32 Ustava.",
    keywords: ["prekršaj", "apsolutna zastarelost", "obustava", "Ustavni sud"],
    related_articles: ["čl. 84 Zakona o prekršajima", "čl. 32 Ustava RS"],
    headnote: "Prekršaj: presuda umesto obustave u danu apsolutne zastarelosti — povreda suđenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3524/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li je Apelacioni sud povredio pravo na pravično suđenje potvrdom osuđujuće presude posle nastanka apsolutne zastarelosti krivičnog gonjenja?",
    court_position:
      "Ustavni Sud je usvojio žalbu i utvrdio povredu jer je drugostepeni sud morao primeniti apsolutnu zastarelost po službenoj dužnosti.",
    reasoning:
      "Isti problem kao u Už 3534/2011: delo prikrivanje, period mart–jun 2005, šest godina apsolutnog roka; potvrda presude posle tog trenutka je neprihvatljiva.",
    keywords: ["apsolutna zastarelost", "Apelacioni sud", "pravično suđenje"],
    related_articles: ["čl. 104 st. 6 KZ", "čl. 32 Ustava RS"],
    headnote: "Ustavni Sud: potvrda krivične presude posle apsolutne zastarelosti — povreda čl. 32.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 20372/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je porez na prenos apsolutnih prava zastareo kada je prijava 2008. a izmene ZPPPA 2010. propisuju petogodišnji rok?",
    court_position:
      "Upravni Sud je odbio tužbu: merodavan je petogodišnji rok od 01.01.2009. jer obaveza nastaje danom prijave 18.12.2008, a zastarelost nije nastupila.",
    reasoning:
      "Izmene 2010. primenjive jer zastarelost po starom zakonu nije bila nastupila; ugovor razmene ne ograničava porez samo na razliku vrednosti po čl. 28 Zakona o porezima na imovinu.",
    keywords: ["porez na prenos", "čl. 114 ZPPPA", "izmene 2010", "razmena"],
    related_articles: ["čl. 114 ZPPPA", "čl. 28 Zakona o porezima na imovinu"],
    headnote: "Porez na prenos: petogodišnji rok od stupanja izmena ako zastarelost nije već nastupila.",
    outcome: "defendant_won",
  },
  // ── BATCH 3 (3/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 17382/2019",
    legal_area: "administrative",
    legal_question:
      "Da li dostavljanje poziva poreskog obvezniku za učešće u postupku utvrđivanja poreza na prenos predstavlja prekid zastarelosti po čl. 114d ZPPPA?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio ožalbeno rešenje: poziv od 18.12.2018. prekinuo je petogodišnji rok, koji je ponovo počeo teći od tog dana.",
    reasoning:
      "Čl. 114d st. 2 ZPPPA: posle prekida zastarelost teče iznova, a vreme pre prekida se ne uračunava; na dan rešenja 10.06.2019. rok od pet godina od ponovnog početka nije istekao.",
    keywords: ["porez na prenos", "prekid zastarelosti", "poziv stranci", "čl. 114d"],
    related_articles: ["čl. 114d ZPPPA"],
    headnote: "Poziv za učešće u postupku prekida zastarelost utvrđivanja poreza na prenos.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 176/2022",
    legal_area: "criminal",
    legal_question:
      "Da li je zaštita zakonitosti osnovana zbog navodne apsolutne zastarelosti krivičnog gonjenja za delo sa kaznom do deset godina?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev kao neosnovan u delu o zastarelosti; ostatak zahteva odbačen kao nedozvoljen jer se odnosi na već rešena pitanja.",
    reasoning:
      "Branilac greškom računa apsolutni rok od deset godina od dela bez pravilne primene čl. 103–104 KZ na konkretnu kvalifikaciju i vreme izvršenja.",
    keywords: ["zaštita zakonitosti", "Kzz", "apsolutna zastarelost"],
    related_articles: ["čl. 438 st. 1 tačka 1 ZKP", "čl. 104 st. 6 KZ"],
    headnote: "Kzz: navodi o apsolutnoj zastarelosti neosnovani; deo zahteva nedozvoljen.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 147/2010",
    legal_area: "criminal",
    legal_question:
      "Da li se apsolutna zastarelost krivičnog gonjenja za produženo krivično delo računa od celog kontinuuma ili posebno po svakoj samostalnoj radnji?",
    court_position:
      "Vrhovni kasacioni sud je delimično usvojio zahtev i preinačio presude izostavivši inkriminacije za koje je nastupila apsolutna zastarelost po pojedinačnim datumima radnji.",
    reasoning:
      "Kod produženog dela apsolutna zastarelost se računa zasebno za svaku samostalnu radnju; za tačke 3–7 izreke nastupila je zastarelost u 2007–2008, pa ih treba izostaviti iz opisa i obrazložiti razloge.",
    keywords: ["produženo krivično delo", "apsolutna zastarelost", "Kzz"],
    related_articles: ["čl. 96 st. 6 KZ SRJ", "čl. 104 st. 6 KZ"],
    headnote: "Produženo delo: apsolutna zastarelost po pojedinačnim radnjama, ne jedinstveno za celinu.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 55/2011",
    legal_area: "criminal",
    legal_question:
      "Da li započeto izvršenje kazne zatvora sprečava nastupanje apsolutne zastarelosti izvršenja kazne?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev za zaštitu zakonitosti i utvrdio da je 03.12.2009. nastupila apsolutna zastarelost izvršenja kazne zatvora od dve godine i šest meseci, pa treba obustaviti izvršenje.",
    reasoning:
      "Po čl. 105 tačka 6 i čl. 107 st. 6 KZ apsolutna zastarelost izvršenja nastupa dvostruko od relativnog roka od pravnosnažnosti; poternica prekida samo relativni tok, ne i apsolutni koji teče od pravnosnažnosti presude.",
    keywords: ["izvršenje kazne", "apsolutna zastarelost", "poternica", "Kzz"],
    related_articles: ["čl. 105 tačka 6 KZ", "čl. 107 st. 6–7 KZ"],
    headnote: "Apsolutna zastarelost izvršenja kazne teče nezavisno od započetog izdržavanja i poternice.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2615/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li je osuđenom za produženo zloupotrebu službenog položaja povređeno načelo zakonitosti jer bi apsolutna zastarelost nastupila 1.9.2019?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu jer apsolutna zastarelost krivičnog gonjenja po starom i novom krivičnom zakonu nastaje tek 1.9.2019, pa presuda nije nezakonita zbog zastarelosti.",
    reasoning:
      "Za delo do 1.9.1999. merodavni su rokovi iz KZJ i KZ koji daju dvadesetogodišnji apsolutni limit; sabiranje koristi ne menja kvalifikaciju koja bi bila blaža po novom zakonu.",
    keywords: ["zloupotreba službenog položaja", "apsolutna zastarelost", "KZJ", "KZ"],
    related_articles: ["čl. 95–96 KZJ", "čl. 103–104 KZ"],
    headnote: "Produženo delo korupcije: apsolutna zastarelost 20 godina; žalba neosnovana.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "KŽ1 535/2017",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila apsolutna zastarelost krivičnog gonjenja za primanje i davanje mita u periodu 2007?",
    court_position:
      "Apelacioni sud je preinačio presudu: jedna okrivljena oslobođena jer optužba nije zakonita, a prema ostalima optužba za mito odbijena zbog apsolutne zastarelosti (preko deset godina od dela).",
    reasoning:
      "Za kaznu do pet godina zatvora relativni rok je pet godina, apsolutni deset po čl. 103 tačka 4 i čl. 104 st. 6 KZ od vremena izvršenja navedenog u optužnici.",
    keywords: ["mito", "apsolutna zastarelost", "odbacivanje optužbe", "KŽ1"],
    related_articles: ["čl. 422 tačka 3 ZKP", "čl. 103–104 KZ", "čl. 265 st. 1 ZKP"],
    headnote: "Mito: odbijanje optužbe zbog apsolutne zastarelosti; troškovi na budžet.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6463/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li je rok zastarelosti za produženo krivično delo uvek vezan samo za poslednju radnju bez zastarelosti pojedinih segmenata?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu jer je primena roka od poslednje radnje i mogućnost „ispadanja“ zastarelih segmenata iz produženog dela bila zakonita i nije proizvoljna.",
    reasoning:
      "Teorijski okvir produženog dela dopušta da pojedini segmenti zastare pa se produženo delo „skraćuje“ bez automatskog ukidanja celog konstrukta ako ostatak i dalje postoji.",
    keywords: ["produženo krivično delo", "zastarelost", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 103–104 KZ"],
    headnote: "Ustavni Sud: računanje zastarelosti kod produženog dela nije proizvoljno.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po3 7/2023",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila apsolutna zastarelost krivičnog gonjenja za delo iz čl. 185 st. 4 KZ u periodu 2016. kada je predmet stigao u sud 2023?",
    court_position:
      "Apelacioni sud je po službenoj dužnosti preinačio oslobađajuću presudu i odbio optužbu jer je apsolutna zastarelost nastupila 24.11.2022, a predmet primljen 01.02.2023.",
    reasoning:
      "Čl. 104 st. 6 KZ: dvostruko vreme relativnog roka; poslednja radnja dela 24.11.2016. povlači apsolutni rok do 24.11.2022; čl. 422 st. 1 tačka 3 ZKP.",
    keywords: ["apsolutna zastarelost", "pornografija", "Posebno odeljenje", "Kž1-Po3"],
    related_articles: ["čl. 422 st. 1 tačka 3 ZKP", "čl. 104 st. 6 KZ", "čl. 185 st. 4 KZ"],
    headnote: "Posebno odeljenje: odbijanje optužbe jer je apsolutna zastarelost nastupila pre podnošenja predmeta.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1381/2018",
    legal_area: "criminal",
    legal_question:
      "Od kada teče apsolutna zastarelost izvršenja kazne zatvora posle ponovljenog postupka ako je kazna ostala ista?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zaštitu zakonitosti i utvrdio da apsolutna zastarelost izvršenja teče od pravnosnažnosti prvobitne presude u odsustvu, ne od presude iz ponavljanja.",
    reasoning:
      "Kazna četiri godine: relativna zastarelost izvršenja pet godina, apsolutna deset od pravnosnažnosti Kž1 1324/07 od 25.03.2008, dakle 25.03.2018.",
    keywords: ["izvršenje kazne", "ponovljeni postupak", "apsolutna zastarelost", "Kzz"],
    related_articles: ["čl. 105 tačka 5 KZ", "čl. 107 st. 6 KZ", "čl. 492 st. 1 ZKP"],
    headnote: "Ponovljeni postupak uz istu kaznu: rok zastarelosti izvršenja od prvobitne pravnosnažnosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 91/2010",
    legal_area: "criminal",
    legal_question:
      "Da li je drugostepena presuda doneta posle nastanka apsolutne zastarelosti krivičnog gonjenja za krađu i neovlašćeno korišćenje vozila 20.05.2003?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev RJT, preinačio presude i odbio optužbu jer je 20.05.2009. nastupila apsolutna zastarelost pre drugostepene presude.",
    reasoning:
      "Kazna do tri godine: relativna tri godine, apsolutna šest godina po čl. 103 tačka 6 i čl. 104 st. 6 KZ od izvršenja dela.",
    keywords: ["apsolutna zastarelost", "Kzz", "zaštita zakonitosti"],
    related_articles: ["čl. 369 tačka 2 ZKP", "čl. 103 tačka 6 KZ", "čl. 104 st. 6 KZ"],
    headnote: "Kzz: drugostepena presuda posle apsolutne zastarelosti — povreda zakona, odbijanje optužbe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 3102/2010",
    legal_area: "criminal",
    legal_question:
      "Da li je za falsifikovanje isprave iz 1999. nastupila apsolutna zastarelost krivičnog gonjenja pre donošenja presude 2008?",
    court_position:
      "Apelacioni sud je po službenoj dužnosti odbio optužbu jer je apsolutna zastarelost nastupila 01.01.2009. za delo sa relativnim rokom od pet godina.",
    reasoning:
      "Kazna tri meseca do pet godina: relativna pet godina, apsolutna deset od izvršenja; delo „neutvrđenog dana 1999“.",
    keywords: ["falsifikovanje isprave", "apsolutna zastarelost", "Kž1"],
    related_articles: ["čl. 354 st. 1 tačka 3 ZKP", "čl. 104 tačka 6 KZ", "čl. 233 st. 3 KZ"],
    headnote: "Falsifikovanje isprave 1999: apsolutna zastarelost deset godina — odbijanje optužbe.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž2 460/2024",
    legal_area: "criminal",
    legal_question:
      "Da li se zastarelost izvršenja objedinjene kazne zatvora računa od starije presude koja je ušla u sastav nove?",
    court_position:
      "Apelacioni sud je odbio žalbu branioca i potvrdio rešenje: apsolutna zastarelost izvršenja teče od pravnosnažnosti presude koja je izrekla jedinstvenu kaznu (Kv-296/15), ne od ranije ubačene presude.",
    reasoning:
      "Pravnosnažna presuda Kv-296/15 od 02.12.2015. (pravnosnažna 04.01.2016.) apsorbuje staru K.45/13; zastarelost izvršenja jedinstvene kazne ističe 04.01.2036, pa obustava po starijoj grani nije merodavna u ovom predmetu.",
    keywords: ["objedinjena kazna", "zastarelost izvršenja", "Kž2"],
    related_articles: ["čl. 467 st. 4 ZKP", "čl. 105–107 KZ"],
    headnote: "Objedinjena kazna: rokovi zastarelosti izvršenja od pravnosnažnosti presude o objedinjenju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1247/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je za prikrivanje sa kontinuiranim delovanjem do 30.03.2023. apsolutna zastarelost krivičnog gonjenja već nastupila u julu 2024?",
    court_position:
      "Vrhovni kasacioni sud je odbio zaštitu zakonitosti jer se rok računa od prestanka protivpravnog stanja 30.03.2023, pa apsolutna zastarelost nastaje 30.03.2033.",
    reasoning:
      "Kazna šest meseci do pet godina: pet godina relativno, deset apsolutno od krajnjeg datuma iz izreke presude.",
    keywords: ["prikrivanje", "trajno stanje", "zastarelost", "Kzz"],
    related_articles: ["čl. 221 st. 4 KZ", "čl. 103 tačka 4 KZ", "čl. 104 st. 6 KZ"],
    headnote: "Prikrivanje do 2023: početak roka od prestanka delovanja, ne od ranijih godina.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 802/2014",
    legal_area: "criminal",
    legal_question:
      "Da li je drugostepena presuda potvrdila osuđujuću presudu iako je apsolutna zastarelost krivičnog gonjenja nastupila pre nje za jednog okrivljenog?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zaštitu zakonitosti jednog branioca, preinačio presude i odbio optužbu protiv okrivljenog S.P. jer je apsolutna zastarelost krivičnog gonjenja nastupila 18.05.2014, a drugostepena presuda doneta 29.05.2014.",
    reasoning:
      "Za falsifikovanje službene isprave čl. 248 st. 3 u vezi st. 1 KZ kazna tri meseca do pet godina: pet godina relativno, deset apsolutno od 18.05.2004, dakle apsolutna 18.05.2014 — čl. 422 tačka 3 ZKP.",
    keywords: ["apsolutna zastarelost", "falsifikovanje isprave", "Kzz"],
    related_articles: ["čl. 422 tačka 3 ZKP", "čl. 248 st. 3 KZ"],
    headnote: "Kzz: potvrda presude posle apsolutne zastarelosti za jednog okrivljenog — odbijanje optužbe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 10/2023",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila apsolutna zastarelost krivičnog gonjenja za udruživanje u vezi sa drogom i za posedovanje manjih količina?",
    court_position:
      "Apelacioni sud je odbio optužbu za udruživanje zbog zastarelosti, promenio kvalifikaciju sa organizovane grupe na običnu grupu, ublažio kazne, odbio optužbu protiv jednog okrivljenog za posedovanje zbog apsolutne zastarelosti 27.05.2023, jednom ukinuo presudu i vratio predmet.",
    reasoning:
      "Za delo čl. 346 st. 4 KZ apsolutna zastarelost 06.04.2022, za tačku 4 31.07.2022, za tačku 6 24.12.2022; za posedovanje 27.05.2017. apsolutna 27.05.2023. Primena čl. 422 st. 1 tačka 3 ZKP.",
    keywords: ["droga", "udruživanje", "apsolutna zastarelost", "Kž1-Po1"],
    related_articles: ["čl. 246 st. 3–4 KZ", "čl. 246a KZ", "čl. 422 st. 1 ZKP", "čl. 103–104 KZ"],
    headnote: "Posebno odeljenje: delimično odbijanje optužbi zbog zastarelosti i promena kvalifikacije.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 5385/2014",
    legal_area: "administrative",
    legal_question:
      "Da li je nastupila zastarelost pokretanja i vođenja disciplinskog postupka protiv policijskog službenika za tešku povredu službene dužnosti?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio disciplinsku meru: pokretanje 2012. i odluka 2013. unutar rokova iz Zakona o policiji; apsolutna zastarelost vođenja od tri godine od povrede nije nastupila.",
    reasoning:
      "Povreda nepodnošenjem krivične prijave traje kao nečinjenje od 09.01.2009; disciplinski rokovi čl. 163b Zakona o policiji pravilno primenjeni.",
    keywords: ["disciplina", "policija", "zastarelost", "Zakon o policiji"],
    related_articles: ["čl. 163b Zakona o policiji"],
    headnote: "Disciplinski postupak policije: rokovi pokretanja i vođenja nisu zastareli.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 403/2022",
    legal_area: "criminal",
    legal_question:
      "Da li je apsolutna zastarelost krivičnog gonjenja za nasilje u porodici nastupila 01.01.2022. pre pravnosnažnosti presude u februaru 2022?",
    court_position:
      "Vrhovni kasacioni sud je odbio zaštitu zakonitosti jer poslednja radnja dela 12.10.2017. povlači apsolutnu zastarelost 12.10.2023, pa u februaru 2022. još nije nastupila.",
    reasoning:
      "Primena čl. 103 tačka 6 i čl. 104 st. 6 KZ od krajnjeg datuma učinjenja u kontinuiranom delovanju.",
    keywords: ["nasilje u porodici", "Kzz", "apsolutna zastarelost"],
    related_articles: ["čl. 194 st. 1 KZ", "čl. 103–104 KZ"],
    headnote: "Kontinuirano nasilje u porodici: rok od poslednje radnje, ne od početka 2016.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 397/2023",
    legal_area: "criminal",
    legal_question:
      "Da li je apsolutna zastarelost krivičnog gonjenja za nasilničko ponašanje u saizvršilaštvu nastupila pre trećestepene presude 17.05.2022?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zaštitu zakonitosti i odbio optužbu jer je apsolutna zastarelost nastupila 28.04.2022, a presuda Kž3 2/22 doneta 17.05.2022.",
    reasoning:
      "Delo 28.04.2012; pet godina relativno, deset apsolutno od datuma dela po čl. 103 tačka 5 i čl. 104 st. 6 KZ — čl. 422 tačka 3 ZKP.",
    keywords: ["nasilničko ponašanje", "saizvršilaštvo", "apsolutna zastarelost", "Kzz"],
    related_articles: ["čl. 344 st. 2 KZ", "čl. 422 tačka 3 ZKP"],
    headnote: "Kzz: trećestepena presuda posle apsolutne zastarelosti — odbijanje optužbe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 4800/2022",
    legal_area: "commercial",
    legal_question:
      "Da li je potraživanje za vraćanje neiskorišćenog avansa posle raskida ugovora zastarelo u stečajnom postupku?",
    court_position:
      "Privredni apelacioni sud je potvrdio obavezu vraćanja avansa stečajnoj masi i odbio prigovor zastarelosti jer važi desetogodišnji rok uz prekid i zastoj po Zakonu o stečaju.",
    reasoning:
      "Prekid roka preinačenjem zahteva; stečaj od 30.10.2018. stvara zastoj godinu dana od otvaranja po čl. 86 st. 2 Zakona o stečaju, pa rok nije istekao.",
    keywords: ["avans", "stečaj", "zastoj zastarelosti", "čl. 86 Zakon o stečaju"],
    related_articles: ["čl. 371 ZOO", "čl. 86 st. 2 Zakona o stečaju"],
    headnote: "Vraćanje avansa u stečaju: zastoj zastarelosti i desetogodišnji rok.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1285/2021",
    legal_area: "criminal",
    legal_question:
      "Od kog datuma teče apsolutna zastarelost za skidanje sigurnosne plombe u periodu 07.2017–01.2018. i da li je drugostepena odluka doneta posle njenog isteka?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zaštitu zakonitosti, preinačio presude i odbio optužbu jer je apsolutna zastarelost nastupila 12.07.2021, a trećestepena presuda doneta kasnije.",
    reasoning:
      "Bez utvrđenog dana učinjenja u intervalu merodavan je prvi dan perioda (12.07.2017) kao najpovoljniji okrivljenom; čl. 103 tačka 7 i čl. 104 st. 6 KZ daju apsolutni rok od četiri godine. Žalba 16.06.2021. ne sprečava ocenu u zaštiti zakonitosti jer u tom trenutku apsolutna zastarelost još nije nastupila.",
    keywords: ["službeni pečat", "najpovoljniji datum", "apsolutna zastarelost", "Kzz"],
    related_articles: ["čl. 327 st. 1 KZ", "čl. 103 tačka 7 KZ", "čl. 104 st. 6 KZ"],
    headnote: "Nepoznat dan u periodu: početak roka od prvog dana perioda (najpovoljnije okrivljenom).",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 790/2008",
    legal_area: "constitutional",
    legal_question:
      "Da li je Vrhovni sud proizvoljno primenio zastarelost odbijajući da rešenje Ministarstva odbrane predstavlja priznanje duga?",
    court_position:
      "Ustavni Sud je usvojio žalbu, poništio presudu Vrhovnog suda i utvrdio povredu prava na pravično suđenje zbog pogrešne primene čl. 387 ZOO o prekidu zastarelosti priznanjem.",
    reasoning:
      "Priznanje duga može biti i posredno (isplate, kamata, obezbeđenje); sud mora oceniti da li administrativno rešenje ima značaj priznanja u smislu čl. 387 ZOO i prekida.",
    keywords: ["priznanje duga", "prekid zastarelosti", "čl. 387 ZOO", "Ustavni sud"],
    related_articles: ["čl. 360–362 ZOO", "čl. 387 ZOO", "čl. 388 ZOO", "čl. 392 ZOO"],
    headnote: "Ustavni Sud: proizvoljna primena zastarelosti i priznanja duga — poništaj presude VKS.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 232/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila apsolutna zastarelost krivičnog gonjenja za utaju i prevare u periodu 2013–2014?",
    court_position:
      "Apelacioni sud je delimično preinačio presudu: odbio optužbu za dela čiji je apsolutni rok istekao (utaja 30.12.2023, prevare u delu februara 2024), a u delu utaje ukinuo presudu i vratio na ponovno suđenje.",
    reasoning:
      "Različiti datumi radnji povlače različite datume apsolutne zastarelosti po čl. 103 st. 1 tačka 4 i čl. 104 st. 6 KZ u vezi sa čl. 207 i 208 KZ.",
    keywords: ["utaja", "prevara", "apsolutna zastarelost", "Kž1"],
    related_articles: ["čl. 207 st. 3 KZ", "čl. 208 st. 1 KZ", "čl. 103–104 KZ"],
    headnote: "Utaja i prevara: različiti datumi apsolutne zastarelosti po radnjama.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž2 1042/2021",
    legal_area: "criminal",
    legal_question:
      "Da li promena pravne kvalifikacije u optužnici menja početak računanja apsolutne zastarelosti za utaju?",
    court_position:
      "Apelacioni sud je odbio žalbu branioca i potvrdio rešenje: sud je vezan činjeničnim opisom koji zasniva utaju čl. 207 st. 4 KZ sa kaznom jedna do osam godina, pa apsolutna zastarelost nije nastupila za delo 18.06.2010.",
    reasoning:
      "Promena kvalifikacije 23.04.2018. nije od značaja ako činjenični opis i dalje pokriva isto delo sa istom zaprećenom kaznom za svrhu čl. 103–104 KZ.",
    keywords: ["utaja", "izmena optužnice", "zastarelost", "Kž2"],
    related_articles: ["čl. 207 st. 4 KZ", "čl. 103 st. 1 tačka 3 KZ", "čl. 104 st. 6 KZ"],
    headnote: "Utaja čl. 207 st. 4: vezanost za činjenični opis, ne za promenu oznake kvalifikacije.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 14803/2015",
    legal_area: "administrative",
    legal_question:
      "Da li su radnje Poreske uprave prekinule zastarelost utvrđivanja poreza na kapitalni dobitak?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio da nije nastupila zastarelost prava na utvrđivanje poreza na kapitalni dobitak od prodaje nepokretnosti.",
    reasoning:
      "Ista pravila o neblagovremenoj prijavi, čl. 114ž i prekidima kao u srodnim predmetima; organ je pravilno primenio materijalno pravo.",
    keywords: ["kapitalni dobitak", "prekid zastarelosti", "čl. 114ž"],
    related_articles: ["čl. 114ž ZPPPA", "čl. 114 st. 2–3 ZPPPA"],
    headnote: "Kapitalni dobitak: prekid roka radnjama organa — potvrda prakse.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4082/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li su parnični sudovi dužni posebno oceniti vreme pritvora provedeno posle nastanka apsolutne zastarelosti krivičnog gonjenja?",
    court_position:
      "Ustavni Sud je usvojio žalbu i utvrdio povredu prava na pravično suđenje jer sudovi nisu razlikovali pritvor 2003. od pritvora 2009. posle apsolutne zastarelosti za prevaru.",
    reasoning:
      "Posle apsolutne zastarelosti krivični sud morao obustaviti postupak, što ukida osnov pritvora; deset dana pritvora 2009. zahteva posebno pravno značenje u sporu o naknadi za neosnovan pritvor.",
    keywords: ["pritvor", "apsolutna zastarelost", "neosnovan pritvor", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 103–104 KZ"],
    headnote: "Naknada za pritvor: razlikovanje perioda pre i posle apsolutne zastarelosti gonjenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "KŽ2 288/2011",
    legal_area: "criminal",
    legal_question:
      "Da li je pravilna obustava krivičnog postupka zbog apsolutne zastarelosti za produženo nasilje u porodici primenom starijeg i novijeg KZ?",
    court_position:
      "Apelacioni sud je odbio žalbu javnog tužioca i potvrdio rešenje o obustavi jer je apsolutna zastarelost pravilno računata od pojedinačnih radnji u kontinuumu.",
    reasoning:
      "Prvostepeni sud pravilno primenio čl. 194 KZ u vezi čl. 61 KZ i odredbe starog KZ za ranije segmente; žalba koja pokušava da odloži apsolutni datum nije osnovana.",
    keywords: ["nasilje u porodici", "obustava", "produženo delo", "KŽ2"],
    related_articles: ["čl. 401 st. 5 ZKP", "čl. 194 KZ"],
    headnote: "Obustava zbog apsolutne zastarelosti kod produženog nasilja u porodici — potvrda.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3900/2024",
    legal_area: "civil",
    legal_question:
      "Da li je istekao jednogodišnji rok iz čl. 500 ZOO za obaveštenje o skrivenim nedostacima stana i zastara potraživanja za raskid kupoprodaje?",
    court_position:
      "Apelacioni sud je potvrdio raskid ugovora o kupoprodaji stana zbog opasnih materija i obavezu povraćaja cene, odbivši prigovore o roku i kompenzaciji duga kupca prema banci.",
    reasoning:
      "Rok čl. 500 ZOO teče najranije od sporazuma stranaka 07.05.2015, a rok za tužbu nije protekao do 31.12.2015; kompenzacioni prigovor tuženog prema potraživanju banke nije potraživanje prodavca.",
    keywords: ["kupoprodaja stana", "čl. 500 ZOO", "skriveni nedostaci", "raskid"],
    related_articles: ["čl. 500 ZOO", "čl. 132 ZOO"],
    headnote: "Skriveni nedostaci stana: rok obaveštenja i raskid; dug prema banci nije kompenzabilno potraživanje prodavca.",
    outcome: "plaintiff_won",
  },
]
