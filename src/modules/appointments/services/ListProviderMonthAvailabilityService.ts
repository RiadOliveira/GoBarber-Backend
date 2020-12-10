import { inject, injectable } from 'tsyringe';
import { getDate, getDaysInMonth, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        providerId,
        month,
        year,
    }: IFindAllInMonthProviderDTO): Promise<IResponse> {
        const findedAppointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            { providerId, month, year },
        );

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            {
                length: numberOfDaysInMonth,
            },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const compareDate = new Date(year, month - 1, day, 23, 59, 59);

            const appointmentsInDay = findedAppointments.filter(
                appointment => getDate(appointment.date) === day,
            );

            return {
                day,
                available:
                    appointmentsInDay.length < 10 &&
                    isAfter(compareDate, new Date()),
            };
        });

        return availability;
    }
}
