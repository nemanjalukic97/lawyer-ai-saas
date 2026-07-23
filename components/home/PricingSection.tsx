"use client"

import { PricingCard } from "@/components/PricingCard"
import { useLanguage } from "@/components/LanguageProvider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PRICING_TIERS } from "@/types"

import { ScrollReveal } from "./ScrollReveal"
import { HOME_SECTION_H2_CLASS, STAGGER_MS_3 } from "./home-styles"

export function HomePricingSection() {
  const { t } = useLanguage()

  return (
    <section
      id="pricing"
      className="relative overflow-hidden scroll-mt-14 border-t border-border bg-muted/20 py-16 sm:py-24"
      aria-labelledby="pricing-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(27,79,216,0.10) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(27,79,216,0.10) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="flex flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="mb-3 border border-border/80 bg-background/60 font-medium"
          >
            {t("home.pricing.noFees")}
          </Badge>
          <h2
            id="pricing-heading"
            className={cn(HOME_SECTION_H2_CLASS, "text-foreground normal-case")}
          >
            {t("home.pricing.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            {t("home.pricing.subtitle")}
          </p>
        </ScrollReveal>
        <div className="mt-12 grid gap-10 min-[767px]:gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <ScrollReveal
              key={tier.id}
              className="h-full min-h-0"
              delayMs={STAGGER_MS_3[i]}
            >
              <PricingCard
                name={t(`home.pricing.tiers.${tier.id}.name`)}
                price={tier.price}
                features={tier.features.map((feature) =>
                  t(`home.pricing.tiers.${tier.id}.features.${feature}`)
                )}
                ctaLabel={t("home.pricing.cta")}
                pricePeriodLabel={t("home.pricing.perMonth")}
                recommendedLabel={t("home.pricing.recommended")}
                recommended={tier.recommended}
                planId={tier.id as "solo" | "professional" | "firm"}
              />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-20 overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full min-w-[480px] border-collapse bg-background text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  {t("home.pricing.comparison.colFeature")}
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  {t("home.pricing.comparison.colSolo")}
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  {t("home.pricing.comparison.colProfessional")}
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  {t("home.pricing.comparison.colFirm")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-muted/10 text-foreground">
              <tr className="border-b border-border/80">
                <td className="px-4 py-3">
                  {t("home.pricing.comparison.rowAiCalls")}
                </td>
                <td className="px-4 py-3">20</td>
                <td className="px-4 py-3">100</td>
                <td className="px-4 py-3">300</td>
              </tr>
              <tr className="border-b border-border/80">
                <td className="px-4 py-3">
                  {t("home.pricing.comparison.rowContractTypes")}
                </td>
                <td className="px-4 py-3">{t("home.pricing.comparison.all")}</td>
                <td className="px-4 py-3">{t("home.pricing.comparison.all")}</td>
                <td className="px-4 py-3">{t("home.pricing.comparison.all")}</td>
              </tr>
              <tr className="border-b border-border/80">
                <td className="px-4 py-3">
                  {t("home.pricing.comparison.rowUsers")}
                </td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">
                  {t("home.pricing.comparison.usersFirm")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  {t("home.pricing.comparison.rowPriority")}
                </td>
                <td className="px-4 py-3" aria-label={t("home.pricing.comparison.no")}>
                  {t("home.pricing.comparison.no")}
                </td>
                <td className="px-4 py-3" aria-label={t("home.pricing.comparison.yes")}>
                  {t("home.pricing.comparison.yes")}
                </td>
                <td className="px-4 py-3" aria-label={t("home.pricing.comparison.yes")}>
                  {t("home.pricing.comparison.yes")}
                </td>
              </tr>
            </tbody>
          </table>
        </ScrollReveal>
        <ScrollReveal>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("home.pricing.trustLine")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
