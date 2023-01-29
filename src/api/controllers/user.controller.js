import bcrypt, { genSaltSync } from "bcrypt";
import "dotenv/config";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import transporter from "../../app/mailer";
import Collection from "../models/collection.model";
import User from "../models/user.model";
import { readFileSync } from "fs";
import path from "path";
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
		const user = await User.findOne({ _id: req.params.userId }).select("-password").exec();
		if (!user) throw createHttpError.BadRequest("Cannot find user");
		const privateKey = readFileSync(path.resolve(path.join(__dirname, "../../keys/private.pem")));
		const newAccessToken = jwt.sign({ id: user._id }, privateKey, { algorithm: "RS256", expiresIn: "5m" });
		console.log("new access token", newAccessToken);
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
		if (!user.authenticate(req.body.password))
			return res.status(401).json({
				message: "Incorrect password!",
			});

		const privateKey = readFileSync(path.resolve(path.join(__dirname, "../../keys/private.pem")));
		const accessToken = jwt.sign({ id: user._id }, privateKey, { algorithm: "RS256", expiresIn: "30s" });
		/**
		 * * sign(payload + secretKey) => token
		 * * verify(token + secretKey) => payload
		 *  */
		user.password = undefined;
		return res.status(200).json({
			auth: user._id,
			accessToken,
		});
	} catch (error) {
		console.error("[ERROR]", error.message);
		return res.status(500).json({
			message: error.message,
			status: error.status,
		});
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
		const privateKey = readFileSync(path.resolve(path.join(__dirname, "../../keys/private.pem")));
		const token = jwt.sign(req.body, privateKey, { algorithm: "RS256", expiresIn: "5m" });

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
		const privateKey = readFileSync(path.resolve(path.join(__dirname, "../../keys/private.pem")));
		const token = jwt.sign({ verifyCode: verifyCode }, privateKey, { algorithm: "RS256", expiresIn: "5m" });

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
		const certification = readFileSync(path.resolve(path.join(__dirname, "../../keys/public.crt")));
		const { verifyCode } = jwt.verify(user.token, certification, { algorithms: "RS256" });

		/* check verify code gửi lên == verify code parse từ token lưu trong database  */
		if (verifyCode === req.body.verifyCode) {
			const newPassword = bcrypt.hashSync(req.body.password, genSaltSync(10));
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
		const privateKey = readFileSync(path.resolve(path.join(__dirname, "../../keys/private.pem")));

		const decodedToken = jwt.verify(req.body.token, privateKey, { algorithms: "RS256" }); // -> user data
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
		}).save();

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
