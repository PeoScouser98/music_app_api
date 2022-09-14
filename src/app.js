import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
/* ============= Import Routers ============== */
import trackRouter from "./routes/track.route";
import userRouter from "./routes/user.route";
import artistRouter from "./routes/artist.route";
import genreRouter from "./routes/genre.route";
import playListRouter from "./routes/playlist.route";
import { resolveSoa } from "dns";

const app = express();

/* ======================================================= */
/* ================= Using Middlewares =================== */
/* ======================================================= */

app.use(cors()); // public API
app.use(express.json()); // using JSON data type

/* ========================================================== */
/* ==================== Using Routers ========================*/
/* ========================================================== */
app.get("/", (req, res) => {
	try {
		res.send("<h1>Server now is running!</h1>");
	} catch (error) {
		res.status(404).send("Server is stopped!");
	}
});

app.get("/upload-track", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/upload.html"));
});
app.get("/login", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/login.html"));
});
app.get("/activate-account", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/verify_account.html"));
});

app.use("/api", trackRouter);
app.use("/api", userRouter);
app.use("/api", artistRouter);
app.use("/api", genreRouter);
app.use("/api", playListRouter);

export default app;
