"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { HamburgerIcon } from "@/components/HamburgerIcon"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/components/LanguageProvider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"

export function Header() {
  const { t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 max-[479px]:px-3">
        <Link
          href="/"
          className="text-lg font-semibold text-foreground"
          onClick={closeMenu}
        >
          Legantis
        </Link>

        <div className="hidden items-center gap-6 min-[992px]:flex">
          <Link href="#features" className={navLinkClass}>
            {t("nav.features")}
          </Link>
          <Link href="#pricing" className={navLinkClass}>
            {t("nav.pricing")}
          </Link>
          <LanguageSwitcher />
          <Link href="/login" className={navLinkClass}>
            {t("nav.login")}
          </Link>
          <Button asChild size="sm">
            <Link href="/signup">{t("nav.getStarted")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 min-[992px]:hidden">
          <LanguageSwitcher />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <HamburgerIcon open={mobileOpen} />
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="absolute left-0 right-0 top-14 z-50 max-h-[calc(100vh-3.5rem)] min-[992px]:hidden overflow-y-auto border-b border-border bg-background px-4 py-4 shadow-lg max-[479px]:px-3"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col gap-1">
            <Link
              href="#features"
              className={cn(navLinkClass, "block")}
              onClick={closeMenu}
            >
              {t("nav.features")}
            </Link>
            <Link
              href="#pricing"
              className={cn(navLinkClass, "block")}
              onClick={closeMenu}
            >
              {t("nav.pricing")}
            </Link>
            <Link href="/login" className={cn(navLinkClass, "block")} onClick={closeMenu}>
              {t("nav.login")}
            </Link>
            <div className="px-3 pt-1">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/signup" onClick={closeMenu}>
                  {t("nav.getStarted")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
