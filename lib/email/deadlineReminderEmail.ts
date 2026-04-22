import type { LanguageCode } from "@/components/LanguageProvider"
import type { Database } from "@/lib/supabase/types"

type DeadlineType = Database["public"]["Enums"]["deadline_type"]

type DeadlineReminderEmailInput = {
  language?: string | null
  lawyerName: string
  lawyerEmail: string
  deadline: {
    id: string
    title: string
    dueDate: string // ISO date (YYYY-MM-DD)
    reminderDaysBefore: number
    deadlineType: DeadlineType
  }
  clientName?: string | null
  matterTitle?: string | null
  matterNumber?: string | null
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

function localeForLanguage(lang: LanguageCode): string {
  switch (lang) {
    case "en":
      return "en-US"
    case "sr":
      return "sr-Latn-RS"
    case "bs":
      return "bs-BA"
    case "hr":
      return "hr-HR"
    case "sl":
      return "sl-SI"
    case "me":
      return "sr-Latn-ME"
  }
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

function formatNiceDate(isoDate: string, lang: LanguageCode): string {
  const dt = new Date(`${isoDate}T00:00:00.000Z`)
  if (Number.isNaN(dt.getTime())) return isoDate
  try {
    return new Intl.DateTimeFormat(localeForLanguage(lang), {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(dt)
  } catch {
    return isoDate
  }
}

type Copy = {
  subject: (title: string, days: number) => string
  greeting: (name: string) => string
  dueDateLabel: string
  daysRemaining: (days: number) => string
  dueToday: string
  deadlineTypeLabel: string
  clientLabel: string
  matterLabel: string
  viewDeadlines: string
  footer: string
  typeLabels: Record<DeadlineType, string>
}

const COPY: Record<LanguageCode, Copy> = {
  en: {
    subject: (title, days) =>
      days === 0 ? `Reminder: ${title} is due today` : `Reminder: ${title} is due in ${days} days`,
    greeting: (name) => `Dear ${name},`,
    dueDateLabel: "Due date",
    daysRemaining: (days) => `${days} days remaining`,
    dueToday: "Due today",
    deadlineTypeLabel: "Deadline type",
    clientLabel: "Client",
    matterLabel: "Matter",
    viewDeadlines: "View deadlines",
    footer: "Kind regards,<br/>Legantis",
    typeLabels: {
      court_hearing: "Court hearing",
      filing_deadline: "Filing deadline",
      appeal_deadline: "Appeal deadline",
      statute_of_limitations: "Statute of limitations",
      contract_expiry: "Contract expiry",
      client_meeting: "Client meeting",
      payment_due: "Payment due",
      other: "Other",
    },
  },
  sr: {
    subject: (title, days) =>
      days === 0 ? `Podsetnik: ${title} je dospijeva danas` : `Podsetnik: ${title} dospijeva za ${days} dana`,
    greeting: (name) => `Poštovani ${name},`,
    dueDateLabel: "Rok",
    daysRemaining: (days) => `Preostalo: ${days} dana`,
    dueToday: "Rok je danas",
    deadlineTypeLabel: "Vrsta roka",
    clientLabel: "Klijent",
    matterLabel: "Predmet",
    viewDeadlines: "Pregledajte rokove",
    footer: "Srdačan pozdrav,<br/>Legantis",
    typeLabels: {
      court_hearing: "Ročište",
      filing_deadline: "Rok za podnesak",
      appeal_deadline: "Rok za žalbu",
      statute_of_limitations: "Zastarelost",
      contract_expiry: "Isticaj ugovora",
      client_meeting: "Sastanak sa klijentom",
      payment_due: "Dospijeće plaćanja",
      other: "Ostalo",
    },
  },
  bs: {
    subject: (title, days) =>
      days === 0 ? `Podsjetnik: ${title} dospijeva danas` : `Podsjetnik: ${title} dospijeva za ${days} dana`,
    greeting: (name) => `Poštovani ${name},`,
    dueDateLabel: "Rok",
    daysRemaining: (days) => `Preostalo: ${days} dana`,
    dueToday: "Rok je danas",
    deadlineTypeLabel: "Vrsta roka",
    clientLabel: "Klijent",
    matterLabel: "Predmet",
    viewDeadlines: "Pogledaj rokove",
    footer: "Srdačan pozdrav,<br/>Legantis",
    typeLabels: {
      court_hearing: "Ročište",
      filing_deadline: "Rok za podnesak",
      appeal_deadline: "Rok za žalbu",
      statute_of_limitations: "Zastara",
      contract_expiry: "Istek ugovora",
      client_meeting: "Sastanak s klijentom",
      payment_due: "Dospijeće plaćanja",
      other: "Ostalo",
    },
  },
  hr: {
    subject: (title, days) =>
      days === 0 ? `Podsjetnik: ${title} dospijeva danas` : `Podsjetnik: ${title} dospijeva za ${days} dana`,
    greeting: (name) => `Poštovani ${name},`,
    dueDateLabel: "Rok",
    daysRemaining: (days) => `Preostalo: ${days} dana`,
    dueToday: "Rok je danas",
    deadlineTypeLabel: "Vrsta roka",
    clientLabel: "Klijent",
    matterLabel: "Predmet",
    viewDeadlines: "Pogledajte rokove",
    footer: "Srdačan pozdrav,<br/>Legantis",
    typeLabels: {
      court_hearing: "Ročište",
      filing_deadline: "Rok za podnesak",
      appeal_deadline: "Rok za žalbu",
      statute_of_limitations: "Zastara",
      contract_expiry: "Istek ugovora",
      client_meeting: "Sastanak s klijentom",
      payment_due: "Dospijeće plaćanja",
      other: "Ostalo",
    },
  },
  sl: {
    subject: (title, days) =>
      days === 0 ? `Opomnik: ${title} zapade danes` : `Opomnik: ${title} zapade čez ${days} dni`,
    greeting: (name) => `Spoštovani ${name},`,
    dueDateLabel: "Rok",
    daysRemaining: (days) => `Preostalo: ${days} dni`,
    dueToday: "Rok je danes",
    deadlineTypeLabel: "Vrsta roka",
    clientLabel: "Stranka",
    matterLabel: "Zadeva",
    viewDeadlines: "Ogled rokov",
    footer: "Lep pozdrav,<br/>Legantis",
    typeLabels: {
      court_hearing: "Sodna obravnava",
      filing_deadline: "Rok za vložitev",
      appeal_deadline: "Rok za pritožbo",
      statute_of_limitations: "Zastaranje",
      contract_expiry: "Potek pogodbe",
      client_meeting: "Sestanek s stranko",
      payment_due: "Zapadlost plačila",
      other: "Drugo",
    },
  },
  me: {
    subject: (title, days) =>
      days === 0 ? `Podsjetnik: ${title} dospijeva danas` : `Podsjetnik: ${title} dospijeva za ${days} dana`,
    greeting: (name) => `Poštovani ${name},`,
    dueDateLabel: "Rok",
    daysRemaining: (days) => `Preostalo: ${days} dana`,
    dueToday: "Rok je danas",
    deadlineTypeLabel: "Vrsta roka",
    clientLabel: "Klijent",
    matterLabel: "Predmet",
    viewDeadlines: "Pogledajte rokove",
    footer: "Srdačan pozdrav,<br/>Legantis",
    typeLabels: {
      court_hearing: "Ročište",
      filing_deadline: "Rok za podnesak",
      appeal_deadline: "Rok za žalbu",
      statute_of_limitations: "Zastara",
      contract_expiry: "Istek ugovora",
      client_meeting: "Sastanak s klijentom",
      payment_due: "Dospijeće plaćanja",
      other: "Ostalo",
    },
  },
}

export function buildDeadlineReminderEmail(input: DeadlineReminderEmailInput): EmailContent {
  const lang = normalizeLanguage(input.language)
  const copy = COPY[lang] ?? COPY.en

  const title = input.deadline.title
  const days = input.deadline.reminderDaysBefore
  const dueDateText = formatNiceDate(input.deadline.dueDate, lang)
  const typeText = copy.typeLabels[input.deadline.deadlineType] ?? copy.typeLabels.other

  const link = "https://legantis.app/dashboard/deadlines"
  const subject = copy.subject(title, days)

  const relativeText = days === 0 ? copy.dueToday : copy.daysRemaining(days)

  const matterLine =
    input.matterNumber || input.matterTitle
      ? `${copy.matterLabel}: ${[input.matterNumber, input.matterTitle].filter(Boolean).join(" — ")}`
      : null

  const clientLine = input.clientName ? `${copy.clientLabel}: ${input.clientName}` : null

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <p>${escapeHtml(copy.greeting(input.lawyerName))}</p>
      <p style="font-size: 16px;"><strong>${escapeHtml(title)}</strong></p>
      <p>
        <strong>${escapeHtml(copy.dueDateLabel)}:</strong> ${escapeHtml(dueDateText)}<br/>
        <strong>${escapeHtml(copy.deadlineTypeLabel)}:</strong> ${escapeHtml(typeText)}<br/>
        <strong>${escapeHtml(relativeText)}</strong>
      </p>
      ${clientLine ? `<p>${escapeHtml(clientLine)}</p>` : ""}
      ${matterLine ? `<p>${escapeHtml(matterLine)}</p>` : ""}
      <p><a href="${escapeAttr(link)}" style="display:inline-block; padding: 10px 14px; background: #111827; color: #ffffff; border-radius: 8px; text-decoration: none;">${escapeHtml(copy.viewDeadlines)}</a></p>
      <p>${copy.footer}</p>
    </div>
  `.trim()

  const text = [
    copy.greeting(input.lawyerName),
    "",
    title,
    "",
    `${copy.dueDateLabel}: ${dueDateText}`,
    `${copy.deadlineTypeLabel}: ${typeText}`,
    relativeText,
    clientLine,
    matterLine,
    "",
    `${copy.viewDeadlines}: ${link}`,
    "",
    "Kind regards,",
    "Legantis",
  ]
    .filter(Boolean)
    .join("\n")

  return { subject, html, text }
}

