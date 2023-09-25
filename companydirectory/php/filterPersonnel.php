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
    $departmentID = $_POST['departmentID']; 

    $sql = "SELECT personnel.id, personnel.firstName, personnel.lastName, personnel.jobTitle, personnel.email, 
                department.name AS department, location.name AS location
                FROM personnel
                JOIN department ON personnel.departmentID = department.id
                JOIN location ON department.locationID = location.id
                WHERE location.id = ? OR department.id = ?";


    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $locationID, $departmentID);
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