"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderMonthAvailabilityController {
  async index(request, response) {
    const {
      month,
      year
    } = request.query;
    const {
      providerId
    } = request.params;

    const listProviderMonthAvailabilityService = _tsyringe.container.resolve(_ListProviderMonthAvailabilityService.default);

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId,
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = ProviderMonthAvailabilityController;