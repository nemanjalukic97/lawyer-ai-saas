import { HomeClient } from "@/components/HomeClient";

type HomePageProps = {
  searchParams?: Promise<{
    signup?: string
  }>
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams
  const signupStatus = params?.signup

  return (
    <HomeClient signupStatus={signupStatus} />
  );
}
