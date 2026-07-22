import { getResend } from "@/lib/email/resend"
import { buildTrialWarningEmail } from "@/lib/email/trialWarningEmail"
import { supabaseAdmin } from "@/lib/supabase/admin"

type TrialRow = {
  id: string
  source: "user_profiles" | "law_firms"
  name: string
  email: string | null
  trial_ends_at: string
  preferred_language?: string | null
}

export type TrialLifecycleAction = {
  action: "warn" | "downgrade"
  source: "user_profiles" | "law_firms"
  id: string
  name: string
  email: string | null
  trialEndsAt: string
}

export type TrialInventoryRow = {
  source: "user_profiles" | "law_firms"
  id: string
  name: string
  email: string | null
  subscriptionTier: string | null
  subscriptionStatus: "trial"
  trialEndsAt: string | null
  trialWarningSentAt: string | null
  /** What this run would do to the row (guard: status must be trial). */
  predictedAction: "warn" | "downgrade" | "none"
}

export type TrialLifecycleRunResult = {
  warned: number
  downgraded: number
  errors: Array<{ source: string; id: string; message: string }>
  actions: TrialLifecycleAction[]
  /** All current trial rows (read-only inventory for dry-run review). */
  trialInventory: TrialInventoryRow[]
}

type Options = {
  dryRun?: boolean
}

function daysUntil(iso: string): number {
  const end = new Date(iso).getTime()
  const now = Date.now()
  if (!Number.isFinite(end)) return 0
  return Math.ceil((end - now) / (24 * 60 * 60 * 1000))
}

async function resolveProfileEmail(userId: string): Promise<string | null> {
  const { data } = await supabaseAdmin.auth.admin.getUserById(userId)
  return data?.user?.email ?? null
}

async function loadTrialInventory(): Promise<TrialInventoryRow[]> {
  const now = Date.now()
  const inThreeDays = now + 3 * 24 * 60 * 60 * 1000

  const [profilesRes, firmsRes] = await Promise.all([
    supabaseAdmin
      .from("user_profiles")
      .select(
        "id, full_name, subscription_tier, subscription_status, trial_ends_at, trial_warning_sent_at"
      )
      .eq("subscription_status", "trial")
      .is("deleted_at", null),
    supabaseAdmin
      .from("law_firms")
      .select(
        "id, name, subscription_tier, subscription_status, trial_ends_at, trial_warning_sent_at, billing_email, owner_id"
      )
      .eq("subscription_status", "trial")
      .is("deleted_at", null),
  ])

  if (profilesRes.error) throw profilesRes.error
  if (firmsRes.error) throw firmsRes.error

  const inventory: TrialInventoryRow[] = []

  for (const p of profilesRes.data ?? []) {
    const row = p as {
      id: string
      full_name: string
      subscription_tier: string | null
      trial_ends_at: string | null
      trial_warning_sent_at: string | null
    }
    const email = await resolveProfileEmail(row.id)
    const endMs = row.trial_ends_at ? new Date(row.trial_ends_at).getTime() : NaN
    let predictedAction: TrialInventoryRow["predictedAction"] = "none"
    if (Number.isFinite(endMs)) {
      if (endMs < now) predictedAction = "downgrade"
      else if (endMs <= inThreeDays && !row.trial_warning_sent_at) predictedAction = "warn"
    }
    inventory.push({
      source: "user_profiles",
      id: row.id,
      name: row.full_name || "Legantis user",
      email,
      subscriptionTier: row.subscription_tier,
      subscriptionStatus: "trial",
      trialEndsAt: row.trial_ends_at,
      trialWarningSentAt: row.trial_warning_sent_at,
      predictedAction,
    })
  }

  for (const f of firmsRes.data ?? []) {
    const firm = f as {
      id: string
      name: string
      subscription_tier: string | null
      trial_ends_at: string | null
      trial_warning_sent_at: string | null
      billing_email: string | null
      owner_id: string
    }
    let email = firm.billing_email
    if (!email) email = await resolveProfileEmail(firm.owner_id)
    const endMs = firm.trial_ends_at ? new Date(firm.trial_ends_at).getTime() : NaN
    let predictedAction: TrialInventoryRow["predictedAction"] = "none"
    if (Number.isFinite(endMs)) {
      if (endMs < now) predictedAction = "downgrade"
      else if (endMs <= inThreeDays && !firm.trial_warning_sent_at) predictedAction = "warn"
    }
    inventory.push({
      source: "law_firms",
      id: firm.id,
      name: firm.name || "Law firm",
      email,
      subscriptionTier: firm.subscription_tier,
      subscriptionStatus: "trial",
      trialEndsAt: firm.trial_ends_at,
      trialWarningSentAt: firm.trial_warning_sent_at,
      predictedAction,
    })
  }

  inventory.sort((a, b) => {
    const aT = a.trialEndsAt ? new Date(a.trialEndsAt).getTime() : Number.POSITIVE_INFINITY
    const bT = b.trialEndsAt ? new Date(b.trialEndsAt).getTime() : Number.POSITIVE_INFINITY
    return aT - bT
  })

  return inventory
}

