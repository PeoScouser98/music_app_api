import app from "./src/app";
import "dotenv/config";
/* ======================== Run Server ============================= */
app.listen(process.env.PORT, () => {
	console.log(`Connected! Server is listening on: http://localhost:${process.env.PORT}`);
});
