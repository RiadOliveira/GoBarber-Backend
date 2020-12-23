"use strict";

require("reflect-metadata");

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderDayAvailabilityService;
describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderDayAvailabilityService = new _ListProviderDayAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list the day availability from a provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
      userId: '123123'
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
      userId: '123123'
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const availability = await listProviderDayAvailabilityService.execute({
      providerId: 'user',
      day: 20,
      month: 5,
      year: 2020
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, // has passed and was marked
    {
      hour: 9,
      available: false
    }, // has passed
    {
      hour: 12,
      available: false
    }, // is marked
    {
      hour: 13,
      available: true
    }, // is available
    {
      hour: 16,
      available: true
    } // is available
    ]));
  });
});