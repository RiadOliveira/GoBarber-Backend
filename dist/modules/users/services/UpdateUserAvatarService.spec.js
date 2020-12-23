"use strict";

require("reflect-metadata");

var _FakeDiskStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDiskStorageProvider;
let fakeUsersRepository;
let updateUserAvatar;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeDiskStorageProvider = new _FakeDiskStorageProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeDiskStorageProvider);
  });
  it('should be able to update the avatar of the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.png'
    });
    expect(user.avatar).toBe('avatar.png');
  });
  it('should delete old avatar when updating to a new one', async () => {
    const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.png'
    });
    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar2.png'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
  it('should not be able to update an avatar of an inexistent user', async () => {
    await expect(updateUserAvatar.execute({
      userId: 'non-existing-user',
      avatarFileName: 'avatar.png'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});