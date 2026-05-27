const TEMPLATE_RE =
  /Koje pravno pitanje je razmatrao|Kakvo je pravno pitanje razmatrao|Koje procesno pitanje/i

const BOILERPLATE_RE =
  /^(?:P-Rev|U\.?\s*broj|Rev\s|Gž\.|Kž\.|Su\s*-|\d+\/\d{2,4}\s|VRHOVNI\s+SUD|UPRAVNI\s+SUD|VISOKI\s+SUD|u\s+vijeću\s+sastavljenom|Predsjednica\s+Visokog)/i

const MAX_LEN = 220
const INTRO_SCAN = 3500

function normalize(s) {
  return s.replace(/\s+/g, " ").trim()
}

function collapseLines(s) {
  return normalize(s.replace(/\r?\n/g, " "))
}

function cap(s, max = MAX_LEN) {
  const t = normalize(s)
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(" ")
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut
  return base.trim() + "…"
}

function ensureQuestion(s) {
  const t = normalize(s)
  if (!t) return t
  if (t.endsWith("?")) return t
  if (/^(Da li|Je li|Može li|Jesu li|Šta je|Koje su|Kako se)/i.test(t)) return t + "?"
  return t.endsWith(".") ? t.slice(0, -1) + "?" : t + "?"
}

function isValidCandidate(s) {
  if (!s || s.length < 15) return false
  if (!s.trim().endsWith("?")) return false
  if (TEMPLATE_RE.test(s)) return false
  if (/u predmetu\s+[A-Za-z0-9\-\/\s]+\?$/i.test(s)) return false
  if (BOILERPLATE_RE.test(s)) return false
  if (/u vijeću sastavljenom|kao predsjednika vijeća|kao član/i.test(s)) return false
  if (/OIB:|u pravnoj stvari podnositelj/i.test(s) && !/^Da li|^Je li|^Može li/i.test(s)) return false
  if (/^[\d./\s-]{8,}/.test(s)) return false
  return true
}

function accept(s) {
  const t = cap(normalize(s))
  return isValidCandidate(t) ? t : null
}

