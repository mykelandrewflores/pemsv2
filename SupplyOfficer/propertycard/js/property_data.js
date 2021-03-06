
function setselected(prodid,iarno,recid){
	localStorage.setItem("selected_id",prodid);
	localStorage.setItem("selected_iarno",iarno);
	localStorage.setItem("selected_recid",recid);
}

function setselected_reqofficer(prodid,iarno,recid){
	localStorage.setItem("selected_id_reqofficer",prodid);
	localStorage.setItem("selected_iarno_reqofficer",iarno);
	localStorage.setItem("selected_recid_reqofficer",recid);
}



function fetch_lccacateg(){
	url=myUrl+"/propertycard/propertyapi/lccacateg/tbl_lccalives";
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="lccacateg_search" class="browser-default"> <option value="" disabled selected>Product Category</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldPropertyCategory+'">'+data[i].fldPropertyCategory+'</option>';
			}
			body+='</select>';
			$('#search_lccacateg').html(body);


		}).fail(function(){
			M.toast({html: 'No lcca data found'});
		});
}
function fetch_lccadepartmentssearch(){
	url=myUrl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="lccadept_search" class="browser-default"> <option value="" disabled selected>Choose Department</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldDepartmentName+'">'+data[i].fldDepartmentName+'</option>';
			}
			body+='</select>';
			$('#search_lccadept').html(body);


		}).fail(function(){
			M.toast({html: 'No deparments found'});
		});
}
function fetch_lccaprod(){
	url=myUrl+"/propertycard/propertyapi/tbl_lccalives";
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="lccaprod_select" class="browser-default"> <option value="" disabled selected>Choose Product Name</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldStngNo+'">'+data[i].fldAssetType+'</option>';
			}
			body+='</select>';
			$('#prodlcca_select').html(body);


		}).fail(function(){
			M.toast({html: 'No lcca data found'});
		});
}
function fetch_lccadepartments(){
	url=myUrl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="lccadept_select" class="browser-default"> <option value="" disabled selected>Choose Department</option>';
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
	url=myUrl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="department_select" class="browser-default"> <option value="" disabled selected>Choose Department</option>';
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
	url=myUrl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="department_select2" class="browser-default"> <option value="" disabled selected>Choose Department</option>';
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
	url=myUrl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+localStorage.companyID;
	$.getJSON(url,function(data){
			var body = ''
			body+='<select id="department_select3" class="browser-default"> <option value="" disabled selected>Choose Department</option>';
			for(var i = 0; i<data.length; i++) {
				body+='<option value="'+data[i].fldDepartmentName+'">'+data[i].fldDepartmentName+'</option>';
			}
			body+='</select>';
			$('#testing3').html(body);


		}).fail(function(){
			M.toast({html: 'No deparments found'});
		});
}

function searchPC(){
	let search_dept = " ";
	let search_propname = " ";
	let search_categ = " ";

	search_dept = document.getElementById("lccadept_search").value;
	search_propname = document.getElementById("search_PropName").value;
 	search_categ = document.getElementById("lccacateg_search").value;

	if (search_dept == '' && search_categ == '') {
		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_searchpropname/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldBrand/"+search_propname;
	}else if(search_dept == ''){
		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_searchnamecateg/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldBrand/"+search_propname+"/fldAssetCateg/"+search_categ;
	}else if(search_categ == ''){		
		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_searchnamedept/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldBrand/"+search_propname+"/fldDept/"+search_dept;
	}else{
		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_searchall/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldBrand/"+search_propname+"/fldDept/"+search_dept+"/fldAssetCateg/"+search_categ;
	}
	$.getJSON(url,function(data){
		let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td>"+data[i].fldPcID+"</td>";
				longstring += "<td>"+data[i].fldBrand+"</td>";
				longstring += "<td>"+data[i].fldAssetType+"</td>";
				longstring += "<td>"+data[i].fldDept+"</td>";
				longstring += "<td>"+data[i].fldRemarks+"</td>";
				if (data[i].fldRemarks == 'Assigned') {
					longstring += "<td class=''><a class='blue-text darken-1' href='./propertycard.html?prodid="+data[i].fldStngNo+"' onclick='setselected("+data[i].fldStngNo+","+'"'+data[i].fldIarNo+'"'+","+data[i].fldRecID+")'><i class='fa fa-eye'></i></a> </td>";
					longstring += "<td class=''><a class='waves-effect waves-light blue-text darken-1 modal-trigger' href='#modal3' onclick='transfer_tabledata("+data[i].fldRecID+")'><i class='fa fa-send'></i></a> | <a class='waves-effect waves-light red-text darken-3  modal-trigger' href='#modal4' onclick='disposal_tabledata("+data[i].fldRecID+")'><i class='fa fa-trash'></i></a> | <a class='waves-effect waves-light red-text darken-3  modal-trigger' onclick='permaDelete("+data[i].fldRecID+")'><i class='fa fa-close'></i></a></td>";
				}else if(data[i].fldRemarks == 'Unassigned'){
					longstring += "<td class=''><a class='waves-effect waves-light  blue-text darken-3  modal-trigger' href='#modal2' onclick='assign_tabledata("+data[i].fldRecID+")'><i class='fa fa-plus'></i></a></td>";
					longstring += "<td><a class='waves-effect waves-light red-text darken-3  modal-trigger' onclick='permaDelete("+data[i].fldRecID+")'><i class='fa fa-close'></i></a></td>";
				}else if(data[i].fldRemarks == 'Dispose'){
					longstring += "<td class=''>- - -</td>";
					longstring += "<td><a class='waves-effect waves-light red-text darken-3  modal-trigger' onclick='permaDelete("+data[i].fldRecID+")'><i class='fa fa-close'></i></a></td>";
				}

				
				longstring += "</tr>";
			}
			$("#equiptabledata").html(longstring);
	}).fail(function(){
		M.toast({html: 'No Equipment/Property Found'});
	});
}

