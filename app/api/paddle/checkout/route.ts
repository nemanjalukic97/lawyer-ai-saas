import { NextRequest } from "next/server"

import { paddle } from "@/lib/paddle"
import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"

type Tier = "solo" | "professional" | "firm"

type CheckoutBody = {
  priceId: string
  tier: Tier
}

function isCheckoutBody(value: unknown): value is CheckoutBody {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return typeof v.priceId === "string" && typeof v.tier === "string"
}

function getAllowedPriceIds(): Record<Tier, string | undefined> {
  return {
    solo: process.env.NEXT_PUBLIC_PADDLE_SOLO_PRICE_ID,
    professional: process.env.NEXT_PUBLIC_PADDLE_PROFESSIONAL_PRICE_ID,
    firm: process.env.NEXT_PUBLIC_PADDLE_FIRM_PRICE_ID,
  }
}

function extractTransactionId(transaction: unknown): string | null {
  if (!transaction || typeof transaction !== "object") return null
  const t = transaction as Record<string, unknown>
  if (typeof t.id === "string") return t.id
  const data = t.data
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>
    if (typeof d.id === "string") return d.id
  }
  return null
}

export async function POST(req: NextRequest) {
  try {
    if (!paddle) {
      return Response.json(
        {
          error:
            "Paddle is not configured. Set PADDLE_API_KEY (and optionally PADDLE_ENV) plus price IDs in .env.local.",
        },
        { status: 400 }
      )
    }
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    let body: CheckoutBody

    try {
      const parsed: unknown = await req.json()
      if (!isCheckoutBody(parsed)) {
        return Response.json({ error: "Invalid request body" }, { status: 400 })
      }
      body = parsed
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const { priceId, tier } = body

    const validTiers: Tier[] = ["solo", "professional", "firm"]
    if (typeof priceId !== "string" || !priceId || !validTiers.includes(tier)) {
      return Response.json({ error: "Invalid request body" }, { status: 400 })
    }

    const allowedPriceIds = getAllowedPriceIds()
    const allowed = Object.values(allowedPriceIds).filter(Boolean) as string[]
    if (!allowed.includes(priceId)) {
      return Response.json({ error: "Invalid priceId" }, { status: 400 })
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("law_firm_id")
      .eq("id", user.id)
      .is("deleted_at", null)
      .maybeSingle()

    if (profileError) {
      return Response.json({ error: "Failed to load user profile" }, { status: 500 })
    }

    const typedProfile = profile as Pick<Tables<"user_profiles">, "law_firm_id"> | null
    const lawFirmId = typedProfile?.law_firm_id ?? null

    const transaction: unknown = await paddle.transactions.create({
      items: [{ priceId, quantity: 1 }],
      customData: {
        userId: user.id,
        tier,
        lawFirmId,
      },
    } as unknown as Parameters<typeof paddle.transactions.create>[0])

    const transactionId = extractTransactionId(transaction)

    if (!transactionId) {
      return Response.json(
        { error: "Failed to create transaction" },
        { status: 500 }
      )
    }

    return Response.json({ transactionId }, { status: 200 })
  } catch (error) {
    // Detailed logging for debugging 500s in the checkout flow
    console.error("Paddle checkout route error:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Paddle error"

    return Response.json(
      { error: `Paddle checkout failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}

