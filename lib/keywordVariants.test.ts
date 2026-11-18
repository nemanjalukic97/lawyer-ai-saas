/**
 * The dismissal stem pattern has to match text that continues past the last word.
 * Run: npx tsx --test lib/keywordVariants.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import {
  KEYWORD_IDF_WEIGHTED_PATH,
  aggregateKeywordIdfWeightState,
  buildKeywordIlikePatterns,
  keywordIdfLogFields,
  keywordIdfWeightState,
  keywordWeightedCoverage,
  matchesIlikePattern,
  scoreGatedKeywordPartial,
  scoreKeywordPartialFromCoverage,
  scoreKeywordPatternMatch,
  type KeywordContentToken,
  type KeywordIdfWeightState,
} from "./keywordVariants"

test("the dismissal stem pattern ends in % and matches a sentence that continues past radu", () => {
  const patterns = buildKeywordIlikePatterns("otkaz ugovora o radu", {
    maxSynonymExpansions: 0,
  })
  const stem = patterns.stemPatterns.find((pattern) => pattern.includes("otkaz"))
  assert.ok(stem)
  assert.equal(stem.endsWith("%"), true)
  assert.equal(stem.includes(" o radu%"), true)

  const haystack = "Poslodavac može otkazati ugovor o radu uz otkazni rok."
  assert.equal(matchesIlikePattern(haystack, stem), true)
  assert.equal(scoreKeywordPatternMatch(haystack, patterns)?.channel, "keyword_stem")
})

test("a complete idf weight vector still scores uniform coverage", () => {
  assert.equal(KEYWORD_IDF_WEIGHTED_PATH, false)
  const tokens: KeywordContentToken[] = [
    { surface: "diskriminacija", variants: ["diskriminacija"], stems: [] },
    { surface: "radnom", variants: ["radnom"], stems: [] },
    { surface: "mjestu", variants: ["mjestu"], stems: [] },
  ]
  const weights = [1, 1, 100]
  assert.equal(keywordIdfWeightState(weights, tokens.length), "gated")
  assert.ok(keywordWeightedCoverage([true, true, false], weights) < 0.5)
  const uniform = scoreKeywordPartialFromCoverage(2, 3, false)
  const gated = scoreGatedKeywordPartial({
    useSqlPartial: true,
    idfWeights: weights,
    contentTokens: tokens,
    textLocal: "",
    sqlMatchedCount: 2,
    sqlTokenCount: 3,
    contiguous: false,
  })
  assert.deepEqual(gated, uniform)
  assert.equal(gated?.channel, "keyword_partial")
  assert.equal(
    scoreGatedKeywordPartial({
      useSqlPartial: false,
      idfWeights: weights,
      contentTokens: tokens,
      textLocal: "mjestu",
      sqlMatchedCount: 2,
      sqlTokenCount: 3,
      contiguous: false,
    }),
    null,
  )
})

test("idf weight log names missing, gated, and applied, and the boolean agrees", () => {
  const states: KeywordIdfWeightState[] = ["missing", "gated", "applied"]
  for (const state of states) {
    const fields = keywordIdfLogFields(state)
    assert.equal(fields.idf_weights, state)
    assert.equal(fields.idf_fallback, state !== "applied")
  }
  assert.equal(keywordIdfWeightState(null, 3), "missing")
  assert.equal(keywordIdfWeightState([1], 3), "missing")
  assert.equal(aggregateKeywordIdfWeightState(["gated", "missing"]), "missing")
  assert.equal(aggregateKeywordIdfWeightState(["applied", "gated"]), "gated")
  assert.equal(aggregateKeywordIdfWeightState(["applied", "applied"]), "applied")
})

test("a stem pattern that already ends in % keeps a single trailing wildcard", () => {
  const patterns = buildKeywordIlikePatterns("otkaz ugovora", {
    maxSynonymExpansions: 0,
  })
  const stem = patterns.stemPatterns.find((pattern) => pattern.includes("otkaz"))
  assert.ok(stem)
  assert.equal(stem.endsWith("%"), true)
  assert.equal(stem.endsWith("%%"), false)
})
