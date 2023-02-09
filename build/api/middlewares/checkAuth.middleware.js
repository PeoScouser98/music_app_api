"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isAdmin = exports.checkAccessToken = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

require("dotenv/config");

var _fs = require("fs");

var _httpErrors = require("http-errors");

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var checkAccessToken = exports.checkAccessToken = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
		var accessToken, certification, _jwt$verify, credential, _ref2, role;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						accessToken = req.headers.authorization.split(" ").at(1);

						if (accessToken) {
							_context.next = 4;
							break;
						}

						throw _httpErrors2.default.Unauthorized("Access token must be provided!");

					case 4:
						_context.next = 6;
						return (0, _fs.readFileSync)(_path2.default.resolve("public.crt"));

					case 6:
						certification = _context.sent;
						_jwt$verify = _jsonwebtoken2.default.verify(accessToken, certification, { algorithms: "RS256" }), credential = _jwt$verify.credential;
						_context.next = 10;
						return _user2.default.findOne({ _id: credential }).select("role");

					case 10:
						_ref2 = _context.sent;
						role = _ref2.role;

						req.role = role;
						req.auth = credential;

						next();
						_context.next = 21;
						break;

					case 17:
						_context.prev = 17;
						_context.t0 = _context["catch"](0);

						console.log("[ERROR] at checkAuth middleware:>>>", _context.t0.message);
						return _context.abrupt("return", res.status(401).json({
							status: 401,
							message: _context.t0.message
						}));

					case 21:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 17]]);
	}));

	return function checkAccessToken(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

var isAdmin = exports.isAdmin = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (!(req.role != 1)) {
							_context2.next = 2;
							break;
						}

						return _context2.abrupt("return", res.status(401).json({
							message: "Unauthorized error! You are not admin!"
						}));

					case 2:
						next();

					case 3:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function isAdmin(_x4, _x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}();