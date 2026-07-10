/**
 * Best-effort repair for Balkan court PDF extraction glues (missing spaces).
 * Curated substring replacements — avoids aggressive “split lowercase+uppercase” rules that harm real tokens.
 */

const GLUE_PAIRS: Array<[from: string, to: string]> = [
  // Longest-first for overlapping tails
  ["pravnosnažnim rešenjemonasleđivanju", "pravnosnažnim rešenjem o nasleđivanju"],
  ["SrbijeuBeogradu", "Srbije u Beogradu"],
  ["postupkausmislu", "postupka u smislu"],
  ["Odlučujućiopredloguza", "Odlučujući o predlogu za"],
  ["Odlučujućiopodignutom", "Odlučujući o podignutom"],
  ["Trgovačkog sudau", "Trgovačkog suda u"],
  ["Trgovački sudu", "Trgovački sud u"],
  ["presudioje", "presudio je"],
  ["riješioje", "riješio je"],
  ["Odbijase", "Odbija se"],
  ["Odbacujese", "Odbacuje se"],
  ["Ukidase", "Ukida se"],
  ["Prihvaćase", "Prihvaća se"],
  ["žalbakao", "žalba kao"],
  ["ipotvrđuje", "i potvrđuje"],
  ["prvostupanjskisud", "prvostupanjski sud"],
  ["proizlazidaje", "proizlazi da je"],
  ["utvrdioda", "utvrdio da"],
  ["utvrdiodaje", "utvrdio da je"],
  ["Sudje", "Sud je"],
  ["odbioje", "odbio je"],
  ["Odlučujućiopredlogu", "Odlučujući o predlogu"],
  ["Zakonaoparničnom", "Zakona o parničnom"],
  ["zakonaoparničnom", "zakona o parničnom"],
  ["Zakonaoizvršnom", "Zakona o izvršnom"],
  ["zakona izvršnom", "zakona o izvršnom"],
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
  ["Zakonaopostupku", "Zakona o postupku"],
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

function collapseWhitespace(s: string): string {
  return s.replace(/\s+/g, " ").trim()
}

/** Croatian preposition "u" glued before a place name: sudauZagrebu → suda u Zagrebu */
function splitCroatianPrepositionU(s: string): string {
  return s.replace(
    new RegExp(`(${LOWER_CLASS}{2,}?)u(${UPPER_CLASS}${LOWER_CLASS}+)`, "g"),
    "$1 u $2",
  )
}

/** BiH: legal noun + preposition glued (Zakonaopostupku → Zakona o postupku). */
function splitBiHLegalPrepositionO(s: string): string {
  const stems =
    "Zakona|Zakon|Odluke|Odluka|Uredbe|Uredba|Pravilnika|Pravilnik|rješenje|Rješenje|rešenje|prijedlog|Prijedlog|Poslovnika|Statuta|Direkcije|Direkcija"
  return s.replace(
    new RegExp(`(${stems})(o|za|na)(?=[a-zčćžšđA-ZČĆŽŠĐ])`, "g"),
    "$1 $2 ",
  )
}

function shouldSkipUpperLowerSplit(
  upper: string,
  lower: string,
  after: string,
): boolean {
  if (upper === "BI" && lower.toLowerCase().startsWith("h")) return true
  if (/^(?:I{1,3}|IV|VI{0,3}|IX|XI{0,3}|XIV|XV|XIX|XX)$/i.test(upper)) return true
  if (upper === "KM" && /^\d/.test(after)) return true
  return false
}

/** ALL-CAPS run glued to lowercase word: ODBIJAkao → ODBIJA kao */
export function splitUpperLowerBoundary(s: string): string {
  const re = new RegExp(`([${UPPER_LAT}]{2,})(${LOWER_CLASS}{2,})`, "g")
  return s.replace(re, (match, upper: string, lower: string, offset: number, str: string) => {
    const after = str.slice(offset + match.length)
    if (shouldSkipUpperLowerSplit(upper, lower, after)) return match
    return `${upper} ${lower}`
  })
}

/** CAPS verb + SE: UTVRĐUJESE → UTVRĐUJE SE */
function splitCapsPassiveSe(s: string): string {
  return s.replace(
    new RegExp(
      `([${UPPER_LAT}]{3,}(?:UJE|IJE|AVA|OJI|ODBIJA|PRIHVAĆA))SE(?![a-zčćžšđ])`,
      "g",
    ),
    "$1 SE",
  )
}

const GLUED_CONNECTIVES = ["na", "za", "od", "do", "sa", "i", "u"]

function splitGluedConnectives(s: string): string {
  let out = s
  for (const conn of GLUED_CONNECTIVES) {
    const re = new RegExp(
      `(?<=[a-zčćžšđ]{3,})${conn}(?=[A-ZČĆŽŠĐ][a-zčćžšđ]{2,})`,
      "g",
    )
    out = out.replace(re, ` ${conn} `)
  }
  return out
}

function shouldSkipLowerUpperSplit(
  before: string,
  lower: string,
  upper: string,
  after: string,
): boolean {
  const tail = after.slice(0, 12)
  const head = before.slice(-4)

  if (lower === "s" && upper === "I" && /U$/i.test(head) && /^[-/0-9]/i.test(tail)) {
    return true
  }
  if (lower === "s" && upper === "i" && /U$/i.test(head) && /^[-/]/i.test(tail)) {
    return true
  }

  if (lower === "i" && upper === "I" && /^I[\s.IVXLCDM]/i.test(tail)) {
    return true
  }
  if (lower === "v" && upper === "I" && /^I[\s.IVXLCDM]/i.test(tail)) {
    return true
  }

  if (upper === "R" && /(?:e|v)$/i.test(lower + head.slice(-1))) {
    const window = (head + lower + upper + tail).toLowerCase()
    if (/rev|revr|revd/.test(window)) return true
  }

  if (upper === "S" && lower === "r" && /^t[\s.]/i.test(tail)) return true

  return false
}

/** Insert space at lowercase→uppercase boundaries (PDF extraction glue). */
export function splitLowerUpperBoundary(s: string): string {
  const re = new RegExp(`(${LOWER_CLASS})(${UPPER_CLASS})`, "g")
  return s.replace(re, (match, low: string, up: string, offset: number, str: string) => {
    const before = str.slice(Math.max(0, offset - 4), offset)
    const after = str.slice(offset + 2)
    if (shouldSkipLowerUpperSplit(before, low, up, after)) {
      return match
    }
    return `${low} ${up}`
  })
}

/** Space before letter after `.` unless the dot ends a numeric token (dates, decimals). */
function spaceAfterPeriodBeforeWord(s: string): string {
  return s.replace(
    /(?<![\d\u0660-\u0669])(\.)(?=[A-Za-zČĆĐŠŽčćđšž])/g,
    "$1 ",
  )
}

/** Comma / semicolon / colon glued to following word */
function spaceAfterCommaLike(s: string): string {
  return s.replace(/([,;:])([^\s\d])/g, "$1 $2")
}

export function repairLegalTextSpacing(text: string): string {
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

export const COURT_POSITION_PREVIEW_MAX_CHARS = 4_200

/** Prefer API/search snippets shorter than full `court_position` on cards */
export const COURT_POSITION_CARD_COLLAPSED_MAX_CHARS = 1_600

/**
 * Leading chunk from PDF/embeddings often starts mid-clause without a capital letter.
 * If the opener looks like junk, trim to the next plausible sentence boundary in a short window.
 */
export function trimLeadingMidSentenceFragment(text: string, scanWindow = 560): string {
  const t = text.trim()
  if (!t) return t

  const firstCp = t.codePointAt(0)
  if (firstCp === undefined) return t
  const opener = String.fromCodePoint(firstCp)
  const startsSentence = /\p{L}/u.test(opener) && /\p{Lu}/u.test(opener)
  if (startsSentence) return t

  const windowSlice = t.slice(0, Math.min(scanWindow, t.length))

  /** After sentence end — next token looks like a real sentence opener */
  let cutAt = -1
  let m: RegExpExecArray | null
  const re = /[.?!]\s+/g
  while ((m = re.exec(windowSlice)) !== null) {
    const after = windowSlice.slice(m.index + m[0].length)
    const next = after.trimStart()
    if (next.length < 48) continue
    if (
      /^(["„"'\u201c\u201e\u00ab]+\s*)?\(?\s*\p{Lu}/u.test(next) ||
      /^\(?\s*Iz\s+/iu.test(next) ||
      /^\(?\s*Prema\b/iu.test(next)
    ) {
      cutAt = m.index + m[0].length
      break
    }
  }

  // Opening quote followed by substantive content
  let q = /^[„"\u201e\u201c\u00ab]+\s*[a-zćčđšžČĆĐŠŽ]?/u.exec(t)?.[0]?.length ?? 0
  if (q >= 120) q = 0

  if (cutAt > 28) {
    const rest = t.slice(cutAt).trimStart()
    return `${rest}`
  }

  if (q > 0 && t.slice(q).trim().length >= 72) {
    return t.slice(q).trimStart()
  }

  return t
}

export function truncateCourtPositionPreview(
  text: string,
  maxChars: number,
): { preview: string; isTruncated: boolean } {
  const t = text.trim()
  if (t.length <= maxChars) {
    return { preview: t, isTruncated: false }
  }

  const slice = t.slice(0, maxChars)
  const minKeep = Math.floor(maxChars * 0.52)

  const sentenceDot = slice.lastIndexOf(". ")
  if (sentenceDot >= minKeep) {
    return {
      preview: slice.slice(0, sentenceDot + 1).trimEnd() + "…",
      isTruncated: true,
    }
  }

  const dotQuote = slice.lastIndexOf(".\"")
  if (dotQuote >= minKeep) {
    return {
      preview: slice.slice(0, dotQuote + 2).trimEnd() + "…",
      isTruncated: true,
    }
  }

  const semi = slice.lastIndexOf("; ")
  if (semi >= minKeep) {
    return {
      preview: slice.slice(0, semi + 1).trimEnd() + "…",
      isTruncated: true,
    }
  }

  const lastSpace = slice.lastIndexOf(" ")
  if (lastSpace >= minKeep) {
    return {
      preview: slice.slice(0, lastSpace).trimEnd() + "…",
      isTruncated: true,
    }
  }

  return { preview: slice.trimEnd() + "…", isTruncated: true }
}
