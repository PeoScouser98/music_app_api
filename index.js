import app from "./src/app";
import "dotenv/config";
import mongoose from "mongoose";
// const server = http.createServer(app);
// import { Server } from "socket.io";
// const io = new Server(server);

/* ::::::::::::::::::::::: Connect to mongoDB ::::::::::::::::::::::: */
const databaseUri =
	process.env.NODE_ENV.indexOf("PRODUCTION") >= 0 ? process.env.DATABASE_URI : process.env.LOCAL_DATABASE_URI;
console.log(databaseUri);
mongoose
	.connect(databaseUri)
	.then((res) => console.log("Connected to database!"))
	.catch((err) => console.log(err));

/* ::::::::::::::::::::::: Connect Socket ::::::::::::::::::::::: */
// io.on("Connection", (socket) => {
// 	console.log(socket);
// });

/* ::::::::::::::::::::::: Run Server ::::::::::::::::::::::: */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Connected! Server is listening on: http://localhost:${PORT}/`);
});
