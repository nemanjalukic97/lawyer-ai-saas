# Phase B — Case Law Expansion Findings (Montenegro labor + Serbia vrh.sud.rs)

**Status:** Investigation complete. Downloaders fixed and probe modes added. **No full scrape was run** (per task constraints).

---

## Spacing repair verification

All Montenegro generators (`_gen-montenegro-*-lib.mjs`) and Serbia vrhovni (`_gen-serbia-vrhovni-lib.mjs`) import `prepareText` from `_gen-prepare-text.mjs`, which calls `repairLegalTextSpacing` from `_repair-legal-text-spacing.mjs`. New corpus text will get spacing repair automatically at generation time.

**GLUE_PAIRS extended** for Serbia vrh.sud.rs sentence PDFs (fused tokens like `kadaje`, `TROŠKOVAKOD`, `usvojenna`). Montenegro sudovi.me HTML often inserts **per-character line breaks** in party names (`V\n.\nD\n.`) — `deSpacePdfArtifact` in `prepareText` handles spaced letters; no Montenegro-specific GLUE pairs were needed beyond existing rules.

---

## Part 1 — Montenegro labor

### sudovi.me API (probe evidence)

| Capability | Finding |
|------------|---------|
| Endpoint | `POST https://sudovi.me/api/search/decisions` |
| Body keys | `courtCode`, `start`, `rows`, optional `year` |
| Response fields | `dbid`, `courtName`, `sifraPredmeta`, `upisnikBroj`, `upisnikGodina`, `vrstaPredmeta`, `vrstaOdluke`, `datumVijecanja`, … |
| **Register filter** | **Not supported** — `sifraPredmeta=PDP` returns same `numFound` as unfiltered (625,124) |
| Decision body | `GET https://sudovi.me/api/decision/{dbid}` → `tekst` (HTML) |

### Labor register (PDP / PŽR / PZR)

| Probe | Result |
|-------|--------|
| 3,000-doc sdvi prefix scan | **0** PDP/PŽR/PZR |
| 13,097 downloaded files | **0** filenames with PDP/PZR/PŽR prefix |
| Generator mapping | `legalAreaFromSifra()` in `_gen-montenegro-*-lib.mjs` maps PDP/PŽR/PZR → `labor` — **correct but unused** |

**Conclusion:** Montenegro does **not** expose a separate labor court register in sudovi.me metadata. Labor disputes are filed under **civil registers** (especially `P` parnični at osnovni sudovi, `Gž` appeals at Viši sud).

### Courts handling labor (from API + corpus)

| Court | courtCode | Role | 2025 decisions | All years |
|-------|-----------|------|----------------|-----------|
| Osnovni sud u Baru | `osbr` | First instance (P register) | 881 | 25,839 |
| Viši sud u Podgorici | `vspg` | Appeals (Gž register) | 2,492 | 75,435 |
| Vrhovni / Apelacioni / Upravni / Privredni | `sdvi` | Filtered by `courtName` | — | 625k shared index |

### Labor content estimate (keyword sample, n=15 each)

Probe command (safe, no bulk download):

```powershell
C:\Users\neco9\AppData\Local\Programs\Python\Python314\python.exe scripts\download-montenegro-pdfs.py --probe-listings --probe-sample-rows 5000 --probe-labor-keywords 30
```

| Stream | Labor keyword hit rate |
|--------|------------------------|
| osnovni-bar `P` register (2025) | ~13% (2/15) |
| visi-podgorica `Gž` register (2025) | ~46% (7/15) |

**Phase C sizing (rough):** If ~15–45% of civil-stream decisions touch labor keywords, a **content-based reclassification** pass over existing `P`/`Gž` downloads could surface **hundreds to low thousands** of labor-relevant cases — not zero, but not a dedicated register scrape. **Do not build a classifier in Phase B.**

### Downloader gap (not fixed in this pass)

Dedicated courts (`visi-podgorica`, `osnovni-bar`) currently download **year=2025 only** — missing ~97% of Viši catalog. Expanding to all years is a separate scrape decision (user machine).

### What was added

- `download-montenegro-pdfs.py`: `--probe-listings`, `--probe-sample-rows`, `--probe-labor-keywords`

---

## Part 2 — Serbia vrh.sud.rs

### Root cause of empty/tiny folders

| Issue | Evidence | Impact |
|-------|----------|--------|
| **ASCII URLs** | `gradanska-materija-2` → **404**; correct slug is `građanska-materija` (đ) | Parent pages failed |
| **Children gated on parent HTML** | `if child_slugs and html is not None` | When parent 404'd, **14 građanska child slugs never fetched** (incl. `radno-pravo`) |
| **Wrong razumni rok path** | `zastita-prava-...` (ASCII) → 404; correct: `zaštita-prava-na-suđenje-u-razumnom-roku-0` | Procedural folder empty |
| **vk.sud.rs PDF noise** | Listing pages link external `vk.sud.rs` attachments | Downloader counted non-vrh PDFs |
| **Incomplete pagination** | Criminal sentence split across `krivična-materija-0` … `-5` | Only page `-0` was configured |
| **Never completed run** | `downloads/serbia/` has ~340 PDFs vs **~847** available on vrh.sud.rs | Partial smoke run only |

