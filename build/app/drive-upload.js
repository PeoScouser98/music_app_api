"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deleteFile = exports.uploadFile = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

require("dotenv/config");

var _googleapis = require("googleapis");

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* :::::::::::::::::::: DRIVE UPLOAD :::::::::::::::::::: */
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REDIRECT_URI = process.env.REDIRECT_URI;
var REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// get auth client
var oauth2Client = new _googleapis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

var drive = _googleapis.google.drive({
	version: "v3",
	auth: oauth2Client
});

var setFilePublic = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileId) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return drive.permissions.create({
							fileId: fileId,
							requestBody: {
								role: "reader",
								type: "anyone"
							}
						});

					case 3:
						return _context.abrupt("return", drive.files.get({
							fileId: fileId,
							fields: "webViewLink,webContentLink"
						}));

					case 6:
						_context.prev = 6;
						_context.t0 = _context["catch"](0);

						console.log(_context.t0);

					case 9:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 6]]);
	}));

	return function setFilePublic(_x) {
		return _ref.apply(this, arguments);
	};
}();
// folderId: 1lPcnj0jxiOXnKzGb4Ueku12L9i1L46FL
var uploadFile = exports.uploadFile = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file, dir) {
		var bufferStream, createdFile;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;

						/* tạo nơi lưu trữ file tạm thời (buffer) -> file sẽ được upload qua stream */
						bufferStream = new _stream.Stream.PassThrough();

						bufferStream.end(file.buffer);
						_context2.next = 5;
						return drive.files.create({
							requestBody: {
								name: file.originalname,
								parents: [process.env.MUSIC_DIR]
							},
							media: {
								body: bufferStream
								/* file được upload lấy từ buffer đã được lưu trữ tạm thời trước đó */
							},
							fields: "id"
						});

					case 5:
						createdFile = _context2.sent;
						_context2.next = 8;
						return setFilePublic(createdFile.data.id);

					case 8:
						return _context2.abrupt("return", createdFile);

					case 11:
						_context2.prev = 11;
						_context2.t0 = _context2["catch"](0);

						console.log(_context2.t0);

					case 14:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 11]]);
	}));

	return function uploadFile(_x2, _x3) {
		return _ref2.apply(this, arguments);
	};
}();
var deleteFile = exports.deleteFile = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var removedFile;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return drive.files.delete(req.body.fileId);

					case 3:
						removedFile = _context3.sent;

						res.status(204).json(removedFile);
						_context3.next = 10;
						break;

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3["catch"](0);

						res.status(400).json({
							message: "Không xóa được file"
						});

					case 10:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 7]]);
	}));

	return function deleteFile(_x4, _x5) {
		return _ref3.apply(this, arguments);
	};
}();