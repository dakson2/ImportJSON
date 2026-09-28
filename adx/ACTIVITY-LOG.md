# ACTIVITY LOG — 1.ADX-Jobs

Zajednički dnevnik za Claude i Codex. Pravila rada su u [`UPUTE.md`](UPUTE.md); način pisanja u ovaj log opisan je u §3.

- **Na početku rada:** `git pull` grane `claude/dario-adaxa-project-9u32ik`, zatim pročitaj **Otvoreno** i vrh **Dnevnika**.
- **Nalozi za tablicu:** svi upisi u Work idu kroz nalog `W-###`. Najviše jedan nalog smije biti `PENDING`.
  - Codex postavlja `IN PROGRESS`, izvršava nalog, pa postavlja `APPLIED` i dodaje izvještaj.
  - Nakon toga briše payload i premješta nalog u Dnevnik.
- **Dnevnik:** najnovije je gore, datumi su `dd/mm/yyyy`.

---

## Otvoreno

### Nalozi za tablicu

Nema otvorenih naloga.

### Odluke koje čekaju Darija

1. **Front A, crawl 28/09.** Ni jedna nova rola ne prolazi sve filtere. Dvije slabije opcije imaju datume samo s LinkedIna, a ATS poslodavca nije pronađen:
   - **(1) Neon Growth** — Director, DTC Performance Marketing (fully remote agencija, Meta + Google);
   - **(2) 42DM** — Senior B2B Marketing Manager (fully remote B2B agencija).

   Paket se radi samo za broj koji Dario izabere.
2. **Adaxa:** koje leadove prvo kontaktirati. Prijedlog je Hrvatska Lutrija (L-0005) i Falkensteiner (L-0001) odmah, a Zračna luka Osijek (L-0009) u listopadu–studenom.
3. **Foxelli (L-0002):** isplati li se honorar za zamjenu na 4 mjeseca. Ako da, prijava ide kao ugovorni suradnik preko Adaxe.

### Follow-up raspored

| Oko | Prijave |
|---|---|
| **01/10/2026** | Thyssen Ads (poslano 16/09); Brand Bolt, OnTheGoSystems, Powered by Search, Aimers, Adcubator, LAYER (17/09) |
| **08/10/2026** | Infobip, RNK Health (Toogeza), SimpleTiger (24/09); SolCrov (datum slanja nije zabilježen) |
| **09/10/2026** | Social Discovery Group, ennovationHUB, Taxes for Expats, Genesis, OnHires (25/09) |
| **12/10/2026** | Puffy (28/09). Do tada pratiti mail s pozivom na online skills test (provjeri i spam; test ima timer od 4 h neaktivnosti). |

Ako Taxes for Expats pozove na razgovor, treba pripremiti Google Ads audit i demo AI workflowa.

### Adaxa — sljedeći koraci

| Kada | Što | ID |
|---|---|---|
| čim Dario odluči | **Hrvatska Lutrija:** pitati je li podrška za Google Ads iz 2026. još planirana. Stavka je u Q2 i nije ugovorena; zadnji izvođač je Risely digital (€6.000). | L-0005 · PB-0002 |
| čim Dario odluči | **Falkensteiner:** pronaći marketing leada za Hrvatsku na LinkedInu i poslati kratku poruku o Google Hotel Ads / metasearchu. Imaju otvoren oglas za metasearch & affiliate specijalista u Zadru. | L-0001 |
| prije 19/10 | **HP – Hrvatska pošta:** oglašavanje uključujući internet, oko €1M, rok 19/10 (TED 664429-2026). Adaxa može ući samo kao digitalni partner medijske agencije. | L-0003 |
| 15/10 | **EOJN pregled** (`eojn_monitor.py new --since 2026-09-28`) i praćenje natječaja **Ministarstva rada** nakon savjetovanja (€379.200) | PB-0055 |
| 15/10 | **HNK Split, Lječilište Topusko, HINA, Medicinski fakultet Osijek:** pitati kako kupuju stavke iz 2026. | L-0006 · L-0007 · L-0012 · L-0013 |
| listopad–studeni | **Zračna luka Osijek:** ugovor s KRYPTON WEB SOLUTIONS (€6.000) ističe 31/01/2027.<br>Do €15.000 ZLO pita izravno pa kontakt mora prethoditi kupnji.<br>Ponuditi kratki audit: 7 slikovnih oglasa od 03/02/2026, bez search oglasa. | L-0009 · PB-0001 |
| studeni–prosinac | **Narodne novine** (ARBONA, €16.800, Google Ads + SEO), **Grad Dubrovnik** (Dubrovnik Pass), **NP Plitvička jezera**: javiti se prije objave planova za 2027. | L-0008 · L-0014 · L-0010 |
| svaki crawl dan | `python3 adx/tools/eojn_monitor.py new --since <zadnja provjera>` | — |

