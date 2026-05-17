// scripts/case-law-labor-serbia-8.ts
// Serbian labor / anti-discrimination / wage decisions (86 cases in 3 batches: Kosovo supplement, minuli rad, SBPOK double pay, Vlada višak zaposlenih, constitutional complaints, Upravni sud).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_LABOR_SERBIA_8: CaseLawInput[] = [
  // ── BATCH 1 (29) — first third of digest (dedupe duplicate Gž1 368/2020 and second IUz 60/2021 block) ──
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Ustavna žalba (vezano za Rev2 388/2021)",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje kada nižestepeni sudovi proizvoljno tumače raniju odluku Ustavnog suda o saglasnosti vlasnika stanova za prenamenu zajedničkih prostorija?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje, jer su nižestepeni sudovi proizvoljno protumačili raniju odluku Ustavnog suda.",
    reasoning:
      "Sud je ocenio da nižestepeni sudovi nisu pravilno primenili ranije ustavnosudsko tumačenje o saglasnosti vlasnika, već su zaključili da je potrebna saglasnost svih vlasnika stanova, iako to Ustavni sud nije utvrdio. U istom kontekstu osporena je i revizija Vrhovnog kasacionog suda u sporu o obračunu plate (dvostruki iznos osnovne plate u SBPOK) u vezi sa veštačenjem i osnovicom obračuna.",
    keywords: ["ustavna žalba", "pravično suđenje", "proizvoljnost", "tumačenje", "saglasnost vlasnika"],
    related_articles: ["čl. 32. st. 1 Ustava", "čl. 36. st. 1 Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 383/2023",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni na Kosovu i Metohiji ima pravo na minimalnu zaradu i posebno uvećanje od 50% (kosovski dodatak) obračunato na taj iznos, umesto da se uvećanje koristi da se „dostigne“ minimalna zarada?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude i usvojio posebnu reviziju tužilje, prihvativši stav da se prvo utvrđuje pravo na minimalnu zaradu, a zatim na nju obračunava uvećanje od 50%.",
    reasoning:
      "Nižestepeni sudovi su odbili zahtev smatrajući da je ukupna isplaćena zarada (sa minulim radom i 50%) veća od obračuna minimalne zarade. Revizijski sud je ocenio da je materijalno pravo pogrešno primenjeno jer se svrha kosovskog dodatka gubi ako se tretira kao instrument za postizanje minima umesto kao dodatak na minimalnu zaradu.",
    keywords: ["Kosovo i Metohija", "minimalna zarada", "50%", "kosovski dodatak", "posebna revizija"],
    related_articles: ["Zakon o radu", "Zakon o platama AP i lokalne uprave", "Zakon o zaposlenima u AP i JLS"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 368/2020",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac ostaje vezan povoljnijim pravilnikom/ugovorom o obračunu minulog rada (0,5% za ceo staž) i posle zakonske izmene koja menja način obračuna?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je poslodavac obavezan da isplati razliku za minuli rad prema 0,5% za svaku navršenu godinu radnog staža, jer je to bilo ugovoreno i primenjivano povoljnije od kasnijeg obračuna 0,4% samo za staž kod poslodavca.",
    reasoning:
      "Utvrđeno je da je poslodavac u jednom delu perioda obračunavao 0,5% za svaku godinu radnog staža, a zatim 0,4% samo za godine kod poslodavca. Posle zahteva zaposlenog izvršen je delimični preračun; veštačenjem je utvrđena preostala razlika. Zaključak prvostepenog suda da su tužbeni zahtevi osnovani je pravilan.",
    keywords: ["minuli rad", "pravilnik o radu", "ugovor o radu", "0,5%", "0,4%", "povoljniji opšti akt"],
    related_articles: ["čl. 108. Zakona o radu", "čl. 114. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Spp 2/2019",
    legal_area: "labor",
    legal_question:
      "Da li javno preduzeće može kolektivnim ugovorom predvideti veći obračun uvećane zarade za minuli rad od iznosa ograničenog Zakonom o privremenom uređivanju osnovica?",
    court_position:
      "Vrhovni kasacioni sud je odbio zahtev Osnovnog suda u Nišu za zauzimanje pravnog stava, jer se o tom pitanju već izjasnio: ništave su odredbe koje povećavaju primanja u smislu čl. 4. Zakona o privremenom uređivanju osnovica.",
    reasoning:
      "Sud je naveo ranije odluke (Rev2 278/2017 i Rev2 857/2017) kojima su odbijene revizije tužilaca koji su tražili veća primanja po PKU zaključenom za vreme primene tog zakona. Isti princip se primenjuje i na spor oko minulog rada u javnim sredstvima.",
    keywords: ["pravni stav", "kolektivni ugovor", "privremeno uređivanje osnovica", "ništavost", "javna sredstva"],
    related_articles: ["čl. 4. Zakona o privremenom uređivanju osnovica", "čl. 108. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1637/2023",
    legal_area: "labor",
    legal_question:
      "Da li primena niže vrednosti radnog časa za preuzete radnike u roku od godinu dana nakon pripajanja predstavlja diskriminaciju po Zakonu o radu?",
    court_position:
      "Vrhovni sud je dozvolio posebnu reviziju, preinačio nižestepene presude i odbio tužbeni zahtev, smatrajući da primena različite vrednosti radnog časa u roku od godinu dana u skladu sa kolektivnim ugovorom prethodnika ne predstavlja diskriminaciju.",
    reasoning:
      "Nižestepeni sudovi su zauzeli stav da je došlo do diskriminacije jer je vrednost radnog časa za zaposlene iz pripojenog društva bila niža. Revizijski sud je ocenio da je poslodavac sledbenik mogao u roku iz čl. 150. Zakona o radu uskladiti akte i da primena pređašnjeg KU u predviđenom roku ne čini neopravdano pravljenje razlike u smislu čl. 18–20. Zakona o radu.",
    keywords: ["pripajanje", "vrednost radnog časa", "Kolektivni ugovor", "Kolubara", "diskriminacija"],
    related_articles: ["čl. 18–20. Zakona o radu", "čl. 150. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 382/2023",
    legal_area: "labor",
    legal_question:
      "Da li se kosovski dodatak od 50% obračunava na minimalnu zaradu, a ne tako da se „uklopi“ u postojeću osnovicu ispod minima?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude zbog pogrešne primene prava i zauzeo stav da se uvećanje od 50% mora obračunati na iznos minimalne zarade, jer bi suprotno obesmislilo svrhu dodatka.",
    reasoning:
      "Nižestepeni sudovi su odbili tužbu jer je ukupna isplaćena zarada bila veća od minimalne kada se uzme druga varijanta obračuna. VKS je istakao da se prvo garantuje minimum, zatim dodatak, te da se ne sme pomešati redosled i funkcija instituta.",
    keywords: ["Kosovo i Metohija", "minimalna zarada", "50%", "pogrešna primena", "ukidanje presude"],
    related_articles: ["Zaključak Vlade RS 05 broj 120-335/2007-14", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2089/2019",
    legal_area: "labor",
    legal_question:
      "Da li pritisak na penzionisanje i premeštaj na niže plaćena radna mesta predstavlja diskriminaciju po osnovu starosti?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio diskriminaciju: poslodavac nije dokazao da nije bilo diskriminacije po starosnom dobu.",
    reasoning:
      "Liste osnova diskriminacije nisu zatvorene. Kada su zaposlene učinile verovatnim diskriminatorsko ponašanje, a poslodavac ih je uslovljavao oko penzije i zatim premeštajem smanjivao zaradu pri istim poslovima, nižestepeni sudovi su pravilno primenili teret dokazivanja iz Zakona o radu i Zakon o zabrani diskriminacije.",
    keywords: ["diskriminacija", "starosno doba", "premeštaj", "penzija", "teret dokazivanja"],
    related_articles: ["čl. 18–23. Zakona o radu", "Zakon o zabrani diskriminacije"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2927/2020",
    legal_area: "labor",
    legal_question:
      "Da li vozači sanitetskog transporta mogu da se izjednače sa vozačima hitne pomoći radi utvrđivanje diskriminacije u visini koeficijenta?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilaca jer nisu u uporedivoj situaciji sa zaposlenima hitne medicinske pomoći, pa diskriminacije nema.",
    reasoning:
      "Za poslove sanitetskog transporta propisan je koeficijent u skladu sa uredbom za III stepen stručne spreme, dok veći koeficijent važi za radna mesta zdravstvenih radnika. Budući da tužioci nisu zdravstveni radnici u tom smislu, razlika u koeficijentu nije neopravdano pravljenje razlike.",
    keywords: ["sanitetski transport", "hitna pomoć", "koeficijent", "uporediva situacija", "diskriminacija"],
    related_articles: ["čl. 18–20. Zakona o radu", "Uredba o koeficijentima u javnim službama"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 364/2022",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac sledbenik može da isplaćuje nižu vrednost radnog časa preuzetim radnicima u roku od godinu dana posle statusne promene bez odgovornosti za diskriminaciju?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju tuženog, preinačio presude i odbio zahtev za naknadu štete, smatrajući pravilnom primenu kolektivnog ugovora prethodnika u roku od godinu dana.",
    reasoning:
      "Suprotno nižestepenim shvatanjima o diskriminaciji, revizijski sud je prihvatio da je poslodavac u predviđenom roku primenjivao opšti akt prethodnika i da to ne predstavlja neopravdano pravljenje razlike u smislu jednake zarade za isti rad.",
    keywords: ["statusna promena", "vrednost radnog časa", "Kolubara", "godinu dana", "naknada štete"],
    related_articles: ["čl. 150. Zakona o radu", "čl. 18–20. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1140/2021",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac dužan da isplati razliku zarade nakon pripajanja kada preuzetim radnicima primenjuje nižu vrednost radnog časa?",
    court_position:
      "Apelacioni sud je delimično preinačio prvostepenu presudu: odbio zahtev za period pre statusne promene, ali usvojio za period posle pripajanja i obavezao isplatu razlike, kamate i doprinosa.",
    reasoning:
      "Na poslodavcu je teret da dokaže jednakost obračuna sa uporednim radnicima iste vrednosti rada. Kada to nije učinjeno, pravilno je utvrđena diskriminacija po čl. 18–20. Zakona o radu zbog niže vrednosti radnog časa za zaposlene iz pripojenog društva.",
    keywords: ["pripajanje", "vrednost radnog časa", "teret dokazivanja", "kamata", "doprinosi"],
    related_articles: ["čl. 231. st. 3 ZPP", "čl. 18–20. Zakona o radu", "čl. 277. i 324. ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1879/2022",
    legal_area: "labor",
    legal_question:
      "Da li se kosovski dodatak od 50% obračunava na minimalnu zaradu kada je osnovna zarada niža od minimuma?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju tužioca, preinačio drugostepenu presudu i potvrdio prvostepenu, utvrdivši da se dodatak obračunava na minimalnu zaradu, a ne na nižu osnovnu zaradu.",
    reasoning:
      "Veštačenjem su utvrđene razlike do minimalne i do pripadajućeg dodatka. Drugostepeni sud je greškom prihvatio varijantu koja zanemaruje pravilan redosled (minimum pa dodatak). Revizija je ocenjena osnovanom.",
    keywords: ["minimalna zarada", "Kosovo", "50%", "preinačenje", "Prviština"],
    related_articles: ["Zaključak Vlade RS 05 broj 120-335/2007-14", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1838/2023",
    legal_area: "labor",
    legal_question:
      "Da li premeštaj na niže plaćeno radno mesto posle odbijanja ponude za prevremenu penziju predstavlja diskriminaciju po starosti?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio nižestepene presude kojima je utvrđena diskriminacija.",
    reasoning:
      "Primena čl. 16. Zakona o zabrani diskriminacije i čl. 23. st. 2. Zakona o radu: zaposleni učini verovatnim diskriminatorsko ponašanje, a poslodavac nije dokazao suprotno. Ponašanje poslodavca u kontekstu stimulacije odlaska u prevremenu penziju i premeštaja sa nižim koeficijentom vezuje se za starosno doba.",
    keywords: ["prevremena penzija", "premeštaj", "diskriminacija", "starosno doba", "teret dokazivanja"],
    related_articles: ["čl. 16. Zakona o zabrani diskriminacije", "čl. 23. st. 2. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUz 60/2021",
    legal_area: "labor",
    legal_question:
      "Da li je čl. 13. st. 1. Zakona o finansijskoj podršci porodici sa decom u saglasnosti sa Ustavom ako drugačije računa osnovicu naknade zarade za porodiljsko odsustvo za žene sa komplikacijama trudnoće?",
    court_position:
      "Ustavni sud je utvrdio neustavnost osporene odredbe jer razlikovanje u računanju relevantnog perioda od 18 meseci nema objektivno i razumno opravdanje.",
    reasoning:
      "Privremena sprečenost po drugim osnovima iz ZZO ne utiče na način računanja 18 meseci za prosečnu zaradu, osim u osporenom režimu za komplikacije trudnoće. To stavlja žene u drugačiju situaciju bez legitimnog cilja i proporcionalnosti (čl. 21. st. 1. i 3. Ustava).",
    keywords: ["porodiljsko odsustvo", "naknada zarade", "diskriminacija", "trudnoća", "neustavnost"],
    related_articles: ["čl. 13. st. 1. Zakona o finansijskoj podršci porodici sa decom", "čl. 21. Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1309/2023",
    legal_area: "labor",
    legal_question:
      "Da li osnovna zarada može biti niža od minimalne i da li se kosovski dodatak obračunava na minimalnu osnovicu odvojeno?",
    court_position:
      "Vrhovni sud je preinačio nižestepene presude i usvojio tužbeni zahtev: osnovna zarada ne može biti niža od minimalne, a dodatak za rad na KiM se obračunava na taj iznos.",
    reasoning:
      "Veštačenjem je pokazano da u pojedinim mesecima osnovica ispod minima dovodi do neisplaćenog dela i neisplaćenog dela dodatka. Drugostepeni sud je greškom zasnivao odbijanje na agregatnoj „drugoj varijanti“ koja ne isključuje povredu minima po mesecima.",
    keywords: ["minimalna zarada", "Kosovo", "50%", "preinačenje", "osnovica"],
    related_articles: ["čl. 111–112. Zakona o radu", "Zaključak Vlade RS 05 broj 120-335/2007-14"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 686/2021",
    legal_area: "labor",
    legal_question:
      "Da li preuzeti radnici imaju pravo na jednaku zaradu za rad iste vrednosti posle statusne promene poslodavca?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i delimično usvojio tužbeni zahtev, obavezujući poslodavca na isplatu razlike zarade i kamate za period kada je primenjivana niža vrednost radnog časa.",
    reasoning:
      "Teret dokazivanja jednakosti isplate je na poslodavcu (čl. 231. st. 3. ZPP). Bez dokaza o jednakosti sa uporednim radnikom, utvrđena je diskriminacija po čl. 18–20. Zakona o radu.",
    keywords: ["pripajanje", "vrednost radnog časa", "jednaka zarada", "kamata"],
    related_articles: ["čl. 18–20. Zakona o radu", "čl. 231. st. 3 ZPP"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3164/2022",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni na Kosovu i Metohiji ima pravo prvo na minimalnu zaradu, a zatim na uvećanje od 50% (kosovski dodatak) obračunato na taj iznos?",
    court_position:
      "Vrhovni kasacioni sud je usvojio reviziju i preinačio drugostepenu presudu, utvrdivši da se kosovski dodatak obračunava na iznos minimalne zarade; suprotno stanovište bi obesmislilo svrhu dodatka.",
    reasoning:
      "Prvostepeni sud je prihvatio prvu varijantu veštaka po kojoj je u pojedinim mesecima isplata ispod minimalne zarade, pa su osnovani zahtevi za razliku do minima i za razliku na ime 50% u skladu sa Zaključkom Vlade. Drugostepeni sud je pogrešno primenio pravo kada je zanemario taj redosled.",
    keywords: ["Kosovo i Metohija", "minimalna zarada", "kosovski dodatak", "50%", "preinačenje"],
    related_articles: ["Zaključak Vlade RS 05 broj 120-335/2007-14", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3471/2012",
    legal_area: "labor",
    legal_question:
      "Da li je ustavnopravno prihvatljivo ograničenje isplate zarada u javnim preduzećima kada zaposleni traži razliku po PKU?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu i prihvatio stav redovnih sudova o ograničenjima isplate u javnim preduzećima i teretu dokazivanja.",
    reasoning:
      "Ustavni sud nije našao povredu ustavnih prava u odluci koja odbija primarni zahtev, a delimično usvaja drugi eventualni zahtev vezan za razliku osnovice i koeficijenta, jer je postupak i merodavno pravo ocenjeni kao ustavnoprihvatljivi u konkretnom sporu o javnom preduzeću.",
    keywords: ["javno preduzeće", "kolektivni ugovor", "osnovica", "ustavna žalba"],
    related_articles: ["čl. 32. Ustava", "čl. 58. Ustava"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1725/2012",
    legal_area: "labor",
    legal_question:
      "Da li je pravno poništiti aneks ugovora o radu kojim je sindikalni predstavnik premešten na posao sa većim koeficijentom ali manjim ukupnim primanjima zbog smanjenja dežurstava i dodatnog rada?",
    court_position:
      "Apelacioni sud je potvrdio poništenje aneksa i obavezu isplate razlike plate, jer je premeštaj doveo do stavljanja sindikalnog predstavnika u nepovoljniji položaj.",
    reasoning:
      "Iako je koeficijent radnog mesta formalno veći, ukupna primanja od dežurstava i dodatnog rada su niža u odnosu na prethodno mesto. Sud je ocenio da je to protivno zabrani zlostavljanja sindikalnih predstavnika i principu fer obračuna.",
    keywords: ["sindikat", "aneks ugovora o radu", "premeštaj", "dežurstvo", "poništenje"],
    related_articles: ["čl. 178–180. Zakona o radu", "čl. 114. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 11196/2019",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje kada sudovi ne obrazlože zašto je povoljnija odredba kolektivnog ugovora o minulom radu u suprotnosti sa zakonom?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na pravično suđenje zbog nedostatka razumljivog obrazloženja (proizvoljnost).",
    reasoning:
      "Žalba ističe suprotstavljene stavove sudova o primeni čl. 8. st. 2. Zakona o radu i kolektivnog ugovora koji vezuje minuli rad za beneficirani staž. Ustavni sud konstatuje da nižestepeni sudovi nisu razloženo odgovorili zašto je PKU u suprotnosti sa imperativnim zakonima, što čini odluku proizvoljnom.",
    keywords: ["pravično suđenje", "kolektivni ugovor", "minuli rad", "beneficirani staž", "proizvoljnost"],
    related_articles: ["čl. 32. st. 1 Ustava", "čl. 8. st. 2. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1243/2021",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni na istom radnom mestu i istoj stručnoj spremi može da traži razliku zarade kada mu je isplaćivan manji koeficijent od koleginice?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i usvojio zahtev za naknadu štete (razliku zarade), jer je ista vrednost rada vrednovana različito bez opravdanog razloga.",
    reasoning:
      "Primena čl. 104 i 164 Zakona o radu i čl. 154 ZOO: vrednost radnog časa mora biti ista za isti posao kod istog poslodavca. Različit koeficijent za identičan posao predstavlja diskriminaciono neravnopravno postupanje.",
    keywords: ["jednaka zarada", "koeficijent", "Dunav osiguranje", "diskriminacija", "naknada štete"],
    related_articles: ["čl. 104. Zakona o radu", "čl. 154. ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 4099/2017",
    legal_area: "labor",
    legal_question:
      "Da li vozač saniteta u hitnoj pomoći ima pravo na koeficijent propisan za zdravstvene radnike (13,57)?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: vozač nije zdravstveni radnik u smislu uredbe, pa mu je pravilno određen niži koeficijent (10,71).",
    reasoning:
      "Opis poslova i uredbeni koeficijenti pokazuju da veći koeficijent važi za radna mesta medicine. Ugovor i pravilnik su saglasni sa tim, pa nema osnova za razliku ni za prateći minuli rad po drugačijem procentu.",
    keywords: ["vozač", "hitna pomoć", "koeficijent", "medicinska struka", "Uredba"],
    related_articles: ["Uredba o koeficijentima u javnim službama", "čl. 104. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1469/2022",
    legal_area: "labor",
    legal_question:
      "Da li se u minuli rad uračunava staž kod prethodnog poslodavca ako nije dokazana veza pravnog prethodnika ili povezanosti?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio odbijanje tužbe jer nije dokazana veza sa prethodnim poslodavcem potrebna za širi obračun minulog rada.",
    reasoning:
      "Po čl. 108. Zakona o radu minuli rad se primarno vezuje za staž kod trenutnog poslodavca, uz izuzetke za pravnog prethodnika i povezana lica. Kolektivni ugovor kod tuženog predviđa 0,4% od osnovice, ali to ne nadoknaduje nedostatak dokaza o povezanosti sa ranijim poslodavcem.",
    keywords: ["minuli rad", "pravni prethodnik", "povezano lice", "dokazivanje", "čl. 108"],
    related_articles: ["čl. 108. Zakona o radu", "čl. 147. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1131/2023",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni u javnom sektoru ima pravo na minuli rad za godine rada kod ranijih poslodavaca u javnom sektoru prema PKU i rešenju?",
    court_position:
      "Vrhovni sud je odbio reviziju Grada Valjeva i potvrdio pravo zaposlenog na uvećanje za minuli rad stečen u javnom sektoru, u skladu sa rešenjem i PKU.",
    reasoning:
      "Nakon rešenja kojim je proširen obračun na 19+ godina javnog sektora, poslodavac je dužan da primeni odobreno pravo. Revizija osporava materijalno pravo bez uspeha; bitna povreda postupka nije utvrđena.",
    keywords: ["minuli rad", "javni sektor", "Grad Valjevo", "PKU", "rešenje"],
    related_articles: ["Posebni kolektivni ugovor", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2680/2016",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni u SBPOK mora da pokrene upravni spor da bi ostvario uvećanu platu po posebnom zakonu ili pravo nastaje direktno?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo nižestepene presude i usvojio reviziju kao izuzetno dozvoljenu: pravo na uvećanu platu nastaje direktno po zakonu/uredbi bez prethodnog upravnog postupka protiv rešenja o koeficijentu.",
    reasoning:
      "U konkretnom sporu o zaposlenoj u Službi za suzbijanje organizovanog kriminala utvrđeno je da je zaštita prava iscrpljena parnicom, a da administrativno osporavanje rešenja nije uslov za ostvarivanje zakonom predviđenog uvećanja plate.",
    keywords: ["SBPOK", "upravni postupak", "uvećana plata", "MUP", "izuzetno dozvoljena revizija"],
    related_articles: ["Zakon o organizaciji i nadležnosti državnih organa u suzbijanju OK", "Uredba o platama u SBPOK"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3392/2021",
    legal_area: "labor",
    legal_question:
      "Da li javno preduzeće može isplatiti topli obrok, regres i minuli rad po PKU kada je to u suprotnosti sa Programom poslovanja i Zakonom o privremenom uređivanju osnovica?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio odbijanje tužbe, jer je poslovanje tuženog ograničeno programom i zakonom o privremenom uređivanju osnovica.",
    reasoning:
      "Program poslovanja isključuje primenu PKU u delu koji povećava zaradu i dodatna primanja suprotno zakonu. Naknade iz čl. 108. Zakona o radu ulaze u pojam zarade koji je predmet ograničenja.",
    keywords: ["javno preduzeće", "Program poslovanja", "privremeno uređivanje osnovica", "minuli rad", "regres"],
    related_articles: ["Zakon o privremenom uređivanju osnovica", "Uredba o obračunu zarada u javnim preduzećima", "čl. 108. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2503/2019",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac mora neposredno primeniti granski kolektivni ugovor za uvećanu zaradu za rad u smenama kada interni akt nije usklađen?",
    court_position:
      "Vrhovni kasacioni sud je odbacio reviziju tužilaca zbog nedostatka pravnog interesa i vrednosnog cenzusa, a odbio reviziju tuženog i potvrdio obavezu primene povoljnijeg granskog KU za smenski rad.",
    reasoning:
      "Utvrđeno je da tužena nije ispravno obračunavala uvećanje za drugu smenu u odnosu na Posebni granski KU za metalsku industriju. Osnovica za obračun uvećanja ostaje ugovorena osnovna/startna zarada, a razlika je utvrđena veštačenjem.",
    keywords: ["granski kolektivni ugovor", "smenski rad", "metalna industrija", "revizija", "cenzus"],
    related_articles: ["Posebni kolektivni ugovor za metalsku industriju", "čl. 108. Zakona o radu"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 96/2024",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac dužan da isplati razliku zarade kada obračunava plate po nižem koeficijentu od ugovorenog kod JP EPS?",
    court_position:
      "Apelacioni sud je odbio žalbu tuženog i potvrdio prvostepenu presudu koja obavezuje na isplatu razlike do ugovorenih koeficijenata.",
    reasoning:
      "Iz isplatnih lista proizilazi sistematsko odstupanje od ugovorenih koeficijenata; minuli rad je obračunavan u manjem procentu. Metodologija JP EPS predviđa unos koeficijenata u ugovore, pa je poslodavac dužan da isplati razliku.",
    keywords: ["JP EPS", "koeficijent", "ugovor o radu", "isplatna lista", "razlika zarade"],
    related_articles: ["čl. 104–108. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  // ── BATCH 2 (29) ──
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3212/2022",
    legal_area: "labor",
    legal_question:
      "Da li je tužilja učinila verovatnim akt diskriminacije zbog manje isplaćene naknade zarade i drugih tvrdnji u sporu sa poslodavcem?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilje i potvrdio nižestepene presude kojima je tužbeni zahtev odbijen kao neosnovan.",
    reasoning:
      "Utvrđeno je da tužilja nije učinila verovatnim diskriminatorsko ponašanje poslodavca u smislu Zakona o zabrani diskriminacije i Zakona o radu. Delimično usvojen raniji zahtev za naknadu zbog privremene sprečenosti ne menja ocenu o nedostatku elementa diskriminacije za traženo utvrđenje.",
    keywords: ["diskriminacija", "teret dokazivanja", "verovatnoća", "PTT", "naknada zarade"],
    related_articles: ["čl. 18–20. Zakona o radu", "Zakon o zabrani diskriminacije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3041/2024",
    legal_area: "labor",
    legal_question:
      "Da li u dvostruku platu u SBPOK ulazi i minuli rad na prethodnom radnom mestu u MUP-u, ili samo „gola“ osnovica?",
    court_position:
      "Vrhovni sud je usvojio reviziju tužioca i preinačio drugostepenu presudu: dvostruka plata obuhvata i minuli rad i redovna uvećanja koja bi ostvario na prethodnom mestu, a ne samo osnovicu bez dodataka.",
    reasoning:
      "Jezičko tumačenje čl. 18. st. 1. Zakona o organizaciji državnih organa za suzbijanje OK i svrha Uredbe o platama u SBPOK zahtevaju da svako uvećanje plate na ranijem mestu posledično uvećava dvostruki iznos u službi. Drugostepeni stav koji isključuje minuli rad predstavlja pogrešnu primenu materijalnog prava.",
    keywords: ["SBPOK", "dvostruka plata", "minuli rad", "MUP", "Uredba o platama"],
    related_articles: ["čl. 18. Zakona o organizaciji i nadležnosti državnih organa u suzbijanju OK", "Uredba o platama u SBPOK"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1586/2024",
    legal_area: "labor",
    legal_question:
      "Da li Zakon o radu o minimalnoj zaradi važi i za civilno lice zaposleno u Vojsci Srbije kada je isplaćena osnovica ispod minimuma?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je Republika Srbija obavezana na isplatu razlike do minimalne zarade i pravilnu primenu uvećanja na minimalnu osnovicu.",
    reasoning:
      "Veštačenjem je utvrđeno da je osnovna zarada bila niža od zakonskog minimuma, što utiče na obračun minulog rada, rada na praznik i „vojnog“ dodatka. Primenjuju se čl. 108, 114 i 115 Zakona o radu kao opšti standard i za ovu kategoriju zaposlenih.",
    keywords: ["Vojska Srbije", "civilno lice", "minimalna zarada", "minuli rad", "vojni dodatak"],
    related_articles: ["čl. 111. Zakona o radu", "čl. 108–115. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 377/2015",
    legal_area: "labor",
    legal_question:
      "Da li se beneficirani radni staž (penzijsko osiguranje) uračunava u godine za obračun minulog rada?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva: minuli rad se odnosi na efektivno provedeno vreme u radnom odnosu kod poslodavca, a ne na uvećani staž osiguranja.",
    reasoning:
      "Staž osiguranja sa beneficijom služi za penzijsko osiguranje, ne i automatski za uvećanje zarade po osnovu minulog rada. Poslodavac je pravilno obračunavao minuli rad za navršene godine na radu prema merodavnom pravilniku.",
    keywords: ["minuli rad", "beneficirani staž", "staž osiguranja", "efektivni rad"],
    related_articles: ["čl. 108. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 594/2024",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni u javnoj službi može posebno da traži topli obrok i regres kada su po Zakonu o platama ugrađeni u koeficijent plate?",
    court_position:
      "Vrhovni sud je dozvolio posebnu reviziju, preinačio nižestepene presude i odbio tužbeni zahtev za posebnu isplatu toplog obroka i regresa.",
    reasoning:
      "Kod obračuna plate množenjem osnovice i koeficijenta, naknade za ishranu i regres su sadržani u koeficijentu u smislu Zakona o platama u državnim organima i javnim službama, pa nema dvostruke isplate iako je osnovica dopunjavana do minima.",
    keywords: ["topli obrok", "regres", "koeficijent plate", "javna služba", "Zakon o platama"],
    related_articles: ["Zakon o platama u državnim organima i javnim službama", "čl. 118. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1282/2022",
    legal_area: "labor",
    legal_question:
      "Da li Apelacioni sud mora primeniti Zakon o privremenom uređivanju osnovica kada utvrđuje ništavost sporazumnih uvećanja u javnom sektoru?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo presudu Apelacionog suda i vratio predmet na ponovno odlučivanje jer je propuštena primena zakona o privremenom uređivanju osnovica.",
    reasoning:
      "Veštačenjem je utvrđena razlika po minulom radu prema pravilniku; prvostepeni sud je odbio tužbu. Drugostepeni sud nije ocenio ništavost sporazumnih odredbi koje povećavaju elemente obračuna suprotno imperativu za korisnike javnih sredstava.",
    keywords: ["privremeno uređivanje osnovica", "minuli rad", "ukidanje", "javni sektor"],
    related_articles: ["Zakon o privremenom uređivanju osnovica", "čl. 374. st. 2 tačka 2 ZPP"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3144/2020",
    legal_area: "labor",
    legal_question:
      "Da li je revizija dozvoljena za utvrđenje zlostavljanja na radu i da li tužilac dokazuje diskriminaciju?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju u delu diskriminacije jer tužilac nije učinio verovatnim akt diskriminacije, a u delu zlostavljanja revizija je odbačena kao nedozvoljena jer ta vrsta spora ne podleže reviziji.",
    reasoning:
      "Za diskriminaciju važi logika tereta i verovatnoće iz čl. 23. Zakona o radu. Zlostavljanje na radu kao predmet spora nije u revizibilnoj kategoriji, pa je revizija u tom delu odbačena po službenoj dužnosti.",
    keywords: ["diskriminacija", "zlostavljanje na radu", "revizija", "nedozvoljena revizija"],
    related_articles: ["čl. 404. ZPP", "Zakon o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1095/2025",
    legal_area: "labor",
    legal_question:
      "Da li JMU RTS dužan da isplati razliku zarade vozaču kada je na istom radnom mestu primenjivan manji koeficijent od koleginice?",
    court_position:
      "Apelacioni sud je potvrdio obavezu isplate razlike; preinačen je deo o ništavosti aneksa jer odredba sama po sebi nije protivzakonita, već je problem u primeni koja je dovela do manje isplate.",
    reasoning:
      "Veštačenjem je utvrđena razlika između isplate po koeficijentu 2,8 i pripadajuće zarade po 3,5 za isti posao i istu stručnu spremu. Primena čl. 104. Zakona o radu zahteva jednaku vrednost rada.",
    keywords: ["RTS", "jednaka zarada", "koeficijent", "naknada štete", "aneks"],
    related_articles: ["čl. 104. Zakona o radu", "čl. 154. ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2511/2023",
    legal_area: "labor",
    legal_question:
      "Da li tužilac ostvaruje pravo na vraćanje na rad kada je u međuvremenu stekao starosnu penziju, i da li mu pripada naknada štete zbog nezakonitog otkaza?",
    court_position:
      "Vrhovni sud je odbio revizije obe strane i potvrdio odluku koja je odbila vraćanje na rad zbog penzije, ali dosudila naknadu štete zbog nezakonitog otkaza.",
    reasoning:
      "Visina izgubljene zarade utvrđena je veštačenjem u varijantama; drugostepeni sud je pravilno razgraničio materijalnopravne posledice otkaza i status penzionisanja koji isključuje reinstatement.",
    keywords: ["nezakonit otkaz", "naknada štete", "starosna penzija", "vraćanje na rad"],
    related_articles: ["čl. 191–192. Zakona o radu", "čl. 172. ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 5493/2023",
    legal_area: "labor",
    legal_question:
      "Da li zaposlenoj u zdravstvenoj ustanovi pripadaju posebno topli obrok i regres i razlike u uvećanjima plate kada se primenjuje Zakon o platama i PKU?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva za topli obrok i regres kao sastavni deo koeficijenta, ali ukinuo deo o odbijanju razlika za rad praznikom, nedeljom i minuli rad i vratio na ponovno suđenje.",
    reasoning:
      "Prvostepeni sud je delimično pogrešno prihvatio nalaz veštaka za dodatke na minimalnu zaradu suprotno čl. 2. Zakona o platama i PKU za zdravstvene ustanove. Za topli obrok/regres važi režim ugrađivanja u koeficijent.",
    keywords: ["zdravstvena ustanova", "topli obrok", "regres", "minuli rad", "ponovno suđenje"],
    related_articles: ["Zakon o platama u državnim organima i javnim službama", "Posebni kolektivni ugovor za zdravstvo", "čl. 108–113. Zakona o radu"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3665/2023",
    legal_area: "labor",
    legal_question:
      "Da li dvostruka plata u SBPOK uključuje sva redovna uvećanja osnovne plate na prethodnom radnom mestu u MUP-u, a ne samo fiksni iznos iz meseca pre prelaska?",
    court_position:
      "Vrhovni sud je usvojio reviziju i preinačio drugostepenu presudu, potvrdivši prvostepenu: merilo je dvostruki iznos plate sa prethodnog mesta sa svim naknadnim uvećanjima uključujući minuli rad.",
    reasoning:
      "Veštačenje pokazuje veću razliku kada se uračunaju uvećanja. Drugostepeni stav da je dovoljna osnovica iz meseca pre prelaska bez kasnijih promena suprotan je pravilnom tumačenju Uredbe i čl. 18. Zakona o organizaciji državnih organa za suzbijanje OK.",
    keywords: ["SBPOK", "dvostruka plata", "minuli rad", "MUP", "preinačenje"],
    related_articles: ["Uredba o platama u SBPOK", "čl. 172. ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2216/2023",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni u predškolskoj ustanovi na KiM ima pravo na minimalnu zaradu i kosovski dodatak prema pravilima za minimalnu zaradu i školski PKU?",
    court_position:
      "Vrhovni sud je dozvolio posebnu reviziju i preinačio nižestepene presude usvajajući tužbeni zahtev za razliku do minima i dodatka od 50%.",
    reasoning:
      "Nižestepeni sudovi su grešili kada su odbili zahtev zbog agregatno veće isplate; primenjeni su čl. 111–112. Zakona o radu u vezi sa čl. 52. st. 2. Zakona o predškolskom vaspitanju i PKU za škole koji podižu osnovicu ispod minimuma na nivo minimalne zarade.",
    keywords: ["predškolska ustanova", "Kosovo", "minimalna zarada", "kosovski dodatak"],
    related_articles: ["Zakon o predškolskom vaspitanju i obrazovanju", "Posebni kolektivni ugovor za škole", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 4247/2024",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac dužan da isplati razliku zarade, minuli rad i rad na praznik kada primenjuje niži koeficijent od ugovorenog?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je JP „Elektrokosmet“ obavezan na isplate razlika za koeficijent 2,30 umesto 1,835, uključujući prateća uvećanja i doprinose.",
    reasoning:
      "Utvrđeno je da u periodu od oktobra 2014. do oktobra 2017. nije isplaćena puna zarada po ugovorenom koeficijentu, što automatski umanjuje i obračun minulog rada i rada na praznik.",
    keywords: ["Elektrokosmet", "koeficijent", "minuli rad", "praznik", "doprinosi"],
    related_articles: ["čl. 108. Zakona o radu", "Zakon o doprinosima"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3305/2023",
    legal_area: "labor",
    legal_question:
      "Da li je potraživanje naknade materijalne štete (izgubljene zarade) zbog diskriminacije zastarelo kada teče rok od saznanja za štetu?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio zastarelost potraživanja prema čl. 376. ZOO (tri godine subjektivno, pet objektivno).",
    reasoning:
      "Šteta se vezuje za rad kod trećeg lica nakon diskriminacije u zaposlenju; rokovi zastarelosti teku od saznanja o šteti, a ne od pravnosnažnog utvrđenja diskriminacije poravnanjem. Primena čl. 43–45. Zakona o zabrani diskriminacije uz subsidiarno ZOO.",
    keywords: ["zastarelost", "diskriminacija", "izgubljena zarada", "ZOO"],
    related_articles: ["čl. 43–45. Zakona o zabrani diskriminacije", "čl. 376. ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2611/2022",
    legal_area: "labor",
    legal_question:
      "Da li isplata kolegi po drugačijoj sudskoj odluci i potpis naloga od strane direktora predstavlja diskriminaciju prema tužiocu koji je spor izgubio?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: različite sudske odluke i isplate po njima nisu same po sebi diskriminacija bez ličnog svojstva i uzročne veze.",
    reasoning:
      "Direktor je delovao kao ovlašćeno lice poslodavca; razlika u ishodu sporova sa različitim činjeničnim osnovama ne dokazuje diskriminaciju po osnovu iz čl. 2. Zakona o zabrani diskriminacije.",
    keywords: ["diskriminacija", "EPS", "smenski rad", "pasivna legitimacija"],
    related_articles: ["čl. 2. Zakona o zabrani diskriminacije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 289/2023",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni u javnoj službi može da traži posebnu isplatu toplog obroka i regresa kada su ugrađeni u koeficijent plate?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio stav da su naknade za ishranu i regres sadržane u koeficijentu u smislu Zakona o platama.",
    reasoning:
      "Čl. 4. st. 2. Zakona o platama izričito utvrđuje da koeficijent sadrži i te naknade. Prvostepeni sud je greškom usvojio zahtev mimo tog modela; revizijski sud je preinačio i odbio tužbeni zahtev.",
    keywords: ["topli obrok", "regres", "koeficijent", "javna služba"],
    related_articles: ["Zakon o platama u državnim organima i javnim službama", "čl. 105. st. 3 Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2030/2022",
    legal_area: "labor",
    legal_question:
      "Da li prestanak radnog odnosa zbog statusa „radno neangažovanog zaposlenog“ i minimalne zarade predstavlja diskriminaciju?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da nema diskriminacije jer odluka nije bila zasnovana na ličnom svojstvu tužioca.",
    reasoning:
      "Program rešavanja viška zaposlenih i Zaključak o minimalnoj zaradi za zaposlene sa KiM čine pravni okvir prestanka. Nije utvrđeno da je postupanje motivisano bilo kojim osnovom iz čl. 2. Zakona o zabrani diskriminacije.",
    keywords: ["KBC Priština", "višak zaposlenih", "minimalna zarada", "diskriminacija"],
    related_articles: ["čl. 2. Zakona o zabrani diskriminacije", "čl. 21. Ustava"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 502/2017",
    legal_area: "labor",
    legal_question:
      "Da li rad u dve smene sa sedmičnom rotacijom daje pravo na uvećanu zaradu za smenski rad u skladu sa direktivama EU?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je poslodavac obavezan na isplatu uvećanja za smenski rad jer je organizacija rada ispunjava uslove za smenu u smislu zakona.",
    reasoning:
      "Opis radnog mesta predviđa rad u smenama; nakon spornog perioda izmena ugovora ne utiče na utvrđeno pravo za prošlost. Primenjuju se pravila o uvećanoj zaradi za smenu.",
    keywords: ["smenski rad", "dve smene", "rotacija", "uvećana zarada", "EU direktive"],
    related_articles: ["čl. 108. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Novom Sadu",
    court_level: "appellate",
    case_number: "Gž1 1703/2011",
    legal_area: "labor",
    legal_question:
      "Da li je radni odnos na neodređeno vreme zasnovan stupanjem na rad bez pisanog ugovora i da li je kasniji ugovor koji menja mesto rada nezakonit?",
    court_position:
      "Apelacioni sud je odbio žalbu tuženog i potvrdio utvrđenje radnog odnosa na neodređeno vreme od dana stupanja na rad, uz poništenje kasnijeg ugovora koji nezakonito menja mesto rada.",
    reasoning:
      "Primena pravila o fikciji punog radnog odnosa kada poslodavac ne dostavi pisan ugovor u roku. Naknade i kamata prate osnovni spor o statusu zaposlenja.",
    keywords: ["radni odnos na neodređeno vreme", "stupanje na rad", "poništenje ugovora", "Novosadski apelacioni"],
    related_articles: ["čl. 10–19. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1921/2018",
    legal_area: "labor",
    legal_question:
      "Da li se naknada za prekovremeni rad može dosuditi na osnovu prosečnih sati umesto stvarno ostvarenih sati?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilaca i potvrdio odbijanje: pravo na uvećanje postoji samo za stvarno ostvareni prekovremeni rad, a teret dokazivanja je na tužiocima.",
    reasoning:
      "Prvostepeni sud je greškom prihvatio prosečne sate iz veštačenja; drugostepeni je pravilno primenio čl. 108. st. 1. tačka 3. Zakona o radu i odbio zahtev. Revizija ne pokazuje pogrešnu primenu.",
    keywords: ["prekovremeni rad", "stvarno ostvareni sati", "veštačenje", "teret dokazivanja"],
    related_articles: ["čl. 108. st. 1. tačka 3. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 3964/2024",
    legal_area: "labor",
    legal_question:
      "Da li posle izmena Zakona o radu iz 2014. postoji pravo na uvećanje za smenski rad bez posebne ugovorne ili aktovske osnove?",
    court_position:
      "Apelacioni sud je odbio tužbeni zahtev jer smenski rad više ne nosi zakonsko uvećanje ako nije predviđeno ugovorom ili opštim aktom.",
    reasoning:
      "Ugovor i pravilnik tuženog za sporni period nisu predviđali 26% za smenu; primenjene su odredbe čl. 45. pravilnika i kolektivnog ugovora o strukturi zarade.",
    keywords: ["smenski rad", "izmene Zakona o radu 2014", "ugovor o radu", "inkasant"],
    related_articles: ["čl. 108. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 4187/2022",
    legal_area: "labor",
    legal_question:
      "Da li policijski službenik može da traži razliku plate zbog postepenog usklađivanja koeficijenata po Zakonu o policiji i budžetu?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe jer je obračun bio u skladu sa čl. 187b Zakona o policiji i rešenjem o koeficijentu i obračunskoj metodi.",
    reasoning:
      "Usklađivanje zatečene plate sa novom osnovicom može da traje kroz obračunski koeficijent dok se izjednače iznosi; tužilac je ostvarivao platu po zakonitom modelu MUP-a.",
    keywords: ["MUP", "Zakon o policiji", "koeficijent plate", "usklađivanje"],
    related_articles: ["čl. 187b Zakona o policiji"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 548/2025",
    legal_area: "labor",
    legal_question:
      "Da li se radni učinak (kapitacija) može uračunati u osnovicu koja se poredi sa minimalnom zaradom u zdravstvu?",
    court_position:
      "Vrhovni sud je preinačio presude i dosudio razliku do minimalne zarade: kapitacija je poseban element i ne sme da zameni garantovanu osnovicu do zakonskog minimuma.",
    reasoning:
      "Minimalna zarada važi za standardni učinak; spajanje kapitacije sa doplatom do minima dovodi do „preskačenja“ prava na minimum. Dopunski nalaz veštaka potvrđuje metodologiju suda.",
    keywords: ["minimalna zarada", "kapitacija", "zdravstvo", "osnovica"],
    related_articles: ["čl. 111–112. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 60/2024",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac dužan da isplati razliku kada je osnovna zarada vozača bila niža od minimalne, sa posledicama po minuli rad, noćni rad i ostala uvećanja?",
    court_position:
      "Apelacioni sud je potvrdio presudu protiv „Lasta“ a.d. koja obavezuje na isplatu razlika do minimuma i pratećih uvećanja utvrđenih veštačenjem.",
    reasoning:
      "Veštak je podelio razliku na osnovicu, minuli rad, noćni rad, praznik, godišnji odmor i privremenu sprečenost. Osnovica ispod minima povlači lančano umanjenje svih procenata.",
    keywords: ["Lasta", "minimalna zarada", "vozač", "veštačenje"],
    related_articles: ["čl. 111–113. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3691/2024",
    legal_area: "labor",
    legal_question:
      "Da li se pri utvrđivanju ispunjenja minimalne zarade u zdravstvu uračunava isplata po osnovu radnog učinka (kapitacija)?",
    court_position:
      "Vrhovni sud je preinačio nižestepene presude: osnovna plata ne može biti ispod minimuma, a radni učinak je samostalan dodatak koji ne zamenjuje doplatu do minima.",
    reasoning:
      "Nižestepeni sudovi su grešili kada su u poređenju sa minimumom zbirali osnovicu, korektiv i kapitaciju kao jednu „isplaćenu“ osnovu. Dopunski nalaz veštaka pokazuje ispunjenost minimuma tek uz pogrešnu agregaciju.",
    keywords: ["minimalna zarada", "kapitacija", "zdravstvo", "preinačenje"],
    related_articles: ["čl. 111. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 2224/2024",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac dužan da isplati razliku kada je vrednost radnog časa za obračun niža od minimalne cene rada?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je „Putevi Srbije“ obavezan na isplatu razlika inkasantu jer je osnovica ispod minima uticala na sva procenata uvećanja.",
    reasoning:
      "Veštak je utvrdio zakonitu minimalnu vrednost radnog časa; niža vrednost boda umanjuje osnovnu zaradu i sve zavisne stavke (praznik, noć, minuli rad).",
    keywords: ["Putevi Srbije", "inkasant", "vrednost radnog časa", "minimalna zarada"],
    related_articles: ["čl. 104–113. Zakona o radu", "Posebni kolektivni ugovor za putnu privredu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 352/2025",
    legal_area: "labor",
    legal_question:
      "Da li Dom zdravlja može da tretira radni učinak kao deo isplate koja zadovoljava obavezu minimalne zarade?",
    court_position:
      "Vrhovni sud je usvojio reviziju tužilje i preinačio presude: minimalna zarada se odnosi na osnovicu pre kapitacije; radni učinak ne sme da maskira ispodminimalnu osnovnu platu.",
    reasoning:
      "Isti pravni princip kao u seriji predmeta o kapitaciji i korektivnom koeficijentu; dopunski nalaz veštaka razgraničava komponente plate.",
    keywords: ["Dom zdravlja", "minimalna zarada", "Kragujevac", "kapitacija"],
    related_articles: ["čl. 111. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  // ── BATCH 3 (28) — final third of digest ──
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 13303/2014",
    legal_area: "procedural",
    legal_question:
      "Da li je Upravni sud stvarno nadležan za spor o obračunu plate i minulog rada zamenika javnog tužioca?",
    court_position:
      "Upravni sud se oglasio stvarno nenadležnim i ustupio predmet Osnovnom sudu, jer se radi o sporu iz radnog odnosa, a ne o zakonitosti upravnog akta.",
    reasoning:
      "Odluka o koeficijentu i minulom radu u pravosuđu ima prirodu prava iz radnog odnosa; zaštita se ostvaruje parnicom pred mesno nadležnim osnovnim sudom, a ne tužbom po ZUS-u.",
    keywords: ["stvarna nenadležnost", "radni spor", "plata", "javno tužilaštvo"],
    related_articles: ["čl. 3–4. Zakona o upravnim sporovima", "čl. 39. ZPP"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 5540/2023",
    legal_area: "labor",
    legal_question:
      "Da li „Lasta“ dužna da isplati vozaču razliku do minimalne zarade za period 2018–2021?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu koja utvrđuje nezakonitost isplate ispod minimalne zarade i obavezuje na razliku.",
    reasoning:
      "Pravilna primena čl. 104–108. Zakona o radu: odgovarajuća zarada ne može biti ispod minimuma za pun radni fond; veštak i lista potvrđuju manjak.",
    keywords: ["Lasta", "minimalna zarada", "vozač", "potvrda presude"],
    related_articles: ["čl. 104–108. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1793/2023",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni u školi može da traži posebnu isplatu toplog obroka i regresa pored plate obračunate koeficijentom?",
    court_position:
      "Vrhovni sud je odbio reviziju i potvrdio odbijanje tužbe: naknade su sadržane u koeficijentu, u skladu sa Zakonom o platama i čl. 118. Zakona o radu.",
    reasoning:
      "Prošireno obrazloženje o strukturi plate u javnim službama i izuzecima iz pojma zarade; ista logika kao u seriji predmeta o ugrađenim naknadama.",
    keywords: ["školstvo", "topli obrok", "regres", "koeficijent"],
    related_articles: ["Zakon o platama u državnim organima i javnim službama", "čl. 118. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 429/2025",
    legal_area: "labor",
    legal_question:
      "Kako utvrditi visinu naknade izgubljene zarade posle nezakonitog otkaza kada radna jedinica više ne postoji i nema uporednog radnika?",
    court_position:
      "Sudovi su dosudili naknadu prema minimalnoj zaradi sa minulim radom kao jedinom objektivnom merilu, uzimajući u obzid likvidaciju i odsustvo uporednog radnika.",
    reasoning:
      "Nakon nezakonitog otkaza i ukinute radne jedinice, primena odluke poslodavca o minimalnoj zaradi za društveni standard i naknadno vraćanje na rad aneksom ne menjaju kriterijum za prošlost bez uporednog radnika.",
    keywords: ["izgubljena zarada", "minimalna zarada", "Rudnik Grot", "likvidacija"],
    related_articles: ["čl. 172. ZOO", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3029/2022",
    legal_area: "labor",
    legal_question:
      "Da li se pri obračunu dvostruke plate u SBPOK moraju uračunati i sva naknadna uvećanja plate na prethodnom radnom mestu u MUP-u, a ne fiksni iznos iz meseca pre prelaska?",
    court_position:
      "Vrhovni sud je usvojio reviziju i preinačio presude: merilo je dinamička dvostruka vrednost sa minulim radom i svim promenama osnovice do momenta obračuna.",
    reasoning:
      "Jezičko tumačenje čl. 18. st. 1. i Uredbe isključuje „zamrznuti“ iznos iz meseca pre premeštaja; svako uvećanje na starom mestu automatski uvećava dvostruku platu u SBPOK-u.",
    keywords: ["SBPOK", "dvostruka plata", "MUP", "minuli rad", "Uredba"],
    related_articles: ["čl. 18. Zakona o organizaciji i nadležnosti državnih organa u suzbijanju OK", "Uredba o platama u SBPOK"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1854/2022",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac odgovara za manju naknadu zarade za porodiljsko odsustvo ako je organu podneta netačna prosečna zarada?",
    court_position:
      "Vrhovni sud je usvojio reviziju tužilje i obavezao poslodavca na isplatu razlike naknade za porodiljsko odsustvo i negu deteta.",
    reasoning:
      "Veštačenjem je utvrđeno da rešenje treba da glasi na viši prosečni iznos za 12 meseci pre odsustva; poslodavac je izdao pogrešnu potvrdu i time prouzrokovao štetu.",
    keywords: ["porodiljsko odsustvo", "naknada zarade", "pogrešna potvrda", "šteta"],
    related_articles: ["čl. 13. Zakona o finansijskoj podršci porodici sa decom", "čl. 172. ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2196/2015",
    legal_area: "labor",
    legal_question:
      "Da li različita zarada inženjera na istom tipu posla dokazuje diskriminaciju?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio da razlike proističu iz stručne spreme, iskustva, zaduženja i rezultata rada, a ne iz zabranjenog ličnog svojstva.",
    reasoning:
      "Primena čl. 18–19. Zakona o radu: diskriminacija zahteva uporedivu situaciju i nedozvoljeni motiv; ovde su opravdane razlike u valorizaciji rada.",
    keywords: ["diskriminacija", "inženjer", "razlika u zaradi", "opravdane razlike"],
    related_articles: ["čl. 18–19. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 8653/2014",
    legal_area: "labor",
    legal_question:
      "Da li budžetsko ograničenje broja unapređenja opravdava odbijanje napredovanja državnog službenika koji ispunjava zakonske uslove?",
    court_position:
      "Upravni sud je poništio rešenje o odbijanju žalbe: ograničenje iz Zakona o budžetu ne može da zameni merodavni Zakon o platama državnih službenika o napredovanju.",
    reasoning:
      "Kada su ispunjeni uslovi iz čl. 16. Zakona o platama, budžetski procenat unapređenih ne sme da bude jedini razlog uskraćivanja napredovanja bez individualizacije.",
    keywords: ["napredovanje", "državni službenik", "budžet", "plate"],
    related_articles: ["Zakon o platama državnih službenika i nameštenika", "Zakon o budžetu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 4088/2019",
    legal_area: "labor",
    legal_question:
      "Da li se rad u javnom komunalnom preduzeću uračunava u minuli rad državnog službenika pre stupanja na snagu PKU za državne organe?",
    court_position:
      "Upravni sud je odbio tužbu i potvrdio da se pravo na minuli rad po PKU za državne organe računa od 21. 3. 2015. kada je PKU stupio na snagu.",
    reasoning:
      "Čl. 32. PKU proširuje krug ranijih poslodavaca od tog datuma; raniji rad u JKP pre tog datuma ne ulazi u obračun po tom članu za traženi period.",
    keywords: ["minuli rad", "državni organ", "PKU", "JKP"],
    related_articles: ["Posebni kolektivni ugovor za državne organe", "čl. 32."],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 9359/2022",
    legal_area: "labor",
    legal_question:
      "Da li obustava isplate naknade članovima komisija predstavlja diskriminaciju bez dokaza o ličnom svojstvu?",
    court_position:
      "Vrhovni sud je odbio reviziju i potvrdio da nema diskriminacije jer nejednako postupanje nije bilo zasnovano na ličnom svojstvu iz čl. 2. Zakona o zabrani diskriminacije.",
    reasoning:
      "Pojam diskriminacije zahteva vezivanje za lično svojstvo; administrativne odluke o naknadama komisija same po sebi ne ispunjavaju taj element bez dodatnih dokaza.",
    keywords: ["diskriminacija", "lično svojstvo", "komisija", "naknada"],
    related_articles: ["čl. 2. Zakona o zabrani diskriminacije", "čl. 45. st. 2. Zakona o zabrani diskriminacije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2129/2021",
    legal_area: "labor",
    legal_question:
      "Da li kupac stečajnog dužnika nastavlja obračun minulog rada kao pravni sledbenik?",
    court_position:
      "Vrhovni kasacioni sud je dozvolio posebnu reviziju tuženog, preinačio presude i odbio zahtev za minuli rad: kupac nije pravni sledbenik stečajnog dužnika u smislu čl. 108. Zakona o radu.",
    reasoning:
      "Obaveza šireg obračuna minulog rada vezuje se za pravnog prethodnika i povezana lica; stečajni kupac po pravilu ne preuzima taj status automatski.",
    keywords: ["stečaj", "minuli rad", "pravni sledbenik", "kupac"],
    related_articles: ["čl. 108. Zakona o radu", "čl. 147. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2773/2025",
    legal_area: "labor",
    legal_question:
      "Da li nezakonitost pojedinih akata u konkursu za generalnog direktora RTS automatski znači diskriminaciju tužioca?",
    court_position:
      "Vrhovni sud je odbio reviziju jer tužilac nije dokazao uzročnu vezu između navodne nezakonitosti i bilo kog ličnog svojstva.",
    reasoning:
      "Odbijeni su i zahtevi za utvrđenje diskriminacije u isplatama naknada i doprinosa za 2008. godinu jer je utvrđeno da su drugim zaposlenima isplate bile blagovremene, a navodi tužioca nisu povezani sa diskriminacionim osnovom.",
    keywords: ["RTS", "konkurs", "diskriminacija", "dokazivanje"],
    related_articles: ["Zakon o zabrani diskriminacije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5628/2022",
    legal_area: "labor",
    legal_question:
      "Da li Zaključak Vlade pravi neopravdano različit tretman između kategorija zaposlenih u programu viška glede doplate do pune penzije?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je utvrđena diskriminacija i obavezana Republika na isplatu razlike između starosne i prevremene penzije za određeni period.",
    reasoning:
      "Isti program viška zaposlenih i isti uslovi penzije: izuzimanje korisnika „opcije 3“ od zaključka koji koristi drugima u istoj situaciji nema objektivnog opravdanja.",
    keywords: ["Vlada RS", "višak zaposlenih", "penzija", "diskriminacija", "materijalna šteta"],
    related_articles: ["čl. 43. tačka 4. Zakona o zabrani diskriminacije", "čl. 154. ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1243/2021",
    legal_area: "labor",
    legal_question:
      "Da li odbijanje rasporeda policijskog službenika na radno mesto više stručne spreme predstavlja diskriminaciju zbog privatnog fakulteta?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju: poslodavac je donuo organizaciono opravdanu odluku o rasporedu koja nije vezana za lično svojstvo tužioca.",
    reasoning:
      "Diskriminacija zahteva neopravdano pravljenje razlike zbog ličnog svojstva; ovde je utvrđeno poslovno opravdanje efikasnosti službe, a ne diskriminacija zbog škole.",
    keywords: ["MUP", "raspored", "stručna sprema", "diskriminacija"],
    related_articles: ["čl. 18–19. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2138/2022",
    legal_area: "labor",
    legal_question:
      "Da li je Zaključkom Vlade izvršena diskriminacija prema zaposlenom koji nije obuhvaćen doplatom do pune penzije kao druga grupa u programu viška?",
    court_position:
      "Apelacioni sud je potvrdio utvrđenje diskriminacije i delimično usvojio tužbeni za naknadu materijalne štete (razliku penzija) za period od 1. 2. 2018. do 30. 9. 2020.",
    reasoning:
      "Isti program i isti nedostatak do penzije: izuzimanje korisnika opcije 3 nema razuman razlog u odnosu na druge viškove koji su ostvarili doplatu.",
    keywords: ["Vlada RS", "višak zaposlenih", "penzija", "diskriminacija"],
    related_articles: ["čl. 43. Zakona o zabrani diskriminacije"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1679/2022",
    legal_area: "labor",
    legal_question:
      "Da li je isti Zaključak Vlade o višku zaposlenih diskriminatoran prema tužiocu kao prema grupi koja ostvaruje doplatu do starosne penzije?",
    court_position:
      "Apelacioni sud u Beogradu potvrdio je prvostepenu presudu kojom je utvrđena diskriminacija i usvojen tužbeni za isplatu razlike penzija sa kamatom.",
    reasoning:
      "Motivi diskriminacije su irelevantni za postojanje diskriminacije; bitno je da je tužilac u istoj situaciji kao privilegovana grupa, a izuzet nije imao objektivno opravdanje.",
    keywords: ["Vlada", "višak zaposlenih", "penzija", "naknada štete"],
    related_articles: ["čl. 43. tačka 4. Zakona o zabrani diskriminacije"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1926/2022",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz ugovora o radu inkasantu zbog povreda radne obaveze zakonit kada su povrede teške i ponavljane?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio zakonitost otkaza i ispunjenost obaveza isplate svih potraživanja iz radnog odnosa.",
    reasoning:
      "Utvrđen je turnus 12-24-12-48 i niz teških propusta; poslodavac je primenio ozbiljne mere pre otkaza. Veštačenjem je potvrđena isplata potraživanja.",
    keywords: ["otkaz", "inkasant", "povreda radne obaveze", "JP Putevi Srbije"],
    related_articles: ["čl. 179. Zakona o radu", "Pravilnik o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1815/2022",
    legal_area: "labor",
    legal_question:
      "Da li je diskriminacija tužioca od strane Republike Srbije Zaključkom Vlade u programu viška zaposlenih u „HIP-Petrohemija“?",
    court_position:
      "Apelacioni sud potvrđuje presudu o diskriminaciji i obavezu isplate razlike između pune starosne i prevremene penzije za određeni period.",
    reasoning:
      "Potpis sporazuma posle izmena Zakona o PIO ne menja ocenu diskriminacije jer je program nastao po starim uslovima i tužilac se opredelio za opciju 3 u vreme starog zakona.",
    keywords: ["HIP Petrohemija", "Vlada", "penzija", "diskriminacija"],
    related_articles: ["čl. 43. Zakona o zabrani diskriminacije", "čl. 154. ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 13095/2015",
    legal_area: "labor",
    legal_question:
      "Da li PIO može da odbije priznanje prava na naknadu za rad sa skraćenim radnim vremenom ako je ranije pravnosnažno rešenje već priznalo to pravo?",
    court_position:
      "Upravni sud je uvažio tužbu i poništio rešenje Fonda jer je novi akt u suprotnosti sa ranijim pravnosnažnim rešenjem koje nije ukinuto.",
    reasoning:
      "Uvidom u platne spiskove utvrđeno je obračun punog radnog vremena uprkos radu pola radnog vremena kao invalid II kategorije; ranije priznanje prava mora se poštovati.",
    keywords: ["PIO", "skraćeno radno vreme", "invalidnost", "pravnosnažnost"],
    related_articles: ["Zakon o penzijskom i invalidskom osiguranju"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3179/2021",
    legal_area: "labor",
    legal_question:
      "Da li nedonošenje rešenja o prestanku radnog odnosa zaposlenima MUP-a sa KiM predstavlja diskriminaciju?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilaca jer nisu dokazali da je različito postupanje bilo motivisano ličnim svojstvom.",
    reasoning:
      "Tužbeni zahtevi za utvrđenje diskriminacije i zabrane daljeg diskriminatorskog ponašanja su odbijeni kao neosnovani; neizdavanje rešenja samo po sebi ne čini diskriminaciju.",
    keywords: ["MUP", "Kosovo", "prestanak radnog odnosa", "posebna penzija"],
    related_articles: ["čl. 2. Zakona o zabrani diskriminacije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5626/2022",
    legal_area: "labor",
    legal_question:
      "Da li motivi diskriminacije utiču na pravo na naknadu štete zbog nejednakog tretmana u programu viška zaposlenih?",
    court_position:
      "Apelacioni sud potvrđuje presudu o diskriminaciji Zaključkom Vlade i dosuđuje materijalnu štetu u iznosu razlike penzija po mesecima.",
    reasoning:
      "Motivi diskriminacije su irelevantni; tužilac je u istoj situaciji kao grupa kojoj je priznata doplata do pune penzije, pa pripada naknada po čl. 43. tačka 4. Zakona o zabrani diskriminacije.",
    keywords: ["višak zaposlenih", "Vlada", "penzija", "šteta"],
    related_articles: ["čl. 43. Zakona o zabrani diskriminacije", "čl. 154. ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 68/2022",
    legal_area: "labor",
    legal_question:
      "Da li je na poslodavcu teret dokazivanja isplate minimalne zarade kada zaposlena tvrdi da ugovorena zarada nije isplaćena?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio obavezu isplate razlike do minimalne zarade uvećane za minuli rad.",
    reasoning:
      "U nedostatku pisanog ugovora primenjuje se minimum; poslodavac nije dokazao isplatu traženog iznosa iz veštačenja, a delimične uplate nisu osporene dokazima o drugoj prirodi potraživanja.",
    keywords: ["minimalna zarada", "teret dokazivanja", "poslodavac", "veštačenje"],
    related_articles: ["čl. 111. Zakona o radu", "čl. 231. st. 3. ZPP"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2246/2022",
    legal_area: "labor",
    legal_question:
      "Da li MUP diskriminiše zaposlene odbijanjem donošenja rešenja o prestanku radnog odnosa potrebnog za posebnu penziju?",
    court_position:
      "Vrhovni sud je odbio reviziju tužilaca i potvrdio odbijanje tužbe jer nije dokazana diskriminacija po ličnom svojstvu.",
    reasoning:
      "Isti pravni okvir kao u srodnim predmetima: neizdavanje administrativnog akta ne implicira diskriminaciju bez konkretnog osnova iz čl. 2. Zakona o zabrani diskriminacije.",
    keywords: ["MUP", "posebna penzija", "PIO", "diskriminacija"],
    related_articles: ["Zakon o zabrani diskriminacije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1681/2022",
    legal_area: "labor",
    legal_question:
      "Da li potpis sporazuma posle izmena Zakona o PIO utiče na utvrđenje diskriminacije Zaključkom Vlade u programu viška zaposlenih?",
    court_position:
      "Apelacioni sud potvrđuje presudu o diskriminaciji i dosuđuje materijalnu štetu u iznosu razlike između pune starosne i prevremene penzije.",
    reasoning:
      "Odgovornost poslodavca za pravne posledice sporazuma posle izmena zakona ne briše diskriminatorni efekat izuzimanja od zaključka Vlade u odnosu na uporedive zaposlene.",
    keywords: ["HIP Petrohemija", "Vlada", "penzija", "diskriminacija"],
    related_articles: ["čl. 43. Zakona o zabrani diskriminacije"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 127/2016",
    legal_area: "labor",
    legal_question:
      "Da li premeštaj zaposlenog na drugo radno mesto zbog zdravstvenog stanja i navodni pritisci direktora predstavljaju zlostavljanje i diskriminaciju?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe: premeštaj je bio usklađen sa zdravstvenim stanjem i nije utvrđeno zlostavljanje niti diskriminacija.",
    reasoning:
      "Izvedeni dokazi ne pokazuju sistematsko ponižavajuće ponašanje niti vezu sa zabranjenim osnovom; poslovne odluke su ocenjene kao opravdane u konkretnom kontekstu.",
    keywords: ["zlostavljanje na radu", "diskriminacija", "premeštaj", "zdravlje"],
    related_articles: ["čl. 18–19. Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2130/2022",
    legal_area: "labor",
    legal_question:
      "Da li se radni odnos na neodređeno vreme smatra zasnovanim kada zaposleni stupi na rad bez pisanog ugovora?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženih i potvrdio utvrđenje radnog odnosa na neodređeno vreme od dana stupanja na rad kod prvog pa kod drugog poslodavca.",
    reasoning:
      "Primena čl. 10–19. Zakona o radu o fikciji punog radnog odnosa i obaveze isplate minimalne zarade i naknade za neiskorišćeni godišnji odmor za utvrđene periode kod oba poslodavca.",
    keywords: ["rad na neodređeno vreme", "stupanje na rad", "minimalna zarada", "godišnji odmor"],
    related_articles: ["čl. 10–19. Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 5224/2023",
    legal_area: "labor",
    legal_question:
      "Da li zaposleni koji je stupio na rad bez pisanog ugovora može da ostvari pravo na prekovremeni i noćni rad i na povrat nezakonito zadržanih delova zarade?",
    court_position:
      "Apelacioni sud potvrđuje utvrđenje radnog odnosa na neodređeno vreme i obavezu isplate uvećanja za prekovremeni i noćni rad i štetu od neosnovanih odbitaka.",
    reasoning:
      "Veštačenjem su utvrđeni sati i iznosi; poslodavac je primenjivao odbitke za manjak robe bez propisane procedure. Teret dokazivanja o zakonitosti odbitaka je na poslodavcu.",
    keywords: ["stupanje na rad", "prekovremeni rad", "noćni rad", "odbici od plate"],
    related_articles: ["čl. 108. Zakona o radu", "čl. 129. Zakona o radu"],
    outcome: "plaintiff_won",
  },
]
