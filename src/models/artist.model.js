import mongoose from "mongoose";

const artistSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
			default: "default.png",
			require: true,
		},
		wallpaper: {
			type: String,
			default: "default.png",
			require: true,
		},
		desc: {
			type: String,
		},
	},
	{
		strictPopulate: false,
		toJSON: { virtuals: true },
	},
);

export default mongoose.model("Artist", artistSchema);
