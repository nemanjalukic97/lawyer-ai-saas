/**
 * Regenerate all case-law TypeScript libraries from downloads/ PDFs.
 *
 * Usage:
 *   node scripts/run-all-case-law.mjs              # all regions
 *   node scripts/run-all-case-law.mjs croatia serbia # subset
 *
 * Then update Supabase (embeddings) — see package.json ingest-case-law:update-all
 */
import { spawn } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")

/** Research filter id → run scripts (DB jurisdiction keys in parentheses). */
const REGIONS = {
  croatia: [
    "run-croatia-vrhovni.mjs",
    "run-croatia-visoki-kazneni.mjs",
    "run-croatia-visoki-upravni.mjs",
    "run-croatia-vts.mjs",
    "run-croatia-visoki-prekrsajni.mjs",
  ],
  serbia: ["run-serbia-vrhovni.mjs"],
  montenegro: [
    "run-montenegro-vrhovni.mjs",
    "run-montenegro-apelacioni.mjs",
    "run-montenegro-upravni.mjs",
    "run-montenegro-privredni.mjs",
  ],
  /** UI: bih_federation → DB bih_fbih */
  bih_fbih: [
    "run-bih-fbih-gradjansko.mjs",
    "run-bih-fbih-upravno.mjs",
    "run-bih-fbih-krivicno.mjs",
  ],
  /** UI: bih_rs */
  bih_rs: [
    "run-bih-rs-gradjansko.mjs",
    "run-bih-rs-upravno.mjs",
    "run-bih-rs-14-24.mjs",
  ],
  /** UI: bih_brcko */
  bih_brcko: [
    "run-bih-brcko-gradjansko.mjs",
    "run-bih-brcko-krivicno.mjs",
    "run-bih-brcko-upravno.mjs",
    "run-bih-brcko-sudjenje.mjs",
    "run-bih-brcko-ocjene.mjs",
  ],
}

function runNodeScript(scriptName) {
  const scriptPath = path.join(__dirname, scriptName)
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    })
    child.on("error", reject)
    child.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${scriptName} exited with code ${code}`))
    })
  })
}

const requested = process.argv.slice(2).filter((a) => !a.startsWith("--"))
const regions =
  requested.length > 0
    ? requested.filter((r) => {
        if (!REGIONS[r]) {
          console.error(`Unknown region "${r}". Valid: ${Object.keys(REGIONS).join(", ")}`)
          process.exit(1)
        }
        return true
      })
    : Object.keys(REGIONS)

console.log(`\n📚 Case-law regen — regions: ${regions.join(", ")}\n`)

const failed = []
for (const region of regions) {
  console.log(`\n=== ${region} ===\n`)
  for (const script of REGIONS[region]) {
    console.log(`▶ ${script}`)
    try {
      await runNodeScript(script)
      console.log(`✓ ${script}\n`)
    } catch (err) {
      console.error(`✗ ${script}:`, err.message)
      failed.push({ region, script, err })
    }
  }
}

if (failed.length) {
  console.error("\nFailed scripts:")
  for (const f of failed) console.error(`  - ${f.region} / ${f.script}`)
  process.exit(1)
}

console.log("\n▶ rebuild-case-law-index.mjs")
await runNodeScript("rebuild-case-law-index.mjs")

console.log("\n✅ All requested regen scripts finished.")
console.log(
  "Next: npm run ingest-case-law:update-all   (or --update-jurisdictions=… for one country)\n",
)
