# Ops batches 001–012 are superseded — do not replay

**Status as of 24/09/2026.** On 20/09 between 20:14 and 21:21 another AI (activity IDs `CODEX-0920-*`)
reconciled the live `Work` and `Base` sheets directly: APPLIED rows 23–30 imported (eight user-reported
submissions, including LAYER, which these batches never recorded), duplicates 8/16 marked, 14 fit scores
filled, `Base/All` merged to 481 tags with ALL2 retained. Its own note in `Crawl` r31 reads:
*"Do not replay batches 001–009 or overwrite A23."*

That instruction is correct and extends to **batches 010, 011 and 012** as well. Replaying any of them
would overwrite the reconciled DAILY CONTROL rows for 16/09, 17/09 and 20/09 and re-append rows that
now exist. The files stay in the repo as an audit trail of what was proposed, not as a queue.

## Two claims in these batches are false

| Batch | Claim | What is true | How it was established |
| --- | --- | --- | --- |
| 009, 012 | Hilo by Aktiia *Head of Performance Marketing* is **verified live**, posted 16/09 | **Not live.** Hilo's own Workable index lists 14 current postings on 24/09 and none of them is this role; `CODEX-0920-HILO` found the job URL redirecting to `not_found` on 20/09. The "16/09" date came from an aggregator (resumebuilder.careers). The Workable pages this session fetched returned only a JS shell, and that was misread as confirmation. | `jobs.workable.com/api/v1/jobs` queried for `aktiia`, `hilo performance marketing`, `head of performance marketing` |
| 011, 012 | Fortis Media (via JobRack) *passes the integrity filter* — "asks for nothing resembling cloaking" | **Fails it.** The requirements section says: *"Hands-on experience with cloaking is highly desirable"*, and asks for acquiring Business Managers and ad accounts "across different platforms, vendors and resellers … when access to standard platforms or accounts is limited", plus Keitaro. `CODEX-0920` recorded "Fortis requires cloaking" correctly. The earlier read printed only the first 1,500 characters of a 6,906-character requirements section. | Full `requirementsSection` re-read from the stored Workable record |

Both roles were placed in the 21/09 bulk-send document with written letters. That document has been
renamed on Drive with a ❌ prefix and must not be used.
