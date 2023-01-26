import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseSlugGenerator, { slugify } from "mongoose-slug-generator";

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
		slug: { type: String, slug: "title", unique: true },
		tracks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tracks",
				autopopulate: { select: "-__v" },
			},
		],
		thumbnail: {
			type: String,
			default: "",
		},
		createAt: {
			type: Date,
			default: new Date().toLocaleDateString(),
		},
		public: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		strictPopulate: false,
	},
);

playlistSchema.plugin(mongooseAutoPopulate, mongooseSlugGenerator);
export default mongoose.model("Playlist", playlistSchema);
