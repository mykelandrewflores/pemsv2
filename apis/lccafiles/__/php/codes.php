<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

class dbConn{
	private $sql;
	private $db;

    //DB
	public function __construct(){
		$this->db = mysqli_connect("localhost", "root", "", "db_lifecycle");
	}

    function login($username, $pw){
        $this->sql = "SELECT * FROM tbl_users WHERE fldUsername = '$username' AND fldPassword = '$pw'";
        $result = $this->db->query($this->sql);
        $count = mysqli_num_rows($result);
        $data = array();
        if($count > 0){
            $rows = $result->fetch_array();
            $data = array("status"=>"True", "user_ID"=>"$rows[0]");
        } else {
            $data = array("status"=>"False");
        } 

        echo json_encode($data);
    }

    //CREATE
    function insert($table){
        $data = json_decode(file_get_contents("php://input"));
        print_r($data);
        $finaldata = "";
        foreach($data as $key => $value){
            if($key != 0){
                $finaldata .= ", ";
            }
            $finaldata .= "(NULL";
                foreach($data[$key] as $skey => $svalue){
                    $finaldata .= ", '" . $svalue . "'";
                }
            $finaldata .= ")";
        }
        $this->sql = "INSERT INTO $table VALUES $finaldata";
        if($this->db->query($this->sql)){
            
        }
    }

    function insertNPK($table){
        $data = json_decode(file_get_contents("php://input"));
        print_r($data); 
        $finaldata = "";
        $myCount = 0;
        foreach($data as $key => $value){
            $myCount = 0;
            if($key != 0){
                $finaldata .= ", ";
            }
            $finaldata .= "(";
                foreach($data[$key] as $skey => $svalue){
                    if($myCount == 0){
                        $finaldata .= "'" . $svalue . "'";
                        $myCount += 1;
                    } else {
                        $finaldata .= ", '" . $svalue . "'";
                    }
                }
            $finaldata .= ")";
        }
        $this->sql = "INSERT INTO $table VALUES $finaldata";
        if($this->db->query($this->sql)){
            
        }
    }
    

    //READ
	public function select($fields){
		$this->sql = "SELECT $fields";
		return $this;
	}

	public function from($tblname){
		$this->sql .= " FROM $tblname";
		return $this;
	}

	public function where($fldname, $id){
		$this->sql .= " WHERE $fldname = '$id'";
		return $this;
	}

	public function orderby($colname, $order="ASC"){
        $this->sql .= " ORDER BY $colname $order";
        return $this;
    }

    public function groupby($fldname){
    	$this->sql .= " GROUP BY $fldname";
    }

    public function offset($mval){
        $this->sql .= " OFFSET $mval";
        return $this;
    }


    public function limit($no){
    	$this->sql .= " LIMIT $no";
    	return $this;
    }

    public function runQuery(){
    	$info = array();
    	if($result = $this->db->query($this->sql)){
			header('HTTP/1.0 200 Status Ok');
    		while($rows = $result->fetch_assoc()){
                $rows = array_map('utf8_encode', $rows);    			
    			array_push($info, $rows);
    		}
    	} else {
    		header('HTTP:/1.0 404 Not Found');
    		$info = array("Status" => 404, "message"=> "No data found");
    	}
    	echo json_encode($info);

    }

    //UPDATE
    public function update($table, $fld, $id){
        $mykey = "";
        $myval = "";
        $finaldata = "";
        $myCount = 0;
        $data = json_decode(file_get_contents("php://input"));
        foreach($data as $key => $value){
                $myCount = 0;
            foreach($data[$key] as $skey => $svalue){
                $mykey =  $skey;
                $myval =  $svalue;
                if($myCount == 0){
                    $finaldata .= "$skey = '$svalue'";
                    $myCount += 1;
                }else {
                    $finaldata .= ", $skey = '$svalue'";
                }
            }
        }
        echo $finaldata;
        $this->sql = "UPDATE $table set $finaldata WHERE $fld = $id";
        if($this->db->query($this->sql)){
            echo "it works";
        }
    }

    //DELETE

    public function delete($table, $fld, $id){
        $this->sql = "DELETE FROM $table WHERE $fld = $id";
        if($this->db->query($this->sql)){
            echo "it works";
        }        
    }

}

?>