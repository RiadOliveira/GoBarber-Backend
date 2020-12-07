import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    providerId: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        providerId,
        day,
        month,
        year,
    }: IRequest): Promise<Appointment[]> {
        const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider(
                { providerId, month, year, day },
            );

            console.log('Buscou do banco');

            await this.cacheProvider.save(cacheKey, appointments);
        }

        return appointments;
    }
}
