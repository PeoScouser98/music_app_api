import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParer from "cookie-parser";

/* ============= Import Routers ============== */
import trackRouter from "./routes/track";
import userRouter from "./routes/user";

/* ================ Upload file ===============*/
import multer from "multer";
import { checkAudioFileExtention } from "./middlewares/checkFile";

const app = express();

/* ======================================================= */
/* ================= Using Middlewares ====================*/
/* ======================================================= */

app.use(cookieParer()); // get cookie
app.use(cors()); // public API
app.use(express.json()); // using JSON data type

/* ========================================================== */
/* ==================== Using Routers ========================*/
/* ========================================================== */
app.use("/api", trackRouter);
app.use("/api", userRouter);

/* ========================================================== */
/* ====================== Upload file ======================= */
/* ========================================================== */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./server/upload");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
	/**
	 * destination -> nơi lưu trữ file
	 * filename -> tên file (mặc định khi upload từ pc)
	 */
});
const upload = multer({ storage: storage });

app.post("/upload-single", checkAudioFileExtention, upload.single("file"), (req, res) => {
	console.log(req.file);
	res.json(req.file);
});
app.post("/upload-multi", upload.any(), (req, res) => {
	console.log(req.files);
	res.json(req.files);
});
/* >>>>>>>>>>>> Connect to mongoDB <<<<<<<<<< */
mongoose
	.connect("mongodb://localhost:27017/music_app", { serverSelectionTimeoutMS: 5000 })
	.then((res) => console.log("Connected to database!"))
	.catch((err) => console.log("Failed to connect to database! ", err));

/* >>>>>>>>>>>> Run Server <<<<<<<<<<<<< */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Connected! Server is listening on: http://localhost:${PORT}`);
});
