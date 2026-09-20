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
