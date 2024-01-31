<?php 

    ini_set('display_errors', 'on');
    error_reporting(E_ALL);

    $executionTime = microtime(true);
    $country = $_GET['country'];

    $url = 'https://restcountries.com/v3.1/name/' . $country;

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $response = curl_exec($ch);

    curl_close($ch);

    $decode = json_decode($response, true);

    $output['status']['code'] = '200';
    $output['status']['name'] = 'ok';
    $output['status']['description'] = 'success';
    $output['status']['returnTime'] = intval((microtime(true)) - $executionTime);
    $output['data'] = $decode;

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);