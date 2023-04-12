import createHttpError from 'http-errors';
import Collection from '../models/collection.model';
import mongoose from 'mongoose';

/* :::::::::::: Get Collection ::::::::::::::::: */
export const getArtistsCollection = async (req, res) => {
	try {
		if (!req.auth) throw createHttpError.Unauthorized('Require signin!');

		const { artists } = await Collection.findOne({ creator: req.auth }).exec();
		return res.status(200).json(artists);
	} catch (error) {
		return res.status(404).json({
			error: error.message,
			message: 'Cannot find followed artist',
		});
	}
};

export const getTracksCollection = async (req, res) => {
	try {
		if (!req.auth) throw createHttpError.Unauthorized('Required signin!');
		const { tracks } = await Collection.findOne({ creator: req.auth })
			.populate({
				path: 'tracks',
				select: '-fileId',
				populate: { path: 'album artists', select: '-wallpaper -desc -__v -artist' },
			})
			.select('tracks')
			.limit(req.query.limit || 10)
			.exec();
		return res.status(200).json(tracks);
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			message: 'Cannot find tracks',
			error: error.message,
		});
	}
};

export const getAlbumsCollection = async (req, res) => {
	try {
		if (!req.auth) throw createHttpError.Unauthorized('Require signin!');

		const { albums } = await Collection.findOne({ creator: req.auth })
			.populate({ path: 'albums', populate: { path: 'artist', select: 'name' } })
			.select('albums')
			.exec();
		return res.status(200).json(albums);
	} catch (error) {
		res.status(404).json({
			message: 'Cannot find liked albums',
		});
	}
};

/* ::::::::::::: Update Collection :::::::::::::::: */
export const updateTracksCollection = async (req, res) => {
	try {
		if (!req.auth) throw createHttpError.Unauthorized('Require signin!');
		const track = await Collection.findOne({
			$and: [{ creator: req.auth }, { tracks: req.body._id }],
		})
			.select('tracks')
			.exec();
		if (track) {
			const removedTrack = await Collection.updateOne({ creator: req.auth }, { $pull: { tracks: req.body._id } }, { new: true });
			return res.status(201).json(removedTrack);
		}

		const newTrack = await Collection.updateOne({ creator: req.auth }, { $push: { tracks: req.body._id } }, { new: true, upsert: true }).exec();
		return res.status(201).json(newTrack);
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({
			message: 'Cannot update tracks collection!',
		});
	}
};

export const updateAritstsCollection = async (req, res) => {
	try {
		console.log(req.body.artist);
		const artists = await Collection.findOne({ $and: [{ creator: req.auth }, { artists: req.body.artist }] })
			.select('artists')
			.exec();

		if (!artists) {
			const followedArtist = await Collection.findOneAndUpdate(
				{ creator: req.auth },
				{ $push: { artists: req.body.artist } },
				{ new: true, upsert: true },
			).exec();
			return res.status(201).json(followedArtist);
		}

		const unfollowedArtist = await Collection.findOneAndUpdate(
			{ creator: req.auth },
			{ $pull: { artists: mongoose.Types.ObjectId(req.body.artist) } },
			{ new: true },
		);
		return res.status(204).json(unfollowedArtist);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			status: error.status,
			message: error.message,
		});
	}
};

export const updateAlbumsCollection = async (req, res) => {
	try {
		if (!req.auth) throw createHttpError.Unauthorized('Require signin!');

		const albums = await Collection.findOne({ creator: req.auth, albums: req.body._id }).select('albums').exec();
		if (!albums) {
			const newAlbum = await Collection.updateOne({ creator: req.auth }, { $addToSet: { albums: req.body._id } }, { new: true, upsert: true }).exec();
			return res.status(201).json(newAlbum);
		}
		const removedAlbum = await Collection.updateOne({ creator: req.auth }, { $pull: { albums: req.body._id } }, { new: true });
		return res.status(201).json(removedAlbum);
	} catch (error) {
		return res.status(200).json({
			status: error.status,
			message: error.message,
		});
	}
};
