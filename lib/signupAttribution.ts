export const SIGNUP_ATTRIBUTION_COOKIE = "legantis-signup-attribution"
export const SIGNUP_ATTRIBUTION_STORAGE_KEY = "legantis-signup-attribution"

const MAX_LEN = 200

export type SignupAttribution = {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  referrer_host: string | null
  landing_path: string | null
}

function clip(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX_LEN)
}

function sanitizeUtm(value: unknown): string | null {
  if (typeof value !== "string") return null
  const next = clip(value)
  return next || null
}

export function sanitizeReferrerHost(value: unknown): string | null {
  if (typeof value !== "string") return null
  let host = clip(value).toLowerCase()
  if (!host) return null
  try {
    if (host.includes("://")) {
      host = new URL(host).hostname.toLowerCase()
    }
  } catch {
    return null
  }
  host = host.replace(/:\d+$/, "")
  if (host === "localhost") return "localhost"
  if (host.includes("..") || host.includes("/") || host.includes("?")) return null
  if (!/^[a-z0-9](?:[a-z0-9.-]{0,251}[a-z0-9])?$/.test(host)) return null
  return host
}

export function sanitizeLandingPath(value: unknown): string | null {
  if (typeof value !== "string") return null
  let path = value.trim()
  if (!path.startsWith("/")) return null
  path = path.split("?")[0]?.split("#")[0] ?? path
  if (!path.startsWith("/") || path.includes("//") || path.includes("\\")) {
    return null
  }
  path = clip(path)
  return path || null
}

function emptyAttribution(): SignupAttribution {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    referrer_host: null,
    landing_path: null,
  }
}

function hasAnyValue(payload: SignupAttribution): boolean {
  return Object.values(payload).some((value) => value != null && value !== "")
}

export function parseSignupAttribution(raw: unknown): SignupAttribution | null {
  let value: unknown = raw
  if (typeof value === "string") {
    const trimmed = value.trim()
    if (!trimmed) return null
    try {
      value = JSON.parse(trimmed)
    } catch {
      try {
        value = JSON.parse(decodeURIComponent(trimmed))
      } catch {
        return null
      }
    }
  }
  if (!value || typeof value !== "object") return null
  const rec = value as Record<string, unknown>
  const payload: SignupAttribution = {
    utm_source: sanitizeUtm(rec.utm_source),
    utm_medium: sanitizeUtm(rec.utm_medium),
    utm_campaign: sanitizeUtm(rec.utm_campaign),
    utm_content: sanitizeUtm(rec.utm_content),
    utm_term: sanitizeUtm(rec.utm_term),
    referrer_host: sanitizeReferrerHost(rec.referrer_host),
    landing_path: sanitizeLandingPath(rec.landing_path),
  }
  return hasAnyValue(payload) ? payload : null
}

function shouldSkipPath(pathname: string): boolean {
  if (pathname.startsWith("/_next")) return true
  if (pathname.startsWith("/api")) return true
  const last = pathname.split("/").pop() ?? ""
  return last.includes(".")
}

function readSessionPayload(): SignupAttribution | null {
  try {
    return parseSignupAttribution(
      sessionStorage.getItem(SIGNUP_ATTRIBUTION_STORAGE_KEY),
    )
  } catch {
    return null
  }
}

function readCookiePayload(): SignupAttribution | null {
  try {
    const escaped = SIGNUP_ATTRIBUTION_COOKIE.replace(
      /([.$?*|{}()[\]\\/+^])/g,
      "\\$1",
    )
    const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`))
    if (!match?.[1]) return null
    return parseSignupAttribution(decodeURIComponent(match[1]))
  } catch {
    return null
  }
}

function writeCookie(payload: SignupAttribution): void {
  const encoded = encodeURIComponent(JSON.stringify(payload))
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${SIGNUP_ATTRIBUTION_COOKIE}=${encoded}; Path=/; SameSite=Lax${secure}`
}

function collectFromLocation(): SignupAttribution | null {
  const pathname = window.location.pathname
  if (shouldSkipPath(pathname)) return null

  const params = new URLSearchParams(window.location.search)
  let referrerHost: string | null = null
  const referrer = document.referrer
  if (referrer) {
    try {
      referrerHost = sanitizeReferrerHost(new URL(referrer).hostname)
    } catch {
      referrerHost = null
    }
  }

  const payload: SignupAttribution = {
    utm_source: sanitizeUtm(params.get("utm_source")),
    utm_medium: sanitizeUtm(params.get("utm_medium")),
    utm_campaign: sanitizeUtm(params.get("utm_campaign")),
    utm_content: sanitizeUtm(params.get("utm_content")),
    utm_term: sanitizeUtm(params.get("utm_term")),
    referrer_host: referrerHost,
    landing_path: sanitizeLandingPath(pathname),
  }
  return hasAnyValue(payload) ? payload : emptyAttribution()
}

/** First touch wins. Safe to call more than once; later visits are ignored. */
export function captureSignupAttribution(): void {
  if (typeof window === "undefined") return
  if (readSessionPayload() || readCookiePayload()) return

  const payload = collectFromLocation()
  if (!payload || !hasAnyValue(payload)) return

  try {
    sessionStorage.setItem(
      SIGNUP_ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(payload),
    )
  } catch {
    // private mode / quota — cookie is the server-facing copy
  }
  writeCookie(payload)
}
