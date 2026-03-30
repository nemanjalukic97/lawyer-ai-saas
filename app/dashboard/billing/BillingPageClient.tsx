"use client"

import { initializePaddle, type Paddle } from "@paddle/paddle-js"
import { useEffect, useMemo, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Tables } from "@/lib/supabase/types"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/LanguageProvider"

type Tier = "solo" | "professional" | "firm"
type SubscriptionStatus = "trial" | "active" | "cancelled" | "expired" | "past_due"

type ProfileBilling = Pick<
  Tables<"user_profiles">,
  "law_firm_id" | "subscription_tier" | "subscription_status" | "trial_ends_at"
>

type FirmBilling = Pick<
  Tables<"law_firms">,
  "id" | "name" | "subscription_tier" | "subscription_status" | "trial_ends_at"
>

type BillingProps = {
  success: boolean
  billing: {
    userId: string
    profile: ProfileBilling | null
    firm: FirmBilling | null
  }
}

const TIER_LABELS: Record<Tier, string> = {
  solo: "Solo",
  professional: "Professional",
  firm: "Firm",
}

const TIER_PRICES_EUR: Record<Tier, number> = {
  solo: 29,
  professional: 59,
  firm: 79,
}

function getStatusBadgeClass(status: SubscriptionStatus) {
  switch (status) {
    case "trial":
      return "border-yellow-200 bg-yellow-500/10 text-yellow-800"
    case "active":
      return "border-emerald-200 bg-emerald-500/10 text-emerald-800"
    case "cancelled":
      return "border-red-200 bg-red-500/10 text-red-800"
    case "past_due":
      return "border-orange-200 bg-orange-500/10 text-orange-800"
    case "expired":
      return "border-zinc-200 bg-zinc-500/10 text-zinc-800 dark:border-zinc-800 dark:text-zinc-200"
    default:
      return "border-border bg-muted text-foreground"
  }
}

function daysRemaining(iso: string | null) {
  if (!iso) return null
  const end = new Date(iso)
  const now = new Date()
  const ms = end.getTime() - now.getTime()
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24))
  return Number.isFinite(days) ? Math.max(0, days) : null
}

const PRICING_CARDS: Array<{
  tier: Tier
  title: string
  priceLabel: string
  featureKeys: Array<
    | "documentGeneration"
    | "contractDrafting"
    | "templateLibrary"
    | "aiCalls20"
    | "everythingInSolo"
    | "caseOutcomePredictions"
    | "documentAnalysis"
    | "timeTrackingBilling"
    | "clientPortal"
    | "aiCalls100"
    | "everythingInProfessional"
    | "prioritySupport"
    | "aiCalls300"
    | "multipleTeamMembers"
  >
  recommended?: boolean
}> = [
  {
    tier: "solo",
    title: "Solo",
    priceLabel: "€29/month",
    featureKeys: ["documentGeneration", "contractDrafting", "templateLibrary", "aiCalls20"],
  },
  {
    tier: "professional",
    title: "Professional",
    priceLabel: "€59/month",
    recommended: true,
    featureKeys: [
      "everythingInSolo",
      "caseOutcomePredictions",
      "documentAnalysis",
      "timeTrackingBilling",
      "clientPortal",
      "aiCalls100",
    ],
  },
  {
    tier: "firm",
    title: "Firm",
    priceLabel: "€79/month",
    featureKeys: ["everythingInProfessional", "prioritySupport", "aiCalls300", "multipleTeamMembers"],
  },
]

