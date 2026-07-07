# pip install requests beautifulsoup4
"""
Download Vrhovni sud Srbije PDFs from vrh.sud.rs.

Run from repo root: python scripts/download-serbia-pdfs.py
Smoke test: python scripts/download-serbia-pdfs.py --max-pdfs 3
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import sys
import time
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse

import requests
import urllib3
from bs4 import BeautifulSoup
from requests.exceptions import ChunkedEncodingError
from urllib3.exceptions import ProtocolError

BASE = "https://vrh.sud.rs"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = (15, 90)
SLEEP_SEC = 1.0
FETCH_RETRIES = 3

PROBE_SLEEP_SEC = 0.35

_WIN_INVALID = '<>:"/\\|?*'

# Slugs use site diacritics (građanska, krivična, zaštita, izvršni, …).
GRADANSKA_SENTENCE_CHILDREN = (
    "stvarno-pravo",
    "obligaciono-pravo",
    "nasledno-pravo",
    "porodično-pravo",
    "privredno-pravo",
    "radno-pravo",
    "zabrana-diskriminacije",
    "medijsko-pravo",
    "građansko-procesno-pravo-–-parnični-postupak",
    "građansko-procesno-pravo-–-vanparnični-postupak",
    "izvršni-postupak",
    "intelektualna-svojina",
    "stečajno-pravo",
    "stambeno-pravo",
)

KRIVICNA_SENTENCE_PATHS = tuple(f"krivična-materija-{i}" for i in range(6))
UPRAVNA_SENTENCE_PATHS = tuple(f"upravna-materija-{i}" for i in range(4))
RAZUMNI_ROK_PATHS = (
    "zaštita-prava-na-suđenje-u-razumnom-roku",
    "zaštita-prava-na-suđenje-u-razumnom-roku-0",
)

LISTINGS: list[dict] = [
    {
        "category": "ustavni",
        "folder": "praksa-ustavnog-suda",
        "paths": ["praksa-ustavnog-suda"],
    },
    {
        "category": "ustavni",
        "folder": "presude-protiv-srbije",
        "paths": ["presude-protiv-srbije"],
    },
    {
        "category": "bilteni",
        "folder": "bilten-vrhovnog-suda",
        "paths": ["bilten-vrhovnog-suda"],
    },
    {
        "category": "bilteni",
        "folder": "bilten-vrhovnog-kasacionog-suda",
        "paths": ["bilten-vrhovnog-kasacionog-suda"],
    },
    {
        "category": "bilteni",
        "folder": "bilten-vrhovnog-suda-srbije",
        "paths": ["bilten-vrhovnog-suda-srbije"],
    },
    {
        "category": "pravna-shvatanja",
        "folder": "krivicna-materija",
        "paths": ["krivična-materija"],
    },
    {
        "category": "pravna-shvatanja",
        "folder": "gradanska-materija",
        "paths": ["građanska-materija"],
    },
    {
        "category": "pravna-shvatanja",
        "folder": "upravna-materija",
        "paths": ["upravna-materija"],
    },
    {
        "category": "pravna-shvatanja",
        "folder": "razumni-rok",
        "paths": list(RAZUMNI_ROK_PATHS),
    },
    {
        "category": "pravna-shvatanja",
        "folder": "referati",
        "paths": ["referati"],
    },
    {
        "category": "sentence",
        "folder": "krivicna-materija",
        "paths": list(KRIVICNA_SENTENCE_PATHS),
    },
    {
        "category": "sentence",
        "folder": "gradanska-materija",
        "paths": [],
        "child_slugs": GRADANSKA_SENTENCE_CHILDREN,
    },
    {
        "category": "sentence",
        "folder": "upravna-materija",
        "paths": list(UPRAVNA_SENTENCE_PATHS),
    },
    {
        "category": "sentence",
        "folder": "razumni-rok",
        "paths": list(RAZUMNI_ROK_PATHS),
    },
    {
        "category": "ujednacavanje",
        "folder": "horizontalno-vertikalno",
        "paths": ["horizontalno-i-vertikalno-ujednacavanje"],
    },
    {
        "category": "ujednacavanje",
        "folder": "sporna-pitanja",
        "paths": ["sporna-pravna-pitanja-0"],
    },
    {
        "category": "ujednacavanje",
        "folder": "apelacioni",
        "paths": ["ujednacavanje-sudske-prakse-apelacionih-sudova"],
    },
    {
        "category": "uporedna",
        "folder": "valutna-klauzula",
        "paths": ["valutna-klauzula"],
    },
]


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def _ssl_verify() -> bool | str:
    """vrh.sud.rs often has an incomplete chain; set VRH_SSL_VERIFY=1 to enforce checks."""
    if os.environ.get("VRH_SSL_VERIFY", "").lower() in ("1", "true", "yes"):
        try:
            import certifi

            return certifi.where()
        except ImportError:
            return True
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    return False


def sanitize_filename(raw: str) -> str:
    s = raw.replace(" ", "_")
    for ch in _WIN_INVALID:
        s = s.replace(ch, "_")
    s = "".join("_" if ord(c) < 32 else c for c in s)
    return s.strip("._ ") or "document.pdf"


class PoliteSession(requests.Session):
    def __init__(self, sleep_sec: float = SLEEP_SEC) -> None:
        super().__init__()
        self.verify = _ssl_verify()
        self._sleep_sec = sleep_sec

    def request(self, method, url, **kwargs):  # type: ignore[override]
        kwargs.setdefault("timeout", REQUEST_TIMEOUT)
        kwargs.setdefault("headers", {})
        kwargs["headers"].setdefault("User-Agent", USER_AGENT)
        kwargs.setdefault("verify", self.verify)
        r = super().request(method, url, **kwargs)
        time.sleep(self._sleep_sec)
        return r


def fetch_html(session: PoliteSession, url: str) -> str:
    last_err: Exception | None = None
    for attempt in range(FETCH_RETRIES):
        try:
            r = session.get(url)
            r.raise_for_status()
            return r.content.decode("utf-8", errors="replace")
        except (requests.ConnectionError, ChunkedEncodingError, ProtocolError) as e:
            last_err = e
            if attempt + 1 < FETCH_RETRIES:
                time.sleep(2**attempt)
                continue
            raise
    if last_err:
        raise last_err
    raise RuntimeError("fetch_html failed without exception")


def is_pdf_href(href: str) -> bool:
    return urlparse(href).path.lower().endswith(".pdf")


def filename_from_url(url: str) -> str:
    path = unquote(urlparse(url).path)
    name = Path(path).name or "document.pdf"
    return sanitize_filename(name)


def is_vrh_pdf_url(url: str) -> bool:
    host = urlparse(url).netloc.lower()
    return host in ("vrh.sud.rs", "www.vrh.sud.rs")


def extract_pdf_links(
    html: str, page_url: str, *, vrh_only: bool = True
) -> list[tuple[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    found: dict[str, str] = {}
    for a in soup.find_all("a", href=True):
        href = (a.get("href") or "").strip()
        if not href or not is_pdf_href(href):
            continue
        abs_url = urljoin(page_url, href)
        if vrh_only and not is_vrh_pdf_url(abs_url):
            continue
        if abs_url not in found:
            label = " ".join(a.get_text().split()).strip()
            found[abs_url] = label or filename_from_url(abs_url)
    return list(found.items())


def extract_child_slugs_on_page(html: str, child_slugs: tuple[str, ...]) -> set[str]:
    """Return which configured child slugs appear as /sr-lat/{slug} links on the page."""
    soup = BeautifulSoup(html, "html.parser")
    present: set[str] = set()
    allowed = set(child_slugs)
    for a in soup.find_all("a", href=True):
        href = (a.get("href") or "").strip()
        if not href:
            continue
        abs_url = urljoin(BASE, href)
        parsed = urlparse(abs_url)
        if parsed.netloc and parsed.netloc not in ("vrh.sud.rs", "www.vrh.sud.rs"):
            continue
        parts = [p for p in parsed.path.split("/") if p]
        if len(parts) >= 2 and parts[0] == "sr-lat":
            slug = parts[1].split("?")[0].rstrip("/")
            if slug in allowed:
                present.add(slug)
    return present


def unique_target_path(directory: Path, filename: str, url: str) -> Path:
    p = directory / filename
    if not p.exists():
        return p
    short = hashlib.sha256(url.encode("utf-8")).hexdigest()[:8]
    stem = Path(filename).stem
    return directory / f"{stem}__{short}.pdf"


def _is_valid_pdf_file(path: Path) -> bool:
    if not path.exists() or path.stat().st_size == 0:
        return False
    with open(path, "rb") as fh:
        return fh.read(5).startswith(b"%PDF")


def find_existing_pdf(directory: Path, filename: str, url: str) -> Path | None:
    """Return path if this URL's PDF is already on disk (resume support)."""
    canonical = directory / filename
    if _is_valid_pdf_file(canonical):
        return canonical
    hashed = unique_target_path(directory, filename, url)
    if hashed != canonical and _is_valid_pdf_file(hashed):
        return hashed
    return None


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


