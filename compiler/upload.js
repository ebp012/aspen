const input = document.querySelector("input[type=file]");

function uploadAspen () {
	const reader = new FileReader();
	
	reader.onload = function (e) {
		uploadTxt = e.target.result; // Save contents to variable uploadTxt
		
		if (uploadTxt != undefined) {
			console.log(uploadTxt); // Put debug info in console
		}
		else {
			console.log("File upload failed");
		}
		
		document.getElementById("commandBlock").innerHTML = uploadTxt; // Retrieve it
	};
}
