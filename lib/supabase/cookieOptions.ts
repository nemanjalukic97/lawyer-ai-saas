import type { CookieOptionsWithName } from "@supabase/ssr"

/**
 * Auth cookie options for @supabase/ssr createBrowserClient / createServerClient.
 *
 * Configurable via `cookieOptions` (merged over library defaults in @supabase/ssr@0.5.2):
 * - path, sameSite, secure, maxAge, domain, name — yes
 * - httpOnly — technically settable, but MUST stay false: the browser client
 *   reads the session through document.cookie / the SSR cookie storage adapter.
 *   Setting httpOnly: true would break client-side auth.
 *
 * sameSite stays "lax" (library default). "strict" would risk the email-confirm
 * flow: signup PKCE verifier cookies are not sent on cross-site top-level
 * navigations from Gmail/Outlook when SameSite=Strict.
 */
export function getAuthCookieOptions(): CookieOptionsWithName {
  return {
    path: "/",
    sameSite: "lax",
    // Required for browser SDK session reads — do not set true.
    httpOnly: false,
    // Force Secure in production HTTPS deploys; leave unset locally for http://localhost.
    ...(process.env.NODE_ENV === "production" ? { secure: true } : {}),
  }
}
