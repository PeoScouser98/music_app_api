import Playlist from "../models/playlist.model";
import Track from "../models/track.model";
export const list = async (req, res) => {
	try {
		const playlists = await Playlist.find().exec();
		res.json(playlists);
	} catch (error) {
		res.status(404).json({
			message: "Không có playlist nào",
		});
	}
};
export const read = async (req, res) => {
	try {
		const playlist = await Playlist.find({ _id: req.params.id }).exec();
		const tracksInPlaylist = await Track.find({ playlist: playlist }).populate("playlist").exec();
		res.json({
			playlist: playlist.name,
			tracks: tracksInPlaylist,
		});
	} catch (error) {
		res.status(404).json({
			message: "Playlist không tồn tại",
		});
	}
};
export const create = async (req, res) => {
	try {
		const newPlaylist = await new Playlist(req.body).save();
		res.json(newPlaylist);
	} catch (error) {
		res.status(400).json({
			message: "Không tạo mới được playlist",
		});
	}
};
export const update = async (req, res) => {
	try {
		const updatedPlaylist = await Playlist.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		res.json(updatedPlaylist);
	} catch (error) {
		res.status(400).json({
			message: "Không update được playlist",
		});
	}
};
export const del = async (req, res) => {
	try {
		const deletedPlaylist = await Playlist.findOneAndDelete({ _id: req.params.id }).exec();
		res.json(deletedPlaylist);
	} catch (error) {
		res.status(400).json({
			message: "Không xóa được playlist",
		});
	}
};
