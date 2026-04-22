"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Loader2, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/components/LanguageProvider"
import { logActivity } from "@/lib/activity/logActivity"

type TimeEntryStatus = "pending" | "approved" | "billed"

type TimeEntry = {
  id: string
  user_id: string
  work_date: string
  duration_minutes: number
  hourly_rate: number
  amount: number
  status: TimeEntryStatus
  activity_type: ActivityType
  notes: string | null
  client_id: string | null
}

type BankAccountRow = {
  id: string
  bank_name: string
  iban: string
  is_default: boolean | null
  law_firm_id: string | null
}

type ActivityType =
  | "drafting"
  | "reviewing"
  | "research"
  | "meeting"
  | "court"
  | "admin"
  | "other"

type CurrencyCode = "EUR" | "USD" | "BAM" | "RSD" | "HRK"

function formatCurrencySymbol(currency: CurrencyCode): string {
  switch (currency) {
    case "EUR":
      return "€"
    case "USD":
      return "$"
    case "BAM":
      return "KM"
    case "RSD":
      return "RSD"
    case "HRK":
      return "HRK"
    default:
      return currency
  }
}

function formatDisplayDate(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function getTodayISODate(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function addDaysIso(baseYmd: string, days: number): string {
  const d = new Date(`${baseYmd}T12:00:00.000Z`)
  if (Number.isNaN(d.getTime())) return baseYmd
  d.setUTCDate(d.getUTCDate() + days)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, "0")
  const day = String(d.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function generatePaymentReference(): string {
  const year = new Date().getFullYear()
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase()
  return `INV-${year}-${rand}`
}

function extractMatterName(notes: string | null): string {
  if (!notes) return "Matter"
  const match = notes.match(/^Matter:\s*(.+?)\s*\|\s*Work:/i)
  return match?.[1] ?? "Matter"
}

function extractWorkDescription(notes: string | null): string {
  if (!notes) return ""
  const match = notes.match(/\|\s*Work:\s*(.+)$/i)
  return match?.[1] ?? notes
}

type TimeEntriesTabProps = {
  onInvoiceCreated?: () => void
  prefillMatterId?: string | null
}

type ClientOption = {
  id: string
  name: string
  company_name: string | null
}

export function TimeEntriesTab({
  onInvoiceCreated,
  prefillMatterId,
}: TimeEntriesTabProps) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [clientInputValue, setClientInputValue] = useState("")
  const [showClientSuggestions, setShowClientSuggestions] = useState(false)
  const [filteredClients, setFilteredClients] = useState<ClientOption[]>([])
  const [matterId, setMatterId] = useState<string>(prefillMatterId ?? "")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(getTodayISODate)
  const [hoursWorked, setHoursWorked] = useState<string>("")
  const [hourlyRate, setHourlyRate] = useState<string>("")
  const [activityType, setActivityType] = useState<ActivityType>("other")
  const [currency, setCurrency] = useState<CurrencyCode>("EUR")

  const [matterOptions, setMatterOptions] = useState<
    Array<{ id: string; title: string; matter_number: string }>
  >([])
  const [mattersLoaded, setMattersLoaded] = useState(false)

  const [clientOptions, setClientOptions] = useState<ClientOption[]>([])
  const [clientsLoaded, setClientsLoaded] = useState(false)

  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [loadingEntries, setLoadingEntries] = useState(true)
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [listError, setListError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [bankAccounts, setBankAccounts] = useState<BankAccountRow[]>([])
  const [banksLoaded, setBanksLoaded] = useState(false)
  const [invoiceDialogEntry, setInvoiceDialogEntry] = useState<TimeEntry | null>(
    null
  )
  const [invoiceDueDate, setInvoiceDueDate] = useState("")
  const [invoiceNotes, setInvoiceNotes] = useState("")
  const [invoicePaymentRef, setInvoicePaymentRef] = useState("")
  const [invoiceBankId, setInvoiceBankId] = useState<string>("")
  const [invoiceSubmitting, setInvoiceSubmitting] = useState(false)
  const [invoiceDialogError, setInvoiceDialogError] = useState<string | null>(
    null
  )

  const numericHours = Number.parseFloat(hoursWorked)
  const numericRate = Number.parseFloat(hourlyRate)
  const isValidHours =
    !Number.isNaN(numericHours) && numericHours >= 0.25 && numericHours <= 24
  const isValidRate = !Number.isNaN(numericRate) && numericRate >= 0
  const computedTotal =
    isValidHours && isValidRate ? numericHours * numericRate : null

  useEffect(() => {
    let isMounted = true

    async function loadEntries() {
      setLoadingEntries(true)
      setListError(null)

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setListError(t("time.errors.mustBeLoggedInToView"))
          return
        }

        const { data, error } = await supabase
          .from("time_entries")
          .select(
            "id, user_id, work_date, duration_minutes, hourly_rate, amount, status, activity_type, notes, client_id"
          )
          .eq("user_id", user.id)
          .order("work_date", { ascending: false })
          .order("id", { ascending: false })

        if (error) {
          throw error
        }

        if (!isMounted) return

        const normalized: TimeEntry[] =
          (data ?? []).map((row) => {
            const r = row as Record<string, unknown>
            return {
              id: String(r.id),
              user_id: String(r.user_id),
              work_date: String(r.work_date ?? ""),
              duration_minutes: Number(r.duration_minutes ?? 0),
              hourly_rate: Number(r.hourly_rate ?? 0),
              amount: Number(r.amount ?? 0),
              status: r.status as TimeEntryStatus,
              activity_type: r.activity_type as ActivityType,
              notes: typeof r.notes === "string" ? r.notes : null,
              client_id: typeof r.client_id === "string" ? r.client_id : null,
            }
          })

        setEntries(normalized)
      } catch (error) {
        if (!isMounted) return
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("Failed to load time entries:", error)
        }
        setListError("Failed to load time entries. Please try again.")
      } finally {
        if (isMounted) {
          setLoadingEntries(false)
        }
      }
    }

    void loadEntries()

    return () => {
      isMounted = false
    }
  }, [supabase, t])

  useEffect(() => {
    let cancelled = false
    async function loadBanks() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user || cancelled) {
          if (!cancelled) setBanksLoaded(true)
          return
        }
        const { data, error } = await supabase
          .from("bank_accounts")
          .select("id, bank_name, iban, is_default, law_firm_id")
          .order("is_default", { ascending: false })
        if (!cancelled && !error && data) {
          setBankAccounts(data as BankAccountRow[])
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setBanksLoaded(true)
      }
    }
    void loadBanks()
    return () => {
      cancelled = true
    }
  }, [supabase])

  useEffect(() => {
    let cancelled = false
    async function loadClients() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user || cancelled) {
          if (!cancelled) setClientsLoaded(true)
          return
        }

        const { data, error } = await supabase
          .from("clients")
          .select("id, name, company_name")
          .eq("user_id", user.id)
          .is("deleted_at", null)
          .order("name", { ascending: true })

        if (!cancelled && !error && data) {
          setClientOptions(
            (data as Array<Record<string, unknown>>).map((c) => ({
              id: String(c.id),
              name: String(c.name ?? ""),
              company_name:
                typeof c.company_name === "string" && c.company_name.trim()
                  ? c.company_name.trim()
                  : null,
            }))
          )
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setClientsLoaded(true)
      }
    }
    void loadClients()
    return () => {
      cancelled = true
    }
  }, [supabase])

  useEffect(() => {
    const q = clientInputValue.trim().toLowerCase()
    if (!q) {
      setFilteredClients([])
      setSelectedClientId(null)
      return
    }
    const next = clientOptions.filter((client) => {
      const nameWords = client.name.toLowerCase().split(" ").filter(Boolean)
      const queryWords = clientInputValue.toLowerCase().split(" ").filter(Boolean)

      if (queryWords.length === 0) return false

      // Every query word must match the start of at least one name word
      return queryWords.every((queryWord) =>
        nameWords.some((nameWord) => nameWord.startsWith(queryWord))
      )
    })
    setFilteredClients(next)
  }, [clientInputValue, clientOptions])

  useEffect(() => {
    let cancelled = false
    async function loadMatters() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user || cancelled) {
          if (!cancelled) setMattersLoaded(true)
          return
        }

        const { data } = await supabase
          .from("matters")
          .select("id, title, matter_number")
          .eq("user_id", user.id)
          .eq("status", "open")
          .order("created_at", { ascending: false })

        if (!cancelled && data) {
          setMatterOptions(
            (data as Array<Record<string, unknown>>).map((m) => ({
              id: String(m.id),
              title: String(m.title ?? ""),
              matter_number: String(m.matter_number ?? ""),
            }))
          )
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setMattersLoaded(true)
      }
    }
    void loadMatters()
    return () => {
      cancelled = true
    }
  }, [supabase])

  function openInvoiceDialog(entry: TimeEntry) {
    setInvoiceDialogError(null)
    setInvoiceDialogEntry(entry)
    setInvoiceDueDate(addDaysIso(getTodayISODate(), 14))
    setInvoiceNotes("")
    setInvoicePaymentRef(generatePaymentReference())
    const preferred =
      bankAccounts.find((b) => b.is_default) ?? bankAccounts[0] ?? null
    setInvoiceBankId(preferred?.id ?? "")
  }

  async function handleConfirmInvoice() {
    if (!invoiceDialogEntry || !invoiceBankId) return
    setInvoiceSubmitting(true)
    setInvoiceDialogError(null)
    try {
      const res = await fetch("/api/invoices/from-time-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timeEntryId: invoiceDialogEntry.id,
          dueDate: invoiceDueDate,
          notes: invoiceNotes.trim() || null,
          paymentReference: invoicePaymentRef.trim(),
          bankAccountId: invoiceBankId,
        }),
      })
      const json: unknown = await res.json().catch(() => null)
      if (!res.ok) {
        const msg =
          json &&
          typeof json === "object" &&
          typeof (json as Record<string, unknown>).error === "string"
            ? ((json as Record<string, unknown>).error as string)
            : t("time.invoiceGenerate.errors.createFailed")
        throw new Error(msg)
      }

      const created =
        json && typeof json === "object"
          ? (json as { invoiceId?: string; invoiceNumber?: string })
          : null
      if (created?.invoiceId && created?.invoiceNumber) {
        void logActivity(
          supabase,
          "invoice.created",
          "invoice",
          created.invoiceId,
          created.invoiceNumber,
          { time_entry_id: invoiceDialogEntry.id, client_id: invoiceDialogEntry.client_id ?? null }
        )
      }
      setEntries((prev) =>
        prev.map((e) =>
          e.id === invoiceDialogEntry.id ? { ...e, status: "billed" } : e
        )
      )
      setInvoiceDialogEntry(null)
      onInvoiceCreated?.()
    } catch (e) {
      setInvoiceDialogError(
        e instanceof Error
          ? e.message
          : t("time.invoiceGenerate.errors.createFailed")
      )
    } finally {
      setInvoiceSubmitting(false)
    }
  }

  function resetForm() {
    setSelectedClientId(null)
    setClientInputValue("")
    setShowClientSuggestions(false)
    setFilteredClients([])
    setMatterId("")
    setDescription("")
    setDate(getTodayISODate())
    setHoursWorked("")
    setHourlyRate("")
    setActivityType("other")
    setCurrency("EUR")
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setSuccessMessage(null)

    if (!selectedClientId) {
      setFormError("Please select a client from the list")
      return
    }

    if (!description.trim()) {
      setFormError(t("time.errors.descriptionRequired"))
      return
    }

    if (!date) {
      setFormError(t("time.errors.dateRequired"))
      return
    }

    if (!isValidHours || !isValidRate || computedTotal === null) {
      setFormError(t("time.errors.invalidHoursOrRate"))
      return
    }

    setCreating(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setFormError(t("time.errors.mustBeLoggedInToCreate"))
        return
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("law_firm_id")
        .eq("id", user.id)
        .maybeSingle()

      const durationMinutes = Math.round(numericHours * 60)
      const matterIdToSave = matterId === "none" ? null : (matterId || null)
      const matterInfo =
        matterIdToSave && matterOptions.length
          ? matterOptions.find((m) => m.id === matterIdToSave)
          : null
      const notes =
        matterInfo != null
          ? `Matter: ${matterInfo.matter_number} — ${matterInfo.title} | Work: ${description.trim()}`
          : `Work: ${description.trim()}`
      const clientIdToSave = selectedClientId

      const payload = {
        user_id: user.id,
        law_firm_id:
          (profile as { law_firm_id: string | null } | null)?.law_firm_id ?? null,
        client_id: clientIdToSave,
        invoice_id: null,
        matter_id: matterIdToSave,
        work_date: date,
        duration_minutes: durationMinutes,
        activity_type: activityType,
        status: "pending" as TimeEntryStatus,
        hourly_rate: numericRate,
        notes,
      }

      const { data, error } = await supabase
        .from("time_entries")
        .insert(payload as never)
        .select(
          "id, user_id, work_date, duration_minutes, hourly_rate, amount, status, activity_type, notes, client_id"
        )
        .single()

      if (error) {
        throw error
      }
      if (!data) {
        throw new Error("No row returned")
      }

      const d = data as Record<string, unknown>
      const newEntry: TimeEntry = {
        id: String(d.id),
        user_id: String(d.user_id),
        work_date: String(d.work_date ?? ""),
        duration_minutes: Number(d.duration_minutes ?? durationMinutes),
        hourly_rate: Number(d.hourly_rate ?? numericRate),
        amount: Number(d.amount ?? computedTotal),
        status: d.status as TimeEntryStatus,
        activity_type: d.activity_type as ActivityType,
        notes: typeof d.notes === "string" ? d.notes : notes,
        client_id: typeof d.client_id === "string" ? d.client_id : null,
      }

      setEntries((prev) => [newEntry, ...prev])
      resetForm()
      setSuccessMessage(t("time.messages.logged"))
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Failed to log time entry:", error)
      }
      setFormError(t("time.errors.createFailed"))
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    setListError(null)

    try {
      const { error } = await supabase.from("time_entries").delete().eq("id", id)

      if (error) {
        throw error
      }

      setEntries((prev) => prev.filter((entry) => entry.id !== id))
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Failed to delete time entry:", error)
      }
      setListError("Failed to delete time entry. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const totalUnbilledHours = useMemo(
    () =>
      entries
        .filter((entry) => entry.status === "pending")
        .reduce((sum, entry) => sum + (entry.duration_minutes || 0) / 60, 0),
    [entries]
  )

  const totalUnbilledAmountEUR = useMemo(
    () =>
      entries
        .filter((entry) => entry.status === "pending")
        .reduce((sum, entry) => sum + (entry.amount || 0), 0),
    [entries]
  )

  const totalEntriesThisMonth = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    return entries.filter((entry) => {
      const entryDate = new Date(entry.work_date)
      if (Number.isNaN(entryDate.getTime())) return false
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      )
    }).length
  }, [entries])

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Client</Label>
            <div className="relative">
              <Input
                value={clientInputValue}
                onChange={(e) => {
                  setClientInputValue(e.target.value)
                  setShowClientSuggestions(true)
                }}
                onFocus={() => setShowClientSuggestions(true)}
                onBlur={() => {
                  window.setTimeout(() => setShowClientSuggestions(false), 120)
                }}
                placeholder="Start typing to search…"
                disabled={!clientsLoaded}
                required
              />
              {showClientSuggestions && filteredClients.length > 0 && (
                <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-md border bg-card shadow-md">
                  {filteredClients.slice(0, 12).map((c) => {
                    const label = c.company_name ? `${c.name} · ${c.company_name}` : c.name
                    return (
                      <button
                        key={c.id}
                        type="button"
                        className="flex w-full items-center px-3 py-2 text-left text-sm hover:bg-muted/50"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setClientInputValue(c.name)
                          setSelectedClientId(c.id)
                          setShowClientSuggestions(false)
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("matters.title")}</Label>
            <Select
              value={matterId}
              onValueChange={(v) => setMatterId(v)}
              disabled={!mattersLoaded}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("matters.select.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t("matters.select.none")}</SelectItem>
                {matterOptions.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {`${m.matter_number} — ${m.title}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {t("matters.select.help")}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("time.form.description.label")}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              required
              placeholder={t("time.form.description.placeholder")}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="date">{t("time.form.date.label")}</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoursWorked">{t("time.form.hoursWorked.label")}</Label>
              <Input
                id="hoursWorked"
                type="number"
                min={0.25}
                max={24}
                step={0.25}
                value={hoursWorked}
                onChange={(event) => setHoursWorked(event.target.value)}
                required
                placeholder={t("time.form.hoursWorked.placeholder")}
              />
              <p className="text-xs text-muted-foreground">
                {t("time.form.hoursWorked.help")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">{t("time.form.hourlyRate.label")}</Label>
              <Input
                id="hourlyRate"
                type="number"
                min={0}
                step={1}
                value={hourlyRate}
                onChange={(event) => setHourlyRate(event.target.value)}
                required
                placeholder={t("time.form.hourlyRate.placeholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityType">{t("time.form.activityType.label")}</Label>
              <Select
                value={activityType}
                onValueChange={(value) => setActivityType(value as ActivityType)}
              >
                <SelectTrigger id="activityType" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drafting">{t("time.activityTypes.drafting")}</SelectItem>
                  <SelectItem value="reviewing">{t("time.activityTypes.reviewing")}</SelectItem>
                  <SelectItem value="research">{t("time.activityTypes.research")}</SelectItem>
                  <SelectItem value="meeting">{t("time.activityTypes.meeting")}</SelectItem>
                  <SelectItem value="court">{t("time.activityTypes.court")}</SelectItem>
                  <SelectItem value="admin">{t("time.activityTypes.admin")}</SelectItem>
                  <SelectItem value="other">{t("time.activityTypes.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("time.form.currency.label")}</Label>
              <Select
                value={currency}
                onValueChange={(value) => setCurrency(value as CurrencyCode)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">{t("time.currencies.eur")}</SelectItem>
                  <SelectItem value="USD">{t("time.currencies.usd")}</SelectItem>
                  <SelectItem value="BAM">{t("time.currencies.bam")}</SelectItem>
                  <SelectItem value="RSD">{t("time.currencies.rsd")}</SelectItem>
                  <SelectItem value="HRK">{t("time.currencies.hrk")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                {t("time.form.total")}{" "}
                {computedTotal !== null ? (
                  <>
                    {formatCurrencySymbol(currency)} {computedTotal.toFixed(2)}
                  </>
                ) : (
                  t("time.common.emptyValue")
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("time.form.totalHelp")}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
              {formError && (
                <p className="text-sm text-destructive" role="alert">
                  {formError}
                </p>
              )}
              {successMessage && (
                <p className="text-sm text-emerald-600">{successMessage}</p>
              )}
              <Button type="submit" disabled={creating}>
                {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {creating
                  ? t("time.form.actions.loading")
                  : t("time.form.actions.submit")}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <Card className="space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">{t("time.list.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("time.list.subtitle")}
            </p>
          </div>

          <div className="grid gap-2 text-sm sm:grid-cols-3 sm:text-right">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("time.stats.unbilledHours")}
              </p>
              <p className="text-sm font-semibold">
                {totalUnbilledHours.toFixed(2)} h
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("time.stats.unbilledAmountEur")}
              </p>
              <p className="text-sm font-semibold">
                €{totalUnbilledAmountEUR.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("time.stats.entriesThisMonth")}
              </p>
              <p className="text-sm font-semibold">{totalEntriesThisMonth}</p>
            </div>
          </div>
        </div>

        {banksLoaded && bankAccounts.length === 0 && (
          <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:text-amber-100">
            <p>
              {t("time.invoiceGenerate.bankingWarningBefore")}{" "}
              <Link
                href="/dashboard/settings"
                className="font-medium underline underline-offset-2"
              >
                {t("time.invoiceGenerate.bankingSettingsLink")}
              </Link>
              {t("time.invoiceGenerate.bankingWarningAfter")}
            </p>
          </div>
        )}

        {listError && (
          <p className="text-sm text-destructive" role="alert">
            {listError}
          </p>
        )}

        <div className="rounded-md border">
          {loadingEntries ? (
            <div className="space-y-2 p-4 text-sm text-muted-foreground">
              <p>{t("time.list.loading")}</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="space-y-2 p-4 text-sm text-muted-foreground">
              <p>{t("time.list.emptyTitle")}</p>
              <p>{t("time.list.emptySubtitle")}</p>
            </div>
          ) : (
            <div className="divide-y">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">
                        {extractMatterName(entry.notes)}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatDisplayDate(entry.work_date)}
                      </span>
                    </div>
                    <p className="max-w-xl text-sm text-muted-foreground line-clamp-2">
                      {extractWorkDescription(entry.notes)}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {(entry.duration_minutes / 60).toFixed(2)} h @{" "}
                        {formatCurrencySymbol("EUR")}{" "}
                        {entry.hourly_rate.toFixed(2)}
                      </span>
                      <span>·</span>
                      <span>{t(`time.activityTypes.${entry.activity_type}`)}</span>
                      <span>·</span>
                      <span>
                        Total: {formatCurrencySymbol("EUR")}{" "}
                        {entry.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <Badge
                      variant="outline"
                      className={
                        entry.status === "billed"
                          ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-700"
                          : "border-amber-500/60 bg-amber-500/10 text-amber-700"
                      }
                    >
                      {entry.status === "billed"
                        ? t("time.status.billed")
                        : t("time.status.unbilled")}
                    </Badge>
                    {entry.status !== "billed" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        disabled={!banksLoaded || bankAccounts.length === 0}
                        onClick={() => openInvoiceDialog(entry)}
                      >
                        <FileText className="mr-1.5 h-4 w-4" />
                        {t("time.invoiceGenerate.button")}
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => void handleDelete(entry.id)}
                      disabled={deletingId === entry.id}
                      aria-label={t("time.actions.deleteAria")}
                    >
                      {deletingId === entry.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Dialog
        open={invoiceDialogEntry !== null}
        onOpenChange={(open) => {
          if (!open) setInvoiceDialogEntry(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("time.invoiceGenerate.dialogTitle")}</DialogTitle>
          </DialogHeader>
          {invoiceDialogEntry && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inv_due">{t("time.invoiceGenerate.dueDate")}</Label>
                <Input
                  id="inv_due"
                  type="date"
                  value={invoiceDueDate}
                  onChange={(e) => setInvoiceDueDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inv_notes">{t("time.invoiceGenerate.notes")}</Label>
                <Textarea
                  id="inv_notes"
                  rows={3}
                  value={invoiceNotes}
                  onChange={(e) => setInvoiceNotes(e.target.value)}
                  placeholder={t("time.invoiceGenerate.notesPlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inv_pay_ref">
                  {t("time.invoiceGenerate.paymentReference")}
                </Label>
                <Input
                  id="inv_pay_ref"
                  value={invoicePaymentRef}
                  onChange={(e) => setInvoicePaymentRef(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("time.invoiceGenerate.bankAccount")}</Label>
                <Select
                  value={invoiceBankId}
                  onValueChange={setInvoiceBankId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("time.invoiceGenerate.bankPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {bankAccounts.map((b) => {
                      const tail = b.iban.replace(/\s/g, "").slice(-4)
                      return (
                        <SelectItem key={b.id} value={b.id}>
                          {b.bank_name}
                          {tail ? ` · …${tail}` : ""}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                <span className="text-muted-foreground">
                  {t("time.invoiceGenerate.totalLabel")}{" "}
                </span>
                <span className="font-medium">
                  {formatCurrencySymbol("EUR")}{" "}
                  {invoiceDialogEntry.amount.toFixed(2)} EUR
                </span>
              </div>
              {invoiceDialogError && (
                <p className="text-sm text-destructive" role="alert">
                  {invoiceDialogError}
                </p>
              )}
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setInvoiceDialogEntry(null)}
              disabled={invoiceSubmitting}
            >
              {t("time.invoiceGenerate.cancel")}
            </Button>
            <Button
              type="button"
              onClick={() => void handleConfirmInvoice()}
              disabled={
                invoiceSubmitting ||
                !invoiceBankId ||
                !invoiceDueDate ||
                !invoicePaymentRef.trim()
              }
            >
              {invoiceSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {invoiceSubmitting
                ? t("time.invoiceGenerate.generating")
                : t("time.invoiceGenerate.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

