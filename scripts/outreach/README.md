# Legantis Outreach v3 — sve jurisdikcije, podesivi dnevni limiti po državi

Sistem sad ima 8 scrapera (jedan po izvoru), svi pune jedan zajednički
master CSV, i sender koji šalje mejlove prema limitima koje TI podešavaš
po jurisdikciji u jednom config fajlu — uz ukupni dnevni maksimum koji
štiti tvoj Gmail nalog.

---

## Struktura fajlova

```
outreach_common.py          — zajedničke funkcije (ne pokreće se direktno)

scrape_bih_rs.py             — Republika Srpska       (advokatskakomora.ba)
scrape_bih_fbih.py           — Federacija BiH          (advokomfbih.ba)
scrape_bih_brcko.py          — Brčko distrikt          (raktz.ba)
scrape_srbija_beograd.py     — Srbija, Beograd         (akbgd.org.rs)
scrape_srbija_vojvodina.py   — Srbija, Vojvodina       (akv.org.rs)
scrape_crna_gora.py          — Crna Gora               (2 Word fajla — vidi ispod)
scrape_hrvatska.py           — Hrvatska                (hok-cba.hr)
scrape_hrvatska_zig.py       — Hrvatska, dopunski izvor (zastupnici_zig.csv)
scrape_slovenija.py          — Slovenija               (odv-zb.si)

send_outreach.py             — šalje mejlove iz master CSV-a

imenik_advokata_master.csv   — generiše se automatski, ovdje se sve skuplja
outreach_config.json         — generiše se automatski pri prvom pokretanju
                                send_outreach.py — OVDJE PODEŠAVAŠ LIMITE
```

---

## KORAK 0 — Instalacija (jednom)

```
pip install requests beautifulsoup4 lxml python-docx
```

(`python-docx` je dodan jer je potreban za Crnu Goru, koja se čita iz
Word fajlova umjesto sa weba.)

---

## KORAK 1 — Gmail App Password

Vidi prethodno uputstvo. Već si uradio ovaj korak.

---

## KORAK 2 — Pripremi fajlove za Crnu Goru i Hrvatsku (dopunski izvor)

Za razliku od ostalih jurisdikcija, ove dvije skripte trebaju lokalne
fajlove (ne samo internet vezu):

- Stavi `SPISAK_ADVOKATSKIH_ORTACKIH_DRUSTAVA.docx` i
  `SPISAK_ZAJEDNICKIH_ADVOKATSKIH_KANCELARIJA.docx` u isti folder kao
  `scrape_crna_gora.py`
- Stavi `zastupnici_zig.csv` u isti folder kao `scrape_hrvatska_zig.py`

(Ovo su isti fajlovi koje si već poslao Claude-u — samo ih kopiraj u
folder gdje su skripte.)

---

## KORAK 3 — Pokreni scrapere

Svaki scraper se pokreće nezavisno, bilo kojim redoslijedom, kad god
nađeš vremena:

```
python scrape_bih_rs.py
python scrape_bih_fbih.py
python scrape_bih_brcko.py
python scrape_srbija_beograd.py
python scrape_srbija_vojvodina.py
python scrape_crna_gora.py
python scrape_hrvatska.py
python scrape_hrvatska_zig.py
python scrape_slovenija.py
```

Svaki put kad pokreneš novi scraper, on samo DODAJE nove kontakte u
`imenik_advokata_master.csv` (automatski preskače email adrese koje su
se već pojavile, čak i iz druge jurisdikcije/izvora).

### Napomena o pouzdanosti pojedinih scrapera

Neki sajtovi (Beograd, Vojvodina, Slovenija, Hrvatska) koriste tabele sa
paginacijom ili AJAX učitavanjem podataka — tačnu tehničku strukturu
nismo mogli stopostotno provjeriti bez direktnog pristupa browseru.
Skripte su napravljene da:

1. Probaju najvjerovatniji pristup prvo
2. Ako ne uspiju, ispišu JASNU poruku šta provjeriti (obično: otvoriti
   F12 → Network → XHR u Chrome-u dok se stranica učitava, i poslati
   Claude-u URL koji se tamo pojavi)

Ako neki scraper ne uspije ili donese manje rezultata nego očekivano
(MAX_RESULTS u svakoj skripti), **to nije razlog za brigu** — pokreni
ostale scrapere normalno, i javi se sa porukom koju je scraper ispisao
kad budeš imao vremena da se vratimo na taj jedan izvor.

**Pregledaj `imenik_advokata_master.csv` u Excelu** s vremena na vrijeme
— možeš obrisati redove koje ne želiš kontaktirati.

---

## KORAK 4 — Podesi outreach_config.json

Prvi put kad pokreneš `send_outreach.py`, automatski će se napraviti
`outreach_config.json` sa OPREZNIM podrazumijevanim vrijednostima:

