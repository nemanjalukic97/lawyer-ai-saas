"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/LanguageProvider"
import { createClient } from "@/lib/supabase/client"

import {
  OPTIONAL_INTAKE_KEYS,
  parseFieldsJson,
  type OptionalIntakeKey,
} from "@/app/dashboard/intake/lib/extraFields"
import type { Tables } from "@/lib/supabase/types"

const JURISDICTION_KEYS = [
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
  "serbia",
  "croatia",
  "montenegro",
  "slovenia",
] as const

const CONTRACT_TYPE_OPTIONS = [
  { value: "employment", label: "Employment Contract" },
  { value: "service",    label: "Service Agreement" },
  { value: "sales",      label: "Sales Contract" },
  { value: "lease",      label: "Lease/Rental Agreement" },
  { value: "nda",        label: "NDA / Non-Disclosure Agreement" },
  { value: "partnership",label: "Partnership Agreement" },
]

type Props = {
  slug: string
}

export default function IntakePublicClient({ slug }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()

  const [form, setForm] = useState<Tables<"intake_forms"> | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [jurisdiction, setJurisdiction] = useState<string>("")
  const [contractType, setContractType] = useState<string>("")
  const [matterDescription, setMatterDescription] = useState("")
  const [company, setCompany] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")

  const optionalKeys = useMemo(() => {
    if (!form) return new Set<OptionalIntakeKey>()
    const parsed = parseFieldsJson(form.fields)
    return new Set(parsed)
  }, [form])

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setNotFound(false)
      try {
        const { data, error: rpcErr } = await supabase.rpc(
          "get_public_intake_form",
          { p_slug: slug }
        )
        if (rpcErr) throw rpcErr
        const row = Array.isArray(data) ? data[0] : null
        if (!mounted) return
        if (!row) {
          setNotFound(true)
          return
        }
        setForm(row as Tables<"intake_forms">)
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error(e)
        }
        if (mounted) setNotFound(true)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    void load()
    return () => {
      mounted = false
    }
  }, [slug, supabase])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    setError(null)

    if (!fullName.trim() || !email.trim()) {
      setError(t("intake.public.errors.nameEmail"))
      return
    }
    if (!jurisdiction) {
      setError(t("intake.public.errors.caseAndJurisdiction"))
      return
    }
    if (!contractType) {
      setError(t("intake.public.errors.contractTypeNeeded"))
      return
    }

    setSubmitting(true)
    try {
      const data: Record<string, string> = {
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        jurisdiction,
        contract_type: contractType,
        matter_description: matterDescription.trim(),
      }
      if (optionalKeys.has("company")) {
        data.company = company.trim()
      }
      if (optionalKeys.has("address")) {
        data.address = address.trim()
      }
      if (optionalKeys.has("notes")) {
        data.notes = notes.trim()
      }

      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_id: form.id,
          user_id: form.user_id,
          data,
        }),
      })

      const submitJson = (await res.json()) as { success?: boolean; error?: string }
      if (!res.ok || submitJson.error) {
        throw new Error(submitJson.error ?? "Submit failed")
      }
      if (!submitJson.success) {
        throw new Error("Submit failed")
      }
      setDone(true)
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(
          "Submit error:",
          JSON.stringify(err, null, 2),
          (err as { message?: string })?.message,
          (err as { code?: string })?.code,
          (err as { details?: string })?.details,
          (err as { hint?: string })?.hint
        )
      }
      setError(t("intake.public.errors.submitFailed"))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (notFound || !form) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">{t("intake.public.notFoundTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("intake.public.notFoundBody")}
        </p>
      </div>
    )
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">{t("intake.public.thankYouTitle")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("intake.public.thankYouBody")}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{form.title}</h1>
          {form.description && (
            <p className="mt-2 text-sm text-muted-foreground">{form.description}</p>
          )}
        </div>

        <Card className="p-6">
          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="full_name">{t("intake.public.fullName")}</Label>
              <Input
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("intake.public.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("intake.public.phone")}</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>

            <div className="space-y-2">
              <Label>{t("intake.public.jurisdiction")}</Label>
              <Select value={jurisdiction} onValueChange={setJurisdiction} required>
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue placeholder={t("intake.public.selectPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {JURISDICTION_KEYS.map((k) => (
                    <SelectItem key={k} value={k}>
                      {t(`intake.public.jurisdictions.${k}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("intake.public.contractTypeNeeded")}</Label>
              <Select value={contractType} onValueChange={setContractType} required>
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue placeholder={t("intake.public.selectPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {CONTRACT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="matter">{t("intake.public.matterDescription")}</Label>
              <Textarea
                id="matter"
                value={matterDescription}
                onChange={(e) => setMatterDescription(e.target.value)}
                rows={4}
              />
            </div>

            {optionalKeys.has("company") && (
              <div className="space-y-2">
                <Label htmlFor="company">{t("intake.public.company")}</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            )}

            {optionalKeys.has("address") && (
              <div className="space-y-2">
                <Label htmlFor="address">{t("intake.public.address")}</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                />
              </div>
            )}

            {optionalKeys.has("notes") && (
              <div className="space-y-2">
                <Label htmlFor="notes">{t("intake.public.notes")}</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            )}

            <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("intake.public.submitting")}
                </>
              ) : (
                t("intake.public.submit")
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
