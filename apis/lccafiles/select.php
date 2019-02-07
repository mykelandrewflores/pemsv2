<?php 
require_once("db.php");
$sql = "SELECT * FROM tbl_coins ORDER BY fldTransactionNo DESC";
$result = $db->query($sql);
$data = array();
while($rows = $result->fetch_assoc()){
	array_push($data, $rows);
}
echo json_encode($data);

?>