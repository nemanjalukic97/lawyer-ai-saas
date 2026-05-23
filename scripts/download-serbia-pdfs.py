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

_WIN_INVALID = '<>:"/\\|?*'

GRADANSKA_SENTENCE_CHILDREN = (
    "stvarno-pravo",
    "obligaciono-pravo",
    "nasledno-pravo",
    "porodicno-pravo",
    "privredno-pravo",
    "radno-pravo",
    "zabrana-diskriminacije",
    "medijsko-pravo",
    "gradjansko-procesno-pravo-parnicni-postupak",
    "gradjansko-procesno-pravo-vanparnicni-postupak",
    "izvrsni-postupak",
    "intelektualna-svojina",
    "stecajno-pravo",
    "stambeno-pravo",
)

LISTINGS: list[dict] = [
    {"category": "ustavni", "folder": "praksa-ustavnog-suda", "path": "praksa-ustavnog-suda"},
    {"category": "ustavni", "folder": "presude-protiv-srbije", "path": "presude-protiv-srbije"},
    {"category": "bilteni", "folder": "bilten-vrhovnog-suda", "path": "bilten-vrhovnog-suda"},
    {
        "category": "bilteni",
        "folder": "bilten-vrhovnog-kasacionog-suda",
        "path": "bilten-vrhovnog-kasacionog-suda",
    },
    {
        "category": "bilteni",
        "folder": "bilten-vrhovnog-suda-srbije",
        "path": "bilten-vrhovnog-suda-srbije",
    },
    {"category": "pravna-shvatanja", "folder": "krivicna-materija", "path": "krivicna-materija"},
    {"category": "pravna-shvatanja", "folder": "gradanska-materija", "path": "gradanska-materija"},
    {"category": "pravna-shvatanja", "folder": "upravna-materija", "path": "upravna-materija"},
    {
        "category": "pravna-shvatanja",
        "folder": "razumni-rok",
        "path": "zastita-prava-na-sudjenje-u-razumnom-roku",
    },
    {"category": "pravna-shvatanja", "folder": "referati", "path": "referati"},
    {"category": "sentence", "folder": "krivicna-materija", "path": "krivicna-materija-0"},
    {
        "category": "sentence",
        "folder": "gradanska-materija",
        "path": "gradanska-materija-2",
        "child_slugs": GRADANSKA_SENTENCE_CHILDREN,
    },
    {"category": "sentence", "folder": "upravna-materija", "path": "upravna-materija-0"},
    {
        "category": "sentence",
        "folder": "razumni-rok",
        "path": "zastita-prava-na-sudjenje-u-razumnom-roku-0",
    },
    {
        "category": "ujednacavanje",
        "folder": "horizontalno-vertikalno",
        "path": "horizontalno-i-vertikalno-ujednacavanje",
    },
    {"category": "ujednacavanje", "folder": "sporna-pitanja", "path": "sporna-pravna-pitanja-0"},
    {
        "category": "ujednacavanje",
        "folder": "apelacioni",
        "path": "ujednacavanje-sudske-prakse-apelacionih-sudova",
    },
    {"category": "uporedna", "folder": "valutna-klauzula", "path": "valutna-klauzula"},
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
    def __init__(self) -> None:
        super().__init__()
        self.verify = _ssl_verify()

    def request(self, method, url, **kwargs):  # type: ignore[override]
        kwargs.setdefault("timeout", REQUEST_TIMEOUT)
        kwargs.setdefault("headers", {})
        kwargs["headers"].setdefault("User-Agent", USER_AGENT)
        kwargs.setdefault("verify", self.verify)
        r = super().request(method, url, **kwargs)
        time.sleep(SLEEP_SEC)
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


def extract_pdf_links(html: str, page_url: str) -> list[tuple[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    found: dict[str, str] = {}
    for a in soup.find_all("a", href=True):
        href = (a.get("href") or "").strip()
        if not href or not is_pdf_href(href):
            continue
        abs_url = urljoin(page_url, href)
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

    pairs = extract_pdf_links(html, page_url)
    if not pairs:
        print(f"[no pdf links] {category}/{subcategory}", file=sys.stderr)

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
    args = parser.parse_args()

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

            category = listing["category"]
            folder = listing["folder"]
            path = listing["path"]
            url = listing_url(path)
            pdf_dir = out_root / category / folder
            subcategory = folder

            pdf_budget, html = scrape_page(
                session,
                url,
                pdf_dir,
                category,
                subcategory,
                log_entries,
                iso_now,
                pdf_budget,
                counters,
            )

            child_slugs = listing.get("child_slugs")
            if child_slugs and html is not None:
                present = extract_child_slugs_on_page(html, child_slugs)
                for slug in child_slugs:
                    if slug not in present:
                        print(
                            f"[warn] {slug} not linked on {path}; fetching anyway",
                            file=sys.stderr,
                        )

                for slug in child_slugs:
                    if pdf_budget is not None and pdf_budget <= 0:
                        break
                    child_url = listing_url(slug)
                    child_dir = pdf_dir / slug
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

    finally:
        save_log(log_path, log_entries)

    print(
        f"Summary: {counters['downloaded']} PDFs downloaded, "
        f"{counters['failed']} failed, {counters['skipped']} skipped",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
