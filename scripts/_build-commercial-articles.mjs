import fs from "fs"
import path from "path"

const root = path.join(import.meta.dirname, "..")

const rsZpd = JSON.parse(
  fs.readFileSync(path.join(root, "tmp-rs-zpd-extract.json"), "utf8"),
)
for (const k of Object.keys(rsZpd)) {
  if (typeof rsZpd[k] === "string") {
    rsZpd[k] = rsZpd[k].replace(/&quot;/g, '"')
  }
}

const rsSt = JSON.parse(
  fs.readFileSync(path.join(root, "tmp-rs-stecaj-extract2.json"), "utf8"),
)

const hrZtd = JSON.parse(
  fs.readFileSync(path.join(root, "tmp-hr-ztd-articles.json"), "utf8"),
)
const hrSt = JSON.parse(
  fs.readFileSync(path.join(root, "tmp-hr-stecaj-articles.json"), "utf8"),
)

if (hrZtd["441"]?.includes("SUDSKA PRAKSA")) {
  hrZtd["441"] = hrZtd["441"].split(/\s*SUDSKA PRAKSA:/)[0].trim()
}

const fbihZpd = JSON.parse(
  fs.readFileSync(path.join(root, "tmp-fbih-zpd-articles.json"), "utf8"),
)
if (fbihZpd["93"]?.includes("DIO TREĆI")) {
  fbihZpd["93"] = fbihZpd["93"].split(/\s+DIO TREĆI/)[0].trim()
}

const fbihSt = JSON.parse(
  fs.readFileSync(path.join(root, "tmp-fbih-stecaj-articles.json"), "utf8"),
)

const meZpd = JSON.parse(
  fs.readFileSync(path.join(root, "tmp-me-zpd-extract.json"), "utf8"),
)

function esc(s) {
  return JSON.stringify(s ?? "")
}

function push(out, row) {
  out.push(`  {
    jurisdiction: ${esc(row.jurisdiction)},
    law_name: ${esc(row.law_name)},
    law_name_local: ${esc(row.law_name_local)},
    law_category: "commercial",
    article_num: ${esc(row.article_num)},
    effective_date: ${esc(row.effective_date)},
    source_url: ${esc(row.source_url)},
    text_local: ${esc(row.text_local)},
    text: ${esc(row.text)},
  },`)
}

const out = []
out.push(`/** Commercial (companies + insolvency/bankruptcy) articles — see ingest-legal-texts.ts */
export const COMMERCIAL_ARTICLES = [`)

const SRC_RS_ZPD = "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html"
const SRC_RS_ST = "https://www.paragraf.rs/propisi/zakon_o_stecaju.html"
const SRC_HR_ZTD =
  "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima"
const SRC_HR_ST =
  "https://www.zakon.hr/z/160/Ste%C4%8Dajni-zakon"
const SRC_FBIH_ZPD =
  "https://www.paragraf.ba/propisi/fbih/zakon-o-privrednim-drustvima-fbih.html"
const SRC_FBIH_ST =
  "https://www.fbihvlada.gov.ba/lat/dokumenti/zakoni/fbih/24bos.htm"
const SRC_BIHRS_ZPD =
  "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-privrednim-drustvima.html"
const SRC_BIHRS_ST =
  "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-stecaju.html"
const SRC_ME_ZPD =
  "https://www.paragraf.me/propisi-crnegore/zakon-o-privrednim-drustvima.html"

// --- Serbia ZPD ---
const rsZpdNums = ["18", "29", "54", "93", "289", "329", "348", "387", "469", "488"]
for (const n of rsZpdNums) {
  const tl = rsZpd[n]
  if (!tl) throw new Error("missing rs zpd " + n)
  push(out, {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    article_num: n,
    effective_date: "2011-05-21",
    source_url: SRC_RS_ZPD,
    text_local: tl,
    text: "[EN translation required — auto-build placeholder]",
  })
}

