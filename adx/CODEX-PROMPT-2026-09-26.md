# Instructions for 26/09/2026 - for the AI with write access to Work (Codex or Claude)

Run only AFTER `CODEX-PROMPT-2026-09-25-FINAL.md` has been run. Copy everything inside the code block below.

```text
TASK (for the AI with write access to the sheet - Codex or Claude): record 26/09/2026 in the live Google Sheet "Work" (project 1.ADX-Jobs). Do exactly steps 0-4, nothing else.

SHEET: Work - https://docs.google.com/spreadsheets/d/15Do6cDJLu4CeBDsfnOpVzV1ZuO09pzHvNMsL54m7jt4

RULES (non-negotiable):
R1. Immediately before writing to a tab, re-read its live header row and relevant rows. Map values BY HEADER NAME, never by column position. If a header named in the payload does not exist, stop that step and report it.
R2. Never overwrite a non-empty cell except the cells named in step 1.
R3. Do not replay any ops batch file from the repository. Do not touch "Found positions" column Y or "Job sites" column G.
R4. Dates as text dd/mm/yyyy; Fit score as a number; checkbox columns as the booleans given; everything else plain text.
R5. Replace every "<current UTC ISO time>" with the real UTC time at the moment you write.

STEPS:
0. Check that the 25/09 batch was applied: APPLIED must contain a row with Company "Social Discovery Group" and Job title "Lead PPC Specialist". If it does not, STOP and report - run CODEX-PROMPT-2026-09-25-FINAL.md first.
1. APPLIED - close six June applications. For each item in APPLIED_close_old_waiting: go to expected_row, verify that Company equals verify.Company and Job title starts with verify["Job title starts with"]; if both match, set STATUS to "NO REPLY - CLOSE" and append append_to_Actions to the END of the existing Actions cell. If a row does not match, do not edit it; find the row by Company + Job title instead, and report what you did.
2. ADAXA LEADS - append the 5 rows in ADAXA_LEADS_append. IMPORTANT: this tab has the checkbox columns (LinkedIn visited, Adaxa Web visited, Form submitted) pre-filled FALSE on all ~1000 rows, so "last non-empty row" is misleading. Treat a row as empty when its "Lead ID" cell is empty, and write starting at the first row whose Lead ID is empty (expected row 2). Before writing, check that no existing row already has the same Company; if one does, skip that lead and report it.
3. DAILY CONTROL - append one row for 26/09/2026 from DAILY_CONTROL_append (skip and report if a 26/09/2026 row exists).
4. ACTIVITY LOG - append the 3 rows in ACTIVITY_LOG_append, in order.

REPORT BACK: the rows edited in step 1 (before/after STATUS), the rows written in steps 2-4, and anything skipped with the reason.

PAYLOAD:
{
 "APPLIED_close_old_waiting": [
  {
   "expected_row": 9,
   "verify": {
    "Company": "Lead Ember",
    "Job title starts with": "Senior Google Ads Account Manager - Remo"
   },
   "current_STATUS": "Waiting",
   "set": {
    "STATUS": "NO REPLY - CLOSE"
   },
   "append_to_Actions": " | Closed 26/09/2026 - no reply for 3+ months (decided by Dario 25/09/2026)."
  },
  {
   "expected_row": 17,
   "verify": {
    "Company": "Jordan Digital Marketing",
    "Job title starts with": "Performance Marketing Manager"
   },
   "current_STATUS": "Waiting",
   "set": {
    "STATUS": "NO REPLY - CLOSE"
   },
   "append_to_Actions": " | Closed 26/09/2026 - no reply for 3+ months (decided by Dario 25/09/2026)."
  },
  {
   "expected_row": 19,
   "verify": {
    "Company": "Sporty Group",
    "Job title starts with": "Performance Marketing Manager - Paid Soc"
   },
   "current_STATUS": "Applied - Waiting",
   "set": {
    "STATUS": "NO REPLY - CLOSE"
   },
   "append_to_Actions": " | Closed 26/09/2026 - no reply for 3+ months (decided by Dario 25/09/2026)."
  },
  {
   "expected_row": 20,
   "verify": {
    "Company": "ALM Corp",
    "Job title starts with": "Senior Manager – Performance Marketing ("
   },
   "current_STATUS": "Applied - Waiting",
   "set": {
    "STATUS": "NO REPLY - CLOSE"
   },
   "append_to_Actions": " | Closed 26/09/2026 - no reply for 3+ months (decided by Dario 25/09/2026)."
  },
  {
   "expected_row": 21,
   "verify": {
    "Company": "Qdrant",
    "Job title starts with": "Fractional Paid Media Specialist (EMEA)"
   },
   "current_STATUS": "Applied - Waiting",
   "set": {
    "STATUS": "NO REPLY - CLOSE"
   },
   "append_to_Actions": " | Closed 26/09/2026 - no reply for 3+ months (decided by Dario 25/09/2026)."
  },
  {
   "expected_row": 22,
   "verify": {
    "Company": "StubGroup",
    "Job title starts with": "Senior Google Ads Account Manager"
   },
   "current_STATUS": "Applied - Waiting",
   "set": {
    "STATUS": "NO REPLY - CLOSE"
   },
   "append_to_Actions": " | Closed 26/09/2026 - no reply for 3+ months (decided by Dario 25/09/2026)."
  }
 ],
 "ADAXA_LEADS_append": [
  {
   "Lead ID": "ADX-L-20260926-01",
   "Date found": "26/09/2026",
   "Company": "Falkensteiner Hotels (Croatia: Zadar, Petrčane)",
   "Contact / role": "Marketing team (hiring manager not named)",
   "Company URL": "https://www.falkensteiner.com",
   "LinkedIn URL": "",
   "Website URL": "https://www.falkensteiner.com",
   "Need / signal": "Two open marketing roles in Croatia on posao.hr: 'Meta Search i Affiliate Marketing Specijalist' (Falkensteiner Hotelmanagement d.o.o., Zadar) and 'Junior Marketing Manager' (Falkensteiner Hotel & Residences, Petrčane), September 2026.",
   "Service angle": "Specialist support alongside the in-house team: Google Hotel Ads / metasearch, paid search and tracking for the Croatian properties; Adaxa as an outsourced specialist rather than an extra hire.",
   "Fit score": 70,
   "Priority": "B",
   "Status": "New",
   "LinkedIn visited": false,
   "Adaxa Web visited": false,
   "Form submitted": false,
   "Last action": "Found by Claude 26/09/2026",
   "Next action": "Find the Falkensteiner Croatia marketing lead on LinkedIn and send a short metasearch + Google Ads offer.",
   "Notes": "Sources: https://www.posao.hr/oglasi/meta-search-i-affiliate-marketing-specijalist-m-z/1246521/ and https://www.posao.hr/oglasi/junior-marketing-manager-m-f/1246520/"
  },
  {
   "Lead ID": "ADX-L-20260926-02",
   "Date found": "26/09/2026",
   "Company": "Foxelli Group",
   "Contact / role": "Hiring team (Ashby)",
   "Company URL": "https://jobs.ashbyhq.com/foxelligroup",
   "LinkedIn URL": "",
   "Website URL": "",
   "Need / signal": "D2C e-commerce group (over $20M a year) hiring a 4-month maternity-cover Marketing Manager on a contract/freelance basis, EUR 2,000-2,800 per month after tax, remote, Croatia among eligible countries (published 11/09/2026).",
   "Service angle": "Interim performance-marketing cover through Adaxa, or an ongoing Google Ads / landing-page retainer afterwards.",
   "Fit score": 55,
   "Priority": "C",
   "Status": "New",
   "LinkedIn visited": false,
   "Adaxa Web visited": false,
   "Form submitted": false,
   "Last action": "Found by Claude 26/09/2026",
   "Next action": "Decide whether the fee is worth it; if yes, apply as a contractor via Adaxa or send a retainer offer.",
   "Notes": "Posting: https://jobs.ashbyhq.com/foxelligroup/3d201db9-29fb-4b5a-9dd7-164036bfb4ad"
  },
  {
   "Lead ID": "ADX-L-20260926-03",
   "Date found": "26/09/2026",
   "Company": "Lago",
   "Contact / role": "Hiring team (Workable)",
   "Company URL": "https://jobs.workable.com/view/wtZrcLLCiYTGBL8CPWpruG",
   "LinkedIn URL": "",
   "Website URL": "",
   "Need / signal": "Hiring a Google Ads PPC Specialist based in Croatia on US Central hours, USD 1,800-3,200 per month (published 04/09/2026): outsources Google Ads execution to CEE talent.",
   "Service angle": "White-label Google Ads execution partnership: an Adaxa team instead of individual hires.",
   "Fit score": 50,
   "Priority": "C",
   "Status": "New",
   "LinkedIn visited": false,
   "Adaxa Web visited": false,
   "Form submitted": false,
   "Last action": "Found by Claude 26/09/2026",
   "Next action": "Identify the company behind the Workable account; if it is an agency, pitch white-label execution.",
   "Notes": "Company website not verified yet."
  },
  {
   "Lead ID": "ADX-L-20260926-04",
   "Date found": "26/09/2026",
   "Company": "HP - Hrvatska pošta d.d.",
   "Contact / role": "Procurement (public tender)",
   "Company URL": "https://ted.europa.eu/en/notice/-/detail/646569-2026",
   "LinkedIn URL": "",
   "Website URL": "https://www.posta.hr",
   "Need / signal": "Public tender 'Usluge oglašavanja u sredstvima javnog informiranja' incl. internet advertising; estimated EUR 1,000,000; deadline 19/10/2026 (TED 646569-2026).",
   "Service angle": "Digital (Google/Meta) execution as a subcontractor or partner to a media agency that bids; Adaxa alone is unlikely to meet the TV/print/outdoor scope.",
   "Fit score": 45,
   "Priority": "C",
   "Status": "New",
   "LinkedIn visited": false,
   "Adaxa Web visited": false,
   "Form submitted": false,
   "Last action": "Found by Claude 26/09/2026",
   "Next action": "Read the tender documents; contact 2-3 Croatian media agencies about a digital subcontract before 19/10.",
   "Notes": "Full-media contract; realistic only as a partner."
  },
  {
   "Lead ID": "ADX-L-20260926-05",
   "Date found": "26/09/2026",
   "Company": "De Dietrich Australia (via Freelancer.com)",
   "Contact / role": "Project owner on Freelancer.com",
   "Company URL": "https://www.freelancer.com/projects/google-ads/SEO-Google-Ads-Search-Specialist",
   "LinkedIn URL": "",
   "Website URL": "",
   "Need / signal": "Freelancer.com project: SEO, Google Ads and AI search specialist for a premium kitchen-appliance brand, AUD 1,500-3,000 fixed, 175 bids already (26/09/2026).",
   "Service angle": "One-off Google Ads + search audit and setup.",
   "Fit score": 30,
   "Priority": "D",
   "Status": "New",
   "LinkedIn visited": false,
   "Adaxa Web visited": false,
   "Form submitted": false,
   "Last action": "Found by Claude 26/09/2026",
   "Next action": "Low priority: heavy competition and low budget; bid only if there is spare capacity.",
   "Notes": "Freelancer.com is a weak source for Adaxa (1 relevant project of 551 matches)."
  }
 ],
 "DAILY_CONTROL_append": {
  "Date": "26/09/2026",
  "Front A target": 10,
  "Front A submitted": 0,
  "Front A remaining": 10,
  "Qualified shortlist": "No new role passed all filters on 26/09 (Saturday crawl); exception candidates from 25/09 already sent or skipped.",
  "Packages ready": "None",
  "Follow-ups due": "~01/10: Thyssen Ads, Brand Bolt, OnTheGoSystems, Powered by Search, Aimers, Adcubator, LAYER; ~08/10: Infobip, RNK Health, SimpleTiger, ScraperAPI, SolCrov; ~09/10: SDG, ennovationHUB, Taxes for Expats, Genesis, OnHires",
  "Front B qualified leads": 5,
  "LinkedIn visits": 0,
  "Adaxa Web visits": 0,
  "Forms submitted": 0,
  "Confirmations/evidence": "https://github.com/dakson2/ImportJSON/pull/2",
  "Blockers": "Few new senior Google-first remote roles open to Croatia; Workable API throttled on 26/09.",
  "Next action": "Contact Falkensteiner (Adaxa); weekday crawl; follow-ups ~01/10",
  "Last updated": "26/09/2026"
 },
 "ACTIVITY_LOG_append": [
  {
   "Activity ID": "CLAUDE-20260926-CRAWL",
   "Date/time": "<current UTC ISO time>",
   "Front": "DARIO",
   "Activity type": "Sourcing",
   "Target": "Crawl 26/09 - window first published on/after 12/09",
   "Target URL": "",
   "Related ID": "Q-20260911-DARIO",
   "Action": "Refreshed 808 employer ATS boards (37,047 postings), aggregators, Himalayas Croatia filter (458 roles), Remote Rocketship (1,108 openings), 64 Workday tenants; Workable global throttled (HTTP 429), so the 25/09 Workable data (4,709 postings) was reused plus a small slow pass.",
   "Outcome": "No new role passed all filters. One new in-window lead (VendueTech Growth Marketer, part-time) is equity-only and was excluded. No new older-but-live exception candidates beyond those reviewed on 25/09.",
   "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/pull/2",
   "Next step": "Next crawl on a weekday; prepare follow-ups due ~01/10",
   "Notes": ""
  },
  {
   "Activity ID": "CLAUDE-20260926-ADAXA",
   "Date/time": "<current UTC ISO time>",
   "Front": "ADAXA",
   "Activity type": "Sourcing",
   "Target": "Adaxa Agency (Front B) - new lead sources and 5 leads",
   "Target URL": "https://ted.europa.eu",
   "Related ID": "Q-20260911-DARIO",
   "Action": "Tested TED public tenders API (516 regional/EU advertising notices, 181 open), Freelancer.com API (551 Google Ads matches), freelancermap.de and PeoplePerHour, and mined job ads in Croatia for outsourcing signals.",
   "Outcome": "5 leads added to ADAXA LEADS: Falkensteiner Hotels Croatia (B), Foxelli Group (C), Lago (C), HP - Hrvatska pošta tender (C, partner route), De Dietrich Australia via Freelancer.com (D). Tenders are mostly full-media contracts; freelance marketplaces are low-value.",
   "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/pull/2",
   "Next step": "Dario picks which leads to contact; Falkensteiner first",
   "Notes": "Sources documented in adx/crawl/WORKFLOW-crawl-v2.md Addendum 5."
  },
  {
   "Activity ID": "CLAUDE-20260926-CLOSE-JUNE",
   "Date/time": "<current UTC ISO time>",
   "Front": "DARIO",
   "Activity type": "Decision",
   "Target": "Six June applications with no reply for 3+ months",
   "Target URL": "",
   "Related ID": "Q-20260911-DARIO",
   "Action": "Close APPLIED rows 9, 17, 19, 20, 21, 22 (Lead Ember, Jordan Digital Marketing, Sporty Group, ALM Corp, Qdrant, StubGroup).",
   "Outcome": "STATUS set to NO REPLY - CLOSE, decided by Dario 25/09/2026.",
   "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/pull/2",
   "Next step": "None",
   "Notes": ""
  }
 ]
}
```
