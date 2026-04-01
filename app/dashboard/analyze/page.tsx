import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { hasFeature, normalizePlanId } from "../lib/entitlements"
import DocumentAnalysisPage from "./DocumentAnalysisPage"

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

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("subscription_tier, law_firm_id")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  let tier = profile?.subscription_tier ?? null
  if (profile?.law_firm_id) {
    const { data: firm } = await supabase
      .from("law_firms")
      .select("subscription_tier")
      .eq("id", profile.law_firm_id)
      .maybeSingle()
    tier = firm?.subscription_tier ?? tier
  }

  const planId = normalizePlanId(tier)
  if (!hasFeature(planId, "document_analysis")) {
    redirect("/dashboard/billing")
  }

  const params = await searchParams
  const selectedId = params?.id ?? null
  return <DocumentAnalysisPage selectedId={selectedId ?? null} />
}

