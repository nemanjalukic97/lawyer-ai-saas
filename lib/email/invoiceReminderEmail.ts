import type { LanguageCode } from "@/components/LanguageProvider"

type LineItem = {
  description: string
  amount: number
}

export type InvoiceReminderEmailInput = {
  reminderNumber: 1 | 2 | 3
  language?: string | null
  clientName: string
  invoiceNumber: string
  totalAmount: number
  currency: string
  dueDate: string | null
  daysSinceSent: number
  lineItems: LineItem[]
  bankName?: string | null
  accountHolder?: string | null
  iban?: string | null
  paymentReference?: string | null
  lawyerName: string
  lawyerEmail: string
}

type EmailContent = {
  subject: string
  html: string
  text: string
}

const SUPPORTED_LANGUAGES: ReadonlyArray<LanguageCode> = ["en", "sr", "bs", "hr", "sl", "me"]

function normalizeLanguage(input?: string | null): LanguageCode {
  const raw = (input ?? "").trim().toLowerCase()
  if (!raw) return "en"
  const primary = raw.split(/[-_]/)[0] as LanguageCode
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(primary) ? primary : "en"
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

function formatMoney(amount: number, currency: string): string {
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

function formatDate(isoDate: string): string {
  // We keep this simple and stable across languages; copy can localize the label.
  const d = new Date(`${isoDate}T00:00:00.000Z`)
  if (Number.isNaN(d.getTime())) return isoDate
  try {
    return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "2-digit", day: "2-digit" }).format(d)
  } catch {
    return isoDate
  }
}

type Copy = {
  subject: Record<1 | 2 | 3, (invoiceNumber: string) => string>
  greeting: (clientName: string) => string
  intro: (invoiceNumber: string) => string
  totalLabel: string
  dueDateLabel: string
  daysSinceSentLabel: string
  lineItemsTitle: string
  paymentInstructionsTitle: string
  bankLabel: string
  accountHolderLabel: string
  ibanLabel: string
  referenceLabel: string
  noBankInfo: string
  disputeLine: (lawyerName: string, lawyerEmail: string) => string
  footer: string
}

