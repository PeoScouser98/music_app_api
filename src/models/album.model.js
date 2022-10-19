import mongoose from "mongoose";
const albumSchema = mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	releaseDate: {
		type: Date,
		default: new Date().toLocaleDateString(),
		require: true,
	},
	artist: {
		type: mongoose.Types.ObjectId,
		ref: "Artist",
		require: true,
	},
	image: {
		type: String,
		default: "",
	},

});
export default mongoose.model("Album", albumSchema);
