#!/usr/bin/env python3
"""
Legantis — Slanje outreach mejlova advokatima (Gmail SMTP), SVE JURISDIKCIJE

3-touch sekvenca (mejl1 → mejl2 nakon 4 dana → mejl3 nakon još 6 dana).
Vodič se šalje kao link (https://legantis.app/vodic) sa UTM praćenjem — bez PDF privitka.

POKRETANJE:
    python scripts/outreach/send_outreach.py           # dry run: 0 poslanih, CSV se ne mijenja
    python scripts/outreach/send_outreach.py --send    # stvarno slanje

Potrebne env varijable (ili scripts/outreach/.env):
    DATABASE_URL          # obavezno i za dry run (auth.users)
    GMAIL_ADDRESS         # samo uz --send
    GMAIL_APP_PASSWORD    # samo uz --send
"""

import argparse
import csv
import os
import re
import sys
import time
from collections import Counter
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import make_msgid
from urllib.parse import urlencode

from outreach_common import MASTER_CSV, FIELDNAMES, load_config

# ─────────────────────────────────────────────
# ENV / CREDENTIALS
# ─────────────────────────────────────────────

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
EXCLUDE_FILE = os.path.join(SCRIPT_DIR, "exclude_emails.txt")

_TITLE_TOKENS = frozenset({
    "doc", "dr", "mr", "mrs", "prof",
    "др", "мр", "доц", "проф",
})

_LAT_TO_CYR = {
    "a": "а", "b": "б", "c": "ц", "č": "ч", "ć": "ћ", "d": "д",
    "đ": "ђ", "e": "е", "f": "ф", "g": "г", "h": "х", "i": "и",
    "j": "ј", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о",
    "p": "п", "r": "р", "s": "с", "š": "ш", "t": "т", "u": "у",
    "v": "в", "z": "з", "ž": "ж",
}
_CYR_TO_LAT = {cyr: lat for lat, cyr in _LAT_TO_CYR.items()}
_LAT_DIGRAPHS = (
    ("dž", "џ"),
    ("lj", "љ"),
    ("nj", "њ"),
)
_CYR_DIGRAPHS = {
    "љ": "lj", "Љ": "LJ",
    "њ": "nj", "Њ": "NJ",
    "џ": "dž", "Џ": "DŽ",
}

_MEJL3_SUBJECT_SR = {
    "srbija_beograd": "Re: Легантис — AI правни асистент за адвокате у Београду",
    "srbija_vojvodina": "Re: Легантис — AI правни асистент за адвокате у Војводини",
}


