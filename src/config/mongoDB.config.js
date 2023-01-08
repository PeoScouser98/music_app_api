import "dotenv/config";
import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		const databaseUri = process.env.DATABASE_URI;
		console.log(databaseUri);
		mongoose.set("strictQuery", false);
		await mongoose.connect(databaseUri);
		console.log("Connected to database!");
	} catch (error) {
		console.log(error);
	}
};

export default connectMongoDB;
