import GeneratePageClient from "./GeneratePageClient"

type SearchParams = {
  id?: string
  templateId?: string
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  return (
    <GeneratePageClient
      selectedId={params?.id ?? null}
      templateId={params?.templateId ?? null}
    />
  )
}

