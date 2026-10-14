/**
 * The apparatus classifier has to be able to fail.
 * Run: npx tsx --test lib/provisionKind.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import { provisionKind } from "./provisionKind"

test("a force clause inside the first 180 characters, at most 450 long, with no numbered item, is a commencement", () => {
  const text = "Član 9 Ovaj zakon stupa na snagu osmog dana od dana objavljivanja."
  assert.equal(provisionKind(text), "commencement")
})

test("a repeal opens with the day of entry into force and says the law ceases to apply", () => {
  const text = "Danom stupanja na snagu ovog zakona prestaje da važi Zakon o porezu."
  assert.equal(provisionKind(text), "repeal")
})

test("a transitional clause opens with the provisions of an article and uses the future tense", () => {
  const text = "Odredbe člana 24 primjenjivaće se od 1. januara 2018. godine."
  assert.equal(provisionKind(text), "transitional")
})

test("the same force clause past character 180 stays operative", () => {
  const lead = "Pravna lica obračunavaju porez na dodatu vrijednost po pravilima ovog zakona i vode evidenciju o prometu. ".repeat(2)
  const text = `${lead}Ovaj zakon stupa na snagu osmog dana od dana objavljivanja.`
  assert.equal(provisionKind(text), "operative")
})

test("a numbered item keeps a force clause operative", () => {
  const text = "Ovaj zakon stupa na snagu osmog dana. 1) Primjena počinje narednog mjeseca."
  assert.equal(provisionKind(text), "operative")
})

test("Serbia article bce8747d is a commencement because the force clause starts at character 179", () => {
  const text = "Закон о изменама и допунама Закона о примањима народних посланика и изабраних функционера у Народној скупштини Републике Србије: \"Службени гласник РС\", број 68/1991-2833\n\nЧлан 17.\n\nОвај закон ступа на снагу наредног дана од дана објављивања у \"Службеном гласнику Републике Србије\", изузев одредаба члана 7. овог закона које се примењују од 1. августа 1991. године."
  assert.equal(provisionKind(text), "commencement")
})

test("Serbia article d4d79d4c stays operative because the same force clause starts at character 180", () => {
  const text = "Oдлука о изменама Одлуке о условима и начину одобравања банкама краткорочних кредита за ликвидност на основу залоге хартија од вредности: \"Службени гласник РС\", број 98/2020-72\n\n2. Ова одлука ступа на снагу наредног дана од дана објављивања у „Службеном гласнику Републике Србије”."
  assert.equal(provisionKind(text), "operative")
})
