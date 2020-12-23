"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentController {
  async create(request, response) {
    const {
      providerId,
      date
    } = request.body;
    const userId = request.user.id;

    const createAppointmentService = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointmentService.execute({
      providerId,
      userId,
      date
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentController;