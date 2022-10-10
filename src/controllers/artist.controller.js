import Artist from "../models/artist.model";
import Track from "../models/track.model";
import Album from "../models/album.model";

export const list = async (req, res) => {
	try {
		const artists = await Artist.find().exec();
		return res.status(200).json(artists);
	} catch (error) {
		return res.status(404).json({
			message: "Không có bài nghệ sĩ nào",
		});
	}
};
export const read = async (req, res) => {
	try {
		const artist = await Artist.findOne({ _id: req.params.id }).exec();
		return res.status(200).json(artist);
	} catch (error) {
		res.status(404).json({
			message: "Nghệ sĩ không tồn tại",
		});
	}
};
export const create = async (req, res) => {
	try {
		const newArtist = await new Artist(req.body).save();
		return res.status(201).json(newArtist);
	} catch (error) {
		res.status(400).json({
			message: "Không thêm được nghệ sĩ",
		});
	}
};
export const update = async (req, res) => {
	try {
		const updatedArtist = await Artist.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		return res.status(201).json(updatedArtist);
	} catch (error) {
		res.status(400).json({
			message: "Không update được thông tin nghệ sĩ",
		});
	}
};
export const del = async (req, res) => {
	try {
		const deletedArtist = await Artist.findOneAndDelete({ _id: req.params.id }).exec();
		res.status(200).json(deletedArtist);
	} catch (error) {
		res.status(400).json({
			message: "Không xóa được nghệ sĩ",
		});
	}
};

export const albumByArtist = async (req, res) => {
	try {
		const albums = await Album.find({ artist: req.params.id }).populate("artist").exec();
		return res.status(200).json(albums);
	} catch (error) {
		return res.status(404).json({
			message: "Không có playlist nào",
		});
	}
};

export const trackByArtist = async (req, res) => {
	try {
		const tracks = await Track.find({ artists: req.params.id })
			.populate({ path: "artists", select: "_id name avatar" })
			.populate({ path: "album", select: "_id title image" })
			.sort("listen")
			.exec();
		return res.status(200).json(tracks);
	} catch (error) {
		return res.status(404).json({
			message: "Không có bài hát nào",
		});
	}
};
