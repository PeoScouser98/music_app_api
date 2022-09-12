import Comment from "../models/comment.model";

export const create = async (req, res) => {
	try {
		const newComment = await new Comment(req.body).save();
		res.status(201).json(newComment);
	} catch (error) {
		res.status(400).json({
			message: "Không post được comment",
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedComment = await Comment.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
		res.status(200).json(updatedComment);
	} catch (error) {
		res.status(400).json({
			message: "Không edit được comment",
		});
	}
};

export const del = async (req, res) => {
	try {
		const deletedComment = await Comment.findOneAndDelete({ _id: req.params.id }).exec();
		res.status(200).json(deletedComment);
	} catch (error) {
		res.status(400).json({
			message: "Không xóa được comment",
		});
	}
};
