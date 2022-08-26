import Album from "../models/album";
import Track from "../models/track";

export const list = async (req, res) => {
	try {
		const data = await Product.find();
		res.json(data);
	} catch (error) {
		res.status(404).json({
			message: "Album không tồn tại!",
		});
	}
};
export const read = async (req, res) => {
	try {
		const album = await Album.findOne({ _id: req.params.id }).exec(); // exec() return về 1 promise
		const tracks = await Track.find({ _id: req.params.id }).populate("Album").exec();
		res.json({
			album,
			tracks,
		});
	} catch (error) {
		res.status(404).json({
			message: "Album không tồn tại",
		});
	}
};
export const create = async (req, res) => {
	try {
		const album = await new Album(req.body).save();
		res.json(album);
	} catch (error) {
		res.status(400).json({
			message: "Không thêm được album",
		});
	}
};
export const del = async (req, res) => {
	try {
		const removedAlbum = await Album.findOneAndDelete({ _id: req.params.id }).exec();
		res.json(removedAlbum);
	} catch (error) {
		res.status(400).json({
			message: "Album không tồn tại",
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedAlbum = await Album.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		res.json(updatedAlbum);
	} catch (error) {
		res.status(400).json({
			message: "Không update được album",
		});
	}
};
