<?php 	
header('Access-Control-Allow-Origin: *');
$content = file_get_contents('php://input');
$lines = explode("\n", $content);
$db = mysqli_connect("localhost", "u687158084_arnie", "123456ab", "u687158084_pems");
$userid = $_GET['user'];
$tblnme = $_GET['tblnme'];
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

    $longString .= $userid;
    if($tblnme == "tbl_lccasset"){
    	$sql = "INSERT INTO " . $tblnme . "(fldAssetCateg, fldAssetType, fldYrs, fldUserID) VALUES ($longString)";
    } else {
    	$sql = "INSERT INTO " . $tblnme . "(fldCostName, fldCostType, fldCostValue, fldUserID) VALUES ($longString)";
    }
    if($db->query($sql)){
        echo "Working";
    } else {
        echo "Failed";
    }
}
?>