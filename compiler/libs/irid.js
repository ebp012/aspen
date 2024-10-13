function eShow (elename, elename2, elename3, elename4) {
	document.getElementById(elename).style.display="inline-block";
	document.getElementById(elename2).style.display="inline-block";
	document.getElementById(elename3).style.display="inline-block";
	document.getElementById(elename4).style.display="inline-block";
}
function eHide (elename) {
	document.getElementById(elename).style.display="none";
}
function eShowBlock (elename) {
	document.getElementById(elename).style.display="block";
}
function eToggle (elename, display, elename2, display2) {
	if (display == "inline-block") {
		document.getElementById(elename).style.display="inline-block";
		display = "none";
	}
	else if (display == "none") {
		document.getElementById(elename).style.display="none";
		display = "inline-block";
	}
	else if (display == "block") {
		document.getElementById(elename).style.display="block";
		display = "no-block";
	}
	else if (display == "no-block") {
		document.getElementById(elename).style.display="none";
		display = "block";
	}
	else {
		console.log("Irid.JS error: Parameter elename or display are undefined")
	}
	if (display2 == "inline-block") {
		document.getElementById(elename2).style.display="inline-block";
		display = "none";
	}
	else if (display2 == "none") {
		document.getElementById(elename2).style.display="none";
		display = "inline-block";
	}
	else if (display2 == "block") {
		document.getElementById(elename2).style.display="block";
		display = "no-block";
	}
	else if (display2 == "no-block") {
		document.getElementById(elename2).style.display="none";
		display = "block";
	}
	else {
		console.log("Irid.JS warning: Parameter elename2 and/or display2 are undefined\nIgnore this message if not provided on purpose in which case nothing will happen.")
	}
}
function eBoolShowBlock (condition, elename) {
	if (condition == true) {
		document.getElementById(elename).style.display="block";
	}
	else if (condition == false) {
		document.getElementById(elename).style.display="none";
	}
}
function eBoolShow (condition, elename) {
	if (condition == true) {
		document.getElementById(elename).style.display="inline-block";
	}
	else if (condition == false) {
		document.getElementById(elename).style.display="none";
	}
}
function eDefaultTimeout (timeout) {
	var edt = timeout;
}
function easyRand (high, low, varval) {
	var easyRand123 = Math.floor(Math.random() * high) + low;
	return easyRand123;
}
function eToggle (elename) {
  var x = document.getElementById(elename);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function eInline (elename) {
  var x = document.getElementById(elename);
  if (x.style.display === "none") {
    x.style.display = "inline-block";
  } else {
    x.style.display = "none";
  }
}
function eOpen (site) {
	window.open(site, "_self");
}
function eOpenTab (site) {
	window.open(site, "_blank");
}
function eOpenParent (site) {
	window.open(site, "_parent");
}
function eOpenGrandparent (site) {
	window.open(site, "_mother");
}
