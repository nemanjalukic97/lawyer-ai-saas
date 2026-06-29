"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/LanguageProvider"

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-center">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("footer.ctaTitle")}
          </h2>
          <Button asChild size="lg" className="h-11 min-w-[200px] shrink-0 text-base sm:text-sm">
            <Link href="/signup">{t("home.hero.getStartedFree")}</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <Link href="/" aria-label="Legantis">
              <img
                src="/logo.svg"
                alt=""
                className="h-28 w-28 invert sm:h-32 sm:w-32 dark:invert-0"
              />
            </Link>
            <div className="flex flex-col gap-1 text-xs leading-relaxed text-muted-foreground">
              <span>© {year} Legantis.</span>
              <span>{t("footer.rights")}.</span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("footer.product")}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/#features"
                    className="transition-colors hover:text-foreground"
                  >
                    {t("nav.features")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="transition-colors hover:text-foreground"
                  >
                    {t("nav.pricing")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="transition-colors hover:text-foreground"
                  >
                    {t("footer.faqLink")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("footer.legal")}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-foreground"
                  >
                    {t("footer.privacyPolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="transition-colors hover:text-foreground"
                  >
                    {t("footer.termsOfService")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund"
                    className="transition-colors hover:text-foreground"
                  >
                    {t("footer.refundPolicy")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("footer.contact")}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                <a
                  href="mailto:support@legantis.app"
                  className="transition-colors hover:text-foreground"
                >
                  {t("footer.supportEmail")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
