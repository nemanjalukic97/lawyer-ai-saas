"""Shared helpers for --force-refresh law download mode."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Callable


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_text(text: str) -> str:
    return sha256_bytes(text.encode("utf-8"))


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def init_counters(*, force_refresh: bool) -> dict[str, int]:
    if force_refresh:
        return {"new": 0, "updated": 0, "unchanged": 0, "failed": 0}
    return {"downloaded": 0, "failed": 0, "skipped": 0}


def merge_counters(totals: dict[str, int], counts: dict[str, int]) -> None:
    for k, v in counts.items():
        totals[k] = totals.get(k, 0) + v


def apply_refresh_write(
    dest: Path,
    content: str,
    *,
    force_refresh: bool,
    existing: Path | None,
    save_fn: Callable[[Path, str], None],
) -> str:
    """
    Write content to dest when appropriate.

    Returns: new | updated | unchanged | downloaded
    """
    if force_refresh:
        if existing is None:
            save_fn(dest, content)
            return "new"
        if sha256_text(content) == sha256_file(existing):
            return "unchanged"
        save_fn(existing, content)
        return "updated"

    save_fn(dest, content)
    return "downloaded"


def record_refresh_status(counters: dict[str, int], status: str) -> None:
    if status in counters:
        counters[status] += 1


def print_sync_summary(counters: dict[str, int], *, prefix: str = "") -> None:
    if "new" in counters:
        msg = (
            f"{prefix}{counters.get('new', 0)} new, "
            f"{counters.get('updated', 0)} updated, "
            f"{counters.get('unchanged', 0)} unchanged, "
            f"{counters.get('failed', 0)} failed"
        )
    else:
        msg = (
            f"{prefix}{counters.get('downloaded', 0)} downloaded, "
            f"{counters.get('failed', 0)} failed, "
            f"{counters.get('skipped', 0)} skipped"
        )
    print(msg)


def emit_sync_stats(counters: dict[str, int]) -> None:
    if "new" in counters:
        payload = {
            "new": counters.get("new", 0),
            "updated": counters.get("updated", 0),
            "unchanged": counters.get("unchanged", 0),
            "failed": counters.get("failed", 0),
        }
    else:
        payload = {
            "downloaded": counters.get("downloaded", 0),
            "skipped": counters.get("skipped", 0),
            "failed": counters.get("failed", 0),
        }
    print(f"SYNC_STATS:{json.dumps(payload, separators=(',', ':'))}")
