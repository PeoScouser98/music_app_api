"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateAlbumsCollection = exports.updateAritstsCollection = exports.updateTracksCollection = exports.getAlbumsCollection = exports.getTracksCollection = exports.getArtistsCollection = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpErrors = require("http-errors");

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _collection = require("../models/collection.model");

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* :::::::::::: Get Collection ::::::::::::::::: */
var getArtistsCollection = exports.getArtistsCollection = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var _ref2, artists;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;

						if (req.auth) {
							_context.next = 3;
							break;
						}

						throw _httpErrors2.default.Unauthorized("Require signin!");

					case 3:
						_context.next = 5;
						return _collection2.default.findOne({ creator: req.auth }).exec();

					case 5:
						_ref2 = _context.sent;
						artists = _ref2.artists;
						return _context.abrupt("return", res.status(200).json(artists));

					case 10:
						_context.prev = 10;
						_context.t0 = _context["catch"](0);
						return _context.abrupt("return", res.status(404).json({
							error: _context.t0.message,
							message: "Cannot find followed artist"
						}));

					case 13:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 10]]);
	}));

	return function getArtistsCollection(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var getTracksCollection = exports.getTracksCollection = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var _ref4, tracks;

		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;

						if (req.auth) {
							_context2.next = 3;
							break;
						}

						throw _httpErrors2.default.Unauthorized("Required signin!");

					case 3:
						_context2.next = 5;
						return _collection2.default.findOne({ creator: req.auth }).populate({
							path: "tracks",
							select: "-fileId",
							populate: { path: "album artists", select: "-wallpaper -desc -__v -artist" }
						}).select("tracks").limit(req.query.limit || 10).exec();

					case 5:
						_ref4 = _context2.sent;
						tracks = _ref4.tracks;
						return _context2.abrupt("return", res.status(200).json(tracks));

					case 10:
						_context2.prev = 10;
						_context2.t0 = _context2["catch"](0);

						console.log(_context2.t0);
						return _context2.abrupt("return", res.status(404).json({
							message: "Cannot find tracks",
							error: _context2.t0.message
						}));

					case 14:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 10]]);
	}));

	return function getTracksCollection(_x3, _x4) {
		return _ref3.apply(this, arguments);
	};
}();

var getAlbumsCollection = exports.getAlbumsCollection = function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var _ref6, albums;

		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;

						if (req.auth) {
							_context3.next = 3;
							break;
						}

						throw _httpErrors2.default.Unauthorized("Require signin!");

					case 3:
						_context3.next = 5;
						return _collection2.default.findOne({ creator: req.auth }).populate({ path: "albums", populate: { path: "artist", select: "name" } }).select("albums").exec();

					case 5:
						_ref6 = _context3.sent;
						albums = _ref6.albums;
						return _context3.abrupt("return", res.status(200).json(albums));

					case 10:
						_context3.prev = 10;
						_context3.t0 = _context3["catch"](0);

						res.status(404).json({
							message: "Cannot find liked albums"
						});

					case 13:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 10]]);
	}));

	return function getAlbumsCollection(_x5, _x6) {
		return _ref5.apply(this, arguments);
	};
}();

/* ::::::::::::: Update Collection :::::::::::::::: */
var updateTracksCollection = exports.updateTracksCollection = function () {
	var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
		var tracks, removedTrack, newTrack;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;

						if (req.auth) {
							_context4.next = 3;
							break;
						}

						throw _httpErrors2.default.Unauthorized("Require signin!");

					case 3:
						_context4.next = 5;
						return _collection2.default.findOne({
							creator: req.auth,
							tracks: req.body._id
						}).select("tracks").exec();

					case 5:
						tracks = _context4.sent;

						if (!tracks) {
							_context4.next = 11;
							break;
						}

						_context4.next = 9;
						return _collection2.default.findOneAndUpdate({ creator: req.auth }, { $pull: { tracks: req.body._id } }, { new: true });

					case 9:
						removedTrack = _context4.sent;
						return _context4.abrupt("return", res.status(201).json(removedTrack));

					case 11:
						_context4.next = 13;
						return _collection2.default.findOneAndUpdate({ creator: req.auth }, { $addToSet: { tracks: req.body } }, { new: true, upsert: true }).exec();

					case 13:
						newTrack = _context4.sent;
						return _context4.abrupt("return", res.status(201).json(newTrack));

					case 17:
						_context4.prev = 17;
						_context4.t0 = _context4["catch"](0);

						console.log(_context4.t0.message);
						return _context4.abrupt("return", res.status(400).json({
							message: "Cannot update tracks collection!"
						}));

					case 21:
					case "end":
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 17]]);
	}));

	return function updateTracksCollection(_x7, _x8) {
		return _ref7.apply(this, arguments);
	};
}();

