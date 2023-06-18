import Track from '../models/track.model';
import Album from '../models/album.model';
import Artist from '../models/artist.model';
import Playlist from '../models/playlist.model';
import Genre from '../models/genre.model';

const search = async (req, res) => {
	try {
		const keyword = req.query.keyword.toLowerCase();
		const pattern = new RegExp(`^${keyword}`, 'gi');
		const artists = await Artist.find({ $or: [{ name: pattern }, { desc: pattern }] }).limit(3);
		const albums = await Album.find({ $or: [{ title: pattern }, { artist: artists }] })
			.populate({ path: 'artist', select: '-wallpaper' })
			.limit(3);
		const genre = await Genre.find({ name: pattern }).limit(3);
		const tracks = await Track.find({ $or: [{ title: pattern }, { artists: artists }, { genre: genre }] })
			.populate({
				path: 'artists album genre',
				select: '-releaseDate -artist -tracks -__v -wallpaper -desc',
			})
			.select('-__v -fileId -createdAt -updatedAt -uploader ')
			.limit(10);
		const playlists = await Playlist.find({ title: pattern })
			.populate({ path: 'creator artist', select: 'username name' })
			.limit(3);
		return res.status(200).json({ tracks, artists, playlists, albums });
	} catch (error) {
		return res.json({
			message: 'No result',
			status: 404,
		});
	}
};
export default search;
