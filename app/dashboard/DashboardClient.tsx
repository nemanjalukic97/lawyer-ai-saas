"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  Clock,
  FilePen,
  FileSearch,
  FileText,
  Lock,
  PenLine,
  Sparkles,
  Scale,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"
import type { ActivityItem } from "./lib/activity"
import { ACTIVITY_HREF_BY_TYPE } from "./lib/activity"
import { FeatureUsageChart } from "./components/FeatureUsageChart"
import {
  getMaxActiveSignatureRequests,
  hasFeature,
  type EntitlementPlanId,
} from "./lib/entitlements"
import { getEffectiveStatus } from "./deadlines/lib/effectiveStatus"
import { calendarDaysUntil, formatDueHeading } from "./deadlines/lib/dates"
import type { Tables } from "@/lib/supabase/types"

type FeatureUsagePoint = {
  feature_type: string
  usage_count: number
}

type RoiData = {
  hoursSaved: number
  savingsEur: number
  subscriptionCostEur: number
  subscriptionTier: string
}

type UpcomingDeadlinePreview = {
  id: string
  title: string
  due_date: string
  status: Tables<"deadlines">["status"]
}

type ActiveMatterPreview = {
  id: string
  title: string
  matter_number: string
  status: "open"
  updated_at: string | null
}

type Props = {
  displayName: string
  roleLabel: string
  jurisdictionLabel: string
  planId: EntitlementPlanId
  subscriptionStatus: string | null
  firmName: string | null
  firmTrialEndsAt: string | null
  profileTrialEndsAt: string | null
  unbilledHours: number
  totals: {
    clients: number
    contracts: number
    documents: number
    analyses: number
    predictions: number
    invoices: number
  }
  invoiceMetrics: {
    outstandingTotalEur: number
    paidThisMonthTotalEur: number
    overdueCount: number
  }
  signatureMetrics: {
    pendingCount: number
    signedThisMonthCount: number
  }
  usageSummary: {
    totalTokens: number
    totalCost: number
  }
  featureUsage: FeatureUsagePoint[]
  recentActivity: ActivityItem[]
  roiData: RoiData
  upcomingDeadlines: UpcomingDeadlinePreview[]
  top3Deadlines: UpcomingDeadlinePreview[]
  activeMatters: {
    openCount: number
    recent: ActiveMatterPreview[]
  }
}

