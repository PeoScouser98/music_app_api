import jwt from "jsonwebtoken";
import "dotenv/config";
import cookiesParser from "cookie-parser";
export const requireSignin = (req, res, next) => {
	try {
		const token = req.cookies.token; // lấy token đc save vào cookie sau khi đăng nhập
		const userData = jwt.verify(token, process.env.SECRET_KEY);
		if (userData) next();
	} catch (error) {
		return res.status(400).json({
			message: "Đăng nhập để sử dụng tính năng này",
			err: error.message,
		});
	}
};
// export const requireSignin = expressjwt({
// 	algorithms: ["HS256"],
// 	secret: process.env.PRIVATE_KEY,
// 	requestProperty: "auth",
// });

// export const isAuth = (res, req, next) => {
// 	const status = req.profile
// };
