/**
 * Required env vars (Vercel):
 * - CRON_SECRET
 * - RESEND_API_KEY
 * - SUPABASE_SERVICE_ROLE_KEY
 * - NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL)
 *
 * Dry-run:
 *   GET /api/cron/trial-lifecycle?dry_run=1
 *   or DRY_RUN=1 / DRY_RUN=true
 */

import { runTrialLifecycle } from "@/lib/trials/runTrialLifecycle"

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 })
}

function isDryRun(request: Request): boolean {
  if (process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true") return true
  try {
    const url = new URL(request.url)
    const q = (url.searchParams.get("dry_run") ?? "").toLowerCase()
    return q === "1" || q === "true" || q === "yes"
  } catch {
    return false
  }
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret) return unauthorized()

  const auth = request.headers.get("authorization") ?? ""
  const expected = `Bearer ${secret}`
  if (auth !== expected) return unauthorized()

  const dryRun = isDryRun(request)
  const result = await runTrialLifecycle({ dryRun })
  return Response.json({ dryRun, ...result })
}
