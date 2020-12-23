"use strict";

require("reflect-metadata");

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderAppointmentsService;
let fakeCacheProvider;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviderAppointmentsService = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository, fakeCacheProvider);
  });
  it('should be able to list the appointments from a provider on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      date: new Date(2020, 4, 20, 14, 0, 0),
      userId: 'user-id'
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      date: new Date(2020, 4, 20, 15, 0, 0),
      userId: 'user-id'
    });
    const appointments = await listProviderAppointmentsService.execute({
      providerId: 'provider',
      day: 20,
      month: 5,
      year: 2020
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});