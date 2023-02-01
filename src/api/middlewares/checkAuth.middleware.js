import "dotenv/config";
import { readFileSync } from "fs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import path from "path";
import User from "../models/user.model";

export const checkAccessToken = async (req, res, next) => {
	try {
		const accessToken = req.headers.authorization.split(" ").at(1);
		if (!accessToken) throw createHttpError.Unauthorized("Access token must be provided!");

		const certification = await readFileSync(path.resolve(path.join(__dirname, "../keys/public.crt")));
		const { credential } = jwt.verify(accessToken, certification, { algorithms: "RS256" });
		const { role } = await User.findOne({ _id: credential }).select("role");
		req.role = role;
		req.auth = credential;

		next();
	} catch (error) {
		console.log("[ERROR] at checkAuth middleware:>>>", error.message);
		return res.status(401).json({
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
