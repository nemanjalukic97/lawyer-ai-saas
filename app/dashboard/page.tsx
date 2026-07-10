import { Suspense } from "react"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { isPaidPlanId } from "./lib/entitlements"
import { getDashboardIdentity } from "./lib/dashboardIdentity"
import { loadDashboardMetrics } from "./lib/loadDashboardMetrics"
import {
  DashboardBody,
  DashboardHeader,
  DashboardBodySkeleton,
} from "./DashboardClient"

const JURISDICTION_LABELS: Record<string, string> = {
  serbia: "Serbia",
  croatia: "Croatia",
  montenegro: "Montenegro",
  slovenia: "Slovenia",
  bih_fbih: "Bosnia & Herzegovina – Federation",
  bih_rs: "Bosnia & Herzegovina – Republika Srpska",
  bih_brcko: "Bosnia & Herzegovina – Brcko District",
}

const ROLE_LABELS: Record<string, string> = {
  owner: "Owner",
  lawyer: "Lawyer",
  admin: "Admin",
  assistant: "Assistant",
}

async function DashboardSecondary({
  userId,
}: {
  userId: string
}) {
  const identity = await getDashboardIdentity(userId)
  if (!identity) return null

  const supabase = await createClient()
  const metrics = await loadDashboardMetrics(
    supabase,
    identity.userId,
    identity.profile,
    identity.firm,
  )

  return (
    <DashboardBody
      planId={identity.planId}
      totals={metrics.totals}
      invoiceMetrics={metrics.invoiceMetrics}
      signatureMetrics={metrics.signatureMetrics}
      usageSummary={metrics.usageSummary}
      featureUsage={metrics.featureUsage}
      recentActivity={metrics.recentActivity}
      roiData={metrics.roiData}
      upcomingDeadlines={metrics.upcomingDeadlines}
      top3Deadlines={metrics.top3Deadlines}
      unbilledHours={metrics.unbilledHours}
      activeMatters={metrics.activeMatters}
    />
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  // Cached with layout: profile → firm → derived planId (2 DB rounds max).
  const identity = await getDashboardIdentity(user.id)
  if (!identity) redirect("/login")

  const { profile, firm, planId } = identity
  const displayName =
    profile.full_name ||
    identity.userMetadataFullName ||
    identity.userEmail ||
    "Your workspace"
  const roleLabel =
    (profile.role && ROLE_LABELS[profile.role]) || "Lawyer"

  const jurisdictionKey =
    profile.preferred_jurisdiction ?? firm?.default_jurisdiction ?? null
  const jurisdictionLabel = jurisdictionKey
    ? (JURISDICTION_LABELS[jurisdictionKey] ?? jurisdictionKey)
    : "Jurisdiction not set"

  const subscriptionStatusRaw =
    firm?.subscription_status ?? profile.subscription_status ?? null
  const subscriptionStatusForClient = isPaidPlanId(planId)
    ? (subscriptionStatusRaw ?? "trial")
    : null

  return (
    <div className="min-h-screen overflow-x-hidden bg-background px-4 py-10">
      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-8 lg:gap-10">
        {/* LCP: header only — not blocked by metrics waterfall */}
        <DashboardHeader
          displayName={displayName}
          roleLabel={roleLabel}
          jurisdictionLabel={jurisdictionLabel}
          planId={planId}
          subscriptionStatus={subscriptionStatusForClient}
        />

        {/* Below-the-fold: one parallel Supabase round, streamed after paint */}
        <Suspense fallback={<DashboardBodySkeleton />}>
          <DashboardSecondary userId={user.id} />
        </Suspense>
      </div>
    </div>
  )
}
