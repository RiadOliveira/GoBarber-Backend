import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointment from '../services/CreateAppointment';
import ensureAuthentication from '../middleware/ensureAuthentication';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { providerId, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointment();

    const appointment = await createAppointmentService.execute({
        providerId,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
