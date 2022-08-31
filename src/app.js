import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

/* ============= Import Routers ============== */
import trackRouter from "./routes/track";
import userRouter from "./routes/user";
import artistRouter from "./routes/artist";
import genreRouter from "./routes/genre";

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
app.use("/api", trackRouter);
app.use("/api", userRouter);
app.use("/api", artistRouter);
app.use("/api", genreRouter);

/* ================ Connect to mongoDB ================== */
mongoose
	.connect(process.env.DATABASE_URL, { serverSelectionTimeoutMS: 5000 })
	.then((res) => console.log("Connected to database!"))
	.catch((err) => console.log("Failed to connect to database! ", err));

export default app;
