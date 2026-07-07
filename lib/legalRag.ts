import OpenAI from "openai"
import {
  normalizeLegalAreaFilter,
  normalizeResearchCategory,
} from "./normalizeResearchCategory"
import {
  getJurisdictionRpcThresholds,
  LOWER_THRESHOLD_JURISDICTIONS,
  LOWER_SIMILARITY_THRESHOLDS,
  SIMILARITY_THRESHOLDS,
} from "./ragThresholds"
import {
  buildKeywordIlikePatterns,
  scoreKeywordPatternMatch,
} from "./keywordVariants"
import {
  areasCompatibleWithInference,
  inferLegalAreaFromQuery,
} from "./queryAreaInference"
import { supabaseAdmin } from "./supabase/admin"

export {
  getJurisdictionRpcThresholds,
  LOWER_THRESHOLD_JURISDICTIONS,
  LOWER_SIMILARITY_THRESHOLDS,
  SIMILARITY_THRESHOLDS,
} from "./ragThresholds"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export type MatchChannel =
  | "vector"
  | "keyword_exact"
  | "keyword_stem"
  | "both"

export type LegalChunk = {
  id: string
  jurisdiction: string
  law_name: string
  law_name_local: string
  law_category: string
  article_num: string
  paragraph_num: string | null
  text: string
  text_local: string | null
  source_url: string | null
  similarity: number
  matchChannel?: MatchChannel
}

export type CitationValidation = {
  valid: boolean
  citedArticles: string[]
  invalidCitations: string[]
  missingCitations: string[]
}

export type RagResult = {
  chunks: LegalChunk[]
  contextBlock: string
  hasStrongMatch: boolean
  topSimilarity: number
  confidence: "high" | "medium" | "low"
  areaInference?: AreaInferenceLog
}

export type CaseLawChunk = {
  id: string
  jurisdiction: string
  court: string
  court_level: string
  case_number: string
  decision_date: string | null
  legal_area: string
  legal_question: string
  court_position: string
  reasoning: string
  headnote: string | null
  outcome: string | null
  keywords: string[] | null
  related_articles: string[] | null
  source_url: string | null
  similarity: number
  matchChannel?: MatchChannel
}

export type CaseLawContextResult = {
  cases: CaseLawChunk[]
  confidence: "high" | "medium" | "low" | "none"
  topSimilarity: number
  areaInference?: AreaInferenceLog
}

export type AnswerMode = "extracted" | "analytical" | "auto" | "drafting"


const RPC_TIMEOUT_MS = 30000
/** Match Postgres statement_timeout in match_legal_articles (120s) on large corpora. */
const LEGAL_RPC_TIMEOUT_UNFILTERED_MS = 120000
const CASE_LAW_RPC_TIMEOUT_MS = 12000
/** Unfiltered vector search on large corpora (e.g. bih_rs) can exceed 12s. */
const CASE_LAW_RPC_TIMEOUT_UNFILTERED_MS = 60000

const LARGE_CORPUS_JURISDICTIONS = new Set([
  "bih_rs",
  "bih_fbih",
  "bih_brcko",
  "serbia",
  "croatia",
  "montenegro",
  "slovenia",
])

function getLegalRpcTimeoutMs(
  category: string | null,
  jurisdiction: string,
): number {
  if (category) return RPC_TIMEOUT_MS
  if (LARGE_CORPUS_JURISDICTIONS.has(jurisdiction)) {
    return LEGAL_RPC_TIMEOUT_UNFILTERED_MS
  }
  return RPC_TIMEOUT_MS
}

function getCaseLawRpcTimeoutMs(
  legalArea: string | null,
  jurisdiction: string,
): number {
  if (legalArea) return CASE_LAW_RPC_TIMEOUT_MS
  if (LARGE_CORPUS_JURISDICTIONS.has(jurisdiction)) {
    return CASE_LAW_RPC_TIMEOUT_UNFILTERED_MS
  }
  return CASE_LAW_RPC_TIMEOUT_MS
}

const MAX_CONTEXT_CHARS = 12000

async function embedQueryText(text: string): Promise<number[]> {
  try {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })

    const embedding = res.data?.[0]?.embedding
    if (!embedding) throw new Error("missing embedding")
    return embedding
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new Error(`Embedding failed: ${reason}`)
  }
}

async function runMatchLegalArticlesRpc(args: {
  embedding: number[]
  jurisdiction: string
  category: string | null
  matchCount: number
  similarityThreshold: number
  timeoutMs?: number
}): Promise<LegalChunk[]> {
  const rpcArgs: Record<string, unknown> = {
    query_embedding: args.embedding,
    filter_jurisdiction: args.jurisdiction,
    match_count: args.matchCount,
    similarity_threshold: args.similarityThreshold,
  }
  const category = normalizeResearchCategory(args.category)
  if (category) {
    rpcArgs.filter_category = category
  }

  const rpcCall = supabaseAdmin.rpc("match_legal_articles", rpcArgs)

  const timeoutMs =
    args.timeoutMs ?? getLegalRpcTimeoutMs(category, args.jurisdiction)

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`RAG RPC timeout after ${timeoutMs}ms`)),
      timeoutMs,
    ),
  )

  const { data, error } = (await Promise.race([
    rpcCall,
    timeoutPromise,
  ])) as { data: LegalChunk[] | null; error: { message: string } | null }

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as LegalChunk[]
}

function scoreKeywordTextMatch(
  haystack: string,
  patterns: ReturnType<typeof buildKeywordIlikePatterns>,
): { score: number; matchChannel: "keyword_exact" | "keyword_stem" } | null {
  return scoreKeywordPatternMatch(haystack, patterns)
}

function buildKeywordOrFilter(
  patterns: ReturnType<typeof buildKeywordIlikePatterns>,
  field: string,
): string {
  const allPatterns = [...patterns.exactPatterns, ...patterns.stemPatterns]
  return allPatterns.map((p) => `${field}.ilike.${p}`).join(",")
}

