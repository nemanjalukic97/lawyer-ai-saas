/**
 * Act type from a law title. Pure function of law_name_local.
 * The stored column is not read and is not filled.
 *
 * Same rule as the second dry run: first matching token among the first
 * four, a leading pure number skipped, longest stem, then the two
 * overrides (a promulgation of a statute, a collective agreement).
 */

export const ACT_TYPES = [
  "ustav",
  "zakon",
  "zakonik",
  "statut",
  "kolektivni_ugovor",
  "kodeks",
  "pravilnik",
  "uredba",
  "odluka",
  "odlok",
  "sklep",
  "uputstvo",
  "naredba",
  "pravila",
  "strateski",
  "nenormativno",
] as const

export type ActType = (typeof ACT_TYPES)[number]

export type ActTier = "statute" | "neutral" | "subordinate" | "non-normative"

const STATUTE = new Set<ActType>(["ustav", "zakon", "zakonik"])
const SUBORDINATE = new Set<ActType>([
  "pravilnik",
  "uredba",
  "odluka",
  "odlok",
  "sklep",
  "uputstvo",
  "naredba",
  "pravila",
])
const NON_NORMATIVE = new Set<ActType>(["strateski", "nenormativno"])

export function actTier(actType: ActType | null): ActTier {
  if (actType == null) return "neutral"
  if (STATUTE.has(actType)) return "statute"
  if (SUBORDINATE.has(actType)) return "subordinate"
  if (NON_NORMATIVE.has(actType)) return "non-normative"
  return "neutral"
}

const GLUE = new Set([
  "o",
  "a",
  "u",
  "e",
  "i",
  "om",
  "oj",
  "ao",
  "republike",
  "federacije",
  "bosne",
  "crne",
  "srbije",
  "brcko",
  "centralnog",
  "vlade",
  "poslovanja",
])

/**
 * Case endings are real inflections. The display splitter must not cut them.
 * Every other member of GLUE is a word the display splitter may separate.
 */
const CASE_ENDING = new Set(["a", "u", "e", "i", "om", "oj", "ao"])

/** Longest stem wins. Equal lengths keep this order. */
const STEMS: ReadonlyArray<readonly [string, ActType]> = [
  ["pravilnik", "pravilnik"],
  ["zakonik", "zakonik"],
  ["uputstv", "uputstvo"],
  ["poslovnik", "pravila"],
  ["strategij", "strateski"],
  ["zakljucak", "nenormativno"],
  ["program", "strateski"],
  ["naredb", "naredba"],
  ["pravila", "pravila"],
  ["pravilni", "pravilnik"],
  ["akcion", "strateski"],
  ["uredbu", "uredba"],
  ["uredba", "uredba"],
  ["odluke", "odluka"],
  ["odluka", "odluka"],
  ["odlok", "odlok"],
  ["sklep", "sklep"],
  ["statut", "statut"],
  ["kodeks", "kodeks"],
  ["resenj", "nenormativno"],
  ["rjesenj", "nenormativno"],
  ["deklaracij", "nenormativno"],
  ["rezolucij", "nenormativno"],
  ["smernic", "nenormativno"],
  ["sporazum", "nenormativno"],
  ["spisak", "nenormativno"],
  ["izvestaj", "nenormativno"],
  ["indeks", "nenormativno"],
  ["vodic", "nenormativno"],
  ["tarifa", "nenormativno"],
  ["liste", "nenormativno"],
  ["listu", "nenormativno"],
  ["lista", "nenormativno"],
  ["zakon", "zakon"],
  ["ustav", "ustav"],
]

const STEMS_LONGEST_FIRST = STEMS.map((entry, index) => ({ entry, index })).sort(
  (a, b) => b.entry[0].length - a.entry[0].length || a.index - b.index,
)

const CYRILLIC_LETTER = /[а-яђјљњћџ]/
const LOOKALIKE_FROM = "aeocpxykmthb"
const LOOKALIKE_TO = "аеосрхукмтнв"
const FOLD_FROM = "абвгдежзијклмнопрстћуфхцчшčćšž"
const FOLD_TO = "abvgdezzijklmnoprstcufhccsccsz"

const CONTINUATION =
  "[0-9a-zšđčćžа-яђјљњћџ]*"
const PREPOSITION = "[\u006F\u043E]"
const PROMULGATION_HEAD = new RegExp(
  `^(?:odluka|одлука|ukaz|указ) ${PREPOSITION} (?:proglašenj${CONTINUATION}|проглашењ${CONTINUATION}) `,
)
const PROMULGATED_STATUTE = new RegExp(
  `${PROMULGATION_HEAD.source}(?:zakon${CONTINUATION}|закон${CONTINUATION}|zakonik${CONTINUATION}|законик${CONTINUATION}|ustavnog zakon${CONTINUATION}|уставног закон${CONTINUATION})`,
)
const PROMULGATED_CONSTITUTIONAL_AMENDMENT = new RegExp(
  `${PROMULGATION_HEAD.source}(?:akta ${PREPOSITION} promeni ustava${CONTINUATION}|акта \u043E промени устава${CONTINUATION})`,
)
const COLLECTIVE_AGREEMENT =
  /kolektivn[0-9a-zšđčćž]* ugovor[0-9a-zšđčćž]*|колективн[0-9a-zа-яђјљњћџ]* уговор[0-9a-zа-яђјљњћџ]*/

