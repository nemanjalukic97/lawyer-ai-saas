"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/components/LanguageProvider"
import { HamburgerIcon } from "@/components/HamburgerIcon"
import { NavbarBrand } from "@/components/NavbarBrand"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { hasFeature, type EntitlementPlanId } from "../lib/entitlements"

const MAIN_LINKS = [
  { href: "/dashboard", key: "dashboard" },
] as const

const ACTION_LINKS = [
  { href: "/dashboard/generate", key: "generate", feature: "document_generation" },
  { href: "/dashboard/conflict-check", key: "conflict", feature: "conflict_check" },
  { href: "/dashboard/research", key: "research", feature: "legal_research" },
  { href: "/dashboard/contracts", key: "contracts", feature: "contract_drafting" },
  { href: "/dashboard/predictions", key: "predictions", feature: "case_prediction" },
  { href: "/dashboard/analyze", key: "analyze", feature: "document_analysis" },
  { href: "/dashboard/time", key: "time", feature: "time_tracking" },
  { href: "/dashboard/clients", key: "clients", feature: "client_portal" },
  { href: "/dashboard/intake", key: "intake", feature: "intake_forms" },
  { href: "/dashboard/activity", key: "activity", feature: "activity_feed" },
  { href: "/dashboard/templates", key: "templates", feature: "template_library" },
  { href: "/dashboard/deadlines", key: "deadlines", feature: "deadline_tracking" },
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
  interactionMode = "hover",
  planId,
}: {
  pathname: string
  onLinkClick?: () => void
  className?: string
  interactionMode?: "hover" | "tap"
  planId: EntitlementPlanId
}) {
  const { t } = useLanguage()
  const isTap = interactionMode === "tap"
  const allowedActionLinks = ACTION_LINKS.filter((link) =>
    hasFeature(planId, link.feature)
  )
  const actionsActive = allowedActionLinks.some(({ href }) => isActive(pathname, href))
  const [actionsOpen, setActionsOpen] = useState(false)
  const [actionsVisible, setActionsVisible] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const hideTimerRef = useRef<number | null>(null)
  const tapActionsRef = useRef<HTMLDivElement | null>(null)

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
    closeTimerRef.current = window.setTimeout(() => {
      setActionsOpen(false)
      closeTimerRef.current = null

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

  useEffect(() => {
    if (!isTap || !actionsOpen) return
    const handler = (e: MouseEvent) => {
      if (
        tapActionsRef.current &&
        !tapActionsRef.current.contains(e.target as Node)
      ) {
        setActionsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isTap, actionsOpen])

  const actionsButtonClass = (tap: boolean) =>
    cn(
      "flex min-w-0 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium cursor-pointer select-none transition-[background-color,color,box-shadow] duration-200 ease-out",
      tap && "w-full text-left",
      actionsActive
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
    )

  const actionLinkClass = (href: string) =>
    cn(
      "block rounded-sm px-3 py-2 text-sm transition-colors",
      isActive(pathname, href)
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
    )

  return (
    <div
      className={cn(
        "flex flex-col gap-1 min-[992px]:flex-row min-[992px]:items-center min-[992px]:gap-1",
        className
      )}
    >
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

      {isTap ? (
        <div ref={tapActionsRef} className="relative min-w-0">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={actionsOpen}
            onClick={() => setActionsOpen((o) => !o)}
            className={actionsButtonClass(true)}
          >
            {t("nav.actions")}
            <ChevronDown
              className={cn(
                "ml-auto h-4 w-4 shrink-0 transition-transform",
                actionsOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
          {actionsOpen && (
            <div
              role="menu"
              className="mt-1 flex flex-col gap-0 rounded-md border border-border bg-background p-1"
            >
              {allowedActionLinks.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  role="menuitem"
                  onClick={() => {
                    setActionsOpen(false)
                    onLinkClick?.()
                  }}
                  className={actionLinkClass(href)}
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
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
            className={actionsButtonClass(false)}
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
                "absolute left-0 z-10 mt-1 w-56 rounded-md border border-border bg-background p-1 shadow-lg transition-opacity duration-150 ease-out",
                actionsOpen ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              onMouseEnter={() => {
                cancelCloseTimer()
                cancelHideTimer()
                setActionsOpen(true)
              }}
              onMouseLeave={() => scheduleClose()}
            >
              {allowedActionLinks.map(({ href, key }) => (
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
                  className={actionLinkClass(href)}
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

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

export function DashboardNavbar({ planId }: { planId: EntitlementPlanId }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 max-[479px]:px-3">
        <NavbarBrand href="/dashboard" />

        <div className="hidden min-[992px]:flex">
          <NavLinks
            pathname={pathname}
            className="flex-row"
            interactionMode="hover"
            planId={planId}
          />
        </div>

        <div className="hidden items-center gap-4 min-[992px]:flex">
          <ThemeToggle />
          <LanguageSwitcher />
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="outline" size="sm">
              {t("nav.logout")}
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-2 min-[992px]:hidden">
          <ThemeToggle />
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
          className="absolute left-0 right-0 top-14 z-50 max-h-[calc(100vh-3.5rem)] min-[992px]:hidden overflow-y-auto border-b border-border bg-background px-4 py-3 shadow-lg max-[479px]:px-3"
          role="dialog"
          aria-label="Navigation menu"
        >
          <NavLinks
            pathname={pathname}
            interactionMode="tap"
            onLinkClick={() => setMobileOpen(false)}
            planId={planId}
          />
        </div>
      )}
    </header>
  )
}
