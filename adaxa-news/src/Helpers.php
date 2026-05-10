<?php

declare(strict_types=1);

function h(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function nowInTimezone(string $timezone): DateTimeImmutable
{
    return new DateTimeImmutable('now', new DateTimeZone($timezone));
}
