import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
/* ============= Import Routers ============== */
import trackRouter from "./routes/track";
import userRouter from "./routes/user";
import artistRouter from "./routes/artist";
import genreRouter from "./routes/genre";
import playListRouter from "./routes/playlist";

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
	res.send("Server now is running!");
});
app.get("/upload-track", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/upload.html"));
});

app.use("/api", trackRouter);
app.use("/api", userRouter);
app.use("/api", artistRouter);
app.use("/api", genreRouter);
app.use("/api", playListRouter);

export default app;
