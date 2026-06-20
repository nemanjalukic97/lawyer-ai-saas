# pip install requests beautifulsoup4
"""
Download BiH and Montenegro laws as .txt from paragraf.ba / paragraf.me.

Run from repo root:
  python scripts/download-paragraf-ba-laws.py --jurisdiction fbih
  python scripts/download-paragraf-ba-laws.py --jurisdiction me --max-laws 3
  python scripts/download-paragraf-ba-laws.py --jurisdiction all --max-laws 5
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
from typing import Any, Iterator
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from requests.exceptions import ChunkedEncodingError
from urllib3.exceptions import ProtocolError

BASE_SITE = "https://www.paragraf.ba"

USER_AGENT = "Mozilla/5.0 (compatible; LegantisBot/1.0)"
REQUEST_TIMEOUT = 30
SLEEP_SEC = 1.0
FETCH_RETRIES = 3
MIN_TEXT_LEN = 200

_WIN_INVALID = '<>:"/\\|?*'

CLAN_RE = re.compile(r"\bčlan\b|\bclan\b", re.IGNORECASE)
YEAR_RE = re.compile(r"(?:19|20)\d{2}")

JURISDICTIONS: dict[str, dict[str, str]] = {
    "bih": {
        "index": "besplatni-propisi-bih.html",
        "path_prefix": "propisi/bih/",
    },
    "fbih": {
        "index": "besplatni-propisi-fbih.html",
        "path_prefix": "propisi/fbih/",
    },
    "rs": {
        "index": "besplatni-propisi-republike-srpske.html",
        "path_prefix": "propisi/republika-srpska/",
    },
    "brcko": {
        "index": "besplatni-propisi-brcko-distrikta.html",
        "path_prefix": "propisi/brcko/",
    },
    "me": {
        "index": "https://www.paragraf.me/besplatni_propisi_cg.html",
        "path_prefix": "propisi-crnegore/",
        "base_url": "https://www.paragraf.me/",
    },
}

JURISDICTION_ORDER = ("bih", "fbih", "rs", "brcko", "me")


@dataclass(frozen=True)
class LawStub:
    slug: str
    title: str
    url: str
    jurisdiction: str


@dataclass
class ParsedAct:
    title: str
    category: str
    year: int
    body: str


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def _site_base(cfg: dict[str, str]) -> str:
    base = cfg.get("base_url", BASE_SITE)
    return base.rstrip("/") + "/"


def _index_url(cfg: dict[str, str]) -> str:
    index = cfg["index"]
    if index.startswith("http://") or index.startswith("https://"):
        return index
    return urljoin(_site_base(cfg), index)


def out_dir(jurisdiction: str) -> Path:
    if jurisdiction == "me":
        return repo_root() / "downloads" / "paragraf-me"
    return repo_root() / "downloads" / f"paragraf-ba-{jurisdiction}"


def slug_from_url(url: str) -> str:
    path = urlparse(url).path.rstrip("/")
    name = path.rsplit("/", 1)[-1]
    if name.lower().endswith(".html"):
        name = name[:-5]
    return name or "document"


def law_filename(slug: str) -> str:
    return sanitize_filename(f"{slug}.txt")


def sanitize_filename(raw: str) -> str:
    s = raw.replace(" ", "_")
    for ch in _WIN_INVALID:
        s = s.replace(ch, "_")
    s = "".join("_" if ord(c) < 32 else c for c in s)
    s = s.strip("._ ") or "document.txt"
    if not s.lower().endswith(".txt"):
        s += ".txt"
    return s


class PoliteSession(requests.Session):
    def request(self, method, url, **kwargs):  # type: ignore[override]
        kwargs.setdefault("timeout", REQUEST_TIMEOUT)
        kwargs.setdefault("headers", {})
        kwargs["headers"].setdefault("User-Agent", USER_AGENT)
        r = super().request(method, url, **kwargs)
        time.sleep(SLEEP_SEC)
        return r


def fetch_text(session: PoliteSession, url: str) -> str:
    last_err: Exception | None = None
    for attempt in range(FETCH_RETRIES):
        try:
            r = session.get(url)
            r.raise_for_status()
            if not r.encoding or r.encoding.lower() in ("iso-8859-1", "windows-1252"):
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
    raise RuntimeError("fetch_text failed without exception")


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
    if directory.exists():
        for path in directory.glob("*.txt"):
            if not _is_valid_txt_file(path):
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except (OSError, UnicodeDecodeError):
                continue
            if f"URL: {url}" in text or url in text:
                return path
    return None


def save_act_text(dest: Path, content: str) -> None:
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


def _extract_years(*texts: str) -> list[int]:
    years: list[int] = []
    for text in texts:
        if not text:
            continue
        for m in YEAR_RE.finditer(text):
            years.append(int(m.group(0)))
    return years


def iter_law_stubs(session: PoliteSession, jurisdiction: str) -> Iterator[LawStub]:
    cfg = JURISDICTIONS[jurisdiction]
    site = _site_base(cfg)
    index_url = _index_url(cfg)
    prefix = cfg["path_prefix"]
    html = fetch_text(session, index_url)
    soup = BeautifulSoup(html, "html.parser")
    seen: set[str] = set()

    for anchor in soup.find_all("a", href=True):
        href = anchor["href"].strip()
        if href.startswith(("http://", "https://")):
            href = urlparse(href).path.lstrip("/")
        if not href.startswith(prefix) or not href.endswith(".html"):
            continue
        full_url = urljoin(site, href)
        if full_url in seen:
            continue
        seen.add(full_url)
        title = anchor.get_text(strip=True)
        if not title:
            continue
        yield LawStub(
            slug=slug_from_url(full_url),
            title=title,
            url=full_url,
            jurisdiction=jurisdiction,
        )


def parse_law_page(html: str) -> ParsedAct:
    soup = BeautifulSoup(html, "html.parser")
    h1 = soup.find("h1")
    if not h1:
        raise RuntimeError("missing h1 title")
    title = h1.get_text(strip=True)

    h2 = h1.find_next("h2")
    glasnik = h2.get_text(strip=True) if h2 else ""

    category = ""
    crumbs = soup.select("ol.breadcrumb li")
    if len(crumbs) >= 2:
        category = crumbs[1].get_text(strip=True)

    years = _extract_years(glasnik, title)
    year = min(years) if years else 0

    article = soup.find("article")
    if not article:
        raise RuntimeError("missing article body")
    for bad in article.select("script, style, nav, ol.breadcrumb, .breadcrumb"):
        bad.decompose()
    body = article.get_text("\n", strip=True)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()

    return ParsedAct(title=title, category=category, year=year, body=body)


def format_act_file(parsed: ParsedAct, stub: LawStub) -> str:
    header = [
        f"Naziv: {parsed.title}",
        f"URL: {stub.url}",
        f"Kategorija: {parsed.category}",
        f"Godina: {parsed.year}",
        "",
        "---",
        "",
        parsed.body,
    ]
    return "\n".join(header)


def _body_ok(parsed: ParsedAct) -> bool:
    body = parsed.body.strip()
    if len(body) < MIN_TEXT_LEN:
        return False
    if CLAN_RE.search(body):
        return True
    return len(body) >= 400


def _safe_print(msg: str, *, file: Any = None) -> None:
    stream = file or sys.stdout
    try:
        print(msg, file=stream)
    except UnicodeEncodeError:
        enc = getattr(stream, "encoding", None) or "utf-8"
        text = msg.encode(enc, errors="replace").decode(enc, errors="replace")
        print(text, file=stream)


def process_law(
    session: PoliteSession,
    stub: LawStub,
    out_root: Path,
    log_entries: list[dict],
    iso_now,
    counters: dict[str, int],
) -> None:
    fname = law_filename(stub.slug)

    existing = find_existing_txt(out_root, fname, stub.url)
    if existing is not None:
        counters["skipped"] += 1
        log_entries.append(
            {
                "slug": stub.slug,
                "title": stub.title,
                "url": stub.url,
                "filename": existing.name,
                "status": "skipped",
                "downloaded_at": iso_now(),
            }
        )
        return

    dest = unique_target_path(out_root, fname, stub.url)
    _safe_print(f"Fetching: {stub.title[:70]}…")

    status = "failed"
    err: str | None = None
    try:
        html = fetch_text(session, stub.url)
        parsed = parse_law_page(html)
        if not _body_ok(parsed):
            err = (
                f"extracted text too short or missing articles ({len(parsed.body)} chars)"
            )
        else:
            save_act_text(dest, format_act_file(parsed, stub))
            status = "downloaded"
            _safe_print(f"  -> {dest.relative_to(out_root)}")
    except requests.HTTPError as e:
        err = str(e.response.status_code if e.response is not None else "HTTP error")
    except requests.Timeout:
        err = "timeout"
    except requests.RequestException as e:
        err = str(e)
    except Exception as e:
        err = str(e)

    entry: dict[str, Any] = {
        "slug": stub.slug,
        "title": stub.title,
        "url": stub.url,
        "filename": "",
        "status": status,
        "downloaded_at": iso_now(),
    }
    if status == "downloaded":
        entry["filename"] = dest.name
        counters["downloaded"] += 1
    else:
        counters["failed"] += 1
        entry["error"] = err
        _safe_print(f"  -> error: {err}", file=sys.stderr)

    log_entries.append(entry)


def run_jurisdiction(
    session: PoliteSession,
    jurisdiction: str,
    law_budget: int | None,
    iso_now,
) -> dict[str, int]:
    out_root = out_dir(jurisdiction)
    log_path = out_root / "download-log.json"
    log_entries = load_log(log_path)
    counters = {"downloaded": 0, "failed": 0, "skipped": 0}
    budget = law_budget

    _safe_print(f"\n=== {jurisdiction.upper()} ({out_root.relative_to(repo_root())}) ===")
    _safe_print(f"Listing laws from {JURISDICTIONS[jurisdiction]['index']}…")

    try:
        for stub in iter_law_stubs(session, jurisdiction):
            if budget is not None and budget <= 0:
                break
            try:
                process_law(
                    session,
                    stub,
                    out_root,
                    log_entries,
                    iso_now,
                    counters,
                )
            except Exception as e:
                counters["failed"] += 1
                log_entries.append(
                    {
                        "slug": stub.slug,
                        "title": stub.title,
                        "url": stub.url,
                        "filename": "",
                        "status": "failed",
                        "downloaded_at": iso_now(),
                        "error": str(e),
                    }
                )
                _safe_print(f"  -> error: {e}", file=sys.stderr)

            if budget is not None:
                budget -= 1
    finally:
        save_log(log_path, log_entries)

    _safe_print(
        f"{jurisdiction}: {counters['downloaded']} downloaded, "
        f"{counters['failed']} failed, {counters['skipped']} skipped"
    )
    return counters


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download BiH and Montenegro laws as .txt from paragraf.ba / paragraf.me."
    )
    parser.add_argument(
        "--jurisdiction",
        required=True,
        choices=[*JURISDICTION_ORDER, "all"],
        help="Which jurisdiction to download (or all five).",
    )
    parser.add_argument(
        "--max-laws",
        type=int,
        default=0,
        help="If >0, stop after this many laws per jurisdiction (for testing).",
    )
    args = parser.parse_args()

    keys = list(JURISDICTION_ORDER) if args.jurisdiction == "all" else [args.jurisdiction]
    law_budget = args.max_laws if args.max_laws and args.max_laws > 0 else None

    session = PoliteSession()
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    totals = {"downloaded": 0, "failed": 0, "skipped": 0}

    try:
        for key in keys:
            counts = run_jurisdiction(session, key, law_budget, iso_now)
            for k in totals:
                totals[k] += counts[k]
    except Exception as e:
        _safe_print(f"Fatal: {e}", file=sys.stderr)
        return 1

    _safe_print(
        f"\nSummary: {totals['downloaded']} downloaded, "
        f"{totals['failed']} failed, {totals['skipped']} skipped"
    )
    return 0 if totals["failed"] == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
