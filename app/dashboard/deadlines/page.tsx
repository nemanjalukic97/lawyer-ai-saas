import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { getEntitlementPlanForUser } from "../lib/getEntitlementPlan"
import DeadlinesPageClient from "./DeadlinesPageClient"

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

  const params = await searchParams
  return <DeadlinesPageClient planId={planId} prefillMatterId={params?.matterId ?? null} />
}
