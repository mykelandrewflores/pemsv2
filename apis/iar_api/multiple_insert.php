<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
include_once('connect.php');
$data = json_decode(file_get_contents("php://input"));
$sql = "";
$inserting = "";
$nextid = "";
		$sqlid = "SELECT auto_increment FROM INFORMATION_SCHEMA.TABLES WHERE table_name = 'tbl_property'";
	    $res = mysqli_query($db,$sqlid);
	    $rows = mysqli_fetch_assoc($res);
	    $nextid =  $rows['auto_increment'];
foreach ($data as $key => $value) {
	echo $data[$key]->Recieve_qty;
	

	for($i=0; $i<$data[$key]->Recieve_qty; $i++) {
	    
		
		$sql .= "INSERT INTO tbl_property(fldIarNo, fldPNum, fldBrand, fldAgency, fldDept,fldRefNo,fldRecQty,fldTDQty, fldRemarks,fldPcID) VALUES ('".$data[$key]->IAR."', '".$data[$key]->prodName."', '".$data[$key]->brandName."','".$data[$key]->company_id."', '".$data[$key]->dept."', '".$data[$key]->invoice_no."', '1', '0', 'Unassigned','PC".str_pad($nextid, 5, '0', STR_PAD_LEFT)."');";

		$sql .= "INSERT INTO tbl_inspection_list(fldProdID,fldRecieve,fldIarNo,fldPRNo) VALUES('".$data[$key]->prodName."','1','".$data[$key]->IAR."','".$data[$key]->log_prno."');";
	   $nextid ++;
	}
	
}


if(mysqli_multi_query($db,$sql)) {
	echo json_encode(array('response' => 'successfully updated'),JSON_PRETTY_PRINT);
} else {
	echo json_encode(array('response' => 'failed update'),JSON_PRETTY_PRINT);

	echo "<br>";
	echo $sql;
}


?>