#!/usr/bin/env python3
"""
Legantis — Scraper: Hrvatska odvjetnička komora (HOK)
Izvor: https://www.hok-cba.hr/imenik/

NAPOMENA — ovaj scraper je manje provjeren od ostalih jer nismo imali
vizualni uvid u tačnu HTML strukturu imenika (samo opis: "Naziv/Prezime i ime |
Kategorija | Adresa | Grad" + "> Više" link za detalje svakog odvjetnika).
Imenik na HOK sajtu prikazuje listu BEZ email adrese direktno vidljive u
tabeli — email se vjerovatno nalazi tek na pojedinačnoj profilnoj stranici
("> Više" link).

Zbog toga ovaj scraper radi u DVA KORAKA:
  1. Skupi listu profilnih linkova sa glavne imenik stranice (i njene
     paginacije, ako postoji)
  2. Posjeti svaki profil i izvuci email ako je naveden

Ovo je sporije od ostalih scrapera (jedan HTTP zahtjev po advokatu), zato
ima manji MAX_RESULTS podrazumijevano i veći DELAY (da ne preopteretimo
HOK server).

Ako se nakon pokretanja ispostavi da je struktura drugačija nego što je ovdje
pretpostavljeno, ispiše se jasna poruka — u tom slučaju javi se Claude-u sa
screenshot-om jedne profilne stranice (npr. otvori bilo kojeg odvjetnika iz
imenika i pošalji screenshot te pojedinačne stranice) da prilagodimo parsing.

KORIŠTENJE:
    python scrape_hrvatska.py
"""

import sys
import time
import requests
from bs4 import BeautifulSoup

from outreach_common import EMAIL_REGEX, HEADERS, deduplicate, append_to_master

LISTING_URL = "https://www.hok-cba.hr/imenik/"
JURISDICTION_LABEL = "hrvatska"
SOURCE_LABEL = "hok-cba.hr"
MAX_RESULTS = 500
MAX_PROFILES_TO_VISIT = 700  # malo više od MAX_RESULTS jer neki neće imati email
DELAY_BETWEEN_REQUESTS = 1.0


def fetch_page(url: str, params=None) -> BeautifulSoup:
    print(f"Preuzimam: {url} {params or ''}")
    resp = requests.get(url, headers=HEADERS, params=params, timeout=30)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding
    return BeautifulSoup(resp.text, "html.parser")


def collect_profile_links(max_links: int):
    """
    Skuplja linkove ka pojedinačnim profilima sa imenik stranice.
    HOK koristi "> Više" linkove za svaki zapis — tražimo sve <a> tagove
    čiji tekst sadrži "Više" ili koji vode na URL pattern sličan
    "/imenik/.../neki-slug/" (relativni link unutar /imenik/).
    """
    links = []
    page = 1

    while len(links) < max_links and page <= 30:  # sigurnosna kočnica
        if page == 1:
            soup = fetch_page(LISTING_URL)
        else:
            soup = fetch_page(LISTING_URL, params={"stranica": page})

        # Traži linkove sa tekstom "Više" (case insensitive)
        page_links = soup.find_all(
            "a",
            string=lambda s: s and "više" in s.lower()
        )

        if not page_links:
            # Fallback: traži sve linkove unutar /imenik/ koji nisu sama listing stranica
            page_links = [
                a for a in soup.find_all("a", href=True)
                if "/imenik/" in a["href"] and a["href"].rstrip("/") != LISTING_URL.rstrip("/")
            ]

        if not page_links:
            print(f"Stranica {page}: nije pronađen nijedan profilni link — "
                  "vjerovatno smo stigli do kraja ili je struktura drugačija.")
            break

        new_count = 0
        for a in page_links:
            href = a.get("href")
            if href and href not in links:
                links.append(href)
                new_count += 1

        print(f"Stranica {page}: +{new_count} profilnih linkova (ukupno: {len(links)})")

        if new_count == 0:
            break  # paginacija ne radi ili smo na kraju

        page += 1
        time.sleep(DELAY_BETWEEN_REQUESTS)

    return links[:max_links]


def extract_contact_from_profile(profile_url: str):
    """Posjeti pojedinačnu profilnu stranicu i izvuci ime/email."""
    try:
        soup = fetch_page(profile_url)
    except requests.RequestException as e:
        print(f"  Greška pri otvaranju {profile_url}: {e}")
        return None

    page_text = soup.get_text(separator=" ", strip=True)
    emails_found = EMAIL_REGEX.findall(page_text)

    if not emails_found:
        return None

    # Naslov stranice (h1) je obično ime advokata/firme
    title_tag = soup.find("h1")
    full_name = title_tag.get_text(strip=True) if title_tag else ""

    parts = full_name.split()
    prezime = parts[0] if parts else ""
    ime = " ".join(parts[1:]) if len(parts) > 1 else ""

    return {
        "prezime": prezime,
        "ime": ime,
        "adresa": "",
        "grad": "",
        "email": emails_found[0].rstrip(".,;"),
    }


def main():
    print("KORAK 1: Skupljam profilne linkove sa imenik stranice...")
    profile_links = collect_profile_links(MAX_PROFILES_TO_VISIT)

    if not profile_links:
        print("\nGREŠKA: Nije pronađen nijedan profilni link na imenik stranici.")
        print("Struktura HOK sajta se vjerovatno razlikuje od pretpostavljene.")
        print("Javi se Claude-u sa screenshot-om stranice hok-cba.hr/imenik/ "
              "(i idealno jednim pojedinačnim profilom) da prilagodimo parsing.")
        sys.exit(1)

    print(f"\nPronađeno {len(profile_links)} profilnih linkova.")
    print("KORAK 2: Posjećujem svaki profil i tražim email (ovo može potrajati)...\n")

    rows_out = []
    for i, link in enumerate(profile_links, 1):
        if len(rows_out) >= MAX_RESULTS:
            break

        contact = extract_contact_from_profile(link)
        if contact:
            rows_out.append(contact)
            print(f"  [{i}/{len(profile_links)}] OK: {contact['prezime']} {contact['ime']} — {contact['email']}")
        else:
            print(f"  [{i}/{len(profile_links)}] preskočeno (nema email-a)")

        time.sleep(DELAY_BETWEEN_REQUESTS)

    rows = deduplicate(rows_out)
    rows = rows[:MAX_RESULTS]

    if not rows:
        print("\nNije pronađen nijedan email na profilnim stranicama.")
        sys.exit(1)

    append_to_master(rows, JURISDICTION_LABEL, SOURCE_LABEL)


if __name__ == "__main__":
    main()
