"use client"

import { type ReactNode } from "react"

import { FeatureCard } from "@/components/FeatureCard"
import { useLanguage } from "@/components/LanguageProvider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FEATURES } from "@/types"

import { ScrollReveal } from "./ScrollReveal"
import { HOME_SECTION_H2_CLASS, STAGGER_MS_10 } from "./home-styles"

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
  generate: (
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
      <path d="M9 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path
        d="M17.5 4.5L18.5 5.5L20.5 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  redline: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V8L14 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 3V8H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 13.5L15.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <path d="M8.5 16.5H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path
        d="M16 17.5L19 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16.5 14.5H19V17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  research: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 10.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M10.5 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
  matters: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V5.5C8 4.7 8.7 4 9.5 4H14.5C15.3 4 16 4.7 16 5.5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 11H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M9.5 14.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M9.5 17H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  templates: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 4H15L19 8V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6C5 4.9 5.9 4 7 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 4V8H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 4H5C3.9 4 3 4.9 3 6V17C3 18.1 3.9 19 5 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M9 15H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
}

const FEATURE_DESKTOP_ROWS = [
  { cols: "lg:grid-cols-[1fr_1.35fr]", indices: [1, 0], staggers: [0, 1] },
  { cols: "lg:grid-cols-3", indices: [2, 5, 6], staggers: [2, 3, 4] },
  { cols: "lg:grid-cols-[1fr_1.35fr]", indices: [7, 3], staggers: [5, 6] },
  { cols: "lg:grid-cols-3", indices: [4, 8, 9], staggers: [7, 8, 9] },
] as const

export function HomeFeaturesSection() {
  const { t } = useLanguage()

  return (
    <section
      id="features"
      className="relative z-0 scroll-mt-14 py-16 sm:py-24"
      aria-labelledby="features-heading"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="flex flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="mb-3 border border-border/80 bg-background/60 font-medium"
          >
            {t("home.features.badge")}
          </Badge>
          <h2
            id="features-heading"
            className={cn(HOME_SECTION_H2_CLASS, "text-foreground")}
          >
            {t("home.features.titleNew")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            {t("home.features.subtitle")}
          </p>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:hidden">
          {FEATURES.map((f, i) => (
            <ScrollReveal
              key={f.id}
              className="h-full min-h-0"
              delayMs={STAGGER_MS_10[i]}
            >
              <FeatureCard
                title={t(`home.features.items.${f.id}.title`)}
                description={t(`home.features.items.${f.id}.description`)}
                icon={FEATURE_CARD_ICONS[f.id]}
                className="h-full"
              />
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 hidden gap-6 lg:grid">
          {FEATURE_DESKTOP_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className={cn("grid gap-6", row.cols)}>
              {row.indices.map((featureIndex, i) => {
                const feature = FEATURES[featureIndex]
                return (
                  <ScrollReveal
                    key={feature.id}
                    className="h-full min-h-0"
                    delayMs={STAGGER_MS_10[row.staggers[i]]}
                  >
                    <FeatureCard
                      title={t(`home.features.items.${feature.id}.title`)}
                      description={t(`home.features.items.${feature.id}.description`)}
                      icon={FEATURE_CARD_ICONS[feature.id]}
                      className="h-full"
                    />
                  </ScrollReveal>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
