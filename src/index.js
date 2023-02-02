import "dotenv/config";
import app from "./app";
import connectMongoDB from "./config/mongoDB.config";
import http from "http";
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.info(`[SUCCESS] Server is listening on port ${PORT}`);
});

connectMongoDB();
