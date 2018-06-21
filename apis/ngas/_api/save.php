<?php
$file = "../data.json";
$record = $_POST['jsonData'];
file_put_contents($file, json_encode($record));
echo json_encode(array("message"=>"success"));
?>