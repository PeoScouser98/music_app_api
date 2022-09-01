import express from "express";
import multer from "multer";
import { list, read, create, update, del } from "../controllers/track";
import { isAdmin, requireSignin } from "../middlewares/checkAuth";
import { checkAudioFileExtension } from "../middlewares/checkFile";
import { google } from "googleapis";
import stream from "stream";

const router = express.Router();

/* =========== Multer ============== */
const upload = multer({
	fileFilter: (req, file, cb) => {
		checkAudioFileExtension(file, cb);
	},
});

/* ========================================================== */
/* ======================DRIVE UPLOAD ======================= */
/* ========================================================== */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// get auth client
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
	version: "v3",
	auth: oauth2Client,
});
const setFilePublic = async (fileId) => {
	try {
		await drive.permissions.create({
			fileId,
			requestBody: {
				role: "reader",
				type: "anyone",
			},
		});
		return drive.files.get({
			fileId,
			fields: "webViewLink",
		});
	} catch (error) {
		console.log(error);
	}
};

const uploadFile = async (fileObject) => {
	try {
		const bufferStream = new stream.PassThrough();
		bufferStream.end(fileObject.buffer);
		const createdFile = await drive.files.create({
			requestBody: {
				name: fileObject.originalname,
			},
			media: {
				mimeType: fileObject.mimeType,
				body: bufferStream,
			},
		});
		const fileUrl = await setFilePublic(createdFile.data.id);
		return fileUrl;
	} catch (error) {
		console.log(error);
	}
};
/* ============================================================= */
/* =================== DRIVER UPLOAD END ======================= */
/* ============================================================= */
router.get("/track", list);
router.get("/track/:id", read);
router.post("/track", create);
router.patch("/track/:id", requireSignin, update);
router.delete("/track/:id", requireSignin, del);

router.post("/track-upload", upload.single("trackSrc"), async (req, res) => {
	const trackSrc = await uploadFile(req.file);
	res.json(trackSrc.data.webViewLink);
});

export default router;
