/**
 * Run: npx tsx --test lib/dialectMerge.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import { DIALECT_PAIRS } from "./dialectPairs"
import {
  buildKeywordIlikePatterns,
  dialectStemNearMisses,
  mergeDialectNeedles,
} from "./keywordVariants"

const APPROVED = [
  "svjedok",
  "svedok",
  "zahtjev",
  "zahtev",
  "predsjednik",
  "predsednik",
  "donijet",
  "donet",
  "razmjenu",
  "razmenu",
  "upotrijebljeni",
  "upotrebljeni",
  "prosječne",
  "prosečne",
  "posljednje",
  "poslednje",
  "rješenja",
  "rešenja",
] as const

test("the constant is the 78 measured pairs and does not include mjesto", () => {
  assert.equal(DIALECT_PAIRS.length, 78)
  const surfaces = new Set<string>(DIALECT_PAIRS.flatMap((pair) => [pair.ije, pair.eka]))
  assert.equal(surfaces.size, 156)
  assert.equal(surfaces.has("mjesto"), false)
  assert.equal(surfaces.has("mesto"), false)
  for (const spelling of APPROVED) {
    assert.equal(surfaces.has(spelling), true, spelling)
  }
})

test("slovenia does not expand svjedok and phrase patterns stay put", () => {
  const patterns = buildKeywordIlikePatterns("svjedok na sudu", {
    maxSynonymExpansions: 0,
  })
  const before = patterns.contentTokens.map((token) => ({
    surface: token.surface,
    variants: [...token.variants],
    stems: [...token.stems],
  }))
  const exact = [...patterns.exactPatterns]
  const stem = [...patterns.stemPatterns]
  mergeDialectNeedles(patterns, "slovenia")
  for (const spelling of ["Slovenia", " slovenia "]) {
    const again = buildKeywordIlikePatterns("svjedok na sudu", {
      maxSynonymExpansions: 0,
    })
    mergeDialectNeedles(again, spelling)
    assert.equal(
      again.contentTokens.find((token) => token.surface === "svjedok")?.variants.includes("svedok"),
      false,
      spelling,
    )
  }
  assert.deepEqual(
    patterns.contentTokens.map((token) => ({
      surface: token.surface,
      variants: [...token.variants],
      stems: [...token.stems],
    })),
    before,
  )
  assert.deepEqual(patterns.exactPatterns, exact)
  assert.deepEqual(patterns.stemPatterns, stem)
})

test("serbia adds the svedok needles to the svjedok token only", () => {
  const patterns = buildKeywordIlikePatterns("svjedok na sudu", {
    maxSynonymExpansions: 0,
  })
  const exact = [...patterns.exactPatterns]
  const stem = [...patterns.stemPatterns]
  mergeDialectNeedles(patterns, "serbia")
  assert.equal(patterns.contentTokens.length, 2)
  const token = patterns.contentTokens.find((item) => item.surface === "svjedok")
  assert.ok(token)
  assert.equal(token.variants.includes("svedok"), true)
  assert.equal(token.variants.includes("сведок"), true)
  assert.equal(token.stems.includes("svedok"), true)
  const other = patterns.contentTokens.find((item) => item.surface === "sudu")
  assert.ok(other)
  assert.equal(other.variants.includes("svedok"), false)
  assert.deepEqual(patterns.exactPatterns, exact)
  assert.deepEqual(patterns.stemPatterns, stem)
  assert.equal(
    patterns.exactPatterns.some((pattern) => pattern.includes("svedok")),
    false,
  )
  assert.equal(
    patterns.stemPatterns.some((pattern) => pattern.includes("svedok")),
    false,
  )
  assert.equal(
    patterns.tokenFetchGroups.flat().some((pattern) => pattern.includes("сведок")),
    true,
  )
})

test("rješenje picks up the measured rešenja needles and stays one token", () => {
  const patterns = buildKeywordIlikePatterns("rješenje o izvršenju", {
    maxSynonymExpansions: 0,
  })
  const count = patterns.contentTokens.length
  mergeDialectNeedles(patterns, "bih_rs")
  assert.equal(patterns.contentTokens.length, count)
  const token = patterns.contentTokens.find((item) => item.surface === "rješenje")
  assert.ok(token)
  assert.equal(token.stems.includes("rešenj"), true)
  assert.equal(token.variants.includes("rešenja"), true)
})

test("no two pairs share a stem, and one-character neighbours are named", () => {
  assert.deepEqual(dialectStemNearMisses(), [
    {
      a: "djelimično/delimično ije",
      b: "djelomično/delomično ije",
      stemA: "djelimično",
      stemB: "djelomično",
    },
    {
      a: "djelimično/delimično eka",
      b: "djelomično/delomično eka",
      stemA: "delimično",
      stemB: "delomično",
    },
    {
      a: "primjenjivaće/primenjivaće ije",
      b: "primjenjivati/primenjivati ije",
      stemA: "primjenjivać",
      stemB: "primjenjivat",
    },
    {
      a: "primjenjivaće/primenjivaće eka",
      b: "primjenjivati/primenjivati eka",
      stemA: "primenjivać",
      stemB: "primenjivat",
    },
    {
      a: "donijeće/doneće ije",
      b: "donijet/donet ije",
      stemA: "donijeć",
      stemB: "donijet",
    },
    {
      a: "donijeće/doneće eka",
      b: "donijet/donet eka",
      stemA: "doneć",
      stemB: "donet",
    },
  ])
})
