# pip install requests beautifulsoup4 pdfplumber
"""
Download BiH laws as .txt from legalist.ba (PDF download + pdfplumber extraction).

Run from repo root:
  python scripts/download-legalist-ba-laws.py --jurisdiction fbih
  python scripts/download-legalist-ba-laws.py --jurisdiction fbih --max-laws 3
  python scripts/download-legalist-ba-laws.py --jurisdiction all
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import re
import sys
import tempfile
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterator
from urllib.parse import parse_qs, urljoin, urlparse

import pdfplumber
import requests
from bs4 import BeautifulSoup, Tag
from requests.exceptions import ChunkedEncodingError
from urllib3.exceptions import ProtocolError

BASE_SITE = "https://legalist.ba"

USER_AGENT = "Mozilla/5.0 (compatible; LegantisBot/1.0)"
REQUEST_TIMEOUT = 30
SLEEP_SEC = 1.0
FETCH_RETRIES = 3
MIN_TEXT_LEN = 200

_WIN_INVALID = '<>:"/\\|?*'

CLAN_RE = re.compile(r"član|clan", re.IGNORECASE)
YEAR_RE = re.compile(r"(?:19|20)\d{2}")

JURISDICTIONS: dict[str, str] = {
    "bih": "baza-propisa/propisi-bih/",
    "fbih": "baza-propisa/propisi-fbih/",
    "rs": "baza-propisa/propisi-rs/",
}

JURISDICTION_ORDER = ("bih", "fbih", "rs")


@dataclass(frozen=True)
class LawStub:
    slug: str
    title: str
    url: str
    wpdmdl: str
    jurisdiction: str


@dataclass
class ParsedAct:
    title: str
    year: int
    body: str


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def index_url(jurisdiction: str) -> str:
    return urljoin(BASE_SITE + "/", JURISDICTIONS[jurisdiction])


def out_dir(jurisdiction: str) -> Path:
    return repo_root() / "downloads" / f"legalist-ba-{jurisdiction}"


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


def fetch_bytes(session: PoliteSession, url: str) -> bytes:
    last_err: Exception | None = None
    for attempt in range(FETCH_RETRIES):
        try:
            r = session.get(url)
            r.raise_for_status()
            return r.content
        except (requests.ConnectionError, ChunkedEncodingError, ProtocolError) as e:
            last_err = e
            if attempt + 1 < FETCH_RETRIES:
                time.sleep(2**attempt)
                continue
            raise
    if last_err:
        raise last_err
    raise RuntimeError("fetch_bytes failed without exception")


def fetch_text(session: PoliteSession, url: str) -> str:
    raw = fetch_bytes(session, url)
    for enc in ("utf-8-sig", "utf-8", "cp1250", "iso-8859-2"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


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


def _body_from_file(text: str) -> str:
    if "---" in text:
        return text.split("---", 1)[1].strip()
    return text.strip()


def _body_ok(body: str) -> bool:
    body = body.strip()
    if len(body) < MIN_TEXT_LEN:
        return False
    return CLAN_RE.search(body) is not None


def _is_valid_txt_file(path: Path) -> bool:
    if not path.exists() or path.stat().st_size == 0:
        return False
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return False
    return _body_ok(_body_from_file(text))


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


def _canonical_download_url(data_url: str) -> tuple[str, str, str]:
    parsed = urlparse(data_url)
    slug = parsed.path.rstrip("/").rsplit("/", 1)[-1]
    params = parse_qs(parsed.query)
    wpdmdl_vals = params.get("wpdmdl") or []
    if not slug or not wpdmdl_vals:
        raise ValueError(f"invalid download URL: {data_url}")
    wpdmdl = wpdmdl_vals[0]
    url = f"{BASE_SITE}/download/{slug}/?wpdmdl={wpdmdl}"
    return slug, wpdmdl, url


def _row_title(title_td: Tag) -> str:
    for mob in title_td.select(".td-mobile"):
        mob.decompose()
    return title_td.get_text(" ", strip=True)


def iter_law_stubs(session: PoliteSession, jurisdiction: str) -> Iterator[LawStub]:
    html = fetch_text(session, index_url(jurisdiction))
    soup = BeautifulSoup(html, "html.parser")
    seen: set[str] = set()

    for row in soup.select("tr.__dt_row"):
        title_td = row.select_one("td.__dt_col_post_content")
        link = row.select_one("a.wpdm-download-link[data-downloadurl]")
        if not title_td or not link:
            continue
        data_url = (link.get("data-downloadurl") or "").strip()
        if not data_url:
            continue
        try:
            slug, wpdmdl, url = _canonical_download_url(data_url)
        except ValueError:
            continue
        if url in seen:
            continue
        seen.add(url)
        title = _row_title(title_td)
        if not title:
            continue
        yield LawStub(
            slug=slug,
            title=title,
            url=url,
            wpdmdl=wpdmdl,
            jurisdiction=jurisdiction,
        )


def extract_pdf_text(session: PoliteSession, url: str) -> str:
    content = fetch_bytes(session, url)
    if not content.startswith(b"%PDF"):
        raise RuntimeError("response is not a PDF")

    tmp_path: str | None = None
    try:
        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(content)
            tmp_path = tmp.name

        parts: list[str] = []
        with pdfplumber.open(tmp_path) as pdf:
            for page in pdf.pages:
                parts.append(page.extract_text() or "")
        return "\n".join(parts).strip()
    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
            except OSError:
                pass


def parse_act(stub: LawStub, body: str) -> ParsedAct:
    years = _extract_years(stub.title, body)
    year = min(years) if years else 0
    return ParsedAct(title=stub.title, year=year, body=body)


def format_act_file(parsed: ParsedAct, stub: LawStub) -> str:
    header = [
        f"Naziv: {parsed.title}",
        f"URL: {stub.url}",
        f"Kategorija: {stub.jurisdiction}",
        f"Godina: {parsed.year}",
        "",
        "---",
        "",
        parsed.body,
    ]
    return "\n".join(header)


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
                "wpdmdl": stub.wpdmdl,
                "jurisdiction": stub.jurisdiction,
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
        body = extract_pdf_text(session, stub.url)
        parsed = parse_act(stub, body)
        if not _body_ok(parsed.body):
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
        "wpdmdl": stub.wpdmdl,
        "jurisdiction": stub.jurisdiction,
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
    _safe_print(f"Listing laws from {JURISDICTIONS[jurisdiction]}…")

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
                        "wpdmdl": stub.wpdmdl,
                        "jurisdiction": stub.jurisdiction,
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
        description="Download BiH laws as .txt from legalist.ba (PDF + pdfplumber)."
    )
    parser.add_argument(
        "--jurisdiction",
        required=True,
        choices=[*JURISDICTION_ORDER, "all"],
        help="Which jurisdiction to download (or all three).",
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
