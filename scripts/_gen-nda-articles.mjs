/**
 * One-off helper: prints TypeScript object literals for legal-articles-nda.ts.
 * Run: node scripts/_gen-nda-articles.mjs
 */
const rows = []

function a(jurisdiction, law_name, law_name_local, law_category, article_num, source_url, text_local, text, effective_date) {
  rows.push({ jurisdiction, law_name, law_name_local, law_category, article_num, source_url, text_local, text, effective_date })
}

const SRC_RS_ZOO = "https://www.paragraf.rs/propisi/zakon_o_obligacionim_odnosima.html"
const SRC_RS_PT = "https://www.paragraf.rs/propisi/zakon_o_zastiti_poslovne_tajne.html"
const SRC_RS_AP = "https://www.paragraf.rs/propisi/zakon_o_autorskom_i_srodnim_pravima.html"
const SRC_HR_ZOO = "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima"
const SRC_HR_AP = "https://www.zakon.hr/z/106/Zakon-o-autorskom-pravu-i-srodnim-pravima"
const SRC_HR_TS = "https://www.zakon.hr/z/1017/Zakon-o-zastiti-neobjavljenih-informacija-s-trzisnom-vrijednosti"
const SRC_BIH_FBIH = "https://www.paragraf.ba/propisi/fbih/zakon_o_obligacionim_odnosima_fbih.html"
const SRC_BIH_RS = "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-obligacionim-odnosima.html"
const SRC_BIH_BR = "https://skupstinabd.ba/3-zakoni/ba/Distrikt/b-Obligaciono%20pravo/zakoni.html"
const SRC_ME_ZOO = "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html"
const SRC_ME_AP = "https://www.paragraf.me/propisi-crnegore/zakon-o-autorskom-i-srodnim-pravima.html"
const SRC_SI_OZ = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263"
const SRC_SI_ZASP = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO403"

// --- SERBIA ZOO (exclude 16 sample, 18 property) ---
a(
  "serbia",
  "Law on Obligations",
  "Zakon o obligacionim odnosima",
  "civil",
  "17",
  SRC_RS_ZOO,
  "(1) Strane u obligacionom odnosu dužne su da izvrše svoju obavezu i odgovorne su za njeno ispunjenje.\n\n(2) Obaveza se može ugasiti samo saglasnošću volja strana u obligacionom odnosu ili na osnovu zakona.",
  "(1) Parties to an obligation must perform their obligation and are responsible for its performance.\n\n(2) An obligation may be extinguished only by agreement of the parties to the obligation or by law.",
)

a(
  "serbia",
  "Law on Obligations",
  "Zakon o obligacionim odnosima",
  "civil",
  "20",
  SRC_RS_ZOO,
  "Strane mogu svoj obligacioni odnos urediti drukčije nego što je ovim zakonom određeno, ako iz pojedine odredbe ovog zakona ili iz njenog smisla ne proizlazi što drugo.",
  "The parties may regulate their obligatory relationship otherwise than provided by this Law, unless a particular provision of this Law or its meaning provides otherwise.",
)

a(
  "serbia",
  "Law on Obligations",
  "Zakon o obligacionim odnosima",
  "civil",
  "270",
  SRC_RS_ZOO,
  "(1) Poverilac i dužnik mogu ugovoriti da će dužnik platiti poveriocu određeni novčani iznos ili pribaviti neku drugu materijalnu korist ako ne ispuni svoju obavezu ili ako zadocni sa njenim ispunjenjem (ugovorna kazna).\n\n(2) Ako što drugo ne proizlazi iz ugovora, smatra se da je kazna ugovorena za slučaj da dužnik zadocni sa ispunjenjem.\n\n(3) Ugovorna kazna ne može biti ugovorena za novčane obaveze.",
  "(1) The creditor and debtor may agree that the debtor will pay the creditor a specified sum of money or procure another material benefit if the debtor fails to perform its obligation or is late in performing it (contractual penalty).\n\n(2) Unless otherwise follows from the contract, the penalty is deemed agreed for the case of the debtor's delay in performance.\n\n(3) A contractual penalty may not be agreed for monetary obligations.",
)

