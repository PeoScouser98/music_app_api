"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _search = require("../controllers/search.controller");

var _search2 = _interopRequireDefault(_search);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/search", _search2.default);

exports.default = router;