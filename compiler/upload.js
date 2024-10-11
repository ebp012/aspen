function readFile() {
	let fileInput = document.getElementById("codeUpload");
	let textArea = document.getElementById("commandBlock");
	let inputFile = fileInput.files;
	const file = inputFile[0];
	let reader = new FileReader();
	reader.onload = (e) => {
		const file = e.target.result;
		const lines = file.split(/\r\n|\n/);
		textArea.innerText = lines.join('\n');
	}
	reader.readAsText(file);
}
