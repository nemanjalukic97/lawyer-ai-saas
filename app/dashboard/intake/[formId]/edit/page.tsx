import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { getEntitlementPlanForUser } from "../../../lib/getEntitlementPlan"
import IntakeFormEditorClient from "../../IntakeFormEditorClient"

export default async function Page({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  const { formId } = await params

  return <IntakeFormEditorClient planId={planId} formId={formId} />
}
