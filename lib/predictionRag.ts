import { inferLegalAreaFromQuery } from "./queryAreaInference"
import { normalizeResearchCategory } from "./normalizeResearchCategory"
import { SIMILARITY_THRESHOLDS } from "./ragThresholds"
import {
  distillCaseInstitutes,
  extractPredictionKeyFacts,
} from "./distillCaseInstitutes"
import {
  formatContextBlock,
  retrieveLegalContext,
  type DistillLog,
  type LegalChunk,
  type RagFilterMode,
  type RagResult,
  type RagStageTiming,
} from "./legalRag"

/** Slot reservation: 8 narrative + 8 distilled. Equivalent to 6+10 on Ivana 47-52. */
export const PREDICTION_NARRATIVE_SLOTS = 8
export const PREDICTION_DISTILLED_SLOTS = 8
export const PREDICTION_YIELD = 16

function chunkKey(chunk: LegalChunk): string {
  return `${chunk.law_name}-${chunk.article_num}`
}

function tagChannel(
  chunk: LegalChunk,
  narrativeKeys: Set<string>,
  distilledKeys: Set<string>,
): LegalChunk {
  const key = chunkKey(chunk)
  const inNarrative = narrativeKeys.has(key)
  const inDistilled = distilledKeys.has(key)
  const retrievalChannel: LegalChunk["retrievalChannel"] =
    inNarrative && inDistilled
      ? "both"
      : inDistilled
        ? "distilled"
        : "narrative"
  return { ...chunk, retrievalChannel }
}

export function slotMergeLegalChunks(
  narrative: LegalChunk[],
  distilled: LegalChunk[],
  narrativeSlots = PREDICTION_NARRATIVE_SLOTS,
  distilledSlots = PREDICTION_DISTILLED_SLOTS,
  yieldLimit = PREDICTION_YIELD,
): LegalChunk[] {
  const narrativeKeys = new Set(narrative.map(chunkKey))
  const distilledKeys = new Set(distilled.map(chunkKey))
  const seen = new Set<string>()
  const out: LegalChunk[] = []

  const take = (items: LegalChunk[], n: number) => {
    for (const chunk of items.slice(0, n)) {
      const key = chunkKey(chunk)
      if (seen.has(key)) continue
      seen.add(key)
      out.push(tagChannel(chunk, narrativeKeys, distilledKeys))
      if (out.length >= yieldLimit) return
    }
  }

  take(distilled, distilledSlots)
  take(narrative, narrativeSlots)

  if (out.length < yieldLimit) {
    const rest = [...distilled, ...narrative].sort(
      (a, b) => b.similarity - a.similarity,
    )
    for (const chunk of rest) {
      const key = chunkKey(chunk)
      if (seen.has(key)) continue
      seen.add(key)
      out.push(tagChannel(chunk, narrativeKeys, distilledKeys))
      if (out.length >= yieldLimit) break
    }
  }

  return out
}

function withConfidence(chunks: LegalChunk[]): Pick<
  RagResult,
  "topSimilarity" | "hasStrongMatch" | "confidence"
> {
  const topSimilarity = chunks[0]?.similarity ?? 0
  const hasStrongMatch = topSimilarity >= SIMILARITY_THRESHOLDS.HIGH
  const confidence: RagResult["confidence"] =
    topSimilarity >= SIMILARITY_THRESHOLDS.HIGH
      ? "high"
      : topSimilarity >= SIMILARITY_THRESHOLDS.MEDIUM
        ? "medium"
        : "low"
  return { topSimilarity, hasStrongMatch, confidence }
}

function emptyTiming(totalMs: number): RagStageTiming {
  return {
    embedMs: 0,
    vectorRpcMs: 0,
    keywordMs: 0,
    keywordTimedOut: false,
    mergeRerankMs: 0,
    totalMs,
    vectorRetried: false,
  }
}

export async function retrievePredictionLegalContext(
  userPrompt: string,
  jurisdiction: string,
  options?: {
    category?: string
    categoryMode?: RagFilterMode
    k?: number
    similarityThreshold?: number
    forceDistillFail?: boolean
  },
): Promise<RagResult & { timing?: RagStageTiming }> {
  const wallStarted = Date.now()
  const k = options?.k ?? 8
  const category = normalizeResearchCategory(options?.category ?? null)
  const facts = extractPredictionKeyFacts(userPrompt)
  const caseType = category ?? "unknown"

  const [narrative, distillRaw] = await Promise.all([
    retrieveLegalContext(userPrompt, jurisdiction, {
      category: category ?? undefined,
      categoryMode: options?.categoryMode ?? "hint",
      k,
      similarityThreshold: options?.similarityThreshold,
    }),
    distillCaseInstitutes({
      facts,
      jurisdiction,
      caseType,
      forceFail: options?.forceDistillFail,
    }),
  ])

  const query0 = distillRaw.queries[0]?.trim() ?? ""
  const inferredArea =
    inferLegalAreaFromQuery(facts) ??
    (query0 ? inferLegalAreaFromQuery(query0) : null)

  const distill: DistillLog = {
    ...distillRaw,
    inferredArea,
  }

  const attachNarrative = (
    result: RagResult & { timing?: RagStageTiming },
    extra?: Partial<RagStageTiming>,
    skipped?: DistillLog,
  ): RagResult & { timing?: RagStageTiming } => {
    const chunks = result.chunks.map((c) => ({
      ...c,
      retrievalChannel: "narrative" as const,
    }))
    return {
      ...result,
      chunks,
      contextBlock: formatContextBlock(chunks),
      distill: skipped ?? distill,
      timing: {
        ...(result.timing ?? emptyTiming(Date.now() - wallStarted)),
        distillMs: distill.latencyMs,
        totalMs: Date.now() - wallStarted,
        ...extra,
      },
    }
  }

  if (distill.skippedReason) {
    return attachNarrative(narrative, undefined, distill)
  }

  if (!query0) {
    return attachNarrative(narrative, undefined, {
      ...distill,
      skippedReason: "empty",
    })
  }

  if (!inferredArea) {
    return attachNarrative(narrative, undefined, {
      ...distill,
      skippedReason: "no_area",
    })
  }

  const distilledStarted = Date.now()
  try {
    const distilled = await retrieveLegalContext(query0, jurisdiction, {
      category: inferredArea,
      categoryMode: "filter",
      k,
      similarityThreshold: options?.similarityThreshold,
    })
    const distilledRetrieveMs = Date.now() - distilledStarted
    const merged = slotMergeLegalChunks(narrative.chunks, distilled.chunks)
    const scored = withConfidence(merged)

    return {
      chunks: merged,
      contextBlock: formatContextBlock(merged),
      ...scored,
      areaInference: narrative.areaInference,
      distill,
      timing: {
        ...(narrative.timing ?? emptyTiming(Date.now() - wallStarted)),
        distillMs: distill.latencyMs,
        distilledRetrieveMs,
        totalMs: Date.now() - wallStarted,
      },
    }
  } catch {
    return attachNarrative(narrative, {
      distilledRetrieveMs: Date.now() - distilledStarted,
    }, {
      ...distill,
      skippedReason: "error",
    })
  }
}
