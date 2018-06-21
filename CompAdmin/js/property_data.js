
let myurl = "http://localhost/pems/apis";

function setselected(prodid){
	localStorage.setItem("selected_id",prodid);
}

function setselected_reqofficer(prodid){
	localStorage.setItem("selected_id_reqofficer",prodid);
}

function equiptable(){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_equipment";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
			longstring += "<tr>";
			longstring += "<td>"+data[i].fldProdID+"</td>";
			longstring += "<td>"+data[i].fldProdName+"</td>";
			longstring += "<td>"+data[i].fldQty+"</td>";
			longstring += "<td class=''><a class='btn blue darken-3 btn-spacing-ni-jags' href='./propertycard.html?prodid="+data[i].fldProdID+"' onclick='setselected("+data[i].fldProdID+")'>property card</a> </td>";
			longstring += "</tr>";
			}
			$("#equiptabledata").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function equiptable_reqofficer(){

	$(function(){

		url=myurl+"/propertycard/propertyapi/tbl_equipment";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
			longstring += "<tr>";
			longstring += "<td>"+data[i].fldProdID+"</td>";
			longstring += "<td>"+data[i].fldProdName+"</td>";
			longstring += "<td>"+data[i].fldQty+"</td>";
			longstring += "<td class=''><a class='btn blue darken-3 btn-spacing-ni-jags' href='./propertycard_reqofficer.html' onclick='setselected_reqofficer("+data[i].fldProdID+")'>property card</a></td>";
			longstring += "</tr>";
			}
			$("#equiptabledata_reqofficer").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function pcdata(){
	$(function(){

		url=myurl+"/propertycard/propertyapi/duration/tbl_equipment/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id");
		
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

		url=myurl+"/propertycard/propertyapi/duration/tbl_equipment/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id_reqofficer");
		
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

		url=myurl+"/propertycard/propertyapi/duration/tbl_equipment/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id");
		
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

		url=myurl+"/propertycard/propertyapi/duration/tbl_equipment/tbl_property/fldProdID/fldPNum/"+localStorage.getItem("selected_id_reqofficer");
		
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

	let fldProdName = document.getElementById("equip_name").value;
	let fldDesc = document.getElementById("equip_desc").value;
	let fldQty = document.getElementById("equip_qty").value;
	let tblname = "tbl_equipment";
	let update_action = "add_equipment";

	/*console.log(uploadFile);*/

	$.post(myurl+"/propertycard/propertyapi/create",{tblname:tblname,fldProdName:fldProdName,fldDesc:fldDesc,fldQty:fldQty,update_action:update_action},function(data){
		M.toast({html: 'Equipment Added'});
		document.getElementById("equip_name").value="";
 		document.getElementById("equip_desc").value="";
		document.getElementById("equip_qty").value="";
		equiptable();
	}).fail(function(){
		M.toast({html: 'Equipment Add Failed'})
	});

	
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

