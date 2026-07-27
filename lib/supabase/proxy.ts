import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import { getAuthCookieOptions } from "./cookieOptions"
import type { Database } from "./types"

function getKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/** Private authenticated UI — never store in browser/shared-machine caches. */
const DASHBOARD_CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
}

function applyDashboardCacheHeaders(
  response: NextResponse,
  pathname: string
): NextResponse {
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    for (const [key, value] of Object.entries(DASHBOARD_CACHE_HEADERS)) {
      response.headers.set(key, value)
    }
  }
  return response
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getKey(),
    {
      cookieOptions: getAuthCookieOptions(),
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  if (user && (pathname === "/login" || pathname === "/signup")) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = "/dashboard"
    dashboardUrl.search = ""
    const redirectResponse = NextResponse.redirect(dashboardUrl)
    supabaseResponse.cookies.getAll().forEach(({ name, value }) => {
      redirectResponse.cookies.set(name, value)
    })
    return applyDashboardCacheHeaders(redirectResponse, dashboardUrl.pathname)
  }

  return applyDashboardCacheHeaders(supabaseResponse, pathname)
}