a(
  "serbia",
  "Law on Obligations",
  "Zakon o obligacionim odnosima",
  "civil",
  "271",
  SRC_RS_ZOO,
  "(1) Ugovorne strane mogu odrediti visinu kazne po svom nahođenju u jednom ukupnom iznosu, u procentu, ili za svaki dan zadocnjenja, ili na koji drugi način.\n\n(2) Ona mora biti ugovorena u formi propisanoj za ugovor iz koga je nastala obaveza na čije se ispunjenje odnosi.",
  "(1) The contracting parties may determine the amount of the penalty at their discretion in one total amount, as a percentage, per day of delay, or in another manner.\n\n(2) It must be agreed in the form prescribed for the contract from which the obligation whose performance it secures arises.",
)

a(
  "serbia",
  "Law on Obligations",
  "Zakon o obligacionim odnosima",
  "civil",
  "272",
  SRC_RS_ZOO,
  "(1) Sporazum o ugovornoj kazni deli pravnu sudbinu obaveze na čije se obezbeđenje on odnosi.\n\n(2) Sporazum gubi pravno dejstvo ako je do neispunjenja ili zadocnjenja došlo iz uzroka za koji dužnik ne odgovara.",
  "(1) An agreement on contractual penalty shares the legal fate of the obligation it secures.\n\n(2) The agreement loses legal effect if non-performance or delay occurred for a cause for which the debtor is not liable.",
)

// RS trade secrets 1,2,3,4,5,6,8,19 (user 8→19 court confidentiality; 9→8 damages; 10→6 limitation)
const RS_PT_1 =
  "Ovim zakonom uređuje se pravna zaštita poslovne tajne od nezakonitog pribavljanja, korišćenja i otkrivanja."
const RS_PT_2 =
  "Pojedini izrazi upotrebljeni u ovom zakonu imaju sledeće značenje:\n\n1) poslovnom tajnom smatraju se informacije koje ispunjavaju sledeće uslove:\n\n(1) predstavljaju tajnu jer nisu u celini ili u pogledu strukture i skupa njihovih sastavnih delova opšte poznate ili lako dostupne licima koja u okviru svojih aktivnosti uobičajeno dolaze u kontakt sa takvom vrstom informacija,\n\n(2) imaju komercijalnu vrednost jer predstavljaju tajnu,\n\n(3) lice koje ih zakonito kontroliše je u datim okolnostima preduzelo razumne mere kako bi sačuvalo njihovu tajnost;\n\n2) držalac poslovne tajne je fizičko ili pravno lice pod čijom je zakonitom kontrolom poslovna tajna;\n\n3) lice koje je povredilo poslovnu tajnu je fizičko ili pravno lice koje je nezakonito pribavilo, koristilo ili otkrilo poslovnu tajnu;\n\n4) lice za koje se sumnja da je povredilo poslovnu tajnu je fizičko ili pravno lice za koje se sumnja da je nezakonito pribavilo, koristilo ili otkrilo poslovnu tajnu;\n\n5) roba kojom je izvršena povreda je roba čiji su dizajn, karakteristike, način funkcionisanja, postupak proizvodnje ili način stavljanja u promet u značajnoj meri ostvareni zahvaljujući poslovnoj tajni koja je nezakonito pribavljena, korišćena ili otkrivena.\n\nInformacije iz stava 1. tačka 1) ovog člana obuhvataju, između ostalog, znanje i iskustvo, poslovne informacije i tehnološke informacije.\n\nRazumnim merama za očuvanje tajnosti informacija iz stava 1. tačka 1) podtačka (3) ovog člana smatraju se, između ostalog, izrada internog akta o rukovanju poslovnom tajnom i krugu lica i njihovim pravima i obavezama prilikom rukovanja poslovnom tajnom, mere fizičke ili elektronske zaštite pristupa i rukovanja poslovnom tajnom, označavanje dokumenata oznakom \"poslovna tajna\" ili sličnom oznakom, ograničavanje pristupa prostorijama i datotekama u kojima se nalaze informacije koje se smatraju poslovnom tajnom ili zaključivanje ugovora o poverljivosti, odnosno neotkrivanju poverljivih informacija sa licima koja potencijalno mogu da dođu u posed poslovne tajne, uključujući zaposlene, poslovne partnere, spoljne saradnike i konsultante, odnosno potpisivanje izjava o poverljivosti ili neotkrivanju poverljivih informacija od strane navedenih lica."

a("serbia", "Trade Secrets Protection Act", "Zakon o zaštiti poslovne tajne", "civil", "1", SRC_RS_PT, RS_PT_1, "This Law regulates legal protection of trade secrets against unlawful acquisition, use and disclosure.")

