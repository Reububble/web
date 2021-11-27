var when = function (obj, eve, fun) {
	obj.addEventListener ?
		obj.addEventListener(eve, fun) :
		obj.attachEvent && obj.attachEvent("on" + eve, fun);
}

function xhr(url, b, loader, params) {
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onload = function(a) {
		console.log("received "+a);
		loader(a.target.response);
	};
	console.log("sending POST to "+url+" with "+params);
	xmlhttp.open("POST", url, b);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
}

var modified = function () {
	xhr("modified.php", true, answer, "");
}

var answer = function (response) {
	var el = document.getElementById("modified");
	el.innerHTML = response;
}

modified();
