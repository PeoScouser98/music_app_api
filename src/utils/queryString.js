export const queriesStringify = (paramsObj) => {
	if (!paramsObj) return '';
	return (
		'?' +
		Object.keys(paramsObj)
			.map((key) => key + '=' + encodeURIComponent(paramsObj[key]))
			.join('&')
	);
};
