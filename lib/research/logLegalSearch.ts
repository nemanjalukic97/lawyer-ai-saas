import type { ServerSupabaseClient } from "@/lib/supabase/server"
import type { Json } from "@/lib/supabase/types"
import {
  isCuratedLegalChunk,
  type LegalChunk,
  type RagStageTiming,
} from "@/lib/legalRag"

export type LegalSearchLogMode = "research" | "hint"

export type LegalSearchKeywordTiming = {
  stage1_ms: number
  stage1_completed: boolean
  stage2_ms: number | null
  stage2_completed: boolean
  skipped_hint: boolean
}

type KeywordRun = {
  jurisdiction?: string | null
  timing?: RagStageTiming
  failed?: boolean
}

type TopChunk = LegalChunk

const HINT_SKIP = "keyword_skipped_hint"
const BUDGET_SKIP = "keyword_budget_exceeded"

/**
 * Completion matches scripts/_verify-legal-order-after.ts.
 * stage1 completes unless the phrase circuit breaker fired or the
 * keyword channel was skipped for hint mode.
 * stage2 completes unless it timed out, hit the budget, or was skipped.
 */
export function keywordTimingFromStage(
  timing: RagStageTiming | undefined,
  failed = false,
): LegalSearchKeywordTiming {
  if (failed || !timing) {
    return {
      stage1_ms: 0,
      stage1_completed: false,
      stage2_ms: null,
      stage2_completed: false,
      skipped_hint: false,
    }
  }

  const skip = timing.keywordSkipReason ?? null
  return {
    stage1_ms: timing.keywordStage1Ms ?? 0,
    stage1_completed:
      timing.keywordPhraseCircuitBreaker !== true && skip !== HINT_SKIP,
    stage2_ms: timing.keywordStage2Ms ?? null,
    stage2_completed:
      timing.keywordTimedOut !== true &&
      skip !== BUDGET_SKIP &&
      skip !== HINT_SKIP,
    skipped_hint: skip === HINT_SKIP,
  }
}

function aggregateKeyword(
  parts: LegalSearchKeywordTiming[],
): LegalSearchKeywordTiming {
  if (parts.length === 0) return keywordTimingFromStage(undefined, true)
  if (parts.length === 1) return parts[0]

  const stage2 = parts
    .map((part) => part.stage2_ms)
    .filter((ms): ms is number => ms != null)

  return {
    stage1_ms: Math.max(...parts.map((part) => part.stage1_ms)),
    stage1_completed: parts.every((part) => part.stage1_completed),
    stage2_ms: stage2.length > 0 ? Math.max(...stage2) : null,
    stage2_completed: parts.every((part) => part.stage2_completed),
    skipped_hint: parts.every((part) => part.skipped_hint),
  }
}

function compactTop(chunks: TopChunk[]) {
  return chunks.slice(0, 10).map((chunk, index) => ({
    rank: index + 1,
    id: chunk.id,
    law_name_local: chunk.law_name_local,
    article_num: chunk.article_num,
    curated: isCuratedLegalChunk(chunk),
    score: Math.round(chunk.similarity * 10000) / 10000,
  }))
}

function logInsertError(
  kind: "failed" | "threw",
  detail: Record<string, unknown>,
) {
  // eslint-disable-next-line no-console
  console.error(`[legal_search_logs] insert ${kind}`, detail)
}

/**
 * Awaited insert into legal_search_logs. Never throws.
 * Returns elapsed milliseconds, including a failed attempt.
 */
export async function logLegalSearch(args: {
  supabase: ServerSupabaseClient
  userId: string
  lawFirmId: string | null
  query: string
  jurisdictionFilter: string | null
  categoryFilter: string | null
  mode: LegalSearchLogMode
  chunks: TopChunk[]
  keywordRuns: KeywordRun[]
}): Promise<number> {
  const started = Date.now()
  try {
    const perRun = args.keywordRuns.map((run) =>
      keywordTimingFromStage(run.timing, run.failed === true),
    )
    const keyword = aggregateKeyword(perRun)
    const top = compactTop(args.chunks)
    const results: {
      count: number
      zero_results: boolean
      mode: LegalSearchLogMode
      keyword: LegalSearchKeywordTiming
      keyword_by_jurisdiction?: Array<
        LegalSearchKeywordTiming & { jurisdiction: string }
      >
      top: ReturnType<typeof compactTop>
    } = {
      count: args.chunks.length,
      zero_results: args.chunks.length === 0,
      mode: args.mode,
      keyword,
      top,
    }

    if (perRun.length > 1) {
      results.keyword_by_jurisdiction = perRun.map((timing, index) => ({
        jurisdiction: args.keywordRuns[index]?.jurisdiction ?? "",
        ...timing,
      }))
    }

    // This client's insert generic collapses to `never` (same cast as usage_stats).
    const { error } = await args.supabase.from("legal_search_logs").insert({
      user_id: args.userId,
      law_firm_id: args.lawFirmId,
      query: args.query,
      jurisdiction_filter: args.jurisdictionFilter,
      category_filter: args.categoryFilter,
      mode: args.mode,
      results: results as Json,
    } as never)

    const ms = Date.now() - started
    if (error) {
      logInsertError("failed", {
        ms,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
    }
    return ms
  } catch (err) {
    const ms = Date.now() - started
    logInsertError("threw", {
      ms,
      message: err instanceof Error ? err.message : String(err),
    })
    return ms
  }
}
