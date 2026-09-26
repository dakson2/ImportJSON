# Crawl workflow v2 — verified sourcing

Replaces the v1 method (mining search-result snippets). Effective 20/09/2026, when outbound
network access was opened and `WebFetch` started working.

**The rule that changes everything: open the posting before you recommend it.**
Under v1, roles reached Dario unverified and four of them — Whatnot, Impact Brands, EER Poland,
Henry Schein — died on contact with their own posting pages, one of them after a letter had
already been written. That failure mode is closed. A role that has not been opened is a lead,
not a recommendation, and must be labelled as such.

## Sources, in order of yield

Structured APIs first. They return posting dates, which snippets do not.

| Source | Endpoint | Notes |
| --- | --- | --- |
| Jobgether | `api.lever.co/v0/postings/jobgether?mode=json` | ~3,900 postings, 39MB. Highest yield. `createdAt` is epoch ms. Employer is undisclosed ("listed on behalf of a partner company"). |
| Any Lever board | `api.lever.co/v0/postings/<org>?mode=json` | Same shape. |
| Any Greenhouse board | `boards-api.greenhouse.io/v1/boards/<org>/jobs?content=true` | |
| Any Workable board | `apply.workable.com/api/v1/widget/accounts/<org>` | `published_on` per job. **See trap below.** |
| Arbeitnow | `arbeitnow.com/api/job-board-api` | EU-heavy, German market. ~250 detailed records. |
| Jobicy | `jobicy.com/api/v2/remote-jobs?count=50&tag=<kw>` | `tag=` works; `industry=` does not filter. Run several keyword queries and dedupe. |
| Himalayas | `himalayas.app/jobs/api?limit=20` | Cursor pagination, hard-capped at 20/page against ~105k jobs. Not worth paginating. |
| Remotive / RemoteOK / TheMuse | public APIs | Truncated free tiers, 20–99 records. Low yield. |
| Croatian tier | mojposao.hr · posao.hr · adorio.hr · hr.jooble.org · poslovi.infostud.com | Thin. posao.hr's whole Marketing/PR category ran to 10 ads nationwide on 20/09. |

### Traps

- **Workable via `curl` returns `error code: 1015`** — Cloudflare rate limit, and it stays sticky.
  `WebFetch` reaches the same pages. Use `WebFetch` for Workable, `curl` for everything else.
- **Board HTML is JS-rendered.** RemoteOK, WeWorkRemotely, mojposao.hr and Himalayas all return
  empty shells to `WebFetch`. Go to their APIs or skip them.
- **`descriptionPlain` is empty on Lever.** The text lives in `description` (HTML) and `lists`.
  Strip tags from both or the keyword search silently matches nothing.
- **Aggregator dates lie.** Henry Schein showed a "6 October deadline" on an aggregator and
  07/04/2026 on the employer's own Workday page. Trust the employer's page only.

## Filters, applied in this order

1. **Age** — posted within 14 days. Standing rule of 20/09. No exceptions; Easygenerator was
   voided at 72 days and it was the best content match in the project.
2. **Geography** — must satisfy one of:
   - fully remote and open to Europe or Croatia specifically;
   - hybrid or on-site **in Croatia**, primarily Slavonia or Osijek;
   - hybrid elsewhere in the **EU** only where on-site presence is required roughly once every
     6–12 months. Two or three office days a week in a foreign city is relocation, not hybrid,
     and is out of scope.
   A country-locked posting ("based in Spain", "Dublin-based") is out even when it says remote.
3. **Seniority** — the seat must be at or above senior. A 2+ years midweight role is out even
   when the contract shape is perfect.
4. **Channel** — Google and paid search are the centre of gravity. Meta, Amazon and Microsoft
   are real but secondary. Native (Taboola, Outbrain, MGID) and paid-social-only roles are a
   different discipline and score accordingly.
5. **Compensation** — ~€100,000 annual gross is the reference. An hourly rate in single-digit
   dollars, or a band under half the reference, is void rather than negotiable.
