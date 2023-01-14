import Track from "../models/track.model";
import Comment from "../models/comment.model";
import deleteFile from "../services/drive-upload";
// lấy ra tất cả bài hát
export const list = async (req, res) => {
	try {
		const limit = +req.query.limit || -1;
		const skip = +req.query.skip || 0;
		const tracks = await Track.find()
			// .populate({ path: "artists album", select: "_id title name image avatar" })
			.select("-uploader -createdAt -updatedAt -fileId -genre -__v")
			.sort({ listen: -1 })
			.skip(skip)
			.limit(limit)
			.exec();
		if (tracks.length === 1) return res.status(200).json(tracks[0]);
		return res.status(200).json(tracks);
	} catch (error) {
		console.log(error);
		res.json({
			status: 404,
			message: "Cannot find tracks!",
		});
	}
};

//
export const listByUploader = async (req, res) => {
	try {
		console.log(req.auth);
		const tracks = await Track.find({ uploader: req.auth })
			.populate({ path: "artists album", select: "_id title name image avatar" })
			.select("-uploader -createdAt -updatedAt -fileId -genre -__v")
			.limit(+req.query.limit)
			.sort({ createdAt: -1 })
			.exec();
		return res.status(200).json(tracks);
	} catch (error) {
		return res.status(404).json({
			message: "Cannot find tracks that uploaded by user",
		});
	}
};

// lấy 1 bài hát
export const read = async (req, res) => {
	try {
		const track = await Track.findOne({ _id: req.params.id })
			.populate({ path: "artists", select: "_id name avatar" })
			.populate({ path: "album", select: "_id title image" })
			.select("-uploader -updatedAt -fileId")
			.exec();
		const comments = await Comment.find({ _id: track._id }).populate("user").exec();
		return res.status(200).json({
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
		req.body.uploader = req.auth;
		const newTrack = await new Track(req.body).save();
		return res.status(201).json(newTrack);
	} catch (error) {
		return res.status(500).json({
			message: "Cannot create new track!",
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedTrack = await Track.findOneAndUpdate({ _id: req.params.id }, req.body, {
			new: true,
			upsert: true,
		}).exec();
		return res.status(200).json(updatedTrack);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Cannot update track!",
		});
	}
};

export const del = async (req, res) => {
	try {
		const { fileId } = await Track.findOne({ _id: req.params.id }).exec();
		await deleteFile(fileId);
		const deletedTrack = await Track.findOneAndDelete({ _id: req.params.id }).exec();
		return res.status(204).json(deletedTrack);
	} catch (error) {
		return res.status(500).json({
			message: "Cannot remove track",
		});
	}
};