async function loadWarningCandidates(): Promise<TrialRow[]> {
  const now = new Date()
  const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

  const [profilesRes, firmsRes] = await Promise.all([
    supabaseAdmin
      .from("user_profiles")
      .select("id, full_name, trial_ends_at, preferred_language")
      .eq("subscription_status", "trial")
      .is("trial_warning_sent_at", null)
      .is("deleted_at", null)
      .gte("trial_ends_at", now.toISOString())
      .lte("trial_ends_at", inThreeDays.toISOString()),
    supabaseAdmin
      .from("law_firms")
      .select("id, name, trial_ends_at, billing_email, owner_id")
      .eq("subscription_status", "trial")
      .is("trial_warning_sent_at", null)
      .is("deleted_at", null)
      .gte("trial_ends_at", now.toISOString())
      .lte("trial_ends_at", inThreeDays.toISOString()),
  ])

  if (profilesRes.error) throw profilesRes.error
  if (firmsRes.error) throw firmsRes.error

  const rows: TrialRow[] = []

  for (const p of profilesRes.data ?? []) {
    const trialEndsAt = (p as { trial_ends_at: string | null }).trial_ends_at
    if (!trialEndsAt) continue
    const email = await resolveProfileEmail(p.id)
    rows.push({
      id: p.id,
      source: "user_profiles",
      name: ((p as { full_name: string }).full_name as string) || "Legantis user",
      email,
      trial_ends_at: trialEndsAt,
      preferred_language: (p as { preferred_language: string | null }).preferred_language,
    })
  }

  for (const f of firmsRes.data ?? []) {
    const firm = f as {
      id: string
      name: string
      trial_ends_at: string | null
      billing_email: string | null
      owner_id: string
    }
    if (!firm.trial_ends_at) continue
    let email = firm.billing_email
    if (!email) {
      email = await resolveProfileEmail(firm.owner_id)
    }
    rows.push({
      id: firm.id,
      source: "law_firms",
      name: firm.name || "Law firm",
      email,
      trial_ends_at: firm.trial_ends_at,
      preferred_language: "en",
    })
  }

  return rows
}

async function loadExpiryCandidates(): Promise<TrialRow[]> {
  const nowIso = new Date().toISOString()

  const [profilesRes, firmsRes] = await Promise.all([
    supabaseAdmin
      .from("user_profiles")
      .select("id, full_name, trial_ends_at")
      .eq("subscription_status", "trial")
      .is("deleted_at", null)
      .lt("trial_ends_at", nowIso),
    supabaseAdmin
      .from("law_firms")
      .select("id, name, trial_ends_at, billing_email, owner_id")
      .eq("subscription_status", "trial")
      .is("deleted_at", null)
      .lt("trial_ends_at", nowIso),
  ])

  if (profilesRes.error) throw profilesRes.error
  if (firmsRes.error) throw firmsRes.error

  const rows: TrialRow[] = []

  for (const p of profilesRes.data ?? []) {
    const trialEndsAt = (p as { trial_ends_at: string | null }).trial_ends_at
    if (!trialEndsAt) continue
    const email = await resolveProfileEmail(p.id)
    rows.push({
      id: p.id,
      source: "user_profiles",
      name: ((p as { full_name: string }).full_name as string) || "Legantis user",
      email,
      trial_ends_at: trialEndsAt,
    })
  }

  for (const f of firmsRes.data ?? []) {
    const firm = f as {
      id: string
      name: string
      trial_ends_at: string | null
      billing_email: string | null
      owner_id: string
    }
    if (!firm.trial_ends_at) continue
    let email = firm.billing_email
    if (!email) {
      email = await resolveProfileEmail(firm.owner_id)
    }
    rows.push({
      id: firm.id,
      source: "law_firms",
      name: firm.name || "Law firm",
      email,
      trial_ends_at: firm.trial_ends_at,
    })
  }

  return rows
}

