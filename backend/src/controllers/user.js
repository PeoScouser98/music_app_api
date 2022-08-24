import User from "../models/user";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
	try {
		const account = await User.findOne({ email: req.body.email }).exec();
		if (!account)
			res.status(404).json({
				message: "Tài khoản không tồn tại",
			});
		if (!account.authenticate(req.body.password))
			res.status(404).json({
				message: "Mật khẩu không đúng",
			});
		const token = jwt.sign({ id: account._id }, process.env.PRIVATE_KEY, { expiresIn: 60 * 60 });
		/**
		 * sign(data + secret_key) => token
		 * verify(token + secret_key) => data
		 *  */

		res.status(200).json({
			token,
			account: {
				id: account._id,
				email: account.email,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: "Đăng nhập không thành công!",
			err: error.message,
		});
	}
};
export const signup = async (req, res) => {
	try {
		const account = await User.findOne({ email: req.body.email }).exec();
		if (account)
			return res.status(400).json({
				message: "Tài khoản đã tồn tại",
			});
		else {
			const newAccount = await new User(req.body).save();
			res.status(200).json({
				account: {
					email: newAccount.email,
					username: newAccount.username,
					role: newAccount.role,
				},
			});
		}
	} catch (error) {
		res.status(400).json({
			message: "Đăng ký không thành công",
			error: error,
		});
	}
};
