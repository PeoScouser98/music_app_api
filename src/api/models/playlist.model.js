import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseSlugGenerator from "mongoose-slug-generator";

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
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

playlistSchema.virtual("thumbnail").get(function () {
	if (this.tracks.length < 4) return "/images/default-album-image.png";
	return this.tracks
		.filter((track, index, thisArg) => thisArg.findIndex(track) === index)
		.slice(0, 4)
		.map((track) => track.thumbnail);
});

playlistSchema.plugin(mongooseAutoPopulate, mongooseSlugGenerator);
export default mongoose.model("Playlist", playlistSchema);