function rowToLegalChunk(
  row: Record<string, unknown>,
  similarity: number,
  matchChannel: MatchChannel,
): LegalChunk {
  return {
    id: String(row.id ?? ""),
    jurisdiction: String(row.jurisdiction ?? ""),
    law_name: String(row.law_name ?? ""),
    law_name_local: String(row.law_name_local ?? ""),
    law_category: String(row.law_category ?? ""),
    article_num: String(row.article_num ?? ""),
    paragraph_num:
      row.paragraph_num == null || row.paragraph_num === ""
        ? null
        : String(row.paragraph_num),
    text: String(row.text ?? ""),
    text_local:
      row.text_local == null || row.text_local === ""
        ? null
        : String(row.text_local),
    source_url:
      row.source_url == null || row.source_url === ""
        ? null
        : String(row.source_url),
    similarity,
    matchChannel,
  }
}

const KEYWORD_SEARCH_TIMEOUT_MS = 8000

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  label: string,
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`${label} timeout after ${timeoutMs}ms`)),
      timeoutMs,
    ),
  )
  return Promise.race([promise, timeoutPromise])
}

async function searchLegalArticlesByKeyword(args: {
  query: string
  jurisdiction: string
  category: string | null
  matchCount: number
}): Promise<LegalChunk[]> {
  return withTimeout(
    searchLegalArticlesByKeywordInner(args),
    KEYWORD_SEARCH_TIMEOUT_MS,
    "keyword legal search",
  ).catch((err) => {
    const message = err instanceof Error ? err.message : String(err)
    // eslint-disable-next-line no-console
    console.error("[RAG] keyword legal search skipped", {
      jurisdiction: args.jurisdiction,
      message,
    })
    return []
  })
}

async function searchLegalArticlesByKeywordInner(args: {
  query: string
  jurisdiction: string
  category: string | null
  matchCount: number
}): Promise<LegalChunk[]> {
  const query = args.query.trim()
  if (query.length < 2) return []

  const patterns = buildKeywordIlikePatterns(query)
  if (
    patterns.exactPatterns.length === 0 &&
    patterns.stemPatterns.length === 0
  ) {
    return []
  }

  const category = normalizeResearchCategory(args.category)
  const orFilter = buildKeywordOrFilter(patterns, "text_local")

  let request = supabaseAdmin
    .from("legal_articles")
    .select(
      "id, jurisdiction, law_name, law_name_local, law_category, article_num, paragraph_num, text, text_local, source_url",
    )
    .eq("jurisdiction", args.jurisdiction)
    .or(orFilter)
    .limit(Math.min(args.matchCount * 3, 30))

  if (category) {
    request = request.eq("law_category", category)
  } else if (/otkaz|radu|zaposlen|radni|otpremn|ugovor o radu/i.test(query)) {
    request = request.eq("law_category", "labor")
  }

  const { data, error } = await request
  if (error) {
    throw new Error(error.message)
  }

  const scored = (data ?? [])
    .map((row) => {
      const r = row as Record<string, unknown>
      const textLocal = String(r.text_local ?? r.text ?? "")
      const match = scoreKeywordTextMatch(textLocal, patterns)
      if (!match) return null
      return rowToLegalChunk(r, match.score, match.matchChannel)
    })
    .filter((c): c is LegalChunk => c != null)
    .sort((a, b) => b.similarity - a.similarity)

  return scored.slice(0, args.matchCount)
}

function mergeHybridLegalChunks(
  vectorChunks: LegalChunk[],
  keywordChunks: LegalChunk[],
): LegalChunk[] {
  const byId = new Map<string, LegalChunk>()

  for (const chunk of vectorChunks) {
    byId.set(chunk.id, { ...chunk, matchChannel: "vector" })
  }

  for (const chunk of keywordChunks) {
    const existing = byId.get(chunk.id)
    if (!existing) {
      byId.set(chunk.id, { ...chunk })
      continue
    }
    byId.set(chunk.id, {
      ...existing,
      similarity: Math.max(existing.similarity, chunk.similarity),
      matchChannel: "both",
    })
  }

  return Array.from(byId.values()).sort((a, b) => b.similarity - a.similarity)
}

function summarizeMatchChannels(chunks: Array<{ matchChannel?: MatchChannel }>) {
  const counts = {
    vector: 0,
    keyword_exact: 0,
    keyword_stem: 0,
    both: 0,
  }
  for (const chunk of chunks) {
    const ch = chunk.matchChannel ?? "vector"
    if (ch in counts) {
      counts[ch as keyof typeof counts] += 1
    }
  }
  return counts
}

export function summarizeMatchChannelsForLog(
  chunks: Array<{ matchChannel?: MatchChannel; id: string; similarity: number }>,
) {
  return {
    channels: summarizeMatchChannels(chunks),
    top: chunks.slice(0, 8).map((c) => ({
      id: c.id,
      similarity: Math.round(c.similarity * 1000) / 1000,
      matchChannel: c.matchChannel ?? "vector",
    })),
  }
}

const AREA_MATCH_BOOST = 0.05
const MAX_RERANK_SCORE = 0.99
const KEYWORD_MISMATCH_MULTIPLIER = 0.75
const KEYWORD_BOOST_SCORES = new Set([0.9, 0.95])

export type AreaInferenceLog = {
  inferredArea: string | null
  applied: boolean
  skippedReason?: "explicit_filter" | "no_signal"
  results: Array<{
    id: string
    area: string
    areaMatch: boolean
    scoreBefore: number
    scoreAfter: number
    matchChannel?: MatchChannel
  }>
}

function isKeywordBoostedResult(
  score: number,
  channel?: MatchChannel,
): boolean {
  if (channel === "keyword_exact" || channel === "keyword_stem") return true
  if (channel === "both") return KEYWORD_BOOST_SCORES.has(score)
  return false
}

