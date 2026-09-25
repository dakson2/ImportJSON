/*====================================================================================================================================*
  ADX Bridge — write channel for the 1.ADX-Jobs Work spreadsheet
  ====================================================================================================================================
  Version:      1.0.0
  Owner:        Dario Šuler
  Project:      1.ADX-Jobs
  ------------------------------------------------------------------------------------------------------------------------------------
  WHY THIS EXISTS

  Claude's Google Drive connector can READ any file and CREATE new files, but it cannot write cells into an existing
  spreadsheet (its update_file changes only title and parent folder). There is no Google Sheets connector available.
  So Claude cannot claim a WORK QUEUE row, append to ACTIVITY LOG or patch APPLIED directly.

  This script closes that gap without giving anything outside Google access to the sheet:

     1. Claude writes an operations file  ADX_INBOX/ops-<batchId>.json   (allowed: create new Drive file)
     2. This script reads it, validates it, applies it to `Work`         (runs as Dario, inside Apps Script)
     3. This script writes ADX_INBOX/receipts/receipt-<batchId>.json     (allowed: Claude reads it back)

  The receipt is the evidence trail. Every refused operation is named in it, so a failed write is never silent.

  ------------------------------------------------------------------------------------------------------------------------------------
  GUARDS (these implement the project rules mechanically, not by good intentions)

     - `Found positions` column Y and `Job sites` column G are never written. Any op touching them is refused.
     - ACTIVITY LOG is append-only. There is no update operation for it.
     - A WORK QUEUE row marked CLAIMED or IN PROGRESS by another owner cannot be taken over.
     - Every APPLIED patch must carry an `expect` block. If the live cell no longer matches, the op is refused.
       This is the "re-read the live row immediately before editing" rule, enforced.
     - A batchId is applied at most once. Re-processing the same file is a no-op.
     - dryRun validates everything and writes a receipt without touching the sheet.

  ------------------------------------------------------------------------------------------------------------------------------------
  SETUP

     1. Open the `Work` spreadsheet > Extensions > Apps Script. Paste this file.
     2. Run adxSetup() once and grant the permissions it asks for.
     3. Optional: run adxInstallTrigger() so the inbox is processed every 5 minutes with no clicking.

  Never put credentials, tokens or cookies in an ops file. This script does not read or write any.
 *====================================================================================================================================*/

var ADX = {
  WORK_ID: '15Do6cDJLu4CeBDsfnOpVzV1ZuO09pzHvNMsL54m7jt4',
  BASE_ID: '1JoqSmuT4TengPkDyLbngv7V2E0WM715kk59bvOos5Ks',
  PROJECT_FOLDER_ID: '1PajW6-eCWfcWzfE-E-4AXSDmW1r_jaJ-',
  INBOX_NAME: 'ADX_INBOX',
  PROCESSED_NAME: 'processed',
  RECEIPTS_NAME: 'receipts',
  STATE_SHEET: 'ADX_STATE',
  TZ: 'Europe/Zagreb',

  // Fields that must never be written, whatever an ops file asks for.
  PROTECTED: {
    'Found positions': ['Actions'],  // column Y
    'Job sites': ['Status']          // column G
  }
};

/* ---------------------------------------------------------------------------------------------------------------------------------
   Menu and setup
   --------------------------------------------------------------------------------------------------------------------------------- */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('ADX Bridge')
    .addItem('Process inbox now', 'adxProcessInbox')
    .addItem('Process inbox (dry run)', 'adxProcessInboxDryRun')
    .addSeparator()
    .addItem('Set up folders and state', 'adxSetup')
    .addItem('Install 5-minute trigger', 'adxInstallTrigger')
    .addItem('Remove trigger', 'adxRemoveTrigger')
    .addToUi();
}

function adxSetup() {
  var inbox = adxInbox_();
  adxSubfolder_(inbox, ADX.PROCESSED_NAME);
  adxSubfolder_(inbox, ADX.RECEIPTS_NAME);
  adxState_();
  var msg = 'ADX_INBOX ready: ' + inbox.getUrl();
  Logger.log(msg);
  return msg;
}

function adxInstallTrigger() {
  adxRemoveTrigger();
  ScriptApp.newTrigger('adxProcessInbox').timeBased().everyMinutes(5).create();
  return 'Trigger installed: adxProcessInbox every 5 minutes.';
}

function adxRemoveTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'adxProcessInbox') ScriptApp.deleteTrigger(t);
  });
  return 'Triggers removed.';
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   Inbox processing
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxProcessInboxDryRun() {
  return adxProcessInbox(true);
}

/**
 * Reads every ops-*.json in ADX_INBOX, applies it, writes a receipt and files the ops file under processed/.
 * Returns a short summary string.
 */
