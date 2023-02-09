"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.del = exports.update = exports.create = exports.read = exports.listRelatedTracks = exports.listByUploader = exports.list = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _track = require("../models/track.model");

var _track2 = _interopRequireDefault(_track);

var _comment = require("../models/comment.model");

var _comment2 = _interopRequireDefault(_comment);

var _driveUpload = require("../../app/drive-upload");

var _driveUpload2 = _interopRequireDefault(_driveUpload);

var _genre = require("../models/genre.model");

var _genre2 = _interopRequireDefault(_genre);

var _httpErrors = require("http-errors");

var _httpErrors2 = _interopRequireDefault(_httpErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// lấy ra tất cả bài hát
var list = exports.list = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var limit, skip, tracks;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						limit = +req.query.limit || -1;
						skip = +req.query.skip || 0;
						_context.next = 5;
						return _track2.default.find().sort({ listen: -1 }).skip(skip).limit(limit).exec();

					case 5:
						tracks = _context.sent;

						if (!(tracks.length === 1)) {
							_context.next = 8;
							break;
						}

						return _context.abrupt("return", res.status(200).json(tracks[0]));

					case 8:
						return _context.abrupt("return", res.status(200).json(tracks));

					case 11:
						_context.prev = 11;
						_context.t0 = _context["catch"](0);

						console.log(_context.t0);
						res.status(404).json({
							status: 404,
							message: "Cannot find tracks!"
						});

					case 15:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 11]]);
	}));

	return function list(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

//
var listByUploader = exports.listByUploader = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var tracks;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _track2.default.find({ uploader: req.auth }).limit(+req.query.limit).sort({ createdAt: -1 }).exec();

					case 3:
						tracks = _context2.sent;
						return _context2.abrupt("return", res.status(200).json(tracks));

					case 7:
						_context2.prev = 7;
						_context2.t0 = _context2["catch"](0);
						return _context2.abrupt("return", res.status(404).json({
							message: "Cannot find tracks that uploaded by user"
						}));

					case 10:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 7]]);
	}));

	return function listByUploader(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

var listRelatedTracks = exports.listRelatedTracks = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var genre, relatedTracks;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						genre = req.params.genre;

						if (genre == "undefined") _genre2.default.findOne().then(function (data) {
							console.log(data);
							genre = data._id;
						});
						// console.log(genre);
						_context3.next = 5;
						return _track2.default.find({ genre: genre }).limit(10).exec();

					case 5:
						relatedTracks = _context3.sent;
						return _context3.abrupt("return", res.status(200).json(relatedTracks));

					case 9:
						_context3.prev = 9;
						_context3.t0 = _context3["catch"](0);

						console.log(_context3.t0.message);
						return _context3.abrupt("return", res.status(200).json({
							status: 404,
							message: "Cannot find related tracks"
						}));

					case 13:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 9]]);
	}));

	return function listRelatedTracks(_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}();

// lấy 1 bài hát
var read = exports.read = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
		var track, comments;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return _track2.default.findOne({ _id: req.params.id }).populate({ path: "artists", select: "_id name avatar" }).populate({ path: "album", select: "_id title image" }).select("-uploader -updatedAt -fileId").exec();

					case 3:
						track = _context4.sent;
						_context4.next = 6;
						return _comment2.default.find({ _id: track._id }).populate("user").exec();

					case 6:
						comments = _context4.sent;
						return _context4.abrupt("return", res.status(200).json({
							track: track,
							comments: comments
						}));

					case 10:
						_context4.prev = 10;
						_context4.t0 = _context4["catch"](0);

						res.status(404).json({
							message: "Bài hát không tồn tại"
						});

					case 13:
					case "end":
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 10]]);
	}));

	return function read(_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}();

// upload bài hát
var create = exports.create = function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
		var newTrack;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;

						if (req.auth) {
							_context5.next = 3;
							break;
						}

						throw _httpErrors2.default.Forbidden("You have to login to upload track!");

					case 3:
						req.body.uploader = req.auth;
						console.log(req.body);
						_context5.next = 7;
						return new _track2.default(req.body).save();

					case 7:
						newTrack = _context5.sent;
						return _context5.abrupt("return", res.status(201).json(newTrack));

					case 11:
						_context5.prev = 11;
						_context5.t0 = _context5["catch"](0);

						console.log("[ERROR] :>>>", _context5.t0.message);
						return _context5.abrupt("return", res.status(_context5.t0.status || 500).json({
							status: _context5.t0.status,
							message: _context5.t0.message
						}));

					case 15:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 11]]);
	}));

	return function create(_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}();

var update = exports.update = function () {
	var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
		var updatedTrack;
		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.prev = 0;
						_context6.next = 3;
						return _track2.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
							new: true,
							upsert: true
						}).exec();

					case 3:
						updatedTrack = _context6.sent;
						return _context6.abrupt("return", res.status(200).json(updatedTrack));

					case 7:
						_context6.prev = 7;
						_context6.t0 = _context6["catch"](0);

						console.log(_context6.t0);
						return _context6.abrupt("return", res.status(500).json({
							message: "Cannot update track!"
						}));

					case 11:
					case "end":
						return _context6.stop();
				}
			}
		}, _callee6, undefined, [[0, 7]]);
	}));

	return function update(_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
}();

var del = exports.del = function () {
	var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
		var _ref8, fileId, deletedTrack;

		return _regenerator2.default.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						_context7.prev = 0;
						_context7.next = 3;
						return _track2.default.findOne({ _id: req.params.id }).exec();

					case 3:
						_ref8 = _context7.sent;
						fileId = _ref8.fileId;
						_context7.next = 7;
						return (0, _driveUpload2.default)(fileId);

					case 7:
						_context7.next = 9;
						return _track2.default.findOneAndDelete({ _id: req.params.id }).exec();

					case 9:
						deletedTrack = _context7.sent;
						return _context7.abrupt("return", res.status(204).json(deletedTrack));

					case 13:
						_context7.prev = 13;
						_context7.t0 = _context7["catch"](0);
						return _context7.abrupt("return", res.status(500).json({
							message: "Cannot remove track"
						}));

					case 16:
					case "end":
						return _context7.stop();
				}
			}
		}, _callee7, undefined, [[0, 13]]);
	}));

	return function del(_x13, _x14) {
		return _ref7.apply(this, arguments);
	};
}();