function applyAreaAwareReranking<T extends {
  id: string
  similarity: number
  matchChannel?: MatchChannel
}>(
  items: T[],
  getArea: (item: T) => string,
  query: string,
  userFilterActive: boolean,
): { items: T[]; log: AreaInferenceLog } {
  if (userFilterActive) {
    return {
      items,
      log: {
        inferredArea: null,
        applied: false,
        skippedReason: "explicit_filter",
        results: [],
      },
    }
  }

  const inferredArea = inferLegalAreaFromQuery(query)
  if (!inferredArea) {
    return {
      items,
      log: {
        inferredArea: null,
        applied: false,
        skippedReason: "no_signal",
        results: [],
      },
    }
  }

  const results: AreaInferenceLog["results"] = []
  const reranked = items.map((item) => {
    const area = getArea(item).trim().toLowerCase()
    const areaMatch = areasCompatibleWithInference(inferredArea, area)
    const scoreBefore = item.similarity
    let scoreAfter = scoreBefore

    if (areaMatch) {
      scoreAfter = Math.min(MAX_RERANK_SCORE, scoreBefore + AREA_MATCH_BOOST)
    } else if (isKeywordBoostedResult(scoreBefore, item.matchChannel)) {
      scoreAfter = scoreBefore * KEYWORD_MISMATCH_MULTIPLIER
    }

    results.push({
      id: item.id,
      area,
      areaMatch,
      scoreBefore,
      scoreAfter,
      matchChannel: item.matchChannel,
    })

    return { ...item, similarity: scoreAfter }
  })

  reranked.sort((a, b) => b.similarity - a.similarity)

  return {
    items: reranked,
    log: {
      inferredArea,
      applied: true,
      results,
    },
  }
}

export function summarizeAreaInferenceForLog(
  log: AreaInferenceLog | undefined | null,
) {
  if (!log) return undefined
  return {
    inferredArea: log.inferredArea,
    applied: log.applied,
    skippedReason: log.skippedReason,
    top: log.results.slice(0, 8).map((r) => ({
      id: r.id,
      area: r.area,
      areaMatch: r.areaMatch,
      scoreBefore: Math.round(r.scoreBefore * 1000) / 1000,
      scoreAfter: Math.round(r.scoreAfter * 1000) / 1000,
      matchChannel: r.matchChannel ?? "vector",
    })),
  }
}

async function searchCaseLawByKeyword(args: {
  query: string
  jurisdiction: string
  legalArea: string | null
  matchCount: number
}): Promise<CaseLawChunk[]> {
  return withTimeout(
    searchCaseLawByKeywordInner(args),
    KEYWORD_SEARCH_TIMEOUT_MS,
    "keyword case law search",
  ).catch((err) => {
    const message = err instanceof Error ? err.message : String(err)
    // eslint-disable-next-line no-console
    console.error("[RAG] keyword case law search skipped", {
      jurisdiction: args.jurisdiction,
      message,
    })
    return []
  })
}

async function searchCaseLawByKeywordInner(args: {
  query: string
  jurisdiction: string
  legalArea: string | null
  matchCount: number
}): Promise<CaseLawChunk[]> {
  const query = args.query.trim()
  if (query.length < 2) return []

  const patterns = buildKeywordIlikePatterns(query)
  if (
    patterns.exactPatterns.length === 0 &&
    patterns.stemPatterns.length === 0
  ) {
    return []
  }

  const legalArea = normalizeLegalAreaFilter(args.legalArea)
  const fields = [
    "legal_question",
    "court_position",
    "reasoning",
    "headnote",
  ] as const
  const orParts: string[] = []
  for (const field of fields) {
    orParts.push(buildKeywordOrFilter(patterns, field))
  }

  let request = supabaseAdmin
    .from("case_law")
    .select(
      "id, jurisdiction, court, court_level, case_number, decision_date, legal_area, legal_question, court_position, reasoning, headnote, outcome, keywords, related_articles, source_url",
    )
    .eq("jurisdiction", args.jurisdiction)
    .or(orParts.join(","))
    .limit(Math.max(args.matchCount * 3, 15))

  if (legalArea) {
    request = request.eq("legal_area", legalArea)
  }

  const { data, error } = await request
  if (error) {
    throw new Error(error.message)
  }

  const scored = (data ?? [])
    .map((raw) => {
      const r = raw as Record<string, unknown>
      const combined = [
        r.legal_question,
        r.court_position,
        r.reasoning,
        r.headnote,
      ]
        .map((v) => String(v ?? ""))
        .join("\n")
      const match = scoreKeywordTextMatch(combined, patterns)
      if (!match) return null
      const chunk = normalizeCaseLawChunks([raw])[0]
      return { ...chunk, similarity: match.score, matchChannel: match.matchChannel }
    })
    .filter((c): c is CaseLawChunk => c != null)
    .sort((a, b) => b.similarity - a.similarity)

  return scored.slice(0, args.matchCount)
}

function mergeHybridCaseChunks(
  vectorCases: CaseLawChunk[],
  keywordCases: CaseLawChunk[],
): CaseLawChunk[] {
  const byId = new Map<string, CaseLawChunk>()

  for (const item of vectorCases) {
    byId.set(item.id, { ...item, matchChannel: "vector" })
  }

  for (const item of keywordCases) {
    const existing = byId.get(item.id)
    if (!existing) {
      byId.set(item.id, { ...item })
      continue
    }
    byId.set(item.id, {
      ...existing,
      similarity: Math.max(existing.similarity, item.similarity),
      matchChannel: "both",
    })
  }

  return Array.from(byId.values()).sort((a, b) => b.similarity - a.similarity)
}

async function runMatchCaseLawRpc(args: {
  embedding: number[]
  jurisdiction: string
  legalArea: string | null
  courtLevel: string | null
  matchCount: number
  similarityThreshold: number
  timeoutMs?: number
}): Promise<CaseLawChunk[]> {
  const rpcArgs: Record<string, unknown> = {
    query_embedding: args.embedding,
    filter_jurisdiction: args.jurisdiction,
    match_count: args.matchCount,
    similarity_threshold: args.similarityThreshold,
  }
  const legalArea = normalizeLegalAreaFilter(args.legalArea)
  if (legalArea) {
    rpcArgs.filter_legal_area = legalArea
  }
  if (args.courtLevel != null && args.courtLevel !== "") {
    rpcArgs.filter_court_level = args.courtLevel
  }

  const rpcCall = supabaseAdmin.rpc("match_case_law", rpcArgs)

  const timeoutMs =
    args.timeoutMs ?? getCaseLawRpcTimeoutMs(legalArea, args.jurisdiction)

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () =>
        reject(new Error(`RAG case law RPC timeout after ${timeoutMs}ms`)),
      timeoutMs,
    ),
  )

  const { data, error } = (await Promise.race([
    rpcCall,
    timeoutPromise,
  ])) as {
    data: CaseLawChunk[] | null
    error: { message: string } | null
  }

  if (error) {
    throw new Error(error.message)
  }

  return normalizeCaseLawChunks(data ?? [])
}

