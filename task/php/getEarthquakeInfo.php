<?php

	// Set up PHP runtime settings to display errors
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);


	$executionStartTime = microtime(true);

	// Construct the URL for the API request
	$url='http://api.geonames.org/earthquakesJSON?north=' . $_REQUEST['north'] . '&south=' . $_REQUEST['south'] . '&east=' . $_REQUEST['east'] . '&west=' . $_REQUEST['west'] . '&username=chrisyhai&style=full';

	// Initialize a cURL session
	$ch = curl_init();

	// Set cURL options
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response instead of outputting it
	curl_setopt($ch, CURLOPT_URL, $url); // Set the URL for the cURL session

	// Execute the cURL session and retrieve the response
	$result = curl_exec($ch);

	// Close the cURL session
	curl_close($ch);

	// Decode the JSON response into an associative array
	$decode = json_decode($result, true);

	//Output array
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['geonames'];

	//Response headers
	header('Content-Type: application/json; charset=UTF-8');

	// Encode the output array as JSON and echo it
	echo json_encode($output); 

?>
