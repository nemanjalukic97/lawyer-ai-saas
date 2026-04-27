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
  policySections: RefundSection[]
  contact: {
    title: string
    visitPrefix: string
    otherPrefix: string
  }
}

const PADDLE_HREF = "https://www.paddle.net"

const REFUND_CONTENT: Record<Locale, RefundContent> = {
  en: {
    backHome: "Return to Homepage",
    title: "Refund Policy",
    updated: "Last updated: April 2026",
    intro: "",
    policySections: [
      {
        title: "1. Merchant of Record",
        body: `All payments for Legantis subscriptions are processed by Paddle.com, our Merchant of Record. Paddle handles all payment processing, billing, and refund requests.

"Our order process is conducted by our online reseller Paddle.com. Paddle is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns."`,
      },
      {
        title: "2. Refund Window",
        body: "Refund requests must be submitted within 30 days of the transaction date. Requests submitted after 30 days will not be processed.",
      },
      {
        title: "3. How to Request a Refund",
        body: "To request a refund, please visit paddle.net or contact Paddle's support team directly. Legantis does not process refunds directly — all refund requests are handled by Paddle.",
      },
      {
        title: "4. Subscription Cancellations",
        body: "You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. You will retain access until then. Cancellations do not automatically trigger a refund.",
      },
      {
        title: "5. Free Tier",
        body: "Legantis offers a free tier with limited features. No payment is required to access the free tier.",
      },
    ],
    contact: {
      title: "6. Contact",
      visitPrefix: "For refund requests, please visit:",
      otherPrefix: "For other questions:",
    },
  },
  sr: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika povraćaja sredstava",
    updated: "Poslednje ažuriranje: april 2026",
    intro: "",
    policySections: [
      {
        title: "1. Merchant of Record",
        body: `Sva plaćanja za Legantis pretplate obrađuje Paddle.com, naš trgovac na mapi. Paddle vodi celokupno procesiranje plaćanja, naplatu i zahteve za povraćaj sredstava.

„Naš proces poručivanja sprovodi naš onlajn preprodavac Paddle.com. Paddle je trgovac na mapi za sve naše porudžbine. Paddle pruža sve upite korisničke podrške i rešava povrate.“`,
      },
      {
        title: "2. Rok za povraćaj",
        body: "Zahtevi za povraćaj moraju biti podneti u roku od 30 dana od datuma transakcije. Zahtevi podneti nakon 30 dana neće biti obrađeni.",
      },
      {
        title: "3. Kako zatražiti povraćaj",
        body: "Da biste zatražili povraćaj, posetite paddle.net ili se direktno obratite Podršci kompanije Paddle. Legantis ne obrađuje povraće direktno — sve zahteve za povraćaj rešava Paddle.",
      },
      {
        title: "4. Otkazivanje pretplate",
        body: "Pretplatu možete otkazati u bilo kom trenutku. Otkazivanje stupa na snagu na kraju tekućeg obračunskog perioda. Zadržaćete pristup do tada. Otkazivanja automatski ne pokreću povraćaj sredstava.",
      },
      {
        title: "5. Besplatan nivo",
        body: "Legantis nudi besplatan nivo sa ograničenim funkcijama. Nije potrebno plaćanje da biste pristupili besplatnom nivou.",
      },
    ],
    contact: {
      title: "6. Kontakt",
      visitPrefix: "Za zahteve za povraćaj sredstava, posetite:",
      otherPrefix: "Za ostala pitanja:",
    },
  },
  bs: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika povrata sredstava",
    updated: "Posljednje ažuriranje: april 2026",
    intro: "",
    policySections: [
      {
        title: "1. Merchant of Record",
        body: `Sva plaćanja za Legantis pretplate obrađuje Paddle.com, naš trgovac na snazi. Paddle vodi cjelokupno procesiranje plaćanja, naplatu i zahtjeve za povrat sredstava.

„Naš proces naručivanja provodi naš online preprodavac Paddle.com. Paddle je trgovac na snazi za sve naše narudžbe. Paddle pruža sve upite korisničke podrške i rješava povrate.“`,
      },
      {
        title: "2. Rok za povrat",
        body: "Zahtjevi za povrat moraju biti podnijeti u roku od 30 dana od datuma transakcije. Zahtjevi podnijeti nakon 30 dana neće biti obrađeni.",
      },
      {
        title: "3. Kako zatražiti povrat",
        body: "Da biste zatražili povrat, posjetite paddle.net ili se direktno obratite podršci kompanije Paddle. Legantis ne obrađuje povrate direktno — sve zahtjeve za povrat rješava Paddle.",
      },
      {
        title: "4. Otkazivanje pretplate",
        body: "Pretplatu možete otkazati u bilo kojem trenutku. Otkazivanje stupa na snagu na kraju tekućeg obračunskog perioda. Zadržat ćete pristup do tada. Otkazivanja automatski ne pokreću povrat sredstava.",
      },
      {
        title: "5. Besplatan nivo",
        body: "Legantis nudi besplatan nivo s ograničenim funkcijama. Nije potrebno plaćanje da biste pristupili besplatnom nivou.",
      },
    ],
    contact: {
      title: "6. Kontakt",
      visitPrefix: "Za zahtjeve za povrat sredstava, posjetite:",
      otherPrefix: "Za ostala pitanja:",
    },
  },
  hr: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika povrata novca",
    updated: "Zadnje ažuriranje: travanj 2026",
    intro: "",
    policySections: [
      {
        title: "1. Merchant of Record",
        body: `Sva plaćanja za Legantis pretplate obrađuje Paddle.com, naš trgovac na zapisu. Paddle vodi cjelokupno procesiranje plaćanja, naplatu i zahtjeve za povrat novca.

„Naš postupak naručivanja provodi naš online preprodavač Paddle.com. Paddle je trgovac na zapisu za sve naše narudžbe. Paddle pruža sve upite korisničke podrške i rješava povrate.“`,
      },
      {
        title: "2. Rok za povrat",
        body: "Zahtjevi za povrat moraju biti podneseni u roku od 30 dana od datuma transakcije. Zahtjevi podnijeti nakon 30 dana neće biti obrađeni.",
      },
      {
        title: "3. Kako zatražiti povrat",
        body: "Da biste zatražili povrat, posjetite paddle.net ili se izravno obratite podršci tvrtke Paddle. Legantis ne obrađuje povrate izravno — sve zahtjeve za povrat rješava Paddle.",
      },
      {
        title: "4. Otkazivanje pretplate",
        body: "Pretplatu možete otkazati u bilo kojem trenutku. Otkazivanje stupa na snagu na kraju tekućeg obračunskog razdoblja. Zadržat ćete pristup do tada. Otkazivanja automatski ne pokreću povrat novca.",
      },
      {
        title: "5. Besplatna razina",
        body: "Legantis nudi besplatnu razinu s ograničenim značajkama. Nije potrebno plaćanje za pristup besplatnoj razini.",
      },
    ],
    contact: {
      title: "6. Kontakt",
      visitPrefix: "Za zahtjeve za povrat, posjetite:",
      otherPrefix: "Za ostala pitanja:",
    },
  },
  sl: {
    backHome: "Nazaj na začetno stran",
    title: "Politika vračil",
    updated: "Zadnja posodobitev: april 2026",
    intro: "",
    policySections: [
      {
        title: "1. Merchant of Record",
        body: `Vsa plačila za naročnine Legantis obdeluje Paddle.com, naš trgovec v evidenci. Paddle vodi vso obdelavo plačil, zaračunavanje in vloge za vračila.

„Naš postopek naročanja vodi naš spletni preprodajalec Paddle.com. Paddle je trgovec v evidenci za vsa naša naročila. Paddle zagotavlja vse poizvedbe v skrb za stranke in rešuje vračila.“`,
      },
      {
        title: "2. Rok za vračilo",
        body: "Zahteve za vračilo morajo biti poslane v 30 dneh od datuma transakcije. Zahteve, poslane po 30 dneh, ne bodo obdelane.",
      },
      {
        title: "3. Kako zahtevati vračilo",
        body: "Če želite vračilo, obiščite paddle.net ali se neposredno obrnite na podporo družbe Paddle. Legantis vračil ne obdeluje neposredno — vse zahteve za vračilo obravnava Paddle.",
      },
      {
        title: "4. Preklic naročnine",
        body: "Naročnino lahko kadar koli prekličete. Preklic začne veljati ob koncu trenutnega obračunskega obdobja. Dostop boste imeli do takrat. Preklici samodejno ne sprožijo vračila.",
      },
      {
        title: "5. Brezplačna raven",
        body: "Legantis ponuja brezplačno raven z omejenimi funkcijami. Plačilo ni potrebno za dostop do brezplačne ravni.",
      },
    ],
    contact: {
      title: "6. Kontakt",
      visitPrefix: "Za zahteve za vračilo obiščite:",
      otherPrefix: "Za druga vprašanja:",
    },
  },
  me: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika povraćaja sredstava",
    updated: "Posljednje ažuriranje: april 2026",
    intro: "",
    policySections: [
      {
        title: "1. Merchant of Record",
        body: `Sva plaćanja za Legantis pretplate obrađuje Paddle.com, naš trgovac na mapi. Paddle vodi cjelokupno procesiranje plaćanja, naplatu i zahtjeve za povraćaj sredstava.

„Naš proces poručivanja sprovodi naš onlajn preprodavac Paddle.com. Paddle je trgovac na mapi za sve naše porudžbine. Paddle pruža sve upite korisničke podrške i rešava povrate.“`,
      },
      {
        title: "2. Rok za povraćaj",
        body: "Zahtjevi za povraćaj moraju biti podnijeti u roku od 30 dana od datuma transakcije. Zahtjevi podnijeti nakon 30 dana neće biti obrađeni.",
      },
      {
        title: "3. Kako zatražiti povraćaj",
        body: "Da biste zatražili povraćaj, posjetite paddle.net ili se direktno obratite podršci kompanije Paddle. Legantis ne obrađuje povraćaje direktno — sve zahteve za povraćaj rešava Paddle.",
      },
      {
        title: "4. Otkazivanje pretplate",
        body: "Pretplatu možete otkazati u bilo kom trenutku. Otkazivanje stupa na snagu na kraju tekućeg obračunskog perioda. Zadržaćete pristup do tada. Otkazivanja automatski ne pokreću povraćaj sredstava.",
      },
      {
        title: "5. Besplatan nivo",
        body: "Legantis nudi besplatan nivo sa ograničenim funkcijama. Nije potrebno plaćanje da biste pristupili besplatnom nivou.",
      },
    ],
    contact: {
      title: "6. Kontakt",
      visitPrefix: "Za zahtjeve za povraćaj sredstava, posjetite:",
      otherPrefix: "Za ostala pitanja:",
    },
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
            {content.intro ? (
              <p className="mt-6 max-w-3xl text-muted-foreground">{content.intro}</p>
            ) : null}
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10">
              {content.policySections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <p className="mt-2 whitespace-pre-line text-muted-foreground">
                    {section.body}
                  </p>
                </div>
              ))}

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {content.contact.title}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {content.contact.visitPrefix}{" "}
                  <a
                    href={PADDLE_HREF}
                    className="font-medium text-foreground underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    paddle.net
                  </a>
                </p>
                <p className="mt-2 text-muted-foreground">
                  {content.contact.otherPrefix}{" "}
                  <a
                    href="mailto:support@legantis.app"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    support@legantis.app
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
