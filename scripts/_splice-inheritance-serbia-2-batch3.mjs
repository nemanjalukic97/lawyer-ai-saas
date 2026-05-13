import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, "case-law-inheritance-serbia-2.ts")

const marker = `    outcome: "procedural",
  },
]`

const batch3 = `
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4568/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li parnični postupak koji traje preko deset godina povredi pravo na suđenje u razumnom roku kada je u pitanju spor o zajedničkom testamentu?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu u delu o povredi prava na suđenje u razumnom roku i dosudio 1.200 evra nematerijalne štete; u preostalom delu žalba je odbačena jer se osporava meritum.",
    reasoning:
      "Zajednički testament je proglašen ništavim po merodavnom pravu zbog suprotnosti čl. 80 st. 3 starog ZON; dužina postupka prelazi razuman okvir.",
    keywords: ["ustavna žalba", "razuman rok", "zajednički testament", "parnica"],
    related_articles: ["čl. 32 Ustava RS", "čl. 80 st. 3 ZON (istorijski)"],
    headnote:
      "Ustavna zaštita roka ne zamenjuje ponavljanje meritornog spora pred običnim sudovima.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1846/2019",
    legal_area: "civil",
    legal_question:
      "Da li poverioci mogu pobiti odricanje dužnika od nasleđa kada postoji testament kojim je dužnik imenovan za naslednika?",
    court_position:
      "Vrhovni kasacioni sud je preinačio nižestepene presude i odbio tužbeni zahtev poverilaca za pobijanje odricanja od nasleđa: odricanje od zakonskog nasleđa nema pravno dejstvo ako je ostavilac ostavio testament kojim je dužnik određen za naslednika.",
    reasoning:
      "Iznenadni pronalazak testamenta u završnoj fazi postupka ne menja jači osnov pozivanja na nasleđe; primena čl. 280–283 Zakona o obligacionim odnosima u kontekstu naslednog prava.",
    keywords: ["pobijanje pravnih radnji", "odricanje od nasleđa", "testament", "ZOO"],
    related_articles: ["čl. 280–283 ZOO", "ZON"],
    headnote:
      "Testament koji imenuje naslednika čini odricanje od zakonskog nasleđa pravno neefikasnim u sporu poverilaca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2540/2019",
    legal_area: "commercial",
    legal_question:
      "Da li manjinski akcionari mogu uspešno tražiti poništaj odluka skupštine o retroaktivnoj ispravci finansijskih izveštaja?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje tužbe: odluke skupštine o retroaktivnoj ispravci materijalnih grešaka u finansijskim izveštajima u skladu su sa zakonom i računovodstvenim standardima.",
    reasoning:
      "Žalba manjinskih akcionara nije osnovana po čl. 386 ZPP; ispravke su bile u okviru ovlašćenja društva i ne predstavljaju zloupotrebu većina prema manjini.",
    keywords: ["skupština akcionara", "finansijski izveštaji", "Pž", "društvo kapitala"],
    related_articles: ["ZPP", "Zakon o računovodstvu"],
    headnote:
      "Retroaktivna ispravka grešaka u izveštajima ne mora biti zloupotreba ako je procedura i sadržaj zakoniti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6301/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li je usmeno zaveštanje u bolnici neposredno pre smrti punovažno ako zaveštalac nije mogao da sačini pismeni testament?",
    court_position:
      "Apelacioni sud je potvrdio punovažnost usmenog zaveštanja: postojale su izuzetne prilike (naglo pogoršanje zdravlja), a smrt je nastupila pre isteka 30 dana od izjave, pa rok iz čl. 86 ZON nije presudan.",
    reasoning:
      "Subjektivna i objektivna nemogućnost sastavljanja drugog oblika zbog iscrpljenosti, starosti i kratkog vremena do smrti; zaveštalac je jasno izrazila poslednju volju pred svedocima.",
    keywords: ["usmeno zaveštanje", "izuzetne prilike", "bolnica", "čl. 86 ZON"],
    related_articles: ["čl. 86 ZON"],
    headnote:
      "Kratko vreme do smrti i nemogućnost angažovanja advokata mogu opravdati usmeni oblik poslednje volje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3981/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li se isključenje nužnih naslednika iz nasleđa razlikuje od nedostojnosti za nasleđivanje i da li je testament formalno i materijalno valjan?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za poništenje testamenta: testament je formalno ispravan, a isključenje dece zbog teže povrede moralnih obaveza valjano; radi se o isključenju po volji, a ne o nedostojnosti po čl. 4 ZON.",
    reasoning:
      "Zaveštalac je postupio po čl. 85 ZON; razlikuju se instituti isključenja (čl. 61–63) i nedostojnosti koje sud ceni po službenoj dužnosti. Deca nisu brinula o ocu u meri koja opravdava isključenje.",
    keywords: ["testament", "isključenje", "nedostojnost", "čl. 61 ZON", "Gž"],
    related_articles: ["čl. 4", "čl. 61–63", "čl. 85 ZON"],
    headnote:
      "Isključenje zahteva izričitu testamentarnu volju; nedostojnost je zaseban institut sa drugim posledicama.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 142/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li nedostatak svojeručnog potpisa zaveštaoca na testamentu pred svedocima vodi apsolutnoj ništavosti?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i utvrdio ništavost zbog nedostatka svojeručnog potpisa zaveštaoca; faksimil ili otisak prsta ne nadoknađuju oblik.",
    reasoning:
      "Primena čl. 85 i 155–157 starog Zakona o nasleđivanju; ukinut deo izreke o poništaju kao rušljivosti jer je primarni zahtev za ništavost usvojen (čl. 197 st. 2 ZPP).",
    keywords: ["testament pred svedocima", "potpis", "ništavost", "forma"],
    related_articles: ["čl. 85 ZON", "čl. 197 st. 2 ZPP"],
    headnote:
      "Formalni nedostatak potpisa zaveštaoca čini testament apsolutno ništavim, ne samo rušljivim.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4561/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li nužni naslednik može uspešno osporiti isključenje iz nasleđa testamentom ako u ostaviini nije pobijao valjanost isključenja?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio da je ostavilac valjano isključio sina iz nasleđa zbog težeg ogrešenja o moralne obaveze, u formi zaveštanja pred svedocima.",
    reasoning:
      "Pasivnost nužnog naslednika u ostavinskom postupku i odsustvo tužbe za neosnovanost isključenja omogućavaju primenu čl. 63 ZON uz formalno ispravno zaveštanje po čl. 85 st. 1 ZON.",
    keywords: ["isključenje iz nasleđa", "nužni deo", "testament pred svedocima", "čl. 63 ZON"],
    related_articles: ["čl. 61–63", "čl. 85 st. 1 ZON"],
    headnote:
      "Isključenje mora biti osporeno blagovremenim prigovorom u ostavini ili parnicom, ne naknadno izjednačavanjem sa nedostojnošću.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3943/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li je dovoljna izjava zaveštaoca da testament u celini odgovara njegovoj volji posle čitanja, umesto doslovnog navoda da je pismeno pročitao?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio punovažnost pismenog zaveštanja pred svedocima: zaveštalac je pročitao, potpisao i izjavio da testament odgovara volji, što zadovoljava čl. 85 st. 1 ZON.",
    reasoning:
      "Priznanje zaveštanja za svoje i potpis nakon čitanja ispunjavaju strogu formalnost; rušljivost po čl. 168 ZON nije utvrđena.",
    keywords: ["testament pred svedocima", "forma", "čl. 85 ZON", "izjava volje"],
    related_articles: ["čl. 85 st. 1", "čl. 164", "čl. 168 ZON"],
    headnote:
      "Izjava da tekst odgovara poslednjoj volji ekvivalentna je zakonski traženoj potvrdi sadržaja posle čitanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4360/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li saglasni iskazi testamentalnih svedoka mogu prevagnuti nad protivrečnim nalazima veštaka grafologa o autentičnosti potpisa?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i usvojio tužbeni zahtev: testament iz 1994. je autentičan i punovažan; prednost imaju neposredna saznanja svedoka nad spekulacijama veštaka o varijacijama potpisa kod starice.",
    reasoning:
      "Primena čl. 64 ZON (istorijski) i čl. 20 st. 1 Zakona o osnovama svojinskopravnih odnosa; tužena je dužna da prizna svojinu i vrati stan.",
    keywords: ["autentičnost potpisa", "testament", "svedoci", "grafologija"],
    related_articles: ["čl. 64 ZON (istorijski)", "čl. 20 st. 1 ZOSVO"],
    headnote:
      "Godine života i različite podloge pištanja mogu objasniti odstupanja potpisa bez zaključka o falsifikatu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3871/2023",
    legal_area: "labor",
    legal_question:
      "Da li odbijanje alkotestiranja na radu predstavlja povredu radne discipline opravdavajuću otkaz?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio zakonitost otkaza: čl. 179 st. 3 tačka 8 Zakona o radu u vezi sa pravilnikom o alkotestiranju.",
    reasoning:
      "Zaposleni je u prostorijama poslodavca i pod režimom radne discipline; odbijanje testiranja po pravilniku je nepoštovanje discipline.",
    keywords: ["otkaz", "alkotestiranje", "radna disciplina", "Zakon o radu"],
    related_articles: ["čl. 179 st. 3 ZR"],
    headnote:
      "Pravilnik poslodavca o obaveznom alkotestu može biti otkazni osnov ako je srazmeran i poznat zaposlenom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 10009/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li je pismeno zaveštanje pred svedocima ništavo ako zaveštalac nije lično pročitao unapred sačinjen tekst i nije izjavio da ga je pročitao u smislu čl. 85 st. 1 ZON?",
    court_position:
      "Vrhovni sud je odbio reviziju i potvrdio poništaj zaveštanja jer nisu ispunjeni formalni uslovi: nije dokazano da je zaveštalac lično pročitao testament niti je data obavezna izjava o čitanju i poslednjoj volji.",
    reasoning:
      "Primena čl. 62 st. 1, 85 st. 1, 164, 168 i 170 ZON; eventualni zahtev za nužni deo otpada kada je primarni zahtev za poništaj usvojen (čl. 197 st. 2 ZPP).",
    keywords: ["testament pred svedocima", "forma", "poništanje", "čl. 85 ZON"],
    related_articles: ["čl. 62 st. 1", "čl. 85 st. 1", "čl. 168 ZON", "čl. 197 st. 2 ZPP"],
    headnote:
      "Čitanje od strane svedoka umesto zaveštaoca ne zamenjuje lično čitanje i izjavu propisanu zakonom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4438/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilac može uspešno osporiti testament pred svedocima zbog navodne nepodobnosti svedoka kada pisan dokument i iskazi potvrđuju formu?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: zaveštanje je sačinjeno u skladu sa čl. 85 ZON; svedok je potvrdio pripremu teksta i proceduru potpisivanja, a zaveštalac je pročitao i svojeručno potpisao pred svedocima.",
    reasoning:
      "Protivrečnost žalbe u odnosu na iskaz svedoka V. N. nije osnovana; formalni lanac čitanja, izjave i potpisa je utvrđen.",
    keywords: ["testament pred svedocima", "svedoci", "forma", "Gž"],
    related_articles: ["čl. 85 ZON"],
    headnote:
      "Pisani trag na testamentu i usklađeni iskazi svedoka jači su od apstraktnih prigovora o broju prisutnih pri potpisivanju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2083/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li je svojeručno zaveštanje punovažno ako tužilja osporava testamentsku sposobnost starice zbog bolesti?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za poništaj: nalaz veštaka i iskazi svedoka potvrđuju da je zaveštalja bila sposobna za rasuđivanje u trenutku sastavljanja zaveštanja.",
    reasoning:
      "Dugogodišnje praćenje klijenta advokatom, samostalan dolazak u kancelariju i promene volje u vreme smrti sina ne ukazuju na nesposobnost; veštačenje nije dalo pouzdan osnov za poništaj.",
    keywords: ["svojeručni testament", "testamentarna sposobnost", "veštačenje", "ZON"],
    related_articles: ["čl. 166 ZON"],
    headnote:
      "Svakodnevna komunikacija i politički komentari starice nisu dokaz poremećaja volje već očuvane rasuđujuće sposobnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3524/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li parnica koja traje deset godina povredi pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku zbog neefikasnog postupanja prvostepenog suda, uključujući trogodišnji zastoj.",
    reasoning:
      "Kumulacija ročišta i odlaganja bez pravdanog razloga; meritum o testamentu i izdržavanju ostaje pred redovnim sudovima.",
    keywords: ["ustavna žalba", "razuman rok", "parnica", "neefikasnost suda"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote:
      "Trogodišnje nečinjenje prvostepenog suda može samostalno opravdati ustavnu žalbu na dužinu postupka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1802/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li su testament, ugovor o poklonu i punomoćje ništavi ako tužilja tvrdi da je testatorka bila nesposobna za rasuđivanje?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilaca i potvrdio punovažnost pravnih poslova: u trenutku sastavljanja testatorka je bila poslovno sposobna i delovala slobodnom voljom.",
    reasoning:
      "Nalaz lekara u prilogu testamenta i saglasni iskazi svedoka potvrđuju čitanje, izjavu o poslednjoj volji i potpis u tri primerka; formalni lanac je neprekinut.",
    keywords: ["testament", "poklon", "poslovna sposobnost", "ZON"],
    related_articles: ["čl. 85 ZON", "ZOO"],
    headnote:
      "Medicinska potvrda u istom danu kao testament jača pretpostavku rasuđujuće sposobnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9380/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li imovinski spor koji traje preko dvanaest godina povredi pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu u delu o razumnom roku i utvrdio povredu; deo žalbe usmeren na meritum presuda je odbačen.",
    reasoning:
      "Predmet obuhvata spor o ništavosti ugovora o doživotnom izdržavanju i testamentu sa složenom procesnom istorijom od 2000. godine; trajanje prelazi ustavni standard.",
    keywords: ["ustavna žalba", "razuman rok", "testament", "izdržavanje"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote:
      "Ustavni sud razdvaja žalbu na dužinu postupka od revizije merita običnih sudova.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2582/2023",
    legal_area: "labor",
    legal_question:
      "Da li drugostepeni sud može izmeniti činjenično stanje bez rasprave oslanjajući se na novu procenu iskaza?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo drugostepenu presudu zbog bitne povrede postupka: izmena činjeničnog stanja bez održavanja rasprave nije dozvoljena.",
    reasoning:
      "Prvostepeni sud dao prednost jednom merenju alkohola; drugostepeni sud izneo suprotan zaključak bez ponovnog saslušavanja u suprotnosti sa čl. 354 ZPP.",
    keywords: ["bitna povreda postupka", "alkotestiranje", "otkaz", "ZPP"],
    related_articles: ["čl. 354 ZPP", "čl. 179 ZR"],
    headnote:
      "Apelacija ne sme zameniti raspravu kada se menja merodavno činjenično stanje izvedeno neposredno u prvom stepenu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 258/2024",
    legal_area: "family",
    legal_question:
      "Da li psihološko testiranje isključuje majku od samostalnog roditeljskog prava zbog crte ličnosti?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je dete povereno majci, uređeno viđanje sa ocem i iznos izdržavanja; žalba oca je odbijena.",
    reasoning:
      "Veštak je pojasnio da određene crte ličnosti same po sebi ne ukazuju na nesposobnost za roditeljstvo; mišljenje deteta da želi kod majke smatra se autentičnim.",
    keywords: ["poverenje deteta", "izdržavanje", "veštačenje", "porodično pravo"],
    related_articles: ["Porodični zakon"],
    headnote:
      "Jedna crta ličnosti nije parametar koji samostalno diskvalifikuje roditelja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 343/2007",
    legal_area: "inheritance",
    legal_question:
      "Da li pravnosnažno rešenje o nasleđivanju po zakonu sprečava parnicu za svojinu na osnovu naknadno pronađenog testamenta?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju: testament je jači osnov od zakona; ako naslednik nije znao za testament u ostaviini, može pokrenuti parnicu za utvrđenje svojine.",
    reasoning:
      "Rešenje o nasleđivanju je deklaratorne prirode i ne sprečava naknadno utvrđivanje prava iz punovažnog testamenta.",
    keywords: ["testament", "nasleđivanje", "svojina", "ostavinski postupak"],
    related_articles: ["ZON", "ZPP"],
    headnote:
      "Naknadno pronađen testament može ispraviti raspodelu iako je ostavina već raspravljena po zakonu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6193/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li grafoskopsko veštačenje može utvrditi falsifikat potpisa na testamentu pred svedocima?",
    court_position:
      "Apelacioni sud je potvrdio ništavost zaveštanja: veštak je utvrdio da potpis nije autentičan, što povlači ništavost po čl. 157 starog Zakona o nasleđivanju.",
    reasoning:
      "Primena čl. 85, 155–157 Zakon o nasleđivanju (istorijski); tuženi nisu predložili kontrolno veštačenje nakon odgovora veštaka na primedbe.",
    keywords: ["falsifikat", "testament pred svedocima", "grafoskopija", "ništavost"],
    related_articles: ["čl. 157 ZON (istorijski)", "čl. 85 ZON"],
    headnote:
      "Kvalitetan nalaz veštaka o neautentičnosti potpisa zatvara spor osim ako protivna strana ne izvede suprotan dokaz.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6618/2018",
    legal_area: "commercial",
    legal_question:
      "Da li je davanje jemstva za povezano lice u stanju prezaduženosti stečajno pobijanje po čl. 123 Zakona o stečaju?",
    court_position:
      "Privredni apelacioni sud je potvrdio presudu kojom je usvojen protivtužbeni zahtev za pobijanje kreditnog ugovora i odbijen tužbeni za utvrđenje potraživanja.",
    reasoning:
      "Saugovarač se pretpostavlja da zna za štetnu nameru dužnika kada je znao za prezaduženost; tužilac je mogao zatražiti dodatne podatke o kreditnoj sposobnosti.",
    keywords: ["stečaj", "pobijanje pravnih radnji", "jemstvo", "Zakon o stečaju"],
    related_articles: ["čl. 123 Zakona o stečaju"],
    headnote:
      "Banka ne može se pozivati na nepotpun kreditni izveštaj ako nije iskoristila mogućnost dublje provere klijenta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 25833/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li nepodobost bračnog druga kao svedoka čini testament apsolutno ništavim?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da je tužbeni zahtev za ništavost neosnovan: zaveštanje postoji, ali je rušljivo zbog relativne nepodobnosti svedoka, ne ništavo.",
    reasoning:
      "Primena čl. 155–157 u odnosu na apsolutnu ništavost isključuje se kada nema povrede javnog poretka, maloletstva ili falsifikata; čl. 113 i 168 ZON uređuju rušljivost.",
    keywords: ["testament pred svedocima", "svedok", "rušljivost", "ništavost"],
    related_articles: ["čl. 113 st. 1", "čl. 155–168 ZON"],
    headnote:
      "Supruga kao nedopušten svedok vodi poništaju po tužbi, ne apsolutnoj ništavosti po službenoj dužnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 54/2021",
    legal_area: "family",
    legal_question:
      "Da li članovi porodične zajednice stiču susvojinu na kući dograđenoj zajedničkim sredstvima uprkos testamentu majke na korist trećeg lica?",
    court_position:
      "Apelacioni sud je, posle ukidanja i nove rasprave, utvrdio da tužioci drže susvojinu sa udelom od po 37,5% na porodičnoj kući zbog zajedničkog ulaganja u dogradnju i adaptaciju.",
    reasoning:
      "Dogovor i rad u zajedničkom interesu prevagnuli su nad formalnim testamentom koji je bio deo šireg porodičnog aranžmana koji nije overen u celini.",
    keywords: ["susvojina", "porodična zajednica", "testament", "dogradnja"],
    related_articles: ["Zakon o porodičnim odnosima", "Zakon o nasleđivanju"],
    headnote:
      "Stvarno učešće u gradnji na porodičnoj nepokretnosti može stvoriti susvojinu uprkos testamentarnom rasporedu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 21637/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li izjava zaveštaoca o čitanju i poslednjoj volji mora biti uneta u sam tekst testamenta pred svedocima?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presudu Apelacionog suda kojom je poništeno zaveštanje: izjave o čitanju i volji mogu se utvrditi u postupku i ne moraju biti doslovno upisane u pismo.",
    reasoning:
      "Formalni uslovi čl. 85 ZON ne zahtevaju određenu štampu rečenice u tekstu ako je postupak sastavljanja i svedočenja autentično utvrđen; sporna je i ocena falsifikata.",
    keywords: ["testament pred svedocima", "forma", "čl. 85 ZON", "revizija"],
    related_articles: ["čl. 85 ZON", "ZPP"],
    headnote:
      "Kasacioni sud vraća stvar kada apelacija formalistički poništava volju zbog nedostatka određene rečenice u tekstu.",
    outcome: "remanded",
  }`

let s = fs.readFileSync(filePath, "utf8")
if (!s.includes(marker)) {
  console.error("Marker not found — file may already contain batch 3.")
  process.exit(1)
}
s = s.replace(marker, `    outcome: "procedural",
  },${batch3}
]`)
fs.writeFileSync(filePath, s)
console.log("Batch 3 spliced into case-law-inheritance-serbia-2.ts")
