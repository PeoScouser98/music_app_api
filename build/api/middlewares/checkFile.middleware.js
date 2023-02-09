"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.checkAudioFileExtension = undefined;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ========== middleware check audio file ============ */
var checkAudioFileExtension = exports.checkAudioFileExtension = function checkAudioFileExtension(file, callback) {
	// allowed file
	var regex = /wav|mp3|flac/;
	var isValidExt = regex.test(_path2.default.extname(file.originalname).toLowerCase());
	if (isValidExt) return callback(null, true);else {
		callback("File không đúng định dạng!");
		return {
			message: "File không đúng định dạng!"
		};
	}
};