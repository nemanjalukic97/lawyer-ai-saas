import { NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { getSubscriptionContextForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { PLAN_ENTITLEMENTS } from "@/app/dashboard/lib/entitlements"
import {
  matchLegalArticles,
  retrieveCaseLawContext,
  type CaseLawChunk,
  type CaseLawContextResult,
  type LegalChunk,
} from "@/lib/legalRag"
import { parseSearchTokens } from "@/lib/highlightSearchTerms"
import { normalizeJurisdiction } from "@/lib/normalizeJurisdiction"
import {
  inferLegalAreasFromLawChunks,
  normalizeResearchCategory,
} from "@/lib/normalizeResearchCategory"
import type { TablesInsert } from "@/lib/supabase/types"

type ResearchSearchScope = "laws" | "caselaw" | "both"

type ResearchSearchBody = {
  query?: string
  jurisdiction?: string | null
  category?: string | null
  page?: number
  limit?: number
  scope?: ResearchSearchScope
}

type ResearchResultItem = {
  id: string
  jurisdiction: string
  category: string
  law_name: string
  law_name_local: string
  article_num: string
  paragraph_num: string | null
  text: string
  text_local: string | null
  similarity: number
  confidencePct: number
  excerpt: string
}

type ResearchCaseLawResultItem = {
  id: string
  jurisdiction: string
  court: string
  case_number: string
  decision_date: string | null
  legal_question: string
  court_position: string
  reasoning: string
  outcome: string | null
  keywords: string[] | null
  related_articles: string[] | null
  similarity: number
  confidencePct: number
  excerpt: string
}

const PER_JURIS_CAP = 50
const DEFAULT_LIMIT = 10

function normalizeQuery(input: string): string {
  return input.trim().replace(/\s+/g, " ").trim()
}

function parsePage(value: unknown, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(n) || n < 1) return fallback
  return Math.floor(n)
}

function parseLimit(value: unknown, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(50, Math.max(1, Math.floor(n)))
}

function parseScope(value: unknown): ResearchSearchScope {
  if (value === "laws" || value === "caselaw" || value === "both") return value
  return "both"
}

async function fetchCaseLawForJurisdictions(
  query: string,
  jurisdictions: string[],
  category: string | null,
  matchCount: number,
): Promise<CaseLawContextResult[]> {
  const caseLawOpts = {
    k: Math.max(10, matchCount),
    ...(category ? { legalArea: category } : {}),
  }

  return Promise.all(
    jurisdictions.map((j) =>
      retrieveCaseLawContext(query, j, caseLawOpts).catch((err) => {
        const message = err instanceof Error ? err.message : String(err)
        // eslint-disable-next-line no-console
        console.error("[research/search] case law failed", j, message, err)
        return {
          cases: [] as CaseLawChunk[],
          confidence: "none" as const,
          topSimilarity: 0,
        }
      }),
    ),
  )
}

function excerptAround(
  haystack: string,
  needle: string,
  radius = 140,
): string | null {
  const h = haystack ?? ""
  const n = needle?.trim()
  if (!h || !n) return null
  const idx = h.toLowerCase().indexOf(n.toLowerCase())
  if (idx === -1) return null
  const start = Math.max(0, idx - radius)
  const end = Math.min(h.length, idx + n.length + radius)
  const prefix = start > 0 ? "…" : ""
  const suffix = end < h.length ? "…" : ""
  return `${prefix}${h.slice(start, end).trim()}${suffix}`
}

/** Try full query, then individual query tokens (more hits on long natural-language searches). */
function excerptAroundQuery(haystack: string, query: string, radius = 160): string | null {
  const h = haystack?.trim() ?? ""
  const q = query?.trim() ?? ""
  if (!h || !q) return null
  const attempts = [q, ...parseSearchTokens(q, 3, 10)]
  for (const needle of attempts) {
    const ex = excerptAround(h, needle, radius)
    if (ex) return ex
  }
  return null
}

function buildExcerpt(chunk: LegalChunk, _query: string): string {
  const s =
    (chunk.text_local && chunk.text_local.trim() ? chunk.text_local : chunk.text) ??
    ""
  return s.trim()
}

function buildCaseExcerpt(chunk: CaseLawChunk, query: string): string {
  const headnote = chunk.headnote ?? ""
  const position = chunk.court_position ?? ""
  const primary =
    excerptAroundQuery(headnote, query) ??
    excerptAroundQuery(position, query) ??
    excerptAroundQuery(chunk.legal_question ?? "", query)
  if (primary) return primary
  const fallback = (headnote.trim() || position.trim() || chunk.legal_question.trim())
  if (!fallback) return ""
  if (fallback.length <= 260) return fallback
  return `${fallback.slice(0, 260).trim()}…`
}

function toCaseLawResultItem(
  chunk: CaseLawChunk,
  query: string,
): ResearchCaseLawResultItem {
  const similarity = typeof chunk.similarity === "number" ? chunk.similarity : 0
  return {
    id: chunk.id,
    jurisdiction: chunk.jurisdiction,
    court: chunk.court,
    case_number: chunk.case_number,
    decision_date: chunk.decision_date,
    legal_question: chunk.legal_question,
    court_position: chunk.court_position,
    reasoning: chunk.reasoning,
    outcome: chunk.outcome,
    keywords: chunk.keywords,
    related_articles: chunk.related_articles,
    similarity,
    confidencePct: Math.max(0, Math.min(100, Math.round(similarity * 100))),
    excerpt: buildCaseExcerpt(chunk, query),
  }
}

function toResultItem(chunk: LegalChunk, query: string): ResearchResultItem {
  const similarity = typeof chunk.similarity === "number" ? chunk.similarity : 0
  return {
    id: chunk.id,
    jurisdiction: chunk.jurisdiction,
    category: chunk.law_category,
    law_name: chunk.law_name,
    law_name_local: chunk.law_name_local,
    article_num: chunk.article_num,
    paragraph_num: chunk.paragraph_num,
    text: chunk.text,
    text_local: chunk.text_local,
    similarity,
    confidencePct: Math.max(0, Math.min(100, Math.round(similarity * 100))),
    excerpt: buildExcerpt(chunk, query),
  }
}

function mergeLegalChunks(searches: Array<{ chunks?: LegalChunk[] }>): LegalChunk[] {
  const merged = searches.flatMap((s) => s.chunks ?? [])
  const bestByKey = new Map<string, LegalChunk>()
  for (const c of merged) {
    const key = `${c.jurisdiction}::${c.law_name}::${c.article_num}::${c.paragraph_num ?? ""}`
    const existing = bestByKey.get(key)
    if (!existing || c.similarity > existing.similarity) bestByKey.set(key, c)
  }
  return Array.from(bestByKey.values()).sort(
    (a, b) => (b.similarity ?? 0) - (a.similarity ?? 0),
  )
}

function mergeCaseLawChunks(
  caseLawSearches: Array<{ cases?: CaseLawChunk[] }>,
): CaseLawChunk[] {
  const mergedCases = caseLawSearches.flatMap((s) => s.cases ?? [])
  const bestCaseByKey = new Map<string, CaseLawChunk>()
  for (const c of mergedCases) {
    const key = `${c.jurisdiction}::${c.case_number}`
    const existing = bestCaseByKey.get(key)
    if (!existing || c.similarity > existing.similarity) bestCaseByKey.set(key, c)
  }
  return Array.from(bestCaseByKey.values()).sort(
    (a, b) => (b.similarity ?? 0) - (a.similarity ?? 0),
  )
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await req.json().catch(() => null)) as ResearchSearchBody | null
  const url = req.nextUrl.searchParams

  const rawQuery = (body?.query ?? "").toString()
  const query = normalizeQuery(rawQuery)
  if (!query) {
    return Response.json({ error: "Missing search query" }, { status: 400 })
  }
  if (query.length > 800) {
    return Response.json({ error: "Query is too long" }, { status: 400 })
  }

  const jurisdiction =
    typeof body?.jurisdiction === "string" && body.jurisdiction.trim()
      ? body.jurisdiction.trim()
      : null
  const category = normalizeResearchCategory(body?.category)
  const normalizedJurisdiction = normalizeJurisdiction(jurisdiction)

  const page = parsePage(body?.page ?? url.get("page"), 1)
  const limit = parseLimit(body?.limit ?? url.get("limit"), DEFAULT_LIMIT)
  const scope = parseScope(body?.scope)
  const offset = (page - 1) * limit
  const fetchCount = offset + limit + 1
  const matchCount = Math.min(PER_JURIS_CAP, fetchCount)

  const fetchLaws = scope === "laws" || scope === "both"
  const fetchCaseLaw = scope === "caselaw" || scope === "both"

  try {
    const { planId, lawFirmId } = await getSubscriptionContextForUser(
      supabase,
      user.id,
    )

    const dailyLimit = PLAN_ENTITLEMENTS[planId].aiCallsPerDay
    const today = new Date().toISOString().split("T")[0]

    const { count } = await supabase
      .from("usage_stats")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("usage_date", today)
      .eq("feature_type", "legal_research")

    if ((count ?? 0) >= dailyLimit) {
      return Response.json(
        {
          error: "Daily AI limit reached. Please upgrade your plan.",
          limit: dailyLimit,
          used: count,
        },
        { status: 429 },
      )
    }

    const ALL_JURISDICTIONS = [
      "serbia",
      "croatia",
      "bih_federation",
      "bih_rs",
      "bih_brcko",
      "montenegro",
      "slovenia",
    ]

    const jurisdictions: string[] = normalizedJurisdiction
      ? [normalizedJurisdiction]
      : ALL_JURISDICTIONS.map((j) => normalizeJurisdiction(j)!)

    if (fetchCaseLaw) {
      // eslint-disable-next-line no-console
      console.error("[research/search] case law fetch start", {
        jurisdictions,
        category,
        normalizedJurisdiction,
        scope,
        matchCount,
        fetchCaseLaw,
      })
    }

    const [searches, caseLawSearches] = await Promise.all([
      fetchLaws
        ? Promise.all(
            jurisdictions.map((j) =>
              matchLegalArticles({
                query,
                jurisdiction: j,
                category,
                matchCount,
                similarityThreshold: 0.25,
                retryIfEmpty: true,
              }).catch(() => ({
                chunks: [] as LegalChunk[],
                usedThreshold: 0.25,
                retried: false,
              })),
            ),
          )
        : Promise.resolve([]),
      fetchCaseLaw
        ? fetchCaseLawForJurisdictions(
            query,
            jurisdictions,
            category,
            matchCount,
          )
        : Promise.resolve([] as CaseLawContextResult[]),
    ])

    const sorted = fetchLaws ? mergeLegalChunks(searches) : []
    const totalResults = sorted.length
    const lawPage = sorted.slice(offset, offset + limit)
    const results = lawPage.map((c) => toResultItem(c, query))
    const hasMoreLaws = fetchLaws && totalResults > offset + limit

    let caseLawSearchRuns: CaseLawContextResult[] = caseLawSearches
    let sortedCases = fetchCaseLaw ? mergeCaseLawChunks(caseLawSearchRuns) : []

    if (
      fetchCaseLaw &&
      category == null &&
      page === 1 &&
      sortedCases.length === 0 &&
      sorted.length > 0
    ) {
      const inferredAreas = inferLegalAreasFromLawChunks(sorted)
      if (inferredAreas.length > 0) {
        // eslint-disable-next-line no-console
        console.error("[research/search] case law retry by inferred areas", {
          inferredAreas,
          jurisdictions,
        })
        const retries = await Promise.all(
          inferredAreas.map((area) =>
            fetchCaseLawForJurisdictions(
              query,
              jurisdictions,
              area,
              matchCount,
            ),
          ),
        )
        caseLawSearchRuns = [...caseLawSearchRuns, ...retries.flat()]
        sortedCases = mergeCaseLawChunks(caseLawSearchRuns)
      }
    }
    const totalCaseLawResults = sortedCases.length
    const casePage = sortedCases.slice(offset, offset + limit)
    const caseLawResults = casePage.map((c) => toCaseLawResultItem(c, query))
    const hasMoreCaseLaw = fetchCaseLaw && totalCaseLawResults > offset + limit

    if (fetchCaseLaw) {
      // eslint-disable-next-line no-console
      console.error("[research/search] case law fetch done", {
        jurisdiction: normalizedJurisdiction ?? "all",
        categoryFilter: category,
        scope,
        perJurisdiction: jurisdictions.map((j) => {
          const runs = caseLawSearchRuns.filter((r) =>
            (r.cases ?? []).some((c) => c.jurisdiction === j),
          )
          const cases = runs.flatMap((r) => r.cases ?? []).filter(
            (c) => c.jurisdiction === j,
          ).length
          let confidence: CaseLawContextResult["confidence"] = "none"
          const rank = { none: 0, low: 1, medium: 2, high: 3 }
          for (const r of runs) {
            if (rank[r.confidence] > rank[confidence]) confidence = r.confidence
          }
          return { jurisdiction: j, cases, confidence }
        }),
        sortedCases: sortedCases.length,
        caseLawResultsPage: caseLawResults.length,
      })
    }

    let caseLawConfidence: "high" | "medium" | "low" | "none" = "none"
    if (fetchCaseLaw && caseLawSearchRuns.length > 0) {
      const rank = { none: 0, low: 1, medium: 2, high: 3 }
      for (const s of caseLawSearchRuns) {
        if (rank[s.confidence] > rank[caseLawConfidence]) {
          caseLawConfidence = s.confidence
        }
      }
    }
    if (!fetchCaseLaw || caseLawResults.length === 0) caseLawConfidence = "none"

    const shouldLogUsage = page === 1 && scope === "both"
    if (shouldLogUsage) {
      try {
        const usageRow: TablesInsert<"usage_stats"> = {
          user_id: user.id,
          law_firm_id: lawFirmId,
          feature_type: "legal_research" as any,
          tokens_used: null,
          cost_usd: null,
          entity_type: null,
          entity_id: null,
          model_used: "text-embedding-3-small",
          usage_date: today,
          metadata: {
            jurisdiction: jurisdiction ?? "all",
            category: category ?? "all",
            match_count: matchCount,
            similarity_threshold: 0.25,
            page,
            limit,
          } as any,
        }
        await supabase.from("usage_stats").insert(usageRow as never)
      } catch {
        // never block response on logging
      }
    }

    return Response.json({
      query,
      filters: { jurisdiction, category },
      results,
      caseLawResults,
      caseLawConfidence,
      page,
      limit,
      totalResults,
      totalCaseLawResults,
      hasMoreLaws,
      hasMoreCaseLaw,
    })
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
