# pip install requests beautifulsoup4
"""
Download Serbian laws as .txt from pravno-informacioni-sistem.rs (register APIs).

Run from repo root: python scripts/download-serbia-laws.py
Smoke test: python scripts/download-serbia-laws.py --category "VII" --max-laws 3
"""

from __future__ import annotations

import argparse
import base64
import datetime as dt
import hashlib
import json
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterator
from urllib.parse import urljoin

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

PIS_SITE = "https://pravno-informacioni-sistem.rs"
CONFIG_URL = f"{PIS_SITE}/bandleportalconf.txt"
REPUBLIC_ROOT_NAME = "РЕПУБЛИЧКИ ПРОПИСИ"

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = (15, 90)
SLEEP_SEC = 1.0
FETCH_RETRIES = 3
MIN_TEXT_LEN = 200

_WIN_INVALID = '<>:"/\\|?*'

UUID_RE = re.compile(
    r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
    re.IGNORECASE,
)
ELI_PATH_RE = re.compile(r"/eli/rep/[^\s\"'<>]+", re.IGNORECASE)
ROMAN_CATEGORY_RE = re.compile(r"^([IVXLC]+)\b")

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
        "а": "a",
        "б": "b",
        "в": "v",
        "г": "g",
        "д": "d",
        "е": "e",
        "ж": "z",
        "з": "z",
        "и": "i",
        "ј": "j",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "h",
        "ц": "c",
        "ч": "c",
        "ђ": "dj",
        "ш": "s",
        "ћ": "c",
        "џ": "dz",
        "А": "a",
        "Б": "b",
        "В": "v",
        "Г": "g",
        "Д": "d",
        "Е": "e",
        "Ж": "z",
        "З": "z",
        "И": "i",
        "Ј": "j",
        "К": "k",
        "Л": "l",
        "М": "m",
        "Н": "n",
        "О": "o",
        "П": "p",
        "Р": "r",
        "С": "s",
        "Т": "t",
        "У": "u",
        "Ф": "f",
        "Х": "h",
        "Ц": "c",
        "Ч": "c",
        "Ђ": "dj",
        "Ш": "s",
        "Ћ": "c",
        "Џ": "dz",
    }
)


@dataclass(frozen=True)
class AreaTarget:
    area_id: int
    category_name: str
    category_folder: str
    subcategory_name: str


@dataclass(frozen=True)
class ActStub:
    uuid: str
    title: str
    act_type: str
    sg_ref: str
    viewact_url: str
    area_id: int
    category_name: str
    category_folder: str
    subcategory_name: str


@dataclass
class ParsedAct:
    title: str
    publication: str
    body: str
    public_url: str


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


def act_filename(title: str, uuid: str) -> str:
    stem = slugify(title, uuid[:8])
    return sanitize_filename(f"{stem}.txt")


def category_folder_name(category_label: str) -> str:
    m = ROMAN_CATEGORY_RE.match(category_label.strip())
    roman = m.group(1) if m else "cat"
    rest = category_label[m.end() :].strip() if m else category_label
    return f"{roman}-{slugify(rest, roman)}"


def viewact_url(uuid: str) -> str:
    return f"{PIS_SITE}/viewAct/{uuid}"


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


def load_env(session: PoliteSession) -> dict[str, Any]:
    raw = fetch_text(session, CONFIG_URL).strip()
    decoded = base64.b64decode(raw).decode("utf-8")
    decoded = decoded.replace("\r\n", "").replace("\n", "")
    env = json.loads(decoded)
    if not isinstance(env, dict):
        raise RuntimeError("Invalid bandleportalconf.txt payload")
    return env


def _api_base(env: dict[str, Any], key: str) -> str:
    base = str(env.get(key) or "").strip()
    if not base:
        raise RuntimeError(f"Missing {key} in portal config")
    return base if base.endswith("/") else base + "/"


def find_republic_root(menu: list[dict]) -> dict | None:
    for node in menu:
        name = str(node.get("name") or "").strip()
        if name == REPUBLIC_ROOT_NAME:
            return node
    return None


