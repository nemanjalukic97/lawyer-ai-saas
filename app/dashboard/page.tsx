import Link from "next/link"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { FilePen, FileText, Scale, Users } from "lucide-react"
import { FeatureUsageChart } from "./components/FeatureUsageChart"

type DashboardScope = {
  userId: string
  lawFirmId: string | null
}

type ActivityItem = {
  type: "contract" | "document" | "analysis" | "prediction" | "client"
  id: string
  title: string
  createdAt: string
}

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

const TIER_LABELS: Record<string, string> = {
  solo: "Solo",
  professional: "Professional",
  firm: "Firm",
}

function getScopeFromProfile(
  userId: string,
  profile: { law_firm_id: string | null }
): DashboardScope {
  return {
    userId,
    lawFirmId: profile.law_firm_id ?? null,
  }
}

async function getRecentActivity(
  supabase: ReturnType<typeof createClient>,
  scope: DashboardScope
): Promise<ActivityItem[]> {
  const filterCol = scope.lawFirmId ? "law_firm_id" : "user_id"
  const filterVal = scope.lawFirmId ?? scope.userId
  const limitPerTable = 3

  const [
    { data: contracts },
    { data: documents },
    { data: analyses },
    { data: predictions },
    { data: clients },
  ] = await Promise.all([
    supabase
      .from("contracts")
      .select("id, title, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("documents")
      .select("id, title, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("document_analyses")
      .select("id, original_filename, analyzed_at, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("analyzed_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("case_predictions")
      .select("id, case_name, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("clients")
      .select("id, name, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(limitPerTable),
  ])

  const items: ActivityItem[] = []

  ;(contracts ?? []).forEach((c: any) =>
    items.push({
      type: "contract",
      id: c.id,
      title: c.title,
      createdAt: c.created_at,
    })
  )

  ;(documents ?? []).forEach((d: any) =>
    items.push({
      type: "document",
      id: d.id,
      title: d.title,
      createdAt: d.created_at,
    })
  )

  ;(analyses ?? []).forEach((a: any) =>
    items.push({
      type: "analysis",
      id: a.id,
      title: a.original_filename,
      createdAt: a.analyzed_at ?? a.created_at,
    })
  )

  ;(predictions ?? []).forEach((p: any) =>
    items.push({
      type: "prediction",
      id: p.id,
      title: p.case_name ?? "Case prediction",
      createdAt: p.created_at,
    })
  )

  ;(clients ?? []).forEach((cl: any) =>
    items.push({
      type: "client",
      id: cl.id,
      title: cl.name,
      createdAt: cl.created_at,
    })
  )

  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return items.slice(0, 10)
}

async function getRoiData(
  supabase: ReturnType<typeof createClient>,
  scope: DashboardScope,
  profile: { law_firm_id: string | null; subscription_tier?: string | null }
): Promise<RoiData> {
  const filterCol = scope.lawFirmId ? "law_firm_id" : "user_id"
  const filterVal = scope.lawFirmId ?? scope.userId

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: timeEntries } = await supabase
    .from("time_entries")
    .select("duration_minutes, hourly_rate, status")
    .eq(filterCol, filterVal)
    .is("deleted_at", null)
    .gte("work_date", startOfMonth.toISOString())

  const relevant = (timeEntries ?? []).filter((t: any) =>
    ["approved", "billed"].includes(t.status)
  )

  const totalHoursTracked = relevant.reduce(
    (sum: number, t: any) => sum + ((t.duration_minutes ?? 0) / 60),
    0
  )

  const { data: clients } = await supabase
    .from("clients")
    .select("default_hourly_rate")
    .eq(filterCol, filterVal)
    .is("deleted_at", null)

  const avgClientRate =
    clients && clients.length
      ? clients.reduce(
          (sum: number, c: any) => sum + Number(c.default_hourly_rate ?? 0),
          0
        ) / clients.length
      : 60

  const effectiveRate = avgClientRate

  const hoursSaved = totalHoursTracked * 0.3
  const savingsEur = hoursSaved * effectiveRate

  let tier = profile.subscription_tier ?? "professional"
  if (scope.lawFirmId) {
    const { data: firm } = await supabase
      .from("law_firms")
      .select("subscription_tier")
      .eq("id", scope.lawFirmId)
      .maybeSingle()
    if (firm?.subscription_tier) tier = firm.subscription_tier
  }

  const tierPrices: Record<string, number> = {
    solo: 29,
    professional: 59,
    firm: 79,
  }
  const subscriptionCostEur = tierPrices[tier] ?? 59

  return {
    hoursSaved,
    savingsEur,
    subscriptionCostEur,
    subscriptionTier: tier,
  }
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const [
    { data: profile, error: profileError },
    contractsCountResult,
    documentsCountResult,
    predictionsCountResult,
    analysesCountResult,
    clientsCountResult,
    invoicesCountResult,
    { data: usageRows },
  ] = await Promise.all([
    supabase
      .from("user_profiles")
      .select(
        "full_name, role, preferred_jurisdiction, subscription_tier, subscription_status, trial_ends_at, law_firm_id"
      )
      .eq("id", user.id)
      .is("deleted_at", null)
      .maybeSingle(),
    supabase.from("contracts").select("*", { count: "exact", head: true }),
    supabase.from("documents").select("*", { count: "exact", head: true }),
    supabase
      .from("case_predictions")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("document_analyses")
      .select("*", { count: "exact", head: true }),
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("invoices").select("*", { count: "exact", head: true }),
    supabase
      .from("usage_stats")
      .select("feature_type, tokens_used, cost_usd, created_at")
      .order("created_at", { ascending: false })
      .limit(30),
  ])

  console.log("Profile data:", profile)
  console.log("Profile error:", profileError)

  let firm: {
    name: string | null
    subscription_tier: string | null
    subscription_status: string | null
    trial_ends_at: string | null
    default_jurisdiction: string | null
  } | null = null

  if (profile?.law_firm_id) {
    const { data: firmRow } = await supabase
      .from("law_firms")
      .select(
        "name, subscription_tier, subscription_status, trial_ends_at, default_jurisdiction"
      )
      .eq("id", profile.law_firm_id)
      .maybeSingle()

    firm = firmRow ?? null
  }

  const displayName =
    profile?.full_name ||
    // fall back to auth user metadata full_name if profile row is not yet populated
    (user.user_metadata as { full_name?: string })?.full_name ||
    user.email ||
    "Your workspace"
  const roleLabel =
    (profile?.role && ROLE_LABELS[profile.role]) || "Lawyer"

  const jurisdictionKey =
    profile?.preferred_jurisdiction ?? firm?.default_jurisdiction ?? null
  const jurisdictionLabel = jurisdictionKey
    ? JURISDICTION_LABELS[jurisdictionKey] ?? jurisdictionKey
    : "Jurisdiction not set"

  const tierKey =
    profile?.subscription_tier || firm?.subscription_tier || "solo"
  const subscriptionTier = TIER_LABELS[tierKey] || "Solo"
  const subscriptionStatus =
    profile?.subscription_status || firm?.subscription_status || "trial"

  const totalContracts = contractsCountResult.count ?? 0
  const totalDocuments = documentsCountResult.count ?? 0
  const totalPredictions = predictionsCountResult.count ?? 0
  const totalAnalyses = analysesCountResult.count ?? 0
  const totalClients = clientsCountResult.count ?? 0
  const totalInvoices = invoicesCountResult.count ?? 0

  const usageSummary = (usageRows ?? []).reduce(
    (acc, row) => {
      const tokens = row.tokens_used ?? 0
      const cost = Number(row.cost_usd ?? 0)
      return {
        totalTokens: acc.totalTokens + tokens,
        totalCost: acc.totalCost + cost,
      }
    },
    { totalTokens: 0, totalCost: 0 }
  )

  const scope = getScopeFromProfile(user.id, {
    law_firm_id: profile?.law_firm_id ?? null,
  })

  const [recentActivity, roiData] = await Promise.all([
    getRecentActivity(supabase, scope),
    getRoiData(supabase, scope, {
      law_firm_id: profile?.law_firm_id ?? null,
      subscription_tier: profile?.subscription_tier ?? firm?.subscription_tier,
    }),
  ])

  const featureUsage: FeatureUsagePoint[] = (() => {
    const counts: Record<string, number> = {}
    for (const row of usageRows ?? []) {
      const key = row.feature_type as string
      counts[key] = (counts[key] ?? 0) + 1
    }
    return Object.entries(counts).map(([feature_type, usage_count]) => ({
      feature_type,
      usage_count,
    }))
  })()

  const typeLabels: Record<ActivityItem["type"], string> = {
    contract: "Contract",
    document: "Document",
    analysis: "Document analysis",
    prediction: "Case prediction",
    client: "Client",
  }

  const activityHrefByType: Record<ActivityItem["type"], string> = {
    contract: "/dashboard/contracts",
    document: "/dashboard/generate",
    analysis: "/dashboard/analyze",
    prediction: "/dashboard/predictions",
    client: "/dashboard/clients",
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Legantis dashboard
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
              Welcome back,{" "}
              <span className="text-primary">{displayName}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {roleLabel} · {jurisdictionLabel} ·{" "}
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                {subscriptionTier} plan
              </span>{" "}
              <span className="text-muted-foreground">
                ({subscriptionStatus.toLowerCase()})
              </span>
            </p>
          </div>

          <form action="/auth/signout" method="post" className="self-start">
            <Button type="submit" variant="outline" size="sm">
              Log out
            </Button>
          </form>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Clients
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalClients}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Active clients in your workspace
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Contracts
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalContracts}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Drafted & signed contracts
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Documents & analyses
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {totalDocuments + totalAnalyses}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Generated documents and risk analyses
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Case predictions
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalPredictions}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Outcome predictions run so far
            </p>
          </Card>
        </section>

        <section className="space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">Quick actions</h2>
            <p className="text-xs text-muted-foreground">
              Jump straight into key Legantis features.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col justify-between p-4">
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium">Generate Document</h3>
                <p className="text-xs text-muted-foreground">
                  Create NDAs, contracts, and legal documents with AI.
                </p>
              </div>
              <div className="mt-4">
                <Button size="sm" asChild>
                  <Link href="/dashboard/generate">Open</Link>
                </Button>
              </div>
            </Card>

            <Card className="flex flex-col justify-between p-4">
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <FilePen className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium">Draft Contract</h3>
                <p className="text-xs text-muted-foreground">
                  Multi-step contract wizard with jurisdiction-specific clauses.
                </p>
              </div>
              <div className="mt-4">
                <Button size="sm" asChild>
                  <Link href="/dashboard/contracts">Open</Link>
                </Button>
              </div>
            </Card>

            <Card className="flex flex-col justify-between p-4">
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Scale className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium">Predict Case Outcome</h3>
                <p className="text-xs text-muted-foreground">
                  AI analysis of case success probability based on precedents.
                </p>
              </div>
              <div className="mt-4">
                <Button size="sm" asChild>
                  <Link href="/dashboard/predictions">Open</Link>
                </Button>
              </div>
            </Card>

            <Card className="flex flex-col justify-between p-4">
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium">Clients</h3>
                <p className="text-xs text-muted-foreground">
                  Manage client contacts and prepare portal access.
                </p>
              </div>
              <div className="mt-4">
                <Button size="sm" asChild>
                  <Link href="/dashboard/clients">Open</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {firm?.name || "Your Legantis workspace"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Overview of activity across contracts, documents, and cases.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">Billing & plans</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {subscriptionTier} ·{" "}
                  <span className="capitalize">
                    {subscriptionStatus.toLowerCase()}
                  </span>
                </p>
                {(firm?.trial_ends_at || profile?.trial_ends_at) && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Trial ends{" "}
                    {new Date(
                      firm?.trial_ends_at ?? profile?.trial_ends_at!
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">Jurisdiction focus</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {jurisdictionLabel}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Used to tailor templates, clauses, and predictions.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">
                  Billing documents
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {totalInvoices} invoice{totalInvoices === 1 ? "" : "s"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Generated from tracked time and clients.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">AI usage snapshot</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Recent Legantis activity across contract generation, analysis,
              and predictions.
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">
                  Tokens used (recent)
                </span>
                <span className="font-semibold">
                  {usageSummary.totalTokens.toLocaleString()}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Estimated cost</span>
                <span className="font-semibold">
                  $
                  {usageSummary.totalCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Detailed per-feature usage will appear here as you start using
                contract generation, case prediction, and document analysis.
              </p>
            </div>
          </Card>
        </section>
        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <FeatureUsageChart data={featureUsage} />

          <Card>
            <CardHeader>
              <CardTitle>ROI this month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                You&apos;ve saved approximately{" "}
                <strong>{roiData.hoursSaved.toFixed(1)} hours</strong> of work
                this month.
              </p>
              <p>
                That time is worth about{" "}
                <strong>€{roiData.savingsEur.toFixed(0)}</strong> compared to
                your{" "}
                <strong>
                  {roiData.subscriptionTier} plan at €
                  {roiData.subscriptionCostEur}/month
                </strong>
                .
              </p>
              {roiData.subscriptionCostEur > 0 && (
                <p className="text-xs text-muted-foreground">
                  Approximate ROI:{" "}
                  {(roiData.savingsEur / roiData.subscriptionCostEur).toFixed(
                    1
                  )}
                  × your subscription.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No recent activity yet.
                </p>
              ) : (
                recentActivity.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-start justify-between"
                  >
                    <div>
                      <Link
                        href={`${activityHrefByType[item.type]}?id=${item.id}`}
                        className="text-sm font-medium hover:text-primary hover:underline transition-colors"
                      >
                        {typeLabels[item.type]}: {item.title}
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
      </div>
    </div>
  )
}

