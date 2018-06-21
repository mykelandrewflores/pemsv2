 var myUrl = "http://localhost"; 
 M.AutoInit();
 $(document).ready(function(){
 	$('.sidenav').sidenav();
 });
 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal({
    	dismissible: false
    });

    $.getJSON(myUrl+"/myapi/select/tbl_user/fldUserID/" + localStorage.userID, function(data) {
    	document.getElementById('name').innerHTML = data[0].fldFname + " " + data[0].fldLname;
    	document.getElementById('dept').innerHTML = data[0].fldDepartment;
    });
});
