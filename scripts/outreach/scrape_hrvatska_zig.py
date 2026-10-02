#!/usr/bin/env python3
"""
Legantis — Parser: CSV lista zastupnika za žigove/intelektualno vlasništvo
(dopunski izvor za Hrvatsku, manji ali odmah dostupan — ne treba scraping)

Izvor: zastupnici_zig.csv (preuzet sa DZIV — Državni zavod za intelektualno
vlasništvo, ili sličnog javnog registra)

Kolone u fajlu: Titula | Prezime i ime/Naziv1 | Naziv2 | Ulica i broj |
                Poštanski broj i mjesto | Država | tel. | faks | el.pošta | Internet

NAPOMENA: ovo NIJE opšti advokatski imenik — to je specijalizovana lista
zastupnika za žigove (neki su firme, neki pojedinci, dosta praznih email
kolona). Koristi se kao DOPUNA glavnoj hrvatskoj listi (scrape_hrvatska.py),
ne kao zamjena.

Stavi zastupnici_zig.csv u isti folder kao ova skripta prije pokretanja.

KORIŠTENJE:
    python scrape_hrvatska_zig.py
"""

import csv
import sys
from pathlib import Path

from outreach_common import EMAIL_REGEX, deduplicate, append_to_master

CSV_FILE = "zastupnici_zig.csv"
JURISDICTION_LABEL = "hrvatska"
SOURCE_LABEL = "DZIV zastupnici_zig.csv"


def main():
    script_dir = Path(__file__).parent
    path = script_dir / CSV_FILE

    if not path.exists():
        print(f"GREŠKA: {CSV_FILE} nije pronađen u folderu skripte ({script_dir}). "
              "Stavi fajl u isti folder kao scrape_hrvatska_zig.py.")
        sys.exit(1)

    rows_out = []

    with open(path, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row.get("el.pošta:", "").strip()
            if not email or not EMAIL_REGEX.fullmatch(email):
                continue

            naziv = row.get("Prezime i ime/Naziv1", "").strip()
            mjesto = row.get("Poštanski broj i mjesto", "").strip()
            adresa = row.get("Ulica i broj", "").strip()

            # Naziv kolona miješa firme ("ALKALOID LGL d.o.o.") i osobe
            # ("ARALICA Lucija") — gruba heuristika: ako sadrži "d.o.o." ili
            # slične sufikse, tretiramo kao naziv firme (prezime=naziv firme,
            # ime prazno); inače pokušavamo razdvojiti PREZIME Ime format.
            firm_suffixes = ["d.o.o.", "j.t.d.", "obrt", "biro"]
            is_firm = any(suf in naziv.lower() for suf in firm_suffixes)

            if is_firm:
                prezime = naziv
                ime = ""
            else:
                parts = naziv.split()
                # Format u fajlu je obično "PREZIME Ime" (prezime velikim slovima)
                prezime = parts[0] if parts else naziv
                ime = " ".join(parts[1:]) if len(parts) > 1 else ""

            rows_out.append({
                "prezime": prezime,
                "ime": ime,
                "adresa": adresa,
                "grad": mjesto,
                "email": email,
            })

    rows = deduplicate(rows_out)

    if not rows:
        print("Nije pronađen nijedan validan email u fajlu.")
        sys.exit(1)

    print(f"Pronađeno {len(rows)} kontakata sa email adresom u {CSV_FILE}.")
    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()
