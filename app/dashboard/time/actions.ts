"use server"

import { createClient } from "@/lib/supabase/server"
import { sendInvoiceReminders } from "@/lib/invoices/sendInvoiceReminders"

export async function sendTestInvoiceReminders() {
  if (process.env.NODE_ENV === "production") {
    return {
      sent: 0,
      markedOverdue: 0,
      skippedNotEntitled: 0,
      errors: [{ invoiceId: "env", message: "Not available in production" }],
    }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return {
      sent: 0,
      markedOverdue: 0,
      skippedNotEntitled: 0,
      errors: [{ invoiceId: "auth", message: "Unauthorized" }],
    }
  }

  // Restrict to current user to avoid spamming in development.
  return await sendInvoiceReminders({ onlyUserId: user.id })
}

