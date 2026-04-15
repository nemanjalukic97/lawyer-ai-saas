import SignPageClient from "./SignPageClient"

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  return <SignPageClient token={token} />
}

