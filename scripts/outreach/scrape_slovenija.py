#!/usr/bin/env python3
"""
Legantis — Parser: Odvetniška zbornica Slovenije
Izvor: slovenija_odvetniki.json

NAPOMENA O PRISTUPU: stranica odv-zb.si koristi standardni jQuery DataTables
plugin gdje se SVI podaci (1933 odvetnikov) učitaju jednom u JavaScript
memoriju pri otvaranju stranice, a "stranice" (1, 2, 3...194) su samo
client-side prikaz bez ikakvog dodatnog mrežnog poziva. Zbog toga klasičan
HTTP scraping ne radi (Python ne izvršava JavaScript), pa se umjesto toga
podaci izvlače direktno iz browser konzole pomoću:

    copy(JSON.stringify(jQuery('#imenik-odvetnikov').DataTable().data().toArray()))

ili (kao u ovom slučaju) sačuvani kao .json fajl preko download komande u
Console-u, pa se ovaj fajl samo parsira lokalno — nikakav scraping nije
potreban.

Format JSON-a (jedan red = jedan advokat):
    {
      "Ime": "...", "Priimek": "...", "Naslov": "...", "Kraj": "...",
      "Splet": "Email: x@y.si<br/>www: ...", "Telefon": "...", ...
    }

Email je unutar "Splet" polja, formatiran kao "Email: x@y.si<br/>www: ...".

Ako želiš više od trenutnog broja redova u JSON fajlu, ponovi postupak u
browser konzoli sa drugačijim slice() rasponom (vidi README), pa zamijeni
JSON fajl ovim novim.

KORIŠTENJE:
    python scrape_slovenija.py
"""

import json
import sys
from pathlib import Path

from outreach_common import EMAIL_REGEX, deduplicate, append_to_master

JSON_FILE = "slovenija_odvetniki.json"
JURISDICTION_LABEL = "slovenija"
SOURCE_LABEL = "odv-zb.si (DataTables JSON export)"


def main():
    script_dir = Path(__file__).parent
    path = script_dir / JSON_FILE

    if not path.exists():
        print(f"GREŠKA: {JSON_FILE} nije pronađen u folderu skripte ({script_dir}).")
        print("Stavi fajl preuzet iz browser konzole u isti folder kao ova skripta.")
        sys.exit(1)

    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    print(f"Učitano {len(data)} redova iz {JSON_FILE}.")

    rows_out = []

    for entry in data:
        splet = entry.get("Splet", "") or ""
        emails_found = EMAIL_REGEX.findall(splet)

        if not emails_found:
            continue

        ime = (entry.get("Ime") or "").strip()
        priimek = (entry.get("Priimek") or "").strip()
        naslov = (entry.get("Naslov") or "").strip()
        kraj = (entry.get("Kraj") or "").strip()

        rows_out.append({
            "prezime": priimek,
            "ime": ime,
            "adresa": naslov,
            "grad": kraj,
            "email": emails_found[0].rstrip(".,;"),
        })

    rows = deduplicate(rows_out)

    if not rows:
        print("Nije pronađen nijedan email u fajlu.")
        sys.exit(1)

    print(f"Pronađeno {len(rows)} kontakata sa email adresom.")
    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()
