<?php

declare(strict_types=1);

/**
 * Tanki klijent za neslužbeni Sofascore API.
 * Svaki neuspjeli poziv bilježi se u $errors, a vraća prazan niz.
 */
final class SofascoreClient
{
    private const BASE = 'https://api.sofascore.com/api/v1';

    private const HEADERS = [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept: application/json',
        'Accept-Language: hr,en;q=0.9',
        'Referer: https://www.sofascore.com/',
        'Origin: https://www.sofascore.com',
    ];

    public array $errors = [];
    public int $calls = 0;

    public function __construct(private int $sleepMs = 350, private ?string $fixturesDir = null)
    {
    }

    public function get(string $path): array
    {
        $this->calls++;

        // Testni način: čita JSON iz mape umjesto s mreže.
        if ($this->fixturesDir !== null) {
            $file = $this->fixturesDir . '/' . trim(str_replace('/', '_', $path), '_') . '.json';
            if (!is_file($file)) {
                $this->errors[] = "fixture nema: {$path}";
                return [];
            }
            return json_decode((string) file_get_contents($file), true) ?: [];
        }

        usleep($this->sleepMs * 1000);

        for ($attempt = 1; $attempt <= 3; $attempt++) {
            [$status, $body, $err] = $this->request($path);
            if ($status >= 200 && $status < 300) {
                $data = json_decode($body, true);
                return is_array($data) ? $data : [];
            }
            if ($status === 404) {
                return []; // npr. meč bez kvota — nije greška
            }
            if ($status === 429 || $status >= 500 || $status === 0) {
                sleep(5 * $attempt);
                continue;
            }
            break;
        }

        $this->errors[] = "HTTP {$status} {$path}" . ($err !== '' ? " ({$err})" : '');
        return [];
    }

    /** Za --probe: vraća status i ključeve odgovora bez obrade. */
    public function probe(string $path): array
    {
        [$status, $body] = $this->request($path);
        $data = json_decode($body, true);
        return [
            'status' => $status,
            'keys'   => is_array($data) ? array_slice(array_keys($data), 0, 8) : [],
            'sample' => mb_substr($body, 0, 300),
        ];
    }

    private function request(string $path): array
    {
        $ch = curl_init(self::BASE . $path);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT        => 15,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_HTTPHEADER     => self::HEADERS,
            CURLOPT_ENCODING       => '',
        ]);
        $body   = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err    = curl_error($ch);
        curl_close($ch);

        return [$status, $body === false ? '' : (string) $body, $err];
    }
}

/**
 * Bira dnevne pickove.
 *
 * Za svaki meč i svaki ishod (1, X, 2) računa procjenu vjerojatnosti:
 *   tržište (kvote bez marže) + top prediktori + glasovi publike + mala korekcija za formu.
 * Uz procjenu računa EV = p × kvota − 1, jer igra boduje kvotu, a ne samo pogodak.
 */
final class PickAnalyzer
{
    private array $formCache = [];

    public function __construct(private SofascoreClient $api, private array $cfg)
    {
    }

    public function run(string $date): array
    {
        $tz = new DateTimeZone($this->cfg['timezone']);

        $tpPicks = [];
        $tpUsers = 0;
        if ($this->cfg['top_predictors']['enabled']) {
            [$tpPicks, $tpUsers] = $this->collectTopPredictorPicks();
        }

        $events = $this->selectEvents($date, $tz);

        $signals = [];
        foreach ($events as $event) {
            $signal = $this->analyze($event, $tpPicks, $tz);
            if ($signal !== null) {
                $signals[] = $signal;
            }
        }

        usort($signals, static fn(array $a, array $b) => $b['confidence'] <=> $a['confidence']);

        return [
            'date'           => $date,
            'sport'          => $this->cfg['sport'],
            'analyzed'       => count($events),
            'top_predictors' => $tpUsers,
            'signals'        => array_slice($signals, 0, $this->cfg['max_signals']),
            'generated'      => (new DateTimeImmutable('now', $tz))->format(DATE_ATOM),
            'api_calls'      => $this->api->calls,
            'errors'         => array_slice($this->api->errors, 0, 50),
        ];
    }

    /** Današnji mečevi koji još nisu počeli, najgledanija natjecanja prvo. */
    private function selectEvents(string $date, DateTimeZone $tz): array
    {
        $data = $this->api->get("/sport/{$this->cfg['sport']}/scheduled-events/{$date}");
        $out = [];
        foreach ($data['events'] ?? [] as $e) {
            if (($e['status']['type'] ?? '') !== 'notstarted') {
                continue;
            }
            $ts = (int) ($e['startTimestamp'] ?? 0);
            if ($ts === 0 || (new DateTimeImmutable("@{$ts}"))->setTimezone($tz)->format('Y-m-d') !== $date) {
                continue; // API vraća i mečeve koji su po našem vremenu sutra
            }
            $users = (int) ($e['tournament']['uniqueTournament']['userCount'] ?? 0);
            if ($users < $this->cfg['min_tournament_users']) {
                continue;
            }
            $e['_users'] = $users;
            $out[] = $e;
        }
        usort($out, static fn($a, $b) => $b['_users'] <=> $a['_users']);
        return array_slice($out, 0, $this->cfg['max_events']);
    }

