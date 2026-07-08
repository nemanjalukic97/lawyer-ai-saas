import fs from "fs"
import crypto from "crypto"
import path from "path"
import { fileURLToPath } from "url"
import { Client } from "pg"
import dotenv from "dotenv"

import { getScriptVariants } from "../lib/serbianTransliteration"

dotenv.config({ path: ".env.local" })

const DATABASE_URL = process.env.DATABASE_URL

const CASE_LAW_TABLE = "public.case_law"

const LABOR_FAMILIES = [
  "termination",
  "employment",
  "wages",
  "severance",
  "leave",
  "discipline",
  "schedule",
  "zor_citation",
  "cooccurrence_poslodavac_zaposleni",
] 

/**
 * Evidence phrases grouped into families.
 *
 * Important: we use multiple independent families + scoring rules
 * to avoid false positives like divorce mentions of "zarada" once.
 */
const LABOR_EVIDENCE = {
  termination: [
    "otkaz ugovora o radu",
    "otkaz ugovora o radu",
    "prestanak radnog odnosa",
    "prestanak radnog odnosa",
    "prestank rada",
    "prestank radnog odnosa",
    "prestank radnog odnosa",
    "prestanak radnog odnosa",
    "otkaz radnog odnosa",
    "otkaz ugovora",
    "otkaz ugovora o radu zbog",
  ],
  employment: [
    "radni odnos",
    "radni odnosi",
    "ugovor o radu",
    "ugovor o radu",
    "ugovor o radu",
    "radnom odnosu",
  ],
  wages: [
    "zarada",
    "zarade",
    "zarad",
    "zaradа", // keep a close look for accidental mixed encodings
    "naknada zarade",
    "naknada plate",
  ],
  severance: [
    "otpremnina",
    "otpremnine",
    "otpremnine",
  ],
  leave: [
    "godišnji odmor",
    "godisnji odmor",
    "godišnji odmor",
    "neiskorišćeni godišnji odmor",
    "neiskorisćeni godisnji odmor",
  ],
  discipline: [
    "disciplinska",
    "disciplinski",
    "disciplinski postupak",
    "disciplinski prestanak",
    "disciplinska odgovornost",
  ],
  schedule: [
    "raspoređivanje",
    "rasporedjivanje",
    "rasporedivanje",
    "raspored",
  ],
  zor_citation: [
    "zakon o radu",
    "zakon o radu",
    "zor",
    "ZOR",
    "zakon o radu (",
  ],
  cooccurrence_poslodavac_zaposleni: [
    // This family is computed by co-occurrence, not by a single substring.
    "__COOCCUR__",
  ],
}

function normalizeText(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
}

function phraseVariants(phrase) {
  // We also match diacritic-insensitive Latin forms through the
  // Serbian transliteration helper (Cyrillic <-> Latin).
  const vars = getScriptVariants(phrase)
  return vars.map(normalizeText).filter(Boolean)
}

function buildEvidenceMatchers() {
  const matchers = {}
  for (const family of LABOR_FAMILIES) {
    const phrases = LABOR_EVIDENCE[family] ?? []
    if (family === "cooccurrence_poslodavac_zaposleni") {
      matchers[family] = null
      continue
    }
    const variantList = []
    for (const p of phrases) {
      if (!p) continue
      for (const v of phraseVariants(p)) variantList.push(v)
    }
    // Unique + stable order
    matchers[family] = [...new Set(variantList)].sort((a, b) => b.length - a.length)
  }
  return matchers
}

const EVIDENCE_MATCHERS = buildEvidenceMatchers()

function includesAny(haystackNorm, needlesNormArray) {
  for (const needle of needlesNormArray) {
    if (needle && haystackNorm.includes(needle)) return true
  }
  return false
}

function findMatchedSignals(haystackNorm) {
  const matchedFamilies = []
  const matchedPhrasesByFamily = {}

  for (const family of LABOR_FAMILIES) {
    if (family === "cooccurrence_poslodavac_zaposleni") continue
    const needles = EVIDENCE_MATCHERS[family]
    if (!needles || needles.length === 0) continue

    // Capture which substrings actually matched (best-effort).
    const hits = []
    for (const n of needles) {
      if (n && haystackNorm.includes(n)) hits.push(n)
      if (hits.length >= 6) break
    }
    if (hits.length > 0) {
      matchedFamilies.push(family)
      matchedPhrasesByFamily[family] = hits
    }
  }

  // Compute co-occurrence separately (poslodavac + zaposleni).
  const hasPoslodavac = includesAny(haystackNorm, phraseVariants("poslodavac"))
  const hasZaposleni = includesAny(haystackNorm, phraseVariants("zaposleni"))
  if (hasPoslodavac && hasZaposleni) {
    matchedFamilies.push("cooccurrence_poslodavac_zaposleni")
    matchedPhrasesByFamily["cooccurrence_poslodavac_zaposleni"] = [
      "poslodavac",
      "zaposleni",
    ]
  }

  return { matchedFamilies, matchedPhrasesByFamily }
}

