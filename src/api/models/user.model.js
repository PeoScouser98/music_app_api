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
				"https://lh3.googleusercontent.com/RvrKmbSH42hgGe901ZWKiQJdzo_QfyDGia9-vgGTRjnoSSGiePb79PQ2jmwjbJ1QFJWlb-ntKiWasDJNTGbeX3l9YmkW2Mpf4D5ESu5CXUOIIo7XcBFC8eeyb2GH6Qwr-XoWrEVOhz8UrQit8W8YmdtT0g9-zZ0EE8F3KAcD9l1F_mDZDmxfk6b7-Os7weWoSR_Sbd7jnPe2cpUcZEDQtJprGwXLCwI9NiHWRj0lDLoMOEQWcZ5Oek7oiVPbHQdT0HaU4cyAzQEzh7NxwGmfsqbJ1gYpP2TNJe6DarbbvmLUJA3OqXZAYz9HGYVnX5JUWjSaehJQac85S-HsyvqxwWBmiFGN2L0xuBG2FECDpuFyHXuZ3YDM-vuf1Soxdnn317GT9AGCV6nYvXH6OOA9mH8yRPuaVNj6-mfNS7mo-hKkW24RkC5tuyOvv61GDVlvnLB-Z16AfiG9YcloqrKuuA5TgkqlN8BcketKH5XnwoUU0lnQZ5SGlajZ0mojmWc8HHiLtElnpyapkFtGXVcA5FKgHunK-I26ZMU7urNnBJaLtHEYSXDyg34FLCDb6xO1Zzb6KbjDfsaJ0SFfS_UqEb4frpYQcAvACAtuAueeQY7qLeBDQ25uXngH6_mBv8uSiMVIenCmL6Flc4LTcb8hBCUDufSmk6EeQqBINs7n7eJGzbDeO6qFe1v851duXjM5-B9BCtIiZqQ_eSET3QCiW6mJhRvaTCmqWyD20DtY0vUcAeWWbA6Twgt-OkFXC1_uWZzswlOlt2hGnMlmrOQCRjuz5rnohKuFfprJXprIj12mmooWYIx8uAHNHuM2qg0j2X8B2DI9CN9_IXkwzFAAeYZL03aY6qb5ZVZ1gIyTGvN3gVupaaaH1vvAlDpeGgf2pJ1XS0uo3BXxz5O1RL-Ur1N54l8tJ4LGRfGZ4qAp1EA0S5I=s500-no?authuser=0",
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
