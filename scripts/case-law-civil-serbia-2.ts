// scripts/case-law-civil-serbia-2.ts
// Serbian case law: contract breach, raskid, ugovorna kazna, privatization, lease, construction (76 entries, batches 1–3 complete).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CIVIL_SERBIA_2: CaseLawInput[] = [
  // ── BATCH 1 (1/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1446/2019",
    legal_area: "civil",
    legal_question:
      "Da li su nižestepeni sudovi pravilno raskinuli ugovor o suinvestiranju kada ostaje sporno da li su elektro-radovi bili ugovorna obaveza čije neizvršenje opravdava raskid ili poseban posao?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude zbog nepotpuno utvrđenog činjeničnog stanja i pogrešne primene materijalnog prava u odnosu na predmet obaveze čije neispunjenje može dovesti do raskida.",
    reasoning:
      "Raskid ugovora zbog neispunjenja pretpostavlja jasno definisane obaveze strana i neizvršenje od strane dužnika. Ako ostaje nejasno da li je predmet spora bio sastavni deo ugovorne obaveze ili samostalan posao, sud ne može meritorno odlučiti o osnovanosti raskida. Primena čl. 124 ZOO zahteva precizno utvrđenje šta je bilo ugovoreno kao obaveza čije kršenje otvara raskid.",
    keywords: ["raskid ugovora", "suinvestiranje", "neispunjenje", "čl. 124 ZOO", "ukidanje"],
    related_articles: ["čl. 124 ZOO", "čl. 132 ZOO"],
    headnote:
      "Raskid zbog neispunjenja: nužno jasno utvrditi predmet ugovorne obaveze; nepotpuno činjenično stanje povlači ukidanje.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5210/2019",
    legal_area: "civil",
    legal_question:
      "Da li kupac može raskinuti ugovor o kupoprodaji stana zbog neisplate cene kada je cena u celosti izmirena isporukom građevinskog materijala pre zaključenja ugovora, kako je ugovorom i konstatovano?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i odbacio zahtev za raskid, jer nije dokazan razlog za raskid: kupac je u celosti izvršio obavezu plaćanja na ugovoreni način.",
    reasoning:
      "Po čl. 124 ZOO raskid zbog neispunjenja dolazi u obzir kada jedna strana ne ispuni dospelu obavezu. U dvostrano obaveznim ugovorima neizvršenje jedne strane može dati drugoj pravo na raskid, ali ovde je utvrđeno da je tuženi (kupac) obavezu ispunio isporukom materijala kako je predviđeno ugovorom, pa uslova za raskid nema.",
    keywords: ["kupoprodaja stana", "raskid", "ispunjenje obaveze", "čl. 124 ZOO"],
    related_articles: ["čl. 124 ZOO", "čl. 454 ZOO"],
    headnote: "Raskid kupoprodaje odbijen kada je kupac cenu u celosti platio materijalom kako je ugovoreno.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 1059/2024",
    legal_area: "civil",
    legal_question:
      "Da li investitor odgovara za štetu izvođaču zbog raskida ugovora po samom zakonu kada propusti u glavnom projektu onemogućavaju izvršenje radova u roku?",
    court_position:
      "Sud je obavezao tuženog da naknadi štetu izvođaču posle raskida ugovora po samom zakonu, utvrdivši odgovornost za vrednost materijala usled projektnih nedostataka koji sprečavaju rokovno izvođenje.",
    reasoning:
      "Po čl. 132 st. 1 ZOO raskidom strane se oslobađaju obaveza osim naknade eventualne štete. Po čl. 262 st. 2 ZOO poverilac može tražiti štetu pri neispunjenju ili docnji. Naknada obuhvata običnu štetu i izmaklu korist predvidljivu po čl. 266 st. 1 ZOO. Tuženi kao ugovorna strana koja nije postupala savesno odgovara za štetu iz neispunjenja ugovornih obaveza.",
    keywords: ["raskid po zakonu", "projekat", "šteta izvođača", "čl. 132 ZOO", "čl. 262 ZOO"],
    related_articles: ["čl. 132 st. 1 ZOO", "čl. 262 st. 2 ZOO", "čl. 266 st. 1 ZOO"],
    headnote: "Raskid i naknada štete izvođaču zbog projektnih propusta investitora; primena čl. 132 i 262 ZOO.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 143/2020",
    legal_area: "civil",
    legal_question:
      "Da li tužilac ostvaruje naknadu štete zbog raskida ugovora o kreditu kada je pristao na povraćaj sredstava posle izjave tužene o raskidu, umesto da traži ispunjenje?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca za naknadu štete, prihvativši stav da je sporazumni raskid usled ponašanja tužioca isključio osnov za traženu naknadu.",
    reasoning:
      "Prvostepeni sud je nalazio odgovornost tužene za docnju i puštanje tranše; drugostepeni sud je preinačio i ocenio da je tužilac povredio ugovor i da je tužena vratila uplaćena sredstva u skladu sa čl. 132 st. 1–2 ZOO. Tužilac nije dokazao štetu od propuštanja tužene niti odgovornost u smislu čl. 154–155 ZOO; krivica za raskid pripisana je tužiocu.",
    keywords: ["kredit", "raskid", "sporazumni raskid", "čl. 132 ZOO", "naknada štete"],
    related_articles: ["čl. 124 ZOO", "čl. 132 ZOO", "čl. 262 ZOO", "čl. 154 ZOO", "čl. 155 ZOO"],
    headnote: "Naknada posle raskida kredita odbijena kada drugostepeni sud utvrdi krivicu tužioca i pravilno primeni čl. 132 ZOO.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 9601/2018",
    legal_area: "civil",
    legal_question:
      "Da li investitor koji ne preda poslovni prostor iz predugovora o kupoprodaji odgovara za punu štetu u visini tržišne vrednosti kada je znao da obavezu ne može ispuniti (namerno neispunjenje predugovora)?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i obavezao tuženog na isplatu 3.562.904 dinara, jednako tržišnoj vrednosti lokala koji nije predat u skladu sa predugovorom.",
    reasoning:
      "Kod prevare, namernog neispunjenja ili krajnje nepažnje poverilac može tražiti punu štetu (predvidljivu inače, ovde prošireno). Utvrđeno je da je investitor preuzeo stanove i delimično ispunio, ali namerno nije predao dogovoreni poslovni prostor, pozivajući se na nezaključenu cesiju kojom tužilja nije vezana. Činjenica da tužilja nije tražila glavni ugovor o prenosu ne sprečava potraživanje pune naknade za nepostojeći lokal utvrđen veštačenjem.",
    keywords: ["predugovor", "kupoprodaja nepokretnosti", "puna šteta", "namerno neispunjenje", "čl. 45 ZOO"],
    related_articles: ["čl. 45 ZOO", "čl. 124 ZOO", "čl. 262 ZOO"],
    headnote: "Predugovor: investitor dužan na punu štetu u visini tržišne vrednosti nedatog poslovnog prostora pri nameri neispunjenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 1718/2022",
    legal_area: "civil",
    legal_question:
      "Da li zakupodavac gubi pravo na naknadu izmakle koristi zbog prevremenog prestanka zakupa kada preuzme prostor u državinu i izda ga trećem licu?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju zakupca i potvrdio obavezu naknade štete u vidu izmakle koristi, smatrajući da preuzimanje predmeta zakupa ne predstavlja odrek od štetnog zahteva.",
    reasoning:
      "Raskid zbog neispunjenja u dispoziciji je strane koja je verna ugovoru. Zakupodavac je mogao raskinuti zbog neplaćanja zakupnine ili tražiti izvršenje. Preuzimanjem prostora strane su se saglasile na raskid, ali to ne gasi pravo na naknadu zbog prevremenog raskida (izgubljena dobit). Primena čl. 148, 262 st. 2, 266 st. 1, 567 st. 1, 583 st. 1 ZOO i kamate po čl. 277 st. 1 ZOO.",
    keywords: ["zakup", "izgubljena dobit", "prevremeni raskid", "čl. 262 ZOO", "čl. 277 ZOO"],
    related_articles: ["čl. 148 ZOO", "čl. 262 st. 2 ZOO", "čl. 266 st. 1 ZOO", "čl. 567 st. 1 ZOO", "čl. 583 st. 1 ZOO", "čl. 277 st. 1 ZOO"],
    headnote: "Preuzimanje zakupljenog prostora od strane zakupodavca ne isključuje naknadu izmakle koristi od zakupca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 1264/2022",
    legal_area: "civil",
    legal_question:
      "Da li je osnovana naknada štete zakupodavcu kada zakupac prevremeno napušta poslovni prostor i da li čl. 580 st. 2 ZOO o novom zakupu isključuje štetni zahtev?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio dosudu naknade štete (izgubljena dobit / razlika zakupnine) zbog prevremenog napuštanja prostora.",
    reasoning:
      "Isti princip kao u srodnim predmetima: raskid zbog neplaćanja zakupnine u volji je verne strane; preuzimanje prostora ne ukida pravo na naknadu izmakle koristi. Revidentov prigovor da je raskid posledica novog ugovora sa trećim licem po čl. 580 st. 2 ZOO nije prihvaćen kao osnov za ukidanje potvrđene obaveze naknade uz primenu čl. 262, 266 i 277 ZOO.",
    keywords: ["zakup", "prevremeni raskid", "čl. 580 ZOO", "izgubljena dobit"],
    related_articles: ["čl. 148 ZOO", "čl. 262 st. 2 ZOO", "čl. 580 st. 2 ZOO", "čl. 277 st. 1 ZOO"],
    headnote: "Naknada zakupodavcu za prevremeni odlazak zakupca potvrđena; posebni revizijski argumenti o čl. 580 st. 2 ZOO odbijeni.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 138/2015",
    legal_area: "commercial",
    legal_question:
      "Da li se ugovorna kazna iz sporazuma može naplatiti posle raskida ugovora o prodaji društvenog kapitala zbog neispunjenja?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju Agencije za privatizaciju i potvrdio da sporazum o ugovornoj kazni deli pravnu sudbinu glavnog ugovora, pa je sa raskidom prestala i obaveza plaćanja kazne.",
    reasoning:
      "Ugovorna kazna je akcesorna obaveza po čl. 272 st. 1 ZOO. Raskidom ugovora o prodaji društvenog kapitala u smislu Zakona o privatizaciji prestaju sve obaveze iz tog ugovora, uključujući sporazum o kazni. Tužilac se nije pozivao na naknadu štete po čl. 132 ZOO već na kaznu po ugovoru, pa nakon raskida aktivacija kazne nije moguća.",
    keywords: ["ugovorna kazna", "privatizacija", "akcesornost", "čl. 272 ZOO", "raskid"],
    related_articles: ["čl. 272 st. 1 ZOO", "čl. 41 Zakon o privatizaciji", "čl. 270–276 ZOO"],
    headnote: "Posle raskida ugovora o prodaji društvenog kapitala nema naplate ugovorne kazne iz akcesornog sporazuma.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6797/2016",
    legal_area: "commercial",
    legal_question:
      "Da li se može tražiti isplata ugovorne kazne posle raskida ugovora o prodaji društvenog kapitala po sili zakona?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje tužbe za ugovornu kaznu, jer kazna deli sudbinu glavnog ugovora i ne može se aktivirati posle prestanka glavne obaveze.",
    reasoning:
      "Pravila čl. 270–276 ZOO definišu ugovornu kaznu kao akcesornu na glavnu obavezu. Raskid ugovora o prodaji društvenog kapitala po čl. 41.a Zakona o privatizaciji gasi obaveze iz ugovora, pa i kaznenu klauzulu. Cilj kazne je obezbeđenje ispunjenja, ali akcesornost ne može biti izuzeta ni činjenicom raskida po samom zakonu.",
    keywords: ["ugovorna kazna", "privatizacija", "Pž", "akcesornost"],
    related_articles: ["čl. 270–276 ZOO", "čl. 41.a Zakona o privatizaciji"],
    headnote: "PAS potvrđuje: ugovorna kazna posle raskida ugovora o privatizaciji nije potraživa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1887/2019",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepeni sud može delimično dosuditi naknadu štete zbog neizgradnje objekta bez jasnog razmatranja aktivne legitimacije svakog tužioca?",
    court_position:
      "Privredni apelacioni sud je ukinuo presudu zbog nejasnih razloga i nepotpuno utvrđenog činjeničnog stanja, posebno u delu legitimacije tužilaca za dosuđene iznose.",
    reasoning:
      "Sud je dosudio običnu štetu i izmaklu korist pozivajući se na čl. 262 i 186 ZOO, ali nije razjasnio ko je oštećeni za koji deo potraživanja. Bez toga meritorna odluka nije podnožena jasnim činjenicama i logičnim lancem dokaza.",
    keywords: ["legitimacija", "naknada štete", "javna nabavka", "ukidanje"],
    related_articles: ["čl. 262 ZOO", "čl. 186 ZOO", "čl. 375 ZPP"],
    headnote: "Ukidanje zbog nejasnih razloga o aktivnoj legitimaciji kod delimično dosuđene štete.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 426/2023",
    legal_area: "commercial",
    legal_question:
      "Da li poverilac može tražiti ugovornu kaznu kada je ugovor o poslovno-tehničkoj saradnji raskinut po sili zakona zbog toga što poverilac nije u roku dostavio dokumentaciju?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilaca i potvrdio da tužilac nema pravo na ugovornu kaznu jer je raskid usledio iz njegove strane neispunjenje obaveze za koju je kazna bila sredstvo obezbeđenja.",
    reasoning:
      "Ugovor je raskinut po sili zakona jer tužilac nije u ugovorenom roku ispunio obavezu čije je neispunjenje vezivalo ugovornu kaznu. U toj konstelaciji tužilac nije strana ovlašćena da traži kaznu. Primena čl. 414 ZPP; troškovi odgovora na reviziju nisu dosuđeni kao ne nužni.",
    keywords: ["ugovorna kazna", "raskid po sili zakona", "poslovno-tehnička saradnja"],
    related_articles: ["čl. 125 ZOO", "čl. 126 ZOO", "čl. 273 ZOO", "čl. 414 ZPP"],
    headnote: "Kazna ne pripada strani koja je svojim neispunjenjem izazvala raskid po sili zakona.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2713/2018",
    legal_area: "civil",
    legal_question:
      "Da li pokretanje parnice za naknadu štete od ranije povrede ugovora predstavlja zakonit osnov za jednostrani raskid dugoročnog ugovora od strane druge strane?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio naknadu štete, smatrajući da tužba i spor oko štete iz prethodnog ciklusa ne opravdavaju jednostrani raskid budućih ugovora bez skrivljenog neispunjenja.",
    reasoning:
      "Neispunjenje koje otvara raskid mora biti skrivljeno. Izjava o raskidu zbog nemogućnosti saradnje sa partnerima koji „rešavaju sudovima“ ne opravdava raskid ako je motiv pokretanjem tužbe za štetu iz prethodnog jednogodišnjeg ugovora, što nije zakoniti razlog za prekid narednih ugovora.",
    keywords: ["dugoročni ugovor", "raskid", "naknada štete", "krivica"],
    related_articles: ["čl. 124 ZOO", "čl. 132 ZOO", "čl. 154 ZOO"],
    headnote: "Parnica za štetu iz prethodnog perioda nije samostalan zakoniti razlog za jednostrani raskid narednih ugovora.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž4 230/2021",
    legal_area: "civil",
    legal_question:
      "Da li jednostrana odluka naručioca da stavi ugovor van snage zbog skraćenja rokova projekta opravdava odbijanje isplate autorskog honorara posle prihvata izvršenih dela?",
    court_position:
      "Apelacioni sud je potvrdio obavezu isplate preostalog autorskog honorara, jer uslovi za raskid po promenjenim okolnostima nisu bili dokazani i jer je naručilac prihvatio ispunjenje i posle datuma obustave aktivnosti.",
    reasoning:
      "Strana koja se poziva na promenjene okolnosti po čl. 133 ZOO mora dokazati nastanak okolnosti i obavestiti drugu stranu blagovremeno (čl. 134 ZOO, savesnost). Zaključak upravnog odbora nije dokaz o onemogućenosti isplate; naručilac je u decembru 2018. prihvatio ispunjenje, pa je dužan na honorar za primljena dela.",
    keywords: ["autorski honorar", "raskid ugovora", "promenjene okolnosti", "čl. 133 ZOO"],
    related_articles: ["čl. 133 ZOO", "čl. 134 ZOO", "čl. 124 ZOO"],
    headnote: "Van snage ugovora ne oslobađa isplate honorara ako je ispunjenje prihvaćeno i nisu dokazani uslovi za raskid.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 107/2019",
    legal_area: "civil",
    legal_question:
      "Da li dužnik koji nije ispunio svoju obavezu može jednostrano raskinuti ugovor o prenosu udela?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude koje su odbile isplatu po ugovoru, naglašavajući da jednostrani raskid nije dopušten bez osnova, posebno od strane dužnika koji sam krši ugovor.",
    reasoning:
      "Raskid zbog neispunjenja uređen je čl. 124–132 ZOO; promenjene okolnosti čl. 133–136; nemogućnost čl. 137–138. Samo strana koja je ispunila može u propisanim slučajevima tražiti raskid zbog neispunjenja druge strane. Tužilac je smatrao da je on jedini ovlašćen na raskid jer je ispunio svoj deo obaveze.",
    keywords: ["raskid", "prenos udela", "čl. 124 ZOO", "dužnik"],
    related_articles: ["čl. 124 ZOO", "čl. 126 ZOO", "čl. 127 ZOO"],
    headnote: "Jednostrani raskid od strane dužnika koji ne ispunjava obavezu nije dopušten; ukidanje zbog pogrešne primene prava.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2804/2022",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepeni sud mora oceniti zahtev dužnika za smanjenje nesrazmerno visoke ugovorne kazne za prevremeni raskid zakupa?",
    court_position:
      "Privredni apelacioni sud je ukinuo presudu i naložio ponovno odlučivanje jer prvostepeni sud nije primenio pravilo o smanjenju previsoke ugovorne kazne.",
    reasoning:
      "Ugovorna kazna može biti ugovorena za nenovčanu obavezu; neispunjenje u roku koji nije bitan sastojak vodi na raskid po čl. 125 ili posle naknadnog roka po čl. 126 ZOO. Sud je dužan da razmotri zahtev za redukciju kazne kada je ona nesrazmerna, što je u prvom postupku propusto.",
    keywords: ["ugovorna kazna", "smanjenje", "zakup", "čl. 125 ZOO", "čl. 126 ZOO"],
    related_articles: ["čl. 125 ZOO", "čl. 126 ZOO", "čl. 271–273 ZOO"],
    headnote: "Ukidanje jer prvostepeni sud nije ocenio smanjenje previsoke ugovorne kazne.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 404/2018",
    legal_area: "commercial",
    legal_question:
      "Da li celokupan nerealizovan iznos javne nabavke predstavlja naknadu štete bez dokaza o čistoj dobiti, PDV-u i troškovima izvršenja?",
    court_position:
      "Privredni apelacioni sud je usvojio žalbu tuženog i ukinuo prvostepenu presudu koja je dosudila štetu u visini celog nerealizovanog ugovora, jer izmakla korist obuhvata samo čistu dobit koju tužilac mora dokazati.",
    reasoning:
      "Tuženi je ukazao da nerealizovani iznos ne može biti šteta u celosti bez odbitka PDV-a i troškova repro materijala i štampe koje bi tužilac imao pri izvršenju. Prvostepeni sud nije dao razloge za dosudu u tom obimu, što predstavlja pogrešnu primenu materijalnog prava u delu štete i izmakle koristi.",
    keywords: ["javna nabavka", "izmakla korist", "PDV", "teret dokazivanja"],
    related_articles: ["čl. 121–126 ZOO", "čl. 155 ZOO", "čl. 194 ZOO", "čl. 374 st. 2 tačka 12 ZPP"],
    headnote: "Ukidanje dosude štete u visini celog ugovora bez dokaza o neto koristi i strukturi troškova.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4245/2020",
    legal_area: "civil",
    legal_question:
      "Da li naručilac može dobiti naknadu štete zbog radova suprotnih projektu ako nije omogućio izvođaču otklanjanje nedostataka u roku?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe naručioca za štetu jer je sprečio otklanjanje nedostataka, a preinačio je odluku o protivtužbi i obavezao naručioca na isplatu duga izvođaču umanjenog za troškove popravke.",
    reasoning:
      "Tek ako izvođač ne otkloni nedostatke u roku, naručilac može sam popraviti, sniziti cenu ili raskinuti ugovor. Tužilja nije dokazala štetu u smislu čl. 262–269 ZOO niti uzročnu vezu. Za predvidljivu štetu važi čl. 266 ZOO; za punu štetu posebni slučajevi prevare, namere ili krajnje nepažnje.",
    keywords: ["građenje", "nedostaci", "protivtužba", "čl. 262 ZOO"],
    related_articles: ["čl. 262–269 ZOO", "čl. 266 ZOO"],
    headnote: "Naručilac koji onemogući otklanjanje nedostataka ne ostvaruje naknadu štete; dug izvođaču delimično priznat.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 5797/2016",
    legal_area: "commercial",
    legal_question:
      "Da li je raskid ugovora o dislokaciji opasne materije osnovan kada rok za ispunjenje jeste bitan sastojak ugovora?",
    court_position:
      "Privredni apelacioni sud je ukinuo prvostepenu presudu, utvrdio raskid zbog neispunjenja u bitnom roku i obavezao tuženog na povraćaj novčane naknade i protivvrednosti materije.",
    reasoning:
      "Prvostepeni sud je pogrešno ocenio da rok nije bitan sastojak i da je obaveza delimično ispunjena. Tužioci nisu bili dužni da jednostrano raskidaju bez obaveštenja i roka po čl. 126 i 130 ZOO kada su ispunjeni uslovi za raskid zbog neispunjenja u bitnom roku.",
    keywords: ["raskid", "bitan rok", "čl. 125 ZOO", "vraćanje davanja"],
    related_articles: ["čl. 125 ZOO", "čl. 126 ZOO", "čl. 130 ZOO", "čl. 132 ZOO"],
    headnote: "Bitan rok za ispunjenje: raskid i povraćaj primljenog kada dužnik ne izvrši u roku.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2912/2024",
    legal_area: "commercial",
    legal_question:
      "Da li postoji pravni interes za poništaj upravne odluke o raskidu ugovora o javno-privatnom partnerstvu i kako sud treba oceniti naknadu štete od raskida?",
    court_position:
      "Privredni apelacioni sud je ukinuo prvostepenu presudu zbog bitne povrede postupka (nejasni razlozi po čl. 374 st. 2 tačka 12 ZPP); deo za poništaj odluke odbačen zbog nedostatka pravnog interesa, a naknada štete vraćena na ponovno suđenje.",
    reasoning:
      "Prvostepeni sud nije razmotrio navode tuženog o neispunjenju obaveze prevoza u ugovorenom obimu (linije 6 i 6A) i kašnjenju plaćanja koja su bila osnov jednostranog raskida po čl. 55 ugovora. Potrebno je potpuno činjenično stanje o okolnostima raskida JPP.",
    keywords: ["JPP", "raskid", "bitna povreda", "čl. 374 ZPP"],
    related_articles: ["čl. 374 st. 2 tačka 12 ZPP", "Zakon o javno-privatnom partnerstvu"],
    headnote: "JPP: ukidanje zbog nejasnih razloga; poništaj uprave odbačen; šteta na ponovnom suđenju.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 262/2020",
    legal_area: "commercial",
    legal_question:
      "Da li raskid ugovora o prodaji društvenog kapitala po sili zakona gasi pravo poverioca na naplatu ugovorene kazne?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude i zauzeo stav da raskid glavnog ugovora ne gasi pravo na ugovornu kaznu kada bi inače kazna postala neostvariva zbog veze sa rokom i raskidom po sili zakona.",
    reasoning:
      "Za raskid po čl. 126 st. 3 ZOO i po čl. 41a Zakona o privatizaciji nastupaju posledice slične raskidu kad je rok bitan sastojak. Ako bi raskid ugasio kaznu kao akcesorno pravo, poverilac ne bi mogao nikada ostvariti kaznu predviđenu za fiksni rok, što je nedopustivo. Zbog toga čl. 132 st. 1 ZOO ne isključuje naplatu kazne u svim slučajevima posle raskida.",
    keywords: ["ugovorna kazna", "raskid po sili zakona", "privatizacija", "čl. 126 ZOO"],
    related_articles: ["čl. 126 st. 3 ZOO", "čl. 132 st. 1 ZOO", "čl. 273 st. 1 ZOO", "čl. 41a Zakona o privatizaciji"],
    headnote: "Suprotstavljena linija VKS: raskid ne mora uvek ugasiti pravo na ugovornu kaznu kod raskida po sili zakona.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 52/2017",
    legal_area: "commercial",
    legal_question:
      "Da li poverilac zadržava pravo na ugovornu kaznu kao pretpostavljenu štetu i posle raskida glavnog ugovora o privatizaciji?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju, ukinuo nižestepene presude i vratio predmet na ponovno suđenje, prihvativši da kazna može ostati potraživa i posle raskida u opisanim konstelacijama fiksnog roka i raskida po sili zakona.",
    reasoning:
      "Argumentacija u vezi sa čl. 126 st. 3 ZOO i čl. 41a Zakona o privatizaciji isključuje tumačenje po kome bi čl. 273 st. 1 ZOO dao izbor između ispunjenja i kazne u situaciji kada bi kazna zauvek propala posle raskida. Pravno nedopustivo je da kazna predviđena za neispunjenje u fiksnom roku nikada ne bi mogla biti naplaćena.",
    keywords: ["ugovorna kazna", "pretpostavljena šteta", "privatizacija", "Revizija usvojena"],
    related_articles: ["čl. 126 st. 3 ZOO", "čl. 132 ZOO", "čl. 273 ZOO", "čl. 41a Zakona o privatizaciji"],
    headnote: "VKS (usvojena revizija): pravo na ugovornu kaznu može postojati i posle raskida kada bi inače kazna bila praktično nedostižna.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 390/2017",
    legal_area: "commercial",
    legal_question:
      "Da li raskid ugovora o privatizaciji zbog neispunjenja gasi pravo na isplatu ugovorene kazne?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju i preinačio drugostepenu presudu utvrdivši da poverilac ima pravo na ugovornu kaznu i posle raskida, jer kazna ima funkciju unapred određene naknade štete.",
    reasoning:
      "Isti pravni konstrukt kao u srodnim predmetima (čl. 126 st. 3 ZOO, čl. 41a Zakona o privatizaciji): isključivanje naplate kazne posle raskida dovelo bi do apsurda kod ugovora sa fiksnim rokom i kaznenom klauzulom. Raskid zbog neispunjenja ne znači automatski gubitak kaznenog potraživanja u ovoj liniji odlučivanja.",
    keywords: ["ugovorna kazna", "privatizacija", "preinačenje", "čl. 126 ZOO"],
    related_articles: ["čl. 126 st. 3 ZOO", "čl. 132 ZOO", "čl. 273 ZOO"],
    headnote: "VKS preinačava u korist poverioca: ugovorna kazna može se tražiti i posle raskida privatizacionog ugovora.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 22208/2024",
    legal_area: "civil",
    legal_question:
      "Da li investitor ostvaruje naknadu štete zbog raskida predugovora o zajedničkoj izgradnji kada je predugovor raskinut zbog neispunjenja obaveza investitora?",
    court_position:
      "Vrhovni sud je odbio reviziju investitora i potvrdio odbijanje zahteva za naknadu štete i stečeno bez osnova, jer je raskid posledica krivice tužioca.",
    reasoning:
      "Predugovor po čl. 45 ZOO obavezuje na zaključenje glavnog ugovora; neispunjenje otvara raskid po čl. 124–125 ZOO. Utvrđeno je da je predugovor raskinut na zahtev tužioca zbog njegovog neispunjenja obaveze da snosi troškove dokumentacije, pa nema osnova za naknadu po čl. 154–158 ZOO.",
    keywords: ["predugovor", "zajednička izgradnja", "krivica", "raskid"],
    related_articles: ["čl. 45 ZOO", "čl. 124 ZOO", "čl. 125 ZOO", "čl. 154 ZOO", "čl. 158 ZOO"],
    headnote: "Nema naknade investitoru kada je predugovor raskinut zbog njegovog neispunjenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 299/2017",
    legal_area: "commercial",
    legal_question:
      "Da li raskid ugovora zbog neispunjenja isključuje pravo poverioca na isplatu ugovorene kazne?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude i zauzeo stav da raskid zbog neispunjenja ne gasi pravo na ugovornu kaznu kao unapred određenu naknadu štete.",
    reasoning:
      "Paralelna argumentacija sa čl. 126 st. 3 ZOO i čl. 41a Zakona o privatizaciji: izbor iz čl. 273 st. 1 ZOO ne sme praktično ukinuti kaznu u slučajevima raskida po sili zakona zbog neispunjenja u fiksnom roku. Raskid po čl. 132 st. 1 ZOO zadržava prostor za naknadu štete i kroz kaznenu klauzulu u određenim situacijama.",
    keywords: ["ugovorna kazna", "raskid", "privatizacija", "čl. 273 ZOO"],
    related_articles: ["čl. 126 st. 3 ZOO", "čl. 132 ZOO", "čl. 273 ZOO"],
    headnote: "VKS: ukidanje nižih sudova radi primene stava da kazna može ostati potraživa posle raskida.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 192/2023",
    legal_area: "civil",
    legal_question:
      "Da li tužilac može tražiti raskid ugovora o zajedničkoj gradnji kada ni jedna strana nije u potpunosti ispunila svoje obaveze?",
    court_position:
      "Apelacioni sud je ukinuo prvostepene presude i odbio tužbene zahteve za raskid, jer obostrano neispunjenje isključuje pravo nesavesne strane na raskid zbog neispunjenja.",
    reasoning:
      "Raskid zbog neispunjenja po čl. 124–132 ZOO dopušten je samo kada neispunjenje jedne strane onemogućava ostvarenje svrhe ugovora i kada je skrivljeno. Delimično neispunjenje obe strane ne daje pravo jednoj strani da zahteva raskid kao da je isključivo druga u krivici.",
    keywords: ["zajednička gradnja", "raskid", "obostrano neispunjenje", "čl. 124 ZOO"],
    related_articles: ["čl. 124–132 ZOO"],
    headnote: "Raskid odbijen kada nijedna strana nije u celosti ispunila obaveze.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Uzp 50/2023",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonit jednostrani raskid ugovora o korišćenju ribarskog područja zbog nedostatka licenciranih ribočuvara, zloupotrebe sredstava od naknade štete i neizmirenih javnih dažbina?",
    court_position:
      "Vrhovni sud je odbio zahtev za preispitivanje presude Upravnog suda i potvrdio zakonitost odluke Ministarstva o oduzimanju prava korišćenja, utvrdivši da su ispunjeni zakonski i ugovorni razlozi za raskid.",
    reasoning:
      "Utvrđeno je da ribočuvari nemaju licence (čl. 8 st. 3 tačka 2 Zakona o ribljem fondu i ugovor), da sredstva od naknade štete nisu korišćena za sanaciju fonda (tačka 5), da nisu plaćeni porezi i doprinosi (tačka 9) i da nije podnet izveštaj o utrošku sredstava (tačka 10), što sve predstavlja osnov za raskid.",
    keywords: ["ribarsko područje", "raskid ugovora", "upravni spor", "licenca"],
    related_articles: [
      "čl. 8 st. 3 Zakona o zaštiti i održivom korišćenju ribljeg fonda",
      "Zakon o upravnim sporovima",
    ],
    headnote: "Vrhovni sud potvrđuje zakonitost raskida koncesije/korišćenja ribarskog područja zbog više propusta korisnika.",
    outcome: "defendant_won",
  },
  // ── BATCH 2 (2/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 63/2017",
    legal_area: "civil",
    legal_question:
      "Da li poverilac ostvaruje ugovornu kaznu zbog docnje u izvođenju radova i posle raskida ugovora, sve do vraćanja gradilišta?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio pravo tužioca na ugovornu kaznu i za period posle raskida do vraćanja poseda.",
    reasoning:
      "Po čl. 275 ZOO i čl. 132 st. 1 ZOO ugovorena kazna predstavlja pretpostavljenu štetu koja se može tražiti i posle raskida ugovora kojim je kazna uvedena. Tuženi su pali u docnju od 01.10.2012; raskid izjavom od 10.05.2013 ne isključuje kaznu za period dok posed nije vraćen.",
    keywords: ["ugovorna kazna", "docnja", "raskid", "posed", "čl. 275 ZOO"],
    related_articles: ["čl. 275 ZOO", "čl. 132 st. 1 ZOO"],
    headnote: "Ugovorna kazna za docnju može se tražiti i posle raskida do predaje gradilišta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6410/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li parnični postupak koji traje 17 godina povređuje pravo na suđenje u razumnom roku u sporu iz ugovora o školovanju?",
    court_position:
      "Ustavni Sud je usvojio žalbu u delu razumnog roka i dosudio naknadu nematerijalne štete, a odbio navode o proizvoljnoj primeni materijalnog prava i pravičnom suđenju.",
    reasoning:
      "Dugotrajnost postupka predstavlja povredu čl. 32 Ustava. Za prigovor zastarelosti ocena parničnog suda da tužba podneta dve godine posle raskida nije zastarela prihvaćena je kao ustavnopravno prihvatljiva. Sporazumni raskid ugovora o školovanju i neispunjenje alternativne obaveze podnosioca utiču na ocenu tužbenog zahteva, ali ne uklanjaju povredu razumnog roka.",
    keywords: ["razuman rok", "Ustavni sud", "nematerijalna šteta", "ugovor o školovanju"],
    related_articles: ["čl. 32 Ustava RS", "čl. 89 Zakona o Ustavnom sudu"],
    headnote: "17 godina trajanja parnice: povreda razumnog roka i naknada; ostali ustavni navodi odbijeni.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "R1 157/2020",
    legal_area: "procedural",
    legal_question:
      "Da li je stvarno nadležan privredni sud ili osnovni sud u sporu tužioca (preduzetnik / taksi) protiv osiguravača radi naknade štete od upotrebe vozila osiguranika?",
    court_position:
      "Vrhovni kasacioni sud je utvrdio stvarnu nadležnost osnovnog suda, jer predmet nije spor iz obavljanja privredne delatnosti između privrednih subjekata već naknada štete prema osiguravaču trećeg lica.",
    reasoning:
      "Po čl. 22 st. 2 ZPP osnovni sud sudi u građanskim sporovima ako nije nadležan drugi sud. Osnova tužbe je odgovornost osiguranika za štetu osiguranika; osiguravač nije osiguravač tužioca, pa nije spor iz privrednog prava u smislu delatnosti stranaka.",
    keywords: ["stvarna nadležnost", "osnovni sud", "osiguranje", "čl. 22 ZPP"],
    related_articles: ["čl. 22 st. 2 ZPP"],
    headnote: "Naknada štete od autoodgovornosti: nadležan osnovni sud, ne privredni.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3271/2021",
    legal_area: "civil",
    legal_question:
      "Da li prodavac može raskinuti ugovor o kupoprodaji nepokretnosti kada kupac ne plati pretežan deo cene i iz okolnosti proizilazi da neće ispuniti ni u naknadnom roku?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju kupca i potvrdio raskid ugovora, jer su ispunjeni uslovi iz čl. 124, 127 i 132 ZOO.",
    reasoning:
      "Kupac nije platio pretežni deo od 210.000 evra (170.000 evra neplaćeno) niti je ispunio alternativu razmene stanova; iz držanja proizilazi da neće ispuniti ni u naknadnom roku, pa naknadni rok nije morao biti ostavljen po čl. 127 ZOO. Primena čl. 454 st. 1 ZOO na obaveze prodavca i kupca.",
    keywords: ["kupoprodaja nepokretnosti", "raskid", "neisplata cene", "čl. 127 ZOO"],
    related_articles: ["čl. 124 ZOO", "čl. 127 ZOO", "čl. 132 ZOO", "čl. 454 st. 1 ZOO"],
    headnote: "Raskid kupoprodaje potvrđen zbog neplate pretežnog dela cene i očiglednog neispunjenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1300/2018",
    legal_area: "civil",
    legal_question:
      "Da li investitori mogu raskinuti ugovor o zajedničkoj izgradnji kada suinvestitor ne preda stanove ni u roku ni u naknadnom roku i ne plati obavezu iz aneksa?",
    court_position:
      "Vrhovni kasacioni sud je potvrdio raskid ugovora o zajedničkoj izgradnji jer suinvestitor nije izvršio ključne obaveze u isključivoj krivici.",
    reasoning:
      "Tužioci su ispunili svoje obaveze; tuženi nije završio objekat, predao stanove niti isplatio cenu uređenja zemljišta iz aneksa. Primena čl. 124, 126, 127 i 133 ZOO nezavisno od predmeta ugovora. Nisu ispunjeni uslovi za čl. 131 ZOO koje je tuženi pokušao da ospori.",
    keywords: ["zajednička izgradnja", "raskid", "suinvestitor", "čl. 124 ZOO"],
    related_articles: ["čl. 124 ZOO", "čl. 126 ZOO", "čl. 127 ZOO", "čl. 131 ZOO", "čl. 133 ZOO"],
    headnote: "Raskid ugovora o zajedničkoj izgradnji potvrđen zbog teškog neispunjenja od strane suinvestitora.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5534/2020",
    legal_area: "civil",
    legal_question:
      "Da li jednostrani raskid dugoročnog ugovora o proizvodnoj kooperaciji može biti opravdan pokretanjem parnice za naknadu štete od ranije povrede ugovora?",
    court_position:
      "Vrhovni kasacioni sud je prihvatio reviziju tužioca, ukinuo nižestepene presude i vratio predmet na ponovno suđenje zbog pogrešne primene materijalnog prava o raskidu.",
    reasoning:
      "Kod dugoročnih kooperativnih ugovora strane su istovremeno poverioci i dužnici; krivica je relevantna i treba uzeti u obzir više faktora izvršenja. Potrebno je primeniti ne samo čl. 124 ZOO već i čl. 126–129 ZOO, ostavljanje naknadnog roka po čl. 126 st. 2 i mogućnost raskida bez roka po čl. 127 ako iz držanja proizilazi neispunjenje.",
    keywords: ["kooperacija", "raskid", "dugoročni ugovor", "čl. 126 ZOO"],
    related_articles: ["čl. 124 ZOO", "čl. 126 ZOO", "čl. 127 ZOO", "čl. 129 ZOO"],
    headnote: "Raskid kooperacije posle tužbe za štetu: ukidanje zbog pojednostavljene primene čl. 124 ZOO.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3141/2019",
    legal_area: "commercial",
    legal_question:
      "Da li tužilac ostvaruje ugovornu kaznu kada je do raskida ugovora došlo krivicom obe ugovorne strane?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio da nema prava na ugovornu kaznu zbog obostrane krivice za neispunjenje.",
    reasoning:
      "Ugovorna kazna iz čl. 12 ugovora iz 2003. vezana je za neispunjenje u roku prodavca; u konkretnom slučaju ključno je pitanje krivice za raskid i neispunjenje. Nižestepeni sudovi su pravilno utvrdili obostranu krivicu, pa kazna nije dospela.",
    keywords: ["ugovorna kazna", "obostrana krivica", "raskid"],
    related_articles: ["čl. 124 ZOO", "čl. 270–273 ZOO"],
    headnote: "Nema ugovorne kazne kada je raskid i neispunjenje posledica krivice obe strane.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5378/2025",
    legal_area: "civil",
    legal_question:
      "Da li država odgovara za štetu od raskida ugovora o zakupu poljoprivrednog zemljišta kada je raskid posledica propusta trećeg lica u upisu svojine?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilaca i potvrdio da tužena država nije odgovorna, jer raskid nije skrivljen od strane ugovornih strana već je usledio iz stečaja i promene vlasnika.",
    reasoning:
      "Primenjene su odredbe o prestanku obaveza pri nemogućnosti (čl. 137 st. 1 ZOO), raskidu uzastopnih obaveza (čl. 129 st. 1), posledicama raskida (čl. 132 st. 1) i deliktualnoj odgovornosti (čl. 154, 158, 172 ZOO). Raskid je posledica propusta stečajnog dužnika da izvrši popis i razgraničenje do 31.12.1997, zbog čega je upisana javna svojina RS, a tužioci su predali posed kupcu u stečaju.",
    keywords: ["zakup zemljišta", "raskid", "stečaj", "država", "čl. 137 ZOO"],
    related_articles: ["čl. 137 st. 1 ZOO", "čl. 129 st. 1 ZOO", "čl. 132 st. 1 ZOO", "čl. 154 ZOO"],
    headnote: "Nema odgovornosti države za štetu od raskida zakupa kada je uzrok u stečajnom i katastarskom lancu trećih lica.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 724/2020",
    legal_area: "civil",
    legal_question:
      "Da li kupac može raskinuti ugovor o kupoprodaji nepokretnosti zbog nepredaje poseda kada je ugovorom predviđeno stupanje u posed danom overe i kupac je uknjižen kao vlasnik?",
    court_position:
      "Vrhovni kasacioni sud je preinačio drugostepenu presudu i prihvatio pravo kupca na raskid zbog nepredaje stvari oslobođene od lica i stvari posle naknadnog roka.",
    reasoning:
      "Ako prodavac ne preda nepokretnost oslobođenu od držalaca ni u naknadnom roku od 30 dana, kupac može tražiti raskid po čl. 126 ZOO, a najkasnije podnošenjem tužbe nastupaju posledice iz čl. 125 st. 3 ZOO. Činjenica uknjiženja ne isključuje interes za raskid kada posed fizički nije predat u skladu sa čl. 454 st. 1 ZOO i ugovorom o trenutku predaje.",
    keywords: ["kupoprodaja", "posed", "raskid", "čl. 125 ZOO", "čl. 126 ZOO"],
    related_articles: ["čl. 454 st. 1 ZOO", "čl. 125 st. 3 ZOO", "čl. 126 ZOO"],
    headnote: "Kupac može raskinuti kupoprodaju kada prodavac ne oslobodi predmet posle naknadnog roka, bez obzira na uknjiženje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 114/2015",
    legal_area: "commercial",
    legal_question:
      "Da li se može tražiti ugovorna kazna za sam čin raskida ugovora o ekskluzivnoj prodaji kada su stranke prestale ispunjavati obaveze?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da je ugovor prestao prećutnom saglasnošću prestankom ispunjenja, a zahtev za kaznu zbog samog raskida odbijen kao neosnovan.",
    reasoning:
      "Po čl. 270 st. 1 ZOO kazna se ugovara za neblagovremeno ispunjenje ili neispunjenje obaveze, ne za samostalno pravo na raskid. Stranke su ugovorile kaznu za neispunjenje obaveze; opredeljenje za kaznu isključuje zahtev za ispunjenje, ali ovde nema osnova za kaznu vezanu za raskid bez povrede obaveze u smislu klauzule.",
    keywords: ["ugovorna kazna", "ekskluzivna prodaja", "prećutni raskid", "čl. 270 ZOO"],
    related_articles: ["čl. 270 st. 1 ZOO", "čl. 273 ZOO"],
    headnote: "Kazna za neispunjenje ne pokriva sam čin prestanka ugovora kada je prestatak usled prećutnog saglasja stranaka.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3505/2024",
    legal_area: "civil",
    legal_question:
      "Da li je ugovor o doživotnom izdržavanju ništav zbog manjkavosti forme i da li postoji osnov za raskid zbog neizvršenja obaveza davaoca?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost i raskid, jer je ugovor zaključen u propisanoj sudskoj formi i davalac izdržavanja nije kriv za neizvršenje.",
    reasoning:
      "Potpis sudije i pečat suda ispunjavaju uslove čl. 195 Zakon o nasleđivanju. Pravni prethodnik tužene bio je objektivno sprečen da kontaktira primaoca zbog ponašanja tužilaca, pa se na raskid zbog neispunjenja ne može pozvati strana koja je krivica za prekid izvršenja.",
    keywords: ["doživotno izdržavanje", "forma", "raskid", "krivica"],
    related_articles: ["čl. 195 Zakon o nasleđivanju", "čl. 124 ZOO"],
    headnote: "Sudski overen ugovor o izdržavanju važi; raskid zbog neispunjenja odbijen zbog krivice tužilaca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3044/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li je pravično suđenje povređeno kada sud zadrži kaparu zbog krivice kupca za neizvršenje, iako je pravnosnažno utvrđeno da glavni kupoprodajni ugovor ne postoji?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje jer je odluka o kapari bila proizvoljna u odnosu na ranije pravnosnažno utvrđenje da ugovor ne postoji.",
    reasoning:
      "Sporazum o kapari je akcesoran glavnom ugovoru. Ako glavni ugovor ne postoji, logički se ne može istovremeno zaključiti da je kupac kriv za neizvršenje tog istog ugovora i da prodavac zadržava kaparu. Takva primena prava nije razumna u svetlu čl. 32 st. 1 Ustava i standarda pravičnosti.",
    keywords: ["kapara", "pravično suđenje", "kupoprodaja", "Ustavni sud"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 481 ZOO"],
    headnote: "Zadržavanje kapare nakon utvrđenja da kupoprodajni ugovor ne postoji: povreda prava na pravično suđenje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 437/2020",
    legal_area: "commercial",
    legal_question:
      "Da li manjinski akcionari mogu od Agencije za privatizaciju tražiti naknadu štete zbog neispunjenja obaveza kupca iz privatizacionog ugovora?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju akcionara i potvrdio da Agencija nije odgovorna po čl. 154 i 172 ZOO za štetu od ponašanja kupca kapitala.",
    reasoning:
      "Neosnovane radnje kupca mogu biti razlog za raskid ugovora, ali ne i za deliktualnu odgovornost Agencije koja postupa u okviru zakonskih ovlašćenja. Objava ponude za otkup akcija po određenoj ceni ima dejstvo prema Agenciji kao ugovornoj strani, ne neposredno prema akcionarima u smislu osporene odgovornosti.",
    keywords: ["privatizacija", "Agencija", "manjinski akcionari", "naknada štete"],
    related_articles: ["čl. 154 ZOO", "čl. 172 ZOO", "Zakon o privatizaciji"],
    headnote: "Agencija za privatizaciju ne odgovara akcionarima za štetu od ponašanja kupca iz ugovora o prodaji akcija.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1320/2024",
    legal_area: "labor",
    legal_question:
      "Da li su upozorenje i rešenje o otkazu zakoniti ako ne sadrže precizan opis kada, gde i na koji način su učinjene povrede radne obaveze?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju poslodavca i potvrdio nezakonitost otkaza, jer akti ne omogućavaju zaposlenom smišljenu odbranu.",
    reasoning:
      "Po čl. 179 Zakona o radu i principu ročišta upozorenje i otkaz moraju sadržati dovoljno određene činjenice (vreme, mesto, način). Uopšteni opis bez identifikacije konkretnih radnji uskraćuje pravo na odbranu i čini postupak pred otkazom nezakonitim, uz primenu čl. 191 Zakona o radu o posledicama nezakonitog prestanka.",
    keywords: ["otkaz", "upozorenje", "radna obaveza", "Zakon o radu"],
    related_articles: ["čl. 179 Zakon o radu", "čl. 191 Zakon o radu"],
    headnote: "Otkaz ništav ako upozorenje i rešenje ne preciziraju činjenice povrede radne obaveze.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4088/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li postupak duži od deset godina povređuje razuman rok i da li je paušalni zaključak da neispunjenje Socijalnog programa iz privatizacije može služiti samo kao razlog za raskid ugovora ustavnopravno prihvatljiv?",
    court_position:
      "Ustavni Sud je usvojio žalbu u delu razumnog roka i dosudio 1.000 evra nematerijalne štete, a poništio deo pravne ocene koja neopravdano sužava pravnu zaštitu zaposlenima u vezi sa Socijalnim programom.",
    reasoning:
      "Socijalni program je sastavni deo ugovora o privatizaciji po čl. 41 st. 1 Zakona o privatizaciji, pa neispunjenje obaveza iz čl. 9 programa daje pravo na sudsku zaštitu zaposlenom. Zaključak da je neispunjenje moglo služiti isključivo kao razlog za raskid kupoprodajnog ugovora, bez ikakvog pravnog argumenta u tekstu ugovora, ocenjen je kao paušalan i suprotan pravu na sudsku zaštitu. Dugotrajnost postupka povređuje čl. 32 Ustava.",
    keywords: ["razuman rok", "Socijalni program", "privatizacija", "NIS", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 41 Zakona o privatizaciji", "čl. 22 Ustava RS"],
    headnote: "Už 4088: razuman rok i kritika paušalnog stava o Socijalnom programu kao isključivo raskidnom osnovu.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4311/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li podnosilac ima pravo na povraćaj rata kupoprodajne cene posle raskida ugovora o privatizaciji zbog neispunjene investicione obaveze?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu, prihvativši da su sudovi mogli odbiti povraćaj s obzirom na ugovornu klauzulu i na to da podnosilac nije osporio raskid već je tužbom tražio vraćanje datog.",
    reasoning:
      "Podnosilac je mogao osporiti raskid, ali je tužbom tražio vraćanje datog po čl. 132 st. 2 ZOO, što implicira prihvatanje raskida. Utvrđeno je da investiciona obaveza nije izvršena u roku (lokomotive nisu bile u funkciji, kasnija oprema u vezi sa stečajem), pa raskid i uskraćivanje povraćaja imaju materijalnopravno uporište.",
    keywords: ["privatizacija", "povraćaj cene", "investiciona obaveza", "Ustavni sud"],
    related_articles: ["čl. 132 st. 2 ZOO", "Zakon o privatizaciji"],
    headnote: "Ustavna žalba odbijena: nema povraćaja uplata kada je raskid osnovan na neispunjenju investicije.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 356/2024",
    legal_area: "civil",
    legal_question:
      "Da li je valutna klauzula u švajcarskim francima (CHF) ništava i da li skok kursa opravdava raskid kredita zbog promenjenih okolnosti po čl. 133 ZOO?",
    court_position:
      "Apelacioni sud je potvrdio ništavost CHF klauzule za dva tužioca, a za druga dva ukinuo presudu u delu raskida zbog promenjenih okolnosti i vratio predmet radi boljeg utvrđenja kursa i predvidivosti.",
    reasoning:
      "Po čl. 133 st. 2 ZOO raskid zbog promenjenih okolnosti nije dopušten ako je strana morala ili mogla predvideti okolnosti. Potrebno je utvrditi intenzitet promene kursa u odnosu na prosečan rast valuta i ekonomsku predvidivost u trenutku zaključenja kredita.",
    keywords: ["CHF kredit", "valutna klauzula", "promenjene okolnosti", "čl. 133 ZOO"],
    related_articles: ["čl. 133 ZOO", "čl. 26 ZOO"],
    headnote: "CHF: delimična ništavost klauzule i remand za raskid zbog promenjenih okolnosti kod preostalih tužilaca.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7125/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li Socijalni program iz ugovora o privatizaciji NIS-a ima pravnu snagu kolektivnog ugovora i direktan osnov za spor o razlici zarade?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu poslodavca, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Dejstvo Socijalnog programa ograničeno je na ublažavanje posledica promene vlasništva za zaposlene kod subjekta privatizacije u trenutku prodaje; ne zamenjuje opšti akt niti kolektivni ugovor koji je paralelno postojao. Neispunjenje čl. 9 programa u delu usklađivanja zarada sa troškovima života, prema tački 8.1.1 ugovora, ne predstavlja čak ni razlog za raskid ugovora o privatizaciji u meri u kojoj je tužba zasnovana, pa ni osnov za dosudu razlike u zaradi kao iz kolektivnog ugovora.",
    keywords: ["Socijalni program", "privatizacija", "kolektivni ugovor", "pravično suđenje"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS", "čl. 41 Zakona o privatizaciji"],
    headnote: "Už 7125/2021: Socijalni program nije kolektivni ugovor; poništaj VKS zbog proizvoljne primene prava.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7126/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li zaposleni mogu neposredno iz Socijalnog programa iz privatizacije tražiti isplatu razlike u zaradi u radnom sporu?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje, ponavljajući stav o ograničenom dejstvu Socijalnog programa.",
    reasoning:
      "Isti pravni okvir kao u srodnim odlukama (linija Už-4088/2018 od 18.03.2021): Socijalni program nije supstitut opšteg akta; neispunjenje obaveza iz programa može biti vekovito vezano za raskid ugovora o privatizaciji po tački 8.1.1, ali ne i za direktan radnopravni zahtev zaposlenog kao da je reč o kolektivnom ugovoru.",
    keywords: ["Socijalni program", "NIS", "Ustavni sud", "zarada"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 7126/2021: ponovljen stav da Socijalni program ne crpi radna prava kao kolektivni ugovor.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3993/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje i na žalbu kada prekršajni sud ne dostavi presudu podnositeljki na propisan način?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje i pravno sredstvo zbog propusta dostavljanja presude.",
    reasoning:
      "Neredovno dostavljanje presude onemogućava blagovremenu žalbu i može dovesti do konverzije novčane kazne u kaznu zatvora bez stvarnog ostvarenja prava na reviziju presude. Takav postupak nije u skladu sa jamstvima iz čl. 32 Ustava o nezavisnom i pravičnom suđenju.",
    keywords: ["prekršaj", "dostava presude", "žalba", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "Zakonik o krivičnom postupku / prekršajni postupak"],
    headnote: "Nedostavljanje prekršajne presude: povreda prava na žalbu i pravično suđenje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7050/2019",
    legal_area: "constitutional",
    legal_question:
      "Da li je pravo na pravično suđenje povređeno kada Vrhovni kasacioni sud Socijalni program iz privatizacije tretira kao kolektivni ugovor i dosudi razliku u zaradi?",
    court_position:
      "Ustavni Sud je usvojio žalbu zaposlenog, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu čl. 32 Ustava.",
    reasoning:
      "Sledi ustaljena linija Ustavnog suda (up. Už-4088/2018): Socijalni program nema karakter kolektivnog ugovora; njegovo dejstvo je vezano za posledice promene vlasništva na zaposlene u trenutku privatizacije. Postojanje posebnog kolektivnog ugovora isključuje tumačenje Socijalnog programa kao opšteg akta za zarade.",
    keywords: ["Socijalni program", "pravično suđenje", "zarada", "privatizacija"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 7050/2019: poništaj VKS zbog pogrešnog izjednačavanja Socijalnog programa sa kolektivnim ugovorom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3962/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li Socijalni program može biti neposredan izvor potraživanja razlike u zaradi u sporu protiv poslodavca?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Program je deo ugovora o privatizaciji sa ograničenim dejstvom na kategoriju zaposlenih u momentu prodaje; ne može zameniti opšti akt niti predstavljati kolektivni ugovor. Neispunjenje dela čl. 9 u delu prilagođavanja zarada rastu troškova života, prema ugovornom okviru 8.1.1, ne daje automatski osnov za radnopravnu dosudu kao iz člana 9 kao „kolektivnog“ izvora.",
    keywords: ["Socijalni program", "Ustavni sud", "VKS", "privatizacija"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 3962/2020: ustavna zaštita od proizvoljne kvalifikacije Socijalnog programa kao kolektivnog ugovora.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2478/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li poslodavac može uspešno braniti da Socijalni program nije osnov za isplatu razlike u zaradi ako je VKS dosudio suprotno?",
    court_position:
      "Ustavni Sud je usvojio žalbu privrednog društva, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Ista pravna logika kao u seriji odluka o NIS Socijalnom programu: dokument je poslovnopolitički aneks privatizacije, ne izvor radnih prava supstitutan kolektivnom ugovoru. VKS je pogrešno nametnuo obavezu isplate razlike u zaradi zasnovanu isključivo na tom aktu.",
    keywords: ["Socijalni program", "razlika u zaradi", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 2478/2020: poslodavac uspeva u ustavnoj žalbi protiv odluke koja tretira Socijalni program kao KV.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3872/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li predstavlja proizvoljnu primenu prava kada VKS Socijalni program kvalifikuje kao opšti akt?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje zbog proizvoljnog tumačenja Socijalnog programa.",
    reasoning:
      "Program ne može biti supstitut opšteg akta kada postoji važeći kolektivni ugovor za istog poslodavca. Povezivanje neispunjenja čl. 9 isključivo sa raskidom privatizacionog ugovora, a ne sa direktnim radnopravnim potraživanjem, sledi iz tačke 8.1.1 ugovora i ranije prakse Ustavnog suda.",
    keywords: ["Socijalni program", "opšti akt", "Ustavni sud", "proizvoljnost"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 3872/2020: kvalifikacija Socijalnog programa kao opšteg akta – povreda pravičnosti postupka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 8194/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li zaposleni mogu iz Socijalnog programa iz privatizacije neposredno izvesti visinu zarade kao iz kolektivnog ugovora?",
    court_position:
      "Ustavni Sud je usvojio žalbu, poništio presudu Vrhovnog kasacionog suda i potvrdio da Socijalni program nema karakter kolektivnog ugovora.",
    reasoning:
      "Konsekventno ostalim odlukama u istoj pravnoj liniji: ograničeno dejstvo na zaposlene u trenutku promene vlasnika, zabrana supstitucije opšteg akta, naglašavanje veze neispunjenja čl. 9 sa mogućnošću raskida po 8.1.1 umesto direktnog novčanog potraživanja zaposlenog iz tog dokumenta.",
    keywords: ["Socijalni program", "kolektivni ugovor", "Ustavni sud", "NIS"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 8194/2020: još jedna potvrda da Socijalni program nije KV za potraživanje zarade.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 13200/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je stav da Socijalni program ima snagu kolektivnog ugovora ustavnopravno prihvatljiv?",
    court_position:
      "Ustavni Sud je usvojio žalbu poslodavca, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Socijalni program je akt poslovne politike u okviru privatizacije, a ne opšti akt za trajno uređenje radnih odnosa. Isti kriterijumi o akcesornosti prema kolektivnom ugovoru i o vezi sa raskidom ugovora o privatizaciji kao u ostalim predmetima linije Už-4088/2018.",
    keywords: ["Socijalni program", "akt poslovne politike", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 13200/2018: program iz privatizacije nije opšti akt ni kolektivni ugovor.",
    outcome: "plaintiff_won",
  },
  // ── BATCH 3 (3/3) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9251/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje kada Vrhovni kasacioni sud Socijalni program iz privatizacije izjednači sa kolektivnim ugovorom?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu privrednog društva, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Socijalni program je deo dokumentacije privatizacije sa dejstvom ograničenim na ublažavanje posledica promene vlasništva za zaposlene kod prodavca u trenutku prodaje; ne može zameniti kolektivni ugovor koji je paralelno postojao. Neispunjenje dela čl. 9 u segmentu prilagođavanja zarada rastu troškova života, prema tački 8.1.1 ugovora o privatizaciji, ne može biti izjednačeno sa potpunim nepoštovanjem čl. 9 kao razloga za raskid, pa ni sa direktnim radnopravnim potraživanjem iz tog dokumenta.",
    keywords: ["Socijalni program", "privatizacija", "kolektivni ugovor", "pravično suđenje"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS", "čl. 41 Zakona o privatizaciji"],
    headnote: "Už 9251/2020: poništaj VKS zbog izjednačavanja Socijalnog programa sa kolektivnim ugovorom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 14819/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li neefikasno vođenje stečajnog postupka duže od šest godina nad društvom sa većinskim društvenim kapitalom povređuje pravo na razuman rok i pravo na imovinu?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i dosudio materijalnu i nematerijalnu štetu zbog trajanja stečaja i neostvarenja imovinskih prava.",
    reasoning:
      "Država mora obezbediti efikasnu zaštitu imovinskih prava u stečaju; dugotrajnost postupka i pasivnost u odnosu na dužnika sa društvenim kapitalom mogu predstavljati povredu čl. 32 i čl. 58 Ustava. Predmet je odvojiv od serije predmeta o Socijalnom programu NIS-a i odnosi se na stečajnu efikasnost.",
    keywords: ["stečaj", "razuman rok", "imovina", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 58 Ustava RS", "čl. 89 st. 3 Zakona o Ustavnom sudu"],
    headnote: "Dug stečaj nad preduzećem sa društvenim kapitalom: povreda razumnog roka i imovine; naknada.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3735/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je pravo na pravično suđenje povređeno kada VKS Socijalni program pogrešno upodobi kolektivnom ugovoru?",
    court_position:
      "Ustavni Sud je usvojio žalbu privrednog društva „N.“ a.d., poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Proizvoljno izjednačavanje Socijalnog programa sa kolektivnim ugovorom suprotno je ranijim stavovima Ustavnog suda (linija Už-4088/2018). Program nije opšti akt za trajno uređenje zarada; postojanje kolektivnog ugovora isključuje supstituciju.",
    keywords: ["Socijalni program", "NIS", "Ustavni sud", "VKS"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 3735/2018: ponovljeni stav o ne-kolektivnoj prirodi Socijalnog programa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6148/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li arbitrerna primena materijalnog prava na Socijalni program predstavlja povredu prava na pravično suđenje?",
    court_position:
      "Ustavni Sud je usvojio žalbu i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "VKS je pogrešno tretirao Socijalni program kao opšti akt za uređenje radnih odnosa, iako je reč o aktu poslovne politike u okviru privatizacije sa ograničenim personalnim i vremenskim dejstvom. Isti pravni okvir kao u ostalim predmetima serije uz referencu na Už-4088/2018.",
    keywords: ["Socijalni program", "arbitrernost", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 6148/2020: poništaj zbog arbitrernog tumačenja Socijalnog programa kao opšteg akta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3338/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je proizvoljno kada revizijski sud Socijalni program kvalifikuje kao kolektivni ugovor i dosudi razliku u zaradi?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu privrednog društva, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Kvalifikacija Socijalnog programa kao kolektivnog ugovora vodi ka dosudi obaveza koje zakonom i ugovorom o privatizaciji nisu predviđene kao direktno izvršne u radnom sporu. Ustavni Sud ponavlja ograničeno dejstvo programa i vezu neispunjenja čl. 9 sa raskidom po tački 8.1.1.",
    keywords: ["Socijalni program", "kolektivni ugovor", "razlika u zaradi"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 3338/2018: proizvoljna kvalifikacija programa kao KV povlači poništaj presude VKS.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 17138/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li Socijalni program NIS-a može biti tretiran kao kolektivni ugovor u smislu izvora radnih obaveza?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Socijalni program je sastavni deo ugovora o privatizaciji, a ne opšti akt iz koga zaposleni neposredno crpu prava na zaradu u sporu sa poslodavcem. Neispunjenje dela odredbe čl. 9 koje se odnosi na prilagođavanje zarada godišnjem rastu troškova života nije u konkretnoj vezi sa tužbenim zahtevom kao razlogom za raskid u smislu tačke 8.1.1.",
    keywords: ["Socijalni program", "NIS", "pravično suđenje"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 17138/2021: VKS ne može program iz privatizacije tretirati kao KV.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 10553/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je stav da socijalni program ima snagu kolektivnog ugovora i da predstavlja osnov za razliku u zaradi ustavnopravno prihvatljiv?",
    court_position:
      "Ustavni Sud je usvojio žalbu privrednog društva, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Ista pravna logika kao u ostalim odlukama o NIS Socijalnom programu: ograničeno dejstvo, zabrana supstitucije opšteg akta, postojanje kolektivnog ugovora tokom celog perioda spora, referenca na Už-4088/2018 od 18.03.2021.",
    keywords: ["Socijalni program", "zarada", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 10553/2020: poništaj VKS zbog pogrešne pravne prirode Socijalnog programa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 11608/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje kada se Socijalni program iz privatizacije primenjuje kao opšti akt za potraživanje zarade?",
    court_position:
      "Ustavni Sud je usvojio žalbu i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "VKS je proizvoljno primenio pravo tretirajući Socijalni program kao izvor radnih obaveza u istoj ravni sa kolektivnim ugovorom. Program je deo transakcije privatizacije, ne normativni akt za opšte uređenje odnosa zaposlenih i poslodavca van tog konteksta.",
    keywords: ["Socijalni program", "opšti akt", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 11608/2020: program iz privatizacije ne može biti osnov radnopravnog potraživanja kao opšti akt.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3368/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je proizvoljno tumačenje Socijalnog programa kao kolektivnog ugovora od strane Vrhovnog kasacionog suda?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "Isti kriterijumi kao u seriji predmeta: ograničeno dejstvo na zaposlene u trenutku prodaje, nemogućnost supstitucije opšteg akta, kolektivni ugovor kao isključivi izvor radnopravnih obaveza u periodu, tačka 8.1.1 o raskidu pri nepoštovanju čl. 9 u delu prilagođavanja zarada.",
    keywords: ["Socijalni program", "proizvoljnost", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 3368/2018: poništaj odluke koja program pogrešno izjednačava sa KV.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9950/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je osnovana ustavna žalba protiv rešenja o produženju pritvora zbog nedostatka razloga?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu Milorada Živkovića kao neosnovanu, prihvativši da su redovni sudovi dali valjane razloge za produženje pritvora.",
    reasoning:
      "Ocena opasnosti od ponavljanja krivičnog dela i drugih procesnih okolnosti spada u slobodnu procenu suda kada su razlozi jasni i dovoljno konkretni. Ustavni Sud ne zamenjuje u meri ocenu redovnog suda ako nije proizvoljna.",
    keywords: ["pritvor", "produženje", "Ustavni sud", "krivično pravo"],
    related_articles: ["čl. 32 Ustava RS", "Zakonik o krivičnom postupku"],
    headnote: "Produženje pritvora: valjani razlozi redovnog suda; ustavna žalba odbijena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1257/2022",
    legal_area: "procedural",
    legal_question:
      "Da li bivši vlasnici zemljišta imaju pravni interes da traže raskid ugovora o zakupu zaključenog između opštine i trećeg lica?",
    court_position:
      "Vrhovni sud nije prihvatio odlučivanje o reviziji kao izuzetno dozvoljenoj i odbacio je kao nedozvoljenu.",
    reasoning:
      "Raskid ugovora zbog neispunjenja može tražiti samo ugovorna strana po čl. 124 ZOO. Zakonom o vraćanju oduzete imovine nije dato bivšim vlasnicima pravo da kao treća lica traže raskid tuđeg zakupa; revizija ne otvara pitanje opšteg značaja koje nije već razređeno praksom.",
    keywords: ["revizija", "pravni interes", "zakup", "treća lica"],
    related_articles: ["čl. 404 st. 2 ZPP", "čl. 124 ZOO", "Zakon o vraćanju oduzete imovine i obeštećenju"],
    headnote: "Bivši vlasnici nemaju interes za raskid tuđeg ugovora o zakupu; revizija nedozvoljena.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2383/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li je ponovljen stav Ustavnog suda da Socijalni program iz privatizacije nije kolektivni ugovor kada VKS dosudi suprotno?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu privrednog društva, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Referenca na identične stavove iz Už-4088/2018: program nije opšti akt, neispunjenje dela čl. 9 o prilagođavanju zarada rastu troškova života nije razlog za raskid u smislu tačke 8.1.1 u meri u kojoj je tužba zasnovana, pa ni direktan izvor radnog potraživanja.",
    keywords: ["Socijalni program", "Ustavni sud", "VKS"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 2383/2021: ponovljeni stav o Socijalnom programu; poništaj presude VKS.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2460/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li Socijalni program može biti supstitut nedostajućeg opšteg akta za potraživanje zaposlenog?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "Stav da program ima snagu kolektivnog ugovora i da je neposredan osnov potraživanja zaposlenog proizvoljan je s obzirom na to da program ne može biti supstitut nedostajućeg opšteg akta, posebno uz postojanje kolektivnog ugovora za istog poslodavca. Neispunjenje čl. 9 može poslužiti kao razlog za raskid privatizacionog ugovora, ne kao osnov za dosudu kao iz KV.",
    keywords: ["Socijalni program", "supstitut opšteg akta", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 2460/2018: program ne zamenjuje opšti akt; stav o KV je proizvoljan.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3815/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je stav Vrhovnog kasacionog suda da se Socijalni program može uporediti sa kolektivnim ugovorom ustavnopravno prihvatljiv?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu privrednog društva, poništio presude Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Takav stav je proizvoljan jer ignoriše ograničeno dejstvo Socijalnog programa i postojanje kolektivnog ugovora. Identični zaključci kao u Už-4088/2018 od 18.03.2021. o vezi neispunjenja čl. 9 sa mogućnošću raskida ugovora o privatizaciji, a ne sa direktnim radnopravnim potraživanjem.",
    keywords: ["Socijalni program", "proizvoljnost", "privatizacija"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 3815/2020: poništaj VKS zbog upoređivanja Socijalnog programa sa KV.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5262/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li arbitrerna ocena da Socijalni program ima karakter kolektivnog ugovora povređuje pravo na pravično suđenje?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje, poništivši presudu Vrhovnog kasacionog suda.",
    reasoning:
      "VKS je postupio suprotno prethodnim stavovima Ustavnog suda kada je program izjednačio sa kolektivnim ugovorom. Program ostaje deo privatizacione transakcije sa ograničenim krugom i svrhom, uz primenu tačke 8.1.1 o raskidu.",
    keywords: ["Socijalni program", "arbitrernost", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 5262/2020: arbitrerna primena prava na Socijalni program; poništaj.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 13779/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li Socijalni program predstavlja akt poslovne politike ili kolektivni ugovor za potraživanje razlike u zaradi?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu privrednog društva i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "Program je akt poslovne politike u okviru privatizacije, ne izvor radnih prava u smislu kolektivnog ugovora. Dosuda razlike u zaradi zasnovana na toj kvalifikaciji ne može se održati u ustavnopravno prihvatljivom postupku.",
    keywords: ["Socijalni program", "akt poslovne politike", "zarada"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 13779/2021: program je poslovnopolitički akt, ne KV za spor o zaradi.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4472/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je pogrešno tumačenje Socijalnog programa kao kolektivnog ugovora povreda prava na pravično suđenje?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu privrednog društva i ukinuo presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "VKS je proizvoljno uporedio Socijalni program sa kolektivnim ugovorom i time pogrešno utvrdio obavezu poslodavca na povećanje zarada. Ustavni Sud ponavlja ograničenu prirodu programa i značaj postojećeg kolektivnog ugovora.",
    keywords: ["Socijalni program", "kolektivni ugovor", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 4472/2018: ukinuta presuda VKS zbog pogrešnog tumačenja Socijalnog programa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 8834/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je izjednačavanje Socijalnog programa sa kolektivnim ugovorom u skladu sa stavovima Ustavnog suda?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu privrednog društva „N.“ i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "Takvo tumačenje je suprotno stavovima Ustavnog suda i proizvoljno. Socijalni program nije normativni izvor radnih odnosa u širem smislu; njegovo neispunjenje u delu čl. 9 ne predstavlja razlog za raskid privatizacionog ugovora u meri relevantnoj za tužbeni zahtev zaposlenog.",
    keywords: ["Socijalni program", "VKS", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 8834/2020: poništaj zbog izjednačavanja Socijalnog programa sa KV.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 8226/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je proizvoljno tumačenje Socijalnog programa kao opšteg akta suprotno stvarnoj pravnoj prirodi dokumenta?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "VKS je proizvoljno protumačio Socijalni program kao opšti akt za uređenje radnih odnosa. Program je deo privatizacione dokumentacije sa ograničenim dejstvom; kolektivni ugovor ostaje merodavan izvor za radna pitanja u periodu spora.",
    keywords: ["Socijalni program", "opšti akt", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 8226/2020: program nije opšti akt; poništaj proizvoljnu primenu prava.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4257/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li su zaposleni prekludirani da traže razliku u otpremnini jer nisu osporili rešenja o otkazu?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje i pravnu zaštitu pri prestanku radnog odnosa.",
    reasoning:
      "Sudovi su proizvoljno primenili pravo zaključivši da su podnosioci prekludirani za traženje razlike u otpremnini zbog neosporevanja otkaza, što u konkretnoj konstelaciji nije ustavnopravno prihvatljivo. Pravo na sudsku zaštitu u vezi sa otpremninom ne sme biti uskraćeno na osnovu paušalne prekluzije bez razmatranja okolnosti.",
    keywords: ["otpremnina", "prekluzija", "otkaz", "pravično suđenje"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS", "Zakon o radu"],
    headnote: "Už 4257/2018: prekluzija zbog neosporevanja otkaza ne sme proizvoljno uskratiti zaštitu otpremnine.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 8165/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li Socijalni program može biti osnov za potraživanje zarada kao opšti akt?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, poništio presudu Vrhovnog kasacionog suda i utvrdio povredu prava na pravično suđenje.",
    reasoning:
      "Ponovljeni stav da Socijalni program nije opšti akt već deo ugovora o privatizaciji sa ograničenim dejstvom na zaposlene u trenutku prodaje. Neispunjenje čl. 9 u delu prilagođavanja zarada rastu troškova života nije razlog za raskid u smislu tačke 8.1.1 koji bi nosio tužbeni zahtev zaposlenog u ovoj meri.",
    keywords: ["Socijalni program", "privatizacija", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote: "Už 8165/2018: program nije opšti akt za potraživanje zarada; poništaj VKS.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2563/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je kvalifikacija socijalnog programa kao kolektivnog ugovora u skladu sa ranijom praksom Ustavnog suda?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "VKS je proizvoljno tumačio socijalni program kao kolektivni ugovor, suprotno ranijim stavovima Ustavnog suda i pravnoj prirodi akta iz privatizacije. Isti okvir tačke 8.1.1 i čl. 9 u vezi sa mogućnošću raskida, a ne direktnim radnim potraživanjem.",
    keywords: ["Socijalni program", "kolektivni ugovor", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 2563/2018: poništaj zbog neslaganja sa ustavnosudskom linijom o programu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5502/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li je pogrešno kada se Socijalni program upodobi kolektivnom ugovoru i nameće isplata razlike u zaradi?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu privrednog društva „N.“ a.d. Novi Sad, utvrdio povredu prava na pravično suđenje i poništio presudu Vrhovnog kasacionog suda.",
    reasoning:
      "Presuda koja program tretira kao kolektivni ugovor i dosuđuje razliku u zaradi zasniva se na proizvoljnoj primeni prava. Socijalni program ostaje sastavni deo ugovora o privatizaciji sa ograničenim dejstvom; postoji paralelni kolektivni ugovor.",
    keywords: ["Socijalni program", "NIS", "Novi Sad", "zarada"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 5502/2021: poništaj VKS koji je program pogrešno uporedio sa KV.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2851/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je proizvoljna pravna kvalifikacija Socijalnog programa kao kolektivnog ugovora povreda prava na pravično suđenje?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje.",
    reasoning:
      "VKS je proizvoljno kvalifikovao Socijalni program kao opšti akt uporediv sa kolektivnim ugovorom, što je dovelo do povrede čl. 32 Ustava. Isti argumenti o ograničenom dejstvu, tački 8.1.1 i neadekvatnosti dela čl. 9 kao jedinog raskidnog razloga u odnosu na tužbeni zahtev kao u ostalim predmetima serije uz referencu na Už-4088/2018.",
    keywords: ["Socijalni program", "kvalifikacija", "pravično suđenje"],
    related_articles: ["čl. 32 Ustava RS", "čl. 22 Ustava RS"],
    headnote: "Už 2851/2018: poslednja u seriji; poništaj zbog proizvoljne kvalifikacije Socijalnog programa.",
    outcome: "plaintiff_won",
  },
]
