/**
 * Display titles. Run: npx tsx --test lib/lawNameDisplay.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import dotenv from "dotenv"
import { classifyActType } from "./actType"

dotenv.config({ path: ".env.local" })
import { normaliseLawName } from "./lawNameDisplay"
import type { LegalChunk } from "./legalRag"

function same(name: string) {
  assert.equal(normaliseLawName(name), name, name)
  assert.equal(normaliseLawName(normaliseLawName(name)), name, name)
}

test("a glued act type gains one space and case endings stay", () => {
  assert.equal(
    normaliseLawName("PRAVILNIKO OBRASCIMA UGOVORA O RADU"),
    "PRAVILNIK O OBRASCIMA UGOVORA O RADU",
  )
  assert.equal(
    normaliseLawName("KRIVIČNI ZAKONIKREPUBLIKE SRPSKE"),
    "KRIVIČNI ZAKONIK REPUBLIKE SRPSKE",
  )
  assert.equal(normaliseLawName("USTAVREPUBLIKE SRPSKE"), "USTAV REPUBLIKE SRPSKE")
  assert.equal(normaliseLawName("USTAVCRNE GORE"), "USTAV CRNE GORE")
  assert.equal(normaliseLawName("ZAKLjUČAKVLADE"), "ZAKLJUČAK VLADE")
  assert.equal(normaliseLawName("STATUTBRČKO"), "STATUT BRČKO")
  assert.equal(
    normaliseLawName("IZBORNI ZAKONBOSNE I HERCEGOVINE"),
    "IZBORNI ZAKON BOSNE I HERCEGOVINE",
  )
  for (const kept of ["ZAKONA O RADU", "ZAKONOM", "USTAVA", "UREDBOM", "Zakon o radu"]) {
    same(kept)
  }
  assert.equal(classifyActType("PRAVILNIKO REGISTRACIJI I PRENOSU HARTIJA OD VRIJEDNOSTI").actType, "pravilnik")
})

test("the near-misses that the wider rules would have broken stay", () => {
  same("УПУТСТВО")
  same("УПУТСТВО о раду")
  same("Zakon o spremembah in dopolnitvah Ustavo")
  same("Zakon o cestah (ZCes-2)")
  same("Energetski zakon (uradno prečiščeno besedilo)")
  same("Energetski zakon (uradno prečiščeno besedilo) (EZ-1-UPB2)")
  same("ZAKON O KOOPERATIVAMA")
  same("ZAKON O DOO")
  same("Zakon o Njegošu")
  same("Njegoš")
  same("Ljudske")
  same("Ljudske pravice")
  same("ZAKON O RADU*")
  same("Редакцијски пречишћен текст")
})

test("a digraph is raised only before an uppercase letter", () => {
  assert.equal(
    normaliseLawName("PRAVILNIKO LETAČKOM OSOBLjU"),
    "PRAVILNIK O LETAČKOM OSOBLJU",
  )
  assert.equal(
    normaliseLawName("ZAKON O ZAŠTITI OD UZNEMIRAVANjA NA RADU"),
    "ZAKON O ZAŠTITI OD UZNEMIRAVANJA NA RADU",
  )
  same("ZAKON O UNUTRAŠNJOJ TRGOVINI")
  same("ZAKON O BUDŽETU I FISKALNOJ ODGOVORNOSTI")
})

test("a gazette citation is cut and the words after a closed one stay", () => {
  assert.equal(
    normaliseLawName('ZAKON O RADU("Sl. novine FBiH", br. 26/2016, 89/2018)'),
    "ZAKON O RADU",
  )
  assert.equal(
    normaliseLawName('ZAKON O KOMUNALNIM DJELATNOSTIMA ("Sl. glasnik Brčko distrikta BiH", br. 12/08'),
    "ZAKON O KOMUNALNIM DJELATNOSTIMA",
  )
  assert.equal(
    normaliseLawName(
      "ЗАКОН о просторном плану од 2025. године („Службени гласник Републике Србије”, број 47/21) до 2027. године",
    ),
    "ЗАКОН о просторном плану од 2025. године до 2027. године",
  )
  same("Zakon o ratifikaciji Protokola na podlagi člena 43(1) Konvencije (MPKEPS)")
})

test("an editorial banner is removed only when a title remains", () => {
  assert.equal(
    normaliseLawName("Редакцијски пречишћен текст ЗАКОН о коришћењу обновљивих извора енергије"),
    "ЗАКОН о коришћењу обновљивих извора енергије",
  )
  assert.equal(
    normaliseLawName(
      'Krivični zakon BiH – neslužbeni prečišćeni tekst („Službeni glasnik Bosne i Hercegovine”, br. 3/03)',
    ),
    "Krivični zakon BiH",
  )
})

test("the three exact lists are the stored string and nothing wider", () => {
  assert.equal(
    normaliseLawName(
      "ZAKON BOSNE I HERCEGOVINEO IZVRŠENJU KRIVIČNIH SANKCIJA, PRITVORA I DRUGIH MJERA",
    ),
    "ZAKON BOSNE I HERCEGOVINE O IZVRŠENJU KRIVIČNIH SANKCIJA, PRITVORA I DRUGIH MJERA",
  )
  assert.equal(
    normaliseLawName("OPŠTI ZAKON OOBRAZOVANjU I VASPITANjU"),
    "OPŠTI ZAKON O OBRAZOVANJU I VASPITANJU",
  )
  assert.equal(normaliseLawName("ZAKON OPOREZU NA DOBIT"), "ZAKON O POREZU NA DOBIT")
  assert.equal(
    normaliseLawName("ПРАВИЛНИ о утврђивању водних тела површинских и подземних вода"),
    "ПРАВИЛНИК о утврђивању водних тела површинских и подземних вода",
  )
  assert.equal(
    normaliseLawName("ZAKON O OGRANIČAVANJU UPOTREBE DUVANSKIH PROIZVODA*"),
    "ZAKON O OGRANIČAVANJU UPOTREBE DUVANSKIH PROIZVODA",
  )
  assert.equal(
    normaliseLawName("ZAKON O ZAŠTITI I ZDRAVLjU NA RADU*"),
    "ZAKON O ZAŠTITI I ZDRAVLJU NA RADU",
  )
  assert.equal(
    normaliseLawName(
      "ПРАВИЛНИК О МЕРАМА ЦАРИНСКОГ НАДЗОРА И О НАЧИНУ ВОЂЕЊА ЕВИДЕНЦИЈЕ У СЛОБОДНИМ И ЦАРИНСКИМ ЗОНАМА*",
    ),
    "ПРАВИЛНИК О МЕРАМА ЦАРИНСКОГ НАДЗОРА И О НАЧИНУ ВОЂЕЊА ЕВИДЕНЦИЈЕ У СЛОБОДНИМ И ЦАРИНСКИМ ЗОНАМА",
  )
})

test("a second pass changes nothing", () => {
  const names = [
    'ZAKON O RADU("Sl. novine FBiH", br. 26/2016, 89/2018)',
    "PRAVILNIKO LETAČKOM OSOBLjU",
    "OPŠTI ZAKON OOBRAZOVANjU I VASPITANjU",
    "ZAKON O ZAŠTITI I ZDRAVLjU NA RADU*",
    "Редакцијски пречишћен текст ЗАКОН о коришћењу обновљивих извора енергије",
  ]
  for (const name of names) {
    const once = normaliseLawName(name)
    assert.equal(normaliseLawName(once), once, name)
  }
})

test("the LAW line of a welded gazette is the act, and the body is the article", async () => {
  const { joinLegalChunksRaw } = await import("./legalRag")
  const stored = 'ZAKON O RADU("Sl. novine FBiH", br. 26/2016, 89/2018)'
  const chunk: LegalChunk = {
    id: "1",
    jurisdiction: "bih_fbih",
    law_name: stored,
    law_name_local: stored,
    law_category: "labor",
    article_num: "30",
    paragraph_num: null,
    is_excerpt: false,
    text: "Tekst odredbe.",
    text_local: "Tekst odredbe.",
    source_url: null,
    similarity: 0.9,
  }
  const raw = joinLegalChunksRaw([chunk])
  assert.equal(chunk.law_name_local, stored)
  assert.match(raw, /\[LAW: ZAKON O RADU \| ARTICLE: 30\]/)
  assert.match(raw, /Tekst odredbe\./)
  assert.doesNotMatch(raw, /Sl\. novine/)
})
