"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _celebrate = require("celebrate");

var _cors = _interopRequireDefault(require("cors"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _GlobalErrorHandler = _interopRequireDefault(require("../../errors/GlobalErrorHandler"));

var _RateLimiter = _interopRequireDefault(require("./middlewares/RateLimiter"));

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use((0, _cors.default)());
app.use(_RateLimiter.default);
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use(_GlobalErrorHandler.default); // eslint-disable-next-line no-console

app.listen('3333', () => console.log('Server started on port 3333!'));