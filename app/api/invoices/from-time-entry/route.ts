import { NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"

type Body = {
  timeEntryId?: string
  dueDate?: string
  notes?: string | null
  paymentReference?: string
  bankAccountId?: string
}

function extractMatterName(notes: string | null): string {
  if (!notes) return "Matter"
  const match = notes.match(/^Matter:\s*(.+?)\s*\|\s*Work:/i)
  return match?.[1]?.trim() ?? "Matter"
}

function extractWorkDescription(notes: string | null): string {
  if (!notes) return ""
  const match = notes.match(/\|\s*Work:\s*(.+)$/i)
  return match?.[1]?.trim() ?? notes
}

function buildLineDescription(notes: string | null): string {
  const matter = extractMatterName(notes)
  const work = extractWorkDescription(notes)
  if (work) return `${matter} — ${work}`
  return matter
}

function randomRefPart(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let s = ""
  for (let i = 0; i < 6; i++) {
    s += chars[Math.floor(Math.random() * chars.length)]
  }
  return s
}

async function uniqueInvoiceNumber(
  supabase: Awaited<ReturnType<typeof createClient>>,
  year: number
): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = `INV-${year}-${randomRefPart()}`
    const { data } = await supabase
      .from("invoices")
      .select("id")
      .eq("invoice_number", candidate)
      .maybeSingle()
    if (!data) return candidate
  }
  return `INV-${year}-${Date.now().toString(36).toUpperCase()}`
}

async function getLawFirmId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
): Promise<string | null> {
  const { data } = await supabase
    .from("user_profiles")
    .select("law_firm_id")
    .eq("id", userId)
    .is("deleted_at", null)
    .maybeSingle()
  if (!data || typeof data !== "object") return null
  const v = (data as { law_firm_id?: string | null }).law_firm_id
  return typeof v === "string" ? v : null
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    let body: Body
    try {
      body = (await req.json()) as Body
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 })
    }

    const timeEntryId = typeof body.timeEntryId === "string" ? body.timeEntryId.trim() : ""
    const dueDate = typeof body.dueDate === "string" ? body.dueDate.trim() : ""
    const paymentReference =
      typeof body.paymentReference === "string" ? body.paymentReference.trim() : ""
    const bankAccountId =
      typeof body.bankAccountId === "string" ? body.bankAccountId.trim() : ""
    const notesExtra =
      typeof body.notes === "string" && body.notes.trim() !== ""
        ? body.notes.trim()
        : null

    if (!timeEntryId || !dueDate || !paymentReference || !bankAccountId) {
      return Response.json(
        { error: "Missing timeEntryId, dueDate, paymentReference, or bankAccountId" },
        { status: 400 }
      )
    }

    const due = new Date(`${dueDate}T12:00:00.000Z`)
    if (Number.isNaN(due.getTime())) {
      return Response.json({ error: "Invalid due date" }, { status: 400 })
    }

    const profileFirmId = await getLawFirmId(supabase, user.id)

    const { data: entry, error: entryError } = await supabase
      .from("time_entries")
      .select(
        "id, user_id, law_firm_id, client_id, matter_id, work_date, duration_minutes, hourly_rate, amount, status, notes, activity_type"
      )
      .eq("id", timeEntryId)
      .maybeSingle()

    if (entryError) {
      return Response.json({ error: "Failed to load time entry" }, { status: 500 })
    }
    if (!entry) {
      return Response.json({ error: "Time entry not found" }, { status: 404 })
    }

    const row = entry as Record<string, unknown>
    if (row.user_id !== user.id) {
      return Response.json({ error: "Forbidden" }, { status: 403 })
    }

    if (row.status === "billed") {
      return Response.json({ error: "This time entry is already billed" }, { status: 400 })
    }

    const { data: bankRow, error: bankError } = await supabase
      .from("bank_accounts")
      .select("id")
      .eq("id", bankAccountId)
      .maybeSingle()

    if (bankError) {
      return Response.json({ error: "Failed to verify bank account" }, { status: 500 })
    }
    if (!bankRow) {
      return Response.json({ error: "Bank account not found" }, { status: 400 })
    }

    const durationMinutes = Number(row.duration_minutes ?? 0)
    const hourlyRate = Number(row.hourly_rate ?? 0)
    const amount = Number(row.amount ?? 0)
    const lineDescription = buildLineDescription(
      typeof row.notes === "string" ? row.notes : null
    )
    const quantity = durationMinutes / 60

    const lawFirmId =
      (typeof row.law_firm_id === "string" ? row.law_firm_id : null) ?? profileFirmId
    const clientId =
      typeof row.client_id === "string" ? row.client_id : null
    const matterId =
      typeof row.matter_id === "string" ? row.matter_id : null

    const now = new Date()
    const year = now.getFullYear()
    const issueDate = `${year}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`

    const invoiceNumber = await uniqueInvoiceNumber(supabase, year)

    const combinedNotes = notesExtra
      ? [notesExtra].filter(Boolean).join("\n\n")
      : null

    const invoicePayload = {
      user_id: user.id,
      law_firm_id: lawFirmId,
      client_id: clientId,
      matter_id: matterId,
      invoice_number: invoiceNumber,
      issue_date: issueDate,
      due_date: dueDate,
      notes: combinedNotes,
      status: "draft" as const,
      currency: "EUR",
      subtotal: amount,
      tax_amount: 0,
      total_amount: amount,
      payment_reference: paymentReference,
      bank_account_id: bankAccountId,
    }

    const { data: invoice, error: invErr } = await supabase
      .from("invoices")
      .insert(invoicePayload as never)
      .select("id")
      .single()

    if (invErr || !invoice) {
      console.error("from-time-entry invoice insert:", invErr)
      return Response.json({ error: "Failed to create invoice" }, { status: 500 })
    }

    const invoiceId = (invoice as { id: string }).id

    const itemPayload = {
      invoice_id: invoiceId,
      description: lineDescription,
      quantity,
      unit_price: hourlyRate,
    }

    const { error } = await supabase
      .from("invoice_items")
      .insert(itemPayload as never)

    if (error) {
      console.error(
        "Invoice items insert error:",
        JSON.stringify(error, null, 2),
        error?.message,
        error?.code,
        error?.details,
        error?.hint
      )
      await supabase.from("invoices").delete().eq("id", invoiceId)
      return Response.json(
        {
          error: "Failed to create invoice line",
          details: error?.message,
          code: error?.code,
          hint: error?.hint,
        },
        { status: 500 }
      )
    }

    const timeUpdate = {
      status: "billed" as const,
      invoice_id: invoiceId,
    }

    const { error: updErr } = await supabase
      .from("time_entries")
      .update(timeUpdate as never)
      .eq("id", timeEntryId)
      .eq("user_id", user.id)

    if (updErr) {
      console.error("from-time-entry time entry update:", updErr)
      return Response.json({ error: "Invoice created but failed to update time entry" }, { status: 500 })
    }

    return Response.json({ invoiceId, invoiceNumber })
  } catch (e) {
    console.error("from-time-entry:", e)
    return Response.json({ error: "Unexpected error" }, { status: 500 })
  }
}