a(
  "serbia",
  "Trade Secrets Protection Act",
  "Zakon o zaštiti poslovne tajne",
  "civil",
  "2",
  SRC_RS_PT,
  RS_PT_2,
  "Terms used in this Law have the following meanings: (1) a trade secret means information that meets the following conditions: (i) it is secret in that it is not generally known or readily accessible, in whole or in the structure and combination of its constituent parts, to persons who normally deal with that type of information; (ii) it has commercial value because it is secret; (iii) the person lawfully controlling it has taken reasonable steps, in the circumstances, to keep it secret; (2) holder of a trade secret; (3) person who infringed a trade secret; (4) person suspected of infringement; (5) infringing goods; including confidentiality agreements and NDAs as reasonable measures.",
)

a(
  "serbia",
  "Trade Secrets Protection Act",
  "Zakon o zaštiti poslovne tajne",
  "civil",
  "3",
  SRC_RS_PT,
  "Pribavljanje poslovne tajne smatra se zakonitim ako je poslovna tajna pribavljena na jedan od sledećih načina:\n\n1) nezavisnim otkrićem ili stvaranjem;\n\n2) posmatranjem, proučavanjem, rastavljanjem ili testiranjem proizvoda ili predmeta koji je učinjen dostupnim javnosti ili koji je zakonito u državini pribavioca informacije (obrnuti inženjering) koji nije vezan pravno važećom obavezom da ograniči pribavljanje poslovne tajne ili koji nije vezan pravno važećom obavezom zabrane vršenja obrnutog inženjeringa;\n\n3) ostvarivanjem prava zaposlenih ili predstavnika zaposlenih na informisanje i konsultovanje u skladu sa posebnim propisima;\n\n4) drugom radnjom koja je u okolnostima konkretnog slučaja u skladu sa dobrim poslovnim običajima.\n\nPribavljanje, korišćenje ili otkrivanje poslovne tajne smatra se zakonitim u meri u kojoj je zahtevano ili dopušteno posebnim propisima.",
  "Acquisition of a trade secret is lawful if acquired by independent discovery or creation; observing, studying, disassembling or testing a product lawfully available or reverse engineering without a valid duty restricting acquisition; employee information/consultation rights; or other conduct consistent with good business practice. Use or disclosure is lawful to the extent required or permitted by special regulations.",
)

a(
  "serbia",
  "Trade Secrets Protection Act",
  "Zakon o zaštiti poslovne tajne",
  "civil",
  "4",
  SRC_RS_PT,
  "Pribavljanje poslovne tajne bez saglasnosti držaoca poslovne tajne smatra se nezakonitim ako je učinjeno na sledeći način:\n\n1) neovlašćenim pristupom, prisvajanjem ili umnožavanjem dokumenata, predmeta, materijala, supstanci ili elektronskih datoteka koji su pod zakonitom kontrolom držaoca poslovne tajne, a sadrže poslovnu tajnu, ili se poslovna tajna iz njih može izvesti, ili\n\n2) drugim postupanjem za koje se, u datim okolnostima, smatra da je u suprotnosti sa dobrim poslovnim običajima.\n\nKorišćenje ili otkrivanje poslovne tajne smatra se nezakonitim ako ga bez saglasnosti držaoca poslovne tajne vrši lice za koje se ustanovi da je:\n\n1) poslovnu tajnu pribavilo nezakonito;\n\n2) prekršilo sporazum o poverljivosti ili drugu obavezu koja se odnosi na zabranu otkrivanja poslovne tajne;\n\n3) prekršilo ugovornu ili drugu obavezu kojom se ograničava korišćenje poslovne tajne.\n\nPribavljanje, korišćenje ili otkrivanje poslovne tajne smatra se nezakonitim i ako je lice u trenutku pribavljanja, korišćenja ili otkrivanja znalo ili je u datim okolnostima moralo da zna da je poslovna tajna pribavljena direktno ili indirektno od drugog lica koje je poslovnu tajnu nezakonito koristilo ili otkrilo u smislu stava 2. ovog člana.\n\nNezakonitim korišćenjem poslovne tajne smatra se i proizvodnja, nuđenje ili stavljanje u promet robe kojom je izvršena povreda, odnosno uvoz, izvoz ili skladištenje robe kojom se vrši povreda u svrhe proizvodnje, nuđenja ili stavljanja robe u promet, ako je lice koje je obavljalo navedene aktivnosti znalo ili je u datim okolnostima moralo da zna da je poslovna tajna korišćena nezakonito u smislu stava 2. ovog člana.",
  "Unlawful acquisition without the holder's consent includes unauthorised access/copying of controlled materials or conduct contrary to good business practice. Use or disclosure is unlawful if done without consent and the person unlawfully acquired the secret, breached a confidentiality agreement or contractual restriction, or knew or should have known of indirect unlawful acquisition; production or placing infringing goods on the market is also covered.",
)

