import dynamic from "next/dynamic"

import { HomeClient } from "@/components/HomeClient"
import { createClient } from "@/lib/supabase/server"

const HomePositioningSection = dynamic(
  () => import("@/components/home/PositioningSection").then((m) => ({ default: m.HomePositioningSection })),
  { ssr: true }
)

const HomeHowItWorksSection = dynamic(
  () => import("@/components/home/HowItWorksSection").then((m) => ({ default: m.HomeHowItWorksSection })),
  { ssr: true }
)

const HomeFeaturesSection = dynamic(
  () => import("@/components/home/FeaturesSection").then((m) => ({ default: m.HomeFeaturesSection })),
  { ssr: true }
)

const HomePricingSection = dynamic(
  () => import("@/components/home/PricingSection").then((m) => ({ default: m.HomePricingSection })),
  { ssr: true }
)

const HomeFaqSection = dynamic(
  () => import("@/components/home/FaqSection").then((m) => ({ default: m.HomeFaqSection })),
  { ssr: true }
)

type HomePageProps = {
  searchParams?: Promise<{
    signup?: string
  }>
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams
  const signupStatus = params?.signup

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const initialSignedIn = Boolean(session?.user)

  return (
    <HomeClient signupStatus={signupStatus} initialSignedIn={initialSignedIn}>
      <HomePositioningSection />
      <HomeHowItWorksSection />
      <HomeFeaturesSection />
      <HomePricingSection />
      <HomeFaqSection />
    </HomeClient>
  )
}
