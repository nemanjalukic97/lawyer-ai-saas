# pip install requests beautifulsoup4
"""
Download Slovenian laws as .txt from pisrs.si (filter API + rezultat API).

Run from repo root: python scripts/download-slovenia-laws.py
Smoke test: python scripts/download-slovenia-laws.py --max-laws 5
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
from urllib.parse import quote

import requests
from bs4 import BeautifulSoup
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

PISRS_SITE = "https://pisrs.si"
API_BASE = f"{PISRS_SITE}/api"
FILTER_URL = f"{API_BASE}/filter/filter"
REZULTAT_BASE = f"{API_BASE}/rezultat"
METADATA_URL = f"{API_BASE}/filter/metadata"

REGISTER_PREDPISOV = "Register predpisov"
KATEGORIZACIJA_ZAKON = "Zakon#66"
DATUM_TIP_SPREJETJA = "Datum sprejetja"

# pisrs.si caps filter pagination at 1000 hits per query.
RESULT_CAP = 999
RESULT_LIMIT_SNIPPET = "omejen na prvih 1000"
DEFAULT_YEAR_START = 1946

USER_AGENT = "Mozilla/5.0 (compatible; LegantisBot/1.0)"
REQUEST_TIMEOUT = 30
SLEEP_SEC = 1.0
FETCH_RETRIES = 3
MIN_TEXT_LEN = 200

_WIN_INVALID = '<>:"/\\|?*'

CLEN_RE = re.compile(r"\d+\.\s*člen", re.IGNORECASE)
HTML_TAG_RE = re.compile(r"<[^>]+>")


@dataclass(frozen=True)
class LawStub:
    law_id: str
    title: str
    url: str
    year: int
    category: str
    eva: str
    datum_objave: str
    organ: str


@dataclass
class ParsedAct:
    title: str
    category: str
    year: int
    body: str


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def law_url(law_id: str) -> str:
    return f"{PISRS_SITE}/pregledPredpisa?id={law_id}"


def law_filename(law_id: str) -> str:
    return sanitize_filename(f"{law_id}.txt")


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


def _request_json(
    session: PoliteSession,
    method: str,
    url: str,
    *,
    json_body: dict | None = None,
) -> Any:
    last_err: Exception | None = None
    headers = {"Accept": "application/json"}
    if json_body is not None:
        headers["Content-Type"] = "application/json"
    for attempt in range(FETCH_RETRIES):
        try:
            if method.upper() == "GET":
                r = session.get(url, headers=headers)
            else:
                r = session.post(url, json=json_body, headers=headers)
            r.raise_for_status()
            return r.json()
        except (requests.ConnectionError, ChunkedEncodingError, ProtocolError) as e:
            last_err = e
            if attempt + 1 < FETCH_RETRIES:
                time.sleep(2**attempt)
                continue
            raise
    if last_err:
        raise last_err
    raise RuntimeError("_request_json failed without exception")


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
            if url in text:
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


def _parse_year(datum: str | None) -> int:
    if not datum:
        return 0
    m = re.match(r"^(\d{4})", str(datum).strip())
    return int(m.group(1)) if m else 0


def filter_body_base() -> dict[str, Any]:
    return {
        "simpleSearch": False,
        "nazivZbirke": [REGISTER_PREDPISOV],
        "kategorizacijaAkta": [KATEGORIZACIJA_ZAKON],
    }


def filter_body_for_year(year: int) -> dict[str, Any]:
    body = filter_body_base()
    body["datumi"] = {
        "datumTip": DATUM_TIP_SPREJETJA,
        "letoObjave": year,
    }
    return body


def filter_body_for_date_range(start: str, end: str) -> dict[str, Any]:
    """Filter by adoption date range (API: datumi.datumValue.startDate/endDate)."""
    body = filter_body_base()
    body["datumi"] = {
        "datumTip": DATUM_TIP_SPREJETJA,
        "datumValue": {"startDate": start, "endDate": end},
    }
    return body


def _half_year_ranges(year: int) -> list[tuple[str, str]]:
    y = str(year)
    return [
        (f"{y}-01-01", f"{y}-06-30"),
        (f"{y}-07-01", f"{y}-12-31"),
    ]


def _filter_result_count(data: dict[str, Any]) -> int:
    raw = data.get("numOfAllResultsForIndex")
    try:
        return int(raw) if raw is not None else 0
    except (TypeError, ValueError):
        return 0


def _post_filter(
    session: PoliteSession,
    body: dict[str, Any],
    cursor: str | None = None,
) -> dict[str, Any]:
    url = FILTER_URL
    if cursor:
        url = f"{FILTER_URL}?cursorMark={quote(cursor, safe='')}"
    payload = _request_json(session, "POST", url, json_body=body)
    if not isinstance(payload, dict):
        raise RuntimeError("filter API returned non-object JSON")
    err = payload.get("error")
    if err and RESULT_LIMIT_SNIPPET in str(err):
        raise RuntimeError(f"filter API result cap: {err!r}")
    data = payload.get("data")
    if not isinstance(data, dict):
        raise RuntimeError(f"filter API error: {err!r}")
    return data


def _probe_filter_count(session: PoliteSession, body: dict[str, Any]) -> int:
    data = _post_filter(session, body)
    return _filter_result_count(data)


def _podrocje_split_bodies(
    session: PoliteSession, body: dict[str, Any]
) -> list[tuple[dict[str, Any], int]]:
    data = _post_filter(session, body)
    facets = data.get("podrocjeVsebinaFacet") or []
    if not isinstance(facets, list) or not facets:
        raise RuntimeError(
            "filter batch exceeds result cap and no podrocjeVsebinaFacet to split"
        )
    batches: list[tuple[dict[str, Any], int]] = []
    for facet in facets:
        if not isinstance(facet, dict):
            continue
        value = facet.get("value")
        if not value:
            continue
        split = dict(body)
        split["podrocje"] = {"vsebina": [value]}
        batches.extend(_plan_filter_batches(session, split))
    if not batches:
        raise RuntimeError("podrocje facet split produced no batches")
    return batches


def _plan_filter_batches(
    session: PoliteSession, body: dict[str, Any]
) -> list[tuple[dict[str, Any], int]]:
    count = _probe_filter_count(session, body)
    if count <= RESULT_CAP:
        return [(body, count)]

    datumi = body.get("datumi")
    if isinstance(datumi, dict):
        year = datumi.get("letoObjave")
        has_range = isinstance(datumi.get("datumValue"), dict) and (
            datumi["datumValue"].get("startDate")
            or datumi["datumValue"].get("endDate")
        )
        if year is not None and not has_range:
            batches: list[tuple[dict[str, Any], int]] = []
            for start, end in _half_year_ranges(int(year)):
                batches.extend(
                    _plan_filter_batches(
                        session, filter_body_for_date_range(start, end)
                    )
                )
            return batches

    return _podrocje_split_bodies(session, body)


def discover_adoption_years(session: PoliteSession) -> list[int]:
    data = _post_filter(session, filter_body_base())
    facets = data.get("letoObjaveFacet") or []
    years: list[int] = []
    if isinstance(facets, list):
        for facet in facets:
            if not isinstance(facet, dict):
                continue
            try:
                years.append(int(facet["value"]))
            except (KeyError, TypeError, ValueError):
                continue
    if years:
        return sorted(set(years), reverse=True)
    end = dt.datetime.now(dt.UTC).year
    return list(range(end, DEFAULT_YEAR_START - 1, -1))


def _batch_label(body: dict[str, Any]) -> str:
    datumi = body.get("datumi")
    if isinstance(datumi, dict):
        year = datumi.get("letoObjave")
        if year is not None:
            return f"year {year}"
        dv = datumi.get("datumValue")
        if isinstance(dv, dict):
            start = dv.get("startDate") or "?"
            end = dv.get("endDate") or "?"
            return f"dates {start}–{end}"
    pod = body.get("podrocje")
    if isinstance(pod, dict):
        v = pod.get("vsebina")
        if isinstance(v, list) and v:
            return f"podrocje {v[0]}"
    return "filter batch"


def _stub_from_item(item: dict[str, Any]) -> LawStub | None:
    law_id = (item.get("zunanjiId") or "").strip()
    if not law_id:
        return None
    title = (item.get("nazivAkta") or law_id).strip()
    datum = (item.get("datumObjave") or item.get("datumSprejetja") or "").strip()
    return LawStub(
        law_id=law_id,
        title=title,
        url=law_url(law_id),
        year=_parse_year(datum),
        category="Zakon",
        eva=(item.get("eva") or "").strip(),
        datum_objave=(item.get("datumObjave") or "").strip(),
        organ=(item.get("organPriprave") or "").strip(),
    )


def _iter_stubs_for_filter_body(
    session: PoliteSession,
    body: dict[str, Any],
    seen: set[str],
    *,
    expected_count: int,
) -> Iterator[LawStub]:
    if expected_count <= 0:
        return
    cursor: str | None = None
    while True:
        data = _post_filter(session, body, cursor)
        seznam = data.get("seznam") or []
        if not isinstance(seznam, list):
            raise RuntimeError("filter API seznam is not a list")

        for item in seznam:
            if not isinstance(item, dict):
                continue
            stub = _stub_from_item(item)
            if stub is None or stub.law_id in seen:
                continue
            seen.add(stub.law_id)
            yield stub

        cursor = data.get("nextCursorMark")
        if not seznam or not cursor or not str(cursor).strip():
            break


def iter_law_stubs(session: PoliteSession) -> Iterator[LawStub]:
    """List laws via year-batched filter queries (avoids 1000-result API cap)."""
    seen: set[str] = set()
    years = discover_adoption_years(session)
    _safe_print(
        f"Listing {len(years)} year batches ({years[-1]}–{years[0]}, newest first)…",
        flush=True,
    )

    for year in years:
        for body, count in _plan_filter_batches(session, filter_body_for_year(year)):
            if count <= 0:
                continue
            label = _batch_label(body)
            _safe_print(f"  Batch: {label} ({count})", flush=True)
            yield from _iter_stubs_for_filter_body(
                session, body, seen, expected_count=count
            )


def fetch_metadata(session: PoliteSession, law_id: str) -> dict[str, Any]:
    url = f"{REZULTAT_BASE}/zbirka/id/{quote(law_id, safe='')}"
    payload = _request_json(session, "GET", url)
    if not isinstance(payload, dict):
        raise RuntimeError("metadata API returned non-object JSON")
    data = payload.get("data")
    if not isinstance(data, dict):
        err = payload.get("error")
        raise RuntimeError(f"metadata API error for {law_id}: {err!r}")
    return data


def _pick_npb_id(metadata: dict[str, Any]) -> int | None:
    besedilo = metadata.get("besedilo")
    if not isinstance(besedilo, dict):
        return None
    versions = besedilo.get("npbVerzije")
    if not isinstance(versions, list) or not versions:
        return None
    first = versions[0]
    if not isinstance(first, dict):
        return None
    npb_id = first.get("id")
    if npb_id is None:
        return None
    try:
        return int(npb_id)
    except (TypeError, ValueError):
        return None


def fetch_besedilo_details(session: PoliteSession, npb_id: int) -> list[dict[str, Any]]:
    url = f"{REZULTAT_BASE}/neuradno-precisceno-besedilo/{npb_id}/details"
    payload = _request_json(session, "GET", url)
    if not isinstance(payload, dict):
        raise RuntimeError("details API returned non-object JSON")
    data = payload.get("data")
    if not isinstance(data, dict):
        err = payload.get("error")
        raise RuntimeError(f"details API error for npb {npb_id}: {err!r}")
    blocks = data.get("besedilo")
    if not isinstance(blocks, list):
        return []
    return [b for b in blocks if isinstance(b, dict)]


def _strip_html(text: str) -> str:
    if "<" not in text:
        return text
    return BeautifulSoup(text, "html.parser").get_text(" ", strip=True)


def _normalize_block_text(vsebina: str, struktura: str) -> str:
    text = _strip_html(vsebina).strip()
    if not text:
        return ""
    low = (struktura or "").lower()
    if low == "clen" or low.endswith(" clen"):
        if not CLEN_RE.search(text):
            return f"{text}"
    return text


def format_besedilo_body(blocks: list[dict[str, Any]]) -> str:
    parts: list[str] = []
    for block in blocks:
        vsebina = block.get("vsebina") or ""
        if not isinstance(vsebina, str):
            vsebina = str(vsebina)
        struktura = block.get("struktura") or ""
        if not isinstance(struktura, str):
            struktura = str(struktura)
        line = _normalize_block_text(vsebina, struktura)
        if line:
            parts.append(line)
    body = "\n\n".join(parts)
    return re.sub(r"\n{3,}", "\n\n", body).strip()


def parse_act(session: PoliteSession, stub: LawStub) -> ParsedAct:
    metadata = fetch_metadata(session, stub.law_id)
    ev = metadata.get("evidencniPodatki")
    if not isinstance(ev, dict):
        raise RuntimeError("missing evidencniPodatki")

    title = (ev.get("naslov") or stub.title).strip()
    category = (ev.get("vrstaAkta") or stub.category or "Zakon").strip()
    year = _parse_year(ev.get("datumObjave") or ev.get("datumSprejetja")) or stub.year

    npb_id = _pick_npb_id(metadata)
    if npb_id is None:
        raise RuntimeError("no npbVerzije id in metadata")

    blocks = fetch_besedilo_details(session, npb_id)
    body = format_besedilo_body(blocks)
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
    if CLEN_RE.search(body):
        return True
    return len(body) >= 400


def _safe_print(msg: str, *, file: Any = None, **kwargs: Any) -> None:
    stream = file or sys.stdout
    try:
        print(msg, file=stream, **kwargs)
    except UnicodeEncodeError:
        enc = getattr(stream, "encoding", None) or "utf-8"
        text = msg.encode(enc, errors="replace").decode(enc, errors="replace")
        print(text, file=stream, **kwargs)


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
    fname = law_filename(stub.law_id)

    existing = find_existing_txt(out_root, fname, stub.url)
    if not force_refresh and existing is not None:
        counters["skipped"] += 1
        log_entries.append(
            {
                "id": stub.law_id,
                "title": stub.title,
                "url": stub.url,
                "filename": existing.name,
                "status": "skipped",
                "downloaded_at": iso_now(),
            }
        )
        return

    dest = existing if existing is not None else unique_target_path(out_root, fname, stub.url)
    _safe_print(f"Fetching: {stub.title[:70]}…")

    status = "failed"
    err: str | None = None
    try:
        parsed = parse_act(session, stub)
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
        "id": stub.law_id,
        "title": stub.title,
        "url": stub.url,
        "eva": stub.eva,
        "datum_objave": stub.datum_objave,
        "organ": stub.organ,
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
        description="Download Slovenian laws as .txt from pisrs.si."
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

    out_root = repo_root() / "downloads" / "slovenia-laws"
    log_path = out_root / "download-log.json"

    session = PoliteSession()
    log_entries = load_log(log_path)
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    counters = init_counters(force_refresh=args.force_refresh)
    law_budget = args.max_laws if args.max_laws and args.max_laws > 0 else None

    try:
        _safe_print(
            "Listing laws (Register predpisov, Kategorizacija: Zakon)…", flush=True
        )
        for stub in iter_law_stubs(session):
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
                        "id": stub.law_id,
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
