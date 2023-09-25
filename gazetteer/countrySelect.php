<?php

// Get country data from the JSON file
$jsonData = file_get_contents('countryBorders.geo.json');
$countries = json_decode($jsonData, true);
$countryData = [];

$invalidCode = '-99';

foreach ($countries['features'] as $country) {
    $isoCode = $country['properties']['iso_a2'];
    $countryName = $country['properties']['name'];

    if ($isoCode !== $invalidCode) {
    $countryData[] = [
        'iso_a2' => $isoCode,
        'name' => $countryName
    ];
}
};

header('Content-Type: application/json');

sort($countryData);

echo json_encode($countryData);
?>
