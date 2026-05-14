/**
 * Grant Firm-tier plan entitlements in Supabase for demos / prospective buyers.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL)
 * in .env.local — same as server admin client.
 *
 * Usage:
 *   npx tsx scripts/grant-firm-evaluation.ts --user-id=<uuid>
 *   npx tsx scripts/grant-firm-evaluation.ts --email=someone@example.com
 *
 * Options:
 *   --dry-run              Print actions only
 *   --extend-trial-days=N  Set subscription_status=trial and trial_ends_at to N days from now
 */

import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

import type { Database } from "../database.types"

dotenv.config({ path: ".env.local" })

type Args = {
  userId: string | null
  email: string | null
  dryRun: boolean
  extendTrialDays: number | null
}

function parseArgs(argv: string[]): Args {
  let userId: string | null = null
  let email: string | null = null
  let dryRun = false
  let extendTrialDays: number | null = null

  for (const raw of argv) {
    if (raw === "--dry-run") {
      dryRun = true
      continue
    }
    if (raw.startsWith("--user-id=")) {
      userId = raw.slice("--user-id=".length).trim() || null
      continue
    }
    if (raw.startsWith("--email=")) {
      email = raw.slice("--email=".length).trim() || null
      continue
    }
    if (raw.startsWith("--extend-trial-days=")) {
      const n = Number(raw.slice("--extend-trial-days=".length).trim())
      extendTrialDays = Number.isFinite(n) && n > 0 ? Math.floor(n) : null
      continue
    }
  }

  return { userId, email, dryRun, extendTrialDays }
}

async function resolveUserId(
  admin: ReturnType<typeof createClient<Database>>,
  args: Args
): Promise<string> {
  if (args.userId) return args.userId
  if (!args.email) {
    throw new Error("Provide --user-id=<uuid> or --email=user@example.com")
  }

  const target = args.email.toLowerCase()
  let page = 1
  const perPage = 200

  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage })
    if (error) throw error
    const hit = data.users.find((u) => (u.email ?? "").toLowerCase() === target)
    if (hit) return hit.id
    if (data.users.length < perPage) {
      throw new Error(`No auth user found with email: ${args.email}`)
    }
    page += 1
  }
}

function trialIso(days: number): string {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString()
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ""
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""

  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY in .env.local"
    )
    process.exit(1)
  }

  const admin = createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })

  const userId = await resolveUserId(admin, args)

  const { data: profile, error: profileError } = await admin
    .from("user_profiles")
    .select("id, law_firm_id, subscription_tier, subscription_status")
    .eq("id", userId)
    .is("deleted_at", null)
    .maybeSingle()

  if (profileError) throw profileError
  if (!profile) {
    console.error(
      `No user_profiles row for id ${userId}. Create the profile (e.g. complete signup) first.`
    )
    process.exit(1)
  }

  const lawFirmId = profile.law_firm_id ?? null
  const trialPatch =
    args.extendTrialDays != null
      ? {
          subscription_status: "trial" as const,
          trial_ends_at: trialIso(args.extendTrialDays),
        }
      : {}

  console.log("Target user:", userId)
  console.log("Current profile tier:", profile.subscription_tier)
  console.log("law_firm_id:", lawFirmId)

  if (lawFirmId) {
    console.warn(
      "User belongs to a law firm. Updating law_firms.subscription_tier affects every member of that firm."
    )
    const { data: firm, error: firmErr } = await admin
      .from("law_firms")
      .select("id, name, subscription_tier")
      .eq("id", lawFirmId)
      .is("deleted_at", null)
      .maybeSingle()

    if (firmErr) throw firmErr
    if (!firm) {
      console.error("law_firms row not found for law_firm_id", lawFirmId)
      process.exit(1)
    }

    const firmUpdate = {
      subscription_tier: "firm" as const,
      ...trialPatch,
    }

    if (args.dryRun) {
      console.log("[dry-run] Would update law_firms:", firm.id, firmUpdate)
    } else {
      const { error: upErr } = await admin
        .from("law_firms")
        .update(firmUpdate)
        .eq("id", lawFirmId)
      if (upErr) throw upErr
      console.log("Updated law_firms", firm.id, "→ subscription_tier: firm")
    }
  } else {
    const profileUpdate = {
      subscription_tier: "firm" as const,
      ...trialPatch,
    }

    if (args.dryRun) {
      console.log("[dry-run] Would update user_profiles:", userId, profileUpdate)
    } else {
      const { error: upErr } = await admin
        .from("user_profiles")
        .update(profileUpdate)
        .eq("id", userId)
      if (upErr) throw upErr
      console.log("Updated user_profiles → subscription_tier: firm")
    }
  }

  if (args.extendTrialDays != null) {
    console.log(
      `Trial extended ${args.extendTrialDays} days (subscription_status=trial, trial_ends_at set).`
    )
  }

  console.log("Done. User should refresh the app; plan resolves via getSubscriptionContextForUser.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
