import 'dotenv/config';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const checkAccessToken = async (req, res, next) => {
	try {
		const accessToken = !!req.headers.authorization ? req.headers.authorization.replace('Bearer', '').trim() : null;

		if (!accessToken) throw createHttpError.Unauthorized('Access token must be provided!');

		const { credential } = jwt.verify(accessToken, process.env.SECRET_KEY);
		const { role } = await User.findOne({ _id: credential }).select('role');
		req.role = role;
		req.auth = credential;
		next();
	} catch (error) {
		return res.status(401).json({
			status: 401,
			message: error.message,
		});
	}
};

export const isAdmin = async (req, res, next) => {
	if (req.role !== 'ADMIN')
		return res.status(401).json({
			message: 'Unauthorized error! You are not admin!',
		});
	next();
};
