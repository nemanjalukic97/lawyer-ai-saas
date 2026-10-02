#!/usr/bin/env python3
"""
Legantis — Welcome sequence for newly registered users (Gmail SMTP).

3-touch: day 0, day 2, day 5. Touches 2 and 5 are skipped if the user
has become active (ai_actions + searches >= 1).

POKRETANJE (iz scripts/outreach/ ili bilo kojeg cwd):
    python welcome_sequence.py              # dry run
    python welcome_sequence.py --seed-only  # seed existing users, send nothing
    python welcome_sequence.py --send
    python welcome_sequence.py --only email@primjer.com
    python welcome_sequence.py --mark-replied email@primjer.com

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
from collections import Counter
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import make_msgid

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

from send_outreach import load_credentials  # noqa: E402
from welcome_templates import (  # noqa: E402
    DEFAULT_JURISDICTION,
    STARTER_QUERY_BY_JURISDICTION,
    TEMPLATES,
)

STATE_CSV = os.path.join(SCRIPT_DIR, "welcome_state.csv")
FIELDNAMES = [
    "email",
    "full_name",
    "rod",
    "jurisdikcija",
    "registrovan",
    "touch0_datum",
    "touch2_datum",
    "touch5_datum",
    "status",
    "message_id",
]

# Male given names that end in "a" (extend as needed). Case-insensitive.
MALE_A_NAMES = frozenset({
    "vlada", "nikola", "luka", "ilija", "andrija",
    "sasa", "saša", "misa", "miša", "nemanja",
    "matija", "kosta", "jova", "pera", "aca", "boba",
    "zika", "žika", "mika", "sima", "toma",
    "djoka", "đoka", "stevica", "ivica", "jurica",
    "mirza", "hamza", "musa", "isa",
})

TERMINAL_STATUSES = frozenset({"odgovorio", "aktivan", "preskocen", "touch5"})
DELAY_BETWEEN_EMAILS_SECONDS = 8

USER_QUERY_SELECT = """
SELECT u.email, p.full_name, p.preferred_jurisdiction, p.created_at,
       COALESCE(us.n, 0) AS ai_actions,
       COALESCE(rq.n, 0) AS searches
FROM user_profiles p
JOIN auth.users u ON u.id = p.id
LEFT JOIN (SELECT user_id, COUNT(*) n FROM usage_stats GROUP BY user_id) us
       ON us.user_id = p.id
LEFT JOIN (SELECT user_id, COUNT(*) n FROM rag_query_logs
           WHERE user_id IS NOT NULL GROUP BY user_id) rq
       ON rq.user_id = p.id
