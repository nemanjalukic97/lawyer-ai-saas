import ClientsPageClient from "./ClientsPageClient"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  const selectedId = params?.id ?? null
  return <ClientsPageClient selectedId={selectedId ?? null} />
}

