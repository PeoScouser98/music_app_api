import Track from "../models/track.model";
import Album from "../models/album.model";
import Artist from "../models/artist.model";
import Playlist from "../models/playlist.model";
import Genre from "../models/genre.model";

const search = async (req, res) => {
	try {
		const pattern = new RegExp(`^${req.body.keyword.toLowerCase()}`, "gi");
		const artists = await Artist.find({ $or: [{ name: pattern }, { desc: pattern }] }).limit(3);
		const albums = await Album.find({ $or: [{ title: pattern }, { artist: artists }] })
			.populate({ path: "artist", select: "-wallpaper" })
			.limit(3);
		const genre = await Genre.find({ name: pattern }).limit(3);
		const tracks = await Track.find({ $or: [{ title: pattern }, { artists: artists }, { genre: genre }] })
			.populate({
				path: "artists album genre",
				select: "-releaseDate -artist -tracks -__v -wallpaper -desc",
			})
			.select("-__v -fileId -createdAt -updatedAt -uploader ")
			.limit(10);
		const playlists = await Playlist.find({ title: pattern }).populate({ path: "creator artist", select: "username name" }).limit(3);
		return res.status(200).json({ tracks, artists, playlists, albums });
	} catch (error) {
		return res.status(404).json({
			message: "No result",
			error: error.message,
		});
	}
};
export default search;
