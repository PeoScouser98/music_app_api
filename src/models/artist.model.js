import mongoose from "mongoose";

const artistSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
});
export default mongoose.model("Artist", artistSchema);
