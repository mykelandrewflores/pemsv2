var myurls = "http://gordoncollegeccs-ssite.net/";
// var myurls = "http://localhost/";

$('#form_request').submit(function (e) {
    e.preventDefault();
    var cname = $("#comp_name").val()
    var cadd = $("#comp_address").val()
    var cnum = $("#comp_contactno").val()
    var cmail = $("#comp_email").val()
    var cfax = $("#comp_faxno").val()
    var clogo = bsixf;
    var cweb = $("#comp_website").val()
    var cpwd = $("#comp_pass").val()
    var cpwd_t = $("#conf_pass").val()
    var thval = Math.random().toString(36).slice(2);
    thval = thval.substring(0, 6);


    if (cpwd == cpwd_t) {


        $.post(myurls + "pems/apis/myapi/insert/tbl_companies",
            JSON.stringify([{
                cn: cname,
                ca: cadd,
                cnum: cnum,
                cmail: cmail,
                cfax: cfax,
                clogo: clogo,
                cweb: cweb,
                cpwd: cpwd,
                vcode: thval

            }]),
            function (data) {
                console.log(data);
            });


        sendEmail(cmail, thval);

        window.alert("We've already sent an email for your verification code please check your email now");

        setTimeout(function () {
            window.location.assign("verify.html");
        }, 2000);

    } else {
        window.alert("Password didn't Match");
    }
});

function sendEmail(eadd, val) {
    $.post(myurls + "pems/apis/emailverif/", {
        eadd: eadd,
        vcode: val
    }, function (data) {
        console.log(data);
    });
}

$('#emp_form').submit(function (e) {
    e.preventDefault();
    var pwd = $("#emp_pass").val();
    var cpwd = $("#emp_cpass").val();
    if (pwd == cpwd) {
        var un = $("#emp_username").val();

        var fname = $("#emp_fname").val();
        var lname = $("#emp_lname").val();
        var mname = $("#emp_mname").val();
        var role = $("#emp_role").val();
        var dept = $("#emp_dept").val();
        var coid = localStorage.companyID;



        $.post(myurls + "pems/apis/myapi/insert/tbl_user",
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
        window.location.assign("emplist.html");
        selectCompanyEmply(localStorage.companyID);
        selectCompanyEmplyInactive(localStorage.companyID)

    } else {
        window.alert("Employee password didn't Mach");
    }

});


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

$('#login_user').submit(function (e) {
    e.preventDefault();
    var un = $("#username").val();
    var pw = $("#password").val();
    $.post(myurls + "pems/apis/myapi/login/", {
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
            localStorage.companyName = data.fldCompanyName;
            localStorage.companyEmail = data.fldEmail;
            localStorage.companyAddress = data.fldAddress;
            localStorage.companyContactNo = data.fldContactNo;
            localStorage.companyFaxNo = data.fldFax;
            localStorage.companyWeb = data.fldWebsite;
            localStorage.companyLogo = data.fldLogo;


            window.location.assign("CompAdmin/");
        } else {
            window.alert("Login Failed");
        }
    });
});


function validateData(val, valid, tbl, datafld) {
    tbl = "tbl_" + tbl;

    $.getJSON(myurls + "pems/apis/myapi/select/" + tbl + "/fld" + datafld + "/" + val, function (data) {
        if (data.length > 0) {
            window.alert(datafld + " has been already taken, Please choose another");
            $("#" + valid).val("");
            $("#" + valid).focus();
        }
    });
}


function validateEm(val) {
    $.getJSON(myurls + "pems/apis/myapi/select/tbl_companies/fldEmail/" + val, function (data) {
        if (data.length == 0) {
            window.alert("Invalid Email Address");
            $("#email").val("");
            $("#email").focus();
        }
    });
}

function validateEmAdd(val) {
    $.getJSON(myurls + "pems/apis/myapi/select/tbl_companies/fldEmail/" + val, function (data) {
        if (data.length == 0) {
            window.alert("Invalid Email Address");
            $("#emailAdd").val("");
            $("#emailAdd").focus();
        }
    });
}

function validateDataDept(val, valid, tbl, datafld) {
    tbl = "tbl_" + tbl;

    $.getJSON(myurls + "pems/apis/myapi/select/" + tbl + "/fld" + datafld + "/" + val, function (data) {
        if (data.length > 0 && data[0].fldCompanyID == localStorage.companyID) {
            if (datafld == "DepartmentName") {
                datafld = "Department Code";
            }
            if (datafld == "FullDeptName") {
                datafld = "Department Name";
            }
            window.alert(datafld + " has been already taken, Please choose another");
            $("#" + valid).val("");
            $("#" + valid).focus();
        }
    });
}


//LOGIN SIDE

