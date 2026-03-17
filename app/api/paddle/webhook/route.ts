import { createHmac, timingSafeEqual } from "crypto"
import { NextRequest } from "next/server"

import { supabaseAdmin } from "@/lib/supabase/admin"

type Tier = "solo" | "professional" | "firm"
type SubscriptionStatus = "trial" | "active" | "cancelled" | "expired" | "past_due"

type SubscriptionUpdate = Partial<{
  subscription_status: SubscriptionStatus
  subscription_tier: Tier
  stripe_customer_id: string
  stripe_subscription_id: string
}>

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

function pickString(obj: unknown, keys: string[]): string | null {
  if (!isRecord(obj)) return null
  for (const k of keys) {
    const v = obj[k]
    if (typeof v === "string" && v) return v
  }
  return null
}

function getSignatureHeader(req: NextRequest): string | null {
  return (
    req.headers.get("paddle-signature") ??
    req.headers.get("Paddle-Signature") ??
    req.headers.get("PADDLE-SIGNATURE")
  )
}

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const computed = createHmac("sha256", secret).update(rawBody).digest("hex")

  try {
    const a = Buffer.from(computed, "hex")
    const b = Buffer.from(signature, "hex")
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

function mapPaddleStatusToAppStatus(input: unknown): SubscriptionStatus | null {
  const s = typeof input === "string" ? input.toLowerCase() : ""
  if (!s) return null

  if (["active"].includes(s)) return "active"
  if (["trial", "trialing"].includes(s)) return "trial"
  if (["canceled", "cancelled"].includes(s)) return "cancelled"
  if (["past_due", "payment_failed", "unpaid"].includes(s)) return "past_due"
  if (["expired", "ended"].includes(s)) return "expired"

  return null
}

async function updateByCustomData(args: {
  userId: string
  tier?: Tier
  lawFirmId: string | null
  customerId?: string | null
  subscriptionId?: string | null
  status?: SubscriptionStatus | null
}) {
  const { userId, tier, lawFirmId, customerId, subscriptionId, status } = args
  const table = lawFirmId ? "law_firms" : "user_profiles"
  const id = lawFirmId ?? userId

  const update: SubscriptionUpdate = {}
  if (status) update.subscription_status = status
  if (tier) update.subscription_tier = tier
  if (customerId) update.stripe_customer_id = customerId
  if (subscriptionId) update.stripe_subscription_id = subscriptionId

  if (Object.keys(update).length === 0) return

  await supabaseAdmin.from(table).update(update).eq("id", id)
}

async function updateBySubscriptionId(subscriptionId: string, update: SubscriptionUpdate) {
  const [u, f] = await Promise.all([
    supabaseAdmin
      .from("user_profiles")
      .update(update)
      .eq("stripe_subscription_id", subscriptionId),
    supabaseAdmin
      .from("law_firms")
      .update(update)
      .eq("stripe_subscription_id", subscriptionId),
  ])

  if (u.error && f.error) {
    throw new Error("Failed updating subscription by subscription id")
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET
  if (!secret) {
    return Response.json({ error: "Webhook not configured" }, { status: 500 })
  }

  const rawBody = await req.text()
  const signature = getSignatureHeader(req)

  if (!signature || !verifySignature(rawBody, signature, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const eventType = pickString(payload, ["event_type", "type"]) ??
    (isRecord(payload) && isRecord(payload.event) ? pickString(payload.event, ["type"]) : null)

  const data =
    (isRecord(payload) ? payload.data : null) ??
    (isRecord(payload) && isRecord(payload.event) ? payload.event.data : null) ??
    (isRecord(payload) ? payload.payload : null) ??
    payload

  const customData =
    (isRecord(data) ? (data.customData ?? data.custom_data) : null) ??
    (isRecord(payload) ? (payload.customData ?? payload.custom_data) : null) ??
    {}

  const userId =
    pickString(customData, ["userId", "user_id"]) ?? undefined
  const lawFirmId =
    pickString(customData, ["lawFirmId", "law_firm_id"]) ?? null
  const tierCandidate = pickString(customData, ["tier"])
  const tier: Tier | undefined =
    tierCandidate === "solo" || tierCandidate === "professional" || tierCandidate === "firm"
      ? tierCandidate
      : undefined

  const customerId =
    pickString(data, ["customer_id", "customerId"]) ??
    (isRecord(data) && isRecord(data.customer) ? pickString(data.customer, ["id"]) : null)

  const subscriptionId =
    pickString(data, ["subscription_id", "subscriptionId"]) ??
    (isRecord(data) && isRecord(data.subscription) ? pickString(data.subscription, ["id"]) : null)

  try {
    switch (eventType) {
      case "transaction.completed": {
        if (!userId) break
        await updateByCustomData({
          userId,
          tier,
          lawFirmId,
          customerId,
          subscriptionId,
          status: "active",
        })
        break
      }

      case "subscription.updated": {
        if (!subscriptionId) break

        const mapped = mapPaddleStatusToAppStatus(data?.status)
        const update: Record<string, unknown> = {}
        if (mapped) update.subscription_status = mapped
        if (tier) update.subscription_tier = tier
        if (customerId) update.stripe_customer_id = customerId

        if (Object.keys(update).length) {
          await updateBySubscriptionId(subscriptionId, update)
        }
        break
      }

      case "subscription.canceled": {
        if (!subscriptionId) break
        await updateBySubscriptionId(subscriptionId, {
          subscription_status: "cancelled",
        })
        break
      }

      case "transaction.payment_failed": {
        if (!subscriptionId) break
        await updateBySubscriptionId(subscriptionId, {
          subscription_status: "past_due",
        })
        break
      }

      default: {
        // ignore other events
        break
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Paddle webhook error:",
        error instanceof Error ? error.message : String(error)
      )
    }
    return Response.json({ error: "Webhook handler error" }, { status: 500 })
  }

  return Response.json({ received: true }, { status: 200 })
}

