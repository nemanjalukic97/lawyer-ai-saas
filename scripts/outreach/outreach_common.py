#!/usr/bin/env python3
"""
Legantis Outreach — zajedničke funkcije za sve scraper i sender skripte.

Svaki jurisdikcijski scraper (scrape_bih_rs.py, scrape_srbija_beograd.py, ...)
importuje ovaj fajl i koristi append_to_master() da doda svoje redove u JEDAN
zajednički master CSV (imenik_advokata_master.csv).

send_outreach.py čita master CSV i šalje mejlove prema dnevnim limitima
definisanim u outreach_config.json (po jurisdikciji), uz ukupni dnevni
maksimum preko svih jurisdikcija zajedno.
"""

import csv
import json
import os
import re
import shutil
from datetime import datetime

EMAIL_REGEX = re.compile(r"[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+")

_OUTREACH_DIR = os.path.dirname(os.path.abspath(__file__))
MASTER_CSV = os.path.join(_OUTREACH_DIR, "imenik_advokata_master.csv")
CONFIG_FILE = os.path.join(_OUTREACH_DIR, "outreach_config.json")
FIELDNAMES = [
    "prezime", "ime", "rod", "adresa", "grad", "email", "jurisdikcija",
    "izvor", "poslano", "datum_slanja",
    "status", "mejl1_datum", "mejl2_datum", "mejl3_datum", "message_id",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "bs,hr,sr,sl,en;q=0.5",
}

KNOWN_JURISDICTIONS = [
    "bih_rs",
    "bih_fbih",
    "bih_brcko",
    "srbija_beograd",
    "srbija_vojvodina",
    "crna_gora",
    "hrvatska",
    "slovenija",
]


def deduplicate(rows):
    """Uklanja duplikate po email adresi unutar jedne liste (zadržava prvi pronađeni)."""
    seen = set()
    unique = []
    for r in rows:
        key = r["email"].lower().strip()
        if not key or key in seen:
            continue
        seen.add(key)
        unique.append(r)
    return unique


def _normalize_row(row):
    """Osigurava sva polja; migrira status iz poslano ako status nije postavljen."""
    for fn in FIELDNAMES:
        row.setdefault(fn, "")

    if row.get("status", "").strip():
        return False

    poslano = row.get("poslano", "").strip().lower()
    if poslano == "da":
        row["status"] = "mejl1"
        if not row.get("mejl1_datum", "").strip():
            row["mejl1_datum"] = row.get("datum_slanja", "")
    elif poslano.startswith("greska"):
        row["status"] = "greska"
    else:
        row["status"] = "novo"
    return True


def backup_master(path):
    """Kopija master CSV-a prije prvog upisa. Ne dira original."""
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    dest = f"{path}.bak-{stamp}"
    shutil.copy2(path, dest)
    print(f"Backup: {dest}")
    return dest


def migrate_master_csv(path=None):
    """
    Jednokratna, idempotentna migracija: dodaje nove kolone i popunjava status
    iz postojećeg polja poslano. Ne briše stare kolone/vrijednosti.
    Prije upisa pravi timestamped backup.
    send_outreach.py je ne zove: dry run nikad ne smije pisati u master CSV.
    Vraća (rows, migrated: bool).
    """
    csv_path = path or MASTER_CSV
    if not os.path.exists(csv_path):
        return [], False

    with open(csv_path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        existing_fields = list(reader.fieldnames or [])
        rows = list(reader)

    missing_cols = [fn for fn in FIELDNAMES if fn not in existing_fields]
    changed = bool(missing_cols)

    for row in rows:
        if _normalize_row(row):
            changed = True

    if changed:
        backup_master(csv_path)
        with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDNAMES, extrasaction="ignore")
            writer.writeheader()
            writer.writerows(rows)

    return rows, changed


def load_master():
    """Učitava postojeći master CSV (ako postoji). Vraća (rows, set_emailova)."""
    if not os.path.exists(MASTER_CSV):
        return [], set()

    rows, _ = migrate_master_csv(MASTER_CSV)
    for r in rows:
        for fn in FIELDNAMES:
            r.setdefault(fn, "")
    existing_emails = {r["email"].lower().strip() for r in rows}
    return rows, existing_emails


def save_master(rows):
    with open(MASTER_CSV, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def append_to_master(new_rows, jurisdiction_label, source_label=""):
    """
    Dodaje nove redove (iz jednog scraper poziva) u master CSV.
    Preskače emailove koji su VEĆ u master fajlu (iz bilo koje jurisdikcije
    ili izvora) — sprečava duplo slanje istom advokatu.
    """
    existing_rows, existing_emails = load_master()

    added = 0
    skipped_duplicate = 0
    skipped_no_email = 0

    for row in new_rows:
        email = row.get("email", "").strip()
        if not email:
            skipped_no_email += 1
            continue

        email_key = email.lower()
        if email_key in existing_emails:
            skipped_duplicate += 1
            continue

        existing_rows.append({
            "prezime": row.get("prezime", ""),
            "ime": row.get("ime", ""),
            "rod": "",
            "adresa": row.get("adresa", ""),
            "grad": row.get("grad", ""),
            "email": email,
            "jurisdikcija": jurisdiction_label,
            "izvor": source_label,
            "poslano": "",
            "datum_slanja": "",
            "status": "novo",
            "mejl1_datum": "",
            "mejl2_datum": "",
            "mejl3_datum": "",
            "message_id": "",
        })
        existing_emails.add(email_key)
        added += 1

    save_master(existing_rows)

    print(f"\n[{jurisdiction_label}] Dodano u master CSV: {added} novih")
    if skipped_duplicate:
        print(f"[{jurisdiction_label}] Preskočeno (duplikat email-a): {skipped_duplicate}")
    if skipped_no_email:
        print(f"[{jurisdiction_label}] Preskočeno (nema email adrese): {skipped_no_email}")
    print(f"Ukupno u {MASTER_CSV} sada: {len(existing_rows)} kontakata\n")

    return added


DEFAULT_CONFIG = {
    "total_daily_limit": 35,
    "delay_between_emails_seconds": 8,
    "jurisdiction_daily_limits": {
        "bih_rs": 10,
        "bih_fbih": 10,
        "bih_brcko": 5,
        "srbija_beograd": 0,
        "srbija_vojvodina": 0,
        "crna_gora": 0,
        "hrvatska": 0,
        "slovenija": 0
    },
    "jurisdiction_priority": [
        "bih_rs", "bih_fbih", "bih_brcko",
        "srbija_beograd", "srbija_vojvodina",
        "crna_gora", "hrvatska", "slovenija"
    ]
}


def load_config():
    """Učitava outreach_config.json. Ako ne postoji, pravi ga sa podrazumijevanim vrijednostima."""
    if not os.path.exists(CONFIG_FILE):
        save_config(DEFAULT_CONFIG)
        print(f"Napravljen je {CONFIG_FILE} sa podrazumijevanim (oprezno postavljenim) limitima.")
        print("OTVORI GA I PODESI PRIJE SLANJA — vidi README za objašnjenje.\n")
        return DEFAULT_CONFIG

    with open(CONFIG_FILE, encoding="utf-8") as f:
        return json.load(f)


def save_config(config):
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config, f, ensure_ascii=False, indent=2)
