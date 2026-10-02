#!/usr/bin/env python3
"""
Označi kontakt kao odgovorio — izlazi iz 3-touch sekvence.

Upotreba (iz scripts/outreach/):
    python mark_reply.py email@primjer.com
"""

import sys

from outreach_common import MASTER_CSV, load_master, save_master


def main():
    if len(sys.argv) < 2:
        print("Upotreba: python mark_reply.py email@primjer.com")
        sys.exit(1)

    target = sys.argv[1].strip().lower()
    if "@" not in target:
        print(f"GREŠKA: '{sys.argv[1]}' ne izgleda kao email adresa.")
        sys.exit(1)

    rows, _ = load_master()
    if not rows:
        print(f"GREŠKA: {MASTER_CSV} ne postoji ili je prazan.")
        sys.exit(1)

    matched = 0
    for row in rows:
        if row.get("email", "").strip().lower() == target:
            row["status"] = "odgovorio"
            matched += 1

    if not matched:
        print(f"Nije pronađen kontakt sa emailom: {target}")
        sys.exit(1)

    save_master(rows)
    print(f"OK: {target} → status=odgovorio ({matched} redova). Neće više dobijati follow-upe.")


if __name__ == "__main__":
    main()
