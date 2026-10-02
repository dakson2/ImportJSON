# 1.ADX-Jobs — upute za rad

Vrijedi od 28/09/2026 za Darija i za svakog AI-ja na projektu (Claude, Codex ili bilo koji drugi).
Projekt ima **dva dokumenta**. Ovo je prvi, a drugi je [`ACTIVITY-LOG.md`](ACTIVITY-LOG.md).

- **Front A:** seniorske Google Ads, performance i growth role, remote ili dostupne iz Hrvatske. Cilj je 10 prijava dnevno.
- **Front B:** klijenti za Adaxa Agency.

---

## 1. Dva dokumenta i ništa više

| Dokument | Sadržaj | Tko piše |
|---|---|---|
| `adx/UPUTE.md` | Pravila, izvori, postupci. Mijenja se rijetko. | Claude ili Codex, uz zapis u dnevniku |
| `adx/ACTIVITY-LOG.md` | Nalozi za tablicu, otvorene odluke, follow-upovi, dnevnik rada | Claude i Codex |

- **Ne otvaraj nove `.md` datoteke.** Nema više zasebnih CODEX-PROMPT, STATUS i HANDOFF datoteka ni paketa. Novo pravilo ide ovamo, a novi događaj u log.
- Osim ta dva dokumenta u `adx/` ostaju samo:
  - `tools/eojn_monitor.py` (alat);
  - `data/eojn-buyers.json` (izlaz alata).
