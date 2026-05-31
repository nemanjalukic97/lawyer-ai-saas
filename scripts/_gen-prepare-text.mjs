/** Shared PDF / OCR text cleanup for case-law generators. */

const CYR_TRIP = [
  ["Љ", "Lj"],
  ["љ", "lj"],
  ["Њ", "Nj"],
  ["њ", "nj"],
  ["Џ", "Dž"],
  ["џ", "dž"],
]

const CYR_ONE = {
  А: "A", а: "a", Б: "B", б: "b", В: "V", в: "v", Г: "G", г: "g", Д: "D", д: "d",
  Ђ: "Đ", ђ: "đ", Е: "E", е: "e", Ж: "Ž", ж: "ž", З: "Z", з: "z", И: "I", и: "i",
  Ј: "J", ј: "j", К: "K", к: "k", Л: "L", л: "l", М: "M", м: "m", Н: "N", н: "n",
  О: "O", о: "o", П: "P", п: "p", Р: "R", р: "r", С: "S", с: "s", Т: "T", т: "t",
  Ћ: "Ć", ћ: "ć", У: "U", у: "u", Ф: "F", ф: "f", Х: "H", х: "h", Ц: "C", ц: "c",
  Ч: "Č", ч: "č", Ш: "Š", ш: "š",
}

export function cyrToLatin(s) {
  let out = ""
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2)
    const tr = CYR_TRIP.find((x) => x[0] === two)
    if (tr) {
      out += tr[1]
      i++
      continue
    }
    out += CYR_ONE[s[i]] ?? s[i]
  }
  return out
}

export function scrubCyrillicRuns(s) {
  return s.replace(/[\u0400-\u04FF]+/g, (chunk) => cyrToLatin(chunk))
}

/** Collapse "P R E S U D U" / "p r e s u d i o j e" letter-spacing artifacts. */
export function deSpacePdfArtifact(s) {
  return s.replace(
    /((?:[A-Za-z\u0400-\u04FF]\s+){2,}[A-Za-z\u0400-\u04FF])/g,
    (chunk) => chunk.replace(/\s+/g, ""),
  )
}

/** Fix "vije ć u", "Br č ko", "Gligorevi ć". */
export function fixDiacriticSpacing(s) {
  let out = s
  for (let i = 0; i < 4; i++) {
    out = out.replace(/([A-Za-z])\s+([čćđšžČĆĐŠŽ])\s+([A-Za-z])/g, "$1$2$3")
    out = out.replace(/([A-Za-z])\s+([čćđšžČĆĐŠŽ])(?=\s|[,.;:!?)]|$)/g, "$1$2")
    out = out.replace(/(?<=[\s(]|^)([čćđšžČĆĐŠŽ])\s+([A-Za-z])/g, "$1$2")
  }
  return out
}

/** Join hyphenation breaks: "poslov dav - ca" → "poslovdavca" is wrong; merge soft breaks. */
export function fixHyphenBreaks(s) {
  return s.replace(/([a-zšđčćžA-ZŠĐČĆŽ])\s*-\s*([a-zšđčćž])/g, "$1$2")
}

/** Merge syllable splits common in bilten PDFs: "raz li ku" → "razliku". */
export function fixSyllableBreaks(s) {
  let out = s
  for (let i = 0; i < 6; i++) {
    out = out.replace(
      /([a-zšđčćž]{2,})\s+([a-zšđčćž]{1,3})(?=\s+[a-zšđčćž])/gi,
      "$1$2",
    )
  }
  return out
}

export function collapseWhitespace(s) {
  return s.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, " ").replace(/\s+/g, " ").trim()
}

export function prepareText(raw) {
  if (!raw) return ""
  let s = scrubCyrillicRuns(String(raw))
  s = deSpacePdfArtifact(s)
  s = fixDiacriticSpacing(s)
  s = fixHyphenBreaks(s)
  s = fixSyllableBreaks(s)
  return collapseWhitespace(s)
}

/** Legacy alias used in some generators. */
export function cleanSnippet(s, max) {
  const t = prepareText(s)
  if (typeof max === "number" && max > 0) return t.slice(0, max)
  return t
}

const OBRAZLOZENJE_RE =
  /\bObrazloženje\b|\bObrazložitev\b|O\s+b\s+r\s+a\s+z\s+l\s+o\s+ž\s+e\s+n\s+j\s+e|O\s+b\s+r\s+a\s+z\s+l\s+o\s+ž\s+i\s+t\s+e\s+v|О\s+б\s+р\s+а\s+з\s+л\s+о\s+ж\s+е\s+њ\s+е/i

export function extractObrazlozenje(text) {
  if (!text) return ""
  const m = text.match(OBRAZLOZENJE_RE)
  if (!m || m.index == null) return ""
  return prepareText(text.slice(m.index))
}

export function stripDispositifHeading(s) {
  return prepareText(
    s.replace(
      /^\s*(P\s*R\s*E\s*S\s*U\s*D\s*A|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|PRESUDA|RJEŠENJE|p\s*r\s*e\s*s\s*u\s*d\s*i\s*o|r\s*i\s*j\s*e\s*š\s*i\s*o)\s*(?:je)?\s*/i,
      "",
    ),
  )
}

/** BiH RS / Cyrillic sources: full izreka + obrazloženje after latin conversion. */
export function summarizeCyrillicCase(full, izrekaCyr, convert, fallbackReasoning) {
  const toLat = (s) => prepareText(convert(s))
  let cp = toLat(izrekaCyr).replace(
    /^\s*(P\s+R\s+E\s+S\s+U\s+D\s+U|R\s+J\s+E\s+Š\s+E\s+N\s+J\s+E)\s*/i,
    "",
  )
  if (!cp) cp = toLat(full)
  const obraz = extractObrazlozenje(toLat(full))
  const reasoning = obraz.length >= 120 ? obraz : fallbackReasoning
  return {
    court_position: cp,
    reasoning,
    headnote: cp.slice(0, 180),
  }
}

/** BiH-style summarize: full izreka + obrazloženje, no length caps. */
export function summarizeBihCase(full, iz, fallbackReasoning) {
  let cp = stripDispositifHeading(iz)
  if (!cp || /^BOSNA I HERCEGOVINA/i.test(cp)) {
    cp = prepareText(full)
  }
  const obraz = extractObrazlozenje(full)
  const reasoning = obraz.length >= 120 ? obraz : fallbackReasoning
  return {
    court_position: cp,
    reasoning,
    headnote: cp.slice(0, 180),
  }
}
