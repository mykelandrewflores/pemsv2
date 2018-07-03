        var equipData = [];
        var DataCounter = 0;
        var url ="http://gordoncollegeccs-ssite.net/pems/apis";

        var CurrItem = "";

        $.ajaxSetup({
            async: false
        });

        $.getJSON(url+"/myapi/select/tbl_lccalives", function(data) {
            equipData = data;
        });

        $.getJSON(url+"/myapi/select/tbl_purchaserequest?ORDERBY=fldTransactionNO DESC", function(data) {
            var longString = "";
            for (let i = 0; i < data.length; i++) {

                if (data[i].fldCompanyID == localStorage.companyID) {


                    longString += '<tr>';
                    longString += '<td>' + data[i].fldPrNo + '</td>';
                    longString += '<td>' + data[i].fldDept + '</td>';
                    longString += '<td>' + formDNow(new Date(data[i].fldDate)) + '</td>';
                    longString += '<td>' + data[i].fldPurpose + '</td>';
                    longString += '<td>' + data[i].fldRequestByID + '</td>';
                    longString += '<td>' + data[i].fldPurchaseRemarks + '</td>';
                    if (data[i].fldPurchaseRemarks != "Pending") {
                        longString += '<td><a href="#!" class="" onclick="getitemApproved(\'' + data[i].fldPrNo + '\'); viewPO(\'' + data[i].fldPrNo + '\')"><i class="fa fa-eye"></i></a></td>';
                    } else {
                        longString += '<td><a href="#!" class="" onclick="getitemData(\'' + data[i].fldPrNo + '\')"><i class="fa fa-eye"></i></a></td>';
                    }
                    longString += "<td><a class='green-text' href='"+url+"/lccafiles/download.php?file="+data[i].fldPrNo+".pdf'><i class='fa fa-download'></i></a></td>";
                    longString += '</tr>';

                }
            }
            $("#purchaselist").html(longString);
        });

        function getPurchaseData(val) {
            for (let i = 0; i < equipData.length; i++) {
                if (val == equipData[i].fldProdID) {
                    return equipData[i];
                }
            }
        }


        function itemRemarks(val) {
            $.getJSON(url+"/myapi/select/tbl_purchaseitems/fldPrNo/" + val, function(data) {
                for (let i = 0; i < data.length; i++) {

                }
            });
        }

        function getitemData(val) {

            CurrItem = val;
            $("#tabCont").css("display", "none");

            $.get("purchaseitems.html", function(data) {
                $("#tblitems").html(data);
            })

            $.getJSON(url+"/myapi/select/tbl_purchaseitems/fldPrNo/" + val, function(data) {
                $('select').formSelect();
                DataCounter = data.length;
                let longString = "";
                for (let i = 0; i < data.length; i++) {

                    if (data[i].fldRemarks == "Pending") {
                        longString += '<tr>';
                        longString += '<td id="mPrNo' + (i + 1) + '">' + data[i].fldPrNo + '</td>';
                        longString += '<td id="mUnit' + (i + 1) + '">' + data[i].fldUnit + '</td>';
                        longString += '<td style="display:none" id="mitemNo' + (i + 1) + '">' + data[i].fldPNum + '</td>';
                        longString += '<td>' + getPurchaseData(data[i].fldPNum).fldProdName + '</td>';
                        longString += '<td id="mitemBrand' + ( i + 1 ) + '">' + data[i].fldBrand + '</td>';                        
                        longString += '<td><input type="text" value="' + data[i].fldQty + '" style="width: 30px; text-align:center" id="mQty' + (i + 1) + '"></td>';
                        longString += '<td id="mUnitCost' + (i + 1) + '">' + data[i].fldUnitCost + '</td>';
                        longString += '<td id="mTotalCost' + (i + 1) + '">' + data[i].fldTotalCost + '</td>';
                        longString += '<td><select class="browser-default" id="mremarks' + (i + 1) + '" required><option selected disabled>' + data[i].fldRemarks + '</option><option>Approved</option><option>Decline</option></select></td>';
                        longString += '</tr>';
                    }
                }
/*                longString += "<tr style='text-align:right' id='btnConf'><td><button class='btn' onclick='sendData(\"" + CurrItem + "\")' type='button'>Generate Purchase Order</button></td><tr>";*/
                longString += "<tr style='text-align:right' id='btnConf'><td><button class='btn btn-large blue modal-trigger' href='#modal1' type='button'><i class='fa fa-send'></i> Generate Purchase Order</button></td><tr>";         
                $("#items").html(longString);
            });
        }

        function getitemApproved(val) {

            CurrItem = val;
            $("#tabCont").css("display", "none");

            $.get("purchaseitems.html", function(data) {
                $("#tblitems").html(data);
            })

            $.getJSON(url+"/myapi/select/tbl_purchaseitems/fldPrNo/" + val, function(data) {
                $('select').formSelect();
                DataCounter = data.length;
                let longString = "";
                for (let i = 0; i < data.length; i++) {

                    if (data[i].fldRemarks == "Approved" || data[i].fldRemarks == "Accept") {
                        longString += '<tr>';
                        longString += '<td id="PrNo' + (i + 1) + '">' + data[i].fldPrNo + '</td>';
                        longString += '<td id="Unit' + (i + 1) + '">' + data[i].fldUnit + '</td>';
                        longString += '<td style="display:none" id="itemNo' + (i + 1) + '">' + data[i].fldPNum + '</td>';
                        longString += '<td>' + getPurchaseData(data[i].fldPNum).fldProdName + '</td>';
                        longString += '<td id="ItemBrand' + ( i + 1 ) + '">' + data[i].fldBrand + '</td>';    
                        longString += '<td>' + (i + 1) + '</td>';
                        longString += '<td id="UnitCost' + (i + 1) + '">' + data[i].fldUnitCost + '</td>';
                        longString += '<td id="TotalCost' + (i + 1) + '">' + data[i].fldTotalCost + '</td>';
                        longString += '<td>' + data[i].fldRemarks + '</td>';
                        longString += '</tr>';
                    }
                    $("#items").html(longString);
                }
            });
        }


        function getId(val) {
            return document.getElementById(val);
        }

        function sendData(val) {
            window.alert("Purchase Successfully Made!");
            for (var i = 0; i < DataCounter; i++) {
                $.post(url+"/myapi/insert/tbl_purchaseitems",
                    JSON.stringify([{
                        tNo: getId("mPrNo" + (i + 1)).innerHTML,
                        uId: getId("mUnit" + (i + 1)).innerHTML,
                        dt: getId("mitemNo" + (i + 1)).innerHTML,
                        zx: getId("mitemBrand" + (i + 1)).innerHTML,
                        ft: getId("mQty" + (i + 1)).value,
                        rz: getId("mQty" + (i + 1)).value,
                        tt: getId("mUnitCost" + (i + 1)).innerHTML,
                        rt: getId("mTotalCost" + (i + 1)).innerHTML,
                        st: $('#mremarks' + (i + 1) + ' :selected').text()
                    }]),
                    function(data) {
                        console.log(data);
                    });
            }

            $.post(url+"/myapi/update/tbl_purchaserequest/fldPrNo/" + val,
                JSON.stringify([{
                    fldPurchaseRemarks: "Checked"
                }]),
                function(data) {
                    console.log(data);
                });


        }


        $(document).ready(function() {
            $('ul.tabs').tabs({
                swipeable: false,
                responsiveThreshold: 1920
            });
        });
