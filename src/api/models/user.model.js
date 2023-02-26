import bcrypt from "bcrypt";
import mongoose from "mongoose";
import "dotenv/config";

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			trim: true,
			trim: true,
			unique: true,
			validate: {
				validator: function (value) {
					return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
				},
				message: (props) => `${props.value} is not a valid email address!`,
			},
		},
		password: {
			type: String,
			minLength: 6,
			maxLength: 16,
			require: true,
			trim: true,
		},
		username: {
			type: String,
			require: true,
			trim: true,
		},

		avatar: {
			type: String,
		},

		role: {
			type: String,
			enum: ["USER", "ADMIN"],
			default: "USER",
		},
	},
	{
		timestamps: true,
	},
);

userSchema.methods.authenticate = function (password) {
	return bcrypt.compareSync(password, this.password);
};
userSchema.methods.encryptPassword = function (password) {
	if (!password) return;
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.pre("save", function (next) {
	this.password = this.encryptPassword(this.password);
	this.avatar = "https://ui-avatars.com/api/?name=" + this.username?.charAt(0);
	next();
});

export default mongoose.model("Users", userSchema);