export async function runTrialLifecycle(
  options: Options = {}
): Promise<TrialLifecycleRunResult> {
  const dryRun = options.dryRun === true
  const errors: TrialLifecycleRunResult["errors"] = []
  const actions: TrialLifecycleAction[] = []
  let warned = 0
  let downgraded = 0
  let trialInventory: TrialInventoryRow[] = []

  try {
    trialInventory = await loadTrialInventory()
    if (dryRun) {
      console.log(
        `[dry-run] Trial inventory: ${trialInventory.length} row(s) with subscription_status=trial`
      )
      for (const row of trialInventory) {
        console.log(
          `[dry-run] inventory ${row.predictedAction.padEnd(9)} ${row.email ?? "(no email)"} (${row.name}) [${row.source}] ends ${row.trialEndsAt ?? "null"}`
        )
      }
    }
  } catch (e) {
    errors.push({
      source: "inventory",
      id: "*",
      message: e instanceof Error ? e.message : String(e),
    })
  }

  // A. Pre-expiry warnings (send once)
  try {
    const warnRows = await loadWarningCandidates()
    for (const row of warnRows) {
      const action: TrialLifecycleAction = {
        action: "warn",
        source: row.source,
        id: row.id,
        name: row.name,
        email: row.email,
        trialEndsAt: row.trial_ends_at,
      }
      actions.push(action)

      if (dryRun) {
        console.log(
          `[dry-run] Would send trial warning to ${row.email ?? "(no email)"} (${row.name}) [${row.source}:${row.id}] ends ${row.trial_ends_at}`
        )
        warned += 1
        continue
      }

      try {
        if (!row.email) throw new Error("No email address")

        const email = buildTrialWarningEmail({
          language: row.preferred_language,
          userName: row.name,
          trialEndsAt: row.trial_ends_at,
          daysRemaining: daysUntil(row.trial_ends_at),
        })

        const resend = getResend()
        await resend.emails.send({
          from: "Legantis <noreply@legantis.app>",
          to: [row.email],
          subject: email.subject,
          html: email.html,
          text: email.text,
        })

        const { error: updateErr } = await supabaseAdmin
          .from(row.source)
          .update({ trial_warning_sent_at: new Date().toISOString() })
          .eq("id", row.id)
          .eq("subscription_status", "trial")
          .is("trial_warning_sent_at", null)

        if (updateErr) throw updateErr
        warned += 1
      } catch (e) {
        errors.push({
          source: row.source,
          id: row.id,
          message: e instanceof Error ? e.message : String(e),
        })
      }
    }
  } catch (e) {
    errors.push({
      source: "warn",
      id: "*",
      message: e instanceof Error ? e.message : String(e),
    })
  }

  // B. Expiry downgrade (no email)
  try {
    const expireRows = await loadExpiryCandidates()
    for (const row of expireRows) {
      const action: TrialLifecycleAction = {
        action: "downgrade",
        source: row.source,
        id: row.id,
        name: row.name,
        email: row.email,
        trialEndsAt: row.trial_ends_at,
      }
      actions.push(action)

      if (dryRun) {
        console.log(
          `[dry-run] Would downgrade ${row.email ?? "(no email)"} (${row.name}) [${row.source}:${row.id}] ended ${row.trial_ends_at}`
        )
        downgraded += 1
        continue
      }

      try {
        const { error: updateErr } = await supabaseAdmin
          .from(row.source)
          .update({
            subscription_tier: null,
            subscription_status: "expired",
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id)
          .eq("subscription_status", "trial")

        if (updateErr) throw updateErr

        console.log(
          `[trial-lifecycle] Downgraded ${row.email ?? "(no email)"} (${row.name}) [${row.source}:${row.id}]`
        )
        downgraded += 1
      } catch (e) {
        errors.push({
          source: row.source,
          id: row.id,
          message: e instanceof Error ? e.message : String(e),
        })
      }
    }
  } catch (e) {
    errors.push({
      source: "expire",
      id: "*",
      message: e instanceof Error ? e.message : String(e),
    })
  }

  return { warned, downgraded, errors, actions, trialInventory }
}
