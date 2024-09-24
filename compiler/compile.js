var calcResult;
var aspenConsole = document.getElementById("aspenConsole");
var variableStore = {}

function clearConsole() {
	aspenConsole.innerText = "";
}

function doCmd() {
	// Get the command block content
	var commandBlockText = document.getElementById("commandBlock").innerText;
	// Split commands by semicolons
	var commands = commandBlockText.split(/[\n;]+/);
	
	// Process each command
	for (var i = 0; i < commands.length; i++) {
		var command = commands[i].trim();
		if (command.length > 0) {
		    checkLabLang(command);  // Interpret each command
		}
	}
}

function printVoid(text) {
	// Print text to the console
	aspenConsole.innerText += "\n" + text;
}

function errorVoid(text) {
	// Log errors
	console.log(text);
}

function checkLabLang(commandEntered) {
	if (commandEntered.startsWith("$")) {
		// Remove the $ and treat it as a variable declaration
		var assignment = commandEntered.substring(1).split("=");
		var varName = assignment[0].trim();
		var varValue = assignment[1].trim();
		
		// Store the variable in the variableStore object
		variableStore[varName] = eval(varValue);  // Safely store evaluated value
		
	}
	else if (commandEntered.startsWith("print(") && commandEntered.endsWith(")")) {
		// Extract the expression inside print()
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		
		// Evaluate the expression using variables from the variableStore
		var evaluatedExpression = eval(expression.replace(/\b\w+\b/g, function(match) {
			return variableStore.hasOwnProperty(match) ? `variableStore['${match}']` : match;
		}));
	
		// Print the evaluated result
		printVoid(evaluatedExpression);
		
	}
	else if (commandEntered.startsWith("note(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1);
		var jsCode = 'aspenConsole.innerText += ' + expression + ';';
		eval(jsCode);  // Evaluate the generated JavaScript code
	}
	// Handle comments
	else if (commandEntered.startsWith("#")) {
		// Do absolutely nothing
		// Comments just explain code anyway
	}	
	// Handle other commands or errors
	else {
		errorVoid("(void)ERR: Command not recognized; at (main):1:1");
		var expression = commandEntered.substring(0, commandEntered.length - 1);
		var jsCode += expression;
		eval(jsCode);  // Evaluate the generated JavaScript code
	}
}

function clearCmd() {
	document.getElementById("commandBlock").innerHTML = "";
}

// Example usage when "Do" button is clicked
document.getElementById("dobtn").addEventListener("click", doCmd);


/*var calcResult;
var aspenConsole = document.getElementById("aspenConsole");
var jsCode = 'document.getElementById("aspenConsole");';

function clearConsole() {
	aspenConsole.innerText = "";
}

function doCmd() {
	// Get the command block content
	var commandBlockText = document.getElementById("commandBlock").innerText;
	// Split commands by semicolons
	var commands = commandBlockText.split(/[\n;]+/);
	
	// Process each command
	for (var i = 0; i < commands.length; i++) {
		var command = commands[i].trim();
		if (command.length > 0) {
		    checkLabLang(command);  // Interpret each command
		}
	}
}

function printVoid(text) {
	// Print text to the console
	aspenConsole.innerText += "\n" + text;
}

function errorVoid(text) {
	// Log errors
	console.log(text);
}

function checkLabLang(commandEntered) {
	// Process variable declarations and assignments (e.g., $a = "hello";)
	if (commandEntered.startsWith("$")) {
		// Remove the $ and treat it as a variable declaration
		var assignment = commandEntered.substring(1).replace("=", " = ");
		jsCode += "var " + assignment;
		eval(jsCode);  // Evaluate the generated JavaScript code
	}

	// Comments
	else if (commandEntered.startsWith("#")) {
		// Do nothing
	}

	// Process the print function (e.g., print(a + " world");)
	else if (commandEntered.startsWith("print(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1);
		jsCode += 'aspenConsole.innerText += "\\n" + ' + expression + ';';
		eval(jsCode);  // Evaluate the generated JavaScript code
	}

	// Note function
	else if (commandEntered.startsWith("note(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1);
		jsCode += 'aspenConsole.innerText += "\\n" + ' + expression + ';';
		eval(jsCode);  // Evaluate the generated JavaScript code
	}

	// Handle other commands or errors
	else {
		jsCode += 'aspenConsole.innerText += ' + expression + ';';
		errorVoid("(void)ERR: Command not recognized; at (main):m:n");
	}
}

function clearCmd() {
	document.getElementById("commandBlock").innerHTML = "";
}

// Example usage when "Do" button is clicked
document.getElementById("dobtn").addEventListener("click", doCmd);
*/
