"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _firebaseAdmin = require("firebase-admin");

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _serviceAcount = require("./serviceAcount.json");

var _serviceAcount2 = _interopRequireDefault(_serviceAcount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebaseAdmin2.default.initializeApp({
	credential: _firebaseAdmin2.default.credential.cert(_serviceAcount2.default)
});

exports.default = _firebaseAdmin2.default;