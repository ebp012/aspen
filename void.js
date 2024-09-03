/* Implementable into any IDE. */

var calcResult;
		var focusStats;
		var pauseStats;
		var allStats = "LABSIM CURRENT STATISTICS:\n";
		function doCmd() {
			checkLabLang();
			writeToConsole("Task succeded");
			var settingStuffs = clearCmd();
		}
		function checkLabLang() { // the compiler for the Void programming language 
			var commandEntered = document.getElementById("commandBlock").innerText;
			commandEntered = commandEntered.trim();
			var commandParts = [];
			var inQuote = false;
			var currentPart = "";
			for (var i = 0; i < commandEntered.length; i++) {
				var char = commandEntered[i];
				if (char === '"' && !inQuote) {
					inQuote = true;
				}
				else if (char === '"' && inQuote) {
					inQuote = false;
				}
				else if (char === " " && !inQuote) {
					commandParts.push(currentPart);
					currentPart = "";
				}
				else {
					currentPart += char;
				}
			}
			if (currentPart.length > 0) {
				commandParts.push(currentPart);
			}

			// The select command
			if (commandEntered == "{select}") {
				chooseElementPrompt()
				focusGame();
			}
			else if (commandEntered.startsWith("{select:")) {
				var elementName = commandEntered.substring(8, commandEntered.length - 1);
				selectElement(elementName);
				focusGame();
			}
			else if (commandEntered == "{select=lookup}"){
				currentElement = "lookup";
			}
			else if (commandEntered == "{select=tool}") {
				chooseToolPrompt();
				focusGame();
			}
			else if (commandEntered.startsWith("{select=tool:")) {
				var toolName = commandEntered.substring(13, commandEntered.length - 1);
				selectElement(toolName);
				focusGame();
			}
			else if (commandEntered == "{select=element}") {
				chooseElementPrompt();
				focusGame();
			}
			else if (commandEntered == "{select=null}") {
				focusGame();
			}
			else if (commandEntered.startsWith("{definejs:")) {
				var parts = commandEntered.match(/\{definejs:(.*?):(.*?)\}/);
				if (parts && parts.length === 3) {
						var variableName = parts[1];
						var value = parts[2];
						window[variableName] = value;
				}
			}
			else if (commandEntered == "{size=down}") {
				mouseSize -= 2;if (mouseSize < 1) { mouseSize = 1; };focusGame();
				focusGame();
			}
			else if (commandEntered == "{size=minimal}") {
				mouseSize =1;if (mouseSize < 1) { mouseSize = 1; };focusGame();
				focusGame();
			}
			else if (commandEntered == "{size=maximal}") {
				mouseSize =150;if (mouseSize < 1) { mouseSize = 1; };focusGame();
				focusGame();
			}

			else if (commandEntered == "{size=low}") {
				mouseSize -= 2;if (mouseSize < 1) { mouseSize = 1; };focusGame();
				focusGame();
			}
			else if (commandEntered == "{repeat=size=low}") {
				mouseSize -= 4;if (mouseSize < 1) { mouseSize = 1; };focusGame();
				focusGame();
			}
			else if (commandEntered == "{loop=size=low}") {
				mouseSize -= 6;if (mouseSize < 1) { mouseSize = 1; };focusGame();
				focusGame();
			}

			else if (commandEntered == "{size=up}") {
				mouseSize += 2;if (mouseSize < 1) { mouseSize = 1; };focusGame();
				focusGame();
			}
			
			else if (commandEntered == "{print}") {
				alert();
				focusGame();
			}
			else if (commandEntered.startsWith('{print:"')) {
				var alertText = commandEntered.substring(8, commandEntered.length - 2);
				console.log(alertText);
				focusGame();
			}
			else if (commandEntered == "{prompt=addNote}") {
				addNote();
				focusGame();
			}
			else if (commandEntered == "{view=full}") {
				if (document.fullscreenElement) {
					document.exitFullscreaen(body);
				} else {
					requestFullScreen(document.body);
				}
				focusStats = false;
			}
			else if (commandEntered == "{view=hide}") {
				document.getElementById("canvasDiv").style.display="none";
				focusStats = false;
			}
			else if (commandEntered == "{view=show}") {
				document.getElementById("canvasDiv").style.display="block";
				focusStats = false;
			}
			else if (commandEntered == "{view=focus}") {
				focusGame();
			}
			else if (commandEntered == "{help}") {
				window.open("https://aeonic.miraheze.org/wiki/LabLang", "_blank");
			}
			else if (commandEntered == "{get=focus}") {
				if (focusStats == false) {
					alert("Focus is set to: false");
				}
				else if (focusStats == true) {
					alert("Focus is set to: true");
				}
				else {
					alert("ERROR: Boolean variable 'focusStats' is not defined as being true or false at (main):1:10")
				}
			}
			else if (commandEntered == "{get=version}") {
				alert("You are playing LabSim 2.7.0.");
			}
			else if (commandEntered == "{get=credits}") {
				alert("LabSim is an online laboratory simulator by Aeonic. It is written by Eshaan Bhargav Patel with small contributions by Pravar Gollamudi, Aaron D'Souza, and Brenden D'Souza.\nLabSim was made as a fork of Sandboxels (https://sandboxels.r74n.com) v1.4 by R74n (http://r74n.com/), and all of the subsequent coding from the persons mentioned above were modifications to Sandboxels.");
			}
			else if (commandEntered == "{get=stats}") {
				if (focusStats == false) {
					allStats += "FOCUS: false\n";
				}
				else if (focusStats == true) {
					allStats += "FOCUS: true\n";
				}
				else {
					allStats += "FOCUS: undefined\n"
				}
				if (pauseStats == false) {
					allStats += "PAUSED: false\n";
				}
				else if (pausedStats == true) {
					allStats += "PAUSED: true\n";
				}
				else {
					allStats += "FOCUS: undefined\n"
				}
				alert(allStats);
			}
			else if (commandEntered == "{get}") {
				alert("ERROR: Undefined parameter, please specify it; at (main):1:4")
			}
			else if (commandEntered == "{print}") {
				alert("ERROR: Item to be gotten left undefined at (main):1:4")
			}
			else if (commandEntered.startsWith("{#mod:")) {
				var modUrl = commandEntered.substring(5).trim();
				importScript(modUrl);
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
								alert(calcResult);
						}
						else if (a < 0 || a > 8) {
								alert("ERROR: Invalid operand, must be between 0 and 8; ERR @ 1:8");
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
						focusStats = false;
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
			document.getElementById("commandBlock").innerHTML="{}";
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
