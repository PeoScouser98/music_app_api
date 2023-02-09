"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.update = exports.activateAccount = exports.resetPassword = exports.recoverPassword = exports.register = exports.login = exports.refreshToken = exports.getUser = exports.read = exports.list = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

require("dotenv/config");

var _fs = require("fs");

var _httpErrors = require("http-errors");

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mailer = require("../../app/mailer");

var _mailer2 = _interopRequireDefault(_mailer);

var _collection = require("../models/collection.model");

var _collection2 = _interopRequireDefault(_collection);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var privateKey = (0, _fs.readFileSync)(_path2.default.resolve("private.pem"));
var certification = (0, _fs.readFileSync)(_path2.default.resolve("public.crt"));

/* ::::::::: Get all users ::::::::::::::: */
var list = exports.list = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var users;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user2.default.find().select("_id username avatar").exec();

                    case 3:
                        users = _context.sent;
                        return _context.abrupt("return", res.status(200).json(users));

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context["catch"](0);
                        return _context.abrupt("return", res.status(404).json({
                            statusCode: 404,
                            message: _context.t0.message
                        }));

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
/* ::::::::: Get an user ::::::::::::::: */
var read = exports.read = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _user2.default.findOne({ _id: req.params.id }).select("_id avatar username").exec();

                    case 3:
                        user = _context2.sent;
                        return _context2.abrupt("return", res.status(200).json(user));

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);
                        return _context2.abrupt("return", res.status(404).json({
                            status: 404,
                            message: _context2.t0.message
                        }));

                    case 10:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 7]]);
    }));

    return function read(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
/* :::::::::::::::: Lấy thông tin người dùng :::::::::::::::: */
var getUser = exports.getUser = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var user;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _user2.default.findOne({ _id: req.auth }).select("-password -role").exec();

                    case 3:
                        user = _context3.sent;
                        return _context3.abrupt("return", res.status(200).json(user));

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3["catch"](0);
                        return _context3.abrupt("return", res.json({
                            status: _context3.t0.status,
                            message: _context3.t0.message
                        }));

                    case 10:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function getUser(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/* :::::::::::::::::::: Tạo refresh token :::::::::::::::::::::: */
var refreshToken = exports.refreshToken = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var user, newAccessToken;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return _user2.default.findOne({ _id: req.params.userId }).exec();

                    case 3:
                        user = _context4.sent;

                        if (user) {
                            _context4.next = 6;
                            break;
                        }

                        throw _httpErrors2.default.BadRequest("Cannot find user");

                    case 6:
                        newAccessToken = _jsonwebtoken2.default.sign({ credential: user._id }, privateKey, { algorithm: "RS256", expiresIn: "15m" });

                        console.log(newAccessToken);
                        return _context4.abrupt("return", res.status(200).json(newAccessToken));

                    case 11:
                        _context4.prev = 11;
                        _context4.t0 = _context4["catch"](0);

                        console.log(_context4.t0.message);
                        return _context4.abrupt("return", res.status(400).json({
                            error: _context4.t0.status,
                            message: _context4.t0.message
                        }));

                    case 15:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 11]]);
    }));

    return function refreshToken(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

/* :::::::::::::::::: Sign in ::::::::::::::::::::: */
var login = exports.login = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var user, accessToken;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return _user2.default.findOne({ email: req.body.email }).exec();

                    case 3:
                        user = _context5.sent;

                        if (user) {
                            _context5.next = 6;
                            break;
                        }

                        throw _httpErrors2.default.NotFound("Account does not exist");

                    case 6:
                        if (user.authenticate(req.body.password)) {
                            _context5.next = 8;
                            break;
                        }

                        throw _httpErrors2.default.BadRequest("Password is incorrect!");

                    case 8:
                        accessToken = _jsonwebtoken2.default.sign({ credential: user._id }, privateKey, { algorithm: "RS256", expiresIn: "15m" });

                        user.password = undefined;
                        return _context5.abrupt("return", res.status(200).json({
                            credential: user._id,
                            accessToken: accessToken,
                            status: 200
                        }));

                    case 13:
                        _context5.prev = 13;
                        _context5.t0 = _context5["catch"](0);

                        console.error("[ERROR]", _context5.t0.message);
                        return _context5.abrupt("return", res.status(200).json({
                            message: _context5.t0.message,
                            status: _context5.t0.status
                        }));

                    case 17:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 13]]);
    }));

    return function login(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

/* :::::::::::::::: Sign up ::::::::::::::::: */
var register = exports.register = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var account, token, baseUrl;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return _user2.default.findOne({ email: req.body.email }).exec();

                    case 3:
                        account = _context6.sent;

                        if (!account) {
                            _context6.next = 6;
                            break;
                        }

                        throw _httpErrors2.default.BadRequest("Account already existed!");

                    case 6:
                        // return res.status(200).json({
                        // 	status: 400,
                        // 	message: "Account already existed!",
                        // });

                        token = _jsonwebtoken2.default.sign(req.body, privateKey, { algorithm: "RS256", expiresIn: "5m" });
                        baseUrl = req.protocol + "://" + req.get("host") + "/activate-account";

                        console.log(req.get("host"));
                        _context6.next = 11;
                        return _mailer2.default.sendMail({
                            from: process.env.AUTH_EMAIL,
                            to: req.body.email,
                            subject: "Activate your account",
                            html: /*html */"\n\t\t\t\t\t<h3>On clicking this link, you are goin' to activate account!</h3>\n\t\t\t\t\t<p><a href=" + baseUrl + "?token=" + token + ">Active Link</a></p>\n\t\t\t\t\t<i>Thanks for register to be one of our member!</i>"
                        }, function (error, infor) {
                            if (error) return res.status(500).json({
                                message: error
                            });

                            return res.status(202).json({
                                message: "Email sent: " + infor.response
                            });
                        });

                    case 11:
                        _context6.next = 16;
                        break;

                    case 13:
                        _context6.prev = 13;
                        _context6.t0 = _context6["catch"](0);
                        return _context6.abrupt("return", res.status(200).json({
                            message: _context6.t0.message,
                            status: _context6.t0.status
                        }));

                    case 16:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 13]]);
    }));

    return function register(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

/* :::::::::::::::: Send mail to recover password ::::::::::::::::::: */
var recoverPassword = exports.recoverPassword = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var user, verifyCode, token;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return _user2.default.findOne({ email: req.body.email }).exec();

                    case 3:
                        user = _context7.sent;

                        if (user) {
                            _context7.next = 6;
                            break;
                        }

                        return _context7.abrupt("return", res.status(404).json({
                            message: "Email does not exist!"
                        }));

                    case 6:
                        /* tạo token */
                        verifyCode = Date.now().toString().substr(7, 6);
                        token = _jsonwebtoken2.default.sign({ verifyCode: verifyCode, email: user.email }, privateKey, {
                            algorithm: "RS256",
                            expiresIn: "5m"
                        });
                        /* gửi mã xác thực về mail cho user */

                        _context7.next = 10;
                        return _mailer2.default.sendMail({
                            from: process.env.AUTH_EMAIL,
                            to: user.email,
                            subject: "Sử dụng mã xác thực này để đổi mật khẩu!",
                            html: /* html */"<p>M\xE3 x\xE1c th\u1EF1c: <b>" + verifyCode + "</b></p>"
                        }, function (err, info) {
                            if (err) return res.status(500).json(err);
                        });

                    case 10:
                        return _context7.abrupt("return", res.status(201).json({ token: token }));

                    case 13:
                        _context7.prev = 13;
                        _context7.t0 = _context7["catch"](0);

                        console.log(_context7.t0);
                        return _context7.abrupt("return", res.status(500).json(_context7.t0));

                    case 17:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 13]]);
    }));

    return function recoverPassword(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

/* ::::::::::::::::::: Reset password :::::::::::::::::::: */
var resetPassword = exports.resetPassword = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        var token, _jwt$verify, verifyCode, email, user, newPassword, response;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.prev = 0;
                        token = req.headers.authorization.split(" ").at(1);
                        _jwt$verify = _jsonwebtoken2.default.verify(token, certification, { algorithms: "RS256" }), verifyCode = _jwt$verify.verifyCode, email = _jwt$verify.email;
                        _context8.next = 5;
                        return _user2.default.findOne({ email: email }).exec();

                    case 5:
                        user = _context8.sent;

                        if (!(verifyCode !== req.body.verifyCode || user === null)) {
                            _context8.next = 8;
                            break;
                        }

                        throw _httpErrors2.default.Forbidden("Verify code is invalid!");

                    case 8:
                        newPassword = _bcrypt2.default.hashSync(req.body.password, (0, _bcrypt.genSaltSync)(10));
                        _context8.next = 11;
                        return _user2.default.findOneAndUpdate({ email: email }, { password: newPassword }, { new: true });

                    case 11:
                        response = _context8.sent;

                        if (response) {
                            _context8.next = 14;
                            break;
                        }

                        throw _httpErrors2.default.InternalServerError("Failed to reset password");

                    case 14:
                        return _context8.abrupt("return", res.status(201).json({
                            message: "Reset password successfully!"
                        }));

                    case 17:
                        _context8.prev = 17;
                        _context8.t0 = _context8["catch"](0);

                        console.log(_context8.t0.message);
                        return _context8.abrupt("return", res.status(200).json({
                            status: _context8.t0.status,
                            message: _context8.t0.message
                        }));

                    case 21:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[0, 17]]);
    }));

    return function resetPassword(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

/* :::::::::::: Activate account :::::::::::::: */
var activateAccount = exports.activateAccount = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
        var decodedToken, newAccount;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.prev = 0;
                        decodedToken = _jsonwebtoken2.default.verify(req.query.token, certification, { algorithms: "RS256" }); // -> user data
                        /* Save account to database */

                        _context9.next = 4;
                        return new _user2.default(decodedToken).save();

                    case 4:
                        newAccount = _context9.sent;
                        _context9.next = 7;
                        return new _collection2.default({
                            creator: newAccount._id,
                            albums: [],
                            tracks: [],
                            artists: []
                        }).save();

                    case 7:
                        return _context9.abrupt("return", res.status(201).json({
                            id: newAccount._id,
                            email: newAccount.email,
                            username: newAccount.username,
                            role: newAccount.role
                        }));

                    case 10:
                        _context9.prev = 10;
                        _context9.t0 = _context9["catch"](0);

                        console.log(_context9.t0.message);
                        return _context9.abrupt("return", res.status(401).json({
                            message: _context9.t0.message
                        }));

                    case 14:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, undefined, [[0, 10]]);
    }));

    return function activateAccount(_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}();

var update = exports.update = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
        var updatedUser;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.prev = 0;

                        console.log(req.body);
                        _context10.next = 4;
                        return _user2.default.findOneAndUpdate({ _id: req.auth }, req.body, { new: true });

                    case 4:
                        updatedUser = _context10.sent;

                        console.log(updatedUser);
                        return _context10.abrupt("return", res.status(201).json(updatedUser));

                    case 9:
                        _context10.prev = 9;
                        _context10.t0 = _context10["catch"](0);

                        console.log(_context10.t0);
                        return _context10.abrupt("return", res.status(500).json(_context10.t0));

                    case 13:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, undefined, [[0, 9]]);
    }));

    return function update(_x19, _x20) {
        return _ref10.apply(this, arguments);
    };
}();