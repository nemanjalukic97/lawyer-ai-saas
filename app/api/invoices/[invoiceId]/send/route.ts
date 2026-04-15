import { NextRequest } from "next/server"

import { getEntitlementPlanForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { hasFeature } from "@/app/dashboard/lib/entitlements"
import { getResend } from "@/lib/email/resend"
import { generateInvoicePdfBuffer } from "@/lib/pdf/invoicePdf"
import { createClient } from "@/lib/supabase/server"

type RouteContext = {
  params: Promise<{ invoiceId: string }>
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

export async function POST(_req: NextRequest, ctx: RouteContext) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  if (!hasFeature(planId, "invoice_sending")) {
    return Response.json({ error: "Invoice sending is not enabled on your plan" }, { status: 403 })
  }

  const { invoiceId } = await ctx.params
  if (!invoiceId || !isUuidLike(invoiceId)) {
    return Response.json({ error: "Invalid invoice id" }, { status: 400 })
  }

  const { data: invoiceRow, error: invoiceError } = await supabase
    .from("invoices")
    .select(
      "id, user_id, law_firm_id, client_id, invoice_number, issue_date, due_date, notes, currency, subtotal, tax_amount, total_amount, payment_reference, bank_account_id, status"
    )
    .eq("id", invoiceId)
    .maybeSingle()

  if (invoiceError) {
    return Response.json({ error: "Failed to load invoice" }, { status: 500 })
  }
  if (!invoiceRow) {
    return Response.json({ error: "Invoice not found" }, { status: 404 })
  }

  const status = (invoiceRow as any).status as string | null
  if (status === "paid" || status === "cancelled") {
    return Response.json({ error: "This invoice cannot be sent" }, { status: 400 })
  }

  // Load client
  const { data: clientRow, error: clientError } = await supabase
    .from("clients")
    .select("id, name, address, email, preferred_language")
    .eq("id", (invoiceRow as any).client_id)
    .maybeSingle()

  if (clientError) return Response.json({ error: "Failed to load client" }, { status: 500 })
  if (!clientRow) return Response.json({ error: "Client not found" }, { status: 404 })

  const clientEmail = (clientRow as any).email as string | null
  if (!clientEmail) {
    return Response.json({ error: "Client email is missing" }, { status: 400 })
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

  const invoiceFirmId =
    typeof (invoiceRow as any).law_firm_id === "string" ? ((invoiceRow as any).law_firm_id as string) : null

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
    typeof (invoiceRow as any).bank_account_id === "string" ? ((invoiceRow as any).bank_account_id as string) : null

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
      name: (clientRow as any).name as string,
      address: ((clientRow as any).address ?? null) as string | null,
      email: clientEmail,
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

  const invoiceNumber = (invoiceRow as any).invoice_number as string
  const dueDate = (invoiceRow as any).due_date as string | null
  const currency = ((invoiceRow as any).currency ?? "EUR") as string
  const total = Number((invoiceRow as any).total_amount ?? 0)
  const reference = ((invoiceRow as any).payment_reference ?? invoiceNumber) as string

  const subject = `Invoice ${invoiceNumber} from ${sellerName}`
  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <p>Dear ${(clientRow as any).name},</p>
      <p>Please find your invoice <strong>${invoiceNumber}</strong> attached.</p>
      <p><strong>Total:</strong> ${total.toFixed(2)} ${currency}${dueDate ? `<br/><strong>Due:</strong> ${dueDate}` : ""}</p>
      ${bankRow ? `
        <p><strong>Bank transfer details</strong><br/>
        Bank: ${(bankRow as any).bank_name}<br/>
        Account holder: ${(bankRow as any).account_holder_name}<br/>
        IBAN: ${(bankRow as any).iban}<br/>
        Reference: ${reference}
        </p>
      ` : ""}
      <p>Kind regards,<br/>${sellerName}</p>
    </div>
  `.trim()

  const text = [
    `Invoice ${invoiceNumber}`,
    `From: ${sellerName}`,
    `Total: ${total.toFixed(2)} ${currency}`,
    dueDate ? `Due: ${dueDate}` : null,
    bankRow
      ? [
          "",
          "Bank transfer details:",
          `Bank: ${(bankRow as any).bank_name}`,
          `Account holder: ${(bankRow as any).account_holder_name}`,
          `IBAN: ${(bankRow as any).iban}`,
          `Reference: ${reference}`,
        ].join("\n")
      : null,
  ]
    .filter(Boolean)
    .join("\n")

  try {
    const resend = getResend()
    await resend.emails.send({
      from: "Legantis <noreply@legantis.app>",
      to: [clientEmail],
      subject,
      html,
      text,
      attachments: [
        {
          filename: `invoice-${invoiceNumber}.pdf`,
          content: pdf.toString("base64"),
          contentType: "application/pdf",
        },
      ],
    })
  } catch (err) {
    console.error("Invoice send error:", err)
    return Response.json({ error: "Failed to send invoice email" }, { status: 500 })
  }

  const { error: updateError } = await supabase
    .from("invoices")
    .update(
      {
        status: "sent",
        sent_at: new Date().toISOString(),
      } as never
    )
    .eq("id", invoiceId)

  if (updateError) {
    return Response.json({ error: "Email sent but failed to update invoice" }, { status: 500 })
  }

  return Response.json({ success: true })
}

