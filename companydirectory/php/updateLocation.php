<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    // Include the login details
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

    $id = $_POST['id'];
    $updatedData = $_POST['updatedData'];
    $name = $updatedData['name']; 

    // Prepared Statement
    $query = $conn->prepare("UPDATE location SET name = ? WHERE id = ?");

    if (!$query) {
        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "query preparation failed";
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output);
        exit;
    }

    // Bind parameters
    $query->bind_param("si", $name, $id,);

    // Execute the statement
    $query->execute();

    if ($query->error) {
        // Handle query execution error
        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "query execution failed: " . $query->error;
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output);
        exit;
    }

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);
?>