// Serbia Stečaj (skip 153)
const rsStMap = {
  "1": `This Law regulates the conditions and manner of initiating and conducting bankruptcy against legal entities.\n\nUnder this Law, bankruptcy is conducted by liquidation or reorganization.\n\nLiquidation means satisfying creditors from the value of the debtor's entire assets, or of the debtor as a legal entity.\n\nReorganization means satisfying creditors under an adopted reorganization plan by redefining debtor–creditor relations, corporate transformations of the debtor, or in another manner provided by the reorganization plan.`,
  "2": `The purpose of bankruptcy is the most favourable collective satisfaction of bankruptcy creditors by realising the greatest possible value of the debtor or its assets.`,
  "3": `Bankruptcy enables collective and proportional satisfaction of bankruptcy creditors in accordance with this Law.`,
  "11": `The bankruptcy proceeding is opened when at least one ground for bankruptcy is established.\n\nThe grounds for bankruptcy are:\n\n1) lasting inability to pay;\n2) threatened inability to pay;\n3) over-indebtedness;\n4) failure to act on an adopted reorganization plan, and where the plan was procured by fraud or unlawfully.\n\nLasting inability to pay exists if the debtor:\n\n1) cannot meet its monetary obligations within 45 days from the due date; or\n2) has completely ceased all payments for 30 consecutive days.\n\nThreatened inability to pay exists if the debtor makes it probable that it will be unable to meet existing monetary obligations when they fall due.\n\nOver-indebtedness exists if the debtor's assets are less than its liabilities. If the debtor is a partnership, over-indebtedness does not exist if the partnership has at least one general partner who is a natural person.\n\nFailure to act on an adopted reorganization plan exists when the debtor fails to act on the plan or acts contrary to the plan in a way that materially jeopardises implementation of the plan.`,
  "20": `The bankruptcy trustee is appointed by the bankruptcy judge in the decision opening the bankruptcy proceeding.\n\nSelection of the bankruptcy trustee is made by random draw from the list of active bankruptcy trustees for the territory of the competent court, which list is supplied to the court by the organisation competent to maintain the register of bankruptcy trustees.\n\nExceptionally, when selecting the bankruptcy trustee the bankruptcy judge may also consider a creditor's proposal to appoint a trustee, if the proceeding was initiated on a creditor's proposal and contains a proposal for appointment in accordance with the Law.\n\nIn a preliminary bankruptcy proceeding, an interim bankruptcy trustee is appointed by the bankruptcy judge in the same manner.\n\nThe minister lays down more detailed conditions and the method of random selection.`,
  "33": `After discharge, the outgoing and newly appointed bankruptcy trustees shall, without delay, hand over the entire assets and documentation. The discharged trustee must submit to the bankruptcy judge and creditors' committee a report on the course of the proceeding and the state of the estate from opening until discharge. The report must contain all data referred to in Article 29(6) of this Law.\n\nThe duty to hand over documentation also binds third parties holding the debtor's documentation at the time of discharge.\n\nIf the discharged trustee or a person under paragraph 2 refuses or delays handover, the bankruptcy judge shall, on the new trustee's request, order handover under threat of compulsory enforcement.\n\nIf the order is not complied with, the judge shall apply coercive measures.\n\nThe discharged trustee and persons under paragraph 2 are liable for damage caused by undue delay in handover.`,
  "52": `Creditors may participate in the bankruptcy proceeding on the basis of their claims even before filing a proof of claim, in the manner and to the extent provided by this Law.`,
  "86": `Filing a claim interrupts limitation of claims against the debtor.\n\nLimitation of the debtor's claims against its own debtors is suspended on the day the bankruptcy proceeding is initiated and does not run for one year from the day the proceeding is opened.`,
  "138": `The estate available for distribution to bankruptcy creditors (the distributable mass) consists of the debtor's cash on the day the proceeding is opened, cash obtained by continuing commenced businesses, cash realised by liquidating the debtor's assets and rights, and receivables collected during the proceeding.\n\nDistribution for satisfaction of bankruptcy creditors may occur before or after the main distribution, depending on the inflow of cash.\n\nOn the trustee's proposal, depending on cash inflow, the bankruptcy judge decides whether to approve an interim distribution under the same conditions as the main distribution.`,
  "143": `Proceedings toward distribution of the estate, i.e. satisfaction of bankruptcy creditors, commence upon finality of the decision on the main distribution.\n\nThey may also commence where the decision on the main distribution is partially final, in the part that has become final.\n\nOn the trustee's proposal, distribution may begin before finality, subject to reserving funds for an appellant's rights.\n\nThe bankruptcy judge rules on the paragraph 3 proposal by conclusion.`,
}

