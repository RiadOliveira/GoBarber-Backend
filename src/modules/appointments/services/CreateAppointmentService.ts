import { startOfHour, isBefore, getHours, format } from 'date-fns';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepositories from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepositories,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider') private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        providerId,
        userId,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                "You can't create an appointment on a past date",
                400,
            );
        }

        if (userId === providerId) {
            throw new AppError(
                "You can't create an appointment with yourself",
                400,
            );
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                "You can't create an appointment out of the schedule",
                400,
            );
        }

        const findAppointment = await this.appointmentsRepository.findByDate(
            appointmentDate,
            providerId,
        );

        if (findAppointment) {
            throw new AppError('Date already marked', 400);
        }

        const appointment = await this.appointmentsRepository.create({
            providerId,
            userId,
            date: appointmentDate,
        });

        const dateFormatted = format(
            appointmentDate,
            "dd/MM/yyyy 'às' HH:mm'h'",
        );

        await this.notificationsRepository.create({
            recipientId: providerId,
            content: `Novo agendamento para ${dateFormatted}`,
        });

        await this.cacheProvider.invalidate(
            `provider-appointments:${providerId}:${format(
                appointmentDate,
                'yyyy-M-d',
            )}`,
        );

        return appointment;
    }
}

export default CreateAppointmentService;
