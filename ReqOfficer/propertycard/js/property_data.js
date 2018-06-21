
let myurl = "http://localhost/pems/apis";

function setselected(prodid){
	localStorage.setItem("selected_id",prodid);
}

function setselected_reqofficer(prodid){
	localStorage.setItem("selected_id_reqofficer",prodid);
}

function equiptable(){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_lccalives_all/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td>"+data[i].fldRecID+"</td>";
				longstring += "<td>"+data[i].fldProdName+"</td>";
				longstring += "<td>"+data[i].fldDept+"</td>";
				longstring += "<td>"+data[i].fldRemarks+"</td>";
				if (data[i].fldRemarks == 'Assigned') {
					longstring += "<td class=''><a class='btn blue darken-3' href='./propertycard.html?prodid="+data[i].fldProdID+"' onclick='setselected("+data[i].fldProdID+")'><i class='fa fa-eye'></i></a> </td>";
					longstring += "<td class=''><a class='waves-effect waves-light right blue darken-3   btn modal-trigger' href='#modal3' onclick='transfer_tabledata("+data[i].fldRecID+")'><i class='fa fa-send left'></i>Transfer</a><br><br><a class='waves-effect waves-light right blue darken-3   btn modal-trigger' href='#modal4' onclick='disposal_tabledata("+data[i].fldRecID+")'><i class='fa fa-trash left'></i>Disposal</a></td>";
				}else{
					longstring += "<td class=''><a class='waves-effect waves-light right blue darken-3   btn modal-trigger' href='#modal2' onclick='assign_tabledata("+data[i].fldRecID+")'><i class='fa fa-plus left'></i>Assign</a></td>";
					longstring += "<td>- - -</td>";
				}
				
				longstring += "</tr>";
			}
			$("#equiptabledata").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function equiptable_assigned(){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/fldRemarks/Assigned";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td>"+data[i].fldRecID+"</td>";
				longstring += "<td>"+data[i].fldProdID+"</td>";
				longstring += "<td>"+data[i].fldProdName+"</td>";
				longstring += "<td>"+data[i].fldDept+"</td>";
				longstring += "<td class=''><a class='btn blue darken-3' href='./propertycard.html?prodid="+data[i].fldProdID+"' onclick='setselected("+data[i].fldProdID+")'><i class='fa fa-eye'></i></a> </td>";
				longstring += "</tr>";
			}
			$("#equiptabledata_assigned").html(longstring);

		}).fail(function(){
			M.toast({html: 'No Assigned Equipment/Property'});
		});
		
	});
}

function equiptable_unassigned(){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/fldRemarks/Unassigned";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td>"+data[i].fldRecID+"</td>";
				longstring += "<td>"+data[i].fldProdName+"</td>";
				longstring += "<td>"+data[i].fldIarNo+"</td>";
				longstring += "<td class=''><a class='waves-effect waves-light right blue darken-3   btn modal-trigger' href='#modal2' onclick='assign_tabledata("+data[i].fldRecID+")'><i class='fa fa-plus left'></i>Assign</a></td>";
				longstring += "</tr>";
			}
			if (data.length) {
				document.getElementById("newcount").innerHTML=data.length;
				M.toast({html: data.length+' New Unassigned Property/Equipment'})
			}else{
				document.getElementById("newcount").innerHTML=0;
			}
			
			$("#equiptabledata_unassigned").html(longstring);

		}).fail(function(){
			M.toast({html: 'No Unassigned Equipment/Property'});
		});
		
	});
}

function equiptable_reqofficer(){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_lccalives_all/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				if (data[i].fldCompanyID == localStorage.companyID) {
					longstring += "<tr>";
					longstring += "<td>"+data[i].fldProdID+"</td>";
					longstring += "<td>"+data[i].fldProdName+"</td>";
					longstring += "<td>"+data[i].fldQty+"</td>";
					longstring += "<td class=''><a class='btn blue darken-3 btn-spacing-ni-jags' href='./propertycard.html' onclick='setselected_reqofficer("+data[i].fldProdID+")'>property card</a></td>";
					longstring += "</tr>";
				}
			
			}
			$("#equiptabledata_reqofficer").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found in Requisitioning");
		});
		
	});
}

