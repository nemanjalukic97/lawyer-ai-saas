"use client"

import Link from "next/link"

import { FeatureCard } from "@/components/FeatureCard"
import { Header } from "@/components/Header"
import { PricingCard } from "@/components/PricingCard"
import { SignupSuccessToast } from "@/components/SignupSuccessToast"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/LanguageProvider"
import { FEATURES, PRICING_TIERS } from "@/types"

type Props = {
  signupStatus?: string
}

export function HomeClient({ signupStatus }: Props) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="flex min-h-[85dvh] flex-col justify-center border-b border-border bg-muted/20 py-16 sm:py-24 md:min-h-[90dvh]">
          <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("home.hero.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">{t("nav.getStarted")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#pricing">{t("home.hero.pricingCta")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-14 py-16 sm:py-24"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="features-heading"
              className="text-center text-2xl font-bold text-foreground sm:text-3xl"
            >
              {t("home.features.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              {t("home.features.subtitle")}
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <FeatureCard
                  key={f.id}
                  title={t(`home.features.items.${f.id}.title`)}
                  description={t(`home.features.items.${f.id}.description`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="scroll-mt-14 border-t border-border bg-muted/20 py-16 sm:py-24"
          aria-labelledby="pricing-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="pricing-heading"
              className="text-center text-2xl font-bold text-foreground sm:text-3xl"
            >
              {t("home.pricing.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              {t("home.pricing.subtitle")}
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PRICING_TIERS.map((tier) => (
                <PricingCard
                  key={tier.id}
                  name={t(`home.pricing.tiers.${tier.id}.name`)}
                  price={tier.price}
                  features={tier.features.map((feature) =>
                    t(`home.pricing.tiers.${tier.id}.features.${feature}`)
                  )}
                  ctaLabel={t("home.pricing.cta")}
                  recommended={tier.recommended}
                  planId={tier.id as "solo" | "professional" | "firm"}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {signupStatus === "success" && <SignupSuccessToast />}
    </div>
  )
}

