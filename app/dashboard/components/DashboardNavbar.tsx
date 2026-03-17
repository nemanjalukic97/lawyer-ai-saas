"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const MAIN_LINKS = [
  { href: "/dashboard", key: "dashboard" },
] as const

const ACTION_LINKS = [
  { href: "/dashboard/generate", key: "generate" },
  { href: "/dashboard/contracts", key: "contracts" },
  { href: "/dashboard/predictions", key: "predictions" },
  { href: "/dashboard/analyze", key: "analyze" },
  { href: "/dashboard/time", key: "time" },
  { href: "/dashboard/clients", key: "clients" },
  { href: "/dashboard/activity", key: "activity" },
  { href: "/dashboard/templates", key: "templates" },
] as const

const AFTER_ACTIONS_LINKS = [
  { href: "/dashboard/billing", key: "billing" },
  { href: "/dashboard/settings", key: "settings" },
] as const

function isActive(pathname: string, href: string): boolean {
  if (href === "#") return false
  if (href === "/dashboard") return pathname === "/dashboard"
  return pathname.startsWith(href)
}

function NavLinks({
  pathname,
  onLinkClick,
  className,
}: {
  pathname: string
  onLinkClick?: () => void
  className?: string
}) {
  const { t } = useLanguage()
  const actionsActive = ACTION_LINKS.some(({ href }) => isActive(pathname, href))
  const [actionsOpen, setActionsOpen] = useState(false)
  const [actionsVisible, setActionsVisible] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const hideTimerRef = useRef<number | null>(null)

  const cancelCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const cancelHideTimer = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }

  const scheduleClose = () => {
    cancelCloseTimer()
    cancelHideTimer()
    // Small delay prevents flicker when moving mouse
    // from the trigger into the menu.
    closeTimerRef.current = window.setTimeout(() => {
      setActionsOpen(false)
      closeTimerRef.current = null

      // Allow opacity transition to play before unmounting.
      hideTimerRef.current = window.setTimeout(() => {
        setActionsVisible(false)
        hideTimerRef.current = null
      }, 150)
    }, 120)
  }

  useEffect(() => {
    return () => {
      cancelCloseTimer()
      cancelHideTimer()
    }
  }, [])

  return (
    <div className={cn("flex flex-col gap-1 md:flex-row md:items-center md:gap-1", className)}>
      {MAIN_LINKS.map(({ href, key }) => (
        <Link
          key={key}
          href={href}
          onClick={onLinkClick}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive(pathname, href)
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          {t(`nav.${key}`)}
        </Link>
      ))}

      <div
        className="relative"
        onMouseEnter={() => {
          cancelCloseTimer()
          cancelHideTimer()
          setActionsVisible(true)
          setActionsOpen(true)
        }}
        onMouseLeave={() => {
          scheduleClose()
        }}
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={actionsOpen}
          onFocus={() => setActionsOpen(true)}
          onBlur={() => scheduleClose()}
          className={cn(
            "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium cursor-pointer select-none transition-[background-color,color,box-shadow] duration-200 ease-out",
            actionsActive
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          {t("nav.actions")}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              actionsOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </button>

        {actionsVisible && (
          <div
            role="menu"
            className={cn(
              "absolute left-0 mt-1 w-56 rounded-md border border-border bg-background p-1 shadow-lg transition-opacity duration-150 ease-out",
              actionsOpen ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            onMouseEnter={() => {
              cancelCloseTimer()
              cancelHideTimer()
              setActionsOpen(true)
            }}
            onMouseLeave={() => scheduleClose()}
          >
            {ACTION_LINKS.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                role="menuitem"
                onClick={() => {
                  cancelCloseTimer()
                  cancelHideTimer()
                  setActionsOpen(false)
                  setActionsVisible(false)
                  onLinkClick?.()
                }}
                className={cn(
                  "block rounded-sm px-3 py-2 text-sm transition-colors",
                  isActive(pathname, href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </div>
        )}
      </div>

      {AFTER_ACTIONS_LINKS.map(({ href, key }) => (
        <Link
          key={key}
          href={href}
          onClick={onLinkClick}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive(pathname, href)
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          {t(`nav.${key}`)}
        </Link>
      ))}
    </div>
  )
}

export function DashboardNavbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="text-lg font-semibold text-foreground hover:text-foreground/90"
        >
          Legantis
        </Link>

        {/* Desktop nav: visible from md up */}
        <div className="hidden md:flex">
          <NavLinks pathname={pathname} className="flex-row" />
        </div>

        {/* Right: language + logout on desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="outline" size="sm">
              {t("nav.logout")}
            </Button>
          </form>
        </div>

        {/* Mobile: language, logout, hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="outline" size="sm">
              {t("nav.logout")}
            </Button>
          </form>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu panel: shown below nav when open */}
      {mobileOpen && (
        <div
          className="absolute left-0 right-0 top-14 z-50 border-b border-border bg-background px-4 py-3 shadow-lg md:hidden"
          role="dialog"
          aria-label="Navigation menu"
        >
          <NavLinks
            pathname={pathname}
            onLinkClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </header>
  )
}
