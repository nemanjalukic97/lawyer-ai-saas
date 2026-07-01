"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import {
  Activity,
  BookTemplate,
  Briefcase,
  Calendar,
  Clock,
  CreditCard,
  FilePen,
  FileSearch,
  FileText,
  Inbox,
  LayoutDashboard,
  Lock,
  Scale,
  Search,
  ShieldAlert,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"
import { hasFeature, type EntitlementPlanId } from "../lib/entitlements"
import { useSidebar } from "./SidebarProvider"

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
] as const

const NAV_ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  generate: Sparkles,
  contracts: FilePen,
  predictions: Scale,
  analyze: FileSearch,
  redline: FileText,
  research: Search,
  conflict: ShieldAlert,
  clients: Users,
  matters: Briefcase,
  time: Clock,
  deadlines: Calendar,
  intake: Inbox,
  templates: BookTemplate,
  activity: Activity,
  billing: CreditCard,
}

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function isActive(pathname: string, href: string): boolean {
  if (href === "#") return false
  if (href === "/dashboard") return pathname === "/dashboard"
  return pathname.startsWith(href)
}

function linkClass(pathname: string, href: string, locked = false) {
  return cn(
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors min-[1800px]:text-[15px]",
    isActive(pathname, href)
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
    locked && "opacity-70"
  )
}

export function DashboardSidebar({
  planId,
  displayName,
  firmName,
}: {
  planId: EntitlementPlanId
  displayName: string
  firmName: string | null
}) {
  const pathname = usePathname()
  const { open, close } = useSidebar()
  const { t } = useLanguage()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, close])

  const renderSimpleLink = (href: string, key: string) => {
    const Icon = NAV_ICONS[key]
    return (
      <Link
        key={key}
        href={href}
        onClick={close}
        className={linkClass(pathname, href)}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="min-w-0 truncate">{t(`nav.${key}`)}</span>
      </Link>
    )
  }

  const renderFeatureLink = ({
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
    const Icon = NAV_ICONS[key]
    return (
      <Link
        key={key}
        href={finalHref}
        aria-disabled={!entitled}
        onClick={close}
        className={cn(linkClass(pathname, href, !entitled), "justify-between")}
      >
        <span className="flex min-w-0 items-center gap-2">
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          <span className="min-w-0 truncate">{t(`nav.${key}`)}</span>
        </span>
        {!entitled && <Lock className="h-3.5 w-3.5 shrink-0" />}
      </Link>
    )
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 min-[992px]:hidden"
          onClick={close}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 w-60 overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
          "min-[992px]:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col px-2 py-4">
          <Link
            href="/dashboard/settings"
            onClick={close}
            className="mb-3 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent/50"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
              {getInitials(displayName)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {displayName}
              </p>
              {firmName && (
                <p className="truncate text-xs text-sidebar-foreground/50">{firmName}</p>
              )}
            </div>
          </Link>

          <div className="mx-0 flex flex-1 flex-col rounded-xl bg-sidebar-accent/40 p-2">
            <nav className="flex flex-col gap-1">
              {MAIN_LINKS.map(({ href, key }) => renderSimpleLink(href, key))}
            </nav>

            <p className="px-3 py-2 text-xs uppercase tracking-widest text-sidebar-foreground/50">
              {t("nav.aiTools")}
            </p>
            <nav className="flex flex-col gap-1">
              {AI_TOOLS_LINKS.map((link) => renderFeatureLink(link))}
            </nav>

            <p className="mt-4 px-3 py-2 text-xs uppercase tracking-widest text-sidebar-foreground/50">
              {t("nav.management")}
            </p>
            <nav className="flex flex-col gap-1">
              {MANAGEMENT_LINKS.map((link) => renderFeatureLink(link))}
            </nav>

            <nav className="mt-auto flex flex-col gap-1 border-t border-sidebar-border/60 pt-3">
              {AFTER_ACTIONS_LINKS.map(({ href, key }) => renderSimpleLink(href, key))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  )
}
