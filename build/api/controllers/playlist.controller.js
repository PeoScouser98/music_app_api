"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deletePlaylist = exports.updateTracksList = exports.create = exports.read = exports.listPrivatePlaylistsByUser = exports.getPlaylistsByUser = exports.list = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _httpErrors = require("http-errors");

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _playlist = require("../models/playlist.model");

var _playlist2 = _interopRequireDefault(_playlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var list = exports.list = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var limit, skip, playlists;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						limit = req.query.limit || 10;
						skip = req.query.skip || 0;
						_context.next = 5;
						return _playlist2.default.find({ public: true }).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();

					case 5:
						playlists = _context.sent;
						return _context.abrupt("return", res.status(200).json(playlists));

					case 9:
						_context.prev = 9;
						_context.t0 = _context["catch"](0);
						return _context.abrupt("return", res.json({
							error: 404,
							message: _context.t0.message
						}));

					case 12:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 9]]);
	}));

	return function list(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
var getPlaylistsByUser = exports.getPlaylistsByUser = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var playlistsByUser;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _playlist2.default.find({ creator: req.params.userId }).populate({ path: "tracks", select: "thumbnail" }).skip(req.query.skip || 0).limit(req.query.limit).exec();

					case 3:
						playlistsByUser = _context2.sent;
						return _context2.abrupt("return", res.status(200).json(playlistsByUser));

					case 7:
						_context2.prev = 7;
						_context2.t0 = _context2["catch"](0);

						console.log(_context2.t0);
						res.status(404).json({
							message: "Cannot find user playlists!"
						});

					case 11:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 7]]);
	}));

	return function getPlaylistsByUser(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

var listPrivatePlaylistsByUser = exports.listPrivatePlaylistsByUser = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var playlists;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return _playlist2.default.find({ creator: req.params.userId, public: false }).select();

					case 3:
						playlists = _context3.sent;
						return _context3.abrupt("return", res.status(200).json(playlists));

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3["catch"](0);
						return _context3.abrupt("return", res.status(404).json({
							status: 404,
							message: "Cannot find user playlists!"
						}));

					case 10:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 7]]);
	}));

	return function listPrivatePlaylistsByUser(_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}();

var read = exports.read = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
		var playlist;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return _playlist2.default.findOne({ _id: req.params.id }).select("-__v -updatedAt -createdAt").exec();

					case 3:
						playlist = _context4.sent;
						return _context4.abrupt("return", res.status(200).json(playlist));

					case 7:
						_context4.prev = 7;
						_context4.t0 = _context4["catch"](0);

						console.log(_context4.t0);
						res.status(404).json({
							message: "Playlist does not exist!"
						});

					case 11:
					case "end":
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 7]]);
	}));

	return function read(_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}();

var create = exports.create = function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
		var newPlaylist;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;
						_context5.next = 3;
						return new _playlist2.default(_extends({ creator: req.auth }, req.body)).save();

					case 3:
						newPlaylist = _context5.sent;

						console.log(req.body);
						return _context5.abrupt("return", res.status(201).json(newPlaylist));

					case 8:
						_context5.prev = 8;
						_context5.t0 = _context5["catch"](0);

						res.status(500).json({
							message: "Failed to create new playlist!"
						});

					case 11:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 8]]);
	}));

	return function create(_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}();

var updateTracksList = exports.updateTracksList = function () {
	var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
		var playlistHasThisTrack, afterAdded, afterRemoved;
		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.prev = 0;

						if (req.body) {
							_context6.next = 3;
							break;
						}

						throw _httpErrors2.default.BadRequest("Invalid track data!");

					case 3:
						_context6.next = 5;
						return _playlist2.default.findOne({ _id: req.params.id, tracks: req.body.track }).exec();

					case 5:
						playlistHasThisTrack = _context6.sent;

						if (playlistHasThisTrack) {
							_context6.next = 11;
							break;
						}

						_context6.next = 9;
						return _playlist2.default.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { tracks: req.body.track } }, { new: true });

					case 9:
						afterAdded = _context6.sent;
						return _context6.abrupt("return", res.status(201).json(afterAdded));

					case 11:
						_context6.next = 13;
						return _playlist2.default.findOneAndUpdate({ _id: req.params.id }, { $pull: { tracks: req.body.track } }, { new: true, upsert: true });

					case 13:
						afterRemoved = _context6.sent;
						return _context6.abrupt("return", res.status(201).json(afterRemoved));

					case 17:
						_context6.prev = 17;
						_context6.t0 = _context6["catch"](0);

						console.log(_context6.t0.message);
						res.status(200).json({
							message: _context6.t0.message,
							status: _context6.t0.status
						});

					case 21:
					case "end":
						return _context6.stop();
				}
			}
		}, _callee6, undefined, [[0, 17]]);
	}));

	return function updateTracksList(_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
}();

var deletePlaylist = exports.deletePlaylist = function () {
	var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
		var deletedPlaylist;
		return _regenerator2.default.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						_context7.prev = 0;

						if (req.auth) {
							_context7.next = 3;
							break;
						}

						throw (0, _httpErrors2.default)("You cannot delete this playlist!");

					case 3:
						console.log(req.auth);
						_context7.next = 6;
						return _playlist2.default.findOneAndDelete({ creator: req.auth, _id: req.params.id }).exec();

					case 6:
						deletedPlaylist = _context7.sent;

						if (deletedPlaylist) {
							_context7.next = 9;
							break;
						}

						throw (0, _httpErrors2.default)("You cannot delete this playlist!");

					case 9:
						return _context7.abrupt("return", res.status(204).json(deletedPlaylist));

					case 12:
						_context7.prev = 12;
						_context7.t0 = _context7["catch"](0);

						res.status(200).json({
							status: _context7.t0.status,
							message: _context7.t0.message
						});

					case 15:
					case "end":
						return _context7.stop();
				}
			}
		}, _callee7, undefined, [[0, 12]]);
	}));

	return function deletePlaylist(_x13, _x14) {
		return _ref7.apply(this, arguments);
	};
}();