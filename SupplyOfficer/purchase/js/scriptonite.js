var myUrl = 'http://localhost/pems/apis';
let PurNo = '';
function getAllData() {
	$.getJSON(myUrl + '/purchaseorderapi/index.php?action=getAllPR',function(data){
		let longString = '';
		// console.log(data);
		for(let i=0; i<data.length; i++){
			if (data[i].fldCompanyID == localStorage.companyID) {
				let pr_no = '' + data[i].fldPrNo + '';
				longString += 	'<tr>' +
									'<td>' + data[i].fldPrNo + '</td>' +
									'<td>' + data[i].fldDept + '</td>' +
									'<td>' + data[i].fldDate + '</td>' +
									'<td>' + data[i].fldPurpose + '</td>';
				if (data[i].fldPurchaseRemarks == 'For Order') {
					longString += 	'<td><a class="waves-effect waves-light btn modal-trigger" href="#modal2" onclick="viewPO(\'' + pr_no + '\')">view purchase order</a></td>';
				} else {
					longString += 	'<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick="getPRitems(\'' + pr_no + '\')">generate purchase order</a></td>';
				}
									
				longString += 	'</tr>';
			}
		}
	});
		getAllPendingData();
		getAllOrderedData();
		// setTimeout(function(){getAllData();},1000);
}

function getAllPendingData() {
	$.getJSON(myUrl + '/purchaseorderapi/index.php?action=getAllPendingPR',function(data){
		let longString = '';
		for(let i=0; i<data.length; i++){
			if (data[i].fldCompanyID == localStorage.companyID) {
				let pr_no = '' + data[i].fldPrNo + '';
				longString += 	'<tr>' +
									'<td>' + data[i].fldPrNo + '</td>' +
									'<td>' + data[i].fldDept + '</td>' +
									'<td>' + data[i].fldDate + '</td>' +
									'<td>' + data[i].fldPurpose + '</td>' +
									'<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick="getPRitems(\'' + pr_no + '\')">generate purchase order</a></td>' +
								'</tr>';
			}
		}/*
		document.getElementById('pr_details-2').innerHTML = longString;*/
	});
		// setTimeout(function(){getAllData();},1000);
}

function getAllOrderedData() {
	$.getJSON(myUrl + '/purchaseorderapi/index.php?action=getAllOrderedPR',function(data){
		let longString = '';
		for(let i=0; i<data.length; i++){
			if (data[i].fldCompanyID == localStorage.companyID) {
				let pr_no = '' + data[i].fldPrNo + '';
				longString += 	'<tr>' +
									'<td>' + data[i].fldPrNo + '</td>' +
									'<td>' + data[i].fldDept + '</td>' +
									'<td>' + data[i].fldDate + '</td>' +
									'<td>' + data[i].fldPurpose + '</td>' +
									'<td><a class="waves-effect waves-light btn modal-trigger" href="#modal2" onclick="viewPO(\'' + pr_no + '\')">view purchase order</a></td>' +
								'</tr>';
			}
		}/*
		document.getElementById('pr_details-3').innerHTML = longString;*/
	});
		// setTimeout(function(){getAllData();},1000);
}

function viewPO(pr_no) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    } 

    if(mm<10) {
        mm = '0'+mm;
    } 

    today = mm + '/' + dd + '/' + yyyy;
    let date = today;

	$.getJSON(myUrl + '/purchaseorderapi/index.php?action=getAllPRitems&pr_no=' + pr_no + '',function(data){		
	    let longString = "";
        let totalcost = '';
        let POno = '';
	    for(var i = 0; i < data.length; i++) {
	        let total = parseInt(data[i].fldTotalCost);
	        total = total.toFixed(2);
	        let cost = parseInt(data[i].fldUnitCost);
	        cost = cost.toFixed(2);
	        totalcost = 0;
	        totalcost = parseInt(totalcost) + parseInt(total);
	        totalcost = totalcost.toFixed(2);
	        POno = data[i].fldPrNo;
	        PurNo = POno;
	        longString += "<tr>";
	        longString += "<td>" + data[i].fldPrNo + "</td>";
	        longString += "<td>" + data[i].fldUnit + "</td>";
	        longString += "<td>Sample Description</td>";
	        longString += "<td>" + data[i].fldQty + "</td>";
	        longString += "<td>&#8369; " + cost.replace(/\B(?=(\d{3})+\b)/g, ",") + "</td>";
	        longString += "<td>&#8369; " + total.replace(/\B(?=(\d{3})+\b)/g, ",") + "</td>";
	        longString += "</tr>";
	    }	
	    longString += '<tr><td colspan="5"><center>Total Amount</center></td><td>&#8369; ' + totalcost.replace(/\B(?=(\d{3})+\b)/g, ",") + '</td></tr>';
	    $('#itemsList2').html(longString);
	    $('#POno2').html(POno);
	    $('#dateToday2').html(date);
	});
	$.getJSON(myUrl + '/purchaseorderapi/index.php?action=getAllPRitemsdetails&pr_no=' + pr_no + '',function(data){		
	    let supplier = '';
	    let address = '';
	    let pod = '';
	    let dod = '';
	    let dot = '';
	    let pot = '';
	    let mop = '';
	    let todayD = '';
	    for(var i = 0; i < data.length; i++) {
	    	supplier = data[i].fldSupplier;
	    	address = data[i].fldSupplierAdd;
	    	pod = data[i].fldPlaceOfDelivery;
	    	dod = data[i].fldDateOfDelivery;
	    	dot = data[i].fldDeliveryTerm;
	    	pot = data[i].fldPaymentTerm;
	    	mop = data[i].fldModeOfProcurement;
	    	todayD = data[i].fldToday;
	    }
	    $('#suppDet2').html(supplier);
	    $('#suppAdd2').html(address);
	    $('#placeOfDel2').html(pod);
	    $('#dateOfDel2').html(dod);
	    $('#delTerm2').html(dot);
	    $('#payTerm2').html(pot);
	    $('#modeOfProc2').html(mop);
	    $('#dateToday2').html(todayD);
	});
}

