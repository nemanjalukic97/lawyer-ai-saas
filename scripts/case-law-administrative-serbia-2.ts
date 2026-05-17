// scripts/case-law-administrative-serbia-2.ts
// Serbian tax / fiscal administrative case law (batches 1–3; document complete).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_ADMINISTRATIVE_SERBIA_2: CaseLawInput[] = [
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 8523/2017",
    legal_area: "administrative",
    legal_question:
      "Da li se na zastarelost prava na utvrđivanje poreza na prenos apsolutnih prava primenjuje rok od tri ili pet godina kada je tok zastarelosti počeo pre izmene Zakona od 6.8.2010, a rešenje je doneto 2013. godine?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje o porezu na prenos apsolutnih prava, smatrajući da se primenjuje petogodišnji rok iz izmenjenog čl. 114 ZPPP jer u trenutku stupanja izmene na snagu raniji rok još nije bio istekao.",
    reasoning:
      "Ako je do stupanja na snagu novog propisa rok zastarelosti po starom propisu već istekao, postupak se ne može nastaviti; ako nije istekao, a novi propis menja trajanje i računanje, primenjuje se novi propis. Zastarelost je počela 01.01.2009 (saznanje za prenos 18.12.2008), rešenje 25.11.2013 je unutar pet godina od novog početka toka.",
    keywords: ["porez na prenos apsolutnih prava", "zastarelost", "primena zakona u vremenu", "pet godina", "ZPPP"],
    related_articles: ["čl. 23. ZPPP", "čl. 114. ZPPP", "Zakon o izmenama ZPPP („Sl. glasnik RS“, br. 53/10)"],
    headnote: "Prelaz sa tri na pet godina zastarelosti ako stari rok nije istekao u momentu izmene.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6397/2017",
    decision_date: "2018-06-08",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito retroaktivno utvrđen porez na imovinu za 2014. godinu i da li je pravo na utvrđivanje zastarelo?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje kojim je retroaktivno utvrđen porez na imovinu za 2014. godinu, utvrdivši da pravo na utvrđivanje nije zastarelo jer je rešenje doneto unutar pet godina od početka toka zastarelosti po čl. 114 st. 1–2 ZPPP.",
    reasoning:
      "Zastarelost prava na utvrđivanje teče od prvog dana naredne godine od godine u kojoj je trebalo utvrditi porez. Sa donošenjem osporenog rešenja u roku od pet godina, organ je postupio zakonito.",
    keywords: ["porez na imovinu", "retroaktivno utvrđivanje", "zastarelost", "pet godina", "ZPPP"],
    related_articles: ["čl. 114. st. 1–2. ZPPP", "čl. 40. st. 2. Zakon o upravnim sporovima"],
    headnote: "Potvrda retroaktivnog utvrđenja poreza na imovinu; nema zastarelosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 12139/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je zastarelo pravo na naplatu komunalne takse za isticanje firme ako poreski dužnik tvrdi zastarelost, a Poreska uprava se poziva na mirovanje duga i uručenu opomenu?",
    court_position:
      "Upravni Sud je odbio tužbu advokata za otpis duga po osnovu zastarelosti komunalne takse, potvrdivši da je rok zastarelosti naplate prekinut mirovanjem i kasnijim uručenjem opomene, pa pravo na naplatu nije zastarelo.",
    reasoning:
      "Čl. 114 st. 1 i 3 ZPPP uređuju trajanje i početak toka zastarelosti za utvrđivanje odnosno naplatu. Čl. 114d uređuje prekid, a čl. 114ž apsolutni rok od deset godina u određenim situacijama. Ocena tuženog da su radnje naplate bile blagovremene prihvata se kao zakonita.",
    keywords: ["komunalna taksa", "zastarelost naplate", "mirovanje", "opomena", "ZPPP"],
    related_articles: ["čl. 114. ZPPP", "čl. 114d ZPPP", "čl. 114ž ZPPP"],
    headnote: "Prekid zastarelosti naplate; odbijena tužba za otpis komunalne takse.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 17971/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je obrazložen način obračuna poreske osnovice za porez na imovinu na građevinskom zemljištu za suvlasnika, posebno u delu oporezive površine?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o utvrđivanju poreza na imovinu za građevinsko zemljište, jer obrazloženje načina obračuna oporezive površine, posebno za suvlasnika, nije jasno niti utemeljeno u zakonu, što čini bitnu povredu pravila postupka.",
    reasoning:
      "Poreski obveznik mora moći iz obrazloženja pratiti matematiku i pravnu kvalifikaciju osnovice. Nepreciznost u odnosu na suvlasnički deo i površine onemogućava sudsku kontrolu i meritornu odbranu.",
    keywords: ["porez na imovinu", "građevinsko zemljište", "suvlasnik", "obrazloženje", "poništenje"],
    related_articles: ["čl. 141. st. 4. Zakon o opštem upravnom postupku", "Zakon o porezima na imovinu"],
    headnote: "Poništaj poreza na imovinu zbog nejasnog obračuna osnovice za suvlasnika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3974/2015",
    legal_area: "administrative",
    legal_question:
      "Da li se na zastarelost utvrđivanja poreza na imovinu za 2010. godinu primenjuje rok od tri ili pet godina kada je izmena zakona stupila na snagu pre isteka starog roka?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio da nije nastupila zastarelost, jer se primenjuje produženi rok od pet godina iz izmene čl. 114 ZPPP od 6.8.2010, budući da petogodišnji rok po starom propisu nije bio istekao u momentu izmene.",
    reasoning:
      "Polazeći od čl. 5 ZPPP, poreska obaveza se vezuje za propise u vreme nastanka, dok se rokovni instituti u postupku merodavno primenjuju s obzirom na vreme kada rok još nije istekao. Zastarelost je počela 1.1.2011, rešenje je dostavljeno 2014, što je unutar pet godina.",
    keywords: ["porez na imovinu", "zastarelost", "izmena zakona", "pet godina", "ZPPP"],
    related_articles: ["čl. 5. ZPPP", "čl. 114. ZPPP"],
    headnote: "Produženje roka zastarelosti sa tri na pet godina ako stari rok nije istekao.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9440/2015",
    legal_area: "administrative",
    legal_question:
      "Da li poslodavac gubi pravo na poresku olakšicu za zapošljavanje lica mladjih od 30 godina ako smanji ukupan broj zaposlenih ispod propisanog nakon otkaza subvencionisanog radnika?",
    court_position:
      "Upravni Sud je odbio tužbu privrednog društva kojoj je ukinuta poreska olakšica, potvrdivši da je pravo na olakšicu izgubljeno kada poslodavac više ne ispunjava uslov broja zaposlenih, u skladu sa Pravilnikom i ZPPP.",
    reasoning:
      "Obaveštenje o ostvarivanju ili gubitku prava na olakšicu i naknadna utvrđivanja doprinosa moraju pratiti stvarno stanje zaposlenosti. Primena čl. 5 ZPPP i čl. 114 u vezi sa zastarelosti ne pomaže tužiocu ako je materijalno ispunjen gubitak uslova.",
    keywords: ["poreska olakšica", "zapošljavanje mladih", "doprinosi", "Pravilnik OPNR-M", "ZPPP"],
    related_articles: ["Zakon o porezu na dohodak građana", "ZPPP"],
    headnote: "Gubitak olakšice pri padu broja zaposlenih ispod zakonskog praga.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 4857/2015",
    legal_area: "administrative",
    legal_question:
      "Da li pravo Poreske uprave na utvrđivanje i naplatu doprinosa za obavezno socijalno osiguranje podleže zastarelosti po opštem režimu čl. 114 ZPPP?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje zahteva za otpis duga po osnovu zastarelosti doprinosa, potvrdivši da se na doprinose ne primenjuju odredbe ZPPP o zastarelosti, shodno čl. 114e ZPPP.",
    reasoning:
      "Posebna norma isključuje primenu opštih pravila zastarelosti na doprinose, pa tužbeni argumenti zasnovani na čl. 114 st. 1–3 ne mogu uspeti.",
    keywords: ["doprinosi", "PIO", "zastarelost", "čl. 114e ZPPP", "otpis duga"],
    related_articles: ["čl. 114e ZPPP", "čl. 151. st. 1. ZPPP"],
    headnote: "Na doprinose se ne primenjuju odredbe ZPPP o zastarelosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 793/2019",
    legal_area: "administrative",
    legal_question:
      "Da li uzastopni ugovori o stručnom osposobljavanju mogu predstavljati prikriveni radni odnos za poreze i doprinose, i da li je prekinuta zastarelost kontrolama 2012–2013?",
    court_position:
      "Upravni Sud je odbio tužbu na rešenje o utvrđenim poreskim obavezama, potvrdivši primenu načela fakticiteta: ugovori su prikriveni radni odnos, isplate su zarada, a zastarelost je prekinuta zapisnicima kontrole.",
    reasoning:
      "Čl. 114d ZPPP omogućava prekid zastarelosti radnjama u cilju utvrđivanja i naplate. Prigovori mesne nadležnosti i potpisa akta ocenjeni su kao neosnovani. Sud je mogao odlučiti bez rasprave po čl. 33 st. 2 ZUS.",
    keywords: ["prikriveni rad", "stručno osposobljavanje", "fakticitet", "zastarelost", "kontrola"],
    related_articles: ["čl. 114. ZPPP", "čl. 114d ZPPP", "čl. 33. st. 2. Zakon o upravnim sporovima"],
    headnote: "Potvrđen prikriveni rad; prekid zastarlosti kontrolama; tužba odbijena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15834/2019",
    legal_area: "administrative",
    legal_question:
      "Od kada teče rok zastarelosti za utvrđivanje poreza na prenos apsolutnih prava ako ugovor nije blagovremeno prijavljen?",
    court_position:
      "Upravni Sud je odbio tužbu na porez na prenos apsolutnih prava, potvrdivši da zastarelost ne teče od dana zaključenja ugovora kada prijava nije blagovremena, već od dana saznanja poreskog organa za prenos, u smislu čl. 29 st. 9 Zakona o porezima na imovinu u vezi sa čl. 114 ZPPP.",
    reasoning:
      "Moment nastanka obaveze uslovljava i moment početka toka zastarelosti za utvrđivanje. Tužiteljski račun od datuma ugovora zanemaruje fictio iuris o saznanju.",
    keywords: ["prenos apsolutnih prava", "saznanje organa", "zastarelost", "neblagovremena prijava", "ZPIM"],
    related_articles: ["čl. 29. st. 7. i 9. Zakon o porezima na imovinu", "čl. 114. ZPPP"],
    headnote: "Zastarelost teče od saznanja za prenos ako prijava nije blagovremena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9454/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je tužba osnovana protiv rešenja kojim je na zahtev poreskog obveznika delimično utvrđena zastarelost dela duga za porez na oružje i naložen otpis?",
    court_position:
      "Upravni Sud je odbio tužbu, smatrajući da je osporeno rešenje doneto u korist tužioca i da navodi tužbe nisu osnovani u odnosu na pravilno utvrđenu zastarelost dela potraživanja i prekid toka za aktivne godine.",
    reasoning:
      "Kancelarijska kontrola i zapisnik su osnova za zaključak o delimičnoj zastarelosti za određene godine, dok za druge godine naplata ostaje aktuelna. Tužilac ne osporava meritorno raspodelu koju organ zasniva na analitičkim karticama i čl. 114 ZPPP.",
    keywords: ["porez na oružje", "zastarelost", "delimični otpis", "analitička kartica", "ZPPP"],
    related_articles: ["čl. 114. ZPPP", "čl. 23. tačka 2. ZPPP"],
    headnote: "Odbijena tužba na rešenje koje delimično prihvata zastarelost u korist obveznika.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 4033/2011",
    legal_area: "administrative",
    legal_question:
      "Da li je nastupila zastarelost prava na utvrđivanje poreza na prihod od nepokretnosti za 2005. godinu ako je ranije rešenje poništeno?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje kojim je utvrđen porez za 2005, utvrdivši da je nastupila zastarelost prava na utvrđivanje jer je prethodno rešenje bilo poništeno i jer novi akt nije donet unutar roka od tri odnosno pet godina u skladu sa primenjivim čl. 114 ZPPP.",
    reasoning:
      "Primena čl. 5, 23 i 114 ZPPP zahteva da se poništaj ranijeg akta uračuna u procenu toka zastarelosti. Ponovno utvrđivanje nakon isteka roka je nezakonito.",
    keywords: ["prihod od nepokretnosti", "zastarelost", "poništenje", "porez 2005", "ZPPP"],
    related_articles: ["čl. 114. ZPPP", "čl. 23. ZPPP", "čl. 5. ZPPP"],
    headnote: "Usvojena tužba; zastarelost posle poništenja ranijeg utvrđivanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6032/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o komunalnoj taksi za korišćenje javne površine ako drugostepeni organ pogrešno citira odredbe o zastarelosti i nepotpuno utvrdi činjenice o delatnosti i likvidaciji?",
    court_position:
      "Upravni Sud je uvažio tužbu, poništio rešenje Gradskog veća i vratio predmet na ponovno odlučivanje zbog brojnih povreda postupka, uključujući pogrešnu primenu odredaba o zastarelosti i nepotpuno utvrđeno činjenično stanje.",
    reasoning:
      "Tužilac je ukazivao na odsustvo odobrenja za zauzeće i uklanjanje kioska; organ je mešao režime zastarelosti (tri vs pet godina) u obrazloženju. To utiče na zakonitost i zahteva ponavljanje postupka.",
    keywords: ["komunalna taksa", "javna površina", "zastarelost", "bitna povreda postupka", "Gradsko veće"],
    related_articles: ["čl. 114. ZPPP", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj rešenja o komunalnoj taksi; pogrešna primena zastarelosti i nepotpun spis.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2454/2015",
    decision_date: "2017-06-02",
    legal_area: "administrative",
    legal_question:
      "Da li poslodavac koji je izgubio poresku olakšicu mora platiti doprinose koji bi plaćao bez olakšice i da li je zastarelo pravo na njihovo utvrđivanje?",
    court_position:
      "Upravni Sud je odbio tužbu na rešenje Poreske uprave, potvrdivši obavezu doprinosa nakon gubitka olakšice i odbijajući zastarelost primenom čl. 114 i 114ž ZPPP sa početkom toka od 1.1.2010/2011 u konkretnoj konstelaciji.",
    reasoning:
      "Gubitak olakšice u avgustu 2009 i aprilu 2010 uslovljava obavezu dopunskih doprinosa. Rokovi nisu istekli u vreme odluke organa.",
    keywords: ["poreska olakšica", "doprinosi", "zastarelost", "čl. 114ž ZPPP", "ZPPP"],
    related_articles: ["čl. 114. ZPPP", "čl. 114ž ZPPP", "čl. 75. ZPPP"],
    headnote: "Doprinosi posle gubitka olakšice; zastarelost nije nastupila.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9501/2016",
    legal_area: "administrative",
    legal_question:
      "Da li sud dužnosti da overi ugovor mora dostaviti ugovor poreskom organu radi početka toka zastarelosti za porez na prenos?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio utvrđivanje poreza na prenos, smatrajući neosnovanim prigovor zastarelosti jer obaveza nastaje danom saznanja organa, a ne danom overe, kada prijava nije blagovremena.",
    reasoning:
      "Argument da sud mora dostaviti ugovor ne menja fictio o saznanju iz čl. 29 st. 7 ZPIM. Tužbeni navodi su bez uticaja na drugačiju odluku.",
    keywords: ["prenos apsolutnih prava", "overa ugovora", "saznanje", "zastarelost", "ZPIM"],
    related_articles: ["čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP"],
    headnote: "Zastarelost teče od saznanja; navod o obavezi suda da dostavi ugovor neosnovan.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7963/2015",
    legal_area: "administrative",
    legal_question:
      "Da li se na jednokratni porez na ekstra imovinu primenjuju odredbe o zastarelosti iz ZPPP (čl. 114–114ž)?",
    court_position:
      "Upravni Sud je odbio tužbu na rešenje o hipoteci radi naplate jednokratnog poreza, potvrdivši da se opšti režim zastarelosti ZPPP ne primenjuje, već čl. 31 Zakona o jednokratnom porezu na ekstra dohodak i ekstra imovinu, prema kome obaveza ne zastareva.",
    reasoning:
      "Prelazne odredbe ZPPP ostavljaju na snazi posebne odredbe o zastarelosti iz zakona o jednokratnom porezu. Apsolutna zastarelost iz čl. 114ž ZPPP ne može da „pregazi“ specijalitet.",
    keywords: ["jednokratni porez", "ekstra imovina", "hipoteka", "zastarelost", "poseban zakon"],
    related_articles: ["čl. 31. Zakon o jednokratnom porezu na ekstra dohodak i ekstra imovinu", "ZPPP"],
    headnote: "Na jednokratni porez ne primenjuju se čl. 114–114ž ZPPP; poseban režim.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14893/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je rok zastarelosti naplate komunalne takse za isticanje firme prekinut uručenjem opomene 2012. godine?",
    court_position:
      "Upravni Sud je odbio tužbu advokata za otpis duga po zastarelosti komunalne takse, potvrdivši prekid roka uručenjem opomene i ponovni tok po čl. 114d ZPPP.",
    reasoning:
      "Tužilac je dužan da prijavi promenu sedišta; opomena je validna radnja prekida. Obrazloženje tuženog sadrži jasne razloge koje sud prihvata.",
    keywords: ["komunalna taksa", "opomena", "prekid zastarelosti", "advokat", "ZPPP"],
    related_articles: ["čl. 114. ZPPP", "čl. 114d ZPPP"],
    headnote: "Prekid zastarelosti naplate opomenom; odbijen zahtev za otpis.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10423/2015",
    legal_area: "administrative",
    legal_question:
      "Da li su isplate po „dopunskom radu“ oslobođene poreza i doprinosa kao volonterski angažman, i da li je zastarelost prekinuta nalogom za terensku kontrolu 2010?",
    court_position:
      "Upravni Sud je odbio tužbu na utvrđivanje poreza na druge prihode i doprinosa za PIO, potvrdivši da je reč o dopunskom radu, ne o volonterstvu, i da je zastarelost prekinuta uručenjem naloga za terensku kontrolu 15.12.2010.",
    reasoning:
      "Za 2005/2006 tok zastarelosti je računato od 1.1.2006/2007 sa pet godina, ali nalog 2010 prekida rok. Nepotpune prijave i izbegavanje plaćanja opravdavaju kontrolu.",
    keywords: ["dopunski rad", "volonter", "porez na druge prihode", "PIO", "terenska kontrola"],
    related_articles: ["čl. 114. ZPPP", "čl. 114d ZPPP"],
    headnote: "Dopunski rad nije volonterstvo; prekid zastarlosti nalogom za kontrolu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 8373/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito drugostepeno rešenje o porezu na zarade ako obrazloženje ne sadrži razloge o datumu početka toka zastarlosti, isteku pet godina i eventualnom prekidu po čl. 114d ZPPP?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o utvrđivanju poreza na zarade za period 2008–2009, jer obrazloženje ne omogućava proveru zastarelosti: nedostaju razlozi o danu početka toka, isteku roka i prekidu radnjama Poreske uprave.",
    reasoning:
      "Bitna povreda proizlazi iz čl. 141 st. 4 ZOP i čl. 199 st. 2 ZOP u vezi sa zahtevom jasnog lanca zastarelosti. Bez toga tužilac ne može znati da li je akt donet u roku.",
    keywords: ["porez na zarade", "zastarelost", "obrazloženje", "čl. 114d ZPPP", "poništenje"],
    related_articles: ["čl. 141. st. 4. Zakon o opštem upravnom postupku", "čl. 114d ZPPP"],
    headnote: "Poništaj zbog nedostatka razloga o toku i prekidu zastarelosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 263/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je pravo na utvrđivanje povraćaja subvencija za doprinose zastarelo tri godine pre izmene Zakona koja produžava rok na pet godina?",
    court_position:
      "Upravni Sud je odbio tužbu privatnog društva i potvrdio obavezu vraćanja subvencija, smatrajući neosnovanim prigovor zastarelosti jer rok od tri godine nije istekao do 1.1.2011, pa se primenjuje petogodišnji režim izmene čl. 114 ZPPP od 53/2010.",
    reasoning:
      "Primena čl. 5 st. 2 ZPPP u vezi sa vremenskim važenjem propisa za radnje u postupku zahteva produženje roka kada stari rok nije istekao u momentu izmene.",
    keywords: ["subvencije", "doprinosi", "zastarelost", "izmena zakona", "ZPPP"],
    related_articles: ["čl. 5. st. 2. ZPPP", "čl. 114. ZPPP"],
    headnote: "Produženje roka zastarelosti ako tri godine nisu istekle do stupanja izmene na snagu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1116/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li je poreski postupak koji traje osam godina i osam meseci u suprotnosti sa pravom na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku, konstatujući odgovornost prvostepenog i drugostepenog poreskog organa za odugovlačenje.",
    reasoning:
      "Zastarelost je bila prekinuta rešenjem 31.12.2007, pa tvrdnja da je sve zastarelo 1.1.2008 nije održiva. Ipak, trajnost celokupnog postupka prelazi razuman okvir, što zahteva ustavnosudsku zaštitu.",
    keywords: ["razuman rok", "poreski postupak", "ustavna žalba", "zastarelost", "Ustav"],
    related_articles: ["čl. 32. st. 1. Ustav RS", "čl. 114d ZPPP"],
    headnote: "Usvojena ustavna žalba zbog prekomerne dužine poreskog postupka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7749/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o prinudnoj naplati poreza ako prigovor zastarelosti nije meritorno ocenjen u skladu sa čl. 114, 114d i 114ž ZPPP?",
    court_position:
      "Upravni Sud je poništio rešenje Ministarstva finansija o prinudnoj naplati poreza na kapitalni dobitak i godišnjeg poreza na dohodak, utvrdivši povredu pravila postupka jer obrazloženje ne sadrži propise i razloge koji upućuju na odluku iz dispozitiva u delu zastarelosti.",
    reasoning:
      "Čl. 141 st. 4 ZOP zahteva vezu između činjenica i pravnih kvalifikacija. Bez toga prinudna naplata na sporna potraživanja nije sudski kontrolabilna.",
    keywords: ["prinudna naplata", "zastarelost", "obrazloženje", "ZPPP", "poništenje"],
    related_articles: ["čl. 141. st. 4. Zakon o opštem upravnom postupku", "čl. 114–114ž ZPPP"],
    headnote: "Poništaj prinudne naplate zbog neadekvatnog razmatranja zastarelosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 20864/2018",
    legal_area: "administrative",
    legal_question:
      "Da li poreski organ mora ispitati da li je sud koji je overio ugovor dužan da obavesti Poresku upravu o prenosu radi pravilnog početka toka zastarelosti?",
    court_position:
      "Upravni Sud je usvojio tužbu i poništio rešenje o porezu na prenos apsolutnih prava, jer organi nisu ispitati ključni navod o obavezi suda da dostavi ugovor, što je bitno za zastarelost kada je saznanje vezano za prijavu trećeg lica.",
    reasoning:
      "Kada je saznanje 19.9.2012 iz zahteva trećeg lica za otpis, zastarelost teče od 1.1.2013. Tužbeni lanac razloga pokazuje da je drugostepeni organ preskočio meritorno pitanje obaveze suda.",
    keywords: ["prenos apsolutnih prava", "sud", "dostava ugovora", "zastarelost", "poništenje"],
    related_articles: ["čl. 114. ZPPP", "čl. 29. st. 7. Zakon o porezima na imovinu"],
    headnote: "Poništaj jer nije ocenjena obaveza suda da obavesti organ o prenosu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 12249/2020",
    legal_area: "administrative",
    legal_question:
      "Da li period mirovanja poreskog duga po posebnom zakonu ulazi u rok relativne zastarelosti naplate doprinosa za PIO?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje zahteva za otpis poreskog duga, potvrdivši primenu čl. 114e ZPPP u vezi sa ranijim stanjem kada se zastarelost na PIO doprinose nije primenjivala do 30.5.2013, te da mirovanje duga produžuje računanje roka zastarelosti.",
    reasoning:
      "Saglasno čl. 114 st. 1 i 3 i čl. 114e ZPPP, javni prihodi čija je zastarelost drugačije uređena posebnim zakonom vode računa o specijalitetu. Tužbeni kalendar ignoriše mirovanje.",
    keywords: ["doprinosi PIO", "mirovanje duga", "zastarelost", "čl. 114e ZPPP", "otpis"],
    related_articles: ["čl. 114e ZPPP", "čl. 114. ZPPP"],
    headnote: "Mirovanje duga i specijalitet za PIO; odbijen zahtev za otpis.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10018/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je obrazloženje o prigovoru zastarelosti poreza na imovinu valjano ako se pogrešno primenjuju pravila o dostavljanju poreskog akta slanjem poštom?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o porezu na imovinu, utvrdivši da su razlozi o zastarelosti nejasni i da je pogrešno primenjen režim dostave iz čl. 36 st. 3–4 ZPPP za preporučenu odnosno običnu pošiljku.",
    reasoning:
      "Bitna povreda postupka utiče na zakonitost jer stranka ne može da zna od kada teče rok zastarelosti bez ispravnog lanca dostave i tačnog citiranja važećeg teksta zakona.",
    keywords: ["porez na imovinu", "dostava", "zastarelost", "čl. 36 ZPPP", "poništenje"],
    related_articles: ["čl. 36. st. 3–4. ZPPP", "čl. 114. ZPPP"],
    headnote: "Poništaj zbog nejasnog prigovora zastarelosti i greške u pravilima dostave.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3633/2015",
    legal_area: "administrative",
    legal_question:
      "Da li uručenje opomene i donošenje rešenja o prinudnoj naplati prekidaju rok zastarelosti naplate poreza na promet na veliko?",
    court_position:
      "Upravni Sud je odbio tužbu za otpis poreskog duga, potvrdivši prekid zastarelosti opomenom uručenom 8.3.2010 i rešenjem o prinudnoj naplati od 17.3.2010 u smislu čl. 114d ZPPP.",
    reasoning:
      "Dug je dospel 2005, zastarelost je počela 1.1.2006, ali prekid vraća računanje. Vreme pre prekida se ne uračunava u pet godina.",
    keywords: ["prinudna naplata", "opomena", "prekid zastarelosti", "porez na promet", "ZPPP"],
    related_articles: ["čl. 114d ZPPP", "čl. 114. ZPPP"],
    headnote: "Opomena i rešenje o prinudnoj naplati prekidaju zastarelost naplate.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 890/2020",
    legal_area: "administrative",
    legal_question:
      "Da li nedostatak upisa vlasništva u katastar utiče na zakonitost utvrđivanja poreza na imovinu za 2017. ako je u prijavi naveden datum sticanja i priložen ugovor?",
    court_position:
      "Upravni Sud je odbio tužbu na porez na imovinu za 2017, smatrajući neosnovanim prigovor zastarelosti jer rešenje 3.12.2018 pada unutar pet godina od 1.1.2018, a nedostatak katastarskog upisa nije merodavan za poresku obavezu utvrđenu iz prijave i ugovora.",
    reasoning:
      "Poreska obaveza prati sticanje prava iz 2006 prema prijavi 2018, ne formalni upis u katastru u ovoj fazi.",
    keywords: ["porez na imovinu", "katastar", "vlasništvo", "zastarelost", "ugovor"],
    related_articles: ["čl. 114. ZPPP", "Zakon o porezima na imovinu"],
    headnote: "Katastarski upis nije uslov zakonitosti utvrđenja poreza iz prijave; nema zastarelosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9827/2016",
    legal_area: "administrative",
    legal_question:
      "Da li su utvrđene dodatne obaveze PDV-a, poreza na dobit i poreza na zarade osnovane na nalazima kontrole o fiktivnim fakturama i da li je zastarelost prekinuta rešenjem iz 2014?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje o utvrđenim obavezama, prihvatajući nalaz kontrole o nedokumentovanim troškovima i fiktivnim nabavkama, te prekid zastarelosti rešenjem 16.10.2014 u smislu čl. 114d ZPPP.",
    reasoning:
      "Organ je naveo konkretne činjenice i dokaze; tužilac nije osporio utvrđeno stanje. Rok za 2007 je prekinut kontrolama 2012–2013, pa apsolutni rok iz čl. 114ž nije nastupio do 2018.",
    keywords: ["PDV", "porez na dobit", "fiktivne fakture", "kontrola", "zastarelost"],
    related_articles: ["čl. 7a Zakon o porezu na dobit preduzeća", "čl. 114d ZPPP", "čl. 114ž ZPPP"],
    headnote: "Potvrđene obaveze posle kontrole; prekid zastarelosti rešenjem 2014.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 8506/2022",
    legal_area: "constitutional",
    legal_question:
      "Da li je Upravni sud povredio Ustav odbijajući tužbu o PDV-u i zastarelosti kada podnosilac tvrdi da apsolutna zastarelost ne prekida tok i da usluge nisu poreski relevantne?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu kao neosnovanu, smatrajući da su navodi o zastarelosti i prirodi usluga već meritorno ocenjeni i da postupak pred Upravnim sudom nije nepravičan.",
    reasoning:
      "Ustavna kontrola ne zamenjuje ponavljanje poreskog spora na istim činjenicama ako redovni sud pravilno primenjuje čl. 114 i srodne odredbe ZPPP.",
    keywords: ["ustavna žalba", "PDV", "zastarelost", "pravično suđenje", "Ustav"],
    related_articles: ["čl. 32. Ustav RS", "čl. 114. ZPPP"],
    headnote: "Odbijena ustavna žalba na presudu Upravnog suda u sporu o PDV-u.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9649/2014",
    legal_area: "administrative",
    legal_question:
      "Da li uručena opomena po čl. 71 ZPPP prekida zastarelost naplate komunalne takse za period kada je dug delimično zastareo?",
    court_position:
      "Upravni Sud je odbio tužbu za potpuni otpis duga za komunalnu taksu, potvrdivši da za dug nastao posle 31.12.2004 zastarelost naplate nije nastupila jer je prekinuta uručenjem opomene u smislu čl. 114d ZPPP uz primenu čl. 71 ZPPP.",
    reasoning:
      "Opomena je procesni akt koji pokreće plaćanje i raspravu o sporu; njena dostava ima dejstvo prekida zastarelosti naplate.",
    keywords: ["komunalna taksa", "opomena", "čl. 71 ZPPP", "prekid zastarelosti", "ZPPP"],
    related_articles: ["čl. 71. ZPPP", "čl. 114d ZPPP"],
    headnote: "Opomena prekida zastarlost naplate komunalne takse; potpuni otpis odbijen.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 137/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je moguće osporiti zastarelost naplate poreza na kapitalni dobitak zahtevom za otpis posle uručene opomene, ako je obaveza konačno utvrđena rešenjem pre isteka roka zastarelosti za utvrđivanje?",
    court_position:
      "Upravni Sud je odbio tužbu na otpis duga po zastarelosti poreza na kapitalni dobitak, smatrajući neosnovanim prigovor jer je obaveza konačno utvrđena rešenjem pre nastupanja zastarelosti prava na utvrđivanje, pa rok zastarelosti naplate teče od 1.1.2017, a relativnu zastarelost organ ne pazi po službenoj dužnosti.",
    reasoning:
      "Zastarelost se mogla istaknuti u postupku utvrđivanja obaveze, što žalilja nije učinila. Opomena 2017 i konačnost rešenja o utvrđivanju 2016 usmeravaju početak toka zastarelosti naplate po čl. 114 st. 3 ZPPP.",
    keywords: ["porez na kapitalni dobitak", "otpis duga", "zastarelost naplate", "konačno rešenje", "opomena"],
    related_articles: ["čl. 114. ZPPP", "čl. 36. st. 3. ZPPP"],
    headnote: "Odbijen otpis; naplata nije zastarela jer je utvrđivanje bilo blagovremeno i konačno pre opomene.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7685/2016",
    legal_area: "administrative",
    legal_question:
      "Od kada nastaje poreska obaveza za porez na prenos apsolutnih prava ako je predmet ugovora bio buduća stvar (stan u izgradnji)?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio utvrđivanje poreza na prenos apsolutnih prava, utvrdivši da obaveza za buduću stvar nastaje danom primopredaje, a ne danom zaključenja ugovora, pa prigovor zastarelosti nije osnovan.",
    reasoning:
      "Primena čl. 29 st. 7 ZPIM u vezi sa čl. 114 i 114ž ZPPP: kada prijava nije blagovremena, početak toka zastarelosti vezuje se za saznanje organa za stvarno izvršen prenos, a ne za datum ugovora o budućoj nepokretnosti.",
    keywords: ["prenos apsolutnih prava", "buduća stvar", "primopredaja", "zastarelost", "ZPIM"],
    related_articles: ["čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP", "čl. 114ž ZPPP"],
    headnote: "Poreska obaveza za buduću stvar od primopredaje; zastarelost teče od saznanja za stvarni prenos.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 12469/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje Ministarstva finansija o odbijanju žalbe na zaključak ako organ nije meritorno ocenio dokaze o uručenju poreskih rešenja i apsolutnoj zastarelosti iz čl. 114ž ZPPP?",
    court_position:
      "Upravni Sud je uvažio tužbu, poništio rešenje Ministarstva finansija i vratio predmet na ponovno odlučivanje, jer tuženi nije adekvatno cenio dokaze o dostavi akata niti pravilno razmotrio apsolutnu zastarelost u vezi sa zahtevom za otpis za više godina.",
    reasoning:
      "Za svaku godinu i za apsolutni rok iz čl. 114ž organ mora dati razumljiv lanac činjenica i pravnih ocena; povezivanje sa čl. 23 st. 1 tačka 2 i čl. 115 st. 4 ZPPP zahteva pojedinačno ocenjivanje.",
    keywords: ["apsolutna zastarelost", "čl. 114ž ZPPP", "dostava", "otpis duga", "poništenje"],
    related_articles: ["čl. 114ž ZPPP", "čl. 23. st. 1. tačka 2. ZPPP", "čl. 115. st. 4. ZPPP"],
    headnote: "Poništaj zbog nepotpunog ocenjivanja dostave i apsolutne zastarelosti po godinama.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3181/2017",
    legal_area: "administrative",
    legal_question:
      "Da li je rok zastarelosti naplate poreskog duga prekinut slanjem opomene i delimičnim uplatama poreskog obveznika?",
    court_position:
      "Upravni Sud je odbio tužbu za otpis duga po zastarelosti, potvrdivši da zastarelost naplate nije nastupila jer su opomena i delimične uplate radnje koje prekidaju tok po čl. 114d ZPPP.",
    reasoning:
      "Polazeći od čl. 114 ZPPP o pet godina od početka toka naplate od prve godine posle dospelosti, organ je pravilno zaključio da su preduzete radnje naplate koje obnavljaju rok.",
    keywords: ["otpis duga", "opomena", "delimične uplate", "prekid zastarelosti", "naplata"],
    related_articles: ["čl. 114. ZPPP", "čl. 114d ZPPP"],
    headnote: "Opomena i uplate kao prekid zastarlosti naplate; tužba odbijena.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 8126/2016",
    legal_area: "administrative",
    legal_question:
      "Da li teče rok zastarelosti za utvrđivanje poreza na prenos apsolutnih prava od dana overe ugovora ako je prijava podneta 23.12.2010. neblagovremeno?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio poresko rešenje, utvrdivši da obaveza nastaje danom saznanja prvostepenog organa za promet iz prijave, pa petogodišnji rok iz čl. 114 ZPPP nije istekao u vreme odluke.",
    reasoning:
      "Čl. 29 st. 1 i 7 ZPIM u vezi sa čl. 36 st. 1 ZPIM i čl. 114 i 114ž ZPPP: neblagovremena prijava pomera moment nastanka obaveze i početak toka zastarelosti.",
    keywords: ["prenos apsolutnih prava", "saznanje organa", "neblagovremena prijava", "zastarelost"],
    related_articles: ["čl. 29. st. 1. i 7. Zakon o porezima na imovinu", "čl. 114. ZPPP", "čl. 114ž ZPPP"],
    headnote: "Zastarelost od saznanja za prenos pri prijavi 23.12.2010.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 11104/2016",
    legal_area: "administrative",
    legal_question:
      "Da li naknadno rušenje objekta i prigovor zastarelosti utiču na zakonitost prvostepenog rešenja o lokalnoj komunalnoj taksi za isticanje firme za 2010. godinu?",
    court_position:
      "Upravni Sud je odbio tužbu, smatrajući da rušenje nije od uticaja i da u vreme prvostepenog rešenja od 11.6.2010. nije nastupila zastarelost prava na utvrđivanje obaveze po čl. 114 st. 1–2 ZPPP.",
    reasoning:
      "Prvostepeno rešenje utvrđuje obavezu, ne naplatu; apsolutna zastarelost iz čl. 114ž ZPPP ne primenjuje se istovetno na sve faze. Organ nije dužan po službenoj dužnosti da pazi relativnu zastarelost utvrđivanja osim u slučaju iz čl. 114ž.",
    keywords: ["komunalna taksa", "isticanje firme", "zastarelost utvrđivanja", "rušenje objekta"],
    related_articles: ["čl. 114. ZPPP", "čl. 114ž ZPPP"],
    headnote: "Potvrda takse za 2010; zastarelost utvrđivanja nije nastupila u roku prvostepenog rešenja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 13833/2015",
    legal_area: "administrative",
    legal_question:
      "Da li apsolutna zastarelost iz čl. 114ž ZPPP isključuje utvrđivanje poreza na prenos kada poreska obaveza nastaje danom saznanja organa posle smrti primaoca izdržavanja i neblagovremene prijave?",
    court_position:
      "Upravni Sud je odbio tužbu na porez na prenos apsolutnih prava, odbacujući prigovor zastarelosti jer rok teče od saznanja organa za prenos iz neblagovremene prijave, a ne od smrti primaoca izdržavanja.",
    reasoning:
      "Argument o apsolutnoj zastarelosti do 2014. ne stoji ako je početak toka zastarelosti za utvrđivanje korektno vezan za fictio saznanja po čl. 29 st. 7 ZPIM i čl. 114 st. 1–2 ZPPP.",
    keywords: ["prenos apsolutnih prava", "doživotno izdržavanje", "saznanje organa", "čl. 114ž ZPPP"],
    related_articles: ["čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP", "čl. 114ž ZPPP"],
    headnote: "Zastarelost od saznanja, ne od smrti primaoca; apsolutna zastarelost nije donela drugačiji ishod.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15755/2015",
    legal_area: "administrative",
    legal_question:
      "Da li kupac nepokretnosti može uspešno osporiti porez na prenos zastarelosti ako poreska prijava nije blagovremena?",
    court_position:
      "Upravni Sud je odbio tužbu kupca i potvrdio utvrđivanje poreza na prenos apsolutnih prava, jer rok zastarelosti teče od dana saznanja poreskog organa za prenos usled neblagovremene prijave, u skladu sa čl. 29 st. 1 i 7 ZPIM i čl. 114 i 114ž ZPPP.",
    reasoning:
      "Prijava primljena 24.2.2015. nije blagovremena po čl. 36 st. 1 ZPIM, pa je saznanje tog dana odredilo nastanak obaveze i početak toka zastarelosti od 1.1.2016.",
    keywords: ["prenos apsolutnih prava", "kupac", "neblagovremena prijava", "zastarelost"],
    related_articles: ["čl. 29. st. 1. i 7. Zakon o porezima na imovinu", "čl. 36. st. 1. Zakon o porezima na imovinu", "čl. 114. ZPPP"],
    headnote: "Isti režim saznanja i zastarelosti za kupca kao i za obveznika pri kasnoj prijavi.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 14912/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je pravo na utvrđivanje poreza na prenos apsolutnih prava zastarelo ako organ nije pravilno utvrdio kada je saznao za promet?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o porezu na prenos apsolutnih prava, jer iz spisa i obrazloženja ne proizlazi pravilan zaključak o saznanju organa za prenos, a od toga zavisi početak toka zastarelosti po čl. 29 st. 7 ZPIM i čl. 114 ZPPP.",
    reasoning:
      "Ako postoje dokazi da je organ saznao ranije (npr. 2008), a rešenje kasnije doneto van roka od pet godina od 1.1. naredne godine, tužba na poništaj je osnovana.",
    keywords: ["prenos apsolutnih prava", "saznanje organa", "zastarelost", "poništenje"],
    related_articles: ["čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP"],
    headnote: "Poništaj jer organ nije pravilno ocenio datum saznanja za prenos.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3323/2013",
    legal_area: "administrative",
    legal_question:
      "Da li je rok zastarelosti naplate komunalne takse za isticanje firme prekinut dostavljanjem opomene u smislu čl. 114d ZPPP?",
    court_position:
      "Upravni Sud je odbio tužbu advokata, potvrdivši da je tuženi pravilno ocenio prekid zastarelosti opomenom i da preostali dug predstavlja neizmirenu obavezu do otpisa.",
    reasoning:
      "Čl. 114 st. 1–2 i čl. 114d ZPPP: prekid radnjom u cilju naplate; tužiteljski račun koji ignoriše opomenu nije osnovan.",
    keywords: ["komunalna taksa", "advokat", "opomena", "prekid zastarelosti"],
    related_articles: ["čl. 114. ZPPP", "čl. 114d ZPPP"],
    headnote: "Potvrda prekida zastarelosti naplate opomenom u predmetu takse za firmu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3570/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je delimično usvojen zahtev za otpis poreza na oružje zakonit ako tužilac osporava prekid zastarelosti uručenjem opomene?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje kojim je delimično utvrđena zastarelost i delimično ostavljen dug, smatrajući da je za deo koji nije zastareo prekid nastao uručenjem opomene po čl. 114d ZPPP.",
    reasoning:
      "Primena istorijskih varijanti čl. 114 i 114b ZPPP za naplatu ne menja zaključak o prekidu kada su radnje blagovremene i dokazane spisom.",
    keywords: ["porez na oružje", "delimična zastarelost", "opomena", "prekid"],
    related_articles: ["čl. 114. ZPPP", "čl. 114b ZPPP", "čl. 114d ZPPP"],
    headnote: "Delimični otpis zastarelog dela; prekid opomenom za aktivni deo duga.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 14653/2022",
    legal_area: "constitutional",
    legal_question:
      "Da li je poreski postupak pred Poreskom upravom koji traje preko šest godina u suprotnosti sa pravom na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, utvrdio povredu prava na suđenje u razumnom roku, dosudio naknadu nematerijalne štete od 600 EUR i naložio hitno okončanje postupka.",
    reasoning:
      "Hronologija zapisnika, rešenja i vraćanja na ponovni postupak pokazuje prekomerno trajanje za koji snosi odgovornost organ.",
    keywords: ["razuman rok", "poreski postupak", "naknada štete", "Ustav", "Poreska uprava"],
    related_articles: ["čl. 32. st. 1. Ustav RS", "čl. 24. Ustav RS"],
    headnote: "Usvojena žalba; preko šest godina poreskog postupka; dosuđena naknada 600 EUR.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 11035/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito drugostepeno rešenje o PDV-u i kamati ako obrazloženje ne sadrži valjane razloge o prigovoru zastarelosti i ne ocenjuje sve žalbene navode?",
    court_position:
      "Upravni Sud je poništio rešenje Poreske uprave o utvrđivanju obaveza po osnovu PDV-a i kamate, jer obrazloženje ne zadovoljava zahteve čl. 141 st. 4 ZOP u delu zastarelosti i neispitivanja svih navoda.",
    reasoning:
      "Čl. 16 Zakona o PDV-a (do 2013) i čl. 114–114d ZPPP moraju biti primenjeni kroz jasnu vezu sa činjenicama o početku obaveze i prekidima roka.",
    keywords: ["PDV", "zastarelost", "obrazloženje", "poništenje", "ZOP"],
    related_articles: ["čl. 16. Zakon o PDV-u", "čl. 114–114d ZPPP", "čl. 141. st. 4. Zakon o opštem upravnom postupku"],
    headnote: "Poništaj PDV rešenja zbog nedostatka razloga o zastarelosti i nepotpunog ocenjivanja žalbe.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 16859/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o porezu na nasleđe i poklon ako je postupak pokrenut zahtevom trećeg lica i organi nisu jasno ocenili zastarelost i poreski obveznik kao podnosilac prijave?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o porezu na nasleđe i poklon, jer nije jasno kako je postupak pokrenut na zahtev trećeg lica bez potpisa poreskog obveznika i jer razlozi o zastarelosti nisu adekvatni uprkos delimično povoljnoj oceni po datumu prijave.",
    reasoning:
      "Čl. 33 i 38 ZPPP zahtevaju jasnu inicijaciju i podnosioce prijave; povezivanje sa kupoprodajom i ranijim porezom na prenos ukazuje na dodatne procesne nedostatke.",
    keywords: ["porez na nasleđe", "poklon", "zastarelost", "poreska prijava", "treće lice"],
    related_articles: ["čl. 33. ZPPP", "čl. 38. ZPPP", "čl. 114. ZPPP"],
    headnote: "Poništaj poreza na nasleđe zbog procesnih nedostataka i nejasnog zastarevanja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3890/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li je merodavna zastarelost utvrđivanja poreza za meru oduzimanja neevidentirane robe u poreskom postupku?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu na presudu Upravnog suda o oduzimanju robe, smatrajući da institut zastarelosti za utvrđivanje poreza ne primenjuje se na meru oduzimanja i da nisu povređena prava na imovinu i pravično suđenje u tom kontekstu.",
    reasoning:
      "Čl. 130 i 133 ZPPP u vezi sa poreskom kontrolom i merama; prigovor zastarelosti postupka koji vodi ka oduzimanju ne usmerava ustavnu zaštitu imovine na isti način kao poresko utvrđivanje.",
    keywords: ["oduzimanje robe", "poreska kontrola", "zastarelost", "ustavna žalba"],
    related_articles: ["čl. 32. Ustav RS", "čl. 130. ZPPP", "čl. 133. ZPPP"],
    headnote: "Odbijena ustavna žalba; zastarelost utvrđivanja poreza nije merodavna za oduzimanje robe.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2307/2019",
    legal_area: "administrative",
    legal_question:
      "Da li su dodatne obaveze PDV-a i poreza na dobit osnovane kada je dobavljaču oduzet PIB i kada su troškovi knjiženi po fiktivnim fakturama?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje o utvrđenim obavezama, prihvatajući nalaz kontrole o fiktivnim fakturama i zabrani priznavanja troškova po čl. 7a Zakona o porezu na dobit i čl. 9 Zakona o računovodstvu.",
    reasoning:
      "Prigovor zastarelosti za 2007. odbijen jer su kontrole 2012–2013 prekinule rok, a tužba na ranije drugostepeno rešenje izazvala zastoj koji se ne uračunava u apsolutni rok iz čl. 114ž ZPPP do 2018.",
    keywords: ["PDV", "porez na dobit", "fiktivne fakture", "zastoj zastarelosti", "kontrola"],
    related_articles: ["čl. 7a Zakon o porezu na dobit preduzeća", "čl. 114d ZPPP", "čl. 114ž ZPPP"],
    headnote: "Potvrđene obaveze; zastoj zastarelosti tokom sudskog spora se ne uračunava u apsolutni rok.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6246/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li izvršni postupak koji traje preko dve godine i proizvoljna primena pravila o zastarelosti povređuju pravo na pravično suđenje i suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, utvrdio povredu prava na suđenje u razumnom roku i pravično suđenje zbog trajanja i proizvoljne primene propisa o zastarelosti, i poništio osporeno rešenje.",
    reasoning:
      "Izvršni postupak mora biti efikasan; mešanje rokova zastarelosti bez jasnog pravnog osnova čini odluku proizvoljnom u smislu čl. 32 Ustava.",
    keywords: ["izvršni postupak", "razuman rok", "pravično suđenje", "zastarelost", "Ustav"],
    related_articles: ["čl. 32. st. 1. Ustav RS"],
    headnote: "Usvojena žalba; poništaj rešenja zbog dužine i proizvoljne zastarelosti u izvršenju.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7437/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito drugostepeno rešenje ako su razlozi u obrazloženju kontradiktorni u odnosu na dispozitiv i prethodni postupak po prigovoru zastarelosti?",
    court_position:
      "Upravni Sud je poništio rešenje Ministarstva finansija kojim je odbijena žalba na zaključak Poreske uprave, utvrdivši kontradiktornost razloga i bitnu povredu pravila postupka.",
    reasoning:
      "Prigovor zastarelosti iz 2009. ocenjen je kao odbačen zbog nejasnoće u odnosu na vanredna pravna sredstva, dok dispozitiv i obrazloženje ne prate istu kvalifikaciju postupka.",
    keywords: ["kontradiktornost", "prigovor zastarelosti", "bitna povreda", "poništenje"],
    related_articles: ["čl. 199. st. 2. Zakon o opštem upravnom postupku"],
    headnote: "Poništaj zbog kontradiktornosti obrazloženja i dispozitiva.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 16146/2015",
    legal_area: "administrative",
    legal_question:
      "Da li tužilac može osporiti delimično utvrđenu zastarelost poreza na oružje tvrdnjom da mu opomene nisu dostavljene ako spis sadrži dokaze o uručenju?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje o delimičnoj zastarelosti naplate poreza na registrovano oružje, prihvatajući dokaze o uručenju opomena 2010. i 2014. kao prekidima po čl. 114d ZPPP.",
    reasoning:
      "Učešće u postupku i dostavnice u spisu opovrgavaju tvrdnju o nedostavljanju; primena čl. 114 st. 1 i 3 i čl. 114d ZPPP je pravilna.",
    keywords: ["porez na oružje", "opomena", "dostava", "prekid zastarelosti"],
    related_articles: ["čl. 114. ZPPP", "čl. 114d ZPPP"],
    headnote: "Potvrđene opomene kao prekid; odbijena tužba na delimičnu zastarelost.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 2656/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je rok zastarelosti naplate poreza na registrovano oružje istekao ako Poreska uprava preduzima radnje prinudne naplate unutar pet godina?",
    court_position:
      "Upravni Sud je odbio tužbu na odbijanje prigovora zastarelosti, potvrdivši da petogodišnji rok naplate nije istekao jer su blagovremene radnje prinudne naplate bile preduzete.",
    reasoning:
      "Čl. 114d st. 1–2 ZPPP: svaka radnja u cilju naplate prekida i obnavlja petogodišnji ciklus od momenta prekida.",
    keywords: ["porez na oružje", "prinudna naplata", "zastarelost naplate", "čl. 114d ZPPP"],
    related_articles: ["čl. 114d ZPPP"],
    headnote: "Radnje prinudne naplate održavaju aktivno potraživanje; prigovor odbijen.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6968/2015",
    legal_area: "administrative",
    legal_question:
      "Da li poreska obaveza na kapitalni dobitak nastaje danom zaključenja ugovora o kupoprodaji iz jula 2007. ako poreska prijava nije podneta u roku od 30 dana?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio utvrđivanje poreza na kapitalni dobitak, smatrajući da je obaveza nastala danom saznanja organa za prenos, odnosno danom podnošenja prijave 30.6.2014, pa zastarelost računata od datuma ugovora nije merodavna.",
    reasoning:
      "Čl. 95 st. 1 tačka 1 Zakona o porezu na dohodak građana u vezi sa čl. 29 st. 7 ZPIM i čl. 114 ZPPP: kasna prijava pomera moment obaveze i tok zastarelosti; apsolutni rok iz čl. 114ž ne bi nastupio pre kraja 2017.",
    keywords: ["kapitalni dobitak", "kupoprodaja", "neblagovremena prijava", "saznanje organa"],
    related_articles: ["čl. 95. st. 1. tačka 1. Zakon o porezu na dohodak građana", "čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP", "čl. 114ž ZPPP"],
    headnote: "Ugovor iz 2007; obaveza od prijave 2014; zastarelost od saznanja.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7076/2015",
    legal_area: "administrative",
    legal_question:
      "Da li ista pravila o nastanku obaveze i zastarelosti važe za porez na kapitalni dobitak po ugovoru o zajedničkom finansiranju iz decembra 2004. kada prijava podneta 2014. godine?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio utvrđivanje poreza, jer obaveza nastaje danom saznanja organa za prenos kada prijava nije blagovremena, bez obzira na datum ugovora iz 2004.",
    reasoning:
      "Isti pravni okvir kao u predmetima sa ugovorom o zajedničkom finansiranju: čl. 95 ZPDG, čl. 29 st. 7 ZPIM, čl. 114 i 114ž ZPPP; apsolutna zastarelost ne bi nastupila pre 31.12.2015.",
    keywords: ["kapitalni dobitak", "zajedničko finansiranje", "saznanje organa", "zastarelost"],
    related_articles: ["čl. 95. st. 1. tačka 1. Zakon o porezu na dohodak građana", "čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP"],
    headnote: "Ugovor 2004; obaveza od prijave 2014; potvrđeno stanovište organa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7667/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je prigovor zastarelosti osnovan za porez na kapitalni dobitak po ugovoru iz aprila 2005. ako je poreska prijava podneta 2014. godine?",
    court_position:
      "Upravni Sud je odbio tužbu, potvrdivši da obaveza nastaje danom saznanja organa u smislu čl. 29 st. 7 ZPIM, pa petogodišnji i desetogodišnji rokovi iz čl. 114 i 114ž ZPPP nisu istekli u odnosu na datum prijave.",
    reasoning:
      "Tužiteljski račun od 2005. kao godine nastanka ignoriše fictio saznanja pri neblagovremenoj prijavi predviđenu posebnim članom Zakona o porezima na imovinu.",
    keywords: ["kapitalni dobitak", "2005", "neblagovremena prijava", "čl. 29 st. 7 ZPIM"],
    related_articles: ["čl. 95. st. 1. tačka 1. Zakon o porezu na dohodak građana", "čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP"],
    headnote: "Isti režim saznanja za ugovor iz 2005; odbijena tužba.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6969/2015",
    legal_area: "administrative",
    legal_question:
      "Da li poreski organ pravilno utvrđuje porez na kapitalni dobitak po ugovoru iz novembra 2004. kada tužilja tvrdi zastarelost računajući od datuma ugovora?",
    court_position:
      "Upravni Sud je odbio tužbu na rešenje o kapitalnom dobitku, potvrdivši da je obaveza nastala danom podnošenja poreske prijave 30.6.2014, a ne danom ugovora iz 2004, te prigovor zastarelosti nije osnovan.",
    reasoning:
      "Primena čl. 72 st. 1 tačka 1 ZPDG kao materijalnopravnog osnova uz procesni lanac čl. 95, čl. 29 st. 7 ZPIM i čl. 114ž ZPPP za apsolutni rok.",
    keywords: ["kapitalni dobitak", "2004", "prijava 2014", "zastarelost"],
    related_articles: ["čl. 72. st. 1. tačka 1. Zakon o porezu na dohodak građana", "čl. 114. ZPPP", "čl. 114ž ZPPP"],
    headnote: "Potvrđeno utvrđivanje; obaveza od datuma kasne prijave.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 20577/2019",
    legal_area: "administrative",
    legal_question:
      "Da li opomena-poziv prekida zastarelost za porez na kapitalni dobitak od prodaje stana u izgradnji i da li je nabavna vrednost pravilno utvrđena uz prebijanje?",
    court_position:
      "Upravni Sud je odbio tužbu na utvrđivanje poreza na kapitalni dobitak od prodaje stanova, potvrdivši da zastarelost nije nastupila, da je nabavna cena pravilno utvrđena bez usklađivanja za buduću stvar i da je prebijanje izvršeno ispravno.",
    reasoning:
      "Tužiteljski argument da samo poreski akt prekida zastarelost suprotstavljen je primeni čl. 114d na radnje u cilju utvrđivanja i naplate; stavovi Vrhovnog suda o opomeni ne menjaju zakonitost osporenog rešenja po oceni Upravnog suda u ovom predmetu.",
    keywords: ["kapitalni dobitak", "stan u izgradnji", "prekid zastarelosti", "opomena", "prebijanje"],
    related_articles: ["čl. 114d ZPPP", "čl. 74. st. 8. Zakon o porezu na dohodak građana"],
    headnote: "Odbijena tužba; opomena/poziv i meritorna utvrđivanja potvrđeni.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 9966/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je rok zastarelosti za utvrđivanje poreza na prenos apsolutnih prava istekao ako je prijava podneta 9.12.2015. a rešenje doneto 11.12.2015?",
    court_position:
      "Upravni Sud je odbio tužbu, utvrdivši da u trenutku donošenja rešenja nije istekao petogodišnji rok jer je obaveza nastala danom saznanja organa iz neblagovremene prijave po čl. 29 st. 7 ZPIM.",
    reasoning:
      "Zastarelost prava na utvrđivanje teče od 1.1. naredne godine od godine u kojoj je trebalo utvrditi porez; u konkretnom slučaju to isključuje tužbeni prigovor za december 2015.",
    keywords: ["prenos apsolutnih prava", "decembar 2015", "zastarelost", "saznanje"],
    related_articles: ["čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP", "čl. 40. st. 2. Zakon o upravnim sporovima"],
    headnote: "Brza rešavanja posle prijave; nema zastarelosti u roku od nekoliko dana.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 10738/2015",
    legal_area: "administrative",
    legal_question:
      "Da li izdavanje opomene 2014. prekida zastarelost naplate poreza na oružje za godine koje nisu bile zastarele u trenutku opomene?",
    court_position:
      "Upravni Sud je odbio tužbu poreskog obveznika i potvrdio delimično utvrđenu zastarelost, smatrajući da je opomenom prekinut tok zastarelosti za deo potraživanja koji još nije bio zastareo.",
    reasoning:
      "Čl. 114d st. 1–2 ZPPP primenjen na hronologiju odgovora na opomenu i podnesak za otpis; organ je pravilno razgraničio godine.",
    keywords: ["porez na oružje", "delimična zastarelost", "opomena", "prekid"],
    related_articles: ["čl. 114d ZPPP"],
    headnote: "Opomena prekida zastarlost za aktivni deo dugovanja po godinama.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 5679/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito utvrđivanje poreza na prihod od kapitala za obavezu nastalu 2009. ako je rešenje doneto 2015. i postoji suprotnost dispozitiva i obrazloženja?",
    court_position:
      "Upravni Sud je uvažio tužbu, poništio rešenje o porezu na prihod od kapitala i vratio predmet na ponovno odlučivanje, utvrdivši da je nastupila zastarelost prava na utvrđivanje (tok od 1.1.2010 do 1.1.2015) i da postoji povreda materijalnog prava i dispozitiva.",
    reasoning:
      "Čl. 5 i 114 ZPPP zahtevaju doslednu primenu rokova; suprotnost stava dispozitiva i obrazloženja čini odluku nezakonitom po čl. 232 st. 1 ZOP.",
    keywords: ["prihod od kapitala", "zastarelost", "poništenje", "dispozitiv", "ZPPP"],
    related_articles: ["čl. 114. ZPPP", "čl. 232. st. 1. Zakon o opštem upravnom postupku"],
    headnote: "Poništaj zbog istekle petogodišnje zastarelosti utvrđivanja i procesnih nedostataka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7368/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je prigovor zastarelosti osnovan za porez na kapitalni dobitak po ugovoru o zajedničkom finansiranju iz 2004. kada tužilja podnese poresku prijavu 2014. godine?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio utvrđivanje poreza na kapitalni dobitak, smatrajući da je obaveza nastala danom saznanja organa za prenos, odnosno danom podnošnja prijave, u smislu čl. 29 st. 7 ZPIM uz čl. 114 i 114ž ZPPP.",
    reasoning:
      "Kada prijava nije blagovremena po čl. 95 st. 1 tačka 1 Zakona o porezu na dohodak građana, rok zastarelosti za utvrđivanje ne teče od dana overe ugovora već od naredne godine od saznanja.",
    keywords: ["kapitalni dobitak", "zajedničko finansiranje", "saznanje organa", "zastarelost"],
    related_articles: ["čl. 95. st. 1. tačka 1. Zakon o porezu na dohodak građana", "čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP", "čl. 114ž ZPPP"],
    headnote: "Obaveza od datuma prijave; odbijen prigovor zastarelosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 13667/2016",
    legal_area: "administrative",
    legal_question:
      "Da li poreski obveznik ima pravo na naknadu troškova upravnog postupka kada je postupak vođen po službenoj dužnosti i okončan u njegovu korist posredstvom advokata?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje kojim je odbijen zahtev za naknadu troškova, utvrdivši da u takvoj konstelaciji troškove snosi organ koji je pokrenuo postupak.",
    reasoning:
      "Kada je stranka prinudno uključena u spor sa organom i postigne uspeh koji je bio cilj angažmana advokata, odbijanje naknade troškova nije proporcionalno cilju Zakona o poreskom postupku i opštem upravnom postupku.",
    keywords: ["naknada troškova", "poreski postupak", "službena dužnost", "advokat"],
    related_articles: ["Zakon o poreskom postupku i poreskoj administraciji", "Zakon o opštem upravnom postupku"],
    headnote: "Poništaj odbijanja naknade troškova kada je postupak po službenoj dužnosti okončan u korist stranke.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 18006/2017",
    legal_area: "administrative",
    legal_question:
      "Da li Crveni krst ispunjava uslove za oslobođenje od poreza na imovinu kao organizacija od javnog interesa?",
    court_position:
      "Upravni Sud je odbio tužbu Crvenog krsta i potvrdio porez na imovinu za 2011, utvrdivši da tužilac nije na spisku direktnih i indirektnih korisnika budžetskih sredstava propisanom za poresko oslobođenje.",
    reasoning:
      "Prigovor zastarelosti odbijen jer je rešenje doneto unutar pet godina od početka toka po čl. 114 ZPPP. Materijalno pravo poreza na imovinu primenjeno u vreme nastanka obaveze po čl. 5 ZPPP.",
    keywords: ["Crveni krst", "porez na imovinu", "oslobođenje", "budžetski korisnik"],
    related_articles: ["čl. 5. ZPPP", "čl. 114. ZPPP", "Zakon o porezima na imovinu"],
    headnote: "Nema poreskog oslobođenja bez ispunjenja zakonskih kriterijuma korisnika budžeta.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7057/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je zastarelost prava na utvrđivanje poreza na kapitalni dobitak nastupila računajući od zaključenja ugovora iz 2004. ako prijava nikada nije blagovremeno podneta?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje, smatrajući neosnovanim argument da se primenjuje samo zakon iz 2004. bez apsolutnog roka iz ZPPP, jer obaveza nastaje danom saznanja organa u smislu čl. 29 st. 7 ZPIM.",
    reasoning:
      "Primena čl. 5 ZPPP ne isključuje procesne institute iz zakona na snazi u vreme radnji; fictio saznanja pomera početak zastarelosti na 2014.",
    keywords: ["kapitalni dobitak", "vremenska primena zakona", "saznanje organa", "ZPPP"],
    related_articles: ["čl. 5. ZPPP", "čl. 29. st. 7. Zakon o porezima na imovinu", "čl. 114. ZPPP"],
    headnote: "Odbijena tužba; primena ZPPP i fictio saznanja za kasnu prijavu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15003/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito ponovno rešenje o porezu na kapitalni dobitak ako organ nije jasno obrazložio koja je radnja Poreske uprave prekinula zastarelost pre isteka roka?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o utvrđivanju poreza na kapitalni dobitak, jer obrazloženje ne povezuje službenu belešku i radnje sa čl. 114d ZPPP na način koji omogućava sudsku kontrolu prekida roka.",
    reasoning:
      "Čl. 5 st. 2 ZPPP za radnje u postupku i čl. 33 st. 2 ZPPP za pokretanje zahtevaju jasan lanac: koja radnja, kada i sa kojim pravnim dejstvom na zastarelost.",
    keywords: ["kapitalni dobitak", "prekid zastarelosti", "obrazloženje", "poništenje"],
    related_articles: ["čl. 114d ZPPP", "čl. 5. st. 2. ZPPP"],
    headnote: "Poništaj jer organ nije dokazao meritorni prekid zastarelosti pre isteka roka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 13893/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je rok zastarelosti naplate poreza na registrovano oružje prekinut dostavljanjem opomena ako tužilac osporava dostavu?",
    court_position:
      "Upravni Sud je odbio tužbu na drugostepeno rešenje koje je delimično usvojilo žalbu zbog ćutanja a odbilo zahtev za otpis, potvrdivši prekid zastarlosti opomenama iz spisa.",
    reasoning:
      "Dostavnice i postupanje po opomenama pokazuju valjan prekid po čl. 114d ZPPP; osporavanje dostave nije podržano dokazima.",
    keywords: ["porez na oružje", "opomena", "dostava", "prekid zastarelosti"],
    related_articles: ["čl. 114d ZPPP"],
    headnote: "Odbijena tužba; opomene kao prekid zastarlosti naplate.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 16568/2018",
    decision_date: "2022-02-08",
    legal_area: "administrative",
    legal_question:
      "Da li je zastarelost prava na utvrđivanje poreza na kapitalni dobitak od prodaje akcija prekinuta kancelarijskom kontrolom i zapisnikom uručenim 2016?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio utvrđivanje poreza na kapitalni dobitak, utvrdivši da je zapisnikom o kancelarijskoj kontroli od 20.12.2016, uručenim 29.12.2016, prekinut rok zastarelosti koji bi inače istekao 1.1.2017.",
    reasoning:
      "Čl. 114d st. 1–2 ZPPP: zapisnik kontrole u cilju utvrđivanja i naplate prekida petogodišnji ciklus i pokreće novi od dana uručenja.",
    keywords: ["kapitalni dobitak", "berza", "kontrola", "prekid zastarelosti"],
    related_articles: ["čl. 114d ZPPP", "čl. 114ž ZPPP"],
    headnote: "Kancelarijska kontrola i zapisnik prekidaju zastarelost pre isteka roka.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 634/2008",
    legal_area: "constitutional",
    legal_question:
      "Da li je Ustavni sud dužan da se izjasni o svim navodima ustavne žalbe u poreskom sporu kada oni ne bi mogli promeniti ishod?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu u delu o suđenju u razumnom roku i odbacio je u delu o pojedinačnim aktima koji ne sadrže ustavnopravne razloge, uz konstataciju o primenljivim odredbama ZPPP o zastarelosti i poreskoj kontroli.",
    reasoning:
      "Ako bi pojedinačno izjašnjavanje o pomoćnim navodima bilo suvišno jer ne bi uticalo na ocenu zakonitosti, nema povrede prava na pravično suđenje u tom segmentu.",
    keywords: ["ustavna žalba", "poreski spor", "razuman rok", "odbacivanje"],
    related_articles: ["čl. 32. Ustav RS", "čl. 114. ZPPP"],
    headnote: "Delimično odbijeno, delimično odbačeno; suvišni navodi i poreski akti.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 7668/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je zastarela obaveza poreza na kapitalni dobitak po ugovoru iz aprila 2005. ako je prijava podneta 2014?",
    court_position:
      "Upravni Sud je odbio tužbu, potvrdivši da obaveza nastaje danom prijave 30.6.2014, a ne danom ugovora 6.4.2005, te da bi apsolutna zastarelost nastupila tek 31.12.2015.",
    reasoning:
      "Serija identičnih pravnih pitanja u vezi sa zajedničkim finansiranjem i kasnom prijavom.",
    keywords: ["kapitalni dobitak", "2005", "prijava 2014", "apsolutna zastarelost"],
    related_articles: ["čl. 114ž ZPPP", "čl. 29. st. 7. Zakon o porezima na imovinu"],
    headnote: "Odbijena tužba; obaveza od saznanja organa.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6966/2015",
    legal_area: "administrative",
    legal_question:
      "Da li je pravilno utvrđen porez na kapitalni dobitak po ugovoru iz novembra 2004. uz prigovor da je zastarelost istekla pet godina od ugovora?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje, jer obaveza nastaje danom prijave 30.6.2014, a ne 3.11.2004, pa tužitelj nije u roku za apsolutnu zastarelost iz čl. 114ž ZPPP.",
    reasoning:
      "Primena čl. 72 st. 1 tačka 1 ZPDG i čl. 29 st. 7 ZPIM isključuje tužbeni kalendar od datuma ugovora.",
    keywords: ["kapitalni dobitak", "zastarelost", "neblagovremena prijava"],
    related_articles: ["čl. 72. st. 1. tačka 1. Zakon o porezu na dohodak građana", "čl. 114. ZPPP"],
    headnote: "Potvrđeno; obaveza od datuma kasne prijave.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15355/2015",
    legal_area: "administrative",
    legal_question:
      "Da li teče rok zastarelosti za porez na prenos po ugovoru o doživotnom izdržavanju od smrti primaoca izdržavanja ako je prijava podneta 2014?",
    court_position:
      "Upravni Sud je odbio tužbu žalilje, potvrdivši da rok teče od saznanja organa iz prijave 11.12.2014, a ne od smrti primaoca, i da porez na imovinu i porez na prenos zahtevaju odvojene prijave.",
    reasoning:
      "Nedostatak dokaza o datumu ranije prijave za porez na imovinu ide na teret stranke; čl. 114 ZPPP primenjen sa početkom 1.1.2015.",
    keywords: ["prenos apsolutnih prava", "doživotno izdržavanje", "saznanje organa", "prijava"],
    related_articles: ["čl. 114. ZPPP", "čl. 34. st. 5. Zakon o porezima na imovinu"],
    headnote: "Zastarelost od saznanja; odvojene prijave za različite poreske oblike.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15088/2015",
    legal_area: "administrative",
    legal_question:
      "Da li žalilac može uspešno osporiti porez na prenos apsolutnih prava pozivajući se na zastarelost računatu od smrti primaoca izdržavanja?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio rešenje, jer je rok zastarelosti počeo 1.1.2015 od saznanja iz prijave 11.12.2014, a učešće punomoćnika u postupku 12.3.2015 osporava tvrdnju o nedostatku postupka.",
    reasoning:
      "Isti pravni okvir kao u predmetu U 15355/2015 u vezi sa različitim poreskim oblicima i dokazima o prijavi.",
    keywords: ["prenos apsolutnih prava", "izdržavanje", "zastarelost", "učešće u postupku"],
    related_articles: ["čl. 114. ZPPP", "Zakon o porezima na imovinu"],
    headnote: "Odbijena tužba; učešće u postupku i saznanje organa odlučuju.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 3134/2016",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito drugostepeno rešenje o prigovoru na zaključak o odbacivanju zahteva za utvrđivanje zastarelosti poreskog duga ako dispozitiv i obrazloženje mešaju odbacivanje i odbijanje?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje, utvrdivši bitnu povredu pravila postupka jer je zahtev odbačen u dispozitivu dok obrazloženje govori o odbijanju, bez jasnih razloga i bez preciznog citiranja merodavnog Službenog glasnika i iznosa duga.",
    reasoning:
      "Čl. 5 st. 1 ZPPP zahteva utvrđivanje poreza po propisima na snazi u vreme nastanka; bez navoda broja SG i datuma ne može se proveriti koji zakon je primenjen.",
    keywords: ["zastarelost", "odbacivanje", "odbijanje", "bitna povreda", "obrazloženje"],
    related_articles: ["čl. 5. st. 1. ZPPP", "čl. 114d ZPPP"],
    headnote: "Poništaj zbog miješanja odbacivanja i odbijanja i nejasnog obrazloženja.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 15447/2017",
    legal_area: "administrative",
    legal_question:
      "Da li su obaveze doprinosa za PIO za period pre uvođenja zastarelosti doprinosa zastarele primenom čl. 23 i 115 ZPPP?",
    court_position:
      "Upravni Sud je odbio tužbu poljoprivrednika na izmenu uverenja i otpis duga za doprinose, potvrdivši da se zastarelost doprinosa može primeniti najranije od 30.5.2013. kada je izmenom zakona uvedena, pa rokovi nisu istekli.",
    reasoning:
      "Obaveze nastale dok zastarelost za PIO nije postojala ne mogu se retroaktivno tretirati kao zastarele pre tog datuma; čl. 161 ZOP za uverenje.",
    keywords: ["doprinosi", "PIO", "zastarelost", "prelazno pravo", "poljoprivrednik"],
    related_articles: ["čl. 23. tačka 2. ZPPP", "čl. 115. ZPPP", "čl. 161. Zakon o opštem upravnom postupku"],
    headnote: "Zastarelost doprinosa teče od uvođenja instituta; odbijena tužba.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 6125/2018",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito rešenje o privremenoj meri založnog prava na imovini direktora radi obezbeđenja poreza preduzeća ako nije dokazano da je direktor mogao da plati porez a nije to učinio?",
    court_position:
      "Upravni Sud je uvažio tužbu i poništio rešenje o uspostavljanju založnog prava na imovini direktora, jer razlozi ne upućuju na ispunjenost uslova iz čl. 66 ZPPP za sekundarnu odgovornost.",
    reasoning:
      "Utvrđivanje poreza čl. 54 st. 2 ZPPP i dospelost čl. 65 moraju prethoditi meri; bez dokaza o mogućnosti plaćanja od strane direktora mer je bitna povreda čl. 199 st. 2 ZOP.",
    keywords: ["privremena mera", "sekundarna obaveza", "direktor", "založno pravo", "ZPPP"],
    related_articles: ["čl. 66. ZPPP", "čl. 199. st. 2. Zakon o opštem upravnom postupku"],
    headnote: "Poništaj mere na imovini direktora; nije dokazana sekundarna obaveza.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud",
    court_level: "administrative",
    case_number: "U 543/2010",
    legal_area: "administrative",
    legal_question:
      "Da li je zakonito drugostepeno rešenje kojim je prvostepeno rešenje o komunalnoj taksi poništeno i predmet vraćen na ponovni postupak zbog nedostatka dokaza?",
    court_position:
      "Upravni Sud je odbio tužbu i potvrdio postupanje drugostepenog organa, smatrajući da u spisu nisu postojali ključni dokazi za donošanje prvostepenog rešenja primenom čl. 54 st. 1 tačka 2 podtačka 2 ZPPP.",
    reasoning:
      "Prenos nadležnosti sa Vrhovnog suda na Upravni sud po Zakonu o uređenju sudova ne menja merila zakonitosti; osporeno rešenje je na zakonu zasnovano.",
    keywords: ["komunalna taksa", "poništenje", "vraćanje na ponovni postupak", "dokazi"],
    related_articles: ["čl. 54. st. 1. ZPPP"],
    headnote: "Potvrda drugostepenog poništaja prvostepenog rešenja zbog nedostatka dokaza.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4052/2019",
    legal_area: "administrative",
    legal_question:
      "Da li je sud pogrešio kada je naknadu za eksproprisano poljoprivredno zemljište odredio prema veštačenju koje odstupa od procene Poreske uprave kao najnižeg iznosa?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio rešenje o visini naknade, smatrajući da je sud pravilno ocenio veštačenje i realnu vrednost uprkos katastarskoj oznaci namene zemljišta.",
    reasoning:
      "Procenu tržišne cene radi organ nadležan za porez na prenos apsolutnih prava, ali procena Poreske uprave je donji limit, a sud može odrediti veštačenje po Zakonu o vanparničnom postupku; neprevod namene ne umanjuje vrednost za eksproprijaciju.",
    keywords: ["eksproprijacija", "naknada", "veštačenje", "Poreska uprava", "tržišna vrednost"],
    related_articles: ["čl. 42. Zakon o eksproprijaciji", "čl. 136. Zakon o vanparničnom postupku"],
    headnote: "Odbijena revizija; naknada može prema veštačenju iznad procene poreske uprave.",
    outcome: "defendant_won",
  },
]
