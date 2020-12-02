import 'reflect-metadata';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatar from './UpdateUserAvatar';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
    it('should be able to update the avatar of the user', async () => {
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();
        const fakeUsersRepository = new FakeUsersRepository();

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUserAvatar = new UpdateUserAvatar(
            fakeUsersRepository,
            fakeDiskStorageProvider,
        );

        await updateUserAvatar.execute({
            userId: user.id,
            avatarFileName: 'avatar.png',
        });

        expect(user.avatar).toBe('avatar.png');
    });

    it('should delete old avatar when updating to a new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();

        const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUserAvatar = new UpdateUserAvatar(
            fakeUsersRepository,
            fakeDiskStorageProvider,
        );

        await updateUserAvatar.execute({
            userId: user.id,
            avatarFileName: 'avatar.png',
        });

        await updateUserAvatar.execute({
            userId: user.id,
            avatarFileName: 'avatar2.png',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.png');
        expect(user.avatar).toBe('avatar2.png');
    });

    it('should not be able to update an avatar of an inexistent user', async () => {
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();
        const fakeUsersRepository = new FakeUsersRepository();

        const updateUserAvatar = new UpdateUserAvatar(
            fakeUsersRepository,
            fakeDiskStorageProvider,
        );

        expect(
            updateUserAvatar.execute({
                userId: 'non-existing-user',
                avatarFileName: 'avatar.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