def _load_env():
    """Učitava scripts/outreach/.env u okruženje. Ne ispisuje vrijednosti."""
    env_path = os.path.join(SCRIPT_DIR, ".env")
    try:
        from dotenv import load_dotenv
        load_dotenv(env_path)
    except ImportError:
        if os.path.exists(env_path):
            with open(env_path, encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith("#") or "=" not in line:
                        continue
                    key, _, value = line.partition("=")
                    key = key.strip()
                    value = value.strip().strip('"').strip("'")
                    os.environ.setdefault(key, value)


def load_credentials():
    """Učitava Gmail credentials isključivo iz okruženja (.env ako je python-dotenv dostupan)."""
    _load_env()

    address = os.environ.get("GMAIL_ADDRESS", "").strip()
    password = os.environ.get("GMAIL_APP_PASSWORD", "").strip()

    missing = []
    if not address:
        missing.append("GMAIL_ADDRESS")
    if not password:
        missing.append("GMAIL_APP_PASSWORD")
    if missing:
        print("GREŠKA: Nedostaju credentials. Postavi u okruženje ili scripts/outreach/.env:")
        for m in missing:
            print(f"  {m}=...")
        print("Nema hardkodiranog fallbacka — App Password se čita samo iz env.")
        sys.exit(1)

    return address, password


SITE_URL = "https://legantis.app"
VODIC_URL = "https://legantis.app/vodic"

MEJL1_WAIT_DAYS = 4
MEJL2_WAIT_DAYS = 6

TAG_RE = re.compile(r"<[^>]+>")


def utm_url(base, jurisdikcija, content):
    qs = urlencode({
        "utm_source": "email",
        "utm_medium": "outreach",
        "utm_campaign": jurisdikcija or "unknown",
        "utm_content": content,
    })
    sep = "&" if "?" in base else "?"
    return f"{base}{sep}{qs}"


def strip_html(text):
    return TAG_RE.sub("", text).replace("&rarr;", "→").replace("&middot;", "·").replace("&mdash;", "—")


def translit_sr(text, to):
    """Serbian Latin ↔ Cyrillic. Digraphs lj/nj/dž (and Lj/LJ, Nj/NJ, Dž/DŽ) are one letter."""
    if to == "cyr":
        return _lat_to_cyr(text or "")
    if to == "lat":
        return _cyr_to_lat(text or "")
    raise ValueError(f"translit_sr: neočekivan smjer {to!r}")


def _lat_to_cyr(text):
    out = []
    i = 0
    while i < len(text):
        if i + 1 < len(text):
            pair = text[i:i + 2]
            low = pair.lower()
            mapped = None
            for latin, cyr in _LAT_DIGRAPHS:
                if low == latin:
                    mapped = cyr.upper() if pair[0].isupper() else cyr
                    break
            if mapped is not None:
                out.append(mapped)
                i += 2
                continue
        ch = text[i]
        cyr = _LAT_TO_CYR.get(ch.lower())
        if cyr:
            out.append(cyr.upper() if ch.isupper() else cyr)
        else:
            out.append(ch)
        i += 1
    return "".join(out)


def _cyr_to_lat(text):
    out = []
    for ch in text:
        if ch in _CYR_DIGRAPHS:
            out.append(_CYR_DIGRAPHS[ch])
            continue
        lat = _CYR_TO_LAT.get(ch.lower())
        if lat:
            out.append(lat.upper() if ch.isupper() else lat)
        else:
            out.append(ch)
    return "".join(out)


def title_surname(text):
    return (text or "").strip().title()


def valid_rod(value):
    return (value or "").strip().lower() in ("m", "z")


def blocked_prezime(prezime):
    text = (prezime or "").strip()
    if "." in text:
        return True
    for token in text.split():
        cleaned = token.casefold().strip(".,;:()[]\"'")
        if cleaned in _TITLE_TOKENS:
            return True
    return False


def row_unknown_rod(row):
    return (not valid_rod(row.get("rod"))) or blocked_prezime(row.get("prezime"))


def email_script(jurisdikcija, touch):
    if touch == "mejl3" and (jurisdikcija or "").startswith("srbija_"):
        return "cyr"
    return "lat"


def greeting(rod, prezime, jurisdikcija, touch):
    """Salutation line only, including the comma. Surname is in the body's script."""
    script = email_script(jurisdikcija, touch)
    surname = title_surname(translit_sr(prezime, script))
    female = (rod or "").strip().lower() == "z"
    if script == "cyr":
        word = "Поштована госпођо" if female else "Поштовани господине"
        return f"{word} {surname},"
    if (jurisdikcija or "").strip() == "slovenija":
        word = "Spoštovana gospa" if female else "Spoštovani gospod"
        return f"{word} {surname},"
    word = "Poštovana gospođo" if female else "Poštovani gospodine"
    return f"{word} {surname},"


# ─────────────────────────────────────────────
# HTML BUILDERS
# ─────────────────────────────────────────────

def _header_html():
    return """  <!-- HEADER -->
  <tr><td style="background:#0D1117;padding:28px 32px;border-radius:8px 8px 0 0;text-align:center;">
    <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.05em;">LEGANTIS</p>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">AI Legal Assistant</p>
  </td></tr>"""


def _footer_html(cta_url):
    return f"""  <!-- FOOTER -->
  <tr><td style="background:#f7f8fa;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;padding:20px 32px;text-align:center;">
    <p style="margin:0 0 4px;font-size:13px;color:#555;">S poštovanjem, <strong>Nemanja Lukić</strong></p>
    <p style="margin:0 0 8px;font-size:12px;color:#888;">
      <a href="{cta_url}" style="color:#555;text-decoration:none;">legantis.app</a>
      &nbsp;&middot;&nbsp;
      <a href="mailto:support@legantis.app" style="color:#555;text-decoration:none;">support@legantis.app</a>
    </p>
    <p style="margin:0;font-size:11px;color:#aaa;">&copy; 2026 Legantis &mdash; Sva prava zadržana</p>
  </td></tr>"""


def _wrap_email(body_inner, cta_url):
    return f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 12px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
{_header_html()}
  <tr><td style="background:#ffffff;padding:32px;border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0;">
{body_inner}
  </td></tr>
{_footer_html(cta_url)}
</table>
</td></tr>
</table>
</body>
</html>"""


def build_html_mejl1(rod, prezime, body_paragraphs, mjeseci_tekst, jurisdikcija):
    cta_url = utm_url(SITE_URL, jurisdikcija, "cta")
    vodic_url = utm_url(VODIC_URL, jurisdikcija, "mejl1")
    salutation = greeting(rod, prezime, jurisdikcija, "mejl1")

    paragraphs_html = "".join(
        f'<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#222;">{p}</p>'
        for p in body_paragraphs
    )

    body = f"""
    <p style="margin:0 0 18px;font-size:16px;font-weight:600;color:#111;">{salutation}</p>

    {paragraphs_html}

    <div style="border-top:1px solid #eee;margin:20px 0;"></div>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#222;">
      Trenutno nudimo ograničenom broju advokatskih kancelarija
      <strong>besplatan Firm paket na {mjeseci_tekst}</strong>, bez obaveze.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:4px 0 24px;">
      <a href="{cta_url}"
         style="background:#0D1117;color:#ffffff;text-decoration:none;padding:13px 36px;border-radius:6px;font-size:15px;font-weight:600;display:inline-block;">
        Posjetite legantis.app &rarr;
      </a>
    </td></tr></table>

    <div style="border-top:1px solid #eee;margin:4px 0 20px;"></div>

    <p style="margin:0 0 12px;font-size:13px;color:#555;">
      Kompletan vodič za korisnike sa opisom svih funkcionalnosti platforme možete preuzeti ovdje:
    </p>

    <table cellpadding="0" cellspacing="0" style="background:#f7f8fa;border:1px solid #e0e0e0;border-radius:6px;width:100%;">
    <tr>
      <td width="44" valign="middle" style="padding:12px 0 12px 16px;">
        <div style="width:36px;height:36px;background:#e8eaf0;border-radius:6px;text-align:center;line-height:36px;font-size:18px;">📄</div>
      </td>
      <td valign="middle" style="padding:12px 16px 12px 0;">
        <p style="margin:0;font-size:13px;font-weight:600;color:#222;">
          <a href="{vodic_url}" style="color:#0D1117;text-decoration:none;">Kompletan vodič za korisnike — sve funkcije platforme</a>
        </p>
        <p style="margin:2px 0 0;font-size:12px;color:#888;">legantis.app/vodic &middot; 21 poglavlje</p>
      </td>
    </tr>
    </table>
"""
    return _wrap_email(body, cta_url)


def build_html_followup(rod, prezime, paragraphs, jurisdikcija, touch, cta_label="Posjetite legantis.app"):
    content = f"mejl{touch}"
    cta_url = utm_url(SITE_URL, jurisdikcija, content)
    salutation = greeting(rod, prezime, jurisdikcija, f"mejl{touch}")

    paragraphs_html = "".join(
        f'<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#222;">{p}</p>'
        for p in paragraphs
    )

    body = f"""
    <p style="margin:0 0 18px;font-size:16px;font-weight:600;color:#111;">{salutation}</p>

    {paragraphs_html}

    <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:12px 0 8px;">
      <a href="{cta_url}"
         style="background:#0D1117;color:#ffffff;text-decoration:none;padding:13px 36px;border-radius:6px;font-size:15px;font-weight:600;display:inline-block;">
        {cta_label} &rarr;
      </a>
    </td></tr></table>
"""
    return _wrap_email(body, cta_url)


# ─────────────────────────────────────────────
# EMAIL TEMPLATES
# ─────────────────────────────────────────────

def _link_legantis(jurisdikcija, content="cta"):
    url = utm_url(SITE_URL, jurisdikcija, content)
    return f"<a href='{url}' style='color:#0D1117;font-weight:600;'>legantis.app</a>"


_MEJL3_SRBIJA = (
    "ово је последњи пут да Вам пишем о Легантису, па ћу бити кратак.\n"
    "\n"
    "Легантис Вам на конкретно правно питање даје одговарајуће чланове закона и судску праксу српских судова, уз назнаку извора, тако да сваки навод можете одмах да проверите.\n"
    "\n"
    "Ако желите да га испробате на неком свом предмету, налог отварате на legantis.app.\n"
    "\n"
    "Срдачан поздрав,\n"
    "Немања Лукић\n"
    "Легантис"
)

_MEJL3_BHS = (
    "ovo je posljednji put da Vam pišem o Legantisu, pa ću biti kratak.\n"
    "\n"
    "Legantis Vam na konkretno pravno pitanje daje odgovarajuće članove zakona i sudsku praksu, uz navođenje izvora, tako da svaki navod možete odmah da provjerite.\n"
    "\n"
    "Ako želite da ga isprobate na nekom svom predmetu, nalog otvarate na legantis.app.\n"
    "\n"
    "Srdačan pozdrav,\n"
    "Nemanja Lukić\n"
    "Legantis"
)

_MEJL3_HRVATSKA = (
    "ovo je posljednji put da Vam pišem o Legantisu pa ću biti kratak.\n"
    "\n"
    "Legantis Vam na konkretno pravno pitanje daje odgovarajuće članke zakona i sudsku praksu hrvatskih sudova, uz navod izvora, tako da svaku tvrdnju možete odmah provjeriti.\n"
    "\n"
    "Ako ga želite isprobati na nekom svom predmetu, korisnički račun otvarate na legantis.app.\n"
    "\n"
    "Srdačan pozdrav,\n"
    "Nemanja Lukić\n"
    "Legantis"
)

_MEJL3_SLOVENIJA = (
    "to je zadnjič, da vam pišem o Legantisu, zato bom kratek.\n"
    "\n"
    "Legantis vam na konkretno pravno vprašanje poda ustrezne člene zakonov in sodno prakso, z navedbo virov, tako da lahko vsako navedbo takoj preverite.\n"
    "\n"
    "Če ga želite preizkusiti na kateri od svojih zadev, si račun odprete na legantis.app.\n"
    "\n"
    "Lep pozdrav,\n"
    "Nemanja Lukić\n"
    "Legantis"
)


# Placeholders: paragraphs use {link} which is filled at send time.
EMAIL_TEMPLATES = {
    "bih_rs": {
        "subject": "Legantis — AI pravni asistent za advokate u Republici Srpskoj",
        "paragraphs": [
            "obraćam Vam se kao osnivač Legantisa — AI pravnog asistenta razvijenog isključivo za advokate koji rade po zakonodavstvu Bosne i Hercegovine, Srbije, Hrvatske, Crne Gore i Slovenije.",
            "Platforma je dostupna na {link} i trenutno je u beta fazi sa prvim korisnicima iz regije.",
            "Legantis sadrži opsežnu bazu zakonodavstva i sudske prakse Republike Srpske, redovno ažuriranu.",
            "Platforma omogućava generisanje pravnih dokumenata, predviđanje ishoda spora, pravno istraživanje, analizu ugovora, e-potpis i upravljanje predmetima — sve na jednom mjestu.",
        ],
        "mjeseci": "1 mjesec",
        "mejl2": [
            "kratko se nadovezujem na prethodni mejl.",
            "Jedan konkretan primjer: ukucate \"otkazni rok\" i za par sekundi dobijete relevantne članove zakona i sudske presude — bez sati pretraživanja.",
            "Ako Vam odgovara, rado ću izdvojiti 15 minuta za kratak poziv i pokazati Vam platformu uživo.",
        ],
        "mejl3": _MEJL3_BHS,
        "cta_label": "Posjetite legantis.app",
    },
    "bih_fbih": {
        "subject": "Legantis — AI pravni asistent za advokate u Federaciji BiH",
        "paragraphs": [
            "obraćam Vam se kao osnivač Legantisa — AI pravnog asistenta razvijenog isključivo za advokate koji rade po zakonodavstvu Bosne i Hercegovine, Srbije, Hrvatske, Crne Gore i Slovenije.",
            "Platforma je dostupna na {link} i trenutno je u beta fazi sa prvim korisnicima iz regije.",
            "Legantis sadrži opsežnu bazu zakonodavstva i sudske prakse Federacije BiH, redovno ažuriranu.",
            "Platforma omogućava generisanje pravnih dokumenata, predviđanje ishoda spora, pravno istraživanje, analizu ugovora, e-potpis i upravljanje predmetima — sve na jednom mjestu.",
        ],
        "mjeseci": "1 mjesec",
        "mejl2": [
            "kratko se nadovezujem na prethodni mejl.",
            "Jedan konkretan primjer: ukucate \"otkazni rok\" i za par sekundi dobijete relevantne članove zakona i sudske presude — bez sati pretraživanja.",
            "Ako Vam odgovara, rado ću izdvojiti 15 minuta za kratak poziv i pokazati Vam platformu uživo.",
        ],
        "mejl3": _MEJL3_BHS,
        "cta_label": "Posjetite legantis.app",
    },
    "bih_brcko": {
        "subject": "Legantis — AI pravni asistent za advokate u Brčko distriktu",
        "paragraphs": [
            "obraćam Vam se kao osnivač Legantisa — AI pravnog asistenta razvijenog isključivo za advokate koji rade po zakonodavstvu Bosne i Hercegovine, Srbije, Hrvatske, Crne Gore i Slovenije.",
            "Platforma je dostupna na {link} i trenutno je u beta fazi sa prvim korisnicima iz regije.",
            "Legantis sadrži opsežnu bazu zakonodavstva i sudske prakse, uključujući Brčko distrikt, redovno ažuriranu.",
            "Platforma omogućava generisanje pravnih dokumenata, predviđanje ishoda spora, pravno istraživanje, analizu ugovora, e-potpis i upravljanje predmetima — sve na jednom mjestu.",
        ],
        "mjeseci": "1 mjesec",
        "mejl2": [
            "kratko se nadovezujem na prethodni mejl.",
            "Jedan konkretan primjer: ukucate \"otkazni rok\" i za par sekundi dobijete relevantne članove zakona i sudske presude — bez sati pretraživanja.",
            "Ako Vam odgovara, rado ću izdvojiti 15 minuta za kratak poziv i pokazati Vam platformu uživo.",
        ],
        "mejl3": _MEJL3_BHS,
        "cta_label": "Posjetite legantis.app",
    },
    "srbija_beograd": {
        "subject": "Legantis — AI pravni asistent za advokate u Beogradu",
        "paragraphs": [
            "obraćam Vam se kao osnivač Legantisa — AI pravnog asistenta napravljenog za advokate koji rade u srpskom pravnom sistemu.",
            "Legantis je dostupan na {link} i u beta je fazi sa prvim korisnicima iz regije.",
            "Legantis sadrži opsežnu bazu srpskog zakonodavstva i sudske prakse, redovno ažuriranu.",
            "Platforma omogućava generisanje pravnih dokumenata u skladu sa srpskim zakonodavstvom, predviđanje ishoda spora na osnovu stvarnih presuda, pravno istraživanje, analizu ugovora i upravljanje predmetima.",
        ],
        "mjeseci": "1 mesec",
        "mejl2": [
            "kratko se nadovezujem na prethodni mejl.",
            "Jedan konkretan primer: ukucate \"otkazni rok\" i za par sekundi dobijete relevantne članove zakona i sudske presude — bez sati pretraživanja.",
            "Ako Vam odgovara, rado ću izdvojiti 15 minuta za kratak poziv i pokazati Vam platformu uživo.",
        ],
        "mejl3": _MEJL3_SRBIJA,
        "cta_label": "Posetite legantis.app",
    },
    "srbija_vojvodina": {
        "subject": "Legantis — AI pravni asistent za advokate u Vojvodini",
        "paragraphs": [
            "obraćam Vam se kao osnivač Legantisa — AI pravnog asistenta napravljenog za advokate koji rade u srpskom pravnom sistemu.",
            "Legantis je dostupan na {link} i u beta je fazi sa prvim korisnicima iz regije.",
            "Legantis sadrži opsežnu bazu srpskog zakonodavstva i sudske prakse, redovno ažuriranu.",
            "Platforma omogućava generisanje pravnih dokumenata u skladu sa srpskim zakonodavstvom, predviđanje ishoda spora na osnovu stvarnih presuda, pravno istraživanje, analizu ugovora i upravljanje predmetima.",
        ],
        "mjeseci": "1 mesec",
        "mejl2": [
            "kratko se nadovezujem na prethodni mejl.",
            "Jedan konkretan primer: ukucate \"otkazni rok\" i za par sekundi dobijete relevantne članove zakona i sudske presude — bez sati pretraživanja.",
            "Ako Vam odgovara, rado ću izdvojiti 15 minuta za kratak poziv i pokazati Vam platformu uživo.",
        ],
        "mejl3": _MEJL3_SRBIJA,
        "cta_label": "Posetite legantis.app",
    },
    "hrvatska": {
        "subject": "Legantis — AI pravni asistent za hrvatske odvjetnike",
        "paragraphs": [
            "obraćam Vam se kao osnivač Legantisa — AI pravnog asistenta razvijenog za odvjetnike koji rade po hrvatskom pravnom sustavu.",
            "Platforma je dostupna na {link} i trenutno je u beta fazi.",
            "Legantis sadrži opsežnu bazu hrvatskog zakonodavstva i sudske prakse, redovno ažuriranu.",
            "Legantis omogućava generiranje pravnih dokumenata, predviđanje ishoda spora na temelju stvarnih presuda, pravno istraživanje, analizu i redline ugovora te upravljanje predmetima i fakturama.",
        ],
        "mjeseci": "1 mjesec",
        "mejl2": [
            "kratko se nadovezujem na prethodni email.",
            "Jedan konkretan primjer: upišete \"otkazni rok\" i za par sekundi dobijete relevantne članke zakona i sudske presude — bez sati pretraživanja.",
            "Ako Vam odgovara, rado ću izdvojiti 15 minuta za kratak poziv i pokazati Vam platformu uživo.",
        ],
        "mejl3": _MEJL3_HRVATSKA,
        "cta_label": "Posjetite legantis.app",
    },
    "crna_gora": {
        "subject": "Legantis — AI pravni asistent za crnogorske advokate",
        "paragraphs": [
            "obraćam Vam se kao osnivač Legantisa — AI pravnog asistenta koji je prilagođen pravnom sistemu Crne Gore.",
            "Platforma je dostupna na {link} i u beta je fazi sa prvim korisnicima.",
            "Legantis sadrži opsežnu bazu crnogorskog zakonodavstva i sudske prakse, redovno ažuriranu.",
            "Legantis advokatima omogućava generisanje dokumenata prema crnogorskom pravu, predviđanje ishoda spora, pravno istraživanje i upravljanje predmetima — sve na jednom mjestu.",
        ],
        "mjeseci": "1 mjesec",
        "mejl2": [
            "kratko se nadovezujem na prethodni mejl.",
            "Jedan konkretan primjer: ukucate \"otkazni rok\" i za par sekundi dobijete relevantne članove zakona i sudske presude — bez sati pretraživanja.",
            "Ako Vam odgovara, rado ću izdvojiti 15 minuta za kratak poziv i pokazati Vam platformu uživo.",
        ],
        "mejl3": _MEJL3_BHS,
        "cta_label": "Posjetite legantis.app",
    },
    "slovenija": {
        "subject": "Legantis — AI pravni pomočnik za slovenske odvetnike",
        "paragraphs": [
            "pišem vam kot ustanovitelj Legantisa — AI pravnega pomočnika, razvitega posebej za odvetnike, ki delajo po slovenskem pravnem sistemu.",
            "Platforma je dostopna na {link} in je trenutno v beta fazi.",
            "Legantis vsebuje obsežno bazo slovenskega zakonodajstva in sodne prakse, redno posodobljeno.",
            "Legantis omogoča generiranje pravnih dokumentov, napovedovanje izidov sporov na podlagi dejanskih sodnih odločb, pravno raziskovanje ter upravljanje zadev in računov.",
        ],
        "mjeseci": "1 mesec",
        "mejl2": [
            "na kratko se navezujem na prejšnje sporočilo.",
            "Konkreten primer: vtipkate \"odpovedni rok\" in v nekaj sekundah dobite relevantne člene zakonov in sodne odločbe — brez ur iskanja.",
            "Če vam ustreza, z veseljem namenim 15 minut za kratek klic in prikaz platforme v živo.",
        ],
        "mejl3": _MEJL3_SLOVENIJA,
        "cta_label": "Obiščite legantis.app",
    },
}


# ─────────────────────────────────────────────
# CSV / BATCH
# ─────────────────────────────────────────────

def load_master():
    """Read-only. Ne migrira i ne otvara CSV za pisanje.
    Ako `rod` fali u headeru, prekida se — kolona se dodaje samo jednokratnom migracijom.
    """
    if not os.path.exists(MASTER_CSV):
        print(f"GREŠKA: {MASTER_CSV} ne postoji.")
        sys.exit(1)
    with open(MASTER_CSV, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames or [])
        if "rod" not in fieldnames:
            print("GREŠKA: U master CSV-u nema kolone 'rod'.")
            print("Dry run ne migrira fajl. Prekidam.")
            sys.exit(1)
        rows = list(reader)
    for row in rows:
        for fn in FIELDNAMES:
            row.setdefault(fn, "")
    return rows


def save_master(rows):
    """Piše master CSV. Zove se samo iz --send petlje."""
    with open(MASTER_CSV, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def parse_sent_dt(value):
    value = (value or "").strip()
    if not value:
        return None
    for fmt in ("%Y-%m-%d %H:%M", "%Y-%m-%d"):
        try:
            return datetime.strptime(value, fmt)
        except ValueError:
            continue
    return None


def is_older_than(date_str, days):
    dt = parse_sent_dt(date_str)
    if dt is None:
        return False
    return datetime.now() - dt >= timedelta(days=days)


def classify_touch(row):
    """Vraća 'mejl1' | 'mejl2' | 'mejl3' | None za trenutni red."""
    status = (row.get("status") or "").strip().lower()
    if status in ("mejl3", "odgovorio", "greska"):
        return None
    if status == "novo" or status == "":
        return "mejl1"
    if status == "mejl1" and is_older_than(row.get("mejl1_datum"), MEJL1_WAIT_DAYS):
        return "mejl2"
    if status == "mejl2" and is_older_than(row.get("mejl2_datum"), MEJL2_WAIT_DAYS):
        return "mejl3"
    return None


def build_batch(rows, config):
    """
    Follow-upi (mejl2/mejl3) imaju prioritet nad novim kontaktima.
    Novi kontakti popunjavaju ostatak kvote po jurisdiction_priority/limits.
    Ukupni dnevni limit važi za SVE pošiljke zajedno.
    """
    total_limit = config["total_daily_limit"]
    per_jur_limits = config["jurisdiction_daily_limits"]
    priority = config["jurisdiction_priority"]

    followups = []
    new_by_jur = {}

    for row in rows:
        touch = classify_touch(row)
        if touch is None:
            continue
        if touch in ("mejl2", "mejl3"):
            followups.append((row, touch))
        else:
            jur = row.get("jurisdikcija", "")
            new_by_jur.setdefault(jur, []).append((row, touch))

    batch = []
    remaining = total_limit

    # 1) Warm follow-ups first
    for item in followups:
        if remaining <= 0:
            break
        batch.append(item)
        remaining -= 1

    # 2) Fill with new contacts by jurisdiction priority/limits
    jurisdictions_in_order = list(priority)
    for jur in new_by_jur:
        if jur not in jurisdictions_in_order:
            jurisdictions_in_order.append(jur)

    for jur in jurisdictions_in_order:
        if remaining <= 0:
            break
        candidates = new_by_jur.get(jur, [])
        if not candidates:
            continue
        jur_limit = per_jur_limits.get(jur, 0)
        take = min(jur_limit, len(candidates), remaining)
        if take > 0:
            batch.extend(candidates[:take])
            remaining -= take

    return batch


def status_breakdown(rows):
    return Counter((r.get("status") or "novo").strip().lower() or "novo" for r in rows)


# ─────────────────────────────────────────────
# SEND
# ─────────────────────────────────────────────

def fill_paragraphs(paragraphs, jurisdikcija, content):
    link = _link_legantis(jurisdikcija, content)
    return [p.format(link=link) for p in paragraphs]


def build_plain_text(rod, prezime, paragraphs, jurisdikcija, touch, mjeseci=None):
    touch_num = int(str(touch).replace("mejl", ""))
    touch_name = touch if str(touch).startswith("mejl") else f"mejl{touch}"
    vodic = utm_url(VODIC_URL, jurisdikcija, touch_name)
    cta = utm_url(SITE_URL, jurisdikcija, "cta" if touch_num == 1 else touch_name)
    body = (
        f"{greeting(rod, prezime, jurisdikcija, touch_name)}\n\n"
        + "\n\n".join(strip_html(p) for p in paragraphs)
    )
    if touch_num == 1 and mjeseci:
        body += (
            f"\n\nTrenutno nudimo ograničenom broju advokatskih kancelarija "
            f"besplatan Firm paket na {mjeseci}, bez obaveze."
        )
        body += f"\n\nPosjetite: {cta}"
        body += f"\n\nKompletan vodič za korisnike — sve funkcije platforme:\n{vodic}"
    else:
        body += f"\n\n{cta}"
    body += "\n\nS poštovanjem,\nNemanja Lukić\nLegantis | legantis.app\nsupport@legantis.app"
    return body


def mejl3_subject(jurisdikcija, template):
    if jurisdikcija in _MEJL3_SUBJECT_SR:
        return _MEJL3_SUBJECT_SR[jurisdikcija]
    return f"Re: {template['subject']}"


def build_mejl3_text(rod, prezime, jurisdikcija, body):
    salutation = greeting(rod, prezime, jurisdikcija, "mejl3")
    return f"{salutation}\n\n{body.strip(chr(10))}\n"


def render_outgoing(row, touch):
    """Vraća (subject, plain, html|None). html je None za mejl3."""
    jurisdikcija = row.get("jurisdikcija", "")
    template = EMAIL_TEMPLATES.get(jurisdikcija)
    if template is None:
        return None
    rod = row.get("rod", "")
    prezime = row.get("prezime", "")
    if touch == "mejl1":
        paragraphs = fill_paragraphs(template["paragraphs"], jurisdikcija, "cta")
        plain = build_plain_text(
            rod, prezime, paragraphs, jurisdikcija, "mejl1", template["mjeseci"]
        )
        html = build_html_mejl1(
            rod, prezime, paragraphs, template["mjeseci"], jurisdikcija
        )
        return template["subject"], plain, html
    if touch == "mejl3":
        plain = build_mejl3_text(rod, prezime, jurisdikcija, template["mejl3"])
        return mejl3_subject(jurisdikcija, template), plain, None
    paragraphs = template.get(touch, [])
    plain = build_plain_text(rod, prezime, paragraphs, jurisdikcija, touch)
    html = build_html_followup(
        rod, prezime, paragraphs, jurisdikcija, int(touch[-1]),
        cta_label=template.get("cta_label", "Posjetite legantis.app"),
    )
    return f"Re: {template['subject']}", plain, html


def send_email(smtp_conn, gmail_address, row, touch):
    jurisdikcija = row.get("jurisdikcija", "")
    rendered = render_outgoing(row, touch)
    if rendered is None:
        print(f"  UPOZORENJE: nema template za jurisdikciju '{jurisdikcija}', preskačem.")
        return False, None

    subject, plain_text, html_content = rendered
    to_email = row["email"].strip()
    stored_id = (row.get("message_id") or "").strip()

    if touch == "mejl3":
        msg = MIMEText(plain_text, "plain", "utf-8")
        msg["From"] = gmail_address
        msg["To"] = to_email
        msg["Subject"] = subject
        if stored_id:
            msg["In-Reply-To"] = stored_id
            msg["References"] = stored_id
        smtp_conn.sendmail(gmail_address, to_email, msg.as_string())
        return True, stored_id or None

    msg = MIMEMultipart("alternative")
    msg["From"] = gmail_address
    msg["To"] = to_email
    msg["Subject"] = subject
    message_id = None
    if touch == "mejl1":
        message_id = make_msgid(domain="legantis.app")
        msg["Message-ID"] = message_id
    elif stored_id:
        msg["In-Reply-To"] = stored_id
        msg["References"] = stored_id
        message_id = stored_id
    msg.attach(MIMEText(plain_text, "plain", "utf-8"))
    msg.attach(MIMEText(html_content, "html", "utf-8"))
    smtp_conn.sendmail(gmail_address, to_email, msg.as_string())
    return True, message_id


def mark_sent(row, touch, message_id):
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    row["status"] = touch
    row[f"{touch}_datum"] = now
    row["poslano"] = "da"
    row["datum_slanja"] = now
    if touch == "mejl1" and message_id:
        row["message_id"] = message_id


def _row_line(row, extra=""):
    email = (row.get("email") or "").strip()
    jur = row.get("jurisdikcija", "")
    prezime = (row.get("prezime") or "").strip()
    line = f"   {email} | {jur} | {prezime}"
    if extra:
        line += f" | {extra}"
    return line


def print_pre_send_summary(rows, batch, config, unknown_rod, excluded):
    status_counts = status_breakdown(rows)
    touch_by_jur = Counter()
    for row, touch in batch:
        jur = row.get("jurisdikcija", "?")
        touch_by_jur[(jur, touch)] += 1

    print("─" * 56)
    print("STATUS master CSV-a:")
    for key in ("novo", "mejl1", "mejl2", "mejl3", "odgovorio", "greska"):
        print(f"   {key}: {status_counts.get(key, 0)}")
    other = sum(v for k, v in status_counts.items() if k not in (
        "novo", "mejl1", "mejl2", "mejl3", "odgovorio", "greska"
    ))
    if other:
        print(f"   ostalo: {other}")

    print(f"\npreskočeno — nepoznat rod: {len(unknown_rod)}")
    for row in unknown_rod:
        print(_row_line(row))

    print(f"\npreskočeno — korisnik/kontakt: {len(excluded)}")
    for row, reason in excluded:
        print(_row_line(row, reason))

    print(f"\nŠaljem danas: {len(batch)} (ukupni dnevni limit: {config['total_daily_limit']})")
    print("Raspodjela po touch tipu / jurisdikciji:")
    if not batch:
        print("   (prazno)")
    else:
        juris = sorted({j for j, _ in touch_by_jur})
        for jur in juris:
            parts = []
            for touch in ("mejl1", "mejl2", "mejl3"):
                n = touch_by_jur.get((jur, touch), 0)
                if n:
                    label = "novo" if touch == "mejl1" else touch
                    parts.append(f"{label}={n}")
            jur_limit = config["jurisdiction_daily_limits"].get(jur, 0)
            print(f"   {jur}: {', '.join(parts)}  (dnevni limit novih: {jur_limit})")

    by_touch = Counter(t for _, t in batch)
    print(
        f"\nUkupno u batchu: novo/mejl1={by_touch.get('mejl1', 0)}, "
        f"mejl2={by_touch.get('mejl2', 0)}, mejl3={by_touch.get('mejl3', 0)}"
    )
    est_minutes = len(batch) * config["delay_between_emails_seconds"] // 60
    print(f"Procijenjeno trajanje: ~{est_minutes} min")
    print("─" * 56)


def print_dry_run_previews(batch):
    print("\nUzorci (prva 3 po touch-u, plain text):")
    shown = Counter()
    any_shown = False
    for row, touch in batch:
        if shown[touch] >= 3:
            continue
        rendered = render_outgoing(row, touch)
        if rendered is None:
            continue
        shown[touch] += 1
        any_shown = True
        subject, plain, _html = rendered
        email = (row.get("email") or "").strip()
        print("─" * 56)
        print(f"{touch} → {email}")
        print(f"Subject: {subject}")
        print(plain)
    if not any_shown:
        print("   (nema — batch je prazan)")


def _matches_exclude_file(email, exact, domains):
    key = (email or "").strip().lower()
    if not key:
        return False
    if key in exact:
        return True
    at = key.rfind("@")
    return at >= 0 and key[at:] in domains


def load_exclude_file(path=None):
    path = path or EXCLUDE_FILE
    if not os.path.exists(path):
        print(f"GREŠKA: {path} ne postoji. Prekidam.")
        sys.exit(1)
    exact = set()
    domains = set()
    with open(path, encoding="utf-8") as f:
        for line in f:
            raw = line.strip()
            if not raw or raw.startswith("#"):
                continue
            if "#" in raw:
                raw = raw.split("#", 1)[0].strip()
            if not raw:
                continue
            key = raw.lower()
            if key.startswith("@"):
                domains.add(key)
            else:
                exact.add(key)
    return exact, domains


def is_excluded(email, exact, domains):
    return _matches_exclude_file(email, exact, domains)


def _safe_db_error(exc):
    text = str(exc)
    return re.sub(r"postgres(?:ql)?://\S+", "[redacted]", text, flags=re.I)


def load_auth_emails():
    """Sve adrese iz auth.users. Ako baza nije dostupna, prekida run."""
    _load_env()
    from welcome_sequence import connect_db, load_database_url

    database_url = load_database_url()
    try:
        conn = connect_db(database_url)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT email FROM auth.users "
                    "WHERE email IS NOT NULL AND btrim(email) <> ''"
                )
                fetched = cur.fetchall()
        finally:
            conn.close()
    except SystemExit:
        raise
    except Exception as exc:
        print("GREŠKA: Baza nije dostupna. Hladni mejlovi se ne šalju bez liste korisnika iz auth.users.")
        print(f"{type(exc).__name__}: {_safe_db_error(exc)}")
        print("Prekidam.")
        sys.exit(1)

    emails = set()
    for row in fetched:
        value = row.get("email") if isinstance(row, dict) else row[0]
        key = (value or "").strip().lower()
        if key:
            emails.add(key)
    return emails


def partition_rows(rows, file_exact, file_domains, user_emails):
    unknown = []
    excluded = []
    eligible = []
    for row in rows:
        email = row.get("email") or ""
        bad_rod = row_unknown_rod(row)
        in_file = _matches_exclude_file(email, file_exact, file_domains)
        key = email.strip().lower()
        in_users = key in user_emails
        if bad_rod:
            unknown.append(row)
        if in_file or in_users:
            if in_file and in_users:
                reason = "fajl+auth.users"
            elif in_file:
                reason = "fajl"
            else:
                reason = "auth.users"
            excluded.append((row, reason))
        if bad_rod or in_file or in_users:
            continue
        eligible.append(row)
    return eligible, unknown, excluded


def _configure_stdout():
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass


def parse_args():
    parser = argparse.ArgumentParser(description="Legantis cold outreach")
    parser.add_argument(
        "--send",
        action="store_true",
        help="stvarno pošalji (bez ovoga: samo ispis, CSV se ne mijenja)",
    )
    return parser.parse_args()


def main():
    _configure_stdout()
    args = parse_args()
    do_send = bool(args.send)
    print("mode: SEND" if do_send else "mode: DRY-RUN (pošalji sa --send)")

    _load_env()
    file_exact, file_domains = load_exclude_file()
    user_emails = load_auth_emails()

    config = load_config()
    rows = load_master()
    eligible, unknown_rod, excluded = partition_rows(
        rows, file_exact, file_domains, user_emails
    )
    batch = build_batch(eligible, config)
    print_pre_send_summary(rows, batch, config, unknown_rod, excluded)

    if not do_send:
        print_dry_run_previews(batch)
        print("\nPoslano: 0. CSV nije mijenjan.")
        return

    if not batch:
        print("Nema ništa za slanje danas.")
        return

    gmail_address, gmail_password = load_credentials()
    confirm = input("Nastaviti sa slanjem? (da/ne): ").strip().lower()
    if confirm != "da":
        print("Otkazano.")
        return

    import smtplib
    import ssl

    context = ssl.create_default_context()
    sent_count = 0
    failed_count = 0

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls(context=context)
        server.login(gmail_address, gmail_password)

        for row, touch in batch:
            email = row["email"].strip()
            jurisdikcija = row.get("jurisdikcija", "")

            try:
                ok, message_id = send_email(server, gmail_address, row, touch)
                if ok:
                    mark_sent(row, touch, message_id)
                    sent_count += 1
                    print(f"  [{sent_count}/{len(batch)}] Poslano {touch} ({jurisdikcija}): {email}")
                else:
                    row["status"] = "greska"
                    row["poslano"] = "greska_template"
                    failed_count += 1
            except Exception as e:
                row["status"] = "greska"
                row["poslano"] = "greska"
                row["datum_slanja"] = str(e)[:80]
                failed_count += 1
                print(f"  GREŠKA za {email}: {e}")

            save_master(rows)
            time.sleep(config["delay_between_emails_seconds"])

    print(f"\nGotovo. Poslano: {sent_count}, Greške: {failed_count}")
    print(f"Master CSV ažuriran: {MASTER_CSV}")
    print("Za odgovore: python mark_reply.py email@primjer.com")


if __name__ == "__main__":
    main()
