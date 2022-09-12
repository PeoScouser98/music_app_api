import mongoose from "mongoose";
const albumSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	releaseDate: {
		type: Date,
		require: true,
	},
	artist: {
		type: mongoose.Types.ObjectId,
		ref: "Artist",
		require: true,
	},
	genre: {
		type: mongoose.Types.ObjectId,
		ref: "Genre",
		require: true,
	},
});
export default mongoose.model("Album", albumSchema);
