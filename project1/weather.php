<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    //API Key from OpenweatherAPI
    $apiKey = 'd283ff6836cc39c11580ecb50ec6dba3';

    //Get request to get lat/long
	$lat = $_GET['lat'];
	$lon = $_GET['lng'];

	//API request
    $url = 'http://api.openweathermap.org/data/3.0/onecall?lat=' . $lat . '&lon=' . $lon . '&exclude=minutely,alerts&units=metric&appid=' . $apiKey;

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

	// Decode the JSON response into an associative array
	$weatherData = json_decode($response, true);

	//Output array
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $weatherData;

	//Response headers
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output);
?>



