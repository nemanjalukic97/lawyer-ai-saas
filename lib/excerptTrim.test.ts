/**
 * Display trim. Fixtures are stored text_local, selected read-only.
 * Run: npx tsx --test lib/excerptTrim.test.ts
 */
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import path from "node:path"
import test from "node:test"
import {
  excerptBadgeText,
  excerptRangeLabel,
  hasDamagedEnd,
  hasDamagedStart,
  trimExcerpt,
  type TrimmedExcerpt,
} from "./excerptTrim"
import { showsExcerptCard } from "./researchExcerptFlags"

type Fixture = {
  name: string
  id: string
  jurisdiction: string
  article_num: string
  is_excerpt: boolean
  texts_equal: boolean
  text: string
}

const fixtures = JSON.parse(
  readFileSync(path.join(__dirname, "excerptTrim.fixtures.json"), "utf8"),
) as Fixture[]

function fixture(name: string): Fixture {
  const row = fixtures.find((item) => item.name === name)
  if (!row) throw new Error(`missing fixture ${name}`)
  return row
}

function paint(name: string): { row: Fixture; trimmed: TrimmedExcerpt; badge: string } {
  const row = fixture(name)
  const trimmed = trimExcerpt(row.text, row.jurisdiction)
  return {
    row,
    trimmed,
    badge: excerptBadgeText(row.jurisdiction, trimmed, "Odlomak"),
  }
}

test("hasDamagedStart", () => {
  assert.equal(hasDamagedStart("vora o radu Član 94"), true)
  assert.equal(hasDamagedStart("5 (1) Otkazni rok ne može biti kraći"), true)
  assert.equal(hasDamagedStart("5\n(1) Otkazni rok"), true)
  assert.equal(hasDamagedStart("5. člen Besedilo člena."), false)
  assert.equal(hasDamagedStart("Ako radnik prihvati ponudu poslodavca"), false)
  assert.equal(hasDamagedStart(" Ako radnik prihvati ponudu"), false)
  assert.equal(hasDamagedEnd("Kraj."), false)
  assert.equal(hasDamagedEnd('Kraj:"'), false)
  assert.equal(hasDamagedEnd("Kraj:\n"), false)
  assert.equal(hasDamagedEnd("Ovaj ugovor j"), true)
})

test("dr, mr and prof are not sentence boundaries", () => {
  const text =
    "ostatak - dr. zakon, i dr. prava, mr. sci, prof. dr. ostaju " +
    "n".repeat(220) +
    ". Kraj recenice je ovde i ima dovoljno slova da predje cetiri stotine karaktera."
  const trimmed = trimExcerpt(text, "bih_fbih")
  assert.equal(trimmed.head + trimmed.body + trimmed.tail, text)
  assert.equal(trimmed.head, "")
  assert.equal(trimmed.headElided, true)
  assert.equal(trimmed.body.startsWith("ostatak - dr. zakon"), true)
})

test("a rubrika at 150 beats an enumerator at 2", () => {
  const opening = "z\n(1) " + "n".repeat(142)
  assert.equal(opening.length, 148)
  const text =
    opening +
    ". " +
    "Naslov odredbe " +
    "Član 9 Tekst odredbe je dovoljno dug. " +
    "nastavak bez kraja"
  const trimmed = trimExcerpt(text, "bih_fbih")
  assert.equal(trimmed.head + trimmed.body + trimmed.tail, text)
  assert.equal(trimmed.head.length, 150)
  assert.equal(trimmed.head.includes("(1)"), true)
  assert.equal(trimmed.body.startsWith("Naslov odredbe Član 9"), true)
  assert.equal(trimmed.bodyStartsAtMarker, true)
  assert.equal(trimmed.headElided, false)
})

