# CV po oglasu — workflow

Iznimka od UPUTE §1, na Darijev zahtjev od 31/10/2026.
- **Činjenice** o iskustvu stoje samo u UPUTE §8 (provjerene i „Ne tvrditi”). Ovdje je samo postupak.
- **Ne ide u repo:** kontakti, potpis ni CV-jevi (repo je javan).

## 0. Cilj svakog CV-a (Dario, 01/11/2026)

1. **Prvi i osnovni cilj je dobiti posao.** Sve u CV-u služi tome.
2. **Drugi cilj, bez obzira na ishod:** dovesti poslodavca na Darijev LinkedIn ili na adaxa.agency. Zato svaki CV ima:
   - **u zaglavlju:** klikabilne linkove `linkedin.com/in/dakson` i `adaxa.agency`;
     - LinkedIn vodi na https://www.linkedin.com/in/dakson/;
     - Adaxa vodi na stranicu „About Dario” s UTM-om `utm_source=<tvrtka>&utm_medium=cv&utm_campaign=job-application`, pa se u GA4 vidi koji je poslodavac otvorio stranicu;
   - **ispod potpisa:** „Dario Šuler · linkedin.com/in/dakson · adaxa.agency” s istim linkovima, u istom retku.
3. Linkovi se dodaju u dokumentu nakon izrade (Docs `updateTextStyle` s `link`, indeksi iz `read_doc`).

## 1. Izvori

