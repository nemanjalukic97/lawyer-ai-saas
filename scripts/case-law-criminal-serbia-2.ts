// scripts/case-law-criminal-serbia-2.ts
// Serbian criminal / civil-procedure case law tied to imovinskopravni zahtev, ZZL, Ustav (batch 1 of 3).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_SERBIA_2: CaseLawInput[] = [
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud",
    court_level: "appellate",
    case_number: "Apelacioni sud (žalba RS – namirenje iz oduzete koristi; broj nije naveden u izvodu)",
    legal_area: "enforcement",
    legal_question:
      "Da li propust oštećene stambene zajednice da u krivičnom postupku istakne imovinskopravni zahtev sprečava namirenje iz oduzete imovinske koristi u parnici?",
    court_position:
      "Apelacioni sud je odbio žalbu tužene Republike Srbije i potvrdio presudu kojom je obavezana isplata oštećenoj stambenoj zajednici naplaćenog iznosa sa kamatom; pravo na postavljanje imovinskopravnog zahteva nije istovetno obavezi da se on istakne.",
    reasoning:
      "Čl. 93. KZ uređuje odnos dosuđenog imovinskopravnog zahteva i oduzimanja koristi; stavovi 2–4 dopuštaju namirenje iz oduzete koristi i kada je oštećeni upućen na parnicu ili nije postavio zahtev, uz rokove iz st. 2–3.",
    keywords: ["imovinskopravni zahtev", "oduzimanje imovinske koristi", "namirenje", "stambena zajednica"],
    related_articles: ["čl. 93. KZ", "čl. 258. ZKP"],
    headnote: "Potvrđena obaveza namirenja; nije uslov istaknuti zahtev u krivičnom postupku.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 15413/2024",
    legal_area: "civil",
    legal_question:
      "Da li je naknada nematerijalne štete zastarela trogodišnjim rokom ZOO kada je krivični postupak okončan odbijanjem optužbe?",
    court_position:
      "Vrhovni sud je potvrdio zastarelost potraživanja jer se primenjuje opšti trogodišnji rok, s obzirom na okončanje krivičnog postupka odbijanjem optužbe, a tužba je podneta posle proteka tri godine.",
    reasoning:
      "Oštećeni u krivičnom postupku nema materijalnopravno povoljniji položaj od tužioca u parnici; krivični sud primenjuje ZOO u delu zastarelosti kada okrivljeni prigovori po čl. 256. st. 1. ZKP; imovinski zahtev mogao je ranije u postupku.",
    keywords: ["zastarelost", "naknada nematerijalne štete", "krivični postupak", "ZOO"],
    related_articles: ["čl. 256. st. 1. ZKP", "Zakon o obligacionim odnosima"],
    headnote: "Potvrđena zastarelost naknade posle odbijanja optužbe.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 200/2023",
    legal_area: "criminal",
    legal_question:
      "Da li ZZL dopušta osporavanje nezakonitog dokaza i činjeničnog stanja u delu o imovinskopravnom zahtevu?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL u delu o dokazu i imovinskopravnom zahtevu, a ostatak zahteva odbacio kao nedozvoljen jer se odnosi na činjenično stanje.",
    reasoning:
      "Kada podaci pružaju pouzdan osnov, sud može dosuditi zahtev po čl. 258. st. 4. ZKP; osporavanje potpunosti utvrđenja vremena produženog dela nije dozvoljen razlog ZZL.",
    keywords: ["ZZL", "imovinskopravni zahtev", "čl. 258. ZKP", "prevara"],
    related_articles: ["čl. 258. st. 4. ZKP", "čl. 485. st. 4. ZKP"],
    headnote: "Delimično odbijen, delimično odbačen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 10275/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li oštećeni kao tužilac može uspešno osporavati dužinu krivičnog postupka po čl. 32. Ustava ako je imovinski zahtev istaknut tek u kasnoj fazi?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku jer je postupak trajao preko šest godina uz neaktivnost i višestruka ukidanja.",
    reasoning:
      "Izuzetak od opšteg pravila postoji kada učesnik ističe povredu razumnog roka uz prethodno isticanje imovinskopravnog zahteva; merodavni deo postupka obuhvata „građanski“ segment (ESLJP Stojanovski).",
    keywords: ["razuman rok", "čl. 32. Ustav", "oštećeni kao tužilac", "imovinskopravni zahtev"],
    related_articles: ["čl. 32. st. 1. Ustav RS"],
    headnote: "Usvojena ustavna žalba; legitimacija od trenutka zahteva.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1340/2019",
    legal_area: "criminal",
    legal_question:
      "Da li lica koja su dala novac radi nezakonitog posredovanja maju status oštećenog za imovinskopravni zahtev po čl. 50. ZKP?",
    court_position:
      "Vrhovni kasacioni sud je delimično usvojio zahtev tužioca, ukinuo presude i vratio predmet jer su BB, VV i GG pogrešno imali status oštećenih umesto statusa iz čl. 366. st. 2. KZ.",
    reasoning:
      "Oštećeni je lice čije je pravo povređeno krivičnim delom (čl. 2. st. 1. tačka 11. ZKP); davacci novca za posredovanje ne ulaze u čl. 50. st. 1. tačka 1. ZKP; greška u statusu čini bitnu povredu postupka, ne nužno čl. 439. tačka 2. ZKP.",
    keywords: ["trgovina uticajem", "oštećeni", "imovinskopravni zahtev", "ZZL"],
    related_articles: ["čl. 50. ZKP", "čl. 366. st. 2. KZ", "čl. 258. ZKP"],
    headnote: "Ukidanje; pogrešan status oštećenih za imovinski zahtev.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 52/2023",
    legal_area: "criminal",
    legal_question:
      "Da li dosuđeni imovinskopravni zahtev oštećenih može biti zamenjen oduzimanjem celokupne koristi u korist budžeta suprotno čl. 93. KZ?",
    court_position:
      "Vrhovni kasacioni sud je usvojio zahtev javnog tužioca, preinačio odluku Apelacionog suda i obavezao okrivljenog na isplatu štete oštećenima, jer imovinski zahtev ima prednost nad oduzimanjem koristi do visine dosuđenog.",
    reasoning:
      "Čl. 93. st. 1. KZ: oduzimanje koristi sledi samo na iznos koji prelazi dosuđeni imovinskopravni zahtev; drugostepena odluka koja upućuje na parnicu umesto isplate u celini povređuje čl. 93. KZ i čl. 439. tačka 3. ZKP.",
    keywords: ["čl. 93. KZ", "imovinskopravni zahtev", "oduzimanje koristi", "ZZL"],
    related_articles: ["čl. 93. KZ", "čl. 439. tačka 3. ZKP"],
    headnote: "Usvojen ZZL tužioca; prednost dosuđenog zahteva pred budžetom.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6225/2015",
    legal_area: "constitutional",
    legal_question:
      "Da li trajanje krivičnog postupka preko 13 godina za oštećenog kao tužioca predstavlja povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu razumnog roka i dosudio naknadu nematerijalne štete.",
    reasoning:
      "Kriterijum Stojanovski / Atanasova: od trenutka isticanja imovinskopravnog zahteva meri se „građanski“ segment postupka; dužina i pasivnost organa opravdavaju nalaz o povredi.",
    keywords: ["razuman rok", "oštećeni kao tužilac", "nematerijalna šteta"],
    related_articles: ["čl. 32. st. 1. Ustav RS"],
    headnote: "Usvojena ustavna žalba; postupak preko 13 godina.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5667/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li privatni tužilac u postupku za klevetu može isticati razuman rok od podnošenja privatne tužbe sa imovinskim zahtevom?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu razumnog roka za postupak duži od četiri godine i dosudio 300 EUR nematerijalne štete.",
    reasoning:
      "Isti izuzetak za oštećenog/tužioca koji je istakao imovinski zahtev; neefikasnost prvostepenog suda kao presudan faktor.",
    keywords: ["kleveta", "privatni tužilac", "razuman rok"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba privatnog tužioca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 5576/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li šest godina krivičnog postupka sa imovinskim zahtevom predstavlja povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenog kao tužioca, utvrdio povredu razumnog roka i dosudio naknadu, uz konstataciju neefikasnosti prvostepenog suda.",
    reasoning:
      "Legitimacija od isticanja imovinskopravnog zahteva; kumulacija rokova i pasivnost opravdavaju nalaz.",
    keywords: ["razuman rok", "oštećeni kao tužilac"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena ustavna žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2705/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li okončanje krivičnog postupka odbijanjem optužbe zbog zastarelosti utiče na zaštitu oštećenog po čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu razumnog roka i dosudio naknadu nematerijalne štete oštećenoj.",
    reasoning:
      "Čl. 201–206. ZKP uređuju raspravu imovinskog zahteva; oštećeni stiče status stranke u građanskom delu postupka od isticanja zahteva (Ristić, praksa US).",
    keywords: ["zastarelost", "razuman rok", "oštećeni"],
    related_articles: ["čl. 32. Ustav RS", "čl. 201–206. ZKP"],
    headnote: "Usvojena žalba posle obustave zbog zastarelosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3522/2013",
    legal_area: "constitutional",
    legal_question:
      "Od kog trenutka oštećeni stiču aktivnu legitimaciju za žalbu na razuman rok ako su prvo najavili parnicu pa zatim opredelili zahtev u krivičnom postupku?",
    court_position:
      "Ustavni Sud je usvojio žalbu više oštećenih, utvrdio da je merodavan period od 30. maja 2007. (opredeljenje za krivični postupak), a ne od ranijeg podneska o parnici.",
    reasoning:
      "Aktivna legitimacija za čl. 32. postoji tek kada je jasno da se imovinski zahtev ostvaruje u krivičnom postupku; period do pravnosnažnosti drugostepene presude prelazi razuman okvir.",
    keywords: ["razuman rok", "opredeljenje", "imovinski zahtev"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojeno; početak merenja od opredeljenja za krivični postupak.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 408/2008",
    legal_area: "constitutional",
    legal_question:
      "Da li oštećeni bez istaknutog imovinskopravnog zahteva može tražiti zaštitu čl. 32. Ustava za trajanje krivičnog postupka?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu jer se o imovinskim pravima nije odlučivalo — podnosilac je ranije upućen na parnicu bez preciziranja zahteva.",
    reasoning:
      "Pravo na pravično suđenje u krivičnom postupku prvenstveno štiti okrivljenog; oštećeni sa zahtevom može tražiti razuman rok samo u delu postupka o građanskim pravima od isticanja zahteva.",
    keywords: ["razuman rok", "oštećeni", "nedopuštenost"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbijena žalba; nema odluke o imovinskom zahtevu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7786/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li devet godina krivičnog postupka sa imovinskim zahtevom koji se okončava zastarelosti čini povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećene kao tužilje, utvrdio povredu razumnog roka i dosudio naknadu.",
    reasoning:
      "Povezanost sa ESLJP praksom; prvi zahtev 29.12.2004; zastarelost kao posledica neaktivnosti suda.",
    keywords: ["razuman rok", "zastarelost", "neaktivnost suda"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4113/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li nepoštovanje roka koji je viši sud ranije postavio za okončanje krivičnog postupka čini povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenih kao tužilaca, utvrdio povredu razumnog roka i dosudio naknadu.",
    reasoning:
      "Postupak od 9.7.2010. do 9.1.2018. prelazi razuman okvir; merodavno od isticanja imovinskog zahteva.",
    keywords: ["razuman rok", "viši sud", "naknada"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba; prekoračenje roka višeg suda.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 696/2023",
    legal_area: "criminal",
    legal_question:
      "Da li lice iz građanske parnice ima status oštećenog u postupku sprečavanja dokazivanja radi zaštite pravosuđa?",
    court_position:
      "Vrhovni sud je odbio zahtev tužioca, smatrajući da takvo lice nema status oštećenog za imovinskopravni zahtev jer objekt zaštite dela nije individualno imovinsko pravo.",
    reasoning:
      "Čl. 252–253. ZKP ograničavaju podnosioce zahteva na lica ovlašćena u parnici; sprečavanje dokazivanja štiti javni interes pravosuđa.",
    keywords: ["sprečavanje dokazivanja", "oštećeni", "imovinski zahtev"],
    related_articles: ["čl. 252. ZKP", "čl. 253. ZKP"],
    headnote: "Odbijen zahtev; nema statusa oštećenog.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3504/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li obustava krivičnog postupka zbog zastarelosti onemogućava oštećenom zaštitu razumnog roka kada je zahtev istaknut?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenog, utvrdio povredu razumnog roka za postupak duži od šest godina i obustavu zbog zastarelosti.",
    reasoning:
      "Imovinski zahtev vezuje građanski segment postupka za čl. 32; neefikasnost sudova i tužilaštva kao uzrok zastarelosti.",
    keywords: ["razuman rok", "obustava", "zastarelost"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 324/2021",
    legal_area: "criminal",
    legal_question:
      "Da li spajanje više radnji prevare u jedinstvenu radnju produženog dela predstavlja prekoračenje optužbe?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL branioca, utvrdivši da nema prekoračenja optužbe i da je kvalifikacija zakonita.",
    reasoning:
      "Jedinstven umišljaj i povezanost radnji opravdavaju produženo delo; imovinski zahtevi delimično dosuđeni ili upućeni na parnicu u skladu sa čl. 258. ZKP.",
    keywords: ["prevara", "produženo delo", "prekoračenje optužbe", "ZZL"],
    related_articles: ["čl. 61. KZ", "čl. 208. KZ"],
    headnote: "Odbijen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2095/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li obustava zbog zastarelosti u predmetu nasilja u porodici povređuje pravo oštećene na odluku o imovinskom zahtevu?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu razumnog roka i povezao je sa nemogućnošću odluke o imovinskom zahtevu.",
    reasoning:
      "Zahtev istaknut u pretkrivičnoj fazi 2008; aktivna legitimacija; trajanje preko tri godine i jedanaest meseci u odnosu na merodavan period.",
    keywords: ["nasilje u porodici", "razuman rok", "imovinski zahtev"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba oštećene.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6132/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li preko jedanaest godina trajanja krivičnog postupka sa imovinskim zahtevom čini povredu čl. 32. Ustava kada zahtev nije opredeljen?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu razumnog roka zbog značajnih perioda neaktivnosti.",
    reasoning:
      "Prvi zahtev 17.10.2006; merodavno od isticanja zahteva koji nije opozvan; standard Stojanovski / Atanasova.",
    keywords: ["razuman rok", "neaktivnost", "opredeljenje zahteva"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1208/2022",
    legal_area: "criminal",
    legal_question:
      "Da li je nastupila apsolutna zastarelost za produženu poresku utaju kada je bitan element ukupan novčani iznos?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL branioca, potvrdivši računanje zastarelosti od poslednje radnje i odbacujući navode koji se odnose na čl. 440. ZKP.",
    reasoning:
      "JKP koje nije preciziralo zahtev upućeno je na parnicu; osporavanje štete i koristi za treće lice ulazi u nedozvoljenu reviziju činjenica.",
    keywords: ["zastarelost", "produženo delo", "ZZL"],
    related_articles: ["čl. 103–104. KZ", "čl. 485. ZKP"],
    headnote: "Odbijen ZZL po zastarelosti.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3140/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li obustava krivičnog postupka zbog zastarelosti nakon šest godina povređuje pravo oštećenog na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu i dosudio naknadu jer je onemogućena odluka o imovinskom zahtevu.",
    reasoning:
      "Zahtev 20.12.2004; postupak završen obustavom zbog zastarelosti; fokus na građanski segment.",
    keywords: ["razuman rok", "obustava", "oštećeni"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 586/2008",
    legal_area: "constitutional",
    legal_question:
      "Da li oštećeni tužilac bez imovinskog zahteva može podneti ustavnu žalbu na dužinu postupka?",
    court_position:
      "Ustavni Sud je odbacio žalbu jednog podnosioca zbog nedostatka zahteva, a obustavio postupak po drugom zbog smrti podnosioca.",
    reasoning:
      "Legitimacija za čl. 32. u krivičnom delu vezanom za građanska prava od isticanja imovinskopravnog zahteva.",
    keywords: ["ustavna žalba", "oštećeni", "obustava postupka"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbačena / obustavljen postupak.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1783/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li devet godina postupka okončanog zastarelosti povređuje pravo oštećenog kao tužioca sa imovinskim zahtevom?",
    court_position:
      "Ustavni Sud je usvojio žalbu i utvrdio povredu razumnog roka uz dosuđenu naknadu.",
    reasoning:
      "Zahtev 7.5.2001; merodavan period za čl. 32; standardi ESLJP.",
    keywords: ["razuman rok", "oštećeni kao tužilac"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2328/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li deset godina krivičnog postupka sa više ukidanja predstavlja povredu čl. 32. Ustava za oštećenog?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenog i dosudio naknadu nematerijalne štete.",
    reasoning:
      "Prvi zahtev 6.2.2004; dužina i procesni „vrtoglavi“ ukazuju na nerazuman rok.",
    keywords: ["razuman rok", "višestruka ukidanja"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 2/2011",
    legal_area: "criminal",
    legal_question:
      "Da li javni tužilac može izjaviti žalbu na deo presude kojim se oštećeni upućuje na parnicu radi imovinskog zahteva?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL javnog tužioca kao neosnovan, jer tužilac nije ovlašćen da žali na upućivanje na parnicu kada ne zastupa imovinski zahtev.",
    reasoning:
      "Čl. 364. st. 4. ZKP; žalba tužioca može ići na štetu okrivljenog po čl. 367. ZKP, ne na celishodnost upućivanja oštećenog na parnicu kada to osporava tužilac u korist oštećenog.",
    keywords: ["javni tužilac", "žalba", "imovinski zahtev", "ZZL"],
    related_articles: ["čl. 364. ZKP", "čl. 367. ZKP"],
    headnote: "Odbijen ZZL javnog tužioca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1212/2019",
    legal_area: "criminal",
    legal_question:
      "Da li činjenični opis ispunjava obeležja razbojništva u saizvršilaštvu i da li je zakon pravilno primenjen na imovinski zahtev?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL branioca, potvrdivši kvalifikaciju i delimično dosuđenje / upućivanje oštećenih na parnicu.",
    reasoning:
      "Apelacioni sud Kž1 640/17 preinačio sankciju i dosudio delimično imovinski zahtev; ZZL ne nalazi povredu materijalnog prava.",
    keywords: ["razbojništvo", "saizvršilaštvo", "imovinski zahtev", "ZZL"],
    related_articles: ["čl. 206. KZ", "čl. 258. ZKP"],
    headnote: "Odbijen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 497/2025",
    legal_area: "criminal",
    legal_question:
      "Da li je zakonito dosuđen imovinski zahtev preduzeću ako stečajni upravnik izjavljuje da preduzeće ne postavlja zahtev?",
    court_position:
      "Vrhovni Sud je delimično usvojio ZZL i ukinuo deo presude kojim je dosuđen zahtev preduzeću, jer upravnik nije postavio zahtev za naknadu.",
    reasoning:
      "Čl. 91–93. KZ o oduzimanju koristi i odnosu prema dosuđenom zahtevu; dosuđivanje bez volje ovlašćenog lica povređuje čl. 441. st. 3. ZKP.",
    keywords: ["imovinski zahtev", "stečajni upravnik", "ZZL"],
    related_articles: ["čl. 91–93. KZ", "čl. 441. st. 3. ZKP"],
    headnote: "Delimično usvojen ZZL; ukinuto dosuđivanje u korist AP.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 982/2023",
    legal_area: "criminal",
    legal_question:
      "Da li rešenje koje upućuje na parnicu bez jasnih razloga čini bitnu povredu postupka po čl. 438. ZKP?",
    court_position:
      "Vrhovni Sud je usvojio ZZL tužioca i utvrdio bitnu povredu iz čl. 438. st. 2. tačka 2. ZKP u vezi sa čl. 258. st. 4. ZKP u korist okrivljene.",
    reasoning:
      "Rešenje mora sadržati razloge zašto podaci ne pružaju osnov za dosuđenje; protivurečnost između utvrđene visine koristi i upućivanja na parnicu čini odluku nejasnom.",
    keywords: ["bitna povreda postupka", "imovinski zahtev", "ZZL"],
    related_articles: ["čl. 438. st. 2. ZKP", "čl. 258. st. 4. ZKP"],
    headnote: "Usvojen ZZL; vraćanje na ponovno odlučivanje.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6558/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li skoro tri godine žalbenog postupka predstavlja samostalnu povredu razumnog roka?",
    court_position:
      "Ustavni Sud je usvojio žalbu privatnog tužioca i dosudio naknadu jer je žalbeni deo trajao skoro tri godine.",
    reasoning:
      "Legitimacija od privatne tužbe 5.5.2008; ukupno 4 godine 9 meseci, od čega žalba 2 godine 8 meseci.",
    keywords: ["žalbeni postupak", "razuman rok", "privatni tužilac"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2797/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li je iznos od 400 EUR za povredu razumnog roka neadekvatan u odnosu na praksu ESLJP?",
    court_position:
      "Ustavni Sud je usvojio žalbu i povećao naknadu na ukupno 800 EUR usklađujući praksu sa ESLJP.",
    reasoning:
      "Relativnost pojma razumnog roka i adekvatnosti novčane satisfakcije; preispitivanje ranije dosuđenog iznosa.",
    keywords: ["nematerijalna šteta", "adekvatnost", "ESLJP"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba; povećana naknada.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7341/2020",
    legal_area: "constitutional",
    legal_question:
      "Da li sedam godina krivičnog postupka sa imovinskim zahtevom automatski znači povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je odbio žalbu kao neosnovanu, ocenivši da složenost predmeta, zdravlje okrivljenog i štrajk advokata objašnjavaju trajanje.",
    reasoning:
      "Zahtev 7.11.2012; okončanje 5.3.2020; kriterijumi iz prakse US i ESLJP ne ukazuju na povredu u konkretnom slučaju.",
    keywords: ["razuman rok", "složenost predmeta", "odbijena žalba"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbijena ustavna žalba.",
    outcome: "defendant_won",
  },
  // --- batch 2 ---
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4678/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li upravni postupak upisa prava svojine koji traje preko pet godina bez okončanja predstavlja povredu prava na suđenje u razumnom roku?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na suđenje u razumnom roku u upravnom postupku za upis svojine koji po službenoj dužnosti nije okončan ni nakon više od pet godina.",
    reasoning:
      "Za istaknutu povredu razumnog roka u krivičnom delu postupka merodavan je period od isticanja imovinskopravnog zahteva (Stojanovski); u ovom predmetu podnositeljka je istakla zahtev 12.6.2008, krivični postupak okončan 20.2.2018. (devet godina i osam meseci), što samo po sebi može ukazivati na nerazuman rok.",
    keywords: ["razuman rok", "upravni postupak", "upis svojine", "imovinski zahtev"],
    related_articles: ["čl. 32. st. 1. Ustav RS"],
    headnote: "Usvojena žalba; upravni upis i merenje trajanja krivičnog dela postupka.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 458/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li preko sedam godina krivičnog postupka sa imovinskim zahtevom oštećenih kao tužilaca predstavlja povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu razumnog roka jer je postupak trajao preko sedam godina u građanskom delu vezanom za imovinski zahtev.",
    reasoning:
      "Zahtev u optužnici 5.6.2006; standard Stojanovski / Atanasova; merodavno od isticanja imovinskopravnog zahteva.",
    keywords: ["razuman rok", "oštećeni kao tužilac", "imovinski zahtev"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba više podnosilaca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1035/2018",
    legal_area: "criminal",
    legal_question:
      "Da li osuđujuća presuda za zloupotrebu položaja odgovornog lica pravilno dosuđuje imovinski zahtev oštećenom preduzeću i da li je citiranje čl. 91. st. 1. KZ u izreci suštinska greška?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL branioca, potvrdivši kvalifikaciju i dosuđivanje imovinskopravnog zahteva po čl. 258. st. 4. ZKP.",
    reasoning:
      "Poziv na čl. 91. st. 1. KZ u odnosu na dosuđivanje tretiran je kao tehnička greška bez uticaja na zakonitost; spor je krivični postupak protiv fizičkog lica, ne privredni spor između dva subjekta.",
    keywords: ["zloupotreba položaja", "imovinski zahtev", "ZZL", "čl. 258. ZKP"],
    related_articles: ["čl. 234. KZ", "čl. 258. st. 4. ZKP"],
    headnote: "Odbijen ZZL branioca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 112/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li oštećena bez istaknutog imovinskopravnog zahteva može podneti ustavnu žalbu na razuman rok u krivičnom postupku?",
    court_position:
      "Ustavni Sud je odbacio ustavnu žalbu kao nedopuštenu rationae materiae i rationae persone jer se o imovinskom zahtevu nije odlučivalo.",
    reasoning:
      "Povreda razumnog roka u krivičnom postupku za oštećenog meri se od isticanja imovinskopravnog zahteva povezanog sa štetom (Atanasova, Stojanovski, Tomasi).",
    keywords: ["razuman rok", "nedopuštenost", "imovinski zahtev"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbačena ustavna žalba.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2424/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li oštećeni u fazi krivične istrage imaju aktivnu legitimaciju za ustavnu žalbu zbog procesnih prava?",
    court_position:
      "Ustavni Sud je odbacio ustavne žalbe oštećenih jer u istragi nemaju status stranke i nisu aktivno legitimisani za tu vrstu žalbe.",
    reasoning:
      "Stranke u krivičnom postupku su tužilac i okrivljeni; oštećeni stiče procesna prava u kasnijim fazama u skladu sa ZKP.",
    keywords: ["istraga", "oštećeni", "aktivna legitimacija", "ustavna žalba"],
    related_articles: ["čl. 32. Ustav RS", "čl. 221. ZKP"],
    headnote: "Odbačene žalbe iz istrage.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7543/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li krivični postupak koji u odnosu na oštećenog traje preko 11 godina i okončava se zastarelosti zbog neefikasnosti suda čini povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu razumnog roka i dosudio naknadu nematerijalne štete.",
    reasoning:
      "Zahtev 23.4.2002 i 11.12.2002; okončanje obustavom 4.11.2013; trajanje 11 godina i šest meseci; neefikasnost kao ključni uzrok zastarelosti.",
    keywords: ["razuman rok", "zastarelost", "neefikasnost suda"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba oštećenog.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 602/2025",
    legal_area: "criminal",
    legal_question:
      "Da li podnošenje imovinskopravnog zahteva od strane oštećenog u smislu čl. 53. st. 3. ZKP predstavlja blagovremeni predlog za krivično gonjenje?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL branioca kao neosnovan, smatrajući da je predlog za krivično gonjenje podnet blagovremeno zajedno sa imovinskim zahtevom.",
    reasoning:
      "Čl. 53. st. 3. ZKP: krivična prijava ili predlog za imovinski zahtev smatra se i predlogom za gonjenje kada je tako propisano.",
    keywords: ["predlog za gonjenje", "imovinski zahtev", "protivpravno zauzimanje", "ZZL"],
    related_articles: ["čl. 53. st. 3. ZKP"],
    headnote: "Odbijen ZZL branioca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1248/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li oštećeni kao tužilac bez imovinskog zahteva može podneti ustavnu žalbu na dužinu krivičnog postupka?",
    court_position:
      "Ustavni Sud je odbacio ustavnu žalbu jer se o imovinskom zahtevu nije raspravljalo — nedopuštenost rationae materiae i rationae persone.",
    reasoning:
      "Isti test kao za oštećenog: legitimacija za čl. 32. u delu građanskih prava od isticanja imovinskopravnog zahteva.",
    keywords: ["oštećeni kao tužilac", "ustavna žalba", "nedopuštenost"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbačena ustavna žalba.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1722/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li privatna tužilja u krivičnom postupku koji traje četiri godine i završava se zastarelosti može uspešno osporavati razuman rok?",
    court_position:
      "Ustavni Sud je usvojio žalbu privatne tužilje, utvrdio povredu razumnog roka i dosudio naknadu jer zastarelost onemogućava odluku o imovinskom zahtevu.",
    reasoning:
      "Privatna tužilja sa istaknutim imovinskim zahtevom ima isti standard zaštite u građanskom segmentu postupka.",
    keywords: ["privatna tužilja", "razuman rok", "zastarelost"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1810/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li nezavođenje predmeta suda koji dovodi do zastarelosti gonjenja predstavlja povredu razumnog roka za oštećenog kao tužioca?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenog kao tužioca i utvrdio povredu razumnog roka uz dosuđenu naknadu zbog nemarnosti suda.",
    reasoning:
      "Prvi zahtev 25.6.2007. u optužnom predlogu sa najavom preciziranja; postupak preko pet godina; zastarelost kao posledica neefikasnosti.",
    keywords: ["razuman rok", "zastarelost", "oštećeni kao tužilac"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 119/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li privatni tužilac sa imovinskim zahtevom u tužbi može dobiti naknadu zbog razumnog roka kada postupak završi apsolutnom zastarelosti?",
    court_position:
      "Ustavni Sud je usvojio žalbu privatnog tužioca, utvrdio povredu razumnog roka i dosudio naknadu zbog neefikasnosti sudova.",
    reasoning:
      "Imovinski zahtev vezan za tužbu od pokretanja postupka; završetak zastarelosti posledica sporog postupanja.",
    keywords: ["privatni tužilac", "apsolutna zastarelost", "razuman rok"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Kragujevcu",
    court_level: "appellate",
    case_number: "Kž1 737/2019",
    legal_area: "criminal",
    legal_question:
      "Da li je izreka presude protivrečna ako sud nije odlučio o imovinskopravnom zahtevu oštećenog koji ga nije istakao na glavnom pretresu?",
    court_position:
      "Apelacioni sud je delimično usvojio žalbu javnog tužioca i povećao kaznu zatvora za prevaru na dve godine, potvrđujući novčanu kaznu.",
    reasoning:
      "Imovinski zahtev može podneti samo ovlašćeno lice (čl. 253. ZKP); oštećeni koji nije istakao ili je odustao može zahtev ostvariti u parnici (čl. 255. st. 1. ZKP), pa izreka nije protivrečna.",
    keywords: ["prevara", "imovinski zahtev", "žalba javnog tužioca", "kazna"],
    related_articles: ["čl. 253. ZKP", "čl. 255. st. 1. ZKP", "čl. 208. KZ"],
    headnote: "Delimično usvojena žalba tužioca; potvrđena logika oko zahteva.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 10001/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li četiri godine krivičnog postupka privatnog tužioca sa imovinskim zahtevom predstavljaju povredu razumnog roka?",
    court_position:
      "Ustavni Sud je odbio žalbu kao neosnovanu jer dužina nije posledica neažurnosti suda već nedolaska okrivljenog.",
    reasoning:
      "Postupak 3.10.2008–8.11.2012; ponašanje stranaka i objektivne okolnosti isključuju nalaz o neefikasnosti organa.",
    keywords: ["razuman rok", "privatni tužilac", "odbijena žalba"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbijena ustavna žalba.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7364/2015",
    legal_area: "constitutional",
    legal_question:
      "Da li godinu i osam meseci neaktivnosti suda u krivičnom postupku sa imovinskim zahtevom opravdava naknadu za povredu razumnog roka?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećene kao tužilje i dosudio 300 EUR zbog neažurnosti, posebno dugog pasivnog perioda.",
    reasoning:
      "Zahtev 28.11.2011; merodavni kriterijumi Stojanovski / Atanasova; neaktivnost kao presudan faktor.",
    keywords: ["razuman rok", "neaktivnost", "naknada"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4168/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li preko osam godina postupka po privatnoj tužbi sa imovinskim zahtevom predstavlja povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenog kao tužioca i oštećenog, utvrdio povredu razumnog roka zbog neefikasnosti prvostepenog suda.",
    reasoning:
      "Novčani zahtev 24.6.2003; postupak preko osam godina; fokus na ponašanje prvostepenog suda.",
    keywords: ["privatna tužba", "razuman rok", "oštećeni kao tužilac"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 8946/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li skoro četiri godine krivičnog postupka sa imovinskim zahtevom uvek znači povredu razumnog roka?",
    court_position:
      "Ustavni Sud je odbio žalbu oštećene jer trajanje nije posledica neažurnosti suda; deo žalbe o troškovima odbačen.",
    reasoning:
      "Postupak 11.12.2008–5.10.2012; manje od tri godine i deset meseci u odnosu na podnositeljku; kriterijumi složenosti i postupanja organa.",
    keywords: ["razuman rok", "odbijena žalba", "troškovi"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbijena ustavna žalba.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6696/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li pet godina i sedam meseci krivičnog postupka sa veštačenjima i delotvornim postupanjem na kraju predstavlja povredu razumnog roka?",
    court_position:
      "Ustavni Sud je odbio žalbu kao neosnovanu u delu razumnog roka, ocenivši da složenost i postupanje sudova objašnjavaju trajanje.",
    reasoning:
      "Formalno pozivanje na druga ustavna prava bez pravnih osnova ne čini žalbu dopuštenom u tom delu; postupak 12.2008–7.2014.",
    keywords: ["razuman rok", "složenost", "veštačenje", "odbijena žalba"],
    related_articles: ["čl. 32. Ustav RS", "čl. 35. st. 2. Ustav RS"],
    headnote: "Odbijena žalba oštećene.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1959/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li je Viši sud proizvoljno primenio zastarelost odbijajući tužbu za štetu ako je imovinski zahtev u krivičnom postupku prekinuo zastarelost?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje jer je ignorisan prekid zastarelosti od čl. 388. ZOO.",
    reasoning:
      "Krivični postupak primarno o krivičnom delu, ali od trenutka zahteva za štetu primenjuju se i norme ZOO uključujući prekid zastarelosti (Ristić, Atanasova, Stojanovski).",
    keywords: ["zastarelost", "pravično suđenje", "imovinski zahtev", "ZOO"],
    related_articles: ["čl. 32. Ustav RS", "čl. 388. ZOO"],
    headnote: "Usvojena žalba; poništena presuda Višeg suda.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 452/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li četiri godine krivičnog postupka po privatnoj tužbi koji završi apsolutnom zastarelosti zbog neefikasnosti suda i opstrukcije okrivljenog čini povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu privatnih tužilaca i utvrdio povredu razumnog roka uz dosuđenu naknadu.",
    reasoning:
      "Zahtevi u privatnim tužbama od 14.9.2004. i 8.12.2004; kombinacija neefikasnosti suda i ponašanja okrivljenog.",
    keywords: ["privatna tužba", "razuman rok", "opstrukcija"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7708/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li tri godine i sedam meseci krivičnog postupka sa imovinskim zahtevom koji se završi zastarelosti zbog zloupotrebe procesnih prava okrivljenog predstavlja povredu razumnog roka?",
    court_position:
      "Ustavni Sud je usvojio žalbu privatnog tužioca i utvrdio povredu razumnog roka zbog neefikasnosti prvostepenog suda.",
    reasoning:
      "Zahtev 4.3.2009. u pretkrivičnoj fazi; okončanje 1.10.2012; sud nije sprečio zloupotrebu procesnih prava okrivljenog.",
    keywords: ["razuman rok", "privatni tužilac", "zloupotreba prava"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1134/2015",
    legal_area: "criminal",
    legal_question:
      "Da li drugostepeni sud može na žalbu punomoćnika oštećene pobijati prvostepenu presudu u delu kazne na štetu okrivljenog ako je žalba izjavljena samo zbog imovinskog zahteva?",
    court_position:
      "Vrhovni kasacioni sud je usvojio ZZL tužioca, ukinuo presudu Višeg suda i vratio predmet jer je povređena zabrana reformatio in peius iz čl. 453. ZKP.",
    reasoning:
      "Oštećeni po čl. 433. tačka 4. ZKP može žaliti samo zbog troškova i dosuđenog imovinskog zahteva osim kada javni tužilac preuzme gonjenje od oštećenog kao tužioca; ovde to nije slučaj.",
    keywords: ["reformatio in peius", "žalba oštećenog", "ZZL", "čl. 453. ZKP"],
    related_articles: ["čl. 433. st. 4. ZKP", "čl. 453. ZKP"],
    headnote: "Usvojen ZZL; ukidanje drugostepene presude.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 509/2015",
    legal_area: "constitutional",
    legal_question:
      "Da li skoro četiri godine krivičnog postupka sa značajnim periodima neaktivnosti suda čini povredu razumnog roka za oštećenog kao tužioca?",
    court_position:
      "Ustavni Sud je usvojio žalbu, utvrdio povredu razumnog roka i dosudio 400 EUR nematerijalne štete.",
    reasoning:
      "Prvi zahtev 28.1.2011. u optužnom predlogu; merodavni period i neaktivnost prvostepenog suda.",
    keywords: ["razuman rok", "neaktivnost", "oštećeni kao tužilac"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6988/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li skoro osam godina krivičnog postupka sa imovinskim zahtevom oštećenog kao tužioca predstavlja povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu N. P. i utvrdio povredu razumnog roka uz dosuđenu naknadu; deo žalbe protiv oslobađajuće presude odbačen.",
    reasoning:
      "Zahtev 17.8.2006; merodavno od 8.11.2006. (stupanje na snagu Ustava); dužina postupka i okolnosti ukazuju na povredu.",
    keywords: ["razuman rok", "oštećeni kao tužilac", "naknada"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Delimično usvojena žalba (razuman rok).",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2097/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li preko sedam godina krivičnog postupka sa imovinskim zahtevom uvek znači povredu razumnog roka?",
    court_position:
      "Ustavni Sud je odbio žalbu kao neosnovanu jer složenost predmeta i postupanje sudova ne pokazuju neažurnost uprkos dužini.",
    reasoning:
      "Zahtev 6.6.2005; formalni početak 18.7.2005; ukupno preko sedam godina ali opravdano složenošću.",
    keywords: ["razuman rok", "složenost", "odbijena žalba"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbijena ustavna žalba oštećenog.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4949/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li skoro pet godina krivičnog postupka po privatnoj tužbi za klevetu sa imovinskim zahtevom predstavlja povredu razumnog roka?",
    court_position:
      "Ustavni Sud je utvrdio povredu razumnog roka zbog neefikasnog postupanja sudova, odlaganja pretresa i višestrukog vraćanja spisa.",
    reasoning:
      "Zahtev 8.5.2009; okončanje 25.4.2014; trajanje skoro pet godina samo po sebi može ukazivati na nerazuman rok.",
    keywords: ["kleveta", "privatni tužilac", "razuman rok", "više instanci"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 882/2024",
    legal_area: "criminal",
    legal_question:
      "Da li izbegavanje plaćanja ekološke takse za uvezena vozila predstavlja krivično delo poreske utaje po čl. 225. KZ?",
    court_position:
      "Vrhovni sud je odbio ZZL i potvrdio da naknada ima fiskalni karakter i spada u druge propisane dažbine iz čl. 225. KZ.",
    reasoning:
      "Imovinski zahtev nastao iz krivičnog dela može se raspraviti u krivičnom postupku po čl. 252–253. ZKP kada to ne odugovlačuje postupak.",
    keywords: ["poreska utaja", "ekološka taksa", "ZZL"],
    related_articles: ["čl. 225. KZ", "čl. 252. ZKP", "čl. 253. ZKP"],
    headnote: "Odbijen ZZL; potvrđena kvalifikacija.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 13650/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li šest godina krivičnog postupka koji se završi zastarelosti čini povredu razumnog roka za oštećenog kao tužioca?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenog kao tužioca, utvrdio povredu razumnog roka i dosudio 900 EUR nematerijalne štete.",
    reasoning:
      "Imovinski zahtev u optužnici 23.1.2008; zastarelost kao posledica sporog vođenja postupka.",
    keywords: ["razuman rok", "zastarelost", "oštećeni kao tužilac"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Novom Sadu",
    court_level: "appellate",
    case_number: "Kž1 1467/2016",
    legal_area: "criminal",
    legal_question:
      "Da li dvanaest radnji prevare koje prvostepeni sud tretira kao tri odvojena dela treba okvalifikovati kao jedno produženo krivično delo?",
    court_position:
      "Apelacioni sud u Novom Sadu je usvojio žalbu tužioca i preinačio presudu tako da je reč o jednom produženom delu prevare sa jedinstvenom kaznom zatvora.",
    reasoning:
      "Na osnovu čl. 258. st. 4. ZKP i čl. 65. st. 2. KZ dosuđeni su imovinskopravni zahtevi u celini ili delimično uz povraćaj koristi ili upućivanje na parnicu za višak.",
    keywords: ["prevara", "produženo delo", "imovinski zahtev", "kvalifikacija"],
    related_articles: ["čl. 61. KZ", "čl. 208. KZ", "čl. 258. st. 4. ZKP"],
    headnote: "Preinačena presuda; jedinstvena kvalifikacija i kazna.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1127/2015",
    legal_area: "criminal",
    legal_question:
      "Da li dopuna izreke i dosuđivanje imovinskog zahteva u evrima sa kamatom predstavlja prekoračenje optužbe ili građanskopravnu stvar?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL branioca kao neosnovan, potvrdivši krivičnu kvalifikaciju prevare i zakonitost odluke o imovinskom zahtevu.",
    reasoning:
      "Apelacioni sud Kž1 948/15 preinačio je sankciju i imovinski deo u skladu sa čl. 258. ZKP; osporavanje materijalnog prava i činjenica nije osnovano u dozvoljenom obimu ZZL.",
    keywords: ["prevara", "prekoračenje optužbe", "imovinski zahtev", "ZZL"],
    related_articles: ["čl. 208. KZ", "čl. 258. ZKP", "čl. 439. tačka 1. ZKP"],
    headnote: "Odbijen ZZL branioca.",
    outcome: "defendant_won",
  },
  // --- batch 3 ---
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1149/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li oštećeni sa imovinskim zahtevom može dobiti naknadu kada krivični postupak traje preko pet godina i okonča se zastarelosti zbog neefikasnosti prvostepenog suda?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu razumnog roka uz dosuđenu naknadu jer je postupajuci sud bio neefikasan.",
    reasoning:
      "Zahtev istaknut u istrazi; zastarelost kao posledica pasivnosti; merodavno od isticanja imovinskopravnog zahteva (Stojanovski / Atanasova).",
    keywords: ["razuman rok", "zastarelost", "oštećeni", "neefikasnost"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4798/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li pet i po godina krivičnog postupka za nedavanje izdržavanja maloletnoj oštećenoj u „hitnom“ predmetu može predstavljati povredu razumnog roka kada je nastupila zastarelost?",
    court_position:
      "Ustavni Sud je utvrdio povredu prava maloletne oštećene na suđenje u razumnom roku jer hitnost i zaštita deteta zahtevaju brži postupak, a zastarelost je posledica odugovlačenja.",
    reasoning:
      "Isti standard legitimacije uz imovinski zahtev; kriterijumi međunarodnih institucija za zaštitu prava deteta.",
    keywords: ["maloletnik", "razuman rok", "izdržavanje", "hitnost"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba maloletne oštećene.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž rr 38/2021",
    legal_area: "civil",
    legal_question:
      "Da li utvrđena povreda razumnog roka u krivičnom postupku sama po sebi dokazuje imovinsku štetu u parnici za naknadu?",
    court_position:
      "Potvrđena je prvostepena presuda kojom je odbijen tužbeni zahtev za imovinsku štetu jer nije dokazana uzročna veza između trajanja postupka i štete.",
    reasoning:
      "Primena čl. 6. EKLP, čl. 32. Ustava i Zakona o zaštiti prava na suđenje u razumnom roku ne zamenjuje dokazivanje štete po ZOO i ZPP.",
    keywords: ["naknada štete", "uzročna veza", "razuman rok", "parnica"],
    related_articles: ["čl. 11. Zakon o zaštiti prava na suđenje u razumnom roku", "čl. 154. st. 3. ZOO"],
    headnote: "Potvrđen odbijajući sud; nema dokaza štete.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1158/2021",
    legal_area: "civil",
    legal_question:
      "Da li prvostepeni sud mora oceniti da li je izjava oštećenog u krivičnom postupku predstavljala imovinskopravni zahtev koji prekida zastarelost po čl. 388. ZOO?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu koja je odbila naknadu zbog zastarelosti, jer nije utvrđeno da li je izjava od 30.10.2010. bila imovinski zahtev i radnja poverioca u smislu prekida zastarelosti.",
    reasoning:
      "Posle obustave krivičnog postupka rokovi iz čl. 376. ZOO nisu istekli; čl. 377. st. 1–2. ZOO nije primenljiv jer nema uslova za poseban režim pri odustanku tužioca od gonjenja.",
    keywords: ["zastarelost", "imovinski zahtev", "prekid", "ZOO"],
    related_articles: ["čl. 388. ZOO", "čl. 392. st. 3. i st. 6. ZOO", "čl. 376. ZOO"],
    headnote: "Ukidanje; nedostaju nalazi o prekidu zastarelosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1890/2017",
    legal_area: "civil",
    legal_question:
      "Da li isticanje imovinskopravnog zahteva u krivičnom postupku bez preciziranja visine prekida zastarelost naknade štete?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude i usvojio posebnu reviziju, smatrajući da je zahtev prekinuo zastarelost i da predmet treba na ponovno suđenje.",
    reasoning:
      "Tužilac je 21.4.2008. istakao imovinski zahtev bez preciziranja osnova i visine; prekid zastarelosti može nastupiti i bez punog opredeljenja u tom trenutku.",
    keywords: ["revizija", "zastarelost", "imovinski zahtev", "ZOO"],
    related_articles: ["čl. 388. ZOO"],
    headnote: "Usvojena posebna revizija; prekid zastarelosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 946/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je privatna krivična tužba za laku telesnu povredu blagovremena ako je podneta posle isteka roka od tri meseca?",
    court_position:
      "Vrhovni sud je usvojio ZZL, preinačio presude i odbio optužbu jer privatna tužba nije podneta u zakonskom roku.",
    reasoning:
      "Rok iz čl. 65. st. 2. ZKP; neblagovremena tužba dovodi do odbijanja optužbe; oštećeni ostaje ovlašćen za imovinski zahtev u parnici.",
    keywords: ["privatna tužba", "rok", "laka telesna povreda", "ZZL"],
    related_articles: ["čl. 65. st. 2. ZKP", "čl. 122. KZ"],
    headnote: "Usvojen ZZL; odbijena optužba.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2423/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li deset godina krivičnog postupka povodom smrti člana porodice za oštećene roditelje/supružnika predstavlja povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenih i utvrdio povredu razumnog roka uz dosuđenu naknadu nematerijalne štete zbog neefikasnosti suda.",
    reasoning:
      "Postupak 20.2.2007–23.2.2017; imovinski zahtev 24.5.2007; trajanje deset godina samo po sebi ukazuje na nerazuman rok.",
    keywords: ["razuman rok", "oštećeni", "smrt", "naknada"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba roditelja/supružnika.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1929/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li oštećene u postupku koji se završi zastarelosti imaju pravo na zaštitu razumnog roka kada su istakle imovinski zahtev?",
    court_position:
      "Ustavni Sud je usvojio žalbu i utvrdio povredu razumnog roka jer se postupak tiče i njihovih građanskih prava od trenutka zahteva.",
    reasoning:
      "Standard Stojanovski / Atanasova; zastarelost kao posledica sporog postupanja.",
    keywords: ["razuman rok", "oštećene", "zastarelost"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba oštećenih.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1508/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li ponovljeni krivični postupak posle ukidanja predstavlja novu osnovu za žalbu na razuman rok ako su oštećeni već pravnosnažno upućeni na parnicu?",
    court_position:
      "Ustavni Sud je odbacio žalbu jer trajanje ponovljenog postupka ne utiče na ostvarivanje građanskog zahteva koji se već ostvaruje u parnici nakon ranijeg upućivanja.",
    reasoning:
      "Presudom K. 498/03 uz Kž. 100/06 podnosioci su 2005. upućeni na parnicu; ponovno vođenje nakon Kzz 114/06 ne blokira parnicu.",
    keywords: ["razuman rok", "ponovljeni postupak", "upućivanje na parnicu"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbačena žalba; nema prepreke za parnicu.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 310/2021",
    legal_area: "criminal",
    legal_question:
      "Da li je postupak pokrenut za nasilničko ponašanje pravilno okončan osudom za laku telesnu povredu kada je oštećeni blagovremeno podneo krivičnu prijavu i pridružio se gonjenju?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL, smatrajući da su ispunjeni uslovi za osudu za laku telesnu i da je izjava oštećenog o pridruživanju blagovremena u smislu čl. 65. st. 2–3. ZKP.",
    reasoning:
      "Krivična prijava u roku i izjava o pridruživanju sa imovinskim zahtevom ispoljavaju volju za gonjenje i zamenu privatne tužbe kada se utvrdi delo sa privatnom tužbom.",
    keywords: ["privatna tužba", "laka telesna povreda", "čl. 65. ZKP", "ZZL"],
    related_articles: ["čl. 65. st. 2–3. ZKP", "čl. 122. KZ"],
    headnote: "Odbijen ZZL branioca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 888/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je dokazana šteta velikih razmera za teže krivično delo kada okrivljeni osuđen za izazivanje opšte opasnosti podmetanjem požara i tešku krađu?",
    court_position:
      "Apelacioni sud je odbio žalbe tužioca i odbrane i potvrdio presudu na dve godine zatvora jer šteta velikih razmera za teže delo nije dokazana.",
    reasoning:
      "Oštećeni delimično upućeni na parnicu za imovinski zahtev po čl. 258. ZKP; ocena kvalifikacije i kazne u okviru izvedene dokazne građe.",
    keywords: ["opšta opasnost", "teška krađa", "šteta velikih razmera"],
    related_articles: ["čl. 278–288. KZ", "čl. 258. ZKP"],
    headnote: "Potvrđena presuda drugostepenog suda.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 806/2015",
    legal_area: "criminal",
    legal_question:
      "Da li je sud mogao delimično dosuditi imovinski zahtev banke na osnovu podataka o računu okrivljenog i veštačenja?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL u delu o imovinskom zahtevu, a ostatak odbacio kao nedozvoljen jer osporava činjenično stanje.",
    reasoning:
      "Podaci iz krivičnog postupka pružaju pouzdan osnov za delimično presuđenje po čl. 258. st. 4. ZKP; navodi o neotklonjivoj zabludi i protivurečna ocena dokaza nisu dozvoljeni u ZZL.",
    keywords: ["ček bez pokrića", "imovinski zahtev", "ZZL", "veštačenje"],
    related_articles: ["čl. 258. st. 4. ZKP", "čl. 440. ZKP"],
    headnote: "Odbijen / odbačen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 174/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je zakonito dosuditi imovinski zahtev „Pokrajinskom sekretarijatu“ umesto Autonomnoj pokrajini Vojvodini kao pravnom licu?",
    court_position:
      "Vrhovni Sud je delimično usvojio ZZL i preinačio deo presude tako da je oštećena AP Vojvodina upućena na parnicu, jer sekretarijat nema svojstvo pravnog lica.",
    reasoning:
      "Greška u označavanju nosioca potraživanja povređuje čl. 258. st. 4. ZKP u vezi čl. 441. st. 3. ZKP; ostatak ZZL odbijen.",
    keywords: ["imovinski zahtev", "pravno lice", "AP Vojvodina", "ZZL"],
    related_articles: ["čl. 258. st. 4. ZKP", "čl. 441. st. 3. ZKP"],
    headnote: "Delimično usvojen ZZL; ispravka subjekta.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 26/2017",
    legal_area: "criminal",
    legal_question:
      "Da li Apelacioni sud može delimično osloboditi optuženih od prevare zbog nedostatka dokaza o umišljaju i odbiti optužbu za zločinačko udruživanje zbog zastarelosti?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu, oslobodio deo optuženih za prevaru zbog umišljaja, dva okrivljena osudio na blaže kazne, a za zločinačko udruživanje odbio optužbu svima zbog zastarelosti.",
    reasoning:
      "Prvostepeni sud je delimično dosudio ili upućivao imovinske zahteve; kada bi se u celini odlučivalo o svim zahtevima došlo bi do sukoba sa parnicama i dvostrukih izvršnih naslova.",
    keywords: ["organizovani kriminal", "prevara", "zastarelost", "imovinski zahtev"],
    related_articles: ["čl. 258. st. 4. ZKP", "čl. 33. KZ", "čl. 208. KZ"],
    headnote: "Delimično preinačenje; delimično oslobađanje i odbijanje optužbe.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1600/2024",
    legal_area: "criminal",
    legal_question:
      "Da li upućivanje oštećenih na parnicu po čl. 258. st. 4. ZKP bez dosuđivanja imovinskog zahteva može biti povreda čl. 441. st. 3. ZKP?",
    court_position:
      "Vrhovni Sud je odbio ZZL branioca jer izreka ne sadrži dosuđen imovinski zahtev već samo upućivanje na parnicu, pa nema predmeta pobije po čl. 441. st. 3. ZKP.",
    reasoning:
      "Povreda iz čl. 441. st. 3. ZKP odnosi se na odluku o dosuđenom zahtevu ili oduzimanju imovine iz dela; ovde sud nije dosudio zahtev.",
    keywords: ["teška krađa", "imovinski zahtev", "ZZL", "čl. 441. ZKP"],
    related_articles: ["čl. 258. st. 4. ZKP", "čl. 441. st. 3. ZKP", "čl. 204. KZ"],
    headnote: "Odbijen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 17471/2021",
    legal_area: "constitutional",
    legal_question:
      "Da li isključenje imovinskog zahteva maloletne oštećene iz sporazuma o priznanju krivičnog dela i upućivanje na parnicu povređuje pravo deteta?",
    court_position:
      "Ustavni Sud je usvojio žalbu maloletne oštećene i utvrdio povredu prava deteta jer je propust tužilaštva i suda doveo do sekundarne viktimizacije i nije bio u najboljem interesu deteta.",
    reasoning:
      "Čl. 50–56. i 252–258. ZKP uređuju zaštitu maloletnog oštećenog i raspravu imovinskog zahteva u krivičnom postupku kada to ne odugovlačuje postupak.",
    keywords: ["maloletnik", "sporazum o priznanju", "imovinski zahtev", "prava deteta"],
    related_articles: ["čl. 32. Ustav RS", "čl. 64. Ustav RS", "čl. 252–258. ZKP"],
    headnote: "Usvojena žalba; povreda prava deteta.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 719/2024",
    legal_area: "criminal",
    legal_question:
      "Da li je žalba punomoćnika oštećenog dozvoljena u delu o imovinskom zahtevu kada prvostepeni sud nije dosudio zahtev već ga je upućio na parnicu?",
    court_position:
      "Apelacioni sud je delimično usvojio žalbu u delu troškova i obavezao okrivljenog na troškove oštećenog, dok je žalba u delu imovinskog zahteva odbačena kao nedozvoljena.",
    reasoning:
      "Po čl. 433. st. 4. ZKP oštećeni može žaliti samo dosuđeni imovinski zahtev i troškove ako javni tužilac nije preuzeo gonjenje; čl. 441. st. 3. ZKP ne pokriva situaciju bez dosuđenja.",
    keywords: ["žalba oštećenog", "troškovi postupka", "imovinski zahtev", "nedozvoljena žalba"],
    related_articles: ["čl. 433. st. 4. ZKP", "čl. 441. st. 3. ZKP", "čl. 261. ZKP"],
    headnote: "Delimično usvojena žalba (troškovi).",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2260/2018",
    legal_area: "civil",
    legal_question:
      "Da li je tužbeno potraživanje za nematerijalnu štetu od tuče zastarelo ako je oštećeni u krivičnom postupku istakao imovinski zahtev pre podnošenja tužbe?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom su tuženi solidarno obavezani na naknadu nematerijalne štete, odbijajući prigovor zastarelosti jer je zahtev u krivičnom postupku prekinuo zastarelost po čl. 388. ZOO.",
    reasoning:
      "Kod odbijanja optužbe zbog zastarelosti i upućivanja na parnicu po čl. 206. st. 3. ZKP primenjuju se čl. 388–390. ZOO o prekidu i uslovnom prekidu zastarelosti.",
    keywords: ["nematerijalna šteta", "zastarelost", "imovinski zahtev", "tuča"],
    related_articles: ["čl. 388. ZOO", "čl. 390. ZOO", "čl. 206. st. 3. ZKP"],
    headnote: "Potvrđena presuda; nema zastarelosti.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2098/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li je dopuštena ustavna žalba ako podnosilac nije izjavio dozvoljenu reviziju protiv rešenja o odbijanju predloga za ponavljanje postupka?",
    court_position:
      "Ustavni Sud je odbacio ustavnu žalbu jer nisu iscrpljena pravna sredstva — nedostaje revizija Vrhovnom sudu koja je u tom slučaju zakonom predviđena.",
    reasoning:
      "Uslov dopuštenosti ustavne žalbe zahteva iscrpljenost redovnih pravnih lekova u skladu sa zakonom.",
    keywords: ["iscrpljenost pravnih sredstava", "revizija", "ponavljanje postupka"],
    related_articles: ["čl. 91. Ustav RS"],
    headnote: "Odbačena ustavna žalba.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 268/2019",
    legal_area: "criminal",
    legal_question:
      "Da li radnje okrivljenog predstavljaju krivično delo prevare i zloupotrebe poverenja u smislu pobijanih presuda?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL branioca u delu materijalnog prava, a ostatak zahteva branioca i zahtev okrivljenog odbacio kao nedozvoljen.",
    reasoning:
      "Prvostepena presuda dosuđuje imovinske zahteve i izriče uslovnu osudu; osporavanje činjenica nije dozvoljeno u ZZL u tom obimu.",
    keywords: ["prevara", "zloupotreba poverenja", "ZZL", "uslovna osuda"],
    related_articles: ["čl. 208. KZ", "čl. 216. KZ"],
    headnote: "Odbijen / odbačen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Kragujevcu",
    court_level: "appellate",
    case_number: "Kž1 71/2021",
    legal_area: "criminal",
    legal_question:
      "Da li je dopuštena žalba punomoćnika oštećenog u širem obimu kada je oštećeni upućen na parnicu, a da li postoji bitna povreda ako je oštećeni kao privilegovani svedok saslusan bez upozorenja na pravo da ne svedoči?",
    court_position:
      "Apelacioni sud je odbacio žalbu oštećenog šireg obuma kao nedozvoljenu po čl. 433. st. 4. ZKP, ali je po službenoj dužnosti ukinuo prvostepenu osuđujuću presudu za tešku telesnu povredu jer je presuda zasnivala na nezakonitom iskazu oštećenog koji kao privilegovani svedok nije upozoren na pravo da ne svedoči.",
    reasoning:
      "Kada imovinski zahtev nije dosuđen i javni tužilac nije preuzeo gonjenje od oštećenog kao tužioca, žalba oštećenog je ograničena na troškove i dosuđeni zahtev; ipak, bitna povreda iz čl. 455. ZKP može se ispraviti po službenoj dužnosti.",
    keywords: ["bitna povreda postupka", "privilegovani svedok", "žalba oštećenog"],
    related_articles: ["čl. 433. st. 4. ZKP", "čl. 455. ZKP"],
    headnote: "Ukidanje prvostepene presude (službena dužnost).",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 566/2021",
    legal_area: "criminal",
    legal_question:
      "Da li postojanje paralelnog postupka protiv maloletnika isključuje solidarnu obavezu okrivljenih prema oštećenoj za imovinski zahtev?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL branioca, smatrajući zakonitim obavezivanje okrivljenih na solidarnu isplatu oštećenoj u skladu sa čl. 252–253. ZKP.",
    reasoning:
      "Navodi o „jedinstvenom dužničkom odnosu“ sa maloletnikom ne isključuju primenu pravila o solidarnoj odgovornosti u krivičnom postupku.",
    keywords: ["solidarna odgovornost", "imovinski zahtev", "ZZL"],
    related_articles: ["čl. 252–253. ZKP"],
    headnote: "Odbijen ZZL.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6277/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li neažurnost suda i tužilaštva koja dovodi do apsolutne zastarelosti krivičnog gonjenja čini povredu razumnog roka oštećenih kao tužilaca?",
    court_position:
      "Ustavni Sud je usvojio žalbu i dosudio naknadu nematerijalne štete jer je postupak doveo do zastarelosti usled neefikasnosti organa.",
    reasoning:
      "Imovinski zahtev 28.8.2007; merodavno od tog datuma; postupak K. 81/10 u Požegi.",
    keywords: ["razuman rok", "zastarelost", "oštećeni kao tužilac"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Kragujevcu",
    court_level: "appellate",
    case_number: "Kž1 703/2018",
    legal_area: "criminal",
    legal_question:
      "Da li je žalba punomoćnika oštećenih dozvoljena u delu kazne i materijalnog prava kada su oštećeni upućeni na parnicu a gonjenje vodi javni tužilac?",
    court_position:
      "Apelacioni sud je potvrdio osuđujuću presudu za pokušaj ubistva, tešku telesnu povredu i držanje oružja, odbijajući nužnu odbranu; žalba oštećenih šireg obima odbačena kao nedozvoljena.",
    reasoning:
      "Bez dosuđenog imovinskog zahteva i bez preuzimanja gonjenja po čl. 62. ZKP, oštećeni ne mogu žaliti iz svih osnova po čl. 433. st. 4. ZKP.",
    keywords: ["pokušaj ubistva", "žalba oštećenog", "nedozvoljena žalba"],
    related_articles: ["čl. 433. st. 4. ZKP"],
    headnote: "Potvrđena presuda; odbačena šira žalba oštećenih.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1118/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li trajanje od tri i po meseca od imovinskog zahteva do obustave zbog zastarelosti predstavlja povredu razumnog roka?",
    court_position:
      "Ustavni Sud je odbacio žalbu privrednog društva kao privatnog tužioca jer period od oko tri i po meseca nije nerazuman.",
    reasoning:
      "Merodavno od 23.12.2008. do 16.4.2009; kratko trajanje isključuje nalaz o povredi.",
    keywords: ["razuman rok", "privatni tužilac", "odbijena žalba"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Odbačena ustavna žalba.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 871/2021",
    legal_area: "criminal",
    legal_question:
      "Da li postoji optužba ovlašćenog tužioca za laku telesnu povredu kada je postupak pokrenut optužnim predlogom javnog tužioca a oštećena naknadno pridružuje gonjenje?",
    court_position:
      "Vrhovni kasacioni sud je odbio ZZL, smatrajući da je izmenom kvalifikacije ispravno utvrđeno da postoji optužba ovlašćenog tužioca i da su izjave oštećene o pridruživanju blagovremene.",
    reasoning:
      "Čl. 65. st. 2–3. ZKP: krivična prijava u roku zamena je za privatnu tužbu ako se utvrdi delo sa privatnom tužbom; oštećena je imala status potencijalnog privatnog tužioca.",
    keywords: ["privatna tužba", "pridruživanje", "laka telesna povreda", "ZZL"],
    related_articles: ["čl. 65. st. 2–3. ZKP"],
    headnote: "Odbijen ZZL branioca.",
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4729/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li šest i po godina odlučivanja o imovinskom zahtevu u krivičnom postupku sa suprotnim veštačenjima i višestrukim odlaganjima predstavlja povredu čl. 32. Ustava?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećene kao tužilje D.M. i utvrdio povredu razumnog roka u delu imovinskog zahteva.",
    reasoning:
      "Kontradiktorna veštačenja i osam odlaganja pretresa posle dostave nalaza 2009. pokazuju neefikasnost u odlučivanju o građanskom zahtevu.",
    keywords: ["razuman rok", "veštačenje", "imovinski zahtev", "oštećena kao tužilja"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4350/2010",
    legal_area: "civil",
    legal_question:
      "Da li je sud pogrešno primenio trogodišnji opšti rok zastarelosti umesto posebnog dužeg roka za štetu od krivičnog dela prevare?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu koja je odbila naknadu kao zastarelu, jer nije pravilno primenjen poseban režim zastarelosti za štetu od krivičnog dela.",
    reasoning:
      "Krivični postupak za prevare sa imovinskim zahtevom i obustava 1998. zbog smrti okrivljenog utiču na početak i tok zastarelosti drugačije od opšteg roka.",
    keywords: ["zastarelost", "šteta od krivičnog dela", "prevara", "ZOO"],
    related_articles: ["Zakon o obligacionim odnosima"],
    headnote: "Ukidanje; pogrešan rok zastarelosti.",
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 557/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li preko osam godina krivičnog postupka sa imovinskim zahtevom za dela krađe/teške krađe predstavlja povredu razumnog roka uprkos složenosti predmeta?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenog i utvrdio povredu razumnog roka uz dosuđenu naknadu zbog neefikasnosti postupajućih sudova.",
    reasoning:
      "Zahtev 2.11.2004; okončanje 19.6.2013; trajanje osam godina i sedam meseci; složenost delimično objašnjava dokazni postupak ali ne i sve periode zastoja.",
    keywords: ["razuman rok", "teška krađa", "oštećeni"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Kragujevcu",
    court_level: "appellate",
    case_number: "Kž1 342/2023",
    legal_area: "criminal",
    legal_question:
      "Da li poslodavac može preneti krivičnu odgovornost za bezbednost na radu na drugo lice umesto na direktora?",
    court_position:
      "Apelacioni sud u Kragujevcu je preinačio oslobađajuću presudu i oglašio direktora krivim za teško delo protiv opšte sigurnosti i falsifikovanje službene isprave, smatrajući da odgovornost za bezbednost ne može biti prenesena.",
    reasoning:
      "Oštećeni upućen na parnicu jer visina imovinskog zahteva nije opredeljena; troškovi i paušal po čl. 262–264. ZKP.",
    keywords: ["bezbednost na radu", "opšta sigurnost", "direktor", "falsifikat"],
    related_articles: ["čl. 288. KZ", "čl. 258. st. 4. ZKP"],
    headnote: "Preinačena presuda u korist tužioca.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Kragujevcu",
    court_level: "appellate",
    case_number: "Kž1 133/2021",
    legal_area: "criminal",
    legal_question:
      "Da li Apelacioni sud može potvrditi oslobađanje od prevare i delimično uvažiti žalbu oštećenog samo u delu troškova kada imovinski zahtev nije dosuđen?",
    court_position:
      "Apelacioni sud je potvrdio oslobađanje od prevare zbog nedokazane prevare namere, ocenivši spor kao građanskopravan; žalba punomoćnika oštećenog u delu troškova delimično usvojena, u delu imovinskog zahteva odbačena kao nedozvoljena.",
    reasoning:
      "Ista primena čl. 433. st. 4. ZKP kada nema dosuđenog imovinskog zahteva i nema preuzimanja gonjenja od oštećenog.",
    keywords: ["prevara", "oslobađanje", "troškovi", "žalba oštećenog"],
    related_articles: ["čl. 433. st. 4. ZKP", "čl. 456–458. ZKP"],
    headnote: "Potvrđeno oslobađanje; delimično troškovi.",
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUz 62/2018",
    legal_area: "constitutional",
    legal_question:
      "Da li su odredbe čl. 51. ZKP kojima se ograničava supsidijarna tužba pre potvrđivanja optužnice suprotne Ustavu?",
    court_position:
      "Ustavni Sud je odbacio inicijative za ocenu ustavnosti čl. 51. ZKP, smatrajući da zakonodavac može urediti položaj oštećenog u skladu sa konceptom tužilačke istrage.",
    reasoning:
      "Oštećeni i dalje ima značajna procesna prava uključujući žalbu na dosuđeni imovinski zahtev i zaštitu kroz čl. 252–258. ZKP; nema uskraćenja sudske zaštite.",
    keywords: ["ustavnost", "čl. 51. ZKP", "supsidijarna tužba", "oštećeni"],
    related_articles: ["čl. 51. ZKP", "čl. 24. Ustav RS"],
    headnote: "Odbačene inicijative; čl. 51. ZKP nije neustavan.",
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6405/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li skoro pet godina krivičnog postupka za nedavanje izdržavanja koji se završi zastarelosti predstavlja povredu razumnog roka oštećenog sa imovinskim zahtevom?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenog i utvrdio povredu razumnog roka uz dosuđenu naknadu jer zastarelost onemogućava odluku o imovinskom zahtevu.",
    reasoning:
      "Zahtev 25.2.2009; pokretanje 9.4.2009; okončanje 7.3.2014; delo po prirodi zahteva dokazni postupak ali trajanje i dalje prelazi razuman okvir.",
    keywords: ["razuman rok", "nedavanje izdržavanja", "zastarelost"],
    related_articles: ["čl. 32. Ustav RS", "čl. 195. KZ"],
    headnote: "Usvojena žalba oštećenog.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 310/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li šest godina krivičnog postupka sa više krivičnih dela za oštećene kao tužioce sa imovinskim zahtevom predstavlja povredu čl. 32. Ustava uprkos složenosti?",
    court_position:
      "Ustavni Sud je usvojio žalbu oštećenih kao tužilaca i utvrdio povredu razumnog roka uz dosuđenu naknadu zbog neopravdane neaktivnosti i neefikasnosti sudova.",
    reasoning:
      "Optužnica 16.2.2007 i optužni predlog 8.10.2009; okončanje 2013; složenija dela opravdavaju dokazni postupak ali ne i sve periode zastoja.",
    keywords: ["razuman rok", "oštećeni kao tužilac", "više krivičnih dela"],
    related_articles: ["čl. 32. Ustav RS"],
    headnote: "Usvojena žalba oštećenih kao tužilaca.",
    outcome: "plaintiff_won",
  },
]
