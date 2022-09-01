import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		require: true,
		ref: "user",
	},
	content: {
		type: String,
		require: true,
	},
	createDate: {
		type: Date,
		require: true,
		default: new Date(),
	},
});
export default mongoose.model("Comment", commentSchema);
