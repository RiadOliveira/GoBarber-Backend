"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _celebrate = require("celebrate");

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _ensureAuthentication = _interopRequireDefault(require("../middlewares/ensureAuthentication"));

var _UsersAvatarController = _interopRequireDefault(require("../controllers/UsersAvatarController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersAvatarController = new _UsersAvatarController.default();
const usersController = new _UsersController.default();
const usersRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersController.create);
usersRouter.patch('/avatar', _ensureAuthentication.default, upload.single('avatar'), usersAvatarController.update);
var _default = usersRouter;
exports.default = _default;