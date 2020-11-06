import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    providerId: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ providerId, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointment = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointment) {
            throw Error('Date already marked');
        }

        const appointment = appointmentsRepository.create({
            providerId,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
