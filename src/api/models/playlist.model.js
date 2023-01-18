import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

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
				autopopulate: { select: "-__v" },
			},
		],
		image: {
			type: String,
			default: "../../assets/img/default-thumbnail.png",
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
playlistSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("Playlist", playlistSchema);
