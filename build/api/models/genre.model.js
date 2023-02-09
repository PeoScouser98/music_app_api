"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSlugGenerator = require("mongoose-slug-generator");

var _mongooseSlugGenerator2 = _interopRequireDefault(_mongooseSlugGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var genreSchema = _mongoose2.default.Schema({
	name: {
		type: String,
		require: true
	},
	slug: { type: String, slug: ["name"], unique: true }
});

_mongoose2.default.plugin(_mongooseSlugGenerator2.default);

exports.default = _mongoose2.default.model("Genre", genreSchema);