function selectCompanyEmply(val) {
    $.getJSON(myurls + "pems/apis/myapi/select/tbl_user/fldCompanyID/" + val, function (data) {
        var ls = "";

        for (var i = 0; i < data.length; i++) {
            if (data[i].fldRole != "Inactive") {
                ls += "<tr>"
                ls += "<td>" + data[i].fldUserID + "</td>";
                ls += "<td>" + data[i].fldFname + " " + data[i].fldLname + "</td>";
                ls += "<td>" + data[i].fldRole + "</td>";
                ls += "<td>" + data[i].fldDepartment + "</td>";
                ls += '<td><a class="modal-trigger" href="#editmodal" onclick="editmodal_data(' + data[i].fldUserID + ')"><i class="fa fa-pencil"></i></a> | <a class="red-text" onclick="delete_data(' + data[i].fldUserID + ')"><i class="fa fa-trash"></i></a> | <a class="red-text" onclick="archive_data(' + data[i].fldUserID + ')"><i class="fa fa-archive"></i></a></td>';
                ls += "</tr>";
            }
        }

        $("#proptabledata").html(ls);
    });
}

function selectCompanyEmplyInactive(val) {
    $.getJSON(myurls + "pems/apis/myapi/select/tbl_user/fldCompanyID/" + val, function (data) {
        var ls = "";

        for (var i = 0; i < data.length; i++) {
            if (data[i].fldRole == "Inactive") {
                ls += "<tr>"
                ls += "<td>" + data[i].fldUserID + "</td>";
                ls += "<td>" + data[i].fldFname + " " + data[i].fldLname + "</td>";
                ls += "<td>" + data[i].fldRole + "</td>";
                ls += "<td>" + data[i].fldDepartment + "</td>";
                ls += '<td><a class="modal-trigger" href="#editmodal" onclick="editmodal_data(' + data[i].fldUserID + ')"><i class="fa fa-pencil"></i></a> | <a class="red-text" onclick="delete_data(' + data[i].fldUserID + ')"><i class="fa fa-trash"></i></a></td>';
                ls += "</tr>";
            }
        }

        $("#inact").html(ls);
    });
}

function selectCompany(val) {
    console.log(val);
    $("#comp_name").html(localStorage.companyName);
    $("#comp_name_sidenav").html(localStorage.companyName + '/PEMS');
    $("#comp_name_navbar").html(localStorage.companyName + '/PEMS');
    $("#comp_name_card").html(localStorage.companyName + '/PEMS');
    $("#det_em").html(localStorage.companyEmail);
    $("#dept_em").html(localStorage.companyEmail);
    $("#det_address").html(localStorage.companyAddress);
    $("#det_contact").html(localStorage.companyContactNo);
    $("#det_faxno").html(localStorage.companyFaxNo);
    $("#det_website").html(localStorage.companyWeb);
    $("#comp_logo").attr("src", localStorage.companyLogo);
    $("#sidepanel_bg").attr("src", localStorage.companyLogo);
    $("#company_logo_nav").attr("src", localStorage.companyLogo);

}

function logOut() {
    localStorage.removeItem("userID");
    localStorage.removeItem("companyID");
    window.location.assign("../index.html");
}

//EDIT DELETE EMPLOYEE --START--

function update_func() {
    let fldUserID = document.getElementById("editemp_userid").value;
    let fldUsername = document.getElementById("editemp_username").value;
    let fldFname = document.getElementById("editemp_fname").value;
    let fldLname = document.getElementById("editemp_lname").value;
    let fldMname = document.getElementById("editemp_mname").value;
    let fldRole = document.getElementById("editemp_role").value;
    let fldDepartment = document.getElementById("editemp_dept").value;
    let tblname = "tbl_user";
    let update_action = "update_employee";


    $.post(myurls + "pems/apis/propertycard/propertyapi/update", {
        tblname: tblname,
        fldUserID: fldUserID,
        fldUsername: fldUsername,
        fldFname: fldFname,
        fldLname: fldLname,
        fldMname: fldMname,
        fldRole: fldRole,
        fldDepartment: fldDepartment,
        update_action: update_action
    }, function (data) {
        selectCompanyEmply(localStorage.companyID);
        selectCompanyEmplyInactive(localStorage.companyID);
        M.toast({
            html: 'Employee Details Updated'
        });
        $('.modal').modal('close');
    }).fail(function () {
        M.toast({
            html: 'Employee Details Update Failed'
        })
    });
}