export default function BillingPageClient({ billing, success }: BillingProps) {
  const { t } = useLanguage()
  const [paddle, setPaddle] = useState<Paddle | null>(null)
  const [loadingTier, setLoadingTier] = useState<Tier | null>(null)
  const [managingPortal, setManagingPortal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pendingTierRef = useRef<Tier | null>(null)

  const entity = billing.firm ?? billing.profile
  const currentTier: Tier = (entity?.subscription_tier ?? "professional") as Tier
  const currentStatus: SubscriptionStatus = (entity?.subscription_status ??
    "trial") as SubscriptionStatus
  const trialDays = daysRemaining(entity?.trial_ends_at ?? null)

  const priceIdByTier = useMemo(() => {
    return {
      solo: process.env.NEXT_PUBLIC_PADDLE_SOLO_PRICE_ID!,
      professional: process.env.NEXT_PUBLIC_PADDLE_PROFESSIONAL_PRICE_ID!,
      firm: process.env.NEXT_PUBLIC_PADDLE_FIRM_PRICE_ID!,
    } satisfies Record<Tier, string>
  }, [])

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN

    if (!token) return

    const explicitEnv = (process.env.NEXT_PUBLIC_PADDLE_ENV ?? "").toLowerCase()
    const explicit: "sandbox" | "production" | undefined =
      explicitEnv === "sandbox" || explicitEnv === "production"
        ? (explicitEnv as "sandbox" | "production")
        : undefined
    const inferredFromToken: "sandbox" | "production" | undefined = token.startsWith("live_")
      ? "production"
      : token.startsWith("test_")
        ? "sandbox"
        : undefined

    const inferredEnv =
      explicit && inferredFromToken && explicit !== inferredFromToken
        ? inferredFromToken
        : (explicit ?? inferredFromToken)

    if (!inferredEnv) return

    initializePaddle({
      environment: inferredEnv,
      token,
      // `@paddle/paddle-js` forwards options to Paddle.Initialize()
      // so we can listen for checkout completion and provision immediately.
      eventCallback: async (evt: unknown) => {
        if (!evt || typeof evt !== "object") return
        const e = evt as { name?: unknown; data?: unknown }
        if (e.name !== "checkout.completed") return
        if (!e.data || typeof e.data !== "object") return
        const data = e.data as Record<string, unknown>
        const transactionId = typeof data.transaction_id === "string" ? data.transaction_id : null
        if (!transactionId) return

        // We provision in-app on success because Paddle webhooks can't reach localhost
        // without a tunnel. Webhooks remain the source of truth in production.
        try {
          const res = await fetch("/api/paddle/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionId,
              tier: pendingTierRef.current,
            }),
          })
          if (!res.ok) {
            const j: unknown = await res.json().catch(() => null)
            const msg =
              j && typeof j === "object" && typeof (j as Record<string, unknown>).error === "string"
                ? ((j as Record<string, unknown>).error as string)
                : null
            throw new Error(msg ?? "Failed to confirm purchase")
          }

          window.location.href = `${window.location.origin}/dashboard/billing?success=true`
        } catch (err) {
          setError(err instanceof Error ? err.message : t("billing.errors.checkoutFailed"))
        } finally {
          pendingTierRef.current = null
        }
      },
    } as unknown as Parameters<typeof initializePaddle>[0])
      .then((instance) => setPaddle(instance ?? null))
      .catch(() => setPaddle(null))
  }, [])

  async function startCheckout(tier: Tier) {
    setError(null)
    setLoadingTier(tier)

    try {
      const res = await fetch("/api/paddle/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: priceIdByTier[tier],
          tier,
        }),
      })

      const json: unknown = await res.json()
      if (!res.ok) {
        const message = (() => {
          if (!json || typeof json !== "object") return null
          const r = json as Record<string, unknown>
          return typeof r.error === "string" ? r.error : null
        })()
        throw new Error(message)
      }

      const transactionId =
        json &&
        typeof json === "object" &&
        "transactionId" in json &&
        typeof (json as Record<string, unknown>).transactionId === "string"
          ? ((json as Record<string, unknown>).transactionId as string)
          : undefined
      if (!transactionId) throw new Error(t("billing.errors.missingTransactionId"))
      if (!paddle) throw new Error(t("billing.errors.paddleNotInitialized"))

      const checkout = (paddle as unknown as {
        Checkout?: { open: (args: unknown) => void }
      }).Checkout

      if (!checkout) throw new Error(t("billing.errors.paddleCheckoutUnavailable"))

      pendingTierRef.current = tier
      checkout.open({
        transactionId,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : t("billing.errors.checkoutFailed"))
    } finally {
      setLoadingTier(null)
    }
  }

  const canManage = currentStatus === "active"
  const canReactivate = currentStatus === "cancelled" || currentStatus === "past_due"

  async function openManagePortal() {
    setError(null)
    setManagingPortal(true)
    try {
      const res = await fetch("/api/paddle/portal", { method: "POST" })
      const json: unknown = await res.json().catch(() => null)
      const message =
        json && typeof json === "object" && typeof (json as Record<string, unknown>).error === "string"
          ? ((json as Record<string, unknown>).error as string)
          : null
      if (!res.ok) {
        throw new Error(message ?? t("billing.errors.portalOpenFailed"))
      }
      const url =
        json && typeof json === "object" && typeof (json as Record<string, unknown>).url === "string"
          ? ((json as Record<string, unknown>).url as string)
          : null
      if (!url) throw new Error(t("billing.errors.portalOpenFailed"))
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (e) {
      setError(e instanceof Error ? e.message : t("billing.errors.portalOpenFailed"))
    } finally {
      setManagingPortal(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{t("billing.header.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("billing.header.subtitle")}
          </p>
        </div>

        {success && (
          <Card className="border-emerald-200 bg-emerald-500/5">
            <CardContent className="py-4 text-sm text-emerald-800 dark:text-emerald-200">
              {t("billing.messages.subscriptionUpdated")}
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-red-200 bg-red-500/5">
            <CardContent className="py-4 text-sm text-red-800 dark:text-red-200">
              {error}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle>{t("billing.currentPlan.title")}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {billing.firm?.name
                  ? `${billing.firm.name} ${t("billing.currentPlan.workspaceSuffix")}`
                  : t("billing.currentPlan.workspace")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-border bg-muted text-foreground">
                {TIER_LABELS[currentTier]} · €{TIER_PRICES_EUR[currentTier]}/mo
              </Badge>
              <Badge
                variant="outline"
                className={cn("capitalize", getStatusBadgeClass(currentStatus))}
              >
                {currentStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              {currentStatus === "trial" && trialDays !== null && (
                <span>
                  {t("billing.currentPlan.trialEndsPrefix")}{" "}
                  <strong className="text-foreground">{trialDays}</strong>{" "}
                  {t(trialDays === 1 ? "billing.currentPlan.dayOne" : "billing.currentPlan.dayMany")}
                  .
                </span>
              )}
              {currentStatus !== "trial" && (
                <span>
                  {t("billing.currentPlan.statusPrefix")} {currentStatus}.
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={canManage ? "default" : "outline"}
                disabled={!canManage || managingPortal}
                onClick={() => void openManagePortal()}
              >
                {managingPortal ? t("billing.actions.openingPortal") : t("billing.actions.manageSubscription")}
              </Button>
              <Button
                type="button"
                variant={canReactivate ? "default" : "outline"}
                disabled={!canReactivate}
                onClick={() => startCheckout(currentTier)}
              >
                {t("billing.actions.reactivate")}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_CARDS.map((c) => {
            const isCurrent = c.tier === currentTier
            const isLoading = loadingTier === c.tier
            const isHigher =
              (currentTier === "solo" && (c.tier === "professional" || c.tier === "firm")) ||
              (currentTier === "professional" && c.tier === "firm")
            const buttonLabel = isCurrent
              ? t("billing.actions.currentPlan")
              : isHigher
                ? t("billing.actions.upgrade")
                : t("billing.actions.downgrade")

            return (
              <Card
                key={c.tier}
                className={cn(
                  "relative",
                  c.recommended ? "border-primary/40 shadow-sm" : "border-border"
                )}
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{c.title}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">{c.priceLabel}</p>
                    </div>
                    {c.recommended && <Badge>{t("billing.badges.recommended")}</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {c.featureKeys.map((k) => (
                      <li key={k} className="text-muted-foreground">
                        {t(`billing.tiers.features.${k}`)}
                      </li>
                    ))}
                  </ul>

                  <Button
                    type="button"
                    className="w-full"
                    variant={c.recommended && !isCurrent ? "default" : "outline"}
                    disabled={isCurrent || isLoading}
                    onClick={() => startCheckout(c.tier)}
                  >
                    {isLoading ? t("billing.actions.startingCheckout") : buttonLabel}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="pt-2 text-xs text-muted-foreground">
          {t("billing.footer.paddleEnvironment")}{" "}
          <span className="font-medium text-foreground">
            {process.env.NEXT_PUBLIC_PADDLE_ENV ?? t("billing.common.unknown")}
          </span>
          . {t("billing.footer.paddleHint")}
        </div>
      </div>
    </div>
  )
}

