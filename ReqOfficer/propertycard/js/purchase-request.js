setData();
fetchEquipments();
var req_item = [];


$("#company_id").val(localStorage.companyID);
$("#user_id").val(localStorage.userID);

function formatDate(date, lval) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = new Date().getFullYear().toString().substr(-2)
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var mval = parseInt(lval)+1;
    
    console.log(mval);
    return year + '-' + month + '-' + mval;
}

function setData() {
   var url = myUrl + "/iar_api/select.php?purchase_no";
   $.ajax({
    url: url,
    method: 'GET',
    dataType: 'JSON',
    success: function (data) {
        var lastVal = ";"
        data.forEach(function(i) {
            lastVal = i.fldPrNo;
        });
        var xplVal = lastVal.split("-");        
        if(isNaN(xplVal[2]))    {
            lastVal = formatDate(new Date, "100");
        }
        var splVal = lastVal.split("-");
        $('#curdate_request').val(formatDate(new Date, splVal[2]));     
    }
});
}

function addDataSet() {
    var curdate_request = $('#curdate_request').val();
    
    var unit = $('#unit').val();
    var bname = $('#bname').val();
    
    var equipement_select = $('#equipement_select').val();
    var equipment_name = $('#equipement_select option:selected').text();
    var qty = $('#qty').val();
    var cost = $('#cost').val();
    var total = qty * cost;
    if (unit == '' && qty == '' && cost == '') {
        M.toast({
            html: 'Fields are Required!',
            classes: 'rounded'
        });
        return false;
    } else if (unit == '') {
        M.toast({
            html: 'Unit Fileds Required!',
            classes: 'rounded'
        });
        return false;
    } else if (qty == '' || qty == 0) {
        M.toast({
            html: 'Quantity Fileds Required!',
            classes: 'rounded'
        });
        return false;
    } else if (total == '' || total == 0) {
        M.toast({
            html: 'Cost Fileds Required!',
            classes: 'rounded'
        });
        return false;
    }
    req_item.push({
        'requestPR': curdate_request,
        'unit': unit,
        'equipment': equipement_select,
        'equipment_name': equipment_name,
        'qty': qty,
        'bname': bname,
        'cost': cost,
        'total_cost': total
    });
    getItems();
}

$.ajaxSetup({
    async: false
});
getEquipCateg();
let testArr = [];
fetchEquipments("Office Equipment");

function getEquipCateg() {
    $.getJSON(myUrl+"/purchase_api/select.php?lcca_livesdis&cID="+localStorage.companyID, function (data) {

        var body = ''
        body += '<select onchange="fetchEquipments(this.value)"> <option value="" disabled selected>Choose your Option</option>';
        for (var i = 0; i < data.length; i++) {
            body += '<option value="' + data[i].fldPropertyCategory + '">' + data[i].fldPropertyCategory + '</option>';
        }
        body += '</select><label>Item Category</label>';
        $('#testingtwo').html(body)

    });
}

function fetchEquipments(val) {
    $.ajax({
        url: myUrl+'/purchase_api/select.php?fetch_equipments_data=' + val,
        method: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var body = ''
            body += '<select id="equipement_select" class="browser-default"> <option value="" disabled selected>Item Type</option>';
            for (var i = 0; i < data.length; i++) {
                if(data[i].fldUserID == localStorage.companyID){                
                    body += '<option value="' + data[i].fldProdID + '">' + data[i].fldProdName + '</option>';
                }
            }
            body += '</select>';
            $('#testing').html(body)
        }
    });
}

function getItems() {
    var body = '';
    for (var i = 0; i < req_item.length; i++) {
        body += '<tr>';
        body += '<td>' + req_item[i].unit + '</td>';
        body += '<td>' + req_item[i].equipment_name + '</td>';
        body += '<td>' + req_item[i].qty + '</td>';
        body += '<td> ' + req_item[i].cost + '</td>';
        body += '<td>P ' + parseInt(req_item[i].total_cost).toLocaleString(undefined, {
            minimumFractionDigits: 2
        }) + '</td>';
        body += '<td><a href="#!" onclick="removeItem(' + i + ')"><i class="fa fa-close"></i></a></td>';
        body += '</tr>';
    }
    $('#unit').val('');
    $('#qty').val('');
    $('#cost').val('');
    $('#add_data_set').html(body);
}

function removeItem(id) {
    req_item.splice(id, 1);
    getItems();
}

function requestUnits() {
    $.ajax({
        url: myUrl+'/purchase_api/insert_json.php',
        method: 'POST',
        data: JSON.stringify(req_item),
        success: function (data) {}
    });
}
$(document).ready(function () {
    $('#form_request').submit(function (e) {
        e.preventDefault();
        var form = $(this).serialize();
        if (0 == req_item.length) {
            M.toast({
                html: 'Set Order First Before to Proceed!'
            });
            return false;
        }
        $.ajax({
            beforeSend:function() {
                $('#submitting').attr("disabled","disabled");
                $('#submitting').text('Submitting...');
            },
            url: myUrl+'/purchase_api/insert.php',
            method: 'POST',
            data: form,
            success: function (data) {
                requestUnits();
                M.toast({
                    html: 'Succefully Request!'
                });     
                $('#request_purpose').val('');
                req_item = [];
                getItems();
                $('#submitting').prop("disabled",false);
                $('#submitting').text('Submit');
            }
        });




        var form_data = new FormData();

        form_data.append('file', $('input#myFile')[0].files[0]);

        $.ajax({
            url: myUrl+'/lccafiles/upload.php?tno=' + $("#curdate_request").val()+'&uid=' + localStorage.userID,
            method: 'POST',
            contentType: false,
            processData: false,
            data: form_data,
            success: function (data) {
                console.log(data);
            }
        });
        
        setData();
        //window.location.assign("purchase-list.html");
    })
});


var myfile="";

$('#fileBtn').click(function( e ) {
    e.preventDefault();
    $('#myFile').trigger('click');
});

$('#myFile').on( 'change', function() {
   myfile= $( this ).val();
   var ext = myfile.split('.').pop();
   if(ext=="pdf" || ext=="docx" || ext=="doc"){
       return true;

   } else{
       alert("Your file extension is invalid, Make sure your file is in PDF format");
       return false;
   }
});