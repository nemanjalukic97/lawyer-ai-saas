import { getResend } from "@/lib/email/resend"
import { buildDeadlineReminderEmail } from "@/lib/email/deadlineReminderEmail"
import { supabaseAdmin } from "@/lib/supabase/admin"

type RpcDeadlineRow = {
  id: string
  user_id: string
  law_firm_id: string | null
  client_id: string | null
  matter_id: string | null
  title: string
  deadline_type: string
  due_date: string
  reminder_days_before: number
}

export type DeadlineReminderRunResult = {
  sent: number
  errors: Array<{ deadlineId: string; message: string }>
}

type Options = {
  onlyUserId?: string
}

export async function sendDeadlineReminders(options: Options = {}): Promise<DeadlineReminderRunResult> {
  const errors: DeadlineReminderRunResult["errors"] = []
  let sent = 0

  const { data: rows, error: rpcError } = await supabaseAdmin.rpc("get_deadlines_due_for_reminder")
  if (rpcError) {
    return {
      sent: 0,
      errors: [{ deadlineId: "rpc", message: "Failed to load deadlines due for reminder" }],
    }
  }

  const candidates = ((rows ?? []) as RpcDeadlineRow[]).filter((r) =>
    options.onlyUserId ? r.user_id === options.onlyUserId : true
  )

  for (const d of candidates) {
    try {
      // Idempotency guard (best-effort): ensure we only mark as reminded if still not reminded.
      const { data: current, error: loadErr } = await supabaseAdmin
        .from("deadlines")
        .select("id, reminded_at")
        .eq("id", d.id)
        .maybeSingle()
      if (loadErr) throw loadErr
      if (!current) throw new Error("Deadline not found")
      if ((current as any).reminded_at) continue

      const { data: profile, error: profileErr } = await supabaseAdmin
        .from("user_profiles")
        .select("full_name, preferred_language, deleted_at")
        .eq("id", d.user_id)
        .maybeSingle()
      if (profileErr) throw profileErr
      if (!profile || (profile as any).deleted_at) {
        throw new Error("Lawyer profile not found")
      }

      const lawyerName = ((profile as any).full_name as string | null) ?? ""
      const preferredLanguage = ((profile as any).preferred_language as string | null) ?? null

      const { data: owner } = await supabaseAdmin.auth.admin.getUserById(d.user_id)
      const lawyerEmail = owner?.user?.email ?? null
      if (!lawyerEmail) throw new Error("Lawyer email not found")

      let clientName: string | null = null
      if (d.client_id) {
        const { data: c, error: cErr } = await supabaseAdmin
          .from("clients")
          .select("name")
          .eq("id", d.client_id)
          .maybeSingle()
        if (cErr) throw cErr
        clientName = c ? (((c as any).name as string | null) ?? null) : null
      }

      let matterTitle: string | null = null
      let matterNumber: string | null = null
      if (d.matter_id) {
        const { data: m, error: mErr } = await supabaseAdmin
          .from("matters")
          .select("title, matter_number")
          .eq("id", d.matter_id)
          .maybeSingle()
        if (mErr) throw mErr
        matterTitle = m ? (((m as any).title as string | null) ?? null) : null
        matterNumber = m ? (((m as any).matter_number as string | null) ?? null) : null
      }

      const email = buildDeadlineReminderEmail({
        language: preferredLanguage,
        lawyerName: lawyerName || "Legantis user",
        lawyerEmail,
        deadline: {
          id: d.id,
          title: d.title,
          dueDate: d.due_date,
          reminderDaysBefore: Number(d.reminder_days_before ?? 0),
          deadlineType: d.deadline_type as any,
        },
        clientName,
        matterTitle,
        matterNumber,
      })

      const resend = getResend()
      await resend.emails.send({
        from: "Legantis <noreply@legantis.app>",
        to: [lawyerEmail],
        subject: email.subject,
        html: email.html,
        text: email.text,
      })

      const { error: updateErr } = await supabaseAdmin
        .from("deadlines")
        .update({ reminded_at: new Date().toISOString() } as any)
        .eq("id", d.id)
        .is("reminded_at", null)

      if (updateErr) {
        throw new Error("Email sent but failed to update reminded_at")
      }

      sent += 1
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      errors.push({ deadlineId: d.id, message: msg })
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("[deadline-reminders] failed", { deadlineId: d.id, error: err })
      }
      continue
    }
  }

  return { sent, errors }
}

