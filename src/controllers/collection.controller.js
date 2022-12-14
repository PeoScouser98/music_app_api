import Artist from "../models/artist.model";
import Track from "../models/track.model";
import Album from "../models/album.model";
import Collection from "../models/collection.model";

/* :::::::::::: Get Collection ::::::::::::::::: */
export const getArtistsCollection = async (req, res) => {
	try {
		console.log(req.auth);
		if (req.auth) {
			const { artists } = await Collection.findOne({ creator: req.auth }).populate({ path: "artists" }).select("artists").exec();
			return res.status(200).json(artists);
		} else
			return res.status(401).json({
				message: "Require signin!",
			});
	} catch (error) {
		return res.status(404).json({
			error: error.message,
			message: "Cannot find followed artist",
		});
	}
};

export const getTracksCollection = async (req, res) => {
	try {
		if (req.auth) {
			const { tracks } = await Collection.findOne({ creator: req.auth })
				.populate({
					path: "tracks",
					select: "-fileId",
					populate: { path: "album artists", select: "-wallpaper -desc -__v -artist" },
				})
				.select("-_id tracks")
				.limit(req.query.limit)
				.exec();
			return res.status(200).json(tracks);
		} else
			return res.status(401).json({
				message: "Require sign in!",
			});
	} catch (error) {
		return res.status(404).json({
			message: "Cannot find tracks",
			error: error.message,
		});
	}
};

export const getAlbumsCollection = async (req, res) => {
	try {
		if (req.auth) {
			const { albums } = await Collection.findOne({ creator: req.auth })
				.populate({ path: "albums", populate: { path: "artist", select: "name" } })
				.select("albums")
				.exec();
			return res.status(200).json(albums);
		} else
			return res.status(401).json({
				message: "Require sign in!",
			});
	} catch (error) {
		res.status(404).json({
			message: "Cannot find liked albums",
		});
	}
};

/* ::::::::::::: Update Collection :::::::::::::::: */
export const updateTracksCollection = async (req, res) => {
	try {
		console.log(req.auth);
		if (req.auth) {
			const track = await Collection.findOne({ creator: req.auth, tracks: req.body.track }).select("tracks").exec();
			console.log(track);
			let tracksCollection;
			if (!track) tracksCollection = await Collection.findOneAndUpdate({ creator: req.auth }, { $push: { tracks: req.body.track } }, { new: true, upsert: true }).exec();
			else tracksCollection = await Collection.findOneAndUpdate({ creator: req.auth }, { $pull: { tracks: req.body.track } }, { new: true });
			return res.status(201).json(tracksCollection);
		} else
			return res.status(401).json({
				message: "Require sign in!",
			});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Cannot update tracks collection!",
		});
	}
};
export const updateAritstsCollection = async (req, res) => {
	try {
		if (req.auth) {
			const aritst = await Collection.findOne({ creator: req.auth, artists: req.body.artist }).select("artists").exec();
			let artistsCollection;
			if (!aritst) artistsCollection = await Collection.findOneAndUpdate({ creator: req.auth }, { $push: { artists: req.body.artist } }, { new: true, upsert: true }).exec();
			else artistsCollection = await Collection.findOneAndUpdate({ creator: req.auth }, { $pull: { artists: req.artist } }, { new: true });
			return res.status(201).json(artistsCollection);
		} else
			return res.status(401).json({
				message: "Require sign in!",
			});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot update artists collection !",
		});
	}
};
export const updateAlbumsCollection = async (req, res) => {
	try {
		if (req.auth) {
			let albumsCollection;
			const album = await Collection.findOne({ creator: req.auth, albums: req.body.album });
			if (!album) albumsCollection = await Collection.findOneAndUpdate({ creator: req.auth }, { $push: { albums: req.body.album } }, { new: true, upsert: true }).exec();
			else albumsCollection = await Collection.findOneAndUpdate({ creator: req.auth }, { $pull: { albums: req.body.album } }, { new: true });
			return res.status(201).json(albumsCollection);
		} else
			return res.status(401).json({
				message: "Require sign in!",
			});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot update albums collection!",
		});
	}
};
