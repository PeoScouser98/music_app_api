import mongoose from "mongoose";
const playlistSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			min: 4,
		},
		userId: {
			type: String,
			ref: "Users",
			require: true,
		},
	},
	{
		timestamps: true,
	},
);
export default mongoose.model("Playlist", playlistSchema);
