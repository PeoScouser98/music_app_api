import Playlist from "../models/playlist.model";
import Track from "../models/track.model";
import User from "../models/user.model";
export const list = async (req, res) => {
	try {
		const playlists = await Playlist.find().limit(req.query.limit).sort({ createdAt: -1 }).exec();
		return res.status(200).json(playlists);
	} catch (error) {
		return res.json({
			error: 404,
			message: error.message,
		});
	}
};
export const listByUser = async (req, res) => {
	try {
		const playlistsByUser = await Playlist.find({ creator: req.params.user }).exec();
		return res.status(200).json(playlistsByUser);
	} catch (error) {
		res.status(404).json({
			message: "Không có playlist nào",
		});
	}
};
export const read = async (req, res) => {
	try {
		const playlist = await Playlist.findOne({ _id: req.params.id, creator: req.auth })
			.populate({
				path: "tracks",
				select: "_id title trackSrc downloadUrl duration listen artists album",
				populate: {
					path: "album artists",
					select: "title name image avatar",
				},
			})
			.populate({ path: "creator", select: "username avatar role" })
			.select("-__v -updatedAt -createdAt")
			.exec();
		return res.status(200).json(playlist);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: "Playlist không tồn tại",
		});
	}
};

export const create = async (req, res) => {
	try {
		const newPlaylist = await new Playlist({ creator: req.auth, ...req.body }).save();
		return res.status(201).json(newPlaylist);
	} catch (error) {
		res.status(500).json({
			message: "Không tạo mới được playlist",
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
			message: "Không update được playlist",
		});
	}
};

export const del = async (req, res) => {
	try {
		const deletedPlaylist = await Playlist.findOneAndDelete({ _id: req.params.id }).exec();
		return res.status(204).json(deletedPlaylist);
	} catch (error) {
		res.status(500).json({
			message: "Không xóa được playlist",
		});
	}
};
