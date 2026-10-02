#!/usr/bin/env python3
"""
Legantis — Scraper: Advokatska komora Vojvodine (Novi Sad)
Izvor: https://akv.org.rs/akv-imenik/

Stranica koristi wpDataTables WordPress plugin koji učitava podatke preko
AJAX poziva na /wp-admin/admin-ajax.php?action=get_wdtable&table_id=1
(otkriveno preko F12 → Network → XHR u browseru).

Tabela ima kolone: ime, telefon, pbroj (poštanski broj), mesto, adresa,
email, komentar.

AJAX zahtjev zahtijeva "wdtNonce" — WordPress sigurnosni token koji se
generiše po sesiji i mora se prvo pokupiti sa glavne stranice (HTML sadrži
taj nonce u JavaScript varijabli ili data atributu).

KORIŠTENJE:
    python scrape_srbija_vojvodina.py
"""

import re
import sys
import time
import requests
from bs4 import BeautifulSoup

from outreach_common import EMAIL_REGEX, HEADERS, deduplicate, append_to_master

PAGE_URL = "https://akv.org.rs/akv-imenik/"
AJAX_URL = "https://akv.org.rs/wp-admin/admin-ajax.php"
JURISDICTION_LABEL = "srbija_vojvodina"
SOURCE_LABEL = "akv.org.rs"
MAX_RESULTS = 500
PAGE_LENGTH = 100  # koliko redova tražimo po AJAX pozivu
DELAY_BETWEEN_REQUESTS = 1.5

NONCE_RE = re.compile(r'name=["\']wdtNonceFrontendEdit_\d+["\']\s+value=["\']([a-f0-9]+)["\']')


def get_session_and_nonce():
    """
    Učitava glavnu stranicu, vadi wdtNonce iz HTML/JS sadržaja, i vraća
    requests.Session (čuva kolačiće potrebne za AJAX poziv) zajedno sa
    pronađenim nonce-om.
    """
    session = requests.Session()
    session.headers.update(HEADERS)

    print(f"Preuzimam: {PAGE_URL} (radi pokupljanja wdtNonce tokena)")
    resp = session.get(PAGE_URL, timeout=30)
    resp.raise_for_status()

    match = NONCE_RE.search(resp.text)
    if not match:
        print("UPOZORENJE: nije pronađen wdtNonce u HTML-u glavne stranice. "
              "WordPress plugin je možda promijenio format — javi se Claude-u "
              "sa novim F12 → Network → XHR nalazom.")
        return session, None

    nonce = match.group(1)
    print(f"Pronađen wdtNonce: {nonce}")
    return session, nonce


def fetch_batch(session, nonce, start: int, length: int):
    """Poziva wpDataTables AJAX endpoint za jednu 'stranicu' podataka."""
    columns = ["ime", "telefon", "pbroj", "mesto", "adresa", "email", "komentar"]

    data = {
        "draw": "1",
        "start": str(start),
        "length": str(length),
        "search[value]": "",
        "search[regex]": "false",
        "wdtNonce": nonce,
        "sRangeSeparator": "|",
    }

    for i, col_name in enumerate(columns):
        data[f"columns[{i}][data]"] = str(i)
        data[f"columns[{i}][name]"] = col_name
        data[f"columns[{i}][searchable]"] = "true"
        data[f"columns[{i}][orderable]"] = "true"
        data[f"columns[{i}][search][value]"] = ""
        data[f"columns[{i}][search][regex]"] = "false"

    params = {"action": "get_wdtable", "table_id": "1"}

    ajax_headers = dict(HEADERS)
    ajax_headers["X-Requested-With"] = "XMLHttpRequest"
    ajax_headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"
    ajax_headers["Referer"] = PAGE_URL

    resp = session.post(AJAX_URL, params=params, data=data, headers=ajax_headers, timeout=30)
    resp.raise_for_status()
    return resp.json()


def extract_rows_from_json(payload: dict):
    """
    wpDataTables JSON odgovor ima oblik {"data": [[col0, col1, ...], ...], ...}
    Kolone (po redoslijedu iz zahtjeva): ime, telefon, pbroj, mesto, adresa, email, komentar
    """
    rows_out = []
    data_rows = payload.get("data", [])

    for row in data_rows:
        if len(row) < 6:
            continue

        # Skini eventualne HTML tagove iz ćelija (wpDataTables ih ponekad vraća
        # kao HTML, npr. <a href="mailto:...">x@y.com</a>)
        clean_cells = [BeautifulSoup(str(c), "html.parser").get_text(strip=True) for c in row]

        prezime_ime = clean_cells[0]
        mesto = clean_cells[3] if len(clean_cells) > 3 else ""
        adresa = clean_cells[4] if len(clean_cells) > 4 else ""
        email_cell = clean_cells[5] if len(clean_cells) > 5 else ""

        emails_found = EMAIL_REGEX.findall(email_cell)
        if not emails_found:
            continue

        parts = prezime_ime.split()
        prezime = parts[0] if parts else ""
        ime = " ".join(parts[1:]) if len(parts) > 1 else ""

        rows_out.append({
            "prezime": prezime,
            "ime": ime,
            "adresa": adresa,
            "grad": mesto,
            "email": emails_found[0].rstrip(".,;"),
        })

    return rows_out, payload.get("recordsTotal", 0)


def main():
    session, nonce = get_session_and_nonce()

    if not nonce:
        sys.exit(1)

    all_rows = []
    start = 0
    total_records = None

    while len(all_rows) < MAX_RESULTS:
        try:
            payload = fetch_batch(session, nonce, start, PAGE_LENGTH)
        except requests.RequestException as e:
            print(f"Greška pri AJAX pozivu (start={start}): {e}")
            break
        except ValueError:
            print(f"Odgovor nije validan JSON (start={start}) — moguće da je nonce istekao "
                  "ili je struktura odgovora drugačija. Javi se Claude-u sa ovim nalazom.")
            break

        if total_records is None:
            total_records = payload.get("recordsTotal", "?")
            print(f"Ukupno advokata u tabeli (prema serveru): {total_records}")

        batch_rows, _ = extract_rows_from_json(payload)

        if not batch_rows and not payload.get("data"):
            print(f"Nema više podataka (start={start}) — stigli smo do kraja.")
            break

        all_rows.extend(batch_rows)
        print(f"start={start}: +{len(batch_rows)} redova sa email-om (ukupno: {len(all_rows)})")

        if len(payload.get("data", [])) < PAGE_LENGTH:
            break  # zadnja stranica, manje redova nego što smo tražili

        start += PAGE_LENGTH
        time.sleep(DELAY_BETWEEN_REQUESTS)

    rows = deduplicate(all_rows)
    rows = rows[:MAX_RESULTS]

    if not rows:
        print("Nije pronađen nijedan email.")
        sys.exit(1)

    print(f"\nUkupno pronađeno (prije ograničenja): {len(all_rows)}, koristim: {len(rows)}")
    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()

