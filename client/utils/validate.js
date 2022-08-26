// get name of each field
const getFieldName = (formCtrl) => {
	return formCtrl.dataset.name;
};
// get input element

// show error message
const showError = (formCtrl, message) => {
	const errorIcon = /*html */ `<i class="bi bi-x align-center"></i>`;
	const errorMessage = formCtrl.parentElement.querySelector(".error-message");
	errorMessage.innerHTML = errorIcon + message;
	formCtrl.classList.add("input-error", "border-2");
	formCtrl.classList.remove("input-success", "border-2");
};
// show success if value of the field is valid
const showSuccess = (formCtrl, message) => {
	const successMessage = formCtrl.parentElement.querySelector(".error-message");
	successMessage.innerHTML = message;
	formCtrl.classList.add("input-success", "border-2");
	formCtrl.classList.remove("input-error", "border-2");
};

/**
 * các rule thực hiện check các trường input
 */
const areRequired = (...formControls) => {
	let isntError = true;
	formControls.forEach((formCtrl) => {
		if (formCtrl.value.trim() != "") showSuccess(formCtrl, null);
		else {
			isntError = false;
			showError(formCtrl, `Bạn chưa nhập ${getFieldName(formCtrl)}`);
		}
		formCtrl.oninput = () => {
			if (formCtrl.value.trim() != "") showSuccess(formCtrl, null);
			else {
				isntError = false;
				showError(formCtrl, `Bạn chưa nhập ${getFieldName(formCtrl)}`);
			}
		};
		formCtrl.onblur = () => {
			if (formCtrl.value.trim() != "") showSuccess(formCtrl, null);
			else {
				isntError = false;
				showError(formCtrl, `Bạn chưa nhập ${getFieldName(formCtrl)}`);
			}
		};
		formCtrl.onchange = () => {
			if (formCtrl.value.trim() != "") {
				showSuccess(formCtrl, null);
			} else {
				isntError = false;
				showError(formCtrl, `Bạn chưa nhập ${getFieldName(formCtrl)}`);
			}
		};
	});
	return isntError;
};

const isEmail = (formCtrl) => {
	let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	formCtrl.oninput = () => {
		console.log(formCtrl);
		regexEmail.test(formCtrl.value) ? showSuccess(formCtrl, null) : showError(formCtrl, "Email không hợp lệ");
	};
	formCtrl.onblur = () => {
		console.log(formCtrl);
		regexEmail.test(formCtrl.value) ? showSuccess(formCtrl, null) : showError(formCtrl, "Email không hợp lệ");
	};
	return regexEmail.test(formCtrl.value);
};

const ckMatchingValue = (formCtrl1, formCtrl2) => {
	formCtrl1.oninput = () => {
		formCtrl1.value == formCtrl2.value ? showSuccess(formCtrl1, null) : showError(formCtrl1, `${getFieldName(formCtrl1)} không trùng khớp !`);
	};
	formCtrl1.onblur = () => {
		formCtrl1.value == formCtrl2.value ? showSuccess(formCtrl1, null) : showError(formCtrl1, `${getFieldName(formCtrl1)} không trùng khớp !`);
	};
	return formCtrl1.value == formCtrl2.value;
};

const checkLength = (formCtrl, minLength) => {
	formCtrl.oninput = () => {
		formCtrl.value.length >= minLength ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} phải có tối thiểu ${minLength} ký tự`);
	};
	formCtrl.onblur = () => {
		formCtrl.value.length >= minLength ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} phải có tối thiểu ${minLength} ký tự`);
	};
	return formCtrl.value.length >= minLength;
};
const checkMaxLength = (formCtrl, minLength) => {
	formCtrl.oninput = () => {
		formCtrl.value.length <= minLength ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} phải có tối thiểu ${minLength} ký tự`);
	};
	formCtrl.onblur = () => {
		formCtrl.value.length <= minLength ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} phải có tối thiểu ${minLength} ký tự`);
	};
	return formCtrl.value.length <= minLength;
};
const isPhoneNumber = (formCtrl) => {
	formCtrl.oninput = () => {
		formCtrl.value == +formCtrl.value && formCtrl.value.length == 10 ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} không hợp lệ`);
	};
	formCtrl.onblur = () => {
		formCtrl.value == +formCtrl.value && formCtrl.value.length == 10 ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} không hợp lệ`);
	};
	return formCtrl.value == +formCtrl.value && formCtrl.value.length == 10;
};
const isImage = (formCtrl) => {
	const allowedExtensions = /(\.png|\.jpg|\.jiff|\.webp|\.bmp|\.jpeg|\.avif)$/i;
	const filePath = formCtrl.value;
	allowedExtensions.test(filePath) ? showSuccess(formCtrl, null) : showError(formCtrl, "File không đúng định dạng ảnh");
	// Allowing file type
	formCtrl.onchange = () => {
		allowedExtensions.test(filePath) ? showSuccess(formCtrl, null) : showError(formCtrl, "File không đúng định dạng ảnh");
	};
	formCtrl.onblur = () => {
		allowedExtensions.test(filePath) ? showSuccess(formCtrl, null) : showError(formCtrl, "File không đúng định dạng ảnh");
	};
	return allowedExtensions.test(filePath);
};
