import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const albumSchema = mongoose.Schema(
	{
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
			autopopulate: { select: "_id name avatar" },
		},
		image: {
			type: String,
			default: "",
		},
	},
	{
		strictPopulate: false,
		timestamps: true,
	},
);

albumSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("Album", albumSchema);
