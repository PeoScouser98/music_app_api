import express from "express";
import multer from "multer";
import { list, read, create, update, del } from "../controllers/track.controller";
import { isAdmin, requireSignin } from "../middlewares/checkAuth.middleware";
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
router.post("/track", requireSignin, create);
router.patch("/track/:id", requireSignin, update);
router.delete("/track/:id", requireSignin, del);
router.post("/track-upload", requireSignin, upload.single("trackSrc"), async (req, res) => {
	console.log(req.file);
	const trackSrc = await uploadFile(req.file, process.env.MUSIC_DIR);

	res.json(trackSrc.data);
});
router.post("track-delete", deleteFile);

export default router;
