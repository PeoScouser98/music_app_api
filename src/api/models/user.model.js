import mongoose from "mongoose";
import { createHmac } from "crypto";
import "dotenv/config";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			trim: true,
		},
		password: {
			type: String,
			minLength: 8,
			maxLength: 16,
			require: true,
			trim: true,
		},
		username: {
			type: String,
			require: true,
			trim: true,
		},
		address: {
			type: String,
			require: true,
			trim: true,
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
			enum: [0, 1],
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.methods = {
	authenticate(password) {
		return bcrypt.compareSync(password, this.password);
	},
	encryptPassword: (password) => {
		if (!password) return;
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	},
};

userSchema.pre("save", function (next) {
	this.password = this.encryptPassword(this.password);
	next();
});

export default mongoose.model("Users", userSchema);
