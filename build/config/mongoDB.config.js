"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

require("dotenv/config");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var connectMongoDB = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var databaseUri;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;

						console.info("[INFO] " + process.env.NODE_ENV.trim() + " MODE");
						databaseUri = process.env.NODE_ENV.toUpperCase().includes("PRODUCTION") ? process.env.DATABASE_URI : process.env.LOCAL_DATABASE_URI;

						_mongoose2.default.set("strictQuery", false);
						_context.next = 6;
						return _mongoose2.default.connect(databaseUri);

					case 6:
						console.info("[SUCCESS] Connected to database!");
						_context.next = 12;
						break;

					case 9:
						_context.prev = 9;
						_context.t0 = _context["catch"](0);

						console.log(_context.t0);

					case 12:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 9]]);
	}));

	return function connectMongoDB() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = connectMongoDB;