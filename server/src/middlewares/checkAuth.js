import User from "../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const requireSignin = async (req, res, next) => {
	try {
		const token = req.body.token; // lấy token đc save vào localstorage sau khi đăng nhập
		const userId = jwt.verify(token, process.env.PRIVATE_KEY);
		if (!userId)
			return res.status(400).json({
				message: "Bạn phải đăng nhập để sử dụng tính năng này!",
			});
		req.role = await User.findOne({ _id: userId.id }, { role: 1 });
		next();
	} catch (error) {
		return res.status(400).json({
			err: error.message,
		});
	}
};

export const isAdmin = async (req, res, next) => {
	if (req.role != 1)
		return res.status(400).json({
			message: "Không phải admin! Chim cút !",
		});
	next();
};
