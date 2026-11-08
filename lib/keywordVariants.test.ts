/**
 * The dismissal stem pattern has to match text that continues past the last word.
 * Run: npx tsx --test lib/keywordVariants.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import {
  buildKeywordIlikePatterns,
  matchesIlikePattern,
  scoreKeywordPatternMatch,
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

test("a stem pattern that already ends in % keeps a single trailing wildcard", () => {
  const patterns = buildKeywordIlikePatterns("otkaz ugovora", {
    maxSynonymExpansions: 0,
  })
  const stem = patterns.stemPatterns.find((pattern) => pattern.includes("otkaz"))
  assert.ok(stem)
  assert.equal(stem.endsWith("%"), true)
  assert.equal(stem.endsWith("%%"), false)
})