var updateAritstsCollection = exports.updateAritstsCollection = function () {
	var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
		var aritst, followedArtist, unfollowedArtist;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;

						if (req.auth) {
							_context5.next = 3;
							break;
						}

						throw _httpErrors2.default.Unauthorized("Require signin!");

					case 3:
						_context5.next = 5;
						return _collection2.default.findOne({ creator: req.auth, artists: req.body.artist }).select("artists").exec();

					case 5:
						aritst = _context5.sent;

						if (aritst) {
							_context5.next = 11;
							break;
						}

						_context5.next = 9;
						return _collection2.default.findOneAndUpdate({ creator: req.auth }, { $addToSet: { artists: req.body.artist } }, { new: true, upsert: true }).exec();

					case 9:
						followedArtist = _context5.sent;
						return _context5.abrupt("return", res.status(201).json(followedArtist));

					case 11:
						_context5.next = 13;
						return _collection2.default.findOneAndUpdate({ creator: req.auth }, { $pull: { artists: req.artist } }, { new: true });

					case 13:
						unfollowedArtist = _context5.sent;
						return _context5.abrupt("return", res.status(201).json(unfollowedArtist));

					case 17:
						_context5.prev = 17;
						_context5.t0 = _context5["catch"](0);
						return _context5.abrupt("return", res.status(200).json({
							status: _context5.t0.status,
							message: _context5.t0.message
						}));

					case 20:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 17]]);
	}));

	return function updateAritstsCollection(_x9, _x10) {
		return _ref8.apply(this, arguments);
	};
}();

var updateAlbumsCollection = exports.updateAlbumsCollection = function () {
	var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
		var albums, newAlbum, removedAlbum;
		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.prev = 0;

						if (req.auth) {
							_context6.next = 3;
							break;
						}

						throw _httpErrors2.default.Unauthorized("Require signin!");

					case 3:
						_context6.next = 5;
						return _collection2.default.findOne({ creator: req.auth, albums: req.body._id }).select("albums").exec();

					case 5:
						albums = _context6.sent;

						if (albums) {
							_context6.next = 11;
							break;
						}

						_context6.next = 9;
						return _collection2.default.findOneAndUpdate({ creator: req.auth }, { $addToSet: { albums: req.body._id } }, { new: true, upsert: true }).exec();

					case 9:
						newAlbum = _context6.sent;
						return _context6.abrupt("return", res.status(201).json(newAlbum));

					case 11:
						_context6.next = 13;
						return _collection2.default.findOneAndUpdate({ creator: req.auth }, { $pull: { albums: req.body._id } }, { new: true });

					case 13:
						removedAlbum = _context6.sent;
						return _context6.abrupt("return", res.status(201).json(removedAlbum));

					case 17:
						_context6.prev = 17;
						_context6.t0 = _context6["catch"](0);
						return _context6.abrupt("return", res.status(200).json({
							status: _context6.t0.status,
							message: _context6.t0.message
						}));

					case 20:
					case "end":
						return _context6.stop();
				}
			}
		}, _callee6, undefined, [[0, 17]]);
	}));

	return function updateAlbumsCollection(_x11, _x12) {
		return _ref9.apply(this, arguments);
	};
}();