    private function analyze(array $e, array $tpPicks, DateTimeZone $tz): ?array
    {
        $id = (int) $e['id'];

        $odds = $this->fetchOdds($id);
        if ($odds === null) {
            return null;
        }

        // Tržišna vjerojatnost bez marže kladionice.
        $inv    = array_map(static fn(float $o) => 1 / $o, $odds);
        $margin = array_sum($inv);
        $market = array_map(static fn(float $x) => $x / $margin * 100, $inv);

        $crowd = $this->fetchVotes($id);              // ['1'=>%, 'X'=>%, '2'=>%] ili null
        $tp    = $tpPicks[$id] ?? ['1' => 0, 'X' => 0, '2' => 0];
        $tpN   = array_sum($tp);

        $homeId = (int) ($e['homeTeam']['id'] ?? 0);
        $awayId = (int) ($e['awayTeam']['id'] ?? 0);

        $w = $this->cfg['weights'];
        $best = null;
        foreach (['1', 'X', '2'] as $o) {
            if ($odds[$o] < $this->cfg['min_odds'] || $odds[$o] > $this->cfg['max_odds']) {
                continue;
            }
            // Bez dovoljno glasova top prediktora ili publike, taj dio preuzima tržište.
            $tpPct    = $tpN >= $this->cfg['top_predictors']['min_votes'] ? $tp[$o] / $tpN * 100 : $market[$o];
            $crowdPct = $crowd[$o] ?? $market[$o];

            $p = $w['market'] * $market[$o] + $w['top_predictors'] * $tpPct + $w['crowd'] * $crowdPct;
            if ($best === null || $p > $best['p']) {
                $best = ['o' => $o, 'p' => $p, 'tp' => $tpPct];
            }
        }
        if ($best === null) {
            return null;
        }

        // Forma: najviše ±5 bodova, i to samo za pobjedu jedne strane.
        $hf = $this->fetchForm($homeId);
        $af = $this->fetchForm($awayId);
        $formAdj = 0.0;
        if ($best['o'] !== 'X') {
            $diff    = $best['o'] === '1' ? $hf['score'] - $af['score'] : $af['score'] - $hf['score'];
            $formAdj = max(-5.0, min(5.0, $diff / 20));
        }

        $confidence = round($best['p'] + $formAdj, 1);
        if ($confidence < $this->cfg['min_confidence']) {
            return null;
        }

        $o  = $best['o'];
        $ts = (int) $e['startTimestamp'];

        return [
            'event_id'   => $id,
            'url'        => 'https://www.sofascore.com/' . ($e['slug'] ?? 'event') . '/' . ($e['customId'] ?? '') . '#id:' . $id,
            'time'       => (new DateTimeImmutable("@{$ts}"))->setTimezone($tz)->format('H:i'),
            'tournament' => $e['tournament']['name'] ?? '',
            'home'       => $e['homeTeam']['name'] ?? '?',
            'away'       => $e['awayTeam']['name'] ?? '?',
            'outcome'    => $o,
            'odds'       => $odds[$o],
            'all_odds'   => $odds,
            'market_pct' => round($market[$o], 1),
            'crowd_pct'  => $crowd !== null ? round($crowd[$o], 1) : null,
            'tp_pct'     => $tpN > 0 ? round($tp[$o] / $tpN * 100, 1) : null,
            'tp_votes'   => $tpN,
            'home_form'  => $hf,
            'away_form'  => $af,
            'confidence' => $confidence,
            'ev'         => round($confidence / 100 * $odds[$o] - 1, 3),
        ];
    }

    /** Kvote za konačan ishod kao decimalni brojevi, ili null. */
    private function fetchOdds(int $id): ?array
    {
        $data    = $this->api->get("/event/{$id}/odds/1/all");
        $markets = $data['markets'] ?? [];
        if ($markets === [] && isset($data['featured'])) {
            $markets = array_values($data['featured']);
        }
        foreach ($markets as $m) {
            if (!in_array($m['marketName'] ?? '', ['Full time', '1X2'], true)) {
                continue;
            }
            $map = [];
            foreach ($m['choices'] ?? [] as $c) {
                $dec = self::decimalOdds((string) ($c['fractionalValue'] ?? ''));
                if ($dec !== null) {
                    $map[(string) ($c['name'] ?? '')] = $dec;
                }
            }
            if (isset($map['1'], $map['X'], $map['2'])) {
                return ['1' => $map['1'], 'X' => $map['X'], '2' => $map['2']];
            }
        }
        return null;
    }

