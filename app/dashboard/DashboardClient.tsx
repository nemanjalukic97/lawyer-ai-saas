"use client"

import Link from "next/link"
import {
  Briefcase,
  Calendar,
  FilePen,
  FileText,
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
import { hasFeature, type EntitlementPlanId } from "./lib/entitlements"
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
  totals,
  invoiceMetrics,
  signatureMetrics,
  usageSummary,
  featureUsage,
  recentActivity,
  roiData,
  upcomingDeadlines,
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

  function urgencyDotClass(deadline: UpcomingDeadlinePreview): string {
    const eff = getEffectiveStatus(deadline)
    if (eff === "completed" || eff === "cancelled") return "bg-muted-foreground"
    if (eff === "overdue") return "bg-destructive"
    const diff = calendarDaysUntil(deadline.due_date)
    if (diff <= 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
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

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("dashboard.stats.clients.title")}
            </p>
            <p className="mt-2 text-2xl font-semibold">{totals.clients}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("dashboard.stats.clients.subtitle")}
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("dashboard.stats.contracts.title")}
            </p>
            <p className="mt-2 text-2xl font-semibold">{totals.contracts}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("dashboard.stats.contracts.subtitle")}
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("signature.dashboard.statsTitle")}
            </p>
            <p className="mt-2 text-2xl font-semibold">{signatureMetrics.pendingCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("signature.dashboard.pendingSignatures")}
            </p>
            <p className="mt-3 text-sm font-medium">
              {t("signature.dashboard.signedThisMonth")}:{" "}
              <span className="font-semibold">{signatureMetrics.signedThisMonthCount}</span>
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("dashboard.stats.documents.title")}
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {totals.documents + (canAnalyze ? totals.analyses : 0)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("dashboard.stats.documents.subtitle")}
            </p>
          </Card>

          {canPredict && (
            <Card className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("dashboard.stats.predictions.title")}
              </p>
              <p className="mt-2 text-2xl font-semibold">{totals.predictions}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("dashboard.stats.predictions.subtitle")}
              </p>
            </Card>
          )}
        </section>

        <section>
          <Card className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {t("dashboard.activeMatters.title")}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("dashboard.activeMatters.subtitle")}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href="/dashboard/matters">
                  {t("dashboard.activeMatters.viewAll")}
                </Link>
              </Button>
            </div>

            <div className="mt-4 text-sm">
              <span className="text-muted-foreground">
                {t("dashboard.activeMatters.openCountLabel")}{" "}
              </span>
              <span className="font-semibold">{activeMatters.openCount}</span>
            </div>

            <div className="mt-4 space-y-2">
              {activeMatters.recent.length === 0 ? (
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
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">
            {t("dashboard.actions.title")}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <QuickActionCard
              icon="primary"
              Icon={FileText}
              title={t("dashboard.actions.generate.title")}
              description={t("dashboard.actions.generate.description")}
              href="/dashboard/generate"
            />

            <QuickActionCard
              icon="muted"
              Icon={ShieldAlert}
              title={t("conflict.header.title")}
              description={t("conflict.header.subtitle")}
              href="/dashboard/conflict-check"
            />

            <QuickActionCard
              icon="muted"
              Icon={Search}
              title={t("dashboard.actions.research.title")}
              description={t("dashboard.actions.research.description")}
              href="/dashboard/research"
            />

            {canDraftContracts && (
              <QuickActionCard
                icon="muted"
                Icon={FilePen}
                title={t("dashboard.actions.contract.title")}
                description={t("dashboard.actions.contract.description")}
                href="/dashboard/contracts"
              />
            )}

            {canPredict && (
              <QuickActionCard
                icon="muted"
                Icon={Scale}
                title={t("dashboard.actions.predict.title")}
                description={t("dashboard.actions.predict.description")}
                href="/dashboard/predictions"
              />
            )}

            {canUseClients && (
              <QuickActionCard
                icon="muted"
                Icon={Users}
                title={t("dashboard.actions.clients.title")}
                description={t("dashboard.actions.clients.description")}
                href="/dashboard/clients"
              />
            )}

            {canUseTemplates && (
              <Card className="flex flex-col justify-between p-4 lg:col-span-4">
                <div className="space-y-2">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-medium">
                    {t("dashboard.actions.templates.title")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.actions.templates.description")}
                  </p>
                </div>
                <div className="mt-4">
                  <Button size="sm" asChild>
                    <Link href="/dashboard/templates">
                      {t("dashboard.actions.open")}
                    </Link>
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </section>

        {canViewDeadlines && (
          <section>
            <Card className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {t("dashboard.upcomingDeadlines.title")}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("dashboard.upcomingDeadlines.subtitle")}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/deadlines">
                    {t("dashboard.upcomingDeadlines.viewAll")}
                  </Link>
                </Button>
              </div>
              <div className="mt-5 space-y-3">
                {upcomingDeadlines.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.upcomingDeadlines.empty")}
                  </p>
                ) : (
                  upcomingDeadlines.map((d) => (
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
          </section>
        )}

        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {firmName || t("dashboard.workspace.unnamed")}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("dashboard.workspace.subtitle")}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.workspace.billing.title")}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {planId === "free" ? (
                    t("dashboard.workspace.billing.freeTierLine")
                  ) : (
                    <>
                      {t(`dashboard.planTier.${planId}`)} ·{" "}
                      <span className="capitalize">
                        {(subscriptionStatus ?? "").toLowerCase()}
                      </span>
                    </>
                  )}
                </p>
                {planId !== "free" && trialEndsIso && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("dashboard.workspace.billing.trialPrefix")}{" "}
                    {new Date(trialEndsIso).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.workspace.jurisdiction.title")}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {jurisdictionLabel}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("dashboard.workspace.jurisdiction.subtitle")}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.workspace.invoices.title")}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {totals.invoices}{" "}
                  {t("dashboard.workspace.invoices.countSuffix",)}
                </p>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <p>{t("dashboard.workspace.invoices.subtitle")}</p>
                  <p>
                    Outstanding: <span className="font-medium text-foreground">€{invoiceMetrics.outstandingTotalEur.toFixed(2)}</span>
                  </p>
                  <p>
                    Paid this month: <span className="font-medium text-foreground">€{invoiceMetrics.paidThisMonthTotalEur.toFixed(2)}</span>
                  </p>
                  <p>
                    Overdue: <span className="font-medium text-foreground">{invoiceMetrics.overdueCount}</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">
              {t("dashboard.usage.title")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("dashboard.usage.subtitle")}
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">
                  {t("dashboard.usage.tokens")}
                </span>
                <span className="font-semibold">
                  {usageSummary.totalTokens.toLocaleString()}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">
                  {t("dashboard.usage.cost")}
                </span>
                <span className="font-semibold">
                  $
                  {usageSummary.totalCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {t("dashboard.usage.detailHint")}
              </p>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <FeatureUsageChart data={featureUsage} />

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
                  {(
                    roiData.savingsEur / roiData.subscriptionCostEur
                  ).toFixed(1)}
                  × {t("dashboard.roi.ratioSuffix")}
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {canViewActivityFeed && (
          <section>
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.activity.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.activity.empty")}
                  </p>
                ) : (
                  recentActivity.map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="flex items-start justify-between"
                    >
                      <div>
                        <Link
                          href={`${ACTIVITY_HREF_BY_TYPE[item.type]}?id=${item.id}`}
                          className={cn(
                            "text-sm font-medium transition-colors hover:text-primary hover:underline",
                          )}
                        >
                          {t(`activity.types.${item.type}`)}: {item.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  )
}

type QuickActionCardProps = {
  icon: "primary" | "muted"
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  href: string
}

function QuickActionCard({
  icon,
  Icon,
  title,
  description,
  href,
}: QuickActionCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="flex flex-col justify-between p-4">
      <div className="space-y-2">
        <div
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md",
            icon === "primary"
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4">
        <Button size="sm" asChild>
          <Link href={href}>{t("dashboard.actions.open")}</Link>
        </Button>
      </div>
    </Card>
  )
}