def iter_area_targets(
    menu: list[dict],
    category_filter: str | None,
    max_categories: int | None,
) -> Iterator[AreaTarget]:
    root = find_republic_root(menu)
    if root is None:
        return

    categories = root.get("children") or []
    if category_filter:
        categories = [
            c
            for c in categories
            if ROMAN_CATEGORY_RE.match(str(c.get("name") or "").strip())
            and ROMAN_CATEGORY_RE.match(str(c.get("name") or "").strip()).group(1)
            == category_filter
        ]

    if max_categories is not None and max_categories > 0:
        categories = categories[:max_categories]

    for cat in categories:
        cat_name = str(cat.get("name") or "").strip()
        folder = category_folder_name(cat_name)

        def walk(node: dict, subcategory: str) -> Iterator[AreaTarget]:
            children = node.get("children") or []
            name = str(node.get("name") or "").strip()
            area_id = node.get("id")
            if not children:
                if area_id is not None:
                    yield AreaTarget(
                        area_id=int(area_id),
                        category_name=cat_name,
                        category_folder=folder,
                        subcategory_name=subcategory or name,
                    )
                return
            for child in children:
                child_name = str(child.get("name") or "").strip()
                next_sub = child_name if not subcategory else subcategory
                yield from walk(child, next_sub)

        for child in cat.get("children") or []:
            yield from walk(child, str(child.get("name") or "").strip())


def parse_listing_html(
    html: str,
    area: AreaTarget,
) -> list[ActStub]:
    soup = BeautifulSoup(html, "html.parser")
    stubs: list[ActStub] = []
    seen: set[str] = set()

    for anchor in soup.select("a.sadrzajLink[href]"):
        href = (anchor.get("href") or "").strip()
        m = UUID_RE.search(href)
        if not m:
            continue
        uuid = m.group(0).lower()
        if uuid in seen:
            continue
        seen.add(uuid)

        act_type = " ".join(anchor.get_text().split()).strip()
        row = anchor.find_parent("td")
        middle = ""
        sg_ref = ""
        if row:
            mid_el = row.select_one("label.sadrzajMiddle")
            if mid_el:
                middle = " ".join(mid_el.get_text().split()).strip()
            right_el = row.select_one("label.sadrzajRight")
            if right_el:
                sg_ref = " ".join(right_el.get_text().split()).strip().lstrip(":").strip()

        title_parts = [p for p in (act_type, middle) if p]
        title = " ".join(title_parts) if title_parts else act_type or uuid

        stubs.append(
            ActStub(
                uuid=uuid,
                title=title,
                act_type=act_type,
                sg_ref=sg_ref,
                viewact_url=viewact_url(uuid),
                area_id=area.area_id,
                category_name=area.category_name,
                category_folder=area.category_folder,
                subcategory_name=area.subcategory_name,
            )
        )

    return stubs


def extract_eli_path(html: str) -> str | None:
    for m in ELI_PATH_RE.finditer(html):
        path = m.group(0).split('"')[0].split("'")[0].rstrip("/")
        if path.endswith("/reg"):
            return path
        if "/eli/rep/" in path.lower():
            return path if path.endswith("/reg") else path + "/reg"
    return None


def resolve_public_url(
    session: PoliteSession,
    uuid: str,
    viewact_html: str | None,
    regulations_api: str | None,
) -> str:
    if viewact_html:
        eli = extract_eli_path(viewact_html)
        if eli:
            return urljoin(PIS_SITE, eli)

    if regulations_api:
        base = regulations_api if regulations_api.endswith("/") else regulations_api + "/"
        for suffix in (f"viewAct/{uuid}", f"act/{uuid}"):
            try:
                r = session.get(base + suffix, timeout=REQUEST_TIMEOUT)
                if r.status_code != 200:
                    continue
                ctype = (r.headers.get("Content-Type") or "").lower()
                if "json" in ctype:
                    data = r.json()
                    for key in ("url", "eliUrl", "eli", "canonicalUrl", "path"):
                        val = data.get(key) if isinstance(data, dict) else None
                        if isinstance(val, str) and "/eli/rep/" in val:
                            return urljoin(PIS_SITE, val)
                else:
                    eli = extract_eli_path(r.text)
                    if eli:
                        return urljoin(PIS_SITE, eli)
            except (requests.RequestException, json.JSONDecodeError, ValueError):
                continue

    return viewact_url(uuid)


