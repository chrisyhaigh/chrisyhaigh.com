<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../PHPMailer-6.8.1/src/Exception.php';
require '../PHPMailer-6.8.1/src/SMTP.php';
require '../PHPMailer-6.8.1/src/PHPMailer.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

try {

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->SMTPDebug = 3;
    $mail->isSMTP();                                
    $mail->Host       = 'smtp.gmail.com';  
    $mail->SMTPAuth   = true;
    $mail->Username   = 'chrisyhaigh@gmail.com';               
    $mail->Password   = 'iljwolshnugxtpis';             
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   
    $mail->Port       = 587;                   

    //Recipients
    $mail->setFrom('chrisyhaigh@gmail.com', 'Chrisy');
    $mail->addAddress('chrisyhaigh@gmail.com', 'Chrisy'); 

    //Content
    $mail->isHTML(true);                          
    $mail->Subject = 'Contact Form Submission';
    $mail->Body    = "<table>
                        <tr><td>Name: $name</td></tr>
                        <tr><td>Email: $email</td></tr>
                        <tr><td>Message: $message</td></tr>
                      </table>";

    $mail->send();

    $response = array(
        'status' => 'success',
        'message' => 'Message has been sent'
    );
    
    header('Content-Type: application/json');
    echo json_encode($response);

} catch (Exception $e) {

    $response = array(
        'status' => 'error',
        'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
    );
    
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>