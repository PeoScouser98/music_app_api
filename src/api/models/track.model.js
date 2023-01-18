import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const trackSchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		artists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Artist",
				autopopulate: { select: "_id name avatar" },
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

trackSchema.pre("save", function (next) {
	this.trackSrc = `https://docs.google.com/uc?export=download&id=${this.fileId}`;
	this.downloadUrl = `https://drive.google.com/uc?authuser=0&id=${this.fileId}&export=download`;
	next();
});

trackSchema.virtual("thumbnail").get(function () {
	try {
		return this.album.image;
	} catch (error) {
		return this.artists[0].avatar || "/images/default-thumbnail.png";
	}
});

trackSchema.plugin(mongooseAutoPopulate, mongooseLeanVirtuals);

export default mongoose.model("Tracks", trackSchema);
