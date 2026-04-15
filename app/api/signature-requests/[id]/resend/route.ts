import { createClient } from "@/lib/supabase/server"
import { getSiteUrl } from "@/lib/site-url"
import { sendSignatureRequestEmail } from "@/lib/email/signatureEmails"

type RouteContext = {
  params: Promise<{ id: string }>
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

export async function POST(_request: Request, ctx: RouteContext) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await ctx.params
  if (!id || !isUuidLike(id)) {
    return Response.json({ error: "Invalid signature request id" }, { status: 400 })
  }

  const { data: reqRow, error: reqError } = await supabase
    .from("signature_requests")
    .select("id, contract_id, signer_name, signer_email, message, token, expires_at, status")
    .eq("id", id)
    .maybeSingle()

  if (reqError) return Response.json({ error: "Failed to load signature request" }, { status: 500 })
  if (!reqRow) return Response.json({ error: "Signature request not found" }, { status: 404 })

  const status = (reqRow as any).status as string | null
  const expiresAtIso = (reqRow as any).expires_at as string | null
  const expiresAt = expiresAtIso ? new Date(expiresAtIso) : null
  const signerName =
    typeof (reqRow as any).signer_name === "string"
      ? ((reqRow as any).signer_name as string).trim()
      : ""
  const signerEmail =
    typeof (reqRow as any).signer_email === "string"
      ? ((reqRow as any).signer_email as string).trim()
      : ""
  const message =
    typeof (reqRow as any).message === "string"
      ? ((reqRow as any).message as string).trim()
      : null

  if (status !== "pending") {
    return Response.json({ error: "Only pending requests can be resent" }, { status: 400 })
  }
  if (!expiresAt || Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) {
    return Response.json({ error: "This signing link has expired" }, { status: 400 })
  }
  if (!signerName) {
    return Response.json({ error: "Missing signer name" }, { status: 400 })
  }
  if (!signerEmail || !signerEmail.includes("@")) {
    return Response.json({ error: "Missing or invalid signer email" }, { status: 400 })
  }

  const contractId = (reqRow as any).contract_id as string
  const { data: contract, error: contractError } = await supabase
    .from("contracts")
    .select("id, title")
    .eq("id", contractId)
    .maybeSingle()

  if (contractError) return Response.json({ error: "Failed to load contract" }, { status: 500 })
  if (!contract) return Response.json({ error: "Contract not found" }, { status: 404 })

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle()
  const sentByName = ((profile as any)?.full_name as string | null) ?? "Legantis user"

  const siteUrl = await getSiteUrl()
  const token = (reqRow as any).token as string
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

  return Response.json({ success: true, signingUrl })
}

