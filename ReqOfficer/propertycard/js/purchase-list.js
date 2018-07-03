getRequest();

myArr = [];

$.getJSON(myUrl+"/myapi/select/tbl_lccalives", function(data){
    myArr = data;
});

function getData(val){
    for(let i = 0; i < myArr.length; i++){
        if(val == myArr[i].fldProdID){
            return myArr[i];
        }
    }
}

function getRequest() {
    $.ajax({
        url: myUrl+'/purchase_api/select.php?fetch_pr_list',
        method: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var body = '';
            for (var i = 0; i < data.length; i++) {

                if (data[i].fldCompanyID == localStorage.companyID && data[i].fldRequestByID == localStorage.userID) {


                    body += '<tr>';
                    body += '<td>' + data[i].fldPrNo + '</td>';
                    body += '<td>' + data[i].fldDept + '</td>';
                    body += '<td>' + data[i].fldPurpose + '</td>';
                    body += '<td>' + data[i].fldPurchaseRemarks + '</td>';
                    body += '<td><a href="#viewRequest" onclick="getReqEquipment(\'' + data[i].fldPrNo + '\')" class="modal-trigger "><i class="fa fa-eye"></i></a></td>';
                    body += '<td><a href="#!" onclick="getPrint(\'' + data[i].fldPrNo + '\')" class="black-text"><i class="fa fa-print"></i></a></td>';
                    body += '</tr>';
                }
            }
            $('#fetch_request').html(body);
        }
    });
}

function getReqEquipment(pr_no) {
    $.ajax({
        url: myUrl+'/purchase_api/select.php?fetch_pr_equipment=' + pr_no,
        method: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var body = '';
            for (var i = 0; i < data.length; i++) {




                if (data[i].fldRemarks == "Pending") {

                    body += '<tr>';
                    body += '<td>' + getData(data[i].fldPNum).fldProdName + '</td>';
                    body += '<td>' + data[i].fldBrand + '</td>';                    
                    body += '<td>' + data[i].fldUnit + '</td>';
                    body += '<td>' + data[i].fldQty + '</td>';
                    body += '<td>' + data[i].fldUnitCost + '</td>';
                    body += '<td>' + data[i].fldTotalCost + '</td>';
                    body += '</tr>';
                }
            }
            $('#fetch_request_units').html(body);
        }
    });

    $.ajax({
        url: myUrl+'/purchase_api/select.php?fetch_pr_equipment=' + pr_no,
        method: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var body = '';


            for (var i = 0; i < data.length; i++) {

                if (data[i].fldRemarks != "Pending") {
                    $("#fldAccept").css("display", "block");
                    body += '<tr>';
                    body += '<td>' + getData(data[i].fldPNum).fldProdName + '</td>'; 
                    body += '<td>' + data[i].fldBrand + '</td>';                    
                    body += '<td>' + data[i].fldUnit + '</td>';
                    body += '<td>' + data[i].fldQty + '</td>';
                    body += '<td>' + parseInt(data[i].fldUnitCost).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ) + '</td>';
                    body += '<td>' + parseInt(data[i].fldTotalCost).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ) + '</td>';
                    body += '</tr>';
                }
            }
            $('#fetch_request_approve').html(body);
        }
    });
}

$.ajaxSetup({
    async: false
})

function getPrint(val) {
    localStorage.idData = val;
    var ls = "";
    $.get("purchase_pdf.html", function (data) {
        ls = data;
    });
    Popup(ls);
}
