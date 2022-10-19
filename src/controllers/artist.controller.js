import Artist from "../models/artist.model";
import Track from "../models/track.model";
import Album from "../models/album.model";

export const list = async (req, res) => {
	try {
		const artists = await Artist.find().exec();
		return res.status(200).json(artists);
	} catch (error) {
		return res.status(404).json({
			message: "Cannot find the artist!",
		});
	}
};

export const read = async (req, res) => {
	try {
		const artist = await Artist.findOne({ _id: req.params.id }).exec();
		const tracks = await Track.find({ artists: req.params.id })
			.populate({ path: "album artists", select: "_id name title image avatar" })
			.select("-createdAt -updatedAt -__v -fileId")
			.sort({ listen: -1 })
			.exec()
		const albums = await Album.find({ artist: req.params.id }).populate({ path: "artist", select: "name avatar" }).exec()
		return res.status(200).json({ artist, tracks, albums });
	} catch (error) {
		res.status(404).json({
			message: "Cannot find the artist!",
		});
	}
};

export const create = async (req, res) => {
	try {
		const newArtist = await new Artist(req.body).save();
		return res.status(201).json(newArtist);
	} catch (error) {
		res.status(500).json({
			message: "Error! Cannot create artist!",
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedArtist = await Artist.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		return res.status(201).json(updatedArtist);
	} catch (error) {
		res.status(500).json({
			message: "Error! Cannot update artist!",
		});
	}
};

export const del = async (req, res) => {
	try {
		const deletedArtist = await Artist.findOneAndDelete({ _id: req.params.id }).exec();
		res.status(204).json(deletedArtist);
	} catch (error) {
		res.status(500).json({
			message: "Error! Cannot delete artist!",
		});
	}
};




