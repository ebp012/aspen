var calcResult;
var focusStats;
var pauseStats;
function doCmd() {
	checkLabLang();
	writeToConsole("Task succeded");
	var settingStuffs = clearCmd();
}
function printVoid(text) {
	// Print text
	console.log(text);
}
function errVoid(text) {
	// Error handling output
	console.log(text);
}
function checkLabLang() { // the compiler for the Void programming language 
	var commandTyped = document.getElementById("commandBlock").innerText;
  	var commandProcessed = commandTyped.replace(/([^\\])\\/g, "$1")
	var commandEntered = commandProcessed.replace(/[\t\n]/g, "");
	if (commandEntered == "select();") {
		
	}
	else if (commandEntered.startsWith('select("')) {
		var elementName = commandEntered.substring(7, commandEntered.length - 3);
	}
	else if (commandEntered == "print();") {
		console.log();
	}
	else if (commandEntered.startsWith('print("')) {
		var alertText = commandEntered.substring(7, commandEntered.length - 3);
		console.log(alertText);
	}
	else if (commandEntered.startsWith('#')) { // Invisible Comments
		
	}
	else if (commandEntered.startsWith('note("')) { // Visible Comments
		
	}
	else if (commandEntered == "get(aspen.version);") {
		console.log("Aspen Alpha 1.7");
	}
	else if (commandEntered == "get();") {
		console.log("(void)ERR: Undefined parameter, please specify it; at (main):1:4")
	}
		
	else if (commandEntered.startsWith("calc('")) {
		var calcParams = commandEntered.substring(7, commandEntered.length - 3).split(":");
		if (calcParams.length >= 4 && calcParams.length <= 6) {
				var a = parseInt(calcParams[0]);
				var t = parseInt(calcParams[1]);
				var m = parseFloat(calcParams[2]);
				var n = parseFloat(calcParams[3]);
				var o = parseFloat(calcParams[4]);
				var p = parseFloat(calcParams[5]);

				if (a >= 0 && a <= 4) {
						if (a === 1 && (t === 7 || t === 8)) {
								calcResult = calculateSingleTermOperation(t, m);
						}
						else if (a === 1 && t < 7) {
								alert("Invalid calculation");
						}
						else if (a === 2) {
								calcResult = calculateBinaryOperation(t, m, n);
						}
						else if (a === 3) {
								calcResult = calculateTernaryOperation(t, m, n, o);
						}
						else if (a === 4) {
								calcResult = calculateQuaternaryOperation(t, m, n, o, p);
						}
						printVoid(calcResult);
				}
				else if (a < 0 || a > 8) {
						printVoid("(void)ERR: Invalid operand, must be between 0 and 8; at (main)1:8");
				}
		}
	}

	else {
		clearCmd();
		focusStats = false;
		return false;
	}
}

function clearCmd() {
	document.getElementById("commandBlock").innerHTML="";
}
function calculateSingleTermOperation(operation, term) {
		switch (operation) {
				case 7: // Factorial
						return factorial(term);
				case 8: // Square root
						return Math.sqrt(term);
				default:
						return null;
		}
}

function calculateBinaryOperation(operation, term1, term2) {
		switch (operation) {
				case 0: // Addition
						return term1 + term2;
				case 1: // Subtraction
						return term1 - term2;
				case 2: // Multiplication
						return term1 * term2;
				case 3: // Division
						return term1 / term2;
				case 4: // Modulus
						return term1 % term2;
				case 5: // Exponentiation
						return Math.pow(term1, term2);
				case 6: // Tetration
						return tetration(term1, term2);
				default:
						return null;
		}
}
function calculateTernaryOperation(operation, term1, term2, term3) {
		switch (operation) {
				case 0: // Addition
						return term1 + term2 + term3;
				case 1: // Subtraction
						return term1 - term2 - term3;
				case 2: // Multiplication
						return term1 * term2 * term3;
				case 3: // Division
						return (term1 / term2) / term3;
				case 5: // Exponentiation
						return term1 ** (term2 ** term3);
				default:
						return null;
		}
}
function calculateQuaternaryOperation(operation, term1, term2, term3) {
		switch (operation) {
				case 0: // Addition
						return term1 + term2 + term3 + term4;
				case 1: // Subtraction
						return term1 - term2 - term3 - term4;
				case 2: // Multiplication
						return term1 * term2 * term3 * term4;
				case 3: // Division
						return term1 / (term2 * term3 * term4);
				case 5: // Exponentiation
						return term1 ** (term2 ** (term3 ** term4));
				default:
						return null;
		}
}
function tetration(a, b) {
		if (b === 1) {
				return a;
		}
		return Math.pow(a, tetration(a, b - 1));
}
// Get the input field
var inputk = document.getElementById("commandBlock");

var isExpanded = false;

function toggleExpand() {
		isExpanded = !isExpanded;
		var commandContainer = document.getElementById("commandContainer");
		commandContainer.classList.toggle("cmdExpand", isExpanded);
		var commandBlock = document.getElementById("commandBlock");
		commandBlock.classList.toggle("cmdExpandBox", isExpanded);
		var commandConsole = document.getElementById("cmdConsole");
		commandConsole.classList.toggle("cmdConsole", isExpanded);
}
