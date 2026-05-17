import fs from "fs"

const path = "scripts/case-law-criminal-bih-rs-2.ts"
let s = fs.readFileSync(path, "utf8")

/** Batch 2 — 44 unique PDF extracts (duplicate skipped per ingest notes). */
const batch2 = [
  {
    case_number: "118-0-Kz-z-06-000 002",
    decision_date: "2006-01-01",
    legal_question:
      "Kako je Vrhovni sud RS odlučio u predmetu 118-0-Kz-z-06-000 002 u oblasti krivičnih djela protiv života i tijela?",
    court_position:
      "Tekstualni sloj izvoda korumpiran je pogrešnom kodnom stranicom; sadržaj nije pouzdano čitljiv na srpskoj ćirilici.",
    reasoning:
      "Automatska ekstrakcija daje pseudografiju umjesto slova; potrebna je ponovna OCR obrada iz PDF-a.",
    keywords: ["oštećen izvod", "encoding", "ponavljanje postupka"],
    related_articles: ["čl. 149. KZ RS", "čl. 347. ZKOP RS"],
    headnote: "Neupotrebljiv tekst izvoda.",
    outcome: "procedural",
  },
  {
    case_number: "118-0-Kz-07-000 210",
    decision_date: "2007-01-01",
    legal_question: "Kako je Vrhovni sud RS odlučio u predmetu 118-0-Kz-07-000 210?",
    court_position: "Izvod ne sadrži tekst (prazan file).",
    reasoning: "Potrebna ponovna ekstrakcija iz izvornog PDF-a.",
    keywords: ["prazan izvod"],
    related_articles: [],
    headnote: "Nedovoljan tekst izvoda.",
    outcome: "procedural",
  },
  {
    case_number: "118-0-Kz-08-000 078",
    decision_date: "2008-01-01",
    legal_question: "Kako je Vrhovni sud RS odlučio u predmetu 118-0-Kz-08-000 078?",
    court_position: "Izvod ne sadrži tekst (prazan file).",
    reasoning: "Potrebna ponovna ekstrakcija iz izvornog PDF-a.",
    keywords: ["prazan izvod"],
    related_articles: [],
    headnote: "Nedovoljan tekst izvoda.",
    outcome: "procedural",
  },
  {
    case_number: "118-0-Kz-08-000 079",
    decision_date: "2008-01-01",
    legal_question: "Kako je Vrhovni sud RS odlučio u predmetu 118-0-Kz-08-000 079?",
    court_position: "Izvod ne sadrži tekst (prazan file).",
    reasoning: "Potrebna ponovna ekstrakcija iz izvornog PDF-a.",
    keywords: ["prazan izvod"],
    related_articles: [],
    headnote: "Nedovoljan tekst izvoda.",
    outcome: "procedural",
  },
  {
    case_number: "12 0 K 000489 10 Kvlz",
    decision_date: "2010-01-01",
    legal_question: "Kako je Vrhovni sud RS odlučio u predmetu 12 0 K 000489 10 Kvlz?",
    court_position: "Izvod ne sadrži tekst (prazan file).",
    reasoning: "Potrebna ponovna ekstrakcija iz izvornog PDF-a.",
    keywords: ["prazan izvod", "ZZL"],
    related_articles: [],
    headnote: "Nedovoljan tekst izvoda.",
    outcome: "procedural",
  },
  {
    case_number: "12 0 K 000926 10 Kz",
    decision_date: "2010-01-01",
    legal_question: "Kako je Vrhovni sud RS odlučio u predmetu 12 0 K 000926 10 Kz?",
    court_position: "Izvod ne sadrži tekst (prazan file).",
    reasoning: "Potrebna ponovna ekstrakcija iz izvornog PDF-a.",
    keywords: ["prazan izvod", "žalba"],
    related_articles: [],
    headnote: "Nedovoljan tekst izvoda.",
    outcome: "procedural",
  },
  {
    case_number: "12 0 K 001713 16 Kz 10 anonimizirana",
    decision_date: "2016-11-29",
    legal_question:
      "Da li je osnovana žalba osuđenog protiv rješenja kojim je odbijen zahtjev za ponavljanje krivičnog postupka (anonimiziran predmet)?",
    court_position:
      "Žalba je odbačena kao neosnovana; pobijano rješenje ostaje na snazi.",
    reasoning:
      "Drugostepeni sud nalazi da prigovori oko novih činjenica/dokaza ne zadovoljavaju uslove čl. 343. ZKOP RS za ponavljanje.",
    keywords: ["ponavljanje postupka", "žalba", "anonimizirano"],
    related_articles: ["čl. 343. ZKOP RS", "čl. 337. ZKOP RS"],
    headnote: "Odbačena žalba na rješenje o ponavljanju.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 001713 17 Kz 11. anonimizirana",
    decision_date: "2017-03-30",
    legal_question:
      "Da li je osnovana žalba osuđenog protiv rješenja o odbijanju ponavljanja postupka (anonimiziran predmet)?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Sud ocjenjuje da ponovljeni dokazni prijedlozi nemaju karakter novih dokaza u smislu zakona.",
    keywords: ["ponavljanje postupka", "anonimizirano"],
    related_articles: ["čl. 343. ZKOP RS"],
    headnote: "Žalba odbačena.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 001713 18 Kz 12 anonimizirana",
    decision_date: "2018-02-26",
    legal_question:
      "Da li je osnovana žalba protiv rješenja kojim je odbijeno ponavljanje postupka u predmetu protiv života i tijela?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Žalbene tvrdnje ne dovode u pitanje zakonitost odbijanja zahtjeva za ponavljanje.",
    keywords: ["ponavljanje postupka"],
    related_articles: ["čl. 347. ZKOP RS"],
    headnote: "Žalba odbačena.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 001713 19 Kz 13",
    decision_date: "2019-10-31",
    legal_question:
      "Da li su osnovane žalbe osuđenog i njegovog punomoćnika protiv rješenja o odbijanju ponavljanja postupka?",
    court_position: "Žalbe su odbačene kao neosnovane.",
    reasoning:
      "Zahtjev za ponavljanje temelji se na tvrdnjama o novim dokazima koje drugostepeni sud ocjenjuje kao neosnovane u svjetlu čl. 343. ZKOP RS.",
    keywords: ["ponavljanje postupka", "žalba odbrane"],
    related_articles: ["čl. 343. st. 1. ZKOP RS", "čl. 337. ZKOP RS"],
    headnote: "Odbačene žalbe na rješenje.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 001936 11 Kz - maskirana",
    decision_date: "2011-01-01",
    legal_question: "Kako je Vrhovni sud RS odlučio u maskiranom predmetu 12 0 K 001936 11 Kz?",
    court_position: "Nema dostupnog teksta u izvodu.",
    reasoning: "Prazan ili nedostajući tekstualni sloj.",
    keywords: ["maskirano", "prazan izvod"],
    related_articles: [],
    headnote: "Nedovoljan tekst izvoda.",
    outcome: "procedural",
  },
  {
    case_number: "12 0 K 004724 17 Kz 6",
    decision_date: "2017-11-09",
    legal_question:
      "Da li su osnovane protivstrane žalbe tužioca i odbrane na prvostepenu presudu za stićaj dvaju ubistava?",
    court_position:
      "Žalbe su odbačene kao neosnovane; prvostepena presuda je potvrđena.",
    reasoning:
      "Viši sud ne nalazi osnova za preinačenje osude ni po činjeničnoj osnovi ni po kazni.",
    keywords: ["žalba", "ubistvo čl. 148.", "stićaj"],
    related_articles: ["čl. 148. KZ RS", "čl. 320. ZKOP RS"],
    headnote: "Potvrđena osuda.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 004724 18 Kvlz",
    decision_date: "2018-08-20",
    legal_question:
      "Da li je osnovan zahtjev za zaštitu zakonitosti branioca osuđenih protiv pravosnažne presude za stićaj ubistava?",
    court_position: "Zahtjev za zaštitu zakonitosti je odbijen kao neosnovan.",
    reasoning:
      "Žalbene tvrdnje ZZL-a ne pokazuju povredu materijalnog prava u obimu dopuštenom zaštitom zakonitosti.",
    keywords: ["ZZL", "ubistvo", "stićaj"],
    related_articles: ["čl. 350. ZKOP RS", "čl. 355. ZKOP RS"],
    headnote: "Odbijen ZZL odbrane.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 005846 17 Kz 4",
    decision_date: "2017-04-04",
    legal_question:
      "Da li je osnovana žalba odbrane na rješenje kojim je produljen pritvor okužene za teško ubistvo (čl. 149.)?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Sud nalazi da su ostali ispunjeni uslovi za kontrolu opravdanosti pritvora po čl. 197. ZKOP RS za djelo teškog ubistva.",
    keywords: ["pritvor", "teško ubistvo", "čl. 149."],
    related_articles: ["čl. 197. st. 1. tač. g) ZKOP RS", "čl. 202. ZKOP RS"],
    headnote: "Potvrđeno produljenje pritvora.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 005884 16 Kz",
    decision_date: "2016-11-01",
    legal_question:
      "Da li je osnovana žalba odbrane protiv rješenja kojim je odbijena inostrana molba za preuzimanje izvršenja mjere psihijatrijskog smještaja nakon osude za ubistvo?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Za preuzimanje izvršenja strane mjere potrebna je domaća osuda/kazna po domaćem KZ; neuračunljivosti se ne mogu svoditi na kaznu iz čl. 58. KZ RS bez posebnog postupka.",
    keywords: ["međunarodna pravna pomoć", "mjera bezbednosti", "ubistvo"],
    related_articles: ["čl. 62. Zakona o međunarodnoj pravnoj pomoći", "čl. 404. st. 2. ZKOP RS"],
    headnote: "Odbačena žalba na odbijanje molbe.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 007015 18 Kv 5",
    decision_date: "2018-12-13",
    legal_question:
      "Da li je opravdano produljenje pritvora osumnjičenih za ubistvo (čl. 124.) i učešće u tuči protiv prijedloga odbrane?",
    court_position:
      "Produljuje se pritvor za još dva mjeseca po čl. 197. st. 1. tač. g) ZKOP RS.",
    reasoning:
      "Sud nalazi osnovanu sumnju i težinu djela koji opravdavaju nastavak pritvora.",
    keywords: ["pritvor", "ubistvo", "javni red"],
    related_articles: ["čl. 197. st. 1. tač. g) ZKOP RS", "čl. 200. st. 3. ZKOP RS"],
    headnote: "Produljenje pritvora u istrazi.",
    outcome: "procedural",
  },
  {
    case_number: "12 0 K 007015 18 Kz 3 anonimizirana",
    decision_date: "2018-12-24",
    legal_question:
      "Da li su osnovane žalbe branilaca na rješenje Vrhovnog suda o produljenju pritvora u grupnom predmetu za ubistvo?",
    court_position: "Žalbe su odbačene kao neosnovane.",
    reasoning:
      "Viši sud potvrđuje opravdanost produljenja pritvora nakon kontrole po čl. 200. ZKOP RS.",
    keywords: ["pritvor", "žalba", "grupni predmet"],
    related_articles: ["čl. 200. ZKOP RS", "čl. 197. ZKOP RS"],
    headnote: "Odbačene žalbe na VS rješenje o pritvoru.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 007015 19 Kz 4",
    decision_date: "2019-02-21",
    legal_question:
      "Da li su osnovane žalbe branilaca na dalje produljenje pritvora istražnim licima u predmetu ubistva?",
    court_position: "Žalbe su odbačene kao neosnovane.",
    reasoning:
      "Pravna ocjena zadržava zaključak da razlozi iz čl. 197. ZKOP RS i dalje postoje.",
    keywords: ["pritvor", "žalba"],
    related_articles: ["čl. 197. ZKOP RS"],
    headnote: "Žalbe na produljenje pritvora odbačene.",
    outcome: "defendant_won",
  },
  {
    case_number: "12 0 K 007439 21 Kz 9",
    decision_date: "2021-04-06",
    legal_question:
      "Da li je osnovana žalba odbrane protiv rješenja kojim je odbijen prijedlog za određivanje jemstva umjesto pritvora?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Sud ocjenjuje da ostaju razlozi za zadržavanje pritvora radi teškog ubistva i pratećih djela.",
    keywords: ["pritvor", "jemstvo", "teško ubistvo"],
    related_articles: ["čl. 197. ZKOP RS", "čl. 337. ZKOP RS"],
    headnote: "Odbačena žalba na odbijanje jemstva.",
    outcome: "defendant_won",
  },
  {
    case_number: "13 0 K 000891 13 Kz 2",
    decision_date: "2013-06-27",
    legal_question:
      "Da li su osnovane žalbe osuđenog i branioca protiv rješenja kojim je odbijen zahtjev za ponavljanje postupka nakon osude za ubistvo?",
    court_position: "Žalbe su odbačene kao neosnovane.",
    reasoning:
      "Preporučeni dokazi za ponavljanje nemaju karakter novih dokaza koji su nepoznati pri pravosnažnosti ranije presude.",
    keywords: ["ponavljanje postupka", "ubistvo čl. 148.", "novi dokazi"],
    related_articles: ["čl. 343. ZKOP RS", "čl. 337. ZKOP RS"],
    headnote: "Žalbe na odbijanje ponavljanja odbačene.",
    outcome: "defendant_won",
  },
  {
    case_number: "13 0 K 004544 17 Kz",
    decision_date: "2017-07-19",
    legal_question:
      "Da li je osnovana žalba odbrane na produljenje pritvora osumnjičenog za pokušaj ubistva?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Važe zaključci o osnovanoj sumnji i posebnim okolnostima javnog reda za pritvor.",
    keywords: ["pritvor", "pokušaj ubistva"],
    related_articles: ["čl. 197. ZKOP RS"],
    headnote: "Žalba na produljenje pritvora odbačena.",
    outcome: "defendant_won",
  },
  {
    case_number: "13 0 K 004544 17 Kz 5",
    decision_date: "2018-01-23",
    legal_question:
      "Da li su osnovane protivstrane žalbe tužioca i odbrane na prvostepenu presudu za ubistvo i ugrožavanje sigurnosti?",
    court_position:
      "Žalbe su odbačene kao neosnovane; prvostepena presuda je potvrđena.",
    reasoning:
      "Sud ne nalazi bitnih povreda postupka niti nepravilnosti u ocjeni kazni koji bi opravdali preinačenje.",
    keywords: ["žalba tužioca", "žalba odbrane", "ubistvo"],
    related_articles: ["čl. 320. ZKOP RS"],
    headnote: "Potvrđena prvostepena osuda.",
    outcome: "defendant_won",
  },
  {
    case_number: "13 0 K 004699 17 Kz",
    decision_date: "2017-11-29",
    legal_question:
      "Da li su osnovane žalbe odbrane na produljenje pritvora u istrazi za iznudu (stićaj s povredama tijela)?",
    court_position: "Žalbe su odbačene kao neosnovane.",
    reasoning:
      "Formalnopravni prigovori ne konkretizuju povrede iz čl. 311. ZKOP RS; produljenje ostaje zakonito.",
    keywords: ["pritvor", "iznuda", "istraga"],
    related_articles: ["čl. 197. ZKOP RS", "čl. 311. ZKOP RS"],
    headnote: "Žalbe na produljenje pritvora odbačene.",
    outcome: "defendant_won",
  },
  {
    case_number: "13 0 K 006700 22 Kz 3",
    decision_date: "2025-08-19",
    legal_question:
      "Da li je osnovana žalba odbrane na prvostepenu presudu za pokušaj ubistva?",
    court_position:
      "Žalba je odbačena kao neosnovana; prvostepena presuda je potvrđena.",
    reasoning:
      "Prigovori o dokazima i kvalifikaciji ocjenjeni su kao neosnovani.",
    keywords: ["žalba", "pokušaj ubistva"],
    related_articles: ["čl. 320. ZKOP RS"],
    headnote: "Potvrđena osuda.",
    outcome: "defendant_won",
  },
  {
    case_number: "13 0 K 007811 23 Kz 3",
    decision_date: "2023-09-21",
    legal_question:
      "Da li je osnovana žalba odbrane na rješenje o produljenju pritvora za pokušaj ubistva?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Drugostepeni sud smatra da pritvor i dalje ima zakonite osnove.",
    keywords: ["pritvor", "pokušaj ubistva"],
    related_articles: ["čl. 197. ZKOP RS"],
    headnote: "Žalba na pritvor odbačena.",
    outcome: "defendant_won",
  },
  {
    case_number: "13 0 K 008202 25 Kz 10",
    decision_date: "2026-03-13",
    legal_question:
      "Da li su osnovane protivstrane žalbe tužiteljstva, optuženog, njegovog oca i branioca na drugostepenu presudu za teško ubistvo?",
    court_position:
      "Žalbe su odbačene kao neosnovane; drugostepena presuda je potvrđena.",
    reasoning:
      "Sud ne prihvata prigovore o privilegovanim svjedocima i drugim bitnim povredama iz čl. 311. ZKOP RS.",
    keywords: ["teško ubistvo", "žalbe", "čl. 125."],
    related_articles: ["čl. 125. KZ RS", "čl. 318. ZKOP RS", "čl. 320. ZKOP RS"],
    headnote: "Potvrđena osuda za teško ubistvo.",
    outcome: "defendant_won",
  },
  {
    case_number: "13 0 K 008535 25 Kz 3",
    decision_date: "2025-12-12",
    legal_question:
      "Da li su osnovane protivstrane žalbe odbrane i tužioca na prvostepenu presudu za ubistvo?",
    court_position:
      "Žalbe su odbačene kao neosnovane; prvostepena presuda je potvrđena.",
    reasoning:
      "Ni tužilac ni odbrana ne pokazuju osnov za preinačenje osude ni po kazni.",
    keywords: ["žalba", "ubistvo čl. 124."],
    related_articles: ["čl. 320. ZKOP RS"],
    headnote: "Potvrđena osuda.",
    outcome: "defendant_won",
  },
  {
    case_number: "14 0 K 002091 18 Kz 2",
    decision_date: "2019-01-21",
    legal_question:
      "Da li je osnovana žalba okružnog javnog tužioca na oslobađajuću presudu za ubistvo?",
    court_position:
      "Žalba tužioca je odbačena kao neosnovana; oslobađajuća presuda ostaje na snazi.",
    reasoning:
      "Sud ocjenjuje da je prvostepeni sud pravilno isključio nezakonite dokaze i utvrdio nedostatak dokaza o izvršiocu.",
    keywords: ["žalba tužioca", "ubistvo", "oslobođenje"],
    related_articles: ["čl. 298. ZKOP RS", "čl. 142. ZKOP RS"],
    headnote: "Tužilac izgubio žalbu; ostaje oslobođenje.",
    outcome: "defendant_won",
  },
  {
    case_number: "14 0 K 002293 18 Kz 3",
    decision_date: "2019-01-23",
    legal_question:
      "Da li su osnovane žalbe tužioca i odbrane na prvostepenu presudu za ubistvo kada VS intervenira po službenoj dužnosti?",
    court_position:
      "Protivstrane žalbe su odbačene kao neosnovane; po službenoj dužnosti presuda se preinačuje u pravnoj kvalifikaciji i kazni.",
    reasoning:
      "Sud mijenja kvalifikaciju u ubistvo uz čl. 11. st. 3. u vezi st. 2. KZ RS i izriče novu kaznu zatvora od šest godina i šest mjeseci.",
    keywords: ["službena dužnost", "preinačenje", "ubistvo"],
    related_articles: ["čl. 148. KZ RS", "čl. 321. ZKOP RS"],
    headnote: "Preinačenje kvalifikacije i kazne po dužnosti suda.",
    outcome: "partially",
  },
  {
    case_number: "14 0 K 002994 16 Kz 5 - anonimizirano",
    decision_date: "2016-12-20",
    legal_question:
      "Da li je osnovana žalba odbrane koja osporava odredbu izreke o troškovima postupka nakon osude za ubistvo?",
    court_position:
      "Uvažava se žalba odbrane u dijelu troškova; presuda se preinačuje tako da je okuženi oslobođen dužnosti naknade troškova po čl. 96. ZKOP RS.",
    reasoning:
      "Izreka koja ostavlja troškove za posebno rješenje protivna je čl. 299. st. 1. tač. e) ZKOP RS; primjenjuje se zabrana reformatio in peius uz korist odbrane.",
    keywords: ["troškovi postupka", "reformatio in peius", "ubistvo"],
    related_articles: ["čl. 299. ZKOP RS", "čl. 328. ZKOP RS"],
    headnote: "Uvažena žalba samo za troškove; ostatak presude isti.",
    outcome: "partially",
  },
  {
    case_number: "14 0 K 003398 17 Kv 3",
    decision_date: "2017-12-01",
    legal_question:
      "Da li je opravdano produljenje pritvora osumnjičenog za teško ubistvo (čl. 125.) u istrazi?",
    court_position: "Produljuje se pritvor za još tri mjeseca.",
    reasoning:
      "Težina djela, okolnosti ubistava i složenost istrage opravdavaju nastavak pritvora.",
    keywords: ["pritvor", "teško ubistvo", "istraga"],
    related_articles: ["čl. 197. ZKOP RS", "čl. 200. ZKOP RS"],
    headnote: "VS produljava pritvor.",
    outcome: "procedural",
  },
  {
    case_number: "14 0 K 004180 21 Kz 13",
    decision_date: "2021-02-05",
    legal_question:
      "Da li su osnovane žalbe branilaca na drugostepeno rješenje o produljenju pritvora skupini okužnih za pokušaj ubistva?",
    court_position: "Žalbe šestero branilaca su odbačene kao neosnovane.",
    reasoning:
      "Viši sud potvrđuje opravdanost kontrole pritvora za teško kazneno djelo.",
    keywords: ["pritvor", "grupni predmet", "pokušaj ubistva"],
    related_articles: ["čl. 197. ZKOP RS", "čl. 202. ZKOP RS"],
    headnote: "Žalbe na produljenje pritvora odbačene.",
    outcome: "defendant_won",
  },
  {
    case_number: "14 0 K 006426 24 Kz 5",
    decision_date: "2024-08-06",
    legal_question:
      "Da li su osnovane žalbe branilaca na produljenje pritvora za stićaj pokušaja ubistva?",
    court_position: "Žalbe su odbačene kao neosnovane.",
    reasoning:
      "Osnova za produljenje iz čl. 197. ZKOP RS ostaje.",
    keywords: ["pritvor", "pokušaj ubistva"],
    related_articles: ["čl. 197. ZKOP RS"],
    headnote: "Žalbe odbačene.",
    outcome: "defendant_won",
  },
  {
    case_number: "15 0 K 002152 17 Kz 2",
    decision_date: "2018-04-19",
    legal_question:
      "Da li su osnovane protivstrane žalbe tužioca i odbrane na presudu za ubistvo u prekoračenju nužne odbrane i laku tjelesnu povredu?",
    court_position:
      "Žalbe su odbačene kao neosnovane; prvostepena presuda je potvrđena.",
    reasoning:
      "Sud smatra pravilnim ocjenom dokaza i izrečenoj jedinstvenoj kazni.",
    keywords: ["nužna odbrana", "ubistvo čl. 148.", "stićaj"],
    related_articles: ["čl. 148. KZ RS", "čl. 155. KZ RS"],
    headnote: "Potvrđena osuda.",
    outcome: "defendant_won",
  },
  {
    case_number: "15 0 K 002736 17 Kz 2",
    decision_date: "2017-07-18",
    legal_question:
      "Da li je osnovana žalba odbrane na prvostepenu presudu za ubistvo?",
    court_position:
      "Žalba je odbačena kao neosnovana; prvostepena presuda je potvrđena.",
    reasoning:
      "Žalbene tvrdnje ne dovode do zaključka o bitnoj povredi ili pogrešnoj primjeni zakona.",
    keywords: ["žalba", "ubistvo"],
    related_articles: ["čl. 320. ZKOP RS"],
    headnote: "Potvrđena osuda.",
    outcome: "defendant_won",
  },
  {
    case_number: "15 0 K 003779 19 Kz 3",
    decision_date: "2019-01-31",
    legal_question:
      "Da li je osnovana žalba odbrane na rješenje kojim je ostavljen pritvor za teško ubistvo u stićaju?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Sud nalazi da se okolnosti nisu poboljšale za ukidanje pritvora nakon kontrole po čl. 202. ZKOP RS.",
    keywords: ["pritvor", "teško ubistvo", "stićaj"],
    related_articles: ["čl. 197. ZKOP RS", "čl. 202. ZKOP RS"],
    headnote: "Žalba na pritvor odbačena.",
    outcome: "defendant_won",
  },
  {
    case_number: "16 0 K 000043 17 Kv 3",
    decision_date: "2017-08-24",
    legal_question:
      "Da li je opravdano produljenje pritvora osumnjičenog za teško ubistvo (čl. 149.)?",
    court_position: "Produljuje se pritvor za još jedan mjesec.",
    reasoning:
      "Posebni razlozi javnog reda i težina djela opravdavaju nastavak pritvora.",
    keywords: ["pritvor", "teško ubistvo"],
    related_articles: ["čl. 197. ZKOP RS"],
    headnote: "Produljenje pritvora u istrazi.",
    outcome: "procedural",
  },
  {
    case_number: "16 0 K 000043 18 Kz 9",
    decision_date: "2019-02-11",
    legal_question:
      "Da li je osnovana žalba odbrane na prvostepenu presudu za teško ubistvo uz primjenu čl. 31.a i 37. KZ RS?",
    court_position:
      "Žalba odbrane je odbačena kao neosnovana; po službenoj dužnosti presuda se preinačuje u dijelu kazne.",
    reasoning:
      "VS interveniše u okviru čl. 320. ZKOP RS po pitanju izrečene kazne uz poštovanje zabrane pogoršanja položaja okužnog kad žalba ide samo u njegovu korist.",
    keywords: ["službena dužnost", "preinačenje kazne", "teško ubistvo"],
    related_articles: ["čl. 320. ZKOP RS", "čl. 321. ZKOP RS"],
    headnote: "Djelomično preinačenje kazne po dužnosti.",
    outcome: "partially",
  },
  {
    case_number: "16 0 K 000206 18 Kz 5",
    decision_date: "2018-10-11",
    legal_question:
      "Da li su osnovane protivstrane žalbe tužioca i odbrane na prvostepenu presudu za ubistvo uz primjenu čl. 26. KZ RS?",
    court_position:
      "Žalbe su odbačene kao neosnovane; prvostepena presuda je potvrđena.",
    reasoning:
      "Nema uvjerljivih povreda materijalnog prava ni po osnovi ni po kazni.",
    keywords: ["žalba tužioca", "žalba odbrane", "ubistvo"],
    related_articles: ["čl. 320. ZKOP RS"],
    headnote: "Potvrđena prvostepena osuda.",
    outcome: "defendant_won",
  },
  {
    case_number: "16 0 K 000206 18 Kz",
    decision_date: "2018-01-10",
    legal_question:
      "Da li je osnovana žalba odbrane na rješenje kojim je ostavljen pritvor okrivljenom za teško ubistvo?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Ocjenjuje se da ostaju razlozi za zadržavanje pritvora.",
    keywords: ["pritvor", "teško ubistvo"],
    related_articles: ["čl. 197. ZKOP RS"],
    headnote: "Žalba na pritvor odbačena.",
    outcome: "defendant_won",
  },
  {
    case_number: "16 0 K 000316 23 Kz 6",
    decision_date: "2023-06-19",
    legal_question:
      "Da li je osnovana žalba odbrane na rješenje o produljenju pritvora za pokušaj ubistva?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Pravni zaključci prvostepenog suda o pritvoru ostaju valjani.",
    keywords: ["pritvor", "pokušaj ubistva"],
    related_articles: ["čl. 197. ZKOP RS"],
    headnote: "Žalba odbačena.",
    outcome: "defendant_won",
  },
  {
    case_number: "16 0 K 002087 25 Kz 4",
    decision_date: "2025-04-03",
    legal_question:
      "Da li su osnovane žalbe okužnog i branioca na prvostepenu presudu za teško ubistvo u stićaju s nedozvoljenim prometom oružja?",
    court_position:
      "Djelomično se uvažavaju žalbe i preinačuje se presuda u dijelu kazne (smanjenje glavne i jedinstvene kazne zatvora).",
    reasoning:
      "VS nalazi prostora za blaži odmjer kazne za teško ubistvo uz zadržavanje osude za prateće djelo.",
    keywords: ["preinačenje kazne", "teško ubistvo", "stićaj"],
    related_articles: ["čl. 125. KZ RS", "čl. 361. KZ RS", "čl. 56. KZ RS"],
    headnote: "Ublažena kazna po žalbama odbrane.",
    outcome: "partially",
  },
  {
    case_number: "16 0 K 002730 25 Kz 2",
    decision_date: "2025-06-19",
    legal_question:
      "Da li je osnovana žalba odbrane na rješenje Vrhovnog suda o pritvoru osumnjičenog za ubistvo?",
    court_position: "Žalba je odbačena kao neosnovana.",
    reasoning:
      "Ocjena prvostepenog VS rješenja o pritvoru ostaje neizmijenjena.",
    keywords: ["pritvor", "ubistvo čl. 124."],
    related_articles: ["čl. 337. ZKOP RS"],
    headnote: "Žalba na VS rješenje odbačena.",
    outcome: "defendant_won",
  },
  {
    case_number: "71 0 K 094613 13 Kvlz",
    decision_date: "2013-12-09",
    legal_question:
      "Da li je osnovan ZZL okružnog tužioca protiv oslobađajuće presude za tjelesnu povredu zbog uslova privatne tužbe?",
    court_position:
      "Uvažava se ZZL i utvrđuje da je povrijeđen zakon u korist okužnih.",
    reasoning:
      "Za djelo počinjeno prije izmjena KZ RS gonjenje po privatnoj tužbi nije bilo propisano; nakon stupanja izmjena na snagu potreban je prijedlog oštećenog, što prvostepeni sud nije osigurao prije odbijanja optužbe.",
    keywords: ["ZZL", "privatna tužba", "čl. 155. KZ RS"],
    related_articles: ["čl. 213. st. 2. ZKOP RS", "čl. 356. st. 2. ZKOP RS"],
    headnote:
      "Tužilac dobio ZZL; pravosnažna oslobađajuća ostaje neizmijenjena ali je utvrđena povreda zakona.",
    outcome: "plaintiff_won",
  },
]

