"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _dateFns = require("date-fns");

var _Appointment = _interopRequireDefault(require("../../infra/typeorm/entities/Appointment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  constructor() {
    this.appointments = [];
  }

  async findByDate(date, providerId) {
    const findAppointment = this.appointments.find(appointment => (0, _dateFns.isEqual)(appointment.date, date) && appointment.providerId === providerId);
    return findAppointment;
  }

  async findAllInMonthFromProvider({
    providerId,
    month,
    year
  }) {
    const findedAppointments = this.appointments.filter(appointment => {
      return appointment.providerId === providerId && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year;
    });
    return findedAppointments;
  }

  async findAllInDayFromProvider({
    providerId,
    month,
    year,
    day
  }) {
    const findedAppointments = this.appointments.filter(appointment => {
      return appointment.providerId === providerId && (0, _dateFns.getDate)(appointment.date) === day && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year;
    });
    return findedAppointments;
  }

  async create({
    providerId,
    userId,
    date
  }) {
    const appointment = new _Appointment.default();
    Object.assign(appointment, {
      id: (0, _uuid.v4)(),
      date,
      providerId,
      userId
    });
    this.appointments.push(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;