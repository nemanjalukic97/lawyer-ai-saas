#!/usr/bin/env python3
"""
Legantis — Scraper: Advokatska/Odvjetnička komora FBiH
Izvor: https://www.advokomfbih.ba/spisak-advokata-regionalnih-komora-u-federaciji-bosne-i-hercegovine/

Stranica ima ~1355 advokata. Cilj je prikupiti prvih ~500 sa email adresama
(MAX_RESULTS ispod) — dovoljno za prvu fazu outreach-a.

NAPOMENA: ako se nakon pokretanja u terminalu ispiše manje od MAX_RESULTS,
to je zato što dosta advokata u imeniku nema naveden email (uobičajeno za
starije/manje aktivne advokate) — skripta normalno preskače te redove.

KORIŠTENJE:
    python scrape_bih_fbih.py
"""

import sys
import requests
from bs4 import BeautifulSoup

from outreach_common import EMAIL_REGEX, HEADERS, deduplicate, append_to_master

SOURCE_URL = "https://www.advokomfbih.ba/spisak-advokata-regionalnih-komora-u-federaciji-bosne-i-hercegovine/"
JURISDICTION_LABEL = "bih_fbih"
SOURCE_LABEL = "advokomfbih.ba"
MAX_RESULTS = 500


def fetch_page(url: str) -> BeautifulSoup:
    print(f"Preuzimam: {url}")
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding
    return BeautifulSoup(resp.text, "html.parser")


def extract_rows(soup: BeautifulSoup):
    """
    Tabela FBiH ima 4 kolone: PREZIME I IME | ADRESA | TELEFON/EMAIL | REGIJA
    Format prve kolone: "Alagić Elvedin" (prezime + ime u jednoj ćeliji)
    Email je u trećoj koloni zajedno sa telefonom.

    Ključna popravka: čitamo SAMO prvu ćeliju za ime, ne cijeli red —
    prethodna verzija je koristila cijeli tekst reda što je uključivalo
    adresu i telefon u polju prezime.
    """
    table = soup.find("table")

    rows_out = []

    if table is not None:
        trs = table.find_all("tr")
        for tr in trs[1:]:
            cells = tr.find_all(["td", "th"])
            if len(cells) < 3:
                continue

            # Kolona 0: PREZIME I IME — samo ova ćelija, ništa više
            prezime_ime = cells[0].get_text(separator=" ", strip=True)

            # Kolona 1: ADRESA
            adresa = cells[1].get_text(separator=" ", strip=True) if len(cells) > 1 else ""

            # Kolona 2: TELEFON / EMAIL — tražimo email regexom
            kontakt = cells[2].get_text(separator=" ", strip=True) if len(cells) > 2 else ""
            emails_found = EMAIL_REGEX.findall(kontakt)

            # Kolona 3: REGIJA (grad)
            grad = cells[3].get_text(separator=" ", strip=True) if len(cells) > 3 else ""

            if not emails_found:
                continue

            # Prezime i ime su zajedno u jednoj ćeliji (npr. "Alagić Elvedin")
            # Uzimamo prvu riječ kao prezime, ostatak kao ime
            parts = prezime_ime.split()
            prezime = parts[0] if parts else ""
            ime = " ".join(parts[1:]) if len(parts) > 1 else ""

            rows_out.append({
                "prezime": prezime,
                "ime": ime,
                "adresa": adresa,
                "grad": grad,
                "email": emails_found[0].rstrip(".,;"),
            })

        if rows_out:
            return rows_out

    # FALLBACK: ako tabela nije pronađena ili je prazna
    print("Nije pronađena <table> struktura — prelazim na tekstualni parsing (fallback).")
    content = soup.find("article") or soup.find("div", class_="entry-content") or soup.find("body")
    text = content.get_text(separator="\n", strip=True)
    lines = [l.strip() for l in text.split("\n") if l.strip()]

    for i, line in enumerate(lines):
        emails_found = EMAIL_REGEX.findall(line)
        if not emails_found:
            continue
        email = emails_found[0].rstrip(".,;")
        before_email = line.split(emails_found[0])[0].strip()
        name_source = before_email
        if len(name_source) < 3 and i > 0:
            name_source = lines[i - 1]
        words = name_source.replace(",", " ").split()
        prezime = words[0] if len(words) > 0 else ""
        ime = words[1] if len(words) > 1 else ""
        rows_out.append({
            "prezime": prezime, "ime": ime, "adresa": "", "grad": "",
            "email": email,
        })

    return rows_out


def main():
    soup = fetch_page(SOURCE_URL)
    rows = extract_rows(soup)
    rows = deduplicate(rows)
    rows = rows[:MAX_RESULTS]

    if not rows:
        print("Nije pronađen nijedan email. Provjeri ručno strukturu stranice — "
              "možda treba prilagoditi extract_rows() ovoj specifičnoj stranici "
              "(javi se Claude-u sa screenshotom HTML strukture ako treba pomoć).")
        sys.exit(1)

    print(f"Pronađeno (prije ograničenja na {MAX_RESULTS}): koristim {len(rows)} kontakata.")
    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()
