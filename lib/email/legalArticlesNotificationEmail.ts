import type { LanguageCode } from "@/components/LanguageProvider"

export type LegalArticlesNotificationEmailInput = {
  language?: string | null
  userName: string
  jurisdiction: string
  laws: Array<{ lawNameLocal: string; articleCount: number }>
}

type EmailContent = {
  subject: string
  html: string
  text: string
}

const SUPPORTED_LANGUAGES: ReadonlyArray<LanguageCode> = ["en", "sr", "bs", "hr", "sl", "me"]

const DISPLAY_NAME_TO_CODE: Record<string, LanguageCode> = {
  serbian: "sr",
  croatian: "hr",
  bosnian: "bs",
  montenegrin: "me",
  slovenian: "sl",
  english: "en",
}

function normalizeLanguage(input?: string | null): LanguageCode {
  const raw = (input ?? "").trim().toLowerCase()
  if (!raw) return "en"
  const displayMatch = DISPLAY_NAME_TO_CODE[raw]
  if (displayMatch) return displayMatch
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

type JurisdictionLabels = Record<string, string>

type Copy = {
  subject: string
  greeting: (name: string) => string
  intro: (jurisdiction: string) => string
  articleCount: (count: number) => string
  ctaLabel: string
  footer: string
  jurisdictionLabels: JurisdictionLabels
}

const COPY: Record<LanguageCode, Copy> = {
  en: {
    subject: "New legal regulations in your jurisdiction | Legantis",
    greeting: (name) => `Dear ${name},`,
    intro: (jurisdiction) => `New legal regulations have been added for ${jurisdiction}:`,
    articleCount: (count) => (count === 1 ? "1 article" : `${count} articles`),
    ctaLabel: "Browse legal research",
    footer:
      "This notification is for informational purposes only and does not constitute legal advice.<br/><br/>Kind regards,<br/>Legantis",
    jurisdictionLabels: {
      serbia: "Serbia",
      croatia: "Croatia",
      bih_fbih: "Bosnia & Herzegovina – Federation",
      bih_rs: "Bosnia & Herzegovina – Republika Srpska",
      bih_brcko: "Bosnia & Herzegovina – Brčko District",
      montenegro: "Montenegro",
      slovenia: "Slovenia",
    },
  },
  sr: {
    subject: "Novi pravni propisi u vašoj jurisdikciji | Legantis",
    greeting: (name) => `Poštovani ${name},`,
    intro: (jurisdiction) => `Dodani su novi pravni propisi za ${jurisdiction}:`,
    articleCount: (count) => {
      const mod10 = count % 10
      const mod100 = count % 100
      if (mod10 === 1 && mod100 !== 11) return `${count} član`
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${count} člana`
      return `${count} članova`
    },
    ctaLabel: "Pregledajte pravna istraživanja",
    footer:
      "Ova obavijest služi isključivo u informativne svrhe i ne predstavlja pravni savjet.<br/><br/>Srdačan pozdrav,<br/>Legantis",
    jurisdictionLabels: {
      serbia: "Srbija",
      croatia: "Hrvatska",
      bih_fbih: "Bosna i Hercegovina – Federacija",
      bih_rs: "Bosna i Hercegovina – Republika Srpska",
      bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
      montenegro: "Crna Gora",
      slovenia: "Slovenija",
    },
  },
  bs: {
    subject: "Novi pravni propisi u vašoj jurisdikciji | Legantis",
    greeting: (name) => `Poštovani ${name},`,
    intro: (jurisdiction) => `Dodani su novi pravni propisi za ${jurisdiction}:`,
    articleCount: (count) => {
      const mod10 = count % 10
      const mod100 = count % 100
      if (mod10 === 1 && mod100 !== 11) return `${count} član`
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${count} člana`
      return `${count} članova`
    },
    ctaLabel: "Pregledajte pravna istraživanja",
    footer:
      "Ova obavijest služi isključivo u informativne svrhe i ne predstavlja pravni savjet.<br/><br/>Srdačan pozdrav,<br/>Legantis",
    jurisdictionLabels: {
      serbia: "Srbija",
      croatia: "Hrvatska",
      bih_fbih: "Bosna i Hercegovina – Federacija",
      bih_rs: "Bosna i Hercegovina – Republika Srpska",
      bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
      montenegro: "Crna Gora",
      slovenia: "Slovenija",
    },
  },
  hr: {
    subject: "Novi pravni propisi u vašoj jurisdikciji | Legantis",
    greeting: (name) => `Poštovani ${name},`,
    intro: (jurisdiction) => `Dodani su novi pravni propisi za ${jurisdiction}:`,
    articleCount: (count) => {
      const mod10 = count % 10
      const mod100 = count % 100
      if (mod10 === 1 && mod100 !== 11) return `${count} članak`
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${count} članka`
      return `${count} članaka`
    },
    ctaLabel: "Pregledajte pravna istraživanja",
    footer:
      "Ova obavijest služi isključivo u informativne svrhe i ne predstavlja pravni savjet.<br/><br/>Srdačan pozdrav,<br/>Legantis",
    jurisdictionLabels: {
      serbia: "Srbija",
      croatia: "Hrvatska",
      bih_fbih: "Bosna i Hercegovina – Federacija",
      bih_rs: "Bosna i Hercegovina – Republika Srpska",
      bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
      montenegro: "Crna Gora",
      slovenia: "Slovenija",
    },
  },
  sl: {
    subject: "Novi pravni predpisi v vaši jurisdikciji | Legantis",
    greeting: (name) => `Spoštovani ${name},`,
    intro: (jurisdiction) => `Dodani so novi pravni predpisi za ${jurisdiction}:`,
    articleCount: (count) => {
      if (count === 1) return "1 člen"
      if (count === 2) return "2 člena"
      if (count === 3 || count === 4) return `${count} členi`
      return `${count} členov`
    },
    ctaLabel: "Ogled pravnih raziskav",
    footer:
      "To obvestilo je namenjeno zgolj informativnim namenom in ne predstavlja pravnega nasveta.<br/><br/>Lep pozdrav,<br/>Legantis",
    jurisdictionLabels: {
      serbia: "Srbija",
      croatia: "Hrvaška",
      bih_fbih: "Bosna in Hercegovina – Federacija",
      bih_rs: "Bosna in Hercegovina – Republika Srpska",
      bih_brcko: "Bosna in Hercegovina – Distrikt Brčko",
      montenegro: "Črna gora",
      slovenia: "Slovenija",
    },
  },
  me: {
    subject: "Novi pravni propisi u vašoj jurisdikciji | Legantis",
    greeting: (name) => `Poštovani ${name},`,
    intro: (jurisdiction) => `Dodati su novi pravni propisi za ${jurisdiction}:`,
    articleCount: (count) => {
      const mod10 = count % 10
      const mod100 = count % 100
      if (mod10 === 1 && mod100 !== 11) return `${count} član`
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${count} člana`
      return `${count} članova`
    },
    ctaLabel: "Pregledajte pravna istraživanja",
    footer:
      "Ova obavijest služi isključivo u informativne svrhe i ne predstavlja pravni savjet.<br/><br/>Srdačan pozdrav,<br/>Legantis",
    jurisdictionLabels: {
      serbia: "Srbija",
      croatia: "Hrvatska",
      bih_fbih: "Bosna i Hercegovina – Federacija",
      bih_rs: "Bosna i Hercegovina – Republika Srpska",
      bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
      montenegro: "Crna Gora",
      slovenia: "Slovenija",
    },
  },
}

function jurisdictionLabel(jurisdiction: string, copy: Copy): string {
  return copy.jurisdictionLabels[jurisdiction] ?? jurisdiction
}

export function buildLegalArticlesNotificationEmail(
  input: LegalArticlesNotificationEmailInput
): EmailContent {
  const lang = normalizeLanguage(input.language)
  const copy = COPY[lang] ?? COPY.en
  const jurisdictionName = jurisdictionLabel(input.jurisdiction, copy)
  const link = "https://legantis.app/dashboard/research"
  const subject = copy.subject

  const lawListHtml = input.laws
    .map(
      (law) =>
        `<li>${escapeHtml(law.lawNameLocal)} — ${escapeHtml(copy.articleCount(law.articleCount))}</li>`
    )
    .join("")

  const lawListText = input.laws
    .map((law) => `- ${law.lawNameLocal} — ${copy.articleCount(law.articleCount)}`)
    .join("\n")

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <p>${escapeHtml(copy.greeting(input.userName))}</p>
      <p>${escapeHtml(copy.intro(jurisdictionName))}</p>
      <ul>${lawListHtml}</ul>
      <p><a href="${escapeAttr(link)}" style="display:inline-block; padding: 10px 14px; background: #111827; color: #ffffff; border-radius: 8px; text-decoration: none;">${escapeHtml(copy.ctaLabel)}</a></p>
      <p>${copy.footer}</p>
    </div>
  `.trim()

  const text = [
    copy.greeting(input.userName),
    "",
    copy.intro(jurisdictionName),
    "",
    lawListText,
    "",
    `${copy.ctaLabel}: ${link}`,
    "",
    copy.footer.replaceAll("<br/>", "\n").replaceAll("<br>", "\n"),
  ].join("\n")

  return { subject, html, text }
}
