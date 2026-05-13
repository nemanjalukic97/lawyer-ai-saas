// scripts/case-law-family-serbia-1.ts
// Serbian family case law (bračna tekovina, deoba, vanbračna zajednica, Ustavni sud) — complete (3 batches).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_FAMILY_SERBIA_1: CaseLawInput[] = [
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Predmet (broj nije naveden u izvoru) – udeo u d.o.o.",
    legal_area: "family",
    legal_question:
      "Da li udeo u privrednom društvu sa ograničenim odgovornošću može predstavljati bračnu tekovinu radi deobe posle razvoda ako je ulaganje u društvo učinjeno iz sredstava stečenih u braku?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je odbijen zahtev za utvrđenje da udeo u d.o.o. čini bračnu tekovinu. Imovina uložena u pravno lice postaje imovina tog lica i ne može se deobiti kao bračna tekovina.",
    reasoning:
      "Bračnu tekovinu ne može činiti udeo u društvu sa ograničenom odgovornošću niti u drugom privrednom društvu, bez obzira da li je ulaganje izvršeno iz zajedničke imovine, jer imovina momentom ulaganja prestaje da bude imovina ulagača i postaje imovina pravnog lica. Pravilna je primena Zakona o privrednim društvima (član 7, 8, 13 i 104–183 u relevantnom periodu, Sl. glasnik RS 120/04). Žalba tužioca nije dovela u sumnju činjenični osnov; žalba tuženog na pravilnost je takođe neosnovana.",
    keywords: ["bračna tekovina", "d.o.o.", "ulaganje", "privredno društvo", "deoba", "ZPD"],
    related_articles: ["Zakon o privrednim društvima čl. 7, 8, 13, 104–183 (120/04)", "Porodični zakon – bračna tekovina"],
    headnote: "Potvrda: udeo u d.o.o. nije predmet bračne tekovine jer je imovina prešla na društvo ulaganjem.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 200/2014",
    legal_area: "family",
    legal_question:
      "Da li je osnovana tužba za zakonsku deobu bračne tekovine kada je bračnim ugovorom isključen režim zajedničke imovine, a tužba je podneta za vreme trajanja tog ugovora pre isteka roka za izvršenje ugovorenih obaveza i pre raspravljanja o raskidu ugovora?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje. Punovažan bračni ugovor kojim je isključen zakonski režim zajedničke imovine smatra se u celosti ispunjenim i kada je izvršenje obaveza sa zakašnjenjem, pa tužba za zakonsku deobu bračne tekovine ostaje neosnovana.",
    reasoning:
      "Stranke su pre razvoda sklopile overen bračni ugovor kojim je isključen zakonski režim zajedničke imovine (član 188. Porodičnog zakona). Tužba za deobu po zakonskom režimu podneta je za vreme trajanja bračnog ugovora, pre isteka roka za poslednju ugovorenu obavezu tuženog i pre nego što je raspravljeno pitanje pravne sudbine ugovora, zbog čega je pravilno ocenjeno da zahtev nije osnovan. Drugostepeni sud je pravilno cenio žalbene navode i dao dovoljne razloge.",
    keywords: ["bračni ugovor", "isključenje zakonskog režima", "deoba bračne tekovine", "revizija", "Porodični zakon"],
    related_articles: ["član 188. Porodičnog zakona", "član 170–180. Porodičnog zakona"],
    headnote: "Odbijena revizija: zakonska deoba neosnovana dok je na snazi ispunjen (i sa kašnjenjem) bračni ugovor koji isključuje zajedničku imovinu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1968/2021",
    legal_area: "family",
    legal_question:
      "Da li stan kupljen nakon faktičkog prestanka bračne zajednice, iako je brak formalno razveden kasnije, predstavlja bračnu tekovinu i da li su ugovori o podeli bračne tekovine i kupoprodaji ništavi?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom su ugovori o podeli bračne tekovine i kupoprodaji stana utvrđeni ništavim. Stan stečen posle poremećenih bračnih odnosa i faktičkog prestanka zajednice života predstavlja posebnu imovinu supružnika, ne bračnu tekovinu.",
    reasoning:
      "Ekonomska i bračna zajednica ne postoji ako su supružnici imovinu sticali nakon poremećenih odnosa i faktičkog prestanka bračne zajednice. Tuženi je kupoprodajom stana raspolagao pre podnošenja tužbe za razvod, a u tužbi za razvod je tvrdio da zajednica života nije postojala sedam godina, što je potvrdio i CSR; predmetni stan ne može biti zajednička imovina. Pravilno je utvrđen momenat prestanka zajednice života uprkos kasnijem formalnom razvodu.",
    keywords: ["faktički prestanak bračne zajednice", "posebna imovina", "ništavost ugovora", "bračna tekovina", "stan"],
    related_articles: ["član 171. Porodičnog zakona", "član 168. Porodičnog zakona", "član 103. ZOO"],
    headnote: "Potvrđena ništavost raspolaganja steklim nakon faktičkog kraja zajednice života, uprkos kasnijem razvodu braka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 31217/2023",
    legal_area: "family",
    legal_question:
      "Da li vanbračni partner solidarno odgovara za polovinu kredita drugog partnera podignutog tokom vanbračne zajednice nakon razvoda braka?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca. Sredstva kredita korišćena su za sticanje posebne imovine tužioca (kuća i automobil), a ne za tekuće potrebe zajedničkog života, pa ne postoji solidarna obaveza vanbračnog partnera na podelu tog duga.",
    reasoning:
      "Nakon razvoda stranke su sporazumom o deobi konstatovale da nisu stekle zajedničku nepokretnu imovinu. Vanbračna zajednica uspostavljena kasnije ne stvara automatski solidarnost za obaveze čiji je ekonomski cilj sticanje posebne imovine jednog lica. Revizijski sud nije našao bitnu povredu postupka iz člana 374. stav 2. tačka 2. ZPP.",
    keywords: ["vanbračna zajednica", "kredit", "solidarna odgovornost", "posebna imovina", "deoba"],
    related_articles: ["član 191. Porodičnog zakona", "član 374. stav 2. ZPP"],
    headnote: "Nema solidarnosti za dug čija sredstva idu na posebnu imovinu jednog partnera, a ne na zajednički život.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4416/2021",
    legal_area: "family",
    legal_question:
      "Da li su ništavi ugovori o podeli bračne tekovine i kupoprodaji stana ako je stan stečen posle faktičnog prekida zajednice života, a prethodno je poklonjen jednom supružniku?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužene i potvrdio ništavost ugovora. Stan nije bio bračna tekovina jer je stečen posle faktičnog prekida zajednice života; prethodni poklon u korist tužioca isključuje valjan rasporod tuženih tim ugovorima.",
    reasoning:
      "Revizija ne može osporavati utvrđeno činjenično stanje u smislu člana 407. stav 2. ZPP osim u predviđenim slučajevima. Ugovori o podeli i kupoprodaji zaključeni više od osam godina nakon razvoda, uprkos ranijem poklonu stana tužiocu, ukazuju na pravnu manipulaciju. Nižestepeni sudovi su pravilno primenili materijalno pravo (član 414. stav 1. ZPP).",
    keywords: ["ništavost", "bračna tekovina", "poklon", "faktički prestanak zajednice", "revizija"],
    related_articles: ["član 407. stav 2. ZPP", "član 414. stav 1. ZPP", "član 171. Porodičnog zakona"],
    headnote: "Odbijena revizija: potvrđena ništavost raspolaganja steklim van bračne zajednice i suprotno ranijem poklonu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6092/2022",
    legal_area: "family",
    legal_question:
      "Da li nepokretnosti kupljene tokom formalnog trajanja braka predstavljaju bračnu tekovinu ako je zajednica života faktički prestala godinama ranije?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za utvrđenje bračne tekovine. Prvi uslov zajedničke imovine je postojanje zajednice života koja se mora faktički ostvarivati; nakon njenog prekida prestaje sticanje zajedničke imovine.",
    reasoning:
      "Primenom člana 171. Porodičnog zakona u vezi sa činjenicama o fiktivnom razvodu radi stanarskog prava u inostranstvu, sud je ocenio da tužilja nije dokazala zajednicu života do navođene godine. Supružnik je još 1973. u tužbi za razvod tvrdio sedam godina odvojenosti, supruga se saglasila na razvod; nepokretnosti stečene posle toga imaju karakter posebne imovine iako brak nije bio pravnosnažno razveden u trenutku kupovine.",
    keywords: ["zajednica života", "bračna tekovina", "posebna imovina", "faktički razvod", "član 171. PZ"],
    related_articles: ["član 171. Porodičnog zakona", "član 168. Porodičnog zakona"],
    headnote: "Potvrđen odbijajući stav: imovina stečena posle faktičkog kraja zajednice života nije bračna tekovina.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4340/2022",
    legal_area: "family",
    legal_question:
      "Da li su osnovani zahtevi za ništavost ugovora o poklonu i za utvrđenje bračnog udela na nepokretnosti posle sporazumne deobe tokom trajanja braka?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe. Deoba zajedničke imovine izvršena je tokom trajanja braka u smislu čl. 177. i 176. Porodičnog zakona, pa se tužilac ne može pozivati na nepodeljenu bračnu tekovinu ni na pretpostavku upisa iz člana 176. stav 2.",
    reasoning:
      "Teret dokazivanja većeg udela bio bi na tužiocu (član 180. stav 3), ali je deoba već izvršena sporazumno tokom braka. Imovina je time postala posebna svojina supružnika u granicama sporazuma, zbog čega zahtevi za ništavost poklona i utvrđenje bračnog udela nisu osnovani.",
    keywords: ["sporazumna deoba", "bračna tekovina", "poklon", "član 178. PZ", "teret dokazivanja"],
    related_articles: ["član 176–180. Porodičnog zakona", "član 178. Porodičnog zakona"],
    headnote: "Posle valjane sporazumne deobe tokom braka nema poziva na nepodeljenu bračnu tekovinu radi ništavosti poklona.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4982/2022",
    legal_area: "family",
    legal_question:
      "Da li posedovanje svakog supružnika nad jednim od dva automobila kupljena u braku, duže od pet godina, predstavlja izvršen usmeni sporazum o deobi i faktičku deobu u smislu Zakona o osnovama svojinskopravnih odnosa?",
    court_position:
      "Vrhovni kasacioni sud je preinačio odluku drugostepenog suda i utvrdio da su oba vozila bračna tekovina. Samo koristištenje vozila registrovanog na svakog supružnika ne dokazuje saglasnu volju za usmeni ugovor o deobi niti fizičku deobu.",
    reasoning:
      "Bračna zajednica prestala je 05.03.2016, brak razveden juna 2016, tužba za deobu podneta 15.12.2016. Nije utvrđena saglasna volja za usmeni ugovor o deobi (članovi 26. i 28. ZOO), a velika razlika u vrednosti vozila ide u prilog revidentkinjinim navodima. Zaključak o usmenom sporazumu i fizičkoj deobi bio je pogrešan u odnosu na član 16. i 18. ZOSVO i član 177. Porodičnog zakona.",
    keywords: ["deoba", "automobil", "bračna tekovina", "usmeni ugovor", "ZOSVO", "ZOO"],
    related_articles: ["član 16. i 18. ZOSVO", "član 177. Porodičnog zakona", "član 26. i 28. ZOO"],
    headnote: "Preinačenje: posedovanje vozila nakon braka ne znaci valjanu sporazumnu deobu bračne tekovine.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 483/2015",
    legal_area: "family",
    legal_question:
      "Da li je prerano utvrđena ništavost ugovora o hipoteci ako nižestepeni sud nije ispitao mogućnost konverzije ništavog ugovora o kreditu u punovažan ugovor o zajmu?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju, ukinuo presude i vratio predmet na ponovno suđenje. Zaključak o ništavosti ugovora o hipoteci bio je preuranjen bez ispitivanja konverzije ništavog kreditnog ugovora.",
    reasoning:
      "Nižestepeni sudovi su utvrdili ništavost ugovora o kreditu zbog suprotnosti Zakonu o deviznom poslovanju i jer je kredit bankarski posao (članovi 103, 1065, 1066. ZOO). Revident je ukazao na propust da se ispita da li se ništavi ugovor može konvertovati u punovažan zajam, što zahteva ponovno odlučivanje na ispunjenijem činjeničnom i pravnom osnovu.",
    keywords: ["hipoteka", "ništavost", "konverzija", "kredit", "ZOO", "devizno poslovanje"],
    related_articles: ["član 103. ZOO", "član 1065–1066. ZOO"],
    headnote: "Ukidanje: pre ništavosti hipoteke sud mora razmotriti konverziju sporazuma o kreditu u zajam.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3239/2023",
    legal_area: "family",
    legal_question:
      "Da li stan u izgradnji i garaža kupljeni i prodati nakon sporazuma o podeli bračne tekovine ostaju predmet naknadne isplate polovine kupoprodajne cene bivšoj supruzi?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu u tom delu i odbio tužbeni zahtev za isplatu. Sporna nepokretnost bila je obuhvaćena ranijom sporazumnom deobom i pripala je tuženom.",
    reasoning:
      "Pravnosnažnom presudom o deobi utvrđeno je da je supruga isključivi vlasnik određenog stana i drugih stvari, a tuženom pripadaju druge nepokretnosti i prava; spor je bio da li stan kupljen u izgradnji i kasnije prodat spada u nepodeljenu bračnu tekovinu. Pravilna je primena pravila da je ta imovina već obuhvaćena sporazumom koji je pravosnažno utvrdio odnose stranaka.",
    keywords: ["sporazumna deoba", "isplata", "stan u izgradnji", "bračna tekovina", "presuđena stvar"],
    related_articles: ["član 177–179. Porodičnog zakona"],
    headnote: "Posle deobe koja obuhvata predmet stranke ne mogu tražiti polovinu cene od iste imovine.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 955/2022",
    legal_area: "family",
    legal_question:
      "Da li novčana sredstvima kojima je bivši suprug posle razvoda kupio nekretninu predstavljaju bračnu tekovinu i osnov za isplatu polovine iznosa?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe. Tužilja nije dokazala da su sredstva stečena radom tokom trajanja bračne zajednice u smislu člana 171. stav 1. Porodičnog zakona.",
    reasoning:
      "Novac stečen isplatama avansnih uplata po osnovu obaveza prema privrednom društvu osnivača tuženog, za izgradnju naselja u periodu 2005–2007, ne predstavlja imovinu stečenu radom u bračnoj zajednici. Prvostepeni sud je pravilno ocenio dokaze o poreklu sredstava i odbio zahtev za isplatu polovine od kupovine posle razvoda.",
    keywords: ["bračna tekovina", "novčana sredstva", "dokazivanje", "član 171. PZ", "razvod"],
    related_articles: ["član 171. stav 1. Porodičnog zakona"],
    headnote: "Novac posle razvoda od poslovnih isplata osnivača nije bračna tekovina ako nije dokazan rad u braku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 7321/2017",
    legal_area: "family",
    legal_question:
      "Da li sud u postupku deobe bračne tekovine može umesto utvrđenja suvlasničkog udela na kući dosuditi isključivo novčanu isplatu protivvrednosti udela i pokretnih stvari?",
    court_position:
      "Apelacioni sud je ukinuo presudu jer je prvostepeni sud pogrešno primenio materijalno pravo dosuđujući novčanu naknadu umesto utvrđenja suvlasničkog udela na nepokretnosti, i vratio predmet na ponovno suđenje.",
    reasoning:
      "Prema članu 171. stav 1. i članu 177. Porodičnog zakona, deoba podrazumeva utvrđivanje suvlasničkog ili supoverilačkog udela na zajedničkoj imovini, a primena člana 196. PZ upućuje na ZOSVO za stvarnopravni režim. Zajednički stečen stambeni objekat i pokretnine zahtevaju pravilnu deobu po pravilima o suvlasništvu, ne samo novčanu kompenzaciju bez utvrđenja udela na nepokretnosti.",
    keywords: ["sudska deoba", "suvlasništvo", "bračna tekovina", "novčana isplata", "član 177. PZ"],
    related_articles: ["član 171. stav 1. Porodičnog zakona", "član 177. Porodičnog zakona", "član 18. ZOSVO"],
    headnote: "Ukidanje: na kući kao bračnoj tekovini prvo utvrditi suvlasnički udeo, a ne zameniti ga isključivo novčanim dosuđenjem.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5959/2021",
    legal_area: "family",
    legal_question:
      "Da li tužilac može tražiti vraćanje dvostruke isplate izdržavanja i opoziv poklona novca kada nije dokazao identičan dug ni animus donandi?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio nižestepene presude. Pravilo o vraćanju dvostruko plaćenog duga zahteva identičan dug u obimu dvostrukog izmirenja, što ovde nije dokazano; za poklon nije dokazana volja darivanja.",
    reasoning:
      "Tužilac je tražio vraćanje iznosa plaćenih na izdržavanje i poklon novca za stan i adaptaciju. Tužena je ukazala na delimičnu isplatu po sporazumu o deobi i poseban spor za deobu. Po članu 63. ZOO ugovor ne nastaje ako postoji nesporazum o osnovu davanja; tužilac nije dokazao animus donandi. Navodi o ništavosti poklona i grube neblagodarnosti ostaju neosnovani.",
    keywords: ["sticanje bez osnova", "poklon", "izdržavanje", "član 63. ZOO", "dokazivanje"],
    related_articles: ["član 63. ZOO", "Porodični zakon"],
    headnote: "Odbijena revizija: nema dvostrukog plaćanja istog duga niti dokazanog poklona bez sporazuma o osnovu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5788/2021",
    legal_area: "family",
    legal_question:
      "Da li je revizija u sporu o utvrđenju udela u bračnoj tekovini izuzetno dozvoljena radi ujednačavanja prakse kada je vrednost spora ispod zakonskog cenzusa?",
    court_position:
      "Vrhovni kasacioni sud je odbacio reviziju kao nedozvoljenu. Nisu ispunjeni uslovi za reviziju kao izuzetno dozvoljenoj zbog vrednosti spora ispod 40.000 evra niti za ujednačavanje prakse bez podnošenja pravnosnažnih presuda o različitoj primeni prava.",
    reasoning:
      "Nižestepene odluke su u skladu sa praksom Vrhovnog kasacionog suda u sličnim predmetima, pa ne postoji interes za odlučivanje o izuzetno dozvoljenoj reviziji. Tuženi nije priložio presude iz kojih proizilazi različito odlučivanje u sličnim situacijama.",
    keywords: ["revizija", "izuzetno dozvoljena", "cenzus vrednosti spora", "ujednačavanje prakse"],
    related_articles: ["Zakon o parničnom postupku – revizija"],
    headnote: "Odbačena revizija: ispod cenzusa i bez priloga za različitu sudsku praksu nema izuzetne dozvoljenosti.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 337/2009",
    legal_area: "family",
    legal_question:
      "Da li je prekoračen razuman rok suđenja u parnici za deobu bračne tekovine koja traje više od dvanaest godina?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu Ramize Husović i utvrdio povredu prava na suđenje u razumnom roku. Postupak je trajao preko 12 godina zbog nedelotvornog postupanja suda, dugih staja i čestih promena sudija.",
    reasoning:
      "Podnositeljka je pokrenula spor o bračnoj tekovini i deobi; deo postupka pokazuje zakazana ročišta bez zapisnika u spisima. Takvo trajanje i neaktivnost ukazuju na nesrazmerno dugo trajanje postupka u odnosu na složenost predmeta, što predstavlja povredu ustavnog prava na suđenje u razumnom roku.",
    keywords: ["razuman rok", "Ustavni sud", "deoba bračne tekovine", "trajanje postupka"],
    related_articles: ["član 32. Ustava RS", "član 6. Evropske konvencije"],
    headnote: "Usvojena ustavna žalba: preko 12 godina parnice o bračnoj tekovini sa prazninama u spisu krši razuman rok.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1955/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li se susvojinski udeli dece na stanu stečeni deobom bračne tekovine roditelja smatraju poklonom od oca i moraju uračunati u nasledni deo?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i odbio tužbeni zahtev tužilaca. Udeli od 1/4 i 1/2 stana iz poravnanja roditelja predstavljaju bračnu tekovinu pokojnog oca i ulaze u naslednu masu po Zakonu o nasleđivanju.",
    reasoning:
      "Prvostepeni sud je pogrešno prihvatio da je prvotuženoj pripao ceo stan; poravnanjem je utvrđeno da sinu pripada 1/4, ćerki 1/2, kao delovi polovine bračne tekovine pokojnog oca. Ti udeli se moraju uračunati u nasledni deo iza oca, a ne tretirati kao isključivo pripadnost majci u sporu sa braćom i sestrom.",
    keywords: ["nasleđe", "bračna tekovina", "poklon", "uračunavanje", "poravnanje"],
    related_articles: ["član 1. Zakona o nasleđivanju", "Porodični zakon – bračna tekovina"],
    headnote: "Udeli iz deobe roditelja uračunavaju se u nasledni deo; ceo stan ne pripada samo jednom nasledniku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4941/2022",
    legal_area: "family",
    legal_question:
      "Da li porodična stambena zgrada i pomoćna zgrada predstavljaju bračnu tekovinu sa jednakim udelima i da li pomoćna zgrada zahteva posebno ispitivanje posebne imovine?",
    court_position:
      "Apelacioni sud je potvrdio presudu u delu o porodičnoj stambenoj zgradi sa jednakim udelima, ali je ukinuo deo o pomoćnoj zgradi radi ispitivanja da li je stečena posebnom imovinom tužene.",
    reasoning:
      "Za glavnu zgradu primenjeni su član 171. stav 1. i član 180. Porodičnog zakona; tužena nije dokazala veću zaradu posle prestanka zajednice u smislu člana 231. stav 3. ZPP. Za pomoćnu zgradu ostalo je sporno da li je stečena iz posebne imovine tužene, što zahteva dopunu postupka i razloga.",
    keywords: ["bračna tekovina", "jednaki udeli", "posebna imovina", "delimično potvrđenje"],
    related_articles: ["član 171. stav 1. Porodičnog zakona", "član 180. Porodičnog zakona", "član 396. stav 2. ZPP"],
    headnote: "Delimično: potvrđena bračna tekovina na glavnoj zgradi; pomoćna zgrada vraćena na dokazivanje posebne imovine.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 32512/2023",
    legal_area: "family",
    legal_question:
      "Da li tužilja može dobiti novčanu naknadu po bračnoj tekovini bez dokaza o postojanju zajedničke imovine ili doprinosu uvećanju posebne imovine tuženog?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje. Pretpostavka jednakih udela iz člana 180. stav 2. važi u postupku sudske deobe tek kada postoji zajednička imovina; tužilja nije dokazala zajedničku imovinu niti doprinos po članu 170. stav 1.",
    reasoning:
      "Sudska deoba podrazumeva utvrđenje postojanja bračne tekovine, zatim suvlasničkih udela, uz oborivu pretpostavku jednakosti. Bez dokaza o zajedničkoj imovini stečenoj u braku nema osnova za novčanu naknadu po članu 180. niti za zahtev po članu 170. o uvećanju posebne imovine.",
    keywords: ["bračna tekovina", "dokazivanje", "član 180. PZ", "član 170. PZ", "novčana naknada"],
    related_articles: ["član 170. stav 1. Porodičnog zakona", "član 171. i 180. Porodičnog zakona"],
    headnote: "Odbijena revizija: bez dokaza o zajedničkoj imovini nema primene pretpostavke jednakih udela ni novčane naknade.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1313/2024",
    legal_area: "family",
    legal_question:
      "Da li sud može dosuditi novčanu naknadu za udeo od 31% u bračnoj tekovini prema doprinosu u izgradnji objekata i veštačenju vrednosti radova?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tuženi obavezan da isplati novčanu naknadu za udeo tužilje od 31% u sticanju bračne tekovine, utvrđen procenom doprinosa u građevinskim radovima do prestanka bračne zajednice.",
    reasoning:
      "Primenom članova 321, 327, 328, 332. Zakona o braku i porodičnim odnosima (ZBPO) u merodavnom trenutku, sud je valorizovao doprinos u radu, staranju o domaćinstvu i izgradnji, uz veštačenje i matricu radova do faze u kojoj je tužilja učestvovala. Naknada odgovara protivvrednosti njenog udela u izvedenim radovima pre daljih radova u kojima nije učestvovala.",
    keywords: ["novčana naknada", "doprinos", "izgradnja", "bračna tekovina", "ZBPO"],
    related_articles: ["član 321, 327, 328, 332. ZBPO"],
    headnote: "Potvrđena isplata protivvrednosti za manji udeo (31%) utvrđen ekonomskim veštačenjem građevinskog doprinosa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1695/2016",
    legal_area: "family",
    legal_question:
      "Kako se utvrđuju udeli supružnika u bračnoj tekovini kada je merodavno pravo Republike Hrvatske?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i utvrdio pravo susvojine tužilje na polovini nepokretnosti stečenih u braku. Po hrvatskom Obiteljskom zakonu supružnici su u jednakim delovima suvlasnici bračne tekovine ako nisu drugačije ugovorili, bez obzira na finansijski doprinos.",
    reasoning:
      "Stranke su hrvatski državljani; primenjuje se Zakon o rešavanju sukoba zakona sa propisima drugih zemalja (član 38. stav 1. u vezi sa članom 36. stav 1). Po članovima 248–249. Obiteljskog zakona RH bračna tekovina obuhvata imovinu stečenu radom u bračnoj zajednici, a suvlasništvo je po polovini ako nema bračnog ugovora. Tuženi nije dokazao posebne osnove stečenja.",
    keywords: ["merodavno pravo", "Hrvatska", "jednaki udeli", "bračna tekovina", "sukob zakona"],
    related_articles: ["član 36–38. Zakona o rešavanju sukoba zakona", "Obiteljski zakon RH čl. 248–249"],
    headnote: "Preinačenje: hrvatsko pravo daje po pravilu polovinu bračne tekovine bez dokazivanja većeg doprinosa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2146/2021",
    legal_area: "family",
    legal_question:
      "Da li supružnik može tražiti sudsku deobu iste imovine posle punovažnog pisanog sporazuma o deobi koji je realizovan?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje. Sporazum o deobi zajedničke imovine koji je zaključen i izvršen predstavlja vansudsko poravnanje koje isključuje ponovnu sudsku deobu iste imovine.",
    reasoning:
      "Primenom članova 178–180. i 179. Porodičnog zakona u vezi sa članom 170. stav 1, sud deobi vrši samo ako supružnici ne mogu da se sporazumeju. Ako su stranke već sporazumno podelile imovinu u skladu sa materijalnim pravom (član 179. i raniji član 40. stav 2. PZ u vezi sa članom 179. stav 1), tužba za sudsku deobu iste imovine je neosnovana.",
    keywords: ["sporazumna deoba", "vansudsko poravnanje", "sudska deoba", "litispendencija"],
    related_articles: ["član 178–180. Porodičnog zakona", "član 179. Porodičnog zakona"],
    headnote: "Izvršen pisani sporazum o deobi sprečava naknadnu sudsku deobu iste imovine.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9078/2023",
    legal_area: "family",
    legal_question:
      "Da li neupisivanje supružnika kao vlasnika u katastru utiče na pasivnu legitimaciju u sporu o utvrđenju bračne tekovine na nepokretnosti kupljenoj u braku?",
    court_position:
      "Vrhovni kasacioni sud je preinačio drugostepenu presudu i potvrdio prvostepenu, utvrđujući udeo tužilje od jedne polovine. Formalni upis samo jednog supružnika ne isključuje bračnu tekovinu niti legitimaciju drugog supružnika.",
    reasoning:
      "Predmet je utvrđenje bračne tekovine na nepokretnosti stečenoj ugovorom o kupoprodaji u braku. Po članovima 168, 171, 176. i 177. Porodičnog zakona, stečevina radom u zajednici života je zajednička; upis na jednog kupca ne čini automatski posebnu imovinu ako nije ispunjen izuzetak iz člana 176. stav 2. Nižestepeni sudovi su pravilno ocenili da nepokretnost nije posebna imovina tuženog.",
    keywords: ["bračna tekovina", "katastar", "suvlasništvo", "član 176. PZ", "legitimacija"],
    related_articles: ["član 168, 171, 176, 177. Porodičnog zakona"],
    headnote: "Preinačenje u korist tužilje: kupovina na jednog supružnika u braku ne dokazuje posebnu imovinu bez izuzetaka iz čl. 176.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 590/2025",
    legal_area: "family",
    legal_question:
      "Da li naslednici mogu tražiti utvrđenje bračne tekovine posle smrti supružnika i da li se nužni deo može osporiti bez pravilnog utvrđenja visine?",
    court_position:
      "Apelacioni sud je delimično ukinuo presudu. Prvostepeni stav da se posle smrti supružnika ne može utvrđivati bračna tekovina predstavlja pogrešnu primenu materijalnog prava; u delu nužnog dela presuda je nejasna i nije ispitana povreda kako je tužbom traženo.",
    reasoning:
      "Po članovima 171, 180. i 181. Porodičnog zakona pravo na deobu imaju i naslednici umrlog supružnika. Zato zaključak da posle smrti ostaje samo zaostavština bez mogućnosti utvrđenja bračne tekovine nije prihvatljiv. Ostali delovi su delimično potvrđeni uz upućivanje na član 390. ZPP.",
    keywords: ["bračna tekovina", "smrt supružnika", "naslednici", "nužni deo", "član 181. PZ"],
    related_articles: ["član 171, 180, 181. Porodičnog zakona", "član 390. ZPP"],
    headnote: "Delimično ukidanje: naslednici mogu tražiti utvrđenje bračne tekovine; greška o isključenju posle smrti.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 574/2016",
    legal_area: "family",
    legal_question:
      "Kako uticaju otplata kredita roditeljima jednog supružnika i veća zarada drugog na utvrđivanje udela u bračnoj tekovini na stanu?",
    court_position:
      "Vrhovni kasacioni sud je preinačio nižestepene presude i utvrdio suvlasništvo 41% tužiocu i 59% tužene. Iako je deo cene plaćen poklonom roditelja tužene posle prestanka zajednice, taj novčani doprinos tretira se kao poklon samo u korist tužene, ali to ne menja utvrđene udele u sticanju zajedničke imovine po meritornim pravilima suda.",
    reasoning:
      "Stan je bračna tekovina stečena u braku bez obzira što je u ugovoru kupac samo tužena. Nižestepeni sudovi su utvrdili podjednak doprinos u domaćinstvu uprkos većoj zaradi tužioca i otplati kredita; VKS je ipak valorisao posebnu imovinu (poklon roditelja) drugačije u odnosu na konačne udele, preinačujući na 41/59 uz obrazloženje o značaju poklona tužene.",
    keywords: ["suvlasništvo", "bračna tekovina", "poklon roditelja", "doprinos", "član 180. PZ"],
    related_articles: ["član 168. stav 2. Porodičnog zakona", "član 180. Porodičnog zakona"],
    headnote: "Preinačeni udeli 41/59: poklon roditelja posle prestanka zajednice ne ostavlja jednake polovine ako pravilo o doprinosu ukazuje drugačije.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3435/2022",
    legal_area: "family",
    legal_question:
      "Da li je ništav ugovor o poklonu zajedničke imovine zaključen bez saglasnosti drugog supružnika i da li sud u tužbi trećeg lica može podeliti imovinu po članu 180. stav 2 bez postupka sudske deobe?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju tužilje i preinačio drugostepenu presudu: ugovor o poklonu zajedničke imovine bez saglasnosti drugog supružnika je ništav u celosti; raspolaganje neodređenim udelom pre deobe nije dozvoljeno.",
    reasoning:
      "U sporu trećeg lica o ništavosti poklona ne može se po službenoj dužnosti sudom vršiti deoba po pretpostavci jednakih udela iz člana 180. stav 2. jer to nije postupak sudske deobe iz stava 1. Poklonodavac nije mogao besplatno preneti udeo na zajedničkoj nepokretnosti jer deoba bračne tekovine nije bila izvršena sporazumom; bez saglasnosti supružnika raspolaganje je ništavo (član 174. u vezi sa članom 103. ZOO).",
    keywords: ["poklon", "saglasnost supružnika", "zajednička imovina", "ništavost", "član 174. PZ"],
    related_articles: ["član 174. stav 1. i 3. Porodičnog zakona", "član 103. ZOO", "član 180. Porodičnog zakona"],
    headnote: "Usvojena revizija: poklon zajedničke imovine bez saglasnosti drugog supružnika je ništav; nema deobe po službenoj dužnosti u tužbi trećeg.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 6100/2020",
    legal_area: "family",
    legal_question:
      "Da li prihod od poljoprivredne proizvodnje ostaje predmet tužbe za utvrđenje bračne tekovine posle sveobuhvatnog sporazuma o sporazumnoj deobi tokom parnice?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje. Ako je strankama ugovorom o sporazumnoj deobi obuhvaćen i prihod sa voćnjaka, tužilja mora dokazati da traženi prihod nije obuhvaćen tim ugovorom; u suprotnom je odbijanje tužbe pravilno.",
    reasoning:
      "Deoba zajedničke imovine može biti sporazumna (član 179) ili sudska (član 180). Ugovor od 09.04.2011. reguliše deobu; teret na tužilji po pravilima članova 228–231. ZPP da dokaže da predmetni prihod nije obuhvaćen. VKS nalazi da je pravilno odbijen zahtev za utvrđenje i isplatu polovine prihoda od 2010. godine.",
    keywords: ["sporazumna deoba", "prihod", "teret dokazivanja", "bračna tekovina"],
    related_articles: ["član 178–180. Porodičnog zakona", "član 228–231. ZPP"],
    headnote: "Odbijena revizija: posle sveobuhvatnog sporazuma o deobi tužilja mora dokazati da prihod nije obuhvaćen.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 12698/2022",
    legal_area: "family",
    legal_question:
      "Da li usmeni dogovor da jednom supružniku pripadne stan uz preuzimanje kredita i drugom štedevina predstavlja valjanu sporazumnu deobu bračne tekovine?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio odbijanje tužbe za utvrđenje susvojine na stanu. Stranke su pored sudskog poravnanja sklopile usmeni sporazum o pripadnosti stana i raspodeli obaveza, što je deo valjane sporazumne deobe.",
    reasoning:
      "Porodičnim zakonom je dozvoljena sporazumna deoba (član 179), a deoba uključuje utvrđenje udela (član 177). Na utvrđenom činjeničnom stanju o usmenom dogovoru i preuzimanju kredita od strane tuženog, drugostepeni sud je pravilno primenio pravo i odbio tužbeni zahtev za susvojstvo na stanu koji je sporazumom pripao tuženom.",
    keywords: ["usmeni sporazum", "sporazumna deoba", "stan", "sudsko poravnanje", "bračna tekovina"],
    related_articles: ["član 177–180. Porodičnog zakona", "član 179. Porodičnog zakona"],
    headnote: "Odbijena revizija: usmeni dogovor uz poravnanje može isključiti naknadno traženje polovine stana.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3925/2019",
    legal_area: "family",
    legal_question:
      "Da li aneks ugovora o deobi posle pravnosnažne presude o razvodu može menjati doživotnu obavezu plaćanja na ime udela i izdržavanja utvrđenu presudom?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude koje su ukinule doživotnu obavezu plaćanja. Pravnosnažna presuda o razvodu sa unetim sporazumom i doživotnom obavezom ne može se menjati naknadnim aneksom stranaka.",
    reasoning:
      "Deveti stav presude o razvodu obavezao je tužioca na 2.500 evra mesečno na ime deobe i izdržavanja doživotno. Nižestepeni sudovi su pogrešno smatrali da aneks menja tu obavezu i da tužena mora dokazivati nepodeljenu imovinu. Presuda državnog organa koja je postala pravnosnažna i izvršna ima prednost nad naknadnim sporazumom stranaka o istom predmetu.",
    keywords: ["razvod", "sporazum o deobi", "aneks", "doživotno izdržavanje", "pravnosnažnost"],
    related_articles: ["Porodični zakon", "ZPP – ukidanje"],
    headnote: "Ukidanje: aneks ne menja obaveze iz pravnosnažne bračnoporodične presude o izdržavanju i deobi.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1408/2025",
    legal_area: "family",
    legal_question:
      "Da li sporazum o deobi imovine u postupku razvoda ima dejstvo prema poveriocu i da li je tužba za pobijanje pravnih radnji podneta u roku iz člana 285. ZOO?",
    court_position:
      "Sud je utvrdio da sporazum o deobi u razvodu nema dejstvo prema poveriocu kada je dužnica prenela svu nepokretnost na bivšeg supruga radi osujećenja naplate. Tužba je podneta u roku od tri godine od raspolaganja.",
    reasoning:
      "Primenom člana 285. stav 1. ZOO, rok teče od izvršenog raspolaganja. Sporazum o deobi koji predstavlja teretni pravni posao razmene udela, a učinjen je dok je tuženi bio suprug dužnice, ispunjava kumulativne uslove za pobijanje: dospelost i visina potraživanja, raspolaganje koje dovodi dužnika u nemogućnost namirenja, podnesak u roku.",
    keywords: ["pobijanje pravnih radnji", "sporazumna deoba", "poverilac", "član 285. ZOO", "razvod"],
    related_articles: ["član 280–285. ZOO"],
    headnote: "Sporazum o deobi u razvodu može se pobiti kao radnja na štetu poverilaca ako ispunjava uslove ZOO.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9310/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li naslednik može tražiti utvrđenje suvlasničkog udela na stanu koji je predstavljao bračnu tekovinu pokojne sestre i njenog supruga ako supružnici nisu izvršili deobu za života?",
    court_position:
      "Sud je potvrdio pravo tužioca na suvlasnički udeo na osnovu doprinosa ostavilje u zajedničkom domaćinstvu. Primena izuzetka za postupke započete pre Porodičnog zakona odbačena je jer je tužba podneta posle početka njegove primene.",
    reasoning:
      "Porodičnim zakonom su uređeni režim zajedničke imovine (član 171. stav 1), upis kao zajednički i kada je na jednog (član 176. stav 2), deoba kao utvrđenje udela (član 177), rok deobe (član 178), nosioci prava na deobu uključujući naslednike (član 181) i sudska deoba sa pretpostavkom jednakosti (član 180). Budući supružnici nisu deobu spornih nepokretnosti izvršili do prestanka braka, naslednik može tražiti utvrđenje svog prava.",
    keywords: ["naslednik", "bračna tekovina", "suvlasništvo", "deoba", "član 181. PZ"],
    related_articles: ["član 171, 176–181. Porodičnog zakona"],
    headnote: "Potvrđeno pravo naslednika na udeo kada bračni drugovi nisu deobu završili za života; primena PZ.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6667/2013",
    legal_area: "family",
    legal_question:
      "Da li stan otkupljen tokom braka na osnovu saglasnosti roditelja kao nosioca stanarskog prava predstavlja zajedničku bračnu imovinu?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu. Sporni stan predstavlja posebnu imovinu supružnice; režim zajedničke imovine je isključen jer je otkup ostvaren kao član porodičnog domaćinstva nosioca stanarskog prava, a ne kao nosilac samog prava.",
    reasoning:
      "Podnosilac nije bio član porodičnog domaćinstva nosioca u vreme dodele ni prelaska stanarskog prava. Iako otkup u braku može dati bračnu tekovinu, overena saglasnost roditelja-nosioca isključuje zajednički režim na tom stanu. Ocena redovnih sudova nije proizvoljna u smislu Ustava.",
    keywords: ["otkup stana", "stanarsko pravo", "posebna imovina", "Ustavni sud", "bračna tekovina"],
    related_articles: ["član 32. Ustava RS", "Porodični zakon – posebna i zajednička imovina"],
    headnote: "Odbijena ustavna žalba: otkup uz saglasnost nosioca stanarskog prava kao član domaćinstva isključuje bračnu tekovinu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 791/2022",
    legal_area: "family",
    legal_question:
      "Da li rad oca jednog supružnika na izgradnji kuće predstavlja njegov poseban doprinos u bračnoj tekovini ili poklon oboma supružnicima?",
    court_position:
      "Apelacioni sud je preinačio presudu i povećao udeo tužilje. Radovi oca tuženog tretiraju se kao poklon u korist oba supružnika koji se deli podjednako, a ne kao uvećanje isključivo tuženog udela.",
    reasoning:
      "Parcela i kuća stečeni su u braku radom supružnika; doprinos domaćice i rada na imanju vrednovan je zajedno sa zaposlenošću tuženog. Veštačenje je uzelo period pripreme i trajanje bračne zajednice do decembra 2012. Primenom članova 171. i 180. stav 2–3. PZ utvrđeno je da nepokretnosti nisu stečene u proširenoj porodičnoj zajednici sa ocem tuženog kao trećim sticaocima.",
    keywords: ["poklon roditelja", "bračna tekovina", "doprinos", "veštačenje", "član 180. PZ"],
    related_articles: ["član 171. stav 1. Porodičnog zakona", "član 180. stav 2–3. Porodičnog zakona"],
    headnote: "Preinačenje: ulaganje oca u gradnju bračnog doma kao poklon oboma supružnicima, ne kao posebni udeo jednog.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3070/2021",
    legal_area: "family",
    legal_question:
      "Da li nepokretnosti kupljene tokom kratkog privremenog prekida zajednice života pre formalnog razvoda predstavljaju zajedničku imovinu?",
    court_position:
      "Vrhovni sud je potvrdio da su nepokretnosti bračna tekovina. Kupovina je finansirana sredstvima stečenim radom tokom trajanja braka, prekid je bio privremen i nakon njega je usledila vanbračna zajednica i deca.",
    reasoning:
      "Stranke su bile u braku od 1977, sa kratkim prekidom krajem 1982, formalni razvod 23.03.1983, zatim vanbračna zajednica. Kupoprodaja 28.01.1983. izvršena je od novca stečenog u braku; prekid od nekoliko meseci kod oca tužilje nije trajni prestanak zajednice života. Navodi da je to posebna imovina tuženog su odbačeni jer je utvrđeno sticanje u braku.",
    keywords: ["privremeni prekid", "bračna tekovina", "član 171. PZ", "vanbračna zajednica"],
    related_articles: ["član 171. stav 1. Porodičnog zakona"],
    headnote: "Potvrđeno: kratki prekid zajednice života ne prekida sticanje zajedničke imovine ako sredstva potiču iz braka.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 28122/2023",
    legal_area: "family",
    legal_question:
      "Da li tužba za utvrđenje svojinskog udela u bračnoj tekovini prekida zastarelost za poseban zahtev za isplatu novčane protivvrednosti ulaganja u posebnu imovinu?",
    court_position:
      "Vrhovni sud je odbacio reviziju kao nedozvoljenu. Rok zastarelosti za obligacioni zahtev za isplatu teče od prestanka bračne zajednosti; potraživanje je zastarelo, vrednost spora ispod cenzusa, nema izuzetno dozvoljene revizije.",
    reasoning:
      "Tužba za utvrđenje udela u bračnoj tekovini ne prekida zastarelost za odvojeni obligacioni zahtev po članu 371. ZOO. Brak razveden 1996, tužba 2017 – desetogodišnji rok istekao. Nižestepene odluke u skladu su sa praksom; nedostaju presude za ujednačavanje.",
    keywords: ["zastarelost", "revizija", "bračna tekovina", "član 371. ZOO", "cenzus"],
    related_articles: ["član 371. ZOO", "ZPP – revizija"],
    headnote: "Odbačena revizija: posebni zahtev za isplatu može zastarati nezavisno od tužbe za utvrđenje udela.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7269/2021",
    legal_area: "family",
    legal_question:
      "Da li supružnik može tražiti isplatu polovine vrednosti zajedničke imovine kojom je drugi supružnik raspolagao poklonom pre deobe?",
    court_position:
      "Vrhovni sud je odbio reviziju tužene i potvrdio obavezu isplate polovine vrednosti otuđene zajedničke imovine. Raspolaganje pre deobe daje drugom supružniku obligacioni zahtev za udeo.",
    reasoning:
      "Vozilo i poslovna sredstva stečeni su u braku (član 171. PZ). Otuđenje poklonom ćerkama u mesecu razvoda, posle saznanja tužioca, opravdava preinačenje zahteva u obligacioni. Jednak doprinos u sticanju; potraživanje nije zastarelo. Primenjeni članovi 171, 177, 178. i 180. stav 1–2. PZ.",
    keywords: ["otuđenje", "poklon", "bračna tekovina", "isplata udela", "član 171. PZ"],
    related_articles: ["član 171. stav 1.", "član 177–180. Porodičnog zakona"],
    headnote: "Potvrđena isplata polovine vrednosti zajedničke imovine otuđene jednim supružnikom pre deobe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4463/2021",
    legal_area: "family",
    legal_question:
      "Da li stan stečen lancem pravnih poslova od sredstava od prodaje posebne imovine jednog supružnika ostaje posebna imovina i da li vozilo kupljeno u braku predstavlja bračnu tekovinu?",
    court_position:
      "Vrhovni kasacioni sud je delimično usvojio reviziju i preinačio drugostepenu presudu: stan ostaje posebna imovina supružnika koji je prodao posebnu imovinu, primenom realne subrogacije; motorno vozilo kupljeno u braku ostaje zajednička imovina.",
    reasoning:
      "Posebna imovina obuhvata i stečevinu deobom, nasleđem, poklonom itd. (član 168. stav 2). Sud je razlikovao poreklo sredstava za stan od kupovine vozila u bračnoj zajednici. Vanbračna zajednica i zajam (član 191. PZ) utiču na ocenu lanca transakcija, ali realna subrogacija čuva kvalifikaciju posebne imovine za stan kada sredstva potiču od prodaje prethodne posebne imovine tužioca.",
    keywords: ["realna subrogacija", "posebna imovina", "bračna tekovina", "vanbračna zajednica", "član 191. PZ"],
    related_articles: ["član 168. stav 2. Porodičnog zakona", "član 171, 176–179. Porodičnog zakona", "član 191. Porodičnog zakona"],
    headnote: "Delimično: stan od sredstava posebne imovine ostaje posebna; vozilo iz braka ostaje zajednička imovina.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13816/2023",
    legal_area: "family",
    legal_question:
      "Da li je osnovana isplata protivvrednosti ulaganja u posebnu imovinu supružnika uz istovremenu ništavost ugovora o poklonu zajedničkog stana bez saglasnosti supruge?",
    court_position:
      "Vrhovni sud je delimično usvojio reviziju: ukinut je deo o isplati protivvrednosti ulaganja u posebnu imovinu; potvrđena je ništavost ugovora o poklonu kojim je muž raspolagao zajedničkim stanom bez saglasnosti supruge.",
    reasoning:
      "Primenom članova 171, 177. i 180. stav 1–4. Porodičnog zakona važi režim sudske deobe i kriterijumi za udeo. Raspolaganje zajedničkim stanom bez saglasnosti drugog supružnika ostaje ništavo; isplata po posebnoj imovini zahteva posebnu pravnu osnovu koju je sud delimično pogrešno primenio u pobijanom delu.",
    keywords: ["poklon", "zajednička imovina", "saglasnost", "ulaganje", "deoba"],
    related_articles: ["član 171, 177, 180. Porodičnog zakona"],
    headnote: "Delimično: ništav poklon zajedničkog stana bez saglasnosti; ukinut deo o isplati protivvrednosti ulaganja.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7943/2023",
    legal_area: "family",
    legal_question:
      "Kako podeliti bračnu tekovinu na kući izgrađenoj na parceli koja je posebna imovina jednog supružnika kada su oba doprinosila radom i porodice su pomagale gradnju?",
    court_position:
      "Vrhovni sud je potvrdio udeo tužilje od jedne trećine na porodičnoj kući izgrađenoj tokom braka. Parcelu je pre braka kupio tuženi iz posebne imovine, ali je objekat podignut za potrebe supružnika uz zajednički rad i pomoć porodica.",
    reasoning:
      "Primenom članova 178. i 180. Porodičnog zakona sud je valorisao doprinos svakog supružnika i ulogu trećih lica u izgradnji. Iako je plac posebna imovina tuženog, vrednost izgrađenog dela predstavlja bračnu tekovinu u razmeri 1/3 za tužilju i veći deo za tuženog.",
    keywords: ["bračna tekovina", "parcela trećeg lica", "doprinos", "član 180. PZ", "suvlasništvo"],
    related_articles: ["član 178–180. Porodičnog zakona"],
    headnote: "Potvrđen manji udeo (1/3) na kući na tuđem placu kada je gradnja bračna tekovina uprkos posebnom zemljištu.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 8006/2012",
    legal_area: "family",
    legal_question:
      "Da li je prekoračen razuman rok suđenja u sporu o bračnoj tekovini koji traje sedam godina i devet meseci i da li meritorna odluka krši Ustav?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu u delu povrede prava na suđenje u razumnom roku; u delu pobijanja meritorne odluke žalba je odbačena.",
    reasoning:
      "Trajanje postupka za deobu bračne tekovine od preko sedam godina i devet meseci predstavlja povredu razumnog roka. Meritorno je utvrđeno da bračna zajednica nije postojala od 1989. godine pa stan otkupljen 2002. nije bračna tekovina; osporavanje te ocene ustavnom žalbom nije prihvatljivo u okviru nadležnosti Ustavnog suda.",
    keywords: ["razuman rok", "bračna tekovina", "Ustavni sud", "meritorna odluka"],
    related_articles: ["član 32. Ustava RS", "član 6. EKČP"],
    headnote: "Usvojena žalba zbog trajanja postupka; meritorni deo o odbijanju zahteva nije osporen ustavnom žalbom.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1412/2005",
    legal_area: "family",
    legal_question:
      "Da li nastavak otplate kredita za kuću od strane jednog supružnika posle razvoda menja utvrđeni udeo u zajedničkoj imovini stečenoj tokom braka?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio udeo tužilje od 293/1000. Otplata kredita posle razvoda ne menja udeo stečen u braku, već može biti predmet posebnog obligacionog zahteva.",
    reasoning:
      "Primenom članova 321, 327. i 328. Zakona o braku i porodičnim odnosima (ZBPO) merodavnog u vreme sticanja, sud je procenio doprinos oba bračna druga u zajedničkoj imovini. Kreditno zaduženje posle prestanka bračne zajednice nije faktor za reviziju visine udela utvrđenog za period braka.",
    keywords: ["deo u zajedničkoj imovini", "kredit", "razvod", "ZBPO"],
    related_articles: ["član 321, 327, 328. ZBPO"],
    headnote: "Potvrđen udeo iz braka; naknadna otplata kredita ne menja procenu doprinosa tokom bračne zajednice.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1157/2025",
    legal_area: "family",
    legal_question:
      "Da li sud pri deobi bračne tekovine mora odvojiti vrednost zajednički izgrađenog objekta od vrednosti zemljišta koje je posebna imovina jednog supružnika?",
    court_position:
      "Vrhovni sud je ukinuo drugostepenu presudu i naložio ponovno suđenje radi razdvajanja vrednosti porušenog odnosno zajednički stečenog objekta od vrednosti zemljišta kao posebne imovine.",
    reasoning:
      "Prema članu 180. Porodičnog zakona sud najpre utvrđuje ukupnu imovinsku masu u trenutku prestanka zajednice, zatim izdvaja posebnu imovinu; preostalo je zajednička imovina. Drugostepeni sud nije precizno odvojio komponente vrednosti, zbog čega je odluka nepotpuno obrazložena i ukinuta.",
    keywords: ["deoba", "posebna imovina", "vrednosna razgraničenja", "član 180. PZ"],
    related_articles: ["član 180. Porodičnog zakona"],
    headnote: "Ukidanje: mora se odvojiti vrednost zajedničkog objekta od parcele posebne imovine.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 921/2011",
    legal_area: "family",
    legal_question:
      "Da li je pravilno tretiran zahtev za utvrđenje udela u bračnoj tekovini kao zastareo naslednopravni zahtev?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu, poništio presudu Apelacionog suda i utvrdio povredu prava na pravično suđenje zbog proizvoljne primene zastarelosti.",
    reasoning:
      "Zahtev za utvrđenje bračne tekovine ima prirodu porodičnopravnog spora koji nije podoban za tretman kao zastareli naslednopravni zahtev u konkretnom pravnom okviru ZBPO. Osporena primena prava bila je proizvoljna u odnosu na podnosioce.",
    keywords: ["zastarelost", "bračna tekovina", "pravično suđenje", "Ustavni sud"],
    related_articles: ["član 32. Ustava RS", "Zakon o braku i porodičnim odnosima"],
    headnote: "Usvojena žalba: utvrđivanje bračne tekovine ne sme proizvoljno podvesti pod zastarelo nasleđivanje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3494/2020",
    legal_area: "family",
    legal_question:
      "Da li sporazum o deobi zajedničke imovine koji obuhvata nepokretnosti predstavlja promet nepokretnosti za koji je potrebna overa potpisa kod sudije?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca. Sporazum o deobi nije promet nepokretnosti; valjanost se ceni po Porodičnom zakonu i ZOO (neformalnost), a pismena forma iz čl. 176. i 179. PZ je ispunjena.",
    reasoning:
      "Titulari zajedničke imovine su oba supružnika sa neopredeljenim udelima; sporazum o deobi utvrđuje susvojstvo u već stečenoj imovini, ne vrši promet u smislu Zakona o prometu nepokretnosti. Time pada zakonska pretpostavka upisa na oba supružnika; nepokretnosti postaju posebna imovina tužene deobom (član 168. stav 2. PZ).",
    keywords: ["sporazumna deoba", "forma", "promet nepokretnosti", "član 67. ZOO", "član 179. PZ"],
    related_articles: ["član 176. stav 2. Porodičnog zakona", "član 179. Porodičnog zakona", "član 67. stav 1. ZOO", "član 414. stav 1. ZPP"],
    headnote: "Odbijena revizija: sporazum o deobi nije kupoprodaja; ne traži overu kao kod prometa nepokretnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 16472/2022",
    legal_area: "family",
    legal_question:
      "Da li je važeći usmeni sporazum supružnika o deobi bračne tekovine na kući u Srbiji ako za njega nije propisana posebna forma?",
    court_position:
      "Vrhovni sud je preinačio nižestepene odluke i odbio tužbeni zahtev za polovinu kuće. Utvrđen je važeći usmeni sporazum o deobi tokom braka u smislu člana 179. PZ uz primenu člana 196. PZ i neformalnosti ugovora po ZOO.",
    reasoning:
      "Na nespornim i dokazanim činjenicama o usmenom dogovoru drugostepeni zaključak da sporazuma nije bilo ne može stajati. Za sporazum koji ne vrši promet nepokretnosti već utvrđuje udele u ranijoj zajedničkoj imovini nije bila propisana overena forma po ZPN, već saglasnost volja (članovi 11, 26, 67. ZOO).",
    keywords: ["usmeni sporazum", "sporazumna deoba", "neformalnost", "član 179. PZ"],
    related_articles: ["član 179. Porodičnog zakona", "član 196. Porodičnog zakona", "član 11, 26, 67. ZOO"],
    headnote: "Preinačenje: usmena sporazumna deoba bračne tekovine može biti valjana bez overe kao kod prometa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5503/2022",
    legal_area: "family",
    legal_question:
      "Da li advokatska nagrada za uspeh u zastupanju stranke u toku braka predstavlja prihod od rada u smislu bračne tekovine i osnov za jednake udele?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio da su nepokretnosti zajednička imovina sa jednakim udelima; nagrada advokata, uključujući success fee, jeste prihod od rada.",
    reasoning:
      "Po članu 180. stav 4–5. PZ veći udeo se utvrđuje u istoj srazmeri za sva prava u trenutku prestanka zajednice, osim ako pojedino pravo nije ekonomski samostalno. Kupoprodajna cena stana delimično je obezbeđena nagradom tuženom za zastupanje, što je prihod od rada kao i zarada; jednaki udeli su pravilno utvrđeni.",
    keywords: ["advokatska nagrada", "bračna tekovina", "jednaki udeli", "član 180. PZ"],
    related_articles: ["član 180. stav 4–5. Porodičnog zakona", "član 171. Porodičnog zakona"],
    headnote: "Potvrđeno: honorar i nagrada za uspeh ulaze u prihode od rada za potrebe bračne tekovine.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6151/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li je stan bračna tekovina sa jednakim udelima i da li je deo zaveštanja kojim je suprug raspodelio suvlasnički udeo supruge ništav?",
    court_position:
      "Apelacioni sud je potvrdio da je stan zajednička imovina sa jednakim udelima i da je deo zaveštanja kojim je pokojni suprug raspolagao polovinom stana supruge ništav jer to nije bila njegova isključiva svojina.",
    reasoning:
      "Doprinos domaćice tokom decenija braka i lični rad na gradnji predstavljaju rad u smislu člana 171. PZ. Po članu 1. Zakona o nasleđivanju zaostavština obuhvata samo prava koja su ostaviocu pripadala u trenutku smrti; raspolaganje polovinom koja pripada bračnoj tekovini supruge nije valjano.",
    keywords: ["zaveštanje", "bračna tekovina", "ništavost", "nasleđe", "domaćica"],
    related_articles: ["član 171. Porodičnog zakona", "član 1. Zakona o nasleđivanju"],
    headnote: "Potvrđeno: polovina stana kao bračna tekovina supruge ne može se zaveštati od strane supruga.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7512/2021",
    legal_area: "family",
    legal_question:
      "Da li su osnovane revizije obe strane u sporu o podeli bračne tekovine kada je deo imovine posebna svojina jednog supružnika, a za ostatak važi pretpostavka jednakih udela?",
    court_position:
      "Vrhovni kasacioni sud je odbio revizije tužilje i tuženog. Drugostepeni sud je pravilno utvrdio činjenice i primenio članove 168. stav 2, 171, 177. i 180. Porodičnog zakona.",
    reasoning:
      "Jedan deo imovine stečen je posebnim sredstvima tuženog; za preostalu bračnu tekovinu važi pretpostavka jednakih udela uz mogućnost dokazivanja većeg doprinosa. Ocena dokaza na raspravi u smislu člana 8. ZPP nije pobijana dozvoljenim revizijskim razlozima.",
    keywords: ["revizija", "posebna imovina", "jednaki udeli", "bračna tekovina"],
    related_articles: ["član 168. stav 2. Porodičnog zakona", "član 171, 177, 180. Porodičnog zakona"],
    headnote: "Odbijene revizije stranaka: potvrđena podela između posebne i zajedničke imovine sa jednakim udelima u zajedničkom delu.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3217/2022",
    legal_area: "family",
    legal_question:
      "Kako utvrditi udele članova u imovini stečenoj u bračnoj i porodičnoj zajednici po starom Zakonu o braku i porodičnim odnosima?",
    court_position:
      "Apelacioni sud je delimično preinačio i potvrdio odluku o udelima bračnih drugova i članova porodične zajednice, uz ukidanje dela zbog prekoračenja tužbenog zahteva.",
    reasoning:
      "Merodavan je ZBPO sa članovima 321–329 o zajedničkoj imovini, upravljanju, sporazumnoj i sudskoj deobi i kriterijumima doprinosa (lični dohodak, pomoć, staranje o deci, domaćinstvo, imovina). Udeo se određuje u istoj srazmeri prema stanju u trenutku prestanka bračne zajednice.",
    keywords: ["porodična zajednica", "ZBPO", "doprinos", "deoba"],
    related_articles: ["član 321–329. ZBPO"],
    headnote: "Delimično: udeli u bračnoj i porodičkoj zajednici po ZBPO; ukinut deo van granica tužbe.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4924/2024",
    legal_area: "family",
    legal_question:
      "Da li je kuća izgrađena na parceli koja je bila u vlasništvu majke jednog supružnika deo bračne tekovine i da li je relevantno kada je zajednica života prestala pre gradnje?",
    court_position:
      "Vrhovni sud je delimično usvojio reviziju tuženog i ukinuo presude u delu koji se odnosi na kuću na tuđoj parceli, ukazujući na potrebu utvrđivanja sporazuma supružnika o gradnji na tuđem zemljištu.",
    reasoning:
      "Nepokretnosti stečene zajedničkim radom u braku predstavljaju bračnu tekovinu; revizija ne može pobijati utvrđeno činjenično stanje osim u ograničenim slučajevima iz člana 403. stav 2. ZPP. Za kuću na parceli majke tuženog nižestepeni sudovi nisu dovoljno razmotrili sporazum o gradnji i pravni status parcele.",
    keywords: ["bračna tekovina", "gradnja na tuđem", "sporazum", "delimično usvajanje revizije"],
    related_articles: ["član 171, 177–180. Porodičnog zakona", "član 407. stav 2. ZPP"],
    headnote: "Delimična revizija: ukinuto u delu o kući na tuđoj parceli radi utvrđivanja sporazuma o gradnji.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 22446/2024",
    legal_area: "family",
    legal_question:
      "Da li je dobit od voćnjaka zajednička imovina supružnika i kako se deli kada je to sporazumom prihvaćeno?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio isplatu polovine čistog prihoda tužilji, u skladu sa sporazumom stranaka i pravilima o bračnoj tekovini i zateznoj kamati.",
    reasoning:
      "Stranke su sporazumom prihvatile da je dobit od proizvodnje voća zajednička i da se deli na jednake delove nakon utvrđenja prinosa i troškova. Kompenzacioni prigovor je neosnovan jer je tužilji priznat polovina čistog prihoda kao razlike prinosa i troškova. Revizija ne može osporavati utvrđeno činjenično stanje u ovom okviru.",
    keywords: ["dobit od poljoprivrede", "sporazumna deoba", "bračna tekovina", "zatezna kamata"],
    related_articles: ["član 171, 177–179. Porodičnog zakona", "član 214. Zakona o obligacionim odnosima"],
    headnote: "Potvrđena podela dobiti kao bračne tekovine po sporazumu; odbijen kompenzacioni prigovor.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3127/2022",
    legal_area: "family",
    legal_question:
      "Da li je ugovor o prodaji stana koji predstavlja bračnu tekovinu valjan ako je zaključen bez saglasnosti drugog supružnika?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženih i potvrdio ništavost kupoprodaje stana stečenog zajmom u braku bez saglasnosti supruge.",
    reasoning:
      "Stan stečen tokom bračne zajednice predstavlja zajedničku imovinu po članu 171. PZ. Raspolaganje takvom imovinom zahteva saglasnost oba supružnika; kupoprodaja bez saglasnosti tužilje (supruge) je ništava.",
    keywords: ["saglasnost supružnika", "kupoprodaja", "bračna tekovina", "ništavost"],
    related_articles: ["član 171, 177, 180. Porodičnog zakona"],
    headnote: "Potvrđena ništavost prodaje stana kao bračne tekovine bez saglasnosti drugog supružnika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 931/2008",
    legal_area: "family",
    legal_question:
      "Da li Porodični zakon nalaže isplatu novčane protivvrednosti suvlasničkog udela na vozilu koje je ostalo kod bivšeg supruga?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu; redovni sudovi su pravilno primenili pravo kada su utvrdili suvlasništvo na automobilu, ali odbili zahtev za isplatu protivvrednosti jer zakon ne predviđa takvu obavezu u tom okviru.",
    reasoning:
      "Deoba bračne tekovine u smislu člana 177. PZ podrazumeva utvrđivanje udela, a ne automatsku obavezu isplate novčane protivvrednosti suvlasničkog dela. Utvrđeno pravo svojine na vozilu ispunjava imovinsku zaštitu podnositeljke u granicama relevantnog materijalnog prava.",
    keywords: ["protivvrednost", "suvlasništvo", "automobil", "bračna tekovina", "Ustavni sud"],
    related_articles: ["član 177, 180. Porodičnog zakona", "član 32. Ustava RS"],
    headnote: "Odbijena žalba: nema obavezne isplate protivvrednosti udela na vozilu po ovom pravnom osnovu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 19125/2024",
    legal_area: "family",
    legal_question:
      "Da li sporazum o deobi zajedničke imovine supružnika može biti pobijana radnja na štetu poverilaca ako udeli odgovaraju doprinosu?",
    court_position:
      "Vrhovni sud je ukinuo nižestepene presude i vratio predmet na ponovno suđenje jer sudovi nisu utvrdili da li je imovina posebna ili bračna tekovina; sporazumna deoba koja odgovara doprinosu ne predstavlja radnju na štetu poverilaca u smislu člana 280. ZOO.",
    reasoning:
      "Pre člana 168. PZ posebna imovina uključuje stečevinu pre braka i stečevinu deobom zajedničke imovine, nasleđem, poklonom itd. Ako je predmet ugovora zajednička imovina stečena radom, sporazum o deobi koji utvrđuje udele u skladu sa doprinosom nije podložan pobijanju kao štetna radnja prema poveriocima u istom smislu kao raspolaganje posebnom imovinom.",
    keywords: ["pobijanje pravnih radnji", "sporazumna deoba", "posebna imovina", "član 280. ZOO"],
    related_articles: ["član 168. Porodičnog zakona", "član 280. Zakona o obligacionim odnosima", "član 416. stav 2. ZPP"],
    headnote: "Ukidanje: mora se utvrditi posebna vs. bračna imovina pre ocene pobijanja sporazuma o deobi.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3681/2023",
    legal_area: "family",
    legal_question:
      "Da li vanbračni drug ima pravo na polovinu nepokretnosti stečene tokom dugotrajne vanbračne zajednice?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom je tužilji priznat polovinski udeo u nepokretnosti, uzimajući u obzir finansijska ulaganja, lični rad na izgradnji i brigu o vanbračnom drugu.",
    reasoning:
      "Shodno primeni odredaba ZBPO o zajedničkoj imovini bračnih drugova (član 321 i dalje), analogno se ceni doprinos u vanbračnoj zajednici kada su ispunjeni uslovi za sticanje zajedničkih elemenata; upis i upravljanje zajedničkom imovinom prate ista načela srazmernosti doprinosa.",
    keywords: ["vanbračna zajednica", "doprinos", "ZBPO", "polovina"],
    related_articles: ["član 321–330. ZBPO"],
    headnote: "Potvrđeno: dugotrajna vanbračna zajednica može opravdati polovični udeo uz dokazane doprinose.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 19105/2022",
    legal_area: "family",
    legal_question:
      "Da li se udeli u bračnoj tekovini mogu različito odrediti za ekonomski samostalna prava (odvojeni objekti)?",
    court_position:
      "Vrhovni sud je odbio revizije tuženih i potvrdio presudu o različitim udelima tužilje u dva odvojena objekta, srazmerno doprinosu svakog supružnika.",
    reasoning:
      "Po članovima 171, 177. i 180. PZ predmet su zasebni stambeni objekti za koje se veći udeo u sticanju pojedinog prava može utvrditi ako je to pravo ekonomski samostalno i ako je učešće u sticanju dokazano, uključujući prihode iz posebne imovine.",
    keywords: ["bračna tekovina", "ekonomski samostalno pravo", "doprinos", "suvlasnički udeo"],
    related_articles: ["član 171. stav 1.", "član 177.", "član 180. stav 2–5. Porodičnog zakona"],
    headnote: "Potvrđeno: različiti udeli u dva objekta kada su ekonomski samostalni i doprinos različit.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1645/2011",
    legal_area: "family",
    legal_question:
      "Da li je povređeno pravo supruge kada je u izvršenju prodata bračna nepokretnost zbog duga drugog supruga uprkos njenom prigovoru trećeg lica?",
    court_position:
      "Ustavni sud je usvojio žalbu i utvrdio povredu prava na pravično suđenje jer su sudovi pogrešno odbacili prigovor trećeg lica (supruge) čija je bračna zajednička imovina prodata zbog duga drugog supruga.",
    reasoning:
      "Po članovima 171, 174, 176. i 180. PZ supružnici upravljaju zajedničkom imovinom zajednički i sporazumno, a upis na jednog supružnika ne isključuje zaštitu drugog bez valjanog sporazuma ili sudske deobe. Prigovor trećeg lica u izvršenju mora se meritorno ispitati.",
    keywords: ["izvršenje", "prigovor trećeg lica", "bračna imovina", "pravično suđenje"],
    related_articles: ["član 171, 174, 176, 180. Porodičnog zakona", "član 32. Ustava RS"],
    headnote: "Usvojena žalba: odbacivanje prigovora supruge na prodaju bračne imovine u izvršenju bilo nezakonito.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 7431/2014",
    legal_area: "administrative",
    legal_question:
      "Da li naslednica supruge bivšeg vlasnika ima aktivnu legitimaciju u postupku restitucije nacionalizovane imovine?",
    court_position:
      "Upravni sud je odbio tužbu: tužilja nije zakonski naslednik bivšeg vlasnika niti je dokazala pravo na restituciju; ranije je pravosnažno odbijen zahtev njene pravne prethodnice za priznanje bračne tekovine na nacionalizovanoj nepokretnosti.",
    reasoning:
      "Po Zakonu o vraćanju oduzete imovine pravo na povraćaj imaju propisani naslednici i lica u zakonom određenom krugu; supruga ranijeg vlasnika nije automatski nosilac istog prava kao naslednik po krvi. Organ je pravilno utvrdio isključivog vlasnika pre nacionalizacije i posledice nepokretanja sudskog spora o bračnoj tekovini.",
    keywords: ["restitucija", "aktivna legitimacija", "bračna tekovina", "nasledstvo"],
    related_articles: ["član 5. stav 1. tačka 1. Zakona o vraćanju oduzete imovine i obeštećenju"],
    headnote: "Odbijena tužba: naslednica supruge nije aktivno legitimisana za restituciju u ovom pravnom lancu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 17339/2022",
    legal_area: "family",
    legal_question:
      "Da li se isplata novčane vrednosti udela u nepokretnostima i vozilu reši u parnici ili u vanparničnom postupku, i da li udeo u društvenom kapitalu pripada bračnoj tekovini?",
    court_position:
      "Vrhovni sud je delimično usvojio reviziju tužilje: ukinuta je odluka o odbijanju zahteva za isplatu tržišne vrednosti udela u stanovima i vozilu radi postupanja po pravilima vanparničnog postupka; potvrđeno je odbijanje zahteva za udeo u imovini privrednog društva.",
    reasoning:
      "Način deobe suvlasničkog udela na nepokretnosti kada fizička deoba nije moguća uključuje vanparnični postupak (ZVP) i prodaju, a ne direktnu dosudu kupoprodajne cene u parnici u suprotnosti sa tim okvirom. Udeo u društvenom kapitalu zadržava pravnu kvalifikaciju po utvrđenim činjenicama nižestepenih sudova u ovom predmetu.",
    keywords: ["vanparnični postupak", "deoba nepokretnosti", "bračna tekovina", "društveni kapital"],
    related_articles: ["član 171, 177, 180. Porodičnog zakona", "Zakon o vanparničnom postupku"],
    headnote: "Delimično: isplata vrednosti udela u nepokretnostima i vozilu vraćena na postupanje po ZVP; odbijen udeo u društvu potvrđen.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 605/2009",
    legal_area: "family",
    legal_question:
      "Da li je ustavno prihvatljiva presuda koja obavezuje bivšu suprugu na isplatu naknade za ulaganja u zajedničku imovinu po članu 175. Porodičnog zakona?",
    court_position:
      "Ustavni sud je odbacio ustavnu žalbu: primena Porodičnog zakona nije bila proizvoljna, a žalba izražava nezadovoljstvo meritornim ishodom, što nije predmet ustavnosudskog nadzora u ovom obliku.",
    reasoning:
      "Po članu 175. PZ posle prestanka zajednice života u braku drugi supružnik može tražiti novčano potraživanje za uvećanje vrednosti zajedničke imovine srazmerno doprinosu, bez obaveze saglasnosti supružnika koji ne ulže. Ustavna žalba nije pravno sredstvo za ponovno meritorno ispitivanje redovnih sudova.",
    keywords: ["uvećanje vrednosti", "član 175. PZ", "ulaganja", "ustavna žalba"],
    related_articles: ["član 175. Porodičnog zakona", "član 32. Ustava RS"],
    headnote: "Odbačena žalba: isplata po članu 175. nije proizvoljno primenjena; žalba ne zamenjuje reviziju.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6299/2013",
    legal_area: "family",
    legal_question:
      "Da li presuda o bračnoj tekovini povređuje pravo na pravično suđenje ako ne razmatra ključne žalbene navode (npr. sticanje održajem)?",
    court_position:
      "Ustavni sud je usvojio žalbu, utvrdio povredu prava na pravično suđenje i poništio drugostepenu presudu Apelacionog suda zbog kontradiktornog i nedovoljnog obrazloženja bitnih žalbenih navoda.",
    reasoning:
      "Pravo na pravično suđenje zahteva da sud meritorno i razumljivo odgovori na ozbiljne žalbene argumente, uključujući one o načinu sticanja i doprinosu. Površna ili kontradiktorna motivacija u delu koji određuje udele u bračnoj tekovini predstavlja povredu člana 32. Ustava.",
    keywords: ["pravično suđenje", "obrazloženje presude", "bračna tekovina", "Ustavni sud"],
    related_articles: ["član 32. Ustava RS", "član 171, 177, 180. Porodičnog zakona"],
    headnote: "Usvojena žalba: drugostepeni sud mora razmotriti ključne navode, ne donositi kontradiktorno obrazloženje.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5400/2012",
    legal_area: "family",
    legal_question:
      "Da li je stan otkupljen u braku uvek bračna tekovina ako formalno brak traje?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu i prihvatio da bez zajednice života, rada i privređivanja nema sticanja zajedničke imovine, pa otkup stana u takvom odnosu ne daje pravo na polovinu supružniku.",
    reasoning:
      "Brak uključuje ekonomsku zajednicu; kada supružnici odvojeno stiču, troše i raspolažu imovinom bez saglasnosti i bez zajedničkog privređivanja, nema zajednice rada i privređivanja kao uslova za član 171. PZ.",
    keywords: ["zajednica života", "privređivanje", "bračna tekovina", "otkup stana"],
    related_articles: ["član 171. Porodičnog zakona"],
    headnote: "Odbijena žalba: otkup u braku bez zajednice rada i privređivanja ne stvara bračnu tekovinu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6367/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li neisplaćenost celokupne otkupnine do smrti supruge sprečava sticanje bračne tekovine na stanu otkupljenom u braku?",
    court_position:
      "Apelacioni sud je preinačio presudu: polovina stana stečenog ugovorom o otkupu u braku ulazi u zaostavštinu pokojne supruge; svojina se stiče zaključenjem ugovora, a nepotpuna isplata otkupnine sama po sebi ne isključuje režim bračne tekovine.",
    reasoning:
      "Primenom članova 171. i 180. PZ stan stečen radom u zajednici života predstavlja zajedničku imovinu sa pretpostavkom jednakih udela, osim ako nije dokazan veći doprinos ili posebna imovina po članu 168.",
    keywords: ["otkup stana", "zaostavština", "bračna tekovina", "smrt supružnika"],
    related_articles: ["član 171, 180. Porodičnog zakona"],
    headnote: "Preinačenje: stan otkupljen u braku može biti bračna tekovina uprkos delimično neplaćenom otkupu.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 12452/2021",
    legal_area: "family",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje ako sudovi ne ispitu savesnost stranaka pri sporazumu koji utiče na bračnu imovinu?",
    court_position:
      "Ustavni sud je poništio presudu Vrhovnog kasacionog suda zbog bitne povrede: savesnost pri zaključenju ugovora (ZOO) morala se razmotriti pre ocene ništavosti poklona koji se tiče imovinskih odnosa supružnika.",
    reasoning:
      "U imovinskim sporovima sa elementom obligacionog posla sud dužan je da ceni okolnosti zloupotrebe prava i savesnosti, ne samo formalnu stranu ZBPO/PZ.",
    keywords: ["savesnost", "poklon", "ništavost", "pravično suđenje"],
    related_articles: ["član 32. Ustava RS", "Zakon o obligacionim odnosima"],
    headnote: "Poništaj VKS: savesnost stranaka obavezna tema pre ništavosti ugovora o poklonu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1922/2021",
    legal_area: "family",
    legal_question:
      "Da li je poklon stana ništav bez saglasnosti supruga kada stan nije bračna već posebna imovina supruge?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost poklona: stan je posebna imovina tužene (otkup uz saglasnost majke kao nosioca stanarskog prava), pa raspolaganje nije ograničeno saglasnošću drugog bračnog druga.",
    reasoning:
      "Saglasnost drugog supružnika za raspolaganje važi za zajedničku imovinu; ako je predmet posebna imovina, nema primene ograničenja iz člana 174. PZ u istom smislu.",
    keywords: ["posebna imovina", "poklon", "saglasnost supružnika", "stanarsko pravo"],
    related_articles: ["član 168, 171, 174. Porodičnog zakona"],
    headnote: "Potvrđeno: poklon posebnog stana nije ništav zbog nedostatka saglasnosti supruga.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5920/2023",
    legal_area: "family",
    legal_question:
      "Da li presuda o bračnoj tekovini mora jasno odvojiti udele u nepokretnostima od novčanih potraživanja?",
    court_position:
      "Apelacioni sud je delimično potvrdio a delimično ukinuo presudu: potvrđen deo o pokretninama, ukinut deo o udelima u nepokretnostima i novčanim tražbinama zbog nejasnih i protivrečnih razloga i bitnih povreda postupka.",
    reasoning:
      "Procena doprinosa (npr. veštakom) mora se jasno povezati sa izrekom; mešanje osnova i protivrečna motivacija za različite predmete deobe zahteva ukidanje i ponavljanje u tom delu.",
    keywords: ["bračna tekovina", "bitne povrede postupka", "obrazloženje", "deoba"],
    related_articles: ["član 168, 171, 175–180. Porodičnog zakona", "član 374. ZPP"],
    headnote: "Delimično: ukinuto zbog nejasnih razloga za nepokretnosti i novčana potraživanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2735/2022",
    legal_area: "family",
    legal_question:
      "Da li tužena ima pravo na susvojstvo na stanu otkupljenom posle razvoda ako je pravo na otkup proisteklo iz stanarskog prava stečenog u braku?",
    court_position:
      "Apelacioni sud je potvrdio presudu: odbijen zahtev za iseljenje, utvrđeno pravo susvojstva tužene sa oko 44% na stanu čije je stanarsko pravo bilo stečeno tokom braka.",
    reasoning:
      "Stanarsko pravo stečeno u braku u zajedničkom domaćinstvu daje oboma elemente za naknadni otkup; primena starijih propisa o stanovanju i člana 171. PZ opravdava bračnu komponentu u vrednosti stana.",
    keywords: ["stanarsko pravo", "otkup posle razvoda", "susvojstvo", "iseljenje"],
    related_articles: ["član 171, 180. Porodičnog zakona", "Zakon o stanovanju"],
    headnote: "Potvrđeno: otkup posle razvoda može ostaviti bračni element u pravu na udeo.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3748/2020",
    legal_area: "family",
    legal_question:
      "Da li se pretpostavka jednakih udela u bračnoj tekovini može oboriti dokazima o znatno većem finansijskom doprinosu jednog supružnika?",
    court_position:
      "Vrhovni sud je odbio reviziju tužene i potvrdio udele od 59% za tužioca i 41% za tuženu, smatrajući da su nižestepeni sudovi pravilno primenili član 180. PZ i oborili pretpostavku jednakosti.",
    reasoning:
      "Veći udeo zavisi od prihoda, domaćinstva, staranja o deci i imovini i drugih okolnosti; posebna imovina ugrađena u sticanje uzima se u obzir pri konkretizaciji kriterijuma.",
    keywords: ["član 180. PZ", "doprinos", "pretpostavka jednakosti", "sudska deoba"],
    related_articles: ["član 168. stav 2.", "član 177, 180. Porodičnog zakona"],
    headnote: "Potvrđeno: 59/41 udeo kada je finansijski doprinos tužioca dokazano dominantan.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 19839/2024",
    legal_area: "family",
    legal_question:
      "Da li tuženi može osporiti polovinu stana kao bračnu tekovinu ako ne dokaže posebnu imovinu ili prestanak zajednice pre kupovine?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio suvlasnički udeo tužilje od jedne polovine, jer tuženi nije oborio pretpostavku jednakih udela iz člana 180. stav 2. PZ.",
    reasoning:
      "Teret dokazivanja većeg udela ili posebne imovine po članu 168. stav 2. PZ snosi onaj ko to tvrdi; bez dokaza o prestanku zajednice ili isključivo ličnim sredstvima kupoprodaja ostaje u režimu bračne tekovine.",
    keywords: ["teret dokazivanja", "jednaki udeli", "član 180. stav 2.", "član 231. ZPP"],
    related_articles: ["član 168. stav 2.", "član 180. stav 2–3.", "član 231. stav 1. ZPP"],
    headnote: "Potvrđena polovina: bez dokaza o posebnoj imovini ili prekidu zajednice važi pretpostavka jednakosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4130/2023",
    legal_area: "family",
    legal_question:
      "Kako sud treba procenjivati pretnje i uzajamno nasilje pri odluci o merama zaštite od nasilja u porodici?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju tužilje, preinačio nižestepene presude i izrekao mere zaštite, ocenivši da je u konkretnom slučaju bilo nasilja u porodici uprkos zaključku o izolovanom incidentu.",
    reasoning:
      "Kod uzajamnih pretnji ozbiljnog sadržaja sud mora sveobuhvatno analizirati ponašanje partnera, ranije nasilje, oružje, zajedničku decu i kontekst razvoda i podele imovine, a ne redukovati slučaj na jedan incident.",
    keywords: ["nasilje u porodici", "pretnje", "mere zaštite", "revizija"],
    related_articles: ["Zakon o sprečavanju nasilja u porodici", "član 407. ZPP"],
    headnote: "Usvojena revizija: pretnje i kontekst zahtevaju širu procenu od izolovanog incidenta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5789/2015",
    legal_area: "family",
    legal_question:
      "Da li postupak deobe imovine koji traje osam godina povređuje pravo na suđenje u razumnom roku i pravično suđenje?",
    court_position:
      "Ustavni sud je usvojio žalbu i utvrdio povredu prava na suđenje u razumnom roku i pravično suđenje zbog trajanja postupka i proizvoljnih, kontradiktornih razloga u presudama o deobi.",
    reasoning:
      "Izuzetno dug parnični postupak uz nedoslednu primenu prava na deobu predstavlja nesrazmeran teret za stranke i zahteva ustavnopravnu zaštitu.",
    keywords: ["razuman rok", "pravično suđenje", "deoba", "Ustavni sud"],
    related_articles: ["član 32. Ustava RS", "član 168–180. Porodičnog zakona"],
    headnote: "Usvojena žalba: osam godina postupka i kontradiktorni razlozi povređuju ustavna prava.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 785/2023",
    legal_area: "family",
    legal_question:
      "Da li vanbračni partner može tražiti udeo u nepokretnosti izgrađenoj pre početka vanbračne zajednice?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu u relevantnom delu i odbio tužbeni zahtev: objekat je izgrađen pre vanbračne zajednice i predstavlja posebnu imovinu tuženog, pa nema osnova za bračnu ili vanbračnu tekovinu u smislu člana 191. PZ.",
    reasoning:
      "Shodna primena odredaba o posebnoj imovini (član 160) i vanbračnoj zajednici (član 191) isključuje pravo na polovinu ako objekat nije stečen radom u trajanju te zajednice.",
    keywords: ["vanbračna zajednica", "posebna imovina", "član 191. PZ"],
    related_articles: ["član 160, 170, 171, 191. Porodičnog zakona"],
    headnote: "Odbijen zahtev: nepokretnost pre zajednice ostaje posebna imovina drugog partnera.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 437/2025",
    legal_area: "family",
    legal_question:
      "Da li su poslovni objekti izgrađeni od nasleđa supruge bračna tekovina ako drugi supružnik ne dokaže radni doprinos?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbenog zahteva: objekti su posebna imovina tužene stečena nasleđem po članu 168. stav 2. PZ, a tužilac nije dokazao doprinos u izgradnji ili uvećanju vrednosti.",
    reasoning:
      "Zajednička imovina zahteva sticanje radom u braku (član 171); nasledstvo i jasna posebna sredstva ostaju u posebnoj imovini dok druga strana ne dokaže suprotno.",
    keywords: ["nasleđe", "posebna imovina", "doprinos", "član 168. stav 2."],
    related_articles: ["član 168. stav 2.", "član 171, 180. Porodičnog zakona"],
    headnote: "Potvrđeno: izgradnja iz nasleđa jednog supružnika bez dokazanog doprinosa drugog nije bračna tekovina.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5164/2021",
    legal_area: "family",
    legal_question:
      "Da li supružnik odgovara solidarno za poreske dugove iz samostalne delatnosti drugog supružnika i za sve komunalne račune nakon razvoda?",
    court_position:
      "Apelacioni sud je potvrdio da supružnik ne odgovara za poreske dugove iz samostalne delatnosti drugog; delimično je ukinuo odluku o komunalnim dugovima i iseljenju zbog bitnih povreda i nedovoljnog utvrđivanja koji deo troškova pada na zajednički život.",
    reasoning:
      "Troškovi redovnog korišćenja stana iz zajedničkog života jesu zajednička obaveza; troškovi nastali posle razvoda ili porez na imovinu zahtevaju posebnu dokaznu podlogu i ne mogu se automatski solidarno teretiti.",
    keywords: ["solidarna odgovornost", "komunalije", "porezi", "bračna zajednica"],
    related_articles: ["član 187. Porodičnog zakona", "član 231. ZPP"],
    headnote: "Potvrđeno odvojeno odgovornost za porez iz delatnosti; ukinuto za komunalije bez preciznog dokaza.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1626/2011",
    legal_area: "family",
    legal_question:
      "Da li je proizvoljna odluka koja meša bračnu i vanbračnu zajednicu i daje kontradiktorne razloge o sastavu zajedničke imovine?",
    court_position:
      "Ustavni sud je usvojio žalbu, poništio presudu Apelacionog suda i vratio predmet zbog proizvoljne primene prava i nedostatka jasnog obrazloženja o imovini stečenoj u braku i vanbračnoj zajednici.",
    reasoning:
      "Članovi 168–171, 191. PZ i prelazne odredbe moraju se dosledno primeniti; sud ne sme odbiti tužbu na osnovu pogrešne pravne kvalifikacije mešavine izvora sticanja.",
    keywords: ["vanbračna zajednica", "bračna tekovina", "pravično suđenje", "Ustavni sud"],
    related_articles: ["član 32. Ustava RS", "član 168–171, 191. Porodičnog zakona"],
    headnote: "Usvojena žalba: mešavina bračnog i vanbračnog sticanja zahteva jasnu motivaciju, ne proizvoljnost.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 10415/2022",
    legal_area: "family",
    legal_question:
      "Da li tužilac može tražiti veći od polovine zajedničke imovine ako je stan od majke tužene posebna imovina?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio da nije oborio pretpostavku jednakih udela; stan nasleđen od majke tužene kvalifikuje se kao njena posebna imovina po članu 168. stav 2. PZ.",
    reasoning:
      "Posebna imovina uključuje i stečevinu nasleđem tokom braka; za veći udeo u preostaloj zajedničkoj masi važe kriterijumi člana 180. stav 3–5.",
    keywords: ["posebna imovina", "nasleđe", "jednaki udeli", "član 180."],
    related_articles: ["član 168. stav 2.", "član 171, 180. Porodičnog zakona"],
    headnote: "Odbijena revizija: nasleđeni stan majke kao posebna imovina; pretpostavka jednakosti u ostalom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1352/2019",
    legal_area: "family",
    legal_question:
      "Da li upis suvlasništva ½ na oba supružnika predstavlja izvršenu deobu koja sprečava kasnije traženje većeg udela?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca: upis oba supružnika kao suvlasnika na opredeljenim polovinama smatra se deobom u smislu zakona, a tužilac nije dokazao veći doprinos; predlog za veštaka pogrešne struke na žalbi je pravilno odbijen.",
    reasoning:
      "Kada su udeli već opređeljeni upisom, teret dokazivanja većeg udela u sporu o podeli ostaje na stranci koja to tvrdi, uz pravilnu primenu člana 180. i 231. ZPP.",
    keywords: ["upis suvlasništva", "deoba", "veštak", "teret dokazivanja"],
    related_articles: ["član 176, 177, 180. Porodičnog zakona", "član 396. ZPP"],
    headnote: "Potvrđeno: upis ½/½ znači izvršenu deobu; veći udeo traži konkretne dokaze i pravilnu veštačku struku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1603/2012",
    legal_area: "family",
    legal_question:
      "Da li postojanje hipoteke na zajedničkoj nepokretnosti isključuje tužbu za utvrđenje udela u bračnoj tekovini?",
    court_position:
      "Ustavni sud je usvojio žalbu i poništio presudu Apelacionog suda: hipoteka sama po sebi ne sprečava meritorno odlučivanje o suvlasničkom udelu; odbijanje tužbe na tom osnovu bilo je proizvoljno.",
    reasoning:
      "Pravo na deobu i utvrđivanje udela (članovi 177–180. PZ) mora se ostvariti nezavisno od tereta na imovini, uz naknadno rešavanje odnosa prema poveriocima.",
    keywords: ["hipoteka", "bračna tekovina", "utvrđenje udela", "pravično suđenje"],
    related_articles: ["član 174, 176, 177, 180. Porodičnog zakona", "član 32. Ustava RS"],
    headnote: "Usvojena žalba: hipoteka ne gasi aktivnu legitimaciju za utvrđivanje udela.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1271/2006",
    legal_area: "family",
    legal_question:
      "Da li sud mora utvrditi konkretan udeo supruge u zajedničkoj imovini i ne odbacivati deo tužbe bez meritornog ispitivanja?",
    court_position:
      "Vrhovni sud je ukinuo nižestepene presude zbog bitnih povreda postupka i pogrešne primene prava: nije utvrđen udeo tužilje u sticanju niti su razmotreni zahtevi za izdvajanje ličnih stvari i naknadu za plaćanje tuženih obaveza.",
    reasoning:
      "Prema ZBPO/PZ sud dužan je da u sudskoj deobi primeni pretpostavku jednakosti i kriterijume doprinosa (član 328. ZBPO analogno) i da ne odbacuje tužbeni deo bez potpunog činjeničnog utvrđenja.",
    keywords: ["sudska deoba", "udio", "bitne povrede postupka", "ZBPO"],
    related_articles: ["član 180. Porodičnog zakona", "član 328. ZBPO"],
    headnote: "Ukidanje: obavezno utvrđivanje udela i meritorno odlučivanje o svim tužbenim zahtevima.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 189/2023",
    legal_area: "family",
    legal_question:
      "Da li je pravilno utvrđen osnov za razvod braka kada je suprug preminuo a sporazumni razvod navodi godinama odvojen život?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu o postojanju osnova za razvod: činjenično stanje o zajednici života i motivima predloga nije bilo potpuno i nekontradiktorno utvrđeno.",
    reasoning:
      "Sud mora kritički oceniti iskaze o prekidu zajednice i alkoholizmu i uskladiti ih sa sporazumnim izjavama stranaka o dužini odvojenog života.",
    keywords: ["razvod braka", "zajednica života", "prethodna smrt supružnika"],
    related_articles: ["Porodični zakon", "član 8. ZPP"],
    headnote: "Ukidanje: osnov za razvod zahteva uverljivo činjenično stanje, ne paušalne iskaze.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 145/2021",
    legal_area: "family",
    legal_question:
      "Da li izjava u sporazumnom razvodu da nema zajedničke imovine sprečava kasniju tužbu za utvrđenje bračne tekovine na poslovnom prostoru?",
    court_position:
      "Apelacioni sud je potvrdio presudu: prigovor presuđene stvari odbačen; izjava da nema zajedničke imovine u sporazumnom razvodu nije valjan sporazum o deobi u smislu zakona.",
    reasoning:
      "Poslovni prostor stečen u braku predstavlja bračnu tekovinu; formalna konstatacija bez identifikacije predmeta ne isključuje naknadno utvrđivanje prava.",
    keywords: ["sporazumni razvod", "presuđena stvar", "bračna tekovina", "poslovni prostor"],
    related_articles: ["član 171, 177, 179. Porodičnog zakona"],
    headnote: "Potvrđeno: nema zajedničke imovine u razvodu ne zamenjuje sporazum o deobi identifikovanih stvari.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 6808/2024",
    legal_area: "family",
    legal_question:
      "Kako se primenjuju član 195. PZ (porodična zajednica) i član 180. stav 5. pri utvrđivanju udela u više objekata?",
    court_position:
      "Vrhovni sud je ukinuo drugostepenu presudu i vratio predmet jer je sud pogrešno primenio pravo o pripadnosti pratećih objekata glavnoj stvari i dodelio različite udele bez jasnog zakonskog osnova.",
    reasoning:
      "Za porodičnu zajednicu treba utvrditi sastav zajednice, trajanje, imovinsku masu i doprinos svakog člana; veći udeo po stavu 5. može se odnositi samo na ekonomski samostalna prava.",
    keywords: ["porodična zajednica", "član 195. PZ", "doprinos", "prateći objekti"],
    related_articles: ["član 171, 180. stav 3–5. Porodičnog zakona", "član 195. Porodičnog zakona"],
    headnote: "Ukidanje: porodična zajednica i ekonomski samostalna prava zahtevaju posebno činjenično utvrđenje.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3984/2019",
    legal_area: "family",
    legal_question:
      "Da li su prihodi od zarade jedini kriterijum za veći udeo u bračnoj tekovini?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio jednake udele; tuženi nije dokazao veći doprinos, a sud je pravilno cenio brigu o deci, domaćinstvo i podršku tokom studija i bolesti.",
    reasoning:
      "Član 180. stav 3. PZ obuhvata sve oblike rada i okolnosti; zarada je samo jedan od kriterijuma uz domaćinstvo i staranje o deci.",
    keywords: ["doprinos", "domaćinstvo", "deca", "jednaki udeli"],
    related_articles: ["član 180. stav 2–3. Porodičnog zakona", "član 231. ZPP"],
    headnote: "Potvrđena polovina: doprinos kroz domaćinstvo i brigu jednako važan kao zarada.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4325/2021",
    legal_area: "family",
    legal_question:
      "Kako razlikovati posebnu od bračne imovine kod automobila i stana kada je jedan supružnik podigao kredit?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu: jedan automobil posebna imovina tuženog, drugi zajednički sa jednakim udelima; udeo u stanu korigovan uzimajući u obzir tužiljinu posebnu imovinu uloženu u kupovinu.",
    reasoning:
      "Primena članova 168. stav 2. i 180. PZ zahteva procenu namere sticanja, izvora sredstava i stvarnog angažmana pri kreditu i kupovini.",
    keywords: ["automobil", "stan", "kredit", "posebna imovina"],
    related_articles: ["član 168. stav 2.", "član 180. Porodičnog zakona"],
    headnote: "Preinačenje: razdvajanje posebnih i zajedničkih stvari i korekcija udela zbog ličnih ulaganja.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4007/2022",
    legal_area: "family",
    legal_question:
      "Da li se usmeni poklon novca između supružnika može raskinuti po članu 190. PZ ako brak prestane razvodom?",
    court_position:
      "Apelacioni sud je preinačio presudu i usvojio tužbeni zahtev: usmeni poklon velike vrednosti u odnosu na zajedničku imovinu podleže vraćanju kada brak prestane razvodom, jer prvostepeni sud pogrešno primenio član 190. PZ.",
    reasoning:
      "Nesrazmerno veliki pokloni u odnosu na imovinsku masu zajednice mogu se vratiti da ne bi došlo do očigledne nepravde, s obzirom na svrhu zakonske zaštite.",
    keywords: ["poklon", "član 190. PZ", "razvod", "vraćanje"],
    related_articles: ["član 190. Porodičnog zakona"],
    headnote: "Preinačenje: uslovno vraćanje velikog poklona novca posle razvoda po članu 190.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 24826/2023",
    legal_area: "family",
    legal_question:
      "Da li stan kupljen u braku novcem ostvarenim u vanbračnoj zajednici predstavlja bračnu tekovinu i kako se ocenjuje teret dokazivanja?",
    court_position:
      "Vrhovni sud je delimično usvojio reviziju tuženog: potvrđen manji udeo tužilje u stanu, ali ukinuta odluka o većem udelu zbog pogrešne primene pravila o teretu dokazivanja i osporavanju činjenica o vanbračnoj zajednici.",
    reasoning:
      "Kada su stranke živele u vanbračnoj zajednici pre braka, prihodi iz tog perioda mogu ući u osnovu kupovine stana u braku; revident ne može u reviziji zameniti činjenične zaključke nižestepenih sudova bez dozvoljenog osnova.",
    keywords: ["vanbračna zajednica", "bračna tekovina", "teret dokazivanja", "član 180."],
    related_articles: ["član 171, 180. Porodičnog zakona", "član 407. stav 2. ZPP"],
    headnote: "Delimično: vanbračna zajednica i izvor sredstava relevantni; ukinuto zbog greške u dokaznom pravilu.",
    outcome: "partially",
  },
]