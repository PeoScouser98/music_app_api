import mongoose from "mongoose";

const artistSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
		default: "default.png",
		require: true,
	},
	wallpaper: {
		type: String,
		default: "default.png",
		require: true,
	},
	desc: {
		type: String,
	},
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
	],
});
export default mongoose.model("Artist", artistSchema);
