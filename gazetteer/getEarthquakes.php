<?php

	// Set up PHP runtime settings to display errors
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$north = $_GET['north'];
	$south = $_GET['south'];
	$east = $_GET['east'];
	$west = $_GET['west'];

	$executionStartTime = microtime(true);

	$url = 'http://api.geonames.org/earthquakesJSON?north=' . $north . '&south=' . $south . '&east=' . $east . '&west=' . $west . '&maxRows=30&username=chrisyhaigh';

	$ch = curl_init();

	// Set cURL options
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response instead of outputting it
	curl_setopt($ch, CURLOPT_URL, $url); // Set the URL for the cURL session

	$response = curl_exec($ch);


	curl_close($ch);

	$decode = json_decode($response, true);

	// Output array
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['earthquakes']; 

	// Response headers
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output);

?>