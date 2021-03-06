"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _ProfileController = _interopRequireDefault(require("../controllers/ProfileController"));

var _ensureAuthentication = _interopRequireDefault(require("../middlewares/ensureAuthentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileController = new _ProfileController.default();
const profileRouter = (0, _express.Router)();
profileRouter.use(_ensureAuthentication.default);
profileRouter.get('/', profileController.show);
profileRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    oldPassword: _celebrate.Joi.string(),
    password: _celebrate.Joi.string(),
    passwordConfirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password'))
  }
}), profileController.update);
var _default = profileRouter;
exports.default = _default;