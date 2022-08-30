import mongoose from "mongoose";
const genreSchema = mongoose.Schema({
	id: mongoose.Types.ObjectId,
	name: {
		type: String,
		require: true,
	},
});
export default mongoose.model("Genre", genreSchema);
