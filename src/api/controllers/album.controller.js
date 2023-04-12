import Album from '../models/album.model';
import Track from '../models/track.model';

export const list = async (req, res) => {
	try {
		const skip = req.query.skip || 0;
		const limit = req.query.limit || 10;
		const data = await Album.find().skip(skip).limit(limit).sort({ releaseDate: -1 }).select('-tracks');
		return res.status(200).json(data);
	} catch (error) {
		return res.status(404).json({
			message: 'Albums do not exist!',
		});
	}
};

export const read = async (req, res) => {
	try {
		const _album = Album.findOne({ _id: req.params.id }).exec();
		const _tracks = Track.find({ album: req.params.id }).exec();
		const [tracks, album] = await Promise.all([_tracks, _album]);
		return res.status(200).json({ album, tracks });
	} catch (error) {
		console.log(error.message);
		return res.status(404).json({
			message: 'Album does not exist!',
		});
	}
};

export const create = async (req, res) => {
	try {
		const album = await new Album(req.body).save();
		return res.status(201).json(album);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'Error! Cannot create album!',
		});
	}
};

export const del = async (req, res) => {
	try {
		const removedAlbum = await Album.deleteOne({
			_id: req.params.id,
		}).exec();
		return res.status(204).json(removedAlbum);
	} catch (error) {
		return res.status(400).json({
			message: 'Error! Cannot delete album!',
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedAlbum = await Album.updateOne({ _id: req.params.id }, req.body, {
			new: true,
			upsert: true,
		}).exec();
		return res.status(201).json(updatedAlbum);
	} catch (error) {
		return res.status(400).json({
			message: 'Error! Cannot update album!',
		});
	}
};

export const removeFromAlbum = async (req, res) => {
	try {
		console.log('remove object id: ', req.body.track);
		const updatedAlbum = await Album.updateOne({ _id: req.params.id }, { $pull: { tracks: req.body.track } }, { new: true, upsert: true }).exec();
		return res.status(200).json(updatedAlbum.tracks);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'Error! Cannot remove song from album!',
		});
	}
};
