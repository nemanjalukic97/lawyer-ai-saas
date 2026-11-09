/**
 * The six catalogues must carry the same keys.
 * A missing key falls through the requested language, then Serbian, then English.
 * Run: npx tsx --test lib/i18n/catalogueKeys.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"

import { MESSAGES } from "./messages"
import type { LanguageCode, Messages } from "./types"
import { lookupMessage } from "./translate"

const LANGS: LanguageCode[] = ["en", "sr", "bs", "hr", "sl", "me"]

function leafKeys(messages: Messages, prefix = ""): string[] {
  const keys: string[] = []
  for (const [key, value] of Object.entries(messages)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof value === "string") keys.push(path)
    else if (value && typeof value === "object") keys.push(...leafKeys(value, path))
  }
  return keys
}

function keySetReport(): string {
  const sets = new Map<LanguageCode, Set<string>>(
    LANGS.map((lang) => [lang, new Set(leafKeys(MESSAGES[lang]))]),
  )
  const union = new Set<string>()
  for (const set of sets.values()) {
    for (const key of set) union.add(key)
  }

  const lines: string[] = []
  for (const lang of LANGS) {
    const set = sets.get(lang)!
    const missing = [...union].filter((key) => !set.has(key)).sort()
    if (missing.length === 0) continue
    lines.push(`${lang} is missing ${missing.length} key(s) that another catalogue has:`)
    for (const key of missing) {
      const holders = LANGS.filter((other) => sets.get(other)!.has(key)).join(", ")
      lines.push(`  ${key}  (in ${holders})`)
    }
  }
  return lines.join("\n")
}

test("the six catalogues have identical key sets", () => {
  const report = keySetReport()
  assert.equal(report, "", report)
})

test("a missing key falls through the requested language, then sr, then en", () => {
  const catalogues = {
    en: {
      onlyEn: "from-en",
      shared: "en-shared",
      count: "Count {n}",
      gap: { nested: "en-nested" },
    },
    sr: {
      onlyEn: "from-sr",
      onlySr: "serbian",
      shared: "sr-shared",
    },
    bs: { shared: "bs-shared" },
    hr: { shared: "hr-shared" },
    sl: { shared: "sl-hit" },
    me: { shared: "me-shared" },
  } as Record<LanguageCode, Messages>

  assert.equal(lookupMessage(catalogues, "sl", "shared"), "sl-hit")
  assert.equal(lookupMessage(catalogues, "sl", "onlyEn"), "from-sr")
  assert.equal(lookupMessage(catalogues, "me", "gap.nested"), "en-nested")
  assert.equal(lookupMessage(catalogues, "sr", "gap.nested"), "en-nested")
  assert.equal(lookupMessage(catalogues, "en", "onlySr"), "serbian")
  assert.equal(lookupMessage(catalogues, "en", "onlyEn"), "from-en")
  assert.equal(lookupMessage(catalogues, "sl", "gap"), "gap")
  assert.equal(lookupMessage(catalogues, "hr", "missing.entirely"), "missing.entirely")
  assert.equal(lookupMessage(catalogues, "sl", "count", { n: 2 }), "Count 2")
  assert.equal(lookupMessage(catalogues, "sl", "count", {}), "Count {n}")
})
