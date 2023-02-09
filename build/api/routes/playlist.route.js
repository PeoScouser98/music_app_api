"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _playlist = require("../controllers/playlist.controller");

var _checkAuth = require("../middlewares/checkAuth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get("/playlists", _checkAuth.checkAccessToken, _playlist.list);
router.get("/playlists/created-by/:userId", _playlist.getPlaylistsByUser);
router.get("/playlists/:id", _playlist.read);
router.post("/playlists", _checkAuth.checkAccessToken, _playlist.create);
router.patch("/playlists/:id/edit-track-list", _checkAuth.checkAccessToken, _playlist.updateTracksList);
router.delete("/playlists/:id", _checkAuth.checkAccessToken, _playlist.deletePlaylist);

exports.default = router;