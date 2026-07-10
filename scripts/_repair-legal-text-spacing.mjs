/**
 * Generator-side spacing repair (mirrors lib/repairLegalTextSpacing.ts core logic).
 * Used from _gen-prepare-text.mjs — keep boundary rules in sync with the TS module.
 */

const GLUE_PAIRS = [
  ["pravnosnažnim rešenjemonasleđivanju", "pravnosnažnim rešenjem o nasleđivanju"],
  ["SrbijeuBeogradu", "Srbije u Beogradu"],
  ["postupkausmislu", "postupka u smislu"],
  ["Odlučujućiopredloguza", "Odlučujući o predlogu za"],
  ["Odlučujućiopodignutom", "Odlučujući o predlogu za podignutom"],
  ["Odlučujućiopredlogu", "Odlučujući o predlogu"],
  ["Zakonaoparničnom", "Zakona o parničnom"],
  ["zakonaoparničnom", "zakona o parničnom"],
  ["Zakonaoizvršnom", "Zakona o izvršnom"],
  ["Zakonavanparničnom", "Zakona o vanparničnom"],
  ["Zakononasleđivanju", "Zakona o nasleđivanju"],
  ["Zakonao", "Zakona o"],
  ["predloguza", "predlogu za"],
  ["predlogza", "predlog za"],
  ["zahtevza", "zahtev za"],
  ["razlogza", "razlog za"],
  ["postupkakao", "postupka kao"],
  ["postupkaje", "postupka je"],
  ["odbijenjekao", "odbijen je kao"],
  ["usmislu", "u smislu"],
  ["au vezisa", "a u vezi sa"],
  ["auvezisa", "a u vezi sa"],
  ["uvezisa", "u vezi sa"],
  ["većuna", "već na"],
  ["Većuna", "Već na"],
  ["većuno", "već no"],
  ["Vrhovnisud", "Vrhovni sud"],
  ["Trgovačkog sudau", "Trgovačkog suda u"],
  ["Trgovački sudu", "Trgovački sud u"],
  ["Rješenjem Trgovačkog sudau", "Rješenjem Trgovačkog suda u"],
  ["presuda Trgovačkog sudau", "presuda Trgovačkog suda u"],
  ["rješenje Trgovačkog sudau", "rješenje Trgovačkog suda u"],
  ["presudioje", "presudio je"],
  ["riješioje", "riješio je"],
  ["Odbijase", "Odbija se"],
  ["Odbacujese", "Odbacuje se"],
  ["Ukidase", "Ukida se"],
  ["Prihvaćase", "Prihvaća se"],
  ["žalbakao", "žalba kao"],
  ["žalba kao", "žalba kao"],
  ["ipotvrđuje", "i potvrđuje"],
  ["protivnika", "protivnika"],
  ["Srbijeje", "Srbije je"],
  ["nasleđivanju , neće se", "nasleđivanju, neće se"],
  ["našaoda", "našao da"],
  ["načinštoje", "način što je"],
  ["godineida", "godine i da"],
  ["godineza", "godine za"],
  ["kojimasu", "koji su"],
  ["kojije", "koji je"],
  ["komgasud", "kom ga sud"],
  ["presudukojomgasud", "presudu kojom ga sud"],
  ["presudukojomga", "presudu kojom ga"],
  ["sudsau", "suda u"],
  ["Sudskog sudau", "Sudskog suda u"],
  ["Opštinskog sudau", "Opštinskog suda u"],
  ["rešenjeje", "rešenje je"],
  ["rešenjeo", "rešenje o"],
  ["rešenjemonasleđivanju", "rešenjem o nasleđivanju"],
  ["rešenjao", "rešenje o"],
  ["doneto zbog prihvatanjastava", "doneto zbog prihvatanja stava"],
  ["okončanikakoje", "okončani koje"],
  ["mogućnostponavljanja", "mogućnost ponavljanja"],
  ["može sepo", "može se po"],
  ["postupak kojije", "postupak koji je"],
  ["čijije", "čiji je"],
  ["zaveštanjemse", "zaveštanjem se"],
  ["pisao jeudnevniku", "pisao je u dnevniku"],
  ["je udnevniku", "je u dnevniku"],
  ["toje", "to je"],
  ["jerje", "jer je"],
  ["togaje", "toga je"],
  ["podneoje", "podneo je"],
  ["činjenicadaje", "činjenica da je"],
  ["suda Srbijene predstavlja", "suda Srbije ne predstavlja"],
  ["suda Srbijene može", "suda Srbije ne može"],
  ["prvostupanjskisud", "prvostupanjski sud"],
  ["prvostupanjskim sud", "prvostupanjski sud"],
  ["proizlazidaje", "proizlazi da je"],
  ["utvrdioda", "utvrdio da"],
  ["utvrdiodaje", "utvrdio da je"],
  ["Sudje", "Sud je"],
  ["jerje", "jer je"],
  ["odbioje", "odbio je"],
  ["odbiojekao", "odbio je kao"],
  // Serbia vrh.sud.rs sentence PDFs (fused OCR tokens)
  ["kadaje", "kada je"],
  ["usvojenna", "usvojen na"],
  ["TROŠKOVAKOD", "TROŠKOVA KOD"],
  ["ZASTUPANjAVIŠE", "ZASTUPANJA VIŠE"],
  ["okončanuodnosuna", "okončan u odnosu na"],
  ["odnosuna", "odnosu na"],
  ["postupakokončan", "postupak okončan"],
  ["OKRIVLjENIHOD", "OKRIVLjENIH OD"],
  // BiH / ijekavian PDF fusion (longest first)
  ["BosneiHercegovine", "Bosne i Hercegovine"],
  ["Bosnei Hercegovine", "Bosne i Hercegovine"],
  ["BOSNEIHERCEGOVINE", "BOSNE I HERCEGOVINE"],
  ["FEDERACIJE BOSNEIHERCEGOVINE", "FEDERACIJE BOSNE I HERCEGOVINE"],
  ["Vrhovnisud", "Vrhovni sud"],
  ["statutarnostiizakonitosti", "statutarnosti i zakonitosti"],
  ["StatutaiZakona", "Statuta i Zakona"],
  ["pojavljujuupostupcima", "pojavljuju u postupcima"],
  ["s obziromdaje", "s obzirom da je"],
  ["s obziromda", "s obzirom da"],
  ["nijeuskladusačlanom", "nije usklađena sa članom"],
  ["nijeuskladusa", "nije usklađena sa"],
  ["uskladusačlanom", "usklađena sa članom"],
  ["Zakonaopostupku", "Zakona o postupku"],
  ["Zakonaoparničnom", "Zakona o parničnom"],
  ["Zakonaodržavnoj", "Zakona o državnoj"],
  ["Zakonaozdravstvenom", "Zakona o zdravstvenom"],
  ["Zakonaojavnim", "Zakona o javnim"],
  ["Zakonaoplatama", "Zakona o platama"],
  ["Zakonaodopunskim", "Zakona o dopunskim"],
  ["Zakonaosigurnosti", "Zakona o sigurnosti"],
  ["Zakonaoprometu", "Zakona o prometu"],
  ["Zakonaoradu", "Zakona o radu"],
  ["Zakonaonasljed", "Zakona o nasljed"],
  ["Zakonopostupku", "Zakon o postupku"],
  ["Zakonojavnim", "Zakon o javnim"],
  ["Zakonaoeksproprijaciji", "Zakona o eksproprijaciji"],
  ["Odlukeoosnivanju", "Odluke o osnivanju"],
  ["Odlukuoponištenju", "Odluku o poništenju"],
  ["rješenjeoprestanku", "rješenje o prestatku"],
  ["rješenjeo", "rješenje o"],
  ["prijedlogza", "prijedlog za"],
  ["inicijativuza", "inicijativu za"],
  ["Direkcijeza", "Direkcije za"],
  ["Pravilnikaonačinu", "Pravilnika o načinu"],
  ["Pravilnikonačinu", "Pravilnik o načinu"],
  ["podnioje", "podnio je"],
  ["podnijeloje", "podnijelo je"],
  ["podnijesu", "podnijeli su"],
  ["usvojenoje", "usvojeno je"],
  ["štopo", "što po"],
  ["navodida", "navodi da"],
  ["smatrajuda", "smatraju da"],
  ["dase", "da se"],
  ["kojimsu", "kojima su"],
  ["kojise", "koji se"],
  ["suduna", "suda na"],
  ["suduje", "sud je"],
  ["sjednicije", "sjednici je"],
  ["godineje", "godine je"],
  ["odnosina", "odnosi na"],
  ["odlučenojena", "odlučeno je na"],
  ["Obavezujuse", "Obavezuju se"],
  ["PRESUDUODBIJASE", "PRESUDU ODBIJA SE"],
  ["PRESUDUUTVRĐUJESE", "PRESUDU UTVRĐUJE SE"],
  ["ODBIJASE", "ODBIJA SE"],
  ["UTVRĐUJESE", "UTVRĐUJE SE"],
  ["SEODBACUJE", "SE ODBACUJE"],
  ["Ne prihvatase", "Ne prihvata se"],
  ["advokatiz", "advokat iz"],
  ["Advokatiz", "Advokat iz"],
  ["distriktBiH", "distrikt BiH"],
  ["mauBiH", "ma u BiH"],
  ["mauBrčko", "ma u Brčko"],
  ["uBiH", "u BiH"],
  ["uBrčko", "u Brčko"],
  ["postupkupo", "postupku po"],
  ["kaoidaje", "kao i da je"],
  ["zatimidase", "zatim i da se"],
  ["godineu", "godine u"],
  ["počevod", "počev od"],
  ["odjednomna", "odjednom na"],
]