function searchPCreq(){
	let search_dept = " ";
	let search_propname = " ";
	let search_categ = " ";

	search_dept = document.getElementById("lccadept_search").value;
	search_propname = document.getElementById("search_PropName").value;
 	search_categ = document.getElementById("lccacateg_search").value;

	if (search_dept == '' && search_categ == '') {
		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_searchpropname/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldBrand/"+search_propname;
	}else if(search_dept == ''){
		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_searchnamecateg/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldBrand/"+search_propname+"/fldAssetCateg/"+search_categ;
	}else if(search_categ == ''){		
		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_searchnamedept/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldBrand/"+search_propname+"/fldDept/"+search_dept;
	}else{
		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_searchall/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldBrand/"+search_propname+"/fldDept/"+search_dept+"/fldAssetCateg/"+search_categ;
	}
	$.getJSON(url,function(data){
		let longstring = "";
			for (let i = 0; i < data.length; i++) {
				if (data[i].fldAgency == localStorage.companyID && data[i].fldDept == localStorage.userDept) {
					longstring += "<tr>";
					longstring += "<td>"+data[i].fldPcID+"</td>";
					longstring += "<td>"+data[i].fldBrand+"</td>";
					longstring += "<td>"+data[i].fldDept+"</td>";
					longstring += "<td>"+data[i].fldRemarks+"</td>";
					longstring += "<td class=''><a class='blue-text ni-jags' href='./propertycard.html' onclick='setselected_reqofficer("+data[i].fldStngNo+","+'"'+data[i].fldIarNo+'"'+","+data[i].fldRecID+")'><i class='fa fa-eye'></i></a></td>";
					longstring += "</tr>";
				}
			
			}
			$("#equiptabledata_reqofficer").html(longstring);
	}).fail(function(){
		M.toast({html: 'No Equipment/Property Found'});
	});
}

function equiptable(){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_all/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td>"+data[i].fldPcID+"</td>";
				longstring += "<td>"+data[i].fldBrand+"</td>";
				longstring += "<td>"+data[i].fldAssetType+"</td>";
				longstring += "<td>"+data[i].fldDept+"</td>";
				longstring += "<td>"+data[i].fldRemarks+"</td>";
				if (data[i].fldRemarks == 'Assigned') {
					longstring += "<td class=''><a class='blue-text darken-1' href='./propertycard.html?prodid="+data[i].fldStngNo+"' onclick='setselected("+data[i].fldStngNo+","+'"'+data[i].fldIarNo+'"'+","+data[i].fldRecID+")'><i class='fa fa-eye'></i></a> </td>";
					longstring += "<td class=''><a class='waves-effect waves-light blue-text darken-1 modal-trigger' href='#modal3' onclick='transfer_tabledata("+data[i].fldRecID+")'><i class='fa fa-send'></i></a> | <a class='waves-effect waves-light red-text darken-3  modal-trigger' href='#modal4' onclick='disposal_tabledata("+data[i].fldRecID+")'><i class='fa fa-trash'></i></a> | <a class='waves-effect waves-light red-text darken-3  modal-trigger' onclick='permaDelete("+data[i].fldRecID+")'><i class='fa fa-close'></i></a></td>";
				}else if(data[i].fldRemarks == 'Unassigned'){
					longstring += "<td class=''><a class='waves-effect waves-light  blue-text darken-3  modal-trigger' href='#modal2' onclick='assign_tabledata("+data[i].fldRecID+")'><i class='fa fa-plus'></i></a></td>";
					longstring += "<td><a class='waves-effect waves-light red-text darken-3  modal-trigger' onclick='permaDelete("+data[i].fldRecID+")'><i class='fa fa-close'></i></a></td>";
				}else if(data[i].fldRemarks == 'Dispose'){
					longstring += "<td class=''>- - -</td>";
					longstring += "<td><a class='waves-effect waves-light red-text darken-3  modal-trigger' onclick='permaDelete("+data[i].fldRecID+")'><i class='fa fa-close'></i></a></td>";
				}

				
				longstring += "</tr>";
			}
			document.getElementById("allcount").innerHTML=data.length;
			$("#equiptabledata").html(longstring);

		}).fail(function(){
			M.toast({html: 'No Equipment/Property Found'});
		});
		
	});
}

