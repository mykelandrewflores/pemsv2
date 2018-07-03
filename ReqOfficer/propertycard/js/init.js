 var myUrl = "http://gordoncollegeccs-ssite.net/pems/apis"; 
  $(document).ready(function(){
  	$('.sidenav').sidenav();
  	$('select').formSelect();
  	$('.modal').modal();
            $.getJSON("http://localhost/myapi/select/tbl_user/fldUserID/" + localStorage.userID, function(data) {
                document.getElementById('name').innerHTML = data[0].fldFname + " " + data[0].fldLname;
                document.getElementById('dept').innerHTML = data[0].fldDepartment;
            });
  });
