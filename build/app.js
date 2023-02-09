"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

require("dotenv/config");

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _track = require("./api/routes/track.route");

var _track2 = _interopRequireDefault(_track);

var _user = require("./api/routes/user.route");

var _user2 = _interopRequireDefault(_user);

var _artist = require("./api/routes/artist.route");

var _artist2 = _interopRequireDefault(_artist);

var _genre = require("./api/routes/genre.route");

var _genre2 = _interopRequireDefault(_genre);

var _playlist = require("./api/routes/playlist.route");

var _playlist2 = _interopRequireDefault(_playlist);

var _album = require("./api/routes/album.route");

var _album2 = _interopRequireDefault(_album);

var _collection = require("./api/routes/collection.route");

var _collection2 = _interopRequireDefault(_collection);

var _search = require("./api/routes/search.route");

var _search2 = _interopRequireDefault(_search);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

/* :::::::::::::::::: Using Middlewares :::::::::::::::::: */

/* :::::::::::::::::: Import Routers :::::::::::::::::: */
app.use((0, _cors2.default)({ origin: "*" })); // public API
app.use(_express2.default.json()); // using JSON data type
app.use((0, _compression2.default)({ level: 6, threshold: 1 * 1024 })); // compress data if payload is too large
app.use((0, _morgan2.default)("tiny"));

/* :::::::::::::::::: Using Routers :::::::::::::::::::: */
app.get("/", function (req, res) {
	try {
		return res.json({
			status: 200,
			message: "Server now is running!"
		});
	} catch (error) {
		return res.status(404).send("Server is stopped!");
	}
});
app.get("/activate-account", function (req, res) {
	return res.sendFile(_path2.default.resolve("verify-account.html"));
});

app.use("/api", _track2.default);
app.use("/api", _user2.default);
app.use("/api", _artist2.default);
app.use("/api", _genre2.default);
app.use("/api", _playlist2.default);
app.use("/api", _album2.default);
app.use("/api", _collection2.default);
app.use("/api", _search2.default);

exports.default = app;