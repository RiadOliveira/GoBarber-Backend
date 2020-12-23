"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfileService = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'New John',
      email: 'newjohn@example.com'
    });
    expect(updatedUser.name).toBe('New John');
    expect(updatedUser.email).toBe('newjohn@example.com');
  });
  it('should not be able to update a profile of a non-existing user', async () => {
    await expect(updateProfileService.execute({
      name: 'non-existing',
      email: 'non-existing',
      userId: 'non-existing'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change the email to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await fakeUsersRepository.create({
      name: 'Teste Doe',
      email: 'testedoe@example.com',
      password: '321321'
    });
    await expect(updateProfileService.execute({
      userId: user.id,
      name: 'New John',
      email: 'testedoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'New John',
      email: 'newjohn@example.com',
      password: '654321',
      oldPassword: '123456'
    });
    expect(updatedUser.password).toBe('654321');
  });
  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      userId: user.id,
      name: 'New John',
      email: 'newjohn@example.com',
      password: '654321'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      userId: user.id,
      name: 'New John',
      email: 'newjohn@example.com',
      password: '654321',
      oldPassword: 'wrong-old-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});