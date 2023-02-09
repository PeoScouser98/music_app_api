"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _album = require("../controllers/album.controller");

var _checkAuth = require("../middlewares/checkAuth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/albums", _album.list);
router.get("/albums/:id", _album.read);
router.post("/albums", _checkAuth.checkAccessToken, _checkAuth.isAdmin, _album.create);
router.patch("/albums/:id", _checkAuth.checkAccessToken, _checkAuth.isAdmin, _album.update);
router.delete("/albums/:id", _checkAuth.checkAccessToken, _checkAuth.isAdmin, _album.del);
router.patch("/albums/remove/:id", _checkAuth.checkAccessToken, _checkAuth.isAdmin, _album.removeFromAlbum);

exports.default = router;