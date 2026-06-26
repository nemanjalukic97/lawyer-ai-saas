# pip install requests beautifulsoup4
"""
Download Croatian laws as .txt from narodne-novine.nn.hr (yearly index CSV + ELI HTML).

Run from repo root: python scripts/download-croatia-laws.py
Smoke test: python scripts/download-croatia-laws.py --year 2026 --max-laws 3
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import io
import json
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, Tag
from requests.exceptions import ChunkedEncodingError
from urllib3.exceptions import ProtocolError

_SCRIPTS_DIR = Path(__file__).resolve().parent
if str(_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS_DIR))
from _download_refresh import (
    apply_refresh_write,
    emit_sync_stats,
    init_counters,
    print_sync_summary,
    record_refresh_status,
)

NN_SITE = "https://narodne-novine.nn.hr"
KAZALO_URL = f"{NN_SITE}/kazalo-pretrazivanje.aspx"
INDEX_FILE_URL = f"{NN_SITE}/get_index_file.aspx"

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = (15, 90)
SLEEP_SEC = 1.0
FETCH_RETRIES = 3
MIN_TEXT_LEN = 200
DEFAULT_YEAR_START = 2000
DEFAULT_YEAR_END = 2026

_WIN_INVALID = '<>:"/\\|?*'

_TRANSLIT_MAP = str.maketrans(
    {
        "č": "c",
        "ć": "c",
        "đ": "dj",
        "š": "s",
        "ž": "z",
        "Č": "c",
        "Ć": "c",
        "Đ": "dj",
        "Š": "s",
        "Ž": "z",
    }
)

INDEX_HEADER_MARKERS = ("izdanje", "poveznica")
VRSTA_ZAKON = "zakon"
CJELOVITI_AKT = "cjeloviti akt"

CLANAK_RE = re.compile(r"lanak\s+\d+", re.IGNORECASE)
FOOTER_MARKERS = (
    "opći uvjeti korištenja",
    "opci uvjeti koristenja",
    "zaštita privatnosti",
    "zastita privatnosti",
    "dio nn:",
    "©",
)


@dataclass(frozen=True)
class LawStub:
    year: int
    izdanje: str
    doc_num: str
    title: str
    donositelj: str
    url: str


@dataclass
class ParsedAct:
    title: str
    body: str


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def slugify(text: str, fallback: str) -> str:
    t = text.strip().translate(_TRANSLIT_MAP).lower()
    t = re.sub(r"\s+", "-", t)
    t = re.sub(r"[^a-z0-9\-]+", "-", t)
    t = re.sub(r"-{2,}", "-", t).strip("-")
    return t or fallback


def sanitize_filename(raw: str) -> str:
    s = raw.replace(" ", "_")
    for ch in _WIN_INVALID:
        s = s.replace(ch, "_")
    s = "".join("_" if ord(c) < 32 else c for c in s)
    s = s.strip("._ ") or "document.txt"
    if not s.lower().endswith(".txt"):
        s += ".txt"
    return s


def law_filename(title: str, url: str) -> str:
    short = hashlib.sha256(url.encode("utf-8")).hexdigest()[:8]
    stem = slugify(title, short)
    return sanitize_filename(f"{stem}.txt")


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


def _index_header_ok(text: str) -> bool:
    first = (text.splitlines() or [""])[0].lower()
    return all(m in first for m in INDEX_HEADER_MARKERS)


def _save_index_cache(path: Path, content: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".partial")
    try:
        tmp.write_bytes(content)
        tmp.replace(path)
    finally:
        if tmp.exists() and not path.exists():
            try:
                tmp.unlink()
            except OSError:
                pass


def fetch_year_csv(session: PoliteSession, year: int, cache_dir: Path) -> Path:
    """Download yearly propis index (tab-separated CSV) and cache locally."""
    cache_path = cache_dir / f"{year}.csv"
    if cache_path.exists():
        try:
            cached = cache_path.read_text(encoding="utf-8-sig")
        except OSError:
            cached = ""
        if _index_header_ok(cached):
            return cache_path

    # Primary: same endpoint as search.aspx "Preuzmi CSV" (drop-down-controller.js).
    index_url = f"{INDEX_FILE_URL}?year={year}&type=csv"
    content = fetch_bytes(session, index_url)
    text = content.decode("utf-8-sig", errors="replace")
    if _index_header_ok(text):
        _save_index_cache(cache_path, content)
        return cache_path

    # Fallback: legacy kazalo-pretrazivanje.aspx WebForms (if restored on site).
    try:
        content = _fetch_year_csv_webforms(session, year)
        text = content.decode("utf-8-sig", errors="replace")
        if _index_header_ok(text):
            _save_index_cache(cache_path, content)
            return cache_path
    except requests.RequestException:
        pass

    raise RuntimeError(
        f"Could not download index for {year} (expected tab-separated CSV with Izdanje/Poveznica columns)"
    )


def _collect_form_fields(form: Tag) -> dict[str, str]:
    data: dict[str, str] = {}
    for inp in form.find_all("input"):
        name = inp.get("name")
        if not name:
            continue
        itype = (inp.get("type") or "text").lower()
        if itype in ("submit", "button", "image", "file"):
            continue
        data[name] = inp.get("value") or ""
    for sel in form.find_all("select"):
        name = sel.get("name")
        if not name:
            continue
        opt = sel.find("option", selected=True) or sel.find("option")
        data[name] = (opt.get("value") if opt else "") or ""
    return data


def _fetch_year_csv_webforms(session: PoliteSession, year: int) -> bytes:
    r = session.get(KAZALO_URL)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    form = soup.find("form")
    if not form:
        raise RuntimeError("kazalo-pretrazivanje.aspx: no form")
    data = _collect_form_fields(form)
    for key in list(data):
        if "godin" in key.lower():
            data[key] = str(year)
    data["__EVENTTARGET"] = ""
    data["__EVENTARGUMENT"] = ""
    for btn_name in ("btnExportCsv", "btnPopisSvihPropisa", "btnCSV"):
        if soup.find("input", {"name": btn_name}):
            data["__EVENTTARGET"] = btn_name
            break
    resp = session.post(
        KAZALO_URL,
        data=data,
        headers={"Referer": KAZALO_URL},
    )
    resp.raise_for_status()
    return resp.content


def _normalize_column(name: str) -> str:
    return re.sub(r"\s+", " ", name.strip().lower())


def _column_map(header: list[str]) -> dict[str, int]:
    mapping: dict[str, int] = {}
    for i, col in enumerate(header):
        key = _normalize_column(col)
        mapping[key] = i
    return mapping


def _pick_col(cols: dict[str, int], *candidates: str) -> int | None:
    for cand in candidates:
        norm = _normalize_column(cand)
        if norm in cols:
            return cols[norm]
        for key, idx in cols.items():
            if norm in key or key.startswith(norm.split()[0]):
                return idx
    return None


def _cell(row: list[str], idx: int | None) -> str:
    if idx is None or idx >= len(row):
        return ""
    return row[idx].strip()


def _canonical_eli_url(link: str) -> str:
    link = link.strip()
    if not link:
        return ""
    url = urljoin(NN_SITE, link)
    parsed = urlparse(url)
    path = parsed.path.rstrip("/")
    if path.endswith("/hrv/html") or path.endswith("/hrv/printhtml"):
        path = path.rsplit("/", 2)[0]
    return f"{parsed.scheme}://{parsed.netloc}{path}"


def parse_index_tsv(path: Path, year: int) -> list[LawStub]:
    text = path.read_text(encoding="utf-8-sig")
    reader = csv.reader(io.StringIO(text), delimiter="\t")
    try:
        header = next(reader)
    except StopIteration:
        return []

    if not _index_header_ok("\t".join(header)):
        raise RuntimeError(f"Unexpected index header in {path.name}")

    col = _column_map(header)
    i_izdanje = _pick_col(col, "Izdanje")
    i_doc = _pick_col(col, "Broj dokumenta")
    i_title = _pick_col(col, "Naziv dokumenta")
    i_vrsta = _pick_col(col, "Vrsta dokumenta")
    i_cjeloviti = _pick_col(
        col,
        "Cjeloviti/izmjene",
        "Cjeloviti dokument/izmjene/dopune/ukinut",
    )
    i_donositelj = _pick_col(col, "Donositelj", "Donositelj dokumenta")
    i_link = _pick_col(col, "Poveznica")

    stubs: list[LawStub] = []
    seen_urls: set[str] = set()

    for row in reader:
        if not row or not any(cell.strip() for cell in row):
            continue
        vrsta = _cell(row, i_vrsta).casefold()
        cjeloviti = _cell(row, i_cjeloviti).casefold()
        if vrsta != VRSTA_ZAKON:
            continue
        if cjeloviti != CJELOVITI_AKT:
            continue

        url = _canonical_eli_url(_cell(row, i_link))
        if not url or url in seen_urls:
            continue
        seen_urls.add(url)

        stubs.append(
            LawStub(
                year=year,
                izdanje=_cell(row, i_izdanje),
                doc_num=_cell(row, i_doc),
                title=_cell(row, i_title) or url,
                donositelj=_cell(row, i_donositelj),
                url=url,
            )
        )

    return stubs


def _text_of(el: Tag | None) -> str:
    if el is None:
        return ""
    return " ".join(el.get_text("\n", strip=True).split())


def _is_footer_text(text: str) -> bool:
    low = text.casefold()
    return any(m in low for m in FOOTER_MARKERS)


def parse_act_html(html: str, stub: LawStub) -> ParsedAct:
    if html.startswith("\ufeff"):
        html = html[1:]
    soup = BeautifulSoup(html, "html.parser")

    title = ""
    h2 = soup.find("h2")
    if h2:
        title = _text_of(h2)
    if not title:
        h1 = soup.find("h1")
        if h1:
            title = _text_of(h1)
    if not title:
        title = stub.title

    root = (
        soup.select_one(".doc")
        or soup.select_one(".sl-content")
        or soup.select_one(".articleContent")
        or soup.find("article")
    )
    if root is None:
        root = soup.find("body") or soup

    body_parts: list[str] = []
    for el in root.find_all(["p", "h3", "h4", "h5", "h6", "li"]):
        if not isinstance(el, Tag):
            continue
        if el.find_parent("table"):
            continue
        text = _text_of(el)
        if not text or _is_footer_text(text):
            continue
        body_parts.append(text)

    body = "\n\n".join(body_parts)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()

    return ParsedAct(title=title, body=body)


def format_act_file(parsed: ParsedAct, stub: LawStub) -> str:
    header = [
        f"Naziv: {parsed.title}",
        f"URL: {stub.url}",
        f"Godina: {stub.year}",
        f"Izdanje: {stub.izdanje}",
        f"Donositelj: {stub.donositelj}",
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
    if CLANAK_RE.search(body):
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


def parse_year_range(args: argparse.Namespace) -> list[int]:
    if args.year is not None:
        return [int(args.year)]
    if args.years:
        m = re.match(r"^(\d{4})\s*-\s*(\d{4})$", args.years.strip())
        if not m:
            raise SystemExit(f'Invalid --years range "{args.years}" (use e.g. 2020-2026)')
        start, end = int(m.group(1)), int(m.group(2))
        if start > end:
            start, end = end, start
        return list(range(start, end + 1))
    return list(range(DEFAULT_YEAR_START, DEFAULT_YEAR_END + 1))


def process_law(
    session: PoliteSession,
    stub: LawStub,
    out_root: Path,
    log_entries: list[dict],
    iso_now,
    counters: dict[str, int],
    *,
    force_refresh: bool = False,
) -> None:
    year_dir = out_root / str(stub.year)
    fname = law_filename(stub.title, stub.url)

    existing = find_existing_txt(year_dir, fname, stub.url)
    if existing is None:
        for path in year_dir.glob("*.txt") if year_dir.exists() else []:
            if not _is_valid_txt_file(path):
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except (OSError, UnicodeDecodeError):
                continue
            if stub.url in text:
                existing = path
                break

    if not force_refresh and existing is not None:
        counters["skipped"] += 1
        log_entries.append(
            {
                "year": stub.year,
                "izdanje": stub.izdanje,
                "doc_num": stub.doc_num,
                "title": stub.title,
                "url": stub.url,
                "filename": existing.name,
                "status": "skipped",
                "downloaded_at": iso_now(),
            }
        )
        return

    dest = existing if existing is not None else unique_target_path(year_dir, fname, stub.url)
    _safe_print(f"Fetching: {stub.title[:70]}…")

    status = "failed"
    err: str | None = None
    try:
        html = fetch_text(session, stub.url)
        parsed = parse_act_html(html, stub)
        if not _body_ok(parsed):
            err = (
                f"extracted text too short or missing articles ({len(parsed.body)} chars)"
            )
        else:
            content = format_act_file(parsed, stub)
            write_status = apply_refresh_write(
                dest,
                content,
                force_refresh=force_refresh,
                existing=existing,
                save_fn=save_act_text,
            )
            if force_refresh:
                status = write_status
                _safe_print(f"  -> {write_status}: {(existing or dest).name}")
            else:
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
        "year": stub.year,
        "izdanje": stub.izdanje,
        "doc_num": stub.doc_num,
        "title": stub.title,
        "url": stub.url,
        "filename": "",
        "status": status,
        "downloaded_at": iso_now(),
    }
    if status in ("downloaded", "new", "updated", "unchanged"):
        entry["filename"] = (existing or dest).name
        record_refresh_status(
            counters,
            status if force_refresh else "downloaded",
        )
    else:
        counters["failed"] += 1
        entry["error"] = err
        _safe_print(f"  -> error: {err}", file=sys.stderr)

    log_entries.append(entry)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download Croatian laws as .txt from narodne-novine.nn.hr."
    )
    year_group = parser.add_mutually_exclusive_group()
    year_group.add_argument("--year", type=int, metavar="YYYY", help="Process a single year.")
    year_group.add_argument(
        "--years",
        metavar="START-END",
        help='Year range, e.g. "2020-2026".',
    )
    parser.add_argument(
        "--max-laws",
        type=int,
        default=0,
        help="If >0, stop after this many laws (downloaded/failed/skipped; for testing).",
    )
    parser.add_argument(
        "--force-refresh",
        action="store_true",
        help="Re-fetch laws and overwrite only when file content changed (SHA-256).",
    )
    args = parser.parse_args()

    try:
        years = parse_year_range(args)
    except SystemExit:
        raise
    except ValueError as e:
        _safe_print(f"Invalid year argument: {e}", file=sys.stderr)
        return 1

    out_root = repo_root() / "downloads" / "croatia-laws"
    log_path = out_root / "download-log.json"
    index_cache = out_root / "indexes"

    session = PoliteSession()
    log_entries = load_log(log_path)
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    counters = init_counters(force_refresh=args.force_refresh)
    law_budget = args.max_laws if args.max_laws and args.max_laws > 0 else None

    try:
        for year in years:
            if law_budget is not None and law_budget <= 0:
                break

            _safe_print(f"\n=== Year {year} ===")
            try:
                csv_path = fetch_year_csv(session, year, index_cache)
            except Exception as e:
                counters["failed"] += 1
                log_entries.append(
                    {
                        "year": year,
                        "izdanje": "",
                        "doc_num": "",
                        "title": "",
                        "url": f"{INDEX_FILE_URL}?year={year}&type=csv",
                        "filename": "",
                        "status": "failed",
                        "downloaded_at": iso_now(),
                        "error": f"index fetch: {e}",
                    }
                )
                _safe_print(f"  [index failed] {e}", file=sys.stderr)
                continue

            try:
                stubs = parse_index_tsv(csv_path, year)
            except Exception as e:
                counters["failed"] += 1
                log_entries.append(
                    {
                        "year": year,
                        "izdanje": "",
                        "doc_num": "",
                        "title": "",
                        "url": "",
                        "filename": "",
                        "status": "failed",
                        "downloaded_at": iso_now(),
                        "error": f"index parse: {e}",
                    }
                )
                _safe_print(f"  [index parse failed] {e}", file=sys.stderr)
                continue

            _safe_print(f"  {len(stubs)} zakon(i) (cjeloviti akt) in index")
            for stub in stubs:
                if law_budget is not None and law_budget <= 0:
                    break
                try:
                    process_law(
                        session,
                        stub,
                        out_root,
                        log_entries,
                        iso_now,
                        counters,
                        force_refresh=args.force_refresh,
                    )
                except Exception as e:
                    counters["failed"] += 1
                    log_entries.append(
                        {
                            "year": stub.year,
                            "izdanje": stub.izdanje,
                            "doc_num": stub.doc_num,
                            "title": stub.title,
                            "url": stub.url,
                            "filename": "",
                            "status": "failed",
                            "downloaded_at": iso_now(),
                            "error": str(e),
                        }
                    )
                    _safe_print(f"  -> error: {e}", file=sys.stderr)

                if law_budget is not None:
                    law_budget -= 1

    except Exception as e:
        _safe_print(f"Fatal: {e}", file=sys.stderr)
        return 1
    finally:
        save_log(log_path, log_entries)

    _safe_print("\nSummary: ", end="")
    print_sync_summary(counters)
    emit_sync_stats(counters)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