def download_pdf(session: PoliteSession, url: str, dest: Path) -> tuple[str, str | None]:
    tmp = dest.with_suffix(dest.suffix + ".partial")
    try:
        with session.get(url, stream=True) as r:
            if r.status_code == 404:
                return "failed", "404"
            if r.status_code >= 400:
                return "failed", f"HTTP {r.status_code}"
            ctype = (r.headers.get("Content-Type") or "").lower()
            it = r.iter_content(chunk_size=65536)
            first = next(it, b"")
            looks_pdf = first.startswith(b"%PDF")
            type_ok = any(
                part in ctype
                for part in ("pdf", "octet-stream", "download", "binary")
            )
            if not looks_pdf and not type_ok:
                return "failed", f"unexpected content-type: {ctype!r}"

            tmp.parent.mkdir(parents=True, exist_ok=True)
            with open(tmp, "wb") as f:
                f.write(first)
                for chunk in it:
                    if chunk:
                        f.write(chunk)
        tmp.replace(dest)
        return "downloaded", None
    except requests.Timeout:
        return "failed", "timeout"
    except requests.RequestException as e:
        return "failed", str(e)
    finally:
        if tmp.exists():
            try:
                tmp.unlink()
            except OSError:
                pass


def listing_url(path: str) -> str:
    return f"{BASE}/sr-lat/{path}"


