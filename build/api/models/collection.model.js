"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutopopulate = require("mongoose-autopopulate");

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collectionSchema = _mongoose2.default.Schema({
	creator: {
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "Users",
		autopopulate: { select: "_id username avatar" }
	},
	artists: [{
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "Artist",
		autopopulate: true
	}],
	albums: [{
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "Album",
		autopopulate: true
	}],
	tracks: [{
		type: _mongoose2.default.Schema.Types.ObjectId,
		ref: "Tracks",
		autopopulate: true
	}]
}, {
	timestamps: true,
	strictPopulate: false
});

collectionSchema.plugin(_mongooseAutopopulate2.default);

exports.default = _mongoose2.default.model("Collections", collectionSchema);