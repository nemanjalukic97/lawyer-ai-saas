'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { getSiteUrl } from "@/lib/site-url"

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const siteUrl = await getSiteUrl()
  const emailRedirectTo = `${siteUrl}/auth/confirm`

  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")
  const fullName = String(formData.get("full_name") ?? "")
  const lawFirmName = String(formData.get("law_firm_name") ?? "")
  const jurisdiction = String(formData.get("jurisdiction") ?? "serbia")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    redirect("/signup?error=invalid_email")
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: {
        full_name: fullName,
        law_firm_name: lawFirmName,
        preferred_jurisdiction: jurisdiction,
      },
    },
  })

  if (error) {
    const msg = error.message.toLowerCase()
    if (msg.includes("already registered") || msg.includes("rate limit")) {
      redirect("/signup?error=email_taken")
    }
    if (
      msg.includes("password should be at least") ||
      msg.includes("weak password")
    ) {
      redirect("/signup?error=weak_password")
    }
    redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  if (!error) {
    try {
      if (data?.user?.id && lawFirmName.trim()) {
        const { data: firm, error: firmError } = await supabase
          .from("law_firms")
          .insert({ name: lawFirmName.trim(), owner_id: data.user.id })
          .select("id")
          .single()

        if (!firmError && firm?.id) {
          await supabase
            .from("user_profiles")
            .update({ law_firm_id: firm.id })
            .eq("id", data.user.id)
        }
      }

      if (data?.user?.id) {
        await supabase
          .from("user_profiles")
          .update({ preferred_jurisdiction: jurisdiction as any })
          .eq("id", data.user.id)
      }
    } catch (_) {
      // silently ignore - don't block success redirect
    }

    revalidatePath("/", "layout")
    redirect("/signup?success=true")
  }
}