function assign_tabledata(recID){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+recID;
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td id='assign_recid'>"+data[i].fldRecID+"</td>";
				longstring += "<td id='assign_prodname'>"+data[i].fldProdName+"</td>";
				longstring += "<td id='assign_dept'>"+data[i].fldDept+"</td>";
				longstring += "<td id='assign_recqty'>"+data[i].fldRecQty+"</td>";
				longstring += "</tr>";
			
			}
			$("#assign_table").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function transfer_tabledata(recID){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+recID;
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td id='transfer_recid'>"+data[i].fldRecID+"</td>";
				longstring += "<td id='assign_prodname'>"+data[i].fldProdName+"</td>";
				longstring += "<td id='assign_dept'>"+data[i].fldDept+"</td>";
				longstring += "<td id='assign_recqty'>"+data[i].fldRecQty+"</td>";
				longstring += "</tr>";
			

			}
			$("#transfer_table").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function disposal_tabledata(recID){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+recID;
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td id='disposal_recid'>"+data[i].fldRecID+"</td>";
				longstring += "<td id='assign_prodname'>"+data[i].fldProdName+"</td>";
				longstring += "<td id='assign_dept'>"+data[i].fldDept+"</td>";
				longstring += "<td id='assign_recqty'>"+data[i].fldRecQty+"</td>";
				longstring += "</tr>";
			

			}
			$("#disposal_table").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function fetch_lccaprod(){
	url=myurl+"/propertycard/propertyapi/tbl_lccalives";
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="lccaprod_select"> <option value="" disabled selected>Choose Product Name</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldProdID+'">'+data[i].fldProdName+'</option>';
			}
			body+='</select>';
			$('#prodlcca_select').html(body);


		}).fail(function(){
			M.toast({html: 'No lcca data found'});
		});
}
function fetch_lccadepartments(){
	url=myurl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="lccadept_select"> <option value="" disabled selected>Choose Department</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldDepartmentName+'">'+data[i].fldDepartmentName+'</option>';
			}
			body+='</select>';
			$('#deptlcca_select').html(body);


		}).fail(function(){
			M.toast({html: 'No deparments found'});
		});
}

function fetch_departments(){
	url=myurl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="department_select"> <option value="" disabled selected>Choose Department</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldDepartmentName+'">'+data[i].fldDepartmentName+'</option>';
			}
			body+='</select>';
			$('#testing').html(body);


		}).fail(function(){
			M.toast({html: 'No deparments found'});
		});
}
function fetch_departments2(){
	url=myurl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="department_select2"> <option value="" disabled selected>Choose Department</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldDepartmentName+'">'+data[i].fldDepartmentName+'</option>';
			}
			body+='</select>';
			$('#testing2').html(body);


		}).fail(function(){
			M.toast({html: 'No deparments found'});
		});
}
function fetch_departments3(){
	url=myurl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="department_select3"> <option value="" disabled selected>Choose Department</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldDepartmentName+'">'+data[i].fldDepartmentName+'</option>';
			}
			body+='</select>';
			$('#testing3').html(body);


		}).fail(function(){
			M.toast({html: 'No deparments found'});
		});
}

function assign_func(){
	let fldRecID = document.getElementById("assign_recid").innerHTML;
	let fldTDQty = 1;
	let fldDept = document.getElementById("department_select").value;
	let fldRemarks = "Assigned";
	let tblname = "tbl_property";
	let update_action = "update_propertydata";

	$.post(myurl+"/propertycard/propertyapi/update",{tblname:tblname,update_action:update_action,fldRecID:fldRecID,fldTDQty:fldTDQty,fldRemarks:fldRemarks,fldDept:fldDept},function(data){
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
		M.toast({html: 'Equipment/Property Assigned'});
		$('.modal').modal('close');
	}).fail(function(){
		M.toast({html: 'Equipment/Property Assigning Failed'})
	});
}

