import 'dotenv/config';
import mongoose from 'mongoose';

const connectMongoDB = async () => {
	try {
		console.info(`[INFO] ${process.env.NODE_ENV.toUpperCase()} MODE`);
		const databaseUri = process.env.NODE_ENV.toLowerCase().includes('production') ? process.env.DATABASE_URI : process.env.LOCAL_DATABASE_URI;
		mongoose.set('strictQuery', false);
		await mongoose.connect(databaseUri);
		console.info('[SUCCESS] Connected to database!');
	} catch (error) {
		console.log(error);
	}
};

export default connectMongoDB;
