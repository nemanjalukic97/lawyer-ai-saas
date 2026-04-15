"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ClipboardCopy, Loader2, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/components/LanguageProvider"
import { createClient } from "@/lib/supabase/client"
import { hasFeature, type EntitlementPlanId } from "../lib/entitlements"

import type { Tables } from "@/lib/supabase/types"

type IntakeFormRow = Tables<"intake_forms">

type Props = {
  planId: EntitlementPlanId
}

export default function IntakePageClient({ planId }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()
  const canUse = hasFeature(planId, "intake_forms")

  const [forms, setForms] = useState<IntakeFormRow[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

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
        setLoading(false)
        return
      }

      const { data, error: qErr } = await supabase
        .from("intake_forms")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (qErr) throw qErr

      const rows = (data ?? []) as IntakeFormRow[]
      setForms(rows)

      const nextCounts: Record<string, number> = {}
      await Promise.all(
        rows.map(async (f) => {
          const { count } = await supabase
            .from("intake_submissions")
            .select("*", { count: "exact", head: true })
            .eq("form_id", f.id)
          nextCounts[f.id] = count ?? 0
        })
      )
      setCounts(nextCounts)
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("intake.errors.loadFailed"))
    } finally {
      setLoading(false)
    }
  }, [canUse, supabase, t])

  useEffect(() => {
    void load()
  }, [load])

  async function toggleActive(form: IntakeFormRow, next: boolean) {
    setTogglingId(form.id)
    try {
      const { error: uErr } = await supabase
        .from("intake_forms")
        .update({ is_active: next })
        .eq("id", form.id)
      if (uErr) throw uErr
      setForms((prev) =>
        prev.map((f) =>
          f.id === form.id ? { ...f, is_active: next } : f
        )
      )
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("intake.errors.toggleFailed"))
    } finally {
      setTogglingId(null)
    }
  }

  function copyLink(slug: string, id: string) {
    const url = `${window.location.origin}/intake/${slug}`
    void navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id)
      window.setTimeout(() => setCopiedId(null), 2000)
    })
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
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("intake.kicker")}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {t("intake.title")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("intake.subtitle")}
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/intake/new">{t("intake.actions.create")}</Link>
          </Button>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("intake.loading")}
          </div>
        ) : forms.length === 0 ? (
          <Card className="p-8 text-center text-sm text-muted-foreground">
            {t("intake.empty")}
          </Card>
        ) : (
          <ul className="flex flex-col gap-3">
            {forms.map((form) => (
              <li key={form.id}>
                <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    <p className="truncate font-medium">{form.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("intake.list.submissions")
                        .replace("{n}", String(counts[form.id] ?? 0))}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {t("intake.list.active")}
                      </span>
                      <Switch
                        checked={form.is_active ?? false}
                        disabled={togglingId === form.id}
                        onCheckedChange={(v) => void toggleActive(form, v)}
                        aria-label={t("intake.list.active")}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyLink(form.slug, form.id)}
                    >
                      <ClipboardCopy className="mr-1 h-4 w-4" />
                      {copiedId === form.id
                        ? t("intake.list.copied")
                        : t("intake.list.copyLink")}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/dashboard/intake/${form.id}/submissions`}
                      >
                        {t("intake.list.viewSubmissions")}
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={`/dashboard/intake/${form.id}/edit`}
                        aria-label={t("intake.list.edit")}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
