"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _comment = require("../controllers/comment.controller");

var _checkAuth = require("../middlewares/checkAuth.middleware");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.post("/comments/:trackId", _checkAuth.checkAccessToken, _comment.create);
router.patch("/comments", _checkAuth.checkAccessToken, _comment.update);
router.delete("/comments", _checkAuth.checkAccessToken, _comment.del);

exports.default = router;