**Not** a site outage — content exists; script URLs and control flow were wrong.

### Fixed in `download-serbia-pdfs.py`

1. Unicode slugs (`građanska`, `krivična`, `zaštita`, `porodično`, `izvršni`, `stečajno`, en-dash procedural paths)
2. `paths` arrays — krivična `-0`…`-5`, upravna `-0`…`-3`, both razumni rok pages
3. Građanska sentence: fetch **child slugs unconditionally** (no parent dependency)
4. `vrh.sud.rs`-only PDF filter
5. `--probe-listings` mode

### Estimated volume per category (probe, 2026-07-06)

```powershell
C:\Users\neco9\AppData\Local\Programs\Python\Python314\python.exe scripts\download-serbia-pdfs.py --probe-listings
```

| Category | Folder | vrh PDFs |
|----------|--------|----------|
| ustavni | presude-protiv-srbije | 275 |
| bilteni | (3 folders) | 50 |
| pravna-shvatanja | krivicna-materija | 3 |
| pravna-shvatanja | gradanska-materija | 3 |
| pravna-shvatanja | upravna-materija | 3 |
| pravna-shvatanja | **razumni-rok** | **84** |
| sentence | **krivicna-materija** (pages 0–5) | **14** |
| sentence | **gradanska-materija** (children) | **317** |
| sentence | upravna-materija | 11 |
| sentence | **razumni-rok** | **84** |
| ujednacavanje / uporedna | 3 folders | 0 (HTML-only pages) |
| **Grand total** | | **~847** |

**Labor (`radno-pravo` child):** **75** vrh PDFs (subset of gradanska sentence 317).

### Curated pipeline (`case-law-*-serbia-*.ts` / sudskapraksa.rs)

The `case-law-labor-serbia-*.ts` and related files are **hand-curated summaries** with `source_url: "https://sudskapraksa.rs"` — structured for ingestion, not auto-scraped from a stable API. sudskapraksa.rs is a **search portal** (not a bulk export); useful for targeted manual expansion, **not** a drop-in automated scrape like vrh.sud.rs PDF listings. Recommend vrh.sud.rs downloader for Phase B volume; keep sudskapraksa.rs for curated gap-fill.

---

## Probe commands (safe — run these first)

```powershell
cd C:\Users\neco9\OneDrive\Desktop\CursorModel\my-app

# Montenegro API + labor sizing
C:\Users\neco9\AppData\Local\Programs\Python\Python314\python.exe scripts\download-montenegro-pdfs.py --probe-listings --probe-sample-rows 5000 --probe-labor-keywords 30

# Serbia vrh.sud.rs per-category PDF counts
C:\Users\neco9\AppData\Local\Programs\Python\Python314\python.exe scripts\download-serbia-pdfs.py --probe-listings

# Smoke (3 items each, optional)
C:\Users\neco9\AppData\Local\Programs\Python\Python314\python.exe scripts\download-serbia-pdfs.py --max-pdfs 3
C:\Users\neco9\AppData\Local\Programs\Python\Python314\python.exe scripts\download-montenegro-pdfs.py --max-decisions 3
```

---

## Full scrape commands — **DO NOT RUN YET**

Run only after reviewing this report and probe output.

```powershell
cd C:\Users\neco9\OneDrive\Desktop\CursorModel\my-app

# Serbia — full vrh.sud.rs PDF harvest (~847 PDFs, resumable via download-log.json)
C:\Users\neco9\AppData\Local\Programs\Python\Python314\python.exe scripts\download-serbia-pdfs.py

# Montenegro — existing courts only (no new labor register; expands current 13k corpus)
# NOTE: visi-podgorica/osnovni-bar still year=2025 unless you change COURTS config first
C:\Users\neco9\AppData\Local\Programs\Python\Python314\python.exe scripts\download-montenegro-pdfs.py

# After downloads — generate TS batches (user machine)
node scripts/run-serbia-vrhovni.mjs
node scripts/run-montenegro-vrhovni.mjs
# ... other run-montenegro-*.mjs as needed
```

---

## Files changed (Phase B prep only)

| File | Change |
|------|--------|
| `scripts/download-serbia-pdfs.py` | URL fixes, probe mode, vrh-only PDFs, unconditional child fetch |
| `scripts/download-montenegro-pdfs.py` | `--probe-listings` + labor keyword sample |
| `scripts/_repair-legal-text-spacing.mjs` | Serbia sentence GLUE_PAIRS |

**Not touched:** `ingest-case-law.ts`, `lib/legalRag.ts`, thresholds, UI.

`npm run build` — **passes**.
