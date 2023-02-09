import express from "express";
import multer from "multer";
import {
	list,
	read,
	create,
	update,
	del,
	listByUploader,
	searchTrack,
	listRelatedTracks,
} from "../controllers/track.controller";
import { isAdmin, checkAccessToken } from "../middlewares/checkAuth.middleware";
import { checkAudioFileExtension } from "../middlewares/checkFile.middleware";
import { uploadFile, deleteFile } from "../../app/drive-upload";

const router = express.Router();

/* :::::::::::::: Multer config :::::::::::::: */
const upload = multer({
	fileFilter: (req, file, callback) => {
		checkAudioFileExtension(file, callback);
	},
});

router.get("/tracks", list);
router.get("/tracks/user-uploaded", checkAccessToken, listByUploader);
router.get("/tracks/related/:genre", listRelatedTracks);
router.get("/tracks/:id", read);
router.post("/tracks", checkAccessToken, create);
router.patch("/tracks/:id", checkAccessToken, update);
router.delete("/tracks/:id", checkAccessToken, del);

// router.post("/track-upload", checkAccessToken, upload.single("trackSrc"), async (req, res) => {
// 	const trackSrc = await uploadFile(req.file, process.env.MUSIC_DIR);
// 	return res.status(202).json(trackSrc.data); // Accepted! -> return file id and then call API to create new song with file id
// });

export default router;
