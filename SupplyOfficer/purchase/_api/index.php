<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

class dbConnect {
	// private $servername	= "192.168.11.3";
	private $servername = "192.168.1.25";
	// private $servername = 'localhost';
	private $username	= "root";
	private $password	= "";
	private $dbName		= "db_arnie";

	public function connect() {
		$connect = mysqli_connect($this->servername, $this->username, $this->password, $this->dbName);
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
		$sql = 'SELECT fldTransactionNo, fldPrNo, fldDept, fldDate, fldPurpose FROM tbl_purchaserequest WHERE fldPurchaseRemarks = "Checked"';
		$result = $this->dbConn->query($sql);
		$data = [];
    	while($rows = $result->fetch_assoc()){
            array_push($data, $rows);
    	}
    	echo json_encode($data);
	}
	public function getAllPRitems($pr_no) {
		$sql = 'SELECT * FROM tbl_purchaseitems WHERE fldPrNo = "'.$pr_no.'" AND fldRemarks="Accept"';
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
		$sql = 'INSERT INTO tbl_purchaseorder(fldPoNo,fldSupplier,fldSupplierAdd,fldModeOfProcurement,fldPlaceOfDelivery,fldDateOfDelivery,fldDeliveryTerm,fldPaymentTerm,fldPrNo) VALUES ("'.$poNo.'","'.$supplier.'","'.$supplierAdd.'","'.$modeOfProcurement.'","'.$placeOfDelivery.'","'.$dateOfDelivery.'","'.$deliveryTerm.'","'.$paymentTerm.'","'.$poNo.'")';
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
if ($_GET['action']=='getAllPRitems') {
	$pr_no = $_GET['pr_no'];
	$api = new Api;
	$api->getAllPRitems($pr_no);
}
if ($_GET['action']=='savePO') {
	$api = new Api;
	$api->savePO();
}
?>