a(
  "serbia",
  "Trade Secrets Protection Act",
  "Zakon o zaštiti poslovne tajne",
  "civil",
  "5",
  SRC_RS_PT,
  "U slučaju povrede poslovne tajne držalac poslovne tajne može tužbom zahtevati:\n\n1) utvrđivanje povrede;\n\n2) prestanak povrede, ili u zavisnosti od slučaja, zabranu korišćenja ili otkrivanja poslovne tajne;\n\n3) zabranu proizvodnje, nuđenja, stavljanja u promet ili korišćenja robe kojom je izvršena povreda, odnosno zabranu uvoza, izvoza ili skladištenja robe kojom je izvršena povreda u svrhe proizvodnje, nuđenja, stavljanja u promet ili korišćenja robe;\n\n4) određivanje odgovarajućih mera koje se odnose na robu kojom je izvršena povreda, koje obuhvataju povlačenje takve robe s tržišta, uklanjanje s robe svojstava koja je čine robom kojom je izvršena povreda poslovne tajne ili uništenje robe kojom je izvršena povreda, odnosno ako je to opravdano, njeno povlačenje s tržišta, pod uslovom da se povlačenjem robe ne ugrožava zaštita poslovne tajne na koju se tužba odnosi;\n\n5) uništenje u celini ili delimično dokumenata, predmeta, materijala, supstanci ili elektronskih dokumenata koji sadrže poslovnu tajnu ili koji sami predstavljaju poslovnu tajnu ili ako je primereno, predaju tih dokumenata, predmeta, materijala, supstanci ili elektronskih dokumenata u celini ili delimično tužiocu.\n\nProtiv lica čije neovlašćeno preduzimanje određene radnje predstavlja neposrednu pretnju da će nezakonito pribaviti, koristiti ili otkriti poslovnu tajnu, držalac poslovne tajne može tužbom zahtevati prestanak preduzimanja te radnje i zabranu nezakonitog pribavljanja, korišćenja ili otkrivanja poslovne tajne.\n\nTužbeni zahtevi iz st. 1. i 2. ovog člana mogu da se podnesu i protiv posrednika koji pruža usluge koje treće lice koristi u radnjama kojima nezakonito pribavlja, koristi ili otkriva poslovnu tajnu, odnosno čije preduzimanje predstavlja neposrednu pretnju za nezakonito pribavljanje, korišćenje ili otkrivanje poslovne tajne.\n\nKada tužilac traži da se sa tržišta povuče roba kojom je izvršena povreda, on može da zahteva da se roba preda držaocu poslovne tajne ili dobrotvornim organizacijama.\n\nMere iz stava 1. tač. 4) i 5) ovog člana obavljaju se o trošku lica koje je povredilo poslovnu tajnu, osim ako sud odredi drugačije.\n\nOsim držaoca poslovne tajne, tužbu iz st. 1. i 2. ovog člana može podneti i sticalac licence, ako je za to ovlašćen na osnovu ugovora ili zakona.",
  "On infringement, the trade-secret holder may seek findings, injunctive relief, product-related remedies, destruction or surrender of materials, relief against imminent unlawful conduct and intermediaries, cost allocation, and licensees authorised by contract or law may also sue.",
)

a(
  "serbia",
  "Trade Secrets Protection Act",
  "Zakon o zaštiti poslovne tajne",
  "civil",
  "6",
  SRC_RS_PT,
  "Tužba zbog povrede poslovne tajne može se podneti u roku od godinu dana od dana kada je tužilac saznao za povredu i lice za koje se sumnja da je povredilo poslovnu tajnu, a najkasnije u roku od pet godina od dana učinjene povrede ili od dana poslednje učinjene povrede ako se povreda vrši kontinuirano.\n\nPostupak po tužbi iz stava 1. ovog člana je hitan.",
  "An action for trade-secret infringement may be brought within one year from when the plaintiff learned of the infringement and the suspected infringer, and at the latest within five years from the infringement or the last continuous act. Proceedings are urgent.",
)

