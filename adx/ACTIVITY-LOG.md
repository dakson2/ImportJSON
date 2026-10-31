# ACTIVITY LOG — 1.ADX-Jobs

Zajednički dnevnik za Claude i Codex. Pravila rada su u [`UPUTE.md`](UPUTE.md); način pisanja u ovaj log opisan je u §3.

- **Na početku rada:** `git pull` grane `claude/dario-adaxa-project-9u32ik`, zatim pročitaj **Otvoreno** i vrh **Dnevnika**.
- **Nalozi za tablicu:** upisi u Work idu kroz nalog `W-###`. Najviše jedan nalog smije biti `PENDING`. Kad Dario traži izravan upis, Claude piše sam po UPUTE §10 i izvještaj stavlja u Dnevnik (Dario, 31/10/2026).
  - Codex postavlja `IN PROGRESS`, izvršava nalog, pa postavlja `APPLIED` i dodaje izvještaj.
  - Nakon toga briše payload i premješta nalog u Dnevnik.
- **Dnevnik:** najnovije je gore, datumi su `dd/mm/yyyy`.

---

## Otvoreno

### Nalozi za tablicu

#### W-003 · PENDING · Claude · 31/10/2026 — Adaxa koraci preneseni iz W-002
Claude je 31/10 sam izvršio korake W-002 za Front A, na Darijev zahtjev (izvještaj je u Dnevniku 31/10). Koraci za Front B ostaju ovdje, za EOJN chat ili Codex, jer se Adaxa vodi u zasebnom chatu.

Koraci (UPUTE §10, R1–R9):
1. **ADAXA LEADS, r2–r15** (L-0001…L-0014), po `ADAXA_LEADS_normalize` (W-001 je upisao vrijednosti koje validacija ne prihvaća):
   - u `Priority` zamijeni `A` → `A - Primary`, `B` → `B - Secondary`, `C` → `C - Watchlist`, `D` → `D - Skip`;
   - u `Status` zamijeni `New` → `QUALIFIED`.

   Mijenjaju se samo ćelije s točno tim vrijednostima.
2. **ADAXA JAVNA NABAVA:**
   - dodaj red iz `ADAXA_JAVNA_NABAVA_append` (PB-0056, Hrvatske autoceste) u prvi red s praznim `Buyer ID`; dedupe po `Buyer ID`;
   - u redu PB-0014 upiši ćelije iz `ADAXA_JAVNA_NABAVA_update.set`, a `append_to_Notes` dodaj na kraj ćelije `Notes`.
   - Napomena 31/10: EOJN chat je 31/10 revidirao preporuku za HAC (PB-0056). Prije upisa uskladi `Adaxa angle` i `Next action` s Dnevnikom 31/10 (EOJN).
3. **Ovaj log:** status promijeni u `APPLIED · <UTC>`, dodaj izvještaj po koracima, obriši payload, premjesti W-003 na vrh Dnevnika i commitaj na granu `claude/dario-adaxa-project-9u32ik`.

```json
{
 "ADAXA_LEADS_normalize": {
  "rows": "r2-r15 (Lead ID L-0001 ... L-0014)",
  "Priority": {
   "A": "A - Primary",
   "B": "B - Secondary",
   "C": "C - Watchlist",
   "D": "D - Skip"
  },
  "Status": {
   "New": "QUALIFIED"
  }
 },
 "ADAXA_JAVNA_NABAVA_append": [
  {
   "Buyer ID": "PB-0056",
   "Buyer": "HRVATSKE AUTOCESTE d.o.o.",
   "OIB": "",
   "Region": "",
   "Category": "Marketing",
   "Fit score": 5,
   "Priority": "B",
   "Adaxa angle": "Search and digital part of the national information campaign for the new Crolibertas toll system (drivers, including foreign tourists, searching how to pay); as a partner of the winning agency, or by asking for a separate digital lot during the consultation",
   "Last contract date": "",
   "Last contract": "",
   "Incumbent": "",
   "Last value EUR": 0,
   "2024 EUR": 0,
   "2025 EUR": 0,
   "2026 EUR": 0,
   "Usual month": "",
   "Expected next purchase": "Open procedure above EU thresholds after the prior consultation (29/09-06/10/2026)",
   "Open 2026 plan item": "Promidžbeno informativna kampanja novog sustava naplate cestarine Crolibertas (EUR 393,000, prior consultation, CPV 79340000)",
   "EOJN link": "https://eojn.hr/prior-consultation-eo/100957",
   "Adaxa Lead ID": "",
   "Status": "Monitor",
   "Next action": "The prior consultation closed on 06/10/2026 (no comment from Adaxa is recorded); watch EOJN for the open procedure and contact bidding agencies about the digital part",
   "Next check": "15/10/2026",
   "Last checked": "02/10/2026",
   "Notes": "Found by the EOJN monitor (prior market consultations) on 02/10/2026. HAC's own advertising contracts so far are small newspaper notices (Večernji list, Hanza Media)."
  }
 ],
 "ADAXA_JAVNA_NABAVA_update": [
  {
   "Buyer ID": "PB-0014",
   "verify": {
    "Buyer": "Centar za kulturno-društveni razvoj Novi prostori kulture"
   },
   "set": {
    "Open 2026 plan item": "Oglašavanje na internetu i društvenim mrežama: EUR 26,500 (plan amended after 28/09/2026); contracted in 2026 so far EUR 11,650 (Think Say Make Do 11/02, HANZA MEDIA 16/04). Outdoor digital and jumbo posters: EUR 27,000.",
    "Next action": "Contact now: the 2026 internet and social ads plan was raised to EUR 26,500 and about EUR 14,850 is not contracted yet (in 2025 they planned EUR 25,000 and contracted EUR 4,160, so the plan is an upper bound)",
    "Next check": "15/10/2026",
    "Last checked": "02/10/2026"
   },
   "append_to_Notes": " | 02/10/2026: 2026 plan item for internet and social ads amended to EUR 26,500 (EOJN monitor)."
  }
 ]
}
```

### Odluke koje čekaju Darija

