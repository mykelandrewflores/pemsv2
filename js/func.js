function submitCompany() {
    var cname = $("#comp_name").val()
    var cadd = $("#comp_address").val()
    var cnum = $("#comp_contactno").val()
    var cmail = $("#comp_email").val()
    var cfax = $("#comp_faxno").val()
    var clogo = bsixf;
    var cweb = $("#comp_website").val()
    var cpwd = $("#comp_pass").val()
    var cpwd_t = $("#comp_pass_two").val()


    if (cpwd == cpwd_t) {


        $.post("http://localhost/pems/apis/myapi/insert/tbl_companies",
            JSON.stringify([{
                cn: cname,
                ca: cadd,
                cnum: cnum,
                cmail: cmail,
                cfax: cfax,
                clogo: clogo,
                cweb: cweb,
                cpwd: cpwd,
                }]),
            function (data) {
                console.log(data);
            });

        window.alert("Company Succesfuly Added");
        window.location.assign("index.html");

    } else {
        window.alert("Password didn't Match");
    }
}

function insertEmployee() {
    var un = $("#emp_username").val();
    var pwd = $("#emp_pass").val();
    var cpwd = $("#emp_cpass").val();
    var fname = $("#emp_fname").val();
    var lname = $("#emp_lname").val();
    var mname = $("#emp_mname").val();
    var role = $("#emp_role").val();
    var dept = $("#emp_dept").val();
    var coid = localStorage.companyID;

    
    if(pwd == cpwd){
        
    }
    $.post("http://localhost/pems/apis/myapi/insert/tbl_user",
        JSON.stringify([{
            cn: un,
            ca: pwd,
            cnum: fname,
            cmail: lname,
            cfax: mname,
            clogo: role,
            cweb: dept,
            cpwd: coid,
                }]),
        function (data) {
            console.log(data);
        });


    window.alert("Employee Succesfully Added!");
    selectCompanyEmply(localStorage.companyID);
}


var bsixf = "";

function readFile() {

    if (this.files && this.files[0]) {

        var FR = new FileReader();

        FR.addEventListener("load", function (e) {
            bsixf = e.target.result;
        });

        FR.readAsDataURL(this.files[0]);
    }

}


try {

    document.getElementById("inp").addEventListener("change", readFile);
} catch (err) {

}

function loginUser() {

    var un = $("#username").val();
    var pw = $("#password").val();
    $.post("http://localhost/pems/apis/myapi/login/", {
        un: un,
        pw: pw
    }, function (data) {
        if (data.Authorize == "User") {

            localStorage.companyID = data.fldCompanyID;
            localStorage.userID = data.fldUserID;
            localStorage.userDept = data.fldDept;

            if (data.fldRole == "Supply") {
                window.location.assign("SupplyOfficer/purchase/purchaselist.html");
            } else {
                window.location.assign("ReqOfficer/propertycard/");
            }
        } else if (data.Authorize == "Company") {
            localStorage.companyID = data.fldCompanyID;
            window.location.assign("CompAdmin/");
        } else {
            window.alert("Login Failed");
        }
    });
}


//LOGIN SIDE

function selectCompanyEmply(val) {
    $.getJSON("http://localhost/pems/apis/myapi/select/tbl_user/fldCompanyID/" + val, function (data) {
        var ls = "";

        for (var i = 0; i < data.length; i++) {
            ls += "<tr>"
            ls += "<td>" + data[i].fldUserID + "</td>";
            ls += "<td>" + data[i].fldFname + " " + data[i].fldLname + "</td>";
            ls += "<td>" + data[i].fldRole + "</td>";
            ls += "<td>" + data[i].fldDepartment + "</td>";
            ls += '<td><button class="btn red">Edit</button><button class="btn indigo">Delete</button></td>';
            ls += "</tr>";
        }

        $("#proptabledata").html(ls);
    });
}


function selectCompany(val) {
    var bd = "";
    $.getJSON("http://localhost/pems/apis/myapi/select/tbl_companies/fldCompanyID/" + val, function (data) {
        $("#comp_name").html(data[0].fldCompanyName);
        $("#det_em").html(data[0].fldEmail);
        $("#det_address").html(data[0].fldAddress);
        $("#det_contact").html(data[0].fldContactNo);
        $("#det_faxno").html(data[0].fldFax);
        $("#det_website").html(data[0].fldWebsite);

        $("#comp_logo").attr("src", data[0].fldLogo);

    });
}

function logOut() {
    localStorage.companyID = "";
    localStorage.userID = "";
    window.location.assign("../index.html");
}
