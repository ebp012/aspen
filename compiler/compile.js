var calcResult;
		var focusStats;
		var pauseStats;
		var allStats = "LABSIM CURRENT STATISTICS:\n";
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
			var commandEntered = commandTyped.replace(/([^\\])\\/g, "$1");
			// The select command
			if (commandEntered == "select()") {
				chooseElementPrompt()
				/* Do nothing */
			}
			else if (commandEntered.startsWith('select(')) {
				var elementName = commandEntered.substring(7, commandEntered.length - 1);
				selectElement(elementName);
				/* Do nothing */
			}
			else if (commandEntered == "select(&element)") {
				/* Do nothing */
			}
			else if (commandEntered == "select(null)") {
				/* Do nothing */
			}
			else if (commandEntered.startsWith("{definejs:")) {
				var parts = commandEntered.match(/\$(\w+)=(.*?)\//)
				if (parts && parts.length === 3) {
						var variableName = parts[1];
						var value = parts[2];
						window[variableName] = value;
				}
			}
			else if (commandEntered == "print()") {
				alert();
				/* Do nothing */
			}
			else if (commandEntered.startsWith('print("')) {
				var alertText = commandEntered.substring(7, commandEnteredA.length - 2);
				console.log(alertText);
				/* Do nothing */
			}
			else if (commandEntered.startsWith('#')) { // Comments
				/* Do nothing */
			}
			else if (commandEntered.statsWith('note("')) {
				/* Do nothing */
			}	
			else if (commandEntered == "{help}") {
				window.open("http://dev.aeonic.me/Aspen/wiki", "_blank");
			}
			
			else if (commandEntered == "get(version)") {
				console.log("Aspen Alpha 1.7");
			}
			
			else if (commandEntered == "get()") {
				console.log("(void)ERR: Undefined parameter, please specify it; at (main):1:4")
			}
			else if (commandEntered == "{print}") {
				console.log("(void)ERR: Undefined parameter, please specify it; at (main):1:4")
			}
			else if (commandEntered.startsWith("{calc:")) {
				var calcParams = commandEntered.substring(7, commandEntered.length - 1).split(":");
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
				else {

				}
		}
			else {
				// Proceed with other conditions
				if (commandEntered.startsWith("{select:")) {
						return true;
				}
				else {
						clearCmd();
						/* Do nothing */
						return false;
				}
			}
		}
		function writeToConsole(){

		}
		function addNote() {
			var note = prompt("What note would you like to add?");
			document.getElementById("logobox").innerHTML=note;
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

		// Execute a function when the user presses a key on the keyboard
		inputk.addEventListener("keypress", function(event) {
			// If the user presses the "Enter" key on the keyboard
			if (event.key === "Enter") {
				// Cancel the default action, if needed
				event.preventDefault();
				// Trigger the button element with a click
				document.getElementById("doBtn").click();
			}
		});
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
