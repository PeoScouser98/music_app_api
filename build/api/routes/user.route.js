"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../controllers/user.controller");

var _checkAuth = require("../middlewares/checkAuth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/users", _user.list);
router.get("/user", _checkAuth.checkAccessToken, _user.getUser);
router.get("/refresh-token/:userId", _user.refreshToken);
router.post("/login", _user.login);
router.post("/register", _user.register);
router.get("/activate-account", _user.activateAccount);
router.post("/forgot-password", _user.recoverPassword);
router.post("/reset-password", _user.resetPassword);
router.patch("/user", _checkAuth.checkAccessToken, _user.update);

exports.default = router;