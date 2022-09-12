import path from "path";
/* ========== middleware check audio file ============ */
export const checkAudioFileExtension = (file, callback) => {
	// allowed file
	const regex = /wav|mp3|flac/;
	const isValidExt = regex.test(path.extname(file.originalname).toLowerCase());
	if (isValidExt) return callback(null, true);
	else {
		callback("File không đúng định dạng!");
		return {
			message: "File không đúng định dạng!",
		};
	}
};
