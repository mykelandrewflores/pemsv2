 <?php  
 if(!empty($_FILES["employee_file"]["name"]))  
 {  
      $connect = mysqli_connect("localhost", "u687158084_arnie", "123456ab", "u687158084_pems");  
      $output = '';  
      $allowed_ext = array("csv");  
      $extension = end(explode(".", $_FILES["employee_file"]["name"]));  
      if(in_array($extension, $allowed_ext))  
      {  
           $file_data = fopen($_FILES["employee_file"]["tmp_name"], 'r');  
           fgetcsv($file_data);  
           while($row = fgetcsv($file_data))  
           {  
                $fldIarNo = mysqli_real_escape_string($connect, $row[0]);  
                $fldPNum = mysqli_real_escape_string($connect, $row[1]);  
                $fldBrand = mysqli_real_escape_string($connect, $row[2]);  
                $fldAgency = mysqli_real_escape_string($connect, $row[3]);  
                $fldDept = mysqli_real_escape_string($connect, $row[4]);  
                $fldRefNo = mysqli_real_escape_string($connect, $row[5]);  
                $fldRecQty = mysqli_real_escape_string($connect, $row[6]);  
                $fldTDQty = mysqli_real_escape_string($connect, $row[7]); 
                $fldRemarks = mysqli_real_escape_string($connect, $row[8]); 
                $query = "  
                INSERT INTO tbl_property (fldIarNo, fldPNum, fldBrand, fldAgency, fldDept, fldRefNo, fldRecQty, fldTDQty, fldRemarks) VALUES ('$fldIarNo', '$fldPNum', '$fldBrand', '$fldAgency', '$fldDept','$fldRefNo', '$fldRecQty', '$fldTDQty', '$fldRemarks')";  
                mysqli_query($connect, $query);  
           }
      }  
      else  
      {  
           echo 'Error1';  
      }  
 }  
 else  
 {  
      echo "Error2";  
 }  
 ?>  