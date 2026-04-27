"use client"

import Link from "next/link"

import { Header } from "@/components/Header"
import { useLanguage } from "@/components/LanguageProvider"

type Locale = "en" | "sr" | "bs" | "hr" | "sl" | "me"

type RefundSection = {
  title: string
  body: string
}

type RefundContent = {
  backHome: string
  title: string
  updated: string
  intro: string
  sections: RefundSection[]
  contactPrefix: string
}

const REFUND_CONTENT: Record<Locale, RefundContent> = {
  en: {
    backHome: "Return to Homepage",
    title: "Refund Policy",
    updated: "Last updated: April 2026",
    intro:
      "This Refund Policy explains when refunds are available for Legantis subscriptions.",
    sections: [
      {
        title: "1. Subscription Fees",
        body: "Monthly subscription fees are non-refundable once the billing period has started.",
      },
      {
        title: "2. Free Trial",
        body: "New users may access a free tier with limited features. No payment is required to start.",
      },
      {
        title: "3. Cancellation",
        body: "You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. You will retain access until then.",
      },
      {
        title: "4. Exceptions",
        body: "In cases of technical failure or service unavailability exceeding 48 hours, users may request a pro-rata refund by contacting support@legantis.app",
      },
      {
        title: "5. Contact",
        body: "",
      },
    ],
    contactPrefix: "For refund requests, contact",
  },
  sr: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika povraćaja sredstava",
    updated: "Poslednje ažuriranje: april 2026",
    intro:
      "Ova Politika povraćaja sredstava objašnjava kada su povraćaji dostupni za Legantis pretplate.",
    sections: [
      {
        title: "1. Naknade za pretplatu",
        body: "Mesečne naknade za pretplatu nisu povratne nakon što obračunski period započne.",
      },
      {
        title: "2. Besplatni probni period",
        body: "Novi korisnici mogu koristiti besplatan nivo sa ograničenim funkcijama. Nije potrebno plaćanje za početak.",
      },
      {
        title: "3. Otkazivanje",
        body: "Pretplatu možete otkazati u bilo kom trenutku. Otkazivanje stupa na snagu na kraju tekućeg obračunskog perioda. Zadržaćete pristup do tada.",
      },
      {
        title: "4. Izuzeci",
        body: "U slučaju tehničkog kvara ili nedostupnosti usluge duže od 48 sati, korisnici mogu zatražiti proporcionalni povraćaj kontaktiranjem support@legantis.app",
      },
      {
        title: "5. Kontakt",
        body: "",
      },
    ],
    contactPrefix: "Za zahteve za povraćaj sredstava, kontaktirajte",
  },
  bs: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika povrata sredstava",
    updated: "Posljednje ažuriranje: april 2026",
    intro:
      "Ova Politika povrata sredstava objašnjava kada su povrati dostupni za Legantis pretplate.",
    sections: [
      {
        title: "1. Naknade za pretplatu",
        body: "Mjesečne naknade za pretplatu nisu povratne nakon što obračunski period započne.",
      },
      {
        title: "2. Besplatni probni period",
        body: "Novi korisnici mogu koristiti besplatan nivo sa ograničenim funkcijama. Nije potrebno plaćanje za početak.",
      },
      {
        title: "3. Otkazivanje",
        body: "Pretplatu možete otkazati u bilo kojem trenutku. Otkazivanje stupa na snagu na kraju tekućeg obračunskog perioda. Zadržat ćete pristup do tada.",
      },
      {
        title: "4. Izuzeci",
        body: "U slučaju tehničkog kvara ili nedostupnosti usluge duže od 48 sati, korisnici mogu zatražiti pro-rata povrat kontaktiranjem support@legantis.app",
      },
      {
        title: "5. Kontakt",
        body: "",
      },
    ],
    contactPrefix: "Za zahtjeve za povrat sredstava, kontaktirajte",
  },
  hr: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika povrata novca",
    updated: "Zadnje ažuriranje: travanj 2026",
    intro:
      "Ova Politika povrata novca objašnjava kada su povrati dostupni za Legantis pretplate.",
    sections: [
      {
        title: "1. Naknade za pretplatu",
        body: "Mjesečne naknade za pretplatu nisu povratne nakon što je obračunsko razdoblje započelo.",
      },
      {
        title: "2. Besplatno probno razdoblje",
        body: "Novi korisnici mogu koristiti besplatnu razinu s ograničenim značajkama. Nije potrebno plaćanje za početak.",
      },
      {
        title: "3. Otkazivanje",
        body: "Pretplatu možete otkazati u bilo kojem trenutku. Otkazivanje stupa na snagu na kraju tekućeg obračunskog razdoblja. Zadržat ćete pristup do tada.",
      },
      {
        title: "4. Iznimke",
        body: "U slučaju tehničkog kvara ili nedostupnosti usluge dulje od 48 sati, korisnici mogu zatražiti pro-rata povrat kontaktiranjem support@legantis.app",
      },
      {
        title: "5. Kontakt",
        body: "",
      },
    ],
    contactPrefix: "Za zahtjeve za povrat, kontaktirajte",
  },
  sl: {
    backHome: "Nazaj na začetno stran",
    title: "Politika vračil",
    updated: "Zadnja posodobitev: april 2026",
    intro:
      "Ta Politika vračil pojasnjuje, kdaj so vračila na voljo za naročnine Legantis.",
    sections: [
      {
        title: "1. Naročnina",
        body: "Mesečne naročnine niso vračljive, ko se obračunsko obdobje začne.",
      },
      {
        title: "2. Brezplačni preizkus",
        body: "Novi uporabniki lahko uporabljajo brezplačno raven z omejenimi funkcijami. Za začetek plačilo ni potrebno.",
      },
      {
        title: "3. Preklic",
        body: "Naročnino lahko kadar koli prekličete. Preklic začne veljati ob koncu trenutnega obračunskega obdobja. Dostop boste imeli do takrat.",
      },
      {
        title: "4. Izjeme",
        body: "V primeru tehnične napake ali nedosegljivosti storitve, ki traja več kot 48 ur, lahko uporabniki zahtevajo sorazmerno vračilo tako, da kontaktirajo support@legantis.app",
      },
      {
        title: "5. Kontakt",
        body: "",
      },
    ],
    contactPrefix: "Za zahteve za vračilo kontaktirajte",
  },
  me: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika povraćaja sredstava",
    updated: "Posljednje ažuriranje: april 2026",
    intro:
      "Ova Politika povraćaja sredstava objašnjava kada su povraćaji dostupni za Legantis pretplate.",
    sections: [
      {
        title: "1. Naknade za pretplatu",
        body: "Mjesečne naknade za pretplatu nijesu povratne nakon što obračunski period započne.",
      },
      {
        title: "2. Besplatni probni period",
        body: "Novi korisnici mogu koristiti besplatan nivo sa ograničenim funkcijama. Nije potrebno plaćanje za početak.",
      },
      {
        title: "3. Otkazivanje",
        body: "Pretplatu možete otkazati u bilo kom trenutku. Otkazivanje stupa na snagu na kraju tekućeg obračunskog perioda. Zadržaćete pristup do tada.",
      },
      {
        title: "4. Izuzeci",
        body: "U slučaju tehničkog kvara ili nedostupnosti usluge duže od 48 sati, korisnici mogu zatražiti proporcionalni povraćaj kontaktiranjem support@legantis.app",
      },
      {
        title: "5. Kontakt",
        body: "",
      },
    ],
    contactPrefix: "Za zahtjeve za povraćaj sredstava, kontaktirajte",
  },
}

export default function RefundPage() {
  const { language } = useLanguage()
  const content =
    REFUND_CONTENT[(language as Locale) ?? "en"] ?? REFUND_CONTENT.en

  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-base transition-transform duration-200 group-hover:scale-110">
                ←
              </span>
              <span>{content.backHome}</span>
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {content.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{content.updated}</p>
            <p className="mt-6 max-w-3xl text-muted-foreground">{content.intro}</p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10">
              {content.sections.slice(0, 4).map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <p className="mt-2 text-muted-foreground">{section.body}</p>
                </div>
              ))}

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {content.sections[4].title}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {content.contactPrefix}{" "}
                  <a
                    href="mailto:support@legantis.app"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    support@legantis.app
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

