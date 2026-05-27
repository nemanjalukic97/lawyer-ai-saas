"""
Rebuild Cursor agent sidebar index (composer.composerData allComposers)
from on-disk agent transcripts for this workspace.

IMPORTANT:
  1. Fully quit Cursor before running (File -> Exit, not just close window).
  2. This script backs up state.vscdb then writes a new allComposers list.

Usage:
  python scripts/restore-cursor-agent-sidebar.py
  python scripts/restore-cursor-agent-sidebar.py --dry-run
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import sqlite3
import sys
from datetime import datetime

WORKSPACE_DB = os.path.expandvars(
    r"%APPDATA%\Cursor\User\workspaceStorage\08c548f7f6bc0a00d7b409204520d49c\state.vscdb"
)
TRANSCRIPTS = os.path.expandvars(
    r"%USERPROFILE%\.cursor\projects\c-Users-neco9-OneDrive-Desktop-CursorModel-my-app\agent-transcripts"
)


def first_user_title(path_jsonl: str | None, path_txt: str | None) -> str:
    text = ""
    if path_jsonl and os.path.isfile(path_jsonl):
        with open(path_jsonl, encoding="utf-8", errors="replace") as f:
            line = f.readline()
        try:
            row = json.loads(line)
            text = row["message"]["content"][0]["text"]
        except Exception:
            text = line
    elif path_txt and os.path.isfile(path_txt):
        with open(path_txt, encoding="utf-8", errors="replace") as f:
            text = f.read(8000)

    text = re.sub(r"<user_query>\s*", "", text)
    text = re.sub(r"</user_query>", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:200] if text else "Untitled agent"


def discover_agents() -> list[dict]:
    agents: list[dict] = []
    if not os.path.isdir(TRANSCRIPTS):
        raise SystemExit(f"Transcript folder not found: {TRANSCRIPTS}")

    for name in os.listdir(TRANSCRIPTS):
        base = os.path.join(TRANSCRIPTS, name)
        if name.endswith(".txt"):
            cid = name[:-4]
            mtime = os.path.getmtime(base)
            title = first_user_title(None, base)
        elif os.path.isdir(base):
            cid = name
            j = os.path.join(base, f"{cid}.jsonl")
            mtime = os.path.getmtime(j) if os.path.isfile(j) else os.path.getmtime(base)
            title = first_user_title(j if os.path.isfile(j) else None, None)
        else:
            continue

        ts = int(mtime * 1000)
        agents.append(
            {
                "type": "head",
                "composerId": cid,
                "name": title,
                "subtitle": title[:120],
                "lastUpdatedAt": ts,
                "createdAt": ts,
                "unifiedMode": "agent",
                "forceMode": "edit",
                "hasUnreadMessages": False,
                "totalLinesAdded": 0,
                "totalLinesRemoved": 0,
                "filesChangedCount": 0,
                "hasBlockingPendingActions": False,
                "isArchived": False,
                "isDraft": False,
                "isWorktree": False,
                "isSpec": False,
                "isProject": False,
                "isBestOfNSubcomposer": False,
                "numSubComposers": 0,
                "referencedPlans": [],
            }
        )

    agents.sort(key=lambda a: a["lastUpdatedAt"], reverse=True)
    return agents


def load_composer_data(conn: sqlite3.Connection) -> dict:
    cur = conn.cursor()
    cur.execute("SELECT value FROM ItemTable WHERE key='composer.composerData'")
    row = cur.fetchone()
    if not row:
        return {
            "allComposers": [],
            "selectedComposerIds": [],
            "lastFocusedComposerIds": [],
            "hasMigratedComposerData": True,
            "hasMigratedMultipleComposers": True,
        }
    return json.loads(row[0])


def save_composer_data(conn: sqlite3.Connection, data: dict) -> None:
    cur = conn.cursor()
    cur.execute(
        "INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)",
        ("composer.composerData", json.dumps(data, ensure_ascii=False)),
    )
    conn.commit()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print counts only; do not modify the database",
    )
    args = parser.parse_args()

    if not os.path.isfile(WORKSPACE_DB):
        print(f"Workspace DB not found: {WORKSPACE_DB}", file=sys.stderr)
        return 1

    wal = WORKSPACE_DB + "-wal"
    if os.path.isfile(wal) and os.path.getsize(wal) > 0 and not args.dry_run:
        print(
            "Cursor appears to be running (state.vscdb-wal is non-empty).\n"
            "Fully quit Cursor, then run this script again.",
            file=sys.stderr,
        )
        return 1

    discovered = discover_agents()
    print(f"Discovered {len(discovered)} agents from transcript files.")

    if args.dry_run:
        for a in discovered[:10]:
            print(f"  - {a['composerId'][:8]}... {a['name'][:70]}")
        if len(discovered) > 10:
            print(f"  ... and {len(discovered) - 10} more")
        return 0

    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup = f"{WORKSPACE_DB}.before-restore-{stamp}"
    shutil.copy2(WORKSPACE_DB, backup)
    print(f"Backup: {backup}")

    conn = sqlite3.connect(WORKSPACE_DB)
    try:
        data = load_composer_data(conn)
        prev = data.get("allComposers") or []
        print(f"Previous allComposers count: {len(prev)}")

        # Preserve any existing entries not on disk (rare)
        by_id = {a["composerId"]: a for a in discovered}
        for item in prev:
            cid = item.get("composerId")
            if cid and cid not in by_id:
                by_id[cid] = item

        merged = sorted(by_id.values(), key=lambda a: a.get("lastUpdatedAt", 0), reverse=True)
        data["allComposers"] = merged

        sel = data.get("selectedComposerIds") or []
        focus = data.get("lastFocusedComposerIds") or []
        if not sel and merged:
            sel = [merged[0]["composerId"]]
        if not focus and merged:
            focus = sel[:1]
        data["selectedComposerIds"] = sel
        data["lastFocusedComposerIds"] = focus
        data["hasMigratedComposerData"] = True
        data["hasMigratedMultipleComposers"] = True

        save_composer_data(conn, data)
        print(f"Wrote allComposers with {len(merged)} entries.")
        print("Restart Cursor and open folder: ...\\CursorModel\\my-app")
    finally:
        conn.close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
