"use client"

import { useEffect, useRef, useState } from "react"
import {
  Activity,
  ArrowUpRight,
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
  PenLine,
  Scale,
  Search,
  ShieldAlert,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

import { useLanguage, type LanguageCode } from "@/components/LanguageProvider"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const FRAME_WIDTH = 1280
const COMPACT_FRAME_WIDTH = 820
const COMPACT_QUERY = "(max-width: 639px)"

const AI_TOOLS: { key: string; icon: LucideIcon }[] = [
  { key: "generate", icon: Sparkles },
  { key: "contracts", icon: FilePen },
  { key: "predictions", icon: Scale },
  { key: "analyze", icon: FileSearch },
  { key: "redline", icon: FileText },
  { key: "research", icon: Search },
  { key: "conflict", icon: ShieldAlert },
]

const MANAGEMENT: { key: string; icon: LucideIcon }[] = [
  { key: "clients", icon: Users },
  { key: "matters", icon: Briefcase },
  { key: "time", icon: Clock },
  { key: "deadlines", icon: Calendar },
  { key: "intake", icon: Inbox },
  { key: "templates", icon: BookTemplate },
  { key: "activity", icon: Activity },
]

const LANGUAGE_FLAG: Record<LanguageCode, { label: string; flag: string }> = {
  en: { label: "EN", flag: "gb" },
  sr: { label: "SRB", flag: "rs" },
  bs: { label: "BOS", flag: "ba" },
  hr: { label: "CRO", flag: "hr" },
  sl: { label: "SLO", flag: "si" },
  me: { label: "MNE", flag: "me" },
}

const MONTHS = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Jun",
  "Jul",
  "August",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
]

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="min-w-0 truncate">{label}</span>
    </div>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  openLabel,
  accent,
}: {
  icon: LucideIcon
  label: string
  value: number
  openLabel: string
  accent: string
}) {
  return (
    <Card
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col justify-between gap-4 overflow-hidden border-l-2 p-5",
        accent
      )}
    >
      <Icon className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground/30" />
      <div className="min-w-0 pr-8">
        <p className="line-clamp-2 min-h-[2.85rem] text-xs font-medium uppercase leading-snug tracking-wide text-muted-foreground/60">
          {label}
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-foreground">{value}</p>
      </div>
      <p className="inline-flex items-center gap-1 text-xs text-muted-foreground/50">
        {openLabel} <ArrowUpRight className="h-3.5 w-3.5" />
      </p>
    </Card>
  )
}