6. **Integrity** — reject any posting requiring anti-detect software, cloaking, trackers for
   policy circumvention, or comparable evasion, whatever the fit score. Added 20/09 after a
   Google Media Buying Team Lead role matched on every other axis and demanded exactly that.

## Employer verification — Claude's job, not Dario's

Standing instruction from 20/09. Before a role is recommended, establish that the employer is
real and solvent: funding and investors, headcount, product, review presence. Crunchbase,
Dealroom, PitchBook, Tracxn, CB Insights, Glassdoor, Clutch, Trustpilot. Record what was
checked in `Availability status`, and say plainly when something could not be established.

## What the 20/09 crawl actually found

~4,100 dated postings → ~80 PPC/paid-media within 14 days → 12 Europe-eligible → **1** surviving
every filter.

Of 3,879 Jobgether postings, 45 mention Google Ads or paid search within 14 days and **none** is
EU-remote at this seniority. The live ones are US, Brazil, India, or country-locked. This is a
supply finding, not a method failure: the EU-remote senior Google Ads segment is close to empty,
and no crawling technique will produce 10 qualified roles a day from it. The lever is scope —
hybrid, Croatian tier, adjacent channels, Front B — not crawl frequency.

---

## Addendum, 20/09 evening — ATS-direct querying

Highest-yield technique found so far, and it was not in v1. Probe company ATS endpoints directly
instead of waiting for aggregators to carry the posting.

```
Greenhouse     https://boards-api.greenhouse.io/v1/boards/<org>/jobs?content=true
Greenhouse EU  https://boards-api.eu.greenhouse.io/v1/boards/<org>/jobs?content=true
Ashby          https://api.ashbyhq.com/posting-api/job-board/<org>
Lever          https://api.lever.co/v0/postings/<org>?mode=json
Recruitee      https://<org>.recruitee.com/api/offers/
SmartRecruiters https://api.smartrecruiters.com/v1/companies/<org>/postings?limit=100
Workday (list)  POST https://<t>.wdN.myworkdayjobs.com/wday/cxs/<t>/<site>/jobs
                body: {"appliedFacets":{},"limit":20,"offset":0,"searchText":"marketing"}
Workday (one)   GET  https://<t>.wdN.myworkdayjobs.com/wday/cxs/<t>/<site><externalPath>
```

All answer unauthenticated. Probe a curated org list in parallel with `xargs -P 10` and keep the
boards that return content.

- **SmartRecruiters returns HTTP 200 for companies that do not exist.** Filter on content, not
  on status code, or you will count 108 boards where 2 exist.
- **Workday's list endpoint gives `postedOn` as a bucket** ("30+ Days Ago"). The per-job endpoint
  gives `startDate` and `remoteType` exactly. Always follow through to the per-job call before
  applying the 14-day rule — that is the difference between "30+ days" and a usable date.
- Pull `?content=true` once per board and read work model locally. Cheaper and faster than
  fetching each posting, and it is how "hybrid, 1-2 days at the office" was caught across the
  whole DEPT board in one pass.

**Yield on 20/09:** 9,700 postings across 87 boards → 112 paid-media roles within 14 days → 2
usable, both Croatian, both found only because hybrid had been opened hours earlier.

---

## Addendum 2, 20/09 late — the Workable global search API

**Run this first, before anything else.** It is the single highest-yield source found, and it is the
layer that produced the first Croatia-eligible roles in the project.

```
https://jobs.workable.com/api/v1/jobs?query=<kw>&location=<country>&pageToken=<tok>
```

Searches **every company hosted on Workable**, not one board. Returns `created`, `locations`,
`workplace`, `employmentType`, full `description` and `requirementsSection` — so work model,
years and salary can all be read locally without fetching a single page. Paginate with
`nextPageToken`. 337 paginated calls across 20 queries × 19 country locations returned 2,204
unique postings.

