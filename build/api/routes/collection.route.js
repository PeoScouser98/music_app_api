"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collection = require("../controllers/collection.controller");

var Collection = _interopRequireWildcard(_collection);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _checkAuth = require("../middlewares/checkAuth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = _express2.default.Router();

router.get("/collection/tracks", _checkAuth.checkAccessToken, Collection.getTracksCollection);
router.get("/collection/albums", _checkAuth.checkAccessToken, Collection.getAlbumsCollection);
router.get("/collection/artists", _checkAuth.checkAccessToken, Collection.getArtistsCollection);
router.patch("/collection/tracks", _checkAuth.checkAccessToken, Collection.updateTracksCollection);
router.patch("/collection/albums", _checkAuth.checkAccessToken, Collection.updateAlbumsCollection);
router.patch("/collection/artists", _checkAuth.checkAccessToken, Collection.updateAritstsCollection);

exports.default = router;