a(
  "serbia",
  "Trade Secrets Protection Act",
  "Zakon o zaštiti poslovne tajne",
  "civil",
  "8",
  SRC_RS_PT,
  "Protiv lica koje je povredilo poslovnu tajnu koje je znalo ili je moralo da zna da učestvuje u nezakonitom pribavljanju, korišćenju ili otkrivanju poslovne tajne, držalac poslovne tajne, odnosno sticalac licence može tužbom da zahteva naknadu štete prema opštim pravilima o naknadi štete i u skladu sa ovim zakonom.\n\nPrilikom određivanja visine naknade štete sud uzima u obzir sve okolnosti slučaja, kao što su negativne ekonomske posledice koje je pretrpeo držalac poslovne tajne, odnosno sticalac licence, koje obuhvataju običnu štetu, izmaklu korist i korist koju je povredom poslovne tajne ostvarilo lice koje je povredilo poslovnu tajnu.\n\nDržalac poslovne tajne, odnosno sticalac licence ima pravo na naknadu nematerijalne štete koja je prouzrokovana nezakonitim pribavljanjem, korišćenjem ili otkrivanjem poslovne tajne.\n\nAko sud ne može da utvrdi visinu naknade štete u skladu sa st. 2. i 3. ovog člana, uzeće u obzir visinu naknade koju bi lice koje je povredilo poslovnu tajnu platilo za zakonito korišćenje poslovne tajne.",
  "Against a knowing participant in unlawful acquisition, use or disclosure, the holder or licensee may claim damages under general tort rules and this Law, including lost profit, infringer's gain and non-material harm; if quantum cannot be fixed, the court may use a lawful-use royalty as a benchmark.",
)

a(
  "serbia",
  "Trade Secrets Protection Act",
  "Zakon o zaštiti poslovne tajne",
  "civil",
  "19",
  SRC_RS_PT,
  "Stranke, njihovi advokati ili drugi zastupnici, sudski službenici, svedoci, sudski veštaci i druga lica koja učestvuju u sudskom postupku zbog nezakonitog pribavljanja, korišćenja ili otkrivanja poslovne tajne ili koja imaju pristup dokumentima koji su sastavni deo sudskog postupka, ne smeju koristiti ili otkriti poslovnu tajnu ili informaciju koja može da predstavlja poslovnu tajnu koju je sud, na obrazložen zahtev zainteresovane stranke, utvrdio kao poverljivu i za koju su ta lica saznala zbog učestvovanja u sudskom postupku.\n\nLica iz stava 1. ovog člana dužna su da čuvaju poslovnu tajnu i nakon okončanja sudskog postupka.\n\nObaveza iz stava 2. ovog člana prestaje:\n\n1) ako se pravosnažnom odlukom suda utvrdi da informacija koja može da predstavlja poslovnu tajnu ne ispunjava uslove utvrđene u članu 2. stav 1. tačka 1) ovog zakona, ili\n\n2) ako informacije koje čine poslovnu tajnu tokom vremena postanu opšte poznate ili lako dostupne licima koja se uobičajeno bave tom vrstom informacija.\n\nSud na obrazložen zahtev stranke može da odredi posebne mere za očuvanje tajnosti poslovne tajne ili informacije koja može da predstavlja poslovnu tajnu koja se koristi ili na koju se upućuje u toku sudskog postupka koji se odnosi na nezakonito pribavljanje, korišćenje ili otkrivanje poslovne tajne.\n\nMere iz stava 4. ovog člana su:\n\n1) isključenje javnosti iz celog sudskog postupka ili dela postupka;\n\n2) ograničenje broja lica koja imaju, u celini ili delimično, pristup dokumentima koje su podnele stranke u postupku ili treća lica, a koji sadrže poslovnu tajnu ili informaciju koja može da predstavlja poslovnu tajnu. Sud će upozoriti lica kojima je dozvolio pristup dokumentima na obavezu čuvanja tajnosti podataka iz stava 1. ovog člana;\n\n3) ograničenje broja lica koja prisustvuju ročištima na kojima bi se poslovna tajna ili informacija koja može da predstavlja poslovnu tajnu mogla otkriti, kao i ograničenje pristupa zapisniku sa tih ročišta;\n\n4) zabrana da se sudska odluka, u kojoj odlomci koji sadrže poslovnu tajnu nisu uklonjeni ili učinjeni nečitljivim, učini dostupnim licima koja nisu lica iz tač. 2) i 3) ovog stava.\n\nBroj lica iz stava 5. tač. 2) i 3) ovog člana ne sme biti veći od broja koji je potreban da bi se obezbedilo pravo stranke na stručnu pomoć i na pravično suđenje.\n\nPrilikom odlučivanja o merama iz stava 5. ovog člana i procene njihove opravdanosti, sud uzima u obzir potrebu da se obezbedi pravo stranaka na stručnu pomoć i na pravično suđenje, opravdane interese stranaka i trećih lica, s obzirom na okolnosti slučaja, kao i verovatnoću nastanka štete za jednu od stranaka ili za treća lica, koja bi mogla nastati zbog određivanja ili neodređivanja tih mera.\n\nObrada ličnih podataka na osnovu mera za očuvanje tajnosti iz ovog člana sprovodi se u skladu sa propisima kojima se uređuje zaštita podataka o ličnosti.",
  "Participants in litigation on trade secrets must not use or disclose confidential trade secrets identified by the court; duties continue after proceedings subject to exceptions. The court may order confidentiality measures including excluding the public, limiting access to documents and hearings, and redacting decisions. Personal data processing follows data-protection rules.",
)

