import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { hasFeature } from "../lib/entitlements"
import { getEntitlementPlanForUser } from "../lib/getEntitlementPlan"
import ContractsWizardPage from "./ContractsWizardPage"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  if (!hasFeature(planId, "contract_drafting")) {
    redirect("/dashboard/billing")
  }

  const params = await searchParams
  const selectedId = params?.id ?? null
  return <ContractsWizardPage selectedId={selectedId ?? null} />
}
