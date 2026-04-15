import { NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"

type BankingBody = {
  id?: string | null
  bankName?: string | null
  iban?: string | null
  accountHolderName?: string | null
  swiftBic?: string | null
  setDefault?: boolean | null
}

function isBankingBody(value: unknown): value is BankingBody {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return (
    "bankName" in v ||
    "iban" in v ||
    "accountHolderName" in v ||
    "swiftBic" in v ||
    "setDefault" in v ||
    "id" in v
  )
}

async function getScope(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("law_firm_id")
    .eq("id", userId)
    .is("deleted_at", null)
    .maybeSingle()

  if (error) throw error

  const lawFirmId =
    data && typeof data === "object" && "law_firm_id" in data
      ? ((data as { law_firm_id: string | null }).law_firm_id ?? null)
      : null

  return { lawFirmId }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { lawFirmId } = await getScope(supabase, user.id)

    // Firm default first, then user default.
    const query = supabase
      .from("bank_accounts")
      .select("id, bank_name, iban, account_holder_name, swift_bic, is_default, law_firm_id")
      .eq("is_default", true)

    const { data, error } = lawFirmId
      ? await query.eq("law_firm_id", lawFirmId).maybeSingle()
      : await query.is("law_firm_id", null).eq("user_id", user.id).maybeSingle()

    if (error) {
      return Response.json({ error: "Failed to load banking settings" }, { status: 500 })
    }

    if (!data) return Response.json({ bankAccount: null })

    return Response.json({
      bankAccount: {
        id: data.id,
        bankName: data.bank_name,
        iban: data.iban,
        accountHolderName: data.account_holder_name,
        swiftBic: data.swift_bic ?? null,
        isDefault: data.is_default ?? false,
        lawFirmId: data.law_firm_id ?? null,
      },
    })
  } catch (error) {
    console.error("Settings banking GET error:", error)
    return Response.json({ error: "Unexpected error while loading banking settings" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    let body: BankingBody
    try {
      const parsed: unknown = await req.json()
      if (!isBankingBody(parsed)) {
        return Response.json({ error: "Invalid request body" }, { status: 400 })
      }
      body = parsed
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const { lawFirmId } = await getScope(supabase, user.id)
    const scopeLawFirmId = lawFirmId ?? null

    const bankName = typeof body.bankName === "string" ? body.bankName.trim() : ""
    const iban = typeof body.iban === "string" ? body.iban.trim() : ""
    const accountHolderName =
      typeof body.accountHolderName === "string" ? body.accountHolderName.trim() : ""
    const swiftBic =
      typeof body.swiftBic === "string" && body.swiftBic.trim() ? body.swiftBic.trim() : null
    const setDefault = body.setDefault === true

    if (!bankName || !iban || !accountHolderName) {
      return Response.json(
        { error: "bankName, iban, and accountHolderName are required" },
        { status: 400 }
      )
    }

    const id = typeof body.id === "string" && body.id ? body.id : null

    if (setDefault) {
      // Unset any existing defaults in scope (best-effort).
      const unsetQuery = supabase
        .from("bank_accounts")
        .update({ is_default: false } as never)
        .eq("is_default", true)

      if (scopeLawFirmId) {
        await unsetQuery.eq("law_firm_id", scopeLawFirmId)
      } else {
        await unsetQuery.is("law_firm_id", null).eq("user_id", user.id)
      }
    }

    if (id) {
      const { error } = await supabase
        .from("bank_accounts")
        .update(
          {
            bank_name: bankName,
            iban,
            account_holder_name: accountHolderName,
            swift_bic: swiftBic,
            is_default: setDefault,
          } as never
        )
        .eq("id", id)

      if (error) {
        console.error("Settings banking POST update:", error)
        return Response.json({ error: "Failed to save banking settings" }, { status: 500 })
      }
    } else {
      const { error } = await supabase.from("bank_accounts").insert(
        {
          user_id: user.id,
          law_firm_id: scopeLawFirmId,
          bank_name: bankName,
          iban,
          account_holder_name: accountHolderName,
          swift_bic: swiftBic,
          is_default: setDefault,
        } as never
      )

      if (error) {
        console.error("Settings banking POST insert:", error)
        return Response.json({ error: "Failed to save banking settings" }, { status: 500 })
      }
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Settings banking POST error:", error)
    return Response.json({ error: "Unexpected error while saving banking settings" }, { status: 500 })
  }
}

