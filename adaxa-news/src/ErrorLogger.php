<?php

declare(strict_types=1);

final class ErrorLogger
{
    public function append(string $errorsFile, string $module, string $message): void
    {
        $entries = [];

        if (is_file($errorsFile)) {
            $raw = file_get_contents($errorsFile);
            $decoded = json_decode((string) $raw, true);
            if (is_array($decoded)) {
                $entries = $decoded;
            }
        }

        $entries[] = [
            'module' => $module,
            'message' => $message,
            'time' => gmdate(DATE_ATOM),
        ];

        file_put_contents($errorsFile, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
}
