import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 465,
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASSWORD,
	},
});
export const generateVerifyCode = () => {
	return Math.random().toString(36).substring(6).toUpperCase();
};
export default transporter;
