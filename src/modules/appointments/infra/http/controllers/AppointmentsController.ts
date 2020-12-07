import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { providerId, date } = request.body;
        const userId = request.user.id;

        const createAppointmentService = container.resolve(
            CreateAppointmentService,
        );

        const appointment = await createAppointmentService.execute({
            providerId,
            userId,
            date,
        });

        return response.json(appointment);
    }
}
