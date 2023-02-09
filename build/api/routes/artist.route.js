"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _artist = require("../controllers/artist.controller");

var _checkAuth = require("../middlewares/checkAuth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/artists", _artist.list);
router.get("/artists/:id", _artist.read);
router.post("/artists", _checkAuth.checkAccessToken, _checkAuth.isAdmin, _artist.create);
router.patch("/artists/:id", _checkAuth.checkAccessToken, _checkAuth.isAdmin, _artist.update);
router.delete("/artists/:id", _checkAuth.checkAccessToken, _checkAuth.isAdmin, _artist.del);

exports.default = router;