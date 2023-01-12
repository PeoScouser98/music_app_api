import mongoose from "mongoose";
import mongoosePopulate from "mongoose-autopopulate";
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
				autopopulate: { select: "_id  name avatar" },
			},
		],
		genre: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Genre",
		},
		album: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album",
			autopopulate: { select: "_id title image" },
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
	},
);

trackSchema.pre("save", function (next) {
	this.trackSrc = `https://docs.google.com/uc?export=download&id=${this.fileId}`;
	this.downloadUrl = `https://drive.google.com/uc?authuser=0&id=${this.fileId}&export=download`;
	next();
});
trackSchema.virtual("thumbnail").get(function () {
	return this.album.image || this.artists[0].avatar || "/images/default-thumbnail.png";
});
trackSchema.plugin(mongoosePopulate);
export default mongoose.model("Tracks", trackSchema);