```json
{
  "total_daily_limit": 35,
  "delay_between_emails_seconds": 8,
  "jurisdiction_daily_limits": {
    "bih_rs": 10,
    "bih_fbih": 10,
    "bih_brcko": 5,
    "srbija_beograd": 0,
    "srbija_vojvodina": 0,
    "crna_gora": 0,
    "hrvatska": 0,
    "slovenija": 0
  },
  "jurisdiction_priority": [
    "bih_rs", "bih_fbih", "bih_brcko",
    "srbija_beograd", "srbija_vojvodina",
    "crna_gora", "hrvatska", "slovenija"
  ]
}
```

**OTVORI OVAJ FAJL I PODESI PRIJE PRVOG SLANJA.** Objašnjenje polja:

- **`total_daily_limit`** — apsolutni maksimum mejlova po pokretanju
  skripte, BEZ OBZIRA na zbir pojedinačnih jurisdikcijskih limita. Ovo
  je sigurnosna kočnica za tvoj Gmail nalog. Preporuka: ne diraj iznad
  40-50.

- **`jurisdiction_daily_limits`** — koliko najviše danas šalješ SVAKOJ
  državi pojedinačno. Možeš npr. staviti `"bih_rs": 0` kad završiš tu
  listu i prebaciti budžet na sljedeću zemlju, ili sve postaviti na
  istu vrijednost ako želiš ravnomjerno slati svima paralelno.

  Primjer: ako želiš trenutno fokus samo na BiH (sve tri jurisdikcije),
  a ostalima ništa dok ne završiš:
  ```json
  "jurisdiction_daily_limits": {
    "bih_rs": 15,
    "bih_fbih": 15,
    "bih_brcko": 5,
    "srbija_beograd": 0,
    "srbija_vojvodina": 0,
    "crna_gora": 0,
    "hrvatska": 0,
    "slovenija": 0
  }
  ```
  (zbir = 35, tačno na `total_daily_limit`)

- **`jurisdiction_priority`** — redoslijed kojim se popunjava dnevni
  batch ako je zbir pojedinačnih limita veći od `total_daily_limit`.
  Jurisdikcije na početku liste dobijaju svoj puni limit prvo; ako
  ponestane ukupnog budžeta, kasnije jurisdikcije u listi dobijaju manje
  (ili ništa) tog dana — i automatski dobijaju ostatak sljedeći put kad
  pokreneš skriptu.

**Mijenjaj ovaj fajl kad god želiš promijeniti strategiju** — ne treba
dirati python kod, samo brojeve u JSON-u.

---

## KORAK 5 — Pokreni sender

Otvori `send_outreach.py` i podesi:

```python
GMAIL_ADDRESS = "nemanjalukic1997@gmail.com"
GMAIL_APP_PASSWORD = "abcdefghijklmnop"   # tvoj App Password, bez razmaka
```

Pokreni:

```
python send_outreach.py
```

Skripta pokazuje:
- Koliko ukupno preostaje za slanje (sve jurisdikcije zajedno)
- Koliko šalje danas, sa raspodjelom po državi i limitom za svaku
- Traži potvrdu (`da` / `ne`) prije slanja

Svaki advokat dobija mejl na svom jeziku/sa svojim brojevima baze —
skripta automatski bira ispravan tekst po koloni `jurisdikcija`.

---

## KORAK 6 — Ponavljaj svaki dan

```
python send_outreach.py
```

Skripta preskače sve već poslane (`poslano = da`) i šalje sljedeću
turu prema trenutnim limitima u `outreach_config.json`. Limite možeš
mijenjati iz dana u dan — npr. kad RS lista padne na 0 preostalih,
slobodno povećaj limit za FBiH ili Srbiju u config fajlu.

---

## NAŠA DOGOVORENA STRATEGIJA (popuni zajedno sa Claude-om)

Ovo polje ostavljamo namjerno prazno za sad — kad pregledamo rezultate
scrapinga (koliko je kontakata realno prikupljeno po jurisdikciji),
zajedno ćemo odlučiti finalne brojeve za `jurisdiction_daily_limits` i
redoslijed u `jurisdiction_priority`, pa ću ažurirati ovaj dio.

---

## VAŽNE NAPOMENE

- **`total_daily_limit` je TVRDA gornja granica** — čak i ako zbir svih
  `jurisdiction_daily_limits` bude veći, skripta nikad neće poslati više
  od `total_daily_limit` mejlova u jednom pokretanju.
- Ne briši `imenik_advokata_master.csv` dok ne završiš kampanju kroz sve
  jurisdikcije — to je tvoja evidencija ko je već kontaktiran.
- Mejlovi se šalju kao **plain text** (bez HTML-a) — manja šansa za spam
  folder kod primaoca.
- Ako neki scraper javi grešku ili manje rezultata nego očekivano, to je
  normalno za prvi pokušaj na nepoznatoj sajt strukturi — javi se sa
  porukom koju je skripta ispisala, pa zajedno popravimo taj jedan izvor.
