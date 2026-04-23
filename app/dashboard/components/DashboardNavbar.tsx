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
import { ChevronDown, Lock } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { hasFeature, type EntitlementPlanId } from "../lib/entitlements"

const MAIN_LINKS = [
  { href: "/dashboard", key: "dashboard" },
] as const

const AI_TOOLS_LINKS = [
  { href: "/dashboard/generate", key: "generate", feature: "document_generation" },
  { href: "/dashboard/contracts", key: "contracts", feature: "contract_drafting" },
  { href: "/dashboard/predictions", key: "predictions", feature: "case_prediction" },
  { href: "/dashboard/analyze", key: "analyze", feature: "document_analysis" },
  { href: "/dashboard/redline", key: "redline", feature: "document_redlining" },
  { href: "/dashboard/research", key: "research", feature: "legal_research" },
  { href: "/dashboard/conflict-check", key: "conflict", feature: "conflict_check" },
] as const

const MANAGEMENT_LINKS = [
  { href: "/dashboard/clients", key: "clients", feature: "client_portal" },
  { href: "/dashboard/matters", key: "matters", feature: "matter_management" },
  { href: "/dashboard/time", key: "time", feature: "time_tracking" },
  { href: "/dashboard/deadlines", key: "deadlines", feature: "deadline_tracking" },
  { href: "/dashboard/intake", key: "intake", feature: "intake_forms" },
  { href: "/dashboard/templates", key: "templates", feature: "template_library" },
  { href: "/dashboard/activity", key: "activity", feature: "activity_feed" },
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

      <FeatureDropdown
        pathname={pathname}
        planId={planId}
        interactionMode={interactionMode}
        label={t("nav.aiTools")}
        links={AI_TOOLS_LINKS}
        onLinkClick={onLinkClick}
      />
      <FeatureDropdown
        pathname={pathname}
        planId={planId}
        interactionMode={interactionMode}
        label={t("nav.management")}
        links={MANAGEMENT_LINKS}
        onLinkClick={onLinkClick}
      />

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

function FeatureDropdown({
  pathname,
  planId,
  interactionMode,
  label,
  links,
  onLinkClick,
}: {
  pathname: string
  planId: EntitlementPlanId
  interactionMode: "hover" | "tap"
  label: string
  links: ReadonlyArray<{ href: string; key: string; feature: Parameters<typeof hasFeature>[1] }>
  onLinkClick?: () => void
}) {
  const { t } = useLanguage()
  const isTap = interactionMode === "tap"
  const dropdownActive = links.some(({ href }) => isActive(pathname, href))
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const hideTimerRef = useRef<number | null>(null)
  const tapRef = useRef<HTMLDivElement | null>(null)

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
      setOpen(false)
      closeTimerRef.current = null

      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false)
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
    if (!isTap || !open) return
    const handler = (e: MouseEvent) => {
      if (tapRef.current && !tapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isTap, open])

  const buttonClass = (tap: boolean) =>
    cn(
      "flex min-w-0 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium cursor-pointer select-none transition-[background-color,color,box-shadow] duration-200 ease-out",
      tap && "w-full text-left",
      dropdownActive
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
    )

  const linkClass = (href: string, locked: boolean) =>
    cn(
      "flex items-center justify-between gap-2 rounded-sm px-3 py-2 text-sm transition-colors",
      isActive(pathname, href)
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      locked && "opacity-70"
    )

  const renderItem = ({
    href,
    key,
    feature,
  }: {
    href: string
    key: string
    feature: Parameters<typeof hasFeature>[1]
  }) => {
    const entitled = hasFeature(planId, feature)
    const finalHref = entitled ? href : "/dashboard/billing"
    return (
      <Link
        key={key}
        href={finalHref}
        role="menuitem"
        aria-disabled={!entitled}
        onClick={() => {
          cancelCloseTimer()
          cancelHideTimer()
          setOpen(false)
          setVisible(false)
          onLinkClick?.()
        }}
        className={linkClass(href, !entitled)}
      >
        <span className="min-w-0 truncate">{t(`nav.${key}`)}</span>
        {!entitled && <Lock className="h-3.5 w-3.5 shrink-0" />}
      </Link>
    )
  }

  if (isTap) {
    return (
      <div ref={tapRef} className="relative min-w-0">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={buttonClass(true)}
        >
          {label}
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 shrink-0 transition-transform",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
        {open && (
          <div
            role="menu"
            className="mt-1 flex flex-col gap-0 rounded-md border border-border bg-background p-1"
          >
            {links.map((l) => renderItem(l))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelCloseTimer()
        cancelHideTimer()
        setVisible(true)
        setOpen(true)
      }}
      onMouseLeave={() => scheduleClose()}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => scheduleClose()}
        className={buttonClass(false)}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {visible && (
        <div
          role="menu"
          className={cn(
            "absolute left-0 z-10 mt-1 w-60 rounded-md border border-border bg-background p-1 shadow-lg transition-opacity duration-150 ease-out",
            open ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onMouseEnter={() => {
            cancelCloseTimer()
            cancelHideTimer()
            setOpen(true)
          }}
          onMouseLeave={() => scheduleClose()}
        >
          {links.map((l) => renderItem(l))}
        </div>
      )}
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
