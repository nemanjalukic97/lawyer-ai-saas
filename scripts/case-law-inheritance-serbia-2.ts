// scripts/case-law-inheritance-serbia-2.ts
// Serbian case law from mixed civil/inheritance testament bundle — Batches 1-3 of 3 (complete).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_INHERITANCE_SERBIA_2: CaseLawInput[] = [
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2647/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li sud mora prihvatiti kvalifikaciju tužbe kao ništavosti ako činjenice upućuju na poništaj zbog rušljivosti i apsolutne ništavosti zbog forme i nesposobnosti zaveštaoca?",
    court_position:
      "Vrhovni kasacioni sud je preinačio drugostepenu i potvrdio prvostepenu presudu kojom je zaveštanje ništavo: zaveštalac nije bio sposoban za rasuđivanje, a svedoci nisu istovremeno prisustvovali potpisivanju, što krši čl. 85 ZON.",
    reasoning:
      "Sud je vezan stvarnim i pravnim identitetom zahteva, ne formalnim oznakama u tužbi; zahtev za ništavost obuhvata i poništaj kada su iste činjenice u pitanju.",
    keywords: ["testament pred svedocima", "ništavost", "nesposobnost za rasuđivanje", "čl. 85 ZON"],
    related_articles: ["čl. 85 ZON", "čl. 166–168 ZON"],
    headnote:
      "Nedostatak istovremenog prisustva svedoka i odsustvo testamentske sposobnosti čine posao nepostojećim, a ne samo rušljivim.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 78/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li je pravilno odbijen dokaz saslušanjem stranaka i svedoka ako je testamentska sposobnost već utvrđena neuropsihijatrijskim veštačenjem?",
    court_position:
      "Apelacioni sud je potvrdio poništaj testamenta zbog nesposobnosti testatorke za rasuđivanje (demencija, organski poremećaj) i pravilno odbijanje suvišnih dokaznih predloga po čl. 229 st. 2 i 315 st. 2 ZPP.",
    reasoning:
      "Stranke biraju dokaze, ali sud odlučuje o relevantnosti; kada veštačenje daje pouzdan odgovor na ključno pitanje, dodatno saslušavanje nije nužno.",
    keywords: ["poništanje testamenta", "testamentarna sposobnost", "veštačenje", "ZON", "ZPP"],
    related_articles: ["čl. 166 ZON", "čl. 229", "čl. 315 ZPP"],
    headnote:
      "Medicinski dokaz o demenciji u trenutku sastavljanja testamenta može zatvoriti dokazni postupak bez ponavljanja iskaza svedoka forme.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4102/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li prekid ostavinskog postupka radi parnice o testamentu produžava trajanje do mere povrede prava na suđenje u razumnom roku?",
    court_position:
      "Ustavni sud je usvojio žalbu zbog prekomernog trajanja ostavinskog postupka povezanog sa parnicom i dosudio naknadu nematerijalne štete.",
    reasoning:
      "Postupak je počeo 2005., više ročišta, prekid radi osporavanja testamenta; neefikasnost u parničnom delu reflektuje se na razumnost trajanja i prekinutog ostavinskog dela.",
    keywords: ["ustavna žalba", "razuman rok", "ostavinski postupak", "testament"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote:
      "Povezani ostavinski i parnični postupci ocenjuju se zajedno kada je ista imovinsko-pravna stvar u igri.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4013/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li parnični postupak koji traje preko 22 godine povredi pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni sud je utvrdio povredu prava na suđenje u razumnom roku; deo žalbe o pravičnom suđenju i imovini odbačen kao neosnovan.",
    reasoning:
      "Postupak obuhvata spor o formi testamenta i srodstvu svedoka; broj ročišta i faze ponavljanja ukazuju na sistemsko kašnjenje prvostepenog suda.",
    keywords: ["ustavna žalba", "razuman rok", "testament", "forma"],
    related_articles: ["čl. 32 st. 1 Ustava RS", "čl. 64 ZON (istorijski)"],
    headnote:
      "Izuzetno dugi civilni spor može biti samostalan osnov za ustavnu naknadu čak i kada meritum ostaje sporan.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 962/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li usmeno zaveštanje dato tokom teške bolesti ima pravnu važnost ako zaveštalac objektivno može da sačini pismeni testament?",
    court_position:
      "Apelacioni sud je potvrdio ništavost usmenog zaveštanja: nisu postojale izuzetne okolnosti iz čl. 110 ZON; restriktivno tumačenje izuzetne forme; očuvana svest i motorika ukazuju na mogućnost pismenog oblika.",
    reasoning:
      "Postepeno pogoršanje ranije bolesti nije iznenadna okolnost koja opravdava usmeni oblik; veštačenje potvrđuje odsustvo izuzetnih prilika.",
    keywords: ["usmeno zaveštanje", "izuzetne prilike", "čl. 110 ZON", "ništavost"],
    related_articles: ["čl. 110 ZON", "čl. 8 ZPP"],
    headnote:
      "Hospitalizacija sama po sebi ne zamenjuje kumulativne uslove za usmeno zaveštanje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4610/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li Ustavni sud može ponovo ocenjivati dokaze redovnih sudova u sporu o poništaju testament ako su razlozi detaljni?",
    court_position:
      "Ustavni sud je odbacio ustavnu žalbu: ocena grafoloških i medicinskih nalaza i zaključak o testamentskoj sposobnosti nisu proizvoljni.",
    reasoning:
      "Čl. 79 ZON o sposobnosti; rušljivost po čl. 166 samo za nesposobnost u trenutku sastavljanja; suprotni nalazi veštaka moraju se oceniti u vezi, što su redovni sudovi učinili.",
    keywords: ["ustavna žalba", "testament", "ocena dokaza", "pravično suđenje"],
    related_articles: ["čl. 32 Ustava RS", "čl. 79", "čl. 166 ZON"],
    headnote:
      "Ustavna kontrola ne zamenjuje kasaciju po činjenicama niti preferira jednog veštaka bez analize celokupnog spisa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5913/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li je pismeni testament pred svedocima punovažan ako je zaveštalac izjavio poslednju volju i potpisao pred dva istovremena svedoka?",
    court_position:
      "Vrhovni sud je odbio reviziju umešača i potvrdio niže presude: testament ispunjava čl. 64 ZON; nisu dokazane pretnja, prinuda, zabluda niti nesposobnost za rasuđivanje.",
    reasoning:
      "Revizija ne može osporavati činjenično stanje po čl. 407 st. 2 ZPP; dugogodišnje neospostavanje testamenta ide u prilog valjanosti.",
    keywords: ["testament pred svedocima", "forma", "čl. 64 ZON", "revizija"],
    related_articles: ["čl. 64 ZON", "čl. 407 st. 2 ZPP"],
    headnote:
      "Uloga svedoka je potvrda priznanja volje zaveštaoca, a ne zamena za dokaz o spoljnjim pritiscima bez konkretnih tvrdnji.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3862/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li štampani tekst svojeručnog zaveštanja koji je zaveštalac samo potpisao predstavlja poseban sudski testament ili valjano svojeručno zaveštanje?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju i preinačio presudu Apelacionog suda: odbijen je zahtev za poništaj; svojeručno zaveštanje je punovažno ako su ispunjeni uslovi čl. 79–84 ZON o sposobnosti i ozbiljnoj volji.",
    reasoning:
      "Prvostepeni sud je pogrešno ocenio da štampani tekst bez kucanja od strane zaveštaoca automatski krši formu; u konkretnom slučaju radi se o jedinstvenom svojeručnom testamentu.",
    keywords: ["svojeručno zaveštanje", "forma", "čl. 79–84 ZON", "revizija"],
    related_articles: ["čl. 79–84 ZON"],
    headnote:
      "Mehaničko tumačenje „rukopis“ ne sme ignorisati da je volja izražena potpisom na pripremljenom tekstu uz sposobnost i slobodu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1829/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li sud mora dosuđivati ništavost testamenta ako tužilac traži ništavost a činjenice podržavaju rušljivost zbog nesposobnosti?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu u poništaj umesto ništavosti: zbog nesposobnosti za rasuđivanje testament je rušljiv; sud nije vezan pravnim kvalifikacijom iz tužbe.",
    reasoning:
      "Tužilac se pozivao na čl. 166 i 168 ZON; identitet sporа je poništaj; zahtev za ništavost sadrži i poništaj kada su iste okolnosti.",
    keywords: ["poništanje testamenta", "rušljivost", "ništavost", "čl. 166 ZON"],
    related_articles: ["čl. 166–168 ZON"],
    headnote:
      "Kvalifikacija ništavosti vs rušljivosti zavisi od materijalnog osnova, ne od naslova tužbe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5089/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li oproštajno pismo koje ispunjava uslove može biti proglašeno za punovažno svojeručno zaveštanje?",
    court_position:
      "Apelacioni sud je potvrdio da je tužilac vlasnik stana po punovažnom svojeručnom testamentu (oproštajno pismo): tuženi nisu dokazali nesposobnost za rasuđivanje ostavilje.",
    reasoning:
      "Teret na osporavaoce; testament proglašen u vanparničnom postupku po čl. 106–107 ZVP; čl. 155–160 ZON o sadržini i javnom poretku.",
    keywords: ["svojeručno zaveštanje", "oproštajno pismo", "proglašenje testamenta", "ZON"],
    related_articles: ["čl. 106–107 ZVP", "čl. 155–160 ZON"],
    headnote:
      "Emotivni tekst pred smrt može biti poslednja volja ako nosi elemente zaveštanja i nema dokaza o nedostatku sposobnosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 7346/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li istovremeno postoje osnovi za ništavost i za poništaj testamenta zbog forme ako je potpis autentičan ali forma čitanja sporna?",
    court_position:
      "Vrhovni sud je odbio reviziju za ništavost (nema apsolutnih razloga), ali ukinuo presude u delu poništaja zbog forme i vratio predmet na ponovno suđenje zbog neraspravljene bitne činjenice.",
    reasoning:
      "Autentičnost potpisa ne isključuje sporna pitanja o proceduralnoj izjavi zaveštaoca pred svedocima; drugostepeni sud je doneo zaključak o formi bez potpunog ispitivanja.",
    keywords: ["testament pred svedocima", "forma", "ništavost", "rušljivost", "ukidanje"],
    related_articles: ["čl. 85 ZON", "čl. 168 ZON", "ZPP"],
    headnote:
      "Grafološka autentičnost i ispunjenost čl. 85 mogu zahtevati razdvojeno ispitivanje za različite pravne posledice.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 8880/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li je zaveštanje ništavo ako nepismeno lice nije učestvovalo u izjavi volje i potpisivanju u smislu čl. 85 ZON?",
    court_position:
      "Vrhovni sud je potvrdio ništavost: ne radi se o rušljivosti oblika već o nepostojećem pravnom poslu jer nije izražena volja zaveštaoca; protivtužba odbačena zbog prekluzivnih rokova iz čl. 169 ZON.",
    reasoning:
      "Nepismeno lice, potpis koji nije čitljiv, svedoci — postupak iz čl. 85 nije ispoštovan; rokovi za rušljivost ne primenjuju se na apsolutnu ništavost u ovom delu.",
    keywords: ["ništavost testamenta", "čl. 85 ZON", "čl. 169 ZON", "nepismeno lice"],
    related_articles: ["čl. 85", "čl. 155–157", "čl. 169 ZON"],
    headnote:
      "Kada volja nije učestvovala u poslu, pitanje je egzistencije posla, ne samo formalne rušljivosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 485/2025",
    legal_area: "procedural",
    legal_question:
      "Da li sud može doneti rešenje o povlačenju tužbe nakon smrti jednog od tužilaca pre zakazanog ročišta?",
    court_position:
      "Apelacioni sud je ukinuo rešenje o povlačenju tužbe: smrt stranke prekid postupka nastupa po sili zakona, pa o povlačenju nema mesta odlučivati.",
    reasoning:
      "Postupak za osporavanje testamenta i nužni deo; smrt pre glavne rasprave zahteva prekid i nasledivanje procesnog položaja, a ne formalno „povlačenje“.",
    keywords: ["smrt stranke", "prekid postupka", "povlačenje tužbe", "ZPP"],
    related_articles: ["ZPP"],
    headnote:
      "Procesna radnja koja pretpostoji živu stranku je ništava posle nastupanja zakonskog prekida.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 400/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li mane volje i zaveštajna nesposobnost predstavljaju razloge apsolutne ništavosti ako je tužbeni zahtev za ništavost?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost: navodi o čl. 166–167 ZON odnose se na rušljivost i poništaj, a apsolutna ništavost po čl. 155–161 nije dokazana; testament je svojeručan i nije falsifikovan.",
    reasoning:
      "Sud pazi na ništavost po službenoj dužnosti samo za taksativne slučajeve; tužilac nije tražio poništaj pa je ostao na neosnovanom zahtevu za ništavost.",
    keywords: ["ništavost", "rušljivost", "svojeručno zaveštanje", "ZON"],
    related_articles: ["čl. 155–161", "čl. 166–167 ZON"],
    headnote:
      "Kvalifikacija razloga mora pratiti zakonsku podelu između apsolutne ništavosti i rušljivosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4077/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li su dva svojeručna zaveštanja punovažna ako grafoskopsko i neuropsihijatrijsko veštačenje potvrđuju autentičnost i sposobnost?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost oba testamenta: autentičnost i zaveštajna sposobnost utvrđeni; prigovor zastarelosti u vezi sa čl. 59 st. 1 ZON nije merodavan za pravilnost izreke o punovažnosti.",
    reasoning:
      "Čl. 156–157 ZON; rok od deset godina za poništaj prema nesavesnom licu nije isti problem kao meritorna valjanost.",
    keywords: ["svojeručno zaveštanje", "veštačenje", "punovažnost", "ZON"],
    related_articles: ["čl. 156–157 ZON", "čl. 169 ZON"],
    headnote:
      "Dva uzastopna testamenta mogu biti nezavisno validna kada dokazi ne ukazuju na slabost volje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1179/2008",
    legal_area: "inheritance",
    legal_question:
      "Da li je dovoljna samo formalna ispravnost testamenta pred svedocima ako tužilac osporava testamentsku sposobnost zbog dugogodišnje bolesti?",
    court_position:
      "Vrhovni sud je ukinuo nižestepene presude: sudovi su propustili da razmotre navode o nesposobnosti za rasuđivanje uprkos formalno ispravnom čl. 85 ZON.",
    reasoning:
      "Rušljivost po čl. 166 ZON zahteva ocenu sposobnosti u trenutku sastavljanja; odsustvo razloga o toj okolnosti čini presudu neproverljivom.",
    keywords: ["testamentarna sposobnost", "rušljivost", "čl. 166 ZON", "ukidanje"],
    related_articles: ["čl. 85", "čl. 166 ZON"],
    headnote:
      "Formalna savršenost ne zamenjuje meritornu procenu volje kod zavisnosti i bolesti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2382/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li je pismeno zaveštanje pred svedocima ništovo ako svedoci nisu istovremeno prisustvovali potpisivanju?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženih i potvrdio ništavost: bez istovremenog prisustva i jasnog čina potpisivanja testament nema pravnu važnost.",
    reasoning:
      "Revizija ne može ponovo osporavati činjenice po čl. 407 st. 2 ZPP; drugostepeni sud je pravilno primenio čl. 85 ZON.",
    keywords: ["testament pred svedocima", "svedoci", "ništavost", "čl. 85 ZON"],
    related_articles: ["čl. 85 ZON", "čl. 414 ZPP"],
    headnote:
      "Svedoci moraju biti u istom prostoru i vremenu za ceo čin priznanja i potpisa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 741/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li nedovoljno obrazloženje drugostepene presude i dužina postupka povređuju ustavna prava u sporu o testamentu?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu: presuda je ustavnopravno prihvatljivo obrazložena pozivom na prvostepene razloge; trajanje postupka nije nerazumno dugo.",
    reasoning:
      "Grafološko veštačenje i ocena suprotnih nalaza veštaka u okviru slobodne ocene dokaza; pravnosnažna presuda o svojini ne ukida pravo na žalbu po suštini.",
    keywords: ["ustavna žalba", "obrazloženje presude", "testament", "veštačenje"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote:
      "Referisanje na ranije razloge može biti dovoljno ako ne ostavlja arbitrarnu prazninu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 22/2008",
    legal_area: "constitutional",
    legal_question:
      "Da li parnica za poništaj testamenta koja traje preko sedam godina povredi pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, utvrdio povredu prava na suđenje u razumnom roku i dosudio naknadu štete zbog dužine postupka.",
    reasoning:
      "Materijalno pravo o testamentu (čl. 59–62 istorijskog ZON) nije isključilo obavezu države da postupak završi u razumnom roku.",
    keywords: ["ustavna žalba", "razuman rok", "poništanje testamenta"],
    related_articles: ["čl. 32 Ustava RS", "ZON"],
    headnote:
      "Spori spor o testamentu i manama volje posebno zahteva procesnu efikasnost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4018/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li otisak prsta umesto svojeručnog potpisa na testamentu pred svedocima čini testament ništavim?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu odluku i utvrdio ništavost: za lice koje zna da piše čl. 85 ZON zahteva svojeručni potpis, ne otisak prsta.",
    reasoning:
      "Prvostepeni sud je greškom kvalifikovao pitanje kao rušljivost umesto apsolutne ništavosti oblika; sud pazi na ništavost po službenoj dužnosti po čl. 161 ZON.",
    keywords: ["testament pred svedocima", "potpis", "ništavost", "čl. 85 ZON"],
    related_articles: ["čl. 85", "čl. 161–165 ZON"],
    headnote:
      "Biometrijski otisak nije ekvivalent „svojeručnog potpisa“ za pismeno lice.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13863/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li inostrano zaveštanje pred svedocima u bolnici može biti poništeno zbog nesposobnosti za rasuđivanje zbog bolesti i terapije?",
    court_position:
      "Vrhovni sud je potvrdio poništaj testamenta u Beču: veštačenjem je utvrđeno da volja nije bila slobodna i svesna u smislu testamentske sposobnosti.",
    reasoning:
      "Testament je strogo formalan; svest o značaju radnje i slobodna namera su imperativni elementi poslednje volje.",
    keywords: ["testamentarna sposobnost", "poništanje", "inostrani testament", "ZON"],
    related_articles: ["čl. 79", "čl. 166 ZON"],
    headnote:
      "Teška somatska i farmakološka stanja mogu isključiti valjanu izjavu volje i u inostranstvu ako je merodavno pravo to prihvata.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3763/2010",
    legal_area: "inheritance",
    legal_question:
      "Da li se može tražiti brisanje uknjižbe svojine tužene ako je deo testamenta ništav zbog raspolaganja tuđom imovinom, a uknjižba potiče iz pravnosnažnog ostavinskog rešenja?",
    court_position:
      "Apelacioni sud je potvrdio delimičnu ništavost testamenta za tuđi stan, ali preinačio presudu i odbio zahtev za brisanje uknjižbe jer je ona izvršena na osnovu pravnosnažnog ostavinskog rešenja.",
    reasoning:
      "Parnica o ništavosti dela testamenta ne razbija automatski katastarski položaj nastao po drugom pravnom osnovu bez posebnog sporaziva.",
    keywords: ["ništavost testamenta", "uknjižba", "tuđa imovina", "ZON"],
    related_articles: ["čl. 155–157 ZON"],
    headnote:
      "Uspeh u delu testamenta ne implicira automatski rešavanje imovinsko-pravnog knjiženja bez odgovarajućeg tužbenog zahteva.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9873/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li drugostepeni sud može potvrditi ništavost testamenta ako nije razmotrio da otisak prsta umesto potpisa krši čl. 85 ZON?",
    court_position:
      "Vrhovni sud je ukinuo presudu Apelacionog suda i vratio predmet: pogrešna primena materijalnog prava na formu pismenog zaveštanja pred svedocima.",
    reasoning:
      "Kada zaveštalac nije svojeručno potpisao već stavio otisak prsta, testament ne ispunjava čl. 85 ZON; tužilja se pozivala i na rušljivost — sud vezan identitetom zahteva može doneti poništaj u granicama tužbe.",
    keywords: ["ukidanje", "testament pred svedocima", "forma", "čl. 85 ZON"],
    related_articles: ["čl. 85", "čl. 168 ZON", "ZPP"],
    headnote:
      "Drugostepeni sud mora sam primeniti čl. 85 kada prvostepeni pravilno ukaže na nedostatak potpisa.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4728/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li se može utvrditi punovažnost usmenog zaveštanja ako u kritičnom trenutku nisu postojale izuzetne okolnosti koje sprečavaju pismeni testament?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva: sama bolest nije izuzetna prilika ako je postojala mogućnost pismenog oblika; izjava pred svedocima nije imala karakter usmenog zaveštanja već razgovora o željama.",
    reasoning:
      "Izuzetna forma zahteva restriktivno tumačenje; kada objektivno i subjektivno postoji mogućnost pismenog testamenta, usmeni oblik nije punovažan.",
    keywords: ["usmeno zaveštanje", "izuzetne prilike", "čl. 110 ZON", "forma"],
    related_articles: ["čl. 110 ZON"],
    headnote:
      "Konverzacija o nasleđu bez kumulativnih uslova čl. 110 ne stvara testament.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 236/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li je pismeno zaveštanje pred svedocima apsolutno ništavo ako grafološko veštačenje utvrdi da potpis zaveštaoca nije autentičan?",
    court_position:
      "Apelacioni sud je potvrdio ništavost: potpis je falsifikovan, što krši imperativ uslova svojeručnog potpisa i čini testament apsolutno ništavim; rokovi za rušljivost se ne primenjuju.",
    reasoning:
      "Falsifikat i nedostatak autentičnog potpisa ulaze u čl. 157 ZON; sud pazi na ništavost po službenoj dužnosti.",
    keywords: ["falsifikat", "testament pred svedocima", "ništavost", "grafologija"],
    related_articles: ["čl. 64", "čl. 157", "čl. 161 ZON"],
    headnote:
      "Imitacija potpisa materijalno-pravno poništava posao, ne samo procesnu rušljivost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1843/2017",
    legal_area: "inheritance",
    legal_question:
      "Da li oštećenje vida sprečava punovažnost pismenog zaveštanja pred svedocima ako zaveštalac može da pročita tekst uz pomagala?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio punovažnost testamenta: ispunjeni su uslovi forme i sadržine po Zakonu o nasleđivanju.",
    reasoning:
      "Sposobnost čitanja uz pomoć ne isključuje izjavu poslednje volje pred svedocima ako je postupak iz čl. 85 ispoštovan u suštini.",
    keywords: ["testament pred svedocima", "invaliditet", "forma", "punovažnost"],
    related_articles: ["čl. 85 ZON"],
    headnote:
      "Prilagođavanje pomagalima ne automatski ukida testamentsku sposobnost ni formu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3059/2017",
    legal_area: "inheritance",
    legal_question:
      "Da li se istovremeno mogu tražiti ništavost i poništaj dopune testamenta kada su činjenice delimično vezane za formu?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za utvrđenje ništavosti, ali vratio predmet na ponovno suđenje radi ispitivanja rušljivosti zbog mogućeg nedostatka zakonske forme.",
    reasoning:
      "Sud je vezan identitetom zahteva; kada činjenice upućuju i na rušljivost oblika, drugostepeni sud mora posebno razmotriti čl. 168 ZON.",
    keywords: ["ništavost", "rušljivost", "dopuna testamenta", "ukidanje"],
    related_articles: ["čl. 85", "čl. 168 ZON", "ZPP"],
    headnote:
      "Odbijanje ništavosti ne isključuje remand za rušljivost ako forma nije konačno razjašnjena.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2459/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li mesto čuvanja olografskog testamenta u knjizi ukazuje na nedostatak stvarne volje?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost: testament je autentičan, ostavilja je bila sposobna za rasuđivanje; čuvanje u knjizi ne utiče na valjanost.",
    reasoning:
      "Olografski testament se po pravilu sam čuva; motivaciona neautentičnost iz veštačkog mišljenja ne prevazilazi nalaz o sposobnosti u trenutku sastavljanja.",
    keywords: ["svojeručno zaveštanje", "autentičnost", "testamentarna sposobnost", "ZON"],
    related_articles: ["čl. 84 ZON"],
    headnote:
      "Sakrivanje od trećih lica nije suprotno ozbiljnoj volji ako nema dokaza o pritisku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1400/2015",
    legal_area: "inheritance",
    legal_question:
      "Da li je zaveštanje pred svedocima valjano ako je jedan od svedoka brat zaveštaoca u drugom stepenu pobočnog srodstva?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio presudu kojom je poništeno zaveštanje pred svedocima: zbog nedozvoljenog srodstva zaveštajnog svedoka (brat u drugom stepenu pobočnog srodstva) testament je rušljiv i podložan poništaju.",
    reasoning:
      "Zakon o nasleđivanju ograničava krug svedoka; srodstvo koje isključuje podobnost dovodi do poništaja bez obzira na to da li je svedoku ostavljena korist.",
    keywords: ["zaveštajni svedok", "srodstvo", "poništanje", "čl. 113 ZON"],
    related_articles: ["čl. 113", "čl. 168 ZON"],
    headnote:
      "Formalna prisutnost dva lica nije dovoljna ako jedno nije podoban svedok.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13331/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li potpuno isključenje vanbračnog deteta iz nasleđa testamentom čini testament ništavim?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilje: autentičnost potpisa potvrđena veštačenjem; potpuno lišenje nasleđa ne čini testament ništavim već aktivira pravo na nužni nasledni deo.",
    reasoning:
      "Hipoteza o nedopuštenom uticaju nije dokazana po čl. 228–231 ZPP; nužni deo se namiruje smanjenjem raspolaganja, ne ništavošću celog testamenta.",
    keywords: ["nužni deo", "vanbračno dete", "punovažnost testamenta", "ZON"],
    related_articles: ["čl. 27–30 ZON", "ZPP"],
    headnote:
      "Ekstremna neravnoteža raspodele ne zamenjuje taksativne razloge ništavosti.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2216/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li je poništaj zaveštanja pred svedocima osnovan kada zaveštalac nije svojeručno potpisao testament i svedok je brat u nedozvoljenom srodstvu?",
    court_position:
      "Apelacioni sud je potvrdio poništaj: veštačenjem utvrđeno da potpis nije zaveštalčev; nepodoban svedok i nedostatak ličnog potpisa krše čl. 85 ZON.",
    reasoning:
      "Otisak prsta ne zamenjuje potpis pismenog lica; brat kao svedok nije podoban; forma se ispituje kroz svedočenje i grafološke nalaze.",
    keywords: ["poništanje", "forma", "zaveštajni svedok", "čl. 85 ZON"],
    related_articles: ["čl. 85", "čl. 113", "čl. 168 ZON"],
    headnote:
      "Kumulacija nedostataka forme i svedoka podržava usvajanje primarnog zahteva za poništaj.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 19343/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li je javnobeležnički testament sačinjen u inostranstvu punovažan po domaćem i međunarodnom privatnom pravu?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilje i potvrdio punovažnost testamenta pred javnim beležnikom u Minhenu i testamentsku sposobnost ostavilje.",
    reasoning:
      "Merodavnost za formu i sposobnost rešava se po ZRSJPZ; testament punovažan ako ispunjava jedan od merodavnih oblika; sadržina u skladu sa imperativima.",
    keywords: ["inostrani testament", "javni beležnik", "sukob zakona", "ZON"],
    related_articles: ["čl. 30–31 ZRSJPZ", "čl. 84 Zakona o javnom beležništvu"],
    headnote:
      "Strani notarski akt može proizvoditi dejstvo u RS kada su ispunjeni kolizioni i materijalni uslovi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6712/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li ugovor o doživotnom izdržavanju koji je zaključen posle ranijeg testamenta opoziva ranije zaveštanje i da li je ugovor ništav zbog nesposobnosti?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost ugovora o doživotnom izdržavanju: primalac je bio poslovno sposoban; ugovor po čl. 178 ZON ima dejstvo opoziva ranijeg testamenta.",
    reasoning:
      "Lekarsko veštačenje potvrđuje sposobnost u kritičnom trenutku; četvrti tužen nije pasivno legitimisan za taj ugovor.",
    keywords: ["doživotno izdržavanje", "opoziv testamenta", "čl. 178 ZON", "sposobnost"],
    related_articles: ["čl. 178 ZON"],
    headnote:
      "Kasniji ugovor o izdržavanju može pravno zameniti raniji testament bez ništavosti ako nema dokaza o nedostatku volje.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 635/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li je međunarodni testament ništav zbog navodnog falsifikata potpisa ostavioca?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: grafološka veštačenja pokazuju autentičan potpis; nema osnova za ništavost po čl. 157 ZON.",
    reasoning:
      "Sud je dao jasne razloge o značaju svakog dokaza; izjava javnog beležnika i svedoka podržavaju formalnu ispravnost.",
    keywords: ["međunarodni testament", "autentičnost potpisa", "grafologija", "ZON"],
    related_articles: ["čl. 92–101", "čl. 157 ZON"],
    headnote:
      "Višestruko veštačenje u istom smeru jača zaključak o autentičnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2226/2010",
    legal_area: "inheritance",
    legal_question:
      "Da li bračni drugovi mogu valjano sastaviti zajednički (uzajamni) testament o nasleđivanju?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i utvrdio ništavost uzajamnog testamenta jer zakon ne poznaje zajedničku izjavu volje kao testament.",
    reasoning:
      "Testament je ličan jednostrani posao; forma služi punovažnosti, ne samo dokazu; zajednički testament suprotan je prirodi instituta.",
    keywords: ["uzajamni testament", "forma", "ništavost", "ZON"],
    related_articles: ["čl. 62", "čl. 77 ZON"],
    headnote:
      "Bračni par ne može jednim aktom usloviti uzajamno nasleđivanje u obliku koji zakon ne predviđa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 7691/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li se na rok iz čl. 61 Zakona o nasleđivanju iz 1974. godine primenjuju pravila prekida zastarelosti iz Zakona o obligacionim odnosima?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: protekao je prekluzivni rok od jedne godine od proglašenja testamenta; pravila zastarelosti ZOO se ne primenjuju.",
    reasoning:
      "Prekluzivni rok gubi pravo na zaštitu u celosti; osporavanje sposobnosti posle isteka roka postaje bezpravno bez obzira na stvarnu sposobnost.",
    keywords: ["prekluzivni rok", "testament", "ZON 1974", "čl. 61"],
    related_articles: ["čl. 61 ZON (1974)", "čl. 370 ZOO", "čl. 372 ZPP"],
    headnote:
      "Materijalni rokovi ZON isključuju analogiju sa zastarelostju obaveza.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 704/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li zakonski naslednici mogu tražiti susvojinu na celoj zaostavštini ako postoji punovažan testament koji celu imovinu ostavlja jednom licu?",
    court_position:
      "Apelacioni sud je odbio žalbu i potvrdio odbijanje zahteva za susvojinu: testament je jači osnov od zakona; tuženi nije osporio punovažnost.",
    reasoning:
      "Pravnosnažnost rešenja o nasleđivanju ne sprečava naknadno proglašen testament, ali u parnici je utvrđena valjanost i isključeno zakonsko nasleđivanje u korist tužilaca.",
    keywords: ["susvojina", "testament", "zaostavština", "ZON"],
    related_articles: ["čl. 106–107 ZVP", "čl. 129 ZVP"],
    headnote:
      "Kada je poslednja volja valjano utvrđena, zahtev za zakonsko udele ne može proći.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1980/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilac ima pravni interes za tužbu za ništavost testamenta ako su njegova prava već konačno rešena u ranijem sporu sa naslednikom?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: nema direktnog pravnog interesa jer pobijanje testamenta ne bi promenilo tužiočev položaj u odnosu na već rešena prava iz ugovora o razmeni.",
    reasoning:
      "Pravni interes zahteva da ishod spora utiče na pravnu situaciju tužioca; falsifikat nije dokazan, ali bi i uz to interes ostao odsutan.",
    keywords: ["pravni interes", "ništavost testamenta", "pravnosnažnost", "ZPP"],
    related_articles: ["ZPP"],
    headnote:
      "Paralelno osporavanje iste imovine nije dozvoljeno bez procesne potrebe.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 534/2023",
    legal_area: "family",
    legal_question:
      "Da li je brak zaključen između pokojnog oca i tužene ništav zbog nedostatka sposobnosti oca za rasuđivanje?",
    court_position:
      "Apelacioni sud je odbio žalbu tužilje i potvrdio presudu kojom je odbijen zahtev za ništavost braka: u trenutku sklapanja braka pokojnik je bio sposoban i postojala je ozbiljna namera zajednice života.",
    reasoning:
      "Zdravstveno uverenje i ponašanje ukazuju na nameru da se osporavanje sposobnosti izbegne; veštačenje neuropsihijatra podržava zaključak o sposobnosti.",
    keywords: ["ništavost braka", "sposobnost za rasuđivanje", "bračna zajednica"],
    related_articles: ["Porodični zakon"],
    headnote:
      "Osporavanje braka radi naslednih posledica zahteva stroge dokaze o nedostatku volje ili sposobnosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1129/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li je tužba za poništaj rušljivog testamenta blagovremena ako je podneta više od godinu dana od proglašenja zaveštanja?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za poništaj: primenjen je rok iz čl. 170 ZON za rušljivost oblika; sud je ocenio da je pravo na zahtev za poništaj prekludirano.",
    reasoning:
      "Izreka presude nije protivrečna; činjenično stanje o momentu saznanja i podnošenja tužbe podržava zaključak o neblagovremenosti.",
    keywords: ["poništanje", "rok", "čl. 170 ZON", "proglašenje testamenta"],
    related_articles: ["čl. 170 ZON"],
    headnote:
      "Državni nosilac prava mora poštovati iste rokove kao privatni tužilac kada je u istom položaju saznanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6718/2010",
    legal_area: "inheritance",
    legal_question:
      "Da li je testament pred svedocima ništav ako zaveštalac koristi skraćeni potpis i otisak prsta uz dva valjana primerka?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i odbio tužbu za ništavost: grafološki utvrđeno da je zaveštalac potpisala oba varijantna imena; čl. 85 ne zahteva puno ime i prezime u potpisu ako je autentičnost dokazana.",
    reasoning:
      "Otisak prsta slabi na jednom primerku ne ukida valjanost drugog; zaveštalac je znala da čita i piše; formalni uslov je ispunjen u smislu svojeručnog potpisa nakon izjave pred svedocima.",
    keywords: ["testament pred svedocima", "potpis", "čl. 85 ZON", "grafologija"],
    related_articles: ["čl. 85 ZON"],
    headnote:
      "Varijacija potpisa (skraćenica imena) ne automatski poništava olografski element kada je identitet zaveštalca utvrđen.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1573/2018",
    legal_area: "labor",
    legal_question:
      "Da li odbijanje alkotestiranja neposredno posle isteka radnog vremena u prostorijama poslodavca predstavlja opravdan otkazni razlog?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio zakonitost otkaza: kršenje radne discipline i Pravilnika o testiranju opravdava otkaz po čl. 179 st. 2–3 Zakona o radu.",
    reasoning:
      "Istek radnog vremena ne oslobađa obaveze iz ugovora i pravilnika dok je zaposleni još u radnom okruženju; poslodavac može uvesti kontrolu alkohola radi bezbednosti.",
    keywords: ["otkaz", "alkotest", "radna disciplina", "Zakon o radu"],
    related_articles: ["čl. 179 ZR"],
    headnote:
      "Odbijanje alkotesta posle radnog vremena u prostorijama poslodavca može biti kršenje discipline kada ugovor i pravilnik to zahtevaju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 343/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li na teretu dokazivanja ispunjenosti forme testamenta pred svedocima leži tužilac ili tuženik i da li desetogodišnje trajanje postupka povredi Ustav?",
    court_position:
      "Ustavni sud je usvojio žalbu: utvrđena povreda prava na suđenje u razumnom roku i dosuđena šteta; poništena presuda Apelacionog suda zbog proizvoljne primene prava na teret dokazivanja negativne činjenice (ispunjenost forme).",
    reasoning:
      "Nepostojanje forme je negativna činjenica; teret da je forma ispunjena prelazi na onoga kome nedokazanost ide u prilog; čl. 32 Ustava zahteva efikasnost i predvidljivost.",
    keywords: ["ustavna žalba", "teret dokazivanja", "forma testamenta", "razuman rok"],
    related_articles: ["čl. 32 Ustava RS", "čl. 223 st. 3 ZPP", "čl. 85 ZON"],
    headnote:
      "U testamentnim sporovima raspodela tereta mora poštovati logiku negativnih činjenica.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1631/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li prisustvo buduće naslednice pri potpisivanju automatski čini nedozvoljenog zaveštajnog svedoka?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za poništaj: tužena nije bila zaveštajni svedok u smislu zakona već prisutno lice; formalni uslovi čl. 85 ispunjeni; nije dokazana nesposobnost testatora.",
    reasoning:
      "Zakon zahteva dva svedoka koji potvrđuju čin priznanja volje; prisustvo potencijalnog naslednika nije samo po sebi nedostatak forme ako nije potpisala kao svedok.",
    keywords: ["testament pred svedocima", "zaveštajni svedok", "forma", "čl. 85 ZON"],
    related_articles: ["čl. 85 ZON"],
    headnote:
      "Uloga lica u aktu mora se razlikovati od formalnog svojstva svedoka.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 10945/2025",
    legal_area: "inheritance",
    legal_question:
      "Da li je revizija dozvoljena u sporu za redukciju testamenta nakon proteka tri godine od proglašenja ako je vrednost spora ispod cenzusa?",
    court_position:
      "Vrhovni sud nije dozvolio ni posebnu ni redovnu reviziju: tužba za smanjenje raspolaganja podneta je nakon isteka roka iz čl. 59 st. 1 ZON od tri godine od proglašenja.",
    reasoning:
      "Uslovi čl. 404 ZPP za izuzetnu reviziju nisu ispunjeni; prekluzivni rok za redukciju isključuje meritornu zaštitu u kasacionoj fazi.",
    keywords: ["revizija", "redukcija testamenta", "rok", "čl. 59 ZON"],
    related_articles: ["čl. 59 st. 1 ZON", "čl. 404 ZPP"],
    headnote:
      "Procesni zakon ne otvara reviziju kada materijalno pravo već isključuje pravo na tužbu.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4568/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li desetogodišnje trajanje parničnog postupka i ništavost zajedničkog testamenta povređuju pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni sud je usvojio žalbu u delu razumnog roka i dosudio 1.200 EUR nematerijalne štete; meritum o zajedničkom testamentu ostaje u okviru redovnih sudova.",
    reasoning:
      "Postupak je trajao preko deset godina; drugostepeni sud je utvrdio ništavost zajedničkog testamenta kao oblika koji zakon ne poznaje, ali sama dužina postupka predstavlja samostalnu ustavnu povredu.",
    keywords: ["ustavna žalba", "razuman rok", "zajednički testament", "naknada štete"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote:
      "Čak i kada redovni sudovi donesu meritorno odlučujuću presudu, trajanje može biti neustavno.",
    outcome: "partially",
  },
{
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1846/2019",
    legal_area: "inheritance",
    legal_question:
      "Da li je izjava dužnika o odricanju od nasleđa pobojiva ako je ostavilac testamentom odredio tuženog za naslednika?",
    court_position:
      "Vrhovni kasacioni sud je preinačio nižestepene presude i odbio tužbu poverilaca: odricanje od zakonskog nasleđa nema pravnog dejstva kada postoji valjano zaveštanje u korist istog lica.",
    reasoning:
      "Testament i pravnosnažna presuda na priznanje u završnoj fazi ne mogu služiti samo za sprečavanja naplate potraživanja; materijalno pravo na pobijanje radnji dužnika primenjeno je pogrešno u odnosu na dejstvo testamenta.",
    keywords: ["odricanje od nasleđa", "testament", "pobijanje radnji dužnika", "ZOO"],
    related_articles: ["čl. 280–283 ZOO", "ZON"],
    headnote:
      "Naslednički akt jačeg dejstva isključuje smisleno odricanje koje bi anuliralo testament.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2540/2019",
    legal_area: "commercial",
    legal_question:
      "Da li manjinski akcionari mogu pobijati odluke skupštine o ispravci finansijskih izveštaja i testiranju umanjenja vrednosti nekretnina?",
    court_position:
      "Privredni apelacioni sud je potvrdio odbijanje tužbe: odluke o retroaktivnoj ispravci grešaka i usvajanju izveštaja revizora su u skladu sa zakonom i računovodstvenim standardima.",
    reasoning:
      "Tužioci kao mikro-akcionari nisu dokazali nezakonitost tačaka dnevnog reda; žalbena kontrola nije našla bitnu povredu postupka.",
    keywords: ["skupština akcionara", "finansijski izveštaji", "manjinski akcionari", "društvo kapitala"],
    related_articles: ["Zakon o privrednim društvima", "ZPP"],
    headnote:
      "Tehničko-knjižne korekcije uz mišljenje revizora mogu biti zakonite ako nisu diskriminatorne prema manjini.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6301/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li je usmeno zaveštanje u bolnici neposredno pred smrt punovažno ako je došlo do naglog pogoršanja i nije bilo vremena za advokata i pismeni testament?",
    court_position:
      "Apelacioni sud je potvrdio punovažnost usmenog zaveštanja: postojale su izuzetne okolnosti u smislu čl. 110 ZON; smrt nekoliko sati posle izjave čini rok od 30 dana nebitnim.",
    reasoning:
      "Zdravstveno stanje, krvarenje, svest i kratko vreme do smrti isključuju objektivnu i subjektivnu mogućnost drugog oblika; izjava pred svedocima ima značaj poslednje volje.",
    keywords: ["usmeno zaveštanje", "izuzetne prilike", "bolnica", "čl. 110 ZON"],
    related_articles: ["čl. 110 ZON"],
    headnote:
      "Kratka prozor prilike pred smrt može opravdati usmeni oblik kada pismeni nije realno dostupan.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3981/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li je valjano isključenje dece iz nasleđa testamentom ako je zaveštalac imao ozbiljne razloge zbog nebrige o njemu?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za poništaj: testament je formalno ispravan i osnovano je korišćenje instituta isključenja iz nasleđa zbog teže povrede moralnih obaveza.",
    reasoning:
      "Sud je ocenio iskaze svedoka i tužene u logičnoj vezi sa dokumentacijom o neposetu i ravnodušnosti dece; sloboda raspolaganja unutar zakonskih granica.",
    keywords: ["isključenje iz nasleđa", "moralne obaveze", "testament", "ZON"],
    related_articles: ["čl. 63 ZON", "čl. 85 ZON"],
    headnote:
      "Teško zanemarivanje roditelja može podržati valjanost isključenja kada je jasno motivisano u testamentu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 142/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li nedostatak svojeručnog potpisa zaveštaoca na testamentu pred svedocima predstavlja apsolutnu ništavost umesto rušljivosti?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i utvrdio ništavost: faksimil ili otisak prsta ne zamenjuju svojeručni potpis pismenog lica; ostaje otvoreno pitanje eventualnog poništaja ako ništavost uspe.",
    reasoning:
      "Kada je osnovan zahtev za ništavost, sud ne mora odlučivati o eventualnom poništaju po čl. 197 st. 2 ZPP; čl. 85 ZON zahteva lični potpis.",
    keywords: ["ništavost", "potpis zaveštaoca", "testament pred svedocima", "čl. 85 ZON"],
    related_articles: ["čl. 85 ZON", "čl. 197 st. 2 ZPP"],
    headnote:
      "Apsolutna ništavost oblika isključuje primenu rokova za rušljivost u istom pravnom režimu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4561/2020",
    legal_area: "inheritance",
    legal_question:
      "Da li je valjano isključenje sina iz nasleđa i nužnog dela zbog težeg ogrešenja o moralne obaveze prema ocu?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio da je ostavilac u testamentu pred svedocima valjano isključio sina iz nasleđa i nužnog dela.",
    reasoning:
      "Tužilac nije blagovremeno osporio isključenje u ostavinskom postupku; testament ispunjava čl. 85 ZON; izjava o neostavljanju imovine zbog ponašanja sina nije dokazano ubačena od trećeg lica.",
    keywords: ["isključenje iz nasleđa", "nužni deo", "čl. 63 ZON", "moralne obaveze"],
    related_articles: ["čl. 63 ZON", "čl. 85 ZON"],
    headnote:
      "Isključenje mora biti izričito i dokazi o sposobnosti i slobodnoj volji zaveštaoca moraju podržati odluku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3943/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li je povređena forma pismenog zaveštanja pred svedocima ako zaveštalac nije doslovno izjavio da je tekst pročitao, već da testament u celini odgovara njegovoj volji?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio punovažnost: izjava da testament odgovara volji nakon čitanja i svojeručni potpis ispunjavaju suštinu čl. 85 st. 1 ZON.",
    reasoning:
      "Svedoci potvrđuju čitanje i potpisivanje; nisu ispunjeni razlozi rušljivosti po čl. 168 ZON; stroga formalnost ne zahteva magistralnu formulaciju ako je volja nedvosmislena.",
    keywords: ["testament pred svedocima", "forma", "čl. 85 ZON", "revizija"],
    related_articles: ["čl. 85", "čl. 164", "čl. 168 ZON"],
    headnote:
      "Funkcionalno priznanje sadržaja može zadovoljiti zakon i kada reč „pročitao“ nije doslovno ponovljena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4360/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li grafološka neslaganja veštaka prevladaju nad saglasnim iskazima testamentalnih svedoka o autentičnosti potpisa starice?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i usvojio tužbeni zahtev: data je prednost neposrednim iskazima svedoka koji su videli potpis; varijacije potpisa mogu biti posledica starosti.",
    reasoning:
      "Pravilo o slobodnoj oceni dokaza ne znači automatsku prednost veštaka nad svedocima bez analize verodostojnosti; punovažan testament osnov je za vraćanje stana u državinu tužilje.",
    keywords: ["svojeručno zaveštanje", "svedoci", "grafologija", "čl. 64 ZON"],
    related_articles: ["čl. 8 ZPP", "čl. 20 Zakona o osnovama svojinskopravnih odnosa"],
    headnote:
      "Neposredni svedoci čina potpisivanja mogu biti uverljiviji od spekulativnih grafoloških zaključaka kod starijih lica.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3871/2023",
    legal_area: "labor",
    legal_question:
      "Da li odbijanje alkotestiranja na radu predstavlja zakonit otkazni razlog po pravilniku poslodavca?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio zakonitost otkaza: pravilnik o testiranju u dahu u vezi sa čl. 179 st. 3 tačka 8 Zakona o radu i kolektivnim ugovorom daje osnov za disciplinsku meru.",
    reasoning:
      "Poslodavac je uredno regulisao postupak; odbijanje testiranja je formalizovano kao kršenje discipline koje onemogućava nastavak radnog odnosa.",
    keywords: ["otkaz", "alkotest", "radna disciplina", "Zakon o radu"],
    related_articles: ["čl. 179 st. 3 ZR"],
    headnote:
      "Interni akt poslodavca o alkotestiranju može imati punu pravnu snagu ako je donet u okviru zakonskih ovlašćenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 10009/2023",
    legal_area: "inheritance",
    legal_question:
      "Da li je osnovan poništaj testamenta pred svedocima ako zaveštalac nije lično pročitao tekst već mu ga je pročitao svedok, bez izričite izjave da je sam pročitao?",
    court_position:
      "Vrhovni sud je odbio reviziju revidenta i potvrdio poništaj: nije ispunjena procedura iz čl. 85 st. 1 ZON jer zaveštalac nije sam pročitao pismeno niti dao propisanu izjavu.",
    reasoning:
      "Zamenjivanje ličnog čitanja čitanjem od strane svedoka, čak i uz saglasnost, ne zamenjuje zakonom traženi čin; preinačenje drugostepene presude je bilo pravilno.",
    keywords: ["poništanje", "testament pred svedocima", "forma", "čl. 85 ZON"],
    related_articles: ["čl. 85", "čl. 168 ZON", "ZPP"],
    headnote:
      "Formalni testament zahteva lično učešće zaveštaoca u činu čitanja i izjave, ne zamenu glasom trećeg lica.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "I 782/2005",
    legal_area: "criminal",
    legal_question:
      "Da li je kazna zatvora za izazivanje saobraćajne nesreće sa smrtnim ishodom u alkoholisanom stanju previsoka ako branioc ukazuje na krizu svesti umesto alkohola?",
    court_position:
      "Vrhovni sud je ublažio kaznu sa tri na dve godine zatvora uvažavajući žalbu branioca, ali odbio navode o bitnoj povredi postupka.",
    reasoning:
      "Veštačenje je utvrdilo visok promil alkohola koji suštinski umanjuje vozačku sposobnost; neiskustvo u vožnji ostaje relevantno, ali ne uklanja odgovornost.",
    keywords: ["saobraćajna nesreća", "alkoholisanje", "kazna", "KZ"],
    related_articles: ["Krivični zakonik"],
    headnote:
      "Ublaženje kazne može slediti kada sud drugog stepena ublažava okolnosti bez poništavanja krivičnog dela.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4438/2018",
    legal_area: "inheritance",
    legal_question:
      "Da li advokat koji je pripremio tekst testamenta može svedočiti o tome da potpisi nisu izvršeni u njegovoj kancelariji pred njim?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za ništavost ili rušljivost: iz pisanog teksta i potpisa svedoka proizlazi da je forma čl. 85 ZON ispoštovana.",
    reasoning:
      "Svedok V. N. je potvrdio da je tekst pripremio van prisustva stranaka i predao klijentu proceduru potpisivanja; u samom testamentu naznačeno je da je testator pročitao i potpisao pred svedocima.",
    keywords: ["testament pred svedocima", "dokazi", "forma", "ZON"],
    related_articles: ["čl. 85 ZON"],
    headnote:
      "Pripremu teksta od advokata ne treba po automatizmu poistovetiti sa falsifikatom forme ako svedoci potvrđuju čin.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 1005/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je dokazano krivično delo falsifikovanja testamenta i pokušaja prevare radi prisvajanja stana?",
    court_position:
      "Apelacioni sud u Beogradu je potvrdio osuđujuću presudu za pokušaj prevare i falsifikovanje isprave i kaznu zatvora od jedne godine i deset meseci.",
    reasoning:
      "Grafološko veštačenje i iskaz bivše zaposlene u kancelariji isključuju autentičnost potpisa i postojanje predmeta u advokatskoj evidenciji.",
    keywords: ["falsifikovanje isprave", "testament", "prevara", "KZ"],
    related_articles: ["čl. 355 st. 1–2 KZ"],
    headnote:
      "Lažni testament u naslednom sporu može biti predmet krivičnog gonjenja pored civilnog osporavanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUz 69/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li su odredbe o pretpostavljenoj saglasnosti za doniranje tkiva sa umrlih lica u skladu sa Ustavom?",
    court_position:
      "Ustavni sud je utvrdio neustavnost odredaba čl. 28. Zakona o ljudskim ćelijama i tkivima zbog nedostatka jasnoće, preciznosti i predvidivosti normi.",
    reasoning:
      "Pravo na dostojanstvo i informisanost zahteva strože normiranje kada država dopušta uzimanje tkiva bez izričitog pristanka umrlog u životu.",
    keywords: ["doniranje tkiva", "pretpostavljena saglasnost", "Ustav", "zdravstvena zaštita"],
    related_articles: ["čl. 24", "čl. 25 Ustava RS", "Zakon o ljudskim ćelijama i tkivima"],
    headnote:
      "Biomedicinski propisi visokog intenziteta moraju biti formulacija koje građanin može unapred predvideti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2083/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li je tužilac prekludiran u pravu na poništaj svojeručnog zaveštanja ako je tražio samo ništavost a činjenice upućuju na rušljivost?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe za poništaj: ostavilja je bila sposobna za rasuđivanje u trenutku sastavljanja; nalaz veštaka i iskazi svedoka podržavaju valjanost.",
    reasoning:
      "Teret dokazivanja nesposobnosti nije ispunjen; poništaj zahteva drugačiji procesni put od ništavosti kada rokovi iz čl. 170 ZON nisu poštovani.",
    keywords: ["svojeručno zaveštanje", "poništanje", "testamentarna sposobnost", "ZON"],
    related_articles: ["čl. 166–170 ZON"],
    headnote:
      "Sposobnost starice aktivnog društvenog života teško se pobija generičkim tvrdnjama o zaboravu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 2121/2014",
    legal_area: "administrative",
    legal_question:
      "Da li je Povereniku dopušteno zabraniti iznošenje ličnih podataka kandidata za GMAT u SAD na osnovu ugovora tužioca sa stranim partnerom?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio zakonitost rešenja Poverenika: ugovor ne može biti pravni osnov za prenos podataka u SAD bez posebnog pravnog osnova.",
    reasoning:
      "Dobrovoljne izjave kandidata i marketinški opisi testa ne stvaraju pravnu vezu između primaoca u inostranstvu i domaćeg operatora koji bi legalizovao prenos.",
    keywords: ["lični podaci", "iznošenje", "GMAT", "Poverenik"],
    related_articles: ["Zakon o zaštiti podataka o ličnosti"],
    headnote:
      "Privatnopravni ugovori ne mogu zaobići zabrane međunarodnog prenosa bez adekvatnog osnova.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3524/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li trajanje parničnog postupka od deset godina povredi pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku zbog neefikasnog postupanja prvostepenog suda, uključujući trogodišnji zastoj.",
    reasoning:
      "Postupak o sporazumu o doživotnom izdržavanju i testamentu zahteva hitnost; meritum žalbe o pitanjima imovine odbačen kao neosnovan.",
    keywords: ["ustavna žalba", "razuman rok", "parnični postupak", "ZPP"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote:
      "Zastoj od nekoliko godina bez opravdanog razloga sam po sebi može biti neustavni.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1802/2016",
    legal_area: "inheritance",
    legal_question:
      "Da li su testament, ugovor o poklonu i punomoćje ništavi ako je ostavilja navodno bila nesposobna?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilaca i potvrdio punovažnost svih akata: ostavilja je bila poslovno sposobna i delovala slobodnom voljom u skladu sa nalazom lekara u prilogu testamenta.",
    reasoning:
      "Formalni zapis sadrži izjave pred svedocima i tri primerka potpisa; istog dana sklopljeni poklon sa zadržanim plodouživanjem nije dokazan kao simulacija.",
    keywords: ["testament", "poklon", "poslovna sposobnost", "ZON"],
    related_articles: ["čl. 85 ZON", "ZOO"],
    headnote:
      "Medicinski nalaz istog dana jača pretpostavku o sposobnosti za sve povezane raspolaganja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9380/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li parnica o ništavosti ugovora o doživotnom izdržavanju i testamenta koja traje preko 12 godina povredi pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio žalbu u delu razumnog roka jer je postupak trajao nerazumno dugo; deo žalbe protiv meritornih presuda odbačen.",
    reasoning:
      "Postupak je obuhvatao više faza i ukidanja; država mora obezbediti završetak imovinskih sporova u razumnom roku nezavisno od složenosti predmeta.",
    keywords: ["ustavna žalba", "razuman rok", "testament", "doživotno izdržavanje"],
    related_articles: ["čl. 32 Ustava RS"],
    headnote:
      "Dugi nasledni sporovi sa više predmeta posebno zahtevaju procesno vođenje bez šupljih perioda.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 477/2025",
    legal_area: "criminal",
    legal_question:
      "Da li su potvrda o testiranju na SARS-CoV-2 i lekarski nalaz nezakoniti dokazi ako nisu u originalu?",
    court_position:
      "Vrhovni sud je odbio zahtev za zaštitu zakonitosti: dokumenti su pribavljeni u skladu sa ZKP i mogu služiti kao isprave na glavnom pretresu.",
    reasoning:
      "Čl. 405 st. 1 ZKP dozvoljava uvid u isprave kao dokaz; podneti u prilogu krivične prijave ispunjavaju uslove zakonitosti pribavljanja.",
    keywords: ["zaštita zakonitosti", "dokazi", "isprave", "ZKP"],
    related_articles: ["čl. 139 st. 1 ZKP", "čl. 405 st. 1 ZKP"],
    headnote:
      "Kopije zdravstvenih potvrda mogu biti zakonite kada je lanac porekla jasan iz spisa.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 4169/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o prvom stepenu teškoća u radu ako drugostepena komisija potvrdi prvostepeni nalaz veštačenja?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio zakonitost rešenja o proceni radne sposobnosti zasnovanog na saglasnim nalazima komisija.",
    reasoning:
      "Medicinska dokumentacija je u celini ocenjena; nisu utvrđene teškoće koje bi osporile zaključak o ograničenoj radnoj sposobnosti u prvom stepenu.",
    keywords: ["invaliditet", "procena radne sposobnosti", "veštačenje", "PIO"],
    related_articles: ["Zakon o penzijskom i invalidskom osiguranju"],
    headnote:
      "Dvostepeno veštačenje u istom smeru jača pretpostavku zakonitosti upravnog rešenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2582/2023",
    legal_area: "labor",
    legal_question:
      "Da li drugostepeni sud može bez rasprave izmeniti činjenično stanje o alkotestu i opasnosti posla?",
    court_position:
      "Vrhovni sud je ukinuo drugostepenu presudu zbog bitne povrede postupka: nije dozvoljeno menjati ocenu neposrednih dokaza bez održavanja rasprave.",
    reasoning:
      "Suprotni rezultati alkotesta i pitanje pravilnosti postupka zahtevaju saslušanje i neposrednost u drugom stepenu.",
    keywords: ["bitna povreda postupka", "alkotest", "otkaz", "ZPP"],
    related_articles: ["čl. 354 ZPP", "čl. 179 ZR"],
    headnote:
      "Drugi stepen ne sme zameniti uverenje prvog stepena o ključnim dokazima bez ponovnog neposrednog ispitivanja.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 11508/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je ponuda u javnoj nabavci nepravilno odbijena zbog gramaže bikarbonata koja premašuje tehničku specifikaciju?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio zakonitost odluke Komisije: naručilac je mogao zahtevati tačno 720 g u pakovanju u skladu sa pravilnikom o dijalizi.",
    reasoning:
      "Odustajanje od testiranja uzoraka i naknadno odbijanje samo jednog elementa krši načelo jednakosti ponuđača iz čl. 12 Zakona o javnim nabavkama.",
    keywords: ["javna nabavka", "tehnička specifikacija", "Komisija za zaštitu prava"],
    related_articles: ["čl. 12", "čl. 71 Zakona o javnim nabavkama"],
    headnote:
      "Naručilac mora dosledno primeniti sopstvene procedure testiranja ili prihvatiti posledice diskriminatornog postupanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž2 258/2024",
    legal_area: "family",
    legal_question:
      "Da li se dete može poveriti majci i ograničiti viđanje ocu kada veštaci nalaze da majka nema psihopatologiju koja onemogućava roditeljstvo?",
    court_position:
      "Apelacioni sud je potvrdio presudu o poveravanju deteta majci, modelu viđanja i izdržavanju; žalba oca delimično odbačena kao nedozvoljena.",
    reasoning:
      "Psihološko veštačenje nije našlo smetnje koje bi isključile samostalno roditeljsko pravo majke; mišljenje deteta da želi kod majke ocenjeno kao autentično.",
    keywords: ["poveravanje deteta", "roditeljsko pravo", "veštačenje", "izdržavanje"],
    related_articles: ["Porodični zakon", "ZPP"],
    headnote:
      "Pojedinačne crte ličnosti ne zamenjuju kliničku dijagnozu koja bi isključila starateljsku sposobnost.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 343/2007",
    legal_area: "inheritance",
    legal_question:
      "Da li pravnosnažno rešenje o nasleđivanju po zakonu sprečava tužbu za svojinu po naknadno pronađenom testamentu?",
    court_position:
      "Vrhovni sud je odbio reviziju i potvrdio da tužilac može ostvariti svojinu po testamentu za koji nije znao u ostavinskom postupku, iako je rešenje o nasleđivanju pravnosnažno.",
    reasoning:
      "Rešenje o nasleđivanju je deklaratorne prirode; testament je jači osnov od zakona kada je valjano proglašen i nije osporen u posebnom postupku.",
    keywords: ["testament", "naknadno pronađen", "svojina", "ostavinski postupak"],
    related_articles: ["ZON", "ZVP"],
    headnote:
      "Nesaznanje za testament u fazi nasledničke izjave ostavlja prostor za naknadnu imovinsku parnicu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6193/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li grafološki nalaz da potpis nije autentičan čini testament pred svedocima apsolutno ništavim?",
    court_position:
      "Apelacioni sud je potvrdio ništavost: falsifikovan potpis krši čl. 85 ZON i čl. 157 o falsifikovanom zaveštanju; žalbeni prigovori na veštačenje su neosnovani.",
    reasoning:
      "Sud je dao jasnu ocenu nalaza i odgovora veštaka na primedbe; nepodnošenje kontrolnog veštačenja ide u prilog završetku dokaznog postupka.",
    keywords: ["falsifikat", "testament pred svedocima", "ništavost", "grafologija"],
    related_articles: ["čl. 85", "čl. 157 ZON"],
    headnote:
      "Kada veštak isključi autentičnost, sud može odmah zaključiti ništavost bez dodatnih indikacija volje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6618/2018",
    legal_area: "commercial",
    legal_question:
      "Da li je davanje jemstva za povezano lice u prezaduženosti stečajno pobojan posao prema poveriocima?",
    court_position:
      "Privredni apelacioni sud je potvrdio pobijanje kreditnog ugovora po protivtužbi: postoji namerno oštećenje poverilaca u smislu čl. 123 Zakona o stečaju.",
    reasoning:
      "Saugovarač koji je znao za štetnu nameru stečajnog dužnika odgovara zajedno sa njim; tužbeni zahtev poverioca za utvrđenje potraživanja odbijen kao neosnovan.",
    keywords: ["stečaj", "pobijanje", "jemstvo", "poverioci"],
    related_articles: ["čl. 123 Zakona o stečaju"],
    headnote:
      "Kreditna linija koja šteti masu poverilaca može biti poništena čak i kada formalno izgleda kao običan ugovor.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 25833/2024",
    legal_area: "inheritance",
    legal_question:
      "Da li nedozvoljeno srodstvo zaveštajnog svedoka (supružnik) čini testament apsolutno ništavim?",
    court_position:
      "Vrhovni sud je odbio reviziju i potvrdio da testament nije ništav po čl. 155–157 ZON, već rušljiv po čl. 168 zbog čl. 113 o nepodobnosti svedoka.",
    reasoning:
      "Postojanje pisanog akta i potpisa isključuje tvrdnju da posao ne postoji; rušljivost zbog forme nije bila predmet ove parnice.",
    keywords: ["rušljivost", "zaveštajni svedok", "supružnik", "ništavost"],
    related_articles: ["čl. 113", "čl. 155–168 ZON"],
    headnote:
      "Suprug kao svedok ne stvara ništavost po javnom poretku, već relativnu rušljivost pod posebnim rokovima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 11222/2018",
    legal_area: "administrative",
    legal_question:
      "Da li organ treba ponovo proceniti radnu sposobnost ako je u spisu izveštaj specijaliste koji ukazuje na drugačiji stepen oštećenja?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje jer organ nije cenio celokupnu dokumentaciju, posebno specijalistički nalaz koji ukazuje na drugi stepen umanjenja radne sposobnosti.",
    reasoning:
      "Bitna povreda pravila postupka nastaje kada se ignoriše relevantan medicinski nalaz koji direktno seče u ocenu stepena.",
    keywords: ["procena radne sposobnosti", "PIO", "bitna povreda", "medicinska dokumentacija"],
    related_articles: ["Zakon o opštem upravnom postupku"],
    headnote:
      "Selektivno čitanje spisa dovodi do poništanja upravnog rešenja uprkos formalno postojećem veštačenju.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2670/2021",
    legal_area: "labor",
    legal_question:
      "Da li je zakonit otkaz zbog tehnološkog viška ako poslodavac nije dokazao da nije mogao da obezbedi drugi odgovarajući posao u skladu sa zdravstvenim ograničenjima?",
    court_position:
      "Vrhovni sud je ukinuo nižestepene presude koje su poništile otkaz i naložio ponovno ispitivanje da li je poslodavac mogao pružiti lakši posao u skladu sa nalazom neuropsihijatra.",
    reasoning:
      "Kada veštak ukazuje na mogućnost rada na drugačijim poslovima, sud mora ispitati obavezu premeštaja iz čl. 179 st. 5 Zakona o radu pre donošanja odluke o tehnološkom višku.",
    keywords: ["tehnološki višak", "otkaz", "zdravstvena sposobnost", "Zakon o radu"],
    related_articles: ["čl. 179 st. 5 ZR"],
    headnote:
      "Tehnološki višak ne sme zameniti procenu razumne prilagođenosti radnog mesta invaliditetu.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "Už 94/2016",
    legal_area: "administrative",
    legal_question:
      "Da li Izborna komisija treba da odbaci prigovor na izbornu listu podnet znatno nakon 24 časa umesto da ga odbije po meritu?",
    court_position:
      "Upravni sud je odbio žalbu birača: prigovor je neblagovremen; greška komisije što je odbila umesto odbacila nije nanela štetu žaliocu.",
    reasoning:
      "Na neblagovremene podneske ne može se steci meritorna zaštita; formalna kvalifikacija odbijanja ne menja ishod.",
    keywords: ["izbori", "prigovor", "rok", "Izborna komisija"],
    related_articles: ["Zakon o lokalnim izborima"],
    headnote:
      "Kada je rok propisan u satima, kašnjenje od dana isključuje sudsku kontrolu po suštini.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 8641/2017",
    legal_area: "administrative",
    legal_question:
      "Da li je javni konkurs za komandira-pripravnika u kazneno-popravnom zavodu sproveden zakonito uprkos tužbinama o diskriminaciji?",
    court_position:
      "Upravni sud je odbio tužbu kandidatkinje i potvrdio zakonitost postupka testiranja, zdravstvenih pregleda i izbora kandidata sa liste najboljih rezultata.",
    reasoning:
      "Veliki broj odustajanja i nejavljivanja kandidata ne ukazuje na arbitrarnost; direktor je postupio po pravilniku i zakonu o izvršenju krivičnih sankcija.",
    keywords: ["javni konkurs", "MUP", "komandir", "izbor kandidata"],
    related_articles: ["Zakon o izvršenju krivičnih sankcija"],
    headnote:
      "Višestepeni postupak filtriranja kandidata može biti zakonit kada je transparentno dokumentovan.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 54/2021",
    legal_area: "inheritance",
    legal_question:
      "Da li tužilci stiču pravo susvojine na porodičnoj kući kada su je dograđivali zajedničkim sredstvima u porodičnoj zajednici sa majkom vlasnicom?",
    court_position:
      "Apelacioni sud je nakon ukidanja prvostepene presude utvrdio da tužilci imaju po 37,5% susvojine na osnovu ulaganja u dogradnju i adaptaciju, uprkos testamentu babe u korist unuke.",
    reasoning:
      "Dogovor o podeli objekta i zajedničko finansiranje stvaraju osnov za suvlasništvo koje testament ne može jednostrano poništiti bez pravnih radnji prenosa.",
    keywords: ["susvojina", "porodična zajednica", "dogradnja", "testament"],
    related_articles: ["Zakon o osnovama svojinskopravnih odnosa", "ZON"],
    headnote:
      "Stvarna ulaganja članova domaćinstva mogu stvoriti suvlasništvo paralelno sa testamentarnim planom babe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 21637/2022",
    legal_area: "inheritance",
    legal_question:
      "Da li izjave o čitanju i poslednjoj volji moraju biti doslovno unete u tekst pismenog zaveštanja pred svedocima?",
    court_position:
      "Vrhovni sud je ukinuo presudu Apelacionog suda koja je poništila testament: izjava zaveštaoca o volji može se utvrditi i van samog pisanog teksta ako je dokazana u postupku.",
    reasoning:
      "Formalni uslov ne zahteva magistralnu unos rečenica u listinu ako su svedoci i okolnosti potvrdili čin priznanja i potpisa; prethodna praksa ne sme biti suviše formalistička.",
    keywords: ["testament pred svedocima", "forma", "čl. 85 ZON", "ukidanje"],
    related_articles: ["čl. 85 ZON", "ZPP"],
    headnote:
      "Suština čl. 85 je dokaz o ličnom priznanju volje, ne štampanje određene fraze u dokument.",
    outcome: "remanded",
  }
]
