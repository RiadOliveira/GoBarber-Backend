import 'reflect-metadata';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the appointments from a provider on a specific day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            providerId: 'provider',
            date: new Date(2020, 4, 20, 14, 0, 0),
            userId: 'user-id',
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            providerId: 'provider',
            date: new Date(2020, 4, 20, 15, 0, 0),
            userId: 'user-id',
        });

        const appointments = await listProviderAppointmentsService.execute({
            providerId: 'provider',
            day: 20,
            month: 5,
            year: 2020,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
