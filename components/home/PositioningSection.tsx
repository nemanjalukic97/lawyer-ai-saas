"use client"

import Image from "next/image"

import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"

import { ScrollReveal } from "./ScrollReveal"
import { HOME_SECTION_H2_CLASS, HOME_SUBTITLE_CLASS } from "./home-styles"

const POSITIONING_BG = "/pexels-karola-g-7876093.jpg"

const JURISDICTION_KEYS = ["ba", "rs", "hr", "me", "si"] as const

const JURISDICTION_PILL_CLASS =
  "inline-flex shrink-0 items-center rounded-full border border-border bg-background/80 px-5 py-2.5 text-base font-medium text-foreground sm:px-6 sm:py-3 sm:text-lg"

export function HomePositioningSection() {
  const { t } = useLanguage()

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      aria-labelledby="positioning-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={POSITIONING_BG}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          decoding="async"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b14]/94 via-[#0c1222]/88 to-[#070b14]/95" />
        <div className="absolute inset-0 bg-[#1B4FD8]/[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/60 via-transparent to-[#070b14]/30" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <ScrollReveal className="w-full text-center">
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
              {t("home.positioning.badge")}
            </span>
          </div>
          <h2
            id="positioning-heading"
            className={cn(HOME_SECTION_H2_CLASS, "mt-6 text-white")}
          >
            {t("home.positioning.titleLine1")}
            <br />
            {t("home.positioning.titleLine2")}
          </h2>
          <p className={HOME_SUBTITLE_CLASS}>
            {t("home.positioning.description")}
          </p>
        </ScrollReveal>

        <div className="mt-14 sm:mt-16" aria-labelledby="jurisdiction-bar-heading">
          <h2
            id="jurisdiction-bar-heading"
            className="text-center text-sm font-medium text-white/70"
          >
            {t("home.jurisdictionBar.title")}
          </h2>
          <div className="relative mt-6 overflow-hidden jurisdiction-marquee-viewport motion-reduce:hidden">
            <div className="jurisdiction-marquee-track flex w-max items-center gap-4 sm:gap-6">
              {(
                [
                  ...JURISDICTION_KEYS,
                  ...JURISDICTION_KEYS,
                  ...JURISDICTION_KEYS,
                  ...JURISDICTION_KEYS,
                ] as const
              ).map((key, i) => (
                <span key={`${key}-${i}`} className={JURISDICTION_PILL_CLASS}>
                  {t(`home.jurisdictionBar.countries.${key}`)}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 hidden flex-wrap items-center justify-center gap-4 motion-reduce:flex sm:gap-6">
            {JURISDICTION_KEYS.map((key) => (
              <span key={key} className={JURISDICTION_PILL_CLASS}>
                {t(`home.jurisdictionBar.countries.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
