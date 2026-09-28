"use client"

import { useLanguage } from "@/components/LanguageProvider"

const JURISDICTION_KEYS = ["ba", "rs", "hr", "me", "si"] as const

const JURISDICTION_PILL_CLASS =
  "inline-flex shrink-0 items-center rounded-full border border-border bg-background/80 px-5 py-2.5 text-base font-medium text-foreground sm:px-6 sm:py-3 sm:text-lg"

export function JurisdictionBar({ className }: { className?: string }) {
  const { t } = useLanguage()

  return (
    <div className={className} aria-labelledby="jurisdiction-bar-heading">
      <h2
        id="jurisdiction-bar-heading"
        className="text-center text-sm font-medium text-muted-foreground"
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
  )
}
