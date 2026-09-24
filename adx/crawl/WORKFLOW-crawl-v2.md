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
