// scripts/case-law-labor-serbia-7.ts
// Serbian labor-related decisions: overtime, annual leave, allowances (topli obrok, regres, prevoz),
// MUP/Vojska specific rules, collective agreements vs mandatory caps, revizija cenzus, Ustavni sud.

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_LABOR_SERBIA_7: CaseLawInput[] = [
  // ── BATCH 1 (28) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 3530/2020",
    legal_area: "labor",
    legal_question:
      "Da li zaposlenoj na privremenim i povremenim poslovima pripadaju prava kao u radnom odnosu (prekovremeni rad, prevoz, minuli rad, regres i naknada za neiskorišćeni godišnji odmor)?",
    court_position:
      "Apelacioni sud je potvrdio odbijajući deo presude za potraživanja po ugovorima o privremenim i povremenim poslovima, jer rad van radnog odnosa ne daje ista prava kao rad u radnom odnosu. Delimeno je ukinuo presudu u delu o regresu i predmet vratio na ponovno suđenje.",
    reasoning:
      "Primenom čl. 197. st. 1 Zakona o radu utvrđeno je da ugovor o privremenim i povremenim poslovima može da se zaključi za poslove koji ne traju duže od 120 radnih dana u godini, uz ograničen krug lica. Prvostepeni sud je pravilno zaključio da tužilji ne pripadaju prekovremeni rad, međugradski prevoz, uvećanje za minuli rad po tom osnovu niti naknada za neiskorišćeni godišnji odmor po tim ugovorima. Za regres je ostalo potrebno dodatno odlučivanje nakon ukidanja.",
    keywords: ["privremeni i povremeni poslovi", "rad van radnog odnosa", "prekovremeni rad", "godišnji odmor", "regres"],
    related_articles: ["čl. 197. st. 1 Zakona o radu"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 5581/2014",
    legal_area: "labor",
    legal_question:
      "Da li profesionalnom vojniku pripada naknada za neiskorišćeni godišnji odmor i slobodne dane kada odmor nije iskorišćen zbog bolovanja, a ne zbog potreba službe?",
    court_position:
      "Upravni sud je odbio tužbu i ocenio da osporeno rešenje nije povredilo zakon, jer uslov iz Zakona o Vojsci Srbije za naknadu zbog neiskorišćenog godišnjeg odmora nije ispunjen kada je odmor propusten zbog bolesti, a ne zbog potreba službe.",
    reasoning:
      "Po čl. 105. st. 5 Zakona o Vojsci Srbije naknada za neiskorišćeni godišnji odmor sledi kada odmor nije iskorišćen zbog potreba službe. Za prekovremeni rad važe posebna pravila Pravilnika o platama (pretvaranje u slobodne sate, rokovi, izuzetak uz saglasnost). Kada je odmor ostao neiskorišćen zbog bolovanja, navedeni posebni uslov za naknadu odmora nije ostvaren.",
    keywords: ["Vojska Srbije", "godišnji odmor", "bolovanje", "potrebe službe", "prekovremeni rad"],
    related_articles: ["čl. 105. st. 5 Zakona o Vojsci Srbije", "čl. 34. Pravilnika o platama profesionalnih vojnih lica"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3062/2021",
    legal_area: "labor",
    legal_question:
      "Da li su odredbe posebnih kolektivnih ugovora kojima su predviđeni veći iznosi naknade za ishranu u toku rada i regresa važeće prema poslodavcu koji isplaćuje niže iznose po internim aktima?",
    court_position:
      "Vrhovni kasacioni sud je preinačio nižestepene presude i odbio zahteve zaposlenih za razliku naknada, utvrdivši ništavost sporazumnih odredbi kolektivnih ugovora koje daju veća prava od onih ograničenih imperativnim zakonom o umanjenju javnih primanja.",
    reasoning:
      "Sud je ocenio da PKU odredbe koje predviđaju veće iznose od onih koji su dopušteni zakonom o privremenom uređivanju osnovica za korisnike javnih sredstava budu suprotne imperativu i stoga ništave. Tužioci su ostvarili potraživanja kao razliku između PKU i isplaćenih iznosa po Programu/Pravilniku poslodavca; takva osnova nije pravno prihvatljiv.",
    keywords: ["Posebni kolektivni ugovor", "javna preduzeća", "ništavost", "umanjenje zarada", "regres", "ishrana"],
    related_articles: ["Zakon o privremenom uređivanju osnovica", "Posebni kolektivni ugovor za javna preduzeća"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 14391/2012",
    legal_area: "labor",
    legal_question:
      "Da li vojnom licu pripada novčana naknada za prekovremeni rad i neiskorišćeni godišnji odmor kada je rad evidentiran suprotno naređenju i kada ne postoji akt da je odmor ostao neiskorišćen zbog potreba službe?",
    court_position:
      "Upravni sud je odbio tužbu kao neosnovanu, smatrajući pravilnim zaključak da iskazani prekovremeni rad ne može da se prizna kada evidencija nije vođena u skladu sa naređenjem, te da za neiskorišćeni godišnji odmor nisu ispunjeni zakonski uslovi.",
    reasoning:
      "Kada Pregled rada nije sačinjen saglasno naređenju, iskazani rad ne može da se tretira kao rad duži od punog radnog vremena po Uredbi o platama. Za naknadu zbog neiskorišćenog odmora vojnik nije osporio nedostatak akta o nekorišćenju odmora zbog potreba službe niti bolovanje i razrešenje, pa nisu ispunjeni elementi za traženu naknadu.",
    keywords: ["Vojska", "prekovremeni rad", "godišnji odmor", "naredba", "evidencija"],
    related_articles: ["Uredba o platama profesionalnih vojnika", "Zakon o Vojsci Srbije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1381/2015",
    legal_area: "labor",
    legal_question:
      "Da li policijskom službeniku pripada stimulativna naknada tokom korišćenja godišnjeg odmora?",
    court_position:
      "Vrhovni kasacioni sud je delimično preinačio nižestepene presude i odbio zahtev za isplatu stimulativne naknade za vreme godišnjeg odmora, jer prema Pravilniku MUP-a ta naknada pripada samo za vreme provedeno na radu (uz izuzetak posebnog bolovanja).",
    reasoning:
      "Pravilnikom o platama zaposlenih u MUP-u posebno je uređena stimulacija kao poseban vid naknade. Za period godišnjeg odmora zaposleni nema pravo na stimulaciju u sporu prema utvrđenom režimu, pa je revizijski sud ocenio da je nižestepena primena prava u tom delu bila ispravna u odnosu na osporeni zahtev.",
    keywords: ["MUP", "stimulacija", "godišnji odmor", "Pravilnik o platama"],
    related_articles: ["Pravilnik o platama zaposlenih u MUP", "čl. 441 ZPP (dozvoljenost revizije)"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 697/2023",
    legal_area: "procedural",
    legal_question: "Da li je revizija dozvoljena u radnom sporu o isplati zarada i naknada kada vrednost predmeta spora ne prelazi zakonski cenzus?",
    court_position:
      "Vrhovni sud je reviziju odbacio kao nedozvoljenu, jer se radi o novčanom potraživanju iz radnog odnosa čija vrednost ne prelazi cenzus od 40.000 evra, pa redovna revizija nije dopuštena.",
    reasoning:
      "U izreci pobijane presude odbijeni su delovi tužbenog zahteva za naknadu za neiskorišćeni godišnji odmor za 2016. godinu i za uvećanu zaradu za prekovremeni rad za određene datume. Revizija se odnosi na sporna novčana potraživanja čija vrednost ne ispunjava uslov dozvoljenosti revizije po ZPP.",
    keywords: ["revizija", "cenzus", "radni spor", "nedozvoljena revizija"],
    related_articles: ["Zakon o parničnom postupku (cenzus revizije)"],
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2761/2024",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac dužan da isplati uvećanu zaradu za prekovremeni rad, rad praznicima i naknadu za neiskorišćeni godišnji odmor kada su iznosi utvrđeni veštačenjem i svedočenjem?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženog i potvrdio drugostepenu presudu kojom su usvojena potraživanja tužioca, ocenivši da je činjenično stanje pravilno utvrđeno i da nema osnova za drugačiju primenu prava.",
    reasoning:
      "U obrazloženju je referisana presuda Apelacionog suda u Nišu Gž1 729/2024 koja je ukinula prvostepenu presudu i delimično usvojila zahtev za prekovremeni rad, rad praznicima i naknadu za neiskorišćeni godišnji odmor za 2018. i 2019. godinu, uz troškove postupka. Revizija osporava utvrđeno činjenično stanje bez uspeha.",
    keywords: ["prekovremeni rad", "praznik", "godišnji odmor", "veštačenje", "potvrda presude"],
    related_articles: ["Zakon o radu", "Zakon o parničnom postupku"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Nišu",
    court_level: "appellate",
    case_number: "Gž1 2735/2017",
    legal_area: "labor",
    legal_question:
      "Da li iskazi svedoka mogu da zamene pisanu evidenciju o prekovremenom radu i da li tužiocu pripada naknada za neiskorišćeni godišnji odmor za sve godine?",
    court_position:
      "Apelacioni sud je delimično potvrdio presudu: priznat je manji deo prekovremenog rada i naknada za neiskorišćeni odmor za određene godine, dok je ostatak zahteva odbijen jer iskazi svedoka nisu dovoljni bez pisane evidencije radnog vremena.",
    reasoning:
      "Sud je razdvojio mesece za koje postoji dovoljno utvrđenje prekovremenog rada od perioda u kome dokazi ne pružaju sigurnu osnovu. Za godišnji odmor je delimično usvojeno po godinama u skladu sa utvrđenim korišćenjem i krivicom poslodavca, a za deo zahteva koji se oslanja isključivo na svedočenje bez knjigovodstvene evidencije odbijanje je ocenjeno kao pravilno.",
    keywords: ["prekovremeni rad", "svedoci", "evidencija radnog vremena", "godišnji odmor"],
    related_articles: ["Zakon o radu", "Zakon o parničnom postupku"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2280/2024",
    legal_area: "labor",
    legal_question:
      "Da li postoji faktički radni odnos i obaveza isplate zarade, prekovremenog rada i naknade za neiskorišćeni godišnji odmor kada radnik radi bez pisanog ugovora posle isteka prethodnih ugovora?",
    court_position:
      "Vrhovni sud je potvrdio postojanje faktičkog radnog odnosa i obavezu poslodavca na isplatu neisplaćenih zarada, uvećanja za prekovremeni rad i naknade za neiskorišćeni godišnji odmor uz doprinose, jer poslodavac nije dokazao omogućavanje korišćenja odmora niti je dostavio rešenje o korišćenju odmora.",
    reasoning:
      "Zaposleni ne može da se odrekne prava na godišnji odmor; u slučaju prestanka poslodavac isplaćuje naknadu po čl. 76. Zakona o radu. Kod rada bez ugovora nižestepeni sudovi su pravilno zaključili obavezu isplate. Navodi revizije o blagovremenosti tužbe nisu osnovani jer sud tu pitanje ispituje po službenoj dužnosti kada je to od značaja.",
    keywords: ["faktički radni odnos", "godišnji odmor", "prekovremeni rad", "doprinosi"],
    related_articles: ["čl. 68. st. 4", "čl. 76", "čl. 104–108 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1759/2024",
    legal_area: "labor",
    legal_question:
      "Da li zaposlenoj pripadaju troškovi prevoza, naknada za neiskorišćeni godišnji odmor i uvećanja za prekovremeni, noćni i praznični rad po ugovoru i kolektivnom ugovoru?",
    court_position:
      "Apelacioni sud je uglavnom potvrdio presudu koja obavezuje poslodavca na isplate, ali je ukinuo deo koji se odnosi na prekovremeni rad za jedan mesec zbog kontradiktornosti u obrazloženju prvostepenog suda.",
    reasoning:
      "Prava su izvedena iz ugovora o radu i kolektivnog ugovora (godišnji odmor, uvećanja, prevoz). Za jedan mesec prekovremenog rada obrazloženje nije bilo dosledno, pa je predmet vraćen na ponovno odlučivanje u tom delu, dok su ostali delovi potvrđeni kao zakoniti na utvrđenom činjeničnom stanju.",
    keywords: ["prevoz", "godišnji odmor", "prekovremeni rad", "noćni rad", "praznik"],
    related_articles: ["Zakon o radu", "Kolektivni ugovor"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2005/2024",
    legal_area: "procedural",
    legal_question:
      "Da li je revizija tuženog dozvoljena u sporu o isplati zarada, prekovremenog rada i naknade za neiskorišćeni godišnji odmor kada vrednost pobijanog dela ne prelazi cenzus?",
    court_position:
      "Vrhovni sud je odbacio reviziju kao nedozvoljenu zbog male vrednosti spora i ocenio da nisu ispunjeni ni uslovi za posebnu reviziju radi ujednačavanja prakse.",
    reasoning:
      "Predmet su manje isplaćena zarada, naknada za prekovremeni rad i naknada za neiskorišćeni godišnji odmor. Nižestepene presude su donete uz pravilnu primenu materijalnog prava u odnosu na utvrđeno stanje (radni odnos, manja isplata, doprinosi, odsustvo rešenja o odmoru). Revizija osporava činjenice što nije dopušteno po čl. 407. st. 2 ZPP.",
    keywords: ["revizija", "cenzus", "izuzetna revizija", "radni spor"],
    related_articles: ["čl. 404", "čl. 407. st. 2 ZPP"],
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3334/2023",
    legal_area: "procedural",
    legal_question:
      "Da li je revizija poslodavca dopuštena kao izuzetna u sporu o uvećanoj zaradi, naknadi za neiskorišćeni odmor i doprinosima kada nije prekoračen cenzus?",
    court_position:
      "Vrhovni sud je odbacio reviziju, nalazeći da nema uslova za izuzetno dozvoljenu reviziju, a da redovna revizija nije dopuštena jer vrednost spora ne prelazi cenzus.",
    reasoning:
      "Pitanja uvećanja zarade za prekovremeni rad, naknade za neiskorišćeni godišnji odmor i doprinosa zavise od konkretnog činjeničnog stanja u svakom slučaju, pa ne ispunjavaju kriterijum opšteg interesa/ravnopravnosti iz čl. 404. st. 1 ZPP. Pobijana presuda je ocenjena kao doneta uz pravilnu primenu Zakona o radu i Zakona o doprinosima.",
    keywords: ["revizija", "izuzetna revizija", "cenzus", "doprinosi"],
    related_articles: ["čl. 404 ZPP", "Zakon o radu", "Zakon o doprinosima"],
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 249/2021",
    legal_area: "labor",
    legal_question:
      "Da li je drugostepeni sud pogrešno primenio pravo odbijajući zahtev za topli obrok i regres za godišnji odmor?",
    court_position:
      "Vrhovni kasacioni sud je ukinuo preinačujući deo presude Apelacionog suda i vratio predmet na ponovno suđenje, jer je drugostepena odluka doneta uz pogrešnu primenu materijalnog prava u delu toplog obroka i regresa.",
    reasoning:
      "U predmetu su sporna i manje isplaćena zarada i neisplaćena uvećanja, kao i neiskorišćen deo godišnjeg odmora za 2015. godinu bez isplate regresa. Revizijski sud je prihvatio reviziju u delu u kome nižestepeni sud nije pravilno primenio pravo o naknadama troškova vezanih za rad i odmor.",
    keywords: ["topli obrok", "regres", "prekovremeni rad", "ukidanje presude"],
    related_articles: ["Zakon o radu", "Zakon o parničnom postupku"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1127/2020",
    legal_area: "labor",
    legal_question:
      "Da li pravo na naknadu troškova prevoza za dolazak na rad zavisi od prethodnog pismenog zahteva zaposlenog poslodavcu?",
    court_position:
      "Vrhovni kasacioni sud je usvojio izuzetno dozvoljenu reviziju tužilaca, ukinuo nižestepene presude u delu o troškovima prevoza i vratio predmet na ponovno suđenje, ističući da pravo na prevoz postoji nezavisno od prethodnog pismenog zahteva.",
    reasoning:
      "Nižestepeni sudovi su odbili prevoz zbog navodnog nedostatka pismenog zahteva ili dokaza o trošku. Revizijski sud smatra da je obrazloženje u odbijajućem delu zasnovano na pogrešnoj pravnoj kvalifikaciji obaveze poslodavca po zakonu i opštim aktima, pa je potrebno ponovo odlučiti o tom pravu.",
    keywords: ["prevoz", "naknada troškova", "MUP", "pismeni zahtev"],
    related_articles: ["Zakon o radu", "Zakon o policiji"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 885/2020",
    legal_area: "labor",
    legal_question:
      "Da li Zakon o privremenom uređivanju osnovica isključuje traženje uvećane zarade i naknada za ishranu i regres u javnom komunalnom preduzeću?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu koja obavezuje javno komunalno preduzeće na isplatu razlika zarada, uvećanja i naknada za ishranu i regres, odbacujući pozivanje tuženog na zakon o privremenom uređivanju osnovica za te elemente.",
    reasoning:
      "Utvrđeno je da poslodavac nije isplatio uvećanja za rad duži od punog vremena i rad nedeljom, a naknade za ishranu i regres isplaćivao po nižim iznosima od PKU. Aneksima ugovora su priznata prava po zakonu i PKU. Dosuđeni iznosi predstavljaju razliku između PKU i isplaćenog.",
    keywords: ["javno preduzeće", "PKU", "regres", "ishrana", "prekovremeni rad"],
    related_articles: ["Zakon o radu", "Posebni kolektivni ugovor"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2470/2010",
    legal_area: "constitutional",
    legal_question:
      "Da li dugotrajno nenamirenje potraživanja utvrđenih u stečajnom postupku protiv dužnika sa većinskim državnim kapitalom može predstavljati povredu prava na imovinu?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na mirno uživanje imovine, jer dugotrajno nenamirenje potraživanja podnosilaca u stečaju koji traje godinama narušava ustavnu zaštitu imovinskog položaja.",
    reasoning:
      "U postupku po ustavnoj žalbi utvrđeno je da su podnosioci tužbom tražili dodatke na platu i naknade za ishranu i regres za period 2004–2007, da je prvostepeni sud delimično usvojio zahtev, a da je predmet kasaciono-vrhovnodstepeno vođen dugo. Ustavnosudska ocena se odnosi na imovinsku dimenziju neefikasnog namirenja u stečaju državnog akcionara.",
    keywords: ["stečaj", "nenamirenje", "pravo na imovinu", "Ustav"],
    related_articles: ["čl. 175. st. 3 Ustava", "čl. 58 Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2471/2010",
    legal_area: "labor",
    legal_question:
      "Da li policijskim službenicima može biti uskraćena pravična naknada za rad pozivanjem na uvećanje koeficijenta umesto dodataka za prekovremeni, noćni i praznični rad?",
    court_position:
      "Ustavni sud je usvojio žalbu i utvrdio povredu prava na pravičnu naknadu za rad, jer se pravo na uvećanu zaradu ne može eliminisati samo pozivom na mogućnost uvećanja koeficijenta bez konkretne analize pokrića.",
    reasoning:
      "Predmet su dodaci na platu i naknade za ishranu i regres za 2004–2007. Prvostepena presuda je delimično usvojila zahtev. Ustavni sud je ocenio da osporeni stavovi drugostepenog suda nisu bili saglasni sa ustavnim standardom pravične naknade za rad policijskih službenika.",
    keywords: ["MUP", "koeficijent", "prekovremeni rad", "pravična naknada"],
    related_articles: ["čl. 60. st. 4 Ustava", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 3088/2014",
    legal_area: "labor",
    legal_question:
      "Da li je upravni organ pravilno odbio zahtev policijskih službenika za dodatke na platu ako nije nesumnjivo utvrđeno da uvećani koeficijent adekvatno kompenzuje prekovremeni, noćni i praznični rad?",
    court_position:
      "Upravni sud je uvažio tužbu, poništio rešenje i vratio predmet na ponovno odlučivanje, smatrajući da nije dokazano da koeficijent u potpunosti zameni posebne dodatke.",
    reasoning:
      "Tužioci ukazuju na praksu drugih sudova i ranije odluke Ustavnog suda o pravu policije na dodatke. Tuženi organ nije razložio izjednačavanje kategorija zaposlenih sa uvećanjem koeficijenta od 30% kada uporedni radnik mora imati isti koeficijent radnog mesta i bez neredovnosti u radu.",
    keywords: ["MUP", "koeficijent", "prekovremeni rad", "upravni spor"],
    related_articles: ["Zakon o policiji", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Spp 9/2020",
    legal_area: "procedural",
    legal_question:
      "Da li raspored rada 12 sati pa 36 sati odmora predstavlja smenski rad u smislu prava na posebnu naknadu?",
    court_position:
      "Vrhovni kasacioni sud je odbacio zahtev Osnovnog suda u Lazarevcu za rešavanje spornog pravnog pitanja, ocenivši da neujednačena praksa drugostepenog suda sama po sebi nije osnov za SPP postupak.",
    reasoning:
      "Zahtev se odnosio na rad EPS radnika u ciklusima 12/36 i naknade za smenski rad i godišnji odmor. Sud je konstatovao da postoje različite odluke Apelacionog suda u Beogradu, ali da to ne ispunjava uslove za pokretanje postupka po zahtevu za sporno pravno pitanje u predmetu P1 493/2019.",
    keywords: ["SPP", "smenski rad", "EPS", "ujednačavanje prakse"],
    related_articles: ["Zakon o parničnom postupku"],
    outcome: "procedural",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2472/2010",
    legal_area: "labor",
    legal_question:
      "Da li je presuda Apelacionog suda povredila pravo na pravičnu naknadu ako nije ispitano da li je uvećani koeficijent zaista pokrio dodatke za prekovremeni, noćni i praznični rad?",
    court_position:
      "Ustavni sud je usvojio žalbu, utvrdio povredu prava na pravičnu naknadu i poništio drugostepenu presudu, naloživši ponovno odlučivanje o dodacima na platu i pratećim naknadama.",
    reasoning:
      "Isti predmetni spor kao u srodnim žalbama policijskih službenika iz Temerina za 2004–2007. Ustavni sud ponavlja stav da uvećanje koeficijenta ne isključuje automatski posebna primanja za posebne oblike rada, ako to nije dokazano i razloženo u konkretnom slučaju.",
    keywords: ["MUP", "Ustavni sud", "koeficijent", "prekovremeni rad"],
    related_articles: ["čl. 60. st. 4 Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1361/2009",
    legal_area: "labor",
    legal_question:
      "Da li odbijanje zahteva za dodatke na platu policajcima zbog tvrdnje da su obuhvaćeni uvećanjem koeficijenta predstavlja proizvoljnu primenu prava?",
    court_position:
      "Ustavni sud je usvojio žalbu i utvrdio povredu prava na pravično suđenje, jer je kvalifikacija da su dodaci „obuhvaćeni“ koeficijentom bila arbitrarna bez analize konkretnog obračuna.",
    reasoning:
      "U obrazloženju se ističe da čl. 47. Zakona o unutrašnjim poslovima ne oslobađa poslodavca isplate za rad preko punog radnog vremena i da posebni uslovi rada ne zamene uvećanja po Zakonu o radu. Povređena su prava iz čl. 32. i 36. Ustava zbog proizvoljne primene materijalnog prava.",
    keywords: ["policija", "koeficijent", "pravično suđenje", "dodaci na platu"],
    related_articles: ["čl. 32. st. 1 Ustava", "čl. 47. Zakona o unutrašnjim poslovima"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1171/2012",
    legal_area: "labor",
    legal_question:
      "Da li je postupak koji traje više od osam godina u radnom sporu u razumnom roku i da li podeljena odgovornost za štetu može da se zasniva na nepostojećem osnovu?",
    court_position:
      "Ustavni sud je usvojio žalbu, utvrdio povredu prava na suđenje u razumnom roku i dosudio 500 EUR nematerijalne štete, uz ocenu da su složenost predmeta i neefikasnost sudova relevantni razlozi.",
    reasoning:
      "U izdvojenom delu obrazloženja razmatrana su i pitanja kumulacije naknada za neiskorišćeni godišnji odmor i regresa za iskorišćeni odmor, kao i osnovanost dela tužbenog zahteva za prekovremeni rad. Ustavnosudska odluka se fokusira na trajni postupak i povredu čl. 32. Ustava.",
    keywords: ["razuman rok", "nematerijalna šteta", "godišnji odmor", "regres"],
    related_articles: ["čl. 32. st. 1 Ustava", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2271/2021",
    legal_area: "labor",
    legal_question:
      "Da li su odredbe PKU o većim iznosima toplog obroka i regresa važeće u odnosu na korisnike javnih sredstava posle stupanja na snagu zakona o privremenom uređivanju osnovica?",
    court_position:
      "Vrhovni kasacioni sud je preinačio nižestepene presude i odbio zahteve za razliku naknada za ishranu i regres, jer su odredbe PKU koje daju veća prava suprotne imperativnom zakonu i ništave.",
    reasoning:
      "U vreme stupanja na snagu zakona o osnovicama nije postojao granski PKU za visinu toplog obroka i regresa. PKU iz 2015. predviđaju minimalne iznose, ali su sporazumni delovi koji daju veća prava u sukobu sa imperativom umanjenja primanja kod korisnika javnih sredstava, pa se ne mogu dosuditi razlike u korist zaposlenog.",
    keywords: ["PKU", "topli obrok", "regres", "osnovice", "ništavost"],
    related_articles: ["Zakon o privremenom uređivanju osnovica", "Zakon o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 866/2022",
    legal_area: "labor",
    legal_question:
      "Da li su odredbe posebnih kolektivnih ugovora kojima se utvrđuju veći iznosi toplog obroka i regresa od onih dopuštenih zakonom o osnovicama pravno važeće?",
    court_position:
      "Sud je preinačio presude i odbio tužbene zahteve za razliku, utvrđujući ništavost sporazumnih odredbi PKU suprotne imperativnom zakonu o privremenom uređivanju osnovica.",
    reasoning:
      "Argumentacija je ista kao u srodnim predmetima: primena Zakona od 28.10.2014. i PKU od 2015. koji uvode minimalne iznose, uz zaključak da veći ugovoreni iznosi koji prelaze dozvoljeni režim jesu ništavi i ne mogu da budu osnov za dosuđivanje razlike.",
    keywords: ["PKU", "komunalna delatnost", "ništavost", "regres"],
    related_articles: ["Zakon o privremenom uređivanju osnovica"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4316/2010",
    legal_area: "labor",
    legal_question:
      "Da li je drugostepena presuda pogrešno zaključila da su dodaci policajcu obuhvaćeni uvećanjem koeficijenta bez provere posebnog rešenja?",
    court_position:
      "Ustavni sud je usvojio žalbu, utvrdio povredu prava na pravično suđenje i pravičnu naknadu i poništio drugostepenu presudu koja je odbila dodatke i prateće naknade.",
    reasoning:
      "Podnosilac je tužio MUP za dodatke i naknade za ishranu i regres za 2004–2006. Prvostepeni sud je odbio zahtev, Apelacioni u Beogradu potvrdio. Ustavni sud ukazuje na liniju odluka o odvojenosti dodataka od generičkog uvećanja koeficijenta kada to nije individualizovano i dokazano.",
    keywords: ["MUP", "koeficijent", "Ustavni sud", "poništenje presude"],
    related_articles: ["čl. 32. st. 1 Ustava", "čl. 60. st. 4 Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1070/2015",
    legal_area: "labor",
    legal_question:
      "Da li policajac ima pravo na stimulativnu naknadu od 10% tokom godišnjeg odmora i bolovanja koje nije povreda na službi?",
    court_position:
      "Sud je odbio zahtev za stimulaciju tokom godišnjeg odmora i većeg dela bolovanja, jer Pravilnik MUP-a stimulaciju vezuje za rad i posebno bolovanje od povrede na službi, a prvostepeni sud je delimično usvojio razliku za određene periode.",
    reasoning:
      "Koeficijent tužioca nije značajno ispod uporednog radnika. Tužena nije isplaćivala stimulaciju za GO i većinu bolovanja pozivajući se na čl. 9. Pravilnika. Revizijski sud prihvata da je Pravilnik posebni izvor prava koji u tom delu isključuje primenu Zakona o platama državnih službenika za te oblike odsustva.",
    keywords: ["stimulacija", "godišnji odmor", "bolovanje", "MUP"],
    related_articles: ["Pravilnik o platama zaposlenih u MUP", "Zakon o policiji"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3132/2010",
    legal_area: "labor",
    legal_question:
      "Da li policajci imaju pravo na dodatke na platu ako im koeficijent nije pojedinačno uvećan radi kompenzacije prekovremenog, noćnog i prazničnog rada?",
    court_position:
      "Ustavni sud je usvojio žalbu i utvrdio povredu prava na pravičnu naknadu i jednaku zaštitu, konstatujući da dodaci nisu automatski pokriveni generičkim uvećanjem koeficijenta.",
    reasoning:
      "Sud ponavlja ranije stavove (Už-1530/2008, Už-2822/2010, Už-1362/2009) o isplati dodataka u vreme Zakona o unutrašnjim poslovima i posle Zakona o policiji, osim ako je rad posebno vrednovan pri utvrđivanju koeficijenta. Drugostepeni sud je izveo pogrešan zaključak o pokriću.",
    keywords: ["policija", "dodaci", "koeficijent", "jednaka zaštita"],
    related_articles: ["čl. 36. st. 1 Ustava", "čl. 60. st. 4 Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 818/2023",
    legal_area: "labor",
    legal_question:
      "Da li se naknada materijalne štete po osnovu izgubljene zarade može dosuditi za period godišnjeg odmora i bolovanja bez utvrđene uzročne veze sa povredom na radu?",
    court_position:
      "Vrhovni sud je delimično odbio reviziju tuženog u delu nematerijalne štete potvrđujući podeljenu odgovornost, a u delu materijalne štete ukinuo odluku i vratio predmet radi utvrđivanja uzročne veze posle procene radne sposobnosti.",
    reasoning:
      "Posle preporuke lekarske komisije o radu sa skraćenim vremenom, tužilja je koristila GO i bolovanje. Drugostepeni sud je greškom prihvatio dosuđivanje zarade u punom obimu i za periode odmora/bolovanja bez analize uzročnosti štete u odnosu na povredu na radu i radnu sposobnost.",
    keywords: ["povreda na radu", "uzročna veza", "godišnji odmor", "materijalna šteta"],
    related_articles: ["Zakon o radu", "Zakon o obveznim odnosima"],
    outcome: "remanded",
  },
  // ── BATCH 2 (28) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 3217/2018",
    legal_area: "labor",
    legal_question:
      "Da li se zarada lekara specijaliste obračunava po punom radnom vremenu od 36 časova nedeljno kada je to ugovoreno, umesto po 40-časovnoj nedelji?",
    court_position:
      "Apelacioni sud je potvrdio presudu koja priznaje razliku u zaradi prema ugovorenom punom radnom vremenu od 36 sati nedeljno, uz primenu veštaka koji je preračunavao sate odmora i praznika u skladu sa tim ugovorom i PKU.",
    reasoning:
      "Veštak je koristio evidencije prisustva, dežurstava i rešenja o prekovremenom radu, beležeći dane odmora i praznika u skladu sa 36-časovnom nedeljom umesto osmosatnim danom kada je tako ugovoreno. Tuženi obračun po 40 sati bio je pogrešan u odnosu na ugovor i kolektivni ugovor.",
    keywords: ["radno vreme", "36 sati nedeljno", "lekar", "veštačenje"],
    related_articles: ["Zakon o radu", "PKU"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3003/2019",
    legal_area: "labor",
    legal_question:
      "Da li je poslodavac dužan da isplati uvećanu zaradu, troškove prevoza i naknadu za neiskorišćeni godišnji odmor u skladu sa čl. 106–108 i 118 i 76 Zakona o radu kada je veštak utvrdio iznose?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog kao neosnovanu i potvrdio nižestepene presude, ocenivši da nema pogrešne primene materijalnog prava.",
    reasoning:
      "Citirane su odredbe o strukturi zarade, minimalnim uvećanjima (uključivo zbir procenata), naknadi troškova prevoza i naknadi umesto korišćenja godišnjeg odmora. Revizija osporava činjenice, što nije dozvoljeno po čl. 407. st. 2 ZPP.",
    keywords: ["prekovremeni rad", "prevoz", "godišnji odmor", "veštačenje"],
    related_articles: ["čl. 106–108", "čl. 118", "čl. 76 Zakona o radu", "čl. 407. st. 2 ZPP"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2469/2020",
    legal_area: "labor",
    legal_question:
      "Da li inostrane dnevnice pripadaju po ugovoru koji poziva na poseban propis, iako poslodavac kasnije menja interne akte?",
    court_position:
      "Sud je odbio reviziju tuženog i potvrdio pravo tužioca na isplatu dnevnica u skladu sa ugovorom i transepcijom primene Uredbe o državnim službenicima do izmene Zakona o radu, a zatim po aktima poslodavca kada je to zakon dozvolio.",
    reasoning:
      "Utvrđena je hronologija Pravilnika i odluka direktora o visini dnevnica i primena posebnog propisa u periodu kada je to bilo zakonski predviđeno. Ugovorena primena posebnog propisa ima prednost dok ugovor nije aneksom izmenjen.",
    keywords: ["dnevnice", "službeni put", "inostranstvo", "ugovor o radu"],
    related_articles: ["Zakon o radu", "Uredba o naknadi troškova državnih službenika"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1508/2015",
    legal_area: "labor",
    legal_question:
      "Da li MUP pravilnik isključuje stimulaciju za GO i bolovanje i da li se primenjuje Zakon o platama državnih službenika umesto pravilnika?",
    court_position:
      "Sud je odbio zahtev za stimulaciju tokom GO i bolovanja prema čl. 9. Pravilnika, ali je ukinuo odluke u delu prekovremenog i noćnog rada radi ponovnog odlučivanja zbog pogrešne primene materijalnog prava.",
    reasoning:
      "Pravilnik MUP-a donet u sprovođenju Zakona o policiji nije podzakonski akt u odnosu na Zakon o platama državnih službenika za odsustva koja Pravilnik izričito isključuje. Za prekovremeni i noćni rad materijalno pravo nije pravilno primenjeno, pa je potrebno novo suđenje.",
    keywords: ["MUP", "stimulacija", "prekovremeni rad", "noćni rad"],
    related_articles: ["Zakon o policiji", "Pravilnik o platama MUP"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1196/2016",
    legal_area: "labor",
    legal_question:
      "Da li radnje poslodavca u sezoni predstavljaju mobing ili dopuštenu organizaciju rada kada je zaposleni radio intenzivno i prekidao godišnji odmor?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu o mobingu i vratio predmet na ponovno suđenje, naloživši ponovnu ocenu da li postoji zlostavljanje ili legitimna organizacija rada u poljoprivrednoj sezoni.",
    reasoning:
      "Opisuje se intenzivan rad, prekid godišnjeg odmora i prekovremeni sati. Drugostepeni sud smatra da prvostepeni sud nije pravilno kvalifikovao ponašanje poslodavca u kontekstu sezonskih potreba i da je potrebno preciznije utvrđivanje činjenica i pravna kvalifikacija.",
    keywords: ["mobing", "zlostavljanje", "sezonski rad", "godišnji odmor"],
    related_articles: ["Zakon o radu"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4238/2010",
    legal_area: "labor",
    legal_question:
      "Da li policajci imaju pravo na dodatke na platu i da li se deo zahteva za topli obrok i regres može odbiti posebnim osnovom?",
    court_position:
      "Ustavni sud je usvojio žalbu u delu dodataka na platu i poništio presudu Apelacionog suda, dok je deo zahteva za topli obrok i regres odbio kao neosnovan u ustavnosudskom delu postupka.",
    reasoning:
      "Ponavlja se ustavnopravna linija o dodacima za prekovremeni, noćni i praznični rad u periodu ZUI i posle Zakona o policiji, osim ako je rad vrednovan u koeficijentu. Za topli obrok i regres Ustavni sud delimeno odbija zahtev prema ranije utvrđenim granicama žalbe.",
    keywords: ["MUP", "dodaci", "topli obrok", "regres"],
    related_articles: ["čl. 60. st. 4 Ustava"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1283/2025",
    legal_area: "labor",
    legal_question:
      "Da li rad na privremenim i povremenim poslovima stvara pravo na preobražaj u rad na neodređeno vreme i prateće naknade?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje zahteva za preobražaj radnog odnosa, ali ukinuo otkaz ugovora o privremenim poslovima jer rešenje nije sadržalo konkretizovane razloge o vremenu i načinu navodnih povreda.",
    reasoning:
      "Nije prihvaćena pravna fikcija radnog odnosa na neodređeno vreme posle ugovora na određeno vreme do 24 meseca. Rad na PP jeste rad van radnog odnosa, bez prava na naknadu zarade tokom sprečenosti, GO i prevoza. Otkaz PP mora biti obrazložen konkretno; akcesorna naknada štete pada sa neosnovanim poništajem rešenja o prestanku PP.",
    keywords: ["privremeni i povremeni poslovi", "otkaz", "preobražaj"],
    related_articles: ["Zakon o radu"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4471/2018",
    legal_area: "labor",
    legal_question:
      "Da li neblagovremena tužba za utvrđenje radnog odnosa isključuje novčana potraživanja iz radnog odnosa kada je faktički rad nesporan?",
    court_position:
      "Ustavni sud je usvojio žalbu i poništio presudu Vrhovnog kasacionog suda, utvrdivši povredu prava na pravično suđenje jer potraživanja ne mogu biti odbijena isključivo zbog neblagovremene tužbe za utvrđenje kada je rad faktički ostvaren.",
    reasoning:
      "U motivu se citiraju odredbe ZOR o godišnjem odmoru, strukturi zarade, uvećanjima i naknadama troškova. Ustavni sud ocenjuje da je pristup koji apsolutno vezuje novčana potraživanja za formalnu tužbu za utvrđenje doveo do nerazumne posledice u odnosu na očigledno ostvareni rad.",
    keywords: ["utvrđenje radnog odnosa", "blagovremenost", "faktički rad", "naknada"],
    related_articles: ["čl. 32. st. 1 Ustava", "Zakon o radu", "Zakon o obveznim odnosima"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 3757/2010",
    legal_area: "labor",
    legal_question:
      "Da li je pogrešan zaključak da su dodaci policajcu pokriveni uvećanjem koeficijenta bez individualizacije?",
    court_position:
      "Ustavni sud je usvojio žalbu policijskog službenika i utvrdio povredu prava na pravično suđenje i pravičnu naknadu, poništavajući presude kojima je primenjen apsolutni stav o pokriću dodataka koeficijentom.",
    reasoning:
      "Ponavlja se ranija praksa Ustavnog suda o dodacima za prekovremeni, noćni i praznični rad u periodu ZUI i posle Zakona o policiji, osim kada je rad posebno vrednovan u koeficijentu. Podzakonski i sudski stav mora da bude individualizovan i dokazan.",
    keywords: ["policija", "koeficijent", "dodaci", "Ustavni sud"],
    related_articles: ["čl. 32. st. 1 Ustava", "čl. 60. st. 4 Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2673/2022",
    legal_area: "labor",
    legal_question:
      "Da li zaposlenom koji je deo godine radio, a zatim dugo bio na bolovanju do penzije, pripada naknada za neiskorišćeni godišnji odmor za tu godinu?",
    court_position:
      "VKS je zauzeo stav da pravo na naknadu za neiskorišćeni godišnji odmor postoji za godinu u kojoj je ostvaren rad i utrošak, i da bolovanje samo po sebi ne isključuje obavezu isplate pri prestanku radnog odnosa ako odmor nije mogao da se koristi.",
    reasoning:
      "Suprotno drugostepenom stavu, obaveza isplate po čl. 76. Zakona o radu nije isključena kada zbog bolovanja zaposleni objektivno nije mogao da iskoristi odmor do prestanka. Tužilac je ostvario deo odmora, ostatak nije mogao iskoristiti do isteka roka iz rešenja jer je bio na bolovanju do penzije.",
    keywords: ["godišnji odmor", "bolovanje", "penzija", "čl. 76 Zakona o radu"],
    related_articles: ["čl. 76 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 9101/2019",
    legal_area: "labor",
    legal_question:
      "Da li nasledniku vojnog nameštenika pripada naknada za neiskorišćeni godišnji odmor kada je odmor propusten zbog bolesti, a ne zbog potreba službe?",
    court_position:
      "Upravni sud je odbio tužbu, smatrajući pravilnim zaključak organa da nisu ispunjeni uslovi iz Zakona o Vojsci Srbije jer pokojni nije koristio odmor zbog bolesti, a ne zbog potreba službe.",
    reasoning:
      "Organ je utvrdio trajanje bolovanja do smrti i neiskorišćene dane odmora. Čl. 105. st. 5 ZVS uslovljava naknadu neiskorišćenog odmora potrebama službe, što ovde nije slučaj, pa zahtev naslednika nema osnova.",
    keywords: ["Vojska", "naslednik", "godišnji odmor", "bolest"],
    related_articles: ["čl. 105. st. 5 Zakona o Vojsci Srbije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 646/2015",
    legal_area: "labor",
    legal_question:
      "Da li VKS podržava zahtev za stimulacijom tokom godišnjeg odmora i kako odlučuje o noćnom radu?",
    court_position:
      "Sud je odbio reviziju u delu stimulacije za GO jer Pravilnik MUP to isključuje, a ukinuo je presude u delu noćnog rada i vratio predmet na ponovno suđenje zbog pogrešne primene materijalnog prava.",
    reasoning:
      "Isti pravni okvir kao u srodnim predmetima: stimulacija je posebna naknada samo za rad i posebno bolovanje od povrede na službi. Za noćni rad revizijski sud nalazi da materijalno pravo nije pravilno primenjeno u pobijanom delu presude.",
    keywords: ["MUP", "stimulacija", "noćni rad", "revizija"],
    related_articles: ["Pravilnik o platama MUP", "Zakon o policiji"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1188/2008",
    legal_area: "labor",
    legal_question:
      "Da li je policajcu povređeno pravo na pravičnu naknadu kada mu je sud odbio dodatke pozivajući se na čl. 47 ZUI o uvećanju plate?",
    court_position:
      "Ustavni sud je usvojio žalbu i utvrdio povredu prava na pravičnu naknadu, poništavajući drugostepenu presudu i naloživši ponovno odlučivanje o dodacima za prekovremeni, noćni i praznični rad.",
    reasoning:
      "Drugostepeni sud je smatrao da je u platu uračunata naknada za posebne oblike rada preko čl. 47 ZUI, što Ustavni sud ocenjuje kao pogrešan pristup koji isključuje posebna primanja bez individualizacije. Prvostepeni sud u Valjevu je delimično usvojio zahtev.",
    keywords: ["policija", "ZUI", "dodaci", "Ustavni sud"],
    related_articles: ["čl. 60. st. 4 Ustava", "čl. 47 Zakona o unutrašnjim poslovima"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 61/2011",
    legal_area: "labor",
    legal_question:
      "Da li je sud nadležan za spor o doprinosima i da li je odbačaj tužbe zbog nenadležnosti povredio pravo na pravično suđenje?",
    court_position:
      "Ustavni sud je usvojio žalbu i poništio rešenje kojim je odbačena tužba za doprinose, utvrdivši povredu prava na pravično suđenje i vraćajući predmet na ponovno odlučivanje.",
    reasoning:
      "VKS je smatrao da sud nije nadležan za tužbu za doprinose. Ustavni sud ukazuje na vezu sa pravom na pravičnu naknadu za rad i raniju praksu o dodacima policiji, ocenjujući da je odbačaj bio štetan po efikasnu zaštitu prava.",
    keywords: ["doprinosi", "nenadležnost", "Ustavni sud", "MUP"],
    related_articles: ["čl. 32. st. 1 Ustava", "čl. 60. st. 4 Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 787/2023",
    legal_area: "labor",
    legal_question:
      "Da li su odluke poslodavca o preraspodeli radnog vremena zakonite i da li tužiocu pripada uvećana zarada za prekovremeni rad?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i delimično usvojio zahtev za prekovremeni rad, utvrdivši da prerasporedi radnog vremena nisu bili zakoniti, uz obračun sati i iznosa po mesecima u nalazu veštaka.",
    reasoning:
      "U obrazloženju su navedeni konkretni brojevi sati prekovremenog rada po mesecima za 2012–2014. godine i pripadajući iznosi. Drugostepeni sud je ocenio da prvostepeni sud nije pravilno ocenio zakonitost rasporeda i obim prekovremenog rada.",
    keywords: ["preraspodela radnog vremena", "prekovremeni rad", "veštačenje"],
    related_articles: ["Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 389/2019",
    legal_area: "labor",
    legal_question:
      "Da li se naknada zarade za vreme godišnjeg odmora obračunava po proseku 12 meseci posle izmene Zakona o radu i da li treba uračunati vanredne isplate u osnovicu?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom se školi nalaže isplata razlike naknade zarade za GO jer je pogrešno uzet referentni period i propustene vanredne isplate koje čine deo zarade.",
    reasoning:
      "Čl. 114 Zakona o radu (izmena od 29.7.2014.) prebacuje referentni period sa 3 na 12 meseci radi pravičnijeg obračuna. Tužilje su koristile GO od jula 2014, pa je primena 12 meseci ispravna. PKU za škole upućuje na Zakon o radu za obračun naknade plate na GO.",
    keywords: ["naknada zarade", "godišnji odmor", "12 meseci", "vanredne isplate"],
    related_articles: ["čl. 114 Zakona o radu", "PKU za škole"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1202/2015",
    legal_area: "labor",
    legal_question:
      "Da li policajac ima pravo na stimulativnu naknadu od 10% za vreme korišćenja godišnjeg odmora i plaćenog odsustva?",
    court_position:
      "Revizija tužioca je odbijena kao neosnovana; stimulacija za GO i plaćeno odsustvo nije predviđena čl. 9. Pravilnika MUP, pa tužbeni zahtev u tom delu nema pravne osnove uprkos prvostepenom delimičnom usvajanju.",
    reasoning:
      "Pravilnik pravi razliku između koeficijenata i stimulacije koja pripada samo za rad i posebno bolovanje od povrede na službi. Zakon o platama državnih službenika ne primenjuje se umesto Pravilnika za ove oblike odsustva. Prvostepena primena u korist tužioca je revizijski ispravljena.",
    keywords: ["stimulacija", "godišnji odmor", "MUP", "revizija"],
    related_articles: ["Pravilnik o platama MUP", "čl. 32 Zakona o platama državnih službenika"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1357/2015",
    legal_area: "procedural",
    legal_question:
      "Da li je u delu stimulacije za GO dopuštena revizija i kako sud odlučuje o preostalom delu potraživanja?",
    court_position:
      "VKS je preinačio presude i odbio zahtev za stimulaciju tokom GO i plaćenog odsustva; u ostalom delu revizija nije bila dozvoljena zbog cenzusa.",
    reasoning:
      "Ista pravna konstrukcija kao u Rev2 1202/2015: čl. 9. Pravilnika isključuje stimulaciju za GO; Zakon o platama državnih službenika ne primenjuje se. Za ostatak predmeta revizija je nedozvoljena.",
    keywords: ["stimulacija", "revizija", "cenzus", "MUP"],
    related_articles: ["Pravilnik o platama MUP", "ZPP"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 15441/2014",
    legal_area: "labor",
    legal_question:
      "Da li zaposlenoj koja nije radila punu godinu zbog prekida i vraćanja na rad pripada naknada za pun neiskorišćeni godišnji odmor?",
    court_position:
      "Sud je odbio tužbu za preostali deo odmora jer pravo na odmor i naknadu mora biti srazmerno stvarno ostvarenom radu u godini, a prvostepeni organ je pravilno priznao srazmeran deo.",
    reasoning:
      "Kada rukovodilac ne postupi po Zakonu o radu i PKU, nastaje krivica i pravo na naknadu po čl. 76. Tužilja je imala prekid radnog odnosa i vratila se bez šest meseci neprekidnog rada u 2014, pa joj pripada dvanaestina odmora po mesecu rada, a ne pun odmor.",
    keywords: ["godišnji odmor", "srazmernost", "prekid radnog odnosa"],
    related_articles: ["čl. 76 Zakona o radu", "PKU"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 4017/2017",
    legal_area: "labor",
    legal_question:
      "Da li zaposlenik koji je deo godišnjeg odmora proveo na radu ima pravo na naknadu za neiskorišćeni odmor pre penzije?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i vratio predmet na ponovno suđenje radi utvrđivanja da li je zaposleni stvarno radio u danima koji su formalno bili GO i da li postoji evidencija prisustva.",
    reasoning:
      "Nesporno je da su dva dana GO tužilac radio na poslovima komisija i da mu je za to priznata naknada; za ostale dane ostalo je neutvrđeno da li je radio bez naloga poslodavca. Ako je radio, mogao bi da ostvari pravo na naknadu za neiskorišćeni deo. Pravilo o neoduživosti prava na GO ima ustavnu pozadinu.",
    keywords: ["godišnji odmor", "penzija", "rad tokom odmora", "ukidanje presude"],
    related_articles: ["čl. 60 Ustava", "čl. 68–76 Zakona o radu"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 669/2009",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac snosi krivicu za neiskorišćen godišnji odmor kada zaposleni nije podneo zahtev za korišćenje posle promene zaposlenja?",
    court_position:
      "Ustavni sud je odbio žalbu jer poslodavac nije kriv kada radnik posle promene radnog mesta sam nije tražio korišćenje odmora, pa sam doprinosi neostvarivanju prava.",
    reasoning:
      "Citira se stari Zakon o radu (2001) o sticanju prava na GO posle šest meseci, rešenjima o rasporedu i naknadi štete po čl. 60. Novi Zakon o radu iz 2005. detaljnije uređuje GO. U konkretnom slučaju nije utvrđena krivica poslodavca usled pasivnosti tužioca.",
    keywords: ["godišnji odmor", "zahtev zaposlenog", "krivica poslodavca"],
    related_articles: ["Zakon o radu (2001)", "Zakon o radu (2005)"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 5555/2013",
    legal_area: "labor",
    legal_question:
      "Da li izjava radnika da nema potraživanja otpušta pravo na razliku otpremnine, uvećanja i naknade za neiskorišćeni godišnji odmor?",
    court_position:
      "Apelacioni sud je potvrdio presudu koja obavezuje poslodavca na isplate uprkos izjavi, smatrajući da izjava ne predstavlja pravno otpuštanje duga već samo prebacuje teret dokazivanja.",
    reasoning:
      "Utvrđeno je da su ostala potraživanja ostvarena (razlika otpremnine, uvećanja, GO za 2008) i da izjava od 19.2.2009. ne može da eliminiše zakonska prava koja nisu bila predmet svesnog pravnog raspolaganja u jasnom obimu.",
    keywords: ["izjava", "otpremnina", "godišnji odmor", "potraživanje"],
    related_articles: ["čl. 158 Zakona o radu", "Zakon o obligacionim odnosima"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 6452/2014",
    legal_area: "labor",
    legal_question:
      "Da li vojniku pripada naknada za neiskorišćeni godišnji odmor kada je ostao na bolovanju do prestanka službe?",
    court_position:
      "Upravni sud je odbio tužbu jer neiskorišćenost odmora proizilazi iz bolovanja, a ne iz potreba službe ili krivice poslodavca, što je uslov po Zakonu o Vojsci Srbije i analogiji sa čl. 76. Zakona o radu.",
    reasoning:
      "Organ je utvrdio kontinuirano bolovanje do prestanka profesionalne vojne službe. Čl. 105. st. 5 ZVS zahteva vezu sa potrebama službe ili krivicom poslodavca; bolovanje isključuje osnov za naknadu po tom članu.",
    keywords: ["Vojska", "bolovanje", "godišnji odmor"],
    related_articles: ["čl. 105. st. 5 Zakona o Vojsci Srbije", "čl. 76 Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 53/2025",
    legal_area: "labor",
    legal_question:
      "Da li pasivnost zaposlenog da traži GO isključuje pravo na naknadu za neiskorišćeni odmor pri likvidaciji?",
    court_position:
      "Vrhovni sud je presudio u korist zaposlenog: poslodavac je dužan da organizuje korišćenje GO i donese rešenje na vreme; nepodnošenje zahteva od strane radnika ne ukida pravo na naknadu pri prestanku.",
    reasoning:
      "Ponavlja se čl. 68–76 Zakona o radu o neoduživosti prava na GO i obavezi isplate naknade srazmerno neiskorišćenom delu. Konkretno: rešenjem je određen GO za 2016, radnik ga nije koristio do prestanka 2017, pa pripada naknada po proseku 12 meseci.",
    keywords: ["likvidacija", "godišnji odmor", "pasivnost radnika", "rešenje o GO"],
    related_articles: ["čl. 68", "čl. 75", "čl. 76 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1593/2024",
    legal_area: "labor",
    legal_question:
      "Da li bolovanje isključuje pravo na naknadu za neiskorišćeni godišnji odmor do odlaska u penziju?",
    court_position:
      "Apelacioni sud je potvrdio presudu koja obavezuje MUP na naknadu za neiskorišćeni srazmerni GO, smatrajući da krivica poslodavca nije uslov kada je radnik u penziji ostao bez korišćenja odmora.",
    reasoning:
      "Pravo na GO je neoduživo; poslodavac mora doneti rešenje i omogućiti korišćenje. Čl. 164 ZOR u vezi čl. 154 st. 1 podrazumeva naknadu štete pri prestanku. Bolovanje samo po sebi ne ukida pravo na srazmeran GO za godine u kojima je radni odnos postojao.",
    keywords: ["MUP", "penzija", "godišnji odmor", "bolovanje"],
    related_articles: ["čl. 68 st. 4 Zakona o radu", "čl. 164 Zakona o radu", "čl. 154 st. 1 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 2493/2024",
    legal_area: "labor",
    legal_question:
      "Da li raspored 12 sati rada svakog drugog dana predstavlja smenski rad koji daje pravo na posebnu naknadu?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i odbio zahtev za uvećanje po osnovu smenskog rada jer nedostaje izmena smena kao element smenskog rada.",
    reasoning:
      "U izreci su detaljno pobijani iznosi naknade za manje isplaćenu naknadu zarade za vreme GO po osnovu smenskog rada po mesecima 2020–2021. Drugostepeni sud nalazi da rad u istom intervalu svakog drugog dana bez rotacije smena ne ispunjava pojam smenskog rada.",
    keywords: ["smenski rad", "GO", "preinačenje presude"],
    related_articles: ["Zakon o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 714/2021",
    legal_area: "labor",
    legal_question:
      "Da li je zakonito da se topli obrok i regres „urade“ u vrednost radnog časa bez nominalnog iskaza u platnoj listi?",
    court_position:
      "VKS je usvojio reviziju zaposlenog, ukinuo drugostepenu presudu i vratio predmet na ponovno suđenje jer odredbe kolektivnog ugovora koje guraju te naknade u cenu sata bez jasnog nominalnog iznosa nisu saglasne sa Zakonom o radu.",
    reasoning:
      "Od 2006. zaposleni imaju pravo na posebne naknade za ishranu i regres koje poslodavac mora da utvrdi aktom; visina mora biti linearna za sve zaposlene. Formulacija da su uključene u sat onemogućava kontrolu i ispunjenje zakonske obaveze iskaza u obračunskoj listi.",
    keywords: ["topli obrok", "regres", "kolektivni ugovor", "obračunska lista"],
    related_articles: ["čl. 118 st. 1 tač. 5–6 Zakona o radu"],
    outcome: "remanded",
  },
  // ── BATCH 3 (27) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 7406/2015",
    legal_area: "labor",
    legal_question:
      "Da li izjava o nemajući potraživanja otpušta pravo na otpremninu i naknadu za neiskorišćeni godišnji odmor kada je radnik otpušten zbog prestanka potrebe za poslom?",
    court_position:
      "PAS je potvrdio da pravo na otpremninu ima ustavni karakter i da se radnik ne može odreći pravnog prava na otpremninu; potvrđena su potraživanja za razliku zarade, otpremninu i naknadu za GO, uz delimično ukidanje zbog protivrečnosti razloga.",
    reasoning:
      "Primenjeni su Pravilnik poslodavca i kolektivni ugovor o regresu za GO. Čl. 105 Pravilnika dozvoljava otkaz posle isplate otpremnine uz uslove iz čl. 179 ZOR. Izjava o nemajući potraživanja ne može da zameni zakonski minimum otpremnine.",
    keywords: ["otpremnina", "izjava", "godišnji odmor", "neoduživost"],
    related_articles: ["čl. 179 Zakona o radu", "čl. 60 Ustava"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 4671/2021",
    legal_area: "labor",
    legal_question:
      "Da li PKU za javna preduzeća u komunalnoj delatnosti ima prednost nad Pravilnikom o radu i da li Zakon o privremenom uređivanju osnovica isključuje naknade za ishranu i regres?",
    court_position:
      "Apelacioni sud je potvrdio presudu koja nalaže isplatu razlika za topli obrok i regres po PKU, smatrajući da PKU ima prednost nad pravilnikom poslodavca i da zakon o osnovicama ne utiče na ta prava u ovom kontekstu.",
    reasoning:
      "PKU predviđa minimalne iznose za ishranu i regres i uvećanja zarade. Prvostepeni sud je pravilno primenio materijalno pravo na utvrđenom činjeničnom stanju o aneksima ugovora i primeni PKU na javno komunalno preduzeće.",
    keywords: ["PKU", "komunalna delatnost", "regres", "ishrana"],
    related_articles: ["Posebni kolektivni ugovor", "Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 601/2019",
    legal_area: "labor",
    legal_question:
      "Da li su topli obrok i regres isplaćeni ako su „uključeni“ u cenu radnog časa ali nisu nominalno iskazani u platnoj listi?",
    court_position:
      "VKS je preinačio drugostepenu presudu i potvrdio prvostepenu koja nalaže isplatu, jer bez nominalnog iznosa u listi nije ispunjena zakonska obaveza transparentnog obračuna.",
    reasoning:
      "Isti pravni test kao u Rev2 714/2021 i Rev2 3116/2019: naknade moraju biti u novcu i linearno jednake; uključivanje u sat bez izdvajanja iznosa onemogućava ostvarivanje prava iz čl. 118 ZOR-a.",
    keywords: ["topli obrok", "regres", "obračunska lista", "Kolektivni ugovor"],
    related_articles: ["čl. 118 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 35/2011",
    legal_area: "labor",
    legal_question:
      "Da li su naknade za ishranu i regres zaposlenoj u MUP-u bile sadržane u koeficijentu plate u relevantnom periodu?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu jer je utvrđeno da su prema važećim propisima te naknade bile uračunate u koeficijent, pa nije došlo do povrede prava.",
    reasoning:
      "Podnositeljka osporava odbijanje zahteva pozivom na čl. 4. st. 2 Zakona o platama u državnim organima do 2007. i praksu drugih sudova. Ustavni sud nalazi da je u tom periodu sistem uračunavanja u koeficijent bio zakonit i da žalba nije osnovana.",
    keywords: ["MUP", "koeficijent", "topli obrok", "regres"],
    related_articles: ["Zakon o platama u državnim organima i javnim službama"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 2271/2018",
    legal_area: "labor",
    legal_question:
      "Da li se naknada za neiskorišćeni GO može dosuditi za period kada zaposleni nije radio zbog nezakonitog otkaza i da li se kumuluje sa izgubljenom zaradom?",
    court_position:
      "Apelacioni sud je potvrdio poništaj nezakonitog otkaza zbog neadekvatnog upozorenja, ali ukinuo deo o naknadi za neiskorišćeni GO radi ponovnog odlučivanja zbog kumulacije sa izgubljenom zaradom i srazmernosti za period bez rada.",
    reasoning:
      "Pravo na GO pretpostavlja rad i utrošak energije; za period nezakonitog prestanka bez rada ne postoji ista osnova za GO kao za period rada. Ako je izgubljena zarada već pokrila štetu, kumulacija sa GO za isti period zahteva posebnu analizu.",
    keywords: ["nezakonit otkaz", "godišnji odmor", "izgubljena zarada", "upozorenje"],
    related_articles: ["čl. 179–191 Zakona o radu", "Konvencija MOR o plaćenom GO"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1830/2016",
    legal_area: "labor",
    legal_question:
      "Da li je krivica poslodavca uslov za naknadu za neiskorišćeni godišnji odmor pri prestanku radnog odnosa?",
    court_position:
      "VKS je preinačio drugostepenu presudu i potvrdio prvostepenu koja dosuđuje naknadu za neiskorišćeni GO pri odlasku u penziju, smatrajući da obaveza isplate postoji bez dokazivanja krivice poslodavca.",
    reasoning:
      "Čl. 76. ZOR propisuje isplatu naknade pri prestanku ako GO nije korišćen, bez uslovljavanja krivicom u izreci stava 1; stav 2 određuje karakter naknade štete. Ako poslodavac nije doneo rešenje o GO do prestanka, obaveza isplate sledi.",
    keywords: ["godišnji odmor", "penzija", "krivica poslodavca", "čl. 76"],
    related_articles: ["čl. 76 Zakona o radu", "čl. 416 ZPP"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 4404/2014",
    legal_area: "labor",
    legal_question:
      "Da li se krivica poslodavca za neiskorišćen GO pretpostavlja kada nije doneto rešenje o korišćenju odmora?",
    court_position:
      "Sud je potvrdio presudu kojom je utvrđeno potraživanje za naknadu štete zbog neiskorišćenog GO, polazeći od pretpostavke krivice poslodavca kada nije dostavljeno rešenje najkasnije 15 dana pre početka GO.",
    reasoning:
      "Čl. 75. st. 1–2 ZOR obavezuju poslodavca na rešenje i rok dostave; nepostupanje znači uskraćivanje prava na GO. Čl. 76. daje naknadu štete po proseku tri meseca (tekst presude u sporu). Utvrđen je iznos potraživanja i rad na određeno vreme duže od šest meseci sa pravom na GO.",
    keywords: ["godišnji odmor", "rešenje", "pretpostavka krivice", "naknada štete"],
    related_articles: ["čl. 75", "čl. 76", "čl. 124 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1118/2020",
    legal_area: "labor",
    legal_question:
      "Da li uključivanje toplog obroka i regresa u vrednost radnog časa bez nominalnog iznosa može biti zakonito?",
    court_position:
      "VKS je dozvolio posebnu reviziju, preinačio presude i usvojio tužbeni za isplatu toplog obroka i regresa jer zakon zahteva novčani iskaz i jednaku linearnu visinu za sve zaposlene.",
    reasoning:
      "Ponavlja se argument iz čl. 118 ZOR i aneksa kolektivnog ugovora: uključivanje u sat bez nominalnog iznosa krši transparentnost. Poslodavac mora da isplati i posebno iskaže naknade; PKU/OKU određuju minimalne kriterijume.",
    keywords: ["topli obrok", "regres", "posebna revizija", "Kolektivni ugovor"],
    related_articles: ["čl. 118 Zakona o radu", "čl. 404 ZPP"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 5530/2013",
    legal_area: "labor",
    legal_question:
      "Da li vojniku pripada naknada za neiskorišćen GO 2007. kada je na bolovanju do prestanka službe?",
    court_position:
      "Upravni sud je odbio tužbu jer neiskorišćenost odmora proizilazi iz bolovanja i prestanka službe, a ne iz potreba službe ili krivice, što je uslov za naknadu po posebnim propisima.",
    reasoning:
      "Dokazi pokazuju bolovanje do razrešenja i plan GO; nije moguće istovremeno bolovanje i korišćenje GO. Nedostatak rešenja o GO nije odlučujući kada objektivno nije bilo moguće korišćenje zbog zdravstvenog stanja.",
    keywords: ["Vojska", "bolovanje", "godišnji odmor"],
    related_articles: ["Zakon o Vojsci Srbije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1507/2020",
    legal_area: "labor",
    legal_question:
      "Da li poslodavac mora isplatiti uvećanu zaradu za prekovremeni i praznični rad kada zaposlena radi i vikendom bez adekvatne evidencije poslodavca?",
    court_position:
      "VKS je odbio reviziju tuženog i potvrdio presudu koja dosuđuje uvećanja, jer poslodavac nije dokazao zakonitu preraspodelu radnog vremena niti je dostavio evidenciju koja osporava sate rada.",
    reasoning:
      "Pravilnikom je predviđeno pravo na uvećanja. Tužilja je radila u pekari često i vikendom. Poslodavac nije vodio evidenciju prekovremenih sati, pa snosi posledice nedostatka dokaza protiv sebe.",
    keywords: ["prekovremeni rad", "praznik", "evidencija", "pekara"],
    related_articles: ["Zakon o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 3911/2024",
    legal_area: "labor",
    legal_question:
      "Da li se radnik može odreći prava na godišnji odmor i da li MUP mora isplatiti naknadu za neiskorišćeni srazmerni deo pri penzionisanju?",
    court_position:
      "Apelacioni sud je potvrdio obavezu MUP da isplati naknadu za neiskorišćeni srazmerni GO, jer se pravo na GO ne može odreći ni sporazumom ni ćutanjem poslodavca koji ne organizuje korišćenje.",
    reasoning:
      "Poslodavac mora doneti rešenje i omogućiti korišćenje po čl. 72 ZOR. Visina je utvrđena veštačenjem. Navodi o odricanju nisu osnovani jer je čl. 68 st. 4 imperativan; isto proizlazi iz čl. 60 st. 4 Ustava.",
    keywords: ["MUP", "penzija", "godišnji odmor", "neoduživost"],
    related_articles: ["čl. 68 st. 4", "čl. 72", "čl. 76 Zakona o radu", "čl. 60 st. 4 Ustava"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 7007/2012",
    legal_area: "labor",
    legal_question:
      "Da li stimulacija od 10% ulazi u osnovicu za naknadu plate tokom godišnjeg odmora kod policijskih službenika?",
    court_position:
      "Apelacioni sud je potvrdio da stimulacija ne ulazi u osnovicu za naknadu plate za GO prema Pravilniku MUP, a predmet je delimično vraćen na ponovno suđenje u delu neiskorišćenih sati odmora.",
    reasoning:
      "Utvrđeno je da je naknada plate za GO obračunavana bez stimulacije iz čl. 9. Pravilnika, što je pravilno jer stimulacija nije deo osnovice za GO po internom aktu. Za druge delove zahteva potrebno je dodatno utvrđivanje.",
    keywords: ["MUP", "stimulacija", "godišnji odmor", "naknada plate"],
    related_articles: ["Pravilnik o platama MUP"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1009/2021",
    legal_area: "labor",
    legal_question:
      "Kako se utvrđuje topli obrok i regres kada Opšti kolektivni ugovor daje kriterijum, a poslodavac nema odluku o nominalnom regresu?",
    court_position:
      "VKS je preinačio drugostepenu presudu i potvrdio prvostepenu koja dosuđuje topli obrok i regres, koristeći kriterijume OKU i statističke podatke za regres kada nominalni iznos nije poznat.",
    reasoning:
      "Za ishranu je primenjen procenat od prosečne zarade po OKU do 2011, a za regres logika isplate do 31.12. sa 75% proseka u novembru referentne godine. Kad nije poznat 1/12 regresa, sud može da utvrdi visinu po okviru OKU.",
    keywords: ["topli obrok", "regres", "Opšti kolektivni ugovor", "veštačenje"],
    related_articles: ["čl. 118 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 554/2021",
    legal_area: "labor",
    legal_question:
      "Da li profesionalni vojnik može da dobije novčanu naknadu umesto slobodnih sati za prekovremeni rad bez saglasnosti nadležnog organa?",
    court_position:
      "VKS je preinačio presude i odbio tužbeni za razliku dodatka za prekovremeni rad, jer pravo na novčanu naknadu zavisi od upravne odluke starešine u skladu sa Pravilnikom o platama VS.",
    reasoning:
      "Upravni organ je pravnosnažno odbio zahtev za slobodne sate jer je protekao rok od šest meseci. Novčana naknada za prekovreme nije osnovana bez ispunjenja izuzetnih uslova i saglasnosti, pa tužbeni zahtev nema pravnu osnovu.",
    keywords: ["Vojska", "prekovremeni rad", "slobodni sati", "upravna odluka"],
    related_articles: ["Pravilnik o platama profesionalnih pripadnika Vojske Srbije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUo 302/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li su odredbe Pravilnika o radu poslodavca nezakonite ako uređuju radno vreme, GO i noćni rad?",
    court_position:
      "Ustavni sud je odbacio inicijativu za ocenu zakonitosti Pravilnika, utvrdivši da su uslovi za donošenje pravilnika ispunjeni i da osporene odredbe nisu suprotne Zakonu o radu niti OKU.",
    reasoning:
      "Inicijativa osporava režim noćnog rada, GO i druge institute. Sud nalazi da su rešenja o pravilniku doneta kada nema kolektivnog ugovora i da konkretne odredbe nisu u konfliktu sa višim pravom.",
    keywords: ["Pravilnik o radu", "inicijativa", "zakonitost"],
    related_articles: ["Ustav Republike Srbije", "Zakon o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 3453/2024",
    legal_area: "labor",
    legal_question:
      "Da li je otkaz zbog neopravdanog izostanka opravdan ako je zaposleni koristio GO po dogovoru sa rukovodiocem u skladu sa ustaljenom praksom?",
    court_position:
      "Vrhovni sud je potvrdio nezakonitost otkaza: ustaljena praksa odstupanja od formalnog rešenja o GO isključuje krivicu radnika; tužiocu pripada naknada štete umesto vraćanja na rad ako to traži.",
    reasoning:
      "Tužilac je koristio GO po dogovoru sa rukovodiocem zbog preseljenja, u skladu sa praksom poslodavca. To nije nepoštovanje discipline ni opravdani razlog za otkaz po ugovoru. Pravne posledice nezakonitog otkaza sled iz čl. 191 ZOR-a.",
    keywords: ["otkaz", "godišnji odmor", "ustaljena praksa", "naknada štete"],
    related_articles: ["čl. 191 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 7005/2011",
    legal_area: "labor",
    legal_question:
      "Da li je rešenje Žalbene komisije Vlade obrazloženo u delu o toplom obroku i regresu za 2006. godinu za pripadnike MUP?",
    court_position:
      "Upravni sud je poništio rešenje jer nije razloženo da li su naknade bile sadržane u koeficijentu plate, već je paušalno potvrđena primena materijalnog prava organa.",
    reasoning:
      "Tužioci traže regres i topli obrok za 2006. Osporeno rešenje nije sadržalo analizu koeficijenta i strukture plate, pa nije omogućena sudska kontrola zakonitosti u individualnom slučaju.",
    keywords: ["MUP", "regres", "topli obrok", "obrazloženje"],
    related_articles: ["Zakon o upravnim sporovima", "Zakon o platama u državnim organima"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1075/2010",
    legal_area: "labor",
    legal_question:
      "Da li nameštenik u sudu ima osnov za ustavnu žalbu zbog neisplate regresa i toplog obroka za 2005–2008?",
    court_position:
      "Ustavni sud je odbio žalbu kao neosnovanu jer u relevantnom periodu nije postojao poseban ni opšti propis koji direktno daje tražena prava nameštenicima u tom obliku.",
    reasoning:
      "Poziv na ustavna prava i praksu drugih sudova nije dovoljan ako pozitivno pravo ne sadrži osnov za traženu obavezu u tom vremenskom okviru. Ustavni sud je ocenio da nije povređeno pravo na pravičnu naknadu u smislu žalbe.",
    keywords: ["nameštenik", "regres", "topli obrok", "Ustavni sud"],
    related_articles: ["čl. 60 st. 4 Ustava"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 8257/2016",
    legal_area: "labor",
    legal_question:
      "Da li je pogrešno odbiti naknadu za neiskorišćen GO zbog tvrdnje da zaposleni nije podneo zahtev, ako poslodavac nije doneo rešenje?",
    court_position:
      "Ustavni sud je usvojio žalbu, poništio presudu PAS i utvrdio povredu prava na pravično suđenje jer teret da zaposleni traži GO ne može da zameni obavezu poslodavca da donese rešenje.",
    reasoning:
      "Citirani su čl. 68–76 ZOR i Konvencija MOR 132. Ako poslodavac ne dostavi rešenje na vreme, smatra se da je uskratio pravo. Zahtev tužbe za naknadu ne može biti odbijen isključivo zbog formalnog nedostatka zahteva zaposlenog.",
    keywords: ["godišnji odmor", "rešenje", "Ustavni sud", "Privredni sud"],
    related_articles: ["čl. 32 st. 1 Ustava", "čl. 75–76 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1693/2016",
    legal_area: "labor",
    legal_question:
      "Da li pravo na regres za GO postoji ako je radni odnos prestao pre donošenja odluke poslodavca o visini regresa?",
    court_position:
      "VKS je preinačio drugostepenu presudu i usvojio zahtev za isplatu regresa za 2009. godinu u iznosu od 500 dinara, smatrajući da pravo na regres prati korišćenje GO, a ne moment donošenja odluke dok je GO bio iskorišćen.",
    reasoning:
      "Čl. 118 tačka 6 ZOR daje pravo na regres u skladu sa opštim aktom i ugovorom. Tužilac je iskoristio GO za 2009; osporavanje zbog prestanka radnog odnosa pre odluke o visini regresa nije osnovano.",
    keywords: ["regres", "godišnji odmor", "prestanak radnog odnosa"],
    related_articles: ["čl. 118 tačka 6 Zakona o radu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Upravni sud Srbije",
    court_level: "administrative",
    case_number: "U 5287/2014",
    legal_area: "labor",
    legal_question:
      "Da li vojnoj službenici pripada naknada za neiskorišćen GO iz prethodne godine zbog pritvora, ako organ tvrdi da je odmor ostao neiskorišćen zbog potreba službe?",
    court_position:
      "Upravni sud je odbio tužbu jer je odmor ostao neiskorišćen zbog pritvora i ličnih okolnosti, a ne zbog potreba službe, što je uslov za naknadu po Zakonu o Vojsci Srbije.",
    reasoning:
      "Iako tužilja navodi potrebe službe i izmene plana, utvrđeno je da je u periodu kada je trebalo koristiti odmor bila u pritvoru, pa objektivno nije mogla da koristi GO iz 2012. Uslov čl. 105 ZVS nije ispunjen.",
    keywords: ["Vojska", "pritvor", "godišnji odmor", "potrebe službe"],
    related_articles: ["čl. 105 Zakona o Vojsci Srbije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 735/2014",
    legal_area: "labor",
    legal_question:
      "Da li je zakonito usloviti odobravanje korišćenja godišnjeg odmora podnošenjem zahteva za penziju kada zaposleni nema uslove za penziju?",
    court_position:
      "VKS je preinačio drugostepenu presudu i utvrdio nezakonitost prestanka radnog odnosa jer je poslodavac protivpravno vezao GO za podnošenje penzijskog zahteva, suprotno Konvenciji MOR 132 i čl. 68 ZOR-a.",
    reasoning:
      "Sporazumi o odricanju GO ili uslovljavanje GO novčanim ili drugim benefitima su suprotni ratifikovanoj konvenciji. Pravo na GO je neoduživo; poslodavac ne može da ga uslovljava nepostojećim penzijskim uslovima.",
    keywords: ["godišnji odmor", "penzija", "Konvencija 132", "nezakonitost otkaza"],
    related_articles: ["čl. 68", "čl. 73 Zakona o radu", "Konvencija MOR 132"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 4530/2022",
    legal_area: "labor",
    legal_question:
      "Da li profesionalni vojnik ima pravo na novčanu naknadu za prekovremeni rad kada mu je pravnosnažno odbijeno pravo na slobodne sate?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio da novčana naknada ne pripada jer nisu ispunjeni izuzetni uslovi iz Pravilnika o platama, a upravni organ je odbio korišćenje slobodnih sati po roku.",
    reasoning:
      "Tužilac je ostvario prekovreme koje nije iskoristio kao slobodne sate; upravni postupak je pravnosnažno odbio zahtev zbog isteka šestomesecnog roka. Bez ispunjenja izuzetnih uslova i saglasnosti nema novčane zamene.",
    keywords: ["Vojska", "prekovremeni rad", "slobodni sati"],
    related_articles: ["Pravilnik o platama Vojske Srbije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1748/2011",
    legal_area: "labor",
    legal_question:
      "Da li se neiskorišćeni dani GO mogu „pretvoriti“ u slobodne dane i uticati na pravo na naknadu po osnovu slobodnih dana?",
    court_position:
      "Apelacioni sud je delimeno preinačio presudu: potvrdio je zakonitost otkaza članu izvršnog odbora posle prinudne uprave, odbio zahtev za „slobodne dane“, ali potvrdio pravo na naknadu za neiskorišćeni GO.",
    reasoning:
      "Praksa poslodavca je obuhvatala evidentiranje GO, prekide odmora i prenos neiskorišćenih dana u slobodne dane koji nisu bili isto što i zakoniti regres/GFI. Sud je razdvojio pravne osnove i delimično usvojio tužbeni za GO.",
    keywords: ["slobodni dani", "godišnji odmor", "prinudna uprava", "otkaz"],
    related_articles: ["Zakon o radu"],
    outcome: "partially",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 4630/2012",
    legal_area: "labor",
    legal_question:
      "Da li je Apelacioni sud povredio pravo na plaćeni GO kada je ocenio da nema krivice poslodavca jer je zaposleni sam prekinuo odmor?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu jer osporena presuda nije proizvoljno ocenila da zaposlena samoinicijativno prekida GO i ne traži nastavak, pa ne postoji krivica poslodavca za neiskorišćen ostatak.",
    reasoning:
      "Primena čl. 68–76 ZOR zahteva krivicu poslodavca za naknadu. U konkretnom slučaju drugostepeni sud je razložio da podnositeljka nije tražila nastavak GO nakon prekida i da nije podnosila zahtev poslodavcu, pa nema osnova za čl. 76.",
    keywords: ["godišnji odmor", "krivica", "prekid odmora", "Ustavni sud"],
    related_articles: ["čl. 76 Zakona o radu"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "serbia",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 4993/2022",
    legal_area: "procedural",
    legal_question:
      "Da li je drugostepeni sud smeo da preinači prvostepenu presudu bez rasprave zbog druge ocene dokaza o korišćenju godišnjeg odmora?",
    court_position:
      "Vrhovni sud je ukinuo presudu Apelacionog suda u Novom Sadu i vratio predmet na ponovno suđenje jer je drugostepena izmena ocene dokaza učinjena bez održane rasprave, što predstavlja bitnu povredu postupka.",
    reasoning:
      "Tužilac je koristio GO po rešenjima u 2016–2018; spor je bio o satnici i obračunu. Drugostepeni sud ne može potpuno drugačije da oceni dokaze bez usmene rasprave kada je to od uticaja na odluku.",
    keywords: ["bitna povreda postupka", "rasprava", "žalba", "godišnji odmor"],
    related_articles: ["Zakon o parničnom postupku"],
    outcome: "remanded",
  },
  {
    jurisdiction: "serbia",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2850/2010",
    legal_area: "labor",
    legal_question:
      "Da li višedecenijsko trajanje radnog spora i pogrešna primena zastarelosti povređuju pravo na suđenje u razumnom roku?",
    court_position:
      "Ustavni sud je usvojio žalbu, utvrdio povredu prava na suđenje u razumnom roku i pravično suđenje zbog proizvoljne primene zastarelosti, dosudio nematerijalnu štetu i poništio odluke o zastarelosti.",
    reasoning:
      "Predmet su otpremnina, regres i druga potraživanja od 1987. nadalje sa višestrukim ukidanjima. Podnosilac je precizirao zahteve veštačenjem; odbijanje kao zastarelo bez pravilne analize subjektivnog roka povredjuje čl. 32. Ustava.",
    keywords: ["razuman rok", "zastarelost", "radni spor", "nematerijalna šteta"],
    related_articles: ["čl. 32 st. 1 Ustava", "čl. 376 ZOO"],
    outcome: "plaintiff_won",
  },
]