function extractExplicitQuestions(text) {
  const quoted = text.match(/[„""]([^„""]{20,400})\?["„""]/)
  if (quoted) {
    const q = accept(quoted[1] + "?")
    if (q) return q
  }

  const interrogative =
    /(?:Da\s+li|Je\s+li|Može\s+li|Jesu\s+li|Šta\s+je|Koje\s+su|Kako\s+se)[^?]{10,350}\?/gi
  let m
  while ((m = interrogative.exec(text))) {
    const q = accept(m[0])
    if (q) return q
  }

  const legalPhrase = /(?:pravn[aoe]\s+pitanj[aoe]|postavlja\s+se\s+pitanj)[^?]{0,350}\?/gi
  while ((m = legalPhrase.exec(text))) {
    const q = accept(m[0])
    if (q) return q
  }

  return null
}

function subjectFromRadi(text) {
  const radi = text.match(/radi\s+([^,\n]{10,120})/i)
  if (!radi) return null

  let subject = normalize(radi[1])
  subject = subject.replace(/\.$/, "")

  if (/zaštit[ae]\s+prav[a]?\s+na\s+suđenje\s+u\s+razumnom\s+roku/i.test(subject)) {
    return accept("Da li je podnositelj ostvario pravo na suđenje u razumnom roku?")
  }
  if (/pristup\s+informacij/i.test(subject)) {
    return accept("Da li je tužitelj ostvario pravo na pristup informacijama?")
  }
  if (/povrat\s+imovin/i.test(subject)) {
    return accept("Da li je tužitelj ostvario pravo na povrat imovine?")
  }
  if (/otkaz\s+ugovora\s+o\s+radu|ugovor\s+o\s+radu/i.test(subject)) {
    return accept("Da li je poslodavac mogao otkazati ugovor o radu?")
  }
  if (/poništaj|rješenj/i.test(subject)) {
    return accept("Da li je osnovan zahtjev za poništaj upravnog rješenja?")
  }
  if (/utvrđenj[a]?\s+prav[a]?\s+svojin/i.test(subject)) {
    return accept("Da li tužitelj ima pravo svojine na predmetnom imovini?")
  }
  if (/dozvol[ae]\s+revizij/i.test(subject)) {
    return accept("Da li je dopuštena revizija protiv drugostupanjske presude?")
  }
  if (/naknad/i.test(subject)) {
    return accept(`Da li tužitelj ima pravo na ${subject}?`)
  }
  if (/utvrđivanj/i.test(subject)) {
    return accept(`Da li je osnovan zahtjev radi ${subject}?`)
  }

  return accept(`Da li je osnovan zahtjev radi ${subject}?`)
}

const VERDICT_QUESTIONS = [
  [/Predlog\s+.*se\s+odbacuje|odbacuje\s+se\s+kao\s+nedozvoljen/i, "Da li je revizija dopuštena?"],
  [/Odbija\s+se\s+tužbeni\s+zahtjev|Tužbeni\s+zahtjev\s+se\s+odbija|Tužba\s+se\s+odbija/i, "Da li je tužbeni zahtjev osnovan?"],
  [/Usvaja\s+se\s+tužb|Tužbeni\s+zahtjev\s+se\s+usvaja|Tužba\s+se\s+usvaja/i, "Da li je tužbeni zahtjev osnovan?"],
  [/Odbija\s+se\s+žalb|Žalba\s+se\s+odbija/i, "Da li je žalba osnovana?"],
  [/Usvaja\s+se\s+žalb|Uvažava\s+se\s+žalb/i, "Da li je žalba osnovana?"],
  [/Potvrđuje\s+se|POTVRĐUJE\s+SE/i, "Da li je nižestupanjska odluka pravilna?"],
  [/Preinačuje\s+se|Preinačava\s+se|preinačava\s+se/i, "Da li je nižestupanjska odluka pogrešna?"],
  [/Ukida\s+se|ukida\s+se/i, "Da li je nižestupanjska odluka nezakonita?"],
  [/dužan\s+je\s+donijeti\s+odluku/i, "Da li sud mora donijeti odluku u razumnom roku?"],
  [/Odbacuje\s+se|odbacuje\s+se/i, "Da li je tužba dopuštena?"],
  [/Usvaja\s+se\s+prijedlog|Usvaja\s+se\s+zahtjev/i, "Da li je podneseni zahtjev osnovan?"],
  [/Odbija\s+se\s+prijedlog|Odbija\s+se\s+zahtjev/i, "Da li je podneseni zahtjev osnovan?"],
  [/prihvaća\s+se\s+revizij/i, "Da li je revizija osnovana?"],
  [/odbija\s+se\s+revizij/i, "Da li je revizija osnovana?"],
  [/kaznen\w+\s+djel/i, "Da li su ispunjeni elementi kaznenog djela?"],
  [/pritvor/i, "Da li su ispunjeni uvjeti za pritvor?"],
]

function questionFromIzreka(izreka) {
  const iz = normalize(
    izreka
      .replace(/^(P\s*R\s*E\s*S\s*U\s*D\s*[AU]|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|PRESUDA|RJEŠENJE)\s*/i, "")
      .replace(/\b(?:p\s*r\s*e\s*s\s*u\s*d\s*i\s*o|r\s*i\s*j\s*e\s*š\s*i\s*o)\s+j\s*e\b/i, ""),
  )

  for (const [re, q] of VERDICT_QUESTIONS) {
    if (re.test(iz)) return accept(q)
  }

  const operative = iz.match(
    /(?:Odbija\s+se|Usvaja\s+se|Potvrđuje\s+se|Preinačuje\s+se|Ukida\s+se|Odbacuje\s+se|Predlog)[^.]{0,180}\./i,
  )
  if (operative) {
    const sentence = normalize(operative[0])
    const q = accept(ensureQuestion(sentence.replace(/^[^,]+,\s*/, "")))
    if (q) return q
  }

  const sentences = iz.split(/(?<=[.!])\s+/).filter(
    (s) => s.length > 25 && !BOILERPLATE_RE.test(s) && !/u vijeću|predsjednika vijeća/i.test(s),
  )
  if (sentences.length) {
    const combined = sentences.slice(0, 2).join(" ")
    const q = accept(ensureQuestion(combined))
    if (q) return q
  }

  return null
}

function questionFromObrazlozenje(body) {
  const obIdx = body.search(/\bObrazloženje\b/i)
  if (obIdx === -1) return null

  const chunk = normalize(body.slice(obIdx + 12, obIdx + 900))
  const sentences = chunk.split(/(?<=[.!])\s+/).filter((s) => s.length > 30)
  for (const s of sentences.slice(0, 4)) {
    if (/tužitelj|tuženik|podnositelj|protustranka|žalitelj|tužb|zahtjev|spor|revizij/i.test(s)) {
      const q = accept(ensureQuestion(s))
      if (q) return q
    }
  }
  return null
}

function lastResort(collapsedBody, izreka) {
  const fromRadi = subjectFromRadi(collapsedBody.slice(0, INTRO_SCAN))
  if (fromRadi) return fromRadi

  const izQ = questionFromIzreka(izreka)
  if (izQ) return izQ

  return "Da li je sud pravilno primijenio mjerodavno pravo?"
}

/**
 * Extract a genuine legal question from decision text.
 * @param {{ body: string, izreka: string, prepareText?: (s: string) => string }} opts
 */
export function extractLegalQuestion({ body, izreka, prepareText = (s) => s }) {
  const full = prepareText(body)
  const iz = prepareText(izreka)
  const collapsed = collapseLines(full)
  const intro = collapsed.slice(0, INTRO_SCAN)

  return (
    extractExplicitQuestions(collapsed) ||
    subjectFromRadi(intro) ||
    subjectFromRadi(collapsed.slice(0, INTRO_SCAN * 2)) ||
    questionFromIzreka(iz) ||
    questionFromObrazlozenje(collapsed) ||
    lastResort(collapsed, iz)
  )
}