function appyear(compid){
	document.getElementById("CompName").innerHTML = localStorage.companyName;
	let longstring = "";
	let grandtotal = 0;
	let appbudget = 0;
	let inflation = 0;
	let urlDept = myUrl+"/propertycard/propertyapi/tbl_departments/fldCompanyID/"+compid;
	$.getJSON(urlDept,function(data){
		for (let i = 0; i < data.length; i++) {
			url=myUrl+"/propertycard/propertyapi/appyear/"+compid+"/"+data[i].fldDepartmentName;
			$.getJSON(url,function(res){
				console.log(data[i].fldDepartmentName);
				longstring += "<tr>";
					longstring += "<td><b>"+data[i].fldDepartmentName+"</b>";
				for(let j = 0; j < res.length; j++){
					if (j >= 1) {
						longstring += "<td><p style='text-indent: 20px; margin: 4px; font-size: 13px;'><p style='text-indent: 20px; margin: 4px; font-size: 13px;'>"+res[j].fldPurpose+"</p></td>";
					}else{
						longstring += "<p style='text-indent: 20px; margin: 4px; font-size: 13px;'><p style='text-indent: 20px; margin: 4px; font-size: 13px;'>"+res[j].fldPurpose+"</p></td>";
					}
					
					longstring +="<td style=' font-size: 13px;'>"+res[j].fldModeOfProcurement+"</td>";
					longstring +="<td style=' font-size: 13px;'>"+res[j].fldPaymentTerm+"</td>";
					longstring +="<td align='right' style=' font-size: 13px;'>PHP "+(parseInt(res[j].fldTotalCost)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+"</td>";
					longstring +="<td align='right' style=' font-size: 13px;'>PHP "+(parseInt(res[j].fldTotalCost)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+"</td>";
					longstring +="<td style=' font-size: 13px;'></td>";
					console.log(res[j].fldPurpose);
					longstring += "</tr>";
					grandtotal += parseInt(res[j].fldTotalCost);
					inflation = parseInt(grandtotal * .10);
					appbudget = parseInt(grandtotal+inflation);
				}
			$("#propertyList").html(longstring);
			document.getElementById("grandtotal").innerHTML ="PHP "+ (parseInt(grandtotal)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			document.getElementById("inflation").innerHTML = "PHP "+ (parseInt(inflation)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			document.getElementById("appbudget").innerHTML = "PHP "+ (parseInt(appbudget)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			}).fail(function(){
				M.toast({html: 'No each PR data found'});
			});
		}

	}).fail(function(){
		M.toast({html: 'No PR data found'});
	});	
}

function equiptable_assigned(){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRemarks/Assigned";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td>"+data[i].fldPcID+"</td>";
				longstring += "<td>"+data[i].fldStngNo+"</td>";
				longstring += "<td>"+data[i].fldAssetType+"</td>";
				longstring += "<td>"+data[i].fldDept+"</td>";
				longstring += "<td class=''><a class='blue-text darken-3' href='./propertycard.html?prodid="+data[i].fldStngNo+"' onclick='setselected("+data[i].fldStngNo+","+'"'+data[i].fldIarNo+'"'+","+data[i].fldRecID+")'><i class='fa fa-eye'></i></a> </td>";
				longstring += "</tr>";
			}
			document.getElementById("asscount").innerHTML=data.length;
			$("#equiptabledata_assigned").html(longstring);

		}).fail(function(){
			// M.toast({html: 'No Assigned Equipment/Property'});
		});
		
	});
}

function equiptable_disposed(){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRemarks/Dispose";
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td>"+data[i].fldPcID+"</td>";
				longstring += "<td>"+data[i].fldStngNo+"</td>";
				longstring += "<td>"+data[i].fldAssetType+"</td>";
				longstring += "<td>"+data[i].fldDept+"</td>";
				longstring += "<td class=''><a class='waves-effect waves-light red-text darken-3  modal-trigger' onclick='permaDelete("+data[i].fldRecID+")'><i class='fa fa-close'></i></a></td>";
				longstring += "</tr>";
			}
			document.getElementById("dispcount").innerHTML=data.length;
			$("#equiptabledata_disposed").html(longstring);

		}).fail(function(){
			// M.toast({html: 'No Disposed Equipment/Property'});
		});
		
	});
}

