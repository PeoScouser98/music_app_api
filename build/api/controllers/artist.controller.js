"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.del = exports.update = exports.create = exports.read = exports.list = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _artist2 = require("../models/artist.model");

var _artist3 = _interopRequireDefault(_artist2);

var _track = require("../models/track.model");

var _track2 = _interopRequireDefault(_track);

var _album = require("../models/album.model");

var _album2 = _interopRequireDefault(_album);

var _collection = require("../models/collection.model");

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var list = exports.list = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var skip, limit, artists;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						skip = +req.query.skip || 0;
						limit = +req.query.limit || 10;
						_context.next = 5;
						return _artist3.default.find().skip(skip).limit(limit).exec();

					case 5:
						artists = _context.sent;
						return _context.abrupt("return", res.status(200).json(artists));

					case 9:
						_context.prev = 9;
						_context.t0 = _context["catch"](0);
						return _context.abrupt("return", res.status(404).json({
							message: "Cannot find the artist!"
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

var read = exports.read = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var _artist, _followers, _tracks, _albums, _ref3, _ref4, artist, followers, tracks, albums;

		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_artist = _artist3.default.findOne({ _id: req.params.id }).exec();
						_followers = _collection2.default.find({ artists: req.params.id }).select("_id").count();
						_tracks = _track2.default.find({ artists: req.params.id }).sort({ listen: -1 }).exec();
						_albums = _album2.default.find({ artist: req.params.id }).exec();
						_context2.next = 7;
						return Promise.all([_artist, _followers, _tracks, _albums]);

					case 7:
						_ref3 = _context2.sent;
						_ref4 = _slicedToArray(_ref3, 4);
						artist = _ref4[0];
						followers = _ref4[1];
						tracks = _ref4[2];
						albums = _ref4[3];
						return _context2.abrupt("return", res.status(200).json({ artist: artist, tracks: tracks, albums: albums, followers: followers }));

					case 16:
						_context2.prev = 16;
						_context2.t0 = _context2["catch"](0);

						res.status(404).json({
							message: "Cannot find the artist!"
						});

					case 19:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 16]]);
	}));

	return function read(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

var create = exports.create = function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var newArtist;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return new _artist3.default(req.body).save();

					case 3:
						newArtist = _context3.sent;
						return _context3.abrupt("return", res.status(201).json(newArtist));

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3["catch"](0);

						res.status(500).json({
							message: "Error! Cannot create artist!"
						});

					case 10:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 7]]);
	}));

	return function create(_x5, _x6) {
		return _ref5.apply(this, arguments);
	};
}();

var update = exports.update = function () {
	var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
		var updatedArtist;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						updatedArtist = void 0;

						if (!req.body.follower) {
							_context4.next = 10;
							break;
						}

						_context4.next = 5;
						return _artist3.default.findByIdAndUpdate({ _id: req.params.id }, { $push: { followers: req.body.follower } }, { new: true, upsert: true }).exec();

					case 5:
						updatedArtist = _context4.sent;

						if (!(req.query.action == "unfollow")) {
							_context4.next = 10;
							break;
						}

						_context4.next = 9;
						return _artist3.default.findByIdAndUpdate({ _id: req.params.id }, { $pull: { followers: req.body.follower } }, { new: true, upsert: true }).exec();

					case 9:
						updatedArtist = _context4.sent;

					case 10:
						_context4.next = 12;
						return _artist3.default.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();

					case 12:
						updatedArtist = _context4.sent;
						return _context4.abrupt("return", res.status(201).json(updatedArtist));

					case 16:
						_context4.prev = 16;
						_context4.t0 = _context4["catch"](0);

						res.status(500).json({
							message: "Error! Cannot update artist!",
							error: _context4.t0.message
						});

					case 19:
					case "end":
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 16]]);
	}));

	return function update(_x7, _x8) {
		return _ref6.apply(this, arguments);
	};
}();

var del = exports.del = function () {
	var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
		var deletedArtist;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;
						_context5.next = 3;
						return _artist3.default.findOneAndDelete({ _id: req.params.id }).exec();

					case 3:
						deletedArtist = _context5.sent;

						res.status(204).json(deletedArtist);
						_context5.next = 10;
						break;

					case 7:
						_context5.prev = 7;
						_context5.t0 = _context5["catch"](0);

						res.status(500).json({
							message: "Error! Cannot delete artist!"
						});

					case 10:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 7]]);
	}));

	return function del(_x9, _x10) {
		return _ref7.apply(this, arguments);
	};
}();