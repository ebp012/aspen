#include <iostream>
#include <string>
using namespace std;

class Aspen {
    public:
        string aspenConsole;
	// Output Routines
		// Print text with newlines
		int print (string text) {
			aspenConsole += "\n" + text + "\n";
		}
		// Print text without newlines
		int note (string text) {
			aspenConsole += text;
		}		
		// Warn users
		int warn (string text) {
			aspenConsole += "<p style='color: gold;'>" + text + "</p><br/>";
		}
		// Warn users
		int log (string text) {
			cout << text;
		}
	
	// Basic Functions
		// Sleep for a specified amount of seconds
		/*sleep: function (time) {
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
		},*/
	
	// Console Routines
		// Change console text colour
		/*color: function (colour) {
			aspenConsole.style.color = colour;
		},
		// Change console background colour
		bgcolor: function (colour) {
			aspenConsole.style.backgroundColor = colour;
		},*/
		// Clear the console
		int clear () {
			aspenConsole = "";
		}
};
