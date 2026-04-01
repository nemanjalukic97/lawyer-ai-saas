import {
  retrieveLegalContext,
  buildRagSystemPrompt,
  validateCitations,
  getAnswerMode,
  type RagResult,
} from "@/lib/legalRag"
import { NextRequest } from "next/server"

import { callAI, OpenAIConfigError, OpenAICallError } from "@/lib/openai"
import { createClient } from "@/lib/supabase/server"

type FeatureType =
  | "contract_generation"
  | "document_generation"
  | "case_prediction"
  | "document_analysis"
  | "template_generation"

const DAILY_LIMITS: Record<string, number> = {
  solo: 20,
  professional: 100,
  firm: 300,
}

const JURISDICTION_FEATURES = new Set([
  "case_prediction",
  "document_analysis",
  "contract_generation",
  "document_generation",
])

const FEATURE_K: Record<string, number> = {
  case_prediction: 8,
  document_analysis: 8,
  contract_generation: 7,
  document_generation: 6,
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

type RagMetadata = {
  confidence: string
  topSimilarity: number
  hasStrongMatch: boolean
  chunksRetrieved: number
  answerMode: string
  validation: {
    valid: boolean
    invalidCitations: string[]
    missingCitations: string[]
    citedArticles: string[]
  } | null
  sources: Array<{
    law_name_local: string
    article_num: string
    paragraph_num: string | null
    text_preview: string
    similarity: number
  }>
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

  console.log("[DEBUG] featureType:", featureType,
            "| jurisdiction:", body.jurisdiction,
            "| JURISDICTION_FEATURES has it:",
            JURISDICTION_FEATURES.has(featureType))

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
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("law_firm_id, subscription_tier")
      .eq("id", user.id)
      .is("deleted_at", null)
      .maybeSingle()

    const today = new Date().toISOString().split("T")[0]

    const { count } = await supabase
      .from("usage_stats")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("usage_date", today)

    const tier = (profile as any)?.subscription_tier ?? "solo"
    const limit = DAILY_LIMITS[tier] ?? 20

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
    }

    if (JURISDICTION_FEATURES.has(featureType) && body.jurisdiction) {
      try {
        const ragResult = await retrieveLegalContext(
          userPrompt,
          body.jurisdiction,
          {
            category: undefined,
            k: FEATURE_K[featureType] ?? 6,
          }
        )

        if (ragResult.chunks.length > 0) {
          const answerMode = getAnswerMode(featureType, ragResult.confidence)

          finalSystemPrompt = buildRagSystemPrompt(
            systemPrompt,
            ragResult,
            body.jurisdiction,
            body.outputLanguage ?? "English",
            answerMode
          )

          ragMetadata = {
            confidence: ragResult.confidence,
            topSimilarity: ragResult.topSimilarity,
            hasStrongMatch: ragResult.hasStrongMatch,
            chunksRetrieved: ragResult.chunks.length,
            answerMode,
            validation: null,
            sources: ragResult.chunks.map(c => ({
              law_name_local: c.law_name_local,
              article_num: c.article_num,
              paragraph_num: c.paragraph_num,
              text_preview: c.text.slice(0, 200) +
                (c.text.length > 200 ? "..." : ""),
              similarity: Math.round(c.similarity * 1000) / 1000,
            })),
          }

          if (process.env.NODE_ENV !== "production") {
            console.log(
              `[RAG] ${body.jurisdiction} | chunks: ${ragResult.chunks.length}` +
              ` | confidence: ${ragResult.confidence}` +
              ` | top: ${ragResult.topSimilarity.toFixed(3)}` +
              ` | mode: ${answerMode}`
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

    if (ragMetadata.chunksRetrieved > 0) {
      const chunksForValidation = ragMetadata.sources.map(s => ({
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
        chunksForValidation
      )

      if (process.env.NODE_ENV !== "production") {
        console.log(
          `[RAG] validation: valid=${ragMetadata.validation.valid}` +
          ` | invalid: [${ragMetadata.validation.invalidCitations.join(", ")}]` +
          ` | missing: [${ragMetadata.validation.missingCitations.join(", ")}]`
        )
      }
    }

    try {
      await supabase.from("usage_stats").insert(
        {
          user_id: user.id,
          law_firm_id: (profile as any)?.law_firm_id ?? null,
          feature_type: featureType,
          tokens_used: tokensUsed,
          cost_usd: costUsd,
          entity_type: entityType ?? null,
          entity_id: entityId ?? null,
          model_used: "gpt-4o",
        } as any
      )
    } catch {
      // Ignore logging errors so they never block the response
    }

    return Response.json(
      {
        content,
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
      // eslint-disable-next-line no-console
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