- Pisma, CV i PDF-ovi idu na Google Drive, ne u repo.
- Stari dokumenti obrisani su 28/09/2026. Ostaju u git povijesti (commit `010f96a` i stariji).
- Repo je `dakson2/ImportJSON`, grana `claude/dario-adaxa-project-9u32ik`, [PR #2](https://github.com/dakson2/ImportJSON/pull/2). Oba AI-ja rade na toj grani. Ostatak repoa (biblioteka ImportJSON) se ne dira.
- **Repo je javan:** u njega ne idu lozinke, tokeni, telefonski brojevi ni osobni e-mailovi.

## 2. Uloge

- **Dario** odlučuje:
  - bira kandidate po broju;
  - odobrava iznimke;
  - sam šalje prijave;
  - bira koje će Adaxa leadove kontaktirati.
- **Claude** radi u repou, Gmailu, na Driveu i webu, ali **ne može pisati ćelije u Work**. Zadaci:
  - crawl i provjera oglasa;
  - numerirana lista kandidata;
  - pisma na Driveu i Gmail nacrti;
  - Adaxa istraživanje i EOJN monitor.

  Sve što treba ući u tablicu Claude priprema kao nalog u `ACTIVITY-LOG.md`.
- **Codex** (ili bilo koji AI s pravom pisanja u Work) izvršava naloge iz `ACTIVITY-LOG.md` točno kako pišu i u logu potvrđuje što je upisao.

## 3. Protokol loga

**Na početku rada (svi):** `git pull` grane. Zatim u `ACTIVITY-LOG.md` pročitaj odjeljak **Otvoreno** i zadnjih nekoliko zapisa **Dnevnika**.

**Nalozi za tablicu (`W-###`):**
1. Claude sve upise za tablicu stavlja u nalog `W-###` u odjeljku *Otvoreno → Nalozi za tablicu*. Nalog ima:
   - status;
   - korake;
   - payload u JSON-u, u kojem su ključevi nazivi stupaca.
2. Najviše **jedan** nalog smije biti `PENDING`. Novi upisi idu u njega dok ga Codex ne preuzme, pa se nalozi ne gomilaju kao 25–28/09.
3. Prije početka Codex mijenja status u `IN PROGRESS · Codex · <UTC>` i to commita, ako može. Nalog u statusu `IN PROGRESS` Claude više ne dira, nego nove upise stavlja u novi nalog.
4. Kad završi, Codex:
   - mijenja status u `APPLIED · <UTC>`;
   - upisuje izvještaj: koji su redovi upisani ili promijenjeni u svakom koraku, te što je preskočeno i zašto;
   - briše payload iz loga (ostaje u git povijesti);
   - premješta nalog u Dnevnik, s izvještajem.
5. Ako Codex ne može commitati u repo, izvještaj daje Dariju, Dario ga zalijepi Claudeu, a Claude ga upisuje u log.
6. Ako Codex nešto promijeni u tablici mimo naloga (npr. na Darijev izravan zahtjev), dodaje zapis u Dnevnik.

**Dnevnik:** najnoviji zapis ide na vrh.

```
### dd/mm/yyyy · Claude | Codex | Dario · kratki naslov
- Što je napravljeno: činjenice i brojke, 1–4 retka.
- Tablica: W-### (PENDING/APPLIED) ili "ništa".
- Linkovi (Drive, ATS, EOJN) ako postoje.
```

Svaka promjena ovih uputa dobiva zapis u dnevniku („UPUTE §x: …”).

## 4. Front A — pravila za oglase

Filteri se primjenjuju ovim redom.

1. **Starost ≤ 14 dana**, računato od **najranije** objave iste role bilo gdje: u bilo kojoj zemlji, u bilo kojoj kopiji, na bilo kojem izvoru. Iznimke su moguće samo uz Darijevo odobrenje (SDG, Taxes for Expats, Genesis, OnHires, Puffy).
2. **Geografija:**
   - remote mora biti otvoren Europi ili Hrvatskoj;
   - hibrid samo u Hrvatskoj, prvenstveno Slavonija/Osijek;
   - hibrid drugdje u EU samo ako je dolazak otprilike jednom u 6–12 mjeseci.

   Ne dolaze u obzir:
   - remote vezan uz jednu zemlju („based in Spain”);
   - oglasi na njemačkom ili oni koji traže njemački.
3. **Senioritet:** senior ili više.
4. **Kanal:** težište je Google / paid search.
   - Meta, Microsoft i Amazon su sekundarni.
   - Native (Taboola, Outbrain, MGID) i čisti paid social su druga disciplina.
5. **Plaća:** referenca je ~€100.000 bruto godišnje. Raspon ispod pola reference je void, a ne predmet pregovora.
6. **Integritet:** odbij cloaking, anti-detect, izbjegavanje banova, nabavu računa ili Business Managera od resellera i siva tržišta.
   - Pročitaj **cijeli** tekst zahtjeva. Fortis Media je imao cloaking tek iza 1.500. znaka.
   - Tracker sam po sebi (Voluum, Keitaro, Binom) nije prekršaj.
7. **Jedna aktivna prijava po tvrtki.** Ako tvrtka već ima prijavu u APPLIED koja nije Rejected ni Closed, ne predlaži drugu rolu (Infobip, 26/09). Popis aktivnih prijava je u logu.
8. **Darijeve odluke su konačne.** Rola označena `VOID` ili `Skip` ne vraća se na listu.

**Provjera:**
- **Provjereno znači pročitano na ATS-u poslodavca** ili u indeksu tog ATS-a.
  - Agregatori služe samo za otkrivanje: LinkedIn, Himalayas, Remote Rocketship, Jobgether, Jobicy, nomado24, Working Nomads.
  - Ako se ATS ne može pročitati, rola je „neprovjerena” i tako se označava.
  - Primjer: Hilo by Aktiia bio je „živ” samo na agregatoru.
- Vjerodostojnost poslodavca (financiranje, broj zaposlenih, proizvod, recenzije) provjerava AI, ne Dario. Izvori su Crunchbase, Dealroom, Glassdoor, Clutch i Trustpilot, a nalaz ide u `Availability status`.

**Stalna pravila:**
- **TestGorilla je pauziran:** ne pripremaj ga, ne piši mu i ne spominji ga.
- **Kandidati idu Dariju kao numerirana lista:** broj, tvrtka, rola, datum prve objave i odakle je, geografija, zašto. Paket (pismo i odgovori iz forme) radi se samo za brojeve koje Dario izabere.
- Svaki Gmail nacrt za projekt dobiva oznaku **`1.2.ADX-JOB`** (`Label_24`).
- Nema Google Clouda (service accounti, API ključevi).
- Negativna tvrdnja o tržištu („nema rola”) mora nabrojati koji su izvori pretraženi.

## 5. Datumi — zamke

| Izvor | Zamka | Što napraviti |
|---|---|---|
| Workday lista | `postedOn: "Posted 30+ Days Ago"`, bez datuma | Per-job `/wday/cxs/<t>/<site>/job/...` daje `startDate`. Nedatirana ATS kopija uz noviju kopiju drugdje smatra se starom. |
| Breezy `/json` | `published_date` je datum ponovne objave | `/p/<id>/apply` daje `first_publish_date` (SDG: 21/09 u listi, prvo 27/07) |
| Himalayas | `pubDate` je datum osvježenja | Datum s ATS-a (Unifonic: 17/09 na Himalayasu, prvo 11/06) |
| LinkedIn | Datum oglasa je datum reposta | Datum s ATS-a (Infobip: „3 days ago”, `startDate` 12/08) |
| Workable agencije (Huzzle, JobRack, Creatunity) | Kopija po zemlji, nove zemlje dodaju tjednima kasnije | Grupiraj tvrtku i naziv, uzmi najraniji `created` |
| Greenhouse | Kopije po zemlji (DoiT: 16/09, a prva kopija 20/07) | Uzmi najraniju |
| DOU | Datum je osvježenje | ID vakancije raste ~200 dnevno (~374.500 na 24/09) |
| nomado24 | Datum može biti osvježenje | Datum s ATS-a |

## 6. Izvori i endpointi (Front A)

Redoslijed je po učinku.

1. **Workable global:** `https://jobs.workable.com/api/v1/jobs?query=<kw>&location=<zemlja>&pageToken=<tok>`
   - Pretražuje sve tvrtke na Workableu. Vraća `created`, `locations`, `workplace`, opis i zahtjeve.
   - Tempo ~1 upit/s, backoff 8 s / 16 s na HTTP 429.
   - Dan nakon teškog runa: 20 upita × 4 lokacije, 1 stranica, 4 s razmaka.
   - `curl` na pojedinačne Workable stranice dobiva Cloudflare 1015, pa koristi WebFetch ili API.
2. **Remote Rocketship:** stranice `https://www.remoterocketship.com/country/croatia/jobs/<slug>/`, `/country/europe/jobs/<slug>/` i `/jobs/<slug>/`.
   - Podaci su u `__NEXT_DATA__` → `props.pageProps.initialJobOpenings`.
   - Stranica prikazuje 20 oglasa, a `?page=2` ponavlja iste, pa crawlaj mnogo uskih slugova.
   - `locationCountries` je točan popis dopuštenih zemalja.
   - Tu su i `url` ATS-a, `created_at`, `requiredLanguages` i `salaryRange`.
3. **Himalayas s filtrom zemlje:** `https://himalayas.app/jobs/api/search?q=<kw>&country=Croatia&page=<n>`
4. **LinkedIn guest (samo otkrivanje):**
   - Pretraga: `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=<kw>&location=<Croatia|European Union|EMEA|Worldwide>&f_TPR=r1296000&start=<0,10,…>`. Vraća 10 kartica po stranici; `f_WT` se ignorira.
   - Detalj: `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/<id>` (opis, senioritet, broj prijava).
   - Tempo 2,5 s.
   - Uz obične ključne riječi dodaj i varijante `google ads remote`, `ppc remote`, `paid search remote`, `performance marketing remote`.
5. **ATS izravno i slug mining:** iz URL-ova svih agregatora izvuci slugove (regex) i povuci cijele boardove.

| ATS | Endpoint |
|---|---|
| Greenhouse | `boards-api.greenhouse.io/v1/boards/<org>/jobs?content=true` (EU: `boards-api.eu.greenhouse.io`). Jedan oglas: `/jobs/<id>?content=true` (`first_published`). Polja forme: `?questions=true`. |
| Ashby | `api.ashbyhq.com/posting-api/job-board/<org>`. Forma: POST `jobs.ashbyhq.com/api/non-user-graphql?op=ApiJobPosting`, query `jobPosting(organizationHostedJobsPageName, jobPostingId){id title isListed publishedDate applicationForm{sections{title fieldEntries{field isRequired}}}}` |
| Lever | `api.lever.co/v0/postings/<org>?mode=json`, EU: `api.eu.lever.co`. Tekst je u `description` i `lists`; `descriptionPlain` je prazan. |
| Recruitee | `<org>.recruitee.com/api/offers/` |
| SmartRecruiters | `api.smartrecruiters.com/v1/companies/<org>/postings?limit=100`. Vraća 200 i za nepostojeće tvrtke, pa filtriraj po sadržaju. |
| Workday | Lista: POST `/wday/cxs/<t>/<site>/jobs` s tijelom `{"appliedFacets":{},"limit":20,"offset":0,"searchText":"marketing"}`. Jedan oglas: GET `/wday/cxs/<t>/<site><externalPath>` (`startDate`, `remoteType`). |
| Teamtailor | `<org>.teamtailor.com/jobs.rss` ili `careers.<domena>/jobs.rss`. Stranica oglasa ima JSON-LD. |
| Personio | `<org>.jobs.personio.de/xml` (ili `.com/xml`) |
| Breezy | `<org>.breezy.hr/json`, zatim `/p/<id>/apply` za `first_publish_date` |
| BambooHR | `<org>.bamboohr.com/careers/list`, zatim `/careers/<id>/detail` (`datePosted`) |
| Workable board | `apply.workable.com/api/v1/widget/accounts/<org>` |

6. **Ostali izvori:**
   - Jobgether: `api.lever.co/v0/postings/jobgether?mode=json`. Poslodavac je skriven.
   - WeWorkRemotely RSS: `weworkremotely.com/remote-jobs.rss`, s punim opisom.
   - Working Nomads: `workingnomads.com/api/exposed_jobs/`.
   - Landing.jobs, devitjobs, Jobicy (s `tag=`).
   - DOU RSS: `jobs.dou.ua/vacancies/feeds/?category=Marketing`.
   - Toogeza (Ashby `toogeza`).
   - posao.hr (RSS).

**Slijepe ulice (ne testirati ponovo):**
- hiring.cafe (Cloudflare);
- mojposao.hr (403);
- Reddit JSON (403);
- RemoteOK RSS (410);
- WWR category feedovi;
- JOIN.com i Adzuna (traže ključ);
- justjoin.it (503);
- NoFluffJobs (405);
- SmartRecruiters global (404);
- nefiltrirani Himalayas feed.

DACH SEA role „100% remote” gotovo uvijek traže boravak u Njemačkoj i njemački.

**Tržište (stanje 28/09):** seniorske Google-first remote role otvorene Hrvatskoj su rijetke, a novi remote oglasi na LinkedInu uglavnom su na njemačkom ili vezani uz drugu zemlju. Pomaže širi opseg (hibrid u HR, susjedni kanali, Front B), a ne češći crawl.

## 7. Dnevni tijek — Front A

1. `git pull` i čitanje loga (§3).
2. Crawl s prozorom „prva objava ≥ danas − 14 dana”, po izvorima iz §6.
3. Filteri iz §4. Usporedi s aktivnim prijavama i s Darijevim VOID/Skip odlukama.
4. Provjeri rolu na ATS-u, datum po §5 i poslodavca.
5. Dariju pošalji numeriranu listu.
6. Za izabrane brojeve pripremi pismo (§8) i odgovore iz forme. Ako se prijava šalje mailom, napravi Gmail nacrt s oznakom.
7. Dario šalje prijavu i javlja. Claude upisuje zapis u dnevnik i nalog `W-###`: APPLIED red, DAILY CONTROL i ACTIVITY LOG.
8. Kad Dario proslijedi odbijenicu: `STATUS` postaje `Rejected dd/mm/yyyy`, a u `Actions` se dodaje zabilješka.
9. Follow-up oko 14 dana nakon slanja; raspored je u logu. `Waiting` bez odgovora dulje od 3 mjeseca postaje `NO REPLY - CLOSE` (Dario, 25/09).

## 8. Pisma

**Postupak:**
1. Drive `create_file`: markdown postaje Google Doc u glavnoj mapi projekta (`1PajW6-eCWfcWzfE-E-4AXSDmW1r_jaJ-`).
2. PDF: `download_file_content` s `exportMimeType: application/pdf`, pa base64 decode.
   - Za spajanje koristi pypdf; prije importa postavi `sys.modules['cryptography']=None`.
3. Pismo ima **1 stranicu**. Ako forma nema polje za pismo, pismo i CV spajaju se u jedan PDF.
4. Za ispravak sadržaja napravi novi dokument, a stari ukloni s `trash_file`. `update_file` mijenja samo naslov i mapu.
5. CV: `Dario_Suler_CV_2026.pdf` (Drive `1sYObHASxiW6o8PWTW2yfDgybhHHGaMEN`, od 28/09/2026). Stari `Dario_Suler_Ultimate_CV.pdf` (`13-k6kp3so90pImf7E_xyHKNjfJQARQAu`) više se ne koristi jer navodi >€5M.
6. Zaglavlje (ime, grad, e-mail, telefon, LinkedIn) kopiraj iz zadnjeg pisma na Driveu (Puffy, 28/09). Ne upisuj ga u repo.
7. Plaća, kad forma pita: „€100,000 annual gross, flexible depending on final scope, bonus structure and contract setup”.

**Provjerene činjenice (smiju se koristiti):**
- 15+ godina iskustva, od toga 10+ godina Google Ads kao primarni kanal (od 2014., logIT).
- Osobno vođeno do ~€2,5M mjesečno na Google Adsu.
- EMEA/APAC za međunarodnu e-commerce grupu, preko Adaxe:
  - usmjeravao 15+ agencijskih PPC specijalista u višerazinskom MCC-u;
  - izvještavao regionalne voditelje;
  - regionalna odgovornost za plaćene medije do **€7,8M mjesečno na vrhuncu** (Dario, 28/09/2026). Ovu brojku koristi svugdje, u CV-u, pismima i formama; „>€5M” se više ne koristi.
- RSA feed po kampanji, koji skripta učitava svaki sat.
- Sustav za praćenje SERP-a: Google Ads + Apps Script + GPT.
- Iskustvo s politikama osjetljivih kategorija.
- Mjesečni budžeti na drugim kanalima:
  - Meta ~€500K;
  - LinkedIn ~€30K;
  - TikTok ~€20K;
  - uz to Microsoft/Bing.
- Rent-a-car u Dubrovniku: oko +30%. Kasniji zastoj ROAS-a pronađen je u strukturi flote.
- 3 javna custom GPT-a; Claude Code za scrapere; Codex za web i landing stranice.
- Reseller hosting posao.
- Osnivač Digital Point HR; Adaxa.
- Predavač na Algebri. **Predmet nije provjeren, ne navoditi ga.**
- GA4, GTM, Looker Studio, Tableau, Google Sheets, Apps Script.
- B2B iskustvo preko Adaxe.
- Demand Gen i YouTube (Dario, 28/09/2026).
- AI lokalizacija oglasa i PPC materijala za DE, FR i JP, uz ljudsku provjeru (Dario, 28/09/2026).

**Ne tvrditi (nije provjereno):**
- SQL, BigQuery, pLTV;
- AppsFlyer/Adjust, offline conversion import;
- Apple Search Ads, Reddit/Quora Ads, Microsoft Audience Network;
- zapošljavanje ljudi (hiring);
- subscription aplikacije, incrementality, kreativni sustavi, high-AOV;
- EU državljanstvo;
- „taught digital marketing”.

## 9. Front B — Adaxa

U Work postoje dvije kartice:
- **ADAXA LEADS:** kvalificirani leadovi s ID-jem `L-0001`…
  - Novi red ide u **prvi red s praznim `Lead ID`**.
  - Checkboxovi `LinkedIn visited`, `Adaxa Web visited` i `Form submitted` unaprijed su postavljeni na FALSE do reda 1000.
- **ADAXA JAVNA NABAVA:** javni naručitelji s ID-jem `PB-0001`…, 25 stupaca.
  - Karticu stvara nalog W-001.
  - Veza prema leadu je stupac `Adaxa Lead ID`.

**Izvori:**
1. **EOJN monitor** (`adx/tools/eojn_monitor.py`, samo stdlib):
   - `python3 adx/tools/eojn_monitor.py new --since YYYY-MM-DD` pokreće se svaki crawl dan, od datuma zadnje provjere. Ispisuje:
     - nove ugovore (po `InitialPublishTimestamp`);
     - otvorene postupke;
     - prethodna savjetovanja;
     - stavke planova 2026–2027 promijenjene od tog datuma.
   - `refresh [--since 2024-01-01]` ponovo gradi `adx/data/eojn-buyers.json` iz registra ugovora. Pregleda ~5.150 ugovora i razvrstava ih:
     - G = Google Ads / tražilice;
     - D = digitalno oglašavanje na platformama;
     - P = portali;
     - S = društvene mreže;
     - M = marketing.

     Oglasi za posao su isključeni.
   - `buyer "<naziv>"` ispisuje sve ugovore, stavke planova i postupke jednog naručitelja.
2. **EOJN API ručno:**
   - Otvori bilo koju eojn.hr stranicu s cookie jarom i pročitaj `<input id="uiUserToken" value>`.
   - Zatim `GET https://eojn.hr/api/searchgrid/<Grid>/get?skip&take=200&requireTotalCount=true&sort&filter` sa zaglavljem `UserToken`.
   - Filter je u DevExtreme sintaksi, npr. `[["CPVExtended","startswith","7934"],"or",["Name","contains","oglaš"]]`.
   - Stranica ima najviše 200 redova, pa straniči po broju vraćenih.
   - Sortiraj po `Id`: sort po datumu daje duplikate i preskače redove.

| Grid | Sadržaj | Polja | Detalj |
|---|---|---|---|
| `TendersAll` | postupci | `Name`, `ContractingBody`, `EstimatedValue`, `SubmissionDeadline`, `CPVExtended` | `/tender-eo/<Id>` |
| `PlanItemsPublic` | planovi nabave | `PlanCA`, `PlanTenderName`, `PlanItemEstimatedValue`, `PlanItemStatusName`, `ProcPlanId` | `/plan-eo/<ProcPlanId>` |
| `VContractRegisterPublic` | potpisani ugovori | `CAName`, `TenderName`, `ContractorName`, `TotalValue`, `ContractDate`, `InitialPublishTimestamp` | `/contract-eo/<Id>` |
| `PriorConsultationsAll` | prethodna savjetovanja | | `/prior-consultation-eo/<Id>` |

   - **Status stavke plana nije pouzdan.** Prije nego što stavku proglasiš otvorenom, provjeri `VContractRegisterPublic` za istog naručitelja. Narodne novine imaju stavku „Planirano”, a ugovor je potpisan 21/01/2026 s ARBONA.
   - Prethodno savjetovanje je najraniji javni signal velikog natječaja, nekoliko tjedana prije postupka.
   - Za dokumentaciju natječaja treba registracija, a gridovi i stranice detalja rade i bez nje.
3. **TED:** `POST https://api.ted.europa.eu/v3/notices/search`, bez ključa.
   - Radi upit po CPV kodovima: `classification-cpv IN (79341000 79341400 79341200 79342000 79342200) AND buyer-country IN (HRV SVN BIH SRB HUN AUT) AND publication-date>=YYYYMMDD`.
   - Slobodni tekst (`FT~`) ne vraća ništa.
   - Natječaji su uglavnom full-service medijski, pa Adaxa ulazi kao digitalni podizvođač ili partner.
4. **Google Ads Transparency** pokazuje što naručitelj trenutno prikazuje:
   - `POST https://adstransparency.google.com/anji/_/rpc/SearchService/SearchCreatives?authuser=0`;
   - form polje `f.req={"2":100,"3":{"12":{"1":"<domena>","2":true}},"7":{"1":1,"2":0,"3":2}}`;
   - formati: 1 = tekst (search), 2 = slika, 3 = video.
5. **Podaci o tvrtki:** CompanyWall ili stranica transparentnosti naručitelja.
6. **Oglasi za posao kao leadovi:** tvrtka koja u Hrvatskoj traži PPC ili marketing osobu može umjesto zaposlenja kupiti uslugu (Falkensteiner, Foxelli). Talent marketplace (Lago/HireLago) nije lead.
7. **Freelancer.com API** (`/api/projects/0.1/projects/active/?query=<kw>&full_description=true`) ima malu vrijednost i služi samo za praćenje.

**Pravila:**
- **Pragovi jednostavne nabave odlučuju koga naručitelj pita.** Primjer su pravila Zračne luke Osijek od 01/09/2026:
  - do €15.000 marketing sam šalje upit jednoj ili više tvrtki po izboru;
  - od €15.000 do €25.000 nabava ide kroz EOJN modul, s najmanje tri pozvana ponuditelja;
  - iznad €25.000 nabava se objavljuje u EOJN modulu.

  Ispod prvog praga nepoznatog dobavljača nitko ne pita, pa kontakt mora doći **prije** kupnje.
- **Tajming:** siječanj je najčešći mjesec potpisa (43 od 118 ugovora ponavljajućih Google/digital kupaca od 2024.; 60 % pada u siječanj–ožujak). Kontakt za sljedeću godinu ide u listopadu–prosincu.
- Naručitelja ili tvrtku kontaktiramo tek kad Dario izabere lead. AI priprema kratki audit (Ads Transparency) i poruku.

## 10. Pisanje u tablicu Work (Codex i svaki AI s pravom pisanja)

- **R1.** Neposredno prije pisanja ponovo pročitaj živo zaglavlje i relevantne retke. Mapiraj **po nazivu stupca**, nikad po poziciji. Ako naziv iz payloada ne postoji, zaustavi taj korak i prijavi.
- **R2.** Nikad ne prepisuj nepraznu ćeliju, osim onih koje nalog izričito imenuje.
- **R3.** Ne pokreći stare ops batcheve iz git povijesti. Ne diraj stupac Y u `Found positions` ni stupac G u `Job sites`.
- **R4.** Formati:
  - datumi kao tekst `dd/mm/yyyy`;
  - `Fit score` i EUR stupci kao brojevi;
  - checkboxovi kao TRUE/FALSE;
  - ostalo kao običan tekst.
- **R5.** `<current UTC ISO time>` zamijeni stvarnim UTC vremenom u trenutku pisanja.
- **R6.** Dedupe: red s istim Company + Job title (APPLIED, Found positions) ili istim ID-jem (`Lead ID`, `Buyer ID`, `Activity ID`, `Date` u DAILY CONTROL) ne dodaje se ponovo, nego se prijavi.
- **R7.** U ADAXA LEADS piši u prvi red s praznim `Lead ID`, a ne iza „zadnjeg popunjenog”, jer su checkboxovi popunjeni do reda 1000.
- **R8.** U ACTIVITY LOG samo se dodaje. Redovi se nigdje ne brišu; duplikati se označavaju.
- **R9.** Na kraju napiši izvještaj po koracima: što je upisano ili promijenjeno i što je preskočeno i zašto (§3).

| Kartica | Namjena | Ključ / napomena |
|---|---|---|
| WORK QUEUE | Zadaci AI-ja | `Queue ID` (A1 je bio „ovo sve ”; W-001 ga vraća). `Q-20260911-DARIO` = Front A, `Q-20260911-ADAXA` = Front B |
| DAILY CONTROL | Jedan red po danu | `Date`; `Front A target` 10 |
| APPLIED | Poslane prijave | Company + Job title. `STATUS`: `Submitted dd/mm/yyyy`, `Rejected dd/mm/yyyy`, `NO REPLY - CLOSE`, `CLOSED` |
| Found positions | Pronađene role | Company + Job title. `Priority` npr. `VOID - Dario dd/mm/yyyy`, `Skip - Dario dd/mm/yyyy`. Stupac Y je zaštićen. |
| ACTIVITY LOG | Dnevnik u tablici | `Activity ID`: `CLAUDE-yyyymmdd-<OZNAKA>` / `CODEX-yyyymmdd-<OZNAKA>` |
| ADAXA LEADS | Front B leadovi | `Lead ID` `L-####` |
| ADAXA JAVNA NABAVA | Javni naručitelji | `Buyer ID` `PB-####` |
| Listings, Employers, Job sites, Crawl | Pomoćne kartice | Stupac G u `Job sites` je zaštićen |

## 11. ID-jevi i linkovi

- Work: https://docs.google.com/spreadsheets/d/15Do6cDJLu4CeBDsfnOpVzV1ZuO09pzHvNMsL54m7jt4
- Base (tagovi; `All` ima 481 red): https://docs.google.com/spreadsheets/d/1JoqSmuT4TengPkDyLbngv7V2E0WM715kk59bvOos5Ks
- Glavna mapa projekta na Driveu: `1PajW6-eCWfcWzfE-E-4AXSDmW1r_jaJ-`
- CV na Driveu: `1sYObHASxiW6o8PWTW2yfDgybhHHGaMEN` (`Dario_Suler_CV_2026.pdf`)
- Gmail oznaka: `1.2.ADX-JOB` (`Label_24`)
- Repo: https://github.com/dakson2/ImportJSON/tree/claude/dario-adaxa-project-9u32ik/adx
- Formati ID-jeva:
  - nalog za tablicu `W-###`;
  - lead `L-####`;
  - javni naručitelj `PB-####`;
  - zapis u ACTIVITY LOG `CLAUDE-yyyymmdd-<OZNAKA>`.
