"use client"

import Link from "next/link"
import { FilePen, FileText, Scale, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
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
  usageSummary: {
    totalTokens: number
    totalCost: number
  }
  featureUsage: FeatureUsagePoint[]
  recentActivity: ActivityItem[]
  roiData: RoiData
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
  usageSummary,
  featureUsage,
  recentActivity,
  roiData,
}: Props) {
  const { t } = useLanguage()

  const trialEndsIso = firmTrialEndsAt ?? profileTrialEndsAt
  const canPredict = hasFeature(planId, "case_prediction")
  const canAnalyze = hasFeature(planId, "document_analysis")
  const canUseClients = hasFeature(planId, "client_portal")
  const canDraftContracts = hasFeature(planId, "contract_drafting")
  const canUseTemplates = hasFeature(planId, "template_library")
  const canViewActivityFeed = hasFeature(planId, "activity_feed")

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

        <section className="space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">
              {t("dashboard.actions.title")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.actions.subtitle")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <QuickActionCard
              icon="primary"
              Icon={FileText}
              title={t("dashboard.actions.generate.title")}
              description={t("dashboard.actions.generate.description")}
              href="/dashboard/generate"
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
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("dashboard.workspace.invoices.subtitle")}
                </p>
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

