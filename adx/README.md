# ADX Bridge — write channel for the `Work` spreadsheet

Claude can read every file in your Drive and create new ones, but it **cannot write cells into an existing
spreadsheet**. The Google Drive connector's `update_file` changes only a file's title and parent folder, and there is
no Google Sheets connector in the claude.ai connector directory — only third-party spreadsheet products
(Smartsheet, Tiller, Aleph, Rockhopper). Nothing is misconfigured on your side; the capability does not exist.

That blocks the whole `1.ADX-Jobs` protocol: claiming a `WORK QUEUE` row, appending to `ACTIVITY LOG`,
updating `DAILY CONTROL`, patching `APPLIED`.

This bridge closes the gap using only what is actually available:

```
Claude  ──create new Drive file──>  ADX_INBOX/ops-<batchId>.json
                                          │
                             ADX_Bridge.gs (runs as you, in Apps Script)
                                          │
                              ┌───────────┴───────────┐
                     writes into `Work`      ADX_INBOX/receipts/receipt-<batchId>.json
                                                      │
Claude  <──────────────read receipt───────────────────┘
```

The receipt closes the loop: Claude can verify what landed and what was refused, so a failed write is never silent.
No network access is required, and nothing outside Google ever touches the sheet.

## Setup (once)

1. Open the `Work` spreadsheet → **Extensions → Apps Script**.
2. Paste `ADX_Bridge.gs` in and save.
3. Run `adxSetup()` and grant the permissions it requests. It creates `ADX_INBOX/`, `ADX_INBOX/processed/`,
   `ADX_INBOX/receipts/` inside the main project folder, plus a hidden `ADX_STATE` tab for applied batch IDs.
4. Optional: run `adxInstallTrigger()` so the inbox drains every 5 minutes without you clicking anything.
   Without it, use the **ADX Bridge → Process inbox now** menu.

## Guards

These are the project's own rules, enforced by code rather than by good intentions.

| Rule | How it is enforced |
| --- | --- |
| `Found positions` column Y and `Job sites` column G are protected | Any op naming them is refused |
| `ACTIVITY LOG` is append-only | No update operation exists for it |
| Never edit a queue row claimed by another AI | `queue.claim` refuses when `CLAIMED`/`IN PROGRESS` belongs to someone else |
| Re-read the live row immediately before editing | Every `APPLIED` op requires an `expect` block; a drifted value is refused, not overwritten |
| Never create a second tracker | The bridge only ever writes into `Work` |
| Preserve history | Duplicates are marked, never deleted |
| Idempotency | A `batchId` is applied at most once; re-processing is a no-op |

`dryRun: true` validates everything and writes a full receipt without touching the sheet. The ops file stays in the
inbox after a dry run so you can flip the flag and re-run.

## Ops file format

```json
{
  "batchId": "ADX-20260911-001",
  "owner": "AI-2",
  "dryRun": true,
  "ops": [ { "type": "...", "...": "..." } ]
}
```

`batchId` and `owner` are required. `owner` must be a stable label (`AI-1`, `AI-2`, `Dario`).

### Operations

| Type | Purpose |
| --- | --- |
| `queue.claim` | Take a `WORK QUEUE` row. `queueId`, optional `status`, `nextAction`, `notes` |
| `queue.update` | Update a row you own. `queueId`, optional `status`, `nextAction`, `notes` |
| `daily.upsert` | Upsert the `DAILY CONTROL` row for a date. `date`, `fields` keyed by header |
| `activity.append` | Append `ACTIVITY LOG` rows. `rows[]` need `front`, `activityType`, `target`, `action` |
| `leads.upsert` | Upsert `ADAXA LEADS` by `leadId` or company. A new lead requires Company, Need / signal and Next action |
| `applied.patch` | Patch named cells. `row` or `matchUrl`, `cells`, and a required `expect` |
| `applied.shiftLeft` | Repair a row whose cells were pushed one column right. `row`/`matchUrl`, `fromColumn`, `expect` |
| `found.append`, `listings.append`, `employers.append`, `crawl.append` | Append rows, keyed by header name |

Cell keys are **header text**, never column letters, so the ops file keeps working if a column moves.

`applied.shiftLeft` shifts the *live* cells rather than taking replacement values, so long descriptions cannot be
truncated in transit. It clears the last column, because that value is what the bad insert pushed off the end —
restore it with a following `applied.patch` in the same batch.

### Receipt

```json
{
  "batchId": "ADX-20260911-001",
  "owner": "AI-2",
  "dryRun": true,
  "processedAt": "11/09/2026 21:40",
  "results": [ { "op": 0, "type": "applied.shiftLeft", "status": "APPLIED", "detail": "..." } ],
  "counts": { "applied": 8, "refused": 0, "skipped": 0 }
}
```

Every op reports `APPLIED`, `REFUSED` or `SKIPPED` with a reason.

## Pending batch

`ops/ops-ADX-20260911-001-applied-cleanup.json` holds the reviewed `APPLIED` repair:

- rows 7 and 14 — the two column-shifted **plancraft** rows (stray tags `Full Funnel` / `Paid Search` had landed in
  `Company`), shifted back;
- row 14 — the `Aplication 11 - Plancraft` folder reference restored, recovered from Drive;
- row 7 — folder marked `Manual verify`, because only one plancraft folder exists for two Personio job IDs;
- row 16 — marked duplicate of row 9 (Lead Ember, the blocker named in `DAILY CONTROL`);
- row 8 — marked duplicate of row 15 (Noventra, a soft duplicate URL-first dedup cannot catch);
- two `ACTIVITY LOG` entries and a `DAILY CONTROL` blocker refresh.

It ships with `dryRun: true`. Upload it to `ADX_INBOX`, read the receipt, then set `dryRun` to `false` and re-run.

## Never

Do not put passwords, tokens, API keys or session cookies in an ops file, a receipt, or this repository. The bridge
neither reads nor writes any credential.