1. **Front A: Dario nastavlja s provjerenim popisom u privremenoj tablici [ADX prijedlozi poslova 30-10-2026 (privremeno)](https://docs.google.com/spreadsheets/d/1lqX7aicbyP6ws8GSl_IdhMfVw6IUtiFdXZwzbEMOmdA/edit).** Ostalo je 16 redova s odlukom OK; stupci *Ranija prijava*, *Provjera poslodavca 31/10* i *Rezultat provjere* su dodani ispred stupca *Odluka*.
   - **Prolazi:** 9 Voy, 12 Echelonn, 37 lemlist, 42 BetterMe.
   - **Prolazi uz napomenu:** 14 Scento (samo jedan od 14 i 15), 17 RemotelyTalents (niska plaća), 27 Tameson (BigQuery, Python), 28 D2LINE (prijava mailom preko d2line.com), 39 Thrive Internet Marketing Agency, 40 TripleTen (niska plaća), 41 appflame preko TalentC, 44 Nord Recruitment (regruter; uvjet od $1M+ mjesečno je ispunjen, provjereno do ~€2,5M), 45 Ad-Lab (tko zapošljava: Ad-Lab ili Clickbait Agency).
   - **Rizik:** 15 10ML (poslodavac nije provjerljiv), 22 eCommerce Smart (malo podataka o poslodavcu).
   - **Skip:** 16 THE/STUDIO (ranija prijava, APPLIED r3).

   Pisma od 12/10 postoje za Voy ([pismo](https://docs.google.com/document/d/1tD_NmxV-K7i9NtXeMAxcI1FkVb30v8vlc_vbsUXuKi4/edit)) i Echelonn ([pismo](https://docs.google.com/document/d/18EckA9pNhwhJdw-aLd5EG-RVSOlYe5a_HzHw-3r4Fik/edit)); za ostale Claude priprema paket kad Dario potvrdi broj. Kad Dario pošalje, Claude upisuje red u APPLIED.
2. **Adaxa, FPZ NETLOOP (€12.800, rok 16/10):** Dario: „na kraju ćemo to detaljno pregledati” (ima li smisla i koliko je komplicirano sudjelovati). Pregled treba biti prije roka.
3. **Adaxa:** koje leadove prvo kontaktirati? Prijedlog je Hrvatska Lutrija (L-0005), Falkensteiner (L-0001) i Novi prostori kulture (PB-0014) odmah, a Zračna luka Osijek (L-0009) u listopadu–studenom.
4. **Foxelli (L-0002):** isplati li se honorar za zamjenu na 4 mjeseca. Ako da, prijava ide kao ugovorni suradnik preko Adaxe.

### CV po oglasu i case studiji (od 31/10/2026)

Vodi se u zasebnom chatu „1.ADX-Jobs — CV po oglasu i case studiji” (https://claude.ai/code/session_01QJi9Mt8HhJkHaT8McbYUDt), na istoj grani. Pravila su u UPUTE §8.
1. Smjernice za CV s izvorima (web istraživanje) kao dokument na Driveu.
2. Analiza dosadašnjih odbijenica (APPLIED: Amplemarket, UTTR, saas.group, ennovationHUB, Adcubator, SolCrov, Ruby Labs, Infobip) i što je CV-u nedostajalo.
3. Master dokument na Driveu: prošireni opisi svih dosadašnjih poslova i case studiji. Pitanja za Darija se šalju u chatu, a svaka nova tvrdnja dobiva oznaku „potvrdio Dario”.
4. CV po oglasu za sve brojeve iz privremene tablice osim 16 (THE/STUDIO, skip); za 14 i 15 (Scento i 10ML) samo jedan, po Darijevu izboru. Odgovoriti u CV-u na što više pitanja iz oglasa. Potpis po želji na dno.
5. Link na svaki CV upisati u privremenu tablicu.

**Stanje 31/10/2026** (Drive, mapa [CV po oglasu](https://drive.google.com/drive/folders/1cCZepnepiYEiMR_M3oPZrbHC6GL5kSTA)):
- [x] 1. [CV smjernice i analiza odbijenica](https://docs.google.com/document/d/15_M7csU1kozgzbikNc50TBVcvnM2C7UXyYebYf9uN1E/edit): 20 izvora.
- [x] 2. Analiza je u istom dokumentu (§8, osam zaključaka).
- [~] 3. [Master: poslovi i case studiji](https://docs.google.com/document/d/1tTF5NQPOuuVR2V2Gdxx2Y7HzRrK0QYEUnzA1b5UsqNE/edit): popunjen iz CV-a 2026, pisama, APPLIED, tablice Base, dokumenta *APPLICATION – CASE STUDIES* i case studija o filmu (13/10). Pitanja za Darija poslana 31/10 i čekaju odgovor.
- [~] 4. Predložak: Google Doc s jednim stupcem, 2 stranice i potpisom na dnu (HTML uvoz; margine 43/47 pt). Gotov je 9 Voy ([CV](https://docs.google.com/document/d/1WhvexFxu54QtrwN5vONfY0GWtCPt2PHTsCLtrKffaaQ/edit)). Slijede 12 Echelonn, 37 lemlist, 42 BetterMe, pa ostali.
- [~] 5. Stupac *CV po oglasu* dodan je ispred stupca *Odluka* (Q); upisan je Voy.

### Video predstavljanje (od 31/10/2026)

Vodi se u zasebnom chatu „1.ADX-Jobs — video predstavljanje (plan i scenarij)” (https://claude.ai/code/session_01QJi9MsKf2MhhZ6caJJxfMZ), na istoj grani. Cilj je video koji Dario snimi jednom i linka uz prijave (CV, pismo, forme, LinkedIn).
1. Istraživanje s izvorima: što recruiteri žele od video predstavljanja za remote marketing role.
2. Plan: glavna verzija od 60–90 s, kratka od 30 s i po želji 2–3 min s case studijima.
3. Scenarij na engleskom, verzija za teleprompter i SRT titlovi.
4. Shot list, tehnička priprema i kontrolna lista; pitanja za Darija.

Sadržaj samo iz provjerenih činjenica (UPUTE §8). Bez podataka klijenata na ekranu. Dokumenti i video idu na Drive, ne u repo.

**Stanje 31/10 (nacrt 2):** Darijevi odgovori uključeni: YouTube unlisted; dvije verzije, V1 s Adaxa logom (`adaxa.agency/video`) i V2 bez logotipa (`adaxa.agency/intro`); poslodavac se opisuje, ne imenuje; naglasak na automatizaciji i AI-ju; snima na računalu u Google Vidsu; portfolio od 2–3 min na demo podacima; samo engleska verzija. Drive mapa [Video](https://drive.google.com/drive/folders/1zwO5ivaGqBTZ3kqNUn_xh0ht41X-K6IZ): [plan i scenarij, nacrt 2](https://docs.google.com/document/d/14NK1Wjvqh72xMy9yNuPqTsEzt-jtdVL6LdZukJhf0bw/edit), [DEMO tablica](https://docs.google.com/spreadsheets/d/15Y6WhuInkKRksAq1ytRpB2c36sqGpfvMRwS0ccbk_Wk/edit) (izmišljeni podaci), demo Apps Script, SRT za 90 s i 30 s, teleprompter `.txt`. Čeka Darija: proba u Google Vidsu, Adaxa logo za V1, kasnije novi case studiji. Zatim Dario snima i objavljuje.

### Razgovori

Nema zakazanih razgovora. SolCrov je odbio prijavu nakon razgovora 07/10 (Dario, 12/10).

### Follow-up raspored

Nema follow-upa (30/10/2026). Dario je zatvorio praćenje svih prijava: APPLIED r2–r43 13/10, a ostale 30/10. Stari raspored (stanje 12/10) je u git povijesti ovog loga.

### Adaxa — sljedeći koraci

Od 30/10 EOJN i javna nabava vode se u zasebnom chatu „Adaxa — EOJN javna nabava (1.ADX-Jobs)” (UPUTE §9). Tablica ispod vrijedi dok je taj chat ne ažurira.

| Kada | Što | ID |
|---|---|---|
| **odmah** | **Registracija Adaxe na EOJN RH** (eojn.hr/login → „Želim se registrirati” → Gospodarski subjekt; OIB; aktivacija e-poštom; e-potpis ne treba). Bez nje nema DoN-a, pitanja ni ponude. Zatim preuzeti DoN za HAC i APN. Vodič i analiza: [ADAXA — EOJN priprema i natječaji (studeni 2026)](https://docs.google.com/document/d/1FjU5e9Se3TKDPI7PRu69BQdtly7oFdc3HGoPo9RAhco/edit) | — |
| — | **APN — web i društvene mreže**, €25.000, rok 05/11: **no-go** (dopuna 31/10): portfelj nema usporedive reference, a ugovor gura paušalni obrt prema granici od €60.000. [EOJN](https://eojn.hr/tender-eo/110057) | novo |
| **do 09/11 09:30** | **Hrvatske autoceste — Crolibertas** (otvoreni postupak, 5 grupa). **Grupa 2** zakup medija €247.000: jedina realna uloga, Dario kao stručnjak za online oglašavanje u ponudi medijske agencije (Adaxa podizvođač); kontakt s agencijama samo uz Darijevo odobrenje. **Grupa 4** društvene mreže €26.000: no-go samostalno (dopuna 31/10). [EOJN](https://eojn.hr/tender-eo/104028) | PB-0056 |
| — | **No-go 30/10:** INOVAcija Zadar (događanja i tisak, €7.600, 03/11), Lučka uprava Dubrovnik (70 % bodova za iskustvo u PR-u EU projekata gradnje, €60.000, 06/11), Obiteljski centar (promo materijal i konferencija, €26.000, 09/11). | — |
| čim Dario odluči | **Novi prostori kulture (Zagreb):** plan za 2026. za oglašavanje na internetu i društvenim mrežama podignut je na €26.500. Ugovoreno je €11.650 (Think Say Make Do 11/02, Hanza Media 16/04). U 2025. planirali su €25.000, a ugovorili €4.160, pa je plan gornja granica. | PB-0014 |
| čim Dario odluči | **Hrvatska Lutrija:** pitati je li podrška za Google Ads iz 2026. još planirana. Stavka je u Q2 i nije ugovorena; zadnji izvođač je Risely digital (€6.000). | L-0005 · PB-0002 |
| čim Dario odluči | **Falkensteiner:** pronaći marketing leada za Hrvatsku na LinkedInu i poslati kratku poruku o Google Hotel Ads / metasearchu. Imaju otvoren oglas za metasearch & affiliate specijalista u Zadru. | L-0001 |
| čim Dario odluči | **Aranea toys (Zagreb, webshop Denis.hr):** traže voditelja/stručnjaka za e-commerce i digitalni marketing (EURES, 30/09). Ponuditi vanjsku uslugu umjesto zaposlenja. | novo |
| 15/10 | **EOJN pregled** (`eojn_monitor.py new --since 2026-10-12`) i praćenje natječaja **Ministarstva rada** nakon savjetovanja (€379.200) | PB-0055 |
| 15/10 | **HNK Split, Lječilište Topusko, HINA, Medicinski fakultet Osijek:** pitati kako kupuju stavke iz 2026. Topusko je 06/08 ugovorilo digitalni marketing za €24.000 s LINK2DIGITAL (u EOJN-u objavljeno nakon 05/10). | L-0006 · L-0007 · L-0012 · L-0013 |
| listopad–studeni | **Zračna luka Osijek:** ugovor s KRYPTON WEB SOLUTIONS (€6.000) ističe 31/01/2027.<br>Do €15.000 ZLO pita izravno pa kontakt mora prethoditi kupnji.<br>Ponuditi kratki audit: 7 slikovnih oglasa od 03/02/2026, bez search oglasa. | L-0009 · PB-0001 |
| studeni–prosinac | **Narodne novine** (ARBONA, €16.800, Google Ads + SEO), **Grad Dubrovnik** (Dubrovnik Pass), **NP Plitvička jezera**: javiti se prije objave planova za 2027. | L-0008 · L-0014 · L-0010 |
| svaki crawl dan | `python3 adx/tools/eojn_monitor.py new --since <zadnja provjera>` | — |

### Aktivne prijave — pravilo jedne prijave po tvrtki

Izvor istine je kartica APPLIED.

**Aktivnih prijava nema (30/10/2026).** Dario je 13/10 zatvorio praćenje APPLIED r2–r43, a 30/10 i r44–r47 (Thrive Talent Solutions, Shotstack, Pro Coffee Gear, HLTH), David Kennedy, Huzzle (Google Ads Specialist) i Infobip (Senior Digital Advertising Specialist, odbijenica 29/10). Zatvorene prijave ostaju u APPLIED kao povijest; zatvaranja od 30/10 upisana su u Work 31/10 (APPLIED r44–r50).

**Ne predlagati ponovo (Darijeve odluke i pravila):**
- **VOID 31/10 (privremena tablica):** svi brojevi 8–50 bez odluke OK i 20 zatvorenih ili neprovjerljivih oglasa iz Found; u Work je `Priority` = `VOID - Dario 31/10/2026` (popis je u Dnevniku 31/10). Skip 31/10: THE/STUDIO (ranija prijava).
- **VOID 12/10:** Sweat Pants Agency (Senior Google Ads Buyer; paket od 02/10 nije poslan).
- **Nije izabrano 12/10:** Fit4Me, Jooble, Strategyzer.
- **VOID 05/10:** Syroscape preko JobRacka (Senior Performance Marketing Manager); pismo pripremljeno, nije poslano. Ne predlagati: Vysta i Chess.com s liste od 05/10.
- **ennovationHUB — VOID 28/09:** prijava za Senior Google Ads Specialist odbijena (Darijeva dojava 28/09); bez follow-upa i novih prijedloga za tvrtku. Svibanjska rola nije bila poslana.
- **VOID 28/09:** Pragmatike (CMO), Ruby Labs (Performance Marketing Lead, Google & Microsoft Ads), Easyship (Head of Marketing), Appsilon (Head of Marketing).
- **Skip 25/09:**
  - LottieFiles (Head of Growth);
  - Ruby Labs (Growth Marketing Lead);
  - Base360.ai (Founding Growth Marketer);
  - SimpleStudy (Head of Paid Ads; njihova tržišta su UK, IE, BR, ZA i AU).
- **HOLD ili zatvoreno, iz tablice 05–06/10** (vraća se samo ako se uvjet riješi):
  - RemotelyTalents, Senior PPC Manager: Hrvatske nema među obveznim lokacijama;
  - D2LINE, Google Ads & Performance Marketing Specialist: nema provjerenog besplatnog kanala prijave ni potvrde za Hrvatsku (Dario ne plaća pretplate na job boardove);
  - Whiskey Library, Senior Google Ads Manager: popis lokacija bez Hrvatske; uz to je prva objava 10/09;
  - Pearmill (vremenska zona isključuje Hrvatsku), Acquire (Njemačka), Pop.store (oznaka US);
  - zatvoreno ili preskočeno: AbroadLimited, Talentuch, Yoru, Scrambly, Wisevu (obvezna diploma), Lead Ember (bez odgovora, zatvoreno 26/09).
- **Integritet:** Fortis Media (cloaking); CoinPoker i HireStakes (kripto kladionice i kasina, siva tržišta).
- **Ostalo:**
  - Egear i UTTR Director (17/09, trajno);
  - Easygenerator (72 dana, 20/09);
  - TestGorilla (pauzirano).
- **Odbijene:**
  - UTTR (24/09);
  - Amplemarket (25/09);
  - ScraperAPI / saas.group (28/09);
  - ennovationHUB, Senior Google Ads Specialist (Dario javio 28/09);
  - Adcubator (Dario javio 02/10);
  - SolCrov (Dario javio 12/10, nakon razgovora 07/10);
  - Ruby Labs Google Ads Manager (04/08).

---

## Dnevnik

### 31/10/2026 · Dario / Claude · Video predstavljanje: odgovori i nacrt 2
- **Dario:** „1 YT unlisted, 2 možeš dvije verzije, smije biti na adx, 3 možeš ih malo opisati ali ne govoriti o imenima, 4 dodat ćemo kasnije, 5 da, 6 snimam na računalu, 1 može logo drugi bez, 7 samo screenshare – google videos, 8 automatizaciju i poglavito sve što radim sa AI, 9 može, 10 naravno samo ENG verzija”.
- Nacrt 2: scenariji prepisani s naglaskom na AI i automatizaciji (opener F za AI-first role), V1/V2, upute za Google Vids i web kameru, portfolio na demo podacima, HR verzija uklonjena. Nacrt 1 i stare SRT/txt datoteke premješteni u otpad na Driveu.
- Novo na Driveu: [nacrt 2](https://docs.google.com/document/d/14NK1Wjvqh72xMy9yNuPqTsEzt-jtdVL6LdZukJhf0bw/edit), [DEMO tablica](https://docs.google.com/spreadsheets/d/15Y6WhuInkKRksAq1ytRpB2c36sqGpfvMRwS0ccbk_Wk/edit) (RSA_Feed s formulama, SERP_Monitor, Localisation; sve izmišljeno), `DEMO_apps_script_buildFeed.gs.txt`.
- UPUTE §8: dodane stavke koje je Dario potvrdio 31/10 (Search/Shopping/PMax, podjela MCC-a i brand/non-brand, opis SERP sustava) i pravilo da se poslodavac u videu opisuje, ne imenuje.
- Tablica Work: ništa.

### 31/10/2026 · Claude · Video predstavljanje: plan i scenarij, nacrt 1
- Istraživanje s izvorima (duljina 60–90 s, titlovi, hosting, GDPR i pristranost), plan tri verzije (90 s, 30 s, po želji 2–3 min portfolio), scenariji na engleskom s vremenima, kadrom i natpisima, 6 uvodnih rečenica po tipu oglasa, teleprompter, SRT, shot list, tehnika, kontrolne liste i 10 pitanja za Darija. Hrvatska verzija: preporuka da se sada ne radi.
- Sadržaj samo iz UPUTE §8; stavke iz CV-a koje nisu u §8 označene su „[CV, potvrdi]”. Ime poslodavca se ne izgovara dok Dario ne odobri.
- Drive: mapa [Video](https://drive.google.com/drive/folders/1zwO5ivaGqBTZ3kqNUn_xh0ht41X-K6IZ), [dokument](https://docs.google.com/document/d/1R9wmlZykTI7IguwijaI8BWruc2oT5GWQT70dSodhuHU/edit), dva `.srt` i teleprompter `.txt`. Ništa snimljeno ni objavljeno.
- Tablica Work: ništa.

### 31/10/2026 · Claude · CV po oglasu: smjernice, analiza odbijenica, master dokument, CV za Voy
- **Dario:** „kreni malo raditi na izradi boljih i customiziranih CV-a za svaki od poslova … Pretraži internet i vidi koje su najbolje smjernice … Krenut ćemo također u proširivanje case studyja kao i proširivanje opisa poslova”.
- **Drive:**
  - mapa *CV po oglasu*;
  - smjernice s 20 izvora i analizom 49 redova APPLIED (2 intervjua, 1 recruiter screen, 9 odbijenica);
  - master dokument;
  - CV za Voy (2 stranice, ATS čitljiv, potpis na dnu). Prva verzija od 3 stranice je u smeću.
- **Nalazi:**
  - CV 2026 navodi Algebru kao „Lecturer, Digital Marketing … training”, što je na popisu „Ne tvrditi”; novi CV-jevi pišu samo „Lecturer”;
  - profil („last one to two years”) proturječi datumu Wowtech 2021 – Present;
  - Base ima drukčije datume za Oxidian (10/17) i Promosapiens (09/16) te poslove kojih nema u CV-u (e-recept u ljekarni 2011–2014, Zderić, Hattrick).
  - Sve to čeka Darijevu potvrdu.
- **Privremena tablica:** novi stupac Q *CV po oglasu* (ispred *Odluka*); red 9 Voy.
- Tablica Work: ništa. Ništa nije poslano.

### 31/10/2026 · Dario / Claude · Video predstavljanje u zasebnom chatu
- **Dario:** „hoćemo napraviti i jedan scenarij za video da to snimimo i generalno uvijek imamo pri ruci, napravi mi plan za video isto u novom chatu”.
- Otvoren je chat „1.ADX-Jobs — video predstavljanje (plan i scenarij)” (https://claude.ai/code/session_01QJi9MsKf2MhhZ6caJJxfMZ), na istoj grani. Zadatak je u Otvorenom → „Video predstavljanje”.
- Tablica Work: ništa.

### 31/10/2026 · Dario / Claude · CV po oglasu i case studiji u zasebnom chatu
- **Dario:** „u novom chatu kreni raditi na izradi boljih i customiziranih CV-a za svaki od poslova … imamo jako lošu statistiku što se tiče odbijenica … odgovoriti na što više pitanja unutar CV-a … pretraži internet koje su najbolje smjernice … imaš i moj vlastoručni potpis … proširivanje case studyja i opisa poslova … uvedi to u git”.
- Otvoren je chat „1.ADX-Jobs — CV po oglasu i case studiji” (https://claude.ai/code/session_01QJi9Mt8HhJkHaT8McbYUDt), na istoj grani. Zadatak: smjernice za CV s izvorima, analiza odbijenica, master dokument s proširenim opisima poslova i case studijima, CV za svaki oglas iz privremene tablice (osim 16).
- Potpis je izrezan, s prozirnom pozadinom, i spremljen na Drive kao `Dario_Suler_potpis.png` (`1L3odnQPCE20Uonmu3bSGurF5cp-O_Hp_`). Nije u repou.
- UPUTE §8: nova pravila „CV po oglasu i case studiji”. Otvoreno: novi odjeljak s koracima.
- Ispravak: za Nord Recruitment uvjet od $1M+ mjesečno je ispunjen (provjereno: osobno do ~€2,5M mjesečno); ispravljeno u privremenoj tablici i u Otvorenom.
- Tablica Work: ništa.

### 31/10/2026 · Dario / Claude · Odluke iz privremene tablice, provjera poslodavaca, W-002 izvršen
- **Dario:** „Provjeri moje komentare u sheetu, obriši sve u kojima odluka nije OK … zavedi ih kao void … Ostale, u kojima je OK, ćeš prvo detaljno provjeriti kao poslodavca, također provjeri jesmo li se do sada prijavljivali u istu tvrtku, ako da onda skip … ažuriraj sve u privremenoj tablici, bazama i gitu”.
- **Odluke:** OK za 16 brojeva (9, 12, 14, 15, 16, 17, 22, 27, 28, 37, 39, 40, 41, 42, 44, 45). Ostalih 37 redova kartice *Prijedlozi* i 20 redova kartice *Zatvoreni oglasi* (bez odluke) obrisano je iz privremene tablice i zavedeno u Work kao `VOID - Dario 31/10/2026`. Kartica *Zatvoreni oglasi* je obrisana.
- **Ranije prijave** (Work: APPLIED, Found positions, Listings, Employers; git log; Gmail dakson2): samo THE/STUDIO (APPLIED r3, Performance Marketing Specialist, svibanj 2026, bez odgovora), pa je broj 16 skip. Thrive Talent Solutions (APPLIED r44) i Thrive Internet Marketing Agency (39) nisu ista tvrtka. Gmail druge adrese kojom Dario šalje prijave nije dostupan.
- **Provjera poslodavaca** (registar ili impressum, veličina, recenzije, oglas aktivan 31/10):

  | # | Poslodavac | Rezultat | Glavno |
  |---|---|---|---|
  | 9 | Voy | prolazi | Menwell Limited (London), financiran, 1M+ korisnika |
  | 12 | Echelonn | prolazi | Echelonn Pty Ltd (Melbourne, od 2016.), Trustpilot 4,5; rola ponovo otvorena, razina specijalista |
  | 14 | Scento | uz napomenu | Scento International LTD (Cipar, HE 477410), a stranica navodi Pariz; isti predložak i oglas kao 10ML |
  | 15 | 10ML | rizik | impressum bez naziva tvrtke i registra, američki telefon, nema nezavisnih recenzija |
  | 16 | THE/STUDIO | skip | ranija prijava (APPLIED r3) |
  | 17 | RemotelyTalents | uz napomenu | regruter bez recenzija; klijent US agencija za kućne usluge; $3.500–4.500/mj |
  | 22 | eCommerce Smart | rizik | mala agencija iz Bristola (2024.), bez nezavisnih podataka |
  | 27 | Tameson | uz napomenu | Tameson B.V. (Eindhoven); rola traži BigQuery, Python/R i statistiku |
  | 28 | D2LINE | uz napomenu | D2Line, modni webshop iz Sofije (BG 204965840); NoDesk naplaćuje prijavu, kontakt preko d2line.com |
  | 37 | lemlist | prolazi | francuski SaaS, $50M+ ARR, Meta prvi kanal |
  | 39 | Thrive Internet Marketing Agency | uz napomenu | Teksas, od 2005., Google Premier Partner; praznine offline conversion import i LinkedIn Ads |
  | 40 | TripleTen | uz napomenu | samo Hrvatska, $4.500–5.000/mj, Meta glavni kanal |
  | 41 | appflame (TalentC) | uz napomenu | Hily, Taimi, 500+ zaposlenih; Apple Search Ads, SaaS i pretplate |
  | 42 | BetterMe | prolazi | aplikacija za zdravlje (Kijev, Cipar); Demand Gen i YouTube |
  | 44 | Nord Recruitment | uz napomenu | mali regruter; traže osobno vođenih $1M+ mjesečno |
  | 45 | Ad-Lab | uz napomenu | agencija iz Dubaija; oglas opisuje Clickbait Agency kao poslodavca |
- **Privremena tablica** [ADX prijedlozi poslova 30-10-2026 (privremeno)](https://docs.google.com/spreadsheets/d/1lqX7aicbyP6ws8GSl_IdhMfVw6IUtiFdXZwzbEMOmdA/edit): ostalo je 16 redova; dodani su stupci *Ranija prijava*, *Provjera poslodavca 31/10* i *Rezultat provjere*, a *Odluka* je i dalje zadnji stupac.
- **Tablica Work, izravan upis** (Dario 31/10: „ažuriraj … bazama”). Izvještaj za W-002 po koracima:
  1. APPLIED: dodani r48 David Kennedy, r49 Huzzle (Google Ads Specialist) i r50 Infobip (Senior Digital Advertising Specialist); prva dva `CLOSED 30/10/2026 — by Dario`, Infobip `Rejected 29/10/2026`.
  2. APPLIED_updates: r36 SolCrov `STATUS` → `Rejected 12/10/2026` i bilješka o odbijanju; r44–r47 `CLOSED 30/10/2026 — by Dario`, uz dopunu `Availability status` i `Actions`. Preskočeno: r29 Adcubator (već `Rejected 02/10/2026`) te r25, r27, r33 i r42 (bilješke od 02/10 već postoje, drukčije sročene).
  3. Found positions: dodano 8 od 10 redova (r261–r268); HLTH već postoji (r214), a Echelonn je r246. Statusi su ažurirani na 31/10: AttaPoll, Brightvision, Bigburg i Admiral Media `VOID - Dario 31/10/2026`, Voy `OK`.
  4–5. Adaxa koraci (ADAXA LEADS, ADAXA JAVNA NABAVA): nisu izvršeni, preneseni su u W-003.
  6. ACTIVITY LOG: 8 redova od 02–03/10 već postoji (Codex 12/10); dodano 9 redova i `CLAUDE-20261031-DECISIONS-CHECK` (r82–r91).
  7. DAILY CONTROL: 02, 03, 05, 06 i 12/10 već postoje; dodani 30/10 i 31/10 (r21–r22).
  8. Crawl: r33, pravilo od 30 dana i geografija.
  9. WORK QUEUE `Q-20260911-DARIO`: `Last updated`, `Next action` i `Notes`; stare bilješke ostale su ispod nove.
  - Dodatno 31/10 u Found positions: r195–r260 ima 47 redova s `VOID - Dario 31/10/2026`; 8 provjerenih redova ima `OK - Dario 31/10/2026 | check …` i bilješku provjere u `Availability status`; r224 THE/STUDIO `Skip - Dario 31/10/2026`; r256 Huzzle.com `A - Applied`. Novi redovi r269–r282 su crawl 30/10 (7 OK, 7 VOID). Stupac Y (`Actions`) nije diran.
  - Upwork redovi (pauza) i r214, r221, r222 nisu dirani.
  <details><summary>Stari Priority prije promjene 31/10</summary>

  r195 Pop.store: GEO VERIFY; r196 Whiskey Library: GEO / CASE VERIFY; r197 Wisevu: SECONDARY / SKIP; r198 D2LINE: HOLD / PREPARED; r199 AbroadLimited Europe Ltd.: SKIP / CLOSED; r200 eCommerce Smart: HOLD — RATE / PLATFORM / GEO; r201 Devrika: HOLD — PROOF / GEO; r203 Logicstics: HOLD / GEO VERIFY; r205 Binance.US: C - Conditional; r206 Recraft: C - Conditional; r210 BRANDOG Digital: HOLD — ROUTE; r212 Huzzle Ltd: A/B — Croatia listed; direct route HOLD; r215 Praktika.ai: A/B — NEXT OLD CANDIDATE; r216 Henry Schein: C - Age / Geo verify; r217 OnHires: CLOSED — DO NOT REAPPLY; r218 Stryker Digital: MAYBE — GEO / HOURS; r219 Powered by Search: CLOSED — PRIOR APPLICATION; r220 OnHires: SKIP — USER DECISION; r223 Viktor: DUPLICATE — ORIGINAL ROW 67; r224 THE/STUDIO: A/B - Strong, proof gates; r225 saas.group: A - Primary / Cross-channel stretch; r226 SEO Direct: A - ADAXA agency project / Geo verify; r227 Speedwork Social: B - Strong / B2B lead-gen proof; r228 OnHires: B/C - Conditional / B2B demand-gen; r229 AIOS: C - Stretch / Budget + GEO; r230 Tameson: A/B — Strong analytics stretch; r231 Online Advertising Europe: A — Primary / Croatia payroll check; r232 Foxelli Group: B — Cross-channel / temporary; r233 Optimum7: B — Strong PPC / Geo verify; r234 Purolabs: C — Meta-first / proof gate; r235 RemotelyTalents: A — NEW / DIRECT / GEO GOOD; r236 TNT Growth: B — SENIOR / GEO + PROOF GATES; r237 CapsLock: B — BROADER CRO / OLD POST; r238 Polyglot Talent: C — FREELANCE / CONFLICT + B2B GAP; r239 Sagan Recruitment: B — NEW-TO-SHEET / GEO + TIME + SOCIAL PROOF; r240 Hostinger: A/B — SENIOR FIT / GEO + DIRECT ROUTE HOLD; r241 BruntWork: B/C — PART-TIME / META + GEO HOLD; r242 Scale Army Careers: B — GEO/HOURS VERIFY; r243 Formula: C — PROOF / RUSSIAN GATES; r244 Evolve Digital GmbH: C — GEO EXCLUDED / ROUTE HOLD; r245 UnoCasa Consulting: C — SOURCE/GEO/HOURS HOLD; r246 Echelonn: A — DIRECT / STRONG; r247 Echelonn: A — DIRECT / TOP FIT; r248 Scento: B — RECENT / META PROOF GATE; r249 10ML: B — RECENT / META PROOF GATE; r250 impulsion.com: B — ADAXA / LANGUAGE+META HOLD; r251 Scale Army Careers: B — GEO/HOURS+PROOF HOLD; r252 Boosta: A — EU remote; r253 Boosta: A/B — EU remote; r254 Jobgether: B — GEO HOLD; r255 Puffy: C — PROOF HOLD; r256 Huzzle.com: A/B — RECENT CROATIA / ROUTE HOLD; r257 Full Funnel Growth: A/B — TOP AI / GEO VERIFY; r258 Dexfinity: A — STRONG PPC / GEO VERIFY; r259 Whiskey Library: B — ECOMMERCE / GEO+HOURS HOLD; r260 WeGrowth: B/C — WORLDWIDE / META+LINKEDIN PROOF
  </details>
- W-002 je izvršen i uklonjen iz Otvorenog; Adaxa dio je W-003 (`PENDING`).
- Ništa nije poslano.

### 31/10/2026 · Dario / Claude · EOJN: Adaxa je paušalni obrt, revidirana preporuka
- **Dario:** Adaxa je paušalni obrt; nije registrirana na EOJN-u; nema e-potpis; reference „sve iz agencijskog portfolija”; pitao je mora li sam naći stručnjaka za HAC grupu 4.
- **Provjereno na Driveu** (tablica „Adaxa - ALL”, izlazni računi i pregled primitaka 2025.): uslužni obrt od 2018., paušalno oporezivanje, izvan sustava PDV-a. Portfelj je Google Ads / performance i manji tehnički poslovi; nema projekata vođenja društvenih mreža ni održavanja weba za naručitelja. Granica od €60.000 (paušal i PDV) ograničava ugovore od €25.000 i više. Brojke i klijenti su samo u dokumentu na Driveu, ne u repou.
- **Revidirano:** HAC grupa 4 i APN no-go za samostalnu ponudu; HAC grupa 2 samo kao stručnjak u ponudi medijske agencije. Stručnjaka imenuje ponuditelj (Dario + vanjski suradnik), ali za rok 09/11 ga ne preporučujem tražiti. Registracija na EOJN i dalje vrijedi.
- Dokument dopunjen: [ADAXA — EOJN priprema i natječaji (studeni 2026)](https://docs.google.com/document/d/1FjU5e9Se3TKDPI7PRu69BQdtly7oFdc3HGoPo9RAhco/edit) (odjeljak „Dopuna 31/10” na vrhu).
- Tablica: ništa.

### 30/10/2026 · Dario / Claude · Prijave 1–7 zatvorene; privremena tablica za odluke
- **Dario:** „1-7 zatvori / ostale prijedloge spremi u privremeni sheet … obavezno link na objavu … u zadnju kolumnu dodaj Odluka … preskači Adaxa / EOJN poslove”.
- **Zatvoreno 30/10:** Thrive Talent Solutions, Shotstack, Pro Coffee Gear i HLTH (APPLIED r44–r47), David Kennedy, Huzzle (Google Ads Specialist, poslano 21/10) i Infobip (Senior Digital Advertising Specialist, odbijenica 29/10). Aktivnih prijava nema.
- **Privremena tablica** [ADX prijedlozi poslova 30-10-2026 (privremeno)](https://docs.google.com/spreadsheets/d/1lqX7aicbyP6ws8GSl_IdhMfVw6IUtiFdXZwzbEMOmdA/edit), glavna mapa na Driveu:
  - kartica *Prijedlozi*: 53 reda za brojeve 8–50 (broj 36 rastavljen na 36a–36k). Stupci: broj, skupina, poslodavac, rola, opis, lokacija, plaća, objava, stanje oglasa 30/10, izvor (s redom u Work), rizici, prijedlog, link na objavu i **Odluka** (žuto, za Darija);
  - kartica *Zatvoreni oglasi*: 20 redova iz skupine C3 (17 zatvorenih, 3 neprovjerljiva) s redom u Found i linkom. Upwork je izostavljen (pauza);
  - linkovi su provjereni na izvoru. Za ScholarshipOwl je stavljen link na stranicu poslodavca (Recruitee), a za TripleTen, Nectar Life i MM Coaching puni linkovi iz podataka crawla.
- **Otvoreno:** odluke idu kroz tablicu; isteklo pravilo od 30 dana za BarkleyOKRP i Peak 21 (objava 17/09), pa su maknuti; raspored follow-upa zamijenjen napomenom da follow-upa nema.
- **Tablica Work:** W-002 (`PENDING`) dopunjen: 3 reda u APPLIED (David Kennedy, Huzzle i Infobip, svi zatvoreni), zatvaranje r44–r47 u `APPLIED_updates`, 2 reda u ACTIVITY LOG-u, DAILY CONTROL za 30/10 i WORK QUEUE.

### 30/10/2026 · Claude · EOJN: registracija, pet postupaka, vodič za Adaxu
- **Dokument:** [ADAXA — EOJN priprema i natječaji (studeni 2026)](https://docs.google.com/document/d/1FjU5e9Se3TKDPI7PRu69BQdtly7oFdc3HGoPo9RAhco/edit) (Drive, glavna mapa): sažetak, hitni koraci, tablica pet postupaka, vodič (ZJN i NN 48/2026, pragovi, ESPD, dokumenti, reference, zajednica ponuditelja, DKOM, tipične pogreške), kontrolna lista i pitanja za Darija.
- **Nalaz:** dokumentaciju o nabavi EOJN daje samo registriranim korisnicima, pa je analiza iz javnih objava, TED-a (693457-2026) i službenih uputa EOJN-a. Jednostavna nabava je od 01/09/2026 do €50.000 (usluge); ugovori iz javne nabave od 01/09/2026 potpisuju se kvalificiranim e-potpisom kroz EOJN.
- **Preporuka:** uvjetni GO za HAC grupu 4 (društvene mreže, €26.000) i APN (€25.000); HAC grupa 2 samo kao stručnjak u ponudi agencije; no-go INOVAcija, Lučka uprava Dubrovnik, Obiteljski centar. Rokovi FPZ (16/10) i HP (19/10) su prošli i maknuti iz Otvorenog.
- **Čeka Darija:** pravni oblik Adaxe, registracija na EOJN-u, e-potpis, reference, stručnjaci za HAC grupu 4. Ništa nije registrirano ni poslano.
- Tablica: ništa.

### 30/10/2026 · Dario / Claude · EOJN se seli u zaseban chat
- **Dario:** „EOJN sekciju ćeš voditi unutar ovog projekta u novom chatu”. Zanima ga postupak i dokumentacija za prijavu Adaxe na natječaje preko EOJN-a.
- Otvoren je chat „Adaxa — EOJN javna nabava (1.ADX-Jobs)”, na istoj grani. Dobio je zadatak:
  - registracija gospodarskog subjekta na EOJN-u, hitno zbog rokova;
  - dokumentacija i preporuka go / no-go za pet otvorenih postupaka: INOVAcija Zadar 03/11, APN 05/11, Lučka uprava Dubrovnik 06/11, Obiteljski centar i HAC 09/11;
  - opći vodič i kontrolna lista spremnosti, kao Google Doc na Driveu.
- UPUTE §9: dodana napomena o zasebnom chatu.
- Tablica: ništa.

### 30/10/2026 · Claude · Inventura i crawl 30/10 (prva objava od 30/09)
- **Dario:** „napravi detaljnu inventuru otvorenih poslova i novih … i nastavi dalje u crawl”.
- **Stanje u tablici Work (drugi AI, 12–21/10):**
  - 12/10 18:49: Codex je u Work prenio W-002 iz repoa `dakson2/adx-jobs` (redovi `CLAUDE-2026100x` i `CODEX-20261012-RECONCILE`), ne W-002 s ove grane;
  - 13/10: HLTH poslan (APPLIED r47); Dario je zatvorio praćenje APPLIED r2–r43; od 13/10 do 21/10 dnevni „PPC Job Watch” (Found r200–r260); Upwork je na pauzi.
- **Razlike tablice i stvarnog stanja:**
  - nisu u APPLIED: David Kennedy (poslano 05/10), Huzzle, Google Ads Specialist (Workable potvrda 21/10, očekivanje $5.000/mj) i Infobip, Senior Digital Advertising Specialist (odbijenica 29/10);
  - paketi od 12/10 (AttaPoll, Voy, Brightvision, Bigburg, Echelonn, Admiral Media) nemaju zapis o slanju. Gmail nacrt za Bigburg nije poslan; Admiral Media je zatvoren.
- **Inventura:** svi oglasi iz APPLIED r44–r47, paketa od 12/10 i Found r195–r260 provjereni su na izvoru. Zatvoreni ili istekli: Binance.US, Recraft, OnHires ×3, Viktor, TNT Growth, Sagan, Scale Army ×2, Formula, Boosta Solvy ×2, Jobgether, Full Funnel Growth, Powered by Search, AbroadLimited, Admiral Media. Dario označava što je još aktualno.
- **Crawl 30/10:**
  - LinkedIn 30 dana (Hrvatska i EU s 24 ključne riječi; Europa, EMEA i Worldwide s 12): 2.506 jedinstvenih rola;
  - 754 ATS ploče osvježene (35.549 oglasa), Himalayas HR (438), Remote Rocketship (1.153), Workable (1.096), agregatori, EURES (1.983), MojPosao (1.466);
  - 862 jedinstvena paid/growth oglasa u prozoru; nove opcije nakon usporedbe s Found i APPLIED: lemlist, DuckDuckGo, Thrive Internet Marketing Agency, TripleTen, appflame preko TalentC, BetterMe, Triangulate Digital, Nord Recruitment, Ad-Lab; slabije Afina, Nectar Life, ScholarshipOwl, MM Coaching, FunnelFox.
- **Adaxa (EOJN `new --since 2026-10-12`):** otvoreno: Lučka uprava Dubrovnik, komunikacija i vidljivost €60.000 (06/11); APN, web i društvene mreže €25.000 (05/11); Obiteljski centar, promidžba €26.000 (09/11); INOVAcija Zadar €7.600 (03/11); HAC Crolibertas €393.000 (09/11). Rokovi FPZ (16/10) i HP (19/10) su prošli.
- Tablica: ništa; čeka Darijeve oznake.

### 12/10/2026 · Dario / Claude · Odluke, sedam paketa, pravilo od 30 dana
- **Dario:**
  - s liste 12/10 izabrao je 1, 2, 3, 7, 8, 9 i 10; brojevi 4–6 (Fit4Me, Jooble, Strategyzer) nisu izabrani;
  - SolCrov je danas poslao odbijenicu, nakon razgovora 07/10;
  - Sweat Pants: VOID;
  - prijave i upise u tablici od 05–06/10 radio je drugi AI;
  - natječaj FPZ-a pregledavamo detaljno na kraju.
- **UPUTE §4.1, §4.2 i §7.2:** starost do 30 dana od najranije kopije, a oglas mora biti aktivan. Remote s popisom EU zemalja bez Hrvatske je u redu; prijava ide preko osobnog profila, bez ponude preko Adaxe.
- **Paketi:** pisma od jedne stranice na Driveu, svako i kao PDF „pismo + CV”, za AttaPoll, HLTH, Voy, Brightvision, Echelonn i Admiral Media. Za Bigburg je Gmail nacrt s oznakom 1.2.ADX-JOB. Pripremljeni su odgovori za obrasce Voya i Brightvisiona. Ono što upisuje Dario je u Otvoreno → Odluke, točka 1.
- **Ponovna provjera podataka od 12/10 po novim pravilima:**
  - i dalje ispadaju DoiT, Senior Growth Marketing Manager (ista rola od 20/07, Estonija), RemotelyTalents (lokacije su samo Latinska Amerika i BiH) i hosting.com, Senior PPC Growth Specialist (remote samo u Litvi);
  - nove slabe opcije su BarkleyOKRP i Peak 21 (Odluke, točka 2).
- **Repo:** radi se samo na ovoj grani (UPUTE §1). `dakson2/adx-jobs` ostaje arhiva stanja do 03/10 i više se ne mijenja.
- Tablica: W-002 (`PENDING`) dopunjen: SolCrov → Rejected 12/10, 8 novih redova u Found positions, red u kartici Crawl i 3 reda u ACTIVITY LOG-u.

### 12/10/2026 · Claude · Crawl 12/10 (prva objava od 28/09)
- **Dario:** „provjeri izmjene na projektu, uskladi se i kreni u crawl”.
- **Izvori:**
  - 784 ATS ploče (Greenhouse, Ashby, Lever, Recruitee, SmartRecruiters, Teamtailor, Personio, Breezy, BambooHR, Pinpoint, Rippling), od toga 201 nova, pronađena iz imena tvrtki s LinkedIna;
  - agregatori (Jobgether 4.353, Jobicy, Remotive, RemoteOK, WWR, Working Nomads, Arbeitnow, TheMuse, Landing.jobs, DOU, posao.hr), Himalayas HR (690), Remote Rocketship (1.123), Workable (1.148);
  - LinkedIn za zadnjih 14 dana: Hrvatska i EU s 30 ključnih riječi (1.617 rola), Europa, EMEA i Worldwide s 12 ključnih riječi (954 nove role). Ukupno 2.571 jedinstvena rola, 1.576 relevantnih po naslovu;
  - EURES Hrvatska (1.872) i MojPosao (1.530).
- **Rezultat:** s ATS-a i agregatora 631 jedinstveni paid/growth oglas u prozoru, uz LinkedIn. Ni jedna nova rola ne prolazi sva pravila bez napomene: dvije najbolje (AttaPoll, HLTH) postoje samo na LinkedInu, a Voy nema navedenu plaću ni godine iskustva. Dario je izabrao 1, 2, 3, 7, 8, 9 i 10 (zapis iznad).
- **Ispali, s razlogom:**
  - geografija: Hostinger (Google Ads Manager, Senior i Team Lead; hibrid „based in Lithuania”, Team Lead LT/PL/LV), Capital.com UA Manager PPC (Varšava/Dubai/London), ElevenLabs Paid Media Manager (samo UK), Datasite/Sherpany (UK/DE), Gameopedia (samo Norveška), Nord Security (LT/PL, €2.600–4.000), Surfshark (LT/PL), WITHIN (London ili Berlin), Condé Nast (London, 4 dana u uredu), Trustero, Goodwall i Current (SAD), Heidi Health (Filipini), gismart i Eleken (Ukrajina);
  - jezik: Skelar Senior PPC (oglas na ukrajinskom), Formula i Allformance (traže ruski), Evolve Digital, hurra.com, clera, omos media, Remazing, CONVACT, MAI Group, Nayoki, ProviPanda, QMH (njemački);
  - kanal: Deel Director Paid Media (Meta-first), Publitas (SEO-first, „entry-level” €40–60k), Admiral Media Apps & Games, Reach Realm, JobRack i Polleo Sport (Meta / paid social), Holocene (outbound), Novakid i Zensai (CRM/lifecycle);
  - starost: Whiskey Library (Ashby 10/09; ujedno HOLD GEO), BOOSTERS UA Manager (DOU, stara vakancija), TechBiz Global (25/09), Current (Greenhouse 13/05);
  - pravila i ostalo: Cranberry Panda Head of Growth (regruter, posjeti timu svakih ~6 tjedana, €40–55k), Jobgether Head of B2C Growth (poslodavac skriven), EverAI (ista rola za koju je Dario već odbijen), Kraken (oglas zatvoren), preniska plaća (SF Marketing Agency, Foxelli, Reframes).
- **Hrvatska (MojPosao, EURES, LinkedIn):** nema senior paid-search role. Ima općih voditelja marketinga u Zagrebu i Rijeci (BITES & BEYOND, 2MT, Crossroad, Zelene tehnologije), paid social u Polleu i juniorskih mjesta (Digitalni Puls, Đuro Đaković Energy).
- **Adaxa:**
  - EOJN (`new --since 2026-10-05`): otvorena jednostavna nabava **Fakulteta prometnih znanosti — digitalni marketing i medijsko praćenje** (Interreg NETLOOP, €12.800, rok 16/10);
  - HAC Crolibertas je sada otvoreni postupak (€393.000, rok 09/11);
  - objavljeni ugovori: Lječilište Topusko, digitalni marketing €24.000 (LINK2DIGITAL, 06/08; L-0007); HP, strategija i sadržaj za društvene mreže €23.600 (BBDO);
  - Aranea toys (Zagreb, webshop Denis.hr) traži voditelja e-commercea i digitalnog marketinga (EURES 30/09), što je mogući lead za vanjsku uslugu.
- **Tablica:** W-002 (`PENDING`) dopunjen redom `CLAUDE-20261012-CRAWL` u ACTIVITY LOG-u i redom za 12/10 u DAILY CONTROL-u.

### 12/10/2026 · Claude · Usklađivanje: ova grana, adx-jobs i tablica
- **Tri zapisa, nijedan potpun:**
  - **ova grana:** Codex 04/10 (stanje prijava, ciljani crawl, ennovationHUB VOID, ispravak za Sweat Pants) i Claude 05/10 (crawl, prag plaće €3.500, David Kennedy poslan, Syroscape VOID, W-002);
  - **privatni repo `dakson2/adx-jobs`** (zadnja promjena 03/10): selidba od 28/09, Adcubator odbijen i poziv SolCrova na razgovor (02/10), provjera oglasa aktivnih prijava, crawl 02/10 u dva kruga i crawl 03/10, paket za Sweat Pants. Ništa od toga nije stiglo u tablicu ni ovamo;
  - **tablica Work, izravno 05–06/10:** prijave Thrive Talent Solutions (PPC Manager), Shotstack (Growth Marketing / Growth Engineer) i Pro Coffee Gear (Paid & Performance Marketing Lead; uvjete je odobrio Dario) te istraživanja s ishodom HOLD ili SKIP (RemotelyTalents, D2LINE, AbroadLimited, Pearmill, Acquire, Pop.store, Whiskey Library, Talentuch, Yoru, Wisevu, Scrambly, Lead Ember). Ovdje ih nije bilo.
- **Što je sada ovdje:**
  - dnevnički zapisi od 02/10 i 03/10 prepisani su niže, pod svojim datumima;
  - W-002 je proširen: Adcubator → Rejected, SolCrov → Interview 07/10, bilješke o oglasima, normalizacija ADAXA LEADS, PB-0056 i PB-0014, 12 redova ACTIVITY LOG-a, DAILY CONTROL za 02, 03, 05, 06 i 12/10 te WORK QUEUE;
  - u Otvoreno su ažurirani odluke, razgovori, follow-upovi, aktivne prijave (19) i HOLD popis.
- **Nesuglasja i otvoreno:**
  - Sweat Pants: Dario je 02/10 odobrio iznimku, a Codex je 04/10 (bez tog zapisa) upisao da se rola ne preporučuje. Dario je 12/10 odlučio: VOID.
  - Tablica: David Kennedy još nije u APPLIED jer W-002 nije izvršen; DAILY CONTROL završava 28/09.
  - Ostaje jedan nalog `PENDING`: sve je u W-002, nema W-003.
  - Iz W-002 repoa adx-jobs nisu preneseni koraci vezani uz privatni repo (zamjena linkova, red u kartici Crawl, proširenje popisa `Activity type`). Radi se samo na ovoj grani (UPUTE §1), pa ostaju nepreneseni.
- Tablica: W-002 (`PENDING`, proširen).

### 05/10/2026 · Dario · David Kennedy poslan, Syroscape VOID
- Poslano 05/10: **David Kennedy Recruitment — Senior Performance Marketer, Mainstream**. Follow-up oko 19/10.
- **Syroscape (JobRack): VOID**, Darijeva odluka. Pismo ostaje na Driveu.
- Tablica: **W-002 (PENDING)**.

### 05/10/2026 · Dario / Claude · Izabrani 1 i 4; pisma spremna
- Dario je izabrao:
  - **(1) David Kennedy Recruitment — Senior Performance Marketer, Mainstream** (adult-AI companionship);
  - **(4) Syroscape preko JobRacka — Senior Performance Marketing Manager.** Iznimka za datum: kreirano 23/06, ponovno objavljeno 29/09. ⚠️ niska plaća: $3.500–4.500/mj.
- Pisma na Driveu, po 1 stranica:
  - [DK Mainstream](https://docs.google.com/document/d/19u_stMNqML5RZ2iteWAy0l1E66m1cNWPZkTDgtxrGOE/edit) · prijava: [Teamtailor](https://davidkennedyrecruitment.teamtailor.com/jobs/8490833-senior-performance-marketer-mainstream);
  - [Syroscape](https://docs.google.com/document/d/1iH8wI2Re7dpMrjG1cR7Ym2QK0lWn429WsDJ1FUQsEqw/edit) · prijava: [JobRack Workable A1EBE780C4](https://apply.workable.com/jobrack/j/A1EBE780C4/).
- Spojeni PDF-ovi (pismo + CV v3) predani su Dariju.
- Gapovi iskazani u pismima:
  - DK: subscription aplikacije (nema iskustva);
  - Syroscape: B2B SaaS.
- Namjerno izostavljeno jer je neprovjereno: offline conversion import, Hyros.
- Nije poslano; šalje Dario.
- Tablica: ništa dok Dario ne javi slanje. Tada slijedi nalog za APPLIED, Found positions i ACTIVITY LOG.

### 05/10/2026 · Dario / Claude · UPUTE §4.5: prag plaće €3.500/mj
- Dario je spustio prag plaće na **€3.500 bruto mjesečno**. Role između praga i ~€4.200/mj idu na listu s oznakom ⚠️ niska plaća.
- Ponovno provjereno iz crawla 05/10: **Syroscape (preko JobRacka), Senior Performance Marketing Manager**.
  - Plaća $3.500–4.500 mjesečno (~€3.000–3.900), pa je ⚠️ niska plaća.
  - Uvjeti: Google + Bing primarno, B2B SaaS, AI alati dio posla, fully remote, preklapanje s US ET 7–15 h.
  - **Na Workableu kreirano 23/06/2026**, ponovno objavljeno 29/09. Pada na pravilu od 14 dana; moguće samo uz Darijevu iznimku.
- Tablica: ništa.

### 05/10/2026 · Claude · Crawl 05/10 (prva objava od 21/09) i EOJN
- **Pretraženo:**
  - LinkedIn: 808 kartica, 18 ključnih riječi × 4 lokacije, 29 detalja;
  - Jobgether: 3.494;
  - Remote Rocketship: 777;
  - Himalayas HR: 441;
  - Workable global: 286;
  - WWR i Working Nomads;
  - 209 ATS boardova (Greenhouse, Ashby, Lever, Workable, Recruitee, Teamtailor), iz URL-ova agregatora i seed liste.

  Ukupno 748 jedinstvenih marketinških rola; 156 nakon automatskog filtera; ručno pregledani svi koji su otvoreni Europi.
- **Ni jedna rola ne prolazi sve filtere.** Za Darijevu odluku:
  - **(1) David Kennedy Recruitment (klijent: consumer adult-AI companionship): Senior Performance Marketer – Mainstream.** Remote Europe/Asia, B2B, traži $300K+ mjesečno pod osobnom kontrolom. Teamtailor 02/10. Neprovjereno: klijent je skriven, kanali nisu navedeni, plaća nije navedena. Kategorija odgovara iskustvu s osjetljivim kategorijama.
  - **(2) Vysta Paid Media Group: Senior Google Ads Media Buyer.** LinkedIn EMEA 05/10; agencija koja radi samo Google Ads za e-commerce. Slabo: evergreen zapošljavanje (kopije u Indiji i APAC-u, careers stranica bez datuma), 3–5+ godina iskustva, plaća nije navedena.
  - **(3) Chess.com: Senior Performance Marketing Manager.** Rippling, worldwide. Slabo: mobile UA (Meta, ASA, AppsFlyer) i preklapanje s US ET i PT.
- **Otpali, s razlogom:**
  - JobRack/Syroscape: $3.500–4.500 mjesečno, ispod praga;
  - Reach Realm: Meta;
  - Huzzle: Media Buyer, 3+ godine, contractor;
  - Typeform: samo UK;
  - Kaufland: Njemačka;
  - Acquire: Njemačka, 200+ prijava;
  - Londonske agencije: Hearts & Science, Omnicom, Ticketmaster, 3Search.
- **EOJN** (`new --since 2026-09-28`):
  - prethodno savjetovanje Hrvatskih autocesta za kampanju Crolibertas, €393.000, zatvara 06/10. Adaxa može ući samo kao digitalni partner medijske agencije;
  - novi ugovori: Terme Bjelovar, digitalno oglašavanje €8.500 (Go2Digital); DRŽAVNE NEKRETNINE €10.880 (24sata);
  - otvoreno: HP do 19/10, MPŠR praćenje medija do 09/10.
- Tablica: ništa (nema naloga). Mail na dakson2 nema odgovora poslodavaca; prijave idu na Darijevu drugu adresu, koja nije dostupna.

### 04/10/2026 · Codex · Status prijava i ciljani crawl 04/10
- Work/APPLIED C2:D43 i Z2:Z43: **16 otvorenih** sa statusom `Submitted` (7 od 16–17/09, 4 od 24/09 uključujući SolCrov bez datuma, 4 od 25/09, Puffy od 28/09). ennovationHUB je odbijen i izvan broja. Nije provjeravan inbox ni slanje follow-upova; broj je stanje evidencije.
- Ciljani crawl za najraniju objavu od 20/09 nadalje: javni rezultati Workable, Ashby i Greenhouse, te LinkedIn, Himalayas, Remote Rocketship, We Work Remotely i Working Nomads za otkrivanje; pojedini oglasi provjereni na poslodavčevu ATS-u gdje je bio dostupan. **0 novih preporuka** koje su prošle sve filtere i provjeru datuma/geografije; nije rađen puni API crawl svih boardova.
- Ispravak kandidata iz dnevnika 28/09: **Sweat Pants Agency — Senior Google Ads Buyer** nije nova rola od 27/09. Najraniji pronađeni trag iste role je **30/08/2026**; kopije po zemljama i noviji datumi agregatora ne resetiraju 14 dana. [Workable board](https://apply.workable.com/sweat-pants-agency/) · [trag 30/08](https://www.jobs.ca/sweat-pants-agency/jobs/senior-google-ads-buyer-dtc-ecommerce-remote-remote-osnabruck-lower-saxony-germany-9c6d16507d39). Ranije pripremljeno pismo nije poslano prema dnevniku; rola se ne preporučuje u ovom crawlu.
- Primjeri isključenih: [HeliosX Paid Search Lead](https://job-boards.eu.greenhouse.io/heliosx/jobs/4950883101) traži život/pravo rada u UK i London hybrid; [Mews Senior Paid Search Manager](https://www.mews.com/en/careers?team=technical) ima popis zemalja bez Hrvatske te stariji trag od 06/08; [KodeKloud Performance Marketing Lead](https://builtin.com/job/performance-marketing-lead/11206081) je India i uklonjen 29/09; [CoinPoker Paid Marketing Manager](https://www.ziprecruiter.de/jobs/601530631-paid-marketing-manager-global-bei-coinpoker) prvi trag 19/09, težište programmatic/social/native, ne Google Search. Egear, StubGroup, Powered by Search i OnHires već su u evidenciji/odlukama.
- Tablica: ništa nije mijenjano. [Work](https://docs.google.com/spreadsheets/d/15Do6cDJLu4CeBDsfnOpVzV1ZuO09pzHvNMsL54m7jt4/edit).

### 04/10/2026 · Codex · ennovationHUB odbijen / VOID; provjera baza i Drivea
- Work, APPLIED r38: `Priority` → `VOID - Dario 28/09/2026`; `Actions` → odbijenica, bez follow-upa; `STATUS` → `Rejected 28/09/2026`. Datum je dan Darijeve dojave; datum e-maila nije zasebno provjeren.
- Work, Found positions r16 (druga, svibanjska rola): `Availability status` pojašnjen kao ranije preskočen i tvrtka VOID; `Priority` → `VOID - Dario 28/09/2026`. Pri prvom upisu Y16 je greškom nakratko popunjen; odmah je vraćen na izvorno prazno stanje i provjeren (UPUTE §10 R3). Nije označeno da je svibanjska rola bila odbijena. ACTIVITY LOG r48 dodan je `CODEX-20261004-ENNOVATIONHUB-REJECT` u 2026-10-04T15:29:47.891Z. Bez duplikata.
- Base je provjeren kao profil/tagovi, bez izmjena. Drive ADAXA JOBS ima 43 stavke u glavnoj mapi, arhiva je prazna. Pokušaj premještanja pisma ennovationHUB (`1vGnUKtanW7HTKauq_xQoCVqnTxuh2CFud_ZU6ljai8I`) odbijen je s 403 `appNotAuthorizedToFile`; ono i ranije pripremljena 22 premještaja ostaju otvoreni. Nijedan dokument nije obrisan.
- Tablica: izravna Darijeva odluka, izvan W-naloga, prema UPUTE §3 i §10. [Work](https://docs.google.com/spreadsheets/d/15Do6cDJLu4CeBDsfnOpVzV1ZuO09pzHvNMsL54m7jt4/edit) · [Drive](https://drive.google.com/drive/folders/1PajW6-eCWfcWzfE-E-4AXSDmW1r_jaJ-).

### 03/10/2026 · Claude · Crawl 03/10 _(prepisano 12/10 iz `dakson2/adx-jobs`)_
- **Dario:** dok čekamo prijave, još jedan temeljiti crawl.
- **Izvori:**
  - osvježeno 1.628 ATS ploča (59.574 oglasa) i dodane 153 nove, uz dva nova tipa ATS-a (Pinpoint, Rippling);
  - agregatori, Himalayas HR (684), Remote Rocketship (1.124), Workable (1.466), Workday;
  - LinkedIn za zadnjih 48 sati (Hrvatska, EU i Europa: 1.631 rola; Worldwide: 846);
  - MojPosao (bez novih oglasa od petka navečer);
  - **novi izvor EURES** (2.275 hrvatskih oglasa iz zadnjih mjesec dana, uključuje HZZ).
- **Rezultat:** 881 jedinstveni paid/growth oglas u prozoru, od toga 57 novih od jučer.
  - Nova opcija: Chess.com, Senior Performance Marketing Manager (remote, 02/10).
  - Slabije: BarkleyOKRP (freelance paid search, 17/09) i Euro Janković Đakovo (voditelj marketinga).
  - Opcije od 02/10 su i dalje objavljene.
  - Ispali su Forbes Advisor (remote samo UK, SAD, Izrael), Silverback i People.ai (SAD), Preply (hibrid Barcelona/London), Peggy (Meta), Adhoq (affiliate dating) i Microblink (product marketing).
- **Tablica:** zapisano u W-002 repoa adx-jobs, koji nije izvršen. Od 12/10 ti su redovi u W-002 na ovoj grani.

### 02/10/2026 · Claude · Paket za Sweat Pants; drugi, temeljiti crawl _(prepisano 12/10 iz `dakson2/adx-jobs`)_
- **Sweat Pants Agency (opcija 1):** Dario je izabrao opciju 1 i time odobrio iznimku.
  - Pismo je napisano samo iz provjerenih činjenica, s jednom iskrenom prazninom (formalni geo holdout testovi).
  - [Drive dokument](https://docs.google.com/document/d/1XSLf7IzQrXkALN0XqyzRh42GZ6lI3A6JemkvyQq6m58/edit); PDF pisma (1 str.) i pismo + CV (3 str.).
  - Workable obrazac se nije mogao pročitati (HTTP 429), pa je Dario dobio vjerojatne odgovore.
  - Nije poslano; šalje Dario.
- **Drugi krug crawla** (Dario: „ne vraćaj se bez 7–10 relevantnih poslova”): LinkedIn u tri prolaza (4.073 jedinstvene role; Hrvatska, EU, Europa i EMEA; 62 ključne riječi), 1.440 ATS ploča i feedova (69.806 oglasa; 820 novih ploča pronađeno iz imena tvrtki s agregatora i LinkedIna), Himalayas HR (656), Remote Rocketship (1.327), Workable (2.504), Jobgether (4.354), MojPosao (svih 1.878 hrvatskih oglasa), posao.hr, DailyRemote, Arc.dev, RemoteFirstJobs, Jobspresso i ciljana web pretraga.
  - U prozoru je 971 jedinstveni paid/growth oglas, a ni jedna nova rola ne prolazi sva pravila (do 14 dana, remote za EU/HR ili hibrid u HR, senior, Google-first, provjereno na ATS-u).
  - Dario je dobio 7 najbližih opcija s oznakom što koja ne prolazi, i pitanje o dvije iznimke u pravilima (riješeno 12/10, UPUTE §4).
  - Najčešći razlozi ispadanja: remote samo za popis zemalja bez Hrvatske ili ured u inozemstvu (Magic, Typeform, Groupon, Cyncly, Constructor); njemački ili drugi lokalni jezik; Meta-first ili paid social (Prosana, Lucyd, Clario); stari oglasi (Preply Director of SEM od 30/04, Creatio od 22/07); preniska plaća (Mediboost); kockanje (MrQ, Betsson, ZEAL); AI-druženje (EverAI). Hrvatski oglasi na MojPoslu i posao.hr su juniorski ili bez Google fokusa.
- **Tablica:** zapisano u W-002 repoa adx-jobs, koji nije izvršen. Od 12/10 ti su redovi u W-002 na ovoj grani.

### 02/10/2026 · Dario / Claude · Adcubator odbijen, SolCrov razgovor, provjera oglasa, crawl 02/10 _(prepisano 12/10 iz `dakson2/adx-jobs`)_
- **Dario:**
  - Adcubator je odbio prijavu;
  - SolCrov je pozvao na razgovor u srijedu 07/10/2026 u 11:30.
- **Provjera oglasa za 16 aktivnih prijava** (na izvoru poslodavca):
  - SimpleTiger, OnHires i OnTheGoSystems (TPAS) više nisu objavljeni;
  - Powered by Search je 28/09 ponovo objavio istu rolu;
  - ostali su još objavljeni.

  Follow-upovi za prijave od 16–17/09 su na redu sada.
- **Crawl (prva objava od 18/09):** pretraženo je 808 ATS ploča (36.632 oglasa), agregatori, Himalayas HR (256), Remote Rocketship (647), 64 Workday tenanta, Workable (571) i LinkedIn (18 ključnih riječi × 4 lokacije, 2.399 rola).
  - Ni jedna nova rola ne prolazi sve filtere. Za odluku su Sweat Pants Agency (iznimka, prva objava 30/08) i The Audio Programmer (slabo).
  - Najčešći razlozi ispadanja: rola vezana uz jednu zemlju ili ured u inozemstvu (npr. Typeform Head of Acquisition Marketing je na njihovom ATS-u samo UK remote), njemački ili drugi lokalni jezik, Meta-first, preniska plaća, kripto kladionice.
- **Adaxa:**
  - Novo je prethodno savjetovanje Hrvatskih autocesta za kampanju Crolibertas (€393.000, primjedbe do 06/10), dodano kao PB-0056 (B).
  - Novi prostori kulture podigli su plan za 2026. za internet i društvene mreže na €26.500 (PB-0014).
  - TED donosi samo kampanje na lokalnim jezicima.
  - Na posao.hr se pojavio Superius (Pula), ali već radi s agencijom, pa je to slab signal.
- **Tablica:** zapisano u W-002 repoa adx-jobs, koji nije izvršen. Od 12/10 ti su redovi u W-002 na ovoj grani.

### 28/09/2026 · Claude · Novi CV, €7,8M svugdje, Puffy test i drugi crawl
- **CV:** novi glavni CV je `Dario_Suler_CV_2026.pdf` (Drive `1sYObHASxiW6o8PWTW2yfDgybhHHGaMEN`). Ima 2 stranice, redizajniran je, s AI sekcijom i datumima iz tablice ALL. Dario je odlučio da se svugdje koristi **€7,8M** mjesečno na vrhuncu; UPUTE §8 i §11 su ažurirane. Demand Gen i AI lokalizacija (DE/FR/JP) prebačeni su u provjerene činjenice; Algebra ostaje samo „Lecturer”, bez predmeta.
- **Puffy:** 28/09 u 07:03 stigla je pozivnica na skills assessment. Part 1 traje 34 min, proctored, bez AI-ja; Part 2 je case study od 30 min s AI-jem, upload jedne stranice. Rok je 30/09 u 07:03. Istraživanje tvrtke i priprema su u Google Calendar eventu (dakson2, 30/09 04:03–06:03). Tvrtka je stvarna, a lijevak automatiziran. Crvene zastavice: CEO-u je sud naložio da plati $400k dublinskom fondu, class action Webb v. Puffy zbog lažnih popusta, a na ovo mjesto stalno traže nove ljude (Head of PPC prije 11 mjeseci).
- **Drugi crawl 28/09** (prozor od 14/09):
  - izvori: LinkedIn 896, Jobgether 3.861, Remote Rocketship 774, Himalayas HR 401, Workable global 289, WWR i Working Nomads, 206 ATS boardova;
  - rezultat: 735 jedinstvenih marketinških rola, 162 ručno pregledane;
  - jedan kandidat za Darijevu odluku: **Sweat Pants Agency — Senior Google Ads Buyer, DTC eCommerce (Remote)**, Workable `BEA85FB812`, prva objava 27/09. Hiring je worldwide, uz pozive u US Eastern satima; plaća nije navedena;
  - slabiji: Cranberry Panda (Director, Meta-first, €150–200K), Mother's Earth (Head of Growth, Meta-first);
  - Dario je rekao da se ništa ne šalje dok se ne riješi Puffy.
- Tablica: ništa (nema naloga).

### 28/09/2026 · Codex · Drive pregled i pripremljeno čišćenje
- U glavnoj mapi ADAXA JOBS zatečena je 41 stavka. Trenutačni izvor pravila su `adx/UPUTE.md` i ovaj log na grani `claude/dario-adaxa-project-9u32ik`; Work i Base ostaju aktivne tablice.
- Stvorena je prazna [ARHIVA — stari pregledi i neaktivni paketi](https://drive.google.com/drive/folders/1QSVGrzQs4_b4ngrODJJKhZUHg33REXzh). **Nijedan postojeći dokument još nije premješten.** Drive konektor vraća `appNotAuthorizedToFile` za pisanje u postojeće datoteke; prijava u pregledniku nije dovršena. Premještanje ostaje otvoreno.
- Za postojeći `BIN - Dont Use` (4): HOWTO (`1ti-UjJ0PTdoyndFQTsWOarDFrU7LGFWsjAO4OI_YHjI`); ❌ ZASTARJELO 24-09 — UPUTE ZA DRUGI AI (20-09) — zamijenjeno novom verzijom (`1AqhCnyV-aSBLRSEfw3e6_XOyey4HzBVD7MIAQrRT2Sw`); ❌ NE ŠALJI — oglas zatvoren (not_found) — HILO by Aktiia PISMO v2 (`1wlY9T9XPk4rN_0E7Bnr4wxaTKHHG0b_8PHhQYFqQD_w`); ❌ ZASTARJELO 24-09 — NE KORISTITI (Hilo zatvoren, Fortis traži cloaking) — BULK SLANJE 21-09 (`1l1EUsZMMqHiBBORc-iG09ubTJvzQmE7UCakncEPfz5w`).
- Za novu arhivu (18): SLANJE — stanje 24-09-2026 (provjereno na izvoru poslodavca) (`1MrULs0FDHKdgvvD-IvdXRSsqyyYNccS8xhQ2njrKY80`); CRAWL 20-09 — filtrirano na 14 dana (`1kd3OS7cJqto3OvNmgLtqJBGgXTvzB5f8scu_dWQTdEY`); ZA SUTRA UJUTRO — 21-09-2026 (`1qBIByJC5YU_M--V8-YPrvtD_iwFjKh6qwdpi8a-oxpg`); PROVJERA POSLODAVACA — 20-09-2026 (`1gujA-wv2cbIvjJHU7-fKqIut4Z3skSJlpw9dpFRCCHA`); CRAWL 17-09 noćni — 18 novih rola za sutra (`1kLXDnpkV5eOLN8bc_xL4HAuePBfP84tIlDU_wmecpjA`); SEDAM POSLANIH 17-09-2026 — što je poslano i što je ostalo (`1NYNnXSkU9OIgq-3TQCCYC-xuXF0F0x-Mv8oJS0BvvyU`); SLANJE 17-09 — osam prijava, jedna po jedna (`1R22jbrjUQt_3CTSKBu9eOr7tqrqZJRd3yuV-ryC-EJU`); ADX — SVE ZA PRIJAVE 16-09-2026 (počni ovdje) (`1am8HWYV93z2pb9Hx6ZBUHw4DONk4dI6W0os5rX66hC8`); Base — BACKUP before ALL2 merge 2026-09-15 (`12E_CtcZQLw9tXmcItd_gtw7T8HOMpdrOiD6-EvbSE0Q`); Crawl (`1T1dfcjQrktkqbISl7MmF5aYslgKfIkusfqxFN4vA8DI`); Instructions (`1-i8_NyN48HcvuyuIR450kWSm3nllhwNH`); Dario Suler - Cover Letter - Easyship Head of Marketing (`12T-Piv7TQEcKxwUQqRQbZIwMd_kRAiRA_xBDFjwIoxI`); Dario Suler - Cover Letter - Appsilon Head of Marketing (`1yUI8iifgEQ69P4JvyrPFA_Z9PoveGLRI1m5h-jggIsk`); Dario Suler - Cover Letter - Pragmatike CMO (EMEA Remote) (`1-cEbJdNBgvOnxnVgY3i80OsYXsX1N6ARtP60ls9kKDk`); Dario Suler - Cover Letter - LottieFiles Head of Growth (`1w-8-_YF14AIfgnIF5n4mAquqC2-WyQeX6OduTXZKj98`); Dario Suler - Cover Letter - OnTheGoSystems Head of Marketing (`1gmqh2oPiKwa8IMwfKAyoRIg9U1orZlHs3LqSqmqmFtg`); Dario Suler - Cover Letter - ScraperAPI (saas.group) Growth Marketing Specialist (`1ig_wP86K0SHzmQPZEvReutZ0d3yHQDbI1xNEmTBZZqw`); Dario Suler - Cover Letter - Amplemarket Growth Marketing Manager (`1OUsssQS1OIOn2q0NLB4q5-ISeMccUX9asnS-sheuS3k`).
- Premještaj treba očuvati ID-jeve i dijeljenje te provjeriti roditeljske mape nakon svake skupine. Aktivna pisma, Work, Base, APPLIED mapa, CV paket i banka odgovora ostaju u glavnoj mapi. U dostupnom lokalnom radnom prostoru nema git checkouta `ImportJSON`; nema lokalnog sinkroniziranja. Pregled: 2026-09-28T04:33:16.848Z UTC.
- Tablica: ništa.

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