test("an enumerator counts only when it starts a provision", () => {
  const gloss =
    "deset (10) radnih dana po članu 96. stav 1. tač. a. ostaju ovde. " +
    "Nastavak recenice je citav. " +
    "x".repeat(220)
  const glossed = trimExcerpt(gloss, "bih_fbih")
  assert.equal(glossed.head + glossed.body + glossed.tail, gloss)
  assert.equal(glossed.body.startsWith("Nastavak recenice"), true)
  assert.equal(glossed.head.includes("(10) radnih dana"), true)
  assert.equal(glossed.head.includes("96. stav"), true)

  const numbered =
    "ostatak (član 71.),\n47. ne vrati radnika na posao " + "x".repeat(220)
  assert.equal(
    trimExcerpt(numbered, "bih_fbih").body.startsWith("47. ne vrati radnika"),
    true,
  )

  const lined =
    "ostatak recenice\n(2) Poslodavac može otkazati " + "x".repeat(220)
  assert.equal(
    trimExcerpt(lined, "bih_fbih").body.startsWith("(2) Poslodavac može"),
    true,
  )
})

test("a sentence boundary at 167 loses to an enumerator at 2", () => {
  const prefix = "5\n(1) "
  const text =
    prefix +
    "n".repeat(159) +
    ". Druga recenica ide dalje " +
    "m".repeat(300)
  assert.equal(prefix.length + 159 + 2, 167)
  const trimmed = trimExcerpt(text, "bih_fbih")
  assert.equal(trimmed.head + trimmed.body + trimmed.tail, text)
  assert.equal(trimmed.head, "5\n")
  assert.equal(trimmed.body.startsWith("(1) "), true)
  assert.equal(trimmed.headElided, false)
  assert.equal(trimmed.bodyStartsAtMarker, false)
})

test("a tail over 200 characters is elided and its markers stay in the body", () => {
  const closing = "Član 99 " + "b".repeat(220)
  const text = "Uvod je ostecen. Član 98 Tekst clana. " + closing
  assert.ok(closing.length > 200)
  const trimmed = trimExcerpt(text, "bih_fbih")
  assert.equal(trimmed.head + trimmed.body + trimmed.tail, text)
  assert.equal(trimmed.tail, "")
  assert.equal(trimmed.tailElided, true)
  assert.deepEqual(trimmed.articleNums, ["98", "99"])
})

test("markers are jurisdiction-specific", () => {
  const croatia = "nastavak Članak 4 " + "n".repeat(80) + ". " + "y".repeat(450)
  assert.deepEqual(trimExcerpt(croatia, "croatia").articleNums, ["4"])
  assert.deepEqual(trimExcerpt(croatia, "bih_fbih").articleNums, [])

  const slovenia = "uvod 12. člen Besedilo odredbe. " + "y".repeat(450)
  assert.deepEqual(trimExcerpt(slovenia, "slovenia").articleNums, ["12"])
  assert.deepEqual(trimExcerpt(slovenia, "bih_fbih").articleNums, [])

  const serbia = "uvod Члан 12 текст odredbe. " + "y".repeat(450)
  assert.deepEqual(trimExcerpt(serbia, "serbia").articleNums, ["12"])
  assert.deepEqual(trimExcerpt(serbia, "bih_fbih").articleNums, [])
})

test("the range label uses the full article word and an en dash", () => {
  assert.equal(excerptRangeLabel("bih_fbih", ["94", "96"]), "Član 94\u201396")
  assert.equal(excerptRangeLabel("croatia", ["94", "96"]), "Članak 94\u201396")
  assert.equal(excerptRangeLabel("slovenia", ["94", "96"]), "94.\u201396. člen")
  assert.equal(excerptRangeLabel("slovenia", ["5"]), "5. člen")
  assert.equal(excerptRangeLabel("serbia", ["3", "6"]), "Члан 3\u20136")
  assert.equal(excerptRangeLabel("bih_fbih", ["111"]), "Član 111")
  assert.equal(excerptRangeLabel("bih_fbih", []), null)
  const partial: TrimmedExcerpt = {
    head: "",
    body: "",
    tail: "",
    articleNums: ["106", "107"],
    bodyStartsAtMarker: false,
    headElided: false,
    tailElided: false,
  }
  assert.equal(
    excerptBadgeText("bih_fbih", partial, "Odlomak"),
    "Odlomak \u00b7 Član 106\u2013107",
  )
})

