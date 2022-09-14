import User from "../models/user.model";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const requireSignin = async (req, res, next) => {
	try {
		const token = req.body.token || req.query.token || req.params.token || req.headers.token;
		const { id } = await jwt.verify(token, process.env.SECRET_KEY);
		const { role } = await User.findOne({ _id: id }, { role: 1 });

		req.role = role;
		req.auth = id;
		next();
	} catch (error) {
		return res.status(401).json({
			statusCode: 401,
			message: "You haven't login yet!",
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
