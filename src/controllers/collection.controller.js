import Artist from "../models/artist.model"
import Track from "../models/track.model"
import Album from "../models/album.model"

/* :::::::::::: Get Collection ::::::::::::::::: */
export const getArtistsCollection = async (req, res) => {
    try {
        if (req.auth) {
            const artistsCollection = await Artist.find({ followers: req.auth }).exec()
            return res.status(200).json(artistsCollection)
        }
        else return res.status(401).json({
            message: "Require signin!",
        })
    } catch (error) {
        return res.status(404).json({
            error: error.message,
            message: "Cannot find followed artist"
        })
    }
}

export const getTracksCollection = async (req, res) => {
    try {
        if (req.auth) {
            const tracksCollection = await Track.find({ followers: req.auth })
                .populate({
                    path: "artists album",
                    select: "_id title name image avatar",
                })
                .select("-uploader -createdAt -updatedAt -fileId -genre -__v -followers")
                .limit(req.query.limit)
                .sort({})
                .exec()
            return res.status(200).json(tracksCollection)
        }
        else return res.status(401).json({
            message: "Require sign in!"
        })
    } catch (error) {
        return res.status(404).json({
            message: "Cannot find tracks",
            error: error.message
        })
    }
}

export const getAlbumsCollection = async (req, res) => {
    try {
        if (req.auth) {
            const albumsCollections = await Album.find({ followers: req.auth })
                .populate({ path: "artist" })
                .exec()
            return res.status(200).json(albumsCollections)
        }
        else return res.status(401).json({
            message: "Require sign in!"
        })
    } catch (error) {
        res.status(404).json({
            message: "Cannot find liked albums"
        })
    }
}


/* ::::::::::::: Update Collection :::::::::::::::: */
export const updateTracksCollection = async (req, res) => {
    try {
        console.log(req.auth);

        if (req.auth) {
            const follower = await Track.findOne({ _id: req.params.id, followers: req.auth }).select("followers").exec()
            console.log(follower);
            let tracksCollection
            if (!follower)
                tracksCollection = await Track.findOneAndUpdate({ _id: req.params.id }, { $push: { followers: req.auth } }, { new: true, upsert: true }).exec()
            else
                tracksCollection = await Track.findOneAndUpdate({ _id: req.params.id }, { $pull: { followers: req.auth } }, { new: true })
            console.log(tracksCollection);
            return res.status(201).json(tracksCollection)
        }
        else return res.status(401).json({
            message: "Require sign in!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Cannot update tracks collection!"
        })
    }
}
export const updateAritstsCollection = async (req, res) => {
    try {
        if (req.auth) {
            const follower = await Artist.findOne({ _id: req.params.id, followers: req.auth }).exec()
            let artistsCollection
            if (!follower)
                artistsCollection = await Artist.findOneAndUpdate({ _id: req.params.id }, { $push: { followers: req.auth } }, { new: true, upsert: true }).exec()
            if (req.query.action == "unfollow")
                artistsCollection = await Artist.findOneAndUpdate({ _id: req.params.id }, { $pull: { followers: req.auth } }, { new: true })
            return res.status(201).json(artistsCollection)
        }
        else return res.status(401).json({
            message: "Require sign in!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Cannot update artists collection !"
        })
    }
}
export const updateAlbumsCollection = async (req, res) => {
    try {
        if (req.auth) {
            let albumsCollections
            albumsCollections = await Album.findOneAndUpdate({ _id: req.params.id }, { $push: { followers: req.auth } }, { new: true, upsert: true }).exec()
            if (req.query.action == "unfollow")
                albumsCollections = await Album.findOneAndUpdate({ _id: req.params.id }, { $pull: { followers: req.auth } }, { new: true })
            return res.status(201).json(albumsCollections)
        }
        else return res.status(401).json({
            message: "Require sign in!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Cannot update albums collection!"
        })
    }
}