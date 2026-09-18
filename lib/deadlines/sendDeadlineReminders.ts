import { getResend } from "@/lib/email/resend"
import { buildDeadlineReminderEmail } from "@/lib/email/deadlineReminderEmail"
import { supabaseAdmin } from "@/lib/supabase/admin"
import type { Database } from "@/lib/supabase/types"

export const REMINDER_KIND_DAYS = { "7d": 7, "1d": 1 } as const
export type DeadlineReminderKind = keyof typeof REMINDER_KIND_DAYS

export function isDeadlineReminderKind(value: unknown): value is DeadlineReminderKind {
  return value === "7d" || value === "1d"
}

type DeadlineType = Database["public"]["Enums"]["deadline_type"]

export type RpcDeadlineRow = {
  id: string
  user_id: string
  law_firm_id: string | null
  client_id: string | null
  matter_id: string | null
  title: string
  deadline_type: string
  due_date: string
  reminder_kind: DeadlineReminderKind
}

export type DeadlineReminderRunResult = {
  sent: number
  errors: Array<{ deadlineId: string; message: string }>
}

export type DeadlineReminderEmailPayload = {
  to: string
  subject: string
  html: string
  text: string
}

export type SendDeadlineRemindersDeps = {
  listDue: () => Promise<RpcDeadlineRow[]>
  wasSent: (deadlineId: string, kind: DeadlineReminderKind) => Promise<boolean>
  markSent: (deadlineId: string, kind: DeadlineReminderKind) => Promise<void>
  sendEmail: (payload: DeadlineReminderEmailPayload) => Promise<void>
  getLawyer: (
    userId: string
  ) => Promise<{ fullName: string; email: string; language: string | null } | null>
  getClientName: (clientId: string) => Promise<string | null>
  getMatter: (
    matterId: string
  ) => Promise<{ title: string | null; matterNumber: string | null } | null>
}

function isUniqueViolation(err: unknown): boolean {
  if (!err || typeof err !== "object") return false
  const code = (err as { code?: unknown }).code
  return code === "23505"
}

async function markSentWithRetry(
  markSent: SendDeadlineRemindersDeps["markSent"],
  deadlineId: string,
  kind: DeadlineReminderKind
): Promise<void> {
  let lastErr: unknown
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await markSent(deadlineId, kind)
      return
    } catch (err) {
      if (isUniqueViolation(err)) return
      lastErr = err
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, 40 * attempt))
      }
    }
  }
  throw lastErr instanceof Error
    ? lastErr
    : new Error("Failed to record reminder send")
}

export function createProductionDeadlineReminderDeps(): SendDeadlineRemindersDeps {
  return {
    async listDue() {
      const { data, error } = await supabaseAdmin.rpc("get_deadlines_due_for_reminder")
      if (error) {
        throw new Error("Failed to load deadlines due for reminder")
      }
      const rows = (data ?? []) as Array<Record<string, unknown>>
      const parsed: RpcDeadlineRow[] = []
      for (const r of rows) {
        if (!isDeadlineReminderKind(r.reminder_kind)) {
          throw new Error(
            "get_deadlines_due_for_reminder did not return reminder_kind — apply 20260918140100_deadline_reminder_sends.sql before this worker runs"
          )
        }
        parsed.push({
          id: String(r.id),
          user_id: String(r.user_id),
          law_firm_id: (r.law_firm_id as string | null) ?? null,
          client_id: (r.client_id as string | null) ?? null,
          matter_id: (r.matter_id as string | null) ?? null,
          title: String(r.title),
          deadline_type: String(r.deadline_type),
          due_date: String(r.due_date),
          reminder_kind: r.reminder_kind,
        })
      }
      return parsed
    },
    async wasSent(deadlineId, kind) {
      const { data, error } = await supabaseAdmin
        .from("deadline_reminder_sends")
        .select("deadline_id")
        .eq("deadline_id", deadlineId)
        .eq("kind", kind)
        .maybeSingle()
      if (error) throw error
      return Boolean(data)
    },
    async markSent(deadlineId, kind) {
      const { error } = await supabaseAdmin.from("deadline_reminder_sends").insert({
        deadline_id: deadlineId,
        kind,
      })
      if (error) throw error
    },
    async sendEmail(payload) {
      const resend = getResend()
      const { error } = await resend.emails.send({
        from: "Legantis <noreply@legantis.app>",
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      })
      if (error) {
        throw new Error(error.message || "Resend rejected the email")
      }
    },
    async getLawyer(userId) {
      const { data: profile, error: profileErr } = await supabaseAdmin
        .from("user_profiles")
        .select("full_name, preferred_language, deleted_at")
        .eq("id", userId)
        .maybeSingle()
      if (profileErr) throw profileErr
      if (!profile || (profile as { deleted_at?: string | null }).deleted_at) {
        return null
      }
      const { data: owner } = await supabaseAdmin.auth.admin.getUserById(userId)
      const email = owner?.user?.email ?? null
      if (!email) return null
      return {
        fullName: ((profile as { full_name?: string | null }).full_name as string | null) || "Legantis user",
        email,
        language: ((profile as { preferred_language?: string | null }).preferred_language as string | null) ?? null,
      }
    },
    async getClientName(clientId) {
      const { data, error } = await supabaseAdmin
        .from("clients")
        .select("name")
        .eq("id", clientId)
        .maybeSingle()
      if (error) throw error
      return data ? (((data as { name?: string | null }).name as string | null) ?? null) : null
    },
    async getMatter(matterId) {
      const { data, error } = await supabaseAdmin
        .from("matters")
        .select("title, matter_number")
        .eq("id", matterId)
        .maybeSingle()
      if (error) throw error
      if (!data) return null
      const row = data as { title?: string | null; matter_number?: string | null }
      return {
        title: row.title ?? null,
        matterNumber: row.matter_number ?? null,
      }
    },
  }
}

