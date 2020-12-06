import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            userId: user.id,
            name: 'New John',
            email: 'newjohn@example.com',
        });

        expect(updatedUser.name).toBe('New John');

        expect(updatedUser.email).toBe('newjohn@example.com');
    });

    it('should not be able to update a profile of a non-existing user', async () => {
        await expect(
            updateProfileService.execute({
                name: 'non-existing',
                email: 'non-existing',
                userId: 'non-existing',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change the email to another user email', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await fakeUsersRepository.create({
            name: 'Teste Doe',
            email: 'testedoe@example.com',
            password: '321321',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'New John',
                email: 'testedoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            userId: user.id,
            name: 'New John',
            email: 'newjohn@example.com',
            password: '654321',
            oldPassword: '123456',
        });

        expect(updatedUser.password).toBe('654321');
    });

    it('should not be able to update the password without the old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'New John',
                email: 'newjohn@example.com',
                password: '654321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong the old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'New John',
                email: 'newjohn@example.com',
                password: '654321',
                oldPassword: 'wrong-old-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
