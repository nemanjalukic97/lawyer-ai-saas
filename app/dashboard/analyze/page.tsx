import DocumentAnalysisPage from "./DocumentAnalysisPage"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  const selectedId = params?.id ?? null
  return <DocumentAnalysisPage selectedId={selectedId ?? null} />
}

