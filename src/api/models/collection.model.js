import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const collectionSchema = mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			autopopulate: { select: "_id username avatar" },
		},
		artists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Artist",
				autopopulate: { select: "_id name" },
			},
		],
		albums: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Album",
				autopopulate: true,
			},
		],
		tracks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tracks",
				autopopulate: true,
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
