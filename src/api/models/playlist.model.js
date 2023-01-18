import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseSlugGenerator from "mongoose-slug-generator";

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
		},
		slug: { type: String, slug: "title", unique: true },
		tracks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tracks",
				autopopulate: { select: "-__v" },
			},
		],
		image: {
			type: String,
			default: "/images/default-album-image.png",
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
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);
// playlistSchema.pre("find", function (next) {
// 	if (this.slug === "" || !this.slug) {
// 		console.log(":>>>>", this.schema);
// 		this.slug = this.title.split(" ").join("-");
// 		return next();
// 	}
// 	next();
// });

// playlistSchema.virtual("thumbnail").get(function () {
// 	console.log("playlist tracks:>>", this);
// 	return [];
// });

playlistSchema.plugin(mongooseAutoPopulate, mongooseSlugGenerator);
export default mongoose.model("Playlist", playlistSchema);
