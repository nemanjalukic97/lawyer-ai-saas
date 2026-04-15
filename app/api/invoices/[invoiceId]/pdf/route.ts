import { createClient } from "@/lib/supabase/server"
import { generateInvoicePdfBuffer } from "@/lib/pdf/invoicePdf"

type RouteContext = {
  params: Promise<{ invoiceId: string }>
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

export async function GET(_req: Request, ctx: RouteContext) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { invoiceId } = await ctx.params
  if (!invoiceId || !isUuidLike(invoiceId)) {
    return Response.json({ error: "Invalid invoice id" }, { status: 400 })
  }

  // Load invoice
  const { data: invoiceRow, error: invoiceError } = await supabase
    .from("invoices")
    .select(
      "id, user_id, law_firm_id, client_id, invoice_number, issue_date, due_date, notes, currency, subtotal, tax_amount, total_amount, payment_reference, bank_account_id"
    )
    .eq("id", invoiceId)
    .maybeSingle()

  if (invoiceError) {
    return Response.json({ error: "Failed to load invoice" }, { status: 500 })
  }
  if (!invoiceRow) {
    return Response.json({ error: "Invoice not found" }, { status: 404 })
  }

  // Scope check (RLS should handle, but we keep a defense-in-depth check)
  const invoiceUserId =
    typeof (invoiceRow as any).user_id === "string" ? (invoiceRow as any).user_id : null
  const invoiceFirmId =
    typeof (invoiceRow as any).law_firm_id === "string" ? (invoiceRow as any).law_firm_id : null

  if (invoiceUserId !== user.id) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("law_firm_id")
      .eq("id", user.id)
      .is("deleted_at", null)
      .maybeSingle()

    const myFirmId =
      profile && typeof (profile as any).law_firm_id === "string"
        ? ((profile as any).law_firm_id as string)
        : null

    if (!myFirmId || !invoiceFirmId || myFirmId !== invoiceFirmId) {
      return Response.json({ error: "Forbidden" }, { status: 403 })
    }
  }

  // Load client (optional — draft invoices may have no client_id)
  const rawClientId = (invoiceRow as { client_id?: string | null }).client_id
  const { data: clientRow, error: clientError } = rawClientId
    ? await supabase
        .from("clients")
        .select("id, name, address, email")
        .eq("id", rawClientId)
        .maybeSingle()
    : { data: null, error: null }

  if (clientError) {
    return Response.json({ error: "Failed to load client" }, { status: 500 })
  }

  // Load invoice items
  const { data: itemRows, error: itemsError } = await supabase
    .from("invoice_items")
    .select("description, quantity, unit_price, amount")
    .eq("invoice_id", invoiceId)
    .order("created_at", { ascending: true })

  if (itemsError) {
    return Response.json({ error: "Failed to load invoice items" }, { status: 500 })
  }

  // Seller identity (firm if present, else user)
  let sellerName = "Legantis"
  if (invoiceFirmId) {
    const { data: firm } = await supabase
      .from("law_firms")
      .select("name")
      .eq("id", invoiceFirmId)
      .maybeSingle()
    if (firm && typeof (firm as any).name === "string" && (firm as any).name) {
      sellerName = (firm as any).name as string
    }
  } else {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("full_name")
      .eq("id", user.id)
      .is("deleted_at", null)
      .maybeSingle()
    if (profile && typeof (profile as any).full_name === "string" && (profile as any).full_name) {
      sellerName = (profile as any).full_name as string
    }
  }

  // Bank details: invoice.bank_account_id, else default for scope
  const bankAccountId =
    typeof (invoiceRow as any).bank_account_id === "string" ? (invoiceRow as any).bank_account_id : null

  const bankBaseQuery = supabase
    .from("bank_accounts")
    .select("bank_name, iban, account_holder_name, swift_bic, is_default, law_firm_id, id")

  const { data: bankRow } = bankAccountId
    ? await bankBaseQuery.eq("id", bankAccountId).maybeSingle()
    : invoiceFirmId
      ? await bankBaseQuery.eq("law_firm_id", invoiceFirmId).eq("is_default", true).maybeSingle()
      : await bankBaseQuery.is("law_firm_id", null).eq("user_id", user.id).eq("is_default", true).maybeSingle()

  const pdf = generateInvoicePdfBuffer({
    invoice: {
      invoice_number: (invoiceRow as any).invoice_number,
      issue_date: (invoiceRow as any).issue_date ?? null,
      due_date: (invoiceRow as any).due_date ?? null,
      notes: (invoiceRow as any).notes ?? null,
      currency: (invoiceRow as any).currency ?? "EUR",
      subtotal: (invoiceRow as any).subtotal ?? null,
      tax_amount: (invoiceRow as any).tax_amount ?? null,
      total_amount: (invoiceRow as any).total_amount ?? null,
      payment_reference: (invoiceRow as any).payment_reference ?? null,
    },
    items: (itemRows ?? []).map((r: any) => ({
      description: r.description,
      quantity: r.quantity ?? 1,
      unit_price: r.unit_price ?? null,
      amount: r.amount ?? null,
    })),
    seller: { name: sellerName },
    client: {
      name: clientRow ? ((clientRow as any).name as string) : "Client",
      address: clientRow ? ((clientRow as any).address ?? null) : null,
      email: clientRow ? ((clientRow as any).email ?? null) : null,
    },
    bank: bankRow
      ? {
          bank_name: (bankRow as any).bank_name,
          iban: (bankRow as any).iban,
          account_holder_name: (bankRow as any).account_holder_name,
          swift_bic: (bankRow as any).swift_bic ?? null,
        }
      : null,
  })

  const filename = `invoice-${(invoiceRow as any).invoice_number}.pdf`

  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  })
}

