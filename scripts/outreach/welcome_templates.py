"""Welcome-sequence email templates and starter queries."""

JURISDICTIONS = (
    "serbia", "croatia", "bih_fbih", "bih_rs",
    "bih_brcko", "montenegro", "slovenia",
)

DEFAULT_JURISDICTION = "serbia"

STARTER_QUERY_BY_JURISDICTION = {
    "serbia": "otkazni rok",
    "croatia": "otkazni rok",
    "bih_fbih": "otkaz ugovora o radu",
    "bih_rs": "otkaz ugovora o radu",
    "bih_brcko": "otkaz ugovora o radu",
    "montenegro": "otkazni rok",
    "slovenia": "odpovedni rok",
}

# --- Touch 0 ---------------------------------------------------------------

_T0_EKAVICA = """{pozdrav} {ime},

Nemanja Lukić, osnivač Legantisa — javljam se lično jer platformu razvijam sam i svaki novi korisnik mi je bitan.

Ako imate dva minuta, predlažem da počnete od Pravnog istraživanja: ukucajte {primer_upita} i videćete tačan član zakona sa punim tekstom, plus relevantne sudske odluke. Baza sadrži zakone i praksu za Vašu jurisdikciju, ne uopštene odgovore.

Ako Vam nešto ne radi kako očekujete ili nedostaje neki propis — odgovorite direktno na ovaj mejl. Ja sam i podrška i razvoj u jednoj osobi, pa se stvari rešavaju brzo.

Srdačan pozdrav,
Nemanja Lukić
Legantis — legantis.app"""

_T0_IJEKAVICA = """{pozdrav} {ime},

Nemanja Lukić, osnivač Legantisa — javljam se lično jer platformu razvijam sam i svaki novi korisnik mi je bitan.

Ako imate dva minuta, predlažem da počnete od Pravnog istraživanja: ukucajte {primer_upita} i vidjećete tačan član zakona sa punim tekstom, plus relevantne sudske odluke. Baza sadrži zakone i praksu za Vašu jurisdikciju, ne uopštene odgovore.

Ako Vam nešto ne radi kako očekujete ili nedostaje neki propis — odgovorite direktno na ovaj mejl. Ja sam i podrška i razvoj u jednoj osobi, pa se stvari rješavaju brzo.

Srdačan pozdrav,
Nemanja Lukić
Legantis — legantis.app"""

_T0_HR = """{pozdrav} {ime},

Nemanja Lukić, osnivač Legantisa — javljam se osobno jer platformu razvijam sam i svaki novi korisnik mi je važan.

Ako imate dvije minute, predlažem da počnete od Pravnog istraživanja: upišite {primer_upita} i vidjet ćete točan članak zakona s punim tekstom, plus relevantne sudske odluke. Baza sadrži hrvatske propise i praksu, ne uopćene odgovore.

Ako Vam nešto ne radi kako očekujete ili nedostaje neki propis — odgovorite izravno na ovaj mail. Ja sam i podrška i razvoj u jednoj osobi, pa se stvari rješavaju brzo.

Srdačan pozdrav,
Nemanja Lukić
Legantis — legantis.app"""

_T0_SI = """{pozdrav} {ime},

Nemanja Lukić, ustanovitelj Legantisa — oglašam se osebno, ker platformo razvijam sam in vsak nov uporabnik mi veliko pomeni.

Če imate dve minuti, predlagam, da začnete pri Pravnem raziskovanju: vpišite {primer_upita} in videli boste točen člen zakona s celotnim besedilom ter relevantne sodne odločbe. Baza vsebuje slovenske predpise in sodno prakso, ne splošnih odgovorov.

Če kaj ne deluje po pričakovanjih ali kakšen predpis manjka — odgovorite neposredno na to sporočilo. Sem hkrati podpora in razvoj, zato se stvari rešujejo hitro.

Lep pozdrav,
Nemanja Lukić
Legantis — legantis.app"""

# --- Touch 2 ---------------------------------------------------------------

_T2_EKAVICA = """{ime}, samo kratko — vidim da još niste stigli da isprobate platformu, i to je potpuno u redu.

Jedno pitanje ako imate trenutak: šta bi Vam bilo najkorisnije da alat radi? Pretraga prakse po Vašoj oblasti, priprema podnesaka, praćenje rokova, nešto četvrto?

Pitam jer razvijam po onome što mi advokati traže, a ne po pretpostavkama. Jedna rečenica mi je dovoljna.

Nemanja"""

_T2_IJEKAVICA = """{ime}, samo kratko — vidim da još niste stigli da isprobate platformu, i to je potpuno u redu.

Jedno pitanje ako imate trenutak: šta bi Vam bilo najkorisnije da alat radi? Pretraga prakse po Vašoj oblasti, priprema podnesaka, praćenje rokova, nešto četvrto?

Pitam jer razvijam po onome što mi advokati traže, a ne po pretpostavkama. Jedna rečenica mi je dovoljna.

Nemanja"""