test("head, body and tail concatenate to the original on every fixture", () => {
  for (const row of fixtures) {
    const trimmed = trimExcerpt(row.text, row.jurisdiction)
    assert.equal(trimmed.head + trimmed.body + trimmed.tail, row.text, row.name)
  }
})

test("the twelve logged windows", () => {
  const w30 = paint("fbih-30")
  assert.equal(w30.trimmed.head, "vora o radu\n")
  assert.equal(w30.trimmed.body.startsWith("Član 94"), true)
  assert.equal(w30.trimmed.bodyStartsAtMarker, true)
  assert.equal(w30.badge, "Član 94–96")

  const w32 = paint("fbih-32")
  assert.equal(w32.trimmed.head.startsWith("vi radni odnos.\n(2) U slučaju"), true)
  assert.equal(w32.trimmed.head.length, 184)
  assert.equal(
    w32.trimmed.body.startsWith("Rok za otkaz ugovora o radu bez poštivanja otkaznog roka"),
    true,
  )
  assert.equal(w32.trimmed.bodyStartsAtMarker, true)
  assert.equal(w32.badge, "Član 100–104")

  const w25 = paint("fbih-25")
  assert.equal(w25.trimmed.body.startsWith("Otkaz ugovora o radu radniku sa"), true)
  assert.equal(w25.trimmed.bodyStartsAtMarker, true)
  assert.equal(w25.badge, "Član 74–76")

  const w33 = paint("fbih-33")
  assert.equal(w33.trimmed.head, "5\n")
  assert.match(w33.trimmed.body, /Otkazni rok ne može biti kraći od sedam dana/)
  assert.equal(w33.trimmed.body.startsWith("(1) "), true)
  assert.equal(w33.badge, "Odlomak · Član 106–107")

  const w31 = paint("fbih-31")
  assert.equal(w31.trimmed.body.startsWith("Otkaz poslodavca bez obaveze"), true)
  assert.equal(w31.trimmed.bodyStartsAtMarker, true)
  assert.equal(w31.badge, "Član 97\u201399")
  assert.equal(w31.trimmed.tail, "")
  assert.equal(w31.trimmed.tailElided, true)
  assert.match(w31.trimmed.body, /Član 98/)
  assert.match(w31.trimmed.body, /Član 99/)

  const w8 = paint("fbih-8")
  assert.equal(w8.trimmed.body.startsWith("(3) Ugovor o radu"), true)
  assert.equal(w8.trimmed.bodyStartsAtMarker, false)
  assert.equal(w8.badge, "Odlomak · Član 23–24")

  const w50 = paint("fbih-50")
  assert.equal(w50.trimmed.headElided, false)
  assert.equal(w50.trimmed.body.startsWith("47. ne vrati radnika"), true)
  assert.equal(w50.trimmed.tail, "")
  assert.equal(w50.trimmed.tailElided, true)
  assert.equal(w50.badge, "Odlomak")

  const w34 = paint("fbih-34")
  assert.equal(w34.trimmed.head, "")
  assert.equal(w34.trimmed.headElided, false)
  assert.equal(w34.trimmed.body.startsWith(" Ako radnik prihvati"), true)
  assert.equal(w34.trimmed.tail, "")
  assert.equal(w34.trimmed.tailElided, true)
  assert.equal(w34.badge, "Odlomak · Član 108–110")

  const w35 = paint("fbih-35")
  assert.equal(w35.trimmed.headElided, true)
  assert.equal(w35.trimmed.head, "")
  assert.equal(w35.trimmed.body.startsWith("ca, prekvalifikacija"), true)
  assert.match(w35.trimmed.body, /Član 111/)
  assert.equal(w35.badge, "Odlomak · Član 111")

  const w29 = paint("fbih-29")
  assert.equal(w29.trimmed.body.startsWith("(2) Ako štetu"), true)
  assert.equal(w29.badge, "Odlomak · Član 90–93")

  const bylaw = paint("rs-pravilnik")
  assert.equal(bylaw.trimmed.headElided, true)
  assert.equal(bylaw.trimmed.head, "")
  assert.equal(bylaw.trimmed.body.startsWith("i sposobnosti"), true)
  assert.match(bylaw.trimmed.tail, /Ovaj ugovor j/)
  assert.equal(bylaw.badge, "Odlomak")

  const harassment = paint("rs-uznemiravanje")
  assert.equal(harassment.trimmed.headElided, true)
  assert.equal(harassment.trimmed.head, "")
  assert.equal(harassment.trimmed.body.startsWith("ava i obaveza"), true)
  assert.equal(harassment.trimmed.tail, "")
  assert.equal(harassment.trimmed.tailElided, true)
  assert.match(harassment.trimmed.body, /Član 27/)
  assert.equal(harassment.badge, "Odlomak · Član 25–27")
})