// RS Copyright 1,2,14,20,30,206
a(
  "serbia",
  "Copyright and Related Rights Act",
  "Zakon o autorskom i srodnim pravima",
  "civil",
  "1",
  SRC_RS_AP,
  "Ovim zakonom uređuju se prava autora književnih, naučnih, stručnih i umetničkih dela (u daljem tekstu: autorsko pravo), pravo interpretatora, pravo prvog izdavača slobodnog dela, prava proizvođača fonograma, videograma, emisija, baza podataka i pravo izdavača štampanih izdanja kao prava srodna autorskom pravu (u daljem tekstu: srodna prava), način ostvarivanja autorskog i srodnih prava i sudska zaštita tih prava.",
  "This Law regulates copyright in literary, scientific, professional and artistic works, related rights of performers, first publishers of free works, producers of phonograms, videograms, broadcasts and databases, and publishers of printed editions, as well as exercise of those rights and judicial protection.",
)

a(
  "serbia",
  "Copyright and Related Rights Act",
  "Zakon o autorskom i srodnim pravima",
  "civil",
  "2",
  SRC_RS_AP,
  "Autorsko delo je originalna duhovna tvorevina autora, izražena u određenoj formi, bez obzira na njegovu umetničku, naučnu ili drugu vrednost, njegovu namenu, veličinu, sadržinu i način ispoljavanja, kao i dopuštenost javnog saopštavanja njegove sadržine.\n\nAutorskim delom smatraju se, naročito:\n\n1) pisana dela (knjige, brošure, članci, prevodi, računarski programi sa pratećom tehničkom i korisničkom dokumentacijom u bilo kojem obliku njihovog izražavanja, uključujući i pripremni materijal za njihovu izradu i dr.);\n\n2) govorna dela (predavanja, govori, besede i dr.);\n\n3) dramska, dramsko-muzička, koreografska i pantomimska dela, kao i dela koja potiču iz folklora;\n\n4) muzička dela, sa rečima ili bez reči;\n\n5) filmska dela (kinematografska i televizijska dela);\n\n6) dela likovne umetnosti (slike, crteži, skice, grafike, skulpture i dr.);\n\n7) dela arhitekture, primenjene umetnosti i industrijskog oblikovanja;\n\n8) kartografska dela (geografske i topografske mape);\n\n9) planovi, skice, makete i fotografije;\n\n10) pozorišna režija.",
  "A work of authorship is the author's original intellectual creation expressed in a particular form, regardless of artistic or scientific merit, purpose, size, content or manner of expression, including the permissibility of communicating its content to the public. Examples include writings, speeches, dramatic and musical works, films, visual art, architecture, maps, plans and photographs.",
)

a(
  "serbia",
  "Copyright and Related Rights Act",
  "Zakon o autorskom i srodnim pravima",
  "civil",
  "14",
  SRC_RS_AP,
  "Autor ima isključivo pravo da mu se prizna autorstvo na njegovom delu.",
  "The author has the exclusive right to be acknowledged as the author of the work.",
)