type Options = {
  onlyUserId?: string
  deps?: SendDeadlineRemindersDeps
}

export async function sendDeadlineReminders(
  options: Options = {}
): Promise<DeadlineReminderRunResult> {
  const errors: DeadlineReminderRunResult["errors"] = []
  let sent = 0
  const deps = options.deps ?? createProductionDeadlineReminderDeps()

  let candidates: RpcDeadlineRow[]
  try {
    candidates = await deps.listDue()
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load deadlines due for reminder"
    console.error("[deadline-reminders] rpc failed", { error: err })
    return { sent: 0, errors: [{ deadlineId: "rpc", message }] }
  }

  const filtered = options.onlyUserId
    ? candidates.filter((r) => r.user_id === options.onlyUserId)
    : candidates

  for (const d of filtered) {
    try {
      const already = await deps.wasSent(d.id, d.reminder_kind)
      if (already) continue

      const lawyer = await deps.getLawyer(d.user_id)
      if (!lawyer) {
        throw new Error("Lawyer profile or email not found")
      }

      let clientName: string | null = null
      if (d.client_id) {
        clientName = await deps.getClientName(d.client_id)
      }

      let matterTitle: string | null = null
      let matterNumber: string | null = null
      if (d.matter_id) {
        const matter = await deps.getMatter(d.matter_id)
        matterTitle = matter?.title ?? null
        matterNumber = matter?.matterNumber ?? null
      }

      const days = REMINDER_KIND_DAYS[d.reminder_kind]
      const email = buildDeadlineReminderEmail({
        language: lawyer.language,
        lawyerName: lawyer.fullName,
        lawyerEmail: lawyer.email,
        deadline: {
          id: d.id,
          title: d.title,
          dueDate: d.due_date,
          reminderDaysBefore: days,
          deadlineType: d.deadline_type as DeadlineType,
        },
        clientName,
        matterTitle,
        matterNumber,
      })

      await deps.sendEmail({
        to: lawyer.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
      })

      // Record only after a successful send. A failed send must not write a row,
      // so the same kind is eligible again tomorrow.
      try {
        await markSentWithRetry(deps.markSent, d.id, d.reminder_kind)
      } catch (recordErr) {
        const recordMsg =
          recordErr instanceof Error ? recordErr.message : "Unknown error"
        console.error("[deadline-reminders] email sent but failed to record", {
          deadlineId: d.id,
          kind: d.reminder_kind,
          error: recordErr,
        })
        errors.push({
          deadlineId: d.id,
          message: `Email sent but failed to record ${d.reminder_kind}: ${recordMsg}`,
        })
        continue
      }

      sent += 1
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      console.error("[deadline-reminders] failed", {
        deadlineId: d.id,
        kind: d.reminder_kind,
        error: err,
      })
      errors.push({ deadlineId: d.id, message: msg })
      continue
    }
  }

  return { sent, errors }
}
