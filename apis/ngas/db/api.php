<?php 
include('conn.php');
header('Access-Allow-Control-Origin:*');
header('Content-Type:application/json');
define('SERVER','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DB','db_arnie');	
// $db=new con("localhost", "u687158084_arnie", "123456ab", "u687158084_pems");
$db=new con(SERVER, USERNAME, PASSWORD, DB);
?>


<?php 

$res=explode("/",rtrim($_REQUEST["res"],"/"));

switch($_SERVER['REQUEST_METHOD']){
	case "GET":
	if($res[0]=='read'){	
		$db->select('*')->from($res[1]);
	}elseif($res[0]=='readwithid'){
		$db->select('*')->from($res[1])->where($res[2],$res[3])->orderby($res[4]);
	}elseif($res[0]=='purchaseid'){
		$db->purchaseid();
	}elseif($res[0]=='inspectitems'){
		$db->inspectitems();
	}elseif($res[0]=='inspectitemswithid'){
		$db->inspectitemswithid();
	}
	$db->querys();

	case "POST":
	if($res[0]=='create'){
		$insert = new create($res[1]);
	}
	
	break;
	// case "PUT";
	// if($res[0]=='update'){
	// 	$update = new update($res[1],$res[2]);
	// }
	// break;

}

?>

