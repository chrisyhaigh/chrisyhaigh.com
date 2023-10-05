<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer-master/src/Exception.php';
    require 'PHPMailer-master/src/PHPMailer.php';
    require 'PHPMailer-master/src/SMTP.php';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'chrisyhaigh@gmail.com';
        $mail->Password   = 'Treble99!';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('chrisyhaigh@gmail.com', 'Chrisy Haigh');
        $mail->addAddress('chrisyhaigh@gmail.com', 'Chrisy Haigh');

        $mail->isHTML(true);
        $mail->Subject = 'Subject';
        $mail->Body    = 'This is the HTML message body';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }


?>