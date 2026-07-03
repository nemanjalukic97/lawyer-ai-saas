/** Display / confidence tiers for statute and case-law retrieval (Serbia default). */
export const SIMILARITY_THRESHOLDS = {
  HIGH: 0.65,
  MEDIUM: 0.3,
  LOW_RETRY: 0.22,
} as const

/** Lower RPC retry floors for BiH and neighboring corpora — do not change without review. */
export const LOWER_THRESHOLD_JURISDICTIONS = new Set([
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
  "croatia",
  "montenegro",
  "slovenia",
])

export const LOWER_SIMILARITY_THRESHOLDS = {
  MEDIUM: 0.2,
  LOW_RETRY: 0.15,
} as const

export function getJurisdictionRpcThresholds(jurisdiction: string): {
  defaultThreshold: number
  lowRetry: number
} {
  if (LOWER_THRESHOLD_JURISDICTIONS.has(jurisdiction)) {
    return {
      defaultThreshold: LOWER_SIMILARITY_THRESHOLDS.MEDIUM,
      lowRetry: LOWER_SIMILARITY_THRESHOLDS.LOW_RETRY,
    }
  }
  return {
    defaultThreshold: SIMILARITY_THRESHOLDS.MEDIUM,
    lowRetry: SIMILARITY_THRESHOLDS.LOW_RETRY,
  }
}

/** UI tier boundary — always 0.30 regardless of jurisdiction-specific RPC floors. */
export function getHighlyRelevantThreshold(): number {
  return SIMILARITY_THRESHOLDS.MEDIUM
}

export function getJurisdictionLowFloor(jurisdiction: string): number {
  return getJurisdictionRpcThresholds(jurisdiction).lowRetry
}

export type ConfidenceTier = "high" | "low" | "below_floor"

export function classifySimilarityTier(
  similarity: number,
  jurisdiction: string,
): ConfidenceTier {
  if (similarity >= SIMILARITY_THRESHOLDS.MEDIUM) return "high"
  if (similarity >= getJurisdictionLowFloor(jurisdiction)) return "low"
  return "below_floor"
}

export function splitByRelevanceTier<T extends { similarity: number; jurisdiction: string }>(
  items: T[],
): { primary: T[]; lowConfidence: T[] } {
  const primary: T[] = []
  const lowConfidence: T[] = []
  for (const item of items) {
    const tier = classifySimilarityTier(item.similarity, item.jurisdiction)
    if (tier === "high") primary.push(item)
    else if (tier === "low") lowConfidence.push(item)
  }
  return { primary, lowConfidence }
}

/** Bulk-scraped rows store identical text and text_local (no English translation). */
export function isScrapedExcerpt(text: string, textLocal: string | null): boolean {
  const local = (textLocal ?? "").trim()
  const en = text.trim()
  if (!local || !en) return false
  return local === en
}
