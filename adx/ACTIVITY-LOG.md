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

#### W-002 · PENDING · Claude · 05/10/2026, dopuna 12/10/2026 — David Kennedy poslan, Syroscape VOID; usklađivanje s adx-jobs i tablicom; crawl 12/10
Dopuna 12/10: u nalog su dodani zapisi od 02–03/10 koji su postojali samo u repou `dakson2/adx-jobs`, prijave i statusi upisani izravno u tablicu 05–06/10 te crawl 12/10 (Dnevnik 12/10).

Koraci (UPUTE §10, R1–R9):
1. **APPLIED:** dodaj red za David Kennedy (dedupe Company + Job title).
2. **APPLIED:** obradi 6 stavki iz `APPLIED_updates` (Adcubator r29, SolCrov r36, Powered by Search r27, SimpleTiger r33, OnHires r42, OnTheGoSystems r25).
   - Provjeri `verify` (Company i Job title). Ako se red ne poklapa, nađi ga po Company + Job title i navedi to u izvještaju.
   - Ako `set` nije prazan, upiši ga u `STATUS`.
   - `append_to_Actions` dodaj na **kraj** ćelije `Actions`.
3. **Found positions:** dodaj dva reda. Syroscape `Priority` = `VOID - Dario 05/10/2026`.
4. **ADAXA LEADS, r2–r15** (L-0001…L-0014), po `ADAXA_LEADS_normalize` (W-001 je upisao vrijednosti koje validacija ne prihvaća):
   - u `Priority` zamijeni `A` → `A - Primary`, `B` → `B - Secondary`, `C` → `C - Watchlist`, `D` → `D - Skip`;
   - u `Status` zamijeni `New` → `QUALIFIED`.

   Mijenjaju se samo ćelije s točno tim vrijednostima.
5. **ADAXA JAVNA NABAVA:**
   - dodaj red iz `ADAXA_JAVNA_NABAVA_append` (PB-0056, Hrvatske autoceste) u prvi red s praznim `Buyer ID`; dedupe po `Buyer ID`;
   - u redu PB-0014 upiši ćelije iz `ADAXA_JAVNA_NABAVA_update.set`, a `append_to_Notes` dodaj na kraj ćelije `Notes`.
6. **ACTIVITY LOG:** dodaj 12 redova iz `ACTIVITY LOG`, ovim redom (02/10 → 12/10). Dedupe po `Activity ID`. `<current UTC ISO time>` zamijeni stvarnim UTC vremenom (R5). `Activity type` su vrijednosti koje u stupcu već postoje.
7. **DAILY CONTROL:** dodaj redove za 02/10, 03/10, 05/10, 06/10 i 12/10/2026 (preskoči datum koji već postoji).
8. **WORK QUEUE `Q-20260911-DARIO`:** postavi `Last updated`, `Next action` i `Notes` (prepisuju se samo te tri ćelije; `Notes` uključuje bilješku od 06/10).
9. **Ovaj log:** status promijeni u `APPLIED · <UTC>` i dodaj izvještaj po koracima, obriši payload, premjesti W-002 na vrh Dnevnika i commitaj na granu `claude/dario-adaxa-project-9u32ik`.

