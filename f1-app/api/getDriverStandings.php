<?php 

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionTime = microtime(true);

    $season = $_GET['season'];

    $url = 'http://ergast.com/api/f1/' . $season . '/driverStandings.json?';

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $response = curl_exec($ch);

    if ($response === null) {
        $output = [
            'status' => [
                'code' => '500',
                'name' => 'error',
                'description' => 'CURL_ERROR: ' . curl_error($ch),
                'returnTime' => intval((microtime(true) - $executionTime)) 
            ]
            ];           
    } else {
        $decode = json_decode($response, true);

        if ($decode === null) {
            $output = [
                'status' => [
                    'code' => '500',
                    'name' => 'error',
                    'description' => 'CURL_ERROR: ' . curl_error($ch),
                    'returnTime' => intval((microtime(true) - $executionTime))
                ]
                ];
        } else {
            $output = [
                'status' => [
                    'code' => '200',
                    'name' => 'success',
                    'description' => 'ok',
                    'returnTime' => intval((microtime(true) - $executionTime))
                ],
                'data' => $decode
            ];
        }
    }

    curl_close($ch);

    header('Content-Type: application/json; charset=UTF-8');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    echo json_encode($output);
?>