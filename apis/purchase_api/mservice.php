<?php 	
$content = file_get_contents('php://input');
$lines = explode("\n", $content);
$db = mysqli_connect("localhost", "u687158084_arnie", "", "u687158084_pems");
$userid = $_GET['user'];
$tblnme = $_GET['tbl'];
foreach($lines as $line){
    $csv_row = str_getcsv($line);
    //save data into database
	$longString = "";
    //----
    $conter = 0;
    foreach($csv_row as $lne){
    	$longString .= "'" .$lne . "'";
 		$longString .= ", ";
    }
    $longString .= "$userid";
    if($tblnme == "tbl_lccasset"){
    	$sql = "INSERT INTO $tblnme (fldAssetType, fldYrs, fldUserID) VALUES ($longString)";
    } else {
    	$sql = "INSERT INTO $tblnme (fldCostName, fldCostType, fldCostValue, fldUserID) VALUES ($longString)";
    }
    $db->query($sql);
}
echo $longString;

?>

<html>
    
    <h1>Test</h1>
</html>