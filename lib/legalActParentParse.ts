/**
 * Pure parse of an enabling clause. No database, no ranking.
 *
 * Formula in the first 300 characters: На основу / Na osnovu / Na temelju /
 * Na podlagi. Latin H (U+0048) followed by "a osnovu" counts as На основу,
 * because Cyrillic Н was stored as that letter.
 *
 * The parent is each "Закона о …" / "Zakona o …" between the formula and the
 * enacting verb (доноси, donosi, propisuje, izdaje, proglašava, and the same
 * stems), or within 450 characters when no verb is present. The name stops at
 * a parenthesis, quote, comma, semicolon, or newline. At most four cites.
 *
 * A corpus match is exact equality after this normalisation, in the same
 * jurisdiction: lowercase; Cyrillic to Latin with љ→lj, њ→nj, џ→dž, ђ→đ and
 * the remaining letters one-to-one onto Latin with č ć š ž; punctuation to
 * spaces; collapsed whitespace. Two corpus names that share a key do not match.
 */

const INVISIBLE = /[\u00AD\u200B\u200C\u200D\uFEFF]/g

const FOLD_ONE: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", ђ: "d", е: "e", ж: "z", з: "z",
  и: "i", ј: "j", к: "k", л: "l", љ: "l", м: "m", н: "n", њ: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", ћ: "c", у: "u", ф: "f", х: "h", ц: "c",
  ч: "c", џ: "d", ш: "s",
}

const DIGRAPH: Array<[string, string]> = [
  ["џ", "dž"], ["љ", "lj"], ["њ", "nj"], ["ђ", "đ"],
  ["а", "a"], ["б", "b"], ["в", "v"], ["г", "g"], ["д", "d"],
  ["е", "e"], ["ж", "ž"], ["з", "z"], ["и", "i"], ["ј", "j"],
  ["к", "k"], ["л", "l"], ["м", "m"], ["н", "n"], ["о", "o"],
  ["п", "p"], ["р", "r"], ["с", "s"], ["т", "t"], ["ћ", "ć"],
  ["у", "u"], ["ф", "f"], ["х", "h"], ["ц", "c"], ["ч", "č"], ["ш", "š"],
]

const FORMULA = /na osnovu|ha osnovu|na temelju|na podlagi/g
const PARENT = /zakona\s+o/gi
const ENACT =
  /\b(donosi|donosim|propisujem|propisuje|izdaje|izdaja|sprejme|sprejema|doloca|predpisuje|utvrduje|utvrdjuje|proglasavam|proglasava)\b/

const PUNCT = /[`'’‘‚„“”"«»()[\]{}.,:;!?/\\–—\-_*/+|]+/g

export type ParsedParent = {
  ordinal: number
  parentNameParsed: string
}

function stripInvis(value: string): string {
  return value.replace(INVISIBLE, "")
}

function fold1(value: string): string {
  const lower = stripInvis(value).toLowerCase()
  let out = ""
  for (const ch of lower) out += FOLD_ONE[ch] ?? ch
  return out
}

export function normaliseLawName(value: string): string {
  let text = stripInvis(value).toLowerCase()
  for (const [from, to] of DIGRAPH) text = text.split(from).join(to)
  text = text.replace(PUNCT, " ")
  return text.replace(/\s+/g, " ").trim()
}

function hasCyrillic(value: string): boolean {
  return /[а-яђјљњћџ]/i.test(value)
}

function extractName(after: string): string {
  const match = after.match(/^[\s\S]{0,180}?(?=\(|\[|„|“|”|"|«|»|\n|,|;|$)/)
  return (match ? match[0] : "").replace(/\s+/g, " ").trim()
}

export function parseEnablingParents(opening: string): ParsedParent[] {
  const raw = stripInvis(opening)
  const folded = fold1(raw)
  const open = folded.slice(0, 300)
  FORMULA.lastIndex = 0
  const formula = FORMULA.exec(open)
  if (!formula) return []

  const from = formula.index
  const enactAt = folded.slice(from, from + 900).search(ENACT)
  const cut = enactAt >= 0 ? enactAt : 450
  const spanRaw = raw.slice(from, from + cut)
  const spanFolded = folded.slice(from, from + cut)

  const parents: ParsedParent[] = []
  PARENT.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = PARENT.exec(spanFolded))) {
    const name = extractName(spanRaw.slice(match.index + match[0].length))
    if (name.length < 2) continue
    const prefix = hasCyrillic(name) ? "Закон о " : "Zakon o "
    parents.push({
      ordinal: parents.length + 1,
      parentNameParsed: prefix + name,
    })
    if (parents.length >= 4) break
  }
  return parents
}

export function matchParentLawName(
  parentNameParsed: string,
  lawsInJurisdiction: ReadonlyMap<string, readonly string[]>,
): string | null {
  const hits = lawsInJurisdiction.get(normaliseLawName(parentNameParsed))
  if (!hits || hits.length !== 1) return null
  return hits[0] ?? null
}