function classifyLaborRow(row) {
  const haystack = normalizeText([
    row.legal_question,
    row.court_position,
    row.reasoning,
    Array.isArray(row.keywords) ? row.keywords.join(" ") : row.keywords,
  ].join("\n"))

  const { matchedFamilies, matchedPhrasesByFamily } =
    findMatchedSignals(haystack)

  const has = (family) => matchedFamilies.includes(family)

  const termination = has("termination")
  const employment = has("employment") || has("cooccurrence_poslodavac_zaposleni")
  const wages = has("wages")
  const severance = has("severance")
  const leave = has("leave")
  const discipline = has("discipline")
  const schedule = has("schedule")
  const zor = has("zor_citation")

  // Point system (for reporting only).
  // Strong signals:
  // - termination: +4
  // - ZOR citation: +3
  // Co-occurrence: +2
  let score = 0
  if (termination) score += 4
  if (zor) score += 3
  if (has("cooccurrence_poslodavac_zaposleni")) score += 2
  if (employment && !has("cooccurrence_poslodavac_zaposleni")) score += 2
  if (wages) score += 1
  if (severance) score += 1
  if (leave) score += 1
  if (discipline) score += 1
  if (schedule) score += 1

  // Multi-signal rules to prevent false positives:
  // 1) termination + ZOR => labor
  // 2) termination + (wages|severance|leave|discipline|employment) => labor
  // 3) employment + (wages|severance|leave) => labor
  // 4) >=2 families among (employment,wages,severance,leave,discipline,schedule) => labor
  // 5) co-occurrence alone is not enough; it must be supported.
  const supportFamilies = [
    employment ? "employment" : null,
    wages ? "wages" : null,
    severance ? "severance" : null,
    leave ? "leave" : null,
    discipline ? "discipline" : null,
    schedule ? "schedule" : null,
  ].filter(Boolean)

  let isLabor = false
  if (termination && zor) isLabor = true
  else if (
    termination &&
    (wages || severance || leave || discipline || employment)
  )
    isLabor = true
  else if (employment && (wages || severance || leave)) isLabor = true
  else if (supportFamilies.length >= 2) isLabor = true

  return {
    isLabor,
    score,
    matchedFamilies,
    matchedPhrasesByFamily,
  }
}

function stablePickSamples(rows, seedLabel, n) {
  // Deterministic "random" pick: compute a stable hash and pick the lowest.
  const seed = seedLabel
  const decorated = rows.map((r) => {
    const h = crypto
      .createHash("sha256")
      .update(`${seed}|${r.id}`)
      .digest("hex")
    return { h, r }
  })
  decorated.sort((a, b) => a.h.localeCompare(b.h))
  return decorated.slice(0, n).map((x) => x.r)
}

