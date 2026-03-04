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

interface AiRequestBody {
  systemPrompt: string
  userPrompt: string
  featureType: FeatureType
  entityType?: string
  entityId?: string
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

    const { content, tokensUsed, costUsd } = await callAI({
      systemPrompt,
      userPrompt,
    })

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