function equiptable_unassigned(){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRemarks/Unassigned";


		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td>"+data[i].fldPcID+"</td>";
				longstring += "<td>"+data[i].fldAssetType+"</td>";
				longstring += "<td>"+data[i].fldIarNo+"</td>";
				longstring += "<td class=''><a class='waves-effect waves-light  green-text darken-3 modal-trigger' href='#modal2' onclick='assign_tabledata("+data[i].fldRecID+")'><i class='fa fa-plus left'></i></a></td>";
				longstring += "</tr>";

			}
			if (data.length) {
				$("#newcount").attr('class', 'new badge right red');
				document.getElementById("newcount").innerHTML=data.length;
				M.toast({html: data.length+' New Unassigned Property/Equipment'})
			}else{
			$("#newcount").attr('class', '');
			document.getElementById("newcount").innerHTML="";
			}
			
			$("#equiptabledata_unassigned").html(longstring);

		}).fail(function(){
			$("#newcount").attr('class', '');
			document.getElementById("newcount").innerHTML="";
			// M.toast({html: 'No Unassigned Equipment/Property'});
		});
		
	});
}

function equiptable_reqofficer(){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_all/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/";
		
		$.getJSON(url,function(data){
			let longstring = "";
			let cnt = 0;
			for (let i = 0; i < data.length; i++) {
				if (data[i].fldAgency == localStorage.companyID && data[i].fldDept == localStorage.userDept) {
					longstring += "<tr>";
					longstring += "<td>"+data[i].fldPcID+"</td>";
					longstring += "<td>"+data[i].fldBrand+"</td>";
					longstring += "<td>"+data[i].fldDept+"</td>";
					longstring += "<td>"+data[i].fldRemarks+"</td>";
					longstring += "<td class=''><a class='blue-text ni-jags' href='./propertycard.html' onclick='setselected_reqofficer("+data[i].fldStngNo+","+'"'+data[i].fldIarNo+'"'+","+data[i].fldRecID+")'><i class='fa fa-eye'></i></a></td>";
					longstring += "</tr>";
					cnt++;
				}
			
			}
			document.getElementById("allcount").innerHTML=cnt;
			$("#equiptabledata_reqofficer").html(longstring);

		}).fail(function(){
			M.toast({html: 'No Equipment/Property Found'});
		});
		
	});
}

function equiptable_reqofficer_assigned(){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRemarks/Assigned";
		
		$.getJSON(url,function(data){
			let longstring = "";
			let cnt = 0;
			for (let i = 0; i < data.length; i++) {
				if (data[i].fldAgency == localStorage.companyID && data[i].fldDept == localStorage.userDept) {
					longstring += "<tr>";
					longstring += "<td>"+data[i].fldPcID+"</td>";
					longstring += "<td>"+data[i].fldBrand+"</td>";
					longstring += "<td>"+data[i].fldDept+"</td>";
					longstring += "<td>"+data[i].fldRemarks+"</td>";
					longstring += "<td class=''><a class='blue-text ni-jags' href='./propertycard.html' onclick='setselected_reqofficer("+data[i].fldStngNo+","+'"'+data[i].fldIarNo+'"'+","+data[i].fldRecID+")'><i class='fa fa-eye'></i></a></td>";
					longstring += "</tr>";
					cnt++;
				}
			
			}
			document.getElementById("asscount").innerHTML=cnt;
			$("#reqequiptabledata_assigned").html(longstring);

		}).fail(function(){

		});
		
	});
}

function equiptable_reqofficer_unassigned(){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRemarks/Unassigned";
		
		$.getJSON(url,function(data){
			let longstring = "";
			let cnt = 0;
			for (let i = 0; i < data.length; i++) {
				if (data[i].fldAgency == localStorage.companyID && data[i].fldDept == localStorage.userDept) {
					longstring += "<tr>";
					longstring += "<td>"+data[i].fldPcID+"</td>";
					longstring += "<td>"+data[i].fldBrand+"</td>";
					longstring += "<td>"+data[i].fldDept+"</td>";
					longstring += "<td>"+data[i].fldRemarks+"</td>";
					longstring += "<td class=''><a class='blue-text ni-jags' href='./propertycard.html' onclick='setselected_reqofficer("+data[i].fldStngNo+","+'"'+data[i].fldIarNo+'"'+","+data[i].fldRecID+")'><i class='fa fa-eye'></i></a></td>";
					longstring += "</tr>";
					cnt++;
				}
			
			}if (data.length) { 
				$("#newcount").attr('class', 'new badge right red');
				document.getElementById("newcount").innerHTML=data.length;
				M.toast({html: data.length+' New Unassigned Property/Equipment'})
			}else{
			$("#newcount").attr('class', '');
			document.getElementById("newcount").innerHTML="";
			}
			$("#reqequiptabledata_unassigned").html(longstring);

		}).fail(function(){
			$("#newcount").attr('class', '');
			document.getElementById("newcount").innerHTML="";
		});
		
	});
}

