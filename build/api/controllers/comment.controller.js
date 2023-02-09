"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.del = exports.update = exports.create = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _comment = require("../models/comment.model");

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var create = exports.create = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var newComment;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return new _comment2.default(req.body).save();

					case 3:
						newComment = _context.sent;
						return _context.abrupt("return", res.status(201).json(newComment));

					case 7:
						_context.prev = 7;
						_context.t0 = _context["catch"](0);
						return _context.abrupt("return", res.status(400).json({
							message: "Không post được comment"
						}));

					case 10:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 7]]);
	}));

	return function create(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var update = exports.update = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var updatedComment;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _comment2.default.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });

					case 3:
						updatedComment = _context2.sent;
						return _context2.abrupt("return", res.status(200).json(updatedComment));

					case 7:
						_context2.prev = 7;
						_context2.t0 = _context2["catch"](0);
						return _context2.abrupt("return", res.status(400).json({
							message: "Không edit được comment"
						}));

					case 10:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 7]]);
	}));

	return function update(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

var del = exports.del = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var deletedComment;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return _comment2.default.findOneAndDelete({ _id: req.params.id }).exec();

					case 3:
						deletedComment = _context3.sent;
						return _context3.abrupt("return", res.status(200).json(deletedComment));

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3["catch"](0);
						return _context3.abrupt("return", res.status(400).json({
							message: "Không xóa được comment"
						}));

					case 10:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 7]]);
	}));

	return function del(_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}();