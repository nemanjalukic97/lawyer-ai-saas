// scripts/case-law-commercial-serbia-3.ts
// Serbian commercial case law (menica, kredit, jemstvo, izvršenje) — Batch 1 of 3.

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_COMMERCIAL_SERBIA_3: CaseLawInput[] = [
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1053/2023",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepena presuda u sporu po ugovoru o kreditu mora jasno obrazložiti ništavost odredaba o promenljivoj kamatnoj stopi i kursu?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i vratio predmet na ponovno suđenje zbog bitnih povreda postupka i nejasnih razloga o ništavosti ugovornih odredaba o promenljivoj kamati i kursu.",
    reasoning:
      "Radi obezbeđenja kredita izdate su solo blanko menice sa klauzulom „bez protesta“ i ovlašćenjem banke za popunu; vođeni su izvršni i parnični postupci. Drugostepeni sud nalazi da prvostepeni nije dao jasne razloge o pravnim posledicama spornih klauzula i njihovoj ništavosti u smislu ZOO i potrošačkog / bankarskog okvira.",
    keywords: ["ugovor o kreditu", "ništavost", "kamata", "kurs", "menica", "Gž"],
    related_articles: ["ZOO", "ZPP čl. 374 st. 2 tačka 2"],
    headnote:
      "U kreditnom sporu sud mora precizno povezati činjenice sa zaključkom o ništavosti pojedinih ugovornih odredaba.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5834/2024",
    legal_area: "commercial",
    legal_question:
      "Da li je sporazum o deobi bračne imovine ništav kao prividan posao zaključen radi onemogućavanja naplate potraživanja poverioca?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženih i potvrdio ništavost sporazuma o deobi, utvrđujući prividnost i nedopuštenu pobudu da se spreči naplata.",
    reasoning:
      "Nije učinjena bitna povreda iz čl. 374 st. 2 tačka 2 ZPP po službenoj dužnosti. Utvrđeno je da su stranke zaključile jemstvo i anekse radi obezbeđenja potraživanja prema trećem licu, a zatim sporazum o deobi upravo u kontekstu pritisaka naplate menica i izvršenja.",
    keywords: ["prividnost", "nedopuštena pobuda", "ništavost", "jemstvo", "menica", "revizija"],
    related_articles: ["ZOO čl. 103", "ZPP čl. 374"],
    headnote:
      "Deoba imovine koja služi samo da se izmakne imovina od poverioca može biti ništava po pravilima o prividnosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2911/2022",
    legal_area: "commercial",
    legal_question:
      "Da li jemac-platac solidarno odgovara banci za ceo dug korisnika kredita i može li poverilac tražiti ispunjenje direktno od jemca?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tužena kao jemac-platac obavezana na isplatu duga glavnog dužnika, s tim da je preinačena odluka o troškovima.",
    reasoning:
      "Menica „bez protesta“ dospela je u utvrđenom iznosu; izvršenje je delimično ukinuto prigovorom i nastavljen je parnični postupak. Po ZOO o jemstvu i jemcu platcu poverilac može zahtevati celokupno ispunjenje od jemca kao solidarnog dužnika.",
    keywords: ["jemac-platac", "solidarno odgovaranje", "kredit", "menica", "Gž"],
    related_articles: ["čl. 997", "čl. 1004 st. 3 ZOO", "Zakon o menici"],
    headnote:
      "Jemac-platac odgovara kao solidarni dužnik za dospelu obavezu iz kredita obezbeđenog menicom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4829/2023",
    legal_area: "commercial",
    legal_question:
      "Da li je menica ništava ako banka u popunu unese iznos obračunat na osnovu kasnije proglasenih ništavih odredaba ugovora o kreditu?",
    court_position:
      "Apelacioni sud je potvrdio da menica kao obezbeđenje nije ništava zbog netačnosti upisanog iznosa; osporavanje iznosa ide kroz prigovore u postupku naplate, a ne kroz tužbu za apsolutnu ništavost menice.",
    reasoning:
      "Tužilac je predao blanko menice i ovlastio banku za popunu u granicama potraživanja iz kredita. Netačnost ili spor oko obračuna ne uništava menicu kao hartiju od vrednosti; bitni elementi postoje, a zaštita dužnika ostvaruje se meničnim i izvršnim prigovorima.",
    keywords: ["menica", "ništavost", "bankarski kredit", "obezbeđenje", "Gž"],
    related_articles: ["Zakon o menici", "ZIO"],
    headnote:
      "Menica ostaje valjana verodostojna isprava dok postoji određena svota i volja dužnika; sporna visina se rešava u sporu o osnovu, ne ništavljenjem menice.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3780/2020",
    legal_area: "commercial",
    legal_question:
      "Da li izdavalac sopstvene blanko menice odgovara kao akceptant i da li je za očuvanje prava potrebna prezentacija menice na isplatu?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude koje su odbile tužbu banke i istakao da kod sopstvene menice nije potrebno podnošenje na isplatu niti protest radi zaštite prava prema izdavaocu.",
    reasoning:
      "Menice su akceptirane blanko menice „bez protesta“ sa ovlašćenjem banke za popunu i naplatu. Pravilna je primena instituta sopstvene menice gde trasat i akceptant u pravnom smislu ne zahtevaju isti režim prezentacije kao kod trasirane menice.",
    keywords: ["sopstvena menica", "blanko menica", "prezentacija", "protest", "revizija"],
    related_articles: ["čl. 107–110 Zakona o menici"],
    headnote:
      "Kod sopstvene menice izdavalac snosi obavezu plaćanja bez posebnog meničnog ciklusa prezentacije kao kod trasiranog instrumenta.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 28204/2023",
    legal_area: "commercial",
    legal_question:
      "Da li netačan upis nebitnih podataka (npr. JMBG) na menici čini menicu ništavom?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio da menica sa svim bitnim elementima Zakona o menici nije ništava zbog greške u pomoćnim podacima.",
    reasoning:
      "Menica sadrži mesto, datum, svotu, dospeće, plaćanje po naredbi i klauzulu „bez protesta“; potpis trasanta je nesporno autentičan. Neistinitost sporednih podataka ne razara meničnu valjanost ako su ispunjeni bitni sastojci.",
    keywords: ["menica", "bitni elementi", "ništavost", "JMBG", "revizija"],
    related_articles: ["čl. 1–2 Zakona o menici"],
    headnote:
      "Menična strogost ne znači ništavost zbog pogrške u identifikacionim podacima koji nisu deo bitnog sadržaja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1971/2015",
    legal_area: "commercial",
    legal_question:
      "Da li otvaranje stečaja nad glavnim dužnikom gasi obavezu jemca placa i da li se na potraživanje primenjuje jednogodišnji menični ili desetogodišnji opšti rok zastarelosti?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju jemca i potvrdio obavezu isplate; stečaj glavnog dužnika ne oslobađa jemca, a primenjuje se opšti rok zastarelosti iz ZOO kada je menica sredstvo obezbeđenja kauzalnog odnosa.",
    reasoning:
      "Jemac je predao trasiranu sopstvenu menicu sa rokom dospeća i klauzulom „bez protesta“. Kada menica služi kao instrument obezbeđenja kredita, zastarelost se ne ceni isključivo po čl. 78 st. 2 Zakona o menici u odnosu na celokupno potraživanje iz osnovnog posla.",
    keywords: ["jemac-platac", "stečaj", "zastarelost", "ZOO", "menica"],
    related_articles: ["čl. 371 ZOO", "čl. 78 Zakona o menici", "čl. 997–1004 ZOO"],
    headnote:
      "Obaveza jemca placa preživljava stečaj dužnika; rokovi zastarelosti moraju se uskladiti sa prirodom osnovnog potraživanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6141/2022",
    legal_area: "commercial",
    legal_question:
      "Da li banka može tražiti kamatu na subvenciju za ceo period docnje ako je sama doprinela kašnjenju pokretanja postupka?",
    court_position:
      "Apelacioni sud je delimično preinačio presudu: potvrdio glavni dug po ugovoru o subvenciji, ali ukinuo deo o kamati za period pre dospelosti menice jer je poverilac doprinoseći docnji u povećanju kamate.",
    reasoning:
      "Za menicu „bez protesta“ ne gubi se pravo naplate zbog neprezentacije na isplatu u klasičnom smislu jer je reč o instrumentu obezbeđenja, ne čistom sredstvu plaćanja. Ipak, kamata mora biti srazmerna stvarnoj docnji i ponašanju stranaka.",
    keywords: ["subvencija", "menica", "kamata", "docnja", "Gž"],
    related_articles: ["ZOO", "Zakon o menici", "ZPP čl. 380 st. 4"],
    headnote:
      "Sud može smanjiti kamatni deo kada je banka svojim procesnim kašnjenjem proširila štetu dužnika.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8239/2024",
    legal_area: "commercial",
    legal_question:
      "Da li preduzetnik solidarno odgovara celom imovinom za obaveze pre nastanka d.o.o. i da li brisanje preduzetnika iz registra gasi ličnu odgovornost?",
    court_position:
      "Vrhovni sud je presudio da preduzetnik solidarno odgovara celokupnom ličnom imovinom za obaveze iz prethodnog statusa i da brisanje iz registra ne oslobađa fizičko lice ranijih dugova.",
    reasoning:
      "Aneksom su predviđene blanko menice kao obezbeđenje kredita; banka je oglasila dospelost i pokrenula izvršenje. Pravni kontinuitet obaveza fizičkog lica u odnosu na prethodni oblik poslovanja mora se ceniti u korist zaštite poverioca.",
    keywords: ["preduzetnik", "DOO", "solidarna odgovornost", "kredit", "menica"],
    related_articles: ["ZPD", "ZOO", "Zakon o menici"],
    headnote:
      "Transformacija u d.o.o. ne briše ličnu odgovornost preduzetnika za obaveze iz kredita ako je to ugovoreno i dokazano učestvovanje u istom ekonomskom subjektu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Iž 1170/2019",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepeno rešenje o privremenoj meri zabrane realizacije menice mora jasno odrediti predmet nenovčanog potraživanja i opasnost od nenadoknadive štete?",
    court_position:
      "Privredni apelacioni sud je ukinuo rešenje o privremenoj meri jer su razlozi kontradiktorni i nejasni u pogledu vrste potraživanja i postojanja opasnosti po namirenje.",
    reasoning:
      "Dispozitiv je obuhvatao složene naloge prema NBS i stranama o blokadi računa i povlačenju menice. Za meru iz ZIO potrebno je verovatnoća potraživanja i opasnost; prvostepeni sud je mešao pitanja koja ne pripadaju ovoj fazi.",
    keywords: ["privremena mera", "menica", "NBS", "ZIO", "Iž"],
    related_articles: ["ZIO", "ZPP"],
    headnote:
      "Privremena zabrana realizacije menice zahteva preciznu identifikaciju instrumenta i jasnu logiku opasnosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3470/2021",
    legal_area: "commercial",
    legal_question:
      "Da li predaja potpisane blanko menice stvara pretpostavku ovlašćenja banke da je popuni i teret dokazivanja suprotnog na žirantu?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je žirant obavezan na plaćanje po blanko menici, smatrajući da postoji zakonska pretpostavka ovlašćenja poverioca ako žirant ne dokazuje suprotno.",
    reasoning:
      "Na poleđini su žiranti; korisnik kredita nije izmirio obaveze pa je pokrenuto izvršenje. Posle prigovora postupak je nastavljen kao spor o platnom nalogu; sud je ocenio dokaze o visini duga i valjanosti meničnog lanca.",
    keywords: ["žirant", "blanko menica", "teret dokazivanja", "kredit", "Gž"],
    related_articles: ["Zakon o menici", "ZIO"],
    headnote:
      "Žirant koji preda potpisanu blanko menicu snosi teret da ospori zakonitost popune u granicama meničnog ovlašćenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 893/2017",
    legal_area: "commercial",
    legal_question:
      "Da li jemac-platac odgovara kao solidarni dužnik ako menica nije fizički podneta trasatu na isplatu u roku od dva dana od dospeća?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju jemca placa i potvrdio solidarnu odgovornost; menica kao obezbeđenje ne menija prirodu jemstva, a formalni propusti u prezentaciji nisu odlučujući protiv jemca placa.",
    reasoning:
      "Kredit je odobren uz ugovor o jemstvu i dve menice bez protesta; predlog za izvršenje je podnet brzo posle dospeća. Nedostatak stranačke nesposobnosti ne otvara reviziju po čl. 407 st. 1 tačka 2 ZPP ako nije bitna povreda iz čl. 374 st. 2 tačka 9 ZPP.",
    keywords: ["jemac-platac", "solidarnost", "menica", "prezentacija", "revizija"],
    related_articles: ["čl. 997–1004 ZOO", "Zakon o menici"],
    headnote:
      "Jemac-platac ostaje solidarni dužnik uprkos formalnim prigovorima na menični postupak koji ne utiču na osnov iz jemstva.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1651/2019",
    legal_area: "commercial",
    legal_question:
      "Da li se zastarelost potraživanja iz kredita obezbeđenog menicom ceni po Zakonu o menici ili po opštem roku iz ZOO?",
    court_position:
      "Vrhovni kasacioni sud je preinačio drugostepenu presudu i primenio opšti desetogodišnji rok zastarelosti iz ZOO, smatrajući da je menica sredstvo obezbeđenja kauzalnog potraživanja iz kredita.",
    reasoning:
      "Drugostepeni sud je pogrešno primenio jednogodišnji menični rok iz čl. 78 st. 1 Zakona o menici. Kada instrument služi isključivo kao obezbeđenje ugovora o kreditu, meritorno se prati zastarelost osnovnog potraživanja po čl. 371 ZOO.",
    keywords: ["zastarelost", "menica", "kredit", "ZOO", "Zakon o menici"],
    related_articles: ["čl. 371 ZOO", "čl. 78 Zakona o menici"],
    headnote:
      "Za kredit obezbeđen menicom primenjuje se zastarelost osnovnog potraživanja, ne uvek kratki menični rok.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4137/2020",
    legal_area: "commercial",
    legal_question:
      "Da li banka gubi pravo naplate blanko menica ako sporazumi o popuni odstupaju od procedure ili ako nije prezentovala menicu na isplatu?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presude koje su odbile tužbu banke, utvrđujući pogrešnu primenu prava na menična ovlašćenja i posledice propuštanja prezentacije.",
    reasoning:
      "Tužene su potpisale sporazume o ispunjavanju blanko menica sa širokim ovlašćenjem banke; banka je popunila menice na iznos preseka potraživanja i podnela izvršenje. Revizijski sud koriguje shvatanje nižih sudova o gubitku prava.",
    keywords: ["blanko menica", "ovlašćenje", "prezentacija", "banka", "revizija"],
    related_articles: ["Zakon o menici", "ZIO"],
    headnote:
      "Široko menično ovlašćenje uz sporazum o popuni zahteva pažljivu ali ne automatski negativnu ocenu za poverioca.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5994/2020",
    legal_area: "commercial",
    legal_question:
      "Da li pogrešno upisan iznos na menici dovodi do ukidanja celog rešenja o izvršenju ili samo do korekcije visine duga?",
    court_position:
      "Apelacioni sud je preinačio presudu tako da se rešenje o izvršenju održi za stvarni dug utvrđen veštačenjem, a ukine za višak, jer greška u svoti ne čini menicu neispravnom u celini.",
    reasoning:
      "Prvostepeni sud je ukinuo celo izvršenje zbog razlike između traženog i utvrđenog iznosa; drugostepeni sud je pravilno razgraničio delimičnu valjanost menice i izvršne isprave.",
    keywords: ["menica", "izvršenje", "veštačenje", "delimično ukidanje", "Gž"],
    related_articles: ["Zakon o menici", "ZIO"],
    headnote:
      "Numerička greška na menici može voditi samo korekciji iznosa izvršenja, ne automatskom gubitku verodostojnosti.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1470/2016",
    legal_area: "commercial",
    legal_question:
      "Da li se na jemca placa primenjuju rokovi za prezentaciju menice iz čl. 37 Zakona o menice radi gubitka prava poverioca?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu, usvojio tužbu i održao rešenje o izvršenju, smatrajući da se čl. 37 Zakona o menici ne primenjuje na spor o obavezi jemca placa iz ZOO.",
    reasoning:
      "Jemac-platac odgovara kao glavni dužnik po čl. 1004 st. 3 ZOO; poverilac može birati protiv koga će naplatiti. Predlog za izvršenje podnet je 22. dana po dospeću bez fizičke prezentacije menice jemcu, što je u okviru zastarelosti sopstvene menice po čl. 78 ZM.",
    keywords: ["jemac-platac", "prezentacija menice", "čl. 37 ZM", "čl. 997 ZOO", "Gž"],
    related_articles: ["čl. 997", "čl. 1004 st. 3 ZOO", "čl. 37", "čl. 78 Zakona o menici"],
    headnote:
      "Jemstvo kao obligacioni institut ima prioritet u odnosu na formalne prigovore menice namenjene obezbeđenju istog duga.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4623/2012",
    legal_area: "commercial",
    legal_question:
      "Da li imalac menice gubi regres prema žirantu ako ne podnese menicu na isplatu u roku od dva radna dana od dospeća kod klauzule „bez troškova“?",
    court_position:
      "Apelacioni sud je preinačio presudu i odbio tužbu banke protiv žiranta jer menica nije prezentovana na isplatu u zakonskom roku, pa su poverilac izgubio regres prema sporednim dužnicima.",
    reasoning:
      "Po čl. 42 i 52 Zakona o menici imalac mora podneti menicu o dospelosti ili u naredna dva radna dana; kod „bez troškova“ gube se prava prema indosantu i trasantu osim prema akceptantu. Tužilac je odmah podneo izvršenje umesto prezentacije.",
    keywords: ["žirant", "prezentacija", "čl. 52 Zakona o menice", "regres", "Gž"],
    related_articles: ["čl. 42", "čl. 52 Zakona o menici"],
    headnote:
      "Formalni rokovi menice su striktni prema sporednim dužnicima; izvršni predlog ne zamenjuje prezentaciju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 542/2023",
    legal_area: "commercial",
    legal_question:
      "Da li se na potraživanje iz kredita obezbeđenog menicom primenjuje desetogodišnji rok zastarelosti iz ZOO kada je prošlo više od tri godine od dospeća menice?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe zbog zastarelosti jer se primenjuje opšti rok od deset godina na osnovni ugovor, koji je istekao pre podnošenja tužbe.",
    reasoning:
      "Menica je aktivirana radi dugovanog iznosa koji uključuje glavnicu i kamatu; izvršenje je ranije određeno pa ukinuto prigovorom. Prvostepeni sud je pravilno primenio čl. 371 ZOO na kauzalni odnos, a ne kratki menični režim.",
    keywords: ["zastarelost", "menica", "kredit", "čl. 371 ZOO", "Gž"],
    related_articles: ["čl. 371 ZOO"],
    headnote:
      "Kada menica obezbeđuje kredit, zastarelost prati osnovni posao, što može isključiti uspeh tužbe ako je rok prošao.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2190/2022",
    legal_area: "commercial",
    legal_question:
      "Da li se na izdavaoca sopstvene menice primenjuju rokovi za prezentaciju menice na isplatu radi gubitka prava?",
    court_position:
      "Apelacioni sud je potvrdio obavezu izdavaoca sopstvene menice na isplatu duga, ističući da se rokovi za prezentaciju odnose na trasata, a ne na glavnog dužnika–izdavaoca sopstvene menice.",
    reasoning:
      "Menica je data kao obezbeđenje kredita; predlog za izvršenje je podnet u roku zastarelosti iz čl. 78 ZM. Tuženi nije osporio dospelost obaveze po osnovu kredita.",
    keywords: ["sopstvena menica", "prezentacija", "čl. 37 ZM", "čl. 78 ZM", "Gž"],
    related_articles: ["čl. 37", "čl. 41", "čl. 78 Zakona o menici", "čl. 277 ZOO"],
    headnote:
      "Izdavalac sopstvene menice ne može se braniti istim rokovima prezentacije kao trasat trasirane menice.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7774/2021",
    legal_area: "commercial",
    legal_question:
      "Da li je za potraživanje iz kredita obezbeđenog sopstvenom blanko menicom merodavan jednogodišnji menični rok zastarelosti?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presudu Apelacionog suda jer je pogrešno primenjen jednogodišnji menični rok umesto desetogodišnjeg roka za osnovno potraživanje iz kredita.",
    reasoning:
      "Dužnik je dao blanko sopstvenu menicu sa ovlašćenjem banke za popunu klauzulom „bez protesta“. Prigovor zastarelosti zasniva se na čl. 78 ZM, ali kada je menica vezanica za kredit, merodavan je opšti režim ZOO.",
    keywords: ["zastarelost", "blanko menica", "kredit", "čl. 371 ZOO", "revizija"],
    related_articles: ["čl. 371 ZOO", "čl. 78–79 Zakona o menici"],
    headnote:
      "VKS ujednačava praksu: kredit + menica kao obezbeđenje → zastarelost po ZOO, ne uvek po kratkom meničnom roku.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 25488/2023",
    legal_area: "commercial",
    legal_question:
      "Da li je potraživanje po blanko sopstvenoj menici zastarelo ako je predlog za izvršenje podnet mesec dana posle dospeća?",
    court_position:
      "Vrhovni sud je odbio reviziju tužene i potvrdio da potraživanje nije zastarelo po čl. 78 st. 1 Zakona o menici jer je predlog podnet blagovremeno.",
    reasoning:
      "Kod klauzule „bez protesta“ trogodišnji rok prema akceptantu teče od dospeća; dospeće je bilo 08.06.2015, a predlog 14.07.2015. Menica je na obrascu NBS sa svim bitnim elementima; neosnovani su prigovori ništavosti po čl. 103 ZOO u vezi sa čl. 107–108 ZM.",
    keywords: ["zastarelost", "sopstvena menica", "bez protesta", "revizija"],
    related_articles: ["čl. 78 st. 1 Zakona o menici", "čl. 103 ZOO"],
    headnote:
      "Kratki rokovi po menici se računaju od dospeća; mesec dana kasnije još uvek može biti unutar roka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2210/2023",
    legal_area: "commercial",
    legal_question:
      "Da li netačnost iznosa ili datuma dospeća na menici čini menicu ništavom kada je ona obezbeđenje kredita?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost dve blanko sopstvene menice, smatrajući da osporavanje iznosa ide kroz menične i izvršne prigovore, a ne kroz posebnu ništavost.",
    reasoning:
      "Kod menica „bez protesta“ banka nije dužna da podiže protest; aktivacija i izvršenje u roku su pravilni. Netačnost unosa ne dovodi automatski do apsolutne ništavosti hartije od vrednosti.",
    keywords: ["ništavost menice", "blanko menica", "banka", "Gž"],
    related_articles: ["Zakon o menici", "ZIO"],
    headnote:
      "Ništavost menice nije sredstvo za osporavanje obračuna kamate vezanog za kredit ako postoje drugi procesni putevi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3352/2023",
    legal_area: "commercial",
    legal_question:
      "Da li se na potraživanje jemca prema banci primenjuje desetogodišnji rok zastarelosti i da li je dopušten anatocizam kamate na već obračunatu zateznu kamatu?",
    court_position:
      "Apelacioni sud je delimično potvrdio presudu u delu glavnog duga jemca primenom čl. 371 ZOO, ali ukinuo deo o kamati jer se ne može obračunavati zatezna kamata na već obračunatu zateznu kamatu.",
    reasoning:
      "Tuženi nije osporio potpis menice ni visinu glavnog duga; osporen je prigovor zastarelosti koji je odbijen za glavnicu. Kamatni deo koji predstavlja složeni anatocizam je suprotan javnom redu.",
    keywords: ["jemstvo", "zastarelost", "anatocizam", "kamata", "Gž"],
    related_articles: ["čl. 371 ZOO", "čl. 277 ZOO", "ZPP čl. 460 st. 4"],
    headnote:
      "Jemac koristi opšti rok zastarelosti za osnovni dug; kamata na kamatu u lančanom obliku može biti nedozvoljena.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5774/2022",
    legal_area: "commercial",
    legal_question:
      "Da li je dopušteno izvršenje prodajom stana koji je treće lice kupilo ali nije uknjižilo kao vlasnik pre pokretanja izvršenja?",
    court_position:
      "Vrhovni sud je ukinuo presudu Apelacionog suda i vratio predmet na ponovno suđenje radi zaštite vanknjižne stečene svojine prema izvršenju na osnovu menice hipotečnog poverioca.",
    reasoning:
      "Izvršenje je određeno na stan upisan na ime izvršnog dužnika, dok je tužilja kupac bez uknjižbe. Revizijski sud ukazuje na potrebu ocene nedopuštenosti izvršenja u odnosu na stvarno pravo kupca i hipoteku zasnovanu na kreditnom ugovoru.",
    keywords: ["izvršenje", "vanknjižna svojina", "stan", "menica", "hipoteka"],
    related_articles: ["ZIO", "Zakon o državnom premeru i katastru"],
    headnote:
      "Kupac sa pravno relevantnim sticanjem može osporiti izvršenje iako nije upisan u katastru u momentu predloga.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "R1 633/2019",
    legal_area: "procedural",
    legal_question:
      "Da li izvršni sud koji nastavlja postupak kao parnicu može po službenoj dužnosti utvrditi mesnu nenadležnost ako strane nisu osporile mesnu nadležnost u prigovoru?",
    court_position:
      "Vrhovni kasacioni sud je odlučio da je mesno nadležan Osnovni sud u Kragujevcu jer sud pred kojim je započet izvršni postupak ne može se sam oglasiti nenadležnim kada prigovor ne sadrži tu radnju.",
    reasoning:
      "Prigovor je osporavao legitimaciju i zastarelost, ali ne mesnu nadležnost. Po čl. 455–466 ZPP nastavak po prigovoru na platni nalog zadržava vezu sa sudom koji je doneo rešenje o izvršenju.",
    keywords: ["mesna nadležnost", "izvršenje", "prigovor", "platni nalog", "ZPP"],
    related_articles: ["čl. 455–466 ZPP"],
    headnote:
      "Pasivnost stranaka u pogledu mesne nadležnosti u izvršnom delu ne omogućava sudu samovoljnu promenu mesa.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 27542/2023",
    legal_area: "commercial",
    legal_question:
      "Da li je tuženi kao izdavalac blanko menica za lizing dužan po popunjenom iznosu utvrđenom veštačenjem?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio obavezu isplate po menicama datim za finansijski lizing, smatrajući da su menice pravilno popunjene i da predstavljaju valjan osnov za izvršenje.",
    reasoning:
      "Primalac lizinga nije plaćao rate; davac je raskinuo ugovore i aktivirao šest blanko menica uz sporazume o popuni. Veštak je utvrdio visinu duga u dinarskoj protivvrednosti na dan predloga za izvršenje.",
    keywords: ["lizing", "blanko menica", "finansijski lizing", "revizija"],
    related_articles: ["Zakon o menici", "Zakon o finansijskom lizingu"],
    headnote:
      "Menice kao obezbeđenje lizinga ostaju izvršna isprava ako je popuna unutar ovlašćenja i utvrđenog duga.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 10476/2019",
    legal_area: "constitutional",
    legal_question:
      "Da li trajanje parničnog spora od preko šest godina povređuje pravo na suđenje u razumnom roku u sporu o jemstvu i menici?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, utvrdio povredu prava na suđenje u razumnom roku i dosudio naknadu nematerijalne štete, odbivši žalbu u ostalom delu.",
    reasoning:
      "Postupak je pokrenut iz kredita i jemstva iz 2008; vođeni su izvršni i parnični postupci do 2019. Period od šest godina i deset meseci prelazi razumnu meru bez opravdanog obrazloženja kašnjenja organa.",
    keywords: ["ustavna žalba", "razuman rok", "jemstvo", "menica", "Ustavni sud"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 6 st. 1 EKPJ"],
    headnote:
      "Izuzetno dug trajanje bankarskog spora o jemstvu može povrediti ustavno pravo na efikasno suđenje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Nišu",
    court_level: "appellate",
    case_number: "Gž 1599/2016",
    legal_area: "commercial",
    legal_question:
      "Da li se tužbeni zahtev banke za naplatu po menici može odbiti ako veštačenjem nije autentičan potpis tuženog na menici?",
    court_position:
      "Apelacioni sud u Nišu je ukinuo rešenje o izvršenju i odbio tužbeni zahtev jer potpis tuženog na menici nije autentičan, pa nedostaje bitan sastojak menice.",
    reasoning:
      "Po čl. 2 Zakona o menici isprava bez svih sastojaka iz čl. 1 ne važi kao trasirana menica. Tužilac je podneo kopiju umesto originala; grafolog je utvrdio da potpis nije originalni potpis tuženog.",
    keywords: ["menica", "potpis", "veštačenje", "autentičnost", "Gž Niš"],
    related_articles: ["čl. 1–2 Zakona o menici", "ZPP"],
    headnote:
      "Falsifikovan ili tuđ potpis na menici čini instrument pravno nepodobnim za naplatu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9391/2025",
    legal_area: "commercial",
    legal_question:
      "Da li dužnik mora vratiti prinudno naplaćena sredstva kada je rešenje o izvršenju na osnovu menice ukinuto u parnici i tužba smatrana povučenom?",
    court_position:
      "Vrhovni sud je potvrdio obavezu tuženog da vrati naplaćeno jer je pravni osnov za zadržavanje sredstava otpao, odnosno nastalo je sticanje bez osnova.",
    reasoning:
      "Izvršni poverilac je opredelio menicu kao osnov izvršenja; prigovorom je nastavljen parnični postupak u kojem je tužba povučena pa je ukinuto rešenje o izvršenju. Nižestepeni sudovi su pravilno primenili čl. 210 st. 2 ZOO o vraćanju onoga što je primljeno bez osnova.",
    keywords: ["povraćaj", "izvršenje", "menica", "ukidanje rešenja", "sticanje bez osnova"],
    related_articles: ["čl. 210 st. 2 ZOO", "čl. 90 st. 4 ZIO"],
    headnote:
      "Ukinuto izvršenje na menici povlači obavezu vraćanja naplaćenog ako osnov više ne postoji.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4026/2020",
    legal_area: "commercial",
    legal_question:
      "Da li promena poslovnog imena poverioca čini menicu nevaljanom za naplatu od jemca?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju, preinačio drugostepenu i potvrdio prvostepenu presudu: promena naziva ne menja subjektivitet, već samo firmu istog pravnog lica.",
    reasoning:
      "Jemac nije dokazao ispunjenje obaveze; menica ostaje merodavna. Po čl. 109 st. 1 Zakona o menici na sopstvenu menicu primenjuju se propisi o trasiranoj menici gde nisu u suprotnosti. Po čl. 16 st. 2 naknadna popuna protivno sporazumu ne može se prigovoriti imaocu osim zlomislene ili krajnje nemarnosti.",
    keywords: ["menica", "promena naziva", "jemac", "lizing", "revizija"],
    related_articles: ["čl. 16 st. 2", "čl. 109 st. 1 Zakona o menici"],
    headnote:
      "Rebranding poverioca ne razara menični odnos ako je identitet dužnika i osnov potraživanja isti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5060/2023",
    legal_area: "commercial",
    legal_question:
      "Da li banka gubi pravo naplate po menici kao obezbeđenju kredita zbog neprezentacije menice na isplatu u roku od dva dana od dospeća?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tuženi obavezan na dug po kreditu, odbivši prigovor da je menica izgubila dejstvo zbog propuštanja prezentacije.",
    reasoning:
      "Ugovor predviđa zateznu kamatu na dospele neizmirene obaveze. Tuženi je dao blanko solo menice sa ovlašćenjem banke za popunu i aktivaciju radi naplate; menica je pravilno popunjena sa trasatom i klauzulom „bez protesta“.",
    keywords: ["menica", "kredit", "prezentacija", "obezbeđenje", "Gž"],
    related_articles: ["Zakon o menici", "ZOO"],
    headnote:
      "Kod menice kao kolaterala kredita sud može odbiti formalistički prigovor prezentacije ako je spor meritorno o dugu iz kredita.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6797/2018",
    legal_area: "commercial",
    legal_question:
      "Da li podnošenje menice na naplatu isključuje pravni interes za kondemnatornu tužbu radi platnog naloga?",
    court_position:
      "Privredni apelacioni sud je ukinuo rešenje o odbacivanju tužbe jer je prvostepeni sud pogrešno zaključio da tužilac nema pravnog interesa.",
    reasoning:
      "Podnošenje menice na naplatu nije prepreka za tužbu niti lišava interesa za kondemnatornu presudu kao izvršni naslov. Po čl. 47 Zakona o platnom prometu prinudna naplata sledi prioritet izvršnih sudskih rešenja u odnosu na menicu; pravilno je pozivanje na čl. 455 st. 4 ZPP bilo nejasno jer postupak nije merodavno vođen kao spor o platnom nalogu na verodostojnoj ispravi u smislu čl. 52 ZIO.",
    keywords: ["pravni interes", "menica", "platni nalog", "Pž"],
    related_articles: ["čl. 47 Zakona o platnom prometu", "ZPP čl. 455"],
    headnote:
      "Kondemnatorna tužba i menična naplata mogu paralelno postojati u okviru prioriteta izvršnih naslova.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6097/2023",
    legal_area: "commercial",
    legal_question:
      "Da li se na potraživanje iz kredita obezbeđenog blanko sopstvenom menicom primenjuje trogodišnji menični ili desetogodišnji opšti rok zastarelosti?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je odbijen prigovor zastarelosti: primenjuje se opšti rok od deset godina iz ZOO, a ne kratki menični rok.",
    reasoning:
      "Blanko sopstvena menica sa ovlašćenjem banke da unese dospeće služi kao obezbeđenje kredita; rok dospeća menice ne određuje izdavalac u momentu izdavanja već poverilac u granicama zastarelosti osnovnog duga. Tužena nije dokazala zastarelost u odnosu na taj okvir.",
    keywords: ["zastarelost", "menica", "kredit", "čl. 371 ZOO", "Gž"],
    related_articles: ["čl. 371 ZOO", "čl. 107 Zakona o menici"],
    headnote:
      "Blanko menica uz kredit prati zastarelost kauzalnog potraživanja, ne uvek kratki menični rok.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1382/2015",
    legal_area: "commercial",
    legal_question:
      "Da li u tužbi za ništavost ugovora moraju biti obuhvaćeni svi ugovarači kao nužni jedinstveni suparnici kada se osporava solidarna obaveza jemca?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju jemca placa i potvrdio solidarnu odgovornost za dug po kreditu, ističući pravila o nužnim jedinstvenim suparnicima u sporu o ništavosti ugovora.",
    reasoning:
      "Krediti obezbeđeni menicama nisu vraćeni; izvršenje je pokrenuto 2013. Tuženi je osporio potpis i ništavost menica; prigovorom je nastavljen parnični postupak. Revizijski sud je ocenio primenu ZOO o jemstvu i procesnom položaju stranaka.",
    keywords: ["jemac-platac", "solidarnost", "nužni suparnici", "ništavost ugovora", "revizija"],
    related_articles: ["čl. 997–1019 ZOO", "ZPP"],
    headnote:
      "Ništavost višestranog ugovora zahteva ispravno procesno učešće svih nužnih stranaka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3938/2019",
    legal_area: "commercial",
    legal_question:
      "Da li jemac koji je izdao blanko sopstvenu menicu može se braniti gubitkom prava zbog neprezentacije menice na isplatu u roku od dva dana?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio obavezu tuženog kao jemca placa i izdavaoca sopstvene menice; formalni rokovi prezentacije ne primenjuju se na akceptanta sopstvene menice na isti način kao na trasata.",
    reasoning:
      "Menica je blanko sopstvena sa klauzulom „bez protesta“. Iako čl. 37 i 52 Zakona o menici regulišu prezentaciju i posledice propuštanja rokova, kod sopstvene menice izdavalac je istovremeno glavni dužnik pa režim nije identičan trasiranoj menici.",
    keywords: ["jemac", "sopstvena menica", "prezentacija", "čl. 37 ZM", "revizija"],
    related_articles: ["čl. 37", "čl. 52", "čl. 107 Zakona o menici"],
    headnote:
      "Blanko sopstvena menica jemca u bankarskom odnosu ne podleže istom režimu gubitka prava kao sporedni dužnik trasirane menice.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2234/2016",
    legal_area: "commercial",
    legal_question:
      "Da li je popuna menice na viši iznos od stvarnog duga ništava i kako se obračunava kamata u sporu o jemstvu?",
    court_position:
      "Apelacioni sud je delimično preinačio presudu u delu kamate, ali potvrdio glavni dug i održao rešenje o izvršenju: jemac-platac odgovara solidarno, a prekomerna popuna ne čini menicu ništavom već podložnu korekciji.",
    reasoning:
      "Primenjene su odredbe o prinudnoj naplati sa računa i ZPP u vezi sa menicom. Menice su popunjene valjano u okviru ovlašćenja; žalba na kamatni deo je delimično osnovana.",
    keywords: ["jemac-platac", "menica", "kamata", "solidarnost", "Gž"],
    related_articles: ["čl. 47 Zakona o platnom prometu", "Zakon o menici", "ZOO"],
    headnote:
      "Višak na menici se ispravlja meritorno, ne automatskim ništavljenjem instrumenta obezbeđenja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2657/2020",
    legal_area: "commercial",
    legal_question:
      "Da li jemac-platac i njegovi naslednici solidarno odgovaraju za dug po kreditu i može li poverilac birati protiv koga će naplatiti?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženih i potvrdio solidarnu obavezu jemca placa i odgovornost naslednika do visine nasleđene imovine.",
    reasoning:
      "Ugovori o kreditu su prestali istekom roka; izvršenje je pokrenuto na menicama kao verodostojnim ispravama, zatim prigovorom nastavljen parnični postupak. Veštačenjem je utvrđena visina duga u vezi sa ugovorima u jemstvu.",
    keywords: ["jemac-platac", "naslednici", "solidarnost", "kredit", "revizija"],
    related_articles: ["čl. 997–1004 ZOO", "Zakon o nasleđivanju"],
    headnote:
      "Solidarno jemstvo preživljava smrt jemca u granicama nasleđene mase.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2741/2020",
    legal_area: "commercial",
    legal_question:
      "Da li je ništava odredba ugovora o kreditu o jednostranoj promeni kamatne stope i kako to utiče na menicu izdatu kao obezbeđenje?",
    court_position:
      "Vrhovni kasacioni sud je potvrdio ništavost klauzule o jednostranoj promeni kamatne stope, ali menica kao obezbeđenje nije ništava; menična obaveza se umanjuje za deo koji proističe iz ništave odredbe.",
    reasoning:
      "Za očuvanje prava iz sopstvene menice nije potreban protest kada je dužnik akceptant ili izdavalac sopstvene menice. Razlika između trasirane i sopstvene menice odražava se na prezentaciju i akcept.",
    keywords: ["kamata", "ništavost", "menica", "kredit", "revizija"],
    related_articles: ["ZOO", "Zakon o menici"],
    headnote:
      "Abuzivna klauzula o kamati se izdvaja od valjanosti meničnog obezbeđenja uz proporcionalno umanjenje potraživanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2432/2020",
    legal_area: "commercial",
    legal_question:
      "Da li se na potraživanje iz kredita obezbeđenog menicom primenjuje trogodišnji rok iz Zakona o menici kada je predlog za izvršenje podnet na menici?",
    court_position:
      "Privredni apelacioni sud je preinačio i delimično ukinuo prvostepenu presudu: primenjuje se desetogodišnji rok zastarelosti iz ZOO, a ne trogodišnji menični rok.",
    reasoning:
      "Ugovor je predvideo založno pravo i 18 blanko menica sa ovlašćenjem Fonda za popunu. Menica je izdata 2010, popunjena 2019; prvostepeni sud je pravilno primenio veštačenje ali pogrešno zaključio o zastarelosti ako je rok od deset godina još tekao u korist tužioca.",
    keywords: ["zastarelost", "kredit", "menica", "ZOO", "Pž"],
    related_articles: ["čl. 371 ZOO", "Zakon o menici"],
    headnote:
      "PAS ujednačava stav: kredit + menica → merodavan ZOO, ne isključivo kratki menični rok.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 216/2022",
    legal_area: "commercial",
    legal_question:
      "Da li je ništava menica popunjena suprotno ugovorenoj svrsi (garancija u garantnom roku) i da li je valjana menica koja obezbeđuje avans posle raskida?",
    court_position:
      "Vrhovni kasacioni sud je delimično usvojio reviziju: utvrđena je ništavost jedne menice popunjene protivno svrsi garancije, dok je druga menica (avans posle raskida) zakonito aktivirana; troškovi podeljeni.",
    reasoning:
      "Popunjavanje menice protivno svrsi iz sporazuma čini menicu ništavom. Za drugu menicu revizija nije osnovana. Odluka doneta po čl. 416 st. 1 ZPP uz primenu čl. 414 ZPP za odbijeni deo.",
    keywords: ["menica", "ništavost", "svrha obezbeđenja", "avans", "revizija"],
    related_articles: ["čl. 416 st. 1 ZPP", "Zakon o menici", "ZOO"],
    headnote:
      "Svaka menica u paketu obezbeđenja mora se oceniti posebno u odnosu na svrzu iz ugovora.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "R1 591/2020",
    legal_area: "procedural",
    legal_question:
      "Da li je mesno nadležan sud u Kragujevcu ili u Beogradu kada ugovor o subvenciji sadrži klauzulu o nadležnosti suda u Beogradu a menica glasi na plaćanje na drugom mestu?",
    court_position:
      "Vrhovni kasacioni sud je utvrdio mesnu nadležnost Osnovnog suda u Kragujevcu jer sporazum o nadležnosti nije bio dovoljno određen, a mesto plaćanja menice ukazuje na prebivalište trasanta.",
    reasoning:
      "Prvobitni predlog za izvršenje podnet je u Kragujevcu; tužilac je predložio i prenos spisa u Beograd po ugovoru i čl. 59 ZPP i čl. 111 Zakona o menici. Sud je ocenio da ugovor o dodeli subvencije ne obuhvata isti spor kao finansiranje programa i da klauzula o nadležnosti nije dovoljno precizna.",
    keywords: ["mesna nadležnost", "menica", "izvršenje", "R1", "ZPP"],
    related_articles: ["čl. 59 ZPP", "čl. 111 Zakona o menici"],
    headnote:
      "Neprecizan forum conveniens u ugovoru ne prevazilazi vezu predmeta sa sudom koji je doneo izvršnu odluku.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 69/2020",
    legal_area: "commercial",
    legal_question:
      "Da li primalac franšize plaća dug za isporučenu robu odmah ili tek po prodaji trećim licima ako ugovor to ne predviđa?",
    court_position:
      "Privredni apelacioni sud je potvrdio presudu kojom je tuženi obavezan na plaćanje cene isporučene robe; odbijen je prigovor da obaveza nastaje tek posle prodaje.",
    reasoning:
      "Realizacijom menice vrši se naplata duga za preuzetu robu u smislu ZIO i ZOO o kamati. Ugovor ne sadrži odložni uslov plaćanja od prodaje trećim licima.",
    keywords: ["franšizing", "isporuka robe", "menica", "dug", "Pž"],
    related_articles: ["čl. 67 st. 1 ZIO", "čl. 277", "čl. 324 ZOO"],
    headnote:
      "Franšiza ne menija podrazumevanu obavezu plaćanja isporuke ako ugovor nije drugačije odredio.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 26537/2023",
    legal_area: "commercial",
    legal_question:
      "Da li nedostatak posebnog pisanog meničnog ovlašćenja čini ništavom blanko menicu koju je fizičko lice potpisalo za kredit privrednog društva?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio obavezu fizičkog lica po potpisanim blanko menicama kao obezbeđenju kredita društva.",
    reasoning:
      "Tuženi je sopstvenu menicu potpisao sa konstatacijom „priznajem bez protesta“ i ličnim podacima; druga menica je overena u ime društva. Nedostatak odvojenog meničnog ovlašćenja u formi akta ne čini menicu ništavom kada su volja i ovlašćenje izvedeni iz okolnosti ugovora.",
    keywords: ["blanko menica", "fizičko lice", "kredit DOO", "menično ovlašćenje", "revizija"],
    related_articles: ["Zakon o menici", "ZOO"],
    headnote:
      "Potpis fizičkog lica na menici za kredit društva može biti valjan bez posebnog akta ako je sadržaj ovlašćenja utvrđiv iz spisa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5936/2023",
    legal_area: "commercial",
    legal_question:
      "Da li je dopušten obračun zatezne kamate na već obračunatu zateznu kamatu (anatocizam) u sporu o subvenciji samozapošljavanja?",
    court_position:
      "Apelacioni sud je potvrdio odgovornost tužene kao meničnog jemca za glavni dug, ali ukinuo deo presude o kamati jer prvostepeni sud nije zakonito primenio zabranu kamate na kamatu.",
    reasoning:
      "Program samozapošljavanja obuhvata obaveze korisnika i menice sa žirantima. Tuženi je kao akceptant priznao dug „bez protesta“. Za kamatni deo koji predstavlja anatocizam potrebno je ponovno odlučivanje.",
    keywords: ["anatocizam", "kamata", "menica", "NSZ", "Gž"],
    related_articles: ["ZOO", "Zakon o zateznoj kamati"],
    headnote:
      "Jemčevina po menici može ostati, ali kamatni lanac mora biti u skladu sa zabranom složene zatezne kamate.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 504/2020",
    legal_area: "commercial",
    legal_question:
      "Da li se na sopstvenu menicu sa klauzulom „bez protesta“ primenjuje jednogodišnji rok zastarelosti iz čl. 78 st. 2 Zakona o menice umesto desetogodišnjeg roka iz ZOO?",
    court_position:
      "Apelacioni sud je preinačio presudu i odbio tužbu banke jer je potraživanje zastarelo po jednogodišnjem meničnom roku, s obzirom na to da je postupak meritorno vezan za menicu kao verodostojnu ispravu.",
    reasoning:
      "Trasirana i sopstvena menica imaju različit režim po Zakonu o menici. Po čl. 78 st. 2 i čl. 109 st. 1 tačka 9 na sopstvenu menicu primenjuju se pravila zastarelosti iz čl. 78–84 ZM; čl. 371 ZOO važi kada zakon ne određuje drugi rok — u ovom sporu drugostepeni sud je dao prednost meničnom roku.",
    keywords: ["zastarelost", "sopstvena menica", "čl. 78 ZM", "čl. 371 ZOO", "Gž"],
    related_articles: ["čl. 78 st. 2", "čl. 109 st. 1 tačka 9 Zakona o menici", "čl. 371 ZOO"],
    headnote:
      "Suprotstavljena praksa: kada spor ide isključivo po menici, neki apelacioni paneli primenjuju kratki menični rok umesto ZOO.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 687/2017",
    legal_area: "commercial",
    legal_question:
      "Da li se predlog za privremenu meru mora odbaciti ako ne precizira sredstvo i predmet izvršenja mere u smislu ZIO?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbacivanje predloga za privremenu meru jer predlog nije sadržao izvršivo određeno sredstvo i predmet, pa je mera neizvršiva.",
    reasoning:
      "Po čl. 416 st. 2 i 3 ZIO predlog mora sadržati vrstu mere, trajanje i kod privremene mere sredstvo i predmet izvršenja; inače sledi odbacivanje bez dopune. Tužilac je tražio širok spektar zabrana (računi, menice, hipoteke) bez dovoljne individualizacije.",
    keywords: ["privremena mera", "ZIO", "predlog", "Pž"],
    related_articles: ["čl. 416 st. 2–3 ZIO", "čl. 453 ZIO"],
    headnote:
      "Opšta zabrana „svih sredstava obezbeđenja“ ne zadovoljava formalne uslove ZIO.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4530/2022",
    legal_area: "commercial",
    legal_question:
      "Da li postoji pravo na povraćaj imovine po sticanju bez osnova ako dužnik nije dva puta platio isti dug niti je naplata izvršena i preko trećeg lica na štetu tužioca?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio da nisu ispunjeni uslovi za traženi povraćaj jer tužilac nije dokazao dvostruko plaćanje niti osnov iz sticanja bez osnova u predmetnom lancu transakcija.",
    reasoning:
      "Pravnosnažnom presudom je ranije odbijen zahtev za ništavost ugovora i menice. Eskont menice i isplate trećem licu ne dokazuju automatski da je tužilac platio dva puta isti dug prema tuženom.",
    keywords: ["sticanje bez osnova", "menica", "eskont", "faktoring", "revizija"],
    related_articles: ["čl. 212 ZOO"],
    headnote:
      "Povraćaj zbog dvostrukog plaćanja zahteva strogi dokaz o identitetu potraživanja i primaoca plaćanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 7731/2015",
    legal_area: "commercial",
    legal_question:
      "Da li interni spor dužnika i ugovor o preuzimanju duga bez saglasnosti poverioca oslobađa poverioca obaveze da vrati menice i naplaćeno?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje zahteva za povraćaj menica i iznosa jer poverilac nije pristupao promeni dužnika i zadržava pravo na obezbeđenje.",
    reasoning:
      "Statusne promene kod dužnika i preuzimanje duga od strane bivšeg vlasnika ne obavezuju drugotuženog poverioca bez njegovog pristanka. Sud ne može naložiti NBS da nastavi prinudnu naplatu ako to zakon ne predviđa za tu fazu.",
    keywords: ["menica", "povraćaj", "preuzimanje duga", "NBS", "Pž"],
    related_articles: ["ZOO", "Zakon o platnom prometu", "ZPP čl. 391"],
    headnote:
      "Poverilac koji nije pristao na novaciju zadržava instrumente obezbeđenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUz 101/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li su ustavnosumnjive odredbe ZIO o protivizvršenju i obračunu zatezne kamate na vraćanje naplaćenog?",
    court_position:
      "Ustavni Sud je pokrenuo postupak za ocenu ustavnosti čl. 79 st. 5 ZIO, a inicijativu za stav 3 istog člana je odbacio.",
    reasoning:
      "Inicijator smatra da nalog na povraćaj plus kamata od dana naplate do povraćaća nepravično pogađa i savesne sticaoce i odstupa od ZOO; predloženo je i privremeno odlaganje primene.",
    keywords: ["protivizvršenje", "ZIO", "ustavnost", "zatezna kamata", "Ustavni sud"],
    related_articles: ["čl. 79 st. 3 i 5 ZIO", "čl. 58 Ustava RS", "čl. 1 Protokol 1 EKPJ"],
    headnote:
      "Kamatni režim u protivizvršenju može biti predmet ustavnosudskog nadzora.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5694/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li presuda u sporu iz privatizacije povređuje pravo na pravično suđenje i pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu kao neosnovanu u delu pravičnog suđenja i odbacio žalbu zbog razumnog roka jer pet godina postupka nije nerazumno dugo.",
    reasoning:
      "Opisuje se kupoprodaja kapitala, rate, investicije, raskid po čl. 41a Zakona o privatizaciji, protest garancije i isplata regresa. Ustavni Sud nije našao proizvoljnost ni povredu roka.",
    keywords: ["privatizacija", "ustavna žalba", "razuman rok", "garancija", "Ustavni sud"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "Zakon o privatizaciji"],
    headnote:
      "Kompleksni privatizacioni spor od pet godina sam po sebi ne povređuje čl. 32 Ustava.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3515/2024",
    legal_area: "commercial",
    legal_question:
      "Da li je ništava blanko menica koju je tuženi popunio bez sporazuma sa izdavaocem i bez valjanog meničnog ovlašćenja u pregovorima?",
    court_position:
      "Apelacioni sud je utvrdio ništavost menice jer nije postojalo valjano menično ovlašćenje niti lično jemstvo u overenim ugovorima, uprkos kontekstu poslovnih pregovora.",
    reasoning:
      "Sopstvena menica se prenosi indosamentom; blanko menica daje ovlašćenje poveriocu za popunu u granicama sporazuma. Bez sporazuma o jemstvu ili ovlašćenju popuna je suprotna zakonu.",
    keywords: ["blanko menica", "menično ovlašćenje", "ništavost", "Gž"],
    related_articles: ["čl. 10–11", "čl. 109 Zakona o menici"],
    headnote:
      "Menica izdata u pregovorima bez pisanog osnova ne stvara obavezu sama po sebi.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "Uo 58/2017",
    legal_area: "administrative",
    legal_question:
      "Da li treba odložiti izvršenje rešenja o naknadi za zaštitu životne sredine ako bi prinudna naplata izazvala tešku nadoknadivu štetu privrednom subjektu?",
    court_position:
      "Upravni sud je usvojio zahtev i odložio izvršenje rešenja opštine o posebnoj naknadi, ocenivši da bi izvršenje nanelo štetu koja bi se teško nadoknadila.",
    reasoning:
      "Podnosilac je pozvao na ranije odlaganje istog organa, gubitak poslovanja, broj zaposlenih i rizik blokade računa i aktiviranja menica dobavljača.",
    keywords: ["odlaganje izvršenja", "životna sredina", "naknada", "Upravni sud"],
    related_articles: ["Zakon o upravnim sporovima", "Zakon o zaštiti životne sredine"],
    headnote:
      "Egzistencijalni ekonomski rizik može opravdati privremeno odloženje izvršenja upravnog rešenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 910/2017",
    legal_area: "commercial",
    legal_question:
      "Da li se na blanko menice za buduće obaveze primenjuje rok od jedne godine za menicu po viđenju iz čl. 33 Zakona o menici?",
    court_position:
      "Privredni apelacioni sud je preinačio rešenje i odbio predlog za zabranu realizacije menica, smatrajući da poverilac može uneti dospeće pa nije reč o menici po viđenju u smislu čl. 33 st. 1 ZM.",
    reasoning:
      "Blanko menica sa ovlašćenjem za popunu svih elemenata uključujući dospeće nije menica po viđenju; popuna za isporuke gasa u periodu važenja ugovora je u okviru ovlašćenja.",
    keywords: ["blanko menica", "menica po viđenju", "čl. 33 ZM", "Pž"],
    related_articles: ["čl. 33 st. 1 Zakona o menici", "ZPP čl. 401 st. 1 tačka 3"],
    headnote:
      "Ovlašćenje za unos dospeća razlikuje blanko menicu od klasične menice po viđenju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7201/2021",
    legal_area: "commercial",
    legal_question:
      "Da li je tužena pasivno legitimisana u sporu o priznanju duga ako je potpisala ugovor u ime dužnika bez ovlašćenja?",
    court_position:
      "Vrhovni kasacioni sud je preinačio presude i utvrdio da tužena nije pasivno legitimisana jer potpis bez ovlašćenja ne stvara dužničko-poverilački odnos niti pristupanje dugu.",
    reasoning:
      "Prvostepeni sud je delimično usvojio tužbu za naknade komunalnih usluga i odbio protivtužbu za ništavost ugovora i menice. Revizijski sud je ispravio pasivnu legitimaciju u odnosu na lice koje nije stvarni dužnik.",
    keywords: ["pasivna legitimacija", "punomoćje", "priznanje duga", "revizija"],
    related_articles: ["ZOO", "ZPP"],
    headnote:
      "Potpis trećeg lica bez ovlašćenja ne prebacuje obavezu na potpisnika kao dužnika.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 24/2019",
    legal_area: "criminal",
    legal_question:
      "Da li su okrivljeni krivi za prevare pri dobijanju kredita banke kada su obezbeđenja postala neefikasna zbog stečaja dužnika i precenjenih hipoteka?",
    court_position:
      "Apelacioni sud u Beogradu je preinačio oslobađajuću presudu i oglašavao okrivljene krivim za prevare uz kazne, dok je optužba za zločinačko udruživanje odbijena zbog zastarelosti.",
    reasoning:
      "Krediti su bili obezbeđeni menicama, hipotekama i polisama; stečaj nad dužnicima i precenjene nepokretnosti onemogućili su naplatu. Sud je ocenio da je dovođenje banke u zabludu dokazano suprotno odbrane.",
    keywords: ["prevara", "kredit", "banka", "obezbeđenje", "stečaj", "Kž"],
    related_articles: ["KZ – prevara", "Zakon o bankama"],
    headnote:
      "Krivična odgovornost za obmanu banke ne zavisi samo od nenaplativosti, već od dokazanog obmanjujućeg delovanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 17316/2015",
    legal_area: "administrative",
    legal_question:
      "Da li poreski obveznik može tražiti brisanje hipoteke kao sredstva obezbeđenja poreskog duga ako je zahtev za odlaganje plaćanja poreza odbijen?",
    court_position:
      "Upravni sud je odbio tužbu za poništaj rešenja o brisanju hipoteke: hipoteka ostaje na snazi dok se obezbeđeni poreski dug ne plati u celosti.",
    reasoning:
      "Odlaganje plaćanja po čl. 73–74 Zakona o poreskom postupku i poreskoj administraciji uslovljeno je sredstvima obezbeđenja u propisanoj visini; odbijanje odlaganja ne znači automatsko brisanje hipoteke.",
    keywords: ["hipoteka", "poreski dug", "obezbeđenje", "odlaganje plaćanja", "Upravni sud"],
    related_articles: ["čl. 73–74 Zakona o poreskom postupku i poreskoj administraciji", "čl. 41 ZUS"],
    headnote:
      "Hipoteka kao kolateral poreskog duga živi nezavisno od ishoda zahteva za odlaganje plaćanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Iž 839/2022",
    legal_area: "enforcement",
    legal_question:
      "Da li je predlog za izvršenje neuredan ako izvršni poverilac traži samo troškove parničnog postupka, a ne i glavni dosuđeni iznos iz iste izvršne presude?",
    court_position:
      "Privredni apelacioni sud je odbio žalbu izvršnog dužnika i potvrdio rešenje o izvršenju: predlog može da obuhvati samo troškove postupka bez glavnice.",
    reasoning:
      "Izvršna presuda dosuđuje i glavni iznos i troškove; zakon ne brani izvršnom poveriocu da pokrene naplatu samo jednog dosuđenog dela potraživanja u granicama izvršne isprave.",
    keywords: ["izvršenje", "predlog za izvršenje", "troškovi postupka", "Iž"],
    related_articles: ["ZIO"],
    headnote:
      "Parcijalna prinudna naplata jednog elementa izvršne isprave nije sama po sebi neuredan predlog.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 8567/2015",
    legal_area: "administrative",
    legal_question:
      "Da li poreski obveznik ima položaj stranke u postupku donošenja privremene mere hipoteke radi budućeg poreskog duga?",
    court_position:
      "Upravni sud je odbio tužbu protiv rešenja kojim je ustanovljena hipoteka radi obezbeđenja budućeg poreskog duga, jer u postupku po službenoj dužnosti obveznik nema položaj stranke.",
    reasoning:
      "Poreska uprava je odredila hipoteku na nepokretnostima u korist Republike radi potencijalnog duga; žalba ne odlaže izvršenje. Tužba osporava zakonitost ali sud nalazi da procesni položaj obveznika nije isti kao u sporu sa punim procesnim pravima.",
    keywords: ["hipoteka", "porez", "privremena mera", "stranka", "Upravni sud"],
    related_articles: ["Zakon o poreskom postupku i poreskoj administraciji", "ZUS"],
    headnote:
      "Službeni postupci obezbeđenja poreza mogu imati uži krug procesnih prava nego klasični spor.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2581/2015",
    legal_area: "constitutional",
    legal_question:
      "Da li je izvršni sud pogrešio što nije dozvolio prigovor zastarelosti na naplatu naknade za odvodnjavanje utvrđene izvršnom ispravom iz upravnog postupka?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu jer suštinski nije povređeno pravo podnosioca: petogodišnji rok zastarelosti za naplatu te naknade nije protekao u momentu predloga za izvršenje.",
    reasoning:
      "Prigovor zastarelosti po čl. 42 st. 1 tačka 5 ZIO odnosi se na izvršne isprave sa zakonskim rokom naplate; primenjuje se čl. 114b Zakona o poreskom postupku u vezi sa Zakonom o vodama. Zastarelost je počela 1. januara 2011, a predlog je podnet 22. januara 2015.",
    keywords: ["ustavna žalba", "zastarelost", "izvršenje", "naknada za odvodnjavanje", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 114b ZPPPA", "ZIO čl. 42"],
    headnote:
      "Ustavni sud meri suštinu: pogrešna procesna ocena o dopuštenosti prigovora ne mora biti ustavna povreda ako ishod ostaje pravičan.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9971/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o prinudnoj naplati poreza na imovinu ako u spisu nema dokaza o urednoj dostavi opomene?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje o prinudnoj naplati jer nije dokazano da je opomena kao preduslov prinudne naplate zakonito dostavljena.",
    reasoning:
      "Prinudna naplata poreza na imovinu zahteva prethodnu opomenu u roku; bez dokaza o prijemu opomene postupak je pogođen bitnom povredom.",
    keywords: ["prinudna naplata", "porez", "opomena", "dostava", "Upravni sud"],
    related_articles: ["Zakon o poreskom postupku i poreskoj administraciji", "ZUS"],
    headnote:
      "Dokaz o dostavi opomene je često ključan za zakonitost prinudne naplate.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Us 43/2014",
    legal_area: "procedural",
    legal_question:
      "Da li je za izvršenje odluke o troškovima prekršajnog postupka nadležan prekršajni ili osnovni sud?",
    court_position:
      "Vrhovni kasacioni sud je utvrdio da je prekršajni sud koji je doneo odluku nadležan za rešenje o izvršenju troškova; osnovni sud tek ako naplata sa računa ne uspe.",
    reasoning:
      "Po Zakonu o prekršajima prinudna naplata na imovini kažnjenog sledi tek kada se ne ostvari na način predviđen rešenjem prekršajnog suda; prekršajni sud mora prvo pokušati naplatu prema rešenju o izvršenju.",
    keywords: ["izvršenje", "prekršaj", "troškovi postupka", "nadležnost", "Us"],
    related_articles: ["Zakon o prekršajima čl. 316–321", "ZIO"],
    headnote:
      "Institucionalna nadležnost za izvršenje kaznenih/prekršajnih troškova prati sud koji je doneo presudu.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2961/2019",
    legal_area: "commercial",
    legal_question:
      "Da li tužilac dokazuje ništavost menice popunjene za drugi poslovni odnos ako nije dostavio menično ovlašćenje?",
    court_position:
      "Privredni apelacioni sud je preinačio presudu i odbio tužbu za ništavost menice jer tužilac nije dokazao postojanje meničnog ovlašćenja koje bi pokazalo zloupotrebu popune.",
    reasoning:
      "Prvostepeni sud je zaključio da je menica popunjena suprotno čl. 16 ZM zbog registracije osnova; drugostepeni sud nalazi da bez meničnog ovlašćenja nije dokazana zloupotreba u smislu zaštite izdavaoca.",
    keywords: ["ništavost menice", "menično ovlašćenje", "teret dokazivanja", "Pž"],
    related_articles: ["čl. 16 Zakona o menici", "ZPP"],
    headnote:
      "Ko tvrdi zloupotrebu blanko menice mora dokazati sadržaj ovlašćenja, ne samo različitost osnova u registraciji.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "P 1500/2016",
    legal_area: "commercial",
    legal_question:
      "Da li su za privremenu meru dovoljni verovatnoća potraživanja prema jednom tuženom i opasnost naplate od drugog?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje privremene mere jer tužilac nije kumulativno dokazao verovatnoću potraživanja prema drugotuženom i opasnost da će prvotuženi osujetiti naplatu.",
    reasoning:
      "Rešenje o izvršenju na nepokretnosti samo po sebi ne dokazuje subjektivnu opasnost od raspolaganja imovinom van okvira izvršenja; potrebne su aktivne radnje dužnika.",
    keywords: ["privremena mera", "opasnost naplate", "ZIO čl. 293", "P"],
    related_articles: ["čl. 293 ZIO"],
    headnote:
      "Kumulativni uslovi za privremenu meru moraju biti dokazani za svaki odnos koji merom cilja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9507/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je bitna povreda postupka ako drugostepeni carinski organ odlučuje o žalbi lica koje žalbu nije podnelo, umesto o žalbi stvarnog žalioca?",
    court_position:
      "Upravni sud je uvažio tužbu špeditera i poništio rešenje Uprave carina jer je drugostepeni organ odlučivao o žalbi uvoznika umesto o žalbi špeditera.",
    reasoning:
      "Jedini žalilac bio je špediter; odlučivanje o tuđoj žalavi predstavlja bitnu povredu upravnog postupka i nedostatak nadležnosti u odnosu na stvarnog podnosioca.",
    keywords: ["carina", "žalba", "bitna povreda postupka", "Upravni sud"],
    related_articles: ["čl. 41 ZUS", "Carinski zakon"],
    headnote:
      "Mešanje stranaka u žalbenom postupku čini drugostepenu odluku nezakonitom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "Uo 31/2016",
    legal_area: "administrative",
    legal_question:
      "Da li treba odložiti izvršenje rešenja o porezu na prenos apsolutnih prava ako je kupac solidarni jemac i penzioner koji tvrdi da bi mu izvršenje nanelo teško nadoknadivu štetu?",
    court_position:
      "Upravni sud je odbio zahtev za odlaganje izvršenja jer podnosilac nije dokazao da bi mu prinudna naplata nanela štetu koja bi se teško mogla nadoknaditi.",
    reasoning:
      "Poresko rešenje utvrđuje obavezu kupca kao solidarnog jemca; za odlaganje izvršenja potrebno je dokazati kumulativno suprotno javnom interesu i štetu za protivnu stranu, što ovde nije učinjeno uverljivo.",
    keywords: ["odlaganje izvršenja", "porez na prenos", "jemac", "Upravni sud"],
    related_articles: ["ZUS", "Zakon o poreskom postupku i poreskoj administraciji"],
    headnote:
      "Opšta finansijska teškoća penzionera bez konkretnog dokaza o nenadoknadivosti ne zadovoljava test za odlaganje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4266/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li neizvršenje izvršnog postupka protiv društvenog preduzeća duže od dve godine povređuje pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, utvrdio povredu prava na suđenje u razumnom roku i dosudio naknadu materijalne štete u visini neizvršenog potraživanja i nematerijalne od 200 evra.",
    reasoning:
      "Izvršenje je otpočelo 2009. i nije okončano do brisanja dužnika 2011; NBS nije imala zakonitu obavezu obaveštavanja suda o nemogućnosti isplate, ali trajanje bez efekta predstavlja nerazumno kašnjenje države.",
    keywords: ["izvršenje", "razuman rok", "NBS", "materijalna šteta", "Ustavni sud"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "Zakon o platnom prometu"],
    headnote:
      "Dugovečno izvršenje bez pokreta koje traje do nestanka dužnika može biti ustavno neprihvatljivo.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1860/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li je dosuđeno obeštećenje za kršenje prava na suđenje u razumnom roku neadekvatno ako je simbolično nisko?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje zbog neadekvatne novčane naknade, određujući pravičan iznos od 800 evra.",
    reasoning:
      "Opisuje se spor oko privatizacije, rokova, protesta garancije i odnosa prema čl. 41a Zakona o privatizaciji; prethodno dosuđeni iznos nije bio srazmeran težini povrede.",
    keywords: ["ustavna žalba", "pravično suđenje", "naknada", "privatizacija", "Ustavni sud"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 6 st. 1 EKPJ"],
    headnote:
      "Ustavni sud može povećati nematerijalnu naknadu kada redovni sudovi nisu postigli srazmernost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3500/2024",
    legal_area: "commercial",
    legal_question:
      "Da li jemac-platac ostaje dužan po kreditu posle stečaja banke i kako se obračunava zatezna kamata na dug u evrima?",
    court_position:
      "Apelacioni sud je potvrdio obavezu jemca placa na dug po kreditu; žalba tuženog delimično usvojena samo radi preciziranja obračuna zatezne kamate na dug u evrima.",
    reasoning:
      "Tuženi je dao blanko menice i izjavu solidarne odgovornosti; banka je delimično namirila potraživanje u drugom izvršnom postupku. Preostali dug i kamata prate ugovorne i zakonske stope.",
    keywords: ["jemac-platac", "kredit", "stečaj banke", "kamata", "Gž"],
    related_articles: ["ZOO", "Zakon o menici", "Zakon o zateznoj kamati"],
    headnote:
      "Stečaj kredita ne gasi automatski jemstvo fizičkog lica bez meritornog ispitivanja preostalog duga.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 39/2017",
    legal_area: "constitutional",
    legal_question:
      "Da li je proizvoljno odbacivanje predloga za izvršenje troškova postupka zbog toga što punomoćnik advokat traži prenos na svoj račun bez posebnog punomoćja za izvršenje?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje jer je izvršni sud pogrešno smatrao da ZIO ne predviđa prenos na račun advokata.",
    reasoning:
      "Po čl. 89 st. 1 tačka 4 ZPP advokat sa parničnim punomoćjem može primiti dosuđene troškove; po čl. 48 st. 6 ZIO naplata troškova na račun advokata može ići na osnovu zakonski overenog parničkog punomoćja.",
    keywords: ["izvršenje", "troškovi postupka", "advokat", "punomoćje", "Ustavni sud"],
    related_articles: ["čl. 89 st. 1 tačka 4 ZPP", "čl. 48 st. 6 ZIO"],
    headnote:
      "Parnično punomoćje može biti dovoljno osnov za izvršenje troškova u korist advokata.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7143/2015",
    legal_area: "administrative",
    legal_question:
      "Da li Poreska uprava može odlučivati o žalbi na rešenje opštine o prinudnoj naplati komunalnih taksi?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje Poreske uprave jer nije bila stvarno nadležna za žalbu na lokalnu komunalnu taksu.",
    reasoning:
      "Prinudna naplata komunalnih obaveza u nadležnosti je organa jedinice lokalne samouprave; drugostepeni poreski organ nije mogao zakonito odlučivati o toj žalbi.",
    keywords: ["komunalna taksa", "nadležnost", "Poreska uprava", "opština", "Upravni sud"],
    related_articles: ["ZUS", "Zakon o lokalnoj samoupravi"],
    headnote:
      "Vertikalna nadležnost poreskih organa ne pokriva svaku prinudnu naplatu javnih prihoda opštine.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3128/2021",
    legal_area: "commercial",
    legal_question:
      "Da li se može dosuditi zatezna kamata za period za koji je već u celosti naplaćena u izvršnom postupku pre podnošenja tužbe?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje dela tužbe za kamatu jer je za taj period kamata već naplaćena izvršenjem, pa je potraživanje prestalo ispunjenjem.",
    reasoning:
      "Pravnosnažna presuda i rešenje o izvršenju omogućili su naplatu mesečnih iznosa štete sa kamatom; poverilac je obavestio sud da je glavnica i kamata za sporni period naplaćena i povukao predlog za deo rente.",
    keywords: ["zatezna kamata", "izvršenje", "ispunjenje obaveze", "Gž"],
    related_articles: ["čl. 374 st. 2 tačka 12 ZPP", "ZOO"],
    headnote:
      "Dvostruka naplata iste kamatne obaveze nije dozvoljena ako je prinudna naplata već izvršena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3928/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je izvršni sud proizvoljno odbacio predlog za izvršenje jer je punomoćnik podneo predlog za predujam troškova u fazi rešenja o izvršenju?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i poništio rešenje Višeg suda jer o predujmu troškova odlučuje javni izvršitelj, a ne izvršni sud u fazi donošenja rešenja o izvršenju.",
    reasoning:
      "ZIO iz 2015. ne vezuje trenutak podnošenja predloga za predujam isključivo za fazu posle rešenja; proizvoljno je tumačenje da je predlog suprotan zakonu ako zakon ne zabranjuje takav trenutak.",
    keywords: ["izvršenje", "predujam troškova", "javni izvršitelj", "Ustavni sud"],
    related_articles: ["čl. 48 st. 6 ZIO", "ZPP"],
    headnote:
      "Podela nadležnosti između suda i javnog izvršitelja mora biti dosledna ZIO-u.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 21/2010",
    legal_area: "criminal",
    legal_question:
      "Da li su okrivljeni krivi za zloupotrebu službenog položaja pri naplati putarine i za zločinačko udruživanje?",
    court_position:
      "Apelacioni sud je preinačio presudu smanjujući kazne za zloupotrebu položaja pri naplati putarine, a optužbu za zločinačko udruživanje odbio zbog apsolutne zastarelosti krivičnog gonjenja.",
    reasoning:
      "Priznanja i iskazi inkasanta i drugih okrivljenih kao i materijalni dokazi podržavaju utvrđivanje nezakonite naplate; za udruživanje je nastupila zastarelost.",
    keywords: ["zloupotreba položaja", "putarina", "zastarelost", "Kž"],
    related_articles: ["KZ"],
    headnote:
      "Masovni krivični predmeti zahtevaju posebnu procenu zastarelosti za svako krivično delo.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 906/2020",
    legal_area: "commercial",
    legal_question:
      "Da li je dopušteno izvršenje na celoj nepokretnosti ako je polovina zajednička bračna imovina a hipoteka je zasnovana bez saglasnosti drugog supružnika?",
    court_position:
      "Vrhovni kasacioni sud je dozvolio posebnu reviziju, preinačio presude i utvrdio nedopuštenost izvršenja na polovini nepokretnosti koja pripada drugom supružniku bez njegove saglasnosti.",
    reasoning:
      "Hipoteka na zajedničkoj imovini bez izričite saglasnosti oba supružnika nije valjana na delu koji pripada supružniku koji nije dao saglasnost; izvršenje prodajom celog objekta je nedopušteno u tom delu.",
    keywords: ["hipoteka", "bračna imovina", "saglasnost supružnika", "izvršenje", "revizija"],
    related_articles: ["Porodični zakon", "ZIO"],
    headnote:
      "Zaštita bračnog druga od jednostrane založne obaveze zahteva pisanu saglasnost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 856/2022",
    legal_area: "procedural",
    legal_question:
      "Da li je bitna povreda postupka ako drugostepeni sud preinači presudu na osnovu drugačije ocene iskaza bez ponovnog saslušanja stranaka?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presudu Apelacionog suda i vratio predmet na ponovno odlučivanje jer je drugostepeni sud prekršio načelo neposrednosti i usmenosti.",
    reasoning:
      "Drugostepeni sud ne može zameniti sopstvenu ocenu iskaza umesto prvostepenog bez održane rasprave i ponovnog izvođenja spornih dokaza kada to menja bitne činjenice.",
    keywords: ["bitna povreda postupka", "rasprava", "iskazi", "revizija", "ZPP"],
    related_articles: ["čl. 374 ZPP"],
    headnote:
      "Drugostepeni sud ne sme „preći preko glave“ prvostepenom saslušanju kada iskazi predstavljaju okosnicu spora.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 878/2021",
    legal_area: "commercial",
    legal_question:
      "Da li se može pobiti ugovor o poklonu nepokretnosti dužnika sinu radi zaštite poverilaca?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je usvojena tužba poverilaca za pobijanje ugovora o poklonu jer je dužnik besteretnim poslom onemogućio naplatu dospelih potraživanja.",
    reasoning:
      "Poklon između dužnika i sina praćen je upisom vlasništva u korist sina posle što su poverioci pokrenuli izvršenje po presudi o dugu; ispunjeni su uslovi za pobijanje pravne radnje po pravilima o šteti poverilaca.",
    keywords: ["pobijanje", "poklon", "poverioci", "izbegavanje naplate", "Gž"],
    related_articles: ["čl. 128–132 ZOO", "Zakon o nasleđivanju"],
    headnote:
      "Poklon dužnika bliskom licu u jeku naplate može biti pobijan kao štetan po poverioce.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Iž 550/2016",
    legal_area: "enforcement",
    legal_question:
      "Da li javnobeležnička založna izjava može biti izvršna isprava za naplatu zakonske zatezne kamate ako izjava ne sadrži obavezu plaćanja kamate?",
    court_position:
      "Privredni apelacioni sud je potvrdio izvršenje za glavni dug i troškove, ali je delimično usvojio žalbu dužnika i obustavio izvršenje za zateznu kamatu jer izjava ne sadrži izričitu obavezu na kamatu.",
    reasoning:
      "Izvršna isprava mora biti podobna za predmet izvršenja; ako je založna izjava ograničena na glavnicu i rok dospeća, kamata zahteva poseban naslov ili izričitu klauzulu.",
    keywords: ["založna izjava", "javni beležnik", "zatezna kamata", "izvršna isprava", "Iž"],
    related_articles: ["čl. 74", "čl. 78 st. 3 ZIO"],
    headnote:
      "Izvršenje prati dispozitiv izvršnog naslova; širenje na kamatu zahteva odgovarajući tekst isprave.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1015/2022",
    legal_area: "commercial",
    legal_question:
      "Da li treće lice može tužbom osporiti dopuštenost izvršenja na osnovu toga što je ispunilo sopstvenu ugovornu obavezu prema izvršnom dužniku?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca kao neosnovanu i potvrdio da treće lice nema pravo na tužbu za nedopuštenost izvršenja zasnovano samo na ispunjenju ugovorne obaveze prema dužniku.",
    reasoning:
      "Pravni interes za tužbu nedopuštenosti izvršenja zahteva stvarno pravo na predmetu izvršenja koje sprečava namirenje; ispunjenje ugovorne obaveze prema dužniku ne daje isti položaj kao stvarno vlasništvo ili pravo koje bi blokiralo prodaju.",
    keywords: ["nedopušteno izvršenje", "treće lice", "revizija", "ZIO"],
    related_articles: ["ZIO", "ZPP"],
    headnote:
      "Treće lice bez stvarnog prava na predmet izvršenja nema legitimaciju za spor o dopuštenosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3607/2020",
    legal_area: "commercial",
    legal_question:
      "Da li prvostepena presuda mora jasno utvrditi da li je menica sopstvena ili trasirana pre donošenja odluke o obavezi plaćanja?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu jer su razlozi nejasni i protivrečni oko pravne prirode menice, što je ključno za valjanost i primenu Zakona o menici.",
    reasoning:
      "Kod trasirane menice postoji trasat koji plaća trećem, kod sopstvene izdavalac sam snosi plaćanje; mešanje kategorija čini presudu neproverljivom u pravnom smislu.",
    keywords: ["menica", "sopstvena", "trasirana", "razlozi presude", "Gž"],
    related_articles: ["Zakon o menici", "ZPP"],
    headnote:
      "Sud mora eksplicitno kvalifikovati instrument pre primene meničnih rokova i odgovornosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1682/2020",
    legal_area: "commercial",
    legal_question:
      "Da li blokada računa, gubitak poslovanja i tuđe izvršenje na hipoteci dokazuju subjektivnu opasnost za privremenu meru?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje privremene mere jer tužilac nije dokazao aktivne radnje dužnika usmerene na osujećenje naplate, već samo objektivno teže finansijsko stanje.",
    reasoning:
      "Blokade dela računa, gubitak i tuđa hipoteka mogu ukazivati na loše poslovanje, ali ne i na fraudulento raspolaganje imovinom u smislu čl. 293 ZIO.",
    keywords: ["privremena mera", "opasnost naplate", "subjektivna opasnost", "Pž"],
    related_articles: ["čl. 293 ZIO"],
    headnote:
      "Opšte finansijske poteškoće dužnika ne zamenjuju dokaz o ciljanom otežavanju naplate.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7828/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita novčana kazna za nepostupanje po nalogu komunalnog inspektora i zaključku o dozvoli izvršenja?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio rešenje kojim je tužilji izrečena novčana kazna jer nije uklonila stvari ni postupila po rešenju u roku.",
    reasoning:
      "Kazna je zaprećena zaključkom o dozvoli izvršenja; tužilja nije izvršila obavezu u roku od tri dana od prijema zaključka o izricanju kazne.",
    keywords: ["novčana kazna", "komunalni inspektor", "izvršenje", "Upravni sud"],
    related_articles: ["Zakon o komunalnim delatnostima", "Zakon o opštem upravnom postupku"],
    headnote:
      "Sekvenca: rešenje → dozvola izvršenja → kazna za neizvršenje mora biti dosledna i dokazana.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 13252/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li je prekršajno kažnjavanje zbog zviždanja i transparenta na promociji knjige neproporcionalno mešanje u slobodu izražavanja?",
    court_position:
      "Ustavni Sud je odbio žalbu i ocenio da je državno kažnjavanje bilo zakonito i neophodno radi zaštite javnog reda i mira i spokojstva građana.",
    reasoning:
      "Podnosioci tvrde miran protest i prebijanje od strane drugih učesnika; Ustavni Sud nalazi da je mešanje u slobodu okupljanja bilo u okviru zakonskih ciljeva zaštite drugih.",
    keywords: ["sloboda izražavanja", "javno okupljanje", "prekršaj", "Ustavni sud"],
    related_articles: ["čl. 46 Ustava RS", "čl. 54 Ustava RS"],
    headnote:
      "Granica između protesta i remećenja javnog reda ostaje predmet konkretne procene po činjenicama.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1-Po1 22/2023",
    legal_area: "criminal",
    legal_question:
      "Da li prvostepena osuđujuća presuda za zloupotrebu položaja u vezi sa odobravanjem kredita bankom mora analizirati sve okolnosti tolerancije docnje i efikasnosti obezbeđenja?",
    court_position:
      "Apelacioni sud je usvojio žalbe odbrane, ukinuo prvostepenu osuđujuću presudu za zloupotrebu položaja i vratio predmet na ponovno suđenje zbog bitnih povreda postupka i nepotpuno utvrđenog činjeničnog stanja.",
    reasoning:
      "Nenaplativost kredita sama po sebi nije krivično delo; sud mora ceniti interventne mere, blokade, stečaj banke, ponude restrukturisanja i aktivnosti po hipotekama pre donošanja krivične presude.",
    keywords: ["zloupotreba položaja", "krediti", "banka", "bitna povreda", "Kž"],
    related_articles: ["KZ", "Zakon o bankama"],
    headnote:
      "Ekonomski neuspeh kreditnog portfolija zahteva odvojeno od kvalifikovanog obmanjujućeg ponašanja odgovornih lica.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 363/2024",
    legal_area: "commercial",
    legal_question:
      "Da li je ništav aneks kupoprodajnog ugovora i založne izjave ako je punomoćnik prodavca prekoračio ovlašćenja?",
    court_position:
      "Apelacioni sud je potvrdio ništavost aneksa ugovora o kupoprodaji zemljišta i založnih izjava na tom zemljištu zbog prekoračenja punomoćja; preinačena je odluka o predaji poseda u suvlasnički umesto isključivi posed.",
    reasoning:
      "Banca Intesa je kao poverilac ostvarila hipoteke na osnovu izjava koje su prekoračile ovlašćenje punomoćnika prodavca; ništavost aneksa vuče ništavost zavisnih založnih izjava u tom delu.",
    keywords: ["punomoćje", "prekoračenje", "aneks", "hipoteka", "ništavost", "Gž"],
    related_articles: ["ZOO", "Zakon o hipoteci", "Zakon o državnom premeru i katastru"],
    headnote:
      "Neprecizno određeno punomoćje za prodaju i založenje može učiniti ništavim ceo lanac pravnih poslova.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5436/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li je prekršajno kažnjavanje učesnika uredno prijavljenog sindikalnog protesta zbog vike i povišenih glasova neproporcionalno mešanje u slobodu javnog okupljanja?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio da je kažnjavanje povredilo slobodu javnog okupljanja jer tolerancija na buku protesta mora biti veća od interesa na spokojstvo u instituciji.",
    reasoning:
      "Skup je bio zakonito prijavljen; motiv protesta bio je skretanje pažnje na socijalne probleme. Vik i povišeni glasovi u konkretnim okolnostima nisu prekoračili granicu mirnog protesta iz čl. 54 st. 1 Ustava.",
    keywords: ["sindikalni protest", "sloboda okupljanja", "prekršaj", "Ustavni sud"],
    related_articles: ["čl. 54 Ustava RS", "čl. 6 st. 1 EKPJ"],
    headnote:
      "Država mora trpeti određeni nivo buke na mirnim sindikalnim demonstracijama ispred javnih institucija.",
    outcome: "plaintiff_won",
  },
]
