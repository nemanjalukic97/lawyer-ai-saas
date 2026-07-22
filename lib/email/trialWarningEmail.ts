import type { LanguageCode } from "@/components/LanguageProvider"

export type TrialWarningEmailInput = {
  language?: string | null
  userName: string
  trialEndsAt: string // ISO
  daysRemaining: number
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

function formatNiceDate(iso: string, lang: LanguageCode): string {
  const dt = new Date(iso)
  if (Number.isNaN(dt.getTime())) return iso
  try {
    return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : lang, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(dt)
  } catch {
    return iso
  }
}

type Copy = {
  subject: string
  greeting: (name: string) => string
  body: (days: number, endDate: string) => string
  plans: string
  ctaLabel: string
  closing: string
  footer: string
}

const COPY: Record<LanguageCode, Copy> = {
  en: {
    subject: "Your Legantis Firm trial ends soon",
    greeting: (name) => `Dear ${name},`,
    body: (days, endDate) =>
      days <= 1
        ? `Just a friendly note that your Firm trial ends tomorrow (${endDate}). We hope you have found Legantis useful for your practice.`
        : `Just a friendly note that your Firm trial ends in about ${days} days (${endDate}). We hope you have found Legantis useful for your practice.`,
    plans:
      "If you would like to continue, you can choose Solo (€19), Professional (€49), or Firm (€69) on the Billing page — no pressure either way.",
    ctaLabel: "View billing options",
    closing: "Thank you for trying Legantis.",
    footer: "Kind regards,<br/>Legantis",
  },
  sr: {
    subject: "Vaš Legantis Firm probni period uskoro ističe",
    greeting: (name) => `Poštovani/a ${name},`,
    body: (days, endDate) =>
      days <= 1
        ? `Samo kratka napomena da vaš Firm probni period ističe sutra (${endDate}). Nadamo se da vam je Legantis bio koristan u radu.`
        : `Samo kratka napomena da vaš Firm probni period ističe za oko ${days} dana (${endDate}). Nadamo se da vam je Legantis bio koristan u radu.`,
    plans:
      "Ako želite da nastavite, na stranici Naplata možete izabrati Solo (€19), Professional (€49) ili Firm (€69) — bez ikakvog pritiska.",
    ctaLabel: "Pogledajte opcije naplate",
    closing: "Hvala što ste isprobali Legantis.",
    footer: "Srdačan pozdrav,<br/>Legantis",
  },
  bs: {
    subject: "Vaš Legantis Firm probni period uskoro ističe",
    greeting: (name) => `Poštovani/a ${name},`,
    body: (days, endDate) =>
      days <= 1
        ? `Samo kratka napomena da vaš Firm probni period ističe sutra (${endDate}). Nadamo se da vam je Legantis bio koristan u radu.`
        : `Samo kratka napomena da vaš Firm probni period ističe za oko ${days} dana (${endDate}). Nadamo se da vam je Legantis bio koristan u radu.`,
    plans:
      "Ako želite nastaviti, na stranici Naplata možete odabrati Solo (€19), Professional (€49) ili Firm (€69) — bez ikakvog pritiska.",
    ctaLabel: "Pogledajte opcije naplate",
    closing: "Hvala što ste isprobali Legantis.",
    footer: "Srdačan pozdrav,<br/>Legantis",
  },
  hr: {
    subject: "Vaš Legantis Firm probni period uskoro istječe",
    greeting: (name) => `Poštovani/a ${name},`,
    body: (days, endDate) =>
      days <= 1
        ? `Samo kratka napomena da vaš Firm probni period istječe sutra (${endDate}). Nadamo se da vam je Legantis bio koristan u radu.`
        : `Samo kratka napomena da vaš Firm probni period istječe za oko ${days} dana (${endDate}). Nadamo se da vam je Legantis bio koristan u radu.`,
    plans:
      "Ako želite nastaviti, na stranici Naplata možete odabrati Solo (€19), Professional (€49) ili Firm (€69) — bez ikakvog pritiska.",
    ctaLabel: "Pogledajte opcije naplate",
    closing: "Hvala što ste isprobali Legantis.",
    footer: "Srdačan pozdrav,<br/>Legantis",
  },
  sl: {
    subject: "Vaše preizkusno obdobje Legantis Firm se kmalu izteče",
    greeting: (name) => `Spoštovani/a ${name},`,
    body: (days, endDate) =>
      days <= 1
        ? `Samo prijazno opozorilo, da se vaše preizkusno obdobje Firm izteče jutri (${endDate}). Upamo, da vam je Legantis koristil pri delu.`
        : `Samo prijazno opozorilo, da se vaše preizkusno obdobje Firm izteče čez približno ${days} dni (${endDate}). Upamo, da vam je Legantis koristil pri delu.`,
    plans:
      "Če želite nadaljevati, lahko na strani Obračun izberete Solo (€19), Professional (€49) ali Firm (€69) — brez pritiska.",
    ctaLabel: "Oglejte si možnosti naročnine",
    closing: "Hvala, ker ste preizkusili Legantis.",
    footer: "Lep pozdrav,<br/>Legantis",
  },
  me: {
    subject: "Vaš Legantis Firm probni period uskoro ističe",
    greeting: (name) => `Poštovani/a ${name},`,
    body: (days, endDate) =>
      days <= 1
        ? `Samo kratka napomena da vaš Firm probni period ističe sutra (${endDate}). Nadamo se da vam je Legantis bio koristan u radu.`
        : `Samo kratka napomena da vaš Firm probni period ističe za oko ${days} dana (${endDate}). Nadamo se da vam je Legantis bio koristan u radu.`,
    plans:
      "Ako želite da nastavite, na stranici Naplata možete izabrati Solo (€19), Professional (€49) ili Firm (€69) — bez ikakvog pritiska.",
    ctaLabel: "Pogledajte opcije naplate",
    closing: "Hvala što ste isprobali Legantis.",
    footer: "Srdačan pozdrav,<br/>Legantis",
  },
}

export function buildTrialWarningEmail(input: TrialWarningEmailInput): EmailContent {
  const lang = normalizeLanguage(input.language)
  const copy = COPY[lang] ?? COPY.en
  const endDate = formatNiceDate(input.trialEndsAt, lang)
  const days = Math.max(0, Math.floor(input.daysRemaining))
  const link = "https://legantis.app/dashboard/billing"
  const body = copy.body(days, endDate)

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <p>${escapeHtml(copy.greeting(input.userName))}</p>
      <p>${escapeHtml(body)}</p>
      <p>${escapeHtml(copy.plans)}</p>
      <p><a href="${escapeAttr(link)}" style="display:inline-block; padding: 10px 14px; background: #111827; color: #ffffff; border-radius: 8px; text-decoration: none;">${escapeHtml(copy.ctaLabel)}</a></p>
      <p>${escapeHtml(copy.closing)}</p>
      <p>${copy.footer}</p>
    </div>
  `.trim()

  const text = [
    copy.greeting(input.userName),
    "",
    body,
    "",
    copy.plans,
    "",
    `${copy.ctaLabel}: ${link}`,
    "",
    copy.closing,
    "",
    "Kind regards,",
    "Legantis",
  ].join("\n")

  return { subject: copy.subject, html, text }
}
