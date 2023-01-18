import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import compression from "compression";
/* :::::::::::::::::: Import Routers :::::::::::::::::: */
import trackRouter from "./api/routes/track.route";
import userRouter from "./api/routes/user.route";
import artistRouter from "./api/routes/artist.route";
import genreRouter from "./api/routes/genre.route";
import playListRouter from "./api/routes/playlist.route";
import albumRouter from "./api/routes/album.route";
import collectionRouter from "./api/routes/collection.route";
import searchRouter from "./api/routes/search.route";
import morgan from "morgan";
const app = express();

/* :::::::::::::::::: Using Middlewares :::::::::::::::::: */
app.use(cors({ origin: "*" })); // public API
app.use(express.json()); // using JSON data type
app.use(compression({ level: 6 })); // compress data if payload is too large
app.use(morgan("tiny"));
/* :::::::::::::::::: Using Routers :::::::::::::::::::: */
app.get("/", (req, res) => {
	try {
		res.json({
			status: 200,
			message: "Server now is running!",
		});
	} catch (error) {
		res.status(404).send("Server is stopped!");
	}
});
app.get("/activate-account", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/verify-account.html"));
});

app.use("/api", trackRouter);
app.use("/api", userRouter);
app.use("/api", artistRouter);
app.use("/api", genreRouter);
app.use("/api", playListRouter);
app.use("/api", albumRouter);
app.use("/api", collectionRouter);
app.use("/api", searchRouter);

export default app;
