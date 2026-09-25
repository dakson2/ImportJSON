# Crawl audit — source productivity and where the next crawl should go

Run 2026-09-15 · AI-2 · Front A sourcing
Scope: all 34 rows of `Work > Job sites` measured against every role record in `Found positions` (185), `Listings` (69) and `APPLIED` (21).

Live web crawling was not possible this run: every job source, LinkedIn and every employer domain is refused at CONNECT by the network policy. Only `googleapis.com` is reachable. So this run crawled the database instead, and measured which configured sources have ever actually produced anything.

Attribution counts a role to a source when the role's URL host matches the source's host, or when the source name appears in the role's `Job site` / `Listing source` field. 258 attributions across 34 sources.

---

## 1. The pipeline runs on two sources

| Source | Roles | Priority | Share |
| --- | ---: | --- | ---: |
| Dynamite Jobs | 100 | High | 39% |
| We Work Remotely | 52 | High | 20% |
| Employer direct — Ashby | 20 | High | 8% |
| NoDesk | 17 | Medium | 7% |
| Employer direct — Lever | 14 | High | 5% |
| Employer direct — Greenhouse | 12 | High | 5% |
| Remotive | 11 | High | 4% |
| Himalayas | 8 | High | 3% |
| Wellfound | 5 | Medium | 2% |
| Remote OK | 4 | High | 2% |
| EU Remote Jobs | 4 | High | 2% |
| PPCjobs.com (two rows) | 6 | High + Medium | 2% |
| Adorio HR | 3 | Medium | 1% |
| MarketingMonk | 1 | Medium | <1% |
| Jobera | 1 | Medium | <1% |

**Dynamite Jobs and We Work Remotely together account for 59% of every role ever recorded.**

That is the finding that matters most, because the pipeline inherits those two boards' bias: remote-worldwide postings, frequently US-hours, frequently listing-origin rather than employer-direct. It explains a pattern visible throughout the pool — repeated "original not found / manual verify" flags, and repeated US-overlap caveats on otherwise strong roles.

The three employer-direct ATS sweeps (Ashby, Lever, Greenhouse) contribute 46 between them. Per the project's own qualification rules that is the highest-quality channel, and it is working. It deserves to be expanded, not left at three boards.

## 2. Eighteen of 34 sources have produced nothing

Every one of them has a `Search query / filter` already configured, and cadence set to "Each run". So this is not a configuration gap — these sources were never successfully crawled.

**High priority, zero output — the real hole:**

| Row | Source | Status | Configured query |
| --- | --- | --- | --- |
| r6 | LinkedIn Jobs | OK | Croatia, EEA, EU remote, Google Ads, Amazon Ads |
| r9 | LinkedIn Croatia | OK | Google Ads Specialist Croatia remote; Performance Marketing Specialist Croatia |
| r35 | LinkedIn Croatia manual scan | Manual verify | Google Ads Croatia, Performance Marketing Croatia, Paid Media Croatia, PPC Croatia, Zagreb hybrid |
| r7 | Upwork | Skip | Google Ads, Shopping, PMax, Merchant Center, DTC |

All three LinkedIn entries have produced zero roles across the project's entire history, while carrying High priority. The `ACTIVITY LOG` corroborates why: entry `AI1-LINKEDIN-0911` records *"Public web fetch returned DisabledError; 0 confirmed profile visits"*. LinkedIn is configured, prioritised, and has never worked.

**Medium and lower, zero output:** Jobgether, Up2staff, BeBee, Aquent, Zuhausejobs, Indeed UK/Ireland, Indeed Remote PPC, MojPosao, PeoplePerHour, Freelancer, Remote.co, Remote.com, Work.ua, JustRemote.

## 3. The local market is effectively uncrawled

MojPosao has produced zero. Adorio HR has produced three. LinkedIn Croatia, zero. That is the entire Croatian and regional coverage.

This is worth deciding deliberately rather than by accident, because `DARIO ŠULER - FULL` records openness to a hybrid model with periodic office attendance roughly every 30–40 days given a ~250 km distance. Under a remote-worldwide-only pipeline, no role that would suit that arrangement can ever surface.

## 4. Defect in the source table

`PPCjobs.com` occupies two rows: **r8** (High, `OK`) and **r19** (Medium, `Duplicate skipp`). One source, two rows, two different priorities and statuses. Worth collapsing to one — but `Job sites` column G is a protected manual field, so this is flagged rather than changed.

---

## Crawl plan, in priority order, for the moment web access exists

1. **LinkedIn — r6, r9, r35.** Largest untapped market and three configured High-priority entries with zero output. Signed-out public search is the realistic route; the r35 note already says public Croatia-specific search returned unreliable results, so expect to need a signed-in scan and treat that row as the fallback.
2. **Expand the employer-direct ATS sweep.** It is the highest-quality channel and currently only Ashby, Lever and Greenhouse are configured, yet Personio, Teamtailor, Workable, Breezy and CATS all already appear as role hosts in the data. Add them as first-class sources with keyword sweeps rather than discovering them second-hand through aggregators.
3. **Croatian and regional:** MojPosao, Adorio HR, LinkedIn Croatia. Decide first whether hybrid roles are in scope, because that determines whether this tier is worth cadence at all.
4. **Indeed UK/Ireland and Indeed Remote PPC.** Zero output, Medium priority, and the UK/IE note already flags work authorisation as the likely blocker — so qualify hard before spending package time.
5. **Jobgether, Up2staff, BeBee, Aquent, Zuhausejobs.** Low expected yield individually, but eight of them at zero is worth one sweep to establish whether they are dead or simply never visited.

## What this run did not do

- No live crawl, no employer-direct verification, no LinkedIn visit, no form submission. Network refused at CONNECT.
- No role rows added, so no duplicates created.
- `Found positions` column Y and `Job sites` column G untouched.