### Aktivne prijave — pravilo jedne prijave po tvrtki

Popis vrijedi nakon što se izvrši W-001. Izvor istine je kartica APPLIED.

**Aktivne (17):**
- 16–17/09: Thyssen Ads, Brand Bolt, OnTheGoSystems, Powered by Search, Aimers, Adcubator, LAYER.
- 24/09: Infobip, RNK Health (Toogeza), SimpleTiger, SolCrov.
- 25/09: Social Discovery Group, ennovationHUB, Taxes for Expats, Genesis, OnHires (klijent).
- 28/09: Puffy.

Za ove tvrtke ne predlaže se druga rola.

**Ne predlagati ponovo (Darijeve odluke i pravila):**
- **VOID 28/09:** Pragmatike (CMO), Ruby Labs (Performance Marketing Lead, Google & Microsoft Ads), Easyship (Head of Marketing), Appsilon (Head of Marketing).
- **Skip 25/09:**
  - LottieFiles (Head of Growth);
  - Ruby Labs (Growth Marketing Lead);
  - Base360.ai (Founding Growth Marketer);
  - SimpleStudy (Head of Paid Ads; njihova tržišta su UK, IE, BR, ZA i AU).
- **Integritet:** Fortis Media (cloaking).
- **Ostalo:**
  - Egear i UTTR Director (17/09, trajno);
  - Easygenerator (72 dana, 20/09);
  - TestGorilla (pauzirano).
- **Odbijene:**
  - UTTR (24/09);
  - Amplemarket (25/09);
  - ScraperAPI / saas.group (28/09);
  - Ruby Labs Google Ads Manager (04/08).

---

## Dnevnik