const LOWER_LAT = "a-zčćžšđ"
const UPPER_LAT = "A-ZČĆŽŠĐ"
const LOWER_CLASS = `[${LOWER_LAT}]`
const UPPER_CLASS = `[${UPPER_LAT}]`

const U_SINGLE_CAP = new RegExp(`(?<=${LOWER_CLASS})u(${UPPER_CLASS})(?=\\s*\\.)`, "g")

/** Croatian/Serbian court register codes — do not split inside these fused tokens. */
const REGISTER_FUSED_RE =
  /(?:UsI|Usi|UsII|Uzp|Usž|UsI-|Usi-|Gž|Kž|Pž|Už|Rev|Revr|Revd|Kzz|Gzz|St-|Pž-|Kž-|Gž-|Su-|Ov-|Povrv|UsImio|UsIrs|UsIjn|UsIpn|UsIgr|UsIzs|UsIcar|UsIkat|UsInoi|UsIizv|UsIpor|UsIsav)(?=[-/0-9]|$)/gi

function collapseWhitespace(s) {
  return s.replace(/\s+/g, " ").trim()
}

function spaceAfterPeriodBeforeWord(s) {
  return s.replace(
    new RegExp(`(?<![\\d\\u0660-\\u0669])(\\.)(?=${UPPER_CLASS}${LOWER_CLASS}|${UPPER_CLASS}{2})`, "g"),
    "$1 ",
  )
}

