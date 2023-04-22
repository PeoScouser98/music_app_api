import bcrypt, { genSaltSync } from 'bcrypt';
import 'dotenv/config';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import transporter from '../../app/mailer';
import Collection from '../models/collection.model';
import User from '../models/user.model';
import globalConfig from '../../config/global.config';
import { queriesStringify } from '../../utils/queryString';
import { popupResponse } from 'popup-tools';

/* :::::::::::::::::: Sign in ::::::::::::::::::::: */
export const loginWithEmail = async (req, res) => {
	try {
		console.log(req.user);
		const user = req.user;
		const accessToken = jwt.sign(
			{ credential: user._id },
			process.env.SECRET_KEY,
			{ expiresIn: '15m' }
		);
		res.cookie('access_token', accessToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30 * 365,
			httpOnly: true,
		});
		res.cookie('uid', req.user._id.toString().trim(), {
			maxAge: 1000 * 60 * 60 * 24 * 30 * 365,
		});
		return res.json({
			accessToken: accessToken,
			authenticated: true,
			uid: req.user?._id,
			user: req.user,
		});
	} catch (error) {
		return res.status(200).json({
			message: error.message,
			status: error.status,
		});
	}
};

export const loginWithGoogle = async (req, res) => {
	try {
		const accessToken = jwt.sign(
			{ credential: req.user?._id },
			process.env.SECRET_KEY,
			{ expiresIn: '15m' }
		);
		res.cookie('access_token', accessToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30 * 365,
			httpOnly: true,
		});
		res.cookie('uid', req.user._id.toString().trim(), {
			maxAge: 1000 * 60 * 60 * 24 * 30 * 365,
		});
		return res.end(
			popupResponse({
				accessToken: accessToken,
				authenticated: true,
				uid: req.user?._id,
				user: req.user,
			})
		);
	} catch (error) {
		return res.status(error.status || 500).json({
			message: error.message,
			status: error.status,
		});
	}
};

/* :::::::::::::::::::: Tạo refresh token :::::::::::::::::::::: */
export const refreshToken = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.userId }).exec();
		if (!user) throw createHttpError.BadRequest('Cannot find user');
		const newAccessToken = jwt.sign(
			{ credential: user._id },
			process.env.SECRET_KEY,
			{ expiresIn: '15m' }
		);
		console.log(newAccessToken);
		return res.status(200).json(newAccessToken);
		/**
		 * verify user
		 * -> user existed in database -> create refresh token
		 * -> if not, throw error
		 */
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({
			error: error.status,
			message: error.message,
		});
	}
};

/* :::::::::::::::: Sign up ::::::::::::::::: */
export const register = async (req, res) => {
	try {
		const account = await User.findOne({ email: req.body.email }).exec();
		if (account)
			throw createHttpError.BadRequest('Account already existed!');
		// return res.status(200).json({
		// 	status: 400,
		// 	message: "Account already existed!",
		// });

		const token = jwt.sign(req.body, process.env.SECRET_KEY, {
			expiresIn: '5m',
		});

		const baseUrl =
			req.protocol + '://' + req.get('host') + '/activate-account';
		console.log(req.get('host'));
		await transporter.sendMail(
			{
				from: process.env.AUTH_EMAIL,
				to: req.body.email,
				subject: 'Activate your account',
				html: /*html */ `
					<h3>On clicking this link, you are goin' to activate account!</h3>
					<p><a href=${baseUrl}?token=${token}>Active Link</a></p>
					<i>Thanks for register to be one of our member!</i>`,
			},
			(error, infor) => {
				if (error)
					return res.status(500).json({
						message: error,
					});

				return res.status(202).json({
					message: `Email sent: ${infor.response}`,
				});
			}
		);
	} catch (error) {
		return res.status(200).json({
			message: error.message,
			status: error.status,
		});
	}
};

export const logout = async (req, res) => {
	try {
		req.logout((err) => {
			if (err) throw err;
		});
		res.clearCookie('access_token', { path: '/' });
		res.clearCookie('uid', { path: '/' });
		res.clearCookie('connect.sid', { path: '/' });
		res.json({
			accessToken: null,
			user: null,
			uid: null,
			authenticated: false,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			status: 500,
		});
	}
};