test("an old unsplit Serbia window is trimmed", () => {
  const { row, trimmed, badge } = paint("serbia-window")
  assert.equal(row.is_excerpt, true)
  assert.equal(row.texts_equal, true)
  assert.ok(row.text.length >= 1500)
  assert.equal(hasDamagedStart(row.text), true)
  assert.equal(trimmed.head + trimmed.body + trimmed.tail, row.text)
  assert.notEqual(trimmed.body, row.text)
  assert.equal(trimmed.body.startsWith("Члан 3."), true)
  assert.equal(trimmed.bodyStartsAtMarker, true)
  assert.equal(badge, "Члан 3–6")
})

test("a clean Serbia article part with the excerpt predicate is unchanged", () => {
  const { row, trimmed } = paint("serbia-part")
  assert.equal(row.is_excerpt, true)
  assert.equal(row.texts_equal, true)
  assert.equal(
    showsExcerptCard({
      is_excerpt: row.is_excerpt,
      text: row.text,
      text_local: row.text,
    }),
    true,
  )
  assert.equal(hasDamagedStart(row.text), false)
  assert.equal(hasDamagedEnd(row.text), false)
  assert.equal(trimmed.head, "")
  assert.equal(trimmed.tail, "")
  assert.equal(trimmed.headElided, false)
  assert.equal(trimmed.tailElided, false)
  assert.equal(trimmed.body, row.text)
})

test("clean Montenegro and split Serbia rows pass through", () => {
  for (const name of ["montenegro", "serbia-split"]) {
    const { row, trimmed } = paint(name)
    assert.equal(row.is_excerpt, false, name)
    assert.equal(
      showsExcerptCard({
        is_excerpt: row.is_excerpt,
        text: row.text,
        text_local: row.text,
      }),
      false,
      name,
    )
    assert.equal(hasDamagedStart(row.text), false, name)
    assert.equal(hasDamagedEnd(row.text), false, name)
    assert.equal(trimmed.head, "", name)
    assert.equal(trimmed.tail, "", name)
    assert.equal(trimmed.headElided, false, name)
    assert.equal(trimmed.tailElided, false, name)
    assert.equal(trimmed.body, row.text, name)
  }
})

test("one damaged window from Brčko, Croatia and Slovenia is trimmed", () => {
  const brcko = paint("brcko")
  assert.equal(brcko.trimmed.headElided, false)
  assert.equal(brcko.trimmed.head.length, 138)
  assert.match(brcko.trimmed.head, /\(10\) radnih dana/)
  assert.equal(brcko.trimmed.body.startsWith("(2) Prije usvajanja"), true)
  assert.equal(brcko.trimmed.tailElided, true)
  assert.match(brcko.badge, /^Odlomak · Član /)

  const croatia = paint("croatia")
  assert.equal(croatia.trimmed.headElided, true)
  assert.equal(croatia.trimmed.head, "")
  assert.equal(croatia.trimmed.tailElided, true)
  assert.equal(croatia.trimmed.tail, "")
  assert.equal(croatia.trimmed.body.startsWith(croatia.row.text.slice(0, 20)), true)
  assert.match(croatia.badge, /^Odlomak · Članak /)

  const slovenia = paint("slovenia")
  assert.equal(slovenia.trimmed.headElided, true)
  assert.equal(slovenia.trimmed.head, "")
  assert.equal(slovenia.trimmed.body.startsWith("a)"), true)
  assert.equal(slovenia.trimmed.tailElided, true)
  assert.equal(slovenia.badge, "Odlomak · 80.\u201381. člen")
})
