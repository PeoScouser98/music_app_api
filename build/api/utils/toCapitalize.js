"use strict";

var toCapitalize = function toCapitalize(string) {
	string = string.trim();
	while (string.includes("  ")) {
		string.replace("  ", " ");
	}
	var subStrings = string.split(" ");
	var result = "";
	subStrings.forEach(function (element) {
		result += element.at(0).toUpperCase() + element.slice(1).toLowerCase();
	});
	return result;
};

console.log(toCapitalize("truonG   QuAng hiep"));