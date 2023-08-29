<?php
    // Set up PHP runtime settings to display errors
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $country = $_GET['country'];

    // Set up the API URL with the country name as a parameter
    $wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&redirects=1&titles=' . urlencode($country);

    // Make the API request
    $response = file_get_contents($wikiUrl);

    // Decode the JSON response from Wikipedia
    $data = json_decode($response, true);

    // Extract the page ID and summary from the response
    $pages = $data['query']['pages'];
    $pageId = key($pages);
    $summary = $pages[$pageId]['extract'];
    $fullArticleUrl = "https://en.wikipedia.org/wiki/" . urlencode($country);

    $maxLength = 750;
    if (strlen($summary) > $maxLength){
        $summary = substr($summary, 0, $maxLength);

        $summary .= '...';
    }

    // Prepare the output array
    $output['status']['code'] = 250;
    $output['status']['name'] = 'ok';
    $output['status']['description'] = 'success';
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . ' ms';
    $output['summary'] = $summary;
    $output['fullArticleUrl'] = $fullArticleUrl;

    // Set the response headers
    header('Content-Type: application/json; charset=UTF-8');

    // Send the JSON-encoded output
    echo json_encode($output);
?>

