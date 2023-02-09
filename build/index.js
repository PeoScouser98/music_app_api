"use strict";

require("dotenv/config");

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _mongoDB = require("./config/mongoDB.config");

var _mongoDB2 = _interopRequireDefault(_mongoDB);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3001;
var server = _http2.default.createServer(_app2.default);

server.listen(PORT, function () {
    console.info("[SUCCESS] Server is listening on port " + PORT);
});
console.log("[INFO] Node Version: " + process.versions.node);
(0, _mongoDB2.default)();