"use server"

import { createClient } from "@/lib/supabase/server"
import { sendDeadlineReminders } from "@/lib/deadlines/sendDeadlineReminders"

export async function sendTestDeadlineReminders() {
  if (process.env.NODE_ENV === "production") {
    return { sent: 0, errors: [{ deadlineId: "env", message: "Not available in production" }] }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { sent: 0, errors: [{ deadlineId: "auth", message: "Unauthorized" }] }
  }

  // Restrict to current user to avoid spamming in development.
  return await sendDeadlineReminders({ onlyUserId: user.id })
}

