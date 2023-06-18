import bcrypt, { genSaltSync } from 'bcrypt';
import 'dotenv/config';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import transporter from '../../configs/mailer';
import Collection from '../models/collection.model';
import User from '../models/user.model';

/* ::::::::: Get all users ::::::::::::::: */
export const list = async (req, res) => {
	try {
		const users = await User.find().select('_id username avatar').exec();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(404).json({
			statusCode: 404,
			message: error.message,
		});
	}
};
/* ::::::::: Get an user ::::::::::::::: */
export const read = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id }).select('_id avatar username').exec();
		return res.status(200).json(user);
	} catch (error) {
		return res.status(404).json({
			status: 404,
			message: error.message,
		});
	}
};

/* :::::::::::::::: Lấy thông tin người dùng :::::::::::::::: */
export const getUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.auth }).select('-password -role').exec();

		return res.status(200).json(user);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

/* :::::::::::::::: Send mail to recover password ::::::::::::::::::: */
export const recoverPassword = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email }).exec();
		if (!user)
			return res.status(404).json({
				message: 'Email does not exist!',
			});
		/* tạo token */
		const verifyCode = Date.now().toString().substr(7, 6);
		const token = jwt.sign({ verifyCode: verifyCode, email: user.email }, process.env.SECRET_KEY, {
			expiresIn: '5m',
		});
		/* gửi mã xác thực về mail cho user */
		await transporter.sendMail(
			{
				from: {
					name: 'Bass Station',
					address: process.env.AUTH_EMAIL,
				},
				to: user.email,
				subject: 'Sử dụng mã xác thực này để đổi mật khẩu!',
				html: /* html */ `<p>Mã xác thực: <b>${verifyCode}</b></p>`,
			},
			(err, info) => {
				if (err) return res.status(500).json(err);
			}
		);
		/* ::::::::::::: finish recover password :::::::::::::::: */
		return res.status(201).json({ token: token });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

/* ::::::::::::::::::: Reset password :::::::::::::::::::: */
export const resetPassword = async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ').at(1);
		const { verifyCode, email } = jwt.verify(token, process.env.SECRET_KEY, { algorithms: 'RS256' });

		const user = await User.findOne({ email: email }).exec();
		if (verifyCode !== req.body.verifyCode || user === null)
			throw createHttpError.Forbidden('Verify code is invalid!');

		const newPassword = bcrypt.hashSync(req.body.password, genSaltSync(10));
		const response = await User.findOneAndUpdate({ email: email }, { password: newPassword }, { new: true });
		if (!response) throw createHttpError.InternalServerError('Failed to reset password');
		return res.status(201).json({
			message: 'Reset password successfully!',
		});
	} catch (error) {
		console.log(error.message);
		return res.status(200).json({
			status: error.status,
			message: error.message,
		});
	}
};

/* :::::::::::: Activate account :::::::::::::: */
export const activateAccount = async (req, res) => {
	try {
		const decodedToken = jwt.verify(req.query.token, process.env.SECRET_KEY, { algorithms: 'RS256' }); // -> user data
		/* Save account to database */
		const newAccount = await new User(decodedToken).save();
		await new Collection({
			creator: newAccount._id,
			albums: [],
			tracks: [],
			artists: [],
		}).save();

		return res.status(201).json({
			id: newAccount._id,
			email: newAccount.email,
			username: newAccount.username,
			role: newAccount.role,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(401).json({
			message: error.message,
		});
	}
};

export const update = async (req, res) => {
	try {
		console.log(req.body);
		const updatedUser = await User.updateOne({ _id: req.auth }, req.body, { new: true });
		console.log(updatedUser);
		return res.status(201).json(updatedUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
