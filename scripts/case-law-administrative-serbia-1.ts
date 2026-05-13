// scripts/case-law-administrative-serbia-1.ts
// Serbian administrative / planning / constitutional case law (batches 1–3 complete).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_ADMINISTRATIVE_SERBIA_1: CaseLawInput[] = [
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10250/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbijanje žalbe zainteresovanog lica na pravosnažnu građevinsku dozvolu kao neblagovremene, ako tužilja tvrdi da joj rešenje o građevinskoj dozvoli nije dostavljeno?",
    court_position:
      "Upravni sud je odbio tužbu protiv rešenja kojim je potvrđen zaključak o odbacivanju žalbe na građevinsku dozvolu, utvrdivši da je žalba neblagovremena jer je podneta nakon isteka roka od osam dana od dana prijema rešenja.",
    reasoning:
      "Sud je ocenio da je žalba na pravosnažnu građevinsku dozvolu podneta nakon isteka zakonskog roka, pa je zaključak o odbacivanju žalbe bio zakonit. Navod tužilje da joj rešenje o građevinskoj dozvoli nije dostavljeno i da odricanje investitora od žalbe ne utiče na njeno pravo na dostavu, nije doveo do drugačije ocene blagovremenosti u konkretnom postupku.",
    keywords: [
      "građevinska dozvola",
      "žalba",
      "odbacivanje žalbe",
      "blagovremenost",
      "rok od osam dana",
      "zainteresovano lice",
    ],
    related_articles: ["Zakon o opštem upravnom postupku", "Zakon o planiranju i izgradnji"],
    headnote: "Potvrda neblagovremene žalbe na građevinsku dozvolu; tužba odbijena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 18817/2013",
    decision_date: "2015-10-23",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita građevinska dozvola izdata susednom investitoru bez saglasnosti vlasnika susednog objekta i da li su navodi iz dopune žalbe relevantni ako je žalba neblagovremena?",
    court_position:
      "Upravni sud je odbio tužbu vlasnika susednog objekta protiv izdate građevinske dozvole, smatrajući da za izdavanje dozvole nije bila potrebna saglasnost tužioca, a da su navodi iz neblagovremeno podnete dopune žalbe irelevantni za meritorno odlučivanje.",
    reasoning:
      "Sud je prihvatio stav da investitor može dobiti građevinsku dozvolu bez posebne saglasnosti tužioca kada to zakon ne zahteva u konkretnoj konfiguraciji prava na zemljištu. Dodatno, procesno, neblagovremena dopuna žalbe ne otvara meritornu procenu osporenog rešenja.",
    keywords: ["građevinska dozvola", "sused", "saglasnost", "blagovremenost dopune žalbe", "investitor"],
    related_articles: ["čl. 135. Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Odbijena tužba suseda; neblagovremena dopuna žalbe; saglasnost tužioca nije uslov.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 13485/2017",
    legal_area: "administrative",
    legal_question:
      "Da li je Ministarstvo dužno pre odbijanja zahteva za građevinsku dozvolu da pozove podnosioca da uskladi glavni projekat sa lokacijskom dozvolom?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje Ministarstva kojim je odbijen zahtev za građevinsku dozvolu, jer drugostepeni organ nije prethodno postupio po obavezi poziva na dopunu i usklađivanje projekta sa lokacijskom dozvolom.",
    reasoning:
      "Kada organ odbija zahtev pozivajući se na nesklad glavnog projekta sa lokacijskom dozvolom, mora prethodno omogućiti ispravku dokumentacije kroz zakonom predviđene institute poziva i usklađivanja, umesto da odmah odbije zahtev. Propust te procedure čini osporeno rešenje nezakonitim, pa je predmet vraćen na ponovno odlučivanje.",
    keywords: ["građevinska dozvola", "glavni projekat", "lokacijska dozvola", "poziv na dopunu", "poništenje"],
    related_articles: ["čl. 135. st. 8. Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Obaveza poziva na usklađivanje projekta pre odbijanja zahteva za građevinsku dozvolu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9327/2013",
    legal_area: "administrative",
    legal_question:
      "Da li tužilac može tražiti oglašavanje ništavom građevinske dozvole za fekalnu kanalizaciju zbog nedostatka dokaza o rešenim imovinsko-pravnim odnosima?",
    court_position:
      "Upravni sud je odbio tužbu za ništavost građevinske dozvole, jer tužilac nije izneo izričitu zakonsku osnovicu po kojoj bi nedostatak takvih dokaza doveo do ništavosti upravnog akta.",
    reasoning:
      "Ništavost rešenja zahteva kvalifikovane zakonske razloge (npr. nedostatak nadležnosti, nemogućnost izvršenja ili druge izričite hipoteze). Same tvrdnje o nedostatku dokaza o imovinsko-pravnim odnosima, bez povezivanja sa normom koja predviđa ništavost, ne mogu osnovati tužbeni zahtev.",
    keywords: ["ništavost", "građevinska dozvola", "kanalizacija", "imovinsko-pravni odnosi", "dokazi"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Odbijena tužba za ništavost; nedostatak citirane zakonske osnove za ništavost.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9364/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je blagovremen predlog za ponavljanje postupka izdavanja građevinske dozvole ako se računa od saznanja za radove, a ne od dostave rešenja stranci?",
    court_position:
      "Upravni sud je odbio tužbu investitora i potvrdio rešenje kojim je dozvoljeno ponavljanje postupka i poništena građevinska dozvola, smatrajući predlog blagovremenim jer rok teče od dana dostave rešenja, a ne od saznanja za radove.",
    reasoning:
      "Primena člana 246. stav 1. Zakona o opštem upravnom postupku zahteva merenje rokova od momenta koji je zakonom vezan za dostavu upravnog akta stranci, a ne od subjektivnog saznanja o izvođenju radova. Zbog toga predlog podnet u roku od mesec dana od pravnih posledica dostave nije neblagovremen.",
    keywords: ["ponavljanje postupka", "građevinska dozvola", "blagovremenost", "dostava rešenja", "vodovod"],
    related_articles: ["čl. 246. st. 1. Zakon o opštem upravnom postupku"],
    headnote: "Rok za predlog ponavljanja teče od dostave akta, ne od saznanja za radove.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15091/2012",
    legal_area: "administrative",
    legal_question:
      "Da li suvlasnik susedne parcele ima svojstvo stranke u postupku izdavanja građevinske dozvole za parcelu na kojoj on nije nosilac prava gradnje?",
    court_position:
      "Upravni sud je odbio tužbu vlasnika susedne parcele, utvrdivši da tužilac nema svojstvo stranke jer nije nosilac prava na parceli na kojoj se gradi objekat (sukorisnik druge parcele).",
    reasoning:
      "Stranka u postupku izdavanja građevinske dozvole mora biti lice koje ima pravno relevantnu vezu sa predmetnom građevinskom parcelom u smislu prava gradnje ili zakonom predviđenog interesa. Sukorisništvo na drugoj parceli i susedstvo samo po sebi ne stvaraju stranačko svojstvo ako nije ispunjen kumulativ uslova iz zakona.",
    keywords: ["stranka", "građevinska dozvola", "sukorisnik", "susedna parcela", "legitimacija"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Nedostatak svojstva stranke kod sukorisnika susedne parcele; troškovi zainteresovanima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 5618/2015",
    legal_area: "administrative",
    legal_question:
      "Da li su prigovori na prethodni postupak lokacijske dozvole meritorno relevantni u sporu o zakonitosti izdate građevinske dozvole za rekonstrukciju i dogradnju?",
    court_position:
      "Upravni sud je odbio tužbu protiv potvrde građevinske dozvole, smatrajući da je investitor priložio kompletnu dokumentaciju, dok su prigovori u vezi sa ranijim postupkom lokacijske dozvole irelevantni za ocenu zakonitosti izdate građevinske dozvole.",
    reasoning:
      "Drugostepeni organ je pravilno ocenio da je ispunjena dokumentaciona osnova iz člana 135. Zakona o planiranju i izgradnji i pratećih propisa. Osporenim rešenjem ocenjena su sva relevantna pitanja sa jasnim razlozima u smislu člana 235. stav 2. ZOP-a, što sud prihvata.",
    keywords: ["građevinska dozvola", "lokacijska dozvola", "dokumentacija", "rekonstrukcija", "žalba"],
    related_articles: ["čl. 135. Zakon o planiranju i izgradnji", "čl. 235. st. 2. Zakon o opštem upravnom postupku"],
    headnote: "Potvrda građevinske dozvole; prigovori na lokacijsku fazu irelevantni.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10482/2014",
    decision_date: "2015-03-09",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbijen zahtev za legalizaciju objekta zbog nedostatka dokaza o rešenim imovinsko-pravnim odnosima kada tužilac nije vlasnik niti korisnik parcele?",
    court_position:
      "Upravni sud je odbio tužbu za poništaj rešenja kojim je odbijena legalizacija, jer nije bilo dokaza o rešenim imovinsko-pravnim odnosima na zemljištu, a tužilac nije vlasnik niti korisnik predmetne katastarske parcele.",
    reasoning:
      "Legalizacija zahteva dokazivanje prava na zemljištu/objektu u skladu sa Zakonom o legalizaciji. Organ je pravilno zaključio da podnosiocu nedostaju elementi iz člana 12. tog zakona i prateće dokumentacije, pa odbijanje nije bitno povredilo postupak zbog očekivanja poziva na dopunu ako je ostvareno suštinsko ispitivanje.",
    keywords: ["legalizacija", "imovinsko-pravni odnosi", "vlasništvo", "korisnik", "građevinska dozvola"],
    related_articles: ["Zakon o legalizaciji objekata", "čl. 12. Zakon o legalizaciji objekata"],
    headnote: "Odbijena legalizacija zbog nedostatka prava na parceli i dokaza o odnosima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUo 870/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje zbog pogrešne primene materijalnog prava u vezi sa dugom u hiperinflaciji i pravo na suđenje u razumnom roku zbog trajanja postupka?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu, utvrdivši povredu prava na pravično suđenje zbog pogrešne primene materijalnog prava u delu obračuna duga u uslovima hiperinflacije, kao i povredu prava na suđenje u razumnom roku zbog trajanja postupka od trinaest godina.",
    reasoning:
      "Sud je posebno razmatrao odnos podzakonskih akata (Pravilnik o građevinskoj dozvoli) prema zakonu i granice ovlašćenja donosioca, ali u dispozitivu je akcenat na građanskopravnom postupku i razumnom roku. Trajanje postupka preko decenije predstavlja neprihvatljivo odlaganje pravde.",
    keywords: ["ustavna žalba", "pravično suđenje", "razuman rok", "hiperinflacija", "materijalno pravo"],
    related_articles: ["Ustav RS", "čl. 32. Ustav RS", "čl. 36. Ustav RS"],
    headnote: "Usvojena ustavna žalba; pravično suđenje i rok; sporedno pitanje pravilnika i zakona.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6147/2019",
    legal_area: "administrative",
    legal_question:
      "Da li fizičko lice ima aktivnu legitimaciju u tužbi za poništaj građevinske dozvole za gondolu zbog navodne povrede prava na zdravu životnu sredinu?",
    court_position:
      "Upravni sud je odbacio tužbu fizičkog lica, utvrdivši da nema aktivne legitimacije jer osporenim rešenjem nije povređeno njegovo pravo niti zakoniti interes, uključujući pravo na zdravu životnu sredinu u konkretno utvrđenom obimu veze sa aktom.",
    reasoning:
      "Legitimacija za tužbu u upravnom sporu zahteva konkretnu, pravno zaštićenu vezu tužioca sa osporenim aktom. Opšti ekološki interes ili sumnja, bez ispunjenja kriterijuma iz Zakona o upravnim sporovima, ne stvara tužilačku legitimaciju fizičkog lica u sporu o građevinskoj dozvoli za infrastrukturni objekat.",
    keywords: ["legitimacija", "građevinska dozvola", "gondola", "životna sredina", "odbacivanje tužbe"],
    related_articles: ["Zakon o upravnim sporovima", "Zakon o planiranju i izgradnji"],
    headnote: "Odbacena tužba fizičkog lica zbog nedostatka aktivne legitimacije.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 12629/2015",
    legal_area: "administrative",
    legal_question:
      "Da li drugostepeni organ mora meritorno oceniti žalbene navode o nedostatku saglasnosti suseda predviđene pravilnikom u postupku legalizacije?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje o legalizaciji, jer drugostepeni organ nije ocenio ključne žalbene navode o saglasnosti vlasnika susedne parcele kao uslovu za nastavak postupka.",
    reasoning:
      "Kada žalba ističe neispunjavanje uslova iz Pravilnika o objektima za koje se ne može izdati građevinska dozvola i uslova legalizacije, drugostepeni organ mora dati odgovor na svaki odlučan navod. Propuštanje ocene bitnih žalbenačkih tvrdnji čini rešenje nezakonitim zbog bitne povrede pravila postupka i nedostatka obrazloženja.",
    keywords: ["legalizacija", "žalba", "saglasnost suseda", "poništenje", "pravilnik"],
    related_articles: ["Pravilnik o objektima za koje se ne može izdati građevinska dozvola", "Zakon o planiranju i izgradnji"],
    headnote: "Poništaj legalizacije jer drugi stepen nije ocenio navode o saglasnosti suseda.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14940/2015",
    legal_area: "administrative",
    legal_question:
      "Da li tužilja ima svojstvo stranke u postupku žalbe na obustavu inspekcijskog postupka rušenja ako nije učestvovala u postupku rešenja o rušenju niti u izdavanju građevinske dozvole?",
    court_position:
      "Upravni sud je odbio tužbu na zaključak o odbacivanju žalbe na obustavu postupka rušenja, potvrdivši da tužilja nema svojstvo stranke jer nije učestvovala u postupku donošenja rešenja o rušenju niti u postupku građevinske dozvole.",
    reasoning:
      "Stranka mora biti uvedena ili imati zakonom predviđeni status u odlučujućem postupku. Tvrdnje o pravnom sledbeništvu i inspekcijskim propustima ne mogu nadomestiti nedostatak formalnog stranačkog položaja u konkretnom upravnom predmetu.",
    keywords: ["stranka", "inspekcija", "rušenje", "obustava postupka", "žalba"],
    related_articles: ["čl. 39–40. Zakon o opštem upravnom postupku", "Zakon o planiranju i izgradnji"],
    headnote: "Nema svojstva stranke u inspekcijskom postupku rušenja bez učešća u prethodnim aktima.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 204/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je bitno povređen postupak ako je građevinska dozvola izdata Gradu Valjevu, a zahtev je podneo drugo pravno lice?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje kojim je odbijena žalba na građevinsku dozvolu, utvrdivši bitnu povredu jer organ nije obrazložio identitet podnosioca zahteva i investitora na koga glasi dozvola.",
    reasoning:
      "Član 135. Zakona o planiranju i izgradnji zahteva doslednost između podnosioca zahteva i lica kome se izdaje građevinska dozvola. Ako je zahtev podneo JP Direkcija, a dozvola izdata Gradu, drugostepeni organ mora razmotriti i obrazložiti taj nedostatak identiteta; automatsko odbijanje žalbe bez toga je nezakonito.",
    keywords: ["građevinska dozvola", "investitor", "identitet podnosioca", "bitna povreda postupka", "poništenje"],
    related_articles: ["čl. 135. Zakon o planiranju i izgradnji"],
    headnote: "Poništaj zbog neslaganja podnosioca zahteva i investitora na koga glasi dozvola.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 8180/2014",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbijen zahtev za izmenu građevinske dozvole za dogradnju terasa ako projekat nije u skladu sa važećim urbanističkim planom?",
    court_position:
      "Upravni sud je odbio tužbu protiv rešenja kojim je odbijen zahtev za izmenu građevinske dozvole, utvrdivši da dostavljena tehnička dokumentacija nije bila u skladu sa važećim planom, pa su organi pravilno postupili.",
    reasoning:
      "Urbanistička ograničenja imaju primat pri oceni dopuštenosti izmena. Argumenti o ranijem zakonu, saglasnosti zaštite spomenika i jednakosti sa drugim vlasnicima ne pomažu ako tehnička dokumentacija objektivno odstupa od važećeg plana.",
    keywords: ["izmena građevinske dozvole", "terase", "urbanistički plan", "projekat", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji"],
    headnote: "Odbijena tužba na odbijanje izmene dozvole zbog nesklada sa važećim planom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 12869/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je ugovor sa skupštinom zgrade dovoljan dokaz o rešenim imovinsko-pravnim odnosima u postupku naknadne građevinske i upotrebne dozvole za dogradnju stana?",
    court_position:
      "Upravni sud je odbio tužbu na rešenje o naknadnoj građevinskoj i upotrebnoj dozvoli, smatrajući da je priložen ugovor sa skupštinom zgrade donet većinom glasova dovoljan dokaz o rešenim odnosima u smislu propisa o legalizaciji.",
    reasoning:
      "Kada je investitor priložio dokumentaciju koja zadovoljava formalne i materijalne uslove, drugostepeni organ je pravilno ocenio žalbu tužilje koja se odnosi na bitne povrede postupka. Prigovori na saglasnost svih stanara moraju se meriti prema sadržaju donetog akta skupštine i priloženim dokazima.",
    keywords: ["legalizacija", "dogradnja stana", "skupština stanara", "imovinsko-pravni odnosi", "upotrebna dozvola"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o stanovanju"],
    headnote: "Potvrda naknadnih dozvola; ugovor/skupština kao dokaz rešenih odnosa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2793/2005",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonit zaključak inspekcije o obustavi postupka zbog navodne legalizacije terase ako tužilac osporava postojanje dozvole za zastakljivanje?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje o obustavi postupka građevinske inspekcije, jer organ nije adekvatno ocenio dokaze i žalbene navode koji osporavaju da je terasa legalizovana.",
    reasoning:
      "Kada tužilac dostavi obaveštenje zavoda da nije izdata građevinska dozvola za zastakljivanje i ukazuje na nesklad projekata, inspektor mora meritorno ispitati da li je osnov za obustavu postojao. Automatska obustava na osnovu tvrdnje investitora bez ocene suprotstavljenih dokaza je nezakonita.",
    keywords: ["inspekcija", "obustava postupka", "legalizacija", "terasa", "poništenje"],
    related_articles: ["Zakon o planiranju i izgradnji"],
    headnote: "Poništaj obustave inspekcije kada organ nije cenio dokaze o nepostojanju legalizacije.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3502/2013",
    legal_area: "administrative",
    legal_question:
      "Da li je prvostepeni organ stvarno nadležan da odlučuje o zahtevu za poništaj rešenja po osnovu službenog nadzora?",
    court_position:
      "Upravni sud je usvojio tužbu i poništio rešenje, utvrdivši stvarnu nenadležnost prvostepenog organa jer je o zahtevu za poništaj po službenom nadzoru odlučivao prvostepeni organ, iako je po ZOP-u isključivo nadležan drugostepeni organ.",
    reasoning:
      "Raspodela nadležnosti za posebne vrste žalbi i poništaja mora se strogo poštovati. Ako zakon isključivo stavlja odlučivanje u nadležnost višeg organa, odluka nižeg organa je ništava/nedopuštena bez obzira na materijalnu osnovanost zahteva.",
    keywords: ["službeni nadzor", "poništenje akta", "nenadležnost", "prvostepeni organ", "drugostepeni organ"],
    related_articles: ["Zakon o opštem upravnom postupku"],
    headnote: "Poništaj jer je prvostepeni organ odlučivao o poništaju po službenom nadzoru umesto drugog stepena.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 8295/2014",
    decision_date: "2014-06-16",
    legal_area: "administrative",
    legal_question:
      "Da li nasipanje zemljišta radi zatravljivanja predstavlja građenje objekta za koje je potrebna građevinska dozvola?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje inspekcije kojim je naloženo uklanjanje nasipa, zaključivši da nasipanje radi zatravljivanja nije građenje objekta u smislu Zakona o planiranju i izgradnji.",
    reasoning:
      "Inspekcija je pogrešno kvalifikovala radove kao izgradnju objekta podobnu za građevinsku dozvolu. Program zatravljivanja i tehnička priroda radova ukazuju na to da nije reč o kapitalnom građevinskom objektu, pa primena člana 110. u vezi sa građevinskom dozvolom nije bila osnovana.",
    keywords: ["nasipanje", "zatravljivanje", "građevinska dozvola", "inspekcija", "poništenje"],
    related_articles: ["čl. 110. Zakon o planiranju i izgradnji"],
    headnote: "Nasipanje za zatravljivanje nije objekat; poništaj inspekcijskog rešenja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 16294/2014",
    decision_date: "2017-11-30",
    legal_area: "administrative",
    legal_question:
      "Da li se može izdati lokacijska dozvola za parcelu za koju Generalni plan ne predviđa gradnju do donošenja plana detaljne regulacije?",
    court_position:
      "Upravni sud je odbio tužbu za poništaj rešenja o odbijanju lokacijske dozvole, utvrdivši da parcela prema važećem Generalnom planu ne ispunjava uslove za izdavanje dozvole do usvajanja detaljnog regulacionog plana.",
    reasoning:
      "Planski dokumenti grade hijerarhiju dozvoljenosti. Ako generalni plan isključuje mogućnost izdavanja lokacijske dozvole do donošenja PDR, organ je pravilno odbio zahtev. Prigovori o dvostrukim standardima i izgradnji na drugim parcelama zahtevaju konkretne dokaze koji ovde nisu osporili zakonitost.",
    keywords: ["lokacijska dozvola", "Generalni plan", "plan detaljne regulacije", "parcela", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji"],
    headnote: "Odbijena lokacijska dozvola dok PDR ne omogući gradnju na parceli.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 4004/2020",
    decision_date: "2020-02-20",
    legal_area: "administrative",
    legal_question:
      "Da li drugostepeni organ mora oceniti sve relevantne navode žalbe, uključujući postupak restitucije i druge sporove, pri odlučivanju o građevinskoj dozvoli?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje Ministarstva kojim je odbijena žalba na građevinsku dozvolu, jer drugostepeni organ nije ocenio sve relevantne žalbene navode.",
    reasoning:
      "Upravni sud u granicama tužbe ispituje potpunost obrazloženja drugostepenog akta. Izostavljanje ocene o ozbiljnim procesnim i materijalnopravnim pitanjima (restitucija, drugi sporovi, zabeležbe) predstavlja bitnu povredu pravila postupka i nedostatak razloga o odlučnim činjenicama.",
    keywords: ["građevinska dozvola", "žalba", "restitucija", "bitna povreda postupka", "poništenje"],
    related_articles: ["Zakon o upravnim sporovima", "Zakon o planiranju i izgradnji"],
    headnote: "Poništaj drugostepenog jer nisu ocenjeni svi relevantni žalbeni navodi.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3275/2012",
    decision_date: "2012-03-14",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita građevinska dozvola za silose kada investitor priloži kompletnu dokumentaciju i konačnu lokacijsku dozvolu?",
    court_position:
      "Upravni sud je odbio tužbu na rešenje kojim je potvrđena građevinska dozvola za silose i prateće objekte, utvrdivši da je dokumentacija bila kompletna i da su ispunjeni uslovi za izdavanje dozvole.",
    reasoning:
      "Kada su u spisu lokacijska dozvola, projekat i ostali propisani elementi, a tužitelj osporava samo nepotpuno utvrđenje činjeničnog stanja bez konkretizacije pravne povrede, sud potvrđuje zakonitost. Rokovi prestanka važenja dozvole iz dispozitiva su standardni i ne menjaju ishod bez pokazanog prekršaja.",
    keywords: ["građevinska dozvola", "silosi", "lokacijska dozvola", "dokumentacija", "potvrda žalbe"],
    related_articles: ["čl. 135. Zakon o planiranju i izgradnji", "čl. 140. Zakon o planiranju i izgradnji"],
    headnote: "Potvrđena građevinska dozvola za silose uz kompletnu dokumentaciju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "Uuz 1/2019",
    legal_area: "administrative",
    legal_question:
      "Da li rešenje o raspoređivanju službenika-uzbunjivača sadrži dovoljno razloge i da li je povređen zakon ako razlozi za raspored nisu jasni?",
    court_position:
      "Upravni sud je usvojio tužbu i poništio rešenje Žalbene komisije grada Valjeva, vraćajući predmet na ponovno odlučivanje, jer osporeno i prvostepeno rešenje ne sadrže jasne razloge za raspoređivanje tužioca.",
    reasoning:
      "Upravni akt mora biti obrazložen tako da stranka može razumeti kriterijume rasporeda. Ako se u rešenju ne navode konkretni razlozi koji povezuju činjenično stanje sa pravnim kvalifikacijama, dolazi do bitne povrede prava na obrazložen odluku i pravilnu primenu propisa o javnim službenicima.",
    keywords: ["raspoređivanje", "uzbunjivač", "žalbena komisija", "obrazloženje", "službenik"],
    related_articles: ["Zakon o državnim službenicima", "Zakon o lokalnim službenicima", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj rešenja o rasporedu zbog nedostatka jasnih razloga.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 908/2017",
    decision_date: "2017-01-19",
    legal_area: "administrative",
    legal_question:
      "Da li sudska odluka o uređenju korišćenja susvojinske nepokretnosti može zameniti saglasnost svih suvlasnika potrebnu za izdavanje građevinske dozvole?",
    court_position:
      "Upravni sud je odbio tužbu, smatrajući da parnična odluka o načinu korišćenja ne može zameniti izričitu saglasnost svih suvlasnika kao dokaz o pravu na zemljištu koji je uslov za građevinsku dozvolu.",
    reasoning:
      "Zakon o planiranju i izgradnji zahteva određene dokaze o pravu na zemljištu. Saglasnost suvlasnika je poseban institut svojinskog prava koji se ne može implicitno zameniti drugačijom vrstom sudske presude koja ne predstavlja saglasnost u smislu propisa o dokumentaciji za dozvolu.",
    keywords: ["građevinska dozvola", "susvojina", "saglasnost suvlasnika", "dokaz", "parnica"],
    related_articles: ["čl. 135. Zakon o planiranju i izgradnji", "Zakon o osnovama svojinskopravnih odnosa"],
    headnote: "Sudsko uređenje korišćenja ne zamenjuje saglasnost suvlasnika za dozvolu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6036/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje kojim je odbijen zahtev za produžetak statusa privremenog povlašćenog proizvođača ako predmet odluke nije precizno određen u dispozitivu?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje Ministarstva rudarstva i energetike, jer predmet odlučivanja nije bio precizno naveden, što predstavlja bitnu povredu postupka.",
    reasoning:
      "Odluka mora jasno odrediti koji vetropark, odnosno koji pravni posao se odbija ili prihvata. Nepreciznost uvoda i dispozitiva onemogućava pravnu sigurnost i kontrolu zakonitosti, posebno u energetskim rešenjima vezanim za više objekata.",
    keywords: ["privremeni povlašćeni proizvođač", "vetroelektrana", "neodređenost", "poništenje", "energetika"],
    related_articles: ["Zakon o energetici", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj zbog nejasnog predmeta u rešenju o statusu povlašćenog proizvođača.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6034/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je rešenje o odbijanju produžetka statusa privremenog povlašćenog proizvođača zakonito ako ne precizira na koju od više vetroelektrana se odnosi?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje, jer je predmet bio nejasan: nije određeno na koju od četiri vetroelektrane se odluka odnosi.",
    reasoning:
      "Bitna povreda nastaje kada stranka ne može znati protiv kog akta ili za koji objekat može braniti svoja prava. Identifikacija predmeta je elementarna pretpostavka valjanosti upravnog akta.",
    keywords: ["vetroelektrana", "povlašćeni proizvođač", "nejasnoća predmeta", "poništenje"],
    related_articles: ["Zakon o opštem upravnom postupku", "Zakon o energetici"],
    headnote: "Poništaj zbog nepreciziranja na koji objekat se odnosi odbijanje produžetka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6033/2016",
    legal_area: "administrative",
    legal_question:
      "Da li neodređenost predmeta u dispozitivu i obrazloženju čini nezakonitim rešenje o odbijanju zahteva za produžetak statusa povlašćenog proizvođača?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje zbog bitnih povreda: predmet postupka nije precizno označen u dispozitivu i obrazloženju.",
    reasoning:
      "Slično sesterskim predmetima, nejasna identifikacija elektrane i pravnih posledica poništenja građevinske dozvole čini nemogućim racionalan pravni test o zakonitosti. Sud vraća predmet organu na ponovno odlučivanje.",
    keywords: ["energetika", "privremeni povlašćeni proizvođač", "dispozitiv", "obrazloženje", "poništenje"],
    related_articles: ["Zakon o opštem upravnom postupku"],
    headnote: "Neodređenost predmeta kao bitna povreda u energetskom upravnom aktu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6035/2016",
    legal_area: "administrative",
    legal_question:
      "Da li rešenje koje u uvodu i dispozitivu ne precizira predmet, a u obrazloženju nema razloga za odluku, može ostati na snazi?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje Ministarstva rudarstva i energetike o odbijanju produžetka statusa, utvrdivši bitne povrede: nejasan predmet i nedostatak razloga.",
    reasoning:
      "Kumulacija nejasnoće predmeta i nedostatka razloga čini akt suštinski neproverljivim u upravnom sporu. To nije formalni nedostatak već bitna povreda pravila postupka koja zahteva poništaj.",
    keywords: ["povlašćeni proizvođač", "razlozi odluke", "predmet postupka", "poništenje"],
    related_articles: ["čl. 199. Zakon o opštem upravnom postupku", "čl. 235. Zakon o opštem upravnom postupku"],
    headnote: "Poništaj zbog praznog obrazloženja i neodređenog predmeta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1205/2025",
    legal_area: "criminal",
    legal_question:
      "Da li pojam građevinske dozvole u krivičnom delu građenja bez dozvole obuhvata i rešenje o odobrenju izvođenja radova za rekonstrukciju?",
    court_position:
      "Vrhovni sud je odbio zahtev za zaštitu zakonitosti, prihvativši da građevinska dozvola u krivičnopravnom smislu može obuhvatati i rešenje o odobrenju izvođenja radova za rekonstrukciju, pa su okrivljeni mogli biti osuđeni za nastavak radova posle obustave gradilišta.",
    reasoning:
      "Branilački argument da rekonstrukcija ne zahteva građevinsku dozvolu u smislu ZPI je odbijen jer je krivičnopravna zaštita usmerena na radove koji zakonom zahtevaju odobrenje, a nastavak posle inspekcijske obustave ispunjava obeležja dela.",
    keywords: ["građevinska dozvola", "rekonstrukcija", "zaštita zakonitosti", "obustava gradilišta", "KZ"],
    related_articles: ["čl. 219a Krivični zakonik", "Zakon o planiranju i izgradnji"],
    headnote: "Krivičnopravno: odobrenje za radove može biti u kategoriji dozvole; odbijen Kzz.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14985/2020",
    decision_date: "2020-02-20",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonit prigovor na zaključak o odbacivanju zahteva za upotrebnu dozvolu ako se poziva na nepostojeći stav zakona i pogrešno tumači ko može obezbediti tehnički pregled?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje Gradskog veća kojim je odbijen prigovor na odbacivanje zahteva za upotrebnu dozvolu, jer je poziv na nepostojeći član 170. stav 3. ZOP-a i pogrešna primena člana 155. ZPI o tehničkom pregledu.",
    reasoning:
      "Prigovorno telo ne može odbiti prigovor pozivom na nepostojeću zakonsku odredbu. Takođe, odredbe o tehničkom pregledu i krugu lica koja ga obezbeđuju moraju se pravilno primeniti u vezi sa članom 158. ZPI o izdavanju upotrebne dozvole.",
    keywords: ["upotrebna dozvola", "prigovor", "tehnički pregled", "Gradsko veće", "poništenje"],
    related_articles: ["čl. 155. Zakon o planiranju i izgradnji", "čl. 158. Zakon o planiranju i izgradnji", "čl. 170. Zakon o opštem upravnom postupku"],
    headnote: "Poništaj zbog citiranja nepostojećeg stava ZOP-a i pogrešnog tumačenja ZPI.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10854/2014",
    decision_date: "2014-08-19",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita dozvola prinudnog rušenja pomoćnog objekta ako prvostepeni i drugostepeni organ nisu obrazložili zašto je rešenje o rušenju postalo izvršno?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje kojim je dozvoljeno prinudno rušenje, jer ni prvostepeni ni drugostepeni organ nisu naveli razloge zbog kojih smatraju da je rešenje o rušenju postalo izvršno.",
    reasoning:
      "Zaključak o dozvoli izvršenja mora sadržati logičnu vezu između činjenice pravnosnažnosti/izvršnosti i pravnih posledica. Bez toga, tužilac ne može znati da li je ispunjen uslov za prinudno izvršenje, što je bitna povreda.",
    keywords: ["rušenje", "izvršenje", "građevinska inspekcija", "obrazloženje", "poništenje"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj dozvole izvršenja rušenja zbog nedostatka razloga o izvršnosti osnovnog akta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 11913/2015",
    decision_date: "2015-08-13",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita građevinska dozvola za objekat u susedstvu ako tužilja osporava činjenično stanje na svojoj parceli i stanje kulturnog dobra?",
    court_position:
      "Upravni sud je odbio tužbu vlasnice susedne parcele, utvrdivši da je dozvola izdata u skladu sa zakonom na osnovu pravnosnažne lokacijske dozvole i planskih dokumenata, dok navodi o stanju na tužiteljskoj parceli nisu relevantni za zakonitost dozvole.",
    reasoning:
      "Meritorna kontrola zakonitosti građevinske dozvole polazi od dokumentacije u spisu i usklađenosti sa lokacijskim aktom. Opšti prigovori o ugrožavanju spomenika ili udaljenosti ne pobeđuju ako organi nisu povredili propisane standarde i ako su uslovi iz rešenja ispoštovani.",
    keywords: ["građevinska dozvola", "sused", "lokacijska dozvola", "planska dokumentacija", "kulturno dobro"],
    related_articles: ["čl. 136. Zakon o planiranju i izgradnji", "čl. 148. Zakon o planiranju i izgradnji"],
    headnote: "Odbijena tužba suseda; dozvola u skladu sa planom i lokacijskom dozvolom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Uzp 132/2021",
    legal_area: "administrative",
    legal_question:
      "Da li udruženje za zaštitu životne sredine ima legitimaciju u sporu o poništenju građevinske dozvole za pripremne radove gondole i da li je dozvola nezakonita bez studije procene uticaja?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahteve za preispitivanje i potvrdio presudu Upravnog suda kojom je poništena građevinska dozvola, pri čemu je priznat pravni interes udruženja, a nezakonitost utvrđena jer studija procene uticaja nije priložena.",
    reasoning:
      "Pravni interes udruženja ceni se prema članu 11. stav 1. Zakona o upravnim sporovima u vezi sa predmetom zaštite životne sredine i Zakonima o zaštiti životne sredine i proceni uticaja. Učešće u upravnom postupku nije uslov legitimacije. Odsustvo saglasnosti odnosno studije gde je zakonom predviđeno čini dozvolu nezakonitom.",
    keywords: ["gondola", "studija procene uticaja", "udruženje", "legitimacija", "Upravni spor"],
    related_articles: ["čl. 81a Zakon o zaštiti životne sredine", "Zakon o proceni uticaja na životnu sredinu", "čl. 11. st. 1. Zakon o upravnim sporovima", "čl. 44. st. 3. Zakon o opštem upravnom postupku"],
    headnote: "VKS potvrđuje poništaj dozvole; legitimacija ekološkog udruženja; obavezna procena uticaja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9575/2014",
    legal_area: "administrative",
    legal_question:
      "Da li prvostepeni organ sme dozvoliti ponavljanje postupka legalizacije bez prethodnog ispitivanja formalnih uslova iz Zakona o opštem upravnom postupku?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje kojim je dozvoljeno ponavljanje postupka legalizacije, jer prvostepeni organ pre donošenja odluke o ponavljanju nije ispitao ispunjenost formalnih uslova propisanih ZOP-om.",
    reasoning:
      "Ponavljanje postupka nije formalni akt bez pravnih standarda; organ mora utvrditi da li su ispunjene hipoteze iz člana 239. ZOP-a i srodne procedure. Propuštanje tog ispitivanja čini drugostepeno odobrenje nezakonitim.",
    keywords: ["ponavljanje postupka", "legalizacija", "formalni uslovi", "ZOP", "poništenje"],
    related_articles: ["čl. 239. Zakon o opštem upravnom postupku"],
    headnote: "Poništaj dozvole ponavljanja jer prvostepeni nije ispitao formalne uslove ZOP-a.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10438/2014",
    decision_date: "2014-08-07",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o uklanjanju zidane ograde ako organ nije uzeo u obzir postojeću građevinsku dozvolu za ogradu i drugog suvlasnika?",
    court_position:
      "Upravni Sud je poništio rešenje o uklanjanju ograde zbog bitnih povreda pravila postupka, jer organ nije potpuno utvrdio činjenično stanje: nije ocenio građevinsku dozvolu za ogradu niti u postupak uključio drugog suvlasnika.",
    reasoning:
      "Kada tužilac ističe postojanje važeće građevinske dozvole za isti objekat i suvlasništvo, inspekcija mora meritorno odgovoriti na te dokaze i obezbediti stranački krug. Delimično utvrđenje činjenica i isključenje suvlasnika iz postupka predstavlja bitnu povredu.",
    keywords: ["ograda", "suvlasnik", "građevinska dozvola", "inspekcija", "poništenje"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj rešenja o uklanjanju ograde zbog nepotpunog utvrđenja činjenica i suvlasnika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7399/2015",
    decision_date: "2015-05-13",
    legal_area: "administrative",
    legal_question:
      "Da li se građevinska dozvola može izdati licu koje nije nosilac lokacijske dozvole i da li se investitor može menjati pre izdavanja građevinske dozvole?",
    court_position:
      "U sporu pune jurisdikcije Upravni sud je poništio rešenje tuženog i odbio žalbu zainteresovanog lica, potvrdivši da se građevinska dozvola izdaje licu na koje glasi lokacijska dozvola, a promena investitora je moguća tek nakon izdavanja građevinske dozvole.",
    reasoning:
      "Identitet investitora mora biti dosledan kroz lanac lokacijske i građevinske dozvole. Ako lokacijska dozvola nije izdana na podnosioca zahteva, prvostepeni organ ne može zakonito odbiti zahtev samo generički, već drugostepeni mora koherentno obrazložiti odnos prema instrukcijama i činjenicama iz spisa.",
    keywords: ["građevinska dozvola", "lokacijska dozvola", "investitor", "spor pune jurisdikcije", "poništenje"],
    related_articles: ["čl. 135. Zakon o planiranju i izgradnji", "čl. 54. Zakon o planiranju i izgradnji"],
    headnote: "Građevinska dozvola samo nosiocu lokacijske; promena investitora posle izdavanja dozvole.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 18445/2016",
    legal_area: "administrative",
    legal_question:
      "Da li se rok važenja lokacijskih uslova od 12 meseci produžava naknadnom izmenom lokacijskih uslova?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio zaključak o odbacivanju zahteva za građevinsku dozvolu, jer su lokacijski uslovi bili istekli: rok od 12 meseci ne produžava se automatski izmenom uslova.",
    reasoning:
      "Primena člana 57. st. 7–8. ZPI jasno veže važenje lokacijskih uslova za parcelu. Bez važećih uslova nema osnova za meritorno odlučivanje o građevinskoj dozvoli po članu 135. ZPI, pa je odbacivanje zahteva bilo zakonito.",
    keywords: ["lokacijski uslovi", "rok važenja", "građevinska dozvola", "odbacivanje", "izmena uslova"],
    related_articles: ["čl. 57. st. 7–8. Zakon o planiranju i izgradnji", "čl. 135. st. 1 i 12. Zakon o planiranju i izgradnji"],
    headnote: "Istek roka lokacijskih uslova od 12 meseci; izmena ne produžava rok automatski.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14138/2016",
    decision_date: "2016-10-11",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita izmena građevinske dozvole radi veće spratnosti ako je usvojen novi planski dokument koji to dozvoljava?",
    court_position:
      "Upravni sud je odbio tužbu na rešenje o izmeni građevinske dozvole, utvrdivši da je izmena odobrena jer je posle prvobitne dozvole usvojen novi plan koji dozvoljava veću spratnost, a projekat je u skladu sa novim planom.",
    reasoning:
      "Planski aktovi mogu izmeniti ograničenja koja su važila u trenutku starije dozvole. Ako su izmene projekta usklađene sa novim planom i formalnim uslovima, drugostepeni organ je pravilno potvrdio izmenu.",
    keywords: ["izmena građevinske dozvole", "planski dokument", "spratnost", "urbanizam", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji"],
    headnote: "Potvrda izmene dozvole posle novog plana koji dozvoljava veću visinu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 11004/2015",
    decision_date: "2015-09-15",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita građevinska dozvola za višeporodični stambeno-poslovni objekat ako tužioci osporavaju saglasnost za zaštitu od požara, namenu objekta i udaljenost od međe?",
    court_position:
      "Upravni sud je odbio tužbe suseda protiv rešenja kojim je investitoru izdata građevinska dozvola, utvrdivši da je dozvola zakonita na osnovu pravnosnažne lokacijske dozvole i kompletne dokumentacije, uključujući saglasnost za zaštitu od požara.",
    reasoning:
      "Žalbene tvrdnje o falsifikatima i neusklađenosti namene zahtevaju konkretne dokaze koje tužioci nisu osporili meritorno u smislu koji bi pobeđivao zakonitost. Rastojanja i parametri mogu se proveriti iz projekta koji je sastavni deo rešenja.",
    keywords: ["višeporodični objekat", "građevinska dozvola", "zaštita od požara", "susedi", "lokacijska dozvola"],
    related_articles: ["čl. 135. Zakon o planiranju i izgradnji"],
    headnote: "Odbijene tužbe suseda; potvrđena dozvola uz lokacijsku dozvolu i protivpožarnu saglasnost.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 19275/2013",
    decision_date: "2013-12-09",
    legal_area: "administrative",
    legal_question:
      "Da li je bitno povređen postupak ako drugostepeno rešenje ne sadrži razloge o svojstvu žalioca i dokazima o dostavi ključnih akata?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio drugostepeno rešenje kojim je ukinuta građevinska dozvola, jer osporeno rešenje ne sadrži razloge o svojstvu žalioca niti dokaze o urednoj dostavi ključnih akata.",
    reasoning:
      "Obrazloženje mora omogućiti sudsku kontrolu i zaštitu stranaka. Nedostatak razloga o statusu žalioca i dostavi predstavlja bitnu povredu pravila postupka koja zahteva poništaj i ponavljanje postupka pred drugim stepenom.",
    keywords: ["građevinska dozvola", "žalba", "obrazloženje", "dostava", "bitna povreda postupka"],
    related_articles: ["čl. 235. Zakon o opštem upravnom postupku", "Zakon o upravnim sporovima"],
    headnote: "Poništaj drugostepenog zbog nedostatka razloga o stranci i dostavi akata.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6560/2013",
    decision_date: "2013-04-23",
    legal_area: "administrative",
    legal_question:
      "Da li sukorisnik katastarske parcele može podneti predlog za ponavljanje postupka izdavanja upotrebne dozvole?",
    court_position:
      "Upravni sud je odbio tužbu protiv rešenja kojim je poništen zaključak prvostepenog organa i predmet vraćen na ponovni postupak, potvrdivši da sukorisnik parcele na kojoj stoji objekat ima pravo da podnese predlog za ponavljanje postupka izdavanja upotrebne dozvole.",
    reasoning:
      "Pitanje ovlašćenja sukorisnika mora se sagledati i kroz Zakon o planiranju i izgradnji, ne samo kroz formalni ZOP. Kada sukorisnik ima stvarni interes na objektu, predlog za ponavljanje može biti dopušten, pa je drugostepeni organ pravilno ocenio žalbu tužilaca.",
    keywords: ["upotrebna dozvola", "sukorisnik", "ponavljanje postupka", "suvlasništvo", "žalba"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o osnovama svojinskopravnih odnosa", "Zakon o opštem upravnom postupku"],
    headnote: "Sukorisnik može predložiti ponavljanje postupka za upotrebnu dozvolu; tužba odbijena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2209/2013",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonit zaključak o ponavljanju postupka izdavanja građevinske dozvole ako je vlasnik susedne parcele imao interes, a nije učestvovao u prvom postupku?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio zakonitost zaključka o ponavljanju postupka, smatrajući da je propust da se susedu omogući učešće u postupku izdavanja građevinske dozvole osnovan razlog za ponavljanje.",
    reasoning:
      "Nakon ponavljanja i priznanja stranačkog statusa zainteresovanom licu, organi su postupili u skladu sa člom 239. ZOP-a. Žalbene tvrdnje o neskladu sa lokacijskom dozvolom nisu dovele do drugačijeg ishoda u ovoj fazi.",
    keywords: ["ponavljanje postupka", "građevinska dozvola", "sused", "stranka", "žalba"],
    related_articles: ["čl. 239. Zakon o opštem upravnom postupku", "Zakon o planiranju i izgradnji"],
    headnote: "Potvrda ponavljanja postupka zbog propusta uključivanja suseda kao stranke.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2921/2019",
    legal_area: "administrative",
    legal_question:
      "Da li Republički geodetski zavod mora upisati zabeležbu postojanja građevinske dozvole u katastar po zahtevu podnosioca?",
    court_position:
      "Upravni Sud je odbio tužbu kojom se tražio upis zabeležbe građevinske dozvole u katastar, jer važeći Zakon o državnom premeru i katastru u vreme odlučivanja nije predvideo tu vrstu zabeležbe.",
    reasoning:
      "Kad zakon ne predviđa hipotezu upisa, organ ne može stvoriti novu kategoriju zabeležbe administrativnim tumačenjem. Povezivanje sa drugim ispravama ne zamenjuje izričitu zakonsku osnovu za traženi upis.",
    keywords: ["katastar", "zabeležba", "građevinska dozvola", "RGZ", "odbijanje tužbe"],
    related_articles: ["Zakon o državnom premeru i katastru"],
    headnote: "Odbijen zahtev za upis zabeležbe dozvole jer zakon nije predvideo tu vrstu upisa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7218/2014",
    decision_date: "2014-05-15",
    legal_area: "administrative",
    legal_question:
      "Da li se može odobriti rušenje unutrašnjeg stepeništa u suvlasničkom objektu protiv volje drugog suvlasnika kada stepenište predstavlja jedinu legalnu vertikalnu vezu sa spratom?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje kojim je delimično odbijen zahtev za adaptaciju, jer je odbijanje rušenja unutrašnjeg stepeništa bilo zakonito: predstavlja jedinu legalnu vezu sa spratom, a drugi suvlasnik se protivi radovima na zajedničkim delovima.",
    reasoning:
      "Adaptacija koja dira zajedničke delove i funkcionalnu povezanost objekta zahteva saglasnost suvlasnika u granicama člana 15. ZOSVO. Organ je pravilno ocenio da uklanjanje stepeništa nije dopušteno u konkretnoj konfiguraciji protiv volje suvlasnika.",
    keywords: ["adaptacija", "suvlasništvo", "stepenište", "zajednički delovi", "saglasnost"],
    related_articles: ["čl. 15. st. 4. Zakon o osnovama svojinskopravnih odnosa", "Zakon o planiranju i izgradnji"],
    headnote: "Odbijeno rušenje stepeništa kao jedine legalne veze; potrebna saglasnost suvlasnika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1175/2024",
    legal_area: "criminal",
    legal_question:
      "Da li radovi poput lepljenja stiropora na legalnom delu objekta isključuju krivično delo građenja bez građevinske dozvole ako je okrivljeni nastavio radove posle rešenja o obustavi?",
    court_position:
      "Vrhovni sud je odbio zahtev za zaštitu zakonitosti kao neosnovan, potvrđujući osuđujuće presude: okrivljeni je odgovoran za građenje bez dozvole jer je nastavio radove nakon rešenja o obustavi, čime su ispunjena obeležja dela.",
    reasoning:
      "Branilački naglasak na vrstu radova i iskaz svedoka ne ruši utvrđenje nižestepenih sudova kada je pravnosnažno utvrđen kontinuitet bespravnog građenja posle inspekcijske obustave. Zaštita zakonitosti nije revizija činjenica.",
    keywords: ["građenje bez dozvole", "obustava radova", "zaštita zakonitosti", "KZ", "stiropor"],
    related_articles: ["čl. 219a Krivični zakonik", "Zakon o krivičnom postupku čl. 439"],
    headnote: "Odbijen Kzz; nastavak radova posle obustave; obeležja dela ostvarena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 8786/2013",
    decision_date: "2015-04-17",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbačen zahtev za legalizaciju ako podnosilac u ostavljenom roku nije dostavio traženu dokumentaciju?",
    court_position:
      "Upravni Sud je odbio tužbu na potvrdu zaključka o odbacivanju zahteva za legalizaciju, smatrajući da je odbačenje zakonito jer tužilac nije u roku dostavio traženu dokumentaciju, u skladu sa Zakon o planiranju i izgradnji.",
    reasoning:
      "Rokovi za dopunu zahteva imaju procesno dejstvo. Ako organ uredno pozove na dopunu, a podnosilac ne postupi, odbacivanje je dopušteno. Prigovori da fotografija nije potrebna ili da je objekat stariji od obaveze dozvole ne pomažu bez ispunjenja procesnih uslova dopune.",
    keywords: ["legalizacija", "odbacivanje zahteva", "rok", "dopuna", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Potvrda odbacivanja legalizacije zbog nedostavljanja dokumentacije u roku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "Uuz 2/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je moguće ispitati zakonitost rešenja o raspoređivanju službenika ako sudu nisu dostavljeni pravilnik o sistematizaciji i drugi ključni dokazi?",
    court_position:
      "Upravni Sud je usvojio tužbu i poništio rešenje Žalbene komisije o raspoređivanju, jer tuženi organ nije dostavio sudu ključne dokaze (pravilnik o sistematizaciji), što onemogućava ispitivanje zakonitosti.",
    reasoning:
      "Bez sistema radnih mesta i kriterijuma rasporeda, sud ne može verifikovati da li je odluka neutemeljena. To je bitna povreda postupka pred sudom u smislu potpunosti spisa i načela istine.",
    keywords: ["raspoređivanje", "sistematizacija", "spis predmeta", "dokazi", "poništenje"],
    related_articles: ["Zakon o upravnim sporovima", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj rasporeda zbog nedostatka pravilnika o sistematizaciji u spisu pred sudom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9635/2015",
    legal_area: "administrative",
    legal_question:
      "Da li se može legalizovati stambeni objekat na zemljištu javne namene u zaštićenom okruženju spomenika kulture?",
    court_position:
      "Upravni Sud je odbio tužbu na rešenje kojim je odbijen zahtev za legalizaciju, potvrdivši da su objekat na zemljištu javne namene (visoko obrazovanje) i zaštita spomenika zakonske smetnje za legalizaciju.",
    reasoning:
      "Kumulativno su ispunjene hipoteze zabrane legalizacije: urbanistički uslovi i imovinsko-pravni režim javnog zemljišta. Organ je dao dovoljno razloga koji sud prihvata kao zakonite.",
    keywords: ["legalizacija", "javna namena", "spomenik kulture", "odbijanje tužbe", "urbanizam"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o legalizaciji objekata"],
    headnote: "Odbijena legalizacija zbog javne namene zemljišta i zaštite spomenika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 1273/2023",
    legal_area: "criminal",
    legal_question:
      "Da li nastavak građevinskih radova posle rešenja o obustavi opravdava teži oblik krivičnog dela građenje bez građevinske dozvole?",
    court_position:
      "Apelacioni sud je usvojio žalbu javnog tužioca i preinačio presudu u teži oblik krivičnog dela građenje bez građevinske dozvole jer je okrivljeni nastavio radove i posle obustave, menjajući kaznu sa uslovne na zatvor od šest meseci u kućnim uslovima.",
    reasoning:
      "Kvalifikacija dela zavisi od okolnosti ustrajavanja u bespravnom građenju uprkos rešenju nadležnog organa. Drugostepeni sud je ocenio da je prvostepeni sud pogrešno blago kvalifikovao društvenu opasnost i oblik dela.",
    keywords: ["građenje bez dozvole", "obustava", "teži oblik", "preinačenje", "kazna"],
    related_articles: ["čl. 219a Krivični zakonik"],
    headnote: "Preinačena presuda u teži oblik zbog nastavka radova posle obustave.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 5885/2015",
    legal_area: "administrative",
    legal_question:
      "Da li se može izdati lokacijska dozvola ako parcela ne ispunjava kumulativne uslove planskog dokumenta, posebno minimalnu širinu uličnog fronta?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje zahteva za lokacijsku dozvolu, potvrdivši da parcela ne ispunjava kumulativne uslove iz planskog dokumenta i da nije građevinska parcela u smislu člana 54. ZPI.",
    reasoning:
      "Lokacijska dozvola se izdaje samo za parcelu koja ispunjava uslove za građevinsku parcelu. Minimalna širina fronta i drugi parametri su merodavni; tužiteljske tvrdnje o diskriminaciji nisu dokazane suprotno utvrđenom stanju.",
    keywords: ["lokacijska dozvola", "građevinska parcela", "planski dokument", "ulični front", "odbijanje"],
    related_articles: ["čl. 54. st. 1, 5 i 11. Zakon o planiranju i izgradnji"],
    headnote: "Odbijena lokacijska dozvola jer parcela ne ispunjava uslove za građevinsku parcelu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 43/2015",
    legal_area: "administrative",
    legal_question:
      "Da li se može naložiti zatvaranje gradilišta rešenjem o obustavi radova za radove koji po Zakonu o planiranju i izgradnji ne zahtevaju građevinsku dozvolu?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o zatvaranju gradilišta, utvrdivši da je organ pogrešno primenio član 181. stav 1. ZPI smatrajući da vrsta radova nije bitna: zatvaranje se može naložiti samo za radove za koje je potrebna građevinska dozvola.",
    reasoning:
      "Ako su objekti iz člana 144. ZPI za koje se ne izdaje građevinska dozvola, primena režima obustave i zatvaranja gradilišta iz člana 181. stav 1. nije pravilna. Tuženi zaključak da vrsta radova nije od značaja vodi u bitnu povredu materijalnog prava i postupka.",
    keywords: ["zatvaranje gradilišta", "obustava radova", "građevinska dozvola", "čl. 144. ZPI", "čl. 181. ZPI"],
    related_articles: ["čl. 144. Zakon o planiranju i izgradnji", "čl. 181. st. 1. Zakon o planiranju i izgradnji"],
    headnote: "Poništaj zatvaranja gradilišta jer radovi ne padaju pod obavezu građevinske dozvole.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7929/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na suđenje u razumnom roku u parničnom postupku koji traje preko dvanaest godina?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku zbog trajanja postupka dužeg od dvanaest godina, utvrđujući podnosiocima pravo na naknadu nematerijalne štete.",
    reasoning:
      "Postupak oko građevinske dozvole, legalizacije i odgovornosti organa predstavljao je složen predmet, ali trajanje preko decenije prelazi prihvatljivu marginu bez posebne opravdanosti. Sudovi su delimično utvrdili postupanje organa, ali to ne isključuje povredu roka na strani sudskog postupka.",
    keywords: ["razuman rok", "ustavna žalba", "parnica", "nematerijalna šteta", "građevinska dozvola"],
    related_articles: ["čl. 32. Ustav RS", "čl. 36. Ustav RS"],
    headnote: "Usvojena ustavna žalba zbog prekomerne dužine parnice; naknada nematerijalne štete.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 21650/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonit nalog građevinskog inspektora investitoru autoputa da završi izgradnju u roku od 30 dana ako objekat nije završen u roku iz prijave početka građenja?",
    court_position:
      "Upravni Sud je odbio tužbu JP „Putevi Srbije“ protiv rešenja inspektora kojim je naložen završetak radova u roku od 30 dana, potvrdivši da je inspektor postupio u skladu sa članom 178. tačka 6. ZPI.",
    reasoning:
      "Nije sporno da objekat nije završen u roku iz prijave početka građenja. Kad je to nesporno, merodavna je zakonska ovlašćenja inspektora da odredi rok od 30 do 90 dana za završetak, uz dalje posledice neizvršenja.",
    keywords: ["autoput", "građevinska inspekcija", "rok završetka", "JP Putevi Srbije", "čl. 178. ZPI"],
    related_articles: ["čl. 178. tačka 6. Zakon o planiranju i izgradnji", "čl. 170. st. 1. tačka 1. Zakon o opštem upravnom postupku"],
    headnote: "Potvrđen nalog inspekcije za završetak autoputa u roku; radovi nisu završeni u roku iz prijave.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3361/2011",
    decision_date: "2012-03-14",
    legal_area: "administrative",
    legal_question:
      "Da li su žalbene primedbe da građevinska dozvola za rekonstrukciju ne sadrži sve podatke iz člana 136. ZPI osnovane ako su podaci u sastavnim delovima rešenja?",
    court_position:
      "Upravni Sud je odbio tužbu suseda na potvrdu građevinske dozvole za rekonstrukciju i dogradnju, utvrdivši da je dozvola izdata na osnovu konačne lokacijske dozvole i kompletnog glavnog projekta sa svim elementima.",
    reasoning:
      "Kada su glavni projekat i lokacijska dozvola sastavni deo rešenja, od njih se mogu utvrditi rastojanja, koeficijenti i usklađenost sa planom. Ranije poništavanje i izdavanje nove lokacijske dozvole po novom ZPI čine osnovu zakonitosti lanca akata.",
    keywords: ["rekonstrukcija", "građevinska dozvola", "lokacijska dozvola", "glavni projekat", "sused"],
    related_articles: ["čl. 136. Zakon o planiranju i izgradnji", "Pravilnik o sadržini građevinske dozvole"],
    headnote: "Odbijena tužba suseda; sadržina dozvole u skladu sa čl. 136. kroz sastavne delove.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 19906/2010",
    legal_area: "administrative",
    legal_question:
      "Da li se građevinska dozvola može poništiti po službenom nadzoru na osnovu tvrdnji o zabludi i prevari investitora bez posebnog utvrđivanja u nadležnom postupku i bez saglasnosti investitora?",
    court_position:
      "Upravni Sud je odbio tužbu za poništaj rešenja kojim je odbijen zahtev za ukidanje građevinske dozvole po službenom nadzoru, smatrajući da tvrdnje o zabludi i prevari nisu osnov za poništaj dok se ne utvrde u nadležnom postupku, a ukidanje nije moguće bez saglasnosti investitora gde je to propisano.",
    reasoning:
      "Službeni nadzor ne zamenjuje krivični ili parnični postupaj za prevaru. Organ je pravilno ocenio da priloženi materijali ne dokazuju same po sebi osnov za ukidanje dozvole u upravnom postupku bez ispunjenja procesnih i materijalnih standarda.",
    keywords: ["službeni nadzor", "poništenje građevinske dozvole", "prevara", "saglasnost investitora", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Odbijen zahtev za poništaj dozvole po nadzoru; prevara traži poseban dokazni postupak.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 12317/2014",
    decision_date: "2014-09-26",
    legal_area: "administrative",
    legal_question:
      "Da li je prvostepeni organ smeo izmeniti pravnosnažnu lokacijsku dozvolu vanrednim pravnim lekom umesto postupanja po nalogu urbanističke inspekcije?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje Ministarstva kojim je odbijena žalba na izmenjenu lokacijsku dozvolu, jer je prvostepeni organ pogrešno primenio vanredni pravni lek umesto da postupi po nalogu urbanističke inspekcije.",
    reasoning:
      "Postoji hijerarhija nadzornih i izvršnih radnji: inspekcijski nalog mora dovesti do propisanog postupka, a ne zameniti se drugim institutima. Pogrešan pravni osnov za izmenu lokacijske dozvole čini drugostepeno rešenje nezakonitim.",
    keywords: ["lokacijska dozvola", "izmena", "urbanistička inspekcija", "vanredni lek", "poništenje"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj zbog pogrešne primene vanrednog leka umesto postupanja po inspekcijskom nalogu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2199/2014",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbijanje zahteva za legalizaciju ako je prvostepena odluka zasnovana na odredbama Zakona o planiranju i izgradnji koje je Ustavni sud proglasio neustavnim?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o odbijanju legalizacije, jer je prvostepena odluka zasnovana na članu 187. stav 1. tačka 3. ZPI u vezi sa objektom na javnim površinama, a te odredbe su bile proglasene neustavnim i nisu se mogle primeniti u pravnosnažno neokončanom postupku.",
    reasoning:
      "Primena neustavnih odredaba u individualnom predmetu čini rešenje nezakonitim. Sud vraća predmet organu na ponovno odlučivanje bez upotrebe poništenih normi u istom obliku.",
    keywords: ["legalizacija", "neustavnost", "javna namena", "poništenje", "Ustavni sud"],
    related_articles: ["čl. 187. st. 1. tačka 3. Zakon o planiranju i izgradnji (pred neustavnost)", "Ustav RS"],
    headnote: "Poništaj odbijanja legalizacije zbog primene neustavnih odredaba ZPI.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2064/2016",
    legal_area: "administrative",
    legal_question:
      "Da li se građevinska dozvola za dogradnju lifta može proglasiti ništavom zbog tvrdnji tužioca o nepravilnostima ako nisu ispunjene zakonske hipoteze ništavosti?",
    court_position:
      "Upravni Sud je odbio tužbu za oglašavanje ništavom građevinske dozvole za dogradnju lifta, zaključivši da nisu ispunjeni zakonom predviđeni razlozi ništavosti poput nemogućnosti izvršenja ili suprotnosti javnom poretku.",
    reasoning:
      "Ništavost je izuzetak i mora biti izvedena iz striktnih normi. Faktička izvršivost postoji, a osporeni akt nije u sukobu sa osnovnim načelima pravnog poretka. Zbog toga je potvrđena zakonitost osporenog rešenja.",
    keywords: ["ništavost", "lift", "građevinska dozvola", "dogradnja", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Odbijena tužba za ništavost dozvole za lift; nisu ispunjene hipoteze ništavosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Uzp 41/2023",
    legal_area: "administrative",
    legal_question:
      "Da li udruženje za zaštitu životne sredine ima aktivnu legitimaciju za zahtev za preispitivanje presude kojom je odbijena tužba na građevinsku dozvolu ako saglasnost na studiju procene uticaja može biti dostavljena naknadno?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev udruženja za preispitivanje, potvrdivši da udruženje nema aktivnu legitimaciju jer nije utvrđen pravno relevantan interes u smislu zaštite životne sredine u konkretnoj vezi sa aktom, s obzirom da se saglasnost na studiju može pribaviti i naknadno.",
    reasoning:
      "Legitimacija udruženja se ceni individualno prema članu 11. ZUS-a. Ako je pobijana odluka odbijanja tužbe zbog legitimacije, a kasacioni sud nalazi da interes nije povređen pod istim okolnostima, zahtev je neosnovan.",
    keywords: ["legitimacija", "udruženje", "studija procene uticaja", "Upravni spor", "Uzp"],
    related_articles: ["čl. 11. st. 1. Zakon o upravnim sporovima"],
    headnote: "Odbijen Uzp; udruženje bez aktivne legitimacije; naknadna saglasnost na procenu uticaja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 16582/2015",
    legal_area: "administrative",
    legal_question:
      "Da li se može legalizovati stambeni objekat na površini javne namene za koju je utvrđen javni interes po posebnom zakonu?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje zahteva za legalizaciju, potvrdivši da se objekat nalazi na površini javne namene sa utvrđenim javnim interesom, što po Zakonu o legalizaciji predstavlja apsolutnu smetnju za naknadno izdavanje dozvole.",
    reasoning:
      "Primena člana 3. stav 1. tačka 3. Zakona o legalizaciji u vezi sa članom 24. stav 2. isključuje mogućnost legalizacije. Informacija o lokaciji i planski podaci potvrđuju namenu parcele.",
    keywords: ["legalizacija", "javna namena", "javni interes", "čl. 3. Zakona o legalizaciji", "odbijanje tužbe"],
    related_articles: ["čl. 3. st. 1. tačka 3. Zakon o legalizaciji objekata", "čl. 24. st. 2. Zakon o legalizaciji objekata"],
    headnote: "Odbijena legalizacija stana na javnoj površini sa utvrđenim javnim interesom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10665/2014",
    legal_area: "administrative",
    legal_question:
      "Da li građevinski inspektor sme obustaviti postupak nadzora ako utvrdi da je objekat legalizovan, a tužilac dostavlja dokaze da legalizacija ne pokriva spornu intervenciju (zastakljivanje terase)?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio zaključak o obustavi inspekcijskog nadzora, jer se objekat odobren kao advokatska kancelarija koristio kao palačinkarnica, a inspektor je bio nadležan da ispita nenamensko korišćenje i osporavanu legalizaciju terase.",
    reasoning:
      "Prema članu 175. stav 1. ZPI inspektor proverava upotrebnu dozvolu i namenu korišćenja. Član 178. tačka 4. ZPI predviđa mere ako se objekat koristi suprotno dozvoli. Obustava na osnovu nepobijane legalizacije nije zakonita ako postoje ozbiljni dokazi suprotno.",
    keywords: ["inspekcija", "obustava postupka", "namena objekta", "legalizacija", "nenamensko korišćenje"],
    related_articles: ["čl. 175. st. 1. Zakon o planiranju i izgradnji", "čl. 178. tačka 4. Zakon o planiranju i izgradnji"],
    headnote: "Poništaj obustave nadzora; inspektor mora ispitati nenamensko korišćenje i spornu legalizaciju.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7664/2013",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonit nalog inspekcije da se obustavi gradnja i pribavi nova građevinska dozvola ako je prethodna dozvola pravnosnažno poništena?",
    court_position:
      "Upravni Sud je odbio tužbu investitora protiv rešenja kojim je naloženo obustavljanje gradnje i pribavljanje nove građevinske dozvole, utvrdivši da je nakon pravnosnažnog poništenja dozvole objekat građen bez odobrenja, pa je inspektor postupio u skladu sa članom 176. stav 1. tačka 2. ZPI.",
    reasoning:
      "Kada je poništaj građevinske dozvole postao pravnosnažan, dalje izvođenje radova nema pravnu osnovu. Ranije prekid postupka kontrole do pravnosnažnosti ne oduzima zakonitost naknadnih inspekcijskih naloga nakon pravne snage poništaja.",
    keywords: ["građevinska dozvola", "poništenje", "inspekcija", "obustava radova", "pravnosnažnost"],
    related_articles: ["čl. 176. st. 1. tačka 2. Zakon o planiranju i izgradnji"],
    headnote: "Potvrđen nalog inspekcije posle pravnosnažnog poništanja građevinske dozvole.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 4029/2012",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita građevinska dozvola za adaptaciju tavanskog prostora i pripajanje terase stanu ako postoji odluka skupštine stanara i prateća dokumentacija?",
    court_position:
      "Upravni Sud je odbio tužbe stanara na građevinsku dozvolu za adaptaciju tavana, utvrdivši da je investitor priložio kompletnu dokumentaciju uključujući važeću odluku skupštine stanara i ugovor, pa prigovori o saglasnosti svih vlasnika i bespravnom pripajanju terase nisu osnovani.",
    reasoning:
      "Kada su lokacijska dozvola, glavni projekat i tehnička kontrola u spisu, a formalni uslovi solidarnosti stanara ispunjeni odlukom većine, žalbene tvrdnje ne dovode do poništaja. Troškovi zainteresovanom nisu dosuđeni tužiocima u ovom delu dispozitiva.",
    keywords: ["adaptacija", "tavan", "terasa", "skupština stanara", "građevinska dozvola"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o stanovanju"],
    headnote: "Potvrđena dozvola za adaptaciju potkrovlja uz odluku skupštine i projekat.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6454/2014",
    decision_date: "2017-03-17",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbijen zahtev za lokacijsku dozvolu za rekonstrukciju u suvlasništvu ako uz zahtev nije priložena overena saglasnost svih suvlasnika?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje lokacijske dozvole, potvrdivši da je zahtev pravilno odbijen jer tužilac nije priložio saglasnost ostalih suvlasnika, što je uslov iz člana 54. stav 5. tačka 3. u vezi sa članom 135. ZPI.",
    reasoning:
      "Dokaz o pravu na zemljištu za lokacijsku dozvolu u slučaju suvlasništva uključuje saglasnost suvlasnika kada je to propisano. Formalni nedostatak ne može se nadoknaditi tužbom bez dopune postupka pred organom.",
    keywords: ["lokacijska dozvola", "suvlasništvo", "saglasnost suvlasnika", "rekonstrukcija", "odbijanje tužbe"],
    related_articles: ["čl. 54. st. 5. tačka 3. Zakon o planiranju i izgradnji", "čl. 135. Zakon o planiranju i izgradnji"],
    headnote: "Odbijena lokacijska dozvola u suvlasništvu bez saglasnosti svih suvlasnika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6520/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li neizvršenje rešenja o rušenju bespravnog objekta povređuje pravo na imovinu podnositeljke kada je postupak ozakonjenja ponovo pokrenut?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu, smatrajući da propust organa da izvrši rušenje, iako postoji, nije doveo do povrede prava na imovinu jer je postupak ozakonjenja objekta ponovo pokrenut u skladu sa zakonom.",
    reasoning:
      "Pravo na imovinu mora se sagledati u kontekstu celokupnog pravnog režima legalizacije i obustave izvršenja. Ponovno pokretanje legalizacije menja procenu intenziteta povrede i opravdanosti ustavnosudske intervencije.",
    keywords: ["rušenje", "legalizacija", "imovina", "ustavna žalba", "izvršenje"],
    related_articles: ["čl. 58. Ustav RS", "Zakon o planiranju i izgradnji", "Zakon o legalizaciji objekata"],
    headnote: "Odbijena ustavna žalba; ponovo pokrenut postupak ozakonjenja menja okvir povrede.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15583/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonit zaključak o obustavi izvršenja rešenja o uklanjanju stepeništa ako je sporni deo objekta naknadno ozakonjen?",
    court_position:
      "Upravni Sud je odbio tužbu jednog tužioca i odbacio tužbu drugog protiv rešenja Ministarstva, potvrdivši zaključak o obustavi izvršenja uklanjanja stepeništa jer je deo objekta u međuvremenu ozakonjen, pa su razlozi za uklanjanje prestali da postoje.",
    reasoning:
      "Kada je rešenjem o ozakonjenju priznat status dela objekta koji je bio predmet inspekcijske mere, obustava izvršenja ranijeg rešenja o uklanjanju logički sledi iz materijalnog prava. Procesni prigovozi o sprečenosti punomoćnika nisu odmerili drugačije odluku.",
    keywords: ["obustava izvršenja", "ozakonjenje", "stepenište", "inspekcija", "tužba"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o upravnim sporovima"],
    headnote: "Potvrda obustave izvršenja rušenja posle ozakonjenja spornog dela objekta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 4278/2014",
    decision_date: "2016-04-15",
    legal_area: "administrative",
    legal_question:
      "Da li RGZ mora upisati zabeležbu zabrane upisa novosagrađene zgrade u katastar po zahtevu tužioca?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje upisa zabeležbe zabrane upisa zgrade, utvrdivši da Zakon o državnom premeru i katastru ne predviđa tu vrstu zabeležbe i da postojanje građevinske dozvole nije samostalan uslov za takav upis.",
    reasoning:
      "Bez izričite zakonske hipoteze upisa zabeležbe, organ ne može stvoriti novu kategoriju tereta na osnovu opšteg prava na podnesak. Povezivanje sa ZPI ne proširuje katastarski režim upisa van zakonom određenih zabeležbi.",
    keywords: ["katastar", "zabeležba", "zabrana upisa", "građevinska dozvola", "RGZ"],
    related_articles: ["čl. 89. st. 1. Zakon o državnom premeru i katastru"],
    headnote: "Odbijen zahtev za zabeležbu zabrane upisa jer zakon ne predviđa tu vrstu zabeležbe.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14410/2014",
    decision_date: "2014-11-07",
    legal_area: "administrative",
    legal_question:
      "Da li komšije mogu uspešno osporiti rešenje o naknadnoj građevinskoj dozvoli (legalizacija) velikog stambenog objekta ako nisu vlasnici susednih parcela?",
    court_position:
      "Upravni Sud je odbio tužbe komšija na legalizaciju stambenog objekta, utvrdivši da su ispunjeni uslovi Zakona o legalizaciji, a da navodi o saglasnosti suseda nisu osnovani jer tužioci nisu vlasnici susednih parcela sa pravno relevantnom vezom.",
    reasoning:
      "Stranački interes u sporu o legalizaciji mora biti konkretno povezan sa imovinskim ili planskim statusom susedstva. Opšti prigovori o pristrasnosti organa ne zamenjuju dokaz o nezakonitosti u odnosu na ispunjenost uslova legalizacije.",
    keywords: ["legalizacija", "komšije", "stranka", "građevinska dozvola", "troškovi"],
    related_articles: ["Zakon o legalizaciji objekata", "Zakon o planiranju i izgradnji"],
    headnote: "Odbijene tužbe komšija na legalizaciju; troškovi u korist investitora.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 11604/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonit upis vlasništva na ribnjaku u korist lica kome nije izdata građevinska dozvola i koje nema stvarno pravo na parceli?",
    court_position:
      "Upravni Sud je uvažio tužbu Republike Srbije i poništio rešenje o upisu prava svojine na ribnjaku u korist zainteresovanog lica, jer građevinska dozvola nije glasila na to lice, niti je ono imalo odgovarajuće stvarno pravo na zemljištu.",
    reasoning:
      "Prema pravilima upisa vlasništva na objektu, nosilac mora odgovarati licu na koje glasi dozvola ili drugom propisano stečenom pravu. Delimična upotrebna dozvola na treće lice ne opravdava upis vlasništva protivno članu 137. stav 2. Zakona o državnom premeru i katastru.",
    keywords: ["ribnjak", "katastar", "vlasništvo", "građevinska dozvola", "RGZ"],
    related_articles: ["čl. 137. st. 2. Zakon o državnom premeru i katastru"],
    headnote: "Poništaj upisa vlasništva na ribnjaku zbog neskladnosti sa dozvolom i stvarnim pravom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 11325/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito odbijanje legalizacije pomoćnog objekta na suvlasničkoj parceli bez saglasnosti svih suvlasnika?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje legalizacije, potvrdivši da je za radove koji prelaze redovno upravljanje suvlasničkom parcelom potrebna saglasnost drugog suvlasnika, koja u konkretnom slučaju nije pribavljena.",
    reasoning:
      "Primena člana 15. stav 4. ZOSVO zahteva saglasnost za gradnju koja nije u okviru običnog raspolaganja. Tužilac nije isključivi vlasnik, pa organ pravilno odbija legalizaciju dok ne postoji saglasnost.",
    keywords: ["legalizacija", "suvlasništvo", "saglasnost", "pomoćni objekat", "odbijanje tužbe"],
    related_articles: ["čl. 15. st. 4. Zakon o osnovama svojinskopravnih odnosa", "Zakon o legalizaciji objekata"],
    headnote: "Odbijena legalizacija na suvlasničkoj parceli bez saglasnosti drugog suvlasnika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUz 295/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li su odredbe Zakona o planiranju i izgradnji koje uređuju legalizaciju bespravnih objekata (čl. 185–200) u saglasnosti sa Ustavom?",
    court_position:
      "Ustavni Sud je pokrenuo postupak ocene ustavnosti odredaba čl. 185–200. Zakona o planiranju i izgradnji, a u kasnijoj fazi utvrdio njihovu neustavnost jer narušavaju načela vladavine prava i jednakosti i neosnovano privileguju bespravne graditelje u odnosu na legalne investitore.",
    reasoning:
      "Institut legalizacije mora biti proporcionalan i ne sme stvarati sistemsko pogodovanje onima koji su gradili bez dozvole u odnosu na one koji poštuju proceduru. Osporeni deo Zakona predstavlja posebni postupak čiji sadržaj Ustavni sud ocenjuje u odnosu na čl. 2, 31. i 47. Ustava (načela iz odluke).",
    keywords: ["legalizacija", "neustavnost", "Zakon o planiranju i izgradnji", "jednakost", "vladavina prava"],
    related_articles: ["čl. 185–200. Zakon o planiranju i izgradnji (pred revizijom)", "Ustav RS"],
    headnote: "IUz 295/2009: pokretanje i utvrđena neustavnost poglavlja o legalizaciji u ZPI.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6063/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita građevinska dozvola za pripremne radove stanice gondole na Kalemegdanu bez pribavljene saglasnosti na studiju procene uticaja na životnu sredinu?",
    court_position:
      "Upravni Sud je uvažio tužbu udruženja za zaštitu životne sredine i poništio građevinsku dozvolu za pripremne radove, jer nije pribavljena saglasnost na studiju procene uticaja, odnosno rešenje da studija nije potrebna.",
    reasoning:
      "Za predmetne radove i lokaciju važe propisi o proceni uticaja na životnu sredinu. Odsustvo saglasnosti nadležnog organa na SEIA ili ekvivalentnog rešenja čini izdavanje dozvole nezakonitim, nezavisno od tehničke kompletnosti projekta.",
    keywords: ["gondola", "Kalemegdan", "studija procene uticaja", "građevinska dozvola", "poništenje"],
    related_articles: ["Zakon o proceni uticaja na životnu sredinu", "Zakon o zaštiti životne sredine"],
    headnote: "Poništaj dozvole za pripremne radove gondole zbog nedostatka saglasnosti na procenu uticaja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1364/2025",
    legal_area: "criminal",
    legal_question:
      "Da li nedostatak privremene građevinske dozvole za objekat privremenog karaktera isključuje krivičnu odgovornost za građenje bez dozvole?",
    court_position:
      "Vrhovni Sud je odbio zahtev za zaštitu zakonitosti, pojasnivši da formalna oznaka „privremena“ dozvola ne menja krivičnopravni značaj: i privremena građevinska dozvola jeste zakonom propisani akt odobrenja, pa je krivična odgovornost ista kao za standardnu dozvolu.",
    reasoning:
      "Krivično delo iz člana 219a stav 2. Krivičnog zakonika štiti isti pravni dobar bez obzira na podvrstu dozvole. Branilački argument o distinkciji između privremene i obične dozvole odbijen je kao neosnovan.",
    keywords: ["privremena građevinska dozvola", "Kzz", "građenje bez dozvole", "Krivični zakonik"],
    related_articles: ["čl. 219a st. 2. Krivični zakonik", "Zakon o planiranju i izgradnji"],
    headnote: "Privremena dozvola = dozvola u smislu KZ; odbijen zahtev za zaštitu zakonitosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 12418/2015",
    decision_date: "2018-01-04",
    legal_area: "administrative",
    legal_question:
      "Da li inspektor može naložiti obustavu radova na mini hidroelektrani zbog isteka roka saglasnosti zaštite prirode ako su uslovi zaštite inkorporisani u građevinsku dozvolu?",
    court_position:
      "Upravni Sud je uvažio tužbu investitora i poništio rešenje o obustavi radova, smatrajući da uslovi zaštite prirode važe u skladu sa rokovima iz građevinske dozvole, a ne prema prvobitnom roku saglasnosti ako je investitor blagovremeno pribavio lokacijsku i građevinsku dozvolu i započeo radove u roku.",
    reasoning:
      "Građevinska dozvola kao akt integriše uslove iz ranijih faza. Inspekcija ne može zahtevati nove uslove zaštite kao uslov nastavka ako su izvedeni radovi u okviru važeće dozvole koja sadrži odgovarajuće odredbe.",
    keywords: ["mini hidroelektrana", "zaštita prirode", "građevinska dozvola", "obustava radova", "poništenje"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o zaštiti prirode"],
    headnote: "Poništaj obustave radova; rokovi zaštite prate građevinsku dozvolu, ne samo raniju saglasnost.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 5270/2017",
    legal_area: "administrative",
    legal_question:
      "Da li se građevinska i upotrebna dozvola mogu poništiti po službenom nadzoru na osnovu tvrdnji o falsifikovanom uverenju i istekloj staroj dozvoli bez dokaza u spisu?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje zahteva za poništaj građevinske i upotrebne dozvole po službenom nadzoru, utvrdivši da tuženi organ pravilno nije našao dokaze o nedozvoljenim radnjama prilikom donošenja osporenih dozvola.",
    reasoning:
      "Poništaj po službenom nadzoru zahteva konkretnu dokaznu podlogu o povredi propisa u momentu izdavanja akata. Spekulacije o falsifikatu i produženju stare dozvole bez dokazivanja u upravnom postupku ne mogu pobeđivati odluku organa.",
    keywords: ["službeni nadzor", "poništenje dozvole", "dokazi", "falsifikat", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Odbijen zahtev za poništaj dozvola po nadzoru zbog nedostatka dokaza o nezakonitosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Uzp 213/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je dopušten zahtev za preispitivanje sudske odluke kojom je Upravni sud odložio izvršenje upravnog akta?",
    court_position:
      "Vrhovni kasacioni sud je odbacio zahtev kao nedozvoljen, zauzevši stav da rešenje o odlaganju izvršenja ne predstavlja konačnu odluku u smislu člana 49. Zakona o upravnim sporovima.",
    reasoning:
      "Kasaciona kontrola je ograničena na konačne presude i određene druge slučajeve koje zakon izričito numeriše. Odlaganje izvršenja ima privremeni karakter i ne završava spor po suštini, pa nije predmet Uzp-a.",
    keywords: ["odlaganje izvršenja", "Uzp", "konačna odluka", "Upravni spor", "nedozvoljen zahtev"],
    related_articles: ["čl. 49. Zakon o upravnim sporovima"],
    headnote: "Odbacen Uzp protiv odlaganja izvršenja jer nije konačna odluka po ZUS-u.",
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 21659/2010",
    legal_area: "administrative",
    legal_question:
      "Da li nove činjenice nastale posle okončanja postupka mogu biti osnov za ponavljanje postupka izdavanja odobrenja za priključenje na elektrodistributivnu mrežu?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio odbijanje predloga za ponavljanje postupka, smatrajući da nove činjenice koje su nastale nakon okončanja postupka ne mogu biti osnov za ponavljanje prema Zakonu o opštem upravnom postupku.",
    reasoning:
      "Institut ponavljanja ima zatvoren krug hipoteza. Dogadjaji nastali kasnije, uključujući promene u katastru ili drugim postupcima, zahtevaju drugačije pravne lekove, a ne automatsko ponavljanje upravnog postupka priključenja.",
    keywords: ["ponavljanje postupka", "elektro priključenje", "nove činjenice", "ZOP", "odbijanje tužbe"],
    related_articles: ["Zakon o opštem upravnom postupku"],
    headnote: "Nove činjenice posle okončanja postupka nisu osnov za ponavljanje postupka priključenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14177/2020",
    decision_date: "2020-02-20",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita upotrebna dozvola izdata na osnovu konačne građevinske dozvole ako je u toku spor o poništaju građevinske dozvole i tužilac traži prekid postupka?",
    court_position:
      "Upravni Sud je odbio tužbu na upotrebnu dozvolu za stambeni objekat, utvrdivši da je dozvola zakonito izdata na osnovu konačne i pravnosnažne građevinske dozvole, uz izjavu investitora o preuzimanju rizika, dok prigovori o svojini na zemljištu nisu relevantni za ovu fazu.",
    reasoning:
      "Član 158. ZPI dozvoljava izdavanje upotrebne dozvole na osnovu konačnog rešenja o građevinskoj dozvoli na rizik investitora. Postojanje tužbe na poništaj druge građevinske dozvole ne zahteva automatski prekid ako nije zakonom predviđen.",
    keywords: ["upotrebna dozvola", "konačna građevinska dozvola", "rizik investitora", "čl. 158. ZPI", "odbijanje tužbe"],
    related_articles: ["čl. 158. Zakon o planiranju i izgradnji"],
    headnote: "Potvrđena upotrebna dozvola na osnovu konačne građevinske dozvole i izjave o riziku.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14519/2015",
    legal_area: "administrative",
    legal_question:
      "Da li lice koje nije podnosilac zahteva za lokacijske uslove može podneti prigovor i tužbu na odbacivanje prigovora?",
    court_position:
      "Upravni Sud je odbio tužbu, potvrdivši zaključak Gradskog veća kojim je odbačen prigovor na lokacijske uslove, jer prema Zakonu o planiranju i izgradnji prigovor može podneti samo podnosilac zahteva, što tužilac nije bio.",
    reasoning:
      "Procesna ovlašćenja za prigovorne mehanizme vezane za lokacijske uslove su striktno personalna. Nedostatak legitimacije za prigovor proističe i u nedostatku legitimacije za naknadnu tužbu na zaključak o odbacivanju.",
    keywords: ["lokacijski uslovi", "prigovor", "podnosilac zahteva", "legitimacija", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji"],
    headnote: "Samo podnosilac zahteva može da izjavljuje prigovor na lokacijske uslove.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9770/2014",
    legal_area: "administrative",
    legal_question:
      "Da li građevinska dozvola prestaje da važi zbog isteka roka od dve godine za početak radova ako investitor nije mogao započeti gradnju bez potvrde organa koja je izdata tek kasnije?",
    court_position:
      "Upravni Sud je odbio tužbu za utvrđivanje prestanka važenja građevinske dozvole, smatrajući da investitor nije mogao započeti gradnju bez potvrde nadležnog organa koja je izdata kasnije, pa se ne može smatrati da je rok za početak radova istekao na štetu investitora.",
    reasoning:
      "Rešenje o izmeni građevinske dozvole ima svojstvo posebnog akta; rokovi iz člana 140. ZPI moraju se tumačiti u skladu sa objektivnim mogućnostima započinjanja radova. Završetak radova i podnošenje zahteva za tehnički pregled potkrepljuju zaključak da dozvola nije „prazno“ istekla.",
    keywords: ["prestanak važenja", "građevinska dozvola", "rok", "potvrda organa", "izmena dozvole"],
    related_articles: ["čl. 140. Zakon o planiranju i izgradnji"],
    headnote: "Nema prestanka važenja dozvole ako početak radova objektivno zavisi od potvrde organa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pvž 710/2019",
    legal_area: "commercial",
    legal_question:
      "Da li oglas stečajnog upravnika o prodaji nepokretnosti sa neto cenom i bez PDV-a, prodaja bez upotrebne dozvole i navodna nepravilnost oglasа, čine povredu postupka stečaja?",
    court_position:
      "Privredni apelacioni sud je u delu predmeta potvrdio rešenja o prodaji (lokal, garažna mesta, nepokretnost) odbijajući žalbu poverioca, jer navođenje cene bez PDV-a uz jasnu obavezu kupca da snosi poreze i prodaja u viđenom stanju ne predstavljaju povredu Nacionalnog standarda za javno nadmetanje; u delu poslovnog prostora ukinuto je rešenje zbog nejasnoća oko PDV-a jer prvostepeni sud nije razjasnio da li je cena ugovorena sa ili bez PDV-a.",
    reasoning:
      "Stečajna prodaja „kakva jeste“ dozvoljava promet objekata bez upotrebne dozvole uz transparentno označene rizike. Jednakost učesnika na nadmetanju nije povređena ako su uslovi jasni. Suprotno, protivrečnost između oglasa i ugovora o PDV-u čini odluku neproverljivom i zahteva vraćanje na ponovno odlučivanje u tom segmentu.",
    keywords: ["stečaj", "javno nadmetanje", "PDV", "upotrebna dozvola", "Privredni apelacioni sud"],
    related_articles: ["Zakon o stečaju", "Pravilnik o nacionalnim standardima za upravljanje stečajnom masom"],
    headnote: "Pvž 710/2019: uglavnom potvrđena prodaja u stečaju; ukinuto rešenje zbog nejasnoće PDV-a u jednom delu.",
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6348/2015",
    legal_area: "constitutional",
    legal_question:
      "Da li pojam „građevinska dozvola“ u članu 219a Krivičnog zakonika obuhvata i rešenje o odobrenju izvođenja radova za rekonstrukciju?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu osuđenog za građenje bez građevinske dozvole, utvrdivši da se u smislu Krivičnog zakonika pod građevinskom dozvolom mora podrazumevati i rešenje o odobrenju izvođenja radova za rekonstrukciju kada je takav akt zakonom predviđen.",
    reasoning:
      "Ratio legis člana 219a KZ štiti javnu bezbednost od rizičnih radova na objektu. Procedura za dobijanje klasične dozvole je složenija, ali zakonodavac posebno predviđa odobrenje za radove koji menjaju konstrukciju, izgled ili kapacitet, pa izostanak tog akta može biti krivično relevantan.",
    keywords: ["građevinska dozvola", "rekonstrukcija", "čl. 219a KZ", "ustavna žalba", "odobrenje radova"],
    related_articles: ["čl. 219a Krivični zakonik", "čl. 2. st. 1. tačka 32. Zakon o planiranju i izgradnji"],
    headnote: "Ustavni sud: KZ „građevinska dozvola“ može obuhvatati i odobrenje za rekonstrukciju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 17764/2019",
    legal_area: "administrative",
    legal_question:
      "Da li se u sporu o građevinskoj dozvoli za autoperionicu može preispitivati zakonitost konačnih lokacijskih uslova?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje žalbe na građevinsku dozvolu za autoperionicu, smatrajući da se zakonitost konačnih lokacijskih uslova ne ispituje u postupku izdavanja građevinske dozvole, već u posebnom zakonom predviđenom postupku.",
    reasoning:
      "Institucionalna podela nadzora između faze lokacijskih uslova i faze građevinske dozvole sprečava „preispitivanje unazad“ svih prethodnih akata u svakoj fazi. Tužilac mora koristiti predviđene pravne lekove protiv lokacijskih akata.",
    keywords: ["građevinska dozvola", "lokacijski uslovi", "autoperionica", "prethodni akt", "odbijanje tužbe"],
    related_articles: ["Zakon o planiranju i izgradnji", "Zakon o upravnim sporovima"],
    headnote: "Zakonitost konačnih lokacijskih uslova nije predmet spora o građevinskoj dozvoli.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUz 298/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li je neustavna odredba člana 97. stav 3. Zakona o državnom premeru i katastru koja dozvoljava upis držaoca umesto vlasnika na objektu izgrađenom bez građevinske dozvole?",
    court_position:
      "Ustavni Sud je odbacio inicijativu za ocenu ustavnosti, smatrajući da se pravo svojine steče na zakonit način, pa bespravni graditelji nisu mogli steći svojinu na objektu, dok je upis držaoca kao faktičke vlasti u skladu sa čl. 58. Ustava.",
    reasoning:
      "Kad je izgradnja suprotna propisima o dozvolama, ne postoji stečenje svojine „na osnovu zakona“ u smislu mirnog uživanja. Odredba člana 97. stav 3. ZDPK omogućava evidentiranje stanja bez legitimanja bespravne gradnje kao vlasništva.",
    keywords: ["katastar", "držalac", "bespravna gradnja", "svojina", "Ustav"],
    related_articles: ["čl. 58. Ustav RS", "čl. 97. st. 3. Zakon o državnom premeru i katastru"],
    headnote: "Odbijena inicijativa: upis držaoca na bespravnom objektu nije u sukobu sa Ustavom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 17334/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je moguće ozakoniti objekat na zemljištu javne namene bez saglasnosti upravljača javnog dobra?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje zahteva za ozakonjenje, potvrdivši da bez saglasnosti upravljača javnog dobra nije ispunjen uslov Zakona o ozakonjenju objekata za ozakonjenje u predmetnom slučaju.",
    reasoning:
      "Javna dobra i posebni režimi korišćenja zahtevaju saglasnost nosioca javne funkcije. Tužiteljske tvrdnje o plaćenim dajnjama i postojećim dozvolama ne zamenjuju izričit pravni osnov za saglasnost upravljača.",
    keywords: ["ozakonjenje", "javno dobro", "saglasnost upravljača", "Zakon o ozakonjenju objekata", "odbijanje tužbe"],
    related_articles: ["Zakon o ozakonjenju objekata"],
    headnote: "Odbijeno ozakonjenje na javnom dobru bez saglasnosti upravljača.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Uzp 397/2022",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita građevinska dozvola za postrojenje za otpad ako dispozitiv poziva na studiju procene uticaja koja ne postoji u spisu?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev za preispitivanje i potvrdio poništenje građevinske dozvole, smatrajući dozvolu nezakonitom jer se dispozitiv poziva na studiju procene uticaja koja nije priložena u predmet.",
    reasoning:
      "Iako Upravni sud može imati formalne nedostatke u obrazloženju, supstanca zakonitosti zahteva postojanje dokaza o ispunjenju uslova zaštite životne sredine. Referenca na nepostojeći dokument u dispozitivu osnov je nezakonitosti.",
    keywords: ["Uzp", "studija procene uticaja", "građevinska dozvola", "otpada", "poništenje"],
    related_articles: ["Zakon o proceni uticaja na životnu sredinu", "Zakon o planiranju i izgradnji"],
    headnote: "Uzp 397/2022: potvrđeno poništanje dozvole zbog poziva na nepostojeću studiju u spisu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 177/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je dokazana prevara kupaca stanova u izgradnji ako im je prodavac saopštio da za određenu lamelu nema građevinske dozvole?",
    court_position:
      "Apelacioni sud je potvrdio oslobađajuću presudu za prevaru, zaključujući da tužilaštvo nije dokazalo prevarnu nameru jer su kupci bili upoznati da građevinska dozvola za laminu ne postoji, pa se radi o građanskopravnom odnosu.",
    reasoning:
      "Bitna obeležja prevare zahtevaju dovođenje u zabludu. Kada je informacija o nedostatku dozvole eksplicitno data, teško je utvrditi subjektivni element prevare u korist optužbe. Iskazi svedoka i pisanih dokaza podržavaju odbranu.",
    keywords: ["prevara", "stanovi u izgradnji", "građevinska dozvola", "oslobađajuća presuda", "Kž"],
    related_articles: ["Krivični zakonik", "Zakon o krivičnom postupku"],
    headnote: "Potvrđena oslobađajuća presuda; kupci znali za nedostatak dozvole za laminu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9357/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li podnošenje zahteva za legalizaciju utiče na zakonitost rušenja objekta izgrađenog bez dozvole prema starim propisima?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu, smatrajući da pravo na pravično suđenje nije povređeno jer su redovni sudovi pravilno primenili pravo kada su zaključili da podnošenje zahteva za legalizaciju ne utiče na zakonitost rušenja prema propisima koji su važili u vreme izvršenja.",
    reasoning:
      "Prelazni režimi ZPI i Zakona o legalizaciji moraju se tumačiti u vremenskoj perspektivi. Ako je rušenje bilo zakonito pod tada važećim okolnostima, naknadni zahtev za legalizaciju ne stvara retroaktivnu zaštitu od rušenja u smislu Ustava.",
    keywords: ["rušenje", "legalizacija", "ustavna žalba", "pravično suđenje", "retroaktivnost"],
    related_articles: ["čl. 32. Ustav RS", "Zakon o planiranju i izgradnji", "Zakon o legalizaciji objekata"],
    headnote: "Odbijena ustavna žalba; legalizacioni zahtev ne utiče na zakonitost već izvršenog rušenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 503/2014",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonita građevinska dozvola za dogradnju porodičnog stambenog objekta ako je projekat u skladu sa lokacijskom dozvolom i planom u pogledu spratnosti i udaljenosti?",
    court_position:
      "Upravni Sud je odbio tužbu na potvrdu građevinske dozvole za dogradnju, utvrdivši da je projekat u skladu sa lokacijskom dozvolom i planskim dokumentima u pogledu spratnosti, udaljenosti i položaja na parceli.",
    reasoning:
      "Kada je u ponovljenom postupku održana rasprava i kada su investitori učestvovali, a parametri iz projekta odgovaraju planu, žalbene tvrdnje o diskriminaciji u odnosu na druge parcele ne uspevaju bez konkretnih dokaza o povredi plana.",
    keywords: ["dogradnja", "građevinska dozvola", "lokacijska dozvola", "Generalni plan", "sused"],
    related_articles: ["Zakon o planiranju i izgradnji"],
    headnote: "Potvrđena dozvola za dogradnju uz usklađenost projekta sa lokacijskom dozvolom i planom.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 11357/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je bitna povređena ako prvostepeni organ ne omogući učešće vlasnicima susednih parcela u postupku izdavanja građevinske dozvole?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o građevinskoj dozvoli, utvrdivši povredu načela saslušanja stranke jer vlasnicima susednih parcela nije omogućeno učešće u postupku, što predstavlja bitnu povredu pravila postupka.",
    reasoning:
      "Susedi sa zakonom priznatim interesom moraju imati mogućnost učešća u postupku koji direktno utiče na njihove parcele. Izostanak poziva ili mogućnosti izjašnjenja čini akt podobnim za poništaj bez meritornog ulaska u projekat.",
    keywords: ["saslušanje stranke", "sused", "građevinska dozvola", "bitna povreda postupka", "poništenje"],
    related_articles: ["Zakon o opštem upravnom postupku", "Zakon o upravnim sporovima"],
    headnote: "Poništaj građevinske dozvole zbog neuključivanja suseda kao stranke u postupku.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 711/2016",
    legal_area: "civil",
    legal_question:
      "Da li gradske opštine odgovara za štetu od rušenja objekata ako je dodelila lokaciju i odobrila gradnju bez pribavljanja građevinske dozvole?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju opštine i potvrdio njenu odgovornost za štetu nastalu rušenjem objekata, jer je opština dodelila lokaciju i odobrila gradnju, ali je propustila da obezbedi građevinsku dozvolu, što je bilo presudno za štetu tužioca.",
    reasoning:
      "Ustanovljen je lanac odgovornosti između administrativnih akata opštine i oslanjanja tužioca na njih. Revizijski navodi da je tužilac odstupio od odobrenja ne otklanjaju utvrđenu ulogu opštine u omogućavanju izgradnje bez zakonite dozvole u režimu spomeničkog područja.",
    keywords: ["odgovornost", "šteta", "rušenje", "građevinska dozvola", "opština", "revizija"],
    related_articles: ["čl. 172. Zakon o obligacionim odnosima", "Zakon o planiranju i izgradnji"],
    headnote: "Potvrđena odgovornost opštine za štetu zbog odobrenja gradnje bez građevinske dozvole.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7398/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o prestanku važenja građevinske dozvole za vetropark ako u spisu nema dokaza o uručenju dozvole investitoru?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o prestanku važenja građevinske dozvole, jer u spisu nema dokaza o uručenju dozvole investitoru, pa se ne može utvrditi kada je nastupila pravnosnažnost i od kada teku rokovi za prestanak.",
    reasoning:
      "Pravni početak rokova iz građevinske dozvole vezuje se za pravnu snagu prema stranci. Bez dokaza o uručenju, organ ne može pouzdano utvrditi istek rokova iz člana 140. ZPI, pa je rešenje o prestanku neutemeljeno.",
    keywords: ["vetropark", "prestanak važenja", "građevinska dozvola", "uručenje", "pravnosnažnost", "poništenje"],
    related_articles: ["čl. 140. Zakon o planiranju i izgradnji", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj prestanka važenja dozvole zbog nedostatka dokaza o uručenju investitoru.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4289/2023",
    legal_area: "civil",
    legal_question:
      "Da li kupac stana može zadržati posedovanje ako je kupio stan nakon upisa hipoteke na celom objektu i vansudskog namirenja u korist prethodnog vlasnika?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je naloženo iseljenje tužene iz stana, smatrajući da je stan bio obuhvaćen hipotekom pre kupovine, a pravni prethodnik tužioca stekao vlasništvo kupovinom celog objekta u postupku namirenja hipoteke.",
    reasoning:
      "Pravo vlasništva stečeno namirenjem hipoteke ima prednost u odnosu na naknadnog kupca koji je znao ili morao znati za teret i postupak. Ponuda zakupa/kupovine od strane novog vlasnika ne stvara pravo zadržavanja ako tužena nije prihvatila.",
    keywords: ["iseljenje", "hipoteka", "stan", "namirenje", "vlasništvo", "Gž"],
    related_articles: ["Zakon o hipoteci", "Zakon o obligacionim odnosima"],
    headnote: "Potvrđeno iseljenje; kupovina stana posle hipoteke na objektu ne štiti posednika.",
    outcome: "plaintiff_won",
  },
]
