#!/usr/bin/env python3
"""
Legantis — Jednokratna skripta za dodavanje Brčko kontakata u master CSV.

KORIŠTENJE:
    python merge_brcko.py

Pokretati JEDNOM, iz foldera scripts/outreach/ gdje se nalazi master CSV.
"""

import csv
import os
import sys

MASTER_CSV = "imenik_advokata_master.csv"
BRCKO_CSV = "imenik_brcko_rucno_clean.csv"
FIELDNAMES = ["prezime", "ime", "adresa", "grad", "email",
              "jurisdikcija", "izvor", "poslano", "datum_slanja"]


def main():
    if not os.path.exists(MASTER_CSV):
        print(f"GREŠKA: {MASTER_CSV} nije pronađen. Pokreni iz foldera scripts/outreach/")
        sys.exit(1)

    if not os.path.exists(BRCKO_CSV):
        print(f"GREŠKA: {BRCKO_CSV} nije pronađen. Stavi ga u isti folder kao ova skripta.")
        sys.exit(1)

    with open(MASTER_CSV, encoding="utf-8-sig", newline="") as f:
        existing = list(csv.DictReader(f))
        for r in existing:
            for fn in FIELDNAMES:
                r.setdefault(fn, "")

    existing_emails = {r["email"].lower().strip() for r in existing}
    print(f"Master prije spajanja: {len(existing)} kontakata")

    with open(BRCKO_CSV, encoding="utf-8-sig", newline="") as f:
        brcko_rows = list(csv.DictReader(f))

    added = 0
    skipped = 0
    for r in brcko_rows:
        email = r.get("email", "").strip().lower()
        if not email or email in existing_emails:
            skipped += 1
            continue
        existing.append(r)
        existing_emails.add(email)
        added += 1

    with open(MASTER_CSV, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(existing)

    print(f"Dodano: {added} novih Brčko kontakata")
    if skipped:
        print(f"Preskočeno (duplikat email-a): {skipped}")
    print(f"Master nakon spajanja: {len(existing)} kontakata")
    print(f"\nGotovo — {MASTER_CSV} je ažuriran.")


if __name__ == "__main__":
    main()