for (const n of ["1", "2", "3", "11", "33", "52", "86", "138", "143"]) {
  const tl = rsSt[n]
  if (!tl) throw new Error("missing rs st " + n)
  push(out, {
    jurisdiction: "serbia",
    law_name: "Bankruptcy Act",
    law_name_local: "Zakon o stečaju",
    article_num: n,
    effective_date: "2010-11-11",
    source_url: SRC_RS_ST,
    text_local: tl,
    text: rsStMap[n] ?? "[EN translation — verify]",
  })
}

// Note: Article 11 RS stečaj = grounds/opening (user label "trustee" was mismatched). Article 20 = trustee appointment — user asked 11; we keep verbatim 11.

// Fix: User asked RS 11 for trustee — use article 20 text under 11? No — verbatim only. Already using 11 as opening.

// Add RS 20 as extra? User list did not include 20. Skip.

// --- Croatia ---
const hrZtdNums = [
  "1",
  "10",
  "29",
  "68",
  "108",
  "272",
  "277",
  "434",
  "441",
  "497",
  "548",
]
for (const n of hrZtdNums) {
  push(out, {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    article_num: n,
    effective_date: "1993-12-31",
    source_url: SRC_HR_ZTD,
    text_local: hrZtd[n],
    text: "[EN translation — verify against NN 111/93 et seq.]",
  })
}

const hrStNums = ["1", "4", "6", "33", "54", "72", "135", "218"]
for (const n of hrStNums) {
  push(out, {
    jurisdiction: "croatia",
    law_name: "Bankruptcy Act",
    law_name_local: "Stečajni zakon",
    article_num: n,
    effective_date: "2015-07-18",
    source_url: SRC_HR_ST,
    text_local: hrSt[n],
    text: "[EN translation — verify against NN 71/15 et seq.]",
  })
}

// --- FBiH ZPD (omit 469, 488) ---
for (const n of ["1", "8", "19", "54", "93", "289", "329"]) {
  push(out, {
    jurisdiction: "bih_fbih",
    law_name: "Companies Act FBiH",
    law_name_local: "Zakon o privrednim društvima FBiH",
    article_num: n,
    effective_date: "2015-11-24",
    source_url: SRC_FBIH_ZPD,
    text_local: fbihZpd[n],
    text: "[EN translation — verify]",
  })
}

function cleanFbihSt(t) {
  return t
    .replace(/^Član \d+\.\s*\n\s*[^\n]+\s*/i, "")
    .replace(/\s+/g, " ")
    .trim()
}

for (const n of ["1", "3", "5", "22", "44", "68", "156"]) {
  const raw = fbihSt[n]
  const tl = raw.includes("Član") ? raw.replace(/\s+/g, " ").trim() : raw
  push(out, {
    jurisdiction: "bih_fbih",
    law_name: "Bankruptcy Act FBiH",
    law_name_local: "Zakon o stečajnom postupku FBiH",
    article_num: n,
    effective_date: "2003-08-15",
    source_url: SRC_FBIH_ST,
    text_local: tl,
    text: "[EN translation — verify]",
  })
}

