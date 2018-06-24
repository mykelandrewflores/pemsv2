var myurl = "http://localhost/pems/apis";
setInterval(function () {
    purchaselist();
}, 5000);
purchaselist();
iarFetch();
var ids = [];
var recieve_json = [];
var log_prno = "";

function purchaselist() {
    var url = myurl + "/iar_api/select.php?tbl_purchaserequest&company_id=" + localStorage.companyID;
    $.getJSON(url, function (data) {
        var longstring = "";
        for (var i = 0; i < data.length; i++) {
            longstring += "<tr>";
            longstring += "<td id='prodid' hidden>" + data[i].fldProdID + "</td>";
            longstring += "<td id='prnum'>" + data[i].fldPrNo + "</td>";
            longstring += "<td id='dept'>" + data[i].fldDept + "</td>";
            longstring += "<td>" + formatDate(new Date(data[i].fldDate)) + "</td>";
            longstring += "<td>" + data[i].fldPurpose + "</td>";
            longstring += "<td>" + data[i].fldPurchaseRemarks + "</td>";
            if (data[i].fldPurchaseRemarks == 'Done') {
                longstring += "<td><a class='modal-trigger waves-effect waves-light  ' href='#modal2' onclick='donelist(\"" + data[i].fldPrNo + "\",\"" + data[i].fldDept + "\")'><i class='fa fa-list-alt' aria-hidden='true'></i></a></td>";
            }else{
                longstring += "<td><a class='modal-trigger waves-effect waves-light  ' href='#modal1' onclick='stocklist(\"" + data[i].fldPrNo + "\",\"" + data[i].fldDept + "\")'><i class='fa fa-eye' aria-hidden='true'></i></a></td>";
            }
            longstring += "</tr>";
        }
        $('#purchaselist').html(longstring);
    });
}

function iarFetch() {
    var url = myurl + "/iar_api/select.php?tbl_inspection";
    $.getJSON(url, function (data) {
        var longstring = "";
        var longstring = "";
        var today = new Date();
        var month = today.getMonth();
        var day = today.getDay();
        var year = today.getFullYear();
        var currentdate = month + year;
        for (var i = 0; i < data.length; i++) {
            $('#inspectionno').val('IAR' + currentdate + (parseInt(data[i].fldIarNo) + 1));
            $('#iar_out').val('IAR' + currentdate + (parseInt(data[i].fldIarNo) + 1));
        }
    });
}

function stocklist(id, dept) {
    $('#office').val(dept)
    $('#office_out').val(dept)
    $('#PO_no').val(id)
    var url = myurl + "/iar_api/select.php?tbl_purchaseitems=" + id;
    $.getJSON(url, function (data) {
        var longstring = "";
        var today = new Date();
        var month = today.getMonth();
        var day = today.getDay();
        var year = today.getFullYear();
        var currentdate = month + year;
        $('#invoice').val('INV' + currentdate + '-');
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].fldTransactionID);
            log_prno = data[i].fldPrNo;
            longstring += "<tr>";
            longstring += "<td id='unit" + data[i].fldTransactionID + "'>" + data[i].fldUnit + "</td>";
            longstring += "<td id='prodIdz" + data[i].fldTransactionID + "' style='display: none'>" + data[i].fldPNum + "</td>";
            longstring += "<td id='prodName" + data[i].fldTransactionID + "'>" + getPurchaseData(data[i].fldPNum).fldProdName + "</td>";
            longstring += "<td id='brandName" + data[i].fldTransactionID + "'>" + data[i].fldBrand + "</td>";
            longstring += "<td>" + data[i].fldQty + "</td>";
            longstring += "<td>" + data[i].fldRecieve + "</td>";
            longstring += "<td><input type='number' id='receiveqty" + data[i].fldTransactionID + "' min='0' max='" + data[i].fldRecieve + "' required/></td>";
            longstring += "</tr>";
        }
        $('#stocklist').html(longstring);
    });
}

function donelist(){
    
}

function pad(num) {
    return ("0" + num).slice(-2);
}

function formatDate(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var date = new Date(date * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return monthNames[monthIndex] + ' ' + day + ', ' + year + ' ' + pad(hours) + ":" + pad(minutes) + pad(ampm);
}
    
function stopOperation() {
    recieve_json = [];
    ids = [];
    log_prno = "";
}

$.ajaxSetup({
    async:false
})
$(document).ready(function () {
    $('#submit_inspection').submit(function (event) {
        event.preventDefault();
        var url = myurl + "/iar_api/insert.php";
        var form = $(this).serialize();
        var qna = confirm('Procceed?');
        if (qna == true) {
            for (var i = 0; i < ids.length; i++) {
                var rQty = $('#receiveqty' + ids[i]).val();
                var prodName = $('#prodIdz' + ids[i]).html();
                var brandName = document.getElementById('brandName' + ids[i]).innerHTML;
                var unit = $('#unit' + ids[i]).html();
                var invoice = $('#invoice').val();
                var company_id = localStorage.companyID;
                var iar = $('#inspectionno').val();
                var dept = $('#office').val();
                var PO = $('#PO_no').val();
                
                recieve_json.push({
                    'IAR': iar,
                    'invoice_no': invoice,
                    'company_id': company_id,
                    'PrNo': ids[i],
                    'log_prno': log_prno,
                    'PO': PO,
                    'prodName': prodName,
                    'brandName': brandName,
                    'dept': dept,
                    'unit': unit,
                    'Recieve_qty': rQty
                });
                
            }
            
            insertInspection(recieve_json);
            
            $.ajax({
                url: url,
                method: 'POST',
                data: form,
                dataType: 'JSON',
                success: function (data) {
                	insertInspection();
                    updateInspection();
                }
            });
        } else {
            return false;
        }
    });

    function updateInspection() {
        var url = myurl + "/iar_api/multiple_statement.php";
        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(recieve_json),
            dataType: 'JSON',
            success: function (data) {
                if (data.response == 'successfully updated') {
                    checkPrZero();
                    $('.modal').modal('close');
                    M.toast({
                        html: 'Succesfully Updated!',
                        classes: 'rounded'
                    });
                }
            }
        });
    }

    function insertInspection(val) {
        console.log(recieve_json);
        var url = myurl + "/iar_api/multiple_insert.php";
        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(val),
            dataType: 'JSON',
            success: function (data) {}
        });
    }

    function checkPrZero() {
        var url = myurl + "/iar_api/update_pr.php";
        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(recieve_json),
            dataType: 'JSON',
            success: function (data) {
                if (data.response == 'respondent') {
                    purchaselist();
                    ids = [];
                    recieve_json = [];
                    $('.modal').modal('close');
                }
            }
        });
    }
});
var equipData = [];

$.ajaxSetup({
    async: false
});

$.getJSON(myurl + "/myapi/select/tbl_lccalives", function (data) {
    equipData = data;
});


function getPurchaseData(val) {
    for (let i = 0; i < equipData.length; i++) {
        if (val == equipData[i].fldProdID) {
            return equipData[i];
        }
    }
}
