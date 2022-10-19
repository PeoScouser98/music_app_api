import mongoose from "mongoose";
const playlistSchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
			min: 4,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
			ref: "Users",
		},
		tracks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tracks",
			},
		],
		image: {
			type: String,
			default: "../../assets/img/default-thumbnail.png"
		},
		createAt: {
			type: Date,
			default: new Date().toLocaleDateString(),
		},
	},
	{
		timestamps: true,
		strictPopulate: false,
	},
);
export default mongoose.model("Playlist", playlistSchema);
