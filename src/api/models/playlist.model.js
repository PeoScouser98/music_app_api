import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseSlugGenerator, { slugify } from "mongoose-slug-generator";

const playlistSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            min: 4,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Users",
            autopopulate: { select: "_id username" },
        },
        slug: { type: String, slug: "title", unique: true },
        tracks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tracks",
                autopopulate: { select: "-__v" },
            },
        ],
        thumbnail: {
            type: String,
            default:
                "https://firebasestorage.googleapis.com/v0/b/music-app-cdef5.appspot.com/o/pictures%2Fdefault-album-image.png?alt=media&token=3c078580-13d5-4252-9c35-ab1d30deefeb",
        },
        createAt: {
            type: Date,
            default: new Date().toLocaleDateString(),
        },
        public: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        strictPopulate: false,
    },
);

playlistSchema.plugin(mongooseAutoPopulate, mongooseSlugGenerator);
export default mongoose.model("Playlist", playlistSchema);
