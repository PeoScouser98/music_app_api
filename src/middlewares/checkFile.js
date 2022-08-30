import path from "path";
/* ========== middleware check audio file ============ */
export const checkAudioFileExtension = (file, cb) => {
	// allowed file
	const regex = /wav|mp3|flac/;
	const isValidExt = regex.test(path.extname(file.originalname).toLowerCase());
	// const isValidMime = regex.test(file.mimetype);
	if (isValidExt) return cb(null, true);
	else {
		cb("File không đúng định dạng!");
	}
};
