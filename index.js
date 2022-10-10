import app from "./src/app";
import "dotenv/config";
import mongoose from "mongoose";

/* ================ Connect to mongoDB ================== */
mongoose
	.connect(
		process.env.DATABASE_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		{ serverSelectionTimeoutMS: 5000 },
	)
	.then((res) => console.log("Connected to database!"))
	.catch((err) => console.log("Failed to connect to database! ", err));

/* ======================== Run Server ============================= */

app.listen(process.env.PORT, () => {
	console.log(`Connected! Server is listening on Port ${process.env.PORT}`);
});
