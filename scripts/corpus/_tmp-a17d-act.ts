/**
 * Act name the Serbia splitter would store on a banner row.
 * Genitive of the printed title, then the gazette as printed.
 * A heading before the unincorporated-text marker, or after a new
 * consolidation signature, stays null. No database access.
 */
import { foldDetectorLine } from "./_tmp-serbia-phase3"

export type Marker = { index: number; end: number; spelling: string }
export type ActHit = { index: number; end: number; value: string }

const GENITIVE: Array<[string, string]> = [
  ["Закон", "Закона"],
  ["Уредба", "Уредбе"],
  ["Правилник", "Правилника"],
  ["Устав", "Устава"],
  ["Законик", "Законика"],
  ["Споразум", "Споразума"],
  ["Протокол", "Протокола"],
  ["Одлука", "Одлуке"],
]

export function findMarkers(text: string): Marker[] {
  const hits: Marker[] = []
  const patterns = [
    /одредб\p{L}*(?:\s+\p{L}+){0,8}\s+нису\s+унет\p{L}*/giu,
    /нису\s+унет\p{L}*(?:\s+\p{L}+){0,12}\s+пречишћ\p{L}*/giu,
  ]
  for (const re of patterns) {
    for (const match of text.matchAll(re)) {
      const index = match.index ?? 0
      const end = index + (match[0]?.length ?? 0)
      const extra = text.slice(end, end + 90)
      const more = /^(?:\s+\p{L}+|\s*[„"“«'”"]+){0,8}\s*пречишћ\p{L}*(?:\s+текст\p{L}*)?/iu.exec(extra)
      const fullEnd = end + (more?.[0].length ?? 0)
      const spelling = text.slice(index, fullEnd).replace(/\s+/g, " ").trim().slice(0, 220)
      hits.push({ index, end: fullEnd, spelling })
    }
  }
  hits.sort((a, b) => a.index - b.index || b.spelling.length - a.spelling.length)
  const kept: Marker[] = []
  for (const hit of hits) {
    const prev = kept[kept.length - 1]
    if (prev && hit.index < prev.end) {
      if (hit.spelling.length > prev.spelling.length) prev.spelling = hit.spelling
      prev.end = Math.max(prev.end, hit.end)
      continue
    }
    kept.push({ ...hit })
  }
  return kept
}

function actValue(title: string, gazette: string): string {
  let name = title.replace(/\s+/g, " ").trim()
  for (const [nominative, genitive] of GENITIVE) {
    if (name.startsWith(`${nominative} `)) {
      name = genitive + name.slice(nominative.length)
      break
    }
  }
  return `${name}, ${gazette.replace(/\s+/g, " ").trim()}`
}

export function findActs(text: string): ActHit[] {
  const re = /(?:Закон|Уредба|Правилник|Устав|Законик|Споразум|Протокол|Одлука)\s+о\s[^:\n]{5,240}:\s*([„"“«']?\s*Службени\s+(?:гласник|лист)(?:\s+[^\s,:"”»'\n]+){0,8}\s*[„"“«'”"]?\s*,?\s*(?:бр\.|број)\s*[0-9][0-9/.\-–]*(?:\s*,\s*[0-9][0-9/.\-–]*)*(?:\s*\([^)\n]{0,40}\))?)/gu
  const hits: ActHit[] = []
  for (const match of text.matchAll(re)) {
    const title = (match[0] ?? "").split(":")[0]?.trim() ?? ""
    const gazette = (match[1] ?? "").replace(/\s+/g, " ").replace(/[,\s]+$/u, "").trim()
    if (!title || !gazette) continue
    const index = match.index ?? 0
    hits.push({ index, end: index + (match[0]?.length ?? 0), value: actValue(title, gazette) })
  }
  return hits
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function headingAfterGazette(window: string, headRe: RegExp): boolean {
  const gazette = /службен\p{L}*\s+(?:гласник|лист)/iu.exec(window)
  if (!gazette || gazette.index == null) return false
  return foldDetectorLine(window.slice(gazette.index)).search(headRe) >= 0
}

/** Starts of whole-document copies. Same test phase 9 used. */
export function findSignatures(text: string, law: string, firstArticle: string): number[] {
  const hay = text.toLocaleLowerCase("sr")
  const needle = law.toLocaleLowerCase("sr")
  if (!needle || hay.length !== text.length || needle.length !== law.length) return []
  const headRe = new RegExp(`(?<!\\p{L})Члан[ \\t]+${escapeRegExp(firstArticle)}(?![\\p{L}\\d])`, "u")
  let openGaz = -1
  let from = 0
  while (from <= hay.length - needle.length) {
    const at = hay.indexOf(needle, from)
    if (at < 0) break
    const next = text[at + needle.length] ?? ""
    if (next && /\p{L}/u.test(next)) {
      from = at + 1
      continue
    }
    const window = text.slice(at, Math.min(text.length, at + 2200))
    const gazette = /службен\p{L}*\s+(?:гласник|лист)/iu.exec(window)
    if (!gazette || gazette.index == null || foldDetectorLine(window.slice(gazette.index)).search(headRe) < 0) {
      from = at + needle.length
      continue
    }
    openGaz = at + gazette.index
    break
  }
  if (openGaz < 0) return []
  const key = text.slice(openGaz, Math.min(text.length, openGaz + 90))
  const hits: number[] = []
  from = 0
  while (from <= text.length - key.length) {
    const at = text.indexOf(key, from)
    if (at < 0) break
    if (foldDetectorLine(text.slice(at, Math.min(text.length, at + 900))).search(headRe) >= 0) hits.push(at)
    from = at + key.length
  }
  from = 0
  while (from <= hay.length - needle.length) {
    const at = hay.indexOf(needle, from)
    if (at < 0) break
    const next = text[at + needle.length] ?? ""
    if (!(next && /\p{L}/u.test(next))) {
      const window = text.slice(at, Math.min(text.length, at + 2200))
      const gazette = /службен\p{L}*\s+(?:гласник|лист)/iu.exec(window)
      if (gazette && gazette.index != null && headingAfterGazette(window, headRe)) {
        const gazetteAt = at + gazette.index
        const same = text.slice(gazetteAt, gazetteAt + Math.min(40, key.length)) === key.slice(0, Math.min(40, key.length))
        if (!same && !hits.some((hit) => Math.abs(hit - gazetteAt) < 1500)) hits.push(gazetteAt)
      }
    }
    from = at + (next && /\p{L}/u.test(next) ? 1 : needle.length)
  }
  hits.sort((a, b) => a - b)
  const deduped: number[] = []
  for (const hit of hits) {
    const prev = deduped[deduped.length - 1]
    if (prev == null || hit - prev > 1500) deduped.push(hit)
  }
  return deduped.map((gazetteAt) => {
    const start = Math.max(0, gazetteAt - 120)
    const rel = text.slice(start, gazetteAt + needle.length).toLocaleLowerCase("sr").lastIndexOf(needle)
    return rel >= 0 ? start + rel : gazetteAt
  })
}

export function amendingActAt(
  headingIndex: number,
  markers: Marker[],
  acts: ActHit[],
  signatures: number[],
): string | null {
  const signature = [...signatures].reverse().find((at) => at <= headingIndex) ?? -1
  const marker = [...markers].reverse().find((hit) => hit.end <= headingIndex && hit.index >= signature) ?? null
  if (!marker) return null
  const act = [...acts].reverse().find((hit) => hit.index >= marker.index && hit.end <= headingIndex) ?? null
  return act?.value ?? null
}
