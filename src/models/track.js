import mongoose from "mongoose";
import path from "path";

const uploadDate = new Date();
const trackSchema = mongoose.Schema({
	id: mongoose.Types.ObjectId,
	trackName: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	uploadDate: {
		type: Date,
		require: true,
		default: uploadDate.toLocaleDateString(),
	},
	artist: {
		type: mongoose.Types.ObjectId,
		require: true,
		ref: "Artist",
		default: "Various Artist",
	},
	genre: {
		type: mongoose.Types.ObjectId,
		require: true,
		ref: "Genre",
		default: "Unknown",
	},
	album: {
		type: mongoose.Types.ObjectId,
		require: true,
		ref: "Album",
		default: null,
	},
	playlist: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Playlist",
			default: null,
		},
	],
	trackSrc: {
		type: String,
		require: true,
	},
	thumbnail: {
		type: String,
		default: "",
	},
	listen: {
		type: Number,
		default: 0,
		require: true,
	},
	uploader: {
		type: mongoose.Types.ObjectId,
		require: true,
		ref: "User",
	},
});
trackSchema.methods = {
	checkAudioFileExtension(file) {
		const regex = /wav|mp3|flac/;
		const isValidExt = regex.test(path.extname(file).toLowerCase());
		return isValidExt;
	},
};
trackSchema.pre("save", function (next) {
	if (this.checkAudioFileExtension(this.trackSrc)) next();
});
export default mongoose.model("Tracks", trackSchema);
