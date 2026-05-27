# pip install requests beautifulsoup4
"""
Download Montenegro court decisions as .txt from sudovi.me.

Run from repo root: python scripts/download-montenegro-pdfs.py
Smoke test: python scripts/download-montenegro-pdfs.py --max-decisions 3
Dedicated courts only: python scripts/download-montenegro-pdfs.py --court visi-podgorica osnovni-bar
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import sys
import time
from dataclasses import dataclass
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from requests.exceptions import ChunkedEncodingError
from urllib3.exceptions import ProtocolError

SEARCH_URL = "https://sudovi.me/api/search/decisions"
DECISION_URL = "https://sudovi.me/api/decision/{dbid}"
DETAIL_PAGE_URL = "https://sudovi.me/vrhs/odluka/{dbid}"
ROWS = 1000

COURTS: list[dict[str, str | int | None]] = [
    {"name": "VRHOVNI SUD CG", "courtCode": "sdvi", "folder": "vrhovni", "year": None},
    {"name": "APELACIONI SUD CG", "courtCode": "sdvi", "folder": "apelacioni", "year": None},
    {"name": "UPRAVNI SUD CG", "courtCode": "sdvi", "folder": "upravni", "year": None},
    {
        "name": "PRIVREDNI SUD CRNE GORE",
        "courtCode": "sdvi",
        "folder": "privredni",
        "year": None,
    },
    {
        "name": "VIŠI SUD U PODGORICI",
        "courtCode": "vspg",
        "folder": "visi-podgorica",
        "year": 2025,
    },
    {
        "name": "OSNOVNI SUD U BARU",
        "courtCode": "osbr",
        "folder": "osnovni-bar",
        "year": 2025,
    },
]

DEDICATED_FOLDERS = frozenset(
    str(c["folder"]) for c in COURTS if str(c["courtCode"]) != "sdvi"
)

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = (15, 90)
SLEEP_SEC = 1.0
FETCH_RETRIES = 3
MIN_TEXT_LEN = 50

_WIN_INVALID = '<>:"/\\|?*'


@dataclass(frozen=True)
class WorkItem:
    dbid: int
    court_name: str
    folder: str
    sifra_predmeta: str
    upisnik_broj: int
    upisnik_godina: int
    detail_url: str


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def resolve_court_folders(names: list[str], parser: argparse.ArgumentParser) -> frozenset[str]:
    invalid = [n for n in names if n not in DEDICATED_FOLDERS]
    if invalid:
        valid = ", ".join(sorted(DEDICATED_FOLDERS))
        parser.error(
            f"invalid dedicated court folder(s): {', '.join(invalid)}. "
            f"Valid folders: {valid}"
        )
    return frozenset(names)


def sanitize_filename(raw: str) -> str:
    s = raw.replace(" ", "_")
    for ch in _WIN_INVALID:
        s = s.replace(ch, "_")
    s = "".join("_" if ord(c) < 32 else c for c in s)
    return s.strip("._ ") or "document.txt"


class PoliteSession(requests.Session):
    def request(self, method, url, **kwargs):  # type: ignore[override]
        kwargs.setdefault("timeout", REQUEST_TIMEOUT)
        kwargs.setdefault("headers", {})
        kwargs["headers"].setdefault("User-Agent", USER_AGENT)
        r = super().request(method, url, **kwargs)
        time.sleep(SLEEP_SEC)
        return r


def load_log(path: Path) -> list[dict]:
    if not path.exists():
        return []
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return []
    return raw if isinstance(raw, list) else []


def save_log(path: Path, rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(path)


def unique_target_path(directory: Path, filename: str, url: str) -> Path:
    p = directory / filename
    if not p.exists():
        return p
    short = hashlib.sha256(url.encode("utf-8")).hexdigest()[:8]
    stem = Path(filename).stem
    return directory / f"{stem}__{short}.txt"


def decision_filename(item: WorkItem) -> str:
    sifra = item.sifra_predmeta.strip() or "X"
    raw = f"{sifra}-{item.upisnik_broj}-{item.upisnik_godina}-{item.dbid}.txt"
    name = sanitize_filename(raw)
    if not name.lower().endswith(".txt"):
        name += ".txt"
    return name


def _is_valid_txt_file(path: Path) -> bool:
    if not path.exists() or path.stat().st_size == 0:
        return False
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return False
    return len(text.strip()) >= MIN_TEXT_LEN


def find_existing_txt(directory: Path, filename: str, url: str) -> Path | None:
    canonical = directory / filename
    if _is_valid_txt_file(canonical):
        return canonical
    hashed = unique_target_path(directory, filename, url)
    if hashed != canonical and _is_valid_txt_file(hashed):
        return hashed
    return None


def fetch_search_page(
    session: PoliteSession, start: int, court_code: str, year: int | None
) -> dict:
    last_err: Exception | None = None
    body: dict[str, str | int] = {
        "courtCode": court_code,
        "start": start,
        "rows": ROWS,
    }
    if year is not None:
        body["year"] = year
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    for attempt in range(FETCH_RETRIES):
        try:
            r = session.post(SEARCH_URL, json=body, headers=headers)
            r.raise_for_status()
            return r.json()
        except (requests.ConnectionError, ChunkedEncodingError, ProtocolError) as e:
            last_err = e
            if attempt + 1 < FETCH_RETRIES:
                time.sleep(2**attempt)
                continue
            raise
        except requests.RequestException:
            raise
    if last_err:
        raise last_err
    raise RuntimeError("fetch_search_page failed without exception")


def collect_work_items(
    session: PoliteSession,
    max_items: int | None = None,
    court_folders: frozenset[str] | None = None,
) -> list[WorkItem]:
    items: list[WorkItem] = []

    # Phase 1: shared sdvi index; filter by courtName from response.
    if court_folders is None:
        legacy_name_to_folder = {
            str(c["name"]): str(c["folder"])
            for c in COURTS
            if str(c["courtCode"]) == "sdvi"
        }
        legacy_names = frozenset(legacy_name_to_folder.keys())

        start = 0
        num_found: int | None = None
        while True:
            data = fetch_search_page(session, start, "sdvi", None)
            if num_found is None:
                num_found = int(data.get("numFound") or 0)
                print(f"Search catalog: {num_found} total decisions (courtCode=sdvi)")

            docs = data.get("docs") or []
            for doc in docs:
                court_name = str(doc.get("courtName") or "")
                if court_name not in legacy_names:
                    continue
                if "OSNOVNI SUD" in court_name.upper():
                    continue
                dbid = doc.get("dbid")
                if not isinstance(dbid, int):
                    continue
                folder = legacy_name_to_folder[court_name]
                sifra = str(doc.get("sifraPredmeta") or "").strip()
                upisnik_broj = int(doc.get("upisnikBroj") or 0)
                upisnik_godina = int(doc.get("upisnikGodina") or 0)
                items.append(
                    WorkItem(
                        dbid=dbid,
                        court_name=court_name,
                        folder=folder,
                        sifra_predmeta=sifra,
                        upisnik_broj=upisnik_broj,
                        upisnik_godina=upisnik_godina,
                        detail_url=DETAIL_PAGE_URL.format(dbid=dbid),
                    )
                )
                if max_items is not None and len(items) >= max_items:
                    print(f"Collected {len(items)} decisions from included courts")
                    return items

            start += ROWS
            if num_found and start % (ROWS * 10) == 0:
                print(
                    f"  scanned {min(start, num_found)}/{num_found}, matched {len(items)}"
                )
            if num_found is not None and start >= num_found:
                break

    # Phase 2: dedicated courtCode streams (each entry in COURTS order).
    for cfg in COURTS:
        if max_items is not None and len(items) >= max_items:
            break
        if str(cfg["courtCode"]) == "sdvi":
            continue
        if court_folders is not None and str(cfg["folder"]) not in court_folders:
            continue

        cc = str(cfg["courtCode"])
        year_val = cfg["year"]
        year_filter: int | None = int(year_val) if year_val is not None else None
        folder_g = str(cfg["folder"])
        name_fallback = str(cfg["name"])

        start = 0
        num_found_cfg: int | None = None
        while True:
            data = fetch_search_page(session, start, cc, year_filter)
            if num_found_cfg is None:
                num_found_cfg = int(data.get("numFound") or 0)
                y_suffix = (
                    f", year={year_filter}" if year_filter is not None else ""
                )
                print(
                    f"Search catalog: {num_found_cfg} total decisions "
                    f"(courtCode={cc}{y_suffix})"
                )

            docs = data.get("docs") or []
            for doc in docs:
                dbid = doc.get("dbid")
                if not isinstance(dbid, int):
                    continue
                court_disp = (
                    str(doc.get("courtName") or "").strip() or name_fallback
                )
                sifra = str(doc.get("sifraPredmeta") or "").strip()
                upisnik_broj = int(doc.get("upisnikBroj") or 0)
                upisnik_godina = int(doc.get("upisnikGodina") or 0)
                items.append(
                    WorkItem(
                        dbid=dbid,
                        court_name=court_disp,
                        folder=folder_g,
                        sifra_predmeta=sifra,
                        upisnik_broj=upisnik_broj,
                        upisnik_godina=upisnik_godina,
                        detail_url=DETAIL_PAGE_URL.format(dbid=dbid),
                    )
                )
                if max_items is not None and len(items) >= max_items:
                    print(f"Collected {len(items)} decisions from included courts")
                    return items

            start += ROWS
            if num_found_cfg and start % (ROWS * 10) == 0:
                print(
                    f"  scanned {min(start, num_found_cfg)}/{num_found_cfg}, "
                    f"matched {len(items)}"
                )
            if num_found_cfg is not None and start >= num_found_cfg:
                break

    print(f"Collected {len(items)} decisions from included courts")
    return items


def fetch_decision_json(session: PoliteSession, dbid: int) -> dict:
    url = DECISION_URL.format(dbid=dbid)
    last_err: Exception | None = None
    for attempt in range(FETCH_RETRIES):
        try:
            r = session.get(url, headers={"Accept": "application/json"})
            if r.status_code == 404:
                raise requests.HTTPError("404", response=r)
            r.raise_for_status()
            if not r.content:
                return {}
            return r.json()
        except (requests.ConnectionError, ChunkedEncodingError, ProtocolError) as e:
            last_err = e
            if attempt + 1 < FETCH_RETRIES:
                time.sleep(2**attempt)
                continue
            raise
    if last_err:
        raise last_err
    raise RuntimeError("fetch_decision_json failed without exception")


def extract_text_from_tekst(tekst: str) -> str:
    soup = BeautifulSoup(tekst, "html.parser")
    for tag in soup(["script", "style"]):
        tag.decompose()
    return soup.get_text("\n", strip=True)


def download_decision_text(
    session: PoliteSession, item: WorkItem, dest: Path
) -> tuple[str, str | None]:
    tmp = dest.with_suffix(dest.suffix + ".partial")
    try:
        data = fetch_decision_json(session, item.dbid)
        tekst = data.get("tekst")
        if not tekst or not str(tekst).strip():
            return "failed", "missing or empty tekst"
        text = extract_text_from_tekst(str(tekst))
        if len(text) < MIN_TEXT_LEN:
            return "failed", f"extracted text too short ({len(text)} chars)"
        tmp.parent.mkdir(parents=True, exist_ok=True)
        tmp.write_text(text, encoding="utf-8")
        tmp.replace(dest)
        return "downloaded", None
    except requests.HTTPError as e:
        code = e.response.status_code if e.response is not None else "HTTP error"
        return "failed", str(code)
    except requests.Timeout:
        return "failed", "timeout"
    except requests.RequestException as e:
        return "failed", str(e)
    except (json.JSONDecodeError, ValueError) as e:
        return "failed", str(e)
    finally:
        if tmp.exists():
            try:
                tmp.unlink()
            except OSError:
                pass


def process_decisions(
    session: PoliteSession,
    items: list[WorkItem],
    out_root: Path,
    log_entries: list[dict],
    iso_now,
    decision_budget: int | None,
    counters: dict[str, int],
) -> None:
    for item in items:
        if decision_budget is not None and decision_budget <= 0:
            break

        txt_dir = out_root / item.folder
        fname = decision_filename(item)
        existing = find_existing_txt(txt_dir, fname, item.detail_url)
        if existing is not None:
            counters["skipped"] += 1
            if decision_budget is not None:
                decision_budget -= 1
            log_entries.append(
                {
                    "court": item.court_name,
                    "folder": item.folder,
                    "filename": existing.name,
                    "url": item.detail_url,
                    "status": "skipped",
                    "downloaded_at": iso_now(),
                }
            )
            continue

        dest = unique_target_path(txt_dir, fname, item.detail_url)
        print(f"Downloading: {dest.name} ({item.court_name})")

        try:
            status, err = download_decision_text(session, item, dest)
        except Exception as e:
            status, err = "failed", str(e)

        entry = {
            "court": item.court_name,
            "folder": item.folder,
            "filename": dest.name if status == "downloaded" else "",
            "url": item.detail_url,
            "status": status,
            "downloaded_at": iso_now(),
        }
        if status == "downloaded":
            entry["filename"] = dest.name
            counters["downloaded"] += 1
        else:
            counters["failed"] += 1
            entry["error"] = err
            print(f"  -> error: {err}", file=sys.stderr)

        log_entries.append(entry)

        if decision_budget is not None:
            decision_budget -= 1


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download Montenegro court decisions as .txt from sudovi.me."
    )
    parser.add_argument(
        "--max-decisions",
        type=int,
        default=0,
        help=(
            "If >0, stop after processing this many decisions "
            "(download/skip/fail; for testing)."
        ),
    )
    parser.add_argument(
        "--court",
        nargs="+",
        metavar="folder",
        help=(
            "Run only dedicated courts with these folder names "
            "(e.g. visi-podgorica osnovni-bar). Skips sdvi Phase 1."
        ),
    )
    args = parser.parse_args()

    court_filter: frozenset[str] | None = None
    if args.court is not None:
        court_filter = resolve_court_folders(args.court, parser)

    out_root = repo_root() / "downloads" / "montenegro"
    log_path = out_root / "download-log.json"

    session = PoliteSession()
    log_entries = load_log(log_path)
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")

    counters = {"downloaded": 0, "failed": 0, "skipped": 0}
    decision_budget = (
        args.max_decisions if args.max_decisions and args.max_decisions > 0 else None
    )

    try:
        items = collect_work_items(
            session, max_items=decision_budget, court_folders=court_filter
        )
        process_decisions(
            session,
            items,
            out_root,
            log_entries,
            iso_now,
            decision_budget,
            counters,
        )
    finally:
        save_log(log_path, log_entries)

    print(
        f"Summary: {counters['downloaded']} decisions downloaded, "
        f"{counters['failed']} failed, {counters['skipped']} skipped",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
