# CURSOR PROMPT — Legantis Outreach sistem (sve jurisdikcije)

Kopiraj sve ispod ove linije i zalijepi u Cursor (Plan Mode prvo, kao i obično).

---

## ZADATAK

Postaviti kompletan outreach sistem za slanje marketinških mejlova
advokatima u 8 jurisdikcija (BiH RS, BiH FBiH, BiH Brčko, Srbija Beograd,
Srbija Vojvodina, Crna Gora, Hrvatska, Slovenija). Sistem se sastoji od:

1. Foldera `scripts/outreach/` sa svim Python skriptama
2. Scraper skripti (po jedna za svaki izvor) koje izvlače ime/prezime/grad/
   email advokata iz javnih imenika advokatskih komora i pune ZAJEDNIČKI
   master CSV fajl
3. Jedne sender skripte koja čita master CSV i šalje personalizovane
   mejlove preko Gmail SMTP-a, poštujući dnevne limite (i po jurisdikciji
   i ukupno) definisane u JSON config fajlu

Ovo su SAMOSTALNE skripte koje NE diraju Next.js aplikaciju, Supabase bazu,
niti bilo koji postojeći kod platforme — rade potpuno nezavisno, lokalno,
preko Python-a. Ne treba im build/deploy proces.

## KORACI

### 1. Kreiraj folder strukturu

```
scripts/outreach/
├── outreach_common.py
├── scrape_bih_rs.py
├── scrape_bih_fbih.py
├── scrape_bih_brcko.py
├── scrape_srbija_beograd.py
├── scrape_srbija_vojvodina.py
├── scrape_crna_gora.py
├── scrape_hrvatska.py
├── scrape_hrvatska_zig.py
├── scrape_slovenija.py
├── send_outreach.py
└── README.md
```

### 2. Kopiraj sadržaj svake skripte

Korisnik će ti dati gotove fajlove (kreirao ih je Claude u chatu, dostupni
su za download). Tvoj zadatak je da ih SAMO kopiraš u `scripts/outreach/`
bez izmjena — ovo nije kod za review/refaktorisanje, to su samostalne
utility skripte van glavne aplikacije.

Ako korisnik zalijepi sadržaj fajlova direktno u chat umjesto da ih
uploaduje, kreiraj svaki fajl tačno sa tim sadržajem.

### 3. Instaliraj Python zavisnosti

Provjeri da li je Python 3 dostupan, zatim instaliraj:

```bash
pip install requests beautifulsoup4 lxml python-docx
```

(Koristi virtualenv ako je to već praksa u projektu; ako ne, obična
globalna instalacija je u redu jer su ovo izolovane skripte van Next.js
aplikacije.)

### 4. Stavi prateće fajlove za Crnu Goru i Hrvatsku

Korisnik treba kopirati u `scripts/outreach/`:
- `SPISAK_ADVOKATSKIH_ORTACKIH_DRUSTAVA.docx`
- `SPISAK_ZAJEDNICKIH_ADVOKATSKIH_KANCELARIJA.docx`
- `zastupnici_zig.csv`

(Ovo su fajlovi koje korisnik već ima na svom računaru.)

### 5. NE pokreći skripte automatski

VAŽNO: ne pokreći `send_outreach.py` niti bilo koji `scrape_*.py` sam od
sebe. Korisnik će ih pokretati ručno, jedan po jedan, jer:
- Sender skripta šalje STVARNE mejlove sa korisnikovog Gmail naloga i
  traži eksplicitnu potvrdu (`da`/`ne`) prije slanja
- Scraper skripte zahtijevaju da korisnik prvo doda svoj Gmail App
  Password u `send_outreach.py` (GMAIL_APP_PASSWORD promenljiva) — ovo
  korisnik radi ručno, lozinka se NIKAD ne piše u kod koji se commit-uje
  u git

Tvoj zadatak je SAMO da postaviš fajlove i instaliraš zavisnosti. Kada
završiš, javi korisniku da je sistem postavljen i da pročita
`scripts/outreach/README.md` za dalje korake (pokretanje scrapera,
podešavanje `outreach_config.json`, pokretanje sender skripte).

### 6. .gitignore

Dodaj u `.gitignore` (ili kreiraj ako ne postoji):

```
scripts/outreach/imenik_advokata_master.csv
scripts/outreach/outreach_config.json
scripts/outreach/*.docx
scripts/outreach/zastupnici_zig.csv
```

Ovo je važno — master CSV sadrži lične podatke (email adrese advokata) i
NE treba da završi u git repozitorijumu/GitHub-u, isto tako config fajl
može sadržavati osjetljive informacije o strategiji slanja. Word/CSV
izvorni fajlovi za Crnu Goru i Hrvatsku su isto lični/preuzeti podaci,
ne pripadaju u git.

## NAPOMENA O WORKFLOW-U

Ovo je jednokratni setup zadatak, ne zahtijeva tvoj uobičajeni
Plan Mode → pregled → Agent Mode ciklus u punom obimu jer ne mijenja
postojeću aplikaciju — ali svakako prikaži plan šta ćeš tačno uraditi
(koje foldere/fajlove kreiraš) prije nego što počneš, kako bi korisnik
mogao potvrditi prije izvršenja.
