"use client"

import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"
import { FileCheck, MessageSquare, UserPlus } from "lucide-react"

import DashboardMockup from "@/components/DashboardMockup"
import { FeatureCard } from "@/components/FeatureCard"
import { Header } from "@/components/Header"
import { PricingCard } from "@/components/PricingCard"
import { SignupSuccessToast } from "@/components/SignupSuccessToast"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageProvider"
import { FEATURES, PRICING_TIERS } from "@/types"

const FEATURE_CARD_ICONS: Record<(typeof FEATURES)[number]["id"], ReactNode> = {
  prediction: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17L8 12L12 15L17 8L21 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="11" r="1.5" fill="currentColor" />
      <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M3 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="17" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  contracts: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V8L14 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 3V8H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M9 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M13 10.5L14.5 12L17 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  analysis: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M8 8.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M8 13.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  time: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 9V13.5L14.5 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 3H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 3V5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 5.5L17.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  portal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <path
        d="M5.5 17.5C5.5 15.5 7 14 9 14C11 14 12.5 15.5 12.5 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M14.5 10H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M14.5 13H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M16.5 8.5L17.5 9.5L19.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const JURISDICTION_KEYS = ["ba", "rs", "hr", "me", "si"] as const

const HOW_STEPS = [
  { n: 1, icon: UserPlus },
  { n: 2, icon: MessageSquare },
  { n: 3, icon: FileCheck },
] as const

const TESTIMONIAL_KEYS = ["1", "2", "3"] as const

const FAQ_ITEMS = [1, 2, 3, 4, 5, 6, 7] as const

type Props = {
  signupStatus?: string
}

export function HomeClient({ signupStatus }: Props) {
  const { t } = useLanguage()
  const [openFaqItem, setOpenFaqItem] = useState<number | null>(null)

  useEffect(() => {
    setOpenFaqItem(null)
  }, [])

  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative z-0 flex min-h-[85dvh] flex-col justify-center border-b border-border bg-muted/20 py-16 sm:py-24 md:min-h-[90dvh]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[50px]"
          />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
            <div className="flex justify-center">
              <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                {t("home.hero.trustBadge")}
              </span>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("home.hero.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button asChild size="lg" className="h-11 min-w-[200px] text-base sm:h-11 sm:text-sm">
                <Link href="/signup">{t("home.hero.getStartedFree")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 min-w-[200px] text-base sm:h-11 sm:text-sm"
              >
                <Link href="#pricing">{t("home.hero.pricingCta")}</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{t("home.hero.noCreditCard")}</p>

            <div
              className="mt-[68px] mx-auto max-w-4xl rotate-0 sm:rotate-1"
              style={{
                transformOrigin: "center center",
                transition: "transform 0.08s ease-out",
              }}
              onMouseMove={(e) => {
                if (window.innerWidth < 768) return
                const el = e.currentTarget
                el.style.transition = "transform 0.08s ease-out"
                const rect = el.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) rotate(1deg)`
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth < 768) return
                const el = e.currentTarget
                el.style.transition = "transform 0.4s ease-out"
                el.style.transform = ""
              }}
            >
              <DashboardMockup />
            </div>
          </div>
        </section>

        {/* Jurisdiction bar */}
        <section
          className="border-b border-t border-border bg-muted/10 py-8"
          aria-labelledby="jurisdiction-bar-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="jurisdiction-bar-heading"
              className="text-center text-sm font-medium text-muted-foreground"
            >
              {t("home.jurisdictionBar.title")}
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {JURISDICTION_KEYS.map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm text-foreground"
                >
                  {t(`home.jurisdictionBar.countries.${key}`)}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-14 border-b border-border py-16 sm:py-24"
          aria-labelledby="how-it-works-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="how-it-works-heading"
              className="text-center text-2xl font-bold text-foreground sm:text-3xl"
            >
              {t("home.howItWorks.title")}
            </h2>
            <div className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-[2.5rem] hidden border-t border-dashed border-border/80 md:block"
              />
              {HOW_STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.n}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground">
                      {step.n}
                    </div>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t(`home.howItWorks.step${step.n}.title`)}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      {t(`home.howItWorks.step${step.n}.desc`)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="relative z-0 scroll-mt-14 py-16 sm:py-24"
          aria-labelledby="features-heading"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-[56%] -z-10 h-[70%] w-[60%] -translate-y-1/2 rounded-full bg-white/[0.05] blur-[15px] min-[1440px]:h-[50%] min-[1440px]:w-[30%] min-[1440px]:blur-[6px]"
          />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <Badge
                variant="secondary"
                className="mb-3 border border-border/80 bg-background/60 font-medium"
              >
                {t("home.features.badge")}
              </Badge>
              <h2
                id="features-heading"
                className="text-2xl font-bold text-foreground sm:text-3xl"
              >
                {t("home.features.titleNew")}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                {t("home.features.subtitle")}
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:hidden">
              {FEATURES.map((f) => (
                <FeatureCard
                  key={f.id}
                  title={t(`home.features.items.${f.id}.title`)}
                  description={t(`home.features.items.${f.id}.description`)}
                  icon={FEATURE_CARD_ICONS[f.id]}
                />
              ))}
            </div>
            <div className="mt-12 hidden gap-6 lg:grid">
              <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
                <FeatureCard
                  title={t(`home.features.items.${FEATURES[1].id}.title`)}
                  description={t(`home.features.items.${FEATURES[1].id}.description`)}
                  icon={FEATURE_CARD_ICONS[FEATURES[1].id]}
                />
                <FeatureCard
                  title={t(`home.features.items.${FEATURES[0].id}.title`)}
                  description={t(`home.features.items.${FEATURES[0].id}.description`)}
                  icon={FEATURE_CARD_ICONS[FEATURES[0].id]}
                />
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {FEATURES.slice(2).map((f) => (
                  <FeatureCard
                    key={f.id}
                    title={t(`home.features.items.${f.id}.title`)}
                    description={t(`home.features.items.${f.id}.description`)}
                    icon={FEATURE_CARD_ICONS[f.id]}
                  />
                ))}
              </div>
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
            <div className="flex flex-col items-center text-center">
              <Badge
                variant="secondary"
                className="mb-3 border border-border/80 bg-background/60 font-medium"
              >
                {t("home.pricing.noFees")}
              </Badge>
              <h2
                id="pricing-heading"
                className="text-2xl font-bold text-foreground normal-case sm:text-3xl"
              >
                {t("home.pricing.title")}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                {t("home.pricing.subtitle")}
              </p>
            </div>
            <div className="mt-12 grid gap-10 min-[767px]:gap-6 md:grid-cols-3">
              {PRICING_TIERS.map((tier) => (
                <PricingCard
                  key={tier.id}
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
              ))}
            </div>
            <div className="mt-20 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
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
                <tbody className="text-muted-foreground">
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
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {t("home.pricing.trustLine")}
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="border-t border-border bg-background py-16 sm:py-24"
          aria-labelledby="testimonials-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <Badge
                variant="secondary"
                className="mb-3 border border-border/80 bg-muted/40 font-medium"
              >
                {t("home.testimonials.badge")}
              </Badge>
              <h2
                id="testimonials-heading"
                className="text-2xl font-bold text-foreground sm:text-3xl"
              >
                {t("home.testimonials.title")}
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIAL_KEYS.map((k) => (
                <div
                  key={k}
                  className="flex flex-col rounded-xl border border-border bg-card/60 p-6 shadow-sm"
                >
                  <p className="text-primary" aria-hidden>
                    ★★★★★
                  </p>
                  <p className="mt-3 flex-1 text-sm italic text-foreground/95">
                    &ldquo;{t(`home.testimonials.items.${k}.quote`)}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t(`home.testimonials.items.${k}.name`)}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              {t("home.testimonials.disclaimer")}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="relative z-0 scroll-mt-14 border-t border-border bg-muted/10 py-16 sm:py-24"
          aria-labelledby="faq-heading"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-[56%] -z-10 h-[70%] w-[60%] -translate-y-1/2 rounded-full bg-white/[0.05] blur-[15px] min-[1440px]:h-[50%] min-[1440px]:w-[30%] min-[1440px]:blur-[6px]"
          />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2
                id="faq-heading"
                className="text-2xl font-bold text-foreground sm:text-3xl"
              >
                {t("home.faq.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">{t("home.faq.subtitle")}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-10">
                <div>
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                    {t("home.faq.panelTitle")}
                  </h3>
                  <p className="mt-3 max-w-prose text-sm leading-7 text-muted-foreground">
                    {t("home.faq.panelDescription")}
                  </p>
                </div>

                <div className="space-y-3">
                  {FAQ_ITEMS.map((item) => {
                    const isOpen = openFaqItem === item
                    return (
                      <div
                        key={item}
                        className="rounded-lg border border-border/70 bg-background/50 p-4"
                      >
                        <button
                          type="button"
                          className={`flex w-full cursor-pointer items-center justify-between gap-3 text-left text-sm font-medium transition-colors ${
                            isOpen ? "text-foreground" : "text-foreground/50"
                          }`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${item}`}
                          onClick={() =>
                            setOpenFaqItem((prev) => (prev === item ? null : item))
                          }
                        >
                          {t(`home.faq.items.q${item}.question`)}
                          <span
                            className={`text-muted-foreground transition-transform duration-[400ms] ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 20 20"
                              className="h-4 w-4"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                        <div
                          id={`faq-answer-${item}`}
                          className={`grid transition-all duration-[550ms] ease-out ${
                            isOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <p
                            className={`overflow-hidden pr-6 text-sm leading-7 text-muted-foreground transition-opacity duration-[550ms] ${
                              isOpen ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {t(`home.faq.items.q${item}.answer`)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {signupStatus === "success" && <SignupSuccessToast />}
    </div>
  )
}