### 28/09/2026 · Codex · W-001 · `APPLIED · 2026-09-28T02:18:29.707Z` — Nadoknada 25/09–28/09
- Tablica: [Work](https://docs.google.com/spreadsheets/d/15Do6cDJLu4CeBDsfnOpVzV1ZuO09pzHvNMsL54m7jt4/edit), W-001 APPLIED. Izvršeno prema `UPUTE.md` §10 R1–R9.
- 0. WORK QUEUE A1: 'ovo sve ' → 'Queue ID'.
- 1. Found positions: dodano r187–r190 (LottieFiles, Ruby Labs, Base360.ai (The Flex), Pragmatike (for an AI cloud infrastructure startup)); preskočeno 0 duplikata.
- 2. Found positions: Ruby Labs r153 Priority; asyship: nema reda; Appsilon: nema reda.
- 3. APPLIED: dodano r37–r43 (Social Discovery Group, ennovationHUB, Ruby Labs, Taxes for Expats, Genesis, OnHires client, Puffy); preskočeno 0 duplikata.
- 4. APPLIED: STATUS i Actions promijenjeni u Amplemarket r34, ScraperAPI (saas.group) r35, Lead Ember r9, Jordan Digital Marketing r17, Sporty Group r19, ALM Corp r20, Qdrant r21, StubGroup r22; bez preskakanja.
- 5. ADAXA LEADS: upisano r2–r15, L-0001…L-0014; 0 duplikata. Postojeća validacija Priority/Status ne dopušta doslovne vrijednosti payloada (A/B/C/D, New), pa ćelije mogu biti označene nevaljanima; vrijednosti i pravila validacije nisu promijenjeni izvan naloga.
- 6. ADAXA JAVNA NABAVA: stvorena kartica, A1:Y1 (25 stupaca) podebljano i zamrznuto; dodano r2–r56, PB-0001…PB-0055; 0 duplikata.
- 7. DAILY CONTROL: dodano r7–r9 (25/09/2026, 26/09/2026, 28/09/2026); preskočeno ništa.
- 8. ACTIVITY LOG: dodano r29–r47, 19 ID-jeva, Date/time = 2026-09-28T02:17:17.467Z UTC; 0 duplikata. Postojeća validacija Activity type ne uključuje sve doslovne vrijednosti payloada.
- 9. WORK QUEUE: Q-20260911-DARIO r2, Last updated = 2026-09-28T02:17:31.670Z UTC; Next action i Notes promijenjeni po nalogu.
- 10. Nalog premješten iz Otvoreno u Dnevnik, payload uklonjen iz aktualne verzije loga (ostaje u git povijesti); commit na istoj grani.

### 28/09/2026 · Claude · Dva dokumenta umjesto dvadesetak
- Na Darijev zahtjev projekt sada ima samo `adx/UPUTE.md` (upute) i ovaj log.
- Obrisano iz `adx/`:
  - 12 `.md` dokumenata (CODEX-PROMPT ×6, STATUS, HANDOFF, README, SUPERSEDED, crawl workflow i audit);
  - 3 paketa pisama;
  - 25 ops/payload datoteka (JSON/TSV);
  - 2 merge datoteke;
  - `ADX_Bridge.gs` (nikad instaliran).

  Ukupno 43 datoteke.

  Sve ostaje u git povijesti (commit `010f96a`).
- Četiri neizvršena naloga spojena su u **W-001**. Pragmatike se u Found positions upisuje odmah kao VOID. Reference na obrisane datoteke zamijenjene su s `adx/UPUTE.md` i `adx/ACTIVITY-LOG.md`.
- EOJN monitor premješten je u `adx/tools/`, a njegovi podaci u `adx/data/`.
- Tablica: W-001 (`PENDING`).

### 28/09/2026 · Claude · Adaxa: EOJN, TED i oglasi
- `eojn_monitor.py new --since 26/09`: nema novih relevantnih ugovora ni promjena u planovima. Otvoreni postupci su CERP (rok 05/10) i HP (rok 19/10; na TED-u 28/09).
- Novo je prethodno savjetovanje Ministarstva rada za komunikacijsku kampanju od €379.200 (PB-0055, C).
- TED u EU nudi samo ugovore na lokalnim jezicima.
- Falkensteiner je još otvoren; novih ADAXA LEADS nema.
- Tablica: W-001 (`CLAUDE-20260928-ADAXA`, PB-0055).

### 28/09/2026 · Claude · Crawl 28/09 (prva objava od 14/09)
- Pretraženo:
  - 808 ATS boardova (36.837 oglasa);
  - Himalayas HR (516);
  - Remote Rocketship (649);
  - 64 Workday tenanta;
  - Workable, mali prolaz (533);
  - LinkedIn: 18 ključnih riječi × 4 lokacije (2.326 rola).
- Ni jedna nova rola ne prolazi sve filtere. Najčešći razlozi:
  - srednja razina;
  - njemački jezik;
  - samo social/app kanali;
  - vezanost uz jednu zemlju.
- Za odluku su ostala dva slabija kandidata: Neon Growth i 42DM.
- Tablica: W-001 (`CLAUDE-20260928-CRAWL`).

### 28/09/2026 · Dario · Puffy poslan, četiri VOID-a, odbijenica saas.groupa
- Puffy (Senior Director, Performance Marketing) poslan je 28/09. Iznimku je Dario odobrio 26/09; oglas je prvi put objavljen 03/08.
- VOID: Pragmatike, Ruby Labs Performance Marketing Lead, Easyship i Appsilon. Pisma su bila spremna, ali nisu poslana.
- ScraperAPI (saas.group), Growth Marketing Specialist: odbijeno 28/09.
- Tablica: W-001.

### 26/09/2026 · Claude · Adaxa: EOJN monitor i kartica ADAXA JAVNA NABAVA
- Pregledan je registar ugovora od 01/01/2024: 5.147 ugovora, od toga 679 relevantnih, raspoređenih na 54 naručitelja (2 A, 28 B, 24 C).
- Google Ads kupuju:
  - Zračna luka Osijek;
  - Narodne novine;
  - HNK Split;
  - HP;
  - HINA;
  - Hrvatska Lutrija.
- Siječanj je najčešći mjesec potpisa, pa kontakt ide u listopadu–prosincu.
- Zračna luka Osijek detaljno:
  - ugovor ističe 31/01/2027;
  - nova pravila nabave vrijede od 01/09/2026, s pragovima €15.000 i €25.000;
  - Ads Transparency pokazuje samo slikovne oglase.
- Dario je tražio da se ovo redovito prati u posebnom dijelu Worka. To je kartica ADAXA JAVNA NABAVA.
- Tablica: W-001.

### 26/09/2026 · Claude · Crawl 26/09 i novi izvori (LinkedIn, EOJN, TED)
- Ni jedna nova rola ne prolazi.
- Puffy je stariji oglas, ali mu je Dario odobrio iznimku.
- Infobip Senior Digital Advertising Specialist predložen je iako je prijava za Infobip već bila aktivna. Iz toga je nastalo pravilo **jedne aktivne prijave po tvrtki**.
- Dodano je 14 Adaxa leadova (L-0001…L-0014). Kategoriju A imaju Hrvatska Lutrija i Zračna luka Osijek.
- Šest lipanjskih prijava zatvoreno je kao `NO REPLY - CLOSE` (odluka od 25/09).
- Tablica: W-001.

### 25/09/2026 · Dario / Claude · Pet prijava, Amplemarket odbijen
- Poslano:
  - Social Discovery Group, Lead PPC Specialist (iznimka; prva objava 27/07);
  - ennovationHUB, Senior Google Ads Specialist;
  - Taxes for Expats (iznimka);
  - Genesis (iznimka);
  - OnHires (iznimka).
- Preskočeno: LottieFiles, Ruby Labs Growth Marketing Lead, Base360.ai i SimpleStudy.
- Na Driveu je pronađena srpanjska prijava za Ruby Labs Google Ads Manager, odbijena 04/08 nakon razgovora s recruiterom.
- Amplemarket je odbio prijavu.
- Crawl:
  - 46.548 datiranih oglasa iz 652 izvora, a u večernjem prolazu 50.235;
  - novi izvori su Teamtailor RSS, Personio XML, Breezy, BambooHR, slug mining i Himalayas s filtrom zemlje.
- Tablica: W-001.

### 24/09/2026 · Claude / Codex · Prijave 24/09, dvije ispravke
- Poslano:
  - Infobip;
  - RNK Health (Toogeza);
  - SimpleTiger;
  - Amplemarket;
  - ScraperAPI (saas.group);
  - SolCrov (datum nije zabilježen).
- UTTR je odbio prijavu 24/09.
- Dvije ranije tvrdnje su ispravljene:
  - Hilo by Aktiia nije bio živ, datum je bio s agregatora;
  - Fortis Media pada na integritetu (cloaking).
- Codex je upisao 24/09 u tablicu. To je zadnji izvršeni nalog prije W-001.

### 20/09/2026 · Claude / Codex · Crawl v2 i nova pravila
- Nova pravila:
  - starost do 14 dana (Easygenerator je void zbog 72 dana);
  - hibrid samo u Hrvatskoj, a u ostatku EU samo uz dolazak jednom u 6–12 mjeseci;
  - integritet;
  - vjerodostojnost poslodavca provjerava AI.
- Novi izvori su izravni ATS-ovi i Workable global API.
- Codex (CODEX-0920) uskladio je Work i Base: APPLIED r23–30 te 481 tag u Base/All.

### 16–17/09/2026 · Dario · Prve prijave
- 16/09: Thyssen Ads.
- 17/09: Brand Bolt, OnTheGoSystems, Powered by Search, Aimers, Adcubator, LAYER i UTTR (Part-Time).
- Egear i UTTR Director trajno su odbačeni.

### 11–15/09/2026 · Claude · Početak projekta
- Kvalificirano je 13 prospekata (Found positions r170–182) i pripremljeni su paketi za OnTheGoSystems i Brand Bolt.
- Audit izvora pokazao je da dva boarda daju 59 % nalaza.
- Pripremljeno je spajanje Base ALL2 → All, koje je Codex izvršio 20/09.
- Postavljena su stalna pravila:
  - oznaka `1.2.ADX-JOB`;
  - TestGorilla je pauziran;
  - kandidati se biraju po broju;
  - bez Google Clouda.
