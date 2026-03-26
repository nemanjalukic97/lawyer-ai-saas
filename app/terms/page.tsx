"use client"

import Link from "next/link"

import { Header } from "@/components/Header"
import { useLanguage } from "@/components/LanguageProvider"

type Locale = "en" | "sr" | "bs" | "hr" | "sl" | "me"

type TermsSection = {
  title: string
  body: string
}

type TermsContent = {
  backHome: string
  title: string
  updated: string
  intro: string
  sections: TermsSection[]
  contactPrefix: string
}

const TERMS_CONTENT: Record<Locale, TermsContent> = {
  en: {
    backHome: "Return to Homepage",
    title: "Terms of Service",
    updated: "Last updated: March 2025",
    intro:
      "These Terms of Service govern your access to and use of Legantis, an AI legal assistant for lawyers in the Balkans. By using the service, you agree to these terms.",
    sections: [
      { title: "1. Acceptance of Terms", body: "By creating an account, accessing, or using Legantis, you confirm that you have read, understood, and agree to be bound by these Terms of Service." },
      { title: "2. Description of Service", body: "Legantis provides an AI legal assistant for document generation, contract drafting, case predictions, and document analysis for lawyers in Bosnia & Herzegovina, Serbia, Croatia, Montenegro, Slovenia." },
      { title: "3. User Accounts", body: "You may need to register for an account to use certain features. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account." },
      { title: "4. Subscription and Billing", body: "Subscriptions are processed via Paddle and are billed on a monthly recurring basis unless otherwise stated. You can cancel anytime. Fees for the current billing period are non refundable." },
      { title: "5. Acceptable Use", body: "You may use the service only for lawful purposes. You must not misuse the service or attempt to use the AI in ways that are harmful, deceptive, or unlawful." },
      { title: "6. AI Disclaimer", body: "AI-generated outputs are provided for informational purposes and are not legal advice. You are solely responsible for reviewing, validating, and adapting any AI-generated content before relying on it or sharing it with clients or third parties." },
      { title: "7. Intellectual Property", body: "You retain ownership of your content, including documents you upload and materials you generate. Legantis retains ownership of the platform, software, and all related intellectual property." },
      { title: "8. Privacy", body: "Our collection and use of personal data is described in our Privacy Policy." },
      { title: "9. Termination", body: "We may suspend or terminate your access to the service if you violate these terms or if your use poses a risk to the platform, other users, or third parties." },
      { title: "10. Limitation of Liability", body: "To the maximum extent permitted by law, Legantis will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill arising from or related to your use of the service." },
      { title: "11. Governing Law", body: "These terms are governed by the laws of Bosnia & Herzegovina, without regard to conflict of laws principles." },
      { title: "12. Contact", body: "" },
    ],
    contactPrefix: "For questions about these Terms of Service, contact us at",
  },
  sr: {
    backHome: "Povratak na početnu stranicu",
    title: "Uslovi korišćenja",
    updated: "Poslednje ažuriranje: mart 2025",
    intro:
      "Ovi Uslovi korišćenja regulišu vaš pristup i korišćenje Legantisa, AI pravnog asistenta za advokate na Balkanu. Korišćenjem usluge prihvatate ove uslove.",
    sections: [
      { title: "1. Prihvatanje uslova", body: "Kreiranjem naloga, pristupom ili korišćenjem Legantisa potvrđujete da ste pročitali, razumeli i prihvatili ove Uslove korišćenja." },
      { title: "2. Opis usluge", body: "Legantis pruža AI pravnog asistenta za generisanje dokumenata, izradu ugovora, predviđanje ishoda sporova i analizu dokumenata za advokate u Bosni i Hercegovini, Srbiji, Hrvatskoj, Crnoj Gori i Sloveniji." },
      { title: "3. Korisnički nalozi", body: "Možda ćete morati da registrujete nalog za korišćenje određenih funkcija. Odgovorni ste za čuvanje poverljivosti lozinke i za sve aktivnosti koje se obavljaju pod vašim nalogom." },
      { title: "4. Pretplata i naplata", body: "Pretplate se obrađuju preko Paddle-a i naplaćuju se mesečno, osim ako nije drugačije navedeno. Pretplatu možete otkazati u bilo kom trenutku. Naknade za tekući obračunski period nisu povratne." },
      { title: "5. Dozvoljeno korišćenje", body: "Uslugu možete koristiti samo u zakonite svrhe. Ne smete zloupotrebljavati uslugu niti pokušavati da koristite AI na način koji je štetan, obmanjujući ili nezakonit." },
      { title: "6. AI odricanje odgovornosti", body: "AI generisani sadržaj služi isključivo u informativne svrhe i ne predstavlja pravni savet. Isključivo ste odgovorni za proveru, validaciju i prilagođavanje AI sadržaja pre oslanjanja na njega ili deljenja sa klijentima i trećim stranama." },
      { title: "7. Intelektualna svojina", body: "Zadržavate vlasništvo nad svojim sadržajem, uključujući dokumenta koja otpremate i materijale koje generišete. Legantis zadržava vlasništvo nad platformom, softverom i pratećom intelektualnom svojinom." },
      { title: "8. Privatnost", body: "Način na koji prikupljamo i koristimo lične podatke opisan je u našoj Politici privatnosti." },
      { title: "9. Raskid", body: "Možemo suspendovati ili ukinuti vaš pristup usluzi ako prekršite ove uslove ili ako vaše korišćenje predstavlja rizik za platformu, druge korisnike ili treće strane." },
      { title: "10. Ograničenje odgovornosti", body: "U najvećoj meri dozvoljenoj zakonom, Legantis nije odgovoran za bilo kakvu indirektnu, slučajnu, posebnu, posledičnu ili kaznenu štetu, niti za gubitak dobiti, podataka ili reputacije koji proizlaze iz korišćenja usluge." },
      { title: "11. Merodavno pravo", body: "Ovi uslovi uređeni su zakonima Bosne i Hercegovine, bez primene pravila o sukobu zakona." },
      { title: "12. Kontakt", body: "" },
    ],
    contactPrefix: "Za pitanja u vezi sa Uslovima korišćenja kontaktirajte nas na",
  },
  bs: {
    backHome: "Povratak na početnu stranicu",
    title: "Uslovi korištenja",
    updated: "Posljednje ažuriranje: mart 2025",
    intro:
      "Ovi Uslovi korištenja uređuju vaš pristup i korištenje Legantisa, AI pravnog asistenta za advokate na Balkanu. Korištenjem usluge prihvatate ove uslove.",
    sections: [
      { title: "1. Prihvatanje uslova", body: "Kreiranjem računa, pristupom ili korištenjem Legantisa potvrđujete da ste pročitali, razumjeli i prihvatili ove Uslove korištenja." },
      { title: "2. Opis usluge", body: "Legantis pruža AI pravnog asistenta za generisanje dokumenata, izradu ugovora, predviđanje ishoda sporova i analizu dokumenata za advokate u Bosni i Hercegovini, Srbiji, Hrvatskoj, Crnoj Gori i Sloveniji." },
      { title: "3. Korisnički računi", body: "Za korištenje određenih funkcija može biti potrebna registracija računa. Odgovorni ste za čuvanje povjerljivosti lozinke i za sve aktivnosti koje se odvijaju pod vašim računom." },
      { title: "4. Pretplata i naplata", body: "Pretplate se obrađuju preko Paddle-a i naplaćuju mjesečno, osim ako nije drugačije navedeno. Pretplatu možete otkazati u bilo kojem trenutku. Naknade za tekući obračunski period nisu povratne." },
      { title: "5. Dozvoljeno korištenje", body: "Uslugu možete koristiti samo u zakonite svrhe. Ne smijete zloupotrebljavati uslugu niti pokušavati koristiti AI na način koji je štetan, obmanjujući ili nezakonit." },
      { title: "6. AI odricanje odgovornosti", body: "AI generisani sadržaj služi isključivo u informativne svrhe i ne predstavlja pravni savjet. Isključivo ste odgovorni za pregled, validaciju i prilagođavanje AI sadržaja prije oslanjanja na njega ili dijeljenja s klijentima i trećim stranama." },
      { title: "7. Intelektualno vlasništvo", body: "Zadržavate vlasništvo nad svojim sadržajem, uključujući dokumente koje otpremate i materijale koje generišete. Legantis zadržava vlasništvo nad platformom, softverom i povezanim pravima intelektualnog vlasništva." },
      { title: "8. Privatnost", body: "Način na koji prikupljamo i koristimo lične podatke opisan je u našoj Politici privatnosti." },
      { title: "9. Raskid", body: "Možemo suspendovati ili ukinuti vaš pristup usluzi ako prekršite ove uslove ili ako vaše korištenje predstavlja rizik za platformu, druge korisnike ili treće strane." },
      { title: "10. Ograničenje odgovornosti", body: "U najvećoj mjeri dozvoljenoj zakonom, Legantis nije odgovoran za indirektnu, slučajnu, posebnu, posljedičnu ili kaznenu štetu, niti za gubitak dobiti, podataka ili ugleda koji proizlazi iz korištenja usluge." },
      { title: "11. Mjerodavno pravo", body: "Ovi uslovi uređeni su zakonima Bosne i Hercegovine, bez primjene pravila o sukobu zakona." },
      { title: "12. Kontakt", body: "" },
    ],
    contactPrefix: "Za pitanja o ovim Uslovima korištenja kontaktirajte nas na",
  },
  hr: {
    backHome: "Povratak na početnu stranicu",
    title: "Uvjeti korištenja",
    updated: "Zadnje ažuriranje: ožujak 2025",
    intro:
      "Ovi Uvjeti korištenja uređuju vaš pristup i korištenje Legantisa, AI pravnog asistenta za odvjetnike na Balkanu. Korištenjem usluge prihvaćate ove uvjete.",
    sections: [
      { title: "1. Prihvaćanje uvjeta", body: "Otvaranjem računa, pristupom ili korištenjem Legantisa potvrđujete da ste pročitali, razumjeli i prihvatili ove Uvjete korištenja." },
      { title: "2. Opis usluge", body: "Legantis pruža AI pravnog asistenta za generiranje dokumenata, izradu ugovora, predviđanje ishoda sporova i analizu dokumenata za odvjetnike u Bosni i Hercegovini, Srbiji, Hrvatskoj, Crnoj Gori i Sloveniji." },
      { title: "3. Korisnički računi", body: "Za korištenje određenih funkcija možda ćete morati registrirati račun. Odgovorni ste za čuvanje povjerljivosti lozinke i za sve aktivnosti koje se odvijaju pod vašim računom." },
      { title: "4. Pretplata i naplata", body: "Pretplate se obrađuju putem Paddle-a i naplaćuju se mjesečno, osim ako nije drugačije navedeno. Pretplatu možete otkazati u bilo kojem trenutku. Naknade za tekuće obračunsko razdoblje nisu povratne." },
      { title: "5. Dopuštena uporaba", body: "Uslugu možete koristiti samo u zakonite svrhe. Ne smijete zloupotrebljavati uslugu niti pokušavati koristiti AI na način koji je štetan, obmanjujući ili nezakonit." },
      { title: "6. AI odricanje odgovornosti", body: "AI generirani sadržaj služi isključivo u informativne svrhe i ne predstavlja pravni savjet. Isključivo ste odgovorni za pregled, validaciju i prilagodbu AI sadržaja prije oslanjanja na njega ili dijeljenja s klijentima i trećim stranama." },
      { title: "7. Intelektualno vlasništvo", body: "Zadržavate vlasništvo nad svojim sadržajem, uključujući dokumente koje učitavate i materijale koje generirate. Legantis zadržava vlasništvo nad platformom, softverom i pripadajućim pravima intelektualnog vlasništva." },
      { title: "8. Privatnost", body: "Način na koji prikupljamo i koristimo osobne podatke opisan je u našim Pravilima privatnosti." },
      { title: "9. Raskid", body: "Možemo suspendirati ili ukinuti vaš pristup usluzi ako prekršite ove uvjete ili ako vaše korištenje predstavlja rizik za platformu, druge korisnike ili treće strane." },
      { title: "10. Ograničenje odgovornosti", body: "U najvećoj mjeri dopuštenoj zakonom, Legantis nije odgovoran za bilo kakvu neizravnu, slučajnu, posebnu, posljedičnu ili kaznenu štetu, niti za gubitak dobiti, podataka ili ugleda koji proizlazi iz korištenja usluge." },
      { title: "11. Mjerodavno pravo", body: "Ovi uvjeti uređeni su zakonima Bosne i Hercegovine, bez primjene pravila o sukobu zakona." },
      { title: "12. Kontakt", body: "" },
    ],
    contactPrefix: "Za pitanja o ovim Uvjetima korištenja kontaktirajte nas na",
  },
  sl: {
    backHome: "Nazaj na začetno stran",
    title: "Pogoji uporabe",
    updated: "Zadnja posodobitev: marec 2025",
    intro:
      "Ti Pogoji uporabe urejajo vaš dostop do Legantisa in njegovo uporabo, AI pravnega asistenta za odvetnike na Balkanu. Z uporabo storitve se strinjate s temi pogoji.",
    sections: [
      { title: "1. Sprejem pogojev", body: "Z ustvarjanjem računa, dostopom ali uporabo Legantisa potrjujete, da ste prebrali, razumeli in se strinjate s temi Pogoji uporabe." },
      { title: "2. Opis storitve", body: "Legantis zagotavlja AI pravnega asistenta za ustvarjanje dokumentov, pripravo pogodb, napoved izidov sporov in analizo dokumentov za odvetnike v Bosni in Hercegovini, Srbiji, Hrvaški, Črni gori in Sloveniji." },
      { title: "3. Uporabniški računi", body: "Za uporabo določenih funkcij boste morda morali registrirati račun. Odgovorni ste za varovanje zaupnosti gesla in za vse dejavnosti, ki potekajo pod vašim računom." },
      { title: "4. Naročnina in obračun", body: "Naročnine se obdelujejo prek Paddle-a in se obračunavajo mesečno, razen če je določeno drugače. Naročnino lahko kadar koli prekličete. Stroški za trenutno obračunsko obdobje niso vračljivi." },
      { title: "5. Dovoljena uporaba", body: "Storitev lahko uporabljate le v zakonite namene. Storitve ne smete zlorabljati ali AI uporabljati na škodljiv, zavajajoč ali nezakonit način." },
      { title: "6. AI omejitev odgovornosti", body: "AI ustvarjeni rezultati so namenjeni informativni uporabi in ne predstavljajo pravnega nasveta. Izključno vi ste odgovorni za pregled, preverjanje in prilagoditev AI vsebine pred uporabo ali deljenjem s strankami in tretjimi osebami." },
      { title: "7. Intelektualna lastnina", body: "Ohranite lastništvo svoje vsebine, vključno z dokumenti, ki jih naložite, in gradivi, ki jih ustvarite. Legantis ohrani lastništvo platforme, programske opreme in vse povezane intelektualne lastnine." },
      { title: "8. Zasebnost", body: "Način zbiranja in uporabe osebnih podatkov je opisan v našem Pravilniku o zasebnosti." },
      { title: "9. Prenehanje", body: "Lahko začasno onemogočimo ali ukinemo vaš dostop do storitve, če kršite te pogoje ali če vaša uporaba predstavlja tveganje za platformo, druge uporabnike ali tretje osebe." },
      { title: "10. Omejitev odgovornosti", body: "V največjem obsegu, ki ga dovoljuje zakon, Legantis ne odgovarja za kakršno koli posredno, naključno, posebno, posledično ali kaznovalno škodo oziroma za izgubo dobička, podatkov ali ugleda, ki izhaja iz uporabe storitve." },
      { title: "11. Veljavno pravo", body: "Ti pogoji so urejeni po zakonodaji Bosne in Hercegovine, brez uporabe pravil o koliziji zakonov." },
      { title: "12. Kontakt", body: "" },
    ],
    contactPrefix: "Za vprašanja o teh Pogojih uporabe nas kontaktirajte na",
  },
  me: {
    backHome: "Povratak na početnu stranicu",
    title: "Uslovi korišćenja",
    updated: "Posljednje ažuriranje: mart 2025",
    intro:
      "Ovi Uslovi korišćenja uređuju vaš pristup i korišćenje Legantisa, AI pravnog asistenta za advokate na Balkanu. Korišćenjem usluge prihvatate ove uslove.",
    sections: [
      { title: "1. Prihvatanje uslova", body: "Kreiranjem naloga, pristupom ili korišćenjem Legantisa potvrđujete da ste pročitali, razumjeli i prihvatili ove Uslove korišćenja." },
      { title: "2. Opis usluge", body: "Legantis pruža AI pravnog asistenta za generisanje dokumenata, izradu ugovora, predviđanje ishoda sporova i analizu dokumenata za advokate u Bosni i Hercegovini, Srbiji, Hrvatskoj, Crnoj Gori i Sloveniji." },
      { title: "3. Korisnički nalozi", body: "Za korišćenje određenih funkcija može biti potrebna registracija naloga. Odgovorni ste za čuvanje povjerljivosti lozinke i za sve aktivnosti koje se obavljaju pod vašim nalogom." },
      { title: "4. Pretplata i naplata", body: "Pretplate se obrađuju preko Paddle-a i naplaćuju mjesečno, osim ako nije drugačije navedeno. Pretplatu možete otkazati u bilo kom trenutku. Naknade za tekući obračunski period nijesu povratne." },
      { title: "5. Dozvoljeno korišćenje", body: "Uslugu možete koristiti samo u zakonite svrhe. Ne smijete zloupotrebljavati uslugu niti pokušavati da koristite AI na način koji je štetan, obmanjujući ili nezakonit." },
      { title: "6. AI odricanje odgovornosti", body: "AI generisani sadržaj služi isključivo u informativne svrhe i ne predstavlja pravni savjet. Isključivo ste odgovorni za pregled, validaciju i prilagođavanje AI sadržaja prije oslanjanja na njega ili dijeljenja sa klijentima i trećim stranama." },
      { title: "7. Intelektualna svojina", body: "Zadržavate vlasništvo nad svojim sadržajem, uključujući dokumenta koja otpremate i materijale koje generišete. Legantis zadržava vlasništvo nad platformom, softverom i povezanom intelektualnom svojinom." },
      { title: "8. Privatnost", body: "Način na koji prikupljamo i koristimo lične podatke opisan je u našoj Politici privatnosti." },
      { title: "9. Raskid", body: "Možemo suspendovati ili ukinuti vaš pristup usluzi ako prekršite ove uslove ili ako vaše korišćenje predstavlja rizik za platformu, druge korisnike ili treće strane." },
      { title: "10. Ograničenje odgovornosti", body: "U najvećoj mjeri dozvoljenoj zakonom, Legantis nije odgovoran za bilo kakvu indirektnu, slučajnu, posebnu, posledičnu ili kaznenu štetu, niti za gubitak dobiti, podataka ili ugleda koji proizlazi iz korišćenja usluge." },
      { title: "11. Mjerodavno pravo", body: "Ovi uslovi uređeni su zakonima Bosne i Hercegovine, bez primjene pravila o sukobu zakona." },
      { title: "12. Kontakt", body: "" },
    ],
    contactPrefix: "Za pitanja o ovim Uslovima korišćenja kontaktirajte nas na",
  },
}

export default function TermsPage() {
  const { language } = useLanguage()
  const content = TERMS_CONTENT[(language as Locale) ?? "en"] ?? TERMS_CONTENT.en

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
              {content.sections.slice(0, 11).map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <p className="mt-2 text-muted-foreground">{section.body}</p>
                </div>
              ))}

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {content.sections[11].title}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {content.contactPrefix}{" "}
                  <a
                    href="mailto:support@legantis.io"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    support@legantis.io
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

