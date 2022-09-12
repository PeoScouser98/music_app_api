import Track from "../models/track.model";
import Comment from "../models/comment.model";
// lấy ra tất cả bài hát
export const list = async (req, res) => {
	try {
		const tracks = await Track.find().populate("artist").exec();
		res.status(200).json(tracks);
	} catch (error) {
		res.status(404).json({
			message: "Không có bài hát nào",
		});
	}
};

// lấy 1 bài hát
export const read = async (req, res) => {
	try {
		const track = await Track.findOne({ _id: req.params.id }).populate(["artist", "genre"]).exec();
		const comments = await Comment.find({ _id: track._id }).populate(["track", "user"]).exec();
		res.status(200).json({
			track,
			comments,
		});
	} catch (error) {
		res.status(404).json({
			message: "Bài hát không tồn tại",
		});
	}
};

// upload bài hát
export const create = async (req, res) => {
	try {
		// console.log(req.body);
		const newTrack = await new Track(req.body).save();
		console.log(newTrack);
		res.status(201).json(newTrack);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Không thêm được bài hát",
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedTrack = await Track.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		res.status(200).json(updatedTrack);
	} catch (error) {
		res.status(400).json({
			message: "Không update được bài hát",
		});
	}
};

export const del = (req, res) => {
	try {
		const deletedTrack = Track.findOneAndDelete({ _id: req.params.id }).exec();
		res.status(204).json(deletedTrack);
	} catch (error) {
		res.status(404).json({
			message: "Không xóa được bài hát",
		});
	}
};
