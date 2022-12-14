import "dotenv/config";
import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		const databaseUri =
			process.env.NODE_ENV.toUpperCase().includes("PRODUCTION") >= 0
				? process.env.DATABASE_URI
				: process.env.LOCAL_DATABASE_URI;
		console.log(databaseUri);
		mongoose.set("strictQuery", false);
		await mongoose.connect(databaseUri);
		console.log("Connected to database!");
	} catch (error) {
		console.log(error);
	}
};

export default connectMongoDB;