def process_pdfs(
    session: PoliteSession,
    pairs: list[tuple[str, str]],
    pdf_dir: Path,
    category: str,
    subcategory: str,
    log_entries: list[dict],
    iso_now,
    pdf_budget: int | None,
    counters: dict[str, int],
) -> int | None:
    """Process PDF pairs; return updated pdf_budget (None if unlimited)."""
    for url, _label in pairs:
        if pdf_budget is not None and pdf_budget <= 0:
            return pdf_budget

        fname = filename_from_url(url)
        existing = find_existing_pdf(pdf_dir, fname, url)
        if existing is not None:
            counters["skipped"] += 1
            if pdf_budget is not None:
                pdf_budget -= 1
            log_entries.append(
                {
                    "category": category,
                    "subcategory": subcategory,
                    "filename": existing.name,
                    "url": url,
                    "status": "skipped",
                    "downloaded_at": iso_now(),
                }
            )
            continue

        dest = unique_target_path(pdf_dir, fname, url)
        print(f"Downloading: {dest.name} from {category} / {subcategory}")

        status, err = download_pdf(session, url, dest)
        entry = {
            "category": category,
            "subcategory": subcategory,
            "filename": dest.name,
            "url": url,
            "status": status,
            "downloaded_at": iso_now(),
        }
        if err:
            entry["error"] = err
        log_entries.append(entry)
        if status == "downloaded":
            counters["downloaded"] += 1
        else:
            counters["failed"] += 1
            print(f"  -> error: {err}", file=sys.stderr)

        if pdf_budget is not None:
            pdf_budget -= 1

    return pdf_budget


def listing_paths_for_entry(listing: dict) -> list[str]:
    paths = listing.get("paths")
    if isinstance(paths, list) and paths:
        return [str(p) for p in paths]
    legacy = listing.get("path")
    if legacy:
        return [str(legacy)]
    return []


def probe_listings(session: PoliteSession) -> list[dict[str, object]]:
    """Count vrh.sud.rs PDF links per listing path without downloading."""
    rows: list[dict[str, object]] = []
    grand_total = 0

    for listing in LISTINGS:
        category = str(listing["category"])
        folder = str(listing["folder"])
        paths = listing_paths_for_entry(listing)
        child_slugs = listing.get("child_slugs") or ()

        listing_total = 0
        path_rows: list[dict[str, object]] = []

        for slug in paths:
            page_url = listing_url(slug)
            try:
                html = fetch_html(session, page_url)
                pairs = extract_pdf_links(html, page_url, vrh_only=True)
                n = len(pairs)
                listing_total += n
                path_rows.append(
                    {
                        "slug": slug,
                        "http_status": 200,
                        "vrh_pdf_count": n,
                        "sample_pdf": pairs[0][0] if pairs else "",
                    }
                )
            except requests.RequestException as e:
                path_rows.append(
                    {
                        "slug": slug,
                        "http_status": "error",
                        "vrh_pdf_count": 0,
                        "error": str(e),
                    }
                )

        child_rows: list[dict[str, object]] = []
        for slug in child_slugs:
            page_url = listing_url(str(slug))
            try:
                html = fetch_html(session, page_url)
                pairs = extract_pdf_links(html, page_url, vrh_only=True)
                n = len(pairs)
                listing_total += n
                child_rows.append(
                    {
                        "slug": slug,
                        "http_status": 200,
                        "vrh_pdf_count": n,
                    }
                )
            except requests.RequestException as e:
                child_rows.append(
                    {
                        "slug": slug,
                        "http_status": "error",
                        "vrh_pdf_count": 0,
                        "error": str(e),
                    }
                )

        grand_total += listing_total
        rows.append(
            {
                "category": category,
                "folder": folder,
                "vrh_pdf_count": listing_total,
                "paths": path_rows,
                "children": child_rows,
            }
        )

    print("\n=== vrh.sud.rs probe summary ===")
    print(f"{'category':<18} {'folder':<32} {'vrh_pdfs':>8}")
    for row in rows:
        print(
            f"{row['category']:<18} {row['folder']:<32} {row['vrh_pdf_count']:>8}"
        )
    print(f"\nGrand total (dedup not applied across pages): {grand_total}")
    return rows


