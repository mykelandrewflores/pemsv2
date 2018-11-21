<?php
//load the database configuration file
include 'purchase_api/connect.php';

if(isset($_POST['importcostSubmit'])){
    
    //validate whether uploaded file is a csv file
    $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
    if(!empty($_FILES['file1']['name']) && in_array($_FILES['file1']['type'],$csvMimes)){
        if(is_uploaded_file($_FILES['file1']['tmp_name'])){
            $compid = $_POST['costcompid'];
            //open uploaded csv file with read only mode
            $csvFile = fopen($_FILES['file1']['tmp_name'], 'r');
            
            //skip first line
            fgetcsv($csvFile);
            
            while(($line = fgetcsv($csvFile)) !== FALSE){
                $db->query("INSERT INTO tbl_lccacosts (fldStngNo, fldCostName, fldCostType, fldCostValue, fldUserID) VALUES ('','".$line[0]."','".$line[1]."','".$line[2]."','".$compid."')");
            }
            
            //close opened csv file
            fclose($csvFile);

            $qstring = '?status=succ';
        }else{
            $qstring = '?status=err';
        }
    }else{
        $qstring = '?status=invalid_file';
    }
}

//redirect to the listing page
header("Location: ../CompAdmin/lccasettings.html".$qstring);

?>