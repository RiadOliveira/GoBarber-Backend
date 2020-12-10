import { v4 } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(
        date: Date,
        providerId: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment =>
                isEqual(appointment.date, date) &&
                appointment.providerId === providerId,
        );

        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        providerId,
        month,
        year,
    }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const findedAppointments = this.appointments.filter(appointment => {
            return (
                appointment.providerId === providerId &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });

        return findedAppointments;
    }

    public async findAllInDayFromProvider({
        providerId,
        month,
        year,
        day,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const findedAppointments = this.appointments.filter(appointment => {
            return (
                appointment.providerId === providerId &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });

        return findedAppointments;
    }

    public async create({
        providerId,
        userId,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: v4(), date, providerId, userId });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