This matters because **small agencies and SMEs do not syndicate to Remotive, RemoteOK or
Himalayas.** They post on Workable and nowhere else. Two crawls that searched only aggregators and
named company boards concluded the market was exhausted. It was not — the employer class had never
been queried.

### Also newly productive

| Source | Endpoint |
| --- | --- |
| Working Nomads | `workingnomads.com/api/exposed_jobs/` |
| Landing.jobs | `landing.jobs/api/v1/jobs?limit=100` |
| devitjobs | `devitjobs.com/api/jobsLight` (2,891 records) |
| WeWorkRemotely | `weworkremotely.com/remote-jobs.rss` |

**The WWR RSS carries the FULL job description in the item body.** WeWorkRemotely returns HTTP 403
to page fetches, so the RSS is the only way in — and it is a better way, because the whole posting
arrives in one request and is read locally.

### Dead ends — do not spend time re-testing

SmartRecruiters has no global postings endpoint (404). JOIN.com and Adzuna need API keys.
justjoin.it returns 503. NoFluffJobs rejects the search shape with 405. Teamtailor's per-company
`.json` is not public. RemoteOK's RSS is retired (HTTP 410). WeWorkRemotely **category** feeds
301-redirect to nothing — only the root feed works. Himalayas caps at 20 per page against ~105k
jobs, so pagination is not viable.

### Standing correction

On 20/09 this session twice concluded that the EU market was exhausted, on the strength of
aggregator and per-company-ATS searches alone. Dario rejected that conclusion and instructed a
wider search. Four new usable roles appeared within the hour.

**A negative claim about supply requires a named, exhausted source list.** State which layers were
searched before saying a market is empty. The narrower claim that survives: fully-remote, EU-wide,
senior *Google Ads* seats at the €100,000 level remain close to empty. That is not the same
statement, and the difference is four roles.

---

## Addendum 3, 24/09 — verification rules that were broken, and three new sources

### Two rules, written because this session broke both on 20/09

**1. Verified means read on the employer's own ATS, or in that ATS's own index.** Aggregators —
resumebuilder.careers, Jobicy, nomado24, Remote Rocketship, Working Nomads — are *discovery*, never
verification. Hilo by Aktiia was reported "verified live, posted 16/09" on the strength of an aggregator
while every Workable fetch returned an empty JS shell. It was not live. When the employer page will not
render, query the ATS index instead (`jobs.workable.com/api/v1/jobs?query=<company>`, Greenhouse/Ashby/
Lever board APIs, Workday per-job endpoint). If neither works, the role is *unverified*, and says so.

**2. Read the whole requirements section before an integrity verdict.** Fortis Media's 6,906-character
requirements were judged on their first 1,500 characters; the cloaking requirement sat further down.
Search the full text for `cloak`, `anti-detect`, ban evasion, account farming, and acquiring Business
Managers or ad accounts "from vendors/resellers when standard access is limited". A tracker named on its
own (Voluum, Keitaro, Binom) is **not** an integrity failure — trackers are ordinary in affiliate and native
work. It becomes one only alongside cloaking or account-evasion language, as it did at Fortis.

### Posting age: the earliest appearance wins

Recruiters on Workable (Huzzle, JobRack, Creatunity) post **one copy of the same role per country**, and add
countries weeks later. Huzzle's *Media Buyer* showed a 21/09 Croatia posting; the role was first published
**12/06**. Group by company + normalised title and take the **earliest** `created` across every country copy.
The same trap on DOU: the date shown is the last refresh. DOU vacancy IDs run at roughly 200 per day in
September 2026 (IDs ~374,300–374,500 on 23–24/09), so an ID 12,000 lower is about two months old whatever
date the page shows.

### New sources

