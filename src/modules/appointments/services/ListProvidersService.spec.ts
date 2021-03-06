import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProvidersService = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Test',
            email: 'johntest@example.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Logged User',
            email: 'loggedUser@example.com',
            password: '123456',
        });

        const providers = await listProvidersService.execute(loggedUser.id);

        expect(providers).toEqual([user1, user2]);
    });
});
