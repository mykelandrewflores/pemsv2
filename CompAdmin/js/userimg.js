$.getJSON(myUrl+"/pems/apis/myapi/select/tbl_companies/fldCompanyID/"+localStorage.companyID, function(data){
    $("#useravatar").attr("src", data[0].fldLogo);
    $("#usersideavatar").attr("src", data[0].fldLogo);
});