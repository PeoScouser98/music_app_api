import 'dotenv/config';

export default {
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.NODE_ENV.toLowerCase().includes('production')
		? process.env.REMOTE_CALLBACK_URL
		: process.env.LOCAL_CALLBACK_URL,
};