const COPY: Record<LanguageCode, Copy> = {
  en: {
    subject: {
      1: (n) => `Payment reminder: Invoice ${n}`,
      2: (n) => `Second reminder: Invoice ${n} is awaiting payment`,
      3: (n) => `Final notice: Invoice ${n} is now overdue`,
    },
    greeting: (name) => `Dear ${name},`,
    intro: (n) => `This is a reminder regarding invoice ${n}.`,
    totalLabel: "Total",
    dueDateLabel: "Due date",
    daysSinceSentLabel: "Days since sent",
    lineItemsTitle: "Line items",
    paymentInstructionsTitle: "Payment instructions (bank transfer)",
    bankLabel: "Bank",
    accountHolderLabel: "Account holder",
    ibanLabel: "IBAN",
    referenceLabel: "Reference",
    noBankInfo: "Please contact your lawyer directly for payment instructions.",
    disputeLine: (lawyerName, lawyerEmail) =>
      `If you believe this invoice is incorrect or you have any questions, please contact ${lawyerName} at ${lawyerEmail}.`,
    footer: "Kind regards,<br/>Legantis",
  },
  sr: {
    subject: {
      1: (n) => `Podsjetnik za plaćanje: Faktura ${n}`,
      2: (n) => `Drugi podsjetnik: Faktura ${n} čeka na uplatu`,
      3: (n) => `Poslednje obavještenje: Faktura ${n} je sada dospjela`,
    },
    greeting: (name) => `Poštovani ${name},`,
    intro: (n) => `Ovo je podsjetnik u vezi sa fakturom ${n}.`,
    totalLabel: "Ukupno",
    dueDateLabel: "Rok plaćanja",
    daysSinceSentLabel: "Dana od slanja",
    lineItemsTitle: "Stavke",
    paymentInstructionsTitle: "Uputstvo za plaćanje (bankovni transfer)",
    bankLabel: "Banka",
    accountHolderLabel: "Vlasnik računa",
    ibanLabel: "IBAN",
    referenceLabel: "Poziv na broj",
    noBankInfo: "Molimo kontaktirajte svog advokata direktno za instrukcije za plaćanje.",
    disputeLine: (lawyerName, lawyerEmail) =>
      `Ako smatrate da faktura nije ispravna ili imate pitanja, kontaktirajte ${lawyerName} na ${lawyerEmail}.`,
    footer: "Srdačan pozdrav,<br/>Legantis",
  },
  bs: {
    subject: {
      1: (n) => `Podsjetnik za plaćanje: Faktura ${n}`,
      2: (n) => `Drugi podsjetnik: Faktura ${n} čeka uplatu`,
      3: (n) => `Konačno upozorenje: Faktura ${n} je sada dospjela`,
    },
    greeting: (name) => `Poštovani ${name},`,
    intro: (n) => `Ovo je podsjetnik u vezi sa fakturom ${n}.`,
    totalLabel: "Ukupno",
    dueDateLabel: "Rok plaćanja",
    daysSinceSentLabel: "Dana od slanja",
    lineItemsTitle: "Stavke",
    paymentInstructionsTitle: "Upute za plaćanje (bankovni transfer)",
    bankLabel: "Banka",
    accountHolderLabel: "Vlasnik računa",
    ibanLabel: "IBAN",
    referenceLabel: "Poziv na broj",
    noBankInfo: "Molimo kontaktirajte svog advokata direktno za upute za plaćanje.",
    disputeLine: (lawyerName, lawyerEmail) =>
      `Ako smatrate da faktura nije ispravna ili imate pitanja, kontaktirajte ${lawyerName} na ${lawyerEmail}.`,
    footer: "Srdačan pozdrav,<br/>Legantis",
  },
  hr: {
    subject: {
      1: (n) => `Podsjetnik za plaćanje: Račun ${n}`,
      2: (n) => `Drugi podsjetnik: Račun ${n} čeka plaćanje`,
      3: (n) => `Završna opomena: Račun ${n} je sada dospio`,
    },
    greeting: (name) => `Poštovani ${name},`,
    intro: (n) => `Ovo je podsjetnik u vezi s računom ${n}.`,
    totalLabel: "Ukupno",
    dueDateLabel: "Datum dospijeća",
    daysSinceSentLabel: "Dana od slanja",
    lineItemsTitle: "Stavke",
    paymentInstructionsTitle: "Upute za plaćanje (bankovni prijenos)",
    bankLabel: "Banka",
    accountHolderLabel: "Vlasnik računa",
    ibanLabel: "IBAN",
    referenceLabel: "Poziv na broj",
    noBankInfo: "Molimo kontaktirajte svog odvjetnika izravno za upute za plaćanje.",
    disputeLine: (lawyerName, lawyerEmail) =>
      `Ako smatrate da račun nije ispravan ili imate pitanja, kontaktirajte ${lawyerName} na ${lawyerEmail}.`,
    footer: "Srdačan pozdrav,<br/>Legantis",
  },
  sl: {
    subject: {
      1: (n) => `Opomnik za plačilo: Račun ${n}`,
      2: (n) => `Drugi opomnik: Račun ${n} čaka na plačilo`,
      3: (n) => `Zadnje obvestilo: Račun ${n} je zapadel`,
    },
    greeting: (name) => `Spoštovani ${name},`,
    intro: (n) => `To je opomnik glede računa ${n}.`,
    totalLabel: "Skupaj",
    dueDateLabel: "Rok plačila",
    daysSinceSentLabel: "Dni od pošiljanja",
    lineItemsTitle: "Postavke",
    paymentInstructionsTitle: "Navodila za plačilo (bančno nakazilo)",
    bankLabel: "Banka",
    accountHolderLabel: "Imetnik računa",
    ibanLabel: "IBAN",
    referenceLabel: "Sklic",
    noBankInfo: "Za navodila za plačilo se prosimo obrnite neposredno na svojega odvetnika.",
    disputeLine: (lawyerName, lawyerEmail) =>
      `Če menite, da račun ni pravilen ali imate vprašanja, kontaktirajte ${lawyerName} na ${lawyerEmail}.`,
    footer: "Lep pozdrav,<br/>Legantis",
  },
  me: {
    subject: {
      1: (n) => `Podsjetnik za plaćanje: Faktura ${n}`,
      2: (n) => `Drugi podsjetnik: Faktura ${n} čeka na uplatu`,
      3: (n) => `Završno obavještenje: Faktura ${n} je sada dospjela`,
    },
    greeting: (name) => `Poštovani ${name},`,
    intro: (n) => `Ovo je podsjetnik u vezi sa fakturom ${n}.`,
    totalLabel: "Ukupno",
    dueDateLabel: "Rok plaćanja",
    daysSinceSentLabel: "Dana od slanja",
    lineItemsTitle: "Stavke",
    paymentInstructionsTitle: "Uputstvo za plaćanje (bankovni transfer)",
    bankLabel: "Banka",
    accountHolderLabel: "Vlasnik računa",
    ibanLabel: "IBAN",
    referenceLabel: "Poziv na broj",
    noBankInfo: "Molimo kontaktirajte svog advokata direktno za instrukcije za plaćanje.",
    disputeLine: (lawyerName, lawyerEmail) =>
      `Ako smatrate da faktura nije ispravna ili imate pitanja, kontaktirajte ${lawyerName} na ${lawyerEmail}.`,
    footer: "Srdačan pozdrav,<br/>Legantis",
  },
}

