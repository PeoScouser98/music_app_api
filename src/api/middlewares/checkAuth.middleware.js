import User from "../models/user.model";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAccessToken = async (req, res, next) => {
	try {
		const accessToken = req.body.token || req.params.token || req.headers.token || req.query.token;
		if (accessToken) {
			const { id } = jwt.verify(accessToken, process.env.SECRET_KEY);
			const { role } = await User.findOne({ _id: id }).select("role");
			req.role = role;
			req.auth = id;
		}
		next();
	} catch (error) {
		return res.status(200).json({
			status: 401,
			message: error.message,
		});
	}
};

export const isAdmin = async (req, res, next) => {
	if (req.role != 1)
		return res.status(401).json({
			message: "Unauthorized error! You are not admin!",
		});
	next();
};
