/**
 * Required env vars (Vercel):
 * - CRON_SECRET
 * - RESEND_API_KEY
 * - SUPABASE_SERVICE_ROLE_KEY
 */

import { sendInvoiceReminders } from "@/lib/invoices/sendInvoiceReminders"

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 })
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret) return unauthorized()

  const auth = request.headers.get("authorization") ?? ""
  const expected = `Bearer ${secret}`
  if (auth !== expected) return unauthorized()

  const result = await sendInvoiceReminders()
  return Response.json(result)
}

