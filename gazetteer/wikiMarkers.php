<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $lat = $_GET['lat'];
    $lng = $_GET['lng'];

    $url = "http://api.geonames.org/findNearbyWikipediaJSON?lat=" . $lat . "&lng=" . $lng . "&maxRows=30&radius=20&username=chrisyhaigh";

	// Initialize a cURL session
	$ch = curl_init();

	// Set cURL options
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response instead of outputting it
	curl_setopt($ch, CURLOPT_URL, $url); // Set the URL for the cURL session

	// Execute the cURL session and retrieve the response
	$response = curl_exec($ch);

	// Close the cURL session
	curl_close($ch);

	$wikiData = json_decode($response, true);

    // Output array
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $wikiData;

    // Set the response header
    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);

?>