import GeneratePageClient from "./GeneratePageClient"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  return <GeneratePageClient selectedId={params?.id ?? null} />
}
