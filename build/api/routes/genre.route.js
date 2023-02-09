"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _genre = require("../controllers/genre.controller");

var _checkAuth = require("../middlewares/checkAuth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/genres", _genre.list);
router.get("/genres/:id", _genre.read);
router.post("/genres", _checkAuth.checkAccessToken, _genre.create);
// router.patch("/genres/:id", checkAccessToken, update);
router.patch("/genres/:id", _genre.update);
router.delete("/genres/:id", _checkAuth.checkAccessToken, _genre.del);

exports.default = router;