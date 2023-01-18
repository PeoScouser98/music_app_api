import Artist from "../models/artist.model";
import Track from "../models/track.model";
import Album from "../models/album.model";
import Collection from "../models/collection.model";

export const list = async (req, res) => {
	try {
		const skip = +req.query.skip || 0;
		const limit = +req.query.limit || 10;
		const artists = await Artist.find().skip(skip).limit(limit).exec();
		return res.status(200).json(artists);
	} catch (error) {
		return res.status(404).json({
			message: "Cannot find the artist!",
		});
	}
};

export const read = async (req, res) => {
	try {
		const _artist = Artist.findOne({ _id: req.params.id }).exec();
		const _followers = Collection.find({ artists: req.params.id }).select("_id").count();
		const _tracks = Track.find({ artists: req.params.id }).sort({ listen: -1 }).exec();
		const _albums = Album.find({ artist: req.params.id }).exec();

		const [artist, followers, tracks, albums] = await Promise.all([_artist, _followers, _tracks, _albums]);

		return res.status(200).json({ artist, tracks, albums, followers });
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
		let updatedArtist;
		if (req.body.follower) {
			updatedArtist = await Artist.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $push: { followers: req.body.follower } },
				{ new: true, upsert: true },
			).exec();
			if (req.query.action == "unfollow")
				updatedArtist = await Artist.findByIdAndUpdate(
					{ _id: req.params.id },
					{ $pull: { followers: req.body.follower } },
					{ new: true, upsert: true },
				).exec();
		}
		updatedArtist = await Artist.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
		return res.status(201).json(updatedArtist);
	} catch (error) {
		res.status(500).json({
			message: "Error! Cannot update artist!",
			error: error.message,
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
