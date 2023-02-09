const toCapitalize = (string) => {
	string = string.trim();
	while (string.includes("  ")) {
		string.replace("  ", " ");
	}
	const subStrings = string.split(" ");
	let result = "";
	subStrings.forEach((element) => {
		result += element.at(0).toUpperCase() + element.slice(1).toLowerCase();
	});
	return result;
};

console.log(toCapitalize("truonG   QuAng hiep"));
