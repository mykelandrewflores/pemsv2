 var myUrl = "http://localhost";

 $(document).ready(function(){
 	$('.modal').modal();
 	M.AutoInit();
  	$('.sidenav').sidenav();
  	$('.dropdown-trigger').dropdown({
  		constrainWidth:false
  	});
  	 $('select').formSelect();
  });


