import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParer from "cookie-parser";
// import router endpoint
import trackRouter from "./routes/track";
import userRouter from "./routes/user";

const app = express();
app.use(cookieParer()); // get cookie
app.use(cors()); // public API
app.use(express.json()); // using JSON data type

// using router
app.use("/api", trackRouter);
app.use("/api", userRouter);
// connnect to database
mongoose.connect("mongodb://localhost:27017/music_app", () => {
	console.log("Connected to database!");
});

// run server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Connected! Server is listening on: http://localhost:${PORT}`);
});
