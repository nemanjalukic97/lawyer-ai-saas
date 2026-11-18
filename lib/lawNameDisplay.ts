/**
 * Display form of a stored law_name_local.
 * The column is not read here and is not written.
 * Classification, scores, and identity keys stay on the stored string.
 */
import { insertActTypeSpaces } from "./actType"

/**
 * Exact stored titles. A mechanical rule for these was measured unsafe.
 * Each comment is the jurisdiction and the row count.
 */
const EXACT_TITLES: ReadonlyArray<readonly [string, string]> = [
  /** bih_fbih, 260. Welded preposition. */
  [
    "ZAKON BOSNE I HERCEGOVINEO IZVRŠENJU KRIVIČNIH SANKCIJA, PRITVORA I DRUGIH MJERA",
    "ZAKON BOSNE I HERCEGOVINE O IZVRŠENJU KRIVIČNIH SANKCIJA, PRITVORA I DRUGIH MJERA",
  ],
  /** montenegro, 201. Welded preposition. Digraphs are raised by the later rule. */
  [
    "OPŠTI ZAKON OOBRAZOVANjU I VASPITANjU",
    "OPŠTI ZAKON O OBRAZOVANjU I VASPITANjU",
  ],
  /** bih_rs, 72. Welded preposition. */
  ["ZAKON OPOREZU NA DOBIT", "ZAKON O POREZU NA DOBIT"],
  /** serbia, 3317. The final к of правилник is missing. */
  [
    "ПРАВИЛНИ о утврђивању водних тела површинских и подземних вода",
    "ПРАВИЛНИК о утврђивању водних тела површинских и подземних вода",
  ],
  /** montenegro, 155. Trailing asterisk. */
  [
    "ZAKON O OGRANIČAVANJU UPOTREBE DUVANSKIH PROIZVODA*",
    "ZAKON O OGRANIČAVANJU UPOTREBE DUVANSKIH PROIZVODA",
  ],
  /** montenegro, 91. Trailing asterisk. The digraph rule then raises Lj. */
  [
    "ZAKON O ZAŠTITI I ZDRAVLjU NA RADU*",
    "ZAKON O ZAŠTITI I ZDRAVLjU NA RADU",
  ],
  /** serbia, 14. Trailing asterisk. */
  [
    "ПРАВИЛНИК О МЕРАМА ЦАРИНСКОГ НАДЗОРА И О НАЧИНУ ВОЂЕЊА ЕВИДЕНЦИЈЕ У СЛОБОДНИМ И ЦАРИНСКИМ ЗОНАМА*",
    "ПРАВИЛНИК О МЕРАМА ЦАРИНСКОГ НАДЗОРА И О НАЧИНУ ВОЂЕЊА ЕВИДЕНЦИЈЕ У СЛОБОДНИМ И ЦАРИНСКИМ ЗОНАМА",
  ],
]

const EXACT = new Map(EXACT_TITLES)

const GAZETTE_RE =
  /\(\s*["„“”«»']?\s*(?:Sl\.\s*(?:list|novine|glasnik)|Služben[a-zšđčćž]*\s+(?:glasnik|list|novine)|Narodne\s+novine|Uradni\s+list|Сл\.\s*(?:гласник|лист|новине)|Службен[а-яђјљњћџ]*\s+(?:гласник|лист|новине))/iu

function raiseDigraphs(name: string): string {
  return name.replace(/\S+/g, (word) =>
    word
      .replace(/Nj(?=[A-ZŠĐČĆŽ])/g, "NJ")
      .replace(/Lj(?=[A-ZŠĐČĆŽ])/g, "LJ")
      .replace(/Dž(?=[A-ZŠĐČĆŽ])/g, "DŽ"),
  )
}

function cutGazette(name: string): string {
  let out = name
  for (let i = 0; i < 6; i++) {
    const match = GAZETTE_RE.exec(out)
    if (!match || match.index == null) break
    const start = match.index
    const close = out.indexOf(")", start)
    const end = close === -1 ? out.length : close + 1
    const after = out.slice(end).trim()
    out = (out.slice(0, start) + (after ? ` ${after}` : "")).replace(/\s+/g, " ").trim()
    out = out.replace(/[–—-]\s*$/u, "").trim()
  }
  return out
}

function holdParens(name: string, fn: (outside: string) => string): string {
  const held: string[] = []
  const masked = name.replace(/\([^)]*\)/g, (group) => {
    const id = held.push(group) - 1
    return `\u0000${id}\u0000`
  })
  const changed = fn(masked)
  return changed.replace(/\u0000(\d+)\u0000/g, (_all, id: string) => held[Number(id)] ?? "")
}

function stripBanner(name: string): string {
  let stripped = false
  const out = holdParens(name, (outside) => {
    let next = outside
    const prefixed = next.replace(/^Редакцијски пречишћен текст\s+/u, "")
    if (prefixed !== next && prefixed.trim()) {
      stripped = true
      next = prefixed
    }
    const unofficial = next.replace(/\s*[–—-]?\s*neslužbeni prečišćeni tekst/giu, "")
    if (unofficial !== next) {
      stripped = true
      next = unofficial
    }
    return next
  })
  if (!stripped) return name
  return out
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.;])/g, "$1")
    .trim()
}

/** Display title. Not the parent-match fold in legalActParentParse.ts. */
export function normaliseLawName(name: string): string {
  const listed = EXACT.get(name) ?? name
  return insertActTypeSpaces(raiseDigraphs(cutGazette(stripBanner(listed))))
}
