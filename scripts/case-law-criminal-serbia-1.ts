// scripts/case-law-criminal-serbia-1.ts
// Serbian criminal / fiscal-criminal case law (batches 1–3; source list complete).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_SERBIA_1: CaseLawInput[] = [
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz (broj predmeta nije naveden u citatu; ZZL primena blažeg KZ)",
    legal_area: "criminal",
    legal_question:
      "Da li je po zahtevu za zaštitu zakonitosti osnovano primeniti blaži Krivični zakonik (čl. 225. KZ od 1.3.2018) na ranije izvršeno delo poreske utaje kada iznos utaje ispod novog cenzusa?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev za zaštitu zakonitosti, preinačio pravnosnažne presude i oslobodio okrivljenog od optužbe za poresku utaju, primenivši obavezno blaži zakon koji je stupio na snagu posle izvršenja dela.",
    reasoning:
      "Izmene KZ („Sl. glasnik RS“, br. 94/2016) prebacuju poresku utaju u čl. 225. KZ; za osnovni oblik važi viši novčani prag (500.000 dinara). Po utvrđenom iznosu ispod nove granice delo više nije krivično; primena čl. 4 KZ i principa lex mitior zahteva oslobađanje.",
    keywords: ["zaštita zakonitosti", "poreska utaja", "blaži zakon", "lex mitior", "čl. 225. KZ"],
    related_articles: ["čl. 225. st. 1. KZ", "čl. 27. Zakon o izmenama KZ (94/2016)"],
    headnote: "Usvojen ZZL; blaži KZ isključuje krivičnu sankciju ispod novog cenzusa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 158/2020",
    legal_area: "criminal",
    legal_question:
      "Da li predstavlja povredu načela ne bis in idem osuđivanje za poresku utaju ako su ranije vođeni prekršajni postupci sa drugačijim činjeničnim opisom?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti branioca, smatrajući da nije reč o presuđenoj stvari jer se činjenični opisi prekršaja bitno razlikuju od opisa krivičnog dela poreske utaje.",
    reasoning:
      "Krivično delo iz čl. 229. KZ zahteva poseban okvir umišljaja i radnji (npr. neprijavljivanje PDV-a i poreza po odbitku u većem iznosu); prekršajni postupci ne pokrivaju isti predmet u smislu čl. 4 ZKP o ne bis in idem.",
    keywords: ["ne bis in idem", "poreska utaja", "prekršaj", "ZZL"],
    related_articles: ["čl. 229. KZ", "čl. 4. Zakonik o krivičnom postupku"],
    headnote: "Odbijen ZZL; nema identiteta predmeta sa ranijim prekršajima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 599/2014",
    legal_area: "criminal",
    legal_question:
      "Da li je moguće postojanje poreske utaje ako stvarni promet robe po ulaznim računima nije izvršen, već su podaci uneti u knjige i prijavu?",
    court_position:
      "Vrhovni kasacioni sud je potvrdio da radnje okrivljene predstavljaju poresku utaju, smatrajući irelevantnim da promet nije stvarno ostvaren jer se radnja izvršenja sastoji u lažnom prikazivanju podataka radi izbegavanja plaćanja poreza.",
    reasoning:
      "Produženi oblik iz čl. 229. st. 2. u vezi sa st. 1. KZ obuhvata davanje lažnih podataka o prihodima i prikrivanje podataka značajnih za PDV; fiktivni promet i lažna prijava ostvaruju obeležja bez obzira na fizički promet.",
    keywords: ["poreska utaja", "PDV", "fiktivni promet", "lažni podaci"],
    related_articles: ["čl. 229. st. 1. i 2. KZ"],
    headnote: "Utvrđena krivična odgovornost uprkos odsustvu stvarnog prometa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 149/2024",
    legal_area: "criminal",
    legal_question:
      "Da li izbegavanje plaćanja PDV-a i poreza na dohodak građana iz istog neprijavljenog prihoda predstavlja jedno produženo krivično delo ili dva odvojena dela?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev za zaštitu zakonitosti i preinačio presude, utvrdivši da se radi o jednom produženom krivičnom delu poreske utaje po čl. 61. KZ u vezi sa čl. 225. KZ, a ne o dva odvojena dela.",
    reasoning:
      "Ista neprijavljena ekonomska baza i jedinstveni umišljaj povezuju izbegavanje različitih vrsta poreza u celinu koja ispunjava okolnosti iz čl. 61. st. 1. KZ (vremenska povezanost, istovrsnost predmeta, jedinstven umišljaj).",
    keywords: ["produženo krivično delo", "poreska utaja", "PDV", "dohodak građana", "čl. 61. KZ"],
    related_articles: ["čl. 61. KZ", "čl. 225. KZ"],
    headnote: "Jedinstvena kvalifikacija za PDV i dohodak iz istog prikrivanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 1154/2021",
    legal_area: "criminal",
    legal_question:
      "Da li prodaja „na crno“ može predstavljati krivično delo poreske utaje po starom čl. 229. KZ koji zahteva zakonito stečene prihode?",
    court_position:
      "Apelacioni sud u Beogradu je potvrdio oslobađajuću presudu, primenivši blaži zakon iz vremena izvršenja po kome su radnje odnosile na zakonito stečene prihode; kako su prihodi od prodaje na crno nezakoniti, nema obeležja dela.",
    reasoning:
      "Bitan element poreske utaje bio je neprijavljivanje zakonito stečenog prihoda; kod nezakonitog prihoda radnje ne ulaze u tipičnost čl. 229. KZ. Sud je ispitao i druge kvalifikacije (zloupotreba iz čl. 238 KZ, prevara iz čl. 223 KZ) i našao da nisu ostvarene.",
    keywords: ["poreska utaja", "zakonito stečen prihod", "oslobađajuća presuda", "čl. 229. KZ"],
    related_articles: ["čl. 229. KZ", "čl. 238. KZ", "čl. 223. KZ"],
    headnote: "Potvrđeno oslobađanje; nezakonit prihod isključuje tip poreske utaje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1015/2022",
    legal_area: "criminal",
    legal_question:
      "Da li je osnovan zahtev za zaštitu zakonitosti kada je okrivljeni osuđen za poresku utaju po čl. 225. KZ uz primenu blažeg zakona i utvrđen iznos preko 500.000 dinara?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti kao neosnovan, utvrdivši da su ostvarena sva obeležja čl. 225. st. 1. KZ i da je blaži zakon pravilno primenjen u odnosu na raniji čl. 229. st. 1. KZ.",
    reasoning:
      "Okrivljeni kao direktor registrovanog društva ostvaruje zakonite prihode poslovanja, pa se argument o nezakonitosti prihoda odbacuje. Iznos prelazi prag iz čl. 225. KZ; formalna zamerka na citiranje SG 94/16 ne menja zakonitost.",
    keywords: ["poreska utaja", "ZZL", "blaži zakon", "čl. 225. KZ"],
    related_articles: ["čl. 225. st. 1. KZ", "čl. 229. st. 1. KZ (istorijski)"],
    headnote: "Odbijen ZZL; potvrđena osuda i primena blažeg KZ.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1373/2019",
    legal_area: "criminal",
    legal_question:
      "Da li novi čl. 225. KZ predstavlja teži ili blaži zakon u odnosu na stari čl. 229. KZ za isticanje povrede iz čl. 439. tačka 2) ZKP?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti u delu o povredi krivičnog zakona, smatrajući da nije povređen princip blažeg zakona jer se novi čl. 225. KZ materijalno ne razlikuje u štetnosti od ranijeg čl. 229. KZ u konkretnoj konstelaciji.",
    reasoning:
      "Kvalifikovani oblik poreske utaje i pragovi novčanih obaveza moraju se porediti u celini; navodi podnosioca ZZL ne pokazuju nezakonitu primenu u smislu čl. 439. tačka 2) ZKP.",
    keywords: ["ZZL", "blaži zakon", "čl. 225. KZ", "čl. 229. KZ"],
    related_articles: ["čl. 439. tačka 2. ZKP", "čl. 225. KZ", "čl. 229. KZ"],
    headnote: "Odbijen ZZL po čl. 439. tačka 2) ZKP.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 192/2025",
    legal_area: "criminal",
    legal_question:
      "Kako se računa zastarelost krivičnog gonjenja za produženo krivično delo poreske utaje i da li radnje predstavljaju poresku utaju ili drugo delo?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da kod produženog dela zastarelost teče od poslednje radnje i da se kvalifikacija ceni prema ukupnoj težini, uz prag preko 7.500.000 dinara za najteži oblik.",
    reasoning:
      "Čl. 229. st. 1–3. KZ uređuju osnovni i kvalifikovane oblike; zajedničko delovanje okrivljenih sa jedinstvenim umišljajem i istim trajnim odnosom podržava kvalifikaciju kao produženu poresku utaju.",
    keywords: ["produženo krivično delo", "zastarelost", "poreska utaja", "čl. 229. KZ"],
    related_articles: ["čl. 229. KZ", "čl. 61. KZ"],
    headnote: "Odbijen ZZL; zastarelost od poslednje radnje u produženom delu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 112/2013",
    legal_area: "criminal",
    legal_question:
      "Da li je Apelacioni sud pogrešno ocenio da nedostaje element zakonito stečenog prihoda kod poreske utaje zbog korišćenja računa fantomskih firmi?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev tužioca (javnog tužioca) i utvrdio da je drugostepeni sud pogrešno oslobodio okrivljenog, jer se pravi razliku između zakonite delatnosti, delatnosti bez odobrenja i potpuno nezakonite delatnosti; korišćenje faktura fantomskih firmi ne isključuje automatski zakonit prihod u smislu čl. 229. KZ.",
    reasoning:
      "Element zakonito stečenih prihoda ne ispadaju samo zbog etikete „fantomska firma“ ako je obveznik obavljao registrovanu delatnost; drugostepeni zaključak da promet sa nepostojećim licima isključuje tipičnost je preširok.",
    keywords: ["poreska utaja", "fantomska firma", "zakonito stečen prihod", "ZZL"],
    related_articles: ["čl. 229. st. 1. KZ"],
    headnote: "Usvojen ZZL u korist gonjenja; vraćanje na meritorno stanje osude.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 8/2024",
    legal_area: "criminal",
    legal_question:
      "Da li preinačenje oslobađajuće presude u osudu za pranje novca može da se zasniva na utvrđenju da je novac društva „prljavi“ novac trećeg lica, a ne okrivljenog?",
    court_position:
      "Apelacioni sud u Beogradu je preinačio oslobađajuću presudu i oglašavao okrivljene krivim za pranje novca, utvrdivši da su fiktivni prenosi nepokretnosti i udela služili prikrivanju nezakonitog porekla imovine stečene trgovinom drogom.",
    reasoning:
      "Odbrana zasniva se na ranoj presudi za poresku utaju i na tome da fiktivni vlasnik ne može biti poreski obveznik; apelacioni sud smatra te navode bez uticaja na kvalifikaciju pranja novca u ovom predmetu jer su činjenice optužnice predmet dokaznog postupka.",
    keywords: ["pranje novca", "poreska utaja", "fiktivni prenos", "Posebno odeljenje"],
    related_articles: ["čl. 245. KZ", "čl. 229. KZ"],
    headnote: "Preinačena presuda; osuda za pranje novca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 3/2021",
    legal_area: "criminal",
    legal_question:
      "Da li je dozvoljeno sabirati poreske obaveze iz različitih poreskih perioda radi ispunjenja novčanog praga za teži oblik poreske utaje?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev za zaštitu zakonitosti, ukinuo pravnosnažne presude i vratio predmet na ponovno odlučivanje jer su sudovi sabirali obaveze suprotno Zakonu o porezu na dohodak građana.",
    reasoning:
      "Objektivni uslov iz čl. 229. st. 2. KZ zahteva prelazak praga u okviru pravila o obračunskim periodima; mešanje više godina u jedan iznos vodi do pogrešne kvalifikacije i primene zakona koji se ne može primeniti.",
    keywords: ["poreska utaja", "sabiranje poreza", "ZZL", "ukidanje presude"],
    related_articles: ["čl. 229. st. 2. KZ", "čl. 99–101. Zakon o porezu na dohodak građana"],
    headnote: "Ukidanje zbog sabiranja obaveza iz različitih perioda.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 986/2019",
    legal_area: "criminal",
    legal_question:
      "Da li postoji krivično delo „utaja poreza na kapital“ ako takav porez ne postoji u pravnom sistemu?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev za zaštitu zakonitosti, ukinuo presude i vratio predmet, jer je okrivljeni osuđen za utaju nepostojeće vrste poreza umesto za prihode od kapitala koje uređuje Zakon o porezu na dohodak građana.",
    reasoning:
      "Krivično delo poreske utaje postoji samo za prihode koji su predmet oporezivanja po posebnim zakonima; materijalnopravna greška u oznaci poreza čini odluku nezakonitom po čl. 439. tačka 2) ZKP.",
    keywords: ["poreska utaja", "porez na prihod od kapitala", "pogrešna kvalifikacija", "ZZL"],
    related_articles: ["čl. 225. KZ", "čl. 61. Zakon o porezu na dohodak građana"],
    headnote: "Ukidanje zbog nemoguće pravne kvalifikacije „poreza na kapital“.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 8/2023",
    legal_area: "criminal",
    legal_question:
      "Da li je moguće primeniti odredbe Zakona o porezu na dohodak građana koje nisu bile na snazi u inkriminisanom periodu radi utvrđivanja poreske utaje?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev za zaštitu zakonitosti, ukinuo presude i vratio predmet jer su sudovi sabirali obaveze i pozivali se na čl. 99–101 ZPDG koji nisu važili za relevantno vreme.",
    reasoning:
      "Činjenični opis vezuje delo za period mart–maj 2018; primena kasnijeg ili pogrešnog poreskog propisa predstavlja povredu krivičnog zakona u smislu nezakonite primene materijalnog prava.",
    keywords: ["poreska utaja", "primena zakona u vremenu", "sabiranje obaveza", "ZZL"],
    related_articles: ["čl. 225. st. 1. KZ", "čl. 99–101. Zakon o porezu na dohodak građana"],
    headnote: "Ukidanje zbog primene propisa koji nije bio na snazi.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1395/2022",
    legal_area: "criminal",
    legal_question:
      "Da li je sabiranje poreza na zaradu i doprinosa iz više meseci u jedan iznos od preko 5.000.000 dinara zakonito za kvalifikovani oblik čl. 225. st. 2. KZ?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev za zaštitu zakonitosti, ukinuo pravnosnažne presude i vratio predmet jer je sabiranje suprotno Zakonu o porezu na dohodak građana i pravilima o obračunu.",
    reasoning:
      "Obaveznik mora obračunavati i prijavljivati obaveze u propisanim periodima; jedinstven iznos nastao spajanjem različitih vrsta davanja ne može direktno poslužiti kao kvalifikator bez pojedinačnog pravnog osnova.",
    keywords: ["poreska utaja", "sabiranje", "čl. 225. st. 2. KZ", "ZZL"],
    related_articles: ["čl. 225. st. 2. KZ", "Zakon o porezu na dohodak građana"],
    headnote: "Usvojen ZZL zbog sabiranja obaveza iz različitih poreskih perioda.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1183/2022",
    legal_area: "criminal",
    legal_question:
      "Da li neprijavljivanje prihoda od neregistrovane prodaje poljoprivrednih proizvoda može biti poreska utaja po čl. 225. st. 1–2. KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da opisane radnje sadrže sva obeležja poreske utaje, uključujući prihode koji podležu oporezivanju po Zakonu o porezu na dohodak građana i ZPPP.",
    reasoning:
      "Prihodi od prodaje poljoprivrednih proizvoda ulaze u druge prihode fizičkog lica; neprijavljivanje uz pređeni prag čini osnovni pa i teži oblik u zavisnosti od iznosa.",
    keywords: ["poreska utaja", "poljoprivredni prihodi", "čl. 225. KZ"],
    related_articles: ["čl. 225. st. 1–2. KZ", "čl. 85. Zakon o porezu na dohodak građana"],
    headnote: "Odbijen ZZL; potvrđena kvalifikacija poreske utaje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 277/2015",
    legal_area: "criminal",
    legal_question:
      "Da li neprijavljivanje prihoda radi delimičnog izbegavanja poreza u iznosu preko 150.000 dinara ispunjava čl. 229. st. 1. KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da radnje sadrže sva bitna obeležja poreske utaje u osnovnom obliku, uključujući nameru delimičnog izbegavanja.",
    reasoning:
      "Radnja izvršenja obuhvata i neprijavljivanje zakonito stečenih prihoda od značaja za obavezu; subjektivni element obuhvata umišljaj i nameru za delimično izbegavanje.",
    keywords: ["poreska utaja", "čl. 229. st. 1. KZ", "ZZL"],
    related_articles: ["čl. 229. st. 1. KZ"],
    headnote: "Odbijen ZZL; potvrđena osnova kvalifikacije.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz OK 33/2021",
    legal_area: "criminal",
    legal_question:
      "Da li je za pranje novca neophodna pravnosnažna presuda za predikatno krivično delo i da li je dekriminalizacija povećanjem praga uticala na staru osudu za poresku utaju?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahteve za zaštitu zakonitosti u predmetu pranja novca i poreske utaje, potvrdivši da predikatno delo ne mora biti pravnosnažno osuđeno i da su žalbene ocene drugostepenog suda o novim izmenama KZ dovoljno obrazložene.",
    reasoning:
      "Institut pranja novca ne zavisi od prethodnog kaznenog lista u istoj meri kao od dokaza o nezakonitom poreklu; sabiranje poreskih obaveza preko više godina za stari režim obrađeno je u obrazloženju drugostepenog suda.",
    keywords: ["pranje novca", "poreska utaja", "predikatno delo", "ZZL"],
    related_articles: ["čl. 245. KZ", "čl. 225. KZ"],
    headnote: "Odbijeni ZZL u predmetu pranja novca i poreske utaje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1181/2020",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila apsolutna zastarelost krivičnog gonjenja za poresku utaju kada se obaveza vezuje za datum pozajmice i uplate kupoprodajne cene akcija?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, smatrajući da rok zastarelosti treba računati od prestanka protivpravnog stanja odnosno relevantnih radnji, uključujući pokretanje likvidacije preduzeća.",
    reasoning:
      "Primena čl. 229. KZ i pravila o kontinuitetu poreske obaveze; tužiteljski račun zastarelosti od datuma pojedinačne transakcije ne prihvata se kao merodavan ako postoji lanac radnji.",
    keywords: ["zastarelost krivičnog gonjenja", "poreska utaja", "ZZL"],
    related_articles: ["čl. 229. KZ", "čl. 103–104. KZ"],
    headnote: "Odbijen ZZL po pitanju apsolutne zastarelosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 116/2025",
    legal_area: "criminal",
    legal_question:
      "Da li je pravilna primena blažeg zakona, kvalifikacija kao produžene poreske utaje i odluka o oduzimanju imovinske koristi za period 2009?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti kao neosnovan, potvrdivši pravilnost primene KZ koji je važio u vreme poslednje inkriminacije i odluke o imovinskoj koristi.",
    reasoning:
      "Vreme izvršenja vezuje se za poslednju radnju u produženom delu; pragovi iz čl. 229. KZ u istorijskoj verziji pravilno su primenjeni u odnosu na okrivljenog.",
    keywords: ["produženo krivično delo", "blaži zakon", "imovinska korist", "poreska utaja"],
    related_articles: ["čl. 225. KZ", "čl. 229. KZ", "čl. 61. KZ"],
    headnote: "Odbijen ZZL; potvrđena osuda i imovinska sankcija.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 7/2025",
    legal_area: "criminal",
    legal_question:
      "Da li ukidanje presude protiv više okrivljenih za prevare u TV kvizovima i poresku utaju može da počiva na prekoračenju optužbe i sabiranju poreskih obaveza?",
    court_position:
      "Apelacioni sud je većinom ukinuo presudu protiv četrnaest lica zbog prevare i poreske utaje, utvrdivši bitne povrede postupka uključujući prekoračenje optužbe i nezakonito sabiranje poreskih obaveza iz različitih perioda.",
    reasoning:
      "Jedinstvene novčane kazne i složena kumulacija zahtevaju jasnu vezu sa optužnicom i pojedinačnim poreskim periodima; narušena zakonitost opravdava ukidanje.",
    keywords: ["prevara", "poreska utaja", "prekoračenje optužbe", "ukidanje presude"],
    related_articles: ["čl. 208. KZ", "čl. 229. KZ", "čl. 61. KZ"],
    headnote: "Ukidanje presude zbog bitnih povreda postupka i sabiranja poreza.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1398/2018",
    legal_area: "criminal",
    legal_question:
      "Da li argument da prihodi nisu zakoniti jer su fakture od dobavljača pa obveznik nije dužnik po PDV isključuje poresku utaju?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da su u radnjama ostvarena sva obeležja poreske utaje jer je obveznik lažno prikazao nabavku i koristio neosnovan odbitak PDV u većem iznosu.",
    reasoning:
      "Registrovano društvo posluje u zakonitim okvirima delatnosti; odbrane o formalnom poreskom dužniku na računu ne ukidaju krivičnu odgovornost za lažne podatke u knjigama i prijavama.",
    keywords: ["poreska utaja", "PDV", "odbitak", "lažni podaci"],
    related_articles: ["čl. 229. KZ", "Zakon o PDV"],
    headnote: "Odbijen ZZL; potvrđena osnova osude.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 290/2022",
    legal_area: "criminal",
    legal_question:
      "Da li zadržavanje gotovine od prodaje vozila van računa društva isključuje krivično delo poreske utaje jer navodno nema poreskog položaja?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, smatrajući neosnovanim navode da radnje ne predstavljaju poresku utaju jer su prihodi tretirani kao drugi prihodi podležni oporezivanju.",
    reasoning:
      "Čl. 229. st. 1–3. KZ obuhvata prikrivanje podataka i pragove za kvalifikovane oblike; investiranje u stanove ne menja krivičnopravnu kvalifikaciju bez dokaza o drugačijem poreskom tretmanu.",
    keywords: ["poreska utaja", "gotovina", "prihod", "čl. 229. KZ"],
    related_articles: ["čl. 229. st. 1–3. KZ"],
    headnote: "Odbijen ZZL; potvrđena teža kvalifikacija.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1149/2023",
    legal_area: "criminal",
    legal_question:
      "Da li je pravilna primena blažeg zakona kada je okrivljeni osuđen za pomoć u poreskoj utaji po čl. 229. st. 3. KZ za fiktivne račune bakarnih blokova?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev u delu o povredi krivičnog zakona jer je blaži zakon pravilno primenjen, a u ostalom delu ga je odbacio kao nedozvoljen jer osporava činjenično stanje.",
    reasoning:
      "Zaštita zakonitosti po čl. 485. st. 4. ZKP ne dopušta ponavljanje spornih činjenica; meritorno je utvrđeno davanje fiktivnih računa i zloupotreba odbitka PDV.",
    keywords: ["poreska utaja", "pomaganje", "ZZL", "čl. 229. KZ"],
    related_articles: ["čl. 229. st. 3. KZ", "čl. 35. KZ"],
    headnote: "Delimično odbijen, delimično odbačen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 630/2023",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila apsolutna zastarelost krivičnog gonjenja za jedno od više kumulativno osuđenih krivičnih dela u istoj presudi?",
    court_position:
      "Vrhovni kasacioni sud je delimično usvojio zahtev za zaštitu zakonitosti, preinačio presude, odbio optužbu za jedno delo zbog apsolutne zastarelosti i izrekao novu jedinstvenu kaznu uz umanjenje oduzete koristi.",
    reasoning:
      "Za različita kumulisana dela primenjuju se posebna pravila zastarelosti iz čl. 103–104. KZ; gde je zastarelost nastupila, optužba se odbija samo za taj segment uz preraspodelu kazni.",
    keywords: ["zastarelost", "kumulacija kazni", "ZZL", "poreska utaja"],
    related_articles: ["čl. 103–104. KZ", "čl. 229. KZ", "čl. 173a ZPPP"],
    headnote: "Delimično usvojen ZZL; odbijanje optužbe za zastarelo delo.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 460/2018",
    legal_area: "criminal",
    legal_question:
      "Da li izreka sa dva stava o dva produžena krivična dela poreske utaje mora posebno navesti svaku alternativnu radnju iz čl. 229. KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, utvrdivši da izreka sadrži sva obeležja dva produžena dela poreske utaje jer je jasno opisano neprijavljivanje zakonitog prihoda sa prelaskom praga od 1.500.000 dinara.",
    reasoning:
      "Alternativne radnje iz čl. 229. KZ ne moraju sve biti navedene ako je konkretizovana jedna varijanta izvršenja koja pokriva fakturu predmeta.",
    keywords: ["poreska utaja", "izreka presude", "produženo delo", "ZZL"],
    related_articles: ["čl. 229. st. 2. KZ", "čl. 61. KZ"],
    headnote: "Odbijen ZZL; izreka je dovoljno jasna.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1088/2023",
    legal_area: "criminal",
    legal_question:
      "Da li je za produženu poresku utaju u periodu 2017–2018 pravilno primenjen KZ koji je blaži po kazni od ranijeg propisa?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahteve za zaštitu zakonitosti, potvrdivši da su nižestepeni sudovi pravilno primenili blaži zakon u pogledu zaprećene kazne za čl. 225. KZ.",
    reasoning:
      "Uporedni prikaz kazni iz čl. 225. st. 1. KZ u odnosu na ranije norme pokazuje povoljniji režim za okrivljenog u konkretnom vremenskom okviru.",
    keywords: ["blaži zakon", "poreska utaja", "čl. 225. KZ", "ZZL"],
    related_articles: ["čl. 225. st. 1–2. KZ", "čl. 61. KZ"],
    headnote: "Odbijeni ZZL; potvrđena primena blažeg KZ.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1124/2017",
    legal_area: "criminal",
    legal_question:
      "Da li izreka sadrži sva obeležja poreske utaje ako se navodima o nedostatku namere osporava činjenično stanje?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, smatrajući da izreka obuhvata objektivna i subjektivna obeležja čl. 229. st. 1–2. KZ, a osporavanje namere predstavlja nedozvoljeno ponavljanje činjeničnog spora.",
    reasoning:
      "ZZL po čl. 439. tačka 1) ZKP ne služi za reviziju činjeničnih nalaza nižestepenih sudova o umišljaju i nameri kada su već obrazloženi.",
    keywords: ["poreska utaja", "namera", "ZZL", "čl. 229. KZ"],
    related_articles: ["čl. 229. KZ", "čl. 439. ZKP"],
    headnote: "Odbijen ZZL; osporavanje činjenica nije dozvoljeno.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1321/2021",
    legal_area: "criminal",
    legal_question:
      "Da li je poslednja izmena KZ koja povećava minimum kazne zatvora za poresku utaju merodavna za ocenu blažeg zakona?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, utvrdivši da su sudovi pravilno primenili blaži zakon iz vremena izvršenja jer je iako kazna ostala ista, raniji zakon imao viši prag novčanog uslova inkriminacije.",
    reasoning:
      "Po čl. 5. KZ strožiji minimum zatvora iz novije izmene ne ulazi u analizu ako je raniji zakon blaži po iznosu utaje; lex mitior zahteva poređenje svih relevantnih elemenata.",
    keywords: ["blaži zakon", "poreska utaja", "čl. 5. KZ", "ZZL"],
    related_articles: ["čl. 5. KZ", "čl. 225. KZ", "čl. 229. KZ"],
    headnote: "Odbijen ZZL; potvrđena ispravna primena lex mitior.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1403/2022",
    legal_area: "criminal",
    legal_question:
      "Da li je sabiranje godišnjih poreskih obaveza na dohodak i doprinose u jedan iznos od preko 5.000.000 dinara zakonito za čl. 225. st. 2. KZ?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev za zaštitu zakonitosti, ukinuo pravnosnažne presude i vratio predmet jer je primenjeno sabiranje na godišnjem nivou suprotno ZPDG koji zahteva obračun po svakoj pojedinačnoj isplati.",
    reasoning:
      "Objektivni uslov za čl. 225. st. 2. KZ mora proizaći iz zakonitog obračunskog modela; greška u primeni čl. 85. ZPDG i pravila o isplatama vodi do primene neprimjenjivog zakona.",
    keywords: ["poreska utaja", "sabiranje", "dohodak građana", "ZZL"],
    related_articles: ["čl. 225. st. 2. KZ", "čl. 85. Zakon o porezu na dohodak građana"],
    headnote: "Usvojen ZZL zbog sabiranja obaveza na godišnjem umesto po isplati.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 43/2025",
    legal_area: "criminal",
    legal_question:
      "Da li prodaja stanova i prihod ostvaren naplatom na drugačiji način ostaje zakonit prihod u smislu poreske utaje kada je primenjen noviji, blaži KZ?",
    court_position:
      "Vrhovni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši pravilnu primenu blažeg zakona i da su prihodi od prodaje stanova zakoniti bez obzira na način naplate.",
    reasoning:
      "Poređenje čl. 229. st. 1. KZ (72/09) i čl. 225. st. 1. KZ (35/19) po pragu od 150.000 odnosno 1.000.000 dinara; meritorna ocena nižih sudova o zakonitosti prihoda ostaje neosporena u dozvoljenom delu ZZL.",
    keywords: ["poreska utaja", "blaži zakon", "ZZL", "prihod od prodaje stanova"],
    related_articles: ["čl. 229. st. 1. KZ", "čl. 225. st. 1. KZ"],
    headnote: "Odbijen ZZL; potvrđena primena blažeg KZ i zakonitost prihoda.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 344/2018",
    legal_area: "criminal",
    legal_question:
      "Da li neprijavljivanje prometa stoke i PDV-a pravnom licu ispunjava obeležja poreske utaje po čl. 229. KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da izreka sadrži sva bitna obeležja dela, uključujući alternativnu radnju neprijavljivanja zakonito stečenog prihoda.",
    reasoning:
      "Poljoprivredni proizvođač koji ne evidentira promet, ne izdaje račune i ne podnosi prijave ostvaruje radnju izvršenja iz čl. 229. KZ uz pređeni prag; ostali navodi ZZL o nepotpunosti izreke ocenjeni su kao nedozvoljeni.",
    keywords: ["poreska utaja", "PDV", "poljoprivreda", "ZZL"],
    related_articles: ["čl. 229. KZ", "Zakon o PDV"],
    headnote: "Odbijen ZZL; potvrđena kvalifikacija poreske utaje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž2-Po1 219/2022",
    legal_area: "criminal",
    legal_question:
      "Ko je stvarno i mesno nadležan za krivični postupak protiv više okrivljenih za poresku utaju kada je delo izvršeno preko pravnog lica sa sedištem u Beogradu?",
    court_position:
      "Apelacioni sud u Beogradu je odbio žalbu i potvrdio rešenje Višeg suda kojim je predmet ustupan Trećem osnovnom sudu u Beogradu kao stvarno i mesno nadležnom.",
    reasoning:
      "Mesna nadležnost se vezuje za sedište pravnog lica preko koga je delo izvršeno; Viši sud u Beogradu pravilno se oglasio nenadležnim i ustupio predmet osnovnom sudu.",
    keywords: ["mesna nadležnost", "poreska utaja", "ustupanje predmeta"],
    related_articles: ["čl. 229. KZ", "ZKP (nadлежност)"],
    headnote: "Potvrđena nadležnost Trećeg osnovnog suda u Beogradu.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 25/2014",
    legal_area: "criminal",
    legal_question:
      "Da li je prvostepena presuda u predmetu organizovanog kriminala i poreske utaje zakonita u delu oslobađanja i osuđivanja više okrivljenih?",
    court_position:
      "Apelacioni sud je potvrdio oslobađajući deo za deo okrivljenih, uvažio žalbe okrivljenih za tri lica ukidajući osuđujući deo i vratio predmet na ponovno suđenje zbog bitnih povreda postupka.",
    reasoning:
      "Za udruživanje iz čl. 346. st. 4. u vezi sa st. 2. KZ ocenjeno je da optužnica i izreka ne podržavaju kvalifikaciju u odnosu na opis radnji i iznos praga; za ostale delove presude žalbe su odbijene kao neosnovane.",
    keywords: ["organizovani kriminal", "poreska utaja", "ukidanje presude", "bitne povrede"],
    related_articles: ["čl. 346. KZ", "čl. 229. st. 3. KZ"],
    headnote: "Delimično ukidanje; vraćanje na ponovno suđenje za deo okrivljenih.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž.1 220/2017",
    legal_area: "criminal",
    legal_question:
      "Kako se računa rok zastarelosti za produženo krivično delo poreske utaje kada je kvalifikovan teži oblik po zbiru iznosa?",
    court_position:
      "Apelacioni sud je ukio prvostepenu presudu koja je odbacila optužbu zbog zastarelosti, smatrajući da se kod produženog dela rok računa od poslednje radnje, a zatim prema kvalifikovanom obliku dela.",
    reasoning:
      "Ako tužilac dokaže jedinstven umišljaj i zbir iznosa koji opravdava čl. 229. st. 2. KZ, zastarelost počinje od poslednje inkriminacije; primena čl. 5. KZ za blaži zakon u vreme izvršenja ostaje merodavna.",
    keywords: ["zastarelost", "produženo krivično delo", "poreska utaja", "čl. 61. KZ"],
    related_articles: ["čl. 61. tačka 5. KZ", "čl. 229. st. 2. KZ", "čl. 5. KZ"],
    headnote: "Ukidanje odbijanja optužbe; pogrešno računanje zastarelosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1189/2015",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila apsolutna zastarelost krivičnog gonjenja za poresku utaju PDV-a iz 2009. godine?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev branioca, preinačio pravnosnažne presude i odbio optužbu za poresku utaju zbog apsolutne zastarelosti po čl. 104. st. 6. KZ.",
    reasoning:
      "Kada je rok zastarelosti protekao pre donošenja meritorne odluke, sud je dužan po službenoj dužnosti primeniti zastarelost i osloboditi okrivljenog; troškovi padaju na budžet suda.",
    keywords: ["zastarelost", "poreska utaja", "ZZL", "apsolutna zastarelost"],
    related_articles: ["čl. 104. st. 6. KZ", "čl. 229. st. 1. KZ"],
    headnote: "Usvojen ZZL; odbijanje optužbe zbog zastarelosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 2/2017",
    legal_area: "criminal",
    legal_question:
      "Da li je osnovana žalba okrivljenog na presudu za pomoć u poreskoj utaji u najtežem obliku?",
    court_position:
      "Apelacioni sud je potvrdio oslobađajući deo za zloupotrebu položaja, a ukinuo osuđujući deo za poresku utaju u pomaganju i vratio predmet na ponovno suđenje zbog bitnih povreda postupka.",
    reasoning:
      "U ukinutom delu presuda nije zakonita po čl. 438. st. 1. ZKP; za prethodno utvrđene kazne i zadržane delove presude dati su posebni razlozi u izreci žalbenog rešenja.",
    keywords: ["poreska utaja", "pomaganje", "ukidanje presude", "bitne povrede"],
    related_articles: ["čl. 229. st. 3. KZ", "čl. 35. KZ", "čl. 438. ZKP"],
    headnote: "Potvrda delimičnog oslobađanja; ukidanje dela o poreskoj utaji.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 715/2020",
    legal_area: "criminal",
    legal_question:
      "Da li definicija odgovornog lica koja obuhvata lice kome je posao faktički poveren važi za poresku utaju iz vremena izvršenja dela?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, utvrdivši da krivični zakon nije izmenjen u relevantnom delu i da nije povređen čl. 439. tačka 2) ZKP.",
    reasoning:
      "Navodi da radnje eventualno čine drugo krivično delo (neosnovano iskazivanje poreskog kredita) ne prihvataju se jer činjenični opis pokriva obeležja čl. 229. st. 2. u vezi sa st. 1. KZ.",
    keywords: ["odgovorno lice", "poreska utaja", "ZZL"],
    related_articles: ["čl. 229. st. 2. KZ", "čl. 439. tačka 2. ZKP"],
    headnote: "Odbijen ZZL; potvrđena kvalifikacija i status izvršioca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 351/2023",
    legal_area: "criminal",
    legal_question:
      "Da li propust da istog dana ne prijavi porez i doprinose za 35 zaposlenih predstavlja jedno ili 35 odvojenih krivičnih dela poreske utaje?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da se radi o jedinstvenom krivičnom delu, a ne o sticaju 35 samostalnih radnji.",
    reasoning:
      "Jedinstvena poreska prijava i jedinstvena propustena obaveza u istom roku ukazuju na jedan umišljaj i jednu povredu čl. 225. st. 1. KZ; čl. 41. ZPPP uređuje sadržaj prijave po odbitku.",
    keywords: ["poreska utaja", "jedinstvo dela", "čl. 225. KZ", "doprinosi"],
    related_articles: ["čl. 225. st. 1. KZ", "čl. 41. ZPPP"],
    headnote: "Jedno krivično delo umesto više istovetnih.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 497/2020",
    legal_area: "criminal",
    legal_question:
      "Da li radnje okrivljene predstavljaju jedinstveno krivično delo ili građanskopravni spor i da li je nastupila zastarelost?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahteve za zaštitu zakonitosti, potvrdivši jedinstveno krivično delo poreske utaje u produženom trajanju i odbacujući navode o zastarelosti kao već ocenjenim u drugostepenom postupku.",
    reasoning:
      "Sabiranje godišnjih obaveza za kvalifikaciju produženog dela po čl. 229. st. 3. KZ pravilno je kada postoji jedinstven umišljaj; uplata na račun sama po sebi ne ukida protivpravnost ako je deo plana prikrivanja.",
    keywords: ["produženo krivično delo", "poreska utaja", "zloupotreba položaja", "ZZL"],
    related_articles: ["čl. 229. st. 3. KZ", "čl. 61. KZ"],
    headnote: "Odbijeni ZZL; potvrđena kvalifikacija i odbijanje zastarelosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 997/2022",
    legal_area: "criminal",
    legal_question:
      "Da li je dozvoljeno sabirati različite vrste poreza i doprinosa radi ispunjenja novčanog praga za osnovni oblik poreske utaje po čl. 225. st. 1. KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da je opis dela potpun i da sabiranje različitih poreza može služiti utvrđivanju praga kada zakon i činjenični opis to dopuštaju.",
    reasoning:
      "Branilac osporava objektivni uslov; sud nalazi da iznos obaveze čije se plaćanje izbegava prelazi milion dinara kada se pravilno agregira ukupna utaja u smislu inkriminacije.",
    keywords: ["poreska utaja", "sabiranje poreza", "čl. 225. KZ", "ZZL"],
    related_articles: ["čl. 225. st. 1. KZ"],
    headnote: "Odbijen ZZL; dopušteno sabiranje za prag inkriminacije.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 870/2016",
    legal_area: "criminal",
    legal_question:
      "Da li izreka mora izričito navesti „zakonito stečen prihod“ da bi postojala poreska utaja po čl. 229. KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, smatrajući da iz činjeničnog opisa proizilazi zakonitost prihoda registrovanog obveznika i da su ostvarena sva obeležja dela.",
    reasoning:
      "Nedostatak doslovne fraze u izreci ne čini presudu nejasnom ako su iz opisa radnji neprijavljivanja prihoda od zakonite delatnosti jasno izvodljivi elementi čl. 229. st. 2. u vezi sa st. 1. KZ.",
    keywords: ["poreska utaja", "izreka presude", "zakonito stečen prihod", "ZZL"],
    related_articles: ["čl. 229. st. 1–2. KZ"],
    headnote: "Odbijen ZZL; element zakonitog prihoda može proizaći iz opisa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 113/2016",
    legal_area: "criminal",
    legal_question:
      "Da li zadržavanje gotovine od prodaje vozila predstavlja poresku utaju u produženom obliku ili krivično delo neuplaćivanja poreza po odbitku?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši kvalifikaciju kao produžene poreske utaje po čl. 229. st. 3. u vezi sa st. 1. i čl. 61. KZ.",
    reasoning:
      "Novac zadržan za lične potrebe vlasnika predstavlja druge prihode fizičkog lica oporezive po ZPDG; neevidentiranje u knjigama i neprijava čine radnju poreske utaje, a ne posebno delo iz čl. 229a KZ.",
    keywords: ["poreska utaja", "dohodak građana", "produženo delo", "ZZL"],
    related_articles: ["čl. 229. st. 3. KZ", "čl. 61. KZ"],
    headnote: "Odbijen ZZL; isključena kvalifikacija neuplaćivanja po odbitku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 56/2011",
    legal_area: "criminal",
    legal_question:
      "Da li se prag od 150.000 dinara za osnovni oblik poreske utaje ispunjava sabiranjem mesečnih obaveza preko više fiskalnih godina?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev Republičkog javnog tužioca, potvrdivši stav Apelacionog suda da je merodavan zbir utaje u jednoj kalendarskoj odnosno poslovnoj godini.",
    reasoning:
      "Suprotstavljeno tumačenje čl. 41. st. 3. ZPPP o mesečnoj prijavi ne znači da se prag čl. 229. st. 1. KZ može ostvariti sabiranjem više godina; objektivni uslov se ceni unutar jedne fiskalne godine.",
    keywords: ["poreska utaja", "fiskalna godina", "prag", "ZZL"],
    related_articles: ["čl. 229. st. 1. KZ", "čl. 41. st. 3. ZPPP"],
    headnote: "Prag se ceni po godini, ne zbirom više godina.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 298/2025",
    legal_area: "criminal",
    legal_question:
      "Da li je dokazano produženo krivično delo poreske utaje i prevare kada po veštaku nijedan poreski period ne prelazi prag od milion dinara?",
    court_position:
      "Apelacioni sud je potvrdio oslobađanje od poreske utaje i prevare u produženom trajanju, prihvatajući zaključak da se iznosi različitih poreza ne smeju sabirati između perioda.",
    reasoning:
      "Kod čl. 225. st. 1. KZ u vezi sa čl. 61. KZ svaka utajena obaveza može činiti posebno delo ako nije dokazano drugačije; bez prelaska praga u pojedinačnom periodu nema osnovnog oblika.",
    keywords: ["poreska utaja", "sabiranje", "oslobađanje", "veštačenje"],
    related_articles: ["čl. 225. st. 1. KZ", "čl. 61. KZ", "čl. 208. KZ"],
    headnote: "Potvrđeno oslobađanje; nije dokazan prag po periodu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1485/2020",
    legal_area: "criminal",
    legal_question:
      "Da li neplaćeni porez predstavlja imovinsku korist podobnu za oduzimanje po pravilima o imovinskoj kazni?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da iznos izbegnutog poreza predstavlja imovinsku korist stečenu izvršenjem krivičnog dela poreske utaje.",
    reasoning:
      "Cilj inkriminacije je izbegavanje obaveze plaćanja; ostvarena korist u obliku neplaćenog poreza podleže oduzimanju u smislu čl. 439. tačka 3) ZKP kada je to osporeno neosnovano.",
    keywords: ["imovinska korist", "poreska utaja", "oduzimanje", "ZZL"],
    related_articles: ["čl. 225. st. 2. KZ", "čl. 61. KZ", "čl. 439. ZKP"],
    headnote: "Neplaćeni porez je imovinska korist za oduzimanje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 785/2014",
    legal_area: "criminal",
    legal_question:
      "Da li se segment radnji može izolovati kao posebno krivično delo iz čl. 173a ZPPP umesto kao poreska utaja iz čl. 229. st. 2. KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši kvalifikaciju kao poreske utaje i odbijajući prigovor zastarelosti i primene blažeg zakona.",
    reasoning:
      "Činjenični opis iz tačke 1. izreke ne sme parcijalno izdvajati; u celini ostvaruje obeležja čl. 229. st. 2. u vezi sa st. 1. KZ, pa navodi o drugoj inkriminaciji nisu osnovani.",
    keywords: ["poreska utaja", "pravna kvalifikacija", "ZZL", "zastarelost"],
    related_articles: ["čl. 229. st. 2. KZ", "čl. 173a ZPPP"],
    headnote: "Odbijen ZZL; nije dozvoljeno parcijalno izdvajanje opisa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 942/2018",
    legal_area: "criminal",
    legal_question:
      "Da li se prag PDV-a za poreske utaje ceni na godišnjem nivou ili po kalendarskom tromesečju kao poreskom periodu?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev tužioca za zaštitu zakonitosti i potvrdio oslobađajuću presudu koja je prag PDV-a ocenila po tromesečju.",
    reasoning:
      "RJT je osporavao primenu praga po godini; nižestepeni sud je pravilno primenio čl. 48. ZPDV u vezi sa obračunskim periodom, pa zbir unutar godine nije merodavan bez poštovanja tromesečja.",
    keywords: ["poreska utaja", "PDV", "poreski period", "ZZL"],
    related_articles: ["čl. 229. st. 1. KZ", "čl. 48. Zakon o PDV"],
    headnote: "Potvrđeno oslobađanje; PDV po propisanom periodu, ne godišnji zbir.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž2-Po1 138/2022",
    legal_area: "criminal",
    legal_question:
      "Da li optužnica za organizovani kriminal i poresku utaju pruža osnov za potvrdu optužnice pred posebnim odeljenjem?",
    court_position:
      "Apelacioni sud je odbio žalbe branilaca i potvrdio rešenje o potvrđenoj optužnici, smatrajući da su okrivljeni mesečni obveznici PDV-a i da u svakom periodu prelaze prag čl. 225. st. 2. KZ.",
    reasoning:
      "Dokazi iz istrage podržavaju osnovanu sumnju za kvalifikovani oblik poreske utaje; posebna pravila ZPDV i zakona o porezu na dobit o obračunskim periodima korišćena su pravilno u oceni praga.",
    keywords: ["potvrda optužnice", "poreska utaja", "organizovani kriminal"],
    related_articles: ["čl. 225. st. 2. KZ", "čl. 48. ZPDV", "čl. 38. Zakon o porezu na dobit"],
    headnote: "Odbijene žalbe; potvrđena optužnica.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž-Po1-Kre 40/2023",
    legal_area: "criminal",
    legal_question:
      "Da li je ispunjen uslov dvostruke kažnjivosti za izručenje kada rusko pravo tretira izbegavanje carinskih dažbina kao krivično delo slično poreskoj utaji po čl. 225. KZ?",
    court_position:
      "Apelacioni sud je preinačio odluku nižeg suda i odbio zahtev za izručenje, utvrdivši da u Srbiji odgovarajuće radnje čine prekršaj, a ne krivično delo poreske utaje, pa dvostruka kažnjivost nije ostvarena.",
    reasoning:
      "Čl. 265. st. 1. tačka 3. Carinskog zakona ne utiče na objektivni prag čl. 225. KZ; poređenje elemenata inostrane i domaće inkriminacije pokazuje nedostatak identiteta dela.",
    keywords: ["izručenje", "dvostruka kažnjivost", "carina", "poreska utaja"],
    related_articles: ["čl. 225. KZ", "čl. 7. Zakon o međunarodnoj pravnoj pomoći", "čl. 265. Carinski zakon"],
    headnote: "Odbijen zahtev za izručenje; nema dvostruke kažnjivosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 202/2014",
    legal_area: "criminal",
    legal_question:
      "Da li je element zakonito stečenih prihoda isključivo pravno pitanje ili činjenično pitanje koje su niži sudovi već ocenili?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, smatrajući da je postojanje zakonitosti prihoda činjenično pitanje na koje su nižestepeni sudovi dali odgovor u meritornoj fazi.",
    reasoning:
      "ZZL ne služi za ponavljanje spora o tome da li su prihodi zakoniti kada je to već utvrđeno; ostali navodi su neosnovani u odnosu na čl. 439. tačka 1) ZKP.",
    keywords: ["poreska utaja", "zakonito stečen prihod", "ZZL"],
    related_articles: ["čl. 229. KZ", "čl. 439. ZKP"],
    headnote: "Odbijen ZZL; zakonitost prihoda je činjenično utvrđena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 3/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je presuda o pranju novca, poreskim delima i oduzimanju koristi zakonita za sve okrivljene?",
    court_position:
      "Apelacioni sud je delimično preinačio presudu za okrivljenog AA (imovinska korist pravnog lica), potvrdio presudu za BB, a za VV ukinuo presudu i vratio predmet zbog nejasnih razloga o visini oduzete koristi.",
    reasoning:
      "Kada visina oduzimanja nije razumljivo povezana sa dokazima o prljavom novcu, drugostepeni sud mora vratiti predmet na dopunu razloga i utvrđivanje; ostali delovi presude su obrazloženi.",
    keywords: ["pranje novca", "poreska prevara", "oduzimanje koristi", "ukidanje"],
    related_articles: ["čl. 245. KZ", "čl. 225. KZ"],
    headnote: "Delimično preinačenje i ukidanje zbog nejasne oduzete koristi.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 985/2021",
    legal_area: "criminal",
    legal_question:
      "Da li između zloupotrebe položaja odgovornog lica i poreske utaje postoji prividni idealni sticaj?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, utvrdivši da se radi o dva odvojena krivična dela sa različitim vremenom, umišljajem i posledicom, a ne o prividnom sticaju.",
    reasoning:
      "Konzumacija idealnog sticaja zahteva da lakše delo bude sadržano u težem; ovde su posledice i namere različite (imovinska korist kupaca stanova naspram izbegavanja poreza).",
    keywords: ["prividni sticaj", "zloupotreba položaja", "poreska utaja", "ZZL"],
    related_articles: ["čl. 227. KZ", "čl. 229. KZ"],
    headnote: "Odbijen ZZL; nema prividnog idealnog sticaja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1187/2025",
    legal_area: "criminal",
    legal_question:
      "Da li prekršaj lažnog prijavljivanja poreza po ZPPP isključuje krivično delo poreske utaje po čl. 225. st. 1. KZ?",
    court_position:
      "Vrhovni sud je odbio zahtev branioca u delu povrede čl. 439. tačka 1) ZKP, a u ostalom delu zahtev odbacio kao nedozvoljen jer osporava činjenično stanje i dokaze.",
    reasoning:
      "Čl. 178. st. 1. ZPPP i čl. 225. KZ imaju različite elemente i svrhu; osporavanje utvrđenih činjenica nije dozvoljeno u ZZL po čl. 485. st. 4. ZKP.",
    keywords: ["poreska utaja", "prekršaj", "ZZL", "čl. 225. KZ"],
    related_articles: ["čl. 225. st. 1. KZ", "čl. 178. st. 1. ZPPP", "čl. 485. st. 4. ZKP"],
    headnote: "Delimično odbijen, delimično odbačen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 82/2022",
    legal_area: "criminal",
    legal_question:
      "Da li su ispunjene pretpostavke za izručenje u Nemačku u predmetu koji obuhvata prevare, proneveru i utaju poreza u pomaganju po nemačkom pravu?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti u delu o povredi krivičnog zakona, a u ostalom delu zahtev odbacio kao nedozvoljen.",
    reasoning:
      "Za izručenje je merodavna ocena dvostruke kažnjivosti i redovnog postupka; preostali navodi ne ulaze u dozvoljene razloge ZZL kada se odbacuju kao van predmeta čl. 439. tačka 2) ZKP.",
    keywords: ["izručenje", "zaštita zakonitosti", "inostrano pravo"],
    related_articles: ["čl. 439. ZKP"],
    headnote: "Odbijen ZZL u delu krivičnog zakona; ostalo odbačeno.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 25728/2024",
    legal_area: "criminal",
    legal_question:
      "Da li tužilac može ostvariti naknadu štete od krivičnog dela poreske prevare probijanjem pravne ličnosti pravnog lica?",
    court_position:
      "Vrhovni sud je usvojio reviziju i ukinuo presude, utvrdivši da su nižestepeni sudovi pogrešno odbili tužbu ne cenivši probijanje pravne ličnosti u vezi sa osuđujućom presudom za poresku prevaru.",
    reasoning:
      "Pravno lice je osuđeno za podnošenje neistinitih PDV prijava radi neosnovanog povraća; povezanost vlasnika i društva opravdava parničnu ocenu odgovornosti po pravilima o probijanju pravne ličnosti.",
    keywords: ["naknada štete", "poreska prevara", "probijanje pravne ličnosti", "revizija"],
    related_articles: ["čl. 173a ZPPP", "Odgovornost za štetu"],
    headnote: "Usvojena revizija; vraćanje na ponovno suđenje u parnici.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 186/2018",
    legal_area: "criminal",
    legal_question:
      "Da li paralelni prekršajni i krivični postupci krše načelo ne bis in idem u predmetu poreske utaje?",
    court_position:
      "Apelacioni sud je preinačio presudu, oslobodio od neosnovanog iskazivanja poreskog kredita zbog nedostatka potpisa, prekvalifikovao poresku utaju u jedno delo i izrekao uslovnu osudu, odbijajući ne bis in idem.",
    reasoning:
      "Prekršaj i krivično gonjenje imaju različite svrhe i predvidive posledice; postupci su delom paralelni uz korišćenje istih činjenica, što ne čini dvostruko kažnjavanje za isto delo u zabranjenom smislu.",
    keywords: ["ne bis in idem", "poreska utaja", "prekršaj", "uslovna osuda"],
    related_articles: ["čl. 229. KZ", "čl. 173a ZPPP"],
    headnote: "Preinačena presuda; odbijen prigovor ne bis in idem.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 319/2022",
    legal_area: "criminal",
    legal_question:
      "Da li radnje lažnog prikazivanja PDV-a i neprijavljivanja prihoda od kapitala ispunjavaju obeležja kvalifikovanog oblika poreske utaje po čl. 225. st. 2. KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši da izreka sadrži umišljaj, nameru i iznos preko pet miliona dinara potreban za čl. 225. st. 2. KZ.",
    reasoning:
      "Osporavanje subjektivnih i objektivnih obeležja predstavlja nedozvoljeno ponavljanje činjeničnog spora; nižestepeni sudovi su pravilno primenili materijalno pravo.",
    keywords: ["poreska utaja", "PDV", "prihod od kapitala", "ZZL"],
    related_articles: ["čl. 225. st. 2. KZ", "ZPDV", "ZPDG"],
    headnote: "Odbijen ZZL; potvrđena kvalifikovana poreska utaja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 6300/2020",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje Ministarstva finansija o ponavljanju postupka konačnog zaduženja doprinosa ako nisu jasno utvrđene nove činjenice?",
    court_position:
      "Upravni sud je uvažio tužbu, poništio rešenje i vratio predmet na ponovno odlučivanje zbog bitne povrede pravila postupka u obrazloženju.",
    reasoning:
      "Ponavljanje postupka zahteva precizno utvrđenje novih činjenica; prilivi na račun fizičkog lica koji su već oporezovani pri isplati ne mogu automatski biti novootkriveni prihod bez individualizacije.",
    keywords: ["doprinosi", "poreski postupak", "ponavljanje postupka", "Upravni sud"],
    related_articles: ["Zakon o poreskom postupku i poreskoj administraciji", "Zakon o stečaju"],
    headnote: "Poništeno rešenje; nedostatak razloga o novim činjenicama.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1726/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na suđenje ako subjektivni elementi krivičnog dela nisu u izreci presude već samo u obrazloženju?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu kao neosnovanu, smatrajući da subjektivni elementi mogu biti sadržani u obrazloženju presude ako su dovoljno jasno povezani sa izrekom.",
    reasoning:
      "Ostali navodi podnosioca o zloupotrebi tužilaštva, prekvalifikaciji i dužini postupka ocenjeni su u okviru standarda iz čl. 32. Ustava o razumnom roku, bez utvrđene povrede u konkretnom delu odluke.",
    keywords: ["ustavna žalba", "izreka presude", "subjektivni elementi", "pravo na suđenje"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbijena ustavna žalba; subjektivni elementi mogu u obrazloženju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 27/2021",
    legal_area: "criminal",
    legal_question:
      "Da li je dokazano udruživanje radi vršenja krivičnih dela kada je okrivljeni osuđen za produženu prevaru u saizvršilaštvu?",
    court_position:
      "Apelacioni sud u Beogradu je odbio žalbe tužioca, okrivljenog i branilaca i potvrdio prvostepenu presudu kojom je okrivljeni osuđen za produženu prevaru u saizvršilaštvu, a oslobođen optužbe za udruživanje iz čl. 346. st. 4. u vezi sa st. 2. KZ.",
    reasoning:
      "Izvedeni dokazi ne dokazuju intenzitet i stepen organizovanosti koji čine organizovanu kriminalnu grupu u smislu čl. 112. tačka 35. KZ; za prevaru je ostvaren saizvršilački odnos sa jasno podeljenim ulogama.",
    keywords: ["prevara", "saizvršilaštvo", "udruživanje", "organizovani kriminal"],
    related_articles: ["čl. 208. st. 4. KZ", "čl. 33. KZ", "čl. 346. st. 4. KZ"],
    headnote: "Potvrđena osuda za prevaru; oslobođenje od udruživanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz OK 9/2022",
    legal_area: "criminal",
    legal_question:
      "Da li postoje povrede zakona u predmetu prevare (ne bis in idem, pristrasnost sudija, prekoračenje optužnice)?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahteve za zaštitu zakonitosti branilaca kao neosnovane, utvrdivši da nisu istaknute meritorne povrede u smislu ZZL.",
    reasoning:
      "Činjenični opis obuhvata plan organizovanja grupe radi prevare sa težom kaznom; navodi o ne bis in idem i prekoračenju optužnice ocenjeni su kao neosnovani u odnosu na utvrđeno činjenično stanje.",
    keywords: ["prevara", "ZZL", "organizovana kriminalna grupa", "ne bis in idem"],
    related_articles: ["čl. 208. KZ", "čl. 112. tačka 35. KZ"],
    headnote: "Odbijeni ZZL u predmetu prevare.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1149/2019",
    legal_area: "criminal",
    legal_question:
      "Da li je prekvalifikacija sa zloupotrebe ovlašćenja u privredi na prevaru u obavljanju privredne delatnosti zakonita posle izmene KZ?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti, potvrdivši postojanje pravnog kontinuiteta između ranijeg i novog dela i pravilnu primenu blažeg ranijeg zakona.",
    reasoning:
      "Iako postoje razlike u opisu, bitna obeležja zloupotrebe iz čl. 238. st. 1. tačka 2. KZ sadržana su u čl. 223. KZ iz izmena 94/2016, pa dekriminalizacija nije nastupila u merodavnom smislu.",
    keywords: ["zloupotreba ovlašćenja u privredi", "prevara", "pravni kontinuitet", "ZZL"],
    related_articles: ["čl. 238. KZ", "čl. 223. KZ"],
    headnote: "Odbijen ZZL; prekvalifikacija i primena blažeg zakona pravilni.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 8/2022",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila zastarelost za udruživanje radi krivičnih dela u predmetu poreske utaje i zloupotrebe položaja?",
    court_position:
      "Apelacioni sud je odbio optužbu za udruživanje zbog zastarelosti, delimično preinačio kazne za zloupotrebu položaja i poresku utaju, ukinuo presudu jednom okrivljenom zbog nepotpunog činjeničnog stanja i vratio predmet, dok je ostale žalbe odbio.",
    reasoning:
      "Za udruženje je utvrđen istek roka zastarelosti; u ostalom delu ocena dokaza o ulogama u kriminalnoj grupi i poreskim radnjama zahteva ponavljanje postupka za okrivljenog čija presuda nije potpuno obrazložena.",
    keywords: ["zastarelost", "udruživanje", "poreska utaja", "zloupotreba položaja"],
    related_articles: ["čl. 346. KZ", "čl. 225. KZ", "čl. 227. KZ"],
    headnote: "Delimično preinačenje; ukidanje dela presude i odbijanje optužbe za udruživanje.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž3-Po1 1/2020",
    legal_area: "criminal",
    legal_question:
      "Da li izreka da su okrivljeni delovali „po planu i dogovoru“ sama po sebi dokazuje postojanje organizovane kriminalne grupe?",
    court_position:
      "Apelacioni sud u Beogradu, kao trećestepeni sud, delimično je preinačio drugostepenu presudu u delu kazni za pomagače, potvrdivši osudu glavnih izvršilaca za prevaru pri dobijanju kredita, a odbio ostale žalbe.",
    reasoning:
      "Plan i dogovor u izreci sledi iz prvog stava optužnice radi jasnoće i ne uvodi elemente čl. 112. tačka 35. KZ koji nisu optužbom postavljeni kao posebna kvalifikacija organizovane grupe.",
    keywords: ["prevara", "pomaganje", "plan i dogovor", "organizovana grupa"],
    related_articles: ["čl. 208. st. 4. KZ", "čl. 35. KZ", "čl. 112. KZ"],
    headnote: "Potvrđena kvalifikacija prevare; plan i dogovor ne znače OCG.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž3 268/2017",
    legal_area: "civil",
    legal_question:
      "Da li objavljivanje neistinitih navoda o tužiocu u štampi i na internetu predstavlja povredu časti i ugleda i osnov za novčanu naknadu?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom su izdavač i glavni urednik solidarno obavezni da tužiocu plate 80.000 dinara zbog povrede časti, ugleda i pretpostavke nevinosti.",
    reasoning:
      "Tekst je prenet u formi krivične prijave sa identifikujućim podacima; ocena slobode izražavanja naspram dostojanstva ličnosti ide u prilog tužiocu s obzirom na verifikaciju i učinak objave.",
    keywords: ["povreda časti", "mediji", "nematerijalna šteta", "Kurir"],
    related_articles: ["čl. 27. Ustav RS", "Odgovornost za štetu"],
    headnote: "Potvrđena presuda; novčana naknada za povredu časti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2302/2022",
    legal_area: "constitutional",
    legal_question:
      "Da li učešće istih sudija u odlukama o pritvoru i kasnije u meritornoj fazi krivičnog postupka povređuje pravo na nepristrasan sud?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje, jer je ista sudija učestvovala u produženju pritvora pa zatim u više meritornih odluka, što stvara objektivno opravdanu sumnju u nepristrasnost.",
    reasoning:
      "Standard iz čl. 32. st. 1. Ustava zahteva izbegavanje uloga koje mogu delovati kao prethodno mišljenje o krivici; kumulacija uloga u istom predmetu nije bila razumno opravdana.",
    keywords: ["nepristrasnost", "pritvor", "ustavna žalba", "pravično suđenje"],
    related_articles: ["čl. 32. st. 1. Ustav RS"],
    headnote: "Usvojena ustavna žalba; sudija u pritvoru i meritu — sumnja u pristrasnost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž4 165/2023",
    legal_area: "civil",
    legal_question:
      "Da li skladištenje i promet falsifikovanog alkoholnog pića predstavlja povredu registrovanog žiga „Gorki list“?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i usvojio tužbeni zahtev, utvrdivši povredu žiga, naložio zabranu daljih povreda, uništenje robe i objavljivanje presude na teret tuženog.",
    reasoning:
      "Dokazi o poreklu robe i priznanju tuženog u postupku podržavaju zaključak o identitetu proizvoda i zbunjujućem sličnosti u odnosu na zaštićeni žig.",
    keywords: ["žig", "falsifikat", "Pelinkovac", "Gorki list"],
    related_articles: ["Zakon o žigovima"],
    headnote: "Povreda žiga; usvojen tužbeni zahtev.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Republike Srbije",
    court_level: "administrative",
    case_number: "U 14691/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbijeno odobrenje za izlaganje vitrine sa sladoledom kada organ polazi od činjenica iz drugog, nezavisnog prekršajnog postupka?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje opštinskog organa, utvrdivši da odbijanje nije zasnovano na proceni uslova za zauzeće javne površine već na spoljašnjem postupku.",
    reasoning:
      "Upravni organ mora individualno oceniti zahtev za zauzeće površine; prethodna kontrola i prekršajni nalozi ne mogu automatski zameniti obrazložen odbijajući rešenje po ZUP-u.",
    keywords: ["javna površina", "odobrenje", "Upravni sud", "sladoled"],
    related_articles: ["Zakon o opštem upravnom postupku", "Komunalna polisa"],
    headnote: "Poništeno odbijanje odobrenja; mešanje postupaka nezakonito.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž-Po1-Kre 3/2019",
    legal_area: "criminal",
    legal_question:
      "Da li je kazna zatvora izrečena u postupku priznanja i izvršenja strane osuđujuće presude usklađena sa domaćim zakonodavstvom?",
    court_position:
      "Apelacioni sud u Beogradu je, delimično usvajajući žalbu branioca, preinačio raniju presudu u postupku izvršenja strane presude i smanjio kaznu zatvora sa 13 na 10 godina radi usklađenja sa krivičnim zakonodavstvom Republike Srbije.",
    reasoning:
      "Kod izvršenja strane presude sud meri razmeru kazne sa maksimumima i sistemom sankcija iz KZ Srbije za odgovarajuće delo (organizovani kriminal, razbojništvo), uz obavezivanje na naknadu štete prema stranoj presudi.",
    keywords: ["izvršenje strane presude", "kazna zatvora", "usklađenje", "BiH"],
    related_articles: ["Zakonik o krivičnom postupku", "čl. 206. KZ (razbojništvo)"],
    headnote: "Preinačena kazna; smanjenje zatvora pri izvršenju strane presude.",
    outcome: "partially",
  },
]
