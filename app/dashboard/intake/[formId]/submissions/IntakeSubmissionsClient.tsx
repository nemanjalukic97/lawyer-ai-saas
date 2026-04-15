"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/LanguageProvider"
import { createClient } from "@/lib/supabase/client"
import { hasFeature, type EntitlementPlanId } from "../../../lib/entitlements"

import type { Json } from "@/lib/supabase/types"

type Props = {
  planId: EntitlementPlanId
  formId: string
}

type SubmissionRow = {
  id: string
  data: Json
  status: string
  submitted_at: string | null
  client_id: string | null
}

function readString(obj: Record<string, unknown>, key: string): string {
  const v = obj[key]
  return typeof v === "string" ? v : ""
}

export default function IntakeSubmissionsClient({ planId, formId }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()
  const canUse = hasFeature(planId, "intake_forms")

  const [formTitle, setFormTitle] = useState<string | null>(null)
  const [rows, setRows] = useState<SubmissionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionId, setActionId] = useState<string | null>(null)
  const [convertFeedback, setConvertFeedback] = useState<{
    tone: "success" | "info"
    message: string
  } | null>(null)

  const load = useCallback(async () => {
    if (!canUse) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError(t("intake.errors.mustBeLoggedIn"))
        return
      }

      const { data: form, error: fErr } = await supabase
        .from("intake_forms")
        .select("title")
        .eq("id", formId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (fErr) throw fErr
      if (!form) {
        setError(t("intake.errors.formNotFound"))
        return
      }
      setFormTitle(form.title ?? null)

      const { data: subs, error: sErr } = await supabase
        .from("intake_submissions")
        .select("id, data, status, submitted_at, client_id")
        .eq("form_id", formId)
        .eq("user_id", user.id)
        .order("submitted_at", { ascending: false })

      if (sErr) throw sErr

      setRows((subs ?? []) as SubmissionRow[])
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("intake.errors.loadFailed"))
    } finally {
      setLoading(false)
    }
  }, [canUse, formId, supabase, t])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    if (!convertFeedback) return
    const timer = window.setTimeout(() => setConvertFeedback(null), 6000)
    return () => window.clearTimeout(timer)
  }, [convertFeedback])

  async function convertToClient(sub: SubmissionRow) {
    setActionId(sub.id)
    setError(null)
    setConvertFeedback(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError(t("intake.errors.mustBeLoggedIn"))
        return
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("law_firm_id")
        .eq("id", user.id)
        .maybeSingle()

      const lawFirmId = profile?.law_firm_id ?? null

      const raw = sub.data
      const obj =
        raw && typeof raw === "object" && !Array.isArray(raw)
          ? (raw as Record<string, unknown>)
          : {}

      const name = readString(obj, "full_name").trim()
      const email = readString(obj, "email").trim()
      if (!name || !email) {
        setError(t("intake.submissions.errors.missingNameEmail"))
        return
      }

      const phoneRaw = readString(obj, "phone").trim()
      const company = readString(obj, "company").trim()
      const address = readString(obj, "address").trim()
      const extraNotes = readString(obj, "notes").trim()
      const matter = readString(obj, "matter_description").trim()
      const caseType = readString(obj, "case_type")
      const jurisdiction = readString(obj, "jurisdiction")

      const noteLines: string[] = []
      if (matter) noteLines.push(`${t("intake.public.matterDescription")}: ${matter}`)
      if (caseType)
        noteLines.push(`${t("intake.public.caseType")}: ${caseType}`)
      if (jurisdiction)
        noteLines.push(`${t("intake.public.jurisdiction")}: ${jurisdiction}`)
      if (extraNotes) noteLines.push(extraNotes)

      const scopeOr = lawFirmId
        ? `user_id.eq.${user.id},law_firm_id.eq.${lawFirmId}`
        : `user_id.eq.${user.id}`

      const { data: existingRows, error: findErr } = await supabase
        .from("clients")
        .select("id")
        .eq("email", email)
        .is("deleted_at", null)
        .or(scopeOr)
        .limit(1)

      if (findErr) throw findErr

      const existing = existingRows?.[0] ?? null

      let clientId: string

      if (existing) {
        clientId = existing.id
        setConvertFeedback({
          tone: "info",
          message: t("intake.submissions.messages.linkedExisting"),
        })
      } else {
        const { data: clientRow, error: cErr } = await supabase
          .from("clients")
          .insert({
            user_id: user.id,
            law_firm_id: lawFirmId,
            name,
            email,
            phone: phoneRaw || null,
            company_name: company || null,
            address: address || null,
            notes: noteLines.length ? noteLines.join("\n\n") : null,
          })
          .select("id")
          .single()

        if (cErr) throw cErr
        if (!clientRow) {
          setError(t("intake.submissions.errors.convertFailed"))
          return
        }
        clientId = clientRow.id
        setConvertFeedback({
          tone: "success",
          message: t("intake.submissions.messages.created"),
        })
      }

      const { error: uErr } = await supabase
        .from("intake_submissions")
        .update({
          status: "converted",
          client_id: clientId,
        })
        .eq("id", sub.id)

      if (uErr) throw uErr

      setRows((prev) =>
        prev.map((r) =>
          r.id === sub.id
            ? { ...r, status: "converted", client_id: clientId }
            : r
        )
      )
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setConvertFeedback(null)
      setError(t("intake.submissions.errors.convertFailed"))
    } finally {
      setActionId(null)
    }
  }

  async function archive(sub: SubmissionRow) {
    setActionId(sub.id)
    setError(null)
    try {
      const { error: uErr } = await supabase
        .from("intake_submissions")
        .update({ status: "archived" })
        .eq("id", sub.id)

      if (uErr) throw uErr
      setRows((prev) =>
        prev.map((r) => (r.id === sub.id ? { ...r, status: "archived" } : r))
      )
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("intake.submissions.errors.archiveFailed"))
    } finally {
      setActionId(null)
    }
  }

  function caseTypeLabel(data: Json): string {
    const raw =
      data &&
      typeof data === "object" &&
      !Array.isArray(data) &&
      typeof (data as Record<string, unknown>).case_type === "string"
        ? String((data as Record<string, unknown>).case_type)
        : ""
    if (!raw) return "—"
    const key = `intake.public.caseTypes.${raw}`
    const translated = t(key)
    return translated === key ? raw : translated
  }

  if (!canUse) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("intake.submissions.title")}
          </h1>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">
              {t("intake.upgrade.body")}
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/billing">{t("intake.upgrade.cta")}</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
            <Link href="/dashboard/intake">
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t("intake.submissions.back")}
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("intake.submissions.title")}
          </h1>
          {formTitle && (
            <p className="mt-1 text-sm text-muted-foreground">{formTitle}</p>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {convertFeedback && (
          <p
            className={
              convertFeedback.tone === "success"
                ? "text-sm text-emerald-700 dark:text-emerald-400"
                : "text-sm text-sky-800 dark:text-sky-300"
            }
            role="status"
          >
            {convertFeedback.message}
          </p>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("intake.loading")}
          </div>
        ) : rows.length === 0 ? (
          <Card className="p-8 text-center text-sm text-muted-foreground">
            {t("intake.submissions.empty")}
          </Card>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="px-3 py-2 font-medium">
                    {t("intake.submissions.col.submitted")}
                  </th>
                  <th className="px-3 py-2 font-medium">
                    {t("intake.submissions.col.contact")}
                  </th>
                  <th className="px-3 py-2 font-medium">
                    {t("intake.submissions.col.caseType")}
                  </th>
                  <th className="px-3 py-2 font-medium">
                    {t("intake.submissions.col.status")}
                  </th>
                  <th className="px-3 py-2 font-medium text-right">
                    {t("intake.submissions.col.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((sub) => {
                  const obj =
                    sub.data &&
                    typeof sub.data === "object" &&
                    !Array.isArray(sub.data)
                      ? (sub.data as Record<string, unknown>)
                      : {}
                  const name = readString(obj, "full_name")
                  const email = readString(obj, "email")
                  return (
                    <tr key={sub.id} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 align-top text-muted-foreground">
                        {sub.submitted_at
                          ? new Date(sub.submitted_at).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-3 py-2 align-top">
                        <div className="font-medium">{name || "—"}</div>
                        <div className="text-xs text-muted-foreground">
                          {email || "—"}
                        </div>
                      </td>
                      <td className="px-3 py-2 align-top">
                        {caseTypeLabel(sub.data)}
                      </td>
                      <td className="px-3 py-2 align-top">
                        <Badge variant="secondary">
                          {t(`intake.submissions.status.${sub.status}`)}
                        </Badge>
                      </td>
                      <td className="px-3 py-2 align-top text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          {sub.status === "pending" && (
                            <>
                              <Button
                                type="button"
                                size="sm"
                                disabled={actionId === sub.id}
                                onClick={() => void convertToClient(sub)}
                                aria-busy={actionId === sub.id}
                              >
                                {actionId === sub.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                                ) : (
                                  t("intake.submissions.convert")
                                )}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={actionId === sub.id}
                                onClick={() => void archive(sub)}
                              >
                                {t("intake.submissions.archive")}
                              </Button>
                            </>
                          )}
                          {sub.client_id && (
                            <Button variant="link" size="sm" className="h-auto p-0" asChild>
                              <Link href={`/dashboard/clients?id=${sub.client_id}`}>
                                {t("intake.submissions.openClient")}
                              </Link>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
