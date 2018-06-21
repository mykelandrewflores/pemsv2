let ArrDataHolder = [];
var datas = [JSON.parse('{"orders_details": [] }') , JSON.parse('{ "request_details": [] }')];
var PRno = "";
var serial = 0;
var stockNo = 0;
var id = 0;
var jsonObj2;
getData();

function saveData(json) {
    $.post("_api/save.php", {jsonData:json}, function(data) {
      console.log(data);
      getData();
    });
}

function getData() { 
    try{
        $.getJSON("data.json", function(json) {
            datas = json;
            console.log(datas);
            setPRno();
        });
    } catch(err) {

    }
}

function setPRno() {
        if (PRno == "") {
            let len = datas[1].request_details.length;
            console.log(datas);
            if (len == 0) {
                let d = new Date;
                let year = d.getFullYear();
                year = year.toString().substr(-2);
                let month = d.getMonth() + 1;
                if (month < 10) { month = '0' + month; }
                serial += 1;
                if (serial < 10 ) { serial = '00' + serial }
                if (serial < 100 && serial > 10) { serial = '0' + serial }
                PRno = year + "-" + month + "-" + serial; 
                console.log(PRno);
            }
            if (len > 0) {
               serial = datas[1].request_details[ len - 1].PRno; 
               serial = serial.replace(/-/g,"");
               serial = serial.toString().substr(6);
               serial = parseInt(serial);
                let d = new Date;
                let year = d.getFullYear();
                year = year.toString().substr(-2);
                let month = d.getMonth() + 1;
                if (month < 10) { month = '0' + month; }
                serial += 1;
                if (serial < 10 ) { serial = '00' + serial }
                if (serial < 100 && serial > 10) { serial = '0' + serial }
                PRno = year + "-" + month + "-" + serial; 
                console.log(PRno);
            }

        }
        // if (PRno != "") {
        //     if (serial < 10 ) { serial = '00' + serial }
        //     if (serial < 100 && serial > 10) { serial = '0' + serial }
        //     PRno = year + "-" + month + "-" + serial; 
        // }
        if (datas[0].orders_details.length > 0) {
            let curr_no = parseInt(datas[0].orders_details.length) - 1;
            // PRno = datas[0].orders_details[curr_no].PRno;
            id = datas[0].orders_details[curr_no].id;
            // PRno = PRno.replace(/-/g,"");
        }
}

function addEquipment() {
    stockNo += 1;
    id = parseInt(id);
    id += 1;
    // alert(stockNo);
    let equipmentName = $('#equipmentName').val();
    let unit = $('#unit').val();
    let itemDesc = $('#itemDesc').val();
    let itemQty = $('#itemQty').val();
    let itemCost = $('#itemCost').val();
    let itemTotal = itemQty * itemCost;
    let jsonObj;

    jsonObj = JSON.parse('{"id":"'+id+'","PRno":"'+PRno+'","equipmentName":"'+equipmentName+'","stockNo":"'+stockNo+'","unit":"'+unit+'","itemDesc":"'+itemDesc+'","itemQty":"'+itemQty+'","itemCost":"'+itemCost+'","itemTotal":"'+itemTotal+'"}');
    datas[0].orders_details.push(jsonObj);
    // console.log(datas);
    // saveData(JSON.stringify(datas));
    // getData();
    getCurrentEquipmentData();
}

function submitEquipments() {
    datas[1].request_details.push(jsonObj2);
    let hihi = JSON.stringify(datas);
    saveData(datas);
}

function getCurrentEquipmentData() {
    let agency = $('#agency').val();
    let department = $('#department').val();
    let section = $('#section').val();
    let purpose = $('#requestPurpose').val();
    let requestedBy = agency + "-" + department;
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    } 

    if(mm<10) {
        mm = '0'+mm;
    } 

    today = mm + '/' + dd + '/' + yyyy;
    let date = today;
    

    jsonObj2 = JSON.parse('{"PRno":"'+PRno+'","agency":"'+agency+'","department":"'+department+'","section":"'+purpose+'"}');

    let longString = "";
    for(var i = 0; i < datas[0].orders_details.length; i++) {
        console.log(PRno);
        if (datas[0].orders_details[i].PRno == PRno) {
            let total = parseInt(datas[0].orders_details[i].itemTotal);
            total = total.toFixed(2);
            let cost = parseInt(datas[0].orders_details[i].itemCost);
            cost = cost.toFixed(2);
            longString += "<tr>";
            longString += "<td>" + datas[0].orders_details[i].stockNo + "</td>";
            longString += "<td>" + datas[0].orders_details[i].unit + "</td>";
            longString += "<td>" + datas[0].orders_details[i].itemDesc + "</td>";
            longString += "<td>" + datas[0].orders_details[i].itemQty + "</td>";
            longString += "<td>&#8369; " + cost.replace(/\B(?=(\d{3})+\b)/g, ",") + "</td>";
            longString += "<td>&#8369; " + total.replace(/\B(?=(\d{3})+\b)/g, ",") + "</td>";
            longString += "</tr>";
        } else {
            console.log
        }
    }
    $('#itemList').html(longString);
    $('#itemsList').html(longString);
    $('#purchaseAgency').html(agency);
    $('#purchaseDept').html(department);
    $('#purchaseSect').html(section);
    $('#PRno').html(PRno);
    $('#date').html(date);
    $('#purpose').html(purpose);
    $('#requestedBy').html(requestedBy);
}

function PrintElem(elem)
{
    // localStorage.chartData = document.getElementById(elem).toDataURL();
    Popup($('<div/>').append($(elem).clone()).html());
}

function Popup(data) 
{
    
    
    
    var mywindow = window.open('', '_blank');
    
    mywindow.document.write('<head><link href="assets/css/printstyle.css" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet"></head>');
    mywindow.document.write('<body><div id="mybody">');
    mywindow.document.write('<div style="text-align: right;margin-right: 200px;">as</div>');
    mywindow.document.write('<center><br><br><br><h1>PURCHASE REQUEST SUMMARY</h1><br><br></center>');
   
    mywindow.document.write(data);
    
    // mywindow.document.write('<center><img id="url" width="1000px" src='+localStorage.chartData+'><br><br><h2>Life Cycle Cost Analysis Chart Table Data</h2>'+data+'</center></div><center>');
    
    mywindow.document.write('</center>')

    mywindow.document.write('<script type="text/javascript" src="js/jquery-3.2.0.min.js"></script><script type="text/javascript" src="js/Chart.min.js"></script><script type="text/javascript" src="js/Chart.bundle.min.js"></script><script type="text/javascript" src="js/mainfunc.js"></script>'); 
    mywindow.document.write('<script type="text/javascript" src="js/jspdf.min.js"></script>');
    mywindow.document.write('<script type="text/javascript" src="js/printPdf.js"></script>');
    mywindow.document.write('');
    mywindow.document.write('</body></html>');
    mywindow.focus();
    
    return true; 
 
}
$('#again').on('click',function(event){
    window.location.reload(true);
});