WHERE p.deleted_at IS NULL
"""

QUERY_ALL = USER_QUERY_SELECT + "\nORDER BY p.created_at;"
QUERY_LAST_14 = (
    USER_QUERY_SELECT
    + "\n  AND p.created_at > NOW() - INTERVAL '14 days'\nORDER BY p.created_at;"
)
QUERY_OLDER_THAN_14 = (
    USER_QUERY_SELECT
    + "\n  AND (p.created_at IS NULL OR p.created_at <= NOW() - INTERVAL '14 days')\n"
    "ORDER BY p.created_at;"
)


def load_database_url():
    url = os.environ.get("DATABASE_URL", "").strip()
    if not url:
        print("GREŠKA: Nedostaje DATABASE_URL u okruženju ili scripts/outreach/.env")
        sys.exit(1)
    return url


def connect_db(database_url):
    import psycopg2
    from psycopg2.extras import RealDictCursor

    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)


def fetch_users(conn, sql):
    with conn.cursor() as cur:
        cur.execute(sql)
        return list(cur.fetchall())


def email_key(value):
    return (value or "").strip().lower()


def is_active_user(user):
    return int(user.get("ai_actions") or 0) + int(user.get("searches") or 0) >= 1


def action_count(user):
    return int(user.get("ai_actions") or 0) + int(user.get("searches") or 0)


def to_naive(dt):
    if dt is None:
        return None
    if isinstance(dt, datetime):
        if dt.tzinfo is not None:
            return dt.astimezone().replace(tzinfo=None)
        return dt
    return None


def format_registrovan(created_at):
    dt = to_naive(created_at)
    if dt is None:
        return str(created_at or "").strip()
    return dt.strftime("%Y-%m-%d %H:%M")


def days_since_registration(created_at, registrovan):
    dt = to_naive(created_at)
    if dt is None:
        dt = parse_sent_dt(registrovan)
    if dt is None:
        return 0
    return max(0, (datetime.now() - dt).days)


def parse_sent_dt(value):
    value = (value or "").strip()
    if not value:
        return None
    for fmt in ("%Y-%m-%d %H:%M", "%Y-%m-%d"):
        try:
            return datetime.strptime(value, fmt)
        except ValueError:
            continue
    return None


def is_older_than(date_str, days):
    dt = parse_sent_dt(date_str)
    if dt is None:
        return False
    return datetime.now() - dt >= timedelta(days=days)


def normalize_jurisdiction(value):
    jur = (value or "").strip()
    if jur in TEMPLATES["touch0"]:
        return jur
    return DEFAULT_JURISDICTION


def first_name(full_name):
    parts = (full_name or "").strip().split()
    return parts[0] if parts else ""


def suggest_rod(full_name):
    """Heuristic gender for CSV `rod`: 'm', 'z', or '' (leave empty).

    Suggestion only — never overwrite a value already in the CSV.
    """
    name = (full_name or "").strip()
    if not name:
        return ""
    parts = name.split()
    ime = parts[0].strip(".,;:()[]\"'").lower()
    if not ime:
        return ""
    # A lone token that is not clearly gendered by the -a rule is ambiguous.
    if len(parts) == 1 and not ime.endswith("a") and ime not in MALE_A_NAMES:
        return ""
    if ime.endswith("a"):
        if ime in MALE_A_NAMES:
            return "m"
        return "z"
    return "m"


def rod_value(row):
    return (row.get("rod") or "").strip().lower()


def rod_is_set(row):
    return rod_value(row) in ("m", "z")


def pozdrav_for(rod, jurisdiction):
    jur = normalize_jurisdiction(jurisdiction)
    female = rod_value({"rod": rod}) == "z"
    if jur == "slovenia":
        return "Spoštovana" if female else "Spoštovani"
    return "Poštovana" if female else "Poštovani"


def empty_row(email, full_name, jurisdiction, created_at, status):
    return {
        "email": (email or "").strip(),
        "full_name": full_name or "",
        "rod": suggest_rod(full_name),
        "jurisdikcija": normalize_jurisdiction(jurisdiction) if jurisdiction else "",
        "registrovan": format_registrovan(created_at),
        "touch0_datum": "",
        "touch2_datum": "",
        "touch5_datum": "",
        "status": status,
        "message_id": "",
    }


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


def seed_status_for(user):
    return "aktivan" if is_active_user(user) else "preskocen"


def insert_missing(rows, index, users, status_fn):
    """Insert users whose email is not already in CSV. Does not overwrite."""
    added = Counter()
    for user in users:
        key = email_key(user.get("email"))
        if not key or key in index:
            continue
        status = status_fn(user)
        row = empty_row(
            user.get("email"),
            user.get("full_name"),
            user.get("preferred_jurisdiction"),
            user.get("created_at"),
            status,
        )
        rows.append(row)
        index[key] = row
        added[status] += 1
    return added


def seed_existing_users(conn, rows):
    users = fetch_users(conn, QUERY_ALL)
    index = state_index(rows)
    added = insert_missing(rows, index, users, seed_status_for)
    return added, len(users)


def render_template(touch, jurisdiction, full_name, rod):
    jur = normalize_jurisdiction(jurisdiction)
    template = TEMPLATES[touch][jur]
    ime = first_name(full_name)
    primer = STARTER_QUERY_BY_JURISDICTION.get(jur, STARTER_QUERY_BY_JURISDICTION[DEFAULT_JURISDICTION])
    pozdrav = pozdrav_for(rod, jur)
    subject = (
        template["subject"]
        .replace("{ime}", ime)
        .replace("{primer_upita}", primer)
        .replace("{pozdrav}", pozdrav)
    )
    body = (
        template["body"]
        .replace("{ime}", ime)
        .replace("{primer_upita}", primer)
        .replace("{pozdrav}", pozdrav)
    )
    return subject, body


def classify_touch(row):
    status = (row.get("status") or "").strip().lower()
    if status in TERMINAL_STATUSES:
        return None

    touch0_set = bool((row.get("touch0_datum") or "").strip())
    touch2_set = bool((row.get("touch2_datum") or "").strip())
    touch5_set = bool((row.get("touch5_datum") or "").strip())

    if status in ("novo", "") and not touch0_set:
        return "touch0"
    if status == "touch0":
        if touch2_set:
            return None
        if is_older_than(row.get("touch0_datum"), 2):
            return "touch2"
        return None
    if status == "touch2":
        if touch5_set:
            return None
        if is_older_than(row.get("touch0_datum"), 5) and is_older_than(row.get("touch2_datum"), 3):
            return "touch5"
        return None
    return None


def sync_daily(conn, rows):
    index = state_index(rows)
    recent = fetch_users(conn, QUERY_LAST_14)
    older = fetch_users(conn, QUERY_OLDER_THAN_14)

    live = {}
    for user in recent + older:
        key = email_key(user.get("email"))
        if key:
            live[key] = user

    added_novo = insert_missing(rows, index, recent, lambda _u: "novo")
    added_older = insert_missing(rows, index, older, seed_status_for)

    activated = 0
    for user in recent + older:
        key = email_key(user.get("email"))
        row = index.get(key)
        if not row:
            continue
        if not (row.get("full_name") or "").strip() and user.get("full_name"):
            row["full_name"] = user["full_name"]
        if not (row.get("jurisdikcija") or "").strip() and user.get("preferred_jurisdiction"):
            row["jurisdikcija"] = normalize_jurisdiction(user.get("preferred_jurisdiction"))
        if not (row.get("registrovan") or "").strip() and user.get("created_at"):
            row["registrovan"] = format_registrovan(user.get("created_at"))
        # Never overwrite rod that already exists (hand-corrected in CSV).
        status = (row.get("status") or "").strip().lower()
        if status != "odgovorio" and is_active_user(user) and status != "aktivan":
            row["status"] = "aktivan"
            activated += 1

    return {
        "recent": recent,
        "live": live,
        "added_novo": added_novo,
        "added_older": added_older,
        "activated": activated,
    }


def send_email(smtp_conn, gmail_address, row, touch):
    jur = row.get("jurisdikcija") or DEFAULT_JURISDICTION
    rod = row.get("rod", "")
    subject, body = render_template(touch, jur, row.get("full_name", ""), rod)
    to_email = row["email"].strip()

    msg = MIMEMultipart("alternative")
    msg["From"] = gmail_address
    msg["To"] = to_email

    if touch == "touch0":
        message_id = make_msgid(domain="legantis.app")
        msg["Message-ID"] = message_id
        msg["Subject"] = subject
    else:
        orig_subject, _ = render_template("touch0", jur, row.get("full_name", ""), rod)
        msg["Subject"] = f"Re: {orig_subject}"
        stored_id = (row.get("message_id") or "").strip()
        if stored_id:
            msg["In-Reply-To"] = stored_id
            msg["References"] = stored_id
        message_id = stored_id or None

    msg.attach(MIMEText(body, "plain", "utf-8"))
    smtp_conn.sendmail(gmail_address, to_email, msg.as_string())
    return True, message_id


def mark_sent(row, touch, message_id):
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    row["status"] = touch
    row[f"{touch}_datum"] = now
    if touch == "touch0" and message_id:
        row["message_id"] = message_id


def print_user_line(row, user, due_touch):
    name = (row.get("full_name") or "").strip() or "(bez imena)"
    email = (row.get("email") or "").strip()
    jur = row.get("jurisdikcija") or "?"
    created_at = user.get("created_at") if user else None
    dan = days_since_registration(created_at, row.get("registrovan"))
    actions = action_count(user) if user else 0
    print(f"{name} ({email}) | {jur} | rod: {rod_value(row)} | dan {dan} | {actions} akcija")

    status = (row.get("status") or "").strip().lower()
    if status == "aktivan" or (user and is_active_user(user) and status != "odgovorio"):
        print("    -> ACTIVE, sequence stopped")
        return
    if status == "odgovorio":
        print("    -> REPLIED, sequence stopped")
        return
    if status == "preskocen":
        print("    -> SKIPPED (preskocen)")
        return
    if due_touch:
        label = due_touch.replace("touch", "TOUCH ").upper()
        print(f"    -> {label} due")
        if not rod_is_set(row):
            print(
                f"    SKIPPED - rod nije postavljen za {email}, upiši m ili z u CSV"
            )
            return
        subject, body = render_template(
            due_touch, row.get("jurisdikcija"), row.get("full_name"), row.get("rod"),
        )
        if due_touch != "touch0":
            orig_subject, _ = render_template(
                "touch0", row.get("jurisdikcija"), row.get("full_name"), row.get("rod"),
            )
            subject = f"Re: {orig_subject}"
        print(f"    Subject: {subject}")
        print("    Body:")
        for line in body.splitlines() or [body]:
            print(f"    {line}")
        return
    if status == "touch0":
        print("    -> waiting (touch 2 not yet due)")
        return
    if status == "touch2":
        print("    -> waiting (touch 5 not yet due)")
        return
    if status == "touch5":
        print("    -> sequence complete")
        return
    print(f"    -> {status or 'novo'}")


def print_due_summary(due_counts):
    print(
        f"due: touch0={due_counts.get('touch0', 0)}, "
        f"touch2={due_counts.get('touch2', 0)}, "
        f"touch5={due_counts.get('touch5', 0)}"
    )


def mark_replied(target):
    rows = load_state()
    if not rows:
        print(f"GREŠKA: {STATE_CSV} ne postoji ili je prazan.")
        sys.exit(1)
    key = email_key(target)
    matched = 0
    for row in rows:
        if email_key(row.get("email")) == key:
            row["status"] = "odgovorio"
            matched += 1
    if not matched:
        print(f"Nije pronađen korisnik sa emailom: {target}")
        sys.exit(1)
    save_state(rows)
    print(f"OK: {target} → status=odgovorio ({matched} redova). Neće više dobijati follow-upe.")


def parse_args():
    parser = argparse.ArgumentParser(description="Legantis welcome email sequence")
    parser.add_argument("--send", action="store_true", help="actually send due emails")
    parser.add_argument("--only", metavar="EMAIL", help="limit to one recipient")
    parser.add_argument(
        "--mark-replied",
        metavar="EMAIL",
        help="set status to odgovorio and exit",
    )
    parser.add_argument(
        "--seed-only",
        action="store_true",
        help="seed missing users as preskocen/aktivan and exit",
    )
    return parser.parse_args()


def main():
    args = parse_args()
    today = datetime.now().strftime("%Y-%m-%d")
    print(f"=== WELCOME SEQUENCE — {today} ===")

    if args.mark_replied:
        mark_replied(args.mark_replied)
        return

    gmail_address, _gmail_password = load_credentials()
    database_url = load_database_url()

    rows = load_state()
    csv_missing = not os.path.exists(STATE_CSV)

    conn = connect_db(database_url)
    try:
        if csv_missing or args.seed_only:
            added, total = seed_existing_users(conn, rows)
            save_state(rows)
            print(
                f"Seeded: preskocen={added.get('preskocen', 0)}, "
                f"aktivan={added.get('aktivan', 0)} "
                f"(queried {total} users, csv now {len(rows)} rows)"
            )
            if csv_missing and args.send:
                print("CSV je tek kreiran — slanje odbijeno. Pokreni --send na sljedećem runu.")
            print_due_summary({})
            return

        sync = sync_daily(conn, rows)
        save_state(rows)
        if sync["added_novo"]:
            print(
                f"New since seed: novo={sync['added_novo'].get('novo', 0)}"
            )
        if sync["added_older"]:
            print(
                f"Backfilled older users: preskocen={sync['added_older'].get('preskocen', 0)}, "
                f"aktivan={sync['added_older'].get('aktivan', 0)}"
            )
        if sync["activated"]:
            print(f"Marked aktivan this run: {sync['activated']}")
    finally:
        conn.close()

    only_key = email_key(args.only) if args.only else None
    recent_keys = {email_key(u.get("email")) for u in sync["recent"]}
    report_rows = []
    due = []
    for row in rows:
        key = email_key(row.get("email"))
        if only_key:
            if key != only_key:
                continue
        elif key not in recent_keys:
            continue
        user = sync["live"].get(key)
        touch = classify_touch(row)
        report_rows.append((row, user, touch))
        if touch and rod_is_set(row):
            due.append((row, touch))

    if only_key and not report_rows:
        print(f"Nije pronađen korisnik: {args.only}")
        print_due_summary({})
        return

    for row, user, touch in report_rows:
        print_user_line(row, user, touch)

    due_counts = Counter(t for _, t in due)
    print()
    print_due_summary(due_counts)

    if not args.send:
        return
    if not due:
        print("Nema ništa za slanje.")
        return

    context = ssl.create_default_context()
    sent_count = 0
    failed_count = 0
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls(context=context)
        server.login(gmail_address, _gmail_password)
        for row, touch in due:
            email = row["email"].strip()
            if not rod_is_set(row):
                print(
                    f"    SKIPPED - rod nije postavljen za {email}, upiši m ili z u CSV"
                )
                continue
            try:
                ok, message_id = send_email(server, gmail_address, row, touch)
                if ok:
                    mark_sent(row, touch, message_id)
                    sent_count += 1
                    print(f"  [{sent_count}/{len(due)}] Poslano {touch}: {email}")
                else:
                    failed_count += 1
            except Exception as e:
                failed_count += 1
                print(f"  GREŠKA za {email}: {e}")
            save_state(rows)
            time.sleep(DELAY_BETWEEN_EMAILS_SECONDS)

    print(f"\nGotovo. Poslano: {sent_count}, Greške: {failed_count}")
    print(f"State CSV ažuriran: {STATE_CSV}")


if __name__ == "__main__":
    main()
