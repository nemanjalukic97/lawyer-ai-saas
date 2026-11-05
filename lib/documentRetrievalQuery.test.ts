/**
 * Run: npx tsx --test lib/documentRetrievalQuery.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import {
  retrievalQueryForDocument,
  SHORT_RETRIEVAL_DOCUMENT_TYPES,
} from "./documentRetrievalQuery"

const BCS = [
  "serbia",
  "montenegro",
  "croatia",
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
]

test("BCS jurisdictions share the Serbian Latin employment label", () => {
  for (const jurisdiction of BCS) {
    assert.equal(
      retrievalQueryForDocument("employment", jurisdiction),
      "Ugovor o radu",
    )
  }
})

test("the six BCS document labels", () => {
  assert.deepEqual(
    [
      "nda",
      "employment",
      "power_of_attorney",
      "sales",
      "lease",
      "service",
    ].map((type) => retrievalQueryForDocument(type, "serbia")),
    [
      "Ugovor o povjerljivosti",
      "Ugovor o radu",
      "Punomoć",
      "Ugovor o prodaji",
      "Ugovor o zakupu",
      "Ugovor o pružanju usluga",
    ],
  )
})

test("Slovenia uses its own labels", () => {
  assert.equal(
    retrievalQueryForDocument("employment", "slovenia"),
    "Pogodba o zaposlitvi",
  )
  assert.equal(
    retrievalQueryForDocument("nda", "slovenia"),
    "Pogodba o nerazkritju",
  )
  assert.notEqual(
    retrievalQueryForDocument("sales", "slovenia"),
    retrievalQueryForDocument("sales", "serbia"),
  )
})

test("an unknown type or jurisdiction has no retrieval phrase", () => {
  assert.equal(retrievalQueryForDocument("employment", "france"), null)
  assert.equal(retrievalQueryForDocument("will", "serbia"), null)
})

test("only types measured better than the form dump are enabled", () => {
  assert.equal(SHORT_RETRIEVAL_DOCUMENT_TYPES.has("employment"), true)
  assert.equal(SHORT_RETRIEVAL_DOCUMENT_TYPES.has("power_of_attorney"), true)
  for (const type of ["nda", "sales", "lease", "service"]) {
    assert.equal(SHORT_RETRIEVAL_DOCUMENT_TYPES.has(type), false)
    assert.equal(typeof retrievalQueryForDocument(type, "serbia"), "string")
  }
})
