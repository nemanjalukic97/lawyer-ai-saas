"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ClipboardCopy, Loader2, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/LanguageProvider"
import { createClient } from "@/lib/supabase/client"
import { hasFeature, type EntitlementPlanId } from "../lib/entitlements"
import { logActivity } from "@/lib/activity/logActivity"

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

  const fetchForms = useCallback(async () => {
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
    void fetchForms()
  }, [fetchForms])

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null
    let mounted = true

    async function subscribe() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!mounted || !user) return

      channel = supabase
        .channel("intake_forms_submissions_count")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "intake_submissions",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            void fetchForms()
          }
        )
        .subscribe()
    }

    void subscribe()

    return () => {
      mounted = false
      if (channel) {
        void supabase.removeChannel(channel)
      }
    }
  }, [fetchForms, supabase])

  async function deleteForm(form: IntakeFormRow) {
    const ok = window.confirm(t("intake.actions.deleteConfirm"))
    if (!ok) return

    setError(null)
    setTogglingId(form.id)
    try {
      const { error: dSubErr } = await supabase
        .from("intake_submissions")
        .delete()
        .eq("form_id", form.id)

      if (dSubErr) throw dSubErr

      const { error: dFormErr } = await supabase
        .from("intake_forms")
        .delete()
        .eq("id", form.id)

      if (dFormErr) throw dFormErr

      void logActivity(
        supabase,
        "intake_form.deleted",
        "intake_form",
        form.id,
        form.title ?? t("intake.common.formFallback"),
        { slug: form.slug }
      )

      setForms((prev) => prev.filter((f) => f.id !== form.id))
      setCounts((prev) => {
        const next = { ...prev }
        delete next[form.id]
        return next
      })
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("intake.errors.deleteFailed"))
    } finally {
      setTogglingId(null)
    }
  }

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
    <div className="min-h-screen overflow-x-hidden bg-background px-4 py-10">
      <div className="mx-auto flex min-w-0 max-w-4xl flex-col gap-6">
        <header className="pb-6 border-b border-border/40 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
              {t("intake.kicker")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("intake.title")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
              {t("intake.subtitle")}
            </p>
          </div>
          <div className="shrink-0 mt-1">
            <Button asChild>
              <Link href="/dashboard/intake/new">{t("intake.actions.create")}</Link>
            </Button>
          </div>
        </header>

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
          <Card className="p-8 text-sm text-muted-foreground">
            {t("intake.empty")}
          </Card>
        ) : (
          <div className="space-y-0.5">
            {forms.map((form) => (
              <div
                key={form.id}
                className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 rounded-r-lg border-l-2 border-border/40 px-3 py-2.5 transition-colors hover:border-primary/50 hover:bg-muted/20"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">{form.title}</p>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={form.is_active ?? false}
                      aria-label={t("intake.list.active")}
                      disabled={togglingId === form.id}
                      onClick={() => void toggleActive(form, !(form.is_active ?? false))}
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] transition-colors disabled:opacity-50 ${
                        form.is_active
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          : "border-border/50 text-muted-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {togglingId === form.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : form.is_active ? (
                        t("intake.list.statusActive")
                      ) : (
                        t("intake.list.statusPaused")
                      )}
                    </button>
                  </div>
                </div>

                <span className="shrink-0 text-xs text-muted-foreground/60">
                  {t("intake.list.submissions", { n: counts[form.id] ?? 0 })}
                </span>

                <div className="flex shrink-0 items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => copyLink(form.slug, form.id)}
                  >
                    <ClipboardCopy className="mr-1 h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                      {copiedId === form.id ? t("intake.list.copied") : t("intake.list.copyLink")}
                    </span>
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
                    <Link href={`/dashboard/intake/${form.id}/submissions`}>
                      <span className="truncate">{t("intake.list.viewSubmissions")}</span>
                    </Link>
                  </Button>

                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/dashboard/intake/${form.id}/edit`} aria-label={t("intake.list.edit")}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    disabled={togglingId === form.id}
                    onClick={() => void deleteForm(form)}
                    aria-label={t("intake.list.deleteAria")}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
