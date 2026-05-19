export type HighlightPart = string | { mark: string }

export const BALKAN_LETTER_CLASS = "a-zA-ZčćšžđČĆŠŽĐ"

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function parseSearchTokens(
  query: string,
  minLen = 3,
  maxTokens = 8,
): string[] {
  const trimmed = query.trim()
  if (!trimmed) return []

  return Array.from(
    new Set(
      trimmed
        .split(/\s+/g)
        .map((t) => t.trim())
        .filter((t) => t.length >= minLen)
        .slice(0, maxTokens),
    ),
  )
}

function splitByHighlightMatches(text: string, re: RegExp): HighlightPart[] {
  const parts: HighlightPart[] = []
  let lastIdx = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const start = m.index
    const end = start + (m[0]?.length ?? 0)
    if (start > lastIdx) parts.push(text.slice(lastIdx, start))
    parts.push({ mark: text.slice(start, end) })
    lastIdx = end
    if (re.lastIndex === start) re.lastIndex++
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx))
  return parts.length ? parts : [text]
}

function highlightWithPattern(text: string, query: string, pattern: string): HighlightPart[] {
  const trimmed = query.trim()
  if (!text || !trimmed) return [text]

  const tokens = parseSearchTokens(trimmed)
  if (tokens.length === 0) return [text]

  const re = new RegExp(pattern, "gi")
  return splitByHighlightMatches(text, re)
}

/** Substring match (law article excerpts). */
export function highlightSubstring(text: string, query: string): HighlightPart[] {
  const tokens = parseSearchTokens(query.trim())
  if (!text || tokens.length === 0) return [text]

  const pattern = `(${tokens.map(escapeRegExp).join("|")})`
  return highlightWithPattern(text, query, pattern)
}

/** Word-start match with optional inflection suffix (case law text). */
export function highlightCaseLawText(text: string, query: string): HighlightPart[] {
  const tokens = parseSearchTokens(query.trim())
  if (!text || tokens.length === 0) return [text]

  const boundary = `(?<![${BALKAN_LETTER_CLASS}])`
  const suffix = `[${BALKAN_LETTER_CLASS}]*`
  const pattern = `(${tokens
    .map((t) => `${boundary}${escapeRegExp(t)}${suffix}`)
    .join("|")})`
  return highlightWithPattern(text, query, pattern)
}