```json
{
 "APPLIED": [
  {"Date found": "05/10/2026", "Application deadline": "Not stated", "Job title": "Senior Performance Marketer - Mainstream", "Company": "David Kennedy Recruitment (client: consumer adult-AI companionship company)", "Job site": "Teamtailor / recruiter direct", "Work mode / Location": "Remote (Europe/Asia)", "Engagement type": "B2B preferred", "Compensation": "Not stated", "Availability status": "Teamtailor 02/10/2026; client not named; channels not named; no integrity red flags found", "Fit score": 80, "Priority": "A - Dario 05/10/2026", "Work description": "Hands-on paid acquisition for a consumer AI (adult companionship) company: personally controlled spend $300K+/month, CAC/ROAS/LTV/payback ownership, creative testing decisions, subscription funnels, account-restriction handling.", "Url": "https://davidkennedyrecruitment.teamtailor.com/jobs/8490833-senior-performance-marketer-mainstream", "Tag 1": "Paid Acquisition", "Tag 2": "Sensitive Category", "Tag 3": "Consumer AI", "Tag 4": "Remote", "Tag 5": "B2B", "Actions": "Submitted 05/10/2026 by Dario. Letter: https://docs.google.com/document/d/19u_stMNqML5RZ2iteWAy0l1E66m1cNWPZkTDgtxrGOE/edit . Follow-up ~19/10/2026.", "STATUS": "Submitted 05/10/2026"}
 ],
 "APPLIED_updates": [
  {"expected_row": 29, "verify": {"Company": "Adcubator", "Job title": "Senior Google Ads Media Buyer"}, "set": {"STATUS": "Rejected 02/10/2026"}, "append_to_Actions": " | Rejected - reported by Dario 02/10/2026."},
  {"expected_row": 36, "verify": {"Company": "SolCrov", "Job title": "Performance Marketing Specialist"}, "set": {"STATUS": "Interview 07/10/2026"}, "append_to_Actions": " | Interview on Wednesday 07/10/2026 at 11:30 - reported by Dario 02/10/2026. Outcome not recorded yet (asked 12/10/2026)."},
  {"expected_row": 27, "verify": {"Company": "Powered by Search", "Job title": "Senior Performance Marketing Strategist"}, "set": {}, "append_to_Actions": " | 02/10/2026: the original posting is no longer on the employer's Breezy board; the same role was re-published on 28/09/2026 at https://powered-by-search.breezy.hr/p/5fdbeb9f7455-senior-performance-marketing-strategist (checked by Claude)."},
  {"expected_row": 33, "verify": {"Company": "SimpleTiger", "Job title": "B2B SaaS PPC Manager"}, "set": {}, "append_to_Actions": " | 02/10/2026: the employer's Breezy board lists no open positions (checked by Claude)."},
  {"expected_row": 42, "verify": {"Company": "OnHires client", "Job title": "Senior PPC Specialist (Google Ads)"}, "set": {}, "append_to_Actions": " | 02/10/2026: the role is no longer listed on the OnHires Ashby board (checked by Claude)."},
  {"expected_row": 25, "verify": {"Company": "OnTheGoSystems", "Job title": "Technical Paid Advertising Specialist"}, "set": {}, "append_to_Actions": " | 02/10/2026: the role no longer appears in Workable search (checked by Claude)."}
 ],
 "Found positions": [
  {"Date found": "05/10/2026", "Application deadline": "Not stated", "Job title": "Senior Performance Marketer - Mainstream", "Company": "David Kennedy Recruitment (client: consumer adult-AI companionship company)", "Job site": "Teamtailor", "Work mode / Location": "Remote (Europe/Asia)", "Engagement type": "B2B preferred", "Compensation": "Not stated", "Availability status": "Teamtailor 02/10/2026; applied 05/10/2026", "Fit score": 80, "Priority": "A - Dario 05/10/2026", "Url": "https://davidkennedyrecruitment.teamtailor.com/jobs/8490833-senior-performance-marketer-mainstream"},
  {"Date found": "05/10/2026", "Application deadline": "Not stated", "Job title": "Senior Performance Marketing Manager", "Company": "Syroscape (via JobRack)", "Job site": "Workable (JobRack) / LinkedIn", "Work mode / Location": "Fully remote, US ET 7am-3pm", "Engagement type": "Full time", "Compensation": "$3,500-4,500/month (low pay flag)", "Availability status": "Workable A1EBE780C4 created 23/06/2026, republished 29/09/2026 (outside 14-day rule; exception considered). Letter prepared, not sent.", "Fit score": 72, "Priority": "VOID - Dario 05/10/2026", "Url": "https://apply.workable.com/jobrack/j/A1EBE780C4/"}
 ],
 "ADAXA_LEADS_normalize": {"rows": "r2-r15 (Lead ID L-0001 ... L-0014)", "Priority": {"A": "A - Primary", "B": "B - Secondary", "C": "C - Watchlist", "D": "D - Skip"}, "Status": {"New": "QUALIFIED"}},
 "ADAXA_JAVNA_NABAVA_append": [
  {"Buyer ID": "PB-0056", "Buyer": "HRVATSKE AUTOCESTE d.o.o.", "OIB": "", "Region": "", "Category": "Marketing", "Fit score": 5, "Priority": "B", "Adaxa angle": "Search and digital part of the national information campaign for the new Crolibertas toll system (drivers, including foreign tourists, searching how to pay); as a partner of the winning agency, or by asking for a separate digital lot during the consultation", "Last contract date": "", "Last contract": "", "Incumbent": "", "Last value EUR": 0, "2024 EUR": 0, "2025 EUR": 0, "2026 EUR": 0, "Usual month": "", "Expected next purchase": "Open procedure above EU thresholds after the prior consultation (29/09-06/10/2026)", "Open 2026 plan item": "Promidžbeno informativna kampanja novog sustava naplate cestarine Crolibertas (EUR 393,000, prior consultation, CPV 79340000)", "EOJN link": "https://eojn.hr/prior-consultation-eo/100957", "Adaxa Lead ID": "", "Status": "Monitor", "Next action": "The prior consultation closed on 06/10/2026 (no comment from Adaxa is recorded); watch EOJN for the open procedure and contact bidding agencies about the digital part", "Next check": "15/10/2026", "Last checked": "02/10/2026", "Notes": "Found by the EOJN monitor (prior market consultations) on 02/10/2026. HAC's own advertising contracts so far are small newspaper notices (Večernji list, Hanza Media)."}
 ],
 "ADAXA_JAVNA_NABAVA_update": [
  {"Buyer ID": "PB-0014", "verify": {"Buyer": "Centar za kulturno-društveni razvoj Novi prostori kulture"}, "set": {"Open 2026 plan item": "Oglašavanje na internetu i društvenim mrežama: EUR 26,500 (plan amended after 28/09/2026); contracted in 2026 so far EUR 11,650 (Think Say Make Do 11/02, HANZA MEDIA 16/04). Outdoor digital and jumbo posters: EUR 27,000.", "Next action": "Contact now: the 2026 internet and social ads plan was raised to EUR 26,500 and about EUR 14,850 is not contracted yet (in 2025 they planned EUR 25,000 and contracted EUR 4,160, so the plan is an upper bound)", "Next check": "15/10/2026", "Last checked": "02/10/2026"}, "append_to_Notes": " | 02/10/2026: 2026 plan item for internet and social ads amended to EUR 26,500 (EOJN monitor)."}
 ],
 "ACTIVITY LOG": [
  {"Activity ID": "CLAUDE-20261002-REJECT-ADCUBATOR", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Response received", "Target": "Adcubator - Senior Google Ads Media Buyer", "Target URL": "https://jobs.deel.com/adcubator/job-details/11319ab9-f2e9-4fa1-9a02-a97516d4e89a/overview", "Related ID": "Q-20260911-DARIO", "Action": "Dario reported the rejection on 02/10/2026.", "Outcome": "APPLIED STATUS set to Rejected 02/10/2026 (applied 17/09/2026).", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "None", "Notes": "Logged on 02-03/10 in dakson2/adx-jobs; copied here 12/10/2026."},
  {"Activity ID": "CLAUDE-20261002-INTERVIEW-SOLCROV", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Response received", "Target": "SolCrov - Performance Marketing Specialist", "Target URL": "https://www.solcrov.hr/performance-marketing-specialist", "Related ID": "Q-20260911-DARIO", "Action": "Dario reported an interview invitation on 02/10/2026.", "Outcome": "Interview on Wednesday 07/10/2026 at 11:30.", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "Prepare for the interview; Claude prepares a briefing on request", "Notes": "Logged on 02-03/10 in dakson2/adx-jobs; copied here 12/10/2026."},
  {"Activity ID": "CLAUDE-20261002-LIVENESS", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Verification", "Target": "Active applications - employer postings", "Target URL": "", "Related ID": "Q-20260911-DARIO", "Action": "Checked the employer postings of all 16 active applications on 02/10/2026 (Breezy, Ashby, Recruitee and Workday APIs, Workable search, Himalayas, career pages).", "Outcome": "Still listed on 02/10: Thyssen Ads, Brand Bolt, Aimers, Infobip (Workday, applications open), RNK Health (toogeza), SolCrov, Social Discovery Group, ennovationHUB, Taxes for Expats (Himalayas, expires about 07/10), Genesis, Puffy. No longer listed: SimpleTiger (Breezy board empty), OnHires client (not on the Ashby board), OnTheGoSystems Technical Paid Advertising Specialist (not in Workable search). Powered by Search re-published the same role on 28/09 under a new link. LAYER: e-mail application, no posting. A removed posting is not a rejection; the applications stay active until the employer replies.", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "Follow-ups for the 16-17/09 applications are due now", "Notes": "Logged on 02-03/10 in dakson2/adx-jobs; copied here 12/10/2026."},
  {"Activity ID": "CLAUDE-20261002-CRAWL", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Sourcing", "Target": "Crawl 02/10 - window first published on/after 18/09", "Target URL": "", "Related ID": "Q-20260911-DARIO", "Action": "Refreshed 808 employer ATS boards (796 ok, 36,632 postings); Jobgether, Jobicy, Remotive, RemoteOK, WWR, Working Nomads, Arbeitnow, TheMuse, Landing.jobs, DOU, posao.hr; Himalayas with country=Croatia (256 roles); Remote Rocketship (647 openings); 64 Workday tenants; Workable global small pass (571 postings); LinkedIn public search, 18 keywords x Croatia / European Union / EMEA / Worldwide (2,399 roles, 1,576 relevant by title). Window: first published on/after 18/09/2026, earliest copy wins.", "Outcome": "No new role passes all filters (965 in-window paid/growth postings, 561 unique). For Dario's decision: 1) Sweat Pants Agency - Senior Google Ads Buyer, DTC eCommerce (remote worldwide, client calls in US Eastern hours; first posted 30/08/2026, re-posted 27/09, so an exception is needed; pay not stated); 2) The Audio Programmer (recruiter) - GTM / Growth Manager for an audio-AI company (posted 01/10/2026, remote anywhere, USD 120-150k + equity; weak fit: not Google-centric, audio-technology knowledge required). Excluded after checking: country-locked or on-site abroad (Typeform Head of Acquisition Marketing - UK remote only on its Greenhouse; Hostinger Lithuania; Alan France; PayFit Paris; Tourlane Berlin 2 days a week; Trustero and Card Conduit US; TechBiz Ukraine; Hack The Box and Ferryhopper Athens hybrid), local language (hurra.com, everydays, MYRGA, amasulting, pathway - German; Online Minds - Danish; GTE and Stramark - Dutch; Copy Ga(n)g - Czech; Private Holding - on-site Bucharest), Meta-first or social (Reach Realm, IMPACT BRANDS, SF Marketing Agency), pay (NightOwl PHP, RSI Security USD 12/h), part-time (20four7VA), integrity (HireStakes crypto casino and sports betting), age (Revpanda Head of Marketing, BambooHR datePosted 24/11/2023), role type (David Kennedy Recruitment adult-AI subscription app; TransPerfect keyword linguist; Novakid CRM revenue; saas.group Head of Growth & Product).", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "Dario picks by number or skips; next crawl on the next working day", "Notes": "Logged on 02-03/10 in dakson2/adx-jobs; copied here 12/10/2026."},
  {"Activity ID": "CLAUDE-20261002-ADAXA", "Date/time": "<current UTC ISO time>", "Front": "ADAXA", "Activity type": "Sourcing", "Target": "Adaxa (Front B) - EOJN monitor, TED, Croatian job ads", "Target URL": "https://eojn.hr", "Related ID": "Q-20260911-ADAXA", "Action": "Ran eojn_monitor.py new --since 2026-09-28 (contracts, open procedures, prior market consultations, plan items); looked up Hrvatske autoceste and Novi prostori kulture in the contract register; TED since 28/09 (CPV 7934x, 79413, 79416); posao.hr marketing category.", "Outcome": "New: Hrvatske autoceste prior market consultation for the Crolibertas toll-system information campaign (EUR 393,000, open procedure above EU thresholds, comments until 06/10/2026), added as PB-0056 (B). Novi prostori kulture (PB-0014) amended its 2026 internet and social ads plan to EUR 26,500; EUR 11,650 contracted so far. Other new EOJN items are small (NP Risnjak EUR 2,000, Grad Novska EUR 2,000 items) or not digital. Open procedures unchanged (CERP deadline 05/10, HP 19/10). TED: no new Croatian notice; the rest are local-language campaigns (AT, DE, PL, ES). posao.hr: Superius d.o.o. (Pula) is hiring a content and campaigns specialist but already works with a paid-media agency (weak signal); Falkensteiner ads still open. No new ADAXA LEADS.", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "Dario decides by 06/10 whether to comment in the HAC consultation; contact Novi prostori kulture; Hrvatska Lutrija and Falkensteiner still wait for Dario", "Notes": "Logged on 02-03/10 in dakson2/adx-jobs; copied here 12/10/2026."},
  {"Activity ID": "CLAUDE-20261002-PKG-SWEATPANTS", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Application preparation", "Target": "Sweat Pants Agency - Senior Google Ads Buyer, DTC eCommerce (Remote)", "Target URL": "https://apply.workable.com/sweat-pants-agency/j/BEA85FB812", "Related ID": "Q-20260911-DARIO", "Action": "Dario picked option 1 of the 02/10 shortlist, which approves the age exception (first published 30/08/2026, re-posted 27/09). Claude wrote the cover letter from verified facts only (one stated gap: no formal geo-holdout tests), saved it as a Google Doc and exported two PDFs: the letter (1 page) and the letter + CV (3 pages). The Workable application form could not be read (apply.workable.com rate limit, HTTP 429/1015), so Dario received prepared answers for the likely form fields.", "Outcome": "Package ready; not submitted. Dario submits it himself.", "Evidence / confirmation URL": "https://docs.google.com/document/d/1XSLf7IzQrXkALN0XqyzRh42GZ6lI3A6JemkvyQq6m58/edit", "Next step": "Dario submits on Workable and tells Claude; the APPLIED row is added in the next order", "Notes": "Age exception approved by Dario on 02/10/2026 by choosing option 1. Logged on 02-03/10 in dakson2/adx-jobs; copied here 12/10/2026."},
  {"Activity ID": "CLAUDE-20261002-CRAWL2", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Sourcing", "Target": "Crawl 02/10, second deeper pass - window first published on/after 18/09", "Target URL": "", "Related ID": "Q-20260911-DARIO", "Action": "Second, deeper pass on 02/10/2026 after Dario asked for 7-10 relevant roles. LinkedIn public search in three passes (4,073 unique roles; Croatia, European Union, Europe, EMEA; 62 keywords); 1,440 employer ATS boards and feeds (69,806 postings), including 820 new boards found by mining company slugs from aggregator URLs and LinkedIn company names; Himalayas country=Croatia (656); Remote Rocketship (1,327 openings; 25 slugs x 5 seniority prefixes x 3 geographies); Workable global (2,504 postings); Jobgether (4,354); MojPosao API (all 1,878 Croatian ads) and the posao.hr marketing category; DailyRemote, Arc.dev, RemoteFirstJobs, Jobspresso; targeted web search for remote-EU paid search roles. Window: first published on/after 18/09/2026, earliest copy wins; Greenhouse first_published used where available.", "Outcome": "No new role passes all filters (971 unique in-window paid/growth postings). Closest options sent to Dario: 1) Grüns - Paid Media Manager, International (Greenhouse; remote, candidate based in or around Europe; Google and Meta launch in UK/EU/CA/ANZ; first published 25/08/2026, exception needed; pay not stated); 2) Websupport (team.blue) - Senior PPC Specialist (own careers page; Bratislava/remote; Google-first, EUR 3M+ yearly budget, hosting brands; published 14/08/2026, exception needed; from EUR 2,500 gross/month; remote outside Slovakia not stated); 3) iSpeedToLead - Senior Performance Acquisition Lead, Cash Offer (Ashby; remote, 20 listed countries without Croatia; hands-on Google and Meta for US seller leads; published 11/09/2026, exception needed; pay not stated); 4) Mother's Earth - Head of Growth (LinkedIn only, no ATS; fully remote EU; in window ~25/09/2026; Meta-first, Google via agencies); 5) Acquire (recruiter) - Senior Performance Marketing Manager, SEA & Meta (LinkedIn; Germany remote, EUR 80-90k; employer hidden; in window ~30/09/2026); 6) Boldin - Performance Marketing Lead (Greenhouse; Remote, USD 140-175k; first published 06/08/2026, exception needed; probably US only); 7) Protostar Labs - Senior Marketing & Communications Specialist (LinkedIn; Osijek; 01/10/2026; not Google/paid search). Excluded after checking: remote limited to a country list without Croatia or on-site abroad (Magic Inc Paid Search Manager - 14 country copies incl. PL/PT/ES, no HR, pay hidden; Typeform Head of Acquisition Marketing - UK remote, and Senior Paid Marketing Strategist - DE/IE/NL/PT/ES/UK, paid social and video, 17/08; Groupon Senior PPC - CZ/PL/ES, 20/04; Cyncly Performance Marketing Director - US remote or Lisbon/London hybrid; Constructor Knowledge - Belgrade/Sofia/Bremen; Kaufland e-commerce - remote in Germany; Datasite - UK/DE; Atticor, Nutrafol, Blacksmith Agency - US); German or other local language (Serviceplan, WBS, Drink & Paint, homie AI, Just Hiring, avenit, STUR, Pammys, benuta, Pagestreet, WPP Media DACH; Domino's NL - Dutch; Niulix and Fitollo - Polish); age (Preply Director of SEM 30/04; Creatio Senior PPC 22/07; Clario Head of Marketing 05/08); channel (Prosana Senior Media Buyer and Lucyd - paid social; Priority Tech - outbound; Salient Group and Influencer Hero - PLG/B2B pipeline; FOREO Zagreb - associate level, Amazon); pay (Mediboost - up to ZAR 80k/month, Sydney hours); gambling (MrQ, Betsson, ZEAL Network); role type (EverAI - AI companionship app, same category as the adult-AI app excluded earlier); Croatian ads on MojPosao and posao.hr - junior or not Google-first (Profesio, INGROSSO, s.Oliver, A1, Pepco, Aranea toys).", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "Dario picks by number or skips, and decides whether to allow (a) roles up to ~45 days old that are still live on the employer ATS and (b) remote roles limited to a list of EU countries without Croatia, with a B2B offer via Adaxa", "Notes": "Logged on 02-03/10 in dakson2/adx-jobs; copied here 12/10/2026."},
  {"Activity ID": "CLAUDE-20261003-CRAWL", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Sourcing", "Target": "Crawl 03/10 - window first published on/after 19/09", "Target URL": "", "Related ID": "Q-20260911-DARIO", "Action": "Third crawl, 03/10/2026, window first published on/after 19/09/2026 (earliest copy wins). Refreshed 1,628 employer ATS boards (1,614 ok, 59,574 postings); 153 new boards: 15 mined from aggregator URLs, 108 from LinkedIn company names, 8 Pinpoint and 22 Rippling boards (two ATS types added today). Aggregators (Jobgether, Jobicy, Remotive, RemoteOK, WWR, Working Nomads, Arbeitnow, TheMuse, Landing.jobs, DOU, posao.hr RSS); Himalayas country=Croatia (684); Remote Rocketship (1,124 openings); Workable global (1,466 postings); 64 Workday tenants; LinkedIn public search for the last 48 h (Croatia, European Union, Europe: 42 keywords, 1,631 roles; Worldwide: 15 keywords, 846 roles); MojPosao API (1,742 ads, none new since Friday 02/10 19:02 UTC); new source: EURES public search (2,275 Croatian ads in the last month, including the Croatian Employment Service). Liveness of the 02/10 options re-checked on the employer side.", "Outcome": "881 unique in-window paid/growth postings, 57 of them new since 02/10. New option for Dario: Chess.com - Senior Performance Marketing Manager (Rippling ATS; first published 02/10/2026; remote, team in 60+ countries; app user acquisition across App Store Ads, Google, Meta, YouTube and DSPs, budgets up to 8-9 figures; requires incrementality testing and AppsFlyer, which are not in Dario's verified facts; pay not stated). Weaker: BarkleyOKRP - FREELANCE Senior Paid Search Specialist (Greenhouse; Google Ads and SA360; first published 17/09/2026, exception needed; US agency, remote outside the US not stated); Euro Janković Đakovo - Voditelj/voditeljica marketinga (EURES/HZZ, 25/09/2026; Đakovo; general marketing with events, catalogues, social and Google Ads; pay not stated). All 02/10 options are still live (Grüns, Websupport, iSpeedToLead, Boldin on the employer ATS; Mother's Earth, Acquire, Protostar Labs open on LinkedIn; Sweat Pants on Workable). Excluded after checking: Forbes Advisor Paid Search Strategist and SEM Strategist (02/10; remote only in the UK, US or Israel); Silverback Strategies Senior Paid Media Manager and People.ai (US remote); Preply Head of Marketing Expansion (Barcelona/London hybrid); Peggy Creative Performance Lead (Meta video); Adhoq Team Lead Dating Media Buying (affiliate dating, Meta/native); Microblink Product Marketing Manager (product marketing); DEPT Zagreb/Split (no senior search role); Endpoints News (US); eskimi CMO (Vilnius hybrid); Croatian EURES and MojPosao ads (junior or specialist).", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "Dario picks by number or skips; the two rule exceptions from 02/10 are still open", "Notes": "Logged on 02-03/10 in dakson2/adx-jobs; copied here 12/10/2026."},
  {"Activity ID": "CLAUDE-20261005-CRAWL", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Sourcing", "Target": "Crawl 05/10 (first posted since 21/09)", "Target URL": "", "Related ID": "Q-20260911-DARIO", "Action": "LinkedIn 808, Jobgether 3,494, Remote Rocketship 777, Himalayas HR 441, Workable 286, WWR, Working Nomads, 209 ATS boards; EOJN since 28/09", "Outcome": "748 unique roles; 0 passed every filter; 3 offered to Dario; salary floor lowered to EUR 3,500/month", "Evidence / confirmation URL": "", "Next step": "Next crawl", "Notes": "Details in adx/ACTIVITY-LOG.md 05/10/2026"},
  {"Activity ID": "CLAUDE-20261005-DKR-SUBMIT", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Application submitted", "Target": "David Kennedy Recruitment - Senior Performance Marketer - Mainstream", "Target URL": "https://davidkennedyrecruitment.teamtailor.com/jobs/8490833-senior-performance-marketer-mainstream", "Related ID": "Q-20260911-DARIO", "Action": "Letter prepared by Claude; submitted by Dario", "Outcome": "Submitted 05/10/2026; Syroscape VOID by Dario", "Evidence / confirmation URL": "https://docs.google.com/document/d/19u_stMNqML5RZ2iteWAy0l1E66m1cNWPZkTDgtxrGOE/edit", "Next step": "Follow-up ~19/10/2026", "Notes": ""},
  {"Activity ID": "CLAUDE-20261012-SYNC", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Reconciliation", "Target": "Project records: this log, dakson2/adx-jobs and the Work sheet", "Target URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Related ID": "Q-20260911-DARIO", "Action": "Compared three records on 12/10/2026: this branch (Codex 04/10, Claude 05/10), the private repo dakson2/adx-jobs (last change 03/10) and the Work sheet (last change 06/10). Copied the 02-03/10 work from adx-jobs here: Adcubator rejection, SolCrov interview invitation, liveness check of active applications, crawls 02/10 and 03/10, Sweat Pants package. Recorded here the applications and HOLD decisions that were entered directly in Work on 05-06/10 (Thrive Talent Solutions, Shotstack, Pro Coffee Gear; RemotelyTalents, D2LINE, Whiskey Library, AbroadLimited and others).", "Outcome": "All facts are now in one W-002 order and one log. 19 active applications after W-002 (Adcubator rejected; Thrive, Shotstack, Pro Coffee Gear and David Kennedy added). Open for Dario: SolCrov interview outcome; Sweat Pants package (age exception approved 02/10, marked not recommended 04/10); the two rule exceptions from 02/10; which repo is the single source of truth.", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "Codex applies W-002; Dario answers the open questions", "Notes": "adx-jobs W-002 steps tied to the private repo (link replacement, Crawl tab row, Activity type list) were not carried over."},
  {"Activity ID": "CLAUDE-20261012-CRAWL", "Date/time": "<current UTC ISO time>", "Front": "DARIO", "Activity type": "Sourcing", "Target": "Crawl 12/10 - window first published on/after 28/09", "Target URL": "", "Related ID": "Q-20260911-DARIO", "Action": "Crawl 12/10/2026, window first published on/after 28/09/2026 (earliest copy wins). 784 employer ATS boards (Greenhouse, Ashby, Lever, Recruitee, SmartRecruiters, Teamtailor, Personio, Breezy, BambooHR, Pinpoint, Rippling), 201 of them new from LinkedIn company names; aggregators (Jobgether 4,353, Jobicy, Remotive, RemoteOK, WWR, Working Nomads, Arbeitnow, TheMuse, Landing.jobs, DOU, posao.hr); Himalayas country=Croatia (690); Remote Rocketship (1,123); Workable global (1,148); LinkedIn public search for the last 14 days: Croatia and European Union with 30 keywords, Europe, EMEA and Worldwide with 12 keywords (2,571 unique roles, 1,576 relevant by title); EURES Croatia (1,872); MojPosao (1,530); EOJN since 05/10.", "Outcome": "631 unique in-window paid/growth postings from ATS boards and aggregators, plus the LinkedIn set. Offered to Dario by number: 1) AttaPoll - User Acquisition Manager/Lead (Remote, Europe; EUR 5,000-7,500 gross/month + bonus; LinkedIn only, unverified; 09/10); 2) HLTH (99 Brands) - Google Ads Specialist (fully remote, same posting in six EU countries incl. Croatia since 08/10; EUR 2,700-4,300/month, low-pay flag; LinkedIn only, unverified); 3) Voy - Growth Marketing Manager, New Expansion (Greenhouse; Remote, Europe; first published 09/10; pay not stated). Need an age exception: 4) Fit4Me - User Acquisition Manager (Google Ads) (same role published 07/05, re-opened 06/10); 5) Jooble - Head of Acquisition (re-posted since 24/06; ad in Ukrainian). Weaker: 6) Strategyzer - Growth Marketing Lead (Breezy, fully remote, not Google-first); 7) Brightvision - Paid Media Specialist, 50% freelance (Teamtailor); 8) Bigburg GmbH - PPC specijalista (LinkedIn, home office in Croatia or freelance); 9) Echelonn - Google Ads Media Buyer (LinkedIn, 2+ years); 10) Admiral Media - Performance Marketer, Luxury Fashion & E-Commerce (LinkedIn, 2+ years). Excluded after checking: geography (Hostinger Google Ads Manager, Senior and Team Lead - hybrid based in Lithuania, Team Lead LT/PL/LV; Capital.com UA Manager PPC; ElevenLabs Paid Media Manager - UK only; Datasite; Gameopedia - Norway only; Nord Security; Surfshark; WITHIN - London or Berlin; Trustero, Goodwall, Current - US); language (Skelar - Ukrainian ad; Formula and Allformance - Russian required; German-language roles such as Evolve Digital, hurra.com, clera, omos media, Remazing); channel (Deel - Meta-first; Publitas - SEO-first); age (Whiskey Library - Ashby 10/09; BOOSTERS; TechBiz Global); other (Cranberry Panda - recruiter, team visits every ~6 weeks; Jobgether Head of B2C Growth - employer hidden; EverAI - same role Dario was already rejected for).", "Evidence / confirmation URL": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Next step": "Dario picks by number or skips; a package is prepared only for the numbers he picks", "Notes": "Croatian ads (MojPosao, EURES, LinkedIn): no senior paid-search role. Adaxa: FPZ NETLOOP digital marketing tender EUR 12,800, due 16/10; HAC Crolibertas is now an open procedure (EUR 393,000, due 09/11)."}
 ],
 "DAILY CONTROL": [
  {"Date": "02/10/2026", "Front A target": 10, "Front A submitted": 0, "Front A remaining": 10, "Qualified shortlist": "No new role passes all filters after two crawls. Closest options (second crawl): 1) Grüns - Paid Media Manager, International; 2) Websupport (team.blue) - Senior PPC Specialist; 3) iSpeedToLead - Senior Performance Acquisition Lead, Cash Offer; 4) Mother's Earth - Head of Growth; 5) Acquire (recruiter) - Senior Performance Marketing Manager, SEA & Meta; 6) Boldin - Performance Marketing Lead; 7) Protostar Labs - Senior Marketing & Communications Specialist. Still open from the first crawl: The Audio Programmer (weak).", "Packages ready": "Sweat Pants Agency - cover letter (Google Doc) and PDFs (letter; letter + CV); not submitted", "Follow-ups due": "Due now (from 01/10): Thyssen Ads, Brand Bolt, OnTheGoSystems, Powered by Search, Aimers, LAYER; ~08/10: Infobip, RNK Health, SimpleTiger; ~09/10: SDG, ennovationHUB, Taxes for Expats, Genesis, OnHires; ~12/10: Puffy. Interview: SolCrov 07/10/2026 11:30.", "Front B qualified leads": 0, "LinkedIn visits": 0, "Adaxa Web visits": 0, "Forms submitted": 0, "Confirmations/evidence": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Blockers": "Two crawls on 02/10 found no new role that passes all filters. Most senior Google-first remote roles in Europe are limited to a list of countries without Croatia, are German-language, or are older than 14 days.", "Next action": "Dario submits Sweat Pants; Dario picks from the second 02/10 list and decides on the two rule exceptions; SolCrov interview 07/10 11:30; follow-ups for the 16-17/09 applications; HAC consultation decision by 06/10", "Last updated": "02/10/2026"},
  {"Date": "03/10/2026", "Front A target": 10, "Front A submitted": 0, "Front A remaining": 10, "Qualified shortlist": "New on 03/10: Chess.com - Senior Performance Marketing Manager (remote; 02/10/2026; app user acquisition, gaps: incrementality, AppsFlyer). Weaker: BarkleyOKRP - FREELANCE Senior Paid Search Specialist (17/09, exception; US agency); Euro Janković Đakovo - Voditelj/voditeljica marketinga (local, general marketing). The 02/10 options are all still live.", "Packages ready": "Sweat Pants Agency (from 02/10; not submitted)", "Follow-ups due": "Due now (from 01/10): Thyssen Ads, Brand Bolt, OnTheGoSystems, Powered by Search, Aimers, LAYER; ~08/10: Infobip, RNK Health, SimpleTiger; ~09/10: SDG, ennovationHUB, Taxes for Expats, Genesis, OnHires; ~12/10: Puffy. Interview: SolCrov 07/10/2026 11:30.", "Front B qualified leads": 0, "LinkedIn visits": 0, "Adaxa Web visits": 0, "Forms submitted": 0, "Confirmations/evidence": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Blockers": "One new role passes the main filters on 03/10; senior Google-first remote roles open to Croatia remain rare.", "Next action": "Dario submits Sweat Pants; Dario picks from the 02/10 and 03/10 lists and decides on the two rule exceptions; SolCrov interview 07/10 11:30; follow-ups for the 16-17/09 applications; HAC consultation decision by 06/10", "Last updated": "03/10/2026"},
  {"Date": "05/10/2026", "Front A target": 10, "Front A submitted": 3, "Front A remaining": 7, "Qualified shortlist": "Crawl 05/10 shortlist: 1) David Kennedy Recruitment - Senior Performance Marketer, Mainstream (submitted); 2) Vysta; 3) Chess.com (both not proposed again); 4) Syroscape via JobRack (VOID). Submitted the same day outside this log: Thrive Talent Solutions - PPC Manager; Shotstack - Growth Marketing / Growth Engineer (APPLIED rows 44-45).", "Packages ready": 2, "Follow-ups due": 7, "Blockers": "Market thin: 0 roles passed every filter in the 05/10 crawl; follow-ups from 01/10 not recorded as sent", "Next action": "Next crawl; confirm 01/10 follow-ups; Puffy status; wait for David Kennedy, Thrive and Shotstack", "Last updated": "05/10/2026"},
  {"Date": "06/10/2026", "Front A target": 10, "Front A submitted": 1, "Front A remaining": 9, "Qualified shortlist": "No new shortlist; research only (D2LINE HOLD ROUTE / GEO; AbroadLimited closed; Pearmill, Acquire, Pop.store and Whiskey Library geo holds). Submitted: Pro Coffee Gear - Paid & Performance Marketing Lead (APPLIED row 46).", "Packages ready": "D2LINE letter prepared, not sent (no verified application route)", "Follow-ups due": "Thrive Talent Solutions and Shotstack ~19/10; Pro Coffee Gear ~20/10", "Confirmations/evidence": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Blockers": "Most remaining candidates fail on Croatia eligibility or have no verified free application route", "Next action": "Wait for Thrive, Shotstack and Pro Coffee Gear replies", "Last updated": "06/10/2026"},
  {"Date": "12/10/2026", "Front A target": 10, "Front A submitted": 0, "Front A remaining": 10, "Qualified shortlist": "Crawl 12/10 (first posted since 28/09): 1) AttaPoll - User Acquisition Manager/Lead; 2) HLTH - Google Ads Specialist (low-pay flag); 3) Voy - Growth Marketing Manager, New Expansion. Age exception needed: 4) Fit4Me - User Acquisition Manager (Google Ads); 5) Jooble - Head of Acquisition. Weaker: 6) Strategyzer; 7) Brightvision; 8) Bigburg GmbH; 9) Echelonn; 10) Admiral Media.", "Packages ready": "Sweat Pants Agency (since 02/10, not submitted; decision pending)", "Follow-ups due": "Overdue: 16-17/09 batch (from 01/10), 24/09 batch (from 08/10), 25/09 batch (from 09/10); Puffy 12/10; ~19/10 David Kennedy, Thrive, Shotstack; ~20/10 Pro Coffee Gear. SolCrov interview 07/10 - outcome not recorded.", "Front B qualified leads": 0, "Confirmations/evidence": "https://github.com/dakson2/ImportJSON/blob/claude/dario-adaxa-project-9u32ik/adx/ACTIVITY-LOG.md", "Blockers": "Senior Google-first remote roles open to Croatia remain rare; two of the three best new options exist only on LinkedIn (no employer ATS found)", "Next action": "Dario picks from the 12/10 list; SolCrov outcome; Sweat Pants decision; follow-ups; FPZ tender by 16/10", "Last updated": "12/10/2026"}
 ],
 "WORK QUEUE": {"Queue ID": "Q-20260911-DARIO", "Last updated": "<current UTC ISO time>", "Next action": "Dario picks from the 12/10 list (CLAUDE-20261012-CRAWL); SolCrov interview outcome (07/10); Sweat Pants decision; overdue follow-ups (16-17/09, 24/09 and 25/09 batches) and Puffy; wait for David Kennedy, Thrive and Shotstack (~19/10) and Pro Coffee Gear (~20/10)", "Notes": "12/10: records reconciled (CLAUDE-20261012-SYNC); crawl 12/10 logged (CLAUDE-20261012-CRAWL). 06/10 (kept): D2LINE HOLD ROUTE / GEO, no verified free active employer route; AbroadLimited SKIP CLOSED. User declines paid job-board subscriptions. 05/10: David Kennedy Recruitment submitted; Syroscape VOID; salary floor EUR 3,500/month (UPUTE §4.5)."}
}
```

