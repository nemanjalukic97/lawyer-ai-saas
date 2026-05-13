// scripts/case-law-civil-serbia-1.ts
// Serbian civil/commercial case law: traffic torts, insurance, Guarantee Fund, regres, media/privacy (96 entries: batch 1 + batch 2 + batch 3).

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CIVIL_SERBIA_1: CaseLawInput[] = [
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1317/2023",
    legal_area: "civil",
    legal_question:
      "Da li tužiocu pripada naknada nematerijalne štete zbog saobraćajne nezgode uz solidarnu odgovornost vozača i Garantnog fonda kada je osiguravajuće društvo u stečaju, i kako se utvrđuje doprinos pešaka?",
    court_position:
      "Apelacioni sud je potvrdio presudu o naknadi nematerijalne štete i solidarnoj odgovornosti vozača i Garantnog fonda zbog stečaja osiguravača, uz pravilno utvrđen doprinos oštećenog pešaka od 50%. Odbijeni su žalbeni navodi prvotuženog da krivica nije dokazana, jer je krivica utvrđena pravnosnažnom krivičnom presudom.",
    reasoning:
      "Naknada nematerijalne štete obuhvata satisfakciju za fizičke i duševne bolove, strah i umanjenje životne aktivnosti radi psihičke ravnoteže. Prvostepeni sud je pravilno odmerio pravične iznose ceneći intenzitet i trajanje bolova, umanjenje sposobnosti i estetsko naruženje. Pravilno je dosuđena zakonska zatezna kamata od dana presuđenja (čl. 277 st. 1 ZOO u vezi sa čl. 189 st. 2 ZOO), jer se tada utvrđuju obim i visina štete. Žalba zasnovana na spornosti krivice nije odlučna u odnosu na pravnosnažnu krivičnu presudu koja vezuje za postojanje krivice.",
    keywords: [
      "nematerijalna šteta",
      "saobraćajna nezgoda",
      "Garantni fond",
      "solidarna odgovornost",
      "doprinos oštećenog",
      "zatezna kamata",
    ],
    related_articles: ["čl. 200 ZOO", "čl. 277 st. 1 ZOO", "čl. 189 st. 2 ZOO", "Zakon o obaveznom osiguranju u saobraćaju"],
    headnote:
      "Potvrda naknade nematerijalne štete i solidarne odgovornosti sa Garantnim fondom; doprinos pešaka 50%; kamata od presuđenja; krivična presuda veže za krivicu.",
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 2167/2019",
    legal_area: "civil",
    legal_question:
      "Da li je drugostepeni sud pogrešno smanjio pravično odmerenu naknadu nematerijalne štete za fizičke bolove i umanjenje životne aktivnosti nakon saobraćajne nezgode?",
    court_position:
      "Vrhovni kasacioni sud je preinačio presudu Apelacionog suda i vratio na snagu prvostepene iznose naknade nematerijalne štete, ocenivši da je drugostepeni sud pogrešno primenio materijalno pravo umanjujući pravično odmerenu naknadu.",
    reasoning:
      "Utvrđeno je umanjenje estetskog izgleda srednjeg stepena (deformitet kičmenog stuba, ožiljci) i prethodne vansudske isplate delimičnog obeštećenja. Prvostepeni sud je primenom čl. 940 i 941 ZOO pravilno utvrdio pasivnu legitimaciju osiguravača i pravo na pravičnu naknadu po čl. 200 st. 1 ZOO, dosudivši posebne iznose za fizičke bolove, strah, umanjenje životne aktivnosti i naruženost. Revizija je prihvatila da su ti prvostepeni iznosi bili pravilno odmereni.",
    keywords: ["nematerijalna šteta", "Revizija", "pravična naknada", "autoodgovornost", "ZOO"],
    related_articles: ["čl. 200 st. 1 ZOO", "čl. 940 ZOO", "čl. 941 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4101/2020",
    legal_area: "civil",
    legal_question:
      "Da li lovačko udruženje odgovara objektivno za štetu od sudara sa divljačju i kako se odmerava nematerijalna šteta uz doprinos oštećenog zbog brzine?",
    court_position:
      "Apelacioni sud je delimično preinačio prvostepenu presudu povećanjem naknade nematerijalne štete tužiocu povređenom u sudaru sa srnom, potvrdio objektivnu odgovornost lovačkog udruženja i doprinos tužioca od 10% zbog prekoračenja brzine.",
    reasoning:
      "Za umanjenje životne aktivnosti od 16% nakon teške povrede sud je povećao pravičnu naknadu (dodatnih 180.000 dinara uz već dosuđenih 90.000). Naglašeno je da nematerijalna šteta nije ekvivalencija kao materijalna, već moralna satisfakcija koja ne sme voditi lukrativnosti, u skladu sa principom pravičnosti. Zatezna kamata na dosuđene iznose teče od presuđenja do isplate (čl. 277 ZOO u vezi sa Zakonom o zateznoj kamati), jer nematerijalna šteta dospeva danom presuđenja.",
    keywords: ["divljač", "objektivna odgovornost", "lov", "doprinos", "nematerijalna šteta", "kamata"],
    related_articles: ["čl. 200 ZOO", "čl. 192 ZOO", "čl. 277 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 214/2019",
    legal_area: "civil",
    legal_question:
      "Da li je pravilno utvrđen doprinos pešaka od 20% i srazmerno umanjenje naknade nematerijalne štete u saobraćajnoj nezgodi?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio odluku o podeljenoj odgovornosti sa doprinosom tužilje od 20%, što je dovelo do srazmernog umanjenja naknade.",
    reasoning:
      "Kod tužilje je utvrđeno trajno umanjenje životne aktivnosti od 7,5% sa pratećim duševnim bolovima. Tuženi je u vansudskom postupku isplatio deo naknade po vidovima (fizički bol, strah, umanjenje aktivnosti), priznajući ukupne iznose koje je zatim umanjio za 20% doprinosa pešaka. Revizijski sud je ocenio da je ocena doprinosa i primena čl. 192 ZOO bila pravilna.",
    keywords: ["doprinos oštećenog", "pešak", "nematerijalna šteta", "čl. 192 ZOO"],
    related_articles: ["čl. 192 ZOO", "čl. 200 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1527/2023",
    legal_area: "civil",
    legal_question:
      "Da li je prvostepeni sud prenisko odmerio pravičnu naknadu nematerijalne štete kod teških povreda u saobraćaju uz doprinos oštećenog i vansudske isplate?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu povećanjem iznosa nematerijalne štete, ocenivši da je prvostepeni sud pogrešno primenio materijalno pravo jer je pravična naknada bila preniska.",
    reasoning:
      "Kod umanjenja životne aktivnosti od 37,5% i teških povreda, uz vansudske isplate u kojima je uračunat doprinos od 25% (prvostepeno pravilno 20% po oceni drugostepenog), drugostepeni sud je ponovo odmerio pravične iznose po vidovima i dosudio veću naknadu u skladu sa čl. 200 ZOO i kriterijumima intenziteta bolova, straha i naruženosti.",
    keywords: ["pravična naknada", "teške telesne povrede", "umanjenje životne aktivnosti", "doprinos"],
    related_articles: ["čl. 200 ZOO", "čl. 192 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6408/2022",
    legal_area: "civil",
    legal_question:
      "Da li Garantni fond dužan da naknadi nematerijalnu štetu biciklisti povređenom od strane nepoznatog vozila i da li su iznosi za bol i strah pravično odmereni?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je Garantni fond obavezan na naknadu nematerijalne štete tužilji, ocenivši da su dosuđeni iznosi za fizičke bolove i strah pravična naknada.",
    reasoning:
      "Primenom čl. 73 st. 1, 74 st. 1, 76 st. 1 tačka 2 i 79 Zakona o obaveznom osiguranju u saobraćaju u vezi sa čl. 200 ZOO, na nespornom činjeničnom stanju, sud je odmerio naknadu ceneći intenzitet i trajanje bolova i straha (uključujući pozni strah slabijeg intenziteta), veštačenje traumatologa i psihijatra, kao i cilj naknade i zabranu „lukrativnih“ težnji iz čl. 200 st. 2 ZOO.",
    keywords: ["Garantni fond", "nepoznato vozilo", "biciklista", "nematerijalna šteta", "ZOBS"],
    related_articles: ["čl. 73–79 Zakona o obaveznom osiguranju u saobraćaju", "čl. 200 st. 1–2 ZOO", "čl. 232 ZPP"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 840/2022",
    legal_area: "civil",
    legal_question:
      "Da li vozač i Garantni fond solidarno odgovaraju za štetu kada je nezgoda izazvana neregistrovanim vozilom sa falsifikovanim tablicama i isključivom krivicom vozača?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio solidarnu odgovornost vozača i Garantnog fonda za štetu u saobraćajnoj nezgodi izazvanoj neregistrovanim vozilom.",
    reasoning:
      "Odbačeni su revizijski navodi o nedostavljanju nalaza psihijatra jer je nalaz uručen punomoćniku na ročištu. Za utvrđenu krivicu vozača pri skretanju ulevo bez uveravanja i bez doprinosa tužilje, drugostepeni sud je pravilno primenio čl. 154 ZOO i pravilno odmerio naknadu nematerijalne štete po čl. 200 st. 2 ZOO vodeći računa o cilju naknade i zabrani pogodovanja nedopustivim težnjama.",
    keywords: ["Garantni fond", "neregistrovano vozilo", "solidarna odgovornost", "nematerijalna šteta"],
    related_articles: ["čl. 154 ZOO", "čl. 200 st. 2 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Prev 1222/2022",
    legal_area: "civil",
    legal_question:
      "Da li pripada naknada nematerijalne štete za strah nastao zbog bojazni od ishoda utvrđivanja krivice nakon saobraćajne nezgode sa smrtnim ishodom?",
    court_position:
      "Vrhovni kasacioni sud je dozvolio posebnu reviziju, preinačio nižestepene presude i odbio tužbeni zahtev za naknadu nematerijalne štete zbog straha vezanog za krivičnu odgovornost.",
    reasoning:
      "Utvrđen je strah srednjeg intenziteta od momenta saznanja da postoji sumnja u tužiočevu „krivicu“ do dobijanja zapisnika o uviđaju. Nižestepeni sudovi su na osnovu čl. 200 ZOO dosudili naknadu, ali revizijski sud je zauzeo stav da se naknada za ovaj strah ne dosuđuje kada je reč o bojazni od ishoda utvrđivanja krivice, pa je odbio sporedni zahtev po tom osnovu.",
    keywords: ["strah", "nematerijalna šteta", "krivica", "posebna revizija"],
    related_articles: ["čl. 200 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 379/2023",
    legal_area: "civil",
    legal_question:
      "Da li vozač i vlasnik vozila solidarno odgovaraju prema osiguravaču za regres nakon isplate štete oštećenima kada je vozač vozio pod alkoholom?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom su vozač i vlasnik solidarno obavezani na regres osiguravajućem društvu jer je vozač izgubio prava iz osiguranja zbog alkohola, a vlasnik odgovara solidarno.",
    reasoning:
      "U vezi sa krivičnim postupkom i civilnom presudom o naknadi oštećenom maloletniku, utvrđena je odgovornost tužioca (oštećeni vozač) prema oštećenom; osiguravač koji je platio ima regres prema odgovornom vozaču i vlasniku. Žalba nije osporila pravilnost materijalnopravnog zaključka o solidarnosti i gubitku prava iz osiguranja.",
    keywords: ["regres", "alkohol", "autoodgovornost", "solidarna odgovornost", "vlasnik vozila"],
    related_articles: ["čl. 939 ZOO", "čl. 941 ZOO", "Zakon o obaveznom osiguranju u saobraćaju"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 3739/2014",
    legal_area: "commercial",
    legal_question:
      "Od kada teče rok zastarelosti regresnog potraživanja jednog osiguravača prema drugom nakon isplate štete oštećenom?",
    court_position:
      "Privredni apelacioni sud je preinačio prvostepenu presudu i odbio regresni zahtev kao zastareo, primenivši opšti rok zastarelosti za naknadu štete iz čl. 376 ZOO koji teče od dana isplate štete oštećenom.",
    reasoning:
      "Sud je ocenio da nema bitnih povreda parničnog postupka po čl. 374 st. 2 ZPP. Prigovor zastarelosti je prihvaćen jer regresno potraživanje osiguravača prati pravilo trogodišnjeg subjektivnog roka od momenta isplate oštećenom, a ne duže trajanje vezano za druge okolnosti iz spisa.",
    keywords: ["regres", "osiguranje", "zastarelost", "čl. 376 ZOO"],
    related_articles: ["čl. 376 ZOO", "čl. 374 st. 2 ZPP"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 434/2016",
    legal_area: "civil",
    legal_question:
      "Kako se odgovornost više osiguravača određuje kada je šteta prouzrokovana učešćem više vozila i kako se limiti osiguranja sabiraju?",
    court_position:
      "Vrhovni kasacioni sud je odbio revizije osiguravača i potvrdio da oštećena treća lica imaju pravo na naknadu od svakog osiguravača uz sabiranje limita odgovornosti i solidarnu odgovornost osiguravača.",
    reasoning:
      "Prihvaćen je nalaz veštaka ekonomske struke o visini štete i kapitalizovanoj renti u odnosu na limit od 175.000 dinara koji pokriva materijalnu i nematerijalnu štetu u trenutku nezgode. Drugostepeni sud je pravilno primenio čl. 200 ZOO za pravičnu naknadu nematerijalne štete za oštećene lica i pravilno dosudio iznose u odnosu na pravnosnažni deo prvostepene presude.",
    keywords: ["više vozila", "limit osiguranja", "solidarnost", "autoodgovornost"],
    related_articles: ["čl. 200 ZOO", "čl. 940–941 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 1870/2020",
    legal_area: "civil",
    legal_question:
      "Da li vođenje radnog spora za poništaj otkaza prekida zastarelost potraživanja za naknadu nematerijalne štete zbog povrede na radu koja nije uslovljena nezakonitošću otkaza?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom je odbijen tužbeni zahtev za naknadu nematerijalne štete zbog povrede na radu kao zastareo u trogodišnjem roku, naglašavajući da radni spor o otkazu ne prekida zastarelost tog potraživanja.",
    reasoning:
      "Potraživanje nematerijalne štete zbog povrede na radu nije vezano za zakonitost otkaza. Sud odbija stav tužioca da mora prvo u parnici dokazivati nekrivicu za saobraćajnu nezgodu ili nezakonitost komisijskog izveštaja; za odgovornost tuženog na štetu od opasne delatnosti primenjuju se čl. 154 i dalje ZOO o krivičnoj odgovornosti i objektivnoj odgovornosti gde je zakon predvideo.",
    keywords: ["zastarelost", "povreda na radu", "radni spor", "nematerijalna šteta"],
    related_articles: ["čl. 154 ZOO", "čl. 390 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4169/2017",
    legal_area: "civil",
    legal_question:
      "Da li sud može delimično povećati naknadu za bol i naruženost, a deo o umanjenju životne aktivnosti ukinuti zbog nejasnih razloga prvostepenog suda?",
    court_position:
      "Apelacioni sud je delimično potvrdio, delimično preinačio i delimično ukinuo prvostepenu presudu: povećana je naknada za fizičke bolove i naruženost, dok je odluka o umanjenju životne aktivnosti ukinuta i vraćena na ponovno suđenje.",
    reasoning:
      "Utvrđena je isključiva krivica tužene za nezgodu i teške povrede tužilje, pa postoji obaveza naknade po čl. 154 i 158 ZOO. Pravilno je odbijen prigovor smanjenja naknade po čl. 192 u vezi sa čl. 205 ZOO jer nije bilo doprinosa tužilje. Pravnosnažna krivična presuda veže za postojanje dela i krivice tužene u smislu čl. 13 ZPP, a tužena nije dokazala isključenje građanskopravne odgovornosti.",
    keywords: ["delimično preinačenje", "ukidanje", "nematerijalna šteta", "krivična presuda", "ZPP"],
    related_articles: ["čl. 154 ZOO", "čl. 158 ZOO", "čl. 13 ZPP", "čl. 192 ZOO"],
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4313/2023",
    legal_area: "procedural",
    legal_question:
      "Da li je posebna revizija tuženog dozvoljena i da li revizija može osporavati utvrđeno činjenično stanje u sporu za naknadu nematerijalne štete?",
    court_position:
      "Vrhovni sud nije dozvolio posebnu reviziju tuženog i odbacio je kao nedozvoljenu zbog vrednosti spora, a delimično je ukinuo drugostepenu presudu u delu o materijalnoj šteti tužilje i vratio predmet na ponovno suđenje radi uzročnosti i krivice.",
    reasoning:
      "Revizijski navodi koji dovode u pitanje da li je nezgoda uopšte nastala osporavaju činjenično stanje, što nije dozvoljen osnov revizije. Revident se ne poziva na ujednačavanje prakse. Primena je data na čl. 404 st. 2 ZPP. Za materijalnu štetu VV potrebno je ponovo utvrditi činjenice o uzročnosti.",
    keywords: ["posebna revizija", "cenzus", "činjenično stanje", "ZPP"],
    related_articles: ["čl. 404 st. 2 ZPP"],
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1277/2022",
    legal_area: "civil",
    legal_question:
      "Da li odsustvo teške telesne povrede isključuje pravo na naknadu nematerijalne štete za fizičke bolove putnika u nezgodi?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i dosudio naknadu za fizičke bolove putnicama sa lakim povredama, istakavši da pravo na naknadu zavisi od intenziteta i trajanja bolova, a ne od kvalifikacije težine povrede.",
    reasoning:
      "Prvostepeni sud je pogrešno odbio naknadu samo zbog lake telesne povrede. Drugostepeni sud je potvrdio pravilnu primenu čl. 8 ZPP i materijalnog prava za materijalnu štetu i strah, a za solidarnu odgovornost imalaca vozila primenio čl. 178 st. 1–2 ZOO (krivična odgovornost imalaca motornih vozila u međusobnim odnosima). Zatezna kamata dosuđena je od presuđenja po čl. 277 ZOO.",
    keywords: ["lake telesne povrede", "fizički bol", "solidarna odgovornost", "prevoznik"],
    related_articles: ["čl. 200 ZOO", "čl. 178 st. 1–2 ZOO", "čl. 277 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 17697/2022",
    legal_area: "procedural",
    legal_question:
      "Da li je revizija dozvoljena u sporu male vrednosti kada drugostepeni sud preinači prvostepenu presudu?",
    court_position:
      "Vrhovni sud nije dozvolio odlučivanje o posebnoj reviziji i odbacio je redovnu reviziju kao nedozvoljenu jer je reč o sporu male vrednosti u kome revizija nije dopuštena čak ni posle preinačenja prvostepene presude.",
    reasoning:
      "U okviru spora o naknadi nematerijalne štete gde dosuđeni iznosi ne prelaze cenzus, revizija je nedozvoljena bez obzira na to što je drugostepeni sud preinačio prvostepenu odluku. Odbijen je i zahtev tuženog za troškove revizije.",
    keywords: ["revizija", "spor male vrednosti", "nedozvoljena revizija", "ZPP"],
    related_articles: ["Zakon o parničnom postupku"],
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5413/2018",
    legal_area: "civil",
    legal_question:
      "Da li vozač koji je izazvao nezgodu pod dejstvom alkohola dužan da osiguravaču nadoknadi isplaćene iznose regresno?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom je tuženi obavezan na regres osiguravajućem društvu jer je vozio sa 2,67‰ alkohola i time izgubio prava iz osiguranja.",
    reasoning:
      "Utvrđena je nezgoda sa materijalnom i nematerijalnom štetom oštećenima u vozilu; osiguravač je isplatio oštećenima ugovorene iznose. Nema bitnih povreda postupka po čl. 361 st. 2 tač. 1, 2, 5, 7, 9 ZPP. Regres je osnovan na subrogaciji osiguravača prema vozaču koji je prouzrokovao neosiguravajući štetni događaj u smislu uslova polise i zakona.",
    keywords: ["regres", "alkohol", "gubitak prava iz osiguranja", "saobraćajna nezgoda"],
    related_articles: ["Zakon o obaveznom osiguranju u saobraćaju", "čl. 939–941 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1834/2023",
    legal_area: "civil",
    legal_question:
      "Da li grad odgovara za štetu zbog nedostatka saobraćajne signalizacije na podvožnjaku i kako se deli odgovornost sa vozačem?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je Grad Valjeva odgovoran za štetu zbog propusta u signalizaciji, uz podeljenu odgovornost vozača od 50%.",
    reasoning:
      "Primenom čl. 200 ZOO odmereni su pravični iznosi za fizičke bolove i strah, uz umanjenje za doprinos tužioca nastanku nezgode. Zatezna kamata dosuđena je od presuđenja po čl. 277 ZOO. Troškovi postupka su pravilno dosuđeni po čl. 150, 153, 154 i 163 ZPP i Tarifi advokatskih nagrada.",
    keywords: ["javna odgovornost", "signalizacija", "grad", "podeljena odgovornost"],
    related_articles: ["čl. 172 ZOO", "čl. 184 ZOO", "čl. 200 ZOO", "čl. 277 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1043/2025",
    legal_area: "civil",
    legal_question:
      "Da li laki ožiljak na laku opravdava posebnu naknadu za naruženost nakon saobraćajne nezgode sa teškim povredama?",
    court_position:
      "Sud je delimično usvojio zahtev za nematerijalnu štetu dosudivši naknadu za bol, strah i umanjenje životne aktivnosti, ali je odbio zahtev za naruženost jer laki ožiljak nije izazvao duševnu patnju u smislu zakona.",
    reasoning:
      "Prvostepeni sud je pravilno primenio čl. 200 i 897 ZOO i čl. 232 i 271 ZPP. Za teške povrede i vansudske isplate koje nisu bile dovoljna satisfakcija, dosuđen je dodatak za fizičke bolove; za naruženost nije utvrđen osnov jer objektivno blagi ožiljak ne ispunjava kriterijum značajnih duševnih patnji po tom vidu.",
    keywords: ["naruženost", "ožiljak", "nematerijalna šteta", "delimično usvajanje"],
    related_articles: ["čl. 200 ZOO", "čl. 897 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2076/2018",
    legal_area: "civil",
    legal_question:
      "Kako se utvrđuje podeljena odgovornost između vozača (brzina, alkohol) i pešaka (prelazak na crveno) i kako se naknada zbog smrti bliskog lica srazmerno umanjuje?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i po održanoj raspravi sam odlučio, utvrdivši 80% odgovornosti vozača i 20% pešaka i dosudivši naknade srazmerno umanjene za doprinos oštećenih.",
    reasoning:
      "Primenom čl. 200 ZOO za visinu nematerijalne štete i čl. 192 u vezi sa čl. 205 ZOO za srazmerno smanjenje zbog doprinosa od 20%, sud je odmerio pravične iznose za bol zbog smrti bliskog lica u odnosu na ranije isplate i dosudio neisplaćeni procenat do pravičnih iznosa u vreme presuđenja, odbijajući previsoke delove tužbe kao suprotne cilju naknade.",
    keywords: ["podeljena odgovornost", "pešak", "alkohol", "smrt bliskog lica", "čl. 192 ZOO"],
    related_articles: ["čl. 192 ZOO", "čl. 200 ZOO", "čl. 205 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 796/2024",
    legal_area: "civil",
    legal_question:
      "Kako se preračunava dosuđena naknada za fizičke bolove kada se u vreme presuđenja poveća pravična vrednost tog vida štete u odnosu na vansudsku isplatu?",
    court_position:
      "Apelacioni sud je delimično preinačio prvostepenu presudu i povećao naknadu nematerijalne štete za fizičke bolove, umanjenje životne aktivnosti, naruženost i strah, potvrdivši isključivu krivicu osiguranika i materijalnu štetu.",
    reasoning:
      "Za isključivu krivicu osiguranika i teške povrede, drugostepeni sud je po čl. 200 st. 1–2 ZOO procenio pravičan iznos za fizičke bolove u vreme presuđenja veći nego u vreme vansudske isplate, pa je dosudio razliku (72% preostalog u odnosu na raniju isplatu od 28%). Slično je razloženo i za strah uz dosudu dodatnog iznosa sa kamatom od presuđenja po čl. 154, 155, 178 i 277 ZOO.",
    keywords: ["pravična naknada", "indeksacija", "fizički bol", "kamata"],
    related_articles: ["čl. 200 st. 1–2 ZOO", "čl. 277 ZOO", "čl. 232 ZPP"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4128/2024",
    legal_area: "civil",
    legal_question:
      "Od kog dana teče zatezna kamata na naknadu štete zbog smrti supruge u saobraćaju kada je delimično isplaćena naknada tokom postupka?",
    court_position:
      "Apelacioni sud je uglavnom potvrdio odluku o visini materijalne i nematerijalne štete zbog smrti supruge, ali je preinačio deo o kamati tako da kamata na nematerijalnu i preostalu materijalnu štetu teče od dana presuđenja.",
    reasoning:
      "Po čl. 201 u vezi sa čl. 200 ZOO tuženi nadoknađuje nematerijalnu štetu zbog gubitka bliskog lica, a po čl. 193 ZOO materijalnu štetu u visini uobičajenih troškova sahrane. Pravična naknada za smrt supruge prihvaćena je u iznosu od 1.200.000 dinara uz doprinos pokojne od 50% i odbitak delimičnih isplata. Kamata na dosuđene iznose pravilno teče od presuđenja jer se tada konačno utvrđuje visina.",
    keywords: ["smrt bliskog lica", "kamata", "troškovi sahrane", "čl. 201 ZOO"],
    related_articles: ["čl. 193 ZOO", "čl. 200 ZOO", "čl. 201 ZOO", "čl. 277 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1824/2021",
    legal_area: "civil",
    legal_question:
      "Kako se deli odgovornost kada se krivica pojedinih vozača ne može pouzdano utvrditi, a učestvuju dva motorna vozila?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tuženog i potvrdio dosudu naknade nematerijalne štete, primenivši ravnu podelu odgovornosti imalaca motornih vozila po čl. 178 st. 3 ZOO kada se krivica ne može utvrditi.",
    reasoning:
      "Prvostepeni sud je pogrešno primenio zastareli zakon o osiguranju i odbio tužbu; drugostepeni sud je pravilno primenio odredbe o osiguranju i ZOO i preinačio odluku u korist tužilaca. Tužilac AA je pretrpeo bolove, strah i umanjenje životne aktivnosti, a tužilja BB bol i strah, u vezi sa opasnom stvari – motornim vozilima učesnika.",
    keywords: ["čl. 178 st. 3 ZOO", "motorna vozila", "solidarnost", "nematerijalna šteta"],
    related_articles: ["čl. 178 st. 3 ZOO", "čl. 200 ZOO", "Zakon o osiguranju imovine i lica"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 58/2023",
    legal_area: "civil",
    legal_question:
      "Da li troškovi advokata u vansudskom postupku predstavljaju parnične troškove u smislu ZPP i od kada teče kamata na njih?",
    court_position:
      "Apelacioni sud je delimično potvrdio a delimično preinačio presudu, smanjivši naknadu za fizičke bolove za dvojicu tužilaca i ispravivši kamatu na troškove vansudskog postupka da teče od izvršnosti presude.",
    reasoning:
      "Pravo na naknadu za fizički bol zavisi od intenziteta i trajanja, ne od formalne kvalifikacije povrede. Troškovi zastupanja advokatom u vansudskom postupku i takse za kopiju spisa predstavljaju izdatke povodom parnice po čl. 150 st. 1 ZPP jer proizilaze iz čl. 154–155 ZOO o obavezi naknade štete. Kamata na te troškove pravilno teče od izvršnosti odluke koja ih dosuđuje.",
    keywords: ["parnični troškovi", "vansudski postupak", "kamata", "fizički bol"],
    related_articles: ["čl. 150 st. 1 ZPP", "čl. 154 ZOO", "čl. 155 ZOO", "čl. 277 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 13028/2022",
    legal_area: "civil",
    legal_question:
      "Da li održavaoci puta odgovaraju za nezgodu uzrokovanu ledom na kolovozu i kako se utvrđuje doprinos vozača?",
    court_position:
      "Vrhovni sud je odbio reviziju tuženih i potvrdio odgovornost za nezgodu zbog leda koji nije otklonjen, uz doprinos pokojnog vozača od 20% zbog neprilagođene brzine i srazmerno umanjene naknade porodici.",
    reasoning:
      "Drugostepeni sud je pravilno primenio čl. 192 ZOO utvrdivši da bi se nezgoda mogla izbeći brzinom ispod 29,6 km/h. Odgovornost JP „Putevi Srbije“ je solidarna; nematerijalna šteta zbog smrti sina odmerena je po čl. 200 ZOO i umanjena za doprinos. Materijalni troškovi sahrane su priznati po čl. 193 ZOO uz isto umanjenje.",
    keywords: ["led na putu", "JP Putevi Srbije", "doprinos", "sahrana", "čl. 192 ZOO"],
    related_articles: ["čl. 192 ZOO", "čl. 193 ZOO", "čl. 200 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5766/2023",
    legal_area: "civil",
    legal_question:
      "Da li je pravilno utvrđen doprinos tužioca od 30% kada pre skretanja ulevo nije postupio po čl. 32 Zakona o bezbednosti saobraćaja na putevima?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je utvrđen doprinos tužioca od 30% jer se pre skretanja ulevo nije uverio da preticanje nije u toku, iako je drugi vozač napravio osnovni propust.",
    reasoning:
      "Kod umanjenja životne aktivnosti od 25% i delimičnog vansudskog namirenja, primenjen je čl. 32 ZBS (važeći u vreme nezgode) o obavezi uveravanja pre skretanja/preticanja, pa su ispunjeni uslovi čl. 192 ZOO za srazmerno smanjenje naknade zbog doprinosa oštećenog.",
    keywords: ["doprinos", "preticanje", "skretanje ulevo", "čl. 32 ZBS"],
    related_articles: ["čl. 32 Zakona o bezbednosti saobraćaja na putevima", "čl. 192 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 4349/2022",
    legal_area: "civil",
    legal_question:
      "Da li isplate rente i delimičnih odšteta prekidaju zastarelost potraživanja za naknadu štete nakon obustave krivičnog postupka?",
    court_position:
      "Vrhovni sud je ukinuo drugostepenu presudu koja je zastarelost prihvatila kao osnovanu, ocenivši da zaključak o zastarelosti jeste preuranjen jer isplate mogu imati dejstvo priznanja u delu i prekidati zastarelost.",
    reasoning:
      "Drugostepeni sud je pogrešno primenio rokove zastarelosti tumačeći da tužba posle obustave krivičnog postupka kasni u odnosu na čl. 390 ZOO ili trogodišnji rok od nezgode za sve vidove štete. Revizijski sud je ukazao na značaj isplata oštećenoj i na to da zastarelost nije mogla biti pravilno završena bez ocene tih okolnosti.",
    keywords: ["zastarelost", "krivični postupak", "renta", "prekid zastarelosti"],
    related_articles: ["čl. 376 ZOO", "čl. 390 ZOO"],
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3514/2022",
    legal_area: "civil",
    legal_question:
      "Da li je vlasnik vozila učesnika u nezgodi „treće lice“ po čl. 178 st. 4 ZOO u odnosu na osiguravača drugog učesnika radi naknade materijalne štete na sopstvenom vozilu?",
    court_position:
      "Apelacioni sud je potvrdio naknadu nematerijalne štete putnicima, ali je preinačio presudu i odbio zahtev vlasnice vozila za materijalnu štetu jer vlasnik učestvujućeg vozila nije treće lice u smislu čl. 178 st. 4 ZOO.",
    reasoning:
      "Za fizičke bolove i strah prvostepeni sud je pravilno primenio čl. 200 ZOO. Za materijalnu štetu vlasnice sopstvenog vozila pogrešan je zaključak da postoji objektivna odgovornost osiguravača drugog učesnika jer vlasnik opasne stvari koji učestvuje u nezgodi nema status trećeg lica prema tom osiguravaču. Pogrešno je i dosuđivanje kamate na troškove vansudskog postupka od dana tužbe.",
    keywords: ["treće lice", "čl. 178 st. 4 ZOO", "vlasnik vozila", "autoodgovornost"],
    related_articles: ["čl. 178 st. 4 ZOO", "čl. 200 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 6838/2018",
    legal_area: "civil",
    legal_question:
      "Da li je moguće smanjiti dosuđenu naknadu za bol i strah nakon nezgode sa teškim povredama kada prvostepeni iznosi nisu srazmerni okolnostima?",
    court_position:
      "Apelacioni sud je delimično preinačio prvostepenu presudu smanjivši naknadu za fizički bol i strah, a potvrdio naknadu za umanjenje životne aktivnosti, naglašavajući da pravična naknada mora biti srazmerna okolnostima.",
    reasoning:
      "Nije presudno da li je povreda laka ili teška, već intenzitet i trajanje bolova, straha i umanjenja aktivnosti. Utvrđena je nezgoda na raskrsnici sa krivicom osiguranika tuženog; tužilja je delimično namirena vansudski. Drugostepeni sud je prilagodio iznose da ne budu protivni cilju naknade iz čl. 200 ZOO.",
    keywords: ["pravična naknada", "srazmernost", "strah", "fizički bol"],
    related_articles: ["čl. 200 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 715/2023",
    legal_area: "civil",
    legal_question:
      "Da li JP „Putevi Srbije“ i izvođač radova solidarno odgovaraju za štetu od odrona na putu i od kada teče kamata na materijalnu štetu na vozilu?",
    court_position:
      "Apelacioni sud je potvrdio solidarnu odgovornost JP „Putevi Srbije“ i „Strabag“ d.o.o., povećao nematerijalnu štetu za bol i strah, potvrdio materijalnu štetu na vozilu, ali je preinačio kamatu na materijalnu štetu da teče od dana presuđenja, a ne od dana veštačenja.",
    reasoning:
      "Po čl. 155 i 185 ZOO tuženi solidarno nadoknađuju materijalnu i nematerijalnu štetu. Visina štete na vozilu prihvaćena je prema veštačenju. Prvostepena primena čl. 189 st. 1 i 277 ZOO za početak kamate od dana veštačenja je pogrešna jer visina materijalne štete na vozilu postaje utvrđena danom presuđenja, pa od tog dana teče kamata (čl. 394 tačka 4 ZPP).",
    keywords: ["odron", "javno preduzeće", "izvođač radova", "zatezna kamata"],
    related_articles: ["čl. 155 ZOO", "čl. 185 ZOO", "čl. 189 st. 1 ZOO", "čl. 277 ZOO", "čl. 394 tačka 4 ZPP"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 637/2013",
    legal_area: "civil",
    legal_question:
      "Da li popunjavanje Evropskog izveštaja o nezgodi isključuje dokazivanje i naknadu nematerijalne štete u parnici?",
    court_position:
      "Apelacioni sud je potvrdio prvostepenu presudu kojom je priznato pravo na naknadu nematerijalne štete uprkos popunjenom Evropskom izveštaju namenjenom manjim štetama.",
    reasoning:
      "Žalba osiguravača da je Evropski izveštaj isključuje nematerijalnu štetu i veću materijalnu štetu odbijena je jer oštećeni u sudskom postupku može dokazivati pun obim štete. Intenzitet straha kroz periode lečenja detaljno je ocenjen; pravo na naknadu zavisi od dokazanih posledica, a ne od administrativnog obrasca u smislu ograničenja ZOBS za male štete.",
    keywords: ["Evropski izveštaj", "nematerijalna šteta", "dokazivanje", "ZOBS"],
    related_articles: ["čl. 200 ZOO", "Zakon o obaveznom osiguranju u saobraćaju"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 16908/2022",
    legal_area: "civil",
    legal_question:
      "Da li za štetu od divljači na državnom putu odgovara lovačko udruženje ili upravljač puta radi postavljanja znaka „divljač na putu“?",
    court_position:
      "Vrhovni sud je usvojio reviziju tužioca, ukinuo presudu Apelacionog suda i vratio predmet na ponovno odlučivanje, utvrdivši da upravljač javnog puta, a ne lovačko udruženje, odgovara za postavljanje i održavanje signalizacije upozorenja na divljač.",
    reasoning:
      "Prvostepeni sud je primenom Zakona o javnim putevima i Pravilnika o signalizaciji zaključio na propust upravljača puta koji nije postavio znak „divljač na putu“, uz prihvatanje veštačenja o uzroku i nedostatku doprinosa tužioca. Revizija je prihvatila da je fokus odgovornosti pogrešno pomeren na lovačko udruženje umesto na upravljača puta.",
    keywords: ["divljač", "javni put", "signalizacija", "lov", "Revizija"],
    related_articles: ["Zakon o javnim putevima", "Pravilnik o saobraćajnoj signalizaciji", "čl. 172 i 183 ZOO"],
    outcome: "remanded",
  },
  // ── BATCH 2 (1/4) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3553/2024",
    legal_area: "civil",
    legal_question:
      "Da li je tužbeni zahtev za naknadu materijalne i nematerijalne štete iz saobraćajne nezgode zastareo i da li se može primeniti privilegovani rok zastarelosti prema osiguravačima kada nije dokazana krivična odgovornost vozača?",
    court_position:
      "Apelacioni sud je odbio tužbeni zahtev kao zastarelog, ocenivši da se ne može primeniti privilegovani rok iz čl. 377 ZOO jer nije utvrđena krivična odgovornost osiguranika, već isključivo trogodišnji rok iz čl. 376 ZOO.",
    reasoning:
      "Štetni događaji i posledice datiraju iz 2002–2003, a tužba je podneta 2012. Protekli je opšti rok zastarelosti. Po utvrđenom činjeničnom stanju nije dokazana krivica konkretnih vozača/osiguranika u smislu koji bi omogućio privilegovani režim; stoga je pravilna primena čl. 376 ZOO i odbijanje zahteva prema osiguravačima.",
    keywords: ["zastarelost", "čl. 376 ZOO", "čl. 377 ZOO", "osiguranje", "saobraćajna nezgoda"],
    related_articles: ["čl. 376 ZOO", "čl. 377 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5824/2023",
    legal_area: "civil",
    legal_question:
      "Da li vozač koji je izazvao saobraćajnu nezgodu pod dejstvom alkohola dužan da osiguravajućem društvu naknadi isplaćene odštete oštećenom?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tuženi obavezan na regres osiguravaču, jer je upravljao vozilom pod alkoholom iznad dozvoljene mere, izgubio prava iz osiguranja i time nastala je osnova za regresnu naplatu svih isplaćenih iznosa.",
    reasoning:
      "Utvrđena je nezgoda uz alkoholisanog vozača tuženog i lake telesne povrede oštećenog. Osiguravač je delimično isplatio štetu, a zatim zaključio vansudsko poravnanje sa oštećenim i povukao tužbu oštećenog. Gubitak prava iz osiguranja usled vožnje pod alkoholom daje osnov subrogacije/regresa prema odgovornom vozaču u smislu posebnih odredaba o obaveznom osiguranju i ZOO.",
    keywords: ["regres", "alkohol", "gubitak prava iz osiguranja", "autoodgovornost"],
    related_articles: ["čl. 29 st. 1 tačka 4 Zakona o obaveznom osiguranju u saobraćaju", "čl. 87 st. 2 Zakona o osiguranju imovine i lica", "čl. 154", "čl. 178 st. 1", "čl. 939 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 9962/2012",
    legal_area: "constitutional",
    legal_question:
      "Da li postupak koji traje oko 11 godina povreduje pravo na suđenje u razumnom roku kada su značajni periodi pauze posledica vođenja krivičnog postupka protiv podnosioca?",
    court_position:
      "Ustavni sud je odbio ustavnu žalbu i ocenio da nije povređeno pravo na suđenje u razumnom roku, jer dugi prekidi zbog krivičnog postupka protiv podnosioca ne padaju na teret civilnog suda.",
    reasoning:
      "Ustavni sud je razmotrio trajanjе građanskog spora u kontekstu paralelnog krivičnog postupka i okolnosti koje opravdavaju dužinu. Periodi kada je postupak bio obustavljan zbog krivičnog gonjenja podnosioca ne ulaze u računanje neopravdanog odlaganja civilnog postupka na teret države u smislu čl. 32 Ustava.",
    keywords: ["razuman rok", "Ustavni sud", "krivični postupak", "parnica"],
    related_articles: ["čl. 32 Ustava Republike Srbije"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3833/2018",
    legal_area: "civil",
    legal_question:
      "Da li Garantni fond odgovara za naknadu nematerijalne štete kada je nezgoda nastala pre osnivanja Fonda, a stečaj nad osiguravačem otvoren kasnije?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i usvojio zahtev prema Garantnom fondu, utvrdivši obavezu Fonda uprkos tome što je štetni događaj bio pre njegovog osnivanja, jer je stečaj nad osiguravačem nastupio naknadno.",
    reasoning:
      "Kod nespornog nedostatka doprinosa oštećenog, krivice osiguranika i neiscrpljenog limita na dan događaja, primenjene su odredbe Zakona o osiguranju imovine i lica (čl. 99 st. 2, čl. 106) u vezi sa čl. 178 st. 1 i čl. 154 ZOO. Sud je dosudio konkretne iznose po vidovima nematerijalne štete sa kamatom od presuđenja (čl. 277 ZOO i Zakon o zateznoj kamati), odbijajući prekomerne delove tužbe kao suprotne cilju pravične naknade iz čl. 200 st. 2 ZOO.",
    keywords: ["Garantni fond", "stečaj osiguravača", "retroaktivnost", "nematerijalna šteta"],
    related_articles: ["čl. 99 st. 2 Zakona o osiguranju imovine i lica", "čl. 106 istog", "čl. 178 st. 1 ZOO", "čl. 200 ZOO", "čl. 277 ZOO", "čl. 394 tačka 3 i 4 ZPP"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 258/2021",
    legal_area: "civil",
    legal_question:
      "Da li umešač u saobraćaju koji pretiče na zabranjenom mestu na raskrsnici odgovara za štetu trećem kada stvara direktnu opasnu situaciju?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju umešača i potvrdio nižestepene odluke o njegovoj isključivoj odgovornosti za nezgodu nastalu preticanjem na nedozvoljenom mestu.",
    reasoning:
      "Utvrđeno je da je umešač svojim manevrom stvorio opasnu situaciju na raskrsnici. Nižestepeni sudovi su pravilno primenili čl. 941 st. 1 ZOO o pravu oštećenog prema osiguravaču do visine obaveze i pravilno dosudili delove naknade nematerijalne štete i materijalne štete na vozilu sa kamatom.",
    keywords: ["umešač", "preticanje", "raskrsnica", "autoodgovornost", "isključiva krivica"],
    related_articles: ["čl. 941 st. 1 ZOO", "čl. 154–189 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2373/2025",
    legal_area: "civil",
    legal_question:
      "Da li osiguravač može od vozača regresno naplatiti celokupan iznos isplaćene štete kada je vozilо pod znatnim alkoholom (1,52 promila)?",
    court_position:
      "Apelacioni sud je potvrdio obavezu tuženog da osiguravaču naknadi isplaćene iznose štete, jer alkoholisanost iznad zakonskog praga povlači gubitak prava iz osiguranja i pun regres prema licu odgovornom za štetu.",
    reasoning:
      "Primenom odredaba Zakona o obaveznom osiguranju u saobraćaju i Zakona o osiguranju imovine i lica, uz čl. 154, 158, 173, 174, 178 st. 1 i 939 ZOO, utvrđena je krivica tuženog i doprinos drugih učesnika koji je osiguravač već uračunao u vansudskim isplatama. Kako je tuženi vozio sa 1,52 promila, prava iz polise su izgubljena i osiguravač je stupio u prava oštećenih prema tuženom.",
    keywords: ["regres", "alkohol", "1,52 promila", "gubitak prava iz osiguranja"],
    related_articles: ["čl. 29 st. 1 tačka 4 Zakona o obaveznom osiguranju u saobraćaju", "čl. 87 st. 2 Zakona o osiguranju imovine i lica", "čl. 939 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 277/2025",
    legal_area: "civil",
    legal_question:
      "Da li postoji odgovornost za štetu porodice ako je smrt nastupila više godina posle saobraćajne nezgode, a prethodile su teške povrede i dugotrajno lečenje?",
    court_position:
      "Vrhovni sud je ukinuo drugostepenu presudu koja je odbila naknadu i vratio predmet na ponovno odlučivanje, prihvativši mogućnost indirektne uzročne veze između povrede u nezgodi i kasnije smrti.",
    reasoning:
      "Veštačenjem je ocenjeno da dugo nadživljavanje i komplikacije prate povrede opasne po život, da procenat smrtnosti raste u prvim godinama, i da smrt nije posledica „starosti“ nego komplikacija u vezi sa povredom. Ako smrt po redovnom toku stvari sledi iz povrede, može postojati osnov odgovornosti uprkos vremenskom razmaku.",
    keywords: ["uzročna veza", "indirektna kauzalnost", "smrt", "saobraćajna nezgoda", "veštačenje"],
    related_articles: ["čl. 154 ZOO", "čl. 200 ZOO", "čl. 201 ZOO", "čl. 193 ZOO"],
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3819/2024",
    legal_area: "civil",
    legal_question:
      "Da li stvarni vlasnik neosiguranog vozila dužan regresa Garantnom fondu u visini od 12 prosečnih bruto zarada i da li se regres odbija prema registriranom prodavcu koji nije vlasnik u momentu nezgode?",
    court_position:
      "Apelacioni sud je potvrdio obavezu stvarnog vlasnika na regres Fonda u iznosu ograničenom pravilnikom koji je važio u vreme štete, a odbio zahtev prema registriranom vlasniku koji je vozilo prodao pre nezgode.",
    reasoning:
      "Primenom čl. 104 Zakona o osiguranju imovine i lica (u vezi sa čl. 245 st. 1 Zakona o osiguranju), čl. 34 Zakona o osnovama svojinskopravnih odnosa i Pravilnika o regresu Fonda od 2005, utvrđeno je da je tuženi BB stvarni vlasnik neosiguranog vozila kojim je upravljao u nezgodi, da je Fond isplatio oštećene, te da regres sleduje u zakonski ograničenom iznosu. Prodavac koji više nije imalac u kritičnom trenutku nije dužnik regresa.",
    keywords: ["Garantni fond", "regres", "neosigurano vozilo", "stvarni vlasnik", "Pravilnik"],
    related_articles: ["čl. 104 Zakona o osiguranju imovine i lica", "čl. 245 Zakona o osiguranju", "čl. 34 Zakona o osnovama svojinskopravnih odnosa"],
    outcome: "plaintiff_won",
  },
  // ── BATCH 2 (2/4) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5302/2019",
    legal_area: "civil",
    legal_question:
      "Da li je pravilna podeljena odgovornost od po 50% između maloletnog vozača bez dozvole (pokojnog) i drugog učesnika u nezgodi sa smrtnim ishodom?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilaca i potvrdio odluku o podeljenoj odgovornosti od po 50%, smatrajući da je pokojni maloletni vozač značajno doprineo nastanku opasne situacije (prevrtanje, nepovezan pojas).",
    reasoning:
      "Ocenjeno je da je ponašanje pokojnog stvorilo iznenadnu prepreku i da bi se posledice mogle izbeći vezivanjem. Doprinos od 50% opravdava srazmerno umanjenje naknada za smrt bliskog lica i troškove sahrane u odnosu na isplate osiguravača. Zahtev za izmaklu korist je pravilno odbijen jer čl. 194 ZOO cilja lice koje je poginulog izdržavalo, što ovde nije slučaj.",
    keywords: ["maloletnik", "doprinos", "smrt", "saobraćajna nezgoda", "čl. 192 ZOO"],
    related_articles: ["čl. 192 ZOO", "čl. 200 ZOO", "čl. 201 ZOO", "čl. 194 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 19676/2022",
    legal_area: "civil",
    legal_question:
      "Da li potpisivanje evropskog izveštaja o nezgodi lišava oštećenog prava na punu naknadu materijalne i nematerijalne štete veće od okvira uprošćenog postupka?",
    court_position:
      "Vrhovni kasacioni sud je prihvatio reviziju kao izuzetno dozvoljenu, ukinuo nižestepene presude i vratio predmet na ponovno suđenje, istakavši da evropski izveštaj ne isključuje pravo na punu naknadu.",
    reasoning:
      "Mala šteta u smislu čl. 106 Zakona o obaveznom osiguranju u saobraćaju i obaveza popunjavanja izveštaja po čl. 172 Zakona o bezbednosti saobraćaja ne znače da oštećeni ne može tražiti punu štetu po čl. 190 ZOO i nematerijalnu po čl. 200 ZOO. Smisao izveštaja nije eliminacija sudske zaštite; teret dokazivanja uzročnosti ostaje na tužiocu po čl. 228 ZPP.",
    keywords: ["Evropski izveštaj", "puna naknada", "mala šteta", "čl. 190 ZOO"],
    related_articles: ["čl. 106 Zakona o obaveznom osiguranju u saobraćaju", "čl. 172 Zakona o bezbednosti saobraćaja na putevima", "čl. 190 ZOO", "čl. 200 ZOO", "čl. 228 ZPP"],
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 500/2015",
    legal_area: "civil",
    legal_question:
      "Da li poslodavac objektivno odgovara za štetu od povrede na radu prilikom odlaska na posao kada je u prekršajnom postupku utvrđeno da je nezgoda nastala isključivo krivicom zaposlenog?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio preinačenje prvostepene presude kojom je tužbeni zahtev odbijen jer poslodavac ne odgovara za štetu nastalu isključivo krivicom zaposlenog.",
    reasoning:
      "Iako je šteta nastala „u vezi sa radom“, prekršajni organ je utvrdio isključivu krivicu vozača-zaposlenog. Revizija neosnovano traži objektivnu odgovornost poslodavca; Apelacioni sud je pravilno primenio čl. 164 Zakona o radu u kontekstu gde nema odgovornosti poslodavca za isključivi propust zaposlenog.",
    keywords: ["povreda na radu", "isključiva krivica zaposlenog", "poslodavac", "čl. 164 Zakona o radu"],
    related_articles: ["čl. 164 Zakona o radu", "čl. 154 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 396/2011",
    legal_area: "civil",
    legal_question:
      "Da li Garantni fond može biti dužan na naknadu materijalne štete u vidu izgubljene zarade usled telesne povrede od nepoznatog vozila, iako fond ne pokriva štetu na stvarima?",
    court_position:
      "Vrhovni kasacioni sud je delimično ukinuo nižestepene presude i utvrdio da Fond dužan naknaditi materijalnu štetu u vidu izgubljene zarade jer ona proističe iz telesne povrede, a ne iz štete na stvarima.",
    reasoning:
      "Tužilac je zadobio teške povrede; nematerijalna šteta u delu koji nije osporen ostaje. Oštećene stvari (bicikl, odeća) padaju pod ograničenje odgovornosti Fonda za štetu na stvarima, dok izgubljena zarada predstavlja posledicu povrede i pripada obimu naknade koja nije „šteta na stvari“ u smislu izuzetka.",
    keywords: ["Garantni fond", "izgubljena zarada", "nepoznato vozilo", "materijalna šteta"],
    related_articles: ["Zakon o obaveznom osiguranju u saobraćaju", "čl. 154–189 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3476/2020",
    legal_area: "civil",
    legal_question:
      "Da li JKP „Beograd put“ odgovara za štetu kada vozilo upadne u neobeleženu rupu na kolovozu u zoni tramvajske trake?",
    court_position:
      "Apelacioni sud je potvrdio odgovornost JKP „Beograd put“ za održavanje kolovoza i naknadu nematerijalne štete, odbijajući prigovor da odgovara samo Direkcija za puteve jer tramvajska zona pripada drugom održavaocu.",
    reasoning:
      "Iz Odluke o ulicama i srodnih odredbi proizilazi da kolovoz održava određeni subjekat nezavisno od blizine šina; tuženo preduzeće je po statutu i odlukama nadležno za održavanje kolovoza na spornom mestu. Pravični iznosi nematerijalne štete su pravilno odmereni po čl. 200 st. 1 ZOO uz stručne nalaze veštaka.",
    keywords: ["JKP", "rupa na putu", "održavanje kolovoza", "nematerijalna šteta"],
    related_articles: ["čl. 172 ZOO", "čl. 184 ZOO", "čl. 200 st. 1 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Osnovni sud u Beogradu",
    court_level: "basic",
    case_number: "Po4 14/2025",
    legal_area: "criminal",
    legal_question:
      "Da li čin podmićivanja radnika tužilačke pisarnice radi neovlašćenog pribavljanja zapisnika o uviđaju nezgoda ispunjava elemente krivičnog dela davanja mita?",
    court_position:
      "Sud je izrekao uslovnu osudu okrivljenom koji je dao mito radi pribavljanja fotokopija zapisnika i neovlašćeno dostavljao dokumentaciju advokatima, prihvativši odbranu i krivično-pravnu kvalifikaciju uz olakšavajuće okolnosti.",
    reasoning:
      "Utvrđen je dogovor i prenos koristi u zamenu za zloupotrebu položaja u pisarnici, radi sticanja koristi u postupcima naknade nematerijalne štete. Odluka se zasniva na priznanju i dokazima o više epizoda pribavljanja podataka iz evidencija događaja.",
    keywords: ["mito", "pisarnica", "zapisnik o uviđaju", "korupcija", "uslovna osuda"],
    related_articles: ["Krivični zakonik (krivično delo protiv službene dužnosti / mito)"],
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 30427/2023",
    legal_area: "civil",
    legal_question:
      "Da li je pravilno utvrđen doprinos vozača motocikla od 20% i da li su vansudske isplate uz dodatno dosuđeni iznos obezbedile pravičnu naknadu?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio odluku o doprinosu od 20% i preračunavanju naknade uz uračunavanje vansudskih isplata.",
    reasoning:
      "Veštačenjem je utvrđeno prekoračenje brzine i mogućnost izbegavanja nezgode kočenjem na dozvoljenoj brzini, što opravdava doprinos. Osiguravač je isplatio značajan iznos po vidovima nematerijalne štete uz uračunat doprinos; prvostepeni sud je pravilno zaključio da je tužilac time namiren u odnosu na pravične iznose umanjene za 20% po čl. 192 i 200 ZOO.",
    keywords: ["motocikl", "doprinos", "brzina", "vansudska isplata", "nematerijalna šteta"],
    related_articles: ["čl. 192 ZOO", "čl. 200 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni sud Srbije",
    court_level: "supreme",
    case_number: "Kzz 1042/2024",
    legal_area: "procedural",
    legal_question:
      "Da li sin oštećenog može tražiti naknadu troškova krivičnog postupka (advokat) kao samostalno potraživanje, i da li to predstavlja nasleđivanje potraživanja za nematerijalnu štetu iz čl. 204 ZOO?",
    court_position:
      "Vrhovni sud je odbio zahtev za zaštitu zakonitosti i potvrdio da pravo na troškove krivičnog postupka po ZKP nije nasleđeno potraživanje nematerijalne štete iz ZOO.",
    reasoning:
      "Zahtev odnosi se na troškove angažovanja branioca koje je sin sam snosio, a ne na bol, strah ili smrt bliskog lica pokojnog u smislu čl. 204 ZOO. Pravo na naknadu troškova proističe iz čl. 491 st. 1 ZKP, pa uslov nasleđivosti iz čl. 204 ZOO nije relevantan.",
    keywords: ["troškovi krivičnog postupka", "ZKP", "nasleđivanje", "čl. 204 ZOO"],
    related_articles: ["čl. 491 st. 1 ZKP", "čl. 204 ZOO"],
    outcome: "defendant_won",
  },
  // ── BATCH 2 (3/4) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 25/2021",
    legal_area: "civil",
    legal_question:
      "Da li prvostepeni sud može pogrešno odbiti tužbu jer vansudske isplate pokrivaju nematerijalnu štetu u vreme isplate, ako se pravični iznosi po čl. 200 ZOO uvećaju do dana presuđenja?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i delimično usvojio tužbeni zahtev, dosudivši dodatnu naknadu nematerijalne štete jer je drugostepeno utvrđeno da je prvostepena primena čl. 200 ZOO bila pogrešna.",
    reasoning:
      "Prvostepeni sud je smatrao da su mirne isplate u martu 2017. pokrile štetu po svim vidovima; drugostepeni sud je ocenio da pravični iznosi treba odmeriti i prema kriterijumima na dan presuđenja, pa je ostalo mesta za dodatnu satisfakciju za bol, strah, naruženost i umanjenje životne aktivnosti uz primenu čl. 941 ZOO i ZOBS.",
    keywords: ["nematerijalna šteta", "vansudska isplata", "pravična naknada", "preinačenje"],
    related_articles: ["čl. 200 ZOO", "čl. 941 st. 1 ZOO", "Zakon o obaveznom osiguranju u saobraćaju"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3040/2014",
    legal_area: "civil",
    legal_question:
      "Da li se iscrpljenost sume osiguranja može utvrditi samo sabiranjem isplata, bez poređenja ukupne štete na dan nezgode sa zakonskim limitom?",
    court_position:
      "Apelacioni sud je ukinuo presudu u delu obaveze osiguravača jer prvostepeni sud nije pravilno utvrdio iscrpljenost limita i nije raspravio prirodu traženih budućih potraživanja, pa predmet zahteva nije bio podoban za meritornu odluku.",
    reasoning:
      "Iscrpljenost osigurane sume zahteva upoređivanje ukupne štete na dan događaja sa limitom, a ne samo evidenciju izvršenih isplata. Za nematerijalnu štetu, rentu i preostale zahteve prvostepeni sud treba da dopuni činjenično stanje i ponovo primeni materijalno pravo (čl. 375 ZPP u vezi sa čl. 377 st. 2 ZPP).",
    keywords: ["limit osiguranja", "iscrpljenost", "renta", "ukidanje"],
    related_articles: ["čl. 375 ZPP", "čl. 377 st. 2 ZPP", "Zakon o obaveznom osiguranju u saobraćaju"],
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 5759/2020",
    legal_area: "commercial",
    legal_question:
      "Da li Garantni fond dužan da naknadi punu štetu popravke vozila uključujući PDV kada je šteta nastala od neregistrovanog vozila?",
    court_position:
      "Privredni apelacioni sud je potvrdio prvostepenu presudu kojom je Fond obavezan na naknadu u visini stvarno plaćenog iznosa popravke, uključujući PDV.",
    reasoning:
      "Nije sporno da je šteta nastala od neregistrovanog vozila i da Fond odgovara. Pravilno je utvrđeno pravo na naknadu u iznosu koji je tužilac platio trećem licu za saniranje štete, pri čemu je prihvaćen i PDV kao sastavni deo stvarnog troška popravke u skladu sa računima i veštačenjem.",
    keywords: ["Garantni fond", "PDV", "materijalna šteta", "neregistrovano vozilo"],
    related_articles: ["Zakon o obaveznom osiguranju u saobraćaju", "čl. 154–189 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1136/2021",
    legal_area: "civil",
    legal_question:
      "Da li fizičko lice ima aktivnu legitimaciju da traži štetu koju navodno pretrpe njegova privredna društva i da li postoji uzročnost između državnog postupanja i lične imovine tužioca?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju i potvrdio odbijanje tužbe u celini, jer tužilac nije aktivno legitimisan za štetu preduzeća i nije dokazana šteta od oduzimanja putne isprave.",
    reasoning:
      "Nižestepeni sudovi su pravilno zaključili da tužilac ne može u svoje ime tražiti naknadu štete koju nije on pretrpeo. Revizijski navodi o grešci u pisanju u izreci (materijalna umesto nematerijalne štete za robu) ne menjaju ishod jer je tužbeni zahtev odbijen zbog nedostatka legitimacije bez obzira na vrstu štete.",
    keywords: ["aktivna legitimacija", "pravna lica", "teret dokazivanja"],
    related_articles: ["čl. 154 ZOO", "Zakon o parničnom postupku"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1617/2014",
    legal_area: "commercial",
    legal_question:
      "Od kog dana teče zatezna kamata na regresno potraživanje Garantnog fonda prema odgovornom licu nakon isplate oštećenima?",
    court_position:
      "Privredni apelacioni sud je preinačio prvostepenu presudu u delu kamate i prihvatio stav Fonda da kamata teče od dana isplate štete oštećenima, kao lex specialis u odnosu na opšti režim ZOO.",
    reasoning:
      "Za štetu od neosiguranog vozila važe odredbe Zakona o obaveznom osiguranju u saobraćaju (čl. 74 i 91) o obavezi Fonda i naknadnoj regresnoj naplati. Prvostepena odbijanje kamate za period od isplate do podnošenja tužbe suprotno je tom specijalnom režimu; kamata počinje od dana kada je Fond ispunio obavezu prema oštećenima.",
    keywords: ["Garantni fond", "regres", "zatezna kamata", "ZOBS"],
    related_articles: ["čl. 74 i 91 Zakona o obaveznom osiguranju u saobraćaju", "čl. 324 st. 2 ZOO", "čl. 277 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 17114/2023",
    legal_area: "civil",
    legal_question:
      "Da li postojanje rupa na kolovozu automatski uspostavlja odgovornost upravljača puta kada je nezgoda nastala zbog iznenadnog prelaska vozila u suprotnu traku?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio da rupe na putu nisu bile odlučujući uzrok; presudan je propust drugog vozača koji je prešao u suprotnu traku.",
    reasoning:
      "Prvostepeni sud je utvrdio podeljenu odgovornost vozača i tuženog kao održavaoca ulice; drugostepeni sud je drugačije ocenio kauzalitet. Revizijski sud prihvata da je fokus na pređenom manevru suprotnog vozača odlučan za ishod, pa odbijanje revizije tužioca sledi iz pravilne primene materijalnog prava nižestepenih sudova.",
    keywords: ["rupa na putu", "uzročnost", "podeljena odgovornost", "Leskovac"],
    related_articles: ["čl. 172 st. 1 ZOO", "čl. 174 ZOO", "čl. 176 ZOO", "čl. 184 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3087/2020",
    legal_area: "civil",
    legal_question:
      "Da li postoji uzročna veza između opisane saobraćajne nezgode i oštećenja na motociklu kada veštaci daju suprotne nalaze?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio odbijanje zahteva za materijalnu štetu, jer Institut saobraćajnog fakulteta isključuje opis nezgode koji bi mogao proizvesti oštećenja na motociklu.",
    reasoning:
      "Nakon sukcesivnih veštačenja i nalaza instituta, utvrđeno je da materijalni tragovi ne odgovaraju verziji događaja tužioca i učesnika na uviđaju. Drugostepeni sud je pravilno primenio materijalno pravo kada je zaključio da nema dokaza o uzročnoj vezi između štetnog događaja i štete na vozilu.",
    keywords: ["veštačenje", "uzročna veza", "motocikl", "materijalna šteta"],
    related_articles: ["čl. 178 ZOO", "čl. 185–189 ZOO", "čl. 228 ZPP"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 476/2023",
    legal_area: "civil",
    legal_question:
      "Da li vozač koji je izazvao nezgodu sa smrtnim ishodom pod alkoholom i prekoračenom brzinom dužan regresa osiguravaču za isplaćene iznose porodici pokojnog i štetu na vozilu?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tuženi obavezan na regres, jer alkohol i brzina povlače gubitak prava iz osiguranja i punu obavezu prema osiguravaču koji je isplatio oštećene.",
    reasoning:
      "Osiguravač je isplatio obimne iznose članovima porodice po osnovu smrti bliskog lica i materijalnu štetu na vozilu. Veštačenjem je utvrđen kontekst nezgode; primena posebnih odredaba o autoodgovornosti i gubitku pokrića usled alkohola daje osnov za regresnu tužbu.",
    keywords: ["regres", "smrt", "alkohol", "autoodgovornost"],
    related_articles: ["Zakon o obaveznom osiguranju u saobraćaju", "čl. 939–941 ZOO"],
    outcome: "plaintiff_won",
  },
  // ── BATCH 2 (4/4) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1890/2018",
    legal_area: "commercial",
    legal_question:
      "Da li osiguravač koji je po kasko isplatio štetu na vozilu ima regres prema drugom učesniku kada su štetno i oštećeno vozilo u vlasništvu istog lica?",
    court_position:
      "Privredni apelacioni sud je preinačio presudu i odbio regresni zahtev, jer kada je isto lice vlasnik oba vozila, ne postoji regresna obaveza prema osiguravaču koji je platio kasko štetu.",
    reasoning:
      "Nakon Evropskog izveštaja i utvrđenih okolnosti nezgode, tužilac je isplatio materijalnu štetu svom osiguraniku (JGSP) za oštećeno vozilo, a tuženi je vlasnik štetnog vozila i istovremeno korisnik oštećenog vozila u istom vlasništvu. Pravni režim regresa između osiguravača ne može se primeniti u korist situacije identičnog vlasnika.",
    keywords: ["regres", "kasko", "isti vlasnik", "čl. 21 ZOBS"],
    related_articles: ["čl. 897 ZOO", "čl. 929 ZOO", "čl. 939 ZOO", "čl. 941 ZOO", "Zakon o obaveznom osiguranju u saobraćaju"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1970/2021",
    legal_area: "commercial",
    legal_question:
      "Da li taksi prevoznik dokazuje izgubljenu dobit zbog oštećenja vozila u sudaru sa autobusom kada traži naknadu štete od prevoznika?",
    court_position:
      "Privredni apelacioni sud je potvrdio prvostepenu presudu kojom je odbijen zahtev za izgubljenu dobit, jer tužilac nije dokazao štetu niti njenu visinu.",
    reasoning:
      "Teret dokazivanja štete i visine leži na tužiocu. Iako je utvrđena manja materijalna šteta na vozilu i okolnosti nezgode na rampi, tužilac nije podneo verodostojne dokaze o umanjenju prihoda od taksi delatnosti u konkretnom periodu, pa sud ne može dosuditi izmaklu korist.",
    keywords: ["izgubljena dobit", "teret dokazivanja", "taksi", "materijalna šteta"],
    related_articles: ["čl. 190 ZOO", "čl. 194 ZOO", "čl. 228 ZPP"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 4754/2018",
    legal_area: "commercial",
    legal_question:
      "Od kog trenutka teče trogodišnji rok zastarelosti regresnog potraživanja osiguravača prema drugom učesniku nakon isplate oštećenom?",
    court_position:
      "Privredni apelacioni sud je preinačio prvostepenu presudu i usvojio regresni zahtev, smatrajući da rok teče od dana isplate štete oštećenom, a ne od saznanja za štetu.",
    reasoning:
      "Prvostepeni sud je pogrešno primenio materijalno pravo o početku zastarelosti. Regres osiguravača koji je platio po vansudskom poravnanju ima početak roka od objektivnog momenta ispunjenja obaveze prema trećem licu, u skladu sa čl. 376 ZOO i specifičnostima osigurateljskog odnosa.",
    keywords: ["regres", "zastarelost", "isplata oštećenom", "čl. 376 ZOO"],
    related_articles: ["čl. 376 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3258/2020",
    legal_area: "civil",
    legal_question:
      "Da li osiguravač može ostvariti regres prema vozaču koji se branio da nije bio pod dejstvom psihoaktivnih supstanci kada veštaci ne mogu isključiti konzumaciju pre nezgode?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju osiguravača i potvrdio odbijanje regresa, jer nije pouzdano utvrđeno da je vozač u momentu nezgode bio pod uticajem droge kao uslovom za gubitak prava iz osiguranja.",
    reasoning:
      "Toksikološko-neuropsihijatrijsko veštačenje ukazuje na mogućnost uticaja supstanci na vožnju, ali ostavlja prostor da je konzumacija mogla biti i posle nezgode. Bez pouzdanog utvrđivanja da je uslov polise za isključenje pokrića ispunjen, regres nije osnovan.",
    keywords: ["regres", "droga", "psihoaktivne supstance", "teret dokazivanja"],
    related_articles: ["Zakon o obaveznom osiguranju u saobraćaju", "Uslovi osiguranja"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 5/2020",
    legal_area: "civil",
    legal_question:
      "Da li poslodavac može tražiti naknadu štete na službenom vozilu od zaposlenog kada je krivična prijava odbačena oportunitetom?",
    court_position:
      "Vrhovni kasacioni sud je preinačio drugostepenu presudu, odbio žalbu zaposlenog i potvrdio prvostepenu obavezu naknade, smatrajući da oportunitet u krivičnom postupku ne isključuje građanskopravnu odgovornost za krajnju nepažnju.",
    reasoning:
      "Utvrđeno je prevrtanje vozila zbog gubitka kontrole pri većoj brzini bez sudara sa drugim vozilom. Primena oportuniteta u krivičnom postupku ne isključuje građanskopravnu odgovornost za krajnju nepažnju; neizricanje krivične osude ne briše obavezu po čl. 163 st. 1 Zakona o radu i čl. 154, 178 i 185 ZOO za štetu na vozilu poslodavca.",
    keywords: ["povreda na radu", "oportunitet", "krajnja nepažnja", "naknada štete"],
    related_articles: ["čl. 163 st. 1 Zakona o radu", "čl. 154 st. 1 ZOO", "čl. 178 ZOO", "čl. 185 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 920/2015",
    legal_area: "civil",
    legal_question:
      "Da li članovi porodice vozača koji je isključivo kriv za nezgodu sa sopstvenom smrtju imaju pravo na naknadu od osiguravača autoodgovornosti kao treća lica?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilaca i potvrdio da nemaju pravo na naknadu iz sredstava obaveznog osiguranja jer nisu treća lica u smislu čl. 21 Zakona o obaveznom osiguranju u saobraćaju.",
    reasoning:
      "Smisao obaveznog osiguranja je zaštita trećih lica oštećenih u saobraćaju. Članovi porodice vozača koji je isključivo odgovoran nalaze se u istom pravnom položaju kao vozač i ne mogu tražiti naknadu od osiguravača u odnosu na štetu prouzrokovanu tom vozilom.",
    keywords: ["čl. 21 ZOBS", "treća lica", "porodica vozača", "autoodgovornost"],
    related_articles: ["čl. 21 Zakona o obaveznom osiguranju u saobraćaju", "čl. 178 st. 4 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 12562/2023",
    legal_area: "civil",
    legal_question:
      "Da li je pravilno utvrđen doprinos tužioca od 50% i obračun naknade koji uračunava vansudske isplate i procentualno umanjenje po čl. 192 ZOO?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca i potvrdio odluku o doprinosu od 50% i metodologiji obračuna materijalne i nematerijalne štete sa odbitkom isplaćenog iznosa.",
    reasoning:
      "Osnova obaveze osiguravača je čl. 940 ZOO; doprinos je utvrđen po čl. 192 ZOO. Pravični iznosi po vidovima su pažljivo odmereni, pa je polovina obaveze tuženog umanjena za već isplaćeni deo, pri čemu je ostvaren princip proporcionalnosti i potpunog namirenja u okviru utvrđenog doprinosa.",
    keywords: ["doprinos 50%", "nematerijalna šteta", "vansudska isplata", "čl. 192 ZOO"],
    related_articles: ["čl. 192 ZOO", "čl. 200 ZOO", "čl. 940 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5740/2022",
    legal_area: "civil",
    legal_question:
      "Da li tužilac može od Udruženja osiguravača tražiti naknadu materijalne štete po Memorandumu o razumevanju kada je sačinio evropski izveštaj o nezgodi sa vozilom sa osiguranjem sa KiM?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe, jer potpisivanje evropskog izveštaja isključuje primenu Memoranduma i odgovornost tuženog za štetu od vozila osiguranog polisom „Kosovo plus“.",
    reasoning:
      "Kada učesnici popune evropski izveštaj za štetu manjeg obima bez uviđaja MUP, ne ispunjavaju se uslovi za primenu Memoranduma o razumevanju. Tužilac je imao alternativu da traži uviđaj; izbor uprošćenog postupka isključuje traženu pravnu osnovu prema Udruženju osiguravača.",
    keywords: ["Evropski izveštaj", "Memorandum", "KiM", "mala šteta"],
    related_articles: ["Zakon o bezbednosti saobraćaja na putevima", "čl. 106 Zakona o obaveznom osiguranju u saobraćaju"],
    outcome: "defendant_won",
  },
  // ── BATCH 3 (1/4) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Kž1 Po1 5/2016",
    legal_area: "criminal",
    legal_question:
      "Da li organizovana grupa može biti osuđena za zločinačko udruživanje i prevare u osiguranju fingiranjem saobraćajnih nezgoda i podmićivanjem policajaca i procenitelja?",
    court_position:
      "Apelacioni sud je preinačio prvostepenu presudu i pooštrio krivičnu sankciju više okrivljenih, utvrdivši obeležja prevare u osiguranju i zločinačko udruživanje radi višestrukog pribavljanja protivpravne imovinske koristi.",
    reasoning:
      "Utvrđeno je prikupljanje lažne dokumentacije o nepostojećim ili izveštačkim nezgodama, podnošenje lažnih štetnih prijava i podela isplaćenih odšteta. Korišćenje zloupotrebljenih zapisnika MUP i učešće procenitelja čini lanac prevare prema osiguravajućim društvima u smislu čl. 208 st. 3 u vezi sa st. 1 Krivičnog zakonika.",
    keywords: ["prevara", "osiguranje", "fingirana nezgoda", "zločinačko udruživanje", "mito"],
    related_articles: ["čl. 208 st. 3 KZ", "čl. 346 KZ"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 1383/2021",
    legal_area: "civil",
    legal_question:
      "Da li je dosuđenih 4.000.000 dinara za nematerijalnu štetu zbog neosnovanog pritvora pravična naknada i od kada teče zatezna kamata?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio dosuđeni iznos kao pravičan, uz kamatu od dana prvostepene presude koja je utvrdila visinu obaveze.",
    reasoning:
      "Nematerijalna šteta ne može se „popraviti“ novcem; obim novčane obaveze postaje izvestan tek presudom, pa zatezna kamata po čl. 277 ZOO ne može da teče pre tog trenutka. Revident neosnovano traži veći iznos; ocena suda o zadovoljavajućoj satisfakciji je pravilna.",
    keywords: ["neosnovan pritvor", "nematerijalna šteta", "kamata", "čl. 277 ZOO"],
    related_articles: ["čl. 200 ZOO", "čl. 277 ZOO", "čl. 394 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 4206/2010",
    legal_area: "civil",
    legal_question:
      "Ko je merodavan sud i koje pravo za spor o šteti iz međunarodne saobraćajne nezgode na teritoriji Srbije?",
    court_position:
      "Apelacioni sud je odbio žalbu osiguravača i potvrdio nadležnost domaćeg suda i primenu domaćeg materijalnog prava u skladu sa Haškom konvencijom i zakonima o sukobu zakona.",
    reasoning:
      "Štetni događaj je nastao u Srbiji između stranog teretnog i domaćeg putničkog vozila. Za odgovornost i visinu štete primenjuju se propisi Republike Srbije i međunarodni instrumenti kojima je Srbija obavezana; strana osiguravajuća društva podležu istančanju domaćeg parničnog postupka.",
    keywords: ["međunarodna nezgoda", "nadležnost", "sukob zakona", "Haška konvencija"],
    related_articles: ["Zakon o rešavanju sukoba zakona", "Zakon o obligacionim odnosima"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 1161/2023",
    legal_area: "civil",
    legal_question:
      "Da li Evropski izveštaj i odsustvo uviđaja MUP sprečavaju punu naknadu materijalne štete kada je veštak utvrdio totalnu štetu na vozilu veću od praga male štete?",
    court_position:
      "Apelacioni sud je potvrdio solidarnu obavezu tuženih na naknadu totalne štete na vozilu, smatrajući da popunjen izveštaj ne ograničava dokazivanje punog obima štete.",
    reasoning:
      "Osiguravač je odbio vansudsko poravnanje zbog formalnih prigovora; veštačenjem je utvrđena totalna šteta u iznosu znatno većem od 500 EUR. Primenom čl. 154, 155, 158, 185 i 186 ZOO i vezanosti za krivicu osiguranika, sud je pravilno dosudio naknadu materijalne štete na vozilu tužioca.",
    keywords: ["Evropski izveštaj", "totalna šteta", "solidarna odgovornost", "veštačenje"],
    related_articles: ["čl. 154–186 ZOO", "čl. 13 ZPP"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2825/2022",
    legal_area: "civil",
    legal_question:
      "Da li tužilac može ostvariti naknadu nematerijalne štete zbog uvreda na društvenoj mreži kada je svojim komentarima provocirao odgovor tuženog?",
    court_position:
      "Apelacioni sud je potvrdio odbijanje tužbe, jer su neprimereni komentari tužioca prema maloletnicama predstavljali provokaciju koja isključuje protivpravnost odgovora tuženog.",
    reasoning:
      "Po čl. 200 ZOO sud meri jačinu i trajanje duševnih bolova i straha, ali i ponašanje oštećenog. Kada tužilac inicira eskalaciju seksualizovanih provokacija, nije ostvaren osnov za naknadu zbog uvreda i pretnji na mreži jer nedostaje protivpravnost štetnika u odnosu na incidenat.",
    keywords: ["uvreda", "Facebook", "provokacija", "nematerijalna šteta"],
    related_articles: ["čl. 200 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7893/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li različite odluke Apelacionog suda u Kragujevcu u istovetnim slučajevima smrti vozača pod alkoholom i prava porodice prema osiguravaču povređuju pravo na jednaku zaštitu prava?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na jednaku zaštitu prava iz čl. 36 st. 1 Ustava zbog suprotnih odluka u identičnim činjeničnim i pravnim situacijama.",
    reasoning:
      "Prvostepeni sud je u jednom slučaju prihvatio pravo porodice na naknadu od osiguravača jer porodica nije vlasnik ni vozač vozila; drugostepeni sud je u sličnom slučaju doneo suprotnu odluku. Takva neujednačenost narušava pravnu sigurnost i jednaku primenu prava.",
    keywords: ["jednaka zaštita prava", "Ustavni sud", "osiguranje", "alkohol"],
    related_articles: ["čl. 36 st. 1 Ustava RS", "čl. 21 Zakona o obaveznom osiguranju u saobraćaju"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 2072/2016",
    legal_area: "civil",
    legal_question:
      "Da li se na regres osiguravača prema pijanom vozaču primenjuje posebni rok zastarelosti vezan za krivično gonjenje iz čl. 377 st. 1 ZOO ili trogodišnji rok iz čl. 376 ZOO?",
    court_position:
      "Apelacioni sud je ukinuo prvostepenu presudu i vratio predmet na ponovno suđenje jer je prvostepeni sud pogrešno primenio rok zastarelosti za regres osiguravača.",
    reasoning:
      "Prvostepeni sud je smatrao da tužba blagovremena jer podneta u roku zastarelosti krivičnog gonjenja za isto delo; regresno potraživanje osiguravača prema vozaču podleže opštem pravilu o zastarelosti štetnih zahteva, a ne produženom roku vezanom za krivično gonjenje. Potrebno je ponovo odlučiti o prigovoru zastarelosti.",
    keywords: ["regres", "zastarelost", "čl. 376 ZOO", "čl. 377 ZOO"],
    related_articles: ["čl. 376 ZOO", "čl. 377 ZOO", "čl. 375 ZPP"],
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž3 55/2022",
    legal_area: "civil",
    legal_question:
      "Da li izdavač koji prenosi neistinite informacije sa drugog portala odgovara za povredu časti i ugleda tužilaca i da li neobjavljivanje demantija sprečava naknadu?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je portal informer.rs obavezan na naknadu zbog povrede časti i ugleda, smatrajući da prenošenje sadržaja ne oslobađa odgovornosti za neistinitost.",
    reasoning:
      "Činjenica da tužioci nisu tražili demantiju ne utiče na postojanje nematerijalne štete od objave neistinitosti. Pravilno je primenjen čl. 113 i 114 Zakona o javnom informisanju u vezi sa čl. 200 ZOO; dosuđenih po 100.000 dinara ne predstavlja neopravdanu mešavinu u slobodu izražavanja.",
    keywords: ["mediji", "čast i ugled", "neistinite informacije", "informer"],
    related_articles: ["čl. 113–114 Zakona o javnom informisanju i medijima", "čl. 200 ZOO", "čl. 232 ZPP"],
    outcome: "plaintiff_won",
  },
  // ── BATCH 3 (2/4) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 12855/2022",
    legal_area: "civil",
    legal_question:
      "Da li osiguravač može osporavati pravo tužioca na naknadu izgubljene zarade i kapitalizovane rente nakon saobraćajne nezgode koja je trajno umanjila radnu sposobnost?",
    court_position:
      "Vrhovni sud je odbio reviziju osiguravača i potvrdio pravo na materijalnu štetu u vidu izgubljene zarade i kapitalizovane rente, smatrajući da tužba nije zastarela od dana pravnosnažnosti krivične presude.",
    reasoning:
      "Početak roka za tužbu vezan je za dostavljanje krivične presude koja proizvodi dejstvo prema strankama. Tužba podneta 2014. nakon pravnosnažnosti presude iz 2013. blagovremena je. Pravilna je primena čl. 941 st. 1–2 ZOO i čl. 188 i 195 ZOO za obim materijalne štete.",
    keywords: ["izgubljena zarada", "renta", "zastarelost", "krivična presuda"],
    related_articles: ["čl. 941 st. 1–2 ZOO", "čl. 188 ZOO", "čl. 195 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 7036/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li neizvršenje pravnosnažne presude protiv dužnika sa pretežim društvenim kapitalom povređuje pravo na mirno uživanje imovine?",
    court_position:
      "Ustavni sud je usvojio ustavnu žalbu i utvrdio povredu prava na imovinu, dosudivši naknadu materijalne štete iz budžeta u visini utvrđenog potraživanja u izvršnom postupku.",
    reasoning:
      "Država je dužna da obezbedi efikasno izvršenje presude. Propust izvršenja protiv dužnika sa pretežim društvenim kapitalom ostavlja podnosioca bez namirenja i predstavlja povredu prava na imovinu u smislu čl. 58 Ustava. Naknada se isplaćuje iz budžeta u roku od četiri meseca od dostavljanja odluke Ministarstvu pravde.",
    keywords: ["izvršenje", "Ustavni sud", "imovina", "budžet"],
    related_articles: ["čl. 58 Ustava RS", "čl. 89 st. 3 Zakona o Ustavnom sudu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 23094/2024",
    legal_area: "procedural",
    legal_question:
      "Da li je revizija tuženog osiguravača dozvoljena kada vrednost predmeta spora ne prelazi 40.000 evra?",
    court_position:
      "Vrhovni sud je odbacio reviziju kao nedozvoljenu jer vrednost spora ne ispunjava cenzus i ne postoje razlozi za posebnu reviziju radi ujednačavanja prakse.",
    reasoning:
      "Predmet su materijalne štete iz saobraćajne nezgode. Primenom čl. 404 st. 1 ZPP posebna revizija nije dopuštena bez ispunjenosti posebnih uslova; redovna revizija je nedozvoljena ispod cenzusa, pa je revizija odbačena.",
    keywords: ["revizija", "cenzus", "nedozvoljena revizija", "ZPP"],
    related_articles: ["čl. 404 ZPP"],
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1005/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li različit stav Apelacionog suda u Kragujevcu o pravu porodice na naknadu od osiguravača kada je vozač bio pod alkoholom povređuje pravo na jednaku zaštitu prava?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio povredu prava na jednaku zaštitu prava jer je drugostepeni sud doneo odluku suprotnoj ranijoj praksi u istovetnoj situaciji.",
    reasoning:
      "Prvostepeni sud je u situaciji smrti vozača pod alkoholom prihvatio da porodica (supruga) ima status trećeg lica po čl. 21 ZOBS; drugostepeni sud je primenom istog člana doneo suprotnu odluku. Takva neujednačenost narušava pravnu sigurnost i čl. 36 st. 1 Ustava.",
    keywords: ["jednaka zaštita prava", "čl. 21 ZOBS", "alkohol", "porodica vozača"],
    related_articles: ["čl. 36 st. 1 Ustava RS", "čl. 21 Zakona o obaveznom osiguranju u saobraćaju"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 1030/2013",
    legal_area: "constitutional",
    legal_question:
      "Da li je povređeno pravo na pravično suđenje kada drugostepeni sud odbije naknadu zbog obustave krivičnog postupka protiv oštećenog?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu, poništio deo presude Apelacionog suda u Nišu o nematerijalnoj šteti i utvrdio povredu prava na pravično suđenje zbog proizvoljne primene materijalnog prava.",
    reasoning:
      "Nematerijalna šteta zahteva postojanje duševnog bola, straha ili fizičkog bola u smislu čl. 200 ZOO. Obustava krivičnog postupka ne isključuje automatski pravo na naknadu po ZKP ili drugim propisima; drugostepeni zaključak da obustava isključuje bilo kakvu naknadu suprotan je ustavnopravnim standardima pravičnosti.",
    keywords: ["pravično suđenje", "obustava krivičnog postupka", "nematerijalna šteta", "Ustavni sud"],
    related_articles: ["čl. 32 Ustava RS", "čl. 200 ZOO", "Zakonik o krivičnom postupku"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 1860/2023",
    legal_area: "civil",
    legal_question:
      "Da li poslodavac može tražiti naknadu štete od zaposlenog pre nego što je okončan interni postupak za utvrđivanje odgovornosti po Zakonu o radu?",
    court_position:
      "Vrhovni sud je odbio reviziju tužioca-poslodavca i potvrdio odbijanje tužbe jer interni postupak nije vođen do kraja u skladu sa zakonom i opštim aktom.",
    reasoning:
      "Čl. 163 Zakona o radu predviđa da poslodavac utvrdi štetu i odgovornost po opštem aktu ili ugovoru, a tek ako se naknada ne ostvari tim putem sud odlučuje. Preskakanje tog koraka čini tužbu preranom; primena je data i na čl. 154–155 ZOO u kontekstu postupovne uslovnosti.",
    keywords: ["interni postupak", "Zakon o radu", "naknada štete", "poslodavac"],
    related_articles: ["čl. 163 Zakona o radu", "čl. 154 ZOO", "čl. 155 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 2573/2020",
    legal_area: "commercial",
    legal_question:
      "Da li Garantni fond odgovara prema stranom penzijskom nosiocu za regres isplaćenih penzija kada je osiguravač u stečaju i kada je nezgoda nastala na teritoriji SRJ?",
    court_position:
      "Privredni apelacioni sud je potvrdio obavezu Fonda na regres prema austrijskom penzijskom fondu jer je šteta pokrivena obaveznim osiguranjem ostala neizmirena u stečaju osiguravača.",
    reasoning:
      "Čl. 106 Zakona o osiguranju imovine i lica predviđa plaćanje iz Fonda za štetu iz obaveznog osiguranja koja ostane neizmirena u stečaju. Merodavno je domaće pravo jer je nezgoda na teritoriji SRJ/Srbije, a ne u Austriji; primena Haške konvencije i zakona o sukobu zakona upućuje na srpsko materijalno pravo.",
    keywords: ["Garantni fond", "regres", "stečaj", "Haška konvencija"],
    related_articles: ["čl. 106 Zakona o osiguranju imovine i lica", "Zakon o rešavanju sukoba zakona"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 2157/2015",
    legal_area: "civil",
    legal_question:
      "Da li neprijavljeni radnik može tražiti naknadu izgubljene zarade zbog povrede na radu po Zakonu o radu ili samo po opštim pravilima ZOO?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju za utvrđenje radnog odnosa zbog prekluzivnog roka od 90 dana, ali je ukinuo deo odbijanja naknade izgubljene zarade jer se ona može tražiti po opštim pravilima o odgovornosti.",
    reasoning:
      "Nepriavljen radnik nema pravo na naknadu po čl. 164 Zakona o radu, ali to ne isključuje naknadu materijalne štete po čl. 189 i 190 ZOO kada je odgovornost utvrđena kao odgovornost za opasnu stvar ili delatnost. Nematerijalna šteta je već dosuđena po opštim pravilima; ista logika važi za materijalnu posledicu povrede.",
    keywords: ["rad na crno", "povreda na radu", "izgubljena zarada", "čl. 164 Zakona o radu"],
    related_articles: ["čl. 164 Zakona o radu", "čl. 189 ZOO", "čl. 190 ZOO", "čl. 173–174 ZOO"],
    outcome: "partially",
  },
  // ── BATCH 3 (3/4) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 1938/2022",
    legal_area: "commercial",
    legal_question:
      "Da li se krivica za nezgodu može utvrditi isključivo na priznanju u prekršajnom postupku bez veštačenja?",
    court_position:
      "Privredni apelacioni sud je ukinuo prvostepenu presudu koja je zasnovala odgovornost na priznanju u prekršaju i vratio predmet na ponovno suđenje.",
    reasoning:
      "Za regres osiguravača prema drugom učesniku mora se pouzdano utvrditi krivica i udeo u nezgodi, što zahteva veštačenje saobraćajne struke, a ne samo administrativno priznanje. Sporni su ulazak u raskrsnicu na zeleno svetlo kod oba vozača, pa je potrebno ponovo utvrditi činjenice.",
    keywords: ["regres", "prekršaj", "priznanje", "veštačenje"],
    related_articles: ["čl. 228 ZPP", "čl. 154 ZOO"],
    outcome: "remanded",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5821/2022",
    legal_area: "civil",
    legal_question:
      "Kako se primenjuje zastarelost na potraživanje naknade štete zbog neisplaćenih penzija kada je rok sukcesivan za svaku mesečnu neisplatu?",
    court_position:
      "Apelacioni sud je potvrdio presudu kojom je tuženi Fond PIO obavezan na naknadu samo za poslednje tri godine pre tužbe, jer su starija potraživanja zastarela.",
    reasoning:
      "Naknada ne može biti veća od štete; isplate po drugim osnovima se uračunavaju. Zastarelost teče sukcesivno za svaku neisplatu penzije. Pravilno je odbijen deo tužbe za period stariji od tri godine u odnosu na podnošenje tužbe.",
    keywords: ["penzija", "zastarelost", "PIO", "čl. 172 ZOO"],
    related_articles: ["čl. 172 ZOO", "čl. 376 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 7493/2015",
    legal_area: "commercial",
    legal_question:
      "Da li je obaveza osiguravača prema RFPIO ograničena preostalim delom sume osiguranja nakon svih isplata po istom štetnom događaju?",
    court_position:
      "Privredni apelacioni sud je delimično usvojio žalbu osiguravača i preinačio presudu tako da je obaveza ograničena na preostali iznos limita polise posle ranijih isplata oštećenom.",
    reasoning:
      "Regres RFPIO za penzije i pomoć trećem licu mora se uskladiti sa iscrpljenošću limita autoodgovornosti za isti događaj. Prvostepeni sud nije pravilno sabrao sve isplate koje smanjuju preostali kapacitet obaveze osiguravača.",
    keywords: ["limit osiguranja", "regres", "RFPIO", "iscrpljenost"],
    related_articles: ["Zakon o obaveznom osiguranju u saobraćaju", "čl. 940–941 ZOO"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev2 449/2021",
    legal_area: "civil",
    legal_question:
      "Da li laki stepen umanjenja životne aktivnosti od 5% posle povrede na radu opravljava posebnu naknadu za taj vid nematerijalne štete pored bolova i straha?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužilje i potvrdio da su dosuđeni iznosi za fizičke bolove i strah pravični, dok posebna naknada za 5% umanjenja životne aktivnosti nije osnovana.",
    reasoning:
      "Poslodavac je objektivno odgovoran po čl. 164 Zakona o radu u vezi sa čl. 154 st. 2 ZOO. Po čl. 200 st. 2 ZOO laki stepen umanjenja koji retko i blago prati duševnu patnju ne opravdava poseban vid naknade jer bi dosuđivanje bilo suprotno cilju satisfakcije.",
    keywords: ["povreda na radu", "umanjenje životne aktivnosti 5%", "nematerijalna šteta"],
    related_articles: ["čl. 164 Zakona o radu", "čl. 200 st. 2 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6847/2016",
    legal_area: "constitutional",
    legal_question:
      "Da li neizmirenje potraživanja utvrđenog u stečajnom postupku protiv dužnika sa pretežim društvenim kapitalom povređuje pravo na imovinu?",
    court_position:
      "Ustavni Sud je usvojio ustavnu žalbu i utvrdio pravo na naknadu materijalne štete iz budžeta u visini potraživanja utvrđenog u stečaju, umanjenog za eventualne isplate.",
    reasoning:
      "Isti princip kao kod neizvršenja presude: država mora obezbediti efikasnu zaštitu imovinskih prava. Podnositeljka nije namirena po stečajnom rešenju; naknada se isplaćuje iz budžeta Ministarstva pravde u roku od četiri meseca.",
    keywords: ["stečaj", "Ustavni sud", "imovina", "budžet"],
    related_articles: ["čl. 58 Ustava RS", "čl. 89 st. 3 Zakona o Ustavnom sudu"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 23395/2023",
    legal_area: "civil",
    legal_question:
      "Da li oštećeni ima pravo na naknadu PDV-a na trošku popravke vozila ako popravku nije izvršio?",
    court_position:
      "Vrhovni sud je preinačio nižestepene presude i usvojio tužbeni zahtev za PDV, smatrajući da PDV predstavlja sastavni deo štete bez obzira na to da li je popravka izvršena.",
    reasoning:
      "Visina štete obuhvata vrednost rada i delova sa PDV-om kada je to ekonomski realan trošak oštećenika. Odbijanje PDV-a samo zbog toga što servis još nije fakturisan ili popravka nije urađena suprotno je principu punog obeštećenja iz čl. 190 ZOO.",
    keywords: ["PDV", "materijalna šteta", "popravka vozila", "puno obeštećenje"],
    related_articles: ["čl. 190 ZOO", "čl. 189 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 6928/2011",
    legal_area: "constitutional",
    legal_question:
      "Da li je ustavnopravno prihvatljivo da Vrhovni kasacioni sud odbije naknadu štete zbog nezakonitog otkaza kada je podnosilac svojim ponašanjem prekinuo uzročnu vezu?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu jer su razlozi Vrhovnog kasacionog suda za odbijanje revizije ustavnopravno prihvatljivi.",
    reasoning:
      "Merodavni Zakon o radnim odnosima nije predvideo posebnu naknadu za izgubljenu zaradu zbog nezakonitog otkaza; primenjuju se čl. 154 i 155 ZOO. Revizijski sud je ocenio da je podnosilac svojom voljom prekinuo uzročnu vezu između otkaza i štete, što je razuman pravni zaključak.",
    keywords: ["otkaz", "naknada štete", "uzročna veza", "Ustavni sud"],
    related_articles: ["čl. 154 ZOO", "čl. 155 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 5560/2022",
    legal_area: "civil",
    legal_question:
      "Kako se primenjuje zastarelost na potraživanje naknade štete zbog neisplaćenih penzija kada tužilac prima i isplate po uredbama za Kosovo i da li se one uračunavaju u štetu?",
    court_position:
      "Apelacioni sud je potvrdio delimičnu osnovanost tužbe uz trogodišnji rok zastarelosti i uračunavanje isplata oca tužioca po UNMIK uredbama u smanjenje štete.",
    reasoning:
      "Princip punog obeštećenja i savesnosti iz čl. 12 ZOO zahteva da se sve isplate po istoj šteti uračunaju, uključujući primanja po uredbama koje smanjuju obim štete. Za period kada je tužilac primao više od hipotetičkog PIO prava, zahtev je pravilno odbijen.",
    keywords: ["penzija", "UNMIK", "zastarelost", "umanjenje štete"],
    related_articles: ["čl. 12 ZOO", "čl. 172 ZOO", "čl. 376 ZOO"],
    outcome: "partially",
  },
  // ── BATCH 3 (4/4) ───────────────────────────────────────────────────────────
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "Už 2401/2014",
    legal_area: "constitutional",
    legal_question:
      "Da li postupak koji traje preko šest godina povređuje pravo na suđenje u razumnom roku u sporu za štetu iz saobraćaja?",
    court_position:
      "Ustavni Sud je odbio ustavnu žalbu u delu razumnog roka, smatrajući da složenost predmeta, veštačenja i postupanje sudova ne pokazuju neopravdano odlaganje.",
    reasoning:
      "U prvostepenom postupku utvrđena je složena nezgoda sa više vozila i alkoholisanim vozačem, materijalna šteta i krivično-prekršajni elementi. Trajanje postupka je u skladu sa težinom predmeta i nije pripisivo civilnim sudovima kao povreda čl. 32 Ustava.",
    keywords: ["razuman rok", "Ustavni sud", "saobraćajna nezgoda"],
    related_articles: ["čl. 32 Ustava RS"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž3 438/2022",
    legal_area: "civil",
    legal_question:
      "Da li je tužba za povredu prava na privatnost blagovremena kada se tuži za naknadu zbog objave fotografije, a posebno za utvrđenje povrede?",
    court_position:
      "Apelacioni sud je ukinuo presudu u delu utvrđenja povrede prava na privatnost zbog neblagovremene tužbe, a potvrdio dosudu 70.000 dinara za nematerijalnu štetu zbog neovlašćene objave prepoznatljive fotografije.",
    reasoning:
      "Za naknadu je relevantan odgovorni urednik u vreme objave. Visina 70.000 dinara za duševne bolove zbog povrede privatnosti i prava ličnosti pravilno je odmerena po čl. 200 ZOO; tužba za samo utvrđenje povrede podleže drugačijem roku i nije blagovremena.",
    keywords: ["privatnost", "fotografija", "mediji", "zastarelost tužbe"],
    related_articles: ["čl. 200 ZOO", "čl. 356 ZPP"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Vrhovni kasacioni sud Srbije",
    court_level: "supreme",
    case_number: "Rev 3792/2021",
    legal_area: "civil",
    legal_question:
      "Od kog momenta teče rok zastarelosti potraživanja naknade štete protiv države zbog nepravilnog upisa u katastar i neostvarenja razlučnog prava?",
    court_position:
      "Vrhovni kasacioni sud je odbio reviziju tužioca i potvrdio da je potraživanje zastarelo, jer rok teče od saznanja za gubitak statusa razlučnog poverioca, a ne od kasnije isplate u stečaju.",
    reasoning:
      "Tužilac je saznao za štetu i nedostatak namirenja dostavljanjem drugostepene presude u drugom sporu; od tog trenutka teče trogodišnji rok iz čl. 376 st. 1 ZOO. Naknadna isplata u stečaju ne produžava rok za novo tuženje države po čl. 172 st. 1 ZOO.",
    keywords: ["zastarelost", "država", "katastar", "stečaj", "razlučni poverilac"],
    related_articles: ["čl. 172 st. 1 ZOO", "čl. 376 st. 1 ZOO", "čl. 155 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Ustavni sud Srbije",
    court_level: "constitutional",
    case_number: "IUo 211/2009",
    legal_area: "constitutional",
    legal_question:
      "Da li odredba pravilnika kojom se čuvar šume tereti materijalnom odgovornošću zbog odbačene krivične prijave uvodi novi osnov odgovornosti suprotan zakonu?",
    court_position:
      "Ustavni Sud je pokrenuo postupak za ocenu zakonitosti čl. 17. Pravilnika JP „Srbijašume“ radi odnosa prema čl. 163 Zakona o radu i čl. 154–158 ZOO.",
    reasoning:
      "Zakon o radu detaljno uređuje odgovornost zaposlenog za štetu poslodavcu i trećim licima, dok ZOO definiše krivicu i štetu. Sporna odredba pravilnika može uvesti odgovornost koja nije predviđena zakonom ako uslojava štetu isključivo odbačenom krivičnom prijavom.",
    keywords: ["ocena zakonitosti", "Pravilnik", "materijalna odgovornost", "šume"],
    related_articles: ["čl. 163 Zakona o radu", "čl. 154–158 ZOO"],
    outcome: "procedural",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž1 2082/2016",
    legal_area: "labor",
    legal_question:
      "Da li je dosuđenih 100.000 dinara za povredu dostojanstva na radu zlostavljanjem pravična naknada kada postoji i rešenje Agencije za mirno rešavanje radnih sporova?",
    court_position:
      "Apelacioni sud je delimično preinačio presudu i povećao naknadu za povredu dostojanstva na radu na 100.000 dinara, smatrajući da prvostepeni iznos nije bio u skladu sa čl. 200 ZOO.",
    reasoning:
      "Nematerijalna šteta od zlostavljanja i povrede časti i ugleda predstavlja jedinstvenu celinu; ne treba veštački razdvajati bolove. Pravnosnažno rešenje Agencije doprinosi satisfakciji, pa veći novčani iznos ne bi bio opravdan; 100.000 dinara je pravična gornja granica u konkretnim okolnostima.",
    keywords: ["zlostavljanje na radu", "dostojanstvo na radu", "Agencija za MRRS", "nematerijalna šteta"],
    related_articles: ["čl. 200 ZOO", "Zakon o radu"],
    outcome: "partially",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 3339/2019",
    legal_area: "commercial",
    legal_question:
      "Od kog trenutka teče trogodišnji rok zastarelosti subrogacionog zahteva osiguravača prema odgovornom vozaču?",
    court_position:
      "Privredni apelacioni sud je odbio žalbu osiguravača i potvrdio da je subrogacioni zahtev zastareo jer rok teče od saznanja oštećenog za štetu i učinioca, a ne od dana isplate osiguravača.",
    reasoning:
      "Prvostepeni sud je pravilno primenio čl. 376 ZOO u vezi sa momentom kada je oštećeni saznao za obim štete i lice odgovorno za štetu. Argument osiguravača da rok počinje od isplate nije prihvaćen u konkretnoj konstelaciji dokaza o saznanju.",
    keywords: ["subrogacija", "zastarelost", "osiguranje", "čl. 376 ZOO"],
    related_articles: ["čl. 376 ZOO"],
    outcome: "defendant_won",
  },
  {
    jurisdiction: "RS",
    court: "Apelacioni sud u Beogradu",
    court_level: "appellate",
    case_number: "Gž 3284/2025",
    legal_area: "civil",
    legal_question:
      "Da li Evropski izveštaj sa priznanjem krivice jednog vozača isključuje dokaz veštačenjem o uzroku nezgode i da li su troškovi privatnog veštaka za procenu štete nužni troškovi?",
    court_position:
      "Apelacioni sud je potvrdio odgovornost osiguranja na osnovu izveštaja i priznanja krivice, kao i pravo na naknadu troškova privatnog veštaka za procenu visine štete pre parnice.",
    reasoning:
      "Kada je krivica jednog učesnika nesumnjiva, veštačenje o dinamici sudara može biti suvišno; međutim tužilac je imao nužan izdatak za veštaka radi utvrđivanja visine materijalne štete u vansudskom postupku. Odbijanje tog troška kao doprinosa povećanju štete nije osnovano.",
    keywords: ["Evropski izveštaj", "veštak", "troškovi postupka", "materijalna šteta"],
    related_articles: ["čl. 150 ZPP", "čl. 154 ZOO"],
    outcome: "plaintiff_won",
  },
  {
    jurisdiction: "RS",
    court: "Privredni apelacioni sud",
    court_level: "appellate",
    case_number: "Pž 6593/2018",
    legal_area: "commercial",
    legal_question:
      "Da li lovačko udruženje odgovara regresno osiguravaču za štetu od divljači na državnom putu kada upravljač puta nije postavio znak upozorenja?",
    court_position:
      "Privredni apelacioni sud je potvrdio odgovornost JP „Putevi Srbije“ prema osiguravaču, ali je preinačio presudu i oslobodio lovačko udruženje jer mesto nezgode nije u lovištu koje ono gazduje.",
    reasoning:
      "Nedostatak znaka „divljač na putu“ čini propust prvotuženog upravljača puta. Drugotuženo lovište nije obuhvatalo lokaciju nezgode; odgovornost „lovca“ kao imalca divljači nije utvrđena za ovu deonicu državnog puta, pa regres prema njemu nije osnovan.",
    keywords: ["regres", "divljač", "JP Putevi Srbije", "lov", "signalizacija"],
    related_articles: ["čl. 390 ZPP", "Zakon o divljači i lovstvu", "Zakon o javnim putevima"],
    outcome: "partially",
  },
]
