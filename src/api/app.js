import compression from 'compression';
import cors from 'cors';
import express from 'express';
import session, { MemoryStore } from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import rootRouter from './routes/index';
import 'dotenv/config';
import './auth/googlePassport.auth';
import './auth/localPassport.auth';
import globalConfig from '../config/global.config';
import cookieParser from 'cookie-parser';

const app = express();

/* :::::::::::::::::: Using Middlewares :::::::::::::::::: */

app.use(
	cors({
		origin: globalConfig.frontendURL,
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
		credentials: true,
	})
); // public API
app.use(express.json()); // using JSON data type
app.use(compression({ level: 6, threshold: 1 * 1024 })); // compress data if payload is too large
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(
	session({
		saveUninitialized: false,
		store: new MemoryStore(),
		secret: process.env.SESSION_SECRET,
		resave: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
/* :::::::::::::::::: Using Routers :::::::::::::::::::: */
app.get('/', (req, res) => {
	try {
		return res.json({
			status: 200,
			message: 'Server now is running!',
		});
	} catch (error) {
		return res.status(500).send('Server is stopped!');
	}
});

app.get('/activate-account', (req, res) => {
	return res.sendFile(path.resolve('verify-account.html'));
});

app.use('/api', rootRouter);

export default app;
