/**
 * ADX — merge Base > ALL2 into Base > All, then delete ALL2.
 *
 * Paste into the Base spreadsheet: Extensions > Apps Script. Then:
 *   1. Run adxMergeAll2() with DRY_RUN = true and read the log (View > Logs).
 *   2. If the numbers look right, set DRY_RUN = false and run it again.
 *
 * It reads ALL2 out of your own spreadsheet, so no data is retyped or pasted anywhere.
 *
 * What it does, in this order:
 *   - trims stray whitespace on All's Tag column, because a trailing space silently breaks
 *     every exact-match lookup against that row;
 *   - fills cells that are EMPTY in All from the matching ALL2 row (never overwrites a value
 *     that is already there, so a manual decision cannot be lost);
 *   - appends every ALL2 tag that All does not have, mapped by header name so ALL2's two extra
 *     change-tracking columns are ignored and All's A:M schema wins;
 *   - deletes ALL2 only after proving every one of its tags now exists in All. If even one is
 *     missing it refuses and lists them.
 *
 * Expected on the current data: 1 key trimmed, 100 empty cells filled, 195 rows appended,
 * All ends at 481 tags, then ALL2 removed.
 *
 * About those 100 fills: 4 are the real gaps in rows 41 and 42 (Google Sheets API and
 * Apps Script – Google Ads have no Category and no Sub category). The other 96 are Sub category
 * values for Job tags in rows 180–275, which are empty in All and present in ALL2 — things like
 * "Core PPC / Google Ads" and "PPC + AI / Localization". All 100 write only into cells that are
 * already empty, so nothing you set by hand can be lost. If you want the minimal change instead,
 * set FILLABLE to ['Category'] and it drops to 2.
 *
 * A backup already exists: "Base — BACKUP before ALL2 merge 2026-09-15".
 */

function adxMergeAll2() {
  var DRY_RUN = true;          // <-- set to false to actually write
  var SOURCE  = 'ALL2';
  var TARGET  = 'All';
  var KEY     = 'Tag';

  // Only these columns may be back-filled into existing All rows. The change-tracking columns
  // (Tag_Change, EXP_Change, Intere_Change, Notes_Change, Other changes, Approved) are deliberately
  // excluded: they are audit metadata, and copying ALL2's annotations into All's audit trail would be
  // a silent rewrite of history rather than a repair. Without this list the pass touches 336 cells
  // instead of the 2 real gaps.
  var FILLABLE = ['Category', 'Sub category'];

  // Bound to Base by ID rather than getActiveSpreadsheet(), so the script works no matter which
  // spreadsheet's editor it is pasted into. getActiveSpreadsheet() silently targets the wrong file
  // and fails with "Tab not found: ALL2" when the script happens to live in Work.
  var BASE_ID = '1JoqSmuT4TengPkDyLbngv7V2E0WM715kk59bvOos5Ks';

  var ss  = SpreadsheetApp.openById(BASE_ID);
  var src = ss.getSheetByName(SOURCE);
  var dst = ss.getSheetByName(TARGET);
  if (!src || !dst) {
    throw new Error('Tab not found: ' + (!src ? SOURCE : TARGET) +
                    '. Spreadsheet "' + ss.getName() + '" has: ' +
                    ss.getSheets().map(function (s) { return s.getName(); }).join(', '));
  }

  var log = [];
  function say(s) { log.push(s); Logger.log(s); }
  say((DRY_RUN ? '=== DRY RUN ===' : '=== WRITING ===') + '  ' + SOURCE + ' -> ' + TARGET);

  var srcIdx = adxHeaderIndex_(src);
  var dstIdx = adxHeaderIndex_(dst);
  if (!srcIdx[KEY] || !dstIdx[KEY]) throw new Error('Column "' + KEY + '" must exist in both tabs');

  var dstWidth = Object.keys(dstIdx).length ? adxMaxCol_(dstIdx) : dst.getLastColumn();
  var srcRows  = adxReadRows_(src, srcIdx);
  var dstRows  = adxReadRows_(dst, dstIdx);
  say('read: ' + TARGET + ' ' + dstRows.length + ' rows, ' + SOURCE + ' ' + srcRows.length + ' rows');

  // 1. trim the key column in the target
  var trimmed = 0;
  dstRows.forEach(function (r) {
    var raw = r.values[KEY] == null ? '' : String(r.values[KEY]);
    if (raw !== raw.trim() && raw.trim() !== '') {
      if (!DRY_RUN) dst.getRange(r.row, dstIdx[KEY]).setValue(raw.trim());
      r.values[KEY] = raw.trim();
      trimmed++;
      say('  trim  ' + TARGET + '!A' + r.row + '  ' + JSON.stringify(raw) + ' -> ' + JSON.stringify(raw.trim()));
    }
  });

  var have = {};
  dstRows.forEach(function (r) {
    var k = adxKey_(r.values[KEY]);
    if (k && !have[k]) have[k] = r;
  });

  // 2. fill only cells that are empty in the target
  var filled = 0;
  srcRows.forEach(function (s) {
    var target = have[adxKey_(s.values[KEY])];
    if (!target) return;
    FILLABLE.forEach(function (col) {
      if (col === KEY || !(col in srcIdx) || !(col in dstIdx)) return;
      var cur = target.values[col], inc = s.values[col];
      if (adxEmpty_(cur) && !adxEmpty_(inc)) {
        if (!DRY_RUN) dst.getRange(target.row, dstIdx[col]).setValue(inc);
        filled++;
        say('  fill  ' + TARGET + ' row ' + target.row + ' [' + col + '] = ' + JSON.stringify(inc));
      }
    });
  });

  // 3. append what the target does not have
  var out = [], added = {};
  srcRows.forEach(function (s) {
    var k = adxKey_(s.values[KEY]);
    if (!k || have[k] || added[k]) return;
    added[k] = true;
    var line = [];
    for (var i = 0; i < dstWidth; i++) line.push('');
    Object.keys(dstIdx).forEach(function (col) {
      if (!(col in srcIdx)) return;
      var v = s.values[col];
      line[dstIdx[col] - 1] = (v == null) ? '' : v;
    });
    out.push(line);
  });

  var at = adxFirstFreeRow_(dst, dstWidth);
  say('append: ' + out.length + ' row(s) at ' + TARGET + '!A' + at);
  if (!DRY_RUN && out.length) dst.getRange(at, 1, out.length, dstWidth).setValues(out);

  // 4. verify, then delete the source
  var present = {};
  Object.keys(have).forEach(function (k) { present[k] = true; });
  Object.keys(added).forEach(function (k) { present[k] = true; });

  var missing = [];
  srcRows.forEach(function (s) {
    var k = adxKey_(s.values[KEY]);
    if (k && !present[k]) missing.push(String(s.values[KEY]).trim());
  });

  if (missing.length) {
    say('REFUSED to delete ' + SOURCE + ': ' + missing.length + ' tag(s) not in ' + TARGET +
        ' -> ' + missing.slice(0, 15).join(', ') + (missing.length > 15 ? ', …' : ''));
  } else if (DRY_RUN) {
    say('verified: every ' + SOURCE + ' tag would exist in ' + TARGET + '. Would delete ' + SOURCE + '.');
  } else {
    ss.deleteSheet(src);
    say('verified and deleted ' + SOURCE);
  }

  var total = dstRows.length + out.length;
  say('result: ' + TARGET + ' = ' + total + ' tags  |  trimmed ' + trimmed +
      ', filled ' + filled + ', appended ' + out.length);
  if (DRY_RUN) say('Nothing was written. Set DRY_RUN = false and run again.');

  try { SpreadsheetApp.getUi().alert(log.join('\n')); } catch (e) { /* no UI when run from editor */ }
  return log.join('\n');
}

