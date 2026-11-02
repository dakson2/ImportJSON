<?php

declare(strict_types=1);

/**
 * Generira dnevni report u data/YYYY-MM-DD.json.
 *
 *   CLI (cron):  php run.php [--date=YYYY-MM-DD] [--probe]
 *   Web:         run.php?key=SECRET[&date=YYYY-MM-DD]
 */

$isCli = PHP_SAPI === 'cli';
$cfg   = array_replace_recursive(
    require __DIR__ . '/config.example.php',
    is_file(__DIR__ . '/config.local.php') ? require __DIR__ . '/config.local.php' : []
);

if (!$isCli) {
    header('Content-Type: text/plain; charset=utf-8');
    $key = (string) ($_GET['key'] ?? '');
    if ($cfg['secret'] === 'PROMIJENI_ME' || !hash_equals((string) $cfg['secret'], $key)) {
        http_response_code(403);
        exit("Forbidden\n");
    }
}

$opts  = $isCli ? getopt('', ['date:', 'probe']) : $_GET;
$tz    = new DateTimeZone($cfg['timezone']);
$date  = (string) ($opts['date'] ?? (new DateTimeImmutable('now', $tz))->format('Y-m-d'));
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    exit("Neispravan datum: {$date}\n");
}

require __DIR__ . '/src/Sofascore.php';
$api = new SofascoreClient((int) $cfg['sleep_ms'], getenv('SOFASCORE_FIXTURES') ?: null);

// --probe: provjera koji endpointi rade s ovog servera
if (isset($opts['probe'])) {
    $tp = $cfg['top_predictors'];
    $paths = [
        "/sport/football/scheduled-events/{$date}",
        $tp['list_path'],
        str_replace('{id}', $cfg['my_user_id'], $tp['user_path']),
        "/user-account/{$cfg['my_user_id']}",
        "/user/{$cfg['my_user_id']}/predictions",
        '/user/top-predictors',
    ];
    foreach ($paths as $p) {
        $r = $api->probe($p);
        echo str_pad((string) $r['status'], 5) . $p . '  keys: ' . implode(',', $r['keys']) . "\n";
    }
    exit(0);
}

$dataDir = __DIR__ . '/data';
$lock = fopen("{$dataDir}/run.lock", 'c');
if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) {
    http_response_code(429);
    exit("Već radi.\n");
}

set_time_limit(0);
$started = microtime(true);
echo "[{$date}] Sofascore analiza...\n";

$report = (new PickAnalyzer($api, $cfg))->run($date);

$file = "{$dataDir}/{$date}.json";
file_put_contents("{$file}.tmp", json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
rename("{$file}.tmp", $file);

$line = sprintf(
    "%s  %s  mečeva=%d  signala=%d  top_pred=%d  poziva=%d  grešaka=%d  %.0fs\n",
    (new DateTimeImmutable('now', $tz))->format('Y-m-d H:i'),
    $date,
    $report['analyzed'],
    count($report['signals']),
    $report['top_predictors'],
    $report['api_calls'],
    count($report['errors']),
    microtime(true) - $started
);
file_put_contents("{$dataDir}/run.log", $line, FILE_APPEND);
echo $line;

foreach (array_slice($report['errors'], 0, 10) as $err) {
    echo "  ! {$err}\n";
}

flock($lock, LOCK_UN);
