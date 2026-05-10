<?php

declare(strict_types=1);

final class CacheStore
{
    public function readJson(string $path): array
    {
        if (!is_file($path)) {
            return [];
        }

        $raw = file_get_contents($path);
        if ($raw === false) {
            return [];
        }

        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    public function atomicWriteJson(string $path, array $payload): void
    {
        $tmp = $path . '.tmp';
        file_put_contents($tmp, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        rename($tmp, $path);
    }

    public function acquireLock(string $lockFile): bool
    {
        if (is_file($lockFile)) {
            return false;
        }

        return (bool) file_put_contents($lockFile, (string) time());
    }

    public function releaseLock(string $lockFile): void
    {
        if (is_file($lockFile)) {
            unlink($lockFile);
        }
    }
}
