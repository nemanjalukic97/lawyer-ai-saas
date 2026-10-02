#!/usr/bin/env python3
"""
Legantis — Scraper: Advokatska komora Republike Srpske
Izvor: https://advokatskakomora.ba/imenik-advokata/

Tabela na sajtu: Prezime | Ime | Sjedište kancelarije | Grad | Zbor advokata |
                 Telefon | Faks | Mobilni | E-mail

KORIŠTENJE:
    python scrape_bih_rs.py
"""

import sys
import requests
from bs4 import BeautifulSoup

from outreach_common import EMAIL_REGEX, HEADERS, deduplicate, append_to_master

SOURCE_URL = "https://advokatskakomora.ba/imenik-advokata/"
JURISDICTION_LABEL = "bih_rs"
SOURCE_LABEL = "advokatskakomora.ba"


def fetch_page(url: str) -> BeautifulSoup:
    print(f"Preuzimam: {url}")
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding
    return BeautifulSoup(resp.text, "html.parser")


def extract_rows(soup: BeautifulSoup):
    table = soup.find("table")
    if table is None:
        print("GREŠKA: Nije pronađena tabela na stranici. Sajt je možda promijenio strukturu.")
        sys.exit(1)

    rows_out = []
    trs = table.find_all("tr")

    for tr in trs[1:]:  # preskoči header red
        cells = tr.find_all(["td", "th"])
        if len(cells) < 4:
            continue

        cell_texts = [c.get_text(separator=" ", strip=True) for c in cells]

        prezime = cell_texts[0] if len(cell_texts) > 0 else ""
        ime = cell_texts[1] if len(cell_texts) > 1 else ""
        adresa = cell_texts[2] if len(cell_texts) > 2 else ""
        grad = cell_texts[3] if len(cell_texts) > 3 else ""

        # Email tražimo regexom u CIJELOM redu (ne striktno po poziciji kolone) —
        # neki redovi imaju prazne ćelije pa se kolone pomjere
        full_row_text = " ".join(cell_texts)
        emails_found = EMAIL_REGEX.findall(full_row_text)

        if not emails_found:
            continue  # advokat bez javno navedenog emaila — preskačemo

        primary_email = emails_found[0].rstrip(".,;")

        rows_out.append({
            "prezime": prezime,
            "ime": ime,
            "adresa": adresa,
            "grad": grad,
            "email": primary_email,
        })

    return rows_out


def main():
    soup = fetch_page(SOURCE_URL)
    rows = extract_rows(soup)
    rows = deduplicate(rows)

    if not rows:
        print("Nije pronađen nijedan email. Provjeri da li je struktura sajta promijenjena.")
        sys.exit(1)

    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()
