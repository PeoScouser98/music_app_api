import Playlist from "../models/playlist.model";

export const list = async (req, res) => {
	try {
		const limit = req.query.limit || 10;
		const skip = req.query.skip || 0;
		const playlists = await Playlist.find({ public: true }).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
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
		const playlistsByUser = await Playlist.find({ creator: req.params.userId })
			.populate({ path: "tracks", select: "thumbnail" })
			.skip(req.query.skip || 0)
			.limit(req.query.limit)
			.exec();
		return res.status(200).json(playlistsByUser);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: "Cannot find user playlists!",
		});
	}
};

export const listPrivatePlaylistsByUser = async (req, res) => {
	try {
		const playlists = await Playlist.find({ creator: req.params.userId, public: false }).select();
		return res.status(200).json(playlists);
	} catch (error) {
		return res.status(404).json({
			status: 404,
			message: "Cannot find user playlists!",
		});
	}
};

export const read = async (req, res) => {
	try {
		const playlist = await Playlist.findOne({ _id: req.params.id }).select("-__v -updatedAt -createdAt").exec();
		return res.status(200).json(playlist);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: "Playlist does not exist!",
		});
	}
};

export const create = async (req, res) => {
	try {
		const newPlaylist = await new Playlist({ creator: req.auth, ...req.body }).save();
		return res.status(201).json(newPlaylist);
	} catch (error) {
		res.status(500).json({
			message: "Failed to create new playlist!",
		});
	}
};

export const update = async (req, res) => {
	try {
		let updatedPlaylist;
		if (req.body.track) {
			const playlistHasThisTrack = await Playlist.findOne({ _id: req.params.id, tracks: req.body.track }).exec();
			console.log(playlistHasThisTrack);
			if (!playlistHasThisTrack) {
				updatedPlaylist = await Playlist.findOneAndUpdate(
					{ _id: req.params.id },
					{ $push: { tracks: req.body.track } },
					{ new: true },
				);
				return res.status(201).json(updatedPlaylist);
			} else {
				updatedPlaylist = await Playlist.findOneAndUpdate(
					{ _id: req.params.id },
					{ $pull: { tracks: req.body.track } },
					{ new: true, upsert: true },
				);
				return res.status(201).json(updatedPlaylist);
			}
		}

		updatedPlaylist = await Playlist.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		return res.status(201).json(updatedPlaylist);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Failed to update playlist!",
		});
	}
};

export const del = async (req, res) => {
	try {
		const deletedPlaylist = await Playlist.findOneAndDelete({ _id: req.params.id }).exec();
		return res.status(204).json(deletedPlaylist);
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete playlist!",
		});
	}
};