def _text_of(el: Tag | None) -> str:
    if el is None:
        return ""
    return " ".join(el.get_text("\n", strip=True).split())


def parse_act_html(html: str, stub: ActStub, public_url: str) -> ParsedAct:
    if html.startswith("\ufeff"):
        html = html[1:]
    soup = BeautifulSoup(html, "html.parser")

    title = ""
    if soup.title and soup.title.string:
        title = " ".join(soup.title.string.split()).strip()
    if not title:
        parts = [_text_of(p) for p in soup.select("p.odluka-zakon")]
        title = " ".join(p for p in parts if p).strip()
    if not title:
        title = stub.title

    publication = _text_of(soup.select_one("p.centar"))

    body_parts: list[str] = []
    for el in soup.find_all(["p", "li"]):
        if not isinstance(el, Tag):
            continue
        classes = el.get("class") or []
        if "redakcijskipreciscentekst" in classes:
            continue
        text = _text_of(el)
        if not text:
            continue
        if "hide-change" in classes:
            body_parts.append(text)
            continue
        if "clan" in classes or "bold" in classes:
            body_parts.append("")
            body_parts.append(text)
        else:
            body_parts.append(text)

    body = "\n\n".join(body_parts)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()

    return ParsedAct(
        title=title,
        publication=publication,
        body=body,
        public_url=public_url,
    )


def format_act_file(parsed: ParsedAct, stub: ActStub) -> str:
    header = [
        f"Naziv: {parsed.title}",
        f"URL: {parsed.public_url}",
        f"Kategorija: {stub.category_name}",
        f"Potkategorija: {stub.subcategory_name}",
    ]
    if stub.sg_ref:
        header.append(f"Službeni glasnik: {stub.sg_ref}")
    if parsed.publication and parsed.publication not in header[-1]:
        header.append(f"Objava: {parsed.publication}")
    header.extend(["", "---", "", parsed.body])
    return "\n".join(header)


def _body_ok(parsed: ParsedAct) -> bool:
    body = parsed.body.strip()
    if len(body) < MIN_TEXT_LEN:
        return False
    if "Члан" in body or bool(re.search(r"\b[cč]lan\b", body, re.I)):
        return True
    # Odluke and similar acts often lack numbered članovi but still have substance
    return len(body) >= 400


def _safe_print(msg: str, *, file: Any = None) -> None:
    stream = file or sys.stdout
    try:
        print(msg, file=stream)
    except UnicodeEncodeError:
        enc = getattr(stream, "encoding", None) or "utf-8"
        text = msg.encode(enc, errors="replace").decode(enc, errors="replace")
        print(text, file=stream)


