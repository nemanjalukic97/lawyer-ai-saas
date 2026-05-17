// scripts/case-law-family-serbia-2.ts
// Serbian family case law — child support / modification (complete: 3 batches).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_FAMILY_SERBIA_2: CaseLawInput[] = [
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 22230/2024",
    legal_area: "family",
    legal_question:
      "Da li je pravilno potvrđeno povećanje doprinosa za izdržavanje maloletnog deteta i da li uvećana obaveza teče od dana podnošenja tužbe za izmenu?",
    court_position:
      "Vrhovni sud je odbio reviziju maloletne tužilje i potvrdio povećanje izdržavanja na 35.000 dinara mesečno kao adekvatno potrebama deteta i mogućnostima oca, uz obrazloženje u vezi člana 162. stav 3. Porodičnog zakona.",
    reasoning:
      "Promena visine izdržavanja moguća je po članu 164. Porodičnog zakona kada se promene okolnosti. U konkretnom slučaju pravilno je utvrđeno da su se potrebe deteta povećale (starije je četiri godine), a da otac može veći doprinos. Kriterijum iz člana 162. stav 3. (životni standard roditelja dužnika) shvatiti kao dopunsko pravilo; dosuđeni iznos zadovoljava potrebe deteta i standard oca bez ugrožavanja njegove egzistencije. Revizija u delu delimičnog odbijanja zahteva tužilje nije osnovana.",
    keywords: ["izdržavanje dece", "izmena visine", "član 164. PZ", "član 162. stav 3. PZ", "revizija"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ", "član 414. stav 1. ZPP"],
    headnote: "Potvrđeno povećanje alimentacije; 35.000 RSD mesečno u skladu sa potrebama deteta i standardom dužnika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 674/2016",
    legal_area: "family",
    legal_question:
      "Da li nezaposlenost majke i njena zdravstvena ograničenja isključuju ili drastično smanjuju njen doprinos za izdržavanje dece iz prethodnog braka?",
    court_position:
      "Sud je odbio reviziju tužene i potvrdio povećanje obaveze izdržavanja; nezaposlenost i odrežena fizička ograničenja ne oslobađaju roditelja obaveze prema deci u smislu člana 75. PZ.",
    reasoning:
      "Utvrđene su potrebe dece i promena okolnosti u smislu člana 164. PZ. Tužilja može obavljati poslove koji nisu vezani isključivo za dugo stajanje; radna nesposobnost nije utvrđena. Deca imaju pravo na izdržavanje od oba roditelja; simboličan iznos od 3.000 dinara za oba deteta ne može ostati jer ne zadovoljava potrebe.",
    keywords: ["izdržavanje", "nezaposlenost", "radna sposobnost", "član 75. PZ", "član 164. PZ"],
    related_articles: ["član 75. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Povećanje izdržavanja potvrđeno; blaga zdravstvena ograničenja i nezaposlenost ne ukidaju obavezu prema deci.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1928/2016",
    legal_area: "family",
    legal_question:
      "Da li je osnovano smanjenje alimentacije ocu kada prethodna presuda doneta u njegovom odsustvu nije cela uzela u obzir njegove obaveze prema drugoj deci?",
    court_position:
      "Revizija tužene je odbačena; potvrđeno je smanjenje izdržavanja jer prethodna odluka nije merodavno utvrđivala sve okolnosti, uključujući očeve obaveze prema drugo dvoje dece.",
    reasoning:
      "Kod ranije presude otac nije učestvovao (nepoznata adresa); zahtev je bio usvojen u visini od 25.000 dinara što je pravilno ocenjeno kao previsoko s obzirom na obaveze prema drugoj deci. Smanjenje na 18.000 dinara je pravilno odmereno; okolnost da 18.000 predstavlja zakonski minimum ne čini odluku nepravilnom jer otac ima sličnu obavezu i prema maloletnim ćerkama.",
    keywords: ["smanjenje alimentacije", "prethodna presuda", "odsustvo stranke", "više dece", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 164. PZ"],
    headnote: "Smanjenje alimentacije opravdano kada ranija odluka nije obuhvatila sve porodične i finansijske okolnosti dužnika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 17502/2022",
    legal_area: "family",
    legal_question:
      "Da li su ispunjeni uslovi za povećanje doprinosa oca za izdržavanje maloletnog deteta sa 8.000 na 12.000 dinara?",
    court_position:
      "Odbačena je revizija tuženog; potvrđeno je da su se okolnosti promenile i da je povećanje u skladu sa članovima 154, 160. i 164. PZ.",
    reasoning:
      "Nižestepeni sudovi su pravilno primenili član 164. PZ. U postupku je saslušana zakonska zastupnica deteta, a tuženi nije osporio izmenjene okolnosti; revizijski prigovor na istražno načelo nije osnovan. Potrebe deteta i mogućnosti roditelja podržavaju povećanje.",
    keywords: ["povećanje izdržavanja", "istražno načelo", "član 164. PZ", "maloletnik"],
    related_articles: ["član 154. stav 1. PZ", "član 160. PZ", "član 164. PZ", "član 414. ZPP"],
    headnote: "Povećanje alimentacije potvrđeno; nedostatak osporavanja činjenica o promeni okolnosti oslabio reviziju.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 276/2017",
    legal_area: "family",
    legal_question:
      "Da li prvostepeni sud može smanjiti izdržavanje bez potpunog utvrđivanja stvarnih mesečnih potreba deteta i jasnog obrazloženja promene okolnosti?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu zbog bitne povrede postupka i nepotpunog činjeničnog utvrđivanja potreba primaoca izdržavanja i okolnosti stranaka.",
    reasoning:
      "Za izmenu po članu 164. PZ sud mora utvrditi promenu okolnosti na strani i primaoca i davaoca izdržavanja. Prvostepeni sud nije dao dovoljne razloge o obimu promene imovinskih prilika, potreba i mogućnosti u odnosu na raniju odluku, niti je u skladu sa članom 160. stav 1. PZ pouzdano utvrdio potrebe deteta.",
    keywords: ["bitna povreda postupka", "potrebe deteta", "član 160. PZ", "član 164. PZ", "ukidanje"],
    related_articles: ["član 154. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Ukidanje smanjenja alimentacije zbog nepotpunog utvrđivanja potreba deteta i promene okolnosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 247/2016",
    legal_area: "family",
    legal_question:
      "Da li promena okolnosti opravdava povećanje alimentacije, izmenu modela viđanja i odbijanje zahteva majke za samostalno roditeljsko pravo?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je povećanje njenog doprinosa, izmena viđanja i da otac nastavlja samostalno roditeljsko pravo, u najboljem interesu deteta.",
    reasoning:
      "CSR i nalazi podržavaju da je otac angažovaniji i pouzdaniji u brini o detetu, dok je majka pasivnija; dete je kontinuirano kod oca. Promena okolnosti (vrtić, prihodi majke i partnera) opravdava povećanje alimentacije po članu 164. PZ uz primenu člana 160. PZ.",
    keywords: ["roditeljsko pravo", "izdržavanje", "CSR", "najbolji interes deteta", "član 164. PZ"],
    related_articles: ["član 6. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije i očevo samostalno roditeljsko pravo na osnovu stručnih nalaza i promene okolnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 16235/2024",
    legal_area: "family",
    legal_question:
      "Da li je 13.000 dinara mesečno od svakog roditelja dovoljno za potrebe maloletnog deteta uz obaveze prema mlađoj deci oba roditelja?",
    court_position:
      "Odbačena je revizija maloletne tužilje; ukupno 26.000 dinara mesečno (po 13.000) pravilno odgovara potrebama deteta i mogućnostima roditelja.",
    reasoning:
      "Uslovi za izmenu po članu 164. PZ su ispunjeni. Drugostepeni sud je pravilno ocenio član 160. PZ, uključujući obavezu oba roditelja prema mlađoj deci i slične prihode roditelja. Procena posebnih troškova ishrane nije potkrepljena medicinskom dokumentacijom. Osporavanje činjenica u reviziji nije dopušteno po članu 407. stav 2. ZPP.",
    keywords: ["izdržavanje", "oba roditelja", "član 160. PZ", "član 164. PZ", "revizija činjenica"],
    related_articles: ["član 160. PZ", "član 164. PZ", "član 407. stav 2. ZPP"],
    headnote: "Potvrđeno ukupno 26.000 RSD mesečno za dete; prag nije prekoračen s obzirom na obaveze prema drugoj deci.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8328/2021",
    legal_area: "family",
    legal_question:
      "Da li novi brak i rođenje dece opravdavaju smanjenje alimentacije sa 1.000 na 300 evra?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je da tužilac nije dokazao promenjene okolnosti koje bi opravdale smanjenje, s obzirom na porast potreba deteta.",
    reasoning:
      "Po članovima 160. i 164. PZ smanjenje zahteva dokazane promene okolnosti. Dete je znatno starije sa većim potrebama (vanškolske aktivnosti); smanjenje nije u najboljem interesu deteta (član 162. stav 6. i stav 3. PZ). Novi brak i rođenje dece sami po sebi ne opravdavaju smanjenje.",
    keywords: ["smanjenje alimentacije", "novi brak", "najbolji interes deteta", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. i 6. PZ", "član 164. PZ"],
    headnote: "Odbijeno smanjenje alimentacije; porast potreba deteta nadmašuje argument novog braka i dece.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 681/2021",
    legal_area: "family",
    legal_question:
      "Da li je 150 evra mesečno previsok doprinos oca u odnosu na član 160. stav 3. i 162. stav 3. PZ nakon povećanja izdržavanja?",
    court_position:
      "Revizija tuženog je delimično usvojena; VKS je preinačio presudu i smanjio doprinos sa 150 na 100 evra mesečno.",
    reasoning:
      "Uslovi za izmenu po članu 164. PZ postoje, ali je drugostepeni sud previsoko odmerio obavezu u odnosu na kriterijume iz člana 160. stav 3. i člana 162. stav 3. PZ. Revident je osnovano ukazao na disproporciju između potreba deteta i mogućnosti oca.",
    keywords: ["preinačenje", "alimentacija", "član 160. stav 3. PZ", "član 162. stav 3. PZ", "evro"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 164. PZ"],
    headnote: "Delimično usvojena revizija: alimentacija smanjena sa 150 na 100 EUR zbog previsokog odmeravanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13185/2023",
    legal_area: "family",
    legal_question:
      "Da li su nižestepeni sudovi pravilno smanjili alimentaciju bez jasnog poređenja promene okolnosti sa prethodnom odlukom i pravilnog tretmana sporazuma o izdržavanju?",
    court_position:
      "Vrhovni sud je ukinuo presude i vratio predmet na ponovno suđenje zbog nepotpunog utvrđivanja promenjenih okolnosti i veze sa prethodnom odlukom.",
    reasoning:
      "Sudovi nisu razjasnili koje su okolnosti bile merodavne za prethodnu odluku i da li su se promenile. Završeci o doprinosu kroz sporazum o ustupanju ne mogu zameniti analizu uslova za smanjenje po članu 164. PZ. Ostalo je neutvrđen vremenski obuhvat i odnos prema dospelim iznosima.",
    keywords: ["ukidanje", "član 164. PZ", "nepotpuno utvrđivanje", "izmena alimentacije"],
    related_articles: ["član 160. PZ", "član 164. PZ", "ZPP – revizija"],
    headnote: "Vraćanje predmeta: nije utvrđeno da li i kako su se promenile okolnosti u odnosu na prethodnu odluku o alimentaciji.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5024/2019",
    legal_area: "family",
    legal_question:
      "Da li je drugostepeni sud previsoko povećao alimentaciju na 250 evra u odnosu na mogućnosti oca?",
    court_position:
      "Delimično usvojena revizija tuženog; preinačena je drugostepena presuda i alimentacija smanjena sa 250 na 200 evra mesečno.",
    reasoning:
      "Prvostepeni sud je utvrdio promenu po članu 164. PZ, ali je drugostepeni sud pri povećanju na 250 evra preterao u primeni člana 160. stav 3. i člana 162. stav 3. PZ. Revident je osnovano osporio visinu u odnosu na realne mogućnosti dužnika izdržavanja.",
    keywords: ["preinačenje", "alimentacija", "evro", "član 160. PZ", "član 162. PZ"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 164. PZ"],
    headnote: "Smanjenje sa 250 na 200 EUR: drugostepeni sud je previsoko odmerio doprinos u odnosu na mogućnosti oca.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 18433/2022",
    legal_area: "family",
    legal_question:
      "Da li starost deteta i porast potreba opravdavaju povećanje alimentacije u procentu od plate oca?",
    court_position:
      "Odbačena je revizija tuženog; potvrđeno je povećanje izdržavanja jer su se okolnosti promenile i procena veštaka i sudskih kriterijuma iz člana 160. PZ pravilna.",
    reasoning:
      "Primenjeni su članovi 160, 162. stav 3. i 164. PZ. Dete je starije sa većim potrebama; tuženi može doprinositi u dosuđenom procentu plate. Navodi o pogrešnoj primeni materijalnog prava i ignorisani sporazum kao osnova ranije odluke nisu osnovani jer su okolnosti pravilno upoređene.",
    keywords: ["povećanje alimentacije", "procenat od plate", "član 164. PZ", "veštak"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije u procentu od zarade zbog starijeg deteta i većih potreba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2 296/2013",
    legal_area: "family",
    legal_question:
      "Da li povećane potrebe deteta sa posebnim potrebama automatski zahtevaju povećanje alimentacije ako su se pogoršale mogućnosti oca?",
    court_position:
      "Apelacioni sud je usvojio žalbu oca, preinačio presudu i odbio zahtev za povećanje; po članu 164. PZ promene na strani deteta i dužnika zajedno ne daju osnov za povećanje.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. Iako su potrebe deteta veće, otac nije stalno zaposlen, ostvaruje niske i varijabilne prihode i izdržava još jedno dete; majka doprinosi i radom. Promenjene okolnosti ne opravdavaju povećanje u konkretnom slučaju.",
    keywords: ["dete sa posebnim potrebama", "član 164. PZ", "mogućnosti dužnika", "odbijanje povećanja"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Odbijeno povećanje alimentacije: povećane potrebe deteta ne prevazilaze pogoršane mogućnosti oca i doprinos majke.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4138/2025",
    legal_area: "family",
    legal_question:
      "Da li uzrast deteta i porast životnih potreba opravdavaju povećanje alimentacije na 15.000 dinara mesečno?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je povećanje sa primenom minimalne sume izdržavanja i članova 160, 162. stav 3. i 164. PZ.",
    reasoning:
      "Nižestepeni sudovi su pravilno utvrdili promenu okolnosti po članu 164. PZ u odnosu na raniju presudu iz 2013. Obavezujući je doprinos od 15.000 dinara od dana podnošenja tužbe, u skladu sa potrebama deteta i mogućnostima oca i minimalnom sumom (45.741 RSD u relevantnom trenutku).",
    keywords: ["povećanje izdržavanja", "minimalna suma", "član 160. stav 4. PZ", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ", "član 6. PZ"],
    headnote: "Potvrđeno povećanje na 15.000 RSD mesečno zbog starijeg deteta i promene okolnosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1792/2025",
    legal_area: "family",
    legal_question:
      "Da li su povećane potrebe deteta i veći prihodi oca osnov za povećanje alimentacije na 20.000 dinara mesečno?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je povećanje doprinosa za izdržavanje maloletnog deteta.",
    reasoning:
      "Primenjeni su članovi 154. stav 1, 160. i 164. PZ. Okolnosti su se promenile i na strani deteta (veće potrebe) i na strani oca (veći prihodi). Kriterijumi iz člana 160. PZ pravilno su ocenjeni; preostali deo potreba obezbeđuje majka kao drugi obveznik.",
    keywords: ["povećanje alimentacije", "prihodi roditelja", "član 164. PZ"],
    related_articles: ["član 154. stav 1. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje na 20.000 RSD mesečno zbog većih potreba deteta i boljih primanja oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2033/2020",
    legal_area: "family",
    legal_question:
      "Da li promena uzrasta deteta i uvećane potrebe zahtevaju povećanje već utvrđenog procentualnog doprinosa oca?",
    court_position:
      "Odbačena je revizija maloletne tužilje; potvrđeno je da nema osnova za povećanje procenta uprkos delimično većim potrebama, uzimajući u obzir i dečji dodatak.",
    reasoning:
      "Primenjeni su članovi 75, 160. i 164. PZ. Potrebe su porasle, ali dete ostvaruje dečji dodatak koji delimično pokriva povećanje; ukupna ocena ne zahteva veći procenat od već utvrđenog doprinosa oca.",
    keywords: ["procentualna alimentacija", "dečji dodatak", "član 164. PZ"],
    related_articles: ["član 75. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Odbijeno dodatno povećanje procenta alimentacije jer su nove potrebe delimično pokrivene dečjim dodatkom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 16827/2023",
    legal_area: "family",
    legal_question:
      "Da li je pravilno određen doprinos majke od 20% primanja umesto fiksnog iznosa i da li je sud vezan granicama tužbenog zahteva?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je 20% redovnih mesečnih primanja kao alimentacija u skladu sa protivtužbenim zahtevom oca i članovima 160. i 162. PZ.",
    reasoning:
      "Sud nije vezan isključivo tužbenim zahtevom u fiksnom iznosu kada je otac u odgovoru tražio procenat. Drugostepeni sud je pravilno preinačio prvostepenu odluku. Primenjeni su kriterijumi najboljeg interesa deteta (članovi 6. i 266. PZ) i standard dužnika (član 162. stav 3. PZ).",
    keywords: ["procenat primanja", "protivtužba", "član 162. stav 1. PZ", "granice tužbe"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 164. PZ", "član 6. PZ"],
    headnote: "Potvrđeno 20% primanja majke: sud može odrediti procenat kada je to predloženo u odgovoru na tužbu za izmenu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 229/2017",
    legal_area: "family",
    legal_question:
      "Da li otac može tražiti izmenu sa fiksnog na procenat izdržavanja i da li izmena teče od podnošenja tužbe ili od presuđenja?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i povećao doprinos sa 17% na 20% neto primanja oca; odbijeni su prigovori o prekoračenju tužbe i o datumu početka izmene.",
    reasoning:
      "Po članu 162. stav 1. PZ, ako je ranije određen procenat, dužnik ne može tražiti promenu načina na fiksni iznos u izmeni, ali može tražiti izmenu visine po članu 164. PZ. Činjenice o promeni okolnosti utvrđuju se za period od podnošenja tužbe, pa i izmena važi od tog momenta, a ne od presuđenja.",
    keywords: ["procenat od primanja", "član 162. stav 1. PZ", "datum početka", "član 164. PZ"],
    related_articles: ["član 162. stav 1. PZ", "član 164. PZ"],
    headnote: "Povećanje sa 17% na 20% zarade; izmena visine u procentu ostaje merodavna ako je ranije tako određeno.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13/2022",
    legal_area: "family",
    legal_question:
      "Da li je pravilno utvrđeno povećanje alimentacije na 15% primanja tuženog nakon promene okolnosti?",
    court_position:
      "Odbačena je revizija majke tužilje; potvrđena je odluka o povećanju na 15% redovnih primanja tuženog.",
    reasoning:
      "Pravilno je primenjeno materijalno pravo iz članova 160, 162. stav 3. i 164. PZ. Drugostepeni sud je ocenio promenjene okolnosti, potrebe deteta i mogućnosti roditelja; revizijski navodi nisu osnovani.",
    keywords: ["procenat alimentacije", "član 162. PZ", "član 164. PZ", "revizija"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 164. PZ"],
    headnote: "Potvrđeno 15% primanja kao merodavna visina posle izmene okolnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 479/2024",
    legal_area: "family",
    legal_question:
      "Da li fiksni iznos alimentacije postaje ispod zakonskog minima u procentu kada dete poraste i da li treba preći na veći procenat od primanja oca?",
    court_position:
      "Potvrđena je izmena sa fiksnog iznosa na 20% primanja oca; apelacioni sud je naveo da bi ostajanje na starom fiksnom iznosu bilo u suprotnosti sa članom 162. stav 2. PZ (donja granica 15% kada je alimentacija u procentima).",
    reasoning:
      "Potrebe deteta su porasle (uzrast, zdravlje); primanja oca su znatno veća. Ranja fiksna alimentacija odgovarala bi oko 10% primanja, ispod minimalnog procenta iz člana 162. stav 2. PZ. Po članu 164. PZ uslovi za izmenu su ispunjeni. Po žalbi oca nije preinačen datum početka izmene radi načela reformatio in peius.",
    keywords: ["član 162. stav 2. PZ", "minimalni procenat", "izmena sa fiksnog na procenat", "reformatio in peius"],
    related_articles: ["član 160. PZ", "član 162. stav 2. PZ", "član 164. PZ"],
    headnote: "Potvrđen prelazak na 20% zarade jer bi stari fiksni iznos bio ispod minimalnog procenta po PZ.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 478/2021",
    legal_area: "family",
    legal_question:
      "Da li isti razlozi kao u nedavnoj odbijenoj tužbi za smanjenje alimentacije mogu ponovo osnovati smanjenje u kratkom roku?",
    court_position:
      "Apelacioni sud je odbio žalbu oca i potvrdio odbijanje zahteva za smanjenje; iako su se okolnosti delimično menjale, kvalitet promene ne opravdava novu izmenu.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. Materijalne mogućnosti oca i potrebe deteta su se menjale, ali ranije utvrđeni iznos i dalje odgovara potrebama deteta i mogućnostima oca. Ponavljanje istovetnih razloga kratko nakon pravnosnažnog odbijanja sličnog zahteva nije prihvaćeno.",
    keywords: ["smanjenje alimentacije", "nepromenjene okolnosti", "član 164. PZ", "ponovljeni razlozi"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Odbijeno smanjenje: kratko vreme i istovetni razlozi kao u ranijoj odluci; balans potreba i mogućnosti ostaje isti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5534/2021",
    legal_area: "family",
    legal_question:
      "Da li kreditna zaduženja lične prirode oca opravdavaju smanjenje alimentacije prema maloletnom detetu?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je odbijanje zahteva za smanjenje alimentacije.",
    reasoning:
      "Primenjeni su članovi 160, 162. stav 3. i 164. PZ. Iako su se okolnosti menjale na obema stranama, ukupna ocena ne ispunjava uslove za smanjenje obaveze prema ćerki; kreditna zaduženja lične prirode ne predstavljaju dovoljno jak razlog u odnosu na prioritet izdržavanja deteta.",
    keywords: ["kredit", "smanjenje alimentacije", "član 164. PZ", "maloletnik"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Lični krediti oca ne opravdavaju smanjenje alimentacije kada dete i dalje zahteva postojeći nivo podrške.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 21885/2024",
    legal_area: "family",
    legal_question:
      "Da li je po 15.000 dinara mesečno od majke za dvoje dece u skladu sa članovima 160–162. PZ i minimalnom sumom?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je da je obaveza od po 15.000 dinara mesečno po detetu pravilno odmerena.",
    reasoning:
      "Primenjeni su članovi 154, 160, 160. stav 4, 162. stav 3. i 164. PZ. Sud je vodio računa o potrebama dece, primanjima tužene, minimalnoj sumi i standardu roditelja dužnika. Revizija nije osporila pravilnost primene ovih kriterijuma.",
    keywords: ["alimentacija", "minimalna suma", "član 160. stav 4. PZ", "dvoje dece"],
    related_articles: ["član 154. stav 1. PZ", "član 160. PZ", "član 162. stav 3. PZ"],
    headnote: "Potvrđeno po 15.000 RSD mesečno po detetu u skladu sa potrebama, minimalnom sumom i mogućnostima majke.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 201/2021",
    legal_area: "family",
    legal_question:
      "Da li kratko vreme i blagi porast školskih troškova punoletnog učenika zahtevaju povećanje alimentacije kada su se očeve mogućnosti pogoršale zbog zdravlja?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva za povećanje alimentacije; luksuzne i afinitetske potrebe ne mogu prevladati mogućnosti dužnika.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. U kratkom roku potrebe učenika nisu značajno veće; otac ima dodatne nužne medicinske troškove. Vanškolski sadržaji i putovanja moraju se meriti prema standardu i mogućnostima dužnika izdržavanja, a ne samo željama poverioca.",
    keywords: ["punoletni učenik", "povećanje alimentacije", "član 164. PZ", "standard dužnika"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Odbijeno povećanje: kratak period i neznatna promena potreba, uz pogoršane mogućnosti oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 6277/2021",
    legal_area: "family",
    legal_question:
      "Da li je majka pasivno legitimisana u tužbi oca za smanjenje alimentacije maloletnog deteta?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je da tužba protiv majke nema pasivnu legitimaciju jer je obveznik izdržavanja dete kao poverilac, majka je samo zakonski zastupnik.",
    reasoning:
      "Tužba za promenu visine izdržavanja podnosi se protiv deteta koje zastupa roditelj sa roditeljskim pravom. Presuda iz brakorazvodnog postupka sa sporazumom ne menja materijalnopravni odnos između oca i deteta u sporu o izmeni alimentacije. Drugostepeni sud je pravilno odbio tužbu zbog nedostatka pasivne legitimacije.",
    keywords: ["pasivna legitimacija", "izdržavanje", "zastupanje deteta", "član 414. ZPP"],
    related_articles: ["član 78. stav 1. PZ", "ZPP član 414. stav 1."],
    headnote: "Tužba za smanjenje alimentacije mora biti usmerena na dete, ne na drugog roditelja kao tuženog.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 10535/2025",
    legal_area: "family",
    legal_question:
      "Da li potpuni gubitak radne sposobnosti majke usled teškog mentalnog oboljenja omogućava povećanje njenog doprinosa za izdržavanje dece?",
    court_position:
      "Potvrđeno je odbijanje zahteva za povećanje; iako su se potrebe dece povećale, majka kao dužnik više nema realne mogućnosti za veći doprinos.",
    reasoning:
      "Primenjeni su članovi 160, 162. stav 3. i 164. PZ. Promena okolnosti na strani majke (šizofrenija, gubitak radne sposobnosti) prevaguje u odnosu na argument porasta potreba dece, pa ukupna ocena ne ispunjava uslove za povećanje obaveze tužilje.",
    keywords: ["gubitak radne sposobnosti", "povećanje alimentacije", "član 160. stav 3. PZ", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Odbijeno povećanje alimentacije majke zbog potpunog gubitka radne sposobnosti uprkos većim potrebama dece.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 1/2023",
    legal_area: "family",
    legal_question:
      "Da li polazak deteta u školu i zanemarljiva ranija alimentacija opravdavaju povećanje doprinosa nezaposlenog, ali radno sposobnog oca?",
    court_position:
      "Apelacioni sud je potvrdio povećanje obaveze oca na 15.000 dinara mesečno; nezaposlenost ne ukida obavezu ako postoje realne mogućnosti obavljanja honorarnih poslova.",
    reasoning:
      "Primenjen je član 164. PZ zbog znatno većih potreba deteta (od 3 na 7 godina, škola). Prvostepeni sud je utvrdio ukupne potrebe i uzeo u obzir minimalnu sumu, sposobnost oca za zanatske poslove i doprinos majke brigom. Uslovi za izmenu su ispunjeni.",
    keywords: ["školovanje", "nezaposlenost", "član 164. PZ", "minimalna suma izdržavanja"],
    related_articles: ["član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje na 15.000 RSD: školski uzrast i veće potrebe, otac sposoban za honorarne prihode.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 209/2024",
    legal_area: "family",
    legal_question:
      "Da li se može menjati roditeljsko pravo i alimentacija kada su se promenile školske i ekonomske okolnosti kod dece starije školske dobi?",
    court_position:
      "Potvrđena je izmena na samostalno roditeljsko pravo majke; ukinuta je odluka o visini alimentacije i predmet vraćen radi potpunog utvrđivanja stvarnih potreba dece.",
    reasoning:
      "Prvostepeni sud je doneo odluku o povećanju i početku obaveze od podnošenja tužbe uz upotrebu minimalne sume, ali apelacioni sud je u delu izdržavanja našao potrebu za potpunijim utvrđivanjem potreba i u skladu sa članovima 154–164. PZ vratio predmet na ponovno odlučivanje.",
    keywords: ["roditeljsko pravo", "izdržavanje", "ponovno suđenje", "član 164. PZ"],
    related_articles: ["član 154. PZ", "član 160. stav 4. PZ", "član 164. PZ"],
    headnote: "Potvrđena skrb majke; ukinuto izdržavanje u fiksnom iznosu radi boljeg utvrđivanja potreba dece.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 321/2021",
    legal_area: "family",
    legal_question:
      "Da li porast potreba deteta zahteva povećanje alimentacije kada je otac dobio još dvoje dece i veće porodične obaveze?",
    court_position:
      "Potvrđeno je odbijanje zahteva za povećanje; iako su potrebe dece veće, i očeve obaveze su se povećale, pa raniji procenat od 35% prihoda ostaje adekvatan.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. Paralelno sa porastom potreba deteta rastu i očeve obaveze prema drugoj deci; ukupna procena ne pokazuje osnov za novu izmenu visine.",
    keywords: ["više dece", "procenat alimentacije", "član 164. PZ", "odbijanje povećanja"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Odbijeno povećanje: novorođena deca povećavaju očeve obaveze u istoj meri kao i potrebe starijeg deteta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 61/2013",
    legal_area: "family",
    legal_question:
      "Da li porast potreba maloletnog deteta i bolji prihodi oca iz poljoprivrede i izdavanja nekretnine opravdavaju povećanje alimentacije na 20.000 dinara?",
    court_position:
      "Apelacioni sud je potvrdio povećanje na 20.000 dinara mesečno kao u skladu sa članovima 160, 162. stav 3. i 164. PZ.",
    reasoning:
      "Potrebe deteta su porasle sa uzrastom; otac ima značajne prihode od poljoprivrede i zakupa. Prvostepeni sud je pravilno odmerio odnos potreba i mogućnosti i primenio kriterijum životnog standarda dužnika iz člana 162. stav 3. PZ.",
    keywords: ["povećanje alimentacije", "prihodi od poljoprivrede", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno 20.000 RSD mesečno zbog većih potreba deteta i značajnih prihoda oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 444/2021",
    legal_area: "family",
    legal_question:
      "Da li gubitak radne sposobnosti oca i prestanak obaveze prema drugom detetu opravdavaju smanjenje alimentacije punoletnoj studentkinji?",
    court_position:
      "Potvrđeno je smanjenje doprinosa oca sa 20.000 na 15.766 dinara mesečno zbog invaliditeta i promene okolnosti po članovima 155, 160–162. i 164. PZ.",
    reasoning:
      "Otac je prešao na invalidsku penziju; prestala je obaveza prema drugom detetu; potrebe ćerke su veće ali se moraju meriti sa novim mogućnostima. Prvostepeni sud je pravilno primenio član 155. stav 2. PZ o izdržavanju punoletnog deta na redovnom školovanju i član 164. PZ o izmeni.",
    keywords: ["punoletno dete", "student", "invalidska penzija", "član 155. stav 2. PZ", "član 164. PZ"],
    related_articles: ["član 155. stav 2. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Smanjenje alimentacije studentkinje zbog gubitka radne sposobnosti oca i promene finansijskog stanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 15/2007",
    legal_area: "family",
    legal_question:
      "Da li zaključenje novog braka i izdržavanje radno sposobne supruge predstavljaju dovoljno jaku promenu okolnosti za smanjenje alimentacije?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je odbijanje zahteva za smanjenje alimentacije maloletnog sina.",
    reasoning:
      "Visina izdržavanja zavisi od potreba deteta i mogućnosti roditelja; primenjuje se i član 162. stav 3. PZ. Sam novi brak i troškovi izdržavanja zdrave supruge nisu dovoljni da pokažu promenu koja bi smanjila obavezu prema detetu.",
    keywords: ["smanjenje alimentacije", "novi brak", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Novi brak i izdržavanje supruge nisu sami po sebi osnov za smanjenje alimentacije maloletnika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1018/2021",
    legal_area: "family",
    legal_question:
      "Da li rođenje blizanaca u novoj zajednici smanjuje obavezu majke da izdržava maloletnu decu iz prethodnog braka?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je da nema osnova za smanjenje obaveze prema dvoje dece iz prvog braka.",
    reasoning:
      "Promena okolnosti mora opravdati smanjenje po članu 164. PZ. Kod maloletne dece roditelji moraju uložiti posebne napore i ne mogu se pozivati na nove troškove na štetu prvobitne obaveze; partner u novoj zajednici je zdrav i radno sposoban. Obaveza izdržavanja maloletnika je prioritetna i deljiva između roditelja.",
    keywords: ["maloletna deca", "nova deca", "član 164. PZ", "prioritet izdržavanja"],
    related_articles: ["član 160. PZ", "član 164. PZ", "član 153. stav 1. PZ", "član 207. PZ"],
    headnote: "Rođenje blizanaca u novoj zajednici ne smanjuje alimentaciju prema deci iz ranijeg braka.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4669/2021",
    legal_area: "family",
    legal_question:
      "Da li su nižestepeni sudovi pravilno povećali alimentaciju maloletnog deteta s obzirom na porast potreba i mogućnosti oca kao dužnika izdržavanja?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je povećanje doprinosa za izdržavanje u skladu sa članovima 160, 162. stav 3. i 164. Porodičnog zakona.",
    reasoning:
      "Kriterijumi iz člana 160. PZ pravilno su primenjeni. Potrebe deteta su porasle u odnosu na raniji sporazum roditelja; nižestepeni sudovi su pravilno zaključili da postoje uslovi za izmenu po članu 164. PZ. Navodi da nisu utvrđene promene u odnosu na sporazum nisu osnovani jer su okolnosti u celini ocenjene.",
    keywords: ["povećanje alimentacije", "sporazum roditelja", "član 164. PZ", "član 162. stav 3. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje izdržavanja uprkos ranijem sporazumu jer su se potrebe deteta i okolnosti promenile.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 579/2022",
    legal_area: "family",
    legal_question:
      "Da li je prvostepeni sud precenio mogućnosti nezaposlenog oca koji izdržava još jedno dete sa posebnim potrebama kada je odredio alimentaciju od 15.000 dinara?",
    court_position:
      "Apelacioni sud je preinačio presudu i smanjio doprinos oca sa 15.000 na 10.000 dinara mesečno, uzimajući u obzir nezaposlenost, odsustvo imovine i drugu alimentacionu obavezu.",
    reasoning:
      "Prvostepeni sud nije dovoljno srazmerio potrebe deteta sa mogućnostima i standardom dužnika u smislu člana 162. PZ. Otac ostvaruje povremene prihod od nadnice, izdržava dete sa posebnim potrebama istim iznosom; 10.000 dinara je adekvatno bez ugrožavanja egzistencije, ostatak potreba snosi majka.",
    keywords: ["preinačenje", "nezaposlenost", "više dece", "dete sa posebnim potrebama", "član 162. PZ"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 390. ZPP", "član 394. stav 1. tačka 4. ZPP"],
    headnote: "Smanjenje alimentacije sa 15.000 na 10.000 RSD zbog precenjenih mogućnosti nezaposlenog oca.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 536/2016",
    legal_area: "family",
    legal_question:
      "Da li manja zarada oca i rođenje nove dece opravdavaju dodatno smanjenje alimentacije za dve mlađe ćerke uz primenu člana 162. stav 3. PZ?",
    court_position:
      "Apelacioni sud je delimično usvojio žalbu oca i dodatno smanjio obavezu izdržavanja za mlađe ćerke, polazeći od promenjenih primanja i različitih potreba dece po uzrastu.",
    reasoning:
      "Kada je poverilac dete, alimentacija treba da obezbedi bar standard dužnika iz člana 162. stav 3. PZ. Potrebe tuženih dece tužilac ne osporava; tužilac se poziva na manju zaradu i novu decu. Okolnosti podržavaju korekciju visine doprinosa u odnosu na prvostepenu odluku.",
    keywords: ["smanjenje alimentacije", "više dece", "član 162. stav 3. PZ", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Delimično smanjenje alimentacije za mlađu decu zbog smanjenih primanja oca i novih izdržavanih lica.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1156/2025",
    legal_area: "family",
    legal_question:
      "Da li roditelji moraju angažovati imovinu, uključujući izdavanje nekretnina, da bi se obezbedio odgovarajući životni standard deteta po članu 164. PZ?",
    court_position:
      "Vrhovni sud je delimično usvojio reviziju i preinačio presude povećavajući mesečno izdržavanje na 15.000 dinara; nižestepeni sudovi su precenili raspoloživost sredstava u odnosu na stvarne mogućnosti.",
    reasoning:
      "Uslovi za izmenu po članu 164. PZ postoje. Kriterijumi iz člana 160. PZ i standard deteta iz člana 162. stav 3. PZ zahtevaju da roditelji ulože napor i koriste imovinu radi obezbeđivanja sredstava; pravilno je zaključeno da je došlo do promene okolnosti, ali je visina doprinosa ispod potrebnog nivoa pa je sud povećao iznos na 15.000 dinara.",
    keywords: ["preinačenje", "imovina", "izdavanje nekretnine", "član 160. PZ", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Delimično usvojena revizija: povećanje alimentacije na 15.000 RSD radi adekvatnog standarda deteta.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9483/2025",
    legal_area: "family",
    legal_question:
      "Od kog trenutka teče zatezna kamata na dospele rate izdržavanja kada je spor vođen radi povećanja alimentacije?",
    court_position:
      "Potvrđeno je povećanje izdržavanja zbog promenjenih okolnosti, ali je preinačena odluka o kamati: zatezna kamata teče od dana dospelosti svake rate, a ne od dana podnošenja tužbe.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ za visinu izdržavanja. Potrebe maloletne tužilje (škola, prevoz, džeparac, časovi) pravilno su utvrđene u okviru ukupnih potreba. Za kamatu važi pravilno pravno shvatanje o dospelosti pojedinačnih rata izdržavanja.",
    keywords: ["zatezna kamata", "dospelost rate", "izdržavanje", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ", "Zakon o obaveznim odnosima"],
    headnote: "Kamata na alimentaciju od dospelosti svake rate, ne od podnošenja tužbe.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 24/2018",
    legal_area: "family",
    legal_question:
      "Da li prvostepeni sud pravilno određuje visinu izdržavanja za dvoje dece u odnosu na mogućnosti oca i dodatne prihode?",
    court_position:
      "Apelacioni sud je delimično usvojio žalbu i preinačio prvostepenu presudu povećavajući iznos izdržavanja za dvoje dece, ocenjujući da otac ostvaruje i dopunske prihode pored osnovnog angažmana.",
    reasoning:
      "Žalba se svodi na obim potreba i mogućnosti roditelja, ne na bitnu povredu. Nema osnova za ukidanje po članu 374. ZPP. Promena okolnosti na strani dece i oca opravdava izmenu po članu 164. PZ; dete ima pravo na standard dužnika po članu 162. stav 3. PZ uz izbor fiksnog iznosa od strane poverioca po članu 162. stav 1. PZ.",
    keywords: ["dvoje dece", "povećanje alimentacije", "dopunski prihodi", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 164. PZ", "član 386. ZPP"],
    headnote: "Preinačenje radi većeg iznosa alimentacije kada otac ostvaruje i dodatne prihode.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 370/2021",
    legal_area: "family",
    legal_question:
      "Da li nezaposlenost oca isključuje povećanje alimentacije kada su se potrebe deteta značajno povećale od ranije odluke?",
    court_position:
      "Apelacioni sud je potvrdio povećanje doprinosa oca sa 5.000 na 15.000 dinara mesečno; nezaposlenost ne oslobađa obaveze ako postoji radna sposobnost i mogućnost honorarnog rada.",
    reasoning:
      "Prvostepeni sud je pravilno primenio član 164. PZ zbog starosti deteta i veće zarade oca u odnosu na raniju odluku. Minimalna suma izdržavanja je orijentir, ne apsolutna granica potreba deteta; primenjen je i član 162. stav 3. PZ o standardu dužnika.",
    keywords: ["povećanje alimentacije", "nezaposlenost", "minimalna suma", "član 160. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje sa 5.000 na 15.000 RSD: veće potrebe deteta i veća ostvarena primanja oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2300/2020",
    legal_area: "family",
    legal_question:
      "Da li su ispunjeni uslovi za povećanje alimentacije na 130 evra mesečno s obzirom na promenu potreba deteta i mogućnosti majke?",
    court_position:
      "Odbačene su revizije i tužilje i tužene; potvrđena je odluka o povećanju doprinosa majke za izdržavanje maloletnog deteta na 130 evra mesečno.",
    reasoning:
      "Pravilno je primenjeno materijalno pravo iz članova 160, 162. stav 3. i 164. PZ. Nižestepeni sudovi su utvrdili promenu okolnosti koja opravdava izmenu visine izdržavanja u odnosu na ranju odluku, uz pravilnu procenu potreba deteta i mogućnosti majke kao dužnika izdržavanja.",
    keywords: ["povećanje alimentacije", "evro", "član 164. PZ", "obostrane revizije"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno 130 EUR mesečno; obe revizije neosnovane.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 428/2021",
    legal_area: "family",
    legal_question:
      "Da li potpuni gubitak radne sposobnosti majke-dužnika opravdava smanjenje alimentacije uprkos porastu potreba deteta?",
    court_position:
      "Potvrđeno je odbijanje zahteva za povećanje doprinosa majke i usvojen protivtužbeni zahtev za smanjenje sa 20% zarade na 15% njene invalidske penzije.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. Majka je u potpunosti izgubila radnu sposobnost; potrebe deteta su porasle, ali visina obaveze mora ostati u okviru mogućnosti dužnika i njegovog standarda. Sud je pravilno uravnotežio porast potreba sa gubitkom primanja majke.",
    keywords: ["invalidska penzija", "smanjenje alimentacije", "član 164. PZ", "protivtužba"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Smanjenje sa 20% zarade na 15% penzije zbog potpunog gubitka radne sposobnosti majke.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5835/2024",
    legal_area: "family",
    legal_question:
      "Da li porast potreba maloletnog sina i bolje mogućnosti oca opravdavaju povećanje alimentacije?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđene su nižestepene presude kojima je povećan doprinos za izdržavanje maloletnog sina.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. Nižestepeni sudovi su pravilno zaključili da je došlo do promene okolnosti koja zahteva izmenu ranije odluke o iznosu izdržavanja, u skladu sa potrebama deteta i mogućnostima oca.",
    keywords: ["povećanje alimentacije", "član 164. PZ", "član 162. stav 3. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije zbog većih potreba deteta i boljih mogućnosti oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 11185/2022",
    legal_area: "family",
    legal_question:
      "Da li dosuđeni iznos alimentacije može premašiti 50% redovnih mesečnih primanja dužnika kada je alimentacija određena u procentu?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude jer je dosuđeni iznos bio u suprotnosti sa članom 162. stav 2. PZ i jer činjenično stanje nije bilo potpuno utvrđeno u odnosu na realna primanja oca i ulogu majke kao obveznika.",
    reasoning:
      "Kada je alimentacija u procentu, po pravilu ne može biti veća od 50% primanja dužnika umanjenih za poreze i doprinose. Ukupno dosuđenih 30.000 dinara prelazi tu granicu. Povećanje nije bilo merodavno povezano sa promenom okolnosti u smislu člana 164. PZ; nisu pravilno ocenjene ni mogućnosti majke kao drugog obveznika po članu 154. stav 1. PZ.",
    keywords: ["član 162. stav 2. PZ", "procenat alimentacije", "50%", "ukidanje"],
    related_articles: ["član 154. stav 1. PZ", "član 162. stav 2. PZ", "član 164. PZ"],
    headnote: "Ukidanje zbog prekoračenja 50% primanja i nepotpunog utvrđivanja primanja i uloge majke.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8/2020",
    legal_area: "family",
    legal_question:
      "Da li nova porodica i rođenje dece opravdavaju smanjenje procentualne alimentacije kada su se i prihodi oca i potrebe maloletnika povećali?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je da nema osnova za smanjenje postojeće obaveze izdržavanja u procentu od primanja.",
    reasoning:
      "Primenjeni su članovi 160, 162. stav 3. i 164. PZ. Došlo je do promene okolnosti i na strani deteta i na strani oca, ali kvalitet promene ne opravdava izmenu: obaveza je u skladu sa mogućnostima oca i obezbeđuje odgovarajući standard detetu. Navodi o previsokom fiksnom ekvivalentu procenta nisu osnovani.",
    keywords: ["smanjenje alimentacije", "nova deca", "član 164. PZ", "procenat"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Odbijeno smanjenje: i potrebe deteta i primanja oca porasli, procenat ostaje primeren.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9522/2024",
    legal_area: "family",
    legal_question:
      "Da li nižestepeni sudovi mogu odbiti povećanje alimentacije bez jasnog utvrđivanja promene okolnosti u odnosu na prethodnu odluku?",
    court_position:
      "Vrhovni sud je usvojio reviziju i ukinuo nižestepene presude u delu odbijanja zahteva za povećanje izdržavanja; predmet je vraćen prvostepenom sudu na ponovno suđenje.",
    reasoning:
      "U odnosu na prethodnu odluku od 18.10.2018. nisu ocenjene promenjene okolnosti po svim bitnim parametrima koji utiču na visinu izdržavanja. Bez toga nije moguće pravilno primeniti član 164. PZ. U ponovnom postupku sud će razjasniti promene i doneti odluku u najboljem interesu deteta.",
    keywords: ["ukidanje", "član 164. PZ", "ponovno suđenje", "član 416. stav 2. ZPP"],
    related_articles: ["član 160. PZ", "član 164. PZ", "član 416. stav 2. ZPP"],
    headnote: "Vraćanje predmeta jer nije utvrđeno da li i kako su se promenile okolnosti od prethodne odluke o alimentaciji.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 460/2021",
    legal_area: "family",
    legal_question:
      "Da li se može menjati roditeljsko pravo i određivati alimentacija i troškovi postupka kada je dete povereno drugom roditelju?",
    court_position:
      "Apelacioni sud je potvrdio izmenu vršenja roditeljskog prava u korist majke, potvrdio visinu alimentacije u procentu od penzije oca i model viđanja, a u delu troškova preinačio odluku u korist tužilaca zbog iniciranja spora ponašanjem tuženog.",
    reasoning:
      "Po članu 164. PZ uslovi su ispunjeni za odluku o visini doprinosa drugog roditelja posle promene poveravanja deteta. Iznos od 25% penzije oca ostvaruje razuman balans sa doprinosom majke u novcu i brigom. Troškovi su ocenjeni po članu 207. PZ uz razloge pravičnosti.",
    keywords: ["roditeljsko pravo", "alimentacija", "troškovi postupka", "član 207. PZ"],
    related_articles: ["član 164. PZ", "član 160. PZ", "član 207. PZ"],
    headnote: "Potvrđeno poveravanje majci, alimentacija 25% penzije oca; preinačeni troškovi zbog krivnje u ponašanju.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 11545/2022",
    legal_area: "family",
    legal_question:
      "Da li je iznos od 10.000 dinara mesečno za maloletnu ćerku u skladu sa članovima 67–68, 160 i 162. PZ?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđeno je povećanje doprinosa na 10.000 dinara mesečno kao merodavno utvrđenu obavezu.",
    reasoning:
      "Roditeljska briga i obaveza izdržavanja deteta (članovi 67, 68, 73, 160. PZ) zahtevaju procenu promene okolnosti po članu 164. PZ. Nižestepeni sudovi su pravilno utvrdili promenu potreba deteta i mogućnosti oca; iznos od 10.000 dinara je adekvatan odnosu potreba i mogućnosti u najboljem interesu deteta (članovi 6. i 266. PZ).",
    keywords: ["povećanje alimentacije", "najbolji interes deteta", "član 164. PZ"],
    related_articles: ["član 67. PZ", "član 68. PZ", "član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno 10.000 RSD mesečno posle izmene okolnosti na strani deteta i roditelja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13131/2024",
    legal_area: "family",
    legal_question:
      "Da li je drugostepeni sud pravilno odmerio alimentaciju oca prema dvoje maloletne dece uz minimalnu sumu i odsustvo drugih izdržavanih lica?",
    court_position:
      "Odbačena je revizija maloletnih tužilaca; potvrđena je odluka Apelacionog suda o visini doprinosa u skladu sa potrebama dece i primanjima oca.",
    reasoning:
      "Primenjeni su članovi 68, 154, 160, 162. i 164. PZ. Sud je uzeo u obzir minimalnu sumu izdržavanja i činjenicu da otac nema drugu zakonsku obavezu izdržavanja. Drugostepeni sud je pravilno ocenio sve bitne okolnosti za izmenu visine izdržavanja.",
    keywords: ["dvoje dece", "minimalna suma", "član 160. stav 4. PZ", "član 164. PZ"],
    related_articles: ["član 154. stav 1. PZ", "član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđena visina alimentacije za dvoje dece u skladu sa minimalnom sumom i mogućnostima oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 14681/2023",
    legal_area: "family",
    legal_question:
      "Da li prestanak plaćanja komunalija od strane oca utiče na pravilnost određivanja alimentacije od 15.000 dinara kada stranke žive u istoj kući?",
    court_position:
      "Odbačena je revizija majke tužilje; potvrđeno je 15.000 dinara mesečno kao doprinos oca za maloletnu ćerku.",
    reasoning:
      "Prestanak plaćanja komunalija može biti razlog za posebnu izmenu po članu 164. PZ, ali ne utiče na pravilnost zaključka o mogućnostima oca da doprinosi iznosu od 15.000 dinara. Po članu 272. stav 2. PZ, kada stranke žive u istom domaćinstvu, obaveza iz sudske odluke može pravilno da počne od donošenja odluke, a ne od podnošenja tužbe, jer se u momentu odluke cene sve relevantne okolnosti.",
    keywords: ["alimentacija", "zajedničko domaćinstvo", "član 272. stav 2. PZ", "komunalije"],
    related_articles: ["član 160. PZ", "član 164. PZ", "član 272. stav 2. PZ"],
    headnote: "Potvrđeno 15.000 RSD; početak obaveze od presude pri zajedničkom domaćinstvu je dopušten.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 16996/2023",
    legal_area: "family",
    legal_question:
      "Da li se na punoletno dete koje se ne školuje primenjuju ista pravila o povećanju alimentacije kao na maloletno dete i da li je činjenično stanje potpuno utvrđeno?",
    court_position:
      "Vrhovni sud je usvojio reviziju maloletnog tužioca i ukinuo nižestepene presude zbog pogrešne primene materijalnog prava u delu punoletnog deteta koje ne pohađa školu i nepotpunog utvrđivanja povećanih potreba.",
    reasoning:
      "Tuženi je menjao poslove i visinu plaćanja; u trenutku tužbe je plaćano manje od ranije utvrđenog. Sudovi nisu razjasnili status punoletnog deteta u pogledu obaveze izdržavanja kada ne školuje redovno, niti su potpuno utvrdili povećane potrebe maloletnog tužioca. Potrebno je ponovno odlučivanje.",
    keywords: ["punoletno dete", "školovanje", "ukidanje", "član 164. PZ"],
    related_articles: ["član 155. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Ukidanje zbog mešanja statusa punoletnog deteta i nepotpunog utvrđivanja potreba maloletnog tužioca.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Novom Sadu",
    court_level: "appellate",
    case_number: "Gž2 136/2016",
    legal_area: "family",
    legal_question:
      "Da li porast potreba maloletnog sina i ranija procenatna alimentacija opravdavaju povećanje na 8.000 dinara fiksnog iznosa?",
    court_position:
      "Apelacioni sud u Novom Sadu potvrdio je prvostepenu presudu kojom je povećan doprinos oca na 8.000 dinara mesečno.",
    reasoning:
      "Proteklo je više od tri godine od ranije odluke; potrebe deteta su porasle sa uzrastom i polaskom u srednju školu. Primenjeni su član 162. stav 3. PZ i član 164. PZ; prvostepeni sud je pravilno odmerio odnos potreba i mogućnosti oca.",
    keywords: ["povećanje alimentacije", "član 164. PZ", "srednja škola"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje na 8.000 RSD nakon više od tri godine i promene školskog uzrasta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5032/2024",
    legal_area: "family",
    legal_question:
      "Da li usvajanje dvoje dece i porast potreba studentkinje opravdavaju smanjenje alimentacije oca?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je da nema osnova za smanjenje alimentacije prema punoletnoj ćerci na studijama.",
    reasoning:
      "Primenjeni su članovi 160, 162. stav 3. i 164. PZ. Otac nije dokazao da ne može i dalje da doprinosi u ranije dosuđenom iznosu bez ugrožavanja sebe i maloletne dece koju je usvojio. Ćerka je postala studentkinja pa su joj se potrebe uvećale; promena okolnosti ne ide u prilog smanjenju.",
    keywords: ["student", "usvojenje dece", "smanjenje alimentacije", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Odbijeno smanjenje alimentacije studentkinje uprkos usvojenoj deci oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Novom Sadu",
    court_level: "appellate",
    case_number: "Gž2 131/2016",
    legal_area: "family",
    legal_question:
      "Da li protek od preko tri godine i polazak deteta u srednju školu predstavljaju osnov za povećanje alimentacije?",
    court_position:
      "Apelacioni sud u Novom Sadu potvrdio je prvostepenu presudu kojom je povećan iznos izdržavanja za maloletnu tužilju.",
    reasoning:
      "Primenjeni su član 162. stav 3. PZ i član 164. PZ. Od ranije presude proteklo je više od tri godine; potrebe deteta su se promenile jer je starija i krenula u srednju školu, što opravdava izmenu visine doprinosa oca.",
    keywords: ["povećanje alimentacije", "srednja škola", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije nakon tri godine i promene školskog stepena.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 25852/2024",
    legal_area: "family",
    legal_question:
      "Da li je pravilno utvrđen privremeni veći iznos alimentacije do presuđenja i konačnih 18.000 dinara od presude nadalje?",
    court_position:
      "Odbačena je revizija oca; potvrđena je odluka drugostepenog suda o povećanju doprinosa uključujući zbir od 18.000 dinara od dana presuđenja i dodatnih 8.000 dinara za prethodni period od podnošenja tužbe.",
    reasoning:
      "Primenjeni su članovi 67, 75, 160. i 164. PZ. Potrebe deteta su porasle; otac je radno sposoban i dužan da ispuni obavezu i prema drugoj deci. Drugostepeni sud je pravilno primenio materijalno pravo i odredio period na koji se povećanje odnosi.",
    keywords: ["povećanje alimentacije", "retroaktivno", "period", "član 164. PZ"],
    related_articles: ["član 75. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje uključujući dodatak za period od podnošenja tužbe do presude.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 536/2021",
    legal_area: "family",
    legal_question:
      "Da li žalba oca može osporiti visinu od 10.000 dinara mesečno pozivom na način izvršenja starih dugovanja?",
    court_position:
      "Apelacioni sud je odbio žalbu tuženog i potvrdio prvostepenu presudu o obavezi od 10.000 dinara mesečno; prigovori na izvršenje starih dugova nisu merodavni za ovaj spor.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. Na osnovu utvrđenog činjeničnog stanja iznos od 10.000 dinara odgovara delu troškova izdržavanja maloletnog deteta koji snosi roditelj sa kojim dete ne živi, u skladu sa članom 160. stav 1. PZ.",
    keywords: ["alimentacija", "žalba", "izvršenje", "član 160. PZ"],
    related_articles: ["član 160. stav 1. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno 10.000 RSD; izvršenje starih dugova nije predmet žalbe o visini alimentacije.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 481/2021",
    legal_area: "family",
    legal_question:
      "Da li je po 20.000 dinara mesečno po detetu primereno majčinom doprinosu u novcu i očevom standardu kao dužnika?",
    court_position:
      "Apelacioni sud je odbio žalbu oca i potvrdio obavezu plaćanja po 20.000 dinara mesečno po detetu kao u skladu sa članom 160. stav 1. PZ i standardom dužnika.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. Prvostepeni sud je pravilno procenio da mogućnosti dužnika dopuštaju taj iznos bez spuštanja ispod egzistencijalnog minimuma, uz obezbeđivanje detetu standarda jednakog standardu oca kao dužnika izdržavanja.",
    keywords: ["dvoje dece", "alimentacija", "član 160. PZ", "član 162. stav 3. PZ"],
    related_articles: ["član 160. stav 1. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno po 20.000 RSD po detetu u skladu sa potrebama dece i mogućnostima oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 774/2020",
    legal_area: "family",
    legal_question:
      "Da li nova deca, nezaposlena supruga i traženje smanjenja sa 18% na 15% primanja imaju osnova?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je odbijanje zahteva za smanjenje doprinosa ispod već dosuđenih 18% primanja.",
    reasoning:
      "Primenjeni su članovi 160, 162. stav 3. i 164. PZ. U najboljem interesu maloletnog deteta i uz visoku zaradu oca, dodatne porodične obaveze i kredit, 18% ostaje srazmerno potrebama deteta i standardu oca kao dužnika izdržavanja.",
    keywords: ["procenat alimentacije", "više dece", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Odbijeno smanjenje sa 18% na 15% primanja uprkos novoj deci i supruzi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2035/2017",
    legal_area: "family",
    legal_question:
      "Da li starost maloletnog deteta i veće potrebe opravdavaju povećanje mesečnog izdržavanja?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je povećanje mesečnog izdržavanja za maloletno dete.",
    reasoning:
      "Nižestepeni sudovi su pravilnom primenom člana 164. PZ utvrdili da su se okolnosti promenile u odnosu na prethodnu odluku donetu kada je dete bilo nešto starije od godine dana, pa su potrebe deteta sada veće i opravdavaju povećanje.",
    keywords: ["povećanje alimentacije", "član 164. PZ", "uzrast deteta"],
    related_articles: ["član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije zbog starijeg deteta i većih potreba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4374/2019",
    legal_area: "family",
    legal_question:
      "Da li je drugostepeni sud precenio udeo potreba deteta u odnosu na mogućnosti i životni standard oca kao dužnika kada je dosudio 20% umesto traženih 25% zarade?",
    court_position:
      "Vrhovni kasacioni sud je preinačio presude i povećao doprinos oca sa 20% na 25% zarade jer su nižestepeni sudovi pretežno cenili potrebe deteta, a nedovoljno standard i mogućnosti oca iz člana 162. stav 3. PZ.",
    reasoning:
      "Primenjeni su članovi 160, 162. stav 3. i 164. PZ. Povećanje zarade oca trebalo je da se odrazi na učešće u izdržavanju u meri koja zadovoljava potrebe deteta uz poštovanje životnog standarda dužnika; ispod 25% ostaje nesrazmerno u odnosu na pravilnu primenu materijalnog prava.",
    keywords: ["preinačenje", "procenat od zarade", "član 162. stav 3. PZ", "član 160. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Povećanje sa 20% na 25% zarade zbog nedovoljnog uzimanja u obzir standarda oca kao dužnika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 380/2021",
    legal_area: "family",
    legal_question:
      "Da li očev zahtev za smanjenje alimentacije punoletnoj studentkinji medicine ima osnova kada su se potrebe deteta povećale?",
    court_position:
      "Apelacioni sud je odbio žalbu oca i potvrdio odbijanje zahteva za smanjenje izdržavanja od 30.000 dinara mesečno.",
    reasoning:
      "Minimalna suma izdržavanja je orijentaciono merilo, ne jedina osnova; izdržavanje se određuje prema potrebama poverioca i mogućnostima dužnika (član 160. PZ). Studentkinja izuzetnog uspeha ima šire obrazovne i socijalne potrebe; očeve mogućnosti i dalje dopuštaju dosuđeni iznos ispod polovine utvrđenih potreba.",
    keywords: ["student", "medicina", "minimalna suma", "član 160. PZ", "član 73. PZ"],
    related_articles: ["član 73. PZ", "član 155. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Odbijeno smanjenje alimentacije studentkinji medicine zbog porasta potreba i dovoljnih mogućnosti oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 882/2022",
    legal_area: "family",
    legal_question:
      "Da li je majka pasivno legitimisana u delu protivtužbe za smanjenje alimentacije i da li je visina od 17.000 dinara pravilna?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđena je visina alimentacije i odbijanje protivtužbenog zahteva za smanjenje jer je protivtužba podneta protiv majke koja nije pasivno legitimisana u tom odnosu.",
    reasoning:
      "Obaveza izdržavanja postoji prema detetu kao poveriocu; promenu traži tužba deteta protiv roditelja obveznika ili roditelj protiv deteta. Protivtužba majci nema pasivnu legitimaciju za materijalnopravni odnos o izmeni alimentacije prema deci.",
    keywords: ["pasivna legitimacija", "protivtužba", "izdržavanje"],
    related_articles: ["član 78. stav 1. PZ", "član 160. PZ"],
    headnote: "Majka nije tužena u sporu o smanjenju alimentacije dece; pasivno legitimisano je dete.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2113/2017",
    legal_area: "family",
    legal_question:
      "Da li je prvostepena presuda pogrešno primenila član 160. PZ kada je dosudila 7.000 dinara umesto većeg iznosa za povećanje alimentacije?",
    court_position:
      "Vrhovni kasacioni sud je preinačio nižestepene presude i povećao mesečni doprinos oca sa 7.000 na 10.000 dinara.",
    reasoning:
      "Nižestepene presude su bile pogrešne u primeni članova 160, 161, 162. i 164. PZ. Utvrđene mesečne potrebe deteta iznose 14.000 dinara; sa ranijih 7.000 potrebna je korekcija koja bolje odgovara odnosu potreba i mogućnosti, uz starije dete i promenu okolnosti.",
    keywords: ["preinačenje", "povećanje alimentacije", "član 160. PZ", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 161. stav 1. PZ", "član 162. PZ", "član 164. PZ"],
    headnote: "Preinačenje: alimentacija povećana sa 7.000 na 10.000 RSD radi pravilne primene kriterijuma PZ.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2362/2020",
    legal_area: "family",
    legal_question:
      "Da li majka može tražiti potpuno ukidanje alimentacije prema punoletnom detetu kada su se okolnosti oba promenile?",
    court_position:
      "Odbačena je revizija majke; potvrđeno je delimično smanjenje alimentacije sa 200 na 150 evra, ali ne i ukidanje, jer su se potrebe deteta i obaveze majke promenile samo u meri koja opravdava smanjenje, a ne prestanak.",
    reasoning:
      "Mogućnosti dužnika i potrebe poverioca utvrđeni su po članu 160. PZ. Dete je učenik sa većim troškovima i zdravstvenim problemima; majka ima novo maloletno dete. Promena na obe strane ispunjava uslove za smanjenje po članu 164. PZ, ali ne i za potpuni prestanak izdržavanja.",
    keywords: ["smanjenje alimentacije", "punoletnik", "član 164. PZ", "ukidanje"],
    related_articles: ["član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno smanjenje sa 200 na 150 EUR; odbijeno potpuno ukidanje alimentacije.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Novom Sadu",
    court_level: "appellate",
    case_number: "Gž2 169/2016",
    legal_area: "family",
    legal_question:
      "Da li polazak deteta u vrtić i majčino postajanje podstanara predstavljaju promenu okolnosti za povećanje alimentacije?",
    court_position:
      "Apelacioni sud u Novom Sadu potvrdio je prvostepenu presudu kojom je povećan doprinos oca za izdržavanje maloletne ćerke.",
    reasoning:
      "Mogućnosti dužnika zavise od prihoda, zaposlenja, imovine i drugih okolnosti iz člana 160. stav 3. PZ. Po članu 164. PZ uslovi za izmenu su ispunjeni zbog vrtića i promene stanovanja majke. Majka doprinosi i radom na nezi i vaspitanju, što sud uzima u obzir pored novčanih potreba.",
    keywords: ["vrtić", "podstanar", "član 164. PZ", "doprinos rada"],
    related_articles: ["član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije zbog vrtića i promene stanovanja majke.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13583/2025",
    legal_area: "family",
    legal_question:
      "Da li je dosuđeno povećanje alimentacije u skladu sa članovima 160, 162. i 164. PZ i minimalnim i procentualnim ograničenjima?",
    court_position:
      "Odbačena je revizija; potvrđeno je povećanje alimentacije maloletnoj deci zbog promenjenih okolnosti i većih potreba.",
    reasoning:
      "Poverilac može birati fiksni iznos ili procenat (član 162. stav 1. PZ); za procenat važe granice iz člana 162. stav 2. PZ; za dete važi standard dužnika (stav 3). Po članu 164. PZ visina se menja kada se promene okolnosti. Pobijana odluka je u skladu sa citiranim odredbama i najboljim interesom deteta.",
    keywords: ["član 162. stav 2. PZ", "minimalna suma", "član 164. PZ", "povećanje"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije uz pravilnu primenu čl. 160–164. PZ.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3692/2020",
    legal_area: "family",
    legal_question:
      "Da li nega novorođenog deteta u novom braku može opravdati smanjenje majčinog doprinosa za izdržavanje dece iz ranog braka?",
    court_position:
      "Vrhovni kasacioni sud je delimično usvojio reviziju majke i preinačio presude smanjujući njen doprinos, uzimajući u obzir privremenu nemogućnost sticanja zarade zbog nege novorođenog deteta.",
    reasoning:
      "Primenjeni su članovi 160, 162. stav 3. i 164. PZ. Nižestepeni sudovi su precenili majčinu obavezu u odnosu na realne mogućnosti u periodu nege novorođenčeta i prihode oca sa kojim dete živi; potrebna je proporcionalna korekcija doprinosa majke uz i dalje važeće kriterijume potreba dece.",
    keywords: ["smanjenje alimentacije", "nega novorođenčeta", "član 160. PZ", "preinačenje"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Delimično smanjenje majčinog doprinosa zbog nege novorođenog deteta i ograničenih primanja.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 251/2021",
    legal_area: "family",
    legal_question:
      "Da li je pravilno povećanje alimentacije oca na 25.000 dinara i kako treba odlučiti o troškovima postupka kada su žalbene strane sporne oko iznosa i troškova?",
    court_position:
      "Apelacioni sud je potvrdio povećanje doprinosa na 25.000 dinara, odbio žalbe o visini izdržavanja, a preinačio odluku o troškovima u korist oca iz razloga pravičnosti.",
    reasoning:
      "Primenjeni su članovi 67, 68, 160, 162. stav 3. i 164. PZ. Uslovi za izmenu postoje zbog školskog uzrasta i većih potreba deteta; sud je pravilno procenio prihode i imovinu oca, novu porodicu i smanjenje primanja posle smene posla. Troškovi su ocenjeni uz član 207. PZ.",
    keywords: ["povećanje alimentacije", "troškovi postupka", "član 207. PZ", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ", "član 207. PZ"],
    headnote: "Potvrđeno 25.000 RSD alimentacije; preinačeni troškovi u korist oca.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9379/2024",
    legal_area: "family",
    legal_question:
      "Da li je povećanje alimentacije za dvoje maloletne dece u skladu sa primanjima tuženog i minimalnom sumom izdržavanja?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđena je odluka o povećanju doprinosa za dvoje dece u skladu sa potrebama dece i stvarnim mogućnostima oca.",
    reasoning:
      "Primenjeni su članovi 154, 160, 162. stav 3. i 164. PZ. Uzrast dece utiče na potrebe za obrazovanje i socijalizaciju; utvrđeni su mesečni iznosi potreba koje su prihvaćeni kao pravilni iako ispod tadašnje minimalne sume, jer minimalna suma nije jedini kriterijum.",
    keywords: ["dvoje dece", "povećanje alimentacije", "minimalna suma", "član 164. PZ"],
    related_articles: ["član 154. stav 1. PZ", "član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije za dvoje dece uz procenu potreba i realnih primanja oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4329/2021",
    legal_area: "family",
    legal_question:
      "Da li je pravilno određivanje alimentacije oca u procentu od primanja u korist maloletne dece?",
    court_position:
      "Odbačena je revizija tuženih; potvrđena je odluka apelacionog suda o obavezi u procentu od redovnih mesečnih primanja oca.",
    reasoning:
      "Po članu 164. PZ i članu 162. stav 1. PZ poverilac može birati način određivanja; procenat je pravilna odluka u najboljem interesu dece uz primenu članova 160. i 162. stav 3. PZ o potrebama i standardu dužnika.",
    keywords: ["procenat alimentacije", "član 162. stav 1. PZ", "najbolji interes deteta"],
    related_articles: ["član 160. PZ", "član 162. PZ", "član 164. PZ"],
    headnote: "Potvrđena alimentacija u procentu od primanja kao pravilna za maloletnu decu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3543/2018",
    legal_area: "family",
    legal_question:
      "Da li neredovno viđanje deteta i način trošenja alimentacije od strane majke opravdavaju smanjenje alimentacije oca?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je odbijanje zahteva za smanjenje doprinosa za izdržavanje maloletnog deteta.",
    reasoning:
      "Minimalna suma izdržavanja je pomoćni kriterijum. Navodi o viđanju i trošenju sredstava nisu zakonom predviđeni kao samostalni razlozi za smanjenje po članu 164. PZ. Trošak zakupa stana oca ne menja već utvrđenu obavezu prema detetu.",
    keywords: ["smanjenje alimentacije", "minimalna suma", "viđanje deteta", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 164. PZ"],
    headnote: "Neredovno viđanje i način trošenja alimentacije nisu osnov za smanjenje doprinosa oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8771/2021",
    legal_area: "family",
    legal_question:
      "Da li povećanje alimentacije može počivati na stvarnim prihodima dužnika većim od prijavljene zarade?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđeno je povećanje doprinosa za dvoje maloletne dece zbog promene okolnosti i realnih finansijskih mogućnosti oca.",
    reasoning:
      "Primenjeni su članovi 154, 160, 162. stav 3. i 164. PZ. Sud je pravilno zaključio da su se okolnosti promenile u smislu člana 164. PZ i da postoje osnovi za izmenu visine izdržavanja u korist dece.",
    keywords: ["povećanje alimentacije", "stvarni prihodi", "član 164. PZ"],
    related_articles: ["član 154. stav 1. PZ", "član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije kada su stvarni prihodi oca veći od prijavljenih.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 19090/2024",
    legal_area: "family",
    legal_question:
      "Da li je dosuđenih 25.000 dinara mesečno previsoko u odnosu na ukupne potrebe deteta i mogućnosti oca kao dužnika?",
    court_position:
      "Vrhovni sud je delimično usvojio reviziju oca i preinačio presude smanjujući obavezu sa 25.000 na 19.000 dinara mesečno kao srazmernu potrebama deteta i mogućnostima oba roditelja.",
    reasoning:
      "Otac ne osporava obavezu do 15.000 dinara koji deo je pravnosnažan; preostalih 4.000 do 19.000 predstavlja razumnu razliku, dok iznos preko 19.000 do 25.000 nije osnovan. Potrebe deteta su kontinuirane; dodatna dobrovoljna plaćanja drugih troškova ne smanjuju zakonsku novčanu obavezu.",
    keywords: ["delimično usvajanje", "smanjenje alimentacije", "član 160. PZ"],
    related_articles: ["član 160. PZ", "član 164. PZ", "član 207. PZ"],
    headnote: "Alimentacija smanjena sa 25.000 na 19.000 RSD radi srazmernosti sa mogućnostima oca i ukupnim potrebama.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Gž2 305/2020",
    legal_area: "family",
    legal_question:
      "Da li otac može osporiti povećanje alimentacije za dvoje maloletne dece pozivom na obavezu prema drugom detetu?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđeno je povećanje alimentacije za dvoje dece jer su potrebe porasle, a otac može ostvariti veće prihode dodatnim radom.",
    reasoning:
      "Primenjeni su član 162. stav 3. i članovi 160, 164. i 266. PZ. Drugostepeni sud je pravilno procenio objektivne mogućnosti dodatnog angažovanja; postojanje još jednog maloletnog deteta ne isključuje povećanje doprinosa u konkretnim okolnostima.",
    keywords: ["dvoje dece", "povećanje alimentacije", "dodatni rad", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ", "član 266. PZ"],
    headnote: "Potvrđeno povećanje alimentacije; dodatno radno angažovanje oca može podržati veći doprinos.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1378/2017",
    legal_area: "family",
    legal_question:
      "Da li su osnovani zahtevi tužilaca za dalje povećanje alimentacije nakon što su nižestepeni sudovi već povećali obavezu, s obzirom na to da je otac ostao bez posla?",
    court_position:
      "Odbačena je revizija tužilaca za dalje povećanje; potvrđena je izmena odluke koja je ipak povećala iznos u odnosu na ranije plaćanje u procentu.",
    reasoning:
      "Primenjen je član 162. stav 3. PZ. Nezaposlenost oca i naknada ne ukidaju obavezu; deca su starija sa većim potrebama. Pravilno je izmenjena prvobitna odluka; revizijski navodi o tome da je sud zapravo smanjio iznos nisu osnovani jer je novi fiksni iznos veći od ranijeg procentualnog ekvivalenta posle gubitka posla.",
    keywords: ["nezaposlenost", "naknada NSZ", "povećanje alimentacije", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ", "član 414. ZPP"],
    headnote: "Potvrđeno povećanje alimentacije uprkos nezaposlenosti oca koji prima naknadu za nezaposlene.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9717/2023",
    legal_area: "family",
    legal_question:
      "Da li je 30% mesečne zarade oca primerena alimentaciji maloletnog deteta i da li povremeni troškovi oca smanjuju tu obavezu?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđeno je povećanje obaveze na 30% zarade kao adekvatno potrebama deteta i mogućnostima oca.",
    reasoning:
      "Primenjeni su članovi 160. i 166. stav 4. PZ. Obaveza izdržavanja maloletnog deteta je prioritetna; mogućnost dodatnog radnog angažovanja radi zarade podržava visinu dosuđenog doprinosa. Povremeni troškovi oca (zakup, pokloni) ne smanjuju osnovnu novčanu obavezu prema detetu.",
    keywords: ["procenat alimentacije", "prioritet izdržavanja", "član 166. stav 4. PZ"],
    related_articles: ["član 160. PZ", "član 166. stav 4. PZ", "član 164. PZ"],
    headnote: "Potvrđeno 30% zarade; alimentacija maloletnika ima prednost pred ostalim rashodima oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 437/2022",
    legal_area: "family",
    legal_question:
      "Da li nezaposlenost oca isključuje obavezu većeg doprinosa za izdržavanje dece kada postoji mogućnost honorarnog rada?",
    court_position:
      "Odbačena je revizija tužilaca; potvrđena je odluka o visini doprinosa za izdržavanje dece i razmerama doprinosa oba roditelja.",
    reasoning:
      "Minimalna suma izdržavanja je pomoćni kriterijum. Po članu 164. PZ pravilno su ocenjene promene potreba dece i mogućnosti oca; nezaposlenost zdravog radno sposobnog oca ne oslobađa obaveze da angažuje kapacitete za zaradu, posebno u struci koja omogućava veće prihode.",
    keywords: ["nezaposlenost", "honorarni rad", "član 160. stav 3. PZ", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ", "član 6. PZ"],
    headnote: "Potvrđena visina alimentacije; nezaposlen dužnik dužan je da koristi mogućnosti sticanja zarade.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 273/2025",
    legal_area: "family",
    legal_question:
      "Da li je pravilno utvrđena visina alimentacije i mogućnosti oca zaposlenog u međunarodnoj organizaciji i realne mesečne potrebe deteta u školi?",
    court_position:
      "Potvrđeno je odbijanje zahteva za delimično lišenje roditeljskog prava; ukinuta je odluka o visini izdržavanja i predmet vraćen prvostepenom sudu zbog nepotpunog utvrđivanja prihoda oca i potreba deteta.",
    reasoning:
      "U najboljem interesu deteta majka ostaje nosilac staranja. Prvostepeni sud nije pouzdano utvrdio realne prihode oca u inostranstvu niti potrebe deteta školskog uzrasta; primena članova 6, 154, 160–162. i 164. PZ zahteva potpunije činjenično utvrđivanje.",
    keywords: ["ukidanje", "alimentacija", "inostrani prihodi", "CSR", "ponovno suđenje"],
    related_articles: ["član 6. PZ", "član 154. stav 1. PZ", "član 160. stav 4. PZ", "član 164. PZ"],
    headnote: "Vraćanje predmeta radi boljeg utvrđivanja prihoda oca u UN i stvarnih potreba deteta.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 11905/2024",
    legal_area: "family",
    legal_question:
      "Da li porast potreba dvoje maloletne dece i veći stvarni prihodi oca opravdavaju povećanje alimentacije uprkos prijavljenoj nižoj zaradi?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je povećanje doprinosa za izdržavanje dvoje maloletne dece.",
    reasoning:
      "Primenjeni su član 162. stav 3. i član 164. PZ. Potrebe dece su porasle; mogućnosti oca omogućavaju veće izdvajanje u odnosu na formalno prijavljenu zaradu kada su stvarni kapaciteti veći.",
    keywords: ["dvoje dece", "povećanje alimentacije", "stvarni prihodi", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje alimentacije za dvoje dece zbog potreba i stvarnih mogućnosti oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1003/2021",
    legal_area: "family",
    legal_question:
      "Da li se u obavezu alimentacije uračunava dobrovoljno davanje robe i plaćanje drugih troškova pored sudski dosuđenog iznosa?",
    court_position:
      "Odbačena je revizija oca; potvrđena je fiksna alimentacija po detetu; dobrovoljni doprinosi ne smanjuju zakonski utvrđenu novčanu obavezu.",
    reasoning:
      "Kod fiksnog iznosa ne vrši se automatsko upoređivanje sa procentom primanja. Potrebe deteta su kontinuirane i zahtevaju stalan novčani doprinos; dodatna dobrovoljna davanja su dozvoljena ali se ne mogu jednostrano pretvoriti u smanjenje sudske obaveze.",
    keywords: ["fiksna alimentacija", "dobrovoljno davanje", "član 160. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ"],
    headnote: "Dobrovoljni troškovi i kupovine pored alimentacije ne smanjuju obavezujući mesečni iznos po detetu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 421/2021",
    legal_area: "family",
    legal_question:
      "Da li je pravilno povećanje ukupnog doprinosa oca na 15.000 dinara i odbijanje zahteva majke za ograničenje saglasnosti za putovanje deteta u inostranstvo?",
    court_position:
      "Apelacioni sud je delimično usvojio žalbe, povećao ukupan doprinos oca na 15.000 dinara mesečno i odbio zahtev za delimično lišenje oca saglasnosti za put u inostranstvo.",
    reasoning:
      "Primenjeni su članovi 160, 164. i 207. PZ. Potrebe deteta školskog uzrasta i minimalna suma kao orijentir podržavaju povećanje uz srazmeran doprinos majke brigom i primanjima. Lišenje saglasnosti za put nije osnovano u najboljem interesu deteta.",
    keywords: ["povećanje alimentacije", "put u inostranstvo", "roditeljsko pravo", "član 207. PZ"],
    related_articles: ["član 160. PZ", "član 164. PZ", "član 207. PZ"],
    headnote: "Povećanje ukupnog doprinosa oca na 15.000 RSD; odbijeno ograničenje očeve saglasnosti za putovanje.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 170/2025",
    legal_area: "family",
    legal_question:
      "Da li argument o vanserijskom talentu deteta zahteva znatno veću alimentaciju od 35.000 dinara mesečno?",
    court_position:
      "Potvrđena je izmena modela viđanja i alimentacija od 35.000 dinara mesečno kao primerena mogućnostima oca i potrebama deteta; posebni talent ne zahteva drugačiji iznos bez dodatnih merodavnih činjenica.",
    reasoning:
      "Primenjeni su članovi 160 i 162. stav 3. PZ. Otac nema drugu alimentacionu obavezu; iznos obezbeđuje standard dužnika, ostatak snosi majka. U skladu sa članom 6. PZ očekuje se da otac dodatno doprinosi razvoju deteta i van novčanog minimuma.",
    keywords: ["alimentacija", "talent", "najbolji interes deteta", "član 6. PZ"],
    related_articles: ["član 6. PZ", "član 160. PZ", "član 162. stav 3. PZ"],
    headnote: "Potvrđeno 35.000 RSD i prilagođen model viđanja; talent deteta sam po sebi ne povećava iznos bez dokaza.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2234/2021",
    legal_area: "family",
    legal_question:
      "Da li smanjenje alimentacije oca može biti osnovano kada su se njegove ekonomske mogućnosti značajno pogoršale u odnosu na ranju odluku?",
    court_position:
      "Odbačene su revizije oca i deteta; potvrđeno je smanjenje alimentacije kao pravilno odmereno u odnosu na promenjene mogućnosti oca i potrebe deteta.",
    reasoning:
      "Primenjeni su članovi 67, 75, 160. i 164. PZ. Utvrđeno činjenično stanje pokazuje znatno niži životni standard oca u odnosu na period ranije odluke, pa smanjenje alimentacije predstavlja pravilnu primenu člana 164. PZ.",
    keywords: ["smanjenje alimentacije", "član 164. PZ", "životni standard"],
    related_articles: ["član 75. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno smanjenje alimentacije zbog bitnog pogoršanja materijalnih mogućnosti oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5782/2021",
    legal_area: "family",
    legal_question:
      "Da li alimentacija teče od dana podnošenja tužbe i da li je visina doprinosa tuženog pravilno određena prema potrebama dece i mogućnostima oba roditelja?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđena je drugostepena presuda o visini doprinosa i početku obaveze od dana podnošenja tužbe.",
    reasoning:
      "Primenjeni su članovi 67, 75, 160. i 164. PZ. Nižestepeni sudovi su pravilno utvrdili potrebe deteta, mogućnosti oca kao dužnika i majke koja takođe doprinosi izdržavanju; očevi prigovori o precenjenim mogućnostima nisu osnovani.",
    keywords: ["datum početka", "podnošenje tužbe", "član 160. PZ"],
    related_articles: ["član 73. PZ", "član 75. PZ", "član 154. stav 1. PZ", "član 160. PZ"],
    headnote: "Potvrđen početak alimentacije od podnošenja tužbe i pravilna visina doprinosa oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 128/2024",
    legal_area: "family",
    legal_question:
      "Da li prvostepeni sud može odstupiti od mišljenja organa starateljstva i paušalno utvrditi potrebe deteta bez jasnog odnosa prema prihodima roditelja?",
    court_position:
      "Potvrđeno je poveravanje deteta majci; ukinuti su delovi presude o modelu viđanja sa ocem i visini izdržavanja zbog nejasnog obrazloženja odstupanja od CSR i nedovoljnog individualizovanja potreba i prihoda od izdavanja stanova.",
    reasoning:
      "Primenjeni su članovi 160 i 162. stav 3. PZ. Roditelji ostvaruju slične zarade; majka ima dodatne prihode od izdavanja nekretnina koje prvostepeni sud nije adekvatno valorisovao. Potrebno je jasnije obrazloženje u odnosu na mišljenje starateljskog tela i standard oba roditelja.",
    keywords: ["CSR", "potrebe deteta", "ukidanje", "član 162. stav 3. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ"],
    headnote: "Vraćanje na ponovno odlučivanje o viđanju i alimentaciji zbog paušalnih potreba i nedovoljnog obrazloženja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2365/2022",
    legal_area: "family",
    legal_question:
      "Da li je 15.000 dinara mesečno primereno potrebama školskog deteta i mogućnostima oca dužnika izdržavanja?",
    court_position:
      "Odbačena je revizija tuženog oca; potvrđena je obaveza od 15.000 dinara mesečno kao u skladu sa članovima 160, 162. stav 3. i 164. PZ.",
    reasoning:
      "Pravilno je ocenjeno da otac može plaćati taj iznos uz dodatni radni angažman, bez ugrožavanja egzistencije; majka obezbeđuje preostatak potreba novcem i svakodnevnom brigom. Prigovori koji ponavljaju žalbene navode nisu osnovani.",
    keywords: ["alimentacija", "školsko dete", "član 160. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ", "član 266. PZ"],
    headnote: "Potvrđeno 15.000 RSD mesečno za školsko dete uz mogućnost dodatnog angažovanja oca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 471/2016",
    legal_area: "family",
    legal_question:
      "Da li je povećanje alimentacije punoletnom studentu na 25.000 dinara mesečno srazmerno potrebama i mogućnostima roditelja?",
    court_position:
      "Apelacioni sud je odbio žalbe obe strane i potvrdio prvostepenu presudu kojom je povećan doprinos oca za izdržavanje punoletnog sina studenta na 25.000 dinara mesečno.",
    reasoning:
      "Primenjeni su član 155. stav 2. i članovi 160. i 164. PZ. Proteklo je dvanaest godina od ranije odluke; potrebe studenta su se prirodno povećale. Troškovi stanovanja u mestu studija i minimalna suma kao orijentir uzeti su zajedno sa ostalim okolnostima.",
    keywords: ["student", "punoletnik", "član 155. stav 2. PZ", "član 164. PZ"],
    related_articles: ["član 155. stav 2. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno 25.000 RSD za studenta nakon duge pauze i značajnog porasta potreba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4503/2021",
    legal_area: "family",
    legal_question:
      "Da li nova deca i porodica oca opravdavaju smanjenje alimentacije prema maloletnoj ćerki iz ranijeg braka?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je da nema osnova za smanjenje obaveze prema desetogodišnjoj ćerki.",
    reasoning:
      "Primenjeni su članovi 67, 75, 160. i 164. PZ. Potrebe deteta školskog uzrasta pravilno su utvrđene na oko 24.000 dinara; očeve mogućnosti uključuju zaradu i prostor za dodatni angažman. Prioritet ima izdržavanje maloletnog deteta u odnosu na nove porodične troškove.",
    keywords: ["smanjenje alimentacije", "nova deca", "maloletnik", "član 164. PZ"],
    related_articles: ["član 75. PZ", "član 160. PZ", "član 164. PZ"],
    headnote: "Odbijeno smanjenje alimentacije uprkos novoj deci oca; potrebe maloletnice ostaju u prvom planu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 5/2017",
    legal_area: "family",
    legal_question:
      "Da li prvostepeni sud može odbiti smanjenje alimentacije bez utvrđivanja potreba i mogućnosti iz vremena prethodne odluke zasnovane na sporazumu stranaka?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i vratio predmet na ponovno suđenje jer nisu utvrđene činjenice iz člana 160. PZ ni za vreme ranje odluke P2 296/13 ni za sadašnje stanje.",
    reasoning:
      "Kada je prethodna obaveza proistekla iz sporazuma, sud mora ipak utvrditi potrebe poverioca i mogućnosti dužnika u skladu sa članom 160. PZ i standard iz člana 162. stav 3. PZ. Visina potreba od 22.000 dinara nije podkrepljena odgovarajućim dokazima.",
    keywords: ["ukidanje", "sporazum", "član 160. PZ", "ponovno suđenje"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Vraćanje predmeta jer sud nije utvrdio potrebe i mogućnosti ni za prethodnu ni za sadašnju fazu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2682/2019",
    legal_area: "family",
    legal_question:
      "Da li je dosuđenih 20.000 dinara mesečno za dete u privatnoj srednjoj školi srazmerno ukupnim potrebama i mogućnostima oca kao dužnika?",
    court_position:
      "Odbačena je revizija tužioca oca; potvrđena je obaveza od 20.000 dinara mesečno kao u skladu sa privatnim školovanjem i primenjenim kriterijumima iz člana 160. PZ.",
    reasoning:
      "Ukupne mesečne potrebe maloletnika u privatnoj školi pravilno su procenjene na viši iznos; očeva obaveza od 20.000 dinara ostvaruje udeo koji uz majčin doprinos i brigu omogućava standard dužnika iz člana 162. stav 3. PZ.",
    keywords: ["privatna škola", "alimentacija", "član 160. PZ", "član 162. stav 3. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ", "član 164. PZ"],
    headnote: "Potvrđeno 20.000 RSD mesečno uz visoke troškove privatnog srednjoškolskog obrazovanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 31649/2023",
    legal_area: "family",
    legal_question:
      "Da li mišljenje deteta, CSR i stručna procena podržavaju poveravanje majci i visinu alimentacije oca?",
    court_position:
      "Odbačena je revizija oca; potvrđeno je poveravanje deteta majci na samostalno roditeljsko pravo i obaveza izdržavanja oca u skladu sa članovima 160 i 162. PZ.",
    reasoning:
      "Dete želi nepromenjene odnose sa oba roditelja, ali autentična želja boravka kod majke uz stručne nalaze podržava odluku nižih sudova. Visina alimentacije pravilno sledi iz kriterijuma potreba, mogućnosti i minimalne sume uz standard dužnika.",
    keywords: ["mišljenje deteta", "roditeljsko pravo", "CSR", "alimentacija"],
    related_articles: ["član 6. PZ", "član 160. PZ", "član 162. stav 3. PZ"],
    headnote: "Potvrđeno poveravanje majci i alimentacija oca uz poštovanje mišljenja deteta i stručnih nalaza.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Novom Sadu",
    court_level: "appellate",
    case_number: "Gž2 218/2012",
    legal_area: "family",
    legal_question:
      "Da li ratni vojni invalid otac može snositi povećanu alimentaciju sa 6.000 na 10.000 dinara zbog školskih i vanškolske aktivnosti deteta?",
    court_position:
      "Apelacioni sud je potvrdio povećanje doprinosa oca na 10.000 dinara mesečno kao u skladu sa članovima 160 i 164. PZ.",
    reasoning:
      "Potrebe deteta su porasle zbog škole, muzičke škole, folklora i drugih troškova; prošlo je oko godinu i po od ranije presude. Otac je radno sposoban i ostvaruje primanja koja dopuštaju povećanje uz poštovanje minimalne sume kao orijentira.",
    keywords: ["povećanje alimentacije", "vanškolske aktivnosti", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno povećanje sa 6.000 na 10.000 RSD zbog školskih i vanškolske aktivnosti deteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5539/2020",
    legal_area: "family",
    legal_question:
      "Da li je 20.000 dinara mesečno za maloletnu ćerku u skladu sa potrebama deteta i doprinosom majke u novcu i brigu?",
    court_position:
      "Odbačena je revizija tužioca oca; potvrđena je obaveza od 20.000 dinara mesečno kao u skladu sa članom 160. PZ i standardom dužnika iz člana 162. stav 3. PZ.",
    reasoning:
      "Mesečne potrebe deteta pravilno su utvrđene. Dosuđeni iznos uz majčin doprinos novcem i svakodnevnom negom omogućava zajedničkom maloletnom detetu standard koji odgovara ocu kao dužniku izdržavanja. Navodi o previsokom iznosu nisu osnovani.",
    keywords: ["alimentacija", "član 160. PZ", "član 162. stav 3. PZ"],
    related_articles: ["član 160. PZ", "član 162. stav 3. PZ"],
    headnote: "Potvrđeno 20.000 RSD mesečno kao srazmerno potrebama deteta i očevim mogućnostima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 394/2017",
    legal_area: "family",
    legal_question:
      "Da li Konvencija o pravima deteta i obaveza iz člana 68. PZ zahtevaju posebnu pažnju pri određivanju procenta alimentacije kada otac izdržava i drugu decu?",
    court_position:
      "Potvrđeno je poveravanje deteta majci; žalba oca delimično usvojena u delu visine alimentacije koja je smanjena sa 20% na 15% mesečnih primanja oca.",
    reasoning:
      "Roditelji imaju primarnu odgovornost u okviru svojih mogućnosti (čl. 20. KPD). Kod više dece sa strane oca procenat od 20% je previsok u odnosu na uravnoteženje potreba maloletne VV i drugih obaveza; 15% bolje odgovara članovima 160 i 162. PZ.",
    keywords: ["Konvencija o pravima deteta", "procenat alimentacije", "više dece", "član 160. PZ"],
    related_articles: ["član 68. stav 1. PZ", "član 154. PZ", "član 160. PZ", "član 162. PZ"],
    headnote: "Smanjenje alimentacije sa 20% na 15% primanja radi uravnoteženja obaveza prema više dece.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 356/2017",
    legal_area: "family",
    legal_question:
      "Da li je povećanje alimentacije na 400 švajcarskih franaka mesečno osnovano i kako treba obračunavati zateznu kamatu u stranoj valuti?",
    court_position:
      "Apelacioni sud je potvrdio povećanje alimentacije na 400 CHF mesečno i preinačio obračun kamate na referentnu stopu centralne banke valute isplate.",
    reasoning:
      "Primenjen je član 164. PZ zbog značajno većih potreba maloletnog tužioca i promene školovanja. Za deviznu alimentaciju kamata prati referentnu stopu domicilne valute umesto netačnog pravnog shvatanja u pobijanom delu o kamati.",
    keywords: ["švajcarski franak", "zatezna kamata", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 164. PZ", "Zakon o obaveznim odnosima"],
    headnote: "Potvrđeno 400 CHF; kamata po referentnoj stopi CB domicilne valute.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4436/2019",
    legal_area: "family",
    legal_question:
      "Da li drastično smanjenje primanja oca i nove alimentacione obaveze opravdavaju smanjenje alimentacije sa 500 na 100 evra mesečno?",
    court_position:
      "Odbačena je revizija tužene kćeri; potvrđeno je smanjenje alimentacije u skladu sa članom 164. PZ.",
    reasoning:
      "U odnosu na prethodnu odluku očeva primanja i porodične obaveze bitno su se promenile; primena člana 164. PZ podržava značajno smanjenje visine izdržavanja uz zadržavanje obaveze prema detetu.",
    keywords: ["smanjenje alimentacije", "evro", "član 164. PZ"],
    related_articles: ["član 160. PZ", "član 164. PZ"],
    headnote: "Potvrđeno smanjenje sa 500 na 100 EUR zbog drastično umanjenih primanja i novih obaveza oca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 490/2021",
    legal_area: "family",
    legal_question:
      "Da li se alimentacija oca koji radi u inostranstvu može odrediti kao procenat ukupnih neto primanja i da li domaće pravo ostaje merodavno kada dete živi u Srbiji?",
    court_position:
      "Apelacioni sud je odbio žalbe obe strane i potvrdio obavezu oca da plaća 20% ukupnih mesečnih neto primanja ostvarenih u inostranstvu.",
    reasoning:
      "Dete ima prebivalište u Republici Srbiji, pa se primenjuje domaće pravo i član 162. stav 2. PZ o osnovici za procenat. Prvostepeni sud je pravilno odbacio nerealne troškove i prigovore o hipotetičkom postupku u drugoj državi.",
    keywords: ["inostrana primanja", "procenat", "član 162. stav 2. PZ", "merodavno pravo"],
    related_articles: ["član 160. PZ", "član 162. stav 2. PZ"],
    headnote: "Potvrđeno 20% neto primanja oca u inostranstvu; primenjeno pravo Republike Srbije.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 11159/2022",
    legal_area: "family",
    legal_question:
      "Da li je po 10.000 dinara mesečno za dve maloletne ćerke u skladu sa minimalnom sumom izdržavanja i članom 160. PZ?",
    court_position:
      "Odbačena je revizija oca; potvrđena je presuda o obavezi plaćanja po 10.000 dinara mesečno po detetu.",
    reasoning:
      "Deca imaju pravo na izdržavanje od oba roditelja po članovima 73. i 160. PZ. Pojedinačni iznos ispod minimalne sume iz člana 160. stav 4. PZ ne čini automatski odluku nezakonitom kada se ukupno posmatra doprinos majke i kontinuitet potreba deteta; revizijski navodi nisu osnovani.",
    keywords: ["dvoje dece", "minimalna suma", "član 160. stav 4. PZ"],
    related_articles: ["član 73. PZ", "član 160. PZ", "član 162. stav 3. PZ"],
    headnote: "Potvrđeno po 10.000 RSD po ćerki; pojedinačni iznos ispod minimalne ne ukida obavezu ako je ukupna briga roditelja razumna.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 809/2022",
    legal_area: "family",
    legal_question:
      "Da li drugostepeni sud može bez održane rasprave promeniti način određivanja alimentacije sa procenta na fiksni iznos protivno zahtevu tužioca?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju i ukinuo presudu Apelacionog suda; predmet je vraćen na ponovno odlučivanje zbog bitne povrede postupka.",
    reasoning:
      "Po članu 160. PZ kriterijumi uključuju način određivanja iz člana 162. stav 1. PZ. Apelacioni sud je bez rasprave izmenio činjenično stanje i odredio fiksni iznos suprotno tužiocu koji je tražio procenat, što predstavlja bitnu povredu postupka i zahteva ponavljanje drugostepenog postupka.",
    keywords: ["bitna povreda postupka", "procenat", "fiksni iznos", "rasprava", "ZPP"],
    related_articles: ["član 160. PZ", "član 162. stav 1. PZ", "član 164. PZ", "ZPP"],
    headnote: "Ukidanje presude Apelacionog suda zbog odlučivanja o fiksnom iznosu bez rasprave i suprotno tužiocu.",
    outcome: "remanded",
  },
]
