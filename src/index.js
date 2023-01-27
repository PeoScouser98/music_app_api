import "dotenv/config";
import app from "./app";
import connectMongoDB from "./config/mongoDB.config";

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Connected! Server is listening on: http://localhost:${PORT}`);
});

connectMongoDB();