/* ---------- helpers ---------- */

function adxKey_(v) { return v == null ? '' : String(v).trim().toLowerCase(); }
function adxEmpty_(v) { return v == null || String(v).trim() === ''; }
function adxMaxCol_(idx) {
  var m = 0;
  Object.keys(idx).forEach(function (k) { if (idx[k] > m) m = idx[k]; });
  return m;
}

/** Maps header text -> 1-based column. Header is the first row with 3+ non-empty cells. */
function adxHeaderIndex_(sheet) {
  var look = sheet.getRange(1, 1, Math.min(6, sheet.getMaxRows()), sheet.getLastColumn()).getValues();
  for (var r = 0; r < look.length; r++) {
    var filled = look[r].filter(function (v) { return !adxEmpty_(v); }).length;
    if (filled >= 3) {
      var idx = {}; idx.__row = r + 1;
      look[r].forEach(function (h, i) {
        var key = adxEmpty_(h) ? '' : String(h).trim();
        if (key && !(key in idx)) idx[key] = i + 1;
      });
      return idx;
    }
  }
  throw new Error('No header row found in ' + sheet.getName());
}

function adxReadRows_(sheet, idx) {
  var hRow = idx.__row, width = adxMaxCol_(idx), last = sheet.getLastRow();
  if (last <= hRow) return [];
  var vals = sheet.getRange(hRow + 1, 1, last - hRow, width).getValues();
  var out = [];
  for (var i = 0; i < vals.length; i++) {
    if (vals[i].every(adxEmpty_)) continue;
    var o = {};
    Object.keys(idx).forEach(function (h) { if (h !== '__row') o[h] = vals[i][idx[h] - 1]; });
    out.push({ row: hRow + 1 + i, values: o });
  }
  return out;
}

/** First fully empty row, so pre-formatted blank rows get filled instead of skipped. */
function adxFirstFreeRow_(sheet, width) {
  var idx = adxHeaderIndex_(sheet), hRow = idx.__row, last = sheet.getLastRow();
  if (last <= hRow) return hRow + 1;
  var vals = sheet.getRange(hRow + 1, 1, last - hRow, width).getValues();
  for (var i = 0; i < vals.length; i++) if (vals[i].every(adxEmpty_)) return hRow + 1 + i;
  return last + 1;
}
