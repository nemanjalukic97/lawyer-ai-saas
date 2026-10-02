#!/usr/bin/env python3
"""
Legantis — Parser: Crna Gora (advokatska ortačka društva + zajedničke
advokatske kancelarije)

Izvor: dva Word (.docx) fajla preuzeta sa sajta Advokatske komore Crne Gore:
  - SPISAK_ADVOKATSKIH_ORTACKIH_DRUSTAVA.docx
  - SPISAK_ZAJEDNICKIH_ADVOKATSKIH_KANCELARIJA.docx

Ovi fajlovi NISU tabele — to je tekst po paragrafima u ovom obrascu:

    PODGORICA:                                          <- naziv grada (svi caps)
    AOD "Babović - Vujisić", ul. Serdara Jola Piletića br.5   <- naziv firme/adresa
    Babović mr Marica, tel. 067/356-088, e-mail: x@y.me      <- advokat 1
    Vujisić Gorica, tel. 069/016-523, e-mail: z@w.me         <- advokat 2

Email ponekad "prelama" na sljedeću liniju (npr. nakon dugog broja
telefona), pa parser spaja po dva susjedna paragrafa kad prvi nema email
a drugi (kratak, izgleda kao nastavak) ima.

Stavi oba .docx fajla u isti folder kao ova skripta prije pokretanja.

KORIŠTENJE:
    python scrape_crna_gora.py
"""

import re
import sys
from pathlib import Path

from docx import Document

from outreach_common import EMAIL_REGEX, deduplicate, append_to_master

DOCX_FILES = [
    "SPISAK_ADVOKATSKIH_ORTACKIH_DRUSTAVA.docx",
    "SPISAK_ZAJEDNICKIH_ADVOKATSKIH_KANCELARIJA.docx",
]
JURISDICTION_LABEL = "crna_gora"
SOURCE_LABEL = "Advokatska komora Crne Gore (docx spiskovi)"

# Red prepoznajemo kao "naziv grada" ako je u potpunosti velikim slovima
# (uz dozvoljene razmake/crtice/dvotačke), npr. "PODGORICA:", "B A R:", "N I K Š I Ć:"
CITY_LINE_RE = re.compile(r"^[A-ZŠĐČĆŽ\s\-:]+:?\s*$")

# Red koji počinje sa "AOD" ili "Zajednička advokatska kancelarija" je naziv
# firme, ne ime advokata — preskačemo ga za potrebe izvlačenja imena, ali ga
# čuvamo kao "naziv firme" za adresu/kontekst ako zatreba.
FIRM_LINE_RE = re.compile(r"^(AOD|Zajedni[čc]ka advokatska kancelarija)", re.IGNORECASE)


def clean_city_name(line: str) -> str:
    # "B A R:" -> "Bar", "PODGORICA:" -> "Podgorica"
    name = line.replace(":", "").strip()
    name = re.sub(r"\s+", "", name)  # ukloni razmake unutar imena grada ("B A R" -> "BAR")
    return name.title()


def extract_rows_from_docx(path: Path):
    doc = Document(str(path))
    paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

    rows_out = []
    current_city = ""

    i = 0
    while i < len(paragraphs):
        line = paragraphs[i]

        if CITY_LINE_RE.match(line) and len(line) < 30:
            current_city = clean_city_name(line)
            i += 1
            continue

        if FIRM_LINE_RE.match(line):
            # Naziv firme — ne sadrži ime advokata, preskoči
            i += 1
            continue

        # Tražimo email u trenutnoj liniji; ako nema, provjeri sljedeću liniju
        # (slučaj kad se email prelama zbog dugog teksta o telefonima)
        emails_found = EMAIL_REGEX.findall(line)
        combined_line = line

        if not emails_found and i + 1 < len(paragraphs):
            next_line = paragraphs[i + 1]
            # Spoji samo ako sljedeća linija NE izgleda kao novo ime/firma/grad
            # (heuristika: kratka linija bez "tel." na početku je vjerovatno nastavak)
            if not FIRM_LINE_RE.match(next_line) and not CITY_LINE_RE.match(next_line):
                test_combined = line + " " + next_line
                test_emails = EMAIL_REGEX.findall(test_combined)
                if test_emails:
                    combined_line = test_combined
                    emails_found = test_emails
                    i += 1  # preskoči i sljedeću liniju, već je iskorištena

        if not emails_found:
            i += 1
            continue

        email = emails_found[0].rstrip(".,;")

        # Ime advokata je tekst PRIJE "tel." ili prije zareza koji prethodi telefonu
        name_part = re.split(r",?\s*tel\.?", combined_line, maxsplit=1, flags=re.IGNORECASE)[0].strip()
        name_part = name_part.strip(" -")

        if not name_part or len(name_part) > 60:
            # Ne uspijevamo pouzdano izdvojiti ime — radije preskoči nego
            # upiši pogrešne podatke (npr. ako je linija samo "e-mail: x@y.me"
            # nastavak prethodnog reda koji smo već obradili)
            i += 1
            continue

        # name_part je obično "Prezime Ime" ili "Prezime mr Ime" — uzimamo
        # prvu riječ kao prezime, ostatak kao ime (gruba ali dovoljno dobra
        # podjela za potrebe personalizacije pozdrava u mejlu)
        words = name_part.split()
        prezime = words[0] if words else ""
        ime = " ".join(words[1:]) if len(words) > 1 else ""

        rows_out.append({
            "prezime": prezime,
            "ime": ime,
            "adresa": "",
            "grad": current_city,
            "email": email,
        })

        i += 1

    return rows_out


def main():
    script_dir = Path(__file__).parent
    all_rows = []

    found_any_file = False

    for filename in DOCX_FILES:
        path = script_dir / filename
        if not path.exists():
            print(f"UPOZORENJE: {filename} nije pronađen u folderu skripte ({script_dir}). "
                  "Preskačem ovaj fajl — provjeri da li si ga stavio u isti folder.")
            continue

        found_any_file = True
        print(f"Parsiram: {filename}")
        rows = extract_rows_from_docx(path)
        print(f"  Pronađeno {len(rows)} kontakata u ovom fajlu.")
        all_rows.extend(rows)

    if not found_any_file:
        print("\nGREŠKA: Nijedan od očekivanih .docx fajlova nije pronađen. "
              f"Stavi {DOCX_FILES} u isti folder kao scrape_crna_gora.py.")
        sys.exit(1)

    rows = deduplicate(all_rows)

    if not rows:
        print("Nije pronađen nijedan email u dokumentima.")
        sys.exit(1)

    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()