function editmodal_data(val) {

    $(function () {

        url = myurls + "pems/apis/propertycard/propertyapi/tbl_user/fldCompanyID/" + localStorage.companyID + "/fldUserID/" + val;

        $.getJSON(url, function (data) {
            for (let i = 0; i < data.length; i++) {
                document.getElementById("editemp_userid").value = data[i].fldUserID;
                document.getElementById("editemp_username").value = data[i].fldUsername;
                document.getElementById("editemp_fname").value = data[i].fldFname;
                document.getElementById("editemp_lname").value = data[i].fldLname;
                document.getElementById("editemp_mname").value = data[i].fldMname;
            }
        }).fail(function () {
            window.alert("No DATA Found");
        });

    });
}

function archive_data(val) {

    $(function () {

        if (confirm('Are you sure you want to archive this record?')) {
            $.post(myurls + "pems/apis/propertycard/propertyapi/delete/tbl_user_archive/" + val, function (data) {
                M.toast({
                    html: 'Employee Archived'
                });
                selectCompanyEmply(localStorage.companyID);
                selectCompanyEmplyInactive(localStorage.companyID);
            }).fail(function () {
                M.toast({
                    html: 'Process Failed'
                });
            });
        } else {
            M.toast({
                html: 'Cancelled'
            });
        }



    });
}

function delete_data(val) {

    $(function () {

        if (confirm('Are you sure you want to delete this record permanently?')) {
            $.post(myurls + "pems/apis/propertycard/propertyapi/delete/tbl_user/" + val, function (data) {
                M.toast({
                    html: 'Employee Deleted Permanently'
                });
                selectCompanyEmply(localStorage.companyID);
                selectCompanyEmplyInactive(localStorage.companyID)
            }).fail(function () {
                M.toast({
                    html: 'Process Failed'
                });
            });
        } else {
            M.toast({
                html: 'Delete Cancelled'
            });
        }



    });
}

function verifyCode() {
    let val = $("#vcode").val()
    if (val != "") {
        $.getJSON(myurls + "pems/apis/myapi/select/tbl_companies/fldVerify/" + val, function (data) {
            if (data.length > 0) {
                updateData(val);
                window.alert("Account already verified please login now!");
                window.location.assign("index.html");

            } else {
                window.alert("Invalid Verification Code");
            }
        });
    } else {
        window.alert("Please enter Verification Code");
    }
}

function validateLength(val, valid) {
    if (val.length < 8) {
        $("#" + valid).val("");
        window.alert("Password must be atleast 8 characters");
    }
}

function updateData(val) {
    $.post(myurls + "pems/apis/myapi/update/tbl_companies/fldVerify/" + val, JSON.stringify([{
        fldVerify: "Active"
    }]), function (data) {

    });
}

function resetPass() {
    var thval = Math.random().toString(36).slice(2);
    var email = $("#email").val()
    thval = thval.substring(0, 6);
    validateEm($("#email").val());


    setTimeout(function () {
        if ($("#email").val() != "") {
            updateCode(email, thval);
            sendCode(email, thval);
            window.alert("Password has been reset please check your E-mail address");
            window.location.assign("index.html");
        } else {
            window.alert("Please enter a valid Email-address");
        }
    }, 1000);

}

function resendVerif() {
    var thval = Math.random().toString(36).slice(2);
    var email = $("#emailAdd").val()
    thval = thval.substring(0, 6);
    validateEmAdd($("#emailAdd").val());


    setTimeout(function () {
        if ($("#emailAdd").val() != "") {
            updateCode(email, thval);
            sendVerif(email, thval);
            window.alert("Verification Code has been resend, please check your E-mail address");
            window.location.assign("index.html");

        } else {
            window.alert("Please enter a valid Email-address");
        }
    }, 1000);

}


function updateCode(val, vcode) {
    $.post(myurls + "pems/apis/myapi/update/tbl_companies/fldEmail/" + val, JSON.stringify([{
        fldVerify: vcode
    }]), function (data) {

    });
}

function sendCode(eadd, val) {
    $.post(myurls + "pems/apis/emailverif/forgotpass.php", {
        eadd: eadd,
        vcode: val
    }, function (data) {
        console.log(data);
    });
}

function sendVerif(eadd, val) {
    $.post(myurls + "pems/apis/emailverif/resendverif.php", {
        eadd: eadd,
        vcode: val
    }, function (data) {
        console.log(data);
    });
}

function updatePass() {
    var myx = $(location).attr('search');
    var pwd = $("#pwd").val();
    var cpwd = $("#cpwd").val();
    myx = myx.replace('?vcode=', '');

    if (pwd == cpwd) {
        $.post(myurls + "pems/apis/myapi/update/tbl_companies/fldVerify/" + myx, JSON.stringify([{
            fldVerify: "Active",
            fldPassword: pwd
            }]), function (data) {

        });
        window.alert("Password has been reset, Please login to continue");
        window.location.assign("index.html");
    } else {
        window.alert("Password didn't match");
    }


}



var id = localStorage.companyID;
selectCompany(id)
//EDIT DELETE EMPLOYEE --END--
