#!/usr/bin/env python3
"""
Legantis — Jednokratna skripta: zamjena FBiH podataka u master CSV-u

Problem: prvi scrape FBiH imenika pohranio je adresu unutar polja "prezime"
(jer je sajt imao nekonvencionalnu strukturu) — pozdrav u mejlovima je
ispao "Poštovani/a Mehmeda Džanića Lamela CB 2/3 Alagić Elvedin" umjesto
"Poštovani/a Alagić Elvedin".

Rješenje:
  1. Briše sve postojeće bih_fbih redove iz master CSV-a
  2. Ponovo preuzima FBiH imenik sa ispravnim parserom
  3. Dodaje čiste redove natrag u master CSV
  4. Pazi na dedup — ne dodaje emailove koji već postoje u drugim jurisdikcijama

KORIŠTENJE:
    python replace_fbih.py

Pokretati JEDNOM, iz foldera scripts/outreach/.
"""

import csv
import os
import sys
import requests
from bs4 import BeautifulSoup

MASTER_CSV = "imenik_advokata_master.csv"
FIELDNAMES = ["prezime", "ime", "adresa", "grad", "email",
              "jurisdikcija", "izvor", "poslano", "datum_slanja"]

SOURCE_URL = "https://www.advokomfbih.ba/spisak-advokata-regionalnih-komora-u-federaciji-bosne-i-hercegovine/"
JURISDICTION_LABEL = "bih_fbih"
SOURCE_LABEL = "advokomfbih.ba"
MAX_RESULTS = 500

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36",
}

import re
EMAIL_REGEX = re.compile(r"[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+")


def fetch_fbih():
    print(f"Preuzimam: {SOURCE_URL}")
    resp = requests.get(SOURCE_URL, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding
    soup = BeautifulSoup(resp.text, "html.parser")

    table = soup.find("table")
    rows_out = []

    if table:
        trs = table.find_all("tr")
        for tr in trs[1:]:
            cells = tr.find_all(["td", "th"])
            if len(cells) < 3:
                continue

            prezime_ime = cells[0].get_text(separator=" ", strip=True)
            adresa = cells[1].get_text(separator=" ", strip=True) if len(cells) > 1 else ""
            kontakt = cells[2].get_text(separator=" ", strip=True) if len(cells) > 2 else ""
            grad = cells[3].get_text(separator=" ", strip=True) if len(cells) > 3 else ""

            emails_found = EMAIL_REGEX.findall(kontakt)
            if not emails_found:
                continue

            parts = prezime_ime.split()
            prezime = parts[0] if parts else ""
            ime = " ".join(parts[1:]) if len(parts) > 1 else ""

            rows_out.append({
                "prezime": prezime,
                "ime": ime,
                "adresa": adresa,
                "grad": grad,
                "email": emails_found[0].rstrip(".,;"),
                "jurisdikcija": JURISDICTION_LABEL,
                "izvor": SOURCE_LABEL,
                "poslano": "",
                "datum_slanja": "",
            })

            if len(rows_out) >= MAX_RESULTS:
                break

    # Dedupliciraj unutar novog seta
    seen = set()
    unique = []
    for r in rows_out:
        key = r["email"].lower()
        if key not in seen:
            seen.add(key)
            unique.append(r)

    print(f"Preuzeto {len(unique)} FBiH kontakata sa ispravnim imenima.")
    return unique


def main():
    if not os.path.exists(MASTER_CSV):
        print(f"GREŠKA: {MASTER_CSV} nije pronađen. Pokreni iz foldera scripts/outreach/")
        sys.exit(1)

    # Učitaj master
    with open(MASTER_CSV, encoding="utf-8-sig", newline="") as f:
        all_rows = list(csv.DictReader(f))
        for r in all_rows:
            for fn in FIELDNAMES:
                r.setdefault(fn, "")

    # Odvoji FBiH redove koji su VEĆ POSLANI (ne brisati ih — samo zamijeni
    # podatke o imenu/prezimenu, ali email i status slanja ostaju)
    fbih_sent = [r for r in all_rows
                 if r.get("jurisdikcija") == JURISDICTION_LABEL
                 and r.get("poslano", "").strip().lower() == "da"]

    # Svi ostali redovi (ne-FBiH, bez obzira na status)
    other_rows = [r for r in all_rows if r.get("jurisdikcija") != JURISDICTION_LABEL]

    print(f"Master prije popravke: {len(all_rows)} kontakata")
    print(f"  FBiH već poslani (zadržavamo): {len(fbih_sent)}")
    print(f"  Ostale jurisdikcije: {len(other_rows)}")
    stari_fbih = len(all_rows) - len(other_rows)
    print(f"  Stari FBiH redovi koji se brišu: {stari_fbih - len(fbih_sent)}")

    # Preuzmi nove čiste FBiH podatke
    new_fbih = fetch_fbih()

    # Emailovi koji već postoje u other_rows ili fbih_sent — ne dodajemo duplikate
    existing_emails = {r["email"].lower() for r in other_rows + fbih_sent}

    added = 0
    skipped_dup = 0
    for r in new_fbih:
        key = r["email"].lower()
        if key in existing_emails:
            skipped_dup += 1
            continue
        other_rows.append(r)
        existing_emails.add(key)
        added += 1

    # Finalna lista: ostale jurisdikcije + već poslani FBiH + novi čisti FBiH
    final_rows = other_rows + fbih_sent

    # Sačuvaj
    with open(MASTER_CSV, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(final_rows)

    print(f"\nDodano novih čistih FBiH redova: {added}")
    if skipped_dup:
        print(f"Preskočeno (duplikat): {skipped_dup}")
    print(f"Master nakon popravke: {len(final_rows)} kontakata")
    print(f"\nGotovo — {MASTER_CSV} je ažuriran sa ispravnim FBiH imenima.")


if __name__ == "__main__":
    main()
