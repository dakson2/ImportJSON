<?php

declare(strict_types=1);

$config = require __DIR__ . '/config.php';
require __DIR__ . '/src/Helpers.php';
require __DIR__ . '/src/CacheStore.php';

$cache = new CacheStore();
$data = $cache->readJson($config['app']['cache_file']);

$title = $data['title'] ?? $config['app']['title'];
$subtitle = $data['subtitle'] ?? nowInTimezone($config['app']['timezone'])->format('l, d F Y - H:i');
?>
<!doctype html>
<html lang="hr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= h($title) ?></title>
    <link rel="stylesheet" href="assets/style.css">
    <link rel="stylesheet" href="assets/ticker.css">
    <link rel="stylesheet" href="assets/print.css" media="print">
</head>
<body>
<header class="masthead">
    <h1><?= h($title) ?></h1>
    <p class="subtitle"><?= h($subtitle) ?></p>
</header>

<main class="layout-grid">
    <section class="card">Weather placeholder</section>
    <section class="card">Markets placeholder</section>
    <section class="card">Horoscope placeholder</section>
    <section class="card full">RSS categories placeholder</section>
</main>

<footer class="actions">
    <a href="#">Send to Mail</a>
    <a href="#">Add to Google Calendar</a>
    <a href="download-ics.php">Download ICS</a>
    <a href="download-pdf.php">Download PDF</a>
</footer>

<div class="football-ticker" aria-live="polite">⚽ Football ticker placeholder</div>
</body>
</html>
