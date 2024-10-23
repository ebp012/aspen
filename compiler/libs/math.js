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
			if (Math.sqrt(a) % 1 == 0 && b == 0 && Math.sqrt(c) % 1 == 0) {
				if (factor != false) {
					return "(" + Math.sqrt(a) + "x+" + Math.sqrt(c) + ")(" + Math.sqrt(a) + "x-" + Math.sqrt(c) + ")";
				}
				else {
					return true;
				}
			}
			else {
				return false;
			}
		},
	},
	// Cubic Functions
	cube: {
		dopc: function (a, b, c, d, factor, complete) {
			if (Math.cbrt(a) % 1 == 0 && b == 0 && c == 0 && Math.cbrt(d) % 1 == 0) {
				if (factor != false) {
					if (complete != false) {
						var dopsCheck = math.quad.dops(Math.cbrt(a) ** 2, (Math.cbrt(a) * Math.cbrt(d)), Math.cbrt(d) ** 2, false);
						if (dopsCheck != true) {
							return math.cube.dopc(a, b, c, d, factor, false);
						}
						else {
							return "(" + Math.cbrt(a) + "x-" + Math.cbrt(d) + ")" + math.quad.dops(Math.cbrt(a) ** 2, (Math.cbrt(a) * Math.cbrt(d)), Math.cbrt(d) ** 2, true);
						}
					}
					else {
						return "(" + Math.cbrt(a) + "x-" + Math.cbrt(d) + ")(" + Math.cbrt(a) + "x^3+" + (Math.cbrt(a) * Math.cbrt(b)) + "+" + Math.cbrt(d) + ")";
					}
				}
				else {
					return true;
				}
			}
			else {
				return false;
			}
		}
	},
}
