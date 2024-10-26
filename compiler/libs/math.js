var math = {
	// Quadratic Functions
	quad: {
		// Find zeroes of a quadratic function
		zeroM: function (a, b, c) {
			return (-b - Math.sqrt(b**2 - (4 * a * c) )) / (2 * a);
		},
		zeroP: function (a, b, c) {
			return (-b + Math.sqrt(b**2 - (4 * a * c) )) / (2 * a);
		},
		// Factor quadratics and output a string
		factor: function (a, b, c) {
			var p = math.quad.zeroM(a, b, c);
			var q = math.quad.zeroP(a, b, c);
			return "(x-" + p + ")(x-" + q + ")";
		},
		// Detect or solve difference of perfect squares
		dops: function (a, b, c, factor) {
			if (Math.sqrt(a) % 1 == 0 && b == 0 && c < 0 && Math.sqrt(c) % 1 == 0) {
				return true;
			}
			else {
				return false;
			}
		},
	},
	// Cubic Functions
	cube: {
		dopc: function (a, b, c, d) {
			if (Math.cbrt(a) % 1 == 0 && b == 0 && c == 0 && d < 0 && Math.cbrt(d) % 1 == 0) {
				return -1;
			}
			else if (Math.cbrt(a) % 1 == 0 && b == 0 && d < 0 && Math.cbrt(d) % 1 == 0) {
				return 1;
			}
			else {
				return 0;
			}
		}
	},
	// Complex Numbers
	complex: {
		plus: function (a1, b1, a2, b2, datatype) {
			if (datatype != "string") {
				return [2, a1 + a2, b1 + b2];
			}
			else {
				if (b1 + b2 < 0) {
					return (a1 + a2) + "-" + (-b1 - b2) + "i";
				}
				else {
					return (a1 + a2) + "+" + (b1 + b2) + "i";
				}
			}
		},
		minus: function (a1, b1, a2, b2, datatype) {
			if (datatype != "string") {
				return [2, a1 - a2, b1 - b2];
			}
			else {
				if (b1 + b2 < 0) {
					return (a1 + a2) + "+" + (-b1 + b2) + "i";
				}
				else {
					return (a1 + a2) + "-" + (b1 - b2) + "i";
				}
			}
		},
		times: function (a, b, c, d, datatype) {
			if (datatype != "string") {
				// (a + bi)(c + di)
				// ac + adi + bci + bdi^2
				// ((a*c) + (a*d) - (b*d)) + (b*c)i
				return [2, (a*c) + (a*d) - (b*d), b*c];
			}
			else {
				return ((a*c) + (a*d) - (b*d)) + (b * c) + "i";
			}
		},
	},
	trig: {
		// Regular functions (12)
		sin: function(theta) { return Math.sin(theta); }, // sine
		cos: function(theta) { return Math.cos(theta); }, // cosine
		tan: function(theta) { return Math.tan(theta); }, // tangent
		csc: function(theta) { return 1/(Math.sin(theta)); }, // cosecant
		sec: function(theta) { return 1/(Math.cos(theta)); }, // secant
		cot: function(theta) { return 1/(Math.tan(theta)); }, // cotangent
		vsn: function(theta) { return 1-(Math.sin(theta)); }, // versine
		cvs: function(theta) { return 1-(Math.cos(theta)); }, // coversine
		xsc: function(theta) { return (math.trig.sec(theta)) - 1; }, // exsecant
		xcc: function(theta) { return (math.trig.csc(theta)) - 1; }, // excosecant
		crd: function(theta) { return Math.sqrt((math.trig.sin(theta) ** 2) + (math.trig.vsn(theta) ** 2)); }, // chord
		arc: function(theta) { return theta * 2 * Math.pi; }, // arc
		// Hyperbolic functions (12)
		sinh: function(theta) { return Math.sinh(theta); }, // hyperbolic sine
		cosh: function(theta) { return Math.cosh(theta); }, // hyperbolic cosine
		tanh: function(theta) { return Math.tanh(theta); }, // hyperbolic tangent
		csch: function(theta) { return 1/(Math.sinh(theta)); }, // hyperbolic cosecant
		sech: function(theta) { return 1/(Math.cosh(theta)); }, // hyperbolic secant
		coth: function(theta) { return 1/(Math.tanh(theta)); }, // hyperbolic cotangent
		vsnh: function(theta) { return 1-(Math.sinh(theta)); }, // hyperbolic versine
		cvsh: function(theta) { return 1-(Math.cosh(theta)); }, // hyperbolic coversine
		xsch: function(theta) { return (math.trig.sech(theta)) - 1; }, // hyperbolic exsecant
		xcch: function(theta) { return (math.trig.csch(theta)) - 1; }, // hyperbolic excosecant
		crdh: function(theta) { return 2 * Math.sinh(theta / 2); }, // hyperbolic chord
		arch: function(theta) { return theta * 2 * Math.pi; }, // hyperbolic arc
		// Euler's Identity
		euler: function(theta) {
			var a = Math.cos(theta) + math.complex.times(0, 1, Math.sin(theta), 0)[1]; // Real part of number
			var b = Math.cos(theta) + math.complex.times(0, 1, Math.sin(theta), 0)[2]; // Imaginary part of number
			return [2, a, b]; // Return as array that can be printed by the programmer
		}, // e^iθ = cosθ + (i * sinθ)
	},
}
