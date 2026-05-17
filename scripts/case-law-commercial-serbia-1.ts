// scripts/case-law-commercial-serbia-1.ts
// Serbian commercial and related case law (all 3 batches: 87 entries).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_COMMERCIAL_SERBIA_1: CaseLawInput[] = [
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 581/2021",
    legal_area: "commercial",
    legal_question:
      "Da li je drugostepeni sud pravilno ocenio da tužena kao zakonski zastupnik društva nije direktno odgovorna prema prvotužiocu za štetu, ako je delovala kao zastupnik prvotuženog?",
    court_position:
      "Vrhovni kasacioni sud je prihvatio stav drugostepenog suda da iz činjenica o zastupanju tužene kao zakonskog zastupnika prvotuženog ne proizlazi osnov njene neposredne odgovornosti prema prvotužiocu.",
    reasoning:
      "Prema čl. 32 u vezi sa čl. 31 st. 2 Zakona o privrednim društvima, zastupnik društva dužan je da poslove obavlja savesno, pažnjom dobrog privrednika i u razumnom uverenju da deluje u najboljem interesu društva, zasnivajući procenu na informacijama stručnih lica, pri čemu nije odgovoran za štetu koja iz takve procene nastane društvu. Iz toga proizlazi odgovornost zastupnika društva za štetu društvu kada odstupi od obaveze savesnog zastupanja, ali ne i direktna odgovornost direktora prema poveriocima društva za posledice po poverioce ako dužnosti nije obavljao u interesu društva.",
    keywords: [
      "revizija",
      "stečajne mase",
      "ustupanje potraživanja",
      "Zakon o privrednim društvima",
      "zastupnik društva",
      "direktor",
    ],
    related_articles: ["čl. 31 st. 2 ZPD", "čl. 32 ZPD"],
    headnote:
      "Zastupnik društva odgovara društvu za štetu pri odstupanju od savesnog zastupanja; iz toga ne proizlazi direktna odgovornost direktora prema poveriocima društva.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1284/2021",
    legal_area: "commercial",
    legal_question:
      "Da li bivši direktor odgovara društvu za naknadu štete zbog otpisa robe ako je tužilac direktan oštećenik?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje tužbenog zahteva za naknadu štete protiv bivšeg direktora, jer nije dokazana uzročno-posledična veza niti krivica direktora.",
    reasoning:
      "Iako manjak robe predstavlja umanjenje imovine tužioca u smislu čl. 155 ZOO, nije dokazano da između radnji ili propuštanja tuženog i umanjenja imovine postoji uzročna veza. ZPD ne predviđa objektivnu odgovornost lica sa dužnostima prema društvu; potrebno je da je lice postupalo suprotno čl. 32 ZPD, da je to bilo uzrok štete i da postoji subjektivna odgovornost (namerno ili krajnja nepažnja). Tuženi je dokazao postupanje u skladu sa čl. 32 st. 1 i 2 ZPD i nepostojanje namere ili krajnje nepažnje.",
    keywords: ["direktor", "naknada štete", "DOO", "uzročnost", "krivica", "ZPD"],
    related_articles: ["čl. 32 st. 1–2 ZPD", "čl. 155 ZOO"],
    headnote: "Odgovornost lica sa dužnostima prema društvu za štetu je subjektivna; bez uzročnosti i krivice tužba se odbija.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pvž 95/2021",
    legal_area: "commercial",
    legal_question:
      "Da li direktor društva može uskratiti članu pristup aktima i informisanje kada postoji opravdana bojazan zloupotrebe prava?",
    court_position:
      "Privredni apelacioni sud je odbio žalbu i potvrdio rešenje kojim je odbijen predlog člana za pristup aktima, utvrđujući postojanje opravdane bojazni od zloupotrebe prava u korist interesa društva.",
    reasoning:
      "Po čl. 243 ZPD direktor može uskratiti pravo na pristup aktima i informisanje ako postoji opravdana bojazan da će pravo biti iskorišćeno suprotno interesima društva ili za svrhu van veze sa članstvom, ili da bi društvu mogla biti pričinjena znatna šteta. U konkretnom slučaju sudski je utvrđeno kršenje zabrane konkurencije i osuđujuća presuda za zloupotrebu položaja odgovornog lica, uz druge okolnosti (delimična dostava dokumentacije, ranije odbijanje zahteva), što ukazuje na opravdanu bojazan zloupotrebe.",
    keywords: ["pristup aktima", "član DOO", "čl. 243 ZPD", "zabrana konkurencije", "opravdana bojazan"],
    related_articles: ["čl. 243 ZPD"],
    headnote: "Pravo na pristup aktima može biti uskraćeno kada postoji opravdana bojazan zloupotrebe; presude o konkurenciji i krivičnom delu bitne su za ocenu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2149/2023",
    legal_area: "commercial",
    legal_question:
      "Da li je derivativna tužba člana društva dozvoljena kada je društvo već podnelo tužbu, i da li se troškovi mogu preinačiti zbog PDV dokaza?",
    court_position:
      "Sud je potvrdio odbacivanje derivativne tužbe kao nedozvoljene jer je društvo već pokrenulo postupak, a delimično je preinačeno rešenje o troškovima umanjenjem zbog nedostatka dokaza za PDV.",
    reasoning:
      "Kada privredno društvo već podnese tužbu radi istih ciljeva, derivativna tužba člana nije dozvoljena. U delu troškova postupka drugostepeni sud je ocenio da nije dokazan PDV pa je iznos troškova srazmerno umanjen.",
    keywords: ["derivativna tužba", "član društva", "DOO", "troškovi postupka", "PDV"],
    related_articles: ["ZPD", "ZPP"],
    headnote: "Dvostruko pokretanje iste zaštite interesa društva derivativnom tužbom člana nije prihvatljivo.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 945/2018",
    legal_area: "criminal",
    legal_question:
      "Da li radnje okrivljenog sadrže obeležja krivičnog dela zloupotreba položaja odgovornog lica u vezi sa pribavljanjem protivpravne imovinske koristi?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti branioca kao neosnovan, utvrdivši da iz činjeničnog opisa u izreci proizilaze sva zakonska obeležja dela, uključujući pribavljanje protivpravne imovinske koristi.",
    reasoning:
      "Iz opisa dela proizilaze obeležja zloupotrebe položaja odgovornog lica iz čl. 234 st. 3 u vezi st. 1 KZ: iskorišćavanje položaja direktora radi pribavljanja imovinske koristi preuzimanjem robe i izdavanjem blanko menica koje je znao da neće biti naplaćene, prodaja robe trećim licima bez knjiženja i prisvajanje sredstava, uz subjektivna obeležja umišljaja.",
    keywords: ["zaštita zakonitosti", "zloupotreba položaja", "direktor", "KZ", "imovinska korist"],
    related_articles: ["čl. 234 st. 1 i 3 KZ", "čl. 491 st. 1 ZKP"],
    headnote: "Kada izreka sadrži potpuna obeležja dela, zaštita zakonitosti ne može uspeti na tvrdnju o nepostojanju elemenata.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 238/2016",
    legal_area: "commercial",
    legal_question:
      "Da li je izreka presude za privredni prestup razumljiva ako se iz nje ne može utvrditi da li je okrivljeni osuđen za jedan ili više privrednih prestupa?",
    court_position:
      "Privredni apelacioni sud je usvojio žalbu branioca, ukidajući prvostepenu presudu zbog nerazumljive izreke i vraćajući predmet na ponovno odlučivanje.",
    reasoning:
      "Izreka mora biti jasna i nedvosmislena. Ako se iz nje ne može zaključiti da li su okrivljeni osuđeni za jedan ili dva privredna prestupa, presuda se ukida kao nezakonita u tom delu, jer je bitna nepouzdanost o predmetu osude.",
    keywords: ["privredni prestup", "izreka presude", "bitna povreda", "jasnoća"],
    related_articles: ["Zakon o zaštiti životne sredine", "Zakon o privrednim prestupima", "ZKP"],
    headnote: "Nerazumljiva izreka u privredno-kazenom postupku povlači ukidanje presude.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pk 16/2018",
    legal_area: "commercial",
    legal_question:
      "Da li je dovoljno da je lice direktor da bi odgovaralo za privredni prestup bez utvrđivanja neposredne nadležnosti za konkretnu radnju?",
    court_position:
      "Privredni apelacioni sud je usvojio žalbu okrivljenog odgovornog lica i ukinuo prvostepenu presudu, jer nije pouzdano utvrđeno da je direktor bio odgovorno lice za konkretnu radnju prestupa.",
    reasoning:
      "Direktor odgovara za vođenje poslova i finansijske izveštaje po ZPD, ali za odgovornost po Zakonu o privrednim prestupima mora se utvrditi da je lice bilo odgovorno lice u smislu čl. 8 i 11 ZOPP za konkretnu radnju. Ako se ne može prihvatiti da je direktor bio odgovorno lice za izostavljanje obeležja prestupa (bezbednost plovidbe), presuda se ukida.",
    keywords: ["direktor", "privredni prestup", "odgovorno lice", "ZOPP", "nadzor"],
    related_articles: ["čl. 8 i 11 ZOPP", "čl. 224–225 ZPD", "Zakon o plovidbi i lukama na unutrašnjim vodama"],
    headnote: "Status direktora sam po sebi ne zamenjuje dokaz o neposrednoj odgovornosti za konkretnu radnju prestupa.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 863/2024",
    legal_area: "criminal",
    legal_question:
      "Da li su okrivljeni neosnovano obavezani na imovinskopravni zahtev jer su štetu naneli kao direktori društva, pa oštećeni može tražiti naknadu samo od društva?",
    court_position:
      "Vrhovni sud je odbio zahteve za zaštitu zakonitosti; pravnosnažna presuda može obavezati okrivljene na imovinskopravni zahtev kada su lično odgovorni za štetu od krivičnog dela.",
    reasoning:
      "Branioci su isticali da bi oštećeni u parnici mogao tražiti naknadu od društva. Sud je utvrdio da je opis dela pun i da odluka o imovinskopravnom zahtevu nije zakonita povreda ako okrivljeni lično odgovaraju za štetu od krivičnog dela prevara u privredi.",
    keywords: ["prevara u privredi", "imovinskopravni zahtev", "direktor", "zaštita zakonitosti"],
    related_articles: ["KZ", "ZKP"],
    headnote: "Lična odgovornost okrivljenih za štetu od krivičnog dela ne isključuje valjanost imovinskopravnog zahteva u krivičnoj presudi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Viši sud u Beogradu",
    court_level: "high",
    case_number: "Po4 73/2024",
    legal_area: "criminal",
    legal_question:
      "Da li direktor falsifikovanjem dokumentacije za potrošačke kredite i lažnim profakturama pribavlja protivpravnu imovinsku korist društvu u smislu zloupotrebe položaja?",
    court_position:
      "Okrivljena je osuđena jer je kao direktor zloupotrebila položaj i ovlašćenja radi pribavljanja protivpravne imovinske koristi privrednom društvu, koristeći lažnu dokumentaciju u odnosu na banku.",
    reasoning:
      "Utvrđeno je da je okrivljena u periodu od 14.03.2018. do 12.08.2019. kao direktor iskoristila položaj i ovlašćenja, koristeći profakture za robu koja nije stvarno prodata, čime je društvu pribavljena korist preko 12 miliona dinara, uz umišljaj i svest o zabranjenosti dela.",
    keywords: ["zloupotreba položaja", "direktor", "krediti", "banka", "profakture"],
    related_articles: ["KZ – zloupotreba položaja odgovornog lica"],
    headnote: "Lažna dokumentacija za kreditiranje kupaca radi pribavljanja koristi društvu ispunjava obeležja zloupotrebe položaja odgovornog lica.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2374/2019",
    legal_area: "commercial",
    legal_question:
      "Da li tuženi odgovaraju za nestanak pokretnih stvari nakon poreske zaplene ako novi vlasnik nije preuzeo stvari u roku, i da li direktor DOO lično odgovara za čuvanje?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio da tuženi nisu odgovorni, jer se ne primenjuje ugovor o ostavi iz ZOO već specijalni poreski postupak, a direktor DOO ne odgovara lično za obaveze društva.",
    reasoning:
      "Čuvanje stvari stečenih u poreskom postupku uređeno je Zakonom o poreskom postupku i poreskoj administraciji, sa rokovima za preuzimanje u državinu; neprimena čl. 712 ZOO. Direktor DOO po čl. 157 ZPD (tada važeći) ne odgovara lično za obaveze društva jer DOO odgovara celokupnom imovinom.",
    keywords: ["poreska zaplena", "čuvanje stvari", "DOO", "direktor", "ograničena odgovornost"],
    related_articles: ["ZPPA", "čl. 157 ZPD", "čl. 712 ZOO"],
    headnote: "Poreski postupak čuvanja stvari isključuje analogiju sa ugovorom o ostavi; direktor ne snosi ličnu obavezu čuvanja za račun društva u ovom kontekstu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 4749/2020",
    legal_area: "commercial",
    legal_question:
      "Da li bivši članovi društva solidarno odgovaraju za dug prema poveriocu na osnovu proboja pravne ličnosti kada je potraživanje utvrđeno presudom?",
    court_position:
      "Sud je delimično preinačio presudu: usvojen deo tužbe za solidarno plaćanje duga utvrđenog pravosnažnom presudom i zakonite kamate, dok je deo za naknadu štete odbijen jer nije reč o neizmirenoj obavezi društva već o posebnom sporu o šteti.",
    reasoning:
      "Odgovornost drugotuženog se zasniva na čl. 15 st. 2 ZPD (član sa udelom od 50%) uz vezu sa pravosnažnom izvršnom presudom koju društvo nije moglo izmiriti. Za kamatu na troškove postupka nije osnovan zahtev pre izvršnosti presude o troškovima. Za iznos naknade štete zbog zloupotrebe društva važe opšta pravila odgovornosti za štetu, pa je tu deo tužbe pravilno odbijen.",
    keywords: ["proboj pravne ličnosti", "solidarna odgovornost", "član DOO", "kamata", "ZPD"],
    related_articles: ["čl. 15 st. 2 ZPD", "čl. 414 ZOO"],
    headnote: "Solidarna odgovornost člana može biti ograničena na potraživanje izvršno utvrđeno presudom; naknada štete zahteva posebnu osnovanost.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 286/2019",
    legal_area: "commercial",
    legal_question:
      "Da li je žalba javnog tužioca blagovremena i da li je prvostepeni sud potpuno utvrdio odgovornost odgovornog lica za privredni prestup u oblasti autorskog prava?",
    court_position:
      "Privredni apelacioni sud je usvojio žalbe javnog tužioca, ukinuo rešenje o odbacivanju žalbe kao neblagovremene i ukinuo oslobađajuću presudu, vraćajući predmet na ponovno suđenje.",
    reasoning:
      "Utvrđeno je da je okrivljeno odgovorno lice bilo direktor u APR-u u periodu prestupa. Prvostepeni sud treba da pribavi odluku ovlašćenog organa radi preciziranja poslova i utvrđivanja ko je dužan dostavu „košuljica“ SOKOJ-u, i da primeni čl. 11 ZOPP o odgovornosti za nadzor, uz čl. 61–63 ZPD. Ogranak nema svojstvo pravnog lica i nastupa za matično društvo.",
    keywords: ["privredni prestup", "autorsko pravo", "žalba javnog tužioca", "rok", "odgovorno lice"],
    related_articles: ["Zakon o autorskim i srodnim pravima", "čl. 11 ZOPP", "čl. 567–569 ZPD"],
    headnote: "Pogrešno računanje roka za žalbu i nepotpun činjenični podlog o odgovornosti direktora/ogranka vode u ukidanje.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 7/2020",
    legal_area: "commercial",
    legal_question:
      "Da li direktor odgovara za privredni prestup nedostavljanja finansijskih izveštaja ako je pravno lice brisano iz APR-a posle prestupa?",
    court_position:
      "Potvrđena je odgovornost direktorke za prestup i preinačena je kazna u smislu umanjenja novčane kazne; postupak prema pravnom licu obustavljen jer je ono prestalo da postoji.",
    reasoning:
      "Po čl. 51 st. 2 ZOPP postupak prema pravnom licu se obustavlja ako je ono prestalo da postoji posle prestupa. Okrivljeno odgovorno lice je u vreme prestupa bilo upisano kao direktor i zakonski zastupnik u APR-u, pa je dužno postupati sa pažnjom dobrog privrednika po čl. 61 i 63 ZPD.",
    keywords: ["privredni prestup", "finansijski izveštaji", "brisano društvo", "kazna", "ZOPP"],
    related_articles: ["čl. 51 st. 2 ZOPP", "čl. 61 i 63 ZPD"],
    headnote: "Brisanje pravnog lica posle prestupa obustavlja postupak prema društvu, ali ne i odgovornost direktora koji je delovao u kritično vreme.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 203/2014",
    legal_area: "commercial",
    legal_question:
      "Da li pravnosnažna osuđujuća krivična presuda za nesavesan rad u privredi vezuje sud u parnici o naknadi štete protiv direktora?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio obavezu naknade štete, jer je sud u parnici vezan činjenicama iz krivične presude o biću dela i krivičnoj odgovornosti.",
    reasoning:
      "Za odgovornost po čl. 158 ZOO potrebna je krivica. Pravnosnažna krivična presuda za čl. 136 st. 2 tačka 1 KZ utvrđuje krivicu i uzročnost štete za društvo. Parnični sud je vezan za činjenice koje se tiču bića dela i krivične odgovornosti; stepen krivice za štetu proizilazi iz krivičnog postupka (umišljaj i svest o mogućnosti štete).",
    keywords: ["naknada štete", "krivična presuda", "vezanost", "direktor", "nesavesan rad"],
    related_articles: ["čl. 136 st. 2 KZ", "čl. 158 ZOO"],
    headnote: "Osuđujuća presuda za nesavesan rad u privredi može biti osnov za građansku odgovornost direktora u naknadnoj parnici.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 1032/2023",
    legal_area: "criminal",
    legal_question:
      "Da li su dokazana obeležja zloupotrebe položaja odgovornog lica pri prodaji stanova u izgradnji kada je direktor dao punomoćje trećem licu?",
    court_position:
      "Apelacioni sud u Beogradu je odbio žalbu tužioca i potvrdio oslobađajuću presudu, ocenivši da nije dokazano da su okrivljeni pribavili protivpravnu imovinsku korist.",
    reasoning:
      "Javni tužilac je isticao da punomoćje ne oslobađa direktora odgovornosti; prvostepeni sud je ocenio dokaze i zaključio da nije dokazana zloupotreba položaja u konkretnim prodajama. Drugostepeni sud je žalbu ocenio neosnovanom u okviru čl. 451 ZKP.",
    keywords: ["zloupotreba položaja", "direktor", "punomoćje", "stanovi", "oslobađanje"],
    related_articles: ["KZ", "čl. 451 ZKP", "ZPD"],
    headnote: "Davanje punomoćja trećem licu samo po sebi ne dokazuje umišljaj i zloupotrebu bez utvrđenih činjenica o koristi i svesnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2685/2023",
    legal_area: "labor",
    legal_question:
      "Kako se odmeravaju uzajamni zahtevi bivšeg zaposlenog i poslodavca za naknadu štete, troškove prevoza i neiskorišćeni odmor u sporu sa elementima radnog i korporativnog prava?",
    court_position:
      "Vrhovni sud je delimično preinačio i delimično ukinuo presudu Apelacionog suda: potvrđeno je pravo na naknadu prevoza; preinačena je odluka o šteti od zabrane konkurencije u korist tuženog; odbijen zahtev za neiskorišćeni odmor.",
    reasoning:
      "Po čl. 232 ZPP sud odmerava naknadu za štetu od konkurencije prihvatajući iskaz tuženog o visini štete. Za prevoz važi ugovor o pravima i obavezama i čl. 118 st. 1 tačka 1 Zakon o radu. Za odmor drugostepeni sud je ocenio nadležnost i odgovornost nadzornog odbora po osnivačkom aktu. Za protivtužbu po čl. 163 ZDR nisu postojale pretpostavke.",
    keywords: ["naknada štete", "zabrana konkurencije", "prevoz", "godišnji odmor", "ZDR"],
    related_articles: ["čl. 118 st. 1 tačka 1 ZDR", "čl. 163 ZDR", "čl. 232 ZPP"],
    headnote: "Mešoviti spor radnih i korporativnih pitanja zahteva posebnu primenu ZDR i ZPP po vidu potraživanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3543/2012",
    legal_area: "commercial",
    legal_question:
      "Da li usmeni sporazum osnivača o podeli prihoda mimo procedure raspodele dobiti proizvodi pravno dejstvo prema društvu?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i odbio tužbeni zahtev u celosti, smatrajući usmeni sporazum ništavim jer je suprotan prinudnim propisima.",
    reasoning:
      "Raspodela dobiti i odnosi između članova DOO moraju se ostvarivati u skladu sa zakonom i korporativnim aktima; usmeni dogovori o podeli ukupnog prihoda koji zaobilaze zakonski režim su protivni prinudnom redu i ne stvaraju obaveze društva prema trećim licima u tom obliku.",
    keywords: ["DOO", "osnivači", "prihod", "ništavost", "raspodela dobiti"],
    related_articles: ["ZPD"],
    headnote: "Privremeni ili usmeni dogovori mimo zakonskog mehanizma raspodele ne mogu zameniti korporativne odluke.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 763/2020",
    legal_area: "criminal",
    legal_question:
      "Da li radnje obmane banke radi nezakonite isplate kredita predstavljaju prevaru u službi ili neosnovano dobijanje kredita?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahteve za zaštitu zakonitosti i potvrdio kvalifikaciju prevara u službi sa izvršenjem u službi i umišljajem saizvršilaca.",
    reasoning:
      "Iz izreke proizilazi da su okrivljeni kao odgovorna lica, u dogovoru, obmanuli ovlašćeno lice Fonda za razvoj radi isplate sredstava, pri čemu su deo sredstava preusmerili radi pribavljanja koristi, što ispunjava obeležja prevara u službi iz čl. 363 st. 3 u vezi st. 1 u vezi čl. 33 KZ u saizvršilaštvu.",
    keywords: ["prevara u službi", "kredit", "Fond za razvoj", "saizvršilaštvo", "KZ"],
    related_articles: ["čl. 363 st. 1 i 3 KZ", "čl. 33 KZ"],
    headnote: "Obmana ovlašćenog lica radi isplate javnih sredstava kreditu može biti kvalifikovana kao prevara u službi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2315/2021",
    legal_area: "commercial",
    legal_question:
      "Da li pravnosnažna krivična presuda isključuje naknadnu parnicu protiv direktora i kako se odnosi prema solidarnosti sa društvom jemcem?",
    court_position:
      "Privredni apelacioni sud je ukinuo prvostepenu presudu i vratio predmet radi nejasnih i protivrečnih razloga o vezanosti za krivičnu presudu i solidarnosti.",
    reasoning:
      "Tuženi je dužnik na osnovu krivične presude; postojanje jemstva i regresa tužioca prema društvu ne isključuje automatski odgovornost tuženog ako su ispunjeni uslovi solidarnosti. Prvostepeni sud treba da utvrdi da li je tužilac naplatio potraživanje po drugoj presudi i pravilno primeni čl. 13 ZPP o vezanosti i čl. 414 ZOO o solidarnosti.",
    keywords: ["naknada štete", "krivična presuda", "vezanost", "solidarnost", "jemstvo"],
    related_articles: ["čl. 13 ZPP", "čl. 414 ZOO"],
    headnote: "Paralelno postojanje obaveza iz jemstva i krivične presude zahteva jasno činjenično utvrđivanje naplate i solidarnosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 5026/2021",
    legal_area: "commercial",
    legal_question:
      "Da li tužilja može tražiti naknadu štete u visini celog potraživanja ako likvidacioni upravnik namerno nije prijavio njeno potraživanje u stečaju, a visina štete zavisi od namirenja u stečajnoj masi?",
    court_position:
      "Sud je preinačio presudu i odbio tužbeni zahtev za naknadu štete jer tužilja nije dokazala visinu štete, odnosno iznos koji bi bio namiren u stečaju.",
    reasoning:
      "Odgovornost likvidacionog upravnika i umišljaj u neprijavi potraživanja ne zamenjuju dokaz o visini štete. Prekluzija prijava u stečaju služi pravnoj sigurnosti poverilaca. Tužilja je imala sudsku zaštitu i ranije prijave; trebalo je dokazati koji bi deo bio namiren u stečajnoj raspodeli.",
    keywords: ["likvidacioni upravnik", "stečaj", "naknada štete", "dokaz o visini", "ZOO"],
    related_articles: ["čl. 154 i 192 ZOO", "Zakon o stečaju"],
    headnote: "Utvrđena odgovornost upravnika ne oslobađa tužioca dokaza o konkretnoj visini štete u kontekstu stečajne namene.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Viši sud u Nišu",
    court_level: "high",
    case_number: "Po4 2/2025",
    legal_area: "criminal",
    legal_question:
      "Da li prouzrokovanje lažnog stečaja prividnim umanjenjem imovine i fiktivnim poslovima predstavlja teško krivično delo protiv privrede?",
    court_position:
      "Okrivljena je osuđena za prouzrokovanje lažnog stečaja kroz fiktivne poslove i priznavanje nepostojećih potraživanja, radi izbegavanja obaveza društva.",
    reasoning:
      "Utvrđeno je zajedničko delovanje sa suokrivljenim kao zakonski zastupnik i direktor, simulacija umanjenja imovine, fiktivna prodaja vozila i robe, donošenje odluka radi prividnog umanjenja imovine radi stečaja.",
    keywords: ["lažni stečaj", "direktor", "DOO", "simulacija", "privredno društvo"],
    related_articles: ["KZ – lažni stečaj / privredni delikti"],
    headnote: "Namerno dovođenje društva do stečaja kroz fiktivne transakcije i knjigovodstvene radnje predstavlja kvalifikovano delo.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3444/2023",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz ugovora o radu zakonit kada je utvrđeno da je zaposlena kršila radne obaveze i zloupotrebljavala položaj i sredstva poslodavca?",
    court_position:
      "Vrhovni sud je preinačio presudu apelacionog suda i potvrdio zakonitost otkaza, utvrđujući opravdane otkazne razloge uključujući neovlašćeno korišćenje sredstava i službenog vozila.",
    reasoning:
      "U obrazloženju je konstatovano pribavljanje protivpravne koristi i više povreda radnih obaveza (fiktivne fakture, neadekvatan nadzor troškova, zloupotreba položaja po čl. 359 st. 4 u vezi st. 1 KZ u vezi sa radnim odnosom), što opravdava otkaz po pravilima Zakon o radu.",
    keywords: ["otkaz", "zloupotreba položaja", "radna obaveza", "poslodavac", "KZ"],
    related_articles: ["Zakon o radu", "čl. 359 KZ"],
    headnote: "Teže povrede dužnosti poverenja i imovine poslodavca mogu biti samostalan i odlučan otkazni razlog.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2834/2022",
    legal_area: "labor",
    legal_question:
      "Da li upozorenje o otkazu mora potpisati isključivo direktor ili i drugo lice ovlašćeno za zastupanje poslodavca?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presudu Apelacionog suda jer upozorenje o postojanju razloga za otkaz nije odluka o pravima i obavezama zaposlenog, pa ga može potpisati lice ovlašćeno za zastupanje, ne samo direktor.",
    reasoning:
      "Klasifikacija akta kao upozorenja, a ne rešenja koje menja pravni položaj, vodi zaključku da formalni zahtev potpisa isključivo direktora nije osnovan ako je drugo lice ovlašćeno za zastupanje poslodavca.",
    keywords: ["upozorenje", "otkaz", "ovlašćenje", "zastupanje", "ZDR"],
    related_articles: ["Zakon o radu", "ZPP"],
    headnote: "Procesnopravna i materijalnopravna priroda upozorenja određuje ko ga može overiti u ime poslodavca.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 1/2016",
    legal_area: "criminal",
    legal_question:
      "Kako se odlučuje o žalbama u obimu organizovanog kriminala kada su predmet složene presude sa više okrivljenih?",
    court_position:
      "Apelacioni sud je delimično preinačio prvostepenu presudu smanjujući kaznu jednom okrivljenom, potvrdio oslobađanje drugog i osuđujuće delove za ostale, a za jednog okrivljenog ukinuo presudu i vratio predmet.",
    reasoning:
      "Odluka obuhvata različite ishode po okrivljenima zavisno od dokaza i pravnih osnova za svakog učesnika u strukturi privrednih društava i uloga odgovornih lica u periodu 2009. godine.",
    keywords: ["organizovani kriminal", "žalba", "delimično preinačenje", "ukidanje", "više okrivljenih"],
    related_articles: ["ZKP", "KZ"],
    headnote: "Masovne kaznene presude zahtevaju individualizaciju odgovornosti po svakom okrivljenom.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 410/2014",
    legal_area: "commercial",
    legal_question:
      "Da li direktor koji je upisan u APR-u u vreme prestupa odgovara za nedostavljanje finansijskog izveštaja i obaveštenja o razvrstavanju čak i ako je društvo brisano?",
    court_position:
      "Privredni apelacioni sud je odbio žalbu i potvrdio osuđujuću presudu protiv odgovornog lica za propuste u odnosu na APR.",
    reasoning:
      "Okrivljeni je bio dobrovoljni direktor do razrešenja odlukom osnivača, ali promena direktora nije registrovana u APR-u do brisanja društva, pa je po čl. 8 i 11 ZOPP ostao odgovorno lice u smislu zakonskog zastupanja u registru.",
    keywords: ["APR", "finansijski izveštaj", "direktor", "privredni prestup", "ZOPP"],
    related_articles: ["čl. 8 i 11 ZOPP"],
    headnote: "Upis u APR određuje odgovorno lice za administrativne obaveze prema registru i u odsustvu formalne registracije razrešenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 247/2024",
    legal_area: "commercial",
    legal_question:
      "Od kada teče rok za tužbu za isključenje člana društva za račun društva ako skupština ćuti na predlog?",
    court_position:
      "Ukinuto je rešenje o odbacivanju tužbe kao neblagovremene; primenjuje se rok od dva meseca od ćutanja skupštine pre sticanja prava na tužbu.",
    reasoning:
      "Pravilna primena rokova za korporativnu tužbu zahteva da se ne pomeša odbijanje dela tužbenog zahteva po meritu sa prigovorom neblagovremenosti, već da se rok veže za ćutanje organa na predlog člana.",
    keywords: ["isključenje člana", "rok", "skupština", "DOO", "korporativno"],
    related_articles: ["ZPD"],
    headnote: "Ćutanje skupštine pokreće prekluzivni okvir za podnošenje tužbe za isključenje člana.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 132/2023",
    legal_area: "criminal",
    legal_question:
      "Da li faktički vlasnik i de facto rukovalac preduzećem može biti izvršilac poreske utaje iako nije upisan kao direktor u APR-u?",
    court_position:
      "Vrhovni kasacioni sud je odbio zaštitu zakonitosti i potvrdio da faktičko odgovorno lice može biti izvršilac dela poreske utaje bez formalnog upisa u registar.",
    reasoning:
      "Prigovori na konstrukciju „odgovornog lica“ putem specijalnog punomoćja i osporavanje vlasništva ne umanjuju zaključak suda da je okrivljeni bio stvarni nosilac kontrole poslovanja, što je relevantno za kvalifikaciju poreske utaje koja ne zahteva posebno svojstvo odgovornog lica u svim slučajevima.",
    keywords: ["poreska utaja", "faktički direktor", "APR", "zaštita zakonitosti"],
    related_articles: ["KZ – poreske delikte"],
    headnote: "Ekonomska stvarnost upravljanja može prevazići formalni upis u registru pri utvrđivanju izvršioca poreske utaje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 30/2019",
    legal_area: "criminal",
    legal_question:
      "Da li su okrivljeni odgovorni za produženo zloupotrebu položaja i poreske utaje u lancu privrednih društava?",
    court_position:
      "Apelacioni sud je delimično usvojio žalbe i preinačio prvostepenu presudu: potvrđena je osuda za zloupotrebu položaja uz izmenu kazni, dok su optužbe za poreske utaje u delu oslobađanja prema drugim okrivljenima odbijene ili preinačene.",
    reasoning:
      "Utvrđena su svojstva odgovornih lica u „FAM“ DOO i drugim društvima u relevantnim periodima na osnovu odluka organa upravljanja i registracionih podataka, što je osnov za individualizaciju učestništva u zloupotrebi položaja.",
    keywords: ["zloupotreba položaja", "poreska utaja", "generalni direktor", "lanac društava"],
    related_articles: ["KZ"],
    headnote: "Višestruke uloge odgovornih lica u povezanim društvima zahtevaju posebno utvrđivanje perioda i funkcije za svaku optužbu.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 256/2020",
    legal_area: "commercial",
    legal_question:
      "Da li direktor može preneti odgovornost za povredu Zakona o sprečavanju pranja novca na knjigovođu angažovanog po ugovoru?",
    court_position:
      "Privredni apelacioni sud je preinačio presudu u delu kazni i izrekao veće novčane kazne, ocenivši da direktor ne može prebaciti zakonske obaveze nadzora na treće lice.",
    reasoning:
      "Članovi 61 i 63 ZPD propisuju dužnost pažnje dobrog privrednika za direktora; odgovornost za propise o pranju novca i čl. 46 tog zakona ne može se ugovorno preneti na knjigovođu. Žalba koja se poziva na čl. 8 Zakona o računovodstvu ne oslobađa direktora.",
    keywords: ["pranje novca", "direktor", "privredni prestup", "nadzor", "ZPD"],
    related_articles: ["čl. 61 i 63 ZPD", "Zakon o sprečavanju pranja novca i finansiranja terorizma", "čl. 8 i 11 ZOPP"],
    headnote: "Korporativni organ ne može delegisati krivično-relevantni nadzor na spoljno lice kako bi izbegao odgovornost za prestup.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 653/2013",
    legal_area: "commercial",
    legal_question:
      "Da li direktor može ugovorom preneti zakonsku obavezu dostavljanja finansijskog izveštaja i odluke o razvrstavanju na angažovanog knjigovođu?",
    court_position:
      "Privredni apelacioni sud je potvrdio osuđujuću presudu protiv pravnog i odgovornog lica, odbivši žalbu da je odgovornost prebačena na knjigovođu.",
    reasoning:
      "Direktor ne može ugovorom eliminisati svoje zakonske obaveze prema APR-u; odgovornost za računovodstvene propise ostaje na odgovornom licu upisanom u registru u smislu čl. 8 i 11 ZOPP.",
    keywords: ["finansijski izveštaj", "direktor", "knjigovođa", "privredni prestup", "ZOPP"],
    related_articles: ["čl. 68 Zakona o računovodstvu i reviziji", "čl. 8 i 11 ZOPP"],
    headnote: "Obaveza direktora prema registru nije delegabilna na knjigovođu radi izbegavanja sankcije.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pvž 77/2020",
    legal_area: "commercial",
    legal_question:
      "Da li se u vanparničnom postupku može postaviti privremeni zastupnik DOO kada društvo nema direktora, ako je već bilo rešenje o privremenom zastupniku koje je prestalo da važi?",
    court_position:
      "Sud je preinačio rešenje i odbacio predlog za novog privremenog zastupnika, jer zakonski uslov „ostajanje bez direktora“ nije ispunjen kada društvo nikada nije imalo direktora, već je ostalo bez privremenog zastupnika.",
    reasoning:
      "Po čl. 397 i 221 ZPD sud postavlja privremenog zastupnika kada društvo ostane bez direktora do imenovanja direktora od strane članova; u konkretnom slučaju društvo godinama nema direktora, a postavljanje niza privremenih zastupnika po zahtevu članova protivno je smislu zakona i ne sme pretvoriti sud u „staratelja“ društva.",
    keywords: ["privremeni zastupnik", "DOO", "direktor", "vanparnični postupak", "ZPD"],
    related_articles: ["čl. 221 ZPD", "čl. 397 ZPD"],
    headnote: "Nedostatak privremenog zastupnika nije isto što i nedostatak direktora za postavljanje novog privremenog zastupnika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 524/2019",
    legal_area: "criminal",
    legal_question:
      "Da li okrivljeni može snositi troškove branioca po službenoj dužnosti i veštačenja iz istrage za teže delo ako je kasnije osuđen za blaže delo?",
    court_position:
      "Vrhovni kasacioni sud je delimično usvojio zahtev za zaštitu zakonitosti i ukinuo odluku o troškovima postupka u tom delu.",
    reasoning:
      "Troškovi nastali u istrazi za teže krivično delo ne mogu u celosti biti naloženi okrivljenom ako je konačno osuđen za blaže delo, jer bi to bilo nerazmerno opterećenje u odnosu na konačnu kvalifikaciju i ulogu branioca po službenoj dužnosti.",
    keywords: ["troškovi postupka", "istraga", "zaštita zakonitosti", "kvalifikacija dela", "ZKP"],
    related_articles: ["ZKP", "KZ"],
    headnote: "Odluka o troškovima mora biti usklađena sa konačnom kvalifikacijom i stadijumom postupka.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 726/2017",
    legal_area: "commercial",
    legal_question:
      "Da li je pravilna primena zastarelosti za produženi privredni prestup zajedničkog delovanja pri preuzimanju akcija?",
    court_position:
      "Sud je potvrdio osuđujući deo za zajedničko delovanje, a ukinuo oslobađajući deo zbog pogrešne primene pravila o zastarelosti i vratio predmet na ponovno suđenje.",
    reasoning:
      "Zastarelost produženog privrednog prestupa zahteva posebnu ocenu; greška u primeni dovodi do ukidanja oslobađajućeg dela dok se osuđujući deo može zadržati ako je samostalno zakonit.",
    keywords: ["privredni prestup", "preuzimanje akcija", "zastarelost", "Zakon o preuzimanju akcionarskih društava"],
    related_articles: ["čl. 47 Zakona o preuzimanju akcionarskih društava", "ZOPP"],
    headnote: "Parcijalna zakonitost presude omogućava potvrdu osuđujućeg i ukidanje oslobađajućeg dela.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "PŽ 571/2019",
    legal_area: "commercial",
    legal_question:
      "Da li je za spor o naknadi štete koju direktor nanese društvu povredom dužnosti pažnje nadležan privredni sud?",
    court_position:
      "Apelacioni sud je potvrdio rešenje kojim je odbijen prigovor nenadležnosti privrednog suda.",
    reasoning:
      "Tužba zasnovana na čl. 63 ZPD protiv direktora za štetu društvu proizilazi iz primene ZPD, pa je privredni sud stvarno nadležan; primena čl. 401 st. 1 tačka 2 ZPP.",
    keywords: ["stvarna nadležnost", "privredni sud", "direktor", "naknada štete", "ZPD"],
    related_articles: ["čl. 63 ZPD", "čl. 401 st. 1 tačka 2 ZPP"],
    headnote: "Korporativna odgovornost direktora prema društvu za štetu spada u nadležnost privrednog suda.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 352/2021",
    legal_area: "commercial",
    legal_question:
      "Da li kontrolni član Republike Srbije odgovara za neplaćene zarade nakon brisanja jedinočlanog DOO u prinudnoj likvidaciji ako nije utvrđen proboj ograničene odgovornosti?",
    court_position:
      "Privredni apelacioni sud je potvrdio presudu kojom je tužena obavezana na isplatu neplaćenih zarada, uz ocenu da prigovori o pogrešnoj primeni čl. 548 st. 4 ZPD i stečajnog prava nisu osnovani u kontekstu utvrđenih činjenica.",
    reasoning:
      "Članovi DOO ne odgovaraju za obaveze društva osim u slučajevima iz čl. 18 ZPD (proboj); u konkretnom postupku prvostepeni sud je utvrdio osnov obaveze kontrolnog člana prema zaposlenima u skladu sa materijalnim pravom o odgovornosti jedinog člana države za obaveze prema radnicima brisanog društva.",
    keywords: ["kontrolni član", "Republika Srbija", "zarade", "DOO", "prinudna likvidacija"],
    related_articles: ["čl. 18 ZPD", "čl. 548 ZPD", "Zakon o stečaju"],
    headnote: "Država kao jedini član može odgovarati za radničke potraživanja po posebnim pravilima o kontroli i odgovornosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 372/2021",
    legal_area: "commercial",
    legal_question:
      "Da li kontrolni član Republike Srbije solidarno odgovara za dugovanja brisanog DOO nakon prinudne likvidacije bez utvrđenog proboja pravne ličnosti?",
    court_position:
      "Potvrđena je presuda kojom je tužena obavezana na izmirenje dugovanja brisanog društva kao kontrolnog člana sa neograničenom solidarnom odgovornošću.",
    reasoning:
      "Isti pravni okvir kao u srodnim predmetima: odgovornost člana van opšteg pravila ograničene odgovornosti kada su ispunjeni uslovi zakona o kontroli i položaju jedinog osnivača; osporavanje primene čl. 548 st. 4 u vezi sa čl. 18 ZPD nije prihvaćeno na utvrđenom činjeničnom stanju.",
    keywords: ["kontrolni član", "solidarna odgovornost", "Republika Srbija", "DOO", "dug"],
    related_articles: ["čl. 18 ZPD", "čl. 548 st. 3–4 ZPD"],
    headnote: "Kontrolni član može snositi solidarnu obavezu za neizmirena dugovanja društva kada to materijalno pravo dopušta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3956/2021",
    legal_area: "civil",
    legal_question:
      "Da li staro drvo na javnom zemljištu predstavlja opasnu stvar i da li korisnik zemljišta objektivno odgovara za štetu padom drveta?",
    court_position:
      "Vrhovni kasacioni sud je usvojio posebnu reviziju tužioca, preinačio drugostepenu presudu i usvojio tužbeni zahtev za naknadu materijalne štete.",
    reasoning:
      "Drvo deli pravnu sudbinu zemljišta; u konkretnim okolnostima predstavlja opasnu stvar koja zahteva pojačan nadzor. Tuženi kao korisnik odgovara po čl. 174 ZOO, a nije dokazao izuzimanje po čl. 177 st. 1–2 ZOO niti doprinos tužioca po st. 3. Tužilac je aktivno legitimisan korišćenjem priveza uz sporazum i nedostatkom protivljenja zakupodavca i korisnika.",
    keywords: ["opasna stvar", "objektivna odgovornost", "drvće", "ZOO", "revizija"],
    related_articles: ["čl. 174 ZOO", "čl. 177 ZOO", "čl. 189 st. 1 ZOO"],
    headnote: "Korisnik zemljišta može odgovarati kao imalac opasne stvari za štetu od drveta koje nije adekvatno nadzirano.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6959/2015",
    legal_area: "commercial",
    legal_question:
      "Da li je likvidacioni upravnik odgovoran za celokupnu štetu poveriocu ako propustom nije evidentirao potraživanje, ili samo do visine likvidacionog ostatka?",
    court_position:
      "Potvrđena je presuda kojom je likvidacioni upravnik obavezan na naknadu štete u celom iznosu potraživanja, odbijeni navodi o ograničenju na likvidacioni ostatak.",
    reasoning:
      "Odgovornost likvidacionog upravnika prema poveriocu za propuste u vršenju dužnosti nije ista institut kao odgovornost osnivača do visine uloga; radi se o deliktnoj odgovornosti za štetu u celosti ako propust onemogućava namirenje dosuđenog potraživanja.",
    keywords: ["likvidacioni upravnik", "naknada štete", "poverilac", "likvidacija", "ZPD"],
    related_articles: ["čl. 357–359 ZPD", "ZOO"],
    headnote: "Deliktna odgovornost likvidacionog upravnika može obuhvatiti ceo neizmireni iznos poverioca, ne samo procenat namirenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 462/2022",
    legal_area: "commercial",
    legal_question:
      "Da li direktor odgovara za privredni prestup ispustanja otpadnih voda sa prekoračenjem fosfora u smislu Zakona o vodama?",
    court_position:
      "Sud je usvojio žalbu javnog tužioca, preinačio oslobađajuću presudu i oglašava pravno i odgovorno lice krivim za privredni prestup.",
    reasoning:
      "Po čl. 9 i 11 ZOPP pravno lice odgovara za prestup radnjom ili propustom nadzora, a odgovorno lice i za propust dužnog nadzora sa svesnim nehatom gde zakon dopušta. Direktor je bio zakonski zastupnik i dužan je pažnja dobrog privrednika po čl. 61 i 63 ZPD.",
    keywords: ["privredni prestup", "Zakon o vodama", "direktor", "ZOPP", "fosfor"],
    related_articles: ["Zakon o vodama", "čl. 8–11 ZOPP", "čl. 61–63 ZPD"],
    headnote: "Ekološki privredni prestupi povlače odgovornost pravnog lica i direktora uz standard pažnje dobrog privrednika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 122/2020",
    legal_area: "commercial",
    legal_question:
      "Da li direktor odgovara za nedostavljanje finansijskih izveštaja ako je pravno lice brisano iz APR-a posle prestupa?",
    court_position:
      "Sud je po službenoj dužnosti preinačio presudu u delu kazne: potvrđena odgovornost direktora, umanjena novčana kazna kao primerenija.",
    reasoning:
      "Isti princip kao u srodnim predmetima: u vreme prestupa upis u APR kao direktor određuje odgovornost; čl. 51 st. 2 ZOPP obustavlja postupak prema pravnom licu koje prestane da postoji, ali ne i prema odgovornom licu. Javnost registracije podržava obavezu svesnosti o obavezama.",
    keywords: ["finansijski izveštaji", "brisano DOO", "direktor", "ZOPP", "APR"],
    related_articles: ["čl. 51 st. 2 ZOPP", "čl. 61–63 ZPD", "Zakon o registraciji u APR"],
    headnote: "Brisanje društva ne briše odgovornost direktora za propuste u obavljanju obaveza prema APR-u u kritičnom periodu.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 936/2022",
    legal_area: "commercial",
    legal_question:
      "Da li naknadne novčane transakcije između povezanih lica i tuženog čine ništavim ugovor o kupoprodaji nepokretnosti?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio punovažnost ugovora o kupoprodaji nepokretnosti.",
    reasoning:
      "Ništavost se ne može zasnivati isključivo na tvrdnjama o skrivenoj nameri i povratu kupoprodajne cene preko zavisnog društva ako nižestepeni sudovi na utvrđeno stanje zaključe da te okolnosti ne utiču na valjanost samog ugovora o kupoprodaji od 22.09.2017. godine.",
    keywords: ["kupoprodaja nepokretnosti", "ništavost", "povezana lica", "revizija", "ZOO"],
    related_articles: ["ZOO", "ZPP"],
    headnote: "Sporedni finansijski obrti ne ruše punovažnost kupoprodaje ako nisu dokazani elementi ništavosti samog ugovora.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 516/2013",
    legal_area: "commercial",
    legal_question:
      "Da li ogranak privrednog društva može biti okrivljeno pravno lice u postupku za privredni prestup?",
    court_position:
      "Privredni apelacioni sud je ukinuo prvostepenu presudu jer je kao okrivljeno pravno lice pogrešno označen ogranak koji nema svojstvo pravnog lica.",
    reasoning:
      "Za privredni prestup odgovara samo matično privredno društvo; ogranak se može navesti radi tačnosti opisa radnje, ali ne i kao samostalni okrivljeni subjekt. Postupak protiv pravnog i odgovornog lica je jedinstven po čl. 51 ZOPP, pa ukidanje zbog bitne povrede u označenju pravnog lica vodi ukidanju u celosti.",
    keywords: ["ogranak", "privredni prestup", "pravno lice", "bitna povreda", "ZOPP"],
    related_articles: ["čl. 6 ZOPP", "čl. 438 st. 1 tačka 11 ZKP"],
    headnote: "Ogranak nema procesnu subjektivnost okrivljenog pravnog lica u privredno-kazenom postupku.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 417/2014",
    legal_area: "commercial",
    legal_question:
      "Da li prestanak funkcije direktora AD isključuje odgovornost ako ostavka nije registrovana u APR-u?",
    court_position:
      "Privredni apelacioni sud je ukinuo oslobađajuću presudu zbog bitne povrede postupka i pogrešnog zaključka o odgovornosti zakonskog zastupnika.",
    reasoning:
      "Prvostepeni sud je zasnovao odluku na dokazima koji nisu izvedeni na glavnom pretresu i pogrešno smatrao da neregistrovana ostavka isključuje odgovornost, suprotno čl. 396 ZPD o dejstvu ostavke, registraciji i obavezi privremenog obavljanja poslova koji ne trpe odlaganje.",
    keywords: ["AD", "direktor", "ostavka", "APR", "privredni prestup"],
    related_articles: ["čl. 396 ZPD", "ZOPP", "ZKP"],
    headnote: "Registracija ostavke i prelazne dužnosti direktora moraju biti pravilno ocenjeni radi utvrđivanja odgovornog lica u kritičnom periodu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 13452/2013",
    legal_area: "administrative",
    legal_question:
      "Da li član društva kao fizičko lice može podneti žalbu na rešenje APR-a o promeni člana društva?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio osporeno rešenje kojim je odbačena žalba člana, jer žalbu može podneti samo podnosilac registracione prijave.",
    reasoning:
      "Po Zakonu o postupku registracije u APR-u pravo žalbe ima podnosilac prijave; tužilac kao fizičko lice i član, a ne podnosilac prijave, nije procesno legitimisan za žalbu u ime društva bez punomoćja zakonskog zastupnika. Pobijanje punovažnosti ugovora o prenosu udela pripada parnici, ne upravnom registarskom postupku.",
    keywords: ["APR", "žalba", "član DOO", "legitimacija", "registracija"],
    related_articles: ["čl. 25 Zakona o postupku registracije u APR", "čl. 218 ZPD", "čl. 40 st. 2 Zakona o upravnim sporovima"],
    headnote: "Registraciona žalba je strukturisano pravo podnosioca prijave, a ne svakog člana društva.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6940/2012",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito brisanje reda vožnje ako postoje dokazi o zakupu vozila i povezanosti prevoznika?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje ministarstva o brisanju reda vožnje jer činjenično stanje nije bilo potpuno utvrđeno.",
    reasoning:
      "Tužilac je dostavio izjašnjenje sa ugovorom o zakupu vozila i podacima o statusnoj promeni subjekta; zaključak da je neovlašćeni prevoznik obavljao prevoz doveo je u sumnju bez pouzdane ocene tih dokaza, što predstavlja bitnu povredu postupka i nepouzdanu činjeničnu osnovu.",
    keywords: ["drumski prevoz", "red vožnje", "zakup vozila", "APR", "upravni spor"],
    related_articles: ["Zakon o drumskom saobraćaju", "Zakona o opštem upravnom postupku"],
    headnote: "Brisanje reda vožnje zahteva potpuno utvrđivanje ko je stvarno obavljao prevoz i na kom pravnom osnovu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3055/2023",
    legal_area: "civil",
    legal_question:
      "Ko ima jači pravni osnov u sporu dvostruke prodaje stana između kupaca – savestan sticalac u posedu ili drugi kupac?",
    court_position:
      "Apelacioni sud je odbio žalbu tužioca i potvrdio odbijanje zahteva za iseljenje, utvrđujući da tuženi kao savestan sticalac u posedu ima jači osnov.",
    reasoning:
      "Utvrđen je lanac pravnih poslova (predugovor, aneks, kupoprodaja) i okolnosti sticanja; drugi kupac nije postupio savesno u proveri pravnog osnova prodavca, dok je tuženi stekao posed i poverenje u odnosu na prodavca.",
    keywords: ["dvostruka prodaja", "stan", "savestan sticalac", "posed", "iselenje"],
    related_articles: ["ZOO", "ZPP"],
    headnote: "U konfliktu kupaca značajna je savesnost pri sticanju i proveri pravnog lanca prethodnika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 16842/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito preduzetniku privremeno oduzeti PIB zbog poreskog duga povezanog pravnog lica čiji je osnivač?",
    court_position:
      "Upravni sud je odbio tužbu protiv rešenja Poreske uprave kojim je privremeno oduzet PIB preduzetniku zbog neizmirenih obaveza povezanog DOO.",
    reasoning:
      "ZPPA predviđa smetnje za dodelu i zadržavanje PIB kada postoje dospeli neizmireni javni prihodi u propisanim situacijama; osporavanje tužioca da dug pripada društvu a ne njemu lično ne umanjuje zakonitost kada je osnov propisan u zakonu i utvrđen u postupku.",
    keywords: ["PIB", "preduzetnik", "poreski dug", "povezano lice", "ZPPA"],
    related_articles: ["čl. 26 st. 2 tačka 4 ZPPA"],
    headnote: "Privremeno oduzimanje PIB može biti zakonito kada su ispunjeni zakonski uslovi vezanosti obaveza.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3819/2023",
    legal_area: "civil",
    legal_question:
      "Da li je potraživanje naknade štete od bespravnog korišćenja poslovnog prostora zastaralo kada tužba podneta sa višegodišnjim kašnjenjem?",
    court_position:
      "Apelacioni sud je delimično potvrdio a delimično ukinuo prvostepenu presudu: potvrđen odbacaj zbog litispendencije i odbijanje zbog zastarelosti za deo perioda; ukinut deo o naknadi štete jer teret dokazivanja iseljenja leži na tuženom.",
    reasoning:
      "Po čl. 376 st. 1 ZOO rok od tri godine teče od saznanja za štetu i učinioca; tužilac je imao saznanje o bespravnom korišćenju prethodnika tuženog, pa su potraživanja za raniji period zastarala; za ostatak je potrebno pravilno raspodeliti teret dokaza o iseljenju i obimu korišćenja.",
    keywords: ["bespravno korišćenje", "zastarelost", "naknada štete", "ZOO", "poslovni prostor"],
    related_articles: ["čl. 376 st. 1 ZOO"],
    headnote: "Subjektivni i objektivni elementi zastarelosti moraju se primeniti od stvarnog saznanja o šteti.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3837/2022",
    legal_area: "civil",
    legal_question:
      "Da li punomoćnik investitora može tražiti naknadu štete zbog neizdavanja građevinske dozvole i izgubljene dobiti od mini hidroelektrane?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbenog zahteva jer tužilac nije aktivno legitimisan za deo zahteva koji pripada pravnom licu, niti je dokazana uzročnost.",
    reasoning:
      "Zahtev za izgubljenu dobit vezan za vlasništvo preduzeća mora podneti subjekt čije je pravo povređeno; tužilac kao fizičko lice nije dokazao odnos sa tuženim niti uzrok štete pri objektima izgrađenim bez građevinske dozvole.",
    keywords: ["aktivna legitimacija", "naknada štete", "građevinska dozvola", "investitor", "ZPP"],
    related_articles: ["čl. 231 ZPP", "ZOO"],
    headnote: "Naknada štete za poslovne projekte zahteva ispravnu stranku i dokaze o uzročnosti i protivpravnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10920/2014",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbijena tužba prevoznika za poništaj rešenja o brisanju reda vožnje kada je drugi prevoznik koristio liniju duže od 15 dana?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio zakonitost rešenja ministarstva o brisanju reda vožnje.",
    reasoning:
      "Tuženi organ je pravilno ocenio da prevoznik nije dostavio dokaze o održavanju polaska u roku, dok je izjašnjenje o zakupu vozila i povezanim licima ocenjeno kao nedovoljno da pomene zakonitost brisanja kada je utvrđeno korišćenje linije od strane drugog subjekta duže od 15 dana.",
    keywords: ["red vožnje", "brisanje", "drumski prevoz", "inspekcija", "UPP"],
    related_articles: ["Zakon o drumskom saobraćaju", "ZOP"],
    headnote: "Nedostatak dokaza o izvršavanju prevoza i upotreba linije od strane trećeg lica mogu opravdati brisanje reda vožnje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pvž 704/2016",
    legal_area: "commercial",
    legal_question:
      "Da li je član odbora poverilaca povezano lice sa stečajnim dužnikom u smislu Zakona o stečaju radi razrešenja?",
    court_position:
      "Privredni apelacioni sud je ukinuo prvostepeno rešenje kojim je odbijen predlog za razrešenje člana odbora poverilaca.",
    reasoning:
      "Porodične i vlasničke veze između osnivača člana odbora poverilaca i stečajnog dužnika, uključujući uloge supruge, sina i direktora, ukazuju na povezanost u smislu čl. 125 st. 1 tačka 5 Zakona o stečaju (pristup poverljivim informacijama i finansijskom stanju), pa prvostepeni sud nije dao jasne razloge za odbijanje predloga.",
    keywords: ["odbor poverilaca", "stečaj", "povezana lica", "razrešenje", "Zakon o stečaju"],
    related_articles: ["čl. 125 st. 1 tačka 5 Zakona o stečaju"],
    headnote: "Porodično-vlasnička mreža između člana odbora poverilaca i dužnika može ispunjavati zakonsko pojam povezanosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 156/2025",
    legal_area: "criminal",
    legal_question:
      "Da li izreka sadrži sva obeležja zloupotrebe položaja odgovornog lica u vezi sa rudarskim dozvolama i isporukom peska?",
    court_position:
      "Vrhovni sud je odbio zahtev za zaštitu zakonitosti branioca kao neosnovan, utvrdivši da je delo u potpunosti opisano u izreci uključujući i blanketnu normu.",
    reasoning:
      "Opis obuhvata radnje suprotne Zakonu o rudarstvu i geološkim istraživanjima (čl. 77), isporuku peska bez odgovarajuće dozvole, korišćenje dokumentacije drugog subjekta i pribavljanje protivpravne imovinske koristi u konkretnom iznosu, uz subjektivna obeležja.",
    keywords: ["zloupotreba položaja", "rudarstvo", "pesak", "KZ", "zaštita zakonitosti"],
    related_articles: ["čl. 227 st. 1–2 KZ", "Zakon o rudarstvu i geološkim istraživanjima"],
    headnote: "Potpuna i jasna izreka isključuje uspeh zaštite zakonitosti zbog navodne nejasnoće obeležja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1191/2021",
    legal_area: "labor",
    legal_question:
      "Da li je tuženi pravni sledbenik poslodavca kada je imovina uneta u novo društvo osnivačkim ulogom posle stečaja?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio nedostatak pasivne legitimacije tuženog jer prenos imovine osnivačkim ulogom nije univerzalna sukcesija.",
    reasoning:
      "Subjektivno preinačenje tužbe ka novim društvima ne stvara automatski obavezu „Bruno invest“ DOO kao pravnog sledbenika radnog sporaznog odnosa bez univerzalnog ili zakonskog prenosa radnih obaveza; singularna sukcesija ulaganjem imovine ne prenosi automatski status poslodavca.",
    keywords: ["pasivna legitimacija", "radni spor", "statusna promena", "sukcesija", "ZPD"],
    related_articles: ["ZPD", "Zakon o radu", "ZPP"],
    headnote: "Unos imovine u novo društvo ulogom nije isto što i prenos radnih obaveza prethodnog poslodavca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1 175/2012",
    legal_area: "labor",
    legal_question:
      "Da li poslodavci solidarno odgovaraju za povredu na radu i kako se utvrđuje doprinos oštećenog?",
    court_position:
      "Apelacioni sud je delimično preinačio presudu u delu visine naknade za naruženost, potvrdivši solidarnu odgovornost oba poslodavca i doprinos radnika od 10%.",
    reasoning:
      "Jedan poslodavac nije obezbedio uvid u zdravstvenu sposobnost i nadzor nad izvođenjem radova nakon naloga; drugi je angažovao radnike. Kod učešća oštećenog u nastanku štete primenjuje se čl. 192 ZOO uz srazmerno umanjenje naknade.",
    keywords: ["povreda na radu", "solidarna odgovornost", "doprinos", "naknada štete", "ZOO"],
    related_articles: ["čl. 192 ZOO", "Zakon o radu"],
    headnote: "Više angažovanih poslodavaca može solidarno odgovarati kada zajednički stvaraju rizik bez adekvatnog nadzora.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "P 9/2025",
    legal_area: "procedural",
    legal_question:
      "Da li branilac pravnog i odgovornog lica može podneti zahtev za zaštitu zakonitosti u postupku za privredni prestup?",
    court_position:
      "Vrhovni sud je odbacio zahtev za zaštitu zakonitosti kao nedozvoljen, jer je po Zakonu o privrednim prestupima ovlašćen isključivo javni tužilac.",
    reasoning:
      "Institut zaštite zakonitosti u privredno-kazenom postupku ima posebnu procesnu ustrojenost; branilac nema legitimaciju za ovaj vanredni pravni lek, nezavisno od pobijanih razloga u meritu.",
    keywords: ["zaštita zakonitosti", "privredni prestup", "branilac", "javni tužilac", "ZOPP"],
    related_articles: ["ZOPP", "ZKP"],
    headnote: "Zaštita zakonitosti u ZOPP je restriktivno dodeljena nadležnom javnom tužiocu.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 89/2018",
    legal_area: "commercial",
    legal_question:
      "Da li ostavka direktora koja nije registrovana u APR-u isključuje odgovornost za nedostavljanje izjave o neaktivnosti?",
    court_position:
      "Privredni apelacioni sud je potvrdio osuđujuću presudu protiv udruženja i odgovornog lica, ocenivši da je upis u APR odlučan za odgovornost.",
    reasoning:
      "Direktor ostaje odgovorno lice za obavezu prema APR-u dok je upisan; sam funkcionar položaj povlači obaveze i moguće sankcije. Ublažene novčane kazne su pravilno odmerene uz olakšavajuće okolnosti i čl. 23 ZOPP.",
    keywords: ["izjava o neaktivnosti", "APR", "direktor", "privredni prestup", "ZOPP"],
    related_articles: ["čl. 8 i 11 ZOPP", "čl. 23 ZOPP", "čl. 457 ZKP"],
    headnote: "Registar APR određuje ko je odgovorno lice u odnosu na obaveze prema finansijskim izveštajima i izjavama.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 7142/2014",
    legal_area: "commercial",
    legal_question:
      "Da li član sa 20% udela automatski odgovara solidarno sa drugim članovima za štetu društva kao kontrolni član?",
    court_position:
      "Privredni apelacioni sud je preinačio presudu i odbio tužbeni zahtev prema drugotuženom, jer sa 20% udela nije bio kontrolni član niti je dokazano zajedničko delovanje.",
    reasoning:
      "Po tada važećem čl. 31 ZPD dužnost prema društvu imaju i kontrolni članovi; iz dokaza proizlazi da je prvotuženi bio zastupnik, a ne drugotuženi sa manjim udelom koji nije bio u organima upravljanja, pa ne postoji automatska odgovornost „zajedničkog delovanja“.",
    keywords: ["kontrolni član", "udel", "solidarna odgovornost", "ZPD", "naknada štete"],
    related_articles: ["čl. 31 ZPD", "čl. 368 ZPD"],
    headnote: "Manjinski udeo bez kontrolnih funkcija ne povlači odgovornost kontrolnog člana bez posebnog dokaza.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5780/2022",
    legal_area: "commercial",
    legal_question:
      "Da li poverilac ima pravni interes da traži utvrđenje ništavosti fiktivnog ugovora koji je dužnik zaključio radi onemogućavanja naplate?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude i utvrdio da postoji interes za utvrđenje ništavosti ugovora koji je fiktivan i usmeren na sprečavanje naplate potraživanja.",
    reasoning:
      "Fiktivni ugovor o pristupanju dugu ili drugi pravni posao koji prikriva nameru da se poverilac spreči u naplati može biti ništav; sudovi su pogrešno odbili tužbu ne ceneći pravni interes i karakter posla u lancu lizinga, hipoteke i naknadnih transakcija.",
    keywords: ["ništavost", "fiktivni ugovor", "poverilac", "lizing", "pravni interes"],
    related_articles: ["ZOO", "čl. 407 ZPP"],
    headnote: "Ništavost posla usmerenog na oštećenje poverilaca može se tražiti ako postoji pravni interes, nezavisno od složenosti lanca ugovora.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 68/2020",
    legal_area: "commercial",
    legal_question:
      "Da li direktor odgovara za privredni prestup nepoštovanja naloga veterinarskog inspektora ako je roba prodata greškom komercijaliste?",
    court_position:
      "Privredni apelacioni sud je potvrdio osuđujuću presudu za pravno i odgovorno lice, ocenivši da je direktor postupao sa svesnim nehatom u smislu zakona o veterinarstvu.",
    reasoning:
      "Za prestup iz čl. 157 st. 1 tačka 17 Zakona o veterinarstvu nije potreban umišljaj; dovoljan je svesni nehat. Roba u lagerskim komorama mora biti završenog uvoza; odgovornost direktora sledi iz čl. 61 i 63 ZPD (pažnja dobrog privrednika), bez obzira na grešku komercijaliste.",
    keywords: ["veterinarstvo", "uvoz robe", "direktor", "privredni prestup", "ZOPP"],
    related_articles: ["Zakon o veterinarstvu", "čl. 8–11 ZOPP", "čl. 61–63 ZPD"],
    headnote: "Organizaciona greška podređenog ne isključuje odgovornost direktora za kršenje uvoznog i inspekcijskog režima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Osnovni sud u Leskovcu",
    court_level: "basic",
    case_number: "RS 85/2005",
    legal_area: "criminal",
    legal_question:
      "Da li predstavljanje preduzeća kao solventnog radi avansnog plaćanja javne nabavke kulture, uz neispunjenje, čini privrednu prevaru?",
    court_position:
      "Okrivljeni je proglašen krivim za prevaru kojom je oštetio budžet opštine, jer je doveo u zabludu Kulturni centar radi avansa za manifestaciju znajući da obaveze neće ispuniti.",
    reasoning:
      "Korišćenje javne nabavke male vrednosti, lažno predstavljanje sposobnosti društva i neizvršenje ugovora nakon avansa od 1.400.000 dinara ispunjava obeležja prevare na štetu imovine budžetskog korisnika.",
    keywords: ["privredna prevara", "javna nabavka", "avans", "budžet", "kultura"],
    related_articles: ["KZ – prevara"],
    headnote: "Lažno predstavljanje solventnosti radi avansa u javnoj nabavi može biti prevara na štetu javnih sredstava.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 5134/2021",
    legal_area: "commercial",
    legal_question:
      "Da li je dopuštena privremena mera razrešenja direktora u sporu o prinudnoj likvidaciji DOO kada direktor ne može biti direktor zbog krivične presude?",
    court_position:
      "Privredni apelacioni sud je usvojio žalbu tuženog, preinačio rešenje i odbio predlog privremene mere jer nije dokazana verovatna opasnost po potraživanje i mera ne služi obezbeđenju tužbenog zahteva.",
    reasoning:
      "Prvostepeni sud je pogrešno primenio čl. 469 st. 3 ZPD vezano za mogućnost presudnog razrešenja direktora; privremena mera mora biti srazmerna i ne sme se zasnivati isključivo na krivičnoj osudi direktora bez ocene uslova iz Zakona o privremenim merama.",
    keywords: ["privremena mera", "direktor", "prinudna likvidacija", "DOO", "ZPD"],
    related_articles: ["čl. 469 st. 3 ZPD", "čl. 382 ZPD"],
    headnote: "Privremena mera razrešenja direktora zahteva verovatnu opasnost i vezu sa obezbeđenjem tužbenog zahteva, ne samo krivičnu osudu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "Uv 430/2018",
    legal_area: "administrative",
    legal_question:
      "Da li lice koje nije bilo stranka u upravnom postupku registracije može podneti tužbu na rešenje o žalbi drugog subjekta?",
    court_position:
      "Posebno veće Upravnog suda odbilo je prigovor i potvrdilo odbačaj tužbe jer tužilac nije imao svojstvo stranke u postupku u kojem je donet osporeni akt.",
    reasoning:
      "Po čl. 11 st. 1 Zakona o upravnim sporovima tužilac može biti samo lice kome je priznat status stranke u upravnom postupku; u registraciji statusne promene učestvuju pravna lica učesnici, ne i fizičko lice član bez punomoćja društva.",
    keywords: ["upravni spor", "legitimacija", "APR", "stranka", "ZUS"],
    related_articles: ["čl. 11 st. 1 ZUS", "čl. 26 st. 1 tačka 4 ZUS", "čl. 47 st. 2 ZOP"],
    headnote: "Tužba na rešenje o žalbi u APR postupku zahteva stranački status u tom upravnom postupku.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 33/2023",
    legal_area: "commercial",
    legal_question:
      "Da li likvidacioni upravnik odgovara za štetu poveriocu u celom iznosu dosuđenog potraživanja ili samo do dela namirenja u kasnijem stečaju?",
    court_position:
      "Vrhovni kasacioni sud je usvojio izuzetno dozvoljenu reviziju tužilje, preinačio drugostepenu presudu i potvrdio prvostepenu obavezu likvidacionog upravnika na celokupan iznos štete.",
    reasoning:
      "Po čl. 544 ZPD propusti likvidacionog upravnika koji onemoguće namirenje pravnosnažnog potraživanja poverioca stvaraju štetu u visini celog potraživanja, a ne samo hipotetskog procenta namirenja u stečaju.",
    keywords: ["likvidacioni upravnik", "naknada štete", "poverilac", "ZPD", "revizija"],
    related_articles: ["čl. 544 ZPD"],
    headnote: "Šteta zbog propusta likvidacionog upravnika meri se punim neizmirenim potraživanjem utvrđenim presudom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Nišu",
    court_level: "appellate",
    case_number: "Gž3 64/2020",
    legal_area: "civil",
    legal_question:
      "Ko odgovara za štetu zbog netačne informacije o visini rashoda sindikata u mediju – izdavač ili direktor ustanove?",
    court_position:
      "Apelacioni sud je delimično potvrdio presudu protiv izdavača „Kurir info“ za naknadu štete, a delimično preinačio oslobađajući direktor KCS-a jer su njegove izjave deo javne polemike, dok je medij propustio proveru informacije.",
    reasoning:
      "Po Zakonu o javnom informisanju odgovorni urednik dužan je da objavi presudu o naknadi štete; obaveza nije mogla biti prebačena na izdavača koji nije pasivno legitimisan za taj zahtev. Sadržaj teksta i izjava direktora ocenjeni su u kontekstu sindikalnog sukoba i finansijske transparentnosti.",
    keywords: ["mediji", "naknada štete", "kleveta", "sindikat", "javno informisanje"],
    related_articles: ["čl. 90 Zakona o javnom informisanju"],
    headnote: "Objava netačnih podataka o javnim rashodima može teretiti izdavača uz razlikovanje uloge direktora u polemici.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 321/2016",
    legal_area: "commercial",
    legal_question:
      "Da li direktor koji je preuzeo dužnost od prethodnika odgovara za privredni prestup otkriven inspekcijom koja je započeta za vreme prethodnika?",
    court_position:
      "Privredni apelacioni sud je potvrdio osuđujuću presudu protiv direktora koji je u vreme inspekcije bio upisan u APR-u, odbivši žalbu koja nije donosila nove dokaze.",
    reasoning:
      "U vreme kontrole u APR-u je bio AA kao direktor, pa je imao obavezu organizacije poslova u skladu sa propisima o registraciji distributera i uvoznika; prenos dužnosti od prethodnika ne uklanja odgovornost ako je u kritično vreme upisan kao direktor.",
    keywords: ["direktor", "privredni prestup", "inspekcija", "APR", "ZOPP"],
    related_articles: ["čl. 8–11 ZOPP", "čl. 61–63 ZPD"],
    headnote: "Upis u APR u trenutku kontrole određuje lice odgovorno za propuste u poslovanju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 117/2014",
    legal_area: "commercial",
    legal_question:
      "Da li je dopuštena uslovna osuda za privredni prestup stavljanja u promet pića sa isteklim rokom trajanja?",
    court_position:
      "Privredni apelacioni sud je potvrdio osuđujuću presudu, ocenivši da težina prestupa koji ugrožava zdravlje ne opravdava uslovnu osudu.",
    reasoning:
      "Prestup je nastao propustom nadzora direktora u smislu čl. 9 ZOPP; direktor kao odgovorno lice u malom pravnom licu može biti saslušan i kao predstavnik i kao okrivljeni bez povrede postupka.",
    keywords: ["istekao rok", "hrana i piće", "privredni prestup", "direktor", "ZOPP"],
    related_articles: ["čl. 8–11 ZOPP", "čl. 9 ZOPP"],
    headnote: "Zdravstveno relevantni prestupi u prometu hrane mogu zahtevati izričitu kaznu bez uslovne osude.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6934/2014",
    legal_area: "commercial",
    legal_question:
      "Da li parnica o ništavosti osnivanja tužioca predstavlja prethodno pitanje u sporu zakupnine hotela?",
    court_position:
      "Privredni apelacioni sud je ukinuo rešenje o prekidu postupka, smatrajući da parnice o ništavosti osnivanja ne usporavaju postupak jer je tužilac upisan u registar sa parničnom sposobnošću do okončanja likvidacije.",
    reasoning:
      "Registrovani subjekt ima parničnu sposobnost; prethodno pitanje nije ispunjeno ako se osporava osnivanje paralelnim postupcima, jer pravni položaj tužioca proizlazi iz upisa dok traje likvidacioni postupak.",
    keywords: ["prekid postupka", "prethodno pitanje", "ništavost osnivanja", "DOO", "ZPP"],
    related_articles: ["čl. 386 ZPP", "ZPD"],
    headnote: "Upis u registar određuje parničnu sposobnost društva u sporu sa trećim licima uprkos sporovima o osnivanju.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15488/2014",
    legal_area: "administrative",
    legal_question:
      "Da li je zamenik direktora u Agenciji za privatizaciju u sukobu interesa ako je član odbora direktora preduzeća u restrukturiranju?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio rešenje Agencije za borbu protiv korupcije o utvrđenju sukoba interesa.",
    reasoning:
      "Funkcija u Agenciji za privatizaciju i članstvo u odboru direktora preduzeća koje je predmet restrukturiranja predstavlja kombinaciju položaja iz Zakona o Agenciji za borbu protiv korupcije; tužbeni navodi o nepostojanju „funkcionera“ nisu prihvaćeni na utvrđenom stanju.",
    keywords: ["sukob interesa", "Agencija za privatizaciju", "odbor direktora", "korupcija"],
    related_articles: ["Zakon o Agenciji za borbu protiv korupcije"],
    headnote: "Javna funkcija u agenciji za privatizaciju može biti u sukobu sa korporativnim mandatima u preduzećima iz portfolija.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 524/2019",
    legal_area: "commercial",
    legal_question:
      "Da li je prvostepeni sud preblago kaznio pravno i odgovorno lice za više privrednih prestupa u vezi sa kvalitetom naftnih derivata?",
    court_position:
      "Privredni apelacioni sud je usvojio žalbu tužioca, preinačio presudu u delu kazni i izrekao znatno više jedinstvene novčane kazne.",
    reasoning:
      "Prvostepeni sud je dao preveliki značaj olakšavajućim okolnostima; primenom čl. 20, 21, 23a i 116 ZOPP drugostepeni sud je odmerio strožije kazne srazmerne težini više povreda propisa o markiranju i kvalitetu derivata.",
    keywords: ["privredni prestup", "novčana kazna", "naftni derivati", "ZOPP"],
    related_articles: ["čl. 20, 21, 23a, 116 ZOPP"],
    headnote: "Višestruki privredni prestupi mogu zahtevati odvojeno i strožije odmeravanje kazni po okolnostima slučaja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6837/2021",
    legal_area: "commercial",
    legal_question:
      "Da li je važan ugovor o besplatnom korišćenju poslovnog prostora zaključen od „neovlašćenog“ zastupnika ako tužilac naknadno pristane konkludentno?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje zahteva za naknadu za korišćenje prostora jer je ugovor odobren konkludentnim radnjama tužioca.",
    reasoning:
      "Po čl. 88 st. 3 ZOO neovlašćeni zastupnik može stvoriti obavezu odobrenjem; odobrenje može biti konkludentno. Društvo bez upisanog direktora može pravno poslovati; sednica akcionara je usvojila predaju objekta na korišćenje uz uslove plaćanja režija, što predstavlja odobrenje.",
    keywords: ["neovlašćeno zastupanje", "odobrenje", "ZOO", "zakup", "DOO"],
    related_articles: ["čl. 88 st. 3 ZOO", "čl. 221 st. 4 ZPD"],
    headnote: "Konkludentno odobrenje poslovanja bez direktora može validirati ugovor o korišćenju imovine društva.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4155/2024",
    legal_area: "commercial",
    legal_question:
      "Da li je novoosnovano društvo „Srbija Kargo“ solidarno odgovorno za nekomercijalne obaveze pravnog prethodnika „Železnice Srbije“ u sporu o protivizvršenju?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za utvrđenje nedozvoljenosti protivizvršenja, jer sticalac po planu podele nije solidarno odgovoran za potraživanja za koja je poverilac ostvario posebnu zaštitu po ZPD.",
    reasoning:
      "Statusna promena izdvajanja uz osnivanje registrovana 2015. prenosi imovinu i obaveze po planu podele; izuzetak solidarnosti društva sticaoca važi za potraživanja iz čl. 509 ZPD kada je ostvarena određena zaštita, što isključuje solidarnost „Srbija Kargo“ za sporna nekomercijalna potraživanja.",
    keywords: ["statusna promena", "železnica", "solidarna odgovornost", "ZPD", "plan podele"],
    related_articles: ["čl. 505–506 ZPD", "čl. 509 ZPD"],
    headnote: "Izdvajanje uz osnivanje i plan podele određuje koji sticalac preuzima koje obaveze; solidarnost nije apsolutna.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 8142/2022",
    legal_area: "commercial",
    legal_question:
      "Da li kontrolni član odgovara za dug brisanog DOO ako prenos udela nije registrovan u APR-u?",
    court_position:
      "Privredni apelacioni sud je potvrdio presudu kojom je tuženi kao kontrolni član sa 100% udela na dan brisanja odgovara za dug, a delimično je preinačio odluku o troškovima jer vođenje parnice nije bilo neophodno.",
    reasoning:
      "Pravnosnažna presuda utvrđuje potraživanje; prenos udela bez registracije nema dejstvo prema trećim licima; jedini član na dan brisanja snosi odgovornost kontrolnog člana po ZPD u vezi sa izvršnom presudom.",
    keywords: ["kontrolni član", "APR", "dug", "brisano DOO", "troškovi"],
    related_articles: ["čl. 61–62 ZPD", "ZPP"],
    headnote: "Neregistrovani prenos udela ne štiti kontrolnog člana prema poveriocu koji se oslonio na registar.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 21406/2010",
    legal_area: "administrative",
    legal_question:
      "Da li je pogrešno primenjen Zakon o preduzetnicima umesto statusa direktora DOO u postupku za borački dodatak?",
    court_position:
      "Upravni sud je poništio rešenje jer drugostepeni organ nije ocenio ključni žalbeni navod da je tužilac direktor DOO, a ne preduzetnik.",
    reasoning:
      "Tužilac je priložio rešenje APR-a o osnivanju DOO čiji je osnivač i direktor; primena Zakona o preduzetnicima bez ocene tog navoda predstavlja bitnu povredu postupka i nepouzdanu primenu prava.",
    keywords: ["borački dodatak", "direktor", "DOO", "preduzetnik", "UPP"],
    related_articles: ["ZPD", "Zakon o radu", "Zakon o upravnim sporovima"],
    headnote: "Administrativni organ mora razlikovati preduzetnika od direktora društva pri primeni materijalnog prava.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9395/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li je zakonito privremeno oduzimanje PIB preduzetniku zbog duga brisanog DOO čiji je bio osnivač bez prethodnog rešenja o sekundarnoj poreskoj obavezi?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu jer nije doneto rešenje o sekundarnoj poreskoj obavezi pre oduzimanja PIB, što povređuje pravo na pravično suđenje i pravo na rad.",
    reasoning:
      "ZPPA postavlja uslove za privremeno oduzimanje identifikacionog broja; kada društvo prestane postojanjem stečaja godinama ranije, oduzimanje PIB preduzetniku zahteva poštovanje procedure o sekundarnoj obavezi i srazmernost.",
    keywords: ["PIB", "ustavna žalba", "preduzetnik", "poreska obaveza", "ZPPA"],
    related_articles: ["Ustav RS", "čl. 32, 36, 60, 70, 83 Ustava", "ZPPA"],
    headnote: "Oduzimanje PIB mora pratiti propisanu proceduru uključujući rešenje o sekundarnoj obavezi kada je to uslov zakonitosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pkž 398/2019",
    legal_area: "commercial",
    legal_question:
      "Da li su novčane kazne za privredne prestupe markiranja i kvaliteta naftnih derivata preblage?",
    court_position:
      "Privredni apelacioni sud je odbio žalbu okrivljenih, a usvojio žalbu tužioca i preinačio presudu uvećavajući novčane kazne pravnom i odgovornom licu.",
    reasoning:
      "Prvostepeni sud je dao prenaglašen značaj olakšavajućim okolnostima; drugostepeni sud je primenom ZOPP odmerio strožije kazne u skladu sa težinom povrede propisa o kvalitetu derivata.",
    keywords: ["privredni prestup", "naftni derivati", "kazna", "ZOPP"],
    related_articles: ["ZOPP"],
    headnote: "Žalba javnog tužioca može povećati kazne kada prvostepeni sud nije adekvatno cenio težinu dela.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5456/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li parnični sudovi moraju oceniti Protokol o obavezama posle statusne promene pri sporu o solidarnosti sticalaca?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i poništio presudu Apelacionog suda zbog povrede prava na pravično suđenje jer nisu ocenjeni ključni dokazi (Protokol).",
    reasoning:
      "Kod statusne promene izdvajanja uz osnivanje solidarnost sticalaca zavisi od raspodele obaveza u planu podele i odredaba čl. 505–506 ZPD; sud je dužan da uzme u obzir sporazum stranaka o obavezama nakon podela ako je to pravno značajno za spor.",
    keywords: ["ustavna žalba", "statusna promena", "solidarnost", "ZPD", "Protokol"],
    related_articles: ["čl. 32 Ustava", "čl. 505–506 ZPD"],
    headnote: "Presuda koja ignoriše Protokol o raspodeli obaveza nakon podele društva može povrediti pravo na pravično suđenje.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3144/2014",
    legal_area: "civil",
    legal_question:
      "Da li je dopuštena tužba za pobijanje ugovora o poklonu ako je ranijom presudom utvrđeno nedopušteno izvršenje na istoj nepokretnosti?",
    court_position:
      "Apelacioni sud je preinačio presudu i odbio tužbeni zahtev za pobijanje ugovora o poklonu jer postoji pravnosnažna presuda o nedopuštenosti izvršenja kojom tužilja nije iskoristila pobijanje.",
    reasoning:
      "Ranijim postupkom je utvrđeno nedopušteno izvršenje na stanu; tužilja nije podnela prigovor pobijanja u tom postupku, pa kasnija tužba za pobijanje poklona predstavlja nepoštovanje pravnosnažnosti i pravila o identičnom predmetu.",
    keywords: ["pobijanje", "poklon", "izvršenje", "res iudicata", "ZPP"],
    related_articles: ["ZOO", "ZPP"],
    headnote: "Pravnosnažnost presude o izvršenju na nepokretnosti isključuje naknadno pobijanje ugovora u novom postupku bez novih osnova.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 150/2020",
    legal_area: "commercial",
    legal_question:
      "Da li je alternativna obaveza iz ugovora o razmeni stanova ispunjena izborom tužioca i da li likvidacioni upravnik odgovara po ugovoru ili deliktu?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presude kojima je odbijen zahtev za naknadu štete zbog neizvršenja ugovora o razmeni i naložio ponovno odlučivanje.",
    reasoning:
      "Nižestepeni sudovi su pogrešno smatrali da je obaveza isključivo „nenovčana“ i da je tužilac konačno birao predmet; potrebno je utvrditi pravni osnov odgovornosti tuženog kao likvidacionog upravnika i jedinog člana koji je primio likvidacioni ostatak.",
    keywords: ["ugovor o razmeni", "likvidacioni upravnik", "naknada štete", "alternativna obaveza"],
    related_articles: ["ZOO", "ZPD", "ZPP"],
    headnote: "Mesovita uloga likvidacionog upravnika i člana zahteva posebno utvrđivanje osnova odgovornosti za neizvršenje obaveza društva.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 82/2022",
    legal_area: "commercial",
    legal_question:
      "Da li tužba društva protiv direktora za naknadu štete može biti odbijena zbog isteka petogodišnjeg roka iz čl. 77 ZPD ili saglasnosti članova sa poslovima?",
    court_position:
      "Vrhovni kasacioni sud je većinom odbio reviziju tužilaca i potvrdio odbijanje zahteva zbog prekluzije ili saglasnosti članova sa spornim poslovima.",
    reasoning:
      "Po čl. 77 ZPD tužba se može podneti u roku od šest meseci od saznanja za povredu, a najkasnije u roku od pet godina od povrede; saglasnost članova sa poslovima može isključiti osnov za spor.",
    keywords: ["rok", "ZPD", "direktor", "naknada štete", "saglasnost članova"],
    related_articles: ["čl. 64–77 ZPD"],
    headnote: "Objektivni petogodišnji rok i saglasnost članova mogu biti odlučni za tužbu društva protiv direktora.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2764/2017",
    legal_area: "enforcement",
    legal_question:
      "Da li je vlasnik vozila u trenutku zasnivanja založnog prava pravilno utvrđen kada postoje suprotstavljeni ugovori o kupovini i zalozi?",
    court_position:
      "Privredni apelacioni sud je ukinuo prvostepenu presudu kojom je odbijen zahtev za nedopuštenost izvršenja, zbog bitne povrede u utvrđivanju vlasništva u odnosu na založno pravo.",
    reasoning:
      "Potrebno je pouzdano utvrditi ko je bio vlasnik vozila u momentu zasnivanja založnog prava kada postoje paralelni instrumenti (kupovina, kredit, založna isprava) i isti predmet obezbeđenja.",
    keywords: ["izvršenje", "založno pravo", "vlasništvo vozila", "nedopuštenost", "ZPP"],
    related_articles: ["ZPP", "ZOO"],
    headnote: "Spor o nedopuštenosti izvršenja na vozilu zahteva tačno utvrđenje vlasništva u odnosu na hipotekarno/založno zasnivanje.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 204/2020",
    legal_area: "criminal",
    legal_question:
      "Da li su dokazi iz pravnosnažno okončanog krivičnog postupka i dokazi po službenoj dužini nedozvoljeni u postupku oduzimanja imovine?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za zaštitu zakonitosti branioca kao neosnovan, potvrdivši dozvoljivost dokaza u postupku oduzimanja imovine proistekle iz krivičnog dela.",
    reasoning:
      "Dokazi prikupljeni u krivičnom postupku i dokazi pribavljeni po službenoj dužnosti mogu se koristiti u imovinskom postupku oduzimanja ako nisu u suprotnosti sa zakonikom o postupku i načelu pravičnosti.",
    keywords: ["oduzimanje imovine", "dokazi", "krivični postupak", "zaštita zakonitosti"],
    related_articles: ["ZKP"],
    headnote: "Imovinski postupak prati krivični predmet uz mogućnost korišćenja istih dokaza kada su zakonito stečeni.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 3352/2020",
    legal_area: "commercial",
    legal_question:
      "Od kada teče šestomesečni subjektivni rok za tužbu društva protiv direktora za povredu dužnosti pažnje – od saznanja za radnju ili od nastanka štete?",
    court_position:
      "Privredni apelacioni sud je ukinuo rešenje o odbačaju tužbe zbog zastarelosti, smatrajući da subjektivni rok ne počinje od saznanja za povredu dužnosti već od dana kada je šteta stvarno nastupila.",
    reasoning:
      "Čl. 64 i 77 ZPD uređuju rokove za tužbu protiv lica sa posebnim dužnostima; subjektivni rok od šest meseci vezuje se za saznanje o povredi u smislu koji obuhvata i moment stvarnog nastanka štete, a ne samo saznanje o „štetnoj radnji“ bez štetne posledice.",
    keywords: ["rok", "ZPD", "direktor", "naknada štete", "zastarelost"],
    related_articles: ["čl. 64 ZPD", "čl. 77 ZPD"],
    headnote: "Početak tečenja roka za korporacionu tužbu mora se vezati za stvarni nastanak štete, a ne isključivo za saznanje o deliktnom ponašanju.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 22/2020",
    legal_area: "criminal",
    legal_question:
      "Da li organizovana grupa carinika i privrednika može biti osuđena za zloupotrebu pri carinjenju tekstila radi oštećenja budžeta?",
    court_position:
      "Apelacioni sud je preinačio oslobađajuću presudu i osudio organizatore i učesnike za zloupotrebu položaja i srodna krivična dela u vezi sa simulacijom prometa i carinjenjem.",
    reasoning:
      "Izveštaji prikrivenog islednika i prilozi pokazuju simulaciju odnosa između veletrgovine i „butikaša“, fiktivne fakture i umanjene dažbine, čime je budžet oštećen za stotine miliona dinara.",
    keywords: ["carina", "organizovani kriminal", "simulacija", "zloupotreba položaja", "KZ"],
    related_articles: ["KZ", "ZKP"],
    headnote: "Dokumentovana simulacija lanca fakturisanja može podržati osudu za zloupotrebu službenog položaja i carinske prevare.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 460/2021",
    legal_area: "commercial",
    legal_question:
      "Da li tužilac ima aktivnu legitimaciju za naplatu duga nakon poništenja registracije spajanja uz pripajanje ako imovina nije prešla na tužioca?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio nedostatak aktivne legitimacije jer poništajem registracije nisu nastupile pravne posledice prenosa imovine na tužioca, već je imovina prešla na Republiku posle stečaja.",
    reasoning:
      "Bez važeće registracije spajanja nema prelaska potraživanja na sticaoca; tužilac ne može biti poverilac ako nije stečao status iz ugovora o statusnoj promeni niti cesije.",
    keywords: ["aktivna legitimacija", "spajanje", "APR", "stečaj", "ZPD"],
    related_articles: ["čl. 398–400 ZPD"],
    headnote: "Poništaj registracije statusne promene vraća stanje u kojem tužilac nije nosilac potraživanja prema tuženom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 1/2019",
    legal_area: "criminal",
    legal_question:
      "Da li je predsednik komisije za izbor skladištara robe državnih rezervi odgovoran za zloupotrebu službenog položaja ako je izabran neovlašćeni ponuđač?",
    court_position:
      "Apelacioni sud je odbio žalbu branioca i potvrdio osuđujuću presudu za zloupotrebu službenog položaja radi pribavljanja protivpravne koristi odabranom skladištaru.",
    reasoning:
      "Ponuda „1. oktobar“ AD nije ispunjavala obavezne uslove javnog poziva (dokazi o skladišnoj kapacitetu i delatnosti); izbor neovlašćenog skladištara uz ulogu predsednika komisije ispunjava obeležja zloupotrebe službenog položaja.",
    keywords: ["robne rezerve", "javni poziv", "komisija", "zloupotreba službenog položaja", "KZ"],
    related_articles: ["KZ – zloupotreba službenog položaja"],
    headnote: "Nadziranje formalnih uslova konkursa za javnu funkciju sprečava izbor subjekta koji ne ispunjava minimalne kriterijume.",
    outcome: "defendant_won",
  },
]
