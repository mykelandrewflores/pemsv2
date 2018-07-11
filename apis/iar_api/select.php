<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
include_once('connect.php');
$data = array();

if(isset($_GET['tbl_purchaserequest']) AND isset($_GET['company_id'])) {
	$cid = $_GET['company_id'];
	$sql = mysqli_query($db, "SELECT * FROM tbl_purchaserequest WHERE fldPurchaseRemarks != 'Pending' AND fldCompanyID = '$cid'  ORDER BY fldTransactionNo DESC ");
} elseif(isset($_GET['tbl_purchaserequest'])) {
	$sql = mysqli_query($db, "SELECT * FROM tbl_purchaserequest WHERE fldPurchaseRemarks = 'For Order'  ORDER BY fldTransactionNo DESC ");
} elseif(isset($_GET['tbl_purchaseitems'])) {
	$PrNo = $_GET['tbl_purchaseitems'];
	$sql = mysqli_query($db, "SELECT * FROM tbl_purchaseitems WHERE fldPrNo = '$PrNo' AND fldRemarks='Approved' ");
} elseif(isset($_GET['tbl_inspection'])) {
	$sql = mysqli_query($db, "SELECT * FROM tbl_inspection ORDER BY fldIarNo DESC LIMIT 1");
} elseif (isset($_GET['IARhistory'])) {
	$PrNo = $_GET['IARhistory'];
	$sql = mysqli_query($db, "SELECT * FROM tbl_inspection_list a,tbl_purchaserequest b, tbl_purchaseorder d, tbl_purchaseitems e  WHERE a.fldPRNo = '$PrNo' AND b.fldPrNo = '$PrNo' AND d.fldPoNo = '$PrNo' AND e.fldPrNo = '$PrNo' AND e.fldRemarks='Approved' ");
}
 elseif(isset($_GET['purchase_no'])) {
 	$sql = mysqli_query($db,"SELECT * FROM tbl_purchaserequest ORDER BY fldTransactionNo DESC LIMIT 1");
}
while ($rows = mysqli_fetch_assoc($sql)) {
	$data[] = $rows;
} echo json_encode($data, JSON_PRETTY_PRINT);
?>