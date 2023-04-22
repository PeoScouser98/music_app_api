import 'dotenv/config';
import http from 'http';
import app from './api/app';
import connectMongoDB from './database/mongo';

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.info(`[SUCCESS] Server is listening on port ${PORT}`);
});

connectMongoDB();
