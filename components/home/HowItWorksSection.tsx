"use client"

import { FileCheck, MessageSquare, UserPlus } from "lucide-react"

import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"

import { ScrollReveal } from "./ScrollReveal"
import { HOME_SECTION_H2_CLASS, STAGGER_MS_3 } from "./home-styles"

const HOW_STEPS = [
  { n: 1, icon: UserPlus },
  { n: 2, icon: MessageSquare },
  { n: 3, icon: FileCheck },
] as const

export function HomeHowItWorksSection() {
  const { t } = useLanguage()

  return (
    <section
      id="how-it-works"
      className="scroll-mt-14 border-b border-border py-[126px] sm:py-[158px]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="how-it-works-heading"
          className={cn(HOME_SECTION_H2_CLASS, "text-center text-foreground")}
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
              <ScrollReveal
                key={step.n}
                className="relative z-10 flex flex-col items-center text-center"
                delayMs={STAGGER_MS_3[step.n - 1]}
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
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
