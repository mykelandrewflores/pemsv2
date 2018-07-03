
 var myUrl = "http://gordoncollegeccs-ssite.net/pems/apis";
 function mySidenav(x) {
 //var myUrl = "http://gordoncollegeccs-ssite.net";


function mySidenav(x) {
 	if (x.matches) { 
 		$('header').removeClass('padded');
 		$('#toggle_header_sidenav').addClass('hide');
 		$('#comp_name_navbar').removeClass('hide');
 		$('#comp_name_navbar').removeClass('hide');
 		$('.dtime-now').addClass('hide');
 	} else {
 		$('header').addClass('padded');
 		$('#toggle_header_sidenav').removeClass('hide');
 		$('.dtime-now').removeClass('hide');
 	}
 }



 var x = window.matchMedia("(max-width: 989px)")
 mySidenav(x) 
 x.addListener(mySidenav);
 setInterval(function() {
 	var x = new Date(); 
 	var hours = x.getHours(); 
 	var minutes = x.getMinutes();
 	var ampm = hours >= 12 ? 'PM' : 'AM';
 	hours = hours % 12;
 	hours = hours ? hours : 12;
 	minutes = minutes < 10 ? '0' + minutes : minutes;
 	$('.dtime-now').html(formDNow(new Date()) +' '+ hours + ':' + minutes + ampm);
 },1000);
 function formDNow(date) {
 	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 	var day = date.getDate();
 	var monthIndex = date.getMonth(); 
 	var year = date.getFullYear();
 	var date = new Date(date * 1000);
 	return monthNames[monthIndex] + ' ' + day + ', ' + year;
 }
 $(document).ready(function(){
 	$('.modal').modal({
 		dismissible: false
 	});
 	M.AutoInit();
 	$('.sidenav').sidenav();
 	$('.dropdown-trigger').dropdown({
 		constrainWidth:false
 	});
 	$('select').formSelect();
 });
function userLoginCheck(){
    if(localStorage.userID == null){
        window.location.assign("../../index.html");
    }
}




//EDIT DELETE EMPLOYEE --END--
function logOut() {
    localStorage.removeItem("userID");
    localStorage.removeItem("companyID");
    window.location.assign("../../index.html");
}


