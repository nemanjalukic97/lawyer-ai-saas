import { getResend } from "@/lib/email/resend"

type SignatureRequestEmailInput = {
  to: string
  signerName: string
  contractTitle: string
  sentByName: string
  expiresAt: Date
  signingUrl: string
  message?: string | null
}

type SignedNotifyLawyerEmailInput = {
  to: string
  contractTitle: string
  signerName: string
  signerEmail: string
  signedAt: Date
  downloadUrl: string
}

type SignedConfirmationToSignerEmailInput = {
  to: string
  contractTitle: string
  signerName: string
  signedAt: Date
  downloadUrl: string
}

function formatDate(value: Date): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(value)
  } catch {
    return value.toISOString()
  }
}

function formatDateTime(value: Date): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(value)
  } catch {
    return value.toISOString()
  }
}

export async function sendSignatureRequestEmail(input: SignatureRequestEmailInput) {
  const resend = getResend()
  const subject = `Please sign: ${input.contractTitle}`
  const expiryText = formatDate(input.expiresAt)
  const safeMsg = (input.message ?? "").trim()

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <p>Dear ${escapeHtml(input.signerName)},</p>
      <p><strong>${escapeHtml(input.sentByName)}</strong> has requested your signature for:</p>
      <p style="font-size: 16px;"><strong>${escapeHtml(input.contractTitle)}</strong></p>
      ${safeMsg ? `<p style="padding: 12px; background: #f4f4f5; border-radius: 8px;"><em>${escapeHtml(safeMsg)}</em></p>` : ""}
      <p>This link will expire on <strong>${escapeHtml(expiryText)}</strong>.</p>
      <p><a href="${escapeAttr(input.signingUrl)}" style="display:inline-block; padding: 10px 14px; background: #111827; color: #ffffff; border-radius: 8px; text-decoration: none;">Review & Sign</a></p>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p><a href="${escapeAttr(input.signingUrl)}">${escapeHtml(input.signingUrl)}</a></p>
      <p>Kind regards,<br/>Legantis</p>
    </div>
  `.trim()

  const text = [
    `Dear ${input.signerName},`,
    "",
    `${input.sentByName} has requested your signature for:`,
    input.contractTitle,
    safeMsg ? `\nMessage:\n${safeMsg}\n` : "",
    `Sign here: ${input.signingUrl}`,
    `Expires on: ${expiryText}`,
    "",
    "Kind regards,",
    "Legantis",
  ]
    .filter(Boolean)
    .join("\n")

  await resend.emails.send({
    from: "Legantis <noreply@legantis.app>",
    to: [input.to],
    subject,
    html,
    text,
  })
}

export async function sendSignatureSignedToLawyerEmail(input: SignedNotifyLawyerEmailInput) {
  const resend = getResend()
  const subject = `${input.contractTitle} has been signed`
  const signedAtText = formatDateTime(input.signedAt)

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <p>Your document has been signed.</p>
      <p style="font-size: 16px;"><strong>${escapeHtml(input.contractTitle)}</strong></p>
      <p><strong>Signer:</strong> ${escapeHtml(input.signerName)} &lt;${escapeHtml(input.signerEmail)}&gt;<br/>
      <strong>Signed at:</strong> ${escapeHtml(signedAtText)}</p>
      <p><a href="${escapeAttr(input.downloadUrl)}" style="display:inline-block; padding: 10px 14px; background: #111827; color: #ffffff; border-radius: 8px; text-decoration: none;">Download signed PDF</a></p>
      <p>Kind regards,<br/>Legantis</p>
    </div>
  `.trim()

  const text = [
    "Your document has been signed.",
    input.contractTitle,
    "",
    `Signer: ${input.signerName} <${input.signerEmail}>`,
    `Signed at: ${signedAtText}`,
    `Download: ${input.downloadUrl}`,
  ].join("\n")

  await resend.emails.send({
    from: "Legantis <noreply@legantis.app>",
    to: [input.to],
    subject,
    html,
    text,
  })
}

export async function sendSignatureConfirmationToSignerEmail(
  input: SignedConfirmationToSignerEmailInput
) {
  const resend = getResend()
  const subject = `Your signed copy of ${input.contractTitle}`
  const signedAtText = formatDateTime(input.signedAt)

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <p>Thank you. Your document has been signed successfully.</p>
      <p><strong>Signer:</strong> ${escapeHtml(input.signerName)}<br/>
      <strong>Document:</strong> ${escapeHtml(input.contractTitle)}<br/>
      <strong>Signed at:</strong> ${escapeHtml(signedAtText)}</p>
      <p><a href="${escapeAttr(input.downloadUrl)}" style="display:inline-block; padding: 10px 14px; background: #111827; color: #ffffff; border-radius: 8px; text-decoration: none;">Download signed PDF</a></p>
      <p>Kind regards,<br/>Legantis</p>
    </div>
  `.trim()

  const text = [
    "Thank you. Your document has been signed successfully.",
    "",
    `Signer: ${input.signerName}`,
    `Document: ${input.contractTitle}`,
    `Signed at: ${signedAtText}`,
    "",
    `Download: ${input.downloadUrl}`,
  ].join("\n")

  await resend.emails.send({
    from: "Legantis <noreply@legantis.app>",
    to: [input.to],
    subject,
    html,
    text,
  })
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function escapeAttr(input: string): string {
  return escapeHtml(input)
}

