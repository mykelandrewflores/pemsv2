<?php
class dbconnect{
	public function db(){
		return mysqli_connect("localhost", "u687158084_arnie", "123456ab", "u687158084_pems");
		// return mysqli_connect("localhost", "root", "", "db_arnie");
	}
}


class con{
	protected $conn;
	protected $string;

	function __construct($host,$username,$pass,$db){
		$this->conn=mysqli_connect($host,$username,$pass,$db);
		if(mysqli_connect_error()){
			echo "UNABLE TO CONNECT";
		}
	}
	function check_if_empty($arr = array()){
		for ($i=0;$i<count($arr);$i++){
			if (empty($arr[$i])) {
				return true;
			}
		}
		return false;
	}

	function select($select){
		$this->string= "SELECT $select ";
		return $this;
	}
	function from($tblname){
		$this->string.=" FROM $tblname ";
		return $this;
	}
	function where($fldname,$id){
		$this->string.=" WHERE $fldname = '$id' ";
		return $this;
	}
	function orderby($colname, $order='DESC'){
		$this->string.=" ORDER BY $colname $order";
		return $this;
	}
	function limit($no){
		$this->string.=" LIMIT $no";
		return $this;
	}
	function update($update){
		$this->string="UPDATE $update ";
		return $this;

	}
	function set($set){
		$this->string.=" SET $set";
		return $this;
	}
	function search(){
		$search=$_GET['search'];
		$this->string="SELECT *,SUM(fldNetpay)/12 as tmpay FROM tblsalary where fldEmployeeName like '%$search%'  group by fldEmployeeID";
		return $this;

	}

	function inspectitems(){
		$this->string="SELECT tbl_purchaserequest.fldPrNo,tbl_purchaserequest.fldDept,tbl_purchaserequest.fldDate,tbl_purchaserequest.fldPurpose,tbl_purchaseitems.fldUnit,tbl_purchaseitems.fldPNum,tbl_purchaseitems.fldQty,tbl_equipment.fldProdName,tbl_equipment.fldDesc FROM tbl_purchaserequest,tbl_purchaseitems,tbl_equipment where tbl_purchaserequest.fldPrNo=tbl_purchaseitems.fldPrNo and tbl_purchaseitems.fldPNum=tbl_equipment.fldProdID and tbl_purchaserequest.fldPurchaseRemarks ='For Order' GROUP BY tbl_purchaserequest.fldPrNo";
		return $this;
	}
	function inspectitemswithid(){
		$prno = $_GET['prno'];
		$this->string="SELECT tbl_purchaserequest.fldPrNo,tbl_purchaserequest.fldDept,tbl_purchaserequest.fldDate,tbl_purchaserequest.fldPurpose,tbl_purchaseitems.fldUnit,tbl_purchaseitems.fldPNum,tbl_purchaseitems.fldQty,tbl_equipment.fldProdName,tbl_equipment.fldDesc FROM tbl_purchaserequest,tbl_purchaseitems,tbl_equipment where tbl_purchaserequest.fldPrNo=tbl_purchaseitems.fldPrNo and tbl_purchaseitems.fldPNum=tbl_equipment.fldProdID and tbl_purchaserequest.fldPrNo='$prno' group by tbl_purchaseitems.fldPNum";
		return $this;

	}
	
	function querys(){
		$result=mysqli_query($this->conn,$this->string);
		$data=[];
		if(mysqli_num_rows($result)){
			while($info=mysqli_fetch_assoc($result)){
				array_push($data,$info);

			}
		}
		else{
			header('HTTP/1.0 403 Forbidden');
			$data=["status" => "404","message"=> "No Data Found"];
		}
		echo json_encode($data);
	}

}

// CLASSES

class create{
	public function __construct($tblname){
		$insert = '';
		if($tblname=='tbl_property'){
			// $date=date("m/d/Y",strotime());
			$prodid=$_POST['prodid'];
			$pnum=$_POST['pnum'];
			$agency=$_POST['agency'];
			$dept=$_POST['dept'];
			$dateofinvoice=$_POST['dateofinvoice'];
			$refno=$_POST['invoice'];
			$recqty=$_POST['recqty'];
			$tdqty=$_POST['tdqty'];
			$office=$_POST['office'];
			$bal=$_POST['bal'];
			$insert="INSERT INTO `tbl_property` ( `fldPNum`, `fldAgency`, `fldDept`, `fldRefNo`, `fldRecQty`, `fldTDQty`, `fldOffice`, `fldBalQty`) VALUES ('$pnum', '$agency', '$dept', '$refno', '$recqty', '$tdqty', '$office', '$bal')";
			$iinsert="INSERT INTO `tbl_inspection` (`fldAgency`, `fldInvoiceNo`,`fldPoNo`, `fldReqDep`, `fldPrNo`, `fldProdID`) VALUES ('$agency', '$refno','$pnum', '$office', '$pnum', '$prodid')";
		
		}else{
			
			$data=["status"=>"404","message"=>"No table found"];	
			echo json_encode($data);
		}
		dbconnect::db()->query($insert);
		dbconnect::db()->query($iinsert);
		header("HTTP/1.0 200 ok");
		$data=['status'=>'New Data Created'];
		echo json_encode($data);
	}
}
class update{
	public function __construct($tblname,$id){
		$update='';
		if($tblname=='tblcashadvance'){
			$action=$_POST['action'];
			if($action=='Approve'){
				$appamount=$_POST['appamount'];
				$update="UPDATE $tblname set AppAmount = '$appamount', Remarks='Approve', status='Balance' where CashAdvanceID='$id'";
			}
		}else{
			
			$info= array("status" =>"No table Found");
			echo json_encode($info);
		}
		dbconnect::db()->query($update);
		$data=['status'=>'Reminder Updated'];
		echo json_encode($data);
	}

}
class delete{
	public function __construct($tblname,$id){
		$delete='';
		if($tblname=='tblcashadvance'){
			$delete="DELETE FROM $tblname WHERE CashAdvanceID = '$id' ";

		}else{
			$info= array("status" =>"No table Found");
			echo json_encode($info);
		}
		dbconnect::db()->query($delete);
		$data=['status'=>'Reminder Deleted'];
		echo json_encode($data);
	}
}


?>