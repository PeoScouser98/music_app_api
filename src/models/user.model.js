import mongoose from "mongoose";
import { createHmac } from "crypto";
import "dotenv/config";

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			minLength: 8,
			require: true,
		},
		username: {
			type: String,
			require: true,
		},
		address: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
			require: true,
			default: "default.png",
		},
		phone: {
			type: String,
			require: true,
		},
		role: {
			type: Number,
			default: 0,
		},
		token: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);
userSchema.methods = {
	authenticate(password) {
		return this.password == this.encryptPassword(password);
	},
	encryptPassword: (password) => {
		if (!password) return;
		try {
			return createHmac("sha256", process.env.SECRET_KEY).update(password).digest("hex");
		} catch (error) {
			console.log(error);
		}
	},
};
userSchema.pre("save", function (next) {
	this.password = this.encryptPassword(this.password);
	next();
});
export default mongoose.model("Users", userSchema);
