import mongoose from "mongoose";
const albumSchema = mongoose.Schema({
	id: mongoose.Types.ObjectId,
	name: {
		type: String,
		require: true,
	},
	releaseDate: {
		type: Date,
		require: true,
	},
	artistId: {
		type: mongoose.Types.ObjectId,
		ref: "Artist",
		require: true,
	},
	genreId: {
		type: mongoose.Types.ObjectId,
		ref: "Genre",
		require: true,
	},
});
