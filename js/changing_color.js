$(document).ready(function() {
	loadColor();
	$('#change_blue').click(function() {
		localStorage.setItem("primary", "#2196f3");
		localStorage.setItem("secondary", "#1e88e5");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
		changeTheme(primary,secondary);
	});
	$('#change_green').click(function() {
		localStorage.setItem("primary", "#30ba40");
		localStorage.setItem("secondary", "#a3de83");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
		changeTheme(primary,secondary);
	});
	$('#change_red').click(function() {
		localStorage.setItem("primary", "#f44336");
		localStorage.setItem("secondary", "#ef5350");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
		changeTheme(primary,secondary);
	});
	$('#change_orange').click(function() {
		localStorage.setItem("primary", "#ff9800");
		localStorage.setItem("secondary", "#ffa726");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
		changeTheme(primary,secondary);
	});
	$('#change_indigo').click(function() {
		localStorage.setItem("primary", "#3f51b5");
		localStorage.setItem("secondary", "#5c6bc0");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
		changeTheme(primary,secondary);
	});
	function loadColor() {
		$.get("http://gordoncollegeccs-ssite.net/pems/apis/myapi/select/tbl_theme/fldCompannyID/"+localStorage.getItem("companyID"), function(data) {
			if(data.length === 0) {
				return false;
			}else {
				$(":root").get(0).style.setProperty("--primary-color", data[data.length - 1].fldPrimary);
				$(":root").get(0).style.setProperty("--secondary-color", data[data.length - 1].fldSecondary);
			}
		});
	}
	function changeTheme(primary, secondary) {
		var theme = {fldCompannyID: localStorage.getItem("companyID"), fldPrimary: primary, fldSecondary: secondary};
		console.log(theme)
		$.post("http://gordoncollegeccs-ssite.net/pems/apis/myapi/insert/tbl_theme", JSON.stringify([theme]), function(res) {
			console.log(res);
		});
	}
});