| Source | How | Why it matters |
| --- | --- | --- |
| **Remote Rocketship** | Server-rendered pages carry `__NEXT_DATA__` → `props.pageProps.initialJobOpenings`. Only 20 per page are rendered and `?page=2` repeats them, so crawl many narrow pages: `/country/croatia/jobs/<slug>/`, `/country/europe/jobs/<slug>/`, `/jobs/<slug>/`. | Each opening has **`locationCountries`** — the exact list of eligible countries — plus the direct ATS `url`, `created_at`, `requiredLanguages`, seniority flags, `salaryRange` and a `ghostScore`. 210 pages → 1,026 unique openings on 24/09. Best single filter for "is Croatia actually allowed". |
| **nomado24.de** | `/en/remote-jobs/marketing` and job pages | Tags roles EU/EMEA vs Worldwide vs Germany-only. Dates can be refreshes (EverAI showed 24/09; original 31/08). |
| **DOU (Ukraine)** | `jobs.dou.ua/vacancies/feeds/?category=Marketing` RSS | Ukrainian product companies and agencies, many roles in English and open "за кордоном" (abroad). Use the vacancy ID for age. |
| **Toogeza** | Ashby board `toogeza` | Ukrainian recruiter placing Europe-remote leadership roles for product startups. |
| **posao.hr** | RSS and server-rendered category/city pages | Works — and confirms the Croatian market: ~12 real marketing ads nationwide on 24/09, **zero** in Osijek. |

### Market notes worth not re-learning

- **DACH "100% remote" SEA roles** (Tomorrow Education, hurra.com, celebrate company, Digital Career
  Institute) are almost always **Germany residency plus fluent German**. They look ideal in English
  summaries and fail on both counts in the original.
- **"Worldwide" on an aggregator is not the employer's word.** Found (weight-care telehealth) was tagged
  worldwide; its own Ashby board says USA/Canada. Magic's *Paid Search Manager* was tagged Europe; the
  employer says Mexico only, ET hours.
- The Workable global API rate-limits at roughly one request per second. Pace at 1.2 s with 8 s/16 s backoff
  on HTTP 429; expect ~25 minutes for 24 queries × 18 locations.

---

## Addendum 4, 25/09 — four more public ATS feeds, slug mining, and Himalayas' country filter

### Public feeds that were missing from the endpoint list

| ATS | Endpoint | Notes |
| --- | --- | --- |
| Teamtailor | `https://<org>.teamtailor.com/jobs.rss`, or `https://careers.<company>/jobs.rss` on a custom domain | **Public.** This corrects the Addendum 2 dead-end entry, which covered only the `.json`. Items carry `pubDate`, `remoteStatus`, `tt:locations` and the full description. |
| Personio | `https://<org>.jobs.personio.de/xml` (or `.com/xml`) | `createdAt`, office, seniority, years of experience, full description. A redirect to `personio.com` means the org slug does not exist. |
| Breezy | `https://<org>.breezy.hr/json` | `published_date` and a location object with `is_remote`. No description. |
| BambooHR | `https://<org>.bamboohr.com/careers/list`, then `/careers/<id>/detail` | The list has **no dates**; the detail call gives `datePosted`. |
| Lever EU | `https://api.eu.lever.co/v0/postings/<org>?mode=json` | EU-hosted Lever tenants are invisible on `api.lever.co`. |

### Slug mining — the ATS-direct layer, generalised

Every aggregator payload (Remote Rocketship, Jobgether, Jobicy, WWR, Working Nomads, the 20/09 files) contains apply
URLs. Regex them for `jobs.ashbyhq.com/<org>`, `boards.greenhouse.io/<org>`, `jobs.lever.co/<org>`, `<org>.teamtailor.com`,
`<org>.jobs.personio.de`, `<org>.breezy.hr`, `<org>.recruitee.com`, `jobs.smartrecruiters.com/<org>`, `<org>.bamboohr.com`
and Workday tenants. Then pull each board whole. On 25/09 this gave 652 slugs, 308 live boards and 15,043 postings. It also
finds employers that posted a second role the aggregator never carried.

A curated list of 541 employer names, probed across all 12 endpoints, gave 323 more boards. The probe code is in the
scratchpad under `c25/probe25.py`.

### Himalayas has a country-eligibility filter

