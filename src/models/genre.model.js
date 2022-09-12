import mongoose from "mongoose";
const genreSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
});
export default mongoose.model("Genre", genreSchema);
