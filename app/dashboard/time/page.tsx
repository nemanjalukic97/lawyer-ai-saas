"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { Loader2, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type TimeEntryStatus = "pending" | "approved" | "billed"

// Matches the real time_entries table columns we use
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

export default function TimeTrackingPage() {
  const supabase = useMemo(() => createClient(), [])

  const [matterName, setMatterName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(getTodayISODate)
  const [hoursWorked, setHoursWorked] = useState<string>("")
  const [hourlyRate, setHourlyRate] = useState<string>("")
  const [activityType, setActivityType] = useState<ActivityType>("other")
  const [currency, setCurrency] = useState<CurrencyCode>("EUR")

  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [loadingEntries, setLoadingEntries] = useState(true)
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [listError, setListError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const numericHours = Number.parseFloat(hoursWorked)
  const numericRate = Number.parseFloat(hourlyRate)
  const isValidHours =
    !Number.isNaN(numericHours) &&
    numericHours >= 0.25 &&
    numericHours <= 24
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
          setListError("You must be logged in to view time entries.")
          return
        }

        const { data, error } = await supabase
          .from("time_entries")
          .select(
            "id, user_id, work_date, duration_minutes, hourly_rate, amount, status, activity_type, notes"
          )
          .eq("user_id", user.id)
          .order("work_date", { ascending: false })
          .order("id", { ascending: false })

        if (error) {
          throw error
        }

        if (!isMounted) return

        const normalized: TimeEntry[] =
          data?.map((row) => ({
            id: row.id,
            user_id: row.user_id,
            work_date: row.work_date,
            duration_minutes: Number(row.duration_minutes ?? 0),
            hourly_rate: Number(row.hourly_rate ?? 0),
            amount: Number(row.amount ?? 0),
            status: row.status as TimeEntryStatus,
            activity_type: row.activity_type as ActivityType,
            notes: row.notes ?? null,
          })) ?? []

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
  }, [supabase])

  function resetForm() {
    setMatterName("")
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

    if (!matterName.trim() || !description.trim()) {
      setFormError("Matter name and description are required.")
      return
    }

    if (!date) {
      setFormError("Date is required.")
      return
    }

    if (!isValidHours || !isValidRate || computedTotal === null) {
      setFormError(
        "Please provide valid hours (0.25–24) and a non-negative hourly rate."
      )
      return
    }

    setCreating(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setFormError("You must be logged in to log time entries.")
        return
      }

      const durationMinutes = Math.round(numericHours * 60)
      const notes = `Matter: ${matterName.trim()} | Work: ${description.trim()}`

      const payload = {
        user_id: user.id,
        law_firm_id: null,
        client_id: null,
        invoice_id: null,
        work_date: date,
        duration_minutes: durationMinutes,
        activity_type: activityType,
        status: "pending" as TimeEntryStatus,
        hourly_rate: numericRate,
        notes,
      }

      const { data, error } = await supabase
        .from("time_entries")
        .insert(payload)
        .select(
          "id, user_id, work_date, duration_minutes, hourly_rate, amount, status, activity_type, notes"
        )
        .single()

      if (error) {
        throw error
      }

      const newEntry: TimeEntry = {
        id: data.id,
        user_id: data.user_id,
        work_date: data.work_date,
        duration_minutes: Number(data.duration_minutes ?? durationMinutes),
        hourly_rate: Number(data.hourly_rate ?? numericRate),
        amount: Number(data.amount ?? computedTotal),
        status: data.status as TimeEntryStatus,
        activity_type: data.activity_type as ActivityType,
        notes: data.notes ?? notes,
      }

      setEntries((prev) => [newEntry, ...prev])
      resetForm()
      setSuccessMessage("Time entry logged successfully.")
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Failed to log time entry:", error)
      }
      setFormError("Failed to log time entry. Please try again.")
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
        .reduce(
          (sum, entry) => sum + (entry.duration_minutes || 0) / 60,
          0
        ),
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
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Legantis · Time tracking
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
              Time tracking & billing
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Log billable hours by client and matter, and keep track of your
              unbilled time and billable amounts in one place.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </header>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="matterName">Client / Matter name</Label>
              <Input
                id="matterName"
                value={matterName}
                onChange={(event) => setMatterName(event.target.value)}
                placeholder="e.g. ACME d.o.o. – Employment dispute"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of work</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                required
                placeholder="e.g. Drafting statement of claim, reviewing evidence, preparing for hearing..."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursWorked">Hours worked</Label>
                <Input
                  id="hoursWorked"
                  type="number"
                  min={0.25}
                  max={24}
                  step={0.25}
                  value={hoursWorked}
                  onChange={(event) => setHoursWorked(event.target.value)}
                  required
                  placeholder="e.g. 1.5"
                />
                <p className="text-xs text-muted-foreground">
                  Use 0.25 increments (15 minutes).
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly rate</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min={0}
                  step={1}
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.target.value)}
                  required
                  placeholder="e.g. 150"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityType">Activity type</Label>
                <Select
                  value={activityType}
                  onValueChange={(value) =>
                    setActivityType(value as ActivityType)
                  }
                >
                  <SelectTrigger id="activityType" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drafting">Drafting</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="court">Court appearance</SelectItem>
                    <SelectItem value="admin">Administrative</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Currency</Label>
                <Select
                  value={currency}
                  onValueChange={(value) => setCurrency(value as CurrencyCode)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR – Euro</SelectItem>
                    <SelectItem value="USD">USD – US Dollar</SelectItem>
                    <SelectItem value="BAM">BAM – Convertible Mark</SelectItem>
                    <SelectItem value="RSD">RSD – Serbian Dinar</SelectItem>
                    <SelectItem value="HRK">HRK – Croatian Kuna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Total:{" "}
                  {computedTotal !== null ? (
                    <>
                      {formatCurrencySymbol(currency)}{" "}
                      {computedTotal.toFixed(2)}
                    </>
                  ) : (
                    "—"
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Calculated as hours × hourly rate. Amount is stored as a
                  numeric value.
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
                  {creating && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {creating ? "Logging time..." : "Log time"}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        <Card className="space-y-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Time entries</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Review your logged time, track unbilled hours, and prepare for
                invoicing.
              </p>
            </div>

            <div className="grid gap-2 text-sm sm:grid-cols-3 sm:text-right">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Total unbilled hours
                </p>
                <p className="text-sm font-semibold">
                  {totalUnbilledHours.toFixed(2)} h
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Unbilled amount (EUR)
                </p>
                <p className="text-sm font-semibold">
                  €{totalUnbilledAmountEUR.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Entries this month
                </p>
                <p className="text-sm font-semibold">{totalEntriesThisMonth}</p>
              </div>
            </div>
          </div>

          {listError && (
            <p className="text-sm text-destructive" role="alert">
              {listError}
            </p>
          )}

          <div className="rounded-md border">
            {loadingEntries ? (
              <div className="space-y-2 p-4 text-sm text-muted-foreground">
                <p>Loading time entries...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="space-y-2 p-4 text-sm text-muted-foreground">
                <p>No time entries yet.</p>
                <p>Log your first time entry using the form above.</p>
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
                        <span>
                          {entry.activity_type === "drafting" && "Drafting"}
                          {entry.activity_type === "reviewing" && "Reviewing"}
                          {entry.activity_type === "research" && "Research"}
                          {entry.activity_type === "meeting" && "Meeting"}
                          {entry.activity_type === "court" && "Court appearance"}
                          {entry.activity_type === "admin" && "Administrative"}
                          {entry.activity_type === "other" && "Other"}
                        </span>
                        <span>·</span>
                        <span>
                          Total: {formatCurrencySymbol("EUR")}{" "}
                          {entry.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={
                          entry.status === "billed"
                            ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-700"
                            : "border-amber-500/60 bg-amber-500/10 text-amber-700"
                        }
                      >
                        {entry.status === "billed" ? "Billed" : "Unbilled"}
                      </Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => void handleDelete(entry.id)}
                        disabled={deletingId === entry.id}
                        aria-label="Delete time entry"
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
      </div>
    </div>
  )
}

