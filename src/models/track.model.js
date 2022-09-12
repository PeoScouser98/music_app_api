import mongoose from "mongoose";

const trackSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		artist: {
			type: String,
			ref: "Artist",
		},
		genre: {
			type: String,
			ref: "Genre",
		},
		album: {
			type: String,
			ref: "Album",
		},
		playlist: [
			{
				type: String,
				ref: "Playlist",
			},
		],
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
		thumbnail: {
			type: String,
			default: "",
		},
		listen: {
			type: Number,
			default: 0,
		},
		uploader: {
			type: String,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

trackSchema.pre("save", function (next) {
	this.trackSrc = `https://docs.google.com/uc?export=download&id=${this.fileId}`;
	this.downloadUrl = `https://drive.google.com/uc?authuser=0&id=${this.fileId}&export=download`;
	next();
});
export default mongoose.model("Tracks", trackSchema);
