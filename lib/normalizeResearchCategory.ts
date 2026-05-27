/**
 * Normalizes research/AI category filters. "all" and empty values mean no filter.
 */
export function normalizeResearchCategory(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed || trimmed === "all") return null
  return trimmed
}

/**
 * Normalizes a legal-area filter for case-law RPC (null = no filter).
 */
export function normalizeLegalAreaFilter(
  value: string | null | undefined,
): string | null {
  if (value == null) return null
  const trimmed = value.trim()
  if (!trimmed || trimmed === "all") return null
  return trimmed
}

/** When no category filter is set, infer legal areas from top statute hits. */
export function inferLegalAreasFromLawChunks(
  chunks: Array<{ law_category: string; similarity?: number }>,
  maxAreas = 3,
): string[] {
  const seen = new Set<string>()
  const areas: string[] = []
  const sorted = [...chunks].sort(
    (a, b) => (b.similarity ?? 0) - (a.similarity ?? 0),
  )
  for (const chunk of sorted) {
    const area = normalizeResearchCategory(chunk.law_category)
    if (area && !seen.has(area)) {
      seen.add(area)
      areas.push(area)
      if (areas.length >= maxAreas) break
    }
  }
  return areas
}
