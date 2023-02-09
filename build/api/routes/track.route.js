"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _track = require("../controllers/track.controller");

var _checkAuth = require("../middlewares/checkAuth.middleware");

var _checkFile = require("../middlewares/checkFile.middleware");

var _driveUpload = require("../../app/drive-upload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* :::::::::::::: Multer config :::::::::::::: */
var upload = (0, _multer2.default)({
	fileFilter: function fileFilter(req, file, callback) {
		(0, _checkFile.checkAudioFileExtension)(file, callback);
	}
});

router.get("/tracks", _track.list);
router.get("/tracks/user-uploaded", _checkAuth.checkAccessToken, _track.listByUploader);
router.get("/tracks/related/:genre", _track.listRelatedTracks);
router.get("/tracks/:id", _track.read);
router.post("/tracks", _checkAuth.checkAccessToken, _track.create);
router.patch("/tracks/:id", _checkAuth.checkAccessToken, _track.update);
router.delete("/tracks/:id", _checkAuth.checkAccessToken, _track.del);

// router.post("/track-upload", checkAccessToken, upload.single("trackSrc"), async (req, res) => {
// 	const trackSrc = await uploadFile(req.file, process.env.MUSIC_DIR);
// 	return res.status(202).json(trackSrc.data); // Accepted! -> return file id and then call API to create new song with file id
// });

exports.default = router;