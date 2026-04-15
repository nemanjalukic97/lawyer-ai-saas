import { supabaseAdmin } from "@/lib/supabase/admin"

export const SIGNED_CONTRACTS_BUCKET = "signed-contracts"

export type SignedContractUpload = {
  path: string
  contentType?: string
  upsert?: boolean
}

export async function uploadSignedContractPdf(
  pdf: Buffer,
  opts: SignedContractUpload
): Promise<{ path: string }> {
  const { path, contentType = "application/pdf", upsert = false } = opts

  const { error } = await supabaseAdmin.storage
    .from(SIGNED_CONTRACTS_BUCKET)
    .upload(path, pdf, {
      contentType,
      upsert,
    })

  if (error) {
    throw new Error(`Failed to upload signed PDF: ${error.message}`)
  }

  return { path }
}

export async function createSignedContractDownloadUrl(
  path: string,
  expiresInSeconds: number
): Promise<string> {
  const { data, error } = await supabaseAdmin.storage
    .from(SIGNED_CONTRACTS_BUCKET)
    .createSignedUrl(path, expiresInSeconds)

  if (error || !data?.signedUrl) {
    throw new Error(`Failed to create signed URL: ${error?.message ?? "Unknown error"}`)
  }

  return data.signedUrl
}