_T2_HR = """{ime}, samo kratko — vidim da još niste stigli isprobati platformu, i to je posve u redu.

Jedno pitanje ako imate trenutak: što bi Vam bilo najkorisnije da alat radi? Pretraga prakse po Vašem području, priprema podnesaka, praćenje rokova, nešto četvrto?

Pitam jer razvijam prema onome što mi odvjetnici traže, a ne prema pretpostavkama. Jedna rečenica mi je dovoljna.

Nemanja"""

_T2_SI = """{ime}, samo na kratko — vidim, da še niste utegnili preizkusiti platforme, in to je povsem v redu.

Eno vprašanje, če imate trenutek: kaj bi Vam bilo najbolj koristno, da orodje počne? Iskanje sodne prakse z Vašega področja, priprava vlog, spremljanje rokov, kaj četrtega?

Sprašujem, ker razvijam po tem, kar odvetniki povedo, ne po predpostavkah. Dovolj mi je en stavek.

Nemanja"""

# --- Touch 5 ---------------------------------------------------------------

_T5_EKAVICA = """{ime}, poslednji put Vas kontaktiram u vezi ovoga — ne želim da dosađujem.

Ponuda ostaje otvorena: ako Vam ikad zatreba, nalog Vam stoji i pristup ne gasim. A ako Vam je lakše da vidite uživo nego da sami istražujete, javite se pa Vam za 15 minuta preko poziva pokažem kako izgleda na jednom Vašem stvarnom predmetu. Bez ikakve obaveze.

U svakom slučaju — sve najbolje u radu.

Nemanja"""

_T5_IJEKAVICA = """{ime}, posljednji put Vas kontaktiram u vezi ovoga — ne želim da dosađujem.

Ponuda ostaje otvorena: ako Vam ikad zatreba, nalog Vam stoji i pristup ne gasim. A ako Vam je lakše da vidite uživo nego da sami istražujete, javite se pa Vam za 15 minuta preko poziva pokažem kako izgleda na jednom Vašem stvarnom predmetu. Bez ikakve obaveze.

U svakom slučaju — sve najbolje u radu.

Nemanja"""

_T5_HR = """{ime}, posljednji put Vas kontaktiram u vezi s ovim — ne želim dosađivati.

Ponuda ostaje otvorena: ako Vam ikad zatreba, račun Vam stoji i pristup ne gasim. A ako Vam je lakše vidjeti uživo nego sami istraživati, javite se pa Vam u 15 minuta preko poziva pokažem kako izgleda na jednom Vašem stvarnom predmetu. Bez ikakve obveze.

U svakom slučaju — sve najbolje u radu.

Nemanja"""

_T5_SI = """{ime}, zadnjič Vas nadlegujem s tem — ne želim biti vsiljiv.

Ponudba ostaja odprta: če boste kdaj potrebovali, račun Vam ostaja in dostopa ne ukinjam. Če pa Vam je lažje videti v živo kot sami raziskovati, se oglasite in Vam v 15 minutah prek klica pokažem, kako izgleda na enem Vašem resničnem primeru. Brez vsakršne obveznosti.

V vsakem primeru — vse dobro pri delu.

Nemanja"""

# --- Subjects --------------------------------------------------------------

_SUBJ_T0 = "Dobrodošli u Legantis, {ime}"
_SUBJ_T0_SI = "Dobrodošli v Legantis, {ime}"


def _t0(body, subject=_SUBJ_T0):
    return {"subject": subject, "body": body}


def _followup(body, subject=_SUBJ_T0):
    # Threaded reply — subject carries the Re: prefix at send time.
    return {"subject": subject, "body": body}


TEMPLATES = {
    "touch0": {
        "serbia":      _t0(_T0_EKAVICA),
        "croatia":     _t0(_T0_HR),
        "bih_fbih":    _t0(_T0_IJEKAVICA),
        "bih_rs":      _t0(_T0_IJEKAVICA),
        "bih_brcko":   _t0(_T0_IJEKAVICA),
        "montenegro":  _t0(_T0_IJEKAVICA),
        "slovenia":    _t0(_T0_SI, _SUBJ_T0_SI),
    },
    "touch2": {
        "serbia":      _followup(_T2_EKAVICA),
        "croatia":     _followup(_T2_HR),
        "bih_fbih":    _followup(_T2_IJEKAVICA),
        "bih_rs":      _followup(_T2_IJEKAVICA),
        "bih_brcko":   _followup(_T2_IJEKAVICA),
        "montenegro":  _followup(_T2_IJEKAVICA),
        "slovenia":    _followup(_T2_SI, _SUBJ_T0_SI),
    },
    "touch5": {
        "serbia":      _followup(_T5_EKAVICA),
        "croatia":     _followup(_T5_HR),
        "bih_fbih":    _followup(_T5_IJEKAVICA),
        "bih_rs":      _followup(_T5_IJEKAVICA),
        "bih_brcko":   _followup(_T5_IJEKAVICA),
        "montenegro":  _followup(_T5_IJEKAVICA),
        "slovenia":    _followup(_T5_SI, _SUBJ_T0_SI),
    },
}