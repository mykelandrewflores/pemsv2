<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

class dbConnect {
	// private $servername	= "192.168.11.3";
	// private $servername = "192.168.11.15";
	// private $servername = '192.168.1.25';
	private $servername = "localhost";
	private $username	= "root";
	private $password	= "";
	private $dbName		= "db_arnie";

	public function connect() {
		// $connect = mysqli_connect("localhost", "u687158084_arnie", "123456ab", "u687158084_pems");
		$connect = mysqli_connect("localhost", "root", "", "db_arnie");
		if ($connect) {
			return $connect;
		} else {
			return 'false';
		}
		
	}
}

class Api {
	private $dbConn;
	public function __construct(){
		$db = new dbConnect;
		$this->dbConn = $db->connect();
	}
	public function getAllPR() {
		$sql = 'SELECT fldTransactionNo, fldPrNo, fldDept, fldDate, fldPurpose, fldPurchaseRemarks, fldCompanyID FROM tbl_purchaserequest WHERE fldPurchaseRemarks != "Pending"';
		$result = $this->dbConn->query($sql);
		$data = [];
    	while($rows = $result->fetch_assoc()){
            array_push($data, $rows);
    	}
    	echo json_encode($data);
	}
	public function getAllPendingPR() {
		$sql = 'SELECT fldTransactionNo, fldPrNo, fldDept, fldDate, fldPurpose, fldCompanyID FROM tbl_purchaserequest WHERE fldPurchaseRemarks = "Checked"';
		$result = $this->dbConn->query($sql);
		$data = [];
    	while($rows = $result->fetch_assoc()){
            array_push($data, $rows);
    	}
    	echo json_encode($data);
	}
	public function getAllPROrderedPR() {
		$sql = 'SELECT fldTransactionNo, fldPrNo, fldDept, fldDate, fldPurpose, fldCompanyID FROM tbl_purchaserequest WHERE fldPurchaseRemarks = "For Order"';
		$result = $this->dbConn->query($sql);
		$data = [];
    	while($rows = $result->fetch_assoc()){
            array_push($data, $rows);
    	}
    	echo json_encode($data);
	}
	public function getAllPRitems($pr_no) {
		$sql = 'SELECT * FROM tbl_purchaseitems WHERE fldPrNo = "'.$pr_no.'" AND fldRemarks="Approved"';
		$result = $this->dbConn->query($sql);
		$data = [];
    	while($rows = $result->fetch_assoc()){
            array_push($data, $rows);
    	}
    	echo json_encode($data);
	}
	public function getAllPRitemsdetails($pr_no) {
		$sql = 'SELECT * FROM tbl_purchaseorder WHERE fldPoNo = "'.$pr_no.'"';
		$result = $this->dbConn->query($sql);
		$data = [];
    	while($rows = $result->fetch_assoc()){
            array_push($data, $rows);
    	}
    	echo json_encode($data);
	}
	public function savePO(){
		$poNo = $_POST['prNo'];
		$supplier = $_POST['supplier'];
		$supplierAdd = $_POST['address'];
		$modeOfProcurement = $_POST['modeOfProcurement'];
		$placeOfDelivery = $_POST['placeOfDelivery'];
		$dateOfDelivery = $_POST['dateOfDelivery'];
		$deliveryTerm = $_POST['deliveryTerm'];
		$paymentTerm = $_POST['paymentTerm'];
		$date = $_POST['today'];
		$companyID = $_POST['companyID'];
		$sql = 'INSERT INTO tbl_purchaseorder(fldPoNo,fldSupplier,fldSupplierAdd,fldModeOfProcurement,fldPlaceOfDelivery,fldDateOfDelivery,fldDeliveryTerm,fldPaymentTerm,fldPrNo,fldToday, fldCompanyID) VALUES ("'.$poNo.'","'.$supplier.'","'.$supplierAdd.'","'.$modeOfProcurement.'","'.$placeOfDelivery.'","'.$dateOfDelivery.'","'.$deliveryTerm.'","'.$paymentTerm.'","'.$poNo.'",NOW(),"'.$companyID.'")';
		$result = $this->dbConn->query($sql);
		$sql2 = 'UPDATE tbl_purchaserequest SET fldPurchaseRemarks="For Order" WHERE fldPrNo="'.$poNo.'"';
		$result2 = $this->dbConn->query($sql2);
		if ($result) {
			echo "Success";
		} else {
			echo "False";
		}
	}
}
if ($_GET['action']=='getAllPR') {
	$api = new Api;
	$api->getAllPR();
}
if ($_GET['action']=='getAllPendingPR') {
	$api = new Api;
	$api->getAllPendingPR();
}
if ($_GET['action']=='getAllOrderedPR') {
	$api = new Api;
	$api->getAllOrderedPR();
}
if ($_GET['action']=='getAllPRitems') {
	$pr_no = $_GET['pr_no'];
	$api = new Api;
	$api->getAllPRitems($pr_no);
}
if ($_GET['action']=='getAllPRitemsdetails') {
	$pr_no = $_GET['pr_no'];
	$api = new Api;
	$api->getAllPRitemsdetails($pr_no);
}
if ($_GET['action']=='savePO') {
	$api = new Api;
	$api->savePO();
}
?>