async function main() {
  console.log("Connected. Loading Montenegro case_law (read-only)...")

  let rows = []
  if (DATABASE_URL) {
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
    await client.connect()
    await client.query(`SET statement_timeout = 0`)
    ;({ rows } = await client.query(`
      SELECT
        id,
        jurisdiction,
        court,
        legal_area,
        case_number,
        legal_question,
        court_position,
        reasoning,
        keywords
      FROM ${CASE_LAW_TABLE}
      WHERE jurisdiction = 'montenegro'
    `))
    await client.end()
  } else {
    console.warn(
      "DATABASE_URL not set; falling back to supabaseAdmin (read-only).",
    )
    const { supabaseAdmin } = await import("../lib/supabase/admin")
    const pageSize = 1000
    let offset = 0
    for (;;) {
      const { data, error } = await supabaseAdmin
        .from("case_law")
        .select(
          "id,jurisdiction,court,legal_area,case_number,legal_question,court_position,reasoning,keywords",
        )
        .eq("jurisdiction", "montenegro")
        .range(offset, offset + pageSize - 1)
      if (error) throw error
      const chunk = data ?? []
      rows.push(...chunk)
      if (chunk.length < pageSize) break
      offset += pageSize
    }
  }

  console.log(`Loaded rows: ${rows.length}`)

  const results = []
  const flaggedIds = []

  const byCurrentArea = new Map()
  const byCourt = new Map()
  const scoreHistAll = new Map() // bucket -> count
  const scoreBuckets = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  function bucketForScore(s) {
    // Integer-ish buckets since our scoring is integral.
    // Clamp to last bucket.
    const ss = Math.max(0, Math.min(8, Math.round(s)))
    return ss
  }

  for (const row of rows) {
    const { isLabor, score, matchedFamilies, matchedPhrasesByFamily } =
      classifyLaborRow(row)

    results.push({
      id: row.id,
      case_number: row.case_number,
      court: row.court,
      currentLegalArea: row.legal_area,
      score,
      isLabor,
      matchedFamilies,
      matchedPhrasesByFamily,
      legal_question: row.legal_question,
    })

    const b = bucketForScore(score)
    scoreHistAll.set(b, (scoreHistAll.get(b) ?? 0) + 1)

    if (isLabor) {
      flaggedIds.push(row.id)
      byCurrentArea.set(
        row.legal_area,
        (byCurrentArea.get(row.legal_area) ?? 0) + 1,
      )
      byCourt.set(
        row.court,
        (byCourt.get(row.court) ?? 0) + 1,
      )
    }
  }

  const flagged = results.filter((r) => r.isLabor)
  const nonFlagged = results.filter((r) => !r.isLabor)
  const nonFlaggedCivil = nonFlagged.filter((r) => r.currentLegalArea === "civil")

  console.log("")
  console.log(`Flagged as labor: ${flagged.length} / ${results.length}`)

  console.log("")
  console.log("Flagged breakdown by current legal_area:")
  const areasSorted = [...byCurrentArea.entries()].sort((a, b) => b[1] - a[1])
  for (const [area, count] of areasSorted) {
    console.log(`  ${area}: ${count}`)
  }

  console.log("")
  console.log("Flagged breakdown by court:")
  const courtsSorted = [...byCourt.entries()].sort((a, b) => b[1] - a[1])
  for (const [court, count] of courtsSorted.slice(0, 25)) {
    console.log(`  ${court}: ${count}`)
  }

  console.log("")
  console.log("Score distribution (all rows):")
  for (const bucket of scoreBuckets) {
    console.log(`  score ~= ${bucket}: ${scoreHistAll.get(bucket) ?? 0}`)
  }

  // Samples for eyeballing.
  const flaggedSample = stablePickSamples(flagged, "flagged-sample", 30)
  const nonFlaggedCivilSample = stablePickSamples(
    nonFlaggedCivil,
    "nonflagged-civil-sample",
    30,
  )

  const flaggedOut = flaggedSample.map((r) => ({
    id: r.id,
    case_number: r.case_number,
    court: r.court,
    legal_area: r.currentLegalArea,
    score: r.score,
    matchedFamilies: r.matchedFamilies,
    matchedPhrasesByFamily: r.matchedPhrasesByFamily,
    legal_question: (r.legal_question ?? "").slice(0, 2500),
  }))

  const nonFlaggedOut = nonFlaggedCivilSample.map((r) => ({
    id: r.id,
    case_number: r.case_number,
    court: r.court,
    legal_area: r.currentLegalArea,
    score: r.score,
    matchedFamilies: r.matchedFamilies,
    matchedPhrasesByFamily: r.matchedPhrasesByFamily,
    legal_question: (r.legal_question ?? "").slice(0, 2500),
  }))

  fs.writeFileSync(
    "scripts/reclassify-montenegro-labor-flagged-samples.json",
    JSON.stringify(flaggedOut, null, 2),
    "utf8",
  )
  fs.writeFileSync(
    "scripts/reclassify-montenegro-labor-nonflagged-civil-samples.json",
    JSON.stringify(nonFlaggedOut, null, 2),
    "utf8",
  )

  // Also output the full ID list (flagged) so the next gate can apply updates.
  // Gate 1 is dry-run: the presence of this file does not mean anything is written.
  fs.writeFileSync(
    "scripts/reclassified-montenegro-ids.json",
    JSON.stringify(flaggedIds, null, 2),
    "utf8",
  )

  console.log("")
  console.log("Wrote sample files + reclassified ids list for the next gate:")
  console.log("  scripts/reclassify-montenegro-labor-flagged-samples.json")
  console.log("  scripts/reclassify-montenegro-labor-nonflagged-civil-samples.json")
  console.log("  scripts/reclassified-montenegro-ids.json")
}

export { classifyLaborRow }

const __filename = fileURLToPath(import.meta.url)
const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)

if (isDirectRun) {
  await main()
}

