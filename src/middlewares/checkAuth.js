import User from "../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs";
import path from "path";

export const requireSignin = async (req, res, next) => {
	try {
		const certification = fs.readFileSync(path.resolve(__dirname, "../config/keys/private.pem"));
		const userId = jwt.verify(req.body.token, certification, { algorithms: "RS256" });
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
