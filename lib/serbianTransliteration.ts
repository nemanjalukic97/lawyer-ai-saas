/**
 * Serbian Latin ↔ Cyrillic (Gaj's alphabet). Deterministic 1:1 digraph mapping.
 * Used for keyword matching when user queries in one script and corpus uses the other.
 */

const DIGRAPHS_LATIN_TO_CYRILLIC: [string, string][] = [
  ["Dž", "Џ"],
  ["DŽ", "Џ"],
  ["dž", "џ"],
  ["Lj", "Љ"],
  ["LJ", "Љ"],
  ["lj", "љ"],
  ["Nj", "Њ"],
  ["NJ", "Њ"],
  ["nj", "њ"],
  ["Đ", "Ђ"],
  ["đ", "ђ"],
  ["Ž", "Ж"],
  ["ž", "ж"],
  ["Č", "Ч"],
  ["č", "ч"],
  ["Ć", "Ћ"],
  ["ć", "ћ"],
  ["Š", "Ш"],
  ["š", "ш"],
]

const SINGLE_LATIN_TO_CYRILLIC: Record<string, string> = {
  A: "А",
  a: "а",
  B: "Б",
  b: "б",
  V: "В",
  v: "в",
  G: "Г",
  g: "г",
  D: "Д",
  d: "д",
  E: "Е",
  e: "е",
  Z: "З",
  z: "з",
  I: "И",
  i: "и",
  J: "Ј",
  j: "ј",
  K: "К",
  k: "к",
  L: "Л",
  l: "л",
  M: "М",
  m: "м",
  N: "Н",
  n: "н",
  O: "О",
  o: "о",
  P: "П",
  p: "п",
  R: "Р",
  r: "р",
  S: "С",
  s: "с",
  T: "Т",
  t: "т",
  U: "У",
  u: "у",
  F: "Ф",
  f: "ф",
  H: "Х",
  h: "х",
  C: "Ц",
  c: "ц",
}

const CYRILLIC_TO_LATIN_ENTRIES: [string, string][] = [
  ["Џ", "Dž"],
  ["џ", "dž"],
  ["Љ", "Lj"],
  ["љ", "lj"],
  ["Њ", "Nj"],
  ["њ", "nj"],
  ["Ђ", "Đ"],
  ["ђ", "đ"],
  ["Ж", "Ž"],
  ["ж", "ž"],
  ["Ч", "Č"],
  ["ч", "č"],
  ["Ћ", "Ć"],
  ["ћ", "ć"],
  ["Ш", "Š"],
  ["ш", "š"],
  ["А", "A"],
  ["а", "a"],
  ["Б", "B"],
  ["б", "b"],
  ["В", "V"],
  ["в", "v"],
  ["Г", "G"],
  ["г", "g"],
  ["Д", "D"],
  ["д", "d"],
  ["Е", "E"],
  ["е", "e"],
  ["З", "Z"],
  ["з", "z"],
  ["И", "I"],
  ["и", "i"],
  ["Ј", "J"],
  ["ј", "j"],
  ["К", "K"],
  ["к", "k"],
  ["Л", "L"],
  ["л", "l"],
  ["М", "M"],
  ["м", "m"],
  ["Н", "N"],
  ["н", "n"],
  ["О", "O"],
  ["о", "o"],
  ["П", "P"],
  ["п", "p"],
  ["Р", "R"],
  ["р", "r"],
  ["С", "S"],
  ["с", "s"],
  ["Т", "T"],
  ["т", "t"],
  ["У", "U"],
  ["у", "u"],
  ["Ф", "F"],
  ["ф", "f"],
  ["Х", "H"],
  ["х", "h"],
  ["Ц", "C"],
  ["ц", "c"],
]

function replaceByEntries(input: string, entries: [string, string][]): string {
  let out = input
  for (const [from, to] of entries) {
    out = out.split(from).join(to)
  }
  return out
}

export function latinToCyrillic(text: string): string {
  let out = text
  for (const [from, to] of DIGRAPHS_LATIN_TO_CYRILLIC) {
    out = out.split(from).join(to)
  }
  return [...out].map((ch) => SINGLE_LATIN_TO_CYRILLIC[ch] ?? ch).join("")
}

export function cyrillicToLatin(text: string): string {
  return replaceByEntries(text, CYRILLIC_TO_LATIN_ENTRIES)
}

export function getScriptVariants(text: string): string[] {
  const trimmed = text.trim().replace(/\s+/g, " ")
  if (!trimmed) return []
  const latin = cyrillicToLatin(trimmed)
  const cyrillic = latinToCyrillic(trimmed)
  return [...new Set([trimmed, latin, cyrillic])]
}

export function escapeIlikePattern(value: string): string {
  return value.replace(/[%_\\]/g, (ch) => `\\${ch}`)
}
