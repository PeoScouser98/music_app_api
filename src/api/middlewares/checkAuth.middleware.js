import "dotenv/config";
import { readFileSync } from "fs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import path from "path";
import User from "../models/user.model";

export const checkAccessToken = async (req, res, next) => {
	try {
		const accessToken = req.body.token || req.params.token || req.headers.token || req.query.token;
		if (!accessToken) throw createHttpError.Unauthorized("Access token must be provided!");

		const certification = await readFileSync(path.resolve(path.join(__dirname, "../keys/public.crt")));
		const { id } = jwt.verify(accessToken, certification, { algorithms: "RS256" }, function (error, payload) {
			if (error) {
				throw createHttpError.Unauthorized(error.message);
			}
			return payload;
		});
		// const { role } = await User.findOne({ _id: payload }).select("role");
		// req.role = role;
		req.auth = id;

		next();
	} catch (error) {
		console.log(error);
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
