/**
 * Run: npx tsx --test lib/articleMarker.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import { textCarriesArticleNumber } from "./articleMarker"

test("a heading in the first 200 characters carries that number", () => {
  assert.equal(textCarriesArticleNumber("Član 56\nTaksa se plaća.", "56"), true)
  assert.equal(textCarriesArticleNumber("Члан 2.\nОвај правилник ступа на снагу.", "2"), true)
})

test("the number glued to the next word still carries that number", () => {
  assert.equal(textCarriesArticleNumber("Члан 12Стабилна вредност", "12"), true)
  assert.equal(textCarriesArticleNumber("ствариЧлан 141. даље", "141"), true)
  assert.equal(textCarriesArticleNumber("Члан 2.Графичке приказе", "2"), true)
})

test("a heading past the first 200 characters still carries that number", () => {
  const rubric = "Службени гласник РС, број 34/2026-93. ".repeat(8)
  const text = `${rubric}\n\nЧлан 2.\n\nОвај правилник ступа на снагу.`
  assert.ok(text.indexOf("Члан 2") > 200)
  assert.equal(textCarriesArticleNumber(text, "2"), true)
})

test("a cross-reference abbreviation is not a marker for a different article", () => {
  const rs = "dopunjuju čl. 70. i 81. i briše stav 3. člana 49"
  assert.equal(textCarriesArticleNumber(rs, "140"), false)
  assert.equal(textCarriesArticleNumber(rs, "70"), true)
  assert.equal(textCarriesArticleNumber(rs, "81"), true)

  const archive = "регулисан је одредбама чл. 142‒153. Закона о државним службеницима"
  assert.equal(textCarriesArticleNumber(archive, "2"), false)
  assert.equal(textCarriesArticleNumber(archive, "142"), true)
  assert.equal(textCarriesArticleNumber(archive, "150"), true)
  assert.equal(textCarriesArticleNumber(archive, "153"), true)

  const annex = "Захтеви из чл. 5, 6, 7, 8. и 9."
  assert.equal(textCarriesArticleNumber(annex, "15"), false)
  assert.equal(textCarriesArticleNumber(annex, "5"), true)
  assert.equal(textCarriesArticleNumber(annex, "9"), true)
})

test("a range abbreviation carries both endpoints and the articles between them", () => {
  assert.equal(textCarriesArticleNumber("Чл. 312-313.", "312"), true)
  assert.equal(textCarriesArticleNumber("Чл. 312-313.", "313"), true)
  assert.equal(textCarriesArticleNumber("Чл. 191-195.", "193"), true)
  assert.equal(textCarriesArticleNumber("Odredbe čl. 85. do 89. Ustava", "87"), true)
  assert.equal(textCarriesArticleNumber("Odredbe čl. 85. do 89. Ustava", "140"), false)
})

test("a different article number in a full heading is not this row's marker", () => {
  assert.equal(textCarriesArticleNumber("Члан 27. Тарифни број", "15"), false)
  assert.equal(textCarriesArticleNumber("Član 120", "12"), false)
})

test("letter suffixes, dotted numbers, and Slovene člen are the row's own marker", () => {
  assert.equal(textCarriesArticleNumber("Члан 180а Овај члан", "180а"), true)
  assert.equal(textCarriesArticleNumber("Član 10.2 dalje", "10.2"), true)
  assert.equal(textCarriesArticleNumber("10. člen ureja", "10"), true)
})