function asStringArray(v: unknown): string[] | null {
  if (v == null) return null
  if (Array.isArray(v)) return v.map((x) => String(x))
  return null
}

function normalizeCaseLawChunks(rows: unknown[]): CaseLawChunk[] {
  return rows.map((raw) => {
    const r = raw as Record<string, unknown>
    return {
      id: String(r.id ?? ""),
      jurisdiction: String(r.jurisdiction ?? ""),
      court: String(r.court ?? ""),
      court_level: String(r.court_level ?? ""),
      case_number: String(r.case_number ?? ""),
      decision_date:
        r.decision_date == null || r.decision_date === ""
          ? null
          : String(r.decision_date),
      legal_area: String(r.legal_area ?? ""),
      legal_question: String(r.legal_question ?? ""),
      court_position: String(r.court_position ?? ""),
      reasoning: String(r.reasoning ?? ""),
      headnote:
        r.headnote == null || r.headnote === ""
          ? null
          : String(r.headnote),
      outcome:
        r.outcome == null || r.outcome === ""
          ? null
          : String(r.outcome),
      keywords: asStringArray(r.keywords),
      related_articles: asStringArray(r.related_articles),
      source_url:
        r.source_url == null || r.source_url === ""
          ? null
          : String(r.source_url),
      similarity:
        typeof r.similarity === "number"
          ? r.similarity
          : Number(r.similarity ?? 0),
    }
  })
}

function deduplicateCaseChunks(chunks: CaseLawChunk[]): CaseLawChunk[] {
  const map = new Map<string, CaseLawChunk>()
  for (const chunk of chunks) {
    const key = `${chunk.jurisdiction}|${chunk.court}|${chunk.case_number}`
    const existing = map.get(key)
    if (!existing || chunk.similarity > existing.similarity) {
      map.set(key, chunk)
    }
  }
  return Array.from(map.values()).sort((a, b) => b.similarity - a.similarity)
}

async function matchCaseLawWithEmbedding(args: {
  embedding: number[]
  query?: string
  jurisdiction: string
  legalArea?: string | null
  courtLevel?: string | null
  matchCount?: number
  similarityThreshold?: number
  retryIfEmpty?: boolean
  rpcTimeoutMs?: number
}): Promise<{
  cases: CaseLawChunk[]
  usedThreshold: number
  retried: boolean
  areaInference: AreaInferenceLog
}> {
  const thresholds = getJurisdictionRpcThresholds(args.jurisdiction)

  const initialThreshold =
    args.similarityThreshold ?? thresholds.defaultThreshold
  const shouldRetry =
    args.retryIfEmpty !== false && initialThreshold > thresholds.lowRetry

  let usedThreshold = initialThreshold
  let retried = false

  const normalizedLegalArea = normalizeLegalAreaFilter(args.legalArea ?? null)
  const rpcTimeoutMs =
    args.rpcTimeoutMs ??
    getCaseLawRpcTimeoutMs(normalizedLegalArea, args.jurisdiction)
  const matchCount = args.matchCount ?? 6

  const keywordPromise =
    args.query && args.query.trim().length >= 2
      ? searchCaseLawByKeyword({
          query: args.query,
          jurisdiction: args.jurisdiction,
          legalArea: normalizedLegalArea,
          matchCount,
        })
      : Promise.resolve([] as CaseLawChunk[])

  let data = await runMatchCaseLawRpc({
    embedding: args.embedding,
    jurisdiction: args.jurisdiction,
    legalArea: normalizedLegalArea,
    courtLevel: args.courtLevel ?? null,
    matchCount: args.matchCount ?? 6,
    similarityThreshold: initialThreshold,
    timeoutMs: rpcTimeoutMs,
  })

  if (data.length === 0 && shouldRetry) {
    // eslint-disable-next-line no-console
    console.log(
      `[RAG case law] no results at threshold ${initialThreshold}, retrying with ${thresholds.lowRetry}`,
    )
    retried = true
    usedThreshold = thresholds.lowRetry
    data = await runMatchCaseLawRpc({
      embedding: args.embedding,
      jurisdiction: args.jurisdiction,
      legalArea: normalizedLegalArea,
      courtLevel: args.courtLevel ?? null,
      matchCount: args.matchCount ?? 6,
      similarityThreshold: thresholds.lowRetry,
      timeoutMs: rpcTimeoutMs,
    })
  }

  const keywordCases = await keywordPromise
  const merged = mergeHybridCaseChunks(data, keywordCases)
  const { items: reranked, log: areaInference } = applyAreaAwareReranking(
    merged,
    (c) => c.legal_area,
    args.query?.trim() ?? "",
    normalizedLegalArea != null,
  )

  return { cases: reranked, usedThreshold, retried, areaInference }
}

async function matchCaseLaw(args: {
  query: string
  jurisdiction: string
  legalArea?: string | null
  courtLevel?: string | null
  matchCount?: number
  similarityThreshold?: number
  retryIfEmpty?: boolean
  rpcTimeoutMs?: number
}): Promise<{
  cases: CaseLawChunk[]
  usedThreshold: number
  retried: boolean
  areaInference: AreaInferenceLog
}> {
  const embedding = await embedQueryText(args.query)
  return matchCaseLawWithEmbedding({
    embedding,
    query: args.query,
    jurisdiction: args.jurisdiction,
    legalArea: args.legalArea,
    courtLevel: args.courtLevel,
    matchCount: args.matchCount,
    similarityThreshold: args.similarityThreshold,
    retryIfEmpty: args.retryIfEmpty,
    rpcTimeoutMs: args.rpcTimeoutMs,
  })
}

