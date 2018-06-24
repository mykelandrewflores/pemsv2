<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';


$vcode = $_POST['vcode'];
$eadd = $_POST['eadd'];
$val = '
<h4>Welcome to PEMS!</h4>    
    
<p>Dear Sir/Mam,</p>
    
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Welcome to PEMS. You can now reset your password by click the link Below: </p>;


<a href="http://localhost/pems/resetpassword.html?vcode='.$vcode.'">Click the link Here</a>

';


$mail = new PHPMailer(); // create a new object
$mail->IsSMTP(); // enable SMTP
$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "macionmart@gmail.com";
$mail->Password = "kiljkki123";
$mail->SetFrom("martToPare@gmail.com");
$mail->Subject = "Password Reset - Pems";
$mail->Body = $val;
$mail->AddAddress($eadd);

 if(!$mail->Send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
 } else {
    echo "Message has been sent";
 }


?>