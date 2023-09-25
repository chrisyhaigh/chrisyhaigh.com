<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

//Function to fetch country information based on latitude and longitude

function getCountryInfo($lat, $lng, $apiKey) {
    $url = "https://api.opencagedata.com/geocode/v1/json?q={$lat}+{$lng}&key={$apiKey}";
    $response = file_get_contents($url);
    $data = json_decode($response, true);

    if ($data['status']['code'] === 200) {
        // Extract country information from the response
        $countryInfo = $data['results'][0]['components'];
        $isoCode2 = isset($countryInfo['ISO_3166-1_alpha-2']) ? $countryInfo['ISO_3166-1_alpha-2'] : null;
        $isoCode3 = isset($countryInfo['ISO_3166-1_alpha-3']) ? $countryInfo['ISO_3166-1_alpha-3'] : null;
        $countryName = isset($countryInfo['country']) ? $countryInfo['country'] : null;

        return [
            'iso_a2' => $isoCode2,
            'iso_a3' => $isoCode3,
            'name' => $countryName,
        ];
    } else {
        return null;
    }
}

// GET latitude and longitude from the request and API key for OpenCage API
$apiKey = '4d31eaa6bb834004b9232dacbff82948';
$lat = $_GET['lat'];
$lng = $_GET['lng'];

$countryInfo = getCountryInfo($lat, $lng, $apiKey);

header('Content-Type: application/json');
echo json_encode($countryInfo);
?>
