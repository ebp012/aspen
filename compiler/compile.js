var calcResult;
var aspenConsole = document.getElementById("aspenConsole");
var variableStore = {};

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

function checkLabLang(commandPreEnter) {
	var command = commandPreEnter
		.replace(/^/g, "^^") // Make ^ the exponentiation operator
		.replace(/`/g, "clear();"); // Make the backtick a shorthand for clearing the screen
	// Variables
	if (commandEntered.startsWith("$")) {
		var assignment = commandEntered.substring(1).split("=");
		var varName = assignment[0].trim();
		var varValue = assignment[1].trim();		
		variableStore[varName] = eval(varValue);
	}
	
	// Print routine
	else if (commandEntered.startsWith("print") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(5, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.print(evaluatedExpression);
	}
	
	// Note routine
	else if (commandEntered.startsWith("note(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(5, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.note(evaluatedExpression);
	}

	// Warn routine, which for now prints text in yellow, but will eventually just make a log file of errors
	else if (commandEntered.startsWith("warn(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(5, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.warn(evaluatedExpression);
	}

	// Log routine, logs to console rather than to GUI
	else if (commandEntered.startsWith("log(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(5, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.warn(evaluatedExpression);
	}

	// Sleep routine, pause execution for expression number of seconds
	else if (commandEntered.startsWith("sleep(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.sleep(evaluatedExpression);
	}

	// Time routine, continuously print time
	else if (commandEntered == "time()") {
		aspen.time();
	}

	// Instant routine, note the time at the current instant
	else if (commandEntered == "instant()") {
		aspen.instant();
	}

	// Color routine, change color of text in the console to any HEX color
	else if (commandEntered.startsWith("color(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.color(evaluatedExpression);
	}

	// Bgcolor routine, change background color of text in the console to any HEX color
	else if (commandEntered.startsWith("bgcolor(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.bgcolor(evaluatedExpression);
	}

	// Clear routine, clear the entire console
	else if (commandEntered == "clear()") {
		aspen.clear();
	}

	// Repeat loops (finite)
	else if (commandEntered.startsWith("repeat") && commandEntered.includes("{") && commandEntered.includes("(") && commandEntered.includes(")")) {
		var subcommands = commandEntered.split(/(?:\n[ \t]|,)+/);
		// Process each sub-command
		for (var i = 0; i < subcommands.length; i++) {
			var subcommand = subcommands[i].trim();
			if (subcommand.length > 0) {
				// Extract number of repetitions (inside the parentheses)
				var openParen = commandEntered.indexOf("(");
				var closeParen = commandEntered.indexOf(")");
				var repetitions = evalExpression(commandEntered.substring(openParen + 1, closeParen).trim());
				
				if (repetitions < 0 || repetitions % 1 != 0) {
					aspen.warn("The repeat loop repeats an invalid number of times. The number of repeats must be a whole number.");
				}
				else {
					// Extract the block of code (inside the curly braces)
					var blockStart = commandEntered.indexOf("{");
					var blockEnd = commandEntered.lastIndexOf("}");
					var codeBlock = commandEntered.substring(blockStart + 1, blockEnd).trim();
					
					// Execute the code block the specified number of times
					for (var j = 0; j < repetitions; j++) {
						checkLabLang(codeBlock);  // Evaluate the block for each iteration
					}
				}
			}
		}
	}

	// Repeat loops (infinite)
	else if (commandEntered.startsWith("repeat") && commandEntered.includes("{")) {
		// Extract the block of code (inside the curly braces)
		var blockStart = commandEntered.indexOf("{");
		var blockEnd = commandEntered.lastIndexOf("}");
		var codeBlock = commandEntered.substring(blockStart + 1, blockEnd).trim();
		
		// Execute the code block the specified number of times
		while (true) {
			checkLabLang(codeBlock);  // Evaluate the block for each iteration
		}
	}

	// While loops
	else if (commandEntered.startsWith("while") && commandEntered.includes("{") && commandEntered.includes("(") && commandEntered.includes(")")) {
		var openParen = commandEntered.indexOf("(");
		var closeParen = commandEntered.indexOf(")");
		var condition = commandEntered.substring(openParen + 1, closeParen).trim();
		
		// Extract the block of code (inside the curly braces)
		var blockStart = commandEntered.indexOf("{");
		var blockEnd = commandEntered.lastIndexOf("}");
		var codeBlock = commandEntered.substring(blockStart + 1, blockEnd).trim();
		
		// Execute the block of code while the condition is true
		while (evalExpression(condition)) {
			checkLabLang(codeBlock);  // Evaluate the block for each iteration
		}
	}

	// Until loops
	else if (commandEntered.startsWith("until") && commandEntered.includes("{") && commandEntered.includes("(") && commandEntered.includes(")")) {
		var openParen = commandEntered.indexOf("(");
		var closeParen = commandEntered.indexOf(")");
		var condition = commandEntered.substring(openParen + 1, closeParen).trim();
		
		// Extract the block of code (inside the curly braces)
		var blockStart = commandEntered.indexOf("{");
		var blockEnd = commandEntered.lastIndexOf("}");
		var codeBlock = commandEntered.substring(blockStart + 1, blockEnd).trim();
		
		// Execute the block of code until the condition becomes true
		while (!evalExpression(condition)) {
			checkLabLang(codeBlock);  // Evaluate the block for each iteration
		}
	}

	// Conditionals (if/elif/else)
	else if (commandEntered.startsWith("if") && commandEntered.includes("{") && commandEntered.includes("(") && commandEntered.includes(")")) {
		var openParen = commandEntered.indexOf("(");
		var closeParen = commandEntered.indexOf(")");
		var condition = commandEntered.substring(openParen + 1, closeParen).trim();
		
		// Extract the block of code (inside the curly braces)
		var blockStart = commandEntered.indexOf("{");
		var blockEnd = commandEntered.lastIndexOf("}");
		var codeBlock = commandEntered.substring(blockStart + 1, blockEnd).trim();
		
		// Execute the block of code if the condition is true
		if (evalExpression(condition)) {
			checkLabLang(codeBlock);  // Evaluate the block
		}
	}
	else if (commandEntered.startsWith("elif") && commandEntered.includes("{") && commandEntered.includes("(") && commandEntered.includes(")")) {
		var openParen = commandEntered.indexOf("(");
		var closeParen = commandEntered.indexOf(")");
		var condition = commandEntered.substring(openParen + 1, closeParen).trim();
		
		// Extract the block of code (inside the curly braces)
		var blockStart = commandEntered.indexOf("{");
		var blockEnd = commandEntered.lastIndexOf("}");
		var codeBlock = commandEntered.substring(blockStart + 1, blockEnd).trim();
		
		// Check if the previous condition was false (assumed tracked elsewhere)
		// Execute elif block only if condition is true and the previous if/elif was false
		if (!previousConditionMet && evalExpression(condition)) {
			checkLabLang(codeBlock);  // Evaluate the block
			previousConditionMet = true;  // Mark this branch as executed
		}
	}
	
	else if (commandEntered.startsWith("else") && commandEntered.includes("{")) {
		// Extract the block of code (inside the curly braces)
		var blockStart = commandEntered.indexOf("{");
		var blockEnd = commandEntered.lastIndexOf("}");
		var codeBlock = commandEntered.substring(blockStart + 1, blockEnd).trim();
		
		// Execute the else block only if all previous conditions were false
		if (!previousConditionMet) {
			checkLabLang(codeBlock);  // Evaluate the block
		}
	}

			
	// Comments
	else if (commandEntered.startsWith("#")) {
		// Do nothing (comments are ignored)
	}
		
	// Handle other unrecognized commands
	else {
		aspen.warn("(void)ERR: Command not recognized; at (main):1:1");
	}
	
}

/*function evalExpression(expression) {
	// Replace variables with their values from variableStore, if they exist
	return eval(expression.replace(/\b\w+\b/g, function(match) {
		// If it's a variable in variableStore, replace it with the stored value
		return variableStore.hasOwnProperty(match) ? `variableStore['${match}']` : match;
	}));
}*/

function evalExpression(expression) {
	// Replace variables with their values from variableStore, if they exist
	expression = expression.replace(/\b\w+\b/g, function(match) {
		return variableStore.hasOwnProperty(match) ? `variableStore['${match}']` : match;
	});

	// Handle the tilde (~) as a NOR operator
	// This regular expression looks for two operands (A ~ B) and replaces with !(A || B)
	expression = expression.replace(/(\w+)\s*~\s*(\w+)/g, '!($1 || $2)');

	return eval(expression);
}

function clearCmd() {
	document.getElementById("commandBlock").innerHTML = "";
}
