import User from "../models/user.model";
import jwt from "jsonwebtoken";
import "dotenv/config";
import jwtConfig from "../config/jwt.config";

export const requireSignin = async (req, res, next) => {
	try {
		const token = req.body.token || req.query.token;
		const userId = await jwt.verify(token, jwtConfig.certification);
		if (!userId)
			return res.status(401).json({
				message: "You haven't login yet!",
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
		return res.status(401).json({
			message: "Không phải admin! Chim cút !",
		});
	next();
};
