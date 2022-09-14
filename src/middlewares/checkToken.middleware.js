import jwt from "jsonwebtoken";
import "dotenv/config";
export const checkExpToken = async (req, res, next) => {
	try {
		const { id } = jwt.verify(req.headers.token, process.env.SECRET_KEY);
		req.userId = id;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError")
			return res.status(200).json({
				error,
				statusCode: 401,
			});
	}
};
