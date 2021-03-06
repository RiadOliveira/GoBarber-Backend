"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthentication = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthentication"));

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProviderDayAvailabilityController = _interopRequireDefault(require("../controllers/ProviderDayAvailabilityController"));

var _ProviderMonthAvailabilityController = _interopRequireDefault(require("../controllers/ProviderMonthAvailabilityController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providersRouter = (0, _express.Router)();
const providersController = new _ProvidersController.default();
const providersDayController = new _ProviderDayAvailabilityController.default();
const providersMonthController = new _ProviderMonthAvailabilityController.default();
providersRouter.use(_ensureAuthentication.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:providerId/month-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    providerId: _celebrate.Joi.string().uuid().required()
  }
}), providersMonthController.index);
providersRouter.get('/:providerId/day-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    providerId: _celebrate.Joi.string().uuid().required()
  }
}), providersDayController.index);
var _default = providersRouter;
exports.default = _default;