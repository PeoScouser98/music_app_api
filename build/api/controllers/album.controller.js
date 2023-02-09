"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeFromAlbum = exports.update = exports.del = exports.create = exports.read = exports.list = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _album = require("../models/album.model");

var _album2 = _interopRequireDefault(_album);

var _track = require("../models/track.model");

var _track2 = _interopRequireDefault(_track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var list = exports.list = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var skip, limit, data;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						skip = req.query.skip || 0;
						limit = req.query.limit || 10;
						_context.next = 5;
						return _album2.default.find().skip(skip).limit(limit).sort({ releaseDate: -1 }).select("-tracks");

					case 5:
						data = _context.sent;
						return _context.abrupt("return", res.status(200).json(data));

					case 9:
						_context.prev = 9;
						_context.t0 = _context["catch"](0);
						return _context.abrupt("return", res.status(404).json({
							message: "Albums do not exist!"
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
		var album, tracks;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _album2.default.findOne({ _id: req.params.id }).exec();

					case 3:
						album = _context2.sent;
						_context2.next = 6;
						return _track2.default.find({ album: req.params.id }).exec();

					case 6:
						tracks = _context2.sent;
						return _context2.abrupt("return", res.status(200).json({ album: album, tracks: tracks }));

					case 10:
						_context2.prev = 10;
						_context2.t0 = _context2["catch"](0);

						console.log(_context2.t0.message);
						return _context2.abrupt("return", res.status(404).json({
							message: "Album does not exist!"
						}));

					case 14:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 10]]);
	}));

	return function read(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

var create = exports.create = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var album;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return new _album2.default(req.body).save();

					case 3:
						album = _context3.sent;
						return _context3.abrupt("return", res.status(201).json(album));

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3["catch"](0);

						console.log(_context3.t0);
						return _context3.abrupt("return", res.status(400).json({
							message: "Error! Cannot create album!"
						}));

					case 11:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 7]]);
	}));

	return function create(_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}();

var del = exports.del = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
		var removedAlbum;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return _album2.default.findOneAndDelete({
							_id: req.params.id
						}).exec();

					case 3:
						removedAlbum = _context4.sent;
						return _context4.abrupt("return", res.status(204).json(removedAlbum));

					case 7:
						_context4.prev = 7;
						_context4.t0 = _context4["catch"](0);
						return _context4.abrupt("return", res.status(400).json({
							message: "Error! Cannot delete album!"
						}));

					case 10:
					case "end":
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 7]]);
	}));

	return function del(_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}();

var update = exports.update = function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
		var updatedAlbum;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;
						_context5.next = 3;
						return _album2.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
							new: true,
							upsert: true
						}).exec();

					case 3:
						updatedAlbum = _context5.sent;
						return _context5.abrupt("return", res.status(201).json(updatedAlbum));

					case 7:
						_context5.prev = 7;
						_context5.t0 = _context5["catch"](0);
						return _context5.abrupt("return", res.status(400).json({
							message: "Error! Cannot update album!"
						}));

					case 10:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 7]]);
	}));

	return function update(_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}();

var removeFromAlbum = exports.removeFromAlbum = function () {
	var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
		var updatedAlbum;
		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.prev = 0;

						console.log("remove object id: ", req.body.track);
						_context6.next = 4;
						return _album2.default.findOneAndUpdate({ _id: req.params.id }, { $pull: { tracks: req.body.track } }, { new: true, upsert: true }).exec();

					case 4:
						updatedAlbum = _context6.sent;
						return _context6.abrupt("return", res.status(200).json(updatedAlbum.tracks));

					case 8:
						_context6.prev = 8;
						_context6.t0 = _context6["catch"](0);

						console.log(_context6.t0);
						return _context6.abrupt("return", res.status(400).json({
							message: "Error! Cannot remove song from album!"
						}));

					case 12:
					case "end":
						return _context6.stop();
				}
			}
		}, _callee6, undefined, [[0, 8]]);
	}));

	return function removeFromAlbum(_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
}();