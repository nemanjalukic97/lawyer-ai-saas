'use server'

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { getSiteUrl } from "@/lib/site-url"
import {
  parseSignupAttribution,
  SIGNUP_ATTRIBUTION_COOKIE,
} from "@/lib/signupAttribution"

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
        const trialEndsAt = new Date()
        trialEndsAt.setUTCDate(trialEndsAt.getUTCDate() + 30)

        const { data: firm, error: firmError } = await supabase
          .from("law_firms")
          .insert({
            name: lawFirmName.trim(),
            owner_id: data.user.id,
            // Brand-new firm from solo signup: Firm trial (not invite-to-existing-firm).
            subscription_tier: "firm",
            subscription_status: "trial",
            trial_ends_at: trialEndsAt.toISOString(),
          })
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
        const attribution = parseSignupAttribution(
          (await cookies()).get(SIGNUP_ATTRIBUTION_COOKIE)?.value,
        )
        await supabase
          .from("user_profiles")
          .update({
            preferred_jurisdiction: jurisdiction as any,
            ...(attribution
              ? {
                  signup_utm_source: attribution.utm_source,
                  signup_utm_medium: attribution.utm_medium,
                  signup_utm_campaign: attribution.utm_campaign,
                  signup_utm_content: attribution.utm_content,
                  signup_utm_term: attribution.utm_term,
                  signup_referrer_host: attribution.referrer_host,
                  signup_landing_path: attribution.landing_path,
                }
              : {}),
          })
          .eq("id", data.user.id)
      }
    } catch (_) {
      // silently ignore - don't block success redirect
    }

    revalidatePath("/", "layout")
    redirect(`/signup?success=true&email=${encodeURIComponent(email)}`)
  }
}

