import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, month, year } = request.query;
        const { providerId } = request.params;

        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const availability = await listProviderDayAvailabilityService.execute({
            providerId,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(availability);
    }
}
