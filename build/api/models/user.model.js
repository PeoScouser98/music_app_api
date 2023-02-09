"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = _mongoose2.default.Schema({
	email: {
		type: String,
		require: true,
		trim: true
	},
	password: {
		type: String,
		minLength: 6,
		maxLength: 16,
		require: true,
		trim: true
	},
	username: {
		type: String,
		require: true,
		trim: true
	},

	avatar: {
		type: String,
		require: true,
		default: "https://firebasestorage.googleapis.com/v0/b/music-app-cdef5.appspot.com/o/pictures%2Fdefault-avatar.png?alt=media&token=a70a307e-5ec6-4375-8e0c-b2e926f8c417"
	},

	role: {
		type: Number,
		enum: [0, 1],
		default: 0
	}
}, {
	timestamps: true
});

userSchema.methods.authenticate = function (password) {
	return _bcrypt2.default.compareSync(password, this.password);
};
userSchema.methods.encryptPassword = function (password) {
	if (!password) return;
	return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(10));
};

userSchema.pre("save", function (next) {
	this.password = this.encryptPassword(this.password);
	next();
});

exports.default = _mongoose2.default.model("Users", userSchema);