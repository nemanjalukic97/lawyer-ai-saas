# pip install requests beautifulsoup4
"""
Download VS RS „Sudska praksa“ PDFs from vsud-rs.pravosudje.ba.

Run from repo root: python scripts/download-bih-rs-pdfs.py
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
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = "https://vsud-rs.pravosudje.ba"
START_URL = f"{BASE}/vstvfo/B/118/navigacija?modul=9967"
MODULE_ID_SUDSKA_PRAKSA = 9967
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = (15, 90)
SLEEP_SEC = 1.0

# Department folder slugs (Serbian/Latin site text)
DEPT_KEYWORDS = (
    ("krivicno", ("krivično", "krivicno")),
    ("gradjansko", ("građansko", "gradjansko")),
    ("upravno", ("upravno",)),
)

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


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def norm_text(s: str) -> str:
    return " ".join(s.lower().translate(_TRANSLIT_MAP).split())


def dept_slug_for_category(category_name: str) -> str | None:
    n = norm_text(category_name)
    for slug, keys in DEPT_KEYWORDS:
        if any(k in n for k in keys):
            return slug
    return None


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
    return s.strip("._ ") or "document.pdf"


class PoliteSession(requests.Session):
    def request(self, method, url, **kwargs):  # type: ignore[override]
        kwargs.setdefault("timeout", REQUEST_TIMEOUT)
        kwargs.setdefault("headers", {})
        kwargs["headers"].setdefault("User-Agent", USER_AGENT)
        r = super().request(method, url, **kwargs)
        time.sleep(SLEEP_SEC)
        return r


def fetch_html(session: PoliteSession, url: str) -> str:
    r = session.get(url)
    r.raise_for_status()
    r.encoding = r.apparent_encoding or "utf-8"
    return r.text


def next_data_payload(html: str) -> dict | None:
    soup = BeautifulSoup(html, "html.parser")
    tag = soup.find("script", id="__NEXT_DATA__")
    if not tag or not tag.string:
        return None
    return json.loads(tag.string)


def load_navigation_tree(session: PoliteSession) -> list[dict]:
    html = fetch_html(session, START_URL)
    data = next_data_payload(html)
    if not data:
        raise RuntimeError("Could not parse __NEXT_DATA__ on navigacija page.")
    items = data.get("props", {}).get("pageProps", {}).get("navigationItems")
    if not isinstance(items, list):
        raise RuntimeError("navigationItems missing on navigacija page.")
    for mod in items:
        if mod.get("moduleId") == MODULE_ID_SUDSKA_PRAKSA:
            return mod.get("categories") or []
    raise RuntimeError("Sudska praksa module (9967) not found in navigationItems.")


def discover_subcategories(
    categories: list[dict],
) -> list[tuple[str, str, str, int, int, int, str]]:
    """
    dept_slug, category_label, sub_name, module_id, category_id,
    subcategory_id, listing_url
    """
    out: list[tuple[str, str, str, int, int, int, str]] = []
    for cat in categories:
        name = str(cat.get("categoryName") or "")
        slug = dept_slug_for_category(name)
        if not slug:
            continue
        cat_id = int(cat["categoryId"])
        for sub in cat.get("subcategories") or []:
            sub_id = int(sub["subcategoryId"])
            sub_name = str(sub.get("subcategoryName") or f"sub-{sub_id}")
            url = (
                f"{BASE}/vstvfo/B/118/kategorije-vijesti/"
                f"{MODULE_ID_SUDSKA_PRAKSA}/{cat_id}/{sub_id}"
            )
            out.append((slug, name, sub_name, MODULE_ID_SUDSKA_PRAKSA, cat_id, sub_id, url))
    return out


DOWNLOAD_RE = re.compile(
    r"https?://[^\"'\\s]+/vstvfo-api/vijest/download/(\d+)", re.IGNORECASE
)


def extract_pdfs_from_news_html(news_block: list[dict]) -> list[tuple[str, str]]:
    """Return list of (absolute_url, display_label)."""
    found: list[tuple[str, str]] = []
    seen: set[str] = set()
    for item in news_block:
        raw = item.get("content") or ""
        if not raw:
            continue
        frag = BeautifulSoup(raw, "html.parser")
        for a in frag.select('a[href*="vijest/download"]'):
            href = (a.get("href") or "").strip()
            if not href:
                continue
            abs_url = urljoin(BASE, href)
            if abs_url in seen:
                continue
            label = " ".join(a.get_text().split()).strip()
            if not label:
                m_id = DOWNLOAD_RE.search(abs_url)
                label = f"download-{m_id.group(1)}" if m_id else "download"
            seen.add(abs_url)
            found.append((abs_url, label))
    return found


def _as_pos_int(v: object) -> int | None:
    if isinstance(v, bool):
        return None
    if isinstance(v, int) and v >= 0:
        return v
    if isinstance(v, float) and v == int(v):
        return int(v)
    if isinstance(v, str) and v.isdigit():
        return int(v)
    return None


def content_meta(content: dict) -> tuple[list[dict], int | None, int | None]:
    news = content.get("news")
    if not isinstance(news, list):
        return [], None, None
    return news, _as_pos_int(content.get("total")), _as_pos_int(content.get("newsPerPage"))


def collect_pdfs_for_subcategory(session: PoliteSession, listing_url: str) -> list[tuple[str, str]]:
    """
    Parse __NEXT_DATA__ from listing page(s). Server often embeds all PDF links in one
    response; we still probe ?currentPage / ?page / ?stranica when pagination returns
    new news item ids.
    """
    all_pdfs: dict[str, str] = {}

    def merge_from_html(html: str) -> None:
        nd = next_data_payload(html)
        if not nd:
            return
        content = nd.get("props", {}).get("pageProps", {}).get("content") or {}
        news, _, _ = content_meta(content)
        for abs_url, label in extract_pdfs_from_news_html(news):
            all_pdfs.setdefault(abs_url, label)

    first_html = fetch_html(session, listing_url)
    merge_from_html(first_html)
    firstnd = next_data_payload(first_html)
    if not firstnd:
        return [(u, all_pdfs[u]) for u in all_pdfs]

    content = firstnd.get("props", {}).get("pageProps", {}).get("content") or {}
    news, total, npp = content_meta(content)
    news_ids = tuple(int(n["id"]) for n in news if isinstance(n.get("id"), int))
    visited_ids_sets: list[tuple[int, ...]] = [news_ids]

    max_pages = 1
    if total and npp and npp > 0:
        max_pages = max(max_pages, int(math.ceil(total / npp)))
    max_pages = min(max(max_pages, 25), 500)

    for p in range(2, max_pages + 1):
        got_new_ids = False
        for qp, val in (("currentPage", p), ("page", p), ("stranica", p)):
            candidate = f"{listing_url}?{qp}={val}"
            try:
                html = fetch_html(session, candidate)
            except requests.RequestException:
                continue
            nd = next_data_payload(html)
            if not nd:
                continue
            c2 = nd.get("props", {}).get("pageProps", {}).get("content") or {}
            news2, _, _ = content_meta(c2)
            ids2 = tuple(int(n["id"]) for n in news2 if isinstance(n.get("id"), int))
            if not ids2 or ids2 in visited_ids_sets:
                continue
            visited_ids_sets.append(ids2)
            merge_from_html(html)
            got_new_ids = True
            break
        if not got_new_ids:
            break

    return [(u, all_pdfs[u]) for u in all_pdfs]


def pdf_basename(display: str) -> str:
    base = sanitize_filename(display)
    if not base.lower().endswith(".pdf"):
        base += ".pdf"
    return base


def unique_target_path(directory: Path, filename: str, url: str) -> Path:
    p = directory / filename
    if not p.exists():
        return p
    short = hashlib.sha256(url.encode("utf-8")).hexdigest()[:8]
    stem = Path(filename).stem
    return directory / f"{stem}__{short}.pdf"


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


def main() -> int:
    parser = argparse.ArgumentParser(description="Download VS RS Sudska praksa PDFs.")
    parser.add_argument(
        "--max-subcategories",
        type=int,
        default=0,
        help="If >0, only process the first N subcategories (deterministic URL order).",
    )
    parser.add_argument(
        "--max-pdfs",
        type=int,
        default=0,
        help="If >0, stop after processing this many PDF links (download/skip/fail; for testing).",
    )
    args = parser.parse_args()

    root = repo_root()
    out_root = root / "downloads" / "bih-rs"
    log_path = out_root / "download-log.json"

    session = PoliteSession()
    log_entries = load_log(log_path)
    iso_now = lambda: dt.datetime.now(dt.UTC).strftime("%Y-%m-%dT%H:%M:%SZ")

    downloaded = failed = skipped = 0
    pdf_budget = args.max_pdfs if args.max_pdfs and args.max_pdfs > 0 else None

    try:
        categories = load_navigation_tree(session)
        subs = discover_subcategories(categories)
        subs.sort(key=lambda x: (x[0], x[2], x[5]))  # dept, sub_name, sub_id

        if args.max_subcategories and args.max_subcategories > 0:
            subs = subs[: args.max_subcategories]

        for dept_slug, cat_label, sub_name, _mid, _cat_id, _sub_id, listing_url in subs:
            sub_slug = slugify(sub_name, f"cat-{_sub_id}")
            pdf_dir = out_root / dept_slug / sub_slug

            try:
                pairs = collect_pdfs_for_subcategory(session, listing_url)
            except requests.RequestException as e:
                entry = {
                    "category": cat_label,
                    "subcategory": sub_name,
                    "filename": "",
                    "url": listing_url,
                    "status": "failed",
                    "downloaded_at": iso_now(),
                    "error": f"listing fetch: {e}",
                }
                log_entries.append(entry)
                failed += 1
                print(f"[list failed] {dept_slug}/{sub_slug}: {e}", file=sys.stderr)
                continue

            if not pairs:
                print(f"[no pdf links] {dept_slug}/{sub_slug}", file=sys.stderr)

            for url, disp in pairs:
                if pdf_budget is not None and pdf_budget <= 0:
                    break
                fname_req = pdf_basename(disp)
                dest = unique_target_path(pdf_dir, fname_req, url)

                disp_short = sanitize_filename(disp.replace("_", " "))[:120]
                print(f"Downloading: {disp_short} from {cat_label} / {sub_name}")

                if dest.exists() and dest.stat().st_size > 0:
                    with open(dest, "rb") as fh:
                        head = fh.read(5)
                    if head.startswith(b"%PDF"):
                        skipped += 1
                        if pdf_budget is not None:
                            pdf_budget -= 1
                        log_entries.append(
                            {
                                "category": cat_label,
                                "subcategory": sub_name,
                                "filename": dest.name,
                                "url": url,
                                "status": "skipped",
                                "downloaded_at": iso_now(),
                            }
                        )
                        continue

                status, err = download_pdf(session, url, dest)
                entry = {
                    "category": cat_label,
                    "subcategory": sub_name,
                    "filename": dest.name,
                    "url": url,
                    "status": status,
                    "downloaded_at": iso_now(),
                }
                if err:
                    entry["error"] = err
                log_entries.append(entry)
                if status == "downloaded":
                    downloaded += 1
                else:
                    failed += 1
                    print(f"  -> error: {err}", file=sys.stderr)

                if pdf_budget is not None:
                    pdf_budget -= 1

            if pdf_budget is not None and pdf_budget <= 0:
                break

    finally:
        save_log(log_path, log_entries)

    print(
        f"Summary: {downloaded} PDFs downloaded, {failed} failed, {skipped} skipped",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