function buildCaseLawContextResult(
  rawCases: CaseLawChunk[],
  jurisdiction: string,
): CaseLawContextResult {
  const cases = deduplicateCaseChunks(rawCases)
  const topSimilarity = cases[0]?.similarity ?? 0
  const { lowRetry } = getJurisdictionRpcThresholds(jurisdiction)

  let confidence: CaseLawContextResult["confidence"]
  if (cases.length === 0 || topSimilarity < lowRetry) {
    confidence = "none"
  } else if (topSimilarity >= SIMILARITY_THRESHOLDS.HIGH) {
    confidence = "high"
  } else if (topSimilarity >= SIMILARITY_THRESHOLDS.MEDIUM) {
    confidence = "medium"
  } else {
    confidence = "low"
  }

  return { cases, confidence, topSimilarity }
}

export async function retrieveCaseLawContextsBatch(
  query: string,
  jurisdictions: string[],
  options?: {
    legalArea?: string | null
    courtLevel?: string | null
    k?: number
  },
): Promise<CaseLawContextResult[]> {
  if (jurisdictions.length === 0) return []

  const embedding = await embedQueryText(query)

  return Promise.all(
    jurisdictions.map(async (jurisdiction) => {
      try {
        const thresholds = getJurisdictionRpcThresholds(jurisdiction)
        const similarityThreshold = LOWER_THRESHOLD_JURISDICTIONS.has(jurisdiction)
          ? thresholds.defaultThreshold
          : undefined

        const { cases: rawCases } = await matchCaseLawWithEmbedding({
          embedding,
          query,
          jurisdiction,
          legalArea: normalizeLegalAreaFilter(options?.legalArea ?? null),
          courtLevel:
            options?.courtLevel != null && options.courtLevel !== ""
              ? options.courtLevel
              : null,
          matchCount: options?.k ?? 6,
          similarityThreshold,
          retryIfEmpty: true,
        })

        const result = buildCaseLawContextResult(rawCases, jurisdiction)
        // eslint-disable-next-line no-console
        console.error("[RAG case law] batch jurisdiction ok", {
          jurisdiction,
          cases: result.cases.length,
          confidence: result.confidence,
        })
        return result
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        const stack = err instanceof Error ? err.stack : undefined
        // eslint-disable-next-line no-console
        console.error("[RAG case law] jurisdiction search failed", {
          jurisdiction,
          message,
          stack,
        })
        return {
          cases: [],
          confidence: "none" as const,
          topSimilarity: 0,
        }
      }
    }),
  )
}

export async function matchLegalArticles(args: {
  query: string
  jurisdiction: string
  category?: string | null
  matchCount?: number
  similarityThreshold?: number
  retryIfEmpty?: boolean
  rpcTimeoutMs?: number
}): Promise<{
  chunks: LegalChunk[]
  usedThreshold: number
  retried: boolean
  areaInference: AreaInferenceLog
}> {
  const normalizedCategory = normalizeResearchCategory(args.category ?? null)
  const matchCount = args.matchCount ?? 6

  const keywordPromise = searchLegalArticlesByKeyword({
    query: args.query,
    jurisdiction: args.jurisdiction,
    category: normalizedCategory,
    matchCount,
  })

  const embedding = await embedQueryText(args.query)
  const thresholds = getJurisdictionRpcThresholds(args.jurisdiction)

  const initialThreshold =
    args.similarityThreshold ?? thresholds.defaultThreshold
  const shouldRetry =
    args.retryIfEmpty !== false && initialThreshold > thresholds.lowRetry

  let usedThreshold = initialThreshold
  let retried = false

  const rpcTimeoutMs =
    args.rpcTimeoutMs ??
    getLegalRpcTimeoutMs(normalizedCategory, args.jurisdiction)

  let data = await runMatchLegalArticlesRpc({
    embedding,
    jurisdiction: args.jurisdiction,
    category: args.category ?? null,
    matchCount,
    similarityThreshold: initialThreshold,
    timeoutMs: rpcTimeoutMs,
  })

  if (data.length === 0 && shouldRetry) {
    // eslint-disable-next-line no-console
    console.log(
      `[RAG] no results at threshold ${initialThreshold}, retrying with ${thresholds.lowRetry}`,
    )
    retried = true
    usedThreshold = thresholds.lowRetry
    data = await runMatchLegalArticlesRpc({
      embedding,
      jurisdiction: args.jurisdiction,
      category: args.category ?? null,
      matchCount,
      similarityThreshold: thresholds.lowRetry,
      timeoutMs: rpcTimeoutMs,
    })
  }

  const keywordChunks = await keywordPromise
  const merged = mergeHybridLegalChunks(data, keywordChunks)
  const { items: reranked, log: areaInference } = applyAreaAwareReranking(
    merged,
    (c) => c.law_category,
    args.query,
    normalizedCategory != null,
  )

  return { chunks: reranked, usedThreshold, retried, areaInference }
}

function deduplicateChunks(chunks: LegalChunk[]): LegalChunk[] {
  const map = new Map<string, LegalChunk>()

  for (const chunk of chunks) {
    const key = `${chunk.law_name}-${chunk.article_num}`
    const existing = map.get(key)
    if (!existing || chunk.similarity > existing.similarity) {
      map.set(key, chunk)
    }
  }

  return Array.from(map.values()).sort((a, b) => b.similarity - a.similarity)
}

function truncateContextBlock(text: string): string {
  if (text.length > MAX_CONTEXT_CHARS) {
    return (
      text.slice(0, MAX_CONTEXT_CHARS) +
      "\n\n[Context truncated to fit token limits. \n    Additional provisions may exist in the database.]"
    )
  }
  return text
}

