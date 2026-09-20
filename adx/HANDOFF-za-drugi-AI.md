# Upute za drugi AI — projekt 1.ADX-Jobs

Stanje na 20.09.2026. Pročitaj ovo prije bilo čega drugog.

## Tko je kandidat

Dario Šuler, Osijek. Google Ads preko 10 godina, osobno vodio i optimizirao do **~2,5 M €
mjesečno** u Google Adsu. Zadnje 1–2 godine EMEA + APAC, koordinirao **15+ vanjskih agencijskih
PPC stručnjaka**, nadzor nad preko 5 M € mjesečno. Meta ~500 K/mj, LinkedIn ~30 K, TikTok ~20 K,
plus Microsoft/Bing i Amazon Ads. Gradi u Apps Scriptu i Ads Scriptsima. Referenca za plaću:
**~100.000 € bruto godišnje**. Može i kao zaposlenik i B2B preko Adaxa Agency.

## Pet pravila koja se ne pregovaraju

1. **Oglas stariji od 14 dana ne postoji.** Bez iznimke.
2. **Otvori oglas prije nego ga preporučiš.** Četiri role su preporučene neotvorene i sve četiri
   su umrle na provjeri — jedna nakon što je pismo već bilo napisano.
3. **Provjera vjerodostojnosti poslodavca je tvoj posao, ne Darijev.** Funding, headcount,
   proizvod, recenzije. Napiši što si provjerio.
4. **Hibrid:** u Hrvatskoj da, prvenstveno Slavonija i Osijek. Ostatak EU samo ako se na lokaciju
   ide otprilike jednom u 6–12 mjeseci. Dva-tri dana tjedno u stranom gradu je selidba, ne hibrid.
5. **Integritet:** odbij svaki oglas koji traži anti-detect alate, cloaking ili zaobilaženje
   politike oglašavanja, koliko god fit bio dobar.

## Kako se piše

Nikad izmišljen postotak ni rezultat. Osjetljiva kategorija se opisuje **po kategoriji, nikad po
klijentu** — ime klijenta se ne spominje. Praznine se izrijekom priznaju (nema medtech iskustva,
nema formalnog incrementality frameworka) jer priznata praznina prolazi intervju, a napuhana ne.
Razdvajaj **osobno vođen budžet** (2,5 M €/mj) od **regionalne odgovornosti** (5 M+ €/mj) — to
dvoje se nikad ne smije čitati kao ista tvrdnja.

## Kako se pretražuje

Cijeli postupak, izvori, API endpointi i zamke: `adx/crawl/WORKFLOW-crawl-v2.md`. Ukratko:
idi na strukturirane API-je jer vraćaju datume, ne na isječke iz tražilice. Najveći prinos ima
`api.lever.co/v0/postings/jobgether?mode=json`. Workable preko `curl` vraća Cloudflare 1015 —
za Workable koristi WebFetch.

## Kako se piše u tablicu

Claude ne može pisati u postojeći Google Sheet. Kanal je `adx/ADX_Bridge.gs`, koji se **zalijepi
u Extensions → Apps Script** nad tablicom `Work`. Ti pišeš ops JSON u `ADX_INBOX/`, skripta ga
izvrši i vrati receipt. Format i pravila su u `adx/README.md`.

**Stanje: ni jedan ops batch nije primijenjen.** Čeka ih devet, `001` do `009`. Prije `005`
obriši retke za **Whatnot** i **Impact Brands** iz njegovog `found.append` — oba oglasa su mrtva.

## Što čeka

- **Hilo by Aktiia, Head of Performance Marketing** — jedina živa rola, provjerena, objavljena
  16.09. Pismo v2 je na Driveu, s kutem oko medicinskog uređaja klase IIa i politike oglašavanja.
  To je najjači argument koji Dario ima i v1 pismo ga nije imalo.
- 7 redaka za `APPLIED` — `adx/ops/APPLIED_append_7_rows.tsv`, lijepi se na **A23**.
- ALL2 merge u tablici `Base` — dry run prošao 15.09., živi run nikad nije pokrenut.

## Jedna stvar koju moraš znati o brojkama

Cilj je 10 prijava dnevno. Crawl od 20.09. prošao je ~4.100 oglasa s datumima i našao **jednu**
rolu koja prolazi sve filtre. Od 3.879 Jobgether oglasa, 45 spominje Google Ads u zadnjih 14
dana i **nijedan** nije EU-remote na Darijevoj razini.

To nije neuspjeh pretrage nego nalaz o tržištu. Ne pokušavaj to riješiti češćim crawlanjem.
Poluga je opseg — hibrid, hrvatski tier, susjedni kanali, Front B — a ne učestalost.
