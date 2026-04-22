/**
 * Required env vars (Vercel):
 * - CRON_SECRET
 * - RESEND_API_KEY
 * - SUPABASE_SERVICE_ROLE_KEY
 * - NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL)
 */

import { sendDeadlineReminders } from "@/lib/deadlines/sendDeadlineReminders"

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 })
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret) return unauthorized()

  const auth = request.headers.get("authorization") ?? ""
  const expected = `Bearer ${secret}`
  if (auth !== expected) return unauthorized()

  const result = await sendDeadlineReminders()
  return Response.json(result)
}