function joinLegalChunksRaw(chunks: LegalChunk[]): string {
  const formattedChunks = chunks.map((chunk) => {
    const paragraphSuffix = chunk.paragraph_num ? " §" + chunk.paragraph_num : ""
    return `[LAW: ${chunk.law_name_local} | ARTICLE: ${chunk.article_num}${paragraphSuffix}]\n${chunk.text}`
  })
  return formattedChunks.join("\n\n---\n\n")
}

export function formatLegalChunksBody(chunks: LegalChunk[]): string {
  return truncateContextBlock(joinLegalChunksRaw(chunks))
}

export function formatContextBlock(chunks: LegalChunk[]): string {
  const jurisdiction = (chunks[0]?.jurisdiction ?? "").toUpperCase()
  const body = joinLegalChunksRaw(chunks)
  return truncateContextBlock(
    `LEGAL PROVISIONS (${jurisdiction}):\n\n${body}`,
  )
}

export function extractArticleReferences(text: string): string[] {
  const matches: string[] = []
  for (const match of text.matchAll(
    /\b(?:Član|Člen|Čl\.|Art\.|Article|Artikkel)\s+(\d+)/gi,
  )) {
    const value = (match[1] ?? "").trim()
    if (value) matches.push(value)
  }

  return Array.from(new Set(matches)).sort((a, b) => a.localeCompare(b))
}

function normalizeArticleNumber(raw: string): string {
  const trimmed = raw.trim().toLowerCase()
  const normalized = trimmed.replace(/^0+(\d)/, "$1")
  return normalized === "" ? trimmed : normalized
}

export function validateCitations(
  aiResponse: string,
  chunks: LegalChunk[],
  mode?: string,
): CitationValidation {
  if (mode === "drafting") {
    return {
      valid: true,
      citedArticles: [],
      invalidCitations: [],
      missingCitations: [],
    }
  }
  if (chunks.length === 0) {
    return {
      valid: true,
      citedArticles: [],
      invalidCitations: [],
      missingCitations: [],
    }
  }

  const citedArticles = extractArticleReferences(aiResponse).filter((cited) => {
    const n = Number.parseInt(cited, 10)
    if (!Number.isFinite(n) || n < 1 || n > 9) return true

    const re = new RegExp(
      String.raw`\b(?:Član|Člen|Article)\b[\s\S]{0,20}\b${n}\b`,
      "i",
    )
    return re.test(aiResponse)
  })

  const validArticleNumbers = new Set<string>()
  for (const chunk of chunks) {
    validArticleNumbers.add(normalizeArticleNumber(chunk.article_num))
  }

  const normalizedCited = citedArticles.map((c) => normalizeArticleNumber(c))

  const invalidCitations = citedArticles.filter(
    (_cited, idx) => !validArticleNumbers.has(normalizedCited[idx] ?? ""),
  )

  const aiLower = aiResponse.toLowerCase()
  const missingCitations = chunks
    .map((c) => c.article_num)
    .filter((articleNum) => !aiLower.includes(articleNum.toLowerCase()))

  const valid = citedArticles.length > 0 && invalidCitations.length === 0

  return {
    valid,
    citedArticles,
    invalidCitations,
    missingCitations,
  }
}

export async function retrieveLegalContext(
  query: string,
  jurisdiction: string,
  options?: {
    category?: string
    k?: number
    similarityThreshold?: number
  },
): Promise<RagResult> {
  const thresholds = getJurisdictionRpcThresholds(jurisdiction)
  const similarityThreshold =
    options?.similarityThreshold ??
    (LOWER_THRESHOLD_JURISDICTIONS.has(jurisdiction)
      ? thresholds.defaultThreshold
      : undefined)

  const { chunks: rawChunks, areaInference } = await matchLegalArticles({
    query,
    jurisdiction,
    category: normalizeResearchCategory(options?.category ?? null),
    matchCount: options?.k ?? 6,
    similarityThreshold,
    retryIfEmpty: true,
  })

  const chunks = deduplicateChunks(rawChunks)

  const topSimilarity = chunks[0]?.similarity ?? 0
  const hasStrongMatch = topSimilarity >= SIMILARITY_THRESHOLDS.HIGH

  const confidence: RagResult["confidence"] =
    topSimilarity >= SIMILARITY_THRESHOLDS.HIGH
      ? "high"
      : topSimilarity >= SIMILARITY_THRESHOLDS.MEDIUM
      ? "medium"
      : "low"

  const contextBlock = formatContextBlock(chunks)

  return {
    chunks,
    contextBlock,
    hasStrongMatch,
    topSimilarity,
    confidence,
    areaInference,
  }
}

export async function retrieveCaseLawContext(
  query: string,
  jurisdiction: string,
  options?: {
    legalArea?: string
    courtLevel?: string
    k?: number
    similarityThreshold?: number
    rpcTimeoutMs?: number
  },
): Promise<CaseLawContextResult> {
  const thresholds = getJurisdictionRpcThresholds(jurisdiction)
  const similarityThreshold =
    options?.similarityThreshold ??
    (LOWER_THRESHOLD_JURISDICTIONS.has(jurisdiction)
      ? thresholds.defaultThreshold
      : undefined)

  const normalizedLegalArea = normalizeLegalAreaFilter(options?.legalArea ?? null)

  const { cases: rawCases, areaInference } = await matchCaseLaw({
    query,
    jurisdiction,
    legalArea: normalizedLegalArea,
    courtLevel: options?.courtLevel ?? null,
    matchCount: options?.k ?? 6,
    similarityThreshold,
    retryIfEmpty: true,
    rpcTimeoutMs:
      options?.rpcTimeoutMs ??
      getCaseLawRpcTimeoutMs(normalizedLegalArea, jurisdiction),
  })

  const result = buildCaseLawContextResult(rawCases, jurisdiction)
  return { ...result, areaInference }
}

function formatCaseLawSummaryLines(cases: CaseLawChunk[]): string {
  if (cases.length === 0) {
    return "(No matching court decisions were retrieved for this query.)"
  }
  return cases
    .map((c) => {
      const date = c.decision_date ?? "—"
      const head = c.headnote ?? "—"
      return `${c.court} | ${c.case_number} | ${date} | ${c.court_position} | ${head}`
    })
    .join("\n")
}