function getPRitems(pr_no) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    } 

    if(mm<10) {
        mm = '0'+mm;
    } 

    today = mm + '/' + dd + '/' + yyyy;
    let date = today;

	$.getJSON(myUrl + '/purchaseorderapi/index.php?action=getAllPRitems&pr_no=' + pr_no + '',function(data){		
	    let longString = "";
        let totalcost = '';
        let POno = '';
	    for(var i = 0; i < data.length; i++) {
	        let total = parseInt(data[i].fldTotalCost);
	        total = total.toFixed(2);
	        let cost = parseInt(data[i].fldUnitCost);
	        cost = cost.toFixed(2);
	        totalcost = 0;
	        totalcost = parseInt(totalcost) + parseInt(total);
	        totalcost = totalcost.toFixed(2);
	        POno = data[i].fldPrNo;
	        PurNo = POno;
	        longString += "<tr>";
	        longString += "<td>" + data[i].fldPrNo + "</td>";
	        longString += "<td>" + data[i].fldUnit + "</td>";
	        longString += "<td>Sample Description</td>";
	        longString += "<td>" + data[i].fldQty + "</td>";
	        longString += "<td>&#8369; " + cost.replace(/\B(?=(\d{3})+\b)/g, ",") + "</td>";
	        longString += "<td>&#8369; " + total.replace(/\B(?=(\d{3})+\b)/g, ",") + "</td>";
	        longString += "</tr>";
	    }	
	    longString += '<tr><td colspan="5"><center>Total Amount</center></td><td>&#8369; ' + totalcost.replace(/\B(?=(\d{3})+\b)/g, ",") + '</td></tr>';
	    $('#itemsList').html(longString);
	    $('#POno').html(POno);
	    $('#dateToday').html(date);
	});
    
}
function setDetails(elem){
    
    sendData(CurrItem);
    
    
    
    
	let supplier = document.getElementById('supplier').value;
	let address = document.getElementById('address').value;
	let modeOfProcurement = document.getElementById('modeOfProcurement').value;
	let placeOfDelivery = document.getElementById('placeOfDelivery').value;
	let dateOfDelivery = document.getElementById('dateOfDelivery').value;
	let deliveryTerm = document.getElementById('deliveryTerm').value;
	let paymentTerm = document.getElementById('paymentTerm').value;
	let prNo = PurNo;
	$('#suppDet').html(supplier);
	$('#suppAdd').html(address);
	$('#modeOfProc').html(modeOfProcurement);
	$('#placeOfDel').html(placeOfDelivery);
	$('#dateOfDel').html(dateOfDelivery);
	$('#delTerm').html(deliveryTerm);
	$('#payTerm').html(paymentTerm);
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    } 

    if(mm<10) {
        mm = '0'+mm;
    } 
    
    today = mm + '/' + dd + '/' + yyyy;
    let date = today;
    let comID = localStorage.companyID;
	$.ajax({
		url: myUrl + '/purchaseorderapi/index.php?action=savePO',
		method:'POST',
		data:{
			prNo:CurrItem,
			supplier:supplier,
			address:address,
			modeOfProcurement:modeOfProcurement,
			placeOfDelivery:placeOfDelivery,
			placeOfDelivery:placeOfDelivery,
			dateOfDelivery:dateOfDelivery,
			deliveryTerm:deliveryTerm,
			paymentTerm:paymentTerm,
			today:date,
			companyID:comID
		},
		success:function(data){
			alert('hihi');
		}
	});
    
    viewPO(CurrItem);
    getPRitems(CurrItem);
    
	document.getElementById("printDiv").style.display = "block";
	Popup($('<div/>').append($(elem).clone()).html());
	document.getElementById("printDiv").style.display = 'none';
}
function Popup(data) {
    var mywindow = window.open('', '_blank');
    
    mywindow.document.write('<head><link href="../../css/printstyle.css" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet"></head>');
    mywindow.document.write('<body><div id="mybody">');
    mywindow.document.write('<div style="text-align: right;"></div>');
    mywindow.document.write('<center><h1>PURCHASE ORDER SUMMARY</h1></center>');
   
    mywindow.document.write(data);

    mywindow.document.write('</center>')

    mywindow.document.write('<script type="text/javascript" src="js/jquery.min.js"></script>'); 
    mywindow.document.write('<script type="text/javascript" src="js/jspdf.min.js"></script>');
    mywindow.document.write('<script type="text/javascript" src="js/printPdf.js"></script>');
    mywindow.document.write('');
    mywindow.document.write('</body></html>');
    mywindow.focus();
    setTimeout(function(){mywindow.close();},2000);
    window.location.assign("purchaselist.html");
    return true; 
}
getAllData();