function MockCalendar({ viewAll }: { viewAll: string }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7
  const cells = Array.from({ length: totalCells }, (_, i) => {
    const day = i - startOffset + 1
    return day >= 1 && day <= daysInMonth ? day : null
  })

  return (
    <Card className="col-span-2 h-full min-w-0 p-5">
      <h3 className="text-base font-semibold">Kalendar</h3>
      <p className="mb-3 mt-1 text-xs text-muted-foreground">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 text-center text-[11px] font-medium text-muted-foreground/70">
        {["P", "U", "S", "Č", "P", "S", "N"].map((day, i) => (
          <div key={i} className="py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-xs">
        {cells.map((day, i) => (
          <div key={i} className="flex items-center justify-center py-0.5">
            {day ? (
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-normal",
                  day === today.getDate() && "bg-primary text-primary-foreground"
                )}
              >
                {day}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center justify-end gap-1 text-xs text-muted-foreground">
        {viewAll} <ArrowUpRight className="h-3 w-3" />
      </p>
    </Card>
  )
}

export default function DashboardMockup() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)
  const [compact, setCompact] = useState(false)
  const { t, language } = useLanguage()
  const welcome = t("dashboard.header.welcome").replace(/,\s*$/, "")
  const languageChip = LANGUAGE_FLAG[language]
  const frameWidth = compact ? COMPACT_FRAME_WIDTH : FRAME_WIDTH

  useEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY)
    const update = () => setCompact(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const node = frameRef.current
    if (!node) return
    const update = () => setScale(node.clientWidth / frameWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [frameWidth])

  return (
    <div
      ref={frameRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-background shadow-2xl sm:aspect-[16/10]"
      aria-hidden
    >
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 origin-top-left bg-background text-left text-foreground",
          scale == null && "invisible"
        )}
        style={{ width: frameWidth, zoom: scale ?? 1 }}
      >
        <div className="flex min-h-[820px] bg-background">
          <aside
            className={cn(
              "w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-2 py-4 text-sidebar-foreground",
              compact ? "hidden" : "flex"
            )}
          >
            <div className="mb-3 flex items-center gap-3 rounded-lg px-2 py-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
                <Scale className="h-4 w-4" />
              </div>
              <p className="min-w-0 truncate text-sm font-medium">Legantis</p>
            </div>
            <div className="flex flex-1 flex-col rounded-xl bg-sidebar-accent/40 p-2">
              <nav className="flex flex-col gap-1">
                <NavItem icon={LayoutDashboard} label={t("nav.dashboard")} active />
              </nav>
              <p className="px-3 py-2 text-xs uppercase tracking-widest text-sidebar-foreground/50">
                {t("nav.aiTools")}
              </p>
              <nav className="flex flex-col gap-1">
                {AI_TOOLS.map((item) => (
                  <NavItem key={item.key} icon={item.icon} label={t(`nav.${item.key}`)} />
                ))}
              </nav>
              <p className="mt-4 px-3 py-2 text-xs uppercase tracking-widest text-sidebar-foreground/50">
                {t("nav.management")}
              </p>
              <nav className="flex flex-col gap-1">
                {MANAGEMENT.map((item) => (
                  <NavItem key={item.key} icon={item.icon} label={t(`nav.${item.key}`)} />
                ))}
              </nav>
              <nav className="mt-auto flex flex-col gap-1 border-t border-sidebar-border/60 pt-3">
                <NavItem icon={CreditCard} label={t("nav.billing")} />
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="px-6 pt-3">
              <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between rounded-full border border-border bg-card px-6 py-1 shadow-md">
                <div className="flex items-center">
                  <svg viewBox="0 0 1500 1500" className="h-14 w-14 shrink-0 text-white" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M 681.7 461 L 461 461 L 461 719.5 C 461 797.2 524.2 860.4 601.8 860.4 L 639.6 860.4 L 639.6 898.1 C 639.6 975.8 702.8 1039 780.5 1039 L 1039 1039 L 1039 818.3 L 681.7 818.3 Z M 639.6 818.3 L 601.8 818.3 C 547.4 818.3 503.1 774 503.1 719.5 L 503.1 503.1 L 639.6 503.1 Z M 996.9 860.4 L 996.9 996.9 L 780.5 996.9 C 726 996.9 681.7 952.6 681.7 898.1 L 681.7 860.4 Z M 884 771.1 C 969.5 771.1 1039 701.5 1039 616 C 1039 530.5 969.5 461 884 461 C 798.5 461 728.9 530.5 728.9 616 C 728.9 701.5 798.5 771.1 884 771.1 Z M 884 503.1 C 946.3 503.1 996.9 553.7 996.9 616 C 996.9 678.3 946.3 729 884 729 C 821.7 729 771 678.3 771 616 C 771 553.7 821.7 503.1 884 503.1 Z"
                    />
                  </svg>
                  <span className="-ml-2 flex flex-col leading-none">
                    <span className="text-[13px] font-semibold tracking-tight text-white">Legantis</span>
                    <span className="mt-0.5 text-[11px] font-light text-white/85">AI Legal Assistant</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 items-center gap-1 rounded-full px-2 text-sm font-medium text-muted-foreground">
                    <img src={`/flags/${languageChip.flag}.svg`} alt="" width={16} height={12} className="h-3 w-4" />
                    {languageChip.label}
                  </span>
                  <span className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}>
                    {t("nav.logout")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-background px-4 py-10">
              <div className="mx-auto flex max-w-6xl flex-col gap-8">
                <header className="flex flex-col gap-4 border-b border-border/40 pb-8">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground/50">
                      {t("dashboard.header.kicker")}
                    </p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{welcome}</h1>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                      <span>Bosnia & Herzegovina – Republika Srpska</span>
                      <span aria-hidden className="text-muted-foreground/40">
                        ·
                      </span>
                      <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        {t("dashboard.planTier.firm")} {t("dashboard.header.planSuffix")}
                      </span>
                      <span className="text-muted-foreground/70">(active)</span>
                    </div>
                  </div>
                </header>

                <div className="grid w-full grid-cols-4 gap-3">
                  <StatTile
                    icon={Users}
                    label={t("dashboard.overview.stats.totalClients")}
                    value={0}
                    openLabel={t("dashboard.actions.open")}
                    accent="border-l-blue-500"
                  />
                  <StatTile
                    icon={Briefcase}
                    label={t("dashboard.overview.stats.activeMatters")}
                    value={0}
                    openLabel={t("dashboard.actions.open")}
                    accent="border-l-purple-500"
                  />
                  <StatTile
                    icon={PenLine}
                    label={t("dashboard.overview.stats.pendingSignatures")}
                    value={0}
                    openLabel={t("dashboard.actions.open")}
                    accent="border-l-amber-500"
                  />
                  <StatTile
                    icon={Clock}
                    label={t("dashboard.overview.stats.unbilledHours")}
                    value={0}
                    openLabel={t("dashboard.actions.open")}
                    accent="border-l-emerald-500"
                  />
                </div>

                <section className="grid grid-cols-3 items-stretch gap-4">
                  <div className="flex flex-col gap-4">
                    <Card className="p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-semibold">{t("dashboard.overview.cards.deadlines.title")}</h3>
                        </div>
                        <span className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                          {t("dashboard.upcomingDeadlines.viewAll")}
                        </span>
                      </div>
                      <p className="py-4 text-sm text-muted-foreground">{t("dashboard.upcomingDeadlines.empty")}</p>
                    </Card>
                    <Card className="flex-1 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-semibold">{t("dashboard.activeMatters.title")}</h3>
                        </div>
                        <span className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                          {t("dashboard.upcomingDeadlines.viewAll")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{t("dashboard.activeMatters.empty")}</p>
                    </Card>
                  </div>
                  <MockCalendar viewAll={t("dashboard.upcomingDeadlines.viewAll")} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
