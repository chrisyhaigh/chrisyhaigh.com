<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recipientEmail = $_POST['email'] ?? '';
    
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPAuth = true;
        $mail->Username = 'chrisyhaigh@gmail.com';
        $mail->Password = 'Treble99!';
        $mail->SMTPSecure = 'tls';

        // Set email details
        $mail->setFrom('chrisyhaigh@gmail.com', 'Chrisy Haigh');
        $mail->addAddress($recipientEmail); // Use the entered email as the recipient email
        $mail->Subject = 'Subject of the Email';
        $mail->Body = 'This is the message body of the email.';

        if ($mail->send()) {
            echo 'Thank you for contacting us. Your message has been sent.';
        } else {
            echo 'Sorry, there was an error sending your message. Please try again later.';
        }
    } catch (Exception $e) {
        echo 'Sorry, there was an error sending your message. Please try again later.';
    }
} else {
    echo 'Invalid request.';
}
?>
