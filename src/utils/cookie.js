/*  >>>>>>>>>>>>> Lấy cookie <<<<<<<<<<<< */
export const getAllCookieObjs = () => {
	const allCookies = document.cookie.split(";");
	const result = [];
	if (allCookies) {
		allCookies.forEach((ck) => {
			const cookieElem = ck.split("=");
			result.push({
				key: cookieElem[0].trim(),
				value: cookieElem[1].trim(),
			});
		});
		return result;
	}
};
/* >>>>>>>>>>>>>>>> Set cookie <<<<<<<<<<<<<<<<< */
export const setCookie = (name, value, expireIn) => {
	const date = new Date();
	date.setTime(date.getTime() + expireIn * 24 * 60 * 60 * 1000);
	let expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
/* >>>>>>>>>>>>>>> Get cookie by name <<<<<<<<<<<<<<<<< */
export const getCookie = (name) => {
	let cookieName = name + "=";
	let cookieArr = document.cookie.split(";");
	for (let i = 0; i < cookieArr.length; i++) {
		let character = cookieArr[i];
		while (character.charAt(0) == " ") {
			character = character.substring(1);
		}
		if (character.indexOf(cookieName) == 0) {
			return character.substring(cookieName.length, character.length);
		}
	}
	return "";
};
