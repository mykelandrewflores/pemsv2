 var myUrl = "http://localhost";

 $(document).ready(function(){

 	M.AutoInit();
  	$('.sidenav').sidenav();	
  	$('.dropdown-trigger').dropdown({
  		constrainWidth:false
  	});
  	 $('select').formSelect();

  	 $.getJSON(myUrl+"/myapi/select/tbl_user/fldUserID/" + localStorage.userID, function(data) {
                document.getElementById('name').innerHTML = data[0].fldFname + " " + data[0].fldLname;
                document.getElementById('dept').innerHTML = data[0].fldDepartment;
            });
  });


