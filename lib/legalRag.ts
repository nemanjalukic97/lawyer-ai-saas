import OpenAI from "openai"
import {
  normalizeLegalAreaFilter,
  normalizeResearchCategory,
} from "./normalizeResearchCategory"
import { supabaseAdmin } from "./supabase/admin"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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
}

export type CaseLawContextResult = {
  cases: CaseLawChunk[]
  confidence: "high" | "medium" | "low" | "none"
  topSimilarity: number
}

export type AnswerMode = "extracted" | "analytical" | "auto" | "drafting"

const SIMILARITY_THRESHOLDS = {
  HIGH: 0.65,
  MEDIUM: 0.30,
  LOW_RETRY: 0.22,
}

const LOWER_THRESHOLD_JURISDICTIONS = new Set([
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
  "croatia",
  "montenegro",
  "slovenia",
  "serbia",
])

const LOWER_SIMILARITY_THRESHOLDS = {
  MEDIUM: 0.2,
  LOW_RETRY: 0.15,
} as const

function getJurisdictionRpcThresholds(jurisdiction: string): {
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

const RPC_TIMEOUT_MS = 5000
const CASE_LAW_RPC_TIMEOUT_MS = 12000
/** Unfiltered vector search on large corpora (e.g. bih_rs) can exceed 12s. */
const CASE_LAW_RPC_TIMEOUT_UNFILTERED_MS = 60000

const LARGE_CASE_LAW_JURISDICTIONS = new Set([
  "bih_rs",
  "bih_fbih",
  "bih_brcko",
  "serbia",
])

function getCaseLawRpcTimeoutMs(
  legalArea: string | null,
  jurisdiction: string,
): number {
  if (legalArea) return CASE_LAW_RPC_TIMEOUT_MS
  if (LARGE_CASE_LAW_JURISDICTIONS.has(jurisdiction)) {
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

function deduplicateLegalChunksById(chunks: LegalChunk[]): LegalChunk[] {
  const map = new Map<string, LegalChunk>()
  for (const chunk of chunks) {
    const existing = map.get(chunk.id)
    if (!existing || chunk.similarity > existing.similarity) {
      map.set(chunk.id, chunk)
    }
  }
  return Array.from(map.values()).sort((a, b) => b.similarity - a.similarity)
}

function buildMatchLegalArticlesRpcArgs(
  args: {
    embedding: number[]
    jurisdiction: string
    matchCount: number
    similarityThreshold: number
  },
  filterCategory: string | null,
): Record<string, unknown> {
  const rpcArgs: Record<string, unknown> = {
    query_embedding: args.embedding,
    filter_jurisdiction: args.jurisdiction,
    match_count: args.matchCount,
    similarity_threshold: args.similarityThreshold,
  }
  if (filterCategory) {
    rpcArgs.filter_category = filterCategory
  }
  return rpcArgs
}

async function runMatchLegalArticlesRpc(args: {
  embedding: number[]
  jurisdiction: string
  category: string | null
  matchCount: number
  similarityThreshold: number
}): Promise<LegalChunk[]> {
  const category = normalizeResearchCategory(args.category)

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error("RAG RPC timeout after 5000ms")),
      RPC_TIMEOUT_MS,
    ),
  )

  const rpcWork = async (): Promise<LegalChunk[]> => {
    const baseArgs = {
      embedding: args.embedding,
      jurisdiction: args.jurisdiction,
      matchCount: args.matchCount,
      similarityThreshold: args.similarityThreshold,
    }

    if (category && category !== "general") {
      const [specificRes, generalRes] = await Promise.all([
        supabaseAdmin.rpc(
          "match_legal_articles",
          buildMatchLegalArticlesRpcArgs(baseArgs, category),
        ),
        supabaseAdmin.rpc(
          "match_legal_articles",
          buildMatchLegalArticlesRpcArgs(baseArgs, "general"),
        ),
      ])

      if (specificRes.error) {
        throw new Error(specificRes.error.message)
      }
      if (generalRes.error) {
        throw new Error(generalRes.error.message)
      }

      const merged = [
        ...((specificRes.data ?? []) as LegalChunk[]),
        ...((generalRes.data ?? []) as LegalChunk[]),
      ]
      return deduplicateLegalChunksById(merged).slice(0, args.matchCount)
    }

    const { data, error } = await supabaseAdmin.rpc(
      "match_legal_articles",
      buildMatchLegalArticlesRpcArgs(baseArgs, category),
    )

    if (error) {
      throw new Error(error.message)
    }

    return (data ?? []) as LegalChunk[]
  }

  return Promise.race([rpcWork(), timeoutPromise])
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

  return { cases: data, usedThreshold, retried }
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
}> {
  const embedding = await embedQueryText(args.query)
  return matchCaseLawWithEmbedding({
    embedding,
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
}): Promise<{
  chunks: LegalChunk[]
  usedThreshold: number
  retried: boolean
}> {
  const embedding = await embedQueryText(args.query)
  const thresholds = getJurisdictionRpcThresholds(args.jurisdiction)

  const initialThreshold =
    args.similarityThreshold ?? thresholds.defaultThreshold
  const shouldRetry =
    args.retryIfEmpty !== false && initialThreshold > thresholds.lowRetry

  let usedThreshold = initialThreshold
  let retried = false

  let data = await runMatchLegalArticlesRpc({
    embedding,
    jurisdiction: args.jurisdiction,
    category: args.category ?? null,
    matchCount: args.matchCount ?? 6,
    similarityThreshold: initialThreshold,
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
      matchCount: args.matchCount ?? 6,
      similarityThreshold: thresholds.lowRetry,
    })
  }

  return { chunks: data, usedThreshold, retried }
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

  const { chunks: rawChunks } = await matchLegalArticles({
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

  const { cases: rawCases } = await matchCaseLaw({
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

  return buildCaseLawContextResult(rawCases, jurisdiction)
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

