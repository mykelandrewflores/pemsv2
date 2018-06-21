<?php
header('Access-Control-Allow-Origin: *');

$db = mysqli_connect("localhost", "root", "", "db_arnie");
$tno = $_GET['tno'];
$uid = $_GET['uid'];

$sql = "INSERT INTO tbl_lccafiles (fldTransactionNo, fldUserID) VALUES ('$tno', '$uid')";
$db->query($sql);

$sql = "SELECT fldTransactionNo FROM tbl_lccafiles ORDER BY fldFileNumber DESC LIMIT 1";
$result = $db->query($sql);
$rows = $result->fetch_assoc();

$fileName = $rows['fldTransactionNo'];

$target_dir = "";	
$_FILES["file"]["name"] = $fileName;
$target_file = basename($_FILES["file"]["name"]) . ".pdf";

move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

?>