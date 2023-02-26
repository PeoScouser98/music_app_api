const redis = require("redis");
import "dotenv/config";

// Create client
const client = redis.createClient({ host: "127.0.0.1", port: 6379 });

client.ping((error, pong) => {
	console.log(pong);
});

client.on("connect", () => {
	console.log("[SUCCESS] Connected to Redis server!");
});

client.on("error", (error) => {
	console.log("[ERROR] Failed to connected to Redis server!");
	console.log("Error: >>", error.message);
});

// Ngắt kết nối đến Redis Server
client.quit(function (err, res) {
	console.log("Đã ngắt kết nối đến Redis Server");
});

module.exports = client;
