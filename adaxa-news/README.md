# Adaxa News

PHP 8.x one-page "newspaper" app for shared hosting.

## Current status

This is Task 1 skeleton:
- JSON cache only (no database)
- `index.php` reads from `data/latest.json`
- `refresh.php` contains base key/lock/cache flow
- responsive placeholder UI and print/ticker CSS

## Setup

1. Copy `config.local.example.php` to `config.local.php`.
2. Set secrets in `config.local.php` or environment variables.
3. Ensure `data/` and `cache/` are writable.

## First run

Open:
`/refresh.php?key=YOUR_SECRET&group=all`

Then open:
`/index.php`

## Cron example

`/usr/local/bin/php /home/USERNAME/public_html/adaxa-news/refresh.php group=light key=SECRET >/dev/null 2>&1`
