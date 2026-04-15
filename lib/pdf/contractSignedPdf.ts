import { jsPDF } from "jspdf"

function safeText(input: unknown): string {
  if (typeof input === "string") return input
  if (input == null) return ""
  return String(input)
}

function formatDateTime(value: Date): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(value)
  } catch {
    return value.toISOString()
  }
}

export type SignedContractPdfInput = {
  contractTitle: string
  contractContent: string
  signerName: string
  signerEmail: string
  signedAt: Date
  signerIp: string
  verificationToken: string
}

export function generateSignedContractPdfBuffer(input: SignedContractPdfInput): Buffer {
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 48
  const maxWidth = pageWidth - margin * 2

  const lineHeight = 14
  const bottom = pageHeight - margin
  let y = margin

  const ensureSpace = (needed: number) => {
    if (y + needed <= bottom) return
    doc.addPage()
    y = margin
  }

  // Title
  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  const titleLines = doc.splitTextToSize(safeText(input.contractTitle), maxWidth)
  ensureSpace(titleLines.length * 18)
  doc.text(titleLines, margin, y)
  y += titleLines.length * 18 + 8

  // Body
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.setTextColor(20)

  const paragraphs = safeText(input.contractContent)
    .replace(/\r\n/g, "\n")
    .split("\n")

  for (const p of paragraphs) {
    const trimmed = p.trimEnd()
    if (!trimmed) {
      y += lineHeight
      ensureSpace(lineHeight * 2)
      continue
    }
    const lines = doc.splitTextToSize(trimmed, maxWidth)
    for (const line of lines) {
      ensureSpace(lineHeight * 2)
      doc.text(line, margin, y)
      y += lineHeight
    }
    y += lineHeight * 0.5
  }

  // Signature certificate block
  const signedAtText = formatDateTime(input.signedAt)
  const certLines = [
    "----------------------------------------",
    "ELECTRONIC SIGNATURE CERTIFICATE",
    "----------------------------------------",
    `Document: ${safeText(input.contractTitle)}`,
    `Signed by: ${safeText(input.signerName)} <${safeText(input.signerEmail)}>`,
    `Date: ${signedAtText}`,
    `IP Address: ${safeText(input.signerIp)}`,
    `Verification ID: ${safeText(input.verificationToken)}`,
    "----------------------------------------",
    "This document was signed electronically via Legantis (legantis.app). This constitutes a valid electronic signature under applicable local law and EU eIDAS regulation.",
    "----------------------------------------",
  ]

  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.setTextColor(60)

  ensureSpace(lineHeight * 2)
  y += 10

  for (const raw of certLines) {
    const lines = doc.splitTextToSize(raw, maxWidth)
    for (const line of lines) {
      ensureSpace(lineHeight * 2)
      doc.text(line, margin, y)
      y += lineHeight
    }
  }

  const pdfArrayBuffer = doc.output("arraybuffer")
  return Buffer.from(pdfArrayBuffer)
}

