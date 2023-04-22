import createHttpError from 'http-errors';
import Playlist from '../models/playlist.model';
import mongoose from 'mongoose';

export const list = async (req, res) => {
	try {
		const limit = req.query.limit || 10;
		const skip = req.query.skip || 0;
		const playlists = await Playlist.find({ public: true })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 })
			.exec();
		return res.status(200).json(playlists);
	} catch (error) {
		return res.json({
			error: 404,
			message: error.message,
		});
	}
};
export const getPlaylistsByUser = async (req, res) => {
	try {
		const playlistsByUser = await Playlist.find({
			creator: req.params.userId,
		})
			.skip(req.query.skip || 0)
			.limit(req.query.limit || 20)
			.exec();
		return res.status(200).json(playlistsByUser);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: 'Cannot find user playlists!',
		});
	}
};

export const listPrivatePlaylistsByUser = async (req, res) => {
	try {
		const playlists = await Playlist.find({
			creator: req.params.userId,
			public: false,
		}).select();
		return res.status(200).json(playlists);
	} catch (error) {
		return res.status(404).json({
			status: 404,
			message: 'Cannot find user playlists!',
		});
	}
};

export const read = async (req, res) => {
	try {
		const playlist = await Playlist.findOne({ _id: req.params.id })
			.select('-__v -updatedAt -createdAt')
			.exec();
		return res.status(200).json(playlist);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: 'Playlist does not exist!',
		});
	}
};

export const create = async (req, res) => {
	try {
		console.log('creator:>>>>', req.auth);
		const newPlaylist = await new Playlist({
			creator: new mongoose.Types.ObjectId(req.auth),
			...req.body,
		}).save();
		console.log(req.body);
		return res.status(201).json(newPlaylist);
	} catch (error) {
		res.status(500).json({
			message: 'Failed to create new playlist!',
		});
	}
};

export const updateTracksList = async (req, res) => {
	try {
		if (!req.body.track)
			throw createHttpError.BadRequest('Invalid track data!');
		console.log(req.body.track);
		const playlistHasThisTrack = await Playlist.findOne({
			_id: req.params.id,
			tracks: req.body.track,
		}).exec();

		if (!playlistHasThisTrack) {
			const afterAdded = await Playlist.updateOne(
				{ _id: req.params.id },
				{ $addToSet: { tracks: req.body.track } },
				{ new: true, upsert: true }
			);
			return res.status(201).json(afterAdded);
		}

		const afterRemoved = await Playlist.updateOne(
			{ _id: req.params.id },
			{ $pull: { tracks: req.body.track } },
			{ new: true, upsert: true }
		);
		return res.status(201).json(afterRemoved);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({
			message: error.message,
			status: error.status,
		});
	}
};

export const deletePlaylist = async (req, res) => {
	try {
		if (!req.auth)
			throw createHttpError('You cannot delete this playlist!');
		console.log(req.auth);
		const deletedPlaylist = await Playlist.updateOne({
			creator: req.auth,
			_id: req.params.id,
		}).exec();
		if (!deletedPlaylist)
			throw createHttpError('You cannot delete this playlist!');

		return res.status(204).json(deletedPlaylist);
	} catch (error) {
		res.status(200).json({
			status: error.status,
			message: error.message,
		});
	}
};
