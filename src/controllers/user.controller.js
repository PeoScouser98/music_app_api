import User from "../models/user.model";
import transporter from "../config/nodemailer.config";
import "dotenv/config";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config";

export const getUser = async (req, res) => {
	try {
		const { id } = jwt.verify(req.query.token, jwtConfig.certification);
		const user = await User.findOne({ _id: id }).exec();
		res.status(200).json({
			username: user.username,
			avatar: user.avatar,
		});
	} catch (error) {
		res.status(404).json({
			status: 404,
			message: "Không tìm thấy user",
		});
	}
};

export const refreshToken = async (req, res) => {
	try {
		const newAccessToken = jwt.sign({ id: req.params.id }, jwtConfig.secretKey, { algorithm: jwtConfig.algorithm }, { expiresIn: jwtConfig.refreshTokenLife });
		if (newAccessToken)
			res.status(200).json({
				accessToken: newAccessToken,
				expiresIn: Date.now() + 15 * 1000,
			});
	} catch (error) {
		res.status(400).json({
			message: "Tạo refresh token không thành công",
		});
	}
};

export const login = async (req, res) => {
	try {
		const account = await User.findOne({ email: req.body.email }).exec();
		if (!account)
			return res.status(404).json({
				message: "Tài khoản không tồn tại",
			});
		if (!account.authenticate(req.body.password))
			return res.status(400).json({
				message: "Mật khẩu không đúng",
			});
		const token = jwt.sign({ id: account._id }, jwtConfig.secretKey, { algorithm: jwtConfig.algorithm }, { expiresIn: jwtConfig.tokenLife });
		/**
		 * * sign(data + secretKey) => token
		 * * verify(token + secretKey) => data
		 *  */

		return res.status(200).json({
			id: account._id,
			accessToken: token,
			expiresIn: Date.now() + 15 * 1000, // gửi về client thời gian hết hạn của access token
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Đăng nhập không thành công!",
			err: error.message,
		});
	}
};

// đăng ký
export const register = async (req, res) => {
	try {
		const account = await User.findOne({ email: req.body.email }).exec();
		if (account)
			return res.status(400).json({
				message: "Tài khoản đã tồn tại",
			});
		const token = jwt.sign(req.body, jwtConfig.secretKey, { algorithm: jwtConfig.algorithm }, { expiresIn: "5m" });
		await transporter.sendMail(
			{
				from: process.env.AUTH_EMAIL,
				to: req.body.email,
				subject: "Xác thực tài khoản",
				html: /*html */ `
					<h3>Sử dụng link này để kích hoạt tài khoản</h3>
					<p><a href=${process.env.ACTIVATION_URL}?token=${token}>Link kích hoạt</a></p>
					<i>Cảm ơn đã sử dụng dịch vụ của chúng tôi !</i>`,
			},
			(error, infor) => {
				if (error) {
					return res.status(400).json({
						message: error,
					});
				} else {
					res.status(200).json({
						message: `Email sent: ${infor.response}`,
					});
				}
			},
		);
	} catch (error) {
		res.status(403).json({
			message: "Đăng ký không thành công",
			error: error,
		});
	}
};

// kích hoạt tài khoản
export const activateAccount = async (req, res) => {
	try {
		const decodedToken = jwt.verify(req.body.token, jwtConfig.certification);
		if (!decodedToken) {
			return res.status(403).json({
				message: "Link xác thực đã hết hạn hoặc không tồn tại",
			});
		}
		const newAccount = await new User(decodedToken).save();
		res.status(200).json({
			email: newAccount.email,
			username: newAccount.username,
			role: newAccount.role,
		});
	} catch (error) {
		res.status(403).json({
			message: "Link xác thực tài khoản không tồn tại hoặc đã hết hạn",
		});
	}
};
