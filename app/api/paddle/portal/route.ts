import { createClient } from "@/lib/supabase/server"
import { paddle } from "@/lib/paddle"

export async function POST() {
  try {
    if (!paddle) {
      return Response.json(
        { error: "Paddle is not configured on the server." },
        { status: 500 }
      )
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("law_firm_id, stripe_customer_id, stripe_subscription_id")
      .eq("id", user.id)
      .is("deleted_at", null)
      .maybeSingle()

    if (profileError) {
      return Response.json({ error: "Failed to load profile" }, { status: 500 })
    }

    const lawFirmId =
      profile && typeof profile === "object" && "law_firm_id" in profile
        ? (profile as { law_firm_id: string | null }).law_firm_id
        : null

    let customerId: string | null = null
    let subscriptionId: string | null = null

    if (lawFirmId) {
      const { data: firm, error: firmError } = await supabase
        .from("law_firms")
        .select("stripe_customer_id, stripe_subscription_id")
        .eq("id", lawFirmId)
        .maybeSingle()

      if (firmError) {
        return Response.json({ error: "Failed to load firm" }, { status: 500 })
      }

      const f = firm as {
        stripe_customer_id: string | null
        stripe_subscription_id: string | null
      } | null
      customerId = f?.stripe_customer_id ?? null
      subscriptionId = f?.stripe_subscription_id ?? null
    } else {
      const p = profile as {
        stripe_customer_id: string | null
        stripe_subscription_id: string | null
      } | null
      customerId = p?.stripe_customer_id ?? null
      subscriptionId = p?.stripe_subscription_id ?? null
    }

    if (!customerId) {
      return Response.json(
        {
          error:
            "No billing customer on file yet. Subscribe once from this page so we can link your Paddle customer.",
        },
        { status: 400 }
      )
    }

    const subscriptionIds = subscriptionId ? [subscriptionId] : []

    const session = await paddle.customerPortalSessions.create(
      customerId,
      subscriptionIds
    )

    const url = session.urls.general.overview
    if (!url) {
      return Response.json({ error: "Paddle did not return a portal URL" }, { status: 502 })
    }

    return Response.json({ url }, { status: 200 })
  } catch (error) {
    console.error("Paddle portal route error:", error)
    const message =
      error instanceof Error ? error.message : "Failed to create portal session"
    return Response.json({ error: message }, { status: 500 })
  }
}
