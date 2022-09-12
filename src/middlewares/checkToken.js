import jwt from "jsonwebtoken";
import "dotenv/config";
export const checkExpToken = (req, res, next) => {
	try {
		const data = jwt.verify(req.query.token, process.env.SECRET_KEY);
		if (!data)
			return res.status(200).json({
				statusCode: 401,
				message: "::::: Token đã hết hạn ::::::",
			});
		next();
	} catch (error) {
		return res.status(400).json({
			message: "::: Error :::",
		});
	}
};
