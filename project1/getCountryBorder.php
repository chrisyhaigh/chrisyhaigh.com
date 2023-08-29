<?php

function getCountryBorder($countryCode) {
    
    $jsonData = file_get_contents('countryBorders.geo.json');
    $countries = json_decode($jsonData, true);
    $matchingCountries = [];

    //Iterate through to get Country geometry & coordinates to determine border//
    foreach ($countries['features'] as $country) {
        $isoCode = $country['properties']['iso_a2'];

        if ($isoCode === $countryCode) {
            $matchingCountries[] = $country;
        } 
    }

    return $matchingCountries;
};

$countryCode = $_GET['country'];
$border = getCountryBorder($countryCode);

header('Content-Type: application/json');
echo json_encode($border);