def process_act(
    session: PoliteSession,
    stub: ActStub,
    reg_api: str,
    regulations_api: str | None,
    out_root: Path,
    log_entries: list[dict],
    iso_now,
    counters: dict[str, int],
    *,
    force_refresh: bool = False,
) -> None:
    txt_dir = out_root / stub.category_folder
    fname = act_filename(stub.title, stub.uuid)
    public_url = stub.viewact_url

    existing = find_existing_txt(txt_dir, fname, public_url)
    if existing is None:
        for path in txt_dir.glob("*.txt") if txt_dir.exists() else []:
            if not _is_valid_txt_file(path):
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except (OSError, UnicodeDecodeError):
                continue
            if stub.uuid in text or stub.viewact_url in text:
                existing = path
                break

    if not force_refresh and existing is not None:
        counters["skipped"] += 1
        log_entries.append(
            {
                "category": stub.category_name,
                "subcategory": stub.subcategory_name,
                "folder": stub.category_folder,
                "filename": existing.name,
                "uuid": stub.uuid,
                "area_id": stub.area_id,
                "url": public_url,
                "status": "skipped",
                "downloaded_at": iso_now(),
            }
        )
        return

    dest = existing if existing is not None else unique_target_path(txt_dir, fname, public_url)
    _safe_print(f"Fetching: {stub.title[:70]}…")

    status = "failed"
    err: str | None = None
    try:
        html = fetch_text(session, reg_api + f"viewAct/{stub.uuid}")
        public_url = resolve_public_url(session, stub.uuid, html, regulations_api)
        parsed = parse_act_html(html, stub, public_url)
        if not _body_ok(parsed):
            err = f"extracted text too short or missing articles ({len(parsed.body)} chars)"
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
                _safe_print(f"  -> {dest.name}")
    except requests.HTTPError as e:
        err = str(e.response.status_code if e.response is not None else "HTTP error")
    except requests.Timeout:
        err = "timeout"
    except requests.RequestException as e:
        err = str(e)
    except Exception as e:
        err = str(e)

    entry: dict[str, Any] = {
        "category": stub.category_name,
        "subcategory": stub.subcategory_name,
        "folder": stub.category_folder,
        "filename": "",
        "uuid": stub.uuid,
        "area_id": stub.area_id,
        "url": public_url,
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
        description="Download Serbian laws as .txt from pravno-informacioni-sistem.rs."
    )
    parser.add_argument(
        "--category",
        metavar="ROMAN",
        help='Filter by level-2 category Roman numeral (e.g. "VII").',
    )
    parser.add_argument(
        "--max-laws",
        type=int,
        default=0,
        help="If >0, stop after this many acts (download/skip/fail; for testing).",
    )
    parser.add_argument(
        "--max-categories",
        type=int,
        default=0,
        help="If >0, cap level-2 categories after filter (for testing).",
    )
    parser.add_argument(
        "--force-refresh",
        action="store_true",
        help="Re-fetch laws and overwrite only when file content changed (SHA-256).",
    )
    args = parser.parse_args()

    out_root = repo_root() / "downloads" / "serbia-laws"
    log_path = out_root / "download-log.json"

    session = PoliteSession()
    log_entries = load_log(log_path)
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    counters = init_counters(force_refresh=args.force_refresh)

    law_budget = args.max_laws if args.max_laws and args.max_laws > 0 else None
    max_categories = (
        args.max_categories if args.max_categories and args.max_categories > 0 else None
    )

    try:
        env = load_env(session)
        reg_api = _api_base(env, "VUE_APP_API_REG_DEV")
        di_api = _api_base(env, "VUE_APP_API_DI_DEV")
        regulations_api = env.get("VUE_APP_API_REGULATIONS_DEV")
        if regulations_api:
            regulations_api = str(regulations_api).strip()
            if regulations_api and not regulations_api.endswith("/"):
                regulations_api += "/"

        menu_raw = fetch_text(session, reg_api + "menu")
        menu = json.loads(menu_raw)
        if not isinstance(menu, list):
            raise RuntimeError("Unexpected menu response")

        seen_uuids: set[str] = set()
        areas = list(
            iter_area_targets(menu, args.category, max_categories)
        )
        _safe_print(f"Categories/areas to scan: {len(areas)}")

        for area in areas:
            if law_budget is not None and law_budget <= 0:
                break

            list_url = f"{di_api}REG/GetRegActs?areaId={area.area_id}"
            _safe_print(
                f"\n=== {area.category_folder} / {area.subcategory_name[:50]} "
                f"(area {area.area_id}) ==="
            )
            try:
                listing_html = fetch_text(session, list_url)
            except requests.RequestException as e:
                counters["failed"] += 1
                log_entries.append(
                    {
                        "category": area.category_name,
                        "subcategory": area.subcategory_name,
                        "folder": area.category_folder,
                        "filename": "",
                        "uuid": "",
                        "area_id": area.area_id,
                        "url": list_url,
                        "status": "failed",
                        "downloaded_at": iso_now(),
                        "error": f"listing fetch: {e}",
                    }
                )
                _safe_print(f"  [list failed] {e}", file=sys.stderr)
                continue

            stubs = parse_listing_html(listing_html, area)
            _safe_print(f"  found {len(stubs)} act(s) in listing")
            for stub in stubs:
                if law_budget is not None and law_budget <= 0:
                    break
                if stub.uuid in seen_uuids:
                    if law_budget is not None:
                        law_budget -= 1
                    continue
                seen_uuids.add(stub.uuid)

                try:
                    process_act(
                        session,
                        stub,
                        reg_api,
                        regulations_api,
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
                            "category": stub.category_name,
                            "subcategory": stub.subcategory_name,
                            "folder": stub.category_folder,
                            "filename": "",
                            "uuid": stub.uuid,
                            "area_id": stub.area_id,
                            "url": stub.viewact_url,
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
