<?php
header('Access-Control-Allow-Origin:*');
header('Content-type: application-json');
date_default_timezone_set('Asia/Manila');
require_once('connect.php');		
if(isset($_POST['request_form'])) {
	$curdate_request = $_POST['curdate_request'];
	$dept = $_POST['dept'];
	$purpose = $_POST['request_purpose'];
	$cid = $_POST['company_id'];
	$uid = $_POST['user_id'];

	$sql = "INSERT INTO tbl_purchaserequest(`fldPrNo`, `fldDept`, `fldDate`, `fldPurpose`, `fldRequestByID`, `fldApprovedByID`, `fldPurchaseRemarks`, fldCompanyID) VALUES ('$curdate_request', '$dept', CURRENT_TIMESTAMP, '$purpose', '$uid', '0', 'Pending', '$cid');";
} elseif(isset($_POST['request_units'])) {
}
if(mysqli_query($db, $sql)) {
	echo json_encode(array('response' => 'insert success'));
} else {
	echo json_encode(array('response' => 'insert failed'));
}
?>