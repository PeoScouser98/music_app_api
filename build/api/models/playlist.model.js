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

var playlistSchema = _mongoose2.default.Schema({
	title: {
		type: String,
		require: true,
		min: 4
	},
	creator: {
		type: _mongoose2.default.Schema.Types.ObjectId,
		require: true,
		ref: "Users",
		autopopulate: { select: "_id username" }
	},
	slug: { type: String, slug: "title", unique: true },
	tracks: [{
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "Tracks",
		autopopulate: { select: "-__v" }
	}],
	thumbnail: {
		type: String,
		default: ""
	},
	createAt: {
		type: Date,
		default: new Date().toLocaleDateString()
	},
	public: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true,
	strictPopulate: false
});

playlistSchema.plugin(_mongooseAutopopulate2.default, _mongooseSlugGenerator2.default);
exports.default = _mongoose2.default.model("Playlist", playlistSchema);