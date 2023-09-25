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

    // Get the personnel ID from the POST request

    $id = $_POST['id'];

    $query = "SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
              FROM personnel p 
              LEFT JOIN department d ON (d.id = p.departmentID) 
              LEFT JOIN location l ON (l.id = d.locationID) 
              WHERE p.id = ?";


    $stmt = $conn->prepare($query);

    $stmt->bind_param("i", $id);

    $stmt->execute();

    $result = $stmt->get_result();

    $data = $result->fetch_assoc();

    $stmt->close();

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

    $output['data'] = $data;

    echo json_encode($output);
?>
