import mongoose from "mongoose";

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

export default mongoose.model("Collections", collectionSchema);
