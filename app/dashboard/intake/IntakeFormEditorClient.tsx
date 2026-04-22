"use client"

import Link from "next/link"
import { FormEvent, useEffect, useMemo, useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/LanguageProvider"
import { createClient } from "@/lib/supabase/client"
import { hasFeature, type EntitlementPlanId } from "../lib/entitlements"
import { logActivity } from "@/lib/activity/logActivity"

import {
  OPTIONAL_INTAKE_KEYS,
  parseFieldsJson,
  type OptionalIntakeKey,
} from "./lib/extraFields"

type Props = {
  planId: EntitlementPlanId
  formId?: string
}

export default function IntakeFormEditorClient({ planId, formId }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()
  const canUse = hasFeature(planId, "intake_forms")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [optional, setOptional] = useState<Record<OptionalIntakeKey, boolean>>({
    company: false,
    address: false,
    notes: false,
  })

  const [loading, setLoading] = useState(!!formId)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!formId || !canUse) {
      setLoading(false)
      return
    }

    let mounted = true

    async function load() {
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

        const { data, error: qErr } = await supabase
          .from("intake_forms")
          .select("*")
          .eq("id", formId)
          .eq("user_id", user.id)
          .maybeSingle()

        if (qErr) throw qErr
        if (!data) {
          setError(t("intake.errors.formNotFound"))
          return
        }

        const parsed = parseFieldsJson(data.fields)
        const nextOpt: Record<OptionalIntakeKey, boolean> = {
          company: false,
          address: false,
          notes: false,
        }
        for (const k of parsed) {
          nextOpt[k] = true
        }

        if (!mounted) return
        setTitle(data.title ?? "")
        setDescription(data.description ?? "")
        setOptional(nextOpt)
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error(e)
        }
        if (mounted) setError(t("intake.errors.loadFailed"))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    void load()
    return () => {
      mounted = false
    }
  }, [canUse, formId, supabase, t])

  function toggleOptional(key: OptionalIntakeKey) {
    setOptional((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canUse) return
    setSaving(true)
    setError(null)

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

      const fieldsJson = OPTIONAL_INTAKE_KEYS.filter((k) => optional[k])

      if (!title.trim()) {
        setError(t("intake.editor.errors.titleRequired"))
        return
      }

      if (formId) {
        const { error: uErr } = await supabase
          .from("intake_forms")
          .update({
            title: title.trim(),
            description: description.trim() || null,
            fields: fieldsJson,
          })
          .eq("id", formId)
          .eq("user_id", user.id)

        if (uErr) throw uErr
      } else {
        const slug = crypto.randomUUID()
        const { data: inserted, error: iErr } = await supabase
          .from("intake_forms")
          .insert({
            user_id: user.id,
            law_firm_id: lawFirmId,
            title: title.trim(),
            description: description.trim() || null,
            fields: fieldsJson,
            slug,
          })
          .select("id, title")
          .single()
        if (iErr) throw iErr

        if (inserted?.id) {
          void logActivity(
            supabase,
            "intake_form.created",
            "intake_form",
            inserted.id,
            inserted.title ?? title.trim(),
            { slug }
          )
        }
      }

      window.location.href = "/dashboard/intake"
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(err)
      }
      setError(t("intake.editor.errors.saveFailed"))
    } finally {
      setSaving(false)
    }
  }

  if (!canUse) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("intake.title")}
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
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
            <Link href="/dashboard/intake">
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t("intake.editor.back")}
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            {formId ? t("intake.editor.titleEdit") : t("intake.editor.titleNew")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("intake.editor.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("intake.loading")}
          </div>
        ) : (
          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="intake-title">{t("intake.editor.formTitle")}</Label>
              <Input
                id="intake-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intake-desc">
                {t("intake.editor.description")}
              </Label>
              <Textarea
                id="intake-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-3 rounded-lg border border-border p-4">
              <p className="text-sm font-medium">
                {t("intake.editor.optionalTitle")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("intake.editor.optionalHint")}
              </p>
              {OPTIONAL_INTAKE_KEYS.map((key) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    className="size-4 rounded border border-input"
                    checked={optional[key]}
                    onChange={() => toggleOptional(key)}
                  />
                  {t(`intake.editor.optional.${key}`)}
                </label>
              ))}
            </div>

            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("intake.editor.saving")}
                </>
              ) : (
                t("intake.editor.save")
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
