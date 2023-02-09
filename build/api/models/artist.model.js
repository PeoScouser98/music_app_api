"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSlugGenerator = require("mongoose-slug-generator");

var _mongooseSlugGenerator2 = _interopRequireDefault(_mongooseSlugGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var artistSchema = _mongoose2.default.Schema({
	name: {
		type: String,
		require: true
	},
	avatar: {
		type: String,
		default: "default.png",
		require: true
	},
	wallpaper: {
		type: String,
		default: "default.png",
		require: true
	},
	desc: {
		type: String
	}
}, {
	strictPopulate: false,
	toJSON: { virtuals: true }
});

artistSchema.plugin(_mongooseSlugGenerator2.default);

exports.default = _mongoose2.default.model("Artist", artistSchema);