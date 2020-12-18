import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
export default class ListProvidersService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUserRepository,
        @inject('CacheProvider') private cacheProvider: ICacheProvider,
    ) {}

    public async execute(userId: string): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>(
            `providers-list:${userId}`,
        );

        if (!users) {
            users = await this.usersRepository.findAllProviders({
                exceptUserId: userId,
            });

            await this.cacheProvider.save(
                `providers-list:${userId}`,
                classToClass(users),
            );
        }

        return users;
    }
}