`https://himalayas.app/jobs/api/search?q=<kw>&country=Croatia&page=<n>` returns only roles open to Croatia: worldwide ones,
plus those whose `locationRestrictions` list Croatia. On 25/09, 24 keywords returned 349 unique roles. This corrects the
Addendum 2 note that Himalayas was not worth paginating. The search endpoint is. The unfiltered feed is not.

**Himalayas `pubDate` is a refresh date.** Unifonic's *Principal Performance Marketing Specialist* showed 17/09 on Himalayas
and was published 11/06 on the employer's Recruitee. Go Vocal's two roles showed 17/09 and were published 12/06. Novakid
showed 15/09 and was published 10/06. Treat Himalayas as discovery only, like every other aggregator.

### The earliest-copy rule holds on Greenhouse too

DoiT's *Senior Growth Manager* has Romania and Serbia copies dated 16/09. A 99%-identical Estonia copy was first published
20/07. The role is 67 days old.

### Dead ends found on 25/09

- `hiring.cafe` — its API moved to `hiringcafe.com` and sits behind a Cloudflare challenge (HTTP 403).
- `mojposao.hr` — WebFetch gets HTTP 403.
- The DOU vacancy-ID age rule held again. Interactive Online Technologies' *Senior Paid Search Manager* is ID 362,369 against
  ~374,500 on 24/09, which puts it at roughly two months old whatever date DOU shows.

### Breezy's list date is a re-publish date — correction made on 25/09

`<org>.breezy.hr/json` gives `published_date`, which is refreshed whenever a position is re-published. The position's
apply page (`/p/<id>/apply`) embeds the position object with **`first_publish_date`** and `last_publish_date`. Social
Discovery Group's *Lead PPC Specialist* showed 21/09 in the list and carries `first_publish_date` 27/07/2026. It was
recommended as the day's top role before this was checked, and was corrected while its letter was being prepared. For
every Breezy role, read `first_publish_date` before applying the 14-day rule.

---

## Addendum 5, 26/09 — sources for Adaxa (Front B), and Workable throttling

### Public tenders: the TED API
`POST https://api.ted.europa.eu/v3/notices/search` needs no key. The body looks like
`{"query":"classification-cpv IN (79341000 79341400 79341200 79342000 79342200) AND buyer-country IN (HRV SVN BIH SRB HUN AUT) AND publication-date>=20260801","fields":["publication-number","notice-title","buyer-name","deadline-receipt-tender-date-lot","estimated-value-lot","description-lot"],"limit":100,"paginationMode":"ITERATION"}`.
Free-text `FT~` queries returned nothing. CPV codes work.

On 26/09 the regional query returned 516 notices, and 181 of them were still open. Almost all are full-service media or
creative agency contracts (TV, print, outdoor) with turnover thresholds. A small PPC agency can take part only as a digital
subcontractor or partner. The one Croatian lead: **HP – Hrvatska pošta**, advertising incl. internet, about €1M, deadline 19/10/2026.

### Freelance marketplaces
- **Freelancer.com API:** `https://www.freelancer.com/api/projects/0.1/projects/active/?query=<kw>&limit=100&full_description=true`
  needs no key. On 26/09, 551 projects matched Google Ads keywords. Only one paid at least $1k fixed or $25/h, and it
  already had 175 bids. The work is low-value; watch the source, but don't prioritise it.
- **freelancermap.de:** reachable (redirects to `/projekte`), but the projects are German-language DACH work.
- **PeoplePerHour:** reachable, but listings are rendered by JavaScript. Budgets are low.

### Job ads as agency leads
Companies advertising PPC or marketing roles in Croatia are leads for Adaxa: pitch outsourced or specialist support instead
of a hire. On 26/09 this turned up Falkensteiner (metasearch & affiliate specialist in Zadar, junior marketing manager in
Petrčane), Foxelli Group (4-month contract cover, D2C e-commerce). Lago was checked and dropped: it is a talent marketplace
(HireLago) that places individual freelancers with its clients, not a company that would buy agency services.