function renderObj(o) {
  return [
    "  {",
    `    jurisdiction: "bih_rs",`,
    `    court: "Vrhovni sud Republike Srpske",`,
    `    court_level: "supreme",`,
    `    case_number: ${JSON.stringify(o.case_number)},`,
    `    decision_date: ${JSON.stringify(o.decision_date)},`,
    `    legal_area: "criminal",`,
    `    legal_question:`,
    `      ${JSON.stringify(o.legal_question)},`,
    `    court_position:`,
    `      ${JSON.stringify(o.court_position)},`,
    `    reasoning:`,
    `      ${JSON.stringify(o.reasoning)},`,
    `    keywords: ${JSON.stringify(o.keywords)},`,
    `    related_articles: ${JSON.stringify(o.related_articles)},`,
    `    headnote: ${JSON.stringify(o.headnote)},`,
    `    outcome: ${JSON.stringify(o.outcome)},`,
    "  },",
  ].join("\n")
}

if (batch2.length !== 44) {
  console.error("Expected 44 entries, got", batch2.length)
  process.exit(1)
}

const insertPoint = s.lastIndexOf("\n]")
if (insertPoint === -1) throw new Error("array close not found")

let body = s.slice(0, insertPoint).trimEnd()
if (!body.endsWith(",")) body += ","

const block =
  "\n\n  // --- Batch 2 of 3 (PDFs 47-91, 44 unique cases) ---\n" +
  batch2.map(renderObj).join("\n") +
  "\n"

fs.writeFileSync(path, body + block + "]\n")

const nums = batch2.map((x) => x.case_number)
console.log("Added", nums.length, "entries.")
console.log(nums.join("\n"))
