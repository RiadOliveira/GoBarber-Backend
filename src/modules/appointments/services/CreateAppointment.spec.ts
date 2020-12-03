import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointment';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            providerId: '321331213',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('321331213');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            providerId: '321331213',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                providerId: '321331213',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
