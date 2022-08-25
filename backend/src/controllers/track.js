import Track from "../models/track";

// lấy ra tất cả bài hát
export const list = async (req, res) => {
	try {
		const tracks = await Track.find();
		res.json(tracks);
	} catch (error) {
		res.status(404).json({
			message: "Không có bài hát nào",
		});
	}
};

// lấy 1 bài hát
export const read = async (req, res) => {
	try {
		const track = await Track.findOne({ _id: req.params.id }).exec();
		res.json(track);
	} catch (error) {
		res.status(404).json({
			message: "Bài hát không tồn tại",
		});
	}
};

// upload bài hát
export const create = async (req, res) => {
	try {
		const newTrack = await new Track(req.body).save();
		res.json(newTrack);
	} catch (error) {
		res.status(400).json({
			message: "Không thêm được bài hát",
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedTrack = await Track.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		res.json(updatedTrack);
	} catch (error) {
		res.status(400).json({
			message: "Không update được bài hát",
		});
	}
};

export const del = (req, res) => {
	try {
		const deletedTrack = Track.findOneAndDelete({ _id: req.params.id }).exec();
		res.json(deletedTrack);
	} catch (error) {
		res.status(404).json({
			message: "Không xóa được bài hát",
		});
	}
};
