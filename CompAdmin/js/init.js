 var myUrl = "http://localhost";
 function mySidenav(x) {
 	if (x.matches) { 
 		$('header').removeClass('padded');
 		$('#toggle_header_sidenav').addClass('hide');
 		$('#comp_name_navbar').removeClass('hide');

 	} else {
 		$('header').addClass('padded');
 		$('#toggle_header_sidenav').removeClass('hide');
 		$('#comp_name_navbar').addClass('hide');
 	}
 }
 var x = window.matchMedia("(max-width: 989px)")
 mySidenav(x) 
 x.addListener(mySidenav)

 $(document).ready(function(){
 	$('.modal').modal();
 	M.AutoInit();
 	$('.sidenav').sidenav();
 	$('.dropdown-trigger').dropdown({
 		constrainWidth:false
 	});
 	$('select').formSelect();
 });