export function DashboardClient({
  displayName,
  roleLabel,
  jurisdictionLabel,
  planId,
  subscriptionStatus,
  firmName,
  firmTrialEndsAt,
  profileTrialEndsAt,
  unbilledHours,
  totals,
  invoiceMetrics,
  signatureMetrics,
  usageSummary,
  featureUsage,
  recentActivity,
  roiData,
  upcomingDeadlines,
  top3Deadlines,
  activeMatters,
}: Props) {
  const { t } = useLanguage()

  const trialEndsIso = firmTrialEndsAt ?? profileTrialEndsAt
  const canPredict = hasFeature(planId, "case_prediction")
  const canAnalyze = hasFeature(planId, "document_analysis")
  const canUseClients = hasFeature(planId, "client_portal")
  const canDraftContracts = hasFeature(planId, "contract_drafting")
  const canUseTemplates = hasFeature(planId, "template_library")
  const canViewActivityFeed = hasFeature(planId, "activity_feed")
  const canViewDeadlines = hasFeature(planId, "deadline_tracking")
  const canTrackTime = hasFeature(planId, "time_tracking")
  const canRequestSignatures = getMaxActiveSignatureRequests(planId) !== 0
  const canManageMatters = hasFeature(planId, "matter_management")

  function urgencyDotClass(deadline: UpcomingDeadlinePreview): string {
    const eff = getEffectiveStatus(deadline)
    if (eff === "completed" || eff === "cancelled") return "bg-muted-foreground"
    if (eff === "overdue") return "bg-destructive"
    const diff = calendarDaysUntil(deadline.due_date)
    if (diff <= 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const deadlinesPreview =
    top3Deadlines.length > 0
      ? top3Deadlines
      : upcomingDeadlines.slice(0, 3)

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("dashboard.header.kicker")}
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
              {t("dashboard.header.welcome")}{" "}
              <span className="text-primary">{displayName}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {roleLabel} · {jurisdictionLabel}
              {planId === "free" ? (
                <>
                  {" "}
                  ·{" "}
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                    {t("dashboard.header.noPaidPlan")}
                  </span>{" "}
                  <span className="text-muted-foreground">
                    ({t("dashboard.header.statusNotSubscribed")})
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  ·{" "}
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                    {t(`dashboard.planTier.${planId}`)}{" "}
                    {t("dashboard.header.planSuffix")}
                  </span>{" "}
                  {subscriptionStatus && (
                    <span className="text-muted-foreground">
                      ({subscriptionStatus.toLowerCase()})
                    </span>
                  )}
                </>
              )}
            </p>
          </div>
        </header>

        {/* Section 1 — Stats bar (4) + keep existing stat cards */}
        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              Icon={Users}
              label={t("dashboard.overview.stats.totalClients")}
              value={canUseClients ? totals.clients : 0}
              locked={!canUseClients}
              href={canUseClients ? "/dashboard/clients" : "/dashboard/billing"}
            />
            <StatCard
              Icon={Briefcase}
              label={t("dashboard.overview.stats.activeMatters")}
              value={canManageMatters ? activeMatters.openCount : 0}
              locked={!canManageMatters}
              href={canManageMatters ? "/dashboard/matters" : "/dashboard/billing"}
            />
            <StatCard
              Icon={PenLine}
              label={t("dashboard.overview.stats.pendingSignatures")}
              value={canRequestSignatures ? signatureMetrics.pendingCount : 0}
              locked={!canRequestSignatures}
              href={canRequestSignatures ? "/dashboard/contracts" : "/dashboard/billing"}
            />
            <StatCard
              Icon={Clock}
              label={t("dashboard.overview.stats.unbilledHours")}
              value={canTrackTime ? Number(unbilledHours.toFixed(1)) : 0}
              locked={!canTrackTime}
              href={canTrackTime ? "/dashboard/time" : "/dashboard/billing"}
            />
          </div>
        </section>

        {/* Section 2 — Quick actions (11 cards) */}
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{t("dashboard.actions.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("dashboard.actions.subtitle")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard
              Icon={Sparkles}
              title={t("dashboard.actions.generate.title")}
              description={t("dashboard.actions.generate.description")}
              entitled={hasFeature(planId, "document_generation")}
              href="/dashboard/generate"
            />
            <ActionCard
              Icon={FilePen}
              title={t("dashboard.actions.contract.title")}
              description={t("dashboard.actions.contract.description")}
              entitled={canDraftContracts}
              href="/dashboard/contracts"
            />
            <ActionCard
              Icon={Scale}
              title={t("dashboard.actions.predict.title")}
              description={t("dashboard.actions.predict.description")}
              entitled={canPredict}
              href="/dashboard/predictions"
            />
            <ActionCard
              Icon={FileSearch}
              title={t("dashboard.overview.cards.analysis.title")}
              description={t("dashboard.overview.cards.analysis.description")}
              entitled={canAnalyze}
              href="/dashboard/analyze"
            />
            <ActionCard
              Icon={FileText}
              title={t("redline.header.title")}
              description={t("redline.header.subtitle")}
              entitled={hasFeature(planId, "document_redlining")}
              href="/dashboard/redline"
            />
            <ActionCard
              Icon={Search}
              title={t("dashboard.actions.research.title")}
              description={t("dashboard.actions.research.description")}
              entitled={hasFeature(planId, "legal_research")}
              href="/dashboard/research"
            />
            <ActionCard
              Icon={ShieldAlert}
              title={t("conflict.header.title")}
              description={t("conflict.header.subtitle")}
              entitled={hasFeature(planId, "conflict_check")}
              href="/dashboard/conflict-check"
            />
            <ActionCard
              Icon={Users}
              title={t("dashboard.actions.clients.title")}
              description={t("dashboard.actions.clients.description")}
              entitled={canUseClients}
              href="/dashboard/clients"
            />
            <ActionCard
              Icon={Briefcase}
              title={t("matters.title")}
              description={t("dashboard.overview.cards.matters.description")}
              entitled={canManageMatters}
              href="/dashboard/matters"
            />
            <ActionCard
              Icon={Clock}
              title={t("dashboard.overview.cards.time.title")}
              description={t("dashboard.overview.cards.time.description")}
              entitled={canTrackTime}
              href="/dashboard/time"
            />
            <ActionCard
              Icon={Calendar}
              title={t("dashboard.overview.cards.deadlines.title")}
              description={t("dashboard.overview.cards.deadlines.description")}
              entitled={canViewDeadlines}
              href="/dashboard/deadlines"
            />
          </div>
        </section>

        {/* Section 3 — Two columns */}
        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {t("dashboard.activeMatters.title")}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("dashboard.activeMatters.subtitle")}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href={canManageMatters ? "/dashboard/matters" : "/dashboard/billing"}>
                    {t("dashboard.activeMatters.viewAll")}
                  </Link>
                </Button>
              </div>

              <div className="mt-4 text-sm">
                <span className="text-muted-foreground">
                  {t("dashboard.activeMatters.openCountLabel")}{" "}
                </span>
                <span className="font-semibold">
                  {canManageMatters ? activeMatters.openCount : 0}
                </span>
                {!canManageMatters && <Lock className="ml-2 inline h-4 w-4 text-muted-foreground" />}
              </div>

              <div className="mt-4 space-y-2">
                {!canManageMatters ? (
                  <Link
                    href="/dashboard/billing"
                    className="block rounded-md border p-3 text-sm text-muted-foreground hover:bg-muted/50"
                  >
                    {t("dashboard.overview.lockedHint")}
                  </Link>
                ) : activeMatters.recent.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.activeMatters.empty")}
                  </p>
                ) : (
                  activeMatters.recent.map((m) => (
                    <Link
                      key={m.id}
                      href={`/dashboard/matters/${m.id}`}
                      className="block rounded-md border p-3 hover:bg-muted/50"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">
                          {m.matter_number}
                        </Badge>
                        <p className="min-w-0 truncate text-sm font-medium">
                          {m.title}
                        </p>
                        <Badge variant="secondary" className="ml-auto text-[10px]">
                          {t("matters.status.open")}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t("dashboard.activeMatters.updatedPrefix")}{" "}
                        {m.updated_at ? new Date(m.updated_at).toLocaleString() : "—"}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {t("dashboard.overview.cards.deadlines.title")}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("dashboard.overview.cards.deadlines.subtitle")}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={canViewDeadlines ? "/dashboard/deadlines" : "/dashboard/billing"}>
                    {t("dashboard.upcomingDeadlines.viewAll")}
                  </Link>
                </Button>
              </div>

              <div className="mt-5 space-y-3">
                {!canViewDeadlines ? (
                  <Link
                    href="/dashboard/billing"
                    className="block rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      {t("dashboard.overview.lockedHint")}
                    </span>
                  </Link>
                ) : deadlinesPreview.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.upcomingDeadlines.empty")}
                  </p>
                ) : (
                  deadlinesPreview.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-start gap-3 rounded-lg border border-border px-3 py-2"
                    >
                      <span
                        className={cn(
                          "mt-1.5 size-2 shrink-0 rounded-full",
                          urgencyDotClass(d)
                        )}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug">
                          {d.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDueHeading(d.due_date)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold">{t("dashboard.activity.title")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("dashboard.overview.cards.activity.subtitle")}
              </p>
              <div className="mt-5 space-y-4">
                {!canViewActivityFeed ? (
                  <Link
                    href="/dashboard/billing"
                    className="block rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      {t("dashboard.overview.lockedHint")}
                    </span>
                  </Link>
                ) : recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.activity.empty")}
                  </p>
                ) : (
                  recentActivity.slice(0, 5).map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="flex items-start justify-between"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`${ACTIVITY_HREF_BY_TYPE[item.type]}?id=${item.id}`}
                          className={cn(
                            "block truncate text-sm font-medium transition-colors hover:text-primary hover:underline"
                          )}
                        >
                          {t(`activity.types.${item.type}`)}: {item.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <ArrowUpRight className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {t("dashboard.overview.cards.invoices.title")}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("dashboard.overview.cards.invoices.subtitle")}
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground">
                    {t("dashboard.overview.cards.invoices.outstanding")}
                  </span>
                  <span className="font-semibold">
                    €{invoiceMetrics.outstandingTotalEur.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground">
                    {t("dashboard.overview.cards.invoices.paidThisMonth")}
                  </span>
                  <span className="font-semibold">
                    €{invoiceMetrics.paidThisMonthTotalEur.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Section 4 — Usage chart at bottom (keep) */}
        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <div className="min-w-0">
            <FeatureUsageChart data={featureUsage} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.roi.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                {t("dashboard.roi.hoursPrefix")}{" "}
                <strong>{roiData.hoursSaved.toFixed(1)}h</strong>{" "}
                {t("dashboard.roi.hoursSuffix")}
              </p>
              {planId === "free" ? (
                <p className="text-muted-foreground">
                  {t("dashboard.roi.freeTierHint")}
                </p>
              ) : (
                <p>
                  {t("dashboard.roi.valuePrefix")}{" "}
                  <strong>€{roiData.savingsEur.toFixed(0)}</strong>{" "}
                  {t("dashboard.roi.valueMiddle")}{" "}
                  <strong>
                    {t(`dashboard.planTier.${planId}`)}{" "}
                    {t("dashboard.header.planSuffix")} €
                    {roiData.subscriptionCostEur}/month
                  </strong>
                  .
                </p>
              )}
              {planId !== "free" && roiData.subscriptionCostEur > 0 && (
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.roi.ratioPrefix")}{" "}
                  {(roiData.savingsEur / roiData.subscriptionCostEur).toFixed(1)}
                  × {t("dashboard.roi.ratioSuffix")}
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

function StatCard({
  Icon,
  label,
  value,
  locked,
  href,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: number
  locked: boolean
  href: string
}) {
  const { t } = useLanguage()
  return (
    <Link href={href} className="block">
      <Card
        className={cn(
          "relative p-5 transition-colors hover:bg-muted/40",
          locked && "opacity-80"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        {locked ? (
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            {t("dashboard.overview.upgrade")} <span aria-hidden>→</span>
          </p>
        ) : (
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            {t("dashboard.actions.open")} <ArrowUpRight className="h-3.5 w-3.5" />
          </p>
        )}
      </Card>
    </Link>
  )
}

function ActionCard({
  Icon,
  title,
  description,
  entitled,
  href,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  entitled: boolean
  href: string
}) {
  const { t } = useLanguage()
  const finalHref = entitled ? href : "/dashboard/billing"
  return (
    <Link href={finalHref} className="block">
      <Card
        className={cn(
          "relative flex min-h-[120px] h-full flex-col justify-between p-5 transition-colors hover:bg-muted/40",
          !entitled && "opacity-80"
        )}
      >
        {!entitled && (
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-muted/30 via-transparent to-transparent" />
        )}
        <div className="relative space-y-3">
          <div
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-md",
              entitled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-medium leading-snug">{title}</h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {!entitled && (
          <div className="relative mt-4 text-xs font-medium text-muted-foreground">
            {t("dashboard.overview.upgrade")} <span aria-hidden>→</span>
          </div>
        )}
      </Card>
    </Link>
  )
}

