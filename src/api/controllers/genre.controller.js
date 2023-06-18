import Genre from '../models/genre.model';
import Track from '../models/track.model';

export const list = async (req, res) => {
	try {
		const genres = await Genre.find();
		res.status(200).json(genres);
	} catch (error) {
		res.status(500).json({
			message: 'Genres do not exist!',
		});
	}
};

export const read = async (req, res) => {
	try {
		const genre = await Genre.findOne({ _id: req.params.id }).exec();
		const tracks = await Track.find({ genre: genre }).populate('genre').exec();
		res.status(200).json({
			genre,
			tracks,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Genre does not exist!',
		});
	}
};

export const create = async (req, res) => {
	try {
		const newGenre = await new Genre(req.body).save();
		res.status(201).json(newGenre);
	} catch (error) {
		res.status(500).json({
			message: 'Error! Cannot create new genre!',
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedGenre = await Genre.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
		res.status(201).json(updatedGenre);
	} catch (error) {
		res.status(500).json({
			message: 'Error! Cannot update this genre!',
		});
	}
};

export const del = async (req, res) => {
	try {
		const deletedGenre = await Genre.findOneAndDelete({ _id: req.params.id }).exec();
		res.status(204).json(deletedGenre);
	} catch (error) {
		res.status(500).json({
			message: 'Error! Cannot delete this genre!',
		});
	}
};
