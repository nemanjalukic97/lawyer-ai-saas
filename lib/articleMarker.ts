/**
 * Whether `text` carries this row's own stored article number.
 * Used to choose rows for the excerpt flag. The prompt path does not call it.
 * A cross-reference to a different article is not a marker.
 */

const INTEGER_NUM = /^[0-9]{1,6}$/
const LETTER_SUFFIX_NUM =
  /^[0-9]{1,6}[A-Za-zА-Яа-яЂЈЉЊЋЏђјљњћџ]{1,3}$/u
const DOTTED_NUM = /^[0-9]{1,6}(?:\.[0-9A-Za-z]{1,4}){1,3}$/
const HEADING_WORDS = ["члан", "član", "članak", "člen"] as const
const ABBREV_RE = /(?<![\p{L}\p{N}])(?:čl|чл)\./giu
const AND_WORD = /^(?:i|и)(?![\p{L}\p{N}])/iu
const RANGE_WORD = /^(?:do|до)(?![\p{L}\p{N}])/iu
const MAX_RANGE = 40

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function carriesHeading(text: string, articleNum: string): boolean {
  if (INTEGER_NUM.test(articleNum) || LETTER_SUFFIX_NUM.test(articleNum)) {
    const number = escapeRegExp(articleNum)
    const boundary = INTEGER_NUM.test(articleNum) ? "(?![0-9])" : "(?![\\p{L}\\p{N}])"
    for (const word of HEADING_WORDS) {
      if (word === "člen" && !INTEGER_NUM.test(articleNum)) continue
      const pattern = new RegExp(`${word}\\s+${number}${boundary}`, "iu")
      if (pattern.test(text)) return true
    }
  }

  if (INTEGER_NUM.test(articleNum) || DOTTED_NUM.test(articleNum)) {
    const number = escapeRegExp(articleNum)
    const clen = new RegExp(
      `(?:^|[^0-9])${number}\\s*\\.\\s*člen(?![\\p{L}])`,
      "iu",
    )
    if (clen.test(text)) return true
  }

  if (DOTTED_NUM.test(articleNum)) {
    const number = escapeRegExp(articleNum)
    for (const word of ["члан", "član", "članak"] as const) {
      const pattern = new RegExp(
        `${word}\\s+${number}(?![\\p{L}\\p{N}])`,
        "iu",
      )
      if (pattern.test(text)) return true
    }
  }

  return false
}

function isDash(char: string): boolean {
  return /\p{Pd}/u.test(char)
}

function readDigits(text: string, index: number): { value: number; next: number } | null {
  const match = /^[0-9]{1,6}/.exec(text.slice(index))
  if (!match) return null
  return { value: Number(match[0]), next: index + match[0].length }
}

function skipSpace(text: string, index: number): number {
  while (index < text.length && /\s/u.test(text[index] ?? "")) index += 1
  return index
}

function addRange(found: Set<number>, start: number, end: number) {
  if (end < start) return
  if (end - start > MAX_RANGE) {
    found.add(start)
    found.add(end)
    return
  }
  for (let value = start; value <= end; value += 1) found.add(value)
}

/** Numbers named by one `Чл.` / `Čl.` list, including ranges such as `312-313`. */
function numbersAfterAbbreviation(text: string, start: number): Set<number> {
  const found = new Set<number>()
  let index = start
  while (index < text.length) {
    index = skipSpace(text, index)
    const head = readDigits(text, index)
    if (!head) break
    index = skipSpace(text, head.next)
    if (text[index] === "." && !/[0-9]/.test(text[index + 1] ?? "")) {
      index = skipSpace(text, index + 1)
    }
    if (isDash(text[index] ?? "")) {
      const tail = readDigits(text, skipSpace(text, index + 1))
      if (!tail) {
        found.add(head.value)
        break
      }
      addRange(found, head.value, tail.value)
      index = tail.next
      continue
    }
    const rest = text.slice(index)
    const rangeWord = RANGE_WORD.exec(rest)
    if (rangeWord) {
      const tail = readDigits(text, skipSpace(text, index + rangeWord[0].length))
      if (!tail) {
        found.add(head.value)
        break
      }
      addRange(found, head.value, tail.value)
      index = tail.next
      continue
    }
    found.add(head.value)
    const andWord = AND_WORD.exec(rest)
    if (andWord) {
      index += andWord[0].length
      continue
    }
    if (text[index] === ",") {
      index += 1
      continue
    }
    break
  }
  return found
}

function carriesOwnAbbreviation(text: string, articleNum: string): boolean {
  if (!INTEGER_NUM.test(articleNum)) return false
  const target = Number(articleNum)
  for (const match of text.matchAll(ABBREV_RE)) {
    const from = (match.index ?? 0) + match[0].length
    if (numbersAfterAbbreviation(text, from).has(target)) return true
  }
  return false
}

export function textCarriesArticleNumber(text: string, articleNum: string): boolean {
  const body = text ?? ""
  const num = (articleNum ?? "").trim()
  if (!body || !num) return false
  return carriesHeading(body, num) || carriesOwnAbbreviation(body, num)
}
