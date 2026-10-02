#!/usr/bin/env python3
"""
Legantis — Scraper: Regionalna advokatska komora Tuzla (Brčko distrikt)
Izvor: https://www.raktz.ba/brcko-distrikt/

Struktura stranice: za svakog advokata postoji blok teksta — ime u <strong>/<b>
ili <h*> tagu, ispod toga adresa, telefon/mobitel, i email (kao <a href="mailto:...">
ili plain tekst).

KORIŠTENJE:
    python scrape_bih_brcko.py
"""

import sys
import requests
from bs4 import BeautifulSoup

from outreach_common import EMAIL_REGEX, HEADERS, deduplicate, append_to_master

SOURCE_URL = "https://www.raktz.ba/brcko-distrikt/"
JURISDICTION_LABEL = "bih_brcko"
SOURCE_LABEL = "raktz.ba"


def fetch_page(url: str) -> BeautifulSoup:
    print(f"Preuzimam: {url}")
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding
    return BeautifulSoup(resp.text, "html.parser")


def decode_cfemail(encoded: str) -> str:
    """
    Dekodira CloudFlare email obfuskaciju.
    Format: prvi bajt (hex) je XOR ključ, ostatak su bajtovi pravog
    email-a, svaki XOR-ovan sa tim ključem.
    """
    try:
        raw_bytes = bytes.fromhex(encoded)
        key = raw_bytes[0]
        decoded_bytes = bytes(b ^ key for b in raw_bytes[1:])
        return decoded_bytes.decode("utf-8")
    except (ValueError, IndexError):
        return ""


def extract_rows(soup: BeautifulSoup):
    """
    Stranica koristi CloudFlare email obfuskaciju — pravi email je sakriven
    u data-cfemail atributu na <span class="__cf_email__" data-cfemail="...">,
    a vidljivi tekst je samo placeholder "[email protected]".

    Pristup: pronađi sve __cf_email__ spanove, dekodiraj svaki, i poveži sa
    najbližim prethodnim imenom (ime je format "Prezime\\nIme" na ovoj
    stranici — svaka riječ je zaseban red teksta).
    """
    content = (
        soup.find("div", class_="content")
        or soup.find("article")
        or soup.find("div", id="content")
        or soup.find("body")
    )

    cf_spans = content.find_all("span", class_="__cf_email__")

    rows_out = []

    for span in cf_spans:
        encoded = span.get("data-cfemail", "")
        if not encoded:
            continue

        email = decode_cfemail(encoded)
        if not email or not EMAIL_REGEX.fullmatch(email):
            continue

        # Ime advokata: tražimo unazad kroz prethodne <strong>/<b>/<h*> tagove
        # (format na sajtu: "Prezime" u jednom <strong>, "Ime" odmah ispod
        # u sljedećem, ili oboje u istom tagu razdvojeno razmakom/newline-om)
        name_tag = span.find_previous(["strong", "b", "h2", "h3", "h4"])

        if not name_tag:
            continue

        name_text = name_tag.get_text(separator=" ", strip=True)

        # Ako je ime razdvojeno u dva odvojena <strong> taga (Prezime, pa Ime
        # u sljedećem), provjeri i jedan tag prije ovog
        prev_name_tag = name_tag.find_previous(["strong", "b", "h2", "h3", "h4"])
        if prev_name_tag:
            prev_text = prev_name_tag.get_text(strip=True)
            # Spoji samo ako prev_text izgleda kao kratka riječ (dio imena),
            # ne kao prethodni advokat (heuristika: jedna riječ, bez cifara)
            if (
                prev_text
                and len(prev_text.split()) == 1
                and not any(c.isdigit() for c in prev_text)
                and len(prev_text) < 30
            ):
                # Provjeri da između prev_name_tag i name_tag nema drugog
                # cf_email spana (što bi značilo da pripada drugom advokatu)
                between_has_email = False
                for other_span in cf_spans:
                    if other_span is span:
                        continue
                    if prev_name_tag.find_next("span", class_="__cf_email__") is other_span:
                        between_has_email = True
                        break
                if not between_has_email:
                    name_text = f"{prev_text} {name_text}"

        parts = name_text.split()
        if not parts:
            continue

        prezime = parts[0]
        ime = " ".join(parts[1:]) if len(parts) > 1 else ""

        rows_out.append({
            "prezime": prezime,
            "ime": ime,
            "adresa": "",
            "grad": "Brčko",
            "email": email,
        })

    return rows_out


def main():
    soup = fetch_page(SOURCE_URL)
    rows = extract_rows(soup)
    rows = deduplicate(rows)

    if not rows:
        print("Nije pronađen nijedan email preko mailto: linkova. "
              "Moguće da stranica koristi plain-text email umjesto mailto linka — "
              "javi se Claude-u da prilagodi parsing.")
        sys.exit(1)

    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()
