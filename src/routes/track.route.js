import express from "express";
import multer from "multer";
import { list, read, create, update, del, listByUploader, searchTrack } from "../controllers/track.controller";
import { isAdmin, checkAccessToken } from "../middlewares/checkAuth.middleware";
import { checkAudioFileExtension } from "../middlewares/checkFile.middleware";
import { uploadFile, deleteFile } from "../services/drive-upload";

const router = express.Router();

/* :::::::::::::: Multer config :::::::::::::: */
const upload = multer({
	fileFilter: (req, file, callback) => {
		checkAudioFileExtension(file, callback);
	},
});

router.get("/track", list);
router.get("/track/user-uploaded/", checkAccessToken, listByUploader);
router.get("/track/:id", read);
router.post("/track", checkAccessToken, create);
router.patch("/track/:id", checkAccessToken, update);
router.patch("/track/:id", checkAccessToken, update);
router.delete("/track/:id", checkAccessToken, del);
router.post("/track-upload", checkAccessToken, upload.single("trackSrc"), async (req, res) => {
	const trackSrc = await uploadFile(req.file, process.env.MUSIC_DIR);
	return res.status(202).json(trackSrc.data); // Accepted! -> return file id and then call API to create new song with file id
});

export default router;
