<?php

declare(strict_types=1);

return [
    'app' => [
        'title' => 'Adaxa News',
        'timezone' => 'Europe/Zagreb',
        'base_url' => 'https://example.com/adaxa-news',
        'refresh_secret_env' => 'REFRESH_SECRET',
        'cache_file' => __DIR__ . '/data/latest.json',
        'errors_file' => __DIR__ . '/data/errors.json',
        'lock_file' => __DIR__ . '/cache/refresh.lock',
    ],
    'modules' => [
        'weather' => true,
        'markets' => true,
        'horoscope' => true,
        'wiki' => true,
        'football' => true,
        'hns_semafor' => true,
        'psobz_stats' => true,
        'njuskalo' => true,
        'hungarian' => true,
        'rss' => true,
    ],
    'preferred_bookmaker' => 'bet365',
    'rss_categories' => [],
];
