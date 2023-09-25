<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    include("config.php");

    header('Content-Type: application/json; charset=UTF-8');

    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if (mysqli_connect_errno()) {
        $output['status']['code'] = "300";
        $output['status']['name'] = "failure";
        $output['status']['description'] = "database unavailable";
        $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output);

        exit;
    }

    $locationID = $_POST['locationID']; 

    // Build the SQL query to filter personnel data

    $sql = "SELECT department.id, department.name AS departmentName, location.name AS locationName
            FROM department
            JOIN location ON department.locationID = location.id
            WHERE location.id = ?";


    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $locationID);
    $stmt->execute();

    $result = $stmt->get_result();

    // Fetch the filtered data as an associative array
    $filteredData = [];

    while ($row = $result->fetch_assoc()) {
        $filteredData[] = $row;
    }

    $stmt->close();

    $conn->close();

    echo json_encode($filteredData);
?>