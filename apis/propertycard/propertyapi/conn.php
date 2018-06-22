<?php 

define('SERVER','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DB','db_arnie');
$db=new con(SERVER,USERNAME,PASSWORD,DB);

class dbconnect{
	public function db(){
		// return $db=mysqli_connect("localhost", "u687158084_arnie", "123456ab", "u687158084_pems");
		return $db=mysqli_connect("localhost", "root", "", "db_arnie");

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
	function fromtbl2($tblname){
		$this->string.=",$tblname ";
		return $this;
	}
	function where($fldname, $id){
		$this->string.=" WHERE $fldname = '$id' ";
		return $this;
	}function whereand($fldname, $id){
		$this->string.=" $fldname = '$id' ";
		return $this;
	}function wheredate($fldname, $id){
		$this->string.=" WHERE $fldname = $id ";
		return $this;
	}
	function andtable($tblname,$fldname, $id){
		$this->string.=" $tblname.$fldname = '$id' ";
		return $this;
	}
	function andjointable($tblname,$fldname, $tblname2,$fldname2){
		$this->string.=" $tblname.$fldname = $tblname2.$fldname2 ";
		return $this;
	}
	function clause($clause){
		$this->string.=" $clause ";
		return $this;
	}
	function between($fldname, $value1, $value2){
		$this->string.=" $fldname BETWEEN '$value1' AND '$value2'";
		return $this;
	}
	function orderby($colname, $order='ASC'){
		$this->string.=" ORDER BY $colname $order";
		return $this;
	}
	function limit($no){
		$this->string.="LIMIT $no";
		return $this;
	}

	function emptable($tblone,$tbltwo,$idone,$idtwo,$position){
		$this->string="SELECT $tblone.*,$tbltwo.$position FROM $tblone,$tbltwo WHERE $tblone.$idone=$tbltwo.$idtwo";
		return $this;
	}
	function duration($tblone,$tbltwo,$idone,$idtwo){
		$this->string="SELECT * FROM $tblone,$tbltwo WHERE $tblone.$idone = $tbltwo.$idtwo ";
		return $this;
	}
	function durationmy($tblone,$tbltwo,$idone,$idtwo,$idthree,$value1){
		$this->string="SELECT * FROM $tblone,$tbltwo WHERE $tblone.$idone = $tbltwo.$idtwo AND $tbltwo.$idthree = $value1";
		return $this;
	}
	function duration1($tblone,$tbltwo,$idone,$idtwo,$idthree,$value1,$idfour,$value2){
	
		$this->string="SELECT * FROM $tblone,$tbltwo WHERE $tblone.$idone = $tbltwo.$idtwo AND $tbltwo.$idthree = $value1 AND $tbltwo.$idfour = '$value2'";
		return $this;
	}
	function UACtable($tblone,$tbltwo,$tblthree,$idone,$idtwo,$idthree,$position,$module){
		$this->string="SELECT $tblone.*,$tbltwo.$position,$tblthree.$module FROM $tblone,$tbltwo,tblmodule WHERE $tblone.$idone=$tbltwo.$idtwo AND $tblone.$idthree = $tblthree.$idthree ";
		return $this;
	}

	function UACtableView($tblone,$tbltwo,$tblthree,$idone,$idtwo,$idthree,$position,$module,$tblfour,$empid){
		$this->string="SELECT $tblone.*,$tbltwo.$position,$tblthree.$module FROM $tblone,$tbltwo,tblmodule WHERE $tblone.$idone=$tbltwo.$idtwo AND $tblone.$idthree = $tblthree.$idthree AND $tblone.$tblfour = $empid";
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



class create{
	public function __construct(){
		$insert = '';
		if($_POST['tblname']=='tbl_property'){
			$fldIarNo=$_POST['fldIarNo'];	
			$fldAgency=$_POST['fldAgency'];
			$fldPNum=$_POST['fldPNum'];
			$fldDept=$_POST['fldDept'];
			$fldRefNo=$_POST['fldRefNo'];
			$fldRecQty=$_POST['fldRecQty'];
			$fldTDQty=$_POST['fldTDQty'];
			$fldRemarks=$_POST['fldRemarks'];
			$tblname=$_POST['tblname'];
			$insert="INSERT INTO tbl_property(fldIarNo,fldAgency,fldPNum,fldDept,fldRefNo,fldRecQty,fldTDQty,fldRemarks) values('$fldIarNo','$fldAgency','$fldPNum','$fldDept','$fldRefNo','$fldRecQty','$fldTDQty','$fldRemarks')";
		}elseif ($_POST['tblname']=='tbl_property_dispose') {
			$log_fldRecID = $_POST['log_fldRecID'];
			$log_fldIarNo = $_POST['log_fldIarNo'];
			$log_fldPNum = $_POST['log_fldPNum'];
			$log_fldAgency = $_POST['log_fldAgency'];
			$log_fldDept = $_POST['log_fldDept'];
			$log_fldDate = $_POST['log_fldDate'];
			$log_fldRefNo = $_POST['log_fldRefNo'];
			$log_fldRecQty = $_POST['log_fldRecQty'];
			$log_fldTDQty = $_POST['log_fldTDQty'];
			$log_fldRemarks = $_POST['log_fldRemarks'];
			$log_fldAction = $_POST['log_fldAction'];
			$log_fldFromDept = $_POST['log_fldFromDept'];
			$log_tblname = $_POST['tblname'];
			$insert="INSERT INTO tbl_property_dispose (fldRecID,fldIarNo,fldPNum,fldAgency,fldDept,fldDate,fldRefNo,fldRecQty,fldTDQty,fldRemarks,fldAction,fldFromDept) VALUES('$log_fldRecID','$log_fldIarNo','$log_fldPNum','$log_fldAgency','$log_fldDept','$log_fldDate','$log_fldRefNo','$log_fldRecQty','$log_fldTDQty','$log_fldRemarks','$log_fldAction','$log_fldFromDept')";
		}
		else{
			
			$data=["status"=>"404","message"=>"No table found"];	
			echo json_encode($data);
		}
		dbconnect::db()->query($insert);
		header("HTTP/1.0 200 ok");
		$data=['status'=>'New Data Created'];
		echo json_encode($data);
	}
}
class update{
	public function __construct(){
		$update='';
		if($_POST['update_action']=='update_propertydata'){
			$fldRecID=$_POST['fldRecID'];
			$fldTDQty=$_POST['fldTDQty'];
			$fldRemarks=$_POST['fldRemarks'];
			$fldDept=$_POST['fldDept'];
			$tblname=$_POST['tblname'];
			$update="UPDATE $tblname SET fldTDQty='$fldTDQty',fldRemarks='$fldRemarks',fldDept='$fldDept' WHERE fldRecID='$fldRecID'";
		}if($_POST['update_action']=='update_employee'){
			$fldUserID=$_POST['fldUserID'];
			$fldUsername=$_POST['fldUsername'];
			$fldFname=$_POST['fldFname'];
			$fldLname=$_POST['fldLname'];
			$fldMname=$_POST['fldMname'];
			$fldRole=$_POST['fldRole'];
			$fldDepartment=$_POST['fldDepartment'];
			$tblname=$_POST['tblname'];
			$update="UPDATE $tblname SET fldUsername='$fldUsername',fldFname='$fldFname',fldLname='$fldLname',fldMname='$fldMname',fldRole='$fldRole',fldDepartment='$fldDepartment' WHERE fldUserID='$fldUserID'";
		}
		elseif ($_POST['update_action']=='update_tables') {
			$tblname=$_POST['tblname'];
			$tableno = $_POST['fldTableNo'];
			$tabledesc = $_POST['fldTableDesc'];
			$tableid = $_POST['fldTableID'];
			$update = "UPDATE $tblname SET fldTableNo='$tableno', fldTableDesc='$tabledesc' WHERE fldTableID = '$tableid'";
		}elseif ($_POST['update_action']=='updateUAC') {
			$tblname = $_POST['tblname'];
			$empid = $_POST['fldEmployeeID'];
			$moduleid = $_POST['fldModuleID'];
			$positionid= $_POST['fldPositionID'];
			$update = "UPDATE $tblname SET fldModuleID='$moduleid', fldPositionID='$positionid' WHERE fldEmployeeID='$empid'";
		}elseif ($_POST['update_action']=='updateUAC_LOGIN') {
			$tblname = $_POST['tblname'];
			$empid = $_POST['fldEmployeeID'];
			$username = $_POST['fldUsername'];
			$password= $_POST['fldPassword'];

			//BLOWFISH ENCRYPTION
			$hash_format = "$2y$10$";
			$salt_length = 22;
			$unique_random_string = md5(uniqid(mt_rand(),true));
			$base64_string = base64_encode($unique_random_string);
			$modified_string = str_replace("+", ".", $base64_string);
			$salt = substr($modified_string,0,$salt_length);
			$format_and_salt = $hash_format.$salt;

			$enrypted_pass = crypt($password,$format_and_salt);//ENCRYPTED PASS :)

			$update = "UPDATE $tblname SET fldUsername='$username', fldPassword='$enrypted_pass' WHERE fldEmployeeID='$empid'";
		}elseif ($_POST['update_action']=='updateUAC_LOGIN_ACCESSLEVEL') {
			$tblname = $_POST['tblname'];
			$empid = $_POST['fldEmployeeID'];
			$username = $_POST['fldUsername'];
			$password= $_POST['fldPassword'];
			$moduleid = $_POST['fldModuleID'];
			$positionid= $_POST['fldPositionID'];

			//BLOWFISH ENCRYPTION
			$hash_format = "$2y$10$";
			$salt_length = 22;
			$unique_random_string = md5(uniqid(mt_rand(),true));
			$base64_string = base64_encode($unique_random_string);
			$modified_string = str_replace("+", ".", $base64_string);
			$salt = substr($modified_string,0,$salt_length);
			$format_and_salt = $hash_format.$salt;

			$enrypted_pass = crypt($password,$format_and_salt);//ENCRYPTED PASS :)

			$update = "UPDATE $tblname SET fldUsername='$username', fldPassword='$enrypted_pass',fldModuleID='$moduleid', fldPositionID='$positionid' WHERE fldEmployeeID='$empid'";
		}
		elseif ($_POST['update_action']=='update_products') {
			$tblname=$_POST['tblname'];
			$fldFoodname = $_POST['fldFoodname'];
			$fldPrice = $_POST['fldPrice'];
			$fldDesc = $_POST['fldDesc'];
			$fldCategory = $_POST['fldCategory'];
			$fldImg = $_POST['fldImg'];
			$fldFoodQty = $_POST['fldFoodQty'];
			$fldFoodID = $_POST['fldFoodID'];

			$update = "UPDATE $tblname SET fldFoodname='$fldFoodname', fldPrice='$fldPrice', fldDesc='$fldDesc', fldCategory='$fldCategory', fldImg='$fldImg', fldFoodQty='$fldFoodQty' WHERE fldFoodID = '$fldFoodID'";
		}
		else{
			
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
		if($tblname=='tbl_equipment'){
			$delete="DELETE FROM $tblname WHERE fldProdID = '$id'";
			$archive="INSERT INTO tbl_equipment_archive SELECT * FROM tbl_equipment WHERE fldProdID= '$id'";
		}elseif ($tblname =='tbl_equipment_archive') {
			$delete="DELETE FROM $tblname WHERE fldProdID = '$id'";
			$archive="INSERT INTO tbl_equipment SELECT * FROM tbl_equipment_archive WHERE fldProdID= '$id'";
		}elseif ($tblname =='tblstoretables') {
			$delete="DELETE FROM $tblname WHERE fldTableID = '$id'";
		}elseif ($tblname =='tblproducts') {
			$delete="DELETE FROM $tblname WHERE fldFoodID = '$id'";
		}
		else{
			$info= array("status" =>"No table Found");
			echo json_encode($info);
		}

		if ($tblname=='tbl_equipment') {
			dbconnect::db()->query($archive);
			dbconnect::db()->query($delete);
		}elseif ($tblname =='tbl_equipment_archive') {
			dbconnect::db()->query($archive);
			dbconnect::db()->query($delete);
		}else{
			dbconnect::db()->query($delete);	
		}
		/*dbconnect::db()->query($delete);*/
		$data=['status'=>'Reminder Deleted'];
		echo json_encode($data);
	}
}


?>