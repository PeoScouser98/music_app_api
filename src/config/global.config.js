import 'dotenv/config';

const globalConfig = process.env.NODE_ENV.toLowerCase().includes('production')
	? {
			frontendURL: process.env.FRONTEND_URL,
			mongoURI: process.env.DATABASE_URI,
	  }
	: {
			frontendURL: process.env.LOCAL_FRONTEND_URL,
			mongoURI: process.env.LOCAL_DATABASE_URI,
	  };

export default globalConfig;
