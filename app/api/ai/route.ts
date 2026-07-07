import {
  retrieveLegalContext,
  retrieveCaseLawContext,
  buildRagSystemPrompt,
  buildCombinedRagPrompt,
  validateCitations,
  getAnswerMode,
  summarizeAreaInferenceForLog,
  summarizeMatchChannelsForLog,
  type LegalChunk,
  type CaseLawContextResult,
} from "@/lib/legalRag"
import { NextRequest } from "next/server"

import { callAI, OpenAIConfigError, OpenAICallError } from "@/lib/openai"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import type { TablesInsert } from "@/lib/supabase/types"
import type { RagMetadata } from "@/types/rag"
import { PLAN_ENTITLEMENTS } from "@/app/dashboard/lib/entitlements"
import { getSubscriptionContextForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { normalizeJurisdiction } from "@/lib/normalizeJurisdiction"
import { normalizeResearchCategory } from "@/lib/normalizeResearchCategory"

type FeatureType =
  | "contract_generation"
  | "document_generation"
  | "case_prediction"
  | "document_analysis"
  | "template_generation"
  | "legal_research"

const JURISDICTION_FEATURES = new Set([
  "case_prediction",
  "document_analysis",
  "contract_generation",
  "document_generation",
])

const CASE_LAW_FEATURES = new Set([
  "case_prediction",
  "document_analysis",
  "contract_generation",
  "document_generation",
  "legal_research",
])

const FEATURE_K: Record<string, number> = {
  case_prediction: 8,
  document_analysis: 8,
  contract_generation: 7,
  document_generation: 6,
  legal_research: 8,
}

interface AiRequestBody {
  systemPrompt: string
  userPrompt: string
  featureType: FeatureType
  entityType?: string
  entityId?: string
  jurisdiction?: string
  category?: string
  outputLanguage?: string
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: AiRequestBody

  try {
    body = (await req.json()) as AiRequestBody
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { systemPrompt, userPrompt, featureType, entityType, entityId } = body

  const cookieLanguageCode = req.cookies.get("legantis-language")?.value
  const outputLanguageFromCookie = (() => {
    switch (cookieLanguageCode) {
      case "sr":
        return "Serbian"
      case "bs":
        return "Bosnian"
      case "hr":
        return "Croatian"
      case "sl":
        return "Slovenian"
      case "me":
        return "Montenegrin"
      case "en":
      default:
        return "English"
    }
  })()

  const resolvedOutputLanguage =
    typeof body.outputLanguage === "string" && body.outputLanguage.trim()
      ? body.outputLanguage.trim()
      : outputLanguageFromCookie

  const validFeatureTypes: FeatureType[] = [
    "contract_generation",
    "document_generation",
    "case_prediction",
    "document_analysis",
    "template_generation",
  ]

  if (
    typeof systemPrompt !== "string" ||
    !systemPrompt.trim() ||
    typeof userPrompt !== "string" ||
    !userPrompt.trim() ||
    typeof featureType !== "string" ||
    !validFeatureTypes.includes(featureType as FeatureType)
  ) {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  try {
    const { planId, lawFirmId } = await getSubscriptionContextForUser(
      supabase,
      user.id
    )

    if (
      planId === "free" &&
      featureType !== "document_generation"
    ) {
      return Response.json(
        {
          error:
            "This feature requires a paid plan. Upgrade from Billing to continue.",
        },
        { status: 403 }
      )
    }

    const limit = PLAN_ENTITLEMENTS[planId].aiCallsPerDay

    const today = new Date().toISOString().split("T")[0]

    const { count } = await supabase
      .from("usage_stats")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("usage_date", today)

    if ((count ?? 0) >= limit) {
      return Response.json(
        {
          error: "Daily AI limit reached. Please upgrade your plan.",
          limit,
          used: count,
        },
        { status: 429 }
      )
    }

    let finalSystemPrompt = systemPrompt
    let ragMetadata: RagMetadata = {
      confidence: "none",
      topSimilarity: 0,
      hasStrongMatch: false,
      chunksRetrieved: 0,
      answerMode: "none",
      validation: null,
      sources: [],
      caseLawSources: [],
      caseLawConfidence: "none",
    }

    const ragJurisdiction = normalizeJurisdiction(body.jurisdiction ?? null)
    const categoryFilter = normalizeResearchCategory(body.category)
    let ragQueryLogMetadata: Record<string, unknown> | null = null

    if (JURISDICTION_FEATURES.has(featureType) && ragJurisdiction) {
      try {
        const k = FEATURE_K[featureType] ?? 6
        const ragResult = await retrieveLegalContext(
          userPrompt,
          ragJurisdiction,
          {
            category: categoryFilter ?? undefined,
            k,
          }
        )

        let caseLawResult: CaseLawContextResult = {
          cases: [],
          confidence: "none",
          topSimilarity: 0,
        }

        if (CASE_LAW_FEATURES.has(featureType)) {
          const caseLawOpts: { k: number; legalArea?: string } = { k }
          if (categoryFilter) caseLawOpts.legalArea = categoryFilter
          caseLawResult = await retrieveCaseLawContext(
            userPrompt,
            ragJurisdiction,
            caseLawOpts,
          )
        }

        const hasStatutes = ragResult.chunks.length > 0
        const hasCases = caseLawResult.cases.length > 0

        if (hasStatutes || hasCases) {
          const answerMode = getAnswerMode(featureType, ragResult.confidence)

          finalSystemPrompt = CASE_LAW_FEATURES.has(featureType)
            ? buildCombinedRagPrompt(
                systemPrompt,
                ragResult,
                caseLawResult,
                ragJurisdiction,
                resolvedOutputLanguage,
                answerMode,
              )
            : buildRagSystemPrompt(
                systemPrompt,
                ragResult,
                ragJurisdiction,
                resolvedOutputLanguage,
                answerMode,
              )

          ragMetadata = {
            confidence: hasStatutes ? ragResult.confidence : "none",
            topSimilarity: hasStatutes ? ragResult.topSimilarity : 0,
            hasStrongMatch: hasStatutes && ragResult.hasStrongMatch,
            chunksRetrieved: ragResult.chunks.length,
            answerMode,
            validation: null,
            sources: hasStatutes
              ? ragResult.chunks.map((c) => ({
                  law_name_local: c.law_name_local,
                  article_num: c.article_num,
                  paragraph_num: c.paragraph_num,
                  text_preview:
                    c.text.slice(0, 200) +
                    (c.text.length > 200 ? "..." : ""),
                  similarity: Math.round(c.similarity * 1000) / 1000,
                }))
              : [],
            caseLawSources: caseLawResult.cases.map((c) => ({
              court: c.court,
              case_number: c.case_number,
              decision_date: c.decision_date,
              legal_question: c.legal_question,
              court_position: c.court_position,
              reasoning: c.reasoning,
              headnote: c.headnote,
              outcome: c.outcome,
              keywords: c.keywords,
              related_articles: c.related_articles,
              similarity: Math.round(c.similarity * 1000) / 1000,
            })),
            caseLawConfidence: caseLawResult.confidence,
          }

          ragQueryLogMetadata = {
            law_match_channels: summarizeMatchChannelsForLog(ragResult.chunks),
            case_law_match_channels: summarizeMatchChannelsForLog(
              caseLawResult.cases,
            ),
            law_area_inference: summarizeAreaInferenceForLog(
              ragResult.areaInference,
            ),
            case_law_area_inference: summarizeAreaInferenceForLog(
              caseLawResult.areaInference,
            ),
          }

          if (process.env.NODE_ENV !== "production") {
            console.log(
              `[RAG] ${ragJurisdiction} | statute chunks: ${ragResult.chunks.length}` +
                ` | case law: ${caseLawResult.cases.length}` +
                ` | statute conf: ${hasStatutes ? ragResult.confidence : "none"}` +
                ` | case-law conf: ${caseLawResult.confidence}` +
                ` | statute top: ${hasStatutes ? ragResult.topSimilarity.toFixed(3) : "n/a"}` +
                ` | mode: ${answerMode}`,
            )
          }
        }
      } catch (ragError) {
        if (process.env.NODE_ENV !== "production") {
          console.error(
            "[RAG] retrieval failed (non-blocking):",
            ragError instanceof Error ? ragError.message : String(ragError)
          )
        }
        // RAG failure is non-blocking. Continue with base prompt.
      }
    }

    const { content, tokensUsed, costUsd } = await callAI({
      systemPrompt: finalSystemPrompt,
      userPrompt,
    })

    const cleanedContent = content
      // Remove redundant defined-term repetition like: Sporazum ("Sporazum") / Sporazum (“Sporazum”)
      .replace(
        /\b(\p{L}{2,})\s*\(\s*(["“”'])\1\2\s*\)/gu,
        "$1"
      )
      // Remove defined-term parentheticals like: (dalje u tekstu: Ugovor) / (u daljem tekstu: Ugovor) / (v nadaljevanju: ...)
      .replace(
        /\s*\(\s*(dalje u tekstu|u daljem tekstu|u daljnjem tekstu|u nastavku|u daljem delu|v nadaljevanju)\s*:\s*[^)]*\)/giu,
        ""
      )
      // Strip Markdown emphasis and headings (AI should output plain text)
      .replace(/\*\*(.*?)\*\*/gs, "$1")
      .replace(/\*(.*?)\*/gs, "$1")
      .replace(/(^|\n)#{1,6}\s+/g, "$1")

    if (ragMetadata.chunksRetrieved > 0) {
      const chunksForValidation: LegalChunk[] = ragMetadata.sources.map((s) => ({
        id: "",
        jurisdiction: body.jurisdiction ?? "",
        law_name: s.law_name_local,
        law_name_local: s.law_name_local,
        law_category: "",
        article_num: s.article_num,
        paragraph_num: s.paragraph_num,
        text: s.text_preview,
        text_local: null,
        source_url: null,
        similarity: s.similarity,
      }))

      ragMetadata.validation = validateCitations(
        content,
        chunksForValidation,
        ragMetadata.answerMode
      )

      if (process.env.NODE_ENV !== "production") {
        console.log(
          `[RAG] validation: valid=${ragMetadata.validation.valid}` +
          ` | invalid: [${ragMetadata.validation.invalidCitations.join(", ")}]` +
          ` | missing: [${ragMetadata.validation.missingCitations.join(", ")}]`
        )
      }
    }

    if (ragMetadata.chunksRetrieved > 0) {
      const startLog = Date.now()
      try {
        await supabaseAdmin.from("rag_query_logs").insert({
          user_id: user.id,
          jurisdiction: body.jurisdiction ?? null,
          feature_type: featureType,
          query_preview: userPrompt.slice(0, 200),
          top_similarity: ragMetadata.topSimilarity,
          confidence: ragMetadata.confidence,
          answer_mode: ragMetadata.answerMode,
          chunks_retrieved: ragMetadata.chunksRetrieved,
          valid_citations: ragMetadata.validation?.valid ?? null,
          invalid_citations:
            ragMetadata.validation?.invalidCitations ?? [],
          response_time_ms: Date.now() - startLog,
          metadata: ragQueryLogMetadata,
        } as never)
      } catch (logError) {
        if (process.env.NODE_ENV !== "production") {
          console.error("[RAG] log write failed:", logError)
        }
      }
    }

    try {
      const usageRow: TablesInsert<"usage_stats"> = {
        user_id: user.id,
        law_firm_id: lawFirmId,
        feature_type: featureType,
        tokens_used: tokensUsed,
        cost_usd: costUsd,
        entity_type: entityType ?? null,
        entity_id: entityId ?? null,
        model_used: "gpt-4o",
        // usage_date is GENERATED ALWAYS ((created_at)::date); passing it
        // explicitly raises 428C9 and silently broke all usage tracking
        // (including daily-limit enforcement). Let Postgres derive it.
      }
      // Insert is allowed at runtime; generated Insert typing can resolve to `never` for this table.
      const { error: usageError } = await supabase
        .from("usage_stats")
        .insert(usageRow as never)
      if (usageError) {
        // eslint-disable-next-line no-console
        console.error("[ai] usage_stats insert failed", {
          code: (usageError as { code?: string }).code,
          message: usageError.message,
          details: (usageError as { details?: string }).details,
        })
      }
    } catch (err) {
      // Never block the response on logging, but surface it loudly.
      // eslint-disable-next-line no-console
      console.error(
        "[ai] usage_stats logging threw",
        err instanceof Error ? err.message : String(err),
      )
    }

    return Response.json(
      {
        content: cleanedContent,
        tokensUsed,
        costUsd,
        rag: ragMetadata,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof OpenAIConfigError) {
      return Response.json(
        { error: "AI configuration error" },
        { status: 500 }
      )
    }

    if (error instanceof OpenAICallError) {
      return Response.json({ error: "AI service error" }, { status: 500 })
    }

    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Unexpected AI API error:",
        error instanceof Error ? error.message : String(error)
      )
    }

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

