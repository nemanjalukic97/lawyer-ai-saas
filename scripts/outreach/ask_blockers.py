#!/usr/bin/env python3
"""
Legantis — one-shot diagnostic email to registered users who never ran a search.

Asks one question (what stopped them). No invite-back, no pitch, no attachment.

POKRETANJE (iz scripts/outreach/ ili bilo kojeg cwd):
    python ask_blockers.py                 # dry-run (default)
    python ask_blockers.py --dry-run       # isto
    python ask_blockers.py --send
    python ask_blockers.py --only email@primjer.com
    python ask_blockers.py --exclude email@primjer.com
    python ask_blockers.py --limit=2
    python ask_blockers.py --mark-replied email@primjer.com

Potrebne env varijable (scripts/outreach/.env):
    GMAIL_ADDRESS
    GMAIL_APP_PASSWORD
    DATABASE_URL
"""

import argparse
import csv
import os
import smtplib
import ssl
import sys
import time
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import make_msgid

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

from send_outreach import load_credentials  # noqa: E402
from welcome_sequence import (  # noqa: E402
    DELAY_BETWEEN_EMAILS_SECONDS,
    MALE_A_NAMES,  # gender heuristic; used by suggest_rod, imported not copied
    STATE_CSV as WELCOME_STATE_CSV,
    connect_db,
    email_key,
    first_name,
    load_database_url,
    load_state as load_welcome_state,
    normalize_jurisdiction,
    parse_sent_dt,
    pozdrav_for,
    suggest_rod,
)

assert MALE_A_NAMES, "welcome_sequence.MALE_A_NAMES must be non-empty"

STATE_CSV = os.path.join(SCRIPT_DIR, "ask_blockers_state.csv")
FIELDNAMES = [
    "email",
    "name",
    "jurisdiction",
    "greeting",
    "status",
    "sent_at",
    "replied_at",
]
TERMINAL_STATUSES = frozenset({"sent", "odgovorio"})
EXCLUDED_EMAIL = "nemanjalukic1997@gmail.com"

SUBJECT = "Jedno pitanje o Legantisu"
BODY_TEMPLATE = """{pozdrav} {ime},

otvorili ste nalog na Legantisu i pristup Vam je i dalje aktivan, ali koliko vidim niste pokrenuli nijednu pretragu.

Ne pišem Vam da Vas nagovaram da se vratite. Pišem da Vas pitam jednu stvar, jer mi je odgovor stvarno potreban:

Šta Vas je zaustavilo?

Nije radilo? Niste imali vremena? Nije Vam bilo jasno šta da upišete? Niste vidjeli čemu služi? Ili jednostavno nije za Vaš posao?

Bilo koji od tih odgovora mi pomaže. Dovoljna je jedna rečenica.

Srdačan pozdrav,
Nemanja Lukić
Legantis"""

QUERY_NEVER_SEARCHED = """
SELECT
  u.email,
  u.raw_user_meta_data->>'full_name' AS meta_full_name,
  u.raw_user_meta_data->>'name' AS meta_name,
  u.raw_user_meta_data->>'display_name' AS meta_display_name,
  p.full_name AS profile_full_name,
  p.preferred_jurisdiction
FROM auth.users u
LEFT JOIN user_profiles p ON p.id = u.id
LEFT JOIN (
  SELECT user_id, COUNT(*) n
  FROM rag_query_logs
  WHERE user_id IS NOT NULL
  GROUP BY user_id
) rq ON rq.user_id = u.id
WHERE COALESCE(rq.n, 0) = 0
  AND u.email IS NOT NULL
  AND trim(u.email) <> ''
  AND lower(u.email) <> %s
  AND u.email NOT ILIKE '%%test%%'
  AND u.email NOT ILIKE '%%+test%%'
  AND p.deleted_at IS NULL
ORDER BY u.created_at;
"""


