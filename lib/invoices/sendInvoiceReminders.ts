import { hasFeature, normalizePlanId, resolveSubscriptionTier } from "@/app/dashboard/lib/entitlements"
import { getResend } from "@/lib/email/resend"
import { buildInvoiceReminderEmail } from "@/lib/email/invoiceReminderEmail"
import { supabaseAdmin } from "@/lib/supabase/admin"

type RpcInvoiceRow = {
  invoice_id: string
  user_id: string
  law_firm_id: string | null
  client_id: string
  invoice_number: string
  sent_at: string
  due_date: string | null
  total_amount: number | null
  currency: string | null
  payment_reference: string | null
  bank_account_id: string | null
  reminder_number: number
}

export type InvoiceReminderRunResult = {
  sent: number
  markedOverdue: number
  skippedNotEntitled: number
  errors: Array<{ invoiceId: string; message: string }>
}

type Options = {
  onlyUserId?: string
}

function isReminderNumber(value: unknown): value is 1 | 2 | 3 {
  return value === 1 || value === 2 || value === 3
}

function daysSince(iso: string, now: Date): number {
  const dt = new Date(iso)
  if (Number.isNaN(dt.getTime())) return 0
  const diff = now.getTime() - dt.getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

export async function sendInvoiceReminders(options: Options = {}): Promise<InvoiceReminderRunResult> {
  const errors: InvoiceReminderRunResult["errors"] = []
  let sent = 0
  let markedOverdue = 0
  let skippedNotEntitled = 0

  const { data: rows, error: rpcError } = await supabaseAdmin.rpc("get_invoices_due_for_reminder")
  if (rpcError) {
    return {
      sent: 0,
      markedOverdue: 0,
      skippedNotEntitled: 0,
      errors: [{ invoiceId: "rpc", message: "Failed to load invoices due for reminder" }],
    }
  }

  const candidates = ((rows ?? []) as RpcInvoiceRow[]).filter((r) =>
    options.onlyUserId ? r.user_id === options.onlyUserId : true
  )

  for (const r of candidates) {
    try {
      const invoiceId = r.invoice_id
      const reminderNumber = r.reminder_number
      if (!isReminderNumber(reminderNumber)) {
        throw new Error("Invalid reminder number")
      }

      const reminderField =
        reminderNumber === 1
          ? "reminder_1_sent_at"
          : reminderNumber === 2
            ? "reminder_2_sent_at"
            : "reminder_3_sent_at"

      // Idempotency guard (best-effort): ensure we only mark as reminded if still not reminded.
      const { data: current, error: loadErr } = await supabaseAdmin
        .from("invoices")
        .select(`id, status, sent_at, ${reminderField}`)
        .eq("id", invoiceId)
        .maybeSingle()
      if (loadErr) throw loadErr
      if (!current) throw new Error("Invoice not found")
      if ((current as any)[reminderField]) continue

      const sentAt = ((current as any).sent_at as string | null) ?? r.sent_at ?? null
      if (!sentAt) continue

      // Load lawyer profile (and plan context)
      const { data: profile, error: profileErr } = await supabaseAdmin
        .from("user_profiles")
        .select("id, full_name, preferred_language, subscription_tier, law_firm_id, deleted_at")
        .eq("id", r.user_id)
        .maybeSingle()
      if (profileErr) throw profileErr
      if (!profile || (profile as any).deleted_at) throw new Error("Lawyer profile not found")

      const lawFirmId =
        typeof (profile as any).law_firm_id === "string" ? ((profile as any).law_firm_id as string) : null

      let firmTier: string | null = null
      if (lawFirmId) {
        const { data: firm, error: firmErr } = await supabaseAdmin
          .from("law_firms")
          .select("subscription_tier, deleted_at")
          .eq("id", lawFirmId)
          .maybeSingle()
        if (firmErr) throw firmErr
        if (firm && !(firm as any).deleted_at) {
          firmTier = (firm as any).subscription_tier ?? null
        }
      }

      const rawTier = resolveSubscriptionTier(
        (profile as any).subscription_tier ?? null,
        lawFirmId,
        firmTier
      )
      const planId = normalizePlanId(rawTier)
      if (!hasFeature(planId, "invoice_reminders")) {
        skippedNotEntitled += 1
        continue
      }

      const lawyerName = (((profile as any).full_name as string | null) ?? "").trim() || "Legantis user"
      const lawyerLang = ((profile as any).preferred_language as string | null) ?? null

      const { data: owner } = await supabaseAdmin.auth.admin.getUserById(r.user_id)
      const lawyerEmail = owner?.user?.email ?? null
      if (!lawyerEmail) throw new Error("Lawyer email not found")

      // Load client
      const { data: client, error: clientErr } = await supabaseAdmin
        .from("clients")
        .select("id, name, email, preferred_language, deleted_at")
        .eq("id", r.client_id)
        .maybeSingle()
      if (clientErr) throw clientErr
      if (!client || (client as any).deleted_at) throw new Error("Client not found")

      const clientName = (((client as any).name as string | null) ?? "").trim()
      const clientEmail = ((client as any).email as string | null) ?? null
      if (!clientEmail) throw new Error("Client email not found")

      // Load invoice items
      const { data: items, error: itemsErr } = await supabaseAdmin
        .from("invoice_items")
        .select("description, amount")
        .eq("invoice_id", invoiceId)
        .order("created_at", { ascending: true })
      if (itemsErr) throw itemsErr

      // Bank details: invoice.bank_account_id, else default for scope
      const bankAccountId = typeof r.bank_account_id === "string" ? r.bank_account_id : null

      const bankBaseQuery = supabaseAdmin
        .from("bank_accounts")
        .select("bank_name, iban, account_holder_name, is_default, law_firm_id, id")

      const { data: bankRow, error: bankErr } = bankAccountId
        ? await bankBaseQuery.eq("id", bankAccountId).maybeSingle()
        : (r.law_firm_id ?? lawFirmId)
          ? await bankBaseQuery
              .eq("law_firm_id", (r.law_firm_id ?? lawFirmId) as string)
              .eq("is_default", true)
              .maybeSingle()
          : await bankBaseQuery
              .is("law_firm_id", null)
              .eq("user_id", r.user_id)
              .eq("is_default", true)
              .maybeSingle()
      if (bankErr) throw bankErr

      const language =
        ((client as any).preferred_language as string | null) ??
        lawyerLang ??
        "en"

      const now = new Date()
      const email = buildInvoiceReminderEmail({
        reminderNumber,
        language,
        clientName: clientName || "Client",
        invoiceNumber: r.invoice_number,
        totalAmount: Number(r.total_amount ?? 0),
        currency: (r.currency ?? "EUR") as string,
        dueDate: r.due_date ?? null,
        daysSinceSent: daysSince(sentAt, now),
        lineItems: (items ?? []).map((x: any) => ({
          description: String(x.description ?? ""),
          amount: Number(x.amount ?? 0),
        })),
        bankName: bankRow ? ((bankRow as any).bank_name as string) : null,
        accountHolder: bankRow ? ((bankRow as any).account_holder_name as string) : null,
        iban: bankRow ? ((bankRow as any).iban as string) : null,
        paymentReference: (r.payment_reference ?? r.invoice_number) as string,
        lawyerName,
        lawyerEmail,
      })

      const resend = getResend()
      await resend.emails.send({
        from: "Legantis <noreply@legantis.app>",
        to: [clientEmail],
        subject: email.subject,
        html: email.html,
        text: email.text,
      })

      if (reminderNumber === 3) {
        await resend.emails.send({
          from: "Legantis <noreply@legantis.app>",
          to: [lawyerEmail],
          subject: `Invoice ${r.invoice_number} for ${clientName || "client"} has been marked overdue`,
          html: `
            <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
              <p>Invoice <strong>${escapeHtml(r.invoice_number)}</strong> for <strong>${escapeHtml(clientName || "client")}</strong> has been marked overdue after 14 days.</p>
              <p>Kind regards,<br/>Legantis</p>
            </div>
          `.trim(),
          text: `Invoice ${r.invoice_number} for ${clientName || "client"} has been marked overdue after 14 days.`,
        })
      }

      const updatePatch: Record<string, unknown> = {
        [reminderField]: new Date().toISOString(),
      }
      if (reminderNumber === 3) {
        updatePatch.status = "overdue"
      }

      const { error: updateErr } = await supabaseAdmin
        .from("invoices")
        .update(updatePatch as any)
        .eq("id", invoiceId)
        .is(reminderField, null)

      if (updateErr) {
        throw new Error(`Email sent but failed to update ${reminderField}`)
      }

      sent += 1
      if (reminderNumber === 3) markedOverdue += 1
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      errors.push({ invoiceId: r.invoice_id, message: msg })
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("[invoice-reminders] failed", { invoiceId: r.invoice_id, error: err })
      }
      continue
    }
  }

  return { sent, markedOverdue, skippedNotEntitled, errors }
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

