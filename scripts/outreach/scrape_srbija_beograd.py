#!/usr/bin/env python3
"""
Legantis — Scraper: Advokatska komora Beograda
Izvor: https://akbgd.org.rs/imenik/

Stranica koristi DataTables JS tabelu (Prezime, Ime, Adresa, Broj, Telefon,
Fax, Email), ukupno ~5.969 redova, 100 po stranici (paginacija).

Cilj je prikupiti prvih MAX_RESULTS (default 500) — dovoljno za prvu fazu.
To je otprilike PAGES_TO_FETCH stranica od 100.

NAPOMENA O TEHNICI: DataTables često učitava podatke preko AJAX poziva
(JSON), ali kad je tabela renderovana server-side u početnom HTML-u (kao
ovdje, gdje se vidi puna tabela sa 100 redova odmah), requests+BeautifulSoup
može direktno pročitati taj HTML bez potrebe za browser/JS izvršavanjem.
Ako se ispostavi da je tabela ipak učitana naknadno preko AJAX-a (prazna
tabela u prvom fetch-u), javi se Claude-u — treba pronaći AJAX endpoint
(network tab u browseru: F12 → Network → XHR dok se stranica učitava).

KORIŠTENJE:
    python scrape_srbija_beograd.py
"""

import sys
import time
import requests
from bs4 import BeautifulSoup

from outreach_common import EMAIL_REGEX, HEADERS, deduplicate, append_to_master

SOURCE_URL = "https://akbgd.org.rs/imenik/"
JURISDICTION_LABEL = "srbija_beograd"
SOURCE_LABEL = "akbgd.org.rs"
MAX_RESULTS = 500


def fetch_page(url: str, params=None) -> BeautifulSoup:
    print(f"Preuzimam: {url} {params or ''}")
    resp = requests.get(url, headers=HEADERS, params=params, timeout=30)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding
    return BeautifulSoup(resp.text, "html.parser")


def extract_rows_from_table(soup: BeautifulSoup):
    """
    Tabela: PREZIME | IME | ADRESA | BROJ | TELEFON | FAX | EMAIL
    """
    table = soup.find("table")
    if table is None:
        return []

    rows_out = []
    trs = table.find_all("tr")

    for tr in trs:
        cells = tr.find_all(["td"])
        if len(cells) < 3:
            continue  # header red ili prazan red

        cell_texts = [c.get_text(separator=" ", strip=True) for c in cells]
        full_row_text = " ".join(cell_texts)
        emails_found = EMAIL_REGEX.findall(full_row_text)

        if not emails_found:
            continue

        prezime = cell_texts[0] if len(cell_texts) > 0 else ""
        ime = cell_texts[1] if len(cell_texts) > 1 else ""
        adresa = cell_texts[2] if len(cell_texts) > 2 else ""

        rows_out.append({
            "prezime": prezime,
            "ime": ime,
            "adresa": adresa,
            "grad": "Beograd",
            "email": emails_found[0].rstrip(".,;"),
        })

    return rows_out


def main():
    soup = fetch_page(SOURCE_URL)
    rows = extract_rows_from_table(soup)

    if not rows:
        print("\nUPOZORENJE: Nije pronađena tabela sa podacima u početnom HTML-u.")
        print("Stranica vjerovatno učitava tabelu naknadno preko AJAX/JavaScript poziva.")
        print("U tom slučaju treba pronaći pravi AJAX endpoint:")
        print("  1. Otvori https://akbgd.org.rs/imenik/ u Chrome-u")
        print("  2. F12 → tab 'Network' → filter 'XHR' ili 'Fetch'")
        print("  3. Osvježi stranicu, pronađi zahtjev koji vraća JSON sa imenima advokata")
        print("  4. Pošalji taj URL Claude-u (desni klik na zahtjev → Copy → Copy as cURL)")
        sys.exit(1)

    # DataTables na ovom sajtu prikazuje "Showing 1 to 100 of 5969 entries" —
    # ako test pokaže da je sva paginacija server-rendered u jednom odgovoru,
    # ovo je dovoljno. Ako je samo prva stranica (100 redova) u HTML-u, treba
    # paginacija — ostavljamo kao TODO napomenu jer zavisi od konfiguracije sajta.
    if len(rows) < MAX_RESULTS:
        print(f"\nNAPOMENA: pronađeno samo {len(rows)} redova u prvom HTML odgovoru "
              f"(cilj je {MAX_RESULTS}). Ako sajt paginira na 100/stranica, ovo je "
              "očekivano za prvi prolaz — pokreni skriptu ponovo nakon što Claude "
              "doda podršku za paginaciju, ili javi se sa rezultatom da prilagodimo.")

    rows = deduplicate(rows)
    rows = rows[:MAX_RESULTS]

    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()