a(
  "serbia",
  "Copyright and Related Rights Act",
  "Zakon o autorskom i srodnim pravima",
  "civil",
  "20",
  SRC_RS_AP,
  "Autor ima isključivo pravo da drugome dozvoli ili zabrani beleženje i umnožavanje svog dela u celosti ili delimično, bilo kojim sredstvima, u bilo kom obliku, na bilo koji trajni ili privremeni, posredni ili neposredni način.\n\nDelo se umnožava naročito, grafičkim postupcima, fotokopiranjem i drugim fotografskim postupcima kojima se postiže isti rezultat, zvučnim ili vizuelnim snimanjem, izgradnjom dela arhitekture, smeštanjem dela u elektronskom obliku u memoriju računara.\n\nUmnožavanje dela postoji nezavisno od broja primeraka dela, tehnike kojom su umnoženi i trajnosti primeraka.\n\nAko je autorsko delo računarski program, umnožavanjem se smatra i puštanje programa u rad na računaru.\n\nAutor računarskog programa ima isključivo pravo da dozvoli ili zabrani umnožavanje računarskog programa koji je nastao kao rezultat prilagođavanja, prevođenja, aranžiranja ili izmene njegovog računarskog programa, bez uticaja na prava lica koje je izvršilo takve izmene.",
  "The author has the exclusive right to authorise or prohibit recording and reproduction of the work in whole or in part by any means and in any form, permanently or temporarily, directly or indirectly, including specific techniques and computer programs.",
)

a(
  "serbia",
  "Copyright and Related Rights Act",
  "Zakon o autorskom i srodnim pravima",
  "civil",
  "30",
  SRC_RS_AP,
  "Autor ima isključivo pravo da drugome zabrani ili dozvoli javno saopštavanje dela, uključujući činjenje dela dostupnim javnosti žičnim ili bežičnim putem na način koji omogućuje pojedincu individualni pristup delu sa mesta i u vreme koje on odabere.\n\nPravo iz stava 1. ovog člana se ne iscrpljuje bilo kojom radnjom javnog saopštavanja dela, uključujući činjenje dela dostupnim javnosti žičnim ili bežičnim putem na način propisan stavom 1. ovog člana.",
  "The author has the exclusive right to authorise or prohibit communication of the work to the public, including making it available online so that each person may access it at a time and place individually chosen. That right is not exhausted by any act of communication to the public including online availability.",
)

a(
  "serbia",
  "Copyright and Related Rights Act",
  "Zakon o autorskom i srodnim pravima",
  "civil",
  "206",
  SRC_RS_AP,
  "Pri određivanju visine naknade štete ako je učinilac povrede znao ili mogao da zna da čini povredu prava sud će uzeti u obzir sve okolnosti konkretnog slučaja, kao što su negativne ekonomske posledice koje trpi oštećeni, uključujući izgubljenu dobit, dobit koju je štetnik ostvario povredom prava i, u odgovarajućim slučajevima, okolnosti koje nemaju ekonomski karakter, kao što je neimovinska šteta.\n\nSud može umesto naknade štete iz stava 1. ovog člana, kada okolnosti slučaja to opravdavaju, da dosudi oštećenom paušalnu naknadu koja ne može biti niža od uobičajene naknade koju bi primio za konkretni oblik korišćenja predmeta zaštite, da je to korišćenje bilo zakonito.",
  "When setting damages where the infringer knew or should have known of the infringement, the court considers all circumstances including economic loss, lost profit, the infringer's profit and, where relevant, non-material harm. The court may award a lump sum not lower than the usual fee for lawful use of the subject matter if circumstances so justify.",
)

function esc(s) {
  return JSON.stringify(s)
}

console.log("// auto-generated body count:", rows.length)
for (const r of rows) {
  console.log(
    `  {\n    jurisdiction: ${esc(r.jurisdiction)},\n    law_name: ${esc(r.law_name)},\n    law_name_local: ${esc(r.law_name_local)},\n    law_category: ${esc(r.law_category)},\n    article_num: ${esc(r.article_num)},\n    source_url: ${esc(r.source_url)},\n    effective_date: ${r.effective_date ? esc(r.effective_date) : "undefined"},\n    text_local: ${esc(r.text_local)},\n    text: ${esc(r.text)},\n  },`,
  )
}
