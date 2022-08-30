import Artist from "../models/artist";
export const list = async (req, res) => {
	try {
		const artists = await Artist.find().exec();
		res.json(artists);
	} catch (error) {
		return res.status(404).json({
			message: "Không có bài nghệ sĩ nào",
		});
	}
};
export const read = async (req, res) => {
	try {
		const artist = await Artist.findOne({ _id: req.params.id }).exec();
		res.json(artist);
	} catch (error) {
		res.status(404).json({
			message: "Nghệ sĩ không tồn tại",
		});
	}
};
export const create = async (req, res) => {
	try {
		const newArtist = await new Artist(req.body).save();
		res.status(201).json(newArtist);
	} catch (error) {
		res.status(400).json({
			message: "Không thêm được nghệ sĩ",
		});
	}
};
export const update = async (req, res) => {
	try {
		const updatedArtist = await Artist.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		res.json(updatedArtist);
	} catch (error) {
		res.status(400).json({
			message: "Không update được thông tin nghệ sĩ",
		});
	}
};
export const del = async (req, res) => {
	try {
		const deletedArtist = await Artist.findOneAndDelete({ _id: req.params.id }).exec();
		res.json(deletedArtist);
	} catch (error) {
		res.status(400).json({
			message: "Không xóa được nghệ sĩ",
		});
	}
};
