<?php

declare(strict_types=1);

$dataDir = __DIR__ . '/data';
$tz      = new DateTimeZone('Europe/Zagreb');
$today   = (new DateTimeImmutable('now', $tz))->format('Y-m-d');

$dates = array_map(static fn($f) => basename($f, '.json'), glob("{$dataDir}/2*.json") ?: []);
rsort($dates);
$dates = array_slice($dates, 0, 30);

$req    = (string) ($_GET['date'] ?? ($dates[0] ?? $today));
$req    = preg_match('/^\d{4}-\d{2}-\d{2}$/', $req) ? $req : $today;
$file   = "{$dataDir}/{$req}.json";
$report = is_file($file) ? json_decode((string) file_get_contents($file), true) : null;
$picks  = $report['signals'] ?? [];

function h(mixed $s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

function pickLabel(array $p): string
{
    return match ($p['outcome']) {
        '1' => '1 · ' . $p['home'],
        '2' => '2 · ' . $p['away'],
        default => 'X · remi',
    };
}

function pct(?float $v): string
{
    return $v === null ? '—' : $v . '%';
}

function confClass(float $c): string
{
    return $c >= 70 ? 'hi' : ($c >= 60 ? 'mid' : 'lo');
}
?>
<!doctype html>
<html lang="hr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AdaxaBet · Sofascore pickovi</title>
<style>
  :root{--bg:#0f1117;--card:#181b24;--line:#262a36;--txt:#e4e6eb;--muted:#8a90a0;--acc:#e63946;--hi:#3fb950;--mid:#d29922;--lo:#8a90a0;--odds:#f2cc60}
  *{box-sizing:border-box;margin:0}
  body{font:14px/1.45 system-ui,sans-serif;background:var(--bg);color:var(--txt)}
  header{padding:16px;border-bottom:2px solid var(--acc);background:var(--card)}
  header h1{font-size:1.25rem}
  header p{color:var(--muted);font-size:.8rem;margin-top:2px}
  .wrap{max-width:1180px;margin:0 auto;padding:16px}
  .dates{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
  .dates a{padding:4px 9px;border:1px solid var(--line);border-radius:4px;color:var(--muted);text-decoration:none;font-size:.78rem}
  .dates a.on,.dates a:hover{background:var(--acc);border-color:var(--acc);color:#fff}
  .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:14px}
  .stat{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:12px;text-align:center}
  .stat b{display:block;font-size:1.5rem;color:var(--acc)}
  .stat span{font-size:.72rem;color:var(--muted)}
  .meta{color:var(--muted);font-size:.78rem;margin-bottom:10px}
  .tbl{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:8px}
  table{width:100%;border-collapse:collapse;min-width:860px}
  th{font-size:.7rem;text-transform:uppercase;letter-spacing:.4px;color:var(--muted);text-align:left;padding:9px 10px;border-bottom:1px solid var(--line)}
  td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
  tr:last-child td{border-bottom:0}
  td small{display:block;color:var(--muted);font-size:.72rem}
  .pick{font-weight:700}
  .odds{color:var(--odds);font-variant-numeric:tabular-nums;font-weight:700}
  .hi{color:var(--hi);font-weight:700}.mid{color:var(--mid);font-weight:700}.lo{color:var(--lo)}
  .neg{color:var(--muted)}
  a.ev{color:inherit}
  .empty{padding:50px 16px;text-align:center;color:var(--muted)}
  .note{margin-top:14px;font-size:.75rem;color:var(--muted)}
</style>
</head>
<body>
<header>
  <h1>⚽ AdaxaBet · Sofascore pickovi</h1>
  <p>Procjena = kvote bez marže + top prediktori + glasovi publike, uz korekciju za formu</p>
</header>

<div class="wrap">
  <nav class="dates">
    <?php foreach ($dates as $d): ?>
      <a href="?date=<?= h($d) ?>" class="<?= $d === $req ? 'on' : '' ?>"><?= h($d) ?></a>
    <?php endforeach ?>
  </nav>

  <?php if ($report === null): ?>
    <div class="empty">Nema reporta za <?= h($req) ?>. Pokreni <code>php run.php</code> na serveru.</div>
  <?php else: ?>
    <?php
      $n       = count($picks);
      $avgOdds = $n ? round(array_sum(array_column($picks, 'odds')) / $n, 2) : 0;
      $avgConf = $n ? round(array_sum(array_column($picks, 'confidence')) / $n, 1) : 0;
      $plusEv  = count(array_filter($picks, static fn($p) => $p['ev'] > 0));
    ?>
    <div class="stats">
      <div class="stat"><b><?= $n ?></b><span>pickova</span></div>
      <div class="stat"><b><?= (int) $report['analyzed'] ?></b><span>analizirano mečeva</span></div>
      <div class="stat"><b><?= $avgOdds ?></b><span>prosječna kvota</span></div>
      <div class="stat"><b><?= $avgConf ?>%</b><span>prosječna procjena</span></div>
      <div class="stat"><b><?= $plusEv ?></b><span>s pozitivnim EV</span></div>
    </div>
    <p class="meta">
      Generirano <?= h(date('d.m.Y H:i', strtotime((string) $report['generated']))) ?>
      · top prediktora pročitano: <?= (int) $report['top_predictors'] ?>
      · API poziva: <?= (int) $report['api_calls'] ?>
      <?php if (!empty($report['errors'])): ?> · grešaka: <?= count($report['errors']) ?><?php endif ?>
    </p>

    <?php if ($n === 0): ?>
      <div class="empty">Nijedan meč ne prolazi kriterije za ovaj dan.</div>
    <?php else: ?>
    <div class="tbl"><table>
      <thead><tr>
        <th>#</th><th>Sat</th><th>Meč</th><th>Pick</th><th>Kvota</th>
        <th>Tržište</th><th>Top pred.</th><th>Publika</th><th>Forma (zadnjih 5)</th><th>Procjena</th><th>EV</th>
      </tr></thead>
      <tbody>
      <?php foreach ($picks as $i => $p): $o = $p['all_odds']; ?>
        <tr>
          <td><?= $i + 1 ?></td>
          <td><?= h($p['time']) ?></td>
          <td><a class="ev" href="<?= h($p['url']) ?>" target="_blank" rel="noopener"><?= h($p['home']) ?> – <?= h($p['away']) ?></a>
              <small><?= h($p['tournament']) ?></small></td>
          <td class="pick"><?= h(pickLabel($p)) ?></td>
          <td class="odds"><?= h($p['odds']) ?><small>1 <?= h($o['1']) ?> · X <?= h($o['X']) ?> · 2 <?= h($o['2']) ?></small></td>
          <td><?= pct($p['market_pct']) ?></td>
          <td><?= pct($p['tp_pct']) ?><small><?= (int) $p['tp_votes'] ?> glasova</small></td>
          <td><?= pct($p['crowd_pct']) ?></td>
          <td><?= h($p['home_form']['last'] ?: '—') ?> / <?= h($p['away_form']['last'] ?: '—') ?>
              <small>najnovija prva</small></td>
          <td class="<?= confClass((float) $p['confidence']) ?>"><?= h($p['confidence']) ?>%</td>
          <td class="<?= $p['ev'] > 0 ? 'hi' : 'neg' ?>"><?= ($p['ev'] > 0 ? '+' : '') . h(round($p['ev'] * 100, 1)) ?>%</td>
        </tr>
      <?php endforeach ?>
      </tbody>
    </table></div>
    <?php endif ?>
  <?php endif ?>

  <p class="note">
    Uz prosječnu kvotu 1.80 treba pogoditi više od 55,6 % da povrat bude pozitivan.
    Zato je uz procjenu prikazan i EV (procjena × kvota − 1): pick s pozitivnim EV-om dugoročno popravlja povrat.
  </p>
</div>
</body>
</html>
