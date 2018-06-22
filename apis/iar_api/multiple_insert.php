<?php
header('Access-Allow-Control-Origin:*');
header('Content-Type:application/json');
include_once('connect.php');
$data = json_decode(file_get_contents("php://input"));
$sql = "";
$inserting = "";
foreach ($data as $key => $value) {
	for($i=0; $i<$data[$key]->Recieve_qty; $i++) {
		$sql .= "INSERT INTO tbl_property(fldIarNo, fldPNum, fldBrand, fldAgency, fldDept,fldRefNo,fldRecQty,fldTDQty, fldRemarks) VALUES ('".$data[$key]->IAR."', '".$data[$key]->prodName."', '".$data[$key]->brandName."','".$data[$key]->company_id."', '".$data[$key]->dept."', '".$data[$key]->invoice_no."', '1', '0', 'Unassigned');";
		$sql .= "INSERT INTO tbl_inspection_list(fldProdID,fldProdName,fldRecieve,fldIarNo) VALUES('".$data[$key]->prodName."','".$data[$key]->prodName."','1','".$data[$key]->IAR."');";
	}
}
if(mysqli_multi_query($db,$sql)) {
	echo json_encode(array('response' => 'successfully updated'),JSON_PRETTY_PRINT);
} else {
	echo json_encode(array('response' => 'failed update'),JSON_PRETTY_PRINT);
}
?>