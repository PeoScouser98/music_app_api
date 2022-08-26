export const checkAudioFileExtention = (req, res, next) => {
	const regex = /\.(?:wav|mp3|flac)$/i;
	if (regex.test(req.file)) next();
	else
		return res.status(400).json({
			message: "File không đúng định dạng",
		});
};
