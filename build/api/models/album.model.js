"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutopopulate = require("mongoose-autopopulate");

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var albumSchema = _mongoose2.default.Schema({
	title: {
		type: String,
		require: true
	},
	releaseDate: {
		type: Date,
		default: new Date().toLocaleDateString(),
		require: true
	},
	artist: {
		type: _mongoose2.default.Types.ObjectId,
		ref: "Artist",
		require: true,
		autopopulate: { select: "_id name avatar" }
	},
	image: {
		type: String,
		default: ""
	}
}, {
	strictPopulate: false,
	timestamps: true
});

albumSchema.plugin(_mongooseAutopopulate2.default);
exports.default = _mongoose2.default.model("Album", albumSchema);