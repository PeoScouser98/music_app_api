"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.del = exports.update = exports.create = exports.read = exports.list = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _genre = require("../models/genre.model");

var _genre2 = _interopRequireDefault(_genre);

var _track = require("../models/track.model");

var _track2 = _interopRequireDefault(_track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var list = exports.list = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var genres;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _genre2.default.find();

					case 3:
						genres = _context.sent;

						res.status(200).json(genres);
						_context.next = 10;
						break;

					case 7:
						_context.prev = 7;
						_context.t0 = _context["catch"](0);

						res.status(500).json({
							message: "Genres do not exist!"
						});

					case 10:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 7]]);
	}));

	return function list(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var read = exports.read = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var genre, tracks;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _genre2.default.findOne({ _id: req.params.id }).exec();

					case 3:
						genre = _context2.sent;
						_context2.next = 6;
						return _track2.default.find({ genre: genre }).populate("genre").exec();

					case 6:
						tracks = _context2.sent;

						res.status(200).json({
							genre: genre,
							tracks: tracks
						});
						_context2.next = 13;
						break;

					case 10:
						_context2.prev = 10;
						_context2.t0 = _context2["catch"](0);

						res.status(500).json({
							message: "Genre does not exist!"
						});

					case 13:
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
		var newGenre;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return new _genre2.default(req.body).save();

					case 3:
						newGenre = _context3.sent;

						res.status(201).json(newGenre);
						_context3.next = 10;
						break;

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3["catch"](0);

						res.status(500).json({
							message: "Error! Cannot create new genre!"
						});

					case 10:
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

var update = exports.update = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
		var updatedGenre;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return _genre2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

					case 3:
						updatedGenre = _context4.sent;

						res.status(201).json(updatedGenre);
						_context4.next = 10;
						break;

					case 7:
						_context4.prev = 7;
						_context4.t0 = _context4["catch"](0);

						res.status(500).json({
							message: "Error! Cannot update this genre!"
						});

					case 10:
					case "end":
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 7]]);
	}));

	return function update(_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}();

var del = exports.del = function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
		var deletedGenre;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;
						_context5.next = 3;
						return _genre2.default.findOneAndDelete({ _id: req.params.id }).exec();

					case 3:
						deletedGenre = _context5.sent;

						res.status(204).json(deletedGenre);
						_context5.next = 10;
						break;

					case 7:
						_context5.prev = 7;
						_context5.t0 = _context5["catch"](0);

						res.status(500).json({
							message: "Error! Cannot delete this genre!"
						});

					case 10:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 7]]);
	}));

	return function del(_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}();