### Workable throttling
After two heavy runs on 25/09, the global API returned HTTP 429 on most calls on 26/09 even at 2.5 s pacing. Run a small,
slow pass after a heavy day: about 20 queries × 4 locations, 1 page each, 4 s apart. Reuse the previous day's data for the
earliest-date index.

---

## Addendum 6, 26/09 late — LinkedIn's public job search, and EOJN (Croatian public procurement)

### LinkedIn guest job search (Front A, discovery only)
`GET https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=<kw>&location=<place>&f_TPR=r<seconds>&start=<0,10,20…>`
needs no login and returns HTML cards (10 per page): job id, title, company, location, listing date. `location` accepts
names such as `Croatia`, `European Union`, `EMEA`, `Worldwide`. `f_TPR=r1296000` limits to the last 15 days. The remote
filter `f_WT=2` is ignored by this endpoint, so remote status has to come from the job detail. At 2.5 s pacing, about 300
calls on 26/09 produced no HTTP 429 (the full run: 479 calls, one 429, 2,066 unique roles, 1,301 relevant by title).

Limit: cards carry only a location string. The 26/09 pass opened only roles listed at country or region level (Croatia,
European Union, EMEA, Worldwide) or with "remote" in the title; about 1,250 roles listed under a city were not opened, so
a remote role posted under a city name can be missed. Adding `remote` to the keywords is the cheapest fix.

Detail: `GET https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/<id>` gives the description, seniority level,
employment type and applicant count.

**LinkedIn dates are listing dates, and reposts reset them.** On 26/09 LinkedIn showed Infobip's *Senior Digital
Advertising Specialist* as posted "3 days ago". Infobip's own Workday (`/wday/cxs/infobip/InfobipCareers/job/...`) gives
`startDate` 2026-08-12. Always take the date from the employer's ATS, as the earliest-copy rule already says.

Related gap: the Workday list API gives `postedOn: "Posted 30+ Days Ago"` without a date, so these postings enter the
normalised data with no date and the filter skips them silently. When another source lists the same company and title
with a recent date, treat the undated ATS copy as 30+ days old, not as missing.

### EOJN RH — Croatian public procurement (Front B)
EOJN (`https://eojn.hr`) lists every Croatian procedure, including *jednostavna nabava* below the EU thresholds, which
never reaches TED. Its grids read from a JSON API that works with the anonymous token every page carries:

1. `GET https://eojn.hr/procurements-all` with a cookie jar, and read `<input id="uiUserToken" value="…">`.
2. `GET https://eojn.hr/api/searchgrid/<Grid>/get?skip=0&take=200&requireTotalCount=true&sort=[…]&filter=[…]` with the
   header `UserToken: <token>` and the same cookies. `filter` uses DevExtreme syntax, e.g.
   `[["CPVExtended","startswith","7934"],"or",["Name","contains","oglaš"]]`. Pages are capped at 200 rows, so page by the
   number of rows returned, and sort by `Id`: sorting by a date with ties returns duplicates and silently skips rows.

| Grid | What it holds | Useful fields | Detail page |
|---|---|---|---|
| `TendersAll` | Open and past procedures | `Name`, `ContractingBody`, `EstimatedValue`, `SubmissionDeadline`, `CPVExtended`, `ProcedureType` | `/tender-eo/<Id>` |
| `PlanItemsPublic` | Annual procurement plans: who plans to buy what | `PlanCA`, `PlanTenderName`, `PlanItemEstimatedValue`, `PlanItemQuarter`, `PlanItemStatusName`, `ProcPlanId` | `/plan-eo/<ProcPlanId>` |
| `VContractRegisterPublic` | Contracts signed: supplier, value, date | `CAName`, `TenderName`, `ContractorName`, `TotalValue`, `ContractDate` | `/contract-eo/<Id>` |