export function buildInvoiceReminderEmail(input: InvoiceReminderEmailInput): EmailContent {
  const lang = normalizeLanguage(input.language)
  const copy = COPY[lang] ?? COPY.en

  const subject = (copy.subject[input.reminderNumber] ?? COPY.en.subject[1])(input.invoiceNumber)

  const totalText = formatMoney(input.totalAmount, input.currency)
  const dueText = input.dueDate ? formatDate(input.dueDate) : null
  const hasBank =
    Boolean((input.bankName ?? "").trim()) &&
    Boolean((input.accountHolder ?? "").trim()) &&
    Boolean((input.iban ?? "").trim())
  const reference = (input.paymentReference ?? "").trim() || input.invoiceNumber

  const itemsHtml =
    input.lineItems.length > 0
      ? `<ul style="padding-left: 18px; margin: 8px 0;">
          ${input.lineItems
            .slice(0, 20)
            .map(
              (li) =>
                `<li style="margin: 4px 0;">${escapeHtml(li.description)} — <strong>${escapeHtml(
                  formatMoney(li.amount, input.currency)
                )}</strong></li>`
            )
            .join("")}
        </ul>`
      : ""

  const paymentHtml = hasBank
    ? `
      <p><strong>${escapeHtml(copy.paymentInstructionsTitle)}</strong><br/>
      ${escapeHtml(copy.bankLabel)}: ${escapeHtml(input.bankName ?? "")}<br/>
      ${escapeHtml(copy.accountHolderLabel)}: ${escapeHtml(input.accountHolder ?? "")}<br/>
      ${escapeHtml(copy.ibanLabel)}: ${escapeHtml(input.iban ?? "")}<br/>
      ${escapeHtml(copy.referenceLabel)}: ${escapeHtml(reference)}</p>
    `.trim()
    : `<p>${escapeHtml(copy.noBankInfo)}</p>`

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <p>${escapeHtml(copy.greeting(input.clientName))}</p>
      <p>${escapeHtml(copy.intro(input.invoiceNumber))}</p>
      <p style="font-size: 16px;"><strong>${escapeHtml(input.invoiceNumber)}</strong></p>
      <p>
        <strong>${escapeHtml(copy.totalLabel)}:</strong> ${escapeHtml(totalText)}<br/>
        ${dueText ? `<strong>${escapeHtml(copy.dueDateLabel)}:</strong> ${escapeHtml(dueText)}<br/>` : ""}
        <strong>${escapeHtml(copy.daysSinceSentLabel)}:</strong> ${escapeHtml(String(input.daysSinceSent))}
      </p>
      ${input.lineItems.length ? `<p><strong>${escapeHtml(copy.lineItemsTitle)}</strong></p>` : ""}
      ${itemsHtml}
      ${paymentHtml}
      <p>${escapeHtml(copy.disputeLine(input.lawyerName, input.lawyerEmail))}</p>
      <p>${copy.footer}</p>
    </div>
  `.trim()

  const textItems =
    input.lineItems.length > 0
      ? [
          "",
          copy.lineItemsTitle + ":",
          ...input.lineItems.slice(0, 20).map((li) => `- ${li.description} — ${formatMoney(li.amount, input.currency)}`),
        ].join("\n")
      : ""

  const textPayment = hasBank
    ? [
        "",
        copy.paymentInstructionsTitle + ":",
        `${copy.bankLabel}: ${input.bankName ?? ""}`,
        `${copy.accountHolderLabel}: ${input.accountHolder ?? ""}`,
        `${copy.ibanLabel}: ${input.iban ?? ""}`,
        `${copy.referenceLabel}: ${reference}`,
      ].join("\n")
    : ["", copy.noBankInfo].join("\n")

  const text = [
    copy.greeting(input.clientName),
    "",
    copy.intro(input.invoiceNumber),
    "",
    `${copy.totalLabel}: ${totalText}`,
    dueText ? `${copy.dueDateLabel}: ${dueText}` : null,
    `${copy.daysSinceSentLabel}: ${String(input.daysSinceSent)}`,
    textItems || null,
    textPayment,
    "",
    copy.disputeLine(input.lawyerName, input.lawyerEmail),
    "",
    "Kind regards,",
    "Legantis",
  ]
    .filter(Boolean)
    .join("\n")

  return { subject, html, text }
}