def load_state():
    if not os.path.exists(STATE_CSV):
        return []
    with open(STATE_CSV, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    for row in rows:
        for fn in FIELDNAMES:
            row.setdefault(fn, "")
    return rows


def save_state(rows):
    with open(STATE_CSV, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def state_index(rows):
    return {email_key(r.get("email")): r for r in rows if email_key(r.get("email"))}


def is_excluded_email(email):
    key = email_key(email)
    if not key:
        return True
    if key == EXCLUDED_EMAIL:
        return True
    if "test" in key or "+test" in key:
        return True
    return False


def resolved_display_name(user):
    for key in ("meta_full_name", "meta_name", "meta_display_name", "profile_full_name"):
        value = (user.get(key) or "").strip()
        if value:
            return value
    return ""


def usable_first_name(display_name, email):
    ime = first_name(display_name)
    if not ime:
        return ""
    if "@" in ime:
        return ""
    local = (email or "").split("@")[0].strip()
    if local and ime.lower() == local.lower():
        return ""
    return ime


def title_given_name(ime):
    """Title-case a given name: first char upper, rest lower, per hyphen/apostrophe part."""
    ime = (ime or "").strip()
    if not ime:
        return ime
    seps = set("-'\u2019")
    out = []
    buf = []

    def flush():
        if not buf:
            return
        part = "".join(buf)
        buf.clear()
        out.append(part[:1].upper() + part[1:].lower())

    for ch in ime:
        if ch in seps:
            flush()
            out.append(ch)
        else:
            buf.append(ch)
    flush()
    return "".join(out)


def welcome_history_label(welcome_row):
    if not welcome_row:
        return "nikad"
    best_touch = None
    best_dt = None
    best_raw = ""
    for touch in ("touch0", "touch2", "touch5"):
        raw = (welcome_row.get(f"{touch}_datum") or "").strip()
        if not raw:
            continue
        dt = parse_sent_dt(raw)
        if dt is None:
            continue
        if best_dt is None or dt >= best_dt:
            best_dt = dt
            best_touch = touch
            best_raw = raw
    if not best_touch:
        return "nikad"
    return f"{best_touch} @ {best_raw}"


def render_email(display_name, rod, jurisdiction):
    jur = normalize_jurisdiction(jurisdiction)
    ime = title_given_name(first_name(display_name))
    pozdrav = pozdrav_for(rod, jur)
    body = BODY_TEMPLATE.replace("{pozdrav}", pozdrav).replace("{ime}", ime)
    return SUBJECT, body, pozdrav, jur


def upsert_row(rows, index, email, name, jurisdiction, greeting, status,
               sent_at=None, replied_at=None):
    key = email_key(email)
    now_empty = ""
    row = index.get(key)
    if row is None:
        row = {fn: "" for fn in FIELDNAMES}
        row["email"] = (email or "").strip()
        rows.append(row)
        index[key] = row
    row["name"] = name or row.get("name") or ""
    row["jurisdiction"] = jurisdiction or row.get("jurisdiction") or ""
    if greeting:
        row["greeting"] = greeting
    row["status"] = status
    if sent_at is not None:
        row["sent_at"] = sent_at
    else:
        row.setdefault("sent_at", now_empty)
    if replied_at is not None:
        row["replied_at"] = replied_at
    else:
        row.setdefault("replied_at", now_empty)
    return row


def print_recipient_block(email, display_name, jurisdiction, rod, welcome_label,
                          subject, body, status_note=None):
    name = (display_name or "").strip() or "(bez imena)"
    jur = jurisdiction or "?"
    rod_label = rod or ""
    print(f"--- {email} ---")
    print(
        f"{name} ({email}) | {jur} | rod: {rod_label} | welcome: {welcome_label}"
    )
    if status_note:
        print(f"    {status_note}")
        return
    print(f"    Subject: {subject}")
    print("    Body:")
    for line in body.splitlines() or [body]:
        print(f"    {line}")


def fetch_candidates(conn):
    with conn.cursor() as cur:
        cur.execute(QUERY_NEVER_SEARCHED, (EXCLUDED_EMAIL,))
        rows = list(cur.fetchall())
    return [r for r in rows if not is_excluded_email(r.get("email"))]


def send_email(smtp_conn, gmail_address, to_email, subject, body):
    msg = MIMEMultipart("alternative")
    msg["From"] = gmail_address
    msg["To"] = to_email
    msg["Subject"] = subject
    msg["Message-ID"] = make_msgid(domain="legantis.app")
    msg.attach(MIMEText(body, "plain", "utf-8"))
    smtp_conn.sendmail(gmail_address, to_email, msg.as_string())


def mark_replied(target):
    rows = load_state()
    if not rows:
        print(f"GREŠKA: {STATE_CSV} ne postoji ili je prazan.")
        sys.exit(1)
    key = email_key(target)
    matched = 0
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    for row in rows:
        if email_key(row.get("email")) == key:
            row["status"] = "odgovorio"
            row["replied_at"] = now
            matched += 1
    if not matched:
        print(f"Nije pronađen korisnik sa emailom: {target}")
        sys.exit(1)
    save_state(rows)
    print(
        f"OK: {target} → status=odgovorio ({matched} redova). "
        "Neće više dobijati ovaj mejl."
    )


def parse_args():
    parser = argparse.ArgumentParser(
        description="Legantis ask-blockers diagnostic email"
    )
    parser.add_argument(
        "--send",
        action="store_true",
        help="actually send emails (default is dry-run)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="print rendered emails without SMTP (default)",
    )
    parser.add_argument("--only", metavar="EMAIL", help="limit to one recipient")
    parser.add_argument(
        "--exclude",
        metavar="EMAIL[,EMAIL...]",
        help="comma-separated addresses to skip this run (status=iskljucen, not terminal)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        metavar="N",
        help="cap the number of sendable emails",
    )
    parser.add_argument(
        "--mark-replied",
        metavar="EMAIL",
        help="set status to odgovorio and exit",
    )
    return parser.parse_args()


def parse_exclude_emails(value):
    if not value:
        return set()
    return {email_key(part) for part in value.split(",") if email_key(part)}


def classify_candidates(users, index, welcome_index, only_key, exclude_keys):
    already_sent = []
    already_replied = []
    excluded = []
    skipped_no_name = []
    skipped_no_gender = []
    sendable = []

    for user in users:
        email = (user.get("email") or "").strip()
        key = email_key(email)
        if only_key and key != only_key:
            continue

        display_name = resolved_display_name(user)
        jurisdiction = normalize_jurisdiction(user.get("preferred_jurisdiction"))
        welcome_label = welcome_history_label(welcome_index.get(key))
        existing = index.get(key)
        existing_status = (existing.get("status") or "").strip().lower() if existing else ""

        if existing_status == "sent":
            already_sent.append({
                "email": email,
                "name": display_name,
                "jurisdiction": jurisdiction,
                "welcome": welcome_label,
            })
            continue
        if existing_status == "odgovorio":
            already_replied.append({
                "email": email,
                "name": display_name,
                "jurisdiction": jurisdiction,
                "welcome": welcome_label,
            })
            continue

        if key in exclude_keys:
            excluded.append({
                "email": email,
                "name": display_name,
                "jurisdiction": jurisdiction,
                "welcome": welcome_label,
            })
            continue

        ime = usable_first_name(display_name, email)
        if not ime:
            skipped_no_name.append({
                "email": email,
                "name": display_name,
                "jurisdiction": jurisdiction,
                "welcome": welcome_label,
            })
            continue

        rod = suggest_rod(display_name)
        if rod not in ("m", "z"):
            skipped_no_gender.append({
                "email": email,
                "name": display_name,
                "jurisdiction": jurisdiction,
                "welcome": welcome_label,
            })
            continue

        subject, body, pozdrav, jur = render_email(display_name, rod, jurisdiction)
        sendable.append({
            "email": email,
            "name": display_name,
            "ime": ime,
            "jurisdiction": jur,
            "rod": rod,
            "greeting": pozdrav,
            "welcome": welcome_label,
            "subject": subject,
            "body": body,
        })

    return {
        "already_sent": already_sent,
        "already_replied": already_replied,
        "excluded": excluded,
        "skipped_no_name": skipped_no_name,
        "skipped_no_gender": skipped_no_gender,
        "sendable": sendable,
    }


def print_skip_list(title, items, note):
    print(f"{title}: {len(items)}")
    for item in items:
        name = (item.get("name") or "").strip() or "(bez imena)"
        print(
            f"  - {name} ({item['email']}) | {item.get('jurisdiction') or '?'} "
            f"| welcome: {item.get('welcome') or 'nikad'}"
        )
        if note:
            print(f"    {note}")


def _configure_stdout():
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass


def main():
    _configure_stdout()
    args = parse_args()
    today = datetime.now().strftime("%Y-%m-%d")
    print(f"=== ASK BLOCKERS — {today} ===")

    if args.mark_replied:
        mark_replied(args.mark_replied)
        return

    if args.send and args.dry_run:
        print("GREŠKA: --send i --dry-run ne mogu zajedno.")
        sys.exit(1)
    if args.limit is not None and args.limit < 1:
        print("GREŠKA: --limit mora biti >= 1")
        sys.exit(1)

    do_send = bool(args.send)
    print("mode: SEND" if do_send else "mode: DRY-RUN (pass --send to send)")

    gmail_address, gmail_password = load_credentials()
    database_url = load_database_url()

    rows = load_state()
    index = state_index(rows)
    welcome_rows = load_welcome_state()
    welcome_index = state_index(welcome_rows)
    if not os.path.exists(WELCOME_STATE_CSV):
        print("welcome_state.csv nije pronađen — welcome historija za sve: nikad")

    conn = connect_db(database_url)
    try:
        users = fetch_candidates(conn)
    finally:
        conn.close()

    only_key = email_key(args.only) if args.only else None
    exclude_keys = parse_exclude_emails(args.exclude)
    classified = classify_candidates(
        users, index, welcome_index, only_key, exclude_keys,
    )

    if only_key:
        total_matched = sum(len(classified[k]) for k in classified)
        if total_matched == 0:
            print(f"Nije pronađen korisnik: {args.only}")
            return

    sendable = classified["sendable"]
    limited = sendable
    if args.limit is not None:
        limited = sendable[: args.limit]

    print(f"Already sent: {len(classified['already_sent'])}")
    for item in classified["already_sent"]:
        print(
            f"  - {item['name']} ({item['email']}) | {item['jurisdiction']} "
            f"| welcome: {item['welcome']}"
        )
    print(f"Already replied: {len(classified['already_replied'])}")
    for item in classified["already_replied"]:
        print(
            f"  - {item['name']} ({item['email']}) | {item['jurisdiction']} "
            f"| welcome: {item['welcome']}"
        )
    print_skip_list(
        "Excluded",
        classified["excluded"],
        "EXCLUDED — iskljucen (nije terminalno)",
    )
    print_skip_list(
        "Skipped (no usable first name)",
        classified["skipped_no_name"],
        "SKIPPED — nema upotrebljivog imena",
    )
    print_skip_list(
        "Refused (gender undetermined)",
        classified["skipped_no_gender"],
        "REFUSED — rod nije određen, pošalji ručno",
    )
    print(
        f"Sendable: {len(limited)}"
        + (f" (of {len(sendable)}, --limit={args.limit})" if args.limit is not None else "")
    )
    print()

    for item in limited:
        print_recipient_block(
            item["email"],
            item["name"],
            item["jurisdiction"],
            item["rod"],
            item["welcome"],
            item["subject"],
            item["body"],
        )
        print()

    if not do_send:
        return

    for item in classified["excluded"]:
        upsert_row(
            rows, index, item["email"], item["name"], item["jurisdiction"],
            "", "iskljucen",
        )
    for item in classified["skipped_no_name"]:
        upsert_row(
            rows, index, item["email"], item["name"], item["jurisdiction"],
            "", "skipped_no_name",
        )
    for item in classified["skipped_no_gender"]:
        upsert_row(
            rows, index, item["email"], item["name"], item["jurisdiction"],
            "", "skipped_no_gender",
        )
    save_state(rows)

    if not limited:
        print("Nema ništa za slanje.")
        return

    context = ssl.create_default_context()
    sent_count = 0
    failed_count = 0
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls(context=context)
        server.login(gmail_address, gmail_password)
        for item in limited:
            email = item["email"]
            try:
                send_email(
                    server, gmail_address, email, item["subject"], item["body"],
                )
                upsert_row(
                    rows, index, email, item["name"], item["jurisdiction"],
                    item["greeting"], "sent",
                    sent_at=datetime.now().strftime("%Y-%m-%d %H:%M"),
                )
                sent_count += 1
                print(f"  [{sent_count}/{len(limited)}] Poslano: {email}")
            except Exception as e:
                failed_count += 1
                print(f"  GREŠKA za {email}: {e}")
            save_state(rows)
            time.sleep(DELAY_BETWEEN_EMAILS_SECONDS)

    print(f"\nGotovo. Poslano: {sent_count}, Greške: {failed_count}")
    print(f"State CSV ažuriran: {STATE_CSV}")


if __name__ == "__main__":
    main()
