<?php
header('Access-Allow-Control-Origin:*');
header('Content-Type:application/json');
include_once('connect.php');
if(isset($_POST['insert_inspection'])) {
	$PO_no = $_POST['PO_no'];
	$invoice_no = $_POST['invoice'];
	$office = $_POST['office'];
	$company_id = $_POST['company_id'];
	$sql = "INSERT INTO tbl_inspection (fldAgency, fldInvoiceNo, fldPoNo, fldReqDep, fldCompID) VALUES ('Sample Agency', '$invoice_no', '$PO_no', '$office', '$company_id');";
} else {

}
if(mysqli_query($db, $sql)) {
	echo json_encode(array('response' => 'successfully inserted'),JSON_PRETTY_PRINT);
} else {
	echo json_encode(array('response' => 'failed inserted'),JSON_PRETTY_PRINT);
}
?>