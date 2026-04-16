import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { hasFeature } from "../lib/entitlements"
import { getEntitlementPlanForUser } from "../lib/getEntitlementPlan"
import TimeTrackingPageClient from "./TimeTrackingPageClient"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ matterId?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  if (!hasFeature(planId, "time_tracking")) {
    redirect("/dashboard/billing")
  }

  const params = await searchParams
  return <TimeTrackingPageClient prefillMatterId={params?.matterId ?? null} />
}

