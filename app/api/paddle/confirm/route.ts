import { NextRequest } from "next/server"

import { paddle } from "@/lib/paddle"
import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

type Tier = "solo" | "professional" | "firm"
type SubscriptionStatus = "trial" | "active" | "cancelled" | "expired" | "past_due"

type ConfirmBody = {
  transactionId: string
  tier?: Tier | null
}

function isTier(value: unknown): value is Tier {
  return value === "solo" || value === "professional" || value === "firm"
}

function isConfirmBody(value: unknown): value is ConfirmBody {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  if (typeof v.transactionId !== "string" || !v.transactionId) return false
  if ("tier" in v && v.tier != null && !isTier(v.tier)) return false
  return true
}

function pickString(obj: unknown, keys: string[]): string | null {
  if (!obj || typeof obj !== "object") return null
  const o = obj as Record<string, unknown>
  for (const k of keys) {
    const v = o[k]
    if (typeof v === "string" && v) return v
  }
  return null
}

function pickRecord(obj: unknown, keys: string[]): Record<string, unknown> | null {
  if (!obj || typeof obj !== "object") return null
  const o = obj as Record<string, unknown>
  for (const k of keys) {
    const v = o[k]
    if (v && typeof v === "object" && !Array.isArray(v)) return v as Record<string, unknown>
  }
  return null
}

function extractTransaction(txn: unknown): Record<string, unknown> | null {
  if (!txn || typeof txn !== "object") return null
  const t = txn as Record<string, unknown>
  const data = pickRecord(t, ["data"])
  return data ?? t
}

export async function POST(req: NextRequest) {
  try {
    if (!paddle) {
      return Response.json(
        { error: "Paddle is not configured on the server." },
        { status: 500 }
      )
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const parsed: unknown = await req.json().catch(() => null)
    if (!isConfirmBody(parsed)) {
      return Response.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { transactionId } = parsed
    const requestedTier = parsed.tier ?? null

    // Fetch the transaction from Paddle to verify status + customData ownership.
    const rawTxn: unknown = await (paddle as unknown as {
      transactions: { get: (id: string) => Promise<unknown> }
    }).transactions.get(transactionId)

    const txn = extractTransaction(rawTxn)
    if (!txn) {
      return Response.json({ error: "Transaction not found" }, { status: 404 })
    }

    const statusRaw = pickString(txn, ["status"])
    const status = statusRaw ? statusRaw.toLowerCase() : ""
    if (!["completed", "billed", "paid"].includes(status)) {
      return Response.json(
        { error: `Transaction not completed (status=${statusRaw ?? "unknown"})` },
        { status: 400 }
      )
    }

    const customData =
      pickRecord(txn, ["customData", "custom_data"]) ??
      pickRecord(txn, ["custom_data"]) ??
      {}

    const userIdFromPaddle = pickString(customData, ["userId", "user_id"])
    if (!userIdFromPaddle || userIdFromPaddle !== user.id) {
      return Response.json({ error: "Transaction does not belong to user" }, { status: 403 })
    }

    const tierFromPaddle = pickString(customData, ["tier"])
    const tier: Tier | null =
      (requestedTier && isTier(requestedTier) ? requestedTier : null) ??
      (tierFromPaddle && isTier(tierFromPaddle) ? (tierFromPaddle as Tier) : null)

    if (!tier) {
      return Response.json({ error: "Missing tier for provisioning" }, { status: 400 })
    }

    const lawFirmId = pickString(customData, ["lawFirmId", "law_firm_id"]) ?? null

    const customerId =
      pickString(txn, ["customer_id", "customerId"]) ??
      (pickRecord(txn, ["customer"]) ? pickString(pickRecord(txn, ["customer"]), ["id"]) : null)

    const subscriptionId =
      pickString(txn, ["subscription_id", "subscriptionId"]) ??
      (pickRecord(txn, ["subscription"]) ? pickString(pickRecord(txn, ["subscription"]), ["id"]) : null)

    const update: Record<string, unknown> = {
      subscription_tier: tier,
      subscription_status: "active" satisfies SubscriptionStatus,
    }

    if (customerId) update.stripe_customer_id = customerId
    if (subscriptionId) update.stripe_subscription_id = subscriptionId

    const table = lawFirmId ? "law_firms" : "user_profiles"
    const id = lawFirmId ?? user.id

    const { error } = await supabaseAdmin.from(table).update(update).eq("id", id)
    if (error) {
      return Response.json({ error: "Failed to update subscription" }, { status: 500 })
    }

    return Response.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error("Paddle confirm route error:", err)
    return Response.json({ error: "Failed to confirm Paddle purchase" }, { status: 500 })
  }
}

