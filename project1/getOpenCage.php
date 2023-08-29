<?php

    $apiKey = '4d31eaa6bb834004b9232dacbff82948';
    $country = $_GET['country'];
    $geocodingUrl = "https://api.opencagedata.com/geocode/v1/json?q=" . urlencode($country) . "&key=" . $apiKey;

    $response = file_get_contents($geocodingUrl);
    $data = json_decode($response, true);

    header('Content-Type: application/json');
    echo json_encode($data);

?>
