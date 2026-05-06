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

  function planBadgeClass(id: EntitlementPlanId): string {
    switch (id) {
      case "free":
        return "border-border/60 bg-muted text-foreground"
      case "solo":
        return "border-blue-500/30 bg-blue-500/15 text-blue-400"
      case "professional":
        return "border-purple-500/30 bg-purple-500/15 text-purple-400"
      case "firm":
        return "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
      default:
        return "border-border/60 bg-muted text-foreground"
    }
  }

  function activityDotClass(type: ActivityItem["type"]): string {
    switch (type) {
      case "contract":
        return "bg-blue-500"
      case "document":
        return "bg-purple-500"
      case "client":
        return "bg-emerald-500"
      default:
        return "bg-muted-foreground/40"
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/40 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground/50">
              {t("dashboard.header.kicker")}
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground normal-case">
              {t("dashboard.header.welcome")}{" "}
              <span className="text-primary">{displayName}</span>
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span className="text-muted-foreground">{jurisdictionLabel}</span>
              <span aria-hidden className="text-muted-foreground/40">
                ·
              </span>
              {planId === "free" ? (
                <>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
                      planBadgeClass(planId)
                    )}
                  >
                    {t("dashboard.header.noPaidPlan")}
                  </span>
                  <span className="text-muted-foreground/70">
                    ({t("dashboard.header.statusNotSubscribed")})
                  </span>
                </>
              ) : (
                <>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
                      planBadgeClass(planId)
                    )}
                  >
                    {t(`dashboard.planTier.${planId}`)}{" "}
                    {t("dashboard.header.planSuffix")}
                  </span>
                  {subscriptionStatus && (
                    <span className="text-muted-foreground/70">
                      ({subscriptionStatus.toLowerCase()})
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </header>

        {/* Section 1 — Stats bar (4) + keep existing stat cards */}
        <section className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              Icon={Users}
              label={t("dashboard.overview.stats.totalClients")}
              value={canUseClients ? totals.clients : 0}
              locked={!canUseClients}
              requiredPlan="solo"
              href={canUseClients ? "/dashboard/clients" : "/dashboard/billing"}
              accent="blue"
            />
            <StatCard
              Icon={Briefcase}
              label={t("dashboard.overview.stats.activeMatters")}
              value={canManageMatters ? activeMatters.openCount : 0}
              locked={!canManageMatters}
              requiredPlan="professional"
              href={canManageMatters ? "/dashboard/matters" : "/dashboard/billing"}
              accent="purple"
            />
            <StatCard
              Icon={PenLine}
              label={t("dashboard.overview.stats.pendingSignatures")}
              value={canRequestSignatures ? signatureMetrics.pendingCount : 0}
              locked={!canRequestSignatures}
              requiredPlan="professional"
              href={canRequestSignatures ? "/dashboard/contracts" : "/dashboard/billing"}
              accent="amber"
            />
            <StatCard
              Icon={Clock}
              label={t("dashboard.overview.stats.unbilledHours")}
              value={canTrackTime ? Number(unbilledHours.toFixed(1)) : 0}
              locked={!canTrackTime}
              requiredPlan="professional"
              href={canTrackTime ? "/dashboard/time" : "/dashboard/billing"}
              accent="emerald"
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

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard
              Icon={FileText}
              title={t("dashboard.actions.generate.title")}
              description={t("dashboard.actions.generate.description")}
              entitled={hasFeature(planId, "document_generation")}
              href="/dashboard/generate"
              iconBg="bg-blue-500/15"
              iconColor="text-blue-400"
            />
            <ActionCard
              Icon={FilePen}
              title={t("dashboard.actions.contract.title")}
              description={t("dashboard.actions.contract.description")}
              entitled={canDraftContracts}
              href="/dashboard/contracts"
              iconBg="bg-purple-500/15"
              iconColor="text-purple-400"
            />
            <ActionCard
              Icon={Scale}
              title={t("dashboard.actions.predict.title")}
              description={t("dashboard.actions.predict.description")}
              entitled={canPredict}
              href="/dashboard/predictions"
              iconBg="bg-amber-500/15"
              iconColor="text-amber-400"
            />
            <ActionCard
              Icon={FileSearch}
              title={t("dashboard.overview.cards.analysis.title")}
              description={t("dashboard.overview.cards.analysis.description")}
              entitled={canAnalyze}
              href="/dashboard/analyze"
              iconBg="bg-rose-500/15"
              iconColor="text-rose-400"
            />
            <ActionCard
              Icon={FileText}
              title={t("redline.header.title")}
              description={t("redline.header.subtitle")}
              entitled={hasFeature(planId, "document_redlining")}
              href="/dashboard/redline"
              iconBg="bg-orange-500/15"
              iconColor="text-orange-400"
            />
            <ActionCard
              Icon={Search}
              title={t("dashboard.actions.research.title")}
              description={t("dashboard.actions.research.description")}
              entitled={hasFeature(planId, "legal_research")}
              href="/dashboard/research"
              iconBg="bg-teal-500/15"
              iconColor="text-teal-400"
            />
            <ActionCard
              Icon={ShieldAlert}
              title={t("conflict.header.title")}
              description={t("conflict.header.subtitle")}
              entitled={hasFeature(planId, "conflict_check")}
              href="/dashboard/conflict-check"
              iconBg="bg-red-500/15"
              iconColor="text-red-400"
            />
            <ActionCard
              Icon={Users}
              title={t("dashboard.actions.clients.title")}
              description={t("dashboard.actions.clients.description")}
              entitled={canUseClients}
              href="/dashboard/clients"
              iconBg="bg-emerald-500/15"
              iconColor="text-emerald-400"
            />
            <ActionCard
              Icon={Briefcase}
              title={t("matters.title")}
              description={t("dashboard.overview.cards.matters.description")}
              entitled={canManageMatters}
              href="/dashboard/matters"
              iconBg="bg-indigo-500/15"
              iconColor="text-indigo-400"
            />
            <ActionCard
              Icon={Clock}
              title={t("dashboard.overview.cards.time.title")}
              description={t("dashboard.overview.cards.time.description")}
              entitled={canTrackTime}
              href="/dashboard/time"
              iconBg="bg-green-500/15"
              iconColor="text-green-400"
            />
            <ActionCard
              Icon={Calendar}
              title={t("dashboard.overview.cards.deadlines.title")}
              description={t("dashboard.overview.cards.deadlines.description")}
              entitled={canViewDeadlines}
              href="/dashboard/deadlines"
              iconBg="bg-yellow-500/15"
              iconColor="text-yellow-400"
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
                    <div className="flex items-center gap-2">
                      <span
                        className="mt-1 size-2 rounded-full bg-emerald-400"
                        aria-hidden
                      />
                      <h3 className="text-lg font-semibold">
                        {t("dashboard.activeMatters.title")}
                      </h3>
                    </div>
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
                      className="block rounded-md border border-l-2 border-blue-500/40 p-3 hover:bg-muted/50"
                    >
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="max-w-[100px] truncate rounded bg-muted px-2 py-0.5 font-mono text-xs sm:max-w-none">
                          {m.matter_number}
                        </span>
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
                      className="flex items-start gap-3 rounded-lg bg-muted/20 px-3 py-2.5"
                    >
                      <span
                        className={cn(
                          "mt-1.5 size-2 shrink-0 rounded-full",
                          urgencyDotClass(d)
                        )}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium leading-snug">
                            {d.title}
                          </p>
                          {(() => {
                            const eff = getEffectiveStatus(d)
                            const diff = calendarDaysUntil(d.due_date)
                            const isSoon =
                              eff !== "completed" &&
                              eff !== "cancelled" &&
                              eff !== "overdue" &&
                              diff >= 0 &&
                              diff <= 2
                            return isSoon ? (
                              <span className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs text-amber-400">
                                Soon
                              </span>
                            ) : null
                          })()}
                        </div>
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
                      className="-mx-2 flex min-w-0 items-start justify-between overflow-hidden rounded-md px-2 py-1.5 transition-colors hover:bg-muted/20"
                    >
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`${ACTIVITY_HREF_BY_TYPE[item.type]}?id=${item.id}`}
                          className={cn(
                            "flex min-w-0 items-center gap-2 text-sm font-medium transition-colors hover:text-primary hover:underline"
                          )}
                        >
                          <span
                            className={cn("mt-0.5 size-2 shrink-0 rounded-full", activityDotClass(item.type))}
                            aria-hidden
                          />
                          <span className="min-w-0 max-w-[200px] truncate sm:max-w-none">
                            {t(`activity.types.${item.type}`)}: {item.title}
                          </span>
                        </Link>
                      </div>
                      <div className="ml-3 flex shrink-0 items-center gap-3">
                        <span className="text-xs text-muted-foreground/50">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
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
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-lg bg-muted/20 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
                    {t("dashboard.overview.cards.invoices.outstanding")}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-base font-semibold tabular-nums sm:text-lg",
                      invoiceMetrics.outstandingTotalEur > 0 && "text-amber-400"
                    )}
                  >
                    €{invoiceMetrics.outstandingTotalEur.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/20 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
                    {t("dashboard.overview.cards.invoices.paidThisMonth")}
                  </p>
                  <p className="mt-1 text-base font-semibold tabular-nums text-emerald-400 sm:text-lg">
                    €{invoiceMetrics.paidThisMonthTotalEur.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="bg-emerald-500"
                  style={{ flexGrow: Math.max(0, invoiceMetrics.paidThisMonthTotalEur) }}
                  aria-hidden
                />
                <div
                  className="bg-amber-500"
                  style={{ flexGrow: Math.max(0, invoiceMetrics.outstandingTotalEur) }}
                  aria-hidden
                />
              </div>
            </Card>
          </div>
        </section>

        {/* Section 4 — Usage chart at bottom (keep) */}
        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <div className="min-w-0">
            <div className="rounded-xl bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-end">
                <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground/60">
                  Last 30 days
                </span>
              </div>
              <FeatureUsageChart data={featureUsage} />
            </div>
          </div>

          <Card className="border-l-4 border-l-emerald-500/40">
            <CardHeader>
              <CardTitle>{t("dashboard.roi.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pl-4 text-sm">
              {planId !== "free" && roiData.subscriptionCostEur > 0 && (
                <p className="text-5xl font-bold text-emerald-400">
                  {(
                    roiData.savingsEur / Math.max(roiData.subscriptionCostEur, 1)
                  ).toFixed(0)}
                  ×
                </p>
              )}
              <p className="text-sm text-muted-foreground">
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
  requiredPlan,
  href,
  accent,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: number
  locked: boolean
  requiredPlan?: "solo" | "professional" | "firm"
  href: string
  accent: "blue" | "purple" | "amber" | "emerald"
}) {
  const { t } = useLanguage()
  const accentClass = {
    blue: "border-l-blue-500",
    purple: "border-l-purple-500",
    amber: "border-l-amber-500",
    emerald: "border-l-emerald-500",
  }[accent]

  const valueColor =
    accent === "amber" && value > 0
      ? "text-amber-400"
      : accent === "emerald" && value > 0
        ? "text-emerald-400"
        : "text-foreground"

  const card = (
    <Card
      className={cn(
        "relative min-w-0 overflow-hidden border-l-2 p-5 transition-all hover:border-border/60 hover:bg-muted/40",
        accentClass,
        locked && "opacity-60"
      )}
    >
      <Icon className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground/30" />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
        {label}
      </p>
      {locked ? (
        <div className="mt-2 mb-1">
          <Lock className="h-7 w-7 text-muted-foreground/20" />
        </div>
      ) : (
        <p className={cn("mt-2 text-2xl font-bold tracking-tight sm:text-4xl", valueColor)}>
          {value}
        </p>
      )}
      {locked ? (
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />
            <span className="text-xs text-muted-foreground/50">
              {t("dashboard.overview.notAvailable")}
            </span>
          </div>
          {requiredPlan && (
            <a
              href="/dashboard/billing"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
            >
              {requiredPlan === "solo"
                ? t("dashboard.overview.subscribeSolo")
                : requiredPlan === "professional"
                  ? t("dashboard.overview.subscribeProfessional")
                  : t("dashboard.overview.subscribeFirm")}
            </a>
          )}
        </div>
      ) : (
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground/50 transition-colors hover:text-foreground">
          {t("dashboard.actions.open")} <ArrowUpRight className="h-3.5 w-3.5" />
        </p>
      )}
    </Card>
  )

  return locked ? (
    <div className="block group">{card}</div>
  ) : (
    <Link href={href} className="block group">
      {card}
    </Link>
  )
}

function ActionCard({
  Icon,
  title,
  description,
  entitled,
  href,
  iconBg,
  iconColor,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  entitled: boolean
  href: string
  iconBg?: string
  iconColor?: string
}) {
  const { t } = useLanguage()
  const finalHref = entitled ? href : "/dashboard/billing"
  return (
    <Link href={finalHref} className="block">
      <Card
        className={cn(
          "group relative flex h-full min-h-[120px] cursor-pointer flex-col justify-between p-5 transition-all duration-200 hover:border-border/60 hover:bg-muted/30 sm:min-h-[160px]",
          !entitled && "opacity-80"
        )}
      >
        {!entitled && (
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-muted/30 via-transparent to-transparent" />
        )}
        <ArrowUpRight className="absolute right-3 top-3 h-3 w-3 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/60" />
        <div className="relative space-y-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              iconBg ?? "bg-muted/60",
              !entitled && "opacity-80"
            )}
          >
            <Icon className={cn("h-[18px] w-[18px]", iconColor ?? "text-foreground/70")} />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground sm:text-sm">{title}</p>
            <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground/60 sm:block">
              {description}
            </p>
          </div>
        </div>
        {!entitled && (
          <p className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
            <Lock className="h-3 w-3" />
            {t("dashboard.overview.upgrade")} →
          </p>
        )}
      </Card>
    </Link>
  )
}

