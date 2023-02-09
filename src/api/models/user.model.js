import bcrypt from "bcrypt";
import mongoose from "mongoose";
import "dotenv/config";

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			trim: true,
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
			require: true,
			default:
				"https://firebasestorage.googleapis.com/v0/b/music-app-cdef5.appspot.com/o/pictures%2Fdefault-avatar.png?alt=media&token=a70a307e-5ec6-4375-8e0c-b2e926f8c417",
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

userSchema.methods.authenticate = function (password) {
	return bcrypt.compareSync(password, this.password);
};
userSchema.methods.encryptPassword = function (password) {
	if (!password) return;
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.pre("save", function (next) {
	this.password = this.encryptPassword(this.password);
	next();
});

export default mongoose.model("Users", userSchema);
