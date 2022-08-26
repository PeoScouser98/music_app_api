import mongoose from "mongoose";
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
	},
	artistId: {
		type: mongoose.Types.ObjectId,
		require: true,
		ref: "artist",
	},
	trackSrc: {
		type: String,
		require: true,
	},
	thumbnail: {
		type: String,
		default: "",
	},
});

export default mongoose.model("Tracks", trackSchema);
