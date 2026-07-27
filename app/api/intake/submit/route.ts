import { NextResponse } from "next/server"

import { supabaseAdmin } from "@/lib/supabase/admin"
import type { Json } from "@/lib/supabase/types"

type SubmitBody = {
  form_id?: unknown
  user_id?: unknown
  data?: unknown
}

function getRequestIp(request: Request): string {
  const xf = request.headers.get("x-forwarded-for")
  if (xf) return xf.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

/** Per form+IP rolling hour. High enough for retries/double-submit; low enough to stop floods. */
const INTAKE_SUBMIT_LIMIT_PER_FORM_IP = 15

export async function POST(request: Request) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    )
  }

  let body: SubmitBody
  try {
    body = (await request.json()) as SubmitBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const formId = typeof body.form_id === "string" ? body.form_id : null
  const clientUserId = typeof body.user_id === "string" ? body.user_id : null
  const payload = body.data

  if (!formId || !clientUserId) {
    return NextResponse.json(
      { error: "Missing or invalid form_id or user_id." },
      { status: 400 }
    )
  }

  if (
    payload === undefined ||
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return NextResponse.json({ error: "data must be a JSON object." }, { status: 400 })
  }

  // Rate limit (mirrors signature_request_attempts): per form_id + IP, 15/hour
  const ip = getRequestIp(request)
  const ua = request.headers.get("user-agent") ?? ""
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  await supabaseAdmin.from("intake_submit_attempts").insert({
    form_id: formId,
    ip,
    user_agent: ua,
  } as any)

  const { count: attemptCount } = await supabaseAdmin
    .from("intake_submit_attempts")
    .select("id", { count: "exact", head: true })
    .eq("form_id", formId)
    .eq("ip", ip)
    .gt("created_at", since)

  if ((attemptCount ?? 0) > INTAKE_SUBMIT_LIMIT_PER_FORM_IP) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    )
  }

  const { data: form, error: formError } = await supabaseAdmin
    .from("intake_forms")
    .select("id, user_id, is_active")
    .eq("id", formId)
    .maybeSingle()

  if (formError) {
    return NextResponse.json({ error: "Could not verify intake form." }, { status: 500 })
  }
  if (!form) {
    return NextResponse.json({ error: "Form not found." }, { status: 404 })
  }
  if (!form.is_active) {
    return NextResponse.json({ error: "This form is not accepting submissions." }, { status: 400 })
  }
  if (form.user_id !== clientUserId) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 })
  }

  const { error: insertError } = await supabaseAdmin.from("intake_submissions").insert({
    form_id: formId,
    user_id: form.user_id,
    data: payload as Json,
    status: "pending",
  })

  if (insertError) {
    return NextResponse.json(
      { error: insertError.message || "Could not save submission." },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
