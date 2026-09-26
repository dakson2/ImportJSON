#!/usr/bin/env python3
"""EOJN RH monitor for Adaxa (Front B): Croatian public buyers of digital advertising.

EOJN (https://eojn.hr) grids read from a JSON API that accepts the anonymous token every page carries
(<input id="uiUserToken">) plus the session cookies. See adx/crawl/WORKFLOW-crawl-v2.md, Addenda 6 and 7.

Usage (stdlib only):
  python3 eojn_monitor.py refresh [--since 2024-01-01] [--out adx/adaxa/eojn-buyers.json]
      Pull advertising/marketing contracts from the contract register, classify them, aggregate per buyer.
  python3 eojn_monitor.py new --since YYYY-MM-DD
      Relevant contracts published since the date, open tenders, and plan items changed since the date.
  python3 eojn_monitor.py buyer "<name fragment>"
      Every contract, plan item and procedure of one buyer.

Categories: G = Google Ads / search, D = platform digital ads (Meta, Google, social, online campaigns),
P = news-portal / web-page placements, S = social media management, M = marketing services.
"""
import argparse, collections, datetime, http.cookiejar, json, re, sys, time, urllib.parse, urllib.request

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


class EOJN:
    def __init__(self, page="https://eojn.hr/procurements-all"):
        self.op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
        html = self.op.open(urllib.request.Request(page, headers={"User-Agent": UA}), timeout=60).read().decode("utf-8", "ignore")
        self.token = re.search(r'id="uiUserToken" value="([^"]+)"', html).group(1)

    def get(self, grid, flt=None, sort="Id", take=200, skip=0):
        params = {"skip": skip, "take": take, "requireTotalCount": "true",
                  "sort": json.dumps([{"selector": sort, "desc": True}])}
        if flt:
            params["filter"] = json.dumps(flt, ensure_ascii=False)
        url = f"https://eojn.hr/api/searchgrid/{grid}/get?" + urllib.parse.urlencode(params)
        for attempt in range(3):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": UA, "UserToken": self.token, "Accept": "application/json"})
                return json.loads(self.op.open(req, timeout=120).read().decode("utf-8"))
            except urllib.error.HTTPError as e:
                if e.code in (400, 500):  # bad field name or filter: retrying will not help
                    raise
                time.sleep(5 * (attempt + 1))
        raise RuntimeError("EOJN request failed: " + url[:200])

    def all(self, grid, flt=None, sort="Id", cap=20000):
        # Page by the unique Id: sorting by a date with ties returns duplicates and skips rows.
        rows, skip = [], 0
        while True:
            d = self.get(grid, flt, sort, 200, skip)
            rows += d["data"]
            skip += len(d["data"])
            if not d["data"] or skip >= d["totalCount"] or skip >= cap:
                return rows, d["totalCount"]


def any_of(field, words):
    out = []
    for w in words:
        out += [[field, "contains", w], "or"]
    return out[:-1]


G = re.compile(r"google\s*ads|adwords|google\s+oglaš|oglaš\w*\s+(na|putem|preko)\s+google|google\s+kampanj|kampanj\w*\s+na\s+google"
               r"|\bppc\b|\bsem\b|tražilic|trazilic|\bseo\b|meta\s+i\s+google|google\s+i\s+meta", re.I)
NOT_G = re.compile(r"workspace|google\s+apps|g\s*suite|google\s+cloud|licenc", re.I)
D = re.compile(r"digitaln\w*\s+(oglaš|kampanj|promocij|promidžb|komunikacij|marketing)|online\s+(oglaš|kampanj|promocij|marketing)"
               r"|on\s+line\s+oglaš|internet\w*\s+oglaš|oglaš\w*\s+(na|putem|u)\s+(internet|društven|digital|web|online|portal|mrežn)"
               r"|zakup\w*\s+(oglasnog|medijskog)\s+prostora\s+na\s+(web|portal|internet|društven)|meta\s+ads|facebook|instagram|tiktok"
               r"|youtube|linkedin|display|banner|programmatic|digital\s+ads|digital\s+marketing|e-?marketing|mrežn\w*\s+oglaš", re.I)
S = re.compile(r"društven\w*\s+mrež|social\s+media|mrežn\w+\s+stranic", re.I)
M = re.compile(r"digitaln\w*\s+marketing|marketinšk\w*\s+uslug|usluge?\s+marketinga|marketing\w*\s+kampanj"
               r"|promocij\w*\s+(destinacij|turist)|oglašavanj\w*\s+(destinacij|turist)|kampanj", re.I)
OFFLINE = re.compile(r"tisk|novin|radij|radio|\btv\b|televiz|plakat|jumbo|billboard|bigboard|letak|brošur|katalog|vanjsk\w*\s+oglaš"
                     r"|outdoor|citylight|natječa|zapošljav|oglas\w*\s+za\s+(posao|radna|zapošlj)", re.I)