On 26/09: 16 open procedures matched advertising or marketing terms; the only new relevant one was CERP *Usluge
oglašavanja* (€39,950, deadline 05/10), and its 2025 contract went to Hanza Media, a newspaper publisher, so it is almost
certainly print notices. The 2026 plans held 1,969 advertising or marketing items, 198 explicitly digital, 6 naming Google
Ads.

**A plan item's status is not reliable.** Items still marked *Planirano* had often been contracted months earlier:
Narodne novine's *Usluge Google Ads i optimizacija web stranica za tražilice* was signed with ARBONA d.o.o. on 21/01/2026
(€16,800), and in 2025 with the same supplier (€10,350). Before calling a plan item open, search
`VContractRegisterPublic` for the same buyer. The register is also the better lead source: it names the incumbent,
the price and the renewal month, so Adaxa can pitch a buyer a month or two before the next plan is published
(most digital contracts checked on 26/09 were signed between 31 December and 30 January: Narodne novine,
Zračna luka Osijek, HNK Split, HNK Osijek, Daruvarske Toplice; NP Plitvice (May) and Hrvatska Lutrija (June) were the
exceptions).

### Dead ends on 26/09
- Reddit JSON search (`/r/forhire/search.json`): HTTP 403 through the proxy.
- EOJN procurement documents need a registered account; the grids and detail pages do not.

---

## Addendum 7, 26/09 night — monitoring public buyers for Adaxa, and one application per company

Dario asked on 26/09 to monitor these leads regularly in their own part of the Work sheet. That part is the tab
**ADAXA JAVNA NABAVA** (one row per public buyer, IDs `PB-0001`…); qualified leads also get a row in ADAXA LEADS, and the
two are linked by "Adaxa Lead ID".

### The monitor script
`adx/crawl/tools/eojn_monitor.py` (stdlib only):
- `refresh [--since 2024-01-01]` rebuilds `adx/adaxa/eojn-buyers.json` from the contract register: about 5,150 contracts
  scanned, classified G (Google Ads/search), D (platform digital ads), P (portal placements), S (social media management),
  M (marketing). Recruitment ads on job portals are excluded.
- `new --since <date>` lists relevant contracts published since the date, open procedures, and 2026-2027 plan items changed
  since the date. Run it on every crawl day; it takes a few minutes.
- `buyer "<name>"` prints one buyer's contracts, plan items and procedures.

### What to do with a hit
1. Check the contract register before calling a plan item open (Addendum 6).
2. Read the buyer's own simple-procurement rules if the value is near a threshold; they decide who gets asked. Zračna luka
   Osijek (rules in force from 01/09/2026): up to EUR 15,000 the commercial and marketing service e-mails an offer request to
   one or more companies of its choice; EUR 15,000-25,000 goes through the EOJN module with at least three invited bidders;
   above EUR 25,000 it is published in the EOJN module. Below the first threshold a supplier the buyer does not know is
   never asked, so outreach has to come before the purchase.
3. Time the outreach. January is the most common signing month (43 of 118 contracts from recurring Google/digital-ads
   buyers since 2024; 60% fall in January-March). Contact buyers in October-December for the next year.
4. Look at what the buyer runs today. Google's Ads Transparency Center answers without a login:
   `POST https://adstransparency.google.com/anji/_/rpc/SearchService/SearchCreatives?authuser=0` with form field
   `f.req={"2":100,"3":{"12":{"1":"<domain>","2":true}},"7":{"1":1,"2":0,"3":2}}` returns the advertiser name, each ad's
   format (1 text, 2 image, 3 video) and first/last shown dates. For osijek-airport.hr on 26/09: 7 image ads since
   03/02/2026, no text (search) ads.
5. Company facts (owners, revenue, staff) come from CompanyWall or the buyer's own transparency page.

### Front A: one active application per company
Do not propose a second role at a company that already has an active application in APPLIED (not Rejected, not Closed).
On 26/09 Infobip's Senior Digital Advertising Specialist was put to Dario although his Infobip application from 24/09 was
still open; he rightly asked why. Check APPLIED by company before listing a candidate.
