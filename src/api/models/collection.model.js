import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const collectionSchema = mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
		artists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Artist",
			},
		],
		albums: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Album",
			},
		],
		tracks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tracks",
			},
		],
	},
	{
		timestamps: true,
		strictPopulate: false,
	},
);

collectionSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("Collections", collectionSchema);
