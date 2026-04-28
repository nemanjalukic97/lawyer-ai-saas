"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import type { Tables } from "@/lib/supabase/types"
import { createClient as createBrowserClient } from "@/lib/supabase/client"
import { useLanguage } from "@/components/LanguageProvider"

import {
  isPaidPlanId,
  resolveSubscriptionTier,
} from "../lib/entitlements"

type ProfileSettings = Pick<
  Tables<"user_profiles">,
  | "full_name"
  | "law_firm_id"
  | "preferred_jurisdiction"
  | "preferred_language"
  | "subscription_tier"
  | "subscription_status"
  | "theme_preference"
>

type FirmSettings = Pick<
  Tables<"law_firms">,
  "id" | "name" | "subscription_tier" | "subscription_status" | "default_jurisdiction"
>

type SettingsPageClientProps = {
  user: {
    id: string
    email: string | null
  }
  profile: (ProfileSettings & { law_firm_id: string | null }) | null
  firm: FirmSettings | null
}

const JURISDICTION_VALUES = [
  "serbia",
  "croatia",
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
  "montenegro",
  "slovenia",
] as const

const LANGUAGE_OPTIONS = [
  "Serbian",
  "Croatian",
  "Bosnian",
  "Montenegrin",
  "Slovenian",
  "English",
] as const

const CURRENCY_OPTIONS = ["EUR", "BAM", "RSD", "HRK"] as const

