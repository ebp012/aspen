const input = document.querySelector("input[type=file]");

function uploadAspen() {
	// Check if a file has been selected
	if (input.files.length === 0) {
		console.log("No file selected");
		return; // Exit the function if no file is selected
	}
	
	const reader = new FileReader();
	
	reader.onload = function(e) {
		const uploadTxt = e.target.result; // Save contents to variable uploadTxt
		
		if (uploadTxt !== undefined) {
			console.log(uploadTxt); // Put debug info in console
			document.getElementById("commandBlock").innerHTML = uploadTxt; // Retrieve it
		} else {
			console.log("File upload failed");
		}
	};

	// Read the file as text
	reader.readAsText(input.files[0]);
}