// --- BiH RS entity ZPD (manual strings from HTML read) ---
const bihRsZpd = {
  "1": `Ovim zakonom uređuje se osnivanje privrednih društava, upravljanje društvima, prava i obaveze osnivača, ortaka, članova i akcionara, povezivanje i reorganizacija (statusne promjene i promjene pravne forme privrednih društava) i likvidacija privrednih društava.`,
  "8": `Privredno društvo stiče svojstvo pravnog lica trenutkom upisa u registar poslovnih subjekata na način propisan zakonom kojim se uređuje registracija poslovnih subjekata (u daljem tekstu: registar).`,
  "19": `Privredno društvo može u poslovanju, pored poslovnog imena da koristi i jedno ili više modifikovanih i / ili skraćenih poslovnih imena, ako su ta imena navedena u osnivačkom aktu, pod istim uslovima i na način pod kojima se koristi poslovno ime.`,
  "54": `(1) Ulog ortaka u ortačko društvo može biti u novcu, stvarima i pravima, kao i u radu ili uslugama koji su izvršeni ili treba da budu izvršeni.\n(2) Ortaci ortačkog društva ulažu uloge jednake vrijednosti.`,
  "93": `Komanditori i komplementari učestvuju u diobi dobiti i snošenju gubitka društva srazmjerno procentu udjela u društvu.`,
  "289": `(1) Pravo glasa na osnovu akcija datih u zalogu ima akcionar kao zalogodavac.\n(2) Pravo glasa na osnovu akcija ili udjela koje akcionarsko društvo ima u drugom društvu, može ostvarivati punomoćnik ili zakonski zastupnik.\n(3) Pravo glasa na osnovu akcija preminulog lica, maloljetnika ili drugog lica koje nema poslovnu sposobnost, može vršiti zakonski zastupnik tog lica, bez prenosa tih akcija na ime tog zastupnika.\n(4) Pravo glasa na osnovu akcija koje za stečajnog dužnika drži stečajni ili likvidacioni upravnik prilikom likvidacije društva, može vršiti bez prenosa tih akcija na svoje ime ako je ovlašćenje za to dato odgovarajućom sudskom odlukom u kojoj je takvo lice ovlašćeno.`,
  "329": `Osnivački akt akcionarskog društva može da se izmijeni odlukom upravnog odbora bez održavanja skupštine akcionara ako:\na) se izmjene i dopune odnose na promjene lica ovlašćenih za zastupanje društva ili druge izmjene kojima se ne diraju prava bilo kog akcionara i\nb) se izmjene i dopune odnose na povećanje broja izdatih akcija i osnovnog kapitala po osnovu izdavanja akcija od upravnog odbora društva u skladu sa ovlašćenjima iz člana 200. st. 4. do 6. ovog zakona.`,
}
for (const n of Object.keys(bihRsZpd)) {
  push(out, {
    jurisdiction: "bih_rs",
    law_name: "Companies Act RS Entity",
    law_name_local: "Zakon o privrednim društvima Republike Srpske",
    article_num: n,
    effective_date: "2010-01-01",
    source_url: SRC_BIHRS_ZPD,
    text_local: bihRsZpd[n],
    text: "[EN translation — verify]",
  })
}

