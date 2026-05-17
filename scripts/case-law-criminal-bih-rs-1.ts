// scripts/case-law-criminal-bih-rs-1.ts
// BiH RS (Vrhovni sud RS) criminal case law — crimes against humanity and international law.
// Batch 1 of 3 (PDFs 1–19, alphabetical by filename).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_1: CaseLawInput[] = [{
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 017578 17 Kvlz",
      decision_date: "2018-03-02",
      legal_area: "criminal",
      legal_question:
        "Da li su osnovani zahtjevi za zaštitu zakonitosti osuđenih za ratni zločin protiv civilnog stanovništva (čl. 142. KZ SFRJ) zbog navoda o povredi prava na odbranu, primjeni postupka prema maloljetnicima i zastarelosti gonjenja?",
      court_position:
        "Vrhovni sud RS je odbio sve zahtjeve za zaštitu zakonitosti kao neosnovane; pravosnažna presuda Okružnog suda u Banjoj Luci ostala je na snazi.",
      reasoning:
        "Viće je ocijenilo da neprimjena poglavlja ZKP o maloljetnicima nije povredila pravo na odbranu jer se presuda ne zasniva na iskazima osuđenih iz istrage. Odbijeni su prigovori o korištenju iskaza svjedoka iz istrage jer su ključni svjedoci saslušani na glavnom pretresu (čl. 288. ZKP RS). Prigovori činjeničnog karaktera (ratni sukob, saizvršilaštvo, in dubio pro reo) nisu predmet ZZL jer povreda krivičnog zakona podrazumijeva ispravno utvrđene činjenice. Za ratni zločin protiv civilnog stanovništva gonjenje ne zastarijeva (čl. 100. KZ SFRJ).",
      keywords: ["zaštita zakonitosti", "ratni zločin", "čl. 142. KZ", "pravo na odbranu", "maloljetnici", "ne bis in idem"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 22. KZ SFRJ", "čl. 350. ZKOP RS", "čl. 311. st. 1. tač. g) ZKOP RS", "čl. 100. KZ SFRJ"],
      headnote: "Odbijen ZZL; činjenični prigovori nisu osnov za vandredni lijek.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 018841 17 Kvlz",
      decision_date: "2017-12-26",
      legal_area: "criminal",
      legal_question:
        "Da li je povrijeđeno pravo na odbranu i krivični zakon odbijanjem medicinskog vještačenja i pogrešnom ocjenom dokaza u predmetu ratnog zločina protiv civilnog stanovništva?",
      court_position:
        "Vrhovni sud RS je odbio zahtjev za zaštitu zakonitosti branioca osuđenog kao neosnovan.",
      reasoning:
        "Sud je zaključio da je pravilno primijenjen čl. 278. st. 2. ZKP RS pri odbijanju dokaznog prijedloga za ponovljeno medicinsko vještačenje, uz obrazložene razloge u presudi. Prigovori o in dubio pro reo i kontradiktornim iskazima svjedoka imaju činjenični karakter i ne mogu se ispitivati ZZL-om. Povreda krivičnog zakona ne može se graditi na reviziji činjeničnog stanja.",
      keywords: ["zaštita zakonitosti", "ratni zločin", "medicinsko vještačenje", "in dubio pro reo", "dokazni prijedlog"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 278. st. 2. ZKOP RS", "čl. 350. ZKOP RS", "čl. 295. ZKOP RS"],
      headnote: "Odbijen ZZL; odbijanje dokaza i činjenični prigovori nisu osnovani.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 000783 09 Kz",
      decision_date: "2009-01-01",
      legal_area: "criminal",
      legal_question:
        "Kako je Vrhovni sud RS odlučio u žalbenom postupku u predmetu ratnog zločina protiv civilnog stanovništva broj 11 0 K 000783 09 Kž?",
      court_position:
        "Sadržaj odluke nije automatski izvučen jer je PDF isključivo skeniran (bez tekstualnog sloja); predmet pripada kategoriji krivičnih djela protiv čovječnosti i međunarodnog prava pred VS RS.",
      reasoning:
        "Prilog je skenirana odluka Vrhovnog suda RS sa brojem predmeta 11 0 K 000783 09 Kž. Za puno obrazloženje, ključne riječi i citate članova KZ RS potrebno je OCR ili ručno čitanje skena. Metapodaci: žalbeni postupak (Kž), godina 2009., krivična oblast ratnih zločina.",
      keywords: ["ratni zločin", "žalba", "skenirani PDF", "Vrhovni sud RS"],
      related_articles: ["čl. 142. KZ SFRJ"],
      headnote: "Skenirani izvor — potrebna ručna/OCR ekstrakcija.",
      outcome: "procedural",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 000783 09 Kz 2",
      decision_date: "2009-01-01",
      legal_area: "criminal",
      legal_question:
        "Kako je Vrhovni sud RS odlučio u drugoj odluci u predmetu broj 11 0 K 000783 09 Kž?",
      court_position:
        "Sadržaj odluke nije automatski izvučen jer je PDF isključivo skeniran; predmet se odnosi na isti registarski predmet kao 11 0 K 000783 09 Kž.",
      reasoning:
        "Drugi prilog u istom predmetnom nizu (naziv datoteke „09 Kz 2“). Bez OCR-a nije moguće utvrditi izreku ni pravne argumente. Za ingest sa punim sadržajem potrebno je pročitati sken.",
      keywords: ["ratni zločin", "žalba", "skenirani PDF"],
      related_articles: ["čl. 142. KZ SFRJ"],
      headnote: "Skenirani izvor — dopuna predmeta 000783/09.",
      outcome: "procedural",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 000859 09 Kz",
      decision_date: "2009-01-01",
      legal_area: "criminal",
      legal_question:
        "Kako je Vrhovni sud RS odlučio u žalbenom postupku broj 11 0 K 000859 09 Kž u predmetu ratnih zločina?",
      court_position:
        "PDF je isključivo skeniran; automatska ekstrakcija teksta nije uspjela. Predmet je iz kategorije krivičnih djela protiv čovječnosti i međunarodnog prava.",
      reasoning:
        "Identifikator predmeta i vrsta postupka (Kž) proizlaze iz zaglavlja datoteke. Za punu pravnu analizu potrebno je OCR skenirane presude ili rješenja VS RS iz 2009. godine.",
      keywords: ["ratni zločin", "žalba", "skenirani PDF"],
      related_articles: ["čl. 142. KZ SFRJ"],
      headnote: "Skenirani izvor — čeka OCR.",
      outcome: "procedural",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 001749 09 Kz",
      decision_date: "2009-01-01",
      legal_area: "criminal",
      legal_question:
        "Kako je Vrhovni sud RS odlučio u žalbenom postupku broj 11 0 K 001749 09 Kž?",
      court_position:
        "PDF je isključivo skeniran; sadržaj odluke nije dostupan za automatsko parsiranje.",
      reasoning:
        "Predmet 11 0 K 001749 09 Kž spada u korpus VS RS po ratnim zločinima. Bez tekstualnog sloja u PDF-u nije izvučena izreka ni obrazloženje; preporučuje se dopuna zapisa nakon OCR-a.",
      keywords: ["ratni zločin", "žalba", "skenirani PDF"],
      related_articles: ["čl. 142. KZ SFRJ"],
      headnote: "Skenirani izvor — čeka OCR.",
      outcome: "procedural",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 002487 10 Kž 6",
      decision_date: "2010-11-08",
      legal_area: "criminal",
      legal_question:
        "Da li je osnovana žalba protiv rješenja o produljenju pritvora nakon izricanja kazne zatvora za ratni zločin protiv civilnog stanovništva?",
      court_position:
        "Vrhovni sud RS je odbio žalbe branioca i optuženog kao neosnovane i potvrdio produljenje pritvora po čl. 197. st. 1. tač. g) ZKP.",
      reasoning:
        "Sud je prihvatio razloge prvostepenog suda o visokom stepenu društvene opasnosti, smrtnim posljedicama (tri žrtve) i vanrednim okolnostima izvršenja ratnog zločina, zbog čega puštanje na slobodu predstavlja stvarnu prijetnju narušavanju javnog reda. Prigovori o nedostatku osnovane sumnje i pogrešnom činjeničnom utvrđenju nisu prihvaćeni u okviru ispitivanja pritvora nakon presude.",
      keywords: ["produljenje pritvora", "ratni zločin", "javni red", "čl. 197. ZKP"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 197. st. 1. tač. g) ZKOP RS", "čl. 336. st. 3. ZKOP RS"],
      headnote: "Potvrđen pritvor nakon osude za ratni zločin.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 002487 11 Kvlz",
      decision_date: "2012-02-09",
      legal_area: "criminal",
      legal_question:
        "Da li je sud dužan primijeniti odredbe o stićaju krivičnih djela (čl. 49. KZ RS) kada se osuđenom sudi za ratni zločin počinjen prije izdržavanja kazne po ranijoj presudi za ubistvo?",
      court_position:
        "Vrhovni sud RS je usvojio zahtjev za zaštitu zakonitosti i preinačio odluku o kazni: izrečena je jedinstvena kazna zatvora od 15 godina za ratni zločin i ranije osuđujuće ubistvo, s uračunavanjem vremena u pritvoru i izdržanju kazne.",
      reasoning:
        "Po čl. 49. st. 1. KZ RS pravila o stićaju primjenjuju se i kada se sudi za djelo počinjeno prije početka izdržavanja ranije kazne, bez obzira da li je ta kazna već izdržana. Sud je trebao utvrditi jedinstvenu kaznu po čl. 48. st. 2. tač. 3. KZ RS (maksimum 15 godina), uračunavajući raniju kaznu od 15 godina za ubistvo i kaznu od 13 godina za ratni zločin.",
      keywords: ["stićaj krivičnih djela", "jedinstvena kazna", "zaštita zakonitosti", "ratni zločin", "ubistvo"],
      related_articles: ["čl. 49. st. 1. KZ RS", "čl. 48. st. 2. tač. 3. KZ RS", "čl. 142. st. 1. KZ RS", "čl. 339е. ZKOP RS"],
      headnote: "Usvojen ZZL; primijenjen stićaj sa ranijom presudom za ubistvo.",
      outcome: "plaintiff_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 002487 13 Kž 8",
      decision_date: "2013-05-23",
      legal_area: "criminal",
      legal_question:
        "Da li se po čl. 341. ZKP RS može bez ponavljanja postupka objediniti kazna zatvora iz presude za ratni zločin sa zamijenjenom novčanom kaznom iz drugog predmeta?",
      court_position:
        "Vrhovni sud RS je odbio žalbu osuđenog; zahtjev za nepravo ponavljanje postupka i objedinjenje kazni je pravilno odbijen jer nije riječ o dvije presude kazne zatvora bez primjene stićaja.",
      reasoning:
        "Čl. 341. st. 1. ZKP RS odnosi se na više pravosnažnih presuda kojima su izrečene kazne zatvora bez primjene odredaba o jedinstvenoj kazni. U konkretnom slučaju je novčana kazna zamijenjena kratkom kaznom zatvora (7 dana) po drugom predmetu, što ne aktivira ovaj institut objedinjenja sa kaznom od 8 godina za ratni zločin.",
      keywords: ["nepravo ponavljanje postupka", "objedinjenje kazni", "stićaj", "ratni zločin"],
      related_articles: ["čl. 341. st. 1. ZKOP RS", "čl. 142. st. 1. KZ RS", "čl. 337. st. 3. ZKOP RS"],
      headnote: "Odbijen zahtjev za objedinjenje kazni iz različitih predmeta.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 006738 12 Kž 2",
      decision_date: "2013-02-08",
      legal_area: "criminal",
      legal_question:
        "Da li novi dokazi u zahtjevu za ponavljanje postupka protiv osuđenog za ratni zločin protiv civilnog stanovništva mogu dovesti do ponavljanja?",
      court_position:
        "Vrhovni sud RS je odbio žalbu branioca i potvrdio odbijanje zahtjeva za ponavljanje krivičnog postupka.",
      reasoning:
        "Prvostepeni sud je pravilno utvrdio da predloženi dokazi i svjedoci nemaju neposredna saznanja o događaju i ne dovode u sumnju činjenično stanje pravosnažne presude. Novi dokazi nisu podobni da utiču na oslobađanje ili osudu po blažem zakonu (čl. 343. ZKOP RS).",
      keywords: ["ponavljanje postupka", "novi dokazi", "ratni zločin"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 343. ZKOP RS", "čl. 347. st. 1. ZKOP RS", "čl. 337. st. 3. ZKOP RS"],
      headnote: "Odbijeno ponavljanje; novi dokazi neosporavaju presudu.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 006738 22 Kž 3",
      decision_date: "2022-12-06",
      legal_area: "criminal",
      legal_question:
        "Da li zahtjev osuđenog za ponavljanje postupka po ratnom zločinu sadrži nove dokaze podobne za oslobađanje ili osudu po blažem zakonu?",
      court_position:
        "Vrhovni sud RS je odbio žalbu osuđenog kao neosnovanu i potvrdio odbacivanje zahtjeva za ponavljanje postupka.",
      reasoning:
        "Osuđeni je ponovio ranije predložene dokaze (saslušanje svjedoka N.G., S.K., R.N., uvid u raspored rada policije). Sud je zaključio da to nisu novi dokazi koje nije mogao iznijeti na glavnom pretresu niti činjenice podobne za oslobađanje (čl. 343. st. 1. tač. v) ZKOP RS). Raniji zahtjev je već odbijen nakon izviđaja.",
      keywords: ["ponavljanje postupka", "novi dokazi", "ratni zločin", "policijski raspored"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 343. st. 1. tač. v) ZKOP RS", "čl. 347. st. 1. ZKOP RS"],
      headnote: "Odbijeno ponavljanje; nema novih podobnih dokaza.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 009182 13 Kvlz",
      decision_date: "2013-07-04",
      legal_area: "criminal",
      legal_question:
        "Da li je pogrešno primijenjen princip ne bis in idem kada je u drugostepenom postupku odbijena optužba za ratni zločin jer je optuženi već osuđen za isto krivično djelo u drugom predmetu?",
      court_position:
        "Vrhovni sud RS je odbio zahtjev okružnog tužioca za zaštitu zakonitosti; potvrđena je drugostepena presuda koja je odbila optužbu po čl. 297. tač. g) ZKOP RS.",
      reasoning:
        "Za ratni zločin protiv civilnog stanovništva (čl. 142. KZ SFRJ) više istovrsnih ili raznovrsnih radnji prema različitim žrtvama čini jedno krivično djelo (prividni stićaj). Uspoređujući činjenični opis ranije osude (ubistvo civila O.H. 15.07.1992.) i novu optužbu (ubistvo A.L. 14.07.1992.), sud je pravilno utvrdio istovjetnost u smislu presuđene stvari i primijenio ne bis in idem, u skladu s praksom Ustavnog suda BiH i ESLJP.",
      keywords: ["ne bis in idem", "presuđena stvar", "ratni zločin", "zaštita zakonitosti", "jedinstveno djelo"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 297. tač. g) ZKOP RS", "čl. 4. ZKOP RS", "čl. 4. Protokol 7. EKLJP"],
      headnote: "Odbijen ZZL tužioca; potvrđen ne bis in idem za ratni zločin.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 009197 13 Kž 2",
      decision_date: "2013-11-13",
      legal_area: "criminal",
      legal_question:
        "Da li je osnovana žalba protiv produljenja pritvora zbog opasnosti od bijega nakon osude za ratni zločin?",
      court_position:
        "Vrhovni sud RS je odbio žalbu branioca kao neosnovanu i potvrdio produljenje pritvora po čl. 197. st. 1. tač. a) ZKOP RS.",
      reasoning:
        "Iako izreka rješenja ne ponavlja osnov iz čl. 197. st. 1. tač. a), obrazloženje jasno ukazuje na opasnost bijega: optuženi je napustio teritorij RS nakon događaja 1993., živio u inostranstvu, ekstradiran je, nema stvarnog prebivališta ni imovine, a osuđen je na devet godina zatvora za teško djelo.",
      keywords: ["pritvor", "bijeg", "ratni zločin", "ekstradicion"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 197. st. 1. tač. a) ZKOP RS", "čl. 337. st. 3. ZKOP RS"],
      headnote: "Potvrđen pritvor zbog opasnosti od bijega.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 015426 16 Kvlz",
      decision_date: "2016-01-25",
      legal_area: "criminal",
      legal_question:
        "Da li ZZL može osporavati činjenično stanje i kvalifikaciju ratnog zločina zbog navoda da je oštećeni izvršio samoubistvo ili da je gonjenje zastarjelo?",
      court_position:
        "Vrhovni sud RS je odbio zahtjev za zaštitu zakonitosti branilaca osuđenih kao neosnovan.",
      reasoning:
        "Prigovori o pogrešnoj ocjeni dokaza, alibi-u, samoubistvu oštećenog i pogrešnoj kvalifikaciji imaju činjenični karakter i nisu predmet ZZL. Povreda krivičnog zakona zahtijeva prihvaćanje činjenične osnove presude. Za ratni zločin protiv civilnog stanovništva nije nastupila zastara.",
      keywords: ["zaštita zakonitosti", "ratni zločin", "činjenični prigovori", "samoubistvo"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 350. ZKOP RS", "čl. 355. ZKOP RS"],
      headnote: "Odbijen ZZL; činjenična revizija nije dopuštena.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 015632 15 Kž",
      decision_date: "2016-03-25",
      legal_area: "criminal",
      legal_question:
        "Da li se krivični postupak protiv optuženog za ratni zločin obustavlja zbog smrti optuženog nakon prvostepene presude?",
      court_position:
        "Vrhovni sud RS je obustavio krivični postupak protiv optuženog N.Đ. zbog smrti optuženog (12.11.2015.).",
      reasoning:
        "Nakon dostavljenog izvoda iz matice umrlih sud je primijenio čl. 215. ZKOP RS i obustavio postupak. Žalba branioca nije meritorno raspravljana zbog nastupa procesne smetnje smrću optuženog.",
      keywords: ["obustava postupka", "smrt optuženog", "ratni zločin"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 215. ZKOP RS"],
      headnote: "Obustava postupka zbog smrti optuženog.",
      outcome: "procedural",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 016577 17 Kž 2",
      decision_date: "2017-01-30",
      legal_area: "criminal",
      legal_question:
        "Da li notarska izjava svjedoka nakon pravosnažne presude predstavlja novi dokaz za ponavljanje postupka po ratnom zločinu?",
      court_position:
        "Vrhovni sud RS je odbio žalbu branioca i potvrdio odbacivanje zahtjeva za ponavljanje postupka.",
      reasoning:
        "Svjedok Z.Č. je već saslušan na glavnom pretresu kao svjedok optužbe i odbrane; notarska izjava nakon završetka postupka nije novi dokaz u smislu čl. 343. ZKOP RS. Nije dokazano da je svjedok dao lažan iskaz pravosnažnom presudom. Nema proturječnosti izreke i razloga rješenja.",
      keywords: ["ponavljanje postupka", "notarska izjava", "lažan iskaz", "ratni zločin"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 343. ZKOP RS", "čl. 288. st. 1. ZKOP RS", "čl. 347. st. 1. ZKOP RS"],
      headnote: "Odbijeno ponavljanje; notarska izjava nije novi dokaz.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 017909 19 Kž 2",
      decision_date: "2019-05-31",
      legal_area: "criminal",
      legal_question:
        "Da li medicinska dokumentacija i vještačenje nakon presude mogu biti osnov za ponavljanje postupka po ratnom zločinu?",
      court_position:
        "Vrhovni sud RS je odbio žalbu branioca i potvrdio odbacivanje zahtjeva za ponavljanje postupka.",
      reasoning:
        "Medicinski nalazi i neuropsihijatrijsko vještačenje u zahtjevu služe za preispitivanje vjerodostojnosti iskaza oštećenog koji je već ocijenjen u ranijem postupku. Nisu ponuđene nove činjenice ni dokazi podobni za oslobađanje ili osudu po blažem zakonu (čl. 343. st. 1. tač. v) ZKOP RS).",
      keywords: ["ponavljanje postupka", "vještačenje", "iskaz oštećenog", "ratni zločin"],
      related_articles: ["čl. 142. st. 1. KZ SFRJ", "čl. 343. st. 1. tač. v) ZKOP RS", "čl. 347. st. 1. ZKOP RS"],
      headnote: "Odbijeno ponavljanje; medicinski dokazi ne mijenjaju činjenično stanje.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 018094 16 Kž",
      decision_date: "2016-10-18",
      legal_area: "criminal",
      legal_question:
        "Da li je osnovana žalba protiv produljenja mjera zabrane boravka u inostranstvu nakon osude za ratni zločin protiv ratnih zarobljenika (čl. 144. KZ SFRJ)?",
      court_position:
        "Vrhovni sud RS je odbio žalbu branioca optuženog kao neosnovanu i potvrdio mjere zabrane po čl. 184. st. 2. i čl. 185. st. 1. tač. g) ZKOP RS.",
      reasoning:
        "Prvostepeni sud je valjano obrazložio postojanje stvarne veze optuženog s inostranstvom i potrebu da se mjere zabrane i nakon osude na kaznu zatvora od 2 godine i 6 mjeseci zadrže zbog težine djela protiv ratnih zarobljenika.",
      keywords: ["mjere zabrane", "inozemstvo", "ratni zločin", "zarobljenici"],
      related_articles: ["čl. 144. KZ SFRJ", "čl. 184. st. 2. ZKOP RS", "čl. 185. st. 1. tač. g) ZKOP RS"],
      headnote: "Potvrđene mjere zabrane boravka u inostranstvu.",
      outcome: "defendant_won",
    },
  {
      jurisdiction: "bih_rs",
      court: "Vrhovni sud Republike Srpske",
      court_level: "supreme",
      case_number: "11 0 K 021326 20 Kvlz",
      decision_date: "2021-12-13",
      legal_area: "criminal",
      legal_question:
        "Da li su osnovani ZZL-ovi osuđenih za ratni zločin protiv civilnog stanovništva zbog povrede prava na odbranu, saizvršilaštva i pogrešne primjene KZ RS?",
      court_position:
        "Vrhovni sud RS je odbio zahtjeve za zaštitu zakonitosti branilaca osuđenih V.B., D.S. i D.B. kao neosnovane.",
      reasoning:
        "ZZL se ograničava na povrede iz čl. 350. ZKOP RS; činjenični prigovori o ratnom sukobu, saizvršilaštu i ocjeni dokaza ne mogu se podvesti pod povredu krivičnog zakona. Sud je ocijenio da su ispunjena obilježja čl. 142. st. 1. u vezi čl. 22. KZ RS i da je u činjeničnom opisu jasno opisano saizvršilaštvo. Prigovori o neprihvaćenim dokaznim prijedlozima i EKLJP nisu osnovani.",
      keywords: ["zaštita zakonitosti", "ratni zločin", "saizvršilaštvo", "pravo na odbranu", "čl. 142. KZ RS"],
      related_articles: ["čl. 142. st. 1. KZ RS", "čl. 22. KZ RS", "čl. 350. ZKOP RS", "čl. 355. ZKOP RS"],
      headnote: "Odbijen ZZL više osuđenih za ratni zločin u Župnom domu.",
      outcome: "defendant_won",
    }


]
