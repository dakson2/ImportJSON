<?php

declare(strict_types=1);

$config = require __DIR__ . '/config.php';
$localConfigPath = __DIR__ . '/config.local.php';
$local = is_file($localConfigPath) ? require $localConfigPath : [];

require __DIR__ . '/src/CacheStore.php';
require __DIR__ . '/src/ErrorLogger.php';

$cache = new CacheStore();
$logger = new ErrorLogger();

$key = $_GET['key'] ?? ($_SERVER['argv'][2] ?? '');
$group = $_GET['group'] ?? ($_SERVER['argv'][1] ?? 'light');

$secret = getenv($config['app']['refresh_secret_env']) ?: ($local['secrets']['REFRESH_SECRET'] ?? '');
if ($secret === '' || !hash_equals($secret, (string) $key)) {
    http_response_code(403);
    echo "Forbidden\n";
    exit(1);
}

$lockFile = $config['app']['lock_file'];
if (!$cache->acquireLock($lockFile)) {
    http_response_code(429);
    echo "Refresh already running\n";
    exit(1);
}

try {
    $latest = $cache->readJson($config['app']['cache_file']);
    $latest['last_refresh'] = date(DATE_ATOM);
    $latest['subtitle'] = 'Refreshed: ' . date('l, d F Y - H:i');
    $latest['last_group'] = $group;

    $cache->atomicWriteJson($config['app']['cache_file'], $latest);
    echo "OK: group={$group}\n";
} catch (Throwable $e) {
    $logger->append($config['app']['errors_file'], 'refresh', $e->getMessage());
    http_response_code(500);
    echo "Error\n";
} finally {
    $cache->releaseLock($lockFile);
}
