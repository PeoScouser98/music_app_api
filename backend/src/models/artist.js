import mongoose from "mongoose";

const artistSchema = mongoose.Schema({
	id: mongoose.Types.ObjectId,
	name: {
		type: String,
		require: true,
		min: 6,
	},
	about: String,
});
export default mongoose.model("Artist", artistSchema);
