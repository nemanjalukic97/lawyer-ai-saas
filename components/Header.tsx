"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { HamburgerIcon } from "@/components/HamburgerIcon"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/components/LanguageProvider"
import { NavbarBrand } from "@/components/NavbarBrand"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"

export function Header() {
  const { t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
  const closeTimerRef = useRef<number | null>(null)

  const openMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setMenuMounted(true)
    requestAnimationFrame(() => setMobileOpen(true))
  }

  const closeMenu = () => {
    setMobileOpen(false)
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => {
      setMenuMounted(false)
      closeTimerRef.current = null
    }, 800)
  }

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 max-[479px]:px-3">
        <NavbarBrand href="/" onClick={closeMenu} />

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

        <div className="flex items-center gap-3 min-[992px]:hidden">
          <LanguageSwitcher />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => (mobileOpen ? closeMenu() : openMenu())}
          >
            <HamburgerIcon open={mobileOpen} />
          </Button>
        </div>
      </nav>

      {menuMounted && (
        <div
          className={cn(
            "absolute left-0 right-0 top-14 z-50 max-h-[calc(100vh-3.5rem)] min-[992px]:hidden overflow-y-auto border-b border-border bg-background px-4 py-4 shadow-lg max-[479px]:px-3 motion-safe:transform-gpu",
            mobileOpen
              ? "opacity-100 translate-y-0 motion-safe:transition-[opacity,transform] motion-safe:duration-[800ms] motion-safe:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]"
              : "pointer-events-none opacity-0 -translate-y-2 motion-safe:transition-[opacity,transform] motion-safe:duration-[800ms] motion-safe:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]"
          )}
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col gap-2 max-[991px]:items-center">
            <Link
              href="#features"
              className={cn(navLinkClass, "block max-[991px]:mx-auto max-[991px]:w-fit max-[991px]:text-center")}
              onClick={closeMenu}
            >
              {t("nav.features")}
            </Link>
            <Link
              href="#pricing"
              className={cn(navLinkClass, "block max-[991px]:mx-auto max-[991px]:w-fit max-[991px]:text-center")}
              onClick={closeMenu}
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="/login"
              className={cn(navLinkClass, "block max-[991px]:mx-auto max-[991px]:w-fit max-[991px]:text-center")}
              onClick={closeMenu}
            >
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
