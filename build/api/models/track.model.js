"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutopopulate = require("mongoose-autopopulate");

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseSlugGenerator = require("mongoose-slug-generator");

var _mongooseSlugGenerator2 = _interopRequireDefault(_mongooseSlugGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trackSchema = _mongoose2.default.Schema({
	title: {
		type: String,
		require: true
	},
	slug: { type: String, slug: ["title"], unique: true },
	artists: [{
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "Artist",
		autopopulate: true
	}],
	genre: {
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "Genre",
		autopopulate: true
	},
	album: {
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "Album",
		autopopulate: { select: "_id title image -artist" }
	},
	fileId: {
		type: String,
		require: true
	},
	thumbnail: {
		type: String
	},
	trackSrc: {
		type: String
	},
	downloadUrl: {
		type: String
	},
	listen: {
		type: Number,
		default: 0
	},
	uploader: {
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "User"
	},
	duration: {
		type: Number,
		require: true
	}
}, {
	strictPopulate: false,
	timestamps: true,
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

// trackSchema.pre("save", function (next) {
// 	this.trackSrc = `https://docs.google.com/uc?export=download&id=${this.fileId}`;
// 	this.downloadUrl = `https://drive.google.com/uc?authuser=0&id=${this.fileId}&export=download`;
// 	next();
// });
// trackSchema.pre("find", function (next) {
// 	if (this.slug === "") this.slug = this.title.split(" ").join("-");
// 	next();
// });

trackSchema.virtual("alternativeThumbnail").get(function () {
	try {
		return this.album.image;
	} catch (error) {
		return this.artists.length > 0 ? this.artists.at(0).avatar : "/images/default-thumbnail.png";
	}
});

trackSchema.plugin(_mongooseAutopopulate2.default, _mongooseSlugGenerator2.default);

exports.default = _mongoose2.default.model("Tracks", trackSchema);