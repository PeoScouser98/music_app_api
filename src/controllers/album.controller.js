import Album from "../models/album.model";
import Track from "../models/track.model";

export const list = async (req, res) => {
	try {
		const data = await Album.find().populate({ path: "artist", select: "_id name" }).select("-tracks");
		return res.status(200).json(data);
	} catch (error) {
		return res.status(404).json({
			message: "Albums do not exist!",
		});
	}
};
export const read = async (req, res) => {
	try {
		const album = await Album.findOne({ _id: req.params.id }).populate({ path: "artist", select: "_id name" }).select("title image").exec();
		const tracks = await Track.find({ album: req.params.id }).populate({ path: "artists album", select: "_id name title avatar image" }).select("-__v -updatedAt -createdAt -fileId -uploader");
		return res.status(200).json({ album, tracks });
	} catch (error) {
		console.log(error.message);
		return res.status(404).json({
			message: "Album does not exist!",
		});
	}
};

export const create = async (req, res) => {
	try {
		const album = await new Album(req.body).save();
		return res.status(201).json(album);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Error! Cannot create album!",
		});
	}
};

export const del = async (req, res) => {
	try {
		const removedAlbum = await Album.findOneAndDelete({
			_id: req.params.id,
		}).exec();
		return res.status(204).json(removedAlbum);
	} catch (error) {
		return res.status(400).json({
			message: "Error! Cannot delete album!",
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedAlbum = await Album.findOneAndUpdate({ _id: req.params.id }, req.body, {
			new: true,
			upsert: true,
		}).exec();
		return res.status(201).json(updatedAlbum);
	} catch (error) {
		res.status(400).json({
			message: "Error! Cannot update album!",
		});
	}
};

export const removeFromAlbum = async (req, res) => {
	try {
		console.log("remove object id: ", req.body.track);
		const updatedAlbum = await Album.findOneAndUpdate({ _id: req.params.id }, { $pull: { tracks: req.body.track } }, { new: true, upsert: true }).exec();
		res.status(200).json(updatedAlbum.tracks);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Error! Cannot remove song from album!",
		});
	}
};
