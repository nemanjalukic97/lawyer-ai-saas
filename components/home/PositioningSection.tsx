"use client"

import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"

import { LegantisWalkthrough } from "./LegantisWalkthrough"
import { ScrollReveal } from "./ScrollReveal"
import { HOME_SECTION_H2_CLASS, HOME_SUBTITLE_CLASS } from "./home-styles"

const SLOW_REVEAL_CLASS =
  "motion-safe:duration-[1400ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"

export function HomePositioningSection() {
  const { t } = useLanguage()

  return (
    <section
      id="why-legantis"
      className="relative scroll-mt-14 overflow-hidden border-b border-border"
      aria-labelledby="positioning-heading"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <ScrollReveal className={cn(SLOW_REVEAL_CLASS, "w-full text-center lg:text-left")}>
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                {t("home.positioning.badge")}
              </span>
            </div>
            <h2
              id="positioning-heading"
              className={cn(HOME_SECTION_H2_CLASS, "mt-6 text-foreground")}
            >
              {t("home.positioning.titleLine1")}
              <br />
              {t("home.positioning.titleLine2")}
            </h2>
            <p className={cn(HOME_SUBTITLE_CLASS, "lg:mx-0")}>
              {t("home.positioning.description")}
            </p>
          </ScrollReveal>

          <ScrollReveal className={cn(SLOW_REVEAL_CLASS, "w-full")} delayMs={300}>
            <LegantisWalkthrough label={`${t("home.positioning.titleLine1")} ${t("home.positioning.titleLine2")}`} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