PORTAL = re.compile(r"portal|internetsk\w*\s+stranic|web\s+stranic|banner", re.I)
PLATFORM = re.compile(r"društven|facebook|instagram|meta|google|tiktok|youtube|digitaln\w*\s+oglaš|online\s+kampanj", re.I)
LED = re.compile(r"led\s+(display|ekran|zid|zaslon)|display-?a\s+dimenzij", re.I)
SLAVONIA = re.compile(r"osijek|osječk|slavon|vukovar|vinkovc|đakov|požeg|našic|valpov|beli manastir|virovitic|županj|ilok|slatin"
                      r"|orahovic|donji miholjac|pleternic|kutjev|nova gradiška|slavonski brod|brodsko", re.I)


JOB_ADS = re.compile(r"zapošljav|slobodn\w*\s+radn\w*\s+mjest|oglas\w*\s+za\s+(posao|radna|zapošlj)|natječaj\w*\s+za\s+(posao|radno|prijam)", re.I)


def classify(name):
    name = name or ""
    if JOB_ADS.search(name):  # recruitment ads on job portals are not advertising work
        return None
    if G.search(name) and not NOT_G.search(name):
        return "G"
    if LED.search(name):
        return None
    if D.search(name):
        return "P" if PORTAL.search(name) and not PLATFORM.search(name) else "D"
    if S.search(name):
        return "S"
    if M.search(name) and not OFFLINE.search(name):
        return "M"
    return None


def contract_queries(since):
    when = ["ContractDate", ">=", since]
    return {
        "cpv7934": [["Cpv", "startswith", "7934"], "and", when],
        "cpv79416": [["Cpv", "startswith", "79416"], "and", when],
        "google": [any_of("TenderName", ["Google", "google"]), "and", when],
        "oglas": [any_of("TenderName", ["oglaš", "Oglaš", "OGLAŠ"]), "and", when],
        "marketing": [any_of("TenderName", ["marketin", "Marketin", "MARKETIN"]), "and", when],
        "social": [any_of("TenderName", ["društvenim mrežama", "društvenih mreža", "DRUŠTVENIM MREŽAMA", "digitalni marketing",
                                         "digitalnog marketinga", "DIGITALNOG MARKETINGA", "Digitalni marketing"]), "and", when],
    }


def aggregate(rows):
    by = collections.defaultdict(list)
    for r in rows:
        c = classify(r.get("TenderName"))
        if c:
            r["_cat"] = c
            by[(r.get("CAIdentificationNumber") or "", r.get("CAName") or "")].append(r)
    buyers = []
    for (oib, name), rs in by.items():
        rs.sort(key=lambda r: r.get("ContractDate") or "")
        cats = collections.Counter(r["_cat"] for r in rs)
        years = sorted({(r.get("ContractDate") or "")[:4] for r in rs})
        value = {y: round(sum(r.get("TotalValue") or 0 for r in rs if (r.get("ContractDate") or "").startswith(y)), 2) for y in years}
        months = collections.Counter((r.get("ContractDate") or "")[5:7] for r in rs)
        peak = max(value.values()) if value else 0
        score = (3 if cats["G"] else 0) + (2 if cats["D"] else 0) + (1 if (cats["S"] or cats["M"] or cats["P"]) else 0)
        score += 2 if peak >= 10000 else (1 if peak >= 4000 else 0)
        score += 1 if len(years) >= 2 else 0
        score += 1 if SLAVONIA.search(name) else 0
        last = rs[-1]
        buyers.append({
            "oib": oib, "buyer": name, "score": score, "categories": "".join(sorted(cats)), "slavonia": bool(SLAVONIA.search(name)),
            "value_by_year": value, "usual_month": months.most_common(1)[0][0] if months else "",
            "last_date": (last.get("ContractDate") or "")[:10], "last_subject": last.get("TenderName"),
            "last_supplier": last.get("ContractorName"), "last_value": last.get("TotalValue"),
            "last_url": f"https://eojn.hr/contract-eo/{last['Id']}",
            "contracts": [{"id": r["Id"], "date": (r.get("ContractDate") or "")[:10], "subject": r.get("TenderName"),
                           "supplier": r.get("ContractorName"), "value": r.get("TotalValue"), "cat": r["_cat"]} for r in rs],
        })
    buyers.sort(key=lambda b: (-b["score"], -max(b["value_by_year"].values() or [0])))
    return buyers