| Što | Gdje |
|---|---|
| Mapa | Drive [CV po oglasu](https://drive.google.com/drive/folders/1cCZepnepiYEiMR_M3oPZrbHC6GL5kSTA) |
| Smjernice i analiza odbijenica (20 izvora) | [Google Doc](https://docs.google.com/document/d/15_M7csU1kozgzbikNc50TBVcvnM2C7UXyYebYf9uN1E/edit) |
| Master: poslovi i case studiji (oznake potvrde) | [Google Doc](https://docs.google.com/document/d/1tTF5NQPOuuVR2V2Gdxx2Y7HzRrK0QYEUnzA1b5UsqNE/edit) |
| Dokazi (snimke Google Adsa, GMC, case s filmom) | Drive mapa `1lj8AD1EWQae-StZmiRdV9IZKhEQTbpZV` |
| Potpis | Drive `1L3odnQPCE20Uonmu3bSGurF5cp-O_Hp_` (u CV se ugrađuje smanjen na 300 px, prikazan 120×42) |
| Zaglavlje s kontaktima | iz CV-a ili pisama na Driveu; nikad u repo |
| Linkovi na CV-jeve | privremena tablica `1lqX7aicbyP6ws8GSl_IdhMfVw6IUtiFdXZwzbEMOmdA`, stupac *CV po oglasu* (ispred *Odluka*) |

## 2. Postupak za jedan oglas

1. **Oglas:**
   - pročitaj ga ponovo na izvoru (ATS poslodavca);
   - zapiši naslov, lokaciju i preklapanje sati, kanale, budžete, alate, jezike, nice-to-have i način prijave;
   - provjeri je li oglas od regrutera: takav se preskače (UPUTE §4.7).
2. **Mapiranje:** za svaki zahtjev iz oglasa nađi provjerenu činjenicu u §8.
   - Ako činjenice nema, zahtjev ne ide u CV, nego u bilješku kao praznina.
   - Nove činjenice pitaj Darija (najviše 10 pitanja odjednom). Potvrđeno upiši u master i u §8 s datumom.
3. **Sadržaj CV-a** (engleski, najviše 2 stranice, redoslijed):
   - **Naslov:** zrcali naslov oglasa (bez lažne titule; službena Wowtech titula ostaje u iskustvu).
   - **At a glance:** obični redci; odgovaraju na pitanja iz forme:
     - lokacija, vremenska zona i dostupnost (10 dana);
     - zaposlenje ili B2B preko Adaxe (kod popisa EU zemalja bez Hrvatske samo osobni profil, UPUTE §4.2);
     - kanali i maksimalni budžeti;
     - tržišta;
     - alati;
     - jezici (engleski C1).
   - **Summary:** 4–5 rečenica riječima iz oglasa, samo provjerene činjenice.
   - **Selected results:** 4 stavke s brojkama, birane po oglasu (vidi §3).
   - **Experience:** Wowtech (5–6 stavki po oglasu), Adaxa (3–4 stavke).
   - **Earlier experience, Skills, Education & certifications, Languages.**
   - Potpis malo na dnu druge stranice.
4. **Izrada u Google Docsu:**
   - HTML s jednim `<style>` blokom (stilovi po tagu i klasi), jedan stupac, bez tablica i okvira;
   - potpis kao `data:image/png;base64`;
   - Drive `create_file` s `contentMimeType: text/html` u mapu *CV po oglasu*;
   - naziv `Dario_Suler_CV_<Tvrtka>`.
5. **Margine:** Docs `updateDocumentStyle`, gore i dolje 43 pt, lijevo i desno 47 pt.
6. **Provjera:**
   - izvoz u PDF (`download_file_content`, `application/pdf`) i `pdfinfo`: mora biti 2 stranice;
   - ako je 3, skrati stavke izravno u dokumentu (`deleteContentRange` / `insertText` uz `requiredRevisionId`);
   - `pdftotext` mora dati tekst ispravnim redom.
7. **Ispravak** postojećeg CV-a ide u isti dokument (Docs API), da link ostane isti.
7a. **Linkovi:** prema §0.
8. **Bilješka za Darija** u stupcu *CV po oglasu*: link, što je naglašeno, koje praznine ostaju.
9. **Log:** zapis u `ACTIVITY-LOG.md` (odjeljak „CV po oglasu i case studiji” i Dnevnik). Ništa se ne šalje; šalje Dario.

## 3. Bazen stavki (sadržaj je u §8; ovo je izbor po tipu oglasa)

| Stavka | Kad je koristiti |
|---|---|
| CAC s filmom (−10–12 % / do −21 %) | growth, UA, CAC, D2C, gotovo uvijek |
| Rujan 2026: ~£2,3M, ROAS po tipu kampanje | media buyer, skala, e-commerce |
| YouTube ~£1,2M u rujnu 2026 | Demand Gen, YouTube, video |
| RSA feed svaki sat | Search, automatizacija, e-commerce |
| MCC pipeline u Sheets | analitika, reporting, head-of |
| Dubrovnik (Promosapiens, ~€4K/mj) | dijagnostika, manji budžeti, agencije |
| Shopping feedovi: Channable, Apps Script, CSS, feed agencija | Shopping, PMax, e-commerce, feedovi |
| Skripte za tečajeve valuta | analitika, multi-market reporting |
| 15+ agencijskih specijalista; Lovehoney retail 7–10 | lead, head-of, upravljanje agencijom |
| Amazon Ads (DE, UK, IT, FR) i marketplace PPC u DE | marketplace, D2C |
| Politike osjetljive kategorije | health, regulirano, adult, dating |
| AI agenti (Claude Code, Codex), custom GPT-ovi | AI-native, automatizacija |
| PSOBŽ / psobz.eu: platforma za savez od 120+ članova, izrađena u mjesec dana s Claude Code + Codex (EN tekst u masteru, odjeljak 8) | AI pitanja u formama i pismima, AI-native role, inicijativa i vodstvo |
| LinkedIn kampanja za zapošljavanje | samo kad oglas traži LinkedIn |
| Supermetrics for Sheets → Apps Script → Tableau (reporting po klijentu, svaki sat) | analitika, reporting, agencije |
| Meta Pixel, GA, GTM, Zapier/IFTTT, Mailchimp | tracking, mala i srednja e-commerce, freelance |
| Crowdfunding Zvjezdarnice Višnjan (Meta, cilj ostvaren) | Meta, crowdfunding, neprofitne udruge |
| Microsoft Ads: starija US publika na Edgeu | Microsoft Ads, US tržište |
| ChatGPT Ads (platforma, seminari) | AI-native role, novi kanali (lemlist, Thrive) |
| AI botovi: screenshot/export → PPTX za sastanke | AI pitanja, reporting stakeholderima |

## 4. CV-jevi od 31/10/2026

| # | Poslodavac | Google Doc |
|---|---|---|
| 9 | Voy | `1ND3t_mo0zq6hONdmnRF60SM3Orqau0mTgkSZuqxjOag` |
| 12 | Echelonn | `1RlPKDLbDrofgzh97fR_gyVwHMAVQ8l-vb5zG5ug-c_s` |
| 14 | Scento | `1TWNofsebxetay-xi-8i5NQtSMMzHsuhJ-hlGsuBXkYQ` |
| 17 | RemotelyTalents (Dario: skip; ne koristi se) | `16kuZgxSk_d40XPXmBYyuoIAhI8v73bxtfTRG19XA7Lg` |
| 22 | eCommerce Smart | `1v4kpKUqfatUFFZ-s55fP2neqOyHwdlxN4ypu0vtMxEY` |
| 27 | Tameson | `1WEHliy8JuN8wZqNEpJyusBM-Ebei-JaVegf92JVdAfI` |
| 28 | D2LINE | `1mqcc9wNJUOTisxMCzw6dwrba0I0kn9nsSscV61u_n2o` |
| 37 | lemlist (s PSOBŽ stavkom) | `1cX-MqrsGcfVMuF8NsaWz-mJbgeDV8S95RHhlqVZENho` |
| 39 | Thrive Internet Marketing Agency | `1iUd2Vv29K2srmgDfk798MF8zZZaUhl-GMtS7ouxHhD8` |
| 40 | TripleTen | `1CBKo1tYL5XMzuYXoE-S5r8eyuq-q5tsjhmgNTaRHJzs` |
| 41 | appflame (regruter TalentC) | `13tlCscKMWMbsLifuDCxNbcUpnjmahpj_P7pFFeoii_o` |
| 42 | BetterMe | `1xwgqQ7A6XgnJXJoCh5ERrWLbyKGWHN5KxmRYzCA3eqc` |
| 44 | Nord Recruitment (regruter) | `1Ob7GamU0f-9NfzhSx-H5v0HTxJ_-drm8FtHBKfiI4a4` |
| 45 | Ad-Lab | `1dNwgIH5U66_q3LO5pgkXDBmlcqyjGH7091TmAcCDP_M` |

PDF: u dokumentu Datoteka → Preuzmi → PDF, ili `https://docs.google.com/document/d/<ID>/export?format=pdf`.
