import User from "../models/user";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import transporter from "../utils/verifyAccount";
import "dotenv/config";
// đăng nhập

export const signin = async (req, res) => {
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
		const privateKey = fs.readFileSync(path.resolve(__dirname, "../config/keys/private.pem"));
		const token = jwt.sign({ id: account._id }, privateKey, { algorithm: "RS256" }, { expiresIn: "1d" });
		console.log(token);
		/**
		 * sign(data + secretKey) => token
		 * verify(token + secretKey) => data
		 *  */

		res.status(200).json({
			token,
			account: {
				id: account._id,
				role: account.role,
			},
		});
	} catch (error) {
		res.status(400).json({
			message: "Đăng nhập không thành công!",
			err: error.message,
		});
	}
};

// đăng ký
export const signup = async (req, res) => {
	try {
		const account = await User.findOne({ email: req.body.email }).exec();
		if (account)
			return res.status(400).json({
				message: "Tài khoản đã tồn tại",
			});
		const token = jwt.sign(req.body, process.env.JWT_ACTIVATE_KEY, { expiresIn: "5m" });
		await transporter.sendMail(
			{
				from: process.env.AUTH_EMAIL,
				to: req.body.email,
				subject: "Xác thực tài khoản",
				html: /*html */ `<h3>Sử dụng link này để kích hoạt tài khoản</h3>
					<p><a href=${process.env.ACTIVATION_URL}?token=${token}>Link kích hoạt</a></p>`,
			},
			(error, infor) => {
				if (error) {
					return res.status(400).json({
						message: `Error: ${error}`,
					});
				} else {
					res.status(200).json({
						message: `Email sent: ${infor.response}`,
					});
				}
			},
		);
	} catch (error) {
		res.status(500).json({
			message: "Đăng ký không thành công",
			error: error,
		});
	}
};

// kích hoạt tài khoản
export const activateAccount = async (req, res) => {
	try {
		const decodedToken = jwt.verify(req.body.token, process.env.JWT_ACTIVATE_KEY);
		if (!decodedToken) {
			return res.status(400).json({
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
		res.status(404).json({
			message: "Link xác thực tài khoản không tồn tại",
		});
	}
};
