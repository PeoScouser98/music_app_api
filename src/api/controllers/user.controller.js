import bcrypt, { genSaltSync } from "bcrypt";
import "dotenv/config";
import { readFileSync } from "fs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import path from "path";
import transporter from "../../app/mailer";
import Collection from "../models/collection.model";
import User from "../models/user.model";

const privateKey = readFileSync(path.resolve("private.pem"));
const certification = readFileSync(path.resolve("public.crt"));

/* ::::::::: Get all users ::::::::::::::: */
export const list = async (req, res) => {
	try {
		const users = await User.find().select("_id username avatar").exec();
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
		const user = await User.findOne({ _id: req.params.id }).select("_id avatar username").exec();
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
		const user = await User.findOne({ _id: req.auth }).select("-password -role").exec();
		return res.status(200).json(user);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

/* :::::::::::::::::::: Tạo refresh token :::::::::::::::::::::: */
export const refreshToken = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.userId }).exec();
		if (!user) throw createHttpError.BadRequest("Cannot find user");
		const newAccessToken = jwt.sign({ credential: user._id }, privateKey, { algorithm: "RS256", expiresIn: "15m" });
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

/* :::::::::::::::::: Sign in ::::::::::::::::::::: */
export const login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email }).exec();
		if (!user) throw createHttpError.NotFound("Account does not exist");
		if (!user.authenticate(req.body.password)) throw createHttpError.BadRequest("Password is incorrect!");

		const accessToken = jwt.sign({ credential: user._id }, privateKey, { algorithm: "RS256", expiresIn: "15m" });
		user.password = undefined;
		return res.status(200).json({
			credential: user._id,
			accessToken,
		});
	} catch (error) {
		console.error("[ERROR]", error.message);
		return res.status(200).json({
			message: error.message,
			status: error.status,
		});
	}
};

/* :::::::::::::::: Sign up ::::::::::::::::: */
export const register = async (req, res) => {
	try {
		const account = await User.findOne({ email: req.body.email }).exec();
		if (account) throw createHttpError.BadRequest("Account already existed!");
		// return res.status(200).json({
		// 	status: 400,
		// 	message: "Account already existed!",
		// });

		const token = jwt.sign(req.body, privateKey, { algorithm: "RS256", expiresIn: "5m" });

		const baseUrl = req.protocol + "://" + req.get("host") + "/activate-account";

		await transporter.sendMail(
			{
				from: process.env.AUTH_EMAIL,
				to: req.body.email,
				subject: "Activate your account",
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
			},
		);
	} catch (error) {
		return res.status(200).json({
			message: error.message,
			status: error.status,
		});
	}
};

/* :::::::::::::::: Send mail to recover password ::::::::::::::::::: */
export const recoverPassword = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email }).exec();
		if (!user)
			return res.status(404).json({
				message: "Email does not exist!",
			});
		/* tạo token */
		const verifyCode = Date.now().toString().substr(7, 6);
		const token = jwt.sign({ verifyCode: verifyCode, email: user.email }, privateKey, {
			algorithm: "RS256",
			expiresIn: "5m",
		});
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
		return res.status(201).json({ token: token });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

/* ::::::::::::::::::: Reset password :::::::::::::::::::: */
export const resetPassword = async (req, res) => {
	try {
		const token = req.headers.authorization.split(" ").at(1);
		const { verifyCode, email } = jwt.verify(token, certification, { algorithms: "RS256" });

		const user = await User.findOne({ email: email }).exec();
		if (verifyCode !== req.body.verifyCode || user === null) throw createHttpError.Forbidden("Verify code is invalid!");

		const newPassword = bcrypt.hashSync(req.body.password, genSaltSync(10));
		const response = await User.findOneAndUpdate({ email: email }, { password: newPassword }, { new: true });
		if (!response) throw createHttpError.InternalServerError("Failed to reset password");
		return res.status(201).json({
			message: "Reset password successfully!",
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
		const decodedToken = jwt.verify(req.query.token, certification, { algorithms: "RS256" }); // -> user data
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
		const updatedUser = await User.findOneAndUpdate({ _id: req.auth }, req.body, { new: true });
		console.log(updatedUser);
		return res.status(201).json(updatedUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
