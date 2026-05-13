// scripts/case-law-inheritance-serbia-1.ts
// Serbian inheritance law (nužni deo, testament, poklon, ZON) — Batches 1–3 of 3 (complete).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_INHERITANCE_SERBIA_1: CaseLawInput[] = [
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4915/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li je valjano isključenje sina iz nužnog dela testamentom pred svedocima ako se sin teže ogrešio o moralne obaveze prema ocu?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio da je ostavilac u testamentu valjano isključio sina iz prava na nužni deo zbog težeg ogrešenja o moralne obaveze.",
    reasoning:
      "Testament pred svedocima ispunjava čl. 85 st. 1 ZON: zaveštalac je izjavio da je tekst pročitan, da je to poslednja volja i da nije primoran. Nužni naslednik u ostavinskom postupku nije blagovremeno osporio valjanost isključenja niti podneo tužbu za neosnovanost isključenja. Nižestepeni sudovi su pravilno primenili čl. 63 ZON uz formalnu ispravnost zaveštanja.",
    keywords: ["nužni deo", "isključenje iz nasleđa", "testament pred svedocima", "moralne obaveze", "ZON"],
    related_articles: ["čl. 61–63", "čl. 85 st. 1 ZON"],
    headnote:
      "Isključenje nužnog naslednika zahteva izričitu volju u formi zaveštanja i osnov koji postoji u vreme sastavljanja; pasivnost u ostavini ne zamenjuje parničnu zaštitu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1287/2006",
    legal_area: "inheritance",
    legal_question:
      "Da li prekid kontakta ćerki sa ocem predstavlja teže ogrešenje koje opravdava isključenje iz nužnog dela testamentom?",
    court_position:
      "Vrhovni sud je usvojio reviziju i preinačio drugostepenu presudu: prekid kontakta kome je doprineo i sam otac ne može se kvalifikovati kao teže ogrešenje; tužiljama pripada nužni deo u visini polovine zakonskog dela (1/6 zaostavštine).",
    reasoning:
      "Nije bilo poklona veće vrednosti koji bi uvećao nužni deo. Ponašanje ćerki ne ispunjava kriterijume grubog ili uvredljivog odnosa prema ocu u smislu čl. 61 ZON; ostavilac je svojim ponašanjem doprineo hladnom odnosu.",
    keywords: ["isključenje", "nužni deo", "moralne obaveze", "porodični odnosi", "ZON"],
    related_articles: ["čl. 61–62 ZON"],
    headnote:
      "Sud mora ceniti uzajamnu odgovornost u porodičnom odnosu pre nego što isključenje proglaši osnovanim.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2276/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li je pravo na nužni deo po starom Zakonu o nasleđivanju stvarnopravno ili obligaciono i ko snosi teret dokazivanja osnovanosti isključenja?",
    court_position:
      "Vrhovni sud je preinačio drugostepenu presudu i utvrdio povredu nužnog dela tužioca, primenjujući raniji ZON po kome je nužni deo stvarnopravnog karaktera, a teret dokazivanja osnovanosti isključenja leži na onome ko se na isključenje poziva.",
    reasoning:
      "Utvrđen je kontakt sina sa ocem i porodični kontekst posle razvoda roditelja; nisu ispunjeni uslovi iz čl. 43 ZON za isključenje. Pozivaju se čl. 28, 42, 43–44 i 56 ZON o roku za smanjenje raspolaganja, isključenju i poklonima.",
    keywords: ["nužni deo", "stvarno pravo", "isključenje", "teret dokazivanja", "ZON"],
    related_articles: ["čl. 28", "čl. 42–44", "čl. 56 ZON"],
    headnote:
      "Pravna kvalifikacija nužnog dela zavisi od merodavnog zakona u vreme nastanka odnosa; teret za isključenje nije na isključenom nasledniku.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1892/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li je tužilja valjano isključena iz nasleđa zaveštanjem ako su ispunjeni formalni i materijalni uslovi iz čl. 61–63 i 85 ZON?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i odbio zahtev za smanjenje zaveštajnog raspolaganja: tužilja je punovažno isključena iz nasleđa i nema pravo na nužni deo u meri isključenja.",
    reasoning:
      "Primenjene su odredbe o zaveštanju, nasledniku, tumačenju volje (čl. 78, 114, 135) i o isključenju nužnog naslednika (čl. 61–62), uključujući formu i izričitost. Za povredu nužnog dela sledi redukcija po čl. 53 ZON samo dok naslednik nije valjano isključen.",
    keywords: ["isključenje", "testament", "nužni deo", "ZON", "Gž"],
    related_articles: ["čl. 53", "čl. 61–63", "čl. 78", "čl. 114", "čl. 135 ZON"],
    headnote:
      "Valjano isključenje nužnog naslednika isključuje zahtev za redukciju u delu u kom je naslednik isključen.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2973/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li se povreda nužnog dela može ostvariti tužbom za utvrđenje suvlasničkog udela ako je pravo na nužni deo obligacione prirode?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i odbio tužbu za utvrđenje suvlasničkog udela: pravo na nužni deo je primarno obligaciono, a tužilja nije dokazala uslove za stvarnopravni zahtev.",
    reasoning:
      "U ostavini je utvrđen predmet zaostavštine i naslednici; tužba za povredu nužnog dela i redukciju testamenta blagovremena je u roku od tri godine od proglašenja. Ipak, za stvarnopravni zahtev nužni naslednik mora dokazati posebne okolnosti iz čl. 43 st. 2 ZON (trajnija zajednica života itd.), što nije učinjeno.",
    keywords: ["nužni deo", "obligaciono pravo", "stvarno pravo", "čl. 43 ZON", "Gž"],
    related_articles: ["čl. 42–43", "čl. 61–64 ZON"],
    headnote:
      "Podrazumevano je novčana protivvrednost nužnog dela; stvarnopravni zahtev zahteva posebnu argumentaciju i dokaze.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Novom Sadu",
    court_level: "appellate",
    case_number: "R4g 18/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li dugo trajanje ostavinskog postupka sa prekidom zbog parnice o nužnom delu predstavlja povredu prava na suđenje u razumnom roku?",
    court_position:
      "Apelacioni sud u Novom Sadu je odbio zahtev za utvrđenje povrede prava na suđenje u razumnom roku jer kašnjenje proizilazi iz objektivnih okolnosti, a ne iz neefikasnosti suda.",
    reasoning:
      "Testamentalni naslednik je osporio nužni deo i postupak je prekinut radi parnice; žalba na rešenje o prekidu i dalji tok ne ukazuju na odgovornost suda za celokupno trajanje.",
    keywords: ["ostavinski postupak", "razuman rok", "nužni deo", "Apelacioni sud Novi Sad"],
    related_articles: ["čl. 32 Ustava RS", "ZPP"],
    headnote:
      "Prekid ostavine radi spora o nužnom delu produžava postupak bez automatske odgovornosti države.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4750/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li nužni naslednik može tužbom tražiti pravo svojine na delu zaostavštine bez dokazivanja posebnih okolnosti za stvarnopravni zahtev?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: po pravilu nužnom nasledniku pripada novčana protivvrednost; stvarnopravni zahtev zahteva da sud u konkretnom slučaju proceni da li postoje razlozi iz čl. 43 st. 2 ZON.",
    reasoning:
      "Tužilac nije naveo trajniju zajednicu života sa ostaviljom na nepokretnosti niti druge okolnosti za transformaciju obligacionog u stvarno pravo. Zakon koristi „može“ u smislu diskrecije suda.",
    keywords: ["nužni deo", "čl. 43 st. 2 ZON", "stvarno pravo", "Gž"],
    related_articles: ["čl. 40", "čl. 42–43 ZON"],
    headnote:
      "„Može“ u čl. 43 st. 2 ZON označava izuzetak od novčanog pravila, ne automatsko pravo na idealni udeo.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 606/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li ugovor o doživotnom izdržavanju i zahtev za nužni deo podležu zastarelosti i delimičnoj ništavosti kada je primalac raspolagao bračnom imovinom?",
    court_position:
      "Apelacioni sud je potvrdio delimičnu ništavost ugovora o doživotnom izdržavanju zbog raspolaganja zajedničkom imovinom, odbio zahtev za nužni deo zbog zastarelosti, delimično ukinuo odluku o poklonima zbog nejasnog tereta dokazivanja i razloga.",
    reasoning:
      "Nužni deo i rokovi iz čl. 40–41 ZON: smanjenje testamenta u roku od tri godine od proglašenja, vraćanje poklona od tri godine od smrti. Protivtužba za poklone vraćena na ponovno odlučivanje zbog čl. 229 ZPP i nepotpunog činjeničnog stanja.",
    keywords: ["doživotno izdržavanje", "nužni deo", "zastarelost", "bračna imovina", "ZON"],
    related_articles: ["čl. 40–41", "čl. 229 ZPP"],
    headnote:
      "Zastarelost nužnog dela i složeni sporovi o poklonima zahtevaju jasnu procenu aktivne mase i tereta dokazivanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1449/2011",
    legal_area: "inheritance",
    legal_question:
      "Da li je tužba za redukciju testamenta i poklona radi nužnog dela blagovremena ako je podneta posle tri godine od proglašenja testamenta?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe kao neblagovremene: prekluzivni rok od tri godine od proglašenja testamenta i tri godine od smrti za vraćanje poklona po čl. 59 ZON je protekao.",
    reasoning:
      "Smanjenje testamenta i vraćanje poklona mogu tražiti samo nužni naslednici u zakonskim rokovima; tužba je podneta nakon isteka.",
    keywords: ["rokov", "redukcija testamenta", "poklon", "nužni deo", "ZON"],
    related_articles: ["čl. 59 ZON"],
    headnote:
      "Rokovi iz čl. 59 ZON su prekluzivni; propust ih gasi pravo na redukciju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3499/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li prekid kontakta, sporovi i neprisustvovanje sahrani opravdavaju isključenje sina iz nasleđa testamentom?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe sina za ništavost odredbe o isključenju: utvrđeno je teže ogrešenje o moralne obaveze prema ocu, uključujući dugotrajne poremećene odnose i izostanak sa sahrane.",
    reasoning:
      "Primenjeni su čl. 61–63, 85, 155–158 ZON; testament je izričit i osnov isključenja postojao je u vreme smrti. Prvostepeni razlozi su prihvaćeni kao pravilni i potpuni.",
    keywords: ["isključenje", "moralne obaveze", "testament", "porodica", "ZON"],
    related_articles: ["čl. 61–63 ZON"],
    headnote:
      "Ekstremno hladan odnos i izostanak sa ključnih porodičnih događaja mogu podržati valjanost isključenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 6504/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li je pravilno odbačen predlog za ponavljanje postupka zbog smrti stranke ako datum saznanja za smrt nije rasvetljen?",
    court_position:
      "Vrhovni sud je ukinuo nižestepena rešenja o odbacivanju predloga za ponavljanje i naložio ponovno ispitivanje blagovremenosti predloga u odnosu na saznanje o smrti stranke.",
    reasoning:
      "Predmet uključuje spor o testamentu, nužnom delu i bračnoj tekovini sa složenom istorijom presuda; za ponavljanje je bitan moment saznanja nove činjenice.",
    keywords: ["ponavljanje postupka", "smrt stranke", "testament", "nužni deo"],
    related_articles: ["ZPP", "ZON"],
    headnote:
      "Pri odbacivanju predloga za ponavljanje sud mora jasno utvrditi kada je podnosilac saznao za smrt stranke.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5873/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li je zaveštanje ništavo kao kontradiktorno ako ostavilac isključuje jednog naslednika a moli drugog da se nagodi sa njim oko deobe kuće?",
    court_position:
      "Vrhovni kasacioni sud je dozvolio posebnu reviziju, ukinuo presude i vratio predmet: nižestepeni sudovi su pogrešno utvrdili ništavost; molba za nagodbu nije obavezujuće raspolaganje kao isporuka.",
    reasoning:
      "Pasusi o isključenju i molbi za fizičku deobu ne čine kontradikciju koja vređa javni poredak; nije reč o uslovnom nasleđivanju niti isporuci u smislu singularne sukcesije bez volje za legat.",
    keywords: ["testament", "kontradiktornost", "ništavost", "ZON", "revizija"],
    related_articles: ["čl. 62 st. 2", "čl. 114 ZON"],
    headnote:
      "Testamentarna molba za mirnu deobu ne umanjuje izričito isključenje ako nije pravno obavezujući sporazum.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 20229/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li nužni naslednici mogu dobiti pravo susvojine na poklonjenim nepokretnostima bez dokazivanja činjenica za izuzetak iz obligacionog prava na nužni deo?",
    court_position:
      "Vrhovni sud je odbacio reviziju tužilaca zbog nedostatka pravnog interesa, usvojio reviziju tuženog, ukinuo drugostepenu presudu i vratio predmet jer nisu utvrđene činjenice za primenu čl. 43 ZON na stvarnopravni zahtev.",
    reasoning:
      "Podrazumevano je novčano potraživanje; stvarno pravo zahteva dokaz o okolnostima (karakter stvari, zajednica života, imovinske prilike). Tužba je obuhvatila i sticanje iz porodičnog domaćinstva bez dokaza.",
    keywords: ["nužni deo", "čl. 43 ZON", "poklon", "stvarno pravo", "revizija"],
    related_articles: ["čl. 42–43", "čl. 48", "čl. 51 ZON"],
    headnote:
      "Bez činjeničnog podloga za izuzetak sud ne može dosuditi susvojinu umesto novčane protivvrednosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4263/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li sud mora dozvoliti preinačenje tužbe sa zahteva za stvarnopravni nužni deo na novčani ako su ispunjeni uslovi iz čl. 43 ZON?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje stvarnopravnog zahteva za nužni deo, ali ukinuo rešenje kojim nije dozvoljeno preinačenje tužbe, naglašavajući obligacionu prirodu nužnog dela i potrebu posebnih okolnosti za stvarno pravo.",
    reasoning:
      "Prvostepeni sud je obračunao vrednost zaostavštine i poklone; tužilac traži suvlasništvo umesto novčane protivvrednosti bez dokaza o zajednici života, poljoprivrednom bavljenju i drugim kriterijumima.",
    keywords: ["nužni deo", "preinačenje tužbe", "obligaciono pravo", "Gž"],
    related_articles: ["čl. 43 ZON", "ZPP"],
    headnote:
      "Odbijanje meritornog stvarnog zahteva ne isključuje procesnu mogućnost preinačenja tužbe kad je predlog osnovan.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 514/2019",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilja mora dokazati obračunsku vrednost zaostavštine da bi uspeo zahtev za povredu nužnog dela?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio odbijanje zahteva jer tužilja nije dokazala obračunsku vrednost zaostavštine, što je njen teret dokazivanja.",
    reasoning:
      "Primenjene su odredbe o visini nužnog dela (čl. 40 st. 2), povredi (čl. 42) i popisu i proceni mase (čl. 42 st. 1 u vezi sa pasivom).",
    keywords: ["nužni deo", "obračunska vrednost", "teret dokazivanja", "ZON"],
    related_articles: ["čl. 40–42", "čl. 48 ZON"],
    headnote:
      "Bez procenjene mase nasleđa sud ne može utvrditi povredu nužnog dela.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 461/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li poklon celokupne imovine supruzi i deci iz drugog braka povređuje nužni deo ćerke iz prvog braka?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je utvrđena povreda nužnog dela i obaveza tuženih na isplatu novčane protivvrednosti uz primenu čl. 9, 40, 42–44 ZON.",
    reasoning:
      "Nužni deo potomka je polovina zakonskog dela; pokloni umanjuju raspoloživo pa sledi redukcija i solidarna obaveza isplate protivvrednosti.",
    keywords: ["poklon", "nužni deo", "potomak", "redukcija", "ZON"],
    related_articles: ["čl. 9", "čl. 40", "čl. 42–44 ZON"],
    headnote:
      "Masovni pokloni u korist jednog krga naslednika često povređuju nužni deo dece iz drugog braka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4245/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li pravo na nužni deo prelazi na naslednike nužnog naslednika ako je on pokrenuo parnicu pa preminuo?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da je pravo na nužni deo lično pravo koje gasi smrt nužnog naslednika, bez obzira na pokrenutu parnicu.",
    reasoning:
      "Iz čl. 40 ZON proizilazi da smanjenje raspolaganja i vraćanje poklona mogu tražiti samo nužni naslednici; ličnost prava isključuje nasledivanje tog potraživanja.",
    keywords: ["nužni deo", "lično pravo", "smrt stranke", "ZON"],
    related_articles: ["čl. 40 ZON", "čl. 414 st. 1 ZPP"],
    headnote:
      "Aktivnost u sporu ne čuva nužno pravo na nužni deo za potomke ako nosilac prava umre pre pravnosnažnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 560/2006",
    legal_area: "inheritance",
    legal_question:
      "Da li je za vraćanje poklona radi namirenja nužnog dela potrebna prethodna tužba za poništaj ili redukciju ugovora o poklonu?",
    court_position:
      "Vrhovni sud je ukinuo presude koje su odbile zahtev: vraćanje poklona radi nužnog dela ne zahteva prethodni poništaj ugovora o poklonu ako je predmet utvrđivanje sastava ostavinske mase.",
    reasoning:
      "Poklon polovine zgrade utiče na masu; zakonski naslednik koji je prihvatio testament bez traženja nužnog dela može naknadno tražiti utvrđivanje mase uključujući poklon. Pogrešan je stav da bez tužbe za poništaj nema osnova za utvrđenje celokupne kuće u masu.",
    keywords: ["poklon", "nužni deo", "ostavinska masa", "ZON"],
    related_articles: ["čl. 42", "čl. 48", "čl. 53 ZON"],
    headnote:
      "Logika namirenja nužnog dela dozvoljava fokus na masu bez formalističkog uslova posebne tužbe za svaki poklon.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6057/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li je tužba za redukciju poklona zbog povrede nužnog dela zastarela po isteku tri godine od smrti ostavioca?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: protivtužba je podneta posle isteka tri godine od smrti ostavioca u smislu čl. 39 ZON.",
    reasoning:
      "Nužni naslednici, povreda nužnog dela i popis mase uređeni su članovima 39–40, 42, 48 ZON; prekluzivni rok je protekao.",
    keywords: ["zastarelost", "poklon", "nužni deo", "čl. 39 ZON", "Gž"],
    related_articles: ["čl. 39", "čl. 40", "čl. 42", "čl. 48 ZON"],
    headnote:
      "Rok od tri godine od smrti za vraćanje poklona primenjuje se strogo na protivtužbu u istom sporu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5232/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li sin može tražiti bračnu tekovinu u zaostavštini majke i redukciju testamenta oca ako je majka prihvatila testament i nije tražila nužni deo u roku?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva: majka je prihvatila testament supruga, a zahtev za nužni deo i bračnu tekovinu nije blagovremen.",
    reasoning:
      "Rok od tri godine od proglašenja testamenta za redukciju; tužba iz 2017. protiv činjenica iz 1996. i prihvatanja u ostavini.",
    keywords: ["bračna tekovina", "nužni deo", "rok", "testament", "ZON"],
    related_articles: ["čl. 39–41 ZON"],
    headnote:
      "Prihvatanje testamenta u ostaviini i istek rokova vezuju i potomke koji kasno pokreću spor.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1870/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li je supruzi ostavioca povređen nužni deo ako je testamentom dobila doživotno plodouživanje čija je novčana vrednost veća od zakonskog nužnog dela od jedne četvrtine?",
    court_position:
      "Sud je odbio zahtev supruge za utvrđenje povrede nužnog dela: vrednost prava plodouživanja prevazilazi vrednost njenog nužnog dela; pravo na nužni deo moglo je biti ostvareno u ostavinskom postupku.",
    reasoning:
      "Nužni deo je zakonsko pravo na deo mase koji ostavilac ne može uskratiti; upoređenje plodouživanja sa hipotetičkim suvlasništvom 1/2 nije merodavno jer su instituti različiti.",
    keywords: ["plodouživanje", "nužni deo", "testament", "supružnik", "ZON"],
    related_articles: ["čl. 39–40 ZON"],
    headnote:
      "Plodouživanje može ekonomski zadovoljiti ili premašiti nužni deo bez dodatnog stvarnog prava.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6042/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li testament kojim je sva imovina ostavljena ćerki povređuje nužni deo sinova i da li tužena mora dokazati namirenje poklonima veće vrednosti?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je utvrđena povreda nužnog naslednog dela sinova i redukovan testament u korist ćerke; tužena nije dokazala da su tužioci za života ostavioca namireni poklonima koji bi umanjili nužni deo.",
    reasoning:
      "Primenjeni su čl. 39, 40 i 42 ZON (nasledni red, nužni deo potomaka, povreda). Po čl. 43 ZON prvenstveno je novčana protivvrednost, uz mogućnost stvarnog prava ako ostavilac nije odredio drugačije.",
    keywords: ["nužni deo", "redukcija testamenta", "potomci", "poklon", "ZON"],
    related_articles: ["čl. 39–40", "čl. 42–43 ZON"],
    headnote:
      "Teret dokazivanja namirenja poklonima u sporu o redukciji zavisi od tvrdnji stranaka i utvrđenog činjeničnog stanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 9839/2010",
    legal_area: "inheritance",
    legal_question:
      "Da li je prvostepena presuda o namirenju nužnog dela poklonom pravilna ako sud nije utvrdio vrednost zaostavštine, poklona i nužnog dela?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i vratio predmet na ponovno suđenje jer nisu utvrđene ključne činjenice za odluku o povredi nužnog dela i namirenju.",
    reasoning:
      "Po čl. 40 st. 2 i čl. 42 ZON nužni deo potomka je polovina zakonskog dela, a povreda postoji kada je vrednost raspolaganja i poklona manja od vrednosti nužnog dela — bez procene mase i poklona nema zakonitog zaključka.",
    keywords: ["nužni deo", "poklon", "procena", "veštačenje", "ZON"],
    related_articles: ["čl. 40 st. 2", "čl. 42", "čl. 48 ZON"],
    headnote:
      "Parnica o nužnom delu zahteva višefazni obračun aktive, pasive i poklona pre meritorne odluke.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1762/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li se odricanje od nasleđa u korist trećeg lica može pobijati kao dužnikova pravna radnja i da li je propuštanje prigovora na nužni deo takva radnja?",
    court_position:
      "Apelacioni sud je delimično preinačio presudu: odricanje od nasleđa u korist trećeg podleže pobijanju po pravilima o dužnikovim radnjama, dok propuštanje isticanja nužnog dela nije pravna radnja pogodna za pobijanje.",
    reasoning:
      "Zaštita nužnog dela je ovlašćenje, ne obaveza; nepostupanje nužnog naslednika ne predstavlja dobročino raspolaganje u korist drugih naslednika u smislu čl. 280–285 ZOO.",
    keywords: ["nužni deo", "odricanje od nasleđa", "pobijanje radnji", "ZOO", "ZON"],
    related_articles: ["čl. 280–285 ZOO", "čl. 394 tačka 4 ZPP"],
    headnote:
      "Razlikujte radnje koje imaju imovinski efekat u korist trećih od pasivnosti u ostavinskoj fazi.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5261/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li je nužni deo povređen ako je vrednost imovine koju je nužni naslednik stekao otkupom stana uz saglasnost ostavioca veća od vrednosti njegovog nužnog dela?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: utvrđeno je da je vrednost stečene imovine veća od nužnog dela, pa zahtev nije osnovan.",
    reasoning:
      "Primenjeni su čl. 40 i 42 ZON o obimu nužnog dela i uslovima povrede; nužni deo nije povređen kada je primljena zaostavština (uključujući sticanje otkupom) u vrednosti koja prekoračuje nužni deo.",
    keywords: ["nužni deo", "otkup stana", "obračun", "ZON"],
    related_articles: ["čl. 40", "čl. 42", "čl. 48 ZON"],
    headnote:
      "Otkup uz saglasnost ostavioca ulazi u procenu onoga što je nužni naslednik stekao u odnosu na nužni deo.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1883/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li je nužni nasledni deo tužilje povređen zaveštajnim raspolaganjem kada vrednost onoga što nasleđuje po zakonu premašuje vrednost nužnog dela?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio da nužni deo nije povređen; zahtev za redukciju testamenta je neosnovan. Deo revizije je odbačen kao nedozvoljen.",
    reasoning:
      "Nužni naslednici po čl. 39 i 40 ZON imaju zaštićeni deo mase; povreda po čl. 42 ne postoji kada zakonski nasledni deo u vrednosti prelazi nužni deo.",
    keywords: ["nužni deo", "redukcija testamenta", "obračun", "ZON"],
    related_articles: ["čl. 39–40", "čl. 42 ZON", "čl. 414 st. 1 ZPP"],
    headnote:
      "Bez matematičke povrede nužnog dela redukcija nema pravnog osnova.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1552/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilja ima pravo na nužni deo na stanu u Srbiji i na nepokretnosti u Sloveniji istom presudom ako je ostavinska masa delimično strana nadležnosti?",
    court_position:
      "Apelacioni sud je potvrdio punovažnost testamenta i pravo na nužni deo na stanu u Srbiji, ali je ukinuo deo izreke o nužnom delu na nepokretnosti u Sloveniji radi pitanja međunarodne nadležnosti i nerešenog spora o bračnoj imovini.",
    reasoning:
      "Obveznice nisu ušle u masu; tužilja je osporila testament i istakla nužni deo u ostaviini. Za imovinu u inostranstvu potrebna je posebna pravna osnova i dokazivanje.",
    keywords: ["nužni deo", "testament", "međunarodna nadležnost", "Slovenija", "ZON"],
    related_articles: ["čl. 39–43 ZON"],
    headnote:
      "Domaći sud može rešiti nužni deo samo za imovinu za koju je nadležan i potpuno raspoložio činjenicama.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2633/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li je moguće poništiti usmeno zaveštanje i utvrditi povredu nužnog dela bez potpune procene troškova sahrane, imovine u Crnoj Gori i statusa grobnog mesta?",
    court_position:
      "Apelacioni sud je ukinuo deo presude radi ponovnog utvrđivanja vrednosti zaostavštine i nužnog dela jer činjenično stanje o troškovima sahrane, imovini u Crnoj Gori i grobnom mestu nije potpuno razjašnjeno.",
    reasoning:
      "Pravna priroda nužnog dela je obligaciona po čl. 43 st. 1 ZON, uz mogućnost stvarnog zahteva po st. 2 uz procenu okolnosti; ipak, osnovni obračun mase mora biti potpun.",
    keywords: ["usmeno zaveštanje", "nužni deo", "procena mase", "grobno mesto", "ZON"],
    related_articles: ["čl. 43 ZON", "čl. 48 ZON"],
    headnote:
      "Mešovita imovina i specifična aktiva zahtevaju posebne dokaze pre konačne visine nužnog dela.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1431/2005",
    legal_area: "inheritance",
    legal_question:
      "Da li se pri vraćanju poklona radi namirenja nužnog dela uračunavaju svi pokloni ostavioca zakonskim naslednicima bez obzira da li je imovina u trenutku smrti bila u njihovom vlasništvu?",
    court_position:
      "Vrhovni sud je ukinuo presude koje su odbile zahtev supruge za redukciju poklona: pokloni se uračunavaju prema čl. 48 i 50 ZON i moraju se vratiti ako je to potrebno za namirenje nužnog dela drugog naslednika, bez obzira na trenutno vlasništvo predmeta.",
    reasoning:
      "Obračun mase uključuje dodatak vrednosti poklona svim zakonskim naslednicima; pojam poklona iz čl. 50 obuhvata i šira raspolaganja. Čl. 53 ZON uređuje redukciju i vraćanje poklona.",
    keywords: ["poklon", "nužni deo", "vraćanje poklona", "čl. 48 ZON"],
    related_articles: ["čl. 48", "čl. 50", "čl. 53 ZON"],
    headnote:
      "Poklon ne „nestaje“ iz ekonomskog uticaja na nužni deo samo jer je predmet prenet pre smrti ostavioca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5105/2012",
    legal_area: "inheritance",
    legal_question:
      "Da li se može dosuditi suvlasnički udeo radi namirenja nužnog dela ako prvostepeni sud nije pravilno utvrdio vrednost zaostavštine?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu o redukciji ugovora o poklonu i pravu susvojine i vratio predmet na ponovno suđenje zbog bitne povrede postupka i nepotpuno utvrđene vrednosti zaostavštine.",
    reasoning:
      "Čl. 42 i 43 ZON zahtevaju tačan obračun pre odluke o obligacionom ili stvarnopravnom obliku namirenja; bez toga nije moguće ispitati pravilnost primene materijalnog prava.",
    keywords: ["nužni deo", "poklon", "susvojina", "bitna povreda", "ZON"],
    related_articles: ["čl. 42–43 ZON", "čl. 374 ZPP"],
    headnote:
      "Stvarnopravni ishod bez ekonomski potkrepljene mase često završi ukidanjem.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 310/2017",
    legal_area: "inheritance",
    legal_question:
      "Da li tužba za uračunavanje poklona u nasledni deo mora obuhvatiti zakonskog naslednika koji se nasleđa odrekao u korist tužioca?",
    court_position:
      "Vrhovni kasacioni sud je preinačio presudu Apelacionog suda: lice koje se odreklo nasleđa u korist tužioca smatra se kao da nikada nije bilo naslednik, pa ne mora biti pasivno legitimirano u tužbi za uračunavanje poklona.",
    reasoning:
      "Čl. 66 st. 1 i čl. 71 ZON uređuju uračunavanje poklona i položaj lica umesto koga naslednik dolazi; odricanje u korist drugog menja krug pasivne legitimacije.",
    keywords: ["uračunavanje poklona", "odricanje od nasleđa", "pasivna legitimacija", "ZON"],
    related_articles: ["čl. 66 st. 1", "čl. 71 ZON", "čl. 211 ZPP"],
    headnote:
      "Procesna širina tužbe prati materijalnopravni efekat odricanja, a ne formalnu listu svih koji su ikad učestvovali u ostavini.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5021/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li je pravo na nužni deo primarno obligaciono i kada sud može dosuditi stvarnopravni zahtev?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo drugostepeno rešenje i naglasio da je nužni deo primarno obligacionog karaktera (novčana protivvrednost), dok stvarnopravni zahtev zahteva procenu u konkretnom slučaju po čl. 43 st. 2 ZON.",
    reasoning:
      "Alternativa između obligacionog i stvarnog zahteva je isključiva uz pretpostavku u korist obligacionog; sud procenjuje da li postoje razlozi za stvarno pravo.",
    keywords: ["nužni deo", "obligaciono pravo", "stvarno pravo", "čl. 43 ZON"],
    related_articles: ["čl. 42–43 ZON"],
    headnote:
      "Kasaciona kontrola ispravlja pogrešnu kvalifikaciju koja automatski dodeljuje stvarnopravni udeo.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 106/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li ugovor o poklonu nepokretnosti između ostavilje i tuženog povređuje nužni deo tužilje i u kom obliku se nužni deo namiri?",
    court_position:
      "Apelacioni sud je potvrdio utvrđenu povredu nužnog dela poklonom, odbio zahtev za stvarno pravo (susvojinu) i usvojio isplatu novčane protivvrednosti u smislu čl. 43 st. 1 ZON.",
    reasoning:
      "Nužni deo potomaka je polovina zakonskog dela po čl. 40 ZON; posle utvrđene povrede podrazumevano je novčano namirenje ako nisu dokazani razlozi za stvarni oblik.",
    keywords: ["poklon", "nužni deo", "novčana protivvrednost", "ZON"],
    related_articles: ["čl. 40", "čl. 42–43 ZON"],
    headnote:
      "Potvrda povrede ne implicira automatski idealni udeo na poklonjenoj stvari.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4456/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilja može uspešno tražiti utvrđenje povrede nužnog dela ako je deoba zajedničke imovine roditelja već izvršena tokom braka i nije dokazana obračunska vrednost zaostavštine?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio odbijanje zahteva: deoba je već izvršena, a bez dokaza o obračunskoj vrednosti zaostavštine nije moguće utvrditi povredu nužnog dela.",
    reasoning:
      "Primenjene su odredbe čl. 39–40 ZON o nužnim naslednicima i obimu nužnog dela; teret dokazivanja mase i povrede je na tužiocu.",
    keywords: ["nužni deo", "bračna imovina", "deoba", "teret dokazivanja", "ZON"],
    related_articles: ["čl. 39–40", "čl. 42", "čl. 48 ZON"],
    headnote:
      "Prethodna deoba imovine tokom života menja kontekst dokaza o ostavinskoj masi oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 61/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li su ispunjeni uslovi za dozvolu posebne revizije u sporu o prirodi prava na nužni deo kada je vrednost spora ispod cenzusa?",
    court_position:
      "Vrhovni sud nije dozvolio odlučivanje o posebnoj reviziji i odbacio reviziju kao nedozvoljenu; nisu ispunjeni zakonski uslovi, a vrednost spora je ispod cenzusa za redovnu reviziju.",
    reasoning:
      "Čl. 43 st. 1–2 ZON reguliše obligacionu i moguću stvarnu prirodu nužnog dela; bez novog tumačenja koje zadovoljava posebnu reviziju nema mesta odlučivanju.",
    keywords: ["posebna revizija", "nužni deo", "cenzus", "nedozvoljena revizija"],
    related_articles: ["čl. 43 ZON", "ZPP"],
    headnote:
      "Proceduralna prepreka isključuje meritorno ulazenje VKS u spor ispod vrednosnog praga.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 8987/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li je pravilna presuda o povredi nužnog dela ako prvostepeni sud nije ispravno izračunao obračunsku vrednost zaostavštine?",
    court_position:
      "Apelacioni sud je ukinuo presudu kojom je utvrđena povreda nužnog dela i vratio predmet jer nije pravilno obračunata vrednost zaostavštine, što je neophodan korak po čl. 48 i 42 ZON.",
    reasoning:
      "Bitna povreda iz čl. 374 st. 2 tačka 12 ZPP; nužni deo potomka zavisi od neto mase posle dugova, troškova popisa i sahrane.",
    keywords: ["nužni deo", "obračun", "ukidanje", "čl. 48 ZON", "ZPP"],
    related_articles: ["čl. 42", "čl. 48 ZON", "čl. 374 st. 2 tačka 12 ZPP"],
    headnote:
      "Pogrešna aritmetika mase čini meritornu odluku o povredi neproverljivom.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5235/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li trajanje ostavinskog postupka sa prekidom radi parnice o nužnom delu može predstavljati povredu prava na suđenje u razumnom roku?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku za postupak koji je trajao 22 godine; dosuđena je naknada nematerijalne štete od 1.700 evra.",
    reasoning:
      "Postupak je obuhvatao testament, pasivu zaostavštine i spor o nužnom delu; odbijanje veštačenja i teret dokazivanja na strani naslednika ne opravdava godinama kašnjenja bez efikasnog upravljanja postupkom.",
    keywords: ["ustavna žalba", "razuman rok", "ostavinski postupak", "nužni deo"],
    related_articles: ["čl. 32 Ustava RS", "čl. 28 ZON"],
    headnote:
      "Izuzetno dugo raspravljanje zaostavštine može povrediti ustavno pravo na rok, nezavisno od materijalnog ishoda.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 20647/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilja može uspešno tražiti ništavost ugovora o poklonu i doživotnom izdržavanju i isplatu nužnog dela bez dokaza o bitnim činjenicama?",
    court_position:
      "Vrhovni sud je odbio reviziju i potvrdio odbijanje zahteva za ništavost ugovora i isplatu nužnog dela: tužilja nije dokazala razloge ništavosti niti činjenice za obračun po članovima 48, 51 i 66 ZON.",
    reasoning:
      "Predmet nije raskid ugovora o izdržavanju zbog neispunjenja već ništavost; za obligacionu isplatu nužnog dela neophodan je pun dokaz o vrednosti mase i udelima.",
    keywords: ["poklon", "doživotno izdržavanje", "nužni deo", "dokazi", "ZON"],
    related_articles: ["čl. 43", "čl. 48", "čl. 51", "čl. 66 ZON"],
    headnote:
      "Čak i kada postoji sumnja na povredu, bez brojki sud ne može dosuditi isplatu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3158/2005",
    legal_area: "inheritance",
    legal_question:
      "Da li imovina obuhvaćena ugovorom o doživotnom izdržavanju ulazi u obračunsku vrednost zaostavštine za utvrđivanje nužnog dela?",
    court_position:
      "Vrhovni sud je odbio reviziju tužene i potvrdio nižestepene presude o redukciji ugovora o poklonu: imovina iz ugovora o doživotnom izdržavanju isključuje nužni deo i ne ulazi u masu iz koje se nužni naslednici namiru.",
    reasoning:
      "Čl. 48 ZON primenjuje se na raspolaganja koja uračunavaju nužni deo; ugovor o doživotnom izdržavanju nije besteretno raspolaganje u tom smislu, pa odvojeno poklonjena imovina može biti predmet redukcije.",
    keywords: ["doživotno izdržavanje", "poklon", "nužni deo", "redukcija", "ZON"],
    related_articles: ["čl. 48", "čl. 53 ZON", "čl. 393 ZPP"],
    headnote:
      "Distinkcija između teretnog izdržavanja i klasičnog poklona određuje šta ulazi u aktive za nužni deo.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 7085/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li prvostepeni sud može dosuditi pravo susvojine na stanu kao nužni deo bez ocene čl. 43 st. 2 ZON?",
    court_position:
      "Apelacioni sud je preinačio presudu i odbio zahtev za susvojinu: pravo na nužni deo je prvenstveno obligaciono, a tužilac nije dokazao posebne okolnosti za stvarnopravni zahtev.",
    reasoning:
      "U slučaju povrede nužnog dela tužilac može tražiti redukciju i vraćanje poklona; primena čl. 43 st. 1 zahteva novčanu protivvrednost osim ako nisu dokazani kriterijumi za st. 2.",
    keywords: ["nužni deo", "susvojina", "obligaciono pravo", "čl. 43 ZON"],
    related_articles: ["čl. 42–43 ZON"],
    headnote:
      "Preinačenje sa stvarnog na odbijanje štiti zakonitu pretpostavku novčanog namirenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4320/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li nužni naslednik može tražiti pravo svojine na nepokretnostima radi namirenja nužnog dela bez dokazivanja okolnosti iz čl. 43 st. 2 ZON?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca koji je tražio svojinu na nepokretnostima: pravo na nužni deo je primarno obligaciono, a za stvarno pravo potrebno je dokazivanje karaktera stvari, zajednice života i imovinskih prilika.",
    reasoning:
      "Tužba se odnosila na poklon majke u korist brata; transformacija obligacionog u stvarno pravo nije dozvoljena bez činjeničnog podloge.",
    keywords: ["nužni deo", "stvarno pravo", "poklon", "čl. 43 ZON"],
    related_articles: ["čl. 42–43 ZON"],
    headnote:
      "VKS ponavlja kriterijume za izuzetak od novčanog pravila u sporovima braće o poklonu roditelja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4473/2019",
    legal_area: "inheritance",
    legal_question:
      "Da li sud greši ako ne dozvoli preinačenje tužbe sa zahteva za stvarnopravni nužni deo na zahtev za novčanu protivvrednost i redukciju poklona?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude koje su odbile tužbu: greška je što nije dozvoljeno preinačenje tužbe, jer oba zahteva proističu iz istog činjeničnog i pravnog osnova u smislu čl. 43 ZON.",
    reasoning:
      "Ne traži se redukcija testamenta već ugovora o poklonu; obligacioni zahtev je pretpostavljen, a stvarni izuzetan — procesno mora biti moguć prelazak na obligacioni oblik.",
    keywords: ["preinačenje tužbe", "nužni deo", "poklon", "čl. 43 ZON", "ZPP"],
    related_articles: ["čl. 43 ZON", "ZPP"],
    headnote:
      "Formalno označavanje zahteva kao „svojina“ ne sme zatvoriti vrata redukciji i novcu bez preinačenja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3603/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li sud može dosuditi suvlasnički udeo kao nužni deo uprkos obligacionoj prirodi prava ako postoje posebne okolnosti?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tužilji dodeljen suvlasnički udeo na nepokretnostima kao nužni deo, ocenjujući da emotivna vezanost za imovinu i sporazum stranaka opravdavaju preobražaj u stvarno pravo uz čl. 43 st. 2 ZON.",
    reasoning:
      "Sud procenjuje karakter stvari, trajanje zajednice života sa ostavilcem, lične i imovinske prilike tužilja i okolnosti na strani poklonoprimca kao kumulativne kriterijume.",
    keywords: ["nužni deo", "stvarno pravo", "susvojina", "čl. 43 st. 2 ZON"],
    related_articles: ["čl. 42–43 ZON"],
    headnote:
      "Izuzetak u korist stvarnog prava moguć je kada konkretni životni i imovinski kontekst to zahteva.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3706/2019",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilja može tražiti pravo svojine na imovini kao nužni deo bez isticanja novčanog zahteva i dokaza za preobražaj iz čl. 43 st. 2 ZON?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: pravo na nužni deo je primarno obligaciono (novčana protivvrednost), a tužilja nije dokazala okolnosti za stvarnopravni zahtev.",
    reasoning:
      "Alternativnost i isključivost zahteva iz čl. 43 ZON; za preobražaj obligacionog u stvarni sud vrednuje karakter stvari, zajednicu života i imovinske prilike nužnog naslednika.",
    keywords: ["nužni deo", "obligaciono pravo", "stvarno pravo", "čl. 43 ZON"],
    related_articles: ["čl. 42–43 ZON"],
    headnote:
      "Tužba koja u suštini traži samo svojinu bez novčane alternative ostaje neosnovana ako nisu ispunjeni kriterijumi za st. 2.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4806/2012",
    legal_area: "inheritance",
    legal_question:
      "Da li Republika Srbija dužna na naknadu štete zbog poništaja sudskog zaveštanja ako tužilja nije dokazala da bi punovažno zaveštanje imalo materijalnopravno dejstvo u njen korist?",
    court_position:
      "Apelacioni sud je preinačio presudu i odbio tužbeni zahtev za naknadu štete: tužilja nije dokazala hipotetički ishod ostavine da je testament bio punovažan, pa visina štete nije utvrdiva.",
    reasoning:
      "Za odgovornost države zbog rada sudije pri sastavljanju zaveštanja potrebna je kauzalna veza sa štetom; imperativni nužni deo i eventualni udeli zahtevaju dokaz o meritornom ishodu.",
    keywords: ["sudsko zaveštanje", "naknada štete", "nužni deo", "dokazi"],
    related_articles: ["čl. 40–43 ZON", "ZOO"],
    headnote:
      "Šteta od poništaja sudskog akta zahteva dokaz kontrafaktualnog nasleđa, ne samo emotivnu štetu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3625/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li je pravilno dosuđen suvlasnički udeo na poklonjenoj nepokretnosti kao nužni deo bez procene posebnih okolnosti za preobražaj obligacionog u stvarno pravo?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i vratio predmet na ponovno suđenje radi utvrđivanja okolnosti iz čl. 43 st. 2 ZON (karakter stvari, zajednica života, imovinske prilike).",
    reasoning:
      "Iako je nužni deo povređen, prelazak na stvarnopravno namirenje zahteva posebnu ocenu; bez nje presuda nije zakonita.",
    keywords: ["nužni deo", "poklon", "stvarno pravo", "ukidanje", "ZON"],
    related_articles: ["čl. 42–43 ZON"],
    headnote:
      "Automatsko „dodeljivanje udela“ na poklonjenoj stvari posle utvrđene povrede nije dozvoljeno bez kriterijalne analize.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4171/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li je tužba za isplatu novčane protivvrednosti nužnog dela blagovremena ako je podneta posle tri godine od proglašenja zaveštanja?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i odbio zahtev za isplatu jer je protekao materijalni prekluzivni rok od tri godine od proglašenja zaveštanja.",
    reasoning:
      "Rok teče kontinuirano bez zastoja kao kod zastarelosti; pravo na isticanje nužnog dela u tom delu je ugašeno.",
    keywords: ["nužni deo", "rok", "proglašenje testamenta", "prekluzija", "ZON"],
    related_articles: ["čl. 41–42 ZON"],
    headnote:
      "Kasnjenje sa isplatom novčanog nužnog dela posle isteka tri godine od proglašenja dovodi do neosnovanosti zahteva.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 500/2020",
    legal_area: "inheritance",
    legal_question:
      "Ko snosi teret dokazivanja vrednosti poklona u trenutku utvrđivanja zaostavštine i da li nedostatak dokaza o povredi nužnog dela dovodi do odbijanja zahteva?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da tužioci nisu dokazali povredu ni visinu nužnog dela, uključujući procenu poklona po čl. 51 ZON.",
    reasoning:
      "Primarno je novčana protivvrednost; za stvarno pravo potrebni su posebni dokazi i okolnosti. Tužba o poklonu babe u korist sestre zahteva ekonomsku argumentaciju.",
    keywords: ["teret dokazivanja", "nužni deo", "poklon", "čl. 51 ZON"],
    related_articles: ["čl. 43", "čl. 48", "čl. 51 ZON"],
    headnote:
      "Vrednost poklona u stanju u vreme poklona a ne samo kasnija retorika određuje obračun.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5146/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilja može uspešno tražiti utvrđenje nužnog dela i stvarnopravne posledice bez dokaza o porodičnoj zajednici i obračunu zaostavštine?",
    court_position:
      "Apelacioni sud je ukinuo nižestepene presude i odbio sve tužbene zahteve: nisu dokazane okolnosti za stvarno pravo ni elementi za obračun mase i povrede.",
    reasoning:
      "Čl. 43 st. 2 ZON zahteva konkretne razloge i dokaze; bez toga zahtev ostaje neosnovan.",
    keywords: ["nužni deo", "dokazi", "porodična zajednica", "obračun", "ZON"],
    related_articles: ["čl. 42–43", "čl. 48 ZON"],
    headnote:
      "Opšte tvrdnje o domaćinstvu bez dokaza ne zamenjuju veštačenje i popis mase.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 233/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li se stan poklonjen supruzi mora uračunati u njen nasledni deo kao poklon ostavioca nužnom nasledniku?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva za uračunavanje: utvrđeno je da je posao bio simuliran, odnosno da se radilo o vraćanju imovine koja je izvorno pripadala supruzi.",
    reasoning:
      "Povreda nužnog dela po čl. 42 ZON pretpostoji stvarno besteretno raspolaganje; simulacija menja pravnu kvalifikaciju.",
    keywords: ["simulacija", "poklon", "uračunavanje", "nužni deo", "ZON"],
    related_articles: ["čl. 42", "čl. 48", "čl. 66–77 ZON"],
    headnote:
      "Fiktivni poklon ne ulazi u mehanizam uračunavanja koji štiti nužne naslednike.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2832/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilja može dobiti redukciju testamenta i stvarnopravni nužni deo bez dokaza o vrednosti zaostavštine i posebnim okolnostima za čl. 43 st. 2 ZON?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i odbio tužbeni zahtev za redukciju zaveštanja jer nisu dokazane okolnosti za stvarni oblik ni elementi obračuna povrede.",
    reasoning:
      "Testament je proglašen pred javnim beležnikom; tužilja je tražila redukciju i vlasništvo na 1/4 mase bez potpunog dokaznog postupka.",
    keywords: ["redukcija testamenta", "nužni deo", "dokazi", "ZON"],
    related_articles: ["čl. 40–43", "čl. 48 ZON"],
    headnote:
      "Menjanje tužbenog kvaliteta (ništavost vs nužni deo) ne oslobađa teret dokazivanja mase.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 14435/2010",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilac kao nužni naslednik može uspešno tražiti utvrđenje povrede nužnog dela ako odbije da predloži veštačenje radi utvrđivanja vrednosti zaostavštine?",
    court_position:
      "Apelacioni sud je preinačio presudu i odbio tužbeni zahtev jer tužilac nije ispunio teret dokazivanja, uključujući predlog veštačenja za ukupnu vrednost mase po čl. 48 ZON.",
    reasoning:
      "Nužni deo nije 1/4 poklonjenih nepokretnosti već deo neto mase; sud nije dužan da odredi veštačenje po službenoj dužnosti kada stranka pasivno blokira postupak.",
    keywords: ["teret dokazovanja", "veštačenje", "nužni deo", "ZON"],
    related_articles: ["čl. 42", "čl. 48 ZON"],
    headnote:
      "Odbijanje sarađivanja u ekonomskom dokazivanju mase pada na teret nužnog tužioca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 12706/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li je zastareo zahtev za obligaciono pravo na nužni deo i da li postoje dokazi za stvarnopravni zahtev?",
    court_position:
      "Vrhovni sud je odbio reviziju kao neosnovanu i potvrdio da je obligacioni zahtev zastareo te da tužilja nije dokazala razloge za dosuđivanje stvarnog prava.",
    reasoning:
      "Tužba iz 2006. sa dopunama do 2018.; rokovi i priroda prava na nužni deo iz čl. 43 ZON; nedostatak opravdanja za stvarni oblik.",
    keywords: ["zastarelost", "nužni deo", "revizija", "ZON"],
    related_articles: ["čl. 41–43 ZON"],
    headnote:
      "Kombinacija zastarelosti obligacionog dela i nedostatka dokaza za st. 2 zatvara put do svojine.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2757/2005",
    legal_area: "inheritance",
    legal_question:
      "Da li ugovor o poklonu celog stana u korist jednog deteta od strane oba roditelja povređuje nužni deo drugog deteta i u kom delu?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio nižestepene presude o delimičnoj redukciji ugovora o poklonu: poklon roditelja sinu povredio je nužni deo ćerke u meri 5/24 idealnog dela stana.",
    reasoning:
      "Polovina stana od majke i polovina od oca donose različite komponente nužnog dela; primenjeni su čl. 39–40 i 42 ZON.",
    keywords: ["poklon", "nužni deo", "deca", "5/24", "ZON"],
    related_articles: ["čl. 39–40", "čl. 42 ZON"],
    headnote:
      "Zbirni efekat poklona oba roditelja na jedno dete obračunava se odvojeno po polovinama roditeljskog uloga.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1958/2019",
    legal_area: "inheritance",
    legal_question:
      "Da li je ugovor o doživotnom izdržavanju simulacija ugovora o poklonu i da li je dokazana obračunska vrednost zaostavštine za nužni deo?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio da ugovor o izdržavanju nije simuliran poklon te da nije dokazana vrednost mase za uspeh u delu nužnog dela.",
    reasoning:
      "Volja strana bila je izdržavanje u skladu sa zdravstvenim i finansijskim stanjem oca; tužilja nije dokazala simulaciju poklona niti obračunsku vrednost zaostavštine za uspeh u delu nužnog dela u odnosu na ugovor o doživotnom izdržavanju.",
    keywords: ["simulacija", "doživotno izdržavanje", "poklon", "nužni deo", "ZON"],
    related_articles: ["čl. 39–43", "čl. 48 ZON"],
    headnote:
      "Dugotrajno ispunjavanje obaveza izdržavanja oslabljava tvrdnju o simulaciji poklona.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2864/2012",
    legal_area: "inheritance",
    legal_question:
      "Da li naslednica nasleđuje obavezu ispunjenja legata (kupovina stana isporukoprimcu) ako ispunjenje ne dira u njen nužni deo?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je naslednica obavezana da ispuni legat: obaveza prelazi na pravnog sledbenika, a vrednost ispunjenja ne umanjuje nužni deo ispod zakonskog minimuma.",
    reasoning:
      "Procena vrednosti nasleđa i nužnog dela pokazuje da ispunjenje legata ostaje unutar raspoloživog dela.",
    keywords: ["legat", "isporuka", "naslednik", "nužni deo", "ZON"],
    related_articles: ["čl. 40 ZON", "čl. 118–134 ZON"],
    headnote:
      "Legatarna obaveza nije automatski suprotna nužnom delu ako ekonomska analiza to isključuje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5539/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li je zaveštanjem povređen nužni deo unuka i kako se nužni deo namiri novčano nakon utvrđene vrednosti zaostavštine?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu, održao raspravu i doneo meritornu odluku: utvrđena je povreda nužnog dela unuka, izvršena redukcija zaveštanja i solidarna obaveza testamentalnih naslednika na isplatu novčane protivvrednosti.",
    reasoning:
      "Masa procenjena u skladu sa čl. 48 ZON; nužni deo potomaka po čl. 40; postojeća imovina i zaveštajna raspolaganja nisu pokrivala nužne delove.",
    keywords: ["redukcija zaveštanja", "nužni deo", "unuci", "solidarna obaveza", "ZON"],
    related_articles: ["čl. 40", "čl. 42", "čl. 44", "čl. 48 ZON"],
    headnote:
      "Drugostepeni sud može sam rešiti stvar kada je prvostepena odluka nezakonita ali je činjenično stanje dovoljno utvrđeno.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4030/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li je valjana izjava zakonskog naslednika kojom se odriče uživanja u korist testamentalnog naslednika ako je suprotna testamentarnom odložnom uslovu?",
    court_position:
      "Apelacioni sud je utvrdio ništavost izjave o odricanju od nasleđa koja je u suprotnosti sa voljom zaveštaoca izraženom u odložnom uslovu; naknadna izjava ne menja testament.",
    reasoning:
      "Pravilnik o izjavama u ostaviini zahteva preciznost; odricanje samo u svoje ime (čl. 155 ZON u kontekstu postupka).",
    keywords: ["odricanje od nasleđa", "testament", "uslov", "ništavost", "ZON"],
    related_articles: ["čl. 155–158 ZON"],
    headnote:
      "Uslov zaveštaoca ima prioritet nad naknadnim voljama naslednika usmerenim protiv tog uslova.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 410/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li sud po službenoj dužnosti vodi računa o proteku prekluzivnog roka od tri godine od proglašenja zaveštanja za redukciju?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva za redukciju zaveštanja jer je protekao prekluzivni rok od tri godine od proglašenja, bez obzira na kasnije procesne okolnosti.",
    reasoning:
      "Tužilja je saznala zaveštajne naslednike u vreme proglašenja; raniji postupci i povlačenje tužbe ne produžavaju prekluzivni rok.",
    keywords: ["prekluzija", "redukcija", "testament", "nužni deo", "ZON"],
    related_articles: ["čl. 41–42 ZON"],
    headnote:
      "Prekluzivni rokovi za nužni deo nisu isti kao zastarelost potraživanja — sud ih primenjuje ex officio.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1662/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilac može uspešno tražiti ništavost, raskid i redukciju ugovora o poklonu između oca i sestre bez veštačenja mase i dokaza o zastarelosti nužnog dela?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje svih zahteva: ugovor nije ništav, raskid poklona nije predviđen (samo poništaj), a za nužni deo nije predloženo veštačenje niti su dokazi o zastarelosti osporeni osnovano.",
    reasoning:
      "Primenjeni čl. 39, 40, 43, 48 i 53 ZON; motiv poklona nije isključivo briga sestre jer volja poklonodavca podržava raspolaganje.",
    keywords: ["poklon", "nužni deo", "raskid", "veštačenje", "ZON"],
    related_articles: ["čl. 39–40", "čl. 43", "čl. 48", "čl. 53 ZON"],
    headnote:
      "Raskid i poništaj poklona nisu istovetni instituti u naslednom kontekstu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4747/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li su ispunjeni uslovi za dozvolu posebne revizije u ostavinskom postupku kada vrednost zaostavštine po taksi ne prelazi cenzus?",
    court_position:
      "Vrhovni kasacioni sud nije dozvolio odlučivanje o posebnoj reviziji i odbacio reviziju kao nedozvoljenu zbog neispunjenosti zakonskih uslova i vrednosti ispod cenzusa za redovnu reviziju.",
    reasoning:
      "Složena lista naslednika i potvrda nižih rešenja ne menjaju vrednosni prag za dopuštenost revizije u imovinskim stvarima.",
    keywords: ["posebna revizija", "ostavinski postupak", "cenzus", "nedozvoljena revizija"],
    related_articles: ["ZPP"],
    headnote:
      "Ostavinski predmeti ostaju u okviru vrednosnih ograničenja za kasacioni nadzor.",
    outcome: "procedural",
  },
]
