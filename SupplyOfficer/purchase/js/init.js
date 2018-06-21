 var myUrl = "http://localhost";

  $(document).ready(function(){
    $('.modal').modal({
      dismissible: false
    });
  });

  $(document).ready(function(){
    $('select').formSelect();
  });

  $(document).ready(function(){
    $('.datepicker').datepicker();
  });


  $(document).ready(function(){
  	$('.sidenav').sidenav();
            $.getJSON("http://localhost/myapi/select/tbl_user/fldUserID/" + localStorage.userID, function(data) {
                document.getElementById('name').innerHTML = data[0].fldFname + " " + data[0].fldLname;
                document.getElementById('dept').innerHTML = data[0].fldDepartment;
            });
  });
