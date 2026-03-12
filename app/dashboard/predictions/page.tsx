import PredictionsPageClient from "./PredictionsPageClient"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  const selectedId = params?.id ?? null
  return <PredictionsPageClient selectedId={selectedId ?? null} />
}
