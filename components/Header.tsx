"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { HamburgerIcon } from "@/components/HamburgerIcon"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/components/LanguageProvider"
import { NavbarBrand } from "@/components/NavbarBrand"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

const navLinkClass =
  "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"

const pillButtonClass = "rounded-full"

type HeaderProps = {
  /** From server (Supabase cookies) so first paint matches session and avoids logged-out flash */
  initialSignedIn?: boolean
}

export function Header({ initialSignedIn }: HeaderProps) {
  const { t } = useLanguage()
  const [signedIn, setSignedIn] = useState(() => Boolean(initialSignedIn))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
  const [menuAnimating, setMenuAnimating] = useState(false)
  const closeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSignedIn(Boolean(session?.user))
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user))
    })

    return () => subscription.unsubscribe()
  }, [])

  const openMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setMenuMounted(true)
    setMenuAnimating(true)
    requestAnimationFrame(() => setMobileOpen(true))
  }

  const closeMenu = () => {
    setMobileOpen(false)
    setMenuAnimating(true)
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
    <nav className="relative mx-auto flex min-h-14 w-full max-w-6xl items-center rounded-full border border-border bg-card px-4 py-1 shadow-md max-[991px]:shadow-sm sm:px-6 max-[479px]:px-3">
      <div className="flex flex-1 items-center">
        <NavbarBrand href="/" onClick={closeMenu} />
      </div>

      <div className="hidden items-center gap-4 min-[992px]:flex">
        <Link href="#features" className={navLinkClass}>
          {t("nav.features")}
        </Link>
        <Link href="#pricing" className={navLinkClass}>
          {t("nav.pricing")}
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <LanguageSwitcher />
        <div className="hidden items-center gap-2 min-[992px]:flex">
          {signedIn ? (
            <>
              <Button asChild size="sm" className={pillButtonClass}>
                <Link href="/dashboard">{t("nav.dashboard")} →</Link>
              </Button>
              <form action="/auth/signout" method="post">
                <Button type="submit" variant="outline" size="sm" className={pillButtonClass}>
                  {t("nav.logout")}
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={navLinkClass}>
                {t("nav.login")}
              </Link>
              <Button asChild size="sm" className={pillButtonClass}>
                <Link href="/signup">{t("nav.getStarted")}</Link>
              </Button>
            </>
          )}
        </div>
        <div className="min-[992px]:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={pillButtonClass}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => (mobileOpen ? closeMenu() : openMenu())}
          >
            <HamburgerIcon open={mobileOpen} />
          </Button>
        </div>
      </div>

      {menuMounted && (
        <div
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[calc(100vh-4rem)] min-[992px]:hidden overflow-y-auto rounded-2xl border border-border bg-card px-4 py-4 shadow-lg max-[479px]:px-3 max-[991px]:shadow-sm",
            mobileOpen
              ? "opacity-100 translate-y-0 motion-safe:transition-[opacity,transform] motion-safe:duration-[800ms] motion-safe:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]"
              : "pointer-events-none opacity-0 -translate-y-2 motion-safe:transition-[opacity,transform] motion-safe:duration-[800ms] motion-safe:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]",
            menuAnimating && "motion-safe:will-change-[opacity,transform]"
          )}
          role="dialog"
          aria-label="Navigation menu"
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget) return
            if (event.propertyName === "opacity" || event.propertyName === "transform") {
              setMenuAnimating(false)
            }
          }}
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
            {signedIn ? (
              <>
                <div className="px-3 pt-1">
                  <Button asChild className={cn("w-full sm:w-auto", pillButtonClass)}>
                    <Link href="/dashboard" onClick={closeMenu}>
                      {t("nav.dashboard")} →
                    </Link>
                  </Button>
                </div>
                <div className="px-3 pt-1">
                  <form action="/auth/signout" method="post" onSubmit={closeMenu}>
                    <Button type="submit" variant="outline" className={cn("w-full sm:w-auto", pillButtonClass)}>
                      {t("nav.logout")}
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(navLinkClass, "block max-[991px]:mx-auto max-[991px]:w-fit max-[991px]:text-center")}
                  onClick={closeMenu}
                >
                  {t("nav.login")}
                </Link>
                <div className="px-3 pt-1">
                  <Button asChild className={cn("w-full sm:w-auto", pillButtonClass)}>
                    <Link href="/signup" onClick={closeMenu}>
                      {t("nav.getStarted")}
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
