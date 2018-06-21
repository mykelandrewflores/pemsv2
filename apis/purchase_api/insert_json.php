<?php
header('Access-Control-Allow-Origin:*');
header('Content-type: application-json');
date_default_timezone_set('Asia/Manila');
require_once('connect.php');
$data = json_decode(file_get_contents("php://input"));
$sql = "";
foreach ($data as $key => $value) {
	$sql .= "INSERT INTO tbl_purchaseitems(`fldPrNo`, `fldUnit`, `fldPNum`, fldBrand, `fldQty`, `fldUnitCost`, `fldTotalCost`, `fldRemarks`) VALUES('".$data[$key]->requestPR."','".$data[$key]->unit."','".$data[$key]->equipment."','".$data[$key]->bname."','".$data[$key]->qty."', '".$data[$key]->cost."', '".$data[$key]->total_cost."', 'Pending' );";
}  if(mysqli_multi_query($db,$sql)) {
	echo json_encode(array("status" => "inserted successfully"),JSON_PRETTY_PRINT);
}else {
	echo json_encode(array("status" => "inserted failed"),JSON_PRETTY_PRINT);
}
?>