import { createClient } from "@/lib/supabase/server"
import { getSubscriptionContextForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { getMaxActiveSignatureRequests } from "@/app/dashboard/lib/entitlements"
import { getSiteUrl } from "@/lib/site-url"
import { sendSignatureRequestEmail } from "@/lib/email/signatureEmails"

type CreateBody = {
  contractId?: unknown
  signerName?: unknown
  signerEmail?: unknown
  message?: unknown
  expiresAt?: unknown
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base)
  d.setDate(d.getDate() + days)
  return d
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  let body: CreateBody
  try {
    body = (await request.json()) as CreateBody
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const contractId = typeof body.contractId === "string" ? body.contractId : null
  const signerName = typeof body.signerName === "string" ? body.signerName.trim() : ""
  const signerEmail = typeof body.signerEmail === "string" ? body.signerEmail.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : null

  const expiresAtRaw = typeof body.expiresAt === "string" ? body.expiresAt : null
  const expiresAt = expiresAtRaw ? new Date(expiresAtRaw) : addDays(new Date(), 14)
  if (!contractId || !isUuidLike(contractId)) {
    return Response.json({ error: "Invalid contract id" }, { status: 400 })
  }
  if (!signerName) {
    return Response.json({ error: "Missing signer name" }, { status: 400 })
  }
  if (!signerEmail || !signerEmail.includes("@")) {
    return Response.json({ error: "Missing or invalid signer email" }, { status: 400 })
  }
  if (Number.isNaN(expiresAt.getTime())) {
    return Response.json({ error: "Invalid expiresAt" }, { status: 400 })
  }

  const { planId, lawFirmId } = await getSubscriptionContextForUser(supabase, user.id)
  const limit = getMaxActiveSignatureRequests(planId)
  if (limit === 0) {
    return Response.json(
      { error: "E-signatures are not enabled on your plan" },
      { status: 403 }
    )
  }

  // Validate contract is in-scope (RLS will also protect, but we need title/content for email UX).
  const { data: contract, error: contractError } = await supabase
    .from("contracts")
    .select("id, title, status, signature_status")
    .eq("id", contractId)
    .maybeSingle()

  if (contractError) {
    return Response.json({ error: "Failed to load contract" }, { status: 500 })
  }
  if (!contract) {
    return Response.json({ error: "Contract not found" }, { status: 404 })
  }

  if (limit !== "unlimited") {
    const nowIso = new Date().toISOString()
    let q = supabase
      .from("signature_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
      .gt("expires_at", nowIso)

    if (lawFirmId) q = q.eq("law_firm_id", lawFirmId)
    else q = q.eq("user_id", user.id)

    const { count, error: countError } = await q
    if (countError) {
      return Response.json({ error: "Failed to verify signature request limit" }, { status: 500 })
    }
    if ((count ?? 0) >= limit) {
      return Response.json(
        {
          error:
            "You have reached your limit of 5 active signature requests. Please wait for existing requests to be signed or cancelled before sending new ones. Upgrade to Professional for unlimited requests.",
        },
        { status: 403 }
      )
    }
  }

  const token = crypto.randomUUID()

  const { data: inserted, error: insertError } = await supabase
    .from("signature_requests")
    .insert({
      contract_id: contractId,
      user_id: user.id,
      law_firm_id: lawFirmId,
      signer_name: signerName,
      signer_email: signerEmail,
      message: message || null,
      token,
      expires_at: expiresAt.toISOString(),
      status: "pending",
    } as any)
    .select("id, token")
    .maybeSingle()

  if (insertError) {
    return Response.json({ error: insertError.message || "Failed to create request" }, { status: 500 })
  }
  if (!inserted) {
    return Response.json({ error: "Failed to create request" }, { status: 500 })
  }

  // Update contract signature status + current request pointer
  const { error: contractUpdateError } = await supabase
    .from("contracts")
    .update({
      signature_status: "pending",
      signature_request_id: (inserted as any).id,
    } as any)
    .eq("id", contractId)

  if (contractUpdateError) {
    return Response.json({ error: "Failed to update contract signature status" }, { status: 500 })
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle()
  const sentByName = ((profile as any)?.full_name as string | null) ?? "Legantis user"

  const siteUrl = await getSiteUrl()
  const signingUrl = `${siteUrl}/sign/${token}`

  await sendSignatureRequestEmail({
    to: signerEmail,
    signerName,
    contractTitle: (contract as any).title as string,
    sentByName,
    expiresAt,
    signingUrl,
    message,
  })

  return Response.json({
    request: {
      id: (inserted as any).id,
      token,
      expiresAt: expiresAt.toISOString(),
      signingUrl,
    },
  })
}

