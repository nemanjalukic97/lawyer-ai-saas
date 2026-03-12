import ContractsWizardPage from "./ContractsWizardPage"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  const selectedId = params?.id ?? null
  return <ContractsWizardPage selectedId={selectedId ?? null} />
}

