<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;    
    $mail->isSMTP();                                
    $mail->Host       = 'smtp.gmail.com';  
    $mail->SMTPAuth   = true;
    $mail->Username   = 'chrisyhaigh@gmail.com';               
    $mail->Password   = 'smswnbekrbvjuzwc';             
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

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>