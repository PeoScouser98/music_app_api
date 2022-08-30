import { list, read, create, update, del } from "../controllers/track";
import { isAdmin, requireSignin } from "../middlewares/checkAuth";
import multer from "multer";
import { checkAudioFileExtension } from "../middlewares/checkFile";
import express from "express";

const router = express.Router();

/* ========================================================== */
/* ====================== Upload file ======================= */
/* ========================================================== */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./server/upload/audio");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},

	/**
	 * destination -> nơi lưu trữ file
	 * filename -> tên file (mặc định khi upload từ pc)
	 */
});
const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		checkAudioFileExtension(file, cb);
	},
});

// app.post("/upload-multi", upload.any(), (req, res) => {
// 	console.log(req.files);
// 	res.json(req.files);
// });

router.get("/track", list);
router.get("/track/:id", read);
router.post("/track", requireSignin, isAdmin, create);
router.patch("/track/:id", requireSignin, update);
router.delete("/track/:id", requireSignin, del);
router.post("/track-upload", upload.single("file"), (req, res) => {
	console.log(req.file);
});
router.post("/track-multi-upload", upload.any(), (req, res) => {
	console.log(req.files);
});

export default router;
