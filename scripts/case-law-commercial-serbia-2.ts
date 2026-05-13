// scripts/case-law-commercial-serbia-2.ts
// Serbian commercial / insolvency / creditor-protection case law — all 3 batches (complete).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_COMMERCIAL_SERBIA_2: CaseLawInput[] = [
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1735/2023",
    legal_area: "commercial",
    legal_question:
      "Da li su kupoprodajni ugovori stečajnog dužnika punovažni ako je tužilac propustio rok za pobijanje pravnih radnji u stečaju i tražio utvrđenje ništavosti umesto tužbe za pobijanje?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio punovažnost spornih kupoprodajnih ugovora, smatrajući da je tužilac propustio rok za pobijanje pravnih radnji u stečajnom postupku i da je odredba ugovora o zajmu o prenosu svojine ništava.",
    reasoning:
      "Pobijanje pravnih radnji stečajnog dužnika uređeno je Glavom VIII Zakona o stečaju; tužba se podnosi protiv lica sa kojim je pravni posao zaključen i protiv stečajnog dužnika (čl. 129 st. 2), a dejstvo pobijanja je vraćanje imovinske koristi u stečajnu masu (čl. 130). Tužilac nije podneo takvu tužbu, već je neosnovano tražio utvrđenje ništavosti i upis vlasništva u korist preminulog lica koje ne može biti nosilac prava. Brojne druge radnje tužioca (prijava potraživanja, izlučenje, krivična prijava, izvršenje) ne dovode u sumnju pravilnost pobijane presude.",
    keywords: [
      "revizija",
      "stečaj",
      "pobijanje pravnih radnji",
      "kupoprodaja",
      "ništavost",
      "Zakon o stečaju",
    ],
    related_articles: ["čl. 119–130 Zakona o stečaju", "čl. 129 st. 2 ZS"],
    headnote:
      "Utvrđenje ništavosti i drugi zahtevi ne zamenjuju tužbu za pobijanje u stečaju; propust roka i pogrešan pravni put dovode do odbijanja revizije.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4725/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li presuda kojom je utvrđeno da kupoprodajni ugovor o nepokretnosti nema dejstva prema stečajnoj masi povređuje pravo na pravično suđenje?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu kao neosnovanu i utvrdio da odluka nije proizvoljna, jer je zasnovana na ustavnopravno prihvatljivoj primeni materijalnog prava.",
    reasoning:
      "Prema ranijem Zakonu o prinudnom poravnanju, stečaju i likvidaciji predviđeno je prebijanje potraživanja, pravo poverilaca i stečajnog upravnika na pobijanje pravnih radnji u poslednjoj godini pre otvaranja stečaja, uključujući propuštanje radnji, uz uslove oštećenja ili pogodovanja poverilaca i znanja saugovarača o nepovoljnom stanju dužnika. Ustavni sud nije ušao u meritornu kontrolu kao instancioni sud, već je ocenio da primena prava nije arbitrarna.",
    keywords: [
      "ustavna žalba",
      "pravično suđenje",
      "stečaj",
      "pobijanje",
      "kupoprodaja nepokretnosti",
    ],
    related_articles: ["čl. 32 st. 1 Ustava RS", "ZPPPSL (84/89, 37/93, 28/96)"],
    headnote:
      "Odbijanje ustavne žalbe kada redovni sud primenjuje stečajno pravo na prihvatljiv način i ne postoji proizvoljnost.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1069/2019",
    legal_area: "commercial",
    legal_question:
      "Da li se mogu pobiti ugovori o prodaji vozila zaključeni nakon podnošenja predloga za stečaj ako je saugovarač znao ili morao znati za nesposobnost plaćanja dužnika?",
    court_position:
      "Privredni apelacioni sud je potvrdio presudu kojom su poništeni ugovori o prodaji vozila, utvrđujući da su ispunjeni uslovi za pobijanje radnji preduzetih posle predloga za stečaj.",
    reasoning:
      "Prema čl. 119 u vezi sa čl. 122 Zakona o stečaju, pravni poslovi posle otvaranja stečaja ili u okviru propisanih rokova mogu se pobijati ako narušavaju ravnomerno namirenje ili pogoduju poveriocu koji je znao za stanje dužnika. Tužilac je tražio pobijanje i vraćanje pokretnih stvari odnosno isplatu vrednosti, što je nesporno utvrđeno. Nisu učinjene bitne povrede postupka; o bitnim činjenicama dati su jasni razlozi.",
    keywords: ["pobijanje", "stečaj", "ugovor o kupoprodaji", "nesolventnost", "saugovarač"],
    related_articles: ["čl. 119", "čl. 122", "čl. 119–130 ZS"],
    headnote:
      "Ugovori zaključeni posle predloga za stečaj mogu se pobiti kada je saugovarač bio sauvestan u pogledu nesposobnosti plaćanja dužnika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 1035/2024",
    legal_area: "commercial",
    legal_question:
      "Da li su ugovori o zameni ispunjenja, poklonu i odluka o povećanju kapitala ništavi ako proizlaze iz prethodno pobijenog prenosa potraživanja?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio utvrđenje ništavosti naknadnih ugovora i odluka jer su pravno povezani sa pobijanim prenosom potraživanja koji nema dejstva prema stečajnoj masi.",
    reasoning:
      "Strane su znale da se vodi parnica o pobijanju pravnih radnji dužnika, a naknadni ugovori i reorganizacioni akti ostvaruju namirenje u suprotnosti sa zaštitom stečajne mase. Po čl. 130 Zakona o stečaju uspešnim pobijanjem prestaje dejstvo prema stečajnoj masi i nastaje obaveza vraćanja imovinske koristi.",
    keywords: ["revizija", "stečaj", "pobijanje", "ništavost", "lanac pravnih poslova"],
    related_articles: ["čl. 130 ZS"],
    headnote:
      "Pravni poslovi zavisni od pobijanog prenosa potraživanja mogu biti ništavi ili bez dejstva prema stečajnoj masi uz znanje strana o sporu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6676/2016",
    legal_area: "commercial",
    legal_question:
      "Da li se kompenzacija sprovedena pre otvaranja stečaja može pobiti ako nije narušeno ravnomerno namirenje poverilaca?",
    court_position:
      "Privredni apelacioni sud je potvrdio prvostepenu presudu kojom su odbijeni zahtev za naplatu i pobijanje kompenzacije, jer nisu ispunjeni uslovi iz čl. 119 ZS.",
    reasoning:
      "Stečajni upravnik je znao za kompenzaciju posle otvaranja stečaja; ako je nije prihvatio, morao je blagovremeno obavestiti poverioca radi prigovora prebijanja u roku iz rešenja o otvaranju. Podneta je samo tužba za naplatu. Pobijanje ima smisla ako treba vratiti imovinsku korist u masu (čl. 130); ovde bi primena norme bila besmislena jer bi tužen kao poverilac mogao ostvariti prebijanje prijavom i izjavom da upravnik nije onemogućio rok. Osnov pobijanja nije ostvaren.",
    keywords: ["kompenzacija", "stečaj", "pobijanje", "prebijanje", "stečajni upravnik"],
    related_articles: ["čl. 119", "čl. 130 ZS", "čl. 336 ZOO"],
    headnote:
      "Bez narušavanja ravnomernog namirenja nema pobijanja kompenzacije; pasivnost upravnika ne opravdava kasno pobijanje umesto instituta prebijanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pvž 511/2017",
    legal_area: "commercial",
    legal_question:
      "Da li se posle prebijanja uzajamnih potraživanja može menjati konačna lista utvrđenih potraživanja kada je poverilac dokazao potraživanje u parnici?",
    court_position:
      "Privredni apelacioni sud je potvrdio rešenje kojim se menja konačna lista posle prebijanja, unoseći preostali iznos potraživanja poverioca.",
    reasoning:
      "Prema čl. 336 ZOO prebijanje je dopušteno kada su potraživanja istovrsna i dospela. U stečaju važe i čl. 82–83 Zakona o stečaju o uslovima i zabrani prebijanja. Poverilac je blagovremeno prijavio potraživanje i podneo izjavu o prebijanju, pa je drugostepeni sud pravilno primenio pravo na izmenu liste.",
    keywords: ["prebijanje", "stečaj", "konačna lista", "potraživanje", "ZOO"],
    related_articles: ["čl. 336 ZOO", "čl. 82–83 ZS"],
    headnote:
      "Dokazivanje potraživanja u parnici i ispunjenost uslova prebijanja opravdavaju izmenu konačne liste stečajnih potraživanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 5818/2015",
    legal_area: "commercial",
    legal_question:
      "Da li se može pobijati presuda na osnovu priznanja i procesna radnja priznanja tužbenog zahteva u stečajnoj tužbi za pobijanje?",
    court_position:
      "Privredni apelacioni sud je delimično ukinuo prvostepenu presudu: potvrdio odbacivanje zahteva za upis u katastar, ali ukinuo deo o pobijanju presude na osnovu priznanja i odbacivanju tužbe za pobijanje same radnje priznanja.",
    reasoning:
      "Po čl. 119 st. 1 i 3 ZS mogu se pobijati i procesne radnje ako dovode do izvršne isprave koja šteti stečajnoj masi. Tužbom se traži oduzimanje pravnog dejstva priznanju tužbenog zahteva u postupku pred osnovnim sudom; za takav zahtev postoji pravni interes. Prvostepeni sud je bio dužan meritorno odlučiti o tom delu tužbe.",
    keywords: ["pobijanje", "priznanje", "procesna radnja", "stečaj", "izvršna isprava"],
    related_articles: ["čl. 119 st. 1 i 3 ZS"],
    headnote:
      "Priznanje tužbenog zahteva koje dovodi do izvršne isprave može biti predmet pobijanja u stečaju uz postojanje opštih uslova štete masi.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 33/2021",
    legal_area: "commercial",
    legal_question:
      "Da li je tužba za utvrđenje da su sudsko rešenje i naredba tužilaštva bez dejstva prema stečajnoj masi dozvoljena?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca kao neosnovanu, smatrajući tužbu nedozvoljenom jer se pravnosnažne sudske i tužilačke odluke ne pobijaju stečajnom tužbom.",
    reasoning:
      "Preduslovi za pobijanje u stečaju uključuju otvoren stečaj, nedovoljnost mase i punovažnost pravnog posla (čl. 119). Predmet mora biti pravni posao ili radnja dužnika, a ne same pravnosnažne sudske odluke kao takve u ovom obliku tužbe.",
    keywords: ["revizija", "stečaj", "pobijanje", "nedozvoljena tužba", "tužilaštvo"],
    related_articles: ["čl. 119 ZS"],
    headnote:
      "Stečajna tužba za pobijanje ne može zameniti parnični ili drugi zakoniti postupak osporavanja pravnosnažnih sudskih i tužilačkih akata.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 326/2017",
    legal_area: "commercial",
    legal_question:
      "Da li isplata dužnika u korist poverioca u vreme blokade računa i restrukturiranja predstavlja namerno oštećenje poverilaca u smislu čl. 123 ZS?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju i pobio ugovor o izmirenju duga, utvrđujući narušavanje ravnomernog namirenja i pogodovanje jednog poverioca.",
    reasoning:
      "Pre čl. 119 i 123 ZS pravni poslovi koji štete ravnomernom namirenju ili namerno štete poverioce mogu se pobiti ako saugovarač zna za nameru dužnika; znanje se pretpostavlja u propisanim slučajevima. Nižestepeni sudovi su pogrešno zanemarili da je plaćanje u konkretnim okolnostima dalo prednost jednom poveriocu u odnosu na ostale.",
    keywords: ["revizija", "namerno oštećenje", "stečaj", "blokada računa", "izmirenje"],
    related_articles: ["čl. 119", "čl. 123 ZS"],
    headnote:
      "Plaćanje u korist odabranog poverioca u periodu duboke likvidnosne krize može ispunjavati osnov namernog oštećenja iz Zakona o stečaju.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 97/2016",
    legal_area: "commercial",
    legal_question:
      "Da li se može uspešno pobijati propuštanje stečajnog dužnika da izjavi žalbu ako bi žalba bila neosnovana jer je drugostepeni sud potvrdio osporena rešenja?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio stav da nema osnova za pobijanje propuštanja žalbe, jer uslov uspeha propuštanja zahteva da bi preduzeta radnja bila uspešna.",
    reasoning:
      "Prvostepeni sud je primenom starijeg Zakona o stečajnom postupku (čl. 98–101) usvojio pobijanje propuštanja žalbe. Drugostepeni sud je pravilno zaključio da uslovi čl. 98–99 nisu ispunjeni za uobičajeno namirenje, jer bi žalba bila neuspešna s obzirom na potvrdu osporenih rešenja. Pobijanje propuštanja mora imati smisla u svetlu mogućeg uspeha pravnog leka.",
    keywords: ["revizija", "propuštanje žalbe", "stečaj", "pobijanje", "Zakon o stečajnom postupku"],
    related_articles: ["čl. 98–101 ZSP (stari)"],
    headnote:
      "Pobijanje propuštanja procesne radnje u stečaju zahteva da bi preduzeta radnja mogla promeniti pravni položaj u korist mase.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6610/2019",
    legal_area: "commercial",
    legal_question:
      "Da li se u stečajnoj tužbi za pobijanje mogu pobijati sudske odluke i akti javnog izvršitelja iz izvršnog postupka?",
    court_position:
      "Privredni apelacioni sud je potvrdio da je založna izjava bez dejstva prema stečajnoj masi, ali je odbio pobijanje sudskih akata i radnji javnog izvršitelja jer to nisu pravne radnje stečajnog dužnika.",
    reasoning:
      "U izvršnom postupku sud i javni izvršitelj deluju javnom ovlašćenju; njihovi akti nisu 'pravne radnje dužnika' u smislu čl. 119 ZS. Mogu se pobijati radnje samog izvršnog dužnika (predlozi, žalbe, propuštanja) pod uslovima zakona. Tužilac nije tražio pobijanje radnji stečajnog dužnika.",
    keywords: ["pobijanje", "izvršenje", "javni izvršitelj", "stečaj", "založna izjava"],
    related_articles: ["čl. 119 ZS"],
    headnote:
      "Stečajna tužba za pobijanje ne može direktno ciljati sudske i izvršiteljske akte; predmet su radnje dužnika u smislu ZS.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1287/2020",
    legal_area: "commercial",
    legal_question:
      "Da li su ispunjeni uslovi za privremenu meru zabrane raspolaganja nepokretnošću u tužbi za pobijanje pravne radnje namernog oštećenja poverilaca?",
    court_position:
      "Privredni apelacioni sud je preinačio prvostepeno rešenje i odbio predlog za privremenu meru, jer tužilac nije učinio verovatnim ni potraživanje za pobijanje ni opasnost od osujećenja namirenja.",
    reasoning:
      "Za meru po čl. 123 ZS potrebno je kumulativno utvrditi nameru oštećenja na strani dužnika i znanje saugovarača, uključujući pretpostavke iz st. 2–3. Poverilac ne mora dokazivati opasnost ako bi merom dužnik pretrpeo samo neznatnu štetu, ali ovde nije učinjena verovatnoća osnovnog potraživanja za pobijanje.",
    keywords: ["privremena mera", "stečaj", "čl. 123 ZS", "verovatnoća", "opasnost"],
    related_articles: ["čl. 123 ZS"],
    headnote:
      "U fazi privremene mere sud ne ulazi u punu meritornu ocenu pobijanja, ali mora postojati verovatnoća potraživanja i realne opasnosti po namirenje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6596/2019",
    legal_area: "commercial",
    legal_question:
      "Da li pravnosnažno odbijanje primarnog tužbenog zahteva (ništavost ugovora) sprečava odlučivanje o eventualnom zahtevu za dejstvo prema stečajnoj masi?",
    court_position:
      "Privredni apelacioni sud je ukinuo rešenje kojim je odbačen zahtev za odlučivanje o eventualnom tužbenom zahtevu, jer pravnosnažnost u primarnom delu ne stvara presuđenu stvar za eventualni zahtev.",
    reasoning:
      "Tužba za pobijanje u stečaju usmerena je na relativno dejstvo prema masi. I nakon utvrđenja da ugovor nije ništav, ostaje prostor za ocenu dejstva prema stečajnoj masi po ZS. Eventualni zahtev je pravilno formulisan i uslovi čl. 197 st. 2–3 ZPP za kumulaciju su ispunjeni; o eventualnom zahtevu odlučuje prvostepeni privredni sud nakon ispunjenja uslova.",
    keywords: ["eventualni tužbeni zahtev", "stečaj", "pobijanje", "pravnosnažnost", "ZPP"],
    related_articles: ["čl. 197 st. 2–3 ZPP", "Zakon o stečaju"],
    headnote:
      "Pravnosnažno odbijanje ništavosti ne isključuje automatski pobijanje u odnosu na stečajnu masu; eventualni zahtev zahteva posebnu odluku.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1353/2012",
    legal_area: "commercial",
    legal_question:
      "Da li poverilac može pobiti ugovor o zameni ako nije dokazao dospelo potraživanje za vraćanje onoga što je dužnik primio po zameni?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je odbijen zahtev za pobijanje ugovora o zameni nepokretnosti, jer tužioci nisu dokazali osnovno potraživanje prema dužniku u stečaju.",
    reasoning:
      "Zakon o stečaju uređuje sve potraživanja i pobijanje na propisan način uz učešće stečajnog upravnika. Pobijanje zahteva dokaz postojanja potraživanja koje se štiti; bez dokaza o dospelom potraživanju za restituciju predmeta zamene tužba je neosnovana.",
    keywords: ["pobijanje", "ugovor o zameni", "stečaj", "dokaz", "potraživanje"],
    related_articles: ["Zakon o stečaju", "ZOO"],
    headnote:
      "U sporu za pobijanje ugovora dužnika u stečaju neophodan je dokaz poverilačkog potraživanja koje se pokušava namiriti pobijanjem.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 18208/2022",
    legal_area: "commercial",
    legal_question:
      "Da li je ugovor o otkupu stana u hotelu ništav mimo instituta i rokova pobijanja iz Zakona o stečajnom postupku?",
    court_position:
      "Vrhovni kasacioni sud je preinačio drugostepenu presudu i potvrdio valjanost ugovora o otkupu, naglašavajući da se pobijanje radnji stečajnog dužnika ne može vršiti van zakonskih rokova i postupka do glavne deobe.",
    reasoning:
      "Dejstvo pobijanja po čl. 108 starog ZSP vraća korist u masu i ograničava se na propisani postupak. Drugostepeni sud je pogrešno utvrdio ništavost mimo stečajnog instituta pobijanja i prekluzivnih rokova.",
    keywords: ["revizija", "stečaj", "otkup stana", "pobijanje", "Zakon o stečajnom postupku"],
    related_articles: ["čl. 108 ZSP (stari)"],
    headnote:
      "Ništavost ugovora stečajnog dužnika ne može se izvoditi izvan okvira i rokova pobijanja iz stečajnog zakona.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1830/2020",
    legal_area: "commercial",
    legal_question:
      "Da li poverilac može tražiti utvrđenje potraživanja u stečaju pre nego što vrati imovinsku korist stečenu po pravnosnažno pobijenom sudskom poravnanju?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje utvrđenja potraživanja, jer poverilac mora prvo vratiti stečenu nepokretnost odnosno novčanu protivvrednost u stečajnu masu.",
    reasoning:
      "Po čl. 130 ZS posle uspešnog pobijanja protivnik vraća korist u masu; tek tada može podneti naknadnu prijavu kao poverilac. Tužilac nije dokazao vraćanje predmeta ni isplatu ekvivalenta; teret dokazivanja pada na njega (čl. 228 u vezi sa čl. 231 ZPP).",
    keywords: ["stečaj", "utvrđenje potraživanja", "pobijanje", "sudsko poravnanje", "restitucija"],
    related_articles: ["čl. 130 ZS", "čl. 228–231 ZPP"],
    headnote:
      "Pobijanje poravnanja uslojava ostvarivanje novog potraživanja vraćanjem imovinske koristi u stečajnu masu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 578/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je stečajni upravnik postupio nepravilno kada je, uz saglasnost odbora poverilaca, odlučio da ne nastavi prekinuti parnični postupak radi zaštite stečajne mase?",
    court_position:
      "Upravni sud je odbio tužbu protiv rešenja Agencije za licenciranje stečajnih upravnika i potvrdio zakonitost odluke upravnika.",
    reasoning:
      "Radnje od izuzetnog značaja zahtevaju poseban postupak saglasnosti (čl. 115 ZS i dalje). Pobijanje pravnih radnji podnošenjem tužbe nije 'radnja od izuzetnog značaja' u smislu obaveštenja. Ocena da nastavak parnice nije u interesu mase uz saglasnost odbora poverilaca nije arbitrarna.",
    keywords: ["stečajni upravnik", "Agencija", "Upravni sud", "odbor poverilaca", "parnica"],
    related_articles: ["čl. 115 ZS", "Zakon o stečaju"],
    headnote:
      "Upravnosudska kontrola odluke o nastavku parnice u ime mase zasniva se na zakonitosti i dokazima, ne na meritornoj zameni poslovne procene.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 312/2016",
    legal_area: "commercial",
    legal_question:
      "Da li sporazumi o regulisanju dužničko-poverilačkih odnosa koji daju prednost jednom poveriocu u restrukturiranju predstavljaju namerno oštećenje ostale stečajne mase?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju prvotuženog i potvrdio pobijanje sporazuma kao radnji bez dejstva prema stečajnoj masi.",
    reasoning:
      "Utvrđeno je da su ispunjeni preduslovi iz čl. 119 ZS (otvoren stečaj, nedovoljnost mase, punovažnost posla) i opšti uslov narušavanja ravnomernog namirenja ili štete poverilaca. Isplate u korist jednog poverioca iz sredstava namenjenih drugim obavezama u programu restrukturiranja štete su ostalim poveriocima.",
    keywords: ["revizija", "namerno oštećenje", "restrukturiranje", "stečaj", "sporazum"],
    related_articles: ["čl. 119", "čl. 123 ZS"],
    headnote:
      "Selektivno namirenje poverioca van usvojenog programa restrukturiranja može biti pobijano kao štetno po stečajnu masu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 786/2023",
    legal_area: "commercial",
    legal_question:
      "Da li se tužbom za pobijanje pravnih radnji stečajnog dužnika mogu pobijati direktno odluke javnog izvršitelja donete u izvršenju?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da su predmet pobijanja radnje koje prethode izvršenju, a ne same izvršiteljske odluke.",
    reasoning:
      "Čl. 119 ZS definiše opšte uslove pobijanja radnji dužnika koje narušavaju namirenje. Odluke javnog izvršitelja nisu pravne radnje dužnika; mogu se pobijati izvršna sredstva kroz radnje dužnika ili osnovne isprave pod uslovima st. 2–3 čl. 119.",
    keywords: ["revizija", "javni izvršitelj", "pobijanje", "stečaj", "izvršenje"],
    related_articles: ["čl. 119 ZS"],
    headnote:
      "Predmet stečajnog pobijanja nisu izvršiteljske odluke, već pravne ili procesne radnje dužnika koje dovode do izvršne isprave.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 409/2019",
    legal_area: "commercial",
    legal_question:
      "Da li poverilac može parnično tražiti utvrđenje prava na prebijanje potraživanja kada je potraživanje priznato u stečaju ali osporeno prebijanje?",
    court_position:
      "Vrhovni kasacioni sud je potvrdio odbacivanje tužbe kao nedozvoljene; prebijanje se ostvaruje u stečajnom postupku prijavom i izjavom, a osporavanje kroz mehanizme ZS.",
    reasoning:
      "Po čl. 83 ZS prebijanje je nedopušteno u propisanim slučajevima; u suprotnom poverilac gubi pravo ako ne postupi blagovremeno. Uspešno prebijanje zahteva prijavu potraživanja, izjavu o prebijanju i po potrebi parnicu samo za osporeno potraživanje u okviru čl. 117 ZS, a ne posebnu tužbu za 'utvrđenje prava na prebijanje'.",
    keywords: ["prebijanje", "stečaj", "nedozvoljena tužba", "čl. 83 ZS"],
    related_articles: ["čl. 82–83 ZS", "čl. 117 ZS"],
    headnote:
      "Pravo na prebijanje u stečaju ne dokazuje se posebnom utvrđivačkom tužbom van instituta prijave i osporavanja u stečaju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 230/2019",
    legal_area: "commercial",
    legal_question:
      "Da li izostanak sa ročišta koji dovodi do povlačenja tužbe može predstavljati pravnu radnju bez naknade koju treba pobiti u stečaju?",
    court_position:
      "Privredni apelacioni sud je ukinuo presudu u delu odbijanja pobijanja, smatrajući da izostanak može biti radnja bez naknade ako je protivna strana stekla imovinsku korist, ali da prvostepeni sud nije izveo dokaze o koristi.",
    reasoning:
      "Po čl. 124 st. 2 ZS izostanak sa ročišta može biti podoban za pobijanje ako saugovarač stekne korist. Prvostepeni sud nije dokazao sticanje koristi tuženom. Ukinuće se proteže i na eventualni zahtev za isplatu koji zavisi od ishoda pobijanja.",
    keywords: ["pobijanje", "izostanak sa ročišta", "povlačenje tužbe", "stečaj", "čl. 124 ZS"],
    related_articles: ["čl. 124 st. 2 ZS"],
    headnote:
      "Procesno ponašanje stečajnog dužnika može biti predmet pobijanja samo uz dokaz imovinske koristi protivnika pobijanja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6153/2016",
    legal_area: "commercial",
    legal_question:
      "Da li se kompenzacija pre stečaja može pobiti ako veštak zaključi da ne menja procenat namirenja poverilaca?",
    court_position:
      "Privredni apelacioni sud je preinačio presudu i odbio tužbu za pobijanje kompenzacije, jer nema narušavanja ravnomernog namirenja niti štete poverilaca.",
    reasoning:
      "Prvi uslov pobijanja po čl. 119 ZS jeste šteta po ravnomerno namirenje. Veštak je utvrdio da kompenzacija ne utiče na procenat namirenja. Hipotetički uspeh pobijanja bi tuženom omogućio veću prijavu i smanjio namirenje ostalih, što je paradoks u odnosu na svrhu instituta.",
    keywords: ["kompenzacija", "stečaj", "veštačenje", "pobijanje", "namirenje"],
    related_articles: ["čl. 119 ZS"],
    headnote:
      "Bez uticaja na procenat namirenja nema pravnog interesa za pobijanje kompenzacije kao radnje koja šteti masu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 436/2021",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepeni sud mora oceniti pravni interes tužioca i opšte pretpostavke pobijanja kada usvaja zahtev za pobijanje obezbeđenja datog pre stečaja?",
    court_position:
      "Privredni apelacioni sud je usvojio žalbu tuženih, ukinuo presudu o pobijanju i vratio predmet na ponovno suđenje zbog propusta u oceni legitimacije i pretpostavki čl. 119 ZS.",
    reasoning:
      "Pravnosnažna presuda o osnovanosti potraživanja tuženih obavezujuća je prema stečajnom dužniku i svim poveriocima (čl. 118 st. 3 ZS), što utiče na pravni interes za pobijanje. Sud nije ocenio nedovoljnost mase niti rokove za pobijanje iz čl. 119.",
    keywords: ["pobijanje", "obezbeđenje", "pravni interes", "stečaj", "čl. 118–119 ZS"],
    related_articles: ["čl. 118 st. 3 ZS", "čl. 119 ZS"],
    headnote:
      "Usvajanje tužbe za pobijanje zahteva eksplicitnu ocenu pretpostavki iz Zakona o stečaju, uključujući obavezujuće presude o potraživanju.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1234/2020",
    legal_area: "commercial",
    legal_question:
      "Da li su odluke i ugovori kojima je imovina preneta na osnivača bez naknade pobijljivi i da li osnivač mora isplatiti vrednost umesto naturalnog vraćanja?",
    court_position:
      "Privredni apelacioni sud je delimično preinačio a delimično potvrdio pobijanje: akti prema osnivaču nemaju dejstva prema masi uz obavezu isplate vrednosti preuzete imovine.",
    reasoning:
      "Ispunjeni su preduslovi i opšti uslovi čl. 119 ZS, a posebni osnov čl. 123 u vezi sa čl. 121 (namerno oštećenje / povezana lica). Odlukama i ugovorima umanjena je imovina dužnika za konkretan iznos i pogoršano namirenje poverilaca trećeg reda.",
    keywords: ["pobijanje", "osnivač", "stečaj", "čl. 123 ZS", "imovinska korist"],
    related_articles: ["čl. 119", "čl. 121", "čl. 123 ZS"],
    headnote:
      "Transakcije sa osnivačem koje štete masu mogu se pobiti uz novčanu restituciju kada naturalno vraćanje nije izvodljivo ili je tako zatraženo.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "P 139/2020",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepeni sud pri odlučivanju o privremenoj meri u tužbi za pobijanje sme ulaziti u punu meritornu ocenu uslova iz čl. 119–123 ZS?",
    court_position:
      "Privredni apelacioni sud je ukinuo rešenje kojim je odbijena privremena meru, jer je prvostepeni sud preuranjeno ocenjivao osnovanost pobijanja umesto verovatnoće potraživanja i opasnosti.",
    reasoning:
      "U fazi privremene mere sud ceni verovatnoću nenovčanog potraživanja i opasnost po izvršenje, a ne kumulativno ispunjenost svih osnova pobijanja kao u presudi. Razlozi koji mešaju meritornu ocenu su nejasni i nezakoniti za ovu fazu.",
    keywords: ["privremena mera", "pobijanje", "stečaj", "faza postupka", "verovatnoća"],
    related_articles: ["čl. 119–123 ZS", "ZPP o privremenim merama"],
    headnote:
      "Privremena faza u sporu za pobijanje zahteva ograničenu ocenu; puna primena čl. 119–123 sledi u glavnoj raspravi.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 196/2025",
    legal_area: "commercial",
    legal_question:
      "Da li singularni pravni sledbenici protivnika pobijanja moraju biti obuhvaćeni tužbom kada je predmet vraćanje imovine u stečajnu masu?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presude u delu odbijanja vraćanja imovine u masu zbog pogrešne primene pravilnu o nužnom suparničarstvu i čl. 129 st. 4 ZS u vezi sa čl. 211 ZPP.",
    reasoning:
      "Tužba za pobijanje može obuhvatiti singularne sledbenike pod uslovima iz čl. 129 st. 4 ZS, ali ne i da moraju biti obuhvaćeni u svakom slučaju. Nužno suparničarstvo postoji kada zakon ili priroda odnosa zahtevaju zajedničko rešenje; greška u oceni stranaka dovodi do uklanjanja.",
    keywords: ["revizija", "pobijanje", "nužno suparničarstvo", "čl. 211 ZPP", "čl. 129 ZS"],
    related_articles: ["čl. 129 st. 4 ZS", "čl. 211 ZPP"],
    headnote:
      "Obim stranaka u tužbi za pobijanje mora uskladiti stečajni zakon sa pravilima nužnog suparničarstva iz ZPP.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 1768/2023",
    legal_area: "procedural",
    legal_question:
      "Da li je revizija dozvoljena u privrednom sporu male vrednosti radi pobijanja pravnih radnji stečajnog dužnika?",
    court_position:
      "Vrhovni sud nije dozvolio odlučivanje o reviziji i odbacio je kao nedozvoljenu jer vrednost predmeta spora nije prelazila zakoniti cenzus od 100.000 evra.",
    reasoning:
      "Uslovi čl. 404 st. 1 ZPP za izuzetnu dozvoljenost revizije nisu ispunjeni. Iako su nižestepeni sudovi utvrdili namerno oštećenje i znanje saugovarača, revident osporava činjenično stanje na način koji nije dopušten u posebnoj reviziji.",
    keywords: ["revizija", "cenzus vrednosti", "ZPP", "stečaj", "nedozvoljena revizija"],
    related_articles: ["čl. 404 st. 1 ZPP"],
    headnote:
      "Čak i ozbiljna meritorna pitanja pobijanja ne otvaraju reviziju ako nije pređen imovinski prag za dozvoljenost.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 3026/2015",
    legal_area: "commercial",
    legal_question:
      "Da li je izjava o kompenzaciji apsolutno ništava ako je potpisao neovlašćeni direktor posle otvaranja stečaja i ako potraživanje tuženog nije bilo dospelo?",
    court_position:
      "Privredni apelacioni sud je preinačio presudu i utvrdio apsolutnu ništavost izjave o kompenzaciji uz obavezu vraćanja primljenog iznosa.",
    reasoning:
      "Za pobijanje po ZS potrebni su preduslovi uključujući punovažnost pravnog posla; ovde poslednji preduslov nije ispunjen jer je radnja ništava zbog ovlašćenja i dospelosti. Prvostepeni sud je pogrešno odbio deo zahteva koji sledi iz ništavosti.",
    keywords: ["kompenzacija", "ništavost", "stečaj", "direktor", "dospelost"],
    related_articles: ["čl. 437 ZOO", "Zakon o stečaju"],
    headnote:
      "Kompenzacija u stečaju koja ne ispunjava uslove punovažnosti ne može se braniti pozivom na stečajno pobijanje umesto na ništavost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 2002/2022",
    legal_area: "commercial",
    legal_question:
      "Da li je ugovor o pristupanju dugu pobijljiv kao radnja namernog oštećenja poverilaca ako je saugovarač znao za preteću nesolventnost?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio pobijanje ugovora o pristupanju dugu bez dejstva prema stečajnoj masi.",
    reasoning:
      "Kumulativno su ispunjeni uslovi čl. 123 ZS za ugovor od 31.03.2008. Tuženi je mogao tražiti vraćanje pozajmica samo od pravnog lica sa kojim je bio u odnosu; preostala potraživanja nisu dokazana u traženom obimu. Revizija ne pobija pravilnu primenu materijalnog prava.",
    keywords: ["pristupanje dugu", "čl. 123 ZS", "revizija", "stečaj", "namerno oštećenje"],
    related_articles: ["čl. 123 ZS"],
    headnote:
      "Ugovor o pristupanju dugu koji služi favorizovanju jednog poverioca u nesolventnosti može se uspešno pobiti po Zakonu o stečaju.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2610/2023",
    legal_area: "commercial",
    legal_question:
      "Da li propuštanje stečajnog dužnika da izjavi žalbu na rešenje o izvršenju predstavlja pobijljivu radnju i koje su posledice po izvršnu ispravu?",
    court_position:
      "Privredni apelacioni sud je delimično ukinuo prvostepenu presudu, prihvativši da propuštanje žalbe može biti pobijljivo ako šteti ravnomernom namirenju, ali potvrdio odbijanje dela tužbe koji traži ovlašćenje dužnika da naknadno podnese žalbu.",
    reasoning:
      "Predmet pobijanja ne može biti potvrda pravnosnažnosti sudske odluke niti presuda može ovlastiti dužnika na kasno podnošenje žalbe. Uspešno pobijanje propuštanja dovodi do prestanka dejstva izvršne isprave prema stečajnoj masi (čl. 119 st. 3 ZS), ali ostaje ograničenje u pogledu procesnih ovlašćenja kroz presudu.",
    keywords: ["propuštanje žalbe", "izvršenje", "pobijanje", "stečaj", "čl. 119 st. 3 ZS"],
    related_articles: ["čl. 119 st. 2–3 ZS"],
    headnote:
      "Propuštanje žalbe može se pobiti uz prestanak dejstva izvršne isprave prema masi, ali sud ne može zameniti volju dužnika za kasni procesni akt.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 551/2024",
    legal_area: "commercial",
    legal_question:
      "Da li ugovor o poklonu nepokretnosti u korist ćerke dužnika gubi dejstvo prema poveriocu kada je raspolaganje učinjeno na štetu naplate dospelog potraživanja?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je ugovor o poklonu proglašen bez pravnog dejstva prema poveriocu, jer su ispunjeni uslovi Paulijanske tužbe.",
    reasoning:
      "Po čl. 280 ZOO poverilac dospelog potraživanja može pobijati radnje dužnika na svoju štetu; šteta postoji kada dužnik nema sredstva za ispunjenje. Po čl. 281 st. 3 kod besplatnih raspolaganja pretpostavlja se znanje dužnika da nanosi štetu, bez dokaza o znanju trećeg lica. Cilj je namirenje poverioca u okviru čl. 284 ZOO.",
    keywords: ["poklon", "Paulijanska tužba", "čl. 280 ZOO", "poverilac", "šteta"],
    related_articles: ["čl. 280–285 ZOO"],
    headnote:
      "Poklon nepokretnosti u korist srodnika može se pobiti kada dužnik ostaje nesposoban da namiri dospelo potraživanje poverioca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 2103/2023",
    legal_area: "commercial",
    legal_question:
      "Da li je dokazano da propuštanje radnji u izvršnim postupcima narušava ravnomerno namirenje ili pogoduje razlučnom poveriocu koji naplaćuje dospelo potraživanje?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca-stečajnog dužnika kao neosnovanu i potvrdio da nedovoljnost mase sama po sebi ne dokazuje osnov iz čl. 119 ZS.",
    reasoning:
      "Tužilac nije dokazao pogodovanje razlučnog poverioca; tuženi je stekao hipoteku i založna prava 2015. i namirio dospelo potraživanje u skladu sa pravom. Nije bilo drugih prijava razlučnih poverilaca. Nemogućnost potpunog namirenja u stečaju jeste preduslov pobijanja, ali nije i poseban uslov štete iz čl. 119 bez dodatnih dokaza.",
    keywords: ["revizija", "stečaj", "pobijanje", "razlučni poverilac", "izvršenje"],
    related_articles: ["čl. 119 ZS"],
    headnote:
      "Za pobijanje radnji u stečaju potrebno je dokazati konkretno narušavanje namirenja ili pogodovanje, a ne samo insolventnost mase.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5397/2022",
    legal_area: "constitutional",
    legal_question:
      "Da li je arbitrarno zaključeno da potraživanje nije prijavljeno u stečaju ako je poverilac upućen na parnicu upravo zbog osporavanja prijave?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje jer je Privredni apelacioni sud proizvoljno tumačio činjenicu o prijavi potraživanja.",
    reasoning:
      "Institut prebijanja i prijave potraživanja u stečaju zahteva doslednu primenu čl. 83 i 111–117 ZS. Ako je osporavanje prijave upravilo poverioca na parnicu, zaključak da potraživanje 'nije prijavljeno' suprotan je logici postupka i čini odluku proizvoljnom u smislu čl. 32 st. 1 Ustava.",
    keywords: ["ustavna žalba", "stečaj", "prijava potraživanja", "pravično suđenje", "prebijanje"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 111–117 ZS", "čl. 83 ZS"],
    headnote:
      "Ustavni sud kontroliše očiglednu proizvoljnost pri primeni stečajnog prava na prijavu i prebijanje potraživanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "PŽ 7007/2017",
    legal_area: "commercial",
    legal_question:
      "Da li vraćanje zajma povezanom licu (osnivaču) putem kompenzacije u poslednjoj godini pre stečaja predstavlja namerno oštećenje poverilaca?",
    court_position:
      "Privredni apelacioni sud je usvojio žalbu tužioca i preinačio prvostepenu presudu, utvrđujući da je kompenzacija u odnosu na povezano lice radnja namernog oštećenja u smislu Zakona o stečaju.",
    reasoning:
      "Prvostepeni sud je zanemario da je tuženi suosnivač i da se ne radi o neutralnom vraćanju kredita već o kompenzaciji u strukturi povezanih lica u kritičnom periodu. Drugostepeni sud je pravilno primenio čl. 123 ZS i okolnosti povezanosti i namere.",
    keywords: ["povezana lica", "kompenzacija", "čl. 123 ZS", "stečaj", "osnivač"],
    related_articles: ["čl. 123 ZS", "čl. 82 ZS"],
    headnote:
      "Kompenzacija sa povezanim licem u godini pre stečaja može biti pobijana kao favorizovanje povezanog poverioca oštećujući masu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 237/2014",
    legal_area: "commercial",
    legal_question:
      "Da li se potraživanje ugašeno kompenzacijom pre stečaja može ponovo ostvariti tužbom za dug umesto tužbe za pobijanje kompenzacije?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da je stečajni upravnik mogao osporiti kompenzaciju isključivo tužbom za pobijanje pravnih radnji, a ne tužbom za isplatu istog iznosa kao da prebijanje ne postoji.",
    reasoning:
      "Ako je potraživanje ugašeno prebijanjem, materijalnopravno je prestalo; osporavanje zahteva pobijanje po čl. 119–129 ZS i vraćanje koristi u masu po čl. 130, uz mogućnost naknadne prijave protivpotraživanja. Suprotan postupak bi zaobišao stečajni režim i zaštitu svih učesnika kompenzacije.",
    keywords: ["kompenzacija", "prebijanje", "stečaj", "pobijanje", "Zakon o stečaju"],
    related_articles: ["čl. 119–130 ZS", "čl. 46 Zakona o platnom prometu (kontekst)"],
    headnote:
      "Ugašeno potraživanje kompenzacijom u stečaju se ne 'oživljava' običnom tužbom za isplatu bez uspešnog pobijanja prebijanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pvž 670/2015",
    legal_area: "commercial",
    legal_question:
      "Da li je prekluzivni rok od 120 dana za prijavu potraživanja u likvidaciji osiguravajućeg društva produživ ako poverilac kasnije stekne pravni osnov?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbacivanje prijave kao neblagovremene, primenom čl. 111 st. 5 ZS i posebnog zakona o likvidaciji banaka i osiguranja.",
    reasoning:
      "Oglas o likvidaciji objavljen 15.08.2014; prijava 19.06.2015. jeste daleko iza 120 dana. Shodna primena stečajnog roka je isključena za pobijanje u posebnom zakonu, ali rok za prijavu ostaje prekluzivan. Kasnije nastali osnov ne produžuje rok.",
    keywords: ["likvidacija", "osiguranje", "prijava potraživanja", "prekluzivni rok", "čl. 111 ZS"],
    related_articles: ["čl. 111 st. 5 ZS", "Zakon o stečaju i likvidaciji banaka i društava za osiguranje"],
    headnote:
      "U likvidaciji društva za osiguranje primenjuje se striktan rok za prijavu; kasniji nastanak potraživanja ne rehabilituje propušteni rok.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 12392/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li revizijski sud može neovlašćeno menjati utvrđeno činjenično stanje u sporu o pobijanju pravnih radnji u stečaju?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i poništio presudu Vrhovnog kasacionog suda jer je revizija promenila činjenice utvrđene u nižim stepenima, povredivši pravo na pravično suđenje.",
    reasoning:
      "Ustavni sud nije meritorni sud za ocenu pravilnosti primene materijalnog prava u svakom slučaju, ali neovlašćena izmena činjeničnog stanja u reviziji čini odluku proizvoljnom u odnosu na čl. 32 st. 1 Ustava. Revizija mora ostati unutar granica čl. 414 ZPP.",
    keywords: ["ustavna žalba", "revizija", "činjenično stanje", "pravično suđenje", "stečaj"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 414 ZPP"],
    headnote:
      "VKS ne sme u reviziji zamenjivati ulogu prvog i drugog stepena utvrđivanjem novih činjenica.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 280/2016",
    legal_area: "commercial",
    legal_question:
      "Da li je kupoprodajni ugovor o nepokretnosti sa povezanim licem u periodu nesolventnosti stečajnog dužnika pobijljiv zbog neposrednog oštećenja poverilaca?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio presude kojima je ugovor bez dejstva prema stečajnoj masi.",
    reasoning:
      "Tuženi je bio zakonski zastupnik i član uprave dužnika; račun je bio dugo blokiran. Ugovor zaključen šest meseci pre stečaja sa plaćanjem cene u 480 rata pokazuje oštećenje poverilaca i znanje saugovarača. Ispunjeni su preduslovi čl. 119 ZS i osnov neposrednog oštećenja.",
    keywords: ["pobijanje", "povezano lice", "kupoprodaja", "stečaj", "blokada računa"],
    related_articles: ["čl. 119", "čl. 122 ZS"],
    headnote:
      "Kupoprodaja sa insiderom uz očiglednu nesolventnost i odloženo plaćanje često ispunjava osnov pobijanja u stečaju.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6219/2016",
    legal_area: "commercial",
    legal_question:
      "Da li stečajni poverilac može tužbom protiv stečajnog dužnika tražiti utvrđenje prava na prebijanje kada je potraživanje priznato a osporeno prebijanje?",
    court_position:
      "Privredni apelacioni sud je ukinuo presudu kojom je utvrđen preboj, jer osporavanje prebijanja rešava stečajni upravnik i stečajni sudija, a ne posebna utvrđivačka tužba.",
    reasoning:
      "Prema čl. 83 ZS upravnik osporava nedopušteno prebijanje; poverilac može primedbu i postupak po čl. 113 st. 6 ZS. Ako upravnik ostane pri osporavanju, poverilac ne može tužbom za utvrđenje prebijanja zaobići stečajni postupak; upućenost na parnicu iz čl. 117 odnosi se na osporeno potraživanje, ne na 'pravo na prebijanje' kao apstrakciju.",
    keywords: ["prebijanje", "stečaj", "utvrđenje", "nedozvoljena tužba", "čl. 83 ZS"],
    related_articles: ["čl. 83", "čl. 113 st. 6", "čl. 117 ZS"],
    headnote:
      "Prebijanje se ostvaruje kroz stečajni postupak; posebna tužba za utvrđenje prebijanja nije dozvoljena kada je potraživanje već priznato.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4670/2021",
    legal_area: "commercial",
    legal_question:
      "Da li su ispunjeni uslovi čl. 280–281 ZOO za pobijanje teretnog raspolaganja dužnika kupoprodajom nepokretnosti u korist trećeg lica?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio presudu Apelacionog suda kojom je ugovor o kupoprodaji bez dejstva prema poveriocu.",
    reasoning:
      "Postoji dospelo potraživanje; dužnik nakon raspolaganja nema sredstva za namirenje. Kod teretnog raspolaganja potrebna je nesavesnost dužnika i trećeg lica; tuženi kao zastupnik prodavca morao je znati za štetu. Paulijanski institut je pravilno primenjen.",
    keywords: ["Paulijanska tužba", "čl. 280 ZOO", "kupoprodaja", "revizija", "poverilac"],
    related_articles: ["čl. 280–281 ZOO"],
    headnote:
      "Teretno raspolaganje uz ulogu zastupnika kupca može zadovoljiti uslov sauvestnosti trećeg lica za pobijanje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 593/2021",
    legal_area: "commercial",
    legal_question:
      "Da li ugovor o jemstvu stečajnog dužnika za obaveze povezanog lica (direktora) ima dejstvo prema stečajnoj masi?",
    court_position:
      "Privredni apelacioni sud je potvrdio presudu kojom je utvrđeno da jemstvo nema dejstvo prema stečajnoj masi kao dobročin pravni posao bez naknade.",
    reasoning:
      "Posle ispunjenja opštih uslova iz čl. 119 ZS, posebni osnov može biti radnja bez naknade ili uz neznatnu naknadu (čl. 124 ZS). Jemstvo za dug povezanog lica ne donosi protivvrednost masi i predstavlja oblik pogodovanja ili oštećenja poverilaca.",
    keywords: ["jemstvo", "povezano lice", "stečaj", "pobijanje", "čl. 124 ZS"],
    related_articles: ["čl. 119", "čl. 124 ZS"],
    headnote:
      "Jemstvo stečajnog dužnika za obaveze povezanog lica često se kvalifikuje kao posao bez naknade pobijljiv po ZS.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2204/2015",
    legal_area: "commercial",
    legal_question:
      "Da li blokada računa dužnika čini ništavim ugovor kojim se dug izmiruje prenosom svojine na nepokretnosti?",
    court_position:
      "Privredni apelacioni sud je preinačio prvostepenu presudu i odbio tužbeni zahtev za poništaj, smatrajući da blokada sama po sebi ne čini ugovor ništavim u smislu ZPP-a za pobijanje po ZS.",
    reasoning:
      "Zakon o platnom prometu reguliše platne transakcije; eventualno pogodovanje moglo bi se pobijati po Zakonu o stečaju ako je tužba tako postavljena, ali u ovoj parnici takav zahtev nije bio izložen. Drugostepeni sud se ograničava na postavljeni predmet spora.",
    keywords: ["blokada računa", "prenos svojine", "izmirenje duga", "ZPP", "stečaj"],
    related_articles: ["Zakon o platnom prometu", "Zakon o stečaju"],
    headnote:
      "Pravna kvalifikacija ugovora o prenosu nepokretnosti radi duga ne zavisi samo od činjenice blokade računa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 19/2018",
    legal_area: "commercial",
    legal_question:
      "Da li su sporazumi o sudskom poravnanju kojima je preneta nepokretnost ništavi i štetni po stečajnu masu?",
    court_position:
      "Vrhovni kasacioni sud je potvrdio nižestepene presude kojima su sporazumi pobijeni kao radnje koje štete ostalim poveriocima uz znanje o nesolventnosti.",
    reasoning:
      "Posledica uspešnog pobijanja je vraćanje nepokretnosti u masu; preduslov nedostatka sredstava za namirenje dokazuje se u okviru čl. 126 ZS. Revident ne može uspešno osporiti da su preduslovi ispunjeni ako je to pravilno utvrđeno u nižim stepenima.",
    keywords: ["sudsko poravnanje", "stečaj", "pobijanje", "čl. 126 ZS", "revizija"],
    related_articles: ["čl. 119", "čl. 126 ZS"],
    headnote:
      "Poravnanja koja prazne masu u korist jednog poverioca u dubokoj krizi podležu pobijanju u stečaju.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 298/2016",
    legal_area: "commercial",
    legal_question:
      "Da li je prenos udela bez naknade neposredno pre stečaja pobijljiv kao radnja bez naknade koja šteti poverioce?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio pobijanje ugovora o prenosu udela bez naknade.",
    reasoning:
      "Primenjeni su čl. 119 i 124 ZS; kod besteretnih raspolaganja zakon pretpostavlja nameru oštećenja poverilaca. Pravni posao je punovažan ali se pobija dejstvo prema masi jer smanjuje imovinu dužnika i pogoršava izglede za namirenje.",
    keywords: ["prenos udela", "besplatno raspolaganje", "stečaj", "čl. 124 ZS", "revizija"],
    related_articles: ["čl. 119", "čl. 124 ZS"],
    headnote:
      "Besteretni prenos udela pred otvaranjem stečaja tipično zadovoljava opšti uslov štete iz čl. 119 uz posebni režim čl. 124.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "PŽ 6738/2017",
    legal_area: "commercial",
    legal_question:
      "Da li tužilac može uspešno pobijati pravne poslove ako nisu umanjili imovinu tuženog dužnika niti oštetili njegove poverioce?",
    court_position:
      "Privredni apelacioni sud je delimično potvrdio utvrđenje svojine i izlučenje, ali je preinačio troškove postupka.",
    reasoning:
      "Za uspešno pobijanje potrebno je da poslovi budu štetni po ravnomerno namirenje ili da postoji namera i znanje u smislu čl. 123 ZS. Ako imovina tuženog nije umanjena i nije dokazana nesolventnost i zajednička namera sa povezanim licima, pobijanje ne uspeva. Udeo je umanjen ranijim teretnim kupoprodajama koje nisu predmet pobijanja.",
    keywords: ["izlučenje", "svojina", "pobijanje", "stečaj", "troškovi postupka"],
    related_articles: ["čl. 119", "čl. 123 ZS"],
    headnote:
      "Pobijanje zahteva dokaz štete po masu ili namernog oštećenja; formalno postojanje roka od pet godina nije dovoljno.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 4008/2015",
    legal_area: "commercial",
    legal_question:
      "Da li je tuženi pasivno legitimisan u tužbi za pobijanje ako nije strana u pravnim poslovima koji se pobijaju?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje tužbe u delu u kome je tužena pasivna legitimacija promašena, kao i u delu koji se odnosi na valjanost kupoprodaje nepokretnosti.",
    reasoning:
      "Po čl. 129 st. 3–4 ZS tužba se može podneti protiv određenih kategorija sledbenika pod kumulativnim uslovima. Tuženi koji nije učestvovao u poslu nije protivnik pobijanja. Novi navodi o isplati cene nisu blagovremeno istaknuti u prvom stepenu pa su prekludirani po čl. 372 st. 1 ZPP.",
    keywords: ["pasivna legitimacija", "pobijanje", "stečaj", "čl. 129 ZS", "prekluzija"],
    related_articles: ["čl. 129 st. 3–4 ZS", "čl. 372 st. 1 ZPP"],
    headnote:
      "Protivnik pobijanja mora biti lice učestvovalo u pravnom poslu ili ispunjavati uslove sledbenika iz čl. 129 st. 4 ZS.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3395/2017",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepeni sud mora utvrditi da li je dužnik ostao bez sredstava za naplatu i da li je postojala nedopuštena pobuda kod ugovora o poklonu?",
    court_position:
      "Apelacioni sud je ukinuo presudu koja je odbila pobijanje poklona, jer prvostepeni sud nije utvrdio insolventnost posle poklona i okolnosti Paulijanske tužbe.",
    reasoning:
      "Po čl. 280–285 ZOO sud mora utvrditi štetu, eventualnu nedopuštenu pobudu za poništaj i rokove za pobijanje. Kod besplatnih raspolaganja postoji posebni režim pretpostavki iz čl. 281 st. 3, ali ipak treba utvrditi činjenice o preostaloj imovini dužnika.",
    keywords: ["poklon", "Paulijanska tužba", "Gž", "čl. 280 ZOO", "insolventnost"],
    related_articles: ["čl. 280–285 ZOO"],
    headnote:
      "I kada postoje pretpostavke za besplatno raspolaganje, sud mora utvrditi da li je dužnik ostao bez sredstava za ispunjenje potraživanja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1301/2021",
    legal_area: "commercial",
    legal_question:
      "Da li poklon dužnika u korist srodnika gubi dejstvo prema poveriocu kada je ispunjen institut pobijanja iz čl. 280–281 st. 3 ZOO?",
    court_position:
      "Vrhovni kasacioni sud je preinačio drugostepenu presudu i potvrdio prvostepenu kojom je utvrđeno da ugovor o poklonu nema dejstva prema poveriocu.",
    reasoning:
      "Kod besplatnih raspolaganja pretpostavlja se znanje dužnika da nanosi štetu i ne traži se dokaz znanja trećeg lica. Cilj je relativna neefikasnost do visine potraživanja. Drugostepeni sud je pogrešno ocenio teret dokazivanja u odnosu na čl. 281 st. 3.",
    keywords: ["poklon", "čl. 281 st. 3 ZOO", "Paulijanska tužba", "revizija", "preinačenje"],
    related_articles: ["čl. 280–285 ZOO"],
    headnote:
      "VKS koriguje drugi stepen kada pogrešno primeni pretpostavku sauvestnosti dužnika kod besplatnih raspolaganja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 309/2017",
    legal_area: "commercial",
    legal_question:
      "Da li je sudsko poravnanje koje nije ništavo može biti pobijeno u stečaju kao radnja štetna po masu?",
    court_position:
      "Vrhovni kasacioni sud je odbio revizije obe strane i potvrdio presudu koja je odbila ništavost ali usvojila pobijanje poravnanja kao štetnog po stečajnu masu.",
    reasoning:
      "Kod uobičajenog namirenja predmet pobijanja je punovažan posao u roku od šest meseci pre predloga za stečaj uz nesposobnost plaćanja dužnika u trenutku radnje. Poravnanje može biti valjano kao civilni posao a ipak proizvoditi štetu u smislu ZS pa biti predmet pobijanja.",
    keywords: ["sudsko poravnanje", "stečaj", "pobijanje", "uobičajeno namirenje", "revizija"],
    related_articles: ["čl. 120 ZS", "čl. 119 ZS"],
    headnote:
      "Valjanost poravnanja u civilnom pravu i pobijanje u stečaju nisu isti institut; šteta masi se posebno ocenjuje.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6532/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li je prigovor pobijanja poravnanja u stečaju neustavan zbog snage izvršne isprave poravnanja?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu privrednog društva i potvrdio da redovni sudovi mogu pobiti poravnanje koje je zaključeno u blokadi i šteti ravnomernom namirenju.",
    reasoning:
      "Pravilnost primene materijalnog prava u prvom i drugom stepenu nadležna je da ceni viši sud u zakonitom postupku. Ustavni sud nije utvrdio proizvoljnost koja bi povredila čl. 32 st. 1 Ustava.",
    keywords: ["ustavna žalba", "poravnanje", "stečaj", "pobijanje", "izvršna isprava"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 105–108 ZPPPSL / ZS (kontekst)"],
    headnote:
      "Ustavna žalba ne zamenjuje kasaciju kada nema očigledne proizvoljnosti u primeni stečajnog prava na poravnanje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 607/2019",
    legal_area: "commercial",
    legal_question:
      "Da li prodavac može tražiti ponovni upis kao vlasnika ako je kupac prodao nepokretnost trećem licu pre rešavanja raskida zbog neplaćanja cene?",
    court_position:
      "Privredni apelacioni sud je potvrdio raskid ugovora o kupoprodaji zbog neplaćanja, ali odbio zahtev da prethodni kupac trpi upis prodavca kao vlasnika jer je nepokretnost otuđena trećem licu.",
    reasoning:
      "Ugovor je zaključen pre stečaja; raskid je materijalnopravno moguć. Međutim prvostepeni sud nije odlučio o zahtevu za pobijanje radnji stečajnog dužnika i vraćanje u masu, a tužilac nije podneo predlog za dopunu presude po čl. 356 ZPP pa se smatra da je tužba u tom delu povučena.",
    keywords: ["raskid kupoprodaje", "nepokretnost", "stečaj", "čl. 356 ZPP", "treće lice"],
    related_articles: ["čl. 356 ZPP", "Zakon o obligacionim odnosima"],
    headnote:
      "Raskid kupoprodaje ne automatski vraća predmet u stečajnu masu ako je imovina prešla na treće lice; potrebni su posebni zahtevi i strane.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 256/2016",
    legal_area: "procedural",
    legal_question:
      "Da li se zakonitost akata u stečajnom postupku može osporiti posebnom tužbom za ništavost van stečaja?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio nedozvoljenost tužbe za ništavost akata donetih u stečaju ili likvidaciji.",
    reasoning:
      "Osporavanje utvrđenih potraživanja i zakonitosti postupanja stečajnih organa ide putem instituta iz Zakona o stečaju, uključujući parnicu po čl. 117 ZS za osporena potraživanja. Tužba za ništavost akata masu nije predviđena kao poseban civilni institut u ovom obliku.",
    keywords: ["stečaj", "ništavost", "nedozvoljena tužba", "čl. 117 ZS", "revizija"],
    related_articles: ["čl. 117 ZS", "čl. 415", "čl. 420 st. 6 ZPP"],
    headnote:
      "Paralelni civilni spor za ništavost stečajnih akata nije dozvoljen kada ZS daje poseban postupak.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3235/2019",
    legal_area: "commercial",
    legal_question:
      "Da li besplatni prenos celokupnog osnivačkog udela dužnika u korist trećeg lica ispunjava uslove Paulijanske tužbe?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio da ugovor nema dejstva prema poveriocu u meri potrebnoj za namirenje.",
    reasoning:
      "Čl. 280–281 st. 3 ZOO: besplatno raspolaganje dovodi do pretpostavke znanja dužnika o šteti. Dužnik je ostao bez jedine imovine koja bi mogla namiriti dosuđeno potraživanje. Relativna neefikasnost u smislu čl. 284 ZOO je pravilno primenjena.",
    keywords: ["Paulijanska tužba", "udel", "čl. 281 st. 3 ZOO", "revizija", "poverilac"],
    related_articles: ["čl. 280–285 ZOO"],
    headnote:
      "Prenos celokupnog udela bez naknade tipično zadovoljava uslove za pobijanje u korist dospelog poverioca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 7/2014",
    legal_area: "criminal",
    legal_question:
      "Da li je sudija–predsednik stečajnog veća odgovoran za zloupotrebu položaja pri odobravanju sudskog poravnanja radi onemogućavanja pobijanja u stečaju?",
    court_position:
      "Apelacioni sud je delimično preinačio prvostepenu presudu u predmetu organizovanog kriminala, delimično oslobodio okrivljene i deo vratio na ponovo suđenje zbog bitnih povreda postupka.",
    reasoning:
      "U izreci se ocenjuju radnje u vezi sa odobravanjem potpisivanja poravnanja između stečajnog dužnika i banke radi sprečavanja pobijanja po starom zakonu o stečaju. Odluka obuhvata složenu ocenu krivičnog dokaza i procesnih povreda.",
    keywords: ["organizovani kriminal", "stečajno veće", "sudsko poravnanje", "krivično delo", "Apelacija"],
    related_articles: ["Krivični zakonik", "Zakon o prinudnom poravnanju, stečaju i likvidaciji (istorijski)"],
    headnote:
      "Krivična odgovornost sudije u stečaju za odobravanje poravnanja ocenjuje se u okviru dokaza o zloupotrebi službenog položaja.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2779/2016",
    legal_area: "commercial",
    legal_question:
      "Da li majčin poklon nepokretnosti ćerki posle određenja izvršenja na toj nepokretnosti šteti poveriocu u smislu čl. 280 ZOO?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je poklon bez dejstva prema poveriocu jer je dužnik onemogućio naplatu dospelog potraživanja.",
    reasoning:
      "Potraživanje je dospelo i nije moglo biti namireno iz pokretne imovine; poklon nepokretnosti koja je bila predmet izvršenja predstavlja radnju na štetu. Kod srodstva postoji pretpostavka znanja trećeg lica iz čl. 281 st. 2, a kod besplatnog raspolaganja i pretpostavka iz st. 3.",
    keywords: ["poklon", "Paulijanska tužba", "izvršenje", "čl. 280 ZOO", "srodstvo"],
    related_articles: ["čl. 280–281 ZOO"],
    headnote:
      "Poklon nepokretnosti koja je već bila predmet prinudnog ispunjenja često ispunjava uslove za Paulijansku zaštitu poverioca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2630/2016",
    legal_area: "commercial",
    legal_question:
      "Da li je kompenzacija zaključena posle predloga za stečaj a pre otvaranja postupka pobijljiva kao uobičajeno namirenje?",
    court_position:
      "Privredni apelacioni sud je potvrdio presudu kojom je izjava o kompenzaciji pobijena i naloženo vraćanje iznosa u stečajnu masu.",
    reasoning:
      "Radnja je preduzeta 11.01.2010. a predlog za stečaj 10.11.2009; tuženi u poslovnoj saradnji morao je znati za predlog i nelikvidnost (javni podaci NBS). Ispunjeni su uslovi čl. 99 st. 2–3 starog Zakona o stečajnom postupku za uobičajeno namirenje; nebitno je da bi procenat namirenja ostao sličan.",
    keywords: ["kompenzacija", "predlog za stečaj", "Zakon o stečajnom postupku", "čl. 99", "NBS"],
    related_articles: ["čl. 99 ZSP (stari)"],
    headnote:
      "Kompenzacija posle predloga a pre otvaranja stečaja može se pobiti kada je saugovarač morao znati za predlog i nesolventnost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2277/2022",
    legal_area: "commercial",
    legal_question:
      "Da li kupoprodaja nepokretnosti između dužnika i prijatelja-kupca ispunjava uslove Paulijanske tužbe iz čl. 280–281 ZOO?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio pobijanje ugovora o kupoprodaji jer su stranke znale da nanose štetu poveriocu dospelog potraživanja.",
    reasoning:
      "Dokazi pokazuju savesnu povezanost i svesnost ugovornih strana. Nižestepeni sudovi su pravilno primenili čl. 280–281 ZOO; dužnik ne mora biti potpuno nesolventan već bez dovoljno sredstava za konkretno potraživanje.",
    keywords: ["Paulijanska tužba", "kupoprodaja", "revizija", "čl. 280 ZOO", "znanje stranaka"],
    related_articles: ["čl. 280–281 ZOO"],
    headnote:
      "Dugogodišnje prijateljstvo i svesno učešće u transakciji mogu podržati zaključak o sauvestnosti kod teretnog raspolaganja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 90/2017",
    legal_area: "commercial",
    legal_question:
      "Da li se u likvidaciji banke tužilac odrekao ugovorne kamate na osporeno potraživanje i da li se potraživanje razvrstava u prvi isplatni red?",
    court_position:
      "Vrhovni kasacioni sud je delimično uvažio reviziju, ukinuo odbijajući deo u odnosu na utvrđenje potraživanja sa ugovorenom kamatom i razvrstavanje u prvi red, zbog pogrešnog tumačenja odricanja od kamate.",
    reasoning:
      "Tužba za ništavost utvrđenih potraživanja u likvidaciji nije dozvoljena; utvrđivanje ide po čl. 116 st. 1 ZS u vezi sa posebnim zakonom o bankama. Revizijski sud je ispravio grešku u vezi sa kamatom i isplatnim redom u okviru dopuštene kontrole.",
    keywords: ["likvidacija banke", "potraživanje", "kamata", "isplatni red", "revizija"],
    related_articles: ["čl. 25 Zakona o stečaju i likvidaciji banaka", "čl. 116 st. 1 ZS"],
    headnote:
      "U likvidaciji banke primenjuju se posebni režimi; odricanje od kamate mora biti jasno dokazano, ne pretpostavljeno.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1124/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li sudija koji je učestvovao u odluci Ustavnog suda u istoj pravnoj stvari može predsedavati revizijskom veću Vrhovnog kasacionog suda?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu, utvrdio povredu prava na pravično suđenje i poništio presudu Vrhovnog kasacionog suda zbog sumnje u nepristrasnost.",
    reasoning:
      "Istovetno učešće sudije u ranijoj ustavnosudskoj fazi iste ekonomsko-pravne kontroverze dovodi u sumnju objektivnu nepristrasnost revizijskog veća u smislu čl. 32 st. 1 Ustava i srodnih standarda EKPJ.",
    keywords: ["ustavna žalba", "nepristrasnost sudije", "VKS", "Ustavni sud", "pravično suđenje"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 6 st. 1 EKPJ"],
    headnote:
      "Sukob interesa i prethodno učešće u ustavnopravnoj kontroli iste stvari mogu povrediti pravo na nepristrasan sud.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1117/2007",
    legal_area: "commercial",
    legal_question:
      "Da li je za blagovremenost Paulijanske tužbe presudan dan preduzimanja pobijane radnje kada se pobija odricanje od nasledstva?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude i vratio predmet na ponovno suđenje jer nije utvrđen datum preduzimanja pravne radnje koja se pobija.",
    reasoning:
      "Odricanje od nasledstva u korist određenog naslednika može se tretirati kao besplatno raspolaganje po čl. 281 st. 3–4 ZOO u vezi sa Zakonom o nasleđivanju. Rok iz čl. 285 ZOO za besplatna raspolaganja je tri godine i prekluzivan; sud vodi računa po službenoj dužnosti, ali mora postojati utvrđen početak tečenja.",
    keywords: ["Paulijanska tužba", "odricanje od nasledstva", "rok", "čl. 285 ZOO", "prekluzija"],
    related_articles: ["čl. 280–285 ZOO", "čl. 216 Zakona o nasleđivanju"],
    headnote:
      "Bez utvrđenog datuma besplatnog raspolaganja sud ne može zakonito odlučiti o prekluzivnom roku za tužbu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4/2017",
    legal_area: "commercial",
    legal_question:
      "Da li sud prvo ispituje apsolutnu ništavost ugovora o poklonu zbog nedopuštene pobude pre meritorne ocene Paulijanske zaštite?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo drugostepenu presudu i vratio predmet na ponovno suđenje, nalazeći da shvatanje nižih sudova o zatraženoj zaštiti nije prihvatljivo.",
    reasoning:
      "Postoji pitanje redosleda ispitivanja ništavosti zbog nedopuštene pobude i eventualnog zahteva za relativnu neefikasnost prema poveriocu. Drugostepeni sud je mešao institute poništaja i pobijanja dužnikovih radnji i pasivnu legitimaciju u odnosu na rok iz čl. 285 ZOO.",
    keywords: ["poklon", "nedopuštena pobuda", "Paulijanska tužba", "revizija", "čl. 285 ZOO"],
    related_articles: ["čl. 280–285 ZOO", "čl. 414 ZPP"],
    headnote:
      "Sud mora dosledno razgraničiti ništavost zbog pobude i pobijanje na štetu poverioca, uključujući rokove i stranke.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3304/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li odricanje od nasledstva u korist babe gubi dejstvo prema poveriocu kao besplatno raspolaganje po ZOO?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom je odricanje od nasledstva bez dejstva prema poveriocu, primenom čl. 280–285 ZOO.",
    reasoning:
      "Kod besplatnih raspolaganja pretpostavlja se znanje dužnika o šteti; za odricanje od nasledstva primenjuju se pravila o poklonu. Tužena kao baba primaoca ne može uspešno osporiti pretpostavke sauvestnosti iz čl. 281 st. 2–3 ZOO.",
    keywords: ["odricanje od nasledstva", "Paulijanska tužba", "čl. 281 st. 3 ZOO", "poklon", "poverilac"],
    related_articles: ["čl. 280–285 ZOO", "čl. 281 st. 4 ZOO"],
    headnote:
      "Odricanje u korist određenog naslednika može se pobiti u meri potrebnoj za namirenje dospelog potraživanja poverioca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5567/2019",
    legal_area: "commercial",
    legal_question:
      "Da li je za uspeh Paulijanske tužbe dovoljno dokazati dospelo potraživanje bez dokaza da dužnik nema druge imovine za namirenje?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio da insolventnost u smislu čl. 280 st. 2 ZOO mora biti dokazana, a nije dovoljno samo dospelo potraživanje.",
    reasoning:
      "Poverilja je dokazala visinu potraživanja, ali veštačenjem je utvrđena znatna imovina dužnika (vilevrednost u evrima). Bez dokaza da dužnik nema dovoljno sredstava za konkretno potraživanje nema štete u smislu zakona.",
    keywords: ["Paulijanska tužba", "insolventnost", "čl. 280 st. 2 ZOO", "dokaz", "revizija"],
    related_articles: ["čl. 280–281 ZOO"],
    headnote:
      "Teret dokazivanja 'nema dovoljno sredstava za ispunjenje' ostaje na poveriocu uprkos olakšicama za besplatna raspolaganja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4718/2023",
    legal_area: "commercial",
    legal_question:
      "Da li poklon stana dužnika sinu kao srodniku u pravoj liniji gubi dejstvo prema poveriocu sa dosuđenim novčanim potraživanjem?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je ugovor o poklonu bez dejstva prema tužiocu u meri namirenja potraživanja.",
    reasoning:
      "Formulacija 'smatra se' u čl. 280 st. 2 ZOO označava pretpostavku o šteti kada dužnik nema dovoljno sredstava posle radnje; u konkretnom slučaju su ispunjeni uslovi dospelosti, raspolaganje u korist srodnika i nemogućnost namirenja iz druge imovine. Tužba je blagovremena.",
    keywords: ["poklon", "Paulijanska tužba", "čl. 280 st. 2 ZOO", "srodstvo", "dospelost"],
    related_articles: ["čl. 280–285 ZOO"],
    headnote:
      "Kombinacija dospelog potraživanja i raspolaganja u korist bliskog srodnika često dovodi do uspeha Paulijanske tužbe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1257/2020",
    legal_area: "commercial",
    legal_question:
      "Da li kupoprodaja nepokretnosti između dužnika i rođenog brata jemca ispunjava uslove Paulijanske tužbe?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio primenu čl. 280–281 ZOO i usvajanje tužbe za pobijanje.",
    reasoning:
      "Dužnik nema nepokretnosti iz kojih bi se poverilac namirio; iz dela zarade u izvršenju proizilazi da potraživanje neće biti namireno u dogledno vreme. Poverilac nije dužan dokazivati naplatu od solidarnog dužnika DOO korisnika kredita pre uspeha Paulijanske tužbe protiv dužnika-raspolagača.",
    keywords: ["Paulijanska tužba", "jemac", "kupoprodaja", "čl. 280 ZOO", "revizija"],
    related_articles: ["čl. 280–281 ZOO"],
    headnote:
      "Teret dokazivanja štete fokusira se na imovinsko stanje dužnika koji je direktno učestvovao u osporavanoj kupoprodaji.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 317/2025",
    legal_area: "commercial",
    legal_question:
      "Da li je kupoprodaja nepokretnosti u stečaju pobijljiva po čl. 123 ZS kada saugovarač zna za reorganizaciju i namero oštećenja poverilaca?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženih i potvrdio pobijanje ugovora o kupoprodaji kao radnje namernog oštećenja poverilaca.",
    reasoning:
      "Namera dužnika proizlazi iz uloge zakonskog zastupnika prethodnika i uvida u poslovanje; zaključak nižih sudova o ispunjenosti čl. 119 i 123 ZS nije proizvoljan. Revizijski navodi suštinski osporavaju činjenice, što nije dozvoljeno u okviru posebne revizije po čl. 404 st. 1 ZPP.",
    keywords: ["pobijanje", "čl. 123 ZS", "reorganizacija", "kupoprodaja", "revizija"],
    related_articles: ["čl. 119", "čl. 123 ZS", "čl. 404 st. 1 ZPP"],
    headnote:
      "Namerno oštećenje u stečaju može se potkrepiti ulogom zastupnika i znanjem o restrukturiranju i klasama poverilaca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 430/2015",
    legal_area: "commercial",
    legal_question:
      "Da li se umesto poništaja celog darovnog ugovora može utvrditi relativna neefikasnost samo do visine dosuđenih potraživanja tužilaca?",
    court_position:
      "Apelacioni sud je preinačio presudu i utvrdio da darovni ugovor nema dejstvo prema tužiocima samo u delu potrebnom za naplatu njihovih potraživanja, odbijajući poništaj u celini.",
    reasoning:
      "Paulijanski institut iz čl. 280–285 ZOO cilja relativnu neefikasnost prema konkretnom poveriocu. Tužioci imaju dospelo potraživanje i dokaz štete; darovanje celokupne imovine srodnicima ispunjava uslove. Primena je čl. 394 tač. 4 ZPP za preinačenje.",
    keywords: ["Paulijanska tužba", "darovni ugovor", "relativna neefikasnost", "čl. 284 ZOO", "Gž"],
    related_articles: ["čl. 280–285 ZOO", "čl. 394 tač. 4 ZPP"],
    headnote:
      "Sud može preći sa traženog poništaja na utvrđenje ograničenog dejstva prema poveriocu kada to bolje odgovara institutu.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 4757/2020",
    legal_area: "commercial",
    legal_question:
      "Da li pobijanje pravnih radnji u stečaju briše poresku obavezu nastalu iz tih poslova i pravo na zateznu kamatu od dana stečaja?",
    court_position:
      "Privredni apelacioni sud je preinačio presudu i prihvatio poresko potraživanje po samooporezivanju, ali je ocenio tužbu nedozvoljenom za zateznu kamatu od dana stečaja do podnošenja nacrta deobe.",
    reasoning:
      "Poreska obaveza ostaje u prometu kao valjan osnov uprkos relativnom dejstvu pobijanja prema masi. Za kamatu u tom segmentu nije dozvoljena tužba. Zahtev za razlučno pravo van mase je odbijen kao neosnovan.",
    keywords: ["porez", "stečaj", "pobijanje", "kamata", "samooporezivanje"],
    related_articles: ["Zakon o porezu na dobit", "Zakon o PDV", "Zakon o stečaju"],
    headnote:
      "Pobijanje poslova u stečaju ne uklanja automatski poreske obaveze utvrđene samooporezivanjem.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1197/2020",
    legal_area: "commercial",
    legal_question:
      "Da li tužilac dokazuje nameru oštećenja poverilaca i znanje saugovarača za pobijanje kupoprodaje po čl. 123 ZS?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje tužbe za pobijanje ugovora o prodaji nepokretnosti i odbijanje privremene mere, jer nisu dokazani uslovi čl. 123 ZS niti verovatnoća za meru.",
    reasoning:
      "Za privremenu meru po ZIO nije učinjena verovatnoća potraživanja kada je primarni zahtev za pobijanje odbijen. Za čl. 449 st. 2 ZIO nedostaje opasnost od raspolaganja imovinom. Namerno oštećenje zahteva dokaz kumulativnih subjektivnih elemenata koji ovde nisu postojali.",
    keywords: ["pobijanje", "čl. 123 ZS", "privremena mera", "dokaz", "ZIO"],
    related_articles: ["čl. 123 ZS", "čl. 449 st. 2 ZIO"],
    headnote:
      "Bez dokaza o nameri dužnika i znanju saugovarača pobijanje po čl. 123 ne uspeva; privremena mere sledi istu logiku verovatnoće.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 1967/2022",
    legal_area: "commercial",
    legal_question:
      "Da li je jemstvo stečajnog dužnika za obaveze povezanog lica pobijljivo po čl. 123 st. 2 Zakona o stečaju?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da jemstvo predstavlja radnju namernog oštećenja bez dejstva prema stečajnoj masi.",
    reasoning:
      "Primenjuje se čl. 123 st. 2 ZS za obezbeđenje dato povezanom licu. Revizijski prigovor na kvalifikaciju jemstva kao posla bez naknade i na primenu roka iz čl. 122 umesto čl. 123 su neosnovani jer je meritorno primenjen osnov namernog oštećenja u roku od godinu dana pre stečaja.",
    keywords: ["jemstvo", "povezano lice", "čl. 123 st. 2 ZS", "stečaj", "revizija"],
    related_articles: ["čl. 119", "čl. 122–123 ZS"],
    headnote:
      "Jemstvo za dug povezanog lica može se kvalifikovati kao namerno oštećenje poverilaca uz posebni režim čl. 123 st. 2 ZS.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 123/2017",
    legal_area: "commercial",
    legal_question:
      "Da li je kupoprodaja nepokretnosti pobijljiva po čl. 123 i 124 ZS kada nije dokazana neznatna naknada niti namera oštećenja?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju stečajnog upravnika i potvrdio odbijanje tužbe za pobijanje, jer nisu ispunjeni posebni uslovi za te osnove.",
    reasoning:
      "Revident nije dokazao nameru oštećenja niti neznatnu naknadu u smislu čl. 123–124 ZS. Drugo i treće tuženi nemaju pasivnu legitimaciju u smislu čl. 129–130 ZS jer nisu protivnici pobijanja po zakonu.",
    keywords: ["pobijanje", "pasivna legitimacija", "čl. 129 ZS", "čl. 123–124 ZS", "revizija"],
    related_articles: ["čl. 123–124 ZS", "čl. 129–130 ZS"],
    headnote:
      "Pobijanje zahteva preciznu strukturnu podobnost tuženih i dokaz posebnih osnova, ne samo opštu sumnju štete.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4249/2020",
    legal_area: "procedural",
    legal_question:
      "Da li je revizija dozvoljena u sporu male vrednosti radi pobijanja ugovora o poklonu?",
    court_position:
      "Vrhovni kasacioni sud je odbacio reviziju kao nedozvoljenu jer vrednost predmeta spora nije prelazila cenzus od 3.000 evra.",
    reasoning:
      "Uslovi čl. 404 st. 1 ZPP za izuzetnu reviziju nisu ispunjeni; u sporu male vrednosti nema prostora za reviziju čak i kada se osporavaju rokovi Paulijanske tužbe. Nedostaju i identične presude za ujednačavanje prakse.",
    keywords: ["revizija", "cenzus", "ZPP", "Paulijanska tužba", "nedozvoljena revizija"],
    related_articles: ["čl. 404 st. 1 ZPP"],
    headnote:
      "Mala vrednost predmeta isključuje reviziju bez obzira na značaj pravnog pitanja za stranku.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 17291/2024",
    legal_area: "family",
    legal_question:
      "Da li poklon oca celokupne imovine radi izbegavanja izdržavanja može biti pobijen Paulijanskom tužbom u korist punoletnih ćerki?",
    court_position:
      "Vrhovni sud je potvrdio presudu kojom je poklon bez dejstva prema kćerkama-poveriocama u meri zaostalog izdržavanja.",
    reasoning:
      "Obustava izvršnih postupaka ne isključuje dokaz da tužilje ne mogu da se namire od dužnika bez imovine i prihoda. Dospelo potraživanje za izdržavanje postoji; insolventnost se dokazuje u odnosu na mogućnost namirenja, ne formalnim uspehom izvršenja.",
    keywords: ["izdržavanje", "Paulijanska tužba", "poklon", "insolventnost", "revizija"],
    related_articles: ["čl. 280–285 ZOO", "Porodični zakon"],
    headnote:
      "Zaštita prava na izdržavanje može podržati Paulijansku tužbu protiv raspolaganja imovinom radi izbegavanja obaveza.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 3379/2017",
    legal_area: "commercial",
    legal_question:
      "Da li je vansudsko poravnanje u restrukturiranju pobijljivo kao radnja namernog oštećenja poverilaca?",
    court_position:
      "Privredni apelacioni sud je preinačio prvostepenu presudu i usvojio pobijanje vansudskog poravnanja, utvrđujući nameru oštećenja i pogodovanje tuženog.",
    reasoning:
      "Prvostepeni sud je pogrešno ocenio da poravnanje otpisom dela duga nije štetno i da nema dokaza o nameri i znanju. Uz restrukturiranje i otvaranje stečaja okolnosti ukazuju na štetu za ostale poveziče na projektima; drugostepeni sud je pravilno primenio čl. 123 ZS.",
    keywords: ["vansudsko poravnanje", "restrukturiranje", "čl. 123 ZS", "stečaj", "Pž"],
    related_articles: ["čl. 119", "čl. 123 ZS", "čl. 10 ZOO"],
    headnote:
      "Poravnanje koje favorizuje jednog poverioca u dubokoj insolventnosti može se pobiti kao namerno oštećenje ostalih.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4095/2018",
    legal_area: "procedural",
    legal_question:
      "Da li je posebna revizija dozvoljena u imovinskom sporu čija vrednost ne prelazi 40.000 evra?",
    court_position:
      "Vrhovni kasacioni sud prvo nije prihvatio reviziju kao izuzetno dozvoljenu, zatim ju je odbacio kao nedozvoljenu zbog cenzusa vrednosti predmeta.",
    reasoning:
      "Čl. 404 st. 1–2 ZPP zahteva pređeni prag vrednosti za imovinske sporove osim ako nisu ispunjeni izuzeci. Pitanja čl. 280–281 i 285 ZOO u konkretnom slučaju ne opravdavaju ujednačavanje prakse revizijom.",
    keywords: ["revizija", "cenzus", "Paulijanska tužba", "ZPP", "nedozvoljena revizija"],
    related_articles: ["čl. 404 st. 1–2 ZPP"],
    headnote:
      "Imovinski prag i kriterijumi posebne revizije primenjuju se strogo i na sporove o pobijanju dužnikovih radnji.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 8761/2018",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepeni sud mora odlučiti o dokaznim predlozima tužioca za insolventnost dužnika i jemaca u Paulijanskom sporu?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu koja je odbila pobijanje poklona, jer sud nije izveo predložene dokaze o imovinskom stanju dužnika i jemaca.",
    reasoning:
      "Prvi uslov Paulijanske tužbe (dospelost) jeste ispunjen; za drugi uslov ostalo je nerazjašnjeno da li je poklon onemogućio naplatu. Tužilac je blagovremeno predložio uvid u spise izvršenja i proveru imovine jemaca; osporavanje prekluzije predloga nije prihvaćeno kao osnovano bez ispitivanja.",
    keywords: ["Paulijanska tužba", "dokazi", "insolventnost", "prekluzija predloga", "Gž"],
    related_articles: ["čl. 280–281 ZOO", "čl. 289 st. 3 ZPP"],
    headnote:
      "Sud mora razmotriti relevantne dokaze o imovini dužnika pre odbijanja Paulijanske tužbe zbog nedostatka štete.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4366/2011",
    legal_area: "commercial",
    legal_question:
      "Da li poklon nepokretnosti dužnika u korist ćerki gubi dejstvo prema poveriocu kada su ispunjeni uslovi čl. 280–281 ZOO?",
    court_position:
      "Apelacioni sud je odbio žalbu tuženih i potvrdio da poklon nema dejstva prema tužiocu jer su ćerke srodnici i postoji pretpostavka sauvestnosti, a besplatno raspolaganje nosi pretpostavku znanja dužnika.",
    reasoning:
      "Kod besplatnih raspolaganja ne traži se dokaz znanja trećeg lica iz čl. 281 st. 3; šteta po čl. 280 st. 2 pretpostavlja se kada nema sredstava za ispunjenje, uz mogućnost dokaza suprotnog od strane protivnika u propisanim granicama.",
    keywords: ["poklon", "Paulijanska tužba", "čl. 281 st. 3 ZOO", "srodstvo", "Gž"],
    related_articles: ["čl. 280–281 ZOO"],
    headnote:
      "Poklon u korist dece dužnika tipično zadovoljava pretpostavke Paulijanske tužbe kada je potraživanje dospelo.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1164/2019",
    legal_area: "commercial",
    legal_question:
      "Da li drugostepeni sud pogrešno ocenjuje pravni interes i insolventnost kod besplatnog poklona između dužnika i dece?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presude koje su odbile tužbu za pobijanje poklona i vratio predmet nižim sudovima.",
    reasoning:
      "Kod čl. 281 st. 3 ZOO ne traži se dokaz insolventnosti 'trećih lica' u smislu zabune nižih sudova; fokus je na dužniku bez sredstava za potraživanje. Tužilac je dokazao nemogućnost namirenja od dužnika i njegovih poklonoprimaca u izvršenju. Pravni interes za pobijanje postoji nezavisno od prethodnog tužbenog puta.",
    keywords: ["Paulijanska tužba", "čl. 281 st. 3 ZOO", "pravni interes", "revizija", "poklon"],
    related_articles: ["čl. 280–285 ZOO"],
    headnote:
      "Nižestepeni sud ne sme zahtevati pogrešan dokazni standard za štetu kod besplatnih raspolaganja u odnosu na čl. 280 st. 2.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5839/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li povreda privremene mere zabrane otuđenja čini poklon apsolutno ništavim u sporu poverioca?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu protiv presuda kojima je odbijen zahtev za ništavost poklona zaključenog uprkos meri.",
    reasoning:
      "Povreda privremene mere ne čini ugovor ništavim po službenoj ulozi, već može imati značaj za odgovornost za štetu. Poništaj zbog mana volje mogu tražiti samo ugovorne strane. Paulijanski put zaštite ostaje otvoren pod uslovima čl. 280–285 ZOO i roka iz čl. 285 st. 2.",
    keywords: ["ustavna žalba", "privremena mera", "poklon", "ništavost", "Paulijanska tužba"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 280–285 ZOO"],
    headnote:
      "Kršenje zabrane raspolaganja ne automatski ništavi ugovor; poverilac se oslanja na posebne institute zaštite.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3368/2015",
    legal_area: "commercial",
    legal_question:
      "Da li tužilja može tražiti utvrđenje apsolutne ništavosti kupoprodaje umesto pobijanja dužnikovih radnji radi namirenja potraživanja?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost, smatrajući da je tužbeni zahtev neadekvatan u odnosu na cilj zaštite iz čl. 280–285 ZOO.",
    reasoning:
      "Za relativnu neefikasnost prema poveriocu tužbom moraju biti obuhvaćeni svi pravni posredi u lancu (javna prodaja, darovanje trećim licima) koji stoje između dužnika i ispunjenja. Utvrđena ništavost jednog dela ne omogućava sama po sebi knjižno rešenje u upravnom postupku bez drugih zahteva.",
    keywords: ["Paulijanska tužba", "ništavost", "neadekvatan zahtev", "Gž", "kupoprodaja"],
    related_articles: ["čl. 280–285 ZOO"],
    headnote:
      "Poverilac mora odabrati odgovarajući pravni lek; ništavost u celini nije zamena za lanac pobijanja u Paulijanskom smislu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pvž 430/2016",
    legal_area: "commercial",
    legal_question:
      "Da li je rešenje o zaključenju stečajnog postupka zakonito ako je nerazumljivo u delu prenosa potraživanja i prodaje stečajnog dužnika?",
    court_position:
      "Privredni apelacioni sud je ukinuo rešenje o zaključenju stečaja nad stečajnom masom zbog protivrečnih i nejasnih razloga i nepotpunog utvrđivanja imovinskih i procesnih okolnosti.",
    reasoning:
      "Završna deoba i prenos potraživanja moraju biti precizno određeni da bi rešenje bilo izvršivo i zakonito. Žalbena ocena ukazuje na sumnju u ispunjenje uslova za zaključenje dok traju sporovi i nejasna imovinska kretanja.",
    keywords: ["zaključenje stečaja", "stečajna masa", "Pvž", "protivrečni razlozi"],
    related_articles: ["Zakon o stečaju"],
    headnote:
      "Zaključenje stečaja zahteva jasnu i proverljivu osnovu u pogledu preostalih imovinskih i sporodavnih pitanja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1794/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li je trajanje parničnog postupka od devetnaest godina u suprotnosti sa pravom na suđenje u razumnom roku?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku zbog neefikasnog postupanja sudova.",
    reasoning:
      "Ratione temporis ocena počinje od stupanja na snagu Ustava 2006, uzimajući u obzir i stanje predmeta na taj dan. Stečajni i poverilački elementi postupka ne opravdavaju sami po sebi ekstremno kašnjenje bez analize odgovornosti organa.",
    keywords: ["ustavna žalba", "razuman rok", "čl. 32 st. 1 Ustava", "trajanje postupka", "parnica"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 6 st. 1 EKPJ"],
    headnote:
      "Izuzetno dugo vođenje predmeta može predstavljati povredu ustavnog prava na efikasno suđenje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2171/2025",
    legal_area: "commercial",
    legal_question:
      "Da li kupci nepokretnosti od pokojnog dužnika mogu biti smatrani nesavesnim u Paulijanskom smislu ako su proverili javne knjige i nisu znali za potraživanje poverioca?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za poništaj kupoprodaje, utvrđujući savesnost kupaca koji su postupili uz proveru katastra.",
    reasoning:
      "Kod teretnog raspolaganja potrebna je kumulativno nesavesnost dužnika i trećeg lica koje je moralo znati za štetu. Prvostepeni sud je pravilno zaključio da kupci nisu znali za potraživanje tužioca i da su zaključili teretni posao savesno.",
    keywords: ["Paulijanska tužba", "teretna kupoprodaja", "savesnost", "javne knjige", "Gž"],
    related_articles: ["čl. 280–281 st. 1 ZOO"],
    headnote:
      "Dobra vera kupca utvrđena proverom javnih evidencija može isključiti uspeh Paulijanske tužbe protiv kupoprodaje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 729/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li je proizvoljno zanemarenje ugovora o primeni engleskog prava u sporu koji dodiruje stečajno pitanje?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i poništio presudu Vrhovnog kasacionog suda zbog povrede prava na pravično suđenje.",
    reasoning:
      "Nižestepeni sudovi su primenom domaćeg prava pored ugovorne klauzule o stranom pravu doneli odluku koja ne poštuje očekivanja stranaka u delu sticanja svojine. Stečajni aspekt ne isključuje automatski primenu stranog materijalnog prava gde je to ugovoreno, uzograničenja javnog poretka; međutim meritorna greška ovde ima karakter proizvoljnosti u odnosu na čl. 32 st. 1 Ustava.",
    keywords: ["ustavna žalba", "strano pravo", "stečaj", "pravično suđenje", "lex fori"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 175 ZS"],
    headnote:
      "Ustavni sud može poništiti VKS kada je primena prava očigledno arbitrarna u odnosu na ugovornu izbor prava i stranačka očekivanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6045/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li poverilac dužnika može tražiti utvrđenje ništavosti nasledničke izjave o odricanju u korist drugog naslednika?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost, smatrajući da je adekvatan pravni put tužba za pobijanje dužnikovih pravnih radnji.",
    reasoning:
      "Naslednička izjava je lična i poništaj zbog mana volje može tražiti samo naslednik. Odricanje u korist drugog naslednika sa posledicom štete poveriocu podleže pravilima o besplatnom raspolaganju iz čl. 281 st. 4 ZOO i Paulijanskoj zaštiti.",
    keywords: ["nasledstvo", "odricanje", "Paulijanska tužba", "poverilac", "Gž"],
    related_articles: ["čl. 214", "čl. 220 Zakona o nasleđivanju", "čl. 281 st. 4 ZOO"],
    headnote:
      "Poverilac ne može tražiti poništaj nasledničke izjave kao ništavosti; štita se pobijanjem dužnikovih radnji.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5198/2023",
    legal_area: "commercial",
    legal_question:
      "Da li je tužba za pobijanje poklona nepotpuna ako poklonoprimac pre prođe prodala stan trećem licu a tužilac ne obuhvati kupca?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe jer tužilac nije obuhvatio nužne suparničare — poklonoprimca i singularnog sledbenika kupca.",
    reasoning:
      "Po čl. 211 ZPP i pravilima o Paulijanskoj tužbi radi namirenja prodajom stana, kada je predmet prešao na 'NEW LIVING', tužbom su morali biti obuhvaćeni i novi vlasnik i prethodni nosilac prava kao nužni suparničari radi jedinstvenog rešenja.",
    keywords: ["Paulijanska tužba", "nužno suparničarstvo", "čl. 211 ZPP", "treće lice", "Gž"],
    related_articles: ["čl. 211 ZPP", "čl. 283–284 ZOO"],
    headnote:
      "Promena vlasništva na predmetu pobijanja zahteva proširenje tužbe na sve lica čiji je pravni položaj određujući za ishod.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3999/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li izvršni postupak koji traje više od devet godina krši pravo na suđenje u razumnom roku i pravo na pravično suđenje?",
    court_position:
      "Ustavni Sud je usvojio deo žalbe o razumnom roku u izvršnom postupku, a odbio deo o pravičnom suđenju u vezi sa prekluzivnim rokom Paulijanske tužbe.",
    reasoning:
      "Zakon o izvršenju i obezbeđenju naglašava hitnost postupka. Trajanje izvršenja koje prelazi razumnu meru može biti povreda čl. 32 st. 1 Ustava. Suprotno, primena čl. 285 ZOO o rokovima Paulijanske tužbe nije ocenjena kao proizvoljna u osporenom delu.",
    keywords: ["ustavna žalba", "izvršenje", "razuman rok", "Paulijanska tužba", "čl. 285 ZOO"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "ZIO"],
    headnote:
      "Izuzetno dugo izvršenje može biti neustavno; meritorna primena rokova ZOO u istom kontekstu može ostati neosporena.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3548/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li je odbijanje Paulijanske tužbe zbog nedokazane insolventnosti dužnika koji ima drugu imovinu proizvoljno?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu i potvrdio stav redovnih sudova da insolventnost u smislu čl. 280 st. 2 ZOO mora biti dokazana.",
    reasoning:
      "Pretpostavka štete iz čl. 280 st. 2 ne zamenjuje dokaz da dužnik nema dovoljno sredstava u konkretnoj pravnoj situaciji. Apelacioni sud u Novom Sadu pravilno je ocenio da tužilac nije dokazao nedostatak druge imovine dužnika.",
    keywords: ["ustavna žalba", "Paulijanska tužba", "insolventnost", "čl. 280 ZOO", "Gž Novi Sad"],
    related_articles: ["čl. 280–281 ZOO", "čl. 32 st. 1 Ustava RS"],
    headnote:
      "Ustavni sud ne zamenjuje Apelacioni sud kada primena ZOO nije očigledno proizvoljna.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1979/2019",
    legal_area: "commercial",
    legal_question:
      "Da li aneks ugovora o kupoprodaji koji ispravlja očiglednu grešku u ceni predstavlja štetnu radnju po čl. 119 ZS?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje pobijanja aneksa, jer aneks nije dao namirenje, obezbeđenje niti neznatnu naknadu već ispravku evidentne greške u osnovnom ugovoru.",
    reasoning:
      "Iako je dužnik bio u blokadi i nesolventnosti poznatoj kupcu, predmetni aneks po volji strana samo koriguje grešku u dokumentu bez promene ekonomskog efekta koji bi štetio poveriocima u smislu ZS.",
    keywords: ["aneks", "pobijanje", "stečaj", "ispravka greške", "čl. 119 ZS"],
    related_articles: ["čl. 119 ZS"],
    headnote:
      "Isključivo korektivni aneks bez nove imovinske koristi obično ne ispunjava posebne osnove pobijanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3827/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li poverilac gubi pravni interes za utvrđenje ništavosti poklona istekom roka za Paulijansku tužbu?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, poništio presudu Apelacionog suda i utvrdio povredu prava na pravično suđenje zbog proizvoljnog stava o gubitku pravnog interesa.",
    reasoning:
      "Rok iz čl. 285 ZOO reguliše Paulijansku zaštitu, dok ništavost po drugim osnovima može imati drugačiji režim interesa. Apelacioni sud je proizvoljno poistvetio istek Paulijanskog roka sa gubitkom legitimacije za ništavost bez analize predmeta i pravnih posledica.",
    keywords: ["ustavna žalba", "pravni interes", "Paulijanska tužba", "ništavost", "čl. 285 ZOO"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 280–285 ZOO"],
    headnote:
      "Ustavni sud koriguje proizvoljno mešanje instituta roka za pobijanje i pravnog interesa za drugačiji zahtev.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2145/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li je usvajanje Paulijanske tužbe protiv poklona proizvoljna primena čl. 280–285 ZOO?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu protiv presude Apelacionog suda u Kragujevcu koja je usvojila pobijanje radnji dužnika.",
    reasoning:
      "Ispitujući proizvoljnost, Ustavni Sud nije našao da je drugostepeni sud prekoračio diskreciju pri primeni instituta zaštite poverilaca od imovinskih raspolaganja insolventnog dužnika. Navodi podnosioca ostaju u okviru običnog neslaganja sa meritornom ocenom.",
    keywords: ["ustavna žalba", "Paulijanska tužba", "proizvoljnost", "Apelacioni sud", "poklon"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 280–285 ZOO"],
    headnote:
      "Meritorno usvajanje Paulijanske tužbe u apelacionom stepenu nije povreda Ustava ako nema očigledne proizvoljnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "St 27/2015",
    legal_area: "commercial",
    legal_question:
      "Da li je preuranjeno zaključiti stečaj nad stečajnom masom dok nisu okončani postupci unovčenja imovine i sporovi koji utiču na masu?",
    court_position:
      "Privredni apelacioni sud je ukinuo prvostepeno rešenje (predmet St 27/2015) o usvajanju završnog računa i zaključenju stečaja, jer zaključenje dovodi do gubitka subjektiviteta mase pre okončanja ključnih radnji.",
    reasoning:
      "U izreci prvostepenog rešenja postoje protivrečnosti u pogledu prenosa potraživanja iz parnica, statusa potraživanja i otvorenih poreskih i ustavnopravnih postupaka. Razrešeni upravnik i nagrada takođe ukazuju na nepotpunost postupka pre zatvaranja.",
    keywords: ["zaključenje stečaja", "stečajna masa", "završna deoba", "St", "Pvž"],
    related_articles: ["Zakon o stečaju"],
    headnote:
      "Zaključenje stečaja mora sačekati rešavanje otvorenih imovinskih i sporodavnih pitanja koja utiču na zakonitost završne deobe.",
    outcome: "remanded",
  },
]
