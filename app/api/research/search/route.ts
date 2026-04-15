import { NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { getSubscriptionContextForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { PLAN_ENTITLEMENTS } from "@/app/dashboard/lib/entitlements"
import { matchLegalArticles, type LegalChunk } from "@/lib/legalRag"
import type { TablesInsert } from "@/lib/supabase/types"

type ResearchSearchBody = {
  query?: string
  jurisdiction?: string | null
  category?: string | null
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

function normalizeQuery(input: string): string {
  return input.trim().replace(/\s+/g, " ").trim()
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

function buildExcerpt(chunk: LegalChunk, query: string): string {
  const primary = excerptAround(chunk.text_local ?? "", query) ?? excerptAround(chunk.text, query)
  if (primary) return primary
  const fallbackSource = (chunk.text_local && chunk.text_local.trim()) ? chunk.text_local : chunk.text
  const s = (fallbackSource ?? "").trim()
  if (!s) return ""
  if (s.length <= 260) return s
  return `${s.slice(0, 260).trim()}…`
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

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await req.json().catch(() => null)) as ResearchSearchBody | null
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
  const category =
    typeof body?.category === "string" && body.category.trim()
      ? body.category.trim()
      : null

  try {
    const { planId, lawFirmId } = await getSubscriptionContextForUser(
      supabase,
      user.id,
    )

    const limit = PLAN_ENTITLEMENTS[planId].aiCallsPerDay
    const today = new Date().toISOString().split("T")[0]

    const { count } = await supabase
      .from("usage_stats")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("usage_date", today)
      .eq("feature_type", "legal_research")

    if ((count ?? 0) >= limit) {
      return Response.json(
        {
          error: "Daily AI limit reached. Please upgrade your plan.",
          limit,
          used: count,
        },
        { status: 429 },
      )
    }

    // match_legal_articles currently requires a jurisdiction argument.
    // For the Research page's "All jurisdictions" option, we fan-out and merge results.
    const jurisdictions: string[] = jurisdiction
      ? [jurisdiction]
      : [
          "serbia",
          "croatia",
          "bih_federation",
          "bih_rs",
          "bih_brcko",
          "montenegro",
          "slovenia",
        ]

    const searches = await Promise.all(
      jurisdictions.map((j) =>
        matchLegalArticles({
          query,
          jurisdiction: j,
          category,
          matchCount: 10,
          similarityThreshold: 0.25,
          retryIfEmpty: true,
        }).catch(() => ({ chunks: [] as LegalChunk[], usedThreshold: 0.25, retried: false })),
      ),
    )

    const merged = searches.flatMap((s) => s.chunks ?? [])

    // Deduplicate exact rows by (jurisdiction, law, article, paragraph) and keep best similarity.
    const bestByKey = new Map<string, LegalChunk>()
    for (const c of merged) {
      const key = `${c.jurisdiction}::${c.law_name}::${c.article_num}::${c.paragraph_num ?? ""}`
      const existing = bestByKey.get(key)
      if (!existing || c.similarity > existing.similarity) bestByKey.set(key, c)
    }

    const sorted = Array.from(bestByKey.values()).sort(
      (a, b) => (b.similarity ?? 0) - (a.similarity ?? 0),
    )
    const top = sorted.slice(0, 10)

    const results = top.map((c) => toResultItem(c, query))

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
          match_count: 10,
          similarity_threshold: 0.25,
        } as any,
      }
      await supabase.from("usage_stats").insert(usageRow as never)
    } catch {
      // never block response on logging
    }

    return Response.json({
      query,
      filters: { jurisdiction, category },
      results,
    })
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

