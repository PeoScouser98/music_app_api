"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _track = require("../models/track.model");

var _track2 = _interopRequireDefault(_track);

var _album = require("../models/album.model");

var _album2 = _interopRequireDefault(_album);

var _artist = require("../models/artist.model");

var _artist2 = _interopRequireDefault(_artist);

var _playlist = require("../models/playlist.model");

var _playlist2 = _interopRequireDefault(_playlist);

var _genre = require("../models/genre.model");

var _genre2 = _interopRequireDefault(_genre);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var search = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var keyword, pattern, artists, albums, genre, tracks, playlists;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						keyword = req.query.keyword.toLowerCase();
						pattern = new RegExp("^" + keyword, "gi");
						_context.next = 5;
						return _artist2.default.find({ $or: [{ name: pattern }, { desc: pattern }] }).limit(3);

					case 5:
						artists = _context.sent;
						_context.next = 8;
						return _album2.default.find({ $or: [{ title: pattern }, { artist: artists }] }).populate({ path: "artist", select: "-wallpaper" }).limit(3);

					case 8:
						albums = _context.sent;
						_context.next = 11;
						return _genre2.default.find({ name: pattern }).limit(3);

					case 11:
						genre = _context.sent;
						_context.next = 14;
						return _track2.default.find({ $or: [{ title: pattern }, { artists: artists }, { genre: genre }] }).populate({
							path: "artists album genre",
							select: "-releaseDate -artist -tracks -__v -wallpaper -desc"
						}).select("-__v -fileId -createdAt -updatedAt -uploader ").limit(10);

					case 14:
						tracks = _context.sent;
						_context.next = 17;
						return _playlist2.default.find({ title: pattern }).populate({ path: "creator artist", select: "username name" }).limit(3);

					case 17:
						playlists = _context.sent;
						return _context.abrupt("return", res.status(200).json({ tracks: tracks, artists: artists, playlists: playlists, albums: albums }));

					case 21:
						_context.prev = 21;
						_context.t0 = _context["catch"](0);
						return _context.abrupt("return", res.json({
							message: "No result",
							status: 404
						}));

					case 24:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 21]]);
	}));

	return function search(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
exports.default = search;