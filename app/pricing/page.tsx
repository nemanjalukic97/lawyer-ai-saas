"use client"

import Link from "next/link"

import { Header } from "@/components/Header"
import { useLanguage } from "@/components/LanguageProvider"
import { PricingCard } from "@/components/PricingCard"
import { Button } from "@/components/ui/button"
import { PRICING_TIERS } from "@/types"

export default function PricingPage() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Choose the plan that fits your practice.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Get started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/dashboard/billing">Manage billing</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="pricing-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="pricing-heading"
              className="text-center text-2xl font-bold text-foreground sm:text-3xl"
            >
              Plans
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              Monthly recurring billing via Paddle. Cancel anytime.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PRICING_TIERS.map((tier) => (
                <PricingCard
                  key={tier.id}
                  name={tier.name}
                  price={tier.price}
                  features={tier.features}
                  ctaLabel="Start free trial"
                  pricePeriodLabel={t("home.pricing.perMonth")}
                  recommended={tier.recommended}
                  planId={tier.id}
                />
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-border bg-muted/20 p-6">
              <h3 className="text-base font-semibold text-foreground">
                Billing notes
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Subscriptions renew monthly unless canceled.</li>
                <li>You can cancel at any time from your billing settings.</li>
                <li>No refunds for the current billing period.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

