import express from "express";
import multer from "multer";
import { list, read, create, update, del } from "../controllers/track.controller";
import { isAdmin, checkAccessToken } from "../middlewares/checkAuth.middleware";
import { checkAudioFileExtension } from "../middlewares/checkFile.middleware";
import { uploadFile, deleteFile } from "../controllers/upload.controller";

const router = express.Router();

/* =========== Multer ============== */
const upload = multer({
	fileFilter: (req, file, callback) => {
		checkAudioFileExtension(file, callback);
	},
});

/* ============================================================= */
router.get("/track", list);
router.get("/track/:id", read);
router.post("/track", checkAccessToken, create);
router.patch("/track/:id", checkAccessToken, update);
router.patch("/track/:id", checkAccessToken, update);
router.delete("/track/:id", checkAccessToken, del);
router.post("/track-upload", checkAccessToken, upload.single("trackSrc"), async (req, res) => {
	const trackSrc = await uploadFile(req.file, process.env.MUSIC_DIR);
	res.status(200).json(trackSrc.data);
});
router.post("track-delete", deleteFile);

export default router;
