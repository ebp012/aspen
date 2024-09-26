var calcResult;
var aspenConsole = document.getElementById("aspenConsole");
var variableStore = {};
var functionStore = {};  // Store for user-defined functions

function clearConsole() {
    aspenConsole.innerText = "";
}

function doCmd() {
    // Get the command block content
    var commandBlockText = document.getElementById("commandBlock").innerText;
    // Split commands by semicolons or newlines
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
    // Handle function declaration (e.g., ~HelloWorld() { print("Hello, world!"); })
    if (commandEntered.startsWith("~") && commandEntered.includes("{") && commandEntered.endsWith("}")) {
        let funcHeader = commandEntered.substring(1, commandEntered.indexOf("{")).trim();
        let funcBody = commandEntered.substring(commandEntered.indexOf("{") + 1, commandEntered.length - 1).trim();
        
        let funcName = funcHeader.split("(")[0].trim();
        functionStore[funcName] = funcBody;  // Store function body
        
    } 
    // Handle function invocation (e.g., HelloWorld();)
    else if (functionStore.hasOwnProperty(commandEntered.split("(")[0].trim())) {
        let funcName = commandEntered.split("(")[0].trim();
        let funcBody = functionStore[funcName];
        checkLabLang(funcBody);  // Execute the function body
    }
    // Handle variable declarations (e.g., $a = "hello";)
    else if (commandEntered.startsWith("$")) {
        var assignment = commandEntered.substring(1).split("=");
        var varName = assignment[0].trim();
        var varValue = assignment[1].trim();
        
        // Store the variable in the variableStore object
        variableStore[varName] = eval(varValue);  // Safely store the evaluated value
    }
    // Handle the print() function (e.g., print("hello");)
    else if (commandEntered.startsWith("print(") && commandEntered.endsWith(")")) {
        // Extract the expression inside print()
        var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
        
        // Evaluate the expression safely, substituting variables from variableStore
        var evaluatedExpression = evalExpression(expression);
        
        // Print the evaluated result
        printVoid(evaluatedExpression);
    }
    // Handle the note() function similarly to print()
    else if (commandEntered.startsWith("note(") && commandEntered.endsWith(")")) {
        var expression = commandEntered.substring(5, commandEntered.length - 1).trim();
        var evaluatedExpression = evalExpression(expression);
        printVoid(evaluatedExpression);
    }
    // Handle comments (e.g., # This is a comment)
    else if (commandEntered.startsWith("#")) {
        // Do nothing (comments are ignored)
    }
    // Handle other unrecognized commands
    else {
        errorVoid("(void)ERR: Command not recognized; at (main):1:1");
    }
}

function evalExpression(expression) {
    // Replace variables with their values from variableStore, if they exist
    return eval(expression.replace(/\b\w+\b/g, function(match) {
        // If it's a variable in variableStore, replace it with the stored value
        return variableStore.hasOwnProperty(match) ? `variableStore['${match}']` : match;
    }));
}

function clearCmd() {
    document.getElementById("commandBlock").innerHTML = "";
}

/*var calcResult;
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

function printVoid(text) {
	// Print text to the console
	aspenConsole.innerText += "\n" + text;
}

function errorVoid(text) {
	// Log errors
	console.log(text);
}

function checkLabLang(commandEntered) {
	// Handle variable declarations (e.g., $a = "hello";)
	if (commandEntered.startsWith("$")) {
		var assignment = commandEntered.substring(1).split("=");
		var varName = assignment[0].trim();
		var varValue = assignment[1].trim();
		
		// Store the variable in the variableStore object
		variableStore[varName] = eval(varValue);  // Safely store the evaluated value
	}
	
	// Handle the print() function (e.g., print("hello");)
	else if (commandEntered.startsWith("print(") && commandEntered.endsWith(")")) {
		// Extract the expression inside print()
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		
		// Evaluate the expression safely, substituting variables from variableStore
		var evaluatedExpression = evalExpression(expression);
		
		// Print the evaluated result
		printVoid(evaluatedExpression);
	}
	
	// Handle the note() function similarly to print()
	else if (commandEntered.startsWith("note(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(5, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		printVoid(evaluatedExpression);
	}
	
	// Handle comments (e.g., # This is a comment)
	else if (commandEntered.startsWith("#")) {
		// Do nothing (comments are ignored)
	}
	
	// Handle other unrecognized commands
	else {
		errorVoid("(void)ERR: Command not recognized; at (main):1:1");
	}
}

function evalExpression(expression) {
	// Replace variables with their values from variableStore, if they exist
	return eval(expression.replace(/\b\w+\b/g, function(match) {
		// If it's a variable in variableStore, replace it with the stored value
		return variableStore.hasOwnProperty(match) ? `variableStore['${match}']` : match;
	}));
}

function clearCmd() {
	document.getElementById("commandBlock").innerHTML = "";
}*/
