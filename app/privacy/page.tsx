"use client"

import Link from "next/link"

import { Header } from "@/components/Header"
import { useLanguage } from "@/components/LanguageProvider"

type Locale = "en" | "sr" | "bs" | "hr" | "sl" | "me"

type PrivacySection = {
  title: string
  body: string
}

type PrivacyContent = {
  backHome: string
  title: string
  updated: string
  intro: string
  sections: PrivacySection[]
  contactPrefix: string
}

const PRIVACY_CONTENT: Record<Locale, PrivacyContent> = {
  en: {
    backHome: "Return to Homepage",
    title: "Privacy Policy",
    updated: "Last updated: March 2025",
    intro:
      "This Privacy Policy explains how Legantis collects, uses, stores, and shares information when you use our AI legal assistant.",
    sections: [
      {
        title: "1. Introduction",
        body: "Legantis is designed to be GDPR compliant. Legantis acts as the data controller for personal data processed in connection with providing the service.",
      },
      {
        title: "2. Data We Collect",
        body: "We may collect information such as your email address, name, law firm, documents you upload, and usage data (for example, feature usage and interaction data).",
      },
      {
        title: "3. How We Use Data",
        body: "We use data to provide and improve the service, perform AI processing to deliver features, process billing via Paddle, and understand product usage through analytics.",
      },
      {
        title: "4. Data Storage",
        body: "We store data in Supabase (EU region). Data is encrypted at rest where supported by the underlying infrastructure.",
      },
      {
        title: "5. Third Party Services",
        body: "We use third-party services to operate Legantis, including OpenAI (AI processing), Paddle (billing), and Supabase (database).",
      },
      {
        title: "6. Data Retention",
        body: "We retain personal data while your account is active. After account deletion, we delete or anonymize your personal data within 30 days, unless retention is required by law or for legitimate business purposes (such as dispute resolution).",
      },
      {
        title: "7. Your Rights (GDPR)",
        body: "Subject to applicable law, you may have rights to access, rectification, erasure, portability, and to object to or restrict certain processing of your personal data.",
      },
      {
        title: "8. Cookies",
        body: "We use session cookies only to keep you logged in and to maintain essential app functionality. We do not use tracking cookies for advertising.",
      },
      {
        title: "9. Data Transfers",
        body: "Your data may be processed outside the EU by OpenAI and Paddle as part of providing the service. Where required, we rely on appropriate safeguards for international transfers.",
      },
      {
        title: "10. Contact",
        body: "",
      },
    ],
    contactPrefix: "For privacy questions or requests, contact",
  },
  sr: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika privatnosti",
    updated: "Poslednje ažuriranje: mart 2025",
    intro:
      "Ova Politika privatnosti objašnjava kako Legantis prikuplja, koristi, čuva i deli informacije kada koristite naš AI pravni asistent.",
    sections: [
      { title: "1. Uvod", body: "Legantis je osmišljen tako da bude usklađen sa GDPR-om. Legantis deluje kao rukovalac podacima za lične podatke koji se obrađuju u vezi sa pružanjem usluge." },
      { title: "2. Podaci koje prikupljamo", body: "Možemo prikupljati informacije kao što su vaša e-mail adresa, ime, advokatska kancelarija, dokumenta koja otpremate i podaci o korišćenju (na primer, korišćenje funkcija i podaci o interakciji)." },
      { title: "3. Kako koristimo podatke", body: "Podatke koristimo za pružanje i unapređenje usluge, AI obradu radi isporuke funkcija, obradu naplate preko Paddle-a i razumevanje korišćenja proizvoda kroz analitiku." },
      { title: "4. Skladištenje podataka", body: "Podatke čuvamo u Supabase-u (EU region). Podaci su šifrovani u stanju mirovanja gde to podržava osnovna infrastruktura." },
      { title: "5. Usluge trećih strana", body: "Za rad Legantis-a koristimo usluge trećih strana, uključujući OpenAI (AI obrada), Paddle (naplata) i Supabase (baza podataka)." },
      { title: "6. Zadržavanje podataka", body: "Lične podatke zadržavamo dok je vaš nalog aktivan. Nakon brisanja naloga, brišemo ili anonimizujemo vaše lične podatke u roku od 30 dana, osim ako je čuvanje propisano zakonom ili potrebno iz legitimnih poslovnih razloga (kao što je rešavanje sporova)." },
      { title: "7. Vaša prava (GDPR)", body: "U skladu sa važećim zakonima, možete imati pravo na pristup, ispravku, brisanje, prenosivost i pravo prigovora ili ograničenja određene obrade vaših ličnih podataka." },
      { title: "8. Kolačići", body: "Koristimo samo sesijske kolačiće kako biste ostali prijavljeni i kako bi osnovne funkcije aplikacije radile. Ne koristimo kolačiće za praćenje u reklamne svrhe." },
      { title: "9. Prenos podataka", body: "Vaši podaci se mogu obrađivati van EU od strane OpenAI i Paddle kao deo pružanja usluge. Kada je potrebno, oslanjamo se na odgovarajuće mere zaštite za međunarodni prenos podataka." },
      { title: "10. Kontakt", body: "" },
    ],
    contactPrefix: "Za pitanja ili zahteve u vezi sa privatnošću, kontaktirajte",
  },
  bs: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika privatnosti",
    updated: "Posljednje ažuriranje: mart 2025",
    intro:
      "Ova Politika privatnosti objašnjava kako Legantis prikuplja, koristi, čuva i dijeli informacije kada koristite naš AI pravni asistent.",
    sections: [
      { title: "1. Uvod", body: "Legantis je dizajniran da bude usklađen sa GDPR-om. Legantis djeluje kao kontrolor podataka za lične podatke koji se obrađuju u vezi s pružanjem usluge." },
      { title: "2. Podaci koje prikupljamo", body: "Možemo prikupljati informacije kao što su vaša e-mail adresa, ime, advokatska kancelarija, dokumenti koje otpremate i podaci o korištenju (na primjer, korištenje funkcija i podaci o interakciji)." },
      { title: "3. Kako koristimo podatke", body: "Podatke koristimo za pružanje i unapređenje usluge, AI obradu radi isporuke funkcija, obradu naplate preko Paddle-a i razumijevanje korištenja proizvoda kroz analitiku." },
      { title: "4. Pohrana podataka", body: "Podatke pohranjujemo u Supabase-u (EU regija). Podaci su šifrirani u mirovanju gdje to podržava osnovna infrastruktura." },
      { title: "5. Usluge trećih strana", body: "Za rad Legantisa koristimo usluge trećih strana, uključujući OpenAI (AI obrada), Paddle (naplata) i Supabase (baza podataka)." },
      { title: "6. Zadržavanje podataka", body: "Lične podatke zadržavamo dok je vaš račun aktivan. Nakon brisanja računa, brišemo ili anonimiziramo vaše lične podatke u roku od 30 dana, osim ako je zadržavanje propisano zakonom ili potrebno iz legitimnih poslovnih razloga (kao što je rješavanje sporova)." },
      { title: "7. Vaša prava (GDPR)", body: "U skladu sa važećim zakonom, možete imati pravo na pristup, ispravku, brisanje, prenosivost i pravo prigovora ili ograničenja određene obrade vaših ličnih podataka." },
      { title: "8. Kolačići", body: "Koristimo samo sesijske kolačiće kako bismo vas održali prijavljenim i omogućili osnovne funkcionalnosti aplikacije. Ne koristimo kolačiće za praćenje u marketinške svrhe." },
      { title: "9. Prijenos podataka", body: "Vaši podaci mogu biti obrađivani van EU od strane OpenAI i Paddle kao dio pružanja usluge. Gdje je potrebno, oslanjamo se na odgovarajuće zaštitne mjere za međunarodni prijenos podataka." },
      { title: "10. Kontakt", body: "" },
    ],
    contactPrefix: "Za pitanja ili zahtjeve u vezi s privatnošću, kontaktirajte",
  },
  hr: {
    backHome: "Povratak na početnu stranicu",
    title: "Pravila privatnosti",
    updated: "Zadnje ažuriranje: ožujak 2025",
    intro:
      "Ova Pravila privatnosti objašnjavaju kako Legantis prikuplja, koristi, pohranjuje i dijeli informacije kada koristite naš AI pravni asistent.",
    sections: [
      { title: "1. Uvod", body: "Legantis je osmišljen da bude usklađen s GDPR-om. Legantis djeluje kao voditelj obrade za osobne podatke koji se obrađuju u vezi s pružanjem usluge." },
      { title: "2. Podaci koje prikupljamo", body: "Možemo prikupljati podatke kao što su vaša e-mail adresa, ime, odvjetnički ured, dokumenti koje učitavate i podaci o korištenju (primjerice, korištenje funkcija i podaci o interakciji)." },
      { title: "3. Kako koristimo podatke", body: "Podatke koristimo za pružanje i poboljšanje usluge, AI obradu radi isporuke funkcionalnosti, obradu naplate putem Paddle-a i razumijevanje korištenja proizvoda kroz analitiku." },
      { title: "4. Pohrana podataka", body: "Podatke pohranjujemo u Supabase-u (EU regija). Podaci su šifrirani u mirovanju gdje to podržava infrastruktura." },
      { title: "5. Usluge trećih strana", body: "Za rad Legantisa koristimo usluge trećih strana, uključujući OpenAI (AI obrada), Paddle (naplata) i Supabase (baza podataka)." },
      { title: "6. Zadržavanje podataka", body: "Osobne podatke zadržavamo dok je vaš račun aktivan. Nakon brisanja računa brišemo ili anonimiziramo vaše osobne podatke u roku od 30 dana, osim ako je zadržavanje potrebno prema zakonu ili legitimnim poslovnim razlozima (kao što je rješavanje sporova)." },
      { title: "7. Vaša prava (GDPR)", body: "Sukladno primjenjivom pravu, možete imati prava na pristup, ispravak, brisanje, prenosivost te pravo prigovora ili ograničenja određene obrade vaših osobnih podataka." },
      { title: "8. Kolačići", body: "Koristimo samo sesijske kolačiće kako biste ostali prijavljeni i kako bi osnovne funkcije aplikacije radile. Ne koristimo kolačiće za praćenje u marketinške svrhe." },
      { title: "9. Prijenos podataka", body: "Vaši podaci mogu biti obrađivani izvan EU od strane OpenAI i Paddle kao dio pružanja usluge. Kada je potrebno, oslanjamo se na odgovarajuće zaštitne mjere za međunarodne prijenose podataka." },
      { title: "10. Kontakt", body: "" },
    ],
    contactPrefix: "Za pitanja ili zahtjeve vezane uz privatnost kontaktirajte",
  },
  sl: {
    backHome: "Nazaj na začetno stran",
    title: "Pravilnik o zasebnosti",
    updated: "Zadnja posodobitev: marec 2025",
    intro:
      "Ta Pravilnik o zasebnosti pojasnjuje, kako Legantis zbira, uporablja, shranjuje in deli informacije, ko uporabljate naš AI pravni asistent.",
    sections: [
      { title: "1. Uvod", body: "Legantis je zasnovan skladno z GDPR. Legantis deluje kot upravljavec osebnih podatkov, obdelanih v povezavi z izvajanjem storitve." },
      { title: "2. Podatki, ki jih zbiramo", body: "Lahko zbiramo podatke, kot so vaš e-poštni naslov, ime, odvetniška pisarna, dokumenti, ki jih naložite, in podatki o uporabi (na primer uporaba funkcij in podatki o interakciji)." },
      { title: "3. Kako uporabljamo podatke", body: "Podatke uporabljamo za zagotavljanje in izboljšanje storitve, AI obdelavo za omogočanje funkcij, obdelavo plačil prek Paddle ter razumevanje uporabe izdelka z analitiko." },
      { title: "4. Shranjevanje podatkov", body: "Podatke hranimo v Supabase-u (EU regija). Podatki so v mirovanju šifrirani, kjer to podpira osnovna infrastruktura." },
      { title: "5. Storitve tretjih oseb", body: "Za delovanje Legantisa uporabljamo storitve tretjih oseb, vključno z OpenAI (AI obdelava), Paddle (obračun) in Supabase (baza podatkov)." },
      { title: "6. Hramba podatkov", body: "Osebne podatke hranimo, dokler je vaš račun aktiven. Po izbrisu računa vaše osebne podatke izbrišemo ali anonimiziramo v 30 dneh, razen če je hramba zahtevana z zakonom ali iz legitimnih poslovnih razlogov (npr. reševanje sporov)." },
      { title: "7. Vaše pravice (GDPR)", body: "V skladu z veljavno zakonodajo imate lahko pravice do dostopa, popravka, izbrisa, prenosljivosti ter ugovora ali omejitve določene obdelave vaših osebnih podatkov." },
      { title: "8. Piškotki", body: "Uporabljamo samo sejni piškotke za ohranjanje prijave in osnovno delovanje aplikacije. Piškotkov za sledenje za oglaševanje ne uporabljamo." },
      { title: "9. Prenos podatkov", body: "Vaše podatke lahko zunaj EU obdelujeta OpenAI in Paddle kot del izvajanja storitve. Kadar je to potrebno, uporabljamo ustrezne zaščitne ukrepe za mednarodne prenose podatkov." },
      { title: "10. Kontakt", body: "" },
    ],
    contactPrefix: "Za vprašanja ali zahteve glede zasebnosti kontaktirajte",
  },
  me: {
    backHome: "Povratak na početnu stranicu",
    title: "Politika privatnosti",
    updated: "Posljednje ažuriranje: mart 2025",
    intro:
      "Ova Politika privatnosti objašnjava kako Legantis prikuplja, koristi, čuva i dijeli informacije kada koristite naš AI pravni asistent.",
    sections: [
      { title: "1. Uvod", body: "Legantis je dizajniran da bude usklađen sa GDPR-om. Legantis djeluje kao kontrolor podataka za lične podatke koji se obrađuju u vezi sa pružanjem usluge." },
      { title: "2. Podaci koje prikupljamo", body: "Možemo prikupljati informacije kao što su vaša e-mail adresa, ime, advokatska kancelarija, dokumenta koja otpremate i podaci o korišćenju (na primjer, korišćenje funkcija i podaci o interakciji)." },
      { title: "3. Kako koristimo podatke", body: "Podatke koristimo za pružanje i unapređenje usluge, AI obradu radi isporuke funkcija, obradu naplate preko Paddle-a i razumijevanje korišćenja proizvoda kroz analitiku." },
      { title: "4. Skladištenje podataka", body: "Podatke čuvamo u Supabase-u (EU region). Podaci su šifrovani u mirovanju gdje to podržava osnovna infrastruktura." },
      { title: "5. Usluge trećih strana", body: "Za rad Legantisa koristimo usluge trećih strana, uključujući OpenAI (AI obrada), Paddle (naplata) i Supabase (baza podataka)." },
      { title: "6. Zadržavanje podataka", body: "Lične podatke zadržavamo dok je vaš nalog aktivan. Nakon brisanja naloga, brišemo ili anonimizujemo vaše lične podatke u roku od 30 dana, osim ako je zadržavanje propisano zakonom ili potrebno iz legitimnih poslovnih razloga (kao što je rješavanje sporova)." },
      { title: "7. Vaša prava (GDPR)", body: "U skladu sa važećim zakonom, možete imati pravo na pristup, ispravku, brisanje, prenosivost i pravo prigovora ili ograničenja određene obrade vaših ličnih podataka." },
      { title: "8. Kolačići", body: "Koristimo samo sesijske kolačiće kako bismo vas održali prijavljenim i omogućili osnovne funkcionalnosti aplikacije. Ne koristimo kolačiće za praćenje u marketinške svrhe." },
      { title: "9. Prenos podataka", body: "Vaši podaci mogu biti obrađivani van EU od strane OpenAI i Paddle kao dio pružanja usluge. Gdje je potrebno, oslanjamo se na odgovarajuće zaštitne mjere za međunarodni prenos podataka." },
      { title: "10. Kontakt", body: "" },
    ],
    contactPrefix: "Za pitanja ili zahtjeve u vezi sa privatnošću, kontaktirajte",
  },
}

export default function PrivacyPage() {
  const { language } = useLanguage()
  const content = PRIVACY_CONTENT[(language as Locale) ?? "en"] ?? PRIVACY_CONTENT.en

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
            <p className="mt-6 max-w-3xl text-muted-foreground">
              {content.intro}
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10">
              {content.sections.slice(0, 9).map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <p className="mt-2 text-muted-foreground">{section.body}</p>
                </div>
              ))}

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {content.sections[9].title}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {content.contactPrefix}{" "}
                  <a
                    href="mailto:privacy@legantis.io"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    privacy@legantis.io
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

