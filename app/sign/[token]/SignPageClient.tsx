"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/LanguageProvider"
import { createClient } from "@/lib/supabase/client"

type Props = {
  token: string
}

type SigningBundle = {
  signature_request_id: string
  contract_id: string
  contract_title: string
  contract_content: string | null
  sent_by_name: string | null
  signer_email: string | null
  signer_name: string | null
  status: "pending" | "signed" | "expired" | "cancelled"
  expires_at: string
  signed_pdf_path: string | null
  signed_at: string | null
}

export default function SignPageClient({ token }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()

  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [bundle, setBundle] = useState<SigningBundle | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [agree, setAgree] = useState(false)
  const [typedName, setTypedName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [successUrl, setSuccessUrl] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setNotFound(false)
      setError(null)
      try {
        const { data, error: rpcErr } = await supabase.rpc(
          "get_signature_request_for_signing",
          { p_token: token }
        )
        if (rpcErr) throw rpcErr
        const row = Array.isArray(data) ? data[0] : data
        if (!mounted) return
        if (!row) {
          setNotFound(true)
          return
        }
        setBundle(row as SigningBundle)
        const suggestedName = (row as any).signer_name as string | null
        if (suggestedName) setTypedName(suggestedName)
      } catch (e: any) {
        if (mounted) setNotFound(true)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    void load()
    return () => {
      mounted = false
    }
  }, [supabase, token])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!bundle) return
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch(`/api/sign/${token}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agree, typedName }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError((json as any)?.error ?? "Failed to sign document")
        return
      }
      setSuccessUrl((json as any)?.downloadUrl ?? null)
    } catch {
      setError("Failed to sign document")
    } finally {
      setSubmitting(false)
    }
  }

  const expiresAt = bundle?.expires_at ? new Date(bundle.expires_at) : null
  const isExpired = !!expiresAt && !Number.isNaN(expiresAt.getTime()) && expiresAt <= new Date()

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{t("signature.public.loading")}</span>
        </div>
      </div>
    )
  }

  if (notFound || !bundle) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card className="p-6">
          <div className="text-lg font-semibold">{t("signature.public.notFoundTitle")}</div>
          <div className="mt-2 text-sm text-muted-foreground">{t("signature.public.notFoundBody")}</div>
        </Card>
      </div>
    )
  }

  if (bundle.status === "signed") {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card className="p-6">
          <div className="text-lg font-semibold">{t("signature.public.alreadySignedTitle")}</div>
          <div className="mt-2 text-sm text-muted-foreground">{t("signature.public.alreadySignedBody")}</div>
        </Card>
      </div>
    )
  }

  if (bundle.status === "cancelled") {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card className="p-6">
          <div className="text-lg font-semibold">{t("signature.public.cancelledTitle")}</div>
          <div className="mt-2 text-sm text-muted-foreground">{t("signature.public.cancelledBody")}</div>
        </Card>
      </div>
    )
  }

  if (bundle.status === "expired" || isExpired) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card className="p-6">
          <div className="text-lg font-semibold">{t("signature.public.expiredTitle")}</div>
          <div className="mt-2 text-sm text-muted-foreground">{t("signature.public.expiredBody")}</div>
        </Card>
      </div>
    )
  }

  if (successUrl) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card className="p-6">
          <div className="text-lg font-semibold">{t("signature.public.successTitle")}</div>
          <div className="mt-2 text-sm text-muted-foreground">{t("signature.public.successBody")}</div>
          <div className="mt-4">
            <a
              className="underline"
              href={successUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t("signature.actions.downloadSignedPdf")}
            </a>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card className="p-6">
        <div className="text-2xl font-semibold">{bundle.contract_title}</div>
        <div className="mt-2 text-sm text-muted-foreground">
          {t("signature.public.sentBy")}{" "}
          <span className="font-medium text-foreground">
            {bundle.sent_by_name || t("signature.public.unknownSender")}
          </span>
          {expiresAt ? (
            <>
              {" "}
              · {t("signature.public.expiresOn")}{" "}
              <span className="font-medium text-foreground">
                {expiresAt.toLocaleDateString()}
              </span>
            </>
          ) : null}
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium">{t("signature.public.reviewTitle")}</div>
          <pre className="mt-2 max-h-[50vh] overflow-auto whitespace-pre-wrap rounded-md border bg-muted/30 p-4 text-sm leading-6">
            {bundle.contract_content || ""}
          </pre>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>{t("signature.public.checkboxAgree")}</span>
          </label>

          <div className="space-y-2">
            <Label htmlFor="typedName">{t("signature.public.typedNameLabel")}</Label>
            <Input
              id="typedName"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder={t("signature.public.typedNamePlaceholder")}
            />
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("signature.public.signing")}
              </span>
            ) : (
              t("signature.actions.signDocument")
            )}
          </Button>
        </form>
      </Card>
    </div>
  )
}

