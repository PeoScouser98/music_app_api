import mongoose from "mongoose";
const playlistSchema = mongoose.Schema({
	id: mongoose.Types.ObjectId,
	name: {
		type: String,
		require: true,
		min: 4,
	},
	userId: {
		type: mongoose.Types.ObjectId,
		ref: "Users",
		require: true,
	},
	createDate: {
		type: Date,
		require: true,
		default: new Date(),
	},
});
export default mongoose.model("Playlist", playlistSchema);
