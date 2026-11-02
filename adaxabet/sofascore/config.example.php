<?php

// Kopiraj u config.local.php (ne ide u git) i promijeni 'secret'.
// Repo je javan: lozinke i FTP podaci nikad ne idu u ovu datoteku.

return [
    'secret'   => 'PROMIJENI_ME',        // za pokretanje kroz web: run.php?key=...
    'timezone' => 'Europe/Zagreb',
    'sport'    => 'football',

    // Koji mečevi ulaze u analizu
    'max_events'           => 80,        // najviše mečeva po danu (najgledanija natjecanja prvo)
    'min_tournament_users' => 20000,     // preskače male lige bez pouzdanih kvota i glasova

    // Koji pickovi se prikazuju
    'min_odds'        => 1.40,
    'max_odds'        => 3.20,
    'min_confidence'  => 55,             // procjena vjerojatnosti u %, nakon korekcije za formu
    'max_signals'     => 12,
    'min_crowd_votes' => 50,             // ispod toga glasovi publike se ne računaju

    // Udjeli u procjeni (zbroj 1.0)
    'weights' => [
        'market'         => 0.55,
        'top_predictors' => 0.30,
        'crowd'          => 0.15,
    ],

    // Sofascore ne dokumentira ove endpointe. Provjeri ih s: php run.php --probe
    'top_predictors' => [
        'enabled'   => true,
        'count'     => 20,
        'min_votes' => 3,                // manje glasova od toga = ne računa se
        'list_path' => '/user-account/top-predictors',
        'list_key'  => 'topPredictors',
        'user_path' => '/user-account/{id}/predictions',
    ],

    'my_user_id' => '5e56a2b762bf87f839b0b998',
    'sleep_ms'   => 350,                 // pauza između poziva
];
