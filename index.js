import app from "./src/app";
import "dotenv/config";
import mongoose from "mongoose";
// const server = http.createServer(app);
// import { Server } from "socket.io";
// const io = new Server(server);

/* ::::::::::::::::::::::: Connect to mongoDB ::::::::::::::::::::::: */
mongoose
	.connect(process.env.DATABASE_URI, { serverSelectionTimeoutMS: 5000 })
	.then((res) => console.log("Connected to database!"))
	.catch((err) => console.log(err));

/* ::::::::::::::::::::::: Connect Socket ::::::::::::::::::::::: */
// io.on("Connection", (socket) => {
// 	console.log(socket);
// });

/* ::::::::::::::::::::::: Run Server ::::::::::::::::::::::: */

app.listen(process.env.PORT, () => {
	console.log(`Connected! Server is listening on Port ${process.env.PORT}`);
});
