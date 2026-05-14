import { HomeClient } from "@/components/HomeClient";
import { createClient } from "@/lib/supabase/server";

type HomePageProps = {
  searchParams?: Promise<{
    signup?: string
  }>
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams
  const signupStatus = params?.signup

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const initialSignedIn = Boolean(session?.user)

  return (
    <HomeClient signupStatus={signupStatus} initialSignedIn={initialSignedIn} />
  );
}