def scrape_listing_entry(
    session: PoliteSession,
    listing: dict,
    out_root: Path,
    log_entries: list[dict],
    iso_now,
    pdf_budget: int | None,
    counters: dict[str, int],
) -> int | None:
    category = str(listing["category"])
    folder = str(listing["folder"])
    pdf_dir = out_root / category / folder

    for slug in listing_paths_for_entry(listing):
        if pdf_budget is not None and pdf_budget <= 0:
            return pdf_budget
        page_url = listing_url(slug)
        pdf_budget, _ = scrape_page(
            session,
            page_url,
            pdf_dir,
            category,
            folder,
            log_entries,
            iso_now,
            pdf_budget,
            counters,
        )

    child_slugs = listing.get("child_slugs") or ()
    for slug in child_slugs:
        if pdf_budget is not None and pdf_budget <= 0:
            break
        child_url = listing_url(str(slug))
        child_dir = pdf_dir / str(slug)
        child_sub = f"{folder}/{slug}"
        pdf_budget, _ = scrape_page(
            session,
            child_url,
            child_dir,
            category,
            child_sub,
            log_entries,
            iso_now,
            pdf_budget,
            counters,
        )

    return pdf_budget


def scrape_page(
    session: PoliteSession,
    page_url: str,
    pdf_dir: Path,
    category: str,
    subcategory: str,
    log_entries: list[dict],
    iso_now,
    pdf_budget: int | None,
    counters: dict[str, int],
) -> tuple[int | None, str | None]:
    """Fetch a listing page and process its PDFs. Returns (budget, html or None)."""
    try:
        html = fetch_html(session, page_url)
    except requests.RequestException as e:
        entry = {
            "category": category,
            "subcategory": subcategory,
            "filename": "",
            "url": page_url,
            "status": "failed",
            "downloaded_at": iso_now(),
            "error": f"listing fetch: {e}",
        }
        log_entries.append(entry)
        counters["failed"] += 1
        print(f"[list failed] {category}/{subcategory}: {e}", file=sys.stderr)
        return pdf_budget, None

    pairs = extract_pdf_links(html, page_url, vrh_only=True)
    if not pairs:
        print(f"[no vrh pdf links] {category}/{subcategory}", file=sys.stderr)

    pdf_budget = process_pdfs(
        session,
        pairs,
        pdf_dir,
        category,
        subcategory,
        log_entries,
        iso_now,
        pdf_budget,
        counters,
    )
    return pdf_budget, html


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download Vrhovni sud Srbije PDFs from vrh.sud.rs."
    )
    parser.add_argument(
        "--max-pdfs",
        type=int,
        default=0,
        help="If >0, stop after processing this many PDF links (download/skip/fail; for testing).",
    )
    parser.add_argument(
        "--probe-listings",
        action="store_true",
        help="Listing-only mode: count vrh.sud.rs PDF links per category (no downloads).",
    )
    args = parser.parse_args()

    if args.probe_listings:
        probe_listings(PoliteSession(sleep_sec=PROBE_SLEEP_SEC))
        return 0

    out_root = repo_root() / "downloads" / "serbia"
    log_path = out_root / "download-log.json"

    session = PoliteSession()
    log_entries = load_log(log_path)
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")

    counters = {"downloaded": 0, "failed": 0, "skipped": 0}
    pdf_budget = args.max_pdfs if args.max_pdfs and args.max_pdfs > 0 else None

    try:
        for listing in LISTINGS:
            if pdf_budget is not None and pdf_budget <= 0:
                break
            pdf_budget = scrape_listing_entry(
                session,
                listing,
                out_root,
                log_entries,
                iso_now,
                pdf_budget,
                counters,
            )

    finally:
        save_log(log_path, log_entries)

    print(
        f"Summary: {counters['downloaded']} PDFs downloaded, "
        f"{counters['failed']} failed, {counters['skipped']} skipped",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
