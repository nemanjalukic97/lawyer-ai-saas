import type { SupabaseClient } from "@supabase/supabase-js"

import type { Database, Json } from "@/lib/supabase/types"

export type ActivityAction =
  | "contract.created"
  | "contract.deleted"
  | "client.created"
  | "client.deleted"
  | "matter.created"
  | "matter.updated"
  | "matter.deleted"
  | "intake_form.created"
  | "intake_form.deleted"
  | "intake_submission.received"
  | "intake_submission.converted"
  | "deadline.created"
  | "deadline.deleted"
  | "invoice.created"
  | "invoice.deleted"
  | "redline.created"

export type ActivityEntityType =
  | "contract"
  | "client"
  | "matter"
  | "intake_form"
  | "intake_submission"
  | "deadline"
  | "invoice"
  | "redline"

export async function logActivity(
  supabase: SupabaseClient<Database, any, any, any>,
  action: ActivityAction,
  entityType: ActivityEntityType,
  entityId: string,
  entityLabel: string,
  metadata?: Json
): Promise<void> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    let lawFirmId: string | null = null
    try {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("law_firm_id")
        .eq("id", user.id)
        .is("deleted_at", null)
        .maybeSingle()

      lawFirmId =
        profile && typeof profile.law_firm_id === "string"
          ? profile.law_firm_id
          : null
    } catch {
      lawFirmId = null
    }

    await supabase.from("audit_logs").insert({
      user_id: user.id,
      law_firm_id: lawFirmId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      description: entityLabel,
      metadata: metadata ?? null,
    })
  } catch {
    // must never block the primary action
  }
}

