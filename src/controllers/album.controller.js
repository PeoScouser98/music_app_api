import Album from "../models/album.model";
import Track from "../models/track.model";

export const list = async (req, res) => {
	try {
		const data = await Album.find().populate({ path: "artist", select: "_id name" }).select("-tracks");
		return res.status(200).json(data);
	} catch (error) {
		return res.status(404).json({
			message: "Album không tồn tại!",
		});
	}
};
export const read = async (req, res) => {
	try {
		const album = await Album.findOne({ _id: req.params.id }).populate("tracks").exec();
		return res.status(200).json(album);
	} catch (error) {
		console.log(error.message);
		return res.status(404).json({
			message: "Album không tồn tại",
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
			message: "Không thêm được album",
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
			message: "Album không tồn tại",
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
			message: "Không update được album",
		});
	}
};

export const addToAlbum = async (req, res) => {
	try {
		const trackInAlbum = await Track.findOne({ album: req.params.id });
		if (trackInAlbum) {
			return res.status(200).json({
				message: "Track already existed in album!",
			});
		}
		const album = await Album.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$push: { tracks: req.body.track },
			},
			{ new: true, upsert: true },
		);
		const track = await Track.findOneAndUpdate(
			{ _id: req.body.track },
			{
				thumbnail: album.image,
				album: album._id,
			},
		);
		return res.status(201).json({
			album,
			track,
		});
	} catch (error) {
		return res.status(400).json({
			message: "Cannot add to album!",
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
			message: "Không update được bài hát",
		});
	}
};
