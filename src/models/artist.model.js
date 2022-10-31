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
});
export default mongoose.model("Artist", artistSchema);