    public static function decimalOdds(string $frac): ?float
    {
        if (preg_match('~^(\d+(?:\.\d+)?)/(\d+(?:\.\d+)?)$~', trim($frac), $m) && (float) $m[2] > 0) {
            return round((float) $m[1] / (float) $m[2] + 1, 2);
        }
        return is_numeric($frac) && (float) $frac > 1 ? round((float) $frac, 2) : null;
    }

    /** Glasovi publike "Tko će pobijediti?" u postocima. */
    private function fetchVotes(int $id): ?array
    {
        $v = $this->api->get("/event/{$id}/votes")['vote'] ?? [];
        $h = (float) ($v['vote1'] ?? 0);
        $x = (float) ($v['voteX'] ?? 0);
        $a = (float) ($v['vote2'] ?? 0);
        $t = $h + $x + $a;
        if ($t < $this->cfg['min_crowd_votes']) {
            return null;
        }
        return ['1' => $h / $t * 100, 'X' => $x / $t * 100, '2' => $a / $t * 100];
    }

    /** Zadnjih 5 odigranih utakmica ekipe; score 0–100 (100 = 5 pobjeda). */
    private function fetchForm(int $teamId): array
    {
        if (isset($this->formCache[$teamId])) {
            return $this->formCache[$teamId];
        }
        $w = $d = $l = 0;
        $str = '';
        if ($teamId > 0) {
            $events = array_filter(
                $this->api->get("/team/{$teamId}/events/last/0")['events'] ?? [],
                static fn($e) => ($e['status']['type'] ?? '') === 'finished' && isset($e['winnerCode'])
            );
            usort($events, static fn($a, $b) => ($b['startTimestamp'] ?? 0) <=> ($a['startTimestamp'] ?? 0));
            foreach (array_slice($events, 0, 5) as $e) {
                $isHome = (int) ($e['homeTeam']['id'] ?? 0) === $teamId;
                $code   = (int) $e['winnerCode']; // 1 domaćin, 2 gost, 3 remi
                if ($code === 3) {
                    $d++; $str .= 'N';
                } elseif (($code === 1) === $isHome) {
                    $w++; $str .= 'P';
                } else {
                    $l++; $str .= 'G';
                }
            }
        }
        $n = $w + $d + $l;
        return $this->formCache[$teamId] = [
            'wins' => $w, 'draws' => $d, 'losses' => $l,
            'last' => $str, // najnovija prva
            'score' => $n > 0 ? (int) round(($w * 3 + $d) / ($n * 3) * 100) : 50,
        ];
    }

    /**
     * Pickovi top prediktora po meču: [eventId => ['1'=>n,'X'=>n,'2'=>n]].
     * Putanje su u configu jer Sofascore ove endpointe ne dokumentira (provjeri s run.php --probe).
     */
    private function collectTopPredictorPicks(): array
    {
        $tpc  = $this->cfg['top_predictors'];
        $list = $this->api->get($tpc['list_path']);
        $users = $list[$tpc['list_key']] ?? $list['users'] ?? $list['predictors'] ?? [];
        $users = array_slice(is_array($users) ? $users : [], 0, $tpc['count']);

        $picks = [];
        $seen  = 0;
        foreach ($users as $u) {
            $uid = (string) ($u['id'] ?? $u['user']['id'] ?? $u['userAccount']['id'] ?? '');
            if ($uid === '') {
                continue;
            }
            $seen++;
            $data = $this->api->get(str_replace('{id}', rawurlencode($uid), $tpc['user_path']));
            foreach ($data['predictions'] ?? $data['votes'] ?? $data['events'] ?? [] as $p) {
                $eid = (int) ($p['eventId'] ?? $p['event']['id'] ?? 0);
                $o   = self::normalizeOutcome($p['prediction'] ?? $p['vote'] ?? $p['choice'] ?? null);
                if ($eid > 0 && $o !== null) {
                    $picks[$eid] ??= ['1' => 0, 'X' => 0, '2' => 0];
                    $picks[$eid][$o]++;
                }
            }
        }
        return [$picks, $seen];
    }

    public static function normalizeOutcome(mixed $v): ?string
    {
        $v = strtoupper(trim((string) $v));
        return match ($v) {
            '1', 'HOME', 'VOTE1' => '1',
            '2', 'AWAY', 'VOTE2' => '2',
            'X', '3', 'DRAW', 'VOTEX' => 'X',
            default => null,
        };
    }
}
