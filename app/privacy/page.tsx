"use client"

import { Header } from "@/components/Header"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: March 2025
            </p>
            <p className="mt-6 max-w-3xl text-muted-foreground">
              This Privacy Policy explains how Legantis collects, uses, stores,
              and shares information when you use our AI legal assistant.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  1. Introduction
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Legantis is designed to be GDPR compliant. Legantis acts as
                  the data controller for personal data processed in connection
                  with providing the service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  2. Data We Collect
                </h2>
                <p className="mt-2 text-muted-foreground">
                  We may collect information such as your email address, name,
                  law firm, documents you upload, and usage data (for example,
                  feature usage and interaction data).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  3. How We Use Data
                </h2>
                <p className="mt-2 text-muted-foreground">
                  We use data to provide and improve the service, perform AI
                  processing to deliver features, process billing via Paddle,
                  and understand product usage through analytics.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  4. Data Storage
                </h2>
                <p className="mt-2 text-muted-foreground">
                  We store data in Supabase (EU region). Data is encrypted at
                  rest where supported by the underlying infrastructure.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  5. Third Party Services
                </h2>
                <p className="mt-2 text-muted-foreground">
                  We use third-party services to operate Legantis, including
                  OpenAI (AI processing), Paddle (billing), and Supabase
                  (database).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  6. Data Retention
                </h2>
                <p className="mt-2 text-muted-foreground">
                  We retain personal data while your account is active. After
                  account deletion, we delete or anonymize your personal data
                  within 30 days, unless retention is required by law or for
                  legitimate business purposes (such as dispute resolution).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  7. Your Rights (GDPR)
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Subject to applicable law, you may have rights to access,
                  rectification, erasure, portability, and to object to or
                  restrict certain processing of your personal data.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  8. Cookies
                </h2>
                <p className="mt-2 text-muted-foreground">
                  We use session cookies only to keep you logged in and to
                  maintain essential app functionality. We do not use tracking
                  cookies for advertising.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  9. Data Transfers
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Your data may be processed outside the EU by OpenAI and Paddle
                  as part of providing the service. Where required, we rely on
                  appropriate safeguards for international transfers.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  10. Contact
                </h2>
                <p className="mt-2 text-muted-foreground">
                  For privacy questions or requests, contact{" "}
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

