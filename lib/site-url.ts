import { headers } from "next/headers"

/**
 * Public origin for server-side auth redirects (e.g. Supabase `emailRedirectTo`).
 * Set `NEXT_PUBLIC_SITE_URL` in production so confirmation links use a stable URL.
 */
export async function getSiteUrl(): Promise<string> {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")

  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = (h.get("x-forwarded-proto") ?? "http").split(",")[0].trim()
  if (host) {
    const hostname = host.split(",")[0].trim()
    return `${proto}://${hostname}`
  }

  return "http://localhost:3000"
}
