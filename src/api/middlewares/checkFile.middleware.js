import createHttpError from 'http-errors';
import path from 'path';
/* ========== middleware check audio file ============ */
export const checkAudioFileExtension = (file, callback) => {
	// allowed file
	const regex = /wav|mp3|flac|png|jpg|jeg|webp/;
	const isValidExt = regex.test(path.extname(file.originalname).toLowerCase());
	if (isValidExt) return callback(null, true);
	else {
		callback('Invalid file type!');
		throw createHttpError.UnsupportedMediaType('Invalid file type!');
	}
};
