# pip install requests beautifulsoup4
"""
Download Croatia high-court decisions as .txt from odluke.sudovi.hr.

Run from repo root: python scripts/download-croatia-pdfs.py
Smoke test: python scripts/download-croatia-pdfs.py --court vks --max-pages 1
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from requests.exceptions import ChunkedEncodingError
from urllib3.exceptions import ProtocolError

BASE = "https://odluke.sudovi.hr"
GUID_RE = re.compile(
    r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
    re.IGNORECASE,
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

COURTS: list[dict[str, str | int]] = [
    {
        "code": "vks",
        "name": "Visoki kazneni sud",
        "folder": "visoki-kazneni",
        "max_pages": 235,
    },
    {
        "code": "vps",
        "name": "Visoki prekršajni sud",
        "folder": "visoki-prekrsajni",
        "max_pages": 200,
    },
    {"code": "vs", "name": "Vrhovni sud", "folder": "vrhovni", "max_pages": 200},
    {
        "code": "vts",
        "name": "Visoki trgovački sud",
        "folder": "visoki-trgovacki",
        "max_pages": 200,
    },
    {
        "code": "vus",
        "name": "Visoki upravni sud",
        "folder": "visoki-upravni",
        "max_pages": 200,
    },
]

COURT_BY_CODE = {str(c["code"]): c for c in COURTS}

METADATA_LABELS = {
    "case_number": ("Broj odluke", "Poslovni broj", "Upisnik"),
    "court": ("Sud",),
    "date": ("Datum odluke",),
}


@dataclass(frozen=True)
class DecisionLink:
    guid: str
    url: str


@dataclass
class ParsedDecision:
    title: str
    court: str
    date: str
    case_number: str
    body: str


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


def guid_short(guid: str) -> str:
    return guid.replace("-", "").lower()[:8]


def decision_filename(case_number: str, guid: str) -> str:
    case_part = sanitize_case_number(case_number)
    short = guid_short(guid)
    raw = f"{case_part}-{short}.txt"
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


def listing_url(court_code: str, page: int) -> str:
    return (
        f"{BASE}/Document/DisplayList?sort=dat&ct={court_code}&page={page}"
    )


def detail_url(guid: str) -> str:
    return f"{BASE}/Document/View?id={guid}"


def extract_guid_from_href(href: str) -> str | None:
    m = GUID_RE.search(href)
    if not m:
        return None
    return m.group(0).lower()


def extract_detail_links(html: str, page_url: str) -> list[DecisionLink]:
    soup = BeautifulSoup(html, "html.parser")
    seen: set[str] = set()
    links: list[DecisionLink] = []
    for a in soup.find_all("a", href=True):
        href = (a.get("href") or "").strip()
        if not href or "/Document/View" not in href:
            continue
        guid = extract_guid_from_href(href)
        if not guid or guid in seen:
            continue
        seen.add(guid)
        abs_url = urljoin(page_url, href)
        parsed = urlparse(abs_url)
        if parsed.netloc and "sudovi.hr" not in parsed.netloc:
            continue
        links.append(DecisionLink(guid=guid, url=abs_url))
    return links


def _label_match(text: str, labels: tuple[str, ...]) -> bool:
    t = text.strip().rstrip(":")
    return any(t == lab or t.startswith(lab + ":") for lab in labels)


def _value_from_metadata_title(el) -> str:
    sib = el.find_next_sibling()
    if sib is not None:
        return " ".join(sib.get_text().split()).strip()
    parent = el.parent
    if parent is not None:
        full = " ".join(parent.get_text().split()).strip()
        label = " ".join(el.get_text().split()).strip().rstrip(":")
        if full.startswith(label):
            rest = full[len(label) :].lstrip(" :")
            if rest:
                return rest
    return ""


def _metadata_from_panel(soup: BeautifulSoup) -> dict[str, str]:
    out: dict[str, str] = {}
    panel = soup.select_one(".metadata")
    if not panel:
        return out
    for title_el in panel.find_all(class_="metadata-title"):
        label_text = " ".join(title_el.get_text().split()).strip()
        value = _value_from_metadata_title(title_el)
        if not value:
            continue
        for key, labels in METADATA_LABELS.items():
            if _label_match(label_text, labels) and not out.get(key):
                out[key] = value
    return out


def _metadata_from_text(soup: BeautifulSoup) -> dict[str, str]:
    out: dict[str, str] = {}
    text = soup.get_text("\n")
    patterns = [
        ("case_number", r"(?:Broj odluke|Poslovni broj)\s*:\s*(.+)", re.I),
        ("court", r"Sud\s*:\s*(.+)", re.I),
        ("date", r"Datum odluke\s*:\s*(.+)", re.I),
    ]
    for key, pat, flags in patterns:
        m = re.search(pat, text, flags)
        if m:
            out[key] = " ".join(m.group(1).split()).strip()
    return out


def _page_title(soup: BeautifulSoup) -> str:
    h1 = soup.find("h1")
    if h1:
        t = " ".join(h1.get_text().split()).strip()
        if t:
            return t
    doc_title = soup.select_one(".document-title")
    if doc_title:
        t = " ".join(doc_title.get_text().split()).strip()
        if t:
            return t
    if soup.title and soup.title.string:
        t = " ".join(soup.title.string.split()).strip()
        if t:
            return t.split(",")[0].strip()
    return ""


def _extract_body(soup: BeautifulSoup) -> str:
    body_el = soup.select_one(".decision-text")
    if body_el is not None:
        clone = BeautifulSoup(str(body_el), "html.parser")
        for tag in clone(["script", "style"]):
            tag.decompose()
        text = clone.get_text("\n", strip=True)
        if text:
            return text.lstrip("\ufeff").strip()

    main = soup.find("main")
    if main is not None:
        clone = BeautifulSoup(str(main), "html.parser")
        for tag in clone(["script", "style", "nav", "footer", "header"]):
            tag.decompose()
        for el in clone.select(".metadata, .md-modal-content, .cookies-text"):
            el.decompose()
        text = clone.get_text("\n", strip=True)
        if len(text) >= MIN_TEXT_LEN:
            return text.lstrip("\ufeff").strip()

    return ""


def parse_decision_page(html: str, url: str) -> ParsedDecision:
    soup = BeautifulSoup(html, "html.parser")
    meta = _metadata_from_panel(soup)
    meta.update({k: v for k, v in _metadata_from_text(soup).items() if k not in meta})

    title = _page_title(soup)
    case_number = meta.get("case_number", "")
    if not case_number and title:
        m = re.match(r"^([^\s,]+(?:\s+[^\s,]+)*?)(?:\s*,|\s*$)", title)
        if m:
            case_number = m.group(1).strip()

    body = _extract_body(soup)
    return ParsedDecision(
        title=title,
        court=meta.get("court", ""),
        date=meta.get("date", ""),
        case_number=case_number,
        body=body,
    )


def format_decision_file(parsed: ParsedDecision, url: str) -> str:
    header_lines = [
        f"Naslov: {parsed.title}",
        f"Sud: {parsed.court}",
        f"Datum odluke: {parsed.date}",
        f"Broj odluke: {parsed.case_number}",
        f"URL: {url}",
        "",
        "---",
        "",
        parsed.body,
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

    fname = decision_filename("unknown", link.guid)
    existing = find_existing_txt(txt_dir, fname, link.url)
    if existing is None:
        for path in txt_dir.glob(f"*-{guid_short(link.guid)}.txt"):
            if _is_valid_txt_file(path):
                existing = path
                break
        if existing is None:
            for path in txt_dir.glob(f"*-{guid_short(link.guid)}__*.txt"):
                if _is_valid_txt_file(path):
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
    print(f"Fetching: {link.guid[:8]}… ({court_name})")

    status = "failed"
    err: str | None = None
    try:
        html = fetch_html(session, link.url)
        parsed = parse_decision_page(html, link.url)
        if parsed.case_number:
            fname = decision_filename(parsed.case_number, link.guid)
            dest = unique_target_path(txt_dir, fname, link.url)
        print(f"  -> {dest.name}")
        if len(parsed.body) < MIN_TEXT_LEN:
            err = f"extracted body too short ({len(parsed.body)} chars)"
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
    max_pages: int,
    out_root: Path,
    log_entries: list[dict],
    iso_now,
    counters: dict[str, int],
) -> None:
    code = str(court["code"])
    folder = str(court["folder"])
    court_name = str(court["name"])
    txt_dir = out_root / folder

    print(f"\n=== {court_name} ({code}), pages 1–{max_pages} ===")

    for page in range(1, max_pages + 1):
        list_url = listing_url(code, page)
        print(f"Listing page {page}/{max_pages}: {list_url}")

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

        links = extract_detail_links(html, list_url)
        if not links:
            print(f"  [no links] page {page}", file=sys.stderr)
            continue

        print(f"  found {len(links)} decision(s)")
        for link in links:
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


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download Croatia high-court decisions as .txt from odluke.sudovi.hr."
    )
    parser.add_argument(
        "--max-pages",
        type=int,
        default=0,
        help="If >0, override max listing pages per court (for testing).",
    )
    parser.add_argument(
        "--court",
        choices=sorted(COURT_BY_CODE.keys()),
        help="Scrape only this court code (vks, vps, vs, vts, vus).",
    )
    args = parser.parse_args()

    courts = COURTS
    if args.court:
        courts = [COURT_BY_CODE[args.court]]

    out_root = repo_root() / "downloads" / "croatia"
    log_path = out_root / "download-log.json"

    session = PoliteSession()
    log_entries = load_log(log_path)
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")

    counters = {"downloaded": 0, "failed": 0, "skipped": 0}

    try:
        for court in courts:
            max_p = (
                args.max_pages
                if args.max_pages and args.max_pages > 0
                else int(court["max_pages"])
            )
            scrape_court(
                session,
                court,
                max_p,
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