function spaceAfterCommaLike(s) {
  return s.replace(/([,;:])([^\s\d])/g, "$1 $2")
}

/** Croatian preposition "u" glued before a place name: sudauZagrebu → suda u Zagrebu */
function splitCroatianPrepositionU(s) {
  return s.replace(
    new RegExp(`(${LOWER_CLASS}{2,}?)u(${UPPER_CLASS}${LOWER_CLASS}+)`, "g"),
    "$1 u $2",
  )
}

/** BiH: legal noun + preposition glued (Zakonaopostupku → Zakona o postupku). */
function splitBiHLegalPrepositionO(s) {
  const stems =
    "Zakona|Zakon|Odluke|Odluka|Uredbe|Uredba|Pravilnika|Pravilnik|rješenje|Rješenje|rešenje|prijedlog|Prijedlog|Poslovnika|Statuta|Direkcije|Direkcija"
  return s.replace(
    new RegExp(`(${stems})(o|za|na)(?=[a-zčćžšđA-ZČĆŽŠĐ])`, "g"),
    "$1 $2 ",
  )
}

/** ALL-CAPS run glued to lowercase word: ODBIJAkao → ODBIJA kao */
function shouldSkipUpperLowerSplit(upper, lower, after) {
  if (upper === "BI" && lower.toLowerCase().startsWith("h")) return true
  if (/^(?:I{1,3}|IV|VI{0,3}|IX|XI{0,3}|XIV|XV|XIX|XX)$/i.test(upper)) return true
  if (upper === "KM" && /^\d/.test(after)) return true
  return false
}

