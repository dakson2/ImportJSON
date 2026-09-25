# Prompt for Codex - write the 25/09/2026 crawl into Work

> Superseded by `CODEX-PROMPT-2026-09-25-FINAL.md` (end-of-day batch). Do not run this one.

Copy everything inside the code block below into Codex.

```text
TASK: Record Claude's 25/09/2026 crawl in the live Google Sheet "Work" (project 1.ADX-Jobs). Claude (AI-2) verified the roles below on each employer's own ATS but cannot write cells; you have write access. Do exactly steps 1-3, nothing else.

SHEET: Work - https://docs.google.com/spreadsheets/d/15Do6cDJLu4CeBDsfnOpVzV1ZuO09pzHvNMsL54m7jt4
Tabs used: WORK QUEUE (cell A1 only), Found positions, ACTIVITY LOG.

RULES (non-negotiable):
R1. Immediately before writing to a tab, re-read its live header row and its last non-empty row. Map every value BY HEADER NAME, never by column position. If a header named in the payload does not exist in the live sheet, stop that step and report it.
R2. Append only below the last non-empty row. Never overwrite a non-empty cell, except WORK QUEUE A1 in step 1.
R3. De-duplicate: before appending a Found positions row, check Found positions AND APPLIED for a row with the same Company AND Job title (case-insensitive, trimmed). If one exists, do not append it; report it.
R4. Do not replay any ops batch file from the repository (batches 001-014 are record-only). Do not touch "Found positions" column Y (Actions) or "Job sites" column G (Status).
R5. Keep the formats of existing rows: dates as text dd/mm/yyyy; Fit score as a number; everything else plain text.
R6. Replace "<current UTC ISO time>" with the real UTC time at the moment you write, e.g. 2026-09-25T08:30:00.000Z.

STEPS:
1. WORK QUEUE - cell A1 currently reads "ovo sve " (text pasted there by accident on 24/09). If A1 still reads exactly that, set it to "Queue ID". If it reads anything else, leave it and report the value. Change nothing else on this tab.
2. Found positions - append the 6 rows in Found_positions_append, in the given order. The last data row should be 186, so they should land at rows 187-192; if the last row differs, append after the real last row and report the actual row numbers.
3. ACTIVITY LOG - append the 1 row in ACTIVITY_LOG_append. The last data row should be 28.

REPORT BACK:
- the before and after value of WORK QUEUE A1;
- the row numbers written in steps 2 and 3;
- anything skipped as a duplicate or refused, with the reason.

PAYLOAD:
{
 "Found_positions_append": [
  {
   "Date found": "25/09/2026",
   "Application deadline": "Not stated",
   "Job title": "Lead PPC Specialist",
   "Company": "Social Discovery Group",
   "Job site": "Breezy (employer ATS)",
   "Work mode / Location": "Fully remote, no location restrictions",
   "Engagement type": "Full time",
   "Compensation": "Not disclosed; shared during process. 28 days vacation, bonus, health allowance",
   "Availability status": "Live 25/09/2026 on employer Breezy, but FIRST PUBLISHED 27/07/2026: the position's own data on the apply page carries first_publish_date 2026-07-27; the 21/09/2026 date on the job list is a re-publish. Fails the 14-day rule unless Dario makes an exception; the re-publish suggests the seat is still open. Full text read: no cloaking/evasion terms.",
   "Fit score": 94,
   "Priority": "D - EXCLUDED / older than 14 days (first published 27/07/2026) - Dario decides on exception",
   "Work description": "Owns global Paid Search strategy (Google Ads primary, Microsoft Ads) across a dating/social product portfolio; leads and hires the Paid Search team; six-figure+ monthly search spend; pLTV value-based Smart Bidding, Google Ads Experiments, Enhanced Conversions, offline imports, SQL/BigQuery; Ads Scripts an advantage.",
   "Url": "https://social-discovery-ventures.breezy.hr/p/9ea048d3de3f01-lead-ppc-spesialist",
   "Tag 1": "Google Ads",
   "Tag 2": "Microsoft Ads",
   "Tag 3": "Smart Bidding",
   "Tag 4": "pLTV",
   "Tag 5": "Team Lead",
   "Tag 6": "Experiments",
   "Tag 7": "BigQuery",
   "Tag 8": "Ads Scripts",
   "Tag 9": "Dating / Social",
   "Tag 10": "International",
   "Tag 11": "Remote Worldwide"
  },
  {
   "Date found": "25/09/2026",
   "Application deadline": "Not stated (ASAP start)",
   "Job title": "Senior Google Ads Specialist | International E-commerce | Remote",
   "Company": "ennovationHUB",
   "Job site": "Recruitee (employer ATS)",
   "Work mode / Location": "Remote (listed under Netherlands); travel every 4-8 weeks to Belgrade, Barcelona or London",
   "Engagement type": "Full time, permanent",
   "Compensation": "Not disclosed",
   "Availability status": "Verified live 25/09/2026 on employer Recruitee; published 18/09/2026 (Berlin/Barcelona/Belgrade/London copies 18-20/09). Employer checked: founded 2017 London, 60+ staff, self-funded and profitable, 500k+ orders. Conditions: in-house e-commerce Google Ads experience required (agency-primary excluded); regular travel exceeds the 6-12-month hybrid rule, Dario decides.",
   "Fit score": 88,
   "Priority": "B - Conditional",
   "Work description": "Owns Google Ads for one brand of a multi-brand home & living (furniture) e-commerce group across international markets: Search, Shopping, Performance Max; ROAS/CPA/profitability accountability; GA4, GTM, Merchant Center; London variant states GBP 250k+ monthly spend; group targets EUR 160m+ revenue by 2027.",
   "Url": "https://ennovationhub.com/o/senior-google-ads-specialist-international-e-commerce-remote-asap",
   "Tag 1": "Google Ads",
   "Tag 2": "Google Shopping",
   "Tag 3": "Performance Max",
   "Tag 4": "eCommerce",
   "Tag 5": "Merchant Center",
   "Tag 6": "GA4",
   "Tag 7": "GTM",
   "Tag 8": "International",
   "Tag 9": "In-house",
   "Tag 10": "Travel 4-8 weeks",
   "Tag 11": "Remote Europe"
  },
  {
   "Date found": "25/09/2026",
   "Application deadline": "Not stated",
   "Job title": "Head of Growth",
   "Company": "LottieFiles",
   "Job site": "BambooHR (employer ATS)",
   "Work mode / Location": "Fully remote; preferred overlap with Asia/Europe hours",
   "Engagement type": "Full time",
   "Compensation": "Not disclosed",
   "Availability status": "Verified live 25/09/2026 on employer BambooHR; datePosted 16/09/2026; level Senior Manager. Found via Himalayas Croatia-eligible filter.",
   "Fit score": 78,
   "Priority": "C - Secondary",
   "Work description": "Owns the growth number (registrations, MAU, activation) for a product-led design/animation platform; paid and organic as one system; builds the growth and marketing team; holds agencies to efficiency. Stretch: PLG and developer-tool growth rather than paid-search-first.",
   "Url": "https://lottiefiles.bamboohr.com/careers/144",
   "Tag 1": "Head of Growth",
   "Tag 2": "PLG",
   "Tag 3": "Paid Acquisition",
   "Tag 4": "SEO",
   "Tag 5": "Lifecycle",
   "Tag 6": "Team Building",
   "Tag 7": "SaaS",
   "Tag 8": "Design Tools",
   "Tag 9": "Analytics",
   "Tag 10": "Leadership",
   "Tag 11": "Remote Worldwide"
  },
  {
   "Date found": "25/09/2026",
   "Application deadline": "Not stated",
   "Job title": "Growth Marketing Lead (B2B SaaS & Payments)",
   "Company": "Ruby Labs",
   "Job site": "Ashby (employer ATS)",
   "Work mode / Location": "Remote; Croatia explicitly listed among 25 eligible countries",
   "Engagement type": "Full time",
   "Compensation": "Not disclosed",
   "Availability status": "Verified live 25/09/2026 on employer Ashby; published 21/09/2026. Different role from the Ruby Labs UA Manager skipped on 24/09.",
   "Fit score": 70,
   "Priority": "C - Secondary",
   "Work description": "Builds the marketing engine for Ruby Labs' payment orchestration platform: website and CRO, content, LinkedIn, PR, SEO/AI discovery, acquisition funnels, attribution and reporting. 4+ years in B2B SaaS/FinTech/Payments required. Content-heavy; paid is one channel.",
   "Url": "https://jobs.ashbyhq.com/ruby-labs/409d82ce-b18a-4e61-83e3-3cbb4a37d67f",
   "Tag 1": "B2B SaaS",
   "Tag 2": "Payments",
   "Tag 3": "FinTech",
   "Tag 4": "Demand Generation",
   "Tag 5": "SEO",
   "Tag 6": "CRO",
   "Tag 7": "LinkedIn",
   "Tag 8": "Content",
   "Tag 9": "Attribution",
   "Tag 10": "AI Workflows",
   "Tag 11": "Remote Europe"
  },
  {
   "Date found": "25/09/2026",
   "Application deadline": "Not stated",
   "Job title": "Founding Growth Marketer",
   "Company": "Base360.ai (The Flex)",
   "Job site": "Ashby (employer ATS)",
   "Work mode / Location": "Remote; Croatia listed among 109 locations",
   "Engagement type": "Full time",
   "Compensation": "Competitive salary + performance incentives (not stated)",
   "Availability status": "Verified live 25/09/2026 on employer Ashby; published 23/09/2026. Early-stage; wording suggests below the EUR 100k reference.",
   "Fit score": 66,
   "Priority": "C - Secondary",
   "Work description": "First growth hire for an AI operating system for short-term-rental operators: owns one or several channels (paid ads, SEO, outbound, partnerships), demo bookings and qualified leads, funnels and landing pages; works directly with the founder; path to lead a growth team.",
   "Url": "https://jobs.ashbyhq.com/the-flex/f23c0827-40ec-4d97-82b1-ab31c21f5daa",
   "Tag 1": "Founding Role",
   "Tag 2": "B2B SaaS",
   "Tag 3": "Paid Ads",
   "Tag 4": "Lead Generation",
   "Tag 5": "Funnels",
   "Tag 6": "Short-term Rentals",
   "Tag 7": "Startup",
   "Tag 8": "AI",
   "Tag 9": "Experimentation",
   "Tag 10": "Founder-facing",
   "Tag 11": "Remote Worldwide"
  },
  {
   "Date found": "25/09/2026",
   "Application deadline": "Not stated (ASAP start)",
   "Job title": "Chief Marketing Officer (EMEA - Remote)",
   "Company": "Pragmatike (for an AI cloud infrastructure startup)",
   "Job site": "Ashby (recruiter ATS)",
   "Work mode / Location": "Fully remote, EMEA timezone (Croatia not in the listed countries; region fits)",
   "Engagement type": "Full time",
   "Compensation": "Not disclosed",
   "Availability status": "Verified live 25/09/2026 on recruiter Ashby; published 14/09/2026. End client undisclosed.",
   "Fit score": 60,
   "Priority": "C - Secondary",
   "Work description": "Hands-on CMO for a distributed AI cloud startup: positioning, brand, demand generation, content, GTM; 8+ years B2B technology marketing leadership; AI/cloud/SaaS understanding required. Stretch fit.",
   "Url": "https://jobs.ashbyhq.com/pragmatike/d50432f6-c724-4991-ba48-4e2a5d43cbda",
   "Tag 1": "CMO",
   "Tag 2": "B2B Tech",
   "Tag 3": "AI",
   "Tag 4": "Cloud",
   "Tag 5": "Demand Generation",
   "Tag 6": "GTM",
   "Tag 7": "Brand",
   "Tag 8": "Leadership",
   "Tag 9": "Recruiter",
   "Tag 10": "Startup",
   "Tag 11": "Remote EMEA"
  }
 ],
 "ACTIVITY_LOG_append": [
  {
   "Activity ID": "CLAUDE-20260925-CRAWL",
   "Date/time": "<current UTC ISO time>",
   "Front": "DARIO",
   "Activity type": "Sourcing",
   "Target": "Crawl 25/09 - 46,548 dated postings from 652 boards/feeds",
   "Target URL": "",
   "Related ID": "Q-20260911-DARIO",
   "Action": "Workable global API (34 queries x 25 locations, 4,215 postings); 688 employer ATS boards (Greenhouse, Ashby, Lever/Lever EU, Recruitee, SmartRecruiters, Teamtailor RSS, Personio XML, Breezy, BambooHR) from a 541-name probe plus 652 slugs mined from aggregator apply links; 64 Workday tenants; Jobgether; Remote Rocketship (284 pages); Himalayas search with country=Croatia (349 roles); WWR, Working Nomads, Jobicy, Remotive, RemoteOK, Arbeitnow, TheMuse, Landing.jobs; DOU; posao.hr. Window: first published on/after 11/09/2026, earliest copy wins.",
   "Outcome": "611 in-window paid/growth marketing roles; 6 recorded in Found positions: 5 pass (ennovationHUB Senior Google Ads Specialist remote, LottieFiles Head of Growth, Ruby Labs Growth Marketing Lead, Base360.ai Founding Growth Marketer, Pragmatike CMO EMEA) and Social Discovery Group Lead PPC Specialist, which is live but was first published 27/07/2026 (Breezy first_publish_date; list date 21/09 is a re-publish), so it fails the 14-day rule unless Dario makes an exception. Excluded after source check: DoiT Senior Growth Manager (original 20/07), Unifonic, Go Vocal, Novakid (June originals re-dated by Himalayas), Gismart UA (03/09), Interactive Online Technologies Senior Paid Search (DOU ID ~2 months old), Nord Security PPC Team Lead and Ovoko Head of Marketing (hybrid Vilnius/Warsaw), hosting.com Senior PPC Growth Specialist (Lithuania only), MM Coaching Head of Paid Marketing (UAE/IE/UK/CA only), CoinPoker (gray-market jurisdictions), German-language DACH roles.",
   "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/pull/2",
   "Next step": "Dario decides on the SDG exception; otherwise apply one by one starting with ennovationHUB. Claude prepares each letter on request.",
   "Notes": "Record: adx/ops/ops-ADX-20260925-014-crawl.json. Workflow: adx/crawl/WORKFLOW-crawl-v2.md Addendum 4."
  }
 ]
}
```
