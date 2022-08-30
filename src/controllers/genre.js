import Genre from "../models/genre";
import Track from "../models/track";

export const list = async (req, res) => {
	try {
		const genres = await Genre.find();
		res.json(genres);
	} catch (error) {
		res.status(400).json({
			message: "Không tồn tại bài hát nào!",
		});
	}
};

export const read = async (req, res) => {
	try {
		const genre = await Genre.findOne({ _id: req.params.id }).exec();
		const tracks = await Track.find({ genre: genre }).populate("genre").exec();
		res.json({
			genre,
			tracks,
		});
	} catch (error) {
		res.status(400).json({
			message: "Thể loại bài hát không tồn tại",
		});
	}
};

export const create = async (req, res) => {
	try {
		const newGenre = await new Genre(req.body).save();
		res.json(newGenre);
	} catch (error) {
		res.status(400).json({
			message: "Không thêm được thể loại bài hát",
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedGenre = await Genre.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
		res.json(updatedGenre);
	} catch (error) {
		res.status(400).json({
			message: "Không updated được thể loại bài hát!",
		});
	}
};

export const del = async (req, res) => {
	try {
		const deletedGenre = await Genre.findOneAndDelete({ _id: req.body.id }).exec();
		res.json(deletedGenre);
	} catch (error) {
		res.status(400).json({
			message: "Không xóa được thể loại bài hát",
		});
	}
};
