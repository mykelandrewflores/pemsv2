$(document).ready(function(){
	pcdata();
	Popup($('<div/>').append($('#mybody').clone()).html());

	function Popup(data){

    var mywindow = window.open('', '_blank');
    
    
    mywindow.document.write('<head><link rel="stylesheet" type="text/css" href="./css/pc_style.css"><link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet"></head>');
    mywindow.document.write('<body><div id="mybody">');
	mywindow.document.write('<div style="text-align: right;margin-right: 200px;"></div>');
    mywindow.document.write('<center><br><br><br><h1>Property Card</h1><br><br></center><center>');
   
   mywindow.document.write(data); 
   // mywindow.document.write('<center><img id="url" width="1000px" src='+localStorage.chartData+'><br><br><h2>Life Cycle Cost Analysis Chart Table Data</h2>'+data+'</center></div><center>');
    
    mywindow.document.write('</center>')

    mywindow.document.write('<script type="text/javascript" src="js/jquery.min.js">');
    mywindow.document.write('<script src="js/property_data.js"></script>');
    mywindow.document.write('<script>pcdata();</script>') 
    mywindow.document.write('<script type="text/javascript" src="js/jspdf.min.js"></script>');
    mywindow.document.write('<script type="text/javascript" src="js/printPdf.js"></script>');
    
    mywindow.document.write('');
    mywindow.document.write('</body></html>');
    mywindow.focus();
    
    return true; 
	}

function pcdata(){
	$(function(){

		url=myUrl+"/propertycard/propertyapi/duration/tbl_equipment/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id");
		
		$.getJSON(url,function(data){
			let longstring = "";
			let sel_name = "";
			let sel_desc ="";
			let sel_pnum  = "";
			let sel_dept = "";
			let sel_agncy = "";

			for (let i = 0; i < data.length; i++) {
			sel_name=data[i].fldProdName;
			sel_desc=data[i].fldDesc;
			sel_pnum=data[i].fldProdID;
			sel_dept=data[i].fldDept;
			sel_agncy=data[i].fldAgency;

			longstring += "<tr>";
			longstring += "<td>"+data[i].fldDate+"</td>";
			longstring += "<td>"+data[i].fldRefNo+"</td>";
			longstring += "<td>"+data[i].fldRecQty+"</td>";
			longstring += "<td>"+data[i].fldTDQty+"</td>";
			longstring += "<td>"+data[i].fldOffice+"</td>";
			longstring += "<td>"+data[i].fldBalQty+"</td>";
			longstring += "</tr>";
			}
			document.getElementById("propertyName").innerHTML=sel_name;
			document.getElementById("propertyDesc").innerHTML=sel_desc;
			document.getElementById("propertyNo").innerHTML=sel_pnum;
			document.getElementById("propertyDept").innerHTML=sel_dept;
			document.getElementById("propertyAgency").innerHTML=sel_agncy;
			$("#propertyList").html(longstring);

		}).fail(function(){
			window.alert("No data Found");
		});
		
	});
}
});
