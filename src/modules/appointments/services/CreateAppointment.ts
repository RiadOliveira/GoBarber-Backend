import { startOfHour } from 'date-fns';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepositories from '../repositories/IAppointmentsRepository';

interface IRequest {
    providerId: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepositories,
    ) {}

    public async execute({ providerId, date }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointment = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointment) {
            throw new AppError('Date already marked', 400);
        }

        const appointment = await this.appointmentsRepository.create({
            providerId,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
