<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';


$eadd = $_POST['eadd'];
$val = '
<h4>Welcome to PEMS!</h4>    
    
<p>Dear Sir/Mam,</p>
    
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Resend Verification Code. You can now verify your account by clicking the link below and enter the verifcation code: </p>
<p>Verification Code:</p>
<h1>';

$val .= $_POST['vcode'];

$val .= '</h1>
<a href="http://gordoncollegeccs-ssite.net/pems/verify.html">Enter Verification Code Here</a>

<p>Sincerely,</p>
<br><br>
<p>Pems Dev Team</p>';

$mail = new PHPMailer(); // create a new object
$mail->IsSMTP(); // enable SMTP
$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "mx1.hostinger.com";
$mail->Port = 587; // or 587
$mail->IsHTML(true);
$mail->Username = "pemsadmin@pems.gordoncollegeccs-ssite.net";
$mail->Password = "123456ab";
$mail->SetFrom("pemsadmin@pems.gordoncollegeccs-ssite.net");
$mail->Subject = "Resend Verification Code!";
$mail->Body = $val;
$mail->AddAddress($eadd);

 if(!$mail->Send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
 } else {
    echo "Message has been sent";
 }


?>