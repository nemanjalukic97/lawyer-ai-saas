import { supabaseAdmin } from "@/lib/supabase/admin"
import { generateSignedContractPdfBuffer } from "@/lib/pdf/contractSignedPdf"
import {
  createSignedContractDownloadUrl,
  uploadSignedContractPdf,
} from "@/lib/storage/signedContracts"
import {
  sendSignatureConfirmationToSignerEmail,
  sendSignatureSignedToLawyerEmail,
} from "@/lib/email/signatureEmails"

type RouteContext = {
  params: Promise<{ token: string }>
}

type SignBody = {
  agree?: unknown
  typedName?: unknown
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

function getRequestIp(request: Request): string {
  const xf = request.headers.get("x-forwarded-for")
  if (xf) return xf.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

export async function POST(request: Request, ctx: RouteContext) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return Response.json({ error: "Server configuration error" }, { status: 500 })
  }

  const { token: tokenParam } = await ctx.params
  const token = tokenParam?.trim() ?? ""
  if (!token || !isUuidLike(token)) {
    return Response.json({ error: "Invalid token" }, { status: 400 })
  }

  // Rate limit (per token): 10 attempts per hour
  const ip = getRequestIp(request)
  const ua = request.headers.get("user-agent") ?? ""
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  await supabaseAdmin.from("signature_request_attempts").insert({
    token,
    ip,
    user_agent: ua,
  } as any)

  const { count: attemptCount } = await supabaseAdmin
    .from("signature_request_attempts")
    .select("id", { count: "exact", head: true })
    .eq("token", token)
    .gt("created_at", since)

  if ((attemptCount ?? 0) > 10) {
    return Response.json({ error: "Too many attempts. Please try again later." }, { status: 429 })
  }

  let body: SignBody
  try {
    body = (await request.json()) as SignBody
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const agree = body.agree === true
  const typedName = typeof body.typedName === "string" ? body.typedName.trim() : ""
  if (!agree) {
    return Response.json({ error: "You must agree to the terms" }, { status: 400 })
  }
  if (!typedName) {
    return Response.json({ error: "Please type your full name" }, { status: 400 })
  }

  const { data: bundle, error: bundleError } = await supabaseAdmin
    .rpc("get_signature_request_for_signing", { p_token: token })
    .maybeSingle()

  if (bundleError) {
    return Response.json({ error: "Failed to load signing request" }, { status: 500 })
  }
  if (!bundle) {
    return Response.json({ error: "Signing request not found" }, { status: 404 })
  }

  const status = (bundle as any).status as string
  const expiresAtIso = (bundle as any).expires_at as string
  const expiresAt = new Date(expiresAtIso)

  if (status === "signed") {
    return Response.json({ error: "This document has already been signed" }, { status: 409 })
  }
  if (status === "cancelled") {
    return Response.json({ error: "This signing request was cancelled" }, { status: 409 })
  }
  if (!expiresAtIso || Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) {
    // Best-effort mark expired
    const signatureRequestId = (bundle as any).signature_request_id as string
    await supabaseAdmin
      .from("signature_requests")
      .update({ status: "expired" } as any)
      .eq("id", signatureRequestId)
      .eq("status", "pending")

    const contractId = (bundle as any).contract_id as string
    await supabaseAdmin
      .from("contracts")
      .update({ signature_status: "expired" } as any)
      .eq("id", contractId)
      .eq("signature_request_id", signatureRequestId)

    return Response.json({ error: "This signing link has expired" }, { status: 410 })
  }

  if (status !== "pending") {
    return Response.json({ error: "This request cannot be signed" }, { status: 400 })
  }

  const signatureRequestId = (bundle as any).signature_request_id as string
  const contractId = (bundle as any).contract_id as string
  const contractTitle = ((bundle as any).contract_title as string) ?? "Contract"
  const contractContent = ((bundle as any).contract_content as string) ?? ""
  const signerEmail = ((bundle as any).signer_email as string) ?? ""
  const signerNameExpected = ((bundle as any).signer_name as string) ?? typedName

  const signedAt = new Date()

  const pdf = generateSignedContractPdfBuffer({
    contractTitle,
    contractContent,
    signerName: typedName || signerNameExpected,
    signerEmail,
    signedAt,
    signerIp: ip,
    verificationToken: token,
  })

  const storagePath = `contracts/${contractId}/${signatureRequestId}.pdf`
  await uploadSignedContractPdf(pdf, { path: storagePath })

  // One-time use: atomically move pending->signed. If this fails, do not proceed.
  const { data: updatedRows, error: updateErr } = await supabaseAdmin
    .from("signature_requests")
    .update({
      status: "signed",
      signed_at: signedAt.toISOString(),
      signer_ip: ip,
      signer_user_agent: ua,
      signed_pdf_path: storagePath,
    } as any)
    .eq("id", signatureRequestId)
    .eq("status", "pending")
    .select("id, user_id")

  if (updateErr) {
    return Response.json({ error: "Failed to finalize signature" }, { status: 500 })
  }
  if (!updatedRows || updatedRows.length !== 1) {
    return Response.json({ error: "This document has already been signed" }, { status: 409 })
  }

  await supabaseAdmin
    .from("contracts")
    .update({
      signature_status: "signed",
      signed_pdf_path: storagePath,
      status: "signed",
      signed_at: signedAt.toISOString(),
    } as any)
    .eq("id", contractId)

  const downloadUrl = await createSignedContractDownloadUrl(storagePath, 60 * 60 * 24 * 7)
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[sign] downloadUrl generated", {
      contractId,
      signatureRequestId,
      storagePath,
      downloadUrlType: typeof downloadUrl,
      downloadUrlLength: typeof downloadUrl === "string" ? downloadUrl.length : null,
    })
  }

  // Email notifications (best-effort)
  try {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[sign] sendSignatureConfirmationToSignerEmail params", {
        to: signerEmail,
        signerName: typedName || signerNameExpected,
        contractTitle,
        signedAt: signedAt.toISOString(),
        downloadUrl,
      })
    }
    await sendSignatureConfirmationToSignerEmail({
      to: signerEmail,
      signerName: typedName || signerNameExpected,
      contractTitle,
      signedAt,
      downloadUrl,
    })
  } catch {}

  try {
    const ownerId = (updatedRows[0] as any).user_id as string
    const { data: owner } = await supabaseAdmin.auth.admin.getUserById(ownerId)
    const lawyerEmail = owner?.user?.email ?? null
    if (lawyerEmail) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.log("[sign] sendSignatureSignedToLawyerEmail params", {
          to: lawyerEmail,
          contractTitle,
          signerName: typedName || signerNameExpected,
          signerEmail,
          signedAt: signedAt.toISOString(),
          downloadUrl,
        })
      }
      await sendSignatureSignedToLawyerEmail({
        to: lawyerEmail,
        contractTitle,
        signerName: typedName || signerNameExpected,
        signerEmail,
        signedAt,
        downloadUrl,
      })
    }
  } catch {}

  return Response.json({
    success: true,
    signedAt: signedAt.toISOString(),
    downloadUrl,
  })
}