function transfer_func(){
	let fldRecID = document.getElementById("transfer_recid").innerHTML;
	let fldTDQty = 1;
	let fldDept = document.getElementById("department_select2").value;
	let fldRemarks = "Assigned";
	let tblname = "tbl_property";
	let update_action = "update_propertydata";

	let urllog=myurl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+fldRecID;
	let log_fldRecID = "";
	let log_fldIarNo = "";
	let log_fldPNum = "";
	let log_fldAgency = "";
	let log_fldDept = "";
	let log_fldDate = "";
	let log_fldRefNo = "";
	let log_fldRecQty = "";
	let log_fldTDQty = "";
	let log_fldRemarks = "";
	let log_fldAction = "Transfer";
	let log_fldFromDept = "";
	let log_tblname = "tbl_property_dispose";
	$.getJSON(urllog,function(data){
		for (let i = 0; i < data.length; i++) {
			log_fldRecID = data[i].fldRecID;
			log_fldIarNo = data[i].fldIarNo;
			log_fldPNum = data[i].fldPNum;
			log_fldAgency = data[i].fldAgency;
			log_fldDept = data[i].fldDept;
			log_fldDate = data[i].fldDate;
			log_fldRefNo = data[i].fldRefNo;
			log_fldRecQty = data[i].fldRecQty;
			log_fldTDQty = data[i].fldTDQty;
			log_fldRemarks = data[i].fldRemarks;
			log_fldFromDept = data[i].fldDept;
			// console.log(data[i].fldRecID);
		}
		console.log(log_fldRecID);
		$.post(myurl+"/propertycard/propertyapi/create",{tblname:log_tblname,log_fldRecID:log_fldRecID,log_fldIarNo:log_fldIarNo,log_fldPNum:log_fldPNum,log_fldAgency:log_fldAgency,log_fldDept:log_fldDept,log_fldDate:log_fldDate,log_fldRefNo:log_fldRefNo,log_fldRecQty:log_fldRecQty,log_fldTDQty:log_fldTDQty,log_fldRemarks:log_fldRemarks,log_fldAction:log_fldAction,log_fldFromDept:log_fldFromDept},function(data){

		}).fail(function(){
			M.toast({html: 'Equipment/Property Transfer log Failed'})
		});
	}).fail(function(){
		window.alert("No Equipment Found");
	});



	$.post(myurl+"/propertycard/propertyapi/update",{tblname:tblname,update_action:update_action,fldRecID:fldRecID,fldTDQty:fldTDQty,fldRemarks:fldRemarks,fldDept:fldDept},function(data){
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
		M.toast({html: 'Equipment/Property Transfered'});
		$('.modal').modal('close');
	}).fail(function(){
		M.toast({html: 'Equipment/Property Transfered Failed'})
	});



}

function disposal_func(){
	let fldRecID = document.getElementById("disposal_recid").innerHTML;
	let fldTDQty = document.getElementById("disposal_qty").value;
	let fldDept = document.getElementById("department_select3").value;
	let fldRemarks = "Unassigned";
	let tblname = "tbl_property";
	let update_action = "update_propertydata";

	let urllog=myurl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccalives/tbl_property/fldProdID/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+fldRecID;
	let log_fldRecID = "";
	let log_fldIarNo = "";
	let log_fldPNum = "";
	let log_fldAgency = "";
	let log_fldDept = "";
	let log_fldDate = "";
	let log_fldRefNo = "";
	let log_fldRecQty = "";
	let log_fldTDQty = "";
	let log_fldRemarks = "";
	let log_fldAction = "Dispose";
	let log_fldFromDept = "";
	let log_tblname = "tbl_property_dispose";
	$.getJSON(urllog,function(data){
		for (let i = 0; i < data.length; i++) {
			log_fldRecID = data[i].fldRecID;
			log_fldIarNo = data[i].fldIarNo;
			log_fldPNum = data[i].fldPNum;
			log_fldAgency = data[i].fldAgency;
			log_fldDept = data[i].fldDept;
			log_fldDate = data[i].fldDate;
			log_fldRefNo = data[i].fldRefNo;
			log_fldRecQty = data[i].fldRecQty;
			log_fldTDQty = data[i].fldTDQty;
			log_fldRemarks = data[i].fldRemarks;
			log_fldFromDept = data[i].fldDept;
			// console.log(data[i].fldRecID);
		}
		console.log(log_fldRecID);
		$.post(myurl+"/propertycard/propertyapi/create",{tblname:log_tblname,log_fldRecID:log_fldRecID,log_fldIarNo:log_fldIarNo,log_fldPNum:log_fldPNum,log_fldAgency:log_fldAgency,log_fldDept:log_fldDept,log_fldDate:log_fldDate,log_fldRefNo:log_fldRefNo,log_fldRecQty:log_fldRecQty,log_fldTDQty:log_fldTDQty,log_fldRemarks:log_fldRemarks,log_fldAction:log_fldAction,log_fldFromDept:log_fldFromDept},function(data){

		}).fail(function(){
			M.toast({html: 'Equipment/Property Transfer log Failed'})
		});
	}).fail(function(){
		window.alert("No Equipment Found");
	});

	$.post(myurl+"/propertycard/propertyapi/update",{tblname:tblname,update_action:update_action,fldRecID:fldRecID,fldTDQty:fldTDQty,fldRemarks:fldRemarks,fldDept:fldDept},function(data){
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
		M.toast({html: 'Equipment/Property disposed'});
		$('.modal').modal('close');
	}).fail(function(){
		M.toast({html: 'Equipment/Property disposed Failed'})
	});
}

