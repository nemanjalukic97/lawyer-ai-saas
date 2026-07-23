"use client"

import { useState } from "react"

import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"

import { ScrollReveal } from "./ScrollReveal"
import { HOME_SECTION_H2_CLASS } from "./home-styles"

const FAQ_ITEMS = [1, 2, 3, 4, 5, 6, 7] as const

export function HomeFaqSection() {
  const { t } = useLanguage()
  const [openFaqItem, setOpenFaqItem] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="relative z-0 scroll-mt-14 border-t border-border bg-muted/10 py-16 sm:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center">
          <h2
            id="faq-heading"
            className={cn(HOME_SECTION_H2_CLASS, "text-foreground")}
          >
            {t("home.faq.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("home.faq.subtitle")}</p>
        </ScrollReveal>

        <ScrollReveal
          className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm md:p-8"
          delayMs={75}
        >
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
        </ScrollReveal>
      </div>
    </section>
  )
}
