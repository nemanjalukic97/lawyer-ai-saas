/**
 * Authenticated Lighthouse for dashboard pages.
 * Creates a temp user, logs in via Chromium (shared profile), runs Lighthouse.
 *
 * Prereq: `npx next start -p 3010` (or LH_BASE_URL)
 * Usage: node --env-file=.env.local scripts/lighthouse-dashboard-auth.mjs
 */
import { createClient } from "@supabase/supabase-js"
import { writeFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const puppeteer = require("puppeteer")
const lighthouse = require("lighthouse").default || require("lighthouse")
const chromeLauncher = require("chrome-launcher")

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const OUT_DIR = path.join(ROOT, "_lighthouse-audit")
const BASE = process.env.LH_BASE_URL || "http://127.0.0.1:3010"
const PAGES = [
  { path: "/dashboard", name: "dashboard" },
  { path: "/dashboard/research", name: "research" },
  { path: "/dashboard/contracts", name: "contracts" },
]

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const email = `lh-audit-${Date.now()}@example.com`
const password = `LhAudit!${Date.now()}Aa1`

await mkdir(OUT_DIR, { recursive: true })

// Best-effort cleanup of prior failed runs (by metadata marker in full_name)
async function cleanupPriorTempUsers() {
  try {
    const { data } = await admin
      .from("user_profiles")
      .select("id")
      .eq("full_name", "Lighthouse Audit")
      .limit(20)
    for (const row of data ?? []) {
      await admin.from("user_profiles").delete().eq("id", row.id)
      await admin.auth.admin.deleteUser(row.id)
    }
  } catch {
    /* ignore */
  }
}
await cleanupPriorTempUsers()

console.log("Creating temp user…")
const { data: created, error: createErr } = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { full_name: "Lighthouse Audit" },
})
if (createErr) {
  console.error(createErr)
  process.exit(1)
}
const userId = created.user.id

const { error: profileErr } = await admin.from("user_profiles").upsert({
  id: userId,
  full_name: "Lighthouse Audit",
  role: "lawyer",
  preferred_jurisdiction: "serbia",
  subscription_tier: "professional",
  subscription_status: "active",
})
if (profileErr) console.warn("profile upsert:", profileErr.message)

const summaries = []
let chrome

try {
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  })

  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`,
    defaultViewport: null,
  })
  const page = await browser.newPage()
  page.setDefaultTimeout(90000)

  const loginRes = await page.goto(`${BASE}/login`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  })
  console.log("Login page status:", loginRes?.status(), "url:", page.url())
  await page.waitForSelector("input#email, input[name='email']", {
    visible: true,
    timeout: 30000,
  })
  await page.click("input#email")
  await page.type("input#email", email, { delay: 5 })
  await page.click("input#password")
  await page.type("input#password", password, { delay: 5 })

  await page.click('button[type="submit"]')
  await page.waitForFunction(
    () => !window.location.pathname.includes("/login"),
    { timeout: 90000 },
  )
  console.log("After login URL:", page.url())
  await page.close()
  browser.disconnect()

  for (const form of ["mobile", "desktop"]) {
    for (const p of PAGES) {
      console.log(`\n=== Lighthouse ${form} ${p.path} ===`)
      const opts = {
        logLevel: "error",
        port: chrome.port,
        output: ["json", "html"],
        onlyCategories: ["performance"],
        disableStorageReset: true,
      }
      if (form === "desktop") {
        opts.preset = "desktop"
      } else {
        opts.formFactor = "mobile"
        opts.screenEmulation = {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        }
      }

      const result = await lighthouse(`${BASE}${p.path}`, opts)
      const report = result.lhr
      const outName = `${p.name}-${form}`
      const reports = Array.isArray(result.report)
        ? result.report
        : [result.report]
      await writeFile(
        path.join(OUT_DIR, `${outName}.json`),
        typeof reports[0] === "string" ? reports[0] : JSON.stringify(report),
      )
      if (reports[1]) {
        await writeFile(path.join(OUT_DIR, `${outName}.html`), reports[1])
      }

      const audits = report.audits || {}
      const opportunities = Object.values(audits)
        .filter(
          (a) =>
            a.details?.type === "opportunity" && (a.numericValue ?? 0) > 50,
        )
        .sort((a, b) => (b.numericValue ?? 0) - (a.numericValue ?? 0))
        .slice(0, 3)
        .map((a) => ({
          id: a.id,
          title: a.title,
          savingsMs: Math.round(a.numericValue ?? 0),
        }))

      const lcpEl = audits["largest-contentful-paint-element"]
      const lcpElement =
        lcpEl?.details?.items?.[0]?.node?.snippet ||
        lcpEl?.details?.items?.[0]?.node?.selector ||
        lcpEl?.displayValue ||
        null

      const finalUrl = report.finalDisplayedUrl || report.finalUrl || ""
      const summary = {
        page: p.path,
        form,
        score: Math.round((report.categories?.performance?.score ?? 0) * 100),
        lcpMs: Math.round(
          audits["largest-contentful-paint"]?.numericValue ?? 0,
        ),
        lcpElement,
        tbtMs: Math.round(audits["total-blocking-time"]?.numericValue ?? 0),
        opportunities,
        finalUrl,
        redirectedToLogin: /\/login/.test(finalUrl),
      }
      summaries.push(summary)
      console.log(JSON.stringify(summary, null, 2))
    }
  }
} catch (err) {
  console.error("Audit failed:", err)
  summaries.push({ error: String(err?.message || err) })
} finally {
  try {
    if (chrome) await chrome.kill()
  } catch {
    /* Windows temp cleanup can EPERM */
  }
  console.log("\nCleaning up temp user…")
  try {
    await admin.from("user_profiles").delete().eq("id", userId)
    await admin.auth.admin.deleteUser(userId)
  } catch (e) {
    console.warn("cleanup:", e?.message || e)
  }
}

await writeFile(
  path.join(OUT_DIR, "summary.json"),
  JSON.stringify(
    { generatedAt: new Date().toISOString(), base: BASE, summaries },
    null,
    2,
  ),
)
console.log("\nDone → _lighthouse-audit/summary.json")
