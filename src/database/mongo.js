import 'dotenv/config';
import mongoose from 'mongoose';
import globalConfig from '../configs/global.config';

const connectMongoDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(globalConfig.mongoURI);
		console.info('[SUCCESS] Connected to database!');
	} catch (error) {
		console.log(error);
	}
};

export default connectMongoDB;
