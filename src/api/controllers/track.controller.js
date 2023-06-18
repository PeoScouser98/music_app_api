import Track from '../models/track.model';
import Comment from '../models/comment.model';
import Genre from '../models/genre.model';
import createHttpError from 'http-errors';
import { deleteFile, uploadFile } from '../services/googleDrive.service';
import useCatchAsync from '../../utils/useCatchAsync';
import getDriveDownloadUrl from '../../utils/getDriveDownloadUrl';

// lấy ra tất cả bài hát
export const list = async (req, res) => {
	try {
		const limit = +req.query.limit || -1;
		const skip = +req.query.skip || 0;
		const tracks = await Track.find().sort({ listen: -1 }).skip(skip).limit(limit).exec();
		if (tracks.length === 1) return res.status(200).json(tracks[0]);
		return res.status(200).json(tracks);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			status: 404,
			message: 'Cannot find tracks!',
		});
	}
};

//
export const listByUploader = async (req, res) => {
	try {
		// console.log(req.auth);
		const tracks = await Track.find({ uploader: req.auth }).limit(+req.query.limit).sort({ createdAt: -1 }).exec();
		return res.status(200).json(tracks);
	} catch (error) {
		return res.status(404).json({
			message: 'Cannot find tracks that uploaded by user',
		});
	}
};

export const listRelatedTracks = async (req, res) => {
	try {
		let genre = req.params.genre;
		if (genre == 'undefined')
			Genre.findOne().then((data) => {
				console.log(data);
				genre = data._id;
			});

		const relatedTracks = await Track.find({ genre: genre }).limit(10).exec();

		return res.status(200).json(relatedTracks);
	} catch (error) {
		console.log(error.message);
		return res.status(200).json({
			status: 404,
			message: 'Cannot find related tracks',
		});
	}
};

// lấy 1 bài hát
export const getOneTrack = async (req, res) => {
	try {
		const track = await Track.findOne({ _id: req.params.id })
			.populate({ path: 'artists', select: '_id name avatar' })
			.populate({ path: 'album', select: '_id title image' })
			.select('-uploader -updatedAt -fileId')
			.exec();
		const comments = await Comment.find({ _id: track._id }).populate('user').exec();
		return res.status(200).json({
			track,
			comments,
		});
	} catch (error) {
		res.status(404).json({
			message: 'Bài hát không tồn tại',
		});
	}
};

// upload bài hát
export const uploadTrack = useCatchAsync(async (req, res) => {
	if (!req.auth) throw createHttpError.Forbidden('You have to login to upload track!');
	if (!req.files.length) throw createHttpError.BadRequest('No file uploaded !');
	const fileToUpload = req.files.find((file) => file.mimetype.includes('audio'));
	const thumbnailToUpload = req.files.find((file) => file.mimetype.includes('image'));
	const uploadPromises = [Promise.resolve(uploadFile(fileToUpload, process.env.MUSIC_DIR))];
	if (thumbnailToUpload) {
		uploadPromises.push(Promise.resolve(uploadFile(thumbnailToUpload, process.env.IMAGE_DIR)));
	}
	const [file, thumbnail] = await Promise.all(uploadPromises);

	const payload = {
		...req.body,
		fileId: file.data.id,
		artists: req.body.artists ? [req.body.artists] : null,
		uploader: req.auth,
	};
	if (thumbnail) payload.thumbnail = getDriveDownloadUrl(thumbnail.data.id);
	const newTrack = await new Track(payload).save();
	return res.status(201).json(newTrack);
});

export const updateTrack = async (req, res) => {
	try {
		const updatedTrack = await Track.updateOne({ _id: req.params.id }, req.body, {
			new: true,
			upsert: true,
		}).exec();
		return res.status(200).json(updatedTrack);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Cannot update track!',
		});
	}
};

export const deleteTrack = async (req, res) => {
	try {
		const { fileId } = await Track.findOne({ _id: req.params.id }).exec();
		await deleteFile(fileId);
		const deletedTrack = await Track.deleteOne({
			_id: req.params.id,
		}).exec();
		return res.status(204).json(deletedTrack);
	} catch (error) {
		return res.status(500).json({
			message: 'Cannot remove track',
		});
	}
};
