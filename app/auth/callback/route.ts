import { type NextRequest, NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

function noStoreRedirect(url: URL) {
  const response = NextResponse.redirect(url, { status: 302 })
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate")
  response.headers.set("Pragma", "no-cache")
  return response
}

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get("code")

  if (!code) {
    const confirmUrl = new URL("/auth/confirm", req.url)
    confirmUrl.search = requestUrl.search
    return noStoreRedirect(confirmUrl)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (!error) {
    return noStoreRedirect(new URL("/auth/confirm?verified=true", req.url))
  }

  const errorCode = encodeURIComponent(error.code ?? "exchange_failed")
  return noStoreRedirect(new URL(`/auth/confirm?error=${errorCode}`, req.url))
}