def cmd_refresh(a):
    e = EOJN()
    seen = {}
    for key, flt in contract_queries(a.since).items():
        rows, total = e.all("VContractRegisterPublic", flt)
        for r in rows:
            seen[r["Id"]] = r
        print(f"{key}: {total} contracts", file=sys.stderr)
    buyers = aggregate(list(seen.values()))
    out = {"generated": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%MZ"), "since": a.since,
           "contracts_scanned": len(seen), "buyers": buyers}
    with open(a.out, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    cats = collections.Counter(c["cat"] for b in buyers for c in b["contracts"])
    print(f"{len(seen)} contracts scanned, {sum(cats.values())} relevant {dict(cats)}, {len(buyers)} buyers -> {a.out}")


def cmd_new(a):
    e = EOJN()
    today = datetime.date.today().isoformat()
    print(f"== Contracts published since {a.since}")
    seen = {}
    for key, flt in contract_queries("2020-01-01").items():
        rows, _ = e.all("VContractRegisterPublic", [flt, "and", ["InitialPublishTimestamp", ">=", a.since]])
        for r in rows:
            seen[r["Id"]] = r
    for r in sorted(seen.values(), key=lambda r: r.get("ContractDate") or ""):
        c = classify(r.get("TenderName"))
        if c:
            print(f"  [{c}] {(r.get('ContractDate') or '')[:10]} | {r.get('CAName')} | {r.get('TenderName')} | "
                  f"{r.get('ContractorName')} | EUR {r.get('TotalValue')} | https://eojn.hr/contract-eo/{r['Id']}")
    print(f"\n== Open procedures (deadline on or after {today})")
    terms = [["CPVExtended", "startswith", "7934"], "or", ["CPVExtended", "startswith", "79416"], "or",
             any_of("Name", ["oglaš", "Oglaš", "marketing", "Marketing", "digital", "Digital", "društvenim mrežama", "Google"])]
    rows, _ = e.all("TendersAll", [terms, "and", ["SubmissionDeadline", ">=", today]])
    for r in sorted(rows, key=lambda r: r.get("SubmissionDeadline") or ""):
        if classify(r.get("Name")) or (r.get("CPVExtended") or "").startswith(("7934", "79416")):
            print(f"  {(r.get('SubmissionDeadline') or '')[:10]} | {r.get('ContractingBody')} | {r.get('Name')} | "
                  f"EUR {r.get('EstimatedValue')} | {r.get('ProcedureType')} | https://eojn.hr/tender-eo/{r['Id']}")
    print(f"\n== Plan items (2026-2027) changed since {a.since}")
    words = any_of("PlanTenderName", ["oglaš", "Oglaš", "OGLAŠ", "digitaln", "Digitaln", "društvenim mrežama", "Google", "marketin", "Marketin"])
    rows, _ = e.all("PlanItemsPublic", [[["PlanYear", "=", 2026], "or", ["PlanYear", "=", 2027]], "and",
                                        ["LastModificationDate", ">=", a.since], "and", words])
    for p in rows:
        c = classify(p.get("PlanTenderName"))
        if c:
            print(f"  [{c}] {p['PlanYear']} | {p.get('PlanCA')} | {p.get('PlanTenderName')} | EUR {p.get('PlanItemEstimatedValue')} | "
                  f"{p.get('PlanItemStatusName')} | Q{p.get('PlanItemQuarter') or '-'} | https://eojn.hr/plan-eo/{p.get('ProcPlanId')}")


def cmd_buyer(a):
    e = EOJN()
    rows, n = e.all("VContractRegisterPublic", ["CAName", "contains", a.name])
    print(f"== Contracts: {n}")
    for r in sorted(rows, key=lambda r: r.get("ContractDate") or ""):
        c = classify(r.get("TenderName")) or "-"
        print(f"  [{c}] {(r.get('ContractDate') or '')[:10]} | {r.get('TenderName')} | {r.get('ContractorName')} | EUR {r.get('TotalValue')} | "
              f"https://eojn.hr/contract-eo/{r['Id']}")
    rows, n = e.all("PlanItemsPublic", ["PlanCA", "contains", a.name])
    print(f"\n== Plan items: {n}")
    for p in rows:
        if classify(p.get("PlanTenderName")):
            print(f"  {p['PlanYear']} | {p.get('PlanTenderName')} | EUR {p.get('PlanItemEstimatedValue')} | {p.get('PlanItemStatusName')} | "
                  f"https://eojn.hr/plan-eo/{p.get('ProcPlanId')}")
    rows, n = e.all("TendersAll", ["ContractingBody", "contains", a.name])
    print(f"\n== Procedures: {n}")
    for t in rows[:30]:
        print(f"  {(t.get('NoticePublishDate') or '')[:10]} | {t.get('Name')} | EUR {t.get('EstimatedValue')} | {t.get('TenderStatus')} | "
              f"https://eojn.hr/tender-eo/{t['Id']}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("refresh")
    r.add_argument("--since", default="2024-01-01")
    r.add_argument("--out", default="adx/adaxa/eojn-buyers.json")
    n = sub.add_parser("new")
    n.add_argument("--since", required=True)
    b = sub.add_parser("buyer")
    b.add_argument("name")
    a = ap.parse_args()
    {"refresh": cmd_refresh, "new": cmd_new, "buyer": cmd_buyer}[a.cmd](a)


if __name__ == "__main__":
    main()
