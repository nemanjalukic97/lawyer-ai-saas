import IntakePublicClient from "./IntakePublicClient"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <IntakePublicClient slug={slug} />
}
