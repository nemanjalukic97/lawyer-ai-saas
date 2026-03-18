"use client"

import { Header } from "@/components/Header"

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: March 2025
            </p>
            <p className="mt-6 max-w-3xl text-muted-foreground">
              These Terms of Service govern your access to and use of Legantis,
              an AI legal assistant for lawyers in the Balkans. By using the
              service, you agree to these terms.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  1. Acceptance of Terms
                </h2>
                <p className="mt-2 text-muted-foreground">
                  By creating an account, accessing, or using Legantis, you
                  confirm that you have read, understood, and agree to be bound
                  by these Terms of Service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  2. Description of Service
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Legantis provides an AI legal assistant for document
                  generation, contract drafting, case predictions, and document
                  analysis for lawyers in Bosnia &amp; Herzegovina, Serbia,
                  Croatia, Montenegro, Slovenia.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  3. User Accounts
                </h2>
                <p className="mt-2 text-muted-foreground">
                  You may need to register for an account to use certain
                  features. You are responsible for maintaining the
                  confidentiality of your password and for all activities that
                  occur under your account.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  4. Subscription and Billing
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Subscriptions are processed via Paddle and are billed on a
                  monthly recurring basis unless otherwise stated. You can
                  cancel anytime. Fees for the current billing period are non
                  refundable.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  5. Acceptable Use
                </h2>
                <p className="mt-2 text-muted-foreground">
                  You may use the service only for lawful purposes. You must
                  not misuse the service or attempt to use the AI in ways that
                  are harmful, deceptive, or unlawful.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  6. AI Disclaimer
                </h2>
                <p className="mt-2 text-muted-foreground">
                  AI-generated outputs are provided for informational purposes
                  and are not legal advice. You are solely responsible for
                  reviewing, validating, and adapting any AI-generated content
                  before relying on it or sharing it with clients or third
                  parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  7. Intellectual Property
                </h2>
                <p className="mt-2 text-muted-foreground">
                  You retain ownership of your content, including documents you
                  upload and materials you generate. Legantis retains ownership
                  of the platform, software, and all related intellectual
                  property.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  8. Privacy
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Our collection and use of personal data is described in our
                  Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  9. Termination
                </h2>
                <p className="mt-2 text-muted-foreground">
                  We may suspend or terminate your access to the service if you
                  violate these terms or if your use poses a risk to the
                  platform, other users, or third parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  10. Limitation of Liability
                </h2>
                <p className="mt-2 text-muted-foreground">
                  To the maximum extent permitted by law, Legantis will not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, or any loss of profits, data, or goodwill
                  arising from or related to your use of the service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  11. Governing Law
                </h2>
                <p className="mt-2 text-muted-foreground">
                  These terms are governed by the laws of Bosnia &amp;
                  Herzegovina, without regard to conflict of laws principles.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  12. Contact
                </h2>
                <p className="mt-2 text-muted-foreground">
                  For questions about these Terms of Service, contact us at{" "}
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