export function buildCombinedRagPrompt(
  basePrompt: string,
  ragResult: RagResult,
  caseLawResult: CaseLawContextResult,
  jurisdiction: string,
  outputLanguage: string,
  answerMode: AnswerMode = "auto",
): string {
  const legislationBody =
    ragResult.chunks.length > 0
      ? formatLegalChunksBody(ragResult.chunks)
      : "(No matching statutory provisions were retrieved for this query.)"

  const caseBody = formatCaseLawSummaryLines(caseLawResult.cases)

  const instructionLead =
    "[INSTRUCTIONS]\n" +
    "Base your answer on both the legislation above AND the court decisions.\n" +
    "When citing case law, always mention the court name and case number.\n\n"

  return (
    basePrompt +
    `\n\n"""\n\n[RELEVANT LEGISLATION]\n\n${legislationBody}\n\n[COURT DECISIONS — CASE LAW]\n\n${caseBody}\n\n` +
    instructionLead +
    buildMandatoryRulesSuffix(
      ragResult,
      jurisdiction,
      outputLanguage,
      answerMode,
      "combined",
    )
  )
}

type MandatoryRuleScope = "statutes_only" | "combined"

function buildMandatoryRulesSuffix(
  ragResult: RagResult,
  jurisdiction: string,
  outputLanguage: string,
  answerMode: AnswerMode,
  ruleScope: MandatoryRuleScope,
): string {
  const confidenceWarning =
    ragResult.confidence === "high"
      ? ""
      : ragResult.confidence === "medium"
      ? "⚠️ CONFIDENCE: MEDIUM — The retrieved provisions \nmay not directly address this specific question.\nOnly cite articles that are genuinely relevant to \nthe legal question asked. If an article is about \na completely different topic (e.g. administrative \nlaw, criminal law, trade secrets) and the question \nis about contract validity, do NOT cite it.\nState clearly which aspects are and are not covered \nby the retrieved provisions."
      : "⚠️ CONFIDENCE: LOW — The retrieved provisions have weak relevance \n   to this query. Do NOT provide a definitive legal conclusion. State \n   explicitly that the directly applicable provision may not be in \n   the database yet."

  const extractedBlock = `=== ANSWER FORMAT (EXTRACTED MODE) ===

CRITICAL — MANDATORY CITATION FORMAT:
Every sentence that states a legal fact or legal 
rule MUST end with a citation in this exact format:
(Član X, Law Name Local) — for Serbian/Bosnian/Croatian
(Člen X, Law Name Local) — for Slovenian

EXAMPLES OF CORRECT RESPONSES:
✓ 'Ugovor o prodaji mora biti zaključen u pisanoj 
   formi (Član 26, Zakon o obligacionim odnosima).'
✓ 'Kupac je dužan da plati cenu u roku određenom 
   ugovorom (Član 488, Zakon o obligacionim odnosima).'
✓ 'Predmet ugovora mora biti u prometu (Član 458, 
   Zakon o obligacionim odnosima).'

EXAMPLES OF WRONG RESPONSES (NO CITATION = INVALID):
✗ 'Ugovor o prodaji mora biti zaključen u pisanoj formi.'
✗ 'Ne postoji zakonski zahtev za notarsku overu.'
✗ 'Tužilac ima pravo na naknadu štete.'

If you cannot find a retrieved article that supports 
a legal claim, DO NOT make that claim.
Every legal sentence needs its own citation.
General statements without citations are forbidden.
IMPORTANT: Every single legal claim in EVERY section must 
include a citation in this format: (Član X, Law Name)
If you cannot cite a retrieved article for a claim, 
do not make that claim.

RULE 5 — RELEVANCE CHECK:
Before citing any article, verify it is actually 
relevant to the specific legal question asked.
Do NOT cite an article just because it was retrieved.
Only cite articles whose content directly answers 
the question.
If no retrieved article is directly relevant to a 
specific claim, do not make that claim.

STEP 1 — IDENTIFY:
State which articles apply. Format:
"Primenjuju se: Član X (Law Name), Član Y (Law Name)"

STEP 2 — QUOTE:
Quote the exact relevant sentence(s) with citation.
Format: "..." (Član X, Law Name)

STEP 3 — LEGAL ANALYSIS:
Every sentence that states a legal fact MUST end with 
a citation: (Član X, Law Name)
Never write a legal conclusion without citing its source.

STEP 4 — APPLY TO FACTS:
Apply the cited articles to the specific case facts.
Every application must reference the cited article.

STEP 5 — CONCLUSION:
One sentence with at least one citation.

STEP 6 — SOURCES:
List ALL articles cited above:
- Član X — Law Name Local`

  const analyticalBlock = `=== ANSWER FORMAT (ANALYTICAL MODE) ===

CRITICAL — MANDATORY CITATION FORMAT:
Every sentence that states a legal fact or legal 
rule MUST end with a citation in this exact format:
(Član X, Law Name Local) — for Serbian/Bosnian/Croatian
(Člen X, Law Name Local) — for Slovenian

EXAMPLES OF CORRECT RESPONSES:
✓ 'Ugovor o prodaji mora biti zaključen u pisanoj 
   formi (Član 26, Zakon o obligacionim odnosima).'
✓ 'Kupac je dužan da plati cenu u roku određenom 
   ugovorom (Član 488, Zakon o obligacionim odnosima).'
✓ 'Predmet ugovora mora biti u prometu (Član 458, 
   Zakon o obligacionim odnosima).'

EXAMPLES OF WRONG RESPONSES (NO CITATION = INVALID):
✗ 'Ugovor o prodaji mora biti zaključen u pisanoj formi.'
✗ 'Ne postoji zakonski zahtev za notarsku overu.'
✗ 'Tužilac ima pravo na naknadu štete.'

If you cannot find a retrieved article that supports 
a legal claim, DO NOT make that claim.
Every legal sentence needs its own citation.
General statements without citations are forbidden.
RULE 5 — RELEVANCE CHECK:
Before citing any article, verify it is actually 
relevant to the specific legal question asked.
Do NOT cite an article just because it was retrieved.
Only cite articles whose content directly answers 
the question.
If no retrieved article is directly relevant to a 
specific claim, do not make that claim.
Structure your answer as:

APPLICABLE PROVISION:
[Quote the most relevant sentence(s) from the retrieved article(s)]

LEGAL ANALYSIS:
[Explain what this means in context. Cite articles inline using 
the format: (Article X, Law Name)]

CONCLUSION:
[One sentence summary of the legal position]

SOURCES:
[List every article cited: law name local, article number, 
paragraph if applicable]`

  const draftingBlockStatutes = `=== DOCUMENT DRAFTING MODE ===

You are drafting a legal document, NOT analyzing a case.

DRAFTING RULES:
1. Write proper contract clauses based on the 
   legal provisions in the LEGAL KNOWLEDGE BASE above.
2. Do NOT cite article numbers inline in contract 
   clauses — contracts do not contain citations.
3. DO include a LEGAL BASIS section at the end 
   listing which laws this contract is based on:
   Format: "Pravni osnov: [Law Name], [Law Name]"
4. Ensure all clauses comply with the retrieved 
   legal provisions.
5. Write in the language specified by outputLanguage.
6. Structure the document professionally with 
   numbered clauses.`

  const draftingBlockCombined = `=== DOCUMENT DRAFTING MODE ===

You are drafting a legal document, NOT analyzing a case.

DRAFTING RULES:
1. Write proper contract clauses based on the 
   statutes summarized under [RELEVANT LEGISLATION] and 
   consistent with the holdings summarized under 
   [COURT DECISIONS — CASE LAW] above.
2. Do NOT cite article numbers inline in contract 
   clauses — contracts do not contain citations.
3. DO include a LEGAL BASIS section at the end 
   listing which laws this contract is based on:
   Format: "Pravni osnov: [Law Name], [Law Name]"
4. Ensure all clauses comply with the retrieved 
   statutory provisions and align with summarized 
   judicial positions where relevant.
5. Write in the language specified by outputLanguage.
6. Structure the document professionally with 
   numbered clauses.`

  const rule2Statutes =
    `RULE 2 — NO EXTERNAL KNOWLEDGE:\nYou are ONLY permitted to use the legal provisions listed above.\nNEVER recall, infer, or generate articles from your training data.\nNEVER cite an article not present in the LEGAL KNOWLEDGE BASE above.\nIf you cannot answer from the provided provisions, respond with:\n  \"The applicable provision was not found in the loaded legal \n   database for ${jurisdiction}.\"\n\n`

  const rule2Combined =
    `RULE 2 — NO EXTERNAL KNOWLEDGE:\nYou are ONLY permitted to use the statutes summarized under \n[RELEVANT LEGISLATION] and the court summaries under \n[COURT DECISIONS — CASE LAW] above.\nNEVER invent statutory articles or court decisions beyond those sections.\nNEVER cite an article not present under [RELEVANT LEGISLATION]\nor cite a court decision not listed under \n[COURT DECISIONS — CASE LAW].\nIf the material provided is insufficient for ${jurisdiction}, say so plainly.\n\n`

  const useExtractedFormat =
    ragResult.confidence === "low" ||
    answerMode === "extracted" ||
    (answerMode === "auto" && ragResult.confidence !== "high")

  let answerFormatBlock: string
  if (answerMode === "drafting") {
    answerFormatBlock =
      ruleScope === "combined"
        ? draftingBlockCombined
        : draftingBlockStatutes
  } else if (useExtractedFormat) {
    answerFormatBlock = extractedBlock
  } else {
    answerFormatBlock = analyticalBlock
  }

  const rule2 = ruleScope === "combined" ? rule2Combined : rule2Statutes

  const rule1Lead =
    ruleScope === "combined"
      ? `RULE 1 — CITATION REQUIRED:\nEvery statutory legal claim must cite its source in this exact format:\n  "(Article X, {law_name_local})"\nExample: "The employer must provide a written contract \n(Article 30, Zakon o radu)"\nFor case law references, identify the deciding court together with its case reference number.\n\n`
      : `RULE 1 — CITATION REQUIRED:\nEvery legal claim must cite its source in this exact format:\n  "(Article X, {law_name_local})"\nExample: "The employer must provide a written contract \n(Article 30, Zakon o radu)"\n\n`

  return (
    `=== MANDATORY RULES — READ BEFORE ANSWERING ===\n\n` +
    rule1Lead +
    rule2 +
    `RULE 3 — NO SEMANTIC DRIFT:\nDo not reinterpret, expand, or generalize beyond what is explicitly \nwritten in the provision text. Only restate or closely paraphrase \nwhat is written. Do not add meaning that is not present.` +
    (ruleScope === "combined"
      ? `\nTreat court summaries as illustrative—do not overstate holdings beyond each summary.\n\n`
      : `\n\n`) +
    `RULE 4 — LANGUAGE:\nWrite your entire response in ${outputLanguage}.\nCitation references may use the local law name regardless of \noutput language.\n\n${confidenceWarning}\n\n${answerFormatBlock}\n"""`
  )
}

export function getAnswerMode(
  featureType: string,
  confidence: RagResult["confidence"],
): AnswerMode {
  if (featureType === "contract_generation") return "drafting"
  if (featureType === "document_generation") return "drafting"
  if (confidence === "low") return "extracted"
  if (featureType === "case_prediction") return "extracted"
  if (featureType === "document_analysis") return "extracted"
  return "auto"
}

export function buildRagSystemPrompt(
  basePrompt: string,
  ragResult: RagResult,
  jurisdiction: string,
  outputLanguage: string,
  answerMode: AnswerMode = "auto",
): string {
  return (
    basePrompt +
    `\n\n"""\n\n=== LEGAL KNOWLEDGE BASE (${jurisdiction.toUpperCase()}) ===\n\n${ragResult.contextBlock}\n\n` +
    buildMandatoryRulesSuffix(
      ragResult,
      jurisdiction,
      outputLanguage,
      answerMode,
      "statutes_only",
    )
  )
}