export default function SettingsPageClient({
  user,
  profile,
  firm,
}: SettingsPageClientProps) {
  const { t } = useLanguage()
  const supabase = useMemo(() => createBrowserClient(), [])

  // Banking tab state
  const [bankAccountId, setBankAccountId] = useState<string | null>(null)
  const [bankName, setBankName] = useState("")
  const [iban, setIban] = useState("")
  const [accountHolderName, setAccountHolderName] = useState("")
  const [swiftBic, setSwiftBic] = useState("")
  const [bankingDefault, setBankingDefault] = useState(true)
  const [bankingSaving, setBankingSaving] = useState(false)
  const [bankingMessage, setBankingMessage] = useState<string | null>(null)
  const [bankingError, setBankingError] = useState<string | null>(null)

  // Profile tab state
  const [fullName, setFullName] = useState<string>(profile?.full_name ?? "")
  const [lawFirmName, setLawFirmName] = useState<string>(firm?.name ?? "")
  const [preferredJurisdiction, setPreferredJurisdiction] = useState<string>(
    profile?.preferred_jurisdiction ??
      firm?.default_jurisdiction ??
      JURISDICTION_VALUES[0]
  )
  const [preferredLanguage, setPreferredLanguage] = useState<string>(
    profile?.preferred_language ?? "Serbian"
  )
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMessage, setProfileMessage] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  // Preferences tab state (not yet persisted)
  const [defaultJurisdiction, setDefaultJurisdiction] = useState<string>(
    preferredJurisdiction
  )
  const [currency, setCurrency] = useState<(typeof CURRENCY_OPTIONS)[number]>("EUR")
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true)
  const [preferencesSaving, setPreferencesSaving] = useState(false)
  const [preferencesMessage, setPreferencesMessage] = useState<string | null>(null)
  const [preferencesError, setPreferencesError] = useState<string | null>(null)

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Danger zone state
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function loadBanking() {
    setBankingMessage(null)
    setBankingError(null)
    try {
      const res = await fetch("/api/settings/banking", { method: "GET" })
      const json: unknown = await res.json().catch(() => null)
      if (!res.ok) {
        const msg =
          json &&
          typeof json === "object" &&
          typeof (json as Record<string, unknown>).error === "string"
            ? ((json as Record<string, unknown>).error as string)
            : t("settings.banking.errors.loadFailed")
        throw new Error(msg)
      }

      const bankAccount =
        json && typeof json === "object" && "bankAccount" in json
          ? ((json as Record<string, unknown>).bankAccount as unknown)
          : null

      if (bankAccount && typeof bankAccount === "object") {
        const b = bankAccount as Record<string, unknown>
        setBankAccountId(typeof b.id === "string" ? b.id : null)
        setBankName(typeof b.bankName === "string" ? b.bankName : "")
        setIban(typeof b.iban === "string" ? b.iban : "")
        setAccountHolderName(
          typeof b.accountHolderName === "string" ? b.accountHolderName : ""
        )
        setSwiftBic(typeof b.swiftBic === "string" ? b.swiftBic : "")
        setBankingDefault(typeof b.isDefault === "boolean" ? b.isDefault : true)
      } else {
        setBankAccountId(null)
      }
    } catch (err) {
      setBankingError(
        err instanceof Error ? err.message : t("settings.banking.errors.loadFailed")
      )
    }
  }

  useEffect(() => {
    void loadBanking()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSaveBanking() {
    setBankingSaving(true)
    setBankingMessage(null)
    setBankingError(null)
    try {
      const res = await fetch("/api/settings/banking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: bankAccountId,
          bankName,
          iban,
          accountHolderName,
          swiftBic,
          setDefault: bankingDefault,
        }),
      })
      const json: unknown = await res.json().catch(() => null)
      if (!res.ok) {
        const msg =
          json &&
          typeof json === "object" &&
          typeof (json as Record<string, unknown>).error === "string"
            ? ((json as Record<string, unknown>).error as string)
            : t("settings.banking.errors.saveFailed")
        throw new Error(msg)
      }
      setBankingMessage(t("settings.banking.messageSaved"))
      await loadBanking()
    } catch (err) {
      setBankingError(
        err instanceof Error ? err.message : t("settings.banking.errors.saveFailed")
      )
    } finally {
      setBankingSaving(false)
    }
  }

  async function handleSaveProfile() {
    setProfileSaving(true)
    setProfileMessage(null)
    setProfileError(null)
    try {
      const res = await fetch("/api/settings/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          preferredJurisdiction,
          preferredLanguage,
          lawFirmName: lawFirmName || null,
        }),
      })
      const json: unknown = await res.json().catch(() => ({}))

      if (!res.ok) {
        const errorMessage =
          json && typeof json === "object" && "error" in json
            ? String((json as Record<string, unknown>).error)
            : t("settings.errors.failedToSaveProfile")
        throw new Error(errorMessage)
      }

      setProfileMessage(t("settings.messages.profileUpdated"))
    } catch (error) {
      setProfileError(
        error instanceof Error ? error.message : t("settings.errors.failedToSaveProfile")
      )
    } finally {
      setProfileSaving(false)
    }
  }

  async function handleSavePreferences() {
    setPreferencesSaving(true)
    setPreferencesMessage(null)
    setPreferencesError(null)
    try {
      const res = await fetch("/api/settings/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          defaultJurisdiction,
          currency,
          emailNotifications,
          theme: "dark",
        }),
      })
      const json: unknown = await res.json().catch(() => ({}))
      if (!res.ok) {
        const errorMessage =
          json && typeof json === "object" && "error" in json
            ? String((json as Record<string, unknown>).error)
            : t("settings.errors.failedToSavePreferences")
        throw new Error(errorMessage)
      }
      setPreferencesMessage(
        t("settings.messages.preferencesSaved")
      )
    } catch (error) {
      setPreferencesError(
        error instanceof Error ? error.message : t("settings.errors.failedToSavePreferences")
      )
    } finally {
      setPreferencesSaving(false)
    }
  }

  async function handleChangePassword() {
    setPasswordSaving(true)
    setPasswordMessage(null)
    setPasswordError(null)

    try {
      if (!newPassword || newPassword.length < 8) {
        throw new Error(t("settings.security.errors.passwordTooShort"))
      }
      if (newPassword !== confirmPassword) {
        throw new Error(t("settings.security.errors.passwordsDoNotMatch"))
      }
      if (!user.email) {
        throw new Error(t("settings.security.errors.missingEmail"))
      }

      // Verify current password first for safety
      const signInResult = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      })

      if (signInResult.error) {
        throw new Error(t("settings.security.errors.currentPasswordIncorrect"))
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        throw new Error(error.message)
      }

      setPasswordMessage(t("settings.security.messages.passwordUpdated"))
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : t("settings.security.errors.failedToChangePassword")
      )
    } finally {
      setPasswordSaving(false)
    }
  }

  async function handleExportData() {
    setExporting(true)
    setExportError(null)
    try {
      const userId = user.id
      const lawFirmId = profile?.law_firm_id ?? null

      const [
        profileRes,
        contractsRes,
        documentsRes,
        predictionsRes,
        analysesRes,
        clientsRes,
        timeEntriesRes,
      ] = await Promise.all([
        supabase
          .from("user_profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle(),
        supabase
          .from("contracts")
          .select("*")
          .or(
            lawFirmId
              ? `user_id.eq.${userId},law_firm_id.eq.${lawFirmId}`
              : `user_id.eq.${userId}`
          ),
        supabase
          .from("documents")
          .select("*")
          .eq("user_id", userId),
        supabase
          .from("case_predictions")
          .select("*")
          .eq("user_id", userId),
        supabase
          .from("document_analyses")
          .select("*")
          .eq("user_id", userId),
        supabase
          .from("clients")
          .select("*")
          .eq("user_id", userId),
        supabase
          .from("time_entries")
          .select("*")
          .eq("user_id", userId),
      ])

      const exportPayload = {
        generated_at: new Date().toISOString(),
        user: {
          id: userId,
          email: user.email,
        },
        profile: profileRes.data ?? null,
        contracts: contractsRes.data ?? [],
        documents: documentsRes.data ?? [],
        predictions: predictionsRes.data ?? [],
        analyses: analysesRes.data ?? [],
        clients: clientsRes.data ?? [],
        time_entries: timeEntriesRes.data ?? [],
      }

      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `legantis-data-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      setExportError(
        error instanceof Error ? error.message : t("settings.danger.errors.failedToExportData")
      )
    } finally {
      setExporting(false)
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    setDeleteError(null)
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          deleted_at: new Date().toISOString(),
          // Browser Supabase client infers `.update()` as `never` here; payload matches `user_profiles` soft-delete.
        } as never)
        .eq("id", user.id)

      if (error) {
        throw new Error(error.message)
      }

      await supabase.auth.signOut()
      window.location.href = "/"
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : t("settings.danger.errors.failedToDeleteAccount")
      )
      setDeleting(false)
    }
  }

  const storedTier = resolveSubscriptionTier(
    profile?.subscription_tier ?? null,
    profile?.law_firm_id ?? null,
    firm?.subscription_tier ?? null,
  )
  const hasPaidPlan = isPaidPlanId(storedTier)
  const subscriptionTierLabel = hasPaidPlan
    ? t(
        `dashboard.planTier.${storedTier}` as
          | "dashboard.planTier.solo"
          | "dashboard.planTier.professional"
          | "dashboard.planTier.firm",
      )
    : t("settings.plan.tierNone")
  const subscriptionStatusLabel = hasPaidPlan
    ? (profile?.subscription_status ??
        firm?.subscription_status ??
        "trial")
    : t("settings.plan.statusNone")

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("settings.header.title")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("settings.header.subtitle")}
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">{t("settings.tabs.profile")}</TabsTrigger>
          <TabsTrigger value="preferences">{t("settings.tabs.preferences")}</TabsTrigger>
          <TabsTrigger value="banking">{t("settings.tabs.banking")}</TabsTrigger>
          <TabsTrigger value="security">{t("settings.tabs.security")}</TabsTrigger>
          <TabsTrigger value="danger">{t("settings.tabs.danger")}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.profile.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full_name">{t("settings.profile.fullName.label")}</Label>
                  <Input
                    id="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("settings.profile.fullName.placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("settings.profile.email.label")}</Label>
                  <Input
                    id="email"
                    value={user.email ?? ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="law_firm_name">{t("settings.profile.lawFirmName.label")}</Label>
                  <Input
                    id="law_firm_name"
                    value={lawFirmName}
                    onChange={(e) => setLawFirmName(e.target.value)}
                    placeholder={t("settings.profile.lawFirmName.placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred_jurisdiction">
                    {t("settings.profile.preferredJurisdiction.label")}
                  </Label>
                  <Select
                    value={preferredJurisdiction}
                    onValueChange={setPreferredJurisdiction}
                  >
                    <SelectTrigger id="preferred_jurisdiction">
                      <SelectValue placeholder={t("settings.profile.preferredJurisdiction.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {JURISDICTION_VALUES.map((value) => (
                        <SelectItem key={value} value={value}>
                          {t(`settings.jurisdictions.${value}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preferred_language">{t("settings.profile.preferredLanguage.label")}</Label>
                  <Select
                    value={preferredLanguage}
                    onValueChange={setPreferredLanguage}
                  >
                    <SelectTrigger id="preferred_language">
                      <SelectValue placeholder={t("settings.profile.preferredLanguage.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_OPTIONS.map((language) => (
                        <SelectItem key={language} value={language}>
                          {t(`settings.languages.${language}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {profileMessage && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {profileMessage}
                </p>
              )}
              {profileError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {profileError}
                </p>
              )}

              <div className="flex justify-end">
                <Button type="button" onClick={handleSaveProfile} disabled={profileSaving}>
                  {profileSaving ? t("settings.common.saving") : t("settings.profile.actions.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.preferences.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default_jurisdiction">
                    {t("settings.preferences.defaultJurisdiction.label")}
                  </Label>
                  <Select
                    value={defaultJurisdiction}
                    onValueChange={setDefaultJurisdiction}
                  >
                    <SelectTrigger id="default_jurisdiction">
                      <SelectValue placeholder={t("settings.preferences.defaultJurisdiction.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {JURISDICTION_VALUES.map((value) => (
                        <SelectItem key={value} value={value}>
                          {t(`settings.jurisdictions.${value}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("settings.preferences.currency.label")}</Label>
                  <div className="flex flex-wrap gap-2">
                    {CURRENCY_OPTIONS.map((c) => (
                      <Button
                        key={c}
                        type="button"
                        variant={currency === c ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrency(c)}
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-md border border-dashed border-border bg-muted/40 px-4 py-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{t("settings.preferences.emailNotifications.title")}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.preferences.emailNotifications.subtitle")}
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                {t("settings.preferences.note")}
              </p>

              {preferencesMessage && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {preferencesMessage}
                </p>
              )}
              {preferencesError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {preferencesError}
                </p>
              )}

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleSavePreferences}
                  disabled={preferencesSaving}
                >
                  {preferencesSaving ? t("settings.common.saving") : t("settings.preferences.actions.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.banking.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-sm text-muted-foreground">
                {profile?.law_firm_id
                  ? t("settings.banking.introFirm")
                  : t("settings.banking.introAccount")}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bank_name">{t("settings.banking.bankName.label")}</Label>
                  <Input
                    id="bank_name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder={t("settings.banking.bankName.placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account_holder">{t("settings.banking.accountHolder.label")}</Label>
                  <Input
                    id="account_holder"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    placeholder={t("settings.banking.accountHolder.placeholder")}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="iban">{t("settings.banking.iban.label")}</Label>
                  <Input
                    id="iban"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    placeholder={t("settings.banking.iban.placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="swift">{t("settings.banking.swift.label")}</Label>
                  <Input
                    id="swift"
                    value={swiftBic}
                    onChange={(e) => setSwiftBic(e.target.value)}
                    placeholder={t("settings.banking.swift.placeholder")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {t("settings.banking.defaultForInvoices.title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.banking.defaultForInvoices.subtitle")}
                  </p>
                </div>
                <Switch checked={bankingDefault} onCheckedChange={setBankingDefault} />
              </div>

              {bankingMessage && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">{bankingMessage}</p>
              )}
              {bankingError && (
                <p className="text-sm text-red-600 dark:text-red-400">{bankingError}</p>
              )}

              <div className="flex justify-end">
                <Button type="button" onClick={() => void handleSaveBanking()} disabled={bankingSaving}>
                  {bankingSaving ? t("settings.banking.saving") : t("settings.banking.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.security.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">{t("settings.security.currentPassword.label")}</Label>
                  <Input
                    id="current_password"
                    type="password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">{t("settings.security.newPassword.label")}</Label>
                  <Input
                    id="new_password"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">{t("settings.security.confirmPassword.label")}</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {passwordMessage && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {passwordMessage}
                  </p>
                )}
                {passwordError && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {passwordError}
                  </p>
                )}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={handleChangePassword}
                    disabled={passwordSaving}
                  >
                    {passwordSaving ? t("settings.common.saving") : t("settings.security.actions.save")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("settings.plan.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  {t("settings.plan.tierLabel")}{" "}
                  <span className="font-medium capitalize">
                    {subscriptionTierLabel}
                  </span>
                </p>
                <p>
                  {t("settings.plan.statusLabel")}{" "}
                  <span className="font-medium capitalize">
                    {subscriptionStatusLabel}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("settings.plan.note")}
                </p>
                <Button asChild size="sm" variant="outline" className="mt-2">
                  <Link href="/dashboard/billing">{t("settings.plan.actions.manageBilling")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="danger">
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle>{t("settings.danger.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 rounded-md border border-border bg-muted/40 p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {t("settings.danger.export.title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.danger.export.subtitle")}
                  </p>
                </div>
                {exportError && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {exportError}
                  </p>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  disabled={exporting}
                >
                  {exporting ? t("settings.danger.export.preparing") : t("settings.danger.export.action")}
                </Button>
              </div>

              <div className="space-y-3 rounded-md border border-destructive/50 bg-destructive/5 p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-destructive">
                    {t("settings.danger.delete.title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.danger.delete.subtitle")}
                  </p>
                </div>
                {deleteError && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {deleteError}
                  </p>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={deleting}
                >
                  {t("settings.danger.delete.action")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("settings.danger.delete.dialogTitle")}</DialogTitle>
            <DialogDescription>
              {t("settings.danger.delete.dialogDescription")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={deleting}
              onClick={() => setDeleteDialogOpen(false)}
            >
              {t("settings.common.cancel")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleting}
              onClick={handleDeleteAccount}
            >
              {deleting ? t("settings.common.deleting") : t("settings.danger.delete.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

