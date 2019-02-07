<?php
header('Access-Control-Allow-Origin:*');
header('Content-type: application-json');
require_once('connect.php');
$array = array();
if(isset($_GET['get_last_request'])) {
	$sql = mysqli_query($db,"SELECT * FROM tbl_purchaserequest ORDER BY fldTransactionNo DESC LIMIT 1");
}
elseif(isset($_GET['fetch_equipments'])) {
	$data = $_GET['fetch_equipments'];
	$sql = mysqli_query($db,"SELECT * FROM tbl_equipment WHERE fldCompanyID = '$data'");
} elseif(isset($_GET['fetch_equipments_data'])) {
	$data = $_GET['fetch_equipments_data'];
	$sql = mysqli_query($db,"SELECT * FROM tbl_lccasset WHERE fldAssetCateg = '$data'");
} elseif(isset($_GET['fetch_pr_list'])) {
	$sql = mysqli_query($db,"SELECT * FROM tbl_purchaserequest ORDER BY fldTransactionNo DESC");
} elseif(isset($_GET['fetch_pr_equipment'])) {
	$get = $_GET['fetch_pr_equipment'];
	$sql = mysqli_query($db,"SELECT * FROM tbl_purchaseitems WHERE fldPrNo = '$get' ");
}

elseif(isset($_GET['lcca_livesdis'])) {
	$xid = $_GET['userid'];
	$sql = mysqli_query($db,"SELECT DISTINCT(fldAssetCateg) FROM tbl_lccasset WHERE fldUserID = '$xid'");
}

while($data = mysqli_fetch_assoc($sql)) {
	$array[] = $data;
} 
echo json_encode($array,JSON_PRETTY_PRINT);
?>