function adxProcessInbox(forceDryRun) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return 'Another run holds the lock; nothing done.';

  try {
    var inbox = adxInbox_();
    var receipts = adxSubfolder_(inbox, ADX.RECEIPTS_NAME);
    var processed = adxSubfolder_(inbox, ADX.PROCESSED_NAME);
    var ss = SpreadsheetApp.openById(ADX.WORK_ID);

    var pending = [];
    var it = inbox.getFiles();
    while (it.hasNext()) {
      var f = it.next();
      if (/^ops-.*\.json$/i.test(f.getName())) pending.push(f);
    }
    if (!pending.length) return 'Inbox empty.';

    pending.sort(function (a, b) { return a.getName() < b.getName() ? -1 : 1; });

    var summary = [];
    pending.forEach(function (file) {
      var receipt = adxApplyFile_(ss, file, forceDryRun);
      receipts.createFile(
        'receipt-' + receipt.batchId + '.json',
        JSON.stringify(receipt, null, 2),
        MimeType.PLAIN_TEXT
      );
      if (!receipt.dryRun) file.moveTo(processed);
      summary.push(receipt.batchId + ': ' + receipt.counts.applied + ' applied, ' +
                   receipt.counts.refused + ' refused, ' + receipt.counts.skipped + ' skipped');
    });
    return summary.join('\n');

  } finally {
    lock.releaseLock();
  }
}

function adxApplyFile_(ss, file, forceDryRun) {
  var batch, parseError = null;
  try {
    batch = JSON.parse(file.getBlob().getDataAsString('UTF-8'));
  } catch (e) {
    parseError = String(e);
    batch = {};
  }

  var batchId = batch.batchId || file.getName().replace(/^ops-|\.json$/gi, '');
  var dryRun = forceDryRun === true || batch.dryRun === true;
  var receipt = {
    batchId: batchId,
    sourceFile: file.getName(),
    owner: batch.owner || 'UNKNOWN',
    dryRun: dryRun,
    processedAt: adxNow_(),
    results: [],
    counts: { applied: 0, refused: 0, skipped: 0 }
  };

  if (parseError) {
    receipt.results.push({ op: -1, type: 'parse', status: 'REFUSED', detail: 'Invalid JSON: ' + parseError });
    receipt.counts.refused++;
    return receipt;
  }
  if (!batch.owner) {
    receipt.results.push({ op: -1, type: 'validate', status: 'REFUSED', detail: 'Missing required field: owner' });
    receipt.counts.refused++;
    return receipt;
  }
  if (!dryRun && adxBatchSeen_(batchId)) {
    receipt.results.push({ op: -1, type: 'idempotency', status: 'SKIPPED', detail: 'batchId already applied' });
    receipt.counts.skipped++;
    return receipt;
  }

  var ops = batch.ops || [];
  ops.forEach(function (op, i) {
    var res;
    try {
      res = adxApplyOp_(ss, op, batch.owner, dryRun);
    } catch (e) {
      res = { status: 'REFUSED', detail: String(e && e.message ? e.message : e) };
    }
    res.op = i;
    res.type = op.type;
    receipt.results.push(res);
    receipt.counts[res.status.toLowerCase()]++;
  });

  if (!dryRun) adxMarkBatch_(batchId, receipt.counts);
  return receipt;
}

