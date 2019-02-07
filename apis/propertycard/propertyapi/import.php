 <?php 
  header('Access-Control-Allow-Origin:*');
  header('Content-Type:application/json');
  ?>
 <?php  
 if(!empty($_FILES["employee_file"]["name"]))  
 {  
      $db = mysqli_connect("localhost", "u687158084_arnie", "123456ab", "u687158084_pems");  
      $output = '';  

      $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
      
      if(!empty($_FILES['employee_file']['name']) && in_array($_FILES['employee_file']['type'],$csvMimes)){
          if(is_uploaded_file($_FILES['employee_file']['tmp_name'])){
              //open uploaded csv file with read only mode
              $csvFile = fopen($_FILES['employee_file']['tmp_name'], 'r');
              
              //skip first line
              fgetcsv($csvFile);
              
              while(($line = fgetcsv($csvFile)) !== FALSE){
                  $db->query("INSERT INTO tbl_property (fldIarNo, fldPNum, fldBrand, fldAgency, fldDept, fldRefNo, fldRecQty, fldTDQty, fldRemarks) VALUES ('".$line[0]."', '".$line[1]."', '".$line[2]."', '".$line[3]."', '".$line[4]."','".$line[5]."','".$line[6]."','".$line[7]."','".$line[8]."')");
              }
              
              //close opened csv file
              fclose($csvFile);

               header("HTTP/1.0 201 created");
                $data=['status'=>'New Data Created'];
                echo json_encode($data);
          }else{
              header("HTTP/1.0 400 Bad Request");
              $data=['status'=>'Data Not Created'];
              echo json_encode($data);
          }
      }else{
          header("HTTP/1.0 406 Not Acceptable");
              $data=['status'=>'Inavlid File Type'];
              echo json_encode($data);
      }

 }
 ?>  