export function splitUpperLowerBoundary(s) {
  const re = new RegExp(`([${UPPER_LAT}]{2,})(${LOWER_CLASS}{2,})`, "g")
  return s.replace(re, (match, upper, lower, offset, str) => {
    const after = str.slice(offset + match.length)
    if (shouldSkipUpperLowerSplit(upper, lower, after)) return match
    return `${upper} ${lower}`
  })
}

/** CAPS verb + SE: UTVRĐUJESE → UTVRĐUJE SE */
function splitCapsPassiveSe(s) {
  return s.replace(
    new RegExp(
      `([${UPPER_LAT}]{3,}(?:UJE|IJE|AVA|OJI|ODBIJA|PRIHVAĆA))SE(?![a-zčćžšđ])`,
      "g",
    ),
    "$1 SE",
  )
}

const GLUED_CONNECTIVES = ["na", "za", "od", "do", "sa", "i", "u"]

/** Connective glued between word shapes: BosneiHercegovine → Bosne i Hercegovine */
function splitGluedConnectives(s) {
  for (const conn of GLUED_CONNECTIVES) {
    const re = new RegExp(
      `(?<=[a-zčćžšđ]{3,})${conn}(?=[A-ZČĆŽŠĐ][a-zčćžšđ]{2,})`,
      "g",
    )
    s = s.replace(re, ` ${conn} `)
  }
  return s
}

function shouldSkipLowerUpperSplit(before, lower, upper, after) {
  const tail = after.slice(0, 12)
  const head = before.slice(-4)

  // UsI-928, Usi-14, UsII-…
  if (lower === "s" && upper === "I" && /U$/i.test(head) && /^[-/0-9]/i.test(tail)) {
    return true
  }
  if (lower === "s" && upper === "i" && /U$/i.test(head) && /^[-/]/i.test(tail)) {
    return true
  }

  // Roman numerals: ... klauzule III, stav II
  if (lower === "i" && upper === "I" && /^I[\s.IVXLCDM]/i.test(tail)) {
    return true
  }
  if (lower === "v" && upper === "I" && /^I[\s.IVXLCDM]/i.test(tail)) {
    return true
  }

  // Rev-129, Revr-…, Revd-… — don't split v+R, r+R inside register prefix
  if (upper === "R" && /(?:e|v)$/i.test(lower + head.slice(-1))) {
    const window = (head + lower + upper + tail).toLowerCase()
    if (/rev|revr|revd/.test(window)) return true
  }

  // Gž, Kž, Pž, Už — second letter is lowercase diacritic; only first char is upper
  // (no split triggered for ž after G since ž is lowercase)

  // Ordinals / units glued to Latin abbreviations: str. 67, čl. 121
  if (upper === "S" && lower === "r" && /^t[\s.]/i.test(tail)) return true

  return false
}

/**
 * Insert space at lowercase→uppercase boundaries (PDF extraction glue).
 * Guards against splitting court register codes and Roman numerals.
 */
export function splitLowerUpperBoundary(s) {
  const re = new RegExp(`(${LOWER_CLASS})(${UPPER_CLASS})`, "g")
  return s.replace(re, (match, low, up, offset, str) => {
    const before = str.slice(Math.max(0, offset - 4), offset)
    const after = str.slice(offset + 2)
    if (shouldSkipLowerUpperSplit(before, low, up, after)) {
      return match
    }
    return `${low} ${up}`
  })
}

export function repairLegalTextSpacing(text) {
  let s = text
  if (!s.trim()) return s

  s = collapseWhitespace(s)
  s = spaceAfterCommaLike(s)
  s = spaceAfterPeriodBeforeWord(s)
  s = s.replace(U_SINGLE_CAP, "u $1")

  for (const [from, to] of [...GLUE_PAIRS].sort((a, b) => b[0].length - a[0].length)) {
    if (s.includes(from)) {
      s = s.split(from).join(to)
    }
  }

  s = splitCapsPassiveSe(s)
  s = splitBiHLegalPrepositionO(s)
  s = splitCroatianPrepositionU(s)
  s = splitUpperLowerBoundary(s)
  s = splitGluedConnectives(s)
  s = splitLowerUpperBoundary(s)
  s = s.replace(U_SINGLE_CAP, "u $1")
  return collapseWhitespace(s)
}
