import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseSlugGenerator from "mongoose-slug-generator";

const trackSchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		slug: { type: String, slug: ["title"], unique: true },
		artists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Artist",
				autopopulate: true,
			},
		],
		genre: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Genre",
			autopopulate: true,
		},
		album: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album",
			autopopulate: { select: "_id title image -artist" },
		},
		fileId: {
			type: String,
			require: true,
		},
		thumbnail: {
			type: String,
		},
		trackSrc: {
			type: String,
		},
		downloadUrl: {
			type: String,
		},
		listen: {
			type: Number,
			default: 0,
		},
		uploader: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		fileName: { type: String },
		duration: {
			type: Number,
			require: true,
		},
	},
	{
		strictPopulate: false,
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

trackSchema.virtual("alternativeThumbnail").get(function () {
	try {
		return this.album.image;
	} catch (error) {
		return this.artists.length > 0 ? this.artists.at(0).avatar : "/images/default-thumbnail.png";
	}
});

trackSchema.plugin(mongooseAutoPopulate, mongooseSlugGenerator);

export default mongoose.model("Tracks", trackSchema);