function adxApplyOp_(ss, op, owner, dryRun) {
  switch (op.type) {
    case 'queue.claim':      return adxQueueClaim_(ss, op, owner, dryRun);
    case 'queue.update':     return adxQueueUpdate_(ss, op, owner, dryRun);
    case 'daily.upsert':     return adxDailyUpsert_(ss, op, dryRun);
    case 'activity.append':  return adxActivityAppend_(ss, op, dryRun);
    case 'leads.upsert':     return adxLeadsUpsert_(ss, op, dryRun);
    case 'applied.patch':    return adxAppliedPatch_(ss, op, dryRun);
    case 'applied.shiftLeft': return adxAppliedShiftLeft_(ss, op, dryRun);
    // Appending to APPLIED needs no bespoke handler: adxRowsAppend_ already validates column
    // names against the live header and refuses protected columns. APPLIED has none protected,
    // so a submission row is an ordinary append. Patching APPLIED still requires `expect`.
    case 'applied.append':   return adxRowsAppend_(ss, 'APPLIED', op, dryRun);
    case 'found.append':     return adxRowsAppend_(ss, 'Found positions', op, dryRun);
    case 'found.patch':      return adxRowsPatch_(ss, 'Found positions', op, dryRun);
    case 'listings.patch':   return adxRowsPatch_(ss, 'Listings', op, dryRun);
    case 'employers.patch':  return adxRowsPatch_(ss, 'Employers', op, dryRun);
    case 'listings.append':  return adxRowsAppend_(ss, 'Listings', op, dryRun);
    case 'employers.append': return adxRowsAppend_(ss, 'Employers', op, dryRun);
    case 'crawl.append':     return adxRowsAppend_(ss, 'Crawl', op, dryRun);
    case 'tabs.merge':       return adxTabsMerge_(op, dryRun);
    case 'tabs.delete':      return adxTabsDelete_(op, dryRun);
    default:
      return { status: 'REFUSED', detail: 'Unknown op type: ' + op.type };
  }
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   WORK QUEUE
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxQueueClaim_(ss, op, owner, dryRun) {
  var t = adxTable_(ss, 'WORK QUEUE');
  var row = adxFindRow_(t, 'Queue ID', op.queueId);
  if (!row) return { status: 'REFUSED', detail: 'Queue ID not found: ' + op.queueId };

  var current = adxCell_(t, row, 'Status');
  var holder = adxCell_(t, row, 'Owner AI');
  var locked = current === 'CLAIMED' || current === 'IN PROGRESS';
  if (locked && holder && holder !== 'UNASSIGNED' && holder !== owner) {
    return { status: 'REFUSED', detail: 'Row is ' + current + ' by ' + holder + '; not yours to take.' };
  }
  if (current === 'DONE') {
    return { status: 'REFUSED', detail: 'Row is DONE; open a new queue row instead of reopening a closed one.' };
  }

  var writes = {
    'Owner AI': owner,
    'Status': op.status || 'IN PROGRESS',
    'Claimed at': adxNow_(),
    'Last updated': adxNow_()
  };
  if (op.nextAction) writes['Next action'] = op.nextAction;
  if (op.notes) writes['Notes'] = op.notes;

  if (!dryRun) adxWriteCells_(t, row, writes);
  return { status: 'APPLIED', detail: 'Row ' + row + ' -> ' + writes['Status'] + ' / ' + owner };
}

function adxQueueUpdate_(ss, op, owner, dryRun) {
  var t = adxTable_(ss, 'WORK QUEUE');
  var row = adxFindRow_(t, 'Queue ID', op.queueId);
  if (!row) return { status: 'REFUSED', detail: 'Queue ID not found: ' + op.queueId };

  var holder = adxCell_(t, row, 'Owner AI');
  if (holder && holder !== 'UNASSIGNED' && holder !== owner) {
    return { status: 'REFUSED', detail: 'Row is owned by ' + holder + '; claim it before updating.' };
  }

  var writes = { 'Last updated': adxNow_() };
  if (op.status) writes['Status'] = op.status;
  if (op.nextAction) writes['Next action'] = op.nextAction;
  if (op.notes) writes['Notes'] = op.notes;

  if (!dryRun) adxWriteCells_(t, row, writes);
  return { status: 'APPLIED', detail: 'Row ' + row + ' updated' + (op.status ? ' -> ' + op.status : '') };
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   DAILY CONTROL — one row per date, updated in place
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxDailyUpsert_(ss, op, dryRun) {
  var t = adxTable_(ss, 'DAILY CONTROL');
  var date = op.date || adxToday_();

  var writes = {};
  Object.keys(op.fields || {}).forEach(function (k) { writes[k] = op.fields[k]; });
  writes['Last updated'] = adxNow_();

  // Validate before creating anything, so a bad op never leaves a half-written row behind.
  var unknown = Object.keys(writes).filter(function (k) { return !t.index.hasOwnProperty(k); });
  if (unknown.length) return { status: 'REFUSED', detail: 'Unknown DAILY CONTROL columns: ' + unknown.join(', ') };

  var row = adxFindRow_(t, 'Date', date);
  if (!row) {
    if (dryRun) return { status: 'APPLIED', detail: 'Would append new DAILY CONTROL row for ' + date };
    row = adxFirstFreeRow_(t);
    t.sheet.getRange(row, adxCol_(t, 'Date')).setValue(date);
  }

  if (!dryRun) adxWriteCells_(t, row, writes);
  return { status: 'APPLIED', detail: 'DAILY CONTROL ' + date + ' row ' + row + ': ' + Object.keys(writes).join(', ') };
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   ACTIVITY LOG — append only, no update path exists by design
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxActivityAppend_(ss, op, dryRun) {
  var t = adxTable_(ss, 'ACTIVITY LOG');
  var rows = op.rows || [];
  if (!rows.length) return { status: 'SKIPPED', detail: 'No rows supplied' };

  var required = ['front', 'activityType', 'target', 'action'];
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < required.length; j++) {
      if (!rows[i][required[j]]) {
        return { status: 'REFUSED', detail: 'Row ' + i + ' missing required field: ' + required[j] };
      }
    }
  }

  var stamp = Utilities.formatDate(new Date(), ADX.TZ, 'yyyyMMdd');
  var seq = adxActivitySeq_(t, stamp);
  var out = rows.map(function (r) {
    var line = new Array(t.width).fill('');
    line[adxCol_(t, 'Activity ID') - 1]                  = 'A-' + stamp + '-' + adxPad_(seq++, 3);
    line[adxCol_(t, 'Date/time') - 1]                    = r.dateTime || adxNow_();
    line[adxCol_(t, 'Front') - 1]                        = r.front;
    line[adxCol_(t, 'Activity type') - 1]                = r.activityType;
    line[adxCol_(t, 'Target') - 1]                       = r.target;
    line[adxCol_(t, 'Target URL') - 1]                   = r.targetUrl || '';
    line[adxCol_(t, 'Related ID') - 1]                   = r.relatedId || '';
    line[adxCol_(t, 'Action') - 1]                       = r.action;
    line[adxCol_(t, 'Outcome') - 1]                      = r.outcome || '';
    line[adxCol_(t, 'Evidence / confirmation URL') - 1]  = r.evidenceUrl || '';
    line[adxCol_(t, 'Next step') - 1]                    = r.nextStep || '';
    line[adxCol_(t, 'Notes') - 1]                        = r.notes || '';
    return line;
  });

  if (dryRun) return { status: 'APPLIED', detail: 'Would append ' + out.length + ' ACTIVITY LOG row(s)' };
  var at = adxFirstFreeRow_(t);
  t.sheet.getRange(at, 1, out.length, t.width).setValues(out);
  return { status: 'APPLIED', detail: 'Appended ' + out.length + ' row(s) at ' + at };
}

function adxActivitySeq_(t, stamp) {
  var col = adxCol_(t, 'Activity ID');
  var last = t.sheet.getLastRow();
  if (last <= t.headerRow) return 1;
  var ids = t.sheet.getRange(t.headerRow + 1, col, last - t.headerRow, 1).getValues();
  var max = 0;
  ids.forEach(function (r) {
    var m = /^A-(\d{8})-(\d+)$/.exec(String(r[0]).trim());
    if (m && m[1] === stamp) max = Math.max(max, parseInt(m[2], 10));
  });
  return max + 1;
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   ADAXA LEADS — one row per company/opportunity, reuse the Lead ID
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxLeadsUpsert_(ss, op, dryRun) {
  var t = adxTable_(ss, 'ADAXA LEADS');
  var fields = op.fields || {};

  var row = null;
  if (op.leadId) row = adxFindRow_(t, 'Lead ID', op.leadId);
  if (!row && fields['Company']) row = adxFindRow_(t, 'Company', fields['Company']);

  var unknown = Object.keys(fields).filter(function (k) { return !t.index.hasOwnProperty(k); });
  if (unknown.length) return { status: 'REFUSED', detail: 'Unknown ADAXA LEADS columns: ' + unknown.join(', ') };

  var leadId = op.leadId;
  if (!row) {
    // A new lead needs enough to be a lead, not just a company name.
    var need = ['Company', 'Need / signal', 'Next action'];
    for (var i = 0; i < need.length; i++) {
      if (!fields[need[i]]) {
        return { status: 'REFUSED', detail: 'New lead missing ' + need[i] + '; keep it as a research signal instead.' };
      }
    }
    if (dryRun) return { status: 'APPLIED', detail: 'Would create lead for ' + fields['Company'] };
    row = adxFirstFreeRow_(t);
    leadId = leadId || adxNextLeadId_(t);
    t.sheet.getRange(row, adxCol_(t, 'Lead ID')).setValue(leadId);
    if (!fields['Date found']) fields['Date found'] = adxToday_();
  }

  fields['Last action'] = fields['Last action'] || adxNow_();
  if (!dryRun) adxWriteCells_(t, row, fields);
  return { status: 'APPLIED', detail: 'Lead ' + (leadId || '(existing)') + ' at row ' + row };
}

function adxNextLeadId_(t) {
  var col = adxCol_(t, 'Lead ID');
  var last = t.sheet.getLastRow();
  var max = 0;
  if (last > t.headerRow) {
    t.sheet.getRange(t.headerRow + 1, col, last - t.headerRow, 1).getValues().forEach(function (r) {
      var m = /^L-(\d+)$/.exec(String(r[0]).trim());
      if (m) max = Math.max(max, parseInt(m[1], 10));
    });
  }
  return 'L-' + adxPad_(max + 1, 4);
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   APPLIED — patch named cells, but only against a matching `expect`
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxAppliedPatch_(ss, op, dryRun) {
  var t = adxTable_(ss, 'APPLIED');

  var row = op.row || null;
  if (op.matchUrl) {
    var found = adxFindRow_(t, 'Url', op.matchUrl);
    if (!found) return { status: 'REFUSED', detail: 'matchUrl not found in APPLIED' };
    if (row && row !== found) {
      return { status: 'REFUSED', detail: 'row ' + row + ' and matchUrl disagree (matchUrl is at ' + found + ')' };
    }
    row = found;
  }
  if (!row) return { status: 'REFUSED', detail: 'Supply row or matchUrl' };
  if (row <= t.headerRow) return { status: 'REFUSED', detail: 'Row ' + row + ' is not a data row' };

  var cells = op.cells || {};
  if (!Object.keys(cells).length) return { status: 'SKIPPED', detail: 'No cells supplied' };

  var unknown = Object.keys(cells).concat(Object.keys(op.expect || {}))
    .filter(function (k) { return !t.index.hasOwnProperty(k); });
  if (unknown.length) return { status: 'REFUSED', detail: 'Unknown APPLIED columns: ' + unknown.join(', ') };

  // Optimistic concurrency: refuse rather than overwrite a value that moved under us.
  if (!op.expect) {
    return { status: 'REFUSED', detail: 'APPLIED patches require an expect block naming the values you last read' };
  }
  var drift = [];
  Object.keys(op.expect).forEach(function (k) {
    var live = String(adxCell_(t, row, k)).trim();
    var want = String(op.expect[k]).trim();
    if (live !== want) drift.push(k + ': live "' + live + '" != expected "' + want + '"');
  });
  if (drift.length) return { status: 'REFUSED', detail: 'Row changed since you read it — ' + drift.join('; ') };

  if (dryRun) {
    return { status: 'APPLIED', detail: 'Would patch APPLIED row ' + row + ': ' + Object.keys(cells).join(', ') };
  }
  adxWriteCells_(t, row, cells);
  return { status: 'APPLIED', detail: 'Patched APPLIED row ' + row + ': ' + Object.keys(cells).join(', ') };
}

/**
 * Repairs a row whose cells were all pushed one column right from `fromColumn` onward, which is what happens when a
 * stray value lands in the middle of a row. The script shifts the LIVE cells left by one so the full original text
 * survives; nothing has to be retyped, and long descriptions cannot be truncated on the way through.
 *
 * The last column is cleared, because its value is what the bad insert pushed off the end — it is genuinely lost and
 * has to be restored separately by an applied.patch op.
 */
function adxAppliedShiftLeft_(ss, op, dryRun) {
  var t = adxTable_(ss, 'APPLIED');

  var row = op.row || null;
  if (op.matchUrl) {
    var found = adxFindRow_(t, 'Url', op.matchUrl);
    if (!found) return { status: 'REFUSED', detail: 'matchUrl not found in APPLIED' };
    if (row && row !== found) return { status: 'REFUSED', detail: 'row and matchUrl disagree' };
    row = found;
  }
  if (!row || row <= t.headerRow) return { status: 'REFUSED', detail: 'Supply a valid data row or matchUrl' };
  if (!op.expect) return { status: 'REFUSED', detail: 'applied.shiftLeft requires an expect block' };
  if (!op.fromColumn) return { status: 'REFUSED', detail: 'Supply fromColumn' };

  var from = adxCol_(t, op.fromColumn);
  var lastCol = t.width;

  var drift = [];
  Object.keys(op.expect).forEach(function (k) {
    var live = String(adxCell_(t, row, k)).trim();
    var want = String(op.expect[k]).trim();
    if (live !== want) drift.push(k + ': live "' + live + '" != expected "' + want + '"');
  });
  if (drift.length) return { status: 'REFUSED', detail: 'Row changed since you read it — ' + drift.join('; ') };

  if (dryRun) {
    return { status: 'APPLIED', detail: 'Would shift APPLIED row ' + row + ' left by one from column ' +
                                        op.fromColumn + ' (' + from + ') to ' + lastCol };
  }

  var range = t.sheet.getRange(row, from, 1, lastCol - from + 1);
  var vals = range.getValues()[0];
  vals.shift();
  vals.push('');
  range.setValues([vals]);

  return { status: 'APPLIED', detail: 'Shifted APPLIED row ' + row + ' left by one from ' + op.fromColumn +
                                      '; last column cleared and needs an applied.patch to restore' };
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   Generic append for the discovery tabs, with the protected columns refused
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxRowsAppend_(ss, tabName, op, dryRun) {
  var t = adxTable_(ss, tabName);
  var rows = op.rows || [];
  if (!rows.length) return { status: 'SKIPPED', detail: 'No rows supplied' };

  var protectedCols = ADX.PROTECTED[tabName] || [];
  var out = [];
  for (var i = 0; i < rows.length; i++) {
    var keys = Object.keys(rows[i]);
    var blocked = keys.filter(function (k) { return protectedCols.indexOf(k) !== -1; });
    if (blocked.length) {
      return { status: 'REFUSED', detail: tabName + ' row ' + i + ' targets protected column(s): ' + blocked.join(', ') };
    }
    var unknown = keys.filter(function (k) { return !t.index.hasOwnProperty(k); });
    if (unknown.length) {
      return { status: 'REFUSED', detail: tabName + ' row ' + i + ' unknown column(s): ' + unknown.join(', ') };
    }
    var line = new Array(t.width).fill('');
    keys.forEach(function (k) { line[adxCol_(t, k) - 1] = rows[i][k]; });
    out.push(line);
  }

  if (dryRun) return { status: 'APPLIED', detail: 'Would append ' + out.length + ' row(s) to ' + tabName };
  var at = adxFirstFreeRow_(t);
  t.sheet.getRange(at, 1, out.length, t.width).setValues(out);
  return { status: 'APPLIED', detail: 'Appended ' + out.length + ' row(s) to ' + tabName + ' at ' + at };
}

/**
 * Patches named cells on a discovery tab. Same contract as applied.patch: an `expect` block is required, and the
 * tab's protected columns are refused even when the caller asks for them.
 */
function adxRowsPatch_(ss, tabName, op, dryRun) {
  var t = adxTable_(ss, tabName);

  var row = op.row || null;
  if (op.matchUrl) {
    var found = adxFindRow_(t, 'Url', op.matchUrl);
    if (!found) return { status: 'REFUSED', detail: 'matchUrl not found in ' + tabName };
    if (row && row !== found) return { status: 'REFUSED', detail: 'row and matchUrl disagree' };
    row = found;
  }
  if (!row || row <= t.headerRow) return { status: 'REFUSED', detail: 'Supply a valid data row or matchUrl' };
  if (!op.expect) return { status: 'REFUSED', detail: tabName + ' patches require an expect block' };

  var cells = op.cells || {};
  if (!Object.keys(cells).length) return { status: 'SKIPPED', detail: 'No cells supplied' };

  var protectedCols = ADX.PROTECTED[tabName] || [];
  var blocked = Object.keys(cells).filter(function (k) { return protectedCols.indexOf(k) !== -1; });
  if (blocked.length) return { status: 'REFUSED', detail: 'Protected column(s) in ' + tabName + ': ' + blocked.join(', ') };

  var unknown = Object.keys(cells).concat(Object.keys(op.expect))
    .filter(function (k) { return !t.index.hasOwnProperty(k); });
  if (unknown.length) return { status: 'REFUSED', detail: 'Unknown ' + tabName + ' columns: ' + unknown.join(', ') };

  var drift = [];
  Object.keys(op.expect).forEach(function (k) {
    var live = String(adxCell_(t, row, k)).trim();
    var want = String(op.expect[k]).trim();
    if (live !== want) drift.push(k + ': live "' + live + '" != expected "' + want + '"');
  });
  if (drift.length) return { status: 'REFUSED', detail: 'Row changed since you read it — ' + drift.join('; ') };

  if (dryRun) return { status: 'APPLIED', detail: 'Would patch ' + tabName + ' row ' + row + ': ' + Object.keys(cells).join(', ') };
  adxWriteCells_(t, row, cells);
  return { status: 'APPLIED', detail: 'Patched ' + tabName + ' row ' + row + ': ' + Object.keys(cells).join(', ') };
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   Tab-level operations: consolidating one vocabulary tab into another, then removing the source
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxBook_(which) {
  if (which === 'base') return SpreadsheetApp.openById(ADX.BASE_ID);
  if (which === 'work' || !which) return SpreadsheetApp.openById(ADX.WORK_ID);
  throw new Error('Unknown spreadsheet: ' + which);
}

function adxKey_(v) { return String(v === null || v === undefined ? '' : v).trim().toLowerCase(); }

/**
 * Copies rows whose key does not yet exist in the target tab, mapping by header name so the two tabs do not
 * need identical columns. Columns present only in the source are ignored; the target's schema wins.
 *
 * Optional passes:
 *   fillMissing  fills cells that are EMPTY in the target from the source row with the same key. It never
 *                overwrites a value that is already there, so a manual decision in the target cannot be lost.
 *   trimKeys     trims stray leading/trailing whitespace from the target's key column, which otherwise breaks
 *                every exact-match lookup against that row.
 */
function adxTabsMerge_(op, dryRun) {
  var ss = adxBook_(op.spreadsheet);
  var src = adxTable_(ss, op.from);
  var dst = adxTable_(ss, op.to);
  var keyCol = op.keyColumn || 'Tag';
  if (!src.index.hasOwnProperty(keyCol) || !dst.index.hasOwnProperty(keyCol)) {
    return { status: 'REFUSED', detail: 'Key column "' + keyCol + '" must exist in both tabs' };
  }

  var srcRows = adxReadRows_(src);
  var dstRows = adxReadRows_(dst);

  var trimmed = 0;
  if (op.trimKeys && !dryRun) {
    dstRows.forEach(function (r) {
      var raw = String(r.values[keyCol] === null || r.values[keyCol] === undefined ? '' : r.values[keyCol]);
      if (raw !== raw.trim() && raw.trim() !== '') {
        dst.sheet.getRange(r.row, adxCol_(dst, keyCol)).setValue(raw.trim());
        trimmed++;
      }
    });
  } else if (op.trimKeys) {
    dstRows.forEach(function (r) {
      var raw = String(r.values[keyCol] === null || r.values[keyCol] === undefined ? '' : r.values[keyCol]);
      if (raw !== raw.trim() && raw.trim() !== '') trimmed++;
    });
  }

  var have = {};
  dstRows.forEach(function (r) {
    var k = adxKey_(r.values[keyCol]);
    if (k && !have.hasOwnProperty(k)) have[k] = r;
  });

  var filled = 0;
  if (op.fillMissing) {
    srcRows.forEach(function (s) {
      var k = adxKey_(s.values[keyCol]);
      var target = have[k];
      if (!k || !target) return;
      Object.keys(dst.index).forEach(function (col) {
        if (col === keyCol) return;
        var cur = target.values[col];
        var incoming = s.values[col];
        var curEmpty = cur === null || cur === undefined || String(cur).trim() === '';
        var hasIncoming = !(incoming === null || incoming === undefined || String(incoming).trim() === '');
        if (curEmpty && hasIncoming) {
          if (!dryRun) dst.sheet.getRange(target.row, adxCol_(dst, col)).setValue(incoming);
          filled++;
        }
      });
    });
  }

  var out = [], added = {};
  srcRows.forEach(function (s) {
    var k = adxKey_(s.values[keyCol]);
    if (!k || have.hasOwnProperty(k) || added.hasOwnProperty(k)) return;
    added[k] = true;
    var line = new Array(dst.width).fill('');
    Object.keys(dst.index).forEach(function (col) {
      if (!src.index.hasOwnProperty(col)) return;
      var v = s.values[col];
      line[adxCol_(dst, col) - 1] = (v === null || v === undefined) ? '' : v;
    });
    out.push(line);
  });

  if (dryRun) {
    return { status: 'APPLIED', detail: 'Would append ' + out.length + ' row(s) from ' + op.from + ' to ' + op.to +
                                        '; fill ' + filled + ' empty cell(s); trim ' + trimmed + ' key(s)' };
  }
  if (out.length) {
    var at = adxFirstFreeRow_(dst);
    dst.sheet.getRange(at, 1, out.length, dst.width).setValues(out);
  }
  return { status: 'APPLIED', detail: 'Appended ' + out.length + ' row(s) to ' + op.to +
                                      '; filled ' + filled + ' empty cell(s); trimmed ' + trimmed + ' key(s)' };
}

/**
 * Deletes a tab, but only after proving the data is safe somewhere else.
 *
 * `requireKeysIn` names the tab that must already contain every key from the tab being deleted. If even one key
 * is missing the op refuses and lists what would have been lost. A destructive op on a master vocabulary should
 * not be reachable by getting the order of a batch wrong.
 */
function adxTabsDelete_(op, dryRun) {
  var ss = adxBook_(op.spreadsheet);
  var doomed = adxTable_(ss, op.tab);
  var keyCol = op.keyColumn || 'Tag';

  if (!op.requireKeysIn) {
    return { status: 'REFUSED', detail: 'tabs.delete requires requireKeysIn naming the tab that must hold the data' };
  }
  var keeper = adxTable_(ss, op.requireKeysIn);

  var keeperKeys = {};
  adxReadRows_(keeper).forEach(function (r) {
    var k = adxKey_(r.values[keyCol]);
    if (k) keeperKeys[k] = true;
  });

  var missing = [];
  adxReadRows_(doomed).forEach(function (r) {
    var k = adxKey_(r.values[keyCol]);
    if (k && !keeperKeys[k]) missing.push(String(r.values[keyCol]).trim());
  });

  if (missing.length) {
    return { status: 'REFUSED',
             detail: 'Refusing to delete ' + op.tab + ': ' + missing.length + ' key(s) are not in ' +
                     op.requireKeysIn + ' — ' + missing.slice(0, 12).join(', ') +
                     (missing.length > 12 ? ', …' : '') };
  }

  if (dryRun) {
    return { status: 'APPLIED', detail: 'Would delete ' + op.tab + '; all keys verified present in ' + op.requireKeysIn };
  }
  ss.deleteSheet(doomed.sheet);
  return { status: 'APPLIED', detail: 'Deleted ' + op.tab + ' after verifying every key exists in ' + op.requireKeysIn };
}

/** Reads a tab into [{row, values:{header: value}}], skipping fully empty rows. */
function adxReadRows_(t) {
  var last = t.sheet.getLastRow();
  if (last <= t.headerRow) return [];
  var vals = t.sheet.getRange(t.headerRow + 1, 1, last - t.headerRow, t.width).getValues();
  var out = [];
  for (var i = 0; i < vals.length; i++) {
    var empty = vals[i].every(function (v) { return v === null || v === undefined || String(v).trim() === ''; });
    if (empty) continue;
    var o = {};
    Object.keys(t.index).forEach(function (h) { o[h] = vals[i][t.index[h] - 1]; });
    out.push({ row: t.headerRow + 1 + i, values: o });
  }
  return out;
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   Table helpers — columns are resolved by header text, never by a hard-coded letter
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxTable_(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error('Tab not found: ' + name);

  // Some tabs carry a spacer row above the header; find the first row that has non-empty labels.
  var scan = sheet.getRange(1, 1, Math.min(6, sheet.getMaxRows()), sheet.getLastColumn()).getValues();
  var headerRow = 0, header = null;
  for (var r = 0; r < scan.length; r++) {
    var filled = scan[r].filter(function (v) { return String(v).trim() !== ''; }).length;
    if (filled >= 3) { headerRow = r + 1; header = scan[r]; break; }
  }
  if (!header) throw new Error('No header row found in ' + name);

  var index = {};
  header.forEach(function (h, i) {
    var key = String(h).trim();
    if (key && !index.hasOwnProperty(key)) index[key] = i + 1;
  });

  return { sheet: sheet, headerRow: headerRow, header: header, index: index, width: header.length, name: name };
}

function adxCol_(t, header) {
  if (!t.index.hasOwnProperty(header)) throw new Error('Column "' + header + '" not in ' + t.name);
  return t.index[header];
}

function adxCell_(t, row, header) {
  return t.sheet.getRange(row, adxCol_(t, header)).getDisplayValue();
}

function adxWriteCells_(t, row, fields) {
  var protectedCols = ADX.PROTECTED[t.name] || [];
  Object.keys(fields).forEach(function (k) {
    if (protectedCols.indexOf(k) !== -1) throw new Error('Column "' + k + '" in ' + t.name + ' is protected');
    t.sheet.getRange(row, adxCol_(t, k)).setValue(fields[k]);
  });
}

function adxFindRow_(t, header, value) {
  var col = adxCol_(t, header);
  var last = t.sheet.getLastRow();
  if (last <= t.headerRow) return null;
  var vals = t.sheet.getRange(t.headerRow + 1, col, last - t.headerRow, 1).getDisplayValues();
  var want = String(value).trim();
  for (var i = 0; i < vals.length; i++) {
    if (String(vals[i][0]).trim() === want) return t.headerRow + 1 + i;
  }
  return null;
}

/** First row with nothing in it, so pre-formatted empty rows get filled instead of skipped. */
function adxFirstFreeRow_(t) {
  var last = t.sheet.getLastRow();
  if (last <= t.headerRow) return t.headerRow + 1;
  var vals = t.sheet.getRange(t.headerRow + 1, 1, last - t.headerRow, t.width).getDisplayValues();
  for (var i = 0; i < vals.length; i++) {
    var empty = vals[i].every(function (v) { return String(v).trim() === ''; });
    if (empty) return t.headerRow + 1 + i;
  }
  return last + 1;
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   Drive and state helpers
   --------------------------------------------------------------------------------------------------------------------------------- */

function adxInbox_() {
  return adxSubfolder_(DriveApp.getFolderById(ADX.PROJECT_FOLDER_ID), ADX.INBOX_NAME);
}

function adxSubfolder_(parent, name) {
  var it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

function adxState_() {
  var ss = SpreadsheetApp.openById(ADX.WORK_ID);
  var sh = ss.getSheetByName(ADX.STATE_SHEET);
  if (!sh) {
    sh = ss.insertSheet(ADX.STATE_SHEET);
    sh.getRange(1, 1, 1, 4).setValues([['Batch ID', 'Processed at', 'Applied', 'Refused']]);
    sh.hideSheet();
  }
  return sh;
}

function adxBatchSeen_(batchId) {
  var sh = adxState_();
  var last = sh.getLastRow();
  if (last < 2) return false;
  var ids = sh.getRange(2, 1, last - 1, 1).getDisplayValues();
  return ids.some(function (r) { return String(r[0]).trim() === String(batchId).trim(); });
}

function adxMarkBatch_(batchId, counts) {
  var sh = adxState_();
  sh.appendRow([batchId, adxNow_(), counts.applied, counts.refused]);
}

function adxNow_() {
  return Utilities.formatDate(new Date(), ADX.TZ, 'dd/MM/yyyy HH:mm');
}

function adxToday_() {
  return Utilities.formatDate(new Date(), ADX.TZ, 'dd/MM/yyyy');
}

function adxPad_(n, width) {
  var s = String(n);
  while (s.length < width) s = '0' + s;
  return s;
}