function translateChars(value: string, from: string, to: string): string {
  const toChars = [...to]
  const map = new Map<string, string>()
  ;[...from].forEach((ch, index) => {
    map.set(ch, toChars[index] ?? "")
  })
  return [...value].map((ch) => (map.has(ch) ? map.get(ch)! : ch)).join("")
}

function foldPrefix(full: string, prefix: string): string {
  const looked = CYRILLIC_LETTER.test(full)
    ? translateChars(prefix, LOOKALIKE_FROM, LOOKALIKE_TO)
    : prefix
  const expanded = looked
    .replaceAll("ђ", "dj")
    .replaceAll("љ", "lj")
    .replaceAll("њ", "nj")
    .replaceAll("џ", "dz")
    .replaceAll("đ", "dj")
  return translateChars(expanded, FOLD_FROM, FOLD_TO)
}

function foldToken(token: string): string {
  return foldPrefix(token, token)
}

function matchStem(folded: string): ActType | null {
  if (/^[0-9]/.test(folded)) {
    const suffix = /[-_]([a-z]+)$/.exec(folded)?.[1]
    if (!suffix) return null
    const hit = STEMS.find(([stem]) => stem === suffix)
    return hit ? hit[1] : null
  }
  for (const { entry } of STEMS_LONGEST_FIRST) {
    const [stem, act] = entry
    if (!folded.startsWith(stem)) continue
    const rest = folded.slice(stem.length)
    if (rest.length === 0 || GLUE.has(rest)) return act
  }
  return null
}

function normalizeTitle(lawNameLocal: string): string {
  return lawNameLocal
    .replace(/^[\s"'„“«‚‘»]+/u, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
}

function windowOf<T>(tokens: readonly T[], firstIsPureNumber: boolean): readonly T[] {
  const start = firstIsPureNumber ? 1 : 0
  return tokens.slice(start, 4)
}

function tokenAct(norm: string): ActType | null {
  const tokens = norm
    .split(" ")
    .map((token) => token.replace(/[.,:;–—-]+$/u, ""))
    .filter(Boolean)
  const candidates = windowOf(tokens, /^[0-9]+$/.test(tokens[0] ?? ""))
  for (const token of candidates) {
    const act = matchStem(foldToken(token))
    if (act) return act
  }
  return null
}

export function classifyActType(lawNameLocal: string): {
  actType: ActType | null
  tier: ActTier
} {
  const norm = normalizeTitle(lawNameLocal)
  let actType = tokenAct(norm)
  if (PROMULGATED_STATUTE.test(norm)) {
    actType = "zakon"
  } else if (PROMULGATED_CONSTITUTIONAL_AMENDMENT.test(norm)) {
    actType = "ustav"
  } else if (
    COLLECTIVE_AGREEMENT.test(norm) &&
    actType !== "zakon" &&
    actType !== "zakonik" &&
    actType !== "ustav" &&
    actType !== "nenormativno"
  ) {
    actType = "kolektivni_ugovor"
  }
  return { actType, tier: actTier(actType) }
}

const DISPLAY_LEAD = /^[\s"'„“«‚‘»]+/u
const DISPLAY_TRAIL = /[.,:;–—-]+$/u

type DisplayToken = {
  core: string
  trail: string
  start: number
  end: number
}

function displayTokens(name: string): DisplayToken[] {
  const lead = name.match(DISPLAY_LEAD)?.[0].length ?? 0
  const tokens: DisplayToken[] = []
  const re = /\S+/g
  let match: RegExpExecArray | null
  const body = name.slice(lead)
  while ((match = re.exec(body))) {
    const raw = match[0]
    const core = raw.replace(DISPLAY_TRAIL, "")
    tokens.push({
      core,
      trail: raw.slice(core.length),
      start: lead + match.index,
      end: lead + match.index + raw.length,
    })
  }
  return tokens
}

function stemCut(core: string): number {
  if (!core) return -1
  const folded = foldToken(core.toLowerCase())
  if (/^[0-9]/.test(folded)) return -1
  for (const { entry } of STEMS_LONGEST_FIRST) {
    const [stem] = entry
    if (!folded.startsWith(stem)) continue
    const rest = folded.slice(stem.length)
    if (rest.length > 0 && !GLUE.has(rest)) continue
    if (rest.length === 0 || stem === "uputstv" || CASE_ENDING.has(rest)) return -1
    const fullLower = core.toLowerCase()
    const chars = [...core]
    for (let k = 0; k <= chars.length; k++) {
      const prefix = chars.slice(0, k).join("")
      const prefixFold = foldPrefix(fullLower, prefix.toLowerCase())
      if (prefixFold === stem) return prefix.length
      if (prefixFold.length > stem.length) return -1
    }
    return -1
  }
  return -1
}

/**
 * Display only. Inserts a space after an act-type stem when the remainder
 * is a word glue. Does not change classifyActType, and refuses the stem
 * `uputstv` so УПУТСТВО stays one word.
 */
export function insertActTypeSpaces(name: string): string {
  const tokens = displayTokens(name)
  const windowTokens = windowOf(tokens, /^[0-9]+$/.test(tokens[0]?.core ?? ""))
  const hits: Array<{ token: DisplayToken; cut: number }> = []
  for (const token of windowTokens) {
    const cut = stemCut(token.core)
    if (cut > 0) hits.push({ token, cut })
  }
  let out = name
  for (const hit of hits.sort((a, b) => b.token.start - a.token.start)) {
    const next = `${hit.token.core.slice(0, hit.cut)} ${hit.token.core.slice(hit.cut)}${hit.token.trail}`
    out = out.slice(0, hit.token.start) + next + out.slice(hit.token.end)
  }
  return out
}
