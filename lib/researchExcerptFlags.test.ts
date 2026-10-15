/**
 * Guards the card predicate. The second read that used to supply is_excerpt
 * is gone; the flag comes back on the search row. This file stays because
 * it is the predicate the card paints from.
 *
 * Run: npx tsx --test lib/researchExcerptFlags.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import { storedTextsMatch } from "./ragThresholds"
import { showsExcerptCard } from "./researchExcerptFlags"

const VAT_TEXT = "Član 9\nOvaj zakon stupa na snagu narednog dana od dana objavljivanja."

function paint(item: {
  is_excerpt?: boolean
  text: string
  text_local: string | null
  article_num: string
}) {
  const excerpt = showsExcerptCard(item)
  return {
    label: excerpt ? `Odlomak ${item.article_num}` : `Član ${item.article_num}`,
    disclaimer: excerpt
      ? "Odlomak iz teksta zakona — može biti presječen. Nije službeni prečišćeni tekst."
      : null,
    confidence: excerpt ? null : "87% Podudarnost",
  }
}

test("storedTextsMatch is the text comparison", () => {
  assert.equal(storedTextsMatch(VAT_TEXT, VAT_TEXT), true)
  assert.equal(storedTextsMatch(VAT_TEXT, "Upotreba usluga"), false)
  assert.equal(storedTextsMatch("", VAT_TEXT), false)
})

test("omitting the flag paints the cut-text card on a split row", () => {
  const painted = paint({
    text: VAT_TEXT,
    text_local: VAT_TEXT,
    article_num: "9",
  })
  assert.deepEqual(painted, {
    label: "Odlomak 9",
    disclaimer: "Odlomak iz teksta zakona — može biti presječen. Nije službeni prečišćeni tekst.",
    confidence: null,
  })
})

test("Montenegro with is_excerpt false paints Član and the confidence badge", () => {
  const painted = paint({
    is_excerpt: false,
    text: VAT_TEXT,
    text_local: VAT_TEXT,
    article_num: "9",
  })
  assert.equal(painted.label, "Član 9")
  assert.equal(painted.disclaimer, null)
  assert.equal(painted.confidence, "87% Podudarnost")
})

test("an unsplit row with is_excerpt true still paints the excerpt card", () => {
  const painted = paint({
    is_excerpt: true,
    text: VAT_TEXT,
    text_local: VAT_TEXT,
    article_num: "9",
  })
  assert.equal(painted.label, "Odlomak 9")
  assert.equal(painted.confidence, null)
})

test("is_excerpt true but texts differ paints Član", () => {
  const painted = paint({
    is_excerpt: true,
    text: "English translation",
    text_local: VAT_TEXT,
    article_num: "9",
  })
  assert.equal(painted.label, "Član 9")
  assert.equal(painted.disclaimer, null)
  assert.equal(painted.confidence, "87% Podudarnost")
})
