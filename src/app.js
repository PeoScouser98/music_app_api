import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import compression from "compression";
/* :::::::::::::::::: Import Routers :::::::::::::::::: */
import trackRouter from "./routes/track.route";
import userRouter from "./routes/user.route";
import artistRouter from "./routes/artist.route";
import genreRouter from "./routes/genre.route";
import playListRouter from "./routes/playlist.route";
import albumRouter from "./routes/album.route";
import collectionRouter from "./routes/collection.route";
import searchRouter from "./routes/search.route";

const app = express();

/* :::::::::::::::::: Using Middlewares :::::::::::::::::: */
app.use(cors()); // public API
app.use(express.json()); // using JSON data type
app.use(compression({ level: 6 })); // compress data if payload is too large

/* :::::::::::::::::: Using Routers :::::::::::::::::::: */
app.get("/", (req, res) => {
	try {
		res.send("<h1>Server now is running!</h1>");
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
