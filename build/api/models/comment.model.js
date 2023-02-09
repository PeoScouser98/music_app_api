"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentSchema = _mongoose2.default.Schema({
	track: {
		type: String,
		require: true,
		ref: "track"
	},
	userId: {
		type: String,
		require: true,
		ref: "user"
	},
	content: {
		type: String,
		require: true
	},
	postAt: {
		type: Date,
		default: new Date().toLocaleDateString(),
		require: true
	}
}, {
	timestamps: true
});
exports.default = _mongoose2.default.model("Comment", commentSchema);