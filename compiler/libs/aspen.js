var promptID = 1;
var inputStatus = true;
var aspen = {
	// Input/Output Routines
		// Print text with newlines
		print: function (text) {
			aspenConsole.innerText += "\n" + text + "\n";
		},
		// Print text without newlines
		note: function (text) {
			aspenConsole.innerText += text;
		},		
		// Warn users
		warn: function (text) {
			aspenConsole.innerHTML += "<p style='color: gold;'>" + text + "</p><br/>";
		},
		// Warn users
		log: function (text) {
			console.log(text);
		},
    // Scan inputted text as a text input
    take: function (text, placeholder = "") {
      inputStatus = false;
      aspenConsole.innerHTML += "<input type='text' placeholder='" + placeholder + "' id='prompt" + promptID + "' class='userinput' /><input type='submit' onclick='aspen.submitInput();'/>";
      document.getElementById('prompt' + id).value;
    },
    submitInput: function () {
      inputStatus = true;
    },
    // Return inputted text
    info: function (id) {
      if (id >= 1) {
        return document.getElementById('prompt' + (promptID - 1)).value;
      }
      else {
        return document.getElementById('prompt' + id).value;
      }
    },
	// Basic Functions
		// Sleep for a specified amount of seconds
		sleep: function (time) {
			return new Promise(resolve => setTimeout(resolve, time * 1000));
		},
		// Get the current time and continuously append it
		time: function () {
			setInterval(function() {
				aspenConsole.innerText += new Date().toLocaleTimeString() + "\n";
			}, 1000);
		},
		// Get the time at the instant the routine is run
		instant: function () {
			aspenConsole.innerText += new Date().toLocaleTimeString() + "\n";
		},
	// Array Routines
    arrayPlus: function(arr1, arr2) {
      if (arr1.length !== arr2.length) {
          aspen.warn("Arrays or complex numbers must be the same size.")
      }

      return arr1.map((value, index) => value + arr2[index]);
    },
    arrayMinus: function(arr1, arr2) {
      if (arr1.length !== arr2.length) {
          aspen.warn("Arrays or complex numbers must be the same size.")
      }

      return arr1.map((value, index) => value - arr2[index]);
    },
    toComplex: function(a, b) {
      if (!(a == 0 || a == null) && (b == 0 || b == null)) {
        return [1, a, 0];
      }
      else if (!(b != 0 || b == null) && (a == 0 || a == null)) {
        return [2, 0, b];
      }
    },
	// Console Routines
		// Change console text colour
		color: function (colour) {
			aspenConsole.style.color = colour;
      return colour;
		},
		// Change console background colour
		bgcolor: function (colour) {
			aspenConsole.style.backgroundColor = colour;
      return colour;
		},
		// Clear the console
		clear: function () {
			aspenConsole.innerText = "";
		}
}