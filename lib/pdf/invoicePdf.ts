import { jsPDF } from "jspdf"

type Money = { amount: number; currency: string }

function formatMoney({ amount, currency }: Money): string {
  const value = Number.isFinite(amount) ? amount : 0
  const c = currency || "EUR"
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: c,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  } catch {
    return `${value.toFixed(2)} ${c}`
  }
}

function safeText(input: unknown): string {
  if (typeof input === "string") return input
  if (input == null) return ""
  return String(input)
}

export type InvoicePdfData = {
  invoice: {
    invoice_number: string
    issue_date: string | null
    due_date: string | null
    notes: string | null
    currency: string | null
    subtotal: number | null
    tax_amount: number | null
    total_amount: number | null
    payment_reference: string | null
  }
  items: Array<{
    description: string
    quantity: number | null
    unit_price: number | null
    amount: number | null
  }>
  seller: {
    name: string
    address?: string | null
  }
  client: {
    name: string
    address?: string | null
    email?: string | null
  }
  bank: {
    bank_name: string
    iban: string
    account_holder_name: string
    swift_bic?: string | null
  } | null
}

export function generateInvoicePdfBuffer(data: InvoicePdfData): Buffer {
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 48
  let y = margin

  const title = `Invoice ${safeText(data.invoice.invoice_number)}`
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.text(title, margin, y)
  y += 22

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(80)
  doc.text(safeText(data.seller.name), margin, y)
  y += 14
  if (data.seller.address) {
    doc.text(safeText(data.seller.address), margin, y)
    y += 14
  }

  doc.setTextColor(30)
  y += 8

  const rightX = pageWidth - margin
  const issue = data.invoice.issue_date ? `Issue date: ${data.invoice.issue_date}` : ""
  const due = data.invoice.due_date ? `Due date: ${data.invoice.due_date}` : ""
  doc.setFontSize(10)
  if (issue) doc.text(issue, rightX, margin + 4, { align: "right" })
  if (due) doc.text(due, rightX, margin + 18, { align: "right" })

  y += 18

  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("Bill to", margin, y)
  y += 16
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(safeText(data.client.name), margin, y)
  y += 14
  if (data.client.address) {
    doc.text(safeText(data.client.address), margin, y)
    y += 14
  }

  y += 12
  doc.setDrawColor(220)
  doc.line(margin, y, pageWidth - margin, y)
  y += 18

  // Line items (simple table)
  doc.setFont("helvetica", "bold")
  doc.text("Description", margin, y)
  doc.text("Qty", pageWidth - margin - 140, y, { align: "right" })
  doc.text("Amount", pageWidth - margin, y, { align: "right" })
  y += 12
  doc.setFont("helvetica", "normal")
  doc.setTextColor(60)
  doc.line(margin, y, pageWidth - margin, y)
  doc.setTextColor(30)
  y += 14

  const currency = data.invoice.currency ?? "EUR"
  for (const item of data.items) {
    const desc = safeText(item.description)
    const qty = Number(item.quantity ?? 1)
    const amount = Number(item.amount ?? 0)

    const wrapped = doc.splitTextToSize(desc, pageWidth - margin * 2 - 180)
    doc.text(wrapped, margin, y)
    doc.text(String(Number.isFinite(qty) ? qty : 1), pageWidth - margin - 140, y, {
      align: "right",
    })
    doc.text(formatMoney({ amount, currency }), pageWidth - margin, y, {
      align: "right",
    })
    y += 14 + (wrapped.length - 1) * 12
    if (y > 740) {
      doc.addPage()
      y = margin
    }
  }

  y += 8
  doc.setDrawColor(220)
  doc.line(margin, y, pageWidth - margin, y)
  y += 18

  const subtotal = Number(data.invoice.subtotal ?? 0)
  const tax = Number(data.invoice.tax_amount ?? 0)
  const total = Number(data.invoice.total_amount ?? subtotal + tax)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text("Subtotal", pageWidth - margin - 140, y, { align: "right" })
  doc.text(formatMoney({ amount: subtotal, currency }), pageWidth - margin, y, { align: "right" })
  y += 14
  doc.text("Tax", pageWidth - margin - 140, y, { align: "right" })
  doc.text(formatMoney({ amount: tax, currency }), pageWidth - margin, y, { align: "right" })
  y += 16

  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("Total", pageWidth - margin - 140, y, { align: "right" })
  doc.text(formatMoney({ amount: total, currency }), pageWidth - margin, y, { align: "right" })
  y += 22

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)

  if (data.bank) {
    doc.setFont("helvetica", "bold")
    doc.text("Payment instructions (bank transfer)", margin, y)
    y += 14
    doc.setFont("helvetica", "normal")
    doc.text(`Bank: ${safeText(data.bank.bank_name)}`, margin, y)
    y += 14
    doc.text(`Account holder: ${safeText(data.bank.account_holder_name)}`, margin, y)
    y += 14
    doc.text(`IBAN: ${safeText(data.bank.iban)}`, margin, y)
    y += 14
    if (data.bank.swift_bic) {
      doc.text(`SWIFT/BIC: ${safeText(data.bank.swift_bic)}`, margin, y)
      y += 14
    }
    const reference = data.invoice.payment_reference || data.invoice.invoice_number
    doc.text(`Reference: ${safeText(reference)}`, margin, y)
    y += 18
  }

  if (data.invoice.notes) {
    doc.setFont("helvetica", "bold")
    doc.text("Notes", margin, y)
    y += 14
    doc.setFont("helvetica", "normal")
    const wrappedNotes = doc.splitTextToSize(
      safeText(data.invoice.notes),
      pageWidth - margin * 2
    )
    doc.text(wrappedNotes, margin, y)
    y += wrappedNotes.length * 12 + 8
  }

  const arrayBuffer = doc.output("arraybuffer")
  return Buffer.from(arrayBuffer)
}

