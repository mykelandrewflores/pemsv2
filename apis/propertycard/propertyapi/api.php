<?php 
include('conn.php');
header('Access-Control-Allow-Origin:*');
header('Content-Type:application/json');
?>


<?php 

$res=explode ("/",rtrim($_REQUEST["res"],"/"));

switch($_SERVER['REQUEST_METHOD']){
	case "GET":
	if(count($res)==1){	
		$db->select('*')->from($res[0]);
	}elseif(count($res)==3 AND $res[0] != 'appyear'){
		$db->select('*')->from($res[0])->where($res[1], $res[2]);
	}elseif(count($res)==5){
		$db->select('*')->from($res[0])->where($res[1], $res[2])->clause('AND')->whereand($res[3],$res[4]);
	}elseif ($res[0]=='whereandbetween') {
		$db->select('*')->from($res[1])->where($res[2],$res[3])->clause('AND')->between($res[4],$res[5],$res[6]);	
	}elseif ($res[0]=='between') {
		$db->select('*')->from($res[1])->clause('WHERE')->between($res[2],$res[3],$res[4]);
	}elseif ($res[0]=='duration') {
		$db->duration($res[1],$res[2],$res[3],$res[4])->clause('AND')->andtable($res[1],$res[3],$res[5]);
	}elseif ($res[0]=='tbl_lccalives_all') {
		$db->durationmy($res[1],$res[2],$res[3],$res[4],$res[5],$res[6]);
	}elseif ($res[0]=='tbl_lccalives_filter') {
		$db->duration1($res[1],$res[2],$res[3],$res[4],$res[5],$res[6],$res[7],$res[8]);
	}elseif ($res[0]=='tbl_lccalives_searchall') {
		$db->searchall($res[1],$res[2],$res[3],$res[4],$res[5],$res[6],$res[7],$res[8],$res[9],$res[10],$res[11],$res[12]);
	}elseif ($res[0]=='tbl_lccalives_searchpropname') {
		$db->searchpropname($res[1],$res[2],$res[3],$res[4],$res[5],$res[6],$res[7],$res[8]);
	}elseif ($res[0]=='tbl_lccalives_searchnamecateg') {
		$db->searchnamecateg($res[1],$res[2],$res[3],$res[4],$res[5],$res[6],$res[7],$res[8],$res[9],$res[10]);
	}elseif ($res[0]=='tbl_lccalives_searchnamedept') {
		$db->searchnamedept($res[1],$res[2],$res[3],$res[4],$res[5],$res[6],$res[7],$res[8],$res[9],$res[10]);
	}elseif ($res[0]=='where3and') {
		$db->select('*')->from($res[1])->fromtbl2($res[2])->where($res[3],$res[4])->clause('AND')->whereand($res[5],$res[6])->clause('AND')->whereand($res[7],$res[8])->clause('AND')->whereand($res[9],$res[10])->clause('AND')->andjointable($res[1],$res[3],$res[2],$res[11]);	
	}elseif($res[0]=='lccacateg'){	
		$db->select('DISTINCT(fldPropertyCategory)')->from($res[1]);
	}elseif($res[0]=='getnextid'){
	    $db->getNextID($res[1]);
	}elseif ($res[0]=='appyear') {
		$db->APPYEAR($res[1],$res[2]);
	}
	
	$db->querys();
	break;

	case "POST":
	if($res[0]=='create'){
		$insert = new create();
		
	}
	if($res[0]=='update'){
		$update = new update();
	}
	if($res[0]=='delete'){
		$delete = new delete($res[1],$res[2]);
	}

	break;

	case "PUT":

	break;

	case "DELETE";

	break;

}




?>
