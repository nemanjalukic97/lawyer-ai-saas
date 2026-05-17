// scripts/case-law-labor-serbia-3.ts
// Serbian court decisions on redundancy dismissals (tehnološki višak) —
// criteria for identifying surplus employees, procedural requirements,
// program for resolving surplus, abuse-of-rights doctrine.

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_LABOR_SERBIA_3: CaseLawInput[] = [
  // ── BATCH 1 (cases 1–32) ────────────────────────────────────────────────

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "nepoznat/tehnoloski-visak-1",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz ugovora o radu zbog tehnološkog viška zakonit kada ocenjivanje tužioca nije izvršio njegov neposredni rukovodilac i kada su kriterijumi primenjeni selektivno, dajući mu nižu ocenu zbog zdravstvenih teškoća?",
    court_position:
      "Vrhovni kasacioni sud ukinuo je nižestepene presude i vratio predmet prvostepenom sudu na ponovno suđenje. Tuženi nije pravilno primenio kriterijume iz Programa rešavanja viška zaposlenih jer ocenjivanje nije obavio neposredni rukovodilac tužioca, a zdravstvene teškoće ne mogu biti osnov za nižu ocenu.",
    reasoning:
      "Ocenjivanje nije izvršilo lice koje je bilo neposredni rukovodilac tužiocu u relevantnom periodu. Tužilac je dobio nižu ocenu od ostalih zaposlenih jer je imao zdravstvenih teškoća, što nije pravilna primena kriterijuma. Prema čl. 155. st. 1. ZOR, program rešavanja viška zaposlenih sadrži kriterijume za utvrđivanje viška, a poslodavac ih primenjuje individualnim vrednovanjem i međusobnim upoređivanjem svih zaposlenih pod istim uslovima. Revizijom tuženog osnovano se ukazuje da je zbog pogrešne primene materijalnog prava činjenično stanje ostalo nepotpuno utvrđeno.",
    keywords: [
      "tehnološki višak",
      "kriterijumi za višak",
      "neposredni rukovodilac",
      "ocenjivanje zaposlenih",
      "zdravstvene teškoće",
      "program rešavanja viška",
    ],
    related_articles: ["čl. 155 ZOR", "čl. 179 stav 5 tačka 1 ZOR"],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 788/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz ugovora o radu zbog tehnološkog viška zakonit kada je otpremnina isplaćena posle prestanka radnog odnosa, ali u zakonskom roku, i da li komisija u kojoj su sindikalni predstavnici koje je nominovao poslodavac čini otkaz nezakonitim?",
    court_position:
      "Vrhovni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Isplata otpremnine u zakonskom roku — i ako posle prestanka radnog odnosa — ne čini otkaz nezakonitim, a kriterijumi iz posebnog kolektivnog ugovora su pravilno primenjeni.",
    reasoning:
      "Smanjen je broj izvršilaca na radnom mestu tužilje sa 12 na 8 usled ekonomskih i organizacionih promena. Tuženi je primenio kriterijume iz posebnog kolektivnog ugovora po utvrđenom redosledu: rezultati rada (ocenjeni na osnovu obrazložene ocene neposrednog rukovodioca), zdravstveno stanje, deca na redovnom školovanju. Dopunski kriterijumi primenjuju se samo kada zaposleni ostvaruju jednake rezultate rada. Tužilja nije dovedena u neravnopravan položaj u odnosu na ostale izvršioce.",
    keywords: [
      "tehnološki višak",
      "kriterijumi",
      "posebni kolektivni ugovor",
      "otpremnina",
      "rok za isplatu",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 158 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3321/2023",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz ugovora o radu zakonit kada je smanjen broj izvršilaca na radnom mestu, ali poslodavac nije primenio jasne i proverljive kriterijume za izbor zaposlenih koji će biti proglašeni viškom, iako nije bio dužan da donese Program rešavanja viška?",
    court_position:
      "Vrhovni sud odbija reviziju poslodavca. Bez obzira na to da li je poslodavac dužan da donese Program, mora primeniti jasne, proverljive i nediskriminatorne kriterijume; otkaz bez takvih kriterijuma je nezakonit.",
    reasoning:
      "Čl. 155. ZOR propisuje sadržinu programa rešavanja viška zaposlenih. Čak i kada tuženi nije bio dužan da donese Program (manji broj viška od pragova iz čl. 153. ZOR), svi zaposleni na radnim mestima sa smanjenim brojem izvršilaca moraju biti izloženi konkurenciji primenom kriterijuma koje poslodavac sam utvrđuje. Razlozi zbog kojih baš određeni zaposleni predstavlja višak su nužni za zakonitost rešenja. Poslodavac nema diskreciono pravo da bez kriterijuma sam odluči ko je višak.",
    keywords: [
      "tehnološki višak",
      "kriterijumi za višak",
      "diskreciono pravo poslodavca",
      "program rešavanja viška",
      "zakonitost otkaza",
      "proizvoljnost",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 329/2017",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada je tužilac faktički radio na drugom radnom mestu (higijeničar) zbog zdravstvenog stanja, ali su kriterijumi primenjeni na njegovo formalno radno mesto?",
    court_position:
      "Apelacioni sud potvrđuje poništaj otkaza. Poslodavac mora primeniti kriterijume za radno mesto na kome je zaposleni faktički radio u trenutku utvrđivanja viška, a ne za formalno radno mesto.",
    reasoning:
      "Prvostepeni sud pravilno je utvrdio da je tužilac u trenutku prestanka radnog odnosa faktički bio raspoređen na poslove higijeničara zbog pogoršanog zdravstvenog stanja, te da je poslodavac bio dužan da utvrdi uslove za proglašenje viška i primeni kriterijume na tom radnom mestu. Kada postoji više izvršilaca na istom radnom mestu, moraju se primeniti kriterijumi (osnovni — rezultati rada, dopunski — broj članova porodičnog domaćinstva koji zarađuju, dužina radnog staža, itd.), kako bi se izbegla proizvoljnost.",
    keywords: [
      "tehnološki višak",
      "faktičko radno mesto",
      "zdravstveno stanje zaposlenog",
      "kriterijumi za višak",
      "higijeničar",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3101/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada rešenje ne navodi konkretne kriterijume na osnovu kojih je tužilja proglašena viškom od više izvršilaca na istom radnom mestu?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Rešenje mora sadržati konkretan razlog zašto je baš tužilja proglašena viškom, a ne drugi izvršioci; izostanak kriterijuma čini otkaz nezakonitim.",
    reasoning:
      "Kada više zaposlenih obavlja iste poslove, smanjenje broja izvršilaca mora biti zasnovano na kriterijumima koji isključuju svaku proizvoljnost, voluntarizam i diskriminaciju. Poslodavac nema diskreciono pravo da sam odluči ko je višak. Tek primenom kriterijuma, pa potom utvrđivanjem nemogućnosti raspoređivanja na odgovarajuća radna mesta, može se zakonito doneti rešenje o prestanku radnog odnosa. Na osnovu čl. 191. st. 1, 2. i 9. ZOR, tuženi je obavezan da tužilju vrati na rad i isplati naknadu za period u kome nije radila.",
    keywords: [
      "tehnološki višak",
      "kriterijumi za višak",
      "diskreciono pravo",
      "konkretizacija razloga otkaza",
      "vraćanje na rad",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3994/2019",
    legal_area: "labor",
    legal_question:
      "Da li je poslodavac koji nije dužan da donese Program rešavanja viška zaposlenih svejedno obavezan da primeni objektivne kriterijume pri određivanju ko je višak kada se smanjuje broj izvršilaca na određenom radnom mestu?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju poslodavca. Čak i bez obaveze donošenja Programa, poslodavac mora primeniti objektivne kriterijume koji isključuju proizvoljnost i diskriminaciju; bez toga, otkaz je nezakonit.",
    reasoning:
      "Pravilnikom o organizaciji i sistematizaciji poslova kod tuženog smanjen je broj izvršilaca na konkretnom radnom mestu sa 8 na 4. Bez obzira na obavezu donošenja Programa, u slučaju smanjenja broja izvršilaca moraju se primeniti kriterijumi kako bi se utvrdio ko je višak — svako drugačije postupanje vodi otkazu po diskrecionom ovlašćenju, što je nezakonito. Posledica nezakonite odluke je vraćanje tužilje na rad prema čl. 191. ZOR.",
    keywords: [
      "tehnološki višak",
      "obaveza primene kriterijuma",
      "diskreciono pravo",
      "smanjenje broja izvršilaca",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1825/2020",
    legal_area: "labor",
    legal_question:
      "Kada je otkaz zbog tehnološkog viška zakonit — kada se ukida celo radno mesto (zakonit) ili kada se samo smanjuje broj izvršilaca bez primene kriterijuma (nezakonit)?",
    court_position:
      "Vrhovni kasacioni sud odbija obe revizije. Otkaz je zakonit samo u slučaju potpunog ukidanja radnog mesta (bez potrebe za kriterijumima), a nezakonit u slučaju smanjenja broja izvršilaca bez primene objektivnih kriterijuma.",
    reasoning:
      "Tužiocu BB otkaz je dat zbog smanjenja broja izvršilaca na radnom mestu, a ne ukidanja radnog mesta — u toj situaciji tuženi je morao primeniti kriterijume. Program rešavanja viška zaposlenih utvrđuje višak od 157 zaposlenih, ali se preduzeće nastavlja sa radom sa manjim brojem zaposlenih i poslovi nisu ukinuti. Bez primene kriterijuma za izbor koji su od više izvršilaca višak, otkaz je nezakonit i tužilac ima pravo na vraćanje na rad prema čl. 191. st. 1. ZOR.",
    keywords: [
      "tehnološki višak",
      "ukidanje radnog mesta",
      "smanjenje broja izvršilaca",
      "kriterijumi za višak",
      "vraćanje na rad",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 stav 1 ZOR",
    ],
    outcome: "partially",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 4183/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada rešenje o otkazu ne sadrži podatke o sprovedenom postupku bodovanja zaposlenih niti o periodu ocenjivanja, uprkos tome što Program propisuje kriterijume?",
    court_position:
      "Vrhovni kasacioni sud potvrđuje nižestepene presude o poništaju otkaza. Rešenje mora sadržati obrazloženje o tome kako su u odnosu na tužioca primenjeni kriterijumi iz Programa — bez bodovnih podataka, otkaz je nezakonit.",
    reasoning:
      "Pobijano rešenje ne sadrži obrazloženje o tome kako su u odnosu na tužioca primenjeni kriterijumi predviđeni Programom za utvrđivanje viška zaposlenih — nema podataka o sprovedenom postupku bodovanja zaposlenih na radnom mestu na koje je tužilac bio raspoređen niti perioda u kome su zaposleni ocenjivani. Otkaz po diskrecionom ovlašćenju bez navođenja razloga za primenu kriterijuma koji su primenjivani čini rešenje nezakonitim. Poslodavac nema diskreciono pravo da bez kriterijuma sam odluči ko je višak od više izvršilaca na istom radnom mestu.",
    keywords: [
      "tehnološki višak",
      "obrazloženje rešenja o otkazu",
      "bodovanje zaposlenih",
      "kriterijumi",
      "diskreciono pravo",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2470/2022",
    legal_area: "labor",
    legal_question:
      "Da li je Program rešavanja viška zaposlenih zakonit kada ga je doneo nenadležan organ (Nadzorni odbor) i kada ne sadrži kriterijume za utvrđivanje viška ni druge obavezne elemente iz čl. 155. ZOR?",
    court_position:
      "Vrhovni sud odbija reviziju poslodavca. Program koji nije doneo nadležan organ i ne sadrži sve obavezne elemente iz čl. 155. ZOR je nezakonit, a otkaz zasnovan na takvom programu je nezakonit.",
    reasoning:
      "Program ne sadrži kriterijume za utvrđivanje viška zaposlenih ni druge elemente propisane čl. 155. st. 1. ZOR: ne sadrži kvalifikacionu strukturu, godine starosti i staža osiguranja zaposlenih koji su višak, mere za zapošljavanje, niti konkretne radnje preduzetih mera zapošljavanja. Tuženi nije mogao ovlastiti Izvršni odbor i Generalnog direktora da naknadno utvrde spisak zaposlenih koji su višak, jer je to protivno čl. 155. ZOR. Rešenje o otkazu ne sadrži ni razloge o vrednovanju rada tužioca u odnosu na ostale zaposlene ni razloge o merama zapošljavanja (čl. 185. st. 1. ZOR).",
    keywords: [
      "program rešavanja viška zaposlenih",
      "nenadležan organ",
      "kriterijumi za višak",
      "sadržina programa",
      "mere zapošljavanja",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 185 ZOR",
      "čl. 191 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1119/2014",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada komisija za utvrđivanje viška nije pribavila mišljenje neposrednog rukovodioca tužioca o rezultatima rada, koje je propisano kao osnovni kriterijum?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Neprибavljanje mišljenja neposrednog rukovodioca o rezultatima rada čini postupak utvrđivanja viška zaposlenih nezakonitim.",
    reasoning:
      "Komisija za utvrđivanje viška zaposlenih, zasnovana na Programu od 21.06.2010. godine, nije tražila ni dobila — ni usmeno ni pismeno — mišljenje neposrednog ili drugog rukovodioca tužioca o njegovim rezultatima rada. Prema čl. 155. ZOR, Program mora sadržati kriterijume za utvrđivanje viška. Nižestepeni sudovi su pravilno primenili čl. 179. tač. 9. u vezi sa čl. 188. ZOR, zaključujući da je tužiocu nezakonito prestao radni odnos.",
    keywords: [
      "tehnološki višak",
      "mišljenje neposrednog rukovodioca",
      "rezultati rada",
      "komisija za višak",
      "kriterijumi",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 tačka 9 ZOR",
      "čl. 188 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1988/2023",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada rešenje ne sadrži obrazloženje o primenjenoj proceduri bodovanja, a zaposleni nisu bili upoznati sa kriterijumima i periodom ocenjivanja?",
    court_position:
      "Vrhovni sud odbija reviziju tuženog. Netransparentan postupak utvrđivanja viška, bez obrazloženja o bodovanju i bez upoznavanja zaposlenih sa kriterijumima, čini rešenje o otkazu nezakonitim.",
    reasoning:
      "Pobijana rešenja ne sadrže obrazloženje o tome kako su primenjeni kriterijumi iz Programa za utvrđivanje viška u odnosu na svakog tužioca — nema podataka o sprovedenom bodovanju ni periodu ocenjivanja. Otkaz po diskrecionom ovlašćenju bez navođenja kriterijuma koji su primenjivani čini rešenje nezakonitim. Svim zaposlenima mora biti jasno obrazloženo zašto je baš njima dat otkaz. Poslodavac nema diskreciono pravo da bez kriterijuma sam odluči ko je višak od više izvršilaca.",
    keywords: [
      "tehnološki višak",
      "transparentnost postupka",
      "bodovanje zaposlenih",
      "kriterijumi",
      "obrazloženje rešenja",
      "diskreciono pravo",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 137/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada je Odluka o pokretanju postupka utvrđivanja viška doneta pre stupanja na snagu novog Pravilnika o sistematizaciji, a kriterijumi nisu utvrđeni posebnom odlukom niti saopšteni svim zaposlenim?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Odluka o pokretanju postupka doneta pre stupanja na snagu novog Pravilnika o sistematizaciji čini ceo postupak utvrđivanja viška zaposlenih i rešenje o otkazu nezakonitim.",
    reasoning:
      "Novi Pravilnik o sistematizaciji stupio je na snagu 15.12.2016. (osmog dana od objavljivanja), ali je Odluka o pokretanju postupka doneta 09.12.2016. — pre toga. Tuženi nije posebnom odlukom utvrdio kriterijume za ocenu niti je zaposlene sa njima upoznao. Samo 7 od 9 proglašenih viškom je bodovano, a koleginica kojoj su pridodati tužiljini poslovi nije prolazila kroz isti postupak bodovanja. Zahtev za vraćanje na rad pravilno je rešen primenom čl. 191. st. 3. ZOR.",
    keywords: [
      "tehnološki višak",
      "stupanje na snagu pravilnika o sistematizaciji",
      "proceduralne povrede",
      "kriterijumi",
      "bodovanje",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 stav 3 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 168/2014",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada je jedini osnov za proglašenje tužilje viškom — umesto jedne od dve izvršioca na istim poslovima — lično mišljenje direktora o odbijanju određene funkcije, bez pisanih dokaza i bez primene zakonskih kriterijuma?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Subjektivno mišljenje direktora o ponašanju zaposlene nije zakonit kriterijum za određivanje viška; poslodavac nije dokazao na osnovu kojih kriterijuma je utvrđen višak zaposlenih.",
    reasoning:
      "Direktor tuženog tužilji je zamerio odbijanje funkcije vođe tima HACCP, bez pisanih dokaza o takvom ponašanju. Umesto primene kriterijuma za utvrđivanje viška, direktor se rukovodio sopstvenim mišljenjem kao jedinom merilom — a to nije kriterijum iz čl. 179. tač. 9. ZOR. Ovakvo ponašanje moglo bi biti osnov za primenu čl. 179. tač. 2. ili 3. ZOR. Teret dokazivanja na osnovu čl. 231. ZPP bio je na tuženom, koji nije dokazao primenjene kriterijume.",
    keywords: [
      "tehnološki višak",
      "kriterijumi za višak",
      "diskreciono pravo direktora",
      "teret dokazivanja",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 179 tačka 9 ZOR",
      "čl. 231 ZPP",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1133/2024",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada rešenje ne sadrži obrazloženu ocenu rezultata rada za svakog zaposlenog koji je bio u konkurenciji za proglašenje viškom, pa se ne može ispitati pravilnost odluke?",
    court_position:
      "Vrhovni sud potvrđuje nezakonitost otkaza. Bez konkretizacije kriterijuma na individualnom nivou, tužilja nije mogla biti proglašena viškom. Umesto vraćanja na rad, dosuđena je naknada štete u visini tri zarade (čl. 191. st. 7. ZOR).",
    reasoning:
      "Rešenje o prestanku radnog odnosa mora sadržati obrazloženu ocenu rezultata rada za svakog zaposlenog sa opisom svakog elementa kriterijuma po predviđenoj proceduri. Tužilja je morala biti izložena konkurenciji sa zaposlenima koji rade na istim poslovima. Teret dokazivanja o primenjenim kriterijumima bio je na tuženom (čl. 231. ZPP). Tuženi nije dokazao na osnovu kojih kriterijuma je utvrđen višak. Primenjuje se čl. 191. st. 7. ZOR — naknada tri zarade umesto vraćanja na rad.",
    keywords: [
      "tehnološki višak",
      "obrazložena ocena rezultata rada",
      "konkretizacija kriterijuma",
      "teret dokazivanja",
      "naknada umesto vraćanja na rad",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 stav 7 ZOR",
      "čl. 231 ZPP",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1191/2024",
    legal_area: "labor",
    legal_question:
      "Da li postoji zloupotreba prava kada je tužilji otkazan ugovor zbog ukidanja radnog mesta bez objašnjenja zašto je baš njeno radno mesto ukinuto, a poslodavac je ubrzo zatim na ista ili slična radna mesta zaposlio nova lica?",
    court_position:
      "Vrhovni sud poništava otkaz kao nezakonit. Zloupotreba prava postoji kada poslodavac poštuje formu instituta tehnološkog viška, ali ne i njegovu suštinu, što se pokazuje zapošljavanjem novih lica ubrzo posle otkaza.",
    reasoning:
      "Institut zabrane zloupotrebe prava (čl. 13. ZOO) supsidijarno se primenjuje u oblasti rada. Rešenje o otkazu nije sadržalo konkretni razlog zašto je baš tužilja proglašena viškom — da li je ukinuto radno mesto ili smanjen broj izvršilaca. U oba slučaja, u obrazloženju su morali biti navedeni konkretni razlozi i/ili kriterijumi. Tuženi nije tako postupio, a suprotno reviziji tuženog, čl. 191. st. 7. ZOR nije primenljiv jer nije dokazana opravdanost osnova za prestanak radnog odnosa.",
    keywords: [
      "zloupotreba prava",
      "tehnološki višak",
      "ukidanje radnog mesta",
      "obrazloženje otkaza",
      "novo zapošljavanje posle otkaza",
    ],
    related_articles: [
      "čl. 13 ZOO",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 491/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada je rešenje o otkazu doneto pre stupanja na snagu Izmena i dopuna Pravilnika o organizaciji i sistematizaciji poslova koje su opravdavale smanjenje broja izvršilaca?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Rešenje o otkazu doneto pre stupanja na snagu akta koji opravdava smanjenje broja izvršilaca je nezakonito — ne postoji pravni osnov za primenu otkaznog razloga.",
    reasoning:
      "Izmene i dopune Pravilnika o organizaciji i sistematizaciji poslova stupio je na snagu osmog dana od objavljivanja na oglasnoj tabli, dakle po isteku zakonskog roka, ali rešenje o otkazu doneto je pre toga. Bez valjanog osnova u novom pravilniku, nisu ispunjeni uslovi iz čl. 179. st. 5. tač. 1. ZOR. Ocenjivanje rada tužioca je sprovedno, ali je cela procedura poništena zbog proceduralnog propusta redosleda radnji.",
    keywords: [
      "tehnološki višak",
      "stupanje na snagu pravilnika o sistematizaciji",
      "redosled radnji u postupku",
      "proceduralne povrede",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 196 stav 4 Ustava RS",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 324/2025",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada rešenje ne navodi konkretne kriterijume koji su primenjeni pri odlučivanju ko je od više izvršilaca višak, uz poziv na zabranu zloupotrebe prava?",
    court_position:
      "Vrhovni sud odbija reviziju tužene i potvrđuje nižestepene presude kojima je poništen otkaz. Zabrana zloupotrebe prava zahteva da rešenje o otkazu sadrži konkretne primenjene kriterijume.",
    reasoning:
      "Institut zabrane zloupotrebe prava (čl. 13. ZOO) supsidijarno se primenjuje u oblasti rada. Zloupotreba postoji kada se poštuje forma, ali ne i suština razloga za otkaz. Tužena je bila dužna da u obrazloženju rešenja navede konkretne razloge i kriterijume koji su primenjivani. Sud ne ceni opravdanost organizacionih, tehnoloških i ekonomskih mera, niti odluku o potrebnom broju radnika na nekom radnom mestu.",
    keywords: [
      "tehnološki višak",
      "zloupotreba prava",
      "kriterijumi za višak",
      "konkretizacija razloga otkaza",
      "diskreciono pravo poslodavca",
    ],
    related_articles: [
      "čl. 13 ZOO",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2543/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada tuženi nije dokazao da je smanjio broj izvršilaca niti da je izmenio akt o sistematizaciji, a istovremeno je u istom periodu primio isti broj novih zaposlenih na iste ili slične poslove?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Zakonski uslov za proglašenje viška je prethodno utvrđivanje smanjenja broja izvršilaca ili ukidanja radnih mesta, što tuženi nije dokazao; rešenje o otkazu je ništavo.",
    reasoning:
      "Tuženi je proglasio 25 zaposlenih viškom, ali nije dokazao da je smanjio broj izvršilaca na radnom mestu tužilje niti da je izmenio akt o sistematizaciji. U periodu od 14.01. do 24.06.2019. primljeno je novih 25 zaposlenih, a nije dokazano da su raspoređeni na radna mesta različita od onih viška. Odluka o utvrđivanju viška je ništava jer nije ispunjen zakonski uslov — prethodno utvrđivanje da je zbog smanjenog obima posla neophodno ukinuti ili smanjiti broj izvršilaca.",
    keywords: [
      "tehnološki višak",
      "izmena akta o sistematizaciji",
      "smanjenje broja izvršilaca",
      "novo zapošljavanje posle otkaza",
      "ništavost rešenja",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2956/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada rešenje ne razlikuje da li je radno mesto ukinuto ili je smanjen broj izvršilaca, te ne sadrži ni obrazloženje o nemogućnosti raspoređivanja ni kriterijume za izbor ko je višak?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Rešenje mora sadržati jasnu pravnu osnovu (ukidanje radnog mesta ili smanjenje broja izvršilaca) i — u slučaju smanjenja — konkretne kriterijume za određivanje ko je višak.",
    reasoning:
      "Institut zabrane zloupotrebe prava (čl. 13. ZOO) supsidijarno se primenjuje u oblasti rada. Kod ukidanja radnog mesta, uslov je nemogućnost raspoređivanja na odgovarajuće poslove. Kod smanjenja broja izvršilaca, neophodna je primena objektivnih kriterijuma. Tuženi ni u jednom slučaju nije ispravno postupio — rešenje ne sadrži ni razlog ni kriterijume, a otkaz je nezakonit.",
    keywords: [
      "tehnološki višak",
      "ukidanje radnog mesta",
      "smanjenje broja izvršilaca",
      "zloupotreba prava",
      "kriterijumi za višak",
    ],
    related_articles: [
      "čl. 13 ZOO",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3759/2023",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog tehnološkog viška zakonit kada rešenje o otkazu ne sadrži jasne kriterijume i razloge zašto je baš tužilac proglašen viškom u odnosu na ostale regionalne stručne saradnike?",
    court_position:
      "Vrhovni sud odbija reviziju tuženog. Rešenje o otkazu mora sadržati jasno obrazloženje razloga zbog kojih je upravo tužiocu otkazan ugovor; bez toga, otkaz je nezakonit čak i kada su organizacione promene opravdane.",
    reasoning:
      "Institut zabrane zloupotrebe prava (čl. 13. ZOO) supsidijarno se primenjuje u oblasti rada i štiti zaposlenog. Tuženi je bio dužan da navede zašto je smanjen broj izvršilaca na radnom mestu regionalnog stručnog saradnika i koji su kriterijumi primenjeni pri odabiru ko je od više zaposlenih na tom radnom mestu višak. Sud ne ceni celishodnost organizacionih mera, ali rešenje mora biti zakonito obrazloženo.",
    keywords: [
      "tehnološki višak",
      "zloupotreba prava",
      "obrazloženje rešenja",
      "kriterijumi za višak",
      "regionalni stručni saradnik",
    ],
    related_articles: [
      "čl. 13 ZOO",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 174/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je ocenjivanje zaposlenih sprovedeno pre donošenja Programa rešavanja viška koji propisuje kriterijume za ocenjivanje, bez jasnog osnova u aktima poslodavca?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Ocenjivanje zaposlenih izvršeno pre donošenja Programa koji propisuje kriterijume čini postupak ocenjivanja nepravilnim i otkaz nezakonitim.",
    reasoning:
      "Kriterijumi i merila za ocenjivanje propisani su u Programu za rešavanje viška zaposlenih koji je usvojen 15.12.2016., a ocenjivanje je izvršeno 01.11.2016. — pre donošenja Programa, što postupak čini nepravilnim. Tuženi u aktima nije ustanovio kriterijume za duže odsustvovanje sa rada po osnovu bolovanja, niti je obrazložio na osnovu kojih kriterijuma je tretirao tužiočevo odsustvo sa rada kao kraće bolovanje. Čl. 153. ZOR propisuje obavezu donošenja Programa kada će u 30 dana doći do prestanka rada najmanje 30 zaposlenih na neodređeno vreme kod poslodavca sa više od 300 zaposlenih.",
    keywords: [
      "tehnološki višak",
      "redosled radnji u postupku",
      "ocenjivanje pre programa",
      "kriterijumi",
      "bolovanje",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 154 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1532/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je smanjen broj izvršilaca sa 105 na 95, ali tuženi u rešenju o otkazu nije naveo konkretne kriterijume za određivanje ko od zaposlenih je višak?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Kada se smanjuje broj izvršilaca, tuženi je dužan da u rešenju navede koji su kriterijumi primenjeni i zašto je baš tužilac proglašen viškom; bez toga, otkaz je nezakonit.",
    reasoning:
      "Pravilnikom o radu od 14.06.2018. smanjen je broj izvršilaca na radnom mestu u određenom sektoru sa 105 na 95. Tuženi u rešenju o otkazu nije naveo koji su konkretni razlozi zbog kojih je tužilac proglašen viškom, niti koji su kriterijumi primenjeni. Tek posle utvrđivanja viška primenom kriterijuma i potvrđivanja nemogućnosti raspoređivanja na odgovarajuće radno mesto, može se zakonito doneti rešenje o prestanku radnog odnosa. Bez kriterijuma, rešenje je nezakonito.",
    keywords: [
      "tehnološki višak",
      "smanjenje broja izvršilaca",
      "kriterijumi za višak",
      "obrazloženje rešenja",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 767/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada rešenje ne sadrži obrazložene kriterijume na osnovu kojih je tužilja proglašena viškom, umesto jedne od tri zaposlene u finansijsko-računovodstvenoj službi?",
    court_position:
      "Vrhovni sud odbija reviziju tuženog. Otkaz bez navođenja kriterijuma koji su primenjeni predstavlja otkaz po diskrecionom ovlašćenju poslodavca, što je nezakonito. Tuženi je dužan da vrati tužilju na rad.",
    reasoning:
      "Tužilji je otkazan ugovor prema čl. 158, 159. i 179. st. 1. tač. 5. ZOR, ali kriterijumi koji su primenjivani u postupku koji je prethodio donošenju rešenja nisu navedeni u obrazloženju. U finansijsko-računovodstvenoj službi pored tužilje bile su još dve zaposlene — sa svima je trebalo primeniti kriterijume. Bez kriterijuma, otkaz je nezakonit i tuženi je dužan da vrati tužilju na rad prema čl. 191. st. 1. ZOR.",
    keywords: [
      "tehnološki višak",
      "kriterijumi za višak",
      "diskreciono pravo",
      "finansijsko-računovodstvena služba",
      "vraćanje na rad",
    ],
    related_articles: [
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 stav 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1004/2017",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je tužilac proglašen viškom na formalnom radnom mestu koje godinama nije faktički obavljao, a na faktičkim poslovima u kojima je bilo više izvršilaca nije sprovedena procedura sa kriterijumima?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Proglašenje viška na formalnom radnom mestu koje zaposleni godinama nije obavljao, umesto na faktičkim poslovima, povreda je procedure utvrđivanja viška zaposlenih.",
    reasoning:
      "Kada se određeni poslovi obavljaju od strane više izvršilaca, smanjenje broja izvršilaca mora biti zasnovano na kriterijumima koji isključuju svaku proizvoljnost. Tuženi je povredeo proceduru jer je primenio kriterijume na formalno radno mesto tužioca, a ne na faktičko radno mesto na kome je obavljao poslove sa više izvršilaca. Nižestepeni sudovi su pravilno primenili materijalno pravo.",
    keywords: [
      "tehnološki višak",
      "faktičko radno mesto",
      "formalno radno mesto",
      "kriterijumi za višak",
      "proceduralne povrede",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 581/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je ocenjivanje zaposlenih sprovedeno pre donošenja Programa rešavanja viška, ali su kriterijumi primenjeni pri ocenjivanju identični onima iz naknadnog Programa?",
    court_position:
      "Vrhovni kasacioni sud preinačava nižestepene presude i odbija tužbene zahteve. Otkaz je zakonit ako je Program donet pre rešenja o otkazu, a kriterijumi primenjeni pri ocenjivanju identični su onima u Programu — redosled ocenjivanja i donošenja Programa nije od odlučujućeg značaja.",
    reasoning:
      "Program rešavanja viška zaposlenih mora biti donet pre pojedinačnih rešenja o otkazu — ali ne nužno i pre samog ocenjivanja, ako su kriterijumi identični. Rešenja o otkazu doneta su 27.05. i 23.06.2015., dakle posle Programa. Kriterijumi iz Uputstva od 06.04.2015. identični su onima iz Programa. Program kao pojedinačni pravni akt poslodavca stupa na snagu danom donošenja, a ne osmog dana od dana objavljivanja (što važi samo za opšte akte).",
    keywords: [
      "tehnološki višak",
      "redosled radnji",
      "ocenjivanje pre programa",
      "identični kriterijumi",
      "stupanje na snagu programa",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 196 stav 4 Ustava RS",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 105/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada su ekonomske promene (poslovanje sa gubicima) opravdan razlog za racionalizaciju, ali nije primenjen nijedan objektivni kriterijum za određivanje ko je od više izvršilaca na istom radnom mestu višak?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Ekonomske promene jesu opravdan razlog za racionalizaciju, ali ne opravdavaju otkaz bez primene kriterijuma za utvrđivanje ko je od više izvršilaca višak.",
    reasoning:
      "Otkaz tužilji je obrazložen tehnološkim, ekonomskim i organizacionim promenama pri čemu su primarne ekonomske promene (poslovanje sa gubicima). Međutim, rešenje ne sadrži konkretne kriterijume za određivanje ko je od više izvršilaca na istom radnom mestu višak. Poslodavac nema diskreciono pravo da bez kriterijuma sam odluči ko je višak — mora primeniti kriterijume koji isključuju svaku proizvoljnost, voluntarizam i diskriminaciju.",
    keywords: [
      "tehnološki višak",
      "ekonomske promene",
      "kriterijumi za višak",
      "diskreciono pravo",
      "više izvršilaca",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 274/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada zdravstvena ustanova nije primenila obavezujuće kriterijume reprezentativnih sindikata u oblasti zdravstva za nemedicinske radnike, već je koristila sopstvene kriterijume sa drugačijim redosledom?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Zdravstvene ustanove moraju primeniti kriterijume utvrđene od strane reprezentativnih sindikata na nivou delatnosti, koji su obavezujući za sve zdravstvene ustanove — nije dozvoljena zamena sopstvenim kriterijumima.",
    reasoning:
      "Reprezentativni sindikati na nivou RS utvrdili su kriterijume za utvrđivanje viška nemedicinskih radnika u zdravstvu: a) primanja po članu domaćinstva, b) dužina efektivnog staža, v) zdravstveno stanje, g) broj dece do 26 godina, d) uslovi rada. Tuženi je koristio sopstveni Program sa dužinom efektivnog staža kao osnovnim kriterijumom, što se razlikuje. Pravilnom primenom, tužilac bi imao 20,75 bodova i ne bi bio na poslednjem mestu rang liste.",
    keywords: [
      "tehnološki višak",
      "kriterijumi sindikata u zdravstvu",
      "nemedicinski radnici",
      "obavezujući kriterijumi",
      "rang lista",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 919/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada tuženi ima propisana merila za utvrđivanje viška u Pravilniku o radu, ali ih nije konkretizovao na individualni slučaj tužioca u poređenju sa svim ostalim izvršiocima?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju poslodavca. Propisana merila moraju biti konkretizovana u svakom pojedinačnom slučaju — zaposlenom mora biti obrazloženo zašto je baš njemu dat otkaz u poređenju sa svim ostalim izvršiocima.",
    reasoning:
      "Tuženi je u Pravilniku o radu propisao merila za utvrđivanje viška, ali u konkretnom slučaju je izostala njihova konkretizacija na individualni slučaj tužioca. Dužina radnog staža kod poslodavca je samo jedan od propisanih kriterijuma i ne može biti jedini razlog za otkaz. Izostale su činjenice o primeni svih propisanih merila i podaci o tome ko je i kako ocenio rezultate rada svih izvršilaca na istom radnom mestu.",
    keywords: [
      "tehnološki višak",
      "konkretizacija kriterijuma",
      "pravilnik o radu",
      "merila za višak",
      "dužina radnog staža",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1488/2018",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je smanjen broj izvršilaca na određenim poslovima, ali tuženi nije sproveo ocenjivanje svih zaposlenih na tim poslovima, jer je rešavao višak na osnovu odluke Upravnog odbora, a ne Programa?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Kada se smanjuje broj izvršilaca, obavezno je sprovedeno ocenjivanje svih zaposlenih na istim poslovima pre donošenja rešenja — bez obzira na to da li je donet Program.",
    reasoning:
      "Tuženi je na osnovu odluke Upravnog odbora — a ne Programa rešavanja viška zaposlenih — proglasio dva izvršioca na određenim poslovima viškom, ali nije sproveo postupak ocenjivanja svih zaposlenih koji obavljaju te poslove. U podnesku je potvrdio da tužiocu nije prestao radni odnos na osnovu Programa, već odluke Upravnog odbora — čime je potvrđeno da nije sproveo ocenjivanje. Čak i bez obaveze donošenja Programa, poslodavac nema diskreciono pravo da bez kriterijuma odluči ko je višak.",
    keywords: [
      "tehnološki višak",
      "odluka upravnog odbora",
      "ocenjivanje zaposlenih",
      "smanjenje broja izvršilaca",
      "diskreciono pravo",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 tačka 9 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev1 27/2023",
    legal_area: "labor",
    legal_question:
      "Da li se zaposleni koji su dobrovoljno otišli uz stimulativnu otpremninu ubrajaju u kvotu viška zaposlenih za svrhu obaveze donošenja Programa rešavanja viška zaposlenih prema čl. 153. ZOR?",
    court_position:
      "Vrhovni sud, u ponovnom postupku po odluci Ustavnog suda, ukida nižestepene presude i vraća predmet prvostepenom sudu. Sporna ostaje primena kriterijuma pri raspoređivanju zaposlenih na upražnjena radna mesta u okviru nove sistematizacije.",
    reasoning:
      "U konkretnom slučaju tuženi nije bio dužan da donese Program rešavanja viška zaposlenih jer se dobrovoljni odlasci ne uračunavaju u kvotu iz čl. 153. ZOR. Poslodavac je formirao komisije i doneo Pravilnik o primeni kriterijuma. Kriterijumi se primenjuju i na zaposlene čiji su poslovi ukinuti i na one kojima je smanjen broj izvršilaca. Nije dovoljno razjašnjeno da li su kriterijumi pravilno primenjeni pri raspoređivanju zaposlenih čija su radna mesta ukinuta na upražnjena radna mesta u novoj sistematizaciji.",
    keywords: [
      "tehnološki višak",
      "dobrovoljni odlazak",
      "kvota viška",
      "program rešavanja viška",
      "raspoređivanje zaposlenih",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1414/2018",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je Program rešavanja viška zaposlenih donet, ali nije sadržao spisak viška zaposlenih, a otkaz je dat pre nego što je taj spisak naknadno utvrđen?",
    court_position:
      "Vrhovni kasacioni sud preinačava drugostepenu presudu i potvrđuje prvostepenu presudu o nezakonitosti otkaza. Program mora sadržati spisak viška zaposlenih pre donošenja pojedinačnih rešenja o otkazu.",
    reasoning:
      "Prema čl. 155. st. 1. tač. 3. ZOR, Program sadrži broj, kvalifikacionu strukturu, godine starosti, staž osiguranja zaposlenih koji su višak i poslove koje obavljaju. U konkretnom slučaju Program sadrži samo naznaku da će se naknadno sačiniti konačan spisak viška. Tužena je najpre otkazala ugovor tužilji, a tek potom utvrdila spisak viška zaposlenih — što je suprotno zakonskoj proceduri. Program rešavanja viška sa svim elementima, pa i spiskom, čini deo zakonom predviđene procedure za otkaz, koja mora biti sprovedena u celosti pre donošenja otkaznog rešenja.",
    keywords: [
      "program rešavanja viška zaposlenih",
      "spisak viška zaposlenih",
      "sadržina programa",
      "redosled radnji u postupku",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 stav 1 tačka 3 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2362/2017",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada Program rešavanja viška zaposlenih nije sadržao spisak zaposlenih koji su višak — obavezan element prema čl. 155. ZOR — a konačan spisak je sačinjen nakon donošenja otkaznog rešenja?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužene i potvrđuje nezakonitost otkaza. Program koji ne sadrži spisak viška zaposlenih pre donošenja rešenja o otkazu čini otkaz nezakonitim.",
    reasoning:
      "Čl. 155. st. 1. ZOR zahteva da Program sadrži broj, kvalifikacionu strukturu, godine starosti i staž osiguranja zaposlenih koji su višak i poslove koje oni obavljaju. U konkretnom slučaju, Program od 12.01.2016. nije sadržao te podatke, već je samo konstatovano da će se naknadno sačiniti konačan spisak. Konačan spisak sačinjen je 05.02.2016., ali je otkazno rešenje doneto 25.01.2016. Program sa svim elementima mora biti u celosti sprovedena procedura pre otkaznog rešenja.",
    keywords: [
      "program rešavanja viška zaposlenih",
      "spisak viška zaposlenih",
      "sadržina programa",
      "redosled radnji",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 stav 1 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  // ── BATCH 2 (cases 33–64) ───────────────────────────────────────────────

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 620/2018",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada Program rešavanja viška zaposlenih nije sadržao konačan spisak viška, a otkaz je dat tužiocu pre nego što je taj spisak naknadno utvrđen?",
    court_position:
      "Vrhovni kasacioni sud usvaja reviziju tužioca i preinačava drugostepenu presudu, potvrđujući prvostepenu. Otkaz je nezakonit jer je dat pre utvrđivanja konačnog spiska zaposlenih koji predstavljaju višak.",
    reasoning:
      "Prema čl. 155. st. 1. tač. 3. ZOR, Program mora sadržati broj, kvalifikacionu strukturu, godine starosti i staž osiguranja zaposlenih koji su višak i poslove koje obavljaju. U konkretnom slučaju Program konstatuje samo da će se naknadno sačiniti konačan spisak viška. Tužena je tužiocu najpre otkazala ugovor o radu, a posle toga tek utvrdila spisak viška zaposlenih — što je suprotno zakonskoj proceduri za otkaz. Program rešavanja viška sa svim elementima, pa i spiskom, čini deo zakonom predviđene procedure koja mora biti u celosti sprovedena pre otkaznog rešenja.",
    keywords: [
      "program rešavanja viška zaposlenih",
      "spisak viška zaposlenih",
      "redosled radnji u postupku",
      "sadržina programa",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 stav 1 tačka 3 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1083/2015",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada komisija za utvrđivanje viška nije primenila propisane kriterijume iz Programa, već je zaposlene ocenjivala bez formalne procedure — isključivo na osnovu ličnog zapažanja rukovodioca?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužene i potvrđuje poništaj otkaza. Ocenjivanje bez pisane primene propisanih kriterijuma iz Programa, zasnovano samo na ličnom zapažanju rukovodioca, čini odluku o višku nezakonitom.",
    reasoning:
      "Direktor Regionalne kancelarije N.S. nije vršio pismeno ocenjivanje sva tri izvršioca na radnom mestu pomoćnika rukovodioca projekta, već je ocenjivala tužioca i ostale na osnovu ličnog zapažanja, bez primene posebnih kriterijuma iz Programa od 17.07.2009. Pismeno naslovljeno kao 'Spisak zaposlenih lica koja su višak' ne sadrži primenu kriterijuma. Prema čl. 153, 155. st. 1. i 179. st. 1. tač. 9. ZOR, tuženi je povredeo proceduru jer nije primenio propisane kriterijume.",
    keywords: [
      "tehnološki višak",
      "lično zapažanje rukovodioca",
      "kriterijumi za višak",
      "pisano ocenjivanje",
      "proceduralne povrede",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 stav 1 ZOR",
      "čl. 179 stav 1 tačka 9 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 719/2019",
    legal_area: "labor",
    legal_question:
      "Da li je poslodavac dužan da primeni kriterijume pri smanjenju broja izvršilaca, a ne samo kada dolazi do potpunog ukidanja radnog mesta — i koja je razlika između te dve situacije prema čl. 179. st. 5. tač. 1. ZOR?",
    court_position:
      "Vrhovni kasacioni sud ukida presudu Apelacionog suda i vraća predmet na ponovno suđenje. Razlika između ukidanja radnog mesta i smanjenja broja izvršilaca je ključna za primenu kriterijuma — sud mora utvrditi koja se situacija odigrala.",
    reasoning:
      "Čl. 179. st. 5. tač. 1. ZOR razlikuje dve situacije: (1) kada usled promena prestane potreba za obavljanjem određenog posla — ukidanje, i (2) kada dođe do smanjenja obima posla — smanjenje broja izvršilaca. U slučaju smanjenja, kriterijumi su obavezni. Drugostepeni sud je zaključio da je radno mesto ukinuto i tuženi nije dužan da primeni kriterijume, ali je taj zaključak zasnovan na pogrešnoj primeni materijalnog prava jer nije potpuno utvrđeno da li je radno mesto faktički ukinuto ili je samo smanjen broj izvršilaca.",
    keywords: [
      "tehnološki višak",
      "ukidanje radnog mesta",
      "smanjenje broja izvršilaca",
      "kriterijumi",
      "razlikovanje situacija",
    ],
    related_articles: [
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 356/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada rešenje ne sadrži obrazloženu ocenu rezultata rada za tužioca u poređenju sa ostalim zaposlenim na istim poslovima, bez koje se ne može proveriti pravilnost odluke o višku?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog i potvrđuje presudu kojom je poništeno rešenje o otkazu. Otkaz bez navođenja kriterijuma i bez razloga o nemogućnosti raspoređivanja na odgovarajuće poslove čini rešenje nezakonitim.",
    reasoning:
      "Rešenje mora sadržati obrazloženu ocenu rezultata rada za svakog zaposlenog sa opisom svakog elementa kriterijuma po predviđenoj proceduri. Tužilac je morao biti izložen konkurenciji sa ostalim zaposlenima na istim poslovima — tek tada, primenom kriterijuma, mogao je biti oglašen viškom, a potom bi se ispitalo da li je raspoređivanje na odgovarajuće radno mesto nemoguće. Diskreciono pravo poslodavca bez kriterijuma nije dozvoljena osnova za otkaz.",
    keywords: [
      "tehnološki višak",
      "obrazložena ocena rezultata rada",
      "kriterijumi za višak",
      "konkretizacija razloga",
      "diskreciono pravo",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2135/2018",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je smanjen broj izvršilaca na istom radnom mestu sa 4 na 2, ali poslodavac nije bio dužan da donese Program rešavanja viška, pa smatra da nema obavezu primene kriterijuma?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Čak i kada nije dužan da donese Program, poslodavac mora primeniti kriterijume pri smanjenju broja izvršilaca — bez toga, otkaz je nezakonit.",
    reasoning:
      "U konkretnoj situaciji radno mesto na kome je tužilac radio nije ukinuto, već je smanjen broj izvršilaca sa 4 na 2, pa je tuženi bio dužan da primeni kriterijume kako bi utvrdio ko od zaposlenih je višak. Nepostojanje obaveze donošenja Programa ne daje pravo da se bez kriterijuma diskreciono odluči ko je višak. Određivanje lica koja su višak od više izvršilaca na istom radnom mestu bez kriterijuma čini odluku nezakonitom.",
    keywords: [
      "tehnološki višak",
      "smanjenje broja izvršilaca",
      "obaveza primene kriterijuma",
      "program rešavanja viška",
      "diskreciono pravo",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 1 tačka 9 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 987/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je dat na osnovu diskrecionog ovlašćenja direktora sa paušalno navedenim kriterijumima, bez ocene rezultata rada tužioca i ostalih izvršilaca koji su bili u konkurenciji?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Paušalno navođenje kriterijuma bez konkretne ocene svih izvršilaca koji su bili u konkurenciji čini otkaz nezakonitim.",
    reasoning:
      "Otkaz tužiocu dat je na osnovu diskrecionog ovlašćenja direktora bez unapred utvrđenih kriterijuma — kriterijumi su samo paušalno navedeni. Zakon o načinu određivanja maksimalnog broja zaposlenih u javnom sektoru ne predviđa kriterijume, ali diskreciono pravo poslodavca ni tada nije dozvoljeno. Izostala je ocena rezultata rada tužioca i ostalih izvršilaca koji su zajedno bili izloženi konkurenciji, što čini otkaz nezakonitim.",
    keywords: [
      "tehnološki višak",
      "diskreciono pravo direktora",
      "paušalni kriterijumi",
      "javni sektor",
      "ocena rezultata rada",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1457/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je Program rešavanja viška donet, ali nije sadržao konačan spisak viška zaposlenih, a taj spisak je utvrđen naknadno — posle donošenja otkaznog rešenja?",
    court_position:
      "Vrhovni kasacioni sud preinačava drugostepenu presudu i potvrđuje nezakonitost otkaza. Konačan spisak viška zaposlenih mora biti sastavni deo Programa pre donošenja rešenja o otkazu.",
    reasoning:
      "Prema čl. 151. st. 1. ZOR (tada važeći), Program mora sadržati broj, kvalifikacionu strukturu, godine starosti i staž osiguranja zaposlenih koji su višak. Program od 12.01.2016. nije sadržao te podatke, niti konačan spisak. Konačan spisak sačinjen je 05.02.2016. — posle otkaznog rešenja od 02.02.2016. kojim je tužiocu otkazan ugovor. Program sa svim elementima mora biti u celosti sprovedena procedura pre donošenja otkaznog rešenja.",
    keywords: [
      "program rešavanja viška zaposlenih",
      "spisak viška zaposlenih",
      "sadržina programa",
      "redosled radnji u postupku",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 151 stav 1 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2752/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz stomatologa zakonit kada rešenje ne sadrži jasno obrazloženje primenjenih kriterijuma bodovanja, a zaposlena je majka deteta do dve godine starosti koja uživa posebnu zaštitu prema kolektivnom ugovoru?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog i potvrđuje nezakonitost otkaza. Rešenje ne sadrži jasne razloge o primenjenoj proceduri bodovanja, a tužilja kao majka deteta do dve godine starosti uživa posebnu zaštitu prema kolektivnom ugovoru.",
    reasoning:
      "Osporeno rešenje ne sadrži jasne razloge o načinu na koji je utvrđeno da je tužilja višak — nisu obrazloženi razlozi o primenjenim kriterijumima i broju bodova zaposlenih u postupku utvrđivanja viška u stomatologiji. Čl. 2. Kriterijuma za utvrđivanje viška u stomatologiji predviđa poseban redosled: najpre prestaje radni odnos onima koji dobrovoljno prihvate, potom pred penzijom, a zatim prema bodovima. Tužilja kao majka deteta do dve godine starosti, prema kolektivnom ugovoru, ne može biti proglašena viškom bez njene saglasnosti.",
    keywords: [
      "tehnološki višak",
      "stomatologinja",
      "posebna zaštita majke",
      "kriterijumi u zdravstvu",
      "bodovanje",
      "kolektivni ugovor",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 187 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 2607/2014",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je Pravilnik o sistematizaciji na kome se zasniva nikada nije stupio na snagu zbog nedostatka saglasnosti Vlade, a komisija nije konkretno primenila kriterijume iz Programa na sve izvršioce?",
    court_position:
      "Apelacioni sud potvrđuje poništaj otkaza. Otkaz zasnovan na Pravilniku koji nije stupio na snagu je nezakonit; tuženi je bio dužan da konkretno utvrdi ispunjenost kriterijuma za sve izvršioce i na osnovu komparacije donese konačnu odluku ko je višak.",
    reasoning:
      "Tuženi je morao konkretno da utvrdi ispunjenost zadatih kriterijuma iz Programa rešavanja viška zaposlenih za sve izvršioce na radnom mestu, te da na osnovu komparacije dobijenih rezultata za svakog od njih donese konačnu odluku koji zaposleni primenom predviđenih kriterijuma predstavlja višak za čijim je radom prestala potreba. Neposredni rukovodilac nije primenio kriterijume za utvrđivanje viška zaposlenih, što osporeno rešenje čini nezakonitim.",
    keywords: [
      "tehnološki višak",
      "nevažeći pravilnik o sistematizaciji",
      "saglasnost vlade",
      "primena kriterijuma",
      "komparacija zaposlenih",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 729/2020",
    legal_area: "labor",
    legal_question:
      "Da li Odluka o utvrđivanju kriterijuma za višak zaposlenih i Odluka o utvrđivanju ko je višak, kao pojedinačni pravni akti poslodavca, stupaju na snagu danom donošenja, a ne osmog dana od dana objavljivanja?",
    court_position:
      "Vrhovni kasacioni sud preinačava drugostepenu presudu i utvrđuje da je otkaz zakonit. Odluke poslodavca o utvrđivanju kriterijuma i ko je višak su pojedinačni pravni akti i stupaju na snagu danom donošenja.",
    reasoning:
      "Rešenje o otkazu doneto je 07.07.2015. — posle Odluke o utvrđivanju kriterijuma (05.07.2015.) i Odluke kojom je utvrđeno da tužilac predstavlja višak (06.07.2015.). Obe odluke su pojedinačni pravni akti poslodavca i stupaju na snagu danom donošenja. Odredba čl. 196. st. 4. Ustava RS o stupanju na snagu osmog dana važi samo za zakone i druge opšte akte — ne za pojedinačne akte poslodavca. Drugostepeni sud je pogrešno primenio materijalno pravo.",
    keywords: [
      "tehnološki višak",
      "pojedinačni pravni akt poslodavca",
      "stupanje na snagu",
      "opšti akt",
      "Ustav RS",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 196 stav 4 Ustava RS",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 884/2019",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada Program rešavanja viška donosi Nadzorni odbor, a iz utvrđenog stanja nije jasno da li Program sadrži propisane kriterijume i elemente iz čl. 155. ZOR, a ocena rezultata rada sačinjena je pre donošenja Programa?",
    court_position:
      "Vrhovni kasacioni sud ukida nižestepene presude i vraća predmet na ponovno suđenje. Nije utvrđeno da li doneti Program sadrži kriterijume za utvrđivanje viška i sve elemente iz čl. 155. st. 3. ZOR.",
    reasoning:
      "Čl. 155. st. 3. ZOR propisuje obavezne elemente Programa: razloge prestanka potrebe, ukupan broj zaposlenih, strukturu i staž viška, kriterijume za utvrđivanje viška, mere za zapošljavanje, sredstva za rešavanje socijalno-ekonomskog položaja i rok za otkaz. Iz utvrđenog stanja ne može se zaključiti da li doneti Program sadrži sve te elemente. Obrazložena ocena rezultata rada tužioca sačinjena je 18.01.2013. — pre donošenja Programa sa utvrđenim kriterijumima, što je potencijalni proceduralni propust koji sud mora ispitati.",
    keywords: [
      "program rešavanja viška zaposlenih",
      "sadržina programa",
      "nadzorni odbor",
      "ocenjivanje pre programa",
      "nepotpuno utvrđeno činjenično stanje",
    ],
    related_articles: [
      "čl. 155 stav 3 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1693/2015",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada poslodavac nije bio dužan da donese Program rešavanja viška, pa smatra da ima diskreciono pravo da bez unapred utvrđenih kriterijuma sam odredi koji zaposleni su višak?",
    court_position:
      "Vrhovni kasacioni sud ukida nižestepene presude i nalaže ponovno suđenje. Zabrana diskrecione odluke o višku bez kriterijuma je opšte pravilo — važi čak i bez obaveze donošenja Programa.",
    reasoning:
      "Čak i u situaciji kada poslodavac nije u obavezi da donese Program rešavanja viška, to mu ne daje pravo da bez određenog kriterijuma sam odluči koji zaposleni su višak. Određivanje lica koja su višak od više izvršilaca bez kriterijuma čini odluku nezakonitom i može dovesti do diskriminacije zabranjene čl. 18. st. 1. tač. 5. ZOR. Tuženi nije odredio kriterijume za određivanje koji su zaposleni tehnološki višak. Nižestepeni sudovi nisu utvrdili na osnovu kojih merila je tuženi odredio koji zaposleni su višak.",
    keywords: [
      "tehnološki višak",
      "diskreciono pravo poslodavca",
      "obaveza primene kriterijuma",
      "diskriminacija",
      "program rešavanja viška",
    ],
    related_articles: [
      "čl. 18 stav 1 tačka 5 ZOR",
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 3121/2023",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada rešenje o otkazu nema obrazložene razloge i dokaze o primenjenoj proceduri bodovanja prema kriterijumima predviđenim Programom i Posebnim kolektivnim ugovorom?",
    court_position:
      "Apelacioni sud potvrđuje poništaj otkaza. Rešenje o otkazu zbog smanjenja broja izvršilaca mora sadržati razloge s pozivom na koje se poslodavac — između više izvršilaca — odlučio da određenom zaposlenom otkaže ugovor.",
    reasoning:
      "Posebni kolektivni ugovor i Program za rešavanje viška zaposlenih predviđaju kao obavezan osnovni kriterijum rezultate rada — ocenjene na osnovu obrazložene ocene neposrednog rukovodioca prema kvalitetu posla, samostalnosti u radu, inovacijama, efikasnosti i odnosu prema radu. Obrazloženje rešenja o otkazu zbog prestanka potrebe za radom usled organizacionih promena mora sadržati razloge zašto je baš određenom zaposlenom otkazan ugovor. Tuženi nije dostavio dokaze o sprovedenom bodovanju prema propisanim kriterijumima.",
    keywords: [
      "tehnološki višak",
      "obrazloženje rešenja",
      "posebni kolektivni ugovor",
      "kriterijumi za višak",
      "bodovanje",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 stav 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 912/2015",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je ugašena cela filijala i radno mesto tužilje u okviru nje, a kriterijumi za utvrđivanje viška nisu primenjeni jer se primenjuju samo pri smanjenju broja izvršilaca, a ne pri ukidanju organizacionog dela?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Kada su radno mesto i cela organizaciona jedinica ukinuti, kriterijumi za izbor ko je višak se ne primenjuju jer nema konkurencije između više izvršilaca.",
    reasoning:
      "Tužena je donela Odluku o izmeni organizacionih delova i Program rešavanja viška sa konačnom listom, te ugasila filijalu u kojoj je tužilja radila, uključujući radno mesto samostalnog referenta za proizvode za stanovništvo. Kriterijumi se primenjuju samo u situaciji kada dolazi do smanjenja broja izvršilaca na istom mestu, ali ne i kada su i radno mesto i filijala kao organizacioni deo u celosti ukinuti. Otkaz je zakonit prema čl. 153–158. i 179. tač. 9. ZOR.",
    keywords: [
      "tehnološki višak",
      "ukidanje filijale",
      "ukidanje radnog mesta",
      "kriterijumi za višak",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 154 ZOR",
      "čl. 155 ZOR",
      "čl. 158 ZOR",
      "čl. 179 tačka 9 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 3781/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac zbog smanjenog obima poslovanja ukinuo celo radno mesto tužioca u okviru organizacionih promena i nije bio dužan da ponudi premeštaj jer ne postoje odgovarajuća upražnjena radna mesta?",
    court_position:
      "Apelacioni sud preinačava prvostepenu presudu i odbija zahtev tužioca. Poslodavac je zakonito sproveo organizacione promene i ukinuo radno mesto tužioca; ne postoje uslovi za ponudu premeštaja.",
    reasoning:
      "Prema čl. 179. st. 5. tač. 1. ZOR, otkaz je opravdan kada usled ekonomskih, tehnoloških ili organizacionih promena prestane potreba za određenim poslom. Mere za zapošljavanje iz čl. 155. st. 1. tač. 5. ZOR (premeštaj na druge poslove, rad kod drugog poslodavca, itd.) primenjuju se kada postoji ta mogućnost. Tuženi je zakonito sproveo organizacione promene i ukinuo radno mesto tužioca, a prvostepeni sud je pogrešno primenio materijalno pravo kada je usvojio zahtev za poništaj otkaza.",
    keywords: [
      "tehnološki višak",
      "ukidanje radnog mesta",
      "organizacione promene",
      "premeštaj",
      "mere zapošljavanja",
    ],
    related_articles: [
      "čl. 155 stav 1 tačka 5 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5540/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li povreda prava na pravično suđenje iz čl. 32. st. 1. Ustava postoji kada je Vrhovni kasacioni sud proizvoljno sabrao zaposlene koji su dobrovoljno otišli uz stimulativnu otpremninu sa zaposlenima proglašenim viškom radi utvrđivanja kvote iz čl. 153. ZOR?",
    court_position:
      "Ustavni sud usvaja ustavnu žalbu i poništava presudu Vrhovnog kasacionog suda. Sabiranje dobrovoljnih odlazaka uz stimulativnu otpremninu sa prisilnim proglašenjem viška radi utvrđivanja zakonske kvote je arbitrerno tumačenje i povreda prava na pravično suđenje.",
    reasoning:
      "Vrhovni kasacioni sud je bez adekvatnog obrazloženja sabrao zaposlene koji su dobrovoljno pristali da im radni odnos prestane uz stimulativnu otpremninu sa onima kojima je otkazan ugovor o radu odlukom poslodavca, zaključivši da tuženi ima obavezu donošenja Programa rešavanja viška zaposlenih. Takvo tumačenje je arbitrerno i nedovoljno obrazloženo, što predstavlja povredu prava na pravično suđenje iz čl. 32. st. 1. Ustava RS. Predmet se vraća na ponovnu odluku.",
    keywords: [
      "dobrovoljni odlazak",
      "stimulativna otpremnina",
      "kvota za program viška",
      "arbitrerno tumačenje",
      "pravo na pravično suđenje",
    ],
    related_articles: [
      "čl. 32 stav 1 Ustava RS",
      "čl. 153 ZOR",
    ],
    headnote:
      "Dobrovoljni socijalni program ne sme se sabirati sa prinudnim proglašenjem viška pri izračunavanju kvote iz čl. 153. ZOR.",
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 136/2017",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je smanjen broj izvršilaca na određenom radnom mestu, ali rešenje o otkazu ne sadrži konkretan razlog zašto je baš tužilja proglašena viškom u odnosu na ostale 4 izvršioca?",
    court_position:
      "Vrhovni kasacioni sud potvrđuje nižestepene presude kojima je poništeno rešenje o otkazu. Rešenje mora sadržati jasno obrazloženje konkretnih kriterijuma na osnovu kojih je upravo određeni zaposleni proglašen viškom.",
    reasoning:
      "Programom od 06.08.2011. utvrđeno je da je na radnom mestu tužilje (od 5 izvršilaca) smanjen broj na 3. Tuženi je smanjio broj izvršilaca bez navođenja kriterijuma koji su primenjeni pri odabiru ko je od 5 zaposlenih višak. Poslodavac nema diskreciono pravo da bez određenog kriterijuma odluči ko je višak od više izvršilaca na istom radnom mestu. Rešenje je stoga nezakonito.",
    keywords: [
      "tehnološki višak",
      "smanjenje broja izvršilaca",
      "kriterijumi za višak",
      "obrazloženje rešenja",
      "diskreciono pravo",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2273/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je tužilja proglašena viškom ukidanjem njenog radnog mesta u jednoj organizacionoj jedinici, dok isti poslovi ostaju u trima drugim jedinicama, faktički smanjujući ukupan broj izvršilaca sa 4 na 3?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Ukidanjem radnog mesta u jednoj organizacionoj jedinici pri zadržavanju iste pozicije u trima drugima faktički dolazi do smanjenja ukupnog broja izvršilaca, što zahteva primenu kriterijuma.",
    reasoning:
      "Tuženi je Pravilnikom ukinuo radno mesto u organizacionoj jedinici Communication Media Technology & Transportation, dok su isti poslovi ostali u trima drugim jedinicama — Manufacturing, Energy i Public Healthcare. Time je od ukupno 4 izvršioca na istom radnom mestu ostalo 3 u celom preduzeću, što je smanjenje broja izvršilaca, a ne potpuno ukidanje radnog mesta. U toj situaciji, tuženi je morao primeniti kriterijume na sve 4 izvršioca kako bi utvrdio ko je višak.",
    keywords: [
      "tehnološki višak",
      "ukidanje u jednoj organizacionoj jedinici",
      "smanjenje ukupnog broja izvršilaca",
      "kriterijumi za višak",
      "organizacione promene",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 2370/2024",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je primenjeni dopunski kriterijum (dužina radnog staža kod poslodavca), jer za vreme relevantnog perioda zaposlena nije mogla biti ocenjena po osnovnom kriterijumu (rezultati rada) zbog odsustva sa rada?",
    court_position:
      "Apelacioni sud potvrđuje presudu kojom je odbijen zahtev za poništaj otkaza. Otkaz je zakonit: poslodavac je pravilno primenio dopunski kriterijum kada nije mogao oceniti rezultate rada zaposlene koja je bila odsutna u relevantnom periodu.",
    reasoning:
      "Zaposlena je bila na godišnjem odmoru i plaćenom odsustvu od 22.05.2020. do 11.12.2020., pa poslodavac nije mogao oceniti njene rezultate rada u relevantnom periodu i uporediti ih sa rezultatima rada drugog zaposlenog na istim poslovima. Pravilno je stoga primenjen dopunski kriterijum iz čl. 123. st. 1. Pravilnika o radu — prednost da ne bude proglašen viškom ima zaposleni sa više punih godina rada kod poslodavca. Zaposlena ima 18, a koleginica 31 godinu — pa je primenom tog kriterijuma pravilno utvrđeno da je zaposlena višak.",
    keywords: [
      "tehnološki višak",
      "dopunski kriterijum",
      "dužina radnog staža",
      "odsustvo sa rada",
      "godišnji odmor",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1984/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac u javnom sektoru (Institut Niška Banja) sproveo racionalizaciju, primenio obavezujuće kriterijume Ministarstva zdravlja za nemedicinske radnike i omogućio uvid u bodovanje?",
    court_position:
      "Vrhovni sud potvrđuje zakonitost otkaza. Drugostepeni sud je pravilno preinačio prvostepenu presudu, utvrđujući da je poslodavac sproveo zakonit postupak utvrđivanja viška i pravilno primenio kriterijume za nemedicinske radnike.",
    reasoning:
      "Tuženi je primenio kriterijume za utvrđivanje viška nemedicinskih radnika dostavljenih od strane Ministarstva zdravlja, tužilja je ostvarila najmanje bodova, a tuženi je omogućio zaposlenima uvid u rad radne grupe za utvrđivanje viška, uvid u izvršeno bodovanje i objavio odluku na oglasnim tablama. Pravilnik o organizaciji i sistematizaciji je na zakonit način objavljen i stupio na snagu. Prvostepeni sud je pogrešno primenio materijalno pravo.",
    keywords: [
      "tehnološki višak",
      "javni sektor",
      "zdravstvo",
      "kriterijumi Ministarstva zdravlja",
      "nemedicinski radnici",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 662/2016",
    legal_area: "labor",
    legal_question:
      "Da li su rezultati rada zakonit i dovoljan kriterijum za određivanje ko je od 20 izvršilaca višak, i da li je otkaz nezakonit jer tužioci nisu bili upoznati sa detaljima postupka ocenjivanja?",
    court_position:
      "Vrhovni kasacioni sud odbija revizije tužilaca i potvrđuje zakonitost otkaza. Rezultati rada su legitiman kriterijum, a zaposleni su mogli da se upoznaju sa postupkom ocenjivanja iz Programa i ukazati na konkretne nepravilnosti.",
    reasoning:
      "Smanjen je broj izvršilaca na poslovima tužilaca sa 20 na 2. Tuženi je 18.06.2014. usvojio Program sa kriterijumima i primenio ih na sve izvršioce — vrednovanjem rezultata rada u šestomesečnom periodu, pri čemu su tužioci dobili nižu ocenu od onih koji su ostali na radu. Tužioci su mogli da se upoznaju sa postupkom i načinom ocenjivanja iz Programa i konkretnim primedbama ukažu na eventualne nepravilnosti u ocenjivanju — što nisu učinili, pa su navodi o neobaveštenosti neosnovani.",
    keywords: [
      "tehnološki višak",
      "rezultati rada",
      "ocenjivanje zaposlenih",
      "pravo na primedbe",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 stav 1 tačka 4 ZOR",
      "čl. 179 tačka 9 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3217/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz stomatološke sestre zakonit kada je poslodavac primenio kriterijume reprezentativnih sindikata i Ministarstva zdravlja za utvrđivanje viška medicinskih sestara u stomatologiji, a tužilja se kroz bodovanje i ponovljeno bodovanje našla pri dnu rang liste?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Poslodavac je pravilno sproveo postupak utvrđivanja viška i primenio propisane kriterijume reprezentativnih sindikata i Ministarstva zdravlja.",
    reasoning:
      "Tuženi je, u skladu sa izmenjenim i dopunjenim Pravilnikom o unutrašnjoj organizaciji, izvršio bodovanje prema kriterijumima predloženim od strane reprezentativnih sindikata i Ministarstva zdravlja. Tužilja se nakon bodovanja i ponovnog bodovanja našla na 28. mestu od ukupno 31 zaposlenog koji je bodovan, pa je pravilno utvrđena kao višak. Pobijano rešenje o prestanku radnog odnosa doneto na osnovu čl. 179. st. 5. tač. 1. ZOR je zakonito.",
    keywords: [
      "tehnološki višak",
      "stomatološka sestra",
      "kriterijumi u stomatologiji",
      "bodovanje",
      "rang lista",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 stav 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1005/2016",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac sproveo Program rešavanja viška, vrednovao rezultate rada svih izvršilaca i tužilac je ocenjen nižom ocenom od onih koji su ostali na radu?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužioca i potvrđuje zakonitost otkaza. Pravilno sproveden Program sa primenama objektivnih kriterijuma čini otkaz zakonitim, a redosled pribavljanja znanja o ocenjivanju nije odlučujući.",
    reasoning:
      "Isti činjenični i pravni kontekst kao u Rev2 662/2016 (isti poslodavac, isti postupak racionalizacije). Smanjen je broj izvršilaca sa 20 na 2, odnosno sa 24 na 14. Tužilac je ocenjen nižom ocenom od zaposlenih koji su ostali na radu. Tuženi je pravilno primenio kriterijume iz Programa od 18.06.2014. Tužilac nije konkretnim primedbama osporio ocene, pa su navodi revizije neosnovani.",
    keywords: [
      "tehnološki višak",
      "program rešavanja viška",
      "ocenjivanje rezultata rada",
      "kriterijumi",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 stav 1 tačka 4 ZOR",
      "čl. 179 tačka 9 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 3957/2023",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada su kriterijumi za višak pravilno primenjeni, ali poslodavac nije dokazao da pre otkaza nije bilo slobodnih radnih mesta na koja je tužilja mogla biti raspoređena, a posle otkaza je primio 70 novih lica?",
    court_position:
      "Apelacioni sud potvrđuje poništaj otkaza zbog zloupotrebe prava. Poslodavac koji nije dokazao nemogućnost raspoređivanja tužilje, a odmah posle otkaza prima 70 novih radnika, zloupotrebio je institut tehnološkog viška.",
    reasoning:
      "Kriterijumi su pravilno primenjeni primenom redosled kriterijuma 2, 4 — tužilja je utvrđena kao višak. Međutim, iz izveštaja RFPIO utvrđeno je da je kod tužene posle donošenja otkaznog rešenja (25.12.2015.) ukupno 70 novih lica prijavljeno na osiguranje po osnovu radnog odnosa. Zaštitnik građana je uputio preporuku da se preispita postupak, ali tužena nije postupila po preporuci. Sud zaključuje da je tužena zloupotrebila pravo jer nije dokazala da nije imala slobodnih radnih mesta.",
    keywords: [
      "zloupotreba prava",
      "tehnološki višak",
      "novo zapošljavanje posle otkaza",
      "slobodna radna mesta",
      "premeštaj",
    ],
    related_articles: [
      "čl. 13 ZOO",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1708/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je zdravstvena ustanova u javnom sektoru sprovela racionalizaciju u skladu sa Zakonom o maksimalnom broju zaposlenih u javnom sektoru, primenila kriterijume Ministarstva zdravlja i tužilja ostvarila najmanji broj bodova?",
    court_position:
      "Vrhovni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Poslodavac je sproveo zakonit postupak utvrđivanja viška u skladu sa Zakonom o načinu određivanja maksimalnog broja zaposlenih u javnom sektoru i primenio propisane kriterijume.",
    reasoning:
      "Tuženi je 22.04.2016. doneo Odluku o utvrđivanju viška, sproveo racionalizaciju primenom kriterijuma za nemedicinske radnike dostavljenih od strane Ministarstva zdravlja i objavio odluku na oglasnim tablama. Novi Pravilnik o organizaciji i sistematizaciji je objavljen i stupio na snagu. Tužilja se kroz bodovanje našla među zaposlenima sa najmanje bodova, čime je nastupio opravdan razlog za otkaz iz čl. 179. st. 5. tač. 1. ZOR.",
    keywords: [
      "tehnološki višak",
      "javni sektor",
      "zdravstvo",
      "nemedicinski radnici",
      "kriterijumi Ministarstva zdravlja",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 179 stav 5 tačka 1 ZOR",
      "Zakon o načinu određivanja maksimalnog broja zaposlenih u javnom sektoru",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6902/2022",
    legal_area: "constitutional",
    legal_question:
      "Da li povreda prava na pravično suđenje postoji kada je Vrhovni kasacioni sud proizvoljno sabrao dobrovoljne odlaske uz stimulativnu otpremninu sa prisilnim proglašenjem viška, zaključivši da postoji obaveza donošenja Programa rešavanja viška zaposlenih?",
    court_position:
      "Ustavni sud usvaja ustavnu žalbu privrednog društva, poništava presudu Vrhovnog kasacionog suda i vraća predmet na ponovno odlučivanje. Arbitrerno sabiranje dobrovoljnih odlazaka sa prisilnim viškom povreda je prava na pravično suđenje.",
    reasoning:
      "Vrhovni kasacioni sud je zaključio da tuženi ima obavezu donošenja Programa rešavanja viška zaposlenih na osnovu sabiranja zaposlenih koji su dobrovoljno napustili radno mesto sa onima kojima je otkazan ugovor o radu odlukom poslodavca. Taj zaključak je zasnovan na arbitrarnom tumačenju čl. 153. ZOR i nije adekvatno obrazložen, što predstavlja povredu čl. 32. st. 1. Ustava RS. Čak i u slučaju kada ne postoji obaveza donošenja Programa, odluka o otkazu ne može biti posledica voluntarizma.",
    keywords: [
      "dobrovoljni odlazak",
      "stimulativna otpremnina",
      "kvota za program viška",
      "arbitrerno tumačenje",
      "pravo na pravično suđenje",
    ],
    related_articles: [
      "čl. 32 stav 1 Ustava RS",
      "čl. 153 ZOR",
    ],
    headnote:
      "Ista pravna situacija i zaključak kao u Už 5540/2020 — Ustavni sud dosledno negira sabiranje dobrovoljnih odlazaka pri izračunavanju kvote za Program.",
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1300/2016",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada poslodavac nije bio dužan da donese Program rešavanja viška (560 zaposlenih, 29 viška), ali ni tada nije utvrdio niti primenio kriterijume pri smanjivanju broja izvršilaca na radnom mestu prodavač?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog. Izostanak obaveze donošenja Programa ne znači izostanak obaveze primene kriterijuma — kriterijumi su uvek neophodni kada se smanjuje broj izvršilaca na određenim poslovima.",
    reasoning:
      "Čl. 155. st. 1. tač. 4. ZOR propisuje da Program sadrži kriterijume za utvrđivanje viška. Kriterijumi za utvrđivanje viška zaposlenih primenjuju se uvek u situaciji kada je smanjen broj izvršilaca na određenim poslovima — bez obzira na obavezu donošenja Programa. Neophodnost kriterijuma važi jer postoji konkurencija više zaposlenih za manji broj radnih mesta. Kod tuženog je smanjen broj izvršilaca na radnom mestu prodavač u broju od 26 zaposlenih.",
    keywords: [
      "tehnološki višak",
      "obaveza primene kriterijuma",
      "program rešavanja viška",
      "smanjenje broja izvršilaca",
      "diskreciono pravo",
    ],
    related_articles: [
      "čl. 155 stav 1 tačka 4 ZOR",
      "čl. 179 tačka 9 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 483/2018",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je smanjen broj izvršilaca na radnom mestu fizičkog radnika u Institutu, ali tuženi nije utvrdio niti primenio kriterijume za određivanje viška niti dao razloge u obrazloženju rešenja?",
    court_position:
      "Apelacioni sud potvrđuje poništaj otkaza tužilji. Određivanje zaposlenog koji je višak usled smanjenja broja izvršilaca bez primene kriterijuma i bez obrazloženja je proizvoljno i nezakonito.",
    reasoning:
      "Pravilnikom o organizaciji koji je stupio na snagu 19.11.2015. promenjen je naziv poslova (pomoćni radnik → fizički radnik), a na nivou Instituta smanjen je broj izvršilaca na tim poslovima. Obrazloženje rešenja o otkazu mora sadržati razloge s pozivom na koje se poslodavac između više izvršilaca odlučio da određenom zaposlenom otkaže ugovor o radu (čl. 185. st. 1. ZOR). Tuženi do zaključenja rasprave nije predočio dokaze da je odredio kriterijume za određivanje viška, niti dao razloge zašto je tužilja višak.",
    keywords: [
      "tehnološki višak",
      "smanjenje broja izvršilaca",
      "kriterijumi za višak",
      "obrazloženje rešenja",
      "proizvoljnost",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 stav 1 ZOR",
      "čl. 193 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2405/2018",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac bio dužan da donese Program rešavanja viška (dobrovoljni odlasci i prinudni otkazi zajedno prelaze zakonsku kvotu), ali to nije učinio i nije primenio propisane kriterijume?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju poslodavca i potvrđuje nezakonitost otkaza. Svi zaposleni koji su višak — bez obzira da li su dobrovoljno prihvatili ili ne — posmatraju se zajedno pri utvrđivanju kvote za obavezu donošenja Programa.",
    reasoning:
      "Svi zaposleni koji su višak radni odnos prestali su po istom osnovu — otkazom od strane poslodavca. Bez značaja je da li je jedan deo dobrovoljno prihvatio proglašenje viškom uz stimulativnu otpremninu a drugi nije, jer se moraju posmatrati u ukupnom broju. Tuženi je imao obavezu da donese Program i opredeli kriterijume u skladu sa čl. 153. i 154. ZOR i da pravilno primeni kriterijume za utvrđivanje viška — što nije učinio. Vraćanje na rad tužioca je nužna pravna posledica iz čl. 191. st. 1. ZOR.",
    keywords: [
      "tehnološki višak",
      "obaveza donošenja programa",
      "dobrovoljni odlazak",
      "ukupan broj viška",
      "kriterijumi",
      "vraćanje na rad",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 154 ZOR",
      "čl. 155 ZOR",
      "čl. 191 stav 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9712/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li povreda prava na pravično suđenje postoji kada je Vrhovni kasacioni sud proizvoljno sabrao dobrovoljne odlaske sa prinudnim proglašenjem viška radi zaključka o obavezi donošenja Programa rešavanja viška zaposlenih?",
    court_position:
      "Ustavni sud usvaja ustavnu žalbu privrednog društva i poništava presudu Vrhovnog kasacionog suda. Sabiranje dobrovoljnih odlazaka sa prisilnim proglašenjem viška je arbitrerno i predstavlja povredu prava na pravično suđenje.",
    reasoning:
      "Vrhovni kasacioni sud je zaključio da tuženi ima obavezu donošenja Programa rešavanja viška zaposlenih na osnovu sabiranja zaposlenih koji su dobrovoljno napustili radno mesto sa onima koji su prisilno proglašeni viškom. Taj zaključak je zasnovan na arbitrarnom tumačenju čl. 153. ZOR i nije adekvatno obrazložen. Čak i ako nema obaveze donošenja Programa, odluka o otkazu ne može biti posledica voluntarizma. Povreda čl. 32. st. 1. Ustava RS je utvrđena.",
    keywords: [
      "dobrovoljni odlazak",
      "kvota za program viška",
      "arbitrerno tumačenje",
      "pravo na pravično suđenje",
      "voluntarizam",
    ],
    related_articles: [
      "čl. 32 stav 1 Ustava RS",
      "čl. 153 ZOR",
    ],
    headnote:
      "Ista pravna situacija kao u Už 5540/2020 i Už 6902/2022 — Ustavni sud dosledno negira sabiranje dobrovoljnih odlazaka pri izračunavanju kvote.",
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1607/2016",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac primenio kriterijume iz Kolektivnog ugovora (rezultati rada, odnos prema radu, imovno stanje, dužina staža, stručna sprema) i utvrdio da tužilja sa povoljnijim imovinskim stanjem ostaje višak?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Imovno stanje zaposlenog kao kriterijum za utvrđivanje viška je zakonit i pravilno primenjen — predviđen je Kolektivnim ugovorom.",
    reasoning:
      "Kriterijumi iz čl. 3. Aneksa Kolektivnog ugovora su: rezultati rada, odnos prema radu, imovno stanje, dužina radnog staža, stručna sprema — u navedenom redosledu značaja. Na radnom mestu asistenta planiranja bile su raspoređene tužilja i zaposlena VV. Primena kriterijuma po redosledu pokazala je da primenom dopunskog kriterijuma — imovnog stanja — VV ima nepovoljniji imovinski položaj, pa je tužilja proglašena viškom. Čl. 10. Kolektivnog ugovora posebno štiti trudnice i zaposlene na porodiljskom odsustvu i odsustvu radi nege deteta.",
    keywords: [
      "tehnološki višak",
      "imovno stanje",
      "kolektivni ugovor",
      "kriterijumi za višak",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 tačka 9 ZOR",
      "čl. 187 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 490/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li su povreda prava na suđenje u razumnom roku i zakonitost otkaza zbog tehnološkog viška dovedeni u pitanje kada je tuženi imao manje od 100 zaposlenih i nije bio dužan da donese Program rešavanja viška sa kriterijumima?",
    court_position:
      "Ustavni sud odbija ustavnu žalbu. Nije utvrđena povreda prava na suđenje u razumnom roku. Potvrđena je zakonitost otkaza jer tuženi, koji je imao manje od 100 zaposlenih, nije bio dužan da donese Program sa kriterijumima.",
    reasoning:
      "Zakon o radu ne predviđa kriterijume niti upućujuće norme o primeni kriterijuma pri određivanju zaposlenih koji će biti tehnološki višak. Tuženi je u vreme donošenja rešenja o otkazu imao manje od 100 zaposlenih na neodređeno vreme, iz čega sledi da nije bio dužan da donese Program rešavanja viška zaposlenih, kojim bi bili propisani kriterijumi (čl. 155. ZOR). Broj radnih mesta i izvršilaca je smanjen novom sistematizacijom, a tužilji je isplaćena otpremnina. Otkaz je zakonit.",
    keywords: [
      "tehnološki višak",
      "manje od 100 zaposlenih",
      "obaveza donošenja programa",
      "suđenje u razumnom roku",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 1 tačka 9 ZOR",
      "čl. 32 Ustava RS",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  // ── BATCH 3 (cases 65–97) ────────────────────────────────────────────────

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2972/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz ugovora o radu nezakonit ako je bodovanje zaposlenih izvršeno pre formalnog donošenja i objavljivanja programa rešavanja viška zaposlenih?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužilja i potvrđuje zakonitost otkaza. Kriterijumi za utvrđivanje viška zaposlenih mogu biti primenjeni na osnovu ocene ostvarenih rezultata rada za period koji prethodi datumu objavljivanja programa, pod uslovom da su ti kriterijumi sadržani u programu.",
    reasoning:
      "Tuženi je ocenjivanje rada zaposlenih izvršio 16.11.2016. u skladu sa Pravilnikom o radu iz 2015. godine, predlog programa je donet 23.11.2016., a Program rešavanja viška zaposlenih 09.12.2016. Kriterijumi primenjeni pri ocenjivanju bili su sadržani u Programu. Poslodavac je dužan da u skladu sa propisanim kriterijumima utvrdi broj viška zaposlenih, njihovu kvalifikacionu strukturu, godine staža i poslove, iz čega proizilazi da se kriterijumi mogu primeniti na osnovu ocene rezultata rada za period koji prethodi datumu objavljivanja programa. Revizija je odbijena kao neosnovana.",
    keywords: [
      "tehnološki višak",
      "redosled bodovanja i programa",
      "kriterijumi pre objave programa",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 191 stav 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 767/2006",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz ugovora o radu zbog tehnološkog viška zakonit kada radno mesto nije ukinuto, a obim posla je čak povećan?",
    court_position:
      "Vrhovni sud odbija reviziju poslodavca i potvrđuje da je otkaz nezakonit. Utvrđeno je da potreba za poslovima tužioca nije prestala, da njegovo radno mesto nije ukinuto i da je obim posla povećan — stoga ne postoji zakonski osnov za otkaz po osnovu tehnološkog viška.",
    reasoning:
      "Zakon o radu ne sadrži kriterijume za određivanje zaposlenih koji će postati tehnološki višak, ali sudovi su ovlašćeni da cene da li su razlozi za otkaz bili opravdani. U konkretnom slučaju, potreba za poslovima tužioca nije prestala — radno mesto nije ukinuto, a obim posla je povećan, a ne smanjen. Stoga ne postoji zakonski osnov za otkaz po osnovu tehnološkog viška. Poslodavac koji ima više od 50 zaposlenih i namerava da otkaže ugovor o radu za više od 10% ukupnog broja u toku kalendarske godine dužan je da donese program rešavanja viška.",
    keywords: [
      "tehnološki višak",
      "radno mesto nije ukinuto",
      "povećanje obima posla",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 179 stav 1 tačka 9 ZOR",
      "čl. 114 ZOR",
      "čl. 115 ZOR",
      "čl. 117 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 921/2015",
    legal_area: "labor",
    legal_question:
      "Da li je poslodavac dužan da primenjuje kriterijume za izbor viška zaposlenih kada se zbog organizacionih promena ukida ceo organizacioni deo?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Kriterijumi se primenjuju samo kada na istim poslovima radi više od jednog izvršioca i vrši se racionalizacija smanjenjem broja izvršilaca. Kada se ukida ceo organizacioni deo, poslodavac nije dužan da utvrđuje kriterijume za izbor.",
    reasoning:
      "Kod tužene je došlo do racionalizacije procesa rada gde su se kao višak pojavili ne samo zaposleni, već i celi sektori i poslovi u tim sektorima. U takvoj situaciji primena kriterijuma nije moguća jer nema izbora između zaposlenih — svi zaposleni na ukinutim poslovima su višak. Tužena je sprovela postupak utvrđivanja viška u skladu sa čl. 153–156. ZOR i otkazala ugovor o radu iz razloga predviđenih čl. 179. tačka 9. ZOR, jer je ukinuto radno mesto na kome je tužilja bila raspoređena a bez mogućnosti raspoređivanja. Na zakonitost ne utiče ni angažovanje trećih lica, jer na tim poslovima nisu primana lica u stalni radni odnos (čl. 182. ZOR).",
    keywords: [
      "tehnološki višak",
      "ukidanje celog organizacionog dela",
      "kriterijumi se ne primenjuju",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 tačka 9 ZOR",
      "čl. 182 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3291/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je program rešavanja viška prethodno dostavljen sindikatima i NSZ, donešen uz poštovanje svih zakonskih elemenata, a tužilja se nalazila na konačnoj listi viška?",
    court_position:
      "Vrhovni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Program rešavanja viška donešen je u skladu sa zakonskim zahtevima, dostavljen reprezentativnim sindikatima i NSZ, a tužilja se nalazila na konačnoj listi zaposlenih za čijim radom prestaje potreba.",
    reasoning:
      "Predlog Programa od 26.11.2015. dostavljen je Sindikalnoj organizaciji PKS, Sindikatu nezavisnost–PKS i NSZ. Nakon uzimanja u obzir mišljenja sindikata i predloga mera NSZ, tužena je 22.12.2015. donela konačan Program i objavila ga na oglasnoj tabli. Na dan donošenja programa tužena je imala 289 zaposlenih; od 111 koji obavljaju ukinute ili smanjene poslove, uz 22 dobrovoljno prijavljena i 24 obuhvaćena merama zapošljavanja, preostalih 86 zaposlenih — uključujući tužilju — proglašeno je viškom uz isplatu otpremnine.",
    keywords: [
      "tehnološki višak",
      "program rešavanja viška",
      "sindikati",
      "NSZ",
      "dobrovoljni pristanak",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 187 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2057/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz nezakonit kada poslodavac nije doneo obavezni program rešavanja viška, imajući u vidu da je u periodu dužem od 30 dana otkazao ugovor za 25 zaposlenih od ukupno 942?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog i potvrđuje da je otkaz nezakonit. Kada se u periodu dužem od 30 dana otkazuje ugovor o radu za 25 zaposlenih na neodređeno vreme, postoji zakonska obaveza donošenja programa rešavanja viška, a njeno neispunjenje čini otkaz nezakonitim.",
    reasoning:
      "Tuženi je Odlukom predvideo da se za prvi kvartal 2019. kao tehnološki višak proglasi 25 zaposlenih od ukupno 942, a u periodu 01.01.2019.–28.02.2019. tih 25 radnika je dobilo otkaz. Radi se o kvartalnom periodu — periodu dužem od 30 dana — u kome je dolazilo do prestanka rada zaposlenih na neodređeno vreme. To je generisalo zakonsku obavezu donošenja programa rešavanja viška zaposlenih propisanu čl. 153. stav 2. ZOR. Nepostojanje zakonom propisane procedure predmetno rešenje o otkazu čini nezakonitim.",
    keywords: [
      "tehnološki višak",
      "obaveza donošenja programa",
      "period duži od 30 dana",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 153 stav 2 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 380/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac u javnom sektoru postupio u skladu sa Zakonom o maksimalnom broju zaposlenih, doneo program rešavanja viška i ukinuo radno mesto tužilje?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Poslodavac je sproveo postupak rešavanja viška u skladu sa Zakonom o načinu određivanja maksimalnog broja zaposlenih u javnom sektoru, doneo program i zakonito otkazao ugovor o radu, jer je radno mesto tužilje ukinuto bez mogućnosti raspoređivanja.",
    reasoning:
      "Tužena je otkazala ugovor o radu tužilji na osnovu čl. 179. stav 5. tačka 1. i čl. 153, 155 i 158. ZOR. Radno mesto na kome je tužilja radila ukinuto je izmenom sistematizacije u skladu sa Zakonom o načinu određivanja maksimalnog broja zaposlenih u javnom sektoru. Budući da se radilo o potpunom ukidanju radnog mesta — a ne smanjenju broja izvršilaca — nije bila potrebna primena kriterijuma. Tužilja nije mogla biti raspoređena na druge poslove koji odgovaraju njenoj stručnoj spremi, a isplaćena joj je otpremnina.",
    keywords: [
      "tehnološki višak",
      "javni sektor",
      "maksimalni broj zaposlenih",
      "ukidanje radnog mesta",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 158 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 37/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada poslodavac nije primenio zakonski propisane kriterijume za utvrđivanje viška zaposlenih i nije pokušao da tužioca rasporedi na drugo radno mesto?",
    court_position:
      "Vrhovni kasacioni sud preinačuje presudu Apelacionog suda i potvrđuje da je otkaz nezakonit. Tuženi nije primenio propisane kriterijume za utvrđivanje viška zaposlenih niti je pokušao da rasporedi tužioca na drugo radno mesto.",
    reasoning:
      "Tuženi je Pravilnikom utvrdio broj izvršilaca na radnom mestu administrativni referent za svih 28 poslovnih jedinica. Kao poslodavac bio je u obavezi da primeni merila i kriterijume iz čl. 153. ZOR kako bi utvrdio višak. Apelacioni sud je pogrešno zaključio da je otkaz zakonit jer se radi o jednom izvršiocu u konkretnoj poslovnoj jedinici — tuženi je bio dužan da primeni kriterijume na sve zaposlene sa istog radnog mesta u svim poslovnim jedinicama, a što nije učinio.",
    keywords: [
      "tehnološki višak",
      "kriterijumi za višak",
      "jedan izvršilac u poslovnoj jedinici",
      "sve poslovne jedinice",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 tačka 9 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 33/2025",
    legal_area: "labor",
    legal_question:
      "Da li je rešenje o prestanku radnog odnosa kao tehnološkom višku nezakonito kada poslodavac nije dostavio dokaze o bodovanju svih zaposlenih koji rade na istim poslovima prema propisanim kriterijumima?",
    court_position:
      "Vrhovni sud potvrđuje nezakonitost otkaza. Poslodavac mora zaposlene koji rade na istim poslovima izložiti konkurenciji propisanih kriterijuma na objektivan način. Nedostavljanje dokaza o bodovanju svih zaposlenih onemogućava ispitivanje pravilnosti odluke o višku i rešenje čini nezakonitim.",
    reasoning:
      "Kolektivni ugovor tužene od 16.11.2021. (čl. 70–81) propisuje postupak utvrđivanja tehnološkog viška i kriterijume — osnovne i dopunske. Tužena nije dokazala koji broj bodova su ostvarili ostali zaposleni, pa se tužilja nije mogla izložiti mogućnosti konkurencije i osporavanja bodovne liste. Bez tih podataka nije moguće oceniti da li je sprovedeni postupak vrednovanja pravilno sproveden, a time ni pravilnost odluke o tome ko je proglašen za tehnološki višak. Nedostatak tih elemenata rešenje čini nezakonitim.",
    keywords: [
      "tehnološki višak",
      "bodovanje svih zaposlenih",
      "dokazna obaveza poslodavca",
      "konkurencija kriterijuma",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 229/2020",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni koji su se dobrovoljno prijavili kao višak moraju biti uračunati u ukupan broj viška pri utvrđivanju obaveze donošenja programa, i da li dobrovoljni pristanak zamenjuje primenu objektivnih kriterijuma?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog poslodavca i potvrđuje nižestepene presude o nezakonitosti otkaza. Svi zaposleni kojima je prestao radni odnos po osnovu tehnološkog viška moraju se posmatrati u ukupnom broju bez obzira na dobrovoljnost, pa je tuženi bio dužan da donese program i primeni objektivne kriterijume.",
    reasoning:
      "Tuženi je sprovodio dve faze: u prvoj je 75 zaposlenih dobrovoljno prihvatilo otkaz uz stimulativnu otpremninu, u drugoj je Odlukom od 01.02.2010. utvrđeno 18 viška, među kojima i tužilac. Svim zaposlenima kojima je prestao radni odnos po istom osnovu — otkazu zbog tehnološkog viška — nastao je isti pravni osnov prestanka, bez obzira na dobrovoljnost. Stoga se moraju posmatrati u ukupnom broju, a tuženi je imao obavezu da donese program rešavanja viška i primeni kriterijume za utvrđivanje viška, pri raspoređivanju zaposlenih čija su radna mesta ukinuta.",
    keywords: [
      "tehnološki višak",
      "dobrovoljni pristanak",
      "ukupan broj viška",
      "obaveza donošenja programa",
      "objektivni kriterijumi",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1243/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac u javnom sektoru smanjio broj izvršilaca izmenom pravilnika o sistematizaciji u skladu sa Zakonom o maksimalnom broju zaposlenih, primenio kriterijume i obrazložio ih u rešenju?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Tuženi nije proizvoljno smanjio broj izvršilaca, već je to učinio donošenjem pravilnika u skladu sa zakonom, primenio je kriterijume za određivanje viška i naveo konkretne razloge u obrazloženju rešenja.",
    reasoning:
      "Na radnom mestu tužilje smanjen je broj izvršilaca donošenjem Pravilnika o izmenama i dopunama pravilnika o unutrašnjoj organizaciji i sistematizaciji radnih mesta u skladu sa čl. 24. ZOR i čl. 13. Zakona o načinu određivanja maksimalnog broja zaposlenih u javnom sektoru. Pobijano rešenje o prestanku radnog odnosa doneto je u zakonito sprovedenom postupku u kome su primenjeni kriterijumi. U obrazloženju su navedeni konkretni razlozi i primenjeni kriterijumi, a ocenjeno je da nema mogućnosti raspoređivanja tužilje na druge odgovarajuće poslove.",
    keywords: [
      "tehnološki višak",
      "javni sektor",
      "izmena pravilnika o sistematizaciji",
      "kriterijumi za višak",
      "obrazloženje rešenja",
    ],
    related_articles: [
      "čl. 24 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 166/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz nezakonit kada je program rešavanja viška zaposlenih doneo nenadležan organ i kada program nije sadržao sve zakonom propisane elemente, posebno kriterijume za utvrđivanje viška?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog i potvrđuje poništaj otkaza. Program rešavanja viška ne sadrži kriterijume niti druge obavezne elemente iz čl. 155. stav 3. ZOR; bodovanje pre donošenja programa sa jasnim kriterijumima nije zakonito; rešenje o otkazu ne sadrži razloge o preduzetim merama zapošljavanja.",
    reasoning:
      "Doneti Program ne sadrži kriterijume za utvrđivanje viška ni elemente propisane čl. 155. stav 3. ZOR: kvalifikacionu strukturu, godine starosti i staža osiguranja, mere za zapošljavanje ni preduzete radnje. Tuženi nije mogao, umesto konkretizacije kriterijuma u Programu, ovlastiti Izvršni odbor i Generalnog direktora da utvrde spisak zaposlenih — to je protivno čl. 155. stav 3. ZOR. Obrazovana ocena rezultata rada tužioca sačinjena je 16.01.2013. — pre donošenja Programa sa jasnim kriterijumima — i za period kraći od godinu dana propisane kolektivnim ugovorom.",
    keywords: [
      "tehnološki višak",
      "program rešavanja viška",
      "obavezni elementi programa",
      "nenadležan organ",
      "kriterijumi za višak",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 stav 1 ZOR",
      "čl. 155 stav 3 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 stav 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2331/2018",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz nezakonit kada program rešavanja viška zaposlenih nije sadržao spisak zaposlenih koji su višak, a taj spisak je sačinjen tek nakon donošenja rešenja o otkazu?",
    court_position:
      "Vrhovni kasacioni sud preinačuje drugostepenu presudu i potvrđuje da je otkaz nezakonit. Spisak zaposlenih koji su višak mora biti sastavni deo programa rešavanja viška pre donošenja rešenja o otkazu — ne naknadno sačinjen akt.",
    reasoning:
      "Prema čl. 155. tačka 3. ZOR, program rešavanja viška naročito sadrži broj, kvalifikacionu strukturu, godinu starosti i staža osiguranja zaposlenih koji su višak, kao i poslove koje obavljaju. Tužena je 12.01.2016. donela Program bez tog spiska, konstatujući samo da će se po donošenju programa primeniti kriterijumi i sačiniti konačan spisak. Taj spisak je sačinjen 05.02.2016. — dan nakon donošenja otkaznog rešenja od 04.02.2016. Stoga Program nije bio potpun pre donošenja otkaza, a program rešavanja viška sa svim elementima iz čl. 155. ZOR mora biti sproveden pre donošenja otkaznog rešenja.",
    keywords: [
      "tehnološki višak",
      "program rešavanja viška",
      "spisak zaposlenih koji su višak",
      "hronološki redosled",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 tačka 3 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2378/2023",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac primenio dopunski kriterijum (imovno stanje zaposlenog) jer su svi zaposleni ostvarili jednake rezultate rada po osnovnom kriterijumu?",
    court_position:
      "Vrhovni sud odbija reviziju tužilje i potvrđuje zakonitost otkaza. Poslodavac je pravilno primenio dopunski kriterijum imovnog stanja iz Posebnog kolektivnog ugovora za ustanove kulture, jer su svi zaposleni koji su obavljali iste poslove ocenjeni istom najvišom ocenom.",
    reasoning:
      "Tužena je primenila kriterijume iz čl. 40. Posebnog kolektivnog ugovora za ustanove kulture čiji je osnivač RS, autonomna pokrajina i jedinica lokalne samouprave. Taj član propisuje primenu dopunskih kriterijuma — između ostalog, imovnog stanja zaposlenog — u slučaju jednakih rezultata rada. Svi zaposleni koji su obavljali dotične poslove ocenjeni su najvišom ocenom tri, pa je tužena pravilno primenila dopunski kriterijum imovnog stanja.",
    keywords: [
      "tehnološki višak",
      "dopunski kriterijumi",
      "imovno stanje zaposlenog",
      "jednaki rezultati rada",
      "kolektivni ugovor",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3268/2023",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je smanjen broj izvršilaca na radnom mestu (sa 3 na 2), ali poslodavac nije primenio propisane kriterijume za utvrđivanje koji od zaposlenih predstavlja višak?",
    court_position:
      "Vrhovni sud odbija reviziju poslodavca i potvrđuje da je otkaz nezakonit. Kada se smanjuje broj izvršilaca na istom radnom mestu, poslodavac je dužan da primeni unapred utvrđene kriterijume — što u konkretnom slučaju nije učinjeno.",
    reasoning:
      "Pre donošenja pobijanog rešenja, tuženi je doneo Pravilnik o organizaciji i sistematizaciji poslova, a Odbor direktora utvrdio predlog Programa. Na poslovima koje je tužilac obavljao radila su tri izvršioca; prema novom Pravilniku te poslove obavljaju dva. Programom od 21.12.2019. utvrđen je višak od šest zaposlenih, a propisani su i osnovni i dopunski kriterijumi. Nižestepeni sudovi su pravilno zaključili da je došlo do smanjenja broja izvršilaca — a ne ukidanja radnog mesta — pa je tuženi morao primeniti kriterijume, što nije učinio.",
    keywords: [
      "tehnološki višak",
      "smanjenje broja izvršilaca",
      "primena kriterijuma",
      "ukidanje vs. smanjenje",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 99/2019",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada poslodavac nije izmenio akt o sistematizaciji pre donošenja odluke o višku zaposlenih, te ostaje nejasno iz kog razloga je baš tužilja proglašena viškom od 56 stomatoloških sestara?",
    court_position:
      "Apelacioni sud potvrđuje presudu o poništaju otkaza. Poslodavac nije pre donošenja odluke o višku izvršio izmenu akta o sistematizaciji kojom bi smanjio broj izvršilaca, pa je ostalo nejasno iz kog razloga je sprovedena racionalizacija — taj propust rešenje čini nezakonitim.",
    reasoning:
      "Tuženi je Odlukom br. 5297 od 02.12.2015. utvrdio da ima 56 stomatoloških sestara, a jednu — tužilju — proglasio viškom u Službi za stomatološku zdravstvenu zaštitu. Međutim, tuženi nije pre donošenja odluke izvršio izmenu akta o sistematizaciji kojom bi smanjio broj zaposlenih na tom radnom mestu, ni ukidanjem radnog mesta ni zbog smanjenog obima posla. Ostalo je nejasno iz kog razloga je sprovedena racionalizacija i na koji način je utvrđen višak u stomatologiji, te da li su za to postojale stvarne i objektivne okolnosti. Nesporno je da je tužilja ostvarila najniži broj bodova prema propisanim kriterijumima, ali propust u sistematizaciji prethodi primeni kriterijuma i čini rešenje nezakonitim.",
    keywords: [
      "tehnološki višak",
      "prethodna izmena sistematizacije",
      "objektivne okolnosti za višak",
      "stomatologija",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1797/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada poslodavac koji nije bio dužan da donese program rešavanja viška jeste primenio kriterijume, ali nije ispitao mogućnost premeštaja zaposlenih koji su proglašeni viškom na druga radna mesta?",
    court_position:
      "Vrhovni kasacioni sud ukida drugostepenu presudu i vraća predmet na ponovni postupak. I kada poslodavac nije bio dužan da donese program, zakonitost otkaza mora biti cenjena i kroz pitanje premeštaja na druga radna mesta — što nije ispitano.",
    reasoning:
      "Apelacioni sud je zaključio da tužena nije bila u obavezi da donese program jer se nisu stekli uslovi iz čl. 153. ZOR, i da je tužilac kriterijumom rezultata rada ocenjen najnižom ocenom u odnosu na ostala tri izvršioca. Vrhovni kasacioni sud prihvata stanovište o nepostojanju obaveze donošenja programa, ali utvrđuje da se zakonitost rešenja o otkazu ne može ceniti samo sa aspekta primene kriterijuma ko će biti proglašen viškom — treba ceniti i da li je poslodavac ispitao mogućnost premeštaja zaposlenih koji su višak na druga radna mesta, a to nije učinjeno.",
    keywords: [
      "tehnološki višak",
      "ispod zakonskog praga",
      "premeštaj na druga radna mesta",
      "kriterijumi za višak",
      "nepotpuno ispitivanje zakonitosti",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 11872/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li je Vrhovni kasacioni sud povredeo pravo na pravično suđenje tako što je proizvoljno i nedovoljno obrazloženo protumačio obavezu poslodavca da donese program rešavanja viška zaposlenih?",
    court_position:
      "Ustavni sud usvaja ustavnu žalbu i utvrđuje povredu prava na pravično suđenje. Vrhovni kasacioni sud je proizvoljno protumačio obavezu poslodavca da donese program rešavanja viška, neadekvatno obrazlažući svoju odluku o zakonitosti otkaza.",
    reasoning:
      "Tuženi je kroz rad komisija primenio kriterijume i utvrdio 18 zaposlenih viškom, uključujući tužilju, te zaključio da nije dužan da donese program. Vrhovni kasacioni sud je u reviziji potvrdio zakonitost otkaza, ali nije na adekvatan način obrazložio zašto smatra da tuženi nije bio dužan da donese program rešavanja viška zaposlenih. Prema stanovištu Ustavnog suda, taj zaključak je bio rezultat proizvoljnog tumačenja relevantnih zakonskih odredbi, što predstavlja povredu prava na pravično suđenje garantovanog čl. 32. Ustava.",
    keywords: [
      "tehnološki višak",
      "obaveza donošenja programa",
      "proizvoljno tumačenje zakona",
      "pravo na pravično suđenje",
      "ustavna žalba",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 32 Ustava RS",
    ],
    headnote:
      "VKS nije adekvatno obrazložio zašto poslodavac nije bio dužan da donese program rešavanja viška — puko pozivanje na broj zaposlenih bez analize konkretnih okolnosti predstavlja proizvoljno tumačenje koje povređuje čl. 32. Ustava.",
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1488/2022",
    legal_area: "labor",
    legal_question:
      "Da li je prenos imovine poslodavca na novoosnovano društvo, uz nastavak poslodavca prethodnika kao pravnog lica, statusna promena koja obavezuje sledbenika da preuzme sve zaposlene, ili je to osnov za zakonit otkaz svim zaposlenima?",
    court_position:
      "Vrhovni sud potvrđuje zakonitost otkaza. Prenos imovine na novoosnovano društvo dok poslodavac prethodnik nastavlja da postoji nije statusna promena koja bi obavezivala sledbenika da preuzme zaposlene — te je otkaz svim zaposlenima kao višku zakonit.",
    reasoning:
      "Tuženi je imao 17 zaposlenih (16 na neodređeno vreme) i predvideo ih sve kao višak, jer je prestala potreba za radom svih zaposlenih. Iz predostrožnosti su određeni kriterijumi, ali nisu primenjeni jer su svi zaposleni višak. Tuženi nije bio u mogućnosti da preduzme mere zapošljavanja — ne postoje upražnjena radna mesta jer je prestao sa svim poslovima u vezi sa proizvodnjom i prodajom ulja. NSZ je potvrdila da nema zainteresovanih poslodavaca. Prenos imovine na novoosnovano društvo uz nastavak postojanja tuženog kao pravnog lica nije statusna promena u smislu ZOR.",
    keywords: [
      "tehnološki višak",
      "prenos imovine",
      "statusna promena",
      "svi zaposleni višak",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2088/2019",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz nezakonit kada program rešavanja viška zaposlenih nije sadržao konkretni spisak zaposlenih koji su višak — taj element mora biti sastavni deo programa pre donošenja rešenja o otkazu?",
    court_position:
      "Vrhovni kasacioni sud preinačuje presudu Apelacionog suda i potvrđuje prvostepenu odluku o nezakonitosti otkaza. Programom rešavanja viška mora biti utvrđen i spisak zaposlenih koji su višak pre donošenja pojedinačnih rešenja o otkazu.",
    reasoning:
      "Na radnom mestu tužilje još tri zaposlena su obavljala iste poslove; primenom osnovnih kriterijuma nije utvrđen višak, pa su primenjeni dopunski (tužilja dobila 2 boda ukupno). Programom od 12.01.2016. predviđeni su razlozi prestanka potrebe za radom, razlozi za utvrđivanje viška i primena Odluke o maksimalnom broju zaposlenih za 2015. Međutim, program nije sadržao konkretan spisak zaposlenih koji su višak — a taj element iz čl. 155. ZOR je neophodan jer program sa svim zakonskim elementima čini sastavni deo procedure za otkaz koja mora biti potpuno sprovedena pre donošenja otkaznog rešenja.",
    keywords: [
      "tehnološki višak",
      "program rešavanja viška",
      "spisak zaposlenih koji su višak",
      "obavezni elementi programa",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 428/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz nezakonit kada je poslodavac u javnom sektoru primenio sopstvene kriterijume za utvrđivanje viška nemedicinskih radnika, umesto obavezujućih kriterijuma utvrđenih Sporazumom sa reprezentativnim sindikatima?",
    court_position:
      "Vrhovni kasacioni sud potvrđuje nižestepene presude kojima je poništen otkaz. Poslodavac je primenio sopstvene kriterijume umesto obavezujućih kriterijuma utvrđenih Sporazumom o kriterijumima za višak nemedicinskih radnika, zaključenim sa reprezentativnim sindikatima.",
    reasoning:
      "Tuženi je sa predstavnicima reprezentativnih sindikata 02.06.2016. zaključio Sporazum o utvrđivanju kriterijuma za višak zaposlenih nemedicinskih radnika. Sporazumom su predviđeni: osnovni kriterijum (dužina efektivnog staža osiguranja) i dopunski kriterijumi (primanja po članu domaćinstva, broj dece do 26 godina, zdravstveno stanje zaposlenog i članova uže porodice). Umesto primene tih sporazumnih kriterijuma, tuženi je primenio sopstvene, što je u suprotnosti sa zakonskim zahtevom da kriterijumi budu unapred dogovoreni sa sindikatima.",
    keywords: [
      "tehnološki višak",
      "kriterijumi iz sporazuma sa sindikatima",
      "sopstveni kriterijumi",
      "javni sektor",
      "nemedicinski radnici",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3186/2018",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz nezakonit kada program rešavanja viška zaposlenih nije donet kao poseban akt i nije sadržao spisak zaposlenih koji su višak sa svim zakonom propisanim podacima?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tužene i potvrđuje da je otkaz nezakonit. Predlog programa i Program rešavanja viška su dva posebna akta koje poslodavac mora doneti; Program mora sadržati konkretan spisak zaposlenih koji su višak sa svim propisanim podacima.",
    reasoning:
      "Tuženi je rešenje o otkazu doneo 19.11.2013. na osnovu Programa od 14.10.2013. koji nije donet kao poseban akt sa spiskom zaposlenih koji su višak — imenima, prezimenovima, kvalifikacionom strukturom, godinama starosti, stažem osiguranja i poslovima. Tužilja je bila identifikovana kao višak u ranijem Programu Nadzornog odbora od 16.08.2013. zasnovanom na principu dobrovoljnosti, ali joj nije otkazan ugovor po tom programu niti je dobrovoljno podnela prijavu. Iz odredbi ZOR jasno proizilazi da su predlog programa i Program dva odvojena akta.",
    keywords: [
      "tehnološki višak",
      "program kao poseban akt",
      "predlog programa i program",
      "spisak zaposlenih koji su višak",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 4008/2020",
    legal_area: "labor",
    legal_question:
      "Da li je rešenje o otkazu zbog tehnološkog viška nezakonito zbog nedostatka konkretnog obrazloženja koji su kriterijumi primenjeni i zašto je baš tužilac proglašen viškom?",
    court_position:
      "Apelacioni sud potvrđuje prvostepenu presudu kojom je poništeno rešenje o otkazu. Rešenje je nezakonito jer ne sadrži konkretne razloge i obrazloženje primene kriterijuma na osnovu kojih je tužilac proglašen za višak zaposlenih.",
    reasoning:
      "U konačnoj listi višak zaposlenih pod rednim brojem 38 nalazi se tužilac, koji je primenom kriterijuma za rezultate rada ocenjen sa 3 boda i za staž osiguranja 1 bod — ukupno 4 boda. Prvostepeni sud je utvrdio da je osporeno rešenje doneto 20.12.2017. na osnovu Pravilnika koji se primenjuje tek od 22.12.2017. Osim toga, osporeno rešenje ne sadrži konkretne razloge zbog kojih je tužilac proglašen tehnološkim viškom niti koji su kriterijumi bili primenjeni. Razlozi za prestanak potrebe za radom moraju biti objektivni i opravdani, i moraju biti navedeni u rešenju.",
    keywords: [
      "tehnološki višak",
      "obrazloženje rešenja o otkazu",
      "konkretni razlozi za višak",
      "primena kriterijuma",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev1 16/2019",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada poslodavac nije bio dužan da donese program rešavanja viška, ali u ponovnom postupku (posle odluke Ustavnog suda) nije utvrđeno da li su primenjeni kriterijumi pri raspoređivanju zaposlenih na druga radna mesta?",
    court_position:
      "Vrhovni kasacioni sud ukida presudu Apelacionog suda i vraća predmet na ponovni postupak. Nije utvrđeno da li su primenjeni kriterijumi za utvrđivanje viška zaposlenih pri raspoređivanju na druga radna mesta — što je neophodan element za ocenu zakonitosti otkaza.",
    reasoning:
      "Na dan donošenja Odluke, tuženi je imao 372 zaposlena. Formirane su dve komisije: jedna za primenu kriterijuma, druga za premeštaj proglašenih viška na druge poslove. Komisije su utvrdile 18 viška i zaključile da ne postoji mogućnost premeštaja ni prekvalifikacije. Pošto se nisu stekli uslovi iz čl. 153. ZOR, tuženi nije bio dužan da donese program. U ponovnom postupku po odluci Ustavnog suda, Vrhovni kasacioni sud vraća predmet jer apelacioni sud nije ispitao da li su kriterijumi pravilno primenjeni pri raspoređivanju zaposlenih na druga radna mesta.",
    keywords: [
      "tehnološki višak",
      "ispod zakonskog praga",
      "premeštaj na druga radna mesta",
      "kriterijumi za višak",
      "ponovni postupak po odluci Ustavnog suda",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 749/2017",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je poslodavac privremeno rasporedio zaposlenog na radno mesto portir pa otkazao ugovor pre isteka privremenog rasporeda, dok je istovremeno povećao broj izvršilaca na njegovom matičnom radnom mestu?",
    court_position:
      "Vrhovni kasacioni sud odbija reviziju tuženog i potvrđuje nezakonitost otkaza. Korišćenjem razloga tehnološkog viška u situaciji kada je povećan broj zaposlenih na matičnom radnom mestu tužioca, poslodavac je zloupotrebio pravo iz čl. 179. tačka 9. ZOR.",
    reasoning:
      "Tuženi je raspoređivanjem tužioca na radno mesto portir (01.06.2010.–31.03.2011.) a potom otkazom pre isteka roka privremenog rasporeda (17.03.2011.) — u situaciji kada je odlukom o pokretanju postupka utvrđen višak na radnom mestu portir, a istovremeno povećan broj izvršilaca na radnom mestu industrijski radnik (matičnom radnom mestu tužioca) — zloupotrebio pravo iz čl. 179. tačka 9. ZOR u sprezi sa čl. 13. ZOO. Nižestepeni sudovi su pravilno utvrdili nezakonitost otkaza.",
    keywords: [
      "tehnološki višak",
      "zloupotreba prava",
      "privremeni raspored",
      "matično radno mesto",
      "povećanje broja izvršilaca",
      "čl. 13 ZOO",
    ],
    related_articles: [
      "čl. 179 tačka 9 ZOR",
      "čl. 13 ZOO",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 673/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada program rešavanja viška zaposlenih nije sadržao konkretan spisak zaposlenih koji su višak, a predviđeno je da se taj spisak sačini tek po primeni kriterijuma nakon donošenja programa?",
    court_position:
      "Vrhovni kasacioni sud potvrđuje nižestepene presude o poništaju otkaza. Program rešavanja viška mora sadržati spisak zaposlenih koji su višak pre donošenja pojedinačnih rešenja o otkazu.",
    reasoning:
      "Tužilac je kod tuženog obavljao poslove savetodavca za posredovanje i zapošljavanje. Pravilnikom od 16.02.2015. ukinut je Odsek za programe zapošljavanja. Rešenjem od 04.02.2016. tužiocu je prestao radni odnos. Programom od 12.01.2016. predviđeni su razlozi prestanka potrebe za radom, ali program nije sadržao konkretan spisak viška — taj element je bio predviđen da se naknadno sačini po primeni kriterijuma. Prema ustaljenoj sudskoj praksi, spisak viška zaposlenih mora biti sastavni deo programa pre donošenja otkaza.",
    keywords: [
      "tehnološki višak",
      "program rešavanja viška",
      "spisak zaposlenih koji su višak",
      "hronološki redosled",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Novom Sadu",
    court_level: "appellate",
    case_number: "Gž1 1045/2015",
    legal_area: "labor",
    legal_question:
      "Da li je poslodavac koji ukida celu organizacionu jedinicu (Službu ATP) dužan da primenjuje kriterijume za utvrđivanje viška, i da li su žalbe zaposlenih koji su prethodno potpisali aneks o raspoređivanju u tu Službu osnovane?",
    court_position:
      "Apelacioni sud u Novom Sadu odbija žalbe većine tužilaca, ali usvaja žalbu jednog tužioca i vraća predmet na ponovni postupak. Kada se ukida cela organizaciona jedinica, kriterijumi se ne primenjuju jer nema izbora između zaposlenih; izuzetak važi za tužioca čije okolnosti zahtevaju posebno ispitivanje.",
    reasoning:
      "Kriterijumi se primenjuju kada je potrebno izvršiti izbor između više zaposlenih koji rade na određenim poslovima, a određeni broj je višak — tj. kada i dalje postoji potreba za određenim brojem izvršilaca. Kada se ukida cela Služba ATP i svi poslovi koji su se u njoj obavljali, tuženi nije imao zakonsku obavezu da uspostavlja kriterijume. Tužioci su potpisali anekse o raspoređivanju u Službu ATP i nisu ih poništavali. U Programu je konstatovano da se mere iz čl. 155. stav 1. tačka 5. ZOR (premeštaj, prekvalifikacija) zbog prirode poslova i organizacije rada ne mogu primeniti.",
    keywords: [
      "tehnološki višak",
      "ukidanje organizacione jedinice",
      "kriterijumi se ne primenjuju",
      "aneks o raspoređivanju",
      "mere zapošljavanja",
    ],
    related_articles: [
      "čl. 155 stav 1 tačka 5 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "partially",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 465/2020",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada su zaposlene odbile da potpišu ponuđeni aneks ugovora o radu o radu sa nepunim radnim vremenom, koji je predstavljao meru za rešavanje viška zaposlenih?",
    court_position:
      "Apelacioni sud potvrđuje zakonitost otkaza. Ponuda rada sa nepunim radnim vremenom kao mera za rešavanje viška zaposlenih bila je zakonita, a njeno odbijanje predstavlja zakoniti otkazni razlog.",
    reasoning:
      "Tuženi je Odlukom od 29.03.2018. utvrdio višak na poslovima pomoćni radnik–higijeničar u ogranku Gornji Milanovac (smanjenje broja izvršilaca sa 2 na 1), ali je Pravilnikom o izmenama omogućio da obe tužilje zadrže radno mesto kroz rad sa pola radnog vremena. Tužilje su obaveštene da odbijanje aneksa predstavlja osnov za otkaz po čl. 179. stav 5. tačka 2. ZOR, uz pravo da u sudskom postupku osporavaju zakonitost i aneksa i otkaza. Budući da su tužilje odbile ponuđeni aneks, otkaz je zakonit.",
    keywords: [
      "tehnološki višak",
      "aneks ugovora o radu",
      "rad sa nepunim radnim vremenom",
      "mera za rešavanje viška",
      "odbijanje aneksa",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 155 stav 1 tačka 5 ZOR",
      "čl. 179 stav 5 tačka 2 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1186/2021",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada sudovi nižeg stepena nisu proverili da li je program rešavanja viška sadržao obavezan spisak zaposlenih koji su višak?",
    court_position:
      "Vrhovni kasacioni sud ukida nižestepene presude kojima je odbijen zahtev za poništaj otkaza i vraća predmet na ponovni postupak. Sudovi su propustili da utvrde da li je Program sadržao spisak zaposlenih koji su višak — taj element je neophodan za ocenu zakonitosti otkaza.",
    reasoning:
      "Nižestepeni sudovi su konstatovali da je donošenju rešenja o otkazu od 20.01.2016. prethodilo donošenje Programa od 12.01.2016. i Pravilnika o sistematizaciji, ali su propustili da ocene da li je Program sadržao spisak zaposlenih koji su višak u smislu čl. 155. stav 1. ZOR i da li je tužilja bila na tom spisku. Od toga zavisi zakonitost rešenja o otkazu. U ponovnom postupku prvostepeni sud mora utvrditi te činjenice.",
    keywords: [
      "tehnološki višak",
      "program rešavanja viška",
      "spisak zaposlenih koji su višak",
      "nepotpuno utvrđeno činjenično stanje",
    ],
    related_articles: [
      "čl. 155 stav 1 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2573/2019",
    legal_area: "labor",
    legal_question:
      "Da li je rešenje o otkazu nezakonito kada ne sadrži jasno obrazloženje koji su kriterijumi primenjeni i zašto je baš tužilac proglašen viškom u odnosu na drugog izvršioca na istim poslovima?",
    court_position:
      "Vrhovni kasacioni sud potvrđuje nižestepene presude o poništaju otkaza. Rešenje o otkazu zbog tehnološkog viška mora sadržati jasno obrazloženje koji su kriterijumi primenjeni i zašto je baš tužilac proglašen viškom u odnosu na ostale izvršioce.",
    reasoning:
      "Program rešavanja viška sadržao je tabelarni prikaz radnih mesta predmet racionalizacije. Radno mesto tužioca nije ukinuto, ali je broj izvršilaca sveden sa dva na jednog. Programom su predviđeni osnovni kriterijumi (godine staža kod poslodavca i ranije) i dopunski kriterijumi. Međutim, rešenje o otkazu ne sadrži obrazloženje zašto je baš tužilac — a ne drugi izvršilac — proglašen viškom, tj. koji su konkretni kriterijumi primenjeni i kakvi su rezultati njihove primene na oba zaposlena. Bez takvog obrazloženja rešenje je nezakonito.",
    keywords: [
      "tehnološki višak",
      "obrazloženje rešenja o otkazu",
      "primena kriterijuma",
      "dva izvršioca",
      "nezakonit otkaz",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
      "čl. 185 ZOR",
    ],
    outcome: "plaintiff_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 6333/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je rešenje o prestanku službe civilnog lica u Vojsci Srbije nezakonito kada je radno mesto ukinuto u skladu sa Zakonom o Vojsci i Uredbom o transformaciji, ali drugostepeni organ nije odgovorio na sve žalbene navode o kriterijumima?",
    court_position:
      "Upravni sud odbija tužbu civilnog lica i potvrđuje zakonitost prestanka službe. Prestanak službe je zakonit jer je radno mesto ukinuto u skladu sa Zakonom o Vojsci Srbije i Uredbom o transformaciji.",
    reasoning:
      "Tužilja je isticala da je višak utvrđen 15.10.2008. pre donošenja nove formacije od 31.10.2008., te da drugostepeni organ nije odgovorio na navode o kriterijumima, jer — kako navodi — 'višak ne postoji ako se samo promeni naziv radnog mesta, a poslovi ostanu isti.' Tužilja se bavila kontrolom, opravkom i slaganjem padobrana, a ti poslovi su predviđeni i novom formacijom sa istim brojem izvršilaca. Upravni sud, međutim, odbija tužbu jer je celokupna procedura sprovedena u skladu sa Zakonom o Vojsci Srbije i Uredbom o transformaciji, a prestanak službe je zakonit osnov.",
    keywords: [
      "tehnološki višak",
      "civilno lice u Vojsci Srbije",
      "transformacija",
      "promena naziva radnog mesta",
      "kriterijumi za višak",
    ],
    related_articles: [
      "Zakon o Vojsci Srbije",
      "Uredba o transformaciji",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "GŽ1 3775/2012",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit kada je zaposlena premeštena aneksom u organizacionu jedinicu (filijalu) koja je potom ukinuta u okviru programa rešavanja viška, bez mogućnosti raspoređivanja na druga radna mesta?",
    court_position:
      "Apelacioni sud potvrđuje prvostepenu presudu kojom je odbijen tužbeni zahtev za poništaj otkaza. Otkaz je zakonit — tužilja je zakonito premeštena u filijalu; ta filijala je potom ukinuta u okviru zakonito sprovedenog programa, a raspoređivanje na druga radna mesta nije bilo moguće.",
    reasoning:
      "Izvršni odbor tuženog je 06.07.2011. doneo odluku o sprovođenju predloga programa rešavanja viška. Program je naveo razloge viška: smanjenje obima poslovanja, nerentabilnost pojedinih organizacionih delova, gašenje nerentabilnih filijala i ekspozitura, smanjenje broja zaposlenih na ekonomski opravdani nivo. Zaposlenima kojima se ne može obezbediti rešavanje radno-pravnog statusa na načine utvrđene programom otkazuje se ugovor o radu uz isplatu otpremnine. NSZ je dostavila mišljenje da ne postoje slobodna radna mesta odgovarajućih zanimanja. Program je sadržao sve neophodne zakonske elemente.",
    keywords: [
      "tehnološki višak",
      "premeštaj aneksom",
      "ukidanje filijale",
      "program rešavanja viška",
      "mogućnost raspoređivanja",
      "zakonitost otkaza",
    ],
    related_articles: [
      "čl. 153 ZOR",
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "defendant_won",
    source_url: "https://sudskapraksa.rs",
  },

  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3193/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zakonit u slučaju radno neangažovane radnice sa Kosova i Metohije, i da li su mogli biti primenjeni drugi kriterijumi za određivanje tehnološkog viška u konkretnim okolnostima?",
    court_position:
      "Vrhovni sud ukida nižestepene presude koje su poništile otkaz i vraća predmet na ponovni postupak radi utvrđivanja relevantnih činjenica — posebno da li su se u konkretnim okolnostima mogli primeniti drugi kriterijumi za tehnološki višak.",
    reasoning:
      "Tužilja smatra da je rešenje o prestanku radnog odnosa nezakonito jer nije ispoštovana zakonska procedura određivanja viška zaposlenih u skladu sa Zakonom o radu. Tuženi navodi da je na osnovu sprovedenog postupka i u skladu sa uslovima i opštim aktima doneo osporeno rešenje. Vrhovni sud utvrđuje da nižestepeni sudovi nisu potpuno utvrdili sve relevantne činjenice — naročito pitanje da li su u konkretnim okolnostima (radno neangažovana zaposlena sa KiM) mogli biti primenjeni drugi kriterijumi za tehnološki višak. Predmet se vraća na ponovni postupak.",
    keywords: [
      "tehnološki višak",
      "radno neangažovana zaposlena",
      "Kosovo i Metohija",
      "kriterijumi za višak",
      "nepotpuno utvrđeno činjenično stanje",
    ],
    related_articles: [
      "čl. 155 ZOR",
      "čl. 179 stav 5 tačka 1 ZOR",
    ],
    outcome: "remanded",
    source_url: "https://sudskapraksa.rs",
  },
]
