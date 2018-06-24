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
	});
	$('#change_green').click(function() {
		localStorage.setItem("primary", "#30ba40");
		localStorage.setItem("secondary", "#a3de83");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
	});
	$('#change_red').click(function() {
		localStorage.setItem("primary", "#f44336");
		localStorage.setItem("secondary", "#ef5350");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
	});
	$('#change_orange').click(function() {
		localStorage.setItem("primary", "#ff9800");
		localStorage.setItem("secondary", "#ffa726");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
	});
	$('#change_indigo').click(function() {
		localStorage.setItem("primary", "#3f51b5");
		localStorage.setItem("secondary", "#5c6bc0");
		localStorage.setItem("btn", "blue");
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
	});
	function loadColor() {
		var primary = localStorage.getItem("primary");
		var secondary = localStorage.getItem("secondary");
		var btn = localStorage.getItem("btn");
		$(":root").get(0).style.setProperty("--primary-color", primary);
		$(":root").get(0).style.setProperty("--secondary-color", secondary);
	}
});