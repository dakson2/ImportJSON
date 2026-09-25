# Upute za drugi AI — projekt 1.ADX-Jobs

Stanje na **24.09.2026**. Zamjenjuje verziju od 20.09.

## Izvor istine

Živi listovi `Work` i `Base`, kako ih je 20.09. uskladio **CODEX-0920** (izravni upisi, ne Bridge).
APPLIED r23–30 je popunjen (uključujući LAYER, 17.09.), `Base/All` ima 481 tag, ALL2 zadržan.
**Ops batchevi 001–012 u `adx/ops/` se ne pokreću** — prepisali bi uskladene retke. Vidi
`adx/ops/SUPERSEDED.md`. Batch 013 je samo zapis, s `doNotReplay: true`.

## Dvije netočne tvrdnje iz 20.09. — ispravljene

- **Hilo by Aktiia, Head of Performance Marketing — NIJE ŽIVO.** Datum 16.09. bio je s agregatora.
- **Fortis Media — PADA na integritetu.** Zahtjevi traže cloaking i nabavu Business Managera od resellera.

Oba su ušla u dokument za slanje od 21.09., koji je sad na Driveu označen ❌.

## Pet pravila (nepromijenjeno)

1. Oglas stariji od 14 dana ne postoji. **Starost = najranija objava iste role u bilo kojoj zemlji**, ne
   zadnja kopija ni osvježenje.
2. **Provjereno = pročitano na ATS-u poslodavca ili u indeksu tog ATS-a.** Agregator je otkrivanje, ne provjera.
3. Vjerodostojnost poslodavca provjerava AI, ne Dario.
4. Hibrid: Hrvatska da (prvenstveno Slavonija/Osijek); ostatak EU samo ako je dolazak ~jednom u 6–12 mjeseci.
5. Integritet: odbij cloaking, anti-detect, izbjegavanje banova, nabavu računa od resellera. **Pročitaj cijeli
   tekst zahtjeva** prije presude. Tracker sam po sebi (Voluum, Keitaro) nije prekršaj.

## Stanje pipelinea 24.09.

Aktualni dokument: Drive **„SLANJE — stanje 24-09-2026 (provjereno na izvoru poslodavca)"**.

- **Tier A:** Infobip Growth Marketing Senior Specialist (Zagreb hibrid, objavljen 10.09. — zadnji dan 24.09.),
  RNK Health preko Toogeze (Head of Marketing, Europa remote, compounded GLP-1 telehealth — regulatorni rizik
  naveden), SimpleTiger (B2B SaaS PPC Manager, Breezy, tim u SAD-u).
- **Tier B:** Amplemarket, saas.group, Huzzle Senior Growth Marketer, SolCrov (datum nepoznat), Ruby Labs UA.
- **Follow-up, ne nova prijava:** OnTheGoSystems (Head of Marketing), Powered by Search.
- **Čeka Darijevu odluku:** Zagreb; RNK Health vertikala; je li 21.09. išta poslano.

## Metoda

`adx/crawl/WORKFLOW-crawl-v2.md`, sva tri dodatka. Najkorisnije: Workable globalna pretraga, izravni ATS
API-ji, **Remote Rocketship `__NEXT_DATA__` s poljem `locationCountries`** (točan popis dopuštenih zemalja),
Workday per-job endpoint za točan `startDate`.

## Jedna brojka

24.09. pretraženo ~20.700 oglasa kroz sve slojeve. Remote Rocketship u cijelom indeksu vidi 16 marketinških
rola otvorenih Hrvatskoj. Mali pool je nalaz o tržištu uz imenovan popis izvora — ne povod za češće crawlanje.
