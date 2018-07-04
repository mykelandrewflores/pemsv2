<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
include('connect.php');
$data = json_decode(file_get_contents("php://input"));
$PRNO = $data[0]->PO;
$select2 = mysqli_query($db, "SELECT * FROM tbl_purchaseitems WHERE fldPrNo = '$PRNO' ");
$if_zero = 0;
while($check2 = mysqli_fetch_assoc($select2)){
	if($check2['fldRecieve'] == 0) {
		$if_zero--;
	} else {
		$if_zero += 1;
	}
} 
if($if_zero < 0) {
	$sql = mysqli_query($db,"UPDATE tbl_purchaserequest SET fldPurchaseRemarks = 'Done' WHERE fldPrNo = '$PRNO' ");

}
echo json_encode(array('response' => 'respondent'));

?>