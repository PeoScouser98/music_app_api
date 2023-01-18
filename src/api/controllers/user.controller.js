import User from "../models/user.model";
import Playlist from "../models/playlist.model";
import transporter from "../services/mailer";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { createHmac } from "crypto";
import Collection from "../models/collection.model";

/* ::::::::: Get all users ::::::::::::::: */
export const list = async (req, res) => {
	try {
		const users = await User.find().exec();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(404).json({
			statusCode: 404,
			message: "Cannot find user!",
		});
	}
};
/* ::::::::: Get all users ::::::::::::::: */
export const read = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id }).exec();
		return res.status(200).json(user);
	} catch (error) {
		return res.status(404).json({
			statusCode: 404,
			message: "Cannot find user!",
		});
	}
};
/* :::::::::::::::: Lấy thông tin người dùng :::::::::::::::: */
export const getUser = async (req, res) => {
	try {
		if (req.auth) {
			const user = await User.findOne({ _id: req.auth }).exec();
			return res.status(200).json({
				statusCode: 200,
				username: user.username,
				avatar: user.avatar,
			});
		} else
			return res.status(404).json({
				message: "Cannot find user!",
			});
	} catch (error) {
		return res.status(404).json({
			statusCode: 404,
			message: "Cannot find user!",
		});
	}
};

/* :::::::::::::::::::: Tạo refresh token :::::::::::::::::::::: */
export const refreshToken = async (req, res) => {
	try {
		const newAccessToken = jwt.sign({ id: req.params.userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
		if (newAccessToken)
			return res.status(200).json({
				accessToken: newAccessToken,
			});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot create new access token!",
		});
	}
};

/* :::::::::::::::::: Sign in ::::::::::::::::::::: */
export const login = async (req, res) => {
	try {
		const account = await User.findOne({ email: req.body.email }).exec();
		if (!account)
			return res.status(404).json({
				message: "Account does not exist",
			});
		if (account.authenticate(req.body.password) == false)
			return res.status(401).json({
				message: "Incorrect password!",
			});
		const token = jwt.sign({ id: account._id }, process.env.SECRET_KEY, { expiresIn: "30s" });
		/**
		 * * sign(payload + secretKey) => token
		 * * verify(token + secretKey) => payload
		 *  */

		return res.status(200).json({
			id: account._id,
			username: account.username,
			accessToken: token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to sign in!",
			err: error,
		});
	}
};

export const logout = async (req, res) => {
	try {
		return res.json({
			status: 204,
			message: "User logged out!",
		});
	} catch (error) {
		console.log(error);
	}
};

/* :::::::::::::::: Sign up ::::::::::::::::: */
export const register = async (req, res) => {
	try {
		const BASE_URL = process.env.NODE_ENV.indexOf("PRODUCTION") >= 0 ? process.env.SERVER : process.env.LOCAL_SERVER;
		const account = await User.findOne({ email: req.body.email }).exec();
		if (account)
			return res.status(500).json({
				message: "Account already existed!",
			});
		const token = jwt.sign(req.body, process.env.SECRET_KEY, { expiresIn: "5m" });

		await transporter.sendMail(
			{
				from: process.env.AUTH_EMAIL,
				to: req.body.email,
				subject: "Activate your account",
				html: /*html */ `
					<h3>On clicking this link, you are goin' to activate account!</h3>
					<p><a href=${BASE_URL}?token=${token}>Active Link</a></p>
					<i>Thanks for register to be one of our member!</i>`,
			},
			(error, infor) => {
				if (error)
					return res.status(500).json({
						message: error,
					});
				else
					return res.status(202).json({
						message: `Email sent: ${infor.response}`,
					});
			},
		);
	} catch (error) {
		return res.status(500).json({
			message: "Faild to register",
			error: error,
		});
	}
};

/* :::::::::::::::: Send mail to recover password ::::::::::::::::::: */
export const recoverPassword = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email }).exec();
		if (!user)
			return res.status(404).json({
				message: "Email không tồn tại!",
			});
		/* tạo token */
		const verifyCode = Date.now().toString().substr(7, 6);
		const token = jwt.sign({ verifyCode: verifyCode }, process.env.SECRET_KEY, { expiresIn: "5m" });

		/* save token vào database */
		user.token = token;
		await User.findOneAndUpdate({ _id: user.id }, user, { new: true });

		/* gửi mã xác thực về mail cho user */
		await transporter.sendMail(
			{
				from: process.env.AUTH_EMAIL,
				to: user.email,
				subject: "Sử dụng mã xác thực này để đổi mật khẩu!",
				html: /* html */ `<p>Mã xác thực: <b>${verifyCode}</b></p>`,
			},
			(err, info) => {
				if (err) return res.status(500).json(err);
			},
		);
		/* ::::::::::::: finish recover password :::::::::::::::: */
		return res.status(201).json({
			verifyCode,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

/* ::::::::::::::::::: Reset password :::::::::::::::::::: */
export const resetPassword = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email }).exec();
		const { verifyCode } = jwt.verify(user.token, process.env.SECRET_KEY);

		/* check verify code gửi lên == verify code parse từ token lưu trong database  */
		if (verifyCode === req.body.verifyCode) {
			/* mã hóa mật khẩu trước khi save */
			const newPassword = createHmac("sha256", process.env.SECRET_KEY).update(req.body.password).digest("hex");

			/* Update mật khẩu mới và xóa token lưu trong database */
			await User.findOneAndUpdate({ email: req.body.email }, { password: newPassword, token: "" }, { new: true });

			return res.status(201).json({
				message: "Reset password successfully!",
			});
		} else
			return res.status(401).json({
				message: "Invalid verification code!",
			});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

/* :::::::::::: Activate account :::::::::::::: */
export const activateAccount = async (req, res) => {
	try {
		const decodedToken = jwt.verify(req.body.token, process.env.SECRET_KEY); // -> user data
		if (!decodedToken) {
			return res.status(401).json({
				message: "Access token has been expired!",
			});
		}
		/* Save account to database */
		const newAccount = await new User(decodedToken).save();
		await new Collection({
			creator: newAccount._id,
			albums: [],
			tracks: [],
			artists: [],
		});

		return res.status(201).json({
			id: newAccount._id,
			email: newAccount.email,
			username: newAccount.username,
			role: newAccount.role,
		});
	} catch (error) {
		return res.status(401).json({
			message: "jwt has expired!",
		});
	}
};

export const update = async (req, res) => {
	try {
		console.log(req.body);
		const updatedUser = await User.findOneAndUpdate({ _id: req.auth }, req.body, { new: true });
		console.log(updatedUser);
		return res.status(201).json(updatedUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
