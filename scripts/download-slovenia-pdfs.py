# pip install requests beautifulsoup4
"""
Download Slovenia court decisions as .txt from sodnapraksa.si.

Run from repo root: python scripts/download-slovenia-pdfs.py
Smoke test: python scripts/download-slovenia-pdfs.py --max-pages 1
Single court: python scripts/download-slovenia-pdfs.py --court vrhovno
Single court: python scripts/download-slovenia-pdfs.py --court visja
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import math
import re
import sys
import time
from copy import deepcopy
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import urlencode, urljoin

import requests
from bs4 import BeautifulSoup, NavigableString, Tag
from requests.exceptions import ChunkedEncodingError
from urllib3.exceptions import ProtocolError

BASE = "https://www.sodnapraksa.si"
SEARCH_PATH = "/search.php"
ROWS_PER_PAGE = 20

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = (15, 90)
SLEEP_SEC = 1.0
FETCH_RETRIES = 3
MIN_TEXT_LEN = 50

_WIN_INVALID = '<>:"/\\|?*'

VRHOVNO_SEARCH_PARAMS: dict[str, str] = {
    "q": "",
    "advanceSerch": "1",
    "database[SOVS]": "SOVS",
    "trib_title[Vrhovno sodišče]": '"Vrhovno sodišče"',
    "dep_title[Civilni oddelek]": '"Civilni oddelek"',
    "dep_title[Delovno-socialni oddelek]": '"Delovno-socialni oddelek"',
    "dep_title[Gospodarski oddelek]": '"Gospodarski oddelek"',
    "dep_title[Kazenski oddelek]": '"Kazenski oddelek"',
    "dep_title[Upravni oddelek]": '"Upravni oddelek"',
    "meet_dateFrom": "02.03.2022",
    "meet_dateTo": "29.05.2026",
    "order": "date",
    "direction": "desc",
    "rowsPerPage": str(ROWS_PER_PAGE),
    "_submit": "išči",
}

COURTS: list[dict[str, str | dict[str, str]]] = [
    {
        "name": "Vrhovno sodišče",
        "folder": "vrhovno",
        "search_params": VRHOVNO_SEARCH_PARAMS,
    },
    {
        "name": "Višja sodišča",
        "folder": "visja",
        "search_params": {
            "q": "",
            "advanceSerch": "1",
            "database[IESP]": "IESP",
            "trib_title[Višje sodišče v Mariboru]": '"Višje sodišče v Mariboru"',
            "trib_title[Višje sodišče v Ljubljani]": '"Višje sodišče v Ljubljani"',
            "trib_title[Višje sodišče v Kopru]": '"Višje sodišče v Kopru"',
            "trib_title[Višje sodišče v Celju]": '"Višje sodišče v Celju"',
            "dep_title[Civilni oddelek]": '"Civilni oddelek"',
            "dep_title[Gospodarski oddelek]": '"Gospodarski oddelek"',
            "dep_title[Izvršilni oddelek]": '"Izvršilni oddelek"',
            "dep_title[Kazenski oddelek]": '"Kazenski oddelek"',
            "dep_title[Oddelek za prekrške]": '"Oddelek za prekrške"',
            "meet_dateFrom": "14.03.2024",
            "meet_dateTo": "29.05.2026",
            "order": "date",
            "direction": "desc",
            "rowsPerPage": "20",
            "_submit": "išči",
        },
    },
    {
        "name": "Višje delovno in socialno sodišče",
        "folder": "vdss",
        "search_params": {
            "q": "",
            "advanceSerch": "1",
            "database[VDSS]": "VDSS",
            "trib_title[Višje delovno in socialno sodišče]": '"Višje delovno in socialno sodišče"',
            "dep_title[Oddelek za individualne in kolektivne delovne spore]": '"Oddelek za individualne in kolektivne delovne spore"',
            "meet_dateFrom": "10.03.2021",
            "meet_dateTo": "29.05.2026",
            "order": "date",
            "direction": "desc",
            "rowsPerPage": "20",
            "_submit": "išči",
        },
    },
    {
        "name": "Upravno sodišče",
        "folder": "uprs",
        "search_params": {
            "q": "",
            "advanceSerch": "1",
            "database[UPRS]": "UPRS",
            "trib_title[Upravno sodišče]": '"Upravno sodišče"',
            "dep_title[Javne finance]": '"Javne finance"',
            "dep_title[Upravni oddelek]": '"Upravni oddelek"',
            "dep_title[Varstvo ustavnih pravic]": '"Varstvo ustavnih pravic"',
            "meet_dateFrom": "10.03.2022",
            "meet_dateTo": "29.05.2026",
            "order": "date",
            "direction": "desc",
            "rowsPerPage": "20",
            "_submit": "išči",
        },
    },
]

TITLE_PREFIX_RE = re.compile(
    r"^(?:VSRS|VSL|VDSS|UPRS)\s+(?:Sodba|Sklep|Zadeva|Odločba)\s+",
    re.IGNORECASE,
)


@dataclass(frozen=True)
class DecisionLink:
    doc_id: str
    title: str
    url: str


@dataclass
class ParsedDecision:
    title: str
    court: str
    department: str
    case_number: str
    decision_date: str
    ecli: str
    institut: str
    jedro: str
    izrek: str
    obrazlozitev: str
    zveza: str
    meta: dict[str, str] = field(default_factory=dict)


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def sanitize_filename(raw: str) -> str:
    s = raw.replace(" ", "_")
    for ch in _WIN_INVALID:
        s = s.replace(ch, "_")
    s = "".join("_" if ord(c) < 32 else c for c in s)
    return s.strip("._ ") or "document.txt"


def sanitize_case_number(raw: str) -> str:
    s = raw.strip()
    if not s:
        return "unknown"
    s = re.sub(r"[\s/\\|<>:\"?*]+", "-", s)
    s = re.sub(r"[^\w.\-]+", "-", s, flags=re.UNICODE)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "unknown"


def decision_filename(case_number: str) -> str:
    case_part = sanitize_case_number(case_number)
    raw = f"{case_part}.txt"
    name = sanitize_filename(raw.replace("_", "-"))
    if not name.lower().endswith(".txt"):
        name += ".txt"
    return name


class PoliteSession(requests.Session):
    def request(self, method, url, **kwargs):  # type: ignore[override]
        kwargs.setdefault("timeout", REQUEST_TIMEOUT)
        kwargs.setdefault("headers", {})
        kwargs["headers"].setdefault("User-Agent", USER_AGENT)
        r = super().request(method, url, **kwargs)
        time.sleep(SLEEP_SEC)
        return r


def fetch_html(session: PoliteSession, url: str) -> str:
    last_err: Exception | None = None
    for attempt in range(FETCH_RETRIES):
        try:
            r = session.get(url)
            r.raise_for_status()
            r.encoding = r.apparent_encoding or "utf-8"
            return r.text
        except (requests.ConnectionError, ChunkedEncodingError, ProtocolError) as e:
            last_err = e
            if attempt + 1 < FETCH_RETRIES:
                time.sleep(2**attempt)
                continue
            raise
    if last_err:
        raise last_err
    raise RuntimeError("fetch_html failed without exception")


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


def listing_url(search_params: dict[str, str], page: int) -> str:
    params = dict(search_params)
    params["page"] = str(page)
    query = urlencode(params, doseq=True)
    return f"{BASE}{SEARCH_PATH}?{query}"


def parse_num_hits(html: str) -> int | None:
    soup = BeautifulSoup(html, "html.parser")
    el = soup.select_one("#num-hits")
    if el is not None:
        text = el.get_text(" ", strip=True)
        m = re.search(r"(\d[\d.]*)", text.replace(".", ""))
        if m:
            return int(m.group(1))
    m = re.search(r"[ŠS]tevilo zadetkov:\s*([\d.]+)", html, re.I)
    if m:
        return int(m.group(1).replace(".", ""))
    return None


def _results_table(soup: BeautifulSoup) -> Tag | None:
    anchor = soup.find("a", attrs={"name": "showResults"})
    if anchor is None:
        return None
    table = anchor.find_next("table")
    return table if isinstance(table, Tag) else None


def extract_listing_links(html: str, page_url: str) -> list[DecisionLink]:
    soup = BeautifulSoup(html, "html.parser")
    table = _results_table(soup)
    if table is None:
        return []

    rows = table.find_all("tr")
    if len(rows) <= 1:
        return []

    seen: set[str] = set()
    links: list[DecisionLink] = []
    for row in rows[1:]:
        if not isinstance(row, Tag):
            continue
        anchor = row.find("a", href=True)
        if anchor is None:
            continue

        href = (anchor.get("href") or "").strip()
        if not href or "id=" not in href:
            continue

        doc_id = ""
        checkbox = row.find("input", attrs={"name": re.compile(r"aDocumnts\[")})
        if checkbox is not None:
            doc_id = str(checkbox.get("value") or "").strip()
        if not doc_id:
            m = re.search(r"[?&]id=(\d+)", href)
            if m:
                doc_id = m.group(1)
        if not doc_id or doc_id in seen:
            continue

        seen.add(doc_id)
        title = " ".join(anchor.get_text().split()).strip()
        abs_url = urljoin(page_url, href)
        links.append(DecisionLink(doc_id=doc_id, title=title, url=abs_url))

    return links


def _normalize_label(text: str) -> str:
    return text.strip().rstrip(":").strip()


def _meta_from_table(soup: BeautifulSoup) -> dict[str, str]:
    out: dict[str, str] = {}
    meta = soup.select_one("#doc-meta")
    if meta is None:
        return out
    for tr in meta.find_all("tr"):
        th = tr.find("th")
        td = tr.find("td")
        if th is None or td is None:
            continue
        label = _normalize_label(th.get_text(" ", strip=True))
        value = " ".join(td.get_text().split()).strip()
        if label and value:
            out[label] = value
    return out


def _case_number_from_title(title: str) -> str:
    t = " ".join(title.split()).strip()
    if not t:
        return ""
    t = TITLE_PREFIX_RE.sub("", t).strip()
    return t


def _case_number_from_meta(meta: dict[str, str]) -> str:
    for label, value in meta.items():
        norm = _normalize_label(label).lower()
        if norm == "opravilna številka":
            return value
    return ""


def _case_number_from_ecli(ecli: str) -> str:
    if not ecli:
        return ""
    parts = ecli.split(":")
    if len(parts) >= 2:
        tail = parts[-1]
        if tail:
            return tail.replace(".", " ")
    return ""


def resolve_case_number(
    meta: dict[str, str], title: str, doc_id: str
) -> str:
    case = _case_number_from_meta(meta)
    if case:
        return case
    case = _case_number_from_title(title)
    if case:
        return case
    case = _case_number_from_ecli(meta.get("ECLI", ""))
    if case:
        return case
    return doc_id or "unknown"


def _section_text(content: Tag, heading: str) -> str:
    target = None
    for h2 in content.find_all("h2"):
        if " ".join(h2.get_text().split()).strip() == heading:
            target = h2
            break
    if target is None:
        return ""

    parts: list[str] = []
    for sib in target.next_siblings:
        if isinstance(sib, NavigableString):
            text = str(sib).strip()
            if text:
                parts.append(text)
            continue
        if not isinstance(sib, Tag):
            continue
        if sib.name == "h2":
            break
        if sib.name == "strong" and "zveza" in sib.get_text().lower():
            break
        text = sib.get_text("\n", strip=True)
        if text:
            parts.append(text)
    return "\n\n".join(parts).strip()


def _zveza_text(content: Tag, soup: BeautifulSoup) -> str:
    conn = soup.select_one("div.doc-connection")
    if conn is not None:
        text = conn.get_text("\n", strip=True)
        if text:
            return text

    for strong in content.find_all("strong"):
        if "zveza" in strong.get_text().lower():
            parts: list[str] = []
            for sib in strong.next_siblings:
                if isinstance(sib, NavigableString):
                    text = str(sib).strip()
                    if text:
                        parts.append(text)
                    continue
                if not isinstance(sib, Tag):
                    continue
                if sib.name == "h2":
                    break
                if sib.get("class") and "disclaimer" in sib.get("class", []):
                    break
                text = sib.get_text("\n", strip=True)
                if text:
                    parts.append(text)
            return "\n\n".join(parts).strip()
    return ""


def parse_detail_page(html: str, url: str, listing_title: str = "") -> ParsedDecision:
    soup = BeautifulSoup(html, "html.parser")
    meta = _meta_from_table(soup)

    content = soup.select_one("#doc-content")
    title = listing_title
    if content is not None:
        head = content.select_one(".doc-head")
        if head is not None:
            head_text = " ".join(head.get_text().split()).strip()
            if head_text:
                title = head_text.split("pomembnej")[0].strip() or head_text

    case_number = resolve_case_number(meta, title, "")
    return ParsedDecision(
        title=title,
        court=meta.get("Sodišče", ""),
        department=meta.get("Oddelek", ""),
        case_number=case_number,
        decision_date=meta.get("Datum odločbe", ""),
        ecli=meta.get("ECLI", ""),
        institut=meta.get("Institut", ""),
        jedro=_section_text(content, "Jedro") if content else "",
        izrek=_section_text(content, "Izrek") if content else "",
        obrazlozitev=_section_text(content, "Obrazložitev") if content else "",
        zveza=_zveza_text(content, soup) if content else "",
        meta=meta,
    )


def format_decision_file(parsed: ParsedDecision, url: str) -> str:
    header_lines = [
        f"Sodišče: {parsed.court}",
        f"Oddelek: {parsed.department}",
        f"Opravilna številka: {parsed.case_number}",
        f"Datum odločbe: {parsed.decision_date}",
        f"ECLI: {parsed.ecli}",
        f"Institut: {parsed.institut}",
        f"URL: {url}",
        "",
        "---",
        "",
        "Jedro:",
        parsed.jedro,
        "",
        "Izrek:",
        parsed.izrek,
        "",
        "Obrazložitev:",
        parsed.obrazlozitev,
        "",
        "Zveza:",
        parsed.zveza,
    ]
    return "\n".join(header_lines)


def save_decision_text(dest: Path, content: str) -> None:
    tmp = dest.with_suffix(dest.suffix + ".partial")
    try:
        tmp.parent.mkdir(parents=True, exist_ok=True)
        tmp.write_text(content, encoding="utf-8")
        tmp.replace(dest)
    finally:
        if tmp.exists() and not dest.exists():
            try:
                tmp.unlink()
            except OSError:
                pass


def _content_len(parsed: ParsedDecision) -> int:
    return len(
        (parsed.obrazlozitev or parsed.jedro or parsed.izrek or "").strip()
    )


def process_decision(
    session: PoliteSession,
    link: DecisionLink,
    court: dict,
    txt_dir: Path,
    log_entries: list[dict],
    iso_now,
    counters: dict[str, int],
) -> None:
    court_name = str(court["name"])
    folder = str(court["folder"])

    fname = decision_filename("unknown")
    existing = find_existing_txt(txt_dir, fname, link.url)
    if existing is None:
        for path in txt_dir.glob("*.txt"):
            if not _is_valid_txt_file(path):
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except (OSError, UnicodeDecodeError):
                continue
            if link.url in text or link.doc_id in text:
                existing = path
                break

    if existing is not None:
        counters["skipped"] += 1
        log_entries.append(
            {
                "court": court_name,
                "folder": folder,
                "filename": existing.name,
                "url": link.url,
                "status": "skipped",
                "downloaded_at": iso_now(),
            }
        )
        return

    dest = unique_target_path(txt_dir, fname, link.url)
    print(f"Fetching: {link.title[:60]}… ({court_name})")

    status = "failed"
    err: str | None = None
    try:
        html = fetch_html(session, link.url)
        parsed = parse_detail_page(html, link.url, listing_title=link.title)
        if not parsed.case_number or parsed.case_number == "unknown":
            parsed.case_number = resolve_case_number(
                parsed.meta, parsed.title or link.title, link.doc_id
            )
        fname = decision_filename(parsed.case_number)
        dest = unique_target_path(txt_dir, fname, link.url)
        print(f"  -> {dest.name}")
        if _content_len(parsed) < MIN_TEXT_LEN:
            err = f"extracted text too short ({_content_len(parsed)} chars)"
        else:
            save_decision_text(dest, format_decision_file(parsed, link.url))
            status = "downloaded"
    except requests.HTTPError as e:
        err = str(e.response.status_code if e.response is not None else "HTTP error")
    except requests.Timeout:
        err = "timeout"
    except requests.RequestException as e:
        err = str(e)
    except Exception as e:
        err = str(e)

    entry = {
        "court": court_name,
        "folder": folder,
        "filename": "",
        "url": link.url,
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


def scrape_court(
    session: PoliteSession,
    court: dict,
    max_pages: int | None,
    decision_budget: int | None,
    out_root: Path,
    log_entries: list[dict],
    iso_now,
    counters: dict[str, int],
) -> None:
    folder = str(court["folder"])
    court_name = str(court["name"])
    search_params = deepcopy(dict(court["search_params"]))  # type: ignore[arg-type]
    txt_dir = out_root / folder

    print(f"\n=== {court_name}, folder={folder} ===")

    first_url = listing_url(search_params, 0)
    try:
        first_html = fetch_html(session, first_url)
    except requests.RequestException as e:
        counters["failed"] += 1
        log_entries.append(
            {
                "court": court_name,
                "folder": folder,
                "filename": "",
                "url": first_url,
                "status": "failed",
                "downloaded_at": iso_now(),
                "error": f"listing fetch: {e}",
            }
        )
        print(f"  [list failed] page 0: {e}", file=sys.stderr)
        return

    num_hits = parse_num_hits(first_html)
    if num_hits is not None:
        total_pages = max(1, math.ceil(num_hits / ROWS_PER_PAGE))
        print(f"  catalog: {num_hits} decisions, {total_pages} page(s)")
    else:
        total_pages = max_pages if max_pages and max_pages > 0 else 1
        print(f"  catalog: unknown hit count, using {total_pages} page(s)")

    if max_pages is not None and max_pages > 0:
        total_pages = min(total_pages, max_pages)

    for page in range(total_pages):
        if decision_budget is not None and decision_budget <= 0:
            break

        list_url = listing_url(search_params, page)
        print(f"Listing page {page + 1}/{total_pages}: {list_url}")
        if page == 0:
            html = first_html
        else:
            try:
                html = fetch_html(session, list_url)
            except requests.RequestException as e:
                counters["failed"] += 1
                log_entries.append(
                    {
                        "court": court_name,
                        "folder": folder,
                        "filename": "",
                        "url": list_url,
                        "status": "failed",
                        "downloaded_at": iso_now(),
                        "error": f"listing fetch: {e}",
                    }
                )
                print(f"  [list failed] page {page}: {e}", file=sys.stderr)
                continue

        links = extract_listing_links(html, list_url)
        if not links:
            print(f"  [no links] page {page}", file=sys.stderr)
            break

        print(f"  found {len(links)} decision(s)")
        for link in links:
            if decision_budget is not None and decision_budget <= 0:
                break
            try:
                process_decision(
                    session,
                    link,
                    court,
                    txt_dir,
                    log_entries,
                    iso_now,
                    counters,
                )
            except Exception as e:
                counters["failed"] += 1
                log_entries.append(
                    {
                        "court": court_name,
                        "folder": folder,
                        "filename": "",
                        "url": link.url,
                        "status": "failed",
                        "downloaded_at": iso_now(),
                        "error": str(e),
                    }
                )
                print(f"  -> error: {e}", file=sys.stderr)

            if decision_budget is not None:
                decision_budget -= 1


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download Slovenia court decisions as .txt from sodnapraksa.si."
    )
    parser.add_argument(
        "--max-pages",
        type=int,
        default=0,
        help="If >0, cap listing pages per court (for testing).",
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
        metavar="FOLDER",
        help="Run only one court by folder name (e.g. vrhovno, visja).",
    )
    args = parser.parse_args()

    courts_to_run = COURTS
    if args.court:
        courts_to_run = [c for c in COURTS if c["folder"] == args.court]
        if not courts_to_run:
            valid = ", ".join(str(c["folder"]) for c in COURTS)
            print(
                f"Unknown --court {args.court!r}. Valid: {valid}",
                file=sys.stderr,
            )
            return 1

    out_root = repo_root() / "downloads" / "slovenia"
    log_path = out_root / "download-log.json"

    session = PoliteSession()
    log_entries = load_log(log_path)
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")

    counters = {"downloaded": 0, "failed": 0, "skipped": 0}
    max_pages = args.max_pages if args.max_pages and args.max_pages > 0 else None
    decision_budget = (
        args.max_decisions if args.max_decisions and args.max_decisions > 0 else None
    )

    try:
        for court in courts_to_run:
            scrape_court(
                session,
                court,
                max_pages,
                decision_budget,
                out_root,
                log_entries,
                iso_now,
                counters,
            )
    finally:
        save_log(log_path, log_entries)

    print(
        f"\nSummary: {counters['downloaded']} decisions downloaded, "
        f"{counters['failed']} failed, {counters['skipped']} skipped",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
