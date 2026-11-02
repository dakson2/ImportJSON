# AdaxaBet · Sofascore pickovi

Sporedni projekt uz Adaxu. Svaki dan prolazi Sofascore ponudu (nogomet), čita što igraju top prediktori i daje rang-listu pickova za Sofascore natjecanje u prognozama.

Ne dira `adx/` ni biblioteku ImportJSON. Repo je javan, pa lozinke, FTP podaci i `secret` stoje samo u `config.local.php` na serveru (u `.gitignore`).

## Datoteke

| Datoteka | Što radi |
|---|---|
| `run.php` | Generira report za dan u `data/YYYY-MM-DD.json` i dopisuje red u `data/run.log` |
| `index.php` | Dashboard: pickovi po danu, kvote, top prediktori, publika, forma, procjena, EV |
| `src/Sofascore.php` | API klijent i logika odabira |
| `config.example.php` | Sve postavke; `config.local.php` ih nadjačava |

## Postavljanje (FTP → `/AdaxaBet/sofascore/`)

1. Uploadaj cijeli folder `adaxabet/sofascore/`.
2. Na serveru kopiraj `config.example.php` u `config.local.php` i upiši svoj `secret`.
3. Provjeri endpointe: `php run.php --probe`. Za svaki se ispisuje HTTP status. Ako top-prediktor putanje ne vrate `200`, ispravi ih u `config.local.php` (ključ `top_predictors`) ili postavi `enabled => false`.
4. Prvo pokretanje: `php run.php`, ili u browseru `run.php?key=SECRET`.
5. Cron (cPanel), svaki dan u 08:40:
   ```
   40 8 * * * cd /home/USER/public_html/AdaxaBet/sofascore && php run.php >/dev/null 2>&1
   ```
   Drugi krug prije večernjih utakmica, kad su kvote i glasovi svježiji:
   ```
   10 16 * * * cd /home/USER/public_html/AdaxaBet/sofascore && php run.php >/dev/null 2>&1
   ```

## Kako bira

Za svaki meč i ishod (1, X, 2) unutar raspona kvota:

- **procjena** = 55 % tržište (kvote bez marže) + 30 % top prediktori + 15 % publika, uz korekciju za formu od najviše ±5 bodova;
- gdje nema dovoljno glasova top prediktora ili publike, taj dio preuzima tržište;
- **EV** = procjena × kvota − 1.

Uz prosječnu kvotu 1.80 za pozitivan povrat treba pogoditi više od 55,6 %. Zato se pickovi s negativnim EV-om ne isplate ni kad su "sigurni".

## Testiranje bez mreže

`SOFASCORE_FIXTURES=/put/do/mape php run.php --date=YYYY-MM-DD` čita JSON datoteke iz mape umjesto s API-ja (ime datoteke = putanja s `_` umjesto `/`).