function pcdata(){
	$(function(){

		url=myurl+"/propertycard/propertyapi/duration/tbl_lccalives/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id");
		
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

function pcdata_reqofficer(){
	$(function(){

		url=myurl+"/propertycard/propertyapi/duration/tbl_lccalives/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id_reqofficer");
		
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


function proptable(){

	$(function(){

		url=myurl+"/propertycard/propertyapi/duration/tbl_lccalives/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id");
		
		$.getJSON(url,function(data){
			let longstring = "";
			let sel_name = "";
			for (let i = 0; i < data.length; i++) {
			sel_name=data[i].fldProdName;
			longstring += "<tr>";
			longstring += "<td>"+data[i].fldRecID+"</td>";
			longstring += "<td>"+data[i].fldProdName+"</td>";
			longstring += "<td>"+data[i].fldDept+"</td>";
			longstring += "<td>"+data[i].fldDate+"</td>";
			longstring += "<td class=''><a class='btn red darken-3' onclick='DeletePropData("+data[i].fldRecID+")'><i class='fa fa-trash'></i></a></td>";
			longstring += "</tr>";
			}
			document.getElementById("sel_name").innerHTML=sel_name;
			$("#proptabledata").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function proptable_reqofficer(){

	$(function(){

		url=myurl+"/propertycard/propertyapi/duration/tbl_lccalives/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id_reqofficer");
		
		$.getJSON(url,function(data){
			let longstring = "";
			let sel_name = "";
			for (let i = 0; i < data.length; i++) {
			sel_name=data[i].fldProdName;
			longstring += "<tr>";
			longstring += "<td>"+data[i].fldRecID+"</td>";
			longstring += "<td>"+data[i].fldProdName+"</td>";
			longstring += "<td>"+data[i].fldDept+"</td>";
			longstring += "<td>"+data[i].fldDate+"</td>";
			longstring += "</tr>";
			}
			document.getElementById("sel_name").innerHTML=sel_name;
			$("#proptabledata_reqofficer").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function viewemparchivetable(){

	$(function(){

		url=myurl+"/_mismodule_v2.0/db/emptable/tblemployees_archive/tblemployeetype/fldPositionID/fldPositionID/fldPositionName";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
			longstring += "<tr>";
			longstring += "<td>"+data[i].fldEmployeeID+"</td>";
			longstring += "<td>"+data[i].fldLname+"</td>";
			longstring += "<td>"+data[i].fldFname+"</td>";
			longstring += "<td>"+data[i].fldPositionName+"</td>";
			longstring += "<td>"+data[i].fldDateStarted+"</td>";
			longstring += "<td>"+data[i].fldStatus+"</td>";
			longstring += "<td><a class='btn  btn-primary btn-rounded btn-sm' onclick='RetrieveEmpData("+data[i].fldEmployeeID+")'>RETRIEVE</a></td>";
			longstring += "</tr>";
			}
			$("#emparchivetabledata").html(longstring);

		}).fail(function(){
			window.alert("Nothing asdasdFound");
		});
		
	});
}

function viewuseraccessleveltable(){

	$(function(){

		url=myurl+"/_mismodule_v2.0/db/UACtable/tblemployees/tblemployeetype/tblmodule/fldPositionID/fldPositionID/fldModuleID/fldPositionName/fldModuleName";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
			longstring += "<tr>";
			longstring += "<td>"+data[i].fldEmployeeID+"</td>";
			longstring += "<td>"+data[i].fldLname+"</td>";
			longstring += "<td>"+data[i].fldFname+"</td>";
			longstring += "<td>"+data[i].fldModuleName+"</td>";
			longstring += "<td>"+data[i].fldPositionName+"</td>";
			longstring += "<td><a class='btn  btn-primary btn-rounded btn-sm' data-toggle='modal' data-target='#uacmodal' onclick='fetchUACDetails("+data[i].fldEmployeeID+")'>EDIT</a></td>";
			longstring += "</tr>";
			}
			$("#useraccessleveltable").html(longstring);

		}).fail(function(){
			window.alert("Nothing asdasdFound");
		});
		
	});
}

function fetchUACDetails(empid){

	$(function(){

		url=myurl+"/_mismodule_v2.0/db/UACtableView/tblemployees/tblemployeetype/tblmodule/fldPositionID/fldPositionID/fldModuleID/fldPositionName/fldModuleName/fldEmployeeID/"+empid;
		let fetched_empid = "";
		let fetched_moduleid = "";
		let fetched_positionid = "";
		let fetched_modulename = "";
		let fetched_positionname ="";
		let fetched_fname ="";
		let fethched_lname = "";
		let fetched_name = "";
		let fetched_username = "";
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				fetched_empid = data[i].fldEmployeeID;
				fetched_moduleid = data[i].fldModuleID;
				fetched_positionid = data[i].fldPositionID;
				fetched_modulename = data[i].fldModuleName;
				fetched_positionname = data[i].fldPositionName;
				fetched_name = data[i].fldLname + ", " + data[i].fldFname;
				fetched_username = data[i].fldUsername;
			}
			document.getElementById("disp_uac_username").innerHTML=fetched_username;
			document.getElementById("disp_uac_name").innerHTML=fetched_name;
			document.getElementById("disp_uac_dest").innerHTML=fetched_modulename;
			document.getElementById("disp_uac_pos").innerHTML=fetched_positionname;
			document.getElementById("uac_emp_id").value=fetched_empid;


		}).fail(function(){
			window.alert("Nothing asdasdFound");
		});
		
	});
}


function DeleteEquipData(equipid){

  $.post(myurl+"/propertycard/propertyapi/delete/tbl_equipment/"+equipid,function(data){
    M.toast({html: 'Equipment Deleted'});
    equiptable();
  }).fail(function(){

  	M.toast({html: 'Equipment Not Deleted'});

  });

}

function RetrieveEmpData(empid){

  $.post(myurl+"/_mismodule_v2.0/db/delete/tblemployees_archive/"+empid,function(data){
    window.alert("Data RETRIEVED");
    viewemparchivetable();
  }).fail(function(){

  	window.alert("Something Went Wrong!!!");

  });

}

    

function UpdateData(empid){

	let fname = document.getElementById("fname").value;
	let mname = document.getElementById("mname").value;
	let lname = document.getElementById("lname").value;
	let address = document.getElementById("address").value;
	let gender = document.getElementById("gender").value;
	let status = document.getElementById("status").value;
	let position = document.getElementById("position").value;
	let module_admin = document.getElementById("module_admin").value;
	let username = document.getElementById("username").value;
	let tblname = "tblemployees";
	let update_action = "update_employee";


	$.post(myurl+"/_mismodule_v2.0/db/update",{tblname:tblname,fldFname:fname,fldLname:lname,fldMname:mname,fldAddress:address,fldGender:gender,fldStatus:status,fldPositionID:position,fldModuleID:module_admin,fldUsername:username,fldEmployeeID:empid,update_action:update_action},function(data){
		toastr["success"]("Employee details are now updated.." );
		view_emp(empid);
	}).fail(function(){
		view_emp(empid);	
		toastr["error"]("Employee details are not updated.." );
	});

	
}




function AddEquipData(){

	let fldIarNo = "IAR00000";
	let fldAgency = localStorage.companyID;
	let fldPNum = document.getElementById("lccaprod_select").value;
	let fldDept = document.getElementById("lccadept_select").value;
	let fldRefNo = "INV0000-";
	let RecQty = document.getElementById("lccarecqty").value;
	let fldTDQty = 0;
	let fldRemarks = "Unassigned";
	let tblname = "tbl_property";

	for (let i = 0; i < RecQty; i++) {
		let fldRecQty = 1;
		$.post(myurl+"/propertycard/propertyapi/create",{tblname:tblname,fldIarNo:fldIarNo,fldAgency:fldAgency,fldPNum:fldPNum,fldDept:fldDept,fldRefNo:fldRefNo,fldRecQty:fldRecQty,fldTDQty:fldTDQty,fldRemarks:fldRemarks},function(data){

		}).fail(function(){
			M.toast({html: 'Property Add Failed'})
		});
	}
	M.toast({html: 'Property Added'});
	equiptable();
	equiptable_assigned();
	equiptable_unassigned();
}

function AddPropData(){

	let fldPNum = localStorage.getItem("selected_id");
	let fldAgency = document.getElementById("pc_agency").value;
	let fldDept = document.getElementById("pc_dept").value;
	let fldDate = document.getElementById("pc_date").value;
	let fldRefNo = document.getElementById("pc_refno").value;
	let fldRecQty = document.getElementById("pc_rcptqty").value;
	let fldTDQty = document.getElementById("pc_tdqty").value;
	let fldOffice = document.getElementById("pc_office").value;
	let fldBalQty = document.getElementById("pc_balqty").value;
	let tblname = "tbl_property";
	let update_action = "add_propertydata";

	/*console.log(uploadFile);*/

	$.post(myurl+"/propertycard/propertyapi/create",{tblname:tblname,fldPNum:fldPNum,fldAgency:fldAgency,fldDept:fldDept,fldDate:fldDate,fldRefNo:fldRefNo,fldRecQty:fldRecQty,fldTDQty:fldTDQty,fldOffice:fldOffice,fldBalQty:fldBalQty,update_action:update_action},function(data){
		M.toast({html: 'Equipment Added'});
		document.getElementById("equip_name").value="";
 		document.getElementById("equip_desc").value="";
		document.getElementById("equip_qty").value="";
		equiptable();
	}).fail(function(){
		M.toast({html: 'Equipment Add Failed'})
	});

	
}

function UpdateUACData(){

	let empid = document.getElementById("uac_emp_id").value;
	let moduleid = document.getElementById("input_moduleid").value;
	let positionid = document.getElementById("input_positionid").value;
	let username = document.getElementById("uac_emp_username").value;
	let password = document.getElementById("uac_emp_password").value;
	let tblname = "tblemployees";
	let update_action = ""
	

	if (moduleid == "" || positionid == "") {

		if (username !="" || password != "") {
			//UPDATE USERNAME AND PASSWORD
			update_action = "updateUAC_LOGIN";
			$.post(myurl+"/_mismodule_v2.0/db/update",{tblname:tblname,fldUsername:username,fldPassword:password,fldEmployeeID:empid,update_action:update_action},function(data){
				toastr["success"]("Employee Login Credentials are now updated.." );
				viewuseraccessleveltable();
				fetchUACDetails(empid);
				document.getElementById("uac_emp_username").value="";
				document.getElementById("uac_emp_password").value="";
			}).fail(function(){
				viewuseraccessleveltable();
				fetchUACDetails(empid);
				toastr["error"]("Employee Login Credentials are not updated.." );
			});
		}else{
			toastr["error"]("Please Check your Module and Position Selection, All Fields Are Required!");
		}

		
	}else{
		
		if (username == "" || password =="") {
			//UPDATE MODULE ID AND POSITION ID
			update_action = "updateUAC";
			$.post(myurl+"/_mismodule_v2.0/db/update",{tblname:tblname,fldModuleID:moduleid,fldPositionID:positionid,fldEmployeeID:empid,update_action:update_action},function(data){
				toastr["success"]("Employee UAC are now updated.." );
				document.getElementById("uac_emp_username").value="";
				document.getElementById("uac_emp_password").value="";
				viewuseraccessleveltable();
				fetchUACDetails(empid);
			}).fail(function(){
				viewuseraccessleveltable();
				fetchUACDetails(empid);
				toastr["error"]("Employee UAC are not updated.." );
			});
		}else{
			//UPDATE USERNAME, PASSWORD, MODULEID AND POSITIONID
			update_action = "updateUAC_LOGIN_ACCESSLEVEL";
			$.post(myurl+"/_mismodule_v2.0/db/update",{tblname:tblname,fldModuleID:moduleid,fldPositionID:positionid,fldUsername:username,fldPassword:password,fldEmployeeID:empid,update_action:update_action},function(data){
				toastr["success"]("Employee UAC and Login Credentials are now updated.." );
				document.getElementById("uac_emp_username").value="";
				document.getElementById("uac_emp_password").value="";
				viewuseraccessleveltable();
				fetchUACDetails(empid);
			}).fail(function(){
				viewuseraccessleveltable();
				fetchUACDetails(empid);
				toastr["error"]("Employee UAC and Login Credentials are not updated.." );
			});

		}

		
	}
	

	
}