### Odluke koje čekaju Darija

1. **Front A, crawl 12/10 (prva objava od 28/09).** U prozoru je 631 jedinstveni paid/growth oglas s ATS-a i agregatora te 2.571 LinkedIn rola. Ni jedna nova rola ne prolazi sva pravila bez napomene. Paket se radi samo za broj koji Dario izabere.

   **Prolaze pravila, uz napomene:**
   1. **AttaPoll — User Acquisition Manager/Lead (Remote, Europe)** ([LinkedIn](https://www.linkedin.com/jobs/view/4475227587)).
      - €5.000–7.500 bruto mjesečno + bonus. Senior, hands-on, izravno osnivačima; više od €1M godišnjeg budžeta.
      - Meta i Google, uz nagradni inventar, offerwalle, affiliate i CPA mreže. Aplikacija za nagradne ankete (2M MAU, 70+ zemalja, London).
      - Objavljeno 09/10. **Neprovjereno:** oglas postoji samo na LinkedInu, ATS nije pronađen.
      - Praznine: atribucija mobilnih aplikacija (MMP) i incentivizirani promet nisu u provjerenim činjenicama.
   2. **HLTH (99 Brands) — Google Ads Specialist** ([LinkedIn](https://www.linkedin.com/jobs/view/4477808188)).
      - Potpuno remote, ugovor ili puno radno vrijeme. Isti oglas od 08/10 za HR, PL, CZ, RO, BG i LT.
      - Google je cijeli posao: Search, Shopping, PMax, Demand Gen, YouTube i Merchant Center za sve zemlje. Traže 3+ godine i $50k+ mjesečno u e-commerceu.
      - ⚠️ niska plaća: €2.700–4.300 mjesečno (raspon zahvaća prag).
      - **Neprovjereno:** samo LinkedIn. Naslov je „Specialist”, razina Mid-Senior. Prijava traži opis računa koji je Dario osobno vodio i screenshot strukture kampanja.
   3. **Voy — Growth Marketing Manager, New Expansion** ([Greenhouse](https://voy-careers-cms.vercel.app/api/job-redirect?gh_jid=5001721101)).
      - Remote, lokacija „Europe” (postoji i kopija za London). Prva objava 09/10.
      - Novi korisnici za britanski telehealth za žene: paid search, paid social i affiliate, budžeti na Meti i Googleu, CAC, payback i eksperimenti.
      - Plaća nije navedena. Nedoumice: naslov je Manager, bez navedenih godina iskustva; ne piše izričito da je Hrvatska prihvatljiva.

   **Treba iznimka za starost:**
   4. **Fit4Me — User Acquisition Manager (Google Ads)** ([DOU](https://jobs.dou.ua/companies/fit4me/vacancies/376329/)).
      - Remote; tim radi s cijelog svijeta, jezgra radnog vremena 10–18 h po Kijevu. Google Search, Demand Gen i GDN, budžeti od $300k mjesečno, cilj $400k+.
      - Ista rola objavljena je 07/05 i zatvorena, a ponovno 06/10 (Himalayas) i 12/10 (DOU).
      - Traže 2+ godine (po naslovu nije senior). Plaća nije navedena. ATS nije pronađen; oglas je poslodavčev, na DOU-u.
   5. **Jooble — Head of Acquisition** ([DOU](https://jobs.dou.ua/companies/jooble/vacancies/376327/)).
      - Kijev, inozemstvo ili remote. Plaćeni promet i affiliate mreža na 66 tržišta; duboko znanje Google Adsa (PMax, Smart Bidding, Search), Meta i još jedan kanal; vođenje tima od 20+ ljudi; engleski B2+.
      - Ista rola objavljuje se od 24/06 (i 30/07, 04/09).
      - Oglas je na ukrajinskom. Plaća nije navedena. Vođenje tima od 20+ nije u provjerenim činjenicama.

   **Slabije (senioritet ili kanal):**
   6. **Strategyzer — Growth Marketing Lead** ([Breezy](https://strategyzer-ag.breezy.hr/p/423dd9256a6a-growth-marketing-lead)).
      - Potpuno remote, bez ograničenja lokacije; izvještava CEO-a (Alex Osterwalder). Objava 06/10 (Breezy daje datum ponovne objave).
      - **Slabo:** B2B SaaS growth (HubSpot, lifecycle, sadržaj), nije Google-first. Plaća nije navedena.
   7. **Brightvision — Paid Media Specialist, 50 %** ([Teamtailor](https://karriar.brightvision.se/jobs/8505727-paid-media-specialist-part-time-remote)).
      - Remote bilo gdje, kao freelancer s vlastitom tvrtkom (npr. preko Adaxe). B2B tech; Google, LinkedIn, Meta i TikTok; 3–5 godina. Objavljeno 06/10.
      - **Slabo:** pola radnog vremena i razina specijalista. Plaća nije navedena.
   8. **Bigburg GmbH — PPC specijalista** ([LinkedIn](https://www.linkedin.com/jobs/view/4477694943)).
      - 100 % od kuće; ugovor u Hrvatskoj na 12 mjeseci ili freelance; Google i Meta za klijente agencije; 4, 6 ili 8 sati dnevno; početak 01/11. Objavljeno 09/10, oglas na hrvatskom.
      - **Slabo:** razina specijalista. Plaća nije navedena. Neprovjereno (samo LinkedIn, prijava mailom).
   9. **Echelonn — Google Ads Media Buyer** ([LinkedIn](https://www.linkedin.com/jobs/view/4476589408)).
      - Potpuno remote, bilo gdje. Agencija samo za Google Ads i YouTube u e-commerceu (PMax, Shopping). Objavljeno 07/10.
      - **Slabo:** traže 2+ godine (razina specijalista). Plaća nije navedena. Neprovjereno.
   10. **Admiral Media — Performance Marketer, Luxury Fashion & E-Commerce** ([LinkedIn](https://www.linkedin.com/jobs/view/4476899993)).
       - Potpuno remote, zapošljavaju globalno. Meta, Google (Search, Shopping, PMax, YouTube), TikTok i Pinterest za luksuzni modni brend; šesteroznamenkasti mjesečni budžeti. Objavljeno 10/10.
       - **Slabo:** traže 2+ godine; Meta i Google su ravnopravni. Neprovjereno. Plaća nije navedena.
2. **SolCrov:** kako je prošao razgovor 07/10? U W-002 je `STATUS` = `Interview 07/10/2026` dok Dario ne javi ishod.
3. **Sweat Pants Agency — paket od 02/10, nije poslan.**
   - Dario je 02/10 izborom opcije 1 odobrio iznimku (prva objava 30/08). Codex je 04/10, bez tog zapisa, upisao da se rola ne preporučuje.
   - Oglas je 12/10 još objavljen na Workableu (kopije od 27/09 za PL, RO, BG, RS i MK).
   - Pitanje: šalje li Dario paket ([pismo](https://docs.google.com/document/d/1XSLf7IzQrXkALN0XqyzRh42GZ6lI3A6JemkvyQq6m58/edit)) ili rola ide u VOID?
4. **Dvije iznimke kao stalno pravilo** (pitanje od 02/10, bez odgovora, UPUTE §4):
   - (a) starost do oko 45 dana ako je oglas još objavljen na ATS-u poslodavca;
   - (b) remote rola s popisom EU zemalja bez Hrvatske, uz ponudu B2B ugovora preko Adaxe.
5. **Jedan izvor istine.**
   - Dario je 28/09 odlučio preseliti projekt u privatni repo `dakson2/adx-jobs`. Codex (04/10) i Claude (05/10) ipak su nastavili na ovoj grani, a adx-jobs od 03/10 nitko ne mijenja.
   - Prijedlog: ova grana ostaje jedino mjesto rada (tu je najnoviji rad i ovdje se sesije pokreću), a adx-jobs ostaje kao arhiva.
   - Repo je javan, pa u njega i dalje ne idu lozinke, tokeni, telefonski brojevi ni osobni e-mailovi.
6. **Rad izravno u tablici.** Prijave Thrive, Shotstack i Pro Coffee Gear (05–06/10) i HOLD odluke iz tog vremena upisane su izravno u Work, bez naloga i bez zapisa ovdje. Tko je to radio (Dario ili treći AI) i treba li i taj rad ubuduće ići kroz ovaj log?
7. **Adaxa:**
   - **Fakultet prometnih znanosti, digitalni marketing i medijsko praćenje** (Interreg NETLOOP, €12.800, rok 16/10): šalje li Adaxa ponudu? Detalji su u tablici „Adaxa — sljedeći koraci”.
   - Koje leadove prvo kontaktirati? Prijedlog je Hrvatska Lutrija (L-0005), Falkensteiner (L-0001) i Novi prostori kulture (PB-0014) odmah, a Zračna luka Osijek (L-0009) u listopadu–studenom.
8. **Foxelli (L-0002):** isplati li se honorar za zamjenu na 4 mjeseca. Ako da, prijava ide kao ugovorni suradnik preko Adaxe.

### Razgovori

| Kada | Tvrtka | Rola | Napomena |
|---|---|---|---|
| srijeda 07/10/2026 u 11:30 | SolCrov | Performance Marketing Specialist | Ishod nije zabilježen (Odluke, točka 2) |

### Follow-up raspored

Stanje 12/10. Nije zabilježeno je li ijedan follow-up poslan.

| Oko | Prijave |
|---|---|
| **sada (od 01/10)** | Thyssen Ads (poslano 16/09); Brand Bolt, OnTheGoSystems, Powered by Search, Aimers, LAYER (17/09) |
| **sada (od 08/10)** | Infobip, RNK Health (Toogeza), SimpleTiger (24/09) |
| **sada (od 09/10)** | Social Discovery Group, Taxes for Expats, Genesis, OnHires (25/09) |
| **12/10/2026** | Puffy (28/09). Stanje skills testa nije zabilježeno. |
| **19/10/2026** | David Kennedy Recruitment (05/10); Thrive Talent Solutions i Shotstack (05/10) |
| **20/10/2026** | Pro Coffee Gear (06/10) |

- Powered by Search je 28/09 ponovo objavio istu rolu, s novim linkom. Follow-up može spomenuti da je prijava poslana 17/09 na prvi oglas.
- Ako Taxes for Expats pozove na razgovor, treba pripremiti Google Ads audit i demo AI workflowa.

### Adaxa — sljedeći koraci

| Kada | Što | ID |
|---|---|---|
| **do 16/10** | **Fakultet prometnih znanosti — digitalni marketing i medijsko praćenje** (projekt Interreg NETLOOP HR–BiH–CG). Jednostavna nabava preko e-Dostave, €12.800, CPV 79342000, rok 16/10. Adaxa se može javiti izravno, za što treba registracija na EOJN-u. [EOJN](https://eojn.hr/tender-eo/105214) | novo |
| čim Dario odluči | **Novi prostori kulture (Zagreb):** plan za 2026. za oglašavanje na internetu i društvenim mrežama podignut je na €26.500. Ugovoreno je €11.650 (Think Say Make Do 11/02, Hanza Media 16/04). U 2025. planirali su €25.000, a ugovorili €4.160, pa je plan gornja granica. | PB-0014 |
| čim Dario odluči | **Hrvatska Lutrija:** pitati je li podrška za Google Ads iz 2026. još planirana. Stavka je u Q2 i nije ugovorena; zadnji izvođač je Risely digital (€6.000). | L-0005 · PB-0002 |
| čim Dario odluči | **Falkensteiner:** pronaći marketing leada za Hrvatsku na LinkedInu i poslati kratku poruku o Google Hotel Ads / metasearchu. Imaju otvoren oglas za metasearch & affiliate specijalista u Zadru. | L-0001 |
| čim Dario odluči | **Aranea toys (Zagreb, webshop Denis.hr):** traže voditelja/stručnjaka za e-commerce i digitalni marketing (EURES, 30/09). Ponuditi vanjsku uslugu umjesto zaposlenja. | novo |
| prije 19/10 | **HP – Hrvatska pošta:** oglašavanje uključujući internet, oko €1M, rok 19/10 (TED 664429-2026). Adaxa može ući samo kao digitalni partner medijske agencije. HP je 09/10 ugovorio strategiju i sadržaj za društvene mreže s BBDO Zagreb (€23.600). | L-0003 |
| do 09/11 | **Hrvatske autoceste — Crolibertas:** prethodno savjetovanje zatvoreno je 06/10 (nije zabilježeno je li Adaxa poslala primjedbu). Sada je otvoreni postupak, €393.000, rok 09/11. Adaxa može ući samo kao digitalni partner agencije koja se natječe. [EOJN](https://eojn.hr/tender-eo/104028) | PB-0056 |
| 15/10 | **EOJN pregled** (`eojn_monitor.py new --since 2026-10-12`) i praćenje natječaja **Ministarstva rada** nakon savjetovanja (€379.200) | PB-0055 |
| 15/10 | **HNK Split, Lječilište Topusko, HINA, Medicinski fakultet Osijek:** pitati kako kupuju stavke iz 2026. Topusko je 06/08 ugovorilo digitalni marketing za €24.000 s LINK2DIGITAL (u EOJN-u objavljeno nakon 05/10). | L-0006 · L-0007 · L-0012 · L-0013 |
| listopad–studeni | **Zračna luka Osijek:** ugovor s KRYPTON WEB SOLUTIONS (€6.000) ističe 31/01/2027.<br>Do €15.000 ZLO pita izravno pa kontakt mora prethoditi kupnji.<br>Ponuditi kratki audit: 7 slikovnih oglasa od 03/02/2026, bez search oglasa. | L-0009 · PB-0001 |
| studeni–prosinac | **Narodne novine** (ARBONA, €16.800, Google Ads + SEO), **Grad Dubrovnik** (Dubrovnik Pass), **NP Plitvička jezera**: javiti se prije objave planova za 2027. | L-0008 · L-0014 · L-0010 |
| svaki crawl dan | `python3 adx/tools/eojn_monitor.py new --since <zadnja provjera>` | — |

### Aktivne prijave — pravilo jedne prijave po tvrtki

Popis vrijedi nakon što se izvrši W-002. Izvor istine je kartica APPLIED.

**Aktivne (19):**
- Razgovor: SolCrov (07/10; ishod nije zabilježen).
- 16–17/09: Thyssen Ads, Brand Bolt, OnTheGoSystems, Powered by Search, Aimers, LAYER.
- 24/09: Infobip, RNK Health (Toogeza), SimpleTiger.
- 25/09: Social Discovery Group, Taxes for Expats, Genesis, OnHires (klijent).
- 28/09: Puffy.
- 05/10: David Kennedy Recruitment (klijent: consumer adult-AI companionship), Thrive Talent Solutions, Shotstack.
- 06/10: Pro Coffee Gear.

Za ove tvrtke ne predlaže se druga rola.

**Stanje oglasa 02/10/2026** (provjera na izvoru poslodavca):
- **Oglas još objavljen:** Thyssen Ads, Brand Bolt, Aimers, Infobip, RNK Health, SolCrov, Social Discovery Group, Taxes for Expats (na Himalayasu do ~07/10), Genesis, Puffy.
- **Oglas više nije objavljen:** SimpleTiger (Breezy ploča je prazna), OnHires (nema ga na Ashby ploči), OnTheGoSystems, Technical Paid Advertising Specialist (nema ga u Workable pretrazi). Uklonjen oglas nije odbijenica: prijava ostaje aktivna dok poslodavac ne odgovori.
- **Ponovo objavljen:** Powered by Search (28/09, novi link).
- **Bez oglasa:** LAYER (prijava mailom).

**Ne predlagati ponovo (Darijeve odluke i pravila):**
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
  - Ruby Labs Google Ads Manager (04/08).

---

## Dnevnik

### 12/10/2026 · Claude · Crawl 12/10 (prva objava od 28/09)
- **Dario:** „provjeri izmjene na projektu, uskladi se i kreni u crawl”.
- **Izvori:**
  - 784 ATS ploče (Greenhouse, Ashby, Lever, Recruitee, SmartRecruiters, Teamtailor, Personio, Breezy, BambooHR, Pinpoint, Rippling), od toga 201 nova, pronađena iz imena tvrtki s LinkedIna;
  - agregatori (Jobgether 4.353, Jobicy, Remotive, RemoteOK, WWR, Working Nomads, Arbeitnow, TheMuse, Landing.jobs, DOU, posao.hr), Himalayas HR (690), Remote Rocketship (1.123), Workable (1.148);
  - LinkedIn za zadnjih 14 dana: Hrvatska i EU s 30 ključnih riječi (1.617 rola), Europa, EMEA i Worldwide s 12 ključnih riječi (954 nove role). Ukupno 2.571 jedinstvena rola, 1.576 relevantnih po naslovu;
  - EURES Hrvatska (1.872) i MojPosao (1.530).
- **Rezultat:** s ATS-a i agregatora 631 jedinstveni paid/growth oglas u prozoru, uz LinkedIn. Ni jedna nova rola ne prolazi sva pravila bez napomene: dvije najbolje (AttaPoll, HLTH) postoje samo na LinkedInu, a Voy nema navedenu plaću ni godine iskustva. Lista od 10 opcija za Darija je u Otvoreno → Odluke, točka 1.
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
  - Sweat Pants: Dario je 02/10 odobrio iznimku, a Codex je 04/10 (bez tog zapisa) upisao da se rola ne preporučuje. Odlučuje Dario (Odluke, točka 3).
  - Tablica: David Kennedy još nije u APPLIED jer W-002 nije izvršen; DAILY CONTROL završava 28/09.
  - Ostaje jedan nalog `PENDING`: sve je u W-002, nema W-003.
  - Iz W-002 repoa adx-jobs nisu preneseni koraci vezani uz privatni repo (zamjena linkova, red u kartici Crawl, proširenje popisa `Activity type`). Ovisi o odluci o repou (Odluke, točka 5).
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
- Tablica: ništa (nema naloga). Mail na dakson2 nema odgovora poslodavaca; prijave idu na dario.suler@gmail.com, koji nije dostupan.

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
  - Dario je dobio 7 najbližih opcija s oznakom što koja ne prolazi, i pitanje o dvije iznimke u pravilima (Odluke, točka 4).
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