function assign_tabledata(recID){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+recID;
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td id='assign_recid'>"+data[i].fldRecID+"</td>";
				longstring += "<td id='assign_prodname'>"+data[i].fldAssetType+"</td>";
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

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+recID;
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td id='transfer_recid'>"+data[i].fldRecID+"</td>";
				longstring += "<td id='assign_prodname'>"+data[i].fldAssetType+"</td>";
				longstring += "<td id='assign_dept'>"+data[i].fldDept+"</td>";
				longstring += "<td id='assign_recqty'>"+data[i].fldRecQty+"</td>";
				longstring += "</tr>";
			

			}
			$("#transfer_table").html(longstring);
			fetch_departments2();

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}
function disposal_tabledata(recID){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+recID;
		
		$.getJSON(url,function(data){
			let longstring = "";
			for (let i = 0; i < data.length; i++) {
				longstring += "<tr>";
				longstring += "<td id='disposal_recid'>"+data[i].fldRecID+"</td>";
				longstring += "<td id='assign_prodname'>"+data[i].fldAssetType+"</td>";
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


function assign_func(){
	let fldRecID = document.getElementById("assign_recid").innerHTML;
	let fldTDQty = 1;
	let fldDept = document.getElementById("department_select").value;
	let fldRemarks = "Assigned";
	let tblname = "tbl_property";
	let update_action = "update_propertydata";

	let urllog=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+fldRecID;
	let log_fldRecID = "";
	let log_fldIarNo = "";
	let log_fldPNum = "";
	let log_fldBrand = "";
	let log_fldAgency = "";
	let log_fldDept = "";
	let log_fldDate = "";
	let log_fldRefNo = "";
	let log_fldRecQty = "";
	let log_fldTDQty = "";
	let log_fldRemarks = "";
	let log_fldAction = "Transfer";
	let log_fldFromDept = "";
	let log_fldToDept = fldDept;
	let log_tblname = "tbl_property_dispose";
	$.getJSON(urllog,function(data){
		for (let i = 0; i < data.length; i++) {
			log_fldRecID = data[i].fldRecID;
			log_fldIarNo = data[i].fldIarNo;
			log_fldPNum = data[i].fldPNum;
			log_fldBrand = data[i].fldBrand;
			log_fldAgency = data[i].fldAgency;
			log_fldDept = data[i].fldDept;
			log_fldDate = data[i].fldDate;
			log_fldRefNo = data[i].fldRefNo;
			log_fldRecQty = data[i].fldRecQty;
			log_fldTDQty = data[i].fldTDQty;
			log_fldRemarks = data[i].fldRemarks;
			log_fldFromDept = data[i].fldDept;
			log_fldToDept = log_fldToDept;
		}
		console.log(log_fldRecID);
		$.post(myUrl+"/propertycard/propertyapi/create",{tblname:log_tblname,log_fldRecID:log_fldRecID,log_fldIarNo:log_fldIarNo,log_fldPNum:log_fldPNum,log_fldBrand:log_fldBrand,log_fldAgency:log_fldAgency,log_fldDept:log_fldDept,log_fldDate:log_fldDate,log_fldRefNo:log_fldRefNo,log_fldRecQty:log_fldRecQty,log_fldTDQty:log_fldTDQty,log_fldRemarks:log_fldRemarks,log_fldAction:log_fldAction,log_fldFromDept:log_fldFromDept,log_fldToDept:log_fldToDept},function(data){

		}).fail(function(){
			M.toast({html: 'Equipment/Property Transfer log Failed'})
		});
	}).fail(function(){
		window.alert("No Equipment Found");
	});

	$.post(myUrl+"/propertycard/propertyapi/update",{tblname:tblname,update_action:update_action,fldRecID:fldRecID,fldTDQty:fldTDQty,fldRemarks:fldRemarks,fldDept:fldDept},function(data){
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
		M.toast({html: 'Equipment/Property Assigned'});
		$('.modal').modal('close');
	}).fail(function(){
		M.toast({html: 'Equipment/Property Assigning '});
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
$('.modal').modal('close');
	});
}

function transfer_func(){
	let fldRecID = document.getElementById("transfer_recid").innerHTML;
	let fldTDQty = 1;
	let fldDept = document.getElementById("department_select2").value;
	let fldRemarks = "Assigned";
	let tblname = "tbl_property";
	let update_action = "update_propertydata";

	let urllog=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+fldRecID;
	let log_fldRecID = "";
	let log_fldIarNo = "";
	let log_fldPNum = "";
	let log_fldBrand = "";
	let log_fldAgency = "";
	let log_fldDept = "";
	let log_fldDate = "";
	let log_fldRefNo = "";
	let log_fldRecQty = "";
	let log_fldTDQty = "";
	let log_fldRemarks = "";
	let log_fldAction = "Transfer";
	let log_fldFromDept = "";
	let log_fldToDept = fldDept;
	let log_tblname = "tbl_property_dispose";
	$.getJSON(urllog,function(data){
		for (let i = 0; i < data.length; i++) {
			log_fldRecID = data[i].fldRecID;
			log_fldIarNo = data[i].fldIarNo;
			log_fldPNum = data[i].fldPNum;
			log_fldBrand = data[i].fldBrand;
			log_fldAgency = data[i].fldAgency;
			log_fldDept = data[i].fldDept;
			log_fldDate = data[i].fldDate;
			log_fldRefNo = data[i].fldRefNo;
			log_fldRecQty = data[i].fldRecQty;
			log_fldTDQty = data[i].fldTDQty;
			log_fldRemarks = data[i].fldRemarks;
			log_fldFromDept = data[i].fldDept;
			log_fldToDept = log_fldToDept;
		}

		$.post(myUrl+"/propertycard/propertyapi/create",{tblname:log_tblname,log_fldRecID:log_fldRecID,log_fldIarNo:log_fldIarNo,log_fldPNum:log_fldPNum,log_fldBrand:log_fldBrand,log_fldAgency:log_fldAgency,log_fldDept:log_fldDept,log_fldDate:log_fldDate,log_fldRefNo:log_fldRefNo,log_fldRecQty:log_fldRecQty,log_fldTDQty:log_fldTDQty,log_fldRemarks:log_fldRemarks,log_fldAction:log_fldAction,log_fldFromDept:log_fldFromDept,log_fldToDept:log_fldToDept},function(data){

		}).fail(function(){
			M.toast({html: 'Equipment/Property Transfer log Failed'})
		});

	}).fail(function(){
		window.alert("No Equipment Found");
	});



	$.post(myUrl+"/propertycard/propertyapi/update",{tblname:tblname,update_action:update_action,fldRecID:fldRecID,fldTDQty:fldTDQty,fldRemarks:fldRemarks,fldDept:fldDept},function(data){
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
		M.toast({html: 'Equipment/Property Transfered'});
		$('.modal').modal('close');
	}).fail(function(){
		M.toast({html: 'Equipment/Property Transfered '});
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
		$('.modal').modal('close');
	});
}

function disposal_func(){
	let fldRecID = document.getElementById("disposal_recid").innerHTML;
	let fldTDQty = 1;
	let fldDept = document.getElementById("department_select3").value;
	let fldRemarks = "Dispose";
	let tblname = "tbl_property";
	let update_action = "update_propertydata";

	let urllog=myUrl+"/propertycard/propertyapi/tbl_lccalives_filter/tbl_lccasset/tbl_property/fldStngNo/fldPNum/fldAgency/"+localStorage.companyID+"/fldRecID/"+fldRecID;
	let log_fldRecID = "";
	let log_fldIarNo = "";
	let log_fldPNum = "";
	let log_fldBrand = "";
	let log_fldAgency = "";
	let log_fldDept = "";
	let log_fldDate = "";
	let log_fldRefNo = "";
	let log_fldRecQty = "";
	let log_fldTDQty = "";
	let log_fldRemarks = "";
	let log_fldAction = "Dispose";
	let log_fldFromDept = "";
	let log_fldToDept = fldDept;
	let log_tblname = "tbl_property_dispose";
	$.getJSON(urllog,function(data){
		for (let i = 0; i < data.length; i++) {
			log_fldRecID = data[i].fldRecID;
			log_fldIarNo = data[i].fldIarNo;
			log_fldPNum = data[i].fldPNum;
			log_fldBrand = data[i].fldBrand;
			log_fldAgency = data[i].fldAgency;
			log_fldDept = data[i].fldDept;
			log_fldDate = data[i].fldDate;
			log_fldRefNo = data[i].fldRefNo;
			log_fldRecQty = data[i].fldRecQty;
			log_fldTDQty = data[i].fldTDQty;
			log_fldRemarks = data[i].fldRemarks;
			log_fldFromDept = data[i].fldDept;
			log_fldToDept = log_fldToDept;
		}
		console.log(log_fldRecID);

		$.post(myUrl+"/propertycard/propertyapi/create",{tblname:log_tblname,log_fldRecID:log_fldRecID,log_fldIarNo:log_fldIarNo,log_fldPNum:log_fldPNum,log_fldBrand:log_fldBrand,log_fldAgency:log_fldAgency,log_fldDept:log_fldDept,log_fldDate:log_fldDate,log_fldRefNo:log_fldRefNo,log_fldRecQty:log_fldRecQty,log_fldTDQty:log_fldTDQty,log_fldRemarks:log_fldRemarks,log_fldAction:log_fldAction,log_fldFromDept:log_fldFromDept,log_fldToDept:log_fldToDept},function(data){

		}).fail(function(){
			M.toast({html: 'Equipment/Property Transfer log Failed'})
		});
		
	}).fail(function(){
		window.alert("No Equipment Found");
	});

	$.post(myUrl+"/propertycard/propertyapi/update",{tblname:tblname,update_action:update_action,fldRecID:fldRecID,fldTDQty:fldTDQty,fldRemarks:fldRemarks,fldDept:fldDept},function(data){
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
		M.toast({html: 'Equipment/Property disposed'});
		$('.modal').modal('close');
	}).fail(function(){
		M.toast({html: 'Equipment/Property disposed '});
		equiptable();
		equiptable_assigned();
		equiptable_unassigned();
		$('.modal').modal('close');
	});
}

function permaDelete(recID){
	var r = confirm("Are you sure to permanently delete this record?");
	if (r == true) {
		$.post(myUrl+"/propertycard/propertyapi/delete/tbl_property/"+recID,function(data){
			M.toast({html: 'Property Deleted Permanently'});
		    equiptable();
		}).fail(function(){
// 			M.toast({html: 'Property Not Deleted'});
            M.toast({html: 'Property Deleteded Permanently'});
		    equiptable();
		});
	} else {

	}
}

function pcdata(){
			var url=myUrl+"/propertycard/propertyapi/where3and/tbl_property_dispose/tbl_lccasset/fldPNum/"+localStorage.selected_id+"/fldIarNo/"+localStorage.selected_iarno+"/fldRecID/"+localStorage.selected_recid+"/fldAgency/"+localStorage.companyID+"/fldStngNo";

	$(function(){
			let longstring = "";
			let sel_name = "";
			let sel_desc ="";
			let sel_pnum  = "";
			let sel_dept = "";
			let sel_agncy = "";

		$.getJSON(myUrl+"/propertycard/propertyapi/tbl_companies/fldCompanyID/"+localStorage.companyID,function(data){
			console.log(data);
			sel_agncy=data[0].fldCompanyName;	
			document.getElementById("propertyAgency").innerHTML=sel_agncy;
		});

		
		$.getJSON(url,function(data){
			console.log(data);

			for (let i = 0; i < data.length; i++) {
			sel_name=data[i].fldAssetType;
			sel_desc=data[i].fldAssetCateg;
			sel_pnum=data[i].fldRecID;
			sel_dept=data[i].fldDept;

			longstring += "<tr>";
			longstring += "<td>"+data[i].fldDate+"</td>";
			longstring += "<td>"+data[i].fldRefNo+"</td>";
			longstring += "<td>"+data[i].fldRecQty+"</td>";
			longstring += "<td>"+data[i].fldTDQty+"</td>";
			longstring += "<td>"+data[i].fldDept+"</td>";
			longstring += "</tr>";
			}
			document.getElementById("propertyName").innerHTML=sel_name;
			document.getElementById("propertyDesc").innerHTML=sel_desc;
			document.getElementById("propertyNo").innerHTML=sel_pnum;
			document.getElementById("propertyDept").innerHTML=sel_dept;
			$("#propertyList").html(longstring);

		}).fail(function(){
			window.alert("No data Found");
		});
		
	});
}

function pcdata_reqofficer(){
		var url=myUrl+"/propertycard/propertyapi/where3and/tbl_property_dispose/tbl_lccasset/fldPNum/"+localStorage.selected_id_reqofficer+"/fldIarNo/"+localStorage.selected_iarno_reqofficer+"/fldRecID/"+localStorage.selected_recid_reqofficer+"/fldAgency/"+localStorage.companyID+"/fldStngNo";
	$(function(){

		
		$.getJSON(url,function(data){
			let longstring = "";
			let sel_name = "";
			let sel_desc ="";
			let sel_pnum  = "";
			let sel_dept = "";
			let sel_agncy = "";
			console.log(data);

			for (let i = 0; i < data.length; i++) {
			sel_name=data[i].fldAssetType;
			sel_desc=data[i].fldAssetCateg;
			sel_pnum=data[i].fldRecID;
			sel_dept=data[i].fldDept;
			sel_agncy=data[i].fldAgency;

			longstring += "<tr>";
			longstring += "<td>"+data[i].fldDate+"</td>";
			longstring += "<td>"+data[i].fldRefNo+"</td>";
			longstring += "<td>"+data[i].fldRecQty+"</td>";
			longstring += "<td>"+data[i].fldTDQty+"</td>";
			longstring += "<td>"+data[i].fldDept+"</td>";
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

		url=myUrl+"/propertycard/propertyapi/where3and/tbl_property_dispose/tbl_lccasset/fldPNum/"+localStorage.selected_id+"/fldIarNo/"+localStorage.selected_iarno+"/fldRecID/"+localStorage.selected_recid+"/fldAgency/"+localStorage.companyID+"/fldStngNo";
		
		$.getJSON(url,function(data){
			let longstring = "";
			let sel_name = "";
			for (let i = 0; i < data.length; i++) {
			sel_name=data[i].fldAssetType;
			longstring += "<tr>";
			longstring += "<td>"+data[i].fldDate+"</td>";
			longstring += "<td>"+data[i].fldRefNo+"</td>";
			longstring += "<td>"+data[i].fldRecQty+"</td>";
			longstring += "<td>"+data[i].fldBrand+"</td>";
			longstring += "<td>"+data[i].fldToDept+"</td>";
			longstring += "<td>"+data[i].fldAction+"</td>";
			longstring += "<td class=''><a class='red-text darken-3' onclick='DeletePropData("+data[i].fldRecID+")'><i class='fa fa-trash'></i></a></td>";
			longstring += "</tr>";
			}
			document.getElementById("sel_name").innerHTML=sel_name;
			document.getElementById("sel_iarno").innerHTML=localStorage.selected_iarno;
			document.getElementById("sel_recid").innerHTML=localStorage.selected_recid;
			$("#proptabledata").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function proptable_reqofficer(){

	$(function(){

		url=myUrl+"/propertycard/propertyapi/where3and/tbl_property_dispose/tbl_lccasset/fldPNum/"+localStorage.selected_id_reqofficer+"/fldIarNo/"+localStorage.selected_iarno_reqofficer+"/fldRecID/"+localStorage.selected_recid_reqofficer+"/fldAgency/"+localStorage.companyID+"/fldStngNo";
		
		$.getJSON(url,function(data){
			let longstring = "";
			let sel_name = "";
			for (let i = 0; i < data.length; i++) {
			sel_name=data[i].fldAssetType;
			longstring += "<tr>";
			longstring += "<td>"+data[i].fldDate+"</td>";
			longstring += "<td>"+data[i].fldRefNo+"</td>";
			longstring += "<td>"+data[i].fldRecQty+"</td>";
			longstring += "<td>"+data[i].fldBrand+"</td>";
			longstring += "<td>"+data[i].fldToDept+"</td>";
			longstring += "<td>"+data[i].fldAction+"</td>";
			longstring += "</tr>";
			}
			document.getElementById("sel_name").innerHTML=sel_name;
			document.getElementById("sel_iarno").innerHTML=localStorage.selected_iarno_reqofficer;
			document.getElementById("sel_recid").innerHTML=localStorage.selected_recid_reqofficer;
			$("#proptabledata_reqofficer").html(longstring);

		}).fail(function(){
			window.alert("No Equipment Found");
		});
		
	});
}

function DeleteEquipData(equipid){

  $.post(myUrl+"/propertycard/propertyapi/delete/tbl_equipment/"+equipid,function(data){
    M.toast({html: 'Equipment Deleted'});
    equiptable();
  }).fail(function(){

  	M.toast({html: 'Equipment Not Deleted'});

  });

}

      $(document).ready(function(){  
           $('#upload_csv').on("submit", function(e){  
                e.preventDefault(); //form will not submitted  
                $.ajax({  
                     url:myUrl+"/propertycard/propertyapi/import.php",  
                     method:"POST",  
                     data:new FormData(this),  
                     contentType:false,          // The content type used when sending data to the server.  
                     cache:false,                // To unable request pages to be cached  
                     processData:false,          // To send DOMDocument or non processed data file it is set to false  
                     success: function(data){  
                     	M.toast({html: 'CSV Import Successful'});
						equiptable();
						equiptable_assigned();
						equiptable_unassigned();
                     }  
                })  
           });  
      }); 


function AddEquipData(){

	if( document.getElementById("employee_file").files.length == 0 ){
    console.log("no files selected");

	}else{

	}

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
		$.post(myUrl+"/propertycard/propertyapi/create",{tblname:tblname,fldIarNo:fldIarNo,fldAgency:fldAgency,fldPNum:fldPNum,fldDept:fldDept,fldRefNo:fldRefNo,fldRecQty:fldRecQty,fldTDQty:fldTDQty,fldRemarks:fldRemarks},function(data){

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

	$.post(myUrl+"/propertycard/propertyapi/create",{tblname:tblname,fldPNum:fldPNum,fldAgency:fldAgency,fldDept:fldDept,fldDate:fldDate,fldRefNo:fldRefNo,fldRecQty:fldRecQty,fldTDQty:fldTDQty,fldOffice:fldOffice,fldBalQty:fldBalQty,update_action:update_action},function(data){
		M.toast({html: 'Equipment Added'});
		document.getElementById("equip_name").value="";
 		document.getElementById("equip_desc").value="";
		document.getElementById("equip_qty").value="";
		equiptable();
	}).fail(function(){
		M.toast({html: 'Equipment Add Failed'})
	});
	
}


