<?php
header('Access-Allow-Control-Origin:*');
header('Content-Type:application/json');
include('connect.php');
$data = json_decode(file_get_contents("php://input"));
$sql = "";
$inserting = "";
foreach ($data as $key => $value) {
	$sql .= "UPDATE tbl_purchaseitems SET fldRecieve = fldRecieve - '".$data[$key]->Recieve_qty."' WHERE fldTransactionID = '".$data[$key]->PrNo."';";
} 
if(mysqli_multi_query($db,$sql)) {
	echo json_encode(array('response' => 'successfully updated'),JSON_PRETTY_PRINT);
} else {
	echo json_encode(array('response' => 'failed update'),JSON_PRETTY_PRINT);
}
?>