const bihRsSt = {
  "1": `Ovim zakonom uređuju se postupak restrukturiranja i stečajni postupak, pravne posljedice otvaranja i sprovođenja postupka restrukturiranja i stečajnog postupka, reorganizacija stečajnog dužnika nesposobnog za plaćanje na osnovu stečajnog plana i međunarodni stečaj.`,
  "3": `(1) Postupak restrukturiranja i stečajni postupak može se sprovesti nad imovinom pravnog lica i imovinom dužnika pojedinca.\n(2) Dužnik pojedinac u smislu ovog zakona je komplementar u komanditnom društvu i osnivač ortačkog društva.\n(3) Postupak restrukturiranja i stečajni postupak može se otvoriti i nad imovinom pravnog lica u kojem je većinski kapital u vlasništvu Republike Srpske ili jedinice lokalne samouprave, izuzev nad imovinom Republike Srpske, jedinica lokalne samouprave, javnih fondova koji se u cijelosti ili djelimično finansiraju iz budžeta.\n(4) Nad stečajnim dužnikom u kojem je većinski kapital u vlasništvu Republike Srpske ili jedinice lokalne samouprave za otvaranje postupka restrukturiranja i stečajnog postupka, u periodu do okončanja postupka restrukturiranja pokrenutog od ovlašćenog prodavca ili do okončanja započetog postupka prodaje ponuđenog državnog kapitala i isteka rokova za izvršenje ugovorenih uslova prodaje, potrebna je prethodna saglasnost Vlade Republike Srpske (u daljem tekstu: Vlada) ili jedinice lokalne samouprave.\n(5) Ako Vlada ili jedinica lokalne samouprave ne uskrati svoju saglasnost u roku od 30 dana od dana dobijanja obavještenja stečajnog sudije o pokretanju prethodnog postupka, smatra se da je saglasnost data.`,
  "5": `(1) Razlog otvaranja stečajnog postupka je platežna nesposobnost stečajnog dužnika.\n(2) Stečajni dužnik je platežno nesposoban ukoliko nije u stanju da izvršava svoje dospjele i potraživane obaveze plaćanja.\n(3) Okolnost da je stečajni dužnik podmirio ili da može podmiriti u cijelosti ili djelimično potraživanja nekih povjerilaca samo po sebi ne znači da je platežno sposoban.\n(4) Stečajni dužnik je platežno nesposoban ako:\n1) 60 dana neprekidno ne izmiruje svoje dospjele novčane obaveze ili\n2) je račun stečajnog dužnika blokiran 60 dana neprekidno.\n(5) Stečajni postupak se može otvoriti i zbog prijeteće platežne nesposobnosti koja će nastupiti u narednih 12 mjeseci.\n(6) Zbog prijeteće platežne nesposobnosti samo stečajni dužnik može podnijeti prijedlog za otvaranje stečajnog postupka.\n(7) Razlog za otvaranje stečajnog postupka je i nepostupanje po usvojenom planu reorganizacije i ako je plan reorganizacije izdejstvovan prevarom ili na nezakonit način.\n(8) Nepostupanje po usvojenom planu reorganizacije postoji kada stečajni dužnik ne postupa po planu reorganizacije ili postupa suprotno planu reorganizacije na način kojim se bitno ugrožava sprovođenje plana reorganizacije.`,
  "22": `(1) Dužnik i stečajni dužnik, njegovi zakonski zastupnici i svjedoci obavezni su da Sudu, imenovanom vještaku i stečajnom upravniku dostave potpune i istinite informacije.\n(2) Stečajni dužnik ili njegovi zakonski zastupnici su, osim informacija iz stava 1. ovog člana, obavezni da očuvaju stečajnu masu i da se uzdrže od štetnih radnji koje mogu umanjiti stečajnu masu.\n(3) Ako stečajni dužnik ili lice koje je obavezno za davanje informacija ne izvršava svoje obaveze davanja informacija ili učestvovanja koje prema zakonu postoje ili ukoliko postoji osnovana sumnja da ovo lice vrši radnje radi oštećenja stečajne mase ili ne preduzima radnje potrebne za obezbjeđenje mase, stečajni sudija može prema vlastitoj procjeni i na prijedlog privremenog stečajnog upravnika ili stečajnog upravnika narediti odgovarajuća sredstva prinude.\n(4) Sredstva prinude u smislu stava 3. ovog člana Sud određuje rješenjem i ona su:\n1) prisilno privođenje pred Sud,\n2) izricanje novčane kazne za prekršaj.\n(5) U rješenju kojim se naređuje privođenje istovremeno se može i zaprijetiti izricanje novčane kazne za prekršaj.\n(6) Protiv rješenja kojim se naređuje privođenje može se izjaviti žalba drugostepenom sudu u roku od osam dana od dana dostavljanja rješenja.\n(7) Žalba ne odgađa izvršenje rješenja.`,
  "44": `(1) Sud zakazuje ročište na kojem se raspravlja i glasa o planu finansijskog i operativnog restrukturiranja.\n(2) Ročište će se održati u roku od 30 dana od dana zakazivanja.\n(3) Poziv za raspravu, glasanje i plan finansijskog i operativnog restrukturiranja objavljuju se na oglasnoj stranici suda, elektronskoj tabli suda, u "Službenom glasniku Republike Srpske" i na internet stranici APIF-a.\n(4) Na ročištu prijedlog plana finansijskog i operativnog restrukturiranja obrazlaže ovlašćeni predstavnik dužnika, a nakon toga se izjašnjava povjerenik.\n(5) Pravo učešća na raspravi imaju dužnik, povjerenik i povjerioci.\n(6) Odluku o prihvatanju plana finansijskog i operativnog restrukturiranja donose povjerioci.\n(7) Povjerioci glasaju pismenim putem na obrascu za glasanje.\n(8) Obrazac za glasanje mora biti dostavljen sudu najkasnije do početka ročišta za glasanje, potpisan i ovjeren od ovlašćenog lica.\n(9) Ako je povjerilac pravno lice, uz obrazac mora biti priložen dokaz da ga je potpisalo ovlašćeno lice (izvod iz sudskog ili odgovarajućeg registra).\n(10) Ako povjerioci do početka ročišta za raspravljanje i glasanje ne dostave obrazac za glasanje ili dostave obrazac iz kojeg se ne može nedvosmisleno utvrditi kako su glasali, smatra se da su glasali protiv plana finansijskog i operativnog restrukturiranja.\n(11) Povjeriocima prisutnim na ročištu, a koji nisu glasali do početka ročišta za glasanje, omogućava se pismeno glasanje na ročištu, a ako to ne učine, smatra se da su glasali protiv plana.\n(12) Sud sačinjava popis prisutnih povjerilaca i prava glasa koja im pripadaju.\n(13) Sud o obavljenom glasanju sačinjava poseban zapisnik, koji potpisuju dužnik, povjerenik i povjerioci.\n(14) Obrazac iz stava 7. ovog člana propisuje ministar pravilnikom.`,
  "68": `(1) Stečajni sudija imenuje stečajnog upravnika rješenjem o otvaranju stečajnog postupka.\n(2) Stečajni sudija za stečajnog upravnika može imenovati lice koje se nalazi na listi stečajnih upravnika za područje mjesno nadležnog Suda.\n(3) Izuzetno od stava 2. ovog člana, za stečajnog upravnika može biti imenovano lice koje se nalazi na listi sa područja drugog mjesno nadležnog Suda u Republici Srpskoj, ako na području nadležnog okružnog privrednog suda nema dovoljan broj stečajnih upravnika, odnosno ako su stečajni upravnici sa područja nadležnog okružnog privrednog suda već imenovani u dva stečajna predmeta.`,
  "156": `(1) Nepokretnosti koje nisu opterećene teretima (slobodne nepokretnosti) unovčavaju se pod uslovima i na način koji odredi skupština povjerilaca.\n(2) Skupština povjerilaca, kao uslov, može utvrditi najnižu prodajnu cijenu ispod koje se ne može imovina unovčiti, a može i obavezati kupca da nastavi obavljati i obavlja privredne djelatnosti određeni period, da zaposli određeni broj radnika, izvrši investiciona ulaganja i drugo.\n(3) Prodaja nepokretnosti vrši se javnim nadmetanjem, javnim prikupljanjem ponuda i neposrednom prodajom u skladu sa ovim zakonom i u skladu sa važećim standardima za upravljanje stečajnom masom.\n(4) Ako stečajni upravnik ne uspije unovčiti nepokretnost na dvije javne prodaje, prema uslovima iz st. 1. i 2. ovog člana, odbor povjerilaca, odnosno skupština povjerilaca ako odbor povjerilaca nije osnovan određuje najnižu cijenu ispod koje se nepokretnost ne može prodati na naredne dvije javne prodaje.\n(5) Ako je pokušaj unovčavanja nepokretnosti pod uslovom iz stava 4. ovog člana ostao bezuspješan, stečajni upravnik može nepokretnost unovčiti javnim prikupljanjem ponuda bez isticanja najniže cijene ako je saglasan odbor povjerilaca, odnosno skupština povjerilaca ako odbor povjerilaca nije osnovan.\n(6) Ako stečajni upravnik ne dobije saglasnost odbora povjerilaca, odnosno skupštine povjerilaca ako odbor povjerilaca nije osnovan za unovčavanje nepokretnosti na način iz stava 5. ovog člana ili ne uspije unovčiti nepokretnost na način iz stava 5. ovog člana, dužan je nepokretnost izdvojiti iz stečajne mase i predati povjeriocima srazmjerno njihovim potraživanjima, ako oni prihvate, a ako ne prihvate, onda je dužan postupiti u skladu sa članom 183. st. 11. i 12. ovog zakona.\n(7) Ako skupština povjerilaca odbije da odredi uslove i način unovčenja nepokretnosti (bez tereta) stečajnog dužnika, nepokretnosti se unovčavaju u skladu sa pravilima izvršnog postupka, ako to nije u suprotnosti sa odredbama ovog zakona.`,
}
for (const n of Object.keys(bihRsSt)) {
  push(out, {
    jurisdiction: "bih_rs",
    law_name: "Bankruptcy Act RS Entity",
    law_name_local: "Zakon o stečajnom postupku Republike Srpske",
    article_num: n,
    effective_date: "2016-07-16",
    source_url: SRC_BIHRS_ST,
    text_local: bihRsSt[n],
    text: "[EN translation — verify]",
  })
}

// --- Montenegro ZPD ---
for (const n of ["1", "8", "19", "54", "93", "289", "329"]) {
  push(out, {
    jurisdiction: "montenegro",
    law_name: "Companies Act Montenegro",
    law_name_local: "Zakon o privrednim društvima Crne Gore",
    article_num: n,
    effective_date: "2020-08-07",
    source_url: SRC_ME_ZPD,
    text_local: meZpd[n],
    text: "[EN translation — verify]",
  })
}

out.push(`]`)
out.push(``)

const dest = path.join(import.meta.dirname, "legal-articles-commercial.ts")
fs.writeFileSync(dest, out.join("\n"), "utf8")
console.log("wrote", dest, "lines", out.length)
