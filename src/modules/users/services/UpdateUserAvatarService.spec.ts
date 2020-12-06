import 'reflect-metadata';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatar from './UpdateUserAvatarService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeDiskStorageProvider: FakeDiskStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatar: UpdateUserAvatar;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeDiskStorageProvider = new FakeDiskStorageProvider();
        fakeUsersRepository = new FakeUsersRepository();

        updateUserAvatar = new UpdateUserAvatar(
            fakeUsersRepository,
            fakeDiskStorageProvider,
        );
    });

    it('should be able to update the avatar of the user', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            userId: user.id,
            avatarFileName: 'avatar.png',
        });

        expect(user.avatar).toBe('avatar.png');
    });

    it('should delete old avatar when updating to a new one', async () => {
        const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

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
        await expect(
            updateUserAvatar.execute({
                userId: 'non-existing-user',
                